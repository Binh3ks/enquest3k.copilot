import { chromium } from 'playwright';

async function checkConsoleErrors() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE ${msg.type().toUpperCase()}]:`, msg.text());
  });

  page.on('pageerror', err => {
    console.error(`[PAGE ERROR]:`, err.message);
  });

  await page.goto('http://localhost:5173/week/33/task/gear1_webtoon', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  await browser.close();
}

checkConsoleErrors().catch(console.error);
