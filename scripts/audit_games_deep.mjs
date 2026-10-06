/**
 * audit_games_deep.mjs - v3
 * Phase 0 Deep Audit: Click "🔑 Open Chest" to enter each game, capture real gameplay DOM
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOT_DIR = path.join(__dirname, '..', 'docs', 'agent_artifacts', 'screenshots');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const BASE_URL = 'http://localhost:5173';
const WEEK = 33;

const DEEP_AUDIT_GAMES = [
  { floor: 1, roomParam: 0, doorIdx: 0, gameId: 'arcane_bubble',       label: 'Arcane Bubble Pop',        prevVerified: true  },
  { floor: 1, roomParam: 0, doorIdx: 1, gameId: 'spell_train',         label: 'Spell Sentence Train',     prevVerified: false },
  { floor: 1, roomParam: 0, doorIdx: 2, gameId: 'lexical_det',         label: 'Lexical Detective',        prevVerified: false },
  { floor: 2, roomParam: 1, doorIdx: 0, gameId: 'crystal_match',       label: 'Crystal Memory Match',     prevVerified: false },
  { floor: 2, roomParam: 1, doorIdx: 1, gameId: 'rune_forge',          label: 'Rune Forge',               prevVerified: false },
  { floor: 2, roomParam: 1, doorIdx: 2, gameId: 'ancient_scroll',      label: 'Ancient Scroll Cloze',     prevVerified: false },
  { floor: 3, roomParam: 2, doorIdx: 0, gameId: 'phonics_bubble',      label: 'Phonics Sound Blaster',    prevVerified: false },
  { floor: 3, roomParam: 2, doorIdx: 1, gameId: 'chunk_catapult',      label: 'Chunk Catapult Match',     prevVerified: true  },
  { floor: 3, roomParam: 2, doorIdx: 2, gameId: 'meteor_smasher',      label: 'Meteor Smasher',           prevVerified: false },
  { floor: 4, roomParam: 3, doorIdx: 0, gameId: 'highway_runner',      label: 'Highway Word Runner',      prevVerified: true  },
  { floor: 4, roomParam: 3, doorIdx: 1, gameId: 'spell_train_express', label: 'Syntax Express 4-Car',     prevVerified: false },
  { floor: 4, roomParam: 3, doorIdx: 2, gameId: 'lexical_riddle',      label: 'Mystery Riddle Detective', prevVerified: false },
  { floor: 5, roomParam: 4, doorIdx: 0, gameId: 'grand_matrix',        label: 'Grand Master Matrix',      prevVerified: false },
  { floor: 5, roomParam: 4, doorIdx: 1, gameId: 'titan_forge',         label: 'Titan Grammar Forge',      prevVerified: false },
  { floor: 5, roomParam: 4, doorIdx: 2, gameId: 'cambridge_cloze',     label: 'Cambridge Cloze Gauntlet', prevVerified: false },
];

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function deepAuditGame(page, game, index) {
  const { floor, roomParam, doorIdx, gameId, label, prevVerified } = game;
  const url = `${BASE_URL}/week/${WEEK}/chronicles?room=${roomParam}&owner=true`;

  console.log(`\n[${index+1}/15] ${label} (F${floor}/D${doorIdx}) — ${gameId}${prevVerified ? ' [PREV VERIFIED]' : ''}`);

  const result = {
    gameId, label, floor, doorIdx, prevVerified,
    url, status: 'UNKNOWN', gameplayDom: null, gameplayScreenshot: null,
    hasCanvas: null, consoleErrors: [], notes: [],
  };

  if (prevVerified) {
    result.status = 'PREV_VERIFIED';
    console.log('  ⏭️ Skipped (previously verified)');
    return result;
  }

  const errors = [];
  page.removeAllListeners('console');
  page.removeAllListeners('pageerror');
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push('PageError: ' + err.message));

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
    await sleep(2000);

    // Find and click the correct "Open Chest" button (doorIdx=0 → first, doorIdx=1 → second, etc.)
    const openChestBtns = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('button'))
        .filter(b => b.textContent.includes('Open Chest'))
        .map((b, i) => i);
    });
    console.log(`  🔑 Open Chest buttons found: ${openChestBtns.length}`);

    if (openChestBtns.length <= doorIdx) {
      result.status = 'CHEST_BTN_NOT_FOUND';
      const allBtns = await page.evaluate(() =>
        Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim().substring(0, 40)).filter(Boolean)
      );
      result.notes.push('Buttons: ' + allBtns.join(' | '));
      console.log('  ⚠️ Not enough buttons. Found: ' + allBtns.join(' | '));
      result.consoleErrors = errors;
      return result;
    }

    await page.evaluate((idx) => {
      const btns = Array.from(document.querySelectorAll('button'))
        .filter(b => b.textContent.includes('Open Chest'));
      if (btns[idx]) btns[idx].click();
    }, doorIdx);
    console.log(`  👆 Clicked "Open Chest" #${doorIdx}`);

    // Wait for game to load (Phaser ~2-3s, React ~instant)
    await sleep(3500);

    // Screenshot
    const ssPath = path.join(SCREENSHOT_DIR, 'deep_' + String(index+1).padStart(2,'0') + '_' + gameId + '_game.png');
    await page.screenshot({ path: ssPath });
    result.gameplayScreenshot = ssPath;
    console.log('  📸 Screenshot: ' + path.basename(ssPath));

    // Full DOM text verbatim
    const domText = await page.evaluate(() => document.body.innerText);
    result.gameplayDom = domText;
    console.log('  📄 DOM: ' + domText.replace(/\n/g, ' | ').substring(0, 400));

    // Assess
    const hasCanvas = await page.evaluate(() => !!document.querySelector('canvas'));
    result.hasCanvas = hasCanvas;

    const isStillChestScreen = domText.includes('Open Chest') && domText.includes('Chest 1:');
    const isBlank = domText.trim().length < 80;
    const hasError = domText.toLowerCase().includes('something went wrong') || domText.toLowerCase().includes('cannot read');

    console.log('  🎮 canvas=' + hasCanvas + ' | chestScreen=' + isStillChestScreen + ' | blank=' + isBlank + ' | error=' + hasError);

    if (isBlank) result.status = 'BLANK';
    else if (hasError) result.status = 'ERROR';
    else if (isStillChestScreen) result.status = 'STUCK_AT_CHEST';
    else if (hasCanvas) result.status = 'CANVAS_LOADED';
    else result.status = 'REACT_LOADED';

    result.consoleErrors = errors;
    if (errors.length > 0) console.log('  🔴 Errors: ' + errors.slice(0,3).join(' | '));

  } catch (err) {
    result.status = 'CRASH';
    result.notes.push('Exception: ' + err.message);
    result.consoleErrors = errors;
    console.log('  ❌ CRASH: ' + err.message);
  }

  return result;
}

async function main() {
  console.log('=== Phase 0 DEEP Audit v3 — Click Open Chest & Enter Game ===');
  console.log('Week ' + WEEK + ' | URL: ' + BASE_URL + '\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-fake-ui-for-media-stream'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const results = [];
  for (let i = 0; i < DEEP_AUDIT_GAMES.length; i++) {
    results.push(await deepAuditGame(page, DEEP_AUDIT_GAMES[i], i));
    await sleep(300);
  }

  await browser.close();

  const reportPath = path.join(__dirname, 'game_deep_audit_results.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log('\n✅ Deep audit complete → ' + reportPath);

  console.log('\n=== SUMMARY ===');
  console.log('# | GameID               | Status                  | Canvas');
  console.log('--|---------------------|-------------------------|-------');
  results.forEach((r, i) => {
    console.log(
      String(i+1).padStart(2) + ' | ' +
      r.gameId.padEnd(20) + ' | ' +
      String(r.status).padEnd(23) + ' | ' +
      (r.hasCanvas !== null ? (r.hasCanvas ? 'YES' : 'NO') : '-')
    );
  });
}

main().catch(console.error);
