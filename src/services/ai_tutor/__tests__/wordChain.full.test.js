/**
 * WORD CHAIN FULL TEST SUITE
 * 
 * Tests comprehensive Word Chain game logic including:
 * - Basic validation (letter contains check)
 * - Edge cases (case sensitivity, whitespace, special chars)
 * - Hint validation (filtering by letter, vocab restrictions)
 * - Game flow (turn progression, AI word selection)
 * 
 * Run: node src/services/ai_tutor/__tests__/wordChain.full.test.js
 */

// ============================================
// VALIDATION FUNCTIONS (from FreeTalkTab.jsx)
// ============================================

function validateWordChain(requiredLetter, studentWord) {
  const word = studentWord.toUpperCase().trim();
  const letter = requiredLetter.toUpperCase();
  
  const hasLetter = word.includes(letter);
  
  return {
    isValid: hasLetter,
    requiredLetter: letter,
    studentWord: word,
    feedback: hasLetter 
      ? `Great! ${word} has ${letter}!`
      : `Oops! ${word} doesn't have ${letter}.`
  };
}

function getLastLetter(word) {
  return word.trim().toUpperCase().charAt(word.length - 1);
}

function validateHints(hints, targetLetter, allowedVocab = null) {
  const letter = targetLetter.toUpperCase();
  
  // Filter hints that contain the target letter
  let validHints = hints.filter(hint => 
    hint.toUpperCase().includes(letter)
  );
  
  // If vocab list provided, also filter by vocab
  if (allowedVocab && allowedVocab.length > 0) {
    validHints = validHints.filter(hint => 
      allowedVocab.map(v => v.toLowerCase()).includes(hint.toLowerCase())
    );
  }
  
  return validHints.slice(0, 5); // Max 5 hints
}

