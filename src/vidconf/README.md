# Video call page

One-to-one, peer-to-peer video at `/meet`. Create a room, send the link, one
other person joins. STUN only — media goes browser to browser and never touches
a server.

```
core/                 all WebRTC logic, no React
  PeerSession.ts        one RTCPeerConnection, perfect negotiation, ICE restart
  SignalingClient.ts    default WebSocket transport, reconnecting
  MediaController.ts    local capture
  types.ts              the message contract + SignalingTransport interface
react/                thin view layer
  useVideoCall.ts       orchestration hook
  VideoCall.tsx         the drop-in component
  PreJoin.tsx           name + camera check before joining
  Video.tsx             srcObject wrapper
VideoLab.tsx          page shell: room creation, pre-join, call, leave
config.ts             route path, ICE servers, signaling URL
```

The signaling server is not here — it deploys separately from `signaling/` at
the repo root. See `render.yaml`.

## Why the engine isn't React

A call is an event-driven state machine whose side effects must happen once and
in order, which is the opposite of what a render cycle guarantees. `core/` is
plain classes; React holds the session in a ref and renders what it reports.
Putting an `RTCPeerConnection` in state or in an effect body gets you duplicate
offers and races that only reproduce on slow networks.

## Embedding it elsewhere

`VideoCall` takes a room id, a name, a `MediaStream` and a signaling URL. It
knows nothing about users, accounts, routing or permissions — those belong to
whatever app is hosting it.

The only real seam is `SignalingTransport` in `types.ts`. Pass a `transport`
prop implementing it and the component rides on a host app's existing socket
instead of opening its own:

```ts
interface SignalingTransport {
  send(msg: ClientMessage): void
  onMessage(cb: (msg: ServerMessage) => void): () => void
  close(): void
}
```

URL parsing lives in `VideoLab.tsx`, not in the component, because an embedded
entry point is a button rather than a link.

## Behaviour worth knowing

**Roles.** One peer is polite, the other impolite; the polite one yields when
both offer at once. The server assigns them, deriving the new peer's role from
whoever is already in the room rather than from arrival order — arrival order
stops being reliable once a peer can drop and rejoin.

**Slot reclaim.** Each tab carries a `clientId` in sessionStorage. On join the
server evicts that client's own previous socket before the capacity check, so a
refresh or reconnect gets back in instead of being turned away by its own
zombie. A genuine third person is still refused.

**Reconnection.** The signaling socket reconnects on any close with capped
backoff and replays its join message. Media recovers separately via
`restartIce()`, since a signaling drop doesn't affect a call already in
progress — which is also why a reconnect does not rebuild a peer connection
that is still `connected`.

## Limits

- **No TURN.** Roughly one connection in five is on a network that refuses
  direct peer-to-peer (symmetric NAT, corporate firewalls). Those fail with
  "couldn't establish a direct connection". Adding a hosted TURN service means
  appending one entry to `ICE_SERVERS` in `config.ts`.
- **No room expiry.** A link works forever; anyone holding it can join.
- **`/meet` is guessable.** The room id in the query string is the only thing
  keeping a call private.
- **Close-and-reopen** gets a fresh `clientId`, so a lingering socket can still
  block a rejoin for up to ~16s. Refresh is covered; full tab close isn't.

## Later

**Screen sharing** changes what the two peers agree on, so the groundwork is in:
`PeerSession` creates transceivers in a fixed order (audio = m-line 0, video =
m-line 1) and swaps tracks via `replaceTrack`, and perfect negotiation makes
mid-call renegotiation safe.

**Noise suppression** is purely local — nothing on the wire changes. It slots
into `MediaController` between capture and `outputAudioTrack`, an identity
pipeline today. Turn off the browser's built-in `noiseSuppression` there when
you add your own, or the two fight.
