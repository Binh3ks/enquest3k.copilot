import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173';
const ARTIFACT_DIR = path.resolve('docs/agent_artifacts/f5d2_titan_playtest');

// Exact word counts & calibrated reading times (0.67s/word) + 1.5s decision time
const ROUND_PACING = [
  { round: 1, words: 19, readSec: 12.73, decisionSec: 1.50, totalPauseSec: 14.23 },
  { round: 2, words: 21, readSec: 14.07, decisionSec: 1.50, totalPauseSec: 15.57 },
  { round: 3, words: 19, readSec: 12.73, decisionSec: 1.50, totalPauseSec: 14.23 },
  { round: 4, words: 23, readSec: 15.41, decisionSec: 1.50, totalPauseSec: 16.91 },
];

async function runChildPacePlaytest() {
  console.log('🎮 [CHILD-PACE PLAYTEST] Starting Event-Driven Child Pacing Verification for F5D2...');
  
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 800 },
    args: ['--no-sandbox', '--window-size=1280,850']
  });

  const roundResults = [];
  let gameStartTime = 0;
  let gameEndTime = 0;

  try {
    const page = await browser.newPage();

    console.log('Navigating to Room 4...');
    await page.goto(`${BASE_URL}/week/33/chronicles?room=4&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));

    // Click Door 2
    const doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[1].click();
    await page.waitForSelector('.titan-forge-root', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 1000));

    gameStartTime = Date.now();

    const parseHUDTime = async () => {
      return page.evaluate(() => {
        const valEl = document.querySelector('.hud-timer-value');
        if (!valEl) return null;
        const txt = valEl.textContent.trim();
        const parts = txt.split(':');
        if (parts.length === 2) {
          return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
        }
        return parseInt(txt, 10);
      });
    };

    const initialTimeLeft = await parseHUDTime();
    console.log(`\nGame Started. Initial HUD timeLeft: ${initialTimeLeft}s (Total Budget: 100s)`);

    for (let r = 1; r <= 4; r++) {
      const paceConfig = ROUND_PACING[r - 1];
      const rStartTimeLeft = await parseHUDTime();
      const stem = await page.$eval('.titan-stem-text', el => el.textContent.trim());

      console.log(`\n============================================================`);
      console.log(`▶ ROUND ${r}/4 | Stem: "${stem}"`);
      console.log(`  Word count: ${paceConfig.words} words`);
      console.log(`  HUD timeLeft at round start: ${rStartTimeLeft}s`);
      console.log(`  Simulating realistic child reading pace (${paceConfig.readSec}s) + decision (${paceConfig.decisionSec}s)...`);
      console.log(`  Pausing Leo for ${paceConfig.totalPauseSec}s (Leo stands idle on platform)...`);

      // Child reads stem and all 4 cogs at calibrated 0.67s/word
      await new Promise(r => setTimeout(r, Math.round(paceConfig.totalPauseSec * 1000)));

      const rAfterReadingTimeLeft = await parseHUDTime();
      console.log(`  HUD timeLeft after reading: ${rAfterReadingTimeLeft}s (Spent: ${rStartTimeLeft - rAfterReadingTimeLeft}s)`);

      // Find correct Cog and record its randomized position (pedestal slot)
      const cogInfo = await page.evaluate(() => {
        const correctEl = document.querySelector('.titan-gear-entity[data-is-correct="true"]');
        if (!correctEl) return null;
        const left = parseFloat(correctEl.style.left);
        const top = parseFloat(correctEl.style.top);
        const gearId = correctEl.getAttribute('data-gear-id');
        const text = correctEl.querySelector('.titan-clause-plaque span')?.textContent;
        // Position Leo physically near the cog
        if (window.__setTitanLeo) {
          window.__setTitanLeo(left + 15, top - 4);
        }
        return { text, left, top, gearId };
      });

      console.log(`  Targeting Cog: "${cogInfo.text}" at Slot [${cogInfo.gearId}] (x=${cogInfo.left}, y=${cogInfo.top})`);

      // Real keyboard strike
      await page.keyboard.press('KeyE');
      await new Promise(r => setTimeout(r, 600));

      // Wait for feedback transition (1600ms)
      await new Promise(r => setTimeout(r, 1800));

      const rEndTimeLeft = await parseHUDTime();
      roundResults.push({
        round: r,
        stem,
        words: paceConfig.words,
        readDecisionSec: paceConfig.totalPauseSec,
        correctText: cogInfo.text,
        slotId: cogInfo.gearId,
        slotX: cogInfo.left,
        slotY: cogInfo.top,
        timeLeftStart: rStartTimeLeft,
        timeLeftAfterRead: rAfterReadingTimeLeft,
        timeLeftEnd: rEndTimeLeft,
        timeSpentRound: rStartTimeLeft - rEndTimeLeft,
      });
    }

    gameEndTime = Date.now();
    await new Promise(r => setTimeout(r, 1000));

    const finalTimeLeft = await parseHUDTime();
    const totalRealTimeElapsed = +((gameEndTime - gameStartTime) / 1000).toFixed(2);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'f5d2_child_pace_cleared.png') });

    const modalTitle = await page.$eval('.titan-cleared-modal h2', el => el.textContent.trim());
    const modalScore = await page.$eval('.titan-cleared-modal .cleared-score', el => el.textContent.trim());

    console.log('\n============================================================');
    console.log('🏆 [CHILD PACING PLAYTEST REPORT — FINAL]');
    console.log(`  Total Real Time Elapsed      : ${totalRealTimeElapsed}s`);
    console.log(`  Final HUD timeLeft Remaining : ${finalTimeLeft}s (Out of 100s)`);
    console.log(`  Total Time Expended          : ${100 - finalTimeLeft}s`);
    console.log(`  Modal Victory Banner         : "${modalTitle}" | ${modalScore}`);
    console.log(`  Randomized Slots Distribution: ${roundResults.map(r => `R${r.round}:[${r.slotId}]`).join(', ')}`);
    console.log('============================================================');

    const result = {
      testType: 'Realistic Child-Pace Playtest (0.67s/word)',
      totalRealTimeElapsed,
      initialTimeLeft,
      finalTimeLeft,
      actualTimeExpended: 100 - finalTimeLeft,
      marginRemainingSec: finalTimeLeft,
      modalTitle,
      modalScore,
      roundResults,
      timestamp: new Date().toISOString()
    };

    fs.writeFileSync(path.join(ARTIFACT_DIR, 'child_pace_playtest_report.json'), JSON.stringify(result, null, 2));
    console.log('✅ Full child pacing report saved to child_pace_playtest_report.json');
  } finally {
    await browser.close();
  }
}

runChildPacePlaytest().catch(err => {
  console.error('❌ Child pace playtest failed:', err);
  process.exit(1);
});
