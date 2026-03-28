import React, { useState } from 'react';
import StepTransition from '../components/StepTransition';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StepContainer from '../components/StepContainer';
import FormField from '../components/FormField';
import NavigationButtons from '../components/NavigationButtons';
import { useFormStore } from '../store/formStore';
import { isRequired, isNumber } from '../components/ValidationHelpers';

export default function Step3_GuestCount() {
  const navigate = useNavigate();
  const { guestCount, updateField } = useFormStore();
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const newErrors = {};
    if (!isRequired(guestCount)) {
      newErrors.guestCount = 'Guest count is required';
    } else if (!isNumber(guestCount)) {
      newErrors.guestCount = 'Please enter a valid number';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    navigate('/step4');
  };

  return (
    <StepTransition stepKey="step3">
      <StepContainer>
      <div className="mb-8 sm:mb-10 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0A1A2F]">Guest Count</h2>
        <p className="bd-helper-text mt-2 text-center text-lg">How many guests represent your expected size?</p>
      </div>
      <div className="space-y-4 sm:space-y-5 md:space-y-6 w-full flex flex-col items-center">
        <FormField 
          label="Estimated Number of Guests" 
          type="number"
          value={guestCount} 
          onChange={(e) => updateField('guestCount', e.target.value)} 
          placeholder="e.g. 50" 
          error={errors.guestCount}
        />
      </div>
      <NavigationButtons onBack={() => navigate('/step2')} onNext={handleNext} />
    </StepContainer>
    </StepTransition>
  );
}
