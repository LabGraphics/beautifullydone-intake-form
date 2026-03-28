const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const componentsDir = path.join(srcDir, 'components');
const sectionsDir = path.join(srcDir, 'sections');
const pagesDir = path.join(srcDir, 'pages');

const read = (p) => fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
const write = (p, c) => fs.writeFileSync(p, c, 'utf8');

const addImports = (c, imports) => {
  if (c.includes(imports.split('\\n')[0])) return c; // Already imported
  const idx = c.indexOf('from \\'react\\';') + 14;
  if (idx > 13) {
    return c.slice(0, idx) + '\\n' + imports + c.slice(idx);
  }
  return imports + '\\n' + c;
};

// 1. Update Input Components
const formField = path.join(componentsDir, 'FormField.jsx');
if (fs.existsSync(formField)) {
  let c = read(formField);
  c = addImports(c, "import { motion } from 'framer-motion';");
  c = c.replace(/<input /g, '<motion.input whileFocus={{ scale: 1.01 }} transition={{ duration: 0.15, ease: "easeOut" }} ');
  c = c.replace(/<\/input>/g, '</motion.input>');
  c = c.replace(/<textarea /g, '<motion.textarea whileFocus={{ scale: 1.01 }} transition={{ duration: 0.15, ease: "easeOut" }} ');
  c = c.replace(/<\/textarea>/g, '</motion.textarea>');
  write(formField, c);
}

const selectField = path.join(componentsDir, 'SelectField.jsx');
if (fs.existsSync(selectField)) {
  let c = read(selectField);
  c = addImports(c, "import { motion } from 'framer-motion';");
  c = c.replace(/<select /g, '<motion.select whileFocus={{ scale: 1.01 }} transition={{ duration: 0.15, ease: "easeOut" }} ');
  c = c.replace(/<\/select>/g, '</motion.select>');
  write(selectField, c);
}

