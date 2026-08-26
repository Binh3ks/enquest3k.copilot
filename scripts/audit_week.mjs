#!/usr/bin/env node
import { execSync } from 'child_process';

const weekNum = process.argv[2] || '33';

console.log(`\n========================================================================`);
console.log(`🚀 RUNNING FULL QUALITY AUDIT SUITE FOR WEEK ${weekNum}`);
console.log(`========================================================================\n`);

try {
  console.log(`▶ 1/4: GATE 3 — Media Integrity`);
  execSync(`node scripts/gate3_media_integrity.mjs ${weekNum}`, { stdio: 'inherit' });

  console.log(`\n▶ 2/4: GATE 15 — Production DOM Assertions (Local Preview)`);
  execSync(`node scripts/gate15_production_dom_assertions.mjs ${weekNum} --local`, { stdio: 'inherit' });

  console.log(`\n▶ 3/4: GATE 16 — Content Quality`);
  execSync(`node scripts/gate16_content_quality.mjs ${weekNum}`, { stdio: 'inherit' });

  console.log(`\n▶ 4/4: GATE 17 — Fidelity Doctrine`);
  execSync(`node scripts/gate17_fidelity_doctrine.mjs ${weekNum}`, { stdio: 'inherit' });

  console.log(`\n🎉 ALL 4 QUALITY GATES PASSED 100% FOR WEEK ${weekNum}!\n`);
  process.exit(0);
} catch (e) {
  console.error(`\n❌ AUDIT FAILED FOR WEEK ${weekNum}`);
  process.exit(1);
}
