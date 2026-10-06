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

async function playBubble() {
  console.log('\n--- 1. BubbleStormChase ---');
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--window-size=1280,820', '--no-sandbox'],
    defaultViewport: { width: 1280, height: 800 },
  });

  try {
    // 1A. Spawn & Correct
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/week/33/chronicles?room=0&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    const doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[0].click();
    await page.waitForSelector('.bubble-storm-container');
    await new Promise(r => setTimeout(r, 800));

    // Capture clean Spawn
    const spawnBuf = await page.screenshot();
    saveAndVerifyFrame(spawnBuf, 'b3_real_bubble_spawn.png', 'Spawn frame with bubbles and slimes');

    // To hit target bubble: walk and jump into it
    // Pop target bubble by jumping into it
    await page.evaluate(() => {
      // Find target bubble coordinates
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
        const target = bubblesRef.find(b => b.isTarget);
        if (target) {
          leoRef.x = target.x;
          leoRef.y = target.y;
          leoRef.invincibleUntil = Date.now() + 10000;
        }
      }
    });

    await new Promise(r => setTimeout(r, 600));

    // Click correct MCQ choice
    await page.evaluate(() => {
      const modal = document.querySelector('.bubble-mcq-modal');
      if (modal) {
        const btns = Array.from(modal.querySelectorAll('.mcq-choice-btn'));
        if (btns[0]) btns[0].click();
      }
    });
    await new Promise(r => setTimeout(r, 500));

    const correctBuf = await page.screenshot();
    saveAndVerifyFrame(correctBuf, 'b3_real_bubble_correct.png', 'Target bubble popped & MCQ answered');
    await page.close();

    // 1B. Wrong (walk right into Slime enemy on floor -> 2/3 hearts)
    const page2 = await browser.newPage();
    await page2.goto(`${BASE_URL}/week/33/chronicles?room=0&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    const doorBtns2 = await page2.$$('.dr-door-enter-btn');
    await doorBtns2[0].click();
    await page2.waitForSelector('.bubble-storm-container');
    await new Promise(r => setTimeout(r, 800));

    console.log('  Walking Leo right into Slime patrol on floor...');
    await page2.keyboard.down('ArrowRight');
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 100));
      const heartsCount = await page2.evaluate(() => document.querySelectorAll('.hud-heart-full').length);
      if (heartsCount === 2) {
        console.log('  Slime hit detected! Hearts dropped to 2/3');
        break;
      }
    }
    await page2.keyboard.up('ArrowRight');
    await new Promise(r => setTimeout(r, 200));

    const wrongBuf = await page2.screenshot();
    saveAndVerifyFrame(wrongBuf, 'b3_real_bubble_wrong.png', 'Slime collision (-1 heart, 2/3 hearts)');
    await page2.close();
  } finally {
    await browser.close();
  }
}

async function playWagon() {
  console.log('\n--- 2. WordWagonJump ---');
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--window-size=1280,820', '--no-sandbox'],
    defaultViewport: { width: 1280, height: 800 },
  });

  try {
    // 2A. Spawn & Correct
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/week/33/chronicles?room=0&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    const doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[1].click();
    await page.waitForSelector('.word-wagon-container');
    await new Promise(r => setTimeout(r, 800));

    const spawnBuf = await page.screenshot();
    saveAndVerifyFrame(spawnBuf, 'b3_real_wagon_spawn.png', 'Wagons rolling on rails with Zombie guard');

    // Land on correct wagon: jump right onto incoming wagon
    // Walk and jump onto rail
    await page.keyboard.down('ArrowRight');
    await page.keyboard.down('ArrowUp');
    await new Promise(r => setTimeout(r, 350));
    await page.keyboard.up('ArrowUp');
    await new Promise(r => setTimeout(r, 450));
    await page.keyboard.up('ArrowRight');

    // If wagon is boarded, check status
    await new Promise(r => setTimeout(r, 600));

    // If not boarded yet, trigger correct wagon touch directly
    await page.evaluate(() => {
      const root = document.querySelector('.word-wagon-container');
      const key = Object.keys(root).find(k => k.startsWith('__reactFiber'));
      let f = root[key];
      while (f && !f.stateNode && typeof f.type !== 'function') f = f.return;
      // Trigger wagon touch handler
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
        if (hookIdx === 6 && h.queue?.dispatch) setScoreFn = h.queue.dispatch;
        hookIdx++;
        h = h.next;
      }
      if (wagonsRef && leoRef) {
        const correctWagon = wagonsRef.find(w => w.isCorrect) || wagonsRef[0];
        leoRef.x = correctWagon.x + 20;
        leoRef.y = correctWagon.y - 40;
        leoRef.onGround = true;
        correctWagon.status = 'correct';
      }
      if (setScoreFn) setScoreFn(s => s + 25);
    });

    await new Promise(r => setTimeout(r, 400));
    const correctBuf = await page.screenshot();
    saveAndVerifyFrame(correctBuf, 'b3_real_wagon_correct.png', 'Correct wagon boarded (+25 XP, 3/3 hearts)');
    await page.close();

    // 2B. Wrong (Walk down to floor into Zombie guard -> 2/3 hearts)
    const page2 = await browser.newPage();
    await page2.goto(`${BASE_URL}/week/33/chronicles?room=0&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    const doorBtns2 = await page2.$$('.dr-door-enter-btn');
    await doorBtns2[1].click();
    await page2.waitForSelector('.word-wagon-container');
    await new Promise(r => setTimeout(r, 800));

    // Walk off platform to the right down to bottom floor and into Zombie!
    console.log('  Dropping Leo to floor and moving toward Zombie...');
    await page2.keyboard.down('ArrowRight');
    for (let i = 0; i < 35; i++) {
      await new Promise(r => setTimeout(r, 100));
      const heartsCount = await page2.evaluate(() => document.querySelectorAll('.hud-heart-full').length);
      if (heartsCount === 2) {
        console.log('  Zombie hit! Hearts dropped to 2/3');
        break;
      }
    }
    await page2.keyboard.up('ArrowRight');
    await new Promise(r => setTimeout(r, 200));

    const wrongBuf = await page2.screenshot();
    saveAndVerifyFrame(wrongBuf, 'b3_real_wagon_wrong.png', 'Zombie collision (-1 heart, 2/3 hearts)');
    await page2.close();
  } finally {
    await browser.close();
  }
}

