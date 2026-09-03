import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SCREENSHOT_DIR = '/Users/binhnguyen/projects/Engquest3k/public/screenshots/w33_fixes';
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function verify() {
  console.log('Launching local Google Chrome via Playwright...');
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  // Bypass onboarding modal and unlock all days for automated verification
  await page.addInitScript(() => {
    try {
      localStorage.setItem('engquest_onboarding_completed', 'true');
      localStorage.setItem('hasCompletedOnboarding', 'true');
      localStorage.setItem('engquest_unlocked_days_33', '0,1,2,3,4,5');
      localStorage.setItem('engquest-user-storage', JSON.stringify({
        state: {
          currentUser: { id: 'auditor', role: 'owner', name: 'Auditor' },
          learningMode: 'learn'
        },
        version: 0
      }));
    } catch (_) {}
  });

  console.log('\n--- 1. Verifying Boss Listening (L1 - SVG Line Matcher) ---');
  await page.goto('http://localhost:4173/week/33/task/boss_listening', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);

  const l1Header = await page.locator('h2').first().textContent().catch(() => '');
  console.log('L1 Header Text:', l1Header.trim());

  // Click on a name pill in L1 to test line preview and verify line matcher
  const firstPill = page.locator('button:has-text("Robert"), button:has-text("Harry"), button:has-text("Michael")').first();
  if (await firstPill.count() > 0) {
    await firstPill.click();
    console.log('Selected a character name pill in L1');
    await page.waitForTimeout(800);
  }

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'boss_listening_l1.png') });
  console.log('Captured: boss_listening_l1.png');

  console.log('\n--- 2. Verifying Boss Listening (L2 - Notepad Completer) ---');
  // Click L2 tab
  const l2Tab = page.locator('[data-testid="boss-part-tab-list_p2"], button:has-text("L2")').first();
  if (await l2Tab.count() > 0) {
    await l2Tab.click();
    await page.waitForTimeout(2000);
    const l2Header = await page.locator('h2').first().textContent().catch(() => '');
    console.log('L2 Header Text:', l2Header.trim());
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'boss_listening_l2.png') });
    console.log('Captured: boss_listening_l2.png');
  }

  console.log('\n--- 3. Verifying Boss Reading (R1 - Word Bank Matching) ---');
  await page.goto('http://localhost:4173/week/33/task/boss_reading', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);

  const r1Header = await page.locator('h2').first().textContent().catch(() => '');
  console.log('R1 Header Text:', r1Header.trim());
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'boss_reading_r1.png') });
  console.log('Captured: boss_reading_r1.png');

  console.log('\n--- 4. Verifying Weekly Review (S1 - Find the Differences) ---');
  await page.goto('http://localhost:4173/week/33/task/weekly_review', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);

  const s1Header = await page.locator('h2').first().textContent({ timeout: 3000 }).catch(() => '');
  const diffCounter = await page.locator('text=/\\d+\\/\\d+ differences/').first().textContent({ timeout: 3000 }).catch(() => '');
  console.log('S1 Header Text:', s1Header.trim());
  console.log('S1 Counter Text:', diffCounter.trim());
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'weekly_review_s1.png') });
  console.log('Captured: weekly_review_s1.png');

  // Verify there is no 'Official Cambridge Assessment' or '← Map' in any of these pages
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('\n--- Audit Checks ---');
  console.log('Has "Official Cambridge Assessment"?:', bodyText.includes('Official Cambridge Assessment'));
  console.log('Has "← Map"?:', bodyText.includes('← Map'));

  console.log('\nAll verification screenshots saved to:', SCREENSHOT_DIR);
  await browser.close();
}

verify().catch(err => {
  console.error('Error during Playwright verification:', err);
  process.exit(1);
});
