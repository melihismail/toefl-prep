import { useCallback, useEffect, useRef, useState } from 'react';
import { PeerSession } from '../core/PeerSession.ts';
import { SignalingClient } from '../core/SignalingClient.ts';
import type { Role, ServerMessage, SignalingTransport } from '../core/types.ts';
import { ICE_SERVERS } from '../config.ts';

export type CallStatus =
  | 'connecting' // opening the signaling socket
  | 'waiting' // in the room, alone
  | 'linking' // peer is here, negotiating
  | 'connected' // media flowing
  | 'failed' // ICE gave up
  | 'error';

const TAB_ID_KEY = 'vidconf-tab-id';

/**
 * Stable per-tab id, so a reconnecting or refreshed tab can reclaim its slot in
 * the room instead of being turned away by its own stale socket. sessionStorage
 * rather than localStorage on purpose: two tabs should count as two people,
 * which is also what makes testing with yourself work.
 */
function tabId(): string {
  let id = sessionStorage.getItem(TAB_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(TAB_ID_KEY, id);
  }
  return id;
}

export interface UseVideoCallOptions {
  roomId: string;
  name: string;
  localStream: MediaStream;
  signalingUrl: string;
  /** Supply your own transport to ride on a host app's existing socket. */
  transport?: SignalingTransport;
  iceServers?: RTCIceServer[];
}

export function useVideoCall({
  roomId,
  name,
  localStream,
  signalingUrl,
  transport,
  iceServers = ICE_SERVERS,
}: UseVideoCallOptions) {
  const [status, setStatus] = useState<CallStatus>('connecting');
  const [peerName, setPeerName] = useState<string | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [micEnabled, setMicEnabled] = useState(true);
  const [camEnabled, setCamEnabled] = useState(true);

  const sessionRef = useRef<PeerSession | null>(null);

  useEffect(() => {
    let cancelled = false;
    const roleRef = { current: null as Role | null };

    const signaling: SignalingTransport =
      transport ??
      new SignalingClient(signalingUrl, {
        onOpen: () => {
          if (!cancelled) setNotice(null);
        },
        onRetry: (attempt, everConnected) => {
          if (cancelled) return;
          // Two different situations wear the same spinner: a host that has
          // gone to sleep, and a connection that dropped mid-call.
          setNotice(
            everConnected
              ? `Reconnecting… (attempt ${attempt})`
              : `Waking the signaling server… (attempt ${attempt})`,
          );
        },
        onClose: () => {
          if (!cancelled) {
            setError('Lost the connection to the signaling server.');
            setStatus('error');
          }
        },
      });

    const startSession = () => {
      if (cancelled || roleRef.current === null) return;
      sessionRef.current?.close();

      const session = new PeerSession({
        polite: roleRef.current === 'polite',
        iceServers,
        send: (msg) => signaling.send(msg),
        onRemoteStream: (stream) => {
          if (!cancelled) setRemoteStream(stream);
        },
        onConnectionState: (state) => {
          if (cancelled) return;
          if (state === 'connected') setStatus('connected');
          else if (state === 'failed') setStatus('failed');
          else if (state === 'connecting' || state === 'new') setStatus('linking');
        },
        onError: (err) => {
          if (cancelled) return;
          setError(err instanceof Error ? err.message : String(err));
        },
      });

      sessionRef.current = session;
      setStatus('linking');

      void session.setLocalTracks(
        localStream.getAudioTracks()[0] ?? null,
        localStream.getVideoTracks()[0] ?? null,
      );
    };

    const unsubscribe = signaling.onMessage((msg: ServerMessage) => {
      if (cancelled) return;

      switch (msg.type) {
        case 'joined':
          roleRef.current = msg.role;
          if (msg.peer) {
            setPeerName(msg.peer.name);
            // This also arrives after a signaling reconnect. Media runs
            // independently of the signaling socket, so a call that is still up
            // must not be torn down just because the socket blipped.
            if (sessionRef.current?.connectionState !== 'connected') startSession();
          } else {
            setStatus('waiting');
          }
          break;

        case 'peer-joined':
          setPeerName(msg.name);
          startSession();
          break;

        case 'peer-left':
          sessionRef.current?.close();
          sessionRef.current = null;
          setRemoteStream(null);
          setPeerName(null);
          setStatus('waiting');
          break;

        case 'room-full':
          setError('This room already has two people in it.');
          setStatus('error');
          break;

        case 'description':
        case 'candidate':
          void sessionRef.current?.handleSignal(msg);
          break;
      }
    });

    signaling.send({ type: 'join', room: roomId, name, clientId: tabId() });

    return () => {
      cancelled = true;
      unsubscribe();
      sessionRef.current?.close();
      sessionRef.current = null;
      // Only close a transport we created ourselves.
      if (!transport) signaling.close();
    };
  }, [roomId, name, localStream, signalingUrl, transport, iceServers]);

  const toggleMic = useCallback(() => {
    setMicEnabled((prev) => {
      const next = !prev;
      localStream.getAudioTracks().forEach((t) => (t.enabled = next));
      return next;
    });
  }, [localStream]);

  const toggleCam = useCallback(() => {
    setCamEnabled((prev) => {
      const next = !prev;
      localStream.getVideoTracks().forEach((t) => (t.enabled = next));
      return next;
    });
  }, [localStream]);

  return {
    status,
    peerName,
    remoteStream,
    error,
    notice,
    micEnabled,
    camEnabled,
    toggleMic,
    toggleCam,
  };
}
