/**
 * scripts/audit_sprint2_floor1.mjs
 * Comprehensive visual verification & audit script for Sprint 2 (Floor 1 Mini-Games):
 * - BubbleStormChase (Door 1 Vocab)
 * - WordWagonJump (Door 2 Grammar)
 * - ShadowVaultInfiltrate (Door 3 Integration)
 * - Verification in both /quest-demo harness and /week/33/chronicles real gameplay flow
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
await page.setViewport({ width: 900, height: 650, isMobile: true, hasTouch: true });

// Pre-seed localStorage
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
console.log('🚀 SPRINT 2 AUDIT: FLOOR 1 MINI-GAMES');
console.log('═══════════════════════════════════════════════════════');

// ── PART 1: BubbleStormChase (Floor 1 Door 1) ──────────────────────
console.log('\n--- 1. Testing BubbleStormChase (/quest-demo) ---');
await page.goto(`${BASE}/quest-demo`, { waitUntil: 'networkidle0', timeout: 15000 });
await new Promise(r => setTimeout(r, 1500));

// Select BubbleStormChase
await page.select('#select-active-game', 'bubble_storm');
await new Promise(r => setTimeout(r, 2000));
await snap('s2_01_bubble_storm_landing');

const bubbleState = await page.evaluate(() => {
  const banner = document.querySelector('.target-spellbook-banner');
  const bubbles = document.querySelectorAll('.storm-crystal-bubble');
  const slimes = document.querySelectorAll('.storm-slime-enemy');
  const platforms = document.querySelectorAll('.storm-platform');
  const leo = document.querySelector('.leo-character');
  return {
    bannerText: banner?.innerText?.replace(/\n/g, ' '),
    bubbleCount: bubbles.length,
    slimeCount: slimes.length,
    platformCount: platforms.length,
    leoFound: !!leo,
  };
});
console.log('BubbleStormChase DOM State:', bubbleState);

// Move Leo towards a bubble
await page.keyboard.down('ArrowRight');
await new Promise(r => setTimeout(r, 800));
await page.keyboard.down('Space');
await new Promise(r => setTimeout(r, 250));
await page.keyboard.up('Space');
await page.keyboard.up('ArrowRight');
await new Promise(r => setTimeout(r, 600));
await snap('s2_02_bubble_storm_jump');

// ── PART 2: WordWagonJump (Floor 1 Door 2) ──────────────────────────
console.log('\n--- 2. Testing WordWagonJump (/quest-demo) ---');
await page.select('#select-active-game', 'word_wagon');
await new Promise(r => setTimeout(r, 2000));
await snap('s2_03_word_wagon_landing');

const wagonState = await page.evaluate(() => {
  const banner = document.querySelector('.wagon-sentence-banner');
  const wagons = document.querySelectorAll('.train-wagon-entity');
  const tracks = document.querySelector('.wagon-tracks-layer');
  const leo = document.querySelector('.leo-character');
  return {
    bannerText: banner?.innerText?.replace(/\n/g, ' '),
    wagonCount: wagons.length,
    tracksFound: !!tracks,
    leoFound: !!leo,
  };
});
console.log('WordWagonJump DOM State:', wagonState);

// Jump onto a wagon
await page.keyboard.down('ArrowRight');
await new Promise(r => setTimeout(r, 500));
await page.keyboard.down('Space');
await new Promise(r => setTimeout(r, 250));
await page.keyboard.up('Space');
await new Promise(r => setTimeout(r, 400));
await page.keyboard.up('ArrowRight');
await snap('s2_04_word_wagon_jump');

// ── PART 3: ShadowVaultInfiltrate (Floor 1 Door 3) ──────────────────
console.log('\n--- 3. Testing ShadowVaultInfiltrate (/quest-demo) ---');
await page.select('#select-active-game', 'shadow_vault');
await new Promise(r => setTimeout(r, 2000));
await snap('s2_05_shadow_vault_landing');

const vaultState = await page.evaluate(() => {
  const banner = document.querySelector('.vault-mission-banner');
  const leftSafes = document.querySelectorAll('.safe-left');
  const rightSafes = document.querySelectorAll('.safe-right');
  const guards = document.querySelectorAll('.shadow-guard-entity');
  const leo = document.querySelector('.leo-character');
  return {
    bannerText: banner?.innerText?.replace(/\n/g, ' '),
    leftSafesCount: leftSafes.length,
    rightSafesCount: rightSafes.length,
    guardCount: guards.length,
    leoFound: !!leo,
  };
});
console.log('ShadowVaultInfiltrate DOM State:', vaultState);

// Move Leo to touch the first left safe (pick up word)
await page.keyboard.down('ArrowLeft');
await new Promise(r => setTimeout(r, 600));
await page.keyboard.up('ArrowLeft');
await page.keyboard.down('Space');
await new Promise(r => setTimeout(r, 250));
await page.keyboard.up('Space');
await new Promise(r => setTimeout(r, 800));
await snap('s2_06_shadow_vault_carrying');

const carryingState = await page.evaluate(() => {
  const cargo = document.querySelector('.leo-floating-cargo');
  const banner = document.querySelector('.vault-mission-banner');
  return {
    cargoText: cargo?.innerText,
    bannerText: banner?.innerText?.replace(/\n/g, ' '),
  };
});
console.log('Vault Cargo State:', carryingState);

// ── PART 4: Real Chronicles Daily Room Integration ──────────────────
console.log('\n--- 4. Testing Floor 1 in /week/33/chronicles ---');
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.goto(`${BASE}/week/33/chronicles`, { waitUntil: 'networkidle0', timeout: 15000 });
await new Promise(r => setTimeout(r, 2000));

// Click Floor 1
const roomBtn = await page.$('.cwm-room-node');
if (roomBtn) {
  await roomBtn.click();
  await new Promise(r => setTimeout(r, 1500));
}

// Click Door 1 (Bubble Storm Chase)
const door1 = await page.$('.dr-door-enter-btn');
if (door1) {
  console.log('Entering Door 1 (Bubble Storm Chase)...');
  await door1.click();
  await new Promise(r => setTimeout(r, 2000));
  await snap('s2_07_chronicles_door1_active');
}

console.log('\n═══════════════════════════════════════════════════════');
console.log('📋 AUDIT EXECUTION SUMMARY');
console.log('═══════════════════════════════════════════════════════');
if (errors.length === 0) {
  console.log('✅ 0 runtime console errors detected during Sprint 2 audit!');
} else {
  console.log(`⚠️ ${errors.length} error(s) logged:`);
  errors.forEach(e => console.log(' •', e));
}

await browser.close();
console.log(`\nScreenshots written to:\n  ${OUT_DIR}`);
