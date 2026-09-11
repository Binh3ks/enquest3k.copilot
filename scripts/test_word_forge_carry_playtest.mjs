import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const SCREENSHOT_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_DIR = path.resolve('/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runWordForgeSuite() {
  console.log('\n================================================================================');
  console.log('>>> HẠNG #3: WORD FORGE CARRY ENGINE — PLAYTEST FULL 4 TỔ HỢP + ANTI-LEAK <<<');
  console.log('================================================================================\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 750 });

    // ─────────────────────────────────────────────────────────────────────────
    // TỔ HỢP 1: W33 — SUCCESS (Nhặt đúng chữ cái đầu tiên "S" của "SLIP")
    // ─────────────────────────────────────────────────────────────────────────
    console.log('--- TỔ HỢP 1: W33 SUCCESS (Nhặt đúng rune "S" -> Hammered into Anvil) ---');
    await page.goto(`${BASE_URL}/week/33/chronicles?room=6&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    let doorBtns = await page.$$('.dr-door-enter-btn');
    if (!doorBtns || doorBtns.length === 0) throw new Error('Door buttons not found on Room 6 (Floor 7)');
    await doorBtns[0].click(); // Door 1: Word Forge Scramble
    await new Promise(r => setTimeout(r, 800));

    const w33Success = await page.evaluate(async () => {
      const hook = window.__WORD_FORGE_TEST_HOOK__;
      if (!hook) return { error: 'Hook not found' };

      hook.clearRunes();
      hook.setHeartsVal(3);
      hook.resetInvincible();
      window.__WORD_FORGE_EVENT_LOG__ = [];

      const targetWord = hook.getTargetWord(); // 'SLIP'
      const firstLetter = targetWord[0]; // 'S'

      // Inject rune 'S' on Anvil Deck (x: 350, y: 230)
      hook.injectRune(firstLetter, true, 350, 230);

      // Teleport Leo to Anvil Deck near rune
      hook.setLeoPosition(350, 230);
      await new Promise(r => setTimeout(r, 100));

      const initialScore = hook.getScore();
      const initialHeartsDOM = document.querySelectorAll('.hud-heart-full').length;

      // Pickup rune
      hook.simulatePickupRune(firstLetter);
      await new Promise(r => setTimeout(r, 100));

      // Trigger deposit onto anvil
      hook.triggerInteract();
      await new Promise(r => setTimeout(r, 250));

      const toast = document.querySelector('.forge-toast-pill')?.innerText?.trim() || '';
      const scoreAfter = hook.getScore();
      const heartsDOMAfter = document.querySelectorAll('.hud-heart-full').length;
      const forgedSlotsCount = document.querySelectorAll('.anvil-letter-socket.socket-forged').length;

      return {
        targetWord,
        firstLetter,
        initialScore,
        scoreAfter,
        scoreDelta: scoreAfter - initialScore,
        initialHeartsDOM,
        heartsDOMAfter,
        forgedSlotsCount,
        toast,
      };
    });

    console.log('[W33 Target Word]:', w33Success.targetWord);
    console.log('[W33 Forged Letter]:', w33Success.firstLetter);
    console.log('[W33 Collision Toast]:', `"${w33Success.toast}"`);
    console.log(`[W33 Score HUD]: ${w33Success.initialScore} -> ${w33Success.scoreAfter} (+${w33Success.scoreDelta} XP)`);
    console.log(`[W33 Hearts DOM]: ${w33Success.initialHeartsDOM} -> ${w33Success.heartsDOMAfter}`);
    console.log(`[W33 Forged Sockets Count]: ${w33Success.forgedSlotsCount}`);

    const pass1 = w33Success.scoreDelta === 25 &&
                  w33Success.heartsDOMAfter === 3 &&
                  w33Success.forgedSlotsCount === 1 &&
                  w33Success.toast.includes('RUNE FORGED');
    console.log(`[Tổ hợp 1 Assertion]: Rune forged into socket & +25 XP & 3 hearts? => ${pass1 ? 'PASS ✅' : 'FAIL ❌'}\n`);

    const shot1 = path.join(SCREENSHOT_DIR, 'w33_word_forge_success_live.png');
    await page.screenshot({ path: shot1 });
    fs.copyFileSync(shot1, path.join(BRAIN_DIR, 'w33_word_forge_success_live.png'));

    // ─────────────────────────────────────────────────────────────────────────
    // TỔ HỢP 2: W33 — HAZARD (Nhặt nhầm rune distractor "X" -> Trừ 1 Tim)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('--- TỔ HỢP 2: W33 HAZARD (Nhặt nhầm rune "X" -> Forge Rejected & -1 Tim) ---');
    await page.goto(`${BASE_URL}/week/33/chronicles?room=6&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[0].click();
    await new Promise(r => setTimeout(r, 800));

    const w33Hazard = await page.evaluate(async () => {
      const hook = window.__WORD_FORGE_TEST_HOOK__;
      hook.clearRunes();
      hook.setHeartsVal(3);
      hook.resetInvincible();
      window.__WORD_FORGE_EVENT_LOG__ = [];

      const targetWord = hook.getTargetWord(); // 'SLIP'
      const distractorChar = 'X';

      // Inject distractor rune 'X' on Anvil Deck
      hook.injectRune(distractorChar, false, 350, 230);
      hook.setLeoPosition(350, 230);
      await new Promise(r => setTimeout(r, 100));

      const initialScore = hook.getScore();
      const initialHeartsDOM = document.querySelectorAll('.hud-heart-full').length;

      // Pickup wrong rune
      hook.simulatePickupRune(distractorChar);
      await new Promise(r => setTimeout(r, 100));

      // Trigger deposit onto anvil
      hook.triggerInteract();
      await new Promise(r => setTimeout(r, 250));

      const toast = document.querySelector('.forge-toast-pill')?.innerText?.trim() || '';
      const scoreAfter = hook.getScore();
      const heartsDOMAfter = document.querySelectorAll('.hud-heart-full').length;
      const heartsHookAfter = hook.getHearts();

      return {
        targetWord,
        distractorChar,
        initialScore,
        scoreAfter,
        scoreDelta: scoreAfter - initialScore,
        initialHeartsDOM,
        heartsDOMAfter,
        heartsHookAfter,
        toast,
      };
    });

    console.log('[W33 Target Word]:', w33Hazard.targetWord);
    console.log('[W33 Distractor Char]:', w33Hazard.distractorChar);
    console.log('[W33 Hazard Toast]:', `"${w33Hazard.toast}"`);
    console.log(`[W33 Hazard Score HUD]: ${w33Hazard.initialScore} -> ${w33Hazard.scoreAfter} (+${w33Hazard.scoreDelta} XP)`);
    console.log(`[W33 Hazard Hearts DOM]: ${w33Hazard.initialHeartsDOM} -> ${w33Hazard.heartsDOMAfter} (Expected: 3 -> 2)`);
    console.log(`[W33 Hazard Hearts Hook]: ${w33Hazard.heartsHookAfter}`);

    const pass2 = w33Hazard.scoreDelta === 0 &&
                  w33Hazard.heartsDOMAfter === 2 &&
                  w33Hazard.heartsHookAfter === 2 &&
                  w33Hazard.toast.includes('FORGE REJECTED');
    console.log(`[Tổ hợp 2 Assertion]: Distractor rejected & -1 heart & warning toast? => ${pass2 ? 'PASS ✅' : 'FAIL ❌'}\n`);

    const shot2 = path.join(SCREENSHOT_DIR, 'w33_word_forge_hazard_live.png');
    await page.screenshot({ path: shot2 });
    fs.copyFileSync(shot2, path.join(BRAIN_DIR, 'w33_word_forge_hazard_live.png'));

    // ─────────────────────────────────────────────────────────────────────────
    // TỔ HỢP 3: W35 — SUCCESS (Nhặt đúng chữ cái đầu tiên "C" của "CAMP")
    // ─────────────────────────────────────────────────────────────────────────
    console.log('--- TỔ HỢP 3: W35 SUCCESS (Nhặt đúng rune "C" của "CAMP" -> Forged) ---');
    await page.goto(`${BASE_URL}/week/35/chronicles?room=6&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    doorBtns = await page.$$('.dr-door-enter-btn');
    if (!doorBtns || doorBtns.length === 0) throw new Error('Door buttons not found on W35 Room 6');
    await doorBtns[0].click();
    await new Promise(r => setTimeout(r, 800));

    const w35Success = await page.evaluate(async () => {
      const hook = window.__WORD_FORGE_TEST_HOOK__;
      hook.clearRunes();
      hook.setHeartsVal(3);
      hook.resetInvincible();
      window.__WORD_FORGE_EVENT_LOG__ = [];

      const targetWord = hook.getTargetWord(); // 'CAMP'
      const firstLetter = targetWord[0]; // 'C'

      // Inject rune 'C' on Anvil Deck
      hook.injectRune(firstLetter, true, 350, 230);
      hook.setLeoPosition(350, 230);
      await new Promise(r => setTimeout(r, 100));

      const initialScore = hook.getScore();
      const initialHeartsDOM = document.querySelectorAll('.hud-heart-full').length;

      // Pickup rune
      hook.simulatePickupRune(firstLetter);
      await new Promise(r => setTimeout(r, 100));

      // Trigger deposit onto anvil
      hook.triggerInteract();
      await new Promise(r => setTimeout(r, 250));

      const toast = document.querySelector('.forge-toast-pill')?.innerText?.trim() || '';
      const scoreAfter = hook.getScore();
      const heartsDOMAfter = document.querySelectorAll('.hud-heart-full').length;
      const forgedSlotsCount = document.querySelectorAll('.anvil-letter-socket.socket-forged').length;

      return {
        targetWord,
        firstLetter,
        initialScore,
        scoreAfter,
        scoreDelta: scoreAfter - initialScore,
        initialHeartsDOM,
        heartsDOMAfter,
        forgedSlotsCount,
        toast,
      };
    });

    console.log('[W35 Target Word]:', w35Success.targetWord);
    console.log('[W35 Forged Letter]:', w35Success.firstLetter);
    console.log('[W35 Collision Toast]:', `"${w35Success.toast}"`);
    console.log(`[W35 Score HUD]: ${w35Success.initialScore} -> ${w35Success.scoreAfter} (+${w35Success.scoreDelta} XP)`);
    console.log(`[W35 Hearts DOM]: ${w35Success.initialHeartsDOM} -> ${w35Success.heartsDOMAfter}`);
    console.log(`[W35 Forged Sockets Count]: ${w35Success.forgedSlotsCount}`);

    const pass3 = w35Success.scoreDelta === 25 &&
                  w35Success.heartsDOMAfter === 3 &&
                  w35Success.forgedSlotsCount === 1 &&
                  w35Success.toast.includes('RUNE FORGED');
    console.log(`[Tổ hợp 3 Assertion]: W35 Rune forged into socket & +25 XP & 3 hearts? => ${pass3 ? 'PASS ✅' : 'FAIL ❌'}\n`);

    const shot3 = path.join(SCREENSHOT_DIR, 'w35_word_forge_success_live.png');
    await page.screenshot({ path: shot3 });
    fs.copyFileSync(shot3, path.join(BRAIN_DIR, 'w35_word_forge_success_live.png'));

    // ─────────────────────────────────────────────────────────────────────────
    // TỔ HỢP 4: W35 — HAZARD (Nhặt nhầm rune distractor "Z" -> Trừ 1 Tim)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('--- TỔ HỢP 4: W35 HAZARD (Nhặt nhầm rune "Z" -> Forge Rejected & -1 Tim) ---');
    await page.goto(`${BASE_URL}/week/35/chronicles?room=6&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[0].click();
    await new Promise(r => setTimeout(r, 800));

    const w35Hazard = await page.evaluate(async () => {
      const hook = window.__WORD_FORGE_TEST_HOOK__;
      hook.clearRunes();
      hook.setHeartsVal(3);
      hook.resetInvincible();
      window.__WORD_FORGE_EVENT_LOG__ = [];

      const targetWord = hook.getTargetWord(); // 'CAMP'
      const distractorChar = 'Z';

      // Inject distractor rune 'Z' on Anvil Deck
      hook.injectRune(distractorChar, false, 350, 230);
      hook.setLeoPosition(350, 230);
      await new Promise(r => setTimeout(r, 100));

      const initialScore = hook.getScore();
      const initialHeartsDOM = document.querySelectorAll('.hud-heart-full').length;

      // Pickup wrong rune
      hook.simulatePickupRune(distractorChar);
      await new Promise(r => setTimeout(r, 100));

      // Trigger deposit onto anvil
      hook.triggerInteract();
      await new Promise(r => setTimeout(r, 250));

      const toast = document.querySelector('.forge-toast-pill')?.innerText?.trim() || '';
      const scoreAfter = hook.getScore();
      const heartsDOMAfter = document.querySelectorAll('.hud-heart-full').length;
      const heartsHookAfter = hook.getHearts();

      return {
        targetWord,
        distractorChar,
        initialScore,
        scoreAfter,
        scoreDelta: scoreAfter - initialScore,
        initialHeartsDOM,
        heartsDOMAfter,
        heartsHookAfter,
        toast,
      };
    });

    console.log('[W35 Target Word]:', w35Hazard.targetWord);
    console.log('[W35 Distractor Char]:', w35Hazard.distractorChar);
    console.log('[W35 Hazard Toast]:', `"${w35Hazard.toast}"`);
    console.log(`[W35 Hazard Score HUD]: ${w35Hazard.initialScore} -> ${w35Hazard.scoreAfter} (+${w35Hazard.scoreDelta} XP)`);
    console.log(`[W35 Hazard Hearts DOM]: ${w35Hazard.initialHeartsDOM} -> ${w35Hazard.heartsDOMAfter} (Expected: 3 -> 2)`);
    console.log(`[W35 Hazard Hearts Hook]: ${w35Hazard.heartsHookAfter}`);

    const pass4 = w35Hazard.scoreDelta === 0 &&
                  w35Hazard.heartsDOMAfter === 2 &&
                  w35Hazard.heartsHookAfter === 2 &&
                  w35Hazard.toast.includes('FORGE REJECTED');
    console.log(`[Tổ hợp 4 Assertion]: W35 Distractor rejected & -1 heart & warning toast? => ${pass4 ? 'PASS ✅' : 'FAIL ❌'}\n`);

    const shot4 = path.join(SCREENSHOT_DIR, 'w35_word_forge_hazard_live.png');
    await page.screenshot({ path: shot4 });
    fs.copyFileSync(shot4, path.join(BRAIN_DIR, 'w35_word_forge_hazard_live.png'));

    // ─────────────────────────────────────────────────────────────────────────
    // PHẦN 5: ANTI-LEAK ROUND TRANSITION VERIFICATION
    // ─────────────────────────────────────────────────────────────────────────
    console.log('--- PHẦN 5: ANTI-LEAK ROUND TRANSITION VERIFICATION ---');
    const antiLeak = await page.evaluate(async () => {
      const hook = window.__WORD_FORGE_TEST_HOOK__;
      const initialRound = hook.getRoundIdx();
      const initialRoundNum = initialRound + 1;

      // Inject dummy rune tagged with initialRoundNum
      hook.injectRune('Q', false, 200, 300);
      const staleBefore = hook.getStaleRunes(initialRoundNum).length;

      // Advance to next word round (Round 0 -> Round 1)
      hook.advanceToRound(initialRound + 1);
      await new Promise(r => setTimeout(r, 400));

      const newRound = hook.getRoundIdx();
      const remainingOldCount = hook.getStaleRunes(initialRoundNum).length;
      const newRoundRunes = hook.getCurrentRunes().length;

      return {
        initialRound,
        newRound,
        staleBefore,
        remainingOldCount,
        newRoundRunes
      };
    });

    console.log(`[Word Forge Transition]: Word Round ${antiLeak.initialRound + 1} (idx: ${antiLeak.initialRound}) -> Word Round ${antiLeak.newRound + 1} (idx: ${antiLeak.newRound})`);
    console.log(`[Old Round Runes Before]: ${antiLeak.staleBefore}`);
    console.log(`[Old Round Runes Remaining After Transition]: ${antiLeak.remainingOldCount} (Expected: 0)`);
    console.log(`[New Round Spawned Runes]: ${antiLeak.newRoundRunes} (active for new word)`);

    const passAntiLeak = antiLeak.newRound === antiLeak.initialRound + 1 &&
                         antiLeak.remainingOldCount === 0;
    console.log(`[Anti-Leak Assertion]: Word advanced correctly & old runes purged from memory? => ${passAntiLeak ? 'PASS ✅' : 'FAIL ❌'}\n`);

    if (pass1 && pass2 && pass3 && pass4 && passAntiLeak) {
      console.log('================================================================================');
      console.log('>>> HOÀN THÀNH 100%: TẤT CẢ 4/4 TỔ HỢP WORD FORGE VÀ ANTI-LEAK ĐỀU PASS TUYỆT ĐỐI! <<<');
      console.log('================================================================================\n');
    } else {
      console.error('>>> CÓ TỔ HỢP THẤT BẠI! KIỂM TRA LẠI! <<<\n');
      process.exit(1);
    }

  } finally {
    await browser.close();
  }
}

runWordForgeSuite().catch(err => {
  console.error('[WORD FORGE PLAYTEST ERROR]:', err);
  process.exit(1);
});
