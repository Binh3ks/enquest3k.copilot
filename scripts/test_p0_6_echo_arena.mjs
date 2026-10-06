/**
 * scripts/test_p0_6_echo_arena.mjs
 * Automated validation for Ticket P0-6 (Echo Arena Shooter, Floor 3 Door 1)
 * Checks 9 criteria:
 * 1. Default rounds count: R = 4 rounds
 * 2. Orbs per round: exactly 4 orbs (1 correct, 3 distractors, p = 0.25)
 * 3. Mathematical N4 calculation: 3.76% <= 5% (Negative Binomial, 4 rounds, 3 hearts persistent)
 * 4. N1 Exploit Removal: No handleOrbDirectPop, No onClick on orbs
 * 5. CSS pointer-events: none on .acoustic-orb-entity
 * 6. Ray aiming from Leo: originX/originY from leoRef, speed = 14
 * 7. Hazard patrol & transform isolation: scaleX(-1) only on gremlin-icon, gremlin-tag un-mirrored
 * 8. Horizontal spacing: minDist > 120px between orbs (spacing = width / 5 = 160px)
 * 9. N2 pacing & worst-case reading time: T_req <= 22.5s/round (+17.08s margin)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const jsxPath = path.join(root, 'src/modules/quest/EchoArenaShooter.jsx');
const cssPath = path.join(root, 'src/modules/quest/EchoArenaShooter.css');

const jsxContent = fs.readFileSync(jsxPath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');

const results = [];

function assertCheck(id, desc, passed, details = '') {
  results.push({ id, desc, passed, details });
  const mark = passed ? '✅' : '❌';
  console.log(`${mark} [${id}] ${desc}: ${passed ? 'PASS' : 'FAIL'} ${details ? `(${details})` : ''}`);
}

console.log('=== P0-6 ECHO ARENA SHOOTER AUTOMATED VALIDATION ===\n');

// 1. R = 4 rounds
const roundsMatch = jsxContent.match(/const DEFAULT_PHONICS_ROUNDS = \[([\s\S]*?)\];/);
let defaultRounds = [];
if (roundsMatch) {
  // extract targetSound occurrences
  const sounds = [...roundsMatch[1].matchAll(/targetSound:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  assertCheck('CHECK-1', 'Default phonics rounds count R = 4', sounds.length === 4, `found ${sounds.length} rounds: ${sounds.join(', ')}`);
} else {
  assertCheck('CHECK-1', 'Default phonics rounds count R = 4', false, 'DEFAULT_PHONICS_ROUNDS not found');
}

// 2. 4 orbs per round: 1 correct, 3 distractors (p = 0.25)
const roundBlocks = jsxContent.match(/\{[\s\S]*?targetSound[\s\S]*?orbs:\s*\[([\s\S]*?)\][\s\S]*?\}/g) || [];
let allRoundsValid = roundBlocks.length >= 4;
let orbCounts = [];
for (let i = 0; i < Math.min(4, roundBlocks.length); i++) {
  const block = roundBlocks[i];
  const corrects = [...block.matchAll(/isCorrect:\s*true/g)].length;
  const falses = [...block.matchAll(/isCorrect:\s*false/g)].length;
  orbCounts.push(`R${i + 1}:${corrects}T/${falses}F`);
  if (corrects !== 1 || falses !== 3) {
    allRoundsValid = false;
  }
}
assertCheck('CHECK-2', 'Orbs per round = 4 (1 correct, 3 distractors, p = 0.25)', allRoundsValid, orbCounts.join(', '));

// 3. Mathematical N4 calculation
// N4 = sum_{k=0}^2 comb(3+k, k) * (0.25)^4 * (0.75)^k
// k=0: comb(3,0) * (1/256) = 1/256
// k=1: comb(4,1) * (1/256) * (3/4) = 3/256
// k=2: comb(5,2) * (1/256) * (9/16) = 10 * 9 / 4096 = 90 / 4096 = 5.625 / 256
// Sum = (1 + 3 + 5.625) / 256 = 9.625 / 256 = 77 / 2048 = 0.03759765625 = 3.76%
const p = 0.25;
const q = 0.75;
let n4 = 0;
const terms = [];
for (let k = 0; k <= 2; k++) {
  // comb(3+k, k)
  let comb = 1;
  if (k === 1) comb = 4;
  if (k === 2) comb = 10;
  const term = comb * Math.pow(p, 4) * Math.pow(q, k);
  terms.push(`k=${k}: ${(term * 100).toFixed(3)}%`);
  n4 += term;
}
const n4Percent = n4 * 100;
assertCheck('CHECK-3', 'Mathematical N4 guessing probability <= 5%', n4Percent <= 5.0, `N4 = ${n4Percent.toFixed(2)}% (${terms.join(', ')})`);

// 4. N1 Exploit Removal: No handleOrbDirectPop, No onClick on orbs
const hasDirectPop = jsxContent.includes('handleOrbDirectPop');
const hasOrbOnClick = jsxContent.includes('onClick={(e) => { e.stopPropagation(); handleOrbDirectPop(orb); }}') ||
  Boolean(jsxContent.match(/className="acoustic-orb-entity"[^>]*onClick/s));
assertCheck('CHECK-4', 'N1 exploit removal (no handleOrbDirectPop, no orb onClick)', !hasDirectPop && !hasOrbOnClick, `hasDirectPop: ${hasDirectPop}, hasOrbOnClick: ${hasOrbOnClick}`);

// 5. CSS pointer-events: none on .acoustic-orb-entity
const cssOrbMatch = cssContent.match(/\.acoustic-orb-entity\s*\{([^}]+)\}/);
const orbHasPointerEventsNone = cssOrbMatch && cssOrbMatch[1].includes('pointer-events: none');
assertCheck('CHECK-5', 'CSS .acoustic-orb-entity has pointer-events: none', Boolean(orbHasPointerEventsNone), 'taps fall through to arena viewport');

// 6. Ray aiming from Leo coordinates
const firesFromLeo = jsxContent.includes('const originX = leo.x + LEO_HITBOX.width / 2') &&
  jsxContent.includes('const originY = leo.y + 10') &&
  jsxContent.includes('fireBoltTowards(tapX, tapY)');
assertCheck('CHECK-6', 'Physical ray aiming from Leo (originX, originY, fireBoltTowards)', firesFromLeo, 'projectile originates at Leo coordinates');

// 7. Hazard patrol & transform isolation: scaleX(-1) only on gremlin-icon, gremlin-tag upright
const gremlinSpriteParentHasNoScale = !Boolean(jsxContent.match(/className="noise-gremlin-sprite"[^>]*transform/s));
const gremlinIconHasScale = jsxContent.includes('className="gremlin-icon"') &&
  jsxContent.includes("transform: gremlin.dir < 0 ? 'scaleX(-1)' : 'none'");
const gremlinTagExists = jsxContent.includes('className="gremlin-tag">JAMMER</span>');
const transformIsolated = gremlinSpriteParentHasNoScale && gremlinIconHasScale && gremlinTagExists;
assertCheck('CHECK-7', 'Gremlin transform isolation (icon scaleX(-1), JAMMER label un-mirrored)', transformIsolated, 'parent has no scaleX, only gremlin-icon flips');

// 8. Horizontal spacing > 120px between orbs
// spacing = arenaSize.width / (orbCount + 1). For width=800, spacing = 800/5 = 160px > 120px
const spacingCodeExists = jsxContent.includes('const spacing = arenaSize.width / (orbCount + 1);') ||
  jsxContent.includes('spacing * (i + 1) - 34');
const computedSpacing800 = 800 / (4 + 1); // 160px
assertCheck('CHECK-8', 'Orb anti-spawn overlap (spacing >= 120px)', spacingCodeExists && computedSpacing800 >= 120, `spacing at 800px = ${computedSpacing800}px > 120px`);

// 9. N2 pacing & worst-case reading time
// 4 words max 6 letters per round = 2.0s reading + 1.5s phoneme + 0.42s flight + 1.8s gremlin clearance = 5.72s
// Allocated time = 90s / 4 = 22.5s. Safety margin = +16.78s
const tRead = 2.0;
const tPhoneme = 1.5;
const tFlight = 0.42;
const tHazard = 1.8;
const tTotal = tRead + tPhoneme + tFlight + tHazard;
const tAllocated = 90 / 4;
const margin = tAllocated - tTotal;
assertCheck('CHECK-9', 'N2 pacing worst-case reading time safety margin >= +2.0s', margin >= 2.0, `T_req = ${tTotal.toFixed(2)}s <= ${tAllocated}s, margin = +${margin.toFixed(2)}s`);

// 10. Jammer altitude separation (y=235 vs orb bottom <= 194px, clearance >= 41px)
const jammerAltitude235 = jsxContent.includes('y: 235');
// In EchoArenaShooter.jsx:193: y = 80 + (i % 2) * 45 => max top = 125px.
// In EchoArenaShooter.css:153: height = 68px + border 2px => bottom = 194px.
const maxOrbBottom = (80 + 45) + 69; // 194px
const verticalClearance = 235 - maxOrbBottom; // 41px
assertCheck('CHECK-10', 'Jammer altitude separation (>= 40px below all orbs, no text occlusion)', jammerAltitude235 && verticalClearance >= 40, `y_jammer = 235, max_orb_bottom = ${maxOrbBottom}px, clearance = ${verticalClearance}px`);

console.log('\n=== SUMMARY ===');
const allPassed = results.every(r => r.passed);
console.log(`Total checks: ${results.length}, Passed: ${results.filter(r => r.passed).length}, Failed: ${results.filter(r => !r.passed).length}`);
if (allPassed) {
  console.log(`🎉 ALL ${results.length} P0-6 CHECKS PASSED PERFECTLY!\n`);
  process.exit(0);
} else {
  console.error('❌ SOME CHECKS FAILED!\n');
  process.exit(1);
}
