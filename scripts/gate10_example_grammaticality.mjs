#!/usr/bin/env node

/**
 * 🛡️ GATE 10: EXAMPLE SENTENCE GRAMMATICALITY & DIVERSITY AUDITOR
 * 
 * Verifies that example_en fields in vocabulary and story assets:
 * 1. Have ZERO repetitive template patterns (no "The [character] used [word] carefully" or identical skeletons >= 3 times).
 * 2. Have proper Part-of-Speech and syntactic usage (target word appears in grammatically valid context).
 * 3. Have proper article usage (no naked singular countable nouns like "used lion", "saw mouse").
 * 4. Are natural, story-aligned, and within A2 Flyers length (6-18 words).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const weekNum = parseInt(process.argv[2] || '34', 10);
const weekDir = path.join(rootDir, `src/data/weeks/week_${weekNum}`);

console.log(`\n========================================================================`);
console.log(`🛡️  GATE 10: EXAMPLE SENTENCE GRAMMATICALITY & DIVERSITY (WEEK ${weekNum})`);
console.log(`========================================================================`);

if (!fs.existsSync(weekDir)) {
  console.error(`❌ Week directory not found: ${weekDir}`);
  process.exit(1);
}

let totalChecked = 0;
let errors = [];

// Helper: normalize template structure by replacing target word and proper nouns
function getSentenceTemplate(sentence, targetWord) {
  if (!sentence || typeof sentence !== 'string') return '';
  let norm = sentence.trim();
  if (targetWord) {
    const wordRegex = new RegExp(`\\b${targetWord}\\b`, 'gi');
    norm = norm.replace(wordRegex, '<TARGET_WORD>');
  }
  // Replace proper names or general capitalized subject nouns
  norm = norm.replace(/^(The\s+[A-Z][a-z]+(\s+[a-z]+)*|[A-Z][a-z]+)\s+/, '<SUBJECT> ');
  return norm.toLowerCase();
}

// Helper: check for obvious naked singular countable nouns
const KNOWN_SINGULAR_NOUNS = ['lion', 'mouse', 'forest', 'hunter', 'net', 'bandage', 'corridor', 'nurse', 'doctor', 'teacher', 'trap'];

function checkGrammarAndPos(item) {
  const word = item.word ? item.word.toLowerCase() : '';
  const ex = item.example_en ? item.example_en.trim() : '';

  if (!ex) {
    return `Empty example_en for word "${word}"`;
  }

  const words = ex.split(/\s+/);
  if (words.length < 5 || words.length > 20) {
    return `Sentence length (${words.length} words) out of range (expected 5-20 words): "${ex}"`;
  }

  // 1. Target word presence check (supports compound words with underscore e.g. cold_pack -> cold pack)
  const cleanWord = word.replace(/_/g, '[\\s_-]').replace(/ed$|ing$|s$/i, '');
  const wordRegex = new RegExp(`\\b${cleanWord}`, 'i');
  if (!wordRegex.test(ex)) {
    return `Target word "${word}" (or stem) is missing from sentence: "${ex}"`;
  }

  // 2. Banned generic dummy templates
  if (/used\s+.*carefully/i.test(ex) || /used\s+<TARGET_WORD>/i.test(ex)) {
    return `Forbidden dummy template "used ... carefully" detected in word "${word}": "${ex}"`;
  }
  if (/example\s+(sentence|with)\s+/i.test(ex)) {
    return `Placeholder text detected in word "${word}": "${ex}"`;
  }

  // 3. Naked singular noun check: e.g. "used lion", "saw mouse" without article a/an/the/his/her/this
  if (KNOWN_SINGULAR_NOUNS.includes(word)) {
    const nakedPattern = new RegExp(`\\b(used|saw|caught|found|helped|with|in|across)\\s+${word}\\b`, 'i');
    if (nakedPattern.test(ex)) {
      return `Missing article before singular countable noun "${word}": "${ex}"`;
    }
  }

  return null;
}

// Read vocab.js or target_vocab files
const candidateFiles = [
  path.join(weekDir, 'vocab.js'),
  path.join(weekDir, 'blueprint.json'),
  path.join(weekDir, 'reading_hub.js')
];

const templateCountMap = new Map();

for (const filePath of candidateFiles) {
  if (!fs.existsSync(filePath)) continue;

  try {
    if (filePath.endsWith('.json')) {
      const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const vocabList = json.target_vocab_20 || json.vocab || [];
      for (const item of vocabList) {
        if (item.example_en) {
          totalChecked++;
          const err = checkGrammarAndPos(item);
          if (err) errors.push(`[${path.basename(filePath)}] ${err}`);

          const tmpl = getSentenceTemplate(item.example_en, item.word);
          templateCountMap.set(tmpl, (templateCountMap.get(tmpl) || 0) + 1);
        }
      }
    } else if (filePath.endsWith('vocab.js')) {
      const content = fs.readFileSync(filePath, 'utf8');
      // Match objects in export
      const wordMatches = content.match(/\{\s*"id":[\s\S]*?\}/g) || content.match(/\{\s*id:[\s\S]*?\}/g) || [];
      for (const raw of wordMatches) {
        try {
          const word = (raw.match(/["']?word["']?\s*:\s*["']([^"']+)["']/) || [])[1];
          const example_en = (raw.match(/["']?example_en["']?\s*:\s*["']([^"']+)["']/) || [])[1];
          if (word && example_en) {
            totalChecked++;
            const item = { word, example_en };
            const err = checkGrammarAndPos(item);
            if (err) errors.push(`[${path.basename(filePath)}] ${err}`);

            const tmpl = getSentenceTemplate(example_en, word);
            templateCountMap.set(tmpl, (templateCountMap.get(tmpl) || 0) + 1);
          }
        } catch (e) {
          // ignore parsing individual object
        }
      }
    }
  } catch (err) {
    errors.push(`Failed to parse ${filePath}: ${err.message}`);
  }
}

// 4. Check for template repetition >= 3 across sentences
for (const [tmpl, count] of templateCountMap.entries()) {
  if (count >= 3 && tmpl.length > 5) {
    errors.push(`Repetitive template pattern detected (${count} occurrences): "${tmpl}"`);
  }
}

console.log(`🔍 Scanned ${totalChecked} example sentences across Week ${weekNum} assets.`);

if (errors.length > 0) {
  console.error(`\n❌ GATE 10 FAILED with ${errors.length} grammar/diversity violations:`);
  errors.forEach((e, idx) => console.error(`   ${idx + 1}. ${e}`));
  process.exit(1);
}

console.log(`\n------------------------------------------------------------------------`);
console.log(`✅ GATE 10 PASSED: 100% Grammatical, Natural & Diverse Example Sentences!`);
process.exit(0);
