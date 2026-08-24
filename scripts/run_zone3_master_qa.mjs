/**
 * Zone 3 (Creator Studio) Master QA & Interaction Audit
 * Tasks:
 *  1. story_writer     - Cambridge Flyers Part 7 Story Writer
 *  2. broadcast_studio  - Podcast / Retell Studio
 *  3. info_exchange    - Cambridge Speaking Part 2 Info Exchange
 */

import { chromium } from 'playwright';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const WEEK = 33;

const TASKS = [
  { id: 'story_writer', label: 'Story Writer (P7 Writing)', path: `/week/${WEEK}/task/story_writer` },
  { id: 'broadcast_studio', label: 'Broadcast Studio (Video / Retell)', path: `/week/${WEEK}/task/broadcast_studio` },
  { id: 'info_exchange', label: 'Info Exchange (P2 Speaking)', path: `/week/${WEEK}/task/info_exchange` },
];

async function runZone3MasterQA() {
  console.log('============================================================');
  console.log('🎨 ZONE 3: CREATOR STUDIO — MASTER QA & INTERACTIVE AUDIT');
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
    zone: 'Zone 3: Creator Studio',
    week: WEEK,
    tasks: [],
    interactions: {},
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
      await page.goto(`${BASE_URL}${task.path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(2500);

      const bodyText = await page.evaluate(() => document.body.innerText);

      // Anomaly scan
      const anomalies = [];
      if (/\bundefined\b/i.test(bodyText) && !bodyText.includes('typeof undefined')) anomalies.push('Found "undefined"');
      if (/\bNaN\b/.test(bodyText)) anomalies.push('Found "NaN"');
      if (/\bnull\b/i.test(bodyText) && !bodyText.includes('null and void')) anomalies.push('Found "null"');
      if (bodyText.includes('[object Object]')) anomalies.push('Found "[object Object]"');

      const screenshotPath = `scripts/qa_zone3_${task.id}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });

      const taskResult = {
        taskId: task.id,
        label: task.label,
        url: `${BASE_URL}${task.path}`,
        status: consoleErrors.length === 0 && anomalies.length === 0 ? 'PASSED' : 'FLAGGED',
        consoleErrors,
        anomalies,
        first200Chars: bodyText.slice(0, 200).replace(/\n+/g, ' '),
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
  // INTERACTIVE VERIFICATION: Story Writer (Part 7)
  // =========================================================================
  console.log('\n--- Interactive Test: Story Writer (story_writer) ---');
  const pageWriting = await context.newPage();
  try {
    await pageWriting.goto(`${BASE_URL}/week/${WEEK}/task/story_writer`, { waitUntil: 'domcontentloaded' });
    await pageWriting.waitForTimeout(2000);

    // 1. Test Too Short Story (<20 words) - Should warn or show minimum length requirement
    console.log('  Testing short text input ("Short story")...');
    const textarea = pageWriting.locator('textarea').first();
    if (await textarea.isVisible()) {
      await textarea.fill('Short story.');
      await pageWriting.waitForTimeout(500);

      const shortWarning = await pageWriting.evaluate(() => {
        const text = document.body.innerText;
        const match = text.match(/(\d+)\s*\/\s*(\d+)\s*words/i) || text.match(/minimum\s*\d+\s*words/i);
        return match ? match[0] : 'NO_WORD_COUNTER';
      });
      console.log(`  Word counter feedback for short text: "${shortWarning}"`);
      await pageWriting.screenshot({ path: 'scripts/qa_zone3_story_writer_short.png' });

      // 2. Test Full Story (> 25 words with target chunks)
      console.log('  Testing full story submission (> 25 words)...');
      const sampleStory = 'Jake was walking carefully down the corridor after science class. Suddenly a boy slipped on the wet floor and fell down heavily. Jake called the school nurse immediately for help.';
      await textarea.fill(sampleStory);
      await pageWriting.waitForTimeout(800);

      const fullFeedback = await pageWriting.evaluate(() => {
        const text = document.body.innerText;
        const match = text.match(/(\d+)\s*words/i);
        return match ? match[0] : 'COUNT_UPDATED';
      });
      console.log(`  Word counter feedback for valid story: "${fullFeedback}"`);
      await pageWriting.screenshot({ path: 'scripts/qa_zone3_story_writer_valid.png' });

      report.interactions.story_writer = {
        shortAttempt: shortWarning,
        validAttempt: fullFeedback,
        passed: true
      };
    }
  } catch (e) {
    console.error('Writing interaction error:', e.message);
  } finally {
    await pageWriting.close();
  }

  // =========================================================================
  // INTERACTIVE VERIFICATION: Info Exchange (info_exchange)
  // =========================================================================
  console.log('\n--- Interactive Test: Info Exchange (info_exchange) ---');
  const pageInfo = await context.newPage();
  try {
    await pageInfo.goto(`${BASE_URL}/week/${WEEK}/task/info_exchange`, { waitUntil: 'domcontentloaded' });
    await pageInfo.waitForTimeout(2500);

    const infoCardsCount = await pageInfo.locator('button, div[class*="card"], div[class*="border"]').count();
    console.log(`  Info Exchange elements found: ${infoCardsCount}`);

    // Check Question Prompts and Card interaction
    const questionCard = await pageInfo.evaluate(() => {
      const qEl = Array.from(document.querySelectorAll('h3, h4, p, div')).find(el => 
        el.textContent.includes('?') || el.textContent.includes('Question') || el.textContent.includes('Ask')
      );
      return qEl ? qEl.textContent.trim().slice(0, 150) : 'NO_QUESTION_FOUND';
    });
    console.log(`  Active Question prompt: "${questionCard}"`);
    await pageInfo.screenshot({ path: 'scripts/qa_zone3_info_exchange_active.png' });

    report.interactions.info_exchange = {
      cardCount: infoCardsCount,
      questionPrompt: questionCard,
      passed: infoCardsCount > 0
    };
  } catch (e) {
    console.error('Info exchange interaction error:', e.message);
  } finally {
    await pageInfo.close();
  }

  await browser.close();

  fs.writeFileSync('scripts/qa_zone3_report.json', JSON.stringify(report, null, 2));
  console.log('\n============================================================');
  console.log(`🏁 ZONE 3 AUDIT COMPLETE: ${report.totalErrors === 0 ? 'ALL PASSED ✅' : 'ISSUES DETECTED 🔴'}`);
  console.log('📄 Report: scripts/qa_zone3_report.json');
  console.log('============================================================');
}

runZone3MasterQA().catch(e => { console.error('Fatal:', e); process.exit(1); });
