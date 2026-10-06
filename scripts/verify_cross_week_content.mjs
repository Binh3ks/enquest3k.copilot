import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

async function testGameDoor(page, roomUrl, doorIdx, gameName, screenshotName) {
  console.log(`\n--- Testing ${gameName} at ${roomUrl} (Door ${doorIdx}) ---`);
  await page.goto(`${BASE_URL}${roomUrl}`, { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 600));

  const doorBtns = await page.$$('.dr-door-enter-btn');
  if (!doorBtns[doorIdx]) {
    throw new Error(`Door ${doorIdx} enter button not found in room!`);
  }
  await doorBtns[doorIdx].click();
  await new Promise(r => setTimeout(r, 800));

  const bodySnippet = await page.evaluate(() => {
    return document.body.innerText.slice(0, 400);
  });
  console.log(`[DOM text snippet for ${gameName}]:\n${bodySnippet}\n`);

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

  return { gameName, bodySnippet, screenshotName };
}

async function runCrossWeekVerification() {
  console.log('================================================================');
  console.log('VIỆC X: VERIFYING DYNAMIC CROSS-WEEK CONTENT (W33 vs W34)');
  console.log('================================================================');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const results = {};

  // ─── 1. WEEK 34 TESTING (THE LION AND THE MOUSE) ─────────────────────────
  console.log('\n>>> TESTING WEEK 34 (EXPECTING LION & MOUSE, NO JAKE/CORRIDOR) <<<');

  // W34 Floor 6 Door 1: Connector Relay
  results.w34_f6d2 = await testGameDoor(
    page,
    '/week/34/chronicles?room=5&bypass=true',
    1,
    'W34 Connector Relay (F6D2)',
    'w34_f6d2_connector_relay_live.png'
  );

  // W34 Floor 6 Door 2: Story Sequencer
  results.w34_f6d3 = await testGameDoor(
    page,
    '/week/34/chronicles?room=5&bypass=true',
    2,
    'W34 Story Sequencer (F6D3)',
    'w34_f6d3_story_sequencer_live.png'
  );

  // W34 Floor 7 Door 1: Question Quest
  results.w34_f7d2 = await testGameDoor(
    page,
    '/week/34/chronicles?room=6&bypass=true',
    1,
    'W34 Question Quest (F7D2)',
    'w34_f7d2_question_quest_live.png'
  );

  // W34 Floor 7 Door 2: Word Class Duel
  results.w34_f7d3 = await testGameDoor(
    page,
    '/week/34/chronicles?room=6&bypass=true',
    2,
    'W34 Word Class Duel (F7D3)',
    'w34_f7d3_word_class_duel_live.png'
  );

  // ─── 2. WEEK 33 TESTING (CORRIDOR SAFETY / JAKE) ──────────────────────────
  console.log('\n>>> TESTING WEEK 33 (EXPECTING JAKE & CORRIDOR SAFETY) <<<');

  // W33 Floor 6 Door 1: Connector Relay
  results.w33_f6d2 = await testGameDoor(
    page,
    '/week/33/chronicles?room=5&bypass=true',
    1,
    'W33 Connector Relay (F6D2)',
    'w33_f6d2_connector_relay_live.png'
  );

  // W33 Floor 6 Door 2: Story Sequencer
  results.w33_f6d3 = await testGameDoor(
    page,
    '/week/33/chronicles?room=5&bypass=true',
    2,
    'W33 Story Sequencer (F6D3)',
    'w33_f6d3_story_sequencer_live.png'
  );

  // W33 Floor 7 Door 1: Question Quest
  results.w33_f7d2 = await testGameDoor(
    page,
    '/week/33/chronicles?room=6&bypass=true',
    1,
    'W33 Question Quest (F7D2)',
    'w33_f7d2_question_quest_live.png'
  );

  // W33 Floor 7 Door 2: Word Class Duel
  results.w33_f7d3 = await testGameDoor(
    page,
    '/week/33/chronicles?room=6&bypass=true',
    2,
    'W33 Word Class Duel (F7D3)',
    'w33_f7d3_word_class_duel_live.png'
  );

  await page.close();
  await browser.close();

  console.log('\n================================================================');
  console.log('SUMMARY OF CROSS-WEEK DOM TEXT VERIFICATION:');
  console.log('================================================================');
  for (const [key, val] of Object.entries(results)) {
    console.log(`\n[${key} - ${val.gameName}]:`);
    console.log(val.bodySnippet.replace(/\n+/g, ' | '));
  }

  // Save evidence to JSON
  const evidencePath = path.join(OUTPUT_DIR, 'cross_week_verification_evidence.json');
  fs.writeFileSync(evidencePath, JSON.stringify(results, null, 2));
  fs.copyFileSync(evidencePath, path.join(BRAIN_DIR, 'cross_week_verification_evidence.json'));
  console.log(`\nEvidence saved to: ${evidencePath}`);
}

runCrossWeekVerification().catch(err => {
  console.error('ERROR in cross-week verification:', err);
  process.exit(1);
});
