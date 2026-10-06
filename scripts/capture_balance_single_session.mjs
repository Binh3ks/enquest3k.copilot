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

  // 2. Wait for first orb to reach y >= 380 and strike CORRECTLY
  console.log('Waiting for first orb for CORRECT strike...');
  for (let i = 0; i < 50; i++) {
    await new Promise(r => setTimeout(r, 100));
    const curOrb = await page.evaluate(() => window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getActiveOrb());
    if (curOrb && curOrb.state === 'falling' && curOrb.y >= 380) {
      console.log(`Striking CORRECT on orb "${curOrb.word}" (${curOrb.role}) at y=${curOrb.y}`);
      await page.evaluate(({ targetRole }) => {
        const el = document.querySelector('.wcb-canvas');
        const key = Object.keys(el).find(k => k.startsWith('__reactFiber'));
        let f = el[key], sim = null;
        while (f) {
          if (f.memoizedState) {
            let s = f.memoizedState;
            while (s) {
              if (s.memoizedState?.current?.activeOrb !== undefined) {
                sim = s.memoizedState.current; break;
              }
              s = s.next;
            }
          }
          if (sim) break;
          f = f.return;
        }
        const dir = targetRole === 'NOUN' ? 'left' : 'right';
        sim.leoX = sim.activeOrb.x - 500;
        sim.facing = dir;
        window.__WORD_CLASS_BALANCE_TEST_HOOK__.strike(dir);
      }, { targetRole: curOrb.role });
      break;
    }
  }

  // Wait for correct state (streak = 1)
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 50));
    const streak = await page.evaluate(() => window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getStreak());
    if (streak === 1) break;
  }
  await new Promise(r => setTimeout(r, 150));

  const correctState = await page.evaluate(() => ({
    score: window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getScore(),
    streak: window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getStreak(),
    hearts: window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getHearts(),
    toast: document.querySelector('.wcb-feedback-banner')?.innerText,
  }));
  console.log('Post Correct State:', correctState);

  const correctBuf = await page.screenshot();
  saveFrame(correctBuf, 'b5_real_balance_correct.png');

  // 3. Wait for feedback to fade and next orb to spawn & reach y >= 380
  await new Promise(r => setTimeout(r, 1800));

  console.log('Waiting for second orb for WRONG strike...');
  for (let i = 0; i < 50; i++) {
    await new Promise(r => setTimeout(r, 100));
    const curOrb = await page.evaluate(() => window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getActiveOrb());
    if (curOrb && curOrb.state === 'falling' && curOrb.y >= 380) {
      console.log(`Striking WRONG on orb "${curOrb.word}" (${curOrb.role}) at y=${curOrb.y}`);
      await page.evaluate(({ targetRole }) => {
        const el = document.querySelector('.wcb-canvas');
        const key = Object.keys(el).find(k => k.startsWith('__reactFiber'));
        let f = el[key], sim = null;
        while (f) {
          if (f.memoizedState) {
            let s = f.memoizedState;
            while (s) {
              if (s.memoizedState?.current?.activeOrb !== undefined) {
                sim = s.memoizedState.current; break;
              }
              s = s.next;
            }
          }
          if (sim) break;
          f = f.return;
        }
        const dir = targetRole === 'NOUN' ? 'right' : 'left'; // WRONG!
        sim.leoX = sim.activeOrb.x - 500;
        sim.facing = dir;
        window.__WORD_CLASS_BALANCE_TEST_HOOK__.strike(dir);
      }, { targetRole: curOrb.role });
      break;
    }
  }

  // Wait specifically for hearts to drop to 1 (post critical tilt hazard)
  console.log('Waiting for tilt to exceed 25° and hearts to drop to 1...');
  let heartDropped = false;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 100));
    const h = await page.evaluate(() => window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getHearts());
    const tilt = await page.evaluate(() => window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getTilt());
    if (h === 1) {
      console.log(`Heart penalty confirmed! hearts=${h}, tilt=${tilt}`);
      heartDropped = true;
      break;
    }
  }

  // Small pause to let banner/DOM settle
  await new Promise(r => setTimeout(r, 100));

  const wrongState = await page.evaluate(() => ({
    score: window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getScore(),
    streak: window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getStreak(),
    hearts: window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getHearts(),
    toast: document.querySelector('.wcb-feedback-banner')?.innerText,
    heartsDOM: Array.from(document.querySelectorAll('.wcb-hearts svg')).map(svg => svg.getAttribute('fill') !== 'none'),
  }));
  console.log('Post Wrong State:', wrongState);

  const wrongBuf = await page.screenshot();
  saveFrame(wrongBuf, 'b5_real_balance_wrong.png');

  await new Promise(r => setTimeout(r, 1000));
  await browser.close();
}

run().catch(console.error);
