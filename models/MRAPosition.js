const mongoose = require('mongoose');

const MRAPositionSchema = new mongoose.Schema({
  positionName: {
    type: String,
    required: true
  }
});

module.exports = MRAPosition = mongoose.model('mraPosition', MRAPositionSchema);
