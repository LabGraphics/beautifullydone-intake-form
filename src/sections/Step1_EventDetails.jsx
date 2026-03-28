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
import { validateStep1 } from '../utils/validation';

export default function Step1_EventDetails() {
  const navigate = useNavigate();
  const { eventName, eventType, eventDate, guestCount, updateField } = useFormStore();
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
    const { isValid, errors: reqErrors, softWarnings: reqSoft } = validateStep1(formData);
    
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

    navigate('/step2');
  };

  const EVENT_TYPES = [
    'Birthday', 'Baby Shower', 'Bridal Shower', 'Wedding', 
    'Graduation', 'Corporate Event', 'Kids Party', 'Other'
  ];
  const GUEST_COUNTS = ['0–25', '25–50', '50–75', '75–100', '100–150', '150+'];

  return (
    <StepTransition stepKey="step1">
      <StepContainer>
      <div className="mb-8 sm:mb-10 text-center">
        <h2>Event Details</h2>
        <p className="bd-helper-text mt-2 text-center text-lg">Please provide the basic details for your event.</p>
      </div>
      <div className="space-y-4 sm:space-y-5 w-full flex flex-col items-center">
        <div>
      <FormField 
          label="Event Name" 
          value={eventName} 
          onChange={(e) => handleChange('eventName', e.target.value)} 
          placeholder="e.g. John's 30th Birthday" 
          
        />
      {errors.eventName && <p className="bd-error-text">{errors.eventName}</p>}
      {softWarnings.eventName && <p className="bd-warning-text">{softWarnings.eventName}</p>}
    </div>
        <div>
      <SelectField
          label="Event Type"
          value={eventType}
          onChange={(e) => handleChange('eventType', e.target.value)}
          options={EVENT_TYPES}
          
        />
      {errors.eventType && <p className="bd-error-text">{errors.eventType}</p>}
      {softWarnings.eventType && <p className="bd-warning-text">{softWarnings.eventType}</p>}
    </div>
        <motion.div className="bd-divider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}></motion.div>
        <div>
      <FormField 
          label="Event Date" 
          type="date"
          value={eventDate} 
          onChange={(e) => handleChange('eventDate', e.target.value)} 
          
        />
      {errors.eventDate && <p className="bd-error-text">{errors.eventDate}</p>}
      {softWarnings.eventDate && <p className="bd-warning-text">{softWarnings.eventDate}</p>}
    </div>
        <div>
      <SelectField
          label="Estimated Guest Count"
          value={guestCount}
          onChange={(e) => handleChange('guestCount', e.target.value)}
          options={GUEST_COUNTS}
          
        />
      {errors.guestCount && <p className="bd-error-text">{errors.guestCount}</p>}
      {softWarnings.guestCount && <p className="bd-warning-text">{softWarnings.guestCount}</p>}
    </div>
      </div>
      <NavigationButtons showBack={false} onNext={handleNext} />
    <ContactFooter />
      </StepContainer>
    </StepTransition>
  );
}
