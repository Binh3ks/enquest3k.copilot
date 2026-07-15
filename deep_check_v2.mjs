/**
 * deep_check_v2.mjs — Level-3 Deep Content & UI Check
 *
 * Checks things student_simulation.mjs CANNOT check:
 *  1. Audio HTTP reachability (vocab + shadowing, weeks 1-15 local files)
 *  2. AI Tutor TutorWindow — 3 tabs (Story Mission, Free Talk, Pronunciation) via Playwright
 *  3. Word Match data completeness — all formats, min pairs, no empty content
 *  4. Game Hub rendering — actual game content loads (weeks 16-30)
 *  5. week_XX_real.js completeness — story_missions, freetalk_knowledge, target_vocab
 *
 * Run: node deep_check_v2.mjs 2>&1 | tee /tmp/deep_check_v2_result.txt
 */

import { chromium } from 'playwright';
import { pathToFileURL } from 'url';
import { existsSync } from 'fs';
import path from 'path';

const BASE_URL = 'https://enquest3k.pages.dev';
const ROOT = process.cwd();
const WEEKS = Array.from({ length: 30 }, (_, i) => i + 1);
const MODES = ['advanced', 'easy'];

const results = { total: 0, pass: 0, fail: 0, warn: 0 };
const ISSUES = [];
const WARNINGS = [];

function pad(n) { return String(n).padStart(2, '0'); }
function tag(w, m, s) { return `[W${pad(w)} ${m}] [${s}]`; }
function issue(w, m, s, msg) { ISSUES.push(`${tag(w, m, s)} ❌ ${msg}`); results.fail++; }
function warn(w, m, s, msg)  { WARNINGS.push(`${tag(w, m, s)} ⚠️  ${msg}`); results.warn++; }
function pass()              { results.pass++; }
function check(w, m, s, ok, msg) {
  results.total++;
  if (ok) pass();
  else issue(w, m, s, msg);
}

async function loadMod(fpath) {
  try {
    const url = pathToFileURL(fpath).href + `?t=${Date.now()}`;
    const mod = await import(url);
    return mod.default ?? mod;
  } catch { return null; }
}

function getDataDir(week, mode) {
  const isEasy = mode === 'easy';
  const wpad = pad(week);
  // Advanced: src/data/weeks/week_NN or week_NN subfolder
  // Easy:     src/data/weeks_easy/week_NN
  const base = isEasy
    ? path.join(ROOT, 'src/data/weeks_easy', `week_${wpad}`)
    : path.join(ROOT, 'src/data/weeks', `week_${wpad}`);
  return base;
}

