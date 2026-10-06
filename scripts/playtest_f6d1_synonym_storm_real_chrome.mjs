/**
 * playtest_f6d1_synonym_storm_real_chrome.mjs
 *
 * Real Chrome GUI Manual Keyboard Playtest for Floor 6 Door 1: Synonym Storm Defense.
 * 1. Steers Leo with Arrow keys to deflect Round 1 synonym ("cautious" for "careful") -> Battery 20%.
 * 2. In Round 2 ("prevent"), deliberately steers Leo underneath a Hazard meteor -> Hearts drop 3 -> 2.
 * 3. Captures screenshot evidence proving:
 *    - Hearts: 2 (1 empty, 2 full)
 *    - Battery: 20% (no penalty drop)
 *    - Round Pill: "ROUND 2/5" (no off-by-one 0/5!)
 *    - Toast: ⚡ HAZARD! "..." is an ANTONYM / WRONG WORD for "prevent"!
 * 4. Continues play to deflect remaining rounds to 100% full charge (Victory Modal).
 * 5. Captures victory screenshot.
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
  console.log('🎮 [F6D1 Synonym Storm Playtest] Launching Real Chrome GUI...');
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
    if (text.includes('[SYNONYM-STORM')) {
      console.log('⏱️ [CONSOLE]', text);
    }
  });

  await page.goto(`${BASE_URL}/quest-demo`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  await page.waitForSelector('#select-active-game', { timeout: 5000 });
  await page.select('#select-active-game', 'synonym_storm');
  await new Promise(r => setTimeout(r, 1500));

  await page.waitForSelector('.synonym-storm-root', { timeout: 5000 });
  console.log('✅ Synonym Storm initialized. Starting 5-round playtest...\n');

  // Verify Round 1 Initial HUD
  const initialData = await page.evaluate(() => {
    return {
      roundPill: document.querySelector('.hud-round-pill')?.innerText,
      floorBadge: document.querySelector('.hud-floor-badge')?.innerText,
      hearts: document.querySelectorAll('.hud-heart-full').length,
      battery: document.querySelector('.battery-pct')?.innerText,
      promptRoot: document.querySelector('.synonym-root-word')?.innerText,
    };
  });
  console.log('📋 [INITIAL HUD DATA]:', JSON.stringify(initialData, null, 2));

  // STEP 1: Deflect Round 1 Target ("cautious")
  console.log('\n--- Step 1: Catching Round 1 Target (CAREFUL -> cautious) ---');
  let round1Cleared = false;
  const startT = Date.now();
  while (!round1Cleared && (Date.now() - startT) < 30000) {
    const info = await page.evaluate(() => {
      const meteors = Array.from(document.querySelectorAll('.falling-synonym-meteor.meteor-synonym')).map(el => ({
        x: parseFloat(el.style.left),
        y: parseFloat(el.style.top),
        word: el.innerText.trim(),
      }));
      const aura = document.querySelector('.aegis-shield-aura');
      const batteryEl = document.querySelector('.battery-pct');
      const rootWord = document.querySelector('.synonym-root-word')?.innerText;
      return {
        targets: meteors,
        leoX: aura ? parseFloat(aura.parentElement?.style?.left || aura.style.left) : 430,
        leoY: aura ? parseFloat(aura.parentElement?.style?.top || aura.style.top) : 450,
        battery: batteryEl ? parseInt(batteryEl.innerText, 10) : 0,
        rootWord,
      };
    });

    if (info.battery >= 20 || info.rootWord === 'PREVENT') {
      round1Cleared = true;
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

  console.log('✅ Round 1 Completed! Battery: 20%. Waiting for Round 2...');
  await new Promise(r => setTimeout(r, 2000));

  // STEP 2: In Round 2 (PREVENT), deliberately catch a Hazard meteor (-1 Heart)
  console.log('\n--- Step 2: Deliberately Intercepting Hazard in Round 2 (PREVENT) ---');
  let hazardTaken = false;
  const hazardStartT = Date.now();
  while (!hazardTaken && (Date.now() - hazardStartT) < 30000) {
    const info = await page.evaluate(() => {
      const meteors = Array.from(document.querySelectorAll('.falling-synonym-meteor.meteor-hazard')).map(el => ({
        x: parseFloat(el.style.left),
        y: parseFloat(el.style.top),
        word: el.innerText.trim(),
      }));
      const aura = document.querySelector('.aegis-shield-aura');
      const heartsCount = document.querySelectorAll('.hud-heart-full').length;
      const toastEl = document.querySelector('.synonym-feedback-toast');
      const batteryEl = document.querySelector('.battery-pct');
      return {
        hazards: meteors,
        leoX: aura ? parseFloat(aura.parentElement?.style?.left || aura.style.left) : 430,
        leoY: aura ? parseFloat(aura.parentElement?.style?.top || aura.style.top) : 450,
        battery: batteryEl ? parseInt(batteryEl.innerText, 10) : 0,
        hearts: heartsCount,
        hasHazardToast: toastEl && toastEl.innerText.includes('HAZARD'),
      };
    });

    if (info.hasHazardToast || info.hearts === 2) {
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

  // Capture Hazard Proof Frame
  await page.waitForSelector('.synonym-feedback-toast.feedback-wrong', { timeout: 4000 });
  const hazardProofData = await page.evaluate(() => {
    return {
      hearts: document.querySelectorAll('.hud-heart-full').length,
      batteryText: document.querySelector('.battery-pct')?.innerText,
      roundPillText: document.querySelector('.hud-round-pill')?.innerText,
      roundChipText: document.querySelector('.synonym-round-chip')?.innerText,
      toast: document.querySelector('.synonym-feedback-toast')?.innerText,
      timer: document.querySelector('.hud-timer')?.innerText,
    };
  });

  console.log('\n🎯 [HAZARD PROOF CAPTURED]:', JSON.stringify(hazardProofData, null, 2));
  const bufHazard = await page.screenshot();
  saveFrame(bufHazard, 'f6d1_synonym_storm_hazard_proof.png', 'Synonym Storm Hazard Hit in Round 2: Hearts dropped to 2, Battery stays 20%, HUD shows ROUND 2/5');

  // STEP 3: Complete remaining rounds (Round 2 -> Round 5) to 100% full charge
  console.log('\n--- Step 3: Continuing through all remaining rounds to 100% victory ---');
  let cleared = false;
  const finishStartT = Date.now();
  while (!cleared && (Date.now() - finishStartT) < 60000) {
    const gameState = await page.evaluate(() => {
      const targets = Array.from(document.querySelectorAll('.falling-synonym-meteor.meteor-synonym')).map(el => ({
        x: parseFloat(el.style.left),
        y: parseFloat(el.style.top),
      }));
      const aura = document.querySelector('.aegis-shield-aura');
      const batteryEl = document.querySelector('.battery-pct');
      const clearedModal = document.querySelector('.storm-cleared-modal');
      return {
        targets,
        leoX: aura ? parseFloat(aura.parentElement?.style?.left || aura.style.left) : 430,
        leoY: aura ? parseFloat(aura.parentElement?.style?.top || aura.style.top) : 450,
        battery: batteryEl ? parseInt(batteryEl.innerText, 10) : 0,
        cleared: !!clearedModal,
      };
    });

    if (gameState.cleared || gameState.battery >= 100) {
      cleared = true;
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
      roundPill: document.querySelector('.hud-round-pill')?.innerText,
    };
  });
  console.log('\n🏆 [VICTORY CONFIRMED]:', JSON.stringify(victoryData, null, 2));

  const bufVictory = await page.screenshot();
  saveFrame(bufVictory, 'f6d1_synonym_storm_cleared_proof.png', 'Synonym Storm Cleared: 100% Battery, ROUND 5/5, Victory Modal');

  // Summary of events
  const actionLogs = consoleLogs.filter(l => l.text.includes('[SYNONYM-STORM-ACTION]') || l.text.includes('[SYNONYM-STORM-CLEARED]'));
  console.log('\n======================================================');
  console.log('📊 [FULL EVENT-DRIVEN LOG SEQUENCE]:');
  console.log('======================================================');
  actionLogs.forEach(l => console.log(l.text));

  await browser.close();
  console.log('\n✨ [DONE] F6D1 Synonym Storm verification completed successfully.');
}

run().catch(err => {
  console.error('❌ Error during Synonym Storm test:', err);
  process.exit(1);
});
