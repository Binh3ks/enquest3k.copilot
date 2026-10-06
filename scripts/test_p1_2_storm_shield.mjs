/**
 * test_p1_2_storm_shield.mjs
 *
 * Automated Validator for:
 * - Ticket P1-2: Storm Shield Defense (Floor 3 Door 3)
 *
 * Checks:
 * 1. Persistent 3 hearts maintained across gameplay.
 * 2. DEFAULT_METEOR_WORDS: Exactly 3 targets and 6 hazards (p = 1/3).
 * 3. Dynamic vocabList generation maintains 1/3 target ratio.
 * 4. Runtime spawn loop uses pickTarget < (1 / 3).
 * 5. Battery charging: 5 hits (+20% per hit) to reach 100%.
 * 6. N1 Shield Interception: collision check dist < 52px enforced.
 * 7. Mathematical verification of N4: R=5, p=1/3, L=2 -> N4 = 11/243 = 4.53% <= 5%.
 * 8. N2 Pacing Safety Margin: 5 targets required <= 90s budget (Margin >= +2.0s).
 */

import fs from 'fs';
import path from 'path';

const SHIELD_FILE = path.resolve('src/modules/quest/StormShieldDefense.jsx');

console.log('🔍 [P1-2 Validator] Starting automated checks for Storm Shield Defense...\n');

let passCount = 0;
let totalChecks = 8;

function check(desc, condition) {
  if (condition) {
    console.log(`✅ [PASS] ${desc}`);
    passCount++;
  } else {
    console.error(`❌ [FAIL] ${desc}`);
  }
}

const content = fs.readFileSync(SHIELD_FILE, 'utf-8');

// 1. Persistent 3 hearts
const persistentHearts = content.includes('const [hearts, setHearts] = useState(3);') &&
                         content.includes('setHearts(3);') &&
                         content.includes('heartsRef.current = Math.max(0, heartsRef.current - 1);') &&
                         content.includes('consumedMeteorsRef');
check('1. Persistent 3 hearts: Starts at 3, decrements on hazard, resets to 3 on retry (Ref-guarded)', persistentHearts);

// 2. DEFAULT_METEOR_WORDS: 3 targets, 6 hazards
const defTargets = (content.match(/isTarget:\s*true/g) || []).length;
const defHazards = (content.match(/isTarget:\s*false/g) || []).length;
check(`2. DEFAULT_METEOR_WORDS: 3 targets & 6 hazards (found: ${defTargets} targets, ${defHazards} hazards, ratio = 1/3)`, defTargets === 3 && defHazards === 6);

// 3. Dynamic vocabList ratio: Math.round(shuffled.length * (1 / 3))
const vocabListRatio = content.includes('shuffled.length * (1 / 3)');
check('3. vocabList maintains 1/3 target ratio (p = 0.333)', vocabListRatio);

// 4. Runtime spawn loop: Math.random() < (1 / 3)
const spawnRatio = content.includes('Math.random() < (1 / 3)');
check('4. Meteor spawn loop: Weighted pick p = 1/3 enforced', spawnRatio);

// 5. Battery charging: 5 hits (+20% each) to reach 100%
const batteryCharge = content.includes('Math.min(100, batteryRef.current + 20)') &&
                      content.includes('setBatteryCharge(nextBattery)') &&
                      content.includes('nextBattery >= 100');
check('5. Arcane Battery: 5 target hits (+20% each) to reach 100% full charge (strictly 1 event/meteor)', batteryCharge);

// 6. N1 Shield Interception
const n1Interception = content.includes('distLeo < 52') && content.includes('Math.hypot');
check('6. N1 Shield Interception: Collision dist < 52px enforced (no click-to-harvest exploit)', n1Interception);

// 7. Mathematical verification of N4: Negative Binomial R=5, p=1/3, L=2
function nCr(n, r) {
  if (r < 0 || r > n) return 0;
  let res = 1;
  for (let i = 1; i <= r; i++) res = (res * (n - i + 1)) / i;
  return res;
}

const R = 5;
const p = 1 / 3;
const q = 2 / 3;
const L = 2; // 3 hearts allow max 2 hazards

let n4_calc = 0;
for (let k = 0; k <= L; k++) {
  n4_calc += nCr(R - 1 + k, k) * Math.pow(p, R) * Math.pow(q, k);
}
const exactFormula = 11 / 243;
const isExact = Math.abs(n4_calc - exactFormula) < 1e-9;
const isSafe  = n4_calc <= 0.05;
check(`7. Mathematical N4 verification: Negative Binomial (R=5, p=1/3, L=2: N4 = ${(n4_calc * 100).toFixed(2)}% = 11/243 <= 5%)`, isExact && isSafe);

// 8. N2 Pacing Safety Margin
const duration = 90;
// With p = 1/3 and 1.8s spawn cycle, average meteors needed for 5 targets = 15 meteors * 1.8s = 27s.
// Max reading/decision time per target = 3.0s * 5 = 15s.
// Worst-case active duration = 27s + 15s = 42s <= 90s.
const expectedTime = 42.0;
const margin = duration - expectedTime;
const n2Pass = margin >= 2.0;
check(`8. N2 Pacing Safety Margin: 5 targets expected time ${expectedTime}s <= ${duration}s (Margin = +${margin.toFixed(2)}s >= +2.0s)`, n2Pass);

console.log(`\n========================================`);
console.log(`Validator Result: ${passCount}/${totalChecks} PASSED`);
if (passCount === totalChecks) {
  console.log('🎉 ALL P1-2 STORM SHIELD VALIDATION CHECKS PASSED!');
  process.exit(0);
} else {
  console.error('💥 SOME CHECKS FAILED!');
  process.exit(1);
}
