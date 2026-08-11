import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const ARTIFACTS_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/fd5de532-53a7-4fe0-b374-4b9b329dde4f';

async function runE2E() {
  console.log('🚀 Starting E2E UI Inspection using system Google Chrome...');
  
  let browser;
  try {
    browser = await chromium.launch({
      channel: 'chrome',
      headless: true
    });
  } catch (e1) {
    console.log('⚠️ Fallback to macOS default Chrome executable path...');
    const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    if (fs.existsSync(chromePath)) {
      browser = await chromium.launch({
        executablePath: chromePath,
        headless: true
      });
    } else {
      throw new Error(`Google Chrome not found at ${chromePath}: ` + e1.message);
    }
  }

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });

  // Inject Zustand session state using correct localStorage key
  await context.addInitScript(() => {
    localStorage.setItem('placement_result', JSON.stringify({ startWeek: 36 }));
    localStorage.setItem('engquest-user-storage', JSON.stringify({
      state: {
        currentUser: { id: 1, username: 'owner', role: 'super_admin', plan: 'premium' },
        token: 'dev-token',
        learningMode: 'advanced'
      },
      version: 2
    }));
  });

  const page = await context.newPage();

  // Test 1: Read & Explore Week 36
  console.log('📸 Navigating to Read & Explore W36...');
  try {
    await page.goto('https://app.bkbacademy.vn/week/36/read_explore', { waitUntil: 'domcontentloaded', timeout: 15000 });
  } catch (e) {
    console.log('Navigation warning:', e.message);
  }
  await page.waitForTimeout(3000);

  const screenshotPathRead = path.join(ARTIFACTS_DIR, 'e2e_w36_read_explore.png');
  await page.screenshot({ path: screenshotPathRead, fullPage: false });
  console.log(`✅ Saved screenshot: ${screenshotPathRead}`);

  // Test 2: New Words Week 36
  console.log('📸 Navigating to New Words W36...');
  try {
    await page.goto('https://app.bkbacademy.vn/week/36/new_words', { waitUntil: 'domcontentloaded', timeout: 15000 });
  } catch (e) {
    console.log('Navigation warning:', e.message);
  }
  await page.waitForTimeout(3000);

  const screenshotPathVocab = path.join(ARTIFACTS_DIR, 'e2e_w36_new_words.png');
  await page.screenshot({ path: screenshotPathVocab, fullPage: false });
  console.log(`✅ Saved screenshot: ${screenshotPathVocab}`);

  // Test 3: Grammar Week 36
  console.log('📸 Navigating to Grammar W36...');
  try {
    await page.goto('https://app.bkbacademy.vn/week/36/grammar', { waitUntil: 'domcontentloaded', timeout: 15000 });
  } catch (e) {
    console.log('Navigation warning:', e.message);
  }
  await page.waitForTimeout(3000);

  const screenshotPathGrammar = path.join(ARTIFACTS_DIR, 'e2e_w36_grammar.png');
  await page.screenshot({ path: screenshotPathGrammar, fullPage: false });
  console.log(`✅ Saved screenshot: ${screenshotPathGrammar}`);

  // Test 4: Writing Week 36
  console.log('📸 Navigating to Writing W36...');
  try {
    await page.goto('https://app.bkbacademy.vn/week/36/writing', { waitUntil: 'domcontentloaded', timeout: 15000 });
  } catch (e) {
    console.log('Navigation warning:', e.message);
  }
  await page.waitForTimeout(3000);

  const screenshotPathWrite = path.join(ARTIFACTS_DIR, 'e2e_w36_writing.png');
  await page.screenshot({ path: screenshotPathWrite, fullPage: false });
  console.log(`✅ Saved screenshot: ${screenshotPathWrite}`);

  await browser.close();
  console.log('🎉 Full E2E UI Inspection Complete!');
}

runE2E().catch(err => {
  console.error('❌ E2E Inspection failed:', err);
  process.exit(1);
});
