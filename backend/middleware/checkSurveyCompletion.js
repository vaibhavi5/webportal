// Import the User model from the models directory
const User = require('../models/User');

// Middleware function to check if the user has completed the survey
const checkSurveyCompletion = async (req, res, next) => {
  // Extract the UID from the request object, assuming it's set by a previous middleware
  const uid = req.user.uid;

  try {
    // Find a user document that matches the UID
    const user = await User.findOne({ uid });
    
    // If no user is found, send a 404 response with a "User not found" message
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If the user has already completed the survey, send a 403 response with a "Survey already completed" message
    if (user.surveyCompleted) {
      return res.status(403).json({ message: 'Survey already completed' });
    }

    // If the user exists and has not completed the survey, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Log any errors that occur during the process
    console.error('Error checking survey completion:', error);

    // Send a 500 response with a "Server error" message in case of any exceptions
    res.status(500).json({ message: 'Server error' });
  }
};

// Export the checkSurveyCompletion function for use in other parts of the application
module.exports = checkSurveyCompletion;
