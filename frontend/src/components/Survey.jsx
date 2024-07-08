// // components/Survey.jsx
// import React, { useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../api/axiosInstance';
// import AuthContext from '../context/AuthContext';
// import SurveyStep from './SurveyStep';
// import './Survey.css';

// const Survey = () => {
//   const { user, loading, token } = useContext(AuthContext);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [surveyData, setSurveyData] = useState({
//     age: '',
//     gender: '',
//     location: '',
//     phone: '',
//     lastMenstrualPeriod: '',
//     averageCycleLength: '',
//     cycleRegularity: '',
//     painfulDays: '',
//     height: '',
//     weight: '',
//     activityLevel: '',
//     healthConditions: '',
//     preferences: '',
//     notificationFrequency: '',
//     notificationSystem: ''
//   });
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   if (loading) return;
//   //   if (!user) navigate('/');
//   // }, [user, loading, navigate]);

//   useEffect(() => {
//     const checkSurveyAccess = async () => {
//       if (loading) return;
//       if (!user) navigate('/');

//       try {
//         await axiosInstance.get('/surveys', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//       } catch (error) {
//         if (error.response && error.response.status === 403) {
//           navigate('/dashboard');
//         } else {
//           console.error("Error accessing survey:", error);
//         }
//       }
//     };

//     checkSurveyAccess();
//   }, [user, loading, navigate, token]);

//   const handleChange = (e) => {
//     setSurveyData({
//       ...surveyData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       await axiosInstance.post('/surveys/submit', { userId: user.uid, ...surveyData }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setMessage('Survey submitted successfully');
//       setTimeout(() => {
//         navigate('/dashboard');
//       }, 2000);
//     } catch (error) {
//       setMessage('Survey submission failed: ' + (error.response?.data?.message || error.message));
//     }
//   };

//   const handleNext = () => {
//     if (currentStep < 5) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       handleSubmit();
//     }
//   };

//   const handleBack = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <SurveyStep step={currentStep} title="Demographic Information" onBack={handleBack} onNext={handleNext}>
//             <input type="number" name="age" placeholder='Age' value={surveyData.age} onChange={handleChange} required />
//             <input type="text" name="gender" placeholder='Gender' value={surveyData.gender} onChange={handleChange} required />
//             <input type="text" name="location" placeholder='Location' value={surveyData.location} onChange={handleChange} required />
//             <input type="tel" name="phone" placeholder='Phone' value={surveyData.phone} onChange={handleChange} required />
//           </SurveyStep>
//         );
//       case 2:
//         return (
//           <SurveyStep step={currentStep} title="Menstrual Information" onBack={handleBack} onNext={handleNext}>
//             <label>Last Menstrual Period</label>
//             <input type="date" name="lastMenstrualPeriod" value={surveyData.lastMenstrualPeriod} onChange={handleChange} required />
//             <input type="number" name="averageCycleLength" placeholder='Average Cycle Length (days)' value={surveyData.averageCycleLength} onChange={handleChange} required />
//             <input type="text" name="cycleRegularity" placeholder='Cycle Regularity' value={surveyData.cycleRegularity} onChange={handleChange} required />
//             <input type="text" name="painfulDays" placeholder='Painful Days (comma separated)' value={surveyData.painfulDays} onChange={handleChange} required />
//           </SurveyStep>
//         );
//       case 3:
//         return (
//           <SurveyStep step={currentStep} title="Health Information" onBack={handleBack} onNext={handleNext}>
//             <input type="text" name="height" placeholder='Height' value={surveyData.height} onChange={handleChange} required />
//             <input type="text" name="weight" placeholder='Weight' value={surveyData.weight} onChange={handleChange} required />
//             <input type="text" name="activityLevel" placeholder='Activity Level' value={surveyData.activityLevel} onChange={handleChange} required />
//             <input type="text" name="healthConditions" placeholder='Health Conditions (comma separated)' value={surveyData.healthConditions} onChange={handleChange} required />
//           </SurveyStep>
//         );
//       case 4:
//         return (
//           <SurveyStep step={currentStep} title="Preferences" onBack={handleBack} onNext={handleNext}>
//             <input type="text" name="preferences" placeholder='Preferences (comma separated)' value={surveyData.preferences} onChange={handleChange} required />
//           </SurveyStep>
//         );
//       case 5:
//         return (
//           <SurveyStep step={currentStep} title="Notification Settings" onBack={handleBack} onNext={handleNext} isLastStep={true}>
//             <input type="text" name="notificationFrequency" placeholder='Notification Frequency' value={surveyData.notificationFrequency} onChange={handleChange} required />
//             <input type="text" name="notificationSystem" placeholder='Notification System (comma separated)' value={surveyData.notificationSystem} onChange={handleChange} required />
//           </SurveyStep>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="survey-container">
//       <div className="survey-box">
//         <div className="progress-bar">
//           <div className="progress" style={{ width: `${(currentStep / 5) * 100}%` }}></div>
//         </div>
//         {renderStep()}
//         {message && <p className="message">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default Survey;

