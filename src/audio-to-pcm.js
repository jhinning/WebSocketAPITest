import log from 'log-to-file';

// Function to convert AudioBuffer to PCM data
export const convertAudioBufferToPCM = (audioBuffer) => {
  const { numberOfChannels } = audioBuffer;

  const { sampleRate } = audioBuffer;

  const buffer = new Float32Array(audioBuffer.getChannelData(0));
  const pcmData = new Int16Array(buffer.length);

  for (let i = 0; i < buffer.length; i++) {
    pcmData[i] = buffer[i] * 32767; // Convert to 16-bit PCM
  }

  return {
    pcmData: pcmData,
    numberOfChannels,
    sampleRate,
  };
};

export function audioBufferToPCM(audioBuffer) {
  const audioSamples = audioBuffer.getChannelData(0);

  const PCM16iSamples = [];
  for (let i = 0; i < audioSamples.length; i++) {
    let val = Math.floor(32767 * audioSamples[i]);
    val = Math.min(32767, val);
    val = Math.max(-32768, val);
    // log(val);
    PCM16iSamples.push(val);
  }

  return PCM16iSamples;
}
