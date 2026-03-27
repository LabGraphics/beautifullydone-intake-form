import React from 'react';
import { useNavigate } from 'react-router-dom';
import StepContainer from '../components/StepContainer';
import FormField from '../components/FormField';
import NavigationButtons from '../components/NavigationButtons';
import useIntakeStore from '../data/useIntakeStore';

export default function Step8_FinalNotes() {
  const navigate = useNavigate();
  const { finalNotes, updateField } = useIntakeStore();

  const handleNext = () => {
    navigate('/summary');
  };

  return (
    <StepContainer>
      <div className="mb-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0D1B2A]">Final Notes</h2>
        <p className="mt-2 text-gray-500 text-lg sm:text-xl">Almost done! Any last details?</p>
      </div>
      <div className="space-y-4 w-full flex flex-col items-center">
        <FormField 
          label="Is there anything else you’d like us to know about your event?" 
          isTextArea 
          value={finalNotes} 
          onChange={(e) => updateField('finalNotes', e.target.value)} 
          placeholder="Special requests, themes, accessibility needs..." 
        />
      </div>
      <NavigationButtons onBack={() => navigate('/step7')} onNext={handleNext} nextLabel="Review & Submit" />
    </StepContainer>
  );
}
