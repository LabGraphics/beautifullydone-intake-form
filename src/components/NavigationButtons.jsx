import React from 'react';

export default function NavigationButtons({ onBack, onNext, showBack = true, nextLabel = 'Next' }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between mt-8 space-y-4 space-y-reverse sm:space-y-0 gap-4 sm:max-w-[500px] sm:mx-auto md:max-w-[550px] w-full">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto px-6 md:px-8 py-3 font-medium text-[#E8A6B8] bg-transparent border-2 border-[#E8A6B8] rounded-lg hover:bg-[#E8A6B8] hover:text-[#0D1B2A] transition-all duration-300"
        >
          Back
        </button>
      ) : (
        <div className="hidden sm:block" /> 
      )}
      <button
        type="button"
        onClick={onNext}
        className="w-full sm:w-auto px-6 md:px-8 py-3 font-semibold text-[#0D1B2A] bg-[#E8A6B8] rounded-lg hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        {nextLabel}
      </button>
    </div>
  );
}
