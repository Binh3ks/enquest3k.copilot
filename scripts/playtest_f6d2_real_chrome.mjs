/**
 * playtest_f6d2_real_chrome.mjs
 *
 * Real Headful Chrome Playtest (Phương án B) for F6D2 — Connector Relay
 * - Chrome visible window (headless: false)
 * - CDP keyboard steering (ArrowLeft / ArrowRight)
 * - Complete 6 rounds + intentional retry verifying E[overlap] = 0 (Session Exclusion Queue)
 * - Event-driven N2 timing measurement (approach time vs worst-case T_req = 14.23s)
 * - Screenshot capture and artifact persistence
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const ARTIFACT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/b12565b0-9d8d-4d21-8063-54a8e2575b53';
const SHOT_DIR = path.join(ROOT_DIR, 'docs', 'agent_artifacts', 'screenshots', 'f6d2');

if (!fs.existsSync(SHOT_DIR)) fs.mkdirSync(SHOT_DIR, { recursive: true });

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function copyToArtifact(srcPath, filename) {
  const destPath = path.join(ARTIFACT_DIR, filename);
  fs.copyFileSync(srcPath, destPath);
  console.log(`  📸 Saved & embedded: ${filename}`);
  return destPath;
}

async function main() {
  console.log('🚀 [F6D2 Real Chrome Playtest] Launching visible Chrome (Phương án B)...');

  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--window-size=1280,840',
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ],
    defaultViewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();
  const cdp = await page.target().createCDPSession();

  // Helper for real keyboard navigation via CDP
  async function pressKey(key, code) {
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode: key === 'ArrowLeft' ? 37 : 39 });
    await sleep(50);
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode: key === 'ArrowLeft' ? 37 : 39 });
  }

  async function steerToLane(currentLane, targetLane) {
    while (currentLane < targetLane) {
      await pressKey('ArrowRight', 'ArrowRight');
      currentLane++;
      await sleep(100);
    }
    while (currentLane > targetLane) {
      await pressKey('ArrowLeft', 'ArrowLeft');
      currentLane--;
      await sleep(100);
    }
    return currentLane;
  }

  const testReport = {
    game: 'F6D2 — Connector Relay',
    timestamp: new Date().toISOString(),
    attempt1_questions: [],
    retry1_questions: [],
    overlap_count: 0,
    n2_timing: [],
    macro_timer: {},
    passed: false
  };

  try {
    // ── 1. Navigate to Chronicles Room 5 (Floor 6) ──
    console.log('\n📍 Step 1: Navigating to Chronicles Floor 6...');
    await page.goto('http://localhost:5173/week/33/chronicles?room=5&owner=true', {
      waitUntil: 'networkidle2',
      timeout: 20000
    });
    await sleep(1500);

    // Click Door 2 (Connector Relay)
    console.log('🚪 Step 2: Opening Door 2 (Connector Relay)...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Open Chest'));
      if (btns[1]) btns[1].click();
    });

    // Wait for Connector Relay Canvas to mount
    await page.waitForSelector('.connector-relay-canvas', { timeout: 10000 });
    console.log('✅ ConnectorRelayCanvas mounted successfully.');
    await sleep(1200);

    // Screenshot 1: Landing
    const shotLanding = path.join(SHOT_DIR, 'f6d2_01_landing.png');
    await page.screenshot({ path: shotLanding });
    await copyToArtifact(shotLanding, 'f6d2_01_landing.png');

    // ── 2. Play Attempt 1: Collect Sparks & Measure Timing ──
    console.log('\n🎮 Step 3: Playing Attempt 1 (Rounds 1–5 normal, Round 6 intentional KO)...');
    let currentLane = 1;
    const attempt1Start = Date.now();

    for (let r = 0; r < 5; r++) {
      console.log(`\n--- Attempt 1, Round ${r + 1} ---`);
      const roundStart = Date.now();

      // Read current question from DOM / window hook
      const qData = await page.evaluate(() => {
        const text = document.querySelector('.connector-sentence-text')?.textContent || '';
        const hook = window.__CONNECTOR_RELAY_TEST_HOOK__;
        return {
          domText: text,
          question: hook?.getCurrentQuestion(),
          hearts: hook?.getHearts(),
          score: hook?.getScore(),
        };
      });

      testReport.attempt1_questions.push(qData.question?.sentence || qData.domText);
      console.log(`  Sentence: "${qData.question?.sentence || qData.domText}"`);
      console.log(`  Target Answer: "${qData.question?.answer}" | Hearts: ${qData.hearts} | Score: ${qData.score}`);

      // Steer to collect sparks first, then steer to target gate
      let sparkCollected = false;
      let gateSteered = false;

      // Monitor wave until gate is hit
      const initialEventsCount = await page.evaluate(() => (window.__CONNECTOR_RELAY_EVENT_LOG__ || []).length);

      while (true) {
        const state = await page.evaluate(() => {
          const ents = window.__CONNECTOR_RELAY_TEST_HOOK__?.getCurrentEntities() || [];
          const targetGate = ents.find(e => e.type === 'target_connector' && !e.passed && !e.collected);
          const spark = ents.find(e => e.type === 'arcane_spark' && !e.collected && !e.passed && e.z > 0.20 && e.z < 0.65);
          const events = window.__CONNECTOR_RELAY_EVENT_LOG__ || [];
          return { targetGate, spark, eventCount: events.length, lastEvent: events[events.length - 1] };
        });

        // Check if collision event already happened
        if (state.eventCount > initialEventsCount && state.lastEvent?.type === 'correct') {
          const approachTime = state.lastEvent.approachTimeSec || ((state.lastEvent.timestamp - roundStart) / 1000);
          testReport.n2_timing.push({
            round: r + 1,
            approachTimeSec: approachTime,
            targetWord: state.lastEvent.word,
            marginVsWorstCase: approachTime - 14.23
          });
          console.log(`  ⏱️ Measured Approach Time: ${approachTime.toFixed(2)}s (Margin vs T_req 14.23s: +${(approachTime - 14.23).toFixed(2)}s)`);
          console.log(`  ⚡ In Arcane Dash Sprint (2.5s)...`);
          if (r === 0) {
            const shotDash = path.join(SHOT_DIR, 'f6d2_03_gate_dash.png');
            await page.screenshot({ path: shotDash });
            await copyToArtifact(shotDash, 'f6d2_03_gate_dash.png');
          }
          await sleep(2700); // Wait for Arcane Dash sprint to finish
          break;
        }

        // Steer to spark if present and not yet collected
        if (state.spark && !sparkCollected && state.spark.z < 0.55) {
          currentLane = await steerToLane(currentLane, state.spark.lane);
          sparkCollected = true;
          console.log(`  ✨ Steered to Lane ${state.spark.lane} to collect Arcane Energy Spark (+5 XP)`);
          if (r === 0) {
            const shotSpark = path.join(SHOT_DIR, 'f6d2_02_spark_collect.png');
            await page.screenshot({ path: shotSpark });
            await copyToArtifact(shotSpark, 'f6d2_02_spark_collect.png');
          }
        }

        // Steer to target gate when gate reaches z >= 0.40
        if (state.targetGate && !gateSteered && (sparkCollected || state.targetGate.z >= 0.40)) {
          currentLane = await steerToLane(currentLane, state.targetGate.lane);
          gateSteered = true;
          console.log(`  🎯 Steered to Lane ${state.targetGate.lane} for target gate "${state.targetGate.word}"`);
        }

        await sleep(80);
      }
    }

    // ── 3. Round 6 of Attempt 1: Intentional KO to test Retry ──
    console.log('\n--- Attempt 1, Round 6 (Intentional Mistake to test KO & Retry) ---');
    const q6Data = await page.evaluate(() => {
      const text = document.querySelector('.connector-sentence-text')?.textContent || '';
      const hook = window.__CONNECTOR_RELAY_TEST_HOOK__;
      return {
        domText: text,
        question: hook?.getCurrentQuestion(),
        hearts: hook?.getHearts(),
      };
    });
    testReport.attempt1_questions.push(q6Data.question?.sentence || q6Data.domText);
    console.log(`  Sentence R6: "${q6Data.question?.sentence || q6Data.domText}"`);

    // Steer into WRONG gate twice until KO
    for (let mistake = 1; mistake <= 2; mistake++) {
      console.log(`  💥 Intentional Mistake #${mistake}...`);
      // Wait for distractor gate
      await page.waitForFunction(() => {
        const ents = window.__CONNECTOR_RELAY_TEST_HOOK__?.getCurrentEntities() || [];
        return ents.some(e => e.type === 'distractor_connector' && !e.passed);
      }, { timeout: 20000 });

      const wrongGate = await page.evaluate(() => {
        const ents = window.__CONNECTOR_RELAY_TEST_HOOK__?.getCurrentEntities() || [];
        return ents.find(e => e.type === 'distractor_connector' && !e.passed);
      });

      currentLane = await steerToLane(currentLane, wrongGate.lane);
      console.log(`  Steered to Lane ${wrongGate.lane} for wrong gate "${wrongGate.word}"`);

      // Wait for wrong event
      await page.waitForFunction((count) => {
        const events = window.__CONNECTOR_RELAY_EVENT_LOG__ || [];
        return events.filter(e => e.type === 'wrong').length >= count;
      }, { timeout: 35000 }, mistake);

      const hp = await page.evaluate(() => window.__CONNECTOR_RELAY_TEST_HOOK__?.getHearts());
      console.log(`  ⚡ Hearts remaining after mistake #${mistake}: ${hp}`);

      if (mistake === 1) {
        const shotWrong = path.join(SHOT_DIR, 'f6d2_04_wrong_gate_penalty.png');
        await page.screenshot({ path: shotWrong });
        await copyToArtifact(shotWrong, 'f6d2_04_wrong_gate_penalty.png');
        await sleep(2000); // Wait for respawn
      }
    }

    // Wait for KO Modal
    await page.waitForSelector('.connector-ko-modal, .ko-card', { timeout: 8000 });
    const attempt1End = Date.now();
    console.log('💀 KO Screen reached as expected (0 hearts).');
    const shotKO = path.join(SHOT_DIR, 'f6d2_05_ko_screen.png');
    await page.screenshot({ path: shotKO });
    await copyToArtifact(shotKO, 'f6d2_05_ko_screen.png');

    // ── 4. Click Retry to Test Session Exclusion Queue ──
    console.log('\n🔄 Step 4: Clicking Retry (Testing Session Exclusion Queue E[overlap]=0)...');
    await page.evaluate(() => {
      const retryBtn = document.querySelector('.retry-btn, button.retry-door-btn');
      if (retryBtn) retryBtn.click();
    });

    await sleep(1500);

    // ── 5. Play Retry 1 (Rounds 1–6) & Verify Disjoint Questions ──
    console.log('\n🎮 Step 5: Recording Retry 1 Questions & Verifying Zero Overlap...');
    const retry1Start = Date.now();

    for (let r = 0; r < 6; r++) {
      console.log(`\n--- Retry 1, Round ${r + 1} ---`);

      const qRetry = await page.evaluate(() => {
        const text = document.querySelector('.connector-sentence-text')?.textContent || '';
        const hook = window.__CONNECTOR_RELAY_TEST_HOOK__;
        return {
          domText: text,
          question: hook?.getCurrentQuestion(),
          hearts: hook?.getHearts(),
          score: hook?.getScore(),
        };
      });

      testReport.retry1_questions.push(qRetry.question?.sentence || qRetry.domText);
      console.log(`  Sentence: "${qRetry.question?.sentence || qRetry.domText}"`);
      console.log(`  Target: "${qRetry.question?.answer}" | Hearts: ${qRetry.hearts} | Score: ${qRetry.score}`);

      if (r === 0) {
        const shotRetryStart = path.join(SHOT_DIR, 'f6d2_06_retry1_new_pool.png');
        await page.screenshot({ path: shotRetryStart });
        await copyToArtifact(shotRetryStart, 'f6d2_06_retry1_new_pool.png');
      }

      // Steer to target gate lane and complete round
      const currentEventsCount = await page.evaluate(() => (window.__CONNECTOR_RELAY_EVENT_LOG__ || []).length);
      let gateSteered = false;

      while (true) {
        const state = await page.evaluate(() => {
          const ents = window.__CONNECTOR_RELAY_TEST_HOOK__?.getCurrentEntities() || [];
          const targetGate = ents.find(e => e.type === 'target_connector' && !e.passed && !e.collected);
          const events = window.__CONNECTOR_RELAY_EVENT_LOG__ || [];
          return { targetGate, eventCount: events.length, lastEvent: events[events.length - 1] };
        });

        if (state.eventCount > currentEventsCount && state.lastEvent?.type === 'correct') {
          console.log(`  ✓ Passed gate "${state.lastEvent.word}"!`);
          await sleep(2700); // Arcane Dash sprint wait
          break;
        }

        if (state.targetGate && !gateSteered) {
          currentLane = await steerToLane(currentLane, state.targetGate.lane);
          gateSteered = true;
          console.log(`  🎯 Steered to Lane ${state.targetGate.lane} for target gate "${state.targetGate.word}"`);
        }

        await sleep(80);
      }
    }

    // ── 6. Verify Victory Cleared Screen ──
    console.log('\n🏆 Step 6: Waiting for Skyway Bridge Energized (Cleared Screen)...');
    await page.waitForSelector('.connector-cleared-modal, .cleared-card', { timeout: 10000 });
    const retry1End = Date.now();
    console.log('🎉 Cleared Victory Screen reached!');

    const finalState = await page.evaluate(() => {
      const scoreText = document.querySelector('.cleared-score strong')?.textContent || '';
      const fullText = document.querySelector('.cleared-full-text')?.textContent || '';
      const stars = document.querySelector('.cleared-stars')?.textContent || '';
      const hook = window.__CONNECTOR_RELAY_TEST_HOOK__;
      return { scoreText, fullText, stars, timeLeft: hook?.getTimeLeft?.() };
    });

    console.log(`  Final Score: ${finalState.scoreText}`);
    console.log(`  Stars: ${finalState.stars}`);
    console.log(`  Message: ${finalState.fullText}`);
    console.log(`  DOM TimeLeft remaining: ${finalState.timeLeft}s`);

    const shotVictory = path.join(SHOT_DIR, 'f6d2_07_victory_cleared.png');
    await page.screenshot({ path: shotVictory });
    await copyToArtifact(shotVictory, 'f6d2_07_victory_cleared.png');

    // ── 7. Overlap Analysis ──
    console.log('\n📊 Step 7: Session Exclusion Queue Overlap Analysis:');
    console.log('  Attempt 1 Sentences (6):');
    testReport.attempt1_questions.forEach((q, i) => console.log(`    ${i + 1}. "${q}"`));

    console.log('\n  Retry 1 Sentences (6):');
    testReport.retry1_questions.forEach((q, i) => console.log(`    ${i + 1}. "${q}"`));

    const overlaps = testReport.attempt1_questions.filter(q1 => testReport.retry1_questions.includes(q1));
    testReport.overlap_count = overlaps.length;

    console.log(`\n  >> Overlap Count: ${overlaps.length} questions`);
    if (overlaps.length === 0) {
      console.log('  ✅ ZERO OVERLAP VERIFIED! E[overlap] = 0.0 questions (100% disjoint session pool).');
    } else {
      console.error(`  ❌ OVERLAP DETECTED (${overlaps.length} questions):`, overlaps);
    }

    // ── 8. Macro Timer Analysis ──
    const avgApproach = testReport.n2_timing.reduce((a, b) => a + b.approachTimeSec, 0) / testReport.n2_timing.length;
    const budgetSec = 160;
    testReport.macro_timer = {
      budget_sec: budgetSec,
      attempt1_elapsed_sec: Number(((attempt1End - attempt1Start) / 1000).toFixed(2)),
      retry1_elapsed_sec: Number(((retry1End - retry1Start) / 1000).toFixed(2)),
      measured_avg_approach_sec: Number(avgApproach.toFixed(2)),
      clean_run_time_consumed_sec: Number((6 * (avgApproach + 2.5)).toFixed(2)),
      clean_run_margin_sec: Number((budgetSec - (6 * (avgApproach + 2.5))).toFixed(2)),
      one_retry_time_consumed_sec: Number(((6 * (avgApproach + 2.5)) + avgApproach).toFixed(2)),
      one_retry_margin_sec: Number((budgetSec - ((6 * (avgApproach + 2.5)) + avgApproach)).toFixed(2)),
      dom_timer_remaining_sec: finalState.timeLeft,
    };

    console.log('\n⏱️ Step 8: Macro Timer Report:');
    console.log(`  Budget: ${testReport.macro_timer.budget_sec}s`);
    console.log(`  Measured Average Approach Time: ${testReport.macro_timer.measured_avg_approach_sec}s`);
    console.log(`  Clean Run Margin: +${testReport.macro_timer.clean_run_margin_sec}s (Formula vs budget ${budgetSec}s)`);
    console.log(`  1-Mistake Run Margin: +${testReport.macro_timer.one_retry_margin_sec}s (Formula vs budget ${budgetSec}s)`);
    console.log(`  Attempt 1 Elapsed: ${testReport.macro_timer.attempt1_elapsed_sec}s`);
    console.log(`  Retry 1 Elapsed: ${testReport.macro_timer.retry1_elapsed_sec}s`);
    console.log(`  DOM TimeLeft remaining on Cleared: ${testReport.macro_timer.dom_timer_remaining_sec}s`);

    testReport.passed = (overlaps.length === 0 && testReport.n2_timing.every(t => t.marginVsWorstCase >= 3.0));

  } catch (err) {
    console.error('❌ Playtest error:', err);
    testReport.error = err.message;
  } finally {
    const logPath = path.join(SHOT_DIR, 'f6d2_playtest_report.json');
    fs.writeFileSync(logPath, JSON.stringify(testReport, null, 2));
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'f6d2_playtest_report.json'), JSON.stringify(testReport, null, 2));
    console.log(`\n📋 Full playtest log saved: ${logPath}`);
    await browser.close();
  }
}

main();
