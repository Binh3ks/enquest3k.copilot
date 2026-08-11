import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const ARTIFACTS_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/fd5de532-53a7-4fe0-b374-4b9b329dde4f';
const BASE_URL = 'http://localhost:5173';

async function runE2EInspection() {
  console.log('🚀 Launching Playwright Chromium E2E UI Inspector...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  // Set mock user session in localStorage to bypass LandingPage & PlacementTest
  await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem('engquest_user', JSON.stringify({ id: 1, username: 'demo_student', name: 'Demo Student', role: 'student' }));
    localStorage.setItem('engquest_token', 'mock_token_123');
    localStorage.setItem('placement_result', JSON.stringify({ level: 'A2', recommendedWeek: 36 }));
  });

  // 1. Inspect Explore Station (/week/36/explore)
  console.log('📸 Navigating to Explore Station (/week/36/explore)...');
  try {
    await page.goto(`${BASE_URL}/week/36/explore`, { waitUntil: 'load', timeout: 15000 });
    await page.waitForTimeout(5000);
    const exploreP = path.join(ARTIFACTS_DIR, 'e2e_w36_explore_mcq.png');
    await page.screenshot({ path: exploreP });
    console.log(`  ✅ Explore screenshot saved at ${exploreP}`);
  } catch (e) {
    console.error('Explore station navigation failed:', e.message);
  }

  // 2. Inspect Game Hub Station (/week/36/game_hub)
  console.log('📸 Navigating to Game Hub Station (/week/36/game_hub)...');
  try {
    await page.goto(`${BASE_URL}/week/36/game_hub`, { waitUntil: 'load', timeout: 15000 });
    await page.waitForTimeout(5000);
    const gameHubP = path.join(ARTIFACTS_DIR, 'e2e_w36_game_hub.png');
    await page.screenshot({ path: gameHubP });
    console.log(`  ✅ Game Hub screenshot saved at ${gameHubP}`);
  } catch (e) {
    console.error('Game Hub navigation failed:', e.message);
  }

  await browser.close();
  console.log('🎉 E2E UI Inspection completed successfully!');
}

runE2EInspection().catch(err => {
  console.error('Fatal E2E error:', err);
  process.exit(1);
});
