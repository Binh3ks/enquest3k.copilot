import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const ARTIFACTS_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/fd5de532-53a7-4fe0-b374-4b9b329dde4f';
const BASE_URL = 'http://localhost:5173';

async function runRealLoginE2E() {
  console.log('🚀 Launching Playwright via Guest Login Flow...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  // 1. Open Landing Page
  await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Click guest login button
  const guestBtn = await page.$('button:has-text("Dùng Thử Ngay"), button:has-text("Học Thử"), button:has-text("Khách")');
  if (guestBtn) {
    console.log('  👉 Clicking Guest Login button...');
    await guestBtn.click();
    await page.waitForTimeout(2000);
  }

  // Set placement result so student goes to dashboard
  await page.evaluate(() => {
    localStorage.setItem('placement_result', JSON.stringify({ level: 'A2', recommendedWeek: 36 }));
  });

  // 2. Navigate to Explore Station (/week/36/explore)
  console.log('📸 Navigating directly to Explore Station (/week/36/explore)...');
  await page.goto(`${BASE_URL}/week/36/explore`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);

  // Scroll down to MCQ questions
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(1000);

  const exploreP = path.join(ARTIFACTS_DIR, 'e2e_w36_explore_mcq_real.png');
  await page.screenshot({ path: exploreP });
  console.log(`  ✅ Real Explore MCQ screenshot saved at ${exploreP}`);

  // 3. Navigate to Game Hub (/week/36/game_hub)
  console.log('📸 Navigating to Game Hub Station (/week/36/game_hub)...');
  await page.goto(`${BASE_URL}/week/36/game_hub`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  const gameHubP = path.join(ARTIFACTS_DIR, 'e2e_w36_game_hub_real.png');
  await page.screenshot({ path: gameHubP });
  console.log(`  ✅ Real Game Hub screenshot saved at ${gameHubP}`);

  await browser.close();
  console.log('🎉 Real E2E Flow completed!');
}

runRealLoginE2E().catch(err => {
  console.error('Fatal E2E error:', err);
  process.exit(1);
});
