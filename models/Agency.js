const mongoose = require('mongoose');

const AgencySchema = new mongoose.Schema({
  agencyName: {
    type: String,
    required: true
  }
});

module.exports = Agency = mongoose.model('agency', AgencySchema);
