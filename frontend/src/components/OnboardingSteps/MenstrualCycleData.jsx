import React from 'react';
import Select from 'react-select';

const MenstrualCycleData = ({ data, handleChange, handleMultiSelectChange }) => {
    const optionsHealthIssue = [
        { value: "None", label: "None" },
        { value: "Asthma", label: "Asthma" },
        { value: "Diabetes", label: "Diabetes" },
        { value: "Hypertension (High Blood Pressure)", label: "Hypertension (High Blood Pressure)" },
        { value: "Heart Disease", label: "Heart Disease" },
        { value: "Arthritis", label: "Arthritis" },
        { value: "Depression", label: "Depression" },
        { value: "Anxiety", label: "Anxiety" },
        { value: "Chronic Pain", label: "Chronic Pain" },
        { value: "Allergies", label: "Allergies" },
        { value: "Gastrointestinal Disorders (e.g., IBS, Crohn's Disease)", label: "Gastrointestinal Disorders (e.g., IBS, Crohn's Disease)" },
        { value: "Migraine or Chronic Headaches", label: "Migraine or Chronic Headaches" },
        { value: "Sleep Disorders (e.g., Insomnia, Sleep Apnea)", label: "Sleep Disorders (e.g., Insomnia, Sleep Apnea)" },
        { value: "Autoimmune Diseases (e.g., Lupus, Rheumatoid Arthritis)", label: "Autoimmune Diseases (e.g., Lupus, Rheumatoid Arthritis)" },
        { value: "Respiratory Conditions (e.g., COPD, Emphysema)", label: "Respiratory Conditions (e.g., COPD, Emphysema)" },
        { value: "Cancer", label: "Cancer" },
        { value: "Neurological Disorders (e.g., Epilepsy, Multiple Sclerosis)", label: "Neurological Disorders (e.g., Epilepsy, Multiple Sclerosis)" },
        { value: "Skin Conditions (e.g., Eczema, Psoriasis)", label: "Skin Conditions (e.g., Eczema, Psoriasis)" },
        { value: "Other (please specify)", label: "Other (please specify)" },
    ];

    const optionsPeriodSymptoms = [
        { value: "None", label: "None" },
        { value: "Cramps", label: "Cramps" },
        { value: "Bloating", label: "Bloating" },
        { value: "Headaches or Migraines", label: "Headaches" },
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

    const optionsKnowDischarge = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
    ];

    const optionsDescribeDischarge = [
        { value: "Clear and Watery, a normal phase in the menstrual cycle", label: "Clear and Watery, a normal phase in the menstrual cycle." },
        { value: "Clear and Stretchy, a normal phase in the menstrual cycle. This Indicates ovulation", label: "Clear and Stretchy, a normal phase in the menstrual cycle. This Indicates ovulation" },
        { value: "White and Creamy Discharge. Mild or no odor. Normal discharge before or after a menstrual period", label: "White and Creamy Discharge.Mild or no odor. Normal discharge before or after a menstrual period." },
        { value: "Yellow or greenish, often thick or clumpy. Corresponding Symptoms: Foul odor, itching, or irritation. Need attention", label: "Yellow or greenish, often thick or clumpy. Corresponding Symptoms: Foul odor, itching, or irritation. Need attention." },
        { value: "Gray or off-white discharge.Fishy odor, especially after intercourse. Need attention", label: "Gray or off-white discharge.Fishy odor, especially after intercourse. Need attention." },
        { value: "Brown or reddish discharge, can be light or heavy. Spotting or light bleeding outside of a regular period. Need attention", label: "Brown or reddish discharge, can be light or heavy. Spotting or light bleeding outside of a regular period. Need attention." },
    ];

    const optionsCycleImpact = [
        { value: "Sleep", label: "Sleep" },
        { value: "Skin", label: "Skin" },
        { value: "Energy or activity level", label: "Energy or activity level" },
        { value: "Diet", label: "Diet" },
        { value: "Mental health", label: "Mental health" },
        { value: "Others", label: "Others" },
        { value: "No", label: "No" },
    ];

    const optionsExploreSexlife = [
        { value: "Understand Sex Drive", label: "Understand Sex Drive" },
        { value: "Pleasure Exploration", label: "Pleasure Exploration" },
        { value: "Body Confidence", label: "Body Confidence" },
        { value: "Partner Communication", label: "Partner Communication" },
        { value: "Turn-Ons Discovery", label: "Turn-Ons Discovery" },
        { value: "No Sex Currently", label: "No Sex Currently" },
        { value: "Other", label: "Other" },
    ];

    const optionsCycleRegularity = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
    ];

    const optionsOnPeriod = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
    ];

    const optionsTemperatureUnit = [
        { value: "Fahrenheit", label: "Fahrenheit" },
        { value: "Celsius", label: "Celsius" },
    ];

    const optionsPeakDay = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
    ];

    const optionsColor = [
        { value: "Dry or very little discharge", label: "Dry or very little discharge" },
        { value: "Sticky or tacky discharge", label: "Sticky or tacky discharge" },
        { value: "Creamy or lotion-like discharge", label: "Creamy or lotion-like discharge" },
        { value: "Egg white-like (clear and stretchy) discharge", label: "Egg white-like (clear and stretchy) discharge" },
        { value: "Watery discharge", label: "Watery discharge" },
        { value: "Thick or clumpy discharge", label: "Thick or clumpy discharge" },
        { value: "Blood-tinged discharge (spotting)", label: "Blood-tinged discharge (spotting)" },
        { value: "Other (please specify)", label: "Other (please specify)" },
    ];

    const optionsFlow = [
        { value: "Very light (spotting)", label: "Very light (spotting)" },
        { value: "Light", label: "Light" },
        { value: "Moderate", label: "Moderate" },
        { value: "Heavy", label: "Heavy" },
        { value: "Very heavy (flooding or large clots)", label: "Very heavy (flooding or large clots)" },
        { value: "Variable (changes from cycle to cycle)", label: "Variable (changes from cycle to cycle)" },
    ];

    const optionsMenstrualPain = [
        { value: "No pain", label: "No pain" },
        { value: "Mild pain (manageable without medication)", label: "Mild pain (manageable without medication)" },
        { value: "Moderate pain (requires over-the-counter pain medication)", label: "Moderate pain (requires over-the-counter pain medication)" },
        { value: "Severe pain (requires prescription pain medication)", label: "Severe pain (requires prescription pain medication)" },
        { value: "Very severe pain (disrupts daily activities)", label: "Very severe pain (disrupts daily activities)" },
    ];

    const optionsMensturalPhysicalSymptoms = [
        { value: "Head", label: "Head" },
        { value: "Headache", label: "Headache" },
        { value: "Nephritis", label: "Nephritis" },
        { value: "Insomnia", label: "Insomnia" },
        { value: "Flank Pain", label: "Flank Pain" },
        { value: "Diarrhea", label: "Diarrhea" },
        { value: "Period Pain", label: "Period Pain" },
        { value: "Whole Body", label: "Whole Body" },
        { value: "Constipation", label: "Constipation" },
        { value: "Muscle Ache", label: "Muscle Ache" },
        { value: "Fever", label: "Fever" },
        { value: "Edema", label: "Edema" },
        { value: "Abnormal Leucorrhea", label: "Abnormal Leucorrhea" },
        { value: "Get Cold", label: "Get Cold" },
        { value: "Skin", label: "Skin" },
        { value: "Dry Skin", label: "Dry Skin" },
        { value: "Acne", label: "Acne" },
        { value: "Oily Skin", label: "Oily Skin" },
    ];

    const optionsBirthControl = [
        { value: "Implant", label: "Implant" },
        { value: "Birth Control Ring", label: "Birth Control Ring" },
        { value: "Emergency Contraception (Plan B, Ella)", label: "Emergency Contraception (Plan B, Ella)" },
        { value: "Hormonal IUD", label: "Hormonal IUD" },
        { value: "Non-Hormonal IUD", label: "Non-Hormonal IUD" },
        { value: "Birth Control Shot", label: "Birth Control Shot" },
        { value: "Birth Control Pills", label: "Birth Control Pills" },
        { value: "Patch", label: "Patch" },
        { value: "Condoms", label: "Condoms" }
    ];

    return (
        <>
            <div className="input-box">
                <label>
                    Do you suffer from any health conditions?
                    <Select
                        isMulti
                        name="health_issue"
                        value={(data.health_issue || []).map(issue => ({ value: issue, label: issue }))}
                        options={optionsHealthIssue}
                        onChange={selectedOptions => handleMultiSelectChange(selectedOptions, 'health_issue')}
                    />
                    <small>Choose one or more health issues.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Do you suffer from any Symptoms during period?
                    <Select
                        isMulti
                        name="period_symptoms"
                        value={(data.period_symptoms || []).map(symptom => ({ value: symptom, label: symptom }))}
                        options={optionsPeriodSymptoms}
                        onChange={selectedOptions => handleMultiSelectChange(selectedOptions, 'period_symptoms')}
                    />
                    <small>Choose one or more period symptoms.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Do you know your discharge change through out cycle?
                    <select name="know_discharge" value={data.know_discharge || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsKnowDischarge.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Specify if you know about discharge (Yes/No).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Which option best describe your discharge?
                    <select name="describe_discharge" value={data.describe_discharge || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsDescribeDischarge.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Describe the discharge.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Does your Cycle impact you in these way？
                    <Select
                        isMulti
                        name="cycle_impact"
                        value={(data.cycle_impact || []).map(impact => ({ value: impact, label: impact }))}
                        options={optionsCycleImpact}
                        onChange={selectedOptions => handleMultiSelectChange(selectedOptions, 'cycle_impact')}
                    />
                    <small>Choose the aspects impacted by your cycle.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Do you want to explore anything new in sex life?
                    <Select
                        isMulti
                        name="explore_sexlife"
                        value={(data.explore_sexlife || []).map(life => ({ value: life, label: life }))}
                        options={optionsExploreSexlife}
                        onChange={selectedOptions => handleMultiSelectChange(selectedOptions, 'explore_sexlife')}
                    />
                    <small>Choose the aspects you want to explore about your sex life.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Date of last menstrual period (LMP):
                    <input type="date" name="lmp_date" value={data.lmp_date || ''} onChange={handleChange} />
                    <small>Enter the date of your last menstrual period in YYYY-MM-DD format.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    What is your average cycle length?
                    <input type="number" name="ave_cycle_length" value={data.ave_cycle_length || ''} onChange={handleChange} />
                    <small>Enter the average length of your cycle in days.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Are your cycle regular?
                    <select name="cycle_regularity" value={data.cycle_regularity || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsCycleRegularity.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Specify if your cycle is regular (Yes/No).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    When is your ovulation date?
                    <input type="date" name="ovulation_dates" value={data.ovulation_dates || ''} onChange={handleChange} />
                    <small>Enter the dates of ovulation in YYYY-MM-DD format.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Which day are your recording?
                    <input type="date" name="record_date" value={data.record_date || ''} onChange={handleChange} required />
                    <small>Enter the record date in YYYY-MM-DD format.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Bleeding:
                    <select name="bleeding" value={data.bleeding || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsOnPeriod.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Specify if you are bleeding (Yes/No).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Are you on your period now?
                    <select name="on_period" value={data.on_period || ''} onChange={handleChange} required>
                        <option value="">Select</option>
                        {optionsOnPeriod.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Specify if you are on your period (Yes/No).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    On which day of your period?
                    <input type="number" name="which_day_of_period" value={data.which_day_of_period || ''} onChange={handleChange} required />
                    <small>Specify which day of your period you are on.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    What is your body temperature?
                    <input type="number" name="temperature" value={data.temperature || ''} onChange={handleChange} />
                    <small>Enter your body temperature.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Temperature Unit:
                    <select name="temp_unit" value={data.temp_unit || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsTemperatureUnit.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Specify the unit of your body temperature (Fahrenheit/Celsius).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Are you on your peak day?
                    <select name="peak_day" value={data.peak_day || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsPeakDay.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Specify if it is your peak day (Yes/No).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    How do your describe your discharge?
                    <select name="color" value={data.color || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsColor.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Specify the color of your discharge.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    How do your describe your menstrual flow?
                    <select name="flow" value={data.flow || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsFlow.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Specify the flow of your period.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Period Length:
                    <input type="number" name="period_length" value={data.period_length || ''} onChange={handleChange} />
                    <small>Specify the length of your period in days.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    What is your menstrual pain level?
                    <select name="menstrual_pain" value={data.menstrual_pain || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsMenstrualPain.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Specify the severity of your menstrual pain.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Do you have any physical symptoms during period?
                    <Select
                        isMulti
                        name="menstural_physical_symptoms"
                        value={(data.menstural_physical_symptoms || []).map(symptom => ({ value: symptom, label: symptom }))}
                        options={optionsMensturalPhysicalSymptoms}
                        onChange={selectedOptions => handleMultiSelectChange(selectedOptions, 'menstural_physical_symptoms')}
                    />
                    <small>Choose one or more physical symptoms during your menstrual cycle.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    What birth control do you use?
                    <select name="birth_control" value={data.birth_control || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsBirthControl.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Specify the type of birth control you are using.</small>
                </label>
            </div>
        </>
    );
};

export default MenstrualCycleData;
