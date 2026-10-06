import puppeteer from 'puppeteer';
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function test() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/week/33/chronicles?room=6&bypass=true');
  await new Promise(r => setTimeout(r, 1500));
  const doorBtns = await page.$$('.dr-door-enter-btn');
  await doorBtns[2].click();
  await new Promise(r => setTimeout(r, 1500));

  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 100));
    const orb = await page.evaluate(() => window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getActiveOrb());
    if (orb && orb.y >= 380) {
      console.log('Orb at y:', orb.y, 'x:', orb.x, 'word:', orb.word, 'role:', orb.role);
      const strikeRes = await page.evaluate((targetRole) => {
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
        const curOrb = sim.activeOrb;
        sim.leoX = curOrb.x - 500;
        sim.facing = dir;
        window.__WORD_CLASS_BALANCE_TEST_HOOK__.strike(dir);
        return {
          leoX: sim.leoX,
          orbState: sim.activeOrb?.state,
          orbTargetPan: sim.activeOrb?.targetPan,
          orbVx: sim.activeOrb?.vx,
          orbVy: sim.activeOrb?.vy
        };
      }, orb.role);
      console.log('Strike result:', strikeRes);
      break;
    }
  }

  for (let j = 0; j < 8; j++) {
    await new Promise(r => setTimeout(r, 100));
    const state = await page.evaluate(() => ({
      orbState: window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getActiveOrb()?.state,
      score: window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getScore(),
      streak: window.__WORD_CLASS_BALANCE_TEST_HOOK__?.getStreak(),
      toast: document.querySelector('.wcb-feedback-banner')?.innerText,
      toastClass: document.querySelector('.wcb-feedback-banner')?.className
    }));
    console.log(`Step ${j}:`, state);
  }
  await browser.close();
}
test();
