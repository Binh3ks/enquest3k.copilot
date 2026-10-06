import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = '/Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots';
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

const TARGET_GAMES = [
  {
    code: 'F1D1',
    name: 'Arcane Bubble (Bubble Storm Chase)',
    room: 0,
    doorIdx: 0,
    prefix: 'f1d1_bubble_chase',
    enemySelector: '.storm-slime-enemy',
  },
  {
    code: 'F1D2',
    name: 'Spell Train (Word Wagon Jump)',
    room: 0,
    doorIdx: 1,
    prefix: 'f1d2_wagon_jump',
    enemySelector: '.ground-zombie-sprite, .train-wagon-entity',
  },
  {
    code: 'F1D3',
    name: 'Lexical Detective (Shadow Vault Infiltrate)',
    room: 0,
    doorIdx: 2,
    prefix: 'f1d3_shadow_vault',
    enemySelector: '.shadow-guard-entity',
  },
  {
    code: 'F2D1',
    name: 'Crystal Match (Potion Flip Dungeon)',
    room: 1,
    doorIdx: 0,
    prefix: 'f2d1_potion_flip',
    enemySelector: '.lab-gremlin-sprite',
  },
  {
    code: 'F2D2',
    name: 'Rune Forge (Anvil Rush Grammar)',
    room: 1,
    doorIdx: 1,
    prefix: 'f2d2_anvil_rush',
    enemySelector: '.forge-imp-sprite',
  },
];

function inspectGameState(enemySel) {
  const leo = document.querySelector('.leo-character');
  const timer = document.querySelector('.hud-timer, [class*="timer"], .dr-hud-timer')?.innerText?.trim() || 'N/A';
  const feedback = document.querySelector('[class*="feedback"], [class*="toast"], .vault-feedback-alert')?.innerText?.trim() || null;

  // Extract hearts
  const heartFullEls = document.querySelectorAll('.hud-heart-full');
  const heartEmptyEls = document.querySelectorAll('.hud-heart-empty');
  let heartsCount = heartFullEls.length;
  if (heartFullEls.length === 0 && heartEmptyEls.length === 0) {
    const heartsAria = document.querySelector('.hud-hearts')?.getAttribute('aria-label');
    if (heartsAria) {
      heartsCount = parseInt(heartsAria.split(' ')[0], 10) || 0;
    } else {
      heartsCount = 3;
    }
  }

  let leoData = null;
  if (leo) {
    const r = leo.getBoundingClientRect();
    leoData = {
      worldLeft: parseFloat(leo.style.left) || 0,
      worldTop: parseFloat(leo.style.top) || 0,
      clientRect: {
        x: Math.round(r.x * 100) / 100,
        y: Math.round(r.y * 100) / 100,
        width: Math.round(r.width * 100) / 100,
        height: Math.round(r.height * 100) / 100,
      }
    };
  }

  const enemyEls = Array.from(document.querySelectorAll(enemySel));
  const enemiesData = enemyEls.map(el => {
    const r = el.getBoundingClientRect();
    return {
      className: el.className,
      worldLeft: parseFloat(el.style.left) || 0,
      worldTop: parseFloat(el.style.top) || 0,
      clientRect: {
        x: Math.round(r.x * 100) / 100,
        y: Math.round(r.y * 100) / 100,
        width: Math.round(r.width * 100) / 100,
        height: Math.round(r.height * 100) / 100,
      }
    };
  });

  return {
    timer,
    hearts: heartsCount,
    feedback,
    leo: leoData,
    enemies: enemiesData,
  };
}

