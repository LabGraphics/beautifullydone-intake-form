import React from 'react';
import { motion } from 'framer-motion';

export default function SelectField({ label, value, onChange, options, error }) {
  const baseClasses = `bd-input ${error ? 'error' : ''}`;
  return (
    <div className="flex flex-col mb-6 w-full sm:max-w-[500px] sm:mx-auto md:max-w-[550px]">
      {label && <label className="bd-label">{label}</label>}
      <motion.select whileFocus={{ scale: 1.01 }} transition={{ duration: 0.15, ease: "easeOut" }} value={value} onChange={onChange} className={baseClasses}>
        <option value="" disabled>Select an option</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </motion.select>
    </div>
  );
}
