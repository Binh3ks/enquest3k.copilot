/**
 * audit_gamification_layer.mjs — Puppeteer audit for Phase F Gamification Layer (Part 9)
 * Audits all 4 micro-moments:
 *  - M1: QuestEntryOverlay (cinematic hook)
 *  - M2: StreakCornerBadge & Micro-particles
 *  - M3: QuestCompleteFanfare
 *  - M4: DoorUnlockCeremony
 */
import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
import path from 'path';

const OUT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/ad18b61f-917e-430a-93ab-ecaa9f37ac43/screenshots';
mkdirSync(OUT_DIR, { recursive: true });

const BASE = 'http://localhost:5173';
const errors = [];

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844 }); // iPhone 14 mobile viewport

// Pre-seed localStorage on all page navigations
await page.evaluateOnNewDocument(() => {
  localStorage.setItem('engquest_onboarded', 'true');
  localStorage.setItem('arcade_owner_bypass', 'true');
  localStorage.setItem('engquest3k_srs_daily_reviewed', new Date().toISOString().slice(0, 10));
});

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
  return await page.evaluate(() => document.body.innerText.slice(0, 1500));
}

// ── TEST 1: M1 QuestEntryOverlay on TaskScreen entry ────────────────────────
console.log('\n=== TEST 1: M1 QuestEntryOverlay ===');
await page.goto(`${BASE}/week/33/task/gear1_webtoon`, { waitUntil: 'domcontentloaded', timeout: 15000 });
// Wait for overlay to mount, capture within 1.5s auto-dismiss window
await new Promise(r => setTimeout(r, 400));
await snap('07_quest_entry_overlay');
const dom1 = await domText();
console.log('DOM (Quest Entry Overlay):\n', dom1);

// ── TEST 2: M2 StreakCornerBadge after Overlay Dismissal ───────────────────
console.log('\n=== TEST 2: M2 StreakCornerBadge ===');
// Wait for overlay auto-dismiss (1.5s + transition)
await new Promise(r => setTimeout(r, 1600));
await snap('08_streak_corner_badge');
const dom2 = await domText();
console.log('DOM (Streak Corner Badge):\n', dom2);

// ── TEST 3: M3 QuestCompleteFanfare ─────────────────────────────────────────
console.log('\n=== TEST 3: M3 QuestCompleteFanfare ===');
const fanfareTriggered = await page.evaluate(() => {
  if (typeof window.__triggerTaskComplete === 'function') {
    window.__triggerTaskComplete(100);
    return true;
  }
  return false;
});
console.log(`Triggered Task Complete: ${fanfareTriggered}`);
await new Promise(r => setTimeout(r, 600));
await snap('09_quest_complete_fanfare');
const dom3 = await domText();
console.log('DOM (Quest Complete Fanfare):\n', dom3);

// ── TEST 4: M4 DoorUnlockCeremony on QuestMap3D ──────────────────────────────
console.log('\n=== TEST 4: M4 DoorUnlockCeremony ===');
await page.goto(`${BASE}/week/33/hub/1`, { waitUntil: 'networkidle0', timeout: 15000 });
await new Promise(r => setTimeout(r, 800));

const ceremonyTriggered = await page.evaluate(() => {
  if (typeof window.__triggerDoorUnlockCeremony === 'function') {
    window.__triggerDoorUnlockCeremony(0); // Day 1 completed -> unlocks Day 2
    return true;
  }
  return false;
});
console.log(`Triggered Door Unlock Ceremony: ${ceremonyTriggered}`);
await new Promise(r => setTimeout(r, 700));
await snap('10_door_unlock_ceremony');

// Wait for door open animation to complete (stage: revealed)
await new Promise(r => setTimeout(r, 2200));
await snap('11_door_unlock_revealed');
const dom4 = await domText();
console.log('DOM (Door Unlock Ceremony Revealed):\n', dom4);

await browser.close();

console.log('\n════════════════════════════════════════');
console.log('📋 AUDIT REPORT — Gamification Layer (Phần 9)');
console.log('════════════════════════════════════════');
if (errors.length === 0) {
  console.log('✅ No runtime errors detected in Gamification Layer');
} else {
  console.log(`🔴 ${errors.length} error(s) detected:`);
  errors.forEach(e => console.log(' •', e));
}
