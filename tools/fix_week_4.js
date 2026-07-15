import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_WEEK = 4;
const WEEK_STR = '04';
const DATA_FILE = path.join(__dirname, `../src/data/weeks/week_${WEEK_STR}.js`);
const PUBLIC_DIR = `public/audio/week${TARGET_WEEK}`;
const WEB_DIR = `/audio/week${TARGET_WEEK}`;

// Hàm làm sạch tên file an toàn tuyệt đối
const safeName = (str) => str.trim().toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 40);
const cleanText = (text) => text ? text.replace(/\*\*/g, '').replace(/"/g, "'").trim() : "";

const run = () => {
    if (!fs.existsSync(DATA_FILE)) {
        console.error("❌ FILE NOT FOUND: " + DATA_FILE);
        return;
    }

    console.log(`⚡ READING week_${WEEK_STR}.js...`);
    let content = fs.readFileSync(DATA_FILE, 'utf8');
    const tasks = [];

    // ============================================================
    // BƯỚC 1: VỆ SINH CÔNG NGHIỆP (CLEANING)
    // Xóa tất cả các dòng audio_ cũ để tránh lỗi duplicate/syntax
    // ============================================================
    console.log("🧹 Cleaning old audio keys...");
    content = content.replace(/^\s*audio_(word|def|coll|url):\s*["'][^"']*["'],?\s*$/gm, '');
    
    // Fix lỗi dấu phẩy dư thừa (nguyên nhân gây sập app)
    content = content.replace(/,(\s*})/g, '$1'); // Xóa , trước }
    content = content.replace(/,(\s*])/g, '$1'); // Xóa , trước ]
    content = content.replace(/,\s*,/g, ',');     // Xóa ,, thành ,

    // ============================================================
    // BƯỚC 2: CHÈN LINK MỚI (INJECTION)
    // Chiến thuật: Tìm 'word: "abc"' -> Thay bằng 'word: "abc", audio_...: "..."'
    // ============================================================
    console.log("💉 Injecting new audio links...");

    const register = (text, filename) => {
        if (!text) return null;
        tasks.push({ text: cleanText(text), path: `${PUBLIC_DIR}/${filename}` });
        return `${WEB_DIR}/${filename}`;
    };

    // --- A. XỬ LÝ NEW WORDS (VOCAB) ---
    // Tìm block vocab để xử lý riêng
    content = content.replace(/(vocab:\s*\[)([\s\S]*?)(\])/g, (match, start, body, end) => {
        return start + body.replace(/({[\s\S]*?word:\s*["']([^"']+)["'][\s\S]*?})/g, (itemBlock) => {
            const wordMatch = itemBlock.match(/word:\s*["']([^"']+)["']/);
            if (!wordMatch) return itemBlock;
            const word = wordMatch[1];
            const sName = safeName(word);

            // Tìm Definition & Context
            const defMatch = itemBlock.match(/definition_en:\s*["']([^"']+)["']/);
            const colMatch = itemBlock.match(/collocation:\s*["']([^"']+)["']/);
            const exMatch = itemBlock.match(/example:\s*["']([^"']+)["']/);

            const uWord = register(word, `vocab_word_${sName}.mp3`);
            const uDef = defMatch ? register(defMatch[1], `vocab_def_${sName}.mp3`) : null;
            
            // Ưu tiên Collocation, fallback Example
            let uColl = null;
            if (colMatch) uColl = register(colMatch[1], `vocab_coll_${sName}.mp3`);
            else if (exMatch) uColl = register(exMatch[1], `vocab_ex_${sName}.mp3`);

            // Chèn link vào sau word (An toàn nhất)
            let newBlock = itemBlock.replace(
                /(word:\s*["'][^"']+["'])/,
                `$1,\n      audio_word: "${uWord}"` +
                (uDef ? `,\n      audio_def: "${uDef}"` : "") +
                (uColl ? `,\n      audio_coll: "${uColl}"` : "")
            );
            return newBlock;
        }) + end;
    });

    // --- B. XỬ LÝ WORD POWER (WORDS) ---
    // Tìm block words
    content = content.replace(/(words:\s*\[)([\s\S]*?)(\])/g, (match, start, body, end) => {
        return start + body.replace(/({[\s\S]*?word:\s*["']([^"']+)["'][\s\S]*?})/g, (itemBlock) => {
            const wordMatch = itemBlock.match(/word:\s*["']([^"']+)["']/);
            if (!wordMatch) return itemBlock;
            const word = wordMatch[1];
            const sName = safeName(word);

            const defMatch = itemBlock.match(/definition_en:\s*["']([^"']+)["']/);
            const ctxMatch = itemBlock.match(/(collocation|model_sentence):\s*["']([^"']+)["']/);

            const uWord = register(word, `wp_word_${sName}.mp3`);
            const uDef = defMatch ? register(defMatch[1], `wp_def_${sName}.mp3`) : null;
            const uCtx = ctxMatch ? register(ctxMatch[2], `wp_ctx_${sName}.mp3`) : null;

            let newBlock = itemBlock.replace(
                /(word:\s*["'][^"']+["'])/,
                `$1,\n      audio_word: "${uWord}"` +
                (uDef ? `,\n      audio_def: "${uDef}"` : "") +
                (uCtx ? `,\n      audio_coll: "${uCtx}"` : "") // App dùng key audio_coll cho cả WP
            );
            return newBlock;
        }) + end;
    });

    // --- C. CÁC PHẦN KHÁC (Read, Dictation, Shadowing...) ---
    // Read & Explore Main Text
    content = content.replace(/(read_explore:[\s\S]*?content_en:\s*["'])([\s\S]*?)(["'])/, (m, p, txt, s) => {
        const url = register(txt, 'read_explore_main.mp3');
        return `${p}${txt}${s},\n      audio_url: "${url}"`;
    });

    // Shadowing Script
    content = content.replace(/(shadowing:[\s\S]*?script:\s*\[)([\s\S]*?)(\])/g, (m, s, body, e) => {
        const newBody = body.replace(/({[\s\S]*?text:\s*["']([^"']+)["'][\s\S]*?})/g, (ib, txt) => {
            const idMatch = ib.match(/id:\s*(\d+)/);
            const id = idMatch ? idMatch[1] : 'x';
            const url = register(txt, `shadow_${id}.mp3`);
            return ib.replace(/}/, `, audio_url: "${url}" }`); // Chèn vào cuối
        });
        
        // Full slow logic
        const allText = [];
        const regex = /text:\s*["']([^"']+)["']/g;
        let match;
        while ((match = regex.exec(body)) !== null) allText.push(cleanText(match[1]));
        if(allText.length) register(allText.join(" "), 'shadow_full_slow.mp3'); // Chỉ tạo file

        return s + newBody + e;
    });

    // Dictation
    content = content.replace(/(dictation:[\s\S]*?sentences:\s*\[)([\s\S]*?)(\])/g, (m, s, body, e) => {
        const newBody = body.replace(/({[\s\S]*?text:\s*["']([^"']+)["'][\s\S]*?})/g, (ib, txt) => {
            const idMatch = ib.match(/id:\s*(\d+)/);
            const id = idMatch ? idMatch[1] : 'x';
            const url = register(txt, `dictation_${id}.mp3`);
            return ib.replace(/}/, `, audio_url: "${url}" }`);
        });
        return s + newBody + e;
    });

    // ============================================================
    // BƯỚC 3: LƯU FILE
    // ============================================================
    fs.writeFileSync(DATA_FILE, content, 'utf8');
    fs.writeFileSync('audio_tasks.json', JSON.stringify(tasks, null, 2));
    console.log(`✅ FINISHED. Week 4 code updated. Generated ${tasks.length} tasks.`);
};

run();
