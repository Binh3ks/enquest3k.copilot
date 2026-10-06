import { getWeeklyPoolWithReview } from '../src/services/contentService.js';
import { loadWeekData } from '../src/data/weeks/index.js';
import { WEEKLY_CATAPULT_PAIRS } from '../src/modules/chronicles/extractQuestVocab.js';
import { generateStubCatapultPairs } from '../src/modules/chronicles/generateStubVocab.js';

async function runComprehensiveAudit() {
  console.log('===============================================================');
  console.log('AUDIT REPORT: STEP 10 DEEP VERIFICATION (QUESTIONS 1, 2, 3)');
  console.log('===============================================================\n');

  // -------------------------------------------------------------
  // PART 1: WEEKS OUTSIDE W33-W37 (e.g. W1, W17, W50)
  // -------------------------------------------------------------
  console.log('---------------------------------------------------------------');
  console.log('PART 1: TESTING WEEKS OUTSIDE W33-W37 (NO CURATED DATA)');
  console.log('---------------------------------------------------------------');

  const outsideWeeks = [1, 17, 50];
  for (const w of outsideWeeks) {
    console.log(`\n>>> TESTING WEEK ${w}:`);
    const grammarRes = await getWeeklyPoolWithReview(w, 'grammar');
    console.log(`- getWeeklyPoolWithReview(${w}, 'grammar') returned: ${grammarRes.items.length} items (meta: ${JSON.stringify(grammarRes.meta)})`);
    
    // Simulate DailyRoomScreen case 'chunk_catapult' logic:
    const validPairs = grammarRes.items.filter(item => Boolean(item.starter && item.completion));
    const fallbackSource = WEEKLY_CATAPULT_PAIRS[w] ? 'WEEKLY_CATAPULT_PAIRS' : 'generateStubCatapultPairs';
    const catapultPairs = validPairs.length >= 4 
      ? validPairs 
      : (WEEKLY_CATAPULT_PAIRS[w] || generateStubCatapultPairs(w, 6));

    console.log(`- DailyRoomScreen Catapult resolved: ${catapultPairs.length} pairs (Source: ${validPairs.length >= 4 ? 'ContentService Pool' : fallbackSource})`);
    console.log(`- Exact { starter, completion } pairs received:`);
    catapultPairs.forEach((p, i) => {
      console.log(`  [${i+1}] "${p.starter}"  <===>  "${p.completion}"`);
    });
  }

  // -------------------------------------------------------------
  // PART 2: BUG 2 CONFIRMATION (writing_chunks IN W33)
  // -------------------------------------------------------------
  console.log('\n---------------------------------------------------------------');
  console.log('PART 2: BUG 2 CONFIRMATION (writing_chunks FLATTENING IN W33)');
  console.log('---------------------------------------------------------------');
  const w33Data = await loadWeekData(33);
  const rawWritingChunks = w33Data?.writing_hub?.writing_chunks;
  console.log('Raw writing_chunks keys:', Object.keys(rawWritingChunks || {}));
  let totalRawChunks = 0;
  for (const [key, list] of Object.entries(rawWritingChunks || {})) {
    console.log(`  - Category "${key}": ${list.length} phrases`);
    totalRawChunks += list.length;
  }
  console.log(`Total raw phrases in writing_chunks: ${totalRawChunks}`);

  const vocabResW33 = await getWeeklyPoolWithReview(33, 'vocab', { targetSize: 50 });
  const extractedFromWritingChunks = vocabResW33.items.filter(item => {
    return Object.values(rawWritingChunks || {}).some(list => list.some(c => c.includes(item.word) || item.word.includes(c.slice(0, 10))));
  });
  console.log(`Total items in W33 full vocab extraction pool: ${vocabResW33.items.length}`);
  console.log(`Items in W33 pool originating from writing_chunks: ${extractedFromWritingChunks.length}`);
  console.log(`Sample extracted writing_chunks in vocab:`, extractedFromWritingChunks.slice(0, 4).map(i => i.word));

  // -------------------------------------------------------------
  // PART 3: BUG 1 REGRESSION CHECK (VOCAB SIMULATION W33-W37)
  // -------------------------------------------------------------
  console.log('\n---------------------------------------------------------------');
  console.log('PART 3: BUG 1 REGRESSION CHECK (VOCAB POOLS W33-W37)');
  console.log('---------------------------------------------------------------');
  for (const w of [33, 34, 35, 36, 37]) {
    const res = await getWeeklyPoolWithReview(w, 'vocab');
    console.log(`Week ${w} Vocab: ${res.items.length}/18 items | Error: ${res.meta?.error || false} | Allocations: ${res.meta?.allocations?.map(a => `W${a.weekId}:${a.count}`).join(', ')}`);
  }
}

runComprehensiveAudit().catch(console.error);
