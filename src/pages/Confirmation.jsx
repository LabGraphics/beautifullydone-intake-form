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
    <div className="bd-section max-w-[600px] mx-auto px-6 space-y-6 text-center text-[#0D1B2A]">
      <h2>Thank You!</h2>
      <p className="bd-helper-text text-lg">Your event details were submitted successfully.</p>
      <p>We will review your information and follow up shortly.</p>
      <button onClick={handleReturnHome} className="w-full sm:w-auto px-10 py-4 font-semibold text-[#0D1B2A] bg-[#E8A6B8] rounded-lg hover:scale-105 transition-all mt-10">
        Return to Home
      </button>
      <ContactFooter className="mt-10 mb-6" />
    </div>
  );
}
