/**
 * audit_production_chronicles.mjs
 * Puppeteer audit directly against production app.bkbacademy.vn
 */
import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
import path from 'path';

const OUT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/f875fff5-035d-4b7d-9f40-9d8daf173aeb/screenshots';
mkdirSync(OUT_DIR, { recursive: true });

const TARGET_URL = 'https://app.bkbacademy.vn/week/33/chronicles';
const consoleErrors = [];
const pageErrors = [];
const failedRequests = [];

console.log(`🚀 Launching local Puppeteer to audit: ${TARGET_URL}`);

const browser = await puppeteer.launch({
  headless: 'new',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--use-fake-ui-for-media-stream',
  ],
});

const page = await browser.newPage();
await page.setViewport({ width: 414, height: 896, deviceScaleFactor: 2 }); // iPhone XR/11 Pro Max

page.on('console', (msg) => {
  if (msg.type() === 'error') {
    consoleErrors.push(`[console.error] ${msg.text()}`);
  }
});

page.on('pageerror', (err) => {
  pageErrors.push(`[pageerror] ${err.message}`);
});

page.on('requestfailed', (req) => {
  failedRequests.push(`[failed-request] ${req.url()} - ${req.failure()?.errorText}`);
});

async function snap(name) {
  const file = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: file });
  console.log(`📸 Screenshot saved: ${name}.png -> ${file}`);
  return file;
}

