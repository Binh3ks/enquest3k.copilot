// Shadowing Pause Contract Verification — June 30, 2026
// User reported the inline Pause button did not actually stop audio in
// PLAY_TTS / transcript-from-video / challenge modes. This test verifies
// the June 30 fix (`d389574c`) holds: clicking pause mid-challenge
// (1) stops VoiceService audio
// (2) does NOT fire speakText onEnd
// (3) does NOT fire PLAY_TTS advance → TTS_ENDED
// (4) keeps activeSentenceId intact
// (5) clicking play again resumes (logs case 0)

const { chromium } = require('playwright');

const TEST_WEEK = parseInt(process.env.TEST_WEEK || '30', 10);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const logs = [];
  page.on('console', (msg) => {
    const text = msg.text();
    logs.push({ type: msg.type(), text, time: Date.now() });
  });
  page.on('pageerror', (err) => {
    logs.push({ type: 'pageerror', text: String(err), time: Date.now() });
  });

  console.log(`\n[verify] Loading /week/${TEST_WEEK}/shadowing\n`);

  // ── Step 0: prime localStorage with guest user so MainLayout doesn't
  //    early-return to the LandingPage. Zustand persist key = 'engquest-user-storage'.
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);
  await page.evaluate(() => {
    const guestUser = { name: 'Guest', role: 'guest', avatarUrl: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Guest' };
    const storage = {
      state: {
        currentUser: guestUser,
        token: null,
        learningMode: 'advanced',
        progressCache: {},
        weekCompletion: {},
        weekStars: {},
        earnedBadges: [],
        avatarItems: [],
        equippedItems: { hat: null, glasses: null, accessory: null },
      },
      version: 2,
    };
    localStorage.setItem('engquest-user-storage', JSON.stringify(storage));
    localStorage.setItem('placement_result', JSON.stringify({ startWeek: 30 }));
  });
  console.log('[verify] Primed localStorage with guest user (role=guest, learningMode=advanced).\n');

  await page.goto(`http://localhost:5173/week/${TEST_WEEK}/shadowing`, { waitUntil: 'domcontentloaded' });

  // Wait for app shell + shadowing station
  try {
    await page.waitForSelector('[title="Save your practice"], [title="Lưu bài luyện tập"]', { timeout: 45000 });
    console.log('[verify] Shadowing station loaded.\n');
  } catch (e) {
    console.log('[verify] Save button not found. Page state snapshot:');
    console.log('---HTML SNAPSHOT (first 2500 chars)---');
    const html = await page.content();
    console.log(html.slice(0, 2500));
    console.log('---END---');
    console.log(`\n[verify] Captured ${logs.length} console logs during load:`);
    logs.forEach(l => console.log(`  [${l.type}] ${l.text}`));
    throw e;
  }

  // ── Step 1: open Setup modal via Save button ──────────────────
  const saveBtn = page.locator('[title="Save your practice"], [title="Lưu bài luyện tập"]').first();
  await saveBtn.click();
  console.log('[verify] Clicked Save (openSetupModal).');

  // Wait for modal
  await page.waitForSelector('button:has-text("Start Challenge"), button:has-text("Bắt đầu thử thách")', { timeout: 5000 });
  console.log('[verify] SavePracticeModal opened.\n');

  // Default is "per-sentence" per SavePracticeModal.jsx, but click to ensure
  const perSentenceBtn = page.locator('button:has-text("Per-sentence"), button:has-text("Từng câu")').first();
  if (await perSentenceBtn.count()) {
    try { await perSentenceBtn.click({ timeout: 1000 }); } catch { /* may already be selected */ }
  }

  // ── Step 2: start challenge (transitions SETUP → PLAY_TTS) ─────
  const startBtn = page.locator('button:has-text("Start Challenge"), button:has-text("Bắt đầu thử thách")').first();
  await startBtn.click();
  console.log('[verify] Clicked Start Challenge → phase transitions to PLAY_TTS.\n');

  // Give PLAY_TTS useEffect time to fire + speakText to actually start
  await page.waitForTimeout(1500);

  const beforePauseLogs = logs.length;
  // Selector covers: Play / Pause / Resume / Tiếp tục / Phát / Tạm dừng (VI)
  const playPauseBtn = page.locator(
    'button[title="Pause"], button[title="Play"], button[title="Resume"], ' +
    'button[title="Phát"], button[title="Tạm dừng"], button[title="Tiếp tục"]'
  ).first();

  console.log('[verify] Step 3 — Click Play/Pause to PAUSE (challenge case 2).');
  await playPauseBtn.click({ timeout: 5000 });

  // ── Step 4: wait 3s — must NOT see advance, must NOT see speakText ended ──
  await page.waitForTimeout(3000);

  const afterPauseLogs = logs.slice(beforePauseLogs);
  console.log(`\n[verify] Captured ${afterPauseLogs.length} log entries between pause click + 3s wait:\n`);
  afterPauseLogs.forEach(l => {
    console.log(`  [${l.type}] ${l.text}`);
  });

  // ── Assertions ───────────────────────────────────────────────
  const advanceLog = logs.find(l => l.text.includes('PLAY_TTS advance'));
  const speakEnded = logs.find(l => l.text.includes('PLAY_TTS speakText ended'));
  const clearedActive = logs.find(l => l.text.includes('clearing activeSentenceId'));
  const pausedChallengeLog = logs.find(l => l.text.includes('pausing challenge'));
  const case2Log = logs.find(l => l.text.includes('case 2 (pause)'));
  const countdown = logs.find(l => l.text.includes('COUNTDOWN_321'));
  const recording = logs.find(l => l.text.includes('phase: PHASES.RECORDING') || l.text.includes('"phase":"RECORDING"'));

  console.log('\n[verify] ── Result ──');
  console.log(`  ✅ case 2 (pause) logged:      ${case2Log ? 'YES' : 'NO'}`);
  console.log(`  ✅ pauseChallenge called:       ${pausedChallengeLog ? 'YES' : 'NO'}`);
  console.log(`  ✅ NO PLAY_TTS advance:        ${!advanceLog ? 'YES' : 'NO ❌ BAD'}`);
  console.log(`  ✅ NO speakText ended:         ${!speakEnded ? 'YES' : 'NO ❌ BAD'}`);
  console.log(`  ✅ NO clearing activeSentenceId: ${!clearedActive ? 'YES' : 'NO ❌ BAD'}`);
  console.log(`  ✅ NO COUNTDOWN_321 transition: ${!countdown ? 'YES' : 'NO ❌ BAD'}`);
  console.log(`  ✅ NO RECORDING phase:          ${!recording ? 'YES' : 'NO ❌ BAD'}`);

  const pauseContractHolds = !advanceLog && !speakEnded && !clearedActive && !countdown && !recording;

  // ── Step 5: click Play/Pause again — should be RESUME (case 0) ─
  console.log('\n[verify] Step 5 — Click Play/Pause to RESUME (challenge case 0).');
  const beforeResumeCount = logs.length;
  await playPauseBtn.click({ timeout: 5000 });
  await page.waitForTimeout(2000);
  const resumeLogs = logs.slice(beforeResumeCount).filter(l => l.text.includes('PlayPause') || l.text.includes('[Challenge]'));
  console.log(`\n[verify] Resume section logs:`);
  resumeLogs.forEach(l => console.log(`  [${l.type}] ${l.text}`));

  const case0Log = logs.find(l => l.text.includes('case 0 (challenge resume)'));
  console.log(`\n  ✅ case 0 (resume) logged:      ${case0Log ? 'YES' : 'NO ❌ BAD'}`);

  // ── Step 6: natural advance — wait for PLAY_TTS to complete so we know
  // the natural end-of-sentence path also doesn't fire unwanted fallbacks.
  // Note: per-sentence challenge only runs PLAY_TTS once per sentence (then
  // advances to COUNTDOWN_321 → RECORDING). Multi-sentence PLAY_TTS pause is
  // therefore not exercised here — that's a separate code path handled by
  // playAll's 800ms inter-sentence gap, not the d389574c fix.
  console.log('\n[verify] Step 6 — Natural advance: wait for sentence 1 to end.');
  await page.waitForTimeout(8000);  // sentence 1 TTS (~3s) + advance + COUNTDOWN
  const advanceLogs = logs.filter(l =>
    l.text.includes('PLAY_TTS advance') ||
    l.text.includes('PLAY_TTS speakText ended')
  );
  console.log(`\n[verify] PLAY_TTS end-of-sentence logs:`);
  advanceLogs.forEach(l => console.log(`  [${l.type}] ${l.text}`));
  const naturalAdvance = advanceLogs.length > 0;
  console.log(`\n  ✅ natural TTS end detected: ${naturalAdvance ? 'YES' : 'NO ❌ BAD'}`);

  // Capture final screenshot
  await page.screenshot({ path: `tests/e2e/screenshots/pause_verify_${Date.now()}.png`, fullPage: true });

  await browser.close();

  console.log('\n[verify] ──── FINAL ────');
  if (pauseContractHolds && case0Log && naturalAdvance) {
    console.log('✅ PASS — pause halts audio (no onEnd, no advance); resume fires case 0; natural end-of-sentence still works.');
    process.exit(0);
  } else {
    console.log('❌ FAIL — see logs above.');
    process.exit(1);
  }
})().catch(err => {
  console.error('Fatal:', err);
  process.exit(2);
});
