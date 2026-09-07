/**
 * scripts/audit_sprint0_sprint1.mjs
 * Comprehensive visual verification & audit script for:
 * 1. Sprint 0 Bug Fixes (B1-B5 in Chronicles UI)
 * 2. Sprint 1 Leo Physics Engine (DungeonRoom, LeoCharacter, EnemyAI, WordCrystal, MCQBlitzPopup, HUD, VirtualDPad)
 */
import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
import path from 'path';

const OUT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/ca208f83-1a01-48c3-a922-1aabfe360652/screenshots';
mkdirSync(OUT_DIR, { recursive: true });

const BASE = 'http://localhost:5173';
const errors = [];
const logs = [];

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
// Mobile viewport for realistic tablet/phone test
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

// Pre-seed localStorage to bypass onboarding in automated tests
await page.evaluateOnNewDocument(() => {
  localStorage.setItem('engquest_onboarded', 'true');
  localStorage.setItem('arcade_owner_bypass', 'true');
  localStorage.setItem('engquest3k_srs_daily_reviewed', new Date().toISOString().slice(0, 10));
});

page.on('console', (msg) => {
  const t = msg.text();
  if (msg.type() === 'error') errors.push(`[console.error] ${t}`);
  else logs.push(`[console.${msg.type()}] ${t}`);
});
page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`));

async function snap(name) {
  const file = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`📸 Screenshot saved: ${name}.png`);
  return file;
}

console.log('═══════════════════════════════════════════════════════');
console.log('🚀 PART 1: AUDIT SPRINT 0 BUG FIXES (CHRONICLES UI)');
console.log('═══════════════════════════════════════════════════════');

// Step 1: World Map
console.log('\n--- 1.1 World Map Navigation ---');
await page.goto(`${BASE}/week/33/chronicles`, { waitUntil: 'networkidle0', timeout: 15000 });
await new Promise(r => setTimeout(r, 2000));
await snap('01_world_map_landing');

const worldMapText = await page.evaluate(() => document.body.innerText);
console.log('World Map Text excerpt:', worldMapText.slice(0, 300));
const hasReviewSuffix = /Floor \d+.*Review/i.test(worldMapText);
console.log(`[B5 Verification] "Review" suffix in chamber titles: ${hasReviewSuffix ? '❌ FOUND (Failed)' : '✅ NOT FOUND (Passed)'}`);

// Step 2: Enter Room
console.log('\n--- 1.2 Entering Daily Room ---');
const roomBtn = await page.$('.cwm-room-node');
if (roomBtn) {
  await roomBtn.click();
  await new Promise(r => setTimeout(r, 1500));
  await snap('02_daily_room_entered');
}

// Step 3: Enter Door 1 (Arcane Bubble)
console.log('\n--- 1.3 Door Entry & QuestEntryOverlay (B1, B4) ---');
const doorBtn = await page.$('.dr-door-enter-btn.active') || await page.$('.dr-door-enter-btn');
if (doorBtn) {
  await doorBtn.click();
  await new Promise(r => setTimeout(r, 1000));
  await snap('03_door_entry_overlay');

  // Find start button
  let startBtn = await page.$('.cg-start-btn');
  if (!startBtn) {
    const allBtns = await page.$$('button');
    for (const btn of allBtns) {
      const txt = await page.evaluate(el => el.innerText, btn);
      if (txt && (txt.includes('START CHALLENGE') || txt.includes('Understood'))) {
        startBtn = btn;
        break;
      }
    }
  }
  if (startBtn) {
    await startBtn.click();
    await new Promise(r => setTimeout(r, 2000));
    await snap('04_arcane_bubble_playing');
    const bubbleText = await page.evaluate(() => document.body.innerText);
    console.log('Arcane Bubble Playing Text excerpt:', bubbleText.slice(0, 300));
  }
}

console.log('\n═══════════════════════════════════════════════════════');
console.log('🚀 PART 2: AUDIT SPRINT 1 LEO PHYSICS ENGINE (/quest-demo)');
console.log('═══════════════════════════════════════════════════════');

// Set desktop/tablet viewport for optimal game presentation
await page.setViewport({ width: 900, height: 650, isMobile: true, hasTouch: true });
await page.goto(`${BASE}/quest-demo`, { waitUntil: 'networkidle0', timeout: 15000 });
await new Promise(r => setTimeout(r, 2500));

// Snap 05: Idle State
await snap('05_quest_demo_idle');
const questDomIdle = await page.evaluate(() => {
  const leo = document.querySelector('.leo-character');
  const enemies = document.querySelectorAll('.enemy-sprite');
  const crystals = document.querySelectorAll('.word-crystal');
  const dpad = document.querySelector('.virtual-dpad-container');
  const hud = document.querySelector('.hud-overlay');
  return {
    leoPresent: !!leo,
    leoTransform: leo?.style?.transform,
    enemiesCount: enemies.length,
    crystalsCount: crystals.length,
    dpadPresent: !!dpad,
    hudPresent: !!hud,
    hudText: hud?.innerText,
  };
});
console.log('DungeonRoom Elements Detected:', questDomIdle);

// Snap 06: Move Leo Right (Physics & Run Animation)
console.log('\n--- 2.2 Moving Leo (ArrowRight) ---');
await page.keyboard.down('ArrowRight');
await new Promise(r => setTimeout(r, 1200));
await snap('06_quest_demo_running');

const leoRunState = await page.evaluate(() => {
  const leo = document.querySelector('.leo-character');
  return {
    transform: leo?.style?.transform,
    classList: Array.from(leo?.classList || []),
  };
});
console.log('Leo after moving right:', leoRunState);

// Snap 07: Jump Physics (ArrowUp)
console.log('\n--- 2.3 Jump Physics (ArrowUp / Space) ---');
await page.keyboard.down('Space');
await new Promise(r => setTimeout(r, 250));
await page.keyboard.up('Space');
await snap('07_quest_demo_jumping');
await page.keyboard.up('ArrowRight');
await new Promise(r => setTimeout(r, 800)); // wait for landing

// Snap 08: Test D-Pad touch click if on screen
console.log('\n--- 2.4 Virtual D-Pad Interaction ---');
const jumpBtn = await page.$('.vd-jump-btn');
if (jumpBtn) {
  await jumpBtn.click();
  await new Promise(r => setTimeout(r, 200));
  await snap('08_quest_demo_dpad_jump');
}

// Check console errors
console.log('\n═══════════════════════════════════════════════════════');
console.log('📋 AUDIT EXECUTION SUMMARY');
console.log('═══════════════════════════════════════════════════════');
if (errors.length === 0) {
  console.log('✅ 0 runtime console errors detected during full audit!');
} else {
  console.log(`⚠️ ${errors.length} error(s) logged:`);
  errors.forEach(e => console.log(' •', e));
}

await browser.close();
console.log(`\nScreenshots written to:\n  ${OUT_DIR}`);
