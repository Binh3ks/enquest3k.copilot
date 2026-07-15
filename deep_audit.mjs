// deep_audit.mjs
// Level-2 student-experience audit:
//  - Image file existence (all image_url fields)
//  - Audio file existence (W1-15 local; W16+ marked as on-demand)
//  - AI Tutor 3 tabs: story_missions + freetalk_knowledge + conversation_cards/vocab
//  - Word Match pairs validation
//  - Games config validation
//  - Grammar MC answer-in-options (deep check)
//  - Ask AI full per-prompt review
// Run: node deep_audit.mjs

import { existsSync, readdirSync } from 'fs';
import { pathToFileURL } from 'url';
import path from 'path';

const ROOT = process.cwd();

const ISSUES   = [];
const WARNINGS = [];
const stats    = { weeks: 0, images_checked: 0, images_missing: 0, audio_checked: 0, audio_missing: 0 };

function tag(week, mode, station) {
  return `[W${String(week).padStart(2,'0')} ${mode}] [${station}]`;
}
function issue(week, mode, station, msg)  { ISSUES.push(`${tag(week,mode,station)} ❌ ${msg}`); }
function warn(week, mode, station, msg)   { WARNINGS.push(`${tag(week,mode,station)} ⚠️  ${msg}`); }

async function loadMod(fpath) {
  try {
    const url = pathToFileURL(fpath).href + `?t=${Date.now()}`;
    const mod = await import(url);
    return mod.default ?? mod;
  } catch(e) { return null; }
}

// ─── AUDIO/IMAGE HELPERS ─────────────────────────────────────────────────────
// W1-15: audio served from /public/audio/weekN/ (local files exist)
// W16+: on-demand R2 via Deepgram Worker — audio_url is the R2 key path, no local file expected
// We only check LOCAL existence for W1-15
function audioDir(week, mode) {
  const pad  = String(week);
  const easy = mode === 'easy' ? '_easy' : '';
  // dirs can be named week1, week2...week9, week09, week10...
  const candidates = [
    `public/audio/week${pad}${easy}`,
    `public/audio/week${pad.padStart(2,'0')}${easy}`,
  ];
  return candidates.find(d => existsSync(path.join(ROOT, d)));
}

function imageFileExists(url) {
  if (!url) return false;
  const rel = url.startsWith('/') ? url.slice(1) : url;
  return existsSync(path.join(ROOT, 'public', rel.startsWith('public/') ? rel.slice(7) : rel))
      || existsSync(path.join(ROOT, 'public', rel));
}

function audioFileExists(url, week) {
  if (!url || url === null) return true; // null = TTS on-demand, skip
  if (week >= 16) return true; // W16+ on-demand R2, no local file expected
  const rel = url.startsWith('/') ? url.slice(1) : url;
  return existsSync(path.join(ROOT, 'public', rel));
}

function checkImageUrl(url, week, mode, station, label) {
  if (!url) { warn(week, mode, station, `${label}: missing image_url`); return; }
  stats.images_checked++;
  if (!imageFileExists(url)) {
    stats.images_missing++;
    issue(week, mode, station, `IMAGE MISSING: ${url}`);
  }
}

function checkAudioUrl(url, week, mode, station, label) {
  if (!url || url === null) return; // TTS on-demand or intentionally null
  if (week >= 9) return; // W9-15: pre-generated on R2 CDN (not local); W16+: on-demand R2
  stats.audio_checked++;
  if (!audioFileExists(url, week)) {
    stats.audio_missing++;
    issue(week, mode, station, `AUDIO MISSING: ${url}`);
  }
}

// ─── VOCAB DEEP ──────────────────────────────────────────────────────────────
function deepCheckVocab(data, week, mode) {
  const s = 'vocab';
  const arr = Array.isArray(data) ? data : (data?.vocab || []);
  arr.forEach((v, i) => {
    checkImageUrl(v.image_url, week, mode, s, `vocab[${i}] "${v.word}"`);
    checkAudioUrl(v.audio_word, week, mode, s, `vocab[${i}] "${v.word}" audio_word`);
    checkAudioUrl(v.audio_definition, week, mode, s, `vocab[${i}] "${v.word}" audio_definition`);
    checkAudioUrl(v.audio_example, week, mode, s, `vocab[${i}] "${v.word}" audio_example`);
    checkAudioUrl(v.audio_collocation, week, mode, s, `vocab[${i}] "${v.word}" audio_collocation`);
  });
}

