import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const data = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlContent = `
      <h2>New Event Submission from ${data.contactName || 'Client'}</h2>
      <h3>Event Details</h3>
      <ul>
        <li><strong>Event Name:</strong> ${data.eventName || 'N/A'}</li>
        <li><strong>Event Type:</strong> ${data.eventType || 'N/A'}</li>
        <li><strong>Event Date:</strong> ${data.eventDate || 'N/A'}</li>
        <li><strong>Guest Count:</strong> ${data.guestCount || 'N/A'}</li>
      </ul>
      
      <h3>Location</h3>
      <ul>
        <li><strong>Location Type:</strong> ${data.locationType || 'N/A'}</li>
        <li><strong>Environment:</strong> ${data.indoorsOutdoors || 'N/A'}</li>
        <li><strong>Location Name/City:</strong> ${data.locationName || 'N/A'}</li>
        <li><strong>Full Address:</strong> ${data.fullAddress || 'N/A'}</li>
        <li><strong>Start Time:</strong> ${data.startTime || 'N/A'}</li>
        <li><strong>End Time:</strong> ${data.endTime || 'N/A'}</li>
      </ul>

      <h3>Services Needed</h3>
      <p>${Array.isArray(data.servicesNeeded) ? data.servicesNeeded.join(', ') : data.servicesNeeded || 'None'}</p>

      <h3>Rentals</h3>
      <p>Needs Rentals? ${data.needsRentals || 'No'}</p>
      <p>${Array.isArray(data.rentalsList) ? data.rentalsList.join(', ') : data.rentalsList || 'None'}</p>

      <h3>Vendors & Creative Services</h3>
      <p>Additional Vendors: ${Array.isArray(data.additionalVendors) ? data.additionalVendors.join(', ') : data.additionalVendors || 'None'}</p>
      <p>Preferences: ${data.vendorPreferences || 'None'}</p>

      <h3>Budget</h3>
      <p>Estimated Budget: ${data.budget || 'N/A'}</p>
      <p>Open to recommendations? ${data.openToRecommendations || 'N/A'}</p>

      <h3>Contact Info</h3>
      <ul>
        <li><strong>Name:</strong> ${data.contactName || 'N/A'}</li>
        <li><strong>Email:</strong> ${data.contactEmail || 'N/A'}</li>
        <li><strong>Phone:</strong> ${data.phoneNumber || 'N/A'}</li>
        <li><strong>Preferred Method:</strong> ${data.preferredContact || 'N/A'}</li>
      </ul>

      <h3>Final Notes</h3>
      <p>${data.finalNotes || 'None'}</p>
    `;

    await transporter.sendMail({
      from: `"Beautifully Done Intake" <${process.env.SMTP_USER}>`,
      to: 'vfully@yahoo.com',
      replyTo: data.contactEmail,
      subject: `New Event Submission: ${data.eventName || 'Event'}`,
      html: htmlContent,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email' });
  }
}
