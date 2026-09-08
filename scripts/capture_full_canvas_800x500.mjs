import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

async function capture() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 2 });

  page.on('console', (msg) => {
    const text = msg.text();
    if (text.includes('Phaser') || text.includes('HubWorld')) {
      console.log('[Browser Console]', text);
    }
  });

  console.log('Navigating to local dev server...');
  await page.goto('http://localhost:5173/week/33/chronicles', { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait 3s for Phaser canvas to fully render
  await new Promise(r => setTimeout(r, 3000));

  // Find canvas element
  const canvasEl = await page.$('.cwm-phaser-hub-wrapper canvas');
  if (!canvasEl) {
    throw new Error('Could not find .cwm-phaser-hub-wrapper canvas!');
  }

  const outDir = path.resolve('public/phaser-assets/evidence');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const canvasScreenshotPath = path.join(outDir, '09_hub_world_v5_1_canvas_full.png');
  await canvasEl.screenshot({ path: canvasScreenshotPath });
  console.log('✅ Cropped full-canvas 800x500 saved to:', canvasScreenshotPath);

  await browser.close();
}

capture().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
