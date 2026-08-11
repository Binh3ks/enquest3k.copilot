import { evaluateBarModelAnswer } from '../src/utils/barModelEvaluator.js';

let testsRun = 0;
let testsPassed = 0;

function assert(condition, message) {
  testsRun++;
  if (condition) {
    testsPassed++;
    console.log(`✅ [PASS] ${message}`);
  } else {
    console.error(`❌ [FAIL] ${message}`);
  }
}

// ---------------------------------------------------------
// 2. ENHANCED FLASH ARENA SCORING & RACE CONDITION LOGIC
// ---------------------------------------------------------
export function evaluateFlashPairMatch(selectedEnId, selectedViId, currentScore, currentMatchedIds, totalPairsCount, timeLeft) {
  // RACE CONDITION GUARD: If timer already reached 0s, ignore click & return game over
  if (timeLeft <= 0) {
    return {
      isMatch: false,
      newScore: currentScore,
      newMatchedIds: currentMatchedIds,
      isGameOver: true,
      raceConditionBlocked: true
    };
  }

  if (!selectedEnId || !selectedViId) {
    return { isMatch: false, newScore: currentScore, newMatchedIds: currentMatchedIds, isGameOver: false, raceConditionBlocked: false };
  }

  const isMatch = selectedEnId === selectedViId;
  const newScore = isMatch ? currentScore + 20 : currentScore;
  const newMatchedIds = isMatch ? [...currentMatchedIds, selectedEnId] : currentMatchedIds;
  const isGameOver = newMatchedIds.length === totalPairsCount;

  return {
    isMatch,
    newScore,
    newMatchedIds,
    isGameOver,
    raceConditionBlocked: false
  };
}

console.log('--- RUNNING COMPREHENSIVE UNIT TESTS FOR STATION 2 MINI-GAMES ---');

// Bar Model Standard & Edge Test Cases
console.log('\n[Group 1: Singapore Bar Model Quest Scoring & Edge Cases]');
const bm1 = evaluateBarModelAnswer('100', 100);
assert(bm1.isCorrect && bm1.score === 100, 'BM-TC1: Exact correct numeric string "100" (Score 100%)');

const bm2 = evaluateBarModelAnswer('95', 100);
assert(!bm2.isCorrect && bm2.score === 0, 'BM-TC2: Incorrect numeric answer "95" (Score 0%)');

const bm3 = evaluateBarModelAnswer('  100  ', 100);
assert(bm3.isCorrect && bm3.score === 100, 'BM-TC3: Extra whitespace trimming "  100  " (Score 100%)');

const bm4 = evaluateBarModelAnswer('10.5', 100);
assert(!bm4.isCorrect && bm4.errorMsg.includes('thập phân'), 'BM-TC4 Edge: Decimal "10.5" rejected with clear message');

const bm5 = evaluateBarModelAnswer('-5', 100);
assert(!bm5.isCorrect && bm5.errorMsg.includes('số âm'), 'BM-TC5 Edge: Negative "-5" rejected with clear message');

const bm6 = evaluateBarModelAnswer('100kg', 100);
assert(bm6.isCorrect && bm6.score === 100, 'BM-TC6 Edge: Mixed unit "100kg" parsed correctly to 100');

const bm7 = evaluateBarModelAnswer('100 kg', 100);
assert(bm7.isCorrect && bm7.score === 100, 'BM-TC7 Edge: Mixed unit with space "100 kg" parsed correctly to 100');

const bm8 = evaluateBarModelAnswer('100 viên', 100);
assert(bm8.isCorrect && bm8.score === 100, 'BM-TC8 Edge: Mixed unit Vietnamese "100 viên" parsed correctly to 100');

const bm9 = evaluateBarModelAnswer('abc', 100);
assert(!bm9.isCorrect && bm9.errorMsg.includes('hợp lệ'), 'BM-TC9 (Legacy BM-TC4): Non-numeric string "abc" gracefully caught');

const bm10 = evaluateBarModelAnswer('', 100);
assert(!bm10.isCorrect && bm10.score === 0, 'BM-TC10 (Legacy BM-TC5): Empty input string handling');

// Flash Arena Test Cases & Race Condition
console.log('\n[Group 2: Flash Arena Speed Battle Scoring & Race Conditions]');
const fa1 = evaluateFlashPairMatch('v1', 'v1', 0, [], 5, 25);
assert(fa1.isMatch && fa1.newScore === 20 && fa1.newMatchedIds.includes('v1'), 'FA-TC1: Correct pair match (+20 points)');

const fa2 = evaluateFlashPairMatch('v1', 'v2', 20, ['v1'], 5, 20);
assert(!fa2.isMatch && fa2.newScore === 20, 'FA-TC2: Mismatched pair does not add score');

const fa3 = evaluateFlashPairMatch('v5', 'v5', 80, ['v1', 'v2', 'v3', 'v4'], 5, 10);
assert(fa3.isMatch && fa3.newScore === 100 && fa3.isGameOver === true, 'FA-TC3: All 5 pairs matched triggers GameOver');

const faRace = evaluateFlashPairMatch('v5', 'v5', 80, ['v1', 'v2', 'v3', 'v4'], 5, 0);
assert(faRace.raceConditionBlocked === true && faRace.isGameOver === true && faRace.newScore === 80, 'FA-TC4 Race Condition: Tap at exact 0s is blocked, prevents double logging');

console.log(`\nTEST SUMMARY: ${testsPassed}/${testsRun} tests passed.`);
if (testsPassed !== testsRun) {
  process.exit(1);
}
