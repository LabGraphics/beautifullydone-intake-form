import ContactFooter from '../components/ContactFooter';
import React, { useState } from 'react';
import StepTransition from '../components/StepTransition';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StepContainer from '../components/StepContainer';
import RadioGroup from '../components/RadioGroup';
import CheckboxGroup from '../components/CheckboxGroup';
import NavigationButtons from '../components/NavigationButtons';
import { useFormStore } from '../store/formStore';
import { validateStep4 } from '../utils/validation';

export default function Step4_Rentals() {
  const navigate = useNavigate();
  const { needsRentals, rentalsList, updateField } = useFormStore();
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
    const { isValid, errors: reqErrors, softWarnings: reqSoft } = validateStep4(formData);
    
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

    navigate('/step5');
  };

  const RENTALS = [
    'Chairs', 'Tables', 'Table linens', 'Napkins', 'Chargers', 'Centerpieces',
    'Backdrops', 'Balloon décor', 'Cake stands', 'Dessert display items',
    'Signage', 'Props', 'Kids table setups', 'Throne chairs', 'Flower walls',
    'Other (Please specify in final notes)'
  ];

  return (
    <StepTransition stepKey="step5">
      <div className="bd-section max-w-[600px] mx-auto px-6 space-y-6">
        <h2>Rentals</h2>
        <p className="bd-helper-text text-lg">Do you need rentals for your event?</p>
        <div className="space-y-6">
        <div>
      <RadioGroup
          options={['Yes', 'No']}
          selectedValue={needsRentals}
          onChange={(val) => {
            handleChange('needsRentals', val); if (val === 'No') handleChange('rentalsList', []);
          }}
          
        />
      {errors.needsRentals && <p className="bd-error-text">{errors.needsRentals}</p>}
      {softWarnings.needsRentals && <p className="bd-warning-text">{softWarnings.needsRentals}</p>}
    </div>
        {needsRentals === 'Yes' && (
          <div className="w-full animate-fade-in">
            <motion.div className="bd-divider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}></motion.div>
            <label className="font-medium text-[#0D1B2A] text-base sm:text-lg mb-3 block sm:max-w-[500px] sm:mx-auto md:max-w-[550px]">Select all that apply:</label>
            <div>
      <CheckboxGroup
              options={RENTALS}
              selectedValues={rentalsList}
              onChange={(vals) => handleChange('rentalsList', vals)}
              
            />
      {errors.rentalsList && <p className="bd-error-text">{errors.rentalsList}</p>}
      {softWarnings.rentalsList && <p className="bd-warning-text">{softWarnings.rentalsList}</p>}
    </div>
          </div>
        )}
      </div>
      <NavigationButtons onBack={() => navigate('/step3')} onNext={handleNext} className="mt-10" />
      <ContactFooter className="mt-10 mb-6" />
      </div>
    </StepTransition>
  );
}
