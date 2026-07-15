#!/usr/bin/env node
/**
 * generate_ipa.mjs — Generate word-level IPA data for all shadowing scripts.
 *
 * Usage:
 *   node tools/generate_ipa.mjs              # Generate for all weeks
 *   node tools/generate_ipa.mjs 1            # Generate for week 1 only
 *   node tools/generate_ipa.mjs --report     # Print coverage report only
 *
 * Output: src/data/weeks/week_XX/shadowing_ipa.js (and weeks_easy)
 *
 * Uses CMU Pronouncing Dictionary (ARPAbet) → IPA conversion.
 */

import { CMUDict } from 'cmudict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ─── ARPAbet → IPA mapping ──────────────────────────────────────────────────

// Base IPA values WITHOUT stress markers — stress is added at the syllable level
const ARPABET_TO_IPA = {
  // Vowels
  'AA': 'ɑː', 'AA0': 'ɑ', 'AA1': 'ɑː', 'AA2': 'ɑː',
  'AE': 'æ',  'AE0': 'æ', 'AE1': 'æ',  'AE2': 'æ',
  'AH': 'ʌ',  'AH0': 'ə', 'AH1': 'ʌ',  'AH2': 'ʌ',
  'AO': 'ɔː', 'AO0': 'ɔ', 'AO1': 'ɔː', 'AO2': 'ɔː',
  'AW': 'aʊ', 'AW0': 'aʊ','AW1': 'aʊ', 'AW2': 'aʊ',
  'AY': 'aɪ', 'AY0': 'aɪ','AY1': 'aɪ', 'AY2': 'aɪ',
  'EH': 'ɛ',  'EH0': 'ɛ', 'EH1': 'ɛ',  'EH2': 'ɛ',
  'ER': 'ɝː', 'ER0': 'ɚ','ER1': 'ɝː', 'ER2': 'ɝː',
  'EY': 'eɪ', 'EY0': 'eɪ','EY1': 'eɪ', 'EY2': 'eɪ',
  'IH': 'ɪ',  'IH0': 'ɪ', 'IH1': 'ɪ',  'IH2': 'ɪ',
  'IY': 'iː', 'IY0': 'i', 'IY1': 'iː', 'IY2': 'iː',
  'OW': 'oʊ', 'OW0': 'oʊ','OW1': 'oʊ', 'OW2': 'oʊ',
  'OY': 'ɔɪ', 'OY0': 'ɔɪ','OY1': 'ɔɪ', 'OY2': 'ɔɪ',
  'UH': 'ʊ',  'UH0': 'ʊ', 'UH1': 'ʊ',  'UH2': 'ʊ',
  'UW': 'uː', 'UW0': 'u', 'UW1': 'uː', 'UW2': 'uː',
  // Consonants
  'B':  'b',  'CH': 'tʃ', 'D':  'd',  'DH': 'ð',
  'F':  'f',  'G':  'ɡ',  'HH': 'h',  'JH': 'dʒ',
  'K':  'k',  'L':  'l',  'M':  'm',  'N':  'n',
  'NG': 'ŋ',  'P':  'p',  'R':  'ɹ',  'S':  's',
  'SH': 'ʃ',  'T':  't',  'TH': 'θ',  'V':  'v',
  'W':  'w',  'Y':  'j',  'Z':  'z',  'ZH': 'ʒ',
};

// Function words that should NOT be stressed in display
const FUNCTION_WORDS = new Set([
  'a', 'an', 'the', 'this', 'that', 'these', 'those',
  'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'having',
  'do', 'does', 'did',
  'will', 'would', 'shall', 'should',
  'can', 'could', 'may', 'might', 'must',
  'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from',
  'up', 'about', 'into', 'through', 'during', 'before', 'after',
  'and', 'but', 'or', 'nor', 'not', 'so', 'yet', 'both', 'either', 'neither',
  'if', 'then', 'else', 'when', 'while', 'where', 'how', 'what', 'which',
  'who', 'whom', 'whose', 'why',
  'it', 'its', 'i', 'me', 'my', 'mine', 'myself',
  'you', 'your', 'yours', 'yourself',
  'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself',
  'we', 'us', 'our', 'ours', 'ourselves',
  'they', 'them', 'their', 'theirs', 'themselves',
  'there', 'here',
  'just', 'also', 'very', 'too', 'only', 'even', 'still', 'already',
  'no', 'nor',  'any', 'some', 'all', 'each', 'every', 'much', 'more', 'most',
  'own', 'other', 'another', 'such',
]);

// ─── CMU → IPA conversion ───────────────────────────────────────────────────

