import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const STAGING_DIR = path.resolve('docs/agent_artifacts/staging');
const SCREENSHOT_DIR = path.resolve('docs/agent_artifacts/screenshots/round100');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

// Target weeks to prove across all schemas:
// 1. Live weeks: 39, 41, 43, 45, 46
// 2. Staged panels: 40, 42, 44
// 3. Staged image_panels: 47, 48, 49, 50, 51, 52, 53, 54
// 4. Staged sentence_starters: 55, 56, 60, 65, 70, 72
const TEST_WEEKS = [
  // Live weeks
  39, 41, 43, 45, 46,
  // Staged panels
  40, 42, 44,
  // Staged image_panels
  47, 48, 49, 50, 51, 52, 53, 54,
  // Staged sentence_starters
  55, 56, 60, 65, 70, 72
];

async function runProof() {
  console.log('========================================================================');
  console.log('🚀 ROUND 100 PLAYWRIGHT STORY WRITER VERIFICATION RUNNER');
  console.log('========================================================================\n');

  // Pre-load all staged data into map
  const stagedDataMap = {};
  for (const w of TEST_WEEKS) {
    const stagedPath = path.join(STAGING_DIR, `week_${w}/index.js`);
    if (fs.existsSync(stagedPath)) {
      const mod = await import('file://' + stagedPath);
      stagedDataMap[w] = mod.default || mod;
    }
  }

  const browser = await chromium.launch({
    headless: true,
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--no-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    permissions: ['microphone', 'camera']
  });

  const page = await context.newPage();

  // Intercept index.js to inject staged data
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
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  // Setup student session bypass
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

  const results = [];

  for (const w of TEST_WEEKS) {
    console.log(`▶ Testing Week ${w}...`);
    const questUrl = `http://localhost:5173/week/${w}/task/story_writer`;
    const ssPath = path.join(SCREENSHOT_DIR, `story_writer_w${w}.png`);

    try {
      await page.goto(questUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(1500);

      // Verify DOM
      const domData = await page.evaluate(() => {
        const ladder = document.querySelector('[data-testid="ladder-badge"]')?.textContent?.trim() || '';
        const sceneCounter = document.querySelector('.text-slate-700')?.textContent?.trim() || '';
        const hint = document.querySelector('.bg-indigo-50\\/90')?.textContent?.trim() || '';
        const chips = Array.from(document.querySelectorAll('[data-testid="content-chip"]')).map(el => el.textContent.trim());
        const connectors = Array.from(document.querySelectorAll('[data-testid="connector-btn"]')).map(el => el.textContent.trim());
        const sceneButtons = Array.from(document.querySelectorAll('button span.opacity-80')).map(el => el.textContent.trim());
        const hasFallbackPills = chips.some(c => c.includes('explored the trail') || c.includes('the main character'));

        return {
          ladder,
          sceneCounter,
          hint,
          chips,
          connectors,
          sceneButtons,
          hasFallbackPills,
          fullBodySnippet: document.body.innerText.slice(0, 500)
        };
      });

      // Interactive test on W47 (click connector, click chip, type sentence, advance scene)
      let interactionSuccess = false;
      if (w === 47) {
        console.log('  Interacting with W47 Story Writer...');
        const firstConnector = page.locator('[data-testid="connector-btn"]').first();
        if (await firstConnector.count() > 0) {
          await firstConnector.click();
        }
        const firstChip = page.locator('[data-testid="content-chip"]').first();
        if (await firstChip.count() > 0) {
          await firstChip.click();
        }
        const textarea = page.locator('textarea');
        await textarea.fill('First, Lucas and Mia visited the observatory and counted stars.');
        await page.waitForTimeout(500);

        // Take interactive screenshot
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'story_writer_w47_interacted.png') });

        // Advance to next scene
        const nextBtn = page.locator('button:has-text("Next Scene")');
        if (await nextBtn.count() > 0 && !(await nextBtn.isDisabled())) {
          await nextBtn.click();
          await page.waitForTimeout(1000);
          const scene2Counter = await page.locator('.text-slate-700').first().textContent();
          console.log('  Advanced to:', scene2Counter);
          interactionSuccess = true;
          await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'story_writer_w47_scene2.png') });
        }
      }

      await page.screenshot({ path: ssPath });

      const isPass = !domData.hasFallbackPills && domData.chips.length > 0;

      results.push({
        week: w,
        status: isPass ? 'PASS' : 'FAIL_FALLBACK_DETECTED',
        sceneCounter: domData.sceneCounter,
        ladder: domData.ladder,
        hint: domData.hint,
        chipsCount: domData.chips.length,
        chips: domData.chips,
        connectors: domData.connectors,
        hasFallbackPills: domData.hasFallbackPills,
        screenshot: ssPath,
        interactionSuccess: w === 47 ? interactionSuccess : undefined
      });

      console.log(`  Result W${w}: ${isPass ? '✅ PASS' : '❌ FAIL'} (chips: ${domData.chips.length}, fallback: ${domData.hasFallbackPills})`);
      console.log(`  Scene 1 Chips: [${domData.chips.join(', ')}]`);
    } catch (err) {
      console.error(`  Error testing W${w}:`, err.message);
      results.push({
        week: w,
        status: 'ERROR',
        error: err.message
      });
    }
  }

  await browser.close();

  const reportPath = path.resolve('docs/agent_artifacts/story_writer_proof_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log('\n========================================================================');
  console.log(`Verification complete! Report written to: ${reportPath}`);
  console.log('========================================================================\n');
}

runProof();
