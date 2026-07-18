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
  
  content = content.replace(/fetch\(\s*['"]\/api\//g, 'fetch(`${import.meta.env.VITE_API_URL || ""}/api/');
  content = content.replace(/fetch\(\s*`\/api\//g, 'fetch(`${import.meta.env.VITE_API_URL || ""}/api/');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    updatedCount++;
    console.log('Updated', file);
  }
});
console.log('Total updated files:', updatedCount);
