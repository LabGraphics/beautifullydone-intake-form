const fs = require('fs');
const path = require('path');

// 1. Revert StepContainer.jsx
let containerPath = path.join('src', 'components', 'StepContainer.jsx');
let containerContent = fs.readFileSync(containerPath, 'utf8');
containerContent = `import React from 'react';

export default function StepContainer({ children, className = '' }) {
  return (
    <div className={\`w-full max-w-[600px] mx-auto px-4 py-6 sm:max-w-[640px] sm:px-6 md:max-w-[700px] md:px-8 md:py-10 lg:max-w-[800px] lg:px-10 xl:max-w-[900px] bg-white rounded-xl shadow-sm border border-gray-100 animate-fade-in \${className}\`}>
      {children}
    </div>
  );
}
`;
fs.writeFileSync(containerPath, containerContent);

// 2. Inject into all sections & pages
const dirs = [path.join('src', 'sections'), path.join('src', 'pages')];

dirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

    files.forEach(f => {
      const filePath = path.join(dir, f);
      let content = fs.readFileSync(filePath, 'utf8');

      // Remove existing ContactFooter import if any
      content = content.replace(/import ContactFooter.*\n/g, '');
      // Add import
      content = "import ContactFooter from '../components/ContactFooter';\n" + content;

      // Clean existing tags to prevent duplicates
      content = content.replace(/<ContactFooter \/>/g, '');

      // Insert before </StepContainer>
      content = content.replace(/<\/StepContainer>/g, '<ContactFooter />\n      </StepContainer>');

      fs.writeFileSync(filePath, content);
    });
  }
});

console.log('Explicitly applied ContactFooter to all sections and pages.');
