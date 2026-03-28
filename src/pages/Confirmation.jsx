import ContactFooter from '../components/ContactFooter';
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../store/formStore';

export default function Confirmation() {
  const navigate = useNavigate();
  const resetForm = useFormStore((state) => state.resetForm);

  const handleReturnHome = () => {
    resetForm();
    navigate('/');
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease: "easeOut" }} className="confirmation-container">
      <h1>Thank You!</h1>
      <p className="subtitle">Your event details were submitted successfully.</p>
      <p>We will review your information and follow up shortly.</p>
      
      <button className="submit-button w-full mt-6" onClick={handleReturnHome}>
        Return to Home
      </button>
    </motion.div>
  );
}
