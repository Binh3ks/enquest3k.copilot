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
  await new Promise(r => setTimeout(r, 1200));

  // Click Door 3
  const doorBtns = await page.$$('.dr-door-enter-btn');
  if (doorBtns.length >= 3) {
    await doorBtns[2].click();
  }
  await new Promise(r => setTimeout(r, 1500));

  // Pick up word from lowest left safe first so Leo is carrying cargo
  await page.evaluate(() => {
    const root = document.querySelector('.shadow-vault-container');
    const key = Object.keys(root).find(k => k.startsWith('__reactFiber'));
    let f = root[key];
    while (f && !f.memoizedProps?.vocabItems) f = f.return;
    let h = f.memoizedState;
    let leoRef = null;
    while (h) {
      if (h.memoizedState?.current?.x !== undefined && h.memoizedState?.current?.vx !== undefined) {
        leoRef = h.memoizedState.current;
      }
      h = h.next;
    }
    const leftEls = Array.from(document.querySelectorAll('.vault-safe.safe-left'));
    // pick safe on lowest platform
    const lowSafe = leftEls.find(el => parseInt(el.style.top) > 300) || leftEls[0];
    if (lowSafe && leoRef) {
      leoRef.x = parseInt(lowSafe.style.left) + 20;
      leoRef.y = parseInt(lowSafe.style.top);
    }
  });

  await new Promise(r => setTimeout(r, 500));

  // Now walk Leo right across the ground straight into guard_ground!
  console.log('Moving Leo right into guard patrol...');
  await page.keyboard.down('ArrowRight');
  
  let spotted = false;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 100));
    const state = await page.evaluate(() => {
      const alert = document.querySelector('.vault-feedback-alert');
      const heartsCount = document.querySelectorAll('.hud-heart-full').length;
      return {
        text: alert?.innerText || '',
        hearts: heartsCount,
      };
    });
    if (state.hearts === 2 || state.text.includes('SPOTTED') || state.text.includes('Wrong')) {
      console.log(`Detected State: "${state.text}" (Hearts: ${state.hearts}/3)`);
      spotted = true;
      break;
    }
  }
  await page.keyboard.up('ArrowRight');

  // Let hit animation settle slightly
  await new Promise(r => setTimeout(r, 200));

  const wrongBuf = await page.screenshot();
  const filePath1 = path.join(SCREENSHOTS_DIR, 'b2_real_shadow_wrong.png');
  const filePath2 = path.join(BRAIN_ARTIFACT_DIR, 'b2_real_shadow_wrong.png');
  fs.writeFileSync(filePath1, wrongBuf);
  fs.writeFileSync(filePath2, wrongBuf);
  console.log(`Saved screenshot to:\n  ${filePath1}\n  ${filePath2}`);

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
