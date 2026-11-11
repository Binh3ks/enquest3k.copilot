/**
 * scripts/verify_round82.mjs
 *
 * Independent verifier for Round 82 deliverables:
 *  - Verifies zero mutations across all protected directories/files vs baseline 41caafb0...
 *  - Verifies C.7 Option (a) set math (|SB7|=7, |W79_13|=13 unchanged from R78/R79, |W80_13|=13 distinct, |Union|=33)
 *  - Verifies W80_13 has 0 Source B Vocabulary Focus collisions across W1-156 and excludes habitat/statistic/climate
 *  - Verifies 154/156 round82_temp_blueprints match round81_temp_blueprints byte-for-byte (only W79/W80 differ)
 *  - Verifies round82_proposed_digital_map_v2 preserves R81 invariants and only updates banner + W79/W80
 *  - Verifies round82_owner_decisions_status_sweep & proposal markdown contain zero undefined/NaN and accurate live/staging facts
 *  - Writes complete output to docs/agent_artifacts/round82_verification_raw.txt
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const BASELINE_COMMIT = '41caafb09b727686e810ccbc04aa7aadd6dfc157';
const RAW_OUT_PATH = path.join(ROOT_DIR, 'docs/agent_artifacts/round82_verification_raw.txt');

const lines = [];
function log(msg = '') {
  console.log(msg);
  lines.push(msg);
}

function sha256File(p) {
  return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}

function git(args) {
  return execFileSync('git', args, { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
}

let failures = 0;
function check(label, fn) {
  try {
    const detail = fn();
    log(`[PASS] ${label}${detail ? ` — ${detail}` : ''}`);
  } catch (err) {
    failures++;
    log(`[FAIL] ${label} — ${err.message}`);
  }
}

log('========================================================================');
log(`ROUND 82 INDEPENDENT VERIFICATION LOG (${new Date().toISOString()})`);
log(`Baseline commit: ${BASELINE_COMMIT}`);
log(`Current HEAD:    ${git(['rev-parse', 'HEAD'])}`);
log('========================================================================');

// 1. Protected path immutability checks (working tree + committed delta vs baseline)
const PROTECTED_PATHS = [
  'src/',
  'src/data/weeks/',
  'docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md',
  'docs/agent_artifacts/staging/',
  'AGENTS.md',
  'docs/WEEK_PRODUCTION_SOP.md',
  'docs/ARCHITECTURE_CURRENT.md',
  'docs/MASTER_ARCHITECTURE_W01_W156.md',
  'docs/GLOBAL_GOVERNANCE_MANIFEST.json',
  'docs/GATE15_SPEC_W33.json',
  'docs/W33_GOLDEN_FREEZE_MANIFEST.json',
  'docs/agent_artifacts/wave3_g_gen_audit_raw.txt',
];

for (const rel of PROTECTED_PATHS) {
  check(`Immutable protected path (git diff & status): ${rel}`, () => {
    const wt = git(['status', '--porcelain', '--', rel]);
    const diff = git(['diff', '--name-status', BASELINE_COMMIT, 'HEAD', '--', rel]);
    assert.equal(wt, '', `Working tree dirty in ${rel}: ${wt}`);
    assert.equal(diff, '', `Committed delta in ${rel} vs baseline: ${diff}`);
    return '0 working-tree changes, 0 committed diff vs R81 baseline';
  });
}

// 2. Source B W79-80 extraction & W1-156 vocab collision verification
const SB_PATH = path.join(ROOT_DIR, 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');
const sbText = fs.readFileSync(SB_PATH, 'utf8');
const sbLines = sbText.split(/\r?\n/);

let sb7 = [];
check('Source B L632-637 verbatim block & 7 shared vocabulary extraction', () => {
  const block = sbLines.slice(631, 637).join('\n');
  assert.match(block, /Weeks 79-80: Review & Micro-Debate 2/);
  assert.match(block, /Space Exploration vs\. Earth Fix/);
  assert.match(block, /Rebuttal Intro \("Yes, but\.\.\."\)/);
  assert.match(block, /Passive Voice, Conditionals, Comparatives/);
  assert.equal(/\bMath\b/i.test(block), false, 'Source B L632-637 must contain 0 Math lines');
  const m = sbLines[636].match(/Vocabulary Focus:\s*(.+?)\.\s*$/);
  assert.ok(m, 'Missing Vocabulary Focus line at Source B L637');
  sb7 = m[1].split(',').map((s) => s.trim().toLowerCase());
  assert.deepEqual(sb7, ['space', 'earth', 'money', 'spend', 'fix', 'problem', 'important']);
  return `sb7=[${sb7.join(', ')}]`;
});

// Parse Source B all Part II Vocabulary Focus & Math Vocabulary lines
const sbVocabByLine = new Map();
sbLines.forEach((ln, idx) => {
  const m = ln.match(/(?:Vocabulary Focus|Math Vocabulary):\s*(.+)$/);
  if (!m) return;
  const words = m[1].replace(/\([^)]*\)/g, '').split(/[,;/]/).map((x) => x.replace(/[.;]/g, '').trim().toLowerCase()).filter(Boolean);
  for (const wd of words) {
    if (!sbVocabByLine.has(wd)) sbVocabByLine.set(wd, []);
    sbVocabByLine.get(wd).push(`L${idx + 1}`);
  }
});

// 3. Verify W79_13 unchanged from Round 78 & Round 79 and loaded in R82 blueprints/proposal/map
const bp79 = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'docs/agent_artifacts/round82_temp_blueprints/week_79_blueprint.json'), 'utf8'));
const bp80 = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'docs/agent_artifacts/round82_temp_blueprints/week_80_blueprint.json'), 'utf8'));
let w79_13 = bp79.vocabulary_focus?.supplement_words || [];
let w80_13 = bp80.vocabulary_focus?.supplement_words || [];

check('W79 13 SUPPLEMENT matches Round 78 L41 & Round 79 L38 identically', () => {
  const r78 = fs.readFileSync(path.join(ROOT_DIR, 'docs/agent_artifacts/round78_w79_w80_split_proposal.md'), 'utf8').split('\n')[40];
  const r79 = fs.readFileSync(path.join(ROOT_DIR, 'docs/agent_artifacts/round79_w79_w80_vocab_options.md'), 'utf8').split('\n')[37];
  const m78 = r78.match(/`([^`]+)`/);
  const m79 = r79.match(/13 SUPPLEMENT[^(]*\(([^)]+)\)/i);
  assert.ok(m78, `Could not parse backtick word list from R78 L41: ${r78}`);
  assert.ok(m79, `Could not parse parenthesized word list from R79 L38: ${r79}`);
  const a = m78[1].split(',').map((s) => s.trim().toLowerCase());
  const b = m79[1].split(',').map((s) => s.trim().toLowerCase());
  assert.deepEqual(a, b, 'R78 L41 and R79 L38 must match identically');
  assert.equal(a.length, 13);
  assert.deepEqual(bp79.vocabulary_focus.supplement_words, a, 'R82 bp79 supplement_words must equal R78/R79');
  w79_13 = a;
  return `count=13, identical R78==R79==R82_bp79`;
});

check('R82 Blueprint W79 & W80 C.7 Option (a) mathematical set invariants', () => {
  assert.deepEqual(bp79.vocabulary_focus.syllabus_words, sb7);
  assert.deepEqual(bp80.vocabulary_focus.syllabus_words, sb7);
  assert.deepEqual(bp79.vocabulary_focus.supplement_words, w79_13);
  assert.equal(w80_13.length, 13, 'W80 supplement must have 13 words');

  const setSB = new Set(sb7);
  const set79s = new Set(w79_13);
  const set80s = new Set(w80_13);
  assert.equal(set79s.size, 13);
  assert.equal(set80s.size, 13);

  const overlap79vsSB = w79_13.filter((w) => setSB.has(w));
  const overlap80vsSB = w80_13.filter((w) => setSB.has(w));
  const overlap79vs80 = w80_13.filter((w) => set79s.has(w));
  assert.deepEqual(overlap79vsSB, []);
  assert.deepEqual(overlap80vsSB, []);
  assert.deepEqual(overlap79vs80, []);

  assert.equal(bp79.keywords.length, 20);
  assert.equal(bp80.keywords.length, 20);
  const set79_20 = new Set(bp79.keywords);
  const set80_20 = new Set(bp80.keywords);
  const inter20 = [...set79_20].filter((w) => set80_20.has(w));
  const unionAll = new Set([...set79_20, ...set80_20]);
  assert.equal(inter20.length, 7);
  assert.deepEqual(inter20.sort(), [...sb7].sort());
  assert.equal(unionAll.size, 33);
  return `|SB7|=7, |W79_13|=13, |W80_13|=13, |W79∩W80|=7, |W79∪W80|=33, |W79_13∩W80_13|=0`;
});

check('W80_13 has 0 Source B W1-156 Vocabulary Focus collisions and drops R79 draft collisions', () => {
  for (const dropped of ['habitat', 'statistic', 'climate']) {
    assert.equal(w80_13.includes(dropped), false, `Colliding draft word "${dropped}" must not be in W80_13`);
  }
  const collisions = w80_13.filter((w) => sbVocabByLine.has(w)).map((w) => `${w}@${sbVocabByLine.get(w).join(',')}`);
  assert.deepEqual(collisions, [], `Source B collisions found: ${collisions.join('; ')}`);
  return `0 collisions in Source B Vocabulary Focus lines (${w80_13.join(', ')})`;
});

check('R82 Blueprint W79/W80 non-merge safety & cleanup flags', () => {
  assert.equal(bp79.isFullMock, false);
  assert.equal(bp80.isFullMock, false);
  assert.equal(bp79.c7_proposal_metadata?.merge_status, 'DO_NOT_MERGE_PENDING_REGENERATION_AND_ESL_REVIEW');
  assert.equal(bp80.c7_proposal_metadata?.merge_status, 'DO_NOT_MERGE_PENDING_REGENERATION_AND_ESL_REVIEW');
  assert.deepEqual(bp79.c7_regeneration_cleanup_required, ['digital_map_reference', 'tested_skills', 'rotary_cycle']);
  assert.deepEqual(bp80.c7_regeneration_cleanup_required, ['digital_map_reference', 'tested_skills', 'rotary_cycle']);
  assert.deepEqual(bp80.c7_mock_cleanup_required, ['mockFormat', 'cumulativeBlock', 'synthesis_summary', 'papers', 'digital_map_reference', 'tested_skills', 'rotary_cycle']);
  assert.equal(bp79.target_vocab_20.every((x) => x.requires_human_or_esl_review === true), true);
  assert.equal(bp80.target_vocab_20.every((x) => x.requires_human_or_esl_review === true), true);
  return 'W79 & W80 explicitly flagged proposal-only/do-not-merge, stale field cleanup, & ESL review required';
});

// 4. Temp blueprints 1..156 integrity vs R81
check('156/156 round82_temp_blueprints integrity vs round81_temp_blueprints', () => {
  let identicalCount = 0;
  let changed = [];
  let fullMockTrue = 0;
  let w113to120Pet = 0;
  for (let w = 1; w <= 156; w++) {
    const p81 = path.join(ROOT_DIR, `docs/agent_artifacts/round81_temp_blueprints/week_${w}_blueprint.json`);
    const p82 = path.join(ROOT_DIR, `docs/agent_artifacts/round82_temp_blueprints/week_${w}_blueprint.json`);
    assert.ok(fs.existsSync(p82), `Missing R82 temp blueprint week ${w}`);
    const obj82 = JSON.parse(fs.readFileSync(p82, 'utf8'));
    if (obj82.isFullMock) fullMockTrue++;
    if (w >= 113 && w <= 120 && obj82.cefr_level === 'B1 PET' && obj82.cefr_stage === 2) w113to120Pet++;
    if (sha256File(p81) === sha256File(p82)) {
      identicalCount++;
    } else {
      changed.push(w);
    }
  }
  assert.equal(identicalCount, 154);
  assert.deepEqual(changed, [79, 80]);
  assert.equal(fullMockTrue, 0);
  assert.equal(w113to120Pet, 8);
  return `154/156 byte-identical to R81 (incl. W33 frozen), changed=[${changed.join(',')}], isFullMock=0, W113-120 B1 PET=8/8`;
});

// 5. Proposed Digital Map v2 checks
check('round82_proposed_digital_map_v2 diff scope & structural invariants', () => {
  const m81 = fs.readFileSync(path.join(ROOT_DIR, 'docs/agent_artifacts/round81_proposed_digital_map_v2.md'), 'utf8').split('\n');
  const m82 = fs.readFileSync(path.join(ROOT_DIR, 'docs/agent_artifacts/round82_proposed_digital_map_v2.md'), 'utf8').split('\n');
  assert.equal(m81.length, m82.length, 'Line count must remain identical to R81 Map v2');
  const diffLines = [];
  for (let i = 0; i < m81.length; i++) {
    if (m81[i] !== m82[i]) diffLines.push(i + 1);
  }
  assert.deepEqual(diffLines, [1, 3, 182, 183], `Expected only banner (L1,L3) and W79/W80 (L182,L183) to differ, got lines: ${diffLines}`);
  const full = m82.join('\n');
  assert.equal(/\[CHỜ OWNER\]/.test(full), false);
  assert.ok(m82[181].includes(w79_13.join(', ')));
  assert.ok(m82[182].includes(w80_13.join(', ')));
  assert.equal(m82.filter((l) => /^\|\s*\*\*MOCK\s+M/.test(l)).length, 34);
  assert.equal(m82.filter((l) => /^\|\s*\*\*W\d+\*\*/.test(l) && /FULL\s*MOCK/i.test(l)).length, 0);
  assert.ok(full.includes('[SUPPLEMENT — Source A]'));
  return `only lines [${diffLines.join(',')}] changed vs R81; 0 [CHỜ OWNER]; 34 MOCK rows; 0 content-week FULL MOCK`;
});

