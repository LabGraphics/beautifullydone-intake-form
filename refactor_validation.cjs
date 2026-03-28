// refactor_validation.cjs
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const sectionsDir = path.join(srcDir, 'sections');
const utilsDir = path.join(srcDir, 'utils');

if (!fs.existsSync(utilsDir)) fs.mkdirSync(utilsDir);

const validationContent = `
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
`;

fs.writeFileSync(path.join(utilsDir, 'validation.js'), validationContent.trim(), 'utf-8');

// Mapping steps
const steps = [
  { file: 'Step1_EventDetails.jsx', val: 'validateStep1', next: 'step2' },
  { file: 'Step2_Location.jsx', val: 'validateStep2', next: 'step3' },
  { file: 'Step3_Services.jsx', val: 'validateStep3', next: 'step4' },
  { file: 'Step4_Rentals.jsx', val: 'validateStep4', next: 'step5' },
  { file: 'Step5_Vendors.jsx', val: 'validateStep5', next: 'step6' },
  { file: 'Step6_Budget.jsx', val: 'validateStep6', next: 'step7' },
  { file: 'Step7_ContactInfo.jsx', val: 'validateStep7', next: 'step8' },
  { file: 'Step8_FinalNotes.jsx', val: 'validateStep8', next: 'summary' }
];

