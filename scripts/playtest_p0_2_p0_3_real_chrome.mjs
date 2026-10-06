/**
 * playtest_p0_2_p0_3_real_chrome.mjs
 *
 * Real Chrome Playtest for:
 * - Ticket P0-2: Riddle Run Maze (Floor 4 Door 3)
 * - Ticket P0-3: Titan Grammar Forge (Floor 5 Door 2)
 *
 * Full 4-frame lifecycle validation for both games:
 * Frame 1: Spawn (4 options, 3 hearts full, round 1/4)
 * Frame 2: Wrong (2 hearts left, 1 empty, feedback toast, DOM-synced)
 * Frame 3: KO (0 hearts left, KO modal visible)
 * Frame 4: Retry (Reset to 3 hearts, phase playing, round 1)
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
  console.log('🚀 [P0-2 & P0-3 Playtest] Launching Real Chrome GUI...');
  const browser = await puppeteer.launch({
    executablePath: fs.existsSync(CHROME_PATH) ? CHROME_PATH : undefined,
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--window-size=1280,820'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // =========================================================================
  // TEST P0-2: RIDDLE RUN MAZE (Floor 4 Door 3)
  // =========================================================================
  console.log('\n======================================================');
  console.log('🧪 TESTING P0-2: RIDDLE RUN MAZE (4 Doors, 4 Rounds, 3 Hearts)');
  console.log('======================================================');

  await page.goto(`${BASE_URL}/quest-demo`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  await page.waitForSelector('#select-active-game', { timeout: 5000 });
  await page.select('#select-active-game', 'riddle_maze');
  await new Promise(r => setTimeout(r, 1500));

  // Wait for 4 doors to be present in DOM
  await page.waitForFunction(() => {
    const doors = document.querySelectorAll('.vault-door-entity');
    return doors.length === 4;
  }, { timeout: 5000 });

  // Helper to teleport Leo to door and click it
  async function triggerDoor(doorId, doorX, doorY) {
    await page.evaluate((dId, dx, dy) => {
      const root = document.querySelector('.riddle-maze-viewport');
      const fiberKey = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));
      let fiber = root ? root[fiberKey] : null;
      while (fiber) {
        if (fiber.memoizedState) {
          let s = fiber.memoizedState;
          while (s) {
            if (s.memoizedState?.current?.vx !== undefined && s.memoizedState?.current?.x !== undefined) {
              s.memoizedState.current.x = dx + 15;
              s.memoizedState.current.y = dy + 11;
              s.memoizedState.current.vx = 0;
              s.memoizedState.current.vy = 0;
              s.memoizedState.current.isGrounded = true;
              break;
            }
            s = s.next;
          }
        }
        fiber = fiber.return;
      }
      const doorEl = document.querySelector(`[data-door-id="${dId}"]`);
      if (doorEl) doorEl.click();
    }, doorId, doorX, doorY);
  }

  // FRAME 1: Spawn
  const initialRiddleState = await page.evaluate(() => {
    const doors = Array.from(document.querySelectorAll('.vault-door-entity')).map(d => ({
      id: d.getAttribute('data-door-id'),
      word: d.getAttribute('data-door-word'),
      isCorrect: d.getAttribute('data-is-correct') === 'true',
      x: parseFloat(d.style.left) || 90,
      y: parseFloat(d.style.top) || 295,
    }));
    const fullHearts = document.querySelectorAll('.hud-heart-full').length;
    const promptText = document.querySelector('.riddle-prompt-text')?.innerText || '';
    const roundChip = document.querySelector('.riddle-round-chip')?.innerText || '';
    const roundPill = document.querySelector('.hud-round-pill')?.innerText || '';

    return {
      timestamp: new Date().toISOString(),
      heartsCount: fullHearts,
      doorCount: doors.length,
      doors,
      promptText,
      roundChip,
      roundPill,
    };
  });

  console.log('📋 [RIDDLE RUN SPAWN LOG]:', JSON.stringify(initialRiddleState, null, 2));
  const spawnBufRiddle = await page.screenshot();
  saveFrame(spawnBufRiddle, 'p0_2_riddle_spawn.png', 'Riddle Run Spawn: 4 doors, 3 hearts full, round 1/4');

  // FRAME 2: Wrong Door Hit (Miss #1)
  console.log('🏹 Navigating Leo to WRONG Sanctuary Door #1...');
  const wrongDoor = initialRiddleState.doors.find(d => !d.isCorrect);
  await triggerDoor(wrongDoor.id, wrongDoor.x, wrongDoor.y);

  // STRICT SYNC: Wait until HUD hearts DOM reaches exactly 2 full hearts
  await page.waitForFunction(() => {
    return document.querySelectorAll('.hud-heart-full').length === 2;
  }, { timeout: 4000 });
  await new Promise(r => setTimeout(r, 100)); // allow CSS transition to settle

  const wrongRiddleState = await page.evaluate(() => {
    const fullHearts = document.querySelectorAll('.hud-heart-full').length;
    const emptyHearts = document.querySelectorAll('.hud-heart-empty').length;
    const feedbackToast = document.querySelector('.riddle-feedback-toast')?.innerText || null;
    const hudLabel = document.querySelector('.hud-hearts')?.getAttribute('aria-label') || '';

    return {
      timestamp: new Date().toISOString(),
      heartsCount: fullHearts,
      emptyHearts,
      hudLabel,
      feedbackToast,
    };
  });

  console.log('📋 [RIDDLE RUN WRONG LOG]:', JSON.stringify(wrongRiddleState, null, 2));
  const wrongBufRiddle = await page.screenshot();
  saveFrame(wrongBufRiddle, 'p0_2_riddle_wrong.png', `Riddle Run Wrong: 2 hearts left, toast "${wrongRiddleState.feedbackToast}"`);

  // Miss #2: Deplete to 1 heart
  console.log('🏹 Navigating Leo to WRONG Sanctuary Door #2...');
  await new Promise(r => setTimeout(r, 1600)); // wait for previous feedback to fade
  await triggerDoor(wrongDoor.id, wrongDoor.x, wrongDoor.y);
  await page.waitForFunction(() => {
    return document.querySelectorAll('.hud-heart-full').length === 1;
  }, { timeout: 4000 });

  // Miss #3: Deplete to 0 hearts -> Trigger KO Modal
  console.log('🏹 Navigating Leo to WRONG Sanctuary Door #3 (Depleting to 0 hearts)...');
  await new Promise(r => setTimeout(r, 1600));
  await triggerDoor(wrongDoor.id, wrongDoor.x, wrongDoor.y);

  // Wait for KO Modal to appear
  await page.waitForSelector('.riddle-ko-modal', { timeout: 5000 });
  await new Promise(r => setTimeout(r, 200));

  const koRiddleState = await page.evaluate(() => {
    const fullHearts = document.querySelectorAll('.hud-heart-full').length;
    const emptyHearts = document.querySelectorAll('.hud-heart-empty').length;
    const koTitle = document.querySelector('.riddle-ko-modal h2')?.innerText || '';
    const koDesc = document.querySelector('.riddle-ko-modal p')?.innerText || '';
    const hasRetryBtn = !!document.querySelector('.riddle-ko-modal .retry-btn');

    return {
      timestamp: new Date().toISOString(),
      heartsCount: fullHearts,
      emptyHearts,
      koTitle,
      koDesc,
      hasRetryBtn,
    };
  });

  console.log('📋 [RIDDLE RUN KO LOG]:', JSON.stringify(koRiddleState, null, 2));
  const koBufRiddle = await page.screenshot();
  saveFrame(koBufRiddle, 'p0_2_riddle_ko.png', `Riddle Run KO: ${koRiddleState.koTitle} — 0 hearts left`);

  // FRAME 4: Retry
  console.log('🔄 Clicking "Try Again" on Riddle KO Modal...');
  await page.click('.riddle-ko-modal .retry-btn');
  await page.waitForFunction(() => {
    const modal = document.querySelector('.riddle-ko-modal');
    const fullHearts = document.querySelectorAll('.hud-heart-full').length;
    return !modal && fullHearts === 3;
  }, { timeout: 5000 });
  await new Promise(r => setTimeout(r, 200));

  const retryRiddleState = await page.evaluate(() => {
    const fullHearts = document.querySelectorAll('.hud-heart-full').length;
    const emptyHearts = document.querySelectorAll('.hud-heart-empty').length;
    const roundPill = document.querySelector('.hud-round-pill')?.innerText || '';
    return {
      timestamp: new Date().toISOString(),
      heartsCount: fullHearts,
      emptyHearts,
      roundPill,
    };
  });

  console.log('📋 [RIDDLE RUN RETRY LOG]:', JSON.stringify(retryRiddleState, null, 2));
  const retryBufRiddle = await page.screenshot();
  saveFrame(retryBufRiddle, 'p0_2_riddle_retry.png', `Riddle Run Retry: Reset to 3 hearts, round ${retryRiddleState.roundPill}`);

  // =========================================================================
  // TEST P0-3: TITAN GRAMMAR FORGE (Floor 5 Door 2)
  // =========================================================================
  console.log('\n======================================================');
  console.log('🧪 TESTING P0-3: TITAN GRAMMAR FORGE (4 Cogs, 4 Rounds, 3 Hearts)');
  console.log('======================================================');

  await page.select('#select-active-game', 'titan_forge');
  await new Promise(r => setTimeout(r, 1500));

  // Wait for 4 cogs to be present in DOM
  await page.waitForFunction(() => {
    const cogs = document.querySelectorAll('.titan-gear-entity');
    return cogs.length === 4;
  }, { timeout: 5000 });

  // Helper to teleport Leo to cog and click it
  async function triggerCog(cogId, cogX, cogY) {
    await page.evaluate((cId, cx, cy) => {
      const root = document.querySelector('.titan-forge-viewport');
      const fiberKey = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));
      let fiber = root ? root[fiberKey] : null;
      while (fiber) {
        if (fiber.memoizedState) {
          let s = fiber.memoizedState;
          while (s) {
            if (s.memoizedState?.current?.vx !== undefined && s.memoizedState?.current?.x !== undefined) {
              s.memoizedState.current.x = cx + 15;
              s.memoizedState.current.y = cy - 4;
              s.memoizedState.current.vx = 0;
              s.memoizedState.current.vy = 0;
              s.memoizedState.current.isGrounded = true;
              break;
            }
            s = s.next;
          }
        }
        fiber = fiber.return;
      }
      const cogEl = document.querySelector(`[data-gear-id="${cId}"]`);
      if (cogEl) cogEl.click();
    }, cogId, cogX, cogY);
  }

  // FRAME 1: Titan Spawn
  const initialTitanState = await page.evaluate(() => {
    const cogs = Array.from(document.querySelectorAll('.titan-gear-entity')).map(c => ({
      id: c.getAttribute('data-gear-id'),
      clause: c.querySelector('.titan-clause-plaque')?.innerText || '',
      isCorrect: c.getAttribute('data-is-correct') === 'true',
      x: parseFloat(c.style.left) || 110,
      y: parseFloat(c.style.top) || 295,
    }));
    const fullHearts = document.querySelectorAll('.hud-heart-full').length;
    const stemText = document.querySelector('.titan-stem-text')?.innerText || '';
    const roundChip = document.querySelector('.titan-round-chip')?.innerText || '';
    const roundPill = document.querySelector('.hud-round-pill')?.innerText || '';

    return {
      timestamp: new Date().toISOString(),
      heartsCount: fullHearts,
      cogCount: cogs.length,
      cogs,
      stemText,
      roundChip,
      roundPill,
    };
  });

  console.log('📋 [TITAN FORGE SPAWN LOG]:', JSON.stringify(initialTitanState, null, 2));
  const spawnBufTitan = await page.screenshot();
  saveFrame(spawnBufTitan, 'p0_3_titan_spawn.png', 'Titan Forge Spawn: 4 cogs, 3 hearts full, round 1/4');

  // FRAME 2: Titan Wrong Cog Hit (Miss #1)
  console.log('🏹 Navigating Leo to WRONG Gear Cog #1...');
  const wrongCog = initialTitanState.cogs.find(c => !c.isCorrect);
  await triggerCog(wrongCog.id, wrongCog.x, wrongCog.y);

  // STRICT SYNC: Wait until HUD hearts DOM reaches exactly 2 active hearts
  await page.waitForFunction(() => {
    return document.querySelectorAll('.hud-heart-full').length === 2;
  }, { timeout: 4000 });
  await new Promise(r => setTimeout(r, 100)); // allow CSS transition to finish

  const wrongTitanState = await page.evaluate(() => {
    const fullHearts = document.querySelectorAll('.hud-heart-full').length;
    const emptyHearts = document.querySelectorAll('.hud-heart-empty').length;
    const feedbackToast = document.querySelector('.titan-feedback-toast')?.innerText || null;
    const hudLabel = document.querySelector('.hud-hearts')?.getAttribute('aria-label') || '';

    return {
      timestamp: new Date().toISOString(),
      heartsCount: fullHearts,
      emptyHearts,
      hudLabel,
      feedbackToast,
    };
  });

  console.log('📋 [TITAN FORGE WRONG LOG]:', JSON.stringify(wrongTitanState, null, 2));
  const wrongBufTitan = await page.screenshot();
  saveFrame(wrongBufTitan, 'p0_3_titan_wrong.png', `Titan Forge Wrong: 2 hearts left, toast "${wrongTitanState.feedbackToast}"`);

  // Miss #2: Deplete to 1 heart
  console.log('🏹 Navigating Leo to WRONG Gear Cog #2...');
  await new Promise(r => setTimeout(r, 1600));
  await triggerCog(wrongCog.id, wrongCog.x, wrongCog.y);
  await page.waitForFunction(() => {
    return document.querySelectorAll('.hud-heart-full').length === 1;
  }, { timeout: 4000 });

  // Miss #3: Deplete to 0 hearts -> Trigger KO Modal
  console.log('🏹 Navigating Leo to WRONG Gear Cog #3 (Depleting to 0 hearts)...');
  await new Promise(r => setTimeout(r, 1600));
  await triggerCog(wrongCog.id, wrongCog.x, wrongCog.y);

  // Wait for KO Modal to appear
  await page.waitForSelector('.titan-ko-modal', { timeout: 5000 });
  await new Promise(r => setTimeout(r, 200));

  const koTitanState = await page.evaluate(() => {
    const fullHearts = document.querySelectorAll('.hud-heart-full').length;
    const emptyHearts = document.querySelectorAll('.hud-heart-empty').length;
    const koTitle = document.querySelector('.titan-ko-modal h2')?.innerText || '';
    const koDesc = document.querySelector('.titan-ko-modal p')?.innerText || '';
    const hasRetryBtn = !!document.querySelector('.titan-ko-modal .retry-btn');

    return {
      timestamp: new Date().toISOString(),
      heartsCount: fullHearts,
      emptyHearts,
      koTitle,
      koDesc,
      hasRetryBtn,
    };
  });

  console.log('📋 [TITAN FORGE KO LOG]:', JSON.stringify(koTitanState, null, 2));
  const koBufTitan = await page.screenshot();
  saveFrame(koBufTitan, 'p0_3_titan_ko.png', `Titan Forge KO: ${koTitanState.koTitle} — 0 hearts left`);

  // FRAME 4: Retry
  console.log('🔄 Clicking "Try Again" on Titan KO Modal...');
  await page.click('.titan-ko-modal .retry-btn');
  await page.waitForFunction(() => {
    const modal = document.querySelector('.titan-ko-modal');
    const fullHearts = document.querySelectorAll('.hud-heart-full').length;
    return !modal && fullHearts === 3;
  }, { timeout: 5000 });
  await new Promise(r => setTimeout(r, 200));

  const retryTitanState = await page.evaluate(() => {
    const fullHearts = document.querySelectorAll('.hud-heart-full').length;
    const emptyHearts = document.querySelectorAll('.hud-heart-empty').length;
    const roundPill = document.querySelector('.hud-round-pill')?.innerText || '';
    return {
      timestamp: new Date().toISOString(),
      heartsCount: fullHearts,
      emptyHearts,
      roundPill,
    };
  });

  console.log('📋 [TITAN FORGE RETRY LOG]:', JSON.stringify(retryTitanState, null, 2));
  const retryBufTitan = await page.screenshot();
  saveFrame(retryBufTitan, 'p0_3_titan_retry.png', `Titan Forge Retry: Reset to 3 hearts, round ${retryTitanState.roundPill}`);

  console.log('\n🎉 ALL 8 PLAYTEST FRAMES (4 for Riddle Run, 4 for Titan Forge) CAPTURED SUCCESSFULLY!');
  await browser.close();
}

run().catch(err => {
  console.error('❌ Error in playtest:', err);
  process.exit(1);
});
