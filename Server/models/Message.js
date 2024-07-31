const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  text: String,
  createdAt: Date,
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
