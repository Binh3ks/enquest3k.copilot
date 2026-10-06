import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

async function main() {
  console.log('Testing F7D3 — Word Class Duel (Room 6, Door 2)...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const roomUrl = `${BASE_URL}/week/33/chronicles?room=6&bypass=true`;
  await page.goto(roomUrl, { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 600));

  const doorBtns = await page.$$('.dr-door-enter-btn');
  await doorBtns[2].click();
  await new Promise(r => setTimeout(r, 800));

  // Try pressing arrow keys to confirm Leo doesn't move
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowUp');
  await new Promise(r => setTimeout(r, 200));

  // Click card button with linear-gradient (one of the 4 cards)
  const cardBtns = await page.$$('button[style*="linear-gradient"]');
  console.log(`Found ${cardBtns.length} card buttons in Word Class Duel`);
  if (cardBtns.length > 0) {
    await cardBtns[0].click();
  }
  await new Promise(r => setTimeout(r, 400));

  const picName = 'f7d3_word_class_duel_live_play.png';
  const picPath = path.join(OUTPUT_DIR, picName);
  await page.screenshot({ path: picPath });
  fs.copyFileSync(picPath, path.join(BRAIN_DIR, picName));
  console.log(`Saved screenshot: ${picName}`);

  await browser.close();
}

main().catch(console.error);
