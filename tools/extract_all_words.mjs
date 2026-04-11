/**
 * extract_all_words.mjs
 *
 * Extract ALL unique words from read.js + explore.js (all weeks ADV + Easy)
 * NO FILTERS - extract everything to see what's missing
 *
 * Usage:
 *   node tools/extract_all_words.mjs
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Load dictionary
const DICT_PATH = resolve(ROOT, 'src/data/dictionary.json');
const dictionary = JSON.parse(readFileSync(DICT_PATH, 'utf-8'));
const dictWords = new Set(dictionary.map(e => e.word.toLowerCase()));

console.log('📖 Dictionary loaded:', dictionary.length, 'entries\n');

const allWords = new Set();
const boldWords = new Set();

async function extractFromFile(filePath, weekNum) {
  try {
    const module = await import(pathToFileURL(filePath).href);
    const data = module.default;
    
    // Extract from content_en
    const content = data.content_en || data.sections?.[0]?.content_en || '';
    if (!content) return;
    
    // Extract all words (with and without bold markers)
    const text = content.replace(/\*\*/g, ''); // Remove bold markers for word extraction
    const words = text.match(/[\w'-]+/g) || [];
    
    // Also track bold words separately
    const boldMatches = content.match(/\*\*(\w+)\*\*/g) || [];
    boldMatches.forEach(m => {
      const word = m.replace(/\*\*/g, '').toLowerCase();
      boldWords.add(word);
    });
    
    words.forEach(w => {
      const lower = w.toLowerCase();
      if (lower.length >= 2) { // Min 2 chars
        allWords.add(lower);
      }
    });
  } catch (err) {
    // Skip files that can't be loaded
  }
}

async function scanWeeks() {
  // Scan both normal and easy weeks
  const weeksPaths = [
    resolve(ROOT, 'src/data/weeks'),
    resolve(ROOT, 'src/data/weeks_easy')
  ];
  
  for (const weeksPath of weeksPaths) {
    if (!existsSync(weeksPath)) continue;
    
    const weekFolders = readdirSync(weeksPath, { withFileTypes: true })
      .filter(d => d.isDirectory() && d.name.match(/^week_\d+$/))
      .map(d => d.name);
    
    for (const folder of weekFolders) {
      const weekNum = parseInt(folder.replace('week_', ''));
      const weekPath = resolve(weeksPath, folder);
      
      // Try read.js and explore.js
      for (const filename of ['read.js', 'explore.js']) {
        const filePath = resolve(weekPath, filename);
        if (existsSync(filePath)) {
          await extractFromFile(filePath, weekNum);
        }
      }
    }
  }
}

await scanWeeks();

console.log('📊 Extraction Results:');
console.log('   Total unique words found:', allWords.size);
console.log('   Bold words:', boldWords.size);
console.log('   Words in dictionary:', dictWords.size);

// Find missing words
const missing = [...allWords].filter(w => !dictWords.has(w));
console.log('   ❌ Missing from dictionary:', missing.length);

if (missing.length > 0) {
  console.log('\n📝 Sample missing words (first 50):');
  missing.slice(0, 50).sort().forEach((w, i) => {
    const isBold = boldWords.has(w);
    console.log(`   ${(i+1).toString().padStart(2)}. ${w}${isBold ? ' ⭐' : ''}`);
  });
  
  console.log('\n💾 Full list saved to: tools/missing_words.txt');
  writeFileSync(
    resolve(ROOT, 'tools/missing_words.txt'),
    missing.sort().join('\n'),
    'utf-8'
  );
}

console.log('\n✅ Done!');
