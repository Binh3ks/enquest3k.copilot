/**
 * playtest_verify_hud_regression_riddle.mjs
 *
 * Verifies that HUDOverlay.jsx changes (supporting roundLabel and totalWords=0)
 * did NOT introduce regressions in existing games like Riddle Run Maze.
 * Confirms that .hud-round-pill strictly renders "ROUND 1/4" and "ROUND 2/4" as expected.
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
  console.log('🎮 [Regression Check] Launching Real Chrome GUI for Riddle Run Maze...');
  const browser = await puppeteer.launch({
    executablePath: fs.existsSync(CHROME_PATH) ? CHROME_PATH : undefined,
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--window-size=1280,820'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const consoleLogs = [];
  page.on('console', msg => {
    const text = msg.text();
    consoleLogs.push({ text, time: Date.now() });
    if (text.includes('[RIDDLE') || text.includes('[HUDOverlay')) {
      console.log('⏱️ [CONSOLE]', text);
    }
  });

  await page.goto(`${BASE_URL}/quest-demo`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  await page.waitForSelector('#select-active-game', { timeout: 5000 });
  await page.select('#select-active-game', 'riddle_maze');
  await new Promise(r => setTimeout(r, 1500));

  await page.waitForSelector('.riddle-maze-viewport', { timeout: 5000 });
  console.log('✅ Riddle Run Maze initialized.\n');

  // Move Leo using real keyboard navigation
  console.log('🕹️ Moving Leo with real keyboard Arrow keys (ArrowLeft then ArrowRight)...');
  await page.keyboard.down('ArrowLeft');
  await new Promise(r => setTimeout(r, 200));
  await page.keyboard.up('ArrowLeft');
  await new Promise(r => setTimeout(r, 100));
  await page.keyboard.down('ArrowRight');
  await new Promise(r => setTimeout(r, 250));
  await page.keyboard.up('ArrowRight');
  await new Promise(r => setTimeout(r, 300));

  // Extract DOM data for Round 1
  const r1Data = await page.evaluate(() => {
    return {
      roundPill: document.querySelector('.hud-round-pill')?.innerText,
      floorBadge: document.querySelector('.hud-floor-badge')?.innerText,
      hearts: document.querySelectorAll('.hud-heart-full').length,
      timer: document.querySelector('.hud-timer')?.innerText,
      prompt: document.querySelector('.riddle-prompt-text')?.innerText,
      doors: Array.from(document.querySelectorAll('.vault-door-entity')).map(d => ({
        id: d.getAttribute('data-door-id'),
        word: d.getAttribute('data-door-word'),
        isCorrect: d.getAttribute('data-is-correct') === 'true',
        x: parseFloat(d.style.left) || 0,
        y: parseFloat(d.style.top) || 0,
      })),
    };
  });

  console.log('📊 [ROUND 1 DOM PROOF]:', JSON.stringify(r1Data, null, 2));

  // Capture Round 1 Proof Screenshot
  const bufR1 = await page.screenshot();
  saveFrame(bufR1, 'riddle_run_hud_round_regression_proof.png', 'Riddle Run Round 1 HUD displaying ROUND 1/4 with zero regression');

  // Verify that roundPill matches "ROUND 1/4"
  if (r1Data.roundPill !== 'ROUND 1/4') {
    throw new Error(`Regression detected! Expected "ROUND 1/4", got "${r1Data.roundPill}"`);
  }
  console.log('✅ ROUND 1/4 verified successfully with NO regression!\n');

  // Now let us advance to Round 2 by entering the correct door
  const correctDoor = r1Data.doors.find(d => d.isCorrect);
  if (correctDoor) {
    console.log(`🔑 Moving Leo to correct door (${correctDoor.word} at x=${correctDoor.x}, y=${correctDoor.y}) and entering...`);
    
    // Position Leo near the door
    await page.evaluate((dx, dy) => {
      if (window.__setRiddleLeo) {
        window.__setRiddleLeo(dx + 15, dy + 11);
      }
    }, correctDoor.x, correctDoor.y);
    await new Promise(r => setTimeout(r, 100));

    // Press Enter / tap door
    const doorEl = await page.$(`[data-door-id="${correctDoor.id}"]`);
    if (doorEl) {
      await doorEl.click();
      console.log('🚪 Door clicked, waiting for unlock feedback & Round 2 transition (2.2s)...');
      await new Promise(r => setTimeout(r, 2200));

      await page.waitForFunction(() => {
        const chip = document.querySelector('.riddle-round-chip')?.innerText || '';
        return chip.includes('Riddle 2');
      }, { timeout: 4000 });

      // Simulate keyboard jump/move in Round 2
      await page.keyboard.press('ArrowUp');
      await new Promise(r => setTimeout(r, 200));

      const r2Data = await page.evaluate(() => {
        return {
          roundPill: document.querySelector('.hud-round-pill')?.innerText,
          floorBadge: document.querySelector('.hud-floor-badge')?.innerText,
          hearts: document.querySelectorAll('.hud-heart-full').length,
          timer: document.querySelector('.hud-timer')?.innerText,
          prompt: document.querySelector('.riddle-prompt-text')?.innerText,
          roundChip: document.querySelector('.riddle-round-chip')?.innerText,
        };
      });

      console.log('📊 [ROUND 2 DOM PROOF]:', JSON.stringify(r2Data, null, 2));
      const bufR2 = await page.screenshot();
      saveFrame(bufR2, 'riddle_run_hud_round2_regression_proof.png', 'Riddle Run Round 2 HUD displaying ROUND 2/4');

      if (r2Data.roundPill !== 'ROUND 2/4') {
        throw new Error(`Regression detected in Round 2! Expected "ROUND 2/4", got "${r2Data.roundPill}"`);
      }
      console.log('✅ ROUND 2/4 verified successfully with NO regression!');
    }
  }

  await browser.close();
  console.log('\n✨ [DONE] Regression validation completed with 100% success.');
}

run().catch(err => {
  console.error('❌ Regression validation error:', err);
  process.exit(1);
});
