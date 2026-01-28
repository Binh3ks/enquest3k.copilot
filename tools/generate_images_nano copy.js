import fs from 'fs';
import path from 'path';
import https from 'https';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const WEEK_ID = String(process.argv[2]);
const BASE_DIR = path.join('public/images', `week${WEEK_ID}`);
const BASE_DIR_EASY = path.join('public/images', `week${WEEK_ID}_easy`);

// CLOUDFLARE CONFIG
const ACCOUNT_ID = "60599222f5f817a651fc103a6255d2cc";
const API_TOKEN = "KCbZVuTGDzcap04JjEFoeV4hKU8W37g-ZIouRZ3i";
const MODEL_ID = "@cf/bytedance/stable-diffusion-xl-lightning";

// STYLE & NEGATIVE PROMPT (Chiến lược mới)
const BASE_STYLE = ", 3d disney pixar style, cute, educational illustration, vibrant colors, soft lighting, clean white background, 8k resolution";
const NEGATIVE_PROMPT = "text, watermark, letters, signature, ugly, deformed, blurry, bad anatomy, extra limbs, cropped, low quality";

if (!ACCOUNT_ID || !API_TOKEN) { 
    console.error("❌ ERROR: Missing Cloudflare credentials"); 
    process.exit(1);
}

// HÀM XÂY DỰNG PROMPT VỚI WEIGHTED KEYWORDS (THEO CLOUDFLARE GUIDE)
// buildPrompt: Chuẩn hóa theo Art Bible ESL App
function buildPrompt(task) {
    // Standard negative prompt
    const NEGATIVE = '3d, render, realistic, photograph, clay, plastic, blurry, ugly, deformed, text, watermark, signature, messy, dark shadows, scary, complex background, extra limbs, bad anatomy, grainy, low resolution';
    // Style suffix
    const STYLE = ', flat vector illustration, 2d, minimalist, bright pastel colors, clean lines, isolated on white background';
    return `${task.prompt}${STYLE} ### ${NEGATIVE}`;
}

console.log(`🎨 CLOUDFLARE SDXL IMAGE GENERATOR FOR WEEK ${WEEK_ID}`);
console.log(`   Model: ${MODEL_ID}`);

// Cleanup & Init
if (!fs.existsSync(BASE_DIR)) fs.mkdirSync(BASE_DIR, { recursive: true });
if (!fs.existsSync(BASE_DIR_EASY)) fs.mkdirSync(BASE_DIR_EASY, { recursive: true });

