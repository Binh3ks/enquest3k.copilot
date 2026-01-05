/**
 * Grammar Guard Test Suite
 * Test validation logic for Week 1-4 grammar scope
 */

import { validateGrammarScope, validateAIResponse, getGrammarSummary } from './src/services/ai_tutor/grammarGuard.js';

console.log('🧪 GRAMMAR GUARD TEST SUITE\n');

// ============================================
// TEST 1: Week 1 Valid Responses
// ============================================
console.log('TEST 1: Week 1 Valid Responses');
const validResponses = [
  "Hello! I am Ms. Nova. What is your name?",
  "That's wonderful! I have a book too.",
  "Where is your classroom?",
  "This is my favorite subject!"
];

validResponses.forEach((text, i) => {
  const result = validateGrammarScope(text, 1);
  console.log(`  ${i + 1}. "${text}"`);
  console.log(`     ✅ Valid: ${result.valid}`);
  if (!result.valid) {
    console.log(`     ❌ Violations: ${result.violations.join(', ')}`);
  }
});

// ============================================
// TEST 2: Week 1 INVALID Responses (Past Tense)
// ============================================
console.log('\nTEST 2: Week 1 INVALID Responses (Should be blocked)');
const invalidResponses = [
  "I went to school yesterday.",  // Past tense 'went'
  "She was happy.",  // Past tense 'was'
  "They played soccer.",  // -ed verb
  "I will go tomorrow.",  // Future 'will'
  "We had a great day.",  // Past 'had'
  "Did you see the cat?"  // 'did' + past
];

invalidResponses.forEach((text, i) => {
  const result = validateGrammarScope(text, 1);
  console.log(`  ${i + 1}. "${text}"`);
  console.log(`     ${result.valid ? '✅' : '❌'} Valid: ${result.valid}`);
  if (!result.valid) {
    console.log(`     🛡️ Blocked: ${result.violations.join(', ')}`);
  }
});

// ============================================
// TEST 3: AI Response Object Validation
// ============================================
console.log('\nTEST 3: AI Response Object Validation');

const validAIResponse = {
  ai_response: "Hello! I am Ms. Nova. What is your name?",
  suggested_hints: ["My name is...", "I am..."]
};

const invalidAIResponse = {
  ai_response: "I went to the library yesterday.",  // Past tense violation
  suggested_hints: ["I walked home", "I saw a dog"]  // Both have past tense
};

console.log('  Valid AI Response:');
const result1 = validateAIResponse(validAIResponse, 1);
console.log(`    ✅ Valid: ${result1.valid}`);

console.log('  Invalid AI Response:');
const result2 = validateAIResponse(invalidAIResponse, 1);
console.log(`    ❌ Valid: ${result2.valid}`);
console.log(`    🛡️ Should Regenerate: ${result2.shouldRegenerate}`);
console.log(`    Violations: ${result2.violations.join('; ')}`);

// ============================================
// TEST 4: Grammar Summary
// ============================================
console.log('\nTEST 4: Grammar Summary for Weeks');
[1, 5, 15, 29].forEach(weekId => {
  console.log(`\n  Week ${weekId}:`);
  console.log('  ' + getGrammarSummary(weekId).replace(/\n/g, '\n  '));
});

// ============================================
// TEST 5: Edge Cases
// ============================================
console.log('\n\nTEST 5: Edge Cases');

const edgeCases = [
  { text: "", weekId: 1, desc: "Empty string" },
  { text: null, weekId: 1, desc: "Null input" },
  { text: "Hello!", weekId: 1, desc: "No verbs" },
  { text: "Can I help you?", weekId: 5, desc: "Week 5 allows 'can'" },
  { text: "Can I help you?", weekId: 1, desc: "Week 1 blocks 'can'" },
];

edgeCases.forEach(({ text, weekId, desc }) => {
  const result = validateGrammarScope(text, weekId);
  console.log(`  ${desc}: "${text}" (Week ${weekId})`);
  console.log(`    ${result.valid ? '✅' : '❌'} Valid: ${result.valid}`);
  if (!result.valid) {
    console.log(`    Violations: ${result.violations.join(', ')}`);
  }
});

console.log('\n✅ TEST SUITE COMPLETE\n');
