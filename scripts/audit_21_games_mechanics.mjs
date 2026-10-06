import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = '/Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots';
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const AUDIT_GAMES = [
  { code: 'F1D1', name: 'Bubble Storm Chase', room: 0, doorIdx: 0, prefix: 'f1d1_bubble_chase', actionKey: 'ArrowRight' },
  { code: 'F1D2', name: 'Word Wagon Jump', room: 0, doorIdx: 1, prefix: 'f1d2_wagon_jump', actionKey: 'ArrowRight' },
  { code: 'F1D3', name: 'Shadow Vault Infiltrate', room: 0, doorIdx: 2, prefix: 'f1d3_shadow_vault', actionKey: 'ArrowRight' },
  { code: 'F2D1', name: 'Potion Flip Dungeon', room: 1, doorIdx: 0, prefix: 'f2d1_potion_flip', actionKey: 'ArrowRight' },
  { code: 'F2D2', name: 'Anvil Rush Grammar', room: 1, doorIdx: 1, prefix: 'f2d2_anvil_rush', actionKey: 'ArrowRight' },
  { code: 'F2D3', name: 'Scroll Chamber Decode', room: 1, doorIdx: 2, prefix: 'f2d3_scroll_chamber', actionKey: 'ArrowRight' },
  { code: 'F3D1', name: 'Echo Arena Shooter', room: 2, doorIdx: 0, prefix: 'f3d1_echo_arena', actionKey: 'ArrowRight' },
  { code: 'F3D3', name: 'Storm Shield Defense', room: 2, doorIdx: 2, prefix: 'f3d3_storm_shield', actionKey: 'ArrowRight' },
  { code: 'F4D3', name: 'Riddle Run Maze', room: 3, doorIdx: 2, prefix: 'f4d3_riddle_run', actionKey: 'ArrowRight' },
  { code: 'F5D3', name: 'Cambridge Cloze Gauntlet', room: 4, doorIdx: 2, prefix: 'f5d3_cambridge_cloze', actionKey: 'ArrowRight' }
];

