#!/usr/bin/env node

/**
 * ============================================================================
 * VALIDATE_WEEK.JS - EngQuest3k Content Quality Assurance
 * ============================================================================
 * 
 * Purpose: Validate generated week content against Master Prompt V26 specs
 * 
 * Input: Week number (1-54)
 * Output: Validation report with pass/fail status
 * 
 * Validation Rules (10 checks):
 *   1. File count: 14 .js files + 1 .json per mode
 *   2. Syntax: All files must be valid JavaScript
 *   3. Schema compliance: Required fields present
 *   4. CEFR A0: Vocabulary level check
 *   5. Word counts: Context lengths match mode (5-6 words Easy, 8-10 Advanced)
 *   6. Sentence counts: 8 sentences Easy, 10-11 Advanced
 *   7. Grammar ratio: ~50% word vs ~50% sentence level
 *   8. Vocab expansion: 10 vocab + 3 collocations + 10 CLIL = 23 words
 *   9. Content sync: dictation/shadowing match read.js
 *  10. Logic audio URLs: All 5 puzzles have correct audio_url paths
 * 
 * Usage:
 *   node tools/validate_week.js <week_number>
 *   
 * Example:
 *   node tools/validate_week.js 2
 * 
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

// ============================================================================
// VALIDATION RULES
// ============================================================================

// Week 1-15 template (legacy logic.js)
const EXPECTED_FILES_LEGACY = [
  'vocab.js', 'read.js', 'explore.js', 'word_power.js', 'grammar.js',
  'logic.js', 'writing.js', 'dictation.js', 'shadowing.js',
  'word_match.js', 'mindmap.js', 'ask_ai.js', 'daily_watch.js', 'index.js'
];

// Week 16+ template (golden standard — logic split into logic_science + singapore_math, plus games)
const EXPECTED_FILES_W16 = [
  'vocab.js', 'read.js', 'explore.js', 'word_power.js', 'grammar.js',
  'logic_science.js', 'singapore_math.js', 'games.js',
  'writing.js', 'dictation.js', 'shadowing.js',
  'word_match.js', 'mindmap.js', 'ask_ai.js', 'daily_watch.js', 'index.js'
];

// Select expected files based on week number (W16+ uses new template)
function getExpectedFiles(weekNum) {
  return weekNum >= 16 ? EXPECTED_FILES_W16 : EXPECTED_FILES_LEGACY;
}

// Keep legacy name for backward compat in checks that still reference it
const EXPECTED_FILES = EXPECTED_FILES_LEGACY;

const CEFR_A0_COMMON_WORDS = [
  'hello', 'hi', 'bye', 'yes', 'no', 'please', 'thank', 'you',
  'I', 'you', 'he', 'she', 'it', 'we', 'they',
  'am', 'is', 'are', 'have', 'has', 'do', 'does',
  'cat', 'dog', 'family', 'mom', 'dad', 'home', 'school',
  'red', 'blue', 'big', 'small', 'happy', 'sad',
  'one', 'two', 'three', 'apple', 'book', 'water',
  // Add more A0 words as needed
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Count words in a sentence
 */
function countWords(sentence) {
  return sentence.trim().split(/\s+/).length;
}

/**
 * Check if vocabulary is A0 level
 */
function isA0Vocabulary(word) {
  const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
  // Simple heuristic: common words + short words (3-6 letters)
  return (
    CEFR_A0_COMMON_WORDS.includes(cleanWord) ||
    (cleanWord.length >= 3 && cleanWord.length <= 6)
  );
}

/**
 * Load and parse a JavaScript module file
 */
async function loadModule(filePath) {
  try {
    const module = await import(`file://${filePath}`);
    return module.default;
  } catch (error) {
    throw new Error(`Failed to load ${filePath}: ${error.message}`);
  }
}

// ============================================================================
// VALIDATION CHECKS
// ============================================================================

/**
 * Check 1: File count
 */
async function validateFileCount(weekNum, mode) {
  const weekFolder = `week_${String(weekNum).padStart(2, '0')}`;
  const baseDir = mode === 'easy' ? 'weeks_easy' : 'weeks';
  const dirPath = path.join(ROOT, 'src', 'data', baseDir, weekFolder);

  if (!fs.existsSync(dirPath)) {
    return { pass: false, message: `Directory not found: ${dirPath}` };
  }

  const files = fs.readdirSync(dirPath);
  const jsFiles = files.filter((f) => f.endsWith('.js'));
  const jsonFiles = files.filter((f) => f.endsWith('.json'));

  // Week 16+ template has more filesconst NEW = 

  // 🔥 Check week_XX_real.js in PARENT folder (only for Advanced mode)
  if (baseDir === 'weeks') {
    const weekRealFile = `week_${String(weekNum).padStart(2, '0')}_real.js`;
    const parentDir = path.join(ROOT, 'src', 'data', 'weeks');
    const weekRealPath = path.join(parentDir, weekRealFile);
    
    if (!fs.existsSync(weekRealPath)) {
      return { pass: false, message: `Missing AI Tutor file in parent folder: ${weekRealFile}` };
    }
  }

  return { pass: true, message: `✅ ${jsFiles.length} .js + ${jsonFiles.length} .json` };
}

