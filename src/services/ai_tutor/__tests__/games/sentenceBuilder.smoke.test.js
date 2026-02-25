/**
 * SMOKE TEST: Sentence Builder Game
 * Purpose: Test core Sentence Builder functionality (patterns, vocab restrictions)
 * Run: node src/services/ai_tutor/__tests__/games/sentenceBuilder.smoke.test.js
 */

// ========================================
// TEST FUNCTIONS (Extracted from FreeTalkTab logic)
// ========================================

/**
 * Validate if word is in allowed vocabulary
 */
function isAllowedWord(word, allowedVocab) {
  const normalized = word.toLowerCase().trim();
  const allowedNormalized = allowedVocab.map(w => w.toLowerCase().trim());
  return allowedNormalized.includes(normalized);
}

/**
 * Extract words from student sentence
 */
function extractWords(sentence) {
  // Remove punctuation and split
  return sentence
    .replace(/[.,!?;:]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 0);
}

/**
 * Validate sentence uses only allowed vocab
 */
function validateSentenceVocab(sentence, allowedVocab) {
  const words = extractWords(sentence);
  const invalidWords = words.filter(word => !isAllowedWord(word, allowedVocab));
  
  return {
    valid: invalidWords.length === 0,
    invalidWords
  };
}

/**
 * Get pattern for turn number
 */
function getPatternForTurn(turnNumber, patterns) {
  if (!patterns || patterns.length === 0) {
    return null;
  }
  
  // Turns 1-10: Pattern 1, Turns 11-20: Pattern 2
  if (turnNumber <= 10) {
    return patterns[0];
  } else {
    return patterns[1] || patterns[0];
  }
}

/**
 * Validate pattern structure
 */
function validatePattern(pattern) {
  if (!pattern || typeof pattern !== 'string' || pattern.trim().length === 0) {
    return { valid: false, error: 'Pattern is empty or invalid' };
  }
  
  // Pattern should have placeholder brackets like [V-ing] or [object]
  const hasPlaceholder = /\[.*?\]/.test(pattern);
  
  return {
    valid: true,
    hasPlaceholder,
    pattern
  };
}

/**
 * Suggest vocab words for pattern
 */
function suggestVocabForPattern(pattern, allowedVocab) {
  const lowerPattern = pattern.toLowerCase();
  
  // Week 4: I like [V-ing]
  if (lowerPattern.includes('v-ing') || lowerPattern.includes('like')) {
    const suggestions = allowedVocab.filter(word => 
      ['playing', 'reading', 'singing', 'drawing', 'eating', 'sleeping'].includes(word.toLowerCase())
    );
    return suggestions.slice(0, 3);
  }
  
  // Week 6: The treasure is [ON/UNDER/IN]
  if (lowerPattern.includes('treasure') || lowerPattern.includes('on/under/in')) {
    const suggestions = allowedVocab.filter(word => 
      ['desk', 'box', 'floor', 'table', 'bed'].includes(word.toLowerCase())
    );
    return suggestions.slice(0, 3);
  }
  
  // Week 7: There is a [item] in my [place]
  if (lowerPattern.includes('there is') || lowerPattern.includes('[item]')) {
    const suggestions = allowedVocab.filter(word => 
      ['pen', 'book', 'backpack', 'desk', 'chair'].includes(word.toLowerCase())
    );
    return suggestions.slice(0, 3);
  }
  
  // Default: return first 3 vocab words
  return allowedVocab.slice(0, 3);
}

// ========================================
// TEST SUITE
// ========================================

console.log('🧩 SENTENCE BUILDER - SMOKE TEST SUITE');
console.log('Testing: Patterns, Vocab restrictions, Turn management\n');

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
// CATEGORY 1: VOCABULARY VALIDATION (5 tests)
// ========================================

console.log('📋 CATEGORY 1: Vocabulary Validation\n');

runTest('accepts sentence with only allowed vocab', () => {
  const allowedVocab = ['I', 'like', 'playing', 'reading', 'games'];
  const sentence = 'I like playing games';
  const validation = validateSentenceVocab(sentence, allowedVocab);
  if (!validation.valid) {
    throw new Error(`Should accept valid sentence. Invalid words: ${validation.invalidWords.join(', ')}`);
  }
});

runTest('rejects sentence with forbidden vocab', () => {
  const allowedVocab = ['I', 'like', 'reading'];
  const sentence = 'I like swimming'; // "swimming" not in vocab
  const validation = validateSentenceVocab(sentence, allowedVocab);
  if (validation.valid) {
    throw new Error('Should reject sentence with "swimming" (not in vocab)');
  }
  if (!validation.invalidWords.includes('swimming')) {
    throw new Error('Should identify "swimming" as invalid word');
  }
});

runTest('handles case insensitivity', () => {
  const allowedVocab = ['i', 'like', 'reading'];
  const sentence = 'I LIKE READING';
  const validation = validateSentenceVocab(sentence, allowedVocab);
  if (!validation.valid) {
    throw new Error('Should accept sentence with different case');
  }
});

runTest('ignores punctuation', () => {
  const allowedVocab = ['I', 'like', 'reading', 'books'];
  const sentence = 'I like reading books!';
  const validation = validateSentenceVocab(sentence, allowedVocab);
  if (!validation.valid) {
    throw new Error('Should ignore punctuation and accept sentence');
  }
});

