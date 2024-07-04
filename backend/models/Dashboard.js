const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  uid: {
    type: String,
    ref: 'User',
    required: true
  },
  recordDate: { type: String },
  bleeding: { type: Boolean },
  OnPeriod: { type: Boolean },
  temperature: { type: Number },
  checkinCompleted: { type: Boolean }
}, {
  timestamps: true
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;