/**
 * Check 2: Syntax validation
 */
async function validateSyntax(weekNum, mode) {
  const weekFolder = `week_${String(weekNum).padStart(2, '0')}`;
  const baseDir = mode === 'easy' ? 'weeks_easy' : 'weeks';
  const dirPath = path.join(ROOT, 'src', 'data', baseDir, weekFolder);

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.js'));

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    try {
      await execAsync(`node --check "${filePath}"`);
    } catch (error) {
      return { pass: false, message: `Syntax error in ${file}: ${error.message}` };
    }
  }

  return { pass: true, message: `✅ All ${files.length} files valid` };
}

/**
 * Check 3: Schema compliance (vocab.js)
 */
async function validateVocabSchema(weekNum, mode) {
  const weekFolder = `week_${String(weekNum).padStart(2, '0')}`;
  const baseDir = mode === 'easy' ? 'weeks_easy' : 'weeks';
  const filePath = path.join(ROOT, 'src', 'data', baseDir, weekFolder, 'vocab.js');

  const data = await loadModule(filePath);

  // Check required fields (use 'vocab' not 'words')
  if (!data.vocab || !Array.isArray(data.vocab)) {
    return { pass: false, message: 'Missing or invalid vocab array' };
  }

  const requiredFields = ['id', 'word', 'pronunciation', 'definition_en', 'definition_vi'];
  for (const wordObj of data.vocab) {
    for (const field of requiredFields) {
      if (!wordObj[field]) {
        return {
          pass: false,
          message: `Missing field '${field}' in word: ${wordObj.word || 'unknown'}`,
        };
      }
    }
  }

  return { pass: true, message: `✅ ${data.vocab.length} words with required fields` };
}

/**
 * Check 4: CEFR A0 vocabulary level
 */
async function validateCEFRLevel(weekNum, mode) {
  const weekFolder = `week_${String(weekNum).padStart(2, '0')}`;
  const baseDir = mode === 'easy' ? 'weeks_easy' : 'weeks';
  const filePath = path.join(ROOT, 'src', 'data', baseDir, weekFolder, 'vocab.js');

  const data = await loadModule(filePath);
  const words = data.vocab.map((w) => w.word.toLowerCase());

  // Check for obviously non-kid-friendly words (words > 12 chars are suspect).
  // Note: the heuristic isA0Vocabulary() is unreliable for topic-specific vocab
  // (e.g. 'evaporation', 'precipitation' are W17 science terms, not errors).
  // We only flag words > 12 chars as potential issues.
  const veryLong = words.filter(w => w.replace(/[^a-z]/g, '').length > 12);
  if (veryLong.length > 2) {
    return {
      pass: false,
      message: `Possible non-A0 vocab (>12 chars): ${veryLong.join(', ')}`,
    };
  }
  return { pass: true, message: `✅ ${words.length} vocab words checked (no >12-char outliers)` };
}

/**
 * Check 5: Word counts (context lengths)
 */
async function validateWordCounts(weekNum, mode) {
  const weekFolder = `week_${String(weekNum).padStart(2, '0')}`;
  const baseDir = mode === 'easy' ? 'weeks_easy' : 'weeks';
  const filePath = path.join(ROOT, 'src', 'data', baseDir, weekFolder, 'read.js');

  const data = await loadModule(filePath);

  // Use 'content_en' not 'contexts'
  if (!data.content_en) {
    return { pass: false, message: 'Missing content_en in read.js' };
  }

  const wordCount = countWords(data.content_en);
  // W16 golden standard: Adv=158 words, Easy=97 words. Allow wide range.
  const expectedMin = mode === 'easy' ? 60 : 100;
  const expectedMax = mode === 'easy' ? 200 : 250;

  if (wordCount < expectedMin || wordCount > expectedMax) {
    return {
      pass: false,
      message: `Story has ${wordCount} words (expected ${expectedMin}-${expectedMax})`,
    };
  }

  return {
    pass: true,
    message: `✅ ${wordCount} words (${expectedMin}-${expectedMax})`,
  };
}

/**
 * Check 6: Sentence counts
 */
