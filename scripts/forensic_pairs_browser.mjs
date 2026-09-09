import puppeteer from 'puppeteer';

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173/week/33/chronicles?room=2', { waitUntil: 'networkidle2', timeout: 30000 });

  const result = await page.evaluate(async () => {
    const { extractCatapultPairs } = await import('/src/modules/chronicles/extractQuestVocab.js');
    const { weekData: w33Data } = await import('/src/data/weeks/week_33/index.js');
    
    // W33 (Curated Story Retell)
    const w33Pairs = extractCatapultPairs(w33Data, 2, 33);

    // W17 (Chapter 1 - Library)
    const w17Pairs = extractCatapultPairs({}, 2, 17);

    // W01 (Lite Mode - Pre-A1 Starters)
    const w01Pairs = extractCatapultPairs({}, 2, 1);

    // W50 (Chapter 5 - The Forge of Words)
    const w50Pairs = extractCatapultPairs({}, 2, 50);

    return {
      w33: w33Pairs,
      w17: w17Pairs,
      w01: w01Pairs,
      w50: w50Pairs,
    };
  });

  console.log('=== WEEK 33 (Corridor Safety - Story Retell) ===');
  result.w33.forEach((p, idx) => {
    console.log(`Pair ${idx + 1}/6: "${p.starter} ... ?" -> [${p.completion}]`);
  });

  console.log('\n=== WEEK 17 (Chapter 1: The Grand Library) ===');
  result.w17.forEach((p, idx) => {
    console.log(`Pair ${idx + 1}/6: "${p.starter} ... ?" -> [${p.completion}]`);
  });

  console.log('\n=== WEEK 01 (Pre-A1 Starters Lite Mode) ===');
  result.w01.forEach((p, idx) => {
    console.log(`Pair ${idx + 1}/6: "${p.starter} ... ?" -> [${p.completion}]`);
  });

  console.log('\n=== WEEK 50 (Chapter 5: The Forge of Words) ===');
  result.w50.forEach((p, idx) => {
    console.log(`Pair ${idx + 1}/6: "${p.starter} ... ?" -> [${p.completion}]`);
  });

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
