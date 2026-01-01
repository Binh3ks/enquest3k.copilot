import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import https from 'https';

// --- CONFIGURATION ---
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DATA_DIR_ADV = path.join(process.cwd(), 'src/data/weeks');
const DATA_DIR_EASY = path.join(process.cwd(), 'src/data/weeks_easy');
const TTS_API_URL = "https://texttospeech.googleapis.com/v1/text:synthesize";

// --- VOICE CONFIGURATION ---
// Google Cloud TTS Neural2 voices: https://cloud.google.com/text-to-speech/docs/voices
// Supported voices: en-US-Neural2-A to J, en-GB-Neural2-A to F, en-AU-Neural2-A to D
const VOICE_CONFIG = {
    // Main narration (passages, stories)
    narration: process.env.VOICE_NARRATION || process.env.VOICE_OVERRIDE || 'en-US-Neural2-D',  // Male, authoritative
    // Vocabulary (words, definitions)
    vocabulary: process.env.VOICE_VOCAB || process.env.VOICE_OVERRIDE || 'en-US-Neural2-F',     // Female, clear
    // Dictation (slower, clearer)
    dictation: process.env.VOICE_DICTATION || process.env.VOICE_OVERRIDE || 'en-US-Neural2-E',  // Neutral
    // Questions (logic, ask_ai)
    questions: process.env.VOICE_QUESTIONS || process.env.VOICE_OVERRIDE || 'en-US-Neural2-D',  // Male
    // Mindmap branches
    mindmap: process.env.VOICE_MINDMAP || process.env.VOICE_OVERRIDE || 'en-US-Neural2-F',      // Female
};
// Usage: VOICE_OVERRIDE=en-GB-Neural2-B node tools/generate_audio.js 19 20
// Or specific: VOICE_NARRATION=en-GB-Neural2-A VOICE_VOCAB=en-US-Neural2-F node tools/generate_audio.js 19 20

