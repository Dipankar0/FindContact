const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'agency'
  },
  name: {
    type: String,
    required: true
  },
  positionName: {
    type: String,
    required: true
  },
  phone: {
    type: String
  }
});

module.exports = Contact = mongoose.model('contact', ContactSchema);
