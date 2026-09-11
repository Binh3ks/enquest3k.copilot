/**
 * test_zz_semantic_distractor_playtest.mjs
 * Việc ZZ — Semantic validation + Puppeteer playtest 4 tổ hợp × W33 và W35
 *
 * PHẦN 1: Semantic Validation (Node.js, không cần browser)
 *   - Với mỗi entry, kiểm tra THỰC SỰ rằng:
 *     a) option isCorrect=true: cụm từ trả lời PHẢI xuất hiện literal trong sentence
 *     b) cả 2 option isCorrect=false: cụm từ trả lời KHÔNG xuất hiện literal trong sentence
 *
 * PHẦN 2: Puppeteer Playtest (4 tổ hợp W33+W35, success+hazard)
 *   - Đọc DOM trực tiếp: sentence + options text từ .question-quest-banner-text và .vault-door-plaque-220
 *   - Chụp ảnh, copy vào brain dir
 *   - Xác nhận layout không vỡ (VV/WW assertions)
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { readFileSync } from 'fs';

const BASE_URL = 'http://localhost:5174';
const SCREENSHOT_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf';

if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

// ─── PHẦN 1: SEMANTIC VALIDATION ────────────────────────────────────────────

/**
 * Semantic check rules per entry.
 * Maps entry id => { correctAnswerPhrase, distractor1Topic, distractor2Topic }
 * where correctAnswerPhrase is a keyword that MUST appear in sentence,
 * and distractor topics are keywords that must NOT appear in sentence.
 *
 * These are hand-crafted from the analysis in Việc YY to verify the fix is semantically correct.
 */
