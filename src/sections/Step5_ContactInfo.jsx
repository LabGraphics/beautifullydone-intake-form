import React, { useState } from 'react';
import StepTransition from '../components/StepTransition';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StepContainer from '../components/StepContainer';
import FormField from '../components/FormField';
import NavigationButtons from '../components/NavigationButtons';
import { useFormStore } from '../store/formStore';
import { isRequired, isEmail } from '../components/ValidationHelpers';

export default function Step5_ContactInfo() {
  const navigate = useNavigate();
  const { contactName, contactEmail, updateField } = useFormStore();
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const newErrors = {};
    if (!isRequired(contactName)) newErrors.contactName = 'Contact Name is required';
    if (!isRequired(contactEmail)) {
      newErrors.contactEmail = 'Contact Email is required';
    } else if (!isEmail(contactEmail)) {
      newErrors.contactEmail = 'Please provide a valid email address';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    navigate('/step6');
  };

  return (
    <StepTransition stepKey="step7">
      <StepContainer>
      <div className="mb-8 sm:mb-10 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0A1A2F]">Contact Information</h2>
        <p className="bd-helper-text mt-2 text-center text-lg">How can we reach you to discuss your event?</p>
      </div>
      <div className="space-y-4 sm:space-y-5 md:space-y-6 w-full flex flex-col items-center">
        <FormField 
          label="Contact Name" 
          value={contactName} 
          onChange={(e) => updateField('contactName', e.target.value)} 
          placeholder="Your Full Name" 
          error={errors.contactName}
        />
        <FormField 
          label="Contact Email" 
          type="email"
          value={contactEmail} 
          onChange={(e) => updateField('contactEmail', e.target.value)} 
          placeholder="hello@example.com" 
          error={errors.contactEmail}
        />
      </div>
      <NavigationButtons onBack={() => navigate('/step4')} onNext={handleNext} />
    </StepContainer>
    </StepTransition>
  );
}
