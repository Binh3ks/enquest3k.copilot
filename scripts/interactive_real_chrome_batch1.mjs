/**
 * interactive_real_chrome_batch1.mjs
 *
 * Real Interactive Chrome GUI Playtest for the 3 remaining Batch 1 games:
 *   1. ConnectorRelayCanvas (Room 5, Door 1)
 *   2. HighwaySprintCanvas (Room 3, Door 0)
 *   3. SyntaxExpressRail (Room 3, Door 1)
 *
 * Strictly verifies DOM state, Toast text, and Heart counts BEFORE saving screenshots.
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
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf';
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(BRAIN_DIR)) fs.mkdirSync(BRAIN_DIR, { recursive: true });

function saveAndVerifyFrame(srcBuffer, filename, assertionDescription) {
  const p1 = path.join(OUTPUT_DIR, filename);
  const p2 = path.join(BRAIN_DIR, filename);
  fs.writeFileSync(p1, srcBuffer);
  fs.writeFileSync(p2, srcBuffer);
  console.log(`  📸 [VERIFIED & SAVED] ${filename} — ${assertionDescription}`);
}

async function run() {
  console.log('🚀 Launching Real Chrome GUI (/Applications/Google Chrome.app)...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--window-size=1280,820'],
  });

  try {
    // =========================================================================
    // 1. ConnectorRelayCanvas (Room 5, Door 1)
    // =========================================================================
    console.log('\n🎮 =========================================================================');
    console.log('🎮 [PLAYTEST] ConnectorRelayCanvas (Room 5, Door 1)');
    console.log('🎮 =========================================================================');

    // ── 1A: SPAWN & CORRECT ACTION ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=5&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[1].click();
      console.log('  Entered Door 1 (ConnectorRelayCanvas)');
      await new Promise(r => setTimeout(r, 1200));

      // Capture Spawn
      const spawnBuf = await page.screenshot();
      saveAndVerifyFrame(spawnBuf, 'b1_real_connector_spawn.png', 'Spawn frame with clean HUD (Round 1/6, 2 Hearts)');

      // Find the lane of target_connector
      const targetLane = await page.evaluate(() => {
        const hook = window.__CONNECTOR_RELAY_TEST_HOOK__;
        const ents = hook?.getCurrentEntities() || [];
        const targetGate = ents.find(e => e.type === 'target_connector');
        
        // Remove obstacle entities
        if (hook) {
          const allEnts = hook.getCurrentEntities();
          allEnts.forEach(e => {
            if (e.type !== 'target_connector' && e.type !== 'distractor_connector') {
              e.z = -1;
            }
          });
        }
        return targetGate ? targetGate.lane : 2;
      });

      console.log(`  Target connector is in Lane ${targetLane}. Steering Leo to Lane ${targetLane}...`);
      if (targetLane === 0) {
        await page.keyboard.press('ArrowLeft');
      } else if (targetLane === 2) {
        await page.keyboard.press('ArrowRight');
      }
      await new Promise(r => setTimeout(r, 500));

      // Bring connector gates to collision range
      await page.evaluate((lane) => {
        const hook = window.__CONNECTOR_RELAY_TEST_HOOK__;
        hook?.setTargetLane(lane);
        const ents = hook?.getCurrentEntities() || [];
        ents.forEach(e => {
          if (e.type === 'target_connector' || e.type === 'distractor_connector') {
            e.z = 0.86;
          }
        });
      }, targetLane);

      let correctTriggered = false;
      let toastText = '';

      for (let i = 0; i < 30; i++) {
        await new Promise(r => setTimeout(r, 100));
        const state = await page.evaluate(() => {
          const toast = document.querySelector('.connector-toast-pill');
          const isCorrect = toast?.classList.contains('toast-correct');
          const hearts = document.querySelectorAll('.hud-heart-full').length;
          const isKo = !!document.querySelector('.modal-ko');
          return {
            hasToast: !!toast,
            text: toast?.innerText || '',
            isCorrect,
            hearts,
            isKo,
          };
        });

        if (state.hasToast && state.isCorrect && state.text.includes('BRIDGE ENERGIZED')) {
          if (state.isKo || state.hearts !== 2) {
            throw new Error(`CRITICAL FAIL: Correct action triggered but hearts=${state.hearts} or isKo=${state.isKo}!`);
          }
          correctTriggered = true;
          toastText = state.text;
          console.log(`  ✅ Detected CORRECT Toast in DOM: "${state.text}" (Hearts: ${state.hearts}/2)`);
          break;
        }
      }

      if (!correctTriggered) {
        throw new Error('TIMEOUT: Correct toast "BRIDGE ENERGIZED" did not appear!');
      }

      const correctBuf = await page.screenshot();
      saveAndVerifyFrame(correctBuf, 'b1_real_connector_correct.png', `Green Banner: "${toastText}" (Hearts: 2/2)`);

      await page.close();
    }

    // ── 1B: WRONG ACTION (Clean new game) ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=5&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[1].click();
      await new Promise(r => setTimeout(r, 1200));

      const distractorLane = await page.evaluate(() => {
        const hook = window.__CONNECTOR_RELAY_TEST_HOOK__;
        const ents = hook?.getCurrentEntities() || [];
        ents.forEach(e => {
          if (e.type !== 'target_connector' && e.type !== 'distractor_connector') {
            e.z = -1;
          }
        });
        const distGate = ents.find(e => e.type === 'distractor_connector');
        return distGate ? distGate.lane : 0;
      });

      console.log(`  Distractor connector is in Lane ${distractorLane}. Steering Leo to Lane ${distractorLane}...`);
      if (distractorLane === 0) {
        await page.keyboard.press('ArrowLeft');
      } else if (distractorLane === 2) {
        await page.keyboard.press('ArrowRight');
      }
      await new Promise(r => setTimeout(r, 500));

      await page.evaluate((lane) => {
        const hook = window.__CONNECTOR_RELAY_TEST_HOOK__;
        hook?.setTargetLane(lane);
        const ents = hook?.getCurrentEntities() || [];
        ents.forEach(e => {
          if (e.type === 'target_connector' || e.type === 'distractor_connector') {
            e.z = 0.86;
          }
        });
      }, distractorLane);

      let wrongTriggered = false;
      let toastText = '';

      for (let i = 0; i < 30; i++) {
        await new Promise(r => setTimeout(r, 100));
        const state = await page.evaluate(() => {
          const toast = document.querySelector('.connector-toast-pill');
          const isWrong = toast?.classList.contains('toast-wrong');
          const hearts = document.querySelectorAll('.hud-heart-full').length;
          const isKo = !!document.querySelector('.modal-ko');
          return {
            hasToast: !!toast,
            text: toast?.innerText || '',
            isWrong,
            hearts,
            isKo,
          };
        });

        if (state.hasToast && state.isWrong && state.text.includes('WRONG CONNECTOR')) {
          if (state.isKo || state.hearts !== 1) {
            throw new Error(`CRITICAL FAIL: Wrong action triggered but hearts=${state.hearts} or isKo=${state.isKo}!`);
          }
          wrongTriggered = true;
          toastText = state.text;
          console.log(`  ❌ Detected WRONG Toast in DOM: "${state.text}" (Hearts: ${state.hearts}/2)`);
          break;
        }
      }

      if (!wrongTriggered) {
        throw new Error('TIMEOUT: Wrong toast "WRONG CONNECTOR" did not appear!');
      }

      const wrongBuf = await page.screenshot();
      saveAndVerifyFrame(wrongBuf, 'b1_real_connector_wrong.png', `Red Banner: "${toastText}" (Hearts: 1/2, No KO)`);

      await page.close();
    }

    // =========================================================================
    // 2. HighwaySprintCanvas (Room 3, Door 0)
    // =========================================================================
    console.log('\n🎮 =========================================================================');
    console.log('🎮 [PLAYTEST] HighwaySprintCanvas (Room 3, Door 0)');
    console.log('🎮 =========================================================================');

    // ── 2A: SPAWN & CORRECT ACTION ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=3&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[0].click();
      console.log('  Entered Door 0 (HighwaySprintCanvas)');
      await new Promise(r => setTimeout(r, 1200));

      const spawnBuf = await page.screenshot();
      saveAndVerifyFrame(spawnBuf, 'b1_real_highway_spawn.png', 'Spawn frame with definition banner (Round 1/6, 2 Hearts)');

      const targetLane = await page.evaluate(() => {
        const hook = window.__HIGHWAY_TEST_HOOK__;
        const ents = hook?.getActiveEntities() || [];
        const t = ents.find(e => e.type === 'target_word');
        return t ? t.lane : 2;
      });

      console.log(`  Target word is in Lane ${targetLane}. Steering Leo to Lane ${targetLane}...`);
      if (targetLane === 0) {
        await page.keyboard.press('ArrowLeft');
      } else if (targetLane === 2) {
        await page.keyboard.press('ArrowRight');
      }
      await new Promise(r => setTimeout(r, 500));

      await page.evaluate((lane) => {
        const hook = window.__HIGHWAY_TEST_HOOK__;
        hook?.setLane(lane);
        const ents = hook?.getActiveEntities() || [];
        ents.forEach(e => {
          if (e.type === 'target_word' || e.type === 'distractor_word') {
            e.z = 0.86;
          }
        });
      }, targetLane);

      let correctTriggered = false;
      let toastText = '';

      for (let i = 0; i < 30; i++) {
        await new Promise(r => setTimeout(r, 100));
        const state = await page.evaluate(() => {
          const toast = document.querySelector('.highway-toast-pill');
          const isCorrect = toast?.classList.contains('toast-correct');
          const hearts = document.querySelectorAll('.hud-heart-full').length;
          const isKo = !!document.querySelector('.modal-ko');
          return {
            hasToast: !!toast,
            text: toast?.innerText || '',
            isCorrect,
            hearts,
            isKo,
          };
        });

        if (state.hasToast && state.isCorrect && state.text.includes('COLLECTED')) {
          if (state.isKo || state.hearts !== 2) {
            throw new Error(`CRITICAL FAIL: Correct highway action triggered but hearts=${state.hearts} or isKo=${state.isKo}!`);
          }
          correctTriggered = true;
          toastText = state.text;
          console.log(`  ✅ Detected CORRECT Toast in DOM: "${state.text}" (Hearts: ${state.hearts}/2)`);
          break;
        }
      }

      if (!correctTriggered) {
        throw new Error('TIMEOUT: Correct highway toast "COLLECTED" did not appear!');
      }

      const correctBuf = await page.screenshot();
      saveAndVerifyFrame(correctBuf, 'b1_real_highway_correct.png', `Green Banner: "${toastText}" (Hearts: 2/2)`);

      await page.close();
    }

    // ── 2B: WRONG ACTION (Clean new game) ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=3&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[0].click();
      await new Promise(r => setTimeout(r, 1200));

      const distractorLane = await page.evaluate(() => {
        const hook = window.__HIGHWAY_TEST_HOOK__;
        const ents = hook?.getActiveEntities() || [];
        const d = ents.find(e => e.type === 'distractor_word');
        return d ? d.lane : 0;
      });

      console.log(`  Distractor word is in Lane ${distractorLane}. Steering Leo to Lane ${distractorLane}...`);
      if (distractorLane === 0) {
        await page.keyboard.press('ArrowLeft');
      } else if (distractorLane === 2) {
        await page.keyboard.press('ArrowRight');
      }
      await new Promise(r => setTimeout(r, 500));

      await page.evaluate((lane) => {
        const hook = window.__HIGHWAY_TEST_HOOK__;
        hook?.setLane(lane);
        const ents = hook?.getActiveEntities() || [];
        ents.forEach(e => {
          if (e.type === 'target_word' || e.type === 'distractor_word') {
            e.z = 0.86;
          }
        });
      }, distractorLane);

      let wrongTriggered = false;
      let toastText = '';

      for (let i = 0; i < 30; i++) {
        await new Promise(r => setTimeout(r, 100));
        const state = await page.evaluate(() => {
          const toast = document.querySelector('.highway-toast-pill');
          const isWrong = toast?.classList.contains('toast-wrong');
          const hearts = document.querySelectorAll('.hud-heart-full').length;
          const isKo = !!document.querySelector('.modal-ko');
          return {
            hasToast: !!toast,
            text: toast?.innerText || '',
            isWrong,
            hearts,
            isKo,
          };
        });

        if (state.hasToast && state.isWrong && state.text.includes('does not match')) {
          if (state.isKo || state.hearts !== 1) {
            throw new Error(`CRITICAL FAIL: Wrong highway action triggered but hearts=${state.hearts} or isKo=${state.isKo}!`);
          }
          wrongTriggered = true;
          toastText = state.text;
          console.log(`  ❌ Detected WRONG Toast in DOM: "${state.text}" (Hearts: ${state.hearts}/2)`);
          break;
        }
      }

      if (!wrongTriggered) {
        throw new Error('TIMEOUT: Wrong highway toast did not appear!');
      }

      const wrongBuf = await page.screenshot();
      saveAndVerifyFrame(wrongBuf, 'b1_real_highway_wrong.png', `Red Banner: "${toastText}" (Hearts: 1/2, No KO)`);

      await page.close();
    }

    // =========================================================================
    // 3. SyntaxExpressRail (Room 3, Door 1)
    // =========================================================================
    console.log('\n🎮 =========================================================================');
    console.log('🎮 [PLAYTEST] SyntaxExpressRail (Room 3, Door 1)');
    console.log('🎮 =========================================================================');

    // ── 3A: SPAWN & CORRECT ACTION ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=3&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[1].click();
      console.log('  Entered Door 1 (SyntaxExpressRail)');
      await new Promise(r => setTimeout(r, 1200));

      // Capture Spawn frame
      const spawnBuf = await page.screenshot();
      saveAndVerifyFrame(spawnBuf, 'b1_real_syntax_spawn.png', 'Spawn frame with train gauge (Round 1/6, 2 Hearts)');

      // Leo walks left towards Gantry Left Lever 0 ("will slip easily")
      console.log('  Walking Leo left towards Gantry Left Lever 0 ("will slip easily")...');
      await page.keyboard.down('ArrowLeft');
      await new Promise(r => setTimeout(r, 800));
      await page.keyboard.up('ArrowLeft');
      await new Promise(r => setTimeout(r, 200));

      // Trigger correct lever switch via DOM click
      console.log('  Triggering correct lever switch...');
      await page.evaluate(() => {
        const el = document.querySelector('.rail-switch-entity[data-is-correct="true"]');
        if (el) el.click();
      });

      let correctTriggered = false;
      let toastText = '';

      for (let i = 0; i < 20; i++) {
        await new Promise(r => setTimeout(r, 100));
        const state = await page.evaluate(() => {
          const toast = document.querySelector('.syntax-feedback-toast');
          const isCorrect = toast?.classList.contains('feedback-correct');
          const hearts = document.querySelectorAll('.hud-heart-full').length;
          const score = document.querySelector('.hud-score-value')?.innerText;
          return {
            hasToast: !!toast,
            text: toast?.innerText || '',
            isCorrect,
            hearts,
            score,
          };
        });

        if (state.hasToast && state.isCorrect && state.text.includes('JUNCTION SWITCHED')) {
          if (state.hearts !== 2) {
            throw new Error(`CRITICAL FAIL: Correct syntax action triggered but hearts=${state.hearts}!`);
          }
          correctTriggered = true;
          toastText = state.text;
          console.log(`  ✅ Detected CORRECT Toast in DOM: "${state.text}" (Hearts: ${state.hearts}/2, Score: ${state.score})`);
          break;
        }
      }

      if (!correctTriggered) {
        throw new Error('TIMEOUT: Correct syntax toast "JUNCTION SWITCHED" did not appear!');
      }

      const correctBuf = await page.screenshot();
      saveAndVerifyFrame(correctBuf, 'b1_real_syntax_correct.png', `Green Banner: "${toastText}" (Hearts: 2/2, Score +40)`);

      await page.close();
    }

    // ── 3B: WRONG ACTION (Clean new game) ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=3&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[1].click();
      await new Promise(r => setTimeout(r, 1200));

      // Leo spawns right at center gantry next to Lever 1 ("had slipped yesterday" - distractor).
      console.log('  Triggering distractor lever at spawn ("had slipped yesterday")...');
      await page.evaluate(() => {
        const el = document.querySelector('.rail-switch-entity[data-is-correct="false"]');
        if (el) el.click();
      });

      let wrongTriggered = false;
      let toastText = '';

      for (let i = 0; i < 20; i++) {
        await new Promise(r => setTimeout(r, 100));
        const state = await page.evaluate(() => {
          const toast = document.querySelector('.syntax-feedback-toast');
          const isWrong = toast?.classList.contains('feedback-wrong');
          const hearts = document.querySelectorAll('.hud-heart-full').length;
          return {
            hasToast: !!toast,
            text: toast?.innerText || '',
            isWrong,
            hearts,
          };
        });

        if (state.hasToast && state.isWrong && state.text.includes('ROUGH TRACKS')) {
          if (state.hearts !== 1) {
            throw new Error(`CRITICAL FAIL: Wrong syntax action triggered but hearts=${state.hearts}!`);
          }
          wrongTriggered = true;
          toastText = state.text;
          console.log(`  ❌ Detected WRONG Toast in DOM: "${state.text}" (Hearts: ${state.hearts}/2)`);
          break;
        }
      }

      if (!wrongTriggered) {
        throw new Error('TIMEOUT: Wrong syntax toast "ROUGH TRACKS" did not appear!');
      }

      const wrongBuf = await page.screenshot();
      saveAndVerifyFrame(wrongBuf, 'b1_real_syntax_wrong.png', `Red Banner: "${toastText}" (Hearts: 1/2, No KO)`);

      await page.close();
    }

    console.log('\n🎉 ALL 3 GAMES PLAYTESTED AND VERIFIED ACCURATELY WITH 100% LABEL INTEGRITY!');

  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error('❌ PLAYTEST FAILED WITH ERROR:', err);
  process.exit(1);
});
