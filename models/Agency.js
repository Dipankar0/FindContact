const mongoose = require('mongoose');

const AgencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = Agency = mongoose.model('agency', AgencySchema);