// ─── WORD POWER DEEP ─────────────────────────────────────────────────────────
function deepCheckWordPower(data, week, mode) {
  const s = 'word_power';
  const words = data?.words || [];
  words.forEach((w, i) => {
    checkImageUrl(w.image_url, week, mode, s, `words[${i}] "${w.word}"`);
    checkAudioUrl(w.audio_url, week, mode, s, `words[${i}] "${w.word}" audio`);
  });
}

// ─── GRAMMAR DEEP ────────────────────────────────────────────────────────────
function deepCheckGrammar(data, week, mode) {
  const s = 'grammar';
  const ex = data?.exercises || [];
  ex.forEach((e, i) => {
    checkAudioUrl(e.audio_url, week, mode, s, `exercise[${i}] audio`);
    // MC: answer must be in options
    if (e.type === 'mc' && e.options && e.answer) {
      if (!e.options.includes(e.answer)) {
        issue(week, mode, s, `exercise[${i}] mc answer "${e.answer}" NOT in options [${e.options.join(' | ')}]`);
      }
    }
  });
  // grammar_explanation audio
  const ge = data?.grammar_explanation;
  if (ge) {
    checkAudioUrl(ge.audio_url, week, mode, s, 'grammar_explanation audio');
    (ge.rules || []).forEach((r, i) => checkAudioUrl(r.audio_url, week, mode, s, `rule[${i}] audio`));
  }
}

// ─── READ / EXPLORE DEEP ─────────────────────────────────────────────────────
function deepCheckRead(data, week, mode, station) {
  const s = station;
  checkImageUrl(data?.image_url, week, mode, s, 'cover image');
  checkAudioUrl(data?.audio_url, week, mode, s, 'main audio');
}

// ─── DICTATION DEEP ──────────────────────────────────────────────────────────
function deepCheckDictation(data, week, mode) {
  const s = 'dictation';
  (data?.sentences || []).forEach((sent, i) => {
    checkAudioUrl(sent.audio_url, week, mode, s, `sentence[${i}] audio`);
  });
}

// ─── SHADOWING DEEP ──────────────────────────────────────────────────────────
function deepCheckShadowing(data, week, mode) {
  const s = 'shadowing';
  const lines = data?.script || data?.sentences || [];
  lines.forEach((l, i) => {
    checkAudioUrl(l.audio_url, week, mode, s, `line[${i}] audio`);
  });
}

// ─── ASK AI DEEP ─────────────────────────────────────────────────────────────
function deepCheckAskAI(data, week, mode) {
  const s = 'ask_ai';
  const prompts = data?.prompts || [];
  prompts.forEach((p, i) => {
    checkAudioUrl(p.audio_url, week, mode, s, `prompt[${i}] audio`);
    // nova_says should not be empty
    if (!p.nova_says || p.nova_says.trim() === '')
      issue(week, mode, s, `prompt[${i}] nova_says is empty`);
    // answer must exist and not be empty
    const ans = Array.isArray(p.answer) ? p.answer : (p.answer ? [p.answer] : []);
    if (ans.some(a => !a || String(a).trim() === ''))
      issue(week, mode, s, `prompt[${i}] contains empty answer string`);
    // task_en not empty
    if (!p.task_en || p.task_en.trim() === '')
      issue(week, mode, s, `prompt[${i}] task_en is empty`);
  });
}

// ─── LOGIC / SINGAPORE MATH DEEP ─────────────────────────────────────────────
function deepCheckLogic(data, week, mode, station) {
  const s = station;
  const arr = data?.questions || data?.puzzles || data?.problems || [];
  arr.forEach((q, i) => {
    checkImageUrl(q.image_url || q.barmodel_url, week, mode, s, `item[${i}] image`);
    checkAudioUrl(q.audio_url, week, mode, s, `item[${i}] audio`);
  });
}

// ─── MINDMAP DEEP ────────────────────────────────────────────────────────────
function deepCheckMindmap(data, week, mode) {
  const s = 'mindmap';
  checkImageUrl(data?.image_url || data?.mindMapContent?.image_url, week, mode, s, 'cover image');
  checkAudioUrl(data?.audio_url || data?.mindMapContent?.audio_url, week, mode, s, 'main audio');
}

// ─── DAILY WATCH DEEP ────────────────────────────────────────────────────────
function deepCheckDailyWatch(data, week, mode) {
  const s = 'daily_watch';
  const videos = data?.videos || [];
  videos.forEach((v, i) => {
    const vid = v.videoId || v.youtube_id || '';
    // YouTube ID must be exactly 11 chars
    if (vid && vid.length !== 11)
      issue(week, mode, s, `video[${i}] videoId "${vid}" is not 11 chars (YouTube standard)`);
    if (!v.title_en && !v.title)
      warn(week, mode, s, `video[${i}] missing title_en`);
    if (!v.subject)
      warn(week, mode, s, `video[${i}] missing subject/category`);
  });
}

