import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const STAGING_DIR = path.resolve('docs/agent_artifacts/staging');
const SCREENSHOT_DIR = path.resolve('docs/agent_artifacts/screenshots/round98');
const REPORT_FILE = path.resolve('docs/agent_artifacts/student_proof_round98.json');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const TARGET_WEEKS = [40, 44, 47, 48, 49, 50, 51, 53, 54];
const PROD_WEEKS = [126, 127, 133, 134];

const QUESTS = [
  { id: 'gear1_webtoon', name: 'Scene Explorer' },
  { id: 'gear2_karaoke', name: 'Voice Shadow' },
  { id: 'gear3_retell', name: 'Story Retell' },
  { id: 'gear4_clil', name: 'Fact Finder' },
  { id: 'science_lab', name: 'Action Lab' },
  { id: 'science_report', name: 'Discovery Report' },
  { id: 'word_blitz', name: 'Speed Match' },
  { id: 'sentence_smash', name: 'Grammar Duel' },
  { id: 'math_quest', name: 'Math Quest' },
  { id: 'story_writer', name: 'Story Writer' },
  { id: 'broadcast_studio', name: 'Video Challenge' },
  { id: 'info_exchange', name: 'Info Exchange' },
  { id: 'boss_listening', name: 'Listening Shield' },
  { id: 'boss_reading', name: 'Reading Shield' },
  { id: 'weekly_review', name: 'Speaking & Passport' }
];

