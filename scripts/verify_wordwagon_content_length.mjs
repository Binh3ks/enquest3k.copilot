/**
 * verify_wordwagon_content_length.mjs
 *
 * Automated Quality Gate Validator for WordWagonJump (Floor 1 Door 2 / Batch 3).
 * Enforces the "Length-Balanced Invariant" across all rounds:
 *   1. Banner sentence prompt <= 8 words
 *   2. Each wagon choice option <= 2 words
 *   3. Total words per round N <= 14 words
 *
 * Exit code 0: ALL PASS
 * Exit code 1: FAIL (aborts npm run build)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const MAX_BANNER_WORDS = 8;
const MAX_OPTION_WORDS = 2;
const MAX_TOTAL_ROUND_WORDS = 14;

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

console.log('🚂 [WordWagon Content Validator] Checking Length-Balanced Invariant (N <= 14)...');

let totalRoundsChecked = 0;
let violations = [];

// 1. Check DEFAULT_SENTENCES in WordWagonJump.jsx
const wagonFilePath = path.join(ROOT_DIR, 'src/modules/quest/WordWagonJump.jsx');
if (!fs.existsSync(wagonFilePath)) {
  console.error(`❌ File not found: ${wagonFilePath}`);
  process.exit(1);
}

const fileContent = fs.readFileSync(wagonFilePath, 'utf8');

// Extract DEFAULT_SENTENCES block
const defaultSentencesMatch = fileContent.match(/const DEFAULT_SENTENCES = (\[[\s\S]*?\]);\s*export default/);
if (!defaultSentencesMatch) {
  console.error('❌ Could not parse DEFAULT_SENTENCES from WordWagonJump.jsx');
  process.exit(1);
}

let defaultSentences = [];
try {
  // Safe evaluation of the array literal
  const arrayCode = defaultSentencesMatch[1];
  defaultSentences = new Function(`return ${arrayCode};`)();
} catch (err) {
  console.error('❌ Failed to evaluate DEFAULT_SENTENCES array:', err.message);
  process.exit(1);
}

defaultSentences.forEach((sentenceObj, sIdx) => {
  const blankParts = sentenceObj.parts.filter(p => p.isBlank);

  blankParts.forEach((blankPart, bIdx) => {
    totalRoundsChecked++;
    const roundNumber = sIdx * blankParts.length + bIdx + 1;

    // Construct the banner sentence for this blank
    let bannerSentenceParts = [];
    sentenceObj.parts.forEach(p => {
      if (!p.isBlank) {
        bannerSentenceParts.push(p.text);
      } else if (p === blankPart) {
        bannerSentenceParts.push('[ ___ ]');
      } else {
        // Other blank: use its correct answer or placeholder
        bannerSentenceParts.push(p.text || (p.options && p.options[0]) || '[ ___ ]');
      }
    });

    const bannerSentence = bannerSentenceParts.join(' ');
    // Exclude the placeholder '[ ___ ]' when counting English words to read
    const bannerWords = bannerSentence.replace(/\[\s*___\s*\]/g, '').trim().split(/\s+/).filter(Boolean).length;

    const options = blankPart.options || [];
    let optionWordCounts = [];
    let totalOptionWords = 0;

    options.forEach(opt => {
      const wCount = countWords(opt);
      optionWordCounts.push(wCount);
      totalOptionWords += wCount;

      if (wCount > MAX_OPTION_WORDS) {
        violations.push({
          source: `DEFAULT_SENTENCES [Sentence ${sIdx + 1}, Blank ${bIdx + 1} (Round ${roundNumber})]`,
          type: 'OPTION_TOO_LONG',
          detail: `Option "${opt}" has ${wCount} words (Max allowed: ${MAX_OPTION_WORDS})`,
        });
      }
    });

    const totalRoundWords = bannerWords + totalOptionWords;

    if (bannerWords > MAX_BANNER_WORDS) {
      violations.push({
        source: `DEFAULT_SENTENCES [Sentence ${sIdx + 1}, Blank ${bIdx + 1} (Round ${roundNumber})]`,
        type: 'BANNER_TOO_LONG',
        detail: `Banner "${bannerSentence}" has ${bannerWords} words (Max allowed: ${MAX_BANNER_WORDS})`,
      });
    }

    if (totalRoundWords > MAX_TOTAL_ROUND_WORDS) {
      violations.push({
        source: `DEFAULT_SENTENCES [Sentence ${sIdx + 1}, Blank ${bIdx + 1} (Round ${roundNumber})]`,
        type: 'TOTAL_ROUND_WORDS_EXCEEDED',
        detail: `Total words N=${totalRoundWords} (Banner: ${bannerWords}, Options: ${totalOptionWords}) exceeds max ${MAX_TOTAL_ROUND_WORDS}`,
      });
    }

    console.log(`  ✓ Round ${roundNumber}: Banner=${bannerWords}w, Options=[${optionWordCounts.join(', ')}]w, Total N=${totalRoundWords}w <= ${MAX_TOTAL_ROUND_WORDS} (Safety Margin: +${(15.38 - (totalRoundWords * 0.67 + 2.2)).toFixed(2)}s)`);
  });
});

// 2. Scan all weeks in src/data/weeks/*/grammar.js to prevent future content creep
const weeksDir = path.join(ROOT_DIR, 'src/data/weeks');
if (fs.existsSync(weeksDir)) {
  const weekDirs = fs.readdirSync(weeksDir).filter(d => d.startsWith('week_'));

  for (const wDir of weekDirs) {
    const grammarFile = path.join(weeksDir, wDir, 'grammar.js');
    if (fs.existsSync(grammarFile)) {
      const content = fs.readFileSync(grammarFile, 'utf8');
      // Look for examples or exercises that might be passed as grammarSentences
      const promptMatches = content.match(/prompt:\s*["'`](.*?)["'`]/g) || [];
      promptMatches.forEach((pm, idx) => {
        const text = pm.replace(/^prompt:\s*["'`](.*?)["'`]$/, '$1');
        const words = text.replace(/___/g, '').trim().split(/\s+/).filter(Boolean).length;
        if (words > 12) {
          // Warning if raw week grammar sentences are extremely long
          console.warn(`  ⚠️ Warning: ${wDir}/grammar.js exercise ${idx + 1} has ${words} words. Ensure WordWagonJump slices properly.`);
        }
      });
    }
  }
}

// 3. Report Results
console.log('----------------------------------------------------');
if (violations.length > 0) {
  console.error(`❌ [WordWagon Content Validator] FAILED with ${violations.length} violation(s):`);
  violations.forEach((v, i) => {
    console.error(`  [${i + 1}] ${v.source}: ${v.type} — ${v.detail}`);
  });
  console.error('Build aborted: Length-Balanced Invariant (N <= 14) violated!');
  process.exit(1);
} else {
  console.log(`✅ [WordWagon Content Validator] PASSED (${totalRoundsChecked} rounds verified).`);
  console.log('   All rounds strictly comply with: Banner <= 8, Wagon <= 2, Total N <= 14.');
  process.exit(0);
}
