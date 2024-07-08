const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
    uid: {
        type: String,
        ref: 'User',
        required: true
      },
    DOB: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Non_binary", "Prefer not to say"], required: true },
    location: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String }
    },
    marital: { type: String, enum: [
        "Single (never married)", 
        "Married, or In a domestic partnership", 
        "Widowed", 
        "Divorced", 
        "Separated", 
        "Prefer not to say"
    ], required: true },
    birth_control: { type: String, enum: ["Yes", "No", "Prefer not to say"], required: true },
    regularity: { type: String, enum: ["Yes", "No", "Not sure"], required: true },
    last_period_date: { type: Date, required: true },
    cycle_length_avg_est: { type: Number, required: true },
    period_length_avg_est: { type: Number, required: true },
    menstrual_pain: { type: String, enum: [
        "No pain",
        "Mild pain (manageable without medication)",
        "Moderate pain (requires over-the-counter pain medication)",
        "Severe pain (requires prescription pain medication)", 
        "Very severe pain (disrupts daily activities)"
    ], required: true },
    
    height: {
        height_num: {
            type: Number
        },
        height_unit: {
            type: String,
            enum: ["feet", "cm"]
        }
    },
    weight: {
        weight_num: {
            type: Number
        },
        weight_unit: {
            type: String,
            enum: ["lb", "kg"]
        }
    },
}, {
    timestamps: true
});

const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema);

module.exports = PersonalInfo;
