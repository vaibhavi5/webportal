import React from 'react';

const AccountInfo = ({ data, handleChange }) => {
    const appPurposeOptions = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" }
    ];

    const whyTrackingOptions = [
        { value: "Period Track", label: "Period Track" },
        { value: "Cycle & Symptom Monitoring", label: "Cycle & Symptom Monitoring" },
        { value: "Sex Life Improvement", label: "Sex Life Improvement" },
        { value: "Pregnancy Chances", label: "Pregnancy Chances" },
        { value: "Mood & Behavior Tracking", label: "Mood & Behavior Tracking" },
        { value: "Other", label: "Other" }
    ];

    const wearableDeviceOptions = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" }
    ];

    const notificationTypeOptions = [
        { value: "SMS", label: "SMS" },
        { value: "Email", label: "Email" },
        { value: "App Notification", label: "App Notification" },
        { value: "No notification", label: "No notification" }
    ];

    const notificationPeriodOptions = [
        { value: "Weekly", label: "Weekly" },
        { value: "Daily", label: "Daily" },
        { value: "Monthly", label: "Monthly" }
    ];

    return (
        <div>
            <div className="input-box">
                <label>
                    App Purpose:
                    <select name="app_purpose" value={data.app_purpose || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {appPurposeOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <p>Specify if you use the app for tracking purposes (Yes/No).</p>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Why Tracking:
                    <select name="why_tracking" value={data.why_tracking || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {whyTrackingOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <p>Specify the main reason for tracking (e.g., Period Track, Cycle & Symptom Monitoring, etc.).</p>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Wearable Device:
                    <select name="wearable_device" value={data.wearable_device || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {wearableDeviceOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <p>Specify if you use a wearable device (Yes/No).</p>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Phone Number:
                    <input type="tel" name="phone_num" value={data.phone_num || ''} onChange={handleChange} />
                    <p>Enter your phone number (optional).</p>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Notification Type:
                    <select name="notification_type" value={data.notification_type || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {notificationTypeOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <p>Select the type of notifications you prefer (SMS, Email, App Notification, No notification).</p>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Notification Period:
                    <select name="notification_period" value={data.notification_period || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {notificationPeriodOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <p>Select the notification frequency (Weekly, Daily, Monthly).</p>
                </label>
            </div>
        </div>
    );
};

export default AccountInfo;
