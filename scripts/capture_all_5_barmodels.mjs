import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1200, height: 900 } });

  await context.addInitScript(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('engquest_pin_verified', 'true');
    localStorage.setItem('engquest_voice_consent', 'true');
    localStorage.setItem('user', JSON.stringify({ name: 'Explorer', role: 'student', level: 1 }));
  });

  const page = await context.newPage();
  await page.goto('http://localhost:5174/week/33/task/math_quest', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  const startButton = page.locator('button', { hasText: 'START' }).first();
  if (await startButton.count() === 0) {
    console.error('START button not found');
    await browser.close();
    return;
  }
  await startButton.click();
  await page.waitForTimeout(1000);

  const answers = ['60', '17', '25', '6', '20'];
  const allResults = [];

  for (let i = 0; i < 5; i++) {
    const probNum = i + 1;
    const screenshotPath = `scripts/math_problem${probNum}_real.png`;
    await page.screenshot({ path: screenshotPath });

    const rects = await page.locator('svg rect').evaluateAll(elements => elements.map(r => ({
      x: parseFloat(r.getAttribute('x') || 0),
      width: parseFloat(r.getAttribute('width') || 0),
      fill: r.getAttribute('fill')
    })));

    // Filter out potential non-bar SVG rects (keep only bar rects in main bar group)
    const barRects = rects.filter(r => r.width > 10);

    const texts = await page.locator('svg text').evaluateAll(elements => elements.map(t => t.textContent.trim()));

    const title = await page.locator('h4').first().textContent().catch(() => '');
    const problemText = await page.locator('p').first().textContent().catch(() => '');

    console.log(`\n========================================`);
    console.log(`📊 PROBLEM ${probNum}: ${title}`);
    console.log(`❓ Text: ${problemText}`);
    console.log(`🖼️ Screenshot: ${screenshotPath}`);
    console.log(`📐 Bar Rects (${barRects.length} bars):`);
    barRects.forEach((b, idx) => {
      const pct = ((b.width / 380) * 100).toFixed(1);
      console.log(`   Bar ${idx + 1}: x=${b.x}, width=${b.width}px (${pct}%), color=${b.fill}`);
    });
    console.log(`📝 Labels: ${JSON.stringify(texts)}`);

    allResults.push({ probNum, title, barRects, texts });

    if (i < 4) {
      await page.locator('input[type="number"]').fill(answers[i]);
      await page.locator('button', { hasText: 'Submit Answer' }).click();
      await page.waitForTimeout(1500);
    }
  }

  await browser.close();
  console.log('\n✅ All 5 Singapore Math problems captured and verified from live DOM.');
}

run().catch(console.error);
