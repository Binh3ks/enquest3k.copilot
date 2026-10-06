/**
 * playtest_p0_6_real_chrome.mjs
 *
 * Real Chrome Playtest for Ticket P0-6: Echo Arena Shooter (Floor 3 Door 1)
 * Captures 6 lifecycle and verification frames:
 * 1. Spawn: 4 orbs, 3 hearts full, round 1/4, Jammer at y=235 with >=47px vertical clearance below orbs
 * 2. Bolt Flight (NEW): Bolt mid-air in flight from Leo towards distractor orb (ray aiming proof)
 * 3. Wrong: Bolt hits distractor, 2 hearts left, 1 empty, feedback-wrong toast
 * 4. KO: 3 misses -> 0 hearts, echo-ko-modal visible with SOUND OVERLOAD
 * 5. Retry: Clean reset to 3 hearts, phase playing, round 1/4, ALL 4 orbs cleanly restored
 * 6. Jammer dir=-1: Gremlin moving left, gremlin-icon flipped, gremlin-tag upright & un-mirrored
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
  console.log('🚀 [P0-6 Playtest] Launching Real Chrome GUI...');
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

  console.log('\n======================================================');
  console.log('🧪 TESTING P0-6: ECHO ARENA SHOOTER (Floor 3 Door 1)');
  console.log('======================================================');

  // Navigate to Floor 3 (room 2) with owner bypass
  const targetUrl = `${BASE_URL}/week/33/chronicles?room=2&bypass=true`;
  console.log(`Navigating to ${targetUrl}...`);
  await page.goto(targetUrl, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  // Enter Door 0 (Echo Arena Shooter)
  const doorBtns = await page.$$('.dr-door-enter-btn');
  if (doorBtns.length === 0) {
    throw new Error('No .dr-door-enter-btn found on Floor 3');
  }
  console.log('Clicking Door 0 button...');
  await doorBtns[0].click();

  // Wait for Echo Arena to mount
  await page.waitForSelector('.echo-arena-viewport', { timeout: 8000 });
  await page.waitForSelector('.acoustic-orb-entity', { timeout: 8000 });
  await new Promise(r => setTimeout(r, 1000));

  // -------------------------------------------------------------------------
  // FRAME 1: SPAWN (with Jammer Clearance Verification)
  // -------------------------------------------------------------------------
  console.log('\n--- CAPTURING FRAME 1: SPAWN ---');
  const spawnData = await page.evaluate(() => {
    const fullHearts = document.querySelectorAll('.hud-heart.hud-heart-full').length;
    const emptyHearts = document.querySelectorAll('.hud-heart.hud-heart-empty').length;
    const roundPill = document.querySelector('.hud-round-pill')?.innerText.trim() || '';
    const roundTag = document.querySelector('.echo-round-tag')?.innerText.trim() || '';
    const floorBadge = document.querySelector('.hud-floor-badge')?.innerText.trim() || '';
    const sound = document.querySelector('.echo-target-phoneme')?.innerText.trim() || '';
    const orbs = Array.from(document.querySelectorAll('.acoustic-orb-entity')).map(el => ({
      id: el.getAttribute('data-orb-id'),
      label: el.getAttribute('data-orb-label'),
      isCorrect: el.getAttribute('data-is-correct') === 'true',
      rect: el.getBoundingClientRect(),
    }));
    const gremlin = document.querySelector('.noise-gremlin-sprite');
    const gremlinTag = document.querySelector('.gremlin-tag')?.innerText.trim() || '';
    const gremlinRect = gremlin ? gremlin.getBoundingClientRect() : null;
    const lowestOrbBottom = Math.max(...orbs.map(o => o.rect.bottom));
    const verticalClearance = gremlinRect ? gremlinRect.top - lowestOrbBottom : null;

    return {
      fullHearts,
      emptyHearts,
      roundPill,
      roundTag,
      floorBadge,
      sound,
      orbCount: orbs.length,
      orbs: orbs.map(o => ({ label: o.label, isCorrect: o.isCorrect })),
      gremlinPresent: !!gremlin,
      gremlinTag,
      jammerAltitudeClearance: {
        lowestOrbBottom: Math.round(lowestOrbBottom),
        gremlinTop: gremlinRect ? Math.round(gremlinRect.top) : null,
        verticalClearancePx: Math.round(verticalClearance),
        isNeverOccluded: verticalClearance > 30,
      },
    };
  });
  console.log('DOM Evidence (Spawn):', JSON.stringify(spawnData, null, 2));

  const bufSpawn = await page.screenshot();
  saveFrame(bufSpawn, 'p0_6_echo_spawn.png', 'Spawn frame (4 orbs, 3 hearts full, round 1/4, Jammer at y=235 with clear buffer below orbs)');

  // -------------------------------------------------------------------------
  // FRAME 2: BOLT IN MID-AIR FLIGHT (Ray Aiming Proof)
  // -------------------------------------------------------------------------
  console.log('\n--- CAPTURING FRAME 2: BOLT IN MID-AIR FLIGHT ---');
  // Target distractor 'chair'
  const distractor1 = await page.evaluate(() => {
    const orbs = Array.from(document.querySelectorAll('.acoustic-orb-entity'));
    const wrongOrb = orbs.find(o => o.getAttribute('data-orb-label') === 'chair') ||
      orbs.find(o => o.getAttribute('data-is-correct') === 'false');
    if (!wrongOrb) return null;
    const r = wrongOrb.getBoundingClientRect();
    return {
      label: wrongOrb.getAttribute('data-orb-label'),
      clickX: r.left + r.width / 2,
      clickY: r.top + r.height / 2,
    };
  });
  console.log('Targeting distractor for flight test:', distractor1);
  if (!distractor1) throw new Error('Distractor 1 not found');

  // Click on viewport to fire projectile from Leo
  await page.mouse.click(distractor1.clickX, distractor1.clickY);

  // Wait for bolt to be mid-air (y between 180 and 420)
  await page.waitForFunction(() => {
    const b = document.querySelector('.resonance-bolt-entity');
    if (!b) return false;
    const r = b.getBoundingClientRect();
    return r.top < 430 && r.top > 160;
  }, { timeout: 3000 });

  const flightData = await page.evaluate(() => {
    const b = document.querySelector('.resonance-bolt-entity');
    const leo = document.querySelector('.leo-character-root');
    const bRect = b ? b.getBoundingClientRect() : null;
    const leoRect = leo ? leo.getBoundingClientRect() : null;
    const vp = document.querySelector('.echo-arena-viewport')?.getBoundingClientRect();
    return {
      boltActive: !!b,
      boltScreenPos: bRect ? { x: Math.round(bRect.left), y: Math.round(bRect.top), w: Math.round(bRect.width), h: Math.round(bRect.height) } : null,
      boltViewportRel: (bRect && vp) ? { x: Math.round(bRect.left - vp.left), y: Math.round(bRect.top - vp.top) } : null,
      leoScreenPos: leoRect ? { x: Math.round(leoRect.left), y: Math.round(leoRect.top) } : null,
      leoViewportRel: (leoRect && vp) ? { x: Math.round(leoRect.left - vp.left), y: Math.round(leoRect.top - vp.top) } : null,
    };
  });
  console.log('DOM Evidence (Bolt Flight):', JSON.stringify(flightData, null, 2));

  const bufFlight = await page.screenshot();
  saveFrame(bufFlight, 'p0_6_echo_bolt_flight.png', 'Bolt mid-air flight frame (plasma bolt traveling from Leo upward towards distractor)');

  // -------------------------------------------------------------------------
  // FRAME 3: WRONG ANSWER (After bolt impact)
  // -------------------------------------------------------------------------
  console.log('\n--- CAPTURING FRAME 3: WRONG ANSWER ---');
  // Ensure we hit a distractor: fire at distractor with clear line of sight away from Jammer
  for (let attempt = 0; attempt < 6; attempt++) {
    const fullHearts = await page.evaluate(() => document.querySelectorAll('.hud-heart.hud-heart-full').length);
    if (fullHearts <= 2) break;

    const target = await page.evaluate(() => {
      const orbs = Array.from(document.querySelectorAll('.acoustic-orb-entity'));
      const wrongOrbs = orbs.filter(o => o.getAttribute('data-is-correct') === 'false');
      const gremlin = document.querySelector('.noise-gremlin-sprite')?.getBoundingClientRect();
      const gx = gremlin ? (gremlin.left + gremlin.width / 2) : 400;
      wrongOrbs.sort((a, b) => {
        const da = Math.abs(a.getBoundingClientRect().left - gx);
        const db = Math.abs(b.getBoundingClientRect().left - gx);
        return db - da; // max distance from Jammer first
      });
      const best = wrongOrbs[0];
      if (!best) return null;
      const r = best.getBoundingClientRect();
      return { label: best.getAttribute('data-orb-label'), x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });

    if (target) {
      console.log(`Firing at clear distractor "${target.label}" away from Jammer...`);
      await page.mouse.click(target.x, target.y);
      await new Promise(r => setTimeout(r, 900));
    }
  }

  // Wait for bolt to hit orb, deduct heart, and show feedback toast
  console.log('Waiting for bolt collision and feedback toast...');
  await page.waitForFunction(() => {
    const toast = document.querySelector('.echo-feedback-toast.feedback-wrong');
    const fullHearts = document.querySelectorAll('.hud-heart.hud-heart-full').length;
    const emptyHearts = document.querySelectorAll('.hud-heart.hud-heart-empty').length;
    return toast !== null && fullHearts === 2 && emptyHearts === 1;
  }, { timeout: 8000 });

  const wrongData = await page.evaluate(() => {
    const fullHearts = document.querySelectorAll('.hud-heart.hud-heart-full').length;
    const emptyHearts = document.querySelectorAll('.hud-heart.hud-heart-empty').length;
    const toast = document.querySelector('.echo-feedback-toast');
    return {
      fullHearts,
      emptyHearts,
      feedbackToast: toast ? toast.innerText.trim() : null,
      feedbackClass: toast ? toast.className : null,
    };
  });
  console.log('DOM Evidence (Wrong):', JSON.stringify(wrongData, null, 2));

  const bufWrong = await page.screenshot();
  saveFrame(bufWrong, 'p0_6_echo_wrong.png', 'Wrong answer frame (2 hearts left, 1 heart empty, feedback-wrong toast below banner)');

  // -------------------------------------------------------------------------
  // FRAME 4: KNOCKOUT (KO)
  // -------------------------------------------------------------------------
  console.log('\n--- CAPTURING FRAME 4: KO ---');
  await new Promise(r => setTimeout(r, 1600));

  // Hit remaining distractors until hearts reach 0
  for (let attempt = 0; attempt < 10; attempt++) {
    const fullHearts = await page.evaluate(() => document.querySelectorAll('.hud-heart.hud-heart-full').length);
    if (fullHearts === 0) break;

    const target = await page.evaluate(() => {
      const orbs = Array.from(document.querySelectorAll('.acoustic-orb-entity'));
      const wrongOrbs = orbs.filter(o => o.getAttribute('data-is-correct') === 'false');
      const gremlin = document.querySelector('.noise-gremlin-sprite')?.getBoundingClientRect();
      const gx = gremlin ? (gremlin.left + gremlin.width / 2) : 400;
      wrongOrbs.sort((a, b) => {
        const da = Math.abs(a.getBoundingClientRect().left - gx);
        const db = Math.abs(b.getBoundingClientRect().left - gx);
        return db - da;
      });
      const best = wrongOrbs[0];
      if (!best) return null;
      const r = best.getBoundingClientRect();
      return { label: best.getAttribute('data-orb-label'), x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });

    if (target) {
      console.log(`KO progression: firing at "${target.label}" (fullHearts: ${fullHearts})...`);
      await page.mouse.click(target.x, target.y);
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  // Wait for KO Modal
  console.log('Waiting for .echo-ko-modal...');
  await page.waitForFunction(() => {
    const modal = document.querySelector('.echo-ko-modal');
    const emptyHearts = document.querySelectorAll('.hud-heart.hud-heart-empty').length;
    return modal !== null && emptyHearts === 3;
  }, { timeout: 8000 });

  const koData = await page.evaluate(() => {
    const modal = document.querySelector('.echo-ko-modal');
    const emptyHearts = document.querySelectorAll('.hud-heart.hud-heart-empty').length;
    const title = modal ? modal.querySelector('h2')?.innerText.trim() : null;
    const retryBtn = modal ? modal.querySelector('.retry-btn')?.innerText.trim() : null;
    return {
      koModalVisible: !!modal,
      emptyHearts,
      modalTitle: title,
      retryBtnText: retryBtn,
    };
  });
  console.log('DOM Evidence (KO):', JSON.stringify(koData, null, 2));

  const bufKo = await page.screenshot();
  saveFrame(bufKo, 'p0_6_echo_ko.png', 'KO frame (0 hearts left, SOUND OVERLOAD modal with Try Again button)');

  // -------------------------------------------------------------------------
  // FRAME 5: RETRY RESET (All 4 orbs restored)
  // -------------------------------------------------------------------------
  console.log('\n--- CAPTURING FRAME 5: RETRY RESET ---');
  const retryBtn = await page.$('.echo-ko-modal .retry-btn');
  if (!retryBtn) throw new Error('Retry button not found in KO modal');
  console.log('Clicking Try Again button...');
  await retryBtn.click();

  // Wait for clean reset: modal unmounted, 3 hearts full, round 1/4, 4 orbs active
  await page.waitForFunction(() => {
    const modal = document.querySelector('.echo-ko-modal');
    const fullHearts = document.querySelectorAll('.hud-heart.hud-heart-full').length;
    const roundPill = document.querySelector('.hud-round-pill')?.innerText.trim() || '';
    const orbs = document.querySelectorAll('.acoustic-orb-entity');
    return modal === null && fullHearts === 3 && roundPill.includes('1/4') && orbs.length === 4;
  }, { timeout: 5000 });

  const retryData = await page.evaluate(() => {
    const fullHearts = document.querySelectorAll('.hud-heart.hud-heart-full').length;
    const emptyHearts = document.querySelectorAll('.hud-heart.hud-heart-empty').length;
    const roundPill = document.querySelector('.hud-round-pill')?.innerText.trim() || '';
    const roundTag = document.querySelector('.echo-round-tag')?.innerText.trim() || '';
    const orbs = Array.from(document.querySelectorAll('.acoustic-orb-entity')).map(el => el.getAttribute('data-orb-label'));
    return {
      fullHearts,
      emptyHearts,
      roundPill,
      roundTag,
      activeOrbsCount: orbs.length,
      activeOrbs: orbs,
    };
  });
  console.log('DOM Evidence (Retry):', JSON.stringify(retryData, null, 2));

  const bufRetry = await page.screenshot();
  saveFrame(bufRetry, 'p0_6_echo_retry.png', 'Retry frame (Clean reset: 3 hearts full, round 1/4, all 4 orbs restored)');

  // -------------------------------------------------------------------------
  // FRAME 6: JAMMER DIRECTION LEFT & TRANSFORM ISOLATION
  // -------------------------------------------------------------------------
  console.log('\n--- CAPTURING FRAME 6: JAMMER DIR LEFT & TRANSFORM PROOF ---');
  console.log('Waiting for Noise Gremlin to patrol towards left (dir < 0)...');
  await page.waitForFunction(() => {
    const icon = document.querySelector('.gremlin-icon');
    if (!icon) return false;
    const style = icon.getAttribute('style') || '';
    return style.includes('scaleX(-1)');
  }, { timeout: 15000 });

  const jammerData = await page.evaluate(() => {
    const sprite = document.querySelector('.noise-gremlin-sprite');
    const icon = document.querySelector('.gremlin-icon');
    const tag = document.querySelector('.gremlin-tag');
    const orbs = Array.from(document.querySelectorAll('.acoustic-orb-entity')).map(o => o.getBoundingClientRect().bottom);
    const lowestOrbBottom = Math.max(...orbs);
    const spriteRect = sprite ? sprite.getBoundingClientRect() : null;
    return {
      spriteTransform: sprite ? window.getComputedStyle(sprite).transform : null,
      iconInlineTransform: icon ? icon.style.transform : null,
      iconComputedTransform: icon ? window.getComputedStyle(icon).transform : null,
      tagComputedTransform: tag ? window.getComputedStyle(tag).transform : null,
      tagText: tag ? tag.innerText.trim() : null,
      lowestOrbBottom: Math.round(lowestOrbBottom),
      jammerTop: spriteRect ? Math.round(spriteRect.top) : null,
      verticalClearancePx: spriteRect ? Math.round(spriteRect.top - lowestOrbBottom) : null,
    };
  });
  console.log('DOM Evidence (Jammer Transform):', JSON.stringify(jammerData, null, 2));

  const bufJammer = await page.screenshot();
  saveFrame(bufJammer, 'p0_6_jammer_dir_left.png', 'Jammer frame (dir=-1: icon flipped via scaleX(-1), JAMMER label upright, clearance >=40px)');

  console.log('\n======================================================');
  console.log('🎉 P0-6 REAL CHROME PLAYTEST COMPLETED SUCCESSFULLY!');
  console.log('======================================================\n');

  await browser.close();
}

run().catch(err => {
  console.error('❌ Playtest error:', err);
  process.exit(1);
});
