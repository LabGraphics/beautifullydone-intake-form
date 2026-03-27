import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepContainer from '../components/StepContainer';
import CheckboxGroup from '../components/CheckboxGroup';
import NavigationButtons from '../components/NavigationButtons';
import useIntakeStore from '../data/useIntakeStore';

export default function Step3_Services() {
  const navigate = useNavigate();
  const { servicesNeeded, updateField } = useIntakeStore();
  const [error, setError] = useState('');

  const handleNext = () => {
    if (servicesNeeded.length === 0) {
      setError('Please select at least one service');
      return;
    }
    setError('');
    navigate('/step4');
  };

  const SERVICES = [
    'Help plan my event',
    'Help decorate my event',
    'Full event styling & design',
    'Table styling / tablescapes',
    'Backdrops & balloon décor',
    'Centerpieces & floral styling',
    'Dessert table styling',
    'Kids party styling',
    'Setup only',
    'Breakdown only',
    'Delivery & pickup',
    'Other (Please specify in final notes)'
  ];

  return (
    <StepContainer>
      <div className="mb-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0D1B2A]">Services Needed</h2>
        <p className="mt-2 text-gray-500 text-lg sm:text-xl">Which services would you like Beautifully Done to provide?</p>
      </div>
      <div className="w-full flex flex-col items-center">
        <CheckboxGroup
          label=""
          options={SERVICES}
          selectedValues={servicesNeeded}
          onChange={(vals) => updateField('servicesNeeded', vals)}
          error={error}
        />
      </div>
      <NavigationButtons onBack={() => navigate('/step2')} onNext={handleNext} />
    </StepContainer>
  );
}
