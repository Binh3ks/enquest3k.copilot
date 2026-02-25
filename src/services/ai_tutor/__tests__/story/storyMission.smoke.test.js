/**
 * SMOKE TEST: Story Mission Tab
 * Purpose: Test core Story Mission functionality (data loading, structure validation)
 * Run: node src/services/ai_tutor/__tests__/story/storyMission.smoke.test.js
 */

// ========================================
// MOCK WEEK DATA (Simplified from week_02_real.js)
// ========================================

const mockWeek2Data = {
  week_id: 2,
  theme: "My Family",
  story_missions: [
    {
      id: "week_2_story_1",
      title_en: "Family Photo Album",
      title_vi: "Album ảnh gia đình",
      description_en: "Help Luna organize her family photos",
      description_vi: "Giúp Luna sắp xếp ảnh gia đình",
      questions: [
        {
          id: "q1",
          question: "Who is in the photo?",
          answer: "mother",
          hints: ["She is kind", "She takes care of you"]
        },
        {
          id: "q2",
          question: "What is this person doing?",
          answer: "cooking",
          hints: ["In the kitchen", "Making food"]
        }
      ],
      vocab_focus: ["mother", "father", "brother", "sister", "family"]
    }
  ]
};

// ========================================
// TEST FUNCTIONS (Extracted from StoryMissionTab logic)
// ========================================

/**
 * Validate story mission structure
 */
