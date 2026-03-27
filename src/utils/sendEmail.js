import emailjs from '@emailjs/browser';

export async function sendEmail(formData) {
  const templateParams = {
    to_email: 'matthewgongbee@gmail.com',
    event_name: formData.eventName,
    contact_name: formData.contactName,
    contact_email: formData.contactEmail,
    message: `New Intake Form Submission:
      Event Name: ${formData.eventName}
      Event Type: ${formData.eventType}
      Event Date: ${formData.eventDate}
      Guest Count: ${formData.guestCount}
      Location Type: ${formData.locationType}
      Indoors/Outdoors: ${formData.indoorsOutdoors}
      Location Name: ${formData.locationName}
      Address: ${formData.fullAddress}
      Time: ${formData.startTime} - ${formData.endTime}
      Services: ${Array.isArray(formData.servicesNeeded) ? formData.servicesNeeded.join(', ') : formData.servicesNeeded}
      Needs Rentals: ${formData.needsRentals}
      Rentals Selected: ${Array.isArray(formData.rentalsList) ? formData.rentalsList.join(', ') : formData.rentalsList}
      Additional Vendors: ${Array.isArray(formData.additionalVendors) ? formData.additionalVendors.join(', ') : formData.additionalVendors}
      Vendor Prefs: ${formData.vendorPreferences}
      Budget: ${formData.budget}
      Open to Recs: ${formData.openToRecommendations}
      Contact Name: ${formData.contactName}
      Contact Email: ${formData.contactEmail}
      Phone Number: ${formData.phoneNumber}
      Preferred Contact: ${formData.preferredContact}
      Final Notes: ${formData.finalNotes}
    `
  };

  try {
    console.log("Simulating emailJS.send...", templateParams);
    return new Promise((resolve) => setTimeout(() => resolve({status: 200}), 500));
  } catch (error) {
    console.error("Failed to send email", error);
    throw error;
  }
}
