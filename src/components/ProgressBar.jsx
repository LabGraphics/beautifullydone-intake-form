import React from 'react';

export default function ProgressBar({ currentStep }) {
  const steps = [1, 2, 3, 4, 5, 6, 7, 8];
  
  return (
    <div className="flex items-center justify-center space-x-2 md:space-x-4 py-6 md:py-8 mx-auto w-full max-w-[900px]">
      {steps.map((step) => {
        const isActive = step === currentStep;
        return (
          <div
            key={step}
            className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 transform ${
              isActive ? 'bg-[#E8A6B8] scale-100 sm:scale-110 md:scale-120 lg:scale-125 shadow-sm' : 'bg-[#E8A6B8] opacity-30 scale-100'
            }`}
          />
        );
      })}
    </div>
  );
}
