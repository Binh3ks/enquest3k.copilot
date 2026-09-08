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
});

console.log('Navigating to quest-demo...');
await page.goto('http://localhost:5173/quest-demo', { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 1500));

await page.screenshot({ path: path.join(OUT_DIR, '00_quest_demo_default.png') });
console.log('Saved 00_quest_demo_default.png');

const games = [
  'highway_sprint',
  'syntax_express',
  'word_wagon',
  'potion_flip',
  'dungeon',
  'bubble_storm',
  'shadow_vault',
  'anvil_rush',
  'scroll_chamber',
  'echo_arena',
  'catapult_commander',
  'storm_shield',
  'riddle_maze',
  'grand_matrix',
  'titan_forge',
  'cambridge_cloze',
];

for (const g of games) {
  try {
    await page.select('#select-active-game', g);
    await new Promise(r => setTimeout(r, 1500));
    const filename = `${g}.png`;
    await page.screenshot({ path: path.join(OUT_DIR, filename) });
    console.log(`Saved screenshot: ${filename}`);
  } catch (err) {
    console.error(`Error capturing ${g}:`, err.message);
  }
}

await browser.close();
console.log('Done capturing screenshots!');
