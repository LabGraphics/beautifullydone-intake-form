import React from 'react';
import { motion } from 'framer-motion';

export default function FormField({ label, type = 'text', value, onChange, placeholder, error, isTextArea = false }) {
  const baseClasses = `bd-input ${error ? 'error' : ''}`;
  
  return (
    <div className="flex flex-col w-full text-left">
      {label && <label className="bd-label">{label}</label>}
      {isTextArea ? (
        <motion.textarea whileFocus={{ scale: 1.01 }} transition={{ duration: 0.15, ease: "easeOut" }} value={value} onChange={onChange} placeholder={placeholder} className={`${baseClasses} min-h-[140px] resize-y`} />
      ) : (
        <motion.input whileFocus={{ scale: 1.01 }} transition={{ duration: 0.15, ease: "easeOut" }} type={type} value={value} onChange={onChange} placeholder={placeholder} className={baseClasses} />
      )}
    </div>
  );
}
