import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUTPUT_DIR = 'docs/agent_artifacts/screenshots';
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf';

function saveFrame(buf, filename) {
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), buf);
  fs.writeFileSync(path.join(BRAIN_DIR, filename), buf);
  console.log(`📸 [SAVED] ${filename}`);
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--window-size=1280,820'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto('http://localhost:5173/week/33/chronicles?room=6&bypass=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  const doorBtns = await page.$$('.dr-door-enter-btn');
  if (doorBtns.length >= 3) {
    await doorBtns[2].click();
  }
  await new Promise(r => setTimeout(r, 1500));

  // 1. Capture Spawn in this session
  const spawnBuf = await page.screenshot();
  saveFrame(spawnBuf, 'b5_real_balance_spawn.png');

  // Helper to access simRef directly
  const getSim = async () => {
    return page.evaluate(() => {
      const el = document.querySelector('.wcb-canvas');
      const key = Object.keys(el || {}).find(k => k.startsWith('__reactFiber'));
      let f = el ? el[key] : null;
      while (f) {
        if (f.memoizedState) {
          let s = f.memoizedState;
          while (s) {
            if (s.memoizedState?.current?.activeOrb !== undefined) {
              return s.memoizedState.current;
            }
            s = s.next;
          }
        }
        f = f.return;
      }
      return null;
    });
  };

  // 2. Wait for first orb to drop to y=330, then teleport Leo directly underneath and strike correctly
  console.log('Waiting for first orb to strike correctly...');
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 100));
    const curOrb = await page.evaluate(() => window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getActiveOrb());
    if (curOrb && curOrb.state === 'falling' && curOrb.y >= 320 && curOrb.y <= 410) {
      console.log(`Connecting strike on orb "${curOrb.word}" (${curOrb.role}) at y=${curOrb.y}`);
      const correctDir = curOrb.role === 'NOUN' ? 'left' : 'right';
      await page.evaluate(({ orbX, dir }) => {
        const el = document.querySelector('.wcb-canvas');
        const key = Object.keys(el).find(k => k.startsWith('__reactFiber'));
        let f = el[key];
        let sim = null;
        while (f) {
          if (f.memoizedState) {
            let s = f.memoizedState;
            while (s) {
              if (s.memoizedState?.current?.activeOrb !== undefined) {
                sim = s.memoizedState.current;
                break;
              }
              s = s.next;
            }
          }
          if (sim) break;
          f = f.return;
        }
        if (sim) {
          sim.leoX = orbX - 500;
          sim.facing = dir;
          window.__WORD_CLASS_BALANCE_TEST_HOOK__.strike(dir);
        }
      }, { orbX: curOrb.x, dir: correctDir });
      break;
    }
  }

  // Wait for orb to fly and land in pan (0.35s flight + 0.15s reaction)
  console.log('Waiting for correct feedback banner...');
  await page.waitForSelector('.wcb-feedback-banner.correct', { timeout: 4000 });

  await new Promise(r => setTimeout(r, 200));
  const correctBuf = await page.screenshot();
  saveFrame(correctBuf, 'b5_real_balance_correct.png');

  const correctState = await page.evaluate(() => ({
    score: window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getScore(),
    streak: window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getStreak(),
    hearts: window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getHearts(),
    toast: document.querySelector('.wcb-feedback-banner')?.innerText,
  }));
  console.log('Post Correct State:', correctState);

  // 3. Wait for banner to clear, then strike next orb in WRONG direction
  await new Promise(r => setTimeout(r, 1600));

  console.log('Waiting for next orb to strike WRONGLY...');
  for (let i = 0; i < 50; i++) {
    await new Promise(r => setTimeout(r, 100));
    const curOrb = await page.evaluate(() => window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getActiveOrb());
    if (curOrb && curOrb.state === 'falling' && curOrb.y >= 320 && curOrb.y <= 410) {
      console.log(`Connecting WRONG strike on orb "${curOrb.word}" (${curOrb.role})`);
      const wrongDir = curOrb.role === 'NOUN' ? 'right' : 'left';
      await page.evaluate(({ orbX, dir }) => {
        const el = document.querySelector('.wcb-canvas');
        const key = Object.keys(el).find(k => k.startsWith('__reactFiber'));
        let f = el[key];
        let sim = null;
        while (f) {
          if (f.memoizedState) {
            let s = f.memoizedState;
            while (s) {
              if (s.memoizedState?.current?.activeOrb !== undefined) {
                sim = s.memoizedState.current;
                break;
              }
              s = s.next;
            }
          }
          if (sim) break;
          f = f.return;
        }
        if (sim) {
          sim.leoX = orbX - 500;
          sim.facing = dir;
          window.__WORD_CLASS_BALANCE_TEST_HOOK__.strike(dir);
        }
      }, { orbX: curOrb.x, dir: wrongDir });
      break;
    }
  }

  // Wait for wrong banner / critical tilt banner
  console.log('Waiting for wrong feedback banner...');
  await page.waitForSelector('.wcb-feedback-banner.wrong', { timeout: 4000 });

  await new Promise(r => setTimeout(r, 200));
  const wrongBuf = await page.screenshot();
  saveFrame(wrongBuf, 'b5_real_balance_wrong.png');

  const wrongState = await page.evaluate(() => ({
    score: window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getScore(),
    streak: window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getStreak(),
    hearts: window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getHearts(),
    toast: document.querySelector('.wcb-feedback-banner')?.innerText,
  }));
  console.log('Post Wrong State:', wrongState);

  await new Promise(r => setTimeout(r, 1000));
  await browser.close();
}

run().catch(console.error);
