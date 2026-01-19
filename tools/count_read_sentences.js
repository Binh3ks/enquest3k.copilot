// Count sentences in read.js files
const advancedRead = require('../src/data/weeks/week_02/read.js').default;
const easyRead = require('../src/data/weeks_easy/week_02/read.js').default;

console.log('\n=== WEEK 2 ADVANCED read.js ===');
const advSentences = advancedRead.content_en.split(/[.!?]+/).filter(s => s.trim().length > 0);
console.log('Total sentences:', advSentences.length);
advSentences.forEach((s, i) => {
  const words = s.trim().split(/\s+/);
  console.log(`Sentence ${i+1}: ${words.length} words - "${s.trim().substring(0, 60)}..."`);
});

console.log('\n=== WEEK 2 EASY read.js ===');
const easySentences = easyRead.content_en.split(/[.!?]+/).filter(s => s.trim().length > 0);
console.log('Total sentences:', easySentences.length);
easySentences.forEach((s, i) => {
  const words = s.trim().split(/\s+/);
  console.log(`Sentence ${i+1}: ${words.length} words - "${s.trim().substring(0, 60)}..."`);
});
