/**
 * Full Week 33 (15 Quests / 4 Zones) End-to-End Aggregation & Visual UI Verification
 */
import { chromium } from 'playwright';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const WEEK = 33;

const ALL_15_QUESTS = [
  'gear1_webtoon', 'gear2_karaoke', 'gear3_retell',
  'gear4_clil', 'science_lab', 'science_report',
  'word_blitz', 'sentence_smash', 'math_quest',
  'story_writer', 'broadcast_studio', 'info_exchange',
  'boss_listening', 'boss_reading', 'weekly_review'
];

async function verifyFullWeekUIAggregation() {
  console.log('============================================================');
  console.log('👑 FULL WEEK 33 (15 QUESTS / 4 ZONES) UI AGGREGATION AUDIT');
  console.log('============================================================');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 412, height: 915 },
    isMobile: true,
  });

  // Inject 100% completed state across all 15 Quests for Week 33
  await context.addInitScript((quests) => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');

    // Daily quest store: all 15 quests completed
    const dailyQuest = {
      state: {
        completedQuests: {
          w33: Object.fromEntries(quests.map(q => [q, true]))
        },
        weekStartDates: { w33: new Date().toISOString().slice(0, 10) },
        dailyBonusClaimed: { w33_d1: true, w33_d2: true, w33_d3: true, w33_d4: true, w33_d5: true }
      },
      version: 0
    };
    localStorage.setItem('engquest-daily-quest', JSON.stringify(dailyQuest));

    // User store progress cache: scores recorded across all stations
    const userStore = {
      state: {
        userXP: 1625, // 1250 base + 375 XP (15 quests x 25 pts)
        progressCache: {
          33: Object.fromEntries(quests.map(q => [q, { isCompleted: true, score: 25, stars: 3 }]))
        },
        weekCompletion: { 33: 100 },
        weekStars: { 33: { totalStars: 45, maxStars: 45, percentage: 100 } }
      },
      version: 2
    };
    localStorage.setItem('engquest-user-storage', JSON.stringify(userStore));
  }, ALL_15_QUESTS);

  const results = {};

  // =========================================================================
  // 1. QUEST MAP 3D UI VERIFICATION (15/15 Quests Done Header)
  // =========================================================================
  console.log('\n--- 1. QUEST MAP 3D UI (Full 15/15 Quests Visual Check) ---');
  const pageMap = await context.newPage();
  try {
    await pageMap.goto(`${BASE_URL}/week/${WEEK}`, { waitUntil: 'domcontentloaded' });
    await pageMap.waitForTimeout(2500);

    const mapUIState = await pageMap.evaluate(() => {
      const badgeText = document.querySelector('.qm3d-week-badge')?.textContent?.trim() || '';
      const progressText = document.querySelector('.qm3d-progress-text')?.textContent?.trim() || '';
      const completedStations = document.querySelectorAll('.qm3d-station.done').length;

      return {
        badgeText,
        progressText,
        completedStationsCount: completedStations,
        has15Of15: badgeText.includes('15/15') || progressText === '15/15',
        total5StationsDone: completedStations === 5
      };
    });

    console.log(`  Quest Map UI: Badge="${mapUIState.badgeText}", Progress="${mapUIState.progressText}", Completed Stations=${mapUIState.completedStationsCount}/5`);
    await pageMap.screenshot({ path: 'scripts/qa_w33_golden_master_questmap_15of15.png' });
    results.quest_map_15_of_15 = mapUIState;
  } finally {
    await pageMap.close();
  }

  // =========================================================================
  // 2. BOSS BATTLE VICTORY & ROTARY SHIELDS SCREEN UI VERIFICATION
  // =========================================================================
  console.log('\n--- 2. BOSS BATTLE VICTORY (Cycle 1 / 3 Shields Result Screen) ---');
  const pageBoss = await context.newPage();
  try {
    await pageBoss.goto(`${BASE_URL}/week/${WEEK}/task/boss_listening`, { waitUntil: 'domcontentloaded' });
    await pageBoss.waitForTimeout(1500);

    await pageBoss.click('button:has-text("ENTER BOSS BATTLE NOW")');
    await pageBoss.waitForTimeout(1000);

    // Fast-complete Task 1 (Draw Lines)
    await pageBoss.click('button:has-text("Check Line Matches")');
    await pageBoss.waitForTimeout(1000);

    // Fast-complete Task 2 (Notes)
    const checkNotesBtn = pageBoss.locator('button:has-text("Check Notes")').first();
    if (await checkNotesBtn.isVisible()) {
      await checkNotesBtn.click();
      await pageBoss.waitForTimeout(1000);
    }

    // Task 3: Match 1 item then check visual matches
    console.log('  Completing Task 3 (Visual Matching A-H)...');
    const item1 = pageBoss.locator('button:has-text("Clean Bandage"), div:has-text("Clean Bandage")').first();
    if (await item1.isVisible()) await item1.click();
    await pageBoss.waitForTimeout(300);

    const cardA = pageBoss.locator('button:has-text("First Aid Table"), button:has-text("Medical Cabinet"), div[class*="grid"] button').first();
    if (await cardA.isVisible()) await cardA.click();
    await pageBoss.waitForTimeout(500);

    const checkTask3Btn = pageBoss.locator('button:has-text("Check Visual Matches"), button:has-text("Check")').first();
    if (await checkTask3Btn.isVisible()) {
      await checkTask3Btn.click();
      await pageBoss.waitForTimeout(1500);
    }

    const victoryState = await pageBoss.evaluate(() => {
      const text = document.body.innerText;
      const hasVictory = text.includes('BOSS BATTLE VICTORY') || text.includes('Official Cambridge');
      const shields = Array.from(document.querySelectorAll('div')).filter(d => d.textContent.includes('Shield Earned')).map(d => d.textContent.trim());

      return {
        hasVictory,
        shieldsCount: shields.length,
        shieldsList: shields.slice(0, 3),
        victorySnippet: text.slice(0, 350).replace(/\n+/g, ' ')
      };
    });

    console.log(`  Boss Victory Screen: VictoryHeader=${victoryState.hasVictory}, ShieldsEarned=${victoryState.shieldsCount}`);
    await pageBoss.screenshot({ path: 'scripts/qa_w33_golden_master_boss_victory.png' });
    results.boss_victory_screen = victoryState;
  } finally {
    await pageBoss.close();
  }

  await browser.close();

  fs.writeFileSync('scripts/qa_w33_golden_master_aggregation_report.json', JSON.stringify(results, null, 2));

  console.log('\n============================================================');
  console.log('👑 FULL WEEK 33 GOLDEN MASTER AGGREGATION AUDIT COMPLETE');
  console.log('============================================================');
  console.log(JSON.stringify(results, null, 2));
}

verifyFullWeekUIAggregation().catch(e => { console.error('Fatal:', e); process.exit(1); });
