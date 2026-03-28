import React, { useState } from 'react';
import StepTransition from '../components/StepTransition';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StepContainer from '../components/StepContainer';
import FormField from '../components/FormField';
import SelectField from '../components/SelectField';
import NavigationButtons from '../components/NavigationButtons';
import { useFormStore } from '../store/formStore';
import { validateStep2 } from '../utils/validation';

export default function Step2_Location() {
  const navigate = useNavigate();
  const { locationType, indoorsOutdoors, locationName, fullAddress, startTime, endTime, updateField } = useFormStore();
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
    const { isValid, errors: reqErrors, softWarnings: reqSoft } = validateStep2(formData);
    
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

    navigate('/step3');
  };

  const LOCATIONS = ['Residential (Home)', 'Event Hall / Venue', 'Park', 'Restaurant', 'Church', 'School', 'Other'];
  const IN_OUT = ['Indoors', 'Outdoors', 'Both'];

  return (
    <StepTransition stepKey="step2">
      <StepContainer>
      <div className="mb-8 sm:mb-10 text-center">
        <h2>Event Location</h2>
        <p className="bd-helper-text mt-2 text-center text-lg">Where and when will your event take place?</p>
      </div>
      <div className="space-y-4 sm:space-y-5 w-full flex flex-col items-center">
        <div>
      <SelectField 
          label="Where will your event take place?" 
          value={locationType} 
          onChange={(e) => handleChange('locationType', e.target.value)} 
          options={LOCATIONS} 
           
        />
      {errors.locationType && <p className="bd-error-text">{errors.locationType}</p>}
      {softWarnings.locationType && <p className="bd-warning-text">{softWarnings.locationType}</p>}
    </div>
        <div>
      <SelectField 
          label="Is the event indoors or outdoors?" 
          value={indoorsOutdoors} 
          onChange={(e) => handleChange('indoorsOutdoors', e.target.value)} 
          options={IN_OUT} 
           
        />
      {errors.indoorsOutdoors && <p className="bd-error-text">{errors.indoorsOutdoors}</p>}
      {softWarnings.indoorsOutdoors && <p className="bd-warning-text">{softWarnings.indoorsOutdoors}</p>}
    </div>
        <motion.div className="bd-divider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}></motion.div>
        <h3 className="bd-section-title">Location Details</h3>
        <div>
      <FormField 
          label="Location Name / City" 
          value={locationName} 
          onChange={(e) => handleChange('locationName', e.target.value)} 
          placeholder="e.g. Community Center, Miami" 
           
        />
      {errors.locationName && <p className="bd-error-text">{errors.locationName}</p>}
      {softWarnings.locationName && <p className="bd-warning-text">{softWarnings.locationName}</p>}
    </div>
        <div>
      <FormField 
          label="Full Address (Street, City, State, ZIP)" 
          value={fullAddress} 
          onChange={(e) => handleChange('fullAddress', e.target.value)} 
          placeholder="e.g. 123 Main St..." 
           
        />
      {errors.fullAddress && <p className="bd-error-text">{errors.fullAddress}</p>}
      {softWarnings.fullAddress && <p className="bd-warning-text">{softWarnings.fullAddress}</p>}
    </div>
        <motion.div className="bd-divider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}></motion.div>
        <h3 className="bd-section-title">Time Details</h3>
        <div>
      <FormField 
          label="Event Start Time" 
          type="time" 
          value={startTime} 
          onChange={(e) => handleChange('startTime', e.target.value)} 
           
        />
      {errors.startTime && <p className="bd-error-text">{errors.startTime}</p>}
      {softWarnings.startTime && <p className="bd-warning-text">{softWarnings.startTime}</p>}
    </div>
        <div>
      <FormField 
          label="Event End Time" 
          type="time" 
          value={endTime} 
          onChange={(e) => handleChange('endTime', e.target.value)} 
           
        />
      {errors.endTime && <p className="bd-error-text">{errors.endTime}</p>}
      {softWarnings.endTime && <p className="bd-warning-text">{softWarnings.endTime}</p>}
    </div>
      </div>
      <NavigationButtons onBack={() => navigate('/step1')} onNext={handleNext} />
    </StepContainer>
    </StepTransition>
  );
}
