import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:5173';
const WEEK = 33;

async function testFullInfoExchangeWithLogs() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 412, height: 915 }, isMobile: true });
  const page = await context.newPage();

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err));

  await page.goto(`${BASE_URL}/week/${WEEK}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');
    localStorage.setItem('engquest_onboarding_completed', 'true');
    localStorage.setItem('lexio_welcome_dismissed', 'true');
    localStorage.setItem('engquest-user-storage', JSON.stringify({
      state: { currentUser: { name: 'Học sinh', role: 'student' }, userXP: 1250, xp: 1250 },
      version: 2
    }));
    localStorage.setItem('engquest-daily-quest', JSON.stringify({
      state: { completedQuests: { w33: {} }, dailyBonusClaimed: {} },
      version: 1
    }));
  });

  await page.goto(`${BASE_URL}/week/${WEEK}/task/info_exchange`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const skipBtn = await page.$('button:has-text("Skip")');
  if (skipBtn) await skipBtn.click();
  await page.waitForTimeout(500);

  const tableAQuestions = [
    "Where did Tom get injured?",
    "What did Tom hurt?",
    "What time did Tom slip?",
    "Why did Tom fall down?"
  ];

  console.log('--- Phase 1: Table A ---');
  for (let i = 0; i < tableAQuestions.length; i++) {
    const typeInstead = await page.$('button:has-text("Type instead")');
    if (typeInstead) {
      await typeInstead.click();
      await page.waitForTimeout(300);
    }

    const input = await page.$('input[placeholder*="e.g."]');
    if (input) {
      await input.fill(tableAQuestions[i]);
      await input.press('Enter');
      await page.waitForTimeout(800);
    }

    const nextBtn = await page.$('button:has-text("Next Cue"), button:has-text("Table B")');
    if (nextBtn) {
      console.log('  Clicking:', await nextBtn.innerText());
      await nextBtn.click();
      await page.waitForTimeout(800);
    }
  }

  const tableBAnswers = [
    "He called the school nurse immediately.",
    "She brought a clean bandage and a cold pack.",
    "The school nurse and Jake helped him.",
    "Everyone felt relieved and safe."
  ];

  console.log('--- Phase 2: Table B ---');
  for (let i = 0; i < tableBAnswers.length; i++) {
    const typeInstead = await page.$('button:has-text("Type instead")');
    if (typeInstead) {
      await typeInstead.click();
      await page.waitForTimeout(300);
    }

    const input = await page.$('input[placeholder*="e.g."]');
    if (input) {
      await input.fill(tableBAnswers[i]);
      await input.press('Enter');
      await page.waitForTimeout(800);
    }

    const nextBtn = await page.$('button:has-text("Next Question"), button:has-text("Complete Cambridge Speaking Part 2")');
    if (nextBtn) {
      console.log('  Clicking:', await nextBtn.innerText());
      await nextBtn.click();
      await page.waitForTimeout(800);
    }
  }

  // Check state directly from zustand store in window/page evaluate
  const liveStoreState = await page.evaluate(() => {
    const dq = JSON.parse(localStorage.getItem('engquest-daily-quest') || '{}');
    return dq;
  });
  console.log('Raw engquest-daily-quest localStorage:', JSON.stringify(liveStoreState));

  await browser.close();
}

testFullInfoExchangeWithLogs().catch(console.error);
