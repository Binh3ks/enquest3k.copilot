import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const weekNum = parseInt(process.argv[2], 10) || 34;
const weekDir = path.join(rootDir, 'src', 'data', 'weeks', `week_${weekNum}`);

console.log(`========================================================================`);
console.log(`🛡️  GATE 12: COMPREHENSIVE CEFR & FORBIDDEN JARGON GUARD (WEEK ${weekNum})`);
console.log(`========================================================================`);

if (!fs.existsSync(weekDir)) {
  console.error(`❌ Week directory not found: ${weekDir}`);
  process.exit(1);
}

const FORBIDDEN_WORDS_STAGE1 = [
  'symbiosis',
  'mutual support',
  'kinetic momentum',
  'thermal radiation',
  'anachronism',
  'mechanism',
  'sterile',
  'prohibit',
  'forbid',
  'predominantly',
  'consequently',
  'furthermore',
  'moreover',
  'whereby'
];

let errors = [];
const files = fs.readdirSync(weekDir).filter(f => f.endsWith('.js') || f.endsWith('.json'));
const fileMetrics = [];
let totalWordsScanned = 0;

for (const file of files) {
  const content = fs.readFileSync(path.join(weekDir, file), 'utf8');
  const wordCount = (content.match(/\b[A-Za-z]+\b/g) || []).length;
  totalWordsScanned += wordCount;

  let fileViolations = [];
  for (const forbidden of FORBIDDEN_WORDS_STAGE1) {
    const regex = new RegExp(`\\b${forbidden}\\b`, 'gi');
    if (regex.test(content)) {
      fileViolations.push(forbidden);
      errors.push(`File ${file} contains forbidden Stage 1 academic jargon: "${forbidden}"`);
    }
  }

  fileMetrics.push({
    file,
    words: wordCount,
    violations: fileViolations.length,
    status: fileViolations.length === 0 ? '✅ CLEAN' : '❌ VIOLATIONS'
  });
}

console.log('\n📊 CEFR JARGON AUDIT REPORT — WEEK ' + weekNum + ':');
console.log(`- Total Files Scanned: ${files.length}`);
console.log(`- Total Words Scanned: ${totalWordsScanned.toLocaleString()}`);
console.log(`- Forbidden Academic Jargon Words Tested: ${FORBIDDEN_WORDS_STAGE1.length} words`);
console.log(`  [${FORBIDDEN_WORDS_STAGE1.join(', ')}]`);
console.log('\n| File Name | Word Count | Forbidden Jargon Detected | Status |');
console.log('|---|---|---|---|');
fileMetrics.forEach(fm => {
  console.log(`| \`${fm.file}\` | ${fm.words.toLocaleString()} words | ${fm.violations} | ${fm.status} |`);
});

if (errors.length > 0) {
  console.error(`\n❌ GATE 12 FAILED with ${errors.length} CEFR violations:`);
  errors.forEach((err, idx) => console.error(`   ${idx + 1}. ${err}`));
  process.exit(1);
} else {
  console.log(`\n✅ GATE 12 PASSED: 0 CEFR / Stage 1 Academic Jargon Violations across ${files.length} files (${totalWordsScanned.toLocaleString()} words scanned)!`);
  process.exit(0);
}
