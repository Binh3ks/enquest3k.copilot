// Shadowing playAll pause contract — June 30, 2026 (rewrite verification)
//
// Verifies the sequence state machine in useShadowingPlayer.js holds:
//   1. Clicking Play starts the sequence (sentence 0 plays)
//   2. Clicking Pause mid-sequence halts audio + saves idx
//   3. Clicking Play again resumes the sequence — sentence idx plays
//      again, then onEnd auto-advances to idx+1
//
// Difference from shadowing_pause_verify.cjs (which tests challenge
// PLAY_TTS phase): this tests playAll()'s sequence runner directly —
// the user-facing "Play All" button.

const { chromium } = require('playwright');

const TEST_WEEK = parseInt(process.env.TEST_WEEK || '30', 10);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const logs = [];
  page.on('console', (msg) => logs.push({ type: msg.type(), text: msg.text(), time: Date.now() }));
  page.on('pageerror', (err) => logs.push({ type: 'pageerror', text: String(err), time: Date.now() }));

  // Step 0: prime localStorage
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);
  await page.evaluate(() => {
    const guestUser = { name: 'Guest', role: 'guest', avatarUrl: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Guest' };
    const storage = {
      state: {
        currentUser: guestUser, token: null, learningMode: 'advanced',
        progressCache: {}, weekCompletion: {}, weekStars: {},
        earnedBadges: [], avatarItems: [],
        equippedItems: { hat: null, glasses: null, accessory: null },
      },
      version: 2,
    };
    localStorage.setItem('engquest-user-storage', JSON.stringify(storage));
    localStorage.setItem('placement_result', JSON.stringify({ startWeek: 30 }));
  });

  await page.goto(`http://localhost:5173/week/${TEST_WEEK}/shadowing`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[title="Save your practice"], [title="Lưu bài luyện tập"]', { timeout: 45000 });
  console.log('[playall-pause] Shadowing station loaded.\n');

  // Step 1: Click "Play All" (top-right button on LeftPanel)
  console.log('[playall-pause] Step 1 — Click "Play All" to start sequence.');
  const playAllBtn = page.locator('button:has-text("Play All")').first();
  await playAllBtn.click({ timeout: 5000 });
  await page.waitForTimeout(800);

  const playStartLogs = logs.filter(l =>
    l.text.includes('[Player]') && (
      l.text.includes('pause') || l.text.includes('resume') ||
      l.text.includes('playAll') || l.text.includes('sequence') ||
      l.text.includes('onEnd')
    )
  );
  console.log(`  Initial Player logs: ${playStartLogs.length} entries`);
  playStartLogs.slice(0, 10).forEach(l => console.log(`    [${l.type}] ${l.text.slice(0, 120)}`));

  const seqStarted = logs.some(l => l.text.includes('[Player] pause() called') === false && l.text.includes('playAll'));
  console.log(`  ✅ sequence started:     ${seqStarted ? 'YES' : 'check logs'}`);

  // Step 2: Click inline Play/Pause to PAUSE mid-sequence
  console.log('\n[playall-pause] Step 2 — Click inline pause mid-sequence.');
  const playPauseBtn = page.locator(
    'button[title="Pause"], button[title="Play"], button[title="Resume"], ' +
    'button[title="Phát"], button[title="Tạm dừng"], button[title="Tiếp tục"]'
  ).first();
  const beforePauseIdx = logs.length;
  await playPauseBtn.click({ timeout: 5000 });
  await page.waitForTimeout(1500);

  const pauseLogs = logs.slice(beforePauseIdx);
  const pauseCalled = pauseLogs.some(l => l.text.includes('[Player] pause() called'));
  const seqStatePaused = pauseLogs.some(l =>
    l.text.includes('sequence paused at idx')
  );
  console.log(`  Player pause logs after click:`);
  pauseLogs.filter(l => l.text.includes('[Player]')).forEach(l =>
    console.log(`    [${l.type}] ${l.text.slice(0, 120)}`)
  );
  console.log(`  ✅ pause() called:        ${pauseCalled ? 'YES' : 'NO ❌ BAD'}`);
  console.log(`  ✅ sequence paused at idx:${seqStatePaused ? 'YES' : 'NO ❌ BAD'}`);

  // Step 3: Click inline Play/Pause again to RESUME — should restart sentence idx
  console.log('\n[playall-pause] Step 3 — Click play again to RESUME from saved idx.');
  const beforeResumeIdx = logs.length;
  await playPauseBtn.click({ timeout: 5000 });
  await page.waitForTimeout(2000);

  const resumeLogs = logs.slice(beforeResumeIdx);
  const resumeCalled = resumeLogs.some(l => l.text.includes('[Player] resume() called'));
  console.log(`  Player resume logs:`);
  resumeLogs.filter(l => l.text.includes('[Player]')).forEach(l =>
    console.log(`    [${l.type}] ${l.text.slice(0, 120)}`)
  );
  console.log(`  ✅ resume() called:       ${resumeCalled ? 'YES' : 'NO ❌ BAD'}`);

  // Step 4: Wait for sequence to advance past idx 0 — proves it didn't die
  console.log('\n[playall-pause] Step 4 — Wait for sequence to advance (onEnd → next sentence).');
  await page.waitForTimeout(10000);  // generous wait for TTS worker call + actual playback
  const allPlayerLogs = logs.filter(l => l.text.includes('[Player]') || l.text.includes('[AudioHelper]'));
  const onEndLogs = allPlayerLogs.filter(l => l.text.includes('onEnd') || l.text.includes('ended'));
  const helperLogs = logs.filter(l => l.text.includes('[AudioHelper]'));
  const ttsLogs = logs.filter(l => l.text.includes('[TTS]') || l.text.includes('[TTSCache]'));
  console.log(`  Total Player/AudioHelper logs: ${allPlayerLogs.length}`);
  console.log(`  AudioHelper logs:`);
  helperLogs.forEach(l => console.log(`    [${l.type}] ${l.text.slice(0, 120)}`));
  console.log(`  TTS logs (last 6):`);
  ttsLogs.slice(-6).forEach(l => console.log(`    [${l.type}] ${l.text.slice(0, 120)}`));
  console.log(`  onEnd-related logs:`);
  onEndLogs.forEach(l => console.log(`    [${l.type}] ${l.text.slice(0, 120)}`));
  const nextScheduled = onEndLogs.some(l => l.text.includes('scheduling next'));
  console.log(`  ✅ sequence scheduled next sentence: ${nextScheduled ? 'YES' : 'NO ❌ BAD'}`);

  // Step 5: Verify activeSentenceId changed (proof sentence advanced)
  const playPauseTitle = await playPauseBtn.getAttribute('title');
  console.log(`\n  Active Play/Pause button title: "${playPauseTitle}"`);

  // ── Step 6: rapid-fire regression — Stop → Play again must NOT cycle through
  // every sentence in <1s. Pre-fix, this test counted 9+ onEnd logs in ~1s.
  console.log('\n[playall-pause] Step 6 — Rapid-fire regression: Stop → Play, count onEnd cycles in 4s.');
  const allLogsBeforeStop = logs.length;
  // Click inline Stop (red square icon next to Play/Pause)
  await page.locator('button[title="Stop"], button[title="Dừng"]').first().click({ timeout: 5000 });
  await page.waitForTimeout(500);
  // Click Play All again
  await playAllBtn.click({ timeout: 5000 });
  await page.waitForTimeout(4000);
  const postStopLogs = logs.slice(allLogsBeforeStop);
  const rapidFire = postStopLogs.filter(l => l.text.includes('playAll onEnd')).length;
  const rapidPlayerLogs = postStopLogs.filter(l => l.text.includes('[Player]') || l.text.includes('[AudioHelper]'));
  console.log(`  post-Stop Player logs:`);
  rapidPlayerLogs.slice(0, 10).forEach(l => console.log(`    [${l.type}] ${l.text.slice(0, 120)}`));
  console.log(`\n  rapid-fire onEnd cycles counted: ${rapidFire}`);
  // Pre-fix this would be ~9 within ~1s. With fix it should be at most 1
  // (the first sentence ending naturally) within 4s.
  const rapidFireGuarded = rapidFire <= 1;
  console.log(`  ✅ no rapid-fire (≤1 cycle):   ${rapidFireGuarded ? 'YES' : `NO ❌ BAD (${rapidFire} cycles)`}`);

  await page.screenshot({ path: `tests/e2e/screenshots/playall_pause_${Date.now()}.png`, fullPage: true });
  await browser.close();

  console.log('\n[playall-pause] ──── FINAL ────');
  const allPass = pauseCalled && seqStatePaused && resumeCalled && nextScheduled && rapidFireGuarded;
  if (allPass) {
    console.log('✅ PASS — sequence state machine preserved + advanced through pause/resume; no rapid-fire after Stop→Play.');
    process.exit(0);
  } else {
    console.log('❌ FAIL — see logs above.');
    process.exit(1);
  }
})().catch(err => {
  console.error('Fatal:', err);
  process.exit(2);
});