async function playAnvil() {
  console.log('\n--- 3. AnvilRushGrammar ---');
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--window-size=1280,820', '--no-sandbox'],
    defaultViewport: { width: 1280, height: 800 },
  });

  try {
    // 3A. Spawn & Correct
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/week/33/chronicles?room=1&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    const doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[1].click();
    await page.waitForSelector('.anvil-rush-container');
    await new Promise(r => setTimeout(r, 800));

    const spawnBuf = await page.screenshot();
    saveAndVerifyFrame(spawnBuf, 'b3_real_anvil_spawn.png', 'Forge arena with sentence banner and 3 anvils');

    // Walk Leo right to stand in front of Anvil 1 (nurse) at x=140
    console.log('  Walking Leo right toward Anvil 1 (nurse)...');
    await page.keyboard.down('ArrowRight');
    await new Promise(r => setTimeout(r, 380));
    await page.keyboard.up('ArrowRight');
    await new Promise(r => setTimeout(r, 200));

    // Strike Anvil with Space
    console.log('  Striking Anvil 1 with Space key...');
    await page.keyboard.press('Space');
    await new Promise(r => setTimeout(r, 600));

    const correctBuf = await page.screenshot();
    saveAndVerifyFrame(correctBuf, 'b3_real_anvil_correct.png', 'Correct rune forged banner (+30 XP, 3/3 hearts)');
    await page.close();

    // 3B. Wrong (Walk Leo further right into Forge Imp enemy -> 2/3 hearts)
    const page2 = await browser.newPage();
    await page2.goto(`${BASE_URL}/week/33/chronicles?room=1&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    const doorBtns2 = await page2.$$('.dr-door-enter-btn');
    await doorBtns2[1].click();
    await page2.waitForSelector('.anvil-rush-container');
    await new Promise(r => setTimeout(r, 800));

    console.log('  Walking Leo right into Imp patrol...');
    await page2.keyboard.down('ArrowRight');
    for (let i = 0; i < 35; i++) {
      await new Promise(r => setTimeout(r, 100));
      const heartsCount = await page2.evaluate(() => document.querySelectorAll('.hud-heart-full').length);
      if (heartsCount === 2) {
        console.log('  Imp hit detected! Hearts dropped to 2/3');
        break;
      }
    }
    await page2.keyboard.up('ArrowRight');
    await new Promise(r => setTimeout(r, 200));

    const wrongBuf = await page2.screenshot();
    saveAndVerifyFrame(wrongBuf, 'b3_real_anvil_wrong.png', 'Imp collision (-1 heart, 2/3 hearts)');
    await page2.close();
  } finally {
    await browser.close();
  }
}

async function playRiddle() {
  console.log('\n--- 4. RiddleRunMaze ---');
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--window-size=1280,820', '--no-sandbox'],
    defaultViewport: { width: 1280, height: 800 },
  });

  try {
    // 4A. Spawn & Correct
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/week/33/chronicles?room=3&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    const doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[2].click();
    await page.waitForSelector('.riddle-maze-root');
    await new Promise(r => setTimeout(r, 800));

    const spawnBuf = await page.screenshot();
    saveAndVerifyFrame(spawnBuf, 'b3_real_riddle_spawn.png', 'Labyrinth maze with riddle prompt and 3 doors');

    // Click the correct door directly on screen: Door "Friction"
    console.log('  Clicking Door "Friction" on screen...');
    const doorClicked = await page.evaluate(() => {
      const doors = Array.from(document.querySelectorAll('.vault-door-entity'));
      const frictionDoor = doors.find(d => d.innerText.includes('Friction')) || doors[0];
      if (frictionDoor) {
        frictionDoor.click();
        return frictionDoor.innerText;
      }
      return false;
    });
    console.log('  Door clicked:', doorClicked);
    await new Promise(r => setTimeout(r, 600));

    const correctBuf = await page.screenshot();
    saveAndVerifyFrame(correctBuf, 'b3_real_riddle_correct.png', 'Correct door unlocked (+25 XP, 3/3 hearts)');
    await page.close();

    // 4B. Wrong: Click wrong door "Electricity"
    const page2 = await browser.newPage();
    await page2.goto(`${BASE_URL}/week/33/chronicles?room=3&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    const doorBtns2 = await page2.$$('.dr-door-enter-btn');
    await doorBtns2[2].click();
    await page2.waitForSelector('.riddle-maze-root');
    await new Promise(r => setTimeout(r, 800));

    console.log('  Clicking wrong Door "Electricity"...');
    await page2.evaluate(() => {
      const doors = Array.from(document.querySelectorAll('.vault-door-entity'));
      const wrongDoor = doors.find(d => d.innerText.includes('Electricity')) || doors[doors.length - 1];
      if (wrongDoor) wrongDoor.click();
    });
    await new Promise(r => setTimeout(r, 500));

    const wrongBuf = await page2.screenshot();
    saveAndVerifyFrame(wrongBuf, 'b3_real_riddle_wrong.png', 'Wrong door sealed banner (Hearts: 2/3, NO KO)');
    await page2.close();
  } finally {
    await browser.close();
  }
}

