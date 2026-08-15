import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const dictPath = path.join(rootDir, 'src/data/dictionary.json');
const masterDictPath = path.join(rootDir, 'src/data/weeks/week_33/vocab_dictionary_master.js');

const dictionaryData = JSON.parse(fs.readFileSync(dictPath, 'utf8'));
const masterDictContent = fs.readFileSync(masterDictPath, 'utf8');

// Load baseDict
const baseDict = Object.fromEntries(
  dictionaryData.map(e => [(e.word || '').toLowerCase().trim(), e])
);

console.log(`Loaded ${Object.keys(baseDict).length} items from dictionary.json`);

// Read week 33 files
const w33Files = [
  'src/data/weeks/week_33/read.js',
  'src/data/weeks/week_33/reading_hub.js',
  'src/data/weeks/week_33/listening_hub.js',
  'src/data/weeks/week_33/vocab.js',
  'src/data/weeks/week_33/vocab_dictionary_master.js'
];

let allText = '';
w33Files.forEach(f => {
  const p = path.join(rootDir, f);
  if (fs.existsSync(p)) {
    allText += ' ' + fs.readFileSync(p, 'utf8');
  }
});

// Extract all english words
const words = Array.from(new Set(allText.match(/[a-zA-Z]{3,}/g) || []))
  .map(w => w.toLowerCase())
  .filter(w => !['const', 'export', 'import', 'default', 'return', 'from', 'true', 'false', 'null', 'undefined', 'function', 'array', 'string'].includes(w));

console.log(`Found ${words.length} unique words across Week 33 data files`);

const missing = [];
words.forEach(w => {
  const hasBase = baseDict[w] && (baseDict[w].meaning || baseDict[w].definition_vi || baseDict[w].definition);
  const hasMaster = masterDictContent.includes(`"${w}"`) || masterDictContent.includes(`'${w}'`);
  if (!hasBase && !hasMaster) {
    missing.push(w);
  }
});

console.log(`\n=== MISSING DICTIONARY ENTRIES (${missing.length}) ===`);
console.log(missing.join(', '));
