import { createServer } from 'node:http'
import { WebSocketServer } from 'ws'

// SIGNALING_PORT wins so a local launcher can pin it; PORT is what hosts like
// Render inject.
const PORT = Number(process.env.SIGNALING_PORT || process.env.PORT || 8080)
const MAX_PER_ROOM = 2

/**
 * Signaling server. Deliberately dumb: it matchmakes two sockets into a room and
 * relays opaque blobs between them. It never sees media — once the peers are
 * connected you can kill this process and the call keeps running.
 *
 * The one bit of authority it holds: it assigns the polite/impolite roles by
 * arrival order, so the peers have a deterministic tiebreaker when both try to
 * negotiate at the same time.
 */

/** @type {Map<string, Set<import('ws').WebSocket>>} */
const rooms = new Map()

// A plain HTTP server underneath, so platform health checks get a 200 instead
// of the 426 a bare WebSocket server answers with.
const http = createServer((req, res) => {
  if (req.url === '/healthz' || req.url === '/') {
    res.writeHead(200, { 'content-type': 'text/plain' })
    res.end('ok')
    return
  }
  res.writeHead(404)
  res.end()
})

const wss = new WebSocketServer({ server: http })

wss.on('connection', (ws) => {
  ws.isAlive = true
  ws.room = null
  ws.name = null

  ws.on('pong', () => { ws.isAlive = true })

  ws.on('message', (raw) => {
    let msg
    try {
      msg = JSON.parse(raw.toString())
    } catch {
      return
    }

    if (msg.type === 'join') {
      join(ws, msg)
      return
    }

    // Everything else is relayed verbatim to the other occupant.
    if (msg.type === 'description' || msg.type === 'candidate') {
      const peer = otherPeer(ws)
      if (peer) send(peer, msg)
    }
  })

  ws.on('close', () => leave(ws))
  ws.on('error', () => leave(ws))
})

function join(ws, { room, name, clientId }) {
  if (typeof room !== 'string' || !room) return
  if (ws.room) return // already joined

  const occupants = rooms.get(room) ?? new Set()

  // A refreshed or reconnected tab reclaims the slot its previous socket held.
  // Without this it gets turned away by its own zombie: a browser that navigates
  // away often sends no close frame, so the old socket lingers until the
  // heartbeat notices and the person who just left cannot get back in.
  if (typeof clientId === 'string' && clientId) {
    for (const peer of [...occupants]) {
      if (peer.clientId !== clientId) continue
      occupants.delete(peer)
      peer.room = null // so its close handler doesn't announce a departure
      peer.terminate()
      log(`reclaim ${room} — ${peer.name}`)
    }
  }

  if (occupants.size >= MAX_PER_ROOM) {
    send(ws, { type: 'room-full' })
    ws.close()
    return
  }

  ws.room = room
  ws.name = typeof name === 'string' && name.trim() ? name.trim().slice(0, 40) : 'Guest'
  ws.clientId = typeof clientId === 'string' ? clientId : null

  const existing = [...occupants][0] ?? null

  // The two roles must be opposite. Derive it from whoever is already here
  // rather than from arrival order, which stops being reliable once a peer can
  // drop and rejoin.
  ws.role = existing ? (existing.role === 'polite' ? 'impolite' : 'polite') : 'polite'

  occupants.add(ws)
  rooms.set(room, occupants)

  send(ws, {
    type: 'joined',
    role: ws.role,
    peer: existing ? { name: existing.name } : null,
  })

  if (existing) send(existing, { type: 'peer-joined', name: ws.name })

  log(`join  ${room} (${occupants.size}/${MAX_PER_ROOM}) — ${ws.name} [${ws.role}]`)
}

function leave(ws) {
  if (!ws.room) return
  const occupants = rooms.get(ws.room)
  if (!occupants) return

  occupants.delete(ws)
  for (const peer of occupants) send(peer, { type: 'peer-left' })

  if (occupants.size === 0) rooms.delete(ws.room)
  log(`leave ${ws.room} (${occupants.size}/${MAX_PER_ROOM}) — ${ws.name}`)
  ws.room = null
}

function otherPeer(ws) {
  const occupants = ws.room ? rooms.get(ws.room) : null
  if (!occupants) return null
  for (const peer of occupants) if (peer !== ws) return peer
  return null
}

function send(ws, msg) {
  if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(msg))
}

function log(line) {
  console.log(`[signaling] ${line}`)
}

// Drop sockets that died without a close frame, so a refreshed tab doesn't
// permanently occupy one of the two slots.
const heartbeat = setInterval(() => {
  for (const ws of wss.clients) {
    if (!ws.isAlive) {
      ws.terminate()
      continue
    }
    ws.isAlive = false
    ws.ping()
  }
}, 8000)

wss.on('close', () => clearInterval(heartbeat))

http.listen(PORT, () => {
  console.log(`[signaling] listening on port ${PORT}`)
})