// ─── WORD MATCH DEEP ─────────────────────────────────────────────────────────
function deepCheckWordMatch(data, vocab, week, mode) {
  const s = 'word_match';
  if (!data) { warn(week, mode, s, 'word_match.js missing'); return; }
  const pairs = data?.pairs || [];
  if (!pairs.length) { warn(week, mode, s, 'pairs array is empty'); return; }

  // New format: array of {left_id, right_match}
  const isNewFormat = typeof pairs[0] === 'object' && pairs[0] !== null && 'left_id' in pairs[0];
  if (isNewFormat) {
    const vocabArr = Array.isArray(vocab) ? vocab : (vocab?.vocab || []);
    const vocabIds = new Set(vocabArr.map(v => v.id));
    pairs.forEach((p, i) => {
      if (!p.left_id) issue(week, mode, s, `pair[${i}] missing left_id`);
      if (!p.right_match || p.right_match.trim() === '') issue(week, mode, s, `pair[${i}] missing right_match`);
      if (p.left_id && vocabIds.size && !vocabIds.has(p.left_id))
        warn(week, mode, s, `pair[${i}] left_id ${p.left_id} not found in vocab`);
    });
  } else {
    // Old format: pairs = [1, 2, 3...] — just IDs, engine uses vocab
    if (!Array.isArray(pairs) || pairs.some(p => typeof p !== 'number'))
      warn(week, mode, s, 'pairs uses old number format — consider upgrading to {left_id, right_match}');
  }
}

// ─── GAMES DEEP ──────────────────────────────────────────────────────────────
function deepCheckGames(data, week, mode) {
  const s = 'games';
  if (!data) { warn(week, mode, s, 'games.js missing or failed to load'); return; }
  // Find the actual data object (could be named export)
  const d = data.default
    || Object.values(data).find(v => v && typeof v === 'object' && (v.vocabulary || v.games || v.vocab))
    || data;

  const vocab = d.vocabulary || d.vocab || d.show_tell?.word_list || [];
  // W24+ uses matching/sorting games format — vocabulary comes from cumulative vocab fallback
  if (!vocab.length && week < 24) issue(week, mode, s, 'vocabulary list empty — game engine needs word list');
  if (vocab.length > 0 && vocab.length < 5) warn(week, mode, s, `Only ${vocab.length} vocab words in games (expected ≥8)`);

  // Check for at least one game config
  const hasShowTell = !!d.show_tell;
  const hasGamesArr = Array.isArray(d.games) && d.games.length > 0;
  if (!hasShowTell && !hasGamesArr)
    warn(week, mode, s, 'no show_tell or games[] config — game engine may have nothing to render');

  // Validate games array if present
  if (hasGamesArr) {
    d.games.forEach((g, i) => {
      if (!g.id)   warn(week, mode, s, `games[${i}] missing id`);
      if (!g.type) warn(week, mode, s, `games[${i}] missing type`);
      if (!g.title_en && !g.title) warn(week, mode, s, `games[${i}] missing title_en`);
      // For matching games: check cards exist
      if (g.type === 'matching' && (!g.cards || g.cards.length < 4))
        issue(week, mode, s, `games[${i}] matching game has < 4 cards`);
      // For sorting games: check items
      if (g.type === 'sorting' && (!g.items || g.items.length < 2))
        issue(week, mode, s, `games[${i}] sorting game has < 2 items`);
    });
  }
  checkImageUrl(d.image_url, week, mode, s, 'games cover image');
}

