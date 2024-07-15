const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const admin = require('./firebase');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const Question = require('./models/Question'); // Adjust the path if necessary
// Connect to MongoDB

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

connectDB();

const questions = [
  { type: "S", key: "mood_describe", question: "How would you describe your mood today?", required: true, enumValues: ["Happy", "Excited", "Content", "Motivated", "Energetic", "Neutral", "Irritable", "Anxious", "Stressed", "Bored", "Lonely", "Frustrated"] },
  { type: "S", key: "mood_intensity", question: "Mood intensity", required: true, intRange: [1, 10] },
  { type: "S", key: "mood_notes", question: "Notes on mood (optional text input)", required: false },
  { type: "S", key: "any_symptom", question: "Do you have any symptom?", required: false, enumValues: ["None", "Cramps", "Bloating", "Headaches or Migraines", "Back Pain", "Fatigue", "Mood Swings", "Irritability", "Breast Tenderness", "Nausea", "Diarrhea or Constipation", "Acne", "Heavy Bleeding", "Light Bleeding", "Dizziness", "Sleep Disturbances", "Food Cravings", "Joint or Muscle Pain", "Anxiety or Depression", "Other (please specify)"] },
  { type: "S", key: "energized_level", question: "How energized do you feel?", required: false, intRange: [1, 5] },
  { type: "S", key: "quick_to_anger", question: "How quick to anger have you been today?", required: false, intRange: [1, 5] },
  { type: "S", key: "creative_level", question: "How creative do you feel today?", required: false, intRange: [1, 5] },
  { type: "S", key: "physically_fatigued_level", question: "How physically fatigued have you felt today?", required: false, intRange: [1, 5] },
  { type: "S", key: "mentally_fatigued_level", question: "How mentally fatigued have you felt today?", required: false, intRange: [1, 5] },
  { type: "S", key: "comfortable_level", question: "How comfortable in your own body do you feel today?", required: false, intRange: [1, 5] },
  { type: "S", key: "confident_level", question: "How confident do you feel today?", required: false, intRange: [1, 5] },
  { type: "S", key: "feel_like_doing", question: "What do you feel like doing today?", required: false, enumValues: ["Exercise", "work/study", "relax/rest", "socialize", "tackle to-do list"] },
  { type: "S", key: "stressed_level", question: "How stressed did you feel today?", required: false, intRange: [1, 5] },
  { type: "S", key: "emotionally_or_logically", question: "Have you felt more emotionally or logically driven today?", required: false, intRange: [1, 5] },
  { type: "S", key: "mood_change_level", question: "How quickly did your mood change today?", required: false, intRange: [1, 5] },
  { type: "W", key: "feel_like_working", question: "How do you feel like working today?", required: false, enumValues: ["Task-oriented", "Big picture", "Administrative"] },
  { type: "W", key: "how_productive", question: "How productive do/did you feel today?", required: false, intRange: [1, 5] },
  { type: "W", key: "how_be_most_productive", question: "How would you be most productive at work today?", required: false, enumValues: ["Alone", "with others"] },
  { type: "W", key: "ability_to_concentrate_at_work", question: "How would you rate your ability to concentrate at work today?", required: false, intRange: [1, 5] },
  { type: "W", key: "challenging_complete_tasks", question: "Did you find it challenging to complete your work tasks today? (Yes/No)", required: false, enumValues: ["yes", "no"] },
  { type: "W", key: "do_what_type_work", question: "What type of work did you do today?", required: false, enumValues: ["errands/tasks/obligations", "work at computer/desk", "active/physical work"] },
  { type: "W", key: "easy_to_complete_todo", question: "How easy was it to complete your to-do list?", required: false, intRange: [1, 5] },
  { type: "W", key: "physical_activity_level", question: "How would you rate your physical activity level today?", required: false, intRange: [1, 5] },
  { type: "W", key: "exercise_type", question: "What type of exercise did you do today?", required: false, enumValues: ["yoga", "running", "walking", "strength training", "none"] },
  { type: "O", key: "by_yourself_or_with_others", question: "Do you feel like spending time by yourself or with others today?", required: false, enumValues: ["Myself", "with others"] },
  { type: "O", key: "needed_support_type", question: "What type of support do you need from loved ones today?", required: false, enumValues: ["Emotional support", "physical comfort", "logical advice"] },
  { type: "O", key: "prefer_commu_type", question: "How did you prefer to communicate with others?", required: false, enumValues: ["In-person", "email", "text/IM", "call/FaceTime"] },
  { type: "O", key: "social_satidfied_level", question: "How satisfied were you with your social interactions today?", required: false, intRange: [1, 5] },
  { type: "O", key: "engage_social_activities", question: "Did you engage in any social activities today? (Yes/No)", required: false, enumValues: ["yes", "no"] },
  { type: "O", key: "type_of_engage_social_activities", question: "If yes, what type of social activities did you engage in?", required: false, enumValues: ["casual meetup", "formal event", "family time", "online socializing"] },
  { type: "O", key: "feel_supported_level", question: "How supported did you feel by your loved ones today?", required: false, intRange: [1, 5] },
  { type: "O", key: "like_socializing_level", question: "How much did you feel like socializing today?", required: false, intRange: [1, 5] }
];

const insertQuestions = async () => {
  try {
    await Question.insertMany(questions);
    console.log('Questions inserted successfully!');
  } catch (err) {
    console.error('Error inserting questions:', err);
  } finally {
    mongoose.connection.close();
  }
};

insertQuestions();
