// const Survey = require('../models/Survey');
// const User = require('../models/User');

// const submitSurvey = async (req, res) => {
//   const {
//     age, gender, location, phone, lastMenstrualPeriod, averageCycleLength,
//     cycleRegularity, painfulDays, height, weight, activityLevel, healthConditions,
//     preferences, notificationFrequency, notificationSystem
//   } = req.body;
//   const uid = req.user.uid;

//   try {
//     // Create a new Survey document using the provided data
//     const survey = new Survey({
//       uid,  // Using the string form of uid
//       age,
//       gender,
//       location,
//       phone,
//       lastMenstrualPeriod,
//       averageCycleLength,
//       cycleRegularity,
//       painfulDays,
//       height,
//       weight,
//       activityLevel,
//       healthConditions,
//       preferences,
//       notificationFrequency,
//       notificationSystem
//     });

//     // Save the new Survey document to the database
//     await survey.save();

//     // Find the User document based on the uid
//     const user = await User.findOne({ uid });
//     if (user) {
//       // Mark the survey as completed for the user
//       user.surveyCompleted = true;
//       // Save the updated User document to the database
//       await user.save();
//     }

//     // Send a success response indicating the survey was submitted successfully
//     res.status(201).json({ message: 'Survey submitted successfully' });
//   } catch (error) {
//     // Log any errors that occur during the survey submission process
//     console.error('Error submitting survey:', error);
//     // Send an error response indicating a server error
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const getSurvey = async (req, res) => {
//   const uid = req.user.uid;

//   try {
//     // Find the Survey document based on the uid
//     const survey = await Survey.findOne({ uid });
//     if (survey) {
//       // Send the found survey data in the response
//       res.json(survey);
//     } else {
//       // Send a 404 response if the survey was not found
//       res.status(404).json({ message: 'Survey not found' });
//     }
//   } catch (error) {
//     // Log any errors that occur during the survey fetching process
//     console.error('Error fetching survey:', error);
//     // Send an error response indicating a server error
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = {
//   submitSurvey,
//   getSurvey
// };
const AccountInfo = require('../models/AccountInfo');
const PersonalInfo = require('../models/PersonalInfo');
const MenstrualCycleData = require('../models/MenstrualCycleData');
const MoodData = require('../models/MoodData');
const Behaviors = require('../models/Behaviors');
const User = require('../models/User');

const submitAccountInfo = async (req, res) => {
  const uid = req.user.uid;

  try {
    const accountInfo = new AccountInfo({ ...req.body, uid });
    await accountInfo.save();
    checkSurveyCompletion(uid);
    res.status(201).json({ message: 'Account Info submitted successfully' });
  } catch (error) {
    console.error('Error submitting account info:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const submitPersonalInfo = async (req, res) => {
  const uid = req.user.uid;

  try {
    const personalInfo = new PersonalInfo({ ...req.body, uid });
    await personalInfo.save();
    checkSurveyCompletion(uid);
    res.status(201).json({ message: 'Personal Info submitted successfully' });
  } catch (error) {
    console.error('Error submitting personal info:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const submitMenstrualCycleData = async (req, res) => {
  const uid = req.user.uid;

  try {
    const menstrualCycleData = new MenstrualCycleData({ ...req.body, uid });
    await menstrualCycleData.save();
    checkSurveyCompletion(uid);
    res.status(201).json({ message: 'Menstrual Cycle Data submitted successfully' });
  } catch (error) {
    console.error('Error submitting menstrual cycle data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const submitMoodData = async (req, res) => {
  const uid = req.user.uid;

  try {
    const moodData = new MoodData({ ...req.body, uid });
    await moodData.save();
    checkSurveyCompletion(uid);
    res.status(201).json({ message: 'Mood Data submitted successfully' });
  } catch (error) {
    console.error('Error submitting mood data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const submitBehaviors = async (req, res) => {
  const uid = req.user.uid;

  try {
    const behaviors = new Behaviors({ ...req.body, uid });
    await behaviors.save();
    checkSurveyCompletion(uid);
    res.status(201).json({ message: 'Behaviors Data submitted successfully' });
  } catch (error) {
    console.error('Error submitting behaviors data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAccountInfo = async (req, res) => {
  const uid = req.user.uid;

  try {
    const accountInfo = await AccountInfo.find({ uid });
    if (accountInfo) {
      res.json(accountInfo);
    } else {
      res.status(404).json({ message: 'Account Info not found' });
    }
  } catch (error) {
    console.error('Error fetching account info:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPersonalInfo = async (req, res) => {
  const uid = req.user.uid;

  try {
    const personalInfo = await PersonalInfo.find({ uid });
    if (personalInfo) {
      res.json(personalInfo);
    } else {
      res.status(404).json({ message: 'Personal Info not found' });
    }
  } catch (error) {
    console.error('Error fetching personal info:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMenstrualCycleData = async (req, res) => {
  const uid = req.user.uid;

  try {
    const menstrualCycleData = await MenstrualCycleData.find({ uid });
    if (menstrualCycleData) {
      res.json(menstrualCycleData);
    } else {
      res.status(404).json({ message: 'Menstrual Cycle Data not found' });
    }
  } catch (error) {
    console.error('Error fetching menstrual cycle data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMoodData = async (req, res) => {
  const uid = req.user.uid;

  try {
    const moodData = await MoodData.find({ uid });
    if (moodData) {
      res.json(moodData);
    } else {
      res.status(404).json({ message: 'Mood Data not found' });
    }
  } catch (error) {
    console.error('Error fetching mood data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getBehaviors = async (req, res) => {
  const uid = req.user.uid;

  try {
    const behaviors = await Behaviors.find({ uid });
    if (behaviors) {
      res.json(behaviors);
    } else {
      res.status(404).json({ message: 'Behaviors Data not found' });
    }
  } catch (error) {
    console.error('Error fetching behaviors data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const checkSurveyCompletion = async (uid) => {
  try {
    const accountInfo = await AccountInfo.findOne({ uid });
    const personalInfo = await PersonalInfo.findOne({ uid });
    const menstrualCycleData = await MenstrualCycleData.findOne({ uid });
    const moodData = await MoodData.findOne({ uid });
    const behaviors = await Behaviors.findOne({ uid });

    if (accountInfo && personalInfo && menstrualCycleData && moodData && behaviors) {
      const user = await User.findOne({ uid });
      if (user) {
        user.surveyCompleted = true;
        await user.save();
      }
    }
  } catch (error) {
    console.error('Error checking survey completion:', error);
  }
};

module.exports = {
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
};
