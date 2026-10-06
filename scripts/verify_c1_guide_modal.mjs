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
  await page.setViewport({ width: 1280, height: 800 });

  const url = `http://localhost:5173/week/33/chronicles?room=2&owner=true`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(2000);

  // Click Chest 2 (door index 1)
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Open Chest') || b.textContent.includes('Replay'));
    if (btns[1]) btns[1].click();
  });
  await sleep(2000);

  // Click Guide button in ChunkCatapultCanvas
  const guideClicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Guide'));
    if (btns.length > 0) {
      btns[0].click();
      return true;
    }
    return false;
  });
  console.log('Guide button clicked:', guideClicked);
  await sleep(1000);

  // Capture Guide modal text
  const guideModalText = await page.evaluate(() => {
    const modal = document.querySelector('.fixed.inset-0');
    return modal ? modal.innerText.trim().replace(/\s+/g, ' ') : 'NOT_FOUND';
  });
  console.log('Guide Modal Verbatim:', guideModalText);

  // Take screenshot
  const ssPath = path.join(SS_DIR, 'c1_chunk_catapult_guide_modal.png');
  const brainPath = path.join(BRAIN_DIR, 'c1_chunk_catapult_guide_modal.png');
  await page.screenshot({ path: ssPath, fullPage: false });
  fs.copyFileSync(ssPath, brainPath);
  console.log('Saved screenshot:', ssPath);

  await browser.close();
}

main().catch(console.error);
