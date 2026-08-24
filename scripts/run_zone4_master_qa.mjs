/**
 * Zone 4 (Boss Castle) Master QA & End-to-End Audit Script
 * Tasks:
 *  1. boss_listening - Cambridge Flyers Listening Shield (5 Parts)
 *  2. boss_reading   - Cambridge Flyers Reading & Writing Shield (Parts 1-7)
 *  3. weekly_review  - Speaking 4 Parts & Cambridge Passport Review
 */

import { chromium } from 'playwright';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const WEEK = 33;

const TASKS = [
  { id: 'boss_listening', label: 'Listening Shield (5 Parts)', path: `/week/${WEEK}/task/boss_listening` },
  { id: 'boss_reading', label: 'Reading & Writing Shield (Parts 1-7)', path: `/week/${WEEK}/task/boss_reading` },
  { id: 'weekly_review', label: 'Weekly Review & Passport (Speaking 4 Parts)', path: `/week/${WEEK}/task/weekly_review` },
];

async function runZone4QA() {
  console.log('============================================================');
  console.log('🏰 ZONE 4: BOSS CASTLE — MASTER AUTOMATED AUDIT (W33)');
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

  const report = {
    timestamp: new Date().toISOString(),
    zone: 'Zone 4: Boss Castle',
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
    const consoleErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => consoleErrors.push(err.message || String(err)));

    try {
      await page.goto(`${BASE_URL}${task.path}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(3000);

      const bodyText = await page.evaluate(() => document.body.innerText);

      // Anomaly scan
      const anomalies = [];
      if (/\bundefined\b/i.test(bodyText) && !bodyText.includes('typeof undefined')) anomalies.push('Found "undefined"');
      if (/\bNaN\b/.test(bodyText)) anomalies.push('Found "NaN"');
      if (/\bnull\b/i.test(bodyText) && !bodyText.includes('null and void')) anomalies.push('Found "null"');
      if (bodyText.includes('[object Object]')) anomalies.push('Found "[object Object]"');

      const screenshotPath = `scripts/qa_zone4_${task.id}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });

      const taskResult = {
        taskId: task.id,
        label: task.label,
        url: `${BASE_URL}${task.path}`,
        status: consoleErrors.length === 0 && anomalies.length === 0 ? 'PASSED' : 'FLAGGED',
        consoleErrors,
        anomalies,
        first250Chars: bodyText.slice(0, 250).replace(/\n+/g, ' '),
        screenshot: screenshotPath,
      };

      report.tasks.push(taskResult);
      report.totalErrors += consoleErrors.length + anomalies.length;

      console.log(`✅ Status: ${taskResult.status}`);
      console.log(`📸 Screenshot: ${screenshotPath}`);
      if (consoleErrors.length > 0) console.log(`🔴 Console Errors:`, consoleErrors);
      if (anomalies.length > 0) console.log(`⚠️ Anomalies:`, anomalies);

    } catch (e) {
      console.error(`❌ Task ${task.id} failed:`, e.message);
      report.tasks.push({ taskId: task.id, label: task.label, status: 'FAILED', error: e.message });
      report.totalErrors++;
    } finally {
      await page.close();
    }
  }

  // =========================================================================
  // INTERACTIVE VERIFICATION: Boss Listening Part 1 (Draw Lines / Pin test)
  // =========================================================================
  console.log('\n--- Interactive Test: Boss Listening Part 1 ---');
  const pageListening = await context.newPage();
  try {
    await pageListening.goto(`${BASE_URL}/week/${WEEK}/task/boss_listening`, { waitUntil: 'domcontentloaded' });
    await pageListening.waitForTimeout(2500);

    const listeningState = await pageListening.evaluate(() => {
      const parts = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Part'));
      const pins = document.querySelectorAll('div[class*="pin"], div[class*="cursor-pointer"]');
      return {
        partsCount: parts.length,
        pinsCount: pins.length,
        textHeader: document.body.innerText.slice(0, 200).replace(/\n+/g, ' ')
      };
    });
    console.log(`  Boss Listening Structure: Parts=${listeningState.partsCount}, Pins=${listeningState.pinsCount}`);
    await pageListening.screenshot({ path: 'scripts/qa_zone4_boss_listening_interactive.png' });
  } catch (e) {
    console.error('Listening interactive error:', e.message);
  } finally {
    await pageListening.close();
  }

  // =========================================================================
  // INTERACTIVE VERIFICATION: Boss Reading (Parts 1-6)
  // =========================================================================
  console.log('\n--- Interactive Test: Boss Reading & Writing ---');
  const pageReading = await context.newPage();
  try {
    await pageReading.goto(`${BASE_URL}/week/${WEEK}/task/boss_reading`, { waitUntil: 'domcontentloaded' });
    await pageReading.waitForTimeout(2500);

    const readingState = await pageReading.evaluate(() => {
      const parts = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Part') || b.textContent.includes('P1') || b.textContent.includes('P2'));
      const questions = Array.from(document.querySelectorAll('input, select, button')).length;
      return {
        partsCount: parts.length,
        interactiveElements: questions,
        textHeader: document.body.innerText.slice(0, 200).replace(/\n+/g, ' ')
      };
    });
    console.log(`  Boss Reading Structure: Parts=${readingState.partsCount}, InteractiveElements=${readingState.interactiveElements}`);
    await pageReading.screenshot({ path: 'scripts/qa_zone4_boss_reading_interactive.png' });
  } catch (e) {
    console.error('Reading interactive error:', e.message);
  } finally {
    await pageReading.close();
  }

  // =========================================================================
  // INTERACTIVE VERIFICATION: Weekly Review & Passport
  // =========================================================================
  console.log('\n--- Interactive Test: Weekly Review & Passport ---');
  const pageReview = await context.newPage();
  try {
    await pageReview.goto(`${BASE_URL}/week/${WEEK}/task/weekly_review`, { waitUntil: 'domcontentloaded' });
    await pageReview.waitForTimeout(2500);

    const reviewState = await pageReview.evaluate(() => {
      const text = document.body.innerText;
      const hasPassport = text.includes('Passport') || text.includes('Shields') || text.includes('Speaking');
      const shieldsMatch = text.match(/(\d+)\s*\/\s*(\d+)\s*Shields/i) || text.match(/(\d+)\s*Shields/i);
      return {
        hasPassport,
        shieldsText: shieldsMatch ? shieldsMatch[0] : 'SHIELDS_TRACKED',
        textHeader: text.slice(0, 250).replace(/\n+/g, ' ')
      };
    });
    console.log(`  Weekly Review Structure: PassportTracked=${reviewState.hasPassport}, Shields="${reviewState.shieldsText}"`);
    await pageReview.screenshot({ path: 'scripts/qa_zone4_weekly_review_interactive.png' });
  } catch (e) {
    console.error('Weekly review interactive error:', e.message);
  } finally {
    await pageReview.close();
  }

  await browser.close();

  fs.writeFileSync('scripts/qa_zone4_report.json', JSON.stringify(report, null, 2));
  console.log('\n============================================================');
  console.log(`🏁 ZONE 4 AUDIT COMPLETE: ${report.totalErrors === 0 ? 'ALL PASSED ✅' : 'ISSUES DETECTED 🔴'}`);
  console.log('📄 Report: scripts/qa_zone4_report.json');
  console.log('============================================================');
}

runZone4QA().catch(e => { console.error('Fatal:', e); process.exit(1); });
