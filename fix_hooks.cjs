const fs = require('fs');
const path = require('path');

const scanDirs = ['src/sections', 'src/pages', 'src/components'];
const hooksToCheck = ['useState', 'useEffect', 'useMemo', 'useCallback', 'useRef', 'useReducer'];

let updatedFiles = [];

scanDirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

  files.forEach(f => {
    const filePath = path.join(dir, f);
    let content = fs.readFileSync(filePath, 'utf8');

    // Find used hooks
    const usedHooks = hooksToCheck.filter(hook => new RegExp(`\\b${hook}\\s*\\(`).test(content));

    if (usedHooks.length > 0) {
      // Check which ones are NOT imported
      // We look at the react import specifically.
      const reactImportMatch = content.match(/import\s+(?:React,\s*)?(?:\{([^}]*)\})?(?:\s*from\s*['"]react['"])?/);
      let importedHooks = [];
      let reactImportString = '';

      const importMatches = content.match(/import\s+.*?from\s+['"]react['"];?/g);
      
      let needsUpdate = false;
      const missingHooks = usedHooks.filter(hook => {
        const isImported = importMatches && importMatches.some(imp => imp.includes(hook));
        return !isImported;
      });

      if (missingHooks.length > 0) {
        needsUpdate = true;
        // The instruction says to add the robust import line.
        // It's safer to just inject standard structured react import to replace the existing one 
        // to avoid duplicate react imports or syntax parsing edge cases.
        // We'll collect all hooks that SHOULD be in this file.
        
        let existingHooks = [];
        if (importMatches) {
          importMatches.forEach(imp => {
            const match = imp.match(/\{([^}]*)\}/);
            if (match) {
              existingHooks = existingHooks.concat(match[1].split(',').map(s => s.trim()).filter(s => s));
            }
          });
        }
        
        const finalHooks = Array.from(new Set([...existingHooks, ...usedHooks]));
        
        // Remove ALL existing react imports
        content = content.replace(/import\s+.*?from\s+['"]react['"];?\n?/g, '');
        
        // Add the fresh, comprehensive import!
        const newImport = `import React, { ${finalHooks.join(', ')} } from 'react';\n`;
        content = newImport + content;
        
        fs.writeFileSync(filePath, content);
        updatedFiles.push(filePath);
      }
    }
  });
});

console.log("UPDATED FILES:");
updatedFiles.forEach(f => console.log(f));
