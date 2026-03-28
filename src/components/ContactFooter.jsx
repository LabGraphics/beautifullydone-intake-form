import React from 'react';

export default function ContactFooter() {
  return (
    <div className="bd-contact-footer">
      <p className="font-semibold text-brand-navy">Beautifully Done Events</p>
      <p>
        <a href="https://www.beautifullyevents.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blush-dark transition-colors duration-200">
          www.beautifullyevents.com
        </a>
      </p>
      <p>
        Call: <a href="tel:6782355404" className="hover:text-brand-blush-dark transition-colors duration-200">678-235-5404</a>
      </p>
      <p>
        Email: <a href="mailto:info@beautifullyevents.com" className="hover:text-brand-blush-dark transition-colors duration-200">info@beautifullyevents.com</a>
      </p>
    </div>
  );
}
