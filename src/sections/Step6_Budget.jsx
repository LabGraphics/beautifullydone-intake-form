import ContactFooter from '../components/ContactFooter';
import React, { useState } from 'react';
import StepTransition from '../components/StepTransition';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StepContainer from '../components/StepContainer';
import SelectField from '../components/SelectField';
import RadioGroup from '../components/RadioGroup';
import NavigationButtons from '../components/NavigationButtons';
import { useFormStore } from '../store/formStore';
import { validateStep6 } from '../utils/validation';

export default function Step6_Budget() {
  const navigate = useNavigate();
  const { budget, openToRecommendations, updateField } = useFormStore();
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
    const { isValid, errors: reqErrors, softWarnings: reqSoft } = validateStep6(formData);
    
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

    navigate('/step7');
  };

  const BUDGETS = ['Under $500', '$500–$1,000', '$1,000–$2,000', '$2,000–$3,500', '$3,500–$5,000', '$5,000+'];

  return (
    <StepTransition stepKey="step9">
      <div className="bd-section max-w-[600px] mx-auto px-6 space-y-6">
        <h2>Budget</h2>
        <p className="bd-helper-text text-lg">Help us understand your preferred budget range.</p>
        <div className="space-y-6 w-full">
        <div>
      <SelectField 
          label="What is your estimated budget?" 
          value={budget} 
          onChange={(e) => handleChange('budget', e.target.value)} 
          options={BUDGETS} 
           
        />
      {errors.budget && <p className="bd-error-text">{errors.budget}</p>}
      {softWarnings.budget && <p className="bd-warning-text">{softWarnings.budget}</p>}
    </div>
        <div>
      <RadioGroup 
          label="Are you open to recommendations that fit your budget?" 
          options={['Yes', 'No']} 
          selectedValue={openToRecommendations} 
          onChange={(val) => handleChange('openToRecommendations', val)} 
           
        />
      {errors.openToRecommendations && <p className="bd-error-text">{errors.openToRecommendations}</p>}
      {softWarnings.openToRecommendations && <p className="bd-warning-text">{softWarnings.openToRecommendations}</p>}
    </div>
      </div>
      <NavigationButtons onBack={() => navigate('/step5')} onNext={handleNext} className="mt-10" />
      <ContactFooter className="mt-10 mb-6" />
      </div>
    </StepTransition>
  );
}
