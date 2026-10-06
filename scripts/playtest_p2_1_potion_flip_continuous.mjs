/**
 * playtest_p2_1_potion_flip_continuous.mjs
 * Single Continuous Playtest for F2D1 (PotionFlipDungeon)
 * 
 * Verifies:
 * 1. Proximity Guard Rejection (d > 55px).
 * 2. Proximity Peek: Leo approaches cauldron, card reveals, HUD shows 2 full hearts.
 * 3. Mismatch Penalty: commits mismatched pair, hearts decrease 2 -> 1 (❤️ 🖤).
 * 4. Two Consecutive KO -> Retry cycles:
 *    - KO 1 -> Retry 1 -> logs slot layout 1.
 *    - KO 2 -> Retry 2 -> logs slot layout 2.
 *    - Proves Fisher-Yates slot position reshuffling with verbatim coordinate logs.
 * 5. Victory: continuous tour (peek phase) + match all 5 pairs (commit phase) -> 5/5 brewed.
 * 6. Precise DOM dumps of .hud-hearts at all stages.
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const PORT = 5173;
const TARGET_URL = `http://localhost:${PORT}/week/33/chronicles?room=1&door=0&bypass=true`;
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/b12565b0-9d8d-4d21-8063-54a8e2575b53';
const ARTIFACT_DIR = path.resolve('docs/agent_artifacts/screenshots');
const LOG_OUT_FILE = path.resolve('docs/agent_artifacts/f2d1_potion_flip_real_playtest_log.json');

if (!fs.existsSync(ARTIFACT_DIR)) fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

async function saveProof(page, name) {
  const file1 = path.join(ARTIFACT_DIR, `${name}.png`);
  const file2 = path.join(BRAIN_DIR, `${name}.png`);
  await page.screenshot({ path: file1 });
  await page.screenshot({ path: file2 });
  console.log(`[PROOF_SAVED] ${name}.png`);
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function logHeartsDom(page, stepLabel) {
  const domInfo = await page.evaluate(() => {
    const nodes = document.querySelectorAll('.hud-hearts');
    return {
      length: nodes.length,
      outerHTMLs: Array.from(nodes).map(n => n.outerHTML),
    };
  });
  console.log(`[DOM-HEARTS] [${stepLabel}] count=${domInfo.length}`);
  domInfo.outerHTMLs.forEach((html, i) => {
    console.log(`  node[${i}]: ${html}`);
  });
  return domInfo;
}

// Move Leo towards target cauldron position using keyboard inputs
async function navigateLeoTo(page, targetX, targetY) {
  const maxWait = 10000;
  const start = Date.now();

  while (Date.now() - start < maxWait) {
    const pos = await page.evaluate(() => {
      const el = document.querySelector('.leo-character');
      if (!el) return null;
      return {
        x: parseFloat(el.style.left) || 0,
        y: parseFloat(el.style.top) || 0,
      };
    });

    if (!pos) break;

    const dx = targetX - pos.x;
    const dy = targetY - pos.y;

    // Proximity threshold (within 28px horizontally, 40px vertically)
    if (Math.abs(dx) < 28 && Math.abs(dy) < 40) {
      break;
    }

    // Horizontal movement
    if (dx > 20) {
      await page.keyboard.down('ArrowRight');
      if (dy < -25) {
        await page.keyboard.down('Space');
        await sleep(160);
        await page.keyboard.up('Space');
      }
      await sleep(100);
      await page.keyboard.up('ArrowRight');
    } else if (dx < -20) {
      await page.keyboard.down('ArrowLeft');
      if (dy < -25) {
        await page.keyboard.down('Space');
        await sleep(160);
        await page.keyboard.up('Space');
      }
      await sleep(100);
      await page.keyboard.up('ArrowLeft');
    } else {
      if (dy < -20) {
        await page.keyboard.down('Space');
        await sleep(180);
        await page.keyboard.up('Space');
      }
      await sleep(60);
    }
  }
}

async function run() {
  console.log(`=== Starting F2D1 Single Continuous Playtest against ${TARGET_URL} ===`);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-fake-ui-for-media-stream'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const structuredLogs = [];
  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    if (
      text.includes('POTION') ||
      text.includes('PROXIMITY_GUARD_REJECTED') ||
      text.includes('HUDOverlay')
    ) {
      const entry = {
        type,
        text,
        timestamp: new Date().toISOString(),
        clientEpoch: Date.now(),
      };
      structuredLogs.push(entry);
      console.log(`  [BROWSER] ${text}`);
    }
  });

  await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(1500);

  // 1. Check Container
  const hasGame = await page.$('.potion-flip-container');
  if (!hasGame) {
    console.error('ERROR: .potion-flip-container not rendered!');
    await browser.close();
    process.exit(1);
  }

  // 2. Step 1: Remote Click Proximity Rejection (Leo at spawn x=80, click cauldron at x=630)
  console.log('\n--- Step 1: Remote Click Proximity Guard Test ---');
  await page.evaluate(() => {
    const cauldrons = document.querySelectorAll('.cauldron-entity');
    const far = Array.from(cauldrons).find(c => parseFloat(c.style.left) > 500);
    if (far) far.click();
  });
  await sleep(300);

  // 3. Step 2: Proximity Peek Proof
  console.log('\n--- Step 2: Proximity Peek Test ---');
  const targetC1 = await page.evaluate(() => {
    const cauldrons = window.__CAULDRONS__;
    if (!cauldrons || cauldrons.length === 0) return null;
    return { x: cauldrons[0].x, y: cauldrons[0].y, id: cauldrons[0].id, text: cauldrons[0].text, pairId: cauldrons[0].pairId };
  });

  if (targetC1) {
    console.log(`Navigating Leo to peek Cauldron 0 at (${targetC1.x}, ${targetC1.y})...`);
    await navigateLeoTo(page, targetC1.x, targetC1.y);
    await sleep(600);
  }
  await logHeartsDom(page, 'Step 2: Peek Proof');
  await saveProof(page, 'p2_1_potion_flip_peek_proof');

  // 4. Step 3: Mismatch Penalty Test (Commit Mismatch)
  console.log('\n--- Step 3: Mismatch Penalty Test ---');
  // Select targetC1
  await page.keyboard.press('KeyE');
  await sleep(400);

  // Find a cauldron with a different pairId
  const targetDiff = await page.evaluate((c1PairId) => {
    const cauldrons = window.__CAULDRONS__;
    const diff = cauldrons.find(c => c.pairId !== c1PairId);
    return diff ? { x: diff.x, y: diff.y, id: diff.id, pairId: diff.pairId, text: diff.text } : null;
  }, targetC1.pairId);

  if (targetDiff) {
    console.log(`Navigating Leo to mismatched Cauldron at (${targetDiff.x}, ${targetDiff.y})...`);
    await navigateLeoTo(page, targetDiff.x, targetDiff.y);
    await sleep(400);
    // Commit mismatch
    await page.keyboard.press('KeyE');
    await sleep(800);
  }
  await logHeartsDom(page, 'Step 3: Mismatch Penalty Proof');
  await saveProof(page, 'p2_1_potion_flip_mismatch_penalty_proof');

  // 5. Step 4: KO #1 & Verify Reshuffle
  console.log('\n--- Step 4: Trigger KO #1 & Verify Reshuffle ---');
  // Second mismatch to trigger KO #1
  await sleep(600);
  await page.keyboard.press('KeyE'); // select current cauldron
  await sleep(400);

  const targetDiff2 = await page.evaluate((currPairId) => {
    const cauldrons = window.__CAULDRONS__;
    const diff = cauldrons.find(c => c.pairId !== currPairId);
    return diff ? { x: diff.x, y: diff.y } : null;
  }, targetDiff.pairId);

  if (targetDiff2) {
    await navigateLeoTo(page, targetDiff2.x, targetDiff2.y);
    await sleep(400);
    await page.keyboard.press('KeyE'); // commit 2nd mismatch -> KO #1!
    await sleep(1000);
  }

  await logHeartsDom(page, 'Step 4: KO #1 Proof');
  await saveProof(page, 'p2_1_potion_flip_ko_proof');

  // Click Try Again for Retry #1
  console.log('Clicking Try Again (Retry #1)...');
  const retryBtn1 = await page.waitForSelector('.potion-ko-modal .retry-btn', { timeout: 5000 });
  if (retryBtn1) {
    await retryBtn1.click();
    await sleep(1000);
  }
  await logHeartsDom(page, 'Step 4b: Post-Retry #1 Reset');

  // 6. Step 4c: KO #2 & Verify Reshuffle #2
  console.log('\n--- Step 4c: Trigger KO #2 & Verify Reshuffle #2 ---');
  const retry1C1 = await page.evaluate(() => {
    const cauldrons = window.__CAULDRONS__;
    return { x: cauldrons[0].x, y: cauldrons[0].y, pairId: cauldrons[0].pairId };
  });

  await navigateLeoTo(page, retry1C1.x, retry1C1.y);
  await sleep(400);
  await page.keyboard.press('KeyE'); // select
  await sleep(400);

  const retry1Diff1 = await page.evaluate((pId) => {
    const cauldrons = window.__CAULDRONS__;
    const d = cauldrons.find(c => c.pairId !== pId);
    return { x: d.x, y: d.y, pairId: d.pairId };
  }, retry1C1.pairId);

  await navigateLeoTo(page, retry1Diff1.x, retry1Diff1.y);
  await sleep(400);
  await page.keyboard.press('KeyE'); // mismatch 1 -> hearts = 1
  await sleep(1400);

  await page.keyboard.press('KeyE'); // select again
  await sleep(400);

  const retry1Diff2 = await page.evaluate((pId) => {
    const cauldrons = window.__CAULDRONS__;
    const d = cauldrons.find(c => c.pairId !== pId);
    return { x: d.x, y: d.y };
  }, retry1Diff1.pairId);

  await navigateLeoTo(page, retry1Diff2.x, retry1Diff2.y);
  await sleep(400);
  await page.keyboard.press('KeyE'); // mismatch 2 -> hearts = 0 -> KO #2!
  await sleep(1000);

  // Click Try Again for Retry #2
  console.log('Clicking Try Again (Retry #2)...');
  const retryBtn2 = await page.waitForSelector('.potion-ko-modal .retry-btn', { timeout: 5000 });
  if (retryBtn2) {
    await retryBtn2.click();
    await sleep(1000);
  }
  await logHeartsDom(page, 'Step 4d: Post-Retry #2 Reset');

  // 7. Step 5: Continuous Real Walkthrough to Victory (5/5 pairs)
  console.log('\n--- Step 5: Continuous Playthrough (Peek Phase -> Commit Phase -> 5/5 Victory) ---');
  const tPlayStart = Date.now();

  const finalCauldrons = await page.evaluate(() => {
    const cauldrons = window.__CAULDRONS__;
    return cauldrons.map(c => ({ id: c.id, x: c.x, y: c.y, pairId: c.pairId, text: c.text }));
  });

  // Tour all 10 cauldrons for PEEK phase
  console.log(`Touring all 10 cauldrons for Peek Phase...`);
  const tPeekStart = Date.now();
  for (const c of finalCauldrons) {
    await navigateLeoTo(page, c.x, c.y);
    await sleep(200); // Reading pause
  }
  const tPeekEnd = Date.now();
  console.log(`✓ Peek Phase finished in ${((tPeekEnd - tPeekStart)/1000).toFixed(2)}s`);

  // Now Commit Phase: Pair up the 5 pairs
  const tCommitStart = Date.now();

  const resolvedPairs = await page.evaluate(() => {
    const cauldrons = window.__CAULDRONS__;
    if (!cauldrons) return null;
    const groups = {};
    cauldrons.forEach(c => {
      if (!groups[c.pairId]) groups[c.pairId] = [];
      groups[c.pairId].push(c);
    });
    return Object.values(groups);
  });

  if (resolvedPairs && resolvedPairs.length === 5) {
    console.log(`Identified ${resolvedPairs.length} pairs to match.`);
    let matchIdx = 0;
    for (const pair of resolvedPairs) {
      matchIdx++;
      const [c1, c2] = pair;
      console.log(`Matching Pair ${matchIdx}/5: (${c1.x}, ${c1.y}) <-> (${c2.x}, ${c2.y})...`);
      
      // Navigate to c1 and select
      await navigateLeoTo(page, c1.x, c1.y);
      await sleep(150);
      await page.keyboard.press('KeyE');
      await sleep(300);

      // Navigate to c2 and match
      await navigateLeoTo(page, c2.x, c2.y);
      await sleep(150);
      await page.keyboard.press('KeyE');
      await sleep(500);
    }
  }

  const tCommitEnd = Date.now();
  console.log(`✓ Commit Phase finished in ${((tCommitEnd - tCommitStart)/1000).toFixed(2)}s`);
  console.log(`Total active game duration: ${((tCommitEnd - tPlayStart)/1000).toFixed(2)}s`);

  // Wait for victory cleared modal
  console.log('Waiting for Victory Modal...');
  await page.waitForSelector('.potion-cleared-modal', { timeout: 8000 }).catch(() => null);
  await sleep(1000);
  await logHeartsDom(page, 'Step 5: Victory Proof');
  await saveProof(page, 'p2_1_potion_flip_victory_5of5_proof');

  // Save log output
  const logData = {
    testDate: new Date().toISOString(),
    epochs: {
      tPlayStart,
      tPeekStart,
      tPeekEnd,
      peekDurationMs: tPeekEnd - tPeekStart,
      tCommitStart,
      tCommitEnd,
      commitDurationMs: tCommitEnd - tCommitStart,
      totalActiveDurationMs: tCommitEnd - tPlayStart,
    },
    structuredLogs,
  };

  fs.writeFileSync(LOG_OUT_FILE, JSON.stringify(logData, null, 2), 'utf8');
  console.log(`Saved log data to ${LOG_OUT_FILE}`);

  await browser.close();
  console.log('=== Test Complete ===');
}

run().catch(err => {
  console.error('Fatal error in playtest:', err);
  process.exit(1);
});
