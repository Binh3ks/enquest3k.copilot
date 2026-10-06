import { loadWeekData } from '../src/data/weeks/index.js';

async function testNaiveSplit() {
  for (const w of [33, 34, 35, 36, 37]) {
    const data = await loadWeekData(w);
    const drills = data?.reading_hub?.clil_article?.sentence_drills || [];
    const smash = data?.listening_hub?.sentence_smash?.sentences || [];
    const all = [...drills, ...smash];
    console.log(`\n=== WEEK ${w} Raw Grammar Sentences (${all.length} sentences) ===`);
    all.slice(0, 3).forEach(s => {
      const text = typeof s === 'string' ? s : (s.sentence || s.text || '');
      const words = text.split(' ');
      const mid = Math.floor(words.length / 2);
      const starter = words.slice(0, mid).join(' ');
      const completion = words.slice(mid).join(' ');
      console.log(`Original: "${text}"`);
      console.log(`  -> Starter:    "${starter}"`);
      console.log(`  -> Completion: "${completion}"`);
    });
  }
}

testNaiveSplit().catch(console.error);
