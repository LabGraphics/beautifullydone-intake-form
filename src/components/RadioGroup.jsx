import React from 'react';
import { motion } from 'framer-motion';

export default function RadioGroup({ label, options, selectedValue, onChange, error }) {
  return (
    <div className="flex flex-col space-y-3 mb-6 w-full sm:max-w-[500px] sm:mx-auto md:max-w-[550px]">
      {label && <label className="bd-label">{label}</label>}
      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
        {options.map((opt, i) => (
          <label key={i} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              checked={selectedValue === opt}
              onChange={() => onChange(opt)}
              className="w-5 h-5 accent-[#E8A6B8] cursor-pointer"
            />
            <span className="text-[#0D1B2A] text-base sm:text-lg select-none">{opt}</span>
          </label>
        ))}
      </div>
      {error && <span className="text-red-500 text-xs md:text-sm mt-1">{error}</span>}
    </div>
  );
}
