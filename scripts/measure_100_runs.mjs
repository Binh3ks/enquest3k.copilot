import puppeteer from 'puppeteer';

async function main() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/room/33/1?door=0&owner=true', { waitUntil: 'networkidle0' });

  const result = await page.evaluate(async () => {
    const contentService = await import('/src/services/contentService.js');
    const normalizeText = (str) => (!str ? '' : String(str).toLowerCase().trim().replace(/[^a-z0-9]/g, ''));

    const sample100 = [];
    const freq = { 8: 0, 9: 0, 10: 0, 11: 0 };

    for (let i = 0; i < 100; i++) {
      const res = await contentService.getWeeklyPoolWithReview(33, 'vocab');
      const rawVocab = res.items || [];
      const vocabItems = rawVocab.filter(item => item.type !== 'grammar' && !item.sentence && !item.definition?.startsWith('Related to'));
      
      const valid = vocabItems.filter(v => v.word && (v.definition || v.def || v.definition_en));
      const currentWeekPool = [];
      const seenWords = new Set();
      const seenDefs = new Set();

      for (const item of valid) {
        if (!item.isReview) {
          const normWord = normalizeText(item.word);
          const normDef = normalizeText(item.definition || item.def || item.definition_en);
          if (normWord && normDef && !seenWords.has(normWord) && !seenDefs.has(normDef)) {
            seenWords.add(normWord);
            seenDefs.add(normDef);
            currentWeekPool.push(item.word);
          }
        }
      }

      const count = currentWeekPool.length;
      freq[count] = (freq[count] || 0) + 1;
      sample100.push(count);
    }

    return { sample100, freq };
  });

  console.log('--- 100 Live Runs Empirical Measurement ---');
  console.log('Sample counts array (100 runs):');
  console.log(JSON.stringify(result.sample100));
  console.log('\nFrequency Table:');
  for (const [k, v] of Object.entries(result.freq)) {
    console.log(`  N = ${k}: ${v}/100 (${v}%)`);
  }

  await browser.close();
}

main().catch(console.error);
