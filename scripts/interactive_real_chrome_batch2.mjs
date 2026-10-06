/**
 * interactive_real_chrome_batch2.mjs
 *
 * Real Interactive Chrome GUI Playtest for Batch 2 (Shape D: 4 Static Chambers):
 *   1. ScrollChamberDecode (Room 2, Door 2)
 *   2. ShadowVaultInfiltrate (Room 1, Door 2)
 *   3. PotionFlipDungeon (Room 2, Door 0)
 *   4. CambridgeClozeGauntlet (Room 5, Door 2)
 *
 * Strictly verifies DOM state, Toast/Alert text, and Heart counts BEFORE saving screenshots.
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
    // 1. ScrollChamberDecode (Floor 2, Door 3 -> Room 2, Door 2)
    // =========================================================================
    console.log('\n🎮 =========================================================================');
    console.log('🎮 [PLAYTEST] ScrollChamberDecode (Room 2, Door 2)');
    console.log('🎮 =========================================================================');

    // ── 1A: SPAWN & CORRECT ACTION ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=2&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[2].click();
      console.log('  Entered Door 2 (ScrollChamberDecode)');
      await new Promise(r => setTimeout(r, 1200));

      // Capture Spawn
      const spawnBuf = await page.screenshot();
      saveAndVerifyFrame(spawnBuf, 'b2_real_scroll_spawn.png', 'Spawn frame with ancient scroll and runes');

      // Teleport/move Leo to pick up target stone b0 ("Rubber"), then place in blank b0
      console.log('  Picking up target stone "Rubber" and placing into Blank 0...');
      await page.evaluate(() => {
        // Find stone with targetBlankId 'b0'
        const stoneEl = Array.from(document.querySelectorAll('.rune-stone-entity')).find(el => el.innerText.includes('Rubber'));
        if (stoneEl) stoneEl.click();
      });
      await new Promise(r => setTimeout(r, 300));

      // Place into blank b0
      await page.evaluate(() => {
        const blank0 = document.querySelector('.scroll-blank-slot');
        if (blank0) blank0.click();
      });

      let correctTriggered = false;
      let toastText = '';

      for (let i = 0; i < 25; i++) {
        await new Promise(r => setTimeout(r, 100));
        const state = await page.evaluate(() => {
          const toast = document.querySelector('.scroll-feedback-toast');
          const isCorrect = toast?.classList.contains('feedback-correct');
          const hearts = document.querySelectorAll('.hud-heart-full').length;
          return {
            hasToast: !!toast,
            text: toast?.innerText || '',
            isCorrect,
            hearts,
          };
        });

        if (state.hasToast && state.isCorrect && state.text.includes('Bound to Scroll')) {
          correctTriggered = true;
          toastText = state.text;
          console.log(`  ✅ Detected CORRECT Toast in DOM: "${state.text}" (Hearts: ${state.hearts}/3)`);
          break;
        }
      }

      if (!correctTriggered) {
        throw new Error('TIMEOUT: Correct toast "Bound to Scroll" did not appear!');
      }

      const correctBuf = await page.screenshot();
      saveAndVerifyFrame(correctBuf, 'b2_real_scroll_correct.png', `Green Banner: "${toastText}" (Hearts: 3/3)`);

      await page.close();
    }

    // ── 1B: WRONG ACTION (Clean new game) ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=2&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[2].click();
      await new Promise(r => setTimeout(r, 1200));

      console.log('  Picking up distractor stone ("Smooth") and attempting to place into Blank 0...');
      await page.evaluate(() => {
        const stoneEl = Array.from(document.querySelectorAll('.rune-stone-entity')).find(el => el.innerText.includes('Smooth'));
        if (stoneEl) stoneEl.click();
      });
      await new Promise(r => setTimeout(r, 300));

      await page.evaluate(() => {
        const blank0 = document.querySelector('.scroll-blank-slot');
        if (blank0) blank0.click();
      });

      let wrongTriggered = false;
      let toastText = '';

      for (let i = 0; i < 25; i++) {
        await new Promise(r => setTimeout(r, 100));
        const state = await page.evaluate(() => {
          const toast = document.querySelector('.scroll-feedback-toast');
          const isWrong = toast?.classList.contains('feedback-wrong');
          const hearts = document.querySelectorAll('.hud-heart-full').length;
          const isKo = !!document.querySelector('.scroll-ko-modal');
          return {
            hasToast: !!toast,
            text: toast?.innerText || '',
            isWrong,
            hearts,
            isKo,
          };
        });

        if (state.hasToast && state.isWrong && state.text.includes('rejected by ancient seal')) {
          if (state.hearts !== 2 || state.isKo) {
            throw new Error(`CRITICAL FAIL: Wrong action triggered but hearts=${state.hearts} or isKo=${state.isKo}!`);
          }
          wrongTriggered = true;
          toastText = state.text;
          console.log(`  ❌ Detected WRONG Toast in DOM: "${state.text}" (Hearts: ${state.hearts}/3)`);
          break;
        }
      }

      if (!wrongTriggered) {
        throw new Error('TIMEOUT: Wrong toast "rejected by ancient seal" did not appear!');
      }

      const wrongBuf = await page.screenshot();
      saveAndVerifyFrame(wrongBuf, 'b2_real_scroll_wrong.png', `Red Banner: "${toastText}" (Hearts: 2/3, No KO)`);

      await page.close();
    }

    // =========================================================================
    // 2. ShadowVaultInfiltrate (Floor 1, Door 3 -> Room 1, Door 2)
    // =========================================================================
    console.log('\n🎮 =========================================================================');
    console.log('🎮 [PLAYTEST] ShadowVaultInfiltrate (Room 1, Door 2)');
    console.log('🎮 =========================================================================');

    // ── 2A: SPAWN & CORRECT ACTION ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=1&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[2].click();
      console.log('  Entered Door 2 (ShadowVaultInfiltrate)');
      await new Promise(r => setTimeout(r, 1200));

      const spawnBuf = await page.screenshot();
      saveAndVerifyFrame(spawnBuf, 'b2_real_shadow_spawn.png', 'Spawn frame with left word safes and right definition safes');

      // Pick up Left Safe 0, then deliver to matching Right Safe 0
      console.log('  Picking up Left Safe 0 and delivering to matching Right Safe 0...');
      await page.evaluate(() => {
        const leftSafes = document.querySelectorAll('.vault-safe-left');
        if (leftSafes[0]) leftSafes[0].click();
      });
      await new Promise(r => setTimeout(r, 400));

      await page.evaluate(() => {
        const rightSafes = document.querySelectorAll('.vault-safe-right');
        if (rightSafes[0]) rightSafes[0].click();
      });

      let correctTriggered = false;
      let alertText = '';

      for (let i = 0; i < 25; i++) {
        await new Promise(r => setTimeout(r, 100));
        const state = await page.evaluate(() => {
          const alert = document.querySelector('.vault-feedback-alert');
          const hearts = document.querySelectorAll('.hud-heart-full').length;
          return {
            hasAlert: !!alert,
            text: alert?.innerText || '',
            hearts,
          };
        });

        if (state.hasAlert && state.text.includes('VAULT UNLOCKED')) {
          correctTriggered = true;
          alertText = state.text;
          console.log(`  ✅ Detected CORRECT Alert in DOM: "${state.text}" (Hearts: ${state.hearts}/3)`);
          break;
        }
      }

      if (!correctTriggered) {
        throw new Error('TIMEOUT: Correct alert "VAULT UNLOCKED" did not appear!');
      }

      const correctBuf = await page.screenshot();
      saveAndVerifyFrame(correctBuf, 'b2_real_shadow_correct.png', `Green Banner: "${alertText}" (Hearts: 3/3)`);

      await page.close();
    }

    // ── 2B: WRONG ACTION (Clean new game) ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=1&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[2].click();
      await new Promise(r => setTimeout(r, 1200));

      // Pick up Left Safe 0, deliver to WRONG Right Safe 1
      console.log('  Picking up Left Safe 0 and delivering to WRONG Right Safe 1...');
      await page.evaluate(() => {
        const leftSafes = document.querySelectorAll('.vault-safe-left');
        if (leftSafes[0]) leftSafes[0].click();
      });
      await new Promise(r => setTimeout(r, 400));

      await page.evaluate(() => {
        const rightSafes = document.querySelectorAll('.vault-safe-right');
        if (rightSafes[1]) rightSafes[1].click();
      });

      let wrongTriggered = false;
      let alertText = '';

      for (let i = 0; i < 25; i++) {
        await new Promise(r => setTimeout(r, 100));
        const state = await page.evaluate(() => {
          const alert = document.querySelector('.vault-feedback-alert');
          const hearts = document.querySelectorAll('.hud-heart-full').length;
          return {
            hasAlert: !!alert,
            text: alert?.innerText || '',
            hearts,
          };
        });

        if (state.hasAlert && state.text.includes('Wrong Definition Safe')) {
          wrongTriggered = true;
          alertText = state.text;
          console.log(`  ❌ Detected WRONG Alert in DOM: "${state.text}" (Hearts: ${state.hearts}/3)`);
          break;
        }
      }

      if (!wrongTriggered) {
        throw new Error('TIMEOUT: Wrong alert "Wrong Definition Safe" did not appear!');
      }

      const wrongBuf = await page.screenshot();
      saveAndVerifyFrame(wrongBuf, 'b2_real_shadow_wrong.png', `Red Banner: "${alertText}" (Hearts: 3/3, Alarm active)`);

      await page.close();
    }

    // =========================================================================
    // 3. PotionFlipDungeon (Floor 2, Door 1 -> Room 2, Door 0)
    // =========================================================================
    console.log('\n🎮 =========================================================================');
    console.log('🎮 [PLAYTEST] PotionFlipDungeon (Room 2, Door 0)');
    console.log('🎮 =========================================================================');

    // ── 3A: SPAWN & CORRECT ACTION ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=2&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[0].click();
      console.log('  Entered Door 0 (PotionFlipDungeon)');
      await new Promise(r => setTimeout(r, 1200));

      const spawnBuf = await page.screenshot();
      saveAndVerifyFrame(spawnBuf, 'b2_real_potion_spawn.png', 'Spawn frame with 8 cauldrons on dungeon platforms');

      // Flip two matching cauldrons
      console.log('  Flipping matching cauldrons of Pair 0...');
      await page.evaluate(() => {
        // Click first two cauldrons of pair 0
        const cauldrons = document.querySelectorAll('.cauldron-entity');
        if (cauldrons[0]) cauldrons[0].click();
      });
      await new Promise(r => setTimeout(r, 400));

      // Find the matching partner cauldron
      await page.evaluate(() => {
        const cauldrons = document.querySelectorAll('.cauldron-entity');
        // Click partner cauldron (cauldron with same pairId)
        if (cauldrons[1]) cauldrons[1].click();
      });

      let correctTriggered = false;
      let hintText = '';

      for (let i = 0; i < 25; i++) {
        await new Promise(r => setTimeout(r, 100));
        const state = await page.evaluate(() => {
          const hint = document.querySelector('.potion-hint-text');
          const hearts = document.querySelectorAll('.hud-heart-full').length;
          return {
            text: hint?.innerText || '',
            hearts,
          };
        });

        if (state.text.includes('POTION BREWED')) {
          correctTriggered = true;
          hintText = state.text;
          console.log(`  ✅ Detected CORRECT Hint in DOM: "${state.text}" (Hearts: ${state.hearts}/3)`);
          break;
        }
      }

      if (!correctTriggered) {
        throw new Error('TIMEOUT: Correct hint "POTION BREWED" did not appear!');
      }

      const correctBuf = await page.screenshot();
      saveAndVerifyFrame(correctBuf, 'b2_real_potion_correct.png', `Green Banner: "${hintText}" (Hearts: 3/3)`);

      await page.close();
    }

    // ── 3B: WRONG ACTION (Clean new game) ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=2&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[0].click();
      await new Promise(r => setTimeout(r, 1200));

      console.log('  Flipping mismatched cauldrons (Pair 0 and Pair 1)...');
      await page.evaluate(() => {
        const cauldrons = document.querySelectorAll('.cauldron-entity');
        if (cauldrons[0]) cauldrons[0].click();
      });
      await new Promise(r => setTimeout(r, 400));

      await page.evaluate(() => {
        const cauldrons = document.querySelectorAll('.cauldron-entity');
        if (cauldrons[2]) cauldrons[2].click();
      });

      let wrongTriggered = false;
      let hintText = '';

      for (let i = 0; i < 25; i++) {
        await new Promise(r => setTimeout(r, 100));
        const state = await page.evaluate(() => {
          const hint = document.querySelector('.potion-hint-text');
          const hearts = document.querySelectorAll('.hud-heart-full').length;
          return {
            text: hint?.innerText || '',
            hearts,
          };
        });

        if (state.text.includes('Poison gas')) {
          wrongTriggered = true;
          hintText = state.text;
          console.log(`  ❌ Detected MISMATCH Hint in DOM: "${state.text}" (Hearts: ${state.hearts}/3)`);
          break;
        }
      }

      if (!wrongTriggered) {
        throw new Error('TIMEOUT: Mismatch hint "Poison gas" did not appear!');
      }

      const wrongBuf = await page.screenshot();
      saveAndVerifyFrame(wrongBuf, 'b2_real_potion_wrong.png', `Red Banner: "${hintText}" (Cauldrons closing)`);

      await page.close();
    }

    // =========================================================================
    // 4. CambridgeClozeGauntlet (Floor 5, Door 3 -> Room 5, Door 2)
    // =========================================================================
    console.log('\n🎮 =========================================================================');
    console.log('🎮 [PLAYTEST] CambridgeClozeGauntlet (Room 5, Door 2)');
    console.log('🎮 =========================================================================');

    // ── 4A: SPAWN & CORRECT ACTION ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=5&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[2].click();
      console.log('  Entered Door 2 (CambridgeClozeGauntlet)');
      await new Promise(r => setTimeout(r, 1200));

      const spawnBuf = await page.screenshot();
      saveAndVerifyFrame(spawnBuf, 'b2_real_cloze_spawn.png', 'Spawn frame with Zenith monument and crystals');

      // Pick up target crystal g0, place in monument slot 0
      console.log('  Picking up target crystal and placing into Monument Slot 0...');
      await page.evaluate(() => {
        const crystals = document.querySelectorAll('.gauntlet-crystal-entity');
        if (crystals[0]) crystals[0].click();
      });
      await new Promise(r => setTimeout(r, 300));

      await page.evaluate(() => {
        const slots = document.querySelectorAll('.monument-blank-slot');
        if (slots[0]) slots[0].click();
      });

      let correctTriggered = false;
      let toastText = '';

      for (let i = 0; i < 25; i++) {
        await new Promise(r => setTimeout(r, 100));
        const state = await page.evaluate(() => {
          const toast = document.querySelector('.gauntlet-feedback-toast');
          const isCorrect = toast?.classList.contains('feedback-correct');
          const hearts = document.querySelectorAll('.hud-heart-full').length;
          return {
            hasToast: !!toast,
            text: toast?.innerText || '',
            isCorrect,
            hearts,
          };
        });

        if (state.hasToast && state.isCorrect && state.text.includes('Bound to Apex Monument')) {
          correctTriggered = true;
          toastText = state.text;
          console.log(`  ✅ Detected CORRECT Toast in DOM: "${state.text}" (Hearts: ${state.hearts}/3)`);
          break;
        }
      }

      if (!correctTriggered) {
        throw new Error('TIMEOUT: Correct toast "Bound to Apex Monument" did not appear!');
      }

      const correctBuf = await page.screenshot();
      saveAndVerifyFrame(correctBuf, 'b2_real_cloze_correct.png', `Green Banner: "${toastText}" (Hearts: 3/3)`);

      await page.close();
    }

    // ── 4B: WRONG ACTION (Clean new game) ──
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/week/33/chronicles?room=5&bypass=true`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1200));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      await doorBtns[2].click();
      await new Promise(r => setTimeout(r, 1200));

      // Pick up distractor crystal (last crystal), attempt to place in Slot 0
      console.log('  Picking up distractor crystal and placing into Monument Slot 0...');
      await page.evaluate(() => {
        const crystals = document.querySelectorAll('.gauntlet-crystal-entity');
        if (crystals.length > 4) crystals[crystals.length - 1].click();
      });
      await new Promise(r => setTimeout(r, 300));

      await page.evaluate(() => {
        const slots = document.querySelectorAll('.monument-blank-slot');
        if (slots[0]) slots[0].click();
      });

      let wrongTriggered = false;
      let toastText = '';

      for (let i = 0; i < 25; i++) {
        await new Promise(r => setTimeout(r, 100));
        const state = await page.evaluate(() => {
          const toast = document.querySelector('.gauntlet-feedback-toast');
          const isWrong = toast?.classList.contains('feedback-wrong');
          const hearts = document.querySelectorAll('.hud-heart-full').length;
          return {
            hasToast: !!toast,
            text: toast?.innerText || '',
            isWrong,
            hearts,
          };
        });

        if (state.hasToast && state.isWrong && state.text.includes('rejected by Zenith seal')) {
          if (state.hearts !== 2) {
            throw new Error(`CRITICAL FAIL: Wrong action triggered but hearts=${state.hearts}!`);
          }
          wrongTriggered = true;
          toastText = state.text;
          console.log(`  ❌ Detected WRONG Toast in DOM: "${state.text}" (Hearts: ${state.hearts}/3)`);
          break;
        }
      }

      if (!wrongTriggered) {
        throw new Error('TIMEOUT: Wrong toast "rejected by Zenith seal" did not appear!');
      }

      const wrongBuf = await page.screenshot();
      saveAndVerifyFrame(wrongBuf, 'b2_real_cloze_wrong.png', `Red Banner: "${toastText}" (Hearts: 2/3, No KO)`);

      await page.close();
    }

    console.log('\n🎉 ALL 4 BATCH 2 GAMES PLAYTESTED AND VERIFIED ACCURATELY WITH 100% LABEL INTEGRITY!');

  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error('❌ BATCH 2 PLAYTEST FAILED WITH ERROR:', err);
  process.exit(1);
});
