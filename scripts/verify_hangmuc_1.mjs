/**
 * verify_hangmuc_1.mjs — Verify Hạng mục 1:
 * 1. Renaming "Power Points" -> "⚡ Boss Energy"
 * 2. Micro-reward door gating:
 *    - 0 quests completed -> doors locked
 *    - 1 quest completed -> doors unlocked (key ready)
 *    - 1 door cleared -> remaining doors locked until next quest
 */
import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
import path from 'path';

const OUT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74/screenshots';
mkdirSync(OUT_DIR, { recursive: true });

const BASE = 'http://localhost:5173';
const errors = [];

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1024, height: 768 });

page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`[console.error] ${msg.text()}`);
});
page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`));

async function snap(name) {
  const file = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(`📸 Screenshot saved: ${file}`);
  return file;
}

// Reset test user state
await page.goto(`${BASE}/week/33/chronicles`, { waitUntil: 'domcontentloaded' });
await page.evaluate(() => {
  localStorage.setItem('engquest_onboarded', 'true');
  localStorage.removeItem('arcade_owner_bypass');
  // Clear completed quests for w33 to start clean
  try {
    const raw = localStorage.getItem('engquest-daily-quest');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.state && parsed.state.completedQuests) {
        parsed.state.completedQuests['w33'] = {};
        localStorage.setItem('engquest-daily-quest', JSON.stringify(parsed));
      }
    }
    // Also clear chronicles room stars for w33_d0
    const rawChron = localStorage.getItem('engquest_chronicles_default');
    if (rawChron) {
      const parsedChron = JSON.parse(rawChron);
      if (parsedChron.roomStars) {
        delete parsedChron.roomStars['w33_d0'];
        localStorage.setItem('engquest_chronicles_default', JSON.stringify(parsedChron));
      }
    }
  } catch (e) {
    console.error(e);
  }
});

console.log('\n=== TEST 1: World Map / Citadel Hall UI Renaming ===');
await page.goto(`${BASE}/week/33/chronicles`, { waitUntil: 'networkidle0', timeout: 20000 });
await new Promise(r => setTimeout(r, 2500));

const ppSectionText = await page.evaluate(() => {
  const el = document.querySelector('.cwm-pp-section');
  return el ? el.innerText : 'NOT_FOUND';
});
console.log('PP Section Text:\n', ppSectionText);
await snap('hangmuc1_01_world_map_boss_energy');

console.log('\n=== TEST 2: Daily Room with 0 Quests Completed ===');
// Navigate into Floor 1 (Day 1: Chamber of Tales)
await page.evaluate(() => {
  // trigger room 0 enter directly via window or click
  const cwm = window.__ENGQUEST_TEST_ENTER_ROOM__;
  if (typeof cwm === 'function') {
    cwm(0);
  }
});
// Alternatively, click the Three canvas or set screen='room'
await page.goto(`${BASE}/week/33/chronicles?room=0`, { waitUntil: 'networkidle0', timeout: 15000 });
await new Promise(r => setTimeout(r, 2000));

const roomDom0 = await page.evaluate(() => {
  const banner = document.querySelector('.dr-instruction-banner')?.innerText || '';
  const btns = Array.from(document.querySelectorAll('.dr-door-enter-btn')).map(b => b.innerText);
  const ppBadge = document.querySelector('.dr-pp-badge')?.innerText || '';
  return { banner, btns, ppBadge };
});
console.log('Daily Room (0 Quests done):', roomDom0);
await snap('hangmuc1_02_daily_room_0_quests_locked');

console.log('\n=== TEST 3: Complete 1 Quest -> Unlock Door Key ===');
await page.evaluate(() => {
  const raw = localStorage.getItem('engquest-daily-quest') || '{}';
  const parsed = JSON.parse(raw) || { state: {} };
  parsed.state = parsed.state || {};
  parsed.state.completedQuests = parsed.state.completedQuests || {};
  parsed.state.completedQuests['w33'] = { gear1_webtoon: true };
  localStorage.setItem('engquest-daily-quest', JSON.stringify(parsed));
});

// Reload room screen
await page.goto(`${BASE}/week/33/chronicles?room=0`, { waitUntil: 'networkidle0', timeout: 15000 });
await new Promise(r => setTimeout(r, 2000));

const roomDom1 = await page.evaluate(() => {
  const banner = document.querySelector('.dr-instruction-banner')?.innerText || '';
  const btns = Array.from(document.querySelectorAll('.dr-door-enter-btn')).map(b => b.innerText);
  const ppBadge = document.querySelector('.dr-pp-badge')?.innerText || '';
  return { banner, btns, ppBadge };
});
console.log('Daily Room (1 Quest done -> 1 Key available):', roomDom1);
await snap('hangmuc1_03_daily_room_1_quest_unlocked');

console.log('\n=== TEST 4: Clear 1 Door -> Remaining Uncleared Doors Lock Again ===');
await page.evaluate(() => {
  // Record 3 stars on door 0
  const rawChron = localStorage.getItem('engquest_chronicles_default') || '{}';
  const parsedChron = JSON.parse(rawChron) || {};
  parsedChron.roomStars = parsedChron.roomStars || {};
  parsedChron.roomStars['w33_d0'] = { door0: 3, door1: 0, door2: 0 };
  localStorage.setItem('engquest_chronicles_default', JSON.stringify(parsedChron));
});

await page.goto(`${BASE}/week/33/chronicles?room=0`, { waitUntil: 'networkidle0', timeout: 15000 });
await new Promise(r => setTimeout(r, 2000));

const roomDom2 = await page.evaluate(() => {
  const banner = document.querySelector('.dr-instruction-banner')?.innerText || '';
  const btns = Array.from(document.querySelectorAll('.dr-door-enter-btn')).map(b => b.innerText);
  const ppBadge = document.querySelector('.dr-pp-badge')?.innerText || '';
  return { banner, btns, ppBadge };
});
console.log('Daily Room (1 Door cleared -> remaining locked):', roomDom2);
await snap('hangmuc1_04_daily_room_1_door_cleared');

console.log('\nConsole Errors:', errors);
await browser.close();
console.log('\n✅ Verification script completed successfully!');
