#!/usr/bin/env node

/**
 * ============================================================================
 * GENERATE_WEEK.JS - EngQuest3k Mass Production Content Generator
 * ============================================================================
 * 
 * Purpose: Generate complete Week content (17 files) from Master Prompt V24.2
 * 
 * Input: Week number (1-54)
 * Output: 
 *   - 14 .js files per mode (Advanced + Easy)
 *   - 1 video_queries.json file (Advanced only)
 * 
 * Flow:
 *   1. Read syllabus data for target week
 *   2. Load Master Prompt V24.2 as system instruction
 *   3. Call GPT-4 API with structured expansion prompts (14 files × 2 modes)
 *   4. Validate output against Master Prompt schemas
 *   5. Write files to src/data/weeks/week_XX/ and src/data/weeks_easy/week_XX/
 * 
 * Dependencies:
 *   - OpenAI GPT-4 API (key from API keys.txt)
 *   - Master Prompt V24.2 (ENGQUEST MASTER PROMPT V23-FINAL.txt)
 *   - Syllabus (NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt)
 * 
 * Usage:
 *   node tools/generate_week.js <week_number>
 *   
 * Example:
 *   node tools/generate_week.js 2
 * 
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

// ============================================================================
// CONFIGURATION - GEMINI 2.0 FLASH (FREE)
// ============================================================================

// Load Gemini API key from API keys.txt
const API_KEYS_FILE = path.join(ROOT, 'API keys.txt');
let GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY && fs.existsSync(API_KEYS_FILE)) {
  const keysContent = fs.readFileSync(API_KEYS_FILE, 'utf-8');
  // Try multiple formats
  let match = keysContent.match(/GEMINI_API_KEY:\s*([^\n\r]+)/);
  if (!match) {
    match = keysContent.match(/Gemini API Key:\s*([^\n\r]+)/);
  }
  if (match) {
    GEMINI_API_KEY = match[1].trim();
  }
}

if (!GEMINI_API_KEY) {
  console.error('❌ Gemini API key not found!');
  console.error('   Set GEMINI_API_KEY environment variable or add to API keys.txt');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.0-flash-exp',
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 8192,
  }
});

// Rate limiting helper
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 6000; // 6 seconds = 10 requests/minute max

const MASTER_PROMPT_PATH = path.join(ROOT, '5. ENGQUEST MASTER PROMPT V24.2-FINAL.txt');
const SYLLABUS_PATH = path.join(ROOT, '1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');

// File generation order (vocab must be first, read must be second)
const FILE_TYPES = [
  'vocab', 'read', 'explore', 'word_power', 'grammar', 'logic', 'writing', 
  'dictation', 'shadowing', 'word_match', 'mindmap', 'ask_ai', 'daily_watch', 'index'
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Load Master Prompt V24.2 as system instruction
 */
function loadMasterPrompt() {
  if (!fs.existsSync(MASTER_PROMPT_PATH)) {
    throw new Error(`Master Prompt not found: ${MASTER_PROMPT_PATH}`);
  }
  return fs.readFileSync(MASTER_PROMPT_PATH, 'utf-8');
}

/**
 * Load full syllabus file
 */
function loadSyllabus() {
  if (!fs.existsSync(SYLLABUS_PATH)) {
    throw new Error(`Syllabus not found: ${SYLLABUS_PATH}`);
  }
  return fs.readFileSync(SYLLABUS_PATH, 'utf-8');
}

/**
 * Extract week data from syllabus by week number
 * Returns raw syllabus text for the target week
 */
function extractWeekData(syllabus, weekNum) {
  // Parse syllabus to find Week X section
  const weekRegex = new RegExp(
    `Week ${weekNum}[:\\s\\n]+([\\s\\S]*?)(?=Week ${weekNum + 1}[:\\s\\n]|$)`,
    'i'
  );
  const match = syllabus.match(weekRegex);

  if (!match) {
    throw new Error(`Week ${weekNum} not found in syllabus`);
  }

  return match[1].trim();
}

/**
 * Load Week 1 file as schema example
 */
async function loadWeek1Example(fileType, mode) {
  const weekFolder = 'week_01';
  const baseDir = mode === 'easy' ? 'weeks_easy' : 'weeks';
  const filePath = path.join(ROOT, 'src', 'data', baseDir, weekFolder, `${fileType}.js`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  // Extract just the export default {...} part, limit to first 100 lines
  const lines = content.split('\n').slice(0, 100);
  return lines.join('\n');
}

/**
 * Call GPT-4 to generate specific file content
 */
async function generateFile(masterPrompt, weekData, fileType, mode = 'advanced', vocabWords = []) {
  console.log(`  📝 Generating ${fileType}.js (${mode})...`);
  
  const fileRules = {
    vocab: 'MUST contain EXACTLY 10 vocabulary words.',
    grammar: 'MUST contain EXACTLY 20 grammar exercises (10-12 mc, 4-6 fill, 2-4 unscramble).',
    word_power: 'MUST contain EXACTLY 3 collocations (verb + noun phrases).',
    logic: 'MUST contain EXACTLY 5 math/logic puzzles with full story context.',
    ask_ai: 'MUST contain EXACTLY 5 A0-level prompts (max 10 words context).',
    read: mode === 'easy' 
      ? 'MUST contain 8-12 sentences with TOTAL 60-80 WORDS. Bold EXACTLY 10 words from vocab.js. Story must be engaging and complete.'
      : 'MUST contain 10-16 sentences with TOTAL 100-120 WORDS. Bold EXACTLY 10 words from vocab.js. Story must be engaging and complete.',
    explore: mode === 'easy'
      ? 'MUST contain 8-12 sentences with TOTAL 60-80 WORDS. Bold 10 NEW words (not from vocab.js). Content must be educational CLIL.'
      : 'MUST contain 10-16 sentences with TOTAL 100-120 WORDS. Bold 10 NEW words (not from vocab.js). Content must be educational CLIL.',
    week_real: 'MUST return a complete JavaScript module with "export default { ... };" containing: weekTitle, weekId, targetVocab (array of 7 words), story (3 missions array), grammarFocus, pronunciationFocus, freeTalkScenarios.',
    default: `Follow the schema from the Week 1 example precisely.`
  };

  const specificRule = fileRules[fileType] || fileRules.default;

  const modeInstructions =
    mode === 'easy'
      ? `EASY MODE REQUIREMENTS:
- Context sentences: 5-6 words maximum
- Total sentences in reading passages: 8-10 sentences (flexible)
- Story length: MUST be 60-80 words (count all words, including bolded ones)
- Vocabulary: Simpler, more basic (Tier 1)
- Difficulty: A0 level (absolute beginner)
`
      : `ADVANCED MODE REQUIREMENTS:
- Context sentences: 8-10 words
- Total sentences in reading passages: 10-12 sentences (flexible)  
- Story length: MUST be 100-120 words (count all words, including bolded ones)
- Vocabulary: Full A0 vocabulary, academic focus (Tier 2)
- Difficulty: A0++ level (upper A0)
`;

  // Load Week 1 example for schema reference
  const week1Example = await loadWeek1Example(fileType, mode);
  const exampleSection = week1Example 
    ? `\n\nEXAMPLE SCHEMA (Week 1 ${fileType}.js - ${mode.toUpperCase()} MODE):\n${week1Example}\n\nIMPORTANT: Your generated content MUST match or EXCEED the word count in this example.\n\n`
    : '';

  // Use condensed prompt to avoid token limits
  const systemPrompt = `You are an expert ESL content creator for Vietnamese children (ages 6-10).
Generate CEFR A0 level content following these rules:

GENERATION CONTEXT:
- Week: ${weekData.weekNum}
- Mode: ${mode.toUpperCase()}
- Target file: ${fileType}.js

${modeInstructions}

KEY REQUIREMENTS:
- CEFR A0 vocabulary only (simple, high-frequency words)
- Child-friendly topics (family, school, animals, food, colors)
- Short, clear sentences
- Vietnamese translations required for all text
- Follow the EXACT schema structure from Week 1 example below

${exampleSection}
 FOR THIS FILE (${fileType}.js):
1. ${specificRule}
2. Follow Master Prompt V24.2 schema for ${fileType}.js EXACTLY.
3. Use CEFR A0 vocabulary ONLY (max 2 syllables).
4. All contexts must be child-friendly (ages 6-10).
5. Return ONLY the JavaScript object, no markdown, no comments outside the object.
- All text in English (no Vietnamese except in translations)
`;

  const userPrompt = `Generate the ${fileType}.js file content for Week ${weekData.weekNum} (${mode} mode).

SYLLABUS DATA FOR THIS WEEK:
${weekData.syllabusText}
${vocabWords.length > 0 ? `\n\nVOCABULARY ALREADY GENERATED (use these words):\n${vocabWords.join(', ')}\n` : ''}

CRITICAL RULES:
1. Follow Master Prompt V24.2 schema for ${fileType}.js EXACTLY
2. Use CEFR A0 vocabulary ONLY
3. All contexts must be child-friendly (ages 6-10)
4. ${mode === 'easy' ? 'Simplify contexts to 5-6 words, use 8-10 sentences total' : 'Use 8-10 word contexts, use 10-12 sentences total'}
5. ${fileType === 'read' ? (mode === 'easy' ? 'Story MUST be 60-80 words long. Write at least 8 sentences. Add details and descriptions.' : 'Story MUST be 100-120 words long. Write at least 10 sentences. Add rich details, descriptions, and dialogues.') : ''}
6. ${fileType === 'explore' ? (mode === 'easy' ? 'Text MUST be 60-80 words long. Write at least 8 sentences with educational details.' : 'Text MUST be 100-120 words long. Write at least 10 sentences with rich educational content.') : ''}
7. ${fileType === 'read' && vocabWords.length > 0 ? `Bold EXACTLY these 10 words from vocab using **word**: ${vocabWords.join(', ')}` : ''}
8. ${fileType === 'explore' ? `Bold 10 NEW words (NOT from vocab: ${vocabWords.join(', ')}) using **word**` : ''}
9. Return ONLY valid JavaScript code. NO markdown fences. NO explanations. Ensure all JSON strings are properly quoted and escaped.
10. ${fileType === 'week_real' ? 'MUST START with "export default {" and END with "};". Return complete JavaScript module.' : 'Return complete export default object with ALL required fields.'}

Generate now:`;

  try {
    // 🔥 RATE LIMITING: Wait at least 6 seconds between requests
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
      console.log(`  ⏳ Rate limiting: waiting ${Math.round(waitTime/1000)}s...`);
      await delay(waitTime);
    }
    lastRequestTime = Date.now();
    
    // 🔥 GEMINI 2.0 FLASH API CALL (FREE) with retry
    let retries = 3;
    let result;
    
    while (retries > 0) {
      try {
        result = await model.generateContent([
          systemPrompt,
          userPrompt
        ]);
        break; // Success, exit retry loop
      } catch (error) {
        if (error.message.includes('429') && retries > 1) {
          console.log(`  ⚠️  Rate limit hit, waiting 25s before retry (${retries-1} retries left)...`);
          await delay(25000); // Wait 25 seconds as suggested by API
          retries--;
        } else {
          throw error; // Other error or last retry, throw
        }
      }
    }
    
    const response = await result.response;
    let content = response.text().trim();

    // Remove markdown fences if present
    content = content
      .replace(/^```javascript\n?/, '')
      .replace(/^```js\n?/, '')
      .replace(/^```\n?/, '')
      .replace(/\n?```$/, '')
      .trim();

    return content;
  } catch (error) {
    console.error(`❌ Error generating ${fileType}: ${error.message}`);
    throw error;
  }
}

/**
 * Validate generated file content
 */
function validateFile(content, fileType, mode = 'advanced') {
  // Basic syntax checks
  if (!content.includes('export default')) {
    throw new Error(`${fileType}: Missing 'export default' statement`);
  }

  if (content.includes('```')) {
    throw new Error(`${fileType}: Contains markdown fences - invalid JavaScript`);
  }

  if (!content.includes('{') || !content.includes('}')) {
    throw new Error(`${fileType}: Missing object brackets`);
  }

  // Content validation for read.js and explore.js
  if (fileType === 'read' || fileType === 'explore') {
    // Extract story text - try multiple patterns
    let storyText = '';
    
    // Pattern 1: content_en: "text" (Gemini new format)
    let textMatch = content.match(/content_en:\s*"([^"]+)"/s);
    if (!textMatch) {
      // Pattern 2: story: `text` (old format)
      textMatch = content.match(/story:\s*`([^`]+)`/s);
    }
    if (!textMatch) {
      // Pattern 3: text: `text` (for explore.js old format)
      textMatch = content.match(/text:\s*`([^`]+)`/s);
    }
    if (!textMatch) {
      // Pattern 4: story: "text" (alternative)
      textMatch = content.match(/story:\s*"([^"]+)"/s);
    }
    
    if (textMatch) {
      storyText = textMatch[1];
      // Remove ** markdown bold tags and count words
      const plainText = storyText.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
      const wordCount = plainText.split(/\s+/).filter(w => w.length > 0).length;
      
      const minWords = mode === 'easy' ? 60 : 100;
      const maxWords = mode === 'easy' ? 80 : 120;
      
      if (wordCount < minWords) {
        throw new Error(`${fileType} (${mode}): Story too short - ${wordCount} words (need ${minWords}-${maxWords}). MUST write longer story with more details and context.`);
      }
      
      if (wordCount > maxWords + 10) { // Allow 10 word buffer
        console.log(`  ⚠️  ${fileType}: Story slightly long (${wordCount} words, target ${minWords}-${maxWords})`);
      }
    }
  }

  return true;
}

/**
 * Write file to disk
 */
function writeFile(content, weekNum, fileType, mode) {
  const paddedWeekNum = String(weekNum).padStart(2, '0');
  let dir;
  let fileName = `${fileType}.js`;

  if (mode === 'shared') {
    // Place week_real.js in the parent `weeks` directory
    dir = path.join(ROOT, 'src', 'data', 'weeks');
    fileName = `week_${paddedWeekNum}_real.js`;
  } else {
    const modeDir = mode === 'easy' ? 'weeks_easy' : 'weeks';
    dir = path.join(ROOT, 'src', 'data', modeDir, `week_${paddedWeekNum}`);
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`  📁 Created directory: ${path.relative(ROOT, dir)}`);
  }

  const filePath = path.join(dir, fileName);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✅ Written: ${path.relative(ROOT, filePath)}`);
}

/**
 * Generate video_queries.json from Week 1 template
 */
function generateVideoQueries(weekNum, weekData) {
  console.log('  📹 Generating video_queries.json...');

  // Extract main topic from syllabus (first line usually)
  const firstLine = weekData.syllabusText.split('\n')[0].substring(0, 50);

  const videoQueries = {
    queries: [
      `children songs about ${firstLine}`,
      `educational video for kids english learning`,
      `cartoon for children learning english`,
    ],
    priorityChannels: [
      'English Singsing',
      'Little Fox',
      'Vooks',
      'Super Simple Songs',
      'Cocomelon',
      'Kids TV 123',
      'Dave and Ava',
      'Pinkfong Baby Shark',
    ],
  };

  const weekFolder = `week_${String(weekNum).padStart(2, '0')}`;
  const dirPath = path.join(ROOT, 'src', 'data', 'weeks', weekFolder);
  const filePath = path.join(dirPath, 'video_queries.json');

  fs.writeFileSync(filePath, JSON.stringify(videoQueries, null, 2), 'utf-8');
  console.log(`  ✅ Written: video_queries.json`);
}

// ============================================================================
// MAIN GENERATION FLOW
// ============================================================================

async function generateWeek(weekNum) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`🚀 GENERATING WEEK ${weekNum}`);
  console.log(`${'='.repeat(80)}\n`);

  // Step 1: Load Master Prompt
  console.log('📖 Loading Master Prompt V24.2...');
  const masterPrompt = loadMasterPrompt();
  console.log(`   ✅ Loaded (${masterPrompt.length} characters)\n`);

  // Step 2: Load Syllabus
  console.log('📖 Loading Syllabus...');
  const syllabus = loadSyllabus();
  console.log(`   ✅ Loaded\n`);

  // Step 3: Extract Week Data
  console.log(`📖 Extracting Week ${weekNum} data from syllabus...`);
  const syllabusText = extractWeekData(syllabus, weekNum);
  console.log(`   ✅ Found:\n${syllabusText.substring(0, 200)}...\n`);

  const weekData = { weekNum, syllabusText };
  let vocabWords = [];

  // Generate files for each mode
  for (const mode of ['advanced', 'easy']) {
    console.log(`\n${'─'.repeat(80)}`);
    console.log(`🎯 ${mode.toUpperCase()} MODE`);
    console.log(`${'─'.repeat(80)}`);
    
    // Reset vocabWords for each mode (each mode has its own vocabulary)
    let modeVocabWords = [];

    for (const fileType of FILE_TYPES) {
      let content;
      let attempts = 0;
      const maxAttempts = 10; // Tăng từ 3 lên 10 để đảm bảo đạt yêu cầu
      
      // Retry logic for content validation
      while (attempts < maxAttempts) {
        try {
          content = await generateFile(masterPrompt, weekData, fileType, mode, modeVocabWords);
          validateFile(content, fileType, mode);
          break; // Success
        } catch (error) {
          attempts++;
          if (attempts >= maxAttempts) {
            console.error(`  ❌ Failed after ${maxAttempts} attempts: ${error.message}`);
            throw error;
          }
          console.log(`  ⚠️  Validation failed (${error.message}), retrying (${attempts}/${maxAttempts})...`);
          await delay(3000); // Wait 3s before retry
        }
      }
      
      writeFile(content, weekNum, fileType, mode);

      // After generating vocab.js, extract the words to use in read.js and explore.js
      if (fileType === 'vocab') {
        try {
          // Use regex to extract ONLY the word field (not audio paths or other fields)
          // Match: { word: "something" - specifically after opening brace
          const wordMatches = content.match(/\{\s*word:\s*['"]([a-zA-Z\s]+)['"]/g);
          if (wordMatches && wordMatches.length > 0) {
            modeVocabWords = wordMatches.map(match => {
              const wordMatch = match.match(/word:\s*['"]([a-zA-Z\s]+)['"]/);
              return wordMatch ? wordMatch[1].trim() : null;
            }).filter(w => w !== null);
            console.log(`  📚 Extracted ${modeVocabWords.length} vocab words for ${mode} mode:`, modeVocabWords.join(', '));
          } else {
            console.error(`❌ Could not extract vocab words from generated file`);
            modeVocabWords = [];
          }
        } catch (e) {
          console.error(`❌ Could not parse generated vocab.js to extract words. Error: ${e.message}`);
          // Fallback to prevent crash
          modeVocabWords = [];
        }
      }
    }
  }

  // After generating all files for both modes, generate the shared week_real.js
  console.log(`\n${'─'.repeat(80)}`);
  console.log(`🎯 SHARED AI TUTOR FILE`);
  console.log(`${'─'.repeat(80)}`);
  const weekRealContent = await generateFile(masterPrompt, weekData, 'week_real', 'advanced', vocabWords); // Use advanced vocab
  validateFile(weekRealContent, 'week_real');
  // Note: writeFile needs to handle this special case for the path
  writeFile(weekRealContent, weekNum, 'week_real', 'shared');

  console.log(`\n${'='.repeat(80)}`);
  console.log(`✅ WEEK ${weekNum} GENERATION COMPLETE!`);
  console.log(`${'='.repeat(80)}`);

  console.log('📁 Files created:');
  console.log(`   - src/data/weeks/week_${String(weekNum).padStart(2, '0')}/       (14 .js + 1 .json)`);
  console.log(`   - src/data/weeks_easy/week_${String(weekNum).padStart(2, '0')}/  (14 .js)`);
  console.log(`   - src/data/weeks/week_${String(weekNum).padStart(2, '0')}_real.js (AI Tutor - shared)\n`);

  console.log('🔄 Starting automatic asset generation...\n');
  
  // Run asset generation pipeline automatically
  const { execSync } = await import('child_process');
  
  try {
    // Step 1: Update database
    console.log('📊 Step 1/4: Updating database...');
    execSync(`node tools/update_db_smart.js ${weekNum}`, { stdio: 'inherit', cwd: ROOT });
    
    // Step 2: Generate audio files
    console.log('\n🔊 Step 2/4: Generating audio files...');
    execSync(`node tools/batch_manager.js ${weekNum}`, { stdio: 'inherit', cwd: ROOT });
    
    // Step 3: Generate images
    console.log('\n🖼️  Step 3/4: Generating images...');
    execSync(`node tools/generate_images_nano.js ${weekNum}`, { stdio: 'inherit', cwd: ROOT });
    
    // Step 4: Fetch videos
    console.log('\n📹 Step 4/4: Fetching videos...');
    execSync(`node tools/update_videos.js ${weekNum}`, { stdio: 'inherit', cwd: ROOT });
    
    console.log('\n✅ ALL ASSETS GENERATED SUCCESSFULLY!\n');
  } catch (error) {
    console.error('\n❌ Asset generation failed:', error.message);
    console.log('\n⚠️  You can run these manually:');
    console.log(`   1. node tools/update_db_smart.js ${weekNum}`);
    console.log(`   2. node tools/batch_manager.js ${weekNum}`);
    console.log(`   3. node tools/generate_images_nano.js ${weekNum}`);
    console.log(`   4. node tools/update_videos.js ${weekNum}\n`);
  }
}

// ============================================================================
// CLI INTERFACE
// ============================================================================

const args = process.argv.slice(2);
const weekNum = parseInt(args[0]);

if (!weekNum || weekNum < 1 || weekNum > 54) {
  console.error('❌ Usage: node tools/generate_week.js <week_number>');
  console.error('   Example: node tools/generate_week.js 2');
  console.error('   Valid range: 1-54 (Phase 1: CEFR A0/A0++)');
  process.exit(1);
}

// Run generation
generateWeek(weekNum)
  .then(() => {
    console.log('🎉 SUCCESS!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error(`\n❌ GENERATION FAILED: ${error.message}\n`);
    console.error(error.stack);
    process.exit(1);
  });
