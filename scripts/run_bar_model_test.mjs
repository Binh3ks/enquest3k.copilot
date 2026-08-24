import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1200, height: 900 } });

  // Add init script to set localStorage before any script runs
  await context.addInitScript(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('engquest_pin_verified', 'true');
    localStorage.setItem('engquest_voice_consent', 'true');
    localStorage.setItem('user', JSON.stringify({ name: 'Explorer', role: 'student', level: 1 }));
  });

  const page = await context.newPage();

  console.log('Navigating to Math Quest (Week 33)...');
  await page.goto('http://localhost:5174/week/33/task/math_quest', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  const startButton = page.locator('button', { hasText: 'START' }).first();
  console.log('START button count:', await startButton.count());

  if (await startButton.count() > 0) {
    console.log('Clicking START...');
    await startButton.click();
    await page.waitForTimeout(1000);

    // Problem 1 Screenshot
    await page.screenshot({ path: 'scripts/math_problem1_real.png' });
    console.log('📸 Saved scripts/math_problem1_real.png');

    const p1Rects = await page.locator('svg rect').evaluateAll(rects => rects.map(r => ({
      x: r.getAttribute('x'),
      width: r.getAttribute('width'),
      fill: r.getAttribute('fill')
    })));
    console.log('📐 Problem 1 Rect Dimensions (40m walked vs 60m left):', JSON.stringify(p1Rects, null, 2));

    const p1Texts = await page.locator('svg text').evaluateAll(texts => texts.map(t => t.textContent.trim()));
    console.log('📝 Problem 1 Text Labels:', JSON.stringify(p1Texts, null, 2));

    // Progress through P1 -> P2 -> P3 -> P4
    const answers = ['60', '17', '25', '6'];
    for (let i = 0; i < answers.length; i++) {
      console.log(`Submitting answer for Problem ${i + 1}: ${answers[i]}`);
      await page.locator('input[type="number"]').fill(answers[i]);
      await page.locator('button', { hasText: 'Submit Answer' }).click();
      await page.waitForTimeout(1500);
    }

    // Problem 5 Screenshot
    await page.screenshot({ path: 'scripts/math_problem5_real.png' });
    console.log('📸 Saved scripts/math_problem5_real.png');

    const p5Rects = await page.locator('svg rect').evaluateAll(rects => rects.map(r => ({
      x: r.getAttribute('x'),
      width: r.getAttribute('width'),
      fill: r.getAttribute('fill')
    })));
    console.log('📐 Problem 5 Rect Dimensions (4 Helpers × 5 Stars = 20 Stars):', JSON.stringify(p5Rects, null, 2));

    const p5Texts = await page.locator('svg text').evaluateAll(texts => texts.map(t => t.textContent.trim()));
    console.log('📝 Problem 5 Text Labels:', JSON.stringify(p5Texts, null, 2));
  } else {
    console.log('START button not found.');
    await page.screenshot({ path: 'scripts/debug_screen.png' });
  }

  await browser.close();
}

run().catch(console.error);
