import puppeteer from 'puppeteer';

async function main() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/room/33/1?door=0&owner=true', { waitUntil: 'networkidle0' });

  const result = await page.evaluate(async () => {
    const contentService = await import('/src/services/contentService.js');
    const normalizeText = (str) => (!str ? '' : String(str).toLowerCase().trim().replace(/[^a-z0-9]/g, ''));

    // 1. Raw pool from loadBucketPool(33, 'vocab')
    const rawPool = await contentService.loadBucketPool(33, 'vocab');
    
    // Group all 42 items by normalized word
    const wordGroups = {};
    rawPool.forEach((item, idx) => {
      const nw = normalizeText(item.word);
      if (!wordGroups[nw]) wordGroups[nw] = [];
      wordGroups[nw].push({
        idx,
        word: item.word,
        def: item.definition || item.def || item.definition_en,
        source: item.source || item.type || ''
      });
    });

    const duplicateWords = Object.entries(wordGroups)
      .filter(([_, list]) => list.length > 1)
      .map(([nw, list]) => ({
        normalizedWord: nw,
        count: list.length,
        items: list
      }));

    // 2. Run 1000 trials of getWeeklyPoolWithReview + DailyRoomScreen + generateCauldrons
    const trials = 1000;
    const distribution = {};
    
    for (let t = 0; t < trials; t++) {
      const res = await contentService.getWeeklyPoolWithReview(33, 'vocab');
      // DailyRoomScreen filtering:
      const rawVocab = res.items || [];
      const vocabItems = rawVocab.filter(item => item.type !== 'grammar' && !item.sentence && !item.definition?.startsWith('Related to'));
      
      // PotionFlipDungeon currentWeekPool construction:
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
      distribution[count] = (distribution[count] || 0) + 1;
    }

    return {
      rawPoolCount: rawPool.length,
      duplicateWords,
      trials,
      distribution
    };
  });

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
}

main().catch(console.error);
