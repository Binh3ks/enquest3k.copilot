/**
 * Zone 2 Deep Gameplay QA Script
 * Tests clicking "START" inside each battle game to inspect actual game state and questions
 */

import { chromium } from 'playwright';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const WEEK = 33;

const TASKS = [
  { id: 'word_blitz', label: 'Speed Match (FlashArena)', path: `/week/${WEEK}/task/word_blitz` },
  { id: 'sentence_smash', label: 'Grammar Duel (SentenceBuilderBattle)', path: `/week/${WEEK}/task/sentence_smash` },
  { id: 'math_quest', label: 'Math Quest (BarModelQuest)', path: `/week/${WEEK}/task/math_quest` },
];

async function runDeepZone2QA() {
  console.log('============================================================');
  console.log('🎮 ZONE 2: DEEP GAMEPLAY QA (CLICKING START TO ENTER GAME)');
  console.log('============================================================');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 412, height: 915 },
    isMobile: true,
  });

  await context.addInitScript(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');
  });

  const deepReport = {
    timestamp: new Date().toISOString(),
    results: [],
  };

  for (const task of TASKS) {
    console.log(`\n▶️ Entering: ${task.label}`);
    const page = await context.newPage();
    const consoleErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => consoleErrors.push(err.message || String(err)));

    try {
      await page.goto(`${BASE_URL}${task.path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(2000);

      // Click START button
      const startBtn = await page.locator('button:has-text("START")');
      if (await startBtn.isVisible()) {
        await startBtn.click();
        await page.waitForTimeout(2000); // Wait for game board animation
      }

      const bodyText = await page.evaluate(() => document.body.innerText);

      // Anomaly scan in gameplay
      const anomalies = [];
      if (/\bundefined\b/i.test(bodyText)) anomalies.push('Found undefined in active gameplay');
      if (/\bNaN\b/.test(bodyText)) anomalies.push('Found NaN in active gameplay');
      if (/\bnull\b/i.test(bodyText)) anomalies.push('Found null in active gameplay');
      if (bodyText.includes('[object Object]')) anomalies.push('Found [object Object] in active gameplay');

      // Check SVG bar model presence for math_quest
      let svgCount = 0;
      if (task.id === 'math_quest') {
        svgCount = await page.locator('svg').count();
      }

      const screenshotPath = `scripts/qa_zone2_${task.id}_active.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });

      const item = {
        taskId: task.id,
        label: task.label,
        status: consoleErrors.length === 0 && anomalies.length === 0 ? 'PASSED' : 'FLAGGED',
        svgCount,
        consoleErrors,
        anomalies,
        snippet: bodyText.slice(0, 300).replace(/\n+/g, ' '),
        screenshot: screenshotPath,
      };

      deepReport.results.push(item);
      console.log(`  Status: ${item.status}`);
      console.log(`  Console Errors: ${consoleErrors.length}`);
      console.log(`  Anomalies: ${anomalies.length}`);
      if (task.id === 'math_quest') console.log(`  SVG count: ${svgCount}`);
      console.log(`  📸 Screenshot: ${screenshotPath}`);

    } catch (e) {
      console.error(`  ❌ Error: ${e.message}`);
      deepReport.results.push({ taskId: task.id, status: 'FAILED', error: e.message });
    } finally {
      await page.close();
    }
  }

  await browser.close();
  fs.writeFileSync('scripts/qa_zone2_deep_report.json', JSON.stringify(deepReport, null, 2));
  console.log('\n✅ Deep Gameplay Report saved: scripts/qa_zone2_deep_report.json');
}

runDeepZone2QA().catch(e => { console.error('Fatal:', e); process.exit(1); });
