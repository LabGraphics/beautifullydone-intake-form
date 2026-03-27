import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepContainer from '../components/StepContainer';
import FormField from '../components/FormField';
import SelectField from '../components/SelectField';
import NavigationButtons from '../components/NavigationButtons';
import useIntakeStore from '../data/useIntakeStore';
import { isRequired, isEmail } from '../components/ValidationHelpers';

export default function Step7_ContactInfo() {
  const navigate = useNavigate();
  const { contactName, contactEmail, phoneNumber, preferredContact, updateField } = useIntakeStore();
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const newErrors = {};
    if (!isRequired(contactName)) newErrors.contactName = 'Full Name is required';
    if (!isRequired(contactEmail) || !isEmail(contactEmail)) newErrors.contactEmail = 'Valid email is required';
    if (!isRequired(phoneNumber)) newErrors.phoneNumber = 'Phone Number is required';
    if (!isRequired(preferredContact)) newErrors.preferredContact = 'Preferred Contact Method is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    navigate('/step8');
  };

  const CONTACT_METHODS = ['Text', 'Email', 'Phone Call'];

  return (
    <StepContainer>
      <div className="mb-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0D1B2A]">Contact Information</h2>
        <p className="mt-2 text-gray-500 text-lg sm:text-xl">How can we reach you to discuss your event?</p>
      </div>
      <div className="space-y-4 sm:space-y-5 w-full flex flex-col items-center">
        <FormField 
          label="Full Name" 
          value={contactName} 
          onChange={(e) => updateField('contactName', e.target.value)} 
          placeholder="First Last" 
          error={errors.contactName} 
        />
        <FormField 
          label="Email Address" 
          type="email" 
          value={contactEmail} 
          onChange={(e) => updateField('contactEmail', e.target.value)} 
          placeholder="hello@example.com" 
          error={errors.contactEmail} 
        />
        <FormField 
          label="Phone Number" 
          type="tel" 
          value={phoneNumber} 
          onChange={(e) => updateField('phoneNumber', e.target.value)} 
          placeholder="(123) 456-7890" 
          error={errors.phoneNumber} 
        />
        <SelectField 
          label="Preferred Contact Method" 
          value={preferredContact} 
          onChange={(e) => updateField('preferredContact', e.target.value)} 
          options={CONTACT_METHODS} 
          error={errors.preferredContact} 
        />
      </div>
      <NavigationButtons onBack={() => navigate('/step6')} onNext={handleNext} />
    </StepContainer>
  );
}