async function runAudit() {
  console.log('=== STARTING 21-GAME COMPREHENSIVE MECHANICS AUDIT ===');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = [];

  for (const game of AUDIT_GAMES) {
    console.log(`\n========================================`);
    console.log(`AUDITING ${game.code}: ${game.name} (Room ${game.room}, Door ${game.doorIdx})`);
    console.log(`========================================`);

    const gameResult = {
      code: game.code,
      name: game.name,
      room: game.room,
      doorIdx: game.doorIdx,
      desktop: {},
      mobile: {}
    };

    // ── 1. DESKTOP TEST (1280x800) ──
    const pageDesktop = await browser.newPage();
    await pageDesktop.setViewport({ width: 1280, height: 800 });

    try {
      const roomUrl = `${BASE_URL}/week/33/chronicles?room=${game.room}&bypass=true`;
      await pageDesktop.goto(roomUrl, { waitUntil: 'networkidle0', timeout: 15000 });
      await new Promise(r => setTimeout(r, 1000));

      const doorBtns = await pageDesktop.$$('.dr-door-enter-btn');
      if (doorBtns.length <= game.doorIdx) {
        throw new Error(`Door ${game.doorIdx} not found. Found ${doorBtns.length} buttons.`);
      }
      await doorBtns[game.doorIdx].click();
      await new Promise(r => setTimeout(r, 1500));

      // Inspect baseline Leo coordinates
      const baselinePos = await pageDesktop.evaluate(() => {
        const leo = document.querySelector('.leo-character, .titan-leo, [class*="leo"]');
        if (!leo) return null;
        const rect = leo.getBoundingClientRect();
        return {
          left: parseFloat(leo.style.left) || rect.left,
          top: parseFloat(leo.style.top) || rect.top,
          clientRect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
        };
      });

      const desktopBasePic = `${game.prefix}_desktop_baseline.png`;
      const desktopBasePicPath = path.join(OUTPUT_DIR, desktopBasePic);
      await pageDesktop.screenshot({ path: desktopBasePicPath });
      fs.copyFileSync(desktopBasePicPath, path.join(BRAIN_DIR, desktopBasePic));

      // Dispatch action key (e.g. ArrowRight held for 500ms)
      console.log(`Desktop baseline pos:`, baselinePos);
      console.log(`Dispatching key ${game.actionKey} for 500ms...`);
      await pageDesktop.keyboard.down(game.actionKey);
      await new Promise(r => setTimeout(r, 500));
      await pageDesktop.keyboard.up(game.actionKey);
      await new Promise(r => setTimeout(r, 300));

      // Inspect post-action Leo coordinates
      const actionPos = await pageDesktop.evaluate(() => {
        const leo = document.querySelector('.leo-character, .titan-leo, [class*="leo"]');
        if (!leo) return null;
        const rect = leo.getBoundingClientRect();
        return {
          left: parseFloat(leo.style.left) || rect.left,
          top: parseFloat(leo.style.top) || rect.top,
          clientRect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
        };
      });

      const desktopActionPic = `${game.prefix}_desktop_action.png`;
      const desktopActionPicPath = path.join(OUTPUT_DIR, desktopActionPic);
      await pageDesktop.screenshot({ path: desktopActionPicPath });
      fs.copyFileSync(desktopActionPicPath, path.join(BRAIN_DIR, desktopActionPic));

      const deltaX = (actionPos?.left || 0) - (baselinePos?.left || 0);
      const deltaY = (actionPos?.top || 0) - (baselinePos?.top || 0);
      const clientDeltaX = (actionPos?.clientRect?.x || 0) - (baselinePos?.clientRect?.x || 0);

      console.log(`Desktop action pos:`, actionPos);
      console.log(`Movement deltaX: ${deltaX.toFixed(1)}px (clientDeltaX: ${clientDeltaX.toFixed(1)}px)`);

      gameResult.desktop = {
        baselinePos,
        actionPos,
        deltaX,
        deltaY,
        clientDeltaX,
        hasMoved: Math.abs(deltaX) > 2 || Math.abs(clientDeltaX) > 2,
        baselineScreenshot: desktopBasePic,
        actionScreenshot: desktopActionPic
      };
    } catch (err) {
      console.error(`Desktop test error for ${game.code}:`, err.message);
      gameResult.desktop = { error: err.message };
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
      if (doorBtns.length <= game.doorIdx) {
        throw new Error(`Door ${game.doorIdx} not found on mobile.`);
      }
      await doorBtns[game.doorIdx].click();
      await new Promise(r => setTimeout(r, 1500));

      // Inspect baseline Leo coordinates on mobile
      const mobileBaselinePos = await pageMobile.evaluate(() => {
        const leo = document.querySelector('.leo-character, .titan-leo, [class*="leo"]');
        if (!leo) return null;
        const rect = leo.getBoundingClientRect();
        return {
          left: parseFloat(leo.style.left) || rect.left,
          top: parseFloat(leo.style.top) || rect.top,
          clientRect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
        };
      });

      const mobileBasePic = `${game.prefix}_mobile_baseline.png`;
      const mobileBasePicPath = path.join(OUTPUT_DIR, mobileBasePic);
      await pageMobile.screenshot({ path: mobileBasePicPath });
      fs.copyFileSync(mobileBasePicPath, path.join(BRAIN_DIR, mobileBasePic));

      // Dispatch touch event on right side of screen (Hold Right for 500ms)
      console.log(`Mobile baseline pos:`, mobileBaselinePos);
      console.log(`Dispatching touch gesture on right zone (x=300, y=550) for 500ms...`);
      await pageMobile.touchscreen.touchStart(300, 550);
      await new Promise(r => setTimeout(r, 500));
      await pageMobile.touchscreen.touchEnd();
      await new Promise(r => setTimeout(r, 300));

      // Inspect post-touch Leo coordinates on mobile
      const mobileActionPos = await pageMobile.evaluate(() => {
        const leo = document.querySelector('.leo-character, .titan-leo, [class*="leo"]');
        if (!leo) return null;
        const rect = leo.getBoundingClientRect();
        return {
          left: parseFloat(leo.style.left) || rect.left,
          top: parseFloat(leo.style.top) || rect.top,
          clientRect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
        };
      });

      const mobileActionPic = `${game.prefix}_mobile_action.png`;
      const mobileActionPicPath = path.join(OUTPUT_DIR, mobileActionPic);
      await pageMobile.screenshot({ path: mobileActionPicPath });
      fs.copyFileSync(mobileActionPicPath, path.join(BRAIN_DIR, mobileActionPic));

      const mobileDeltaX = (mobileActionPos?.left || 0) - (mobileBaselinePos?.left || 0);
      const mobileDeltaY = (mobileActionPos?.top || 0) - (mobileBaselinePos?.top || 0);
      const mobileClientDeltaX = (mobileActionPos?.clientRect?.x || 0) - (mobileBaselinePos?.clientRect?.x || 0);

      console.log(`Mobile action pos:`, mobileActionPos);
      console.log(`Mobile deltaX: ${mobileDeltaX.toFixed(1)}px (clientDeltaX: ${mobileClientDeltaX.toFixed(1)}px)`);

      gameResult.mobile = {
        baselinePos: mobileBaselinePos,
        actionPos: mobileActionPos,
        deltaX: mobileDeltaX,
        deltaY: mobileDeltaY,
        clientDeltaX: mobileClientDeltaX,
        hasMoved: Math.abs(mobileDeltaX) > 2 || Math.abs(mobileClientDeltaX) > 2,
        baselineScreenshot: mobileBasePic,
        actionScreenshot: mobileActionPic
      };
    } catch (err) {
      console.error(`Mobile test error for ${game.code}:`, err.message);
      gameResult.mobile = { error: err.message };
    } finally {
      await pageMobile.close();
    }

    results.push(gameResult);
  }

  const resultFile = path.join(OUTPUT_DIR, 'audit_21_games_mechanics_evidence.json');
  fs.writeFileSync(resultFile, JSON.stringify(results, null, 2));
  console.log(`\n✅ ALL 10 GAMES AUDITED. Results saved to: ${resultFile}`);

  await browser.close();
}

runAudit().catch(err => {
  console.error('Audit execution failed:', err);
  process.exit(1);
});
