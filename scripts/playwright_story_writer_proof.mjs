import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const STAGING_DIR = path.resolve('docs/agent_artifacts/staging');
const SCREENSHOT_DIR = path.resolve('docs/agent_artifacts/screenshots/round100');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

function getSha256(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

async function runStudentProof() {
  console.log('========================================================================');
  console.log('🚀 ROUND 100 PLAYWRIGHT STUDENT INTERACTION PROOF');
  console.log('========================================================================\n');

  // Load staged data for W47
  const stagedPath = path.join(STAGING_DIR, 'week_47/index.js');
  let stagedW47Data = null;
  if (fs.existsSync(stagedPath)) {
    const mod = await import('file://' + stagedPath);
    stagedW47Data = mod.default || mod;
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

  // Route interception to inject staged week 47 into loadWeekData
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

  // Setup bypass in localStorage
  await page.addInitScript((w47Data) => {
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

    if (w47Data) {
      window.__STAGED_WEEKS__ = { 47: w47Data };
    }
  }, stagedW47Data);

  // ─────────────────────────────────────────────────────────────
  // 1. C5 ITEM E: SCREENSHOT OF W33
  // ─────────────────────────────────────────────────────────────
  console.log('📸 Capturing Item E: W33 Story Writer screenshot...');
  const w33Url = 'http://localhost:5173/week/33/task/story_writer';
  await page.goto(w33Url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(1500);
  const w33ScreenshotPath = path.join(SCREENSHOT_DIR, 'w33_story_writer_proof.png');
  await page.screenshot({ path: w33ScreenshotPath });
  console.log(`  ✓ W33 screenshot saved: ${w33ScreenshotPath}`);

  // ─────────────────────────────────────────────────────────────
  // 2. ITEM F: W47 STUDENT INTERACTION PROOF (PURE CLICKS, NO FILL)
  // ─────────────────────────────────────────────────────────────
  console.log('\n📸 Capturing Item F: W47 Student Interaction Proof (Scene 1 Initial, Interacted, Scene 2)...');
  const w47Url = 'http://localhost:5173/week/47/task/story_writer';
  await page.goto(w47Url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(1500);

  // (1) Scene 1 Initial Screenshot
  const ss1InitialPath = path.join(SCREENSHOT_DIR, 'w47_scene1_initial.png');
  await page.screenshot({ path: ss1InitialPath });
  console.log(`  ✓ Image 1 (Scene 1 Initial) saved: ${ss1InitialPath}`);

  // Perform pure click interactions (click connector + chips)
  const connectorBtn = page.locator('[data-testid="connector-btn"]').first();
  const connectorText = (await connectorBtn.textContent()).trim();
  console.log(`  👉 Clicking connector button: "${connectorText}"`);
  await connectorBtn.click();
  await page.waitForTimeout(300);

  const chipsLocators = page.locator('[data-testid="content-chip"]');
  const chipCount = await chipsLocators.count();
  const clickedChips = [];

  // Click 3 distinct chips to build a valid sentence (>= 3 words)
  for (let i = 0; i < Math.min(3, chipCount); i++) {
    const chipText = (await chipsLocators.nth(i).textContent()).trim();
    clickedChips.push(chipText);
    console.log(`  👉 Clicking content chip [${i + 1}]: "${chipText}"`);
    await chipsLocators.nth(i).click();
    await page.waitForTimeout(300);
  }

  // Inspect textarea content, words, chips inserted
  const interactionDump = await page.evaluate(() => {
    const textarea = document.querySelector('textarea');
    const val = textarea ? textarea.value : '';
    const words = val.trim().split(/\s+/).filter(Boolean);
    const sceneCounter = document.querySelector('.text-slate-700')?.textContent?.trim() || '';
    return {
      textareaValue: val,
      wordCount: words.length,
      sceneCounter
    };
  });

  console.log('  Interaction evaluation in DOM:', interactionDump);

  // (2) Scene 1 Interacted Screenshot
  const ss1InteractedPath = path.join(SCREENSHOT_DIR, 'w47_scene1_interacted.png');
  await page.screenshot({ path: ss1InteractedPath });
  console.log(`  ✓ Image 2 (Scene 1 Interacted) saved: ${ss1InteractedPath}`);

  // Click "Next Scene"
  const nextBtn = page.locator('button:has-text("Next Scene")');
  console.log('  👉 Clicking "Next Scene" button...');
  await nextBtn.click();
  await page.waitForTimeout(1000);

  // Inspect Scene 2
  const scene2Dump = await page.evaluate(() => {
    const sceneCounter = document.querySelector('.text-slate-700')?.textContent?.trim() || '';
    const ladder = document.querySelector('[data-testid="ladder-badge"]')?.textContent?.trim() || '';
    const textareaVal = document.querySelector('textarea')?.value || '';
    return { sceneCounter, ladder, textareaVal };
  });
  console.log('  Scene 2 DOM status:', scene2Dump);

  // (3) Scene 2 Screenshot
  const ss2Path = path.join(SCREENSHOT_DIR, 'w47_scene2.png');
  await page.screenshot({ path: ss2Path });
  console.log(`  ✓ Image 3 (Scene 2) saved: ${ss2Path}`);

  await browser.close();

  // Compute distinct SHA-256 hashes
  const sha1Initial = getSha256(ss1InitialPath);
  const sha1Interacted = getSha256(ss1InteractedPath);
  const sha2 = getSha256(ss2Path);
  const shaW33 = getSha256(w33ScreenshotPath);

  const hashesAreDistinct = (sha1Initial !== sha1Interacted) && (sha1Interacted !== sha2) && (sha1Initial !== sha2);

  const proofResult = {
    test: 'Item F Playwright Student Proof (Pure Clicks, No Fill)',
    week: 47,
    interaction: {
      connectorClicked: connectorText,
      chipsClicked: clickedChips,
      fillUsed: false,
      textareaContent: interactionDump.textareaValue,
      wordCount: interactionDump.wordCount,
      minWordsMet: interactionDump.wordCount >= 3
    },
    scene2: {
      reached: scene2Dump.sceneCounter.includes('Scene 2'),
      sceneCounter: scene2Dump.sceneCounter,
      ladderStage: scene2Dump.ladder
    },
    screenshots: {
      w33_regression: { path: w33ScreenshotPath, sha256: shaW33 },
      scene1_initial: { path: ss1InitialPath, sha256: sha1Initial },
      scene1_interacted: { path: ss1InteractedPath, sha256: sha1Interacted },
      scene2: { path: ss2Path, sha256: sha2 }
    },
    allHashesDistinct: hashesAreDistinct
  };

  const jsonDumpPath = path.resolve('docs/agent_artifacts/playwright_interaction_proof.json');
  fs.writeFileSync(jsonDumpPath, JSON.stringify(proofResult, null, 2));

  console.log('\n========================================================================');
  console.log('PROOF VERIFICATION SUMMARY:');
  console.log(`- Textarea value: "${interactionDump.textareaValue}"`);
  console.log(`- Word count: ${interactionDump.wordCount}`);
  console.log(`- Fill used: FALSE (100% genuine clicks on connector + chips)`);
  console.log(`- Hashes distinct? ${hashesAreDistinct ? '✅ YES (3 distinct SHA-256 hashes)' : '❌ NO'}`);
  console.log(`  Image 1 SHA-256: ${sha1Initial}`);
  console.log(`  Image 2 SHA-256: ${sha1Interacted}`);
  console.log(`  Image 3 SHA-256: ${sha2}`);
  console.log(`- JSON dump written to: ${jsonDumpPath}`);
  console.log('========================================================================\n');
}

runStudentProof().catch(err => {
  console.error(err);
  process.exit(1);
});
