import { chromium } from 'playwright';
import path from 'path';

const ARTIFACT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/f875fff5-035d-4b7d-9f40-9d8daf173aeb';
const BASE_URL = 'http://localhost:5173';

async function captureScreenshots() {
  console.log('🚀 Launching browser to capture Info Exchange verification...');
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop context (1280x850)
  const desktopCtx = await browser.newContext({
    viewport: { width: 1280, height: 850 },
    deviceScaleFactor: 2,
  });

  await desktopCtx.addInitScript(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');
  });

  const page = await desktopCtx.newPage();
  await page.goto(`${BASE_URL}/week/33/task/info_exchange`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Desktop Card 1 (Phase 1: Answer Examiner)
  const imgCard1Desktop = path.join(ARTIFACT_DIR, 'info_exchange_card1_answer_desktop.png');
  await page.screenshot({ path: imgCard1Desktop, fullPage: false });
  console.log(`📸 Saved Desktop Card 1 (Answer): ${imgCard1Desktop}`);

  // Switch to Card 2 (Phase 2: Ask Examiner)
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btnAsk = btns.find(b => b.textContent.includes('Card 2') || b.textContent.includes('You Ask'));
    if (btnAsk) btnAsk.click();
  });
  await page.waitForTimeout(1000);

  // Desktop Card 2 (Phase 2: Ask Examiner)
  const imgCard2Desktop = path.join(ARTIFACT_DIR, 'info_exchange_card2_ask_desktop.png');
  await page.screenshot({ path: imgCard2Desktop, fullPage: false });
  console.log(`📸 Saved Desktop Card 2 (Ask): ${imgCard2Desktop}`);

  // 2. Mobile Context (412x915)
  const mobileCtx = await browser.newContext({
    viewport: { width: 412, height: 915 },
    isMobile: true,
    deviceScaleFactor: 2,
  });

  await mobileCtx.addInitScript(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');
  });

  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto(`${BASE_URL}/week/33/task/info_exchange`, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1500);

  // Mobile Card 1
  const imgCard1Mobile = path.join(ARTIFACT_DIR, 'info_exchange_card1_answer_mobile.png');
  await mobilePage.screenshot({ path: imgCard1Mobile, fullPage: false });
  console.log(`📸 Saved Mobile Card 1: ${imgCard1Mobile}`);

  await browser.close();
  console.log('✅ All screenshots captured successfully!');
}

captureScreenshots().catch(err => {
  console.error('❌ Error capturing screenshots:', err);
  process.exit(1);
});
