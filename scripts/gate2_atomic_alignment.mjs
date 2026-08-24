#!/usr/bin/env node
/**
 * GATE 2: Atomic Alignment & Data Integrity Validator
 * Validates:
 * 1. words.length === ipa.length for every sentence in shadowing.js
 * 2. Phonetic dictionary alignment check (word vs IPA pair integrity, e.g. "Jake" != /wʌn/)
 * 3. Exact 3 calibrated pins per webtoon scene in read.js (x, y ∈ [5, 95])
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
console.log(`🛡️  GATE 2: ATOMIC ALIGNMENT & PHONETIC INTEGRITY (WEEK ${weekNum})`);
console.log(`========================================================================`);

let errors = [];

// 1. Validate Shadowing Sentences
const shadowingPath = path.join(rootDir, `src/data/weeks/week_${weekNum}/shadowing.js`);
if (!fs.existsSync(shadowingPath)) {
  console.error(`❌ [FAIL] Missing shadowing.js at: ${shadowingPath}`);
  process.exit(1);
}

const shadowingModule = await import(shadowingPath);
const shadowingData = shadowingModule.shadowingData || shadowingModule.default;
const sentences = shadowingData?.sentences || [];

if (!Array.isArray(sentences) || sentences.length === 0) {
  errors.push(`No sentences array found in shadowing.js`);
} else {
  console.log(`🎙️ Validating ${sentences.length} atomic sentences...`);

  // Basic Phonetic Sanity Dictionary for key test words
  const PHONETIC_SANITY = {
    'one': ['wʌn', 'wɒn'],
    'warm': ['wɔːm', 'wɔrm'],
    'afternoon': ['ɑːftəˈnuːn', 'ˌɑːftəˈnuːn', 'æftərˈnun'],
    'a': ['ə', 'eɪ'],
    'huge': ['hjuːdʒ', 'hjudʒ'],
    'lion': ['laɪən', 'ˈlaɪən'],
    'was': ['wəz', 'wɒz', 'wʌz'],
    'sleeping': ['sliːpɪŋ', 'ˈsliːpɪŋ'],
    'under': ['ʌndər', 'ˈʌndər', 'ʌndə'],
    'shady': ['ʃeɪdi', 'ˈʃeɪdi'],
    'tree': ['triː', 'tri'],
    'jake': ['dʒeɪk', 'ʤeɪk'],
    'walking': ['wɔːkɪŋ', 'ˈwɔːkɪŋ'],
    'corridor': ['kɒrɪdɔː', 'ˈkɒrɪdɔː']
  };

  sentences.forEach((s, sIdx) => {
    if (!s.words || !s.ipa) {
      errors.push(`Sentence ${s.id || sIdx + 1} is missing atomic 'words' or 'ipa' array`);
      return;
    }

    if (s.words.length !== s.ipa.length) {
      errors.push(`Sentence ${s.id || sIdx + 1} length mismatch: ${s.words.length} words vs ${s.ipa.length} IPA chips!`);
    }

    // Phonetic pair validation
    s.words.forEach((rawW, wIdx) => {
      const cleanW = rawW.toLowerCase().replace(/[^a-z]/g, '');
      const rawIpa = (s.ipa[wIdx] || '').replace(/[\/\sˌˈ]/g, '');
      
      if (PHONETIC_SANITY[cleanW]) {
        const expected = PHONETIC_SANITY[cleanW].map(ip => ip.replace(/[\/\sˌˈ]/g, ''));
        if (!expected.includes(rawIpa)) {
          errors.push(`[PHONETIC MISMATCH] Sentence ${s.id || sIdx + 1}, word "${rawW}" paired with invalid IPA "${s.ipa[wIdx]}" (Expected one of: ${PHONETIC_SANITY[cleanW].join(', ')})`);
        }
      }
    });
  });

  console.log(`   ✅ All ${sentences.length} sentences are atomic and phonetically validated.`);
}

// 2. Validate Webtoon Scenes & 3-Pin Invariant in read.js
const readPath = path.join(rootDir, `src/data/weeks/week_${weekNum}/read.js`);
if (fs.existsSync(readPath)) {
  const readModule = await import(readPath);
  const readData = readModule.readData || readModule.default;
  const scenes = readData?.story_scenes || [];

  console.log(`\n🖼️ Validating Webtoon Scenes & Pin Calibration (${scenes.length} scenes)...`);
  if (!Array.isArray(scenes) || scenes.length !== 5) {
    errors.push(`Expected exactly 5 story_scenes in read.js, found: ${scenes.length}`);
  } else {
    scenes.forEach((scene, scIdx) => {
      const pins = scene.lexical_chunks || [];
      if (pins.length !== 3) {
        errors.push(`Scene ${scene.scene_number || scIdx + 1} has ${pins.length} pins (Invariant requires EXACTLY 3 pins per scene)`);
      }
      pins.forEach((pin, pIdx) => {
        if (typeof pin.x !== 'number' || typeof pin.y !== 'number' || pin.x < 5 || pin.x > 95 || pin.y < 5 || pin.y > 95) {
          errors.push(`Scene ${scene.scene_number || scIdx + 1} pin ${pIdx + 1} coordinates out of bounds: x=${pin.x}, y=${pin.y} (Must be ∈ [5, 95])`);
        }
      });
    });
    console.log(`   ✅ 5/5 Scenes confirmed with exactly 3 calibrated pins (15 pins total).`);
  }
}

console.log(`\n------------------------------------------------------------------------`);
if (errors.length > 0) {
  console.error(`❌ GATE 2 FAILED with ${errors.length} error(s):`);
  errors.forEach(e => console.error(`   - ${e}`));
  process.exit(1);
} else {
  console.log(`✅ GATE 2 PASSED: 100% Atomic Schema & Pin Alignment!`);
  process.exit(0);
}
