/**
 * Nano Banana Image Generation Test
 * Test Gemini's free tier image generation (aka "Bananas" 🍌)
 * 
 * Model: gemini-3-pro-image-preview
 * Free tier: Available with rate limits
 * Goal: Generate 10 vocab images to test quality and rate limits
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load API key from file
const loadApiKey = () => {
  const apiKeyFile = path.join(__dirname, '..', 'API keys.txt');
  const content = fs.readFileSync(apiKeyFile, 'utf-8');
  const match = content.match(/GEMINI_API_KEY[:\s=]+([^\s\n]+)/);
  return match ? match[1] : null;
};

const GEMINI_API_KEY = loadApiKey();
const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent';

// Test vocabulary words from Week 1
const TEST_WORDS = [
  { word: 'student', prompt: 'A simple educational illustration of a student sitting at a desk, studying with books. Clean, bright, child-friendly style. Square aspect ratio.' },
  { word: 'teacher', prompt: 'A simple educational illustration of a teacher standing in front of a blackboard. Friendly, approachable, child-friendly style. Square aspect ratio.' },
  { word: 'book', prompt: 'A simple educational illustration of an open book with visible text. Clean, colorful, child-friendly style. Square aspect ratio.' },
  { word: 'desk', prompt: 'A simple educational illustration of a wooden school desk. Clean, simple design, child-friendly style. Square aspect ratio.' },
  { word: 'pen', prompt: 'A simple educational illustration of a pen, shown clearly with cap off. Bright colors, child-friendly style. Square aspect ratio.' },
  { word: 'paper', prompt: 'A simple educational illustration of blank white paper sheets. Clean, simple, child-friendly style. Square aspect ratio.' },
  { word: 'classroom', prompt: 'A simple educational illustration of a classroom with desks, chairs, and blackboard. Bright, welcoming, child-friendly style. Square aspect ratio.' },
  { word: 'school', prompt: 'A simple educational illustration of a school building exterior. Friendly, colorful, child-friendly style. Square aspect ratio.' },
  { word: 'friend', prompt: 'A simple educational illustration of two children being friends, smiling together. Warm, friendly, child-friendly style. Square aspect ratio.' },
  { word: 'name', prompt: 'A simple educational illustration of a name tag with "My Name Is..." written on it. Clear text, child-friendly style. Square aspect ratio.' }
];

/**
 * Generate image using Gemini API (Nano Banana)
 * @param {string} prompt - Image generation prompt
 * @returns {Promise<Buffer|null>} Image buffer or null on failure
 */
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
            console.error('API Error:', JSON.stringify(jsonData, null, 2));
            resolve(null);
            return;
          }
          
          // Check if image was generated
          if (jsonData.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
            const imageData = jsonData.candidates[0].content.parts[0].inlineData;
            const buffer = Buffer.from(imageData.data, 'base64');
            resolve(buffer);
          } else {
            console.error('No image data in response:', JSON.stringify(jsonData, null, 2));
            resolve(null);
          }
        } catch (error) {
          console.error('Parse error:', error);
          resolve(null);
        }
      });
    });

    req.on('error', (error) => {
      console.error('Request error:', error);
      resolve(null);
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Test Nano Banana image generation
 */
async function testNanoBanana() {
  console.log('🍌 Testing Nano Banana (Gemini Free Tier Image Generation)\n');
  console.log('=' .repeat(60));
  
  if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in API keys.txt');
    return;
  }
  
  // Create output directory
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'test_nano_banana');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  let successCount = 0;
  let failCount = 0;
  const startTime = Date.now();
  
  // Test each word
  for (let i = 0; i < TEST_WORDS.length; i++) {
    const { word, prompt } = TEST_WORDS[i];
    
    console.log(`\n[${i + 1}/${TEST_WORDS.length}] Generating: ${word}`);
    console.log(`Prompt: ${prompt}`);
    
    const imageBuffer = await generateImage(prompt);
    
    if (imageBuffer) {
      const filename = `${word}.jpg`;
      const filepath = path.join(outputDir, filename);
      fs.writeFileSync(filepath, imageBuffer);
      
      const sizeKB = (imageBuffer.length / 1024).toFixed(1);
      console.log(`✅ Saved: ${filename} (${sizeKB} KB)`);
      successCount++;
    } else {
      console.log(`❌ Failed to generate: ${word}`);
      failCount++;
    }
    
    // Wait 2 seconds between requests to avoid rate limiting
    if (i < TEST_WORDS.length - 1) {
      console.log('⏳ Waiting 2s before next request...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESULTS:');
  console.log(`✅ Success: ${successCount}/${TEST_WORDS.length}`);
  console.log(`❌ Failed: ${failCount}/${TEST_WORDS.length}`);
  console.log(`⏱️  Duration: ${duration}s`);
  console.log(`📁 Output: ${outputDir}`);
  
  if (successCount > 0) {
    console.log('\n🎉 Nano Banana works! Free tier image generation successful.');
    console.log('💡 Next steps:');
    console.log('   1. Check image quality in public/images/test_nano_banana/');
    console.log('   2. Compare with current Imagen 3 images (Week 19)');
    console.log('   3. If quality is good, scale up to 20 images/day');
    console.log('   4. Monitor rate limits for free tier');
  } else {
    console.log('\n❌ Nano Banana test failed. Consider using Imagen 4 Fast instead.');
  }
}

// Run test
testNanoBanana().catch(console.error);
