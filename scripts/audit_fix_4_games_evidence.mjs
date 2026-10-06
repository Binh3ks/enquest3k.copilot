import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = '/Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots';
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

const TARGET_GAMES = [
  {
    code: 'F2D3',
    name: 'Scroll Chamber Decode',
    room: 1,
    doorIdx: 2,
    prefix: 'f2d3_scroll_chamber',
    enemySelector: '.curse-wraith-sprite',
  },
  {
    code: 'F3D3',
    name: 'Storm Shield Defense',
    room: 2,
    doorIdx: 2,
    prefix: 'f3d3_storm_shield',
    enemySelector: '.falling-meteor-entity',
    isStormShield: true,
  },
  {
    code: 'F4D3',
    name: 'Riddle Run Maze',
    room: 3,
    doorIdx: 2,
    prefix: 'f4d3_riddle_run',
    enemySelector: '.chaser-beast-sprite',
  },
  {
    code: 'F5D3',
    name: 'Cambridge Cloze Gauntlet',
    room: 4,
    doorIdx: 2,
    prefix: 'f5d3_cambridge_cloze',
    enemySelector: '.astral-watcher-sprite',
  }
];

function inspectEntities(enemySel, isStormShield = false) {
  const leo = document.querySelector('.leo-character');
  const timer = document.querySelector('.hud-timer, [class*="timer"], .dr-hud-timer')?.innerText || 'N/A';
  const batteryPct = document.querySelector('.battery-pct')?.innerText || null;
  const feedback = document.querySelector('[class*="feedback"]')?.innerText || null;

  // Extract hearts count from HUD
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

  // Extract feedback event history from window.__F3D3_EVENT_LOG__
  const feedbackHistory = (typeof window !== 'undefined' && window.__F3D3_EVENT_LOG__)
    ? JSON.parse(JSON.stringify(window.__F3D3_EVENT_LOG__))
    : [];

  // Query ALL enemies matching selector
  const enemyEls = Array.from(document.querySelectorAll(enemySel));
  const enemiesData = enemyEls.map(el => {
    const r = el.getBoundingClientRect();
    const wordText = el.querySelector('.meteor-word, .rune-stone-word')?.innerText || undefined;
    return {
      id: el.getAttribute('data-wraith-id') || el.getAttribute('data-door-id') || el.id || undefined,
      className: el.className,
      word: wordText,
      worldLeft: parseFloat(el.style.left) || 0,
      worldTop: parseFloat(el.style.top) || 0,
      left: parseFloat(el.style.left) || 0,
      top: parseFloat(el.style.top) || 0,
      clientRect: {
        x: Math.round(r.x * 100) / 100,
        y: Math.round(r.y * 100) / 100,
        width: Math.round(r.width * 100) / 100,
        height: Math.round(r.height * 100) / 100
      }
    };
  });

  // For F3D3: explicitly separate goldenMeteors and hazardMeteors
  let goldenMeteors = undefined;
  let hazardMeteors = undefined;
  if (isStormShield) {
    const goldEls = Array.from(document.querySelectorAll('.falling-meteor-entity.meteor-golden'));
    goldenMeteors = goldEls.map(el => {
      const r = el.getBoundingClientRect();
      const word = el.querySelector('.meteor-word')?.innerText || '';
      return {
        word,
        className: el.className,
        worldLeft: parseFloat(el.style.left) || 0,
        worldTop: parseFloat(el.style.top) || 0,
        clientRect: {
          x: Math.round(r.x * 100) / 100,
          y: Math.round(r.y * 100) / 100,
          width: Math.round(r.width * 100) / 100,
          height: Math.round(r.height * 100) / 100
        }
      };
    });

    const hazardEls = Array.from(document.querySelectorAll('.falling-meteor-entity.meteor-hazard'));
    hazardMeteors = hazardEls.map(el => {
      const r = el.getBoundingClientRect();
      const word = el.querySelector('.meteor-word')?.innerText || '';
      return {
        word,
        className: el.className,
        worldLeft: parseFloat(el.style.left) || 0,
        worldTop: parseFloat(el.style.top) || 0,
        clientRect: {
          x: Math.round(r.x * 100) / 100,
          y: Math.round(r.y * 100) / 100,
          width: Math.round(r.width * 100) / 100,
          height: Math.round(r.height * 100) / 100
        }
      };
    });
  }

  let leoData = null;
  if (leo) {
    const r = leo.getBoundingClientRect();
    leoData = {
      worldLeft: parseFloat(leo.style.left) || 0,
      worldTop: parseFloat(leo.style.top) || 0,
      left: parseFloat(leo.style.left) || 0,
      top: parseFloat(leo.style.top) || 0,
      clientRect: {
        x: Math.round(r.x * 100) / 100,
        y: Math.round(r.y * 100) / 100,
        width: Math.round(r.width * 100) / 100,
        height: Math.round(r.height * 100) / 100
      }
    };
  }

  const res = {
    timer,
    hearts: heartsCount,
    batteryPct,
    feedback,
    feedbackHistory,
    leo: leoData,
    enemies: enemiesData
  };

  if (isStormShield) {
    res.goldenMeteors = goldenMeteors;
    res.hazardMeteors = hazardMeteors;
  }

  return res;
}

