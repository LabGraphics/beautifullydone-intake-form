export function validateStep1(formData) {
  const errors = {};
  const softWarnings = {};
  if (!formData.eventName) errors.eventName = "What should we call your beautiful event?";
  if (!formData.eventType) errors.eventType = "Please let us know the type of event.";
  if (!formData.eventDate) errors.eventDate = "We need a date to start planning.";
  if (!formData.guestCount) errors.guestCount = "How many guests are you expecting?";
  return { isValid: Object.keys(errors).length === 0, errors, softWarnings };
}

export function validateStep2(formData) {
  const errors = {};
  const softWarnings = {};
  if (!formData.locationType) errors.locationType = "Please select a venue type.";
  if (!formData.indoorsOutdoors) errors.indoorsOutdoors = "Will it be indoors or outdoors?";
  if (!formData.locationName) errors.locationName = "Please provide the name of the location or city.";
  if (!formData.fullAddress) errors.fullAddress = "We'll need the full address to get there.";
  if (!formData.startTime) errors.startTime = "What time does the magic begin?";
  if (!formData.endTime) errors.endTime = "When will the event wrap up?";
  return { isValid: Object.keys(errors).length === 0, errors, softWarnings };
}

export function validateStep3(formData) {
  const errors = {};
  const softWarnings = {};
  if (!formData.servicesNeeded || formData.servicesNeeded.length === 0) {
    errors.servicesNeeded = "Please select at least one beautiful service.";
  }
  return { isValid: Object.keys(errors).length === 0, errors, softWarnings };
}

export function validateStep4(formData) {
  const errors = {};
  const softWarnings = {};
  if (!formData.needsRentals) {
    softWarnings.needsRentals = "Are you sure you don't need any rentals? We have some lovely options!";
  } else if (formData.needsRentals === 'Yes' && (!formData.rentalsList || formData.rentalsList.length === 0)) {
    softWarnings.rentalsList = "We’d love to know which rentals you have your eye on.";
  }
  return { isValid: Object.keys(errors).length === 0, errors, softWarnings };
}

export function validateStep5(formData) {
  const errors = {};
  const softWarnings = {};
  if (!formData.additionalVendors || formData.additionalVendors.length === 0) {
    softWarnings.additionalVendors = "We highly recommend exploring our vendors to make your event perfect!";
  }
  return { isValid: Object.keys(errors).length === 0, errors, softWarnings };
}

export function validateStep6(formData) {
  const errors = {};
  const softWarnings = {};
  if (!formData.budget) errors.budget = "Please provide an estimated budget so we can serve you best.";
  if (!formData.openToRecommendations) errors.openToRecommendations = "Simply let us know if you're open to recommendations.";
  return { isValid: Object.keys(errors).length === 0, errors, softWarnings };
}

export function validateStep7(formData) {
  const errors = {};
  const softWarnings = {};
  if (!formData.contactName) errors.contactName = "Please tell us your name.";
  if (!formData.contactEmail) errors.contactEmail = "We need your email to reach you.";
  if (!formData.phoneNumber) errors.phoneNumber = "A phone number helps us connect quickly.";
  if (!formData.preferredContact) errors.preferredContact = "How do you prefer to be reached?";
  return { isValid: Object.keys(errors).length === 0, errors, softWarnings };
}

export function validateStep8(formData) {
  const errors = {};
  const softWarnings = {};
  if (!formData.finalNotes || formData.finalNotes.trim() === '') {
    softWarnings.finalNotes = "Any final thoughts? We'd love to hear them, but no pressure!";
  }
  return { isValid: Object.keys(errors).length === 0, errors, softWarnings };
}