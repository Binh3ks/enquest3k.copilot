/**
 * Zone 2 (Battle Arena) Master QA Script
 * Tasks:
 *  1. word_blitz     - Speed Match (FlashArena)
 *  2. sentence_smash - Grammar Duel (SentenceBuilderBattle)
 *  3. math_quest     - Math Quest (BarModelQuest)
 *
 * Checks:
 *  - Route loading & render status
 *  - Console errors / warnings
 *  - DOM text anomalies (NaN, undefined, null, [object Object])
 *  - Full page screenshot on physical device screen / Chromium viewport
 */

import { chromium } from 'playwright';
import { execSync } from 'child_process';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const WEEK = 33;

const TASKS = [
  { id: 'word_blitz', label: 'Speed Match (FlashArena)', path: `/week/${WEEK}/task/word_blitz` },
  { id: 'sentence_smash', label: 'Grammar Duel (SentenceBuilderBattle)', path: `/week/${WEEK}/task/sentence_smash` },
  { id: 'math_quest', label: 'Math Quest (BarModelQuest)', path: `/week/${WEEK}/task/math_quest` },
];

async function runZone2QA() {
  console.log('============================================================');
  console.log('⚔️ ZONE 2: BATTLE ARENA — MASTER AUTOMATED AUDIT (W33)');
  console.log('============================================================');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 412, height: 915 }, // Pixel/S23 mobile view
    isMobile: true,
  });

  // Bypass onboarding & gatekeeper modals for test environment
  await context.addInitScript(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');
  });

  const report = {
    timestamp: new Date().toISOString(),
    zone: 'Zone 2: Battle Arena',
    week: WEEK,
    tasks: [],
    totalErrors: 0,
  };

  for (const task of TASKS) {
    console.log(`\n------------------------------------------------------------`);
    console.log(`🔍 Testing: ${task.label} (${task.id})`);
    console.log(`🌐 URL: ${BASE_URL}${task.path}`);
    console.log(`------------------------------------------------------------`);

    const page = await context.newPage();
    const consoleLogs = [];
    const consoleErrors = [];

    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      consoleLogs.push({ type, text });
      if (type === 'error') {
        consoleErrors.push(text);
      }
    });

    page.on('pageerror', err => {
      consoleErrors.push(err.message || String(err));
    });

    try {
      await page.goto(`${BASE_URL}${task.path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(3000); // Allow react state & animations to stabilize

      // 1. Text anomaly scan
      const bodyText = await page.evaluate(() => document.body.innerText);
      
      const anomalies = [];
      // Regex check for standalone undefined, null, NaN, [object Object]
      if (/\bundefined\b/i.test(bodyText) && !bodyText.includes('typeof undefined')) {
        anomalies.push('Found "undefined" text on page');
      }
      if (/\bNaN\b/.test(bodyText)) {
        anomalies.push('Found "NaN" text on page');
      }
      if (/\bnull\b/i.test(bodyText) && !bodyText.includes('null and void')) {
        anomalies.push('Found "null" text on page');
      }
      if (bodyText.includes('[object Object]')) {
        anomalies.push('Found "[object Object]" rendered on page');
      }

      // 2. Extract Key UI text & components
      const uiSummary = await page.evaluate(() => {
        const title = document.querySelector('h1, h2, h3')?.textContent?.trim() || 'NO_TITLE';
        const buttons = Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim().slice(0, 40));
        return {
          title,
          buttonCount: buttons.length,
          sampleButtons: buttons.slice(0, 8),
          first200Chars: document.body.innerText.slice(0, 200).replace(/\n+/g, ' '),
        };
      });

      // 3. Screenshot
      const screenshotPath = `scripts/qa_zone2_${task.id}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });

      const taskResult = {
        taskId: task.id,
        label: task.label,
        url: `${BASE_URL}${task.path}`,
        status: consoleErrors.length === 0 && anomalies.length === 0 ? 'PASSED' : 'FLAGGED',
        consoleErrors,
        anomalies,
        uiSummary,
        screenshot: screenshotPath,
      };

      report.tasks.push(taskResult);
      report.totalErrors += consoleErrors.length + anomalies.length;

      console.log(`✅ Status: ${taskResult.status}`);
      console.log(`📊 UI Title: "${uiSummary.title}" | Buttons: ${uiSummary.buttonCount}`);
      console.log(`📸 Screenshot: ${screenshotPath}`);
      if (consoleErrors.length > 0) console.log(`🔴 Console Errors:`, consoleErrors);
      if (anomalies.length > 0) console.log(`⚠️ Anomalies:`, anomalies);

    } catch (e) {
      console.error(`❌ Task ${task.id} failed to execute:`, e.message);
      report.tasks.push({
        taskId: task.id,
        label: task.label,
        status: 'FAILED',
        error: e.message,
      });
      report.totalErrors++;
    } finally {
      await page.close();
    }
  }

  await browser.close();

  fs.writeFileSync('scripts/qa_zone2_report.json', JSON.stringify(report, null, 2));
  console.log('\n============================================================');
  console.log(`🏁 ZONE 2 AUDIT COMPLETE: ${report.totalErrors === 0 ? 'ALL PASSED ✅' : 'ISSUES DETECTED 🔴'}`);
  console.log('📄 Report: scripts/qa_zone2_report.json');
  console.log('============================================================');
}

runZone2QA().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
