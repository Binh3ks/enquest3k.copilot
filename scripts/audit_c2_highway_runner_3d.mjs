import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SS_DIR = path.join(__dirname, '..', 'docs', 'agent_artifacts', 'screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

if (!fs.existsSync(SS_DIR)) fs.mkdirSync(SS_DIR, { recursive: true });

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  console.log('=== STEP 1: AUDITING C2: HIGHWAY RUNNER 3D (DESKTOP 1280x800) ===');
  await page.setViewport({ width: 1280, height: 800 });

  // Navigate to Week 33, Room 3 (Floor 4: Rune Sanctum), owner bypass
  const url = `http://localhost:5173/week/33/chronicles?room=3&owner=true`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(2000);

  // Click Chest 1 (door index 0 -> highway_runner)
  const opened = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')).filter(b => 
      b.textContent.includes('Open Chest') || b.textContent.includes('Replay') || b.textContent.includes('Enter')
    );
    if (btns[0]) {
      btns[0].click();
      return true;
    }
    return false;
  });

  if (!opened) {
    console.error('❌ Could not click Chest 1 button in Room 3!');
  }
  await sleep(2500);

  // Take screenshot of Desktop 3D Highway Runner gameplay
  const ssDesktopPath = path.join(SS_DIR, 'c2_highway_runner_desktop_1280x800.png');
  const ssDesktopBrain = path.join(BRAIN_DIR, 'c2_highway_runner_desktop_1280x800.png');
  await page.screenshot({ path: ssDesktopPath });
  fs.copyFileSync(ssDesktopPath, ssDesktopBrain);
  console.log('📸 Desktop screenshot captured:', ssDesktopPath);

  // Check DOM text and elements
  const desktopDom = await page.evaluate(() => {
    const banner = document.querySelector('.highway-definition-banner')?.textContent?.trim() || '';
    const guide = document.querySelector('.highway-controls-guide')?.textContent?.trim() || '';
    const hud = document.querySelector('.hud-overlay')?.textContent?.trim() || '';
    const hasCanvas = !!document.querySelector('canvas.highway-3d-canvas');
    const leoEl = document.querySelector('.leo-back-character');
    const hasLeo = !!leoEl;
    const initialLeoPos = leoEl ? { left: leoEl.style.left, top: leoEl.style.top, className: leoEl.className } : null;
    const hasExit = !!document.querySelector('.floating-exit-btn');
    const hasHelp = !!document.querySelector('.highway-help-btn');
    return { banner, guide, hud, hasCanvas, hasLeo, initialLeoPos, hasExit, hasHelp };
  });
  console.log('Desktop DOM state:', desktopDom);

  // Test Guide Modal (How to Play)
  console.log('=== STEP 2: OPENING GUIDE MODAL ===');
  const clickedHelp = await page.evaluate(() => {
    const helpBtn = document.querySelector('.highway-help-btn');
    if (helpBtn) {
      helpBtn.click();
      return true;
    }
    return false;
  });
  await sleep(1000);

  const ssGuidePath = path.join(SS_DIR, 'c2_highway_runner_guide_modal.png');
  const ssGuideBrain = path.join(BRAIN_DIR, 'c2_highway_runner_guide_modal.png');
  await page.screenshot({ path: ssGuidePath });
  fs.copyFileSync(ssGuidePath, ssGuideBrain);
  console.log('📸 Guide Modal screenshot captured:', ssGuidePath);

  const guideModalText = await page.evaluate(() => {
    const modalEl = document.querySelector('div.fixed.z-\\[200\\]')
      || Array.from(document.querySelectorAll('div')).find(d => d.textContent.includes('HOW TO PLAY (STEP-BY-STEP)'));
    return modalEl?.textContent?.trim() || '';
  });
  console.log('Guide Modal Text length:', guideModalText.length);
  console.log('Guide Modal Text Preview:', guideModalText.slice(0, 180));

  // Close Guide Modal
  await page.evaluate(() => {
    const closeBtn = Array.from(document.querySelectorAll('button')).find(b => 
      b.textContent.includes('Resume') || b.textContent.includes('Understood')
    ) || document.querySelector('div.fixed.z-\\[200\\] button');
    if (closeBtn) closeBtn.click();
  });
  await sleep(800);

  // Test steering with keyboard ArrowLeft / ArrowRight
  console.log('=== STEP 3: TESTING KEYBOARD STEERING (BEFORE & AFTER) ===');
  
  // 3a. Move Left
  console.log('Pressing ArrowLeft...');
  await page.keyboard.press('ArrowLeft');
  await sleep(400);

  const leftLeo = await page.evaluate(() => {
    const el = document.querySelector('.leo-back-character');
    return el ? { left: el.style.left, top: el.style.top, className: el.className } : null;
  });
  console.log('After ArrowLeft:', leftLeo);

  const ssLeftPath = path.join(SS_DIR, 'c2_steering_2_after_arrow_left.png');
  await page.screenshot({ path: ssLeftPath });
  fs.copyFileSync(ssLeftPath, path.join(BRAIN_DIR, 'c2_steering_2_after_arrow_left.png'));

  // 3b. Move Right twice
  console.log('Pressing ArrowRight twice to reach Right Lane...');
  await page.keyboard.press('ArrowRight');
  await sleep(400);
  await page.keyboard.press('ArrowRight');
  await sleep(400);

  const rightLeo = await page.evaluate(() => {
    const el = document.querySelector('.leo-back-character');
    return el ? { left: el.style.left, top: el.style.top, className: el.className } : null;
  });
  console.log('After ArrowRight x2:', rightLeo);

  const ssRightPath = path.join(SS_DIR, 'c2_steering_3_after_arrow_right.png');
  await page.screenshot({ path: ssRightPath });
  fs.copyFileSync(ssRightPath, path.join(BRAIN_DIR, 'c2_steering_3_after_arrow_right.png'));

  // 3c. Jump
  console.log('Pressing Space to Jump...');
  await page.keyboard.press('Space');
  await sleep(180);

  const jumpLeo = await page.evaluate(() => {
    const el = document.querySelector('.leo-back-character');
    return el ? { left: el.style.left, top: el.style.top, className: el.className } : null;
  });
  console.log('Mid-Jump State:', jumpLeo);

  const ssJumpPath = path.join(SS_DIR, 'c2_steering_4_mid_jump.png');
  await page.screenshot({ path: ssJumpPath });
  fs.copyFileSync(ssJumpPath, path.join(BRAIN_DIR, 'c2_steering_4_mid_jump.png'));
  await sleep(600);
  await sleep(500);

  // === STEP 4: MOBILE AUDIT (390x844 iPhone 12/13/14) ===
  console.log('=== STEP 4: AUDITING C2: HIGHWAY RUNNER 3D (MOBILE 390x844) ===');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(2000);

  // Click Chest 1 on Mobile
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')).filter(b => 
      b.textContent.includes('Open Chest') || b.textContent.includes('Replay') || b.textContent.includes('Enter')
    );
    if (btns[0]) btns[0].click();
  });
  await sleep(2500);

  const ssMobilePath = path.join(SS_DIR, 'c2_highway_runner_mobile_390x844.png');
  const ssMobileBrain = path.join(BRAIN_DIR, 'c2_highway_runner_mobile_390x844.png');
  await page.screenshot({ path: ssMobilePath });
  fs.copyFileSync(ssMobilePath, ssMobileBrain);
  console.log('📸 Mobile screenshot captured:', ssMobilePath);

  const mobileDom = await page.evaluate(() => {
    const banner = document.querySelector('.highway-definition-banner')?.textContent?.trim() || '';
    const guide = document.querySelector('.highway-controls-guide')?.textContent?.trim() || '';
    const hud = document.querySelector('.hud-overlay')?.textContent?.trim() || '';
    const bannerBox = document.querySelector('.highway-definition-banner')?.getBoundingClientRect();
    const touchOverlay = !!document.querySelector('.highway-touch-overlay');
    return { banner, guide, hud, bannerBox, touchOverlay };
  });
  console.log('Mobile DOM state:', mobileDom);

  console.log('Console errors encountered:', consoleErrors);

  await browser.close();

  // Write evidence json
  const evidence = {
    desktopDom,
    guideModalText,
    steeringDesktop: {
      initialCenter: desktopDom.initialLeoPos,
      afterArrowLeft: leftLeo,
      afterArrowRightTwice: rightLeo,
      midJump: jumpLeo,
    },
    mobileDom,
    consoleErrors,
    screenshots: {
      desktop: ssDesktopPath,
      guide: ssGuidePath,
      steeringLeft: ssLeftPath,
      steeringRight: ssRightPath,
      steeringJump: ssJumpPath,
      mobile: ssMobilePath
    }
  };
  fs.writeFileSync(path.join(SS_DIR, 'c2_highway_runner_3d_evidence.json'), JSON.stringify(evidence, null, 2));
  console.log('✅ Evidence saved to c2_highway_runner_3d_evidence.json');
}

main().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
