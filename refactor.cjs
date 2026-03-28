const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const sectionsDir = path.join(srcDir, 'sections');

// 1. Move and update the store file
const storeDir = path.join(srcDir, 'store');
if (!fs.existsSync(storeDir)) {
  fs.mkdirSync(storeDir, { recursive: true });
}

const oldStorePath = path.join(srcDir, 'data', 'useIntakeStore.js');
const newStorePath = path.join(storeDir, 'formStore.js');

if (fs.existsSync(oldStorePath)) {
  let storeContent = fs.readFileSync(oldStorePath, 'utf-8');
  storeContent = storeContent.replace('const useIntakeStore = create', 'export const useFormStore = create');
  storeContent = storeContent.replace('export default useIntakeStore;', '');
  fs.writeFileSync(newStorePath, storeContent, 'utf-8');
  fs.unlinkSync(oldStorePath);
}

// 2. Update all .jsx files in src/sections
const files = fs.readdirSync(sectionsDir);
files.forEach(file => {
  if (file.endsWith('.jsx')) {
    const filePath = path.join(sectionsDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace import
    content = content.replace(
      "import useIntakeStore from '../data/useIntakeStore';", 
      "import { useFormStore } from '../store/formStore';"
    );
    
    // Replace hook usage
    content = content.replace(/useIntakeStore/g, "useFormStore");
    
    fs.writeFileSync(filePath, content, 'utf-8');
  }
});

console.log('Refactoring complete!');
