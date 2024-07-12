const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  uid: {
    type: String,
    ref: 'User',
    required: true
  },
  questionKey: {type: String},
  question: {type: String},
  response: {type: String},
  recordDate: { type: String },
  checkinCompleted: { type: Boolean }
}, {
  timestamps: true
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;