// --- API KEY AUTO-LOADING FROM API keys.txt ---
const loadApiKeys = () => {
    const keyFilePath = path.join(process.cwd(), 'API keys.txt');
    if (fs.existsSync(keyFilePath)) {
        try {
            const content = fs.readFileSync(keyFilePath, 'utf8');
            const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#'));
            const keys = { google_tts: [], gemini: [], youtube: [], openai: [] };
            lines.forEach(line => {
                if (line.includes('Google Cloude Text to speech')) {
                    const match = line.match(/AIzaSy[a-zA-Z0-9_-]+/);
                    if (match) keys.google_tts.push(match[0]);
                } else if (line.includes('GEMINI_API_KEY')) {
                    const matches = line.match(/AIzaSy[a-zA-Z0-9_-]+/g) || [];
                    keys.gemini.push(...matches);
                } else if (line.includes('Youtube Data API')) {
                    const matches = line.match(/AIzaSy[a-zA-Z0-9_-]+/g) || [];
                    keys.youtube.push(...matches);
                } else if (line.includes('OpenAI TTS')) {
                    const match = line.match(/sk-proj-[a-zA-Z0-9_-]+/);
                    if (match) keys.openai.push(match[0]);
                } else {
                    const aiMatch = line.match(/AIzaSy[a-zA-Z0-9_-]+/);
                    if (aiMatch) keys.google_tts.push(aiMatch[0]);
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
let API_KEY = args[2] || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

const apiKeys = loadApiKeys();
if (!API_KEY && apiKeys && apiKeys.google_tts.length > 0) {
    API_KEY = apiKeys.google_tts[0];
    console.log(`✅ Loaded Google TTS key from API keys.txt`);
}

if (!startWeek || !endWeek || !API_KEY) {
    console.error("❌ Usage: node tools/generate_audio.js <start> <end> <api_key>");
    process.exit(1);
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// --- HELPER: CALL GOOGLE TTS API ---
const callGoogleTTS = async (text, voiceName) => {
    if (!text || !text.trim()) return null;
    
    // Clean text (remove Markdown bold like **word**)
    const cleanText = text.replace(/\*\*/g, '').trim();

    // Extract languageCode from voiceName (e.g., "en-AU-Neural2-B" -> "en-AU")
    const getLanguageCodeFromVoice = (voice) => {
        if (!voice) return 'en-US';
        if (voice.startsWith('en-AU')) return 'en-AU';
        if (voice.startsWith('en-GB')) return 'en-GB';
        if (voice.startsWith('en-US')) return 'en-US';
        return 'en-US'; // default fallback
    };

    const languageCode = getLanguageCodeFromVoice(voiceName);

    const payload = JSON.stringify({
        input: { text: cleanText },
        voice: { languageCode, name: voiceName || "en-US-Neural2-D" },
        audioConfig: { audioEncoding: "MP3" }
    });

    return new Promise((resolve, reject) => {
        const req = https.request(`${TTS_API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        }, (res) => {
            let data = [];
            res.on('data', chunk => data.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(data);
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        const json = JSON.parse(buffer.toString());
                        if (json.audioContent) resolve(Buffer.from(json.audioContent, 'base64'));
                        else reject(new Error('No audio content in response'));
                    } catch (e) { reject(e); }
                } else {
                    reject(new Error(`API Error ${res.statusCode}: ${buffer.toString()}`));
                }
            });
        });
        req.on('error', e => reject(e));
        req.write(payload);
        req.end();
    });
};

// --- HELPER: GET WEEK-SPECIFIC VOICE CONFIG (MANDATORY) ---
const getWeekVoices = (weekData) => {
    // ⚠️ voiceConfig is MANDATORY - throw error if missing
    if (!weekData?.voiceConfig) {
        throw new Error(
            `❌ MANDATORY voiceConfig missing in week ${weekData?.weekId || '?'}!\n` +
            `   Each week MUST have unique voiceConfig to ensure variety.\n` +
            `   Add voiceConfig object to week_XX/index.js with fields:\n` +
            `   { narration, vocabulary, dictation, questions, mindmap }\n` +
            `   Available voices: en-US/GB/AU-Neural2-A to J`
        );
    }
    console.log(`   🎤 Using week-specific voice config:`, Object.keys(weekData.voiceConfig).join(', '));
    // Merge with defaults for any missing fields (backwards compatibility)
    return { ...VOICE_CONFIG, ...weekData.voiceConfig };
};

// --- HELPER: LOAD DATA (FIXED FOR ESM) ---
const loadWeekData = async (weekNum, isEasy) => {
    const paddedWeek = weekNum.toString().padStart(2, '0');
    const baseDir = isEasy ? DATA_DIR_EASY : DATA_DIR_ADV;
    
    // 1. Folder Structure (Priority)
    const folderPath = path.join(baseDir, `week_${paddedWeek}`, 'index.js');
    if (fs.existsSync(folderPath)) {
        try { return (await import(pathToFileURL(folderPath).href)).default; } catch (e) { console.error(`Error loading folder ${paddedWeek}:`, e.message); }
    }
    // 2. Single File Structure
    const filePath = path.join(baseDir, `week_${paddedWeek}.js`);
    if (fs.existsSync(filePath)) {
        try { return (await import(pathToFileURL(filePath).href)).default; } catch (e) {}
    }
    return null;
};

// --- MAIN PROCESS ---
const processWeek = async (weekNum, isEasy) => {
    console.log(`\n🎙️  Processing Week ${weekNum} (${isEasy ? 'Easy' : 'Adv'})...`);
    const weekData = await loadWeekData(weekNum, isEasy);
    
    if (!weekData) { console.log("   ❌ Data not found."); return; }

    // Get week-specific voice config (or use global defaults)
    const voices = getWeekVoices(weekData);

    const outputFolder = isEasy ? `week${weekNum}_easy` : `week${weekNum}`;
    const outputDir = path.join(PUBLIC_DIR, 'audio', outputFolder);
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    // --- TASK LIST COLLECTOR ---
    let tasks = [];
    const addTask = (text, fileName, voice) => {
        if (!text) return;
        const filePath = path.join(outputDir, `${fileName}.mp3`);
        // Only add if file doesn't exist
        if (!fs.existsSync(filePath)) {
            tasks.push({ text, filePath, fileName, voice });
        }
    };

    // 1. Read & Explore
    if (weekData.stations?.read_explore?.content_en) {
        addTask(weekData.stations.read_explore.content_en, 'read_explore_main', voices.narration);
    }

    // 2. Explore
    if (weekData.stations?.explore?.content_en) {
        addTask(weekData.stations.explore.content_en, 'explore_main', voices.narration);
    }

    // 3. Vocab (New Words) - word, definition, example, collocation
    const newWordsVocab = weekData.stations?.new_words?.vocab || [];
    newWordsVocab.forEach(w => {
        if (w.word) {
            const safeName = w.word.toLowerCase().trim().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
            addTask(w.word, `vocab_${safeName}`, voices.vocabulary);
            addTask(w.definition_en, `vocab_def_${safeName}`, voices.vocabulary);
            addTask(w.example, `vocab_ex_${safeName}`, voices.vocabulary);
            if (w.collocation) {
                addTask(w.collocation, `vocab_coll_${safeName}`, voices.vocabulary);
            }
        }
    });

    // 3b. Word Power - word, definition, example, model_sentence, collocation
    const wordPowerWords = weekData.stations?.word_power?.words || [];
    wordPowerWords.forEach(w => {
        if (w.word) {
            const safeName = w.word.toLowerCase().trim().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
            addTask(w.word, `wordpower_${safeName}`, voices.vocabulary);
            addTask(w.definition_en, `wordpower_def_${safeName}`, voices.vocabulary);
            addTask(w.example, `wordpower_ex_${safeName}`, voices.vocabulary);
            if (w.model_sentence) {
                addTask(w.model_sentence, `wordpower_model_${safeName}`, voices.narration);
            }
            if (w.collocation) {
                addTask(w.collocation, `wordpower_coll_${safeName}`, voices.vocabulary);
            }
        }
    });

    // 4. Dictation
    if (weekData.stations?.dictation?.sentences) {
        weekData.stations.dictation.sentences.forEach(s => {
            addTask(s.text, `dictation_${s.id}`, voices.dictation);
        });
    }

    // 5. Shadowing (individual + full)
    if (weekData.stations?.shadowing?.script) {
        console.log(`   Found ${weekData.stations.shadowing.script.length} Shadowing sentences.`);
        weekData.stations.shadowing.script.forEach(s => {
            addTask(s.text, `shadowing_${s.id}`, voices.narration);
        });
        // Generate full shadowing audio
        const fullText = weekData.stations.shadowing.script.map(s => s.text).join(' ');
        addTask(fullText, 'shadowing_full', voices.narration);
    } else {
        console.log("   ⚠️  No Shadowing script found (Check data structure!).");
    }

    // 6. Ask AI Prompts
    if (weekData.stations?.ask_ai?.prompts) {
        console.log(`   Found ${weekData.stations.ask_ai.prompts.length} Ask AI prompts.`);
        weekData.stations.ask_ai.prompts.forEach(p => {
            addTask(p.context_en, `ask_ai_${p.id}`, voices.questions);
        });
    }

    // 7. Logic Puzzles (CONTEXT + QUESTION)
    const logicData = weekData.stations?.logic_lab || weekData.stations?.logic;
    if (logicData?.puzzles) {
        console.log(`   Found ${logicData.puzzles.length} Logic puzzles.`);
        logicData.puzzles.forEach(p => {
            // Read CONTEXT first, then QUESTION (as per Blueprint requirement)
            const fullText = p.context_en ? `${p.context_en} ${p.question_en}` : p.question_en;
            addTask(fullText, `logic_${p.id}`, voices.questions);
        });
    }

    // 8. Mindmap Branches + Stems
    const mindmapData = weekData.stations?.mindmap_speaking || weekData.stations?.mindmap;
    
    // Handle branchLabels as object (stem -> branches mapping)
    if (mindmapData?.branchLabels && typeof mindmapData.branchLabels === 'object') {
        let branchCounter = 0;
        Object.values(mindmapData.branchLabels).forEach(branchArray => {
            if (Array.isArray(branchArray)) {
                branchArray.forEach(branch => {
                    branchCounter++;
                    const text = branch.text_en || branch;
                    addTask(text, `mindmap_branch_${branchCounter}`, voices.mindmap);
                });
            }
        });
        console.log(`   Found ${branchCounter} Mindmap branches across all stems.`);
    }
    
    // Mindmap center stems
    if (mindmapData?.centerStems && Array.isArray(mindmapData.centerStems)) {
        console.log(`   Found ${mindmapData.centerStems.length} Mindmap stems.`);
        mindmapData.centerStems.forEach((stem, idx) => {
            const text = stem.text_en || stem;
            addTask(text, `mindmap_stem_${idx + 1}`, voices.narration);
        });
    }

    // --- EXECUTE GENERATION ---
    console.log(`   Generating ${tasks.length} missing audio files...`);
    
    for (const task of tasks) {
        try {
            const audioBuffer = await callGoogleTTS(task.text, task.voice);
            if (audioBuffer) {
                fs.writeFileSync(task.filePath, audioBuffer);
                console.log(`   ✅ Generated: ${task.fileName}.mp3`);
                await delay(300); // Tránh rate limit của Google
            }
        } catch (e) {
            console.error(`   ❌ Failed ${task.fileName}: ${e.message}`);
        }
    }
};

(async () => {
    for (let i = startWeek; i <= endWeek; i++) {
        await processWeek(i, false);
        await processWeek(i, true);
    }
    console.log("\n🎉 Audio generation complete!");
})();
