/**
 * recapture_catapult_single_session.mjs
 *
 * Captures all 3 ChunkCatapultCanvas frames in a SINGLE continuous Chrome session:
 *   1. b4_real_catapult_spawn.png: Slingshot at rest, 0 drag, clean initial state, Score: 0, Pair: 1/8.
 *   2. b4_real_catapult_wrong.png: After hitting distractor basket, showing popup "MISS! Try Again" & shaking basket.
 *   3. b4_real_catapult_correct.png: After hitting correct basket, showing "Score: >0" and popup "+... PERFECT!" on canvas.
 *
 * Uses Real Chrome GUI (/Applications/Google Chrome.app) at 1280x800.
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
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf';
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

// Dead-center calibrated drag coordinates for the 3 basket positions
const BASKET_DRAGS = {
  0: { x_drag: 80.8, y_drag: 438.6 },
  1: { x_drag: 57.0, y_drag: 429.2 },
  2: { x_drag: 53.0, y_drag: 418.5 },
};

async function run() {
  console.log('🚀 Launching Real Chrome GUI for ChunkCatapult single-session recapture...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--window-size=1280,820'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto(`${BASE_URL}/week/33/chronicles?room=2&bypass=true`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  // Enter Door 1 (Chunk Catapult Match)
  const doorBtns = await page.$$('.dr-door-enter-btn');
  if (doorBtns.length > 1) {
    await doorBtns[1].click();
    console.log('  Entered Door 1 (Chunk Catapult Match)');
  }
  await new Promise(r => setTimeout(r, 1500));

  // Helper to extract live game state from React Fiber
  const getCatapultState = async () => {
    return await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return null;
      const fiberKey = Object.keys(canvas).find(k => k.startsWith('__reactFiber'));
      if (!fiberKey) return null;
      let fiber = canvas[fiberKey];
      let stateRef = null;
      while (fiber) {
        if (fiber.memoizedState) {
          let s = fiber.memoizedState;
          while (s) {
            if (s.memoizedState?.current?.baskets) {
              stateRef = s.memoizedState.current;
              break;
            }
            s = s.next;
          }
        }
        if (stateRef) break;
        fiber = fiber.return;
      }
      const prompt = document.querySelector('div[style*="18px"]')?.innerText;
      const hudScore = document.querySelector('.chunk-catapult-wrapper')?.innerText?.match(/Score:\s*(\d+)/)?.[0] || 'Score: 0';
      return {
        prompt,
        hudScore,
        baskets: stateRef?.baskets?.map(b => ({ text: b.text, isCorrect: b.isCorrect, x: b.x, y: b.y, shake: b.shake })),
        score: stateRef?.score,
        currentPairIdx: stateRef?.currentPairIdx,
        popups: stateRef?.popups?.map(p => ({ text: p.text, color: p.color, life: p.life })),
        bullet: stateRef?.bullet,
        isLaunched: stateRef?.isLaunched,
      };
    });
  };

  const initial = await getCatapultState();
  console.log('  Initial Session State:');
  console.log(`    Prompt: "${initial.prompt}"`);
  console.log(`    Score: ${initial.score}, Pair: ${initial.currentPairIdx + 1}`);
  console.log('    Baskets:', initial.baskets);

  // ── FRAME 1: Spawn Frame (Clean slingshot at rest, untouched) ──
  console.log('\n📸 Capturing Frame 1: SPAWN...');
  const spawnBuf = await page.screenshot();
  saveFrame(spawnBuf, 'b4_real_catapult_spawn.png', `Clean spawn at rest ("${initial.prompt}", Score: 0, Pair: 1/8)`);

  // Helper to launch catapult towards virtual coordinates
  const launchCatapult = async (dragXVirtual, dragYVirtual) => {
    const canvasHandle = await page.$('canvas');
    const box = await canvasHandle.boundingBox();

    const baseX = box.x + (130 / 800) * box.width;
    const baseY = box.y + (380 / 500) * box.height;

    const pullX = box.x + (dragXVirtual / 800) * box.width;
    const pullY = box.y + (dragYVirtual / 500) * box.height;

    await page.mouse.move(baseX, baseY);
    await page.mouse.down();
    await new Promise(r => setTimeout(r, 200));

    // Smooth drag
    await page.mouse.move(pullX, pullY, { steps: 8 });
    await new Promise(r => setTimeout(r, 300));

    await page.mouse.up();
  };

  // Determine which baskets to shoot:
  // Prefer Basket 0 or 1 for wrong, and whatever is correct for correct
  const correctIdx = initial.baskets.findIndex(b => b.isCorrect);
  // Pick wrong basket that is either 0 or 1 (most reliable)
  let wrongIdx = initial.baskets.findIndex((b, idx) => !b.isCorrect && (idx === 0 || idx === 1));
  if (wrongIdx === -1) {
    wrongIdx = initial.baskets.findIndex(b => !b.isCorrect);
  }

  console.log(`\n🎯 Distractor Basket: Index ${wrongIdx} ("${initial.baskets[wrongIdx].text}")`);
  console.log(`🎯 Correct Basket:    Index ${correctIdx} ("${initial.baskets[correctIdx].text}")`);

  // ── FRAME 2: Wrong Shot (Aim at distractor basket, wait for "MISS! Try Again") ──
  console.log('\n🚀 Executing WRONG shot towards distractor basket', wrongIdx, '...');
  const wrongDrag = BASKET_DRAGS[wrongIdx];
  await launchCatapult(wrongDrag.x_drag, wrongDrag.y_drag);

  console.log('  Monitoring canvas for "MISS! Try Again" popup...');
  let wrongHit = false;
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 35));
    const s = await getCatapultState();
    if (s.popups && s.popups.some(p => p.text.includes('MISS'))) {
      console.log(`  🎯 Wrong impact confirmed! Popups:`, s.popups);
      wrongHit = true;
      // Capture immediately while popup is fresh and basket is shaking
      await new Promise(r => setTimeout(r, 40));
      const wrongBuf = await page.screenshot();
      saveFrame(wrongBuf, 'b4_real_catapult_wrong.png', `Wrong hit with "MISS! Try Again" popup & basket shake`);
      break;
    }
  }

  if (!wrongHit) {
    console.warn('  ⚠️ Wrong hit popup not caught by polling, taking fallback screenshot');
    const wrongBuf = await page.screenshot();
    saveFrame(wrongBuf, 'b4_real_catapult_wrong.png', `Wrong hit fallback`);
  }

  // Wait for bullet to reset (500ms in code) + comfortable margin
  console.log('  Waiting for bullet to reset back to slingshot mount...');
  await new Promise(r => setTimeout(r, 1200));

  const resetState = await getCatapultState();
  console.log('  Bullet reset status: isLaunched =', resetState.isLaunched, 'bullet =', resetState.bullet);

  // ── FRAME 3: Correct Shot (Aim at correct basket, wait for "+... PERFECT!" and updated Score) ──
  console.log('\n🚀 Executing CORRECT shot towards correct basket', correctIdx, '...');
  const correctDrag = BASKET_DRAGS[correctIdx];
  await launchCatapult(correctDrag.x_drag, correctDrag.y_drag);

  console.log('  Monitoring canvas for "PERFECT!" popup & updated Score...');
  let correctHit = false;
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 35));
    const s = await getCatapultState();
    if (s.popups && s.popups.some(p => p.text.includes('PERFECT'))) {
      console.log(`  🎯 Correct impact confirmed! Popups:`, s.popups, 'HUD:', s.hudScore);
      correctHit = true;
      // Wait 120ms for React HUD re-render so Score: 12 or 16 is displayed
      await new Promise(r => setTimeout(r, 120));
      const sUpdated = await getCatapultState();
      console.log('  After React paint: HUD =', sUpdated.hudScore, 'Popups =', sUpdated.popups);
      const correctBuf = await page.screenshot();
      saveFrame(correctBuf, 'b4_real_catapult_correct.png', `Correct hit with "${s.popups[0].text}" popup, particles & ${sUpdated.hudScore}`);
      break;
    }
  }

  if (!correctHit) {
    console.warn('  ⚠️ Correct hit popup not caught by polling, taking fallback screenshot');
    const correctBuf = await page.screenshot();
    saveFrame(correctBuf, 'b4_real_catapult_correct.png', `Correct hit fallback`);
  }

  await new Promise(r => setTimeout(r, 1500));
  await browser.close();
  console.log('\n✅ Single-session recapture completed successfully!');
}

run().catch(err => {
  console.error('❌ Error during recapture:', err);
  process.exit(1);
});
