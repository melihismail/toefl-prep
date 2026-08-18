import { useEffect, useRef } from 'react';

interface VideoProps {
  stream: MediaStream | null;
  /** Always mute your own preview, or you get feedback howl. */
  muted?: boolean;
  mirrored?: boolean;
  className?: string;
}

export function Video({ stream, muted = false, mirrored = false, className }: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  // srcObject is set imperatively — it isn't a serialisable prop, and going
  // through React would churn the element on every render.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.srcObject = stream;
    return () => {
      el.srcObject = null;
    };
  }, [stream]);

  return (
    <video
      ref={ref}
      autoPlay
      playsInline
      muted={muted}
      className={className}
      style={mirrored ? { transform: 'scaleX(-1)' } : undefined}
    />
  );
}