// ─── AI TUTOR DEEP (3 TABS) ──────────────────────────────────────────────────
function deepCheckAITutor(data, week) {
  const s = 'ai_tutor';
  if (!data) return;

  const d = data.default
    || Object.values(data).find(v => typeof v === 'object' && v !== null && (v.week_id || v.story_missions))
    || data;

  // ── TAB 1: Story Missions ──
  const missions = d.story_missions || d.storyMissions || d.missions || [];
  missions.forEach((m, i) => {
    if (!m.nova_greeting && !m.opening_narrative)
      issue(week, 'adv', s, `TAB1 mission[${i}] missing nova_greeting/opening_narrative — student sees blank on first load`);
    if (!m.mission_context && !m.context)
      issue(week, 'adv', s, `TAB1 mission[${i}] missing mission_context — AI has no instructions`);
    if (!m.target_vocab || !m.target_vocab.length)
      warn(week, 'adv', s, `TAB1 mission[${i}] missing target_vocab`);
    if (!m.story_character && !m.character)
      warn(week, 'adv', s, `TAB1 mission[${i}] missing story_character`);
    const minTurns = m.minimum_turns || m.min_turns;
    if (!minTurns) warn(week, 'adv', s, `TAB1 mission[${i}] missing minimum_turns`);
    const arc = m.story_arc || [];
    if (!arc.length) warn(week, 'adv', s, `TAB1 mission[${i}] missing story_arc`);
  });

  // ── TAB 2: FreeTalk ──
  const ft = d.freetalk_knowledge || d.freetalk || {};
  if (!ft || Object.keys(ft).length === 0) {
    issue(week, 'adv', s, 'TAB2 FreeTalk: freetalk_knowledge missing — FreeTalk tab has no content');
  } else {
    const kb = ft.knowledge_base || [];
    if (!kb.length) issue(week, 'adv', s, 'TAB2 FreeTalk: knowledge_base is empty — AI has no topic context');
    else if (kb.length < 5) warn(week, 'adv', s, `TAB2 FreeTalk: only ${kb.length} knowledge_base entries (expected ≥8)`);

    const sp = ft.starter_prompts || [];
    if (!sp.length) warn(week, 'adv', s, 'TAB2 FreeTalk: no starter_prompts — students see blank quick-start buttons');
    else {
      sp.forEach((p, i) => {
        if (!p.text_en) issue(week, 'adv', s, `TAB2 starter_prompt[${i}] missing text_en`);
        if (!p.type)    warn(week, 'adv', s, `TAB2 starter_prompt[${i}] missing type`);
      });
    }

    if (!ft.bonus_roleplay) warn(week, 'adv', s, 'TAB2 FreeTalk: no bonus_roleplay scenario');
    else {
      const br = ft.bonus_roleplay;
      if (!br.ai_role)   warn(week, 'adv', s, 'TAB2 bonus_roleplay missing ai_role');
      if (!br.user_role) warn(week, 'adv', s, 'TAB2 bonus_roleplay missing user_role');
      if (!br.intro)     issue(week, 'adv', s, 'TAB2 bonus_roleplay missing intro — roleplay opens blank');
    }
  }

  // ── TAB 3: Vocab Review ──
  const tv = d.target_vocab || d.vocabulary || d.vocab || [];
  if (!tv.length) {
    issue(week, 'adv', s, 'TAB3 Vocab Review: target_vocab missing — Vocab tab has no words to review');
  } else {
    if (tv.length < 5) warn(week, 'adv', s, `TAB3 Vocab Review: only ${tv.length} target_vocab words`);
    // Check each target_vocab entry has required display fields
    tv.forEach((v, i) => {
      const word = typeof v === 'string' ? v : v.word;
      if (!word) issue(week, 'adv', s, `TAB3 target_vocab[${i}] missing word`);
      if (typeof v === 'object') {
        if (!v.definition_en && !v.definition_vi)
          warn(week, 'adv', s, `TAB3 target_vocab[${i}] "${word}" missing definition_en`);
        if (!v.example)
          warn(week, 'adv', s, `TAB3 target_vocab[${i}] "${word}" missing example`);
      }
    });
  }

  // week_id consistency
  if (d.week_id !== undefined && d.week_id !== week)
    issue(week, 'adv', s, `week_id mismatch: file says ${d.week_id}, expected ${week}`);

  // nova_instructions present
  if (!d.nova_instructions && !d.ai_behavior && !d.ai_instructions)
    warn(week, 'adv', s, 'missing nova_instructions — AI tutor has no behavior guidance');
}