steps.forEach(({ file, val, next }) => {
  const filePath = path.join(sectionsDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');

  // Add imports
  if (!content.includes(val)) {
    content = content.replace(
      "import { useFormStore } from '../store/formStore';",
      "import { useFormStore } from '../store/formStore';\nimport { " + val + " } from '../utils/validation';"
    );
  }

  // Remove old ValidationHelpers
  content = content.replace(/import {.*?ValidationHelpers.*?;\n/g, '');

  // Add Hooks
  if (!content.includes('softWarnings')) {
    content = content.replace(
      /const \[errors, setErrors\] = useState\(\{\}\);/g,
      "const [errors, setErrors] = useState({});\n  const [softWarnings, setSoftWarnings] = useState({});\n  const [softBlockShown, setSoftBlockShown] = useState(false);"
    );
    // If it didn't have errors at all:
    if (!content.includes('setErrors]')) {
       content = content.replace(
         /const \{.*?\} = useFormStore\(\);/,
         "$& \n  const [errors, setErrors] = useState({});\n  const [softWarnings, setSoftWarnings] = useState({});\n  const [softBlockShown, setSoftBlockShown] = useState(false);"
       );
    }
    // Remove individual error states
    content = content.replace(/const \[error, setError\] = useState\(''\);\n/g, '');
  }

  // Inject handleChange
  if (!content.includes('handleChange')) {
    const handleChangeFunc = `

  const handleChange = (field, value) => {
    updateField(field, value);
    setErrors(prev => ({ ...prev, [field]: undefined }));
    setSoftWarnings(prev => ({ ...prev, [field]: undefined }));
  };
`;
    content = content.replace(/const handleNext = \(\) => \{/, handleChangeFunc + '\n  const handleNext = () => {');
  }

  // Update specific bindings
  content = content.replace(/onChange=\{\(e\) => updateField\('(.*?)', e\.target\.value\)\}/g, "onChange={(e) => handleChange('$1', e.target.value)}");
  content = content.replace(/onChange=\{\(val\) => updateField\('(.*?)', val\)\}/g, "onChange={(val) => handleChange('$1', val)}");
  content = content.replace(/onChange=\{\(vals\) => updateField\('(.*?)', vals\)\}/g, "onChange={(vals) => handleChange('$1', vals)}");

  // Step 4 special logic update
  content = content.replace(/updateField\('needsRentals', val\);\n.*if \(val === 'No'\) updateField\('rentalsList', \[\]\);/g, 
    "handleChange('needsRentals', val); if (val === 'No') handleChange('rentalsList', []);");

  // Step 5 special logic update 
  content = content.replace(/updateField\('additionalVendors', \['I do not need additional services'\]\);/g, "handleChange('additionalVendors', ['I do not need additional services']);");
  content = content.replace(/updateField\('additionalVendors', current\);/g, "handleChange('additionalVendors', current);");

  // Replace error props
  content = content.replace(/error=\{errors\.(.*?)\}/g, '');
  content = content.replace(/error=\{error\}/g, '');

  content = content.replace(/<FormField([^>]*)\/>/g, (match, body) => {
     let fNameMatch = body.match(/handleChange\('(.*?)'/);
     let field = fNameMatch ? fNameMatch[1] : '';
     if (!field) return match;
     return `<div>\n      <FormField${body}/>\n      {errors.${field} && <p className="error-text text-red-500 text-sm mt-1">{errors.${field}}</p>}\n      {softWarnings.${field} && <p className="soft-warning-text text-amber-500 text-sm mt-1">{softWarnings.${field}}</p>}\n    </div>`;
  });

  content = content.replace(/<SelectField([^>]*)\/>/g, (match, body) => {
     let fNameMatch = body.match(/handleChange\('(.*?)'/);
     let field = fNameMatch ? fNameMatch[1] : '';
     if (!field) return match;
     return `<div>\n      <SelectField${body}/>\n      {errors.${field} && <p className="error-text text-red-500 text-sm mt-1">{errors.${field}}</p>}\n      {softWarnings.${field} && <p className="soft-warning-text text-amber-500 text-sm mt-1">{softWarnings.${field}}</p>}\n    </div>`;
  });

  content = content.replace(/<RadioGroup([^>]*)\/>/g, (match, body) => {
     let fNameMatch = body.match(/handleChange\('(.*?)'/);
     let field = fNameMatch ? fNameMatch[1] : '';
     if (!field) return match;
     return `<div>\n      <RadioGroup${body}/>\n      {errors.${field} && <p className="error-text text-red-500 text-sm mt-1">{errors.${field}}</p>}\n      {softWarnings.${field} && <p className="soft-warning-text text-amber-500 text-sm mt-1">{softWarnings.${field}}</p>}\n    </div>`;
  });

  content = content.replace(/<CheckboxGroup([^>]*)\/>/g, (match, body) => {
     let fNameMatch = body.match(/handleChange\('(.*?)'/);
     let field = fNameMatch ? fNameMatch[1] : '';
     if (!field) return match;
     return `<div>\n      <CheckboxGroup${body}/>\n      {errors.${field} && <p className="error-text text-red-500 text-sm mt-1">{errors.${field}}</p>}\n      {softWarnings.${field} && <p className="soft-warning-text text-amber-500 text-sm mt-1">{softWarnings.${field}}</p>}\n    </div>`;
  });

  // Step 5 specific hardcoded warning
  content = content.replace(/<ManualCheckboxList title="Event Vendors:" options=\{VENDORS\} \/>/, `<ManualCheckboxList title="Event Vendors:" options={VENDORS} />\n{softWarnings.additionalVendors && <p className="soft-warning-text text-amber-500 text-sm mt-1">{softWarnings.additionalVendors}</p>}`);


  // Rewrite handleNext body
  const regex = /const handleNext = \(\) => \{[\s\S]*?navigate\('\/(.*?)'\);\n  \};/;
  const newHandleNext = `const handleNext = () => {
    const formData = useFormStore.getState();
    const { isValid, errors: reqErrors, softWarnings: reqSoft } = ${val}(formData);
    
    if (!isValid || Object.keys(reqErrors).length > 0) {
      setErrors(reqErrors);
      setTimeout(() => {
        const errorEl = document.querySelector('.error-text');
        if (errorEl) errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }

    if (Object.keys(reqSoft).length > 0 && !softBlockShown) {
      setSoftWarnings(reqSoft);
      setSoftBlockShown(true);
      setTimeout(() => {
        const softEl = document.querySelector('.soft-warning-text');
        if (softEl) softEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }

    navigate('/${next}');
  };`;

  content = content.replace(regex, newHandleNext);

  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log("Refactoring validation done!");
