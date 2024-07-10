// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  authProvider: {
    type: String,
    required: true,
  },
  surveyCompleted:{
    type: Boolean,
    default: false,
  },
  notificationFrequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    default: 'daily'
  },
});

module.exports = mongoose.model('User', UserSchema);
