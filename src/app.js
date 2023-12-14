import express, { json } from 'express';

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

app.use(helmet());

app.use(json());

app.use(morgan('dev'));

app.post('/login', (req, res, next) => {
  res.json({ token: '123456' });
});

export default app;
