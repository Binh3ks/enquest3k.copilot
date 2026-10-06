import puppeteer from 'puppeteer';

async function main() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/room/33/1?door=0&owner=true', { waitUntil: 'networkidle0' });

  const simResult = await page.evaluate(async () => {
    const contentService = await import('/src/services/contentService.js');
    const w33Pool = await contentService.loadBucketPool(33, 'vocab');
    const normalizeText = (str) => (!str ? '' : String(str).toLowerCase().trim().replace(/[^a-z0-9]/g, ''));
    
    const valid = w33Pool.filter(v => v.word && (v.definition || v.def || v.definition_en));
    const rawUnique = [];
    const seenW = new Set();
    const seenD = new Set();
    
    for (const item of valid) {
      const rawWord = item.word.trim();
      const rawDef = (item.definition || item.def || item.definition_en).trim();
      const nw = normalizeText(rawWord);
      const nd = normalizeText(rawDef);
      if (!nw || !nd) continue;
      if (!seenW.has(nw) && !seenD.has(nd)) {
        seenW.add(nw);
        seenD.add(nd);
        rawUnique.push({ word: rawWord, def: rawDef, source: 'week33' });
      }
    }

    const getTokens = (str) => str.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);

    function isNearDuplicate(itemA, itemB) {
      const wA = itemA.word.toLowerCase();
      const wB = itemB.word.toLowerCase();

      // 1. Substring containment
      if (wA.includes(wB) || wB.includes(wA)) {
        return true;
      }

      // 2. Shared root noun in compound phrases (e.g. soles, tiles, sign)
      const tokensA = getTokens(wA);
      const tokensB = getTokens(wB);
      const shared = tokensA.filter(t => tokensB.includes(t) && t.length >= 4);
      if (shared.length > 0) {
        return true;
      }

      // 3. Definition Jaccard similarity >= 0.25
      const defA = new Set(getTokens(itemA.def).filter(t => t.length > 3));
      const defB = new Set(getTokens(itemB.def).filter(t => t.length > 3));
      let inter = 0;
      for (const t of defA) if (defB.has(t)) inter++;
      const union = new Set([...defA, ...defB]).size;
      if (union > 0 && inter / union >= 0.25) {
        return true;
      }

      return false;
    }

    function canAdd(candidate, selectedList) {
      for (const sel of selectedList) {
        if (isNearDuplicate(candidate, sel)) return false;
      }
      return true;
    }

    function fisherYatesShuffle(arr) {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    // Run 1000 simulated draws of 5 items from rawUnique
    let successCount = 0;
    let fallbackCount = 0;
    const sampleHands = [];

    for (let sim = 0; sim < 1000; sim++) {
      const shuffled = fisherYatesShuffle(rawUnique);
      const selected = [];
      for (const item of shuffled) {
        if (canAdd(item, selected)) {
          selected.push(item);
          if (selected.length === 5) break;
        }
      }
      if (selected.length === 5) {
        successCount++;
        if (sampleHands.length < 5) {
          sampleHands.push(selected.map(s => s.word));
        }
      } else {
        fallbackCount++;
      }
    }

    // Also test in a session with only 11 items
    let sessionSuccessCount = 0;
    let sessionFallbackCount = 0;
    for (let sim = 0; sim < 1000; sim++) {
      // Pick 11 items random as SRS slice
      const sessionSlice = fisherYatesShuffle(rawUnique).slice(0, 11);
      const selected = [];
      for (const item of sessionSlice) {
        if (canAdd(item, selected)) {
          selected.push(item);
          if (selected.length === 5) break;
        }
      }
      if (selected.length === 5) {
        sessionSuccessCount++;
      } else {
        sessionFallbackCount++;
      }
    }

    return {
      masterPoolSize: rawUnique.length,
      simMasterSuccessRate: `${(successCount / 1000 * 100).toFixed(2)}%`,
      simSessionSuccessRate: `${(sessionSuccessCount / 1000 * 100).toFixed(2)}%`,
      sampleHands
    };
  });

  console.log(JSON.stringify(simResult, null, 2));
  await browser.close();
}

main().catch(console.error);
