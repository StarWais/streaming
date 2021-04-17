import Server from 'node-media-server';
import config from './configs/mediaServer.js';
import fs from 'fs';
import genThumbnail from 'simple-thumbnail';
import serverData from './utils/server.js';
import Chat from './models/chat.js';

const mediaServer = new Server(config);

mediaServer.on('prePublish', async (id, StreamPath, args) => {
  const pathParts = StreamPath.split('/');
  const userKey = pathParts[pathParts.length - 1];
  await genThumbnail(
    `${serverData}${StreamPath}.flv`,
    `./thumbnails/${userKey}.png`,
    '300x200'
  );
  const result = await Chat.findOne({ chatId: userKey });
  if (result) {
    await Chat.findOneAndDelete({ chatId: userKey });
  }
  const newChatInstance = new Chat({
    chatId: userKey,
  });
  await newChatInstance.save();
});

mediaServer.on('donePublish', async (id, StreamPath, args) => {
  const pathParts = StreamPath.split('/');
  const userKey = pathParts[pathParts.length - 1];
  if (fs.existsSync(`./thumbnails/${userKey}.png`)) {
    fs.unlinkSync(`./thumbnails/${userKey}.png`);
  }
  const result = await Chat.findOne({ chatId: userKey });
  if (result) {
    await Chat.findOneAndDelete({ chatId: userKey });
  }
});

export default mediaServer;