const radioGroup = path.join(componentsDir, 'RadioGroup.jsx');
if (fs.existsSync(radioGroup)) {
  let c = read(radioGroup);
  c = addImports(c, "import { motion } from 'framer-motion';");
  c = c.replace(/<div className="w-5 h-5/g, '<motion.div whileTap={{ scale: 1.05 }} transition={{ duration: 0.18, ease: "easeOut" }} className="w-5 h-5');
  c = c.replace(/<\/div>\\s*<span/g, '</motion.div>\\n            <span');
  write(radioGroup, c);
}

const checkboxGroup = path.join(componentsDir, 'CheckboxGroup.jsx');
if (fs.existsSync(checkboxGroup)) {
  let c = read(checkboxGroup);
  c = addImports(c, "import { motion } from 'framer-motion';");
  c = c.replace(/<div className="flex items-center h-6">/g, '<motion.div whileTap={{ scale: 1.05 }} transition={{ duration: 0.18, ease: "easeOut" }} className="flex items-center h-6">');
  c = c.replace(/<\/div>\\s*<span/g, '</motion.div>\\n            <span');
  write(checkboxGroup, c);
}

// 2. Wrap all Steps in StepTransition and add motion to dividers
const stepFiles = fs.readdirSync(sectionsDir).filter(f => f.startsWith('Step'));
stepFiles.forEach((f, idx) => {
  const p = path.join(sectionsDir, f);
  let c = read(p);
  
  if (!c.includes('StepTransition')) {
    c = addImports(c, "import StepTransition from '../components/StepTransition';\\nimport { motion } from 'framer-motion';");
    
    // Wrap StepContainer
    c = c.replace(/<StepContainer>/, `<StepTransition stepKey="step\${idx+1}">\\n      <StepContainer>`);
    c = c.replace(/<\\/StepContainer>/, '</StepContainer>\\n    </StepTransition>');

    // Animate section dividers
    c = c.replace(/<div className="bd-section-divider"><\\/div>/g, '<motion.div className="bd-section-divider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}></motion.div>');

    write(p, c);
  }
});

// Update manual steps inside Step5_Vendors
const step5 = path.join(sectionsDir, 'Step5_Vendors.jsx');
if (fs.existsSync(step5)) {
  let c = read(step5);
  if (!c.includes('whileTap')) {
    c = c.replace(/<div className="flex items-center h-6">(\\s*)<input type="checkbox"/g, '<motion.div whileTap={{ scale: 1.05 }} transition={{ duration: 0.18, ease: "easeOut" }} className="flex items-center h-6">$1<input type="checkbox"');
    c = c.replace(/<\\/div>(\\s*)<span/g, '</motion.div>$1<span');
    write(step5, c);
  }
}

// 3. Summary Screens Custom Logic
[path.join(sectionsDir, 'SummaryScreen.jsx'), path.join(pagesDir, 'Summary.jsx')].forEach(p => {
  if (!fs.existsSync(p)) return;
  let c = read(p);
  if (!c.includes('StepTransition') && !c.includes('framer-motion')) {
    c = addImports(c, "import StepTransition from '../components/StepTransition';\\nimport { motion } from 'framer-motion';");
    
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
    c = c.replace(/return \\(/, variants + '\\n  return (');

    if (c.includes('<StepContainer>')) {
       c = c.replace(/<StepContainer>/, '<StepTransition stepKey="summary">\\n      <StepContainer>\\n        <motion.div variants={containerVar} initial="hidden" animate="visible" className="w-full flex flex-col items-center">');
       c = c.replace(/<\\/StepContainer>/, '        </motion.div>\\n      </StepContainer>\\n    </StepTransition>');
    } else {
       c = c.replace(/<div className="summary-container">/, '<StepTransition stepKey="summary">\\n      <motion.div className="summary-container" variants={containerVar} initial="hidden" animate="visible">');
       // In my Summary.jsx, the last tag inside return () is </div>
       c = c.replace(/<button className="submit-button"[\\s\\S]*?<\\/button>\\s*<\\/div>/, (match) => match.replace(/<\\/div>$/, '</motion.div>\\n    </StepTransition>'));
    }

    c = c.replace(/<section className="summary-section">/g, '<motion.section className="summary-section" variants={itemVar}>');
    c = c.replace(/<\\/section>/g, '</motion.section>');

    c = c.replace(/<div className="bd-section-divider"><\\/div>/g, '<motion.div className="bd-section-divider" variants={itemVar}></motion.div>');

    if (p.includes('SummaryScreen.jsx')) {
      c = c.replace(/<div className="bg-white rounded-xl/g, '<motion.div variants={itemVar} className="bg-white rounded-xl');
      c = c.replace(/<\\/div>\\s*<div className="flex flex-col sm:flex-row/, '</motion.div>\\n      <div className="flex flex-col sm:flex-row');
    }

    write(p, c);
  }
});

// 4. Confirmation Screens Custom Logic
[path.join(sectionsDir, 'ConfirmationScreen.jsx'), path.join(pagesDir, 'Confirmation.jsx')].forEach(p => {
  if (!fs.existsSync(p)) return;
  let c = read(p);
  if (!c.includes('framer-motion')) {
    c = addImports(c, "import { motion } from 'framer-motion';");
    
    if (c.includes('<StepContainer>')) {
      c = c.replace(/<StepContainer>/, '<motion.div initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease: "easeOut" }} className="w-full">\\n      <StepContainer>');
      c = c.replace(/<\\/StepContainer>/, '</StepContainer>\\n    </motion.div>');
    } else {
      c = c.replace(/<div className="confirmation-container">/, '<motion.div initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease: "easeOut" }} className="confirmation-container">');
      c = c.replace(/<\\/div>\\s*\\)\\s*;\\s*\\}/, '</motion.div>\\n  );\\n}');
    }

    write(p, c);
  }
});

console.log("Framer Motion application complete!");
