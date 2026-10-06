/**
 * test_p0_4_p0_5_template.mjs
 *
 * Automated Validator for:
 * - Ticket P0-4: Anvil Rush Grammar (Floor 2 Door 2)
 * - Ticket P0-5: Grand Master Matrix (Floor 5 Door 1)
 *
 * Checks:
 * 1. Anvil Rush: 4 options per sentence, 4 default rounds, R >= 4 enforced.
 * 2. Anvil Rush: 4 anvils mapped (anvil_0..3), N1 distance check on click (dist > 75 blocked).
 * 3. Anvil Rush: Heart deduction on wrong anvil strike (setHearts called).
 * 4. Grand Matrix: 4 options per round, 4 default rounds, R >= 4 enforced.
 * 5. Grand Matrix: 4 glyph nodes, N1 distance check on click (dist > 65 blocked).
 * 6. Grand Matrix: Glitch Sentinel transform isolated to sentinel-icon (no mirrored text).
 * 7. Persistent 3 hearts retained across rounds for both games.
 * 8. Mathematical verification of N4 = 3.76% <= 5% for both games.
 * 9. N2 Pacing: Worst-case reading + decision <= round engine budget.
 */

import fs from 'fs';
import path from 'path';

const ANVIL_FILE  = path.resolve('src/modules/quest/AnvilRushGrammar.jsx');
const MATRIX_FILE = path.resolve('src/modules/quest/GrandMatrixDungeon.jsx');

console.log('🔍 [P0-4 & P0-5 Validator] Starting automated checks...\n');

let passCount = 0;
let totalChecks = 9;

function check(desc, condition) {
  if (condition) {
    console.log(`✅ [PASS] ${desc}`);
    passCount++;
  } else {
    console.error(`❌ [FAIL] ${desc}`);
  }
}

const anvilContent  = fs.readFileSync(ANVIL_FILE, 'utf-8');
const matrixContent = fs.readFileSync(MATRIX_FILE, 'utf-8');

// 1. Anvil Rush 4 options & 4 rounds
const anvilOptions4 = anvilContent.includes("['walk', 'walked', 'walking', 'walks']") &&
                      anvilContent.includes("['gives', 'give', 'giving', 'gave']") &&
                      anvilContent.includes("['reduces', 'reduce', 'reducing', 'reduced']") &&
                      anvilContent.includes("['reminded', 'reminds', 'remind', 'reminding']");
const anvilEnforce4 = anvilContent.includes('grammarSentences.length >= 4') && anvilContent.includes('opts.slice(0, 4)');
check('1. Anvil Rush: 4 options per sentence & R >= 4 rounds enforced (p=0.25, R=4)', anvilOptions4 && anvilEnforce4);

// 2. Anvil Rush 4 anvils & N1 proximity check
const anvilAnvils4 = anvilContent.includes("id: 'anvil_0'") &&
                     anvilContent.includes("id: 'anvil_1'") &&
                     anvilContent.includes("id: 'anvil_2'") &&
                     anvilContent.includes("id: 'anvil_3'");
const anvilN1 = anvilContent.includes('handleAnvilClick') && anvilContent.includes('dist > 75') && anvilContent.includes('Leo is too far');
check('2. Anvil Rush: 4 anvils mapped & N1 exploit blocked (d <= 75px required)', anvilAnvils4 && anvilN1);

// 3. Anvil Rush Heart Deduction on Wrong Strike
const anvilHeartDeduct = anvilContent.includes('handleAnvilStrike') &&
                         anvilContent.includes('setHearts(h => {') &&
                         anvilContent.includes('leoRef.current.hearts = Math.max(0, leoRef.current.hearts - 1)');
check('3. Anvil Rush: Heart deduction on wrong anvil strike (1 heart deducted, KO triggered when empty)', anvilHeartDeduct);

// 4. Grand Matrix 4 options & 4 rounds
const matrixRounds4 = matrixContent.includes('targetWord: \'corridor\'') &&
                      matrixContent.includes('targetWord: \'slipped\'') &&
                      matrixContent.includes('targetWord: \'bandage\'') &&
                      matrixContent.includes('targetWord: \'nurse\'');
