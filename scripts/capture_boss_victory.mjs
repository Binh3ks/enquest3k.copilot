/**
 * Direct Boss Victory Screen Capture
 */
import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:5173';
const WEEK = 33;

async function captureBossVictory() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 412, height: 915 }, isMobile: true });

  await context.addInitScript(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');
  });

  const page = await context.newPage();
  await page.goto(`${BASE_URL}/week/${WEEK}/task/boss_listening`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  // Click start battle
  await page.click('button:has-text("ENTER BOSS BATTLE NOW")');
  await page.waitForTimeout(1000);

  // Direct complete all 3 tasks via DOM click / triggers
  await page.click('button:has-text("Check Line Matches")');
  await page.waitForTimeout(1000);

  await page.click('button:has-text("Check Notes")');
  await page.waitForTimeout(1000);

  // For visual matching, select item 1 & card A, then submit
  await page.evaluate(() => {
    // Select first item
    const itemBtn = document.querySelector('div[class*="space-y"] button');
    if (itemBtn) itemBtn.click();
    // Select first card
    const cardBtn = document.querySelector('div[class*="grid"] button');
    if (cardBtn) cardBtn.click();
  });
  await page.waitForTimeout(500);

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const checkBtn = btns.find(b => b.textContent.includes('Check Visual Matches') || b.textContent.includes('Check'));
    if (checkBtn) checkBtn.click();
  });
  await page.waitForTimeout(2000);

  const victorySnippet = await page.evaluate(() => document.body.innerText.slice(0, 400).replace(/\n+/g, ' '));
  console.log('Victory text:', victorySnippet);
  await page.screenshot({ path: 'scripts/qa_w33_golden_master_boss_victory.png' });

  await browser.close();
}

captureBossVictory().catch(e => { console.error('Fatal:', e); process.exit(1); });
