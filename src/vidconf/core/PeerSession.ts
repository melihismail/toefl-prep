import type { ClientMessage, ServerMessage } from './types.ts';

export interface PeerSessionOptions {
  /** Polite peers yield when both sides offer simultaneously. */
  polite: boolean;
  iceServers: RTCIceServer[];
  send: (msg: ClientMessage) => void;
  onRemoteStream: (stream: MediaStream) => void;
  onConnectionState: (state: RTCPeerConnectionState) => void;
  onError?: (err: unknown) => void;
}

/**
 * One peer connection, one call. Plain class on purpose — a call is an
 * event-driven state machine whose side effects must happen once and in order,
 * which is the opposite of what a render cycle guarantees.
 *
 * Negotiation follows the W3C "perfect negotiation" pattern, which is what
 * makes simultaneous offers (glare) and mid-call renegotiation safe.
 */
export class PeerSession {
  private pc: RTCPeerConnection;
  private opts: PeerSessionOptions;
  private remoteStream = new MediaStream();

  // Perfect-negotiation bookkeeping.
  private makingOffer = false;
  private ignoreOffer = false;
  private isSettingRemoteAnswerPending = false;

  private audioTransceiver: RTCRtpTransceiver;
  private videoTransceiver: RTCRtpTransceiver;
  private closed = false;

  constructor(opts: PeerSessionOptions) {
    this.opts = opts;
    this.pc = new RTCPeerConnection({ iceServers: opts.iceServers });

    // Fixed transceiver order on both sides, so m-line 0 is always audio and
    // m-line 1 is always video. Swapping what we send is then a replaceTrack
    // rather than a renegotiation — the groundwork for screen sharing.
    this.audioTransceiver = this.pc.addTransceiver('audio', { direction: 'sendrecv' });
    this.videoTransceiver = this.pc.addTransceiver('video', { direction: 'sendrecv' });

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

    this.pc.ontrack = ({ track }) => {
      this.remoteStream.addTrack(track);
      opts.onRemoteStream(this.remoteStream);
    };

    this.pc.onconnectionstatechange = () => {
      opts.onConnectionState(this.pc.connectionState);
    };
  }

  /** Attach local capture. Triggers negotiation via onnegotiationneeded. */
  async setLocalTracks(audio: MediaStreamTrack | null, video: MediaStreamTrack | null) {
    await this.audioTransceiver.sender.replaceTrack(audio);
    await this.videoTransceiver.sender.replaceTrack(video);
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
    this.pc.onnegotiationneeded = null;
    this.pc.onicecandidate = null;
    this.pc.ontrack = null;
    this.pc.onconnectionstatechange = null;
    this.pc.close();
    this.remoteStream.getTracks().forEach((t) => this.remoteStream.removeTrack(t));
  }
}
