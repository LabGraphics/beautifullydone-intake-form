import ContactFooter from '../components/ContactFooter';
import React, { useState } from 'react';
import StepTransition from '../components/StepTransition';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StepContainer from '../components/StepContainer';
import FormField from '../components/FormField';
import SelectField from '../components/SelectField';
import NavigationButtons from '../components/NavigationButtons';
import { useFormStore } from '../store/formStore';
import { validateStep7 } from '../utils/validation';

export default function Step7_ContactInfo() {
  const navigate = useNavigate();
  const { contactName, contactEmail, phoneNumber, preferredContact, updateField } = useFormStore();
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
    const { isValid, errors: reqErrors, softWarnings: reqSoft } = validateStep7(formData);
    
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

    navigate('/step8');
  };

  const CONTACT_METHODS = ['Text', 'Email', 'Phone Call'];

  return (
    <StepTransition stepKey="step10">
      <StepContainer>
      <div className="mb-8 sm:mb-10 text-center">
        <h2>Contact Information</h2>
        <p className="bd-helper-text mt-2 text-center text-lg">How can we reach you to discuss your event?</p>
      </div>
      <div className="space-y-4 sm:space-y-5 w-full flex flex-col items-center">
        <div>
      <FormField 
          label="Full Name" 
          value={contactName} 
          onChange={(e) => handleChange('contactName', e.target.value)} 
          placeholder="First Last" 
           
        />
      {errors.contactName && <p className="bd-error-text">{errors.contactName}</p>}
      {softWarnings.contactName && <p className="bd-warning-text">{softWarnings.contactName}</p>}
    </div>
        <div>
      <FormField 
          label="Email Address" 
          type="email" 
          value={contactEmail} 
          onChange={(e) => handleChange('contactEmail', e.target.value)} 
          placeholder="hello@example.com" 
           
        />
      {errors.contactEmail && <p className="bd-error-text">{errors.contactEmail}</p>}
      {softWarnings.contactEmail && <p className="bd-warning-text">{softWarnings.contactEmail}</p>}
    </div>
        <div>
      <FormField 
          label="Phone Number" 
          type="tel" 
          value={phoneNumber} 
          onChange={(e) => handleChange('phoneNumber', e.target.value)} 
          placeholder="(123) 456-7890" 
           
        />
      {errors.phoneNumber && <p className="bd-error-text">{errors.phoneNumber}</p>}
      {softWarnings.phoneNumber && <p className="bd-warning-text">{softWarnings.phoneNumber}</p>}
    </div>
        <div>
      <SelectField 
          label="Preferred Contact Method" 
          value={preferredContact} 
          onChange={(e) => handleChange('preferredContact', e.target.value)} 
          options={CONTACT_METHODS} 
           
        />
      {errors.preferredContact && <p className="bd-error-text">{errors.preferredContact}</p>}
      {softWarnings.preferredContact && <p className="bd-warning-text">{softWarnings.preferredContact}</p>}
    </div>
      </div>
      <NavigationButtons onBack={() => navigate('/step6')} onNext={handleNext} />
    <ContactFooter />
      </StepContainer>
    </StepTransition>
  );
}
