/**
 * Exact Real UI Playwright Execution for All 5 Patched Quests
 * Fully automated runtime interaction handling Recording & Finish flows!
 */
import { chromium } from 'playwright';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const WEEK = parseInt(process.argv[2]?.replace('--week', '').trim() || process.argv[2] || '33', 10);

async function testRealUI5PatchedQuests() {
  console.log('============================================================');
  console.log(`🧪 TESTING ROBUST RUNTIME UI FOR WEEK ${WEEK} (5 PATCHED QUESTS)`);
  console.log('============================================================');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 412, height: 915 },
    isMobile: true,
  });

  const page = await context.newPage();

  // Reset store to zero completed quests
  await page.goto(`${BASE_URL}/week/${WEEK}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  await page.evaluate((targetWeek) => {
    localStorage.clear();
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');
    localStorage.setItem('engquest_onboarding_completed', 'true');
    localStorage.setItem('lexio_welcome_dismissed', 'true');

    const initialUserStore = {
      state: {
        currentUser: { name: 'Học sinh', role: 'student' },
        userXP: 1250,
        xp: 1250,
        progressCache: {},
        weekCompletion: {},
        weekStars: {}
      },
      version: 2
    };
    localStorage.setItem('engquest-user-storage', JSON.stringify(initialUserStore));

    const initialDailyQuestStore = {
      state: {
        completedQuests: { [`w${targetWeek}`]: {} },
        dailyBonusClaimed: {}
      },
      version: 1
    };
    localStorage.setItem('engquest-daily-quest', JSON.stringify(initialDailyQuestStore));
  }, WEEK);

  const results = {};

  // ── 1. boss_reading (/week/33/task/boss_reading) ──
  console.log('\n--- 1. Testing boss_reading Real UI ---');
  await page.goto(`${BASE_URL}/week/${WEEK}/task/boss_reading`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const startBossBtn = await page.$('button:has-text("ENTER BOSS BATTLE NOW")');
  if (startBossBtn) {
    await startBossBtn.click();
    await page.waitForTimeout(1200);
  }

  const notepadInputs = await page.$$('input[placeholder*="Type note answer"]');
  for (let i = 0; i < notepadInputs.length; i++) {
    await notepadInputs[i].fill('corridor');
  }

  const checkBossBtn = await page.$('button:has-text("Check Answers"), button:has-text("Check")');
  if (checkBossBtn) {
    await checkBossBtn.click();
    await page.waitForTimeout(1500);
  }

  const qState1 = await page.evaluate((targetWeek) => {
    const dq = JSON.parse(localStorage.getItem('engquest-daily-quest') || '{}');
    return dq.state?.completedQuests?.[`w${targetWeek}`] || {};
  }, WEEK);
  console.log(`  completedQuests.w${WEEK} after boss_reading:`, JSON.stringify(qState1));
  results.boss_reading = Boolean(qState1.boss_reading);

  // ── 2. story_writer (/week/33/task/story_writer) ──
  console.log('\n--- 2. Testing story_writer Real UI ---');
  await page.goto(`${BASE_URL}/week/${WEEK}/task/story_writer`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  for (let p = 0; p < 3; p++) {
    const pills = await page.$$('button:has-text("corridor"), button:has-text("walking"), button:has-text("slipped"), button:has-text("wet floor"), button:has-text("nurse"), button:has-text("lion"), button:has-text("mouse"), button:has-text("forest")');
    if (pills.length > 0) {
      await pills[0].click();
      await page.waitForTimeout(300);
    }
    const nextBtn = await page.$('button:has-text("Next: Panel"), button:has-text("Review Full Story")');
    if (nextBtn) {
      await nextBtn.click();
      await page.waitForTimeout(500);
    }
  }

  const submitStoryBtn = await page.$('button:has-text("Submit My Story")');
  if (submitStoryBtn) {
    await submitStoryBtn.click();
    await page.waitForTimeout(1500);
  }

  const qState2 = await page.evaluate((targetWeek) => {
    const dq = JSON.parse(localStorage.getItem('engquest-daily-quest') || '{}');
    return dq.state?.completedQuests?.[`w${targetWeek}`] || {};
  }, WEEK);
  console.log(`  completedQuests.w${WEEK} after story_writer:`, JSON.stringify(qState2));
  results.story_writer = Boolean(qState2.story_writer);

  // ── 3. science_report (/week/33/task/science_report) ──
  console.log('\n--- 3. Testing science_report Real UI ---');
  await page.goto(`${BASE_URL}/week/${WEEK}/task/science_report`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Step 1
  await page.fill('textarea', 'The animals helped each other in the forest.');
  await page.waitForTimeout(300);
  const nextStep2 = await page.$('button:has-text("Next Step")');
  if (nextStep2) await nextStep2.click();
  await page.waitForTimeout(500);

  // Step 2
  await page.fill('textarea', 'The tiny mouse chewed the heavy net to save the lion.');
  await page.waitForTimeout(300);
  const nextStep3 = await page.$('button:has-text("Next Step")');
  if (nextStep3) await nextStep3.click();
  await page.waitForTimeout(500);

  // Step 3
  await page.fill('textarea', 'Helping friends makes everyone happy and safe.');
  await page.waitForTimeout(300);
  const finishReportBtn = await page.$('button:has-text("Submit Scientific Report"), button:has-text("Submit Report")');
  if (finishReportBtn) {
    await finishReportBtn.click();
    await page.waitForTimeout(1500);
  }

  const qState3 = await page.evaluate((targetWeek) => {
    const dq = JSON.parse(localStorage.getItem('engquest-daily-quest') || '{}');
    return dq.state?.completedQuests?.[`w${targetWeek}`] || {};
  }, WEEK);
  console.log(`  completedQuests.w${WEEK} after science_report:`, JSON.stringify(qState3));
  results.science_report = Boolean(qState3.science_report);

  // ── 4. broadcast_studio (/week/33/task/broadcast_studio) ──
  console.log('\n--- 4. Testing broadcast_studio Real UI ---');
  await page.goto(`${BASE_URL}/week/${WEEK}/task/broadcast_studio`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const startRecordBtn = await page.$('button:has-text("Start Recording Podcast")');
  if (startRecordBtn) {
    await startRecordBtn.click();
    console.log('  Waiting 3s for recording countdown & capture...');
    await page.waitForTimeout(3500);
  }

  const completeBroadcastBtn = await page.$('button:has-text("Complete Video Challenge")');
  if (completeBroadcastBtn) {
    await completeBroadcastBtn.click();
    await page.waitForTimeout(1500);
  }

  const qState4 = await page.evaluate((targetWeek) => {
    const dq = JSON.parse(localStorage.getItem('engquest-daily-quest') || '{}');
    return dq.state?.completedQuests?.[`w${targetWeek}`] || {};
  }, WEEK);
  console.log(`  completedQuests.w${WEEK} after broadcast_studio:`, JSON.stringify(qState4));
  results.broadcast_studio = Boolean(qState4.broadcast_studio);

  // ── 5. info_exchange (/week/N/task/info_exchange) ──
  console.log(`\n--- 5. Testing info_exchange Real UI ---`);
  await page.goto(`${BASE_URL}/week/${WEEK}/task/info_exchange`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const finishExchangeBtn = await page.$('button:has-text("Finish Speaking Task"), button:has-text("Finish Quest")');
  if (finishExchangeBtn) {
    await finishExchangeBtn.click();
    await page.waitForTimeout(1500);
  }

  const qState5 = await page.evaluate((targetWeek) => {
    const dq = JSON.parse(localStorage.getItem('engquest-daily-quest') || '{}');
    return dq.state?.completedQuests?.[`w${targetWeek}`] || {};
  }, WEEK);
  console.log(`  completedQuests.w${WEEK} after info_exchange:`, JSON.stringify(qState5));
  results.info_exchange = Boolean(qState5.info_exchange);

  console.log('\n============================================================');
  console.log('📊 FINAL RUNTIME TEST SUMMARY FOR ALL 5 PATCHED QUESTS:');
  console.log(JSON.stringify(results, null, 2));
  console.log('All 5 Patched Quests PASSED Runtime UI Test:', Object.values(results).every(Boolean) ? 'YES ✅' : 'NO ❌');
  console.log('============================================================');

  // Save screenshot of final sidebar/quest state for empirical proof
  await page.goto(`${BASE_URL}/week/${WEEK}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'scripts/qa_w33_5_patched_quests_runtime_verified.png' });
  console.log('📸 Saved verification screenshot to scripts/qa_w33_5_patched_quests_runtime_verified.png');

  await browser.close();
}

testRealUI5PatchedQuests().catch(e => { console.error('Fatal:', e); process.exit(1); });
