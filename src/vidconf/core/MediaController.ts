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
