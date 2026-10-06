import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173';
const SCREENSHOTS_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_ARTIFACT_DIR = path.resolve(process.env.APP_DATA_DIR || '/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf');

function saveFrame(buf, filename, desc) {
  fs.writeFileSync(path.join(SCREENSHOTS_DIR, filename), buf);
  fs.writeFileSync(path.join(BRAIN_ARTIFACT_DIR, filename), buf);
  console.log(`[SAVED] ${filename} (${buf.length} bytes) - ${desc}`);
}

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--window-size=1280,820', '--no-sandbox'],
    defaultViewport: { width: 1280, height: 800 },
  });

  try {
    // 1. Refine WordWagonJump Correct & Wrong
    console.log('--- Refining WordWagonJump Correct ---');
    const pageWagon = await browser.newPage();
    await pageWagon.goto(`${BASE_URL}/week/33/chronicles?room=0&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    const doorBtns = await pageWagon.$$('.dr-door-enter-btn');
    await doorBtns[1].click();
    await pageWagon.waitForSelector('.word-wagon-container');
    await new Promise(r => setTimeout(r, 1000));

    // Click the correct wagon to board and score
    await pageWagon.evaluate(() => {
      // Find wagon elements
      const wagons = Array.from(document.querySelectorAll('.train-wagon-entity'));
      // Find the one that doesn't have gremlin
      const normalWagons = wagons.filter(w => !w.classList.contains('wagon-gremlin'));
      if (normalWagons.length > 0) {
        normalWagons[0].click();
      }
    });
    await new Promise(r => setTimeout(r, 500));

    const wagonCorrectBuf = await pageWagon.screenshot();
    saveFrame(wagonCorrectBuf, 'b3_real_wagon_correct.png', 'Correct wagon boarded (+25 XP, 3/3 hearts, banner feedback)');
    await pageWagon.close();

    // WordWagonJump Wrong (Hit Gremlin Wagon -> 2/3 hearts)
    console.log('--- Refining WordWagonJump Wrong ---');
    const pageWagon2 = await browser.newPage();
    await pageWagon2.goto(`${BASE_URL}/week/33/chronicles?room=0&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    const doorBtns2 = await pageWagon2.$$('.dr-door-enter-btn');
    await doorBtns2[1].click();
    await pageWagon2.waitForSelector('.word-wagon-container');
    await new Promise(r => setTimeout(r, 1000));

    // Click the gremlin wagon
    await pageWagon2.evaluate(() => {
      const gremlin = document.querySelector('.wagon-gremlin') || document.querySelectorAll('.train-wagon-entity')[3];
      if (gremlin) {
        gremlin.click();
      }
    });
    await new Promise(r => setTimeout(r, 500));

    const wagonWrongBuf = await pageWagon2.screenshot();
    saveFrame(wagonWrongBuf, 'b3_real_wagon_wrong.png', 'Gremlin wagon hazard (-1 heart, 2/3 hearts ❤️❤️🖤, red alert)');
    await pageWagon2.close();

    // 2. Refine AnvilRush Correct (+30 XP feedback)
    console.log('--- Refining AnvilRush Correct ---');
    const pageAnvil = await browser.newPage();
    await pageAnvil.goto(`${BASE_URL}/week/33/chronicles?room=1&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    const doorBtns3 = await pageAnvil.$$('.dr-door-enter-btn');
    await doorBtns3[1].click();
    await pageAnvil.waitForSelector('.anvil-rush-container');
    await new Promise(r => setTimeout(r, 1000));

    // Click the correct anvil (the shortest word length is the stem blankWord)
    await pageAnvil.evaluate(() => {
      const anvilElements = Array.from(document.querySelectorAll('.anvil-entity'));
      const words = anvilElements.map(a => a.querySelector('.anvil-word-plaque')?.innerText.trim() || '');
      const sortedByLen = [...words].sort((a, b) => a.length - b.length);
      const shortest = sortedByLen[0];
      const targetEl = anvilElements.find(a => (a.querySelector('.anvil-word-plaque')?.innerText.trim() || '') === shortest);
      if (targetEl) targetEl.click();
    });
    await new Promise(r => setTimeout(r, 500));

    const anvilCorrectBuf = await pageAnvil.screenshot();
    saveFrame(anvilCorrectBuf, 'b3_real_anvil_correct.png', 'Rune forged banner (+30 XP, 3/3 hearts, feedback)');
    await pageAnvil.close();

  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
