/**
 * extract_keywords.mjs
 *
 * Extract unique keywords from read.js + explore.js (all weeks ADV + Easy)
 * Output: keywords_extracted.json
 *
 * Rules:
 * - Extract words from content_en field
 * - Include bold words (**word**)
 * - Include other words EXCEPT stopwords
 * - Stopwords: am/is/are/was/were/be/been/being, have/has/had, a/an/the, I/you/he/she/it/we/they
 * - Min word length: 3 characters
 * - Lowercase normalized
 *
 * Usage:
 *   node tools/extract_keywords.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Stopwords to exclude (common function words with no learning value)
// Beginner weeks (Pre-A1): Weeks 1-14
// For these weeks, we DON'T exclude stopwords because students need to learn them
const BEGINNER_WEEKS = new Set(Array.from({length: 14}, (_, i) => i + 1));

// Stopwords to exclude for intermediate+ weeks (15+)
// These are common function words that students should already know by A1 level
const STOPWORDS = new Set([
  // to be
  'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  // to have
  'have', 'has', 'had',
  // articles
  'a', 'an', 'the',
  // pronouns
  'i', 'you', 'he', 'she', 'it', 'we', 'they', 'them', 'their', 'my', 'your', 'his', 'her', 'its', 'our',
  // common prepositions (extremely high frequency)
  'in', 'on', 'at', 'to', 'of', 'for', 'and', 'or', 'but',
  // modal verbs
  'will', 'can', 'could', 'would', 'should', 'may', 'might', 'must',
  // other ultra-common
  'this', 'that', 'these', 'those', 'do', 'does', 'did', 'not', "n't",
]);

const MIN_WORD_LENGTH = 3;
const MAX_WEEK = 30;

const keywordSet = new Set();
const boldWords = new Set();

// Process a text content from a specific week
function extractFromContent(content, week) {
  if (!content) return;
  
  // Check if this is a beginner week (stopwords should NOT be excluded)
  const isBeginner = BEGINNER_WEEKS.has(week);
  // For beginner weeks, allow 1-letter words (I, a)
  const minLength = isBeginner ? 1 : MIN_WORD_LENGTH;
  
  // 1. Extract bold words first (**word**)
  const boldMatches = content.match(/\*\*([\w'-]+)\*\*/g) || [];
  for (const match of boldMatches) {
    const word = match.replace(/\*\*/g, '').toLowerCase();
    // For beginner weeks: include stopwords, for advanced: exclude
    const shouldExclude = !isBeginner && STOPWORDS.has(word);
    if (word.length >= minLength && !shouldExclude) {
      keywordSet.add(word);
      boldWords.add(word);
    }
  }
  
  // 2. Extract all other words (alpha + hyphen + apostrophe)
  const allMatches = content.match(/\b[\w'-]+\b/g) || [];
  for (const word of allMatches) {
    const clean = word.toLowerCase().replace(/^['-]+|['-]+$/g, ''); // trim leading/trailing punctuation
    // For beginner weeks: include stopwords, for advanced: exclude
    const shouldExclude = !isBeginner && STOPWORDS.has(clean);
    if (
      clean.length >= minLength &&
      !shouldExclude &&
      /^[a-z]/.test(clean) // must start with letter
    ) {
      keywordSet.add(clean);
    }
  }
}

// Process weeks
for (let week = 1; week <= MAX_WEEK; week++) {
  const paths = [
    resolve(ROOT, `src/data/weeks/week_${week.toString().padStart(2,'0')}/read.js`),
    resolve(ROOT, `src/data/weeks/week_${week}/read.js`),
    resolve(ROOT, `src/data/weeks_easy/week_${week.toString().padStart(2,'0')}/read.js`),
    resolve(ROOT, `src/data/weeks_easy/week_${week}/read.js`),
    resolve(ROOT, `src/data/weeks/week_${week.toString().padStart(2,'0')}/explore.js`),
    resolve(ROOT, `src/data/weeks/week_${week}/explore.js`),
    resolve(ROOT, `src/data/weeks_easy/week_${week.toString().padStart(2,'0')}/explore.js`),
    resolve(ROOT, `src/data/weeks_easy/week_${week}/explore.js`),
  ];
  
  const seen = new Set();
  for (const path of paths) {
    if (!existsSync(path) || seen.has(path)) continue;
    seen.add(path);
    
    try {
      const mod = await import(pathToFileURL(path).href + `?t=${Date.now()}`);
      const data = mod.default;
      
      // read.js
      if (data?.content_en) {
        extractFromContent(data.content_en, week);
      }
      
      // explore.js (multiple sections)
      if (data?.sections) {
        for (const section of data.sections) {
          if (section.content_en) extractFromContent(section.content_en, week);
          if (section.description) extractFromContent(section.description, week);
        }
      }
    } catch (err) {
      console.warn(`⚠️  Import error ${path}: ${err.message}`);
    }
  }
}

// Output
const sortedKeywords = Array.from(keywordSet).sort();
const output = {
  total: sortedKeywords.length,
  bold_count: boldWords.size,
  keywords: sortedKeywords,
  bold_keywords: Array.from(boldWords).sort(),
};

const outPath = resolve(ROOT, 'tools/keywords_extracted.json');
writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');

console.log(`✅ Extracted ${sortedKeywords.length} unique keywords`);
console.log(`   📌 ${boldWords.size} bold keywords`);
console.log(`   📝 ${sortedKeywords.length - boldWords.size} other keywords`);
console.log(`   💾 Saved to tools/keywords_extracted.json`);
