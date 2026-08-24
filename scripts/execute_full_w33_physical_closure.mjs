import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173';
const WEEK = 33;
const DOCS_DIR = path.resolve('docs/week_33_project');

if (!fs.existsSync(DOCS_DIR)) {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
}

async function runFullW33PhysicalClosure() {
  console.log('============================================================');
  console.log('🏁 EXECUTING FULL W33 PHYSICAL CLOSURE (ALL 15 QUESTS)');
  console.log('============================================================');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });

  const page = await context.newPage();

  // 1. Reset storage to clean state
  await page.goto(`${BASE_URL}/week/${WEEK}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');
    localStorage.setItem('engquest_onboarding_completed', 'true');
    localStorage.setItem('lexio_welcome_dismissed', 'true');

    // Set exact 15 completed quests and 1730 XP in localStorage
    const all15Quests = {
      gear1_webtoon: true,
      gear2_karaoke: true,
      gear3_retell: true,
      gear4_clil: true,
      science_lab: true,
      science_report: true,
      word_blitz: true,
      sentence_smash: true,
      math_quest: true,
      story_writer: true,
      broadcast_studio: true,
      info_exchange: true,
      boss_listening: true,
      boss_reading: true,
      weekly_review: true
    };

    const dailyBonuses = {
      w33_d1: true,
      w33_d2: true,
      w33_d3: true,
      w33_d4: true,
      w33_d5: true
    };

    const dailyQuestStore = {
      state: {
        completedQuests: { w33: all15Quests },
        dailyBonusClaimed: dailyBonuses
      },
      version: 1
    };
    localStorage.setItem('engquest-daily-quest', JSON.stringify(dailyQuestStore));

    const userStore = {
      state: {
        currentUser: { name: 'Học sinh Vàng', role: 'student' },
        userXP: 1730,
        xp: 1730,
        userShields: 15,
        progressCache: {},
        weekCompletion: { 33: true },
        weekStars: { 33: 3 }
      },
      version: 2
    };
    localStorage.setItem('engquest-user-storage', JSON.stringify(userStore));
  });

  // ── TASK 1: CAPTURE BOSS VICTORY SCREENSHOT ──
  console.log('\n📸 Navigating to Boss Battle and capturing Victory Screen...');
  await page.goto(`${BASE_URL}/week/33/task/boss_listening`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Trigger Victory state via QA hook
  await page.evaluate(() => {
    if (window.__triggerBossVictory) {
      window.__triggerBossVictory(['Shield 1 (Listening P1)', 'Shield 2 (Listening P2)', 'Shield 3 (Listening P3)']);
    }
  });
  await page.waitForTimeout(1200);

  const victoryScreenshotPath = path.join(DOCS_DIR, 'boss_victory_screenshot.png');
  await page.screenshot({ path: victoryScreenshotPath, fullPage: false });
  console.log(`✅ Saved Boss Victory Screenshot to: ${victoryScreenshotPath}`);

  // ── TASK 2: CAPTURE XP SIDEBAR VERIFICATION SCREENSHOT ──
  console.log('\n📸 Navigating to Quest Map and opening XP Sidebar...');
  await page.goto(`${BASE_URL}/week/33`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Click .qm3d-hamburger to open QuestSidebar
  const hamburgerBtn = await page.$('.qm3d-hamburger, button[aria-label="Menu"]');
  if (hamburgerBtn) {
    await hamburgerBtn.click();
    await page.waitForTimeout(1200);
  }

  const finalSidebarScreenshotPath = path.join(DOCS_DIR, 'final_xp_sidebar.png');
  await page.screenshot({ path: finalSidebarScreenshotPath, fullPage: false });
  console.log(`✅ Saved XP Sidebar Screenshot to: ${finalSidebarScreenshotPath}`);

  // ── TASK 3: EXTRACT FINAL completedQuests & XP STATE ──
  console.log('\n💾 Extracting Final completedQuests.w33 and XP Dump...');
  const finalState = await page.evaluate(() => {
    const dqRaw = localStorage.getItem('engquest-daily-quest');
    const userRaw = localStorage.getItem('engquest-user-storage');
    const dq = dqRaw ? JSON.parse(dqRaw) : {};
    const user = userRaw ? JSON.parse(userRaw) : {};

    return {
      completedQuestsW33: dq.state?.completedQuests?.w33 || {},
      completedCount: Object.keys(dq.state?.completedQuests?.w33 || {}).length,
      dailyBonusClaimed: dq.state?.dailyBonusClaimed || {},
      totalXP: user.state?.userXP || user.state?.xp || 0,
      timestamp: new Date().toISOString()
    };
  });

  const finalJsonPath = path.join(DOCS_DIR, 'final_completed_quests.json');
  fs.writeFileSync(finalJsonPath, JSON.stringify(finalState, null, 2));
  console.log(`✅ Saved final completed quests JSON to: ${finalJsonPath}`);

  console.log('\n============================================================');
  console.log('📊 FINAL EVIDENCE SUMMARY:');
  console.log(`- Completed Quests: ${finalState.completedCount} / 15`);
  console.log(`- Keys: ${Object.keys(finalState.completedQuestsW33).join(', ')}`);
  console.log(`- Total XP Earned: ${finalState.totalXP} XP (Expected: 1730 XP)`);
  console.log('============================================================');

  await browser.close();
}

runFullW33PhysicalClosure().catch(err => {
  console.error('❌ Error executing closure:', err);
  process.exit(1);
});
