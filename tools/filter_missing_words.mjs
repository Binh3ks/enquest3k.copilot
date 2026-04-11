/**
 * filter_missing_words.mjs
 *
 * Filter missing words to get real vocabulary that needs dictionary entries
 *
 * Skip:
 * - Numbers (000, 100, 12, etc.)
 * - Artifacts with quotes ('a, 'the, etc.)
 * - Very short words (< 2 chars)
 * - Nonsense syllables (bo, da, ho, kh, nh, ng)
 *
 * Keep:
 * - Grammar focus words (was, were, had, did, been, being, could, would, might)
 * - Compound words (adventure-filled, knife-like)
 * - Common words (by, if, those, oh)
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const missingWords = readFileSync(resolve(ROOT, 'tools/missing_words.txt'), 'utf-8')
  .split('\n')
  .filter(w => w.trim());

console.log('📋 Missing words:', missingWords.length);

// Filter out artifacts and numbers
const filtered = missingWords.filter(w => {
  // Skip words with leading quote (artifacts)
  if (w.startsWith("'")) return false;
  
  // Skip words with trailing quote (artifacts)
  if (w.endsWith("'")) return false;
  
  // Skip pure numbers
  if (/^\d+$/.test(w)) return false;
  
  // Skip numbers with s (1890s)
  if (/^\d+s$/.test(w)) return false;
  
  // Skip very short nonsense (< 2 chars)
  if (w.length < 2) return false;
  
  // Skip specific nonsense syllables
  if (['bo', 'da', 'ho', 'kh', 'nh', 'ng', '-ed'].includes(w)) return false;
  
  return true;
});

console.log('✅ Filtered to:', filtered.length, 'real words\n');

// Categorize by priority
const grammarWords = filtered.filter(w => 
  ['was', 'were', 'been', 'being', 'had', 'did', 'could', 'would', 'might', 'if', 'those', 'its', 'by'].includes(w)
);

const compoundWords = filtered.filter(w => w.includes('-'));
const otherWords = filtered.filter(w => 
  !grammarWords.includes(w) && !compoundWords.includes(w)
);

console.log('📊 Categories:');
console.log('   Grammar/function words:', grammarWords.length);
grammarWords.forEach(w => console.log('      -', w));

console.log('\n   Compound words:', compoundWords.length);
compoundWords.forEach(w => console.log('      -', w));

console.log('\n   Other words:', otherWords.length);
otherWords.forEach(w => console.log('      -', w));

console.log('\n💾 Saving filtered list...');
writeFileSync(
  resolve(ROOT, 'tools/missing_words_filtered.json'),
  JSON.stringify(filtered, null, 2),
  'utf-8'
);

console.log('✅ Done! Saved to: tools/missing_words_filtered.json');
