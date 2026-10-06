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
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  console.log('=== AUDITING C1: CHUNK CATAPULT (MOBILE 390x844) ===');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  const url = `http://localhost:5173/week/33/chronicles?room=2&owner=true`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(2000);

  // Click Chest 2 (door index 1)
  const opened = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Open Chest') || b.textContent.includes('Replay'));
    if (btns[1]) {
      btns[1].click();
      return true;
    }
    return false;
  });

  console.log('Mobile Chest 2 opened:', opened);
  await sleep(3000);

  const mobileSsPath = path.join(SS_DIR, 'c1_chunk_catapult_mobile_390x844.png');
  const brainMobileSsPath = path.join(BRAIN_DIR, 'c1_chunk_catapult_mobile_390x844.png');
  await page.screenshot({ path: mobileSsPath, fullPage: false });
  fs.copyFileSync(mobileSsPath, brainMobileSsPath);
  console.log('Saved Mobile Screenshot:', mobileSsPath);

  const mobileDomText = await page.evaluate(() => document.body.innerText);
  console.log('Mobile DOM Snippet:\n', mobileDomText.slice(0, 500));

  await browser.close();
}

main().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
