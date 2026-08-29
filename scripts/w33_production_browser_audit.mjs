/**
 * scripts/w33_production_browser_audit.mjs
 * 
 * Deep Production Browser Inspection & Visual QA Tool for W33
 * Runs real Google Chrome to audit all 5 Days, 15 Tasks, Navigation,
 * Console errors, Network timings, Images, SRS / Word Bank, Weekly Review, Co-op,
 * and Scene 4 visual layout.
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5173';
const SCREENSHOT_DIR = path.resolve('artifacts/audit_screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runAudit() {
  console.log('========================================================================');
  console.log('🔍 ENGQUEST3K — W33 PRODUCTION BROWSER QA & VISUAL AUDIT HARNESS');
  console.log('========================================================================\n');

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });

  const page = await context.newPage();

  const consoleLogs = [];
  const networkErrors = [];
  const networkRequests = [];

  page.on('console', msg => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
  });

  page.on('requestfailed', req => {
    networkErrors.push({ url: req.url(), failure: req.failure()?.errorText });
  });

  page.on('request', req => {
    networkRequests.push({ url: req.url(), resourceType: req.resourceType() });
  });

  const auditReport = {
    timings: {},
    routesChecked: [],
    findings: [],
    sceneVisuals: {},
    wordBankStatus: {},
    weeklyReviewStatus: {},
    coopBoardStatus: {},
    voiceShadowLabels: {},
    consoleLogs: [],
    networkErrors: []
  };

  // 1. Initial Load & Route Audit
  const t0 = Date.now();
  await page.goto(`${BASE_URL}/#/week/33`, { waitUntil: 'domcontentloaded' });
  const tLoad = Date.now() - t0;
  auditReport.timings.initialLoadMs = tLoad;
  await page.waitForTimeout(3000);

  // Take screenshot of Quest Map
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_quest_map.png') });
  console.log(`[QuestMap] Loaded in ${tLoad}ms. Screenshot captured.`);

  // 2. Check /bank route directly
  console.log('\n--- Checking /bank route ---');
  await page.goto(`${BASE_URL}/#/bank`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  const bankBodyText = await page.evaluate(() => document.body.innerText);
  const bankUrl = page.url();
  auditReport.wordBankStatus.bankRouteDirect = {
    url: bankUrl,
    hasNoRouteMatch: bankBodyText.includes('No routes matched location') || bankBodyText.includes('404'),
    bodySnippet: bankBodyText.slice(0, 200)
  };
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_bank_route.png') });
  console.log('Bank route result:', auditReport.wordBankStatus.bankRouteDirect);

  // Return to W33
  await page.goto(`${BASE_URL}/#/week/33`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // 3. Inspect Scene Explorer / gear1_webtoon (Scene 1 to 5)
  console.log('\n--- Inspecting Scene Explorer (gear1_webtoon) & Scene 4 ---');
  // Navigate to Day 1 / Task 1
  try {
    const taskButton = await page.$('button:has-text("Scene Explorer"), button:has-text("Webtoon"), [data-task="gear1_webtoon"], [data-quest="gear1_webtoon"]');
    if (taskButton) {
      await taskButton.click();
    } else {
      // Direct navigation if available
      await page.goto(`${BASE_URL}/#/week/33/task/gear1_webtoon`, { waitUntil: 'domcontentloaded' });
    }
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_scene_explorer_p1.png') });

    // Step through scenes
    for (let sceneIdx = 1; sceneIdx <= 5; sceneIdx++) {
      const sceneData = await page.evaluate((idx) => {
        const img = document.querySelector('img[src*="scene"], img[src*="story"], img[src*="webtoon"], .story-scene img, .webtoon-container img');
        const textEl = document.querySelector('.story-text, .scene-text, p, h3');
        return {
          imgSrc: img?.src || null,
          imgNaturalWidth: img?.naturalWidth || 0,
          imgNaturalHeight: img?.naturalHeight || 0,
          imgClientWidth: img?.clientWidth || 0,
          imgClientHeight: img?.clientHeight || 0,
          objectFit: img ? window.getComputedStyle(img).objectFit : null,
          containerOverflow: img?.parentElement ? window.getComputedStyle(img.parentElement).overflow : null,
          sceneText: textEl?.innerText || ''
        };
      }, sceneIdx);

      auditReport.sceneVisuals[`scene_${sceneIdx}`] = sceneData;
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `03_scene_${sceneIdx}.png`) });

      // Click Next Scene
      const nextBtn = await page.$('button:has-text("Next"), button:has-text("Tiếp tục"), button[aria-label="Next"]');
      if (nextBtn) await nextBtn.click();
      await page.waitForTimeout(1000);
    }
  } catch (err) {
    console.error('Scene Explorer inspection error:', err.message);
  }

  // 4. Inspect Voice Shadow (gear2_karaoke) for "L1" labels
  console.log('\n--- Inspecting Voice Shadow (gear2_karaoke) for "L1" labels ---');
  try {
    await page.goto(`${BASE_URL}/#/week/33/task/gear2_karaoke`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_voice_shadow.png') });

    const shadowLabels = await page.evaluate(() => {
      const allText = document.body.innerText;
      const navButtons = Array.from(document.querySelectorAll('button, span, div, a')).map(el => el.innerText.trim()).filter(t => t.length > 0 && t.length < 30);
      const lMatches = navButtons.filter(t => /\bL[1-5]\b|\bLevel\s*1\b|\bLesson\s*1\b/i.test(t));
      return {
        lMatches,
        navButtonsSample: navButtons.slice(0, 30),
        rawTextHasL1: /\bL1\b/.test(allText)
      };
    });
    auditReport.voiceShadowLabels = shadowLabels;
    console.log('Voice Shadow L1 inspection:', shadowLabels);
  } catch (err) {
    console.error('Voice shadow error:', err.message);
  }

  // 5. Inspect Weekly Review & Passport (Day 5 Task 3 / weekly_review)
  console.log('\n--- Inspecting Weekly Review & Passport (weekly_review) ---');
  try {
    await page.goto(`${BASE_URL}/#/week/33/task/weekly_review`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_weekly_review.png') });

    const reviewData = await page.evaluate(() => {
      const title = document.querySelector('h1, h2, h3')?.innerText || '';
      const bodyText = document.body.innerText;
      const wordsDisplayed = Array.from(document.querySelectorAll('.word, .vocab-card, .review-item, li')).map(e => e.innerText.trim());
      const hasW01W32Keywords = /Week\s*(?:[1-9]|[12][0-9]|3[0-2])\b/i.test(bodyText);
      return {
        title,
        bodySnippet: bodyText.slice(0, 300),
        wordsDisplayed: wordsDisplayed.slice(0, 20),
        hasW01W32Keywords,
        hasPassportTab: /passport/i.test(bodyText)
      };
    });
    auditReport.weeklyReviewStatus = reviewData;
    console.log('Weekly Review inspection:', reviewData);
  } catch (err) {
    console.error('Weekly review error:', err.message);
  }

  // 6. Inspect Class Co-op Board Modal / View
  console.log('\n--- Inspecting Class Co-op Modal / View ---');
  try {
    await page.goto(`${BASE_URL}/#/week/33`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    const coopBtn = await page.$('button:has-text("Class"), button:has-text("Co-op"), button:has-text("Team"), [aria-label*="coop"], [aria-label*="class"], [aria-label*="leaderboard"]');
    if (coopBtn) {
      await coopBtn.click();
      await page.waitForTimeout(1500);
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_coop_board.png') });

    const coopData = await page.evaluate(() => {
      const modal = document.querySelector('.modal, [role="dialog"], .class-coop, .leaderboard-modal');
      const text = modal?.innerText || document.body.innerText;
      const hasAlex = text.includes('Alex');
      const hasLeo = text.includes('Leo');
      const has15k = text.includes('15,000') || text.includes('15000');
      const has9450 = text.includes('9,450') || text.includes('9450');
      return {
        textSnippet: text.slice(0, 400),
        hasAlex,
        hasLeo,
        has15k,
        has9450
      };
    });
    auditReport.coopBoardStatus = coopData;
    console.log('Co-op Board inspection:', coopData);
  } catch (err) {
    console.error('Co-op board error:', err.message);
  }

  // Record logs & errors
  auditReport.consoleLogs = consoleLogs;
  auditReport.networkErrors = networkErrors;
  auditReport.totalNetworkRequests = networkRequests.length;

  fs.writeFileSync('artifacts/w33_browser_audit_results.json', JSON.stringify(auditReport, null, 2));
  console.log('\nAudit complete. Results saved to artifacts/w33_browser_audit_results.json');

  await browser.close();
}

runAudit().catch(err => {
  console.error('Fatal audit failure:', err);
  process.exit(1);
});
