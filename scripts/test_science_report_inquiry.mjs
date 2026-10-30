import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

console.log('========================================================================');
console.log('🧪 SCIENCE REPORT INQUIRY VERIFICATION: W33 & W34 DUAL-WEEK VERIFICATION');
console.log(`Target: ${BASE_URL}`);
console.log('========================================================================\n');

async function setupPage(context) {
  const page = await context.newPage();
  await page.addInitScript(() => {
    localStorage.setItem('engquest-user-storage', JSON.stringify({
      state: {
        currentUser: { id: 'qa-user-1', name: 'Gate15 QA', display_name: 'Gate15 QA', avatar: 'lion', role: 'owner' },
        token: 'qa-test-token',
        learningMode: 'advanced',
        progressCache: {}
      },
      version: 2
    }));
    localStorage.setItem('engquest-daily-quest-store', JSON.stringify({
      state: {
        completedQuests: {}
      },
      version: 1
    }));
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('engquest_onboarding_completed', 'true');
    localStorage.setItem('engquest_overlay_dismissed', 'true');
    localStorage.setItem('engquest_user', JSON.stringify({ name: 'Gate15 QA', avatar: 'lion', role: 'owner' }));
    localStorage.setItem('engquest3k_srs_daily_reviewed', new Date().toISOString().slice(0, 10));
  });
  return page;
}

async function navigateToStep4(page, isW34) {
  // Step 1: Click hotspot and advance
  if (isW34) {
    await page.locator('button:has-text("Mighty Lion Territory")').click();
  } else {
    await page.locator('button:has-text("Wet Corridor Floor")').click();
  }
  await page.waitForTimeout(500);
  await page.click('button:has-text("Next: Pick Discovery Clue")');
  await page.waitForTimeout(500);

  // Step 2: Select clue and advance
  if (isW34) {
    await page.locator('button:has-text("Mutual Cooperation")').click();
  } else {
    await page.locator('button:has-text("Low Surface Friction")').click();
  }
  await page.waitForTimeout(500);
  await page.click('button:has-text("Next: Quick Write Report")');
  await page.waitForTimeout(500);

  // Step 3: Use model exemplar sentence and submit to reach Step 4
  await page.click('button:has-text("View Model Exemplar Sentence")');
  await page.waitForTimeout(300);
  await page.click('button:has-text("Use This Model")');
  await page.waitForTimeout(300);
  await page.click('button:has-text("Submit Report")');
  await page.waitForTimeout(1000);
}

