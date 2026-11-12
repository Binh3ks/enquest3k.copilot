import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { normalizeBarModelQuestion } from '../src/utils/station2Adapters.js';
import { evaluateBarModelAnswer } from '../src/utils/barModelEvaluator.js';

const BASELINE = '1e0039adbdf0ac56789b8d11e3e57888f5d00f44';
const OUT_FILE = path.resolve('docs/agent_artifacts/round83_verification_raw.txt');
const WEEKS = [126, 127, 133, 134];

const lines = [];
const log = (s = '') => lines.push(s);

log('========================================================================');
log('ROUND 83 RUNTIME ADAPTER & BOUNDARY VERIFICATION');
log(`Generated: ${new Date().toISOString()}`);
log(`Baseline Commit: ${BASELINE}`);
log('========================================================================\n');

let errors = 0;

log('1. REAL normalizeBarModelQuestion() + evaluateBarModelAnswer() DUMP (20 items):');
for (const w of WEEKS) {
  const sp = (await import(`../docs/agent_artifacts/staging/week_${w}/skill_practice_hub.js?v=${Date.now()}`)).default;
  log(`\n--- Week ${w} ---`);
  sp.singapore_math.forEach((rawQ, idx) => {
    const norm = normalizeBarModelQuestion(rawQ, idx, w);
    const evalRes = evaluateBarModelAnswer(String(norm.correctAnswer), norm.correctAnswer);
    const isGeom = w === 133 || w === 134;
    const svgCheck = isGeom
      ? fs.existsSync(path.resolve(`docs/agent_artifacts/staging/week_${w}/svg/${path.basename(norm.svg_url)}`))
      : true;

    if (norm.correctAnswer === null || !Number.isInteger(norm.correctAnswer) || !evalRes.isCorrect) errors++;
    if (!norm.problemText || norm.problemText === 'Solve the Bar Model problem below:') errors++;
    if (isGeom && (norm.modelData !== null || !svgCheck)) errors++;
    if (!isGeom && norm.modelData === null) errors++;

    log(
      `  [${norm.id}] title="${norm.title}" | answer=${norm.correctAnswer} | eval=${evalRes.isCorrect} (${JSON.stringify(evalRes)}) | modelData=${norm.modelData ? norm.modelData.type : 'null'} | svg_url="${norm.svg_url}" | stagedSvgExists=${svgCheck}`
    );
    log(`      problemText: ${norm.problemText}`);
  });
}

log('\n2. PROTECTED PATHS BOUNDARY CHECK vs BASELINE:');
const protectedPrefixes = [
  'src/',
  'public/',
  'docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md',
  'AGENTS.md',
  'docs/WEEK_PRODUCTION_SOP.md',
  'docs/ARCHITECTURE_CURRENT.md',
  'docs/W33_GOLDEN_FREEZE_MANIFEST.json',
];
const changedFromBaseline = execSync(`git diff --name-only ${BASELINE}`, { encoding: 'utf8' })
  .split('\n')
  .map((s) => s.trim())
  .filter(Boolean);

const violations = changedFromBaseline.filter((f) =>
  protectedPrefixes.some((p) => f === p || f.startsWith(p))
);
if (violations.length > 0) errors += violations.length;
log(`  Tracked files modified vs ${BASELINE.slice(0, 8)}: ${changedFromBaseline.length}`);
for (const f of changedFromBaseline) log(`    - ${f}`);
log(`  Protected-path violations: ${violations.length}`);
if (violations.length) {
  for (const v of violations) log(`    VIOLATION: ${v}`);
}

log('\n========================================================================');
log(`VERIFICATION SUMMARY: errors=${errors} (${errors === 0 ? 'PASS' : 'FAIL'})`);
log('========================================================================');

fs.writeFileSync(OUT_FILE, lines.join('\n') + '\n', 'utf8');
console.log(lines.join('\n'));
if (errors > 0) process.exit(1);
