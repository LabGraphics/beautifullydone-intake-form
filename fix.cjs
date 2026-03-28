const fs = require('fs');

const addImports = (c, imports) => {
  if (c.includes('framer-motion')) return c;
  return c.replace("import React from 'react';", "import React from 'react';\n" + imports);
};

// 1. Inputs
const formField = 'src/components/FormField.jsx';
if (fs.existsSync(formField)) {
  let c = fs.readFileSync(formField, 'utf8');
  c = addImports(c, "import { motion } from 'framer-motion';");
  c = c.replace(/<input /g, '<motion.input whileFocus={{ scale: 1.01 }} transition={{ duration: 0.15, ease: "easeOut" }} ');
  c = c.replace(/<\/input>/g, '</motion.input>');
  c = c.replace(/<textarea /g, '<motion.textarea whileFocus={{ scale: 1.01 }} transition={{ duration: 0.15, ease: "easeOut" }} ');
  c = c.replace(/<\/textarea>/g, '</motion.textarea>');
  fs.writeFileSync(formField, c);
}

const selectField = 'src/components/SelectField.jsx';
if (fs.existsSync(selectField)) {
  let c = fs.readFileSync(selectField, 'utf8');
  c = addImports(c, "import { motion } from 'framer-motion';");
  c = c.replace(/<select /g, '<motion.select whileFocus={{ scale: 1.01 }} transition={{ duration: 0.15, ease: "easeOut" }} ');
  c = c.replace(/<\/select>/g, '</motion.select>');
  fs.writeFileSync(selectField, c);
}

const radioGroup = 'src/components/RadioGroup.jsx';
if (fs.existsSync(radioGroup)) {
  let c = fs.readFileSync(radioGroup, 'utf8');
  c = addImports(c, "import { motion } from 'framer-motion';");
  c = c.replace(/<div className="w-5 h-5/g, '<motion.div whileTap={{ scale: 1.05 }} transition={{ duration: 0.18, ease: "easeOut" }} className="w-5 h-5');
  c = c.replace(/<\/div>\s*<span/g, '</motion.div>\n            <span');
  fs.writeFileSync(radioGroup, c);
}

const checkboxGroup = 'src/components/CheckboxGroup.jsx';
if (fs.existsSync(checkboxGroup)) {
  let c = fs.readFileSync(checkboxGroup, 'utf8');
  c = addImports(c, "import { motion } from 'framer-motion';");
  c = c.replace(/<div className="flex items-center h-6">/g, '<motion.div whileTap={{ scale: 1.05 }} transition={{ duration: 0.18, ease: "easeOut" }} className="flex items-center h-6">');
  c = c.replace(/<\/div>\s*<span/g, '</motion.div>\n            <span');
  fs.writeFileSync(checkboxGroup, c);
}

// 2. Steps
const stepFiles = fs.readdirSync('src/sections').filter(f => f.startsWith('Step'));
stepFiles.forEach((f, idx) => {
  const p = 'src/sections/' + f;
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('StepTransition')) {
    c = c.replace(
      "import React, { useState } from 'react';", 
      "import React, { useState } from 'react';\nimport StepTransition from '../components/StepTransition';\nimport { motion } from 'framer-motion';"
    );
    // some files might just import React
    c = c.replace(
      "import React from 'react';", 
      "import React from 'react';\nimport StepTransition from '../components/StepTransition';\nimport { motion } from 'framer-motion';"
    );
    
    c = c.replace(/<StepContainer>/, '<StepTransition stepKey="step' + (idx+1) + '">\n      <StepContainer>');
    c = c.replace(/<\/StepContainer>/, '</StepContainer>\n    </StepTransition>');

    c = c.replace(/<div className="bd-section-divider"><\/div>/g, '<motion.div className="bd-section-divider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}></motion.div>');
    fs.writeFileSync(p, c);
  }
});

const step5 = 'src/sections/Step5_Vendors.jsx';
if (fs.existsSync(step5)) {
  let c = fs.readFileSync(step5, 'utf8');
  if (!c.includes('whileTap')) {
    c = c.replace(/<div className="flex items-center h-6">(\s*)<input type="checkbox"/g, '<motion.div whileTap={{ scale: 1.05 }} transition={{ duration: 0.18, ease: "easeOut" }} className="flex items-center h-6">$1<input type="checkbox"');
    c = c.replace(/<\/div>(\s*)<span/g, '</motion.div>$1<span');
    fs.writeFileSync(step5, c);
  }
}

// 3. Summary
['src/sections/SummaryScreen.jsx', 'src/pages/Summary.jsx'].forEach(p => {
  if (!fs.existsSync(p)) return;
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('framer-motion')) {
    c = c.replace("import React from 'react';", "import React from 'react';\nimport StepTransition from '../components/StepTransition';\nimport { motion } from 'framer-motion';");
    c = c.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport StepTransition from '../components/StepTransition';\nimport { motion } from 'framer-motion';");

const variants = `
  const containerVar = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06, ease: "easeOut" } }
  };
  const itemVar = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
`;
    c = c.replace(/return \(/, variants + '\n  return (');

    if (c.includes('<StepContainer>')) {
       c = c.replace(/<StepContainer>/, '<StepTransition stepKey="summary">\n      <StepContainer>\n        <motion.div variants={containerVar} initial="hidden" animate="visible" className="w-full flex flex-col items-center">');
       c = c.replace(/<\/StepContainer>/, '        </motion.div>\n      </StepContainer>\n    </StepTransition>');
    } else {
       c = c.replace(/<div className="summary-container">/, '<StepTransition stepKey="summary">\n      <motion.div className="summary-container" variants={containerVar} initial="hidden" animate="visible">');
       c = c.replace(/<\/div>\s*\)\s*;\s*\}/, '</motion.div>\n    </StepTransition>\n  );\n}');
    }

    c = c.replace(/<section className="summary-section">/g, '<motion.section className="summary-section" variants={itemVar}>');
    c = c.replace(/<\/section>/g, '</motion.section>');
    c = c.replace(/<div className="bd-section-divider"><\/div>/g, '<motion.div className="bd-section-divider" variants={itemVar}></motion.div>');
    if (p.includes('SummaryScreen.jsx')) {
      c = c.replace(/<div className="bg-white rounded-xl/g, '<motion.div variants={itemVar} className="bg-white rounded-xl');
      c = c.replace(/<\/div>\s*<div className="flex flex-col sm:flex-row/, '</motion.div>\n      <div className="flex flex-col sm:flex-row');
    }
    fs.writeFileSync(p, c);
  }
});

// 4. Confirmation
['src/sections/ConfirmationScreen.jsx', 'src/pages/Confirmation.jsx'].forEach(p => {
  if (!fs.existsSync(p)) return;
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('framer-motion')) {
    c = c.replace("import React from 'react';", "import React from 'react';\nimport { motion } from 'framer-motion';");
    c = c.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { motion } from 'framer-motion';");

    if (c.includes('<StepContainer>')) {
      c = c.replace(/<StepContainer>/, '<motion.div initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease: "easeOut" }} className="w-full">\n      <StepContainer>');
      c = c.replace(/<\/StepContainer>/, '</StepContainer>\n    </motion.div>');
    } else {
      c = c.replace(/<div className="confirmation-container">/, '<motion.div initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease: "easeOut" }} className="confirmation-container">');
      c = c.replace(/<\/div>\s*\)\s*;\s*\}/, '</motion.div>\n  );\n}');
    }
    fs.writeFileSync(p, c);
  }
});

console.log('done!');
