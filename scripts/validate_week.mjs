import { execSync } from 'child_process';
import process from 'process';

const weekArg = process.argv[2] || '36';
const weekNum = parseInt(weekArg, 10);

if (isNaN(weekNum)) {
  console.error('❌ Error: Please provide a valid week number (e.g., node scripts/validate_week.mjs 36)');
  process.exit(1);
}

console.log(`\n================================================================`);
console.log(`🚀 MASTER VALIDATION GATEKEEPER — WEEK ${weekNum}`);
console.log(`================================================================\n`);

let hasError = false;

function runStep(stepName, command) {
  console.log(`📌 STEP: ${stepName}`);
  try {
    const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    console.log(output.trim());
    console.log(`✅ ${stepName} PASSED!\n`);
  } catch (err) {
    console.error(`❌ ${stepName} FAILED!`);
    if (err.stdout) console.error(err.stdout.toString());
    if (err.stderr) console.error(err.stderr.toString());
    hasError = true;
  }
}

// 1. Audit Chunks & Punctuation
runStep('1. ESL Chunking & Punctuation Audit', 'node scripts/audit_chunks.js');

// 2. Audit Writing Pipeline
runStep('2. Write & Speak Pipeline Audit', 'node scripts/audit_writing_pipeline.mjs');

// 3. Audit Week Schema & English Definitions
runStep(`3. Schema & CEFR Definition Audit (Week ${weekNum})`, `node scripts/audit_new_week.mjs ${weekNum}`);

console.log(`================================================================`);
if (hasError) {
  console.error(`❌ MASTER VALIDATION FAILED FOR WEEK ${weekNum}! Fix errors above.`);
  process.exit(1);
} else {
  console.log(`🎉 ALL AUDIT GATEKEEPERS PASSED 100% FOR WEEK ${weekNum}!`);
  console.log(`================================================================\n`);
  process.exit(0);
}
