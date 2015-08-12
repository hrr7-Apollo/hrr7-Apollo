var mongoose = require('mongoose');

var SessionSchema = new mongoose.Schema({
  date: {
    type: Date
  },
  currentScore: {
    type: Number
  },
  level: {
    type: Number
  }
});

module.exports = mongoose.model('sessions', SessionSchema);