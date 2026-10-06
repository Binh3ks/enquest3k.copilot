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

  console.log('=== AUDITING C4: LEXICAL RIDDLE / RIDDLE RUN MAZE (DESKTOP 1280x800) ===');
  await page.setViewport({ width: 1280, height: 800 });

  // Navigate to Room 3 (Floor 4: Rune Sanctum)
  const url = `http://localhost:5173/week/33/chronicles?room=3&owner=true`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(2000);

  // Click Chest 3 (Door index 2 -> lexical_riddle / RiddleRunMaze)
  const opened = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')).filter(b => 
      b.textContent.includes('Open Chest') || b.textContent.includes('Replay') || b.textContent.includes('Enter')
    );
    if (btns[2]) {
      btns[2].click();
      return true;
    }
    return false;
  });

  if (!opened) {
    console.error('❌ Could not click Chest 3 in Room 3!');
  }
  await sleep(2500);

  // 1. Initial Desktop State & Screenshot
  const ssDesktopPath = path.join(SS_DIR, 'c4_lexical_riddle_desktop_1280x800.png');
  await page.screenshot({ path: ssDesktopPath });
  copyToBrain(ssDesktopPath, 'c4_lexical_riddle_desktop_1280x800.png');
  console.log('📸 Desktop screenshot captured:', ssDesktopPath);

  const desktopDom = await page.evaluate(() => {
    const banner = document.querySelector('.riddle-maze-banner')?.textContent?.trim() || '';
    const prompt = document.querySelector('.riddle-prompt-text')?.textContent?.trim() || '';
    const roundChip = document.querySelector('.riddle-round-chip')?.textContent?.trim() || '';
    const hud = document.querySelector('.hud-overlay')?.textContent?.trim() || '';
    const doors = Array.from(document.querySelectorAll('.vault-door-entity')).map(d => ({
      word: d.getAttribute('data-door-word') || d.textContent.trim(),
      isCorrect: d.getAttribute('data-is-correct') === 'true',
      id: d.getAttribute('data-door-id'),
    }));
    const leoEl = document.querySelector('.leo-character');
    const hasLeo = !!leoEl;
    const leoPos = leoEl ? {
      left: leoEl.style.left,
      top: leoEl.style.top
    } : null;
    const beastEl = document.querySelector('.chaser-beast-sprite');
    const hasBeast = !!beastEl;
    const hasExit = !!document.querySelector('.floating-exit-btn');
    const hasHelp = !!document.querySelector('.riddle-help-btn');
    return { banner, prompt, roundChip, hud, doors, hasLeo, leoPos, hasBeast, hasExit, hasHelp };
  });
  console.log('Desktop DOM state:', desktopDom);

  // 2. Guide Modal Verification
  console.log('=== OPENING GUIDE MODAL ===');
  await page.evaluate(() => {
    const helpBtn = document.querySelector('.riddle-help-btn');
    if (helpBtn) helpBtn.click();
  });
  await sleep(1000);

  const ssGuidePath = path.join(SS_DIR, 'c4_lexical_riddle_guide_modal.png');
  await page.screenshot({ path: ssGuidePath });
  copyToBrain(ssGuidePath, 'c4_lexical_riddle_guide_modal.png');
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

  // 3. BASELINE BEFORE CLICKING VAULT DOOR
  console.log('=== CAPTURING BASELINE BEFORE CLICK ===');
  const ssBaselinePath = path.join(SS_DIR, 'c4_lexical_riddle_baseline_before_click.png');
  await page.screenshot({ path: ssBaselinePath });
  copyToBrain(ssBaselinePath, 'c4_lexical_riddle_baseline_before_click.png');
  console.log('📸 Baseline screenshot captured:', ssBaselinePath);

  // 4. TESTING CORRECT VAULT DOOR (DYNAMIC SELECTION)
  console.log('=== IDENTIFYING AND ENTERING CORRECT VAULT DOOR ===');
  const correctDoorInfo = await page.evaluate(() => {
    const correctEl = document.querySelector('.vault-door-entity[data-is-correct="true"]');
    if (!correctEl) return null;
    const word = correctEl.getAttribute('data-door-word') || correctEl.textContent.trim();
    const id = correctEl.getAttribute('data-door-id');
    const rect = correctEl.getBoundingClientRect();
    return { id, word, x: rect.x, y: rect.y };
  });
  console.log('Correct Door Detected:', correctDoorInfo);

  if (!correctDoorInfo) {
    throw new Error('No correct vault door found with data-is-correct="true"!');
  }

  // Click the correct vault door
  await page.evaluate(() => {
    const correctEl = document.querySelector('.vault-door-entity[data-is-correct="true"]');
    if (correctEl) correctEl.click();
  });

  // Wait 400ms for immediate feedback animation/toast
  await sleep(400);

  const ssCorrectActionPath = path.join(SS_DIR, 'c4_lexical_riddle_after_correct_action.png');
  await page.screenshot({ path: ssCorrectActionPath });
  copyToBrain(ssCorrectActionPath, 'c4_lexical_riddle_after_correct_action.png');
  console.log('📸 Correct Action screenshot captured:', ssCorrectActionPath);

  const correctFeedbackState = await page.evaluate(() => {
    const toast = document.querySelector('.riddle-feedback-toast');
    const toastClass = toast?.className || '';
    const toastText = toast?.textContent?.trim() || '';
    const hudText = document.querySelector('.hud-overlay')?.textContent?.trim() || '';
    const ttsLog = window.__ttsInvocations || [];
    return { toastClass, toastText, hudText, ttsLog };
  });
  console.log('Correct Feedback State (Immediate):', correctFeedbackState);
  console.log('Runtime TTS Invocations:', correctFeedbackState.ttsLog);

  // Wait for round transition (1.5s in RiddleRunMaze.jsx)
  await sleep(1600);

  const nextRoundDesktopDom = await page.evaluate(() => {
    const banner = document.querySelector('.riddle-maze-banner')?.textContent?.trim() || '';
    const hud = document.querySelector('.hud-overlay')?.textContent?.trim() || '';
    return { banner, hud };
  });
  console.log('Desktop State After Round Transition:', nextRoundDesktopDom);

  // 5. TESTING MOBILE VIEWPORT & CLAMPING (390x844) ACROSS ALL 3 ROUNDS
  console.log('=== AUDITING C4: RIDDLE RUN MAZE ON MOBILE (390x844) ===');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(2000);

  // Open game on mobile
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')).filter(b => 
      b.textContent.includes('Open Chest') || b.textContent.includes('Replay') || b.textContent.includes('Enter')
    );
    if (btns[2]) btns[2].click();
  });
  await sleep(2500);

  // Function to inspect mobile door positions with clean N/A handling
  const inspectMobileDoors = () => {
    return page.evaluate(() => {
      const entities = Array.from(document.querySelectorAll('.vault-door-entity'));
      const banner = document.querySelector('.riddle-maze-banner')?.textContent?.trim() || '';
      const prompt = document.querySelector('.riddle-prompt-text')?.textContent?.trim() || '';
      const measurements = entities.map((el, i) => {
        const rect = el.getBoundingClientRect();
        const plaque = el.querySelector('.vault-door-plaque');
        const plaqueRect = plaque ? plaque.getBoundingClientRect() : rect;
        const word = el.getAttribute('data-door-word') || el.textContent.trim();
        const isCorrect = el.getAttribute('data-is-correct') === 'true';
        // Base on-screen determination on the visible plaque itself
        const isPartiallyOnScreen = plaqueRect.right > 0 && plaqueRect.left < window.innerWidth;
        return {
          index: i,
          word,
          isCorrect,
          rect: { left: rect.left, right: rect.right, width: rect.width },
          plaqueRect: { left: plaqueRect.left, right: plaqueRect.right, width: plaqueRect.width },
          isPartiallyOnScreen,
          safeLeft: isPartiallyOnScreen ? (plaqueRect.left >= 9.5) : 'N/A — chưa vào khung hình',
          safeRight: isPartiallyOnScreen ? (plaqueRect.right <= window.innerWidth - 9.5) : 'N/A — chưa vào khung hình',
        };
      });
      return { banner, prompt, measurements };
    });
  };

  // Mobile Round 1
  const mobileR1 = await inspectMobileDoors();
  console.log('Mobile Round 1 State:', mobileR1);

  const ssMobileR1Path = path.join(SS_DIR, 'c4_lexical_riddle_mobile_r1.png');
  await page.screenshot({ path: ssMobileR1Path });
  copyToBrain(ssMobileR1Path, 'c4_lexical_riddle_mobile_r1.png');
  console.log('📸 Mobile Round 1 screenshot captured:', ssMobileR1Path);

  // Strike correct door to advance to Round 2
  await page.evaluate(() => {
    const correctEl = document.querySelector('.vault-door-entity[data-is-correct="true"]');
    if (correctEl) correctEl.click();
  });
  await sleep(1800);

  // Mobile Round 2
  const mobileR2 = await inspectMobileDoors();
  console.log('Mobile Round 2 State:', mobileR2);

  const ssMobileR2Path = path.join(SS_DIR, 'c4_lexical_riddle_mobile_r2.png');
  await page.screenshot({ path: ssMobileR2Path });
  copyToBrain(ssMobileR2Path, 'c4_lexical_riddle_mobile_r2.png');
  console.log('📸 Mobile Round 2 screenshot captured:', ssMobileR2Path);

  // Strike correct door to advance to Round 3
  await page.evaluate(() => {
    const correctEl = document.querySelector('.vault-door-entity[data-is-correct="true"]');
    if (correctEl) correctEl.click();
  });
  await sleep(1800);

  // Mobile Round 3
  const mobileR3 = await inspectMobileDoors();
  console.log('Mobile Round 3 State:', mobileR3);

  const ssMobileR3Path = path.join(SS_DIR, 'c4_lexical_riddle_mobile_r3.png');
  await page.screenshot({ path: ssMobileR3Path });
  copyToBrain(ssMobileR3Path, 'c4_lexical_riddle_mobile_r3.png');
  console.log('📸 Mobile Round 3 screenshot captured:', ssMobileR3Path);

  console.log('Console errors encountered:', consoleErrors);

  await browser.close();

  const fullEvidence = {
    desktopDom,
    guideModalText,
    baselineScreenshot: ssBaselinePath,
    correctDoorClicked: correctDoorInfo,
    correctFeedbackObserved: correctFeedbackState,
    nextRoundDesktopDom,
    mobileMeasurements: {
      round1: mobileR1,
      round2: mobileR2,
      round3: mobileR3,
    },
    consoleErrors,
    screenshots: {
      desktop: ssDesktopPath,
      guide: ssGuidePath,
      baselineBeforeClick: ssBaselinePath,
      afterCorrectAction: ssCorrectActionPath,
      mobileR1: ssMobileR1Path,
      mobileR2: ssMobileR2Path,
      mobileR3: ssMobileR3Path,
    }
  };

  fs.writeFileSync(path.join(SS_DIR, 'c4_lexical_riddle_evidence.json'), JSON.stringify(fullEvidence, null, 2));
  console.log('✅ Lexical Riddle full evidence saved successfully!');
}

main().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
