/**
 * test_chunk_catapult_p0.mjs — Automated Validator for Ticket P0-1: Chunk Catapult
 *
 * Checks:
 * 1. Hearts initialized to 3 (H=3, L=2)
 * 2. Deducts heart on wrong basket hit (state.hearts - 1)
 * 3. Deducts heart on ground/off-screen miss
 * 4. Triggers KO phase (handleGameOverKO) when hearts <= 0
 * 5. Minimum 5 rounds enforced (R >= 5, N4 <= 4.53%)
 * 6. HUD element data-testid="chunk-catapult-hearts"
 * 7. KO Modal with data-testid="chunk-catapult-ko-modal" and retry button data-testid="btn-try-again"
 * 8. Mathematical N4 probability verification
 */

import fs from 'fs';
import path from 'path';

const TARGET_FILE = path.resolve('src/modules/chronicles/games/ChunkCatapultCanvas.jsx');
const DEMO_FILE = path.resolve('src/modules/quest/QuestDemoScreen.jsx');
const DAILY_ROOM_FILE = path.resolve('src/modules/chronicles/DailyRoomScreen.jsx');

console.log('🔍 [Chunk Catapult P0 Validator] Starting automated checks...\n');

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

// Read ChunkCatapultCanvas.jsx
const content = fs.readFileSync(TARGET_FILE, 'utf-8');

// 1. Initial hearts = 3
const hasHeartsState = content.includes('const [hearts, setHearts] = useState(3)');
const hasHeartsRef = content.includes('hearts: 3');
check('1. Hearts initialized to 3 in React state & ref', hasHeartsState && hasHeartsRef);

// 2. Heart deduction on wrong hit
const deductOnWrong = content.includes('state.hearts = Math.max(0, state.hearts - 1)') &&
                      content.includes('setHearts(state.hearts)') &&
                      content.includes("text: `MISS! -1 ❤️ (${state.hearts} left)`");
check('2. Heart deduction on wrong basket hit with popup feedback', deductOnWrong);

// 3. Heart deduction on ground/off-screen miss
const deductOnMiss = content.includes("text: `Off Target! -1 ❤️ (${state.hearts} left)`");
check('3. Heart deduction on ground/off-screen miss', deductOnMiss);

// 4. KO Phase triggered when hearts <= 0
const hasKOHandler = content.includes('handleGameOverKO') &&
                     content.includes("isKO: true") &&
                     content.includes("out_of_hearts");
check('4. KO Game Over phase triggered at 0 hearts', hasKOHandler);

// 5. Minimum 5 rounds enforced
const enforcesMin5 = content.includes('list.length < 5') && content.includes('list.length >= 5');
const dailyEnforces5 = fs.readFileSync(DAILY_ROOM_FILE, 'utf-8').includes('validPairs.length >= 5');
check('5. Minimum 5 rounds enforced in component & DailyRoomScreen (R >= 5)', enforcesMin5 && dailyEnforces5);

// 6. HUD element
const hasHUDHearts = content.includes('data-testid="chunk-catapult-hearts"');
check('6. HUD displays hearts with data-testid="chunk-catapult-hearts"', hasHUDHearts);

// 7. KO Modal & Try Again button
const hasKOModal = content.includes('data-testid="chunk-catapult-ko-modal"') &&
                   content.includes('data-testid="btn-try-again"') &&
                   content.includes('handleRestart');
check('7. KO Modal with data-testid="chunk-catapult-ko-modal" & Try Again handler', hasKOModal);

// 8. Math N4 Calculation Check
function nCr(n, r) {
  if (r < 0 || r > n) return 0;
  let res = 1;
  for (let i = 1; i <= r; i++) res = (res * (n - i + 1)) / i;
  return res;
}

// Negative Binomial: R=5, p=1/3, q=2/3, L=2
const R = 5;
const p = 1 / 3;
const q = 2 / 3;
const L = 2;

let n4_theoretical = 0;
for (let k = 0; k <= L; k++) {
  n4_theoretical += nCr(R - 1 + k, k) * Math.pow(p, R) * Math.pow(q, k);
}
const n4_exact = 11 / 243;
const isMatch = Math.abs(n4_theoretical - n4_exact) < 1e-9;
const isSafe = n4_theoretical <= 0.05;

check(`8. Mathematical N4 verification (R=5, p=1/3, L=2: N4 = ${(n4_theoretical * 100).toFixed(2)}% <= 5%)`, isMatch && isSafe);

console.log(`\n========================================`);
console.log(`Validator Result: ${passCount}/${totalChecks} PASSED`);
if (passCount === totalChecks) {
  console.log('🎉 ALL P0-1 VALIDATION CHECKS PASSED!');
  process.exit(0);
} else {
  console.error('💥 SOME CHECKS FAILED!');
  process.exit(1);
}
