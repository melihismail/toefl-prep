/** Not available everywhere — notably absent on iOS Safari. */
export function screenShareSupported(): boolean {
  return typeof navigator.mediaDevices?.getDisplayMedia === 'function';
}

/**
 * Screen capture is deliberately separate from the camera: its own stream on
 * its own media lines, so sharing doesn't cost the other person your face, and
 * its audio doesn't have to displace the microphone.
 *
 * The picker itself belongs to the browser — entire screen, window, or tab.
 * Whether audio comes with it is the browser's call, not ours: a tab yields
 * that tab's audio, an entire screen yields system audio on Windows but not
 * macOS, and a window yields none anywhere. Firefox and Safari yield none at
 * all. So audio is requested and simply may not arrive.
 */
export async function captureScreen(): Promise<MediaStream> {
  return navigator.mediaDevices.getDisplayMedia({
    video: { frameRate: { ideal: 15, max: 30 } },
    // Left unprocessed: the browser's voice-oriented DSP would wreck music and
    // video, and this track never carries a person speaking into a mic.
    audio: {
      echoCancellation: false,
      noiseSuppression: false,
      autoGainControl: false,
    },
    // Chrome-only hint that puts "share system audio" in the picker; ignored
    // elsewhere, hence the cast.
    systemAudio: 'include',
  } as DisplayMediaStreamOptions);
}

/**
 * Owns the local capture. Everything downstream reads tracks from
 * `outputAudioTrack` / `outputVideoTrack` rather than from the raw
 * getUserMedia stream — today those are the same object, but that indirection
 * is where a noise-suppression worklet would slot in later.
 */
export class MediaController {
  private stream: MediaStream | null = null;

  async start(): Promise<MediaStream> {
    if (this.stream) return this.stream;

    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        // The browser's built-in DSP. Turn these off if you add your own
        // denoiser later, or the two fight.
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: 'user',
      },
    });

    return this.stream;
  }

  get localStream() {
    return this.stream;
  }

  /** The audio that actually goes to the peer. Identity pipeline for now. */
  get outputAudioTrack(): MediaStreamTrack | null {
    return this.stream?.getAudioTracks()[0] ?? null;
  }

  get outputVideoTrack(): MediaStreamTrack | null {
    return this.stream?.getVideoTracks()[0] ?? null;
  }

  stop() {
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
  }
}