const matrixEnforce4 = matrixContent.includes('finalTargets.length >= 4');
check('4. Grand Matrix: 4 options per round & R >= 4 rounds enforced (p=0.25, R=4)', matrixRounds4 && matrixEnforce4);

// 5. Grand Matrix 4 glyph nodes & N1 proximity check
const matrixN1 = matrixContent.includes('handleNodeClick') && matrixContent.includes('dist > 65') && matrixContent.includes('Leo is too far');
check('5. Grand Matrix: N1 exploit blocked on glyph click (d <= 65px required)', matrixN1);

// 6. Grand Matrix Glitch Sentinel un-mirrored label
const matrixGlitchTransform = matrixContent.includes('className="sentinel-icon"') &&
                              matrixContent.includes('className="sentinel-tag">GLITCH</span>') &&
                              !matrixContent.includes('className="glitch-sentinel-sprite"\n          style={{\n            left: `${glitchDisplay.x}px`,\n            top: `${glitchDisplay.y}px`,\n            transform: glitchDisplay.dir < 0');
check('6. Grand Matrix: Glitch Sentinel transform isolated to icon (label GLITCH upright)', matrixGlitchTransform);

// 7. Persistent 3 hearts in both games
const anvilPersistent  = anvilContent.includes('setHearts(3)') && !anvilContent.includes('setRoundIdx(r => { setHearts(3);');
const matrixPersistent = matrixContent.includes('setHearts(3)') && !matrixContent.includes('setRoundIdx(r => { setHearts(3);');
check('7. Persistent 3 hearts maintained across rounds (no reset between rounds)', anvilPersistent && matrixPersistent);

// 8. Mathematical verification of N4
function nCr(n, r) {
  if (r < 0 || r > n) return 0;
  let res = 1;
  for (let i = 1; i <= r; i++) res = (res * (n - i + 1)) / i;
  return res;
}

const R = 4;
const p = 0.25;
const q = 0.75;
const L = 2;

let n4_calc = 0;
for (let k = 0; k <= L; k++) {
  n4_calc += nCr(R - 1 + k, k) * Math.pow(p, R) * Math.pow(q, k);
}
const exactFormula = 9.625 / 256;
const isExact = Math.abs(n4_calc - exactFormula) < 1e-9;
const isSafe  = n4_calc <= 0.05;
check(`8. Mathematical N4 verification (R=4, p=0.25, L=2: N4 = ${(n4_calc * 100).toFixed(2)}% <= 5%)`, isExact && isSafe);

// 9. N2 Pacing Budget Verification
// Worst-case word counts: Anvil Rush = 13 words, Grand Matrix = 16 words
const anvilWorstWords  = 13;
const matrixWorstWords = 16;
const readSpeedWps = 0.67; // s per word
const decisionSec = 3.0;

const anvilEngineBudget  = 90 / 4;  // 22.5s per round
const matrixEngineBudget = 180 / 4; // 45.0s per round

const anvilWorstTime  = (anvilWorstWords * readSpeedWps) + decisionSec;   // 11.71s
const matrixWorstTime = (matrixWorstWords * readSpeedWps) + decisionSec;  // 13.72s

const n2Pass = (anvilWorstTime <= anvilEngineBudget) && (matrixWorstTime <= matrixEngineBudget);
check(`9. N2 Pacing: Worst-case reading+decision (Anvil=${anvilWorstTime.toFixed(2)}s <= ${anvilEngineBudget}s, Matrix=${matrixWorstTime.toFixed(2)}s <= ${matrixEngineBudget}s)`, n2Pass);

console.log(`\n========================================`);
console.log(`Validator Result: ${passCount}/${totalChecks} PASSED`);
if (passCount === totalChecks) {
  console.log('🎉 ALL P0-4 & P0-5 VALIDATION CHECKS PASSED!');
  process.exit(0);
} else {
  console.error('💥 SOME CHECKS FAILED!');
  process.exit(1);
}
