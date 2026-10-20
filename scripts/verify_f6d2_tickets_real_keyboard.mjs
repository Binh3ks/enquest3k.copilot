import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
  console.log('🎮 [F6D2 Tickets Verify] Real Chrome (headless: false) with REAL KEYBOARD...');
  const browser = await puppeteer.launch({
    executablePath: fs.existsSync(CHROME_PATH) ? CHROME_PATH : undefined,
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--window-size=1280,840'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  try {
    console.log('Navigating to /quest-demo...');
    await page.goto(`${BASE_URL}/quest-demo`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));

    console.log('Selecting Floor 6 Door 2: Connector Burst...');
    await page.waitForSelector('#select-active-game', { timeout: 5000 });
    await page.select('#select-active-game', 'connector_relay');
    await new Promise(r => setTimeout(r, 1500));

    await page.waitForSelector('[data-testid="connector-burst-container"]', { timeout: 5000 });
    console.log('✅ Connector Burst mounted.');

    // Helper: wait for buttons to be enabled and ready for keyboard input
    async function waitForReady() {
      await page.waitForFunction(() => {
        const btns = Array.from(document.querySelectorAll('.connector-option-btn'));
        return btns.length === 3 && !btns[0].disabled;
      }, { timeout: 5000 });
      await new Promise(r => setTimeout(r, 200));
    }

    // Helper: find wrong option index (0, 1, or 2)
    async function getWrongKeyIndex() {
      return await page.evaluate(() => {
        // Read the 3 option words
        const btns = Array.from(document.querySelectorAll('.connector-option-btn'));
        // In ConnectorRelayCanvas, the right clause and prompt give context, but we can inspect feedback toast after press, or pick an option
        // The buttons have data-answer attribute
        // Let's pick option 0, or compare with correct answer
        return 0; // Key '1'
      });
    }

    // --- ATTEMPT 0 ---
    console.log('Attempt 0 Round 0: Pressing key "1"...');
    await waitForReady();
    await page.keyboard.press('1');
    await new Promise(r => setTimeout(r, 2000)); // wait for feedback + advance

    console.log('Attempt 0 Round 1: Pressing key "1"...');
    await waitForReady();
    await page.keyboard.press('1');
    await new Promise(r => setTimeout(r, 2000));

    // Keep pressing until KO modal appears
    let safety = 10;
    while (safety-- > 0) {
      const isKo = await page.$('[data-testid="connector-ko-modal"]');
      if (isKo) break;
      console.log('   Advancing next round with key "1"...');
      await waitForReady();
      await page.keyboard.press('1');
      await new Promise(r => setTimeout(r, 2000));
    }

    await page.waitForSelector('[data-testid="connector-ko-modal"]', { timeout: 5000 });
    console.log('✅ KO Modal displayed for Attempt 0.');
    await new Promise(r => setTimeout(r, 800));

    // Screenshot KO 1
    const ko1PathLocal = path.join(OUTPUT_DIR, 'f6d2_ko_attempt0.png');
    const ko1PathBrain = path.join(BRAIN_DIR, 'f6d2_ko_attempt0.png');
    const buf1 = await page.screenshot({ fullPage: true });
    fs.writeFileSync(ko1PathLocal, buf1);
    fs.writeFileSync(ko1PathBrain, buf1);

    const stats1 = await page.evaluate(() => {
      const lines = Array.from(document.querySelectorAll('.victory-stats-card .stat-line'));
      const text1 = lines[0]?.innerText || '';
      const text2 = lines[1]?.innerText || '';
      const subtitle = document.querySelector('.modal-subtitle')?.innerText || '';
      const hasRetry = !!document.querySelector('[data-testid="connector-ko-retry-btn"]');
      const exitText = document.querySelector('[data-testid="connector-ko-exit-btn"]')?.innerText || '';
      return { text1, text2, subtitle, hasRetry, exitText };
    });
    console.log('KO 1 DOM State:', JSON.stringify(stats1, null, 2));

    // --- CLICK RETRY ---
    console.log('Clicking Try Again with real mouse click...');
    const retryBtn = await page.$('[data-testid="connector-ko-retry-btn"]');
    await retryBtn.click();
    await new Promise(r => setTimeout(r, 1500));

    // --- RETRY 1 (Attempt 1) ---
    console.log('Retry 1: Answering via keyboard until KO...');
    safety = 10;
    while (safety-- > 0) {
      const isKo = await page.$('[data-testid="connector-ko-modal"]');
      if (isKo) break;
      await waitForReady();
      await page.keyboard.press('1');
      await new Promise(r => setTimeout(r, 2000));
    }

    await page.waitForSelector('[data-testid="connector-ko-modal"]', { timeout: 5000 });
    console.log('✅ KO Modal displayed for Retry 1.');
    await new Promise(r => setTimeout(r, 800));

    // Screenshot KO 2
    const ko2PathLocal = path.join(OUTPUT_DIR, 'f6d2_ko_retry1_capped.png');
    const ko2PathBrain = path.join(BRAIN_DIR, 'f6d2_ko_retry1_capped.png');
    const buf2 = await page.screenshot({ fullPage: true });
    fs.writeFileSync(ko2PathLocal, buf2);
    fs.writeFileSync(ko2PathBrain, buf2);

    const stats2 = await page.evaluate(() => {
      const lines = Array.from(document.querySelectorAll('.victory-stats-card .stat-line'));
      const text1 = lines[0]?.innerText || '';
      const text2 = lines[1]?.innerText || '';
      const subtitle = document.querySelector('.modal-subtitle')?.innerText || '';
      const hasRetry = !!document.querySelector('[data-testid="connector-ko-retry-btn"]');
      const exitText = document.querySelector('[data-testid="connector-ko-exit-btn"]')?.innerText || '';
      return { text1, text2, subtitle, hasRetry, exitText };
    });
    console.log('KO 2 DOM State:', JSON.stringify(stats2, null, 2));

    if (stats2.hasRetry) throw new Error('FAIL: Retry 2 must NOT have Try Again button!');
    if (!stats2.subtitle.includes('Hết lượt bài này. Về bài học để ôn lại!')) {
      throw new Error(`FAIL: Subtitle does not match! Got: ${stats2.subtitle}`);
    }

    console.log('🎉 ALL TICKETS VERIFIED SUCCESSFULLY!');
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during verify:', err);
    await browser.close();
    process.exit(1);
  }
}

run();