function cmuToIpa(cmuString) {
  if (!cmuString) return null;

  const tokens = cmuString.split(/\s+/);
  const syllables = []; // Array of { ipa: string, stress: number }
  let currentSyllable = { ipa: '', stress: 0 };

  for (const token of tokens) {
    const base = token.replace(/[012]$/, '');
    const stressDigit = token.slice(-1);
    const hasStress = ['0', '1', '2'].includes(stressDigit) ? parseInt(stressDigit) : 0;

    const ipa = ARPABET_TO_IPA[token] || ARPABET_TO_IPA[base];

    if (ipa) {
      // Vowels start a new syllable
      const isVowel = ['AA', 'AE', 'AH', 'AO', 'AW', 'AY', 'EH', 'ER', 'EY',
                        'IH', 'IY', 'OW', 'OY', 'UH', 'UW'].includes(base);
      if (isVowel && currentSyllable.ipa) {
        syllables.push({ ...currentSyllable });
        currentSyllable = { ipa: '', stress: hasStress };
      } else if (isVowel) {
        currentSyllable = { ipa: '', stress: hasStress };
      }
      currentSyllable.ipa += ipa;
    }
  }
  if (currentSyllable.ipa) syllables.push(currentSyllable);

  // Build IPA string with stress markers on the correct syllable
  let ipaStr = '';
  for (const syl of syllables) {
    if (syl.stress === 1) ipaStr += 'ˈ';
    else if (syl.stress === 2) ipaStr += 'ˌ';
    ipaStr += syl.ipa;
  }

  // Determine overall stress level
  const maxStress = syllables.reduce((max, s) => Math.max(max, s.stress), 0);

  return {
    ipa: '/' + ipaStr + '/',
    stress: maxStress,
    syllableCount: syllables.length,
  };
}

// ─── Word lookup ─────────────────────────────────────────────────────────────

