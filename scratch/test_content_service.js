import { getWeeklyPoolWithReview } from '../src/services/contentService.js';

async function testScenarios() {
  console.log('==============================================');
  console.log('AUDIT L.4: TESTING CONTENT SERVICE IN REALITY');
  console.log('==============================================');

  // Scenario 1: Chapter Start (W33 - previous weeks W30-32 have 0 data)
  // Scenario 2: Full data with review (W35 - review W34, W33 available)
  // Scenario 3: Partial missing data (W36 - review W35, W34, W33)
  const testWeeks = [33, 35, 36];

  for (const w of testWeeks) {
    console.log(`\n--------------------------------------------`);
    console.log(`>>> TESTING WEEK ${w}`);
    console.log(`--------------------------------------------`);

    // 1. Test Vocab Bucket (Highway Runner)
    const vocabRes = await getWeeklyPoolWithReview(w, 'vocab');
    console.log(`\n[Highway Runner - Vocab Bucket]:`);
    console.log(`- Target size requested: 18`);
    console.log(`- Total items received: ${vocabRes.items.length}`);
    console.log(`- Meta:`, JSON.stringify(vocabRes.meta));
    console.log(`- Meets Highway Runner requirement (>= 4 items)?: ${vocabRes.items.length >= 4 ? 'YES ✅' : 'NO ❌'}`);
    console.log(`- Sample first 3 vocab items:`, vocabRes.items.slice(0, 3).map(i => ({ word: i.word, def: i.definition?.slice(0, 40) })));

    // 2. Test Grammar Bucket (Chunk Catapult)
    const grammarRes = await getWeeklyPoolWithReview(w, 'grammar');
    console.log(`\n[Chunk Catapult - Grammar Bucket]:`);
    console.log(`- Target size requested: 8`);
    console.log(`- Total items received: ${grammarRes.items.length}`);
    console.log(`- Meta:`, JSON.stringify(grammarRes.meta));
    
    // Check how many have curated starter/completion vs raw sentences
    let curatedCount = 0;
    let rawSentenceCount = 0;
    const splitPairs = grammarRes.items.map(item => {
      if (item.starter && item.completion) {
        curatedCount++;
        return { type: 'CURATED', starter: item.starter, completion: item.completion };
      }
      rawSentenceCount++;
      const words = (item.sentence || item.word || '').split(' ');
      const mid = Math.floor(words.length / 2);
      return {
        type: 'NAIVE_SPLIT',
        raw: item.sentence,
        starter: words.slice(0, mid).join(' '),
        completion: words.slice(mid).join(' ')
      };
    });

    console.log(`- Breakdown: Curated pairs = ${curatedCount}, Raw sentences (chopped by adapter) = ${rawSentenceCount}`);
    console.log(`- Samples received by ChunkCatapultCanvas:`);
    splitPairs.slice(0, 4).forEach((p, idx) => {
      if (p.type === 'CURATED') {
        console.log(`  [${idx+1}] (Curated) "${p.starter}" + "${p.completion}"`);
      } else {
        console.log(`  [${idx+1}] (NAIVE SPLIT) Raw: "${p.raw}"`);
        console.log(`      => Starter: "${p.starter}" | Completion: "${p.completion}"`);
      }
    });
  }
}

testScenarios().catch(err => console.error(err));
