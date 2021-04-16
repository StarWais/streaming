import Server from 'node-media-server';
import config from './configs/mediaServer.js';
import fs from 'fs';
import genThumbnail from 'simple-thumbnail';
import serverData from './utils/server.js';

const mediaServer = new Server(config);

mediaServer.on('prePublish', async (id, StreamPath, args) => {
  const pathParts = StreamPath.split('/');
  const userKey = pathParts[pathParts.length - 1];
  await genThumbnail(
    `${serverData}${StreamPath}.flv`,
    `./thumbnails/${userKey}.png`,
    '300x200'
  );
});

mediaServer.on('donePublish', async (id, StreamPath, args) => {
  const pathParts = StreamPath.split('/');
  const userKey = pathParts[pathParts.length - 1];
  if (fs.existsSync(`./thumbnails/${userKey}.png`)) {
    fs.unlinkSync(`./thumbnails/${userKey}.png`);
  }
});

export default mediaServer;
