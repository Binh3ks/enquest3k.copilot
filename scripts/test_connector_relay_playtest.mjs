import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const SCREENSHOT_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_DIR = path.resolve('/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runFullConnectorRelaySuite() {
  console.log('\n================================================================================');
  console.log('>>> VIỆC SS & TT: PLAYTEST TOÀN DIỆN CONNECTOR RELAY (4/4 TỔ HỢP + ANTI-LEAK) <<<');
  console.log('================================================================================\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 750 });

    // ─────────────────────────────────────────────────────────────────────────
    // TỔ HỢP 1: W33 — CHỌN ĐÚNG CỔNG LIÊN TỪ ("because") -> SUCCESS
    // ─────────────────────────────────────────────────────────────────────────
    console.log('--- TỔ HỢP 1: W33 SUCCESS (Chọn đúng làn "because" -> Bridge Energized) ---');
    await page.goto(`${BASE_URL}/week/33/chronicles?room=5&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    let doorBtns = await page.$$('.dr-door-enter-btn');
    if (!doorBtns || doorBtns.length < 2) throw new Error('Door buttons not found on W33 Room 5');
    await doorBtns[1].click(); // Door 2 (Connector Relay)
    await new Promise(r => setTimeout(r, 800));

    const w33Success = await page.evaluate(async () => {
      const hook = window.__CONNECTOR_RELAY_TEST_HOOK__;
      hook.clearEntities();
      hook.setHeartsVal(3);
      hook.resetInvincible();
      hook.setTargetLane(1);
      window.__CONNECTOR_RELAY_EVENT_LOG__ = [];
      await new Promise(r => setTimeout(r, 100));

      const initialScore = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const initialHeartsDOM = document.querySelectorAll('.hud-heart-full').length;
      const initialHeartsHook = hook.getHearts();

      // Inject correct gate 'because' at center lane (lane 1)
      hook.injectGateWave(0.86, [
        { text: 'although', isCorrect: false },
        { text: 'because', isCorrect: true },
        { text: 'unless', isCorrect: false }
      ]);

      await new Promise(r => setTimeout(r, 200));

      const toast = document.querySelector('.connector-toast-pill')?.innerText?.trim() || '';
      const scoreAfter = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const heartsDOMAfter = document.querySelectorAll('.hud-heart-full').length;
      const heartsHookAfter = hook.getHearts();

      return {
        question: hook.getCurrentQuestion()?.sentence,
        answer: hook.getCurrentQuestion()?.answer,
        initialScore,
        scoreAfter,
        scoreDelta: scoreAfter - initialScore,
        initialHeartsDOM,
        heartsDOMAfter,
        initialHeartsHook,
        heartsHookAfter,
        toast,
      };
    });

    console.log('[W33 Question]:', w33Success.question);
    console.log('[W33 Target Answer]:', w33Success.answer);
    console.log('[W33 Collision Toast]:', `"${w33Success.toast}"`);
    console.log(`[W33 Score HUD]: ${w33Success.initialScore} -> ${w33Success.scoreAfter} (+${w33Success.scoreDelta} XP)`);
    console.log(`[W33 Hearts DOM]: ${w33Success.initialHeartsDOM} -> ${w33Success.heartsDOMAfter} (Hook: ${w33Success.initialHeartsHook} -> ${w33Success.heartsHookAfter})`);

    const pass1 = w33Success.scoreDelta === 40 &&
                  w33Success.heartsDOMAfter === 3 &&
                  w33Success.toast.includes('BRIDGE ENERGIZED') &&
                  w33Success.toast.includes('because');
    console.log(`[Tổ hợp 1 Assertion]: Bridge energized & +40 XP & no heart penalty? => ${pass1 ? 'PASS ✅' : 'FAIL ❌'}\n`);

    const shot1 = path.join(SCREENSHOT_DIR, 'w33_connector_relay_success_live.png');
    await page.screenshot({ path: shot1 });
    fs.copyFileSync(shot1, path.join(BRAIN_DIR, 'w33_connector_relay_success_live.png'));

    // ─────────────────────────────────────────────────────────────────────────
    // TỔ HỢP 2: W33 — VA CHẠM CỔNG LIÊN TỪ SAI ("although") -> HAZARD / -1 TIM
    // ─────────────────────────────────────────────────────────────────────────
    console.log('--- TỔ HỢP 2: W33 HAZARD (Va chạm nhầm cổng "although" -> Trừ 1 Tim) ---');
    await page.goto(`${BASE_URL}/week/33/chronicles?room=5&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[1].click(); // Door 2
    await new Promise(r => setTimeout(r, 800));

    const w33Hazard = await page.evaluate(async () => {
      const hook = window.__CONNECTOR_RELAY_TEST_HOOK__;
      hook.clearEntities();
      hook.setHeartsVal(3);
      hook.resetInvincible();
      hook.setTargetLane(1);
      window.__CONNECTOR_RELAY_EVENT_LOG__ = [];
      await new Promise(r => setTimeout(r, 100));

      const initialScore = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const initialHeartsDOM = document.querySelectorAll('.hud-heart-full').length;
      const initialHeartsHook = hook.getHearts();

      // Inject wrong gate 'although' at center lane (lane 1)
      hook.injectGateWave(0.86, [
        { text: 'because', isCorrect: true },
        { text: 'although', isCorrect: false },
        { text: 'unless', isCorrect: false }
      ]);

      await new Promise(r => setTimeout(r, 200));

      const toast = document.querySelector('.connector-toast-pill')?.innerText?.trim() || '';
      const scoreAfter = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const heartsDOMAfter = document.querySelectorAll('.hud-heart-full').length;
      const heartsHookAfter = hook.getHearts();

      return {
        initialScore,
        scoreAfter,
        scoreDelta: scoreAfter - initialScore,
        initialHeartsDOM,
        heartsDOMAfter,
        initialHeartsHook,
        heartsHookAfter,
        toast,
      };
    });

    console.log('[W33 Hazard Collision Toast]:', `"${w33Hazard.toast}"`);
    console.log(`[W33 Hazard Score HUD]: ${w33Hazard.initialScore} -> ${w33Hazard.scoreAfter} (+${w33Hazard.scoreDelta} XP)`);
    console.log(`[W33 Hazard Hearts DOM]: ${w33Hazard.initialHeartsDOM} -> ${w33Hazard.heartsDOMAfter} (Expected: 3 -> 2)`);
    console.log(`[W33 Hazard Hearts Hook]: ${w33Hazard.initialHeartsHook} -> ${w33Hazard.heartsHookAfter} (Expected: 3 -> 2)`);

    const pass2 = w33Hazard.scoreDelta === 0 &&
                  w33Hazard.heartsDOMAfter === 2 &&
                  w33Hazard.heartsHookAfter === 2 &&
                  w33Hazard.toast.includes('WRONG CONNECTOR');
    console.log(`[Tổ hợp 2 Assertion]: Distractor triggered heart penalty (-1 heart) & warning toast? => ${pass2 ? 'PASS ✅' : 'FAIL ❌'}\n`);

    const shot2 = path.join(SCREENSHOT_DIR, 'w33_connector_relay_hazard_live.png');
    await page.screenshot({ path: shot2 });
    fs.copyFileSync(shot2, path.join(BRAIN_DIR, 'w33_connector_relay_hazard_live.png'));

    // ─────────────────────────────────────────────────────────────────────────
    // TỔ HỢP 3: W35 — CHỌN ĐÚNG CỔNG LIÊN TỪ ("While") -> SUCCESS
    // ─────────────────────────────────────────────────────────────────────────
    console.log('--- TỔ HỢP 3: W35 SUCCESS (Chọn đúng làn "While" -> Bridge Energized) ---');
    await page.goto(`${BASE_URL}/week/35/chronicles?room=5&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    doorBtns = await page.$$('.dr-door-enter-btn');
    if (!doorBtns || doorBtns.length < 2) throw new Error('Door buttons not found on W35 Room 5');
    await doorBtns[1].click(); // Door 2 (Connector Relay)
    await new Promise(r => setTimeout(r, 800));

    const w35Success = await page.evaluate(async () => {
      const hook = window.__CONNECTOR_RELAY_TEST_HOOK__;
      hook.clearEntities();
      hook.setHeartsVal(3);
      hook.resetInvincible();
      hook.setTargetLane(1);
      window.__CONNECTOR_RELAY_EVENT_LOG__ = [];
      await new Promise(r => setTimeout(r, 100));

      const initialScore = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const initialHeartsDOM = document.querySelectorAll('.hud-heart-full').length;
      const initialHeartsHook = hook.getHearts();
      const targetAns = hook.getCurrentQuestion()?.answer || 'While';

      // Inject correct gate at center lane (lane 1)
      hook.injectGateWave(0.86, [
        { text: 'Because', isCorrect: false },
        { text: targetAns, isCorrect: true },
        { text: 'So', isCorrect: false }
      ]);

      await new Promise(r => setTimeout(r, 200));

      const toast = document.querySelector('.connector-toast-pill')?.innerText?.trim() || '';
      const scoreAfter = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const heartsDOMAfter = document.querySelectorAll('.hud-heart-full').length;
      const heartsHookAfter = hook.getHearts();

      return {
        question: hook.getCurrentQuestion()?.sentence,
        answer: targetAns,
        initialScore,
        scoreAfter,
        scoreDelta: scoreAfter - initialScore,
        initialHeartsDOM,
        heartsDOMAfter,
        initialHeartsHook,
        heartsHookAfter,
        toast,
      };
    });

    console.log('[W35 Question]:', w35Success.question);
    console.log('[W35 Target Answer]:', w35Success.answer);
    console.log('[W35 Collision Toast]:', `"${w35Success.toast}"`);
    console.log(`[W35 Score HUD]: ${w35Success.initialScore} -> ${w35Success.scoreAfter} (+${w35Success.scoreDelta} XP)`);
    console.log(`[W35 Hearts DOM]: ${w35Success.initialHeartsDOM} -> ${w35Success.heartsDOMAfter} (Hook: ${w35Success.initialHeartsHook} -> ${w35Success.heartsHookAfter})`);

    const pass3 = w35Success.scoreDelta === 40 &&
                  w35Success.heartsDOMAfter === 3 &&
                  w35Success.toast.includes('BRIDGE ENERGIZED');
    console.log(`[Tổ hợp 3 Assertion]: W35 Bridge energized & +40 XP & no heart penalty? => ${pass3 ? 'PASS ✅' : 'FAIL ❌'}\n`);

    const shot3 = path.join(SCREENSHOT_DIR, 'w35_connector_relay_success_live.png');
    await page.screenshot({ path: shot3 });
    fs.copyFileSync(shot3, path.join(BRAIN_DIR, 'w35_connector_relay_success_live.png'));

    // ─────────────────────────────────────────────────────────────────────────
    // TỔ HỢP 4: W35 — VA CHẠM CỔNG LIÊN TỪ SAI ("so") -> HAZARD / -1 TIM
    // ─────────────────────────────────────────────────────────────────────────
    console.log('--- TỔ HỢP 4: W35 HAZARD (Va chạm nhầm cổng "so" -> Trừ 1 Tim) ---');
    await page.goto(`${BASE_URL}/week/35/chronicles?room=5&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[1].click(); // Door 2
    await new Promise(r => setTimeout(r, 800));

    const w35Hazard = await page.evaluate(async () => {
      const hook = window.__CONNECTOR_RELAY_TEST_HOOK__;
      hook.clearEntities();
      hook.setHeartsVal(3);
      hook.resetInvincible();
      hook.setTargetLane(1);
      window.__CONNECTOR_RELAY_EVENT_LOG__ = [];
      await new Promise(r => setTimeout(r, 100));

      const initialScore = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const initialHeartsDOM = document.querySelectorAll('.hud-heart-full').length;
      const initialHeartsHook = hook.getHearts();

      // Inject wrong gate 'so' at center lane (lane 1)
      hook.injectGateWave(0.86, [
        { text: 'while', isCorrect: true },
        { text: 'so', isCorrect: false },
        { text: 'unless', isCorrect: false }
      ]);

      await new Promise(r => setTimeout(r, 200));

      const toast = document.querySelector('.connector-toast-pill')?.innerText?.trim() || '';
      const scoreAfter = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const heartsDOMAfter = document.querySelectorAll('.hud-heart-full').length;
      const heartsHookAfter = hook.getHearts();

      return {
        initialScore,
        scoreAfter,
        scoreDelta: scoreAfter - initialScore,
        initialHeartsDOM,
        heartsDOMAfter,
        initialHeartsHook,
        heartsHookAfter,
        toast,
      };
    });

    console.log('[W35 Hazard Collision Toast]:', `"${w35Hazard.toast}"`);
    console.log(`[W35 Hazard Score HUD]: ${w35Hazard.initialScore} -> ${w35Hazard.scoreAfter} (+${w35Hazard.scoreDelta} XP)`);
    console.log(`[W35 Hazard Hearts DOM]: ${w35Hazard.initialHeartsDOM} -> ${w35Hazard.heartsDOMAfter} (Expected: 3 -> 2)`);
    console.log(`[W35 Hazard Hearts Hook]: ${w35Hazard.initialHeartsHook} -> ${w35Hazard.heartsHookAfter} (Expected: 3 -> 2)`);

    const pass4 = w35Hazard.scoreDelta === 0 &&
                  w35Hazard.heartsDOMAfter === 2 &&
                  w35Hazard.heartsHookAfter === 2 &&
                  w35Hazard.toast.includes('WRONG CONNECTOR');
    console.log(`[Tổ hợp 4 Assertion]: Distractor triggered heart penalty (-1 heart) & warning toast? => ${pass4 ? 'PASS ✅' : 'FAIL ❌'}\n`);

    const shot4 = path.join(SCREENSHOT_DIR, 'w35_connector_relay_hazard_live.png');
    await page.screenshot({ path: shot4 });
    fs.copyFileSync(shot4, path.join(BRAIN_DIR, 'w35_connector_relay_hazard_live.png'));

    // ─────────────────────────────────────────────────────────────────────────
    // PHẦN 5: ANTI-LEAK GATEWAY QUESTION TRANSITION VERIFICATION
    // ─────────────────────────────────────────────────────────────────────────
    console.log('--- PHẦN 5: ANTI-LEAK GATEWAY QUESTION TRANSITION VERIFICATION ---');
    const antiLeak = await page.evaluate(async () => {
      const hook = window.__CONNECTOR_RELAY_TEST_HOOK__;
      const initialRound = hook.getRoundIdx();
      const initialRoundId = initialRound + 1;

      // Inject dummy gates tagged with initialRoundId
      hook.injectGateWave(0.4, [
        { text: 'and', isCorrect: true },
        { text: 'or', isCorrect: false },
        { text: 'but', isCorrect: false }
      ]);
      const initialStaleCount = hook.getStaleEntities(initialRoundId).length;

      // Advance to next Question Gateway (Gateway 0 -> Gateway 1)
      hook.advanceToRound(initialRound + 1);
      await new Promise(r => setTimeout(r, 400));

      const newRound = hook.getRoundIdx();
      const remainingOldCount = hook.getStaleEntities(initialRoundId).length;
      const newRoundEntities = hook.getCurrentEntities().length;

      return {
        initialRound,
        newRound,
        initialStaleCount,
        remainingOldCount,
        newRoundEntities
      };
    });

    console.log(`[Question Gateway Transition]: Gateway Chặng ${antiLeak.initialRound + 1} (idx: ${antiLeak.initialRound}) -> Gateway Chặng ${antiLeak.newRound + 1} (idx: ${antiLeak.newRound})`);
    console.log(`[Old Gateway Entities Before]: ${antiLeak.initialStaleCount}`);
    console.log(`[Old Gateway Entities Remaining After Transition]: ${antiLeak.remainingOldCount} (Expected: 0)`);
    console.log(`[New Gateway Spawned Entities]: ${antiLeak.newRoundEntities} (active for new gateway)`);

    const passAntiLeak = antiLeak.newRound === antiLeak.initialRound + 1 &&
                         antiLeak.remainingOldCount === 0;
    console.log(`[Anti-Leak Assertion]: Transition advanced correctly & old entities memory purged? => ${passAntiLeak ? 'PASS ✅' : 'FAIL ❌'}\n`);

    if (pass1 && pass2 && pass3 && pass4 && passAntiLeak) {
      console.log('================================================================================');
      console.log('>>> HOÀN THÀNH 100%: TẤT CẢ 4/4 TỔ HỢP VÀ ANTI-LEAK ĐỀU PASS TUYỆT ĐỐI! <<<');
      console.log('================================================================================\n');
    } else {
      console.error('>>> CÓ TỔ HỢP THẤT BẠI! KIỂM TRA LẠI! <<<\n');
      process.exit(1);
    }

  } finally {
    await browser.close();
  }
}

runFullConnectorRelaySuite().catch(err => {
  console.error('[PLAYTEST SUITE ERROR]:', err);
  process.exit(1);
});
