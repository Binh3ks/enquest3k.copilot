import puppeteer from 'puppeteer';

async function main() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/room/33/1?door=0&owner=true', { waitUntil: 'networkidle0' });

  const result = await page.evaluate(async () => {
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
        rawUnique.push({ word: rawWord, def: rawDef });
      }
    }

    // Helper: extract root tokens
    const getTokens = (str) => str.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);

    // Let's test a Semantic Grouping / Near-Duplicate Detector:
    // Two items A and B are near-duplicates if:
    // 1. One word contains the other as a whole word token (e.g. "corridor" in "school corridor", "warning sign" in "yellow warning sign")
    // 2. OR they share a specific head noun in the same domain (e.g. "soles" in [shoe soles, plastic soles, rubber soles]; "tiles" in [smooth tiles, wet tiles])
    // 3. OR their definition Jaccard similarity >= 0.25 (e.g. plastic soles vs rubber soles)
    
    const areNearDuplicates = (a, b) => {
      const tokensA = getTokens(a.word);
      const tokensB = getTokens(b.word);
      
      // Token overlap in word (e.g. "corridor", "warning", "sign", "soles", "tiles")
      const sharedTokens = tokensA.filter(t => tokensB.includes(t));
      // Ignore very generic stopwords if any, but in vocab nouns like corridor, sign, soles, tiles are key
      const keyShared = sharedTokens.filter(t => ['corridor', 'sign', 'warning', 'soles', 'tiles', 'shoe'].includes(t));
      if (keyShared.length > 0) return { match: true, reason: `Shared key word token: [${keyShared.join(', ')}]` };

      // Substring whole-token check: e.g. "warning sign" in "yellow warning sign"
      const lowerA = a.word.toLowerCase();
      const lowerB = b.word.toLowerCase();
      if (lowerA.includes(lowerB) || lowerB.includes(lowerA)) {
        // Exclude completely different concepts like "head" vs "headmaster" unless desired
        if ((lowerA === 'head' && lowerB === 'headmaster') || (lowerB === 'head' && lowerA === 'headmaster')) {
          // head (body) vs headmaster (person) - conceptually distinct
        } else {
          return { match: true, reason: `Word substring: "${lowerA}" <-> "${lowerB}"` };
        }
      }

      // Definition Jaccard similarity >= 0.25
      const defTokensA = new Set(getTokens(a.def).filter(w => w.length > 3));
      const defTokensB = new Set(getTokens(b.def).filter(w => w.length > 3));
      let inter = 0;
      for (const w of defTokensA) if (defTokensB.has(w)) inter++;
      const union = new Set([...defTokensA, ...defTokensB]).size;
      const jaccard = union > 0 ? inter / union : 0;
      if (jaccard >= 0.25) {
        return { match: true, reason: `Def Jaccard ${(jaccard * 100).toFixed(1)}%` };
      }

      return { match: false };
    };

    // Cluster items into semantic equivalence / conflict groups
    const clusters = [];
    const assigned = new Set();

    for (let i = 0; i < rawUnique.length; i++) {
      if (assigned.has(i)) continue;
      const cluster = [rawUnique[i]];
      assigned.add(i);

      for (let j = i + 1; j < rawUnique.length; j++) {
        if (assigned.has(j)) continue;
        const check = areNearDuplicates(rawUnique[i], rawUnique[j]);
        if (check.match) {
          cluster.push({ ...rawUnique[j], conflictReason: check.reason });
          assigned.add(j);
        }
      }
      clusters.push(cluster);
    }

    return {
      totalInput: rawUnique.length,
      distinctSemanticCount: clusters.length,
      conflictClusters: clusters.filter(c => c.length > 1),
      singletons: clusters.filter(c => c.length === 1).map(c => c[0].word)
    };
  });

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
}

main().catch(console.error);
