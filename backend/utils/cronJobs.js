const cron = require('node-cron');
const User = require('../models/User');
const { calculateCheckinCounts } = require('../controller/dashboardController');
const sendNotification = require('./sendNotification');
const moment = require('moment');

const startCronJobs = () => {
  // daily reminder
  cron.schedule('0 9 * * *', async () => {
    const users = await User.find({ notificationFrequency: 'daily' });
    const today = moment().format('YYYY-MM-DD');

    for (const user of users) {
      const checkin = await Dashboard.findOne({ uid: user.uid, recordDate: today, checkinCompleted: true });
      if (!checkin) {
        sendNotification(user, 'daily', { weeklyCheckins: 0, monthlyCheckins: 0 });  // Daily reminders do not need check-in counts
        console.log(`Daily reminder sent to ${user.email} at ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
      }
    }
  });

  // weekly reminder
  cron.schedule('0 9 * * MON', async () => {
  // cron.schedule('* * * * *', async () => {
    const users = await User.find({ notificationFrequency: 'weekly' });

    for (const user of users) {
      const { weeklyCheckins } = await calculateCheckinCounts(user.uid);
      sendNotification(user, 'weekly', { weeklyCheckins, monthlyCheckins: 0 });
      console.log(`Weekly reminder sent to ${user.email} at ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
    }
  });

  // monthly reminder
  cron.schedule('0 9 1 * *', async () => {
  // cron.schedule('* * * * *', async () => {
    const users = await User.find({ notificationFrequency: 'monthly' });

    for (const user of users) {
      const { monthlyCheckins } = await calculateCheckinCounts(user.uid);
      sendNotification(user, 'monthly', { weeklyCheckins: 0, monthlyCheckins });
      console.log(`Monthly reminder sent to ${user.email} at ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
    }
  });
};

module.exports = { startCronJobs };
