import React from 'react';

export default function FormField({ label, type = 'text', value, onChange, placeholder, error, isTextArea = false }) {
  const baseClasses = `w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#E8A6B8] transition-colors text-[#0D1B2A] text-base sm:text-lg ${
    error ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-gray-300 focus:border-transparent'
  }`;

  return (
    <div className="flex flex-col space-y-2 mb-4 w-full sm:max-w-[500px] sm:mx-auto md:max-w-[550px]">
      {label && <label className="font-medium text-[#0D1B2A] text-base sm:text-lg">{label}</label>}
      {isTextArea ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} className={`${baseClasses} min-h-[120px] resize-y`} />
      ) : (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={baseClasses} />
      )}
      {error && <span className="text-red-500 text-xs md:text-sm mt-1">{error}</span>}
    </div>
  );
}
