const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'branch'
  },
  agencyName: {
    type: String,
    required: true
  },
  branchName: {
    type: String,
    required: true
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

module.exports = Contact = mongoose.model('contact', ContactSchema);
