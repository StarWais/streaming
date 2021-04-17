import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    isRequired: true,
  },
  username: {
    type: String,
    isRequired: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
