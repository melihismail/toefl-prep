import { useEffect, useRef, useState } from 'react';
import { MediaController } from '../core/MediaController.ts';
import { Video } from './Video.tsx';

interface PreJoinProps {
  roomId: string;
  onJoin: (args: { name: string; stream: MediaStream }) => void;
}

/**
 * Exists for two reasons beyond politeness: browsers want a user gesture before
 * a call starts, and permission prompts are much less alarming when the user
 * already knows what they are about to join.
 */
export function PreJoin({ roomId, onJoin }: PreJoinProps) {
  const [name, setName] = useState('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handedOff = useRef(false);

  useEffect(() => {
    const media = new MediaController();
    let cancelled = false;

    media
      .start()
      .then((s) => {
        if (!cancelled) setStream(s);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(
          err instanceof DOMException && err.name === 'NotAllowedError'
            ? 'Camera and microphone permission was denied.'
            : 'Could not open the camera or microphone.',
        );
      });

    return () => {
      cancelled = true;
      // The stream is handed to the call on join — don't stop it then.
      if (!handedOff.current) media.stop();
    };
  }, []);

  const canJoin = Boolean(stream) && name.trim().length > 0;

  return (
    <div className="vc-panel">
      <div className="vc-preview">
        {stream ? (
          <Video stream={stream} muted mirrored className="vc-video" />
        ) : (
          <div className="vc-placeholder">{error ?? 'Opening camera…'}</div>
        )}
      </div>

      <div className="vc-panel-body">
        <h1 className="vc-title">Join the call</h1>
        <p className="vc-muted">
          Room <code className="vc-code">{roomId}</code>
        </p>

        <form
          className="vc-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!canJoin || !stream) return;
            handedOff.current = true;
            onJoin({ name: name.trim(), stream });
          }}
        >
          <input
            className="vc-input"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={40}
          />
          <button className="vc-btn" type="submit" disabled={!canJoin}>
            Join
          </button>
        </form>

        {error && <p className="vc-error">{error}</p>}
      </div>
    </div>
  );
}
