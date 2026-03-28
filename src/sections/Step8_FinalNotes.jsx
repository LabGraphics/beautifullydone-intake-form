import React, { useState } from 'react';
import ContactFooter from '../components/ContactFooter';
import StepTransition from '../components/StepTransition';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StepContainer from '../components/StepContainer';
import FormField from '../components/FormField';
import NavigationButtons from '../components/NavigationButtons';
import { useFormStore } from '../store/formStore';
import { validateStep8 } from '../utils/validation';

export default function Step8_FinalNotes() {
  const navigate = useNavigate();
  const { finalNotes, updateField } = useFormStore(); 
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
    const { isValid, errors: reqErrors, softWarnings: reqSoft } = validateStep8(formData);
    
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

    navigate('/summary');
  };

  return (
    <StepTransition stepKey="step11">
      <div className="bd-section max-w-[600px] mx-auto px-6 space-y-6">
        <h2>Final Notes</h2>
        <p className="bd-helper-text text-lg">Almost done! Any last details?</p>
        <div className="space-y-6 w-full">
        <div>
      <FormField 
          label="Is there anything else you’d like us to know about your event?" 
          isTextArea 
          value={finalNotes} 
          onChange={(e) => handleChange('finalNotes', e.target.value)} 
          placeholder="Special requests, themes, accessibility needs..." 
        />
      {errors.finalNotes && <p className="bd-error-text">{errors.finalNotes}</p>}
      {softWarnings.finalNotes && <p className="bd-warning-text">{softWarnings.finalNotes}</p>}
    </div>
      </div>
      <NavigationButtons onBack={() => navigate('/step7')} onNext={handleNext} nextLabel="Review & Submit" className="mt-10" />
      <ContactFooter className="mt-10 mb-6" />
      </div>
    </StepTransition>
  );
}
