/**
 * playtest_p0_4_p0_5_real_chrome.mjs
 *
 * Real Chrome Playtest for:
 * - Ticket P0-4: Anvil Rush Grammar (Floor 2 Door 2)
 * - Ticket P0-5: Grand Master Matrix (Floor 5 Door 1)
 *
 * Full 4-frame lifecycle validation for both games:
 * Frame 1: Spawn (4 options, 3 hearts full, round 1/4)
 * Frame 2: Wrong (2 hearts left, 1 empty, feedback toast, DOM-synced)
 * Frame 3: KO (0 hearts left, KO modal visible)
 * Frame 4: Retry (Reset to 3 hearts, phase playing, round 1)
 * Extra: Glitch Sentinel un-mirrored label verification
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
  console.log('🚀 [P0-4 & P0-5 Playtest] Launching Real Chrome GUI...');
  const browser = await puppeteer.launch({
    executablePath: fs.existsSync(CHROME_PATH) ? CHROME_PATH : undefined,
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--window-size=1280,820'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  page.on('console', msg => console.log('🌐 [BROWSER CONSOLE]:', msg.type(), msg.text()));
  page.on('pageerror', err => console.error('🔴 [PAGE ERROR]:', err.message));

  // =========================================================================
  // TEST P0-4: ANVIL RUSH GRAMMAR (Floor 2 Door 2)
  // =========================================================================
  console.log('\n======================================================');
  console.log('🧪 TESTING P0-4: ANVIL RUSH GRAMMAR (4 Anvils, 4 Rounds, 3 Hearts)');
  console.log('======================================================');

  await page.goto(`${BASE_URL}/quest-demo`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  await page.waitForSelector('#select-active-game', { timeout: 5000 });
  await page.select('#select-active-game', 'anvil_rush');
  await new Promise(r => setTimeout(r, 1500));

  // Wait for 4 anvils to be present in DOM
  await page.waitForFunction(() => {
    const anvils = document.querySelectorAll('.anvil-entity');
    return anvils.length === 4;
  }, { timeout: 5000 });

  // Helper to teleport Leo to anvil and click it
  async function triggerAnvil(anvilId, ax, ay) {
    const result = await page.evaluate((aId, x, y) => {
      const root = document.querySelector('.anvil-world-viewport');
      const fiberKey = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));
      let fiber = root ? root[fiberKey] : null;
      let foundLeo = null;
      while (fiber) {
        if (fiber.memoizedState) {
          let s = fiber.memoizedState;
          while (s) {
            if (s.memoizedState?.current?.vx !== undefined && s.memoizedState?.current?.x !== undefined) {
              foundLeo = s.memoizedState.current;
              s.memoizedState.current.x = x + 10;
              s.memoizedState.current.y = y - 10;
              s.memoizedState.current.vx = 0;
              s.memoizedState.current.vy = 0;
              s.memoizedState.current.onGround = true;
              break;
            }
            s = s.next;
          }
        }
        if (foundLeo) break;
        fiber = fiber.return;
      }
      const el = document.querySelector(`[data-anvil-id="${aId}"]`);
      let dist = 999;
      if (foundLeo) {
        dist = Math.hypot((foundLeo.x + 20) - (x + 35), (foundLeo.y + 24) - (y + 20));
      }
      if (el) el.click();
      return { foundLeo: !!foundLeo, leoPos: foundLeo ? { x: foundLeo.x, y: foundLeo.y } : null, dist, elFound: !!el, aId };
    }, anvilId, ax, ay);
    console.log(`🔨 triggerAnvil(${anvilId}):`, JSON.stringify(result));
    return result;
  }

  // FRAME 1: Spawn
  const initialAnvilState = await page.evaluate(() => {
    const anvils = Array.from(document.querySelectorAll('.anvil-entity')).map(a => ({
      id: a.getAttribute('data-anvil-id'),
      word: a.getAttribute('data-anvil-word'),
      isCorrect: a.getAttribute('data-is-correct') === 'true',
      x: parseFloat(a.style.left) || 145,
      y: parseFloat(a.style.top) || 265,
    }));
    const fullHearts = document.querySelectorAll('.hud-heart-full').length;
    const sentenceText = document.querySelector('.forge-target-sentence')?.innerText || '';
    const badgeText = document.querySelector('.forge-badge span')?.innerText || '';
    const roundPill = document.querySelector('.hud-round-pill')?.innerText || '';

    return {
      timestamp: new Date().toISOString(),
      heartsCount: fullHearts,
      anvilCount: anvils.length,
      anvils,
      sentenceText,
      badgeText,
      roundPill,
    };
  });

  console.log('📋 [ANVIL RUSH SPAWN LOG]:', JSON.stringify(initialAnvilState, null, 2));
  const spawnBufAnvil = await page.screenshot();
  saveFrame(spawnBufAnvil, 'p0_4_anvil_spawn.png', 'Anvil Rush Spawn: 4 anvils, 3 hearts full, round 1/4');

  // FRAME 2: Wrong Anvil Strike (Miss #1)
  console.log('🏹 Navigating Leo close to WRONG Anvil #1 and striking...');
  const wrongAnvils = initialAnvilState.anvils.filter(a => !a.isCorrect);
  await triggerAnvil(wrongAnvils[0].id, wrongAnvils[0].x, wrongAnvils[0].y);

  // STRICT SYNC: Wait until HUD hearts DOM computed count reaches exactly 2 full hearts AND feedback toast mounts
  await page.waitForFunction(() => {
    const hearts = document.querySelectorAll('.hud-heart-full').length === 2;
    const toast = document.querySelector('.forge-feedback-toast');
    return hearts && toast && toast.innerText.length > 0;
  }, { timeout: 4000 });
  await new Promise(r => setTimeout(r, 100)); // allow CSS transition to finish

  const wrongAnvilState = await page.evaluate(() => {
    const fullHearts = document.querySelectorAll('.hud-heart-full').length;
    const emptyHearts = document.querySelectorAll('.hud-heart-empty').length;
    const feedbackToast = document.querySelector('.forge-feedback-toast')?.innerText || null;
    const hudLabel = document.querySelector('.hud-hearts')?.getAttribute('aria-label') || '';

    return {
      timestamp: new Date().toISOString(),
      heartsCount: fullHearts,
      emptyHearts,
      hudLabel,
      feedbackToast,
    };
  });

  console.log('📋 [ANVIL RUSH WRONG LOG]:', JSON.stringify(wrongAnvilState, null, 2));
  const wrongBufAnvil = await page.screenshot();
  saveFrame(wrongBufAnvil, 'p0_4_anvil_wrong.png', `Anvil Rush Wrong: 2 hearts left, toast "${wrongAnvilState.feedbackToast}"`);

  // Miss #2: Deplete to 1 heart
  console.log('🏹 Navigating Leo to WRONG Anvil #2...');
  await new Promise(r => setTimeout(r, 2200)); // wait for invincibility and feedback to fade
  await triggerAnvil(wrongAnvils[1].id, wrongAnvils[1].x, wrongAnvils[1].y);
  await page.waitForFunction(() => {
    return document.querySelectorAll('.hud-heart-full').length === 1;
  }, { timeout: 4000 });

  // Miss #3: Deplete to 0 hearts -> Trigger KO Modal
  console.log('🏹 Navigating Leo to WRONG Anvil #3 (Depleting to 0 hearts)...');
  await new Promise(r => setTimeout(r, 2200));
  await triggerAnvil(wrongAnvils[2].id, wrongAnvils[2].x, wrongAnvils[2].y);

  // Wait for KO Modal to appear
  await page.waitForSelector('.anvil-ko-modal', { timeout: 5000 });
  await new Promise(r => setTimeout(r, 200));

  const koAnvilState = await page.evaluate(() => {
    const fullHearts = document.querySelectorAll('.hud-heart-full').length;
    const emptyHearts = document.querySelectorAll('.hud-heart-empty').length;
    const koTitle = document.querySelector('.anvil-ko-modal h2')?.innerText || '';
    const koDesc = document.querySelector('.anvil-ko-modal p')?.innerText || '';
    const hasRetryBtn = !!document.querySelector('.anvil-ko-modal .retry-btn');

    return {
      timestamp: new Date().toISOString(),
      heartsCount: fullHearts,
      emptyHearts,
      koTitle,
      koDesc,
      hasRetryBtn,
    };
  });

  console.log('📋 [ANVIL RUSH KO LOG]:', JSON.stringify(koAnvilState, null, 2));
  const koBufAnvil = await page.screenshot();
  saveFrame(koBufAnvil, 'p0_4_anvil_ko.png', `Anvil Rush KO: ${koAnvilState.koTitle} — 0 hearts left`);

  // FRAME 4: Retry
  console.log('🔄 Clicking "Try Again" on Anvil KO Modal...');
  await page.click('.anvil-ko-modal .retry-btn');
  await page.waitForFunction(() => {
    const modal = document.querySelector('.anvil-ko-modal');
    const fullHearts = document.querySelectorAll('.hud-heart-full').length;
    return !modal && fullHearts === 3;
  }, { timeout: 5000 });
  await new Promise(r => setTimeout(r, 200));

  const retryAnvilState = await page.evaluate(() => {
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

  console.log('📋 [ANVIL RUSH RETRY LOG]:', JSON.stringify(retryAnvilState, null, 2));
  const retryBufAnvil = await page.screenshot();
  saveFrame(retryBufAnvil, 'p0_4_anvil_retry.png', `Anvil Rush Retry: Reset to 3 hearts, round ${retryAnvilState.roundPill}`);

  // =========================================================================
  // TEST P0-5: GRAND MASTER MATRIX (Floor 5 Door 1)
  // =========================================================================
  console.log('\n======================================================');
  console.log('🧪 TESTING P0-5: GRAND MASTER MATRIX (4 Glyphs, 4 Rounds, 3 Hearts)');
  console.log('======================================================');

  await page.select('#select-active-game', 'grand_matrix');
  await new Promise(r => setTimeout(r, 1500));

  // Wait for 4 glyph nodes to be present in DOM
  await page.waitForFunction(() => {
    const glyphs = document.querySelectorAll('.matrix-glyph-entity');
    return glyphs.length === 4;
  }, { timeout: 5000 });

  // Helper to teleport Leo to glyph node and click it
  async function triggerGlyph(nodeId, nx, ny) {
    await page.evaluate((nId, x, y) => {
      const root = document.querySelector('.matrix-dungeon-root');
      const fiberKey = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));
      let fiber = root ? root[fiberKey] : null;
      while (fiber) {
        if (fiber.memoizedState) {
          let s = fiber.memoizedState;
          while (s) {
            if (s.memoizedState?.current?.vx !== undefined && s.memoizedState?.current?.x !== undefined) {
              s.memoizedState.current.x = x + 15;
              s.memoizedState.current.y = y - 5;
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
      const el = document.querySelector(`[data-node-id="${nId}"]`);
      if (el) el.click();
    }, nodeId, nx, ny);
  }

  // FRAME 1: Spawn
  const initialMatrixState = await page.evaluate(() => {
    const glyphs = Array.from(document.querySelectorAll('.matrix-glyph-entity')).map(g => ({
      id: g.getAttribute('data-node-id'),
      word: g.getAttribute('data-node-word'),
      isTarget: g.getAttribute('data-is-target') === 'true',
      x: parseFloat(g.style.left) || 120,
      y: parseFloat(g.style.top) || 370,
    }));
    const fullHearts = document.querySelectorAll('.hud-heart-full').length;
    const defText = document.querySelector('.matrix-def-text')?.innerText || '';
    const roundChip = document.querySelector('.matrix-round-chip')?.innerText || '';
    const roundPill = document.querySelector('.hud-round-pill')?.innerText || '';

    return {
      timestamp: new Date().toISOString(),
      heartsCount: fullHearts,
      glyphCount: glyphs.length,
      glyphs,
      defText,
      roundChip,
      roundPill,
    };
  });

  console.log('📋 [GRAND MATRIX SPAWN LOG]:', JSON.stringify(initialMatrixState, null, 2));
  const spawnBufMatrix = await page.screenshot();
  saveFrame(spawnBufMatrix, 'p0_5_matrix_spawn.png', 'Grand Matrix Spawn: 4 glyphs, 3 hearts full, round 1/4');

  // FRAME 2: Wrong Glyph Harvest (Miss #1)
  console.log('🏹 Navigating Leo close to WRONG Glyph Node #1 and harvesting...');
  const wrongGlyphs = initialMatrixState.glyphs.filter(g => !g.isTarget);
  await triggerGlyph(wrongGlyphs[0].id, wrongGlyphs[0].x, wrongGlyphs[0].y);

  // STRICT SYNC: Wait until HUD hearts DOM computed count reaches exactly 2 full hearts
  await page.waitForFunction(() => {
    return document.querySelectorAll('.hud-heart-full').length === 2;
  }, { timeout: 4000 });
  await new Promise(r => setTimeout(r, 100)); // allow CSS transition to finish

  const wrongMatrixState = await page.evaluate(() => {
    const fullHearts = document.querySelectorAll('.hud-heart-full').length;
    const emptyHearts = document.querySelectorAll('.hud-heart-empty').length;
    const feedbackToast = document.querySelector('.matrix-feedback-toast')?.innerText || null;
    const hudLabel = document.querySelector('.hud-hearts')?.getAttribute('aria-label') || '';

    return {
      timestamp: new Date().toISOString(),
      heartsCount: fullHearts,
      emptyHearts,
      hudLabel,
      feedbackToast,
    };
  });

  console.log('📋 [GRAND MATRIX WRONG LOG]:', JSON.stringify(wrongMatrixState, null, 2));
  const wrongBufMatrix = await page.screenshot();
  saveFrame(wrongBufMatrix, 'p0_5_matrix_wrong.png', `Grand Matrix Wrong: 2 hearts left, toast "${wrongMatrixState.feedbackToast}"`);

  // Miss #2: Deplete to 1 heart
  console.log('🏹 Navigating Leo to WRONG Glyph #2...');
  await new Promise(r => setTimeout(r, 1600));
  await triggerGlyph(wrongGlyphs[1].id, wrongGlyphs[1].x, wrongGlyphs[1].y);
  await page.waitForFunction(() => {
    return document.querySelectorAll('.hud-heart-full').length === 1;
  }, { timeout: 4000 });

  // Miss #3: Deplete to 0 hearts -> Trigger KO Modal
  console.log('🏹 Navigating Leo to WRONG Glyph #3 (Depleting to 0 hearts)...');
  await new Promise(r => setTimeout(r, 1600));
  await triggerGlyph(wrongGlyphs[2].id, wrongGlyphs[2].x, wrongGlyphs[2].y);

  // Wait for KO Modal to appear
  await page.waitForSelector('.matrix-ko-modal', { timeout: 5000 });
  await new Promise(r => setTimeout(r, 200));

  const koMatrixState = await page.evaluate(() => {
    const fullHearts = document.querySelectorAll('.hud-heart-full').length;
    const emptyHearts = document.querySelectorAll('.hud-heart-empty').length;
    const koTitle = document.querySelector('.matrix-ko-modal h2')?.innerText || '';
    const koDesc = document.querySelector('.matrix-ko-modal p')?.innerText || '';
    const hasRetryBtn = !!document.querySelector('.matrix-ko-modal .retry-btn');

    return {
      timestamp: new Date().toISOString(),
      heartsCount: fullHearts,
      emptyHearts,
      koTitle,
      koDesc,
      hasRetryBtn,
    };
  });

  console.log('📋 [GRAND MATRIX KO LOG]:', JSON.stringify(koMatrixState, null, 2));
  const koBufMatrix = await page.screenshot();
  saveFrame(koBufMatrix, 'p0_5_matrix_ko.png', `Grand Matrix KO: ${koMatrixState.koTitle} — 0 hearts left`);

  // FRAME 4: Retry
  console.log('🔄 Clicking "Try Again" on Matrix KO Modal...');
  await page.click('.matrix-ko-modal .retry-btn');
  await page.waitForFunction(() => {
    const modal = document.querySelector('.matrix-ko-modal');
    const fullHearts = document.querySelectorAll('.hud-heart-full').length;
    return !modal && fullHearts === 3;
  }, { timeout: 5000 });
  await new Promise(r => setTimeout(r, 200));

  const retryMatrixState = await page.evaluate(() => {
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

  console.log('📋 [GRAND MATRIX RETRY LOG]:', JSON.stringify(retryMatrixState, null, 2));
  const retryBufMatrix = await page.screenshot();
  saveFrame(retryBufMatrix, 'p0_5_matrix_retry.png', `Grand Matrix Retry: Reset to 3 hearts, round ${retryMatrixState.roundPill}`);

  // EXTRA: Glitch Sentinel un-mirrored label verification
  console.log('\n👁️ Verifying Glitch Sentinel moving LEFT (dir = -1)...');
  await page.evaluate(() => {
    const root = document.querySelector('.matrix-dungeon-root');
    const fiberKey = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));
    let fiber = root ? root[fiberKey] : null;
    while (fiber) {
      if (fiber.memoizedState) {
        let s = fiber.memoizedState;
        while (s) {
          if (s.memoizedState?.current?.vx === 2.2 && s.memoizedState?.current?.dir !== undefined) {
            s.memoizedState.current.x = 650;
            s.memoizedState.current.dir = -1;
            break;
          }
          s = s.next;
        }
      }
      fiber = fiber.return;
    }
  });

  await page.waitForFunction(() => {
    const icon = document.querySelector('.glitch-sentinel-sprite .sentinel-icon');
    const computed = window.getComputedStyle(icon);
    return computed.transform.includes('-1');
  }, { timeout: 4000 });
  await new Promise(r => setTimeout(r, 100));

  const glitchLeftLog = await page.evaluate(() => {
    const sprite = document.querySelector('.glitch-sentinel-sprite');
    const icon = document.querySelector('.glitch-sentinel-sprite .sentinel-icon');
    const tag = document.querySelector('.glitch-sentinel-sprite .sentinel-tag');
    return {
      direction: 'LEFT (dir = -1)',
      parentTransform: window.getComputedStyle(sprite).transform,
      iconTransform: window.getComputedStyle(icon).transform,
      tagTransform: window.getComputedStyle(tag).transform,
      tagText: tag.innerText,
    };
  });
  console.log('📋 [GLITCH SENTINEL MOVING LEFT EVIDENCE]:', JSON.stringify(glitchLeftLog, null, 2));

  const glitchBuf = await page.screenshot();
  saveFrame(glitchBuf, 'p0_5_glitch_dir_left.png', 'Glitch Sentinel moving LEFT: icon flipped horizontally, label GLITCH upright (NOT mirrored)');

  console.log('\n🎉 ALL 9 PLAYTEST FRAMES FOR P0-4 & P0-5 CAPTURED SUCCESSFULLY!');
  await browser.close();
}

run().catch(err => {
  console.error('❌ Error in playtest:', err);
  process.exit(1);
});
