import { convertAudioBufferToPCM, audioBufferToPCM } from './audio-to-pcm.js';
import decode from 'audio-decode';
import { WebSocket } from 'ws';
import fs from 'fs';
import log from 'log-to-file';

export const connectToKuboAPI = (serverWs) => {
  const mp3FilePath = 'audi.mp3';
  const wsURL = process.env.WS_URL;
  const jwtToken = process.env.JWT_TOKEN;

  const ws = new WebSocket(wsURL, {
    headers: {
      'x-api-token': jwtToken,
    },
  });

  const onConnection = async () => {
    console.log('Connected to KUBO Websocket server');

    const mp3Data = fs.readFileSync(mp3FilePath);

    // Decode the MP3 data
    let audioBufferTE = await decode(mp3Data);

    log(Buffer.from(mp3Data).toString('base64'));

    // console.log('Audio decoded:', audioBuffer);

    const pcmDataTE = audioBufferToPCM(audioBufferTE);

    // Send PCM data to WebSocket server
    ws.send(pcmDataTE, { binary: true });
  };

  const onMessage = (data) => {
    // Handle received data here
    console.log(
      'Received data from KUBO Websocket server:',
      JSON.stringify(data)
    );

    const encodedBase64 = Buffer.from(data).toString('base64');
    const decodedBase64 = new Buffer.from(data, 'base64');
    console.log('Received data from KUBO Websocket server:', encodedBase64);
    console.log('Received data from KUBO Websocket server:', decodedBase64);

    // You can perform additional processing or actions based on the received data

    serverWs.send(encodedBase64);
  };

  ws.on('open', onConnection);

  ws.on('message', onMessage);

  ws.on('close', () => {
    console.log('KUBO WebSocket connection closed');
  });
  ws.on('error', (error) => {
    console.error('KUBO WebSocket error:', error.message);
  });
};
