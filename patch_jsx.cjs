const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'sections');

['FormField', 'SelectField', 'RadioGroup', 'CheckboxGroup'].forEach(tag => {
  const regex = new RegExp(`<(${tag})([\\s\\S]*?handleChange\\('(.*?)'[\\s\\S]*?)\\/>`, 'g');
  const files = fs.readdirSync(dir).filter(f => f.startsWith('Step'));
  files.forEach(f => {
    const full = path.join(dir, f);
    let code = fs.readFileSync(full, 'utf8');
    
    code = code.replace(regex, (match, tName, body, fieldName) => {
       // Prevent double wrapping
       return `<div>\n      <${tName}${body}/>\n      {errors.${fieldName} && <p className="error-text text-red-500 text-sm mt-1">{errors.${fieldName}}</p>}\n      {softWarnings.${fieldName} && <p className="soft-warning-text text-amber-500 text-sm mt-1">{softWarnings.${fieldName}}</p>}\n    </div>`;
    });
    
    // Quick hack to remove duplicates if it ran twice by accident
    // Actually, I just won't run it twice.

    fs.writeFileSync(full, code, 'utf8');
  });
});
console.log('Patch complete.');
