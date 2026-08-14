import type { ClientMessage, ServerMessage, SignalingTransport } from './types.ts';

export interface SignalingClientOptions {
  onOpen?: (reconnected: boolean) => void;
  /** Fired once the connection is gone for good. */
  onClose?: () => void;
  /** Fired on each failed attempt while the connection is down. */
  onRetry?: (attempt: number, everConnected: boolean) => void;
  /** Attempts before giving up. */
  maxRetries?: number;
}

const MAX_DELAY_MS = 8000;

/**
 * Default WebSocket implementation of SignalingTransport.
 *
 * Reconnects on any unexpected close, not just the first one. Two things need
 * that: the free-tier host sleeps when idle and takes the better part of a
 * minute to wake, and networks drop. On every (re)connect it replays the join
 * message, so the server can hand the tab back its slot in the room.
 */
export class SignalingClient implements SignalingTransport {
  private ws: WebSocket | null = null;
  private listeners = new Set<(msg: ServerMessage) => void>();
  private queue: ClientMessage[] = [];
  private joinMessage: ClientMessage | null = null;
  private closed = false;
  private everConnected = false;
  private attempt = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;

  private readonly url: string;
  private readonly opts: SignalingClientOptions;
  private readonly maxRetries: number;

  constructor(url: string, opts: SignalingClientOptions = {}) {
    this.url = url;
    this.opts = opts;
    this.maxRetries = opts.maxRetries ?? 20;
    this.connect();
  }

  private connect() {
    if (this.closed) return;

    const ws = new WebSocket(this.url);
    this.ws = ws;

    ws.onopen = () => {
      const reconnected = this.everConnected;
      this.everConnected = true;
      this.attempt = 0;

      // Re-announce ourselves first: on a reconnect the server has to put us
      // back in the room before any relayed message makes sense.
      if (this.joinMessage) ws.send(JSON.stringify(this.joinMessage));
      for (const msg of this.queue) ws.send(JSON.stringify(msg));
      this.queue = [];

      this.opts.onOpen?.(reconnected);
    };

    ws.onmessage = (ev) => {
      let msg: ServerMessage;
      try {
        msg = JSON.parse(ev.data as string);
      } catch {
        return;
      }
      for (const cb of this.listeners) cb(msg);
    };

    ws.onclose = () => {
      if (this.closed) return;

      if (this.attempt < this.maxRetries) {
        this.attempt += 1;
        this.opts.onRetry?.(this.attempt, this.everConnected);
        // Backoff, capped: a sleeping host takes ~a minute to wake, a flaky
        // network usually far less.
        const delay = Math.min(1000 * 2 ** (this.attempt - 1), MAX_DELAY_MS);
        this.timer = setTimeout(() => this.connect(), delay);
        return;
      }

      this.opts.onClose?.();
    };
  }

  send(msg: ClientMessage) {
    if (this.closed) return;

    // Held separately from the queue so it is replayed on every reconnect
    // rather than sent once.
    if (msg.type === 'join') this.joinMessage = msg;

    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    } else if (msg.type !== 'join') {
      this.queue.push(msg);
    }
  }

  onMessage(cb: (msg: ServerMessage) => void) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  close() {
    this.closed = true;
    this.listeners.clear();
    if (this.timer) clearTimeout(this.timer);
    this.ws?.close();
  }
}
