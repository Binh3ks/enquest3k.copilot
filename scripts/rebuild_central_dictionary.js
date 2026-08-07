import fs from 'fs';
import path from 'path';

const dictPath = './src/data/dictionary.json';
const dictData = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

// Build lookup set of existing keys
const dictMap = new Map();
dictData.forEach(entry => {
  if (entry.word) {
    dictMap.set(entry.word.toLowerCase().trim(), entry);
  }
});

function normalize(str = '') {
  return str.toLowerCase().replace(/[^a-z0-9\s'-]/g, ' ').replace(/\s+/g, ' ').trim();
}

function processWeekFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract exported dictionary object
  const dictMatch = content.match(/export const dictionary = (\{[\s\S]*?\});/);
  if (dictMatch) {
    try {
      // Evaluate or extract key-value pairs
      const rawObjCode = dictMatch[1];
      // Regex match keys and object bodies
      const entries = Array.from(rawObjCode.matchAll(/['"]([^'"]+)['"]\s*:\s*\{([\s\S]*?)\}/g));
      entries.forEach(m => {
        const key = m[1].trim();
        const body = m[2];

        const wordM = body.match(/word:\s*['"]([^'"]+)['"]/);
        const pronM = body.match(/pronunciation:\s*['"]([^'"]+)['"]/);
        const defViM = body.match(/definition_vi:\s*['"]([^'"]+)['"]/);
        const defEnM = body.match(/definition_en:\s*['"]([^'"]+)['"]/);
        const exM = body.match(/example:\s*['"]([^'"]+)['"]/);

        const word = wordM ? wordM[1] : key;
        const normKey = normalize(word);

        if (!dictMap.has(normKey) || !dictMap.get(normKey).meaning) {
          const newEntry = {
            word: word,
            ipa: pronM ? pronM[1] : `/${normKey}/`,
            meaning: defViM ? defViM[1] : (defEnM ? defEnM[1] : word),
            example: exM ? exM[1] : `We learned ${word}.`,
            part_of_speech: 'phrase',
            type: 'phrase'
          };
          dictMap.set(normKey, newEntry);
        } else {
          // Update meaning if missing diacritics or incomplete
          const existing = dictMap.get(normKey);
          if (defViM && defViM[1] && (!existing.meaning || existing.meaning === word)) {
            existing.meaning = defViM[1];
          }
        }
      });
    } catch(e) {
      console.error('Error parsing dictionary in', filePath, e);
    }
  }

  // Also check all bolds in content_en
  const bolds = Array.from(new Set(Array.from(content.matchAll(/\*\*(.*?)\*\*/g)).map(m => m[1].trim())));
  bolds.forEach(b => {
    const normKey = normalize(b);
    if (b && !dictMap.has(normKey)) {
      dictMap.set(normKey, {
        word: b,
        ipa: `/${normKey}/`,
        meaning: b,
        example: `We learned ${b}.`,
        part_of_speech: 'phrase',
        type: 'phrase'
      });
    }
  });
}

['./src/data/weeks_easy', './src/data/weeks'].forEach(baseDir => {
  if (!fs.existsSync(baseDir)) return;
  fs.readdirSync(baseDir).forEach(w => {
    const p = path.join(baseDir, w);
    if (fs.statSync(p).isDirectory() && w.startsWith('week_') && !w.includes('OLD') && !w.includes('BACKUP')) {
      processWeekFile(path.join(p, 'read.js'));
      processWeekFile(path.join(p, 'explore.js'));
    }
  });
});

const updatedDictArray = Array.from(dictMap.values());
fs.writeFileSync(dictPath, JSON.stringify(updatedDictArray, null, 2), 'utf8');
console.log(`Rebuilt central dictionary.json: ${updatedDictArray.length} entries!`);
