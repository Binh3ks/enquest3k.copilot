#!/usr/bin/env node
import { execSync } from 'child_process';

console.log('========================================================================');
console.log('🏆 ENGQUEST3K — W33 GOLDEN MASTER REGRESSION ENTRYPOINT');
console.log('========================================================================\n');

const suite = [
  { name: '1. Cryptographic Freeze Guard', cmd: 'node scripts/guard_golden_w33_freeze.mjs' },
  { name: '2. Media Integrity (Gate 3)', cmd: 'node scripts/gate3_media_integrity.mjs 33' },
  { name: '3. Chunk Bolding Quality (Gate 4)', cmd: 'node scripts/gate4_chunk_bolding.mjs 33' },
  { name: '4. No-Fallback Fail-Loud Sweep (Gate 8)', cmd: 'node scripts/gate8_no_fallback_sweep.mjs 33' },
  { name: '5. Example Grammaticality (Gate 10)', cmd: 'node scripts/gate10_example_grammaticality.mjs 33' },
  { name: '6. Content Richness (Gate 11)', cmd: 'node scripts/gate11_content_richness.mjs 33' },
  { name: '7. Comprehensive CEFR (Gate 12)', cmd: 'node scripts/gate12_comprehensive_cefr.mjs 33' },
  { name: '8. Rotary Schedule Invariant (Gate 13)', cmd: 'node scripts/gate13_rotary_schedule.mjs 33' },
  { name: '9. Content Quality & Single-Source (Gate 16)', cmd: 'node scripts/gate16_content_quality.mjs 33' },
  { name: '10. Cambridge Fidelity Doctrine (Gate 17)', cmd: 'node scripts/gate17_fidelity_doctrine.mjs 33' },
  { name: '11. Master Audit & Production DOM (Gate 15)', cmd: 'node scripts/audit_week.mjs 33' }
];

let allPassed = true;
const results = [];

for (const step of suite) {
  process.stdout.write(`⏳ Running [${step.name}]... `);
  try {
    const out = execSync(step.cmd, { stdio: 'pipe' }).toString();
    console.log('✅ PASS');
    results.push({ name: step.name, pass: true });
  } catch (e) {
    allPassed = false;
    console.log('❌ FAIL');
    console.error(e.stdout?.toString().slice(0, 300) || e.message);
    results.push({ name: step.name, pass: false, error: e.message });
  }
}

console.log('\n========================================================================');
console.log('📊 W33 GOLDEN REGRESSION SUMMARY:');
console.log('========================================================================');
results.forEach(r => {
  console.log(`  ${r.pass ? '✅' : '❌'} ${r.name}`);
});
console.log('========================================================================');

if (allPassed) {
  console.log('🎉 W33 GOLDEN MASTER REGRESSION PASSED 100% (ALL CHECKS EXIT 0)');
  console.log('========================================================================\n');
  process.exit(0);
} else {
  console.error('🚨 W33 GOLDEN MASTER REGRESSION FAILED — INVESTIGATE DISCREPANCIES ABOVE');
  console.log('========================================================================\n');
  process.exit(1);
}
