/** Where the call page lives. Not linked from anywhere else in the site. */
export const VIDEO_LAB_PATH = '/meet';

/**
 * STUN only tells a browser what its own public address looks like — no media
 * passes through it, so calls stay genuinely peer-to-peer. List more than one;
 * the free ones carry no SLA.
 *
 * A call that fails outright is usually a network refusing direct connections
 * at all (symmetric NAT, corporate firewall). That case needs a TURN relay,
 * which is deliberately not configured here.
 */
export const ICE_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun.cloudflare.com:3478' },
];

/**
 * This site is static (GitHub Pages), so it cannot host the signaling server.
 * Point VITE_SIGNALING_URL at wherever that runs. Null means "not configured",
 * which the page reports rather than failing silently.
 */
export function signalingUrl(): string | null {
  const fromEnv = import.meta.env.VITE_SIGNALING_URL as string | undefined;
  if (fromEnv) return fromEnv;

  const { hostname } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1') return 'ws://localhost:8080';

  return null;
}

export function createRoomId(): string {
  const bytes = new Uint8Array(9);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
