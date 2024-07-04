const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  uid: {
    type: String,
    ref: 'User',
    required: true
  },
  age: { type: Number },
  gender: { type: String },
  location: { type: String },
  phone: { type: String },
  lastMenstrualPeriod: { type: Date },
  averageCycleLength: { type: Number },
  cycleRegularity: { type: String },
  painfulDays: { type: [String] },
  height: { type: String },
  weight: { type: String },
  activityLevel: { type: String },
  healthConditions: { type: [String] },
  preferences: { type: [String] },
  notificationFrequency: { type: String },
  notificationSystem: { type: [String] }
}, {
  timestamps: true
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
