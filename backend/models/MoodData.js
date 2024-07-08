const mongoose = require('mongoose');

const moodDataSchema = new mongoose.Schema({
    uid: {
        type: String,
        ref: 'User',
        required: true
      },
    daily_mood: [{ type: String, enum: [
        "Happy", 
        "Excited", 
        "Content", 
        "Motivated", 
        "Energetic", 
        "Neutral", 
        "Irritable", 
        "Anxious", 
        "Stressed", 
        "Bored", 
        "Lonely", 
        "Frustrated"
    ] }],
    mood_intensity: { type: Number, min: 1, max: 10, required: true },
    mood_notes: { type: String },
    any_symptom: [{ type: String, enum: [
        "None", 
        "Cramps", 
        "Bloating", 
        "Headaches or Migraines", 
        "Back Pain", 
        "Fatigue", 
        "Mood Swings", 
        "Irritability", 
        "Breast Tenderness", 
        "Nausea", 
        "Diarrhea or Constipation", 
        "Acne", 
        "Heavy Bleeding", 
        "Light Bleeding", 
        "Dizziness", 
        "Sleep Disturbances", 
        "Food Cravings", 
        "Joint or Muscle Pain", 
        "Anxiety or Depression", 
        "Other (please specify)"
    ] }],
    energized_level: { type: Number, min: 1, max: 5 },
    quick_to_anger: { type: Number, min: 1, max: 5 },
    creative_level: { type: Number, min: 1, max: 5 },
    physically_fatigued_level: { type: Number, min: 1, max: 5 },
    mentally_fatigued_level: { type: Number, min: 1, max: 5 },
    comfortable_level: { type: Number, min: 1, max: 5 },
    confident_level: { type: Number, min: 1, max: 5 },
    feel_like_doing: { type: String, enum: [
        "Exercise", 
        "Work/Study", 
        "Relax/Rest", 
        "Socialize", 
        "Tackle to-do list"
    ] },
    stressed_level: { type: Number, min: 1, max: 5 },
    emotionally_or_logically: { type: Number, min: 1, max: 5 },
    mood_change_level: { type: Number, min: 1, max: 5 },
    feel_like_working: { type: String, enum: [
        "Alone", 
        "With others"
    ] },
    ability_to_concentrate_at_work: { type: Number, min: 1, max: 5 },
    challenging_complete_tasks: { type: String, enum: [
        "Yes", 
        "No"
    ] },
    do_what_type_work: [{ type: String, enum: [
        "Errands/tasks/obligations", 
        "Work at computer/desk", 
        "Active/physical work"
    ] }],    
    easy_to_complete_todo: { type: Number, min: 1, max: 5 },
    physical_activity_level: { type: Number, min: 1, max: 5 },
    exercise_type: [{ type: String, enum: [
        "Yoga", 
        "Running", 
        "Walking", 
        "Strength Training", 
        "Cycling", 
        "Swimming", 
        "Pilates", 
        "Dancing", 
        "Hiking", 
        "Aerobics", 
        "HIIT (High-Intensity Interval Training)", 
        "Team Sports (e.g., soccer, basketball)", 
        "Martial Arts", 
        "Climbing", 
        "Tennis", 
        "Golf", 
        "Rowing", 
        "Boxing", 
        "None"] }],
    by_yourself_or_with_others: { type: String, enum: [
        "Myself", 
        "With others"] },
    needed_support_type: { type: String, enum: [
        "Emotional support", 
        "Physical comfort", 
        "Logical advice"] },
    prefer_commu_type: { type: String, enum: [
        "In-person", 
        "Email", 
        "Text/IM", 
        "Call/FaceTime"] },
    social_satidfied_level: { type: Number, min: 1, max: 5 },
    engage_social_activities: { type: String, enum: ["Yes", "No"] },
    type_of_engage_social_activities: [{ type: String, enum: [
        "Casual meetup", 
        "Formal event", 
        "Family time", 
        "Online socializing"
    ] }],
    feel_supported_level: { type: Number, min: 1, max: 5 },
    like_socializing_level: { type: Number, min: 1, max: 5 }
}, {
    timestamps: true
});

const MoodData = mongoose.model('MoodData', moodDataSchema);

module.exports = MoodData;
