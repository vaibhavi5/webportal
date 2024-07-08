// // components/SurveyStep.jsx
// import React from 'react';
// import "./Survey.css"

// const SurveyStep = ({ step, title, children, onBack, onNext, isLastStep }) => {
//   return (
//     <div className="survey-step">
//       <h2>{title}</h2>
//       {children}
//       <div className="button-group">
//         {step > 1 && <button onClick={onBack}>Back</button>}
//         <button onClick={onNext}>{isLastStep ? 'Finish' : 'Next'}</button>
//       </div>
//     </div>
//   );
// };

// export default SurveyStep;

//------------------------------------------——————————————————————————————————————

// import React from 'react';
// import MenstrualCycleData from './OnboardingSteps/MenstrualCycleData';
// import PersonalInfo from './OnboardingSteps/PersonalInfo';
// import MoodData from './OnboardingSteps/MoodData';
// import Behaviors from './OnboardingSteps/Behaviors';
// import AccountInfo from './OnboardingSteps/AccountInfo';

// const SurveyStep = ({ data, handleChange, handleNextStep, handlePreviousStep, handleSubmit, title, handleMultiSelectChange }) => {
//     const initializedData = {
//         health_issue: [],
//         period_symptoms: [],
//         know_discharge: '',
//         describe_discharge: '',
//         cycle_impact: [],
//         explore_sexlife: [],
//         lmp_date: '',
//         ave_cycle_length: '',
//         cycle_regularity: '',
//         ovulation_dates: '',
//         record_date: '',
//         bleeding: '',
//         on_period: '',
//         which_day_of_period: '',
//         temperature: '',
//         temp_unit: '',
//         peak_day: '',
//         color: '',
//         flow: '',
//         period_length: '',
//         menstrual_pain: '',
//         menstural_physical_symptoms: [],
//         birth_control: '',
//         DOB: '',
//         gender: '',
//         location_city: '',
//         location_state: '',
//         location_country: '',
//         marital: '',
//         regularity: '',
//         last_period_date: '',
//         cycle_length_avg_est: '',
//         period_length_avg_est: '',
//         occupation: '',
//         occupation_role: '',
//         mood_describe: '',
//         mood_intensity: '',
//         daily_mood: [],
//         mood_notes: '',
//         communication_willingness: '',
//         social_frequency: '',
//         social_quality: '',
//         selfcare_activities: [],
//         app_purpose: '',
//         why_tracking: '',
//         wearable_device: '',
//         phone_number: '',
//         notification_type: '',
//         notification_period: ''
//     };

//     return (
//         <div className="survey-step">
//             <h2>{title}</h2>
//             {title === 'Menstrual Cycle Data' && (
//                 <MenstrualCycleData
//                     data={{ ...initializedData, ...data }}
//                     handleChange={handleChange}
//                     handleMultiSelectChange={handleMultiSelectChange}
//                 />
//             )}
//             {title === 'Personal Info' && (
//                 <PersonalInfo
//                     data={{ ...initializedData, ...data }}
//                     handleChange={handleChange}
//                 />
//             )}
//             {title === 'Mood Data' && (
//                 <MoodData
//                     data={{ ...initializedData, ...data }}
//                     handleChange={handleChange}
//                     handleMultiSelectChange={handleMultiSelectChange}
//                 />
//             )}
//             {title === 'Behaviors' && (
//                 <Behaviors
//                     data={{ ...initializedData, ...data }}
//                     handleChange={handleChange}
//                     handleMultiSelectChange={handleMultiSelectChange}
//                 />
//             )}
//             {title === 'Account Info' && (
//                 <AccountInfo
//                     data={{ ...initializedData, ...data }}
//                     handleChange={handleChange}
//                 />
//             )}
//             <div className="button-group">
//                 {handlePreviousStep && <button onClick={handlePreviousStep}>Previous</button>}
//                 {handleNextStep && <button onClick={handleNextStep}>Next</button>}
//                 {handleSubmit && <button onClick={handleSubmit}>Submit</button>}
//             </div>
//         </div>
//     );
// };

// export default SurveyStep;


import React from 'react';

const SurveyStep = ({ step, title, onBack, onNext, handleChange, handleMultiSelectChange, data, Component, isLastStep, handleSubmit }) => {
    return (
        <div className="survey-step">
            <h2>Step {step}: {title}</h2>
            <Component data={data} handleChange={handleChange} handleMultiSelectChange={handleMultiSelectChange} />
            <div className="button-group">
                {step > 1 && <button onClick={onBack}>Back</button>}
                {isLastStep ? (
                    <button onClick={handleSubmit}>Submit</button>
                ) : (
                    <button onClick={onNext}>Next</button>
                )}
            </div>
        </div>
    );
};

export default SurveyStep;
