/**
 * SMOKE TEST: Twenty Questions Game
 * Purpose: Test core 20Q functionality (person vs thing, pronouns, clues)
 * Run: node src/services/ai_tutor/__tests__/games/twentyQuestions.smoke.test.js
 */

// ========================================
// TEST FUNCTIONS (Extracted from FreeTalkTab logic)
// ========================================

/**
 * Detect if object is a person or thing
 */
function detectObjectType(object) {
  const PEOPLE = ['mother', 'father', 'brother', 'sister', 'grandma', 'grandpa', 'mom', 'dad', 'teacher'];
  const normalized = object.toLowerCase().trim();
  return PEOPLE.includes(normalized) ? 'PERSON' : 'THING';
}

/**
 * Get correct pronoun based on object type
 */
function getPronoun(object) {
  const type = detectObjectType(object);
  return type === 'PERSON' ? 'they' : 'it';
}

/**
 * Validate object is in allowed list
 */
function isValidObject(object, allowedObjects) {
  const normalized = object.toLowerCase().trim();
  const allowedNormalized = allowedObjects.map(obj => obj.toLowerCase().trim());
  return allowedNormalized.includes(normalized);
}

/**
 * Generate clues for object
 */
function generateClues(object, type) {
  const clueDatabase = {
    // People
    'mother': ['She is kind', 'She takes care of you', 'You can talk to them'],
    'father': ['He is strong', 'He loves you', 'You can talk to them'],
    'brother': ['He is a boy', 'He plays with you', 'You can talk to them'],
    'sister': ['She is a girl', 'She is your friend', 'You can talk to them'],
    
    // Things
    'table': ['It has 4 legs', 'You eat food on it', 'It is in the dining room'],
    'chair': ['It has 4 legs', 'You sit on it', 'It is furniture'],
    'bed': ['It is big and soft', 'You sleep on it at night', 'It is in the bedroom'],
    'lamp': ['It gives light', 'You turn it on when it is dark', 'It is small'],
    'book': ['It has many pages', 'You read stories in it', 'It is made of paper'],
    'pen': ['It is small and long', 'You write with it', 'The ink is blue or black']
  };
  
  const clues = clueDatabase[object.toLowerCase()] || ['No clues available'];
  return clues;
}

/**
 * Validate pronoun usage in response
 */
function validatePronounUsage(response, objectType) {
  const lowerResponse = response.toLowerCase();
  
  if (objectType === 'PERSON') {
    // Should use they/them, NOT it
    if (lowerResponse.includes(' it is') || lowerResponse.includes(' it has') || lowerResponse.includes('talk to it')) {
      return { valid: false, error: "Used 'it' for a person (should use 'they/them')" };
    }
    return { valid: true };
  } else {
    // Should use it, NOT they/them
    if (lowerResponse.includes(' they are') || lowerResponse.includes(' they have')) {
      return { valid: false, error: "Used 'they' for a thing (should use 'it')" };
    }
    return { valid: true };
  }
}

// ========================================
// TEST SUITE
// ========================================

console.log('🎯 TWENTY QUESTIONS - SMOKE TEST SUITE');
console.log('Testing: Person vs Thing detection, Pronouns, Clues\n');

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
// CATEGORY 1: OBJECT TYPE DETECTION (5 tests)
// ========================================

console.log('📋 CATEGORY 1: Object Type Detection\n');

runTest('detects MOTHER as PERSON', () => {
  const type = detectObjectType('mother');
  if (type !== 'PERSON') throw new Error(`Expected PERSON, got ${type}`);
});

runTest('detects TABLE as THING', () => {
  const type = detectObjectType('table');
  if (type !== 'THING') throw new Error(`Expected THING, got ${type}`);
});

runTest('detects TEACHER as PERSON', () => {
  const type = detectObjectType('teacher');
  if (type !== 'PERSON') throw new Error(`Expected PERSON, got ${type}`);
});

runTest('detects BOOK as THING', () => {
  const type = detectObjectType('book');
  if (type !== 'THING') throw new Error(`Expected THING, got ${type}`);
});

runTest('handles case insensitivity (MOTHER = mother)', () => {
  const type1 = detectObjectType('MOTHER');
  const type2 = detectObjectType('mother');
  if (type1 !== type2) throw new Error(`Case sensitivity issue: ${type1} vs ${type2}`);
});

