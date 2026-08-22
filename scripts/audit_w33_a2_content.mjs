import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WORDLISTS_DIR = path.join(__dirname, '../src/data/official_wordlists');
const W33_DIR = path.join(__dirname, '../src/data/weeks/week_33');
const W33_EASY_DIR = path.join(__dirname, '../src/data/weeks_easy/week_33');

const WORDLIST_FILES = [
  'starters_pre_a1.json',
  'movers_a1.json',
  'flyers_a2.json',
  'ket_a2.json'
];

const allowedWords = new Set();
for (const file of WORDLIST_FILES) {
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

// Common ESL English grammatical inflections, names, numbers, days, core A2 terms
const A2_WHITELIST = new Set([
  'a', 'an', 'the', 'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'shall', 'should',
  'can', 'could', 'may', 'might', 'must', 'ought', 'i', 'me', 'my', 'mine', 'myself',
  'you', 'your', 'yours', 'yourself', 'he', 'him', 'his', 'himself', 'she', 'her',
  'hers', 'herself', 'it', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves',
  'they', 'them', 'their', 'theirs', 'themselves', 'this', 'that', 'these', 'those',
  'who', 'whom', 'whose', 'which', 'what', 'where', 'when', 'why', 'how', 'jake',
  'tom', 'mia', 'alex', 'ben', 'lucy', 'sara', 'sam', 'one', 'two', 'three', 'four',
  'five', 'six', 'seven', 'eight', 'nine', 'ten', 'first', 'second', 'third', 'fourth',
  'fifth', 'yes', 'no', 'not', 'ok', 'oh', 'well', 'hi', 'hello', 'bye', 'blank',
  'speaker', 'corridor', 'friction', 'bandage', 'nurse', 'slipped', 'relieved', 'caution',
  'puddle', 'tiles', 'tile', 'hallway', 'slippery', 'careful', 'carefully', 'accident',
  'treatment', 'recovery', 'speed', 'distance', 'safety', 'smooth', 'rough', 'surface',
  'floor', 'floors', 'rubber', 'shoes', 'running', 'walking', 'walk', 'run', 'fell', 'fall',
  'falling', 'hurt', 'knee', 'elbow', 'headmaster', 'teacher', 'clean', 'dry', 'wet',
  'warning', 'sign', 'signs', 'help', 'helped', 'helping', 'arrive', 'arrived', 'rule',
  'rules', 'break', 'breaks', 'school', 'class', 'classroom', 'classrooms'
]);

A2_WHITELIST.forEach(w => allowedWords.add(w));

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

// Extract all English strings from files
async function auditDirectory(dirPath, label) {
  console.log(`\n==================================================`);
  console.log(`🔍 AUDITING ${label}: ${dirPath}`);
  console.log(`==================================================`);
  
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.js') && !f.endsWith('.bak'));
  const flaggedWords = new Map(); // word -> list of { file, context }

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    try {
      const mod = await import(pathToFileURL(fullPath).href);
      const data = mod.default || mod;
      
      const textSnippets = [];
      function collectText(obj, currentKey = '') {
        if (!obj) return;
        if (typeof obj === 'string') {
          // Ignore Vietnamese text fields
          if (currentKey.includes('_vi') || currentKey.includes('vi') || currentKey === 'meaning') return;
          // Ignore audio/image paths
          if (obj.startsWith('/') || obj.startsWith('http') || obj.endsWith('.mp3') || obj.endsWith('.png') || obj.endsWith('.jpg') || obj.endsWith('.svg')) return;
          // Ignore phonetics
          if (obj.startsWith('/') && obj.endsWith('/')) return;
          textSnippets.push({ text: obj, file });
        } else if (Array.isArray(obj)) {
          obj.forEach(item => collectText(item, currentKey));
        } else if (typeof obj === 'object') {
          for (const [k, v] of Object.entries(obj)) {
            collectText(v, k);
          }
        }
      }

      collectText(data);

      for (const { text, file: fName } of textSnippets) {
        const words = text.toLowerCase().replace(/[^a-z\s-]/g, ' ').split(/\s+/).filter(Boolean);
        for (const w of words) {
          const base = getBaseWord(w);
          if (!allowedWords.has(w) && !allowedWords.has(base)) {
            if (!flaggedWords.has(w)) {
              flaggedWords.set(w, []);
            }
            flaggedWords.get(w).push({ file: fName, snippet: text.slice(0, 80) });
          }
        }
      }
    } catch (err) {
      console.error(`Error loading ${file}:`, err.message);
    }
  }

  console.log(`Total Flagged Non-A2 Words: ${flaggedWords.size}`);
  const sorted = [...flaggedWords.entries()].sort((a, b) => b[1].length - a[1].length);

  for (const [w, occurrences] of sorted) {
    console.log(`\n❌ [NON-A2 WORD]: "${w}" (${occurrences.length} occurrences)`);
    occurrences.slice(0, 3).forEach(occ => {
      console.log(`   📁 ${occ.file}: "${occ.snippet}..."`);
    });
  }

  return flaggedWords;
}

async function run() {
  await auditDirectory(W33_DIR, 'WEEK 33 ADVANCED');
  await auditDirectory(W33_EASY_DIR, 'WEEK 33 EASY');
}

run();
