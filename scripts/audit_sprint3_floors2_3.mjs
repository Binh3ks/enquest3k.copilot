/**
 * scripts/audit_sprint3_floors2_3.mjs
 * Comprehensive visual verification & audit script for Sprint 3 (Floor 2 & Floor 3 Mini-Games):
 * Floor 2:
 * 1. PotionFlipDungeon (Door 1 Vocab / crystal_match)
 * 2. AnvilRushGrammar (Door 2 Grammar / rune_forge)
 * 3. ScrollChamberDecode (Door 3 Integration / ancient_scroll)
 * Floor 3:
 * 4. EchoArenaShooter (Door 1 Vocab/Phonics / phonics_bubble)
 * 5. CatapultCommander (Door 2 Grammar / chunk_catapult)
 * 6. StormShieldDefense (Door 3 Integration / meteor_smasher)
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
console.log('🚀 SPRINT 3 AUDIT: FLOOR 2 & FLOOR 3 MINI-GAMES (6 GAMES)');
console.log('═══════════════════════════════════════════════════════');

await page.goto(`${BASE}/quest-demo`, { waitUntil: 'networkidle0', timeout: 15000 });
await new Promise(r => setTimeout(r, 1500));

// ── 1. Floor 2 Door 1: PotionFlipDungeon ─────────────────────────────
console.log('\n--- 1. Testing PotionFlipDungeon (Floor 2 Door 1) ---');
await page.select('#select-active-game', 'potion_flip');
await new Promise(r => setTimeout(r, 2000));
await snap('s3_01_potion_flip_landing');

const potionState = await page.evaluate(() => {
  const banner = document.querySelector('.potion-objective-banner');
  const cauldrons = document.querySelectorAll('.cauldron-entity');
  const gremlin = document.querySelector('.lab-gremlin-sprite');
  const leo = document.querySelector('.leo-character');
  return {
    bannerText: banner?.innerText?.replace(/\n/g, ' '),
    cauldronCount: cauldrons.length,
    gremlinFound: !!gremlin,
    leoFound: !!leo,
  };
});
console.log('PotionFlipDungeon DOM State:', potionState);

// Jump towards cauldron
await page.keyboard.down('ArrowRight');
await new Promise(r => setTimeout(r, 600));
await page.keyboard.down('Space');
await new Promise(r => setTimeout(r, 200));
await page.keyboard.up('Space');
await page.keyboard.up('ArrowRight');
await new Promise(r => setTimeout(r, 500));
await snap('s3_02_potion_flip_jump');

// ── 2. Floor 2 Door 2: AnvilRushGrammar ───────────────────────────────
console.log('\n--- 2. Testing AnvilRushGrammar (Floor 2 Door 2) ---');
await page.select('#select-active-game', 'anvil_rush');
await new Promise(r => setTimeout(r, 2000));
await snap('s3_03_anvil_rush_landing');

const anvilState = await page.evaluate(() => {
  const banner = document.querySelector('.anvil-objective-banner');
  const anvils = document.querySelectorAll('.anvil-entity');
  const imp = document.querySelector('.forge-imp-sprite');
  const leo = document.querySelector('.leo-character');
  return {
    bannerText: banner?.innerText?.replace(/\n/g, ' '),
    anvilCount: anvils.length,
    impFound: !!imp,
    leoFound: !!leo,
  };
});
console.log('AnvilRushGrammar DOM State:', anvilState);

// Run towards anvil and strike
await page.keyboard.down('ArrowLeft');
await new Promise(r => setTimeout(r, 700));
await page.keyboard.up('ArrowLeft');
await page.keyboard.down('Space');
await new Promise(r => setTimeout(r, 250));
await page.keyboard.up('Space');
await new Promise(r => setTimeout(r, 500));
await snap('s3_04_anvil_rush_strike');

// ── 3. Floor 2 Door 3: ScrollChamberDecode ───────────────────────────
console.log('\n--- 3. Testing ScrollChamberDecode (Floor 2 Door 3) ---');
await page.select('#select-active-game', 'scroll_chamber');
await new Promise(r => setTimeout(r, 2000));
await snap('s3_05_scroll_chamber_landing');

const scrollState = await page.evaluate(() => {
  const banner = document.querySelector('.scroll-objective-banner');
  const scrollProp = document.querySelector('.ancient-scroll-prop');
  const blanks = document.querySelectorAll('.scroll-blank-slot');
  const stones = document.querySelectorAll('.rune-stone-entity');
  const wraiths = document.querySelectorAll('.curse-wraith-sprite');
  const leo = document.querySelector('.leo-character');
  return {
    bannerText: banner?.innerText?.replace(/\n/g, ' '),
    scrollFound: !!scrollProp,
    blankCount: blanks.length,
    stoneCount: stones.length,
    wraithCount: wraiths.length,
    leoFound: !!leo,
  };
});
console.log('ScrollChamberDecode DOM State:', scrollState);

// Jump towards stone and pick up
await page.keyboard.down('ArrowLeft');
await new Promise(r => setTimeout(r, 800));
await page.keyboard.up('ArrowLeft');
await page.keyboard.press('KeyE');
await new Promise(r => setTimeout(r, 500));
await snap('s3_06_scroll_chamber_carrying');

// ── 4. Floor 3 Door 1: EchoArenaShooter ───────────────────────────────
console.log('\n--- 4. Testing EchoArenaShooter (Floor 3 Door 1) ---');
await page.select('#select-active-game', 'echo_arena');
await new Promise(r => setTimeout(r, 2000));
await snap('s3_07_echo_arena_landing');

const echoState = await page.evaluate(() => {
  const banner = document.querySelector('.echo-objective-banner');
  const orbs = document.querySelectorAll('.acoustic-orb-entity');
  const gremlin = document.querySelector('.noise-gremlin-sprite');
  const aimLine = document.querySelector('.slingshot-aim-line');
  const leo = document.querySelector('.leo-character');
  return {
    bannerText: banner?.innerText?.replace(/\n/g, ' '),
    orbCount: orbs.length,
    gremlinFound: !!gremlin,
    aimLineFound: !!aimLine,
    leoFound: !!leo,
  };
});
console.log('EchoArenaShooter DOM State:', echoState);

// Aim and fire bolt
await page.keyboard.press('ArrowUp');
await page.keyboard.press('ArrowUp');
await page.keyboard.press('Space');
await new Promise(r => setTimeout(r, 300));
await snap('s3_08_echo_arena_fire');

// ── 5. Floor 3 Door 2: CatapultCommander ─────────────────────────────
console.log('\n--- 5. Testing CatapultCommander (Floor 3 Door 2) ---');
await page.select('#select-active-game', 'catapult_commander');
await new Promise(r => setTimeout(r, 2000));
await snap('s3_09_catapult_commander_landing');

const catapultState = await page.evaluate(() => {
  const banner = document.querySelector('.catapult-objective-banner');
  const catapults = document.querySelectorAll('.catapult-entity');
  const horde = document.querySelector('.goblin-horde-line');
  const leo = document.querySelector('.leo-character');
  return {
    bannerText: banner?.innerText?.replace(/\n/g, ' '),
    catapultCount: catapults.length,
    hordeFound: !!horde,
    leoFound: !!leo,
  };
});
console.log('CatapultCommander DOM State:', catapultState);

// Jump towards catapult and trigger
await page.keyboard.down('ArrowLeft');
await new Promise(r => setTimeout(r, 600));
await page.keyboard.up('ArrowLeft');
await page.keyboard.press('Space');
await new Promise(r => setTimeout(r, 400));
await snap('s3_10_catapult_commander_launch');

// ── 6. Floor 3 Door 3: StormShieldDefense ─────────────────────────────
console.log('\n--- 6. Testing StormShieldDefense (Floor 3 Door 3) ---');
await page.select('#select-active-game', 'storm_shield');
await new Promise(r => setTimeout(r, 2500));
await snap('s3_11_storm_shield_landing');

const stormState = await page.evaluate(() => {
  const banner = document.querySelector('.storm-objective-banner');
  const meteors = document.querySelectorAll('.falling-meteor-entity');
  const shield = document.querySelector('.aegis-shield-aura');
  const leo = document.querySelector('.leo-character');
  return {
    bannerText: banner?.innerText?.replace(/\n/g, ' '),
    meteorCount: meteors.length,
    shieldFound: !!shield,
    leoFound: !!leo,
  };
});
console.log('StormShieldDefense DOM State:', stormState);

// Move Leo to intercept falling meteor
await page.keyboard.down('ArrowRight');
await new Promise(r => setTimeout(r, 800));
await page.keyboard.up('ArrowRight');
await page.keyboard.down('Space');
await new Promise(r => setTimeout(r, 200));
await page.keyboard.up('Space');
await new Promise(r => setTimeout(r, 600));
await snap('s3_12_storm_shield_deflect');

console.log('\n═══════════════════════════════════════════════════════');
console.log(`AUDIT SUMMARY: ${errors.length} Console/Page Errors`);
if (errors.length > 0) {
  console.error('Errors found:', errors);
} else {
  console.log('✅ 100% CLEAN: All 6 Floor 2 & Floor 3 Mini-Games Rendered with 0 Errors!');
}
console.log('═══════════════════════════════════════════════════════');

await browser.close();
process.exit(errors.length > 0 ? 1 : 0);
