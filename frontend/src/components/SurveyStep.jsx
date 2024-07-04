// components/SurveyStep.jsx
import React from 'react';
import "./Survey.css"

const SurveyStep = ({ step, title, children, onBack, onNext, isLastStep }) => {
  return (
    <div className="survey-step">
      <h2>{title}</h2>
      {children}
      <div className="button-group">
        {step > 1 && <button onClick={onBack}>Back</button>}
        <button onClick={onNext}>{isLastStep ? 'Finish' : 'Next'}</button>
      </div>
    </div>
  );
};

export default SurveyStep;
