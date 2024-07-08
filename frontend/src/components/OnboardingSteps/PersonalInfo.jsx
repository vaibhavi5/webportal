import React from 'react';

const PersonalInfo = ({ data, handleChange }) => {
    const optionsGender = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Non_binary", label: "Non-binary" },
        { value: "Prefer not to say", label: "Prefer not to say" }
    ];

    const optionsMarital = [
        { value: "Single", label: "Single" },
        { value: "Married", label: "Married" },
        { value: "Widowed", label: "Widowed" },
        { value: "Divorced", label: "Divorced" },
        { value: "Separated", label: "Separated" },
        { value: "Prefer not to say", label: "Prefer not to say" }
    ];

    const optionsBirthControl = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
        { value: "Prefer not to say", label: "Prefer not to say" }
    ];

    const optionsRegularity = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
        { value: "Not sure", label: "Not sure" }
    ];

    const optionsMenstrualPain = [
        { value: "No pain", label: "No pain" },
        { value: "Mild pain", label: "Mild pain (manageable without medication)" },
        { value: "Moderate pain", label: "Moderate pain (requires over-the-counter pain medication)" },
        { value: "Severe pain", label: "Severe pain (requires prescription pain medication)" },
        { value: "Very severe pain", label: "Very severe pain (disrupts daily activities)" }
    ];

    const optionsOccupation = [
        { value: "Agriculture", label: "Agriculture" },
        { value: "Utilities", label: "Utilities" },
        { value: "Finance", label: "Finance" },
        { value: "Entertainment", label: "Entertainment" },
        { value: "Education", label: "Education" },
        { value: "Healthcare", label: "Healthcare" },
        { value: "Information Services", label: "Information Services" },
        { value: "Data Processing", label: "Data Processing" },
        { value: "Food Services", label: "Food Services" },
        { value: "Hotel Services", label: "Hotel Services" },
        { value: "Legal Services", label: "Legal Services" },
        { value: "Publishing", label: "Publishing" },
        { value: "Military", label: "Military" },
        { value: "Other", label: "Other" }
    ];

    const optionsOccupationRole = [
        { value: "Upper Management", label: "Upper Management" },
        { value: "Middle Management", label: "Middle Management" },
        { value: "Junior Management", label: "Junior Management" },
        { value: "Administrative Staff", label: "Administrative Staff" },
        { value: "Support Staff", label: "Support Staff" },
        { value: "Trained Professional", label: "Trained Professional" },
        { value: "Skilled Laborer", label: "Skilled Laborer" },
        { value: "Consultant", label: "Consultant" },
        { value: "Temporary Employee", label: "Temporary Employee" },
        { value: "Researcher", label: "Researcher" },
        { value: "Self-employed", label: "Self-employed" },
        { value: "Partner", label: "Partner" },
        { value: "Student", label: "Student" },
        { value: "Other", label: "Other" }
    ];

    const handleNestedChange = (e, field) => {
        const { name, value } = e.target;
        handleChange({
            target: {
                name: field,
                value: {
                    ...data[field],
                    [name]: value
                }
            }
        });
    };

    return (
        <>
            <div className="input-box">
                <label>
                    Date of Birth (DOB):
                    <input type="date" name="DOB" value={data.DOB || ''} onChange={handleChange} />
                    <small>Enter your date of birth in YYYY-MM-DD format.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Gender:
                    <select name="gender" value={data.gender || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsGender.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Select your gender.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Location - City:
                    <input type="text" name="city" value={data.location.city || ''} onChange={(e) => handleNestedChange(e, 'location')} />
                    <small>Enter your city.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Location - State:
                    <input type="text" name="state" value={data.location.state || ''} onChange={(e) => handleNestedChange(e, 'location')} />
                    <small>Enter your state.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Location - Country:
                    <input type="text" name="country" value={data.location.country || ''} onChange={(e) => handleNestedChange(e, 'location')} />
                    <small>Enter your country (optional).</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Marital Status:
                    <select name="marital" value={data.marital || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsMarital.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Select your marital status.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Birth Control:
                    <select name="birth_control" value={data.birth_control || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsBirthControl.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Specify if you are using any birth control methods.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Regularity of Menstrual Cycle:
                    <select name="regularity" value={data.regularity || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsRegularity.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Specify if your menstrual cycle is regular.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Last Period Date:
                    <input type="date" name="last_period_date" value={data.last_period_date || ''} onChange={handleChange} />
                    <small>Enter the date of your last period in YYYY-MM-DD format.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Average Cycle Length (days):
                    <input type="number" name="cycle_length_avg_est" value={data.cycle_length_avg_est || ''} onChange={handleChange} min={1} />
                    <small>Enter the average length of your menstrual cycle in days.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Average Period Length (days):
                    <input type="number" name="period_length_avg_est" value={data.period_length_avg_est || ''} onChange={handleChange} min={1} />
                    <small>Enter the average length of your period in days.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Menstrual Pain:
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
                    Height:
                    <div className="height-input">
                        <input type="number" name="height_num" value={data.height?.height_num || ''} onChange={(e) => handleNestedChange(e, 'height')} />
                        <select name="height_unit" value={data.height?.height_unit || ''} onChange={(e) => handleNestedChange(e, 'height')}>
                            <option value="">Select</option>
                            <option value="feet">Feet</option>
                            <option value="cm">Centimeters</option>
                        </select>
                    </div>
                    <small>Enter your height with unit.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Weight:
                    <div className="weight-input">
                        <input type="number" name="weight_num" value={data.weight?.weight_num || ''} onChange={(e) => handleNestedChange(e, 'weight')} />
                        <select name="weight_unit" value={data.weight?.weight_unit || ''} onChange={(e) => handleNestedChange(e, 'weight')}>
                            <option value="">Select</option>
                            <option value="lb">Pounds</option>
                            <option value="kg">Kilograms</option>
                        </select>
                    </div>
                    <small>Enter your weight with unit.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Occupation:
                    <select name="occupation" value={data.occupation || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsOccupation.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Select your occupation.</small>
                </label>
            </div>
            <div className="input-box">
                <label>
                    Occupation Role:
                    <select name="occupation_role" value={data.occupation_role || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        {optionsOccupationRole.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <small>Select your occupation role.</small>
                </label>
            </div>
        </>
    );
};

export default PersonalInfo;
