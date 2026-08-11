import fs from 'fs';
import path from 'path';
import process from 'process';
import { pathToFileURL } from 'url';

const weekArg = process.argv[2] || '33';
const weekNum = parseInt(weekArg, 10);
const weekStr = weekNum < 10 ? `0${weekNum}` : `${weekNum}`;

if (isNaN(weekNum)) {
  console.error('❌ Error: Please provide a valid week number (e.g., node scripts/validate_week.mjs 33)');
  process.exit(1);
}

console.log(`\n================================================================`);
console.log(`🚀 GOLD STANDARD DEEP FIELD VALIDATOR (6 GATEKEEPERS) — WEEK ${weekNum}`);
console.log(`================================================================\n`);

const WEEKS_DIR = path.join(process.cwd(), 'src', 'data', 'weeks', `week_${weekStr}`);
let totalFailures = 0;

function reportGatekeeper(stt, name, passed, details = []) {
  const icon = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`[Gatekeeper ${stt}/6] ${name.padEnd(45, ' ')} : ${icon}`);
  if (details.length > 0) {
    details.forEach(d => console.log(`   └─ ${d}`));
  }
}

async function runValidation() {
  async function loadModuleFile(filename) {
    const fileP = path.join(WEEKS_DIR, filename);
    if (!fs.existsSync(fileP)) return null;
    try {
      const mod = await import(pathToFileURL(fileP).href + `?t=${Date.now()}`);
      return mod.default || mod;
    } catch (e) {
      console.error(`Error loading ${filename}:`, e.message);
      return null;
    }
  }

  // ---------------------------------------------------------------------------
  // Gatekeeper 1: Regex Check /\s+\./g on all week files (Space before dot)
  // ---------------------------------------------------------------------------
  {
    const details = [];
    let ok = true;
    if (fs.existsSync(WEEKS_DIR)) {
      const files = fs.readdirSync(WEEKS_DIR);
      files.forEach(file => {
        const fullPath = path.join(WEEKS_DIR, file);
        if (fs.statSync(fullPath).isFile()) {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (/\s+\./g.test(content)) {
            ok = false;
            details.push(`File ${file} contains space before period (matching /\\s+\\./g)`);
          }
        }
      });
    } else {
      ok = false;
      details.push(`Week directory ${WEEKS_DIR} does not exist`);
    }
    if (!ok) totalFailures++;
    reportGatekeeper(1, 'No Space Before Period (/\\s+\\./g)', ok, details);
  }

  // ---------------------------------------------------------------------------
  // Gatekeeper 2: Regex Check /\\text\{/g on listening_hub.js (No Raw LaTeX)
  // ---------------------------------------------------------------------------
  {
    const details = [];
    let ok = true;
    const listeningPath = path.join(WEEKS_DIR, 'listening_hub.js');
    if (!fs.existsSync(listeningPath)) {
      ok = false;
      details.push('File listening_hub.js is missing');
    } else {
      const content = fs.readFileSync(listeningPath, 'utf8');
      if (/\\text\{/g.test(content)) {
        ok = false;
        details.push('listening_hub.js contains raw LaTeX \\text{...} code (must use clean text formulas)');
      }
    }
    if (!ok) totalFailures++;
    reportGatekeeper(2, 'Zero Raw LaTeX (/\\\\text\\{/g in listening_hub.js)', ok, details);
  }

  // ---------------------------------------------------------------------------
  // Gatekeeper 3: ZERO-PII Export Check in learnerProgressService.js
  // ---------------------------------------------------------------------------
  {
    const details = [];
    let ok = true;
    const servicePath = path.join(process.cwd(), 'src', 'services', 'learnerProgressService.js');
    if (!fs.existsSync(servicePath)) {
      ok = false;
      details.push('learnerProgressService.js is missing');
    } else {
      const content = fs.readFileSync(servicePath, 'utf8');
      // Extract exportLearnerProgressJSON method content
      const exportMethodMatch = content.match(/async\s+exportLearnerProgressJSON[\s\S]*?return\s*\{([\s\S]*?)\};/);
      if (!exportMethodMatch) {
        ok = false;
        details.push('exportLearnerProgressJSON method not found in learnerProgressService.js');
      } else {
        const exportReturnPayload = exportMethodMatch[1];
        if (/real_child_name/.test(exportReturnPayload)) {
          ok = false;
          details.push('SECURITY FAIL: real_child_name detected inside exportLearnerProgressJSON return payload');
        }
      }
    }
    if (!ok) totalFailures++;
    reportGatekeeper(3, 'ZERO-PII Export Check (No real_child_name in export payload)', ok, details);
  }

  // ---------------------------------------------------------------------------
  // Gatekeeper 4: Vocab Length >= 20 in reading_hub.js
  // ---------------------------------------------------------------------------
  {
    const details = [];
    let ok = true;
    const data = await loadModuleFile('reading_hub.js');
    const vocabList = data?.readingHubData?.vocab || data?.vocab || [];
    if (!Array.isArray(vocabList) || vocabList.length < 20) {
      ok = false;
      details.push(`reading_hub.js vocab length must be >= 20 (found ${vocabList.length})`);
    }
    if (!ok) totalFailures++;
    reportGatekeeper(4, 'Vocab Count Check (vocab.length >= 20)', ok, details);
  }

  // ---------------------------------------------------------------------------
  // Gatekeeper 5: Story Scenes Length >= 5 in reading_hub.js
  // ---------------------------------------------------------------------------
  {
    const details = [];
    let ok = true;
    const data = await loadModuleFile('reading_hub.js');
    const storyScenes = data?.readingHubData?.story_scenes || data?.story_scenes || [];
    if (!Array.isArray(storyScenes) || storyScenes.length < 5) {
      ok = false;
      details.push(`reading_hub.js story_scenes length must be >= 5 (found ${storyScenes.length})`);
    }
    if (!ok) totalFailures++;
    reportGatekeeper(5, 'Webtoon Scenes Check (story_scenes.length >= 5)', ok, details);
  }

  // ---------------------------------------------------------------------------
  // Gatekeeper 6: Check 4 Main Hub Keys Exported in index.js
  // ---------------------------------------------------------------------------
  {
    const details = [];
    let ok = true;
    const weekData = await loadModuleFile('index.js');
    if (!weekData) {
      ok = false;
      details.push('File index.js is missing in week directory');
    } else {
      const targetObj = weekData.week33Data || weekData.weekData || weekData;
      const requiredKeys = ['readingHub', 'listeningHub', 'writingHub', 'speakingHub'];
      requiredKeys.forEach(k => {
        if (!targetObj[k]) {
          ok = false;
          details.push(`index.js missing exported main hub key "${k}"`);
        }
      });
    }
    if (!ok) totalFailures++;
    reportGatekeeper(6, 'Index Export Check (All 4 Hub Keys Present)', ok, details);
  }

  console.log(`\n================================================================`);
  if (totalFailures > 0) {
    console.error(`❌ DEEP VALIDATION FAILED FOR WEEK ${weekNum}! (${totalFailures} gatekeepers failed)`);
    process.exit(1);
  } else {
    console.log(`🎉 ALL 6 GATEKEEPERS PASSED 100% FOR WEEK ${weekNum}!`);
    console.log(`GOLD STANDARD WEEK 33 HAS BEEN LOCKED AND READY FOR MASS PRODUCTION`);
    console.log(`================================================================\n`);
    process.exit(0);
  }
}

runValidation().catch(err => {
  console.error('Fatal validator error:', err);
  process.exit(1);
});
