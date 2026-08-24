import fs from 'fs';
import path from 'path';

// 1. Scan duplicate filenames between src/data/weeks and src/data/weeks_easy
const weeksDir = 'src/data/weeks';
const weeksEasyDir = 'src/data/weeks_easy';

function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  for (const item of fs.readdirSync(dir)) {
    const p = path.join(dir, item);
    if (fs.statSync(p).isDirectory()) {
      results = results.concat(getFiles(p));
    } else {
      results.push(p);
    }
  }
  return results;
}

const weeksFiles = getFiles(weeksDir);
const weeksEasyFiles = getFiles(weeksEasyDir);

console.log('=== DATA DUPLICATION AUDIT (weeks vs weeks_easy) ===');
console.log(`Files in src/data/weeks: ${weeksFiles.length}`);
console.log(`Files in src/data/weeks_easy: ${weeksEasyFiles.length}`);

const easyWeeksPresent = fs.readdirSync(weeksEasyDir).filter(f => fs.statSync(path.join(weeksEasyDir, f)).isDirectory());
console.log(`Folders in weeks_easy: ${easyWeeksPresent.join(', ')}`);

// Check component duplication
console.log('\n=== COMPONENT DUPLICATION AUDIT (components vs modules) ===');
const componentFiles = getFiles('src/components');
const moduleFiles = getFiles('src/modules');

const getBaseName = p => path.basename(p);
const compMap = new Map();
componentFiles.forEach(f => {
  const b = getBaseName(f);
  if (b.endsWith('.jsx') || b.endsWith('.js')) {
    if (!compMap.has(b)) compMap.set(b, []);
    compMap.get(b).push(f);
  }
});

moduleFiles.forEach(f => {
  const b = getBaseName(f);
  if (b.endsWith('.jsx') || b.endsWith('.js')) {
    if (!compMap.has(b)) compMap.set(b, []);
    compMap.get(b).push(f);
  }
});

let duplicatesFound = 0;
for (const [basename, paths] of compMap.entries()) {
  if (paths.length > 1) {
    console.log(`Duplicate component name: "${basename}" (${paths.length} occurrences):`);
    paths.forEach(p => console.log(`  - ${p}`));
    duplicatesFound++;
  }
}
if (duplicatesFound === 0) {
  console.log('✅ No duplicate component filenames found between src/components and src/modules.');
}

