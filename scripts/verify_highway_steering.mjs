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

  console.log('=== STEP 1: LOAD HIGHWAY RUNNER ON DESKTOP 1280x800 ===');
  await page.setViewport({ width: 1280, height: 800 });

  const url = `http://localhost:5173/week/33/chronicles?room=3&owner=true`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(2000);

  // Click Chest 1
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')).filter(b => 
      b.textContent.includes('Open Chest') || b.textContent.includes('Replay') || b.textContent.includes('Enter')
    );
    if (btns[0]) btns[0].click();
  });
  await sleep(2500);

  // 1. Initial State
  const initialLeo = await page.evaluate(() => {
    const el = document.querySelector('.leo-back-character');
    return el ? {
      hasLeo: true,
      left: el.style.left,
      top: el.style.top,
      className: el.className
    } : { hasLeo: false };
  });
  console.log('1. Initial Leo State (Center lane):', initialLeo);

  const ssInitial = path.join(SS_DIR, 'c2_steering_1_initial_center.png');
  await page.screenshot({ path: ssInitial });
  fs.copyFileSync(ssInitial, path.join(BRAIN_DIR, 'c2_steering_1_initial_center.png'));

  // 2. Press ArrowLeft
  console.log('2. Pressing ArrowLeft...');
  await page.keyboard.press('ArrowLeft');
  await sleep(400);

  const leftLeo = await page.evaluate(() => {
    const el = document.querySelector('.leo-back-character');
    return el ? {
      hasLeo: true,
      left: el.style.left,
      top: el.style.top,
      className: el.className
    } : { hasLeo: false };
  });
  console.log('2. After ArrowLeft (Left lane):', leftLeo);

  const ssLeft = path.join(SS_DIR, 'c2_steering_2_after_arrow_left.png');
  await page.screenshot({ path: ssLeft });
  fs.copyFileSync(ssLeft, path.join(BRAIN_DIR, 'c2_steering_2_after_arrow_left.png'));

  // 3. Press ArrowRight twice (Left -> Center -> Right)
  console.log('3. Pressing ArrowRight twice to move to Right lane...');
  await page.keyboard.press('ArrowRight');
  await sleep(400);
  await page.keyboard.press('ArrowRight');
  await sleep(400);

  const rightLeo = await page.evaluate(() => {
    const el = document.querySelector('.leo-back-character');
    return el ? {
      hasLeo: true,
      left: el.style.left,
      top: el.style.top,
      className: el.className
    } : { hasLeo: false };
  });
  console.log('3. After ArrowRight x2 (Right lane):', rightLeo);

  const ssRight = path.join(SS_DIR, 'c2_steering_3_after_arrow_right.png');
  await page.screenshot({ path: ssRight });
  fs.copyFileSync(ssRight, path.join(BRAIN_DIR, 'c2_steering_3_after_arrow_right.png'));

  // 4. Test Jump (Space)
  console.log('4. Testing Jump (Space)...');
  await page.keyboard.press('Space');
  // Capture immediately mid-jump (at ~150-250ms)
  await sleep(180);

  const jumpLeo = await page.evaluate(() => {
    const el = document.querySelector('.leo-back-character');
    return el ? {
      hasLeo: true,
      left: el.style.left,
      top: el.style.top,
      className: el.className
    } : { hasLeo: false };
  });
  console.log('4. Mid-Jump State:', jumpLeo);

  const ssJump = path.join(SS_DIR, 'c2_steering_4_mid_jump.png');
  await page.screenshot({ path: ssJump });
  fs.copyFileSync(ssJump, path.join(BRAIN_DIR, 'c2_steering_4_mid_jump.png'));

  // Wait for jump to finish
  await sleep(600);

  // 5. Test Guide Modal verification with correct selector
  console.log('5. Testing Guide Modal with correct selector...');
  await page.evaluate(() => {
    const helpBtn = document.querySelector('.highway-help-btn');
    if (helpBtn) helpBtn.click();
  });
  await sleep(800);

  const modalVerification = await page.evaluate(() => {
    const modalEl = Array.from(document.querySelectorAll('div')).find(d => 
      d.textContent.includes('HOW TO PLAY (STEP-BY-STEP)') && d.textContent.includes('MISSION OBJECTIVE')
    );
    return {
      isOpen: !!modalEl,
      modalTextPreview: modalEl ? modalEl.textContent.trim().slice(0, 300) : ''
    };
  });
  console.log('5. Guide Modal verification:', modalVerification);

  // Close guide
  await page.evaluate(() => {
    const resumeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Resume'));
    if (resumeBtn) resumeBtn.click();
  });
  await sleep(600);

  // 6. Test Mobile Touch Steering (390x844)
  console.log('=== STEP 6: TEST MOBILE TOUCH STEERING (390x844) ===');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(2000);

  // Click Chest 1 on mobile
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')).filter(b => 
      b.textContent.includes('Open Chest') || b.textContent.includes('Replay') || b.textContent.includes('Enter')
    );
    if (btns[0]) btns[0].click();
  });
  await sleep(2500);

  const mobileInitial = await page.evaluate(() => {
    const el = document.querySelector('.leo-back-character');
    return el ? { left: el.style.left, top: el.style.top } : null;
  });
  console.log('6. Mobile Initial (Center lane):', mobileInitial);

  const ssMobileInitial = path.join(SS_DIR, 'c2_mobile_steering_1_center.png');
  await page.screenshot({ path: ssMobileInitial });
  fs.copyFileSync(ssMobileInitial, path.join(BRAIN_DIR, 'c2_mobile_steering_1_center.png'));

  // Click Left Touch Zone
  console.log('6. Tapping left touch zone...');
  await page.evaluate(() => {
    const zones = document.querySelectorAll('.highway-touch-zone');
    if (zones[0]) zones[0].click();
  });
  await sleep(400);

  const mobileLeft = await page.evaluate(() => {
    const el = document.querySelector('.leo-back-character');
    return el ? { left: el.style.left, top: el.style.top } : null;
  });
  console.log('6. Mobile after tapping Left Zone:', mobileLeft);

  const ssMobileLeft = path.join(SS_DIR, 'c2_mobile_steering_2_left.png');
  await page.screenshot({ path: ssMobileLeft });
  fs.copyFileSync(ssMobileLeft, path.join(BRAIN_DIR, 'c2_mobile_steering_2_left.png'));

  // Click Right Touch Zone twice
  console.log('6. Tapping right touch zone twice...');
  await page.evaluate(() => {
    const zones = document.querySelectorAll('.highway-touch-zone');
    if (zones[2]) zones[2].click();
  });
  await sleep(350);
  await page.evaluate(() => {
    const zones = document.querySelectorAll('.highway-touch-zone');
    if (zones[2]) zones[2].click();
  });
  await sleep(400);

  const mobileRight = await page.evaluate(() => {
    const el = document.querySelector('.leo-back-character');
    return el ? { left: el.style.left, top: el.style.top } : null;
  });
  console.log('6. Mobile after tapping Right Zone twice:', mobileRight);

  const ssMobileRight = path.join(SS_DIR, 'c2_mobile_steering_3_right.png');
  await page.screenshot({ path: ssMobileRight });
  fs.copyFileSync(ssMobileRight, path.join(BRAIN_DIR, 'c2_mobile_steering_3_right.png'));

  console.log('Console errors:', consoleErrors);

  await browser.close();

  const results = {
    initialLeo,
    leftLeo,
    rightLeo,
    jumpLeo,
    modalVerification,
    mobileInitial,
    mobileLeft,
    mobileRight,
    consoleErrors
  };

  fs.writeFileSync(path.join(SS_DIR, 'c2_steering_verification_results.json'), JSON.stringify(results, null, 2));
  console.log('✅ Steering verification completed successfully!');
}

main().catch(err => {
  console.error('Steering verification failed:', err);
  process.exit(1);
});
