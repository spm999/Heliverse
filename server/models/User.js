const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
    default: () => Math.floor(1000 + Math.random() * 9000), // generate a random 4-digit number
    required: true,
  },
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  avatar: String,
  domain: String,
  available: Boolean,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
