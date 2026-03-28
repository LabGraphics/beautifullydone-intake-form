import ContactFooter from '../components/ContactFooter';
import React, { useState } from 'react';
import StepTransition from '../components/StepTransition';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../store/formStore';
import StepContainer from '../components/StepContainer';
import NavigationButtons from '../components/NavigationButtons';
import { sendEmail } from '../utils/sendEmail';
import { writeToDatastore } from '../utils/writeToDatastore';

export default function SummaryScreen() {
  const navigate = useNavigate();
  const formData = useFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await writeToDatastore(formData);
      await sendEmail(formData);
      formData.resetForm();
      navigate('/confirmation');
    } catch (error) {
      console.error("Submission failed", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const SummaryItem = ({ label, value }) => {
    let displayValue = value || 'N/A';
    if (Array.isArray(value)) {
      displayValue = value.length > 0 ? value.join(', ') : 'None';
    }

  return (
      <div className="flex flex-col sm:flex-row sm:justify-between py-4 border-b border-gray-100 last:border-0 gap-2 w-full">
        <span className="font-semibold text-[#0D1B2A] sm:w-1/3 shrink-0 text-base sm:text-lg">{label}</span>
        <span className="text-gray-700 whitespace-pre-wrap sm:text-right text-base sm:text-lg w-full">{displayValue}</span>
      </div>
    );
  };

  return (
    <StepTransition stepKey="summary">
      <div className="bd-section max-w-[600px] mx-auto px-6 space-y-6">
        <h2>Review Your Details</h2>
        <p className="bd-helper-text text-lg">Please review the details below before submitting.</p>
        <div className="space-y-6 w-full text-left">
          <h3 className="font-semibold text-lg text-[#0D1B2A] border-b pb-2 mb-2">Event Details</h3>
        <SummaryItem label="Event Name" value={formData.eventName} />
        <SummaryItem label="Event Type" value={formData.eventType} />
        <SummaryItem label="Event Date" value={formData.eventDate} />
        <SummaryItem label="Guest Count" value={formData.guestCount} />
        
        <h3 className="font-semibold text-lg text-[#0D1B2A] border-b pb-2 mb-2 mt-6">Location</h3>
        <SummaryItem label="Location Type" value={formData.locationType} />
        <SummaryItem label="Indoors/Outdoors" value={formData.indoorsOutdoors} />
        <SummaryItem label="Location Name" value={formData.locationName} />
        <SummaryItem label="Address" value={formData.fullAddress} />
        <SummaryItem label="Time" value={`${formData.startTime} - ${formData.endTime}`} />
        
        <h3 className="font-semibold text-lg text-[#0D1B2A] border-b pb-2 mb-2 mt-6">Services & Rentals</h3>
        <SummaryItem label="Services Needed" value={formData.servicesNeeded} />
        <SummaryItem label="Needs Rentals" value={formData.needsRentals} />
        {formData.needsRentals === 'Yes' && <SummaryItem label="Rentals Selected" value={formData.rentalsList} />}
        
        <h3 className="font-semibold text-lg text-[#0D1B2A] border-b pb-2 mb-2 mt-6">Vendors & Budget</h3>
        <SummaryItem label="Additional Vendors" value={formData.additionalVendors} />
        <SummaryItem label="Vendor Preferences" value={formData.vendorPreferences} />
        <SummaryItem label="Budget" value={formData.budget} />
        <SummaryItem label="Open to Recs" value={formData.openToRecommendations} />
        
        <h3 className="font-semibold text-lg text-[#0D1B2A] border-b pb-2 mb-2 mt-6">Contact & Notes</h3>
        <SummaryItem label="Contact Name" value={formData.contactName} />
        <SummaryItem label="Email" value={formData.contactEmail} />
        <SummaryItem label="Phone Number" value={formData.phoneNumber} />
        <SummaryItem label="Preferred Contact" value={formData.preferredContact} />
        <SummaryItem label="Final Notes" value={formData.finalNotes} />
        </div>
        <NavigationButtons onBack={() => navigate('/step8')} onNext={handleSubmit} nextLabel={isSubmitting ? 'Submitting...' : 'Submit'} disableNext={isSubmitting} className="mt-10" />
        <ContactFooter className="mt-10 mb-6" />
      </div>
    </StepTransition>
  );
}
