import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';

const BEFORE_COMMIT = '0347975fb7f84808b23901179b562ba167853774';
const OUT_RAW = path.resolve('docs/agent_artifacts/round85_nonclil_register_raw.txt');
const WEEKS = [126, 127, 133, 134];

const WL_FILES = [
  'starters_pre_a1.json',
  'movers_a1.json',
  'flyers_a2.json',
  'ket_a2.json',
  'pet_b1.json',
];

const repoBaseWords = new Set();
const petMeta = {};
for (const f of WL_FILES) {
  const data = JSON.parse(fs.readFileSync(path.resolve('src/data/official_wordlists', f), 'utf8'));
  const words = data.words || [];
  petMeta[f] = { count: words.length, first: words[0], last: words[words.length - 1] };
  for (const entry of words) {
    for (const part of String(entry).toLowerCase().split(/[\s/]+/)) {
      const clean = part.replace(/[^a-z']/g, '');
      if (clean) repoBaseWords.add(clean);
    }
  }
}

const IRREG = {
  was: 'be', were: 'be', is: 'be', are: 'be', am: 'be', been: 'be', being: 'be',
  has: 'have', had: 'have', having: 'have', does: 'do', did: 'do', done: 'do', doing: 'do',
  said: 'say', says: 'say', makes: 'make', made: 'make', goes: 'go', went: 'go', gone: 'go',
  gives: 'give', gave: 'give', given: 'give', takes: 'take', took: 'take', taken: 'take',
  shows: 'show', showed: 'show', shown: 'show', sees: 'see', saw: 'see', seen: 'see',
  knows: 'know', knew: 'know', known: 'know', thinks: 'think', thought: 'think',
  comes: 'come', came: 'come', tells: 'tell', told: 'tell', speaks: 'speak', spoke: 'speak', spoken: 'speak',
  writes: 'write', wrote: 'write', written: 'write', reads: 'read', keeps: 'keep', kept: 'keep',
  builds: 'build', built: 'build', proves: 'prove', proved: 'prove', proven: 'prove',
  feels: 'feel', felt: 'feel', lets: 'let', holds: 'hold', held: 'hold', finds: 'find', found: 'find',
  means: 'mean', meant: 'mean', hears: 'hear', heard: 'hear', hides: 'hide', hidden: 'hide', hid: 'hide',
  rises: 'rise', rose: 'rise', falls: 'fall', fell: 'fall', loses: 'lose', lost: 'lose',
  runs: 'run', ran: 'run', puts: 'put', sets: 'set', gets: 'get', got: 'get', brings: 'bring', brought: 'bring',
  others: 'other', themselves: 'they', its: 'it', their: 'they', our: 'we', your: 'you', them: 'they', us: 'we',
  cannot: 'can', "let's": 'let', "don't": 'do', "doesn't": 'do', "that's": 'that', "it's": 'it',
  chosen: 'choose', grew: 'grow', spent: 'spend', led: 'lead', won: 'win',
};

function lemmatize(tok, targetSet) {
  if (repoBaseWords.has(tok) || targetSet.has(tok)) return tok;
  if (IRREG[tok]) return IRREG[tok];
  const cands = [
    tok.replace(/ies$/, 'y'),
    tok.replace(/es$/, ''),
    tok.replace(/s$/, ''),
    tok.replace(/ed$/, ''),
    tok.replace(/ed$/, 'e'),
    tok.replace(/ied$/, 'y'),
    tok.replace(/ing$/, ''),
    tok.replace(/ing$/, 'e'),
    tok.replace(/ly$/, ''),
    tok.replace(/er$/, ''),
    tok.replace(/est$/, ''),
  ];
  for (const c of cands) {
    if (c.length >= 2 && (repoBaseWords.has(c) || targetSet.has(c))) return c;
  }
  return tok;
}

function countSyllables(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const trimmed = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const m = trimmed.match(/[aeiouy]{1,2}/g);
  return Math.max(1, m ? m.length : 1);
}

function tokenizeWords(text) {
  return String(text)
    .toLowerCase()
    .replace(/—/g, ' ')
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9'\s-]/g, ' ')
    .split(/[\s-]+/)
    .map((t) => t.replace(/^'+|'+$/g, ''))
    .filter((t) => t && !/^\d+$/.test(t));
}

function measureSentences(sentArray, targetWords) {
  const cleanSents = sentArray.filter(Boolean);
  const allTokens = cleanSents.flatMap((s) => tokenizeWords(s));
  const targetSet = new Set(targetWords.map((w) => w.toLowerCase()));
  const syllables = allTokens.reduce((acc, t) => acc + countSyllables(t), 0);
  const sentCount = Math.max(1, cleanSents.length);
  const wordCount = Math.max(1, allTokens.length);
  const avgSent = wordCount / sentCount;
  const maxSent = Math.max(...cleanSents.map((s) => tokenizeWords(s).length));
  const fkGrade = 0.39 * (wordCount / sentCount) + 11.8 * (syllables / wordCount) - 15.59;

  const unlistedAC = [];
  const unlistedDZ = [];
  for (const t of allTokens) {
    if (t.endsWith("'s") || t.endsWith("s'")) continue;
    const lem = lemmatize(t, targetSet);
    if (!repoBaseWords.has(lem) && !targetSet.has(lem)) {
      if (t[0] >= 'a' && t[0] <= 'c') unlistedAC.push(t);
      else unlistedDZ.push(t);
    }
  }

  return {
    wordCount,
    sentCount,
    avgSent: Number(avgSent.toFixed(1)),
    maxSent,
    fkGrade: Number(fkGrade.toFixed(1)),
    unlistedAC: [...new Set(unlistedAC)],
    unlistedDZ: [...new Set(unlistedDZ)],
  };
}

function loadCommittedModule(commitHash, relPath, exportVar) {
  const code = execFileSync('git', ['show', `${commitHash}:${relPath}`], { encoding: 'utf8' });
  let transformed = code
    .replace(new RegExp(`export\\s+const\\s+${exportVar}\\s*=`), `const ${exportVar} =`)
    .replace(new RegExp(`export\\s+default\\s+${exportVar}\\s*;?`), `module.exports = ${exportVar};`);
  const sandbox = { module: { exports: {} }, exports: {} };
  vm.runInNewContext(transformed, sandbox);
  return sandbox.module.exports;
}

const JUSTIFICATIONS = {
  // Everyday A1-B1 vocabulary absent from Flyers A2 or truncated A-C PET sample + cross-week syllabus words
  ad: 'B1 everyday short noun ("advertisement")',
  ads: 'Plural of "ad"',
  bigger: 'Comparative of A1 "big"',
  case: 'A2/B1 everyday noun ("debating your case")',
  celebrates: 'B1 everyday verb',
  chart: 'A2/B1 everyday classroom noun',
  charts: 'Plural of "chart"',
  check: 'A2/B1 classroom verb',
  checked: 'Past/participle of "check"',
  checking: 'Gerund of "check"',
  checkout: 'Everyday school library term ("library checkout numbers")',
  chose: 'Past simple of A2 "choose"',
  claim: 'W134 syllabus target word / B1 debate core verb-noun',
  claims: 'Plural of "claim"',
  clear: 'A2/B1 core adjective',
  clearly: 'A2/B1 adverb from "clear"',
  conclusion: 'W134 syllabus target word / B1 debate term',
  conclusions: 'Plural of "conclusion"',
  confident: 'B1 everyday adjective',
  contact: 'B1 everyday noun ("eye contact")',
  contest: 'A2/B1 school noun ("speech contest")',
  contrary: 'Source B W127 grammar focus ("On the contrary")',
  contrast: 'B1 everyday noun ("show contrast")',
  cooperate: 'B1 school collaboration verb',
  cooperative: 'Derived from "cooperate"',
  copy: 'A2/B1 school verb',
  cost: 'A2/B1 everyday verb/noun',
  costs: 'Plural/3sg of "cost"',
  creates: 'B1 verb ("create")',
  critical: 'B1 phrase ("critical thinking")',
  data: 'W133 syllabus target word',
  dealing: 'Gerund of B1 "deal" ("deal with")',
  debate: 'Course-wide theme word ("school debate")',
  debaters: 'Derived from "debate"',
  debates: 'Plural of "debate"',
  demonstrate: 'W133 grammar anchor ("Statistics demonstrate that...")',
  detective: 'A2/B1 everyday story noun',
  directly: 'B1 adverb from "direct"',
  easily: 'A2/B1 adverb from "easy"',
  education: 'B1 everyday noun',
  endings: 'A2/B1 plural noun ("word endings")',
  energy: 'B1 everyday noun ("clean energy")',
  equal: 'A2/B1 adjective ("feel equal")',
  essay: 'W126 theme word ("From Essay to Speech")',
  even: 'A2/B1 everyday adverb',
  evidence: 'W127 syllabus target word',
  exact: 'B1 adjective',
  examined: 'Grammar anchor W126 ("Having examined...")',
  extra: 'A2/B1 everyday adjective',
  extreme: 'B1 everyday adjective',
  fact: 'A2/B1 everyday noun',
  facts: 'Plural of "fact"',
  fails: 'B1 everyday verb',
  feelings: 'A2/B1 noun ("feel" + -ing)',
  final: 'A2/B1 adjective',
  fit: 'A2/B1 everyday verb',
  five: 'A1 number word',
  focus: 'B1 everyday verb',
  four: 'A1 number word',
  free: 'A1/A2 adjective ("free time")',
  fresh: 'A2/B1 adjective ("fresh fruit")',
  friendships: 'B1 everyday plural noun ("friend" + -ship)',
  gamers: 'Everyday youth noun ("video gamers")',
  grade: 'A2/B1 school noun',
  grids: 'B1 noun ("power grids")',
  habits: 'B1 everyday noun',
  health: 'A2/B1 everyday noun',
  healthy: 'A2/B1 adjective',
  helpful: 'Derived from A1 "help"',
  honest: 'B1 everyday adjective',
  honesty: 'Derived from "honest"',
  however: 'Source B W127 grammar focus ("However")',
  ignores: 'B1 everyday verb',
  ignoring: '-ing form of "ignore"',
  invalid: 'W134 syllabus target word',
  judges: 'A2/B1 noun ("debate judges")',
  leads: 'B1 verb ("lead to")',
  limit: 'B1 everyday noun ("time limit")',
  listeners: 'Everyday noun ("listen" + -er)',
  loans: 'Everyday library noun ("book loans")',
  main: 'A2/B1 everyday adjective',
  microphone: 'A2/B1 everyday classroom noun',
  modern: 'A2/B1 adjective',
  nobody: 'A2/B1 pronoun',
  note: 'A2/B1 school noun ("note cards")',
  noticed: 'Past tense of A2/B1 "notice"',
  objection: 'W127 syllabus target word',
  onto: 'A2/B1 preposition',
  opponents: 'W127/debate core B1 noun ("the other side")',
  own: 'A2/B1 everyday determiner/adjective',
  pause: 'B1 everyday noun/verb',
  pauses: 'Plural of "pause"',
  per: 'A2/B1 preposition ("per week")',
  percentages: 'Plural of W133 target "percent" (+ -age)',
  personal: 'B1 everyday adjective',
  phrases: 'Everyday classroom English term',
  plan: 'A2/B1 everyday noun/verb',
  planning: '-ing form of "plan"',
  polite: 'B1 everyday adjective',
  politely: 'Source B W127 focus ("Disagreeing politely")',
  power: 'A2/B1 noun ("clean power")',
  proof: 'B1 everyday noun',
  protect: 'B1 everyday verb',
  protects: '3sg of "protect"',
  prove: 'B1 everyday verb',
  proved: 'Past tense of "prove"',
  proves: '3sg of "prove"',
  proving: '-ing form of "prove"',
  random: 'B1 adjective ("random sample")',
  real: 'A2/B1 everyday adjective',
  reasoning: 'W134 syllabus target word',
  reasons: 'Plural of A2/B1 "reason"',
  recent: 'B1 everyday adjective',
  rely: 'B1 verb ("rely on")',
  replying: '-ing form of A2/B1 "reply"',
  reported: 'Past tense of A2/B1 "report"',
  research: 'B1 school noun',
  researchers: 'Derived from "research"',
  rest: 'A1/A2 everyday noun',
  rests: '3sg of "rest" ("rests on")',
  results: 'B1 everyday noun',
  reveal: 'B1 verb ("survey results show/reveal")',
  reveals: '3sg of "reveal"',
  reviews: '3sg of B1 "review"',
  row: 'A2/B1 everyday noun ("back row")',
  rule: 'A2/B1 school noun',
  ruled: 'Past tense of "rule" ("ruled out")',
  rules: 'Plural of "rule"',
  rumor: 'B1 everyday noun',
  rumors: 'Plural of "rumor"',
  savings: 'B1 plural noun ("save" + -ings)',
  scientific: 'Derived from A2 "science"',
  scientists: 'A2/B1 noun',
  separate: 'B1 everyday adjective',
  seventy: 'A1/A2 number word',
  share: 'A2/B1 everyday verb',
  shared: 'Past tense of "share"',
  sharing: '-ing form of "share"',
  signals: 'Plural of B1 "signal"',
  simple: 'A2/B1 everyday adjective',
  single: 'A2/B1 everyday adjective',
  skilled: 'Derived from A2/B1 "skill"',
  skills: 'A2/B1 everyday plural noun',
  sleepy: 'A2/B1 everyday adjective ("sleep" + -y)',
  smart: 'A2/B1 everyday adjective',
  smooth: 'B1 everyday adjective',
  soda: 'A2/B1 everyday drink noun',
  solar: 'B1 everyday science adjective ("solar power")',
  solving: 'From A2/B1 "solve" ("problem solving")',
  speakers: 'Everyday noun ("speak" + -er)',
  speech: 'W126 theme word ("From Essay to Speech")',
  spotting: '-ing form of A2/B1 "spot"',
  steady: 'B1 everyday adjective',
  stepped: 'Past tense of A2 "step"',
  strict: 'B1 everyday adjective',
  support: 'B1 everyday verb',
  supported: 'Past/participle of "support"',
  survey: 'W133 syllabus target word',
  surveys: 'Plural of "survey"',
  teamwork: 'Everyday compound ("team" + "work")',
  ten: 'A1 number word',
  tend: 'W134 grammar/check target ("tend to")',
  term: 'B1 everyday school noun ("long-term")',
  test: 'A1/A2 everyday verb/noun',
  tested: 'Past tense of "test"',
  testing: '-ing form of "test"',
  tests: 'Plural/3sg of "test"',
  thinkers: 'Derived from A1 "think"',
  three: 'A1 number word',
  timer: 'Derived from A1 "time"',
  tools: 'A2/B1 everyday noun',
  topic: 'B1 everyday noun',
  tracked: 'Past tense of A2/B1 "track"',
  trick: 'A2/B1 everyday noun',
  tricks: 'Plural of "trick"',
  tricky: 'B1 everyday adjective ("trick" + -y)',
  trouble: 'A2/B1 everyday noun',
  trust: 'B1 everyday verb/noun',
  twelve: 'A1 number word',
  two: 'A1 number word',
  unfair: 'B1 everyday adjective ("un-" + "fair")',
  useful: 'A2/B1 everyday adjective',
  varying: '-ing form of B1 "vary" (grammar drill anchor)',
  vocal: 'Derived from A2 "voice" (paired with W126 delivery/emphasis)',
  voice: 'A2/B1 everyday noun',
  wastes: '3sg of B1 "waste"',
  weakens: '3sg of B1 "weaken" ("weak" + -en)',
  whether: 'B1 conjunction',
  whole: 'A2/B1 everyday adjective',
};

const C1_RESIDUAL_RE =
  /\b(?:adolescents?|fatigue|empirical|methodology|scholarly|substan(?:tial|tially|tiated)|exhibit\s+signs?|problematic(?:\s+screen\s+usage)?|assertions?|replicated|rigorous(?:ly)?|standardized|monotone|monotonous|verbatim|unsubstantiated|anecdotes?|subjective|credible|utilize|unverified|exclusively|treatise|cogent|manipulative|propaganda|scrutinize|peer-reviewed|testimonies|succinct|civic|deliberation|adjudicators?|syllogisms?|collegiate|consortium|epistemic|epistemology|cultivates|prejudice|prohibitions|unfounded|predominantly|stratified|longitudinal|tabulation|mandate|shatters?|methodically)\b/gi;

const out = [];
const log = (s = '') => out.push(s);

log('========================================================================');
log('ROUND 85 NON-CLIL CEFR B1+ REGISTER AUDIT & WORDLIST CROSS-CHECK');
log(`Generated: ${new Date().toISOString()}`);
log(`Before Reference Commit (Round 84 HEAD): ${BEFORE_COMMIT}`);
log('========================================================================\n');

log('0. REPOSITORY CAMBRIDGE WORDLIST INVENTORY (src/data/official_wordlists/):');
for (const [f, info] of Object.entries(petMeta)) {
  log(`  - ${f}: ${info.count} entries (${info.first} .. ${info.last})`);
}
log(`  Cumulative whitelist entries indexed: ${repoBaseWords.size}`);
log('  NOTE: ket_a2.json & pet_b1.json in this repo span ONLY letters A-C (ending at "candidate").\n');

let totalUnjustified = 0;
let totalNonTargetC1 = 0;
let totalSyncErrors = 0;

for (const w of WEEKS) {
  const dir = `docs/agent_artifacts/staging/week_${w}`;
  const beforeRh = loadCommittedModule(BEFORE_COMMIT, `${dir}/reading_hub.js`, 'readingHubData');
  const beforeWh = loadCommittedModule(BEFORE_COMMIT, `${dir}/writing_hub.js`, 'writingHubData');
  const beforeSp = loadCommittedModule(BEFORE_COMMIT, `${dir}/skill_practice_hub.js`, 'skillPracticeHubData');

  const afterRh = (await import(`../${dir}/reading_hub.js?v=${Date.now()}`)).default;
  const afterVh = (await import(`../${dir}/vocab.js?v=${Date.now()}`)).default;
  const afterLh = (await import(`../${dir}/listening_hub.js?v=${Date.now()}`)).default;
  const afterWh = (await import(`../${dir}/writing_hub.js?v=${Date.now()}`)).default;
  const afterSh = (await import(`../${dir}/speaking_hub.js?v=${Date.now()}`)).default;
  const afterSp = (await import(`../${dir}/skill_practice_hub.js?v=${Date.now()}`)).default;

  const targetWords = afterRh.vocab.map((v) => v.word.toLowerCase());
  const targetSet = new Set(targetWords);

  // Structural sync & math invariance checks
  const vhArr = afterVh.vocab || afterVh;
  const vocabSyncOk =
    vhArr.length === afterRh.vocab.length &&
    afterRh.vocab.every((v, idx) => vhArr[idx].word === v.word && vhArr[idx].example_en === v.example_en && vhArr[idx].definition_en === v.definition_en);
  const shadowSyncOk =
    afterLh.shadowing_sentences.length === afterRh.shadowingData.sentences.length &&
    afterRh.shadowingData.sentences.every(
      (s, idx) =>
        afterLh.shadowing_sentences[idx].text === s.text &&
        JSON.stringify(afterLh.shadowing_sentences[idx].words) === JSON.stringify(s.words) &&
        afterLh.passage_audio_script.includes(s.text)
    );
  const mathUntouched = JSON.stringify(beforeSp.singapore_math) === JSON.stringify(afterSp.singapore_math);
  const checkSlots = (arr) =>
    (arr || []).every((item) => {
      const slots = [...(item.sentence_frame || '').matchAll(/\[([^\]]+)\]/g)].map((m) => m[1]);
      return slots.every((s) => Array.isArray(item.pills) && item.pills.includes(s));
    });
  const panelPillsOk = checkSlots(afterWh.picture_story.panels) && checkSlots(afterWh.picture_story.ladder_stages);
  if (!vocabSyncOk || !shadowSyncOk || !mathUntouched || !panelPillsOk) totalSyncErrors++;

  const beforeEx = measureSentences(beforeRh.vocab.map((v) => v.example_en), targetWords);
  const afterEx = measureSentences(afterRh.vocab.map((v) => v.example_en), targetWords);

  const beforeSh = measureSentences(beforeRh.shadowingData.sentences.map((s) => s.text), targetWords);
  const afterShd = measureSentences(afterRh.shadowingData.sentences.map((s) => s.text), targetWords);

  const beforeCombined = measureSentences(
    [
      ...beforeRh.vocab.map((v) => v.example_en),
      ...beforeRh.shadowingData.sentences.map((s) => s.text),
      ...beforeSp.grammar_drills.map((g) => g.sentence),
      beforeRh.rw_part6.text_template.replace(/\[\d+\]/g, ' '),
      beforeWh.picture_story.model_sentence,
    ],
    targetWords
  );
  const afterCombined = measureSentences(
    [
      ...afterRh.vocab.map((v) => v.example_en),
      ...afterRh.shadowingData.sentences.map((s) => s.text),
      ...afterSp.grammar_drills.map((g) => g.sentence),
      afterRh.rw_part6.text_template.replace(/\[\d+\]/g, ' '),
      afterWh.picture_story.model_sentence,
    ],
    targetWords
  );

  // Full 6-file non-target C1 token scan
  const nonTargetHits = [];
  for (const fname of ['vocab.js', 'reading_hub.js', 'listening_hub.js', 'writing_hub.js', 'speaking_hub.js', 'skill_practice_hub.js']) {
    const raw = fs.readFileSync(path.join(dir, fname), 'utf8');
    const matches = raw.match(C1_RESIDUAL_RE) || [];
    const bad = [...new Set(matches.map((m) => m.toLowerCase()).filter((tok) => !targetSet.has(tok)))];
    if (bad.length > 0) {
      totalNonTargetC1 += bad.length;
      nonTargetHits.push(`${fname}: ${bad.join(', ')}`);
    }
  }

  log(`========================================================================`);
  log(`WEEK ${w}: ${afterRh.theme}`);
  log(`========================================================================`);
  log(`  Sync Checks: vocab<->reading_hub=${vocabSyncOk ? 'PASS' : 'FAIL'} | shadowing<->listening_hub=${shadowSyncOk ? 'PASS' : 'FAIL'} | panel_pills_aligned=${panelPillsOk ? 'PASS' : 'FAIL'} | singapore_math_unchanged=${mathUntouched ? 'PASS' : 'FAIL'}`);
  log(`  vocab[].example_en (20):`);
  log(`    BEFORE: Avg=${beforeEx.avgSent}w | Max=${beforeEx.maxSent}w | Uncalibrated_FK=${beforeEx.fkGrade} | Unlisted A-C=${beforeEx.unlistedAC.length}, D-Z=${beforeEx.unlistedDZ.length}`);
  log(`    AFTER : Avg=${afterEx.avgSent}w | Max=${afterEx.maxSent}w | Uncalibrated_FK=${afterEx.fkGrade} | Unlisted A-C=${afterEx.unlistedAC.length}, D-Z=${afterEx.unlistedDZ.length}`);
  log(`  shadowing/dictation (8):`);
  log(`    BEFORE: Avg=${beforeSh.avgSent}w | Max=${beforeSh.maxSent}w | Uncalibrated_FK=${beforeSh.fkGrade} | Unlisted A-C=${beforeSh.unlistedAC.length}, D-Z=${beforeSh.unlistedDZ.length}`);
  log(`    AFTER : Avg=${afterShd.avgSent}w | Max=${afterShd.maxSent}w | Uncalibrated_FK=${afterShd.fkGrade} | Unlisted A-C=${afterShd.unlistedAC.length}, D-Z=${afterShd.unlistedDZ.length}`);
  log(`  Combined Non-CLIL Sentences (example_en + shadowing/dictation + drills + rw_part6 + writing model):`);
  log(`    BEFORE: Avg=${beforeCombined.avgSent}w | Max=${beforeCombined.maxSent}w | Uncalibrated_FK=${beforeCombined.fkGrade} | Unlisted A-C=${beforeCombined.unlistedAC.length}, D-Z=${beforeCombined.unlistedDZ.length}`);
  log(`    AFTER : Avg=${afterCombined.avgSent}w | Max=${afterCombined.maxSent}w | Uncalibrated_FK=${afterCombined.fkGrade} | Unlisted A-C=${afterCombined.unlistedAC.length}, D-Z=${afterCombined.unlistedDZ.length}`);

  log(`  Unlisted A-C Audit (${afterCombined.unlistedAC.length}):`);
  for (const tok of afterCombined.unlistedAC) {
    const j = JUSTIFICATIONS[tok];
    if (!j) totalUnjustified++;
    log(`    - ${tok}: ${j || 'UNJUSTIFIED — REVIEW!'}`);
  }
  log(`  Unlisted D-Z Audit (${afterCombined.unlistedDZ.length}):`);
  for (const tok of afterCombined.unlistedDZ) {
    const j = JUSTIFICATIONS[tok];
    if (!j) totalUnjustified++;
    log(`    - ${tok}: ${j || 'UNJUSTIFIED — REVIEW!'}`);
  }

  // Flagged target words present in W133 (verify self-explanatory B1+ context)
  if (w === 133) {
    const w133TargetsShown = afterRh.vocab
      .filter((v) => v.word === 'empirical' || v.word === 'methodology')
      .map((v) => `[${v.word}] def="${v.definition_en}" | ex="${v.example_en}"`);
    const w133ShadowShown = afterRh.shadowingData.sentences
      .filter((s) => /\b(?:empirical|methodology)\b/i.test(s.text))
      .map((s) => `shadow#${s.id}: "${s.text}"`);
    log('  W133 Syllabus Target Words Kept in B1+ Context:');
    for (const line of [...w133TargetsShown, ...w133ShadowShown]) log(`    - ${line}`);
  }

  log(`  Whole-Week Non-Target C1 Token Scan across ALL 6 files: ${nonTargetHits.length === 0 ? '0 hits (PASS)' : nonTargetHits.join(' | ')}`);
  log('');
}

log(`SUMMARY TOTALS: unjustified_tokens=${totalUnjustified} | non_target_C1_hits=${totalNonTargetC1} | sync_errors=${totalSyncErrors}`);

fs.writeFileSync(OUT_RAW, out.join('\n') + '\n', 'utf8');
console.log(out.join('\n'));
if (totalUnjustified > 0 || totalNonTargetC1 > 0 || totalSyncErrors > 0) {
  process.exit(1);
}

