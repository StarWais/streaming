import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import dotenv from 'dotenv';
import mediaServer from './mediaServer.js';
import streamroutes from './routes/streams.js';

dotenv.config();

const app = express();
app.use(cors());
app.use('/streams', streamroutes);
app.use(
  express.json({
    extended: true,
    limit: '30mb',
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: '30mb',
  })
);
const httpServer = createServer(app);
const PORT = process.env.SERVER_PORT || 5000;

httpServer.listen(PORT, () => {
  console.log('Server started on port', PORT);
});

mediaServer.run();
