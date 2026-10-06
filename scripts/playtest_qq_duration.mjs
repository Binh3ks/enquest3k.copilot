import puppeteer from 'puppeteer';
import fs from 'fs';

async function runPlaytest() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Warming up Vite...');
  await page.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1000));

  console.log('Navigating to Chronicles Room 6...');
  await page.goto('http://localhost:5173/week/33/chronicles?room=6&bypass=true', {
    waitUntil: 'load',
    timeout: 20000
  });
  await new Promise(r => setTimeout(r, 1500));

  const doorBtns = await page.$$('.dr-door-enter-btn');
  if (doorBtns.length > 1) {
    await doorBtns[1].click();
  } else {
    console.error('Could not find door 1 button!');
    await browser.close();
    return;
  }
  await new Promise(r => setTimeout(r, 2000));

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('PLAYTEST THẬT — 3 ROUNDS TẠI 3 VỊ TRÍ VAULT KHÁC NHAU');
  console.log('(100% bằng dispatch keyboard event thật, KHÔNG sleep cứng di chuyển)');
  console.log('═══════════════════════════════════════════════════════════════');

  const results = [];

  // ─────────────────────────────────────────────────────────────────────────────
  // ROUND 1: DOOR 0 (LEFT VAULT TIER, x: 50, y: 280)
  // Leo xuất phát từ spawn perch (x: 430, y: 250)
  // ─────────────────────────────────────────────────────────────────────────────
  console.log('\n--- [ROUND 1] Target: DOOR 0 (LEFT VAULT TIER, x: 50, y: 280) ---');
  const r1StartPos = await page.evaluate(() => window.__QUESTION_QUEST_TEST_HOOK__.getLeoPos());
  console.log(`Leo Start Pos: x=${r1StartPos.x.toFixed(1)}, y=${r1StartPos.y.toFixed(1)}`);

  const tMoveStart1 = performance.now();
  await page.keyboard.down('ArrowLeft');
  while (true) {
    const d0 = await page.evaluate(() => window.__QUESTION_QUEST_TEST_HOOK__.getLeoDistToDoor()[0]);
    if (d0.withinHitbox) break;
    await new Promise(r => setTimeout(r, 20));
  }
  await page.keyboard.up('ArrowLeft');
  const tMove1 = performance.now() - tMoveStart1;

  const r1ArrivePos = await page.evaluate(() => window.__QUESTION_QUEST_TEST_HOOK__.getLeoPos());
  const r1Dist = await page.evaluate(() => window.__QUESTION_QUEST_TEST_HOOK__.getLeoDistToDoor()[0]);
  console.log(`Leo Arrived at Door 0 in: ${tMove1.toFixed(1)}ms`);
  console.log(`Arrive Pos: x=${r1ArrivePos.x.toFixed(1)}, y=${r1ArrivePos.y.toFixed(1)} | Dist: ${r1Dist.dist}px (withinHitbox: ${r1Dist.withinHitbox})`);

  // Screenshot Round 1
  const shot1 = 'docs/agent_artifacts/screenshots/qq_real_r1_door0_left.png';
  await page.screenshot({ path: shot1 });
  fs.copyFileSync(shot1, '/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/qq_real_r1_door0_left.png');
  console.log(`Saved screenshot 1: ${shot1}`);

  // Press E & measure code transition delay
  const tCodeStart1 = performance.now();
  await page.keyboard.down('KeyE');
  await new Promise(r => setTimeout(r, 50));
  await page.keyboard.up('KeyE');
  while (true) {
    const roundIdx = await page.evaluate(() => window.__QUESTION_QUEST_TEST_HOOK__.getRoundIdx());
    if (roundIdx === 1) break;
    await new Promise(r => setTimeout(r, 30));
  }
  const tCode1 = performance.now() - tCodeStart1;
  console.log(`Code transition delay (setTimeout + state advance): ${tCode1.toFixed(1)}ms`);
  await new Promise(r => setTimeout(r, 600));

  results.push({
    round: 1,
    targetVault: 'Door 0 (LEFT, x: 50, y: 280)',
    fromPos: `(${r1StartPos.x.toFixed(1)}, ${r1StartPos.y.toFixed(1)})`,
    toPos: `(${r1ArrivePos.x.toFixed(1)}, ${r1ArrivePos.y.toFixed(1)})`,
    t_move_ms: Math.round(tMove1),
    t_code_ms: Math.round(tCode1)
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // ROUND 2: DOOR 2 (RIGHT VAULT TIER, x: 630, y: 280)
  // Leo xuất phát từ Left Vault Tier (x: ~245, y: 310) -> chạy sàn -> nhảy lên bệ phải
  // ─────────────────────────────────────────────────────────────────────────────
  console.log('\n--- [ROUND 2] Target: DOOR 2 (RIGHT VAULT TIER, x: 630, y: 280) ---');
  const r2StartPos = await page.evaluate(() => window.__QUESTION_QUEST_TEST_HOOK__.getLeoPos());
  console.log(`Leo Start Pos: x=${r2StartPos.x.toFixed(1)}, y=${r2StartPos.y.toFixed(1)}`);

  const tMoveStart2 = performance.now();
  await page.keyboard.down('ArrowRight');
  while (true) {
    const p = await page.evaluate(() => window.__QUESTION_QUEST_TEST_HOOK__.getLeoPos());
    if (p.x >= 700) break;
    await new Promise(r => setTimeout(r, 20));
  }
  await page.keyboard.up('ArrowRight');

  // Jump onto Right Vault Tier
  await page.keyboard.down('ArrowUp');
  await new Promise(r => setTimeout(r, 100));
  await page.keyboard.up('ArrowUp');
  while (true) {
    const d2 = await page.evaluate(() => window.__QUESTION_QUEST_TEST_HOOK__.getLeoDistToDoor()[2]);
    if (d2.withinHitbox) break;
    await new Promise(r => setTimeout(r, 20));
  }
  const tMove2 = performance.now() - tMoveStart2;

  const r2ArrivePos = await page.evaluate(() => window.__QUESTION_QUEST_TEST_HOOK__.getLeoPos());
  const r2Dist = await page.evaluate(() => window.__QUESTION_QUEST_TEST_HOOK__.getLeoDistToDoor()[2]);
  console.log(`Leo Arrived at Door 2 in: ${tMove2.toFixed(1)}ms`);
  console.log(`Arrive Pos: x=${r2ArrivePos.x.toFixed(1)}, y=${r2ArrivePos.y.toFixed(1)} | Dist: ${r2Dist.dist}px (withinHitbox: ${r2Dist.withinHitbox})`);

  // Screenshot Round 2
  const shot2 = 'docs/agent_artifacts/screenshots/qq_real_r2_door2_right.png';
  await page.screenshot({ path: shot2 });
  fs.copyFileSync(shot2, '/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/qq_real_r2_door2_right.png');
  console.log(`Saved screenshot 2: ${shot2}`);

  // Press E & measure code transition delay
  const tCodeStart2 = performance.now();
  await page.keyboard.down('KeyE');
  await new Promise(r => setTimeout(r, 50));
  await page.keyboard.up('KeyE');
  while (true) {
    const roundIdx = await page.evaluate(() => window.__QUESTION_QUEST_TEST_HOOK__.getRoundIdx());
    if (roundIdx === 2) break;
    await new Promise(r => setTimeout(r, 30));
  }
  const tCode2 = performance.now() - tCodeStart2;
  console.log(`Code transition delay (setTimeout + state advance): ${tCode2.toFixed(1)}ms`);
  await new Promise(r => setTimeout(r, 600));

  results.push({
    round: 2,
    targetVault: 'Door 2 (RIGHT, x: 630, y: 280)',
    fromPos: `(${r2StartPos.x.toFixed(1)}, ${r2StartPos.y.toFixed(1)})`,
    toPos: `(${r2ArrivePos.x.toFixed(1)}, ${r2ArrivePos.y.toFixed(1)})`,
    t_move_ms: Math.round(tMove2),
    t_code_ms: Math.round(tCode2)
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // ROUND 3: DOOR 1 (HIGH APEX ALTAR, x: 340, y: 130)
  // Leo xuất phát từ Right Vault Tier (x: ~720, y: 310) -> chạy trái -> nhảy qua gap lên đài cao
  // ─────────────────────────────────────────────────────────────────────────────
  console.log('\n--- [ROUND 3] Target: DOOR 1 (HIGH APEX ALTAR, x: 340, y: 130) ---');
  const r3StartPos = await page.evaluate(() => window.__QUESTION_QUEST_TEST_HOOK__.getLeoPos());
  console.log(`Leo Start Pos: x=${r3StartPos.x.toFixed(1)}, y=${r3StartPos.y.toFixed(1)}`);

  const tMoveStart3 = performance.now();
  await page.keyboard.down('ArrowLeft');
  while (true) {
    const p = await page.evaluate(() => window.__QUESTION_QUEST_TEST_HOOK__.getLeoPos());
    if (p.x <= 640) break;
    await new Promise(r => setTimeout(r, 20));
  }

  // Jump from Right Tier towards High Apex Altar
  await page.keyboard.down('ArrowUp');
  await new Promise(r => setTimeout(r, 100));
  await page.keyboard.up('ArrowUp');

  while (true) {
    const d1 = await page.evaluate(() => window.__QUESTION_QUEST_TEST_HOOK__.getLeoDistToDoor()[1]);
    if (d1.withinHitbox) break;
    await new Promise(r => setTimeout(r, 20));
  }
  await page.keyboard.up('ArrowLeft');
  const tMove3 = performance.now() - tMoveStart3;

  const r3ArrivePos = await page.evaluate(() => window.__QUESTION_QUEST_TEST_HOOK__.getLeoPos());
  const r3Dist = await page.evaluate(() => window.__QUESTION_QUEST_TEST_HOOK__.getLeoDistToDoor()[1]);
  console.log(`Leo Arrived at Door 1 in: ${tMove3.toFixed(1)}ms`);
  console.log(`Arrive Pos: x=${r3ArrivePos.x.toFixed(1)}, y=${r3ArrivePos.y.toFixed(1)} | Dist: ${r3Dist.dist}px (withinHitbox: ${r3Dist.withinHitbox})`);

  // Screenshot Round 3
  const shot3 = 'docs/agent_artifacts/screenshots/qq_real_r3_door1_apex.png';
  await page.screenshot({ path: shot3 });
  fs.copyFileSync(shot3, '/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/qq_real_r3_door1_apex.png');
  console.log(`Saved screenshot 3: ${shot3}`);

  // Press E & measure code transition delay
  const tCodeStart3 = performance.now();
  await page.keyboard.down('KeyE');
  await new Promise(r => setTimeout(r, 50));
  await page.keyboard.up('KeyE');
  while (true) {
    const roundIdx = await page.evaluate(() => window.__QUESTION_QUEST_TEST_HOOK__.getRoundIdx());
    if (roundIdx === 3) break;
    await new Promise(r => setTimeout(r, 30));
  }
  const tCode3 = performance.now() - tCodeStart3;
  console.log(`Code transition delay (setTimeout + state advance): ${tCode3.toFixed(1)}ms`);

  results.push({
    round: 3,
    targetVault: 'Door 1 (APEX ALTAR, x: 340, y: 130)',
    fromPos: `(${r3StartPos.x.toFixed(1)}, ${r3StartPos.y.toFixed(1)})`,
    toPos: `(${r3ArrivePos.x.toFixed(1)}, ${r3ArrivePos.y.toFixed(1)})`,
    t_move_ms: Math.round(tMove3),
    t_code_ms: Math.round(tCode3)
  });

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('TỔNG HỢP KẾT QUẢ ĐO ĐẠC THỜI GIAN THỰC — 3 ROUNDS ĐỘC LẬP');
  console.log('═══════════════════════════════════════════════════════════════');
  console.table(results);

  await browser.close();
}

runPlaytest().catch(e => console.error(e));
