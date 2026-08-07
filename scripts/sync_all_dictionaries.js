import fs from 'fs';
import path from 'path';

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let text = fs.readFileSync(filePath, 'utf8');

  // Extract all bold phrases from whole file
  const bolds = Array.from(new Set(
    Array.from(text.matchAll(/\*\*(.*?)\*\*/g))
      .map(m => m[1].trim())
      .filter(b => b && !b.includes('\n') && b.length < 100)
  ));

  if (bolds.length === 0) return;

  // 1. Handle chunk_focus if present
  if (text.includes('export const chunk_focus =')) {
    const cfMatch = text.match(/export const chunk_focus = \[([\s\S]*?)\];/);
    if (cfMatch) {
      const existingItems = Array.from(cfMatch[1].matchAll(/['"]([^'"]+)['"]/g))
        .map(m => m[1].trim())
        .filter(x => x && !x.includes('\n'));
      
      const set = new Set(existingItems.map(x => x.toLowerCase()));
      const toAdd = bolds.filter(b => !set.has(b.toLowerCase()));
      
      if (toAdd.length > 0) {
        const finalArr = Array.from(new Set([...existingItems, ...toAdd]));
        const formattedCf = `export const chunk_focus = [\n` +
          finalArr.map(item => `  ${JSON.stringify(item)}`).join(',\n') +
          `\n];`;
        text = text.replace(/export const chunk_focus = \[[\s\S]*?\];/, formattedCf);
      }
    }
  }

  // 2. Handle dictionary if present
  if (text.includes('export const dictionary =')) {
    const dictMatch = text.match(/export const dictionary = \{([\s\S]*?)\};/);
    if (dictMatch) {
      const dictContent = dictMatch[1];
      const existingKeys = Array.from(dictContent.matchAll(/(?:['"]([^'"]+)['"]|([a-zA-Z0-9_\-\s]+))\s*:/g))
        .map(m => (m[1] || m[2]).trim())
        .filter(Boolean);

      const set = new Set(existingKeys.map(x => x.toLowerCase()));
      const toAdd = bolds.filter(b => !set.has(b.toLowerCase()));

      if (toAdd.length > 0) {
        const newEntries = toAdd.map(b => {
          const keyStr = JSON.stringify(b);
          return `  ${keyStr}: {\n    word: ${keyStr},\n    pronunciation: "/${b.toLowerCase()}/",\n    definition_vi: ${keyStr},\n    definition_en: "Context phrase: ${b}",\n    example: "We practiced ${b} today."\n  }`;
        }).join(',\n');

        const updatedDict = `export const dictionary = {\n${dictContent.trim()},\n${newEntries}\n};`;
        text = text.replace(/export const dictionary = \{[\s\S]*?\};/, updatedDict);
      }
    }
  }

  fs.writeFileSync(filePath, text, 'utf8');
}

['./src/data/weeks_easy', './src/data/weeks'].forEach(baseDir => {
  if (!fs.existsSync(baseDir)) return;
  fs.readdirSync(baseDir).forEach(w => {
    const p = path.join(baseDir, w);
    if (fs.statSync(p).isDirectory() && w.startsWith('week_') && !w.includes('OLD') && !w.includes('BACKUP')) {
      processFile(path.join(p, 'read.js'));
      processFile(path.join(p, 'explore.js'));
    }
  });
});

console.log('Clean sync completed!');
