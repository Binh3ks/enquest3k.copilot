import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

async function runDeflectionForWeek(weekNumber, prefix) {
  console.log(`\n>>> TESTING LIVE DEFLECTION OF SYNONYM METEOR ON W${weekNumber} <<<`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 750 });

    await page.goto(`${BASE_URL}/week/${weekNumber}/chronicles?room=5&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    const doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[0].click();
    await new Promise(r => setTimeout(r, 1200));

    console.log(`Chamber entered for W${weekNumber}. Intercepting target synonym with Leo's Aegis Shield...`);

    const result = await page.evaluate(async () => {
      let deflectedEvent = null;
      const startTime = Date.now();

      while (Date.now() - startTime < 12000) {
        const meteors = window.__SYNONYM_STORM_TEST_HOOK__?.getCurrentMeteors() || [];
        const targetMeteor = meteors.find(m => m.isTarget && m.y > 140);

        if (targetMeteor) {
          window.__SYNONYM_STORM_TEST_HOOK__.setLeoX(targetMeteor.x + 15);
        }

        const logs = window.__SYNONYM_STORM_EVENT_LOG__ || [];
        if (logs.length > 0) {
          deflectedEvent = logs[0];
          break;
        }

        await new Promise(r => setTimeout(r, 60));
      }

      const batteryPct = document.querySelector('.battery-pct')?.innerText?.trim() || '';
      const scoreText = document.querySelector('.hud-score')?.innerText?.trim() || '';
      const feedbackToast = document.querySelector('.synonym-feedback-toast')?.innerText?.trim() || '';
      const roundChip = document.querySelector('.synonym-round-chip')?.innerText?.trim() || '';

      return {
        deflectedEvent,
        batteryPct,
        scoreText,
        feedbackToast,
        roundChip,
        totalLogs: window.__SYNONYM_STORM_EVENT_LOG__ || [],
      };
    });

    console.log(`\n[Live Deflection Results W${weekNumber}]:`);
    console.log('  - Deflected Event:', result.deflectedEvent);
    console.log(`  - Battery Gauge: ${result.batteryPct}`);
    console.log(`  - HUD Score: ${result.scoreText}`);
    console.log(`  - Feedback Toast: "${result.feedbackToast}"`);
    console.log(`  - Current Round: ${result.roundChip}`);

    const picPath = path.join(OUTPUT_DIR, `${prefix}_deflected_live.png`);
    await page.screenshot({ path: picPath });
    fs.copyFileSync(picPath, path.join(BRAIN_DIR, `${prefix}_deflected_live.png`));
    console.log(`Live deflection screenshot saved to: ${picPath}`);

  } finally {
    await browser.close();
  }
}

async function testDeflection() {
  await runDeflectionForWeek(33, 'w33_synonym_storm');
  await runDeflectionForWeek(35, 'w35_synonym_storm');
}

testDeflection();
