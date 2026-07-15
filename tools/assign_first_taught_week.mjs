/**
 * assign_first_taught_week.mjs
 *
 * Scan ALL weeks (1-35, both ADV + Easy) to find the FIRST week each word
 * appears as a BOLD word (**word**). Assign that as first_taught_week.
 *
 * Also handles non-bold words - finds their first occurrence across any content.
 *
 * Usage: node tools/assign_first_taught_week.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const DICT_PATH = resolve(ROOT, 'src/data/dictionary.json');
const dictionary = JSON.parse(readFileSync(DICT_PATH, 'utf-8'));

console.log('📖 Dictionary loaded:', dictionary.length, 'entries');
const missingWeek = dictionary.filter(e => !e.first_taught_week).length;
console.log('   Missing first_taught_week:', missingWeek, '\n');

// Build lookup: word → first week it appears as BOLD
const boldFirstWeek = {}; // word → week number (bold only)
const anyFirstWeek = {};  // word → week number (any occurrence)

const MAX_WEEK = 35;

for (let week = 1; week <= MAX_WEEK; week++) {
  const paths = [
    // ADV mode
    resolve(ROOT, `src/data/weeks/week_${String(week).padStart(2,'0')}/read.js`),
    resolve(ROOT, `src/data/weeks/week_${week}/read.js`),
    resolve(ROOT, `src/data/weeks/week_${String(week).padStart(2,'0')}/explore.js`),
    resolve(ROOT, `src/data/weeks/week_${week}/explore.js`),
    // Easy mode
    resolve(ROOT, `src/data/weeks_easy/week_${String(week).padStart(2,'0')}/read.js`),
    resolve(ROOT, `src/data/weeks_easy/week_${week}/read.js`),
    resolve(ROOT, `src/data/weeks_easy/week_${String(week).padStart(2,'0')}/explore.js`),
    resolve(ROOT, `src/data/weeks_easy/week_${week}/explore.js`),
    // Legacy single-file format
    resolve(ROOT, `src/data/weeks/week_${week}.js`),
    resolve(ROOT, `src/data/weeks/week_${String(week).padStart(2,'0')}.js`),
  ];
  
  const seen = new Set();
  
  for (const path of paths) {
    if (!existsSync(path) || seen.has(path)) continue;
    seen.add(path);
    
    try {
      const mod = await import(pathToFileURL(path).href + `?t=${Date.now()}`);
      const data = mod.default;
      
      // Collect all content_en fields
      const contents = [];
      if (data?.content_en) contents.push(data.content_en);
      if (data?.sections) {
        data.sections.forEach(s => {
          if (s.content_en) contents.push(s.content_en);
        });
      }
      // Legacy format: read.js might have nested structure
      if (data?.read?.content_en) contents.push(data.read.content_en);
      if (data?.explore?.content_en) contents.push(data.explore.content_en);
      
      for (const content of contents) {
        // Extract BOLD words
        const boldMatches = content.match(/\*\*([\w'-]+)\*\*/g) || [];
        for (const match of boldMatches) {
          const word = match.replace(/\*\*/g, '').toLowerCase();
          if (!boldFirstWeek[word]) {
            boldFirstWeek[word] = week;
          } else {
            boldFirstWeek[word] = Math.min(boldFirstWeek[word], week);
          }
        }
        
        // Extract ALL words (for fallback)
        const allWords = content.replace(/\*\*/g, '').match(/\b[a-z][\w'-]*\b/gi) || [];
        for (const w of allWords) {
          const word = w.toLowerCase();
          if (!anyFirstWeek[word]) {
            anyFirstWeek[word] = week;
          } else {
            anyFirstWeek[word] = Math.min(anyFirstWeek[word], week);
          }
        }
      }
    } catch (err) {
      // Skip
    }
  }
}

console.log(`📊 Bold words mapped: ${Object.keys(boldFirstWeek).length}`);
console.log(`📊 All words mapped: ${Object.keys(anyFirstWeek).length}\n`);

// Update dictionary entries
let updated = 0;
let alreadyHad = 0;
let notFound = 0;

for (const entry of dictionary) {
  if (entry.first_taught_week) {
    alreadyHad++;
    continue;
  }
  
  const word = entry.word.toLowerCase();
  
  // Priority 1: bold occurrence (formally taught)
  if (boldFirstWeek[word]) {
    entry.first_taught_week = boldFirstWeek[word];
    updated++;
  }
  // Priority 2: any content occurrence  
  else if (anyFirstWeek[word]) {
    entry.first_taught_week = anyFirstWeek[word];
    updated++;
  }
  // Priority 3: not found anywhere → assign week 1 (very basic word)
  else {
    // Check if it's a very common English word (function words)
    const veryCommon = ['the', 'a', 'an', 'is', 'are', 'am', 'was', 'were', 'be', 'been', 'being',
      'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'can', 'could', 'should', 'may',
      'might', 'must', 'shall', 'to', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'from', 'about',
      'into', 'through', 'after', 'before', 'above', 'below', 'up', 'down', 'over', 'under',
      'and', 'or', 'but', 'if', 'so', 'yet', 'nor', 'not', 'no', 'yes',
      'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
      'my', 'your', 'his', 'its', 'our', 'their', 'this', 'that', 'these', 'those',
      'what', 'which', 'who', 'how', 'when', 'where', 'why',
    ];
    if (veryCommon.includes(word)) {
      entry.first_taught_week = 1;
      updated++;
    } else {
      notFound++;
    }
  }
}

console.log('✅ Results:');
console.log(`   Already had first_taught_week: ${alreadyHad}`);
console.log(`   Updated: ${updated}`);
console.log(`   Still missing (not in any content): ${notFound}`);

// Save
writeFileSync(DICT_PATH, JSON.stringify(dictionary, null, 2), 'utf-8');
const size = (readFileSync(DICT_PATH).length / 1024).toFixed(1);
console.log(`\n💾 Saved: ${DICT_PATH} (${size} KB, ${dictionary.length} entries)`);
