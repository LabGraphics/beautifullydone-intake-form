import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepContainer from '../components/StepContainer';
import FormField from '../components/FormField';
import SelectField from '../components/SelectField';
import NavigationButtons from '../components/NavigationButtons';
import useIntakeStore from '../data/useIntakeStore';
import { isRequired } from '../components/ValidationHelpers';

export default function Step1_EventDetails() {
  const navigate = useNavigate();
  const { eventName, eventType, eventDate, guestCount, updateField } = useIntakeStore();
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const newErrors = {};
    if (!isRequired(eventName)) newErrors.eventName = 'Event Name is required';
    if (!isRequired(eventType)) newErrors.eventType = 'Event Type is required';
    if (!isRequired(eventDate)) newErrors.eventDate = 'Event Date is required';
    if (!isRequired(guestCount)) newErrors.guestCount = 'Estimated Guest Count is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    navigate('/step2');
  };

  const EVENT_TYPES = [
    'Birthday', 'Baby Shower', 'Bridal Shower', 'Wedding', 
    'Graduation', 'Corporate Event', 'Kids Party', 'Other'
  ];
  const GUEST_COUNTS = ['0–25', '25–50', '50–75', '75–100', '100–150', '150+'];

  return (
    <StepContainer>
      <div className="mb-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0D1B2A]">Event Details</h2>
        <p className="mt-2 text-gray-500 text-lg sm:text-xl">Please provide the basic details for your event.</p>
      </div>
      <div className="space-y-4 sm:space-y-5 w-full flex flex-col items-center">
        <FormField 
          label="Event Name" 
          value={eventName} 
          onChange={(e) => updateField('eventName', e.target.value)} 
          placeholder="e.g. John's 30th Birthday" 
          error={errors.eventName}
        />
        <SelectField
          label="Event Type"
          value={eventType}
          onChange={(e) => updateField('eventType', e.target.value)}
          options={EVENT_TYPES}
          error={errors.eventType}
        />
        <FormField 
          label="Event Date" 
          type="date"
          value={eventDate} 
          onChange={(e) => updateField('eventDate', e.target.value)} 
          error={errors.eventDate}
        />
        <SelectField
          label="Estimated Guest Count"
          value={guestCount}
          onChange={(e) => updateField('guestCount', e.target.value)}
          options={GUEST_COUNTS}
          error={errors.guestCount}
        />
      </div>
      <NavigationButtons showBack={false} onNext={handleNext} />
    </StepContainer>
  );
}
