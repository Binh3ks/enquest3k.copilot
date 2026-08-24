/**
 * Exact Progress & Completion Aggregation Audit
 */
import { chromium } from 'playwright';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const WEEK = 33;

async function testProgressAggregation() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 412, height: 915 }, isMobile: true });

  await context.addInitScript(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');
  });

  const page = await context.newPage();
  await page.goto(`${BASE_URL}/week/${WEEK}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // 1. Initial State
  const initial = await page.evaluate(() => {
    const dailyQuest = JSON.parse(localStorage.getItem('engquest-daily-quest') || '{}');
    const userStore = JSON.parse(localStorage.getItem('engquest-user-storage') || '{}');
    return {
      completedQuestsW33: Object.keys(dailyQuest.state?.completedQuests?.w33 || {}),
      progressCacheW33: userStore.state?.progressCache?.[33] || {}
    };
  });

  console.log('Initial W33 Progress:', JSON.stringify(initial));

  // 2. Simulate completing Zone 2 Math Quest (25 PTS) and Word Blitz (25 PTS)
  console.log('Completing Math Quest (25 PTS) & Word Blitz (25 PTS)...');
  await page.evaluate(() => {
    // 1. Update daily quest store
    const dailyQuest = JSON.parse(localStorage.getItem('engquest-daily-quest') || '{}');
    if (!dailyQuest.state) dailyQuest.state = {};
    if (!dailyQuest.state.completedQuests) dailyQuest.state.completedQuests = {};
    if (!dailyQuest.state.completedQuests.w33) dailyQuest.state.completedQuests.w33 = {};
    dailyQuest.state.completedQuests.w33.word_blitz = true;
    dailyQuest.state.completedQuests.w33.math_quest = true;
    dailyQuest.state.completedQuests.w33.sentence_smash = true;
    localStorage.setItem('engquest-daily-quest', JSON.stringify(dailyQuest));

    // 2. Update user store progress cache
    const userStore = JSON.parse(localStorage.getItem('engquest-user-storage') || '{}');
    if (!userStore.state) userStore.state = {};
    if (!userStore.state.progressCache) userStore.state.progressCache = {};
    if (!userStore.state.progressCache[33]) userStore.state.progressCache[33] = {};
    userStore.state.progressCache[33].word_blitz = { isCompleted: true, score: 25 };
    userStore.state.progressCache[33].math_quest = { isCompleted: true, score: 25 };
    userStore.state.progressCache[33].sentence_smash = { isCompleted: true, score: 25 };
    localStorage.setItem('engquest-user-storage', JSON.stringify(userStore));
  });

  // Reload to reflect in UI
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const updated = await page.evaluate(() => {
    const dailyQuest = JSON.parse(localStorage.getItem('engquest-daily-quest') || '{}');
    const userStore = JSON.parse(localStorage.getItem('engquest-user-storage') || '{}');
    const w33Quests = Object.keys(dailyQuest.state?.completedQuests?.w33 || {});
    const cacheEntries = Object.entries(userStore.state?.progressCache?.[33] || {});
    const totalZone2Score = cacheEntries.reduce((sum, [k, v]) => sum + (v.score || 0), 0);

    return {
      completedQuestsCount: w33Quests.length,
      completedQuestsList: w33Quests,
      totalZone2Score,
      cacheDetails: userStore.state?.progressCache?.[33]
    };
  });

  console.log('Updated W33 Progress:', JSON.stringify(updated, null, 2));
  await page.screenshot({ path: 'scripts/qa_zone4_progress_aggregation_verified.png' });

  await browser.close();

  fs.writeFileSync('scripts/qa_zone4_aggregation_final.json', JSON.stringify({ initial, updated }, null, 2));
}

testProgressAggregation().catch(e => { console.error('Fatal:', e); process.exit(1); });
