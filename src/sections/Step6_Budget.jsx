import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepContainer from '../components/StepContainer';
import SelectField from '../components/SelectField';
import RadioGroup from '../components/RadioGroup';
import NavigationButtons from '../components/NavigationButtons';
import useIntakeStore from '../data/useIntakeStore';
import { isRequired } from '../components/ValidationHelpers';

export default function Step6_Budget() {
  const navigate = useNavigate();
  const { budget, openToRecommendations, updateField } = useIntakeStore();
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const newErrors = {};
    if (!isRequired(budget)) newErrors.budget = 'Budget is required';
    if (!isRequired(openToRecommendations)) newErrors.openToRecommendations = 'Please select Yes or No';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    navigate('/step7');
  };

  const BUDGETS = ['Under $500', '$500–$1,000', '$1,000–$2,000', '$2,000–$3,500', '$3,500–$5,000', '$5,000+'];

  return (
    <StepContainer>
      <div className="mb-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0D1B2A]">Budget</h2>
        <p className="mt-2 text-gray-500 text-lg sm:text-xl">Help us understand your preferred investment.</p>
      </div>
      <div className="space-y-4 sm:space-y-5 w-full flex flex-col items-center">
        <SelectField 
          label="What is your estimated budget?" 
          value={budget} 
          onChange={(e) => updateField('budget', e.target.value)} 
          options={BUDGETS} 
          error={errors.budget} 
        />
        <RadioGroup 
          label="Are you open to recommendations that fit your budget?" 
          options={['Yes', 'No']} 
          selectedValue={openToRecommendations} 
          onChange={(val) => updateField('openToRecommendations', val)} 
          error={errors.openToRecommendations} 
        />
      </div>
      <NavigationButtons onBack={() => navigate('/step5')} onNext={handleNext} />
    </StepContainer>
  );
}
