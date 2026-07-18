const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
};

const files = walk('./src');
let updatedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  content = content.replace(/fetch\(`\$\{import\.meta\.env\.VITE_API_URL \|\| ""\}\/api\/([^'"`\s\?\)]+)['"]/g, 'fetch(`${import.meta.env.VITE_API_URL || ""}/api/$1`');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    updatedCount++;
    console.log('Fixed syntax in', file);
  }
});
console.log('Total fixed files:', updatedCount);
