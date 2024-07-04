const Dashboard = require('../models/Dashboard');
const User = require('../models/User');
const sendNotification = require('../utils/sendNotification');
const moment = require('moment');

// Function to submit dashboard check-in data
const submitDashboard = async (req, res) => {
  const {
    recordDate, bleeding, OnPeriod, temperature, checkinCompleted
  } = req.body;
  const uid = req.user.uid;

  try {
    // Check if a check-in already exists for the given date
    const existingRecord = await Dashboard.findOne({ uid, recordDate });
    if (existingRecord) {
      return res.status(400).json({ message: 'Check-in for this date already exists' });
    }

    // Create a new dashboard record
    const dashboard = new Dashboard({
      uid,
      recordDate,
      bleeding,
      OnPeriod,
      temperature,
      checkinCompleted: true
    });

    // Save the record to the database
    await dashboard.save();
    res.status(201).json({ message: 'Check-in submitted successfully' });
  } catch (error) {
    console.error('Error submitting check-in:', error);
    res.status(500).json({ message: 'Check-in error' });
  }
};

// Function to get all dashboard check-in records for a user
const getDashboard = async (req, res) => {
  const uid = req.user.uid;

  try {
    // Fetch all check-in records for the user
    const records = await Dashboard.find({ uid });
    const checkins = records.map(record => record.recordDate);
    res.json({ checkins });
  } catch (error) {
    console.error('Error fetching check-ins:', error);
    res.status(500).json({ message: 'Check-in error' });
  }
};

// Helper function to calculate check-in counts
const calculateCheckinCounts = async (uid) => {
  const now = moment().startOf('day'); // Ensure we are comparing date without time part
  const oneWeekAgo = now.clone().subtract(7, 'days');
  const oneMonthAgo = now.clone().subtract(1, 'month');

  try {
    // Convert recordDate from string to Date for comparison
    const records = await Dashboard.find({ uid, checkinCompleted: true });

    const weeklyCheckins = records.filter(record => {
      const recordDate = moment(record.recordDate, 'YYYY-MM-DD');
      return recordDate.isBetween(oneWeekAgo, now, null, '[]');
    }).length;

    const monthlyCheckins = records.filter(record => {
      const recordDate = moment(record.recordDate, 'YYYY-MM-DD');
      return recordDate.isBetween(oneMonthAgo, now, null, '[]');
    }).length;

    console.log('Calculated Weekly Check-ins:', weeklyCheckins);
    console.log('Calculated Monthly Check-ins:', monthlyCheckins);

    return { weeklyCheckins, monthlyCheckins };
  } catch (error) {
    console.error('Error calculating check-in counts:', error);
    throw error;
  }
};


// Function to set notification frequency for a user
const setNotificationFrequency = async (req, res) => {
  const { frequency } = req.body;
  const uid = req.user.uid;

  try {
    // Update the user's notification frequency
    const user = await User.findOneAndUpdate({ uid }, { notificationFrequency: frequency }, { new: true });

    // Calculate actual check-in counts
    const { weeklyCheckins, monthlyCheckins } = await calculateCheckinCounts(uid);

    // Log the values to check them
    console.log('Weekly Check-ins in setNotificationFrequency:', weeklyCheckins);
    console.log('Monthly Check-ins in setNotificationFrequency:', monthlyCheckins);

    sendNotification(user, frequency, { weeklyCheckins, monthlyCheckins }, 'frequencySet');
    res.status(200).json({ message: 'Notification frequency set successfully' });
  } catch (error) {
    console.error('Error setting notification frequency:', error);
    res.status(500).json({ message: 'Setting notification frequency error' });
  }
};


// Function to get the notification frequency of a user
const getNotificationFrequency = async (req, res) => {
  const uid = req.user.uid;

  try {
    // Fetch the user's notification frequency
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ frequency: user.notificationFrequency });
  } catch (error) {
    console.error('Error fetching notification frequency:', error);
    res.status(500).json({ message: 'Fetching notification frequency error' });
  }
};

module.exports = {
  submitDashboard,
  getDashboard,
  setNotificationFrequency,
  getNotificationFrequency,
  calculateCheckinCounts
};
