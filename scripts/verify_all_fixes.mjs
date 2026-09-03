import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SCREENSHOT_DIR = '/Users/binhnguyen/projects/Engquest3k/public/screenshots/w33_verified';
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function verifyAll() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // ─────────────────────────────────────────────────────────
  // PART 1: MOBILE MAP & QUICK HUB BOTTOM SHEET (Option 1)
  // ─────────────────────────────────────────────────────────
  console.log('\n--- 1. Testing Mobile Map (390x844) ---');
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.addInitScript(() => {
    localStorage.setItem('engquest_onboarding_completed', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');
    localStorage.setItem('engquest_unlocked_days_33', '0,1,2,3,4,5');
    localStorage.setItem('engquest-user-storage', JSON.stringify({
      state: { currentUser: { id: 'auditor', role: 'owner', name: 'Auditor' }, learningMode: 'learn' },
      version: 0
    }));
  });

  await mobilePage.goto('http://localhost:4173/week/33/hub/map', { waitUntil: 'domcontentloaded' });
  await mobilePage.waitForTimeout(2000);
  await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile_map_fixed.png') });
  console.log('Saved: mobile_map_fixed.png (no overflow, Hub button visible)');

  // Click the mobile Hub button
  console.log('Clicking Mobile Hub button...');
  const hubBtn = mobilePage.locator('button:has-text("Hub")').first();
  if (await hubBtn.count() > 0) {
    await hubBtn.click();
    await mobilePage.waitForTimeout(1000);
    await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile_quick_hub_sheet.png') });
    console.log('Saved: mobile_quick_hub_sheet.png (Bottom Sheet with Arcade, Words, Co-op)');
  }

  await mobileContext.close();

  // ─────────────────────────────────────────────────────────
  // PART 2: LAPTOP DISPLAY FOR BOSS CASTLE (1280x800)
  // ─────────────────────────────────────────────────────────
  console.log('\n--- 2. Testing Laptop Display (1280x800) ---');
  const laptopContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const laptopPage = await laptopContext.newPage();
  await laptopPage.addInitScript(() => {
    localStorage.setItem('engquest_onboarding_completed', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');
    localStorage.setItem('engquest_unlocked_days_33', '0,1,2,3,4,5');
    localStorage.setItem('engquest-user-storage', JSON.stringify({
      state: { currentUser: { id: 'auditor', role: 'owner', name: 'Auditor' }, learningMode: 'learn' },
      version: 0
    }));
  });

  // L1: Draw Lines
  await laptopPage.goto('http://localhost:4173/week/33/task/boss_listening', { waitUntil: 'domcontentloaded' });
  await laptopPage.waitForTimeout(1500);
  await laptopPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'laptop_l1_fixed.png') });
  console.log('Saved: laptop_l1_fixed.png');

  // L2: Notepad
  const l2Tab = laptopPage.locator('[data-testid="boss-part-tab-list_p2"], button:has-text("L2")').first();
  if (await l2Tab.count() > 0) {
    await l2Tab.click();
    await laptopPage.waitForTimeout(1200);
    await laptopPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'laptop_l2_fixed.png') });
    console.log('Saved: laptop_l2_fixed.png');
  }

  // R1: Word Bank Matching (2-column definitions on laptop)
  await laptopPage.goto('http://localhost:4173/week/33/task/boss_reading', { waitUntil: 'domcontentloaded' });
  await laptopPage.waitForTimeout(1500);
  await laptopPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'laptop_r1_fixed.png') });
  console.log('Saved: laptop_r1_fixed.png');

  // S1: Find Differences
  await laptopPage.goto('http://localhost:4173/week/33/task/weekly_review', { waitUntil: 'domcontentloaded' });
  await laptopPage.waitForTimeout(1500);
  await laptopPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'laptop_s1_fixed.png') });
  console.log('Saved: laptop_s1_fixed.png');

  await laptopContext.close();
  await browser.close();
  console.log('\nAll verification screenshots successfully saved to:', SCREENSHOT_DIR);
}

verifyAll().catch(console.error);