function cleanWord(word) {
  return word.replace(/[^a-zA-Z']/g, '').toLowerCase();
}

function lookupWord(word, dict) {
  const cleaned = cleanWord(word);
  if (!cleaned) return null;

  // Special-case articles: CMU "A" → "EY0" (letter name), but article → schwa
  if (cleaned === 'a') {
    return { ipa: '/ə/', stress: 0, syllableCount: 1 };
  }

  // Try CMU dict (case-insensitive — CMU stores uppercase)
  let cmuResult = null;
  try {
    cmuResult = dict.get(cleaned.toUpperCase());
  } catch {
    // word not in dict
  }

  if (cmuResult) {
    return cmuToIpa(cmuResult);
  }

  // Try with common variations
  // Remove trailing 's' for plurals, 'ed' for past, 'ing' for gerund
  // (simple fallback — not comprehensive)
  const variations = [
    cleaned.replace(/'s$/, ''),
    cleaned.replace(/s$/, ''),
    cleaned.replace(/ed$/, ''),
    cleaned.replace(/ing$/, ''),
    cleaned.replace(/ly$/, ''),
    cleaned.replace(/er$/, ''),
    cleaned.replace(/est$/, ''),
  ];

  for (const v of variations) {
    if (v === cleaned) continue;
    try {
      const r = dict.get(v.toUpperCase());
      if (r) {
        const base = cmuToIpa(r);
        // If we removed an 's', note it but return base IPA
        // (imperfect but better than no IPA)
        return base;
      }
    } catch {
      continue;
    }
  }

  return null; // Unknown word — UI will hide IPA
}

// ─── Sentence processing ─────────────────────────────────────────────────────

function processSentence(text, dict) {
  // Split into tokens preserving punctuation attachment
  // "Hello, world!" → ["Hello,", "world!"]
  const tokens = text.split(/\s+/);

  return tokens.map(token => {
    const cleaned = cleanWord(token);
    if (!cleaned) {
      return { word: token, ipa: null, stress: 0 };
    }

    const result = lookupWord(token, dict);
    const isFunction = FUNCTION_WORDS.has(cleaned);

    if (result) {
      return {
        word: token,
        ipa: result.ipa,
        stress: isFunction ? 0 : result.stress, // Force function words to stress 0
      };
    }

    // Unknown word
    return { word: token, ipa: null, stress: 0 };
  });
}

// ─── Main ────────────────────────────────────────────────────────────────────

function loadShadowingData(filePath) {
  // Read the JS file and extract the export via regex (avoids import issues)
  const content = fs.readFileSync(filePath, 'utf8');

  // Try to find the script/sentences array
  // Pattern: script: [...] or sentences: [...]
  const scriptMatch = content.match(/script:\s*\[([\s\S]*?)\]\s*[,\n]/);
  const sentencesMatch = content.match(/sentences:\s*\[([\s\S]*?)\]\s*[,\n]/);

  const arrayStr = scriptMatch ? scriptMatch[1] : sentencesMatch ? sentencesMatch[1] : null;
  if (!arrayStr) return [];

  // Extract id and text from each entry
  const entries = [];
  const entryRegex = /\{\s*id:\s*(\d+)\s*,\s*text:\s*["'`](.+?)["'`]/g;
  let match;
  while ((match = entryRegex.exec(arrayStr))) {
    entries.push({ id: parseInt(match[1]), text: match[2] });
  }

  return entries;
}

function processWeek(weekNum, mode, dict) {
  const modeDir = mode === 'easy' ? 'weeks_easy' : 'weeks';
  const weekDir = `week_${String(weekNum).padStart(2, '0')}`;
  const filePath = path.join(ROOT, 'src', 'data', modeDir, weekDir, 'shadowing.js');

  if (!fs.existsSync(filePath)) return null;

  const sentences = loadShadowingData(filePath);
  if (sentences.length === 0) return null;

  const ipaData = {};
  let totalWords = 0;
  let wordsWithIpa = 0;

  for (const sentence of sentences) {
    const wordData = processSentence(sentence.text, dict);
    ipaData[sentence.id] = wordData;

    for (const w of wordData) {
      totalWords++;
      if (w.ipa) wordsWithIpa++;
    }
  }

  return { ipaData, totalWords, wordsWithIpa, sentenceCount: sentences.length };
}

function writeIpaFile(weekNum, mode, ipaData) {
  const modeDir = mode === 'easy' ? 'weeks_easy' : 'weeks';
  const weekDir = `week_${String(weekNum).padStart(2, '0')}`;
  const outPath = path.join(ROOT, 'src', 'data', modeDir, weekDir, 'shadowing_ipa.js');

  // Generate JS file
  let output = 'export default {\n';

  for (const [sentenceId, words] of Object.entries(ipaData)) {
    output += `  ${sentenceId}: [\n`;
    for (const w of words) {
      const ipaStr = w.ipa ? `"${w.ipa}"` : 'null';
      output += `    { word: ${JSON.stringify(w.word)}, ipa: ${ipaStr}, stress: ${w.stress} },\n`;
    }
    output += '  ],\n';
  }

  output += '};\n';

  fs.writeFileSync(outPath, output, 'utf8');
  return outPath;
}

function main() {
  const args = process.argv.slice(2);
  const reportOnly = args.includes('--report');
  const weekArg = args.find(a => /^\d+$/.test(a));

  console.log('\n=== IPA Generation Pipeline ===\n');

  const dict = new CMUDict();
  console.log('CMU Dictionary loaded.\n');

  const weeks = weekArg ? [parseInt(weekArg)] : Array.from({ length: 35 }, (_, i) => i + 1);
  const modes = ['advanced', 'easy'];

  let totalSentences = 0;
  let totalWords = 0;
  let totalWordsWithIpa = 0;
  let filesGenerated = 0;
  const lowCoverage = [];

  for (const week of weeks) {
    for (const mode of modes) {
      const result = processWeek(week, mode, dict);
      if (!result) {
        console.log(`  W${week} ${mode}: SKIP (no data)`);
        continue;
      }

      const coverage = result.totalWords > 0
        ? Math.round((result.wordsWithIpa / result.totalWords) * 100)
        : 0;

      totalSentences += result.sentenceCount;
      totalWords += result.totalWords;
      totalWordsWithIpa += result.wordsWithIpa;

      if (!reportOnly) {
        const outFile = writeIpaFile(week, mode, result.ipaData);
        filesGenerated++;
      }

      const status = coverage >= 90 ? '✓' : coverage >= 70 ? '~' : '✗';
      console.log(`  W${String(week).padStart(2, '0')} ${mode.padEnd(8)} ${status} ${result.sentenceCount} sentences, ${result.wordsWithIpa}/${result.totalWords} words (${coverage}%)`);

      if (coverage < 80) {
        lowCoverage.push({ week, mode, coverage });
      }
    }
  }

  console.log('\n--- Summary ---');
  console.log(`Files generated: ${filesGenerated}`);
  console.log(`Total sentences: ${totalSentences}`);
  console.log(`Total words: ${totalWords}`);
  console.log(`Words with IPA: ${totalWordsWithIpa} (${Math.round((totalWordsWithIpa / totalWords) * 100)}%)`);

  if (lowCoverage.length > 0) {
    console.log(`\nLow coverage (<80%):`);
    for (const { week, mode, coverage } of lowCoverage) {
      console.log(`  W${week} ${mode}: ${coverage}%`);
    }
  }

  console.log('\n=== Done ===\n');
}

main();
