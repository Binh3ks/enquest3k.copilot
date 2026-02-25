/**
 * SIMPLE WORD CHAIN TEST - Không cần Jest, chạy trực tiếp
 * Run: node src/services/ai_tutor/__tests__/wordChain.simple.test.js
 */

// Copy validation logic từ FreeTalkTab.jsx
function validateWordChain(aiWord, studentWord, targetLetter) {
  const word = studentWord.toLowerCase().trim();
  const letter = targetLetter.toLowerCase();
  
  // Check if word contains the letter
  const hasLetter = word.includes(letter);
  
  return {
    isValid: hasLetter,
    word: word,
    letter: letter,
    feedback: hasLetter 
      ? `Great! ${word.toUpperCase()} has ${letter.toUpperCase()}!`
      : `Oops! ${word.toUpperCase()} doesn't have ${letter.toUpperCase()}.`
  };
}

// TEST CASES - Real bugs từ user reports
const tests = [
  // ✅ PASS cases (should work)
  { ai: 'LOVE', student: 'HOME', letter: 'E', expected: true, desc: 'HOME has E from LOVE' },
  { ai: 'HAPPY', student: 'FAMILY', letter: 'Y', expected: true, desc: 'FAMILY has Y from HAPPY' },
  { ai: 'BOOK', student: 'BACKPACK', letter: 'K', expected: true, desc: 'BACKPACK has K from BOOK' },
  { ai: 'MOTHER', student: 'FATHER', letter: 'R', expected: true, desc: 'FATHER has R from MOTHER' },
  { ai: 'DESK', student: 'BOOK', letter: 'K', expected: true, desc: 'BOOK has K from DESK' },
  
  // ❌ FAIL cases (BUG hiện tại - AI suggests wrong hints)
  { ai: 'BOOK', student: 'PEN', letter: 'K', expected: false, desc: '❗ BUG: PEN has NO K' },
  { ai: 'LOVE', student: 'FAMILY', letter: 'E', expected: false, desc: '❗ BUG: FAMILY has NO E' },
  { ai: 'BACKPACK', student: 'BOOK', letter: 'K', expected: true, desc: 'BOOK has K' },
  { ai: 'BACKPACK', student: 'DESK', letter: 'K', expected: true, desc: 'DESK has K' },
  { ai: 'BACKPACK', student: 'PENCIL', letter: 'K', expected: false, desc: '❗ BUG: PENCIL has NO K' },
];

console.log('🧪 WORD CHAIN VALIDATION TESTS\n');
console.log('Testing core validation logic...\n');

let passed = 0;
let failed = 0;

tests.forEach((test, i) => {
  const result = validateWordChain(test.ai, test.student, test.letter);
  const success = result.isValid === test.expected;
  
  if (success) {
    console.log(`✅ Test ${i + 1}: ${test.desc}`);
    passed++;
  } else {
    console.log(`❌ Test ${i + 1}: ${test.desc}`);
    console.log(`   Expected: ${test.expected}, Got: ${result.isValid}`);
    console.log(`   Feedback: ${result.feedback}`);
    failed++;
  }
});

console.log(`\n📊 Results: ${passed}/${tests.length} passed, ${failed} failed`);

if (failed > 0) {
  console.log('\n⚠️  VALIDATION LOGIC HAS BUGS - FIX BEFORE REFACTORING');
  process.exit(1);
} else {
  console.log('\n✅ All tests passed - Safe to refactor');
  process.exit(0);
}
