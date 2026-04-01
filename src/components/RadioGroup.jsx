import React from 'react';
import { motion } from 'framer-motion';

export default function RadioGroup({ label, options, selectedValue, onChange, error }) {
  const wrapperClasses = `bd-input flex flex-col text-left space-y-2 ${error ? 'error' : ''}`;

  return (
    <div className={wrapperClasses}>
      {label && <label className="bd-label m-0">{label}</label>}
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => (
          <label key={i} className="flex items-center space-x-3 cursor-pointer py-2 pr-2 rounded hover:bg-gray-50 transition-colors">
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
