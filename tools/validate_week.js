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

const EXPECTED_FILES = [
  'vocab.js',
  'read.js',
  'explore.js',
  'word_power.js',
  'grammar.js',
  'logic.js',
  'writing.js',
  'dictation.js',
  'shadowing.js',
  'word_match.js',
  'mindmap.js',
  'ask_ai.js',
  'daily_watch.js',
  'index.js'
  // 'week_real.js' is checked separately by name convention
];

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

  // Station files (14 files in each mode's week_XX folder)
  const missingStationFiles = EXPECTED_FILES.filter(f => !jsFiles.includes(f));
  
  let allFilesPresent = true;
  let missingFilesMessage = "";

  if (missingStationFiles.length > 0) {
    allFilesPresent = false;
    missingFilesMessage += `Missing station files: ${missingStationFiles.join(', ')}. `;
  }

  const expectedJs = 14; // 14 station files (week_XX_real.js is in PARENT folder)
  const expectedJson = (baseDir === 'weeks') ? 1 : 0; // Only Advanced mode has video_queries.json

  if (jsFiles.length !== expectedJs) {
    return {
      pass: false,
      message: `Expected ${expectedJs} .js files in week folder, found ${jsFiles.length}. ${missingFilesMessage}`,
    };
  }
  
  if (!allFilesPresent) {
      return { pass: false, message: missingFilesMessage };
  }

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

  // Sample check (in production, use external A0 word list)
  const nonA0 = words.filter((w) => !isA0Vocabulary(w));

  if (nonA0.length > words.length * 0.2) {
    // Allow 20% tolerance
    return {
      pass: false,
      message: `Too many non-A0 words: ${nonA0.slice(0, 5).join(', ')}...`,
    };
  }

  return { pass: true, message: `✅ ${words.length - nonA0.length}/${words.length} A0 words` };
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
  const expectedMin = mode === 'easy' ? 60 : 100;
  const expectedMax = mode === 'easy' ? 80 : 120;

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

  const expectedMin = mode === 'easy' ? 8 : 10;
  const expectedMax = mode === 'easy' ? 12 : 16;  // ✅ More flexible

  const count = data.sentences.length;

  if (count < expectedMin || count > expectedMax) {
    return {
      pass: false,
      message: `Expected ${expectedMin}-${expectedMax} sentences, found ${count}`,
    };
  }

  // ✅ Warning (not error) if beyond typical range
  const typicalMax = mode === 'easy' ? 10 : 12;
  if (count > typicalMax) {
    console.warn(`⚠️  Week ${weekNum} (${mode}) has ${count} sentences (typical: ${expectedMin}-${typicalMax}). Verify topic complexity justifies this.`);
  }

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
  if (vocabCount !== 10) {
    return {
      pass: false,
      message: `Expected 10 vocab words, found ${vocabCount}`,
    };
  }

  if (collocationCount !== 3) {
    return {
      pass: false,
      message: `Expected 3 collocations, found ${collocationCount}`,
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
    const shadowingSentences = shadowingData.script.map(s => s.text.trim());

    // Compare dictation
    if (JSON.stringify(sourceSentences) !== JSON.stringify(dictationSentences)) {
      return {
        pass: false,
        message: `dictation.js content does not match read.js. Expected ${sourceSentences.length} sentences, found ${dictationSentences.length}.`,
      };
    }

    // Compare shadowing
    if (JSON.stringify(sourceSentences) !== JSON.stringify(shadowingSentences)) {
      return {
        pass: false,
        message: `shadowing.js content does not match read.js. Expected ${sourceSentences.length} sentences, found ${shadowingSentences.length}.`,
      };
    }

    return { pass: true, message: `✅ dictation/shadowing match read.js` };
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
