import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
import path from 'path';

const OUT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74/screenshots';
mkdirSync(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

await page.evaluateOnNewDocument(() => {
  localStorage.setItem('engquest_onboarded', 'true');
  localStorage.setItem('arcade_owner_bypass', 'true');
  localStorage.setItem('engquest3k_srs_daily_reviewed', new Date().toISOString().slice(0, 10));
});

console.log('Navigating to Chronicles World Map...');
await page.goto('http://localhost:5173/week/33/chronicles', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 2000));
await page.screenshot({ path: path.join(OUT_DIR, 'real_01_world_map.png') });

// Click Floor 4 (Rune Sanctum) to reproduce user's screenshot
console.log('Testing Floor 4...');
const nodes = await page.$$('.cwm-room-node');
console.log('Found room nodes:', nodes.length);
if (nodes[3]) {
  await nodes[3].click();
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUT_DIR, 'real_02_floor4_room.png') });

  // Look for Door 2 (Syntax Express)
  const doors = await page.$$('.dr-door-enter-btn');
  console.log('Doors in Floor 4:', doors.length);
  if (doors[1]) {
    await doors[1].click();
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(OUT_DIR, 'real_03_syntax_express_door.png') });
  }
}

await browser.close();
console.log('Done testing real flow!');
