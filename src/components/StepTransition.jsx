import React from 'react';
import { motion } from 'framer-motion';

const stepVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.22, ease: 'easeIn' } }
};

export default function StepTransition({ children }) {
  return (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full flex flex-col items-center"
    >
      {children}
    </motion.div>
  );
}
