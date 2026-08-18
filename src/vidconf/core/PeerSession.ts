import type { ClientMessage, ServerMessage } from './types.ts';

export interface PeerSessionOptions {
  /** Polite peers yield when both sides offer simultaneously. */
  polite: boolean;
  iceServers: RTCIceServer[];
  send: (msg: ClientMessage) => void;
  onRemoteStream: (stream: MediaStream) => void;
  /** null when the other side is not sharing, or has stopped. */
  onRemoteScreen: (stream: MediaStream | null) => void;
  onConnectionState: (state: RTCPeerConnectionState) => void;
  onError?: (err: unknown) => void;
}

/** Fixed m-line order, the same on both peers. */
const MIC = 0;
const CAMERA = 1;
const SCREEN = 2;
const SCREEN_AUDIO = 3;
const LINES = 4;

/**
 * One peer connection, one call. Plain class on purpose — a call is an
 * event-driven state machine whose side effects must happen once and in order,
 * which is the opposite of what a render cycle guarantees.
 *
 * Negotiation follows the W3C "perfect negotiation" pattern, which is what
 * makes simultaneous offers (glare) and mid-call renegotiation safe.
 *
 * The session carries three media lines in a fixed order — microphone, camera,
 * screen — so each side can tell what an arriving track is by the position of
 * the transceiver it came in on. Only the impolite peer creates them: if both
 * sides did, each would offer its own set and they would negotiate into two
 * disjoint groups of m-lines, one per direction, which breaks that positional
 * mapping. The polite peer adopts whatever the offer creates.
 */
export class PeerSession {
  private pc: RTCPeerConnection;
  private opts: PeerSessionOptions;
  private remoteStream = new MediaStream();

  // Perfect-negotiation bookkeeping.
  private makingOffer = false;
  private ignoreOffer = false;
  private isSettingRemoteAnswerPending = false;

  private transceivers: RTCRtpTransceiver[] | null = null;
  private pending: (MediaStreamTrack | null)[] = new Array(LINES).fill(null);
  private recoveryTimer: ReturnType<typeof setTimeout> | null = null;
  private closed = false;

  // Out-of-band state that shouldn't wait on media timing.
  private control: RTCDataChannel | null = null;
  private controlQueue: string[] = [];
  private remoteScreenTrack: MediaStreamTrack | null = null;
  private remoteScreenStream = new MediaStream();
  private remoteSharing = false;

  constructor(opts: PeerSessionOptions) {
    this.opts = opts;
    this.pc = new RTCPeerConnection({ iceServers: opts.iceServers });

    if (!opts.polite) {
      this.transceivers = [
        this.pc.addTransceiver('audio', { direction: 'sendrecv' }), // microphone
        this.pc.addTransceiver('video', { direction: 'sendrecv' }), // camera
        this.pc.addTransceiver('video', { direction: 'sendrecv' }), // screen
        this.pc.addTransceiver('audio', { direction: 'sendrecv' }), // screen audio
      ];
      // Created here so its m-line rides along in the same initial offer as the
      // media lines, rather than costing a second negotiation.
      this.bindControl(this.pc.createDataChannel('control'));
    }

    this.pc.ondatachannel = ({ channel }) => {
      if (channel.label === 'control') this.bindControl(channel);
    };

    this.pc.onnegotiationneeded = async () => {
      try {
        this.makingOffer = true;
        await this.pc.setLocalDescription();
        if (this.pc.localDescription) {
          opts.send({ type: 'description', description: this.pc.localDescription.toJSON() });
        }
      } catch (err) {
        opts.onError?.(err);
      } finally {
        this.makingOffer = false;
      }
    };

    this.pc.onicecandidate = ({ candidate }) => {
      if (candidate) opts.send({ type: 'candidate', candidate: candidate.toJSON() });
    };

    this.pc.ontrack = ({ track, transceiver }) => {
      // Position, not object identity: on the polite side this fires while the
      // offer is still being applied, before the transceivers are adopted.
      const line = this.pc.getTransceivers().indexOf(transceiver);

      if (line === SCREEN) {
        this.watchRemoteScreen(track);
        return;
      }
      if (line === SCREEN_AUDIO) {
        // Same stream as the screen video, so one <video> element plays both.
        this.remoteScreenStream.addTrack(track);
        return;
      }

      this.remoteStream.addTrack(track);
      opts.onRemoteStream(this.remoteStream);
    };

    this.pc.onconnectionstatechange = () => {
      const state = this.pc.connectionState;
      opts.onConnectionState(state);

      if (state === 'connected') {
        this.clearRecoveryTimer();
      } else if (state === 'failed') {
        this.restartIce();
      } else if (state === 'disconnected') {
        // 'disconnected' often heals on its own — a brief blip, a network
        // switch. Give it a moment before forcing a new ICE round.
        this.clearRecoveryTimer();
        this.recoveryTimer = setTimeout(() => {
          if (this.pc.connectionState === 'disconnected') this.restartIce();
        }, 4000);
      }
    };
  }

  /**
   * Re-gathers candidates and renegotiates over the existing connection, which
   * is how a call survives a network change. Only the impolite peer initiates,
   * so the two sides don't both tear the path down at once; perfect negotiation
   * would survive that, but it costs an extra round trip every time.
   */
  private restartIce() {
    if (this.closed || this.opts.polite) return;
    try {
      this.pc.restartIce(); // fires onnegotiationneeded, which sends the offer
    } catch (err) {
      this.opts.onError?.(err);
    }
  }

  private clearRecoveryTimer() {
    if (this.recoveryTimer) {
      clearTimeout(this.recoveryTimer);
      this.recoveryTimer = null;
    }
  }

