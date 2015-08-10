var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
  initials: {
    type: String
  },
  highscore: {
    type: Number
  },
  date: {
    type: Date
  }
});

module.exports = mongoose.model('games', gameSchema);