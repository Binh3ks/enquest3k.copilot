import { chromium } from 'playwright';

async function scanAllRoutesForConsoleErrors() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const allErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      allErrors.push({
        type: msg.type(),
        text: msg.text(),
        location: msg.location()
      });
    }
  });

  page.on('pageerror', err => {
    allErrors.push({
      type: 'PAGE_ERROR',
      text: err.message,
      stack: err.stack
    });
  });

  const routes = [
    'gear1_webtoon', 'gear2_karaoke', 'gear3_retell',
    'gear4_clil', 'science_lab', 'science_report',
    'word_blitz', 'sentence_smash', 'math_quest',
    'story_writer', 'broadcast_studio', 'info_exchange',
    'boss_listening', 'boss_reading', 'weekly_review'
  ];

  for (const r of routes) {
    allErrors.length = 0;
    await page.goto(`http://localhost:5173/week/33/task/${r}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    console.log(`Route [${r}] Console Errors (${allErrors.length}):`, JSON.stringify(allErrors, null, 2));
  }

  await browser.close();
}

scanAllRoutesForConsoleErrors().catch(console.error);
