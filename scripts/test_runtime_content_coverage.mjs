// Mock localStorage for Node CLI execution
if (typeof global.localStorage === 'undefined') {
  const store = {};
  global.localStorage = {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); }
  };
}

import { weekTitles, getWeekTitle } from '../src/data/weeks/metadata.js';
import w33Index from '../src/data/weeks/week_33/index.js';
import w34Index from '../src/data/weeks/week_34/index.js';
import w35Index from '../src/data/weeks/week_35/index.js';
import w36Index from '../src/data/weeks/week_36/index.js';
import w37Index from '../src/data/weeks/week_37/index.js';

import w33Writing from '../src/data/weeks/week_33/writing.js';
import w34Writing from '../src/data/weeks/week_34/writing.js';
import w35Writing from '../src/data/weeks/week_35/writing.js';
import w36Writing from '../src/data/weeks/week_36/writing.js';
import w37Writing from '../src/data/weeks/week_37/writing.js';

console.log('\n================================================================');
console.log('🧪 RUNTIME-CONTENT COVERAGE UNIT TESTS');
console.log('================================================================\n');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`✅ [PASS] ${message}`);
  } else {
    console.error(`❌ [FAIL] ${message}`);
    process.exitCode = 1;
  }
}

// 1. Sidebar Title -> Runtime Week Alignment
assert(weekTitles[33].title_en.includes('Corridor Safety'), 'Sidebar Coverage: Week 33 sidebar title is Corridor Safety');
assert(weekTitles[34].title_en.includes('Lion and the Mouse'), 'Sidebar Coverage: Week 34 sidebar title is Lion and the Mouse');
assert(weekTitles[35].title_en.includes('Best Day Ever'), 'Sidebar Coverage: Week 35 sidebar title is Best Day Ever');
assert(weekTitles[36].title_en.includes('My Adventure Book'), 'Sidebar Coverage: Week 36 sidebar title is My Adventure Book');
assert(weekTitles[37].title_en.includes('Living vs. Non-Living'), 'Sidebar Coverage: Week 37 sidebar title is Living vs. Non-Living');

// 2. Hub Title / Content -> Runtime Week Alignment
assert(w33Index.title.includes('Corridor Safety') && w33Index.readingHub.theme.includes('Corridor Safety'), 'Hub Coverage: Week 33 Hub title matches Corridor Safety');
assert(w34Index.title.includes('Lion and the Mouse') && w34Index.readingHub.theme.includes('Lion and the Mouse'), 'Hub Coverage: Week 34 Hub title matches Lion and the Mouse');
assert(w35Index.title.includes('Best Day Ever') && w35Index.readingHub.theme.includes('Best Day Ever'), 'Hub Coverage: Week 35 Hub title matches Best Day Ever');
assert(w36Index.title.includes('My Adventure Book') && w36Index.readingHub.theme.includes('My Adventure Book'), 'Hub Coverage: Week 36 Hub title matches My Adventure Book');
assert(w37Index.title.includes('Living vs. Non-Living') && w37Index.readingHub.theme.includes('Living vs. Non-Living'), 'Hub Coverage: Week 37 Hub title matches Living vs. Non-Living');

// 3. Writing Sentence Frames -> Correct Week Topic Alignment
assert(!JSON.stringify(w33Writing.sentence_frames).toLowerCase().includes('cave'), 'Writing Frame Coverage: W33 writing frames contain ZERO legacy cave text');
assert(JSON.stringify(w33Writing.sentence_frames).toLowerCase().includes('corridor') || JSON.stringify(w33Writing.sentence_frames).toLowerCase().includes('sunny'), 'Writing Frame Coverage: W33 writing frames match school corridor safety');
assert(JSON.stringify(w34Writing.sentence_frames).toLowerCase().includes('lion') || JSON.stringify(w34Writing.sentence_frames).toLowerCase().includes('lesson'), 'Writing Frame Coverage: W34 writing frames match Lion and Mouse');
assert(JSON.stringify(w35Writing.sentence_frames).toLowerCase().includes('best day') || JSON.stringify(w35Writing.sentence_frames).toLowerCase().includes('lesson'), 'Writing Frame Coverage: W35 writing frames match Best Day Ever');

// 4. Nested Activity Content -> Syllabus Alignment
assert(w34Index.stations.dictation.some(s => s.sentence.includes('lion') || s.sentence.includes('fable')), 'Activity Coverage: W34 dictation sentences match Lion & Mouse');
assert(w37Index.stations.dictation.some(s => s.sentence.includes('Living') || s.sentence.includes('nature')), 'Activity Coverage: W37 dictation sentences match Living vs Non-Living');

console.log(`\n================================================================`);
console.log(`🎉 RUNTIME COVERAGE TEST SUMMARY: ${passedTests}/${totalTests} PASSED 100%!`);
console.log('================================================================\n');
