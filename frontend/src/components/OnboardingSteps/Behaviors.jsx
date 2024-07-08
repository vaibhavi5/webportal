import React from 'react';
import Select from 'react-select';

const Behaviors = ({ data, handleChange, handleMultiSelectChange }) => {
    const optionsCommunicationWillingness = [
        { value: "Very Unwilling", label: "Very Unwilling" },
        { value: "Unwilling", label: "Unwilling" },
        { value: "Neutral", label: "Neutral" },
        { value: "Willing", label: "Willing" },
        { value: "Very Willing", label: "Very Willing" },
    ];

    const optionsSocialFrequency = [
        { value: "Never", label: "Never" },
        { value: "Rarely", label: "Rarely" },
        { value: "A few times a year", label: "A few times a year" },
        { value: "Once a month", label: "Once a month" },
        { value: "A few times a month", label: "A few times a month" },
        { value: "Once a week", label: "Once a week" },
        { value: "Several times a week", label: "Several times a week" },
        { value: "Daily", label: "Daily" },
    ];

    const optionsSocialQuality = [
        { value: "Very Poor", label: "Very Poor" },
        { value: "Poor", label: "Poor" },
        { value: "Average", label: "Average" },
        { value: "Good", label: "Good" },
        { value: "Excellent", label: "Excellent" },
    ];

    const optionsSelfcareActivities = [
        { value: "Exercise", label: "Exercise (e.g., walking, running, yoga)" },
        { value: "Meditation", label: "Meditation or mindfulness practices" },
        { value: "Reading", label: "Reading" },
        { value: "Listening to music", label: "Listening to music" },
        { value: "Hobbies", label: "Hobbies (e.g., crafting, gardening, painting)" },
        { value: "Spending time with friends and family", label: "Spending time with friends and family" },
        { value: "Watching movies or TV shows", label: "Watching movies or TV shows" },
        { value: "Cooking or baking", label: "Cooking or baking" },
        { value: "Journaling or writing", label: "Journaling or writing" },
        { value: "Taking baths", label: "Taking baths or other personal grooming activities" },
        { value: "Practicing gratitude", label: "Practicing gratitude or positive affirmations" },
        { value: "Outdoor activities", label: "Outdoor activities (e.g., hiking, camping)" },
        { value: "Others", label: "Others" },
    ];

    const optionsExerciseFreq = [
        { value: "Daily", label: "Daily" },
        { value: "Several times a week", label: "Several times a week" },
        { value: "Once a week", label: "Once a week" },
        { value: "A few times a month", label: "A few times a month" },
        { value: "Once a month", label: "Once a month" },
        { value: "Rarely", label: "Rarely" },
        { value: "Never", label: "Never" },
    ];

    const optionsExerciseIntensity = [
        { value: "Light", label: "Light (e.g., walking, stretching)" },
        { value: "Moderate", label: "Moderate (e.g., brisk walking, dancing)" },
        { value: "Vigorous", label: "Vigorous (e.g., running, high-intensity interval training)" },
        { value: "Mixed", label: "Mixed (a combination of light, moderate, and vigorous activities)" },
        { value: "None", label: "None" },
    ];

    const optionsDietaryHabits = [
        { value: "Omnivorous", label: "Omnivorous (eats both plant and animal products)" },
        { value: "Vegetarian", label: "Vegetarian (avoids meat, may consume dairy and/or eggs)" },
        { value: "Vegan", label: "Vegan (avoids all animal products)" },
        { value: "Pescatarian", label: "Pescatarian (eats fish and seafood, avoids other meats)" },
        { value: "Flexitarian", label: "Flexitarian (primarily vegetarian but occasionally eats meat)" },
        { value: "Paleo", label: "Paleo (focuses on whole foods, avoids processed foods, grains, and dairy)" },
        { value: "Keto", label: "Keto (high fat, low carbohydrate diet)" },
        { value: "Low-Carb", label: "Low-Carb (restricts carbohydrate intake)" },
        { value: "Mediterranean", label: "Mediterranean (emphasizes fruits, vegetables, whole grains, and healthy fats)" },
        { value: "Gluten-Free", label: "Gluten-Free (avoids gluten-containing foods)" },
        { value: "Dairy-Free", label: "Dairy-Free (avoids dairy products)" },
        { value: "Intermittent Fasting", label: "Intermittent Fasting (cycles between periods of eating and fasting)" },
        { value: "Other", label: "Other (please specify)" },
    ];

    const optionsProductivity = [
        { value: "Very Low Productivity", label: "Very Low Productivity" },
        { value: "Low Productivity", label: "Low Productivity" },
        { value: "Moderate Productivity", label: "Moderate Productivity" },
        { value: "High Productivity", label: "High Productivity" },
        { value: "Very High Productivity", label: "Very High Productivity" },
    ];

    const optionsPreferredTasksTypes = [
        { value: "Very Creative", label: "Very Creative" },
        { value: "Somewhat Creative", label: "Somewhat Creative" },
        { value: "Balanced", label: "Balanced" },
        { value: "Somewhat Analytical", label: "Somewhat Analytical" },
        { value: "Very Analytical", label: "Very Analytical" },
    ];

    const optionsSupportNeeded = [
        { value: "Emotional support", label: "Emotional support (e.g., listening, empathy)" },
        { value: "Practical support", label: "Practical support (e.g., help with chores, childcare)" },
        { value: "Financial support", label: "Financial support (e.g., monetary assistance, loans)" },
        { value: "Advice and guidance", label: "Advice and guidance (e.g., career, personal decisions)" },
        { value: "Social support", label: "Social support (e.g., spending time together, companionship)" },
        { value: "Medical support", label: "Medical support (e.g., accompanying to doctor's appointments, health care decisions)" },
        { value: "Encouragement and motivation", label: "Encouragement and motivation (e.g., for personal goals, hobbies)" },
        { value: "Other", label: "Other (please specify)" },
    ];

    const optionsCoitus = [
        { value: "Daily", label: "Daily" },
        { value: "Several times a week", label: "Several times a week" },
        { value: "Once a week", label: "Once a week" },
        { value: "A few times a month", label: "A few times a month" },
        { value: "Once a month", label: "Once a month" },
        { value: "A few times a year", label: "A few times a year" },
        { value: "Rarely", label: "Rarely" },
        { value: "Never", label: "Never" },
        { value: "Prefer not to say", label: "Prefer not to say" },
    ];

    const optionsSleepPattern = [
        { value: "I consistently get enough sleep", label: "I consistently get enough sleep and feel well-rested." },
        { value: "I get enough sleep most nights", label: "I get enough sleep most nights but sometimes feel tired." },
        { value: "My sleep is irregular", label: "My sleep is irregular, and I often feel tired." },
        { value: "I have difficulty falling or staying asleep", label: "I have difficulty falling or staying asleep most nights." },
        { value: "I rarely get enough sleep", label: "I rarely get enough sleep and often feel exhausted." },
        { value: "Insomnia", label: "Insomnia (Difficulty Falling Asleep, Difficulty Staying Asleep, Early Morning Awakening, Non-Restorative Sleep)" },
        { value: "Sleep Apnea", label: "Sleep Apnea (Loud Snoring, Morning Headaches)" },
        { value: "Restless Legs Syndrome", label: "Restless Legs Syndrome (RLS) (Uncomfortable Sensations in the Legs, Urge to Move Legs)" },
        { value: "Others", label: "Others (Night Sweats, Bruxism, Dreamy)" },
    ];

    return (
        <>
            <div className="input-box">
                <label>
                    Communication Willingness:
                    <select name="communication_willingness" value={data.communication_willingness || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsCommunicationWillingness.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Rate your willingness to communicate.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Social Frequency:
                    <select name="social_frequency" value={data.social_frequency || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsSocialFrequency.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Specify how often you socialize.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Social Quality:
                    <select name="social_quality" value={data.social_quality || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsSocialQuality.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Rate the quality of your social interactions.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Self-care Activities:
                    <Select
                        isMulti
                        name="selfcare_activities"
                        value={(data.selfcare_activities || []).map(activity => ({ value: activity, label: activity }))}
                        options={optionsSelfcareActivities}
                        onChange={selectedOptions => handleMultiSelectChange(selectedOptions, 'selfcare_activities')}
                    />
                    <small>Choose the self-care activities you engage in.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Exercise Frequency:
                    <select name="exercise_freq" value={data.exercise_freq || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsExerciseFreq.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Specify how often you exercise.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Exercise Intensity:
                    <select name="exercise_intensity" value={data.exercise_intensity || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsExerciseIntensity.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Specify the intensity of your exercises.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Dietary Habits:
                    <select name="dietary_habits" value={data.dietary_habits || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsDietaryHabits.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Specify your dietary habits.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Productivity:
                    <select name="productivity" value={data.productivity || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsProductivity.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Rate your productivity level.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Preferred Tasks Types:
                    <select name="preferred_tasks_types" value={data.preferred_tasks_types || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsPreferredTasksTypes.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Specify the type of tasks you prefer.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Support Needed:
                    <Select
                        isMulti
                        name="support_needed"
                        value={(data.support_needed || []).map(support => ({ value: support, label: support }))}
                        options={optionsSupportNeeded}
                        onChange={selectedOptions => handleMultiSelectChange(selectedOptions, 'support_needed')}
                    />
                    <small>Choose the type of support you need.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Coitus:
                    <select name="coitus" value={data.coitus || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsCoitus.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Specify the frequency of coitus.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Sleep Pattern:
                    <select name="sleep_pattern" value={data.sleep_pattern || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsSleepPattern.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Specify your sleep pattern.</small>
                </label>
            </div>
        </>
    );
};

export default Behaviors;
