const mongoose = require('mongoose');

const PeriodPhaseSchema = new mongoose.Schema({
  uid: {
    type: String,
    ref: 'User',
    required: true
  },
  lastPeriod:{ type: String },
  phaseDate: { type: String },
  phase: { type: String }
}, {
  timestamps: true
});

const PeriodPhase = mongoose.model('PeriodPhase', PeriodPhaseSchema);

module.exports = PeriodPhase;
