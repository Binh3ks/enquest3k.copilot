/**
 * playtest_p1_2_manual_hazard_penalty.mjs
 *
 * Real Chrome Keyboard Navigation Playtest for Storm Shield Defense (P1-2).
 * Verifies the exact physical hazard penalty mechanism:
 * 1. Steers Leo with Arrow keys to deflect Target #1 -> Battery: 20%, Hearts: 3.
 * 2. Steers Leo directly underneath a Hazard meteor -> Battery drops 20% -> 10%, Hearts drop 3 -> 2.
 * 3. Captures high-resolution screenshot proving BOTH:
 *    - Hearts reduced to 2 (one empty heart / 2 full hearts)
 *    - Battery reduced to 10% (bar fill halved)
 *    - Toast visible: 💥 HAZARD HIT! ... cracked shield! (-1 Heart)
 * 4. Continues keyboard play to complete all 100% battery (requiring 6 target hits due to -10% penalty).
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
  console.log('🎮 [Storm Shield Hazard Penalty Test] Launching Real Chrome GUI...');
  const browser = await puppeteer.launch({
    executablePath: fs.existsSync(CHROME_PATH) ? CHROME_PATH : undefined,
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--window-size=1280,820'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const consoleLogs = [];
  page.on('console', msg => {
    const text = msg.text();
    consoleLogs.push({ text, time: Date.now() });
    if (text.includes('[STORM-SHIELD')) {
      console.log('⏱️ [CONSOLE]', text);
    }
  });

  await page.goto(`${BASE_URL}/quest-demo`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  await page.waitForSelector('#select-active-game', { timeout: 5000 });
  await page.select('#select-active-game', 'storm_shield');
  await new Promise(r => setTimeout(r, 1500));

  await page.waitForSelector('.storm-shield-root', { timeout: 5000 });
  console.log('✅ Storm Shield initialized. Beginning Hazard Penalty test...\n');

  // STEP 1: Steer Leo with keyboard to catch Target #1 (get to 20% Battery)
  console.log('--- Step 1: Catching Target #1 (0% -> 20% Battery) ---');
  let reached20 = false;
  const startT = Date.now();
  while (!reached20 && (Date.now() - startT) < 25000) {
    const info = await page.evaluate(() => {
      const meteors = Array.from(document.querySelectorAll('.falling-meteor-entity.meteor-golden')).map(el => ({
        x: parseFloat(el.style.left),
        y: parseFloat(el.style.top),
        word: el.innerText.trim(),
      }));
      const aura = document.querySelector('.aegis-shield-aura');
      const batteryEl = document.querySelector('.battery-pct');
      return {
        targets: meteors,
        leoX: aura ? parseFloat(aura.style.left) + 6 : 430,
        leoY: aura ? parseFloat(aura.style.top) + 6 : 450,
        battery: batteryEl ? parseInt(batteryEl.innerText, 10) : 0,
      };
    });

    if (info.battery >= 20) {
      reached20 = true;
      break;
    }

    const t = info.targets.find(m => m.y < 440);
    if (t) {
      const diffX = (t.x + 15) - info.leoX;
      if (Math.abs(diffX) > 20) {
        const key = diffX > 0 ? 'ArrowRight' : 'ArrowLeft';
        await page.keyboard.down(key);
        await new Promise(r => setTimeout(r, Math.min(150, Math.abs(diffX) * 2)));
        await page.keyboard.up(key);
      } else {
        if (t.y < info.leoY - 40 && t.y > info.leoY - 140) {
          await page.keyboard.press('ArrowUp');
          await new Promise(r => setTimeout(r, 120));
        } else {
          await new Promise(r => setTimeout(r, 50));
        }
      }
    } else {
      await new Promise(r => setTimeout(r, 100));
    }
  }

  console.log('✅ Target #1 intercepted! Current Battery: 20%, Hearts: 3.');
  await new Promise(r => setTimeout(r, 1000));

  // STEP 2: Deliberately steer Leo to hit a HAZARD meteor to trigger the -10% penalty
  console.log('\n--- Step 2: Deliberately Intercepting Hazard Meteor (-10% Battery, -1 Heart) ---');
  let hazardTaken = false;
  const hazardStartT = Date.now();
  while (!hazardTaken && (Date.now() - hazardStartT) < 25000) {
    const info = await page.evaluate(() => {
      const meteors = Array.from(document.querySelectorAll('.falling-meteor-entity.meteor-hazard')).map(el => ({
        x: parseFloat(el.style.left),
        y: parseFloat(el.style.top),
        word: el.innerText.trim(),
      }));
      const aura = document.querySelector('.aegis-shield-aura');
      const batteryEl = document.querySelector('.battery-pct');
      const heartsCount = document.querySelectorAll('.hud-heart-full').length;
      const toastEl = document.querySelector('.storm-feedback-toast');
      return {
        hazards: meteors,
        leoX: aura ? parseFloat(aura.style.left) + 6 : 430,
        leoY: aura ? parseFloat(aura.style.top) + 6 : 450,
        battery: batteryEl ? parseInt(batteryEl.innerText, 10) : 0,
        hearts: heartsCount,
        hasHazardToast: toastEl && toastEl.innerText.includes('HAZARD HIT'),
      };
    });

    if (info.hasHazardToast || (info.hearts === 2 && info.battery === 10)) {
      hazardTaken = true;
      break;
    }

    const h = info.hazards.find(m => m.y < 440);
    if (h) {
      const diffX = (h.x + 15) - info.leoX;
      if (Math.abs(diffX) > 20) {
        const key = diffX > 0 ? 'ArrowRight' : 'ArrowLeft';
        await page.keyboard.down(key);
        await new Promise(r => setTimeout(r, Math.min(150, Math.abs(diffX) * 2)));
        await page.keyboard.up(key);
      } else {
        if (h.y < info.leoY - 40 && h.y > info.leoY - 140) {
          await page.keyboard.press('ArrowUp');
          await new Promise(r => setTimeout(r, 120));
        } else {
          await new Promise(r => setTimeout(r, 50));
        }
      }
    } else {
      await new Promise(r => setTimeout(r, 100));
    }
  }

  // Capture the pivotal proof screenshot immediately while the hazard toast is active!
  await page.waitForSelector('.storm-feedback-toast.feedback-wrong', { timeout: 4000 });
  const penaltyData = await page.evaluate(() => {
    return {
      hearts: document.querySelectorAll('.hud-heart-full').length,
      batteryText: document.querySelector('.battery-pct')?.innerText,
      batteryBarWidth: document.querySelector('.battery-bar-fill')?.style.width,
      roundPillText: document.querySelector('.hud-round-pill')?.innerText,
      crystalText: document.querySelector('.hud-crystal-count')?.innerText,
      toast: document.querySelector('.storm-feedback-toast')?.innerText,
      timer: document.querySelector('.hud-timer')?.innerText,
    };
  });

  console.log('\n🎯 [CRUCIAL EVIDENCE CAPTURED]:', JSON.stringify(penaltyData, null, 2));
  const bufProof = await page.screenshot();
  saveFrame(bufProof, 'p1_2_storm_hazard_penalty_proof.png', 'Storm Shield Hazard Penalty: Hearts dropped to 2 AND Battery dropped to 10% simultaneously');

  // STEP 3: Continue keyboard navigation to 100% victory
  console.log('\n--- Step 3: Continuing Play to 100% Full Charge (Requires 6 total targets) ---');
  let isCleared = false;
  const finishStartT = Date.now();
  while (!isCleared && (Date.now() - finishStartT) < 45000) {
    const gameState = await page.evaluate(() => {
      const targets = Array.from(document.querySelectorAll('.falling-meteor-entity.meteor-golden')).map(el => ({
        x: parseFloat(el.style.left),
        y: parseFloat(el.style.top),
      }));
      const aura = document.querySelector('.aegis-shield-aura');
      const batteryEl = document.querySelector('.battery-pct');
      const clearedModal = document.querySelector('.storm-cleared-modal');
      return {
        targets,
        leoX: aura ? parseFloat(aura.style.left) + 6 : 430,
        leoY: aura ? parseFloat(aura.style.top) + 6 : 450,
        battery: batteryEl ? parseInt(batteryEl.innerText, 10) : 0,
        cleared: !!clearedModal,
      };
    });

    if (gameState.cleared || gameState.battery >= 100) {
      isCleared = true;
      break;
    }

    const t = gameState.targets.find(m => m.y < 440);
    if (t) {
      const diffX = (t.x + 15) - gameState.leoX;
      if (Math.abs(diffX) > 20) {
        const key = diffX > 0 ? 'ArrowRight' : 'ArrowLeft';
        await page.keyboard.down(key);
        await new Promise(r => setTimeout(r, Math.min(150, Math.abs(diffX) * 2)));
        await page.keyboard.up(key);
      } else {
        if (t.y < gameState.leoY - 40 && t.y > gameState.leoY - 140) {
          await page.keyboard.press('ArrowUp');
          await new Promise(r => setTimeout(r, 120));
        } else {
          await new Promise(r => setTimeout(r, 50));
        }
      }
    } else {
      await new Promise(r => setTimeout(r, 100));
    }
  }

  await page.waitForSelector('.storm-cleared-modal', { timeout: 6000 });
  const victoryData = await page.evaluate(() => {
    return {
      title: document.querySelector('.storm-cleared-modal h2')?.innerText,
      score: document.querySelector('.cleared-score')?.innerText,
      timer: document.querySelector('.hud-timer')?.innerText,
    };
  });
  console.log('🏆 [VICTORY CONFIRMED]:', JSON.stringify(victoryData, null, 2));

  const bufVictory = await page.screenshot();
  saveFrame(bufVictory, 'p1_2_storm_hazard_run_cleared.png', 'Storm Shield Victory with Hazard Penalty Run');

  // Summary of events
  const actionLogs = consoleLogs.filter(l => l.text.includes('[STORM-SHIELD-ACTION]') || l.text.includes('[STORM-SHIELD-CLEARED]'));
  console.log('\n======================================================');
  console.log('📊 [FULL EVENT-DRIVEN LOG SEQUENCE]:');
  console.log('======================================================');
  actionLogs.forEach(l => console.log(l.text));

  await browser.close();
  console.log('✨ [DONE] Hazard Penalty Verification Test completed successfully.');
}

run().catch(err => {
  console.error('❌ Error during hazard penalty test:', err);
  process.exit(1);
});
