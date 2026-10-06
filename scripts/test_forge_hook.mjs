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

  await page.goto('http://localhost:5173/week/33/chronicles?room=6&bypass=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  const doorBtns = await page.$$('.dr-door-enter-btn');
  if (doorBtns.length > 0) {
    await doorBtns[0].click();
  }
  await new Promise(r => setTimeout(r, 1500));

  // 1. Capture Spawn in this session
  const spawnBuf = await page.screenshot();
  saveFrame(spawnBuf, 'b5_real_forge_spawn.png');

  const targetWord = await page.evaluate(() => window.__WORD_FORGE_TEST_HOOK__?.getTargetWord());
  console.log('Target Word:', targetWord);

  const firstLetter = targetWord[0];
  console.log('Testing CORRECT with letter:', firstLetter);

  // 2. Simulate pickup first letter & deposit
  await page.evaluate((letter) => {
    window.__WORD_FORGE_TEST_HOOK__.simulatePickupRune(letter);
    window.__WORD_FORGE_TEST_HOOK__.setLeoPosition(430, 220);
  }, firstLetter);

  await new Promise(r => setTimeout(r, 300));

  await page.evaluate(() => {
    window.__WORD_FORGE_TEST_HOOK__.triggerInteract();
  });

  await new Promise(r => setTimeout(r, 150));
  const correctBuf = await page.screenshot();
  saveFrame(correctBuf, 'b5_real_forge_correct.png');

  await new Promise(r => setTimeout(r, 1500));

  // 3. Test WRONG with distractor
  const distractorLetter = await page.evaluate(() => {
    const word = window.__WORD_FORGE_TEST_HOOK__.getTargetWord();
    const runes = window.__WORD_FORGE_TEST_HOOK__.getCurrentRunes();
    const d = runes.find(r => !word.includes(r.char) && !r.isPlaced);
    return d ? d.char : 'Z';
  });
  console.log('Testing WRONG with distractor letter:', distractorLetter);

  await page.evaluate((letter) => {
    window.__WORD_FORGE_TEST_HOOK__.resetInvincible();
    window.__WORD_FORGE_TEST_HOOK__.simulatePickupRune(letter);
    window.__WORD_FORGE_TEST_HOOK__.setLeoPosition(430, 220);
  }, distractorLetter);

  await new Promise(r => setTimeout(r, 300));

  await page.evaluate(() => {
    window.__WORD_FORGE_TEST_HOOK__.triggerInteract();
  });

  await new Promise(r => setTimeout(r, 150));
  const wrongBuf = await page.screenshot();
  saveFrame(wrongBuf, 'b5_real_forge_wrong.png');

  await new Promise(r => setTimeout(r, 1000));
  await browser.close();
}

run().catch(console.error);
