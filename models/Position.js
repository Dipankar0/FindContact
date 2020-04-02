const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'agency'
  },
  positionName: {
    type: String,
    required: true
  },
  contact: {
    type: String
  }
});

module.exports = Position = mongoose.model('position', PositionSchema);
