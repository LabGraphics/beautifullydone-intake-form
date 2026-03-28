import React from 'react';

export default function ProgressBar({ currentStep }) {
  const stepNumber = currentStep || 1;
  const progressPercent = (stepNumber / 9) * 100;

  return (
    <div className="bd-progress">
      <div className="bd-progress-top">
        <span className="bd-progress-label">Step {stepNumber} of 9</span>
      </div>
      <div className="bd-progress-track">
        <div 
          className="bd-progress-fill" 
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
