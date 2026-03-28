import React, { useState } from 'react';
import ContactFooter from '../components/ContactFooter';
import StepTransition from '../components/StepTransition';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StepContainer from '../components/StepContainer';
import FormField from '../components/FormField';
import NavigationButtons from '../components/NavigationButtons';
import { useFormStore } from '../store/formStore';
import { validateStep5 } from '../utils/validation';

export default function Step5_Vendors() {
  const navigate = useNavigate();
  const { additionalVendors, vendorPreferences, updateField } = useFormStore(); 
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
    const { isValid, errors: reqErrors, softWarnings: reqSoft } = validateStep5(formData);
    
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
      handleChange('additionalVendors', ['I do not need additional services']);
      return;
    }
    let current = additionalVendors.includes('I do not need additional services') ? [] : [...additionalVendors];
    if (current.includes(val)) {
      current = current.filter(v => v !== val);
    } else {
      current.push(val);
    }
    handleChange('additionalVendors', current);
  };

  const showNotes = additionalVendors.length > 0 && !additionalVendors.includes('I do not need additional services');

  const ManualCheckboxList = ({ title, options }) => (
    <div className="flex flex-col w-full text-left">
      <h3 className="font-semibold text-[#0D1B2A] mb-3 text-lg">{title}</h3>
      <div className="flex flex-col gap-4 space-y-2">
        {options.map((opt, i) => (
          <label key={i} className="flex items-start space-x-3 cursor-pointer group py-2 pr-2 rounded hover:bg-gray-50 transition-colors">
            <motion.div whileTap={{ scale: 1.05 }} transition={{ duration: 0.18, ease: "easeOut" }} className="flex items-center h-6">
              <input type="checkbox" checked={additionalVendors.includes(opt)} onChange={() => handleCheck(opt)} className="w-5 h-5 accent-[#E8A6B8] cursor-pointer" />
            </motion.div>
            <span className="text-[#0D1B2A] text-base sm:text-lg">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <StepTransition stepKey="step8">
      <div className="bd-section max-w-[600px] mx-auto px-6 space-y-6">
        <h2>Vendors & Creative</h2>
        <p className="bd-helper-text text-lg">Would you like help booking or coordinating additional services?</p>
        <div className="space-y-6 w-full">
        <ManualCheckboxList title="Event Vendors:" options={VENDORS} />
{softWarnings.additionalVendors && <p className="bd-warning-text">{softWarnings.additionalVendors}</p>}
        <motion.div className="bd-divider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}></motion.div>
        <ManualCheckboxList title="Creative & Digital Services:" options={CREATIVE} />
        <motion.div className="bd-divider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}></motion.div>
        <div className="flex flex-col w-full text-left">
          <h3 className="font-semibold text-[#0D1B2A] mb-3 text-lg">None:</h3>
          <div className="flex flex-col gap-4 space-y-2">
            <label className="flex items-start space-x-3 cursor-pointer py-2 pr-2 rounded hover:bg-gray-50 transition-colors">
            <motion.div whileTap={{ scale: 1.05 }} transition={{ duration: 0.18, ease: "easeOut" }} className="flex items-center h-6">
              <input type="checkbox" checked={additionalVendors.includes('I do not need additional services')} onChange={() => handleCheck('I do not need additional services')} className="w-5 h-5 accent-[#E8A6B8] cursor-pointer" />
            </motion.div>
            </label>
          </div>
        </div>
        
        {showNotes && (
          <div className="w-full animate-fade-in mt-4 flex flex-col w-full text-left">
            <div>
      <FormField
              label="Any preferences or details you’d like us to know?"
              isTextArea
              value={vendorPreferences}
              onChange={(e) => handleChange('vendorPreferences', e.target.value)}
              placeholder="e.g. Budget limitations, style preferences..."
            />
      {errors.vendorPreferences && <p className="bd-error-text">{errors.vendorPreferences}</p>}
      {softWarnings.vendorPreferences && <p className="bd-warning-text">{softWarnings.vendorPreferences}</p>}
    </div>
          </div>
        )}
      </div>
      <NavigationButtons onBack={() => navigate('/step4')} onNext={handleNext} className="mt-10" />
      <ContactFooter className="mt-10 mb-6" />
      </div>
    </StepTransition>
  );
}
