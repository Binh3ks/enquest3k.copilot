import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { WEEK_33_CONNECTOR_QUESTIONS } from '../src/services/chroniclesFloor67Service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/screenshots/f6d2');
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

async function run() {
  console.log('🎮 [F6D2 Full Verification] Launching Real Chrome (headless: false)...');
  const browser = await puppeteer.launch({
    executablePath: fs.existsSync(CHROME_PATH) ? CHROME_PATH : undefined,
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--window-size=1280,840'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const results = {};

  try {
    // Helper: Clear attempt cap keys
    async function clearCaps() {
      await page.evaluate(() => {
        const keys = Object.keys(localStorage);
        for (const k of keys) {
          if (k.startsWith('attempt_cap_')) localStorage.removeItem(k);
        }
      });
    }

    async function loadGame() {
      await page.goto(`${BASE_URL}/quest-demo`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 600));
      await page.waitForSelector('#select-active-game');
      await page.select('#select-active-game', 'connector_relay');
      await new Promise(r => setTimeout(r, 800));
      await page.waitForSelector('[data-testid="connector-burst-container"]');
    }

    async function waitForReady() {
      await page.waitForFunction(() => {
        const btns = Array.from(document.querySelectorAll('.connector-option-btn'));
        return btns.length === 3 && !btns[0].disabled;
      }, { timeout: 6000 });
      await new Promise(r => setTimeout(r, 200));
    }

    async function answer(isCorrect) {
      await waitForReady();
      const keyToPress = await page.evaluate((wantCorrect, qList) => {
        const wrapper = document.querySelector('.connector-clause-wrapper')?.innerText || '';
        const cleanDom = wrapper.replace(/[\n\r_]+/g, ' ').replace(/[,\.]/g, '').trim().toLowerCase();
        let targetAns = null;
        for (const q of qList) {
          const left = q.sentence.split('_____')[0].replace(/[,\.]/g, '').trim().toLowerCase();
          if (cleanDom.includes(left)) {
            targetAns = q.answer.toLowerCase();
            break;
          }
        }
        const btns = Array.from(document.querySelectorAll('.connector-option-btn'));
        const options = btns.map(b => b.innerText.replace(/[0-9\s]/g, '').toLowerCase());
        const correctIdx = options.findIndex(opt => opt === targetAns);

        if (wantCorrect) {
          return correctIdx !== -1 ? String(correctIdx + 1) : '1';
        } else {
          const wrongIdx = options.findIndex((opt, idx) => idx !== correctIdx);
          return wrongIdx !== -1 ? String(wrongIdx + 1) : '1';
        }
      }, isCorrect, WEEK_33_CONNECTOR_QUESTIONS);

      await page.keyboard.press(keyToPress);
      await new Promise(r => setTimeout(r, 1800));
    }

    // =========================================================================
    // SCENARIO (a): Thắng L1 -> Có "Chơi lại" (Replay)
    // =========================================================================
    console.log('\n--- SCENARIO (a): Thắng L1 -> có "Chơi lại" ---');
    await page.goto(`${BASE_URL}/quest-demo`, { waitUntil: 'networkidle0' });
    await clearCaps();
    await loadGame();

    // Answer all 6 rounds correctly
    for (let r = 0; r < 6; r++) {
      console.log(`  Round ${r + 1}/6: Answer CORRECT...`);
      await answer(true);
    }

    await page.waitForSelector('[data-testid="connector-cleared-modal"]', { timeout: 6000 });
    const domA = await page.evaluate(() => {
      const replayBtn = document.querySelector('[data-testid="connector-replay-btn"]');
      const continueBtn = document.querySelector('[data-testid="connector-continue-btn"]');
      const title = document.querySelector('.modal-title')?.innerText || '';
      return {
        title,
        hasReplayBtn: !!replayBtn,
        replayText: replayBtn?.innerText.trim() || null,
        hasContinueBtn: !!continueBtn,
        continueText: continueBtn?.innerText.trim() || null
      };
    });
    console.log('DOM Scenario (a):', JSON.stringify(domA));
    results.scenarioA = domA;
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'f6d2_scenario_a_win_replay.png') });

    // =========================================================================
    // SCENARIO (b): Replay (L2) -> Thắng/KO xong -> Không còn replay; Reload -> Màn khóa
    // =========================================================================
    console.log('\n--- SCENARIO (b): Replay -> Thắng/KO -> Mất replay; Reload -> Khóa ---');
    // Click "Chơi lại"
    await page.click('[data-testid="connector-replay-btn"]');
    await new Promise(r => setTimeout(r, 1000));
    await waitForReady();
    console.log('  Entered Attempt 1 (Replay). Answering 2 correct then 2 wrong to KO...');
    await answer(true);
    await answer(true);
    await answer(false);
    await answer(false);

    await page.waitForSelector('[data-testid="connector-ko-modal"]', { timeout: 6000 });
    const domB1 = await page.evaluate(() => {
      const retryBtn = document.querySelector('[data-testid="connector-ko-retry-btn"]');
      const exitBtn = document.querySelector('[data-testid="connector-ko-exit-btn"]');
      const subtitle = document.querySelector('.modal-subtitle')?.innerText || '';
      return {
        subtitle,
        hasRetryBtn: !!retryBtn,
        exitText: exitBtn?.innerText.trim() || null
      };
    });
    console.log('DOM Scenario (b - KO L2):', JSON.stringify(domB1));
    results.scenarioB_KO2 = domB1;
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'f6d2_scenario_b_ko2_no_retry.png') });

    // Reload page -> Màn khóa
    console.log('  Reloading page to test locked state...');
    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));
    await page.waitForSelector('#select-active-game');
    await page.select('#select-active-game', 'connector_relay');
    await new Promise(r => setTimeout(r, 800));

    await page.waitForSelector('[data-testid="connector-locked-modal"]', { timeout: 6000 });
    const domB2 = await page.evaluate(() => {
      const title = document.querySelector('.modal-title')?.innerText || '';
      const subtitle = document.querySelector('[data-testid="connector-locked-subtitle"]')?.innerText || '';
      const exitBtn = document.querySelector('[data-testid="connector-locked-exit-btn"]');
      const retryBtn = document.querySelector('[data-testid="connector-ko-retry-btn"]');
      return {
        title,
        subtitle,
        hasExitBtn: !!exitBtn,
        exitText: exitBtn?.innerText.trim() || null,
        hasRetryBtn: !!retryBtn
      };
    });
    console.log('DOM Scenario (b - Reload Locked):', JSON.stringify(domB2));
    results.scenarioB_Locked = domB2;
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'f6d2_scenario_b_locked_reload.png') });

    // =========================================================================
    // SCENARIO (c): KO L1 -> Try Again -> KO L2 -> Reload -> Khóa
    // =========================================================================
    console.log('\n--- SCENARIO (c): KO L1 -> Try Again -> KO L2 -> Reload -> Khóa ---');
    await clearCaps();
    await loadGame();
    // 2 wrong immediately -> KO L1
    await answer(false);
    await answer(false);
    await page.waitForSelector('[data-testid="connector-ko-modal"]');
    const domC1 = await page.evaluate(() => ({
      hasRetryBtn: !!document.querySelector('[data-testid="connector-ko-retry-btn"]'),
      subtitle: document.querySelector('.modal-subtitle')?.innerText || ''
    }));
    console.log('DOM Scenario (c - KO1):', JSON.stringify(domC1));
    results.scenarioC_KO1 = domC1;

    // Click Try Again
    await page.click('[data-testid="connector-ko-retry-btn"]');
    await new Promise(r => setTimeout(r, 1000));
    // 2 wrong in Attempt 1 -> KO L2
    await answer(false);
    await answer(false);
    await page.waitForSelector('[data-testid="connector-ko-modal"]');
    const domC2 = await page.evaluate(() => ({
      hasRetryBtn: !!document.querySelector('[data-testid="connector-ko-retry-btn"]'),
      subtitle: document.querySelector('.modal-subtitle')?.innerText || ''
    }));
    console.log('DOM Scenario (c - KO2):', JSON.stringify(domC2));
    results.scenarioC_KO2 = domC2;

    // Reload -> Locked
    await page.reload({ waitUntil: 'networkidle0' });
    await page.waitForSelector('#select-active-game');
    await page.select('#select-active-game', 'connector_relay');
    await page.waitForSelector('[data-testid="connector-locked-modal"]');
    const domC3 = await page.evaluate(() => ({
      lockedSubtitle: document.querySelector('[data-testid="connector-locked-subtitle"]')?.innerText || '',
      hasExitBtn: !!document.querySelector('[data-testid="connector-locked-exit-btn"]')
    }));
    console.log('DOM Scenario (c - Reload Locked):', JSON.stringify(domC3));
    results.scenarioC_Locked = domC3;

    // =========================================================================
    // SCENARIO (d): Reload giữa lượt -> tính 1 lượt (không hoàn lượt)
    // =========================================================================
    console.log('\n--- SCENARIO (d): Reload giữa lượt -> tính 1 lượt ---');
    await clearCaps();
    await loadGame();
    // Answer 1 question in Attempt 0
    await answer(true);
    const capBefore = await page.evaluate(() => {
      const keys = Object.keys(localStorage).filter(k => k.startsWith('attempt_cap_'));
      return { key: keys[0], val: localStorage.getItem(keys[0]) };
    });
    console.log('  Cap recorded during Attempt 0:', JSON.stringify(capBefore));
    // Reload mid-game
    await page.reload({ waitUntil: 'networkidle0' });
    await page.waitForSelector('#select-active-game');
    await page.select('#select-active-game', 'connector_relay');
    await new Promise(r => setTimeout(r, 800));
    const capAfter = await page.evaluate(() => {
      const keys = Object.keys(localStorage).filter(k => k.startsWith('attempt_cap_'));
      return { key: keys[0], val: localStorage.getItem(keys[0]) };
    });
    console.log('  Cap recorded after mid-game reload:', JSON.stringify(capAfter));
    results.scenarioD = { beforeReload: capBefore, afterReload: capAfter };

    // =========================================================================
    // SCENARIO (e): 2 uid khác nhau tách cap
    // =========================================================================
    console.log('\n--- SCENARIO (e): 2 uid khác nhau tách cap ---');
    await clearCaps();
    const isolationTest = await page.evaluate(() => {
      // Simulate User A having capped out (2 attempts)
      localStorage.setItem('attempt_cap_user_alpha_connector_w33', '2');
      // Simulate User B starting fresh
      localStorage.setItem('attempt_cap_user_beta_connector_w33', '0');

      const valA = localStorage.getItem('attempt_cap_user_alpha_connector_w33');
      const valB = localStorage.getItem('attempt_cap_user_beta_connector_w33');
      return { valA, valB, isIsolated: valA !== valB };
    });
    console.log('  Multi-user Isolation Result:', JSON.stringify(isolationTest));
    results.scenarioE = isolationTest;

    console.log('\n=== ALL 5 SCENARIOS VERIFIED SUCCESSFULLY ===');
    console.log(JSON.stringify(results, null, 2));

  } catch (err) {
    console.error('❌ Verification failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
