#!/usr/bin/env node
/**
 * GATE 7: Master Definition-of-Done Week Pipeline Auditor
 * Runs Gate 1 through Gate 6 + CEFR + Task Audit in sequence:
 * 1. Gate 1: Blueprint Conformance & Anti-Leak
 * 2. Gate 2: Atomic Alignment & Phonetics
 * 3. Gate 3: Media Integrity & Cloudflare R2
 * 4. Gate 4: ESL Chunk Bolding (Linear Thinking)
 * 5. Gate 5: Runtime Visual Smoke & Canvas
 * 6. Gate 6: XP Economy & Badge Consistency
 * 7. CEFR Curriculum Guard (Stage 1 Vocab Standard)
 * 8. 15-Quest Schema & Hub Audit
 * 
 * Exit code 0 ONLY if ALL gates pass 100% with 0 errors!
 */

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const weekArg = process.argv[2] || '34';
const weekNum = parseInt(weekArg.replace(/^w/i, ''), 10);

console.log(`\n========================================================================`);
console.log(`🏰 MASTER 7-GATE PRODUCTION AUDIT SUITE (WEEK ${weekNum})`);
console.log(`========================================================================`);

const GATES = [
  { name: 'Gate 1: Blueprint Conformance & Anti-Leak', cmd: `node scripts/gate1_blueprint_conformance.mjs ${weekNum}` },
  { name: 'Gate 2: Atomic Alignment & Phonetic Schema', cmd: `node scripts/gate2_atomic_alignment.mjs ${weekNum}` },
  { name: 'Gate 3: Media Integrity & Cloudflare R2 CDN', cmd: `node scripts/gate3_media_integrity.mjs ${weekNum}` },
  { name: 'Gate 4: ESL Linear Chunk Bolding', cmd: `node scripts/gate4_chunk_bolding.mjs ${weekNum}` },
  { name: 'Gate 5: Runtime Visual Smoke & Canvas Pixels', cmd: `node scripts/gate5_runtime_visual_smoke.mjs ${weekNum}` },
  { name: 'Gate 6: XP Economy & Badge Invariants', cmd: `node scripts/gate6_xp_economy.mjs ${weekNum}` },
  { name: 'Gate 7: CEFR Guard Stage 1 Vocabulary Standards', cmd: `node scripts/cefr_curriculum_guard.mjs ${weekNum}` },
  { name: 'Gate 8: Static No-Fallback Sweep & Fail-Loud Audit', cmd: `node scripts/gate8_no_fallback_sweep.mjs` },
  { name: 'Gate 9: Generator Purity & Zero-Clone Audit', cmd: `node scripts/gate9_generator_purity.mjs` },
  { name: 'Gate 10: Example Sentence Grammaticality & Diversity', cmd: `node scripts/gate10_example_grammaticality.mjs ${weekNum}` },
  { name: 'Gate 11: Content Richness & Volume Standard', cmd: `node scripts/gate11_content_richness.mjs ${weekNum}` },
  { name: 'Gate 12: Comprehensive CEFR & Forbidden Jargon Guard', cmd: `node scripts/gate12_comprehensive_cefr.mjs ${weekNum}` },
  { name: 'Gate 13: Boss Rotary Schedule & Skills Audit', cmd: `node scripts/gate13_rotary_schedule.mjs ${weekNum}` },
  { name: 'Gate 14: Deployed Version Stamp & Verification Engine', cmd: `node scripts/gate14_deployed_version.mjs` },
  { name: 'Task Auditor: 15-Quest Hub Invariants', cmd: `node scripts/audit_week_tasks.mjs ${weekNum}` }
];

let failedGates = [];

for (let i = 0; i < GATES.length; i++) {
  const gate = GATES[i];
  console.log(`\n▶️  [${i + 1}/${GATES.length}] Running ${gate.name}...`);
  try {
    const output = execSync(gate.cmd, { cwd: rootDir, encoding: 'utf8', stdio: 'inherit' });
    console.log(`   ✅ PASSED: ${gate.name}`);
  } catch (err) {
    console.error(`   ❌ FAILED: ${gate.name}`);
    failedGates.push(gate.name);
  }
}

console.log(`\n========================================================================`);
console.log(`📋 7-GATE MASTER AUDIT SUMMARY FOR WEEK ${weekNum}:`);
console.log(`========================================================================`);

if (failedGates.length > 0) {
  console.error(`❌ PRODUCTION GATE FAILED! The following ${failedGates.length} check(s) failed:`);
  failedGates.forEach(g => console.error(`   ❌ ${g}`));
  console.error(`\n🚨 KỶ LUẬT SẢN XUẤT: CẤM PUSH LÊN ORIGIN/MAIN KHI GATES CHƯA PASS 100%!`);
  process.exit(1);
} else {
  console.log(`🎉 100% PRODUCTION PASS: All ${GATES.length}/${GATES.length} Quality Gates Passed with 0 Errors!`);
  console.log(`✅ Definition of Done satisfied for Week ${weekNum}.`);
  process.exit(0);
}