  private bindControl(channel: RTCDataChannel) {
    this.control = channel;
    channel.onopen = () => {
      for (const msg of this.controlQueue) channel.send(msg);
      this.controlQueue = [];
    };
    channel.onmessage = ({ data }) => {
      try {
        const msg = JSON.parse(data as string);
        if (msg.type === 'screen') {
          this.remoteSharing = Boolean(msg.on);
          this.reportRemoteScreen();
        }
      } catch {
        // Not ours to interpret.
      }
    };
  }

  private sendControl(msg: unknown) {
    const encoded = JSON.stringify(msg);
    if (this.control?.readyState === 'open') this.control.send(encoded);
    else this.controlQueue.push(encoded);
  }

  /**
   * The screen line is negotiated from the start, so a track arrives on it
   * immediately and sits there muted until the other side actually shares.
   *
   * Showing waits for real frames — unmute — so the viewer never gets a black
   * rectangle. Hiding follows the control message instead, because a sender
   * that stops simply goes quiet, and the browser takes several seconds of
   * silence before it mutes the track. Waiting for that leaves a frozen last
   * frame sitting on screen long after the share ended.
   */
  private watchRemoteScreen(track: MediaStreamTrack) {
    this.remoteScreenTrack = track;
    this.remoteScreenStream.addTrack(track);
    track.onunmute = () => this.reportRemoteScreen();
    track.onmute = () => this.reportRemoteScreen();
    this.reportRemoteScreen();
  }

  private reportRemoteScreen() {
    if (this.closed) return;
    const live = this.remoteSharing && this.remoteScreenTrack && !this.remoteScreenTrack.muted;
    this.opts.onRemoteScreen(live ? this.remoteScreenStream : null);
  }

  /** Attach local capture. Held until the transceivers exist, then applied. */
  async setLocalTracks(audio: MediaStreamTrack | null, video: MediaStreamTrack | null) {
    this.pending[MIC] = audio;
    this.pending[CAMERA] = video;
    await this.flushTracks();
  }

  /** Swap what the microphone line carries — raw capture, or processed. */
  async setMicTrack(track: MediaStreamTrack | null) {
    this.pending[MIC] = track;
    await this.flushTracks();
  }

  /**
   * Start or stop sharing. Once negotiated, this is a replaceTrack on m-lines
   * that already exist — no renegotiation, no round trip. `audio` is null
   * whenever the chosen surface came without it, which is most of them.
   */
  async setScreenTrack(track: MediaStreamTrack | null, audio: MediaStreamTrack | null = null) {
    this.pending[SCREEN] = track;
    this.pending[SCREEN_AUDIO] = audio;
    await this.flushTracks();
    // Queued if the channel isn't open yet, which also covers a session rebuilt
    // mid-share after a reconnect: the state is re-announced on open.
    this.sendControl({ type: 'screen', on: Boolean(track) });
  }

  private async flushTracks() {
    if (!this.transceivers || this.closed) return;
    await Promise.all(
      this.transceivers.map((t, i) => t.sender.replaceTrack(this.pending[i] ?? null)),
    );
  }

  /**
   * Called on the polite side once an offer has created the m-lines. Directions
   * are set before the answer is built, so the tracks ride out on it rather
   * than costing another negotiation round.
   */
  private async adoptTransceivers() {
    const all = this.pc.getTransceivers();
    if (all.length < LINES) return;

    this.transceivers = all.slice(0, LINES);
    for (const t of this.transceivers) {
      if (t.direction !== 'sendrecv') t.direction = 'sendrecv';
    }
    await this.flushTracks();
  }

  /** Feed in anything the transport delivered from the other peer. */
  async handleSignal(msg: ServerMessage) {
    if (this.closed) return;
    try {
      if (msg.type === 'description') {
        await this.handleDescription(msg.description);
      } else if (msg.type === 'candidate') {
        await this.handleCandidate(msg.candidate);
      }
    } catch (err) {
      this.opts.onError?.(err);
    }
  }

  private async handleDescription(description: RTCSessionDescriptionInit) {
    const readyForOffer =
      !this.makingOffer &&
      (this.pc.signalingState === 'stable' || this.isSettingRemoteAnswerPending);
    const offerCollision = description.type === 'offer' && !readyForOffer;

    // Impolite peer wins the collision and simply drops the incoming offer.
    this.ignoreOffer = !this.opts.polite && offerCollision;
    if (this.ignoreOffer) return;

    this.isSettingRemoteAnswerPending = description.type === 'answer';
    await this.pc.setRemoteDescription(description);
    this.isSettingRemoteAnswerPending = false;

    if (description.type === 'offer') {
      if (!this.transceivers) await this.adoptTransceivers();
      await this.pc.setLocalDescription();
      if (this.pc.localDescription) {
        this.opts.send({ type: 'description', description: this.pc.localDescription.toJSON() });
      }
    }
  }

  private async handleCandidate(candidate: RTCIceCandidateInit) {
    try {
      await this.pc.addIceCandidate(candidate);
    } catch (err) {
      // Candidates for an offer we deliberately ignored will fail. Expected.
      if (!this.ignoreOffer) throw err;
    }
  }

  get connectionState() {
    return this.pc.connectionState;
  }

  close() {
    if (this.closed) return;
    this.closed = true;
    this.clearRecoveryTimer();
    this.pc.onnegotiationneeded = null;
    this.pc.onicecandidate = null;
    this.pc.ontrack = null;
    this.pc.onconnectionstatechange = null;
    this.pc.close();
    this.remoteStream.getTracks().forEach((t) => this.remoteStream.removeTrack(t));
  }
}