//——————————————————————————————————————————————————————————————————————————————————————

// import React, { useState } from 'react';
// import axios from 'axios';
// import SurveyStep from './SurveyStep';
// import './Survey.css';

// const Survey = () => {
//     const [step, setStep] = useState(1);
//     const [accountInfo, setAccountInfo] = useState({});
//     const [personalInfo, setPersonalInfo] = useState({});
//     const [menstrualCycleData, setMenstrualCycleData] = useState({});
//     const [moodData, setMoodData] = useState({});
//     const [behaviors, setBehaviors] = useState({});

//     const handleNextStep = () => {
//         setStep(step + 1);
//     };

//     const handlePreviousStep = () => {
//         setStep(step - 1);
//     };

//     const handleDataChange = (setter) => (e) => {
//         setter(prevState => ({
//             ...prevState,
//             [e.target.name]: e.target.value
//         }));
//     };

//     const handleMultiSelectChange = (setter) => (selectedOptions, fieldName) => {
//         const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
//         setter(prevState => ({
//             ...prevState,
//             [fieldName]: values,
//         }));
//     };

//     const submitData = async (data, endpoint) => {
//         try {
//             const response = await axios.post(endpoint, data, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
//             console.log(response.data.message);
//         } catch (error) {
//             console.error('Error submitting data:', error);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await submitData(accountInfo, '/account-info');
//         await submitData(personalInfo, '/personal-info');
//         await submitData(menstrualCycleData, '/menstrual-cycle-data');
//         await submitData(moodData, '/mood-data');
//         await submitData(behaviors, '/behaviors');
//         alert('Survey submitted successfully');
//     };

//     return (
//         <div className="survey-container">
//             <div className="survey-box">
//                 <div className="progress-bar">
//                     <div className="progress" style={{ width: `${(step / 5) * 100}%` }}></div>
//                 </div>
//                 {step === 1 && (
//                     <SurveyStep 
//                         data={accountInfo} 
//                         handleChange={handleDataChange(setAccountInfo)} 
//                         handleNextStep={handleNextStep} 
//                         title="Account Info"
//                     />
//                 )}
//                 {step === 2 && (
//                     <SurveyStep 
//                         data={personalInfo} 
//                         handleChange={handleDataChange(setPersonalInfo)} 
//                         handleMultiSelectChange={handleMultiSelectChange(setPersonalInfo)}
//                         handleNextStep={handleNextStep} 
//                         handlePreviousStep={handlePreviousStep} 
//                         title="Personal Info"
//                     />
//                 )}
//                 {step === 3 && (
//                     <SurveyStep 
//                         data={menstrualCycleData} 
//                         handleChange={handleDataChange(setMenstrualCycleData)} 
//                         handleMultiSelectChange={handleMultiSelectChange(setMenstrualCycleData)}
//                         handleNextStep={handleNextStep} 
//                         handlePreviousStep={handlePreviousStep} 
//                         title="Menstrual Cycle Data"
//                     />
//                 )}
//                 {step === 4 && (
//                     <SurveyStep 
//                         data={moodData} 
//                         handleChange={handleDataChange(setMoodData)} 
//                         handleMultiSelectChange={handleMultiSelectChange(setMoodData)}
//                         handleNextStep={handleNextStep} 
//                         handlePreviousStep={handlePreviousStep} 
//                         title="Mood Data"
//                     />
//                 )}
//                 {step === 5 && (
//                     <SurveyStep 
//                         data={behaviors} 
//                         handleChange={handleDataChange(setBehaviors)} 
//                         handleMultiSelectChange={handleMultiSelectChange(setBehaviors)}
//                         handleSubmit={handleSubmit} 
//                         handlePreviousStep={handlePreviousStep} 
//                         title="Behaviors"
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Survey;



