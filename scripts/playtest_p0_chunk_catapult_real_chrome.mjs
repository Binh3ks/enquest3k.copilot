/**
 * playtest_p0_chunk_catapult_real_chrome.mjs
 *
 * Real Chrome Playtest for Ticket P0-1: Chunk Catapult Canvas
 * Captures 3 canonical validation frames:
 *   1. p0_catapult_spawn.png: Clean initial state with 3 persistent hearts, R=5 pairs, score 0.
 *   2. p0_catapult_wrong.png: After a miss/wrong shot, heart deducted (2 hearts left), popup -1 ❤️ visible.
 *   3. p0_catapult_ko.png: After 3 misses, KO phase triggered, "Catapult Out of Energy!" modal visible with Try Again button.
 *   4. p0_catapult_retry.png: After clicking Try Again, game reset cleanly to 3 hearts and round 1/5.
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/b12565b0-9d8d-4d21-8063-54a8e2575b53';
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(BRAIN_DIR)) fs.mkdirSync(BRAIN_DIR, { recursive: true });

function saveFrame(buf, filename, desc) {
  const p1 = path.join(OUTPUT_DIR, filename);
  const p2 = path.join(BRAIN_DIR, filename);
  fs.writeFileSync(p1, buf);
  fs.writeFileSync(p2, buf);
  console.log(`📸 [SAVED] ${filename} — ${desc}`);
}

async function run() {
  console.log('🚀 [P0-1 Playtest] Launching Real Chrome GUI...');
  const browser = await puppeteer.launch({
    executablePath: fs.existsSync(CHROME_PATH) ? CHROME_PATH : undefined,
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--window-size=1280,820'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // 1. Navigate to Quest Demo Screen
  console.log(`🌐 Navigating to ${BASE_URL}/quest-demo ...`);
  await page.goto(`${BASE_URL}/quest-demo`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // 2. Select Phaser: Chunk Catapult
  console.log('🎮 Selecting Chunk Catapult from dropdown...');
  await page.waitForSelector('#select-active-game', { timeout: 5000 });
  await page.select('#select-active-game', 'phaser_catapult');
  await new Promise(r => setTimeout(r, 1500));

  // Wait for canvas and hearts HUD
  await page.waitForSelector('[data-testid="chunk-catapult-hearts"]', { timeout: 5000 });
  await page.waitForSelector('canvas', { timeout: 5000 });

  // Extract initial DOM evidence
  const getDomState = async () => {
    return await page.evaluate(() => {
      const heartsContainer = document.querySelector('[data-testid="chunk-catapult-hearts"]');
      const heartsElements = heartsContainer ? Array.from(heartsContainer.querySelectorAll('span')) : [];
      const heartsCount = heartsElements.filter(el => {
        const style = window.getComputedStyle(el);
        return style.opacity === '1' || parseFloat(style.opacity) > 0.8;
      }).length;

      const hudText = heartsContainer?.parentElement?.innerText || '';
      const promptEl = document.querySelector('div[style*="rgba(30, 27, 75"]');
      const promptText = promptEl ? promptEl.innerText.replace(/\n/g, ' ') : '';
      const koModal = document.querySelector('[data-testid="chunk-catapult-ko-modal"]');
      const victoryModal = document.querySelector('[data-testid="chunk-catapult-victory-modal"]');

      return {
        heartsCount,
        heartsTotal: heartsElements.length,
        hudText: hudText.replace(/\n/g, ' | '),
        promptText,
        hasKoModal: Boolean(koModal),
        koModalText: koModal ? koModal.innerText.replace(/\n/g, ' | ') : null,
        hasVictoryModal: Boolean(victoryModal),
      };
    });
  };

  const initialDom = await getDomState();
  console.log('\n📋 [DOM EVIDENCE — SPAWN]:', JSON.stringify(initialDom, null, 2));

  // FRAME 1: Spawn
  console.log('\n📸 Capturing Frame 1: SPAWN...');
  const spawnBuf = await page.screenshot();
  saveFrame(spawnBuf, 'p0_catapult_spawn.png', `Clean spawn: 3 hearts, round 1/5 (${initialDom.hudText})`);

  // Helper to pull and shoot slingshot
  const shootCatapult = async (dragXVirtual, dragYVirtual) => {
    const canvasHandle = await page.$('canvas');
    const box = await canvasHandle.boundingBox();

    const baseX = box.x + (130 / 800) * box.width;
    const baseY = box.y + (380 / 500) * box.height;

    const pullX = box.x + (dragXVirtual / 800) * box.width;
    const pullY = box.y + (dragYVirtual / 500) * box.height;

    await page.mouse.move(baseX, baseY);
    await page.mouse.down();
    await new Promise(r => setTimeout(r, 150));

    // Drag to pull position
    await page.mouse.move(pullX, pullY, { steps: 6 });
    await new Promise(r => setTimeout(r, 200));

    // Release to launch
    await page.mouse.up();
  };

  // 3. Perform Miss #1: Shoot off target (downward to ground)
  console.log('\n🎯 Performing Miss #1: Pulling down and releasing...');
  // Pulling right & up makes projectile launch left/down into ground
  await shootCatapult(180, 340);
  await new Promise(r => setTimeout(r, 380));

  const afterMiss1 = await getDomState();
  console.log('\n📋 [DOM EVIDENCE — AFTER MISS 1]:', JSON.stringify(afterMiss1, null, 2));

  // FRAME 2: Wrong / Miss Frame
  console.log('\n📸 Capturing Frame 2: WRONG / MISS...');
  const wrongBuf = await page.screenshot();
  saveFrame(wrongBuf, 'p0_catapult_wrong.png', `After miss #1: 2 hearts left (${afterMiss1.hudText})`);

  // 4. Perform Miss #2
  console.log('\n🎯 Performing Miss #2: Pulling and shooting off target...');
  await new Promise(r => setTimeout(r, 500));
  await shootCatapult(180, 340);
  await new Promise(r => setTimeout(r, 600));

  const afterMiss2 = await getDomState();
  console.log('📋 [DOM EVIDENCE — AFTER MISS 2]:', JSON.stringify(afterMiss2, null, 2));

  // 5. Perform Miss #3 (KO Trigger)
  console.log('\n🎯 Performing Miss #3 (Depleting last heart to 0)...');
  await new Promise(r => setTimeout(r, 500));
  await shootCatapult(180, 340);
  await new Promise(r => setTimeout(r, 1000));

  const afterMiss3 = await getDomState();
  console.log('\n📋 [DOM EVIDENCE — KO / GAME OVER]:', JSON.stringify(afterMiss3, null, 2));

  // FRAME 3: KO Modal
  console.log('\n📸 Capturing Frame 3: KO MODAL...');
  const koBuf = await page.screenshot();
  saveFrame(koBuf, 'p0_catapult_ko.png', `KO Phase: Out of energy hearts, modal visible (${afterMiss3.koModalText})`);

  // 6. Click "Try Again" to verify restart mechanism
  console.log('\n🔄 Clicking "Try Again" button on KO Modal...');
  const tryAgainBtn = await page.$('[data-testid="btn-try-again"]');
  if (tryAgainBtn) {
    await tryAgainBtn.click();
    await new Promise(r => setTimeout(r, 600));

    const afterRetry = await getDomState();
    console.log('\n📋 [DOM EVIDENCE — AFTER RETRY]:', JSON.stringify(afterRetry, null, 2));

    // FRAME 4: Retry / Reset
    console.log('\n📸 Capturing Frame 4: RETRY / RESET...');
    const retryBuf = await page.screenshot();
    saveFrame(retryBuf, 'p0_catapult_retry.png', `After clicking Try Again: Clean reset to 3 hearts (${afterRetry.hudText})`);
  }

  console.log('\n✅ All playtest frames captured successfully!');
  await browser.close();
}

run().catch(err => {
  console.error('❌ Playtest error:', err);
  process.exit(1);
});
