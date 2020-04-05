const mongoose = require('mongoose');

const MRAContactSchema = new mongoose.Schema({
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
