import { WebSocketServer } from 'ws';
import { connectToKuboAPI } from './kubo-api-client.js';

const onError = (ws, err) => {
  console.error(`onError: ${err.message}`);
};

const onMessage = (ws, data) => {
  console.log(`onMessage: ${data}`);

  connectToKuboAPI(ws);
};

const onConnection = (ws, req) => {
  ws.on('message', (data) => onMessage(ws, data));
  ws.on('error', (error) => onError(ws, error));

  console.log(`onConnection`);
};

const wsServer = (server) => {
  const wss = new WebSocketServer({
    server,
  });

  wss.on('connection', onConnection);

  console.log(`App Web Socket Server is running!`);

  return wss;
};

export default wsServer;