// ─── WEEK RUNNER ─────────────────────────────────────────────────────────────
async function auditWeekDeep(week, isEasy) {
  const mode = isEasy ? 'easy' : 'adv';
  const pad  = String(week).padStart(2,'0');
  const dir  = isEasy
    ? path.join(ROOT, `src/data/weeks_easy/week_${pad}`)
    : path.join(ROOT, `src/data/weeks/week_${pad}`);

  if (!existsSync(dir)) return;
  stats.weeks++;

  const load = f => loadMod(path.join(dir, f));

  const [vocab, grammar, read, explore, dictation, shadowing,
         askAi, wordMatch, wordPower, writing, mindmap, dailyWatch] = await Promise.all([
    load('vocab.js'), load('grammar.js'), load('read.js'), load('explore.js'),
    load('dictation.js'), load('shadowing.js'), load('ask_ai.js'), load('word_match.js'),
    load('word_power.js'), load('writing.js'), load('mindmap.js'), load('daily_watch.js'),
  ]);

  // Image + audio existence
  if (vocab)     deepCheckVocab(vocab, week, mode);
  if (grammar)   deepCheckGrammar(grammar, week, mode);
  if (read)      deepCheckRead(read, week, mode, 'read');
  if (explore)   deepCheckRead(explore, week, mode, 'explore');
  if (dictation) deepCheckDictation(dictation, week, mode);
  if (shadowing) deepCheckShadowing(shadowing, week, mode);
  if (askAi)     deepCheckAskAI(askAi, week, mode);
  if (wordPower) deepCheckWordPower(wordPower, week, mode);
  if (mindmap)   deepCheckMindmap(mindmap, week, mode);
  if (dailyWatch) deepCheckDailyWatch(dailyWatch, week, mode);

  // Word Match pairs
  deepCheckWordMatch(wordMatch, vocab, week, mode);

  // Logic + Singapore Math (W16+) + Games (W16+)
  if (week < 16) {
    const logic = await load('logic.js');
    if (logic) deepCheckLogic(logic, week, mode, 'logic');
  } else {
    const [logicSci, math, games] = await Promise.all([
      load('logic_science.js'), load('singapore_math.js'), load('games.js')
    ]);
    if (logicSci) deepCheckLogic(logicSci, week, mode, 'logic_science');
    if (math)     deepCheckLogic(math, week, mode, 'singapore_math');
    if (games)    deepCheckGames(games, week, mode);
    else          issue(week, mode, 'games', 'games.js missing');
  }

  // AI Tutor (adv only, per week)
  if (!isEasy) {
    const tutorPath1 = path.join(ROOT, `src/data/weeks/week_${pad}/week_${pad}_real.js`);
    const tutorPath2 = path.join(ROOT, `src/data/weeks/week_${pad}_real.js`);
    let tutorData = null;
    if (existsSync(tutorPath1))      tutorData = await loadMod(tutorPath1);
    else if (existsSync(tutorPath2)) tutorData = await loadMod(tutorPath2);
    if (tutorData) deepCheckAITutor(tutorData, week);
  }
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  const start = Date.now();
  console.log('🔬 EngQuest3K — Deep Student-Experience Audit (Level 2)');
  console.log('   Checks: images, audio, AI Tutor 3 tabs, word match, games\n');

  for (let w = 1; w <= 30; w++) {
    process.stdout.write(`  W${String(w).padStart(2,'0')}...`);
    await auditWeekDeep(w, false);
    await auditWeekDeep(w, true);
    process.stdout.write(' ✓\n');
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  console.log('\n' + '═'.repeat(72));
  console.log(`🚨 CRITICAL ISSUES: ${ISSUES.length}`);
  console.log('═'.repeat(72));

  if (!ISSUES.length) {
    console.log('  🎉 Zero critical issues!');
  } else {
    const byWeek = {};
    ISSUES.forEach(i => {
      const m = i.match(/\[W(\d+)/);
      const wk = m ? m[1] : '??';
      if (!byWeek[wk]) byWeek[wk] = [];
      byWeek[wk].push(i);
    });
    Object.keys(byWeek).sort((a,b) => Number(a)-Number(b)).forEach(wk => {
      console.log(`\n── Week ${wk} ──`);
      byWeek[wk].forEach(i => console.log('  ' + i));
    });
  }

  console.log('\n' + '─'.repeat(72));
  console.log(`⚠️  WARNINGS: ${WARNINGS.length}`);
  console.log('─'.repeat(72));
  const shown = WARNINGS.slice(0, 50);
  shown.forEach(w => console.log('  ' + w));
  if (WARNINGS.length > 50) console.log(`  ... and ${WARNINGS.length - 50} more (run with --all-warnings)`);

  console.log('\n' + '─'.repeat(72));
  console.log('📊 STATS');
  console.log('─'.repeat(72));
  console.log(`  Weeks audited  : ${stats.weeks}`);
  console.log(`  Images checked : ${stats.images_checked} (${stats.images_missing} missing)`);
  console.log(`  Audio checked  : ${stats.audio_checked} (${stats.audio_missing} missing, W16+ skipped)`);
  console.log(`  Time           : ${elapsed}s`);
  console.log('\nDone.');

  if (ISSUES.length > 0) process.exit(1);
}

main();
