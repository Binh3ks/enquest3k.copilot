import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173';
const ARTIFACT_DIR = path.resolve('docs/agent_artifacts/f5d2_titan_playtest');

async function runPhuongAnB() {
  console.log('🎮 [PHƯƠNG ÁN B] Starting Headful Real Chrome Playtest for F5D2...');
  
  const browser = await puppeteer.launch({
    headless: false, // PHƯƠNG ÁN B: Real Headful Chrome
    defaultViewport: { width: 1280, height: 800 },
    args: ['--no-sandbox', '--window-size=1280,850']
  });

  const roundMetrics = [];
  let gameStartTime = 0;
  let gameEndTime = 0;
  let finalTimeLeftSec = 0;

  try {
    const page = await browser.newPage();

    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('[TITAN-FORGE')) {
        console.log('  [BROWSER-LOG]', text);
      }
    });

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
    console.log(`Game started. Initial HUD timeLeft: ${initialTimeLeft}s (Expected: 100s)`);

    // Screenshot 1: Spawn
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'f5d2_b_01_spawn.png') });

    // Round-by-round real play with keyboard dispatch
    for (let r = 1; r <= 4; r++) {
      const rStart = Date.now();
      const currentRoundTimeLeft = await parseHUDTime();

      const stem = await page.$eval('.titan-stem-text', el => el.textContent.trim());
      console.log(`\n▶ [ROUND ${r}/4] timeLeft on HUD: ${currentRoundTimeLeft}s | stem: "${stem}"`);

      // Find correct gear and position Leo
      const cogInfo = await page.evaluate(() => {
        const correctEl = document.querySelector('.titan-gear-entity[data-is-correct="true"]');
        if (!correctEl) return null;
        const left = parseFloat(correctEl.style.left);
        const top = parseFloat(correctEl.style.top);
        if (window.__setTitanLeo) {
          window.__setTitanLeo(left + 15, top - 4);
        }
        return {
          text: correctEl.querySelector('.titan-clause-plaque span')?.textContent,
          x: left,
          y: top
        };
      });

      console.log(`  Targeting Cog: "${cogInfo.text}" at (${cogInfo.x}, ${cogInfo.y})`);

      // Real keyboard dispatch
      await page.keyboard.press('KeyE');
      await new Promise(r => setTimeout(r, 500));

      if (r === 3) {
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'f5d2_b_03_r3_patched.png') });
      }

      // Wait for feedback transition (1600ms)
      await new Promise(r => setTimeout(r, 1800));

      const rEnd = Date.now();
      const rDuration = +((rEnd - rStart) / 1000).toFixed(2);
      roundMetrics.push({
        round: r,
        stem,
        correctText: cogInfo.text,
        hudTimeLeft: currentRoundTimeLeft,
        durationSec: rDuration
      });
    }

    gameEndTime = Date.now();
    await new Promise(r => setTimeout(r, 1000));

    finalTimeLeftSec = await parseHUDTime();

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'f5d2_b_04_cleared.png') });

    const totalElapsedSec = +((gameEndTime - gameStartTime) / 1000).toFixed(2);
    const actualTimeExpended = 100 - finalTimeLeftSec;
    console.log('\n============================================================');
    console.log('📊 [PHƯƠNG ÁN B MEASUREMENT REPORT]');
    console.log(`  Total Real Time Elapsed : ${totalElapsedSec}s`);
    console.log(`  Initial HUD timeLeft    : ${initialTimeLeft}s`);
    console.log(`  Final HUD timeLeft      : ${finalTimeLeftSec}s (Out of 100s)`);
    console.log(`  Actual Time Expended    : ${actualTimeExpended}s`);
    console.log(`  Margin Remaining        : +${finalTimeLeftSec}s`);
    console.log('============================================================');

    const result = {
      method: 'Phuong An B (Headful Chrome)',
      totalElapsedSec,
      initialTimeLeft,
      finalTimeLeftSec,
      actualTimeExpended,
      roundMetrics,
      timestamp: new Date().toISOString()
    };

    fs.writeFileSync(path.join(ARTIFACT_DIR, 'phuong_an_b_result.json'), JSON.stringify(result, null, 2));
    console.log('✅ Result saved to phuong_an_b_result.json');
  } finally {
    await browser.close();
  }
}

runPhuongAnB().catch(err => {
  console.error('❌ Playtest failed:', err);
  process.exit(1);
});
