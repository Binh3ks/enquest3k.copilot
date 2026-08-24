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

for (const file of files) {
  const content = fs.readFileSync(path.join(weekDir, file), 'utf8');
  for (const forbidden of FORBIDDEN_WORDS_STAGE1) {
    const regex = new RegExp(`\\b${forbidden}\\b`, 'gi');
    if (regex.test(content)) {
      errors.push(`File ${file} contains forbidden Stage 1 academic jargon: "${forbidden}"`);
    }
  }
}

if (errors.length > 0) {
  console.error(`\n❌ GATE 12 FAILED with ${errors.length} CEFR violations:`);
  errors.forEach((err, idx) => console.error(`   ${idx + 1}. ${err}`));
  process.exit(1);
} else {
  console.log(`✅ GATE 12 PASSED: 0 CEFR / Stage 1 Academic Jargon Violations!`);
  process.exit(0);
}
