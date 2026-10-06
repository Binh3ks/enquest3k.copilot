import puppeteer from 'puppeteer';

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Navigate to dev server
  await page.goto('http://localhost:5173/room/33/1?door=0&owner=true', { waitUntil: 'networkidle0', timeout: 30000 });
  
  const result = await page.evaluate(async () => {
    // Import contentService directly in browser
    const contentService = await import('/src/services/contentService.js');
    
    // 1. Get raw bucket pool for week 33
    const w33Pool = await contentService.loadBucketPool(33, 'vocab');
    
    // 2. Normalization helper from PotionFlipDungeon.jsx
    const normalizeText = (str) => {
      if (!str) return '';
      return String(str).toLowerCase().trim().replace(/[^a-z0-9]/g, '');
    };
    
    // Run EXACT generateCauldrons deduplication logic on w33Pool
    const valid = w33Pool.filter(v => v.word && (v.definition || v.def || v.definition_en));
    const currentWeekPool = [];
    const seenWords = new Set();
    const seenDefs = new Set();
    
    for (const item of valid) {
      const rawWord = item.word;
      const rawDef = item.definition || item.def || item.definition_en;
      const normWord = normalizeText(rawWord);
      const normDef = normalizeText(rawDef);
      if (!normWord || !normDef) continue;
      
      if (!seenWords.has(normWord) && !seenDefs.has(normDef)) {
        seenWords.add(normWord);
        seenDefs.add(normDef);
        currentWeekPool.push({
          word: rawWord.trim(),
          def: rawDef.trim(),
          rawItem: item
        });
      }
    }
    
    // Check if the requested words are in currentWeekPool
    const targetChecks = [
      'get better',
      'accident',
      'explain',
      'stays balanced',
      'school corridor',
      'yellow warning sign',
      'nurse',
      'knee'
    ];
    
    const checkResults = {};
    for (const t of targetChecks) {
      const found = currentWeekPool.find(p => normalizeText(p.word) === normalizeText(t));
      checkResults[t] = found ? { word: found.word, def: found.def } : null;
    }
    
    // Also test getWeeklyPoolWithReview(33, 'vocab')
    const srsRes = await contentService.getWeeklyPoolWithReview(33, 'vocab');
    const srsW33Items = srsRes.items.filter(i => !i.isReview);
    
    return {
      w33RawPoolCount: w33Pool.length,
      distinctW33CauldronCount: currentWeekPool.length,
      allDistinctPairs: currentWeekPool.map(p => ({ word: p.word, def: p.def })),
      checkResults,
      srsW33AllocCount: srsW33Items.length,
      srsW33SampleWords: srsW33Items.map(i => i.word)
    };
  });
  
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
}

main().catch(console.error);
