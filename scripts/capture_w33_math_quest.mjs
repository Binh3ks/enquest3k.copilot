import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1200, height: 900 } });
  const page = await context.newPage();

  page.on('console', msg => console.log('[Browser Console]', msg.text()));

  // 1. Open app and initialize user auth/session in localStorage
  await page.goto('http://localhost:5174', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem('user', JSON.stringify({ name: 'Explorer', role: 'student', level: 1 }));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');
  });

  // 2. Direct navigate to Math Quest W33
  console.log('Navigating to /week/33/task/math_quest ...');
  await page.goto('http://localhost:5174/week/33/task/math_quest', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);

  // Take screenshot of idle screen
  await page.screenshot({ path: 'scripts/math_quest_idle.png' });
  console.log('Saved scripts/math_quest_idle.png');

  // Click START button
  const startBtn = await page.$('button:has-text("START")');
  if (startBtn) {
    console.log('Clicking START button...');
    await startBtn.click();
    await page.waitForTimeout(1500);

    // 3. Problem 1 Screenshot (Jake walked 40m / 100m)
    await page.screenshot({ path: 'scripts/math_quest_problem1.png' });
    console.log('Saved scripts/math_quest_problem1.png (Problem 1)');

    // Check SVG elements in Problem 1
    const problem1SvgRects = await page.$$eval('svg rect', rects => rects.map(r => ({
      x: r.getAttribute('x'),
      y: r.getAttribute('y'),
      width: r.getAttribute('width'),
      fill: r.getAttribute('fill')
    })));
    console.log('Problem 1 SVG Rects (Proportions):', problem1SvgRects);

    // Submit answer 60 to proceed
    const input = await page.$('input[type="number"]');
    if (input) {
      await input.fill('60');
      const submitBtn = await page.$('button:has-text("Submit")');
      if (submitBtn) await submitBtn.click();
      await page.waitForTimeout(2000);

      // Problem 2 (Bandages: 8 used, 17 left = 25 total)
      await page.screenshot({ path: 'scripts/math_quest_problem2.png' });
      console.log('Saved scripts/math_quest_problem2.png (Problem 2)');
      const input2 = await page.$('input[type="number"]');
      if (input2) {
        await input2.fill('17');
        const submitBtn2 = await page.$('button:has-text("Submit")');
        if (submitBtn2) await submitBtn2.click();
        await page.waitForTimeout(2000);

        // Problem 3 (Treatment: 15 rest + 10 ice = 25)
        await page.screenshot({ path: 'scripts/math_quest_problem3.png' });
        console.log('Saved scripts/math_quest_problem3.png (Problem 3)');
        const input3 = await page.$('input[type="number"]');
        if (input3) {
          await input3.fill('25');
          const submitBtn3 = await page.$('button:has-text("Submit")');
          if (submitBtn3) await submitBtn3.click();
          await page.waitForTimeout(2000);

          // Problem 4 (Rules: 30 students - 24 safe = 6 ran)
          await page.screenshot({ path: 'scripts/math_quest_problem4.png' });
          console.log('Saved scripts/math_quest_problem4.png (Problem 4)');
          const input4 = await page.$('input[type="number"]');
          if (input4) {
            await input4.fill('6');
            const submitBtn4 = await page.$('button:has-text("Submit")');
            if (submitBtn4) await submitBtn4.click();
            await page.waitForTimeout(2000);

            // Problem 5 (Helper Stars: 4 helpers × 5 stars = 20 stars)
            await page.screenshot({ path: 'scripts/math_quest_problem5.png' });
            console.log('Saved scripts/math_quest_problem5.png (Problem 5)');

            const problem5SvgRects = await page.$$eval('svg rect', rects => rects.map(r => ({
              x: r.getAttribute('x'),
              y: r.getAttribute('y'),
              width: r.getAttribute('width'),
              fill: r.getAttribute('fill')
            })));
            console.log('Problem 5 SVG Rects (Proportions):', problem5SvgRects);
          }
        }
      }
    }
  } else {
    console.log('Could not find START button. Check screen content.');
  }

  await browser.close();
})();
