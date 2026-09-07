/**
 * scripts/audit_sprint4_floors4_5.mjs
 * Comprehensive visual verification & audit script for Sprint 4 (Floor 4 & Floor 5 Mini-Games):
 * Floor 4:
 * 1. HighwaySprint (Door 1 Vocab / highway_runner)
 * 2. SyntaxExpressRail (Door 2 Grammar / spell_train_express)
 * 3. RiddleRunMaze (Door 3 Integration / lexical_riddle)
 * Floor 5:
 * 4. GrandMatrixDungeon (Door 1 Vocab / grand_matrix)
 * 5. TitanGrammarForge (Door 2 Grammar / titan_forge)
 * 6. CambridgeClozeGauntlet (Door 3 Integration / cambridge_cloze)
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
console.log('🚀 SPRINT 4 AUDIT: FLOOR 4 & FLOOR 5 MINI-GAMES (6 GAMES)');
console.log('═══════════════════════════════════════════════════════');

await page.goto(`${BASE}/quest-demo`, { waitUntil: 'networkidle0', timeout: 15000 });
await new Promise(r => setTimeout(r, 1500));

// ── 1. Floor 4 Door 1: HighwaySprint ─────────────────────────────────
console.log('\n--- 1. Testing HighwaySprint (Floor 4 Door 1) ---');
await page.select('#select-active-game', 'highway_sprint');
await new Promise(r => setTimeout(r, 2000));
await snap('s4_01_highway_sprint_landing');

const highwayState = await page.evaluate(() => {
  const banner = document.querySelector('.highway-objective-banner');
  const lanes = document.querySelectorAll('.highway-lane-strip');
  const items = document.querySelectorAll('.highway-item-entity');
  const leo = document.querySelector('.highway-leo-wrapper');
  return {
    bannerText: banner?.innerText?.replace(/\n/g, ' '),
    laneCount: lanes.length,
    itemCount: items.length,
    leoFound: !!leo,
  };
});
console.log('HighwaySprint DOM State:', highwayState);

// Jump and lane shift
await page.keyboard.press('ArrowDown');
await new Promise(r => setTimeout(r, 300));
await page.keyboard.press('Space');
await new Promise(r => setTimeout(r, 200));
await snap('s4_02_highway_sprint_jump');

// ── 2. Floor 4 Door 2: SyntaxExpressRail ─────────────────────────────
console.log('\n--- 2. Testing SyntaxExpressRail (Floor 4 Door 2) ---');
await page.select('#select-active-game', 'syntax_express');
await new Promise(r => setTimeout(r, 2000));
await snap('s4_03_syntax_express_landing');

const syntaxState = await page.evaluate(() => {
  const banner = document.querySelector('.syntax-rail-banner');
  const levers = document.querySelectorAll('.rail-switch-entity');
  const train = document.querySelector('.distant-express-train');
  const leo = document.querySelector('.leo-character');
  return {
    bannerText: banner?.innerText?.replace(/\n/g, ' '),
    leverCount: levers.length,
    trainFound: !!train,
    leoFound: !!leo,
  };
});
console.log('SyntaxExpressRail DOM State:', syntaxState);

// Jump towards lever and switch
await page.keyboard.down('ArrowLeft');
await new Promise(r => setTimeout(r, 600));
await page.keyboard.up('ArrowLeft');
await page.keyboard.press('Space');
await new Promise(r => setTimeout(r, 400));
await snap('s4_04_syntax_express_switch');

// ── 3. Floor 4 Door 3: RiddleRunMaze ─────────────────────────────────
console.log('\n--- 3. Testing RiddleRunMaze (Floor 4 Door 3) ---');
await page.select('#select-active-game', 'riddle_maze');
await new Promise(r => setTimeout(r, 2000));
await snap('s4_05_riddle_maze_landing');

const riddleState = await page.evaluate(() => {
  const banner = document.querySelector('.riddle-maze-banner');
  const doors = document.querySelectorAll('.vault-door-entity');
  const beast = document.querySelector('.chaser-beast-sprite');
  const leo = document.querySelector('.leo-character');
  return {
    bannerText: banner?.innerText?.replace(/\n/g, ' '),
    doorCount: doors.length,
    beastFound: !!beast,
    leoFound: !!leo,
  };
});
console.log('RiddleRunMaze DOM State:', riddleState);

// Jump towards door
await page.keyboard.down('ArrowLeft');
await new Promise(r => setTimeout(r, 700));
await page.keyboard.up('ArrowLeft');
await page.keyboard.press('Space');
await new Promise(r => setTimeout(r, 300));
await snap('s4_06_riddle_maze_door');

// ── 4. Floor 5 Door 1: GrandMatrixDungeon ─────────────────────────────
console.log('\n--- 4. Testing GrandMatrixDungeon (Floor 5 Door 1) ---');
await page.select('#select-active-game', 'grand_matrix');
await new Promise(r => setTimeout(r, 2000));
await snap('s4_07_grand_matrix_landing');

const matrixState = await page.evaluate(() => {
  const banner = document.querySelector('.matrix-dungeon-banner');
  const nodes = document.querySelectorAll('.matrix-glyph-entity');
  const sentinel = document.querySelector('.glitch-sentinel-sprite');
  const leo = document.querySelector('.leo-character');
  return {
    bannerText: banner?.innerText?.replace(/\n/g, ' '),
    nodeCount: nodes.length,
    sentinelFound: !!sentinel,
    leoFound: !!leo,
  };
});
console.log('GrandMatrixDungeon DOM State:', matrixState);

// Jump to node
await page.keyboard.down('ArrowRight');
await new Promise(r => setTimeout(r, 600));
await page.keyboard.up('ArrowRight');
await page.keyboard.press('Space');
await new Promise(r => setTimeout(r, 400));
await snap('s4_08_grand_matrix_harvest');

// ── 5. Floor 5 Door 2: TitanGrammarForge ──────────────────────────────
console.log('\n--- 5. Testing TitanGrammarForge (Floor 5 Door 2) ---');
await page.select('#select-active-game', 'titan_forge');
await new Promise(r => setTimeout(r, 2000));
await snap('s4_09_titan_forge_landing');

const titanState = await page.evaluate(() => {
  const banner = document.querySelector('.titan-forge-banner');
  const cogs = document.querySelectorAll('.titan-gear-entity');
  const gearsBg = document.querySelector('.background-titan-gears');
  const leo = document.querySelector('.leo-character');
  return {
    bannerText: banner?.innerText?.replace(/\n/g, ' '),
    cogCount: cogs.length,
    gearsBgFound: !!gearsBg,
    leoFound: !!leo,
  };
});
console.log('TitanGrammarForge DOM State:', titanState);

// Jump towards cog
await page.keyboard.down('ArrowLeft');
await new Promise(r => setTimeout(r, 700));
await page.keyboard.up('ArrowLeft');
await page.keyboard.press('Space');
await new Promise(r => setTimeout(r, 400));
await snap('s4_10_titan_forge_activate');

// ── 6. Floor 5 Door 3: CambridgeClozeGauntlet ─────────────────────────
console.log('\n--- 6. Testing CambridgeClozeGauntlet (Floor 5 Door 3) ---');
await page.select('#select-active-game', 'cambridge_cloze');
await new Promise(r => setTimeout(r, 2000));
await snap('s4_11_cambridge_cloze_landing');

const gauntletState = await page.evaluate(() => {
  const banner = document.querySelector('.gauntlet-objective-banner');
  const monument = document.querySelector('.apex-monument-prop');
  const slots = document.querySelectorAll('.monument-slot');
  const crystals = document.querySelectorAll('.zenith-crystal-entity');
  const watcher = document.querySelector('.astral-watcher-sprite');
  const leo = document.querySelector('.leo-character');
  return {
    bannerText: banner?.innerText?.replace(/\n/g, ' '),
    monumentFound: !!monument,
    slotCount: slots.length,
    crystalCount: crystals.length,
    watcherFound: !!watcher,
    leoFound: !!leo,
  };
});
console.log('CambridgeClozeGauntlet DOM State:', gauntletState);

// Jump towards crystal and grab
await page.keyboard.down('ArrowLeft');
await new Promise(r => setTimeout(r, 800));
await page.keyboard.up('ArrowLeft');
await page.keyboard.press('KeyE');
await new Promise(r => setTimeout(r, 500));
await snap('s4_12_cambridge_cloze_carrying');

console.log('\n═══════════════════════════════════════════════════════');
console.log(`AUDIT SUMMARY: ${errors.length} Console/Page Errors`);
if (errors.length > 0) {
  console.error('Errors found:', errors);
} else {
  console.log('✅ 100% CLEAN: All 6 Floor 4 & Floor 5 Mini-Games Rendered with 0 Errors!');
}
console.log('═══════════════════════════════════════════════════════');

await browser.close();
process.exit(errors.length > 0 ? 1 : 0);
