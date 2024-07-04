// backend/middleware/checkSurveyCompletion.js

const User = require('../models/User');

const checkSurveyCompletion = async (req, res, next) => {
  const uid = req.user.uid;

  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.surveyCompleted) {
      return res.status(403).json({ message: 'Survey already completed' });
    }
    next();
  } catch (error) {
    console.error('Error checking survey completion:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = checkSurveyCompletion;
