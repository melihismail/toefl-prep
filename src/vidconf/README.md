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

**Screen sharing.** The session carries four media lines in a fixed order —
microphone, camera, screen, screen audio — created up front, so starting a
share is a `replaceTrack` on m-lines that already exist: no renegotiation, no
round trip. Each side identifies an arriving track by the position of the
transceiver it came in on. Screen audio rides its own line so it never has to
displace the microphone, and joins the same `MediaStream` as the screen video
so one `<video>` element plays both.

The picker belongs to the browser — entire screen, window, or tab — and so does
whether audio comes with it. A tab yields that tab's audio; an entire screen
yields system audio on Windows but not macOS; a window yields none anywhere;
Firefox and Safari yield none at all. Audio is requested and may simply not
arrive, which the UI says out loud.

Only the impolite peer creates those lines. If both did, each would offer its
own set and they would negotiate into two disjoint groups of m-lines, one per
direction, which breaks the positional mapping. The polite peer adopts whatever
the offer creates, setting directions before building the answer so its tracks
ride out on it.

A small `control` data channel carries share on/off. Showing waits for real
frames (the track's `unmute`), so the viewer never sees a black rectangle;
hiding follows the control message, because a sender that stops just goes quiet
and the browser takes several seconds of silence before muting the track —
long enough to leave a frozen frame on screen.

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
- **Sharing system audio echoes.** On Windows, "share system audio" is a
  loopback of the default output device, so it re-sends whatever your speakers
  are playing — including the other person's voice. The microphone's echo
  canceller doesn't touch a separate capture track. Headphones, or a tab share,
  avoid it.
- **No screen share on iOS Safari** — `getDisplayMedia` doesn't exist there, so
  the button is hidden.
- **Both peers can share at once**, and each sees the other's screen. Nothing
  arbitrates.

**Noise suppression.** Off by default, toggled per call. Enabling routes the
microphone through an RNNoise AudioWorklet — mic track → source → worklet →
destination → the track actually sent — and turns the browser's own noise
suppression and gain control off while it runs, or the two fight. Echo
cancellation stays on either way; nothing here replaces it. The wasm (~150 kB,
lazily fetched) only loads when someone turns it on.

## Later

**Noise suppression, without the toggle.** Whether it should default on is a
question for real microphones and ears, not synthetic signals.

**Tuning.** RNNoise runs at its stock settings. If it chews up speech or leaves
too much through, the same package also carries Speex and GTCRN, swappable
behind `NoiseSuppressor` without touching anything else.
