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

  // Click Door 3
  const doorBtns = await page.$$('.dr-door-enter-btn');
  if (doorBtns.length >= 3) {
    await doorBtns[2].click();
  }
  
  // Wait for container to mount
  await page.waitForSelector('.shadow-vault-container');
  // Wait 300ms for initial render, absolutely NO inputs, NO interaction
  await new Promise(r => setTimeout(r, 300));

  // Inspect exact DOM state of HUD and Leo
  const domInfo = await page.evaluate(() => {
    const fullHearts = document.querySelectorAll('.hud-heart-full').length;
    const emptyHearts = document.querySelectorAll('.hud-heart-empty').length;
    const heartsText = document.querySelector('.hud-hearts')?.innerText;
    const ariaLabel = document.querySelector('.hud-hearts')?.getAttribute('aria-label');
    const timerText = document.querySelector('.hud-timer')?.innerText;
    const scoreText = document.querySelector('.hud-score')?.innerText;
    const roundPill = document.querySelector('.hud-round-pill')?.innerText;
    const banner = document.querySelector('.vault-feedback-alert')?.innerText;
    
    // Check Leo position and velocity
    const root = document.querySelector('.shadow-vault-container');
    const key = Object.keys(root).find(k => k.startsWith('__reactFiber'));
    let f = root[key];
    while (f && !f.memoizedProps?.vocabItems) f = f.return;
    let h = f.memoizedState;
    let leoRef = null;
    let hookIndex = 0;
    let stateHearts = null;
    while (h) {
      if (h.memoizedState?.current?.x !== undefined && h.memoizedState?.current?.vx !== undefined) {
        leoRef = h.memoizedState.current;
      }
      if (hookIndex === 7) {
        stateHearts = h.memoizedState;
      }
      hookIndex++;
      h = h.next;
    }

    return {
      fullHearts,
      emptyHearts,
      heartsText,
      ariaLabel,
      timerText,
      scoreText,
      roundPill,
      banner: banner || '(no banner)',
      stateHearts,
      leoX: leoRef?.x,
      leoY: leoRef?.y,
      leoHearts: leoRef?.hearts,
    };
  });

  console.log('DOM Info at Spawn:', JSON.stringify(domInfo, null, 2));

  // Take fresh spawn screenshot
  const spawnBuf = await page.screenshot();
  fs.writeFileSync(path.join(SCREENSHOTS_DIR, 'b2_real_shadow_spawn.png'), spawnBuf);
  fs.writeFileSync(path.join(BRAIN_ARTIFACT_DIR, 'b2_real_shadow_spawn.png'), spawnBuf);
  console.log('Successfully re-saved b2_real_shadow_spawn.png at clean mount');

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
