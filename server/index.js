import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import dotenv from 'dotenv';
import mediaServer from './mediaServer.js';
import streamroutes from './routes/streams.js';
import mongoose from 'mongoose';
import Chat from './models/chat.js';
import Message from './models/message.js';
import { Server as SocketIO } from 'socket.io';

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
export const io = new SocketIO(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

io.on('connection', (socket) => {
  const cid = socket.handshake.query.id;
  console.log('user connected');
  socket.join(cid);
  socket.on('enterChat', (data) => {
    const { username } = data;
    console.log(`User ${username} entered stream's ${cid} chat`);
    Chat.findOne({ chatId: cid }, (err, chat) => {
      if (!chat.users.find((user) => user === username)) {
        chat.users.push(username);
        chat.save();
        io.in(cid).emit('updateUsers', chat.users);
        io.in(cid).emit('userEnteredChat', username);
      }
    });
  });
  socket.on('getMessagesAndUsers', (data) => {
    Chat.findOne({ chatId: cid }, (err, chat) => {
      io.in(cid).emit('getMessages', chat.messages);
      io.in(cid).emit('updateUsers', chat.users);
    });
  });
  socket.on('leaveChat', (data) => {
    const { username } = data;
    console.log(`User ${username} left stream's ${cid} chat`);
    Chat.findOne({ chatId: cid }, (err, chat) => {
      chat.users = chat.users.filter((user) => user !== username);
      chat.save();
      io.in(cid).emit('updateUsers', chat.users);
      io.in(cid).emit('userLeftChat', username);
    });
  });
  socket.on('sendMessage', (data) => {
    const { username, message } = data;
    Chat.findOne({ chatId: cid }, (err, chat) => {
      const newMessage = new Message({
        message,
        username,
        createdAt: Date.now(),
      });
      chat.messages.push(newMessage);
      chat.save();
      io.in(cid).emit('update', newMessage);
    });
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.SERVER_PORT || 5000;
const DBCONNECT = process.env.DATABASE_URL;
mongoose
  .connect(DBCONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log('Server started on port', PORT);
    });

    mediaServer.run();
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.connection.on('error', (err) => {
  console.log(`DB connection error: ${err.message}`);
});

mongoose.set('useFindAndModify', false);
