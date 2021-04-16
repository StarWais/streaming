import Server from 'node-media-server';
import config from './configs/mediaServer.js';
import dotenv from 'dotenv';
dotenv.config();

const mediaServer = new Server(config);

mediaServer.on('prePublish', async (id, StreamPath, args) => {
  const pathParts = StreamPath.split('/');
  const userKey = pathParts[pathParts.length - 1];
  console.log(
    `StreamId=${id} Path=${StreamPath} Args=${JSON.stringify(
      args
    )} UserKey=${userKey}`
  );
});

mediaServer.run();

export default mediaServer;
