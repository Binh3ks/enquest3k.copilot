import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('docs/agent_artifacts/screenshots/round100');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const LIVE_WEEKS = [39, 41, 43, 45, 46];

async function captureProdProof() {
  console.log('========================================================================');
  console.log('🚀 CAPTURING PRODUCTION PROOF FROM HTTPS://APP.BKBACADEMY.VN');
  console.log('========================================================================\n');

  // 1. Fetch version.json from production
  const versionRes = await fetch('https://app.bkbacademy.vn/version.json');
  const versionData = await versionRes.json();
  console.log('Production Version Stamp:', versionData);

  const browser = await chromium.launch({
    headless: true,
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--no-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    permissions: ['microphone', 'camera']
  });

  const page = await context.newPage();

  // Setup bypass in localStorage for production domain
  await page.addInitScript(() => {
    localStorage.setItem('engquest-user-storage', JSON.stringify({
      state: {
        currentUser: { id: 'prod-tester-1', name: 'Tester', display_name: 'Tester', avatar: 'lion', role: 'owner' },
        token: 'test-token',
        learningMode: 'advanced',
        progressCache: {}
      },
      version: 2
    }));
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('engquest_onboarding_completed', 'true');
    localStorage.setItem('engquest_overlay_dismissed', 'true');
    localStorage.setItem('engquest3k_srs_daily_reviewed', new Date().toISOString().slice(0, 10));
    localStorage.setItem('srs_daily_reviewed', 'true');
  });

  const prodResults = [];

  for (const w of LIVE_WEEKS) {
    const url = `https://app.bkbacademy.vn/week/${w}/task/story_writer`;
    console.log(`▶ Inspecting ${url}...`);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      const domDump = await page.evaluate(() => {
        const ladder = document.querySelector('[data-testid="ladder-badge"]')?.textContent?.trim() || '';
        const sceneCounter = document.querySelector('.text-slate-700')?.textContent?.trim() || '';
        const hint = document.querySelector('.bg-indigo-50\\/90')?.textContent?.trim() || '';
        const headerInstruction = document.querySelector('.text-indigo-700')?.textContent?.trim() || '';
        const chips = Array.from(document.querySelectorAll('[data-testid="content-chip"]')).map(el => el.textContent.trim());
        const connectors = Array.from(document.querySelectorAll('[data-testid="connector-btn"]')).map(el => el.textContent.trim());
        const bodySnippet = document.body.innerText.slice(0, 400);
        const hasFallback = chips.some(c => c.includes('explored the trail') || c.includes('the main character'));

        return {
          ladder,
          sceneCounter,
          hint,
          headerInstruction,
          chips,
          connectors,
          hasFallback,
          bodySnippet
        };
      });

      const ssPath = path.join(SCREENSHOT_DIR, `prod_w${w}_story_writer_deployed.png`);
      await page.screenshot({ path: ssPath });

      prodResults.push({
        week: w,
        url,
        status: !domDump.hasFallback && domDump.chips.length > 0 ? 'PASS' : 'FAIL',
        headerInstruction: domDump.headerInstruction,
        sceneCounter: domDump.sceneCounter,
        ladder: domDump.ladder,
        chipsCount: domDump.chips.length,
        chips: domDump.chips,
        connectors: domDump.connectors,
        hasFallback: domDump.hasFallback,
        screenshot: ssPath,
        bodySnippet: domDump.bodySnippet
      });

      console.log(`  ✓ W${w} Status: ${!domDump.hasFallback ? '✅ PASS' : '❌ FAIL'}`);
      console.log(`    Header: "${domDump.headerInstruction}"`);
      console.log(`    Chips: [${domDump.chips.join(', ')}]`);
    } catch (err) {
      console.error(`  ❌ Error inspecting W${w}:`, err.message);
      prodResults.push({ week: w, url, status: 'ERROR', error: err.message });
    }
  }

  await browser.close();

  const report = {
    capturedAt: new Date().toISOString(),
    productionVersion: versionData,
    results: prodResults
  };

  const reportPath = path.resolve('docs/agent_artifacts/production_story_writer_proof.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n✅ Production proof complete! Report written to: ${reportPath}`);
}

captureProdProof().catch(err => {
  console.error(err);
  process.exit(1);
});
