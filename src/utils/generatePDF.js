import { jsPDF } from 'jspdf';

export function generatePDF(formData) {
  const doc = new jsPDF();
  
  // Brand Header
  doc.setTextColor(13, 27, 42); // #0D1B2A
  doc.setFontSize(24);
  doc.setFont("times", "bold");
  doc.text("Beautifully Done", 20, 20);
  
  doc.setTextColor(232, 166, 184); // #E8A6B8
  doc.setFontSize(14);
  doc.setFont("times", "italic");
  doc.text("Making every occasion memorable", 20, 30);
  
  // Timestamp
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 45);
  
  // Form Fields
  doc.setTextColor(13, 27, 42);
  doc.setFontSize(12);
  let yPos = 60;
  
  const addField = (label, value) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, 20, yPos);
    doc.setFont("helvetica", "normal");
    
    let displayValue = value || 'N/A';
    if (Array.isArray(value)) {
      displayValue = value.length > 0 ? value.join(', ') : 'None';
    }
    const textLines = doc.splitTextToSize(String(displayValue), 120);
    doc.text(textLines, 70, yPos);
    yPos += Math.max(10, textLines.length * 6);
  };

  addField("Event Name", formData.eventName);
  addField("Event Type", formData.eventType);
  addField("Event Date", formData.eventDate);
  addField("Guest Count", formData.guestCount);
  yPos += 5;
  addField("Location Type", formData.locationType);
  addField("Setting", formData.indoorsOutdoors);
  addField("Location Name", formData.locationName);
  addField("Address", formData.fullAddress);
  addField("Time", `${formData.startTime} - ${formData.endTime}`);
  yPos += 5;
  addField("Services Needed", formData.servicesNeeded);
  addField("Needs Rentals", formData.needsRentals);
  if (formData.needsRentals === 'Yes') {
    addField("Rentals", formData.rentalsList);
  }
  yPos += 5;
  addField("Add Vendors", formData.additionalVendors);
  addField("Vendor Prefs", formData.vendorPreferences);
  addField("Budget", formData.budget);
  addField("Open to Recs", formData.openToRecommendations);
  yPos += 5;
  addField("Contact Name", formData.contactName);
  addField("Contact Email", formData.contactEmail);
  addField("Phone Number", formData.phoneNumber);
  addField("Pref. Contact", formData.preferredContact);
  addField("Final Notes", formData.finalNotes);
  
  doc.save(`${formData.eventName || 'Event'}_IntakeForm.pdf`);
}
