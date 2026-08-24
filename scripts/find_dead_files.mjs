import fs from 'fs';
import path from 'path';

function getSourceFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  for (const item of fs.readdirSync(dir)) {
    const p = path.join(dir, item);
    if (fs.statSync(p).isDirectory()) {
      results = results.concat(getSourceFiles(p));
    } else if (item.endsWith('.jsx') || item.endsWith('.js')) {
      results.push(p);
    }
  }
  return results;
}

const allSrcFiles = getSourceFiles('src');

// Read all imports in all files
const importedFiles = new Set();
// Entry points
importedFiles.add('src/main.jsx');
importedFiles.add('src/index.jsx');
importedFiles.add('src/App.jsx');

const importRegex = /(?:import|from)\s+['"]([^'"]+)['"]/g;
const dynamicImportRegex = /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

for (const file of allSrcFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  let m;
  while ((m = importRegex.exec(content)) !== null) {
    const rel = m[1];
    if (rel.startsWith('.')) {
      const resolved = path.normalize(path.join(path.dirname(file), rel));
      // check .js, .jsx, /index.js, /index.jsx
      for (const ext of ['', '.js', '.jsx', '/index.js', '/index.jsx']) {
        if (fs.existsSync(resolved + ext) && !fs.statSync(resolved + ext).isDirectory()) {
          importedFiles.add(resolved + ext);
        }
      }
    }
  }
}

console.log('=== UNREFERENCED / DEAD COMPONENT FILES IN SRC/ ===');
const deadCandidates = [];
for (const file of allSrcFiles) {
  if (file.startsWith('src/data/')) continue; // data loaded via glob
  if (file.includes('__tests__') || file.includes('.test.')) continue;
  if (!importedFiles.has(file)) {
    // Check if glob imported
    if (file.includes('src/pages/GameHub/games/')) continue;
    deadCandidates.push(file);
  }
}

deadCandidates.forEach(f => console.log('  - ' + f));
console.log(`\nTotal unreferenced component/util files identified: ${deadCandidates.length}`);
