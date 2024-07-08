const mongoose = require('mongoose');

const menstrualCycleDataSchema = new mongoose.Schema({
    uid: {
        type: String,
        ref: 'User',
        required: true
      },
    health_issue: [{ type: String, enum: [
        "None", 
        "Asthma", 
        "Diabetes", 
        "Hypertension (High Blood Pressure)", 
        "Heart Disease", 
        "Arthritis", 
        "Depression", 
        "Anxiety", 
        "Chronic Pain", 
        "Allergies", 
        "Gastrointestinal Disorders (e.g., IBS, Crohn's Disease)", 
        "Migraine or Chronic Headaches", 
        "Sleep Disorders (e.g., Insomnia, Sleep Apnea)", 
        "Autoimmune Diseases (e.g., Lupus, Rheumatoid Arthritis)", 
        "Respiratory Conditions (e.g., COPD, Emphysema)", 
        "Cancer", 
        "Neurological Disorders (e.g., Epilepsy, Multiple Sclerosis)", 
        "Skin Conditions (e.g., Eczema, Psoriasis)", 
        "Other (please specify)"
    ] }],
    period_symptoms: [{ type: String, enum: [
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
    know_discharge: { type: String, enum: ["Yes", "No"] },
    describe_discharge: { type: String, enum: [
        "Clear and Watery, a normal phase in the menstrual cycle",
        "Clear and Stretchy, a normal phase in the menstrual cycle. This Indicates ovulation",
        "White and Creamy Discharge. Mild or no odor. Normal discharge before or after a menstrual period",
        "Yellow or greenish, often thick or clumpy. Corresponding Symptoms: Foul odor, itching, or irritation. Need attention",
        "Gray or off-white discharge.Fishy odor, especially after intercourse. Need attention",
        "Brown or reddish discharge, can be light or heavy. Spotting or light bleeding outside of a regular period. Need attention"
    ] },
    cycle_impact: [{ type: String, enum: ["Sleep", "Skin", "Energy or activity level", "Diet", "Mental health", "Others", "No"] }],
    explore_sexlife: [{ type: String, enum: [
        "Understand Sex Drive", 
        "Pleasure Exploration", 
        "Body Confidence", 
        "Partner Communication", 
        "Turn-Ons Discovery", 
        "No Sex Currently", 
        "Other"
    ] }],
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
    color: { type: String, enum: [
        "Dry or very little discharge", 
        "Sticky or tacky discharge", 
        "Creamy or lotion-like discharge", 
        "Egg white-like (clear and stretchy) discharge", 
        "Watery discharge", 
        "Thick or clumpy discharge", 
        "Blood-tinged discharge (spotting)", 
        "Other (please specify)"] },
    flow: { type: String, enum: [
        "Very light (spotting)", 
        "Light", 
        "Moderate", 
        "Heavy", 
        "Very heavy (flooding or large clots)", 
        "Variable (changes from cycle to cycle)"
    ] },
    period_length: { type: Number },
    menstrual_pain: { type: String, enum: [
        "No pain", 
        "Mild pain (manageable without medication)", 
        "Moderate pain (requires over-the-counter pain medication)", 
        "Severe pain (requires prescription pain medication)", 
        "Very severe pain (disrupts daily activities)"
    ] },
    menstural_physical_symptoms: [{ type: String, enum: [
        "Head", 
        "Headache", 
        "Nephritis", 
        "Insomnia", 
        "Flank Pain", 
        "Diarrhea", 
        "Period Pain", 
        "Whole Body", 
        "Constipation", 
        "Muscle Ache", 
        "Fever", 
        "Edema", 
        "Abnormal Leucorrhea", 
        "Get Cold", 
        "Skin", 
        "Dry Skin", 
        "Acne", 
        "Oily Skin"
    ] }],
    birth_control: { type: String, enum: [
        "Implant", 
        "Birth Control Ring", 
        "Emergency Contraception (Plan B, Ella)", 
        "Hormonal IUD", 
        "Non-Hormonal IUD", 
        "Birth Control Shot", 
        "Birth Control Pills", 
        "Patch", 
        "Condoms"
    ] },
}, {
    timestamps: true
});

const MenstrualCycleData = mongoose.model('MenstrualCycleData', menstrualCycleDataSchema);

module.exports = MenstrualCycleData;