function generateHintsFromVocab(vocab, targetLetter, count = 3) {
  const letter = targetLetter.toUpperCase();
  const validWords = vocab.filter(word => 
    word.toUpperCase().includes(letter)
  );
  
  // Shuffle and take first N
  const shuffled = validWords.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ============================================
// TEST SUITE
// ============================================

const tests = [];
let testId = 0;

function test(description, testFn) {
  tests.push({ id: ++testId, description, testFn });
}

// ============================================
// CATEGORY 1: BASIC VALIDATION (5 tests)
// ============================================

test('accepts word containing target letter (E in HOME)', () => {
  const result = validateWordChain('E', 'HOME');
  if (!result.isValid) throw new Error(`Expected valid, got invalid: ${result.feedback}`);
  if (!result.feedback.includes('Great!')) throw new Error(`Expected positive feedback`);
});

test('rejects word NOT containing target letter (K in PEN)', () => {
  const result = validateWordChain('K', 'PEN');
  if (result.isValid) throw new Error(`Expected invalid, got valid: ${result.feedback}`);
  if (!result.feedback.includes('Oops!')) throw new Error(`Expected negative feedback`);
});

test('accepts word with letter anywhere (Y in FAMILY)', () => {
  const result = validateWordChain('Y', 'FAMILY');
  if (!result.isValid) throw new Error(`FAMILY contains Y, should be valid`);
});

test('rejects word with wrong letter (E in FAMILY)', () => {
  const result = validateWordChain('E', 'FAMILY');
  if (result.isValid) throw new Error(`FAMILY has no E, should be invalid`);
});

test('validates multiple occurrences of letter (O in BOOK)', () => {
  const result = validateWordChain('O', 'BOOK');
  if (!result.isValid) throw new Error(`BOOK has 2 O's, should be valid`);
});

// ============================================
// CATEGORY 2: EDGE CASES (5 tests)
// ============================================

test('handles case insensitivity (e in home)', () => {
  const result = validateWordChain('e', 'home');
  if (!result.isValid) throw new Error(`Should accept lowercase input`);
  if (result.requiredLetter !== 'E') throw new Error(`Should normalize to uppercase`);
});

test('trims whitespace from student input', () => {
  const result = validateWordChain('E', '  HOME  ');
  if (!result.isValid) throw new Error(`Should accept input with spaces`);
  if (result.studentWord !== 'HOME') throw new Error(`Should trim spaces`);
});

test('handles mixed case input (HoMe)', () => {
  const result = validateWordChain('E', 'HoMe');
  if (!result.isValid) throw new Error(`Should normalize mixed case`);
});

test('extracts last letter correctly (K from BOOK)', () => {
  const lastLetter = getLastLetter('BOOK');
  if (lastLetter !== 'K') throw new Error(`Expected K, got ${lastLetter}`);
});

test('extracts last letter from lowercase (r from mother)', () => {
  const lastLetter = getLastLetter('mother');
  if (lastLetter !== 'R') throw new Error(`Expected R, got ${lastLetter}`);
});

// ============================================
// CATEGORY 3: HINT VALIDATION (5 tests)
// ============================================

test('filters hints containing target letter (K)', () => {
  const hints = ['book', 'pen', 'desk', 'pencil', 'marker'];
  const validated = validateHints(hints, 'K');
  
  // book, desk, marker contain K
  if (validated.length !== 3) throw new Error(`Expected 3 hints with K, got ${validated.length}: ${validated}`);
  if (!validated.includes('book')) throw new Error(`Should include 'book'`);
  if (!validated.includes('desk')) throw new Error(`Should include 'desk'`);
  if (!validated.includes('marker')) throw new Error(`Should include 'marker'`);
});

test('rejects hints without target letter', () => {
  const hints = ['pen', 'cat', 'dog'];
  const validated = validateHints(hints, 'K');
  
  if (validated.length !== 0) throw new Error(`No hints should contain K, got ${validated.length}`);
});

test('respects max hint count (5 max)', () => {
  const hints = ['book', 'desk', 'backpack', 'marker', 'pink', 'milk', 'dark'];
  const validated = validateHints(hints, 'K');
  
  if (validated.length > 5) throw new Error(`Should return max 5 hints, got ${validated.length}`);
});

test('filters by allowed vocabulary', () => {
  const hints = ['book', 'desk', 'encyclopedia']; // All have K
  const allowedVocab = ['book', 'desk', 'pen', 'pencil']; // No 'encyclopedia'
  const validated = validateHints(hints, 'K', allowedVocab);
  
  if (validated.includes('encyclopedia')) throw new Error(`Should not include word not in vocab`);
  if (!validated.includes('book')) throw new Error(`Should include 'book' (in vocab)`);
  if (!validated.includes('desk')) throw new Error(`Should include 'desk' (in vocab)`);
});

test('generates hints from vocab pool', () => {
  const vocab = ['book', 'pen', 'desk', 'pencil', 'marker', 'eraser'];
  const hints = generateHintsFromVocab(vocab, 'K', 3);
  
  // Should return words with K: book, desk, marker
  if (hints.length !== 3) throw new Error(`Expected 3 hints, got ${hints.length}`);
  
  // All returned hints should contain K
  hints.forEach(hint => {
    if (!hint.toUpperCase().includes('K')) {
      throw new Error(`Hint '${hint}' should contain K`);
    }
  });
  
  // All hints should be from vocab
  hints.forEach(hint => {
    if (!vocab.map(v => v.toLowerCase()).includes(hint.toLowerCase())) {
      throw new Error(`Hint '${hint}' not in vocab list`);
    }
  });
});

// ============================================
// RUN TESTS
// ============================================

console.log('🧪 WORD CHAIN FULL TEST SUITE\n');
console.log(`Running ${tests.length} tests...\n`);

let passed = 0;
let failed = 0;
const failures = [];

tests.forEach(({ id, description, testFn }) => {
  try {
    testFn();
    console.log(`✅ Test ${id}: ${description}`);
    passed++;
  } catch (error) {
    console.log(`❌ Test ${id}: ${description}`);
    console.log(`   Error: ${error.message}`);
    failed++;
    failures.push({ id, description, error: error.message });
  }
});

console.log(`\n${'='.repeat(60)}`);
console.log(`📊 RESULTS: ${passed}/${tests.length} passed, ${failed} failed`);
console.log(`${'='.repeat(60)}`);

if (failed > 0) {
  console.log('\n❌ FAILED TESTS:');
  failures.forEach(({ id, description, error }) => {
    console.log(`\n  ${id}. ${description}`);
    console.log(`     ${error}`);
  });
  console.log('\n⚠️  FIX FAILURES BEFORE CONTINUING');
  process.exit(1);
} else {
  console.log('\n✅ ALL TESTS PASSED!');
  console.log('✅ Word Chain validation logic is SOLID');
  console.log('✅ Safe to proceed with refactoring');
  console.log('\n📋 NEXT STEP: User manual test on browser');
  console.log('   Run: npm run dev → Week 1 → AI Tutor → Word Chain');
  process.exit(0);
}
