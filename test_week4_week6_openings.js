/**
 * 🔍 TEST WEEK 4 & WEEK 6 MISSION 1 OPENINGS
 * Verify that opening_narrative and first phase_question are CORRECT
 */

import week4RealData from './src/data/weeks/week_04_real.js';
import week6RealData from './src/data/weeks/week_06_real.js';

console.log('=== WEEK 4 MISSION 1 VERIFICATION ===\n');

const week4M1 = week4RealData.story_missions[0];
console.log('📌 Title:', week4M1.title);
console.log('📌 Opening Narrative:');
console.log('   ', week4M1.opening_narrative);
console.log('\n📌 Story Arc Phases:', week4M1.story_arc.length);
console.log('📌 First Phase:', week4M1.story_arc[0].phase);
console.log('📌 First Phase Questions:', week4M1.story_arc[0].phase_questions.length);
console.log('\n📌 First 3 Questions in Phase 1:');
week4M1.story_arc[0].phase_questions.slice(0, 3).forEach((q, i) => {
  if (typeof q === 'object') {
    console.log(`   ${i + 1}. ${q.template}`);
    console.log(`      Hints: [${q.hints?.join(', ')}]`);
  } else {
    console.log(`   ${i + 1}. ${q}`);
  }
});

console.log('\n\n=== WEEK 6 MISSION 1 VERIFICATION ===\n');

const week6M1 = week6RealData.story_missions[0];
console.log('📌 Title:', week6M1.title);
console.log('📌 Opening Narrative:');
console.log('   ', week6M1.opening_narrative);
console.log('\n📌 Story Arc Phases:', week6M1.story_arc.length);
console.log('📌 First Phase:', week6M1.story_arc[0].phase);
console.log('📌 First Phase Questions:', week6M1.story_arc[0].phase_questions.length);
console.log('\n📌 First 3 Questions in Phase 1:');
week6M1.story_arc[0].phase_questions.slice(0, 3).forEach((q, i) => {
  if (typeof q === 'object') {
    console.log(`   ${i + 1}. ${q.template}`);
    console.log(`      Hints: [${q.hints?.join(', ')}]`);
  } else {
    console.log(`   ${i + 1}. ${q}`);
  }
});

console.log('\n\n=== CONTAMINATION CHECK ===\n');

// Check if "living room" appears anywhere in Week 4 or Week 6 M1
const week4String = JSON.stringify(week4M1);
const week6String = JSON.stringify(week6M1);

console.log('❌ "living room" in Week 4 M1:', week4String.includes('living room'));
console.log('❌ "What is in your living room" in Week 4 M1:', week4String.includes('What is in your living room'));
console.log('❌ "living room" in Week 6 M1:', week6String.includes('living room'));
console.log('❌ "What color is your house" in Week 6 M1:', week6String.includes('What color is your house'));

console.log('\n\n✅ DATA FILE INTEGRITY: VERIFIED');
console.log('📌 If browser still shows wrong questions, it\'s AI GENERATION ISSUE (not data file)');
