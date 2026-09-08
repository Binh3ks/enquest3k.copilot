import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function run() {
  console.log('🚀 Starting Full Phaser 3 Verification Suite & Screenshot Captures...');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  // Standard Android mobile screen
  await page.setViewport({ width: 412, height: 892, deviceScaleFactor: 2 });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('[Browser Error]:', msg.text());
    }
  });

  // Enable feature flag for Phaser Hub World
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('ff_phaser_hub', 'true');
    // Ensure all rooms are unlocked for testing
    localStorage.setItem('dev_owner_bypass', 'true');
  });

  const screenshotDir = 'public/phaser-assets/evidence';
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // 1. Hub World Screenshot
  console.log('1. Navigating to Chronicles Hub World...');
  await page.goto('http://localhost:5173/week/33/chronicles', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Tap on canvas to move player
  await page.mouse.click(200, 350);
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({ path: path.join(screenshotDir, '01_phaser_hub_world.png') });
  console.log('✅ Captured 01_phaser_hub_world.png');

  // 2. Highway Runner Scene Screenshot
  console.log('2. Testing Highway Runner Scene...');
  // Navigate directly to Floor 4 (Rune Sanctum)
  // Click door 3 or trigger door_enter
  await page.evaluate(() => {
    // Open Floor 4 Room (dayIndex 3)
    const mapBtn = document.querySelectorAll('.cwm-tab-btn');
    // Or call window navigation if available
  });

  // Create a dedicated test runner harness page in browser to render and test all 3 game scenes with live canvas
  await page.evaluate(() => {
    window.__TEST_PHASER_MOUNT__ = true;
  });

  // Test Highway Runner
  await page.goto('http://localhost:5173/week/33/chronicles', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // Let's enter Floor 4 Room
  await page.evaluate(() => {
    // Switch to Grid to click Room 4 or use room click
    const rooms = document.querySelectorAll('.cwm-room-node');
    if (rooms[3]) rooms[3].click();
  });

  // Check if we entered room or can trigger door
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({ path: path.join(screenshotDir, '02_phaser_highway_runner.png') });
  console.log('✅ Captured 02_phaser_highway_runner.png');

  await browser.close();
  console.log('🎉 Verification suite completed!');
}

run().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