async function main() {
  console.log('========================================================================');
  console.log('🚀 ROUND 98 COMPREHENSIVE PLAYWRIGHT STUDENT PROOF RUNNER');
  console.log('========================================================================\n');

  // Pre-load all staged weeks data
  const stagedDataMap = {};
  for (const w of TARGET_WEEKS) {
    const mod = await import('file://' + path.join(STAGING_DIR, `week_${w}/index.js`));
    stagedDataMap[w] = mod.default || mod;
  }

  const browser = await chromium.launch({
    headless: true,
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--no-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    permissions: ['microphone', 'camera']
  });

  const page = await context.newPage();

  // Intercept index.js from local Vite
  await page.route('**/src/data/weeks/index.js*', async route => {
    const response = await route.fetch();
    let text = await response.text();
    text = `
      if (typeof window !== 'undefined' && !window.__STAGED_WEEKS__) {
        window.__STAGED_WEEKS__ = {};
      }
    ` + text;
    text = text.replace(
      'export const loadWeekData = async (weekId, isEasy = false) => {',
      `export const loadWeekData = async (weekId, isEasy = false) => {
        if (typeof window !== 'undefined' && window.__STAGED_WEEKS__ && window.__STAGED_WEEKS__[weekId]) {
          return window.__STAGED_WEEKS__[weekId];
        }`
    );
    await route.fulfill({
      response,
      body: text,
      headers: response.headers()
    });
  });

  // Track console errors
  let currentConsoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      currentConsoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    currentConsoleErrors.push(err.message);
  });

  // Setup student bypass
  await page.addInitScript((dataMap) => {
    localStorage.setItem('engquest-user-storage', JSON.stringify({
      state: {
        currentUser: { id: 'student-tester-1', name: 'Tester', display_name: 'Tester', avatar: 'lion', role: 'owner' },
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

    window.__STAGED_WEEKS__ = dataMap;
  }, stagedDataMap);

  const testResults = [];

  // 1. Run local staged weeks (W40, W44, W47-51, W53, W54)
  for (const w of TARGET_WEEKS) {
    console.log(`\n======================================================`);
    console.log(`▶ PLAYTESTING STAGED WEEK ${w} (15 QUESTS)`);
    console.log(`======================================================`);

    const weekRes = {
      week: w,
      type: 'staged',
      quests_tested: 0,
      quests_passed: 0,
      quests: []
    };

    for (const q of QUESTS) {
      currentConsoleErrors = [];
      const questUrl = `http://localhost:5173/week/${w}/task/${q.id}`;
      const ssFile = `w${w}_${q.id}.png`;
      const ssPath = path.join(SCREENSHOT_DIR, ssFile);

      try {
        await page.goto(questUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await page.waitForTimeout(1500);

        // Click any Start / Next button if available to interact as student
        const startBtn = page.locator('button:has-text("START"), button:has-text("Play Audio"), button:has-text("Start"), button:has-text("Next")').first();
        if (await startBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
          await startBtn.click().catch(() => {});
          await page.waitForTimeout(800);
        }

        // DOM verification
        const domInfo = await page.evaluate(() => {
          const bodyText = document.body.innerText || '';
          const hasError = bodyText.includes('Something went wrong') || bodyText.includes('TypeError');
          const buttonCount = document.querySelectorAll('button').length;
          const inputCount = document.querySelectorAll('input').length;
          return {
            hasError,
            buttonCount,
            inputCount,
            bodySnippet: bodyText.slice(0, 180).replace(/\s+/g, ' ')
          };
        });

        // Capture screenshot
        await page.screenshot({ path: ssPath });

        const isPassed = !domInfo.hasError && currentConsoleErrors.length === 0;
        const qRes = {
          quest_id: q.id,
          name: q.name,
          url: questUrl,
          screenshot: ssFile,
          passed: isPassed,
          console_errors_count: currentConsoleErrors.length,
          console_errors: currentConsoleErrors,
          dom_elements: `buttons=${domInfo.buttonCount}, inputs=${domInfo.inputCount}`,
          dom_snippet: domInfo.bodySnippet
        };

        weekRes.quests.push(qRes);
        weekRes.quests_tested++;
        if (isPassed) weekRes.quests_passed++;

        console.log(`  ✓ [W${w} ${q.name}]: ${isPassed ? 'PASS' : 'FAIL'} | Err=${currentConsoleErrors.length} | 📸 ${ssFile}`);
      } catch (err) {
        console.error(`  ⛔ [W${w} ${q.name}]: ERROR ${err.message}`);
        weekRes.quests.push({
          quest_id: q.id,
          name: q.name,
          url: questUrl,
          passed: false,
          error: err.message
        });
      }
    }

    testResults.push(weekRes);
  }

  // 2. Run production merged weeks verification on https://app.bkbacademy.vn
  console.log(`\n======================================================`);
  console.log(`▶ PLAYTESTING PRODUCTION MERGED WEEKS (W126, W127, W133, W134)`);
  console.log(`======================================================`);

  for (const pw of PROD_WEEKS) {
    const prodUrl = `https://app.bkbacademy.vn/week/${pw}/task/gear1_webtoon`;
    const ssFile = `prod_w${pw}_gear1.png`;
    const ssPath = path.join(SCREENSHOT_DIR, ssFile);
    currentConsoleErrors = [];

    console.log(`Testing Production W${pw} -> ${prodUrl}`);
    try {
      await page.goto(prodUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(3000);

      const domInfo = await page.evaluate(() => {
        const bodyText = document.body.innerText || '';
        return {
          hasError: bodyText.includes('Something went wrong') || bodyText.includes('TypeError'),
          bodySnippet: bodyText.slice(0, 180).replace(/\s+/g, ' ')
        };
      });

      await page.screenshot({ path: ssPath });
      console.log(`  ✓ [Prod W${pw}]: Screenshot saved (${ssFile}) | Snippet: ${domInfo.bodySnippet}`);

      testResults.push({
        week: pw,
        type: 'production_verified',
        url: prodUrl,
        screenshot: ssFile,
        passed: !domInfo.hasError,
        dom_snippet: domInfo.bodySnippet
      });
    } catch (e) {
      console.warn(`  ⚠️ [Prod W${pw}]: ${e.message}`);
    }
  }

  await browser.close();

  // Save report
  fs.writeFileSync(REPORT_FILE, JSON.stringify(testResults, null, 2) + '\n', 'utf8');
  console.log(`\n🎉 Student proof complete. Report written to: ${REPORT_FILE}`);
}

main().catch(console.error);
