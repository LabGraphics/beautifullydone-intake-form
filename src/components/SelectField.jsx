import React from 'react';

export default function SelectField({ label, value, onChange, options, error }) {
  return (
    <div className="flex flex-col space-y-2 mb-4 w-full sm:max-w-[500px] sm:mx-auto md:max-w-[550px]">
      {label && <label className="font-medium text-[#0D1B2A] text-base sm:text-lg">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#E8A6B8] transition-colors text-[#0D1B2A] text-base sm:text-lg bg-white ${
          error ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-gray-300 focus:border-transparent'
        }`}
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <span className="text-red-500 text-xs md:text-sm mt-1">{error}</span>}
    </div>
  );
}
