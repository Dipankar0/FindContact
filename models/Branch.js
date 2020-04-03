const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'agency'
  },
  agencyName: {
    type: String,
    required: true
  },
  branchName: {
    type: String,
    required: true
  }
});

module.exports = Branch = mongoose.model('branch', BranchSchema);
