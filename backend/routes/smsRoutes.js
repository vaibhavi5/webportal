// Import the express library to create a router
const express = require('express');

// Create a new router instance
const router = express.Router();

// Import the authentication middleware to protect routes
const authMiddleware = require('../middleware/authMiddleware');

// Import the sendSMS function from the SMS controller
const { sendSMS } = require('../controller/smsController');

// Define a POST route for sending SMS messages, protected by authentication middleware
router.post('/send-sms', authMiddleware, sendSMS);

// Export the router to be used in other parts of the application
module.exports = router;