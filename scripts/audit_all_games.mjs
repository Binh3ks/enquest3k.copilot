/**
 * audit_all_games.mjs
 * Phase 0 Audit: Kiểm chứng tất cả 15 games trong Super Leo Chronicles
 * Quy trình: navigate → screenshot landing → click START → screenshot gameplay → DOM text verbatim
 * 
 * Game mapping: Floor (1-5) × Door (0-2) → Room param = Floor (1-5), door = 0,1,2
 * URL pattern: /week/33/chronicles?room={floor}&owner=true
 * Then simulate door click
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

// IMPORTANT: room param = dayIndex (0-indexed). Floor 1 = room=0, Floor 2 = room=1, etc.
// Floor 5 (room=4) is actually the "Apex Spire" with Grand Master Matrix, Titan Forge, Cambridge Cloze
// Floor 5 maps to room=4 BUT there's also a Secret Citadel at room=5 (discovered in audit)
const GAME_MATRIX = [
  // Floor 1: Chamber of Tales → room=0
  { floor: 1, roomParam: 0, doorIdx: 0, gameId: 'arcane_bubble',    label: 'Arcane Bubble Pop',        type: 'vocab'       },
  { floor: 1, roomParam: 0, doorIdx: 1, gameId: 'spell_train',      label: 'Spell Sentence Train',     type: 'grammar'     },
  { floor: 1, roomParam: 0, doorIdx: 2, gameId: 'lexical_det',      label: 'Lexical Detective',        type: 'integration' },
  // Floor 2: Alchemy Lab → room=1
  { floor: 2, roomParam: 1, doorIdx: 0, gameId: 'crystal_match',    label: 'Crystal Memory Match',     type: 'vocab'       },
  { floor: 2, roomParam: 1, doorIdx: 1, gameId: 'rune_forge',       label: 'Rune Forge',               type: 'grammar'     },
  { floor: 2, roomParam: 1, doorIdx: 2, gameId: 'ancient_scroll',   label: 'Ancient Scroll Cloze',     type: 'integration' },
  // Floor 3: Thunder Arena → room=2
  { floor: 3, roomParam: 2, doorIdx: 0, gameId: 'phonics_bubble',   label: 'Phonics Sound Blaster',    type: 'vocab'       },
  { floor: 3, roomParam: 2, doorIdx: 1, gameId: 'chunk_catapult',   label: 'Chunk Catapult Match',     type: 'grammar'     },
  { floor: 3, roomParam: 2, doorIdx: 2, gameId: 'meteor_smasher',   label: 'Meteor Smasher',           type: 'integration' },
  // Floor 4: Rune Sanctum → room=3
  { floor: 4, roomParam: 3, doorIdx: 0, gameId: 'highway_runner',   label: 'Highway Word Runner',      type: 'vocab'       },
  { floor: 4, roomParam: 3, doorIdx: 1, gameId: 'spell_train_express', label: 'Syntax Express 4-Car', type: 'grammar'     },
  { floor: 4, roomParam: 3, doorIdx: 2, gameId: 'lexical_riddle',   label: 'Mystery Riddle Detective', type: 'integration' },
  // Floor 5: Apex Spire → room=4
  { floor: 5, roomParam: 4, doorIdx: 0, gameId: 'grand_matrix',     label: 'Grand Master Matrix',      type: 'vocab'       },
  { floor: 5, roomParam: 4, doorIdx: 1, gameId: 'titan_forge',      label: 'Titan Grammar Forge',      type: 'grammar'     },
  { floor: 5, roomParam: 4, doorIdx: 2, gameId: 'cambridge_cloze',  label: 'Cambridge Cloze Gauntlet', type: 'integration' },
];

// Already verified in previous sessions (Pilot)
const ALREADY_VERIFIED = ['arcane_bubble', 'highway_runner', 'chunk_catapult'];

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function auditGame(page, game, index) {
  const { floor, doorIdx, gameId, label, type } = game;
  const url = `${BASE_URL}/week/${WEEK}/chronicles?room=${game.roomParam}&owner=true`;
  
  console.log(`\n[${index+1}/15] Auditing: ${label} (Floor ${floor}, Door ${doorIdx}) — ${gameId}`);
  console.log(`  URL: ${url}`);
  
  const result = {
    gameId,
    label,
    floor,
    doorIdx,
    type,
    url,
    alreadyVerified: ALREADY_VERIFIED.includes(gameId),
    landingDom: null,
    landingScreenshot: null,
    gameplayDom: null,
    gameplayScreenshot: null,
    consoleErrors: [],
    status: 'UNKNOWN',
    notes: [],
  };

  const errors = [];
  page.removeAllListeners('console');
  page.removeAllListeners('pageerror');
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(`PageError: ${err.message}`));

  try {
    // Step 1: Navigate to room
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
    await sleep(2500);

    // Step 2: Screenshot landing room map
    const landingPath = path.join(SCREENSHOT_DIR, `${String(index+1).padStart(2,'0')}_${gameId}_landing.png`);
    await page.screenshot({ path: landingPath, fullPage: false });
    result.landingScreenshot = landingPath;
    console.log(`  📸 Landing screenshot: ${path.basename(landingPath)}`);

    // Step 3: Get landing DOM
    const landingDom = await page.evaluate(() => {
      const text = document.body.innerText;
      return text.substring(0, 600);
    });
    result.landingDom = landingDom;
    console.log(`  📄 Landing DOM (600 chars): ${landingDom.replace(/\n/g, ' | ').substring(0, 200)}`);

    // Step 4: Click the correct door (doorIdx 0, 1, or 2)
    // Doors render as .dr-door-indicator elements, click the one at doorIdx position
    // First: check if room loaded (should show door indicators)
    const doorCount = await page.evaluate(() => {
      return document.querySelectorAll('.dr-door-indicator').length;
    });
    console.log(`  🚪 Door count on page: ${doorCount}`);

    if (doorCount > doorIdx) {
      // Click the door at doorIdx
      await page.evaluate((idx) => {
        const doors = document.querySelectorAll('.dr-door-indicator');
        if (doors[idx]) doors[idx].click();
      }, doorIdx);
      console.log(`  👆 Clicked door ${doorIdx} (${type})`);
      await sleep(2500);
    } else if (doorCount === 0) {
      // Try clicking by data attributes or alternative selectors
      result.notes.push(`WARNING: No .dr-door-indicator found (doorCount=0). May be wrong screen or loading issue.`);
      console.log(`  ⚠️ No doors found. Trying alternative selectors...`);
      
      // Try pressing Enter or clicking any button
      const buttons = await page.evaluate(() => {
        const btns = document.querySelectorAll('button');
        return Array.from(btns).map(b => b.textContent.trim().substring(0, 50)).filter(Boolean);
      });
      console.log(`  🔘 Buttons found: ${buttons.join(', ')}`);
      result.notes.push(`Buttons found: ${buttons.join(', ')}`);
    }

    // Step 5: Screenshot gameplay
    const gameplayPath = path.join(SCREENSHOT_DIR, `${String(index+1).padStart(2,'0')}_${gameId}_gameplay.png`);
    await page.screenshot({ path: gameplayPath, fullPage: false });
    result.gameplayScreenshot = gameplayPath;
    console.log(`  📸 Gameplay screenshot: ${path.basename(gameplayPath)}`);

    // Step 6: Get gameplay DOM (full verbatim)
    const gameplayDom = await page.evaluate(() => {
      return document.body.innerText;
    });
    result.gameplayDom = gameplayDom;
    console.log(`  📄 Gameplay DOM (800 chars): ${gameplayDom.replace(/\n/g, ' | ').substring(0, 400)}`);

    // Step 7: Assess status from DOM
    const domLower = gameplayDom.toLowerCase();
    const hasErrorIndicators = domLower.includes('something went wrong') || 
                               domLower.includes('error') ||
                               domLower.includes('undefined') ||
                               domLower.includes('cannot read');
    const isBlank = gameplayDom.trim().length < 50;
    const hasLoadingSpinner = domLower.includes('loading') && gameplayDom.trim().length < 100;
    
    if (isBlank || hasLoadingSpinner) {
      result.status = 'BLANK_OR_LOADING';
      result.notes.push('DOM appears blank or stuck on loading spinner');
    } else if (hasErrorIndicators) {
      result.status = 'HAS_ERROR';
      result.notes.push('DOM contains error indicators');
    } else {
      result.status = 'RENDERED';
    }

    result.consoleErrors = errors;
    if (errors.length > 0) {
      console.log(`  🔴 Console errors: ${errors.slice(0,3).join('; ')}`);
    }

  } catch (err) {
    result.status = 'CRASH';
    result.notes.push(`Exception: ${err.message}`);
    console.log(`  ❌ CRASH: ${err.message}`);
    result.consoleErrors = errors;
  }

  return result;
}

async function main() {
  console.log('=== Phase 0 Audit: Super Leo Chronicles — All 15 Games ===');
  console.log(`Target: Week ${WEEK}, URL base: ${BASE_URL}`);
  console.log(`Screenshots: ${SCREENSHOT_DIR}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-fake-ui-for-media-stream'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const results = [];
  
  for (let i = 0; i < GAME_MATRIX.length; i++) {
    const game = GAME_MATRIX[i];
    const result = await auditGame(page, game, i);
    results.push(result);
    await sleep(500);
  }

  await browser.close();

  // Save JSON results
  const reportPath = path.join(__dirname, 'game_audit_results.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n✅ Audit complete. Results saved to: ${reportPath}`);

  // Print summary table
  console.log('\n=== SUMMARY TABLE ===');
  console.log('Floor | Door | Game ID              | Status          | Console Errors');
  console.log('------|------|----------------------|-----------------|---------------');
  for (const r of results) {
    const errCount = r.consoleErrors.length;
    const verified = r.alreadyVerified ? ' [PREV VERIFIED]' : '';
    console.log(
      `  F${r.floor}  |  D${r.doorIdx} | ${r.gameId.padEnd(20)} | ${(r.status + verified).padEnd(15)} | ${errCount} errors`
    );
  }
}

main().catch(console.error);
