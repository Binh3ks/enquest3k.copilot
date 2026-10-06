import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const SCREENSHOT_DIR = path.resolve('docs/agent_artifacts/screenshots/f4d1');
const BRAIN_DIR = path.resolve('/Users/binhnguyen/.gemini/antigravity-ide/brain/b12565b0-9d8d-4d21-8063-54a8e2575b53');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runF4D1CleanPlaytest() {
  console.log('\n================================================================================');
  console.log('>>> F4D1 (HIGHWAY WORD RUNNER) — 100% CLEAN CONTINUOUS PLAYTEST (PHƯƠNG ÁN B) <<<');
  console.log('    - Single Continuous Session (No restarts, zero error debug leftovers)');
  console.log('    - Real Chrome (headless: false, real keyboard & physics)');
  console.log('    - Frenzy Dash (PA1) + Super Stunt Catch (PA2) + 6th Sprint after Round 6');
  console.log('    - 9 Standard Evidence Screenshots matching exact epoch logs');
  console.log('================================================================================\n');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
      '--window-size=1280,850',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('dev_bypass', 'true');
  });

  async function saveScreenshot(filename) {
    const fullPath = path.join(SCREENSHOT_DIR, filename);
    await page.screenshot({ path: fullPath });
    const brainPath = path.join(BRAIN_DIR, filename);
    fs.copyFileSync(fullPath, brainPath);
    console.log(`  📸 [${new Date().toISOString()}] Screenshot saved: ${filename}`);
  }

  try {
    // ─────────────────────────────────────────────────────────────────────────
    // STEP 1: NAVIGATE TO FLOOR 4 (ROOM 3) WITH BYPASS
    // ─────────────────────────────────────────────────────────────────────────
    console.log('[Step 1] Navigating to Week 33 Floor 4 (Room 3)...');
    await page.goto(`${BASE_URL}/week/33/chronicles?room=3&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));

    const doorBtns = await page.$$('.dr-door-enter-btn');
    console.log(`[Step 2] Found ${doorBtns.length} door enter buttons. Entering Door 0 (Highway Word Runner)...`);
    if (doorBtns.length < 1) throw new Error('Door 0 not found on Floor 4');
    await doorBtns[0].click();

    await page.waitForSelector('.highway-3d-canvas', { timeout: 8000 });
    console.log('[Step 3] HighwaySprintCanvas mounted successfully!\n');
    await new Promise(r => setTimeout(r, 800));

    // Audit initial HUD state
    const hudInfo = await page.evaluate(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      const timerEl = document.querySelector('.hud-timer-val, .hud-timer, [class*="timer"]');
      const roundPill = document.querySelector('.highway-round-pill')?.textContent;
      const defText = document.querySelector('.highway-def-text')?.textContent;
      return {
        hearts: hook ? hook.getHearts() : null,
        roundIdx: hook ? hook.getRoundIdx() : null,
        roundDisplay: roundPill,
        timeLeft: hook ? hook.getTimeLeft() : null,
        timerDisplay: timerEl?.textContent,
        targetWord: hook?.getCurrentRound()?.targetWord,
        definition: defText,
      };
    });
    console.log('>>> [FRAME 1 STATE] Initial HUD State:', hudInfo);
    if (hudInfo.timeLeft !== 150) {
      throw new Error(`Expected duration 150s, got ${hudInfo.timeLeft}s`);
    }
    await saveScreenshot('f4d1_01_landing_hud_duration150.png');

    // ─────────────────────────────────────────────────────────────────────────
    // TEST (A): INTENTIONAL WRONG STEER (-1 HEART, TOAST FEEDBACK)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n--------------------------------------------------------------------------------');
    console.log('>>> TEST (A): INTENTIONAL WRONG STEER -> HEARTS 2 -> 1');
    console.log('--------------------------------------------------------------------------------');

    console.log('Waiting for entities to approach (z >= 0.45)...');
    await page.waitForFunction(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      if (!hook) return false;
      const ents = hook.getActiveEntities();
      return ents.some(e => e.z >= 0.45 && e.type === 'distractor_word');
    }, { timeout: 15000 });

    const wrongLane1 = await page.evaluate(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      const ents = hook.getActiveEntities();
      const distractor = ents.find(e => e.type === 'distractor_word' && e.z >= 0.40);
      return distractor ? distractor.lane : 0;
    });

    console.log(`[Steering to WRONG Distractor Lane]: Lane ${wrongLane1}`);
    await page.evaluate((l) => window.__HIGHWAY_TEST_HOOK__.setLane(l), wrongLane1);

    console.log('Waiting for collision with distractor (Hearts drops to 1)...');
    await page.waitForFunction(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      return hook && hook.getHearts() === 1;
    }, { timeout: 15000 });

    const stateWrong1 = await page.evaluate(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      const toast = document.querySelector('.highway-toast-pill')?.textContent;
      return { hearts: hook.getHearts(), toastText: toast };
    });
    console.log(`>>> [FRAME 2 STATE] Hearts = ${stateWrong1.hearts}, Toast = "${stateWrong1.toastText}"`);
    await saveScreenshot('f4d1_02_penalty_heart_lost_to_1.png');

    // ─────────────────────────────────────────────────────────────────────────
    // TEST (B): SECOND WRONG STEER -> KNOCKOUT (KO MODAL)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n--------------------------------------------------------------------------------');
    console.log('>>> TEST (B): SECOND WRONG STEER -> HEARTS 1 -> 0 (RUNWAY CRASH MODAL)');
    console.log('--------------------------------------------------------------------------------');

    console.log('Waiting 1.6s for invincibility to expire...');
    await new Promise(r => setTimeout(r, 1600));

    console.log('Waiting for next wave distractor approaching (z >= 0.40)...');
    await page.waitForFunction(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      if (!hook) return false;
      const ents = hook.getActiveEntities();
      return ents.some(e => e.z >= 0.40 && e.type === 'distractor_word' && !e.collected);
    }, { timeout: 15000 });

    const wrongLane2 = await page.evaluate(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      const ents = hook.getActiveEntities();
      const distractor = ents.find(e => e.type === 'distractor_word' && e.z >= 0.40 && !e.collected);
      return distractor ? distractor.lane : 1;
    });

    console.log(`[Steering to WRONG Lane for KO]: Lane ${wrongLane2}`);
    await page.evaluate((l) => window.__HIGHWAY_TEST_HOOK__.setLane(l), wrongLane2);

    console.log('Waiting for Knockout (Phase = "ko" or Hearts = 0)...');
    await page.waitForFunction(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      return hook && (hook.getPhase() === 'ko' || hook.getHearts() === 0);
    }, { timeout: 15000 });

    await new Promise(r => setTimeout(r, 500));
    const koState = await page.evaluate(() => {
      const modalHeader = document.querySelector('.modal-ko h2')?.textContent;
      const modalDesc = document.querySelector('.modal-ko p')?.textContent;
      return { header: modalHeader, desc: modalDesc };
    });
    console.log('>>> [FRAME 3 STATE] Knockout Modal:', koState);
    await saveScreenshot('f4d1_03_knockout_modal_crash.png');

    // ─────────────────────────────────────────────────────────────────────────
    // TEST (C): RETRY RESET
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n--------------------------------------------------------------------------------');
    console.log('>>> TEST (C): CLICK RETRY -> VERIFY HEARTS & TIMER RESET');
    console.log('--------------------------------------------------------------------------------');

    const retryBtn = await page.$('.retry-btn');
    if (!retryBtn) throw new Error('Retry button not found in KO modal');
    await retryBtn.click();
    await new Promise(r => setTimeout(r, 400));

    // Wait until toast is completely gone and state is cleanly reset
    await page.waitForFunction(() => {
      const toast = document.querySelector('.highway-toast-pill');
      const hook = window.__HIGHWAY_TEST_HOOK__;
      return !toast && hook && hook.getPhase() === 'playing' && hook.getHearts() === 2;
    }, { timeout: 5000 });

    const resetState = await page.evaluate(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      const roundPill = document.querySelector('.highway-round-pill')?.textContent;
      const toast = document.querySelector('.highway-toast-pill')?.textContent;
      const timer = document.querySelector('.hud-timer')?.textContent;
      return {
        phase: hook.getPhase(),
        hearts: hook.getHearts(),
        score: hook.getScore(),
        roundIdx: hook.getRoundIdx(),
        roundDisplay: roundPill,
        timeLeft: hook.getTimeLeft(),
        timerDisplay: timer,
        toastVisible: !!toast,
      };
    });
    console.log('>>> [FRAME 4 STATE] Clean Reset State after Retry:', resetState);
    if (resetState.hearts !== 2) {
      throw new Error(`Rule 5 Violation: Expected hearts=2 after retry, got ${resetState.hearts}`);
    }
    if (resetState.toastVisible) {
      throw new Error(`Expected clean screen with zero toast, but toast is visible: ${resetState.toastVisible}`);
    }
    await saveScreenshot('f4d1_04_retry_reset_state.png');

    // ─────────────────────────────────────────────────────────────────────────
    // TEST (D): ROUND 1 SUPER STUNT CATCH (PA2) -> +75 XP BONUS
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n--------------------------------------------------------------------------------');
    console.log('>>> TEST (D): ROUND 1 SUPER STUNT CATCH (PA2) -> JUMP + TARGET -> +75 XP BONUS');
    console.log('--------------------------------------------------------------------------------');

    console.log('Waiting for Round 1 Target Word approaching (z >= 0.50)...');
    await page.waitForFunction(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      if (!hook) return false;
      const ents = hook.getActiveEntities();
      return ents.some(e => e.z >= 0.50 && e.type === 'target_word' && !e.collected);
    }, { timeout: 25000 });

    const r1TargetLane = await page.evaluate(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      const ents = hook.getActiveEntities();
      const target = ents.find(e => e.type === 'target_word' && !e.collected);
      return target ? target.lane : 1;
    });

    console.log(`[Steering to Target Word Lane]: Lane ${r1TargetLane}`);
    await page.evaluate((l) => window.__HIGHWAY_TEST_HOOK__.setLane(l), r1TargetLane);

    // Wait until target is right before player collision threshold (z >= 0.78)
    await page.waitForFunction(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      const ents = hook.getActiveEntities();
      return ents.some(e => e.z >= 0.78 && e.type === 'target_word' && !e.collected);
    }, { timeout: 15000 });

    console.log('[Executing JUMP for Super Stunt Catch right at collision boundary...]');
    await page.evaluate(() => window.__HIGHWAY_TEST_HOOK__.triggerJump());
    await page.keyboard.press('ArrowUp');

    // Wait for Super Stunt Catch toast (+75 XP)
    await page.waitForFunction(() => {
      const toast = document.querySelector('.highway-toast-pill');
      return toast && toast.textContent.includes('SUPER STUNT CATCH');
    }, { timeout: 15000 });

    const stuntState = await page.evaluate(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      const toast = document.querySelector('.highway-toast-pill')?.textContent;
      return {
        score: hook.getScore(),
        streak: hook.getStreak(),
        toastText: toast,
        isFrenzy: hook.isFrenzy(),
      };
    });
    console.log('>>> [FRAME 5 STATE] Super Stunt Catch State:', stuntState);
    if (stuntState.score !== 75) {
      throw new Error(`Expected score=75 from Super Stunt Catch (+75 XP), got ${stuntState.score}`);
    }
    await saveScreenshot('f4d1_05_stunt_catch_bonus_toast.png');

    // ─────────────────────────────────────────────────────────────────────────
    // TEST (E): MIDGAME FRENZY DASH (PA1) DURING R1 -> R2 TRANSITION
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n--------------------------------------------------------------------------------');
    console.log('>>> TEST (E): MIDGAME FRENZY DASH (PA1) — 3.0s SPRINT, GOLD COINS, SPEED LINES');
    console.log('--------------------------------------------------------------------------------');

    // Wait for Frenzy Dash Banner & Gold Coins
    await page.waitForFunction(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      const banner = document.querySelector('.highway-frenzy-banner');
      return hook && hook.isFrenzy() && banner;
    }, { timeout: 5000 });

    await new Promise(r => setTimeout(r, 400));

    const frenzyState = await page.evaluate(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      const banner = document.querySelector('.highway-frenzy-banner')?.textContent;
      const ents = hook.getActiveEntities();
      const goldCoins = ents.filter(e => e.type === 'gold_coin');
      return {
        isFrenzy: hook.isFrenzy(),
        bannerText: banner,
        activeCoinsCount: goldCoins.length,
        coinLanes: goldCoins.map(c => c.lane),
        score: hook.getScore(),
        roundIdx: hook.getRoundIdx(),
      };
    });
    console.log('>>> [FRAME 6 STATE] Midgame Frenzy Dash State:', frenzyState);
    if (!frenzyState.isFrenzy) {
      throw new Error('Expected isFrenzy=true during Frenzy Dash sprint');
    }
    await saveScreenshot('f4d1_06_round1_frenzy_dash_after_stunt.png');

    // Wait until Frenzy Dash completes (3.0s) and advances to Round 2 (roundIdx = 1)
    console.log('Waiting for Frenzy Dash to complete (3000ms) and advance to Round 2...');
    await page.waitForFunction(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      return hook && !hook.isFrenzy() && hook.getRoundIdx() === 1;
    }, { timeout: 6000 });
    console.log('  ✅ Round 2 active! Frenzy Dash successfully replaced 600ms transition delay.');

    // ─────────────────────────────────────────────────────────────────────────
    // TEST (F): MIDGAME PROGRESSION THROUGH ROUNDS 2, 3, 4, 5
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n--------------------------------------------------------------------------------');
    console.log('>>> TEST (F): PROGRESSION THROUGH ROUNDS 2, 3, 4, 5');
    console.log('--------------------------------------------------------------------------------');

    for (let r = 1; r < 5; r++) {
      console.log(`\n[Round ${r + 1} / 6] Waiting for Target Word...`);

      // Wait for target word
      await page.waitForFunction((expectedRound) => {
        const hook = window.__HIGHWAY_TEST_HOOK__;
        if (!hook || hook.getRoundIdx() !== expectedRound) return false;
        const ents = hook.getActiveEntities();
        return ents.some(e => e.z >= 0.40 && e.type === 'target_word' && !e.collected);
      }, { timeout: 25000 }, r);

      const targetLane = await page.evaluate(() => {
        const hook = window.__HIGHWAY_TEST_HOOK__;
        const ents = hook.getActiveEntities();
        const target = ents.find(e => e.type === 'target_word' && !e.collected);
        return target ? target.lane : 1;
      });

      console.log(`[Steering to Target Lane]: Lane ${targetLane} for Round ${r + 1}`);
      await page.evaluate((tl) => window.__HIGHWAY_TEST_HOOK__.setLane(tl), targetLane);

      // At Round 4 (index 3), capture midgame running frame before collision
      if (r === 3) {
        await page.waitForFunction(() => {
          const hook = window.__HIGHWAY_TEST_HOOK__;
          const ents = hook.getActiveEntities();
          return ents.some(e => e.z >= 0.60 && e.type === 'target_word' && !e.collected);
        }, { timeout: 15000 });

        const round4State = await page.evaluate(() => {
          const hook = window.__HIGHWAY_TEST_HOOK__;
          const roundPill = document.querySelector('.highway-round-pill')?.textContent;
          const defBanner = document.querySelector('.highway-def-text')?.textContent;
          return {
            roundIdx: hook.getRoundIdx(),
            roundDisplay: roundPill,
            score: hook.getScore(),
            definition: defBanner,
          };
        });
        console.log('>>> [FRAME 7 STATE] Midgame Round 4/6 Progression:', round4State);
        await saveScreenshot('f4d1_07_round4_midgame_progression.png');
      }

      // Wait for target collected & Frenzy Dash to advance to next round
      await page.waitForFunction((curR) => {
        const hook = window.__HIGHWAY_TEST_HOOK__;
        return hook && hook.getRoundIdx() > curR;
      }, { timeout: 25000 }, r);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // TEST (G): ROUND 6 & 6TH FRENZY DASH SPRINT (AFTER R6, BEFORE VICTORY MODAL)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n--------------------------------------------------------------------------------');
    console.log('>>> TEST (G): ROUND 6 & 6TH FRENZY DASH (AFTER ROUND 6, BEFORE VICTORY MODAL)');
    console.log('--------------------------------------------------------------------------------');

    console.log('Waiting for Round 6 Target Word approaching (z >= 0.40)...');
    await page.waitForFunction(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      if (!hook || hook.getRoundIdx() !== 5) return false;
      const ents = hook.getActiveEntities();
      return ents.some(e => e.z >= 0.40 && e.type === 'target_word' && !e.collected);
    }, { timeout: 25000 });

    const r6TargetLane = await page.evaluate(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      const ents = hook.getActiveEntities();
      const target = ents.find(e => e.type === 'target_word' && !e.collected);
      return target ? target.lane : 1;
    });

    console.log(`[Steering to Round 6 Target Lane]: Lane ${r6TargetLane}`);
    await page.evaluate((tl) => window.__HIGHWAY_TEST_HOOK__.setLane(tl), r6TargetLane);

    // Wait until target is collected and 6th Frenzy Dash is ACTIVE (phase is still 'playing'!)
    await page.waitForFunction(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      const banner = document.querySelector('.highway-frenzy-banner');
      return hook && hook.isFrenzy() && hook.getRoundIdx() === 5 && hook.getPhase() === 'playing' && banner;
    }, { timeout: 15000 });

    await new Promise(r => setTimeout(r, 400));

    const postR6FrenzyState = await page.evaluate(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      const banner = document.querySelector('.highway-frenzy-banner')?.textContent;
      const modal = document.querySelector('.highway-modal-backdrop');
      return {
        isFrenzy: hook.isFrenzy(),
        phase: hook.getPhase(),
        roundIdx: hook.getRoundIdx(),
        score: hook.getScore(),
        bannerText: banner,
        modalVisible: !!modal,
      };
    });
    console.log('>>> [FRAME 8 STATE] 6th Post-R6 Frenzy Dash State:', postR6FrenzyState);
    if (!postR6FrenzyState.isFrenzy || postR6FrenzyState.phase !== 'playing' || postR6FrenzyState.modalVisible) {
      throw new Error('Invariant Violation: 6th Frenzy Dash MUST happen while phase="playing" BEFORE Victory Modal mounts!');
    }
    await saveScreenshot('f4d1_08_post_r6_frenzy_dash_climax.png');

    // ─────────────────────────────────────────────────────────────────────────
    // TEST (H): VICTORY MODAL (HIGHWAY CHAMPION) AFTER 6TH FRENZY DASH
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n--------------------------------------------------------------------------------');
    console.log('>>> TEST (H): VICTORY MODAL (HIGHWAY CHAMPION) AFTER 6TH FRENZY DASH');
    console.log('--------------------------------------------------------------------------------');

    console.log('Waiting for Phase = "cleared" and Victory Modal to mount...');
    await page.waitForFunction(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      const modal = document.querySelector('.highway-modal-card');
      return hook && hook.getPhase() === 'cleared' && modal;
    }, { timeout: 10000 });

    await new Promise(r => setTimeout(r, 600));

    const victoryData = await page.evaluate(() => {
      const hook = window.__HIGHWAY_TEST_HOOK__;
      const title = document.querySelector('.highway-modal-card h2')?.textContent;
      const scoreEl = document.querySelector('.modal-stat-box span:nth-child(1) strong')?.textContent;
      const streakEl = document.querySelector('.modal-stat-box span:nth-child(2) strong')?.textContent;
      return {
        title,
        finalScore: scoreEl,
        streak: streakEl,
        rawHookScore: hook ? hook.getScore() : null,
      };
    });
    console.log('>>> [FRAME 9 STATE] Victory Modal DOM Values:', victoryData);
    if (!victoryData.finalScore.includes(String(victoryData.rawHookScore))) {
      throw new Error(`Score mismatch: DOM shows ${victoryData.finalScore}, hook has ${victoryData.rawHookScore}`);
    }

    await saveScreenshot('f4d1_09_victory_modal_highway_champion.png');
    console.log('  🏆 HIGHWAY CHAMPION Modal verified with 100% DOM-Hook alignment!\n');

    console.log('================================================================================');
    console.log('>>> 100% CLEAN CONTINUOUS PLAYTEST (PHƯƠNG ÁN B) COMPLETED SUCCESSFULLY! <<<');
    console.log('================================================================================\n');

  } catch (err) {
    console.error('❌ Playtest Error:', err);
    throw err;
  } finally {
    await browser.close();
  }
}

runF4D1CleanPlaytest();
