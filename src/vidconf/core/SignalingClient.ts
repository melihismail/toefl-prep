import type { ClientMessage, ServerMessage, SignalingTransport } from './types.ts';

export interface SignalingClientOptions {
  onOpen?: () => void;
  /** Fired once the connection is gone for good. */
  onClose?: () => void;
  /** Fired on each failed attempt before the connection has ever opened. */
  onRetry?: (attempt: number) => void;
  /** Attempts before giving up on the first connection. */
  maxRetries?: number;
  retryDelayMs?: number;
}

/**
 * Default WebSocket implementation of SignalingTransport.
 *
 * Retries the initial connection, because the free-tier host sleeps when idle
 * and takes the better part of a minute to wake — without this, the first
 * person to open a link just sees a failure.
 */
export class SignalingClient implements SignalingTransport {
  private ws: WebSocket | null = null;
  private listeners = new Set<(msg: ServerMessage) => void>();
  private queue: ClientMessage[] = [];
  private closed = false;
  private opened = false;
  private attempt = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;

  private readonly url: string;
  private readonly opts: SignalingClientOptions;
  private readonly maxRetries: number;
  private readonly retryDelayMs: number;

  constructor(url: string, opts: SignalingClientOptions = {}) {
    this.url = url;
    this.opts = opts;
    this.maxRetries = opts.maxRetries ?? 12;
    this.retryDelayMs = opts.retryDelayMs ?? 5000;
    this.connect();
  }

  private connect() {
    if (this.closed) return;

    const ws = new WebSocket(this.url);
    this.ws = ws;

    ws.onopen = () => {
      this.opened = true;
      this.attempt = 0;
      for (const msg of this.queue) ws.send(JSON.stringify(msg));
      this.queue = [];
      this.opts.onOpen?.();
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

      // A connection that never opened is probably a host still waking up.
      if (!this.opened && this.attempt < this.maxRetries) {
        this.attempt += 1;
        this.opts.onRetry?.(this.attempt);
        this.timer = setTimeout(() => this.connect(), this.retryDelayMs);
        return;
      }

      this.opts.onClose?.();
    };
  }

  send(msg: ClientMessage) {
    if (this.closed) return;
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    } else {
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