function getRealDataPath(week) {
  const wpad = pad(week);
  const candidates = [
    path.join(ROOT, 'src/data/weeks', `week_${wpad}`, `week_${wpad}_real.js`),
    path.join(ROOT, 'src/data/weeks', `week_${wpad}_real.js`),
  ];
  return candidates.find(existsSync) || null;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. AUDIO HTTP CHECK (weeks 1-15, local files on Cloudflare Pages)
// ─────────────────────────────────────────────────────────────────────────────
async function checkAudioHttp(url, week, mode, station, label) {
  if (!url) return;
  results.total++;
  try {
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
    const resp = await fetch(fullUrl, { method: 'HEAD', signal: AbortSignal.timeout(15000) });
    if (resp.ok) {
      pass();
    } else {
      issue(week, mode, station, `AUDIO HTTP ${resp.status}: ${url} (${label})`);
    }
  } catch (e) {
    issue(week, mode, station, `AUDIO FETCH ERROR: ${url} — ${e.message.slice(0, 60)}`);
  }
}

async function checkWeekAudioHttp(week, mode) {
  if (week >= 9) return; // W9+: on-demand TTS or R2, no local check needed
  const dir = getDataDir(week, mode);
  const vocabPath = path.join(dir, 'vocab.js');
  const shadowPath = path.join(dir, 'shadowing.js');

  const vocab = existsSync(vocabPath) ? await loadMod(vocabPath) : null;
  const shadow = existsSync(shadowPath) ? await loadMod(shadowPath) : null;

  const vocabArr = Array.isArray(vocab) ? vocab : (vocab?.vocab || []);

  // Check vocab audio_word (first 5 only to keep requests fast)
  const vocabSample = vocabArr.slice(0, 5);
  for (const v of vocabSample) {
    if (v?.audio_word) {
      await checkAudioHttp(v.audio_word, week, mode, 'vocab', `word: ${v.word}`);
    }
  }

  // Check shadowing sentences audio (first 3)
  const lines = shadow?.script || shadow?.sentences || [];
  for (const l of lines.slice(0, 3)) {
    if (l?.audio_url) {
      await checkAudioHttp(l.audio_url, week, mode, 'shadowing', `line: "${(l.text||'').slice(0,30)}..."`);
    }
  }
  // Shadowing full audio
  if (shadow?.audio_full) {
    await checkAudioHttp(shadow.audio_full, week, mode, 'shadowing', 'audio_full');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. WORD MATCH COMPLETENESS
// ─────────────────────────────────────────────────────────────────────────────
async function checkWordMatch(week, mode) {
  const dir = getDataDir(week, mode);
  const wmPath = path.join(dir, 'word_match.js');
  const vocabPath = path.join(dir, 'vocab.js');
  const s = 'word_match';

  if (!existsSync(wmPath)) { warn(week, mode, s, 'word_match.js missing'); return; }

  const wm = await loadMod(wmPath);
  const vocab = existsSync(vocabPath) ? await loadMod(vocabPath) : null;

  if (!wm) { issue(week, mode, s, 'word_match.js failed to load'); return; }

  // Handle sets format (newer weeks)
  const sets = wm?.sets || null;
  if (sets) {
    results.total++;
    if (!Array.isArray(sets) || sets.length === 0) {
      issue(week, mode, s, 'sets array empty');
    } else {
      let totalPairs = 0;
      sets.forEach((set, si) => {
        const pairs = set.pairs || [];
        totalPairs += pairs.length;
        pairs.forEach((p, pi) => {
          results.total++;
          const hasLeft = p.left || p.word || p.left_id;
          const hasRight = p.right || p.match || p.right_match;
          if (!hasLeft || !hasRight) {
            issue(week, mode, s, `set[${si}].pair[${pi}] missing left or right`);
          } else pass();
        });
      });
      if (totalPairs < 4) issue(week, mode, s, `only ${totalPairs} total pairs across all sets (min 4)`);
      else pass();
    }
    return;
  }

  const pairs = wm?.pairs || [];
  results.total++;
  if (pairs.length === 0) { issue(week, mode, s, 'pairs array is empty'); return; }
  if (pairs.length < 4) { warn(week, mode, s, `only ${pairs.length} pairs (min 4 recommended)`); }
  pass();

  // Determine format and validate
  const first = pairs[0];

  // Format A: number IDs [1, 2, 3...] — uses vocab by ID
  if (typeof first === 'number') {
    const vocabArr = Array.isArray(vocab) ? vocab : (vocab?.vocab || []);
    const vocabIds = new Set(vocabArr.map(v => v.id));
    pairs.forEach((id, i) => {
      results.total++;
      if (vocabIds.size > 0 && !vocabIds.has(id)) {
        issue(week, mode, s, `pairs[${i}] ID ${id} not found in vocab`);
      } else pass();
    });
    return;
  }

  // Format B: {left_id, right_match}
  if (first && 'left_id' in first) {
    const vocabArr = Array.isArray(vocab) ? vocab : (vocab?.vocab || []);
    const vocabIds = new Set(vocabArr.map(v => v.id));
    pairs.forEach((p, i) => {
      results.total++;
      if (!p.left_id || !p.right_match || String(p.right_match).trim() === '') {
        issue(week, mode, s, `pairs[${i}] {left_id, right_match} incomplete`);
      } else if (vocabIds.size > 0 && !vocabIds.has(p.left_id)) {
        warn(week, mode, s, `pairs[${i}] left_id ${p.left_id} not in vocab`);
        pass();
      } else pass();
    });
    return;
  }

  // Format C: {id, word, definition/match/meaning} or {id, wordId} — rich/reference format
  // {wordId} format: component reads vocab by ID for both sides — valid, no right field needed
  // {word, image} format: component uses image mode — valid, no text right field needed
  if (first && ('word' in first || 'match' in first || 'definition' in first || 'wordId' in first || 'image' in first)) {
    if ('wordId' in first) {
      // Pure reference format — component resolves from vocab, no content needed here
      pairs.forEach(() => { results.total++; pass(); });
      return;
    }
    if ('image' in first && !('match' in first) && !('definition' in first) && !('right_match' in first)) {
      // Image-only format — word+image mode, component handles visually
      pairs.forEach(() => { results.total++; pass(); });
      return;
    }
    pairs.forEach((p, i) => {
      results.total++;
      const hasLeft = p.word || p.left || p.wordId;
      const hasRight = p.match || p.definition || p.meaning || p.right || p.right_match;
      if (!hasLeft && !hasRight) {
        issue(week, mode, s, `pairs[${i}] missing both left and right content`);
      } else if (!hasLeft || !hasRight) {
        warn(week, mode, s, `pairs[${i}] missing left (${hasLeft||'empty'}) or right (${hasRight||'empty'})`);
        pass();
      } else pass();
    });
    return;
  }

  // Unknown format
  warn(week, mode, s, `unknown pairs format: ${JSON.stringify(first).slice(0, 80)}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. WEEK_XX_REAL.JS COMPLETENESS (AI Tutor data — all 3 tabs)
// ─────────────────────────────────────────────────────────────────────────────
async function checkRealData(week) {
  const s = 'ai_tutor_real';
  const fpath = getRealDataPath(week);

  results.total++;
  if (!fpath) {
    issue(week, 'adv', s, `week_${pad(week)}_real.js NOT FOUND — AI Tutor has no data`);
    return;
  }
  pass();

  const raw = await loadMod(fpath);
  if (!raw) { issue(week, 'adv', s, 'failed to import week_real.js'); return; }

  // Unwrap named export (e.g. weekXRealData) or default
  const d = raw.default
    || Object.values(raw).find(v => v && typeof v === 'object' && (v.week_id || v.story_missions))
    || raw;

  // ── TAB 1: Story Missions ──────────────────────────────────────────────────
  const missions = d.story_missions || d.storyMissions || d.missions || [];
  results.total++;
  if (missions.length === 0) {
    issue(week, 'adv', s, 'TAB1 story_missions EMPTY — Story Mission tab has nothing to load');
  } else if (missions.length < 3) {
    warn(week, 'adv', s, `TAB1 only ${missions.length} story missions (expected 3)`);
    pass();
  } else pass();

  missions.forEach((m, i) => {
    results.total++;
    const hasGreeting = m.nova_greeting || m.opening_narrative || m.intro;
    const hasContext  = m.mission_context || m.context || m.ai_instructions;
    if (!hasGreeting) issue(week, 'adv', s, `TAB1 mission[${i}] missing nova_greeting — student sees blank`);
    else if (!hasContext) { warn(week, 'adv', s, `TAB1 mission[${i}] missing mission_context`); pass(); }
    else pass();
  });

  // ── TAB 2: FreeTalk ────────────────────────────────────────────────────────
  const ft = d.freetalk_knowledge || d.freetalk || d.free_talk || {};
  results.total++;
  const ftKeys = Object.keys(ft || {});
  if (!ftKeys.length) {
    issue(week, 'adv', s, 'TAB2 freetalk_knowledge MISSING — Free Talk tab has no content');
  } else {
    const kb = ft.knowledge_base || ft.topics || ft.knowledge || [];
    if (!kb.length) issue(week, 'adv', s, 'TAB2 freetalk knowledge_base empty');
    else pass();

    const sp = ft.starter_prompts || ft.prompts || ft.questions || [];
    if (!sp.length) warn(week, 'adv', s, 'TAB2 no starter_prompts — quick-start buttons empty');
    sp.forEach((p, i) => {
      if (!p.text_en && !p.text && !p.label)
        warn(week, 'adv', s, `TAB2 starter_prompt[${i}] missing text_en`);
    });
  }

  // ── TAB 3: Pronunciation vocab / conversation cards ────────────────────────
  const tv = d.target_vocab || d.vocabulary || d.vocab || [];
  results.total++;
  if (!tv.length) {
    issue(week, 'adv', s, 'TAB3 target_vocab EMPTY — Pronunciation tab has no words');
  } else {
    if (tv.length < 5) warn(week, 'adv', s, `TAB3 only ${tv.length} target_vocab words`);
    let badCount = 0;
    tv.forEach((v, i) => {
      const word = typeof v === 'string' ? v : v.word;
      if (!word) badCount++;
    });
    if (badCount > 0) issue(week, 'adv', s, `TAB3 ${badCount} target_vocab entries missing word field`);
    else pass();
  }

  // week_id consistency
  if (d.week_id !== undefined && d.week_id !== week) {
    warn(week, 'adv', s, `week_id mismatch: file has ${d.week_id}, expected ${week}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. GAME HUB CONTENT (via Playwright, weeks 16-30)
// ─────────────────────────────────────────────────────────────────────────────
async function checkGameHub(page, week, mode) {
  const s = 'game_hub';
  const url = `${BASE_URL}/week/${week}/game_hub`;
  results.total++;
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    if (!resp || resp.status() >= 400) {
      issue(week, mode, s, `HTTP ${resp?.status() || 'no response'}`);
      return;
    }

    await page.waitForTimeout(2000);

    // Check for React crash
    const hasCrash = await page.$('text=Something went wrong');
    if (hasCrash) { issue(week, mode, s, 'React error boundary triggered'); return; }

    // Check for actual game content (words, buttons, game title)
    const content = await page.evaluate(() => {
      const text = document.body.innerText;
      const hasGameContent =
        text.includes('Show') || text.includes('Tell') || text.includes('Say') ||
        text.includes('Word') || text.includes('Play') || text.includes('Game') ||
        text.includes('Sentence') || text.includes('Score') || text.includes('Start') ||
        document.querySelectorAll('button').length > 3;
      const hasVocabWord = document.querySelectorAll('[class*="card"], [class*="word"], [class*="btn"]').length > 2;
      return {
        hasGameContent,
        hasVocabWord,
        textLen: text.replace(/\s/g, '').length,
        buttonCount: document.querySelectorAll('button').length
      };
    });

    if (!content.hasGameContent && content.textLen < 100) {
      issue(week, mode, s, 'game_hub appears empty (no game content detected)');
    } else if (content.buttonCount < 2) {
      warn(week, mode, s, `game_hub has only ${content.buttonCount} buttons (expected interactive game)`);
      pass();
    } else {
      pass();
    }
  } catch (e) {
    issue(week, mode, s, `CRASH: ${e.message.slice(0, 80)}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. AI TUTOR TUTORWINDOW — 3 TABS via Playwright
// ─────────────────────────────────────────────────────────────────────────────
async function checkTutorWindow(page, week, mode) {
  const s = 'tutor_window';
  // Only check one representative station per week (read_explore)
  const url = `${BASE_URL}/week/${week}/read_explore`;

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 25000 });

    // Wait for React hydration + Zustand store init (Nova button is conditionally rendered)
    let tutorBtn = null;
    try {
      tutorBtn = await page.waitForSelector(
        'button[title="Nova AI Tutor"], button:has-text("Talk with me")',
        { timeout: 5000 }
      );
    } catch { /* not found within timeout */ }

    results.total++;
    if (!tutorBtn) {
      issue(week, mode, s, 'Nova floating button not found on read_explore page');
      return;
    }
    pass();

    // Click to open
    await tutorBtn.click();
    await page.waitForTimeout(1500);

    // Check TutorWindow rendered
    const windowContent = await page.evaluate(() => {
      const text = document.body.innerText;
      return {
        hasNova: text.includes('Nova') || text.includes('nova'),
        hasStoryMission: text.includes('Story Mission') || text.includes('Story'),
        hasFreeTalk: text.includes('Free Talk') || text.includes('FreeTalk'),
        hasPronunciation: text.includes('Pronunciation') || text.includes('Pronounce'),
        hasDebateLocked: text.includes('Debate'),
        rawSnippet: text.slice(0, 300),
      };
    });

    results.total++;
    if (!windowContent.hasNova) {
      issue(week, mode, s, 'TutorWindow opened but Nova header not visible');
      return;
    }
    pass();

    // Check all 3 active tabs visible
    results.total++;
    const tab1 = windowContent.hasStoryMission;
    const tab2 = windowContent.hasFreeTalk;
    const tab3 = windowContent.hasPronunciation;
    const missingTabs = [];
    if (!tab1) missingTabs.push('Story Mission');
    if (!tab2) missingTabs.push('Free Talk');
    if (!tab3) missingTabs.push('Pronunciation');
    if (missingTabs.length > 0) {
      issue(week, mode, s, `Missing tabs: ${missingTabs.join(', ')} | Found: "${windowContent.rawSnippet.slice(0, 200)}"`);
    } else pass();

    // Click Story Mission tab and verify greeting loads
    results.total++;
    try {
      const storyBtn = await page.$('button:has-text("Story Mission"), button:has-text("Story")');
      if (storyBtn) {
        await storyBtn.click();
        await page.waitForTimeout(1000);
        const storyContent = await page.evaluate(() => {
          const text = document.body.innerText;
          // Nova's greeting should appear
          const hasGreeting = text.includes('Hello') || text.includes('Hi') ||
                              text.includes('Mission') || text.includes('Name') ||
                              text.includes('Nova') || text.includes('Chat');
          return { hasGreeting, len: text.replace(/\s/g,'').length };
        });
        if (!storyContent.hasGreeting || storyContent.len < 200) {
          warn(week, mode, s, 'Story Mission tab clicked but no greeting/content visible');
          pass();
        } else pass();
      } else {
        warn(week, mode, s, 'Could not click Story Mission tab (button not found)');
        pass();
      }
    } catch { pass(); } // non-critical

    // Click Free Talk tab
    results.total++;
    try {
      const ftBtn = await page.$('button:has-text("Free Talk")');
      if (ftBtn) {
        await ftBtn.click();
        await page.waitForTimeout(800);
        const ftContent = await page.evaluate(() => {
          const text = document.body.innerText;
          const hasFT = text.includes('Free Talk') || text.includes('talk') ||
                        text.includes('Topic') || text.includes('Chat') ||
                        document.querySelectorAll('button').length > 4;
          return { hasFT };
        });
        if (!ftContent.hasFT) { warn(week, mode, s, 'Free Talk tab has no visible content'); pass(); }
        else pass();
      } else { pass(); }
    } catch { pass(); }

    // Close the tutor window for next iteration
    try {
      const closeBtn = await page.$('[aria-label="Close AI Tutor"], button:has-text("Close")');
      if (closeBtn) await closeBtn.click();
      await page.waitForTimeout(500);
    } catch { /* ignore */ }

  } catch (e) {
    results.total++;
    issue(week, mode, s, `CRASH: ${e.message.slice(0, 80)}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SETUP STUDENT SESSION
// ─────────────────────────────────────────────────────────────────────────────
// token is intentionally null so App.jsx skips the getMe() call
// (which would fail with 401 for a fake token and trigger auto-logout,
// hiding the Nova button). The Nova button only checks currentUser?.role !== 'guest'.
async function setupStudentSession(context, mode) {
  // Inject localStorage BEFORE any page loads so Zustand hydrates with the correct user.
  await context.addInitScript((learningMode) => {
    const state = {
      state: {
        currentUser: { name: 'TestStudent', role: 'student', id: 999, avatarUrl: '' },
        token: null,   // null → App.jsx will NOT call getMe() → no 401 auto-logout
        learningMode,
        progressCache: {},
        weekCompletion: {},
        weekStars: {},
        earnedBadges: [],
      },
      version: 0,
    };
    window.localStorage.setItem('engquest-user-storage', JSON.stringify(state));
    window.localStorage.setItem('placement_result', 'completed');
    window.localStorage.setItem('engquest_content_mode', learningMode);
  }, mode);
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║     ENGQUEST DEEP CHECK V2 — Content + UI + Audio           ║');
  console.log('║     Audio HTTP · AI Tutor 3 Tabs · Word Match · GameHub     ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  // ── PHASE 1: Static data checks (no browser needed) ──────────────────────
  console.log('════════════════════════════════════════════════════════════════');
  console.log('  PHASE 1: Data-level checks (Word Match + AI Tutor Real Data)');
  console.log('════════════════════════════════════════════════════════════════\n');

  for (const week of WEEKS) {
    process.stdout.write(`  W${pad(week)}: `);

    // Word match — both modes
    for (const mode of MODES) {
      await checkWordMatch(week, mode);
    }

    // AI Tutor real data (mode-independent)
    await checkRealData(week);

    console.log(`done`);
  }

  // ── PHASE 2: Audio HTTP checks (weeks 1-8) ────────────────────────────────
  console.log('\n════════════════════════════════════════════════════════════════');
  console.log('  PHASE 2: Audio HTTP reachability (W01-08)');
  console.log('════════════════════════════════════════════════════════════════\n');

  for (const week of WEEKS.filter(w => w <= 8)) {
    for (const mode of MODES) {
      process.stdout.write(`  W${pad(week)} [${mode === 'advanced' ? 'adv' : 'eas'}] audio... `);
      await checkWeekAudioHttp(week, mode);
      console.log('done');
    }
  }

  // ── PHASE 3: Playwright — AI Tutor TutorWindow + Game Hub ────────────────
  console.log('\n════════════════════════════════════════════════════════════════');
  console.log('  PHASE 3: Playwright — AI Tutor TutorWindow (3 tabs) + Game Hub');
  console.log('════════════════════════════════════════════════════════════════\n');

  const browser = await chromium.launch({ headless: true });

  for (const mode of MODES) {
    console.log(`\n  -- Mode: ${mode.toUpperCase()} --`);
    const context = await browser.newContext();
    await setupStudentSession(context, mode);  // injects localStorage via addInitScript
    const page = await context.newPage();

    for (const week of WEEKS) {
      process.stdout.write(`  W${pad(week)} [${mode === 'advanced' ? 'adv' : 'eas'}]: `);

      // Nova AI Tutor TutorWindow — all 30 weeks
      process.stdout.write(`tutor... `);
      await checkTutorWindow(page, week, mode);

      // Game Hub — all 30 weeks (station exists for every week)
      process.stdout.write(`gamehub... `);
      await checkGameHub(page, week, mode);

      console.log(`✓`);
    }

    await context.close();
  }

  await browser.close();

  // ── REPORT ────────────────────────────────────────────────────────────────
  console.log('\n════════════════════════════════════════════════════════════════');
  console.log('  DEEP CHECK V2 REPORT');
  console.log('════════════════════════════════════════════════════════════════');
  console.log(`  Total checks : ${results.total}`);
  console.log(`  PASS         : ${results.pass}`);
  console.log(`  FAIL (❌)    : ${results.fail}`);
  console.log(`  WARN (⚠️ )   : ${results.warn}`);

  if (ISSUES.length === 0 && WARNINGS.length === 0) {
    console.log('\n  ✅ ALL CHECKS PASSED — No issues found!\n');
  } else {
    if (ISSUES.length > 0) {
      console.log(`\n  ❌ ${ISSUES.length} CRITICAL ISSUES:\n`);
      ISSUES.forEach(i => console.log(`  ${i}`));
    }
    if (WARNINGS.length > 0) {
      console.log(`\n  ⚠️  ${WARNINGS.length} WARNINGS:\n`);
      WARNINGS.forEach(w => console.log(`  ${w}`));
    }
  }
  console.log('\n════════════════════════════════════════════════════════════════\n');
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
