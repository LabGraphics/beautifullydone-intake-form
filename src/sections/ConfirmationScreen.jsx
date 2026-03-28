import ContactFooter from '../components/ContactFooter';
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StepContainer from '../components/StepContainer';

export default function ConfirmationScreen() {
  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto min-h-[60vh] flex items-center animate-fade-in px-4 sm:px-0">
      <StepContainer className="w-full mx-auto !p-8 md:!p-12 sm:max-w-[640px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px]">
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-[#E8A6B8]/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <svg className="w-10 h-10 text-[#E8A6B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2>Thank You!</h2>
          <p className="mb-10 max-w-md mx-auto text-gray-600 text-lg sm:text-xl">
            Your event details have been successfully submitted. We've sent a confirmation email, and our team will be in touch with you shortly.
          </p>
          <div className="flex justify-center w-full">
            <button
              onClick={() => navigate('/step1')}
              className="w-full sm:w-auto px-10 py-4 font-semibold text-[#0D1B2A] bg-[#E8A6B8] rounded-lg hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Start New Form
            </button>
          </div>
        </div>
      <ContactFooter />
      </StepContainer>
    </div>
  );
}
