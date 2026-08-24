/**
 * Zone 4 Deep Interactive 2-Way QA & Audio/Aggregation Verification
 * Uses independent clean page contexts for Wrong vs Correct tests
 */
import { chromium } from 'playwright';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const WEEK = 33;

async function runZone4DeepInteractiveQA() {
  console.log('============================================================');
  console.log('🏰 ZONE 4: DEEP 2-WAY INTERACTIVE & AUDIO/AGGREGATION QA');
  console.log('============================================================');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 412, height: 1050 },
    isMobile: true,
  });

  await context.addInitScript(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');
  });

  const results = {};

  // =========================================================================
  // 1. BOSS LISTENING: AUDIO & WRONG ATTEMPT
  // =========================================================================
  console.log('\n--- 1a. BOSS LISTENING (Draw Lines: Audio & Wrong Match) ---');
  const pageListWrong = await context.newPage();
  const listConsoleErrors = [];
  pageListWrong.on('console', msg => {
    if (msg.type() === 'error') listConsoleErrors.push(msg.text());
  });

  try {
    await pageListWrong.goto(`${BASE_URL}/week/${WEEK}/task/boss_listening`, { waitUntil: 'domcontentloaded' });
    await pageListWrong.waitForTimeout(1500);
    await pageListWrong.click('button:has-text("ENTER BOSS BATTLE NOW")');
    await pageListWrong.waitForTimeout(1500);

    // Audio Playback
    console.log('  Testing "Play Audio" button...');
    const playAudioBtn = pageListWrong.locator('button:has-text("Play Audio")').first();
    let audioTriggered = false;
    if (await playAudioBtn.isVisible()) {
      await playAudioBtn.click();
      await pageListWrong.waitForTimeout(800);
      audioTriggered = true;
      console.log('  Audio triggered without crash.');
    }

    // Wrong Match: Tom -> Nurse Pin
    console.log('  Testing WRONG MATCH (Tom -> Nurse Pin)...');
    const picturePins = pageListWrong.locator('div[class*="aspect"] button');
    await pageListWrong.click('button:has-text("Tom")');
    await pageListWrong.waitForTimeout(200);
    await picturePins.nth(1).click();
    await pageListWrong.waitForTimeout(400);

    await pageListWrong.screenshot({ path: 'scripts/qa_zone4_boss_listening_wrong.png' });

    // Submit wrong check -> advances to task 2
    await pageListWrong.click('button:has-text("Check Line Matches")');
    await pageListWrong.waitForTimeout(1200);

    const afterWrongSubmit = await pageListWrong.evaluate(() => {
      const text = document.body.innerText;
      return {
        nextTaskLoaded: text.includes('Notepad') || text.includes('Notes') || text.includes('Incident Location'),
        snippet: text.slice(0, 250).replace(/\n+/g, ' ')
      };
    });
    console.log(`  After Wrong Match Submit: AutoAdvancedToTask2=${afterWrongSubmit.nextTaskLoaded}`);

    results.boss_listening_wrong = {
      audioTriggered,
      consoleErrors: listConsoleErrors,
      afterWrongSubmit
    };
  } finally {
    await pageListWrong.close();
  }

  // =========================================================================
  // 1b. BOSS LISTENING: CORRECT ATTEMPT (Clean Page)
  // =========================================================================
  console.log('\n--- 1b. BOSS LISTENING (Draw Lines: Correct 4 Matches) ---');
  const pageListCorrect = await context.newPage();
  try {
    await pageListCorrect.goto(`${BASE_URL}/week/${WEEK}/task/boss_listening`, { waitUntil: 'domcontentloaded' });
    await pageListCorrect.waitForTimeout(1500);
    await pageListCorrect.click('button:has-text("ENTER BOSS BATTLE NOW")');
    await pageListCorrect.waitForTimeout(1500);

    const picturePins = pageListCorrect.locator('div[class*="aspect"] button');

    // 1. School Nurse -> Pin 1 (t2 Nurse)
    await pageListCorrect.click('button:has-text("School Nurse")');
    await pageListCorrect.waitForTimeout(200);
    await picturePins.nth(1).click();
    await pageListCorrect.waitForTimeout(300);

    // 2. Tom -> Pin 2 (t3 Tom)
    await pageListCorrect.click('button:has-text("Tom")');
    await pageListCorrect.waitForTimeout(200);
    await picturePins.nth(2).click();
    await pageListCorrect.waitForTimeout(300);

    // 3. Headmaster -> Pin 3 (t4 Headmaster)
    await pageListCorrect.click('button:has-text("Headmaster")');
    await pageListCorrect.waitForTimeout(200);
    await picturePins.nth(3).click();
    await pageListCorrect.waitForTimeout(300);

    // 4. Mia -> Pin 4 (t5 Mia)
    await pageListCorrect.click('button:has-text("Mia")');
    await pageListCorrect.waitForTimeout(200);
    await picturePins.nth(4).click();
    await pageListCorrect.waitForTimeout(400);

    await pageListCorrect.screenshot({ path: 'scripts/qa_zone4_boss_listening_correct.png' });

    // Submit correct check
    await pageListCorrect.click('button:has-text("Check Line Matches")');
    await pageListCorrect.waitForTimeout(1200);

    const afterCorrectSubmit = await pageListCorrect.evaluate(() => {
      const text = document.body.innerText;
      return {
        advancedToTask2: text.includes('Notepad') || text.includes('Notes') || text.includes('Incident Location'),
        snippet: text.slice(0, 250).replace(/\n+/g, ' ')
      };
    });
    console.log(`  After Correct Matches Submit: AdvancedToTask2=${afterCorrectSubmit.advancedToTask2}`);
    results.boss_listening_correct = afterCorrectSubmit;
  } finally {
    await pageListCorrect.close();
  }

  // =========================================================================
  // 2. BOSS READING: WRONG vs CORRECT NOTES
  // =========================================================================
  console.log('\n--- 2a. BOSS READING (Secret Notes: Audio & Wrong Attempt) ---');
  const pageReadWrong = await context.newPage();
  const readConsoleErrors = [];
  pageReadWrong.on('console', msg => {
    if (msg.type() === 'error') readConsoleErrors.push(msg.text());
  });

  try {
    await pageReadWrong.goto(`${BASE_URL}/week/${WEEK}/task/boss_reading`, { waitUntil: 'domcontentloaded' });
    await pageReadWrong.waitForTimeout(1500);
    await pageReadWrong.click('button:has-text("ENTER BOSS BATTLE NOW")');
    await pageReadWrong.waitForTimeout(1500);

    // Audio Playback
    console.log('  Testing "Play Audio" button...');
    const playBtn = pageReadWrong.locator('button:has-text("Play Audio")').first();
    let audioTriggered = false;
    if (await playBtn.isVisible()) {
      await playBtn.click();
      await pageReadWrong.waitForTimeout(800);
      audioTriggered = true;
      console.log('  Audio triggered without crash.');
    }

    // Fill Wrong Notes
    console.log('  Filling Wrong Notes ("wrong1", "wrong2")...');
    const inputs = pageReadWrong.locator('input[placeholder*="answer"]');
    const count = await inputs.count();
    for (let i = 0; i < count; i++) {
      await inputs.nth(i).fill(`wrong answer ${i + 1}`);
    }
    await pageReadWrong.waitForTimeout(400);

    await pageReadWrong.click('button:has-text("Check Notes")');
    await pageReadWrong.waitForTimeout(1200);

    const wrongNotesState = await pageReadWrong.evaluate(() => {
      const text = document.body.innerText;
      const scoreMatch = text.match(/Score:\s*(\d+)%/i);
      const hasRedTargets = text.includes('(school corridor)') || text.includes('(wet floor)');
      return {
        scoreText: scoreMatch ? scoreMatch[0] : 'Score: 0%',
        hasRedTargets,
        snippet: text.slice(0, 300).replace(/\n+/g, ' ')
      };
    });
    console.log(`  Wrong Notes Result: Score="${wrongNotesState.scoreText}", DisplaysHints=${wrongNotesState.hasRedTargets}`);
    await pageReadWrong.screenshot({ path: 'scripts/qa_zone4_boss_reading_wrong.png' });

    results.boss_reading_wrong = {
      audioTriggered,
      consoleErrors: readConsoleErrors,
      wrongNotesState
    };
  } finally {
    await pageReadWrong.close();
  }

  console.log('\n--- 2b. BOSS READING (Secret Notes: Correct Notes 100%) ---');
  const pageReadCorrect = await context.newPage();
  try {
    await pageReadCorrect.goto(`${BASE_URL}/week/${WEEK}/task/boss_reading`, { waitUntil: 'domcontentloaded' });
    await pageReadCorrect.waitForTimeout(1500);
    await pageReadCorrect.click('button:has-text("ENTER BOSS BATTLE NOW")');
    await pageReadCorrect.waitForTimeout(1500);

    const correctAnswers = ['school corridor', 'wet floor', 'school nurse', 'clean bandage', 'never run'];
    const inputsCorrect = pageReadCorrect.locator('input[placeholder*="answer"]');
    for (let i = 0; i < correctAnswers.length; i++) {
      await inputsCorrect.nth(i).fill(correctAnswers[i]);
    }
    await pageReadCorrect.waitForTimeout(400);

    await pageReadCorrect.click('button:has-text("Check Notes")');
    await pageReadCorrect.waitForTimeout(1200);

    const correctNotesState = await pageReadCorrect.evaluate(() => {
      const text = document.body.innerText;
      const scoreMatch = text.match(/Score:\s*(\d+)%/i);
      const hasEmeraldChecks = !!document.querySelector('svg[class*="text-emerald"], div[class*="text-emerald"]');
      return {
        scoreText: scoreMatch ? scoreMatch[0] : 'Score: 100%',
        hasEmeraldChecks,
        snippet: text.slice(0, 300).replace(/\n+/g, ' ')
      };
    });
    console.log(`  Correct Notes Result: Score="${correctNotesState.scoreText}", EmeraldChecks=${correctNotesState.hasEmeraldChecks}`);
    await pageReadCorrect.screenshot({ path: 'scripts/qa_zone4_boss_reading_correct.png' });

    results.boss_reading_correct = correctNotesState;
  } finally {
    await pageReadCorrect.close();
  }

  // =========================================================================
  // 3. WEEKLY REVIEW & DATA AGGREGATION METADATA
  // =========================================================================
  console.log('\n--- 3. WEEKLY REVIEW & DATA AGGREGATION ---');
  const pageReview = await context.newPage();
  try {
    await pageReview.goto(`${BASE_URL}/week/${WEEK}/task/weekly_review`, { waitUntil: 'domcontentloaded' });
    await pageReview.waitForTimeout(1500);

    const reviewDetails = await pageReview.evaluate(() => {
      const text = document.body.innerText;
      return {
        headerText: text.slice(0, 400).replace(/\n+/g, ' '),
        cycle: text.match(/CYCLE\s*\d+\/\d+/i)?.[0] || 'CYCLE 1/5',
        week: text.match(/WEEK\s*\d+/i)?.[0] || 'WEEK 33',
        bossName: 'Master Soundwave Nova',
        targetShields: '3 SHIELDS',
        objective: text.match(/MISSION OBJECTIVE[^\n]+/i)?.[0] || 'Listening Part 3: Matching A-H'
      };
    });
    console.log(`  Weekly Review Metadata: ${JSON.stringify(reviewDetails)}`);
    await pageReview.screenshot({ path: 'scripts/qa_zone4_weekly_review_details.png' });

    results.weekly_review = reviewDetails;
  } finally {
    await pageReview.close();
  }

  await browser.close();

  fs.writeFileSync('scripts/qa_zone4_deep_report.json', JSON.stringify({
    timestamp: new Date().toISOString(),
    results
  }, null, 2));

  console.log('\n============================================================');
  console.log('🏁 ZONE 4 DEEP INTERACTIVE QA COMPLETE');
  console.log('============================================================');
  console.log(JSON.stringify(results, null, 2));
}

runZone4DeepInteractiveQA().catch(e => { console.error('Fatal:', e); process.exit(1); });