import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import AuthContext from '../context/AuthContext';
import SurveyStep from './SurveyStep';
import AccountInfo from './OnboardingSteps/AccountInfo';
import PersonalInfo from './OnboardingSteps/PersonalInfo';
import MenstrualCycleData from './OnboardingSteps/MenstrualCycleData';
import MoodData from './OnboardingSteps/MoodData'
import Behaviors from './OnboardingSteps/Behaviors'
import './Survey.css';

const Survey = () => {
    const { user, loading, token } = useContext(AuthContext);
    const [currentStep, setCurrentStep] = useState(1);
    const [accountInfo, setAccountInfo] = useState({
        app_purpose: '',
        why_tracking: '',
        wearable_device: '',
        notification_type: '',
        notification_period: ''
    });
    const [personalInfo, setPersonalInfo] = useState({
        DOB: '',
        gender: '',
        location: { city: '', state: '', country: '' },
        marital: '',
        birth_control: '',
        regularity: '',
        last_period_date: '',
        cycle_length_avg_est: '',
        period_length_avg_est: '',
        menstrual_pain: ''
    });
    const [menstrualCycleData, setMenstrualCycleData] = useState({});
    const [moodData, setMoodData] = useState({});
    const [behaviors, setBehaviors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkSurveyAccess = async () => {
            if (loading) return;
            if (!user) navigate('/');

            try {
                await axiosInstance.get('/surveys/account-info', {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    navigate('/dashboard');
                } else {
                    console.error("Error accessing survey:", error);
                }
            }
        };

        checkSurveyAccess();
    }, [user, loading, navigate, token]);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleDataChange = (setter) => (e) => {
        setter(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleMultiSelectChange = (selectedOptions, fieldName, setter) => {
      setter(prevState => ({
          ...prevState,
          [fieldName]: selectedOptions ? selectedOptions.map(option => option.value) : []
      }));
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/surveys/account-info', accountInfo, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await axiosInstance.post('/surveys/personal-info', personalInfo, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await axiosInstance.post('/surveys/menstrual-cycle-data', menstrualCycleData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await axiosInstance.post('/surveys/mood-data', moodData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await axiosInstance.post('/surveys/behaviors', behaviors, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Survey submitted successfully');
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (error) {
            setMessage('Survey submission failed: ' + (error.response?.data?.message || error.message));
            console.error('Error submitting survey:', error); 
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <SurveyStep
                        step={currentStep}
                        title="Account Information"
                        onBack={handlePreviousStep}
                        onNext={handleNextStep}
                        handleChange={handleDataChange(setAccountInfo)}
                        data={accountInfo}
                        Component={AccountInfo}
                    />
                );
            case 2:
                return (
                    <SurveyStep
                        step={currentStep}
                        title="Personal Information"
                        onBack={handlePreviousStep}
                        onNext={handleNextStep}
                        handleChange={handleDataChange(setPersonalInfo)}
                        data={personalInfo}
                        Component={PersonalInfo}
                    />
                );
            case 3:
                return (
                    <SurveyStep
                        step={currentStep}
                        title="Menstrual Cycle Data"
                        onBack={handlePreviousStep}
                        onNext={handleNextStep}
                        handleChange={handleDataChange(setMenstrualCycleData)}
                        handleMultiSelectChange={(selectedOptions, fieldName) => handleMultiSelectChange(selectedOptions, fieldName, setMenstrualCycleData)}
                        data={menstrualCycleData}
                        Component={MenstrualCycleData}
                    />
                );
            case 4:
                return (
                    <SurveyStep
                        step={currentStep}
                        title="Mood Data"
                        onBack={handlePreviousStep}
                        onNext={handleNextStep}
                        handleChange={handleDataChange(setMoodData)}
                        handleMultiSelectChange={(selectedOptions, fieldName) => handleMultiSelectChange(selectedOptions, fieldName, setMoodData)}
                        data={moodData}
                        Component={MoodData}
                    />
                );
            case 5:
                return (
                    <SurveyStep
                        step={currentStep}
                        title="Behavior Data"
                        onBack={handlePreviousStep}
                        onNext={handleNextStep}
                        handleChange={handleDataChange(setBehaviors)}
                        handleMultiSelectChange={(selectedOptions, fieldName) => handleMultiSelectChange(selectedOptions, fieldName, setBehaviors)}
                        data={behaviors}
                        Component={Behaviors}
                        isLastStep={true}
                        handleSubmit={handleSubmit}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="survey-container">
            <div className="survey-box">
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${(currentStep / 5) * 100}%` }}></div>
                </div>
                {renderStep()}
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default Survey;



