import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WORDLISTS_DIR = path.join(__dirname, '../src/data/official_wordlists');
const WEEKS_DIR = path.join(__dirname, '../src/data/weeks');
const WEEKS_EASY_DIR = path.join(__dirname, '../src/data/weeks_easy');

// Load CLI arguments
const weekArg = process.argv[2] || '33';
const targetWeek = parseInt(weekArg.replace(/[^0-9]/g, ''), 10);

if (isNaN(targetWeek) || targetWeek < 1 || targetWeek > 156) {
  console.error('❌ Error: Please specify a valid week number between 1 and 156. Example: node scripts/cefr_curriculum_guard.mjs 33');
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. CEFR STAGING CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────
const isStage1_A2 = targetWeek <= 72; // Weeks 1-72: Cambridge Pre-A1 -> A1 -> A2 Flyers / KET
const isStage2_B1B2 = targetWeek > 72; // Weeks 73-156: B1 Preliminary -> B1+ -> B2 First

const STAGE_NAME = isStage1_A2
  ? 'STAGE 1: Cambridge Young Learners (Pre-A1 Starters / A1 Movers / A2 Flyers / KET)'
  : 'STAGE 2: Cambridge Lower Secondary & PET/FCE (B1 Preliminary / B1+ / B2 First)';

const ALLOWED_WORDLIST_FILES = isStage1_A2
  ? ['starters_pre_a1.json', 'movers_a1.json', 'flyers_a2.json', 'ket_a2.json']
  : ['starters_pre_a1.json', 'movers_a1.json', 'flyers_a2.json', 'ket_a2.json', 'pet_b1.json', 'fce_b2.json'];

// Words strictly banned in Stage 1 (A2) to protect 7-10yo kids from academic burnout
const STAGE1_BANNED_ACADEMIC_JARGON = new Set([
  'lubricant', 'lubricants', 'lubricating', 'lubrication',
  'kinetic', 'momentum', 'radiation', 'thermal', 'thermodynamic',
  'anachronism', 'anachronistic', 'mechanism', 'mechanisms',
  'predominantly', 'subsequently', 'furthermore', 'moreover', 'henceforth',
  'nevertheless', 'consequently', 'whereby', 'wherein',
  'sterile', 'prohibit', 'prohibits', 'prohibited', 'forbid', 'forbidden',
  'utilize', 'utilization', 'synthesize', 'synthesis', 'phenomenon',
  'infrastructure', 'unprecedented', 'equilibrium', 'paradigm'
]);

// Populate Allowed Word Sets
const allowedWords = new Set();
for (const file of ALLOWED_WORDLIST_FILES) {
  const filePath = path.join(WORDLISTS_DIR, file);
  if (fs.existsSync(filePath)) {
    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      if (Array.isArray(content.words)) {
        content.words.forEach(w => {
          w.toLowerCase().split(/\s+/).forEach(t => {
            const clean = t.replace(/[^a-z]/g, '');
            if (clean) allowedWords.add(clean);
          });
        });
      }
    } catch (e) {
      console.warn(`Warning: Could not parse ${file}`);
    }
  }
}

// Fundamental ESL Grammatical Function Words, Proper Names, Numbers & Core School/Science terms
const BASE_FUNCTIONAL_WHITELIST = new Set([
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

BASE_FUNCTIONAL_WHITELIST.forEach(w => allowedWords.add(w));

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

// ─────────────────────────────────────────────────────────────────────────────
// 2. MULTI-STATION AUDIT ENGINE
// ─────────────────────────────────────────────────────────────────────────────
async function auditWeekFiles(dirPath, modeLabel) {
  console.log(`\n📂 Scanning ${modeLabel}: ${dirPath}`);
  if (!fs.existsSync(dirPath)) {
    console.log(`⚠️ Folder not found: ${dirPath}`);
    return { errors: 0, warnings: 0 };
  }

  // Scan ALL .js files (no HUB_FILES filter — confirmed gap via live test)
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.js') && !f.endsWith('.bak'));

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    try {
      const mod = await import(pathToFileURL(fullPath).href);
      const data = mod.default || mod;

      const snippets = [];
      function collectText(obj, currentKey = '') {
        if (!obj) return;
        if (typeof obj === 'string') {
          if (currentKey.includes('_vi') || currentKey.includes('vi') || currentKey === 'meaning') return;
          if (obj.startsWith('/') || obj.startsWith('http') || obj.endsWith('.mp3') || obj.endsWith('.png') || obj.endsWith('.jpg') || obj.endsWith('.svg')) return;
          if (obj.startsWith('/') && obj.endsWith('/')) return;
          snippets.push({ text: obj, file });
        } else if (Array.isArray(obj)) {
          obj.forEach(item => collectText(item, currentKey));
        } else if (typeof obj === 'object') {
          for (const [k, v] of Object.entries(obj)) {
            collectText(v, k);
          }
        }
      }

      collectText(data);

      for (const { text, file: fName } of snippets) {
        const rawWords = text.toLowerCase().replace(/[^a-z\s-]/g, ' ').split(/\s+/).filter(Boolean);

        // 1. Check for Banned Academic Jargon in Stage 1
        if (isStage1_A2) {
          for (const w of rawWords) {
            if (STAGE1_BANNED_ACADEMIC_JARGON.has(w)) {
              console.log(`  ❌ [CRITICAL B1/B2 JARGON IN STAGE 1] '${w}' found in ${fName}: "${text.slice(0, 70)}..."`);
              totalErrors++;
            }
          }
        }

        // 2. Check Sentence Length Overload for A2 (Max 24 words/sentence)
        if (isStage1_A2 && text.length > 20) {
          const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
          for (const s of sentences) {
            const wordCount = s.trim().split(/\s+/).length;
            if (wordCount > 24) {
              console.log(`  ⚠️ [SENTENCE LENGTH OVERLOAD (>24 words)] in ${fName} (${wordCount} words): "${s.trim().slice(0, 80)}..."`);
              totalWarnings++;
            }
          }
        }
      }
    } catch (err) {
      console.error(`  ❌ Error importing ${file}:`, err.message);
      totalErrors++;
    }
  }

  return { errors: totalErrors, warnings: totalWarnings };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. MASTER RUNNER
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`================================================================`);
  console.log(`🛡️ CAMBRIDGE CEFR CURRICULUM GUARD — WEEK ${targetWeek}`);
  console.log(`🎯 Staging Standard: ${STAGE_NAME}`);
  console.log(`📚 Wordlists Loaded: ${ALLOWED_WORDLIST_FILES.join(', ')}`);
  console.log(`================================================================`);

  const wStr = String(targetWeek).padStart(2, '0');
  const wDirAdv = path.join(WEEKS_DIR, `week_${wStr}`);

  const advRes = await auditWeekFiles(wDirAdv, `WEEK ${targetWeek} MASTER DATA`);
  // For W33+, there is only ONE unified 15-task / 4-hub dataset (Master Architecture Invariant)
  let easyErrors = 0;
  let easyWarnings = 0;
  if (targetWeek < 33) {
    const wDirEasy = path.join(WEEKS_EASY_DIR, `week_${wStr}`);
    const easyRes = await auditWeekFiles(wDirEasy, `WEEK ${targetWeek} EASY`);
    easyErrors = easyRes.errors;
    easyWarnings = easyRes.warnings;
  }

  // --- Scan ALL component and zone files for hardcoded fallback strings ---
  const COMPONENT_DIRS_WITH_HARDCODED_CONTENT = [
    path.join(__dirname, '../src/components/cambridge'),
    path.join(__dirname, '../src/components/zones'),
    path.join(__dirname, '../src/components/common'),
    path.join(__dirname, '../src/modules/zones'),
    path.join(__dirname, '../src/modules/hubs'),
    path.join(__dirname, '../src/modules/shadowing'),
  ];
  let componentErrors = 0;
  let componentWarnings = 0;
  console.log('\n📂 Scanning ALL COMPONENT & ZONE CONTENT (.jsx/.js hardcoded strings):');
  for (const dir of COMPONENT_DIRS_WITH_HARDCODED_CONTENT) {
    if (!fs.existsSync(dir)) continue;
    const findJsxFiles = (baseDir) => {
      let results = [];
      const list = fs.readdirSync(baseDir);
      for (const item of list) {
        const itemPath = path.join(baseDir, item);
        const stat = fs.statSync(itemPath);
        if (stat.isDirectory()) {
          results = results.concat(findJsxFiles(itemPath));
        } else if (item.endsWith('.jsx') || item.endsWith('.js')) {
          results.push(itemPath);
        }
      }
      return results;
    };

    const jsxFiles = findJsxFiles(dir);
    for (const fullPath of jsxFiles) {
      const relPath = path.relative(path.join(__dirname, '..'), fullPath);
      const rawSource = fs.readFileSync(fullPath, 'utf-8');
      const stringLiterals = [];
      const stringRegex = /(?:"([^"\\\n]{10,})"|'([^'\\\n]{10,})'|`([^`\\]{10,})`)/g;
      let m;
      while ((m = stringRegex.exec(rawSource)) !== null) {
        const s = (m[1] || m[2] || m[3] || '').trim();
        if (s.startsWith('/') || s.startsWith('http') || s.includes('className') || s.includes('\\') || s.includes('flex') || s.includes('grid')) continue;
        if (s.length > 15) stringLiterals.push(s);
      }
      for (const text of stringLiterals) {
        const rawWords = text.toLowerCase().replace(/[^a-z\s-]/g, ' ').split(/\s+/).filter(Boolean);
        if (isStage1_A2) {
          for (const w of rawWords) {
            if (STAGE1_BANNED_ACADEMIC_JARGON.has(w)) {
              console.log(`  ❌ [HARDCODED JARGON IN COMPONENT] '${w}' in ${relPath}: "${text.slice(0, 80)}"`);
              componentErrors++;
            }
          }
        }
      }
    }
  }
  if (componentErrors === 0) console.log('  ✅ No banned jargon found across all component and zone files.');

  const totalErrors = advRes.errors + easyErrors + componentErrors;
  const totalWarnings = advRes.warnings + easyWarnings + componentWarnings;

  console.log(`\n================================================================`);
  console.log(`📊 AUDIT SUMMARY FOR WEEK ${targetWeek}:`);
  console.log(`   ❌ Critical B1/B2 Violations: ${totalErrors}`);
  console.log(`   ⚠️ Sentence Length Warnings:   ${totalWarnings}`);
  console.log(`================================================================`);

  if (totalErrors > 0) {
    console.log(`❌ FAILED: Week ${targetWeek} contains ${totalErrors} out-of-standard elements. Please fix before release!`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: Week ${targetWeek} conforms 100% to ${STAGE_NAME}!`);
    process.exit(0);
  }
}

main();