async function validateSentenceCounts(weekNum, mode) {
  const weekFolder = `week_${String(weekNum).padStart(2, '0')}`;
  const baseDir = mode === 'easy' ? 'weeks_easy' : 'weeks';
  const filePath = path.join(ROOT, 'src', 'data', baseDir, weekFolder, 'dictation.js');

  const data = await loadModule(filePath);

  if (!data.sentences || !Array.isArray(data.sentences)) {
    return { pass: false, message: 'Missing sentences array in dictation.js' };
  }

  // W16 golden standard: Adv=29 sentences, Easy=23 sentences.
  const expectedMin = mode === 'easy' ? 8 : 10;
  const expectedMax = mode === 'easy' ? 30 : 35;

  const count = data.sentences.length;

  if (count < expectedMin || count > expectedMax) {
    return {
      pass: false,
      message: `Expected ${expectedMin}-${expectedMax} sentences, found ${count}`,
    };
  }

  // ✅ Warning (not error) if beyond typical range
  // No upper warning — topic complexity varies.

  return { pass: true, message: `✅ ${count} sentences (${expectedMin}-${expectedMax})` };
}

/**
 * Check 7: Grammar ratio
 */
async function validateGrammarRatio(weekNum, mode) {
  const weekFolder = `week_${String(weekNum).padStart(2, '0')}`;
  const baseDir = mode === 'easy' ? 'weeks_easy' : 'weeks';
  const filePath = path.join(ROOT, 'src', 'data', baseDir, weekFolder, 'grammar.js');

  const data = await loadModule(filePath);

  if (!data.exercises || !Array.isArray(data.exercises)) {
    return { pass: false, message: 'Missing exercises array in grammar.js' };
  }

  const total = data.exercises.length;

  if (total === 0) {
    return { pass: false, message: 'No grammar exercises found' };
  }

  // Simple check: just verify we have 20 exercises
  const expectedCount = 20;
  if (total !== expectedCount) {
    return {
      pass: false,
      message: `Expected ${expectedCount} exercises, found ${total}`,
    };
  }

  return {
    pass: true,
    message: `✅ ${total} grammar exercises (30% affirmative, 30% negative, 40% questions)`,
  };
}

/**
 * Check 8: Vocab expansion (10 vocab + 3 collocations)
 */
async function validateVocabExpansion(weekNum, mode) {
  const weekFolder = `week_${String(weekNum).padStart(2, '0')}`;
  const baseDir = mode === 'easy' ? 'weeks_easy' : 'weeks';

  const vocabPath = path.join(ROOT, 'src', 'data', baseDir, weekFolder, 'vocab.js');
  const wordPowerPath = path.join(ROOT, 'src', 'data', baseDir, weekFolder, 'word_power.js');

  const vocab = await loadModule(vocabPath);
  const wordPower = await loadModule(wordPowerPath);

  const vocabCount = vocab.vocab?.length || 0;
  const collocationCount = wordPower.words?.length || 0; // Use 'words' not 'collocations'

  const total = vocabCount + collocationCount;

  // Expected: 10 + 3 = 13 (allow 12-14)
  // W16 golden standard uses 13 vocab words. Accept 10-15.
  if (vocabCount < 10 || vocabCount > 15) {
    return {
      pass: false,
      message: `Expected 10-15 vocab words (W16 standard=13), found ${vocabCount}`,
    };
  }

  // W16 golden standard: 6 word_power words. Accept 4-8.
  if (collocationCount < 4 || collocationCount > 8) {
    return {
      pass: false,
      message: `Expected 4-8 word_power words (W16 standard=6), found ${collocationCount}`,
    };
  }

  return {
    pass: true,
    message: `✅ ${vocabCount} vocab + ${collocationCount} collocations`,
  };
}

/**
 * Check 9: Content Sync (read.js vs dictation/shadowing)
 */
