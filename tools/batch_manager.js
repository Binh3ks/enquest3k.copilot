import fs from 'fs';
import path from 'path';
import { Buffer } from 'buffer';
import { fileURLToPath, pathToFileURL } from 'url';
import https from 'https';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DATA_DIR_ADV = path.join(process.cwd(), 'src/data/weeks');
const DATA_DIR_EASY = path.join(process.cwd(), 'src/data/weeks_easy');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

// Cost optimization: Imagen 3 ($0.02/img) vs Imagen 4 ($0.04/img) = 50% savings
// Quality: Imagen 3 (2024 model) sufficient for educational illustrations
const API_MODEL = "imagen-3.0-generate-001"; // Changed from imagen-4.0 to save cost
const API_BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${API_MODEL}:predict?key=`;

// --- API KEY AUTO-LOADING FROM API keys.txt ---
const loadApiKeys = () => {
    const keyFilePath = path.join(process.cwd(), 'API keys.txt');
    if (fs.existsSync(keyFilePath)) {
        try {
            const content = fs.readFileSync(keyFilePath, 'utf8');
            const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#'));
            const keys = { gemini: [], google_tts: [], youtube: [], openai: [] };
            lines.forEach(line => {
                if (line.includes('GEMINI_API_KEY')) {
                    const matches = line.match(/AIzaSy[a-zA-Z0-9_-]+/g) || [];
                    keys.gemini.push(...matches);
                } else if (line.includes('Google Cloude Text to speech')) {
                    const match = line.match(/AIzaSy[a-zA-Z0-9_-]+/);
                    if (match) keys.google_tts.push(match[0]);
                } else if (line.includes('Youtube Data API')) {
                    const matches = line.match(/AIzaSy[a-zA-Z0-9_-]+/g) || [];
                    keys.youtube.push(...matches);
                } else if (line.includes('OpenAI TTS')) {
                    const match = line.match(/sk-proj-[a-zA-Z0-9_-]+/);
                    if (match) keys.openai.push(match[0]);
                } else {
                    const aiMatch = line.match(/AIzaSy[a-zA-Z0-9_-]+/);
                    if (aiMatch && !keys.gemini.includes(aiMatch[0])) keys.gemini.push(aiMatch[0]);
                }
            });
            return keys;
        } catch (e) {
            console.warn('⚠️  Failed to read API keys.txt:', e.message);
        }
    }
    return null;
};

const args = process.argv.slice(2);
const startWeek = parseInt(args[0]);
const endWeek = parseInt(args[1]);
let API_KEY = args[2] || process.env.GEMINI_API_KEY;

const apiKeys = loadApiKeys();
if (!API_KEY && apiKeys && apiKeys.gemini.length > 0) {
    API_KEY = apiKeys.gemini[0];
    console.log(`✅ Loaded Gemini API key from API keys.txt`);
}

if (!startWeek || !endWeek || !API_KEY) {
    console.error("❌ Usage: node tools/batch_manager.js <start> <end> <api_key>");
    process.exit(1);
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * IMAGE REUSE OPTIMIZATION:
 * For Easy mode, vocabulary/wordpower images can be copied from Advanced mode
 * since the words are the same, only definitions differ.
 * This saves 50% of vocab image generation costs.
 */
const copyImageIfExists = (sourcePath, destPath) => {
    if (fs.existsSync(sourcePath) && !fs.existsSync(destPath)) {
        try {
            fs.copyFileSync(sourcePath, destPath);
            return true;
        } catch (e) {
            console.warn(`   ⚠️  Failed to copy ${path.basename(sourcePath)}: ${e.message}`);
        }
    }
    return false;
};

/**
 * NAMING CONVENTION FOR IMAGE FILES:
 * ===================================
 * Story covers: {read_cover|explore_cover}_w{NN}.jpg (e.g., read_cover_w20.jpg)
 * Vocabulary: {word}.jpg (e.g., archaeologist.jpg, ancient.jpg)
 * Word Power: wordpower_{word}.jpg (e.g., wordpower_artifact.jpg)
 * 
 * Word names with spaces/special chars: replace with underscore
 * Always lowercase
 */

// Helper load data bất chấp cấu trúc file hay folder
const loadWeekData = async (weekNum, isEasy) => {
    const paddedWeek = weekNum.toString().padStart(2, '0');
    const baseDir = isEasy ? DATA_DIR_EASY : DATA_DIR_ADV;
    
    const folderIndex = path.join(baseDir, `week_${paddedWeek}`, 'index.js');
    if (fs.existsSync(folderIndex)) {
        try { return (await import(pathToFileURL(folderIndex).href)).default; } catch (e) { console.error(`   ⚠️  Load folder error: ${e.message}`); }
    }
    const singleFile = path.join(baseDir, `week_${paddedWeek}.js`);
    if (fs.existsSync(singleFile)) {
        try { return (await import(pathToFileURL(singleFile).href)).default; } catch (e) {}
    }
    return null;
};

const callImagenAPI = async (prompt, aspectRatio) => {
    const payload = JSON.stringify({ instances: [{ prompt }], parameters: { sampleCount: 1, aspectRatio: aspectRatio || "1:1" } });
    return new Promise((resolve, reject) => {
        const req = https.request(API_BASE_URL + API_KEY, { method: 'POST', headers: { 'Content-Type': 'application/json' } }, (res) => {
            let data = ''; res.on('data', c => data += c);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.predictions?.[0]?.bytesBase64Encoded) resolve(json.predictions[0].bytesBase64Encoded);
                    else reject(new Error('No image data'));
                } catch (e) { reject(e); }
            });
        });
        req.on('error', e => reject(e)); req.write(payload); req.end();
    });
};

const processWeek = async (weekNum, isEasy) => {
    console.log(`\n🚀 Processing Images: Week ${weekNum} (${isEasy ? 'Easy' : 'Adv'})...`);
    const weekData = await loadWeekData(weekNum, isEasy);
    if (!weekData) { console.log("   ❌ Data not found"); return; }

    const outputFolder = isEasy ? `week${weekNum}_easy` : `week${weekNum}`;
    const targetDir = path.join(IMAGES_DIR, outputFolder);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    // 💡 OPTIMIZATION: For Easy mode, try copying vocab images from Advanced first
    let copiedCount = 0;
    if (isEasy) {
        const advFolder = `week${weekNum}`;
        const advDir = path.join(IMAGES_DIR, advFolder);
        if (fs.existsSync(advDir)) {
            const advImages = fs.readdirSync(advDir).filter(f => f.endsWith('.jpg') && !f.includes('cover'));
            advImages.forEach(img => {
                const sourcePath = path.join(advDir, img);
                const destPath = path.join(targetDir, img);
                if (copyImageIfExists(sourcePath, destPath)) {
                    copiedCount++;
                }
            });
            if (copiedCount > 0) {
                console.log(`   ✅ Copied ${copiedCount} vocab images from Advanced mode (saved $${(copiedCount * 0.02).toFixed(2)})`);
            }
        }
    }

    let items = [];
    
// 1. Covers - Format: {type}_w{NN}.jpg (16:9 ratio for banner style)
    const paddedWeek = weekNum.toString().padStart(2, '0');
    if (weekData.stations?.read_explore?.image_url) items.push({
        name: `read_cover_w${paddedWeek}`,
        prompt: `Wide landscape educational illustration for story: "${weekData.stations.read_explore.title}". Context: ${weekData.stations.read_explore.content_en.substring(0,100)}. Render as a full-width 16:9 banner, show all content, do not crop any part, all important details must be visible within the frame.`,
        filepath: `/images/week${weekNum}/read_cover_w${paddedWeek}.jpg`,
        url: weekData.stations.read_explore.image_url,
        ratio: "16:9"
    });
    if (weekData.stations?.explore?.image_url) items.push({
        name: `explore_cover_w${paddedWeek}`,
        prompt: `Wide landscape educational illustration for topic: "${weekData.stations.explore.title_en}". Context: ${weekData.stations.explore.content_en.substring(0,100)}. Render as a full-width 16:9 banner, show all content, do not crop any part, all important details must be visible within the frame.`,
        filepath: `/images/week${weekNum}/explore_cover_w${paddedWeek}.jpg`,
        url: weekData.stations.explore.image_url,
        ratio: "16:9"
    });
    
    // 2. Vocabulary - Format: {word}.jpg
    if (weekData.stations?.new_words?.vocab) {
        weekData.stations.new_words.vocab.forEach(w => {
            const filename = w.word.replace(/\s+/g, '_').toLowerCase();
            const filepath = `/images/week${weekNum}/${filename}.jpg`;
            const localPath = path.join(targetDir, `${filename}.jpg`);
            // Skip if already exists (copied from Advanced or previously generated)
            if (!fs.existsSync(localPath)) {
                items.push({name: `vocab_${w.word}`, prompt: `Simple icon/illustration of "${w.word}". Definition: ${w.definition_en}`, filepath: filepath, url: filepath, ratio: "1:1"});
            }
        });
    }

    // 3. Word Power - Format: wordpower_{word}.jpg
    if (weekData.stations?.word_power?.words) {
        weekData.stations.word_power.words.forEach(w => {
            const filename = w.word.replace(/\s+/g, '_').toLowerCase();
            const filepath = `/images/week${weekNum}/wordpower_${filename}.jpg`;
            const localPath = path.join(targetDir, `wordpower_${filename}.jpg`);
            // Skip if already exists (copied from Advanced or previously generated)
            if (!fs.existsSync(localPath)) {
                items.push({name: `wordpower_${w.word}`, prompt: `Advanced educational illustration of "${w.word}". Definition: ${w.definition_en}`, filepath: filepath, url: filepath, ratio: "1:1"});
            }
        });
    }

    console.log(`   Found ${items.length} images to generate.`);
    for (const item of items) {
        const fileName = path.basename(item.filepath || item.url);
        const filePath = path.join(targetDir, fileName);
        if (!fs.existsSync(filePath)) {
            try {
                const b64 = await callImagenAPI(item.prompt, item.ratio);
                fs.writeFileSync(filePath, Buffer.from(b64, 'base64'));
                console.log(`   ✅ Generated: ${fileName}`);
                await delay(1500);
            } catch (e) { console.error(`   ❌ Error ${fileName}: ${e.message}`); }
        }
    }
};

(async () => {
    for (let i = startWeek; i <= endWeek; i++) { await processWeek(i, false); await processWeek(i, true); }
})();
