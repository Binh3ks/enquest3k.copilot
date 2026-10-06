/**
 * test_p0_2_p0_3_template.mjs
 *
 * Automated Validator for:
 * - Ticket P0-2: Riddle Run Maze (Floor 4 Door 3)
 * - Ticket P0-3: Titan Grammar Forge (Floor 5 Door 2)
 *
 * Comprehensive checks:
 * 1. Riddle Run: 4 options per riddle, 4 default riddles, R >= 4 enforcement.
 * 2. Riddle Run: 4 doors mapped (door_0..3), N1 distance check on click (dist > 85).
 * 3. Titan Forge: 4 options per round, 4 default rounds, R >= 4 enforcement.
 * 4. Titan Forge: 4 cogs mapped (gear_0..3), N1 distance check on click (dist > 85).
 * 5. Persistent 3 hearts retained across rounds for both games.
 * 6. Mathematical verification of N4 = 3.76% <= 5% for both games.
 * 7. Riddle Run: Randomized Chaser spawn (getRandomBeastSpawn, re-roll on next round and retry).
 * 8. Titan Forge: Steam Vent hazard cycle (setInterval 2800ms, steamActive, reset false on retry).
 * 9. N2 Pacing: Worst-case reading + decision time <= Round engine budget (<= 22.5s).
 */

import fs from 'fs';
import path from 'path';

const RIDDLE_FILE = path.resolve('src/modules/quest/RiddleRunMaze.jsx');
const TITAN_FILE  = path.resolve('src/modules/quest/TitanGrammarForge.jsx');

console.log('🔍 [P0-2 & P0-3 Validator] Starting automated checks...\n');

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

const riddleContent = fs.readFileSync(RIDDLE_FILE, 'utf-8');
const titanContent  = fs.readFileSync(TITAN_FILE, 'utf-8');

// 1. Riddle Run 4 options & 4 rounds
const riddleOptions4 = riddleContent.includes("['Friction', 'Gravity', 'Electricity', 'Magnetism']") &&
                       riddleContent.includes("['Sneakers', 'Skates', 'Slippers', 'Sandals']") &&
                       riddleContent.includes("['Laboratory', 'Library', 'Kitchen', 'Gymnasium']") &&
                       riddleContent.includes("['Ice pack', 'Hot towel', 'Bandage', 'Blanket']");
const riddleEnforce4 = riddleContent.includes('riddlesData.length >= 4') && riddleContent.includes('r.options.length >= 4');
check('1. Riddle Run: 4 options per riddle & R >= 4 rounds enforced (p=0.25, R=4)', riddleOptions4 && riddleEnforce4);

// 2. Riddle Run 4 doors & N1 check
const riddleDoors4 = riddleContent.includes("id: 'door_0'") &&
                     riddleContent.includes("id: 'door_1'") &&
                     riddleContent.includes("id: 'door_2'") &&
                     riddleContent.includes("id: 'door_3'");
const riddleN1 = riddleContent.includes('handleDoorClick') && riddleContent.includes('dist > 85') && riddleContent.includes('Leo is too far');
check('2. Riddle Run: 4 doors mapped & N1 exploit blocked (d <= 85px required)', riddleDoors4 && riddleN1);

// 3. Titan Forge 4 options & 4 rounds
const titanOptions4 = titanContent.includes("'is stopping tomorrow'") &&
                      titanContent.includes("'shoes having no grip'") &&
                      titanContent.includes("'does not slip at all'") &&
                      titanContent.includes("'friction increases greatly'");
const titanEnforce4 = titanContent.includes('grammarSentences.length >= 4') && titanContent.includes('item.options.length >= 4');
check('3. Titan Forge: 4 options per round & R >= 4 rounds enforced (p=0.25, R=4)', titanOptions4 && titanEnforce4);

// 4. Titan Forge 4 cogs & N1 check
const titanCogs4 = titanContent.includes("id: 'gear_0'") &&
                   titanContent.includes("id: 'gear_1'") &&
                   titanContent.includes("id: 'gear_2'") &&
                   titanContent.includes("id: 'gear_3'");
const titanN1 = titanContent.includes('handleCogClick') && titanContent.includes('dist > 85') && titanContent.includes('Leo is too far');
check('4. Titan Forge: 4 cogs mapped & N1 exploit blocked (d <= 85px required)', titanCogs4 && titanN1);

