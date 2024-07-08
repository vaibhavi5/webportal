import React from 'react';
import Select from 'react-select';

const MoodData = ({ data, handleChange, handleMultiSelectChange }) => {
    const optionsDailyMood = [
        { value: "Happy", label: "Happy" },
        { value: "Excited", label: "Excited" },
        { value: "Content", label: "Content" },
        { value: "Motivated", label: "Motivated" },
        { value: "Energetic", label: "Energetic" },
        { value: "Neutral", label: "Neutral" },
        { value: "Irritable", label: "Irritable" },
        { value: "Anxious", label: "Anxious" },
        { value: "Stressed", label: "Stressed" },
        { value: "Bored", label: "Bored" },
        { value: "Lonely", label: "Lonely" },
        { value: "Frustrated", label: "Frustrated" },
    ];

    const optionsAnySymptom = [
        { value: "None", label: "None" },
        { value: "Cramps", label: "Cramps" },
        { value: "Bloating", label: "Bloating" },
        { value: "Headaches or Migraines", label: "Headaches or Migraines" },
        { value: "Back Pain", label: "Back Pain" },
        { value: "Fatigue", label: "Fatigue" },
        { value: "Mood Swings", label: "Mood Swings" },
        { value: "Irritability", label: "Irritability" },
        { value: "Breast Tenderness", label: "Breast Tenderness" },
        { value: "Nausea", label: "Nausea" },
        { value: "Diarrhea or Constipation", label: "Diarrhea or Constipation" },
        { value: "Acne", label: "Acne" },
        { value: "Heavy Bleeding", label: "Heavy Bleeding" },
        { value: "Light Bleeding", label: "Light Bleeding" },
        { value: "Dizziness", label: "Dizziness" },
        { value: "Sleep Disturbances", label: "Sleep Disturbances" },
        { value: "Food Cravings", label: "Food Cravings" },
        { value: "Joint or Muscle Pain", label: "Joint or Muscle Pain" },
        { value: "Anxiety or Depression", label: "Anxiety or Depression" },
        { value: "Other (please specify)", label: "Other (please specify)" },
    ];

    const optionsFeelLikeDoing = [
        { value: "Exercise", label: "Exercise" },
        { value: "Work/Study", label: "Work/Study" },
        { value: "Relax/Rest", label: "Relax/Rest" },
        { value: "Socialize", label: "Socialize" },
        { value: "Tackle to-do list", label: "Tackle to-do list" },
    ];

    const optionsExerciseType = [
        { value: "Yoga", label: "Yoga" },
        { value: "Running", label: "Running" },
        { value: "Walking", label: "Walking" },
        { value: "Strength Training", label: "Strength Training" },
        { value: "Cycling", label: "Cycling" },
        { value: "Swimming", label: "Swimming" },
        { value: "Pilates", label: "Pilates" },
        { value: "Dancing", label: "Dancing" },
        { value: "Hiking", label: "Hiking" },
        { value: "Aerobics", label: "Aerobics" },
        { value: "HIIT (High-Intensity Interval Training)", label: "HIIT (High-Intensity Interval Training)" },
        { value: "Team Sports (e.g., soccer, basketball)", label: "Team Sports (e.g., soccer, basketball)" },
        { value: "Martial Arts", label: "Martial Arts" },
        { value: "Climbing", label: "Climbing" },
        { value: "Tennis", label: "Tennis" },
        { value: "Golf", label: "Golf" },
        { value: "Rowing", label: "Rowing" },
        { value: "Boxing", label: "Boxing" },
        { value: "None", label: "None" },
    ];

    const optionsDoWhatTypeWork = [
        { value: "Errands/tasks/obligations", label: "Errands/tasks/obligations" },
        { value: "Work at computer/desk", label: "Work at computer/desk" },
        { value: "Active/physical work", label: "Active/physical work" },
    ];

    const optionsPreferCommuType = [
        { value: "In-person", label: "In-person" },
        { value: "Email", label: "Email" },
        { value: "Text/IM", label: "Text/IM" },
        { value: "Call/FaceTime", label: "Call/FaceTime" },
    ];

    const optionsTypeOfEngageSocialActivities = [
        { value: "Casual meetup", label: "Casual meetup" },
        { value: "Formal event", label: "Formal event" },
        { value: "Family time", label: "Family time" },
        { value: "Online socializing", label: "Online socializing" },
    ];

    const options1to5 = [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
    ];

    return (
        <>
            <div className="input-box">
                <label>
                    How would you describe your mood today?
                    <Select
                        isMulti
                        name="daily_mood"
                        value={(data.daily_mood || []).map(mood => ({ value: mood, label: mood }))}
                        options={optionsDailyMood}
                        onChange={selectedOptions => handleMultiSelectChange(selectedOptions, 'daily_mood')}
                    />
                    <small>Choose one or more options to describe your daily mood.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Mood Intensity:
                    <input type="number" name="mood_intensity" value={data.mood_intensity || ''} onChange={handleChange} min={1} max={10} required />
                    <small>Rate the intensity of your mood on a scale from 1 (low) to 10 (high).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Mood Notes:
                    <small> Optional: Provide any additional notes about your mood. </small>
                    <textarea name="mood_notes" value={data.mood_notes || ''} onChange={handleChange}></textarea>

                </label>
            </div>
            <div className="input-box">
                <label>
                    Do you have any symptom?
                    <Select
                        isMulti
                        name="any_symptom"
                        value={(data.any_symptom || []).map(symptom => ({ value: symptom, label: symptom }))}
                        options={optionsAnySymptom}
                        onChange={selectedOptions => handleMultiSelectChange(selectedOptions, 'any_symptom')}
                    />
                    <small>Choose one or more symptoms you experienced today.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    How energized do you feel?
                    <Select
                        name="energized_level"
                        value={{ value: data.energized_level, label: data.energized_level }}
                        options={options1to5}
                        onChange={selectedOption => handleChange({ target: { name: 'energized_level', value: selectedOption.value } })}
                    />
                    <small>Rate your energy level on a scale from 1 (low) to 5 (high).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    How quick to anger have you been today?
                    <Select
                        name="quick_to_anger"
                        value={{ value: data.quick_to_anger, label: data.quick_to_anger }}
                        options={options1to5}
                        onChange={selectedOption => handleChange({ target: { name: 'quick_to_anger', value: selectedOption.value } })}
                    />
                    <small>Rate how quick you were to anger on a scale from 1 (low) to 5 (high).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    How creative do you feel today?
                    <Select
                        name="creative_level"
                        value={{ value: data.creative_level, label: data.creative_level }}
                        options={options1to5}
                        onChange={selectedOption => handleChange({ target: { name: 'creative_level', value: selectedOption.value } })}
                    />
                    <small>Rate your creativity level on a scale from 1 (low) to 5 (high).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    How physically fatigued have you felt today?
                    <Select
                        name="physically_fatigued_level"
                        value={{ value: data.physically_fatigued_level, label: data.physically_fatigued_level }}
                        options={options1to5}
                        onChange={selectedOption => handleChange({ target: { name: 'physically_fatigued_level', value: selectedOption.value } })}
                    />
                    <small>Rate your physical fatigue level on a scale from 1 (low) to 5 (high).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    How mentally fatigued have you felt today?
                    <Select
                        name="mentally_fatigued_level"
                        value={{ value: data.mentally_fatigued_level, label: data.mentally_fatigued_level }}
                        options={options1to5}
                        onChange={selectedOption => handleChange({ target: { name: 'mentally_fatigued_level', value: selectedOption.value } })}
                    />
                    <small>Rate your mental fatigue level on a scale from 1 (low) to 5 (high).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    How comfortable in your own body do you feel today?
                    <Select
                        name="comfortable_level"
                        value={{ value: data.comfortable_level, label: data.comfortable_level }}
                        options={options1to5}
                        onChange={selectedOption => handleChange({ target: { name: 'comfortable_level', value: selectedOption.value } })}
                    />
                    <small>Rate your comfort level on a scale from 1 (low) to 5 (high).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    How confident do you feel today?
                    <Select
                        name="confident_level"
                        value={{ value: data.confident_level, label: data.confident_level }}
                        options={options1to5}
                        onChange={selectedOption => handleChange({ target: { name: 'confident_level', value: selectedOption.value } })}
                    />
                    <small>Rate your confidence level on a scale from 1 (low) to 5 (high).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    What do you feel like doing today?
                    <select name="feel_like_doing" value={data.feel_like_doing || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsFeelLikeDoing.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Choose one activity you feel like doing the most.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    How stressed did you feel today?
                    <Select
                        name="stressed_level"
                        value={{ value: data.stressed_level, label: data.stressed_level }}
                        options={options1to5}
                        onChange={selectedOption => handleChange({ target: { name: 'stressed_level', value: selectedOption.value } })}
                    />
                    <small>Rate your stress level on a scale from 1 (low) to 5 (high).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Have you felt more emotionally or logically driven today?
                    <Select
                        name="emotionally_or_logically"
                        value={{ value: data.emotionally_or_logically, label: data.emotionally_or_logically }}
                        options={options1to5}
                        onChange={selectedOption => handleChange({ target: { name: 'emotionally_or_logically', value: selectedOption.value } })}
                    />
                    <small>Rate how you felt emotionally or logically on a scale from 1 (low) to 5 (high).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    How quickly did your mood change today?
                    <Select
                        name="mood_change_level"
                        value={{ value: data.mood_change_level, label: data.mood_change_level }}
                        options={options1to5}
                        onChange={selectedOption => handleChange({ target: { name: 'mood_change_level', value: selectedOption.value } })}
                    />
                    <small>Rate your mood change level on a scale from 1 (low) to 5 (high).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    How do you feel like working today?
                    <select name="feel_like_working" value={data.feel_like_working || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Alone">Alone</option>
                        <option value="With others">With others</option>
                    </select>
                    <small>Choose whether you feel like working alone or with others.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    How would you rate your ability to concentrate at work today?
                    <Select
                        name="ability_to_concentrate_at_work"
                        value={{ value: data.ability_to_concentrate_at_work, label: data.ability_to_concentrate_at_work }}
                        options={options1to5}
                        onChange={selectedOption => handleChange({ target: { name: 'ability_to_concentrate_at_work', value: selectedOption.value } })}
                    />
                    <small>Rate your ability to concentrate at work on a scale from 1 (low) to 5 (high).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Did you find it challenging to complete your work tasks today? (Yes/No)
                    <select name="challenging_complete_tasks" value={data.challenging_complete_tasks || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    <small>Choose whether it was challenging to complete tasks today.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    What type of work did you do today? 
                    <Select
                        isMulti
                        name="do_what_type_work"
                        value={(data.do_what_type_work || []).map(work => ({ value: work, label: work }))}
                        options={optionsDoWhatTypeWork}
                        onChange={selectedOptions => handleMultiSelectChange(selectedOptions, 'do_what_type_work')}
                    />
                    <small>Choose the types of work you did today.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    How easy was it to complete your to-do list?
                    <Select
                        name="easy_to_complete_todo"
                        value={{ value: data.easy_to_complete_todo, label: data.easy_to_complete_todo }}
                        options={options1to5}
                        onChange={selectedOption => handleChange({ target: { name: 'easy_to_complete_todo', value: selectedOption.value } })}
                    />
                    <small>Rate how easy it was to complete your to-do list on a scale from 1 (low) to 5 (high).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    How would you rate your physical activity level today?
                    <Select
                        name="physical_activity_level"
                        value={{ value: data.physical_activity_level, label: data.physical_activity_level }}
                        options={options1to5}
                        onChange={selectedOption => handleChange({ target: { name: 'physical_activity_level', value: selectedOption.value } })}
                    />
                    <small>Rate your physical activity level on a scale from 1 (low) to 5 (high).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    What type of exercise did you do today? 
                    <Select
                        isMulti
                        name="exercise_type"
                        value={(data.exercise_type || []).map(exercise => ({ value: exercise, label: exercise }))}
                        options={optionsExerciseType}
                        onChange={selectedOptions => handleMultiSelectChange(selectedOptions, 'exercise_type')}
                    />
                    <small>Choose the types of exercise you did today.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Do you feel like spending time by yourself or with others today?
                    <select name="by_yourself_or_with_others" value={data.by_yourself_or_with_others || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Myself">Myself</option>
                        <option value="With others">With others</option>
                    </select>
                    <small>Choose whether you did activities by yourself or with others.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    What type of support do you need from loved ones today? 
                    <select name="needed_support_type" value={data.needed_support_type || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Emotional support">Emotional support</option>
                        <option value="Physical comfort">Physical comfort</option>
                        <option value="Logical advice">Logical advice</option>
                    </select>
                    <small>Choose the type of support you needed today.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    How did you prefer to communicate with others? 
                    <select name="prefer_commu_type" value={data.prefer_commu_type || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsPreferCommuType.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Choose your preferred method of communication.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    How satisfied were you with your social interactions today? 
                    <Select
                        name="social_satidfied_level"
                        value={{ value: data.social_satidfied_level, label: data.social_satidfied_level }}
                        options={options1to5}
                        onChange={selectedOption => handleChange({ target: { name: 'social_satidfied_level', value: selectedOption.value } })}
                    />
                    <small>Rate your level of satisfaction with your social interactions on a scale from 1 (low) to 5 (high).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Did you engage in any social activities today? (Yes/No)
                    <select name="engage_social_activities" value={data.engage_social_activities || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    <small>Choose whether you engaged in social activities today.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    If yes, what type of social activities did you engage in? 
                    <Select
                        isMulti
                        name="type_of_engage_social_activities"
                        value={(data.type_of_engage_social_activities || []).map(activity => ({ value: activity, label: activity }))}
                        options={optionsTypeOfEngageSocialActivities}
                        onChange={selectedOptions => handleMultiSelectChange(selectedOptions, 'type_of_engage_social_activities')}
                    />
                    <small>Choose the types of social activities you engaged in today.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    How supported did you feel by your loved ones today?
                    <Select
                        name="feel_supported_level"
                        value={{ value: data.feel_supported_level, label: data.feel_supported_level }}
                        options={options1to5}
                        onChange={selectedOption => handleChange({ target: { name: 'feel_supported_level', value: selectedOption.value } })}
                    />
                    <small>Rate how supported you felt on a scale from 1 (low) to 5 (high).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    How much did you feel like socializing today?
                    <Select
                        name="like_socializing_level"
                        value={{ value: data.like_socializing_level, label: data.like_socializing_level }}
                        options={options1to5}
                        onChange={selectedOption => handleChange({ target: { name: 'like_socializing_level', value: selectedOption.value } })}
                    />
                    <small>Rate how much you liked socializing today on a scale from 1 (low) to 5 (high).</small>
                </label>
            </div>
        </>
    );
};

export default MoodData;