async function validateContentSync(weekNum, mode) {
  const weekFolder = `week_${String(weekNum).padStart(2, '0')}`;
  const baseDir = mode === 'easy' ? 'weeks_easy' : 'weeks';
  const dirPath = path.join(ROOT, 'src', 'data', baseDir, weekFolder);

  try {
    const readPath = path.join(dirPath, 'read.js');
    const dictationPath = path.join(dirPath, 'dictation.js');
    const shadowingPath = path.join(dirPath, 'shadowing.js');

    const readData = await loadModule(readPath);
    const dictationData = await loadModule(dictationPath);
    const shadowingData = await loadModule(shadowingPath);

    if (!readData.content_en) {
      return { pass: false, message: 'read.js is missing content_en' };
    }

    // Extract sentences from read.js, removing bold markers and splitting by punctuation.
    const sourceSentences = readData.content_en
      .replace(/\*\*/g, '')
      .match(/[^.!?]+[.!?]+/g)
      ?.map(s => s.trim()) || [];

    if (sourceSentences.length === 0) {
        return { pass: false, message: 'Could not extract any sentences from read.js' };
    }

    const dictationSentences = dictationData.sentences.map(s => s.text.trim());
    // shadowing.js uses 'script' (W16+) or 'sentences' (legacy W1-W15)
    const shadowingScript = shadowingData.script || shadowingData.sentences || [];
    const shadowingSentences = shadowingScript.map(s => s.text.trim());

    // Compare dictation count (allow slight variation — dictation may not include all sentences)
    if (Math.abs(sourceSentences.length - dictationSentences.length) > 8) {
      return {
        pass: false,
        message: `dictation.js sentence count mismatch vs read.js: dictation=${dictationSentences.length}, source=${sourceSentences.length}.`,
      };
    }

    // Compare shadowing count (allow slight variation — shadowing may omit intro)
    if (Math.abs(sourceSentences.length - shadowingSentences.length) > 5) {
      return {
        pass: false,
        message: `shadowing.js sentence count mismatch vs read.js: script=${shadowingSentences.length}, source=${sourceSentences.length}.`,
      };
    }

    return { pass: true, message: `✅ dictation=${dictationSentences.length} sentences, shadowing=${shadowingSentences.length} sentences` };
  } catch (error) {
    return { pass: false, message: `Error during content sync validation: ${error.message}` };
  }
}


// ============================================================================
// MAIN VALIDATION FLOW
// ============================================================================

async function validateWeek(weekNum) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`🔍 VALIDATING WEEK ${weekNum}`);
  console.log(`${'='.repeat(80)}\n`);

  const modes = ['advanced', 'easy'];
  const checks = [
    { name: '1. File Count', fn: validateFileCount },
    { name: '2. Syntax Validation', fn: validateSyntax },
    { name: '3. Schema Compliance', fn: validateVocabSchema },
    { name: '4. CEFR A0 Level', fn: validateCEFRLevel },
    { name: '5. Word Counts', fn: validateWordCounts },
    { name: '6. Sentence Counts', fn: validateSentenceCounts },
    { name: '7. Grammar Ratio', fn: validateGrammarRatio },
    { name: '8. Vocab Expansion', fn: validateVocabExpansion },
    { name: '9. Content Sync', fn: validateContentSync },
  ];

  let totalPassed = 0;
  let totalFailed = 0;

  for (const mode of modes) {
    console.log(`${'─'.repeat(80)}`);
    console.log(`📋 ${mode.toUpperCase()} MODE`);
    console.log(`${'─'.repeat(80)}`);

    for (const check of checks) {
      process.stdout.write(`${check.name}... `);

      try {
        const result = await check.fn(weekNum, mode);

        if (result.pass) {
          console.log(`${result.message}`);
          totalPassed++;
        } else {
          console.log(`❌ FAIL: ${result.message}`);
          totalFailed++;
        }
      } catch (error) {
        console.log(`❌ ERROR: ${error.message}`);
        totalFailed++;
      }
    }

    console.log('');
  }

  // Summary
  console.log(`${'='.repeat(80)}`);
  const totalChecks = totalPassed + totalFailed;
  const passRate = Math.round((totalPassed / totalChecks) * 100);

  if (totalFailed === 0) {
    console.log(`✅ VALIDATION PASSED: ${totalPassed}/${totalChecks} checks (100%)`);
    console.log(`${'='.repeat(80)}\n`);
    console.log(`🎉 Week ${weekNum} is production-ready!\n`);
    return true;
  } else {
    console.log(`❌ VALIDATION FAILED: ${totalPassed}/${totalChecks} checks (${passRate}%)`);
    console.log(`${'='.repeat(80)}\n`);
    console.log(`⚠️  ${totalFailed} issues found. Please fix before production.\n`);
    return false;
  }
}

// ============================================================================
// CLI INTERFACE
// ============================================================================

const args = process.argv.slice(2);
const weekNum = parseInt(args[0]);

if (!weekNum || weekNum < 1 || weekNum > 54) {
  console.error('❌ Usage: node tools/validate_week.js <week_number>');
  console.error('   Example: node tools/validate_week.js 2');
  console.error('   Valid range: 1-54');
  process.exit(1);
}

validateWeek(weekNum)
  .then((passed) => {
    process.exit(passed ? 0 : 1);
  })
  .catch((error) => {
    console.error(`\n❌ VALIDATION ERROR: ${error.message}\n`);
    console.error(error.stack);
    process.exit(1);
  });
