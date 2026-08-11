import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const ARTIFACTS_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/fd5de532-53a7-4fe0-b374-4b9b329dde4f';
const BASE_URL = 'http://localhost:5173';

async function runE2E() {
  console.log(`🚀 Starting E2E UI Inspection on ${BASE_URL} using system Google Chrome...`);
  
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

  // Test 1: Read & Explore (Week 36)
  console.log('📸 Navigating to Read & Explore W36...');
  await page.goto(`${BASE_URL}/week/36/read_explore`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  const screenshotPathRead = path.join(ARTIFACTS_DIR, 'e2e_w36_read_explore.png');
  await page.screenshot({ path: screenshotPathRead, fullPage: false });
  console.log(`✅ Saved screenshot: ${screenshotPathRead}`);

  // Test 2: Daily Watch (Week 36)
  console.log('📸 Navigating to Daily Watch W36...');
  await page.goto(`${BASE_URL}/week/36/daily_watch`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  const screenshotPathWatch = path.join(ARTIFACTS_DIR, 'e2e_w36_daily_watch.png');
  await page.screenshot({ path: screenshotPathWatch, fullPage: false });
  console.log(`✅ Saved screenshot: ${screenshotPathWatch}`);

  // Test 3: Word Match (Week 36)
  console.log('📸 Navigating to Word Match W36...');
  await page.goto(`${BASE_URL}/week/36/word_match`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  const screenshotPathWordMatch = path.join(ARTIFACTS_DIR, 'e2e_w36_word_match.png');
  await page.screenshot({ path: screenshotPathWordMatch, fullPage: false });
  console.log(`✅ Saved screenshot: ${screenshotPathWordMatch}`);

  await browser.close();
  console.log('🎉 Full E2E UI Inspection Complete!');
}

runE2E().catch(err => {
  console.error('❌ E2E Inspection failed:', err);
  process.exit(1);
});