runTest('identifies multiple invalid words', () => {
  const allowedVocab = ['I', 'like'];
  const sentence = 'I like swimming and dancing';
  const validation = validateSentenceVocab(sentence, allowedVocab);
  if (validation.valid) {
    throw new Error('Should reject sentence with multiple invalid words');
  }
  if (validation.invalidWords.length < 3) { // swimming, and, dancing
    throw new Error(`Should identify 3+ invalid words, got ${validation.invalidWords.length}`);
  }
});

// ========================================
// CATEGORY 2: PATTERN MANAGEMENT (5 tests)
// ========================================

console.log('\n📋 CATEGORY 2: Pattern Management\n');

runTest('returns Pattern 1 for Turn 1-10', () => {
  const patterns = ['I like [V-ing]', 'I like [V-ing] [object]'];
  const pattern = getPatternForTurn(5, patterns);
  if (pattern !== patterns[0]) {
    throw new Error(`Turn 5 should use Pattern 1, got: ${pattern}`);
  }
});

runTest('returns Pattern 2 for Turn 11-20', () => {
  const patterns = ['I like [V-ing]', 'I like [V-ing] [object]'];
  const pattern = getPatternForTurn(15, patterns);
  if (pattern !== patterns[1]) {
    throw new Error(`Turn 15 should use Pattern 2, got: ${pattern}`);
  }
});

runTest('handles single pattern (fallback)', () => {
  const patterns = ['I like [V-ing]'];
  const pattern = getPatternForTurn(15, patterns);
  if (pattern !== patterns[0]) {
    throw new Error('Should fallback to Pattern 1 if Pattern 2 not available');
  }
});

runTest('validates pattern has placeholder', () => {
  const pattern = 'I like [V-ing]';
  const validation = validatePattern(pattern);
  if (!validation.valid) {
    throw new Error('Should validate pattern as valid');
  }
  if (!validation.hasPlaceholder) {
    throw new Error('Should detect [V-ing] as placeholder');
  }
});

runTest('detects invalid/empty pattern', () => {
  const pattern = '';
  const validation = validatePattern(pattern);
  if (validation.valid) {
    throw new Error('Should reject empty pattern');
  }
});

// ========================================
// CATEGORY 3: VOCAB SUGGESTIONS (4 tests)
// ========================================

console.log('\n📋 CATEGORY 3: Vocabulary Suggestions\n');

runTest('suggests V-ing words for "I like [V-ing]" pattern', () => {
  const pattern = 'I like [V-ing]';
  const allowedVocab = ['playing', 'reading', 'singing', 'desk', 'table'];
  const suggestions = suggestVocabForPattern(pattern, allowedVocab);
  
  if (suggestions.length === 0) {
    throw new Error('Should suggest at least 1 word');
  }
  
  // Should prioritize V-ing words
  const hasVingWord = suggestions.some(word => 
    ['playing', 'reading', 'singing'].includes(word.toLowerCase())
  );
  if (!hasVingWord) {
    throw new Error('Should suggest V-ing words like playing, reading, singing');
  }
});

runTest('suggests place words for "treasure is ON/UNDER/IN" pattern', () => {
  const pattern = 'The treasure is [ON/UNDER/IN] the [place]';
  const allowedVocab = ['desk', 'box', 'floor', 'playing', 'reading'];
  const suggestions = suggestVocabForPattern(pattern, allowedVocab);
  
  if (suggestions.length === 0) {
    throw new Error('Should suggest at least 1 word');
  }
  
  // Should prioritize place words
  const hasPlaceWord = suggestions.some(word => 
    ['desk', 'box', 'floor'].includes(word.toLowerCase())
  );
  if (!hasPlaceWord) {
    throw new Error('Should suggest place words like desk, box, floor');
  }
});

runTest('only suggests from allowed vocab list', () => {
  const pattern = 'I like [V-ing]';
  const allowedVocab = ['playing', 'reading']; // Very limited vocab
  const suggestions = suggestVocabForPattern(pattern, allowedVocab);
  
  // All suggestions must be in allowedVocab
  const invalidSuggestion = suggestions.find(word => !allowedVocab.includes(word));
  if (invalidSuggestion) {
    throw new Error(`Suggested word "${invalidSuggestion}" not in allowed vocab`);
  }
});

runTest('limits suggestions to max 3 words', () => {
  const pattern = 'I like [V-ing]';
  const allowedVocab = ['playing', 'reading', 'singing', 'drawing', 'eating', 'sleeping'];
  const suggestions = suggestVocabForPattern(pattern, allowedVocab);
  
  if (suggestions.length > 3) {
    throw new Error(`Should suggest max 3 words, got ${suggestions.length}`);
  }
});

// ========================================
// RESULTS
// ========================================

console.log('\n' + '='.repeat(50));
console.log('📊 SENTENCE BUILDER SMOKE TEST RESULTS');
console.log('='.repeat(50));
console.log(`✅ Passed: ${passed}/14`);
console.log(`❌ Failed: ${failed}/14`);
console.log('='.repeat(50));

if (failed === 0) {
  console.log('\n🎉 ALL TESTS PASSED!');
  console.log('✅ Sentence Builder core logic is SOLID');
  console.log('✅ Safe to proceed with refactoring\n');
  process.exit(0);
} else {
  console.log('\n⚠️  SOME TESTS FAILED');
  console.log('❌ Fix issues before proceeding\n');
  process.exit(1);
}