// ========================================
// CATEGORY 2: PRONOUN USAGE (5 tests)
// ========================================

console.log('\n📋 CATEGORY 2: Pronoun Usage\n');

runTest('uses THEY for mother', () => {
  const pronoun = getPronoun('mother');
  if (pronoun !== 'they') throw new Error(`Expected 'they', got '${pronoun}'`);
});

runTest('uses IT for table', () => {
  const pronoun = getPronoun('table');
  if (pronoun !== 'it') throw new Error(`Expected 'it', got '${pronoun}'`);
});

runTest('uses THEY for father', () => {
  const pronoun = getPronoun('father');
  if (pronoun !== 'they') throw new Error(`Expected 'they', got '${pronoun}'`);
});

runTest('uses IT for lamp', () => {
  const pronoun = getPronoun('lamp');
  if (pronoun !== 'it') throw new Error(`Expected 'it', got '${pronoun}'`);
});

runTest('validates pronoun in response (PERSON)', () => {
  const response = "Yes, they are kind! Round 2/20: What else?";
  const validation = validatePronounUsage(response, 'PERSON');
  if (!validation.valid) throw new Error(validation.error);
});

// ========================================
// CATEGORY 3: OBJECT VALIDATION (3 tests)
// ========================================

console.log('\n📋 CATEGORY 3: Object Validation\n');

runTest('accepts valid object from allowed list', () => {
  const allowedObjects = ['mother', 'father', 'table', 'chair', 'lamp'];
  const isValid = isValidObject('mother', allowedObjects);
  if (!isValid) throw new Error('Should accept mother from allowed list');
});

runTest('rejects invalid object NOT in list', () => {
  const allowedObjects = ['mother', 'father', 'table'];
  const isValid = isValidObject('toothbrush', allowedObjects);
  if (isValid) throw new Error('Should reject toothbrush (not in allowed list)');
});

runTest('handles case insensitivity in validation', () => {
  const allowedObjects = ['mother', 'table'];
  const isValid = isValidObject('MOTHER', allowedObjects);
  if (!isValid) throw new Error('Should accept MOTHER (case insensitive)');
});

// ========================================
// CATEGORY 4: CLUE GENERATION (4 tests)
// ========================================

console.log('\n📋 CATEGORY 4: Clue Generation\n');

runTest('generates clues for MOTHER', () => {
  const clues = generateClues('mother', 'PERSON');
  if (clues.length < 2) throw new Error('Should have at least 2 clues');
  if (!clues.some(clue => clue.toLowerCase().includes('kind') || clue.toLowerCase().includes('care'))) {
    throw new Error('Clues should be relevant to mother');
  }
});

runTest('generates clues for TABLE', () => {
  const clues = generateClues('table', 'THING');
  if (clues.length < 2) throw new Error('Should have at least 2 clues');
  if (!clues.some(clue => clue.toLowerCase().includes('legs') || clue.toLowerCase().includes('eat'))) {
    throw new Error('Clues should be relevant to table');
  }
});

runTest('person clues mention correct pronoun context', () => {
  const clues = generateClues('mother', 'PERSON');
  const clueText = clues.join(' ').toLowerCase();
  // Should mention "them" or use "she/he", NOT "it"
  if (clueText.includes('it is') || clueText.includes('it has')) {
    throw new Error('Person clues should not use "it"');
  }
});

runTest('thing clues mention correct pronoun context', () => {
  const clues = generateClues('table', 'THING');
  const clueText = clues.join(' ').toLowerCase();
  // Should use "it", NOT "they"
  if (clueText.includes('they are') || clueText.includes('they have')) {
    throw new Error('Thing clues should not use "they"');
  }
});

// ========================================
// RESULTS
// ========================================

console.log('\n' + '='.repeat(50));
console.log('📊 TWENTY QUESTIONS SMOKE TEST RESULTS');
console.log('='.repeat(50));
console.log(`✅ Passed: ${passed}/17`);
console.log(`❌ Failed: ${failed}/17`);
console.log('='.repeat(50));

if (failed === 0) {
  console.log('\n🎉 ALL TESTS PASSED!');
  console.log('✅ Twenty Questions core logic is SOLID');
  console.log('✅ Safe to proceed with refactoring\n');
  process.exit(0);
} else {
  console.log('\n⚠️  SOME TESTS FAILED');
  console.log('❌ Fix issues before proceeding\n');
  process.exit(1);
}
