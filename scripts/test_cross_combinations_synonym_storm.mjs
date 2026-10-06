import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve('docs/agent_artifacts/screenshots');

async function testW33Success() {
  console.log('\n======================================================');
  console.log('>>> TESTING COMBO 1: W33 SUCCESS (DEFLECT SYNONYM) <<<');
  console.log('======================================================');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 750 });
    await page.goto(`${BASE_URL}/week/33/chronicles?room=5&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    const doorBtns = await page.$$('.dr-door-enter-btn');
    if (!doorBtns || doorBtns.length === 0) throw new Error('No door buttons found');
    await doorBtns[0].click();
    await new Promise(r => setTimeout(r, 1200));

    // Intercept target synonym
    const result = await page.evaluate(async () => {
      let deflectedEvent = null;
      const startTime = Date.now();

      while (Date.now() - startTime < 12000) {
        const meteors = window.__SYNONYM_STORM_TEST_HOOK__?.getCurrentMeteors() || [];
        const targetMeteor = meteors.find(m => m.isTarget && m.y > 100);

        if (targetMeteor) {
          window.__SYNONYM_STORM_TEST_HOOK__.setLeoX(targetMeteor.x + 15);
        }

        const logs = window.__SYNONYM_STORM_EVENT_LOG__ || [];
        const found = logs.find(l => l.type === 'correct');
        if (found) {
          deflectedEvent = found;
          break;
        }
        await new Promise(r => setTimeout(r, 40));
      }

      await new Promise(r => setTimeout(r, 200));

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

    console.log('[W33 SUCCESS RESULTS]:');
    console.log('  - Event:', JSON.stringify(result.deflectedEvent));
    console.log(`  - Battery: ${result.batteryPct}`);
    console.log(`  - Score: ${result.scoreText}`);
    console.log(`  - Feedback: "${result.feedbackToast}"`);
    console.log(`  - Round: ${result.roundChip}`);

    const picPath = path.join(OUTPUT_DIR, 'w33_success_deflect_live.png');
    await page.screenshot({ path: picPath });
    console.log(`Screenshot saved to: ${picPath}`);
    return result;
  } finally {
    await browser.close();
  }
}

async function testW35Hazard() {
  console.log('\n======================================================');
  console.log('>>> TESTING COMBO 2: W35 HAZARD (COLLIDE ANTYONYM) <<<');
  console.log('======================================================');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 750 });
    await page.goto(`${BASE_URL}/week/35/chronicles?room=5&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    const doorBtns = await page.$$('.dr-door-enter-btn');
    if (!doorBtns || doorBtns.length === 0) throw new Error('No door buttons found');
    await doorBtns[0].click();
    await new Promise(r => setTimeout(r, 1200));

    // Intercept hazard/antonym meteor
    const result = await page.evaluate(async () => {
      let hazardEvent = null;
      const startTime = Date.now();

      while (Date.now() - startTime < 12000) {
        const meteors = window.__SYNONYM_STORM_TEST_HOOK__?.getCurrentMeteors() || [];
        const hazardMeteor = meteors.find(m => !m.isTarget && m.y > 100);

        if (hazardMeteor) {
          window.__SYNONYM_STORM_TEST_HOOK__.setLeoX(hazardMeteor.x + 15);
        }

        const logs = window.__SYNONYM_STORM_EVENT_LOG__ || [];
        const found = logs.find(l => l.type === 'wrong');
        if (found) {
          hazardEvent = found;
          break;
        }
        await new Promise(r => setTimeout(r, 40));
      }

      await new Promise(r => setTimeout(r, 200));

      const heartsCount = document.querySelectorAll('.hud-hearts .heart-icon, .hud-hearts svg').length;
      const feedbackToast = document.querySelector('.synonym-feedback-toast')?.innerText?.trim() || '';
      const roundChip = document.querySelector('.synonym-round-chip')?.innerText?.trim() || '';

      return {
        hazardEvent,
        heartsCount,
        feedbackToast,
        roundChip,
        totalLogs: window.__SYNONYM_STORM_EVENT_LOG__ || [],
      };
    });

    console.log('[W35 HAZARD RESULTS]:');
    console.log('  - Event:', JSON.stringify(result.hazardEvent));
    console.log(`  - Remaining Hearts UI count: ${result.heartsCount}`);
    console.log(`  - Feedback: "${result.feedbackToast}"`);
    console.log(`  - Round: ${result.roundChip}`);

    const picPath = path.join(OUTPUT_DIR, 'w35_hazard_collide_live.png');
    await page.screenshot({ path: picPath });
    console.log(`Screenshot saved to: ${picPath}`);
    return result;
  } finally {
    await browser.close();
  }
}

async function main() {
  const r1 = await testW33Success();
  const r2 = await testW35Hazard();
  console.log('\n>>> COMPLETED 2 MISSING COMBINATIONS TEST <<<');
}

main().catch(console.error);
