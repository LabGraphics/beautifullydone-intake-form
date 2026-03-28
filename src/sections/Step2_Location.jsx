import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepContainer from '../components/StepContainer';
import FormField from '../components/FormField';
import SelectField from '../components/SelectField';
import NavigationButtons from '../components/NavigationButtons';
import useIntakeStore from '../data/useIntakeStore';
import { isRequired } from '../components/ValidationHelpers';

export default function Step2_Location() {
  const navigate = useNavigate();
  const { locationType, indoorsOutdoors, locationName, fullAddress, startTime, endTime, updateField } = useIntakeStore();
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const newErrors = {};
    if (!isRequired(locationType)) newErrors.locationType = 'Location Type is required';
    if (!isRequired(indoorsOutdoors)) newErrors.indoorsOutdoors = 'Please specify indoor or outdoor';
    if (!isRequired(locationName)) newErrors.locationName = 'Location Name / City is required';
    if (!isRequired(fullAddress)) newErrors.fullAddress = 'Full Address is required';
    if (!isRequired(startTime)) newErrors.startTime = 'Start Time is required';
    if (!isRequired(endTime)) newErrors.endTime = 'End Time is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    navigate('/step3');
  };

  const LOCATIONS = ['Residential (Home)', 'Event Hall / Venue', 'Park', 'Restaurant', 'Church', 'School', 'Other'];
  const IN_OUT = ['Indoors', 'Outdoors', 'Both'];

  return (
    <StepContainer>
      <div className="mb-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0D1B2A]">Event Location</h2>
        <p className="mt-2 text-gray-500 text-lg sm:text-xl">Where and when will your event take place?</p>
      </div>
      <div className="space-y-4 sm:space-y-5 w-full flex flex-col items-center">
        <SelectField 
          label="Where will your event take place?" 
          value={locationType} 
          onChange={(e) => updateField('locationType', e.target.value)} 
          options={LOCATIONS} 
          error={errors.locationType} 
        />
        <SelectField 
          label="Is the event indoors or outdoors?" 
          value={indoorsOutdoors} 
          onChange={(e) => updateField('indoorsOutdoors', e.target.value)} 
          options={IN_OUT} 
          error={errors.indoorsOutdoors} 
        />
        <div className="bd-section-divider"></div>
        <h3 className="bd-section-title">Location Details</h3>
        <FormField 
          label="Location Name / City" 
          value={locationName} 
          onChange={(e) => updateField('locationName', e.target.value)} 
          placeholder="e.g. Community Center, Miami" 
          error={errors.locationName} 
        />
        <FormField 
          label="Full Address (Street, City, State, ZIP)" 
          value={fullAddress} 
          onChange={(e) => updateField('fullAddress', e.target.value)} 
          placeholder="e.g. 123 Main St..." 
          error={errors.fullAddress} 
        />
        <div className="bd-section-divider"></div>
        <h3 className="bd-section-title">Time Details</h3>
        <FormField 
          label="Event Start Time" 
          type="time" 
          value={startTime} 
          onChange={(e) => updateField('startTime', e.target.value)} 
          error={errors.startTime} 
        />
        <FormField 
          label="Event End Time" 
          type="time" 
          value={endTime} 
          onChange={(e) => updateField('endTime', e.target.value)} 
          error={errors.endTime} 
        />
      </div>
      <NavigationButtons onBack={() => navigate('/step1')} onNext={handleNext} />
    </StepContainer>
  );
}
