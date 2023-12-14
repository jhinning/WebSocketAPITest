//index.js

import app from './src/app.js';
import wsServer from './src/app-ws.js';

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`App Express is running!`);
});

wsServer(server);