async function generateImage(prompt, filename, isEasy = false) {
    const targetDir = isEasy ? BASE_DIR_EASY : BASE_DIR;
    const outFile = path.join(targetDir, filename);
    
    // Skip nếu file đã có và dung lượng > 0
    if (fs.existsSync(outFile) && fs.statSync(outFile).size > 0) {
        console.log(`  ⏭️  ${filename}: Already exists, skipping...`);
        return;
    }

    process.stdout.write(`  🎨 ${filename}: `);

    const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODEL_ID}`;

    return new Promise((resolve, reject) => {
        const req = https.request(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        }, (res) => {
            if (res.statusCode !== 200) {
                let errorBody = '';
                res.on('data', (chunk) => errorBody += chunk);
                res.on('end', () => {
                    console.log(`❌ API Error (${res.statusCode}): ${errorBody}`);
                    resolve();
                });
                return;
            }

            const chunks = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(chunks);
                
                if (buffer.length === 0) {
                    console.log("❌ Empty response");
                    resolve();
                    return;
                }

                fs.writeFileSync(outFile, buffer);
                console.log("✅ OK");
                resolve();
            });
        });

        req.on('error', (e) => {
            console.log(`❌ Network Error: ${e.message}`);
            resolve();
        });

        req.write(JSON.stringify({ 
            prompt: prompt,
            num_steps: 6,     // Tăng lên 6 cho chi tiết hơn
            guidance: 8.0     // Tăng guidance để bám sát prompt
        }));
        req.end();
    });
}

async function scanAndGen(weekId) {
    // Dùng Map để lưu file và mode, đảm bảo không trùng và không bỏ sót
    const imageTasks = new Map();
    
    const weekIdPadded = String(weekId).padStart(2, '0');
    
    // SCAN IMAGE_URL từ data files (vocab.js, word_power.js, word_match.js)
    const dirs = [
        { path: path.join('src/data/weeks', `week_${weekIdPadded}`), isEasy: false },
        { path: path.join('src/data/weeks_easy', `week_${weekIdPadded}`), isEasy: true }
    ];
    
    for (const { path: dir, isEasy } of dirs) {
        if (!fs.existsSync(dir)) continue;
        const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
        for (const file of files) {
            const content = fs.readFileSync(path.join(dir, file), 'utf-8');
            // Regex bắt image_url: "/images/weekX/filename.jpg"
            const imageRegex = /image_url\s*:\s*["']\/images\/week\d+(?:_easy)?\/([^"']+\.jpg)["']/gi;
            const imageMatches = [...content.matchAll(imageRegex)];
            imageMatches.forEach(match => {
                const filename = match[1];
                const key = `${isEasy ? 'easy' : 'adv'}:${filename}`;
                if (!imageTasks.has(key)) {
                    // Tìm context (word + definition + example) từ cùng object
                    const wordMatch = content.match(new RegExp(`word\\s*:\\s*["']([^"']+)["'][^}]*image_url\\s*:\\s*["'][^"']*${filename.replace('.', '\\.')}`, 'i'));
                    const defMatch = content.match(new RegExp(`definition_en\\s*:\\s*["']([^"']+)["'][^}]*image_url\\s*:\\s*["'][^"']*${filename.replace('.', '\\.')}`, 'i'));
                    const exampleMatch = content.match(new RegExp(`example\\s*:\\s*["']([^"']+)["'][^}]*image_url\\s*:\\s*["'][^"']*${filename.replace('.', '\\.')}`, 'i'));
                    const word = wordMatch ? wordMatch[1] : '';
                    const definition = defMatch ? defMatch[1] : '';
                    // Prompt logic (giữ nguyên như trước)
                    let prompt = '';
                    if (filename.includes('wordpower_under_the_table')) {
                        prompt = 'Low angle view from the floor, close up of a toy sitting on the floor, wooden table legs surrounding the toy, dark shadow cast by the table top above.';
                    } else if (filename.includes('wordpower_in_the_box')) {
                        prompt = 'Isometric view, an open cardboard box, a toy sitting deep inside the box, visible cardboard flaps.';
                    } else if (filename.includes('wordpower_next_to_the_door')) {
                        prompt = 'A cute chair placed right beside a wooden door, both objects clearly visible.';
                    } else if (filename.includes('wordpower_under_the_bed')) {
                        prompt = 'Low angle view from the floor, a colorful ball resting on the floor, wooden bed frame above, shadows.';
                    } else if (filename.includes('wordpower_in_the_bag')) {
                        prompt = 'Isometric view, an open school bag, a toy sitting deep inside the bag, visible zipper and pockets.';
                    } else if (filename.includes('wordpower_on_the_desk')) {
                        prompt = 'Side view, a book resting on top of a wooden desk, book clearly touching the desk surface.';
                    } else if (word === 'box') {
                        prompt = 'Isometric view, an open cardboard box with visible flaps, a cute toy sitting deep inside the box.';
                    } else if (word === 'desk') {
                        prompt = 'A simple wooden desk with clean lines, a stack of books and a pencil cup on top.';
                    } else if (word === 'floor') {
                        prompt = 'Top-down view of a clean floor with colorful tiles, a ball and a toy car placed on the floor.';
                    } else if (word === 'wall') {
                        prompt = 'A simple room wall painted in pastel color, a framed picture and a window.';
                    } else if (word === 'window') {
                        prompt = 'A cute window with pastel curtains, sunlight streaming through.';
                    } else if (word === 'door') {
                        prompt = 'A wooden door slightly open, a cute character peeking out from the gap, only half face visible.';
                    } else if (word === 'hide') {
                        prompt = 'A large sofa, a child crouching behind the sofa, looking over the top with a playful expression.';
                    } else if (word === 'seek') {
                        prompt = 'A cute child holding a large magnifying glass, looking closely at footprints on the ground.';
                    } else if (word === 'treasure') {
                        prompt = 'A wooden chest with open lid, overflowing with shiny gold coins and colorful gems, sparkling.';
                    } else if (word === 'hunt') {
                        prompt = 'A child with a map and binoculars, searching for treasure, footprints and clues on the ground.';
                    } else if (word === 'ball') {
                        prompt = 'A colorful ball resting on a clean floor.';
                    } else if (word === 'toy') {
                        prompt = 'A cute toy robot with friendly face, simple shapes.';
                    } else {
                        prompt = `${definition}, flat vector illustration.`;
                    }
                    imageTasks.set(key, { prompt: buildPrompt({ prompt }), file: filename, isEasy });
                } else {
                    console.log(`⚠️ Duplicate image_url detected: ${filename} (${isEasy ? 'easy' : 'adv'})`);
                }
            });
        }
    }
    // Đảm bảo luôn có 15 hình cho mỗi mode (nếu thiếu sẽ báo lỗi rõ ràng)
    const coverFiles = [
        { file: `read_cover_w${String(weekId).padStart(2, '0')}.jpg`, prompt: isEasy => buildPrompt({ prompt: isEasy ? 'A group of children searching for a toy, one child holding a map, another with a magnifying glass, bright pastel colors.' : 'A group of children searching for treasure, one child holding a map, another with a magnifying glass, bright pastel colors.' }), isEasy: false },
        { file: `explore_cover_w${String(weekId).padStart(2, '0')}.jpg`, prompt: _ => buildPrompt({ prompt: 'Children using binoculars and magnifying glass, searching for clues, simple props, bright pastel colors.' }), isEasy: false },
        { file: `read_cover_w${String(weekId).padStart(2, '0')}.jpg`, prompt: isEasy => buildPrompt({ prompt: isEasy ? 'A group of children searching for a toy, one child holding a map, another with a magnifying glass, bright pastel colors.' : 'A group of children searching for treasure, one child holding a map, another with a magnifying glass, bright pastel colors.' }), isEasy: true },
        { file: `explore_cover_w${String(weekId).padStart(2, '0')}.jpg`, prompt: _ => buildPrompt({ prompt: 'Children using binoculars and magnifying glass, searching for clues, simple props, bright pastel colors.' }), isEasy: true }
    ];
    // Thêm cover cho cả easy/adv nếu chưa có
    for (const cover of coverFiles) {
        const key = `${cover.isEasy ? 'easy' : 'adv'}:${cover.file}`;
        if (!imageTasks.has(key)) {
            imageTasks.set(key, { prompt: cover.prompt(cover.isEasy), file: cover.file, isEasy: cover.isEasy });
        }
    }
    // Đưa vào tasks (theo mode)
    const easyTasks = Array.from(imageTasks.values()).filter(t => t.isEasy);
    const advTasks = Array.from(imageTasks.values()).filter(t => !t.isEasy);
    if (easyTasks.length !== 15) {
        console.log(`❌ Easy mode: Expected 15 images, found ${easyTasks.length}`);
        easyTasks.forEach(t => console.log(`  - ${t.file}`));
    }
    if (advTasks.length !== 15) {
        console.log(`❌ Advanced mode: Expected 15 images, found ${advTasks.length}`);
        advTasks.forEach(t => console.log(`  - ${t.file}`));
    }
    // Gộp lại đúng thứ tự (adv trước, easy sau)
    let tasks = [...advTasks, ...easyTasks];
    
    // (Đã đưa các cover/shared vào imageTasks ở trên, không cần push thêm vào tasks)

    console.log(`  🚀 Queue: ${tasks.length} images...`);
    
    // Chạy tuần tự (Sequential) để tránh lỗi API
    for (const task of tasks) {
        await generateImage(task.prompt, task.file, task.isEasy || false);
        // Cloudflare chịu tải tốt, chỉ cần delay 1s
        await new Promise(r => setTimeout(r, 1000));
    }
}

(async () => { await scanAndGen(WEEK_ID); })();
