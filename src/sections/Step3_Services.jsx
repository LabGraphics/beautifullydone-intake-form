import React, { useState } from 'react';
import StepTransition from '../components/StepTransition';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StepContainer from '../components/StepContainer';
import CheckboxGroup from '../components/CheckboxGroup';
import NavigationButtons from '../components/NavigationButtons';
import { useFormStore } from '../store/formStore';
import { validateStep3 } from '../utils/validation';

export default function Step3_Services() {
  const navigate = useNavigate();
  const { servicesNeeded, updateField } = useFormStore(); 
  const [errors, setErrors] = useState({});
  const [softWarnings, setSoftWarnings] = useState({});
  const [softBlockShown, setSoftBlockShown] = useState(false);
  
  

  const handleChange = (field, value) => {
    updateField(field, value);
    setErrors(prev => ({ ...prev, [field]: undefined }));
    setSoftWarnings(prev => ({ ...prev, [field]: undefined }));
  };

  const handleNext = () => {
    const formData = useFormStore.getState();
    const { isValid, errors: reqErrors, softWarnings: reqSoft } = validateStep3(formData);
    
    if (!isValid || Object.keys(reqErrors).length > 0) {
      setErrors(reqErrors);
      setTimeout(() => {
        const errorEl = document.querySelector('.bd-error-text');
        if (errorEl) errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }

    if (Object.keys(reqSoft).length > 0 && !softBlockShown) {
      setSoftWarnings(reqSoft);
      setSoftBlockShown(true);
      setTimeout(() => {
        const softEl = document.querySelector('.bd-warning-text');
        if (softEl) softEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }

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
    <StepTransition stepKey="step4">
      <StepContainer>
      <div className="mb-8 sm:mb-10 text-center">
        <h2>Services Needed</h2>
        <p className="bd-helper-text mt-2 text-center text-lg">Which services would you like Beautifully Done to provide?</p>
      </div>
      <div className="w-full flex flex-col items-center">
        <div>
      <CheckboxGroup
          label=""
          options={SERVICES}
          selectedValues={servicesNeeded}
          onChange={(vals) => handleChange('servicesNeeded', vals)}
          
        />
      {errors.servicesNeeded && <p className="bd-error-text">{errors.servicesNeeded}</p>}
      {softWarnings.servicesNeeded && <p className="bd-warning-text">{softWarnings.servicesNeeded}</p>}
    </div>
      </div>
      <NavigationButtons onBack={() => navigate('/step2')} onNext={handleNext} />
    </StepContainer>
    </StepTransition>
  );
}
