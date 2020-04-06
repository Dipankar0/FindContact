const mongoose = require('mongoose');

const MRAContactSchema = new mongoose.Schema({
  positionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mraPosition'
  },
  positionName: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
});

module.exports = MRAContact = mongoose.model('mraContact', MRAContactSchema);
