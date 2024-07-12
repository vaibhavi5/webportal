// Import the express library to create a router
const express = require('express');

// Import the controller functions for handling dashboard-related routes
const { 
  getCheckin,
  setNotificationFrequency,
  getNotificationFrequency,
  calculateCheckinCounts,
  getQuestions,
  checkinResponse
} = require('../controller/dashboardController');

// Import the authentication middleware to protect routes
const authMiddleware = require('../middleware/authMiddleware');

// Create a new router instance
const router = express.Router();

// Define a GET route for retrieving dashboard check-ins, protected by authentication middleware
router.get('/checkins', authMiddleware, getCheckin);

// Define a POST route for setting notification frequency, protected by authentication middleware
router.post('/setNotificationFrequency', authMiddleware, setNotificationFrequency);

// Define a GET route for retrieving notification frequency, protected by authentication middleware
router.get('/notificationFrequency', authMiddleware, getNotificationFrequency);

// Define a GET route for questions, protected by authentication middleware
router.get('/question', authMiddleware, getQuestions);

// Define a GET route for questions, protected by authentication middleware
router.post('/checkinResponse', authMiddleware, checkinResponse);
// Export the router to be used in other parts of the application
module.exports = router;
