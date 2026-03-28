import React from 'react';
import { motion } from 'framer-motion';

export default function NavigationButtons({ onBack, onNext, showBack = true, nextLabel = 'Next' }) {
  return (
    <div className="flex flex-row items-center justify-between mt-10 mb-8 gap-4 sm:max-w-[500px] sm:mx-auto md:max-w-[550px] w-full">
      {showBack ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onBack}
          className="flex-1 px-4 sm:px-8 py-3.5 font-sans font-semibold text-brand-blush-dark bg-transparent border-2 border-brand-blush-dark rounded-lg hover:bg-brand-blush-dark hover:text-brand-navy transition-colors duration-300"
        >
          Back
        </motion.button>
      ) : (
        <div className="hidden sm:block" /> 
      )}
      <motion.button
        whileHover={{ scale: 1.02, backgroundColor: '#dca0b1' }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={onNext}
        className="flex-1 px-4 sm:px-8 py-3.5 font-sans font-semibold text-brand-navy bg-brand-blush-dark rounded-lg shadow-md hover:shadow-lg transition-colors duration-300"
      >
        {nextLabel}
      </motion.button>
    </div>
  );
}
