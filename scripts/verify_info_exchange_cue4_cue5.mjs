import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SCREENSHOT_DIR = '/Users/binhnguyen/projects/Engquest3k/public/screenshots/w33_fixes';
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function run() {
  console.log('🚀 Launching Google Chrome for Info Exchange Cue 4 & 5 verification...');
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-fake-ui-for-media-stream', '--autoplay-policy=no-user-gesture-required']
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  const consoleErrors = [];
  const networkRequests = [];

  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.message));

  page.on('response', res => {
    if (res.url().includes('/audio/week33/')) {
      networkRequests.push({ url: res.url(), status: res.status() });
    }
  });

  await page.addInitScript(() => {
    try {
      localStorage.setItem('engquest_onboarding_completed', 'true');
      localStorage.setItem('hasCompletedOnboarding', 'true');
      localStorage.setItem('engquest_unlocked_days_33', '0,1,2,3,4,5');
      const today = new Date().toISOString().slice(0, 10);
      localStorage.setItem('engquest3k_srs_daily_reviewed', today);
      localStorage.setItem('engquest_srs_last_review_date', today);
      localStorage.setItem('engquest-user-storage', JSON.stringify({
        state: {
          currentUser: { id: 'auditor', role: 'owner', name: 'Auditor' },
          learningMode: 'learn'
        },
        version: 0
      }));
    } catch (_) {}
  });

  console.log('Navigating to http://127.0.0.1:5173/week/33/task/info_exchange...');
  await page.goto('http://127.0.0.1:5173/week/33/task/info_exchange', { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2500);

  // If SRS warmup is still open, dismiss it
  const srsCloseBtn = page.locator('button.srs-skip-btn, button:has-text("✕")').first();
  if (await srsCloseBtn.count() > 0 && await srsCloseBtn.isVisible()) {
    console.log('Dismissing SRS modal...');
    await srsCloseBtn.click();
    await page.waitForTimeout(1000);
  }

  // Switch to Card 2 if not active
  const card2Btn = page.locator('button:has-text("Card 2 (You Ask)")').first();
  if (await card2Btn.count() > 0) {
    console.log('Switching to Card 2 (You Ask)...');
    await card2Btn.click();
    await page.waitForTimeout(1000);
  }

  // ==========================================
  // --- Cue 4 ---
  // ==========================================
  console.log('\n--- Checking Cue 4 ---');
  // Click on Cue 4 row
  const cue4Row = page.locator('div.cursor-pointer').filter({ hasText: '04.' }).filter({ hasText: 'who' }).first();
  if (await cue4Row.count() > 0) {
    console.log('Clicking Cue 4 row...');
    await cue4Row.click();
    await page.waitForTimeout(800);
  }

  // Ensure "Peek model question" is clicked if hidden
  const peekBtn4 = page.locator('button:has-text("Peek model question")').first();
  if (await peekBtn4.count() > 0 && await peekBtn4.isVisible()) {
    console.log('Clicking Peek model question for Cue 4...');
    await peekBtn4.click();
    await page.waitForTimeout(600);
  }

  // Extract Cue 4 text from DOM
  const cue4Data = await page.evaluate(() => {
    const cueTitle = document.querySelector('.text-amber-950, [class*="CURRENT CUE"]')?.parentElement?.innerText || '';
    const models = Array.from(document.querySelectorAll('div')).filter(d => d.innerText && d.innerText.includes('Model 1:') && d.innerText.includes('Model 2:'));
    const modelText = models.length > 0 ? models[0].innerText : document.body.innerText;
    return {
      cueTitle: cueTitle.substring(0, 300),
      hasModel1: modelText.includes('"Who helped Tom?"'),
      hasModel2: modelText.includes('"Who helped Tom immediately?"'),
      fullExcerpt: modelText.substring(0, 800)
    };
  });

  console.log('Cue 4 Data:', cue4Data);

  // Click Model 2 audio button
  const model2AudioBtn4 = page.locator('button[title="Listen to Model 2"]').first();
  if (await model2AudioBtn4.count() > 0) {
    console.log('Clicking Model 2 audio button for Cue 4...');
    await model2AudioBtn4.click();
    await page.waitForTimeout(1200);
  }

  const cue4ScreenshotPath = path.join(SCREENSHOT_DIR, 'cue4_verified.png');
  await page.screenshot({ path: cue4ScreenshotPath });
  console.log(`Saved Cue 4 screenshot: ${cue4ScreenshotPath}`);

  // ==========================================
  // --- Cue 5 ---
  // ==========================================
  console.log('\n--- Checking Cue 5 ---');
  const cue5Row = page.locator('div.cursor-pointer').filter({ hasText: '05.' }).filter({ hasText: 'how' }).first();
  if (await cue5Row.count() > 0) {
    console.log('Clicking Cue 5 row...');
    await cue5Row.click();
    await page.waitForTimeout(800);
  }

  // Ensure "Peek model question" is clicked if hidden
  const peekBtn5 = page.locator('button:has-text("Peek model question")').first();
  if (await peekBtn5.count() > 0 && await peekBtn5.isVisible()) {
    console.log('Clicking Peek model question for Cue 5...');
    await peekBtn5.click();
    await page.waitForTimeout(600);
  }

  // Extract Cue 5 text from DOM
  const cue5Data = await page.evaluate(() => {
    const cueTitle = document.querySelector('.text-amber-950, [class*="CURRENT CUE"]')?.parentElement?.innerText || '';
    const models = Array.from(document.querySelectorAll('div')).filter(d => d.innerText && d.innerText.includes('Model 1:') && d.innerText.includes('Model 2:'));
    const modelText = models.length > 0 ? models[0].innerText : document.body.innerText;
    return {
      cueTitle: cueTitle.substring(0, 300),
      hasModel1: modelText.includes('"How does Tom feel now?"'),
      hasModel2: modelText.includes('"How does he feel now?"'),
      fullExcerpt: modelText.substring(0, 800)
    };
  });

  console.log('Cue 5 Data:', cue5Data);

  // Click Model 2 audio button
  const model2AudioBtn5 = page.locator('button[title="Listen to Model 2"]').first();
  if (await model2AudioBtn5.count() > 0) {
    console.log('Clicking Model 2 audio button for Cue 5...');
    await model2AudioBtn5.click();
    await page.waitForTimeout(1200);
  }

  const cue5ScreenshotPath = path.join(SCREENSHOT_DIR, 'cue5_verified.png');
  await page.screenshot({ path: cue5ScreenshotPath });
  console.log(`Saved Cue 5 screenshot: ${cue5ScreenshotPath}`);

  console.log('\nNetwork Audio Requests:');
  console.log(JSON.stringify(networkRequests, null, 2));

  console.log('\nConsole Errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }

  await browser.close();
  console.log('\n🎉 Verification completed successfully!');
}

run().catch(err => {
  console.error('Fatal error during verification:', err);
  process.exit(1);
});
