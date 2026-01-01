/**
 * Generate Week 1 Easy Mode Images using Nano Banana
 * Based on test_nano_banana.js but for production vocab
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load API key
const loadApiKey = () => {
  const apiKeyFile = path.join(__dirname, '..', 'API keys.txt');
  const content = fs.readFileSync(apiKeyFile, 'utf-8');
  const match = content.match(/GEMINI_API_KEY[:\s=]+([^\s\n]+)/);
  return match ? match[1] : null;
};

const GEMINI_API_KEY = loadApiKey();
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'week1_easy');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Easy Mode Vocabulary (NEW)
const VOCAB_WORDS = [
  { word: 'name', prompt: 'Simple educational illustration of a name tag with "My Name Is Alex" written clearly. Bright colors, child-friendly style for ESL kids age 6-12. Square aspect ratio.' },
  { word: 'friend', prompt: 'Simple educational illustration of two happy children being friends, smiling together. Warm, welcoming, child-friendly style for ESL kids age 6-12. Square aspect ratio.' },
  { word: 'desk', prompt: 'Simple educational illustration of a wooden school desk, side view, clean and bright. Child-friendly style for ESL kids age 6-12. Square aspect ratio.' },
  { word: 'chair', prompt: 'Simple educational illustration of a classroom chair, clean design, bright colors. Child-friendly style for ESL kids age 6-12. Square aspect ratio.' },
  { word: 'pen', prompt: 'Simple educational illustration of a blue pen, clearly visible, bright colors. Child-friendly style for ESL kids age 6-12. Square aspect ratio.' },
  { word: 'bag', prompt: 'Simple educational illustration of a red school bag/backpack, child-friendly style for ESL kids age 6-12. Square aspect ratio.' },
  { word: 'toy', prompt: 'Simple educational illustration of colorful toys (teddy bear, blocks), fun and bright. Child-friendly style for ESL kids age 6-12. Square aspect ratio.' },
  { word: 'picture', prompt: 'Simple educational illustration of a nice picture/photo hanging on wall, bright frame. Child-friendly style for ESL kids age 6-12. Square aspect ratio.' },
  { word: 'box', prompt: 'Simple educational illustration of a storage box/container, clean and simple. Child-friendly style for ESL kids age 6-12. Square aspect ratio.' },
  { word: 'door', prompt: 'Simple educational illustration of a big classroom door, bright colors. Child-friendly style for ESL kids age 6-12. Square aspect ratio.' }
];

// Word Power Phrases (NEW)
const WORDPOWER_PHRASES = [
  { word: 'wordpower_my_friend', prompt: 'Simple educational illustration showing two children together with text "My Friend". Child-friendly style for ESL kids age 6-12. Square aspect ratio.' },
  { word: 'wordpower_on_the_desk', prompt: 'Simple educational illustration of a pen ON a desk, showing spatial relationship clearly. Child-friendly style for ESL kids age 6-12. Square aspect ratio.' },
  { word: 'wordpower_red_pen', prompt: 'Simple educational illustration of a red pen, vibrant red color. Child-friendly style for ESL kids age 6-12. Square aspect ratio.' },
  { word: 'wordpower_open_the_door', prompt: 'Simple educational illustration of a child opening a door. Action clear and simple. Child-friendly style for ESL kids age 6-12. Square aspect ratio.' },
  { word: 'wordpower_in_the_box', prompt: 'Simple educational illustration of a toy IN a box, showing spatial relationship clearly. Child-friendly style for ESL kids age 6-12. Square aspect ratio.' }
];

async function generateImage(prompt) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      contents: [{
        parts: [{
          text: `Generate an image: ${prompt}`
        }]
      }],
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 1,
        maxOutputTokens: 4096
      }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${GEMINI_API_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          
          if (res.statusCode !== 200) {
            console.error('❌ API Error:', jsonData.error?.message || JSON.stringify(jsonData));
            resolve(null);
            return;
          }
          
          if (jsonData.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
            const imageData = jsonData.candidates[0].content.parts[0].inlineData;
            const buffer = Buffer.from(imageData.data, 'base64');
            resolve(buffer);
          } else {
            console.error('❌ No image data in response');
            resolve(null);
          }
        } catch (error) {
          console.error('❌ Parse error:', error.message);
          resolve(null);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request error:', error.message);
      resolve(null);
    });

    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('🍌 Nano Banana - Generate Week 1 Easy Mode Images');
  console.log('================================================\n');

  const allImages = [...VOCAB_WORDS, ...WORDPOWER_PHRASES];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < allImages.length; i++) {
    const { word, prompt } = allImages[i];
    const outputPath = path.join(OUTPUT_DIR, `${word}.jpg`);

    // Skip if exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  ${word}.jpg already exists, skipping...`);
      continue;
    }

    console.log(`\n[${i + 1}/${allImages.length}] Generating ${word}.jpg...`);
    
    const imageBuffer = await generateImage(prompt);
    
    if (imageBuffer) {
      fs.writeFileSync(outputPath, imageBuffer);
      console.log(`✅ Saved: ${word}.jpg (${(imageBuffer.length / 1024).toFixed(2)} KB)`);
      successCount++;
    } else {
      console.log(`❌ Failed: ${word}.jpg`);
      failCount++;
    }

    // Rate limit: Wait 3 seconds between requests
    if (i < allImages.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  console.log('\n================================================');
  console.log(`✅ Success: ${successCount}/${allImages.length}`);
  console.log(`❌ Failed: ${failCount}/${allImages.length}`);
  console.log(`📁 Output: ${OUTPUT_DIR}`);
}

main().catch(console.error);
