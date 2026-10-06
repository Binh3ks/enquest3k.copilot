import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

async function testStorySequencer(page, weekNumber, screenshotName) {
  const roomUrl = `/week/${weekNumber}/chronicles?room=5&bypass=true`;
  console.log(`\n================================================================`);
  console.log(`--- Testing Story Sequencer at ${roomUrl} (Floor 6 Door 2) ---`);
  console.log(`================================================================`);
  await page.goto(`${BASE_URL}${roomUrl}`, { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 600));

  const doorBtns = await page.$$('.dr-door-enter-btn');
  if (!doorBtns[2]) {
    throw new Error(`Door 2 enter button not found in room!`);
  }
  await doorBtns[2].click();
  await new Promise(r => setTimeout(r, 1200));

  const domData = await page.evaluate(() => {
    const title = document.querySelector('h1, h2, [class*="title"]')?.innerText?.trim() || '';
    const bodyText = document.body.innerText.slice(0, 700);
    const cardElements = Array.from(document.querySelectorAll('div[style*="border"], div[style*="background"]'))
      .map(el => el.innerText.trim())
      .filter(t => t.length > 20 && !t.includes('STORY SEQUENCER') && !t.includes('TAP A CARD'));
    return { title, bodyText, cardElements: cardElements.slice(0, 5) };
  });

  console.log(`[DOM text for W${weekNumber} Story Sequencer]:\n${domData.bodyText}\n`);

  const picPath = path.join(OUTPUT_DIR, screenshotName);
  await page.screenshot({ path: picPath });
  if (fs.existsSync(BRAIN_DIR)) {
    fs.copyFileSync(picPath, path.join(BRAIN_DIR, screenshotName));
  }
  console.log(`Screenshot saved to: ${picPath}`);

  // Exit back
  const exitBtn = await page.$('button');
  if (exitBtn) {
    const btnText = await page.evaluate(el => el.innerText, exitBtn);
    if (btnText.includes('Chamber') || btnText.includes('Exit') || btnText.includes('←')) {
      await exitBtn.click();
      await new Promise(r => setTimeout(r, 400));
    }
  }

  return { weekNumber, domData, screenshotName };
}

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const results = {};

  // Test W35 Story Sequencer (Mountain Camping Adventure)
  results.w35_f6d3 = await testStorySequencer(
    page,
    35,
    'w35_f6d3_story_sequencer_fixed.png'
  );

  // Test W36 Story Sequencer (My Adventure Book - Leo's Island)
  results.w36_f6d3 = await testStorySequencer(
    page,
    36,
    'w36_f6d3_story_sequencer_fixed.png'
  );

  await browser.close();

  const jsonPath = path.join(OUTPUT_DIR, 'story_sequencer_fix_evidence.json');
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  if (fs.existsSync(BRAIN_DIR)) {
    fs.copyFileSync(jsonPath, path.join(BRAIN_DIR, 'story_sequencer_fix_evidence.json'));
  }
  console.log(`\nAll evidence saved to: ${jsonPath}`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
