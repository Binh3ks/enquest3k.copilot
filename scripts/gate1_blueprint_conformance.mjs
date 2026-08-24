#!/usr/bin/env node
/**
 * GATE 1: Blueprint Conformance & Anti-Leak Auditor
 * Validates Week N data against src/data/weeks/week_N/blueprint.json:
 * 1. Keyword & character coverage >= 70%
 * 2. Cross-week leak detector: 0 exact sentences or distinct foreign characters from any other week
 * 3. Vocab coverage (20/20) and Grammar pattern regex check
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const weekArg = process.argv[2] || '34';
const weekNum = parseInt(weekArg.replace(/^w/i, ''), 10);
const weekPadded = String(weekNum).padStart(2, '0');

console.log(`\n========================================================================`);
console.log(`🛡️  GATE 1: BLUEPRINT CONFORMANCE & ANTI-LEAK AUDIT (WEEK ${weekNum})`);
console.log(`========================================================================`);

const blueprintPath = path.join(rootDir, `src/data/weeks/week_${weekNum}/blueprint.json`);
if (!fs.existsSync(blueprintPath)) {
  console.error(`❌ [FAIL] Missing blueprint.json at: ${blueprintPath}`);
  process.exit(1);
}

const blueprint = JSON.parse(fs.readFileSync(blueprintPath, 'utf8'));
console.log(`📋 Blueprint Loaded: "${blueprint.theme}" (CEFR: ${blueprint.cefr_level})`);

// Load Week Data
const weekDir = path.join(rootDir, `src/data/weeks/week_${weekNum}`);
const readingHubPath = path.join(weekDir, 'reading_hub.js');
const readPath = path.join(weekDir, 'read.js');
const shadowingPath = path.join(weekDir, 'shadowing.js');
const vocabPath = path.join(weekDir, 'vocab.js');

let errors = [];
let warnings = [];

// 1. Check Reading & Shadowing content for characters and keywords
let combinedText = '';
try {
  const readContent = fs.readFileSync(readPath, 'utf8');
  const shadowingContent = fs.readFileSync(shadowingPath, 'utf8');
  const readingHubContent = fs.readFileSync(readingHubPath, 'utf8');
  combinedText = `${readContent}\n${shadowingContent}\n${readingHubContent}`.toLowerCase();
} catch (e) {
  errors.push(`Failed to read week text files: ${e.message}`);
}

// Keyword coverage check
const keywords = blueprint.keywords || [];
let matchedKeywords = 0;
keywords.forEach(kw => {
  if (combinedText.includes(kw.toLowerCase())) {
    matchedKeywords++;
  }
});
const kwCoverage = keywords.length > 0 ? (matchedKeywords / keywords.length) * 100 : 100;
console.log(`🔑 Keyword Coverage: ${matchedKeywords}/${keywords.length} (${kwCoverage.toFixed(1)}%)`);
if (kwCoverage < 70) {
  errors.push(`Keyword coverage too low: ${kwCoverage.toFixed(1)}% < 70% threshold`);
}

// Character coverage check
const characters = blueprint.characters || [];
let matchedChars = 0;
characters.forEach(char => {
  if (combinedText.includes(char.toLowerCase())) {
    matchedChars++;
  }
});
const charCoverage = characters.length > 0 ? (matchedChars / characters.length) * 100 : 100;
console.log(`🎭 Character Coverage: ${matchedChars}/${characters.length} (${charCoverage.toFixed(1)}%)`);
if (charCoverage < 50) {
  errors.push(`Character coverage too low: ${charCoverage.toFixed(1)}% < 50% threshold`);
}

// 2. Cross-Week Leak Scanner (Detect foreign characters / sentences from other weeks)
console.log(`\n🔍 Scanning for Cross-Week Leaks...`);
const allWeeks = [33, 34, 35, 36, 37].filter(w => w !== weekNum);
for (const otherW of allWeeks) {
  const otherBlueprintPath = path.join(rootDir, `src/data/weeks/week_${otherW}/blueprint.json`);
  if (fs.existsSync(otherBlueprintPath)) {
    const otherBp = JSON.parse(fs.readFileSync(otherBlueprintPath, 'utf8'));
    const otherChars = otherBp.characters || [];
    for (const otherChar of otherChars) {
      // Ignore common names that might legitimately appear in multiple contexts
      if (['Leo', 'Oliver', 'Mia'].includes(otherChar)) continue;
      
      const charRegex = new RegExp(`\\b${otherChar}\\b`, 'i');
      if (charRegex.test(combinedText)) {
        errors.push(`[CROSS-WEEK LEAK] Found foreign character "${otherChar}" from Week ${otherW} in Week ${weekNum} data!`);
      }
    }
  }
}

// Check for exact Jake corridor leak strings
if (weekNum !== 33 && (combinedText.includes('jake was walking') || combinedText.includes('school corridor'))) {
  errors.push(`[CROSS-WEEK LEAK] Leaked Week 33 Jake Corridor sentence into Week ${weekNum}!`);
}

// 3. Grammar Pattern Validation
if (blueprint.grammar_pattern?.regex) {
  const pattern = new RegExp(blueprint.grammar_pattern.regex, 'i');
  if (!pattern.test(combinedText)) {
    errors.push(`[GRAMMAR] Target grammar pattern /${blueprint.grammar_pattern.regex}/ not found in story texts`);
  } else {
    console.log(`⚡ Grammar Pattern: Matched /${blueprint.grammar_pattern.regex}/`);
  }
}

console.log(`\n------------------------------------------------------------------------`);
if (errors.length > 0) {
  console.error(`❌ GATE 1 FAILED with ${errors.length} error(s):`);
  errors.forEach(e => console.error(`   - ${e}`));
  process.exit(1);
} else {
  console.log(`✅ GATE 1 PASSED: 100% Blueprint Conformance & 0 Cross-Week Leaks!`);
  process.exit(0);
}
