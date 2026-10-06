import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';
const SCREENSHOT_DIR = '/Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots';

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));

  console.log('Navigating to quest-demo...');
  await page.goto('http://localhost:5173/quest-demo', { waitUntil: 'networkidle0' });

  // Select phaser_boss
  console.log('Selecting phaser_boss...');
  await page.select('#select-active-game', 'phaser_boss');

  await new Promise(r => setTimeout(r, 2000));

  const screenshotPath1 = path.join(ARTIFACT_DIR, 'boss_combat_scene_phaser_view.png');
  const screenshotPath2 = path.join(SCREENSHOT_DIR, 'boss_combat_scene_phaser_view.png');

  await page.screenshot({ path: screenshotPath1 });
  await page.screenshot({ path: screenshotPath2 });

  const canvasInfo = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    return {
      hasCanvas: !!canvas,
      canvasWidth: canvas ? canvas.width : null,
      canvasHeight: canvas ? canvas.height : null,
      bodyText: document.body.innerText.slice(0, 500),
    };
  });

  console.log('Canvas Info:', JSON.stringify(canvasInfo, null, 2));

  await browser.close();
  console.log('Done!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
