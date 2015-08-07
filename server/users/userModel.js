var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  highscore: {
    type: Number
  },
  initials: {
    type: String
  }
});

module.exports = mongoose.model('users', UserSchema);