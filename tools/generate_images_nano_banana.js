/**
 * UNIFIED IMAGE GENERATOR - NANO BANANA (FREE)
 * Generates images for BOTH Advanced and Easy modes
 * Usage: node tools/generate_images_nano_banana.js <WEEK_ID> <MODE>
 * Example: node tools/generate_images_nano_banana.js 1 advanced
 *          node tools/generate_images_nano_banana.js 1 easy
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// === CONFIG ===
const GEMINI_API_KEY = loadApiKey();
const MODEL = 'gemini-3-pro-image-preview'; // Nano Banana free tier
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// === LOAD API KEY ===
function loadApiKey() {
  const apiKeyFile = path.join(__dirname, '..', 'API keys.txt');
  const content = fs.readFileSync(apiKeyFile, 'utf-8');
  const match = content.match(/GEMINI_API_KEY[:\s=]+([^\s\n]+)/);
  return match ? match[1] : null;
}

// === CLI ARGS ===
const args = process.argv.slice(2);
const weekId = parseInt(args[0]);
const mode = args[1] || 'advanced'; // 'advanced' or 'easy'

if (!weekId || (mode !== 'advanced' && mode !== 'easy')) {
  console.error('❌ Usage: node tools/generate_images_nano_banana.js <WEEK_ID> <advanced|easy>');
  console.error('   Example: node tools/generate_images_nano_banana.js 1 advanced');
  process.exit(1);
}

// === PATHS ===
const weekFolder = mode === 'easy' ? `week_${weekId.toString().padStart(2, '0')}` : `week_${weekId.toString().padStart(2, '0')}`;
const dataPath = mode === 'easy' 
  ? path.join(__dirname, '..', 'src', 'data', 'weeks_easy', weekFolder)
  : path.join(__dirname, '..', 'src', 'data', 'weeks', weekFolder);

const outputFolder = mode === 'easy' ? `week${weekId}_easy` : `week${weekId}`;
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', outputFolder);

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// === LOAD WEEK DATA ===
async function loadWeekData() {
  try {
    const indexPath = path.join(dataPath, 'index.js');
    const weekData = (await import(pathToFileURL(indexPath).href)).default;
    return weekData;
  } catch (e) {
    console.error(`❌ Failed to load week data: ${e.message}`);
    process.exit(1);
  }
}

// === GENERATE IMAGE ===
async function generateImage(prompt) {
  const payload = JSON.stringify({
    contents: [{
      parts: [{ text: prompt }]
    }],
    generationConfig: {
      temperature: 1,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
    }
  });

  return new Promise((resolve, reject) => {
    const req = https.request(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const imageData = json.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
          if (imageData) {
            resolve(Buffer.from(imageData, 'base64'));
          } else {
            reject(new Error('No image data in response'));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// === GENERATE ALL IMAGES ===
async function generateAllImages() {
  console.log(`\n🎨 NANO BANANA IMAGE GENERATOR`);
  console.log(`📁 Week ${weekId} - ${mode.toUpperCase()} MODE\n`);

  const weekData = await loadWeekData();
  const images = [];

  // 1. VOCAB IMAGES (10)
  const vocab = weekData.stations?.new_words?.vocab || weekData.global_vocab || [];
  for (const item of vocab) {
    const word = item.word.toLowerCase().replace(/\s+/g, '_');
    const filename = `${word}.jpg`;
    const filepath = path.join(OUTPUT_DIR, filename);

    // Style based on mode
    const style = mode === 'easy' 
      ? 'Simple colorful cartoon illustration for young ESL learners (age 6-8). Bright, friendly, child-like style.'
      : 'Clean educational illustration for ESL students (age 9-12). Semi-realistic, clear, professional but approachable style.';

    const prompt = `${style} Image concept: ${item.definition_en || item.word}. Square 1:1 ratio, no text, focus on the main object/concept clearly.`;

    images.push({ word, filename, filepath, prompt });
  }

  // 2. WORD POWER IMAGES (3 in Phase 1)
  const wordPower = weekData.stations?.word_power?.words || [];
  for (const item of wordPower) {
    const word = item.word.toLowerCase().replace(/\s+/g, '_');
    const filename = `wordpower_${word}.jpg`;
    const filepath = path.join(OUTPUT_DIR, filename);

    const style = mode === 'easy'
      ? 'Simple colorful cartoon illustration showing the concept for young ESL learners (age 6-8). Bright, friendly style.'
      : 'Clear educational illustration showing the concept for ESL students (age 9-12). Semi-realistic, professional style.';

    const prompt = `${style} Image concept: ${item.definition_en || item.word}. Example usage: "${item.example}". Square 1:1 ratio, no text in image.`;

    images.push({ word, filename, filepath, prompt });
  }

  // 3. COVER IMAGES (2)
  // Read cover
  const readTitle = weekData.stations?.read_explore?.title_en || weekData.weekTitle_en;
  const readContent = weekData.stations?.read_explore?.content_en?.substring(0, 100) || '';
  const readFilename = `read_cover_w${weekId}.jpg`;
  const readFilepath = path.join(OUTPUT_DIR, readFilename);

  const readStyle = mode === 'easy'
    ? 'Wide colorful illustration for young children (age 6-8). Bright, cheerful, cartoon style.'
    : 'Wide educational illustration for students (age 9-12). Semi-realistic, engaging, clear composition.';

  const readPrompt = `${readStyle} Scene for story titled "${readTitle}". Context: ${readContent}... Wide 16:9 banner format, show full scene, no text overlay, no cropping.`;

  images.push({ word: 'read_cover', filename: readFilename, filepath: readFilepath, prompt: readPrompt });

  // Explore cover
  const exploreTitle = weekData.stations?.explore?.title_en || 'Exploration';
  const exploreContent = weekData.stations?.explore?.content_en?.substring(0, 100) || '';
  const exploreFilename = `explore_cover_w${weekId}.jpg`;
  const exploreFilepath = path.join(OUTPUT_DIR, exploreFilename);

  const exploreStyle = mode === 'easy'
    ? 'Wide colorful illustration for young children exploring a topic (age 6-8). Bright, inviting, playful style.'
    : 'Wide educational illustration for students exploring a topic (age 9-12). Semi-realistic, detailed, informative style.';

  const explorePrompt = `${exploreStyle} Scene for topic "${exploreTitle}". Context: ${exploreContent}... Wide 16:9 banner format, show full scene, no text overlay, educational focus.`;

  images.push({ word: 'explore_cover', filename: exploreFilename, filepath: exploreFilepath, prompt: explorePrompt });

  // === GENERATE ===
  let success = 0;
  let failed = 0;

  for (let i = 0; i < images.length; i++) {
    const { word, filename, filepath, prompt } = images[i];

    // Skip if exists
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  [${i + 1}/${images.length}] ${filename} already exists, skipping...`);
      continue;
    }

    console.log(`[${i + 1}/${images.length}] Generating ${filename}...`);

    try {
      const imageBuffer = await generateImage(prompt);
      fs.writeFileSync(filepath, imageBuffer);
      const sizeKB = (imageBuffer.length / 1024).toFixed(2);
      console.log(`✅ Saved: ${filename} (${sizeKB} KB)`);
      success++;

      // Rate limit: 3 seconds between requests
      if (i < images.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (err) {
      console.error(`❌ Failed ${filename}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n🎉 Generation Complete!`);
  console.log(`✅ Success: ${success}/${images.length}`);
  console.log(`❌ Failed: ${failed}/${images.length}`);
  console.log(`💰 Cost: $0.00 (Nano Banana free tier)\n`);
}

// === RUN ===
generateAllImages().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
