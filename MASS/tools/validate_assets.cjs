#!/usr/bin/env node
/**
 * ASSET VALIDATION SCRIPT
 * 
 * Purpose: Validate all assets (audio + images) for a week against the matrix
 * Usage: node MASS/tools/validate_assets.cjs <week> [mode]
 * Example: node MASS/tools/validate_assets.cjs 5 advanced
 * 
 * Exit codes:
 * 0 = All assets valid
 * 1 = Missing or incorrect assets
 */

const fs = require('fs');
const path = require('path');

const weekNum = process.argv[2];
const mode = process.argv[3] || 'advanced';

if (!weekNum) {
  console.error("\n❌ Missing week number");
  console.log("📖 Usage: node MASS/tools/validate_assets.cjs <week> [mode]");
  console.log("📖 Example: node MASS/tools/validate_assets.cjs 5 advanced\n");
  process.exit(1);
}

const weekId = parseInt(weekNum);
const weekStr = mode === 'easy' ? `week${weekId}_easy` : `week${weekId}`;
const weekDirName = `week_${String(weekId).padStart(2, '0')}`; // data folder: week_05, week_04
const weekDir = path.join(__dirname, '../../src/data', mode === 'easy' ? 'weeks_easy' : 'weeks', weekDirName);
const audioDir = path.join(__dirname, '../../public/audio', weekStr); // audio folder: week5, week4
const imageDir = path.join(__dirname, '../../public/images', weekStr);

console.log('\n' + '='.repeat(70));
console.log(`🔍 ASSET VALIDATION - WEEK ${weekNum} (${mode.toUpperCase()} MODE)`);
console.log('='.repeat(70) + '\n');

const errors = [];
const warnings = [];
let totalExpectedAudio = 0;
let totalExpectedImages = 0;
let totalFoundAudio = 0;
let totalFoundImages = 0;

// Helper to check file exists
function checkFile(type, relativePath, station) {
  const dir = type === 'audio' ? audioDir : imageDir;
  const fullPath = path.join(dir, relativePath);
  const exists = fs.existsSync(fullPath);
  
  if (!exists) {
    errors.push(`❌ [${station}] Missing ${type}: ${weekStr}/${relativePath}`);
  } else {
    if (type === 'audio') totalFoundAudio++;
    else totalFoundImages++;
  }
  
  return exists;
}

// Load vocab from week files
function loadVocabWords() {
  const vocabFile = path.join(weekDir, 'vocab.js');
  if (!fs.existsSync(vocabFile)) {
    errors.push(`❌ vocab.js not found at ${vocabFile}`);
    return [];
  }
  
  try {
    const content = fs.readFileSync(vocabFile, 'utf8');
    // Extract word field values - match ONLY "word:", not "audio_word:"
    const wordMatches = content.match(/\bword:\s*["']([^"']+)["']/g);
    if (!wordMatches) return [];
    
    return wordMatches.map(m => {
      const match = m.match(/\bword:\s*["']([^"']+)["']/);
      return match[1].toLowerCase().replace(/\s+/g, '_');
    });
  } catch (e) {
    errors.push(`❌ Error reading vocab.js: ${e.message}`);
    return [];
  }
}

// Load word_power phrases
function loadWordPowerPhrases() {
  const wpFile = path.join(weekDir, 'word_power.js');
  if (!fs.existsSync(wpFile)) {
    warnings.push(`⚠️  word_power.js not found`);
    return [];
  }
  
  try {
    const content = fs.readFileSync(wpFile, 'utf8');
    // Week 4 uses "word:" field not "phrase:"
    const wordMatches = content.match(/\bword:\s*["']([^"']+)["']/g);
    if (!wordMatches) return [];
    
    return wordMatches.map(m => {
      const match = m.match(/\bword:\s*["']([^"']+)["']/);
      return match[1].toLowerCase().replace(/\s+/g, '_');
    });
  } catch (e) {
    warnings.push(`⚠️  Error reading word_power.js: ${e.message}`);
    return [];
  }
}

