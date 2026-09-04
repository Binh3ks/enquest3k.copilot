import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

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

  // Desktop Table A
  const imgTableADesktop = path.join(ARTIFACT_DIR, 'info_exchange_desktop_table_a.png');
  await page.screenshot({ path: imgTableADesktop, fullPage: false });
  console.log(`📸 Saved Desktop Table A: ${imgTableADesktop}`);

  // Switch to Table B
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btnB = btns.find(b => b.textContent.includes('Table B'));
    if (btnB) btnB.click();
  });
  await page.waitForTimeout(1000);

  // Desktop Table B
  const imgTableBDesktop = path.join(ARTIFACT_DIR, 'info_exchange_desktop_table_b.png');
  await page.screenshot({ path: imgTableBDesktop, fullPage: false });
  console.log(`📸 Saved Desktop Table B: ${imgTableBDesktop}`);

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

  // Mobile Table A
  const imgTableAMobile = path.join(ARTIFACT_DIR, 'info_exchange_mobile_table_a.png');
  await mobilePage.screenshot({ path: imgTableAMobile, fullPage: false });
  console.log(`📸 Saved Mobile Table A: ${imgTableAMobile}`);

  // Switch to Table B
  await mobilePage.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btnB = btns.find(b => b.textContent.includes('Table B'));
    if (btnB) btnB.click();
  });
  await mobilePage.waitForTimeout(1000);

  // Mobile Table B
  const imgTableBMobile = path.join(ARTIFACT_DIR, 'info_exchange_mobile_table_b.png');
  await mobilePage.screenshot({ path: imgTableBMobile, fullPage: false });
  console.log(`📸 Saved Mobile Table B: ${imgTableBMobile}`);

  await browser.close();
  console.log('✅ All screenshots captured successfully!');
}

captureScreenshots().catch(err => {
  console.error('❌ Error capturing screenshots:', err);
  process.exit(1);
});
