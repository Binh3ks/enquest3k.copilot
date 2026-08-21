import { evaluateSpeechSyntax } from '../src/utils/speechSyntaxEvaluator.js';

console.log('🧪 RUNNING SPEECH SYNTAX EVALUATOR COMPREHENSIVE TEST SUITE...\n');

const testCases = [
  // 1. Gibberish babble (MUST FAIL)
  {
    name: 'Gibberish noisy babble',
    spoken: 'white white he felt fall down',
    targets: ['Where did he fall down?'],
    options: { mode: 'question', cueWord: 'where' },
    expectedPass: false
  },
  // 2. Exact perfect question (MUST PASS)
  {
    name: 'Exact perfect WH question',
    spoken: 'Where did he fall down?',
    targets: ['Where did he fall down?'],
    options: { mode: 'question', cueWord: 'where' },
    expectedPass: true
  },
  // 3. Homophone "wear" for "where" (MUST PASS)
  {
    name: 'Homophone "wear" for "where"',
    spoken: 'Wear did he fall down?',
    targets: ['Where did he fall down?'],
    options: { mode: 'question', cueWord: 'where' },
    expectedPass: true
  },
  // 4. Homophone "we're" for "where" (MUST PASS)
  {
    name: 'Homophone "we\'re" for "where"',
    spoken: "We're did he fall down?",
    targets: ['Where did he fall down?'],
    options: { mode: 'question', cueWord: 'where' },
    expectedPass: true
  },
  // 5. Filler word before WH question (MUST PASS)
  {
    name: 'Filler word "so where did he fall down"',
    spoken: 'So where did he fall down?',
    targets: ['Where did he fall down?'],
    options: { mode: 'question', cueWord: 'where' },
    expectedPass: true
  },
  // 6. Inverted question word at end (MUST FAIL)
  {
    name: 'Inverted question word "He fell down where?"',
    spoken: 'He fell down where?',
    targets: ['Where did he fall down?'],
    options: { mode: 'question', cueWord: 'where' },
    expectedPass: false
  },
  // 7. Missing question starter (MUST FAIL)
  {
    name: 'Statement without question starter',
    spoken: 'Tom fell down on the floor.',
    targets: ['Where did Tom fall down?'],
    options: { mode: 'question', cueWord: 'where' },
    expectedPass: false
  },
  // 8. Homophone "wat" / "what" (MUST PASS)
  {
    name: 'Homophone "wat happened to tom"',
    spoken: 'Wat happened to Tom?',
    targets: ['What happened to Tom?'],
    options: { mode: 'question', cueWord: 'what' },
    expectedPass: true
  },
  // 9. Sentence mode valid answer (MUST PASS)
  {
    name: 'Sentence mode valid answer',
    spoken: 'He fell down on the playground.',
    targets: ['He fell down on the playground.'],
    options: { mode: 'sentence' },
    expectedPass: true
  },
  // 10. Sentence mode slight variation (MUST PASS)
  {
    name: 'Sentence mode slight contraction variation',
    spoken: "He didn't hurt his leg.",
    targets: ['He did not hurt his leg.'],
    options: { mode: 'sentence' },
    expectedPass: true
  },
  // 11. Shadowing mode natural speech (MUST PASS)
  {
    name: 'Shadowing mode authentic speech',
    spoken: 'Everyone was tired but very happy.',
    targets: ['Everyone was tired but happy.'],
    options: { mode: 'shadowing' },
    expectedPass: true
  },
  // 12. Short single word utterance in question mode (MUST FAIL)
  {
    name: 'Single word utterance "where"',
    spoken: 'where',
    targets: ['Where did he fall down?'],
    options: { mode: 'question', cueWord: 'where', minWords: 3 },
    expectedPass: false
  },
  // 13. Auxiliary question "Did he hurt his arm?" (MUST PASS)
  {
    name: 'Auxiliary question starting with "Did"',
    spoken: 'Did he hurt his arm?',
    targets: ['Did he hurt his arm?'],
    options: { mode: 'question' },
    expectedPass: true
  },
  // 14. Find Differences required phrase included (MUST PASS)
  {
    name: 'Required phrase included in Find Differences',
    spoken: 'In picture a the dog is sleeping.',
    targets: ['In picture A, the dog is sleeping.'],
    options: { mode: 'find_diff', requiredPhrases: ['in picture a'] },
    expectedPass: true
  },
  // 15. Find Differences required phrase MISSING (MUST FAIL)
  {
    name: 'Required phrase MISSING in Find Differences',
    spoken: 'The dog is sleeping peacefully.',
    targets: ['In picture A, the dog is sleeping.'],
    options: { mode: 'find_diff', requiredPhrases: ['in picture a'] },
    expectedPass: false
  }
];

let passCount = 0;
testCases.forEach((tc, idx) => {
  const res = evaluateSpeechSyntax(tc.spoken, tc.targets, tc.options);
  const isMatch = res.isCorrect === tc.expectedPass;
  if (isMatch) passCount++;

  console.log(`[Test ${idx + 1}] ${tc.name}`);
  console.log(`   Spoken:   "${tc.spoken}"`);
  console.log(`   Expected: ${tc.expectedPass ? 'PASS' : 'FAIL'} | Got: ${res.isCorrect ? 'PASS' : 'FAIL'} (Score: ${res.score}%)`);
  console.log(`   Feedback: "${res.feedback}"`);
  console.log(`   Status:   ${isMatch ? '✅ MATCH' : '❌ MISMATCH'}\n`);
});

console.log(`-----------------------------------------------`);
console.log(`🎯 RESULT: ${passCount}/${testCases.length} Tests Passed (${Math.round((passCount/testCases.length)*100)}%)\n`);

if (passCount === testCases.length) {
  console.log('🎉 ALL SPEECH SYNTAX EVALUATION TESTS PASSED PERFECTLY!');
  process.exit(0);
} else {
  console.error('❌ SOME TESTS FAILED.');
  process.exit(1);
}