async function runCapture() {
  console.log('=== STARTING AUDIT VERIFICATION FOR F2D3, F3D3, F4D3, F5D3 ===');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const reportData = [];

  for (const game of TARGET_GAMES) {
    console.log(`\n======================================================`);
    console.log(`AUDITING ${game.code}: ${game.name} (Room ${game.room}, Door ${game.doorIdx})`);
    console.log(`======================================================`);

    const result = { code: game.code, name: game.name, desktop: {}, mobile: {} };

    // ── 1. DESKTOP TEST (1280x800) ──
    const pageDesktop = await browser.newPage();
    await pageDesktop.setViewport({ width: 1280, height: 800 });

    try {
      const roomUrl = `${BASE_URL}/week/33/chronicles?room=${game.room}&bypass=true`;
      await pageDesktop.goto(roomUrl, { waitUntil: 'networkidle0', timeout: 15000 });
      await new Promise(r => setTimeout(r, 1000));

      const doorBtns = await pageDesktop.$$('.dr-door-enter-btn');
      await doorBtns[game.doorIdx].click();

      if (game.isStormShield) {
        // Storm Shield Defense Desktop:
        // CAPTURE BASELINE IMMEDIATELY AT MOUNT (floor load, before any meteor can hit Leo)
        await new Promise(r => setTimeout(r, 450)); // let initial DOM render
        const deskBase = await pageDesktop.evaluate(inspectEntities, '.falling-meteor-entity', true);
        const deskBasePic = `${game.prefix}_desktop_baseline_fixed.png`;
        const deskBasePicPath = path.join(OUTPUT_DIR, deskBasePic);
        await pageDesktop.screenshot({ path: deskBasePicPath });
        fs.copyFileSync(deskBasePicPath, path.join(BRAIN_DIR, deskBasePic));
        console.log(`Desktop Baseline (${deskBase.timer}, Hearts: ${deskBase.hearts}, Battery: ${deskBase.batteryPct}): Leo:`, deskBase.leo, 'Golden Meteors:', deskBase.goldenMeteors);

        // Now wait for golden meteor spawn
        console.log('F3D3: Waiting for golden meteor spawn...');
        await pageDesktop.waitForFunction(() => {
          return document.querySelector('.falling-meteor-entity.meteor-golden') !== null;
        }, { timeout: 10000 });

        // Move Leo under the golden meteor to intercept with Aegis Shield!
        console.log('F3D3: Intercepting golden meteor with Aegis Shield...');
        const meteorTargetX = await pageDesktop.evaluate(() => {
          const gm = document.querySelector('.falling-meteor-entity.meteor-golden');
          if (!gm) return 430;
          return parseFloat(gm.style.left) || 430;
        });

        const currentLeoX = deskBase.leo?.worldLeft || 430;
        const key = meteorTargetX > currentLeoX ? 'ArrowRight' : 'ArrowLeft';
        const moveDuration = Math.min(2500, Math.max(200, Math.abs(meteorTargetX - currentLeoX) * 4));

        await pageDesktop.keyboard.down(key);
        await new Promise(r => setTimeout(r, moveDuration));
        await pageDesktop.keyboard.up(key);

        // Wait for deflection & battery charge (>= 20%)
        console.log('F3D3: Waiting for battery charge >= 20%...');
        await pageDesktop.waitForFunction(() => {
          const pctText = document.querySelector('.battery-pct')?.innerText || '0%';
          const val = parseInt(pctText.replace('%', ''), 10);
          return val >= 20;
        }, { timeout: 8000 });

        await new Promise(r => setTimeout(r, 350)); // allow toast and bar fill to render

        const deskAction = await pageDesktop.evaluate(inspectEntities, '.falling-meteor-entity', true);
        const deskActionPic = `${game.prefix}_desktop_action_fixed.png`;
        const deskActionPicPath = path.join(OUTPUT_DIR, deskActionPic);
        await pageDesktop.screenshot({ path: deskActionPicPath });
        fs.copyFileSync(deskActionPicPath, path.join(BRAIN_DIR, deskActionPic));

        const deltaX = (deskAction.leo?.worldLeft || 0) - (deskBase.leo?.worldLeft || 0);
        const clientDeltaX = (deskAction.leo?.clientRect?.x || 0) - (deskBase.leo?.clientRect?.x || 0);

        console.log(`Desktop Action (${deskAction.timer}, Hearts: ${deskAction.hearts}, Battery: ${deskAction.batteryPct}): Leo:`, deskAction.leo, 'Feedback History:', deskAction.feedbackHistory);
        console.log(`Desktop Movement Δx: ${deltaX.toFixed(1)}px (client Δx: ${clientDeltaX.toFixed(1)}px)`);

        result.desktop = {
          baseline: deskBase,
          action: deskAction,
          deltaX,
          clientDeltaX,
          hasMoved: Math.abs(deltaX) > 5,
          batteryIncreased: (parseInt(deskAction.batteryPct || '0') > parseInt(deskBase.batteryPct || '0')),
          feedbackHistory: deskAction.feedbackHistory,
          baselineScreenshot: deskBasePic,
          actionScreenshot: deskActionPic
        };

      } else {
        // Standard action test for F2D3, F4D3, F5D3
        await new Promise(r => setTimeout(r, 1200));
        const deskBase = await pageDesktop.evaluate(inspectEntities, game.enemySelector, false);
        const deskBasePic = `${game.prefix}_desktop_baseline_fixed.png`;
        const deskBasePicPath = path.join(OUTPUT_DIR, deskBasePic);
        await pageDesktop.screenshot({ path: deskBasePicPath });
        fs.copyFileSync(deskBasePicPath, path.join(BRAIN_DIR, deskBasePic));
        console.log(`Desktop Baseline (${deskBase.timer}, Hearts: ${deskBase.hearts}): Leo:`, deskBase.leo, 'Enemies:', deskBase.enemies);

        // Movement action: Hold ArrowRight for 600ms
        await pageDesktop.keyboard.down('ArrowRight');
        await new Promise(r => setTimeout(r, 600));
        await pageDesktop.keyboard.up('ArrowRight');
        await new Promise(r => setTimeout(r, 200));

        const deskAction = await pageDesktop.evaluate(inspectEntities, game.enemySelector, false);
        const deskActionPic = `${game.prefix}_desktop_action_fixed.png`;
        const deskActionPicPath = path.join(OUTPUT_DIR, deskActionPic);
        await pageDesktop.screenshot({ path: deskActionPicPath });
        fs.copyFileSync(deskActionPicPath, path.join(BRAIN_DIR, deskActionPic));

        const deltaX = (deskAction.leo?.worldLeft || 0) - (deskBase.leo?.worldLeft || 0);
        const clientDeltaX = (deskAction.leo?.clientRect?.x || 0) - (deskBase.leo?.clientRect?.x || 0);

        console.log(`Desktop Action (${deskAction.timer}, Hearts: ${deskAction.hearts}): Leo:`, deskAction.leo, 'Enemies:', deskAction.enemies);
        console.log(`Desktop Movement Δx: ${deltaX.toFixed(1)}px (client Δx: ${clientDeltaX.toFixed(1)}px)`);

        result.desktop = {
          baseline: deskBase,
          action: deskAction,
          deltaX,
          clientDeltaX,
          hasMoved: Math.abs(deltaX) > 5,
          baselineScreenshot: deskBasePic,
          actionScreenshot: deskActionPic
        };
      }

      // ── F4D3: Multi-Random-Seed Verification (5 independent cycles) ──
      if (game.code === 'F4D3') {
        console.log('\nF4D3: Executing 5-Cycle Random Seed Symmetry & Non-Overlap Audit...');
        const multiCycles = [];

        for (let cycle = 1; cycle <= 5; cycle++) {
          // Navigate fresh to trigger fresh randomized options
          const cycleUrl = `${BASE_URL}/week/33/chronicles?room=3&bypass=true&seed=${Date.now()}_${cycle}`;
          await pageDesktop.goto(cycleUrl, { waitUntil: 'networkidle0', timeout: 15000 });
          await new Promise(r => setTimeout(r, 800));

          const dBtns = await pageDesktop.$$('.dr-door-enter-btn');
          await dBtns[2].click();
          await new Promise(r => setTimeout(r, 1200));

          const cycleData = await pageDesktop.evaluate((cIdx) => {
            const leo = document.querySelector('.leo-character');
            const leoWorldLeft = leo ? (parseFloat(leo.style.left) || 0) : 430;
            const leoWorldTop = leo ? (parseFloat(leo.style.top) || 0) : 250;

            const doorEls = Array.from(document.querySelectorAll('.vault-door-entity'));
            const doorsData = doorEls.map(el => {
              const r = el.getBoundingClientRect();
              const plaque = el.querySelector('.vault-door-plaque')?.innerText || el.getAttribute('data-door-word') || '';
              const id = el.getAttribute('data-door-id') || el.id;
              const x = parseFloat(el.style.left) || 0;
              const y = parseFloat(el.style.top) || 0;

              // Check bounding-box overlap with Leo
              // Leo: [leoWorldLeft, leoWorldTop, width: 48, height: 60]
              // Door: [x, y, width: 60, height: 70]
              const overlapX = (leoWorldLeft < x + 60) && (leoWorldLeft + 48 > x);
              const overlapY = (leoWorldTop < y + 70) && (leoWorldTop + 60 > y);
              const hasOverlap = overlapX && overlapY;

              return {
                id,
                word: plaque,
                worldLeft: x,
                worldTop: y,
                clientRect: { x: Math.round(r.x * 100) / 100, y: Math.round(r.y * 100) / 100 },
                hasOverlapWithLeo: hasOverlap
              };
            });

            const d0 = doorsData.find(d => d.id === 'door_0');
            const d1 = doorsData.find(d => d.id === 'door_1');
            const d2 = doorsData.find(d => d.id === 'door_2');

            const verticalClearanceApex = (leoWorldTop) - ((d1?.worldTop || 115) + 70); // 250 - 185 = 65px

            return {
              cycle: cIdx,
              leoSpawn: { worldLeft: leoWorldLeft, worldTop: leoWorldTop },
              doors: doorsData,
              verticalClearanceApexPx: verticalClearanceApex,
              allDoorsClearOfLeo: doorsData.every(d => !d.hasOverlapWithLeo),
              distanceLeftDoorPx: Math.abs(leoWorldLeft - (d0?.worldLeft || 100)),
              distanceRightDoorPx: Math.abs((d2?.worldLeft || 680) - leoWorldLeft),
            };
          }, cycle);

          console.log(`Cycle ${cycle}: Leo (${cycleData.leoSpawn.worldLeft}, ${cycleData.leoSpawn.worldTop}), Doors: [${cycleData.doors.map(d => `${d.id}: "${d.word}" at (${d.worldLeft},${d.worldTop})`).join(', ')}], Overlap: ${!cycleData.allDoorsClearOfLeo}`);
          multiCycles.push(cycleData);
        }

        result.f4d3MultiRandomCycles = multiCycles;
      }
    } catch (err) {
      console.error(`Desktop error on ${game.code}:`, err.message);
      result.desktop = { error: err.message };
    } finally {
      await pageDesktop.close();
    }

    // ── 2. MOBILE TEST (390x844, touch-enabled) ──
    const pageMobile = await browser.newPage();
    await pageMobile.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

    try {
      const roomUrl = `${BASE_URL}/week/33/chronicles?room=${game.room}&bypass=true`;
      await pageMobile.goto(roomUrl, { waitUntil: 'networkidle0', timeout: 15000 });
      await new Promise(r => setTimeout(r, 1000));

      const doorBtns = await pageMobile.$$('.dr-door-enter-btn');
      await doorBtns[game.doorIdx].click();

      if (game.isStormShield) {
        // Storm Shield Mobile:
        // CAPTURE BASELINE IMMEDIATELY AT MOUNT (floor load, before any meteor can hit Leo)
        await new Promise(r => setTimeout(r, 450)); // let initial DOM mount
        const mobBase = await pageMobile.evaluate(inspectEntities, '.falling-meteor-entity', true);
        const mobBasePic = `${game.prefix}_mobile_baseline_fixed.png`;
        const mobBasePicPath = path.join(OUTPUT_DIR, mobBasePic);
        await pageMobile.screenshot({ path: mobBasePicPath });
        fs.copyFileSync(mobBasePicPath, path.join(BRAIN_DIR, mobBasePic));
        console.log(`Mobile Baseline (${mobBase.timer}, Hearts: ${mobBase.hearts}, Battery: ${mobBase.batteryPct}): Leo:`, mobBase.leo, 'Golden Meteors:', mobBase.goldenMeteors);

        // Now wait for golden meteor to spawn
        console.log('F3D3 Mobile: Waiting for golden meteor spawn...');
        await pageMobile.waitForFunction(() => {
          return document.querySelector('.falling-meteor-entity.meteor-golden') !== null;
        }, { timeout: 10000 });

        // Touch steer Leo to intercept meteor
        const meteorTargetX = await pageMobile.evaluate(() => {
          const gm = document.querySelector('.falling-meteor-entity.meteor-golden');
          if (!gm) return 430;
          return parseFloat(gm.style.left) || 430;
        });

        const currentLeoX = mobBase.leo?.worldLeft || 430;
        const touchX = meteorTargetX > currentLeoX ? 320 : 70;
        const moveDuration = Math.min(2500, Math.max(200, Math.abs(meteorTargetX - currentLeoX) * 4));

        await pageMobile.touchscreen.touchStart(touchX, 550);
        await new Promise(r => setTimeout(r, moveDuration));
        await pageMobile.touchscreen.touchEnd();

        // Wait for deflection or fall
        try {
          await pageMobile.waitForFunction(() => {
            const pctText = document.querySelector('.battery-pct')?.innerText || '0%';
            const val = parseInt(pctText.replace('%', ''), 10);
            return val >= 20;
          }, { timeout: 8000 });
        } catch (e) {
          console.log('Mobile battery wait timed out, continuing to inspect state');
        }

        await new Promise(r => setTimeout(r, 350));

        const mobAction = await pageMobile.evaluate(inspectEntities, '.falling-meteor-entity', true);
        const mobActionPic = `${game.prefix}_mobile_action_fixed.png`;
        const mobActionPicPath = path.join(OUTPUT_DIR, mobActionPic);
        await pageMobile.screenshot({ path: mobActionPicPath });
        fs.copyFileSync(mobActionPicPath, path.join(BRAIN_DIR, mobActionPic));

        const mobDeltaX = (mobAction.leo?.worldLeft || 0) - (mobBase.leo?.worldLeft || 0);
        const mobClientDeltaX = (mobAction.leo?.clientRect?.x || 0) - (mobBase.leo?.clientRect?.x || 0);

        console.log(`Mobile Action (${mobAction.timer}, Hearts: ${mobAction.hearts}, Battery: ${mobAction.batteryPct}): Leo:`, mobAction.leo, 'Feedback History:', mobAction.feedbackHistory);
        console.log(`Mobile Movement Δx: ${mobDeltaX.toFixed(1)}px (client Δx: ${mobClientDeltaX.toFixed(1)}px)`);

        result.mobile = {
          baseline: mobBase,
          action: mobAction,
          deltaX: mobDeltaX,
          clientDeltaX: mobClientDeltaX,
          hasMoved: Math.abs(mobDeltaX) > 5,
          batteryIncreased: (parseInt(mobAction.batteryPct || '0') > parseInt(mobBase.batteryPct || '0')),
          feedbackHistory: mobAction.feedbackHistory,
          baselineScreenshot: mobBasePic,
          actionScreenshot: mobActionPic
        };

      } else {
        // Standard action test for F2D3, F4D3, F5D3
        await new Promise(r => setTimeout(r, 1200));
        const mobBase = await pageMobile.evaluate(inspectEntities, game.enemySelector, false);
        const mobBasePic = `${game.prefix}_mobile_baseline_fixed.png`;
        const mobBasePicPath = path.join(OUTPUT_DIR, mobBasePic);
        await pageMobile.screenshot({ path: mobBasePicPath });
        fs.copyFileSync(mobBasePicPath, path.join(BRAIN_DIR, mobBasePic));
        console.log(`Mobile Baseline (${mobBase.timer}, Hearts: ${mobBase.hearts}): Leo:`, mobBase.leo, 'Enemies:', mobBase.enemies);

        // Mobile Touch: Hold right side of screen (x=320, y=550) for 600ms
        await pageMobile.touchscreen.touchStart(320, 550);
        await new Promise(r => setTimeout(r, 600));
        await pageMobile.touchscreen.touchEnd();
        await new Promise(r => setTimeout(r, 200));

        const mobAction = await pageMobile.evaluate(inspectEntities, game.enemySelector, false);
        const mobActionPic = `${game.prefix}_mobile_action_fixed.png`;
        const mobActionPicPath = path.join(OUTPUT_DIR, mobActionPic);
        await pageMobile.screenshot({ path: mobActionPicPath });
        fs.copyFileSync(mobActionPicPath, path.join(BRAIN_DIR, mobActionPic));

        const mobDeltaX = (mobAction.leo?.worldLeft || 0) - (mobBase.leo?.worldLeft || 0);
        const mobClientDeltaX = (mobAction.leo?.clientRect?.x || 0) - (mobBase.leo?.clientRect?.x || 0);

        console.log(`Mobile Action (${mobAction.timer}, Hearts: ${mobAction.hearts}): Leo:`, mobAction.leo, 'Enemies:', mobAction.enemies);
        console.log(`Mobile Movement Δx: ${mobDeltaX.toFixed(1)}px (client Δx: ${mobClientDeltaX.toFixed(1)}px)`);

        result.mobile = {
          baseline: mobBase,
          action: mobAction,
          deltaX: mobDeltaX,
          clientDeltaX: mobClientDeltaX,
          hasMoved: Math.abs(mobDeltaX) > 5,
          baselineScreenshot: mobBasePic,
          actionScreenshot: mobActionPic
        };
      }
    } catch (err) {
      console.error(`Mobile error on ${game.code}:`, err.message);
      result.mobile = { error: err.message };
    } finally {
      await pageMobile.close();
    }

    reportData.push(result);
  }

  const outJson = path.join(OUTPUT_DIR, 'audit_fixed_4_games_evidence.json');
  fs.writeFileSync(outJson, JSON.stringify(reportData, null, 2));
  console.log(`\n✅ High-precision audit completed. Evidence saved to ${outJson}`);

  await browser.close();
}

runCapture().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
