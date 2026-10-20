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
  console.log('🎮 [F6D2 Verify Cap] Launching Real Chrome (headless: false)...');
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

    // Helper: wait for buttons to be enabled and click an option
    async function pickOption(waitForAdvance = true) {
      await page.waitForFunction(() => {
        const btns = Array.from(document.querySelectorAll('.connector-option-btn'));
        return btns.length > 0 && !btns[0].disabled;
      }, { timeout: 5000 });

      // Click option 0
      const btn = await page.$('.connector-option-btn');
      await btn.click();
      console.log('   Clicked an option.');

      if (waitForAdvance) {
        // Wait for 1400ms feedback + advance
        await new Promise(r => setTimeout(r, 2000));
      }
    }

    // --- ATTEMPT 0: Trigger KO ---
    console.log('Attempt 0: Picking option #1 (may lose 1 heart)...');
    await pickOption(true);

    console.log('Attempt 0: Picking option #2 (may lose 1 heart)...');
    await pickOption(true);

    // If still playing (maybe accidentally guessed right), keep clicking until KO
    let attemptsRemaining = 10;
    while (attemptsRemaining-- > 0) {
      const isKo = await page.$('[data-testid="connector-ko-modal"]');
      if (isKo) break;
      console.log('   Still playing, picking another option...');
      await pickOption(true);
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
    console.log(`📸 [SAVED] ${ko1PathLocal}`);

    const hasRetryBtn1 = await page.$('[data-testid="connector-ko-retry-btn"]');
    const hasExitBtn1 = await page.$('[data-testid="connector-ko-exit-btn"]');
    const exitText1 = await page.$eval('[data-testid="connector-ko-exit-btn"]', el => el.innerText.trim());
    console.log(`KO 1: hasRetryBtn=${!!hasRetryBtn1}, hasExitBtn=${!!hasExitBtn1}, exitText="${exitText1}"`);

    if (!hasRetryBtn1) throw new Error('KO 1 must have Try Again button!');

    // --- CLICK RETRY ---
    console.log('Clicking Try Again to enter Retry 1...');
    await hasRetryBtn1.click();
    await new Promise(r => setTimeout(r, 1500));

    // --- RETRY 1 (Attempt 1): Trigger KO again ---
    console.log('Retry 1: Picking option #1...');
    await pickOption(true);

    console.log('Retry 1: Picking option #2...');
    await pickOption(true);

    attemptsRemaining = 10;
    while (attemptsRemaining-- > 0) {
      const isKo = await page.$('[data-testid="connector-ko-modal"]');
      if (isKo) break;
      console.log('   Retry 1 still playing, picking another option...');
      await pickOption(true);
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
    console.log(`📸 [SAVED] ${ko2PathLocal}`);

    const hasRetryBtn2 = await page.$('[data-testid="connector-ko-retry-btn"]');
    const hasExitBtn2 = await page.$('[data-testid="connector-ko-exit-btn"]');
    const exitText2 = await page.$eval('[data-testid="connector-ko-exit-btn"]', el => el.innerText.trim());
    console.log(`KO 2: hasRetryBtn=${!!hasRetryBtn2}, hasExitBtn=${!!hasExitBtn2}, exitText="${exitText2}"`);

    if (hasRetryBtn2) {
      throw new Error('FAIL: KO 2 must NOT have Try Again button (cap at 2 attempts violated)!');
    }
    console.log('🎉 SUCCESS: KO 2 correctly hides Try Again button and only presents "Về bài học" button!');

    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during verify:', err);
    await browser.close();
    process.exit(1);
  }
}

run();
