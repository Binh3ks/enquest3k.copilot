import fs from 'fs';
import path from 'path';
import https from 'https';
import { Buffer } from 'buffer';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const API_MODEL = "imagen-3.0-generate-001"; // Nano Banana
const API_BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${API_MODEL}:predict?key=`;

// Load API key from API keys.txt
const loadApiKeys = () => {
    const keyFilePath = path.join(process.cwd(), 'API keys.txt');
    if (fs.existsSync(keyFilePath)) {
        try {
            const content = fs.readFileSync(keyFilePath, 'utf8');
            const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#'));
            const keys = { gemini: [] };
            lines.forEach(line => {
                if (line.includes('GEMINI_API_KEY')) {
                    const matches = line.match(/AIzaSy[a-zA-Z0-9_-]+/g) || [];
                    keys.gemini.push(...matches);
                } else {
                    const aiMatch = line.match(/AIzaSy[a-zA-Z0-9_-]+/);
                    if (aiMatch && !keys.gemini.includes(aiMatch[0])) keys.gemini.push(aiMatch[0]);
                }
            });
            return keys.gemini[0] || null;
        } catch (e) {
            console.warn('⚠️  Failed to read API keys.txt:', e.message);
        }
    }
    return null;
};

const API_KEY = loadApiKeys();

const callImagenAPI = async (prompt, aspectRatio) => {
    const payload = JSON.stringify({ 
        instances: [{ prompt }], 
        parameters: { sampleCount: 1, aspectRatio: aspectRatio || "16:9" } 
    });
    
    return new Promise((resolve, reject) => {
        const req = https.request(API_BASE_URL + API_KEY, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' } 
        }, (res) => {
            let data = ''; 
            res.on('data', c => data += c);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    console.log("   🔍 API Response:", JSON.stringify(json, null, 2));
                    if (json.predictions?.[0]?.bytesBase64Encoded) {
                        resolve(json.predictions[0].bytesBase64Encoded);
                    } else {
                        reject(new Error(`No image data. Response: ${JSON.stringify(json)}`));
                    }
                } catch (e) { 
                    reject(e); 
                }
            });
        });
        req.on('error', e => reject(e)); 
        req.write(payload); 
        req.end();
    });
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Main generation
(async () => {
    if (!API_KEY) {
        console.error("❌ No API key found in API keys.txt");
        process.exit(1);
    }

    console.log("✅ Loaded Gemini API key");
    console.log("🎨 Generating Week 2 Easy mode covers with Nano Banana...");

    const targetDir = path.join(IMAGES_DIR, 'week2_easy');
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const images = [
        {
            filename: "read_cover_w2.jpg",
            prompt: "A simple, welcoming modern home exterior view. Clean architectural lines, bright windows, a front door, small garden, blue sky. Warm, inviting atmosphere but not overly cute or childish. Professional illustration style suitable for elementary English learning materials."
        },
        {
            filename: "explore_cover_w2.jpg", 
            prompt: "A cozy home study space showing different areas for learning - a desk with books, a reading corner, kitchen counter with simple activities. Modern, clean design, bright natural lighting, organized and peaceful. Focus on learning environment rather than people. Professional educational illustration style."
        }
    ];

    for (const img of images) {
        const filePath = path.join(targetDir, img.filename);
        
        try {
            console.log(`   🎨 Generating: ${img.filename}...`);
            const b64 = await callImagenAPI(img.prompt, "16:9");
            fs.writeFileSync(filePath, Buffer.from(b64, 'base64'));
            console.log(`   ✅ Generated: ${img.filename}`);
            
            // Wait 2 seconds between requests
            if (img !== images[images.length - 1]) {
                await delay(2000);
            }
        } catch (e) {
            console.error(`   ❌ Error ${img.filename}: ${e.message}`);
        }
    }

    console.log("\n🎉 Cover generation complete!");
})();