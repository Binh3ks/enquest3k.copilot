import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

// --- CẤU HÌNH ĐƯỜNG DẪN TUYỆT ĐỐI ---
const ROOT_DIR = process.cwd();
const PUBLIC_AUDIO_DIR = path.join(ROOT_DIR, 'public', 'audio'); // Đích đến: public/audio
const DATA_DIR_ADV = path.join(ROOT_DIR, 'src/data/weeks');
const DATA_DIR_EASY = path.join(ROOT_DIR, 'src/data/weeks_easy');

const args = process.argv.slice(2);
const startWeek = parseInt(args[0]) || 18;
const endWeek = parseInt(args[1]) || 18;

// --- HÀM LOAD DỮ LIỆU THÔNG MINH (HỖ TRỢ SPLIT FILES) ---
const loadWeekData = async (weekNum, isEasy) => {
    const paddedWeek = weekNum.toString().padStart(2, '0');
    const baseDir = isEasy ? DATA_DIR_EASY : DATA_DIR_ADV;
    const modeLabel = isEasy ? '[EASY]' : '[ADV] ';
    
    // 1. Thử load từ Folder (Cấu trúc mới 12 files)
    const folderIndex = path.join(baseDir, `week_${paddedWeek}`, 'index.js');
    if (fs.existsSync(folderIndex)) {
        try {
            const mod = await import(pathToFileURL(folderIndex).href);
            console.log(`   ${modeLabel} 📂 Load Folder: week_${paddedWeek}`);
            return mod.default || mod;
        } catch (e) { console.error(`   ❌ Error loading folder: ${e.message}`); }
    }

    // 2. Thử load từ File đơn (Cấu trúc cũ)
    const singleFile = path.join(baseDir, `week_${paddedWeek}.js`);
    if (fs.existsSync(singleFile)) {
        try {
            const mod = await import(pathToFileURL(singleFile).href);
            console.log(`   ${modeLabel} 📄 Load File: week_${paddedWeek}.js`);
            return mod.default || mod;
        } catch (e) {}
    }
    return null;
};

// --- GLOBAL VOICE DEFAULTS (FALLBACK) ---
const VOICE_CONFIG = {
    narration: 'en-US-Neural2-D',
    vocabulary: 'en-US-Neural2-F',
    dictation: 'en-US-Neural2-E',
    questions: 'en-US-Neural2-D',
    mindmap: 'en-US-Neural2-F'
};

// --- GET WEEK VOICES (MANDATORY) ---
const getWeekVoices = (weekData) => {
    if (!weekData?.voiceConfig) {
        throw new Error(
            `❌ MANDATORY voiceConfig missing in week ${weekData?.weekId || '?'}!\n` +
            `   Each week MUST have unique voiceConfig to ensure variety.\n` +
            `   Add voiceConfig to week_XX/index.js with:\n` +
            `   { narration, vocabulary, dictation, questions, mindmap }`
        );
    }
    console.log(`   🎤 Week ${weekData.weekId} voices:`, Object.keys(weekData.voiceConfig).join(', '));
    return { ...VOICE_CONFIG, ...weekData.voiceConfig };
};

// --- HÀM XỬ LÝ CHÍNH ---
const processWeek = async (weekNum, isEasy) => {
    const weekData = await loadWeekData(weekNum, isEasy);
    if (!weekData || !weekData.stations) return [];

    // Validate voiceConfig MANDATORY
    const voices = getWeekVoices(weekData);

    const folderName = isEasy ? `week${weekNum}_easy` : `week${weekNum}`;
    // Đường dẫn đích thực tế: public/audio/weekXX
    const targetDir = path.join(PUBLIC_AUDIO_DIR, folderName);

    // Tạo thư mục nếu chưa có
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const tasks = [];
    // Hàm thêm task chuẩn hóa
    const addTask = (text, fileName, voice) => {
        if (!text || typeof text !== 'string') return;
        const cleanText = text
            .replace(/\*\*/g, '')                          // Bỏ markdown bold
            .replace(/___+/g, '')                           // Bỏ blank placeholder (sẽ bị đọc thành "blank blank")
            .replace(/\/audio\/[^\s]+\.mp3/gi, '')         // Bỏ audio paths lọt vào text field
            .trim();
        if (cleanText.length > 0) {
            tasks.push({
                text: cleanText,
                filename: `${fileName}.mp3`,
                voice: voice,
                week: weekNum,
                mode: isEasy ? 'easy' : 'normal'
            });
        }
    };

    const s = weekData.stations;

    // 1. READ & EXPLORE
    if (s.read_explore?.content_en) addTask(s.read_explore.content_en, 'read_explore_main', voices.narration);

    // 2. EXPLORE (CLIL)
    if (s.explore?.content_en) addTask(s.explore.content_en, 'explore_main', voices.narration);

    // 3. NEW WORDS (Tách 3 file: Word, Def, Coll)
    const processVocab = (list, prefix) => {
        if (!Array.isArray(list)) return;
        list.forEach(w => {
            if (!w?.word) return;
            const safe = w.word.toLowerCase().replace(/[^a-z0-9]/g, '_');
            
            // a. Phát âm từ
            addTask(w.word, `${prefix}_${safe}`, voices.vocabulary);
            // b. Định nghĩa
            if (w.definition_en) addTask(w.definition_en, `${prefix}_def_${safe}`, voices.vocabulary);
            // c. Collocation
            if (w.collocation) addTask(w.collocation, `${prefix}_coll_${safe}`, voices.vocabulary);
            // d. Example (Nếu có sau này)
            if (w.example) addTask(w.example, `${prefix}_ex_${safe}`, voices.vocabulary);
        });
    };
    processVocab(s.new_words?.vocab, 'vocab');
    processVocab(s.word_power?.words, 'wordpower');

    // 4. DICTATION
    if (Array.isArray(s.dictation?.sentences)) {
        s.dictation.sentences.forEach(x => addTask(x.text, `dictation_${x.id}`, voices.dictation));
    }

    // 5. SHADOWING (Deep Scan: Từng câu + Toàn bài)
    let shadowScript = [];
    if (s.shadowing) {
        // Hỗ trợ cả dạng mảng [] và dạng object { script: [] }
        if (Array.isArray(s.shadowing)) shadowScript = s.shadowing;
        else if (Array.isArray(s.shadowing.script)) shadowScript = s.shadowing.script;
        else {
            // Quét sâu object để tìm mảng
            Object.values(s.shadowing).forEach(val => {
                if (Array.isArray(val)) shadowScript = val;
            });
        }
    }

    if (shadowScript.length > 0) {
        // a. Từng câu
        const fullTextParts = [];
        shadowScript.forEach(x => {
            if (x.text) {
                addTask(x.text, `shadowing_${x.id}`, voices.narration);
                fullTextParts.push(x.text);
            }
        });
        // b. Toàn bài (ghép lại để đảm bảo có file full)
        if (fullTextParts.length > 0) {
            addTask(fullTextParts.join(' '), 'shadowing_full', voices.narration);
        }
    }

    // 6. LOGIC LAB (Deep Scan)
    let logicPuzzles = [];
    if (s.logic_lab) {
        if (Array.isArray(s.logic_lab)) logicPuzzles = s.logic_lab;
        else if (Array.isArray(s.logic_lab.puzzles)) logicPuzzles = s.logic_lab.puzzles;
    }

    if (logicPuzzles.length > 0) {
        logicPuzzles.forEach(x => {
            if (x.question_en) addTask(x.question_en, `logic_${x.id}`, voices.questions);
        });
    }

    // 7. ASK AI PROMPTS (generate answer audio, not context)
    if (Array.isArray(s.ask_ai?.prompts)) {
        s.ask_ai.prompts.forEach(p => {
            // answer_audio_url field — use first answer text for TTS
            const answerText = Array.isArray(p.answer) ? p.answer[0] : p.answer;
            if (answerText) addTask(answerText, `ask_ai_answer_${p.id}`, voices.questions);
        });
    }

    // 8. MINDMAP SPEAKING (Branches + Stems)
    const mindmapData = s.mindmap_speaking || s.mindmap;
    if (mindmapData) {
        // a. Center Stems — each stem is {text, audio} object, extract .text
        if (Array.isArray(mindmapData.centerStems)) {
            mindmapData.centerStems.forEach((stem, idx) => {
                const stemText = typeof stem === 'object' ? stem.text : stem;
                addTask(stemText, `mindmap_stem_${idx + 1}`, voices.narration);
            });
        }
        // b. Branches — each branch is {text, audio} object, extract .text
        if (mindmapData.branchLabels) {
            let branchCount = 0;
            Object.keys(mindmapData.branchLabels).forEach(stem => {
                const branches = mindmapData.branchLabels[stem];
                if (Array.isArray(branches)) {
                    branches.forEach(branch => {
                        branchCount++;
                        const branchText = typeof branch === 'object' ? branch.text : branch;
                        addTask(branchText, `mindmap_branch_${branchCount}`, voices.mindmap);
                    });
                }
            });
        }
    }

    return tasks;
};

(async () => {
    let allTasks = [];
    console.log(`🎙️  SCANNING AUDIO TASKS (Weeks ${startWeek}-${endWeek})...`);
    
    for (let i = startWeek; i <= endWeek; i++) {
        allTasks = allTasks.concat(await processWeek(i, false));
        allTasks = allTasks.concat(await processWeek(i, true));
    }

    // Ghi file JSON tại thư mục tools — PHẢI khớp với TASKS_FILE trong generate_kokoro.py
    const jsonPath = path.join(ROOT_DIR, 'tools', 'tts_all_tasks.json');
    fs.writeFileSync(jsonPath, JSON.stringify({ tasks: allTasks }, null, 2));
    
    console.log(`✅ FOUND ${allTasks.length} TASKS → ${jsonPath}`);
    console.log(`📝 List saved to: ${jsonPath}`);
})();
