import React, { useState } from 'react';
import StepTransition from '../components/StepTransition';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StepContainer from '../components/StepContainer';
import NavigationButtons from '../components/NavigationButtons';
import { useFormStore } from '../store/formStore';
import { isRequired } from '../components/ValidationHelpers';

export default function Step4_Services() {
  const navigate = useNavigate();
  const { services, updateField } = useFormStore();
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    if (!isRequired(services)) {
      setErrors({ services: 'Please let us know what services you need' });
      return;
    }
    setErrors({});
    navigate('/step5');
  };

  return (
    <StepTransition stepKey="step6">
      <StepContainer>
      <div className="mb-8 sm:mb-10 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0A1A2F]">Services Needed</h2>
        <p className="bd-helper-text mt-2 text-center text-lg">Describe the services required for your event.</p>
      </div>
      <div className="space-y-4 sm:space-y-5 md:space-y-6 w-full flex flex-col items-center">
        <div className="flex flex-col space-y-2 mb-4 w-full sm:max-w-[500px] sm:mx-auto md:max-w-[550px]">
          <label className="font-medium text-[#0A1A2F] text-base sm:text-lg">Details of Services</label>
          <textarea
            value={services}
            onChange={(e) => updateField('services', e.target.value)}
            placeholder="e.g. Catering, Decorations, Photography..."
            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F7C6D0] transition-colors text-[#0A1A2F] text-base sm:text-lg min-h-[120px] ${
              errors.services ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-gray-300 focus:border-transparent'
            }`}
          />
          {errors.services && <span className="text-red-500 text-xs md:text-sm mt-1">{errors.services}</span>}
        </div>
      </div>
      <NavigationButtons onBack={() => navigate('/step3')} onNext={handleNext} />
    </StepContainer>
    </StepTransition>
  );
}
