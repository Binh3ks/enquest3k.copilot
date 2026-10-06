import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf';
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

function saveFrame(buf, filename, desc) {
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), buf);
  fs.writeFileSync(path.join(BRAIN_DIR, filename), buf);
  console.log(`📸 [SAVED] ${filename} — ${desc}`);
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

  await page.goto(`${BASE_URL}/week/33/chronicles?room=6&bypass=true`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  const doorBtns = await page.$$('.dr-door-enter-btn');
  if (doorBtns.length > 0) {
    await doorBtns[0].click();
    console.log('Entered Door 0 (Word Forge Scramble)');
  }
  await new Promise(r => setTimeout(r, 1500));

  // Spawn frame
  const spawnBuf = await page.screenshot();
  saveFrame(spawnBuf, 'b5_real_forge_spawn.png', 'Spawn frame (Anvil Deck, Target Word banner, Rune stones, Leo at base, 3 Hearts)');

  // Extract Word Forge state via page evaluation
  const state = await page.evaluate(() => {
    const root = document.querySelector('.forge-arena-viewport');
    const fiberKey = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));
    let fiber = root ? root[fiberKey] : null;
    let found = {};
    while (fiber) {
      if (fiber.memoizedState) {
        let s = fiber.memoizedState;
        while (s) {
          if (s.memoizedState?.current) {
            const c = s.memoizedState.current;
            if (Array.isArray(c) && c[0]?.char) found.runes = c;
            if (c.vx !== undefined && c.isGrounded !== undefined) found.leo = c;
            if (c.char && c.targetRoundId) found.carrying = c;
          }
          s = s.next;
        }
      }
      fiber = fiber.return;
    }
    const targetWord = document.querySelector('.forge-target-word')?.innerText;
    return { targetWord, runes: found.runes, leo: found.leo };
  });
  console.log('Word Forge State:', state);

  // Helper to pick up a rune and teleport to anvil deck
  // 1. Test CORRECT forge: Find rune for 1st letter of targetWord
  const firstLetter = state.targetWord?.[0];
  console.log(`Target Word is "${state.targetWord}". First required letter is "${firstLetter}".`);

  // Move Leo to pick up first letter rune, then deposit on anvil
  await page.evaluate((letter) => {
    const root = document.querySelector('.forge-arena-viewport');
    const fiberKey = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));
    let fiber = root ? root[fiberKey] : null;
    let runesRef = null, leoRef = null, carryingRuneRef = null;
    while (fiber) {
      if (fiber.memoizedState) {
        let s = fiber.memoizedState;
        while (s) {
          if (s.memoizedState?.current) {
            const c = s.memoizedState.current;
            if (Array.isArray(c) && c[0]?.char) runesRef = s.memoizedState;
            if (c.vx !== undefined && c.isGrounded !== undefined) leoRef = s.memoizedState;
            if (s.memoizedState.current === null && s.next?.memoizedState?.current) {
              // check carrying
            }
          }
          s = s.next;
        }
      }
      fiber = fiber.return;
    }
    if (runesRef && leoRef) {
      const targetRune = runesRef.current.find(r => r.char === letter && !r.isPlaced);
      if (targetRune) {
        // Teleport Leo near rune
        leoRef.current.x = targetRune.x;
        leoRef.current.y = targetRune.y;
      }
    }
  }, firstLetter);

  // Press E to pick up
  await page.keyboard.press('KeyE');
  await new Promise(r => setTimeout(r, 200));

  // Teleport Leo onto Anvil Deck (x: 430, y: 220)
  await page.evaluate(() => {
    const root = document.querySelector('.forge-arena-viewport');
    const fiberKey = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));
    let fiber = root ? root[fiberKey] : null;
    while (fiber) {
      if (fiber.memoizedState) {
        let s = fiber.memoizedState;
        while (s) {
          if (s.memoizedState?.current?.vx !== undefined) {
            s.memoizedState.current.x = 430;
            s.memoizedState.current.y = 220;
            s.memoizedState.current.vy = 0;
            s.memoizedState.current.isGrounded = true;
            break;
          }
          s = s.next;
        }
      }
      fiber = fiber.return;
    }
  });

  // Press E to forge onto anvil
  console.log('Pressing E to forge letter onto anvil...');
  await page.keyboard.press('KeyE');
  await new Promise(r => setTimeout(r, 200));

  const correctBuf = await page.screenshot();
  saveFrame(correctBuf, 'b5_real_forge_correct.png', `Letter "${firstLetter}" forged into Anvil Deck (✨ RUNE FORGED! +25 XP)`);

  await new Promise(r => setTimeout(r, 1200));

  // 2. Test WRONG forge: Pick up a distractor rune and try to forge
  const distractorLetter = state.runes?.find(r => !state.targetWord.includes(r.char))?.char || 'Z';
  console.log(`Picking up distractor rune "${distractorLetter}"...`);
  await page.evaluate((letter) => {
    const root = document.querySelector('.forge-arena-viewport');
    const fiberKey = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));
    let fiber = root ? root[fiberKey] : null;
    let runesRef = null, leoRef = null;
    while (fiber) {
      if (fiber.memoizedState) {
        let s = fiber.memoizedState;
        while (s) {
          if (s.memoizedState?.current) {
            const c = s.memoizedState.current;
            if (Array.isArray(c) && c[0]?.char) runesRef = s.memoizedState;
            if (c.vx !== undefined && c.isGrounded !== undefined) leoRef = s.memoizedState;
          }
          s = s.next;
        }
      }
      fiber = fiber.return;
    }
    if (runesRef && leoRef) {
      const dRune = runesRef.current.find(r => r.char === letter && !r.isPlaced);
      if (dRune) {
        leoRef.current.x = dRune.x;
        leoRef.current.y = dRune.y;
      }
    }
  }, distractorLetter);

  // Press E to pick up distractor
  await page.keyboard.press('KeyE');
  await new Promise(r => setTimeout(r, 200));

  // Teleport back to Anvil Deck
  await page.evaluate(() => {
    const root = document.querySelector('.forge-arena-viewport');
    const fiberKey = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));
    let fiber = root ? root[fiberKey] : null;
    while (fiber) {
      if (fiber.memoizedState) {
        let s = fiber.memoizedState;
        while (s) {
          if (s.memoizedState?.current?.vx !== undefined) {
            s.memoizedState.current.x = 430;
            s.memoizedState.current.y = 220;
            break;
          }
          s = s.next;
        }
      }
      fiber = fiber.return;
    }
  });

  // Press E to attempt forge (should trigger rejection & heart deduction)
  console.log('Pressing E with distractor rune on anvil...');
  await page.keyboard.press('KeyE');
  await new Promise(r => setTimeout(r, 200));

  const wrongBuf = await page.screenshot();
  saveFrame(wrongBuf, 'b5_real_forge_wrong.png', `Distractor rejected (-1 Heart ❤️❤️🖤, ⚡ FORGE REJECTED!)`);

  await new Promise(r => setTimeout(r, 1500));
  await browser.close();
}

run().catch(console.error);
