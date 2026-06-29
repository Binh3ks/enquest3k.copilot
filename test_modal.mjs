import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on('pageerror', err => console.log('PAGEERROR:', err.message.slice(0, 200)));

await page.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(2500);
await page.goto('http://localhost:5173/week/3/shadowing', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(5000);

await page.locator('button[title*="Save"]').first().click();
await page.waitForTimeout(800);
await page.screenshot({ path: '/tmp/w3_v9_setup.png' });

// Countdown options are buttons with text ending in "s"
const opts = await page.locator('button.rounded-xl.font-bold.text-sm').allTextContents();
console.log('Countdown options:', opts);
