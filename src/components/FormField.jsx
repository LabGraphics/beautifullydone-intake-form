import React from 'react';
import { motion } from 'framer-motion';

export default function FormField({ label, type = 'text', value, onChange, placeholder, error, isTextArea = false }) {
  const wrapperClasses = `bd-input flex flex-col text-left space-y-2 ${error ? 'error' : ''}`;
  const inputClasses = `w-full bg-transparent outline-none focus:ring-0 border-none p-0 text-gray-800 text-[16px]`;
  
  return (
    <div className={wrapperClasses}>
      {label && <label className="bd-label m-0">{label}</label>}
      {isTextArea ? (
        <motion.textarea whileFocus={{ scale: 1.01 }} transition={{ duration: 0.15, ease: "easeOut" }} value={value} onChange={onChange} placeholder={placeholder} className={`${inputClasses} min-h-[140px] resize-y`} />
      ) : (
        <motion.input whileFocus={{ scale: 1.01 }} transition={{ duration: 0.15, ease: "easeOut" }} type={type} value={value} onChange={onChange} placeholder={placeholder} className={inputClasses} />
      )}
    </div>
  );
}
