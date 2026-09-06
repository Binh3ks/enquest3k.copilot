/**
 * audit_chronicles_ui.mjs — Puppeteer audit for The Lexio Chronicles
 * Usage: node scripts/audit_chronicles_ui.mjs
 */
import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '../.gemini/antigravity-ide/brain/f875fff5-035d-4b7d-9f40-9d8daf173aeb/screenshots');
mkdirSync(OUT_DIR, { recursive: true });

const BASE = 'http://localhost:5173';
const errors = [];

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844 }); // iPhone 14 viewport

// Capture console errors
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`[console.error] ${msg.text()}`);
});
page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`));

async function snap(name) {
  const file = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(`📸 Screenshot saved: ${name}.png`);
  return file;
}

async function domText() {
  return await page.evaluate(() => document.body.innerText.slice(0, 2000));
}

// ── STEP 1: World Map ───────────────────────────────────────────────────────
console.log('\n=== STEP 1: Navigate to World Map ===');
await page.goto(`${BASE}/week/33/chronicles`, { waitUntil: 'networkidle0', timeout: 15000 });
await new Promise(r => setTimeout(r, 2000));
const s1 = await snap('01_world_map_landing');
const dom1 = await domText();
console.log('DOM (World Map):\n', dom1);

// ── STEP 2: Click Day 1 room if visible ────────────────────────────────────
console.log('\n=== STEP 2: Find and click a Room node ===');
const roomBtn = await page.$('.cwm-room-node.unlocked, .cwm-room-node.completed');
if (roomBtn) {
  console.log('Found unlocked room node — clicking...');
  await roomBtn.click();
  await new Promise(r => setTimeout(r, 1500));
  const s2 = await snap('02_daily_room_entered');
  const dom2 = await domText();
  console.log('DOM (Daily Room):\n', dom2);
} else {
  console.log('⚠ No unlocked room found (expected if no quests completed for week 33)');
  // Try clicking Day 1 by index anyway
  const allRooms = await page.$$('.cwm-room-node');
  console.log(`Total room nodes found: ${allRooms.length}`);
  if (allRooms[0]) {
    await allRooms[0].click();
    await new Promise(r => setTimeout(r, 1500));
    await snap('02_day1_click_attempt');
    const dom2 = await domText();
    console.log('DOM after click:\n', dom2);
  }
}

// ── STEP 3: Test door entry if inside room ─────────────────────────────────
console.log('\n=== STEP 3: Check 3-door structure ===');
const doorBtns = await page.$$('.dr-door-enter-btn');
console.log(`Door buttons found: ${doorBtns.length}`);
if (doorBtns.length > 0) {
  const activeBtn = await page.$('.dr-door-enter-btn.active');
  if (activeBtn) {
    console.log('Clicking active door...');
    await activeBtn.click();
    await new Promise(r => setTimeout(r, 1500));
    const s3 = await snap('03_mini_game_intro');
    const dom3 = await domText();
    console.log('DOM (Mini-game intro):\n', dom3);

    // Click START button
    const startBtn = await page.$('.cg-start-btn');
    if (startBtn) {
      await startBtn.click();
      await new Promise(r => setTimeout(r, 1500));
      await snap('04_mini_game_playing');
      const dom4 = await domText();
      console.log('DOM (Game playing):\n', dom4);
    }
  }
}

// ── STEP 4: Back to world map fresh ────────────────────────────────────────
console.log('\n=== STEP 4: Fresh reload ===');
await page.goto(`${BASE}/week/33/chronicles`, { waitUntil: 'networkidle0', timeout: 10000 });
await new Promise(r => setTimeout(r, 1500));
await snap('05_world_map_reload');

await browser.close();

// ── REPORT ─────────────────────────────────────────────────────────────────
console.log('\n════════════════════════════════════════');
console.log('📋 AUDIT REPORT — The Lexio Chronicles');
console.log('════════════════════════════════════════');
if (errors.length === 0) {
  console.log('✅ No runtime errors detected');
} else {
  console.log(`🔴 ${errors.length} error(s) detected:`);
  errors.forEach(e => console.log(' •', e));
}
console.log(`\nScreenshots saved to:\n  ${OUT_DIR}`);
