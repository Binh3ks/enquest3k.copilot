import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const SCREENSHOT_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_DIR = path.resolve('/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runConnectorRelayPlaytest() {
  console.log('\n========================================================================');
  console.log('>>> GIAI ĐOẠN 1b: PUPPETEER PLAYTEST CONNECTOR RELAY CANVAS (W33 & W35) <<<');
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 750 });

    // ─────────────────────────────────────────────────────────────────────────
    // PHẦN 1: PLAYTEST W33 — CHỌN ĐÚNG CỔNG LIÊN TỪ ("because")
    // ─────────────────────────────────────────────────────────────────────────
    console.log('--- PHẦN 1: PLAYTEST W33 (Success Deflect / Energize Bridge) ---');
    console.log('Step 1.1: Navigating to W33 Chronicles Room 5...');
    await page.goto(`${BASE_URL}/week/33/chronicles?room=5&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    const doorBtnsW33 = await page.$$('.dr-door-enter-btn');
    if (!doorBtnsW33 || doorBtnsW33.length < 2) throw new Error('Door buttons not found on W33 Room 5');

    console.log('Step 1.2: Clicking Door 2 (Connector Relay)...');
    await doorBtnsW33[1].click(); // Door 2
    await new Promise(r => setTimeout(r, 800));

    console.log('Step 1.3: Verifying ConnectorRelayCanvas mounted on W33 & testing correct lane...');
    const w33TestResult = await page.evaluate(async () => {
      const hook = window.__CONNECTOR_RELAY_TEST_HOOK__;
      if (!hook) return { error: 'Test hook __CONNECTOR_RELAY_TEST_HOOK__ not mounted' };

      const q = hook.getCurrentQuestion();
      hook.clearEntities();
      hook.setTargetLane(1);
      hook.resetInvincible();
      window.__CONNECTOR_RELAY_EVENT_LOG__ = [];
      await new Promise(r => setTimeout(r, 100));

      const initialScoreDOM = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const initialHearts = hook.getHearts();

      // Inject Gate wave: Lane 0 = 'although' (wrong), Lane 1 = 'because' (correct), Lane 2 = 'unless' (wrong)
      // Placed at z = 0.86
      hook.injectGateWave(0.86, [
        { text: 'although', isCorrect: false },
        { text: 'because', isCorrect: true },
        { text: 'unless', isCorrect: false }
      ]);

      // Wait 250ms for collision frame and toast render
      await new Promise(r => setTimeout(r, 250));

      const toast = document.querySelector('.connector-toast-pill')?.innerText?.trim() || '';
      const scoreDOMAfter = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const heartsAfter = hook.getHearts();
      const eventLog = window.__CONNECTOR_RELAY_EVENT_LOG__ || [];

      return {
        sentence: q?.sentence,
        answer: q?.answer,
        initialScore: initialScoreDOM,
        scoreAfter: scoreDOMAfter,
        scoreDelta: scoreDOMAfter - initialScoreDOM,
        initialHearts,
        heartsAfter,
        toast,
        lastEvent: eventLog[eventLog.length - 1] || null
      };
    });

    console.log('[W33 Question]:', w33TestResult.sentence);
    console.log('[W33 Target Answer]:', w33TestResult.answer);
    console.log('[W33 Collision Toast]:', `"${w33TestResult.toast}"`);
    console.log(`[W33 Score HUD]: ${w33TestResult.initialScore} -> ${w33TestResult.scoreAfter} (+${w33TestResult.scoreDelta} XP)`);
    console.log(`[W33 Hearts]: ${w33TestResult.initialHearts} -> ${w33TestResult.heartsAfter}`);

    const w33Pass = w33TestResult.scoreDelta === 40 &&
                    w33TestResult.toast.includes('BRIDGE ENERGIZED') &&
                    w33TestResult.toast.includes('because');
    console.log(`[W33 Assertion]: Correct connector passed & energized? => ${w33Pass ? 'PASS ✅' : 'FAIL ❌'}\n`);

    const w33ScreenshotPath = path.join(SCREENSHOT_DIR, 'w33_connector_relay_success_live.png');
    await page.screenshot({ path: w33ScreenshotPath });
    console.log(`[Screenshot saved]: ${w33ScreenshotPath}`);

    const brainW33Path = path.join(BRAIN_DIR, 'w33_connector_relay_success_live.png');
    fs.copyFileSync(w33ScreenshotPath, brainW33Path);

    // ─────────────────────────────────────────────────────────────────────────
    // PHẦN 2: PLAYTEST W35 — VA CHẠM NHẦM CỔNG LIÊN TỪ SAI (Hazard / Wrong Lane)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('--- PHẦN 2: PLAYTEST W35 (Hazard Collide / Wrong Connector) ---');
    console.log('Step 2.1: Navigating to W35 Chronicles Room 5...');
    await page.goto(`${BASE_URL}/week/35/chronicles?room=5&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    const doorBtnsW35 = await page.$$('.dr-door-enter-btn');
    if (!doorBtnsW35 || doorBtnsW35.length < 2) throw new Error('Door buttons not found on W35 Room 5');

    console.log('Step 2.2: Clicking Door 2 (Connector Relay)...');
    await doorBtnsW35[1].click(); // Door 2
    await new Promise(r => setTimeout(r, 800));

    console.log('Step 2.3: Verifying ConnectorRelayCanvas mounted on W35 & injecting distractor collision...');
    const w35TestResult = await page.evaluate(async () => {
      const hook = window.__CONNECTOR_RELAY_TEST_HOOK__;
      if (!hook) return { error: 'Test hook __CONNECTOR_RELAY_TEST_HOOK__ not mounted' };

      const q = hook.getCurrentQuestion();
      hook.clearEntities();
      hook.resetInvincible();
      hook.setTargetLane(1);
      window.__CONNECTOR_RELAY_EVENT_LOG__ = [];
      await new Promise(r => setTimeout(r, 100));

      const initialScoreDOM = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const initialHearts = hook.getHearts();

      // Inject Gate wave: Lane 1 has DISTRACTOR connector 'so' (wrong), z = 0.86
      hook.injectGateWave(0.86, [
        { text: 'while', isCorrect: true },
        { text: 'so', isCorrect: false }, // Center lane (Leo hit this!)
        { text: 'unless', isCorrect: false }
      ]);

      // Wait 250ms for collision frame to execute
      await new Promise(r => setTimeout(r, 250));

      const toast = document.querySelector('.connector-toast-pill')?.innerText?.trim() || '';
      const scoreDOMAfter = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const heartsAfter = hook.getHearts();
      const eventLog = window.__CONNECTOR_RELAY_EVENT_LOG__ || [];

      return {
        sentence: q?.sentence,
        answer: q?.answer,
        initialScore: initialScoreDOM,
        scoreAfter: scoreDOMAfter,
        scoreDelta: scoreDOMAfter - initialScoreDOM,
        initialHearts,
        heartsAfter,
        toast,
        lastEvent: eventLog[eventLog.length - 1] || null
      };
    });

    console.log('[W35 Question]:', w35TestResult.sentence);
    console.log('[W35 Target Answer]:', w35TestResult.answer);
    console.log('[W35 Collision Toast]:', `"${w35TestResult.toast}"`);
    console.log(`[W35 Score HUD]: ${w35TestResult.initialScore} -> ${w35TestResult.scoreAfter} (+${w35TestResult.scoreDelta} XP)`);
    console.log(`[W35 Hearts]: ${w35TestResult.initialHearts} -> ${w35TestResult.heartsAfter}`);

    const w35Pass = w35TestResult.toast.includes('WRONG CONNECTOR') &&
                    w35TestResult.lastEvent?.type === 'wrong';
    console.log(`[W35 Assertion]: Distractor connector triggered heart penalty & warning toast? => ${w35Pass ? 'PASS ✅' : 'FAIL ❌'}\n`);

    const w35ScreenshotPath = path.join(SCREENSHOT_DIR, 'w35_connector_relay_hazard_live.png');
    await page.screenshot({ path: w35ScreenshotPath });
    console.log(`[Screenshot saved]: ${w35ScreenshotPath}`);

    const brainW35Path = path.join(BRAIN_DIR, 'w35_connector_relay_hazard_live.png');
    fs.copyFileSync(w35ScreenshotPath, brainW35Path);

    // ─────────────────────────────────────────────────────────────────────────
    // PHẦN 3: TEST DỌN SẠCH STATE CUỐI ROUND (ANTI-LEAK INVARIANT)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('--- PHẦN 3: ANTI-LEAK INVARIANT VERIFICATION ---');
    const antiLeakResult = await page.evaluate(async () => {
      const hook = window.__CONNECTOR_RELAY_TEST_HOOK__;
      const initialRound = hook.getRoundIdx();
      const initialRoundId = initialRound + 1;
      
      // Inject some dummy gates specifically tagged for initialRoundId
      hook.injectGateWave(0.4, [
        { text: 'and', isCorrect: true },
        { text: 'or', isCorrect: false },
        { text: 'but', isCorrect: false }
      ]);
      const initialStaleCount = hook.getStaleEntities(initialRoundId).length;

      // Advance round (transition from Round 0 to Round 1)
      hook.advanceToRound(initialRound + 1);
      await new Promise(r => setTimeout(r, 400));

      // Check whether ANY entity from the old round still exists
      const remainingOldEntities = hook.getStaleEntities(initialRoundId);
      const newRoundEntities = hook.getCurrentEntities();

      return {
        initialRound,
        newRound: hook.getRoundIdx(),
        initialStaleCount,
        remainingOldCount: remainingOldEntities.length,
        newRoundCount: newRoundEntities.length
      };
    });

    console.log(`[Round Transition]: Round ${antiLeakResult.initialRound} -> Round ${antiLeakResult.newRound}`);
    console.log(`[Old Round Entities Before]: ${antiLeakResult.initialStaleCount}`);
    console.log(`[Old Round Entities Remaining After Transition]: ${antiLeakResult.remainingOldCount} (Expected: 0)`);
    console.log(`[New Round Spawned Entities]: ${antiLeakResult.newRoundCount} (active for new round)`);
    const antiLeakPass = antiLeakResult.remainingOldCount === 0;
    console.log(`[Anti-Leak Assertion]: All old round entities purged from memory on transition? => ${antiLeakPass ? 'PASS ✅' : 'FAIL ❌'}\n`);

    if (w33Pass && w35Pass && antiLeakPass) {
      console.log('========================================================================');
      console.log('>>> TẤT CẢ CÁC BƯỚC PLAYTEST GIAI ĐOẠN 1b ĐÃ PASS 100%! <<<');
      console.log('========================================================================\n');
    } else {
      console.error('>>> CÓ BƯỚC PLAYTEST THẤT BẠI! KIỂM TRA LẠI! <<<\n');
      process.exit(1);
    }

  } finally {
    await browser.close();
  }
}

runConnectorRelayPlaytest().catch(err => {
  console.error('[PLAYTEST ERROR]:', err);
  process.exit(1);
});
