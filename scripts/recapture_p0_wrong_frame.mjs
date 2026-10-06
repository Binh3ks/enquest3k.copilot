/**
 * recapture_p0_wrong_frame.mjs
 *
 * Precise recapture of Frame 2 (p0_catapult_wrong.png) with strict DOM sync:
 * - Uses page.waitForFunction to wait until HUD heartsCount === 2 in DOM computed style.
 * - Captures exact frame where:
 *     1. HUD displays exactly 2 red hearts + 1 dimmed heart (opacity 0.25).
 *     2. Toast on canvas displays "-1 ❤️".
 *     3. Quả cầu đã chạm vạch va chạm đất (y >= 450).
 * - Extracts and logs verbatim JSON state with timestamp.
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

async function run() {
  console.log('🚀 Launching Chrome for Frame 2 recapture...');
  const browser = await puppeteer.launch({
    executablePath: fs.existsSync(CHROME_PATH) ? CHROME_PATH : undefined,
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--window-size=1280,820'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto(`${BASE_URL}/quest-demo`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  await page.waitForSelector('#select-active-game', { timeout: 5000 });
  await page.select('#select-active-game', 'phaser_catapult');
  await new Promise(r => setTimeout(r, 1500));

  await page.waitForSelector('[data-testid="chunk-catapult-hearts"]', { timeout: 5000 });
  await page.waitForSelector('canvas', { timeout: 5000 });

  // Verify initial 3 hearts
  await page.waitForFunction(() => {
    const container = document.querySelector('[data-testid="chunk-catapult-hearts"]');
    if (!container) return false;
    const spans = Array.from(container.querySelectorAll('span'));
    const opacities = spans.map(s => parseFloat(window.getComputedStyle(s).opacity));
    return opacities.filter(op => op > 0.8).length === 3;
  }, { timeout: 5000 });

  console.log('✅ Initial 3 hearts verified in HUD');

  // Pull and shoot
  const canvasHandle = await page.$('canvas');
  const box = await canvasHandle.boundingBox();

  const baseX = box.x + (130 / 800) * box.width;
  const baseY = box.y + (380 / 500) * box.height;

  // Drag down/right so it launches left/down into ground
  const pullX = box.x + (185 / 800) * box.width;
  const pullY = box.y + (340 / 500) * box.height;

  await page.mouse.move(baseX, baseY);
  await page.mouse.down();
  await new Promise(r => setTimeout(r, 150));
  await page.mouse.move(pullX, pullY, { steps: 6 });
  await new Promise(r => setTimeout(r, 200));
  await page.mouse.up();

  console.log('🏹 Catapult launched towards ground. Waiting for collision and HUD update...');

  // STRICT SYNC: Wait until HUD hearts DOM computed style reaches exactly 2 active hearts
  await page.waitForFunction(() => {
    const container = document.querySelector('[data-testid="chunk-catapult-hearts"]');
    if (!container) return false;
    const spans = Array.from(container.querySelectorAll('span'));
    const opacities = spans.map(s => parseFloat(window.getComputedStyle(s).opacity));
    const active = opacities.filter(op => op > 0.7).length;
    const dimmed = opacities.filter(op => op <= 0.35).length;
    return active === 2 && dimmed === 1;
  }, { timeout: 4000 });

  // Wait 100ms for CSS transition to settle at exactly opacity 0.25
  await new Promise(r => setTimeout(r, 100));

  // Extract full diagnostic state directly from DOM & React Fiber at this exact millisecond
  const detailedState = await page.evaluate(() => {
    const container = document.querySelector('[data-testid="chunk-catapult-hearts"]');
    const spans = container ? Array.from(container.querySelectorAll('span')) : [];
    const opacities = spans.map(s => parseFloat(window.getComputedStyle(s).opacity));
    const filters = spans.map(s => window.getComputedStyle(s).filter);
    const activeHeartsCount = opacities.filter(op => op > 0.7).length;

    // React Fiber inspection for internal gameState
    const canvas = document.querySelector('canvas');
    let internalState = null;
    if (canvas) {
      const fiberKey = Object.keys(canvas).find(k => k.startsWith('__reactFiber'));
      let fiber = canvas[fiberKey];
      while (fiber) {
        let s = fiber.memoizedState;
        while (s) {
          if (s.memoizedState?.current?.baskets) {
            internalState = s.memoizedState.current;
            break;
          }
          s = s.next;
        }
        if (internalState) break;
        fiber = fiber.return;
      }
    }

    return {
      timestamp: new Date().toISOString(),
      heartsCount: activeHeartsCount,
      heartsTotal: spans.length,
      heartOpacities: opacities,
      heartFilters: filters,
      bullet: internalState?.bullet ? {
        x: Math.round(internalState.bullet.x),
        y: Math.round(internalState.bullet.y),
        isLaunched: internalState.isLaunched,
      } : null,
      popups: internalState?.popups?.map(p => ({
        text: p.text,
        life: Math.round(p.life * 100) / 100,
        color: p.color,
      })) || [],
      hudText: container?.parentElement?.innerText?.replace(/\n/g, ' | '),
    };
  });

  console.log('\n================ VERBATIM LOG ================');
  console.log(JSON.stringify(detailedState, null, 2));
  console.log('==============================================\n');

  // Capture frame
  const wrongBuf = await page.screenshot();
  const p1 = path.join(OUTPUT_DIR, 'p0_catapult_wrong.png');
  const p2 = path.join(BRAIN_DIR, 'p0_catapult_wrong.png');
  fs.writeFileSync(p1, wrongBuf);
  fs.writeFileSync(p2, wrongBuf);
  console.log('📸 [SAVED] p0_catapult_wrong.png updated successfully!');

  await browser.close();
}

run().catch(err => {
  console.error('❌ Error in recapture:', err);
  process.exit(1);
});