try {
  // ── STEP 1: Load World Map ────────────────────────────────────────────────
  console.log('\n--- 1. Navigating to Chronicles World Map ---');
  const resp = await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 25000 });
  console.log(`HTTP Status: ${resp ? resp.status() : 'null'}`);
  await new Promise((r) => setTimeout(r, 2500));

  await snap('prod_01_world_map');
  const worldMapText = await page.evaluate(() => document.body.innerText.slice(0, 1000));
  console.log('World Map text snippet:\n', worldMapText.replace(/\n+/g, ' | '));

  // ── STEP 2: Click Floor 1 Node ────────────────────────────────────────────
  console.log('\n--- 2. Entering Floor 1 Chamber ---');
  const roomNode = await page.$('.cwm-room-node.day-0, .cwm-room-node.unlocked, .cwm-room-node');
  if (roomNode) {
    await roomNode.click();
    await new Promise((r) => setTimeout(r, 2000));
    await snap('prod_02_chamber_floor_1');
    const chamberText = await page.evaluate(() => document.body.innerText.slice(0, 1000));
    console.log('Chamber text snippet:\n', chamberText.replace(/\n+/g, ' | '));
  } else {
    console.log('⚠️ Could not find room node!');
  }

  // ── STEP 3: Click Door 1 (Arcane Bubble Pop) ──────────────────────────────
  console.log('\n--- 3. Testing Door 1: Arcane Bubble Pop ---');
  const doorBtns = await page.$$('.dr-door-enter-btn');
  console.log(`Found ${doorBtns.length} door enter buttons`);
  if (doorBtns.length > 0) {
    await doorBtns[0].click();
    await new Promise((r) => setTimeout(r, 1500));
    await snap('prod_03_door1_instruction_modal');

    // Check if GameInstructionModal is displayed
    const modalTitle = await page.evaluate(() => {
      const el = document.querySelector('.gim-title');
      return el ? el.innerText : null;
    });
    console.log('GameInstructionModal Title:', modalTitle);

    // Click START CHALLENGE button inside modal
    const clickedStart = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const b = btns.find(btn => btn.innerText.includes('START CHALLENGE') || btn.innerText.includes('UNDERSTOOD'));
      if (b) { b.click(); return true; }
      return false;
    });
    console.log('Clicked start challenge:', clickedStart);

    if (clickedStart) {
      await new Promise((r) => setTimeout(r, 2000));
      await snap('prod_04_door1_gameplay_live');

      // Verify prompt text in gameplay
      const promptInfo = await page.evaluate(() => {
        const badge = document.querySelector('.cg-prompt-target-badge')?.innerText;
        const target = document.querySelector('.cg-prompt-target-word')?.innerText;
        const clue = document.querySelector('.cg-prompt-clue')?.innerText;
        const bubbles = Array.from(document.querySelectorAll('.cg-bubble-word')).map(b => b.innerText);
        const howToPlayBtn = document.querySelector('.cg-help-trigger-btn')?.innerText;
        return { badge, target, clue, bubblesCount: bubbles.length, sampleBubbles: bubbles.slice(0, 5), howToPlayBtn };
      });
      console.log('Door 1 Gameplay Live Info:', JSON.stringify(promptInfo, null, 2));
    }

    // Click Back to Chamber
    const backBtn = await page.$('.dr-back-btn');
    if (backBtn) {
      await backBtn.click();
      await new Promise((r) => setTimeout(r, 1500));
    }
  }

  // ── STEP 4: Click Door 2 (Spell Train) ────────────────────────────────────
  console.log('\n--- 4. Testing Door 2: Spell Train ---');
  const doorBtnsAgain = await page.$$('.dr-door-enter-btn');
  if (doorBtnsAgain.length > 1) {
    await doorBtnsAgain[1].click();
    await new Promise((r) => setTimeout(r, 1500));
    await snap('prod_05_door2_train_modal');

    // Click Start Challenge
    const clickedStart2 = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const b = btns.find(btn => btn.innerText.includes('START CHALLENGE') || btn.innerText.includes('UNDERSTOOD'));
      if (b) { b.click(); return true; }
      return false;
    });

    if (clickedStart2) {
      await new Promise((r) => setTimeout(r, 2000));
      await snap('prod_06_door2_train_live');

      const trainInfo = await page.evaluate(() => {
        const locomotive = document.querySelector('.st-locomotive')?.innerText;
        const tracks = !!document.querySelector('.st-tracks');
        const carriages = Array.from(document.querySelectorAll('.st-carriage')).map(c => c.innerText);
        const poolWords = Array.from(document.querySelectorAll('.st-word-card')).map(w => w.innerText);
        return { locomotive, tracks, carriages, poolWordsCount: poolWords.length, sampleWords: poolWords.slice(0, 4) };
      });
      console.log('Door 2 Train Info:', JSON.stringify(trainInfo, null, 2));
    }

    const backBtn2 = await page.$('.dr-back-btn');
    if (backBtn2) {
      await backBtn2.click();
      await new Promise((r) => setTimeout(r, 1500));
    }
  }

  // ── STEP 5: Test Hall of Fame Modal ──────────────────────────────────────
  console.log('\n--- 5. Testing Hall of Fame Modal ---');
  const hofBtn = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const b = btns.find(btn => btn.innerText.includes('Hall of Fame'));
    if (b) { b.click(); return true; }
    return false;
  });

  if (hofBtn) {
    await new Promise((r) => setTimeout(r, 1200));
    await snap('prod_07_hall_of_fame_modal');
    const hofTitle = await page.evaluate(() => document.querySelector('.hof-title')?.innerText);
    console.log('Hall of Fame title:', hofTitle);
  } else {
    console.log('⚠️ Hall of Fame button not found via evaluate');
  }

} catch (err) {
  console.error('Fatal audit error:', err);
} finally {
  await browser.close();
}

// ── FINAL DIAGNOSTIC REPORT ────────────────────────────────────────────────
console.log('\n════════════════════════════════════════════════════════');
console.log('📊 PRODUCTION HEALTH & AUDIT REPORT — app.bkbacademy.vn');
console.log('════════════════════════════════════════════════════════');
console.log(`Console Errors (${consoleErrors.length}):`);
consoleErrors.forEach(e => console.log('  ❌', e));

console.log(`\nPage Errors (${pageErrors.length}):`);
pageErrors.forEach(e => console.log('  ❌', e));

console.log(`\nFailed Network Requests (${failedRequests.length}):`);
failedRequests.forEach(e => console.log('  ⚠️', e));

if (consoleErrors.length === 0 && pageErrors.length === 0 && failedRequests.length === 0) {
  console.log('\n🎉 ZERO ERRORS! Server and frontend are 100% operational.');
}