async function runTests() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await setupPage(context);

  // ── SCENARIO 1: WEEK 33 POSITIVE TEST (Corridor Friction & Jake/Tom Inquiry) ──
  console.log('🔍 [SCENARIO 1: WEEK 33] Navigating to Week 33 Quest 6 (/week/33/task/science_report)...');
  await page.goto(`${BASE_URL}/week/33/task/science_report`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  console.log('  👉 Stepping through Steps 1 -> 2 -> 3 on Week 33...');
  await navigateToStep4(page, false);

  const w33Dom = await page.innerText('body');

  // 1. Assert NO fail-loud missing UI
  const missingCountW33 = await page.locator('[data-testid="science-report-data-missing"]').count();
  if (missingCountW33 > 0) {
    console.error('❌ FAIL: [data-testid="science-report-data-missing"] appeared in Week 33 Step 4! Data was not backfilled properly.');
    process.exit(1);
  }
  console.log('  ✅ Zero fail-loud alert in W33: [data-testid="science-report-data-missing"] count = 0');

  // 2. Assert W33 Jake/Tom Inquiry question
  const expectedW33Q = "Why was Jake able to walk safely down the wet corridor while Tom slipped and fell?";
  if (!w33Dom.includes(expectedW33Q)) {
    console.error(`❌ FAIL: Expected W33 inquiry question not found! Question: "${expectedW33Q}"`);
    process.exit(1);
  }
  console.log(`  ✅ W33 Inquiry question verified in Step 4 DOM: "${expectedW33Q}"`);

  // 3. Assert W33 correct option text
  const optW33 = "Jake's textured rubber shoe soles provided strong friction and grip against the wet tiles.";
  if (!w33Dom.includes(optW33)) {
    console.error(`❌ FAIL: W33 Option 1 text not found in DOM!`);
    process.exit(1);
  }
  console.log(`  ✅ W33 Correct Option 1 rendered: "${optW33}"`);

  // 4. Test interactive option selection on W33
  console.log('  👉 Clicking W33 Option 1 (Correct Answer)...');
  await page.click(`button:has-text("${optW33}")`);
  await page.waitForTimeout(800);

  const afterClickW33 = await page.innerText('body');
  if (!afterClickW33.includes("Textured rubber material creates high surface friction") || !afterClickW33.includes("Solved")) {
    console.error(`❌ FAIL: W33 inquiry success feedback not displayed after clicking correct option!`);
    process.exit(1);
  }
  console.log(`  ✅ W33 interaction verified: "Solved" badge & friction explanation displayed.`);

  // ── SCENARIO 2: WEEK 34 POSITIVE TEST (Animal Cooperation Lion/Mouse Inquiry) ──
  console.log('\n🔍 [SCENARIO 2: WEEK 34] Navigating to Week 34 Quest 6 (/week/34/task/science_report)...');
  await page.goto(`${BASE_URL}/week/34/task/science_report`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  console.log('  👉 Stepping through Steps 1 -> 2 -> 3 on Week 34...');
  await navigateToStep4(page, true);

  const w34Dom = await page.innerText('body');

  // 1. Assert NO fail-loud missing UI
  const missingCountW34 = await page.locator('[data-testid="science-report-data-missing"]').count();
  if (missingCountW34 > 0) {
    console.error('❌ FAIL: [data-testid="science-report-data-missing"] appeared in Week 34 Step 4!');
    process.exit(1);
  }
  console.log('  ✅ Zero fail-loud alert in W34: [data-testid="science-report-data-missing"] count = 0');

  // 2. Assert W34 Lion/Mouse Inquiry question
  const expectedW34Q = "Why was the tiny mouse able to free the trapped lion when the mighty lion could not break the net alone?";
  if (!w34Dom.includes(expectedW34Q)) {
    console.error(`❌ FAIL: Expected W34 inquiry question not found in DOM!`);
    process.exit(1);
  }
  console.log(`  ✅ W34 Inquiry question verified in Step 4 DOM: "${expectedW34Q}"`);

  // 3. Assert W34 option
  const optW34 = "The mouse used its sharp gnawing teeth to chew through individual rope fibers";
  if (!w34Dom.includes(optW34)) {
    console.error(`❌ FAIL: W34 Option 1 text not found in DOM!`);
    process.exit(1);
  }
  console.log(`  ✅ W34 Correct Option 1 rendered: "${optW34}..."`);

  // 4. Assert ZERO cross-week leakage in W34
  const hasJake = w34Dom.includes("Jake") || w34Dom.includes("Jake's");
  const hasTom = w34Dom.includes("Tom");
  const hasFriction = w34Dom.includes("wet tiles") || w34Dom.includes("rubber shoe soles");
  if (hasJake || hasTom || hasFriction) {
    console.error(`❌ FAIL: W33 Cross-week content leak detected in W34 Step 4! (Jake: ${hasJake}, Tom: ${hasTom}, Friction: ${hasFriction})`);
    process.exit(1);
  }
  console.log(`  ✅ 0% W33 content leakage in W34 (No Jake, Tom, or corridor friction strings in DOM).`);

  // 5. Test interactive option selection on W34
  console.log('  👉 Clicking W34 Option 1 (Correct Answer)...');
  await page.click(`button:has-text("${optW34}")`);
  await page.waitForTimeout(800);

  const afterClickW34 = await page.innerText('body');
  if (!afterClickW34.includes("Small rodents have sharp incisor teeth") || !afterClickW34.includes("Solved")) {
    console.error(`❌ FAIL: W34 inquiry success feedback not displayed after clicking correct option!`);
    process.exit(1);
  }
  console.log(`  ✅ W34 interaction verified: "Solved" badge & scientific explanation displayed.`);

  await browser.close();

  console.log('\n========================================================================');
  console.log('🎉 ALL TESTS PASSED: BOTH W33 & W34 INQUIRY QUESTIONS FULLY VERIFIED');
  console.log('========================================================================\n');
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
