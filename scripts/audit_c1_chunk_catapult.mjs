import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SS_DIR = path.join(__dirname, '..', 'docs', 'agent_artifacts', 'screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

if (!fs.existsSync(SS_DIR)) fs.mkdirSync(SS_DIR, { recursive: true });

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

  console.log('=== AUDITING C1: CHUNK CATAPULT (DESKTOP 1280x800) ===');
  await page.setViewport({ width: 1280, height: 800 });

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

  if (!opened) {
    console.error('❌ Could not click Chest 2 button!');
  }
  await sleep(2000);

  // If there's an intro modal or instruction modal, look for Start button
  const startClicked = await page.evaluate(() => {
    const startBtns = Array.from(document.querySelectorAll('button')).filter(b => 
      b.textContent.includes('Start') || b.textContent.includes('PLAY') || b.textContent.includes('Launch')
    );
    if (startBtns.length > 0) {
      startBtns[0].click();
      return startBtns[0].textContent.trim();
    }
    return null;
  });
  console.log('Start button clicked in modal:', startClicked);
  await sleep(2500);

  // Save Desktop Screenshot
  const desktopSsPath = path.join(SS_DIR, 'c1_chunk_catapult_desktop_1280x800.png');
  const brainDesktopSsPath = path.join(BRAIN_DIR, 'c1_chunk_catapult_desktop_1280x800.png');
  await page.screenshot({ path: desktopSsPath, fullPage: false });
  fs.copyFileSync(desktopSsPath, brainDesktopSsPath);
  console.log('Saved Desktop Screenshot:', desktopSsPath);

  // Extract DOM Text & labels
  const desktopDomText = await page.evaluate(() => document.body.innerText);

  // Now Mobile Viewport 390x844
  console.log('\n=== AUDITING C1: CHUNK CATAPULT (MOBILE 390x844) ===');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await sleep(1500);

  const mobileSsPath = path.join(SS_DIR, 'c1_chunk_catapult_mobile_390x844.png');
  const brainMobileSsPath = path.join(BRAIN_DIR, 'c1_chunk_catapult_mobile_390x844.png');
  await page.screenshot({ path: mobileSsPath, fullPage: false });
  fs.copyFileSync(mobileSsPath, brainMobileSsPath);
  console.log('Saved Mobile Screenshot:', mobileSsPath);

  const mobileDomText = await page.evaluate(() => document.body.innerText);

  // Check UI elements specifically
  const uiAnalysis = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button')).map(b => ({
      text: b.innerText.trim(),
      rect: b.getBoundingClientRect()
    }));
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, .title, .hud')).map(h => h.innerText.trim());
    return { buttons, headings };
  });

  const report = {
    game: 'Chunk Catapult (F3D2)',
    success: true,
    consoleErrors,
    desktopSs: desktopSsPath,
    mobileSs: mobileSsPath,
    desktopDomSnippet: desktopDomText.slice(0, 800),
    uiAnalysis
  };

  fs.writeFileSync(path.join(SS_DIR, 'c1_chunk_catapult_report.json'), JSON.stringify(report, null, 2));
  console.log('\nFull Report:\n', JSON.stringify(report, null, 2));

  await browser.close();
}

main().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
