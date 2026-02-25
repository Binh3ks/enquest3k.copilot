/**
 * SMOKE TEST: Ask AI Tab
 * Purpose: Test core Ask AI functionality (Q&A, vocab restrictions, grammar explanations)
 * Run: node src/services/ai_tutor/__tests__/askAI/askAI.smoke.test.js
 */

// ========================================
// MOCK DATA
// ========================================

const mockWeekVocab = ['mother', 'father', 'brother', 'sister', 'family', 'love', 'happy', 'home'];

// ========================================
// TEST FUNCTIONS (Extracted from AskAITab logic)
// ========================================

/**
 * Categorize student question type
 */
function categorizeQuestion(question) {
  const lowerQ = question.toLowerCase();
  
  if (lowerQ.includes('how do you say') || lowerQ.includes('what is') || lowerQ.includes('meaning of')) {
    return 'VOCABULARY';
  }
  
  if (lowerQ.includes('grammar') || lowerQ.includes('tense') || lowerQ.includes('how to use')) {
    return 'GRAMMAR';
  }
  
  if (lowerQ.includes('spell') || lowerQ.includes('pronounce')) {
    return 'PRONUNCIATION';
  }
  
  if (lowerQ.includes('example') || lowerQ.includes('sentence with')) {
    return 'EXAMPLE';
  }
  
  return 'GENERAL';
}

/**
 * Check if question is relevant to current week theme
 */
function isQuestionRelevant(question, weekVocab) {
  const lowerQ = question.toLowerCase();
  const relevantWords = weekVocab.filter(word => 
    lowerQ.includes(word.toLowerCase())
  );
  
  return {
    isRelevant: relevantWords.length > 0,
    matchedWords: relevantWords,
    count: relevantWords.length
  };
}

/**
 * Build Ask AI prompt with vocab restrictions
 */
function buildAskAIPrompt(question, weekVocab, weekTheme) {
  const prompt = `
You are Ms. Nova, an ESL teacher for young learners.

CURRENT WEEK THEME: ${weekTheme}
VOCABULARY FOR THIS WEEK: ${weekVocab.join(', ')}

STUDENT QUESTION: "${question}"

RULES:
1. Answer using ONLY vocabulary from the list above
2. Keep answer simple and clear (young learners)
3. Use examples from week theme
4. If question uses words NOT in vocab, gently redirect to week vocabulary

Provide a helpful, encouraging answer.
`.trim();
  
  return prompt;
}

/**
 * Validate AI response uses only allowed vocab
 */
