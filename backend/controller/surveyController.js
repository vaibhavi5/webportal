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
    const survey = new Survey({
      uid,  // 使用字符串形式的 uid
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

    await survey.save();

    // 根据 uid 查找用户
    const user = await User.findOne({ uid });
    if (user) {
      user.surveyCompleted = true;
      await user.save();
    }

    res.status(201).json({ message: 'Survey submitted successfully' });
  } catch (error) {
    console.error('Error submitting survey:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getSurvey = async (req, res) => {
  const uid = req.user.uid;

  try {
    const survey = await Survey.findOne({ uid });
    if (survey) {
      res.json(survey);
    } else {
      res.status(404).json({ message: 'Survey not found' });
    }
  } catch (error) {
    console.error('Error fetching survey:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  submitSurvey,
  getSurvey
};
