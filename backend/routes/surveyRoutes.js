//backend/routes/surveyRoutes.js
const express = require('express');
const { submitSurvey, getSurvey } = require('../controller/surveyController');
const authMiddleware = require('../middleware/authMiddleware');
const checkSurveyCompletion = require('../middleware/checkSurveyCompletion');

const router = express.Router();

router.post('/submit', authMiddleware, submitSurvey);
router.get('/', authMiddleware,checkSurveyCompletion, getSurvey);

module.exports = router;
