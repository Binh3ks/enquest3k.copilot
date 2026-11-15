import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const SCREENSHOT_DIR = path.resolve('docs/agent_artifacts/screenshots/round103');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

function getSha256(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

async function runProof() {
  console.log('========================================================================');
  console.log('🚀 ROUND 103 PLAYWRIGHT PHYSICAL MEDIA & STUDENT INTERACTION PROOF');
  console.log('========================================================================\n');

  const browser = await chromium.launch({
    headless: true,
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--no-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    permissions: ['microphone', 'camera']
  });

  const page = await context.newPage();

  // Setup bypass in localStorage
  await page.addInitScript(() => {
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
  });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  const report = {
    timestamp: new Date().toISOString(),
    testedWeeks: {},
    audioHttpChecks: {}
  };

  // ─────────────────────────────────────────────────────────────
  // 1. WEEK 39 PROOF
  // ─────────────────────────────────────────────────────────────
  console.log('▶ Testing Week 39 Story Writer...');
  const w39Url = 'http://localhost:5173/week/39/task/story_writer';
  await page.goto(w39Url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Check scene image dimensions in DOM
  const w39ImgData = await page.evaluate(async () => {
    const img = document.querySelector('img[alt*="Scene 1"], img[alt*="Visiting Nature Reserve"]');
    if (!img) return { exists: false, naturalWidth: 0, naturalHeight: 0, src: null };
    if (!img.complete) {
      await new Promise(r => { img.onload = r; img.onerror = r; setTimeout(r, 2000); });
    }
    return {
      exists: true,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      src: img.src
    };
  });
  console.log('  Image status W39:', w39ImgData);

  const w39Scene1Path = path.join(SCREENSHOT_DIR, 'w39_scene1_proof.png');
  await page.screenshot({ path: w39Scene1Path });
  console.log(`  ✓ W39 Scene 1 screenshot saved: ${w39Scene1Path}`);

  // Test student interaction
  console.log('  Testing student interaction on W39...');
  const connectorBtn39 = page.locator('[data-testid="connector-btn"]').first();
  if (await connectorBtn39.count() > 0) {
    await connectorBtn39.click();
    await page.waitForTimeout(300);
  }
  const chipBtn39 = page.locator('[data-testid="ordered-chip-btn"]').first();
  if (await chipBtn39.count() > 0) {
    await chipBtn39.click();
    await page.waitForTimeout(300);
  }

  // Type additional sentence text
  const textarea39 = page.locator('textarea');
  await textarea39.focus();
  await page.keyboard.type(' We saw wild animals living in safe habitats.');
  await page.waitForTimeout(500);

  // Click Next Scene
  const nextBtn39 = page.getByRole('button', { name: /Next Scene|Next/i });
  if (await nextBtn39.count() > 0) {
    await nextBtn39.click();
    await page.waitForTimeout(1000);
  }

  const w39InteractionPath = path.join(SCREENSHOT_DIR, 'w39_scene2_student_interaction.png');
  await page.screenshot({ path: w39InteractionPath });
  console.log(`  ✓ W39 Student interaction screenshot saved: ${w39InteractionPath}`);

  // Check audio availability via HTTP HEAD/GET
  const audioResp39 = await page.evaluate(async () => {
    const res = await fetch('/audio/week39/writing_scene_1.mp3');
    return { status: res.status, ok: res.ok };
  });
  console.log('  Audio fetch check W39:', audioResp39);

  report.testedWeeks.W39 = {
    imageData: w39ImgData,
    audioCheck: audioResp39,
    screenshots: {
      scene1: { path: w39Scene1Path, sha256: getSha256(w39Scene1Path) },
      scene2_interacted: { path: w39InteractionPath, sha256: getSha256(w39InteractionPath) }
    }
  };

  // ─────────────────────────────────────────────────────────────
  // 2. WEEK 41 PROOF
  // ─────────────────────────────────────────────────────────────
  console.log('\n▶ Testing Week 41 Story Writer...');
  const w41Url = 'http://localhost:5173/week/41/task/story_writer';
  await page.goto(w41Url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const w41ImgData = await page.evaluate(async () => {
    const img = document.querySelector('img[alt*="Scene 1"], img[alt*="Finding the Egg"]');
    if (!img) return { exists: false, naturalWidth: 0, naturalHeight: 0, src: null };
    if (!img.complete) {
      await new Promise(r => { img.onload = r; img.onerror = r; setTimeout(r, 2000); });
    }
    return {
      exists: true,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      src: img.src
    };
  });
  console.log('  Image status W41:', w41ImgData);

  const w41Scene1Path = path.join(SCREENSHOT_DIR, 'w41_scene1_proof.png');
  await page.screenshot({ path: w41Scene1Path });
  console.log(`  ✓ W41 Scene 1 screenshot saved: ${w41Scene1Path}`);

  // Test student interaction
  console.log('  Testing student interaction on W41...');
  const connectorBtn41 = page.locator('[data-testid="connector-btn"]').first();
  if (await connectorBtn41.count() > 0) {
    await connectorBtn41.click();
    await page.waitForTimeout(300);
  }
  const chipBtn41 = page.locator('[data-testid="ordered-chip-btn"]').first();
  if (await chipBtn41.count() > 0) {
    await chipBtn41.click();
    await page.waitForTimeout(300);
  }

  const textarea41 = page.locator('textarea');
  await textarea41.focus();
  await page.keyboard.type(' Oliver and Sophia observed the butterfly egg on the leaf.');
  await page.waitForTimeout(500);

  const nextBtn41 = page.getByRole('button', { name: /Next Scene|Next/i });
  if (await nextBtn41.count() > 0) {
    await nextBtn41.click();
    await page.waitForTimeout(1000);
  }

  const w41InteractionPath = path.join(SCREENSHOT_DIR, 'w41_scene2_student_interaction.png');
  await page.screenshot({ path: w41InteractionPath });
  console.log(`  ✓ W41 Student interaction screenshot saved: ${w41InteractionPath}`);

  const audioResp41 = await page.evaluate(async () => {
    const res = await fetch('/audio/week41/writing_scene_1.mp3');
    return { status: res.status, ok: res.ok };
  });
  console.log('  Audio fetch check W41:', audioResp41);

  report.testedWeeks.W41 = {
    imageData: w41ImgData,
    audioCheck: audioResp41,
    screenshots: {
      scene1: { path: w41Scene1Path, sha256: getSha256(w41Scene1Path) },
      scene2_interacted: { path: w41InteractionPath, sha256: getSha256(w41InteractionPath) }
    }
  };

  // ─────────────────────────────────────────────────────────────
  // 3. WEEK 33 REGRESSION CHECK
  // ─────────────────────────────────────────────────────────────
  console.log('\n▶ Testing Week 33 Story Writer (Regression Check)...');
  const w33Url = 'http://localhost:5173/week/33/task/story_writer';
  await page.goto(w33Url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);

  const w33ScreenshotPath = path.join(SCREENSHOT_DIR, 'w33_story_writer_regression.png');
  await page.screenshot({ path: w33ScreenshotPath });
  console.log(`  ✓ W33 screenshot saved: ${w33ScreenshotPath}`);

  report.testedWeeks.W33 = {
    url: w33Url,
    screenshot: { path: w33ScreenshotPath, sha256: getSha256(w33ScreenshotPath) }
  };

  report.consoleErrors = consoleErrors;

  await browser.close();

  const reportPath = path.resolve('docs/agent_artifacts/round103_playwright_proof.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n✅ Playwright proof completed! Report written to ${reportPath}`);
}

runProof().catch(err => {
  console.error('Playwright proof failed:', err);
  process.exit(1);
});
