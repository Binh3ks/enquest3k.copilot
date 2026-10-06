import puppeteer from 'puppeteer';

async function main() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/room/33/1?door=0&owner=true', { waitUntil: 'networkidle0' });

  const data = await page.evaluate(async () => {
    const contentService = await import('/src/services/contentService.js');
    const w33Pool = await contentService.loadBucketPool(33, 'vocab');
    const normalizeText = (str) => (!str ? '' : String(str).toLowerCase().trim().replace(/[^a-z0-9]/g, ''));
    
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
          def: rawDef.trim()
        });
      }
    }
    return currentWeekPool;
  });

  console.log('Total pool count:', data.length);
  
  // 1. Substring matches in words
  console.log('\n=== 1. WORD SUBSTRING MATCHES ===');
  const substringPairs = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      const w1 = data[i].word.toLowerCase();
      const w2 = data[j].word.toLowerCase();
      if (w1.includes(w2) || w2.includes(w1)) {
        substringPairs.push({ a: data[i], b: data[j] });
        console.log(`[WORD SUBSTRING] "${data[i].word}" <-> "${data[j].word}"`);
        console.log(`  A: "${data[i].def}"`);
        console.log(`  B: "${data[j].def}"`);
      }
    }
  }

  // 2. Shared root noun / key token matches (e.g. tiles, soles, sign, corridor)
  console.log('\n=== 2. SHARED NOUN TOKENS ===');
  const tokenPairs = [];
  const keyTokens = ['corridor', 'sign', 'tiles', 'soles', 'pack', 'friction', 'kit'];
  for (const token of keyTokens) {
    const matching = data.filter(item => item.word.toLowerCase().split(/\s+/).includes(token) || item.word.toLowerCase().endsWith(token));
    if (matching.length > 1) {
      console.log(`Token [${token}] shared by ${matching.length} items:`, matching.map(m => m.word));
      for (const m of matching) {
        console.log(`   - "${m.word}": "${m.def}"`);
      }
    }
  }

  // 3. Jaccard word-overlap in definitions
  console.log('\n=== 3. DEFINITION WORD OVERLAP (Jaccard >= 0.3) ===');
  const tokenize = (str) => new Set(str.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3));
  for (let i = 0; i < data.length; i++) {
    const setA = tokenize(data[i].def);
    for (let j = i + 1; j < data.length; j++) {
      const setB = tokenize(data[j].def);
      let intersection = 0;
      for (const w of setA) {
        if (setB.has(w)) intersection++;
      }
      const union = new Set([...setA, ...setB]).size;
      const jaccard = union > 0 ? intersection / union : 0;
      if (jaccard >= 0.25) {
        console.log(`[DEF SIMILARITY ${(jaccard * 100).toFixed(1)}%] "${data[i].word}" <-> "${data[j].word}"`);
        console.log(`  A: "${data[i].def}"`);
        console.log(`  B: "${data[j].def}"`);
      }
    }
  }

  // Also check non-blocking question: measure N_session in DailyRoomScreen
  console.log('\n=== 4. CHECK N_session in DailyRoomScreen ===');
  const sessionResult = await page.evaluate(async () => {
    const contentService = await import('/src/services/contentService.js');
    const normalizeText = (str) => (!str ? '' : String(str).toLowerCase().trim().replace(/[^a-z0-9]/g, ''));
    
    const counts = [];
    for (let r = 0; r < 20; r++) {
      const res = await contentService.getWeeklyPoolWithReview(33, 'vocab');
      // Simulate DailyRoomScreen:
      const rawVocab = res.items || [];
      const vocabItems = rawVocab.filter(item => item.type !== 'grammar' && !item.sentence && !item.definition?.startsWith('Related to'));
      
      // Simulate PotionFlipDungeon currentWeekPool:
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
      counts.push(currentWeekPool.length);
    }
    return counts;
  });
  console.log('Sample of 20 runs for N_session:', sessionResult);
  const freq = {};
  sessionResult.forEach(c => freq[c] = (freq[c] || 0) + 1);
  console.log('N_session frequencies:', freq);

  await browser.close();
}

main().catch(console.error);
