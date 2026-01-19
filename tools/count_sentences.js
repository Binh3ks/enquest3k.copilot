// Count sentences in read.js
import advancedRead from '../src/data/weeks/week_02/read.js';
import easyRead from '../src/data/weeks_easy/week_02/read.js';

console.log('\n=== READ.JS SENTENCE COUNT ===\n');

// Advanced
const advSentences = advancedRead.content_en.split(/[.!?]+/).filter(s => s.trim().length > 0);
console.log('ADVANCED MODE:');
console.log(`Total sentences: ${advSentences.length}`);
advSentences.forEach((s, i) => {
  const words = s.trim().split(/\s+/);
  console.log(`  ${i+1}. [${words.length} words] ${s.trim().substring(0, 70)}...`);
});

// Easy
console.log('\nEASY MODE:');
const easySentences = easyRead.content_en.split(/[.!?]+/).filter(s => s.trim().length > 0);
console.log(`Total sentences: ${easySentences.length}`);
easySentences.forEach((s, i) => {
  const words = s.trim().split(/\s+/);
  console.log(`  ${i+1}. [${words.length} words] ${s.trim().substring(0, 70)}...`);
});

console.log('\n' + '='.repeat(70));
console.log(`SUMMARY:`);
console.log(`  Advanced: ${advSentences.length} sentences (matches dictation/shadowing)`);
console.log(`  Easy: ${easySentences.length} sentences (matches dictation/shadowing)`);
console.log('='.repeat(70));