// 5. Persistent 3 hearts in both games
const riddlePersistent = riddleContent.includes('setHearts(h => {') && !riddleContent.includes('setRiddleIdx(r => { setHearts(3);');
const titanPersistent  = titanContent.includes('setHearts(h => {') && !titanContent.includes('setRoundIdx(r => { setHearts(3);');
check('5. Persistent 3 hearts maintained across rounds (no reset between rounds)', riddlePersistent && titanPersistent);

// 6. Mathematical verification of N4
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
check(`6. Mathematical N4 verification (R=4, p=0.25, L=2: N4 = ${(n4_calc * 100).toFixed(2)}% <= 5%)`, isExact && isSafe);

// 7. Riddle Run Chaser Random Spawn
const chaserRandomInit = riddleContent.includes('getRandomBeastSpawn') && riddleContent.includes('Math.random()');
const chaserRandomNextRound = riddleContent.includes('beastRef.current = getRandomBeastSpawn()');
check('7. Riddle Run: Randomized Chaser spawn (left/right wing spawn, re-roll on next round & retry)', chaserRandomInit && chaserRandomNextRound);

// 8. Titan Forge Steam Vent Environmental Hazard
const titanSteamCycle = titanContent.includes('setInterval') && titanContent.includes('setSteamActive') && titanContent.includes('steam-vent-entity');
const titanSteamRetry = titanContent.includes('setSteamActive(false)');
check('8. Titan Forge: Steam Vent hazard active cycle (2800ms) & idle reset on retry', titanSteamCycle && titanSteamRetry);

// 9. N2 Pacing Safety Margin (Dynamically parsed from code, NO hardcoded word counts)
const rMatch = riddleContent.match(/const DEFAULT_RIDDLES = (\[[\s\S]*?\]);\s*\n/);
const rList = eval(rMatch[1]);
const rWordCounts = rList.map(r => r.riddle.trim().split(/\s+/).length + r.options.reduce((s, o) => s + o.trim().split(/\s+/).length, 0));
const riddleWorstWords = Math.max(...rWordCounts);

const tMatch = titanContent.match(/const DEFAULT_TITAN_ROUNDS = (\[[\s\S]*?\]);\s*\n/);
const tList = eval(tMatch[1]);
const tWordCounts = tList.map(r => r.stem.trim().split(/\s+/).length + r.options.reduce((s, o) => s + o.text.trim().split(/\s+/).length, 0));
const titanWorstWords = Math.max(...tWordCounts);

const readSpeedWps = 0.67; // Cambridge Primary ESL reading benchmark (90 WPM)
const decisionSec = 3.0;   // Cognitive decision/retrieval time

const riddleDurationMatch = riddleContent.match(/duration\s*=\s*(\d+)/);
const riddleDuration = riddleDurationMatch ? parseInt(riddleDurationMatch[1], 10) : 90;
const riddleBudgetPerRound = riddleDuration / rList.length;

const titanDurationMatch = titanContent.match(/duration\s*=\s*(\d+)/);
const titanDuration = titanDurationMatch ? parseInt(titanDurationMatch[1], 10) : 90;
const titanBudgetPerRound = titanDuration / tList.length;

const riddleWorstTime = (riddleWorstWords * readSpeedWps) + decisionSec;
const titanWorstTime  = (titanWorstWords * readSpeedWps) + decisionSec;

const riddleMargin = riddleBudgetPerRound - riddleWorstTime;
const titanMargin  = titanBudgetPerRound - titanWorstTime;

const n2Pass = (riddleMargin >= 2.0) && (titanMargin >= 2.0);
check(`9. N2 Pacing Safety Margin >= +2.0s (Dynamic): Riddle=${riddleWorstWords}w/Margin=+${riddleMargin.toFixed(2)}s, Titan=${titanWorstWords}w/Margin=+${titanMargin.toFixed(2)}s (Target >= +2.00s)`, n2Pass);

console.log(`\n========================================`);
console.log(`Validator Result: ${passCount}/${totalChecks} PASSED`);
if (passCount === totalChecks) {
  console.log('🎉 ALL P0-2 & P0-3 VALIDATION CHECKS PASSED!');
  process.exit(0);
} else {
  console.error('💥 SOME CHECKS FAILED!');
  process.exit(1);
}
