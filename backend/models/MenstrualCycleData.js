const mongoose = require('mongoose');

const menstrualCycleDataSchema = new mongoose.Schema({
    uid: {
        type: String,
        ref: 'User',
        required: true
      },
    health_issue: [{ type: String, enum: ["None", "Asthma", "Diabetes", "Hypertension", "Heart Disease", "Arthritis", "Depression", "Anxiety", "Chronic Pain", "Allergies", "Other"] }],
    period_symptoms: [{ type: String, enum: ["None", "Cramps", "Bloating", "Headaches", "Back Pain", "Fatigue", "Mood Swings", "Irritability", "Breast Tenderness", "Nausea", "Other"] }],
    know_discharge: { type: String, enum: ["Yes", "No"] },
    describe_discharge: { type: String, enum: ["Clear and Watery", "Clear and Stretchy", "White and Creamy", "Yellow or greenish", "Gray or off-white", "Brown or reddish"] },
    cycle_impact: [{ type: String, enum: ["Sleep", "Skin", "Energy", "Diet", "Mental health", "Others", "No"] }],
    explore_sexlife: [{ type: String, enum: ["Understand Sex Drive", "Pleasure Exploration", "Body Confidence", "Partner Communication", "Turn-Ons Discovery", "No Sex Currently", "Other"] }],
    lmp_date: { type: Date },
    ave_cycle_length: { type: Number },
    cycle_regularity: { type: String, enum: ["Yes", "No"] },
    ovulation_dates: { type: Date },
    record_date: { type: Date, required: true },
    bleeding: { type: String, enum: ["Yes", "No"] },
    on_period: { type: String, enum: ["Yes", "No"], required: true },
    which_day_of_period: { type: Number, required: true },
    temperature: { type: Number },
    temp_unit: { type: String, enum: ["Fahrenheit", "Celsius"] },
    peak_day: { type: String, enum: ["Yes", "No"] },
    color: { type: String, enum: ["Dry or very little", "Sticky or tacky", "Creamy or lotion-like", "Egg white-like", "Watery", "Thick or clumpy", "Blood-tinged", "Other"] },
    flow: { type: String, enum: ["Very light", "Light", "Moderate", "Heavy", "Very heavy", "Variable"] },
    period_length: { type: Number },
    menstrual_pain: { type: String, enum: ["No pain", "Mild pain", "Moderate pain", "Severe pain", "Very severe pain"] },
    menstural_physical_symptoms: [{ type: String, enum: ["Head", "Headache", "Nephritis", "Insomnia", "Flank Pain", "Diarrhea", "Period Pain", "Whole Body", "Constipation", "Muscle Ache", "Fever", "Edema", "Abnormal Leucorrhea", "Get Cold", "Skin", "Dry Skin", "Acne", "Oily Skin"] }],
    birth_control: { type: String, enum: ["Implant", "Birth Control Ring", "Emergency Contraception", "Hormonal IUD", "Non-Hormonal IUD", "Birth Control Shot", "Birth Control Pills", "Patch", "Condoms"] },
}, {
    timestamps: true
});

const MenstrualCycleData = mongoose.model('MenstrualCycleData', menstrualCycleDataSchema);

module.exports = MenstrualCycleData;
