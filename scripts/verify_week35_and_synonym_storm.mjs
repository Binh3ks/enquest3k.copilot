import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

async function testGameDoor(page, roomUrl, doorIdx, gameName, screenshotName) {
  console.log(`\n================================================================`);
  console.log(`--- Testing ${gameName} at ${roomUrl} (Door ${doorIdx}) ---`);
  console.log(`================================================================`);
  await page.goto(`${BASE_URL}${roomUrl}`, { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 600));

  const doorBtns = await page.$$('.dr-door-enter-btn');
  if (!doorBtns[doorIdx]) {
    throw new Error(`Door ${doorIdx} enter button not found in room!`);
  }
  await doorBtns[doorIdx].click();
  await new Promise(r => setTimeout(r, 1000));

  const domData = await page.evaluate(() => {
    const title = document.querySelector('h1, h2, div[style*="font-size: 1.5rem"], [class*="title"]')?.innerText?.trim() || '';
    const bodyText = document.body.innerText.slice(0, 500);
    const hasCanvas = Boolean(document.querySelector('canvas'));
    const buttonCount = document.querySelectorAll('button').length;
    const cards = Array.from(document.querySelectorAll('button, div[style*="border"], div[style*="background"]'))
      .map(el => el.innerText.trim())
      .filter(t => t.length > 5 && t.length < 150);
    return { title, bodyText, hasCanvas, buttonCount, sampleCards: cards.slice(0, 6) };
  });

  console.log(`[DOM text for ${gameName}]:\n${domData.bodyText}\n`);

  const picPath = path.join(OUTPUT_DIR, screenshotName);
  await page.screenshot({ path: picPath });
  fs.copyFileSync(picPath, path.join(BRAIN_DIR, screenshotName));
  console.log(`Screenshot saved to: ${picPath}`);

  // Exit back to room map
  const exitBtn = await page.$('button');
  if (exitBtn) {
    const btnText = await page.evaluate(el => el.innerText, exitBtn);
    if (btnText.includes('Chamber') || btnText.includes('Exit') || btnText.includes('←')) {
      await exitBtn.click();
      await new Promise(r => setTimeout(r, 400));
    }
  }

  return { gameName, domData, screenshotName };
}

async function runWeek35AndSynonymVerification() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const results = {};

  // ─── 1. VIỆC Z: SYNONYM STORM (F6D1) ON WEEK 34 ───────────────────────────
  console.log('\n>>> VIỆC Z: TESTING SYNONYM STORM ON WEEK 34 (EXPECTING MIGHTY/TINY...) <<<');
  results.w34_f6d1 = await testGameDoor(
    page,
    '/week/34/chronicles?room=5&bypass=true',
    0,
    'W34 Synonym Storm (F6D1)',
    'w34_f6d1_synonym_storm_live.png'
  );

  // ─── 2. VIỆC Z: SYNONYM STORM (F6D1) ON WEEK 35 ───────────────────────────
  console.log('\n>>> VIỆC Z: TESTING SYNONYM STORM ON WEEK 35 (EXPECTING BRAVE/CLEVER/DISCOVER...) <<<');
  results.w35_f6d1 = await testGameDoor(
    page,
    '/week/35/chronicles?room=5&bypass=true',
    0,
    'W35 Synonym Storm (F6D1)',
    'w35_f6d1_synonym_storm_live.png'
  );

  // ─── 3. VIỆC Y: WEEK 35 (MOUNTAIN CAMPING) FLOOR 6-7 ALL 5 GAMES ─────────
  console.log('\n>>> VIỆC Y: TESTING FLOOR 6-7 GAMES ON UN-HARDCODED WEEK 35 <<<');

  // W35 Floor 6 Door 1: Connector Relay (F6D2)
  results.w35_f6d2 = await testGameDoor(
    page,
    '/week/35/chronicles?room=5&bypass=true',
    1,
    'W35 Connector Relay (F6D2)',
    'w35_f6d2_connector_relay_live.png'
  );

  // W35 Floor 6 Door 2: Story Sequencer (F6D3)
  results.w35_f6d3 = await testGameDoor(
    page,
    '/week/35/chronicles?room=5&bypass=true',
    2,
    'W35 Story Sequencer (F6D3)',
    'w35_f6d3_story_sequencer_live.png'
  );

  // W35 Floor 7 Door 0: Word Forge Scramble (F7D1)
  results.w35_f7d1 = await testGameDoor(
    page,
    '/week/35/chronicles?room=6&bypass=true',
    0,
    'W35 Word Forge Scramble (F7D1)',
    'w35_f7d1_word_forge_scramble_live.png'
  );

  // W35 Floor 7 Door 1: Question Quest (F7D2)
  results.w35_f7d2 = await testGameDoor(
    page,
    '/week/35/chronicles?room=6&bypass=true',
    1,
    'W35 Question Quest (F7D2)',
    'w35_f7d2_question_quest_live.png'
  );

  // W35 Floor 7 Door 2: Word Class Duel (F7D3)
  results.w35_f7d3 = await testGameDoor(
    page,
    '/week/35/chronicles?room=6&bypass=true',
    2,
    'W35 Word Class Duel (F7D3)',
    'w35_f7d3_word_class_duel_live.png'
  );

  await page.close();
  await browser.close();

  console.log('\n================================================================');
  console.log('VIỆC Y & VIỆC Z VERIFICATION RESULTS SUMMARY:');
  console.log('================================================================');
  for (const [key, val] of Object.entries(results)) {
    console.log(`\n[${key} - ${val.gameName}]:`);
    console.log(val.domData.bodyText.replace(/\n+/g, ' | '));
  }

  // Save evidence to JSON
  const evidencePath = path.join(OUTPUT_DIR, 'week35_and_synonym_evidence.json');
  fs.writeFileSync(evidencePath, JSON.stringify(results, null, 2));
  fs.copyFileSync(evidencePath, path.join(BRAIN_DIR, 'week35_and_synonym_evidence.json'));
  console.log(`\nEvidence saved to: ${evidencePath}`);
}

runWeek35AndSynonymVerification().catch(err => {
  console.error('ERROR in Week 35 & Synonym verification:', err);
  process.exit(1);
});
