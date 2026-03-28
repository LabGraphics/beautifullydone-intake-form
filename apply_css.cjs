const fs = require('fs');

// Inputs
const formField = `import React from 'react';
import { motion } from 'framer-motion';

export default function FormField({ label, type = 'text', value, onChange, placeholder, error, isTextArea = false }) {
  const baseClasses = \`bd-input \${error ? 'error' : ''}\`;
  
  return (
    <div className="flex flex-col mb-6 w-full sm:max-w-[500px] sm:mx-auto md:max-w-[550px]">
      {label && <label className="bd-label">{label}</label>}
      {isTextArea ? (
        <motion.textarea whileFocus={{ scale: 1.01 }} transition={{ duration: 0.15, ease: "easeOut" }} value={value} onChange={onChange} placeholder={placeholder} className={\`\${baseClasses} min-h-[120px] resize-y\`} />
      ) : (
        <motion.input whileFocus={{ scale: 1.01 }} transition={{ duration: 0.15, ease: "easeOut" }} type={type} value={value} onChange={onChange} placeholder={placeholder} className={baseClasses} />
      )}
    </div>
  );
}
`;
fs.writeFileSync('src/components/FormField.jsx', formField);

const selectField = `import React from 'react';
import { motion } from 'framer-motion';

export default function SelectField({ label, value, onChange, options, error }) {
  const baseClasses = \`bd-input \${error ? 'error' : ''}\`;
  return (
    <div className="flex flex-col mb-6 w-full sm:max-w-[500px] sm:mx-auto md:max-w-[550px]">
      {label && <label className="bd-label">{label}</label>}
      <motion.select whileFocus={{ scale: 1.01 }} transition={{ duration: 0.15, ease: "easeOut" }} value={value} onChange={onChange} className={baseClasses}>
        <option value="" disabled>Select an option</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </motion.select>
    </div>
  );
}
`;
fs.writeFileSync('src/components/SelectField.jsx', selectField);

const navBtns = `import React from 'react';
import { motion } from 'framer-motion';

export default function NavigationButtons({ onBack, onNext, showBack = true, nextLabel = 'Next' }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between my-8 space-y-4 space-y-reverse sm:space-y-0 gap-4 sm:max-w-[500px] sm:mx-auto md:max-w-[550px] w-full">
      {showBack ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto px-8 py-3.5 font-sans font-semibold text-brand-blush-dark bg-transparent border-2 border-brand-blush-dark rounded-lg hover:bg-brand-blush-dark hover:text-brand-navy transition-colors duration-300"
        >
          Back
        </motion.button>
      ) : (
        <div className="hidden sm:block" /> 
      )}
      <motion.button
        whileHover={{ scale: 1.02, backgroundColor: '#dca0b1' }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={onNext}
        className="w-full sm:w-auto px-8 py-3.5 font-sans font-semibold text-brand-navy bg-brand-blush-dark rounded-lg shadow-md hover:shadow-lg transition-colors duration-300"
      >
        {nextLabel}
      </motion.button>
    </div>
  );
}
`;
fs.writeFileSync('src/components/NavigationButtons.jsx', navBtns);


// Checkboxes and Radios updates
['src/components/CheckboxGroup.jsx', 'src/components/RadioGroup.jsx', 'src/sections/Step5_Vendors.jsx'].forEach(p => {
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace(/text-\[\#0D1B2A\] font-medium mb-4 text-base sm:text-lg/g, 'bd-label mb-4');
    c = c.replace(/<label className="font-medium text-\[\#0D1B2A\] text-base sm:text-lg">/g, '<label className="bd-label">');
    c = c.replace(/text-gray-700 text-sm sm:text-base/g, 'text-gray-800');
    c = c.replace(/text-gray-700/g, 'text-gray-800');
    c = c.replace(/border-gray-300 text-\[\#E8A6B8\] focus:ring-\[\#E8A6B8\]/g, 'border-gray-300 text-brand-blush-dark focus:ring-brand-blush');
    fs.writeFileSync(p, c);
  }
});


// Step titles and Dividers
const steps = fs.readdirSync('src/sections').filter(f => f.startsWith('Step'));
steps.forEach(f => {
  let c = fs.readFileSync('src/sections/' + f, 'utf8');
  c = c.replace(/<h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-\[\#0D1B2A\]">/g, '<h2>');
  c = c.replace(/<p className="mt-2 text-gray-500 text-lg sm:text-xl">/g, '<p className="bd-helper-text mt-2 text-center text-lg">');
  c = c.replace(/mb-8 text-center/g, 'mb-8 sm:mb-10 text-center'); // Header margin
  c = c.replace(/className="error-text text-red-500 text-sm mt-1"/g, 'className="bd-error-text"');
  c = c.replace(/className="soft-warning-text text-amber-500 text-sm mt-1"/g, 'className="bd-warning-text"');
  c = c.replace(/className="bd-section-divider"/g, 'className="bd-divider"');
  fs.writeFileSync('src/sections/' + f, c);
});

// Summary & Confirmation pages
['src/sections/SummaryScreen.jsx', 'src/pages/Summary.jsx', 'src/sections/ConfirmationScreen.jsx', 'src/pages/Confirmation.jsx'].forEach(p => {
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    // Headings
    c = c.replace(/<h1[^>]*>/g, '<h1>');
    c = c.replace(/<h2[^>]*>/g, '<h2>');
    
    // Spacing
    c = c.replace(/gap-6/g, 'gap-8');
    c = c.replace(/gap-8 md:gap-12/g, 'gap-12 md:gap-16'); // 48-64px spacing system
    c = c.replace(/className="bd-section-divider"/g, 'className="bd-divider"');

    fs.writeFileSync(p, c);
  }
});

console.log('CSS applied');
