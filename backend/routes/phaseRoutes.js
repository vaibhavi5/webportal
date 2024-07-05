// Import the express library to create a router
const express = require('express');

// Import the controller functions for handling period phase-related routes
const { 
  setLastPeriod, 
  getPeriodPhases, 
  redirect, 
  getAuthUrl, 
  getCalendar, 
  addEvent 
} = require('../controller/PeriodPhaseController');

// Import the authentication middleware to protect routes
const authMiddleware = require('../middleware/authMiddleware');

// Create a new router instance
const router = express.Router();

// Define a POST route for submitting the last period data, protected by authentication middleware
router.post('/submitLastperiod', authMiddleware, setLastPeriod);

// Define a GET route for retrieving period phases, protected by authentication middleware
router.get('/getperiodPhases', authMiddleware, getPeriodPhases);

// Define a GET route for initiating the OAuth process by getting the authentication URL
router.get('/auth', getAuthUrl);

// Define a GET route for handling the OAuth redirect
router.get('/redirect', redirect);

// Define a GET route for retrieving the user's calendar
router.get('/getCalendar', getCalendar);

// Define a GET route for adding an event to the calendar
router.get('/addPhasesEvent', addEvent);

// Add a simple test route to check if the router is working
router.get('/test', (req, res) => {
    res.send('Test route works');
});

// Export the router to be used in other parts of the application
module.exports = router;