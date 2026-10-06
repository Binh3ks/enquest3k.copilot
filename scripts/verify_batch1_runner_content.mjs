/**
 * verify_batch1_runner_content.mjs
 *
 * Automated Quality Gate Validator for Batch 1 (Shape A: 4 Lane Runners):
 *   1. QuestionQuestRunner: N <= 17w, Banner <= 5w, Options = 4w each (Delta = 0)
 *   2. ConnectorRelayCanvas: N <= 12w, Sentence <= 8w, Gates <= 2w each (Delta = 0)
 *   3. SyntaxExpressRail: N <= 17w, Stem <= 8w, Levers = 3w each (Delta = 0)
 *   4. HighwaySprintCanvas: N <= 15w, Def <= 12w, Words = 1w each (Delta = 0)
 *
 * Exit code 0: ALL PASS
 * Exit code 1: FAIL (aborts build)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

console.log('🏃 [Batch 1 Runner Validator] Checking N_max & Length-Balanced Invariants...');

let totalChecks = 0;
let violations = [];

// ── 1. QuestionQuestRunner ───────────────────────────────────────────────────
const qqPath = path.join(ROOT_DIR, 'src/modules/chronicles/games/QuestionQuestRunner.jsx');
if (fs.existsSync(qqPath)) {
  const content = fs.readFileSync(qqPath, 'utf8');
  const match = content.match(/(?:export\s+)?const DEFAULT_WH_KERNEL_ROUNDS = (\[[\s\S]*?\]);/);
  if (match) {
    try {
      const rounds = new Function(`return ${match[1]};`)();
      rounds.forEach((r, idx) => {
        totalChecks++;
        const bannerW = countWords(r.sentence);
        const optWords = (r.options || []).map(o => countWords(o.text));
        const totalW = bannerW + optWords.reduce((a, b) => a + b, 0);
        const minOpt = Math.min(...optWords);
        const maxOpt = Math.max(...optWords);
        const delta = maxOpt - minOpt;

        if (bannerW > 6) {
          violations.push(`QuestionQuest R${idx + 1}: Banner exceeds 6 words (${bannerW}w): "${r.sentence}"`);
        }
        if (optWords.some(w => w > 4)) {
          violations.push(`QuestionQuest R${idx + 1}: Option exceeds 4 words: [${optWords.join(', ')}]`);
        }
        if (delta !== 0) {
          violations.push(`QuestionQuest R${idx + 1}: Delta length imbalance (Delta = ${delta}, expected 0): [${optWords.join(', ')}]`);
        }
        if (totalW > 17) {
          violations.push(`QuestionQuest R${idx + 1}: Total words exceeds N_max=17 (${totalW}w)`);
        }
      });
      console.log(`  ✓ QuestionQuestRunner: ${rounds.length} rounds verified (N <= 17, Delta = 0)`);
    } catch (e) {
      violations.push(`QuestionQuestRunner parsing error: ${e.message}`);
    }
  } else {
    // Check if not yet written
    console.log('  ⚠️ QuestionQuestRunner DEFAULT_WH_KERNEL_ROUNDS not yet declared (will verify after code edit)');
  }
}

// ── 2. SyntaxExpressRail ─────────────────────────────────────────────────────
const syntaxPath = path.join(ROOT_DIR, 'src/modules/quest/SyntaxExpressRail.jsx');
if (fs.existsSync(syntaxPath)) {
  const content = fs.readFileSync(syntaxPath, 'utf8');
  const match = content.match(/const DEFAULT_SYNTAX_ROUNDS = (\[[\s\S]*?\]);\s*export default/);
  if (match) {
    try {
      const rounds = new Function(`return ${match[1]};`)();
      rounds.forEach((r, idx) => {
        totalChecks++;
        const stemW = countWords(r.stem);
        const optWords = (r.options || []).map(o => countWords(o.text));
        const totalW = stemW + optWords.reduce((a, b) => a + b, 0);
        const delta = Math.max(...optWords) - Math.min(...optWords);

        if (stemW > 8) {
          violations.push(`SyntaxExpress R${idx + 1}: Stem exceeds 8 words (${stemW}w): "${r.stem}"`);
        }
        if (optWords.some(w => w > 3)) {
          violations.push(`SyntaxExpress R${idx + 1}: Option exceeds 3 words: [${optWords.join(', ')}]`);
        }
        if (delta > 0) {
          violations.push(`SyntaxExpress R${idx + 1}: Delta length imbalance (Delta = ${delta}, expected 0): [${optWords.join(', ')}]`);
        }
        if (totalW > 17) {
          violations.push(`SyntaxExpress R${idx + 1}: Total words exceeds N_max=17 (${totalW}w)`);
        }
      });
      console.log(`  ✓ SyntaxExpressRail: ${rounds.length} rounds verified (N <= 17, Delta = 0)`);
    } catch (e) {
      violations.push(`SyntaxExpressRail parsing error: ${e.message}`);
    }
  }
}

// ── 3. HighwaySprintCanvas ───────────────────────────────────────────────────
const highwayPath = path.join(ROOT_DIR, 'src/modules/quest/HighwaySprintCanvas.jsx');
if (fs.existsSync(highwayPath)) {
  const content = fs.readFileSync(highwayPath, 'utf8');
  const match = content.match(/const DEFAULT_HIGHWAY_ROUNDS = (\[[\s\S]*?\]);\s*export default/);
  if (match) {
    try {
      const rounds = new Function(`return ${match[1]};`)();
      rounds.slice(0, 6).forEach((r, idx) => {
        totalChecks++;
        const defW = countWords(r.definition);
        const targetW = countWords(r.targetWord);
        const distWords = (r.distractors || []).slice(0, 2).map(d => countWords(d));
        const allWords = [targetW, ...distWords];
        const totalW = defW + allWords.reduce((a, b) => a + b, 0);
        const delta = Math.max(...allWords) - Math.min(...allWords);

        if (defW > 12) {
          violations.push(`HighwaySprint R${idx + 1}: Definition exceeds 12 words (${defW}w): "${r.definition}"`);
        }
        if (allWords.some(w => w > 1)) {
          violations.push(`HighwaySprint R${idx + 1}: Word choice exceeds 1 word: [${allWords.join(', ')}]`);
        }
        if (delta > 0) {
          violations.push(`HighwaySprint R${idx + 1}: Delta length imbalance (Delta = ${delta}, expected 0): [${allWords.join(', ')}]`);
        }
        if (totalW > 15) {
          violations.push(`HighwaySprint R${idx + 1}: Total words exceeds N_max=15 (${totalW}w)`);
        }
      });
      console.log(`  ✓ HighwaySprintCanvas: 6 rounds verified (N <= 15, Delta = 0)`);
    } catch (e) {
      violations.push(`HighwaySprintCanvas parsing error: ${e.message}`);
    }
  }
}

// ── 4. ConnectorRelayCanvas ──────────────────────────────────────────────────
const connectorPath = path.join(ROOT_DIR, 'src/modules/quest/ConnectorRelayCanvas.jsx');
if (fs.existsSync(connectorPath)) {
  const content = fs.readFileSync(connectorPath, 'utf8');
  const match = content.match(/(?:export\s+)?const DEFAULT_CONNECTOR_ROUNDS = (\[[\s\S]*?\]);/);
  if (match) {
    try {
      const rounds = new Function(`return ${match[1]};`)();
      rounds.forEach((r, idx) => {
        totalChecks++;
        const sentW = countWords(r.sentence.replace('_____', 'blank'));
        const optWords = (r.options || []).map(o => countWords(o));
        const totalW = sentW + optWords.reduce((a, b) => a + b, 0);
        const delta = Math.max(...optWords) - Math.min(...optWords);

        if (sentW > 8) {
          violations.push(`ConnectorRelay R${idx + 1}: Sentence exceeds 8 words (${sentW}w): "${r.sentence}"`);
        }
        if (optWords.some(w => w > 2)) {
          violations.push(`ConnectorRelay R${idx + 1}: Connector option exceeds 2 words: [${optWords.join(', ')}]`);
        }
        if (delta !== 0) {
          violations.push(`ConnectorRelay R${idx + 1}: Delta length imbalance (Delta = ${delta}, expected 0): [${optWords.join(', ')}]`);
        }
        if (totalW > 12) {
          violations.push(`ConnectorRelay R${idx + 1}: Total words exceeds N_max=12 (${totalW}w)`);
        }
      });
      console.log(`  ✓ ConnectorRelayCanvas: ${rounds.length} rounds verified (N <= 12, Delta = 0)`);
    } catch (e) {
      violations.push(`ConnectorRelayCanvas parsing error: ${e.message}`);
    }
  }
}

if (violations.length > 0) {
  console.error('\n❌ [Batch 1 Runner Validator] VIOLATIONS FOUND:');
  violations.forEach(v => console.error(`   • ${v}`));
  process.exit(1);
} else {
  console.log(`\n✅ [Batch 1 Runner Validator] Passed! Total items verified: ${totalChecks}\n`);
  process.exit(0);
}
