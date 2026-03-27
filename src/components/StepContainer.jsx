import React from 'react';

export default function StepContainer({ children, className = '' }) {
  return (
    <div className={`w-full max-w-[600px] mx-auto px-4 py-6 sm:max-w-[640px] sm:px-6 md:max-w-[700px] md:px-8 md:py-10 lg:max-w-[800px] lg:px-10 xl:max-w-[900px] bg-white rounded-xl shadow-sm border border-gray-100 animate-fade-in ${className}`}>
      {children}
    </div>
  );
}
