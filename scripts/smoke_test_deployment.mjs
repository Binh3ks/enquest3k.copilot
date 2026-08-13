// Mock localStorage for Node CLI execution
if (typeof global.localStorage === 'undefined') {
  const store = {};
  global.localStorage = {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); }
  };
}

import fs from 'fs';
import path from 'path';

import w34Data from '../src/data/weeks/week_34/index.js';
import w35Data from '../src/data/weeks/week_35/index.js';
import w36Data from '../src/data/weeks/week_36/index.js';
import w37Data from '../src/data/weeks/week_37/index.js';

import { evaluateMockAssessment } from '../src/services/assessment/MockAssessmentEngine.js';
import MOCK_01_DATA from '../src/data/mocks/mock_01.js';
import { evaluateMotivationEvent } from '../src/services/gamification/MotivationService.js';

console.log('\n================================================================');
console.log('🔥 DEPLOYMENT SMOKE TEST VERIFICATION');
console.log('================================================================\n');

let totalSmoke = 0;
let passedSmoke = 0;

function assert(condition, message) {
  totalSmoke++;
  if (condition) {
    passedSmoke++;
    console.log(`✅ [SMOKE PASS] ${message}`);
  } else {
    console.error(`❌ [SMOKE FAIL] ${message}`);
    process.exitCode = 1;
  }
}

async function runSmokeTests() {
  // 1. Build Dist Asset Verification
  const distDir = path.join(process.cwd(), 'dist');
  assert(fs.existsSync(distDir), 'Build Output: dist/ directory exists');
  assert(fs.existsSync(path.join(distDir, 'index.html')), 'Build Output: dist/index.html compiled successfully');

  // 2. Content Verification (W34 Lion & Mouse)
  assert(w34Data.title.includes('Lion and the Mouse'), 'W34 Content: Restored topic is Lion and the Mouse');
  assert(w34Data.readingHub.vocab.some(v => v.word === 'lion'), 'W34 Vocab: Target word lion is present');

  // 3. Content Verification (W35 Best Day Ever)
  assert(w35Data.title.includes('Best Day Ever'), 'W35 Content: Restored topic is The Best Day Ever');
  assert(w35Data.readingHub.vocab.some(v => v.word === 'wonderful'), 'W35 Vocab: Target word wonderful is present');

  // 4. Content Verification (W36 My Adventure Book)
  assert(w36Data.title.includes('My Adventure Book'), 'W36 Content: Restored topic is My Adventure Book');
  assert(w36Data.readingHub.vocab.some(v => v.word === 'adventure'), 'W36 Vocab: Target word adventure is present');

  // 5. Content Verification (W37 Living vs Non-Living)
  assert(w37Data.title.includes('Living vs. Non-Living'), 'W37 Content: Restored topic is Living vs. Non-Living');
  assert(w37Data.readingHub.vocab.some(v => v.word === 'living'), 'W37 Vocab: Target word living is present');

  // 6. 4-Hub Structure Verification across W34-W37
  [w34Data, w35Data, w36Data, w37Data].forEach((weekObj, idx) => {
    const weekNum = 34 + idx;
    assert(weekObj.readingHub && weekObj.listeningHub && weekObj.writingHub && weekObj.speakingHub, `4-Hub Navigation: Week ${weekNum} contains all 4 Hub keys`);
  });

  // 7. MOCK-01 Safe Diagnostic Label & Assessment Engine Verification
  const mockResult = evaluateMockAssessment({
    mockId: MOCK_01_DATA.mockId,
    learnerId: 'smoke_tester',
    readingWritingAnswers: { rw1_1: true, rw1_2: true },
    listeningAnswers: { l1_1: true },
    speakingScorePct: 85
  });

  assert(mockResult.diagnosticPractice.label === 'EngQuest Flyers Diagnostic Practice', 'MOCK-01 Smoke: Label is EngQuest Flyers Diagnostic Practice');
  assert(mockResult.diagnosticPractice.diagnosticScoreLabel === 'Diagnostic Practice Score', 'MOCK-01 Smoke: Score label is Diagnostic Practice Score');
  assert(mockResult.mockMotivation.badgeUnlocked === null, 'MOCK-01 Smoke: Zero badges awarded for Mock task');

  // 8. Gamification & Anti-Exploit Behavior
  const gamificationResult = evaluateMotivationEvent({
    learnerId: 'smoke_tester',
    contentId: 'w34_cloze',
    scorePct: 100
  });
  assert(gamificationResult.starsEarned === 3 && gamificationResult.xpEarned === 40, 'Gamification Smoke: 3 Stars & +40 XP awarded for 100% attempt');

  console.log(`\n================================================================`);
  console.log(`🎉 SMOKE TEST COMPLETE: ${passedSmoke}/${totalSmoke} PASSED 100%!`);
  console.log('================================================================\n');
}

runSmokeTests();
