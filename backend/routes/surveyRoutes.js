// //backend/routes/surveyRoutes.js
// // Import the express library to create a router
// const express = require('express');

// // Import the survey controller functions for handling survey-related routes
// const { submitSurvey, getSurvey } = require('../controller/surveyController');

// // Import the authentication middleware to protect routes
// const authMiddleware = require('../middleware/authMiddleware');

// // Import the middleware to check if the survey is completed
// const checkSurveyCompletion = require('../middleware/checkSurveyCompletion');

// // Create a new router instance
// const router = express.Router();

// // Define a POST route for submitting a survey, protected by authentication middleware
// router.post('/submit', authMiddleware, submitSurvey);

// // Define a GET route for retrieving a survey, protected by authentication middleware
// // and a middleware to check if the survey is completed
// router.get('/', authMiddleware, checkSurveyCompletion, getSurvey);

// // Export the router to be used in other parts of the application
// module.exports = router;


const express = require('express');
const {
    submitAccountInfo,
    submitPersonalInfo,
    submitMenstrualCycleData,
    submitMoodData,
    submitBehaviors,
    getAccountInfo,
    getPersonalInfo,
    getMenstrualCycleData,
    getMoodData,
    getBehaviors
} = require('../controller/surveyController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Account Info Routes
router.post('/account-info', authMiddleware, submitAccountInfo);
router.get('/account-info', authMiddleware, getAccountInfo);

// Personal Info Routes
router.post('/personal-info', authMiddleware, submitPersonalInfo);
router.get('/personal-info', authMiddleware, getPersonalInfo);

// Menstrual Cycle Data Routes
router.post('/menstrual-cycle-data', authMiddleware, submitMenstrualCycleData);
router.get('/menstrual-cycle-data', authMiddleware, getMenstrualCycleData);

// Mood Data Routes
router.post('/mood-data', authMiddleware, submitMoodData);
router.get('/mood-data', authMiddleware, getMoodData);

// Behaviors Routes
router.post('/behaviors', authMiddleware, submitBehaviors);
router.get('/behaviors', authMiddleware, getBehaviors);

module.exports = router;
