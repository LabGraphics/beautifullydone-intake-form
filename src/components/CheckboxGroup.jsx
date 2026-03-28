import React from 'react';
import { motion } from 'framer-motion';

export default function CheckboxGroup({ label, options, selectedValues, onChange, error }) {
  const toggleOption = (option) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter(v => v !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  return (
    <div className="flex flex-col space-y-3 mb-6 w-full sm:max-w-[500px] sm:mx-auto md:max-w-[550px]">
      {label && <label className="bd-label">{label}</label>}
      <div className="space-y-2">
        {options.map((opt, i) => (
          <label key={i} className="flex items-start space-x-3 cursor-pointer group p-2 rounded hover:bg-gray-50 transition-colors">
            <motion.div whileTap={{ scale: 1.05 }} transition={{ duration: 0.18, ease: "easeOut" }} className="flex items-center h-6">
              <input
                type="checkbox"
                checked={selectedValues.includes(opt)}
                onChange={() => toggleOption(opt)}
                className="w-5 h-5 accent-[#E8A6B8] cursor-pointer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[#0D1B2A] text-base sm:text-lg select-none">{opt}</span>
            </div>
          </label>
        ))}
      </div>
      {error && <span className="text-red-500 text-xs md:text-sm mt-1">{error}</span>}
    </div>
  );
}
