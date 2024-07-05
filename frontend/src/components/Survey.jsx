// components/Survey.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import AuthContext from '../context/AuthContext';
import SurveyStep from './SurveyStep';
import './Survey.css';

const Survey = () => {
  const { user, loading, token } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [surveyData, setSurveyData] = useState({
    age: '',
    gender: '',
    location: '',
    phone: '',
    lastMenstrualPeriod: '',
    averageCycleLength: '',
    cycleRegularity: '',
    painfulDays: '',
    height: '',
    weight: '',
    activityLevel: '',
    healthConditions: '',
    preferences: '',
    notificationFrequency: '',
    notificationSystem: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (loading) return;
  //   if (!user) navigate('/');
  // }, [user, loading, navigate]);

  useEffect(() => {
    const checkSurveyAccess = async () => {
      if (loading) return;
      if (!user) navigate('/');

      try {
        await axiosInstance.get('/surveys', {
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

  const handleChange = (e) => {
    setSurveyData({
      ...surveyData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post('/surveys/submit', { userId: user.uid, ...surveyData }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Survey submitted successfully');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setMessage('Survey submission failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SurveyStep step={currentStep} title="Demographic Information" onBack={handleBack} onNext={handleNext}>
            <input type="number" name="age" placeholder='Age' value={surveyData.age} onChange={handleChange} required />
            <input type="text" name="gender" placeholder='Gender' value={surveyData.gender} onChange={handleChange} required />
            <input type="text" name="location" placeholder='Location' value={surveyData.location} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder='Phone' value={surveyData.phone} onChange={handleChange} required />
          </SurveyStep>
        );
      case 2:
        return (
          <SurveyStep step={currentStep} title="Menstrual Information" onBack={handleBack} onNext={handleNext}>
            <label>Last Menstrual Period</label>
            <input type="date" name="lastMenstrualPeriod" value={surveyData.lastMenstrualPeriod} onChange={handleChange} required />
            <input type="number" name="averageCycleLength" placeholder='Average Cycle Length (days)' value={surveyData.averageCycleLength} onChange={handleChange} required />
            <input type="text" name="cycleRegularity" placeholder='Cycle Regularity' value={surveyData.cycleRegularity} onChange={handleChange} required />
            <input type="text" name="painfulDays" placeholder='Painful Days (comma separated)' value={surveyData.painfulDays} onChange={handleChange} required />
          </SurveyStep>
        );
      case 3:
        return (
          <SurveyStep step={currentStep} title="Health Information" onBack={handleBack} onNext={handleNext}>
            <input type="text" name="height" placeholder='Height' value={surveyData.height} onChange={handleChange} required />
            <input type="text" name="weight" placeholder='Weight' value={surveyData.weight} onChange={handleChange} required />
            <input type="text" name="activityLevel" placeholder='Activity Level' value={surveyData.activityLevel} onChange={handleChange} required />
            <input type="text" name="healthConditions" placeholder='Health Conditions (comma separated)' value={surveyData.healthConditions} onChange={handleChange} required />
          </SurveyStep>
        );
      case 4:
        return (
          <SurveyStep step={currentStep} title="Preferences" onBack={handleBack} onNext={handleNext}>
            <input type="text" name="preferences" placeholder='Preferences (comma separated)' value={surveyData.preferences} onChange={handleChange} required />
          </SurveyStep>
        );
      case 5:
        return (
          <SurveyStep step={currentStep} title="Notification Settings" onBack={handleBack} onNext={handleNext} isLastStep={true}>
            <input type="text" name="notificationFrequency" placeholder='Notification Frequency' value={surveyData.notificationFrequency} onChange={handleChange} required />
            <input type="text" name="notificationSystem" placeholder='Notification System (comma separated)' value={surveyData.notificationSystem} onChange={handleChange} required />
          </SurveyStep>
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

