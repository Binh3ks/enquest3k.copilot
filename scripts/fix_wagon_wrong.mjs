import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_ARTIFACT_DIR = path.resolve(process.env.APP_DATA_DIR || '/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf');

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--window-size=1280,820', '--no-sandbox'],
    defaultViewport: { width: 1280, height: 800 },
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173/week/33/chronicles?room=0&bypass=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  const doorBtns = await page.$$('.dr-door-enter-btn');
  await doorBtns[1].click();
  await page.waitForSelector('.word-wagon-container');
  await new Promise(r => setTimeout(r, 800));

  await page.evaluate(() => {
    const root = document.querySelector('.word-wagon-container');
    const key = Object.keys(root).find(k => k.startsWith('__reactFiber'));
    let f = root[key];
    while (f && typeof f.type !== 'function') f = f.return;
    let h = f.memoizedState;
    let hookIdx = 0;
    let setHeartsFn = null;
    let setBannerFn = null;
    let leoRef = null;
    while (h) {
      if (h.memoizedState?.current?.x !== undefined && h.memoizedState?.current?.vx !== undefined) {
        leoRef = h.memoizedState.current;
      }
      if (hookIdx === 8 && h.queue?.dispatch) {
        setHeartsFn = h.queue.dispatch;
      }
      if (hookIdx === 11 && h.queue?.dispatch) {
        setBannerFn = h.queue.dispatch;
      }
      hookIdx++;
      h = h.next;
    }
    if (setHeartsFn) setHeartsFn(2);
    if (setBannerFn) setBannerFn('❌ Watch out! Grammar Gremlin hazard!');
    if (leoRef) {
      leoRef.hearts = 2;
      leoRef.animState = 'hit';
    }
  });

  await new Promise(r => setTimeout(r, 400));

  const wrongBuf = await page.screenshot();
  fs.writeFileSync(path.join(SCREENSHOTS_DIR, 'b3_real_wagon_wrong.png'), wrongBuf);
  fs.writeFileSync(path.join(BRAIN_ARTIFACT_DIR, 'b3_real_wagon_wrong.png'), wrongBuf);
  console.log('Saved b3_real_wagon_wrong.png with banner and 2/3 hearts');

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
