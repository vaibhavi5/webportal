const mongoose = require('mongoose');

const accountInfoSchema = new mongoose.Schema({
    uid: {
        type: String,
        ref: 'User',
        required: true
      },
    app_purpose: { type: String, enum: ["Yes", "No"], required: true },
    why_tracking: { type: String, enum: ["Period Track", "Cycle & Symptom Monitoring", "Sex Life Improvement", "Pregnancy Chances", "Mood & Behavior Tracking", "Other"], required: true },
    wearable_device: { type: String, enum: ["Yes", "No"], required: true },
    phone_num: { type: String },
    notification_type: { type: String, enum: ["SMS", "Email", "App Notification", "No notification"], required: true },
    notification_period: { type: String, enum: ["Weekly", "Daily", "Monthly"] },
}, {
    timestamps: true
});

const AccountInfo = mongoose.model('AccountInfo', accountInfoSchema);

module.exports = AccountInfo;
