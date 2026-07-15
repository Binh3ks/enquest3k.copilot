#!/usr/bin/env node

/**
 * ============================================================================
 * VALIDATE_WEEK3_URLS.JS - Week 3 Content URL Validation
 * ============================================================================
 * 
 * Purpose: Validate all image_url, audio_url, and video queries in Week 3
 * Before running audio/image generation
 * 
 * Based on: ENGQUEST MASTER PROMPT V27/V26 specifications
 * 
 * Usage:
 *   node tools/validate_week3_urls.js
 * 
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

const WEEK = 3;
const WEEK_STR = String(WEEK).padStart(2, '0');
const WEEK_FOLDER = `week_${WEEK_STR}`;

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
};

function log(msg, color = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

function logHeader(title) {
  log(`\n${'='.repeat(80)}`, 'blue');
  log(`  ${title}`, 'blue');
  log(`${'='.repeat(80)}\n`, 'blue');
}

// ============================================================================
// VALIDATION RULES (V27/V26)
// ============================================================================

const VALIDATION_RULES = {
  IMAGE_URL: {
    pattern: /^\/images\/week\d+(_easy)?\/[a-z0-9_-]+\.(jpg|png)$/i,
    description: '/images/week<ID>[_easy]/<filename>.jpg or .png',
    examples: [
      '✅ /images/week3/tall.jpg',
      '✅ /images/week3_easy/smile.jpg',
      '❌ /images/week3/TALL.jpg (uppercase)',
      '❌ images/week3/tall.jpg (missing leading /)',
      '❌ /images/week_03/tall.jpg (use week3, not week_03)',
    ]
  },
  
  AUDIO_URL: {
    pattern: /^\/audio\/week\d+(_easy)?\/[a-z0-9_-]+\.mp3$/i,
    description: '/audio/week<ID>[_easy]/<filename>.mp3',
    examples: [
      '✅ /audio/week3/vocab_tall.mp3',
      '✅ /audio/week3_easy/read_main.mp3',
      '❌ /audio/week_03/vocab_tall.mp3 (use week3, not week_03)',
      '❌ /audio/week3/vocab_tall.wav (must be .mp3)',
    ]
  },
  
  VIDEO_ID: {
    pattern: /^[a-zA-Z0-9_-]{11}$/,
    description: '11-character YouTube video ID',
    examples: [
      '✅ dQw4w9WgXcQ',
      '❌ dQw4w9WgXcQ123 (too long)',
      '❌ dQw4w9WgXc (too short)',
    ]
  },
  
  VIDEO_QUERY: {
    pattern: /^[a-z0-9 ]{3,}$/i,
    description: 'Search query string (min 3 characters)',
    examples: [
      '✅ describing people English learning',
      '❌ "describing people" (no quotes)',
      '❌ a (too short)',
    ]
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Load JavaScript module dynamically
 */
async function loadModule(filePath) {
  try {
    const absolutePath = new URL(`file://${filePath}`).href;
    const module = await import(absolutePath);
    return module.default || module;
  } catch (error) {
    throw new Error(`Failed to load ${filePath}: ${error.message}`);
  }
}

/**
 * Validate URL against pattern
 */
function validateURL(url, rule) {
  return {
    valid: rule.pattern.test(url),
    url,
    rule: rule.description
  };
}

/**
 * Count validations
 */
