/**
 * Day 2 (Knowledge Lab) Master QA & Interactive Audit Script
 */
import { chromium } from 'playwright';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const WEEK = 33;

const DAY2_TASKS = [
  { id: 'gear4_clil', label: 'Fact Finder (CLIL Science)', path: `/week/${WEEK}/task/gear4_clil` },
  { id: 'science_lab', label: 'Action Lab (Interactive Science)', path: `/week/${WEEK}/task/science_lab` },
  { id: 'science_report', label: 'Discovery Report (Science Report Creator)', path: `/week/${WEEK}/task/science_report` },
];

async function runDay2QA() {
  console.log('============================================================');
  console.log('🧪 DAY 2: KNOWLEDGE LAB — MASTER INTERACTIVE AUDIT (W33)');
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
    day: 'Day 2: Knowledge Lab',
    week: WEEK,
    tasks: [],
    totalErrors: 0,
  };

  for (const task of DAY2_TASKS) {
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

      const screenshotPath = `scripts/qa_day2_${task.id}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });

      const taskResult = {
        taskId: task.id,
        label: task.label,
        url: `${BASE_URL}${task.path}`,
        status: consoleErrors.length === 0 && anomalies.length === 0 ? 'PASSED' : 'FLAGGED',
        consoleErrors,
        anomalies,
        textSnippet: bodyText.slice(0, 300).replace(/\n+/g, ' '),
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
  // INTERACTIVE VERIFICATION: gear4_clil (Fact Finder question check)
  // =========================================================================
  console.log('\n--- Interactive Test: gear4_clil (Fact Finder) ---');
  const pageClil = await context.newPage();
  try {
    await pageClil.goto(`${BASE_URL}/week/${WEEK}/task/gear4_clil`, { waitUntil: 'domcontentloaded' });
    await pageClil.waitForTimeout(2500);

    const clilState = await pageClil.evaluate(() => {
      const text = document.body.innerText;
      const btns = Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim());
      return {
        btnsCount: btns.length,
        title: text.slice(0, 200).replace(/\n+/g, ' ')
      };
    });
    console.log(`  CLIL State: Buttons=${clilState.btnsCount}, Title="${clilState.title.slice(0, 80)}..."`);
    await pageClil.screenshot({ path: 'scripts/qa_day2_gear4_clil_interactive.png' });
  } finally {
    await pageClil.close();
  }

  // =========================================================================
  // INTERACTIVE VERIFICATION: science_lab (Action Lab)
  // =========================================================================
  console.log('\n--- Interactive Test: science_lab (Action Lab) ---');
  const pageLab = await context.newPage();
  try {
    await pageLab.goto(`${BASE_URL}/week/${WEEK}/task/science_lab`, { waitUntil: 'domcontentloaded' });
    await pageLab.waitForTimeout(2500);

    const labState = await pageLab.evaluate(() => {
      const text = document.body.innerText;
      const interactiveButtons = Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim());
      return {
        textSnippet: text.slice(0, 250).replace(/\n+/g, ' '),
        buttonsCount: interactiveButtons.length,
        buttons: interactiveButtons.slice(0, 5)
      };
    });
    console.log(`  Action Lab State: Buttons=${labState.buttonsCount}, Snippet="${labState.textSnippet.slice(0, 80)}..."`);
    await pageLab.screenshot({ path: 'scripts/qa_day2_science_lab_interactive.png' });
  } finally {
    await pageLab.close();
  }

  // =========================================================================
  // INTERACTIVE VERIFICATION: science_report (Discovery Report Scaffold)
  // =========================================================================
  console.log('\n--- Interactive Test: science_report (Discovery Report) ---');
  const pageReport = await context.newPage();
  try {
    await pageReport.goto(`${BASE_URL}/week/${WEEK}/task/science_report`, { waitUntil: 'domcontentloaded' });
    await pageReport.waitForTimeout(2500);

    const reportState = await pageReport.evaluate(() => {
      const text = document.body.innerText;
      const pills = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('+')).map(b => b.textContent.trim());
      const hasTextarea = !!document.querySelector('textarea, input[type="text"]');
      return {
        hasTextarea,
        pillsCount: pills.length,
        samplePills: pills.slice(0, 4),
        snippet: text.slice(0, 250).replace(/\n+/g, ' ')
      };
    });
    console.log(`  Science Report State: Textarea=${reportState.hasTextarea}, Pills=${reportState.pillsCount}`);
    await pageReport.screenshot({ path: 'scripts/qa_day2_science_report_interactive.png' });
  } finally {
    await pageReport.close();
  }

  await browser.close();

  fs.writeFileSync('scripts/qa_day2_report.json', JSON.stringify(report, null, 2));
  console.log('\n============================================================');
  console.log(`🏁 DAY 2 AUDIT COMPLETE: ${report.totalErrors === 0 ? 'ALL PASSED ✅' : 'ISSUES DETECTED 🔴'}`);
  console.log('📄 Report: scripts/qa_day2_report.json');
  console.log('============================================================');
}

runDay2QA().catch(e => { console.error('Fatal:', e); process.exit(1); });
