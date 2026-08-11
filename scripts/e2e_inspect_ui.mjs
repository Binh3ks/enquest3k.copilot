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
    const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    if (fs.existsSync(chromePath)) {
      browser = await chromium.launch({
        executablePath: chromePath,
        headless: true
      });
    } else {
      throw new Error(`Google Chrome not found: ` + e1.message);
    }
  }

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });

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

  // Test 1: Mindmap
  console.log('📸 Navigating to Mindmap W36...');
  await page.goto(`${BASE_URL}/week/36/mindmap_speaking`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'e2e_w36_mindmap_fix.png'), fullPage: false });

  // Test 2: Writing
  console.log('📸 Navigating to Writing W36...');
  await page.goto(`${BASE_URL}/week/36/writing`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'e2e_w36_writing_fix.png'), fullPage: false });

  // Test 3: Game Hub
  console.log('📸 Navigating to Game Hub W36...');
  await page.goto(`${BASE_URL}/week/36/game_hub`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'e2e_w36_gamehub_fix.png'), fullPage: false });

  await browser.close();
  console.log('🎉 Full E2E UI Inspection Complete!');
}

runE2E().catch(err => {
  console.error('❌ E2E Inspection failed:', err);
  process.exit(1);
});
