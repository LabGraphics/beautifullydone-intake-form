const fs = require('fs');

const steps = fs.readdirSync('src/sections').filter(f => f.startsWith('Step'));
steps.forEach(f => {
  let c = fs.readFileSync('src/sections/' + f, 'utf8');
  c = c.replace(/querySelector\('\.error-text'\)/g, "querySelector('.bd-error-text')");
  c = c.replace(/querySelector\('\.soft-warning-text'\)/g, "querySelector('.bd-warning-text')");
  fs.writeFileSync('src/sections/' + f, c);
});

console.log('Query selectors updated');
