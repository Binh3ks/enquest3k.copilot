import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

async function testHub() {
  console.log('--- Launching Puppeteer ---');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  const consoleLogs = [];
  page.on('console', (msg) => {
    const text = msg.text();
    consoleLogs.push(text);
    if (text.includes('Phaser') || text.includes('HubWorld') || text.includes('AutoMigration')) {
      console.log('[Browser Console]', text);
    }
  });

  page.on('pageerror', (err) => {
    console.error('[Browser PageError]', err.message);
  });

  console.log('Navigating to http://localhost:5173/week/33/chronicles...');
  await page.goto('http://localhost:5173/week/33/chronicles', { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait 3 seconds for Phaser canvas to mount and instantiate
  await new Promise((r) => setTimeout(r, 3000));

  // Check Tab bar for toggle button
  const tabButtons = await page.$$eval('.cwm-tab-btn', (btns) => btns.map((b) => b.textContent.trim()));
  console.log('Tab Buttons in DOM:', tabButtons);

  const hasToggleBtn = tabButtons.some((txt) => txt.includes('Hub:') || txt.includes('2D RPG') || txt.includes('Map Grid'));
  console.log('Has Toggle Button?:', hasToggleBtn);

  // Check Phaser canvas in DOM
  const canvasInfo = await page.evaluate(() => {
    const wrapper = document.querySelector('.cwm-phaser-hub-wrapper');
    const canvas = wrapper ? wrapper.querySelector('canvas') : null;
    return {
      wrapperExists: !!wrapper,
      canvasExists: !!canvas,
      canvasWidth: canvas ? canvas.width : null,
      canvasHeight: canvas ? canvas.height : null,
    };
  });
  console.log('Canvas Info:', canvasInfo);

  // Check console logs for instantiation
  const hasInstantiatedLog = consoleLogs.some((l) => l.includes('[HubWorld] Phaser game instantiated'));
  console.log('Console has [HubWorld] Phaser game instantiated?:', hasInstantiatedLog);

  // Click canvas to trigger tap-to-move
  console.log('Simulating click on canvas to move player...');
  await page.mouse.click(600, 480);
  await new Promise((r) => setTimeout(r, 1000));

  // Capture screenshot
  const outDir = path.resolve('public/phaser-assets/evidence');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const screenshotPath = path.join(outDir, '08_hub_world_v4_3_clean.png');
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log('Screenshot saved to:', screenshotPath);

  await browser.close();
  console.log('--- Puppeteer Test Complete ---');
}

testHub().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
