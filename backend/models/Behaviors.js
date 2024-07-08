const mongoose = require('mongoose');

const behaviorsSchema = new mongoose.Schema({
    uid: {
        type: String,
        ref: 'User',
        required: true
      },
    communication_willingness: { type: String, enum: [
        "Very Unwilling", 
        "Unwilling", 
        "Neutral", 
        "Willing", 
        "Very Willing"
    ], required: true },
    social_frequency: { type: String, enum: [
        "Never", 
        "Rarely", 
        "A few times a year", 
        "Once a month", 
        "A few times a month", 
        "Once a week", 
        "Several times a week", "Daily" 
    ], required: true },
    social_quality: { type: String, enum: [
        "Very Poor",
         "Poor", 
         "Average", 
         "Good",
          "Excellent"
        ], required: true },
    selfcare_activities: [{ type: String, enum: [
        "Exercise (e.g., walking, running, yoga)", 
        "Meditation or mindfulness practices", 
        "Reading", 
        "Listening to music", 
        "Hobbies (e.g., crafting, gardening, painting)", 
        "Spending time with friends and family", 
        "Watching movies or TV shows", 
        "Cooking or baking",
        "Journaling or writing",
        "Taking baths or other personal grooming activities", 
        "Practicing gratitude or positive affirmations", 
        "Outdoor activities (e.g., hiking, camping)", "Others"
    ], required: true }],
    exercise_freq: { type: String, enum: [
        "Daily",
        "Several times a week", 
        "Once a week", 
        "A few times a month", 
        "Once a month", 
        "Rarely", 
        "Never"
    ], required: true },
    exercise_intensity: { type: String, enum: [
        "Light (e.g., walking, stretching)", 
        "Moderate (e.g., brisk walking, dancing)", 
        "Vigorous (e.g., running, high-intensity interval training)", 
        "Mixed (a combination of light, moderate, and vigorous activities)", 
        "None"], required: true },
    dietary_habits: { type: String, enum: [
        "Omnivorous (eats both plant and animal products)", 
        "Vegetarian (avoids meat, may consume dairy and/or eggs)",
        "Vegan (avoids all animal products)", 
        "Pescatarian (eats fish and seafood, avoids other meats)", 
        "Flexitarian (primarily vegetarian but occasionally eats meat)", 
        "Paleo (focuses on whole foods, avoids processed foods, grains, and dairy)",
        "Keto (high fat, low carbohydrate diet)", "Low-Carb (restricts carbohydrate intake)", 
        "Mediterranean (emphasizes fruits, vegetables, whole grains, and healthy fats)", 
        "Gluten-Free (avoids gluten-containing foods)", "Dairy-Free (avoids dairy products)", 
        "Intermittent Fasting (cycles between periods of eating and fasting)", "Other (please specify)"
    ], required: true },
    productivity: { type: String, enum: [
        "Very Low Productivity", 
        "Low Productivity", 
        "Moderate Productivity", 
        "High Productivity", 
        "Very High Productivity"
    ], required: true },
    preferred_tasks_types: { type: String, enum: [
        "Very Creative", 
        "Somewhat Creative", 
        "Balanced", 
        "Somewhat Analytical", 
        "Very Analytical"
    ], required: true },
    support_needed: [{ type: String, enum: [
        "Emotional support (e.g., listening, empathy)", 
        "Practical support (e.g., help with chores, childcare)", 
        "Financial support (e.g., monetary assistance, loans)", 
        "Advice and guidance (e.g., career, personal decisions)", 
        "Social support (e.g., spending time together, companionship)", 
        "Medical support (e.g., accompanying to doctor’s appointments, health care decisions)", 
        "Encouragement and motivation (e.g., for personal goals, hobbies)", "Other (please specify)"
    ], required: true }],
    coitus: { type: String, enum: [
        "Daily", 
        "Several times a week", 
        "Once a week", 
        "A few times a month", 
        "Once a month", 
        "A few times a year",
        "Rarely", 
        "Never", 
        "Prefer not to say"
    ], required: true },
    sleep_pattern: { type: String, enum: [
        "I consistently get enough sleep and feel well-rested.", 
        "I get enough sleep most nights but sometimes feel tired.", 
        "My sleep is irregular, and I often feel tired.", 
        "I have difficulty falling or staying asleep most nights.", 
        "I rarely get enough sleep and often feel exhausted.", 
        "Insomnia (Difficulty Falling Asleep, Difficulty Staying Asleep, Early Morning Awakening, Non-Restorative Sleep)", 
        "Sleep Apnea (Loud Snoring, Morning Headaches)", 
        "Restless Legs Syndrome (RLS) (Uncomfortable Sensations in the Legs, Urge to Move Legs)", 
        "Others (Night Sweats, Bruxism, Dreamy)"
    ], required: true },
}, {
    timestamps: true
});

const Behaviors = mongoose.model('Behaviors', behaviorsSchema);

module.exports = Behaviors;
