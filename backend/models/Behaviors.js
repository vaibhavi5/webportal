const mongoose = require('mongoose');

const behaviorsSchema = new mongoose.Schema({
    uid: {
        type: String,
        ref: 'User',
        required: true
      },
    communication_willingness: { type: String, enum: ["Very Unwilling", "Unwilling", "Neutral", "Willing", "Very Willing"], required: true },
    social_frequency: { type: String, enum: ["Never", "Rarely", "A few times a year", "Once a month", "A few times a month", "Once a week", "Several times a week", "Daily"], required: true },
    social_quality: { type: String, enum: ["Very Poor", "Poor", "Average", "Good", "Excellent"], required: true },
    selfcare_activities: [{ type: String, enum: ["Exercise", "Meditation", "Reading", "Listening to music", "Hobbies", "Spending time with friends and family", "Watching movies or TV shows", "Cooking or baking", "Journaling or writing", "Taking baths", "Practicing gratitude", "Outdoor activities", "Others"], required: true }],
    exercise_freq: { type: String, enum: ["Daily", "Several times a week", "Once a week", "A few times a month", "Once a month", "Rarely", "Never"], required: true },
    exercise_intensity: { type: String, enum: ["Light", "Moderate", "Vigorous", "Mixed", "None"], required: true },
    dietary_habits: { type: String, enum: ["Omnivorous", "Vegetarian", "Vegan", "Pescatarian", "Flexitarian", "Paleo", "Keto", "Low-Carb", "Mediterranean", "Gluten-Free", "Dairy-Free", "Intermittent Fasting", "Other"], required: true },
    productivity: { type: String, enum: ["Very Low Productivity", "Low Productivity", "Moderate Productivity", "High Productivity", "Very High Productivity"], required: true },
    preferred_tasks_types: { type: String, enum: ["Very Creative", "Somewhat Creative", "Balanced", "Somewhat Analytical", "Very Analytical"], required: true },
    support_needed: [{ type: String, enum: ["Emotional support", "Practical support", "Financial support", "Advice and guidance", "Social support", "Medical support", "Encouragement and motivation", "Other"], required: true }],
    coitus: { type: String, enum: ["Daily", "Several times a week", "Once a week", "A few times a month", "Once a month", "A few times a year", "Rarely", "Never", "Prefer not to say"], required: true },
    sleep_pattern: { type: String, enum: ["I consistently get enough sleep", "I get enough sleep most nights", "My sleep is irregular", "I have difficulty falling or staying asleep", "I rarely get enough sleep", "Insomnia", "Sleep Apnea", "Restless Legs Syndrome", "Others"], required: true },
}, {
    timestamps: true
});

const Behaviors = mongoose.model('Behaviors', behaviorsSchema);

module.exports = Behaviors;
