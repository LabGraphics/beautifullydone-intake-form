import React from 'react';
import { motion } from 'framer-motion';

export default function SelectField({ label, value, onChange, options, error }) {
  const wrapperClasses = `bd-input flex flex-col text-left space-y-2 ${error ? 'error' : ''}`;
  const inputClasses = `w-full bg-transparent outline-none focus:ring-0 border-none p-0 text-gray-800 text-[16px] cursor-pointer`;
  
  return (
    <div className={wrapperClasses}>
      {label && <label className="bd-label m-0">{label}</label>}
      <motion.select whileFocus={{ scale: 1.01 }} transition={{ duration: 0.15, ease: "easeOut" }} value={value} onChange={onChange} className={inputClasses}>
        <option value="" disabled>Select an option</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </motion.select>
    </div>
  );
}
