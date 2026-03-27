import React from 'react';
import { useNavigate } from 'react-router-dom';
import StepContainer from '../components/StepContainer';
import FormField from '../components/FormField';
import NavigationButtons from '../components/NavigationButtons';
import useIntakeStore from '../data/useIntakeStore';

export default function Step5_Vendors() {
  const navigate = useNavigate();
  const { additionalVendors, vendorPreferences, updateField } = useIntakeStore();

  const handleNext = () => {
    navigate('/step6');
  };

  const VENDORS = [
    'Photographer', 'Videographer', 'DJ / Entertainment', 'Caterer', 'Bartender',
    'Cake / Dessert Vendor', 'Photo Booth', 'Event Security', 'Venue Recommendation'
  ];
  const CREATIVE = [
    'Website for my event (RSVP, details, gallery, etc.)',
    'Graphic design (flyers, invitations, menus, signage)',
    'Printing services (invites, menus, programs, signage)'
  ];

  const handleCheck = (val) => {
    if (val === 'I do not need additional services') {
      updateField('additionalVendors', ['I do not need additional services']);
      return;
    }
    let current = additionalVendors.includes('I do not need additional services') ? [] : [...additionalVendors];
    if (current.includes(val)) {
      current = current.filter(v => v !== val);
    } else {
      current.push(val);
    }
    updateField('additionalVendors', current);
  };

  const showNotes = additionalVendors.length > 0 && !additionalVendors.includes('I do not need additional services');

  const ManualCheckboxList = ({ title, options }) => (
    <div className="mb-6 w-full sm:max-w-[500px] sm:mx-auto md:max-w-[550px]">
      <h3 className="font-semibold text-[#0D1B2A] mb-3 text-lg">{title}</h3>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <label key={i} className="flex items-start space-x-3 cursor-pointer group p-2 rounded hover:bg-gray-50 transition-colors">
            <div className="flex items-center h-6">
              <input type="checkbox" checked={additionalVendors.includes(opt)} onChange={() => handleCheck(opt)} className="w-5 h-5 accent-[#E8A6B8] cursor-pointer" />
            </div>
            <span className="text-[#0D1B2A] text-base sm:text-lg">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <StepContainer>
      <div className="mb-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0D1B2A]">Vendors & Creative</h2>
        <p className="mt-2 text-gray-500 text-lg sm:text-xl">Would you like help booking or coordinating additional services?</p>
      </div>
      <div className="w-full flex flex-col items-center">
        <ManualCheckboxList title="Event Vendors:" options={VENDORS} />
        <ManualCheckboxList title="Creative & Digital Services:" options={CREATIVE} />
        <div className="mb-6 w-full sm:max-w-[500px] sm:mx-auto md:max-w-[550px]">
          <h3 className="font-semibold text-[#0D1B2A] mb-3 text-lg">None:</h3>
          <label className="flex items-start space-x-3 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors">
            <div className="flex items-center h-6">
              <input type="checkbox" checked={additionalVendors.includes('I do not need additional services')} onChange={() => handleCheck('I do not need additional services')} className="w-5 h-5 accent-[#E8A6B8] cursor-pointer" />
            </div>
            <span className="text-[#0D1B2A] text-base sm:text-lg">I do not need additional services</span>
          </label>
        </div>
        
        {showNotes && (
          <div className="w-full animate-fade-in mt-4 flex flex-col items-center">
            <FormField
              label="Any preferences or details you’d like us to know?"
              isTextArea
              value={vendorPreferences}
              onChange={(e) => updateField('vendorPreferences', e.target.value)}
              placeholder="e.g. Budget limitations, style preferences..."
            />
          </div>
        )}
      </div>
      <NavigationButtons onBack={() => navigate('/step4')} onNext={handleNext} />
    </StepContainer>
  );
}
