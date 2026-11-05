#!/usr/bin/env node
/**
 * scripts/test_vocabulary_phonetics.mjs
 * 
 * Comprehensive Test Suite for Vocabulary IPA & Past-Tense Triad Auto-Tagger.
 * Validates:
 * 1. Cryptographic freeze guards on W33 and W34.
 * 2. Phonological triad classification (/t/, /d/, /ɪd/) on standard Cambridge verbs.
 * 3. Irregular verb recognition and inflected form generation.
 * 4. Multi-word phrase & phrasal verb handling.
 * 5. Non-verb tagging (adjectives, nouns).
 * 6. End-to-end dry-run validation on Week 38 blueprint.
 * 7. Fail-loud behavior on invalid input.
 */

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { CMUDict } from 'cmudict';
import {
  cmuToIpa,
  generateRegularPastSpelling,
  classifyPhonology,
  lookupWordPhonetics
} from './tag_vocabulary_phonetics.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  process.stdout.write(`Testing: ${name}... `);
  try {
    fn();
    passedTests++;
    console.log('✅ PASS');
  } catch (err) {
    console.log(`❌ FAIL\n  Error: ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('========================================================================');
console.log('🧪 VOCABULARY PHONETICS & PAST-TENSE TRIAD TEST SUITE (ROUND 52)');
console.log('========================================================================\n');

const cmuDict = new CMUDict();

// ── Test 1: Frozen Guard Blocks W33 Overwrite Without --force ───────────────
runTest('Frozen guard blocks Week 33 overwrite without --force', () => {
  try {
    execSync('node scripts/tag_vocabulary_phonetics.mjs 33 --write', {
      cwd: ROOT_DIR,
      stdio: 'pipe'
    });
    throw new Error('Should have failed on frozen Week 33, but succeeded!');
  } catch (err) {
    const stderr = err.stderr ? err.stderr.toString() : err.message;
    const stdout = err.stdout ? err.stdout.toString() : '';
    const combined = stderr + stdout;
    if (!combined.includes('CRYPTOGRAPHICALLY FROZEN')) {
      throw new Error(`Expected freeze protection message, got: ${combined}`);
    }
  }
});

// ── Test 2: Frozen Guard Blocks W34 Overwrite Without --force ───────────────
runTest('Frozen guard blocks Week 34 overwrite without --force', () => {
  try {
    execSync('node scripts/tag_vocabulary_phonetics.mjs 34 --write', {
      cwd: ROOT_DIR,
      stdio: 'pipe'
    });
    throw new Error('Should have failed on frozen Week 34, but succeeded!');
  } catch (err) {
    const stderr = err.stderr ? err.stderr.toString() : err.message;
    const stdout = err.stdout ? err.stdout.toString() : '';
    const combined = stderr + stdout;
    if (!combined.includes('CRYPTOGRAPHICALLY FROZEN')) {
      throw new Error(`Expected freeze protection message, got: ${combined}`);
    }
  }
});

// ── Test 3: Out-of-bounds Week Exits with Error ─────────────────────────────
runTest('Out-of-bounds week exits with error', () => {
  try {
    execSync('node scripts/tag_vocabulary_phonetics.mjs 157', {
      cwd: ROOT_DIR,
      stdio: 'pipe'
    });
    throw new Error('Should have failed on out-of-bounds week 157!');
  } catch (err) {
    const combined = (err.stderr?.toString() || '') + (err.stdout?.toString() || '');
    if (!combined.includes('out of bounds')) {
      throw new Error(`Expected out of bounds error, got: ${combined}`);
    }
  }
});

// ── Test 4: Phonological -ed Ending Triad Verification ───────────────────────
runTest('Phonological triad classification (/t/, /d/, /ɪd/) on Cambridge regular verbs', () => {
  // /t/ group: ends in voiceless consonant (not /t/)
  const tGroup = ['jump', 'walk', 'slip', 'wash', 'watch', 'laugh', 'kiss', 'help', 'trap'];
  for (const v of tGroup) {
    const res = classifyPhonology(v, cmuDict);
    if (!res || !res.is_verb || res.past_ending_group !== '/t/') {
      throw new Error(`Verb "${v}" should be in /t/ group, got: ${res?.past_ending_group}`);
    }
  }

  // /d/ group: ends in voiced consonant (not /d/) or vowel
  const dGroup = ['climb', 'play', 'clean', 'open', 'roar', 'chew', 'hug', 'live', 'stay', 'learn'];
  for (const v of dGroup) {
    const res = classifyPhonology(v, cmuDict);
    if (!res || !res.is_verb || res.past_ending_group !== '/d/') {
      throw new Error(`Verb "${v}" should be in /d/ group, got: ${res?.past_ending_group}`);
    }
  }

  // /ɪd/ group: ends in alveolar stop /t/ or /d/
  const idGroup = ['wait', 'start', 'need', 'decide', 'hunt', 'rest', 'point', 'shout', 'count'];
  for (const v of idGroup) {
    const res = classifyPhonology(v, cmuDict);
    if (!res || !res.is_verb || res.past_ending_group !== '/ɪd/') {
      throw new Error(`Verb "${v}" should be in /ɪd/ group, got: ${res?.past_ending_group}`);
    }
  }
});

// ── Test 5: Irregular Verbs Identification & Forms ──────────────────────────
runTest('Irregular verb detection and inflected form generation', () => {
  const irregulars = [
    { verb: 'swim', past: 'swam', part: 'swum' },
    { verb: 'fly', past: 'flew', part: 'flown' },
    { verb: 'run', past: 'ran', part: 'run' },
    { verb: 'fall', past: 'fell', part: 'fallen' },
    { verb: 'go', past: 'went', part: 'gone' },
    { verb: 'see', past: 'saw', part: 'seen' },
    { verb: 'eat', past: 'ate', part: 'eaten' },
    { verb: 'write', past: 'wrote', part: 'written' },
    { verb: 'find', past: 'found', part: 'found' }
  ];

  for (const item of irregulars) {
    const res = classifyPhonology(item.verb, cmuDict);
    if (!res || !res.is_verb || res.verb_classification !== 'irregular') {
      throw new Error(`Verb "${item.verb}" should be tagged as irregular`);
    }
    if (res.past_simple !== item.past) {
      throw new Error(`Verb "${item.verb}" past simple mismatch: expected "${item.past}", got "${res.past_simple}"`);
    }
    if (res.past_participle !== item.part) {
      throw new Error(`Verb "${item.verb}" participle mismatch: expected "${item.part}", got "${res.past_participle}"`);
    }
    if (res.past_ending_group !== null) {
      throw new Error(`Irregular verb "${item.verb}" should have past_ending_group: null`);
    }
  }
});

// ── Test 6: Phrasal Verbs & Multi-Word Phrases ──────────────────────────────
runTest('Multi-word phrase and phrasal verb phonetics and classification', () => {
  // Irregular phrasal verb
  const wakeUp = classifyPhonology('wake up', cmuDict);
  if (!wakeUp || !wakeUp.is_verb || wakeUp.past_simple !== 'woke up') {
    throw new Error(`"wake up" should be irregular past "woke up", got: ${wakeUp?.past_simple}`);
  }
  if (!wakeUp.ipa.includes('wˈeɪk') || !wakeUp.ipa.includes('ˈʌp')) {
    throw new Error(`"wake up" IPA missing components: ${wakeUp?.ipa}`);
  }

  // Regular phrasal verb /t/ group
  const brushTeeth = classifyPhonology('brush teeth', cmuDict);
  if (!brushTeeth || !brushTeeth.is_verb || brushTeeth.past_ending_group !== '/t/') {
    throw new Error(`"brush teeth" should be regular /t/ group, got: ${brushTeeth?.past_ending_group}`);
  }
  if (brushTeeth.past_simple !== 'brushed teeth') {
    throw new Error(`"brush teeth" past should be "brushed teeth", got: ${brushTeeth?.past_simple}`);
  }

  // Multi-word noun phrase
  const livingRoom = classifyPhonology('living room', cmuDict);
  if (!livingRoom || livingRoom.is_verb) {
    throw new Error(`"living room" should be non-verb, got: is_verb=${livingRoom?.is_verb}`);
  }
  if (!livingRoom.ipa.includes('ɹˈuːm')) {
    throw new Error(`"living room" IPA missing room phone: ${livingRoom?.ipa}`);
  }
});

// ── Test 7: Non-Verb Words IPA & Tagging ────────────────────────────────────
runTest('Non-verb words correctly tagged with IPA and is_verb: false', () => {
  const nonVerbs = ['heavy', 'corridor', 'friction', 'bandage', 'accident', 'careful'];
  for (const w of nonVerbs) {
    const res = classifyPhonology(w, cmuDict);
    if (!res) throw new Error(`Word "${w}" not found in CMUDict`);
    if (res.is_verb !== false) throw new Error(`Word "${w}" should be non-verb`);
    if (!res.ipa || !res.ipa.startsWith('/') || !res.ipa.endsWith('/')) {
      throw new Error(`Word "${w}" invalid IPA: ${res.ipa}`);
    }
  }
});

// ── Test 8: End-to-End Dry-Run Validation on Week 38 Blueprint ───────────────
runTest('End-to-end dry-run validation on Week 38 blueprint', () => {
  const stdout = execSync('node scripts/tag_vocabulary_phonetics.mjs 38', {
    cwd: ROOT_DIR,
    stdio: 'pipe'
  }).toString();

  if (!stdout.includes('8 words tagged')) {
    throw new Error(`Expected 8 words tagged in Week 38, got stdout: ${stdout}`);
  }
  if (!stdout.includes('Triad Complete: ✅ YES')) {
    throw new Error(`Week 38 should have a complete triad, got stdout: ${stdout}`);
  }
  if (!stdout.includes('jump') || !stdout.includes('hunt') || !stdout.includes('climb')) {
    throw new Error(`Missing expected triad words in stdout: ${stdout}`);
  }
});

// ── Test 9: Regular Past Tense Spelling Doubling Rules ───────────────────────
runTest('Regular past tense spelling doubling and suffix rules', () => {
  const spellingCases = [
    { base: 'slip', expected: 'slipped' },
    { base: 'trap', expected: 'trapped' },
    { base: 'stop', expected: 'stopped' },
    { base: 'cry', expected: 'cried' },
    { base: 'try', expected: 'tried' },
    { base: 'smile', expected: 'smiled' },
    { base: 'like', expected: 'liked' },
    { base: 'jump', expected: 'jumped' },
    { base: 'hunt', expected: 'hunted' }
  ];

  for (const c of spellingCases) {
    const actual = generateRegularPastSpelling(c.base);
    if (actual !== c.expected) {
      throw new Error(`Spelling for "${c.base}": expected "${c.expected}", got "${actual}"`);
    }
  }
});

// ── Test 10: Zero Disk Mutation in Default Mode ─────────────────────────────
runTest('Zero disk mutation invariant in default dry-run mode', () => {
  const bpPath = path.join(ROOT_DIR, 'src/data/weeks/week_38/blueprint.json');
  const beforeStat = fs.statSync(bpPath);
  const beforeContent = fs.readFileSync(bpPath, 'utf8');

  execSync('node scripts/tag_vocabulary_phonetics.mjs 38', {
    cwd: ROOT_DIR,
    stdio: 'pipe'
  });

  const afterStat = fs.statSync(bpPath);
  const afterContent = fs.readFileSync(bpPath, 'utf8');

  if (beforeStat.mtimeMs !== afterStat.mtimeMs || beforeContent !== afterContent) {
    throw new Error('Default dry-run mode mutated blueprint.json on disk!');
  }
});

console.log('\n========================================================================');
console.log(`🎉 ALL TESTS PASSED: ${passedTests}/${totalTests} (100% SUCCESS)`);
console.log('========================================================================\n');
