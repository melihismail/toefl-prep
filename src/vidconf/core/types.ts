export type Role = 'polite' | 'impolite';

/** Sent by the browser to the signaling server. */
export type ClientMessage =
  /** clientId identifies the tab across reconnects, so it can reclaim its slot. */
  | { type: 'join'; room: string; name: string; clientId: string }
  | { type: 'description'; description: RTCSessionDescriptionInit }
  | { type: 'candidate'; candidate: RTCIceCandidateInit };

/** Sent by the signaling server to the browser. */
export type ServerMessage =
  | { type: 'joined'; role: Role; peer: { name: string } | null }
  | { type: 'peer-joined'; name: string }
  | { type: 'peer-left' }
  | { type: 'room-full' }
  | { type: 'description'; description: RTCSessionDescriptionInit }
  | { type: 'candidate'; candidate: RTCIceCandidateInit };

/**
 * The entire seam between this component and whatever delivers messages to the
 * other peer. Swap in a host app's own socket by implementing this.
 */
export interface SignalingTransport {
  send(msg: ClientMessage): void;
  /** Returns an unsubscribe function. */
  onMessage(cb: (msg: ServerMessage) => void): () => void;
  close(): void;
}
