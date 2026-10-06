import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173';
const SCREENSHOTS_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_ARTIFACT_DIR = path.resolve(process.env.APP_DATA_DIR || '/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf');

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--window-size=1280,820', '--no-sandbox'],
    defaultViewport: { width: 1280, height: 800 },
  });

  try {
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/week/33/chronicles?room=0&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    const doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[1].click();
    await page.waitForSelector('.word-wagon-container');
    await new Promise(r => setTimeout(r, 1000));

    // 1. Inspect all wagon texts and identify options
    const wagonInfo = await page.evaluate(() => {
      const wagons = Array.from(document.querySelectorAll('.train-wagon-entity'));
      const words = wagons.map(w => ({
        text: w.querySelector('.wagon-roof-text')?.innerText.trim(),
        isGremlin: w.classList.contains('wagon-gremlin'),
      }));
      const bannerText = document.querySelector('.wagon-sentence-banner')?.innerText;
      return { words, bannerText };
    });

    console.log('Wagon Info on DOM:', JSON.stringify(wagonInfo, null, 2));

    // The distractors in sentence 1 are 'running' and 'sleeping' (or options).
    // The Gremlin is '👾 GREMLIN'.
    // The target word is whichever word is NOT 'running', NOT 'sleeping', NOT '👾 GREMLIN'!
    const correctItem = wagonInfo.words.find(w => !w.isGremlin && w.text !== 'running' && w.text !== 'sleeping' && w.text !== 'stairs.' && w.text !== 'door.');
    console.log('Detected Correct Target Word:', correctItem?.text);

    // 2. Click the wagon that matches the correct targetWord
    await page.evaluate((targetWord) => {
      const wagonElements = Array.from(document.querySelectorAll('.train-wagon-entity'));
      const targetEl = wagonElements.find(el => el.querySelector('.wagon-roof-text')?.innerText.trim() === targetWord);
      if (targetEl) {
        targetEl.click();
      }
    }, correctItem?.text);

    // Wait for state to settle (banner feedback, score +25 XP)
    await new Promise(r => setTimeout(r, 400));

    // 3. Verify DOM state before taking screenshot
    const stateVerification = await page.evaluate(() => {
      const score = document.querySelector('.hud-score')?.innerText;
      const hearts = document.querySelectorAll('.hud-heart-full').length;
      const feedback = document.querySelector('.wagon-feedback-text')?.innerText || document.querySelector('.wagon-sentence-banner')?.innerText;
      const filledSlot = document.querySelector('.filled-blank-tag')?.innerText;
      const wagonStatus = Array.from(document.querySelectorAll('.train-wagon-entity')).map(el => el.className);
      return { score, hearts, feedback, filledSlot, wagonStatus };
    });

    console.log('DOM State after Click:', JSON.stringify(stateVerification, null, 2));

    // 4. Capture screenshot
    const buf = await page.screenshot();
    const filePath1 = path.join(SCREENSHOTS_DIR, 'b3_real_wagon_correct.png');
    const filePath2 = path.join(BRAIN_ARTIFACT_DIR, 'b3_real_wagon_correct.png');
    fs.writeFileSync(filePath1, buf);
    fs.writeFileSync(filePath2, buf);
    console.log(`[SAVED] b3_real_wagon_correct.png (${buf.length} bytes) to ${filePath1}`);

  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
