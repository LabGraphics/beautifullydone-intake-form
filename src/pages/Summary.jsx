import ContactFooter from '../components/ContactFooter';
import React from 'react';
import StepTransition from '../components/StepTransition';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../store/formStore';

export default function Summary() {
  const navigate = useNavigate();
  const formData = useFormStore((state) => state);

  return (
    <StepTransition stepKey="summary">
      <div className="bd-section">
      <h2>Review Your Event Details</h2>
      <p>Please review and edit any section before submitting your information.</p>

      {/* 1. Event Details */}
      <motion.section className="summary-section" variants={itemVar}>
        <div className="summary-header">
          <h2>1. Event Details</h2>
          <button onClick={() => navigate('/step1')}>Edit</button>
        </div>
        <div className="summary-content">
          <p><strong>Event Name:</strong> {formData.eventName}</p>
          <p><strong>Event Type:</strong> {formData.eventType}</p>
          <p><strong>Event Date:</strong> {formData.eventDate}</p>
          <p><strong>Guest Count:</strong> {formData.guestCount}</p>
        </div>
        <motion.div className="bd-divider" variants={itemVar}></motion.div>
      </motion.section>

      {/* 2. Event Location */}
      <motion.section className="summary-section" variants={itemVar}>
        <div className="summary-header">
          <h2>2. Event Location</h2>
          <button onClick={() => navigate('/step2')}>Edit</button>
        </div>
        <div className="summary-content">
          <p><strong>Location Type:</strong> {formData.locationType}</p>
          <p><strong>Environment:</strong> {formData.indoorsOutdoors}</p>
          <p><strong>Location Name / City:</strong> {formData.locationName}</p>
          <p><strong>Full Address:</strong> {formData.fullAddress}</p>
          <p><strong>Start Time:</strong> {formData.startTime}</p>
          <p><strong>End Time:</strong> {formData.endTime}</p>
        </div>
        <motion.div className="bd-divider" variants={itemVar}></motion.div>
      </motion.section>

      {/* 3. Services Needed */}
      <motion.section className="summary-section" variants={itemVar}>
        <div className="summary-header">
          <h2>3. Services Needed</h2>
          <button onClick={() => navigate('/step3')}>Edit</button>
        </div>
        <div className="summary-content">
          <p><strong>Selected Services:</strong> {Array.isArray(formData.servicesNeeded) ? formData.servicesNeeded.join(', ') : formData.servicesNeeded}</p>
        </div>
        <motion.div className="bd-divider" variants={itemVar}></motion.div>
      </motion.section>

      {/* 4. Rentals */}
      <motion.section className="summary-section" variants={itemVar}>
        <div className="summary-header">
          <h2>4. Rentals</h2>
          <button onClick={() => navigate('/step4')}>Edit</button>
        </div>
        <div className="summary-content">
          <p><strong>Needs Rentals:</strong> {formData.needsRentals}</p>
          <p><strong>Selected Rentals:</strong> {Array.isArray(formData.rentalsList) ? formData.rentalsList.join(', ') : formData.rentalsList}</p>
        </div>
        <motion.div className="bd-divider" variants={itemVar}></motion.div>
      </motion.section>

      {/* 5. Vendors & Creative Services */}
      <motion.section className="summary-section" variants={itemVar}>
        <div className="summary-header">
          <h2>5. Vendors & Creative Services</h2>
          <button onClick={() => navigate('/step5')}>Edit</button>
        </div>
        <div className="summary-content">
          <p><strong>Selected Vendors:</strong> {Array.isArray(formData.additionalVendors) ? formData.additionalVendors.join(', ') : formData.additionalVendors}</p>
          <p><strong>Vendor Preferences:</strong> {formData.vendorPreferences}</p>
        </div>
        <motion.div className="bd-divider" variants={itemVar}></motion.div>
      </motion.section>

      {/* 6. Budget */}
      <motion.section className="summary-section" variants={itemVar}>
        <div className="summary-header">
          <h2>6. Budget</h2>
          <button onClick={() => navigate('/step6')}>Edit</button>
        </div>
        <div className="summary-content">
          <p><strong>Estimated Budget:</strong> {formData.budget}</p>
          <p><strong>Open to Recommendations:</strong> {formData.openToRecommendations}</p>
        </div>
        <motion.div className="bd-divider" variants={itemVar}></motion.div>
      </motion.section>

      {/* 7. Contact Information */}
      <motion.section className="summary-section" variants={itemVar}>
        <div className="summary-header">
          <h2>7. Contact Information</h2>
          <button onClick={() => navigate('/step7')}>Edit</button>
        </div>
        <div className="summary-content">
          <p><strong>Full Name:</strong> {formData.contactName}</p>
          <p><strong>Email Address:</strong> {formData.contactEmail}</p>
          <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
          <p><strong>Preferred Contact Method:</strong> {formData.preferredContact}</p>
        </div>
        <motion.div className="bd-divider" variants={itemVar}></motion.div>
      </motion.section>

      {/* 8. Final Notes */}
      <motion.section className="summary-section" variants={itemVar}>
        <div className="summary-header">
          <h2>8. Final Notes</h2>
          <button onClick={() => navigate('/step8')}>Edit</button>
        </div>
        <div className="summary-content">
          <p><strong>Additional Details:</strong> {formData.finalNotes}</p>
        </div>
        <motion.div className="bd-divider" variants={itemVar}></motion.div>
      </motion.section>

      <button className="submit-button" onClick={() => navigate('/confirmation')}>
        Submit My Event Details
      </button>
      </div>
    </StepTransition>
  );
}