// Count sentences in read.js
function countReadSentences() {
  const readFile = path.join(weekDir, 'read.js');
  if (!fs.existsSync(readFile)) {
    errors.push(`❌ read.js not found`);
    return 0;
  }
  
  try {
    const content = fs.readFileSync(readFile, 'utf8');
    // Find the content field
    const match = content.match(/content:\s*`([^`]+)`/);
    if (!match) return 0;
    
    const text = match[1];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    return sentences.length;
  } catch (e) {
    errors.push(`❌ Error reading read.js: ${e.message}`);
    return 0;
  }
}

console.log('📝 Loading week data...\n');

const vocabWords = loadVocabWords();
const wordPowerPhrases = loadWordPowerPhrases();
const readSentenceCount = countReadSentences();

console.log(`  Vocab words: ${vocabWords.length}`);
console.log(`  Word power phrases: ${wordPowerPhrases.length}`);
console.log(`  Read sentences: ${readSentenceCount}\n`);

// ===== VOCAB VALIDATION =====
console.log('🎯 Validating VOCAB.JS assets...');
console.log('  Matrix: 10 words × 4 audio + 10 images = 50 assets\n');

totalExpectedAudio += vocabWords.length * 4;
totalExpectedImages += vocabWords.length;

vocabWords.forEach((word, i) => {
  // Check 4 audio files
  checkFile('audio', `vocab_${word}.mp3`, 'vocab');
  checkFile('audio', `vocab_def_${word}.mp3`, 'vocab');
  checkFile('audio', `vocab_ex_${word}.mp3`, 'vocab');
  checkFile('audio', `vocab_coll_${word}.mp3`, 'vocab');
  
  // Check 1 image (Week 4 images are NOT prefixed with "vocab_")
  checkFile('image', `${word}.jpg`, 'vocab');
});

console.log(`  Expected: ${vocabWords.length * 4} audio + ${vocabWords.length} images`);
console.log(`  Found: ${totalFoundAudio - (totalExpectedAudio - vocabWords.length * 4)} audio + ${totalFoundImages - (totalExpectedImages - vocabWords.length)} images\n`);

// ===== WORD POWER VALIDATION =====
console.log('🎯 Validating WORD_POWER.JS assets...');
console.log('  Matrix: 3 phrases × 4-5 audio + 3 images = 15-18 assets\n');

const wpAudioBefore = totalFoundAudio;
const wpImageBefore = totalFoundImages;

// Week 4 has 5 audio per phrase (including audio_model)
totalExpectedAudio += wordPowerPhrases.length * 5;
totalExpectedImages += wordPowerPhrases.length;

wordPowerPhrases.forEach(phrase => {
  // Check 5 audio files (Week 4 has audio_model)
  checkFile('audio', `wordpower_${phrase}.mp3`, 'word_power');
  checkFile('audio', `wordpower_def_${phrase}.mp3`, 'word_power');
  checkFile('audio', `wordpower_ex_${phrase}.mp3`, 'word_power');
  checkFile('audio', `wordpower_coll_${phrase}.mp3`, 'word_power');
  checkFile('audio', `wordpower_model_${phrase}.mp3`, 'word_power');
  
  // Check 1 image
  checkFile('image', `wordpower_${phrase}.jpg`, 'word_power');
});

console.log(`  Expected: ${wordPowerPhrases.length * 5} audio + ${wordPowerPhrases.length} images`);
console.log(`  Found: ${totalFoundAudio - wpAudioBefore} audio + ${totalFoundImages - wpImageBefore} images\n`);

// ===== READ.JS VALIDATION =====
console.log('🎯 Validating READ.JS assets...');
console.log('  Matrix: 1 audio + 1 image = 2 assets\n');

totalExpectedAudio += 1;
totalExpectedImages += 1;

checkFile('audio', 'read_main.mp3', 'read');
checkFile('image', `read_cover_w${String(weekId).padStart(2, '0')}.jpg`, 'read');

console.log(`  Expected: 1 audio + 1 image`);
console.log(`  ✅ Validated\n`);

// ===== GRAMMAR VALIDATION =====
console.log('🎯 Validating GRAMMAR.JS assets...');
console.log('  Matrix: 0 audio files (text exercises only)\n');

// Grammar has NO audio in Week 4
console.log(`  Expected: 0 audio`);
console.log(`  ✅ Validated (no audio required)\n`);

// ===== DICTATION VALIDATION =====
console.log('🎯 Validating DICTATION.JS assets...');
const expectedDictation = mode === 'easy' ? 12 : 14;
console.log(`  Matrix: ${expectedDictation} audio files (${mode} mode)\n`);

totalExpectedAudio += expectedDictation;

// Check if matches read sentence count
if (readSentenceCount > 0 && readSentenceCount !== expectedDictation) {
  errors.push(`❌ [dictation] Sentence count mismatch: read.js has ${readSentenceCount}, expected ${expectedDictation}`);
}

for (let i = 1; i <= expectedDictation; i++) {
  checkFile('audio', `dictation_${i}.mp3`, 'dictation');
}

console.log(`  Expected: ${expectedDictation} audio`);
console.log(`  ✅ Validated\n`);

// ===== SHADOWING VALIDATION =====
console.log('🎯 Validating SHADOWING.JS assets...');
const expectedShadowing = expectedDictation + 1;
console.log(`  Matrix: ${expectedShadowing} audio files (${expectedDictation} sentences + 1 full)\n`);

totalExpectedAudio += expectedShadowing;

for (let i = 1; i <= expectedDictation; i++) {
  checkFile('audio', `shadowing_${i}.mp3`, 'shadowing');
}
checkFile('audio', 'shadowing_full.mp3', 'shadowing');

console.log(`  Expected: ${expectedShadowing} audio`);
console.log(`  ✅ Validated\n`);

// ===== MINDMAP VALIDATION =====
console.log('🎯 Validating MINDMAP.JS assets...');
console.log('  Matrix: 42 audio (6 stems + 36 branches) - SAME for both modes!\n');

totalExpectedAudio += 42;

// 6 stems
for (let i = 1; i <= 6; i++) {
  checkFile('audio', `mindmap_stem_${i}.mp3`, 'mindmap');
}

// 36 branches
for (let i = 1; i <= 36; i++) {
  checkFile('audio', `mindmap_branch_${i}.mp3`, 'mindmap');
}

console.log(`  Expected: 42 audio (6 + 36)`);
console.log(`  ✅ Validated\n`);

// ===== WRITING VALIDATION =====
console.log('🎯 Validating WRITING.JS assets...');
console.log('  Matrix: 0 audio (text prompt only) - Week 4 has NO audio\n');

// Writing has NO audio in Week 4
console.log(`  Expected: 0 audio`);
console.log(`  ✅ Validated (no audio required)\n`);

// ===== LOGIC VALIDATION =====
console.log('🎯 Validating LOGIC.JS assets...');
console.log('  Matrix: 5 audio + 0 images (5 questions)\n');

totalExpectedAudio += 5;

for (let i = 1; i <= 5; i++) {
  checkFile('audio', `logic_${i}.mp3`, 'logic');
}

console.log(`  Expected: 5 audio + 0 images`);
console.log(`  ✅ Validated\n`);

// ===== ASK AI VALIDATION =====
console.log('🎯 Validating ASK_AI.JS assets...');
console.log('  Matrix: 5 audio (5 prompts)\n');

totalExpectedAudio += 5;

for (let i = 1; i <= 5; i++) {
  checkFile('audio', `ask_ai_${i}.mp3`, 'ask_ai');
}

console.log(`  Expected: 5 audio`);
console.log(`  ✅ Validated\n`);

// ===== EXPLORE VALIDATION =====
console.log('🎯 Validating EXPLORE.JS assets...');
console.log('  Matrix: 1 audio + 1 image = 2 assets\n');

totalExpectedAudio += 1;
totalExpectedImages += 1;

checkFile('audio', 'explore_main.mp3', 'explore');
checkFile('image', `explore_cover_w${String(weekId).padStart(2, '0')}.jpg`, 'explore');

console.log(`  Expected: 1 audio + 1 image`);
console.log(`  ✅ Validated\n`);

// ===== DAILY WATCH VALIDATION =====
console.log('🎯 Validating DAILY_WATCH.JS assets...');
console.log('  Matrix: 0 audio (YouTube videos only) - Week 4 has NO audio\n');

// Daily Watch has NO audio in Week 4
console.log(`  Expected: 0 audio`);
console.log(`  ✅ Validated (no audio required)\n`);

// ===== VALIDATION SUMMARY
console.log('='.repeat(70) + '\n');
console.log('📊 VALIDATION SUMMARY');

const expectedTotalAdvanced = 138;
const expectedTotalEasy = 130;
const expectedImages = 15;

const expectedTotal = mode === 'easy' ? expectedTotalEasy : expectedTotalAdvanced;

console.log(`Mode: ${mode.toUpperCase()}`);
console.log(`Week: ${weekNum}\n`);

console.log(`Audio Files:`);
console.log(`  Expected: ${expectedTotal}`);
console.log(`  Found: ${totalFoundAudio}`);
console.log(`  Status: ${totalFoundAudio === expectedTotal ? '✅ PASS' : '❌ FAIL'}\n`);

console.log(`Image Files:`);
console.log(`  Expected: ${expectedImages}`);
console.log(`  Found: ${totalFoundImages}`);
console.log(`  Status: ${totalFoundImages === expectedImages ? '✅ PASS' : '❌ FAIL'}\n`);

if (errors.length > 0) {
  console.log(`❌ VALIDATION FAILED - ${errors.length} ERRORS:\n`);
  errors.forEach(err => console.log(err));
  console.log('');
}

if (warnings.length > 0) {
  console.log(`⚠️  ${warnings.length} WARNINGS:\n`);
  warnings.forEach(warn => console.log(warn));
  console.log('');
}

if (errors.length === 0) {
  console.log('✅ ALL ASSETS VALIDATED SUCCESSFULLY!\n');
  console.log('🎉 Week ' + weekNum + ' (' + mode + ') is ready for production.\n');
  console.log('='.repeat(70) + '\n');
  process.exit(0);
} else {
  console.log('❌ VALIDATION FAILED - Fix errors above and re-run validation.\n');
  console.log('🔧 To regenerate missing assets:\n');
  console.log(`   bash MASS/tools/cleanup_and_regenerate.sh ${weekNum} ${mode}\n`);
  console.log('='.repeat(70) + '\n');
  process.exit(1);
}