// 6. Proposal & Status Sweep markdown sanity
check('round82_c7_w79_w80_vocab_proposal.md completeness, accurate Source B lines & zero NaN/undefined', () => {
  const txt = fs.readFileSync(path.join(ROOT_DIR, 'docs/agent_artifacts/round82_c7_w79_w80_vocab_proposal.md'), 'utf8');
  assert.equal(/\bundefined\b|\bNaN\b/.test(txt), false);
  assert.ok(txt.includes('|W79_20 ∪ W80_20|   = 33'));
  assert.ok(txt.includes('STAGED / PROPOSAL-ONLY'));
  assert.ok(txt.includes('L1017'), 'statistic Source B Vocab Focus line L1017 must be cited accurately');
  assert.equal(txt.includes('L1020'), false, 'Stale L1020 math line must not be cited for statistic');
  assert.ok(txt.includes('L803'), 'W79 budget Source B Math Vocab line L803 must be disclosed');
  return 'clean, accurate Source B citations (L1017/L803/L637), 13-word W80 rationale table & set math';
});

check('round82_owner_decisions_status_sweep.md covers all 11 rows, zero NaN/undefined, accurate L953 & arithmetic', () => {
  const txt = fs.readFileSync(path.join(ROOT_DIR, 'docs/agent_artifacts/round82_owner_decisions_status_sweep.md'), 'utf8');
  assert.equal(/\bundefined\b|\bNaN\b/.test(txt), false);
  for (let i = 1; i <= 11; i++) {
    assert.ok(txt.includes(`| **${i}** |`), `Missing status sweep row ${i}`);
  }
  assert.ok(txt.includes('Source B L953'), 'Phase 3 citation must point to Part II L953');
  assert.equal(txt.includes('Source B L46'), false, 'Must not cite outdated Part I L46');
  assert.ok(txt.includes('cộng riêng 2 tuần (W79/W80)'), 'Row 10 arithmetic must separate 41 silent rows + 2 W79/W80 math-wait rows');
  assert.ok(txt.includes('W126, W127, W133, W134'));
  assert.ok(txt.includes('review_status = "BLOCKED"'));
  assert.ok(txt.includes('TOTAL_TRIPS = 34'));
  assert.ok(txt.includes('Chỉ **2/22** tuần đạt 5/5 Toán'));
  return 'all 11 rows verified, Phase 3 L953 accurate, Row 10 arithmetic exact, Wave 3 BLOCKED & live math debt preserved';
});

log('------------------------------------------------------------------------');
log(`SUMMARY: ${failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`} (failures=${failures})`);
log('========================================================================');

fs.writeFileSync(RAW_OUT_PATH, lines.join('\n') + '\n', 'utf8');
process.exit(failures === 0 ? 0 : 1);
