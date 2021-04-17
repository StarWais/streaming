import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  chatId: {
    type: String,
    isRequired: true,
  },
  users: {
    type: Array,
    default: [],
  },
  messages: {
    type: Array,
    default: [],
  },
});

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
