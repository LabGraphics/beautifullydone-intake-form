import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepContainer from '../components/StepContainer';
import RadioGroup from '../components/RadioGroup';
import CheckboxGroup from '../components/CheckboxGroup';
import NavigationButtons from '../components/NavigationButtons';
import useIntakeStore from '../data/useIntakeStore';
import { isRequired } from '../components/ValidationHelpers';

export default function Step4_Rentals() {
  const navigate = useNavigate();
  const { needsRentals, rentalsList, updateField } = useIntakeStore();
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const newErrors = {};
    if (!isRequired(needsRentals)) {
      newErrors.needsRentals = 'Please indicate if you need rentals';
    } else if (needsRentals === 'Yes' && rentalsList.length === 0) {
      newErrors.rentalsList = 'Please select at least one rental item';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    navigate('/step5');
  };

  const RENTALS = [
    'Chairs', 'Tables', 'Table linens', 'Napkins', 'Chargers', 'Centerpieces',
    'Backdrops', 'Balloon décor', 'Cake stands', 'Dessert display items',
    'Signage', 'Props', 'Kids table setups', 'Throne chairs', 'Flower walls',
    'Other (Please specify in final notes)'
  ];

  return (
    <StepContainer>
      <div className="mb-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0D1B2A]">Rentals</h2>
        <p className="mt-2 text-gray-500 text-lg sm:text-xl">Do you need rentals for your event?</p>
      </div>
      <div className="space-y-4 sm:space-y-5 w-full flex flex-col items-center">
        <RadioGroup
          options={['Yes', 'No']}
          selectedValue={needsRentals}
          onChange={(val) => {
            updateField('needsRentals', val);
            if (val === 'No') updateField('rentalsList', []);
          }}
          error={errors.needsRentals}
        />
        {needsRentals === 'Yes' && (
          <div className="w-full animate-fade-in">
            <div className="bd-section-divider"></div>
            <label className="font-medium text-[#0D1B2A] text-base sm:text-lg mb-3 block sm:max-w-[500px] sm:mx-auto md:max-w-[550px]">Select all that apply:</label>
            <CheckboxGroup
              options={RENTALS}
              selectedValues={rentalsList}
              onChange={(vals) => updateField('rentalsList', vals)}
              error={errors.rentalsList}
            />
          </div>
        )}
      </div>
      <NavigationButtons onBack={() => navigate('/step3')} onNext={handleNext} />
    </StepContainer>
  );
}
