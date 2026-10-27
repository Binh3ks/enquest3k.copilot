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

function findAnswerForDOM(domText) {
  const cleanDom = domText.replace(/[\n\r_]+/g, ' ').replace(/[,\.]/g, '').trim().toLowerCase();
  for (const q of WEEK_33_CONNECTOR_QUESTIONS) {
    const left = q.sentence.split('_____')[0].replace(/[,\.]/g, '').trim().toLowerCase();
    if (cleanDom.includes(left)) return q.answer.toLowerCase();
  }
  return null;
}

async function run() {
  console.log('🎮 [F6D2 Exact Capture] Launching Real Chrome (headless: false)...');
  const browser = await puppeteer.launch({
    executablePath: fs.existsSync(CHROME_PATH) ? CHROME_PATH : undefined,
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--window-size=1280,840'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  try {
    await page.goto(`${BASE_URL}/quest-demo`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));

    await page.waitForSelector('#select-active-game');
    await page.select('#select-active-game', 'connector_relay');
    await new Promise(r => setTimeout(r, 1500));

    await page.waitForSelector('[data-testid="connector-burst-container"]');
    console.log('✅ Mounted.');

    async function waitForReady() {
      await page.waitForFunction(() => {
        const btns = Array.from(document.querySelectorAll('.connector-option-btn'));
        return btns.length === 3 && !btns[0].disabled;
      }, { timeout: 5000 });
      await new Promise(r => setTimeout(r, 300));
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
          // pick a wrong index
          const wrongIdx = options.findIndex((opt, idx) => idx !== correctIdx);
          return wrongIdx !== -1 ? String(wrongIdx + 1) : '1';
        }
      }, isCorrect, WEEK_33_CONNECTOR_QUESTIONS);

      console.log(`   Pressing key "${keyToPress}" (wantCorrect=${isCorrect})...`);
      await page.keyboard.press(keyToPress);
      await new Promise(r => setTimeout(r, 2200));
    }

    // --- ATTEMPT 0: 2 correct, then 2 wrong -> KO ---
    console.log('Attempt 0 Round 0: Answer CORRECT...');
    await answer(true);
    console.log('Attempt 0 Round 1: Answer CORRECT...');
    await answer(true);
    console.log('Attempt 0 Round 2: Answer WRONG (-1 heart)...');
    await answer(false);
    console.log('Attempt 0 Round 3: Answer WRONG (-1 heart -> KO)...');
    await answer(false);

    await page.waitForSelector('[data-testid="connector-ko-modal"]', { timeout: 5000 });
    await new Promise(r => setTimeout(r, 800));

    const dom1 = await page.evaluate(() => {
      const lines = Array.from(document.querySelectorAll('.victory-stats-card .stat-line'));
      return {
        bridges: lines[0]?.innerText || '',
        score: lines[1]?.innerText || '',
        subtitle: document.querySelector('.modal-subtitle')?.innerText || '',
        hasRetry: !!document.querySelector('[data-testid="connector-ko-retry-btn"]'),
        exitText: document.querySelector('[data-testid="connector-ko-exit-btn"]')?.innerText || '',
      };
    });
    console.log('KO 1 DOM:', JSON.stringify(dom1));

    const p1Local = path.join(OUTPUT_DIR, 'f6d2_ko_attempt0_v2.png');
    const p1Brain = path.join(BRAIN_DIR, 'f6d2_ko_attempt0_v2.png');
    const buf1 = await page.screenshot({ fullPage: true });
    fs.writeFileSync(p1Local, buf1);
    fs.writeFileSync(p1Brain, buf1);
    console.log(`📸 Saved KO1 to ${p1Local}`);

    // --- CLICK RETRY ---
    console.log('Clicking Try Again...');
    const retryBtn = await page.$('[data-testid="connector-ko-retry-btn"]');
    await retryBtn.click();
    await new Promise(r => setTimeout(r, 1500));

    // --- RETRY 1: 2 wrong immediately -> KO ---
    console.log('Retry 1 Round 0: Answer WRONG (-1 heart)...');
    await answer(false);
    console.log('Retry 1 Round 1: Answer WRONG (-1 heart -> KO)...');
    await answer(false);

    await page.waitForSelector('[data-testid="connector-ko-modal"]', { timeout: 5000 });
    await new Promise(r => setTimeout(r, 800));

    const dom2 = await page.evaluate(() => {
      const lines = Array.from(document.querySelectorAll('.victory-stats-card .stat-line'));
      return {
        bridges: lines[0]?.innerText || '',
        score: lines[1]?.innerText || '',
        subtitle: document.querySelector('.modal-subtitle')?.innerText || '',
        hasRetry: !!document.querySelector('[data-testid="connector-ko-retry-btn"]'),
        exitText: document.querySelector('[data-testid="connector-ko-exit-btn"]')?.innerText || '',
      };
    });
    console.log('KO 2 DOM:', JSON.stringify(dom2));

    const p2Local = path.join(OUTPUT_DIR, 'f6d2_ko_retry1_capped_v2.png');
    const p2Brain = path.join(BRAIN_DIR, 'f6d2_ko_retry1_capped_v2.png');
    const buf2 = await page.screenshot({ fullPage: true });
    fs.writeFileSync(p2Local, buf2);
    fs.writeFileSync(p2Brain, buf2);
    console.log(`📸 Saved KO2 to ${p2Local}`);

    await browser.close();
    console.log('✅ COMPLETE.');
  } catch (e) {
    console.error('❌ Error:', e);
    await browser.close();
    process.exit(1);
  }
}
run();
