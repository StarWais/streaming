import fs from 'fs';
import axios from 'axios';
import server from '../utils/server.js';

export const getStreamViewers = (req, result) => {
  axios.get(`${server}/api/streams`).then((res) => {
    if (JSON.stringify(res.data) === '{}') {
      return result.status(400).json({ error: 'No streams availiable' });
    }
    const data = Object.values(res.data['live'][req.query.id].subscribers);
    if (data) {
      if (data.length > 0) {
        return result.status(200).json({
          count: data.length,
        });
      } else {
        return result.status(200).json({
          count: 0,
        });
      }
    }
  });
};
export const getStreamsInfo = async (request, result) => {
  const streams = [];
  const getStreams = (data) => {
    data.forEach((stream) => {
      const thumbnailPath = `./thumbnails/${stream?.publisher?.stream}.png`;

      if (fs.existsSync(thumbnailPath)) {
        streams.push({
          id: stream?.publisher?.stream,
          created: stream?.publisher?.connectCreated,
          thumbnail: fs.readFileSync(thumbnailPath, { encoding: 'base64' }),
        });
      } else {
        streams.push({
          id: stream?.publisher?.stream,
          created: stream?.publisher?.connectCreated,
          thumbnail: 'empty',
        });
      }
    });
    return streams;
  };
  axios.get(`${server}/api/streams`).then((res) => {
    if (JSON.stringify(res.data) === '{}') {
      return result.status(400).json({ error: 'No streams availiable' });
    }
    const data = Object.values(res.data['live']);
    if (data.length > 0) {
      return result.status(200).json({
        count: data.length,
        streams: getStreams(data),
      });
    }
  });
};
