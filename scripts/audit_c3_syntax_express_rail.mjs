import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SS_DIR = path.join(__dirname, '..', 'docs', 'agent_artifacts', 'screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

if (!fs.existsSync(SS_DIR)) fs.mkdirSync(SS_DIR, { recursive: true });

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function copyToBrain(srcPath, filename) {
  try {
    fs.copyFileSync(srcPath, path.join(BRAIN_DIR, filename));
  } catch (e) {
    console.warn('Could not copy to brain:', e.message);
  }
}

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

  console.log('=== AUDITING C3: SYNTAX EXPRESS RAIL (DESKTOP 1280x800) ===');
  await page.setViewport({ width: 1280, height: 800 });

  // Navigate to Room 3 (Floor 4: Rune Sanctum)
  const url = `http://localhost:5173/week/33/chronicles?room=3&owner=true`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(2000);

  // Click Chest 2 (Door index 1 -> spell_train_express)
  const opened = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')).filter(b => 
      b.textContent.includes('Open Chest') || b.textContent.includes('Replay') || b.textContent.includes('Enter')
    );
    if (btns[1]) {
      btns[1].click();
      return true;
    }
    return false;
  });

  if (!opened) {
    console.error('❌ Could not click Chest 2 in Room 3!');
  }
  await sleep(2500);

  // 1. Initial Desktop State & Screenshot
  const ssDesktopPath = path.join(SS_DIR, 'c3_syntax_express_desktop_1280x800.png');
  await page.screenshot({ path: ssDesktopPath });
  copyToBrain(ssDesktopPath, 'c3_syntax_express_desktop_1280x800.png');
  console.log('📸 Desktop screenshot captured:', ssDesktopPath);

  const desktopDom = await page.evaluate(() => {
    const banner = document.querySelector('.syntax-rail-banner')?.textContent?.trim() || '';
    const stem = document.querySelector('.syntax-stem-text')?.textContent?.trim() || '';
    const blank = document.querySelector('.syntax-blank-highlight')?.textContent?.trim() || '';
    const hud = document.querySelector('.hud-overlay')?.textContent?.trim() || '';
    const levers = Array.from(document.querySelectorAll('.rail-switch-entity')).map(l => ({
      text: l.getAttribute('data-lever-text') || l.textContent.trim(),
      isCorrect: l.getAttribute('data-is-correct') === 'true',
      id: l.getAttribute('data-lever-id'),
    }));
    const leoEl = document.querySelector('.leo-character');
    const hasLeo = !!leoEl;
    const leoPos = leoEl ? {
      left: leoEl.style.left,
      top: leoEl.style.top
    } : null;
    const hasTrain = !!document.querySelector('.distant-express-train');
    const hasExit = !!document.querySelector('.floating-exit-btn');
    const hasHelp = !!document.querySelector('.syntax-help-btn');
    return { banner, stem, blank, hud, levers, hasLeo, leoPos, hasTrain, hasExit, hasHelp };
  });
  console.log('Desktop DOM state:', desktopDom);

  // 2. Guide Modal Verification
  console.log('=== OPENING GUIDE MODAL ===');
  await page.evaluate(() => {
    const helpBtn = document.querySelector('.syntax-help-btn');
    if (helpBtn) helpBtn.click();
  });
  await sleep(1000);

  const ssGuidePath = path.join(SS_DIR, 'c3_syntax_express_guide_modal.png');
  await page.screenshot({ path: ssGuidePath });
  copyToBrain(ssGuidePath, 'c3_syntax_express_guide_modal.png');
  console.log('📸 Guide Modal screenshot captured:', ssGuidePath);

  const guideModalText = await page.evaluate(() => {
    const modalEl = document.querySelector('div.fixed.z-\\[200\\]')
      || Array.from(document.querySelectorAll('div')).find(d => d.textContent.includes('HOW TO PLAY (STEP-BY-STEP)'));
    return modalEl?.textContent?.trim() || '';
  });

  // Close Guide Modal
  await page.evaluate(() => {
    const closeBtn = Array.from(document.querySelectorAll('button')).find(b => 
      b.textContent.includes('Resume') || b.textContent.includes('Understood')
    ) || document.querySelector('div.fixed.z-\\[200\\] button');
    if (closeBtn) closeBtn.click();
  });
  await sleep(800);

  // 3. BASELINE BEFORE CLICKING LEVER
  console.log('=== CAPTURING BASELINE BEFORE CLICK ===');
  const ssBaselinePath = path.join(SS_DIR, 'c3_syntax_express_baseline_before_click.png');
  await page.screenshot({ path: ssBaselinePath });
  copyToBrain(ssBaselinePath, 'c3_syntax_express_baseline_before_click.png');
  console.log('📸 Baseline screenshot captured:', ssBaselinePath);

  // 4. TESTING CORRECT SWITCH LEVER (DYNAMIC DETECTION)
  console.log('=== IDENTIFYING AND STRIKING CORRECT LEVER ===');
  const correctLeverInfo = await page.evaluate(() => {
    const correctEl = document.querySelector('.rail-switch-entity[data-is-correct="true"]');
    if (!correctEl) return null;
    const text = correctEl.getAttribute('data-lever-text') || correctEl.textContent.trim();
    const id = correctEl.getAttribute('data-lever-id');
    const rect = correctEl.getBoundingClientRect();
    return { id, text, x: rect.x, y: rect.y };
  });

  console.log('Correct Lever Detected:', correctLeverInfo);

  if (!correctLeverInfo) {
    throw new Error('No correct lever found with data-is-correct="true"!');
  }

  // Click the correct lever
  await page.evaluate(() => {
    const correctEl = document.querySelector('.rail-switch-entity[data-is-correct="true"]');
    if (correctEl) correctEl.click();
  });

  // Wait 400ms for immediate feedback animation/toast
  await sleep(400);

  // Capture immediate correct feedback
  const ssCorrectActionPath = path.join(SS_DIR, 'c3_syntax_express_after_correct_action.png');
  await page.screenshot({ path: ssCorrectActionPath });
  copyToBrain(ssCorrectActionPath, 'c3_syntax_express_after_correct_action.png');
  console.log('📸 Correct Action screenshot captured:', ssCorrectActionPath);

  const correctFeedbackState = await page.evaluate(() => {
    const toast = document.querySelector('.syntax-feedback-toast');
    const toastClass = toast?.className || '';
    const toastText = toast?.textContent?.trim() || '';
    const hudText = document.querySelector('.hud-overlay')?.textContent?.trim() || '';
    const gaugeWidth = document.querySelector('.train-gauge-fill')?.style.width || '';
    return { toastClass, toastText, hudText, gaugeWidth };
  });
  console.log('Correct Feedback State (Immediate):', correctFeedbackState);

  // Wait for round transition (1.6s setTimeout in SyntaxExpressRail.jsx)
  await sleep(1600);

  const nextRoundDesktopDom = await page.evaluate(() => {
    const banner = document.querySelector('.syntax-rail-banner')?.textContent?.trim() || '';
    const hud = document.querySelector('.hud-overlay')?.textContent?.trim() || '';
    return { banner, hud };
  });
  console.log('Desktop State After Round Transition:', nextRoundDesktopDom);

  // 5. TESTING MOBILE VIEWPORT & CLAMPING (390x844) ACROSS ALL 3 ROUNDS
  console.log('=== AUDITING C3: SYNTAX EXPRESS RAIL ON MOBILE (390x844) ===');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(2000);

  // Open game on mobile
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')).filter(b => 
      b.textContent.includes('Open Chest') || b.textContent.includes('Replay') || b.textContent.includes('Enter')
    );
    if (btns[1]) btns[1].click();
  });
  await sleep(2500);

  // Inspect Round 1 on Mobile
  const mobileR1Measurements = await page.evaluate(() => {
    const entities = Array.from(document.querySelectorAll('.rail-switch-entity'));
    return entities.map((el, i) => {
      const rect = el.getBoundingClientRect();
      const plaque = el.querySelector('.rail-clause-plaque');
      const plaqueRect = plaque ? plaque.getBoundingClientRect() : rect;
      const text = el.getAttribute('data-lever-text') || el.textContent.trim();
      const isCorrect = el.getAttribute('data-is-correct') === 'true';
      return {
        index: i,
        text,
        isCorrect,
        rect: { left: rect.left, right: rect.right, width: rect.width },
        plaqueRect: { left: plaqueRect.left, right: plaqueRect.right, width: plaqueRect.width },
        // Check if visible on screen and whether clamped >= 10px
        isPartiallyOnScreen: isPartiallyOnScreen,
        safeLeft: isPartiallyOnScreen ? (plaqueRect.left >= 9.5) : 'N/A — chưa vào khung hình',
        safeRight: isPartiallyOnScreen ? (plaqueRect.right <= window.innerWidth - 9.5) : 'N/A — chưa vào khung hình'
      };
    });
  });
  console.log('Mobile Round 1 Measurements:', mobileR1Measurements);

  const ssMobileR1Path = path.join(SS_DIR, 'c3_syntax_express_mobile_r1_fixed.png');
  await page.screenshot({ path: ssMobileR1Path });
  copyToBrain(ssMobileR1Path, 'c3_syntax_express_mobile_r1_fixed.png');
  console.log('📸 Mobile Round 1 screenshot captured:', ssMobileR1Path);

  // Strike correct lever on mobile to reach Round 2
  await page.evaluate(() => {
    const correctEl = document.querySelector('.rail-switch-entity[data-is-correct="true"]');
    if (correctEl) correctEl.click();
  });
  await sleep(1800);

  // Mobile Round 2
  const mobileR2Measurements = await page.evaluate(() => {
    const entities = Array.from(document.querySelectorAll('.rail-switch-entity'));
    const banner = document.querySelector('.syntax-rail-banner')?.textContent?.trim() || '';
    const measurements = entities.map((el, i) => {
      const rect = el.getBoundingClientRect();
      const plaque = el.querySelector('.rail-clause-plaque');
      const plaqueRect = plaque ? plaque.getBoundingClientRect() : rect;
      const text = el.getAttribute('data-lever-text') || el.textContent.trim();
      return {
        index: i,
        text,
        plaqueRect: { left: plaqueRect.left, right: plaqueRect.right, width: plaqueRect.width },
        safeLeft: plaqueRect.left >= 9.5,
        safeRight: plaqueRect.right <= window.innerWidth - 9.5
      };
    });
    return { banner, measurements };
  });
  console.log('Mobile Round 2 State:', mobileR2Measurements);

  const ssMobileR2Path = path.join(SS_DIR, 'c3_syntax_express_mobile_r2_fixed.png');
  await page.screenshot({ path: ssMobileR2Path });
  copyToBrain(ssMobileR2Path, 'c3_syntax_express_mobile_r2_fixed.png');
  console.log('📸 Mobile Round 2 screenshot captured:', ssMobileR2Path);

  // Strike correct lever on mobile to reach Round 3
  await page.evaluate(() => {
    const correctEl = document.querySelector('.rail-switch-entity[data-is-correct="true"]');
    if (correctEl) correctEl.click();
  });
  await sleep(1800);

  // Mobile Round 3
  const mobileR3Measurements = await page.evaluate(() => {
    const entities = Array.from(document.querySelectorAll('.rail-switch-entity'));
    const banner = document.querySelector('.syntax-rail-banner')?.textContent?.trim() || '';
    const measurements = entities.map((el, i) => {
      const rect = el.getBoundingClientRect();
      const plaque = el.querySelector('.rail-clause-plaque');
      const plaqueRect = plaque ? plaque.getBoundingClientRect() : rect;
      const text = el.getAttribute('data-lever-text') || el.textContent.trim();
      return {
        index: i,
        text,
        plaqueRect: { left: plaqueRect.left, right: plaqueRect.right, width: plaqueRect.width },
        safeLeft: plaqueRect.left >= 9.5,
        safeRight: plaqueRect.right <= window.innerWidth - 9.5
      };
    });
    return { banner, measurements };
  });
  console.log('Mobile Round 3 State:', mobileR3Measurements);

  const ssMobileR3Path = path.join(SS_DIR, 'c3_syntax_express_mobile_r3_fixed.png');
  await page.screenshot({ path: ssMobileR3Path });
  copyToBrain(ssMobileR3Path, 'c3_syntax_express_mobile_r3_fixed.png');
  console.log('📸 Mobile Round 3 screenshot captured:', ssMobileR3Path);

  console.log('Console errors encountered:', consoleErrors);

  await browser.close();

  const fullEvidence = {
    desktopDom,
    guideModalText,
    baselineScreenshot: ssBaselinePath,
    correctLeverClicked: correctLeverInfo,
    correctFeedbackObserved: correctFeedbackState,
    nextRoundDesktopDom,
    mobileMeasurements: {
      round1: mobileR1Measurements,
      round2: mobileR2Measurements,
      round3: mobileR3Measurements,
    },
    consoleErrors,
    screenshots: {
      desktop: ssDesktopPath,
      guide: ssGuidePath,
      baselineBeforeClick: ssBaselinePath,
      afterCorrectAction: ssCorrectActionPath,
      mobileR1Fixed: ssMobileR1Path,
      mobileR2Fixed: ssMobileR2Path,
      mobileR3Fixed: ssMobileR3Path,
    }
  };

  fs.writeFileSync(path.join(SS_DIR, 'c3_syntax_express_rail_evidence.json'), JSON.stringify(fullEvidence, null, 2));
  console.log('✅ Syntax Express Rail full evidence saved successfully!');
}

main().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
