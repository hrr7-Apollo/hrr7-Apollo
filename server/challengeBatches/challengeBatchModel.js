var mongoose = require('mongoose');

var ChallengeBatchSchema = new mongoose.Schema({
  id: {
    type: Number
  },

  batch: {
    type: Array
  }
});

module.exports = mongoose.model('challengeBatches', ChallengeBatchSchema);