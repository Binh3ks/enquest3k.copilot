import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUTPUT_DIR = 'docs/agent_artifacts/screenshots';
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf';

function saveFrame(buf, filename) {
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), buf);
  fs.writeFileSync(path.join(BRAIN_DIR, filename), buf);
  console.log(`📸 [SAVED] ${filename}`);
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--window-size=1280,820'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto('http://localhost:5173/week/33/chronicles?room=5&bypass=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  const doorBtns = await page.$$('.dr-door-enter-btn');
  if (doorBtns.length >= 3) {
    await doorBtns[2].click();
    console.log('Entered Door 2 (Story Sequencer)');
  }
  await new Promise(r => setTimeout(r, 1500));

  // 1. Capture Spawn
  const spawnBuf = await page.screenshot();
  saveFrame(spawnBuf, 'b5_real_sequencer_spawn.png');

  // 2. Perform CORRECT placement: Find slab with originalOrder === 1, place on Altar 1
  console.log('Placing slab 1 on Altar 1 (CORRECT)...');
  await page.evaluate(() => {
    const hook = window.__STORY_ALTAR_TEST_HOOK__;
    const slabs = hook.getSlabs();
    const idx1 = slabs.findIndex(s => s.originalOrder === 1);
    hook.pickUpImperative(idx1);
  });

  await new Promise(r => setTimeout(r, 150));

  await page.evaluate(() => {
    const hook = window.__STORY_ALTAR_TEST_HOOK__;
    hook.dropOnAltarImperative(1); // Place on Altar 1
  });

  await new Promise(r => setTimeout(r, 300));
  const correctBuf = await page.screenshot();
  saveFrame(correctBuf, 'b5_real_sequencer_correct.png');

  const postCorrect = await page.evaluate(() => ({
    hearts: window.__STORY_ALTAR_TEST_HOOK__?.getHearts(),
    altars: window.__STORY_ALTAR_TEST_HOOK__?.getAltars().map(a => ({ pos: a.pos, hasSlab: !!a.slab })),
    slabsCount: window.__STORY_ALTAR_TEST_HOOK__?.getSlabs().length,
  }));
  console.log('Post Correct State:', postCorrect);

  await new Promise(r => setTimeout(r, 1000));

  // 3. Perform WRONG placement: Find slab with originalOrder === 2, try to place on Altar 4
  console.log('Attempting to place slab 2 on Altar 4 (WRONG)...');
  await page.evaluate(() => {
    const hook = window.__STORY_ALTAR_TEST_HOOK__;
    const slabs = hook.getSlabs();
    const idx2 = slabs.findIndex(s => s.originalOrder === 2);
    hook.pickUpImperative(idx2);
  });

  await new Promise(r => setTimeout(r, 150));

  await page.evaluate(() => {
    const hook = window.__STORY_ALTAR_TEST_HOOK__;
    hook.dropOnAltarImperative(4); // WRONG altar!
  });

  await new Promise(r => setTimeout(r, 200));
  const wrongBuf = await page.screenshot();
  saveFrame(wrongBuf, 'b5_real_sequencer_wrong.png');

  const postWrong = await page.evaluate(() => ({
    hearts: window.__STORY_ALTAR_TEST_HOOK__?.getHearts(),
    altar4Blink: window.__STORY_ALTAR_TEST_HOOK__?.getAltars()[3]?.wrongBlink,
  }));
  console.log('Post Wrong State:', postWrong);

  await new Promise(r => setTimeout(r, 1000));
  await browser.close();
}

run().catch(console.error);
