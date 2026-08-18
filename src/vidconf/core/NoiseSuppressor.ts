import { loadRnnoise, RnnoiseWorkletNode } from '@sapphi-red/web-noise-suppressor';
import rnnoiseWorkletUrl from '@sapphi-red/web-noise-suppressor/rnnoiseWorklet.js?url';
import rnnoiseWasmUrl from '@sapphi-red/web-noise-suppressor/rnnoise.wasm?url';
import rnnoiseSimdWasmUrl from '@sapphi-red/web-noise-suppressor/rnnoise_simd.wasm?url';

/** RNNoise is trained at 48kHz and assumes it. */
const SAMPLE_RATE = 48000;

/**
 * The pipeline that sits between the microphone and what actually goes to the
 * peer: mic track -> source -> RNNoise worklet -> destination -> output track.
 *
 * RNNoise is a small recurrent net, so it removes steady background noise —
 * fans, hum, traffic, keyboards — rather than just gating on level the way the
 * browser's own suppression largely does.
 *
 * The wasm is fetched only when someone turns this on, so the page costs
 * nothing to load for people who never do.
 */
export class NoiseSuppressor {
  private static wasm: Promise<ArrayBuffer> | null = null;

  private ctx: AudioContext | null = null;
  private node: RnnoiseWorkletNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private destination: MediaStreamAudioDestinationNode | null = null;

  /** Returns the processed track to send in place of the raw microphone. */
  async start(input: MediaStreamTrack): Promise<MediaStreamTrack> {
    NoiseSuppressor.wasm ??= loadRnnoise({
      url: rnnoiseWasmUrl,
      simdUrl: rnnoiseSimdWasmUrl,
    });
    const wasmBinary = await NoiseSuppressor.wasm;

    const ctx = new AudioContext({ sampleRate: SAMPLE_RATE });
    await ctx.audioWorklet.addModule(rnnoiseWorkletUrl);

    // Created after the module is registered, and after a user gesture, so the
    // context is not born suspended.
    if (ctx.state === 'suspended') await ctx.resume();

    const source = ctx.createMediaStreamSource(new MediaStream([input]));
    const node = new RnnoiseWorkletNode(ctx, { wasmBinary, maxChannels: 1 });
    const destination = ctx.createMediaStreamDestination();

    source.connect(node);
    node.connect(destination);

    this.ctx = ctx;
    this.node = node;
    this.source = source;
    this.destination = destination;

    const output = destination.stream.getAudioTracks()[0];
    if (!output) {
      this.stop();
      throw new Error('Noise suppression produced no audio track.');
    }
    return output;
  }

  stop() {
    this.source?.disconnect();
    this.node?.disconnect();
    this.node?.destroy();
    this.destination?.stream.getTracks().forEach((t) => t.stop());
    void this.ctx?.close();
    this.ctx = null;
    this.node = null;
    this.source = null;
    this.destination = null;
  }
}

/**
 * The browser's own suppression and gain control have to come off while RNNoise
 * is running, or the two fight — the browser gates first and the net is left
 * denoising something already chewed up. Echo cancellation stays on either way;
 * nothing here replaces it.
 */
export async function setBrowserAudioProcessing(track: MediaStreamTrack, on: boolean) {
  try {
    await track.applyConstraints({ noiseSuppression: on, autoGainControl: on });
  } catch {
    // Not every device honours these; the pipeline still works without it.
  }
}
