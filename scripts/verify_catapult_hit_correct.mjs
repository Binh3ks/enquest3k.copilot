import puppeteer from 'puppeteer';
import path from 'path';

const OUT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74/screenshots';
const BASE = 'http://localhost:5173';

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1024, height: 768 });

await page.goto(`${BASE}/quest-demo`, { waitUntil: 'networkidle0', timeout: 20000 });
await new Promise(r => setTimeout(r, 1500));

// Select Chunk Catapult
await page.select('#select-active-game', 'phaser_catapult');
await new Promise(r => setTimeout(r, 1500));

const canvas = await page.$('canvas');
const box = await canvas.boundingBox();

const baseX = box.x + (130 / 800) * box.width;
const baseY = box.y + (380 / 500) * box.height;

// Aim for target 1 (440, 165): Pull back to (85, 436)
const dragX = box.x + (85 / 800) * box.width;
const dragY = box.y + (436 / 500) * box.height;

await page.mouse.move(baseX, baseY);
await page.mouse.down();
await new Promise(r => setTimeout(r, 200));

await page.mouse.move(dragX, dragY, { steps: 12 });
await new Promise(r => setTimeout(r, 400));

await page.mouse.up();

// Wait for flight and hit (approx 900ms)
await new Promise(r => setTimeout(r, 950));
const snap = path.join(OUT_DIR, 'hangmuc3_05_catapult_correct_hit_score.png');
await page.screenshot({ path: snap, fullPage: true });
console.log(`📸 Screenshot saved: ${snap}`);

const hudState = await page.evaluate(() => {
  return document.querySelector('.chunk-catapult-wrapper')?.innerText?.substring(0, 200);
});
console.log('HUD state:', hudState);

await browser.close();
