const Survey = require('../models/Survey');
const User = require('../models/User');

const submitSurvey = async (req, res) => {
  const {
    age, gender, location, phone, lastMenstrualPeriod, averageCycleLength,
    cycleRegularity, painfulDays, height, weight, activityLevel, healthConditions,
    preferences, notificationFrequency, notificationSystem
  } = req.body;
  const uid = req.user.uid;

  try {
    // Create a new Survey document using the provided data
    const survey = new Survey({
      uid,  // Using the string form of uid
      age,
      gender,
      location,
      phone,
      lastMenstrualPeriod,
      averageCycleLength,
      cycleRegularity,
      painfulDays,
      height,
      weight,
      activityLevel,
      healthConditions,
      preferences,
      notificationFrequency,
      notificationSystem
    });

    // Save the new Survey document to the database
    await survey.save();

    // Find the User document based on the uid
    const user = await User.findOne({ uid });
    if (user) {
      // Mark the survey as completed for the user
      user.surveyCompleted = true;
      // Save the updated User document to the database
      await user.save();
    }

    // Send a success response indicating the survey was submitted successfully
    res.status(201).json({ message: 'Survey submitted successfully' });
  } catch (error) {
    // Log any errors that occur during the survey submission process
    console.error('Error submitting survey:', error);
    // Send an error response indicating a server error
    res.status(500).json({ message: 'Server error' });
  }
};

const getSurvey = async (req, res) => {
  const uid = req.user.uid;

  try {
    // Find the Survey document based on the uid
    const survey = await Survey.findOne({ uid });
    if (survey) {
      // Send the found survey data in the response
      res.json(survey);
    } else {
      // Send a 404 response if the survey was not found
      res.status(404).json({ message: 'Survey not found' });
    }
  } catch (error) {
    // Log any errors that occur during the survey fetching process
    console.error('Error fetching survey:', error);
    // Send an error response indicating a server error
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  submitSurvey,
  getSurvey
};
