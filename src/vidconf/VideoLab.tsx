import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createRoomId, signalingUrl } from './config.ts';
import { PreJoin } from './react/PreJoin.tsx';
import { VideoCall } from './react/VideoCall.tsx';
import './vidconf.css';

/**
 * Standalone shell for the call component: URL parsing and room creation live
 * here, not in VideoCall, because an embedded entry point would be a button
 * rather than a link.
 *
 * Reached only via the unlisted path in config.ts — App.tsx sends every other
 * unknown route to '/'.
 */
export function VideoLab() {
  const [params, setParams] = useSearchParams();
  const [joined, setJoined] = useState<{ name: string; stream: MediaStream } | null>(null);

  const roomId = params.get('room');
  const url = signalingUrl();

  if (!url) {
    return (
      <div className="vc-root">
        <div className="vc-panel vc-narrow">
          <div className="vc-panel-body">
            <h1 className="vc-title">Signaling server not configured</h1>
            <p className="vc-muted">
              This site is static, so it cannot host the WebSocket server the two peers need in
              order to find each other. Set <code className="vc-code">VITE_SIGNALING_URL</code> at
              build time to wherever that server runs.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!roomId) {
    return (
      <div className="vc-root">
        <div className="vc-panel vc-narrow">
          <div className="vc-panel-body">
            <h1 className="vc-title">Video test</h1>
            <p className="vc-muted">
              One-to-one, peer-to-peer. Create a room and send the link to one person.
            </p>
            <button className="vc-btn" onClick={() => setParams({ room: createRoomId() })}>
              Create a room
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!joined) {
    return (
      <div className="vc-root">
        <PreJoin roomId={roomId} onJoin={setJoined} />
      </div>
    );
  }

  return (
    <div className="vc-root">
      <VideoCall
        roomId={roomId}
        name={joined.name}
        localStream={joined.stream}
        signalingUrl={url}
        onLeave={() => {
          joined.stream.getTracks().forEach((t) => t.stop());
          setJoined(null);
          setParams({});
        }}
      />
    </div>
  );
}
