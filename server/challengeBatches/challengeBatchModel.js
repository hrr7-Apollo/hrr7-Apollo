var mongoose = require('mongoose');

var challengeBatchSchema = new mongoose.Schema({
  id: {
    type: Number
  },

  batch: {
    type: Array
  }
});

module.exports = mongoose.model('batch', challengeBatchSchema);