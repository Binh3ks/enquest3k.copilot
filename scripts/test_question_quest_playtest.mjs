import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const SCREENSHOT_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_DIR = path.resolve('/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runFullQuestionQuestSuite() {
  console.log('\n================================================================================');
  console.log('>>> HẠNG #4: QUESTION QUEST — PLAYTEST FULL 4 TỔ HỢP + ANTI-LEAK (DIRECT DOM) <<<');
  console.log('================================================================================\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 750 });

    // ─────────────────────────────────────────────────────────────────────────
    // TỔ HỢP 1: W33 SUCCESS (Leo vào cổng đúng WH-Question -> Unlocked & +40 XP)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('--- TỔ HỢP 1: W33 SUCCESS (Vào đúng cổng WH-Question -> Sanctuary Unlocked) ---');
    await page.goto(`${BASE_URL}/week/33/chronicles?room=6&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    let doorBtns = await page.$$('.dr-door-enter-btn');
    if (!doorBtns || doorBtns.length < 2) throw new Error('Door buttons not found on W33 Room 6');
    await doorBtns[1].click(); // Door 1: Question Quest (Grammar Door)
    await new Promise(r => setTimeout(r, 800));

    // Direct DOM Reads via page.$eval
    const w33DomSentence1 = await page.$eval('.question-quest-banner-text', el => el.innerText.trim());
    const w33DomRound1 = await page.$eval('.question-quest-round-pill', el => el.innerText.trim());
    const w33DoorPlaques1 = await page.$$eval('.vault-door-plaque-220', els => els.map(e => e.innerText.trim()));

    const w33Success = await page.evaluate(async () => {
      const hook = window.__QUESTION_QUEST_TEST_HOOK__;
      hook.setHeartsVal(3);
      const initialScore = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const initialHeartsDOM = document.querySelectorAll('.hud-heart-full').length;
      const initialHeartsHook = hook.getHearts();

      const doors = hook.getDoors();
      const correctDoorIdx = doors.findIndex(d => d.isCorrect);

      // Trigger entering the correct door
      hook.enterDoor(correctDoorIdx);
      await new Promise(r => setTimeout(r, 200));

      const toast = document.querySelector('.question-feedback-toast')?.innerText?.trim() || '';
      const scoreAfter = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const heartsDOMAfter = document.querySelectorAll('.hud-heart-full').length;
      const heartsHookAfter = hook.getHearts();

      return {
        correctDoorText: doors[correctDoorIdx]?.text,
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

    console.log('[W33 Success DOM Sentence]:', `"${w33DomSentence1}"`);
    console.log('[W33 Success DOM Round]:', `"${w33DomRound1}"`);
    console.log('[W33 220px Door Plaques]:', w33DoorPlaques1);
    console.log('[W33 Target WH-Question]:', `"${w33Success.correctDoorText}"`);
    console.log('[W33 Collision Toast]:', `"${w33Success.toast}"`);
    console.log(`[W33 Score HUD]: ${w33Success.initialScore} -> ${w33Success.scoreAfter} (+${w33Success.scoreDelta} XP)`);
    console.log(`[W33 Hearts DOM]: ${w33Success.initialHeartsDOM} -> ${w33Success.heartsDOMAfter} (Hook: ${w33Success.initialHeartsHook} -> ${w33Success.heartsHookAfter})`);

    const pass1 = w33Success.scoreDelta === 40 &&
                  w33Success.heartsDOMAfter === 3 &&
                  w33Success.toast.includes('SANCTUARY UNLOCKED') &&
                  w33DomRound1 === 'Round 1 / 5';
    console.log(`[Tổ hợp 1 Assertion]: Sanctuary unlocked & +40 XP & no heart penalty & DOM Round 1 / 5? => ${pass1 ? 'PASS ✅' : 'FAIL ❌'}\n`);

    const shot1 = path.join(SCREENSHOT_DIR, 'w33_question_quest_success_live.png');
    await page.screenshot({ path: shot1 });
    fs.copyFileSync(shot1, path.join(BRAIN_DIR, 'w33_question_quest_success_live.png'));

    // ─────────────────────────────────────────────────────────────────────────
    // TỔ HỢP 2: W33 HAZARD (Leo vào cổng sai WH-Question -> Sealed & Trừ 1 Tim)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('--- TỔ HỢP 2: W33 HAZARD (Vào cổng sai WH-Question -> Trừ 1 Tim) ---');
    await page.goto(`${BASE_URL}/week/33/chronicles?room=6&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[1].click(); // Door 1
    await new Promise(r => setTimeout(r, 800));

    // Direct DOM Reads via page.$eval
    const w33DomSentence2 = await page.$eval('.question-quest-banner-text', el => el.innerText.trim());
    const w33DomRound2 = await page.$eval('.question-quest-round-pill', el => el.innerText.trim());

    const w33Hazard = await page.evaluate(async () => {
      const hook = window.__QUESTION_QUEST_TEST_HOOK__;
      hook.setHeartsVal(3);
      const initialScore = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const initialHeartsDOM = document.querySelectorAll('.hud-heart-full').length;
      const initialHeartsHook = hook.getHearts();

      const doors = hook.getDoors();
      const wrongDoorIdx = doors.findIndex(d => !d.isCorrect);

      // Trigger entering the wrong door
      hook.enterDoor(wrongDoorIdx);
      await new Promise(r => setTimeout(r, 200));

      const toast = document.querySelector('.question-feedback-toast')?.innerText?.trim() || '';
      const scoreAfter = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const heartsDOMAfter = document.querySelectorAll('.hud-heart-full').length;
      const heartsHookAfter = hook.getHearts();

      return {
        wrongDoorText: doors[wrongDoorIdx]?.text,
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

    console.log('[W33 Hazard DOM Sentence]:', `"${w33DomSentence2}"`);
    console.log('[W33 Hazard DOM Round]:', `"${w33DomRound2}"`);
    console.log('[W33 Wrong WH-Question Chosen]:', `"${w33Hazard.wrongDoorText}"`);
    console.log('[W33 Hazard Collision Toast]:', `"${w33Hazard.toast}"`);
    console.log(`[W33 Hazard Score HUD]: ${w33Hazard.initialScore} -> ${w33Hazard.scoreAfter} (+${w33Hazard.scoreDelta} XP)`);
    console.log(`[W33 Hazard Hearts DOM]: ${w33Hazard.initialHeartsDOM} -> ${w33Hazard.heartsDOMAfter} (Expected: 3 -> 2)`);
    console.log(`[W33 Hazard Hearts Hook]: ${w33Hazard.initialHeartsHook} -> ${w33Hazard.heartsHookAfter} (Expected: 3 -> 2)`);

    const pass2 = w33Hazard.scoreDelta === 0 &&
                  w33Hazard.heartsDOMAfter === 2 &&
                  w33Hazard.heartsHookAfter === 2 &&
                  w33Hazard.toast.includes('SEALED') &&
                  w33DomRound2 === 'Round 1 / 5';
    console.log(`[Tổ hợp 2 Assertion]: Wrong door sealed (-1 heart) & warning toast & DOM Round 1 / 5? => ${pass2 ? 'PASS ✅' : 'FAIL ❌'}\n`);

    const shot2 = path.join(SCREENSHOT_DIR, 'w33_question_quest_hazard_live.png');
    await page.screenshot({ path: shot2 });
    fs.copyFileSync(shot2, path.join(BRAIN_DIR, 'w33_question_quest_hazard_live.png'));

    // ─────────────────────────────────────────────────────────────────────────
    // TỔ HỢP 3: W35 SUCCESS (Leo vào cổng đúng WH-Question -> Unlocked & +40 XP)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('--- TỔ HỢP 3: W35 SUCCESS (Vào đúng cổng WH-Question -> Sanctuary Unlocked) ---');
    await page.goto(`${BASE_URL}/week/35/chronicles?room=6&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    doorBtns = await page.$$('.dr-door-enter-btn');
    if (!doorBtns || doorBtns.length < 2) throw new Error('Door buttons not found on W35 Room 6');
    await doorBtns[1].click(); // Door 1
    await new Promise(r => setTimeout(r, 800));

    // Direct DOM Reads via page.$eval
    const w35DomSentence1 = await page.$eval('.question-quest-banner-text', el => el.innerText.trim());
    const w35DomRound1 = await page.$eval('.question-quest-round-pill', el => el.innerText.trim());
    const w35DoorPlaques1 = await page.$$eval('.vault-door-plaque-220', els => els.map(e => e.innerText.trim()));

    const w35Success = await page.evaluate(async () => {
      const hook = window.__QUESTION_QUEST_TEST_HOOK__;
      hook.setHeartsVal(3);
      const initialScore = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const initialHeartsDOM = document.querySelectorAll('.hud-heart-full').length;
      const initialHeartsHook = hook.getHearts();

      const doors = hook.getDoors();
      const correctDoorIdx = doors.findIndex(d => d.isCorrect);

      // Trigger entering correct door
      hook.enterDoor(correctDoorIdx);
      await new Promise(r => setTimeout(r, 200));

      const toast = document.querySelector('.question-feedback-toast')?.innerText?.trim() || '';
      const scoreAfter = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const heartsDOMAfter = document.querySelectorAll('.hud-heart-full').length;
      const heartsHookAfter = hook.getHearts();

      return {
        correctDoorText: doors[correctDoorIdx]?.text,
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

    console.log('[W35 Success DOM Sentence]:', `"${w35DomSentence1}"`);
    console.log('[W35 Success DOM Round]:', `"${w35DomRound1}"`);
    console.log('[W35 220px Door Plaques]:', w35DoorPlaques1);
    console.log('[W35 Target WH-Question]:', `"${w35Success.correctDoorText}"`);
    console.log('[W35 Collision Toast]:', `"${w35Success.toast}"`);
    console.log(`[W35 Score HUD]: ${w35Success.initialScore} -> ${w35Success.scoreAfter} (+${w35Success.scoreDelta} XP)`);
    console.log(`[W35 Hearts DOM]: ${w35Success.initialHeartsDOM} -> ${w35Success.heartsDOMAfter} (Hook: ${w35Success.initialHeartsHook} -> ${w35Success.heartsHookAfter})`);

    const pass3 = w35Success.scoreDelta === 40 &&
                  w35Success.heartsDOMAfter === 3 &&
                  w35Success.toast.includes('SANCTUARY UNLOCKED') &&
                  w35DomRound1 === 'Round 1 / 5';
    console.log(`[Tổ hợp 3 Assertion]: W35 Sanctuary unlocked & +40 XP & no heart penalty & DOM Round 1 / 5? => ${pass3 ? 'PASS ✅' : 'FAIL ❌'}\n`);

    const shot3 = path.join(SCREENSHOT_DIR, 'w35_question_quest_success_live.png');
    await page.screenshot({ path: shot3 });
    fs.copyFileSync(shot3, path.join(BRAIN_DIR, 'w35_question_quest_success_live.png'));

    // ─────────────────────────────────────────────────────────────────────────
    // TỔ HỢP 4: W35 HAZARD (Leo vào cổng sai WH-Question -> Sealed & Trừ 1 Tim)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('--- TỔ HỢP 4: W35 HAZARD (Vào cổng sai WH-Question -> Trừ 1 Tim) ---');
    await page.goto(`${BASE_URL}/week/35/chronicles?room=6&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[1].click(); // Door 1
    await new Promise(r => setTimeout(r, 800));

    // Direct DOM Reads via page.$eval
    const w35DomSentence2 = await page.$eval('.question-quest-banner-text', el => el.innerText.trim());
    const w35DomRound2 = await page.$eval('.question-quest-round-pill', el => el.innerText.trim());

    const w35Hazard = await page.evaluate(async () => {
      const hook = window.__QUESTION_QUEST_TEST_HOOK__;
      hook.setHeartsVal(3);
      const initialScore = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const initialHeartsDOM = document.querySelectorAll('.hud-heart-full').length;
      const initialHeartsHook = hook.getHearts();

      const doors = hook.getDoors();
      const wrongDoorIdx = doors.findIndex(d => !d.isCorrect);

      // Trigger entering wrong door
      hook.enterDoor(wrongDoorIdx);
      await new Promise(r => setTimeout(r, 200));

      const toast = document.querySelector('.question-feedback-toast')?.innerText?.trim() || '';
      const scoreAfter = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
      const heartsDOMAfter = document.querySelectorAll('.hud-heart-full').length;
      const heartsHookAfter = hook.getHearts();

      return {
        wrongDoorText: doors[wrongDoorIdx]?.text,
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

    console.log('[W35 Hazard DOM Sentence]:', `"${w35DomSentence2}"`);
    console.log('[W35 Hazard DOM Round]:', `"${w35DomRound2}"`);
    console.log('[W35 Wrong WH-Question Chosen]:', `"${w35Hazard.wrongDoorText}"`);
    console.log('[W35 Hazard Collision Toast]:', `"${w35Hazard.toast}"`);
    console.log(`[W35 Hazard Score HUD]: ${w35Hazard.initialScore} -> ${w35Hazard.scoreAfter} (+${w35Hazard.scoreDelta} XP)`);
    console.log(`[W35 Hazard Hearts DOM]: ${w35Hazard.initialHeartsDOM} -> ${w35Hazard.heartsDOMAfter} (Expected: 3 -> 2)`);
    console.log(`[W35 Hazard Hearts Hook]: ${w35Hazard.initialHeartsHook} -> ${w35Hazard.heartsHookAfter} (Expected: 3 -> 2)`);

    const pass4 = w35Hazard.scoreDelta === 0 &&
                  w35Hazard.heartsDOMAfter === 2 &&
                  w35Hazard.heartsHookAfter === 2 &&
                  w35Hazard.toast.includes('SEALED') &&
                  w35DomRound2 === 'Round 1 / 5';
    console.log(`[Tổ hợp 4 Assertion]: Wrong door sealed (-1 heart) & warning toast & DOM Round 1 / 5? => ${pass4 ? 'PASS ✅' : 'FAIL ❌'}\n`);

    const shot4 = path.join(SCREENSHOT_DIR, 'w35_question_quest_hazard_live.png');
    await page.screenshot({ path: shot4 });
    fs.copyFileSync(shot4, path.join(BRAIN_DIR, 'w35_question_quest_hazard_live.png'));

    // ─────────────────────────────────────────────────────────────────────────
    // PHẦN 5: ANTI-LEAK QUESTION TRANSITION VERIFICATION
    // ─────────────────────────────────────────────────────────────────────────
    console.log('--- PHẦN 5: ANTI-LEAK QUESTION TRANSITION VERIFICATION ---');
    const antiLeak = await page.evaluate(async () => {
      const hook = window.__QUESTION_QUEST_TEST_HOOK__;
      const initialRound = hook.getRoundIdx();
      const initialRoundId = initialRound + 1;

      const initialStaleDoors = hook.getStaleDoors(initialRoundId).length;

      // Advance to next question (Round 0 -> Round 1)
      hook.advanceToRound(initialRound + 1);
      await new Promise(r => setTimeout(r, 400));

      const newRound = hook.getRoundIdx();
      const newRoundId = newRound + 1;
      const remainingOldDoors = hook.getStaleDoors(initialRoundId).length;
      const newDoors = hook.getStaleDoors(newRoundId).length;

      return {
        initialRound,
        newRound,
        initialStaleDoors,
        remainingOldDoors,
        newDoors
      };
    });

    console.log(`[Question Transition]: Round ${antiLeak.initialRound + 1} (idx: ${antiLeak.initialRound}) -> Round ${antiLeak.newRound + 1} (idx: ${antiLeak.newRound})`);
    console.log(`[Old Round Doors Active Before]: ${antiLeak.initialStaleDoors}`);
    console.log(`[Old Round Doors Remaining After Transition]: ${antiLeak.remainingOldDoors} (Expected: 0)`);
    console.log(`[New Round Active Doors]: ${antiLeak.newDoors} (active for new round)`);

    const passAntiLeak = antiLeak.newRound === antiLeak.initialRound + 1 &&
                         antiLeak.remainingOldDoors === 0 &&
                         antiLeak.newDoors === 3;
    console.log(`[Anti-Leak Assertion]: Transition advanced correctly & old doors purged from memory? => ${passAntiLeak ? 'PASS ✅' : 'FAIL ❌'}\n`);

    if (pass1 && pass2 && pass3 && pass4 && passAntiLeak) {
      console.log('================================================================================');
      console.log('>>> HOÀN THÀNH 100%: TẤT CẢ 4/4 TỔ HỢP QUESTION QUEST VÀ ANTI-LEAK ĐỀU PASS TUYỆT ĐỐI! <<<');
      console.log('================================================================================\n');
    } else {
      console.error('>>> CÓ TỔ HỢP THẤT BẠI! KIỂM TRA LẠI! <<<\n');
      process.exit(1);
    }

  } finally {
    await browser.close();
  }
}

runFullQuestionQuestSuite().catch(err => {
  console.error('[PLAYTEST SUITE ERROR]:', err);
  process.exit(1);
});
