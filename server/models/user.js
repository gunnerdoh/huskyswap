const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  name: String,
  profilePicture: String,
});

module.exports = mongoose.model('User', UserSchema);
