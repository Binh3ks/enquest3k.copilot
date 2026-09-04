import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WORDLISTS_DIR = path.join(__dirname, '../src/data/official_wordlists');
const W33_DIR = path.join(__dirname, '../src/data/weeks/week_33');
const W33_EASY_DIR = path.join(__dirname, '../src/data/weeks_easy/week_33');

const ALLOWED_WORDLIST_FILES = [
  'starters_pre_a1.json',
  'movers_a1.json',
  'flyers_a2.json',
  'ket_a2.json'
];

const BANNED_B2_C1_WORDS = new Set([
  'lubricant', 'lubricants', 'lubricating', 'lubrication',
  'kinetic', 'momentum', 'radiation', 'thermal', 'thermodynamic',
  'anachronism', 'anachronistic', 'mechanism', 'mechanisms',
  'predominantly', 'subsequently', 'furthermore', 'moreover', 'henceforth',
  'nevertheless', 'consequently', 'whereby', 'wherein',
  'sterile', 'prohibit', 'prohibits', 'prohibited', 'forbid', 'forbidden',
  'utilize', 'utilization', 'synthesize', 'synthesis', 'phenomenon',
  'infrastructure', 'unprecedented', 'equilibrium', 'paradigm'
]);

const allowedWords = new Set();
for (const file of ALLOWED_WORDLIST_FILES) {
  const filePath = path.join(WORDLISTS_DIR, file);
  if (fs.existsSync(filePath)) {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (Array.isArray(content.words)) {
      content.words.forEach(w => {
        w.toLowerCase().split(/\s+/).forEach(t => {
          const clean = t.replace(/[^a-z]/g, '');
          if (clean) allowedWords.add(clean);
        });
      });
    }
  }
}

const WHITELIST = new Set([
  'a', 'an', 'the', 'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'shall', 'should',
  'can', 'could', 'may', 'might', 'must', 'ought', 'i', 'me', 'my', 'mine', 'myself',
  'you', 'your', 'yours', 'yourself', 'he', 'him', 'his', 'himself', 'she', 'her',
  'hers', 'herself', 'it', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves',
  'they', 'them', 'their', 'theirs', 'themselves', 'this', 'that', 'these', 'those',
  'who', 'whom', 'whose', 'which', 'what', 'where', 'when', 'why', 'how', 'jake',
  'tom', 'mia', 'alex', 'ben', 'lucy', 'sara', 'sam', 'anna', 'leo', 'oliver', 'nova',
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'first', 'second', 'third', 'fourth', 'fifth', 'yes', 'no', 'not', 'ok', 'oh', 'well',
  'hi', 'hello', 'bye', 'blank', 'speaker', 'corridor', 'friction', 'bandage', 'nurse',
  'slipped', 'relieved', 'caution', 'puddle', 'tiles', 'tile', 'hallway', 'slippery',
  'careful', 'carefully', 'accident', 'treatment', 'recovery', 'speed', 'distance',
  'safety', 'smooth', 'rough', 'surface', 'floor', 'floors', 'rubber', 'shoes',
  'running', 'walking', 'walk', 'run', 'fell', 'fall', 'falling', 'hurt', 'knee',
  'elbow', 'headmaster', 'teacher', 'clean', 'dry', 'wet', 'warning', 'sign', 'signs',
  'help', 'helped', 'helping', 'arrive', 'arrived', 'rule', 'rules', 'break', 'breaks',
  'school', 'class', 'classroom', 'classrooms', 'laboratory', 'lab', 'olympic', 'greece',
  'truce', 'ancient', 'athlete', 'athletes', 'country', 'city', 'star', 'stars',
  'meter', 'meters', 'minute', 'minutes', 'hour', 'hours', 'ice', 'pack', 'cut', 'cuts'
]);

WHITELIST.forEach(w => allowedWords.add(w));

function getBaseWord(word) {
  if (allowedWords.has(word)) return word;
  if (word.endsWith('ed')) {
    if (allowedWords.has(word.slice(0, -2))) return word.slice(0, -2);
    if (allowedWords.has(word.slice(0, -1))) return word.slice(0, -1);
    if (word.endsWith('ied') && allowedWords.has(word.slice(0, -3) + 'y')) return word.slice(0, -3) + 'y';
  }
  if (word.endsWith('ing')) {
    if (allowedWords.has(word.slice(0, -3))) return word.slice(0, -3);
    if (allowedWords.has(word.slice(0, -3) + 'e')) return word.slice(0, -3) + 'e';
  }
  if (word.endsWith('s')) {
    if (allowedWords.has(word.slice(0, -1))) return word.slice(0, -1);
    if (word.endsWith('es') && allowedWords.has(word.slice(0, -2))) return word.slice(0, -2);
  }
  if (word.endsWith('ly') && allowedWords.has(word.slice(0, -2))) return word.slice(0, -2);
  return word;
}

// 15 Standard Tasks
const TASKS = [
  { id: 'gear1_webtoon', name: 'Day 1 Quest 1: Scene Explorer (Webtoon)', files: ['read.js', 'reading_hub.js'] },
  { id: 'gear2_karaoke', name: 'Day 1 Quest 2: Voice Shadow (Shadowing)', files: ['shadowing.js', 'shadowing_ipa.js'] },
  { id: 'gear3_retell', name: 'Day 1 Quest 3: Story Retell', files: ['read.js', 'week_33_real.js'] },
  { id: 'gear4_clil', name: 'Day 2 Quest 1: Fact Finder (CLIL Social & Science)', files: ['explore.js', 'reading_hub.js'] },
  { id: 'science_lab', name: 'Day 2 Quest 2: Action Lab (Physics Lab)', files: ['listening_hub.js', 'logic_science.js'] },
  { id: 'science_report', name: 'Day 2 Quest 3: Discovery Report', files: ['reading_hub.js'] },
  { id: 'word_blitz', name: 'Day 3 Quest 1: Speed Match (Vocab Blitz)', files: ['vocab.js', 'word_match.js', 'word_power.js'] },
  { id: 'sentence_smash', name: 'Day 3 Quest 2: Grammar Duel', files: ['grammar.js', 'listening_hub.js'] },
  { id: 'math_quest', name: 'Day 3 Quest 3: Math Quest (Singapore Math)', files: ['singapore_math.js', 'logic_lab.js'] },
  { id: 'story_writer', name: 'Day 4 Quest 1: Story Writer (P7)', files: ['writing.js', 'writing_hub.js'] },
  { id: 'broadcast_studio', name: 'Day 4 Quest 2: Video Challenge & Podcast', files: ['daily_watch.js', 'speaking_hub.js'] },
  { id: 'info_exchange', name: 'Day 4 Quest 3: Info Exchange (Cambridge P2)', files: ['ask_ai.js', 'speaking_hub.js'] },
  { id: 'boss_listening', name: 'Day 5 Quest 1: Listening Shield (Parts 1-5)', files: ['listening_hub.js'] },
  { id: 'boss_reading', name: 'Day 5 Quest 2: Reading & Writing Shield (Parts 1-6)', files: ['reading_hub.js', 'writing_hub.js'] },
  { id: 'weekly_review', name: 'Day 5 Quest 3: Speaking & Passport (Parts 1-4 & Debate)', files: ['speaking_hub.js'] }
];

async function auditTask(task, baseDir, modeLabel) {
  let issues = [];
  
  for (const relFile of task.files) {
    const fullPath = path.join(baseDir, relFile);
    if (!fs.existsSync(fullPath)) continue;

    try {
      const mod = await import(pathToFileURL(fullPath).href);
      const data = mod.default || mod;

      const snippets = [];
      function collect(obj, key = '', pathKey = '') {
        if (!obj) return;
        const currentPath = pathKey ? `${pathKey}.${key}` : key;
        if (typeof obj === 'string') {
          if (key.includes('_vi') || key.includes('vi') || key === 'meaning') return;
          if (obj.startsWith('/') || obj.startsWith('http') || obj.endsWith('.mp3') || obj.endsWith('.png') || obj.endsWith('.jpg') || obj.endsWith('.svg')) return;
          if (obj.startsWith('/') && obj.endsWith('/')) return;
          snippets.push({ text: obj, key, pathKey: currentPath, file: relFile });
        } else if (Array.isArray(obj)) {
          obj.forEach(item => collect(item, key, currentPath));
        } else if (typeof obj === 'object') {
          for (const [k, v] of Object.entries(obj)) {
            collect(v, k, currentPath);
          }
        }
      }

      collect(data);

      for (const { text, file, key, pathKey } of snippets) {
        const words = text.toLowerCase().replace(/[^a-z\s-]/g, ' ').split(/\s+/).filter(Boolean);
        for (const w of words) {
          if (BANNED_B2_C1_WORDS.has(w)) {
            issues.push({ type: 'BANNED_B2_WORD', word: w, file, text: text.slice(0, 60) });
          }
        }

        // Sentence length check
        // Instructions, hints, and prompts are teacher-facing directives, exempt from learner narrative length limits
        const isInstruction = key.includes('hint') || key.includes('instruction') || key.includes('prompt') || key.includes('guidance');
        if (!isInstruction && text.length > 20) {
          const isCLIL = file.includes('clil') || pathKey.toLowerCase().includes('clil') || pathKey.toLowerCase().includes('science') || pathKey.toLowerCase().includes('fact');
          const maxWords = isCLIL ? 28 : 22;
          const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
          for (const s of sentences) {
            const wc = s.trim().split(/\s+/).length;
            if (wc > maxWords) {
              issues.push({ type: 'SENTENCE_TOO_LONG', length: wc, file, sentence: s.trim().slice(0, 70) });
            }
          }
        }
      }
    } catch (e) {
      issues.push({ type: 'FILE_ERROR', file: relFile, error: e.message });
    }
  }

  return issues;
}

async function run() {
  console.log(`================================================================`);
  console.log(`📋 GRANULAR AUDIT OF ALL 15 TASKS / GEARS IN WEEK 33`);
  console.log(`================================================================`);

  let totalIssues = 0;

  for (const task of TASKS) {
    const advIssues = await auditTask(task, W33_DIR, 'ADVANCED');
    const easyIssues = await auditTask(task, W33_EASY_DIR, 'EASY');
    const allIssues = [...advIssues, ...easyIssues];

    if (allIssues.length === 0) {
      console.log(`✅ [${task.id}] ${task.name}: 100% PASS (0 issues)`);
    } else {
      console.log(`❌ [${task.id}] ${task.name}: ${allIssues.length} ISSUES FOUND:`);
      allIssues.forEach(iss => {
        if (iss.type === 'BANNED_B2_WORD') {
          console.log(`   - 🚫 Banned B2 Word '${iss.word}' in ${iss.file}: "${iss.text}..."`);
        } else if (iss.type === 'SENTENCE_TOO_LONG') {
          console.log(`   - ⚠️ Long sentence (${iss.length} words) in ${iss.file}: "${iss.sentence}..."`);
        } else {
          console.log(`   - ⚠️ Error in ${iss.file}: ${iss.error}`);
        }
      });
      totalIssues += allIssues.length;
    }
  }

  console.log(`\n================================================================`);
  console.log(`📊 TOTAL ISSUES FOUND ACROSS ALL 15 TASKS: ${totalIssues}`);
  console.log(`================================================================`);

  if (totalIssues > 0) {
    process.exit(1);
  }
}

run();
