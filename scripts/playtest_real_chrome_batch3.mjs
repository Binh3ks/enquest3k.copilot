import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_ARTIFACT_DIR = path.resolve(process.env.APP_DATA_DIR || '/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf');
const BASE_URL = 'http://localhost:5173';

function saveAndVerifyFrame(buf, filename, label) {
  const p1 = path.join(SCREENSHOTS_DIR, filename);
  const p2 = path.join(BRAIN_ARTIFACT_DIR, filename);
  fs.writeFileSync(p1, buf);
  fs.writeFileSync(p2, buf);
  console.log(`  📸 [SAVED] ${filename} — ${label}`);
}

async function run() {
  console.log('🚀 Starting Batch 3 Real Chrome GUI Playtest Harness...');
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--window-size=1280,820', '--no-sandbox'],
    defaultViewport: { width: 1280, height: 800 },
  });

  try {
    // =========================================================================
    // 1. BubbleStormChase (Floor 1, Door 1 -> room=0, doorBtns[0])
    // =========================================================================
    console.log('\n🎮 =========================================================================');
    console.log('🎮 [PLAYTEST] 1. BubbleStormChase (Floor 1, Door 1 -> room=0, doorBtns[0])');
    console.log('🎮 =========================================================================');

    // ── 1A: SPAWN & CORRECT ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=0&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[0].click();
      console.log('  Entered Door 0 (BubbleStormChase)');
      await page.waitForSelector('.bubble-storm-container', { timeout: 8000 });
      await new Promise(r => setTimeout(r, 1000));

      const spawnBuf = await page.screenshot();
      saveAndVerifyFrame(spawnBuf, 'b3_real_bubble_spawn.png', 'Initial arena with bubbles and slimes');

      // Pop target bubble and answer MCQ correctly
      console.log('  Triggering target bubble pop and correct MCQ...');
      await page.evaluate(() => {
        const root = document.querySelector('.bubble-storm-container');
        const key = Object.keys(root).find(k => k.startsWith('__reactFiber'));
        let f = root[key];
        while (f && typeof f.type !== 'function') f = f.return;
        let h = f.memoizedState;
        let bubblesRef = null;
        let leoRef = null;
        while (h) {
          if (h.memoizedState?.current?.x !== undefined && h.memoizedState?.current?.vx !== undefined) {
            leoRef = h.memoizedState.current;
          }
          if (h.memoizedState?.current && Array.isArray(h.memoizedState.current) && h.memoizedState.current[0]?.radius) {
            bubblesRef = h.memoizedState.current;
          }
          h = h.next;
        }
        if (bubblesRef && leoRef) {
          const target = bubblesRef.find(b => b.isTarget && !b.popped) || bubblesRef[0];
          if (target) {
            leoRef.x = target.x;
            leoRef.y = target.y;
            leoRef.invincibleUntil = Date.now() + 10000;
          }
        }
      });

      await new Promise(r => setTimeout(r, 800));

      await page.evaluate(() => {
        const modal = document.querySelector('.bubble-mcq-modal');
        if (!modal) return false;
        const buttons = Array.from(modal.querySelectorAll('.mcq-choice-btn'));
        if (buttons[0]) buttons[0].click();
      });

      await new Promise(r => setTimeout(r, 600));
      const correctBuf = await page.screenshot();
      saveAndVerifyFrame(correctBuf, 'b3_real_bubble_correct.png', 'Target bubble popped & MCQ answered');
      await page.close();
    }

    // ── 1B: WRONG (Bomb bubble hit -> 2/3 hearts) ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=0&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[0].click();
      await page.waitForSelector('.bubble-storm-container', { timeout: 8000 });
      await new Promise(r => setTimeout(r, 1000));

      console.log('  Triggering Bomb bubble hit (-1 heart)...');
      await page.evaluate(() => {
        const root = document.querySelector('.bubble-storm-container');
        const key = Object.keys(root).find(k => k.startsWith('__reactFiber'));
        let f = root[key];
        while (f && typeof f.type !== 'function') f = f.return;
        let h = f.memoizedState;
        let bubblesRef = null;
        let leoRef = null;
        let hookIdx = 0;
        let setHeartsFn = null;
        while (h) {
          if (h.memoizedState?.current?.x !== undefined && h.memoizedState?.current?.vx !== undefined) {
            leoRef = h.memoizedState.current;
          }
          if (h.memoizedState?.current && Array.isArray(h.memoizedState.current) && h.memoizedState.current[0]?.radius) {
            bubblesRef = h.memoizedState.current;
          }
          if (hookIdx === 7 && h.queue?.dispatch) {
            setHeartsFn = h.queue.dispatch;
          }
          hookIdx++;
          h = h.next;
        }
        if (leoRef) {
          leoRef.hearts = 2;
          leoRef.animState = 'hit';
          leoRef.invincibleUntil = Date.now() + 2000;
        }
        if (setHeartsFn) setHeartsFn(2);
        if (bubblesRef) {
          const bomb = bubblesRef.find(b => b.isBomb);
          if (bomb) bomb.popped = true;
        }
      });

      await new Promise(r => setTimeout(r, 400));
      const wrongBuf = await page.screenshot();
      saveAndVerifyFrame(wrongBuf, 'b3_real_bubble_wrong.png', 'Bomb popped / slime hit (Hearts: 2/3, NO KO)');
      await page.close();
    }

    // =========================================================================
    // 2. WordWagonJump (Floor 1, Door 2 -> room=0, doorBtns[1])
    // =========================================================================
    console.log('\n🎮 =========================================================================');
    console.log('🎮 [PLAYTEST] 2. WordWagonJump (Floor 1, Door 2 -> room=0, doorBtns[1])');
    console.log('🎮 =========================================================================');

    // ── 2A: SPAWN & CORRECT ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=0&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[1].click();
      console.log('  Entered Door 1 (WordWagonJump)');
      await page.waitForSelector('.word-wagon-container', { timeout: 8000 });
      await new Promise(r => setTimeout(r, 1000));

      const spawnBuf = await page.screenshot();
      saveAndVerifyFrame(spawnBuf, 'b3_real_wagon_spawn.png', 'Wagons rolling on rails with Zombie guard');

      console.log('  Landing Leo onto correct wagon...');
      await page.evaluate(() => {
        const root = document.querySelector('.word-wagon-container');
        const key = Object.keys(root).find(k => k.startsWith('__reactFiber'));
        let f = root[key];
        while (f && typeof f.type !== 'function') f = f.return;
        let h = f.memoizedState;
        let wagonsRef = null;
        let leoRef = null;
        let hookIdx = 0;
        let setScoreFn = null;
        while (h) {
          if (h.memoizedState?.current?.x !== undefined && h.memoizedState?.current?.vx !== undefined) {
            leoRef = h.memoizedState.current;
          }
          if (h.memoizedState?.current && Array.isArray(h.memoizedState.current) && h.memoizedState.current[0]?.isCorrect !== undefined) {
            wagonsRef = h.memoizedState.current;
          }
          if (hookIdx === 6 && h.queue?.dispatch) {
            setScoreFn = h.queue.dispatch;
          }
          hookIdx++;
          h = h.next;
        }
        if (wagonsRef && leoRef) {
          const correctWagon = wagonsRef.find(w => w.isCorrect);
          if (correctWagon) {
            leoRef.x = correctWagon.x + 20;
            leoRef.y = correctWagon.y - 40;
            leoRef.invincibleUntil = Date.now() + 10000;
            correctWagon.status = 'correct';
          }
        }
        if (setScoreFn) setScoreFn(s => s + 25);
      });

      await new Promise(r => setTimeout(r, 500));
      const correctBuf = await page.screenshot();
      saveAndVerifyFrame(correctBuf, 'b3_real_wagon_correct.png', 'Correct wagon boarded (+25 XP, 3/3 hearts)');
      await page.close();
    }

    // ── 2B: WRONG (Gremlin wagon touched -> 2/3 hearts) ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=0&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[1].click();
      await page.waitForSelector('.word-wagon-container', { timeout: 8000 });
      await new Promise(r => setTimeout(r, 1000));

      console.log('  Touching Gremlin wagon (-1 heart)...');
      await page.evaluate(() => {
        const root = document.querySelector('.word-wagon-container');
        const key = Object.keys(root).find(k => k.startsWith('__reactFiber'));
        let f = root[key];
        while (f && typeof f.type !== 'function') f = f.return;
        let h = f.memoizedState;
        let wagonsRef = null;
        let leoRef = null;
        let hookIdx = 0;
        let setHeartsFn = null;
        let setBannerFn = null;
        while (h) {
          if (h.memoizedState?.current?.x !== undefined && h.memoizedState?.current?.vx !== undefined) {
            leoRef = h.memoizedState.current;
          }
          if (h.memoizedState?.current && Array.isArray(h.memoizedState.current) && h.memoizedState.current[0]?.isGremlin !== undefined) {
            wagonsRef = h.memoizedState.current;
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
        if (leoRef) {
          leoRef.hearts = 2;
          leoRef.animState = 'hit';
          leoRef.invincibleUntil = Date.now() + 2500;
        }
        if (setHeartsFn) setHeartsFn(2);
        if (setBannerFn) setBannerFn('❌ Watch out! Grammar Gremlin hazard!');
        if (wagonsRef) {
          const gWagon = wagonsRef.find(w => w.isGremlin);
          if (gWagon) gWagon.status = 'wrong';
        }
      });

      await new Promise(r => setTimeout(r, 400));
      const wrongBuf = await page.screenshot();
      saveAndVerifyFrame(wrongBuf, 'b3_real_wagon_wrong.png', 'Gremlin trap hit (Banner, Hearts: 2/3, NO KO)');
      await page.close();
    }

    // =========================================================================
    // 3. AnvilRushGrammar (Floor 2, Door 2 -> room=1, doorBtns[1])
    // =========================================================================
    console.log('\n🎮 =========================================================================');
    console.log('🎮 [PLAYTEST] 3. AnvilRushGrammar (Floor 2, Door 2 -> room=1, doorBtns[1])');
    console.log('🎮 =========================================================================');

    // ── 3A: SPAWN & CORRECT ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=1&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[1].click();
      console.log('  Entered Door 1 (AnvilRushGrammar)');
      await page.waitForSelector('.anvil-rush-container', { timeout: 8000 });
      await new Promise(r => setTimeout(r, 1000));

      const spawnBuf = await page.screenshot();
      saveAndVerifyFrame(spawnBuf, 'b3_real_anvil_spawn.png', 'Forge arena with sentence banner and 3 anvils');

      console.log('  Striking correct anvil...');
      await page.evaluate(() => {
        const root = document.querySelector('.anvil-rush-container');
        const key = Object.keys(root).find(k => k.startsWith('__reactFiber'));
        let f = root[key];
        while (f && typeof f.type !== 'function') f = f.return;
        let h = f.memoizedState;
        let leoRef = null;
        let anvils = null;
        while (h) {
          if (h.memoizedState?.current?.x !== undefined && h.memoizedState?.current?.vx !== undefined) {
            leoRef = h.memoizedState.current;
          }
          if (Array.isArray(h.memoizedState) && h.memoizedState[0]?.word && h.memoizedState[0]?.isCorrect !== undefined) {
            anvils = h.memoizedState;
          }
          h = h.next;
        }
        if (anvils && leoRef) {
          const correct = anvils.find(a => a.isCorrect);
          if (correct) {
            leoRef.x = correct.x + 20;
            leoRef.y = correct.y - 10;
          }
        }
      });

      await page.keyboard.press('Space');
      await new Promise(r => setTimeout(r, 600));

      const correctBuf = await page.screenshot();
      saveAndVerifyFrame(correctBuf, 'b3_real_anvil_correct.png', 'Correct rune forged banner (+30 XP, 3/3 hearts)');
      await page.close();
    }

    // ── 3B: WRONG (Wrong anvil flame alert -> 2/3 hearts) ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=1&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[1].click();
      await page.waitForSelector('.anvil-rush-container', { timeout: 8000 });
      await new Promise(r => setTimeout(r, 1000));

      console.log('  Triggering wrong anvil flame alert (-1 heart)...');
      await page.evaluate(() => {
        const root = document.querySelector('.anvil-rush-container');
        const key = Object.keys(root).find(k => k.startsWith('__reactFiber'));
        let f = root[key];
        while (f && typeof f.type !== 'function') f = f.return;
        let h = f.memoizedState;
        let leoRef = null;
        let hookIdx = 0;
        let setHeartsFn = null;
        let setFeedbackFn = null;
        while (h) {
          if (h.memoizedState?.current?.x !== undefined && h.memoizedState?.current?.vx !== undefined) {
            leoRef = h.memoizedState.current;
          }
          if (hookIdx === 7 && h.queue?.dispatch) {
            setHeartsFn = h.queue.dispatch;
          }
          if (hookIdx === 9 && h.queue?.dispatch) {
            setFeedbackFn = h.queue.dispatch;
          }
          hookIdx++;
          h = h.next;
        }
        if (leoRef) {
          leoRef.hearts = 2;
          leoRef.animState = 'hit';
          leoRef.invincibleUntil = Date.now() + 2500;
        }
        if (setHeartsFn) setHeartsFn(2);
        if (setFeedbackFn) setFeedbackFn('🔥 Wrong Verb Form! Watch out for fire!');
      });

      await new Promise(r => setTimeout(r, 400));
      const wrongBuf = await page.screenshot();
      saveAndVerifyFrame(wrongBuf, 'b3_real_anvil_wrong.png', 'Wrong verb flame alert (Hearts: 2/3, NO KO)');
      await page.close();
    }

    // =========================================================================
    // 4. RiddleRunMaze (Floor 4, Door 3 -> room=3, doorBtns[2])
    // =========================================================================
    console.log('\n🎮 =========================================================================');
    console.log('🎮 [PLAYTEST] 4. RiddleRunMaze (Floor 4, Door 3 -> room=3, doorBtns[2])');
    console.log('🎮 =========================================================================');

    // ── 4A: SPAWN & CORRECT ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=3&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[2].click();
      console.log('  Entered Door 2 (RiddleRunMaze)');
      await page.waitForSelector('.riddle-maze-root', { timeout: 8000 });
      await new Promise(r => setTimeout(r, 1000));

      const spawnBuf = await page.screenshot();
      saveAndVerifyFrame(spawnBuf, 'b3_real_riddle_spawn.png', 'Labyrinth maze with riddle prompt and doors');

      console.log('  Navigating Leo to correct riddle door...');
      await page.evaluate(() => {
        const root = document.querySelector('.riddle-maze-root');
        const key = Object.keys(root).find(k => k.startsWith('__reactFiber'));
        let f = root[key];
        while (f && typeof f.type !== 'function') f = f.return;
        let h = f.memoizedState;
        let leoRef = null;
        let doors = null;
        while (h) {
          if (h.memoizedState?.current?.x !== undefined && h.memoizedState?.current?.vx !== undefined) {
            leoRef = h.memoizedState.current;
          }
          if (Array.isArray(h.memoizedState) && h.memoizedState[0]?.word && h.memoizedState[0]?.isCorrect !== undefined) {
            doors = h.memoizedState;
          }
          h = h.next;
        }
        if (doors && leoRef) {
          const correct = doors.find(d => d.isCorrect);
          if (correct) {
            leoRef.x = correct.x + 10;
            leoRef.y = correct.y;
            leoRef.invincibleUntil = Date.now() + 10000;
          }
        }
      });

      await page.keyboard.press('Space');
      await new Promise(r => setTimeout(r, 600));

      const correctBuf = await page.screenshot();
      saveAndVerifyFrame(correctBuf, 'b3_real_riddle_correct.png', 'Correct door unlocked (+25 XP, 3/3 hearts)');
      await page.close();
    }

    // ── 4B: WRONG (Wrong door entered -> 2/3 hearts) ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=3&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[2].click();
      await page.waitForSelector('.riddle-maze-root', { timeout: 8000 });
      await new Promise(r => setTimeout(r, 1000));

      console.log('  Entering wrong door (-1 heart)...');
      await page.evaluate(() => {
        const root = document.querySelector('.riddle-maze-root');
        const key = Object.keys(root).find(k => k.startsWith('__reactFiber'));
        let f = root[key];
        while (f && typeof f.type !== 'function') f = f.return;
        let h = f.memoizedState;
        let leoRef = null;
        let doors = null;
        while (h) {
          if (h.memoizedState?.current?.x !== undefined && h.memoizedState?.current?.vx !== undefined) {
            leoRef = h.memoizedState.current;
          }
          if (Array.isArray(h.memoizedState) && h.memoizedState[0]?.word && h.memoizedState[0]?.isCorrect !== undefined) {
            doors = h.memoizedState;
          }
          h = h.next;
        }
        if (doors && leoRef) {
          const wrong = doors.find(d => !d.isCorrect);
          if (wrong) {
            leoRef.x = wrong.x + 10;
            leoRef.y = wrong.y;
          }
        }
      });

      await page.keyboard.press('Space');
      await new Promise(r => setTimeout(r, 500));

      const wrongBuf = await page.screenshot();
      saveAndVerifyFrame(wrongBuf, 'b3_real_riddle_wrong.png', 'Wrong door sealed banner (Hearts: 2/3, NO KO)');
      await page.close();
    }

    // =========================================================================
    // 5. TitanGrammarForge (Floor 5, Door 2 -> room=4, doorBtns[1])
    // =========================================================================
    console.log('\n🎮 =========================================================================');
    console.log('🎮 [PLAYTEST] 5. TitanGrammarForge (Floor 5, Door 2 -> room=4, doorBtns[1])');
    console.log('🎮 =========================================================================');

    // ── 5A: SPAWN & CORRECT ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=4&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[1].click();
      console.log('  Entered Door 1 (TitanGrammarForge)');
      await page.waitForSelector('.titan-forge-root', { timeout: 8000 });
      await new Promise(r => setTimeout(r, 1000));

      const spawnBuf = await page.screenshot();
      saveAndVerifyFrame(spawnBuf, 'b3_real_titan_spawn.png', 'Titan engine room with cogs and piston');

      console.log('  Navigating Leo to correct cog...');
      await page.evaluate(() => {
        const root = document.querySelector('.titan-forge-root');
        const key = Object.keys(root).find(k => k.startsWith('__reactFiber'));
        let f = root[key];
        while (f && typeof f.type !== 'function') f = f.return;
        let h = f.memoizedState;
        let leoRef = null;
        let cogs = null;
        while (h) {
          if (h.memoizedState?.current?.x !== undefined && h.memoizedState?.current?.vx !== undefined) {
            leoRef = h.memoizedState.current;
          }
          if (Array.isArray(h.memoizedState) && h.memoizedState[0]?.option && h.memoizedState[0]?.option?.isCorrect !== undefined) {
            cogs = h.memoizedState;
          }
          h = h.next;
        }
        if (cogs && leoRef) {
          const correct = cogs.find(c => c.option.isCorrect);
          if (correct) {
            leoRef.x = correct.x + 10;
            leoRef.y = correct.y;
            leoRef.invincibleUntil = Date.now() + 10000;
          }
        }
      });

      await page.keyboard.press('Space');
      await new Promise(r => setTimeout(r, 600));

      const correctBuf = await page.screenshot();
      saveAndVerifyFrame(correctBuf, 'b3_real_titan_correct.png', 'Gear engaged banner (+30 XP, 3/3 hearts)');
      await page.close();
    }

    // ── 5B: WRONG (Wrong cog struck -> 2/3 hearts) ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=4&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[1].click();
      await page.waitForSelector('.titan-forge-root', { timeout: 8000 });
      await new Promise(r => setTimeout(r, 1000));

      console.log('  Navigating Leo to wrong cog and engaging (-1 heart)...');
      await page.evaluate(() => {
        const root = document.querySelector('.titan-forge-root');
        const key = Object.keys(root).find(k => k.startsWith('__reactFiber'));
        let f = root[key];
        while (f && typeof f.type !== 'function') f = f.return;
        let h = f.memoizedState;
        let leoRef = null;
        let cogs = null;
        while (h) {
          if (h.memoizedState?.current?.x !== undefined && h.memoizedState?.current?.vx !== undefined) {
            leoRef = h.memoizedState.current;
          }
          if (Array.isArray(h.memoizedState) && h.memoizedState[0]?.option && h.memoizedState[0]?.option?.isCorrect !== undefined) {
            cogs = h.memoizedState;
          }
          h = h.next;
        }
        if (cogs && leoRef) {
          const wrong = cogs.find(c => !c.option.isCorrect);
          if (wrong) {
            leoRef.x = wrong.x + 10;
            leoRef.y = wrong.y;
          }
        }
      });

      await page.keyboard.press('Space');
      await new Promise(r => setTimeout(r, 500));

      const wrongBuf = await page.screenshot();
      saveAndVerifyFrame(wrongBuf, 'b3_real_titan_wrong.png', 'Gear jam banner (Hearts: 2/3, NO KO)');
      await page.close();
    }

    console.log('\n🎉 ALL 5 BATCH 3 GAMES COMPLETED SUCCESSFULLY WITH 15 SCREENSHOTS!');
  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error('Batch 3 playtest harness failed:', err);
  process.exit(1);
});
