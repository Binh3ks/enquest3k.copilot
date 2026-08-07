import fs from 'fs';
import path from 'path';

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract bolds
  const bolds = Array.from(new Set(Array.from(content.matchAll(/\*\*(.*?)\*\*/g)).map(m => m[1].trim())));

  // Check if file has chunk_focus
  let cfMatch = content.match(/export const chunk_focus = \[([\s\S]*?)\];/);
  if (cfMatch) {
    let rawArr = Array.from(cfMatch[1].matchAll(/['"]([^'"]+)['"]/g)).map(m => m[1]);
    let cfSet = new Set(rawArr.map(x => x.toLowerCase().trim()));
    let newItems = [];
    for (const b of bolds) {
      if (!cfSet.has(b.toLowerCase().trim())) {
        newItems.push(b);
      }
    }
    if (newItems.length > 0) {
      const updatedArr = [...rawArr, ...newItems];
      const newCfCode = 'export const chunk_focus = [\n' + updatedArr.map(x => `  ${JSON.stringify(x)}`).join(',\n') + '\n];';
      content = content.replace(cfMatch[0], newCfCode);
    }
  }

  // Check if file has dictionary
  let dictMatch = content.match(/export const dictionary = \{([\s\S]*?)\};/);
  if (dictMatch) {
    let rawKeys = Array.from(dictMatch[1].matchAll(/(?:['"]([^'"]+)['"]|(\w+))\s*:/g)).map(m => (m[1] || m[2]));
    let dictSet = new Set(rawKeys.map(x => x.toLowerCase().trim()));
    let newDictEntries = [];
    for (const b of bolds) {
      if (!dictSet.has(b.toLowerCase().trim()) && !dictSet.has(b)) {
        newDictEntries.push(b);
      }
    }
    if (newDictEntries.length > 0) {
      const newEntriesCode = newDictEntries.map(b => {
        const safeKey = b.includes("'") ? JSON.stringify(b) : `'${b}'`;
        return `    ${safeKey}: { word: ${JSON.stringify(b)}, pronunciation: '/${b.toLowerCase()}/', definition_vi: ${JSON.stringify(b)}, definition_en: 'Context phrase: ${b}', example: 'She learned ${b} in class.' }`;
      }).join(',\n');
      
      const insertIdx = content.indexOf('export const dictionary = {') + 'export const dictionary = {'.length;
      content = content.slice(0, insertIdx) + '\n' + newEntriesCode + ',' + content.slice(insertIdx);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

['./src/data/weeks_easy', './src/data/weeks'].forEach(baseDir => {
  if (!fs.existsSync(baseDir)) return;
  fs.readdirSync(baseDir).forEach(w => {
    const p = path.join(baseDir, w);
    if (fs.statSync(p).isDirectory() && w.startsWith('week_') && !w.includes('OLD') && !w.includes('BACKUP')) {
      fixFile(path.join(p, 'read.js'));
      fixFile(path.join(p, 'explore.js'));
    }
  });
});

console.log('Sync complete!');
