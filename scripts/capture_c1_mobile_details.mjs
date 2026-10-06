import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SS_DIR = path.join(__dirname, '..', 'docs', 'agent_artifacts', 'screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Test 1: Mobile Portrait after dismissing overlay
  console.log('=== AUDITING C1: MOBILE PORTRAIT (PLAY IN PORTRAIT) ===');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  const url = `http://localhost:5173/week/33/chronicles?room=2&owner=true`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(2000);

  // Click Chest 2
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Open Chest') || b.textContent.includes('Replay'));
    if (btns[1]) btns[1].click();
  });
  await sleep(2000);

  // Click "Continue in Portrait Mode"
  const dismissed = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')).filter(b => 
      b.textContent.includes('Continue in Portrait') || b.textContent.includes('Portrait Mode') || b.textContent.includes('Play in Portrait')
    );
    if (btns[0]) {
      btns[0].click();
      return true;
    }
    return false;
  });
  console.log('Dismissed overlay:', dismissed);
  await sleep(2000);

  const portraitGameplaySs = path.join(SS_DIR, 'c1_chunk_catapult_mobile_portrait_gameplay.png');
  await page.screenshot({ path: portraitGameplaySs, fullPage: false });
  fs.copyFileSync(portraitGameplaySs, path.join(BRAIN_DIR, 'c1_chunk_catapult_mobile_portrait_gameplay.png'));
  console.log('Saved portrait gameplay screenshot');

  // Test 2: Mobile Landscape (844x390)
  console.log('=== AUDITING C1: MOBILE LANDSCAPE (844x390) ===');
  await page.setViewport({ width: 844, height: 390, isMobile: true, hasTouch: true });
  await sleep(2000);

  const landscapeSs = path.join(SS_DIR, 'c1_chunk_catapult_mobile_landscape.png');
  await page.screenshot({ path: landscapeSs, fullPage: false });
  fs.copyFileSync(landscapeSs, path.join(BRAIN_DIR, 'c1_chunk_catapult_mobile_landscape.png'));
  console.log('Saved landscape screenshot');

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
