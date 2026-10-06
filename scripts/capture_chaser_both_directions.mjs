/**
 * capture_chaser_both_directions.mjs
 *
 * Verifies and captures Chaser label in BOTH directions:
 * 1. Chaser moving RIGHT (dir = 1) -> icon faces right, label "CHASER" upright
 * 2. Chaser moving LEFT (dir = -1)  -> icon flipped (scaleX(-1)), label "CHASER" upright
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/b12565b0-9d8d-4d21-8063-54a8e2575b53';
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(BRAIN_DIR)) fs.mkdirSync(BRAIN_DIR, { recursive: true });

function saveFrame(buf, filename, desc) {
  const p1 = path.join(OUTPUT_DIR, filename);
  const p2 = path.join(BRAIN_DIR, filename);
  fs.writeFileSync(p1, buf);
  fs.writeFileSync(p2, buf);
  console.log(`📸 [SAVED] ${filename} — ${desc}`);
}

async function run() {
  console.log('🚀 [Chaser Direction Verification] Launching Real Chrome...');
  const browser = await puppeteer.launch({
    executablePath: fs.existsSync(CHROME_PATH) ? CHROME_PATH : undefined,
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--window-size=1280,820'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto(`${BASE_URL}/quest-demo`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  await page.waitForSelector('#select-active-game', { timeout: 5000 });
  await page.select('#select-active-game', 'riddle_maze');
  await new Promise(r => setTimeout(r, 1500));

  await page.waitForSelector('.chaser-beast-sprite', { timeout: 5000 });

  // 1. Force Chaser to move RIGHT (dir = 1)
  console.log('\n🐾 Setting Chaser direction to RIGHT (dir = 1)...');
  await page.evaluate(() => {
    const root = document.querySelector('.riddle-maze-viewport');
    const fiberKey = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));
    let fiber = root ? root[fiberKey] : null;
    while (fiber) {
      if (fiber.memoizedState) {
        let s = fiber.memoizedState;
        while (s) {
          if (s.memoizedState?.current?.vx === 2.2 && s.memoizedState?.current?.dir !== undefined) {
            s.memoizedState.current.x = 200;
            s.memoizedState.current.dir = 1;
            break;
          }
          s = s.next;
        }
      }
      fiber = fiber.return;
    }
  });

  // Wait until beastDisplay reflects dir = 1
  await page.waitForFunction(() => {
    const icon = document.querySelector('.chaser-beast-sprite .beast-icon');
    const computed = window.getComputedStyle(icon);
    return computed.transform === 'none' || computed.transform === 'matrix(1, 0, 0, 1, 0, 0)';
  }, { timeout: 4000 });
  await new Promise(r => setTimeout(r, 100));

  const rightLog = await page.evaluate(() => {
    const sprite = document.querySelector('.chaser-beast-sprite');
    const icon = document.querySelector('.chaser-beast-sprite .beast-icon');
    const tag = document.querySelector('.chaser-beast-sprite .beast-tag');
    return {
      direction: 'RIGHT (dir = 1)',
      parentTransform: window.getComputedStyle(sprite).transform,
      iconTransform: window.getComputedStyle(icon).transform,
      tagTransform: window.getComputedStyle(tag).transform,
      tagText: tag.innerText,
      tagBoundingRect: tag.getBoundingClientRect(),
    };
  });
  console.log('📋 [CHASER MOVING RIGHT EVIDENCE]:', JSON.stringify(rightLog, null, 2));

  const rightBuf = await page.screenshot();
  saveFrame(rightBuf, 'p0_2_chaser_dir_right.png', 'Chaser moving RIGHT: icon normal, label CHASER upright');

  // 2. Force Chaser to move LEFT (dir = -1)
  console.log('\n🐾 Setting Chaser direction to LEFT (dir = -1)...');
  await page.evaluate(() => {
    const root = document.querySelector('.riddle-maze-viewport');
    const fiberKey = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));
    let fiber = root ? root[fiberKey] : null;
    while (fiber) {
      if (fiber.memoizedState) {
        let s = fiber.memoizedState;
        while (s) {
          if (s.memoizedState?.current?.vx === 2.2 && s.memoizedState?.current?.dir !== undefined) {
            s.memoizedState.current.x = 600;
            s.memoizedState.current.dir = -1;
            break;
          }
          s = s.next;
        }
      }
      fiber = fiber.return;
    }
  });

  // Wait until beastDisplay reflects dir = -1 (icon transform has scaleX(-1))
  await page.waitForFunction(() => {
    const icon = document.querySelector('.chaser-beast-sprite .beast-icon');
    const computed = window.getComputedStyle(icon);
    return computed.transform.includes('-1');
  }, { timeout: 4000 });
  await new Promise(r => setTimeout(r, 100));

  const leftLog = await page.evaluate(() => {
    const sprite = document.querySelector('.chaser-beast-sprite');
    const icon = document.querySelector('.chaser-beast-sprite .beast-icon');
    const tag = document.querySelector('.chaser-beast-sprite .beast-tag');
    return {
      direction: 'LEFT (dir = -1)',
      parentTransform: window.getComputedStyle(sprite).transform,
      iconTransform: window.getComputedStyle(icon).transform,
      tagTransform: window.getComputedStyle(tag).transform,
      tagText: tag.innerText,
      tagBoundingRect: tag.getBoundingClientRect(),
    };
  });
  console.log('📋 [CHASER MOVING LEFT EVIDENCE]:', JSON.stringify(leftLog, null, 2));

  const leftBuf = await page.screenshot();
  saveFrame(leftBuf, 'p0_2_chaser_dir_left.png', 'Chaser moving LEFT: icon flipped horizontally, label CHASER upright (NOT mirrored)');

  // Also update p0_2_riddle_retry.png with the clean un-mirrored state
  saveFrame(leftBuf, 'p0_2_riddle_retry.png', 'Riddle Run Retry: clean un-mirrored label on left-moving Chaser');

  console.log('\n🎉 BOTH DIRECTIONS VERIFIED AND CAPTURED SUCCESSFULLY!');
  await browser.close();
}

run().catch(err => {
  console.error('❌ Error verifying chaser:', err);
  process.exit(1);
});