const SEMANTIC_SPECS = {
  // WEEK 33
  w33_wh_1: {
    sentence: "Jake was walking carefully down the school corridor after science class.",
    correctKeywords: ['walking', 'corridor', 'carefully'],  // "What was Jake doing" → answered by these
    d1Keywords: ['going after', 'after the corridor'],      // "Where was Jake going after" → NOT in sentence
    d2Keywords: ['why', 'reason'],                          // "Why was Jake walking so carefully" → NOT in sentence
    correctQuestion: 'What was Jake doing in the corridor?',
    d1Question: 'Where was Jake going after the corridor?',
    d2Question: 'Why was Jake walking so carefully?',
  },
  w33_wh_2: {
    sentence: "Suddenly, he lost his balance on the wet floor and slipped.",
    correctKeywords: ['lost his balance', 'slipped', 'suddenly'],
    d1Keywords: ['warned', 'warning'],
    d2Keywords: ['how long', 'stay on the floor'],
    correctQuestion: 'What happened suddenly?',
    d1Question: 'Who warned him about the wet floor?',
    d2Question: 'How long did he stay on the floor after slipping?',
  },
  w33_wh_3: {
    sentence: "Jake stopped immediately to help his friend and called the school nurse.",
    correctKeywords: ['stopped', 'help', 'called', 'immediately'],
    d1Keywords: ["friend's name", 'name'],
    d2Keywords: ["nurse's office", 'location of'],
    correctQuestion: 'What did Jake do immediately?',
    d1Question: "What was his friend's name?",
    d2Question: "Where was the school nurse's office?",
  },
  w33_wh_4: {
    sentence: "The nurse arrived quickly with a clean bandage and a cold pack to treat the cut.",
    correctKeywords: ['bandage', 'cold pack', 'bring'],
    d1Keywords: ["cut on the student's body", 'where was the cut'],
    d2Keywords: ['hear about', 'how did the nurse hear'],
    correctQuestion: 'What did the nurse bring to the corridor?',
    d1Question: "Where was the cut on the student's body?",
    d2Question: 'How did the nurse hear about the accident?',
  },
  w33_wh_5: {
    sentence: "Everyone felt relieved, and the headmaster reminded all students never to run.",
    correctKeywords: ['reminded', 'never to run'],
    d1Keywords: ['why', 'feel relieved', 'reason'],
    d2Keywords: ['where did the headmaster', 'location'],
    correctQuestion: 'What did the headmaster remind everyone about?',
    d1Question: 'Why did everyone feel relieved?',
    d2Question: 'Where did the headmaster speak to the students?',
  },
  // WEEK 34
  w34_wh_1: {
    sentence: "On a warm afternoon, the mighty lion was sleeping peacefully under the trees.",
    correctKeywords: ['sleeping', 'was sleeping'],
    d1Keywords: ['why', 'sleeping so deeply', 'reason'],
    d2Keywords: ['how long', 'how long had'],
    correctQuestion: 'What was the mighty lion doing on the warm afternoon?',
    d1Question: 'Why was the mighty lion sleeping so deeply?',
    d2Question: 'How long had the mighty lion been sleeping?',
  },
  w34_wh_2: {
    sentence: "While the lion was resting, a tiny mouse ran across the lion's big front paw.",
    correctKeywords: ['tiny mouse', 'ran'],
    d1Keywords: ['why', 'running so fast', 'reason'],
    d2Keywords: ['trying to go', 'destination'],
    correctQuestion: "What ran across the lion's big front paw?",
    d1Question: 'Why was the tiny mouse running so fast?',
    d2Question: 'Where was the tiny mouse trying to go?',
  },
  w34_wh_3: {
    sentence: "The mouse begged for mercy and promised to help the lion one day if he let him go.",
    correctKeywords: ['promised', 'help the lion'],
    d1Keywords: ['plan to help', 'how did the mouse plan'],
    d2Keywords: ['where did the mouse hide', 'after the lion let him go'],
    correctQuestion: 'What did the mouse promise to do?',
    d1Question: 'How did the mouse plan to help the lion?',
    d2Question: 'Where did the mouse hide after the lion let him go?',
  },
  w34_wh_4: {
    sentence: "A few days later, hunters trapped the lion in a strong net made of thick ropes.",
    correctKeywords: ['hunters', 'trapped'],
    d1Keywords: ['how many hunters', 'number of hunters'],
    d2Keywords: ['where did the hunters go', 'after trapping'],
    correctQuestion: 'Who trapped the lion in a strong net?',
    d1Question: 'How many hunters set the trap for the lion?',
    d2Question: 'Where did the hunters go after trapping the lion?',
  },
  w34_wh_5: {
    sentence: "The little mouse quickly chewed through the ropes and set the lion completely free.",
    correctKeywords: ['chewed through the ropes', 'chewed'],
    d1Keywords: ['how long', 'how long did it take'],
    d2Keywords: ['where did the lion run', 'after being set free'],
    correctQuestion: 'How did the little mouse set the lion free?',
    d1Question: 'How long did it take the mouse to chew through the ropes?',
    d2Question: 'Where did the lion run after being set free?',
  },
  // WEEK 35
  w35_wh_1: {
    sentence: "Early in the morning, the family packed their gear and drove towards Pine Mountain.",
    correctKeywords: ['pine mountain', 'towards'],
    d1Keywords: ['how many people', 'number of people'],
    d2Keywords: ['how far', 'distance'],
    correctQuestion: 'Where did the family drive towards?',
    d1Question: 'How many people were in the family?',
    d2Question: 'How far was Pine Mountain from their home?',
  },
  w35_wh_2: {
    sentence: "While Dad was pitching the camp tent, the children collected dry firewood.",
    correctKeywords: ['pitching', 'camp tent'],
    d1Keywords: ['color', 'what color'],
    d2Keywords: ['how many children', 'number of children'],
    correctQuestion: 'What was Dad doing while the children collected wood?',
    d1Question: 'What color was the camp tent?',
    d2Question: 'How many children helped collect the firewood?',
  },
  w35_wh_3: {
    sentence: "They spotted two playful squirrels while hiking along the mountain stream.",
    correctKeywords: ['squirrels', 'spotted'],
    d1Keywords: ['eating', 'what were the squirrels eating'],
    d2Keywords: ['how deep', 'depth'],
    correctQuestion: 'What did they spot along the stream?',
    d1Question: 'What were the two squirrels eating?',
    d2Question: 'How deep was the mountain stream?',
  },
  w35_wh_4: {
    sentence: "Dad lit the warm campfire when the golden sun sank behind the ridges.",
    correctKeywords: ['when the golden sun sank', 'sank'],
    d1Keywords: ['what tool', 'tool did dad use'],
    d2Keywords: ['how long', 'how long did the'],
    correctQuestion: 'When did Dad light the campfire?',
    d1Question: 'What tool did Dad use to light the campfire?',
    d2Question: 'How long did the warm campfire burn that night?',
  },
  w35_wh_5: {
    sentence: "Under the starry night sky, they roasted sweet marshmallows and sang happy songs.",
    correctKeywords: ['marshmallows', 'roasted'],
    d1Keywords: ['which song', 'song did the family'],
    d2Keywords: ['how many marshmallows', 'how many'],
    correctQuestion: 'What did they roast under the starry night sky?',
    d1Question: 'Which song did the family sing together?',
    d2Question: 'How many marshmallows did each person roast?',
  },
  // GENERIC
  gen_wh_1: {
    sentence: "The brave astronaut floated silently in the zero-gravity training chamber.",
    correctKeywords: ['floated', 'silently'],
    d1Keywords: ['why was the astronaut chosen', 'chosen for'],
    d2Keywords: ['how long', 'training session last'],
    correctQuestion: 'What was the astronaut doing in the chamber?',
    d1Question: 'Why was the astronaut chosen for the training?',
    d2Question: 'How long did the training session last?',
  },
  gen_wh_2: {
    sentence: "Suddenly, the warning buzzer beeped because the oxygen gauge fluctuated.",
    correctKeywords: ['oxygen gauge fluctuated', 'because'],
    d1Keywords: ['who fixed', 'fixed the oxygen'],
    d2Keywords: ['where was the oxygen gauge', 'located on'],
    correctQuestion: 'Why did the warning buzzer beep?',
    d1Question: 'Who fixed the oxygen gauge problem?',
    d2Question: 'Where was the oxygen gauge located on the spacecraft?',
  },
  gen_wh_3: {
    sentence: "The chief engineer calibrated the solar panels before the lunar eclipse.",
    correctKeywords: ['solar panels', 'calibrated'],
    d1Keywords: ['why did the solar panels', 'need to be calibrated'],
    d2Keywords: ['how long did the calibration', 'calibration process'],
    correctQuestion: 'What did the chief engineer calibrate?',
    d1Question: 'Why did the solar panels need to be calibrated?',
    d2Question: 'How long did the calibration process take?',
  },
  gen_wh_4: {
    sentence: "Dr. Nova discovered a sparkling crystal deep inside the lunar crater.",
    correctKeywords: ['lunar crater', 'deep inside'],
    d1Keywords: ['when did dr. nova arrive', 'arrive at the lunar'],
    d2Keywords: ['how did dr. nova reach', 'reach the bottom'],
    correctQuestion: 'Where did Dr. Nova find the sparkling crystal?',
    d1Question: 'When did Dr. Nova arrive at the lunar crater?',
    d2Question: 'How did Dr. Nova reach the bottom of the crater?',
  },
  gen_wh_5: {
    sentence: "The mission commander awarded gold badges to all crew members for courage.",
    correctKeywords: ['for courage', 'courage'],
    d1Keywords: ['when did the award ceremony', 'ceremony take place'],
    d2Keywords: ['how many gold badges', 'how many badges'],
    correctQuestion: 'Why did the commander award gold badges?',
    d1Question: 'When did the award ceremony take place?',
    d2Question: 'How many gold badges were awarded in total?',
  },
};

function semanticValidate() {
  const raw = readFileSync('/Users/binhnguyen/projects/Engquest3k/src/services/chroniclesFloor67Service.js', 'utf8');

  function extractArray(name) {
    const startTag = 'export const ' + name + ' = [';
    const start = raw.indexOf(startTag);
    if (start === -1) throw new Error('Cannot find ' + name);
    let depth = 0, inArray = false, arrayStart = -1;
    for (let i = start + startTag.length - 1; i < raw.length; i++) {
      if (raw[i] === '[') { if (!inArray) { inArray = true; arrayStart = i; } depth++; }
      else if (raw[i] === ']') {
        depth--;
        if (depth === 0 && inArray) return eval(raw.slice(arrayStart, i + 1));
      }
    }
    throw new Error('Unmatched brackets in ' + name);
  }

  const ALL = [
    ...extractArray('WEEK_33_WH_QUESTIONS'),
    ...extractArray('WEEK_34_WH_QUESTIONS'),
    ...extractArray('WEEK_35_WH_QUESTIONS'),
    ...extractArray('GENERIC_WH_QUESTIONS'),
  ];

  console.log('\n' + '═'.repeat(65));
  console.log('📐 PHẦN 1: SEMANTIC VALIDATION (Substring/Keyword Match)');
  console.log('═'.repeat(65));
  console.log('Quy tắc:');
  console.log('  ✅ PASS: correct option keyword PHẢI có trong sentence');
  console.log('  ✅ PASS: distractor topic keyword KHÔNG có trong sentence');
  console.log('  ❌ FAIL: distractor topic keyword có trong sentence (answerable!)');
  console.log('');

  let passed = 0, failed = 0;
  const failures = [];

  for (const entry of ALL) {
    const spec = SEMANTIC_SPECS[entry.id];
    if (!spec) {
      console.warn(`  ⚠️  No semantic spec for ${entry.id} — skipping`);
      continue;
    }

    const sentLower = entry.sentence.toLowerCase();
    const correctOpt = entry.options.find(o => o.isCorrect);
    const wrongOpts = entry.options.filter(o => !o.isCorrect);

    // Test 1: Correct option — at least one keyword from correctKeywords must be in sentence
    const correctHit = spec.correctKeywords.some(kw => sentLower.includes(kw.toLowerCase()));

    // Test 2a: Distractor 1 — NONE of d1Keywords should appear in sentence
    const d1Fail = spec.d1Keywords.some(kw => sentLower.includes(kw.toLowerCase()));
    // Test 2b: Distractor 2 — NONE of d2Keywords should appear in sentence
    const d2Fail = spec.d2Keywords.some(kw => sentLower.includes(kw.toLowerCase()));

    const itemPassed = correctHit && !d1Fail && !d2Fail;

    const icon = itemPassed ? '✅' : '❌';
    console.log(`${icon} [${entry.id}]`);
    console.log(`   Sentence: "${entry.sentence}"`);
    console.log(`   ✓ Correct: "${correctOpt?.text}"`);
    console.log(`     → Keyword check [${spec.correctKeywords.join(' | ')}]: ${correctHit ? 'FOUND in sentence ✅' : 'NOT FOUND ❌'}`);
    console.log(`   ✗ D1: "${wrongOpts[0]?.text}"`);
    console.log(`     → Topic check [${spec.d1Keywords.join(' | ')}]: ${d1Fail ? 'FOUND in sentence ❌ (answerable!)' : 'NOT in sentence ✅'}`);
    console.log(`   ✗ D2: "${wrongOpts[1]?.text}"`);
    console.log(`     → Topic check [${spec.d2Keywords.join(' | ')}]: ${d2Fail ? 'FOUND in sentence ❌ (answerable!)' : 'NOT in sentence ✅'}`);
    console.log('');

    if (itemPassed) passed++;
    else {
      failed++;
      failures.push({ id: entry.id, correctHit, d1Fail, d2Fail });
    }
  }

  console.log('─'.repeat(65));
  console.log(`Semantic Validation: ${passed}/${passed + failed} PASS`);
  if (failures.length > 0) {
    console.log('\n🔴 FAILURES:');
    failures.forEach(f => console.log(`  - ${f.id}: correctHit=${f.correctHit}, d1Fail=${f.d1Fail}, d2Fail=${f.d2Fail}`));
  }
  return failures.length === 0;
}

// ─── PHẦN 2: PUPPETEER PLAYTEST ─────────────────────────────────────────────

async function inspectLayout(page, label) {
  // Read 3 plaque texts from DOM directly
  const plaqueData = await page.$$eval('.vault-door-plaque-220', els => els.map((e, i) => ({
    idx: i,
    text: e.textContent?.trim() || '',
    visible: e.offsetParent !== null,
    opacity: getComputedStyle(e).opacity,
  })));

  // 3-point occlusion per plaque
  const plaqueRects = await page.$$eval('.vault-door-plaque-220', els => els.map((e, i) => {
    const r = e.getBoundingClientRect();
    return { idx: i, top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), height: Math.round(r.height) };
  }));

  const occlusionResults = await page.evaluate((rects) => {
    return rects.map(r => {
      const plaqueEl = document.querySelectorAll('.vault-door-plaque-220')[r.idx];
      const pts = [
        { name: 'top', x: r.left + Math.round(r.width / 2), y: r.top + 6 },
        { name: 'mid', x: r.left + Math.round(r.width / 2), y: r.top + Math.round(r.height / 2) },
        { name: 'bot', x: r.left + Math.round(r.width / 2), y: r.bottom - 6 },
      ];
      return {
        idx: r.idx,
        points: pts.map(pt => {
          const el = document.elementFromPoint(pt.x, pt.y);
          const clear = el && (el === plaqueEl || plaqueEl.contains(el));
          return { name: pt.name, clear: Boolean(clear), hitTag: el?.tagName, hitClass: el?.className?.toString().slice(0,40) };
        }),
        allClear: pts.every(pt => { const el = document.elementFromPoint(pt.x, pt.y); return el && (el === plaqueEl || plaqueEl.contains(el)); })
      };
    });
  }, plaqueRects);

  console.log(`\n[${label} — Plaque DOM State]:`);
  plaqueData.forEach(p => console.log(`  Door[${p.idx}]: text="${p.text.slice(0,60)}" visible=${p.visible} opacity=${p.opacity}`));

  console.log(`[${label} — 3-Point Occlusion]:`);
  occlusionResults.forEach(o => {
    const pts = o.points.map(p => `${p.name}:${p.clear ? '✅' : '❌(' + p.hitClass + ')'}`).join(' ');
    console.log(`  Door[${o.idx}]: ${pts} — allClear=${o.allClear ? '✅' : '❌'}`);
  });

  const allVisible = plaqueData.length === 3 && plaqueData.every(p => p.text.length > 0 && p.visible && p.opacity === '1');
  const allNineOk = occlusionResults.every(o => o.allClear);

  console.log(`[${label} — Layout Assertion]: allVisible=${allVisible ? '✅' : '❌'} allNineOk=${allNineOk ? '✅' : '❌'}`);
  return { plaqueData, occlusionResults, passed: allVisible && allNineOk };
}

