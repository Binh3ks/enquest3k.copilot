import { chromium } from 'playwright';

async function printExactConsoleErrors() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`TYPE: [${msg.type()}] | TEXT: "${msg.text()}" | LOCATION:`, msg.location());
  });

  page.on('pageerror', err => {
    console.log(`PAGE ERROR:`, err.message);
  });

  await page.goto('http://localhost:5173/week/33/task/gear1_webtoon', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  await browser.close();
}

printExactConsoleErrors().catch(console.error);
