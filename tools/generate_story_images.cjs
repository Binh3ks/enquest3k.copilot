#!/usr/bin/env node
/**
 * generate_story_images.cjs — Generate story_prompts.picture_mode images for W16-W35.
 *
 * Reads week_NN/writing.js for the story_prompts.picture_mode.image_prompt,
 * calls Gemini Nano Banana to generate, and saves to public/images/weekN/story_writing_pic.jpg.
 *
 * Usage:
 *   node tools/generate_story_images.cjs              # all W16-W35
 *   node tools/generate_story_images.cjs --week 18    # single week
 *   node tools/generate_story_images.cjs --force      # re-generate even if exists
 *
 * Requires GEMINI_API_KEY in API keys.txt (same as generate_images_nano_banana.js).
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const MODEL = 'gemini-2.5-flash-image';
const GEMINI_API_KEY = loadApiKey();
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

function loadApiKey() {
  // Try API keys.txt first (legacy)
  const apiKeyFile = path.join(__dirname, '..', 'API keys.txt');
  if (fs.existsSync(apiKeyFile)) {
    const content = fs.readFileSync(apiKeyFile, 'utf-8');
    // Skip lines that are just labels (no real value after)
    const m = content.match(/GEMINI_API_KEY[:\s=]+([A-Za-z0-9_-]{20,})/);
    if (m) return m[1];
  }
  // Fallback: read from .env
  const envFile = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envFile)) {
    const content = fs.readFileSync(envFile, 'utf-8');
    const m = content.match(/VITE_GEMINI_API_KEY=([A-Za-z0-9_-]{20,})/);
    if (m) return m[1];
  }
  console.error('GEMINI_API_KEY not found. Add to API keys.txt or .env as VITE_GEMINI_API_KEY');
  process.exit(1);
}

const args = process.argv.slice(2);
let onlyWeek = null;
let force = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--week' && args[i + 1]) { onlyWeek = parseInt(args[i + 1], 10); i++; }
  if (args[i] === '--force') force = true;
}

const WEEKS_DIR = path.join(__dirname, '..', 'src', 'data', 'weeks');
const PUBLIC_IMG_DIR = path.join(__dirname, '..', 'public', 'images');

function generateImage(prompt) {
  const payload = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseModalities: ['IMAGE', 'TEXT'],
      temperature: 1,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192
    }
  });
  return new Promise((resolve, reject) => {
    const req = https.request(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          // Find first part with inlineData
          const parts = json.candidates?.[0]?.content?.parts || [];
          const imagePart = parts.find(p => p.inlineData?.data);
          if (imagePart) resolve(Buffer.from(imagePart.inlineData.data, 'base64'));
          else reject(new Error('No image data. Response: ' + data.slice(0, 200)));
        } catch (e) { reject(new Error('Parse error: ' + e.message + ' — ' + data.slice(0, 200))); }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function extractImagePromptFromWriting(weekNum) {
  const filePath = path.join(WEEKS_DIR, `week_${weekNum}`, 'writing.js');
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  const m = content.match(/image_prompt:\s*(['"`])([^'"`]+)\1/);
  if (!m) return null;
  return m[2];
}

async function main() {
  console.log(`\n🎨 Story Picture Image Generator (Gemini Nano Banana)`);
  console.log(`   Range: W16-W35\n`);

  let success = 0, skipped = 0, failed = 0;

  for (let week = 16; week <= 35; week++) {
    if (onlyWeek && week !== onlyWeek) continue;

    const prompt = extractImagePromptFromWriting(week);
    if (!prompt) {
      console.log(`⏭️  W${week}: no story_prompts.picture_mode.image_prompt, skipping`);
      skipped++;
      continue;
    }

    const outDir = path.join(PUBLIC_IMG_DIR, `week${week}`);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, 'story_writing_pic.jpg');

    if (!force && fs.existsSync(outFile)) {
      console.log(`⏭️  W${week}: already exists, skipping`);
      skipped++;
      continue;
    }

    process.stdout.write(`🎨 W${week}: generating... `);
    try {
      const buf = await generateImage(prompt);
      fs.writeFileSync(outFile, buf);
      console.log(`✅ ${(buf.length / 1024).toFixed(1)} KB`);
      success++;
      // Rate limit 3s
      await new Promise(r => setTimeout(r, 3000));
    } catch (e) {
      console.log(`❌ ${e.message}`);
      failed++;
    }
  }

  console.log(`\n=== Done ===`);
  console.log(`✅ Generated: ${success}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`💰 Cost: $0.00 (Nano Banana free tier)\n`);

  if (failed > 0) {
    console.log(`Re-run with: node tools/generate_story_images.cjs --force`);
  }
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
