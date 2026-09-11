import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve('docs/agent_artifacts/screenshots');

async function testRound3ToRound5Deterministic() {
  console.log('\n========================================================================');
  console.log('>>> VIỆC OO: TEST RETEST ĐÚNG KỊCH BẢN ROUND 3 -> ROUND 5 PROGRESSION <<<');
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 750 });

    console.log('Step 1: Navigating to W33 Chronicles Gale Spire Room 5...');
    await page.goto(`${BASE_URL}/week/33/chronicles?room=5&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    const doorBtns = await page.$$('.dr-door-enter-btn');
    if (!doorBtns || doorBtns.length === 0) throw new Error('No door buttons found on Room 5');
    await doorBtns[0].click();
    await new Promise(r => setTimeout(r, 1200));

    console.log('Step 2: Entered Gale Spire Door 1 (Synonym Storm). Running forensic test in browser context...');

    const result = await page.evaluate(async () => {
      const logs = [];
      const hook = window.__SYNONYM_STORM_TEST_HOOK__;
      if (!hook) return { error: 'Test hook not mounted' };

      // ── Test 1: Enter Round 3 (idx 2) ──
      hook.advanceToRound(2);
      await new Promise(r => setTimeout(r, 400));
      const r3Pair = hook.getCurrentPair();
      logs.push(`[Check Round 3 Initial]: idx = ${hook.getRoundIdx()}, word = "${r3Pair.word}", match = "${r3Pair.match}"`);

      // Spawn/Inject target meteor 'slid' for Round 3
      hook.setLeoX(430);
      hook.injectMeteor({
        id: 'r3_valid_slid',
        x: 430,
        y: 450,
        vy: 100,
        word: 'slid',
        isTarget: true,
        targetRoot: 'slipped',
      });
      await new Promise(r => setTimeout(r, 400)); // allow collision frame

      const toastR3 = document.querySelector('.synonym-feedback-toast')?.innerText?.trim() || '';
      logs.push(`[Round 3 Collision Toast]: "${toastR3}"`);
      const r3Correct = toastR3.includes('slid') && toastR3.includes('slipped');
      logs.push(`[Round 3 Assertion]: Toast correctly matched "slid" with "slipped"? => ${r3Correct ? 'PASS ✅' : 'FAIL ❌'}`);

      // Wait for round transition callback (which clears meteors)
      await new Promise(r => setTimeout(r, 1300));
      const meteorsCountPostR3 = (hook.getCurrentMeteors() || []).length;
      logs.push(`[Round 3 Post-Transition Cleanup]: meteors.length = ${meteorsCountPostR3} (Expected: 0 stale meteors)`);

      // ── Test 2: Transition to Round 5 (idx 4) ──
      hook.advanceToRound(4);
      await new Promise(r => setTimeout(r, 400));
      const r5Pair = hook.getCurrentPair();
      logs.push(`[Check Round 5 Initial]: idx = ${hook.getRoundIdx()}, word = "${r5Pair.word}", match = "${r5Pair.match}"`);

      // ── Test 3: STRESS TEST CỐ Ý TÁI TẠO LỖI GỐC ──
      // Bơm thiên thạch cũ 'slid' (từ Round 3: targetRoot 'slipped') vào Round 5 ('rapid') và cho Leo chạm trực tiếp!
      const scoreBeforeStale = parseInt(document.querySelector('.hud-score')?.innerText?.replace(/\D/g, '') || '0', 10);
      hook.setLeoX(430);
      hook.injectMeteor({
        id: 'stale_orphan_slid_meteor',
        x: 430,
        y: 450,
        vy: 100,
        word: 'slid',
        isTarget: true,
        targetRoot: 'slipped', // root cũ của round 3
      });
      await new Promise(r => setTimeout(r, 500)); // allow physics frame to process collision

      const toastAfterStale = document.querySelector('.synonym-feedback-toast')?.innerText?.trim() || '';
      const scoreAfterStale = parseInt(document.querySelector('.hud-score')?.innerText?.replace(/\D/g, '') || '0', 10);
      const invalidLeakOccurred = toastAfterStale.includes('slid') && toastAfterStale.includes('rapid');

      logs.push(`[Stress Test Toast]: "${toastAfterStale}"`);
      logs.push(`[Stress Test Score Delta]: ${scoreAfterStale - scoreBeforeStale} XP`);
      logs.push(`[Stress Test Leak Check]: Did "slid matches rapid" occur? => ${invalidLeakOccurred ? 'FAIL ❌ (LEAK DETECTED!)' : 'PASS ✅ (PROTECTED & BLOCKED!)'}`);

      // ── Test 4: Deflect REAL Round 5 target ('quick') ──
      hook.injectMeteor({
        id: 'r5_valid_quick',
        x: 430,
        y: 450,
        vy: 100,
        word: 'quick',
        isTarget: true,
        targetRoot: 'rapid', // root chuẩn của round 5
      });
      await new Promise(r => setTimeout(r, 500)); // allow physics frame

      const toastR5 = document.querySelector('.synonym-feedback-toast')?.innerText?.trim() || '';
      const r5Correct = toastR5.includes('quick') && toastR5.includes('rapid');
      logs.push(`[Round 5 Real Deflect Toast]: "${toastR5}"`);
      logs.push(`[Round 5 Real Deflect Assertion]: Toast correctly matched "quick" with "rapid"? => ${r5Correct ? 'PASS ✅' : 'FAIL ❌'}`);

      const allEventLogs = window.__SYNONYM_STORM_EVENT_LOG__ || [];
      const hasCorruptedHistory = allEventLogs.some(l => 
        (l.word === 'slid' && l.targetRoot === 'rapid') ||
        (l.text && l.text.includes('slid') && l.text.includes('rapid'))
      );

      return {
        logs,
        r3Correct,
        meteorsCountPostR3,
        invalidLeakOccurred,
        r5Correct,
        hasCorruptedHistory,
        allEventLogs,
        finalScore: document.querySelector('.hud-score')?.innerText?.trim() || '',
        batteryPct: document.querySelector('.battery-pct')?.innerText?.trim() || '',
        roundChip: document.querySelector('.synonym-round-chip')?.innerText?.trim() || '',
      };
    });

    console.log('--- VERBATIM FORENSIC EXECUTION LOGS ---');
    for (const l of result.logs) {
      console.log('  ' + l);
    }

    console.log('\n--- FORENSIC ASSERTION REPORT ---');
    console.log(`1. Round 3 Matched Correctly ("slid" matches "slipped"): ${result.r3Correct ? 'PASS ✅' : 'FAIL ❌'}`);
    console.log(`2. Meteors Reset to 0 after Round 3 transition: ${result.meteorsCountPostR3 === 0 ? 'PASS ✅ (length = 0)' : 'FAIL ❌ (length = ' + result.meteorsCountPostR3 + ')'}`);
    console.log(`3. Stale Meteor "slid" Blocked from Matching "rapid": ${!result.invalidLeakOccurred ? 'PASS ✅ (ZERO LEAK)' : 'FAIL ❌'}`);
    console.log(`4. Round 5 Real Target Matched ("quick" matches "rapid"): ${result.r5Correct ? 'PASS ✅' : 'FAIL ❌'}`);
    console.log(`5. Any Corrupted Log ("slid" matches "rapid") in Event History? => ${result.hasCorruptedHistory ? 'FAIL ❌' : 'PASS ✅ (NONE)'}`);
    console.log(`6. Final HUD Score: ${result.finalScore}`);
    console.log(`7. Final Battery: ${result.batteryPct}`);
    console.log(`8. Current UI Round: ${result.roundChip}`);

    console.log('\nAll Recorded Events:');
    console.log(JSON.stringify(result.allEventLogs, null, 2));

    const snapPath = path.join(OUTPUT_DIR, 'w33_round3_to_round5_forensic_verified.png');
    await page.screenshot({ path: snapPath });
    fs.copyFileSync(snapPath, '/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/w33_round3_to_round5_forensic_verified.png');
    console.log(`\nScreenshot saved and copied to brain artifact dir: ${snapPath}`);

  } finally {
    await browser.close();
  }
}

testRound3ToRound5Deterministic().catch(console.error);
