import puppeteer from 'puppeteer';
import path from 'path';

const OUT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74/screenshots';
const BASE = 'http://localhost:5173';

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
// Mobile viewport (iPhone SE / Android narrow: 375 x 667)
await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });

await page.goto(`${BASE}/quest-demo`, { waitUntil: 'networkidle0', timeout: 20000 });
await new Promise(r => setTimeout(r, 1500));

await page.select('#select-active-game', 'phaser_catapult');
await new Promise(r => setTimeout(r, 1500));

const snapPortrait = path.join(OUT_DIR, 'hangmuc3_06_catapult_mobile_portrait_notice.png');
await page.screenshot({ path: snapPortrait, fullPage: true });
console.log(`📸 Screenshot saved: ${snapPortrait}`);

// Click "Tiếp tục chơi dọc (Play in Portrait)"
await page.evaluate(() => {
  const btns = Array.from(document.querySelectorAll('button'));
  const playPortraitBtn = btns.find(b => b.innerText.includes('chơi dọc'));
  if (playPortraitBtn) playPortraitBtn.click();
});
await new Promise(r => setTimeout(r, 800));

const snapDismissed = path.join(OUT_DIR, 'hangmuc3_07_catapult_mobile_portrait_gameplay.png');
await page.screenshot({ path: snapDismissed, fullPage: true });
console.log(`📸 Screenshot saved: ${snapDismissed}`);

await browser.close();