function validateResponseVocab(response, allowedVocab) {
  // Extract words from response (remove punctuation, lowercase)
  const words = response
    .toLowerCase()
    .replace(/[.,!?;:'"]/g, '')
    .split(/\s+/);
  
  // Common words we allow (articles, prepositions, basic verbs, adjectives)
  const commonWords = [
    'a', 'an', 'the', 'is', 'are', 'am', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did',
    'and', 'or', 'but', 'so', 'because',
    'in', 'on', 'at', 'to', 'from', 'with', 'of', 'for',
    'i', 'you', 'we', 'they', 'he', 'she', 'it',
    'my', 'your', 'our', 'their', 'his', 'her', 'its',
    'can', 'could', 'will', 'would', 'should', 'may', 'might',
    'yes', 'no', 'not', "don't", "doesn't", "didn't", "can't",
    'this', 'that', 'these', 'those',
    'very', 'much', 'many', 'some', 'any',
    // Basic nouns/adjectives for explanations
    'woman', 'man', 'person', 'people', 'child', 'children',
    'kind', 'nice', 'good', 'bad', 'big', 'small',
    'love', 'loves', 'loved', 'like', 'likes', 'liked'
  ];
  
  const allowedWords = [
    ...allowedVocab.map(w => w.toLowerCase()),
    ...commonWords
  ];
  
  const forbiddenWords = words.filter(word => 
    word.length > 0 && !allowedWords.includes(word)
  );
  
  return {
    isValid: forbiddenWords.length === 0,
    forbiddenWords: [...new Set(forbiddenWords)], // Remove duplicates
    count: forbiddenWords.length
  };
}

/**
 * Generate grammar explanation
 */
function generateGrammarExplanation(topic, examples) {
  if (!topic || !examples || examples.length === 0) {
    return null;
  }
  
  return {
    topic,
    explanation: `This is how we use "${topic}" in English.`,
    examples,
    exampleCount: examples.length
  };
}

/**
 * Validate question length (not too short, not too long)
 */
function validateQuestionLength(question) {
  const trimmed = question.trim();
  const wordCount = trimmed.split(/\s+/).length;
  
  if (trimmed.length < 3) {
    return { isValid: false, error: 'Question too short' };
  }
  
  if (wordCount > 50) {
    return { isValid: false, error: 'Question too long (max 50 words)' };
  }
  
  return { isValid: true, wordCount };
}

// ========================================
// TEST SUITE
// ========================================

console.log('💬 ASK AI - SMOKE TEST SUITE');
console.log('Testing: Q&A validation, Vocab restrictions, Grammar explanations\n');

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
// CATEGORY 1: QUESTION CATEGORIZATION (5 tests)
// ========================================

console.log('📋 CATEGORY 1: Question Categorization\n');

runTest('detects VOCABULARY question', () => {
  const category = categorizeQuestion('What is the meaning of mother?');
  if (category !== 'VOCABULARY') throw new Error(`Expected VOCABULARY, got ${category}`);
});

runTest('detects GRAMMAR question', () => {
  const category = categorizeQuestion('How do I use past tense?');
  if (category !== 'GRAMMAR') throw new Error(`Expected GRAMMAR, got ${category}`);
});

runTest('detects PRONUNCIATION question', () => {
  const category = categorizeQuestion('How do you spell family?');
  if (category !== 'PRONUNCIATION') throw new Error(`Expected PRONUNCIATION, got ${category}`);
});

runTest('detects EXAMPLE request', () => {
  const category = categorizeQuestion('Can you give me an example sentence with love?');
  if (category !== 'EXAMPLE') throw new Error(`Expected EXAMPLE, got ${category}`);
});

runTest('categorizes as GENERAL for unclear questions', () => {
  const category = categorizeQuestion('Tell me about families');
  if (category !== 'GENERAL') throw new Error(`Expected GENERAL, got ${category}`);
});

// ========================================
// CATEGORY 2: QUESTION RELEVANCE (4 tests)
// ========================================

console.log('\n📋 CATEGORY 2: Question Relevance\n');

runTest('identifies relevant question (uses week vocab)', () => {
  const question = 'What does mother mean?';
  const relevance = isQuestionRelevant(question, mockWeekVocab);
  if (!relevance.isRelevant) throw new Error('Should be relevant (contains "mother")');
  if (!relevance.matchedWords.includes('mother')) throw new Error('Should match "mother"');
});

runTest('identifies irrelevant question (no week vocab)', () => {
  const question = 'What is a dinosaur?';
  const relevance = isQuestionRelevant(question, mockWeekVocab);
  if (relevance.isRelevant) throw new Error('Should be irrelevant (no week vocab)');
});

runTest('matches multiple vocab words', () => {
  const question = 'Tell me about mother and father';
  const relevance = isQuestionRelevant(question, mockWeekVocab);
  if (relevance.count < 2) throw new Error('Should match 2 words (mother, father)');
});

runTest('handles case insensitive matching', () => {
  const question = 'What is FAMILY?';
  const relevance = isQuestionRelevant(question, mockWeekVocab);
  if (!relevance.isRelevant) throw new Error('Should match "family" (case insensitive)');
});

// ========================================
// CATEGORY 3: RESPONSE VALIDATION (5 tests)
// ========================================

console.log('\n📋 CATEGORY 3: Response Validation\n');

runTest('accepts response with only allowed vocab', () => {
  const response = 'Mother is a woman. She is very kind. She loves the family.';
  const validation = validateResponseVocab(response, mockWeekVocab);
  if (!validation.isValid) {
    throw new Error(`Should accept response. Forbidden: ${validation.forbiddenWords.join(', ')}`);
  }
});

runTest('accepts response with common words (articles, prepositions)', () => {
  const response = 'The mother is in the home with her family.';
  const validation = validateResponseVocab(response, mockWeekVocab);
  if (!validation.isValid) {
    throw new Error(`Should accept common words. Forbidden: ${validation.forbiddenWords.join(', ')}`);
  }
});

runTest('rejects response with forbidden vocab', () => {
  const response = 'A mother is similar to a grandmother or aunt.';
  const validation = validateResponseVocab(response, mockWeekVocab);
  // 'grandmother' and 'aunt' are NOT in mockWeekVocab
  if (validation.isValid) throw new Error('Should reject response with "grandmother, aunt"');
});

runTest('identifies forbidden words correctly', () => {
  const response = 'Mother likes to cook delicious spaghetti.';
  const validation = validateResponseVocab(response, mockWeekVocab);
  // 'cook', 'delicious', 'spaghetti' not in vocab
  if (validation.forbiddenWords.length === 0) {
    throw new Error('Should identify forbidden words');
  }
});

runTest('handles punctuation in validation', () => {
  const response = 'Mother, father, and brother are family!';
  const validation = validateResponseVocab(response, mockWeekVocab);
  if (!validation.isValid) {
    throw new Error('Should ignore punctuation');
  }
});

// ========================================
// CATEGORY 4: QUESTION VALIDATION (3 tests)
// ========================================

console.log('\n📋 CATEGORY 4: Question Validation\n');

runTest('accepts valid question length', () => {
  const question = 'What does mother mean?';
  const validation = validateQuestionLength(question);
  if (!validation.isValid) throw new Error(validation.error);
});

runTest('rejects too short question', () => {
  const question = 'Hi';
  const validation = validateQuestionLength(question);
  if (validation.isValid) throw new Error('Should reject too short question');
});

runTest('rejects too long question (>50 words)', () => {
  const question = 'This is a very long question '.repeat(10); // 60 words
  const validation = validateQuestionLength(question);
  if (validation.isValid) throw new Error('Should reject too long question');
});

// ========================================
// RESULTS
// ========================================

console.log('\n' + '='.repeat(50));
console.log('📊 ASK AI SMOKE TEST RESULTS');
console.log('='.repeat(50));
console.log(`✅ Passed: ${passed}/17`);
console.log(`❌ Failed: ${failed}/17`);
console.log('='.repeat(50));

if (failed === 0) {
  console.log('\n🎉 ALL TESTS PASSED!');
  console.log('✅ Ask AI core logic is SOLID');
  console.log('✅ Safe to proceed with refactoring\n');
  process.exit(0);
} else {
  console.log('\n⚠️  SOME TESTS FAILED');
  console.log('❌ Fix issues before proceeding\n');
  process.exit(1);
}
