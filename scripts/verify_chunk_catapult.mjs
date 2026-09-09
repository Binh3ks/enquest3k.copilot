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

const errors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`[console.error] ${msg.text()}`);
});
page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`));

console.log('=== TEST 1: Open Quest Demo Chunk Catapult ===');
await page.goto(`${BASE}/quest-demo`, { waitUntil: 'networkidle0', timeout: 20000 });
await new Promise(r => setTimeout(r, 1500));

// Select the Chunk Catapult game
await page.select('#select-active-game', 'phaser_catapult');
await new Promise(r => setTimeout(r, 1500));

// Find the canvas
const canvas = await page.$('canvas');
if (!canvas) {
  console.error('❌ Canvas not found!');
  process.exit(1);
}

const box = await canvas.boundingBox();
console.log('Canvas bounding box:', box);

// 1. Initial idle screenshot
const snap1 = path.join(OUT_DIR, 'hangmuc3_01_catapult_idle.png');
await page.screenshot({ path: snap1, fullPage: true });
console.log(`📸 Screenshot saved: ${snap1}`);

// 2. Slingshot Anchor Coordinates
// Slingshot base is at (130, 380) in virtual 800x500 space
const baseX = box.x + (130 / 800) * box.width;
const baseY = box.y + (380 / 500) * box.height;

console.log(`\n=== TEST 2: Real Pointer Drag Interaction at (${baseX}, ${baseY}) ===`);
await page.mouse.move(baseX, baseY);
await page.mouse.down();
await new Promise(r => setTimeout(r, 200));

// Drag back and slightly down to aim up and right
// Vector: pull to (65, 430)
const dragX = box.x + (65 / 800) * box.width;
const dragY = box.y + (430 / 500) * box.height;
await page.mouse.move(dragX, dragY, { steps: 15 });
await new Promise(r => setTimeout(r, 600));

// Screenshot 2: Dragging state with elastic bands & Bullet Time active
const snap2 = path.join(OUT_DIR, 'hangmuc3_02_catapult_bullet_time_drag.png');
await page.screenshot({ path: snap2, fullPage: true });
console.log(`📸 Screenshot saved: ${snap2}`);

// 3. Release mouse to launch projectile
console.log('\n=== TEST 3: Mouse Release (Launch Projectile) ===');
await page.mouse.up();

// Wait 250ms for mid-flight parabolic trajectory
await new Promise(r => setTimeout(r, 250));
const snap3 = path.join(OUT_DIR, 'hangmuc3_03_catapult_in_flight.png');
await page.screenshot({ path: snap3, fullPage: true });
console.log(`📸 Screenshot saved: ${snap3}`);

// Wait for impact / score update
await new Promise(r => setTimeout(r, 1200));
const snap4 = path.join(OUT_DIR, 'hangmuc3_04_catapult_hit_reaction.png');
await page.screenshot({ path: snap4, fullPage: true });
console.log(`📸 Screenshot saved: ${snap4}`);

const scoreInfo = await page.evaluate(() => {
  const hud = document.querySelector('.chunk-catapult-wrapper')?.innerText;
  return hud ? hud.substring(0, 200) : 'NOT_FOUND';
});
console.log('\nHUD State after launch:\n', scoreInfo);

console.log('\nConsole Errors:', errors);
await browser.close();
console.log('✅ Chunk Catapult verification script completed successfully!');