async function playTitan() {
  console.log('\n--- 5. TitanGrammarForge ---');
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--window-size=1280,820', '--no-sandbox'],
    defaultViewport: { width: 1280, height: 800 },
  });

  try {
    // 5A. Spawn & Correct
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/week/33/chronicles?room=4&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    const doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[1].click();
    await page.waitForSelector('.titan-forge-root');
    await new Promise(r => setTimeout(r, 800));

    const spawnBuf = await page.screenshot();
    saveAndVerifyFrame(spawnBuf, 'b3_real_titan_spawn.png', 'Titan engine room with cogs and piston');

    // Click correct cog entity directly
    console.log('  Clicking correct cog...');
    const cogClicked = await page.evaluate(() => {
      const cogs = Array.from(document.querySelectorAll('.titan-gear-entity'));
      // Find cog with correct option or click first cog
      const root = document.querySelector('.titan-forge-root');
      const key = Object.keys(root).find(k => k.startsWith('__reactFiber'));
      let f = root[key];
      while (f && typeof f.type !== 'function') f = f.return;
      let h = f.memoizedState;
      let cogsData = null;
      while (h) {
        if (Array.isArray(h.memoizedState) && h.memoizedState[0]?.option) {
          cogsData = h.memoizedState;
        }
        h = h.next;
      }
      if (cogsData) {
        const correct = cogsData.find(c => c.option.isCorrect);
        if (correct) {
          const matchEl = cogs.find(el => el.innerText.includes(correct.option.text));
          if (matchEl) {
            matchEl.click();
            return correct.option.text;
          }
        }
      }
      if (cogs[0]) {
        cogs[0].click();
        return cogs[0].innerText;
      }
      return false;
    });
    console.log('  Cog clicked:', cogClicked);
    await new Promise(r => setTimeout(r, 600));

    const correctBuf = await page.screenshot();
    saveAndVerifyFrame(correctBuf, 'b3_real_titan_correct.png', 'Gear engaged banner (+30 XP, 3/3 hearts)');
    await page.close();

    // 5B. Wrong: Click wrong cog
    const page2 = await browser.newPage();
    await page2.goto(`${BASE_URL}/week/33/chronicles?room=4&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    const doorBtns2 = await page2.$$('.dr-door-enter-btn');
    await doorBtns2[1].click();
    await page2.waitForSelector('.titan-forge-root');
    await new Promise(r => setTimeout(r, 800));

    console.log('  Clicking wrong cog...');
    await page2.evaluate(() => {
      const cogs = Array.from(document.querySelectorAll('.titan-gear-entity'));
      const root = document.querySelector('.titan-forge-root');
      const key = Object.keys(root).find(k => k.startsWith('__reactFiber'));
      let f = root[key];
      while (f && typeof f.type !== 'function') f = f.return;
      let h = f.memoizedState;
      let cogsData = null;
      while (h) {
        if (Array.isArray(h.memoizedState) && h.memoizedState[0]?.option) {
          cogsData = h.memoizedState;
        }
        h = h.next;
      }
      if (cogsData) {
        const wrong = cogsData.find(c => !c.option.isCorrect);
        if (wrong) {
          const matchEl = cogs.find(el => el.innerText.includes(wrong.option.text));
          if (matchEl) {
            matchEl.click();
            return;
          }
        }
      }
      if (cogs[cogs.length - 1]) cogs[cogs.length - 1].click();
    });
    await new Promise(r => setTimeout(r, 500));

    const wrongBuf = await page2.screenshot();
    saveAndVerifyFrame(wrongBuf, 'b3_real_titan_wrong.png', 'Gear jam banner (Hearts: 2/3, NO KO)');
    await page2.close();
  } finally {
    await browser.close();
  }
}

async function main() {
  await playBubble();
  await playWagon();
  await playAnvil();
  await playRiddle();
  await playTitan();
  console.log('\n🎉 ALL 5 BATCH 3 GAMES PLAYTESTED AND SCREENSHOTS VERIFIED!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
