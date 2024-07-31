const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  messages: Number,
  isActive: Boolean,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
