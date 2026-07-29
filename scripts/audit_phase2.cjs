#!/usr/bin/env node
/**
 * Audit Phase 2 Rule 2 compliance across all passed weeks.
 * Flags any text chunk containing multiple sentences.
 * Excludes: W01, W05, W24, W27
 */
const fs = require('fs');
const path = require('path');

// Weeks to audit (all passed weeks minus W01, W05, W24, W27)
const WEEKS_TO_AUDIT = [
  "03","06","10","12","14","15","16","17",
  "20","21","22","23","29","30","31","32","34","35"
];

const WEEKS_DIR = path.join(__dirname, '..', 'src/data/weeks');

// Multi-sentence regex:
// Look for .?! followed by whitespace and a capital letter (new sentence start)
// But ignore Mr. Mrs. Dr. a.m. p.m. etc.
const MULTI_SENTENCE_REGEX = /[.!?]\s+(?=[A-Z])/g;

// Titles that indicate abbreviation, not sentence end
const ABBREVIATIONS = /\b(Mr|Mrs|Ms|Dr|St|vs|etc|inc|ltd|corp|dept|est|vol|fig|no|pp|approx)\.$/i;

function auditWeek(week) {
  const filePath = path.join(WEEKS_DIR, 'week_' + week, 'shadowing.js');
  if (!fs.existsSync(filePath)) return { week, status: 'MISSING', violations: [] };

  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];

  // Extract script array objects using regex
  const scriptRegex = /\{\s*id:\s*(\d+),\s*text:\s*"([^"]*?)"/g;
  let match;

  while ((match = scriptRegex.exec(content)) !== null) {
    const id = parseInt(match[1]);
    const text = match[2];

    // Check for multiple sentences
    const sentences = text.split(MULTI_SENTENCE_REGEX);

    // Filter out abbreviations
    const realSentences = sentences.filter(s => {
      // Check if this "sentence" ends with an abbreviation
      const trimmed = s.trim();
      if (ABBREVIATIONS.test(trimmed)) return false;
      // Check if it's just a fragment (no terminal punctuation at end)
      if (!/[.!?]$/.test(trimmed)) return false;
      return true;
    });

    if (realSentences.length > 1) {
      violations.push({
        id,
        text,
        sentenceCount: realSentences.length,
        sentences: realSentences.map(s => s.trim().slice(0, 60))
      });
    }
  }

  return {
    week,
    status: violations.length === 0 ? 'PASS' : 'FAIL',
    violations
  };
}

// Main
console.log('═══════════════════════════════════════════════════════════════');
console.log('  PHASE 2 RULE 2 AUDIT — Multi-sentence chunk detection');
console.log('  Excluding: W01, W05, W24, W27');
console.log('═══════════════════════════════════════════════════════════════');
console.log();

let totalViolations = 0;
const failedWeeks = [];

for (const week of WEEKS_TO_AUDIT) {
  const result = auditWeek(week);

  if (result.status === 'PASS') {
    console.log('  W' + week + ' ✅ PASS (' + (result.violations.length) + ' violations)');
  } else {
    console.log('  W' + week + ' ❌ FAIL (' + result.violations.length + ' violations)');
    failedWeeks.push(result);

    result.violations.forEach(v => {
      console.log('    Chunk ' + v.id + ' (' + v.sentenceCount + ' sentences):');
      v.sentences.forEach((s, i) => {
        console.log('      [' + (i+1) + '] "' + s + '"');
      });
      console.log();
    });

    totalViolations += result.violations.length;
  }
}

console.log();
console.log('═══════════════════════════════════════════════════════════════');
console.log('  AUDIT SUMMARY');
console.log('═══════════════════════════════════════════════════════════════');
console.log('  Weeks audited: ' + WEEKS_TO_AUDIT.length);
console.log('  Weeks PASSED: ' + (WEEKS_TO_AUDIT.length - failedWeeks.length));
console.log('  Weeks FAILED: ' + failedWeeks.length);
console.log('  Total violations: ' + totalViolations);
console.log('═══════════════════════════════════════════════════════════════');
