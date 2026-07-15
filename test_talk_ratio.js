/**
 * Talk Ratio Guard Test Suite
 * Test AI:Student word ratio validation and enforcement
 */

import { 
  calculateTalkRatio, 
  validateTalkRatio, 
  truncateResponse,
  enforceTalkRatio 
} from './src/services/ai_tutor/talkRatioGuard.js';

console.log('🧪 TALK RATIO GUARD TEST SUITE\n');

// ============================================
// TEST 1: Basic Word Counting & Ratio Calculation
// ============================================
console.log('TEST 1: Basic Ratio Calculation');

const testCases = [
  {
    student: "Hello!",
    ai: "Hi there!",
    desc: "Simple greeting (equal words)"
  },
  {
    student: "My name is Alex.",
    ai: "Nice to meet you Alex!",
    desc: "Short conversation (AI slightly longer)"
  },
  {
    student: "I like cats.",
    ai: "That's wonderful! Cats are amazing animals. They are soft and friendly. Do you have a cat at home?",
    desc: "AI talks too much (ratio > 0.8)"
  },
  {
    student: "Yes",
    ai: "Great!",
    desc: "Very short student input (should skip ratio check)"
  },
  {
    student: "I am 9 years old and I live in Hanoi.",
    ai: "Oh, you are 9 years old! That's a great age.",
    desc: "Good balance (AI < student)"
  }
];

testCases.forEach(({ student, ai, desc }, i) => {
  const result = calculateTalkRatio(ai, student);
  console.log(`\n  ${i + 1}. ${desc}`);
  console.log(`     Student: "${student}" (${result.studentWords} words)`);
  console.log(`     AI: "${ai}" (${result.aiWords} words)`);
  console.log(`     Ratio: ${result.ratio} ${result.valid ? '✅' : '❌'}`);
  console.log(`     ${result.reason}`);
});

// ============================================
// TEST 2: Truncation Logic
// ============================================
console.log('\n\nTEST 2: Truncation Logic');

const longResponse = "That's wonderful! I love learning about students. Cats are amazing animals. They are soft and friendly. Do you have a cat at home? What is your cat's name?";
const maxWords = 10;

console.log(`  Original: "${longResponse}"`);
console.log(`  Max words: ${maxWords}`);

const truncated = truncateResponse(longResponse, maxWords);
console.log(`  Truncated: "${truncated}"`);

// ============================================
// TEST 3: Enforcement Scenarios
// ============================================
console.log('\n\nTEST 3: Enforcement Scenarios');

const scenarios = [
  {
    student: "I have a dog.",
    ai: "Great!",
    expectedAction: 'none',
    desc: "Valid ratio (no action needed)"
  },
  {
    student: "I like cats.",
    ai: "That's wonderful! Cats are amazing animals with soft fur and friendly personalities.",
    expectedAction: 'regenerate',
    desc: "Mild violation (ratio 0.9-1.2, should regenerate)"
  },
  {
    student: "Yes.",
    ai: "That's absolutely wonderful! I'm so glad to hear that you have such a positive attitude about learning. It's truly remarkable how enthusiastic you are. Tell me more about what you enjoy learning!",
    expectedAction: 'truncated',
    desc: "Severe violation (ratio > 1.2, should truncate)"
  }
];

scenarios.forEach(({ student, ai, expectedAction, desc }, i) => {
  console.log(`\n  ${i + 1}. ${desc}`);
  console.log(`     Student: "${student}"`);
  console.log(`     AI: "${ai}"`);
  
  const result = enforceTalkRatio(ai, student);
  console.log(`     Expected: ${expectedAction}`);
  console.log(`     Actual: ${result.action} ${result.action === expectedAction ? '✅' : '❌'}`);
  
  if (result.action === 'truncated') {
    console.log(`     Original words: ${result.details.originalWords}`);
    console.log(`     Truncated words: ${result.details.truncatedWords}`);
    console.log(`     Truncated text: "${result.response}"`);
  }
});

// ============================================
// TEST 4: Edge Cases
// ============================================
console.log('\n\nTEST 4: Edge Cases');

const edgeCases = [
  { student: "", ai: "Hello!", desc: "Empty student input" },
  { student: "Hi", ai: "", desc: "Empty AI response" },
  { student: "I am happy.", ai: "Great!", desc: "Perfect ratio (1:1 words)" },
  { student: "I love programming and coding!", ai: "Me too!", desc: "Student talks more (ideal)" }
];

edgeCases.forEach(({ student, ai, desc }) => {
  const result = validateTalkRatio(ai, student);
  console.log(`\n  ${desc}`);
  console.log(`    Student: "${student}" (${result.studentWords} words)`);
  console.log(`    AI: "${ai}" (${result.aiWords} words)`);
  console.log(`    ${result.valid ? '✅' : '❌'} Valid: ${result.valid}`);
  console.log(`    Ratio: ${result.ratio}`);
});

// ============================================
// TEST 5: Real-World Examples
// ============================================
console.log('\n\nTEST 5: Real-World Examples from Ms. Nova');

const realExamples = [
  {
    student: "My name is Lan and I am 10 years old.",
    ai: "Nice to meet you, Lan! What is your favorite subject?",
    expectedValid: true
  },
  {
    student: "I like math.",
    ai: "Math is wonderful! Numbers are fun. Do you like addition or multiplication more?",
    expectedValid: false // Too long
  },
  {
    student: "I have a cat named Mimi.",
    ai: "Oh, you have a cat! What color is Mimi?",
    expectedValid: true
  }
];

console.log('\n  Real conversation examples:');
realExamples.forEach(({ student, ai, expectedValid }, i) => {
  const result = validateTalkRatio(ai, student);
  const passesExpectation = result.valid === expectedValid;
  console.log(`\n  ${i + 1}. ${passesExpectation ? '✅' : '❌'} Expected ${expectedValid ? 'VALID' : 'INVALID'}, Got ${result.valid ? 'VALID' : 'INVALID'}`);
  console.log(`     Student (${result.studentWords}w): "${student}"`);
  console.log(`     AI (${result.aiWords}w): "${ai}"`);
  console.log(`     Ratio: ${result.ratio} (max: 0.8)`);
});

console.log('\n\n✅ TEST SUITE COMPLETE\n');