async function runAudit() {
  console.log('=== STARTING PRECISE AUDIT FOR 5 GAMES (F1D1, F1D2, F1D3, F2D1, F2D2) ===');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const auditTimestamp = new Date().toISOString();
  const results = [];

  for (const game of TARGET_GAMES) {
    console.log(`\n======================================================`);
    console.log(`AUDITING ${game.code}: ${game.name} (Room ${game.room}, Door ${game.doorIdx})`);
    console.log(`======================================================`);

    const gameResult = {
      code: game.code,
      name: game.name,
      room: game.room,
      doorIdx: game.doorIdx,
      desktop: {},
      mobile: {},
    };

    // ── 1. DESKTOP AUDIT (1280x800) ──
    const pageDesk = await browser.newPage();
    await pageDesk.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });

    const roomUrl = `${BASE_URL}/week/33/chronicles?room=${game.room}&bypass=true`;
    await pageDesk.goto(roomUrl, { waitUntil: 'networkidle0', timeout: 15000 });
    await new Promise(r => setTimeout(r, 600));

    // Click door to enter mini-game
    const dBtns = await pageDesk.$$('.dr-door-enter-btn');
    if (!dBtns[game.doorIdx]) {
      throw new Error(`Door ${game.doorIdx} not found in Room ${game.room}`);
    }
    await dBtns[game.doorIdx].click();
    await new Promise(r => setTimeout(r, 600)); // wait for mount

    // Desktop Baseline
    const deskBase = await pageDesk.evaluate(inspectGameState, game.enemySelector);
    const deskBasePic = `${game.prefix}_desktop_baseline_precise.png`;
    const deskBasePicPath = path.join(OUTPUT_DIR, deskBasePic);
    await pageDesk.screenshot({ path: deskBasePicPath });
    fs.copyFileSync(deskBasePicPath, path.join(BRAIN_DIR, deskBasePic));
    console.log(`[Desktop Baseline] Timer: ${deskBase.timer}, Hearts: ${deskBase.hearts}, Leo:`, deskBase.leo);

    // Desktop Action: Hold ArrowRight for 600ms
    await pageDesk.keyboard.down('ArrowRight');
    await new Promise(r => setTimeout(r, 600));
    await pageDesk.keyboard.up('ArrowRight');
    await new Promise(r => setTimeout(r, 200));

    const deskAction = await pageDesk.evaluate(inspectGameState, game.enemySelector);
    const deskActionPic = `${game.prefix}_desktop_action_precise.png`;
    const deskActionPicPath = path.join(OUTPUT_DIR, deskActionPic);
    await pageDesk.screenshot({ path: deskActionPicPath });
    fs.copyFileSync(deskActionPicPath, path.join(BRAIN_DIR, deskActionPic));
    console.log(`[Desktop Action] Timer: ${deskAction.timer}, Hearts: ${deskAction.hearts}, Leo:`, deskAction.leo);

    const deskDeltaX = (deskAction.leo?.worldLeft ?? 0) - (deskBase.leo?.worldLeft ?? 0);
    const deskClientDeltaX = (deskAction.leo?.clientRect?.x ?? 0) - (deskBase.leo?.clientRect?.x ?? 0);

    gameResult.desktop = {
      baseline: deskBase,
      action: deskAction,
      deltaX: Math.round(deskDeltaX * 100) / 100,
      clientDeltaX: Math.round(deskClientDeltaX * 100) / 100,
      hasMoved: Math.abs(deskDeltaX) > 5,
      baselineScreenshot: deskBasePic,
      actionScreenshot: deskActionPic,
    };

    await pageDesk.close();

    // ── 2. MOBILE AUDIT (390x844 Touch-enabled) ──
    const pageMob = await browser.newPage();
    await pageMob.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });

    await pageMob.goto(roomUrl, { waitUntil: 'networkidle0', timeout: 15000 });
    await new Promise(r => setTimeout(r, 600));

    const mobDBtns = await pageMob.$$('.dr-door-enter-btn');
    await mobDBtns[game.doorIdx].click();
    await new Promise(r => setTimeout(r, 600));

    // Mobile Baseline
    const mobBase = await pageMob.evaluate(inspectGameState, game.enemySelector);
    const mobBasePic = `${game.prefix}_mobile_baseline_precise.png`;
    const mobBasePicPath = path.join(OUTPUT_DIR, mobBasePic);
    await pageMob.screenshot({ path: mobBasePicPath });
    fs.copyFileSync(mobBasePicPath, path.join(BRAIN_DIR, mobBasePic));
    console.log(`[Mobile Baseline] Timer: ${mobBase.timer}, Hearts: ${mobBase.hearts}, Leo:`, mobBase.leo);

    // Mobile Action: Press ArrowRight for 600ms
    await pageMob.keyboard.down('ArrowRight');
    await new Promise(r => setTimeout(r, 600));
    await pageMob.keyboard.up('ArrowRight');
    await new Promise(r => setTimeout(r, 200));

    const mobAction = await pageMob.evaluate(inspectGameState, game.enemySelector);
    const mobActionPic = `${game.prefix}_mobile_action_precise.png`;
    const mobActionPicPath = path.join(OUTPUT_DIR, mobActionPic);
    await pageMob.screenshot({ path: mobActionPicPath });
    fs.copyFileSync(mobActionPicPath, path.join(BRAIN_DIR, mobActionPic));
    console.log(`[Mobile Action] Timer: ${mobAction.timer}, Hearts: ${mobAction.hearts}, Leo:`, mobAction.leo);

    const mobDeltaX = (mobAction.leo?.worldLeft ?? 0) - (mobBase.leo?.worldLeft ?? 0);
    const mobClientDeltaX = (mobAction.leo?.clientRect?.x ?? 0) - (mobBase.leo?.clientRect?.x ?? 0);

    gameResult.mobile = {
      baseline: mobBase,
      action: mobAction,
      deltaX: Math.round(mobDeltaX * 100) / 100,
      clientDeltaX: Math.round(mobClientDeltaX * 100) / 100,
      hasMoved: Math.abs(mobDeltaX) > 5,
      baselineScreenshot: mobBasePic,
      actionScreenshot: mobActionPic,
    };

    await pageMob.close();
    results.push(gameResult);
  }

  // ── 3. VIỆC N: DETAILED INTERACTIVE GAMEPLAY AUDIT ON F1D1 ──
  console.log('\n======================================================');
  console.log('VIỆC N: INTERACTIVE GAMEPLAY SIMULATION & VERIFICATION ON F1D1');
  console.log('======================================================');

  const pageN = await browser.newPage();
  await pageN.setViewport({ width: 1280, height: 800 });
  await pageN.goto(`${BASE_URL}/week/33/chronicles?room=0&bypass=true`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  const door0 = (await pageN.$$('.dr-door-enter-btn'))[0];
  await door0.click();
  await new Promise(r => setTimeout(r, 600));

  // Step N1: Stand completely idle for 2000ms — Check if Leo moves automatically
  const idleStart = await pageN.evaluate(inspectGameState, '.storm-slime-enemy');
  await new Promise(r => setTimeout(r, 2000));
  const idleEnd = await pageN.evaluate(inspectGameState, '.storm-slime-enemy');
  const idleDeltaX = Math.abs((idleEnd.leo?.worldLeft ?? 0) - (idleStart.leo?.worldLeft ?? 0));
  console.log(`[VIỆC N - Test N1: Idle Test] 2000ms idle elapsed. Leo start: ${idleStart.leo?.worldLeft}, end: ${idleEnd.leo?.worldLeft}, DeltaX: ${idleDeltaX}px`);

  // Step N2: Active Jump Test — Press ArrowUp to trigger vertical jump
  const jumpStart = await pageN.evaluate(inspectGameState, '.storm-slime-enemy');
  await pageN.keyboard.down('ArrowUp');
  await new Promise(r => setTimeout(r, 120));
  await pageN.keyboard.up('ArrowUp');
  await new Promise(r => setTimeout(r, 180)); // capture mid-air before landing
  const jumpMid = await pageN.evaluate(inspectGameState, '.storm-slime-enemy');
  const jumpDeltaY = Math.round(((jumpStart.leo?.worldTop ?? 460) - (jumpMid.leo?.worldTop ?? 460)) * 100) / 100;
  console.log(`[VIỆC N - Test N2: Jump Test] Leo ground Y: ${jumpStart.leo?.worldTop}, Mid-air Y: ${jumpMid.leo?.worldTop}, Jump Height: ${jumpDeltaY}px`);

  // Step N3: Hazard Collision & Heart Loss Test
  // Move Leo into the patrol path of the Slime (around x=350) and stand still until hit
  console.log('[VIỆC N - Test N3: Hazard Collision Test] Moving Leo into Slime patrol path (x=360)...');
  await pageN.keyboard.down('ArrowRight');
  await new Promise(r => setTimeout(r, 1200));
  await pageN.keyboard.up('ArrowRight');

  const beforeHit = await pageN.evaluate(inspectGameState, '.storm-slime-enemy');
  console.log(`[VIỆC N - Test N3] Leo positioned at x: ${beforeHit.leo?.worldLeft}, Hearts before hit: ${beforeHit.hearts}. Waiting for Slime patrol collision...`);

  let hitDetected = false;
  let afterHit = null;
  const hitStartTime = Date.now();

  while (Date.now() - hitStartTime < 6000) {
    await new Promise(r => setTimeout(r, 200));
    afterHit = await pageN.evaluate(inspectGameState, '.storm-slime-enemy');
    if (afterHit.hearts < beforeHit.hearts) {
      hitDetected = true;
      console.log(`[VIỆC N - Test N3] Collision detected! Hearts reduced from ${beforeHit.hearts} to ${afterHit.hearts}! Feedback: ${afterHit.feedback}`);
      break;
    }
  }

  const picN3 = 'f1d1_interactive_hazard_hit_evidence.png';
  await pageN.screenshot({ path: path.join(OUTPUT_DIR, picN3) });
  fs.copyFileSync(path.join(OUTPUT_DIR, picN3), path.join(BRAIN_DIR, picN3));

  await pageN.close();

  const finalOutput = {
    auditTimestamp,
    games: results,
    interactiveTestN_F1D1: {
      game: 'F1D1 (Bubble Storm Chase)',
      testN1_IdleWithoutInput: {
        idleDurationMs: 2000,
        leoMovedWithoutInput: idleDeltaX > 1,
        leoDeltaX: idleDeltaX,
        conclusion: idleDeltaX <= 1 ? 'Leo stands completely motionless without input (NOT cosmetic auto-walk).' : 'Leo moved automatically.'
      },
      testN2_PhysicsJump: {
        groundWorldTop: jumpStart.leo?.worldTop,
        midAirWorldTop: jumpMid.leo?.worldTop,
        jumpLiftHeightPx: jumpDeltaY,
        conclusion: jumpDeltaY > 15 ? 'Jump physics and vertical gravity engine active.' : 'Jump failed.'
      },
      testN3_HazardCollisionHeartLoss: {
        heartsBeforeCollision: beforeHit.hearts,
        heartsAfterCollision: afterHit?.hearts,
        heartLossConfirmed: hitDetected,
        screenshot: picN3,
        conclusion: hitDetected ? 'Collision with Slime hazard directly deducts Heart (real-time penalty verified).' : 'Collision not triggered in time.'
      }
    }
  };

  const jsonPath = path.join(OUTPUT_DIR, 'audit_floor_1_2_evidence.json');
  fs.writeFileSync(jsonPath, JSON.stringify(finalOutput, null, 2), 'utf-8');
  console.log(`\n✅ Audit complete! Saved precise evidence to ${jsonPath}`);

  await browser.close();
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
