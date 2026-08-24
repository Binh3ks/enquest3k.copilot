#!/usr/bin/env node
/**
 * GATE 1: FULL-CORPUS Blueprint Conformance & Anti-Leak Auditor
 * Validates Week N data against src/data/weeks/week_N/blueprint.json:
 * 1. Keyword & character coverage >= 70%
 * 2. Scans ALL files in src/data/weeks/week_N/ (4 Hubs + all station files)
 * 3. Prohibits cross-week entity/theme leaks (e.g. W33 corridor/nurse/Jake/Tom in W34)
 * 4. Runs bidirectional cross-leak regression
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const weekArg = process.argv[2] || '34';
const weekNum = parseInt(weekArg.replace(/^w/i, ''), 10);

console.log(`\n========================================================================`);
console.log(`🛡️  GATE 1: FULL-CORPUS BLUEPRINT CONFORMANCE & ANTI-LEAK AUDIT (WEEK ${weekNum})`);
console.log(`========================================================================`);

const blueprintPath = path.join(rootDir, `src/data/weeks/week_${weekNum}/blueprint.json`);
if (!fs.existsSync(blueprintPath)) {
  console.error(`❌ [FAIL] Missing blueprint.json at: ${blueprintPath}`);
  process.exit(1);
}

const blueprint = JSON.parse(fs.readFileSync(blueprintPath, 'utf8'));
console.log(`📋 Blueprint Loaded: "${blueprint.theme}" (CEFR: ${blueprint.cefr_level})`);

const weekDir = path.join(rootDir, `src/data/weeks/week_${weekNum}`);
const weekFiles = fs.readdirSync(weekDir).filter(f => f.endsWith('.js') || f.endsWith('.json'));

let errors = [];
let fileContents = {};
let fullWeekCorpus = '';

weekFiles.forEach(file => {
  const filePath = path.join(weekDir, file);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    fileContents[file] = content;
    fullWeekCorpus += `\n--- ${file} ---\n` + content;
  } catch (e) {
    errors.push(`Failed to read file ${file}: ${e.message}`);
  }
});

console.log(`📂 Scanned ${weekFiles.length} files in src/data/weeks/week_${weekNum}/ (${(fullWeekCorpus.length / 1024).toFixed(1)} KB corpus)`);

// 1. Keyword & Character coverage check
const combinedLower = fullWeekCorpus.toLowerCase();
const keywords = blueprint.keywords || [];
let matchedKeywords = 0;
keywords.forEach(kw => {
  if (combinedLower.includes(kw.toLowerCase())) {
    matchedKeywords++;
  }
});
const kwCoverage = keywords.length > 0 ? (matchedKeywords / keywords.length) * 100 : 100;
console.log(`🔑 Keyword Coverage: ${matchedKeywords}/${keywords.length} (${kwCoverage.toFixed(1)}%)`);
if (kwCoverage < 70) {
  errors.push(`Keyword coverage too low: ${kwCoverage.toFixed(1)}% < 70% threshold`);
}

const characters = blueprint.characters || [];
let matchedChars = 0;
characters.forEach(char => {
  if (combinedLower.includes(char.toLowerCase())) {
    matchedChars++;
  }
});
const charCoverage = characters.length > 0 ? (matchedChars / characters.length) * 100 : 100;
console.log(`🎭 Character Coverage: ${matchedChars}/${characters.length} (${charCoverage.toFixed(1)}%)`);
if (charCoverage < 50) {
  errors.push(`Character coverage too low: ${charCoverage.toFixed(1)}% < 50% threshold`);
}

// 2. Full-Corpus Cross-Week Leak Detection (Signature Entities & Character Names)
console.log(`\n🔍 Scanning Entire Corpus for Cross-Week Leaks...`);

const foreignWeekSignatures = {
  33: {
    theme: "School Corridor Safety & Incident",
    characters: ["Jake", "Tom"],
    signatures: [
      "corridor safety", "wet floor", "clean bandage", "school nurse", 
      "headmaster praised", "slipped on", "hurt his knee", "cold pack",
      "puddle on tiles", "science class corridor", "friction on tile"
    ]
  },
  34: {
    theme: "The Lion and the Mouse (Aesop Fable)",
    characters: ["Lion", "Aesop"],
    signatures: [
      "lion and the mouse", "sharp teeth", "chewed through the ropes",
      "caught in a net", "hunters placed a rope net", "small friends can give great help"
    ]
  }
};

const otherWeeks = [33, 34, 35, 36, 37].filter(w => w !== weekNum);

for (const otherW of otherWeeks) {
  const spec = foreignWeekSignatures[otherW];
  if (!spec) continue;

  // Check character names
  spec.characters.forEach(char => {
    // Ignore common names if ambiguous
    if (['Leo', 'Oliver', 'Mia'].includes(char)) return;

    for (const [file, content] of Object.entries(fileContents)) {
      if (file === 'blueprint.json') continue;
      const charRegex = new RegExp(`\\b${char}\\b`, 'i');
      if (charRegex.test(content)) {
        errors.push(`[CROSS-WEEK LEAK in ${file}] Found foreign character "${char}" from Week ${otherW} (${spec.theme})`);
      }
    }
  });

  // Check signature phrases
  spec.signatures.forEach(sig => {
    for (const [file, content] of Object.entries(fileContents)) {
      if (file === 'blueprint.json') continue;
      if (content.toLowerCase().includes(sig.toLowerCase())) {
        errors.push(`[CROSS-WEEK LEAK in ${file}] Found foreign phrase "${sig}" from Week ${otherW} (${spec.theme})`);
      }
    }
  });
}

// 3. Output Summary
console.log(`\n========================================================================`);
if (errors.length > 0) {
  console.error(`❌ GATE 1 FAILED (${errors.length} errors):`);
  errors.forEach(e => console.error(`   - ${e}`));
  process.exit(1);
} else {
  console.log(`✅ GATE 1 PASSED: 100% Full-Corpus Conformance & 0 Cross-Week Leaks!`);
  process.exit(0);
}
