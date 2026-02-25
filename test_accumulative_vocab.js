// Test accumulative vocabulary system
// Convert to CommonJS for Node.js
const gameAdaptation = {
  GAME_TEMPLATES: {
    1: { vocab: ['backpack', 'book', 'pen', 'pencil', 'desk', 'chair', 'door', 'window', 'I', 'you'] },
    2: { vocab: ['mother', 'father', 'brother', 'sister', 'family', 'home', 'kind', 'happy', 'love', 'together'] },
    3: { vocab: ['tall', 'short', 'hair', 'eyes', 'long', 'curly', 'straight', 'glasses', 'face', 'smile'] }
  }
};

function getCumulativeVocabulary(currentWeek) {
  const allVocab = [];
  for (let week = 1; week <= currentWeek; week++) {
    if (gameAdaptation.GAME_TEMPLATES[week] && gameAdaptation.GAME_TEMPLATES[week].vocab) {
      allVocab.push(...gameAdaptation.GAME_TEMPLATES[week].vocab);
    }
  }
  return [...new Set(allVocab)];
}

console.log('=== ACCUMULATIVE VOCABULARY TEST ===\n');

// Test Week 1
const week1Vocab = getCumulativeVocabulary(1);
console.log('Week 1 (10 words expected):');
console.log(week1Vocab);
console.log(`Total: ${week1Vocab.length} words\n`);

// Test Week 2  
const week2Vocab = getCumulativeVocabulary(2);
console.log('Week 2 (20 words expected - Week 1 + Week 2):');
console.log(week2Vocab);
console.log(`Total: ${week2Vocab.length} words\n`);

// Test Week 3
const week3Vocab = getCumulativeVocabulary(3);
console.log('Week 3 (30 words expected - Week 1 + Week 2 + Week 3):');
console.log(week3Vocab);
console.log(`Total: ${week3Vocab.length} words\n`);

// Verify "toothbrush" is NOT in Week 3 vocab
const hasToothbrush = week3Vocab.includes('toothbrush');
const hasBathroom = week3Vocab.includes('bathroom');

console.log('=== VALIDATION ===');
console.log(`Week 3 contains "toothbrush": ${hasToothbrush} ❌ (should be FALSE)`);
console.log(`Week 3 contains "bathroom": ${hasBathroom} ❌ (should be FALSE)`);
console.log(`Week 3 contains "brush": ${week3Vocab.includes('brush')} ❌ (should be FALSE - not in Week 1-3)`);
console.log(`Week 3 contains "hair": ${week3Vocab.includes('hair')} ✅ (should be TRUE)`);
console.log(`Week 3 contains "mother": ${week3Vocab.includes('mother')} ✅ (should be TRUE - from Week 2)`);
console.log(`Week 3 contains "backpack": ${week3Vocab.includes('backpack')} ✅ (should be TRUE - from Week 1)`);
