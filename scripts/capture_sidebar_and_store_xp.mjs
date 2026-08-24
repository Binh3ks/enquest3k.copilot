/**
 * Capture exact XP display in QuestSidebar and Nova Mascot Store
 */
import { chromium } from 'playwright';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const WEEK = 33;

async function captureXPDisplays() {
  console.log('============================================================');
  console.log('📸 CAPTURING REAL USER XP DISPLAY (SIDEBAR & STORE)');
  console.log('============================================================');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 412, height: 915 },
    isMobile: true,
  });

  await context.addInitScript(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');

    // Set exact User XP = 1625 in store
    const userStore = {
      state: {
        currentUser: { name: 'Bình Nguyễn', role: 'student' },
        xp: 1625,
        userXP: 1625,
        progressCache: { 33: {} },
        weekCompletion: { 33: 100 },
        weekStars: { 33: { totalStars: 45, maxStars: 45, percentage: 100 } }
      },
      version: 2
    };
    localStorage.setItem('engquest-user-storage', JSON.stringify(userStore));
  });

  const page = await context.newPage();
  try {
    await page.goto(`${BASE_URL}/week/${WEEK}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // 1. Open Sidebar via Hamburger button
    console.log('  Opening Quest Sidebar...');
    await page.click('.qm3d-hamburger, button[aria-label="Menu"]');
    await page.waitForTimeout(1000);

    const sidebarXPInfo = await page.evaluate(() => {
      const text = document.body.innerText;
      const xpMatch = text.match(/XP:\s*(\d+)/i) || text.match(/(\d+)\s*XP/i);
      const levelMatch = text.match(/Level\s*(\d+)/i);
      return {
        hasXP: !!xpMatch,
        xpText: xpMatch ? xpMatch[0] : 'N/A',
        levelText: levelMatch ? levelMatch[0] : 'N/A',
        snippet: text.slice(0, 300).replace(/\n+/g, ' ')
      };
    });

    console.log(`  Sidebar XP Detected: XP="${sidebarXPInfo.xpText}", Level="${sidebarXPInfo.levelText}"`);
    await page.screenshot({ path: 'scripts/qa_w33_sidebar_real_xp_display.png' });

  } finally {
    await page.close();
  }

  await browser.close();
  console.log('✅ Captured screenshot: scripts/qa_w33_sidebar_real_xp_display.png');
}

captureXPDisplays().catch(e => { console.error('Fatal:', e); process.exit(1); });
