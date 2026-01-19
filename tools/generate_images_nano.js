import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const WEEK_ID = String(process.argv[2]).padStart(2, '0');
const BASE_DIR = path.join('public/images', `week_${WEEK_ID}`);
const API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

// MODEL CHUẨN: gemini-3-pro-image-preview
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${API_KEY}`;

if (!API_KEY) { console.error("❌ ERROR: Missing GEMINI_API_KEY"); process.exit(1); }

console.log(`🍌 NANO BANANA GENERATOR FOR WEEK ${WEEK_ID}`);

// Cleanup & Init
if (!fs.existsSync(BASE_DIR)) fs.mkdirSync(BASE_DIR, { recursive: true });

async function generateImage(prompt, filename) {
    const outFile = path.join(BASE_DIR, filename);
    // Skip nếu file đã có và dung lượng > 0
    if (fs.existsSync(outFile) && fs.statSync(outFile).size > 0) return;

    process.stdout.write(`  🎨 ${filename}: `);

    // PAYLOAD CHUẨN (Không dùng responseMimeType)
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1024 
        }
    };

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (data.error) {
            console.log(`❌ API Error: ${data.error.message}`);
            return;
        }

        const base64Data = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Data) {
            fs.writeFileSync(outFile, Buffer.from(base64Data, 'base64'));
            console.log("✅ OK");
        } else {
            console.log("❌ No Data (Prompt Safety?)");
        }
    } catch (e) {
        console.log(`❌ Network Error: ${e.message}`);
    }
}

async function scanAndGen(weekId) {
    const tasks = [];
    const uniqueFiles = new Set();
    
    // A. VOCAB (10 words) & WORD POWER (3 words)
    // Quét cả Advanced và Easy
    const dirs = [path.join('src/data/weeks', `week_${weekId}`), path.join('src/data/weeks_easy', `week_${weekId}`)];
    
    for (const dir of dirs) {
        if (!fs.existsSync(dir)) continue;
        
        // Đọc tất cả file .js trong thư mục
        const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
        for (const file of files) {
            const content = fs.readFileSync(path.join(dir, file), 'utf-8');
            
            // REGEX ĐA NĂNG: Bắt word: '...', "word": "...", word: `...`
            const regex = /(?:word|text)\s*:\s*(["'`])((?:(?!\1).)+)\1/gi;
            const matches = [...content.matchAll(regex)];
            
            matches.forEach(m => {
                const word = m[2].trim();
                // Lọc bỏ câu dài (chỉ lấy từ vựng < 25 ký tự)
                if (word.length < 25 && !word.includes(' ')) {
                    const filename = `${word.toLowerCase().replace(/[^a-z0-9]/g, '_')}.jpg`;
                    
                    if (!uniqueFiles.has(filename)) {
                        uniqueFiles.add(filename);
                        tasks.push({ 
                            prompt: `cartoon vector illustration of ${word}, simple, educational, white background`, 
                            file: filename 
                        });
                    }
                }
            });
        }
    }


    // B. COVERS (Bắt buộc, phân biệt easy/advanced, đúng format)
    let readTopic = "School";
    let readTopicEasy = "School";
    const readPath = path.join('src/data/weeks', `week_${weekId}`, 'read.js');
    const readPathEasy = path.join('src/data/weeks_easy', `week_${weekId}`, 'read.js');
    if (fs.existsSync(readPath)) {
        const content = fs.readFileSync(readPath, 'utf-8');
        const match = content.match(/title\s*:\s*(["'`])((?:(?!\1).)+)\1/i);
        if (match) readTopic = match[2];
    }
    if (fs.existsSync(readPathEasy)) {
        const content = fs.readFileSync(readPathEasy, 'utf-8');
        const match = content.match(/title\s*:\s*(["'`])((?:(?!\1).)+)\1/i);
        if (match) readTopicEasy = match[2];
    }

    // Advanced mode
    tasks.push({ prompt: `${readTopic} storybook cover illustration, kids education`, file: `read_cover_w${String(weekId).padStart(2, '0')}.jpg` });
    tasks.push({ prompt: `science poster about ${readTopic}`, file: `explore_cover_w${String(weekId).padStart(2, '0')}.jpg` });
    // Easy mode
    tasks.push({ prompt: `${readTopicEasy} storybook cover illustration, kids education, simple`, file: `read_cover_w${String(weekId).padStart(2, '0')}_easy.jpg` });
    tasks.push({ prompt: `science poster about ${readTopicEasy}, simple`, file: `explore_cover_w${String(weekId).padStart(2, '0')}_easy.jpg` });

    // Các ảnh khác giữ nguyên
    tasks.push({ prompt: "puzzle pieces matching game", file: "wp_match.jpg" });
    tasks.push({ prompt: "star trophy reward", file: "wp_reward.jpg" });

    console.log(`  🚀 Queue: ${tasks.length} images...`);
    
    // Chạy tuần tự (Sequential) để tránh lỗi API 429
    for (const task of tasks) {
        await generateImage(task.prompt, task.file);
        // Delay 2s giữa các request
        await new Promise(r => setTimeout(r, 2000));
    }
}

(async () => { await scanAndGen(WEEK_ID); })();
