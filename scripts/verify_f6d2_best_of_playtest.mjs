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
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/b12565b0-9d8d-4d21-8063-54a8e2575b53';
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(BRAIN_DIR)) fs.mkdirSync(BRAIN_DIR, { recursive: true });

async function run() {
  console.log('🎮 [F6D2 Accuracy-Based Stars Playtest] Launching Real Chrome (headless: false)...');
  const browser = await puppeteer.launch({
    executablePath: fs.existsSync(CHROME_PATH) ? CHROME_PATH : undefined,
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--window-size=1280,840'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  let onCompleteEvents = [];
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('[QUEST_DEMO_ON_COMPLETE]')) {
      try {
        const jsonStr = text.split('[QUEST_DEMO_ON_COMPLETE]')[1].trim();
        onCompleteEvents.push(JSON.parse(jsonStr));
      } catch (e) {
        onCompleteEvents.push(text);
      }
    }
  });

  async function clearCaps() {
    await page.evaluate(() => {
      try {
        const keys = Object.keys(localStorage);
        for (const k of keys) {
          if (k.startsWith('attempt_cap_')) localStorage.removeItem(k);
        }
      } catch (e) {}
    });
  }

  async function loadGame() {
    await page.goto(`${BASE_URL}/quest-demo`, { waitUntil: 'networkidle0' });
    await clearCaps();
    await new Promise(r => setTimeout(r, 600));
    await page.waitForSelector('#select-active-game');
    await page.select('#select-active-game', 'connector_relay');
    await new Promise(r => setTimeout(r, 800));
    await page.waitForSelector('[data-testid="connector-burst-container"]');
  }

  async function waitForReady() {
    for (let retry = 0; retry < 3; retry++) {
      try {
        await page.waitForFunction(() => {
          const btns = Array.from(document.querySelectorAll('.connector-option-btn'));
          return btns.length === 3 && !btns[0].disabled;
        }, { timeout: 8000 });
        break;
      } catch (err) {
        if (retry === 2) throw err;
        await new Promise(r => setTimeout(r, 600));
      }
    }
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
    await new Promise(r => setTimeout(r, 700));
  }

  async function getModalState() {
    return await page.evaluate(() => {
      const starsLit = document.querySelectorAll('.star-lit').length;
      const totalScore = document.querySelector('[data-testid="stat-total-score"]')?.innerText || '';
      const baseXP = document.querySelector('[data-testid="stat-base-xp"]')?.innerText || '';
      const bonusXP = document.querySelector('[data-testid="stat-bonus-xp"]')?.innerText || '';
      const hasReplay = !!document.querySelector('[data-testid="connector-replay-btn"]');
      return { starsLit, totalScore, baseXP, bonusXP, hasReplay };
    });
  }

  const results = {};

  try {
    // -------------------------------------------------------------------------
    // a) 6/6 -> 3★, onComplete 1 lần
    // -------------------------------------------------------------------------
    console.log('\n--- Kịch bản (a): 6/6 -> 3★, onComplete 1 lần ---');
    await clearCaps();
    onCompleteEvents = [];
    await loadGame();

    for (let r = 0; r < 6; r++) await answer(true);
    await page.waitForSelector('[data-testid="connector-cleared-modal"]');
    const modalA = await getModalState();
    await page.click('[data-testid="connector-continue-btn"]');
    await new Promise(r => setTimeout(r, 600));

    results.scenario_a = {
      modalStarsLit: modalA.starsLit,
      modalTotalScore: modalA.totalScore,
      onCompleteCalls: onCompleteEvents.length,
      onCompletePayload: onCompleteEvents[0]
    };
    console.log('Result (a):', JSON.stringify(results.scenario_a));

    // -------------------------------------------------------------------------
    // b) 5/6 (1 sai) -> 2★ (Chụp ảnh b)
    // -------------------------------------------------------------------------
    console.log('\n--- Kịch bản (b): 5/6 (1 sai) -> 2★ ---');
    await clearCaps();
    onCompleteEvents = [];
    await loadGame();

    await answer(false); // 1 sai
    for (let r = 0; r < 5; r++) await answer(true);
    await page.waitForSelector('[data-testid="connector-cleared-modal"]');
    const modalB = await getModalState();

    const photoPathB = path.join(OUTPUT_DIR, 'f6d2_scenario_b_2stars_cleared.png');
    await page.screenshot({ path: photoPathB });
    fs.copyFileSync(photoPathB, path.join(BRAIN_DIR, 'f6d2_scenario_b_2stars_cleared.png'));
    console.log('  Saved screenshot (b):', photoPathB);

    await page.click('[data-testid="connector-continue-btn"]');
    await new Promise(r => setTimeout(r, 600));

    results.scenario_b = {
      modalStarsLit: modalB.starsLit,
      modalTotalScore: modalB.totalScore,
      onCompleteCalls: onCompleteEvents.length,
      onCompletePayload: onCompleteEvents[0]
    };
    console.log('Result (b):', JSON.stringify(results.scenario_b));

    // -------------------------------------------------------------------------
    // c) L1 5/6 (2★) -> Chơi lại -> L2 6/6 (3★) -> onComplete stars=3 (Chụp ảnh c)
    // -------------------------------------------------------------------------
    console.log('\n--- Kịch bản (c): L1 5/6 (2★) -> Chơi lại -> L2 6/6 (3★) -> onComplete stars=3 ---');
    await clearCaps();
    onCompleteEvents = [];
    await loadGame();

    // L1: 1 sai, 5 đúng
    await answer(false);
    for (let r = 0; r < 5; r++) await answer(true);
    await page.waitForSelector('[data-testid="connector-cleared-modal"]');
    const modalC_L1 = await getModalState();
    console.log(`  L1 Stats: Stars=${modalC_L1.starsLit}, Score=${modalC_L1.totalScore}`);

    // Click Chơi lại
    await page.click('[data-testid="connector-replay-btn"]');
    await new Promise(r => setTimeout(r, 800));

    // L2: 6 đúng (3★)
    for (let r = 0; r < 6; r++) {
      await answer(true);
      await new Promise(r => setTimeout(r, 250));
    }
    await page.waitForSelector('[data-testid="connector-cleared-modal"]');
    const modalC_L2 = await getModalState();
    console.log(`  L2 Stats: Stars=${modalC_L2.starsLit}, Score=${modalC_L2.totalScore}`);

    const photoPathC = path.join(OUTPUT_DIR, 'f6d2_scenario_c_3stars_cleared.png');
    await page.screenshot({ path: photoPathC });
    fs.copyFileSync(photoPathC, path.join(BRAIN_DIR, 'f6d2_scenario_c_3stars_cleared.png'));
    console.log('  Saved screenshot (c):', photoPathC);

    await page.click('[data-testid="connector-continue-btn"]');
    await new Promise(r => setTimeout(r, 600));

    results.scenario_c = {
      l1: { starsLit: modalC_L1.starsLit, score: modalC_L1.totalScore },
      l2: { starsLit: modalC_L2.starsLit, score: modalC_L2.totalScore },
      onCompleteCalls: onCompleteEvents.length,
      onCompletePayload: onCompleteEvents[0]
    };
    console.log('Result (c):', JSON.stringify(results.scenario_c));

    // -------------------------------------------------------------------------
    // d) L1 6/6 (3★) -> Chơi lại -> L2 5/6 (2★) -> onComplete stars=3 (giữ L1)
    // -------------------------------------------------------------------------
    console.log('\n--- Kịch bản (d): L1 6/6 (3★) -> Chơi lại -> L2 5/6 (2★) -> onComplete stars=3 (giữ L1) ---');
    await clearCaps();
    onCompleteEvents = [];
    await loadGame();

    // L1: 6 đúng (3★)
    for (let r = 0; r < 6; r++) await answer(true);
    await page.waitForSelector('[data-testid="connector-cleared-modal"]');
    const modalD_L1 = await getModalState();
    console.log(`  L1 Stats: Stars=${modalD_L1.starsLit}, Score=${modalD_L1.totalScore}`);

    // Click Chơi lại
    await page.click('[data-testid="connector-replay-btn"]');
    await new Promise(r => setTimeout(r, 800));

    // L2: 1 sai, 5 đúng (2★)
    await answer(false);
    for (let r = 0; r < 5; r++) await answer(true);
    await page.waitForSelector('[data-testid="connector-cleared-modal"]');
    const modalD_L2 = await getModalState();
    console.log(`  L2 Stats: Stars=${modalD_L2.starsLit}, Score=${modalD_L2.totalScore}`);

    await page.click('[data-testid="connector-continue-btn"]');
    await new Promise(r => setTimeout(r, 600));

    results.scenario_d = {
      l1: { starsLit: modalD_L1.starsLit, score: modalD_L1.totalScore },
      l2: { starsLit: modalD_L2.starsLit, score: modalD_L2.totalScore },
      onCompleteCalls: onCompleteEvents.length,
      onCompletePayload: onCompleteEvents[0]
    };
    console.log('Result (d):', JSON.stringify(results.scenario_d));

    // -------------------------------------------------------------------------
    // e) L1 5/6 (2★) -> Chơi lại -> L2 KO -> Về bài học -> onComplete stars=2
    // -------------------------------------------------------------------------
    console.log('\n--- Kịch bản (e): L1 5/6 (2★) -> Chơi lại -> L2 KO -> Về bài học -> onComplete stars=2 ---');
    await clearCaps();
    onCompleteEvents = [];
    await loadGame();

    // L1: 1 sai, 5 đúng (2★)
    await answer(false);
    for (let r = 0; r < 5; r++) await answer(true);
    await page.waitForSelector('[data-testid="connector-cleared-modal"]');
    const modalE_L1 = await getModalState();
    console.log(`  L1 Stats: Stars=${modalE_L1.starsLit}, Score=${modalE_L1.totalScore}`);

    // Click Chơi lại
    await page.click('[data-testid="connector-replay-btn"]');
    await new Promise(r => setTimeout(r, 800));

    // L2: 2 sai -> KO
    await answer(false);
    await answer(false);
    await page.waitForSelector('[data-testid="connector-ko-modal"]');
    console.log('  L2 KO reached. Clicking "Về bài học"...');
    await page.click('[data-testid="connector-ko-exit-btn"]');
    await new Promise(r => setTimeout(r, 600));

    results.scenario_e = {
      l1: { starsLit: modalE_L1.starsLit, score: modalE_L1.totalScore },
      onCompleteCalls: onCompleteEvents.length,
      onCompletePayload: onCompleteEvents[0]
    };
    console.log('Result (e):', JSON.stringify(results.scenario_e));

    // -------------------------------------------------------------------------
    // f) KO L1 -> Try Again -> 5/6 -> onComplete stars=2
    // -------------------------------------------------------------------------
    console.log('\n--- Kịch bản (f): KO L1 -> Try Again -> 5/6 -> onComplete stars=2 ---');
    await clearCaps();
    onCompleteEvents = [];
    await loadGame();

    // L1: 2 sai -> KO
    await answer(false);
    await answer(false);
    await page.waitForSelector('[data-testid="connector-ko-modal"]');
    console.log('  L1 KO reached. Clicking "Try Again"...');
    await page.click('[data-testid="connector-ko-retry-btn"]');
    await new Promise(r => setTimeout(r, 800));

    // Retry: 1 sai, 5 đúng (2★)
    await answer(false);
    for (let r = 0; r < 5; r++) await answer(true);
    await page.waitForSelector('[data-testid="connector-cleared-modal"]');
    const modalF = await getModalState();
    console.log(`  Retry Stats: Stars=${modalF.starsLit}, Score=${modalF.totalScore}`);

    await page.click('[data-testid="connector-continue-btn"]');
    await new Promise(r => setTimeout(r, 600));

    results.scenario_f = {
      modalStarsLit: modalF.starsLit,
      modalTotalScore: modalF.totalScore,
      onCompleteCalls: onCompleteEvents.length,
      onCompletePayload: onCompleteEvents[0]
    };
    console.log('Result (f):', JSON.stringify(results.scenario_f));

    // -------------------------------------------------------------------------
    // g) L1 5/6 -> Chơi lại -> 5/6 điểm cao hơn -> onComplete = lượt điểm cao hơn (tie-break)
    // -------------------------------------------------------------------------
    console.log('\n--- Kịch bản (g): L1 5/6 (thấp) -> Chơi lại -> 5/6 (cao) -> onComplete = L2 (tie-break) ---');
    await clearCaps();
    onCompleteEvents = [];
    await loadGame();

    // L1: 1 sai + đợi 3s để mất time bonus -> điểm thấp hơn
    await answer(false);
    await new Promise(r => setTimeout(r, 3000));
    for (let r = 0; r < 5; r++) {
      await answer(true);
      await new Promise(r => setTimeout(r, 500));
    }
    await page.waitForSelector('[data-testid="connector-cleared-modal"]');
    const modalG_L1 = await getModalState();
    console.log(`  L1 Stats: Stars=${modalG_L1.starsLit}, Score=${modalG_L1.totalScore}`);

    // Click Chơi lại
    await page.click('[data-testid="connector-replay-btn"]');
    await new Promise(r => setTimeout(r, 800));

    // L2: 1 sai + đáp nhanh -> điểm cao hơn
    await answer(false);
    for (let r = 0; r < 5; r++) await answer(true);
    await page.waitForSelector('[data-testid="connector-cleared-modal"]');
    const modalG_L2 = await getModalState();
    console.log(`  L2 Stats: Stars=${modalG_L2.starsLit}, Score=${modalG_L2.totalScore}`);

    await page.click('[data-testid="connector-continue-btn"]');
    await new Promise(r => setTimeout(r, 600));

    results.scenario_g = {
      l1: { starsLit: modalG_L1.starsLit, score: modalG_L1.totalScore },
      l2: { starsLit: modalG_L2.starsLit, score: modalG_L2.totalScore },
      onCompleteCalls: onCompleteEvents.length,
      onCompletePayload: onCompleteEvents[0]
    };
    console.log('Result (g):', JSON.stringify(results.scenario_g));

    // -------------------------------------------------------------------------
    // h) Đã chơi đủ 2 lượt -> Bấm/mở lại door lần thứ 3 -> Màn khóa (locked modal)
    // -------------------------------------------------------------------------
    console.log('\n--- Kịch bản (h): Đã chơi đủ 2 lượt -> Mở lại door lần thứ 3 ---');
    await clearCaps();
    onCompleteEvents = [];
    await loadGame();

    // Lượt 1: Thắng 6/6
    for (let r = 0; r < 6; r++) await answer(true);
    await page.waitForSelector('[data-testid="connector-cleared-modal"]');
    console.log('  Lượt 1 hoàn tất (6/6). Bấm Chơi lại...');
    await page.click('[data-testid="connector-replay-btn"]');
    await new Promise(r => setTimeout(r, 800));

    // Lượt 2: Chơi tiếp
    for (let r = 0; r < 6; r++) await answer(true);
    await page.waitForSelector('[data-testid="connector-cleared-modal"]');
    console.log('  Lượt 2 hoàn tất (6/6). Bấm Next Door để hoàn tất phiên...');
    await page.click('[data-testid="connector-continue-btn"]');
    await new Promise(r => setTimeout(r, 800));

    // Kiểm tra localStorage cap count
    const storedCapCount = await page.evaluate(() => {
      const keys = Object.keys(localStorage);
      const capKey = keys.find(k => k.startsWith('attempt_cap_'));
      return capKey ? localStorage.getItem(capKey) : null;
    });
    console.log(`  localStorage cap count after 2 attempts = ${storedCapCount}`);

    // Mở lại door lần thứ 3 (chọn lại connector_relay trên dropdown mà KHÔNG xóa cap)
    console.log('  Mở lại door lần thứ 3 (reload / re-select connector_relay)...');
    await page.select('#select-active-game', 'phaser_hub');
    await new Promise(r => setTimeout(r, 600));
    await page.select('#select-active-game', 'connector_relay');
    await new Promise(r => setTimeout(r, 800));

    // Đợi xuất hiện màn locked modal
    await page.waitForSelector('[data-testid="connector-locked-modal"]');

    // Kiểm tra DOM chi tiết
    const lockedDomState = await page.evaluate(() => {
      const lockedModal = document.querySelector('[data-testid="connector-locked-modal"]');
      const subtitle = document.querySelector('[data-testid="connector-locked-subtitle"]')?.innerText?.trim() || '';
      const replayBtn = document.querySelector('[data-testid="connector-replay-btn"]');
      const tryAgainBtn = document.querySelector('[data-testid="connector-ko-retry-btn"]');
      const exitBtn = document.querySelector('[data-testid="connector-locked-exit-btn"]');
      const exitBtnText = exitBtn?.innerText?.trim() || '';
      const playingLayout = document.querySelector('.connector-main-layout');

      return {
        isLockedModalVisible: !!lockedModal,
        subtitleText: subtitle,
        isReplayBtnPresent: !!replayBtn,
        isTryAgainBtnPresent: !!tryAgainBtn,
        isExitBtnPresent: !!exitBtn,
        exitBtnText: exitBtnText,
        isPlayingActive: !!playingLayout
      };
    });

    const photoPathH = path.join(OUTPUT_DIR, 'f6d2_scenario_h_locked_3rd_entry.png');
    await page.screenshot({ path: photoPathH });
    fs.copyFileSync(photoPathH, path.join(BRAIN_DIR, 'f6d2_scenario_h_locked_3rd_entry.png'));
    console.log('  Saved screenshot (h):', photoPathH);

    results.scenario_h = {
      storedCapCount,
      domState: lockedDomState,
      screenshotSaved: photoPathH
    };
    console.log('Result (h):', JSON.stringify(results.scenario_h, null, 2));

    console.log('\n=== TỔNG HỢP 8 KỊCH BẢN (a -> h) HOÀN TẤT THÀNH CÔNG ===');
    console.log(JSON.stringify(results, null, 2));

  } catch (err) {
    console.error('❌ Playtest failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
