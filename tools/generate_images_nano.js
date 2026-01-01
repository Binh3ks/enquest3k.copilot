/**
 * UNIFIED IMAGE GENERATOR - Nano Banana (FREE)
 * Generates images for both Advanced and Easy modes using Gemini free tier
 * Cost: $0 for 144 weeks × 2 modes = 4,320 images
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load API key from API keys.txt
const loadApiKey = () => {
  const apiKeyFile = path.join(__dirname, '..', 'API keys.txt');
  const content = fs.readFileSync(apiKeyFile, 'utf-8');
  const match = content.match(/GEMINI_API_KEY[:\s=]+([^\s\n]+)/);
  return match ? match[1] : null;
};

const GEMINI_API_KEY = loadApiKey();
if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not found in API keys.txt');
  process.exit(1);
}

// Parse command line arguments
const args = process.argv.slice(2);
const WEEK_ID = parseInt(args[0]);
const MODE = args[1] || 'both'; // 'advanced', 'easy', or 'both'

if (!WEEK_ID || WEEK_ID < 1 || WEEK_ID > 144) {
  console.error('❌ Usage: node tools/generate_images_nano.js <WEEK_ID> [advanced|easy|both]');
  console.error('   Example: node tools/generate_images_nano.js 1 both');
  process.exit(1);
}

console.log(`\n🎨 NANO BANANA IMAGE GENERATOR (FREE)`);
console.log(`📦 Week ${WEEK_ID}, Mode: ${MODE.toUpperCase()}`);
console.log(`🔑 API Key loaded from API keys.txt\n`);

// Nano Banana API configuration
const NANO_BANANA_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${GEMINI_API_KEY}`;

// Load week data
const loadWeekData = async (weekId, isEasy) => {
  const paddedWeek = weekId.toString().padStart(2, '0');
  const baseDir = isEasy ? 
    path.join(__dirname, '..', 'src', 'data', 'weeks_easy') :
    path.join(__dirname, '..', 'src', 'data', 'weeks');
  
  try {
    const weekPath = path.join(baseDir, `week_${paddedWeek}`, 'index.js');
    const { default: weekData } = await import(`file://${weekPath}`);
    return weekData;
  } catch (e) {
    console.error(`⚠️  Failed to load week ${weekId} ${isEasy ? 'Easy' : 'Advanced'} data:`, e.message);
    return null;
  }
};

// Generate image using Nano Banana
const generateImage = async (prompt) => {
  const payload = JSON.stringify({
    contents: [{
      parts: [{ text: prompt }]
    }],
    generationConfig: {
      temperature: 0.4,
      topK: 32,
      topP: 1
    }
  });

  return new Promise((resolve, reject) => {
    const req = https.request(NANO_BANANA_URL, {
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
};

// Save image to file
const saveImage = (buffer, outputPath) => {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, buffer);
};

// Generate prompt based on mode
const generatePrompt = (type, word, definition, isEasy, weekTitle) => {
  const baseStyle = isEasy ? 
    'Child-friendly, colorful, simple illustration for ESL kids age 6-12' :
    'Educational illustration with clean, modern style for ESL learners age 10-16';
  
  if (type === 'vocab') {
    return `Simple educational illustration of ${word}: ${definition}. ${baseStyle}. Square aspect ratio, clear focus on subject, bright natural lighting.`;
  }
  
  if (type === 'wordpower') {
    return `Educational illustration showing the concept "${word}" - ${definition}. ${baseStyle}. Square aspect ratio, clear visualization of the phrase meaning.`;
  }
  
  if (type === 'cover') {
    const coverStyle = isEasy ?
      'Colorful, playful illustration style with cartoon elements' :
      'Modern, semi-realistic illustration with natural tones';
    return `Wide landscape educational banner for "${weekTitle}". ${definition}. ${coverStyle}. 16:9 aspect ratio, full scene visible, no cropping, bright welcoming atmosphere.`;
  }
  
  return `Simple educational illustration: ${word}. ${baseStyle}.`;
};

// Process one mode
const processMode = async (weekId, isEasy) => {
  const modeLabel = isEasy ? 'EASY' : 'ADVANCED';
  const folderSuffix = isEasy ? '_easy' : '';
  
  console.log(`\n📂 Processing Week ${weekId} ${modeLabel} mode...`);
  
  const weekData = await loadWeekData(weekId, isEasy);
  if (!weekData) {
    console.log(`   ⚠️  No data found, skipping`);
    return;
  }
  
  const outputDir = path.join(__dirname, '..', 'public', 'images', `week${weekId}${folderSuffix}`);
  const tasks = [];
  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;
  
  // 1. Cover images (2)
  const readTitle = weekData.weekTitle_en || 'Reading';
  const readContent = weekData.stations?.read_explore?.content_en?.substring(0, 100) || 'Educational content';
  tasks.push({
    filename: `read_cover_w${weekId}.jpg`,
    prompt: generatePrompt('cover', readTitle, readContent, isEasy, readTitle),
    path: path.join(outputDir, `read_cover_w${weekId}.jpg`)
  });
  
  const exploreTitle = weekData.stations?.explore?.title_en || 'Explore';
  const exploreContent = weekData.stations?.explore?.content_en?.substring(0, 100) || 'Science topic';
  tasks.push({
    filename: `explore_cover_w${weekId}.jpg`,
    prompt: generatePrompt('cover', exploreTitle, exploreContent, isEasy, exploreTitle),
    path: path.join(outputDir, `explore_cover_w${weekId}.jpg`)
  });
  
  // 2. Vocab images (10)
  const vocab = weekData.global_vocab || weekData.stations?.new_words?.vocab || [];
  vocab.slice(0, 10).forEach(item => {
    const word = item.word.toLowerCase().replace(/\s+/g, '_');
    const definition = item.definition_en || item.word;
    tasks.push({
      filename: `${word}.jpg`,
      prompt: generatePrompt('vocab', item.word, definition, isEasy),
      path: path.join(outputDir, `${word}.jpg`)
    });
  });
  
  // 3. Word Power images (3 for Phase 1)
  const wordPower = weekData.stations?.word_power?.words || [];
  wordPower.slice(0, 3).forEach(item => {
    const word = item.word.toLowerCase().replace(/\s+/g, '_');
    const definition = item.definition_en || item.word;
    tasks.push({
      filename: `wordpower_${word}.jpg`,
      prompt: generatePrompt('wordpower', item.word, definition, isEasy),
      path: path.join(outputDir, `wordpower_${word}.jpg`)
    });
  });
  
  console.log(`   Found ${tasks.length} images to generate (2 covers + ${vocab.length} vocab + ${wordPower.length} word_power)`);
  
  // Generate images with rate limiting
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    
    // Skip if exists
    if (fs.existsSync(task.path)) {
      console.log(`   ⏭️  [${i+1}/${tasks.length}] ${task.filename} already exists, skipping...`);
      skipCount++;
      continue;
    }
    
    try {
      console.log(`   🎨 [${i+1}/${tasks.length}] Generating ${task.filename}...`);
      const imageBuffer = await generateImage(task.prompt);
      saveImage(imageBuffer, task.path);
      const sizeMB = (imageBuffer.length / 1024 / 1024).toFixed(2);
      console.log(`   ✅ Saved: ${task.filename} (${sizeMB} MB)`);
      successCount++;
      
      // Rate limit: 3 seconds between requests
      if (i < tasks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.log(`   ❌ Failed: ${task.filename} - ${error.message}`);
      failCount++;
    }
  }
  
  console.log(`\n   📊 Week ${weekId} ${modeLabel} Summary:`);
  console.log(`   ✅ Success: ${successCount}/${tasks.length}`);
  console.log(`   ⏭️  Skipped: ${skipCount}/${tasks.length}`);
  console.log(`   ❌ Failed: ${failCount}/${tasks.length}`);
};

// Main execution
const main = async () => {
  try {
    if (MODE === 'advanced' || MODE === 'both') {
      await processMode(WEEK_ID, false);
    }
    
    if (MODE === 'easy' || MODE === 'both') {
      await processMode(WEEK_ID, true);
    }
    
    console.log(`\n🎉 Image generation complete for Week ${WEEK_ID}!`);
    console.log(`💰 Cost: $0.00 (Nano Banana free tier)\n`);
  } catch (error) {
    console.error(`\n❌ Fatal error:`, error);
    process.exit(1);
  }
};

main();