function countResults(results) {
  return {
    total: results.length,
    valid: results.filter(r => r.valid).length,
    invalid: results.filter(r => !r.valid).length,
  };
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate vocab.js image URLs
 */
async function validateVocabURLs(mode) {
  const baseDir = mode === 'easy' ? 'weeks_easy' : 'weeks';
  const filePath = path.join(ROOT, 'src', 'data', baseDir, WEEK_FOLDER, 'vocab.js');
  
  if (!fs.existsSync(filePath)) {
    return { skipped: true, message: `File not found: ${filePath}` };
  }

  const module = await loadModule(filePath);
  const data = module.vocab || module;
  const results = [];
  const issues = [];

  for (const word of data) {
    // Check image_url
    if (word.image_url) {
      results.push({
        word: word.word,
        type: 'image',
        ...validateURL(word.image_url, VALIDATION_RULES.IMAGE_URL)
      });
    }
    
    // Check audio_word (REQUIRED)
    if (word.audio_word) {
      results.push({
        word: word.word,
        type: 'audio_word',
        ...validateURL(word.audio_word, VALIDATION_RULES.AUDIO_URL)
      });
    } else {
      issues.push(`Word "${word.word}": Missing audio_word`);
    }

    // Check audio_def (REQUIRED per V27)
    if (word.audio_def) {
      results.push({
        word: word.word,
        type: 'audio_def',
        ...validateURL(word.audio_def, VALIDATION_RULES.AUDIO_URL)
      });
    } else {
      issues.push(`Word "${word.word}": Missing audio_def (definition audio)`);
    }

    // Check audio_ex (REQUIRED per V27)
    if (word.audio_ex) {
      results.push({
        word: word.word,
        type: 'audio_ex',
        ...validateURL(word.audio_ex, VALIDATION_RULES.AUDIO_URL)
      });
    } else {
      issues.push(`Word "${word.word}": Missing audio_ex (example audio)`);
    }

    // Check audio_coll (REQUIRED per V27)
    if (word.audio_coll) {
      results.push({
        word: word.word,
        type: 'audio_coll',
        ...validateURL(word.audio_coll, VALIDATION_RULES.AUDIO_URL)
      });
    } else {
      issues.push(`Word "${word.word}": Missing audio_coll (collocation audio)`);
    }
  }

  return { results, issues };
}

/**
 * Validate read.js and explore.js image URLs
 */
async function validateContentURLs(mode) {
  const baseDir = mode === 'easy' ? 'weeks_easy' : 'weeks';
  const results = [];

  for (const file of ['read.js', 'explore.js']) {
    const filePath = path.join(ROOT, 'src', 'data', baseDir, WEEK_FOLDER, file);
    
    if (!fs.existsSync(filePath)) {
      continue;
    }

    const data = await loadModule(filePath);
    
    if (data.image_url) {
      results.push({
        file,
        ...validateURL(data.image_url, VALIDATION_RULES.IMAGE_URL)
      });
    }
  }

  return { results };
}

/**
 * Validate audio URLs across all files
 */
async function validateAudioURLs(mode) {
  const baseDir = mode === 'easy' ? 'weeks_easy' : 'weeks';
  const results = [];
  
  const files = [
    'grammar.js', 'logic.js', 'ask_ai.js', 
    'dictation.js', 'shadowing.js', 'mindmap.js',
    'daily_watch.js', 'word_power.js'
  ];

  for (const file of files) {
    const filePath = path.join(ROOT, 'src', 'data', baseDir, WEEK_FOLDER, file);
    
    if (!fs.existsSync(filePath)) {
      continue;
    }

    const data = await loadModule(filePath);

    // Grammar exercises
    if (data.exercises && Array.isArray(data.exercises)) {
      for (const ex of data.exercises) {
        if (ex.audio_url) {
          results.push({
            file,
            item: `Exercise ${ex.id}`,
            ...validateURL(ex.audio_url, VALIDATION_RULES.AUDIO_URL)
          });
        }
      }
    }

    // Logic puzzles
    if (Array.isArray(data) && file === 'logic.js') {
      for (const puzzle of data) {
        if (puzzle.audio_url) {
          results.push({
            file,
            item: `Puzzle ${puzzle.id}`,
            ...validateURL(puzzle.audio_url, VALIDATION_RULES.AUDIO_URL)
          });
        }
      }
    }

    // Ask AI prompts
    if (Array.isArray(data) && file === 'ask_ai.js') {
      for (const prompt of data) {
        if (prompt.audio_url) {
          results.push({
            file,
            item: `Prompt ${prompt.id}`,
            ...validateURL(prompt.audio_url, VALIDATION_RULES.AUDIO_URL)
          });
        }
      }
    }

    // Dictation/Shadowing
    if (Array.isArray(data) && (file === 'dictation.js' || file === 'shadowing.js')) {
      for (const sent of data) {
        if (sent.audio_url) {
          results.push({
            file,
            item: `Sentence ${sent.id}`,
            ...validateURL(sent.audio_url, VALIDATION_RULES.AUDIO_URL)
          });
        }
      }
    }

    // Mindmap
    if (data.centerStems && file === 'mindmap.js') {
      for (const stem of data.centerStems) {
        if (stem.audio) {
          results.push({
            file,
            item: `Stem: "${stem.text}"`,
            ...validateURL(stem.audio, VALIDATION_RULES.AUDIO_URL)
          });
        }
      }
    }

    // Daily Watch
    if (Array.isArray(data) && file === 'daily_watch.js') {
      for (const video of data) {
        if (video.videoId) {
          results.push({
            file,
            item: `Video ${video.id}: ${video.title}`,
            ...validateURL(video.videoId, VALIDATION_RULES.VIDEO_ID)
          });
        }
      }
    }

    // Word Power
    if (Array.isArray(data) && file === 'word_power.js') {
      for (const coll of data) {
        if (coll.image_url) {
          results.push({
            file,
            item: `Collocation: ${coll.word}`,
            ...validateURL(coll.image_url, VALIDATION_RULES.IMAGE_URL)
          });
        }
      }
    }
  }

  return { results };
}

/**
 * Validate video_queries.json (Advanced only)
 */
async function validateVideoQueries() {
  const filePath = path.join(ROOT, 'src', 'data', 'weeks', WEEK_FOLDER, 'video_queries.json');
  
  if (!fs.existsSync(filePath)) {
    return { skipped: true, message: `Not found: video_queries.json (Advanced mode only)` };
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const results = [];

  if (data.backup_queries && Array.isArray(data.backup_queries)) {
    for (const query of data.backup_queries) {
      results.push({
        query,
        ...validateURL(query, VALIDATION_RULES.VIDEO_QUERY)
      });
    }
  }

  return { results };
}

/**
 * Validate index.js structure
 */
async function validateIndexStructure(mode) {
  const baseDir = mode === 'easy' ? 'weeks_easy' : 'weeks';
  const filePath = path.join(ROOT, 'src', 'data', baseDir, WEEK_FOLDER, 'index.js');
  
  if (!fs.existsSync(filePath)) {
    return { skipped: true, message: `File not found: index.js` };
  }

  const module = await loadModule(filePath);
  const data = module.default || module;
  const issues = [];

  // Check required fields
  const requiredFields = ['weekId', 'weekTitle_en', 'weekTitle_vi', 'grammar_focus', 'voiceConfig', 'stations'];
  for (const field of requiredFields) {
    if (!data[field]) {
      issues.push(`Missing required field: ${field}`);
    }
  }

  // Check voiceConfig
  const voiceFields = ['narration', 'vocabulary', 'dictation', 'questions', 'mindmap'];
  if (data.voiceConfig) {
    for (const field of voiceFields) {
      if (!data.voiceConfig[field]) {
        issues.push(`Missing voiceConfig field: ${field}`);
      }
    }
  }

  // Check stations
  const requiredStations = [
    'read_explore', 'new_words', 'word_match', 'grammar', 'ask_ai',
    'logic_lab', 'dictation', 'shadowing', 'video', 'writing',
    'explore', 'word_power', 'daily_watch', 'mindmap_speaking'
  ];
  
  if (data.stations) {
    for (const station of requiredStations) {
      if (!data.stations[station]) {
        issues.push(`Missing station: ${station}`);
      }
    }
  }

  return { 
    valid: issues.length === 0,
    issues 
  };
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  logHeader('WEEK 3 URL VALIDATION REPORT');
  
  let totalIssues = 0;

  // Validate both modes
  for (const mode of ['advanced', 'easy']) {
    logHeader(`${mode.toUpperCase()} MODE`);

    try {
      // Vocab URLs
      log('Checking vocab.js URLs...', 'blue');
      const vocabResults = await validateVocabURLs(mode);
      if (!vocabResults.skipped) {
        const counts = countResults(vocabResults.results);
        log(`  Total: ${counts.total} | ✅ Valid: ${counts.valid} | ❌ Invalid: ${counts.invalid}`, counts.invalid > 0 ? 'red' : 'green');
        
        // Show missing field issues first
        if (vocabResults.issues && vocabResults.issues.length > 0) {
          for (const issue of vocabResults.issues) {
            log(`    ⚠️ ${issue}`, 'red');
            totalIssues++;
          }
        }
        
        // Show URL validation issues
        for (const result of vocabResults.results) {
          if (!result.valid) {
            log(`    ❌ ${result.word} (${result.type}): ${result.url}`, 'red');
            log(`       Expected format: ${result.rule}`, 'yellow');
            totalIssues++;
          }
        }
      }

      // Content URLs (read.js, explore.js)
      log('\nChecking read.js & explore.js URLs...', 'blue');
      const contentResults = await validateContentURLs(mode);
      if (contentResults.results.length > 0) {
        const counts = countResults(contentResults.results);
        log(`  Total: ${counts.total} | ✅ Valid: ${counts.valid} | ❌ Invalid: ${counts.invalid}`, counts.invalid > 0 ? 'red' : 'green');
        
        for (const result of contentResults.results) {
          if (!result.valid) {
            log(`    ❌ ${result.file}: ${result.url}`, 'red');
            totalIssues++;
          }
        }
      }

      // Audio URLs
      log('\nChecking audio URLs...', 'blue');
      const audioResults = await validateAudioURLs(mode);
      if (audioResults.results.length > 0) {
        const counts = countResults(audioResults.results);
        log(`  Total: ${counts.total} | ✅ Valid: ${counts.valid} | ❌ Invalid: ${counts.invalid}`, counts.invalid > 0 ? 'red' : 'green');
        
        for (const result of audioResults.results) {
          if (!result.valid) {
            log(`    ❌ ${result.file} (${result.item}): ${result.url}`, 'red');
            totalIssues++;
          }
        }
      }

      // Index.js structure
      log('\nChecking index.js structure...', 'blue');
      const indexResult = await validateIndexStructure(mode);
      if (!indexResult.skipped) {
        if (indexResult.valid) {
          log('  ✅ All required fields present', 'green');
        } else {
          log(`  ❌ Found ${indexResult.issues.length} issues:`, 'red');
          for (const issue of indexResult.issues) {
            log(`    - ${issue}`, 'red');
            totalIssues++;
          }
        }
      }

    } catch (error) {
      log(`ERROR: ${error.message}`, 'red');
      totalIssues++;
    }
  }

  // Video Queries (Advanced only)
  logHeader('VIDEO QUERIES (ADVANCED ONLY)');
  try {
    log('Checking video_queries.json...', 'blue');
    const videoResults = await validateVideoQueries();
    if (!videoResults.skipped) {
      const counts = countResults(videoResults.results);
      log(`  Total: ${counts.total} | ✅ Valid: ${counts.valid} | ❌ Invalid: ${counts.invalid}`, counts.invalid > 0 ? 'red' : 'green');
      
      for (const result of videoResults.results) {
        if (!result.valid) {
          log(`    ❌ "${result.query}" - ${result.rule}`, 'red');
          totalIssues++;
        }
      }
    } else {
      log(`  ℹ️ ${videoResults.message}`, 'yellow');
    }
  } catch (error) {
    log(`ERROR: ${error.message}`, 'red');
    totalIssues++;
  }

  // Final Summary
  logHeader('VALIDATION SUMMARY');
  if (totalIssues === 0) {
    log('✅ ALL VALIDATIONS PASSED!', 'green');
    log('\nWeek 3 is ready for:');
    log('  1. Audio generation: node tools/batch_manager.js 3 both', 'green');
    log('  2. Image generation: node tools/generate_images_nano_banana.js 3 both', 'green');
    log('  3. Video fetching: node tools/update_videos.js 3', 'green');
    process.exit(0);
  } else {
    log(`❌ FOUND ${totalIssues} VALIDATION ISSUE(S)`, 'red');
    log('\nFix the issues above before running asset generation.', 'yellow');
    process.exit(1);
  }
}

main().catch(error => {
  log(`FATAL ERROR: ${error.message}`, 'red');
  process.exit(1);
});
