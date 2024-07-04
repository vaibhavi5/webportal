const nodemailer = require('nodemailer');
require('dotenv').config();

const sendNotification = (user, frequency, checkinsCounts, messageType) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  let subject = 'Check-in Reminder';
  let text = 'This is a reminder to complete your check-in.';

  let weeklyCheckins = checkinsCounts.weeklyCheckins || 0;
  let monthlyCheckins = checkinsCounts.monthlyCheckins || 0;

  // Log the values to check them
  console.log('Weekly Check-ins:', weeklyCheckins);
  console.log('Monthly Check-ins:', monthlyCheckins);

  if (messageType === 'frequencySet') {
    subject = 'Reminder Frequency Set Successfully';
    text = `Your reminder frequency has been set to ${frequency}. You will receive reminders at 9:00 AM ${frequency}.\n\n`;

    if (frequency === 'daily') {
      text += 'Example of the notification you will receive:\nThis is your daily reminder to complete your check-in.';
    } else if (frequency === 'weekly') {
      text += `Example of the notification you will receive:\nYou have completed ${weeklyCheckins} check-ins this week. Please make sure to complete your daily check-ins.`;
    } else if (frequency === 'monthly') {
      text += `Example of the notification you will receive:\nYou have completed ${monthlyCheckins} check-ins this month. Please make sure to complete your daily check-ins.`;
    }
  } else if (frequency === 'weekly') {
    text = `You have completed ${weeklyCheckins} check-ins this week. Please make sure to complete your daily check-ins.`;
  } else if (frequency === 'monthly') {
    text = `You have completed ${monthlyCheckins} check-ins this month. Please make sure to complete your daily check-ins.`;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendNotification;
