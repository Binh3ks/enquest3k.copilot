// Count all audio URLs in Week 2
import vocab from '../src/data/weeks/week_02/vocab.js';
import read from '../src/data/weeks/week_02/read.js';
import dictation from '../src/data/weeks/week_02/dictation.js';
import shadowing from '../src/data/weeks/week_02/shadowing.js';
import askAi from '../src/data/weeks/week_02/ask_ai.js';
import mindmap from '../src/data/weeks/week_02/mindmap.js';
import explore from '../src/data/weeks/week_02/explore.js';
import wordPower from '../src/data/weeks/week_02/word_power.js';

console.log('\n=== WEEK 2 ADVANCED MODE - AUDIO COUNT ===\n');

// 1. vocab.js - 10 words x 4 audios each (word, def, ex, coll)
const vocabCount = vocab.vocab.length * 4;
console.log(`1. vocab.js: ${vocab.vocab.length} words × 4 audios (word, def, ex, coll) = ${vocabCount} audios`);

// 2. read.js - 1 main audio
console.log(`2. read.js: 1 main audio`);

// 3. dictation.js - number of sentences
const dictationCount = dictation.sentences.length;
console.log(`3. dictation.js: ${dictationCount} sentences = ${dictationCount} audios`);

// 4. shadowing.js - number of sentences + 1 full audio
const shadowingCount = shadowing.script.length + 1; // +1 for audio_full
console.log(`4. shadowing.js: ${shadowing.script.length} sentences + 1 full = ${shadowingCount} audios`);

// 5. ask_ai.js - 5 prompts
const askAiCount = askAi.prompts.length;
console.log(`5. ask_ai.js: ${askAiCount} prompts = ${askAiCount} audios`);

// 6. mindmap.js - stems + branches
const mindmapStems = mindmap.centerStems.length;
let mindmapBranches = 0;
Object.values(mindmap.branchLabels).forEach(branches => {
  mindmapBranches += branches.length;
});
const mindmapCount = mindmapStems + mindmapBranches;
console.log(`6. mindmap.js: ${mindmapStems} stems + ${mindmapBranches} branches = ${mindmapCount} audios`);

// 7. explore.js - 1 main audio
console.log(`7. explore.js: 1 main audio`);

// 8. word_power.js - 3 words x 5 audios each (word, def, ex, model, coll)
const wordPowerCount = wordPower.words.length * 5;
console.log(`8. word_power.js: ${wordPower.words.length} words × 5 audios (word, def, ex, model, coll) = ${wordPowerCount} audios`);

// 9. grammar.js - NO AUDIO
console.log(`9. grammar.js: 0 audios (no audio for grammar)`);

const total = vocabCount + 1 + dictationCount + shadowingCount + askAiCount + mindmapCount + 1 + wordPowerCount;

console.log(`\n${'='.repeat(50)}`);
console.log(`TOTAL ADVANCED MODE: ${total} audio files`);
console.log(`${'='.repeat(50)}\n`);

// Detail breakdown
console.log('Breakdown:');
console.log(`- Vocab: ${vocabCount} (${vocab.vocab.length} words × 4)`);
console.log(`- Read: 1`);
console.log(`- Dictation: ${dictationCount}`);
console.log(`- Shadowing: ${shadowingCount} (${shadowing.script.length} + 1 full)`);
console.log(`- Ask AI: ${askAiCount}`);
console.log(`- Mindmap: ${mindmapCount} (${mindmapStems} stems + ${mindmapBranches} branches)`);
console.log(`- Explore: 1`);
console.log(`- Word Power: ${wordPowerCount} (${wordPower.words.length} words × 5)`);
console.log(`- Grammar: 0`);

console.log('\n📊 ACTUAL FILE COUNT (from public/audio/week2/): 161 files');