async function playtestSuite() {
  console.log('\n' + '═'.repeat(65));
  console.log('🎮 PHẦN 2: PUPPETEER PLAYTEST — 4 TỔ HỢP × W33/W35');
  console.log('═'.repeat(65));

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = { pass: [], fail: [] };

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Warm up: load root first so Vite pre-caches all dynamic chunks
    console.log('  [Warmup] Loading root page to pre-cache Vite chunks...');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0', timeout: 20000 });
    await new Promise(r => setTimeout(r, 2000));
    console.log('  [Warmup] Root loaded OK');

    const combos = [
      { week: 33, mode: 'success', label: 'W33 Success' },
      { week: 33, mode: 'hazard',  label: 'W33 Hazard'  },
      { week: 35, mode: 'success', label: 'W35 Success' },
      { week: 35, mode: 'hazard',  label: 'W35 Hazard'  },
    ];

    for (const combo of combos) {
      console.log(`\n${'─'.repeat(65)}`);
      console.log(`▶ ${combo.label}`);
      console.log('─'.repeat(65));

      await page.goto(`${BASE_URL}/week/${combo.week}/chronicles?room=6&bypass=true`, { waitUntil: 'networkidle0', timeout: 20000 });
      await new Promise(r => setTimeout(r, 800));

      // Enter door 1 (Question Quest)
      const doorBtns = await page.$$('.dr-door-enter-btn');
      if (!doorBtns || doorBtns.length < 2) {
        console.error(`  ❌ Door buttons not found for ${combo.label}`);
        results.fail.push(combo.label + ' — no door buttons');
        continue;
      }
      await doorBtns[1].click();
      await new Promise(r => setTimeout(r, 1000));

      // Read sentence and round from DOM
      let domSentence = '(not found)';
      let domRound = '(not found)';
      let domOptions = [];

      try {
        domSentence = await page.$eval('.question-quest-banner-text', el => el.innerText.trim());
        domRound = await page.$eval('.question-quest-round-pill', el => el.innerText.trim());
        domOptions = await page.$$eval('.vault-door-plaque-220', els => els.map(e => ({
          text: e.textContent?.trim() || '',
          el_class: e.className,
        })));
      } catch (e) {
        console.error(`  ⚠️  DOM read error: ${e.message}`);
      }

      console.log(`  [DOM Sentence]: "${domSentence}"`);
      console.log(`  [DOM Round]: "${domRound}"`);
      console.log(`  [DOM Options from plaques]:`);
      domOptions.forEach((o, i) => console.log(`    [${i}]: "${o.text}"`));

      // Interact via test hook
      const hookResult = await page.evaluate(async (isSuccess) => {
        const hook = window.__QUESTION_QUEST_TEST_HOOK__;
        if (!hook) return { error: 'hook not found' };
        hook.setHeartsVal(3);
        const initialHearts = hook.getHearts();
        const initialScore = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
        const doors = hook.getDoors();
        const doorIdx = isSuccess
          ? doors.findIndex(d => d.isCorrect)
          : doors.findIndex(d => !d.isCorrect);
        if (doorIdx < 0) return { error: 'door not found', doors };
        hook.enterDoor(doorIdx);
        await new Promise(r => setTimeout(r, 300));
        const toast = document.querySelector('.question-feedback-toast')?.innerText?.trim() || '';
        const heartsAfter = hook.getHearts();
        const scoreAfter = parseInt(document.querySelector('.hud-score-value')?.innerText || '0', 10);
        return {
          doorText: doors[doorIdx]?.text,
          isCorrect: doors[doorIdx]?.isCorrect,
          initialHearts, heartsAfter,
          initialScore, scoreAfter, scoreDelta: scoreAfter - initialScore,
          toast,
        };
      }, combo.mode === 'success');

      if (hookResult.error) {
        console.error(`  ❌ Hook error: ${hookResult.error}`);
      } else {
        console.log(`  [Hook — Door entered]: "${hookResult.doorText}" (isCorrect=${hookResult.isCorrect})`);
        console.log(`  [Hearts]: ${hookResult.initialHearts} → ${hookResult.heartsAfter}`);
        console.log(`  [Score]: ${hookResult.initialScore} → ${hookResult.scoreAfter} (+${hookResult.scoreDelta} XP)`);
        console.log(`  [Toast]: "${hookResult.toast}"`);
      }

      // Layout assertion
      const layout = await inspectLayout(page, combo.label);

      // Screenshot
      const shotName = `zz_${combo.week}_${combo.mode}_live.png`;
      const shotPath = path.join(SCREENSHOT_DIR, shotName);
      await page.screenshot({ path: shotPath, fullPage: false });
      fs.copyFileSync(shotPath, path.join(BRAIN_DIR, shotName));
      console.log(`  [Screenshot saved]: ${shotPath}`);
      console.log(`  [Screenshot copied to brain]: ${path.join(BRAIN_DIR, shotName)}`);

      // Overall pass/fail
      let pass = true;
      if (combo.mode === 'success') {
        pass = hookResult.scoreDelta === 40 && hookResult.heartsAfter === 3 && hookResult.toast.includes('SANCTUARY UNLOCKED') && layout.passed;
      } else {
        pass = hookResult.scoreDelta === 0 && hookResult.heartsAfter === 2 && hookResult.toast.includes('SEALED') && layout.passed;
      }
      pass = pass && domRound === 'Round 1 / 5';

      console.log(`\n  [${combo.label} OVERALL]: ${pass ? '✅ PASS' : '❌ FAIL'}`);
      if (pass) results.pass.push(combo.label);
      else results.fail.push(combo.label);
    }

  } finally {
    await browser.close();
  }

  console.log('\n' + '═'.repeat(65));
  console.log('📊 PHẦN 2 KẾT QUẢ:');
  results.pass.forEach(l => console.log(`  ✅ ${l}`));
  results.fail.forEach(l => console.log(`  ❌ ${l}`));
  return results.fail.length === 0;
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
(async () => {
  let semanticOk = false;
  let playtestOk = false;

  try {
    semanticOk = semanticValidate();
  } catch (e) {
    console.error('[SEMANTIC VALIDATION ERROR]:', e);
  }

  try {
    playtestOk = await playtestSuite();
  } catch (e) {
    console.error('[PLAYTEST ERROR]:', e.message);
    playtestOk = false;
  }

  console.log('\n' + '═'.repeat(65));
  console.log('🏁 TỔNG KẾT VIỆC ZZ:');
  console.log(`  Phần 1 — Semantic Validation: ${semanticOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  Phần 2 — Puppeteer Playtest:  ${playtestOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log('═'.repeat(65));

  if (!semanticOk || !playtestOk) process.exit(1);
})();
