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
  console.log('=== STARTING MOBILE INTERACTIVE & CLAMPING AUDIT FOR C6: TITAN GRAMMAR FORGE ===');

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

  // Set iPhone viewport 390x844 with touch enabled
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  const url = 'http://localhost:5173/week/33/chronicles?room=4&owner=true';
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(2000);

  // Enter Chest 2 (Door 1: Titan Grammar Forge)
  const opened = await page.evaluate(() => {
    const btns = document.querySelectorAll('.dr-door-enter-btn');
    if (btns[1]) {
      btns[1].click();
      return true;
    }
    return false;
  });

  if (!opened) throw new Error('Could not click Chest 2 on mobile!');
  await sleep(2500);

  // 1. Mobile Round 1: Baseline Measurements of All 3 Cogs
  console.log('\n--- MEASURING 3 COGS ON MOBILE (390px) ROUND 1 ---');
  const inspectCogs = () => {
    return page.evaluate(() => {
      const entities = Array.from(document.querySelectorAll('.titan-gear-entity'));
      const winW = window.innerWidth;
      const measurements = entities.map((el, i) => {
        const rect = el.getBoundingClientRect();
        const plaque = el.querySelector('.titan-clause-plaque');
        const plaqueRect = plaque ? plaque.getBoundingClientRect() : rect;
        const text = plaque?.textContent?.trim() || '';
        const isCorrect = el.getAttribute('data-is-correct') === 'true';
        const isPartiallyOnScreen = plaqueRect.right > 0 && plaqueRect.left < winW;
        return {
          index: i,
          text,
          isCorrect,
          rect: {
            left: Math.round(rect.left * 10) / 10,
            right: Math.round(rect.right * 10) / 10,
            width: Math.round(rect.width * 10) / 10,
          },
          plaqueRect: {
            left: Math.round(plaqueRect.left * 10) / 10,
            right: Math.round(plaqueRect.right * 10) / 10,
            width: Math.round(plaqueRect.width * 10) / 10,
          },
          isPartiallyOnScreen,
          safeLeft: isPartiallyOnScreen ? (plaqueRect.left >= 9.5) : 'N/A — offscreen',
          safeRight: isPartiallyOnScreen ? (plaqueRect.right <= winW - 9.5) : 'N/A — offscreen',
        };
      });

      const banner = document.querySelector('.titan-forge-banner')?.getBoundingClientRect();
      const bannerSafe = banner ? {
        left: banner.left >= 0,
        right: banner.right <= winW,
        width: Math.round(banner.width * 10) / 10
      } : null;

      return { winW, measurements, bannerSafe };
    });
  };

  const r1Measurements = await inspectCogs();
  console.log('Mobile R1 Measurements:', JSON.stringify(r1Measurements, null, 2));

  // Save baseline mobile screenshot
  const ssMobileR1 = path.join(SS_DIR, 'c6_titan_forge_mobile_r1_clamped.png');
  await page.screenshot({ path: ssMobileR1 });
  copyToBrain(ssMobileR1, 'c6_titan_forge_mobile_r1_clamped.png');
  console.log('📸 Mobile R1 Clamped screenshot saved:', ssMobileR1);

  // 2. Interactive Mobile Touch Action (Click Correct Cog on Mobile)
  console.log('\n--- EXECUTING INTERACTIVE TOUCH ON MOBILE ---');
  const touchResult = await page.evaluate(() => {
    // Find correct cog
    const correctCog = document.querySelector('.titan-gear-entity[data-is-correct="true"]');
    if (correctCog) {
      const plaque = correctCog.querySelector('.titan-clause-plaque');
      const text = plaque?.textContent?.trim() || '';
      correctCog.click();
      return { clicked: true, text };
    }
    return { clicked: false };
  });

  console.log('Mobile touch result:', touchResult);

  // Wait 400ms for feedback toast
  await sleep(400);

  const ssMobileAction = path.join(SS_DIR, 'c6_titan_forge_mobile_after_touch.png');
  await page.screenshot({ path: ssMobileAction });
  copyToBrain(ssMobileAction, 'c6_titan_forge_mobile_after_touch.png');
  console.log('📸 Mobile After Touch screenshot saved:', ssMobileAction);

  const mobileActionFeedback = await page.evaluate(() => {
    const toast = document.querySelector('.titan-feedback-toast');
    const toastText = toast?.textContent?.trim() || '';
    const toastClass = toast?.className || '';
    const hud = document.querySelector('.hud-overlay')?.textContent?.trim() || '';
    const ttsLog = window.__ttsInvocations || [];
    return { toastText, toastClass, hud, ttsLog };
  });
  console.log('Mobile Action Feedback:', mobileActionFeedback);

  // 3. Wait for Round 2 Transition on Mobile
  console.log('\n--- WAITING FOR ROUND 2 ON MOBILE ---');
  await sleep(1800);

  const r2Measurements = await inspectCogs();
  console.log('Mobile R2 Measurements:', JSON.stringify(r2Measurements, null, 2));

  const ssMobileR2 = path.join(SS_DIR, 'c6_titan_forge_mobile_r2_transition.png');
  await page.screenshot({ path: ssMobileR2 });
  copyToBrain(ssMobileR2, 'c6_titan_forge_mobile_r2_transition.png');
  console.log('📸 Mobile R2 Transition screenshot saved:', ssMobileR2);

  const finalEvidence = {
    test: 'C6 Mobile Clamping & Interactive Touch Verification',
    viewport: '390x844 (Touch Enabled)',
    round1: r1Measurements,
    touchInteraction: touchResult,
    feedback: mobileActionFeedback,
    round2: r2Measurements,
    consoleErrors,
    screenshots: [
      'c6_titan_forge_mobile_r1_clamped.png',
      'c6_titan_forge_mobile_after_touch.png',
      'c6_titan_forge_mobile_r2_transition.png'
    ]
  };

  const jsonPath = path.join(SS_DIR, 'c6_titan_forge_mobile_interactive_evidence.json');
  fs.writeFileSync(jsonPath, JSON.stringify(finalEvidence, null, 2), 'utf-8');
  console.log('Saved mobile interactive evidence JSON to:', jsonPath);

  await browser.close();
  console.log('=== MOBILE AUDIT COMPLETED ===');
}

main().catch(err => {
  console.error('Mobile audit failed:', err);
  process.exit(1);
});
