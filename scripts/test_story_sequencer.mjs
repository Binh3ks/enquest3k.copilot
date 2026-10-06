import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf';
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

function saveFrame(buf, filename, desc) {
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), buf);
  fs.writeFileSync(path.join(BRAIN_DIR, filename), buf);
  console.log(`📸 [SAVED] ${filename} — ${desc}`);
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

  await page.goto(`${BASE_URL}/week/33/chronicles?room=5&bypass=true`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  const doorBtns = await page.$$('.dr-door-enter-btn');
  if (doorBtns.length > 2) {
    await doorBtns[2].click();
    console.log('Entered Door 2 (Story Sequencer)');
  }
  await new Promise(r => setTimeout(r, 1500));

  // Spawn frame
  const spawnBuf = await page.screenshot();
  saveFrame(spawnBuf, 'b5_real_sequencer_spawn.png', 'Spawn frame (5 Altars, 5 Scrambled Slabs in pile, 2 Hearts)');

  // Read slabs from hook
  const slabs = await page.evaluate(() => window.__STORY_ALTAR_TEST_HOOK__?.getSlabs());
  console.log('Slabs from hook:', slabs);

  // 1. Wrong Placement: pick slab with originalOrder !== 1
  const wrongIdx = slabs.findIndex(s => s.originalOrder !== 1);
  console.log(`Pick up slab ${wrongIdx} (order ${slabs[wrongIdx].originalOrder})...`);
  await page.evaluate((idx) => {
    window.__STORY_ALTAR_TEST_HOOK__.pickUpImperative(idx);
  }, wrongIdx);

  // Wait for React state to update heldIdx
  await new Promise(r => setTimeout(r, 200));

  console.log('Dropping on Altar 1 (should fail & trigger heart penalty)...');
  await page.evaluate(() => {
    window.__STORY_ALTAR_TEST_HOOK__.dropOnAltarImperative(1);
  });

  await new Promise(r => setTimeout(r, 120));
  const wrongBuf = await page.screenshot();
  saveFrame(wrongBuf, 'b5_real_sequencer_wrong.png', 'Wrong altar reject (-1 Heart ❤️🖤, Altar 1 red blink)');

  await new Promise(r => setTimeout(r, 1200));

  // 2. Correct Placement: drop on matching altar
  const targetAltarPos = slabs[wrongIdx].originalOrder;
  console.log(`Now dropping held slab onto its correct Altar ${targetAltarPos}...`);
  await page.evaluate((pos) => {
    window.__STORY_ALTAR_TEST_HOOK__.dropOnAltarImperative(pos);
  }, targetAltarPos);

  await new Promise(r => setTimeout(r, 200));
  const correctBuf = await page.screenshot();
  saveFrame(correctBuf, 'b5_real_sequencer_correct.png', `Correct slab placed onto Altar ${targetAltarPos} (rune locked into pedestal)`);

  await new Promise(r => setTimeout(r, 1500));
  await browser.close();
}

run().catch(console.error);
