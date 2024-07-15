const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  uid: {
    type: String,
    ref: 'User',
    required: true
  },
  daily_mood: [{ type: String}],
  mood_intensity: { type: Number, min: 1, max: 10, required: true },
  mood_notes: { type: String },
  any_symptom: [{ type: String}],
  energized_level: { type: Number, min: 1, max: 5 },
  quick_to_anger: { type: Number, min: 1, max: 5 },
  creative_level: { type: Number, min: 1, max: 5 },
  physically_fatigued_level: { type: Number, min: 1, max: 5 },
  mentally_fatigued_level: { type: Number, min: 1, max: 5 },
  comfortable_level: { type: Number, min: 1, max: 5 },
  confident_level: { type: Number, min: 1, max: 5 },
  feel_like_doing: [{ type: String }],
  stressed_level: { type: Number, min: 1, max: 5 },
  emotionally_or_logically: { type: Number, min: 1, max: 5 },
  mood_change_level: { type: Number, min: 1, max: 5 },
  feel_like_working: [{ type: String }],
  ability_to_concentrate_at_work: { type: Number, min: 1, max: 5 },
  challenging_complete_tasks: [{ type: String  }],
  do_what_type_work: [{ type: String }],    
  easy_to_complete_todo: { type: Number, min: 1, max: 5 },
  physical_activity_level: { type: Number, min: 1, max: 5 },
  exercise_type: [{ type: String }],
  by_yourself_or_with_others: [{ type: String }],
  needed_support_type: [{ type: String}],
  prefer_commu_type: [{ type: String }],
  social_satidfied_level: { type: Number, min: 1, max: 5 },
  engage_social_activities: [{ type: String}],
  type_of_engage_social_activities: [{ type: String }],
  feel_supported_level: { type: Number, min: 1, max: 5 },
  like_socializing_level: { type: Number, min: 1, max: 5 },
  recordDate: { type: String },
  checkinCompleted: { type: Boolean }
}, {
  timestamps: true
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;
