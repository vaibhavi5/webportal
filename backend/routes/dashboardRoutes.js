// Import the express library to create a router
const express = require('express');

// Import the controller functions for handling dashboard-related routes
const { 
  submitDashboard, 
  getDashboard, 
  setNotificationFrequency, 
  getNotificationFrequency 
} = require('../controller/dashboardController');

// Import the authentication middleware to protect routes
const authMiddleware = require('../middleware/authMiddleware');

// Create a new router instance
const router = express.Router();

// Define a POST route for submitting dashboard data, protected by authentication middleware
router.post('/submit', authMiddleware, submitDashboard);

// Define a GET route for retrieving dashboard check-ins, protected by authentication middleware
router.get('/checkins', authMiddleware, getDashboard);

// Define a POST route for setting notification frequency, protected by authentication middleware
router.post('/setNotificationFrequency', authMiddleware, setNotificationFrequency);

// Define a GET route for retrieving notification frequency, protected by authentication middleware
router.get('/notificationFrequency', authMiddleware, getNotificationFrequency);

// Export the router to be used in other parts of the application
module.exports = router;