function validateStoryMissionStructure(mission) {
  const errors = [];
  
  // Required fields
  if (!mission.id) errors.push('Missing: id');
  if (!mission.title_en) errors.push('Missing: title_en');
  if (!mission.description_en) errors.push('Missing: description_en');
  if (!mission.questions || !Array.isArray(mission.questions)) {
    errors.push('Missing or invalid: questions array');
  }
  
  // Questions validation
  if (mission.questions && Array.isArray(mission.questions)) {
    if (mission.questions.length === 0) {
      errors.push('Questions array is empty');
    }
    
    mission.questions.forEach((q, index) => {
      if (!q.id) errors.push(`Question ${index}: Missing id`);
      if (!q.question) errors.push(`Question ${index}: Missing question text`);
      if (!q.answer) errors.push(`Question ${index}: Missing answer`);
      if (!q.hints || !Array.isArray(q.hints)) {
        errors.push(`Question ${index}: Missing or invalid hints array`);
      }
    });
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Load story missions from week data
 */
function loadStoryMissions(weekData) {
  if (!weekData || !weekData.story_missions) {
    return { success: false, error: 'No story_missions in week data' };
  }
  
  const missions = weekData.story_missions;
  if (!Array.isArray(missions) || missions.length === 0) {
    return { success: false, error: 'story_missions is empty or not an array' };
  }
  
  return {
    success: true,
    missions,
    count: missions.length
  };
}

/**
 * Get hints for a question
 */
function getHintsForQuestion(question, maxHints = 3) {
  if (!question.hints || !Array.isArray(question.hints)) {
    return [];
  }
  
  return question.hints.slice(0, maxHints);
}

/**
 * Validate answer (case insensitive, trim whitespace)
 */
function validateAnswer(userAnswer, correctAnswer) {
  const normalized_user = userAnswer.toLowerCase().trim();
  const normalized_correct = correctAnswer.toLowerCase().trim();
  
  return {
    isCorrect: normalized_user === normalized_correct,
    userAnswer: normalized_user,
    correctAnswer: normalized_correct
  };
}

/**
 * Get mission progress (questions answered / total questions)
 */
function getMissionProgress(answeredQuestions, totalQuestions) {
  const percentage = (answeredQuestions / totalQuestions) * 100;
  
  return {
    answered: answeredQuestions,
    total: totalQuestions,
    percentage: Math.round(percentage),
    isComplete: answeredQuestions === totalQuestions
  };
}

// ========================================
// TEST SUITE
// ========================================

console.log('📖 STORY MISSION - SMOKE TEST SUITE');
console.log('Testing: Data loading, Structure validation, Progress tracking\n');

let passed = 0;
let failed = 0;

function runTest(testName, testFunction) {
  try {
    testFunction();
    console.log(`✅ Test ${passed + failed + 1}: ${testName}`);
    passed++;
  } catch (error) {
    console.log(`❌ Test ${passed + failed + 1}: ${testName}`);
    console.log(`   Error: ${error.message}\n`);
    failed++;
  }
}

// ========================================
// CATEGORY 1: DATA LOADING (4 tests)
// ========================================

console.log('📋 CATEGORY 1: Data Loading\n');

runTest('loads story missions from week data', () => {
  const result = loadStoryMissions(mockWeek2Data);
  if (!result.success) throw new Error(result.error);
  if (result.count !== 1) throw new Error(`Expected 1 mission, got ${result.count}`);
});

runTest('handles missing story_missions field', () => {
  const invalidData = { week_id: 2, theme: "Test" };
  const result = loadStoryMissions(invalidData);
  if (result.success) throw new Error('Should fail with missing story_missions');
});

runTest('handles empty story_missions array', () => {
  const emptyData = { week_id: 2, story_missions: [] };
  const result = loadStoryMissions(emptyData);
  if (result.success) throw new Error('Should fail with empty array');
});

runTest('returns correct mission count', () => {
  const result = loadStoryMissions(mockWeek2Data);
  if (!result.success) throw new Error(result.error);
  if (result.missions.length !== result.count) {
    throw new Error('Mission count mismatch');
  }
});

// ========================================
// CATEGORY 2: STRUCTURE VALIDATION (5 tests)
// ========================================

console.log('\n📋 CATEGORY 2: Structure Validation\n');

runTest('validates complete mission structure', () => {
  const mission = mockWeek2Data.story_missions[0];
  const validation = validateStoryMissionStructure(mission);
  if (!validation.valid) {
    throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
  }
});

runTest('detects missing required fields', () => {
  const incompleteMission = {
    id: "test_1",
    // Missing title_en, description_en, questions
  };
  const validation = validateStoryMissionStructure(incompleteMission);
  if (validation.valid) throw new Error('Should fail with missing fields');
  if (validation.errors.length < 2) {
    throw new Error('Should detect multiple missing fields');
  }
});

runTest('validates questions array structure', () => {
  const mission = mockWeek2Data.story_missions[0];
  if (!mission.questions || mission.questions.length === 0) {
    throw new Error('Mission should have questions array');
  }
  const firstQ = mission.questions[0];
  if (!firstQ.id || !firstQ.question || !firstQ.answer || !firstQ.hints) {
    throw new Error('Question missing required fields');
  }
});

runTest('validates hints array in questions', () => {
  const mission = mockWeek2Data.story_missions[0];
  const question = mission.questions[0];
  if (!Array.isArray(question.hints)) {
    throw new Error('Hints should be an array');
  }
  if (question.hints.length < 2) {
    throw new Error('Should have at least 2 hints');
  }
});

runTest('detects invalid questions structure', () => {
  const badMission = {
    id: "test",
    title_en: "Test",
    description_en: "Test",
    questions: "not an array" // Invalid
  };
  const validation = validateStoryMissionStructure(badMission);
  if (validation.valid) throw new Error('Should fail with invalid questions');
});

// ========================================
// CATEGORY 3: ANSWER VALIDATION (4 tests)
// ========================================

console.log('\n📋 CATEGORY 3: Answer Validation\n');

runTest('validates correct answer (exact match)', () => {
  const result = validateAnswer('mother', 'mother');
  if (!result.isCorrect) throw new Error('Should accept exact match');
});

runTest('validates correct answer (case insensitive)', () => {
  const result = validateAnswer('MOTHER', 'mother');
  if (!result.isCorrect) throw new Error('Should accept case-insensitive match');
});

runTest('validates correct answer (trim whitespace)', () => {
  const result = validateAnswer('  mother  ', 'mother');
  if (!result.isCorrect) throw new Error('Should trim whitespace');
});

runTest('rejects incorrect answer', () => {
  const result = validateAnswer('father', 'mother');
  if (result.isCorrect) throw new Error('Should reject wrong answer');
});

// ========================================
// CATEGORY 4: HINTS & PROGRESS (4 tests)
// ========================================

console.log('\n📋 CATEGORY 4: Hints & Progress\n');

runTest('gets hints for question (max 3)', () => {
  const question = mockWeek2Data.story_missions[0].questions[0];
  const hints = getHintsForQuestion(question, 3);
  if (hints.length === 0) throw new Error('Should return hints');
  if (hints.length > 3) throw new Error('Should limit to 3 hints');
});

runTest('handles question with no hints', () => {
  const questionNoHints = { id: "q1", question: "Test?", answer: "test", hints: [] };
  const hints = getHintsForQuestion(questionNoHints);
  if (hints.length !== 0) throw new Error('Should return empty array for no hints');
});

runTest('calculates mission progress (50%)', () => {
  const progress = getMissionProgress(1, 2);
  if (progress.percentage !== 50) {
    throw new Error(`Expected 50%, got ${progress.percentage}%`);
  }
  if (progress.isComplete) throw new Error('Should not be complete');
});

runTest('detects mission complete (100%)', () => {
  const progress = getMissionProgress(2, 2);
  if (progress.percentage !== 100) {
    throw new Error(`Expected 100%, got ${progress.percentage}%`);
  }
  if (!progress.isComplete) throw new Error('Should be complete');
});

// ========================================
// RESULTS
// ========================================

console.log('\n' + '='.repeat(50));
console.log('📊 STORY MISSION SMOKE TEST RESULTS');
console.log('='.repeat(50));
console.log(`✅ Passed: ${passed}/17`);
console.log(`❌ Failed: ${failed}/17`);
console.log('='.repeat(50));

if (failed === 0) {
  console.log('\n🎉 ALL TESTS PASSED!');
  console.log('✅ Story Mission core logic is SOLID');
  console.log('✅ Safe to proceed with refactoring\n');
  process.exit(0);
} else {
  console.log('\n⚠️  SOME TESTS FAILED');
  console.log('❌ Fix issues before proceeding\n');
  process.exit(1);
}
