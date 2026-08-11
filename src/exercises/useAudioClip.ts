import { useCallback, useEffect, useRef, useState } from 'react';

export type ClipStatus = 'idle' | 'loading' | 'playing';

/** Longest we wait for a clip to buffer before starting it regardless. */
const READY_TIMEOUT_MS = 8000;

/**
 * Resolves once the browser reckons it can play the clip without stalling.
 * canplaythrough is the signal; readyState is checked too because a cached
 * clip can already be ready before any listener is attached.
 */
function whenReady(el: HTMLAudioElement): Promise<boolean> {
  if (el.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) return Promise.resolve(true);
  return new Promise((resolve) => {
    let settled = false;
    const done = (ok: boolean) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      el.removeEventListener('canplaythrough', onReady);
      el.removeEventListener('error', onError);
      resolve(ok);
    };
    const onReady = () => done(true);
    const onError = () => done(false);
    // A slow connection should not leave the button dead — start anyway and
    // let the browser stall if it must.
    const timer = setTimeout(() => done(true), READY_TIMEOUT_MS);
    el.addEventListener('canplaythrough', onReady);
    el.addEventListener('error', onError);
  });
}

/**
 * Plays one clip at a time, buffered before it is needed.
 *
 * The element is built as soon as the source is known and told to preload, so
 * the file is usually ready before anyone presses play. When it is not, play()
 * waits for enough data instead of starting mid-buffer — starting early is what
 * swallowed the opening words the first time a clip was heard.
 */
export function useAudioClip(src: string | null | undefined, onEnded?: () => void) {
  const el = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<ClipStatus>('idle');
  /** Read through a ref so changing the callback does not rebuild the element. */
  const ended = useRef(onEnded);
  ended.current = onEnded;

  useEffect(() => {
    setStatus('idle');
    if (!src) {
      el.current = null;
      return;
    }
    const a = new Audio();
    a.preload = 'auto';
    a.src = encodeURI(src);
    // Buffering starts here, not on the click.
    a.load();
    el.current = a;
    return () => {
      a.pause();
      a.src = '';
      el.current = null;
    };
  }, [src]);

  const stop = useCallback(() => {
    const a = el.current;
    if (a) {
      a.pause();
      a.currentTime = 0;
    }
    setStatus('idle');
  }, []);

  const play = useCallback(async () => {
    const a = el.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;

    if (a.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA) {
      setStatus('loading');
      const ok = await whenReady(a);
      // The passage may have changed while we waited.
      if (el.current !== a) return;
      if (!ok) {
        setStatus('idle');
        return;
      }
    }

    a.onended = () => {
      setStatus('idle');
      ended.current?.();
    };
    a.onerror = () => setStatus('idle');
    setStatus('playing');
    try {
      await a.play();
    } catch {
      setStatus('idle');
    }
  }, []);

  // Nothing should keep playing once the component goes away.
  useEffect(() => stop, [stop]);

  return { status, play, stop, hasClip: Boolean(src) };
}
