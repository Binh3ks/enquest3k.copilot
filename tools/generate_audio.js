import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const WEEK_ID = String(process.argv[2]).padStart(2, '0');
const OUT_DIR = path.join('public/audio', `week_${WEEK_ID}`);
const API_KEY = process.env.GOOGLE_TTS_API_KEY || process.env.VITE_GOOGLE_TTS_API_KEY;

if (!API_KEY) { console.error("❌ Missing GOOGLE_TTS_API_KEY"); process.exit(1); }

console.log(`🔊 AUDIO GENERATOR FOR WEEK ${WEEK_ID}`);

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function tts(text, filename) {
    const outFile = path.join(OUT_DIR, filename);
    if (fs.existsSync(outFile) && fs.statSync(outFile).size > 0) return; // Skip if exists

    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;
    const payload = {
        input: { text },
        voice: { languageCode: "en-US", name: "en-US-Neural2-D" },
        audioConfig: { audioEncoding: "MP3" }
    };
    try {
        const res = await fetch(url, { method: 'POST', body: JSON.stringify(payload) });
        const data = await res.json();
        if (data.audioContent) {
            fs.writeFileSync(outFile, Buffer.from(data.audioContent, 'base64'));
            process.stdout.write("🎵");
        } else {
            process.stdout.write("x");
        }
    } catch(e) {}
}

async function processWeek() {
    const advDir = path.join('src/data/weeks', `week_${WEEK_ID}`);
    
    // 1. VOCAB (Từ đơn) -> {word}.mp3
    if (fs.existsSync(path.join(advDir, 'vocab.js'))) {
        const content = fs.readFileSync(path.join(advDir, 'vocab.js'), 'utf-8');
        const matches = [...content.matchAll(/word\s*:\s*(["'`])((?:(?!\1).)+)\1/gi)];
        console.log(`  🗣️  Vocab: Found ${matches.length} words`);
        for (const m of matches) {
            const word = m[2].trim();
            const filename = `${word.toLowerCase().replace(/[^a-z0-9]/g, '_')}.mp3`;
            await tts(word, filename);
        }
    }

    // 2. STORY (Read.js) -> story_read.mp3
    if (fs.existsSync(path.join(advDir, 'read.js'))) {
        const content = fs.readFileSync(path.join(advDir, 'read.js'), 'utf-8');
        // Regex tìm content_en (hỗ trợ nhiều dòng với [\s\S]*?)
        const match = content.match(/content_en\s*:\s*(["'`])([\s\S]*?)\1/);
        if (match) {
            console.log(`\n  📖 Generating Story Audio...`);
            const cleanText = match[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
            await tts(cleanText, `story_read.mp3`);
        } else {
            console.log(`\n  ⚠️  Could not find 'content_en' in read.js`);
        }
    }

    // 3. SENTENCES (Dictation.js) -> sent_{i}.mp3
    if (fs.existsSync(path.join(advDir, 'dictation.js'))) {
        const content = fs.readFileSync(path.join(advDir, 'dictation.js'), 'utf-8');
        // Tìm mảng sentences hoặc các object có text/sentence
        const matches = [...content.matchAll(/(?:text|sentence)\s*:\s*(["'`])((?:(?!\1).)+)\1/gi)];
        console.log(`\n  ✍️  Dictation: Found ${matches.length} sentences`);
        for (let i = 0; i < matches.length; i++) {
            await tts(matches[i][2], `sent_${i + 1}.mp3`);
        }
    }
}

(async () => {
    await processWeek();
    console.log(`\n✅ Done. Check ${OUT_DIR}`);
})();
