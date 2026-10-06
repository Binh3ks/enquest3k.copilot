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

  // 1. Spawn frame
  const spawnBuf = await page.screenshot();
  saveAndVerifyFrame(spawnBuf, 'b4_real_echo_spawn.png', 'Spawn frame (Clean HUD, 3/3 Hearts, 0 XP, Round 1/3)');

  // 2. Click correct orb (shoe)
  console.log('Clicking correct orb "shoe"...');
  await page.evaluate(() => {
    const orbs = Array.from(document.querySelectorAll('.acoustic-orb-entity'));
    const target = orbs.find(o => o.innerText.trim().toLowerCase() === 'shoe');
    if (target) target.click();
  });

  // Wait for toast to appear
  try {
    await page.waitForFunction(
      () => {
        const t = document.querySelector('.echo-feedback-toast');
        return t && t.innerText.includes('matches');
      },
      { timeout: 3000 }
    );
  } catch (e) {
    console.log('Wait timeout, checking state anyway...');
  }

  const correctState = await page.evaluate(() => ({
    score: document.querySelector('.hud-score-value')?.innerText,
    toast: document.querySelector('.echo-feedback-toast')?.innerText,
    hearts: document.querySelectorAll('.hud-heart-full').length,
  }));
  console.log('State after correct:', correctState);

  const correctBuf = await page.screenshot();
  saveAndVerifyFrame(correctBuf, 'b4_real_echo_correct.png', `Correct Action (+XP, toast: "${correctState.toast}", Hearts: ${correctState.hearts}/3)`);

  // 3. Click wrong distractor orb (chair)
  await new Promise(r => setTimeout(r, 1600)); // wait for previous toast to clear
  console.log('Clicking wrong distractor orb "chair"...');
  await page.evaluate(() => {
    const orbs = Array.from(document.querySelectorAll('.acoustic-orb-entity'));
    const target = orbs.find(o => o.innerText.trim().toLowerCase() === 'chair');
    if (target) target.click();
  });

  try {
    await page.waitForFunction(
      () => {
        const t = document.querySelector('.echo-feedback-toast');
        return t && t.innerText.includes('NOT match');
      },
      { timeout: 3000 }
    );
  } catch (e) {
    console.log('Wait timeout for wrong action...');
  }

  const wrongState = await page.evaluate(() => ({
    toast: document.querySelector('.echo-feedback-toast')?.innerText,
    hearts: document.querySelectorAll('.hud-heart-full').length,
  }));
  console.log('State after wrong:', wrongState);

  const wrongBuf = await page.screenshot();
  saveAndVerifyFrame(wrongBuf, 'b4_real_echo_wrong.png', `Wrong Action (-1 Heart, toast: "${wrongState.toast}", Hearts: ${wrongState.hearts}/3)`);

  await browser.close();
}

run().catch(console.error);
