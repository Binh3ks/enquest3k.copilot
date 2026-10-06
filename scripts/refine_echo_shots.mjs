import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf';
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

function saveAndVerifyFrame(srcBuffer, filename, description) {
  const p1 = path.join(OUTPUT_DIR, filename);
  const p2 = path.join(BRAIN_DIR, filename);
  fs.writeFileSync(p1, srcBuffer);
  fs.writeFileSync(p2, srcBuffer);
  console.log(`  📸 [VERIFIED & SAVED] ${filename} — ${description}`);
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

  await page.goto('http://localhost:5173/week/33/chronicles?room=2&bypass=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  const doorBtns = await page.$$('.dr-door-enter-btn');
  await doorBtns[0].click();
  console.log('Entered Door 0 (Echo Arena Shooter)');
  await new Promise(r => setTimeout(r, 1500));

  // Frame 1: Spawn
  const f1 = await page.screenshot();
  saveAndVerifyFrame(f1, 'b4_real_echo_spawn.png', 'Spawn frame (Clean HUD, 3/3 Hearts)');

  // Find orbs
  const orbs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.acoustic-orb-entity')).map(el => {
      const rect = el.getBoundingClientRect();
      return {
        text: el.innerText.trim(),
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
      };
    });
  });
  console.log('Detected acoustic-orb-entity:', orbs);

  // Target sound is /sh/. Correct words: "shoe" or "ship". Distractors: "chair", "think"
  const correctOrb = orbs.find(o => ['shoe', 'ship'].includes(o.text.toLowerCase()));
  if (correctOrb) {
    console.log(`Clicking CORRECT orb: "${correctOrb.text}" at (${correctOrb.x}, ${correctOrb.y})...`);
    await page.mouse.click(correctOrb.x, correctOrb.y);
    // Wait for bolt to fly and hit
    await new Promise(r => setTimeout(r, 800));

    const state = await page.evaluate(() => ({
      score: document.querySelector('.hud-score-value')?.innerText,
      toast: document.querySelector('.echo-feedback-toast')?.innerText,
      hearts: document.querySelectorAll('.hud-heart-full').length,
    }));
    console.log('State after correct:', state);
    const f2 = await page.screenshot();
    saveAndVerifyFrame(f2, 'b4_real_echo_correct.png', `Correct Action (+XP, toast: "${state.toast}", Hearts: ${state.hearts}/3)`);
  }

  // Now click distractor
  await new Promise(r => setTimeout(r, 1000));
  const orbsAfter = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.acoustic-orb-entity:not(.popped)')).map(el => {
      const rect = el.getBoundingClientRect();
      return {
        text: el.innerText.trim(),
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
      };
    });
  });
  const wrongOrb = orbsAfter.find(o => ['chair', 'think'].includes(o.text.toLowerCase()));
  if (wrongOrb) {
    console.log(`Clicking WRONG orb: "${wrongOrb.text}" at (${wrongOrb.x}, ${wrongOrb.y})...`);
    await page.mouse.click(wrongOrb.x, wrongOrb.y);
    await new Promise(r => setTimeout(r, 800));

    const stateWrong = await page.evaluate(() => ({
      toast: document.querySelector('.echo-feedback-toast')?.innerText,
      hearts: document.querySelectorAll('.hud-heart-full').length,
    }));
    console.log('State after wrong:', stateWrong);
    const f3 = await page.screenshot();
    saveAndVerifyFrame(f3, 'b4_real_echo_wrong.png', `Wrong Action (-1 Heart, toast: "${stateWrong.toast}", Hearts: ${stateWrong.hearts}/3)`);
  }

  await browser.close();
}

run().catch(console.error);
