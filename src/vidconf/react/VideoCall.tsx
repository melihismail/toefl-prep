import { useState } from 'react';
import { useVideoCall } from './useVideoCall.ts';
import { Video } from './Video.tsx';
import { screenShareSupported } from '../core/MediaController.ts';
import type { SignalingTransport } from '../core/types.ts';

interface VideoCallProps {
  roomId: string;
  name: string;
  localStream: MediaStream;
  signalingUrl: string;
  onLeave: () => void;
  transport?: SignalingTransport;
  iceServers?: RTCIceServer[];
}

/**
 * The drop-in component. Note what it does not know about: users, accounts,
 * permissions, routing. It takes a room id, a name and a stream — anything
 * richer belongs to the app embedding it.
 */
export function VideoCall({
  roomId,
  name,
  localStream,
  signalingUrl,
  onLeave,
  transport,
  iceServers,
}: VideoCallProps) {
  const {
    status,
    peerName,
    remoteStream,
    remoteScreen,
    localScreen,
    sharingAudio,
    error,
    notice,
    micEnabled,
    camEnabled,
    toggleMic,
    toggleCam,
    toggleScreenShare,
  } = useVideoCall({ roomId, name, localStream, signalingUrl, transport, iceServers });

  // A shared screen is the thing people are looking at, so it takes the stage
  // and the faces move to tiles beside it.
  const stage = remoteScreen ?? localScreen ?? remoteStream;
  const stageIsScreen = Boolean(remoteScreen ?? localScreen);
  const canShare = screenShareSupported();

  return (
    <div className="vc-call">
      <div className="vc-stage">
        {stage ? (
          <Video
            stream={stage}
            muted={stage === localScreen}
            className={stageIsScreen ? 'vc-video vc-contain' : 'vc-video'}
          />
        ) : (
          <WaitingRoom status={status} error={error} notice={notice} />
        )}

        <div className="vc-tiles">
          {stageIsScreen && remoteStream && (
            <div className="vc-tile">
              <Video stream={remoteStream} className="vc-video" />
              {peerName && <div className="vc-tile-name">{peerName}</div>}
            </div>
          )}
          <div className="vc-tile">
            <Video stream={localStream} muted mirrored className="vc-video" />
            {!camEnabled && <div className="vc-self-off">Camera off</div>}
          </div>
        </div>

        {localScreen && (
          <div className="vc-chip">
            {sharingAudio
              ? "You're sharing your screen with audio"
              : "You're sharing your screen — no audio on this surface"}
          </div>
        )}
        {remoteScreen && peerName && <div className="vc-chip">{peerName} is sharing a screen</div>}
        {!stageIsScreen && peerName && remoteStream && (
          <div className="vc-nameplate">{peerName}</div>
        )}
      </div>

      <div className="vc-controls">
        <button className={micEnabled ? 'vc-btn' : 'vc-btn vc-btn-off'} onClick={toggleMic}>
          {micEnabled ? 'Mute' : 'Unmute'}
        </button>
        <button className={camEnabled ? 'vc-btn' : 'vc-btn vc-btn-off'} onClick={toggleCam}>
          {camEnabled ? 'Camera off' : 'Camera on'}
        </button>
        {canShare && (
          <button
            className={localScreen ? 'vc-btn' : 'vc-btn vc-btn-off'}
            onClick={() => void toggleScreenShare()}
          >
            {localScreen ? 'Stop sharing' : 'Share screen'}
          </button>
        )}
        <button className="vc-btn vc-btn-danger" onClick={onLeave}>
          Leave
        </button>
      </div>
    </div>
  );
}

function WaitingRoom({
  status,
  error,
  notice,
}: {
  status: string;
  error: string | null;
  notice: string | null;
}) {
  const [copied, setCopied] = useState(false);
  const link = window.location.href;

  if (error) {
    return (
      <div className="vc-placeholder">
        <p className="vc-error">{error}</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="vc-placeholder">
        <p className="vc-error">Couldn't establish a direct connection.</p>
        <p className="vc-muted">
          One of the two networks is blocking peer-to-peer. That case needs a TURN relay.
        </p>
      </div>
    );
  }

  if (status === 'waiting') {
    return (
      <div className="vc-placeholder">
        <p>Waiting for the other person…</p>
        <p className="vc-muted">Send them this link:</p>
        <button
          className="vc-btn vc-link-copy"
          onClick={() => {
            void navigator.clipboard.writeText(link).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            });
          }}
        >
          {copied ? 'Copied' : link}
        </button>
      </div>
    );
  }

  return (
    <div className="vc-placeholder">
      <p>Connecting…</p>
      {notice && <p className="vc-muted">{notice}</p>}
    </div>
  );
}
