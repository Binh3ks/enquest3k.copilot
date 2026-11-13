#!/usr/bin/env node
/**
 * scripts/verify_round86_live_regression.mjs
 *
 * Verifies live production regression for Round 86:
 *   5.a: Round 81 station2Adapters compatibility check on W126, W127, W133, W134
 *        (resolveNumericAnswer, normalizeBarModelQuestion, 0 literal-10 fallback,
 *         normalizeGrammarDrill, normalizeScienceLabStages, zoneDataMapper).
 *   5.b: G-GEN-11..16 quality gates against now-LIVE weeks in src/data/weeks/
 *   5.c: bossRotarySchedule.js cycle check for W126/127/133/134
 *
 * Writes complete raw output to docs/agent_artifacts/round86_live_regression_raw.txt.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import {
  normalizeBarModelQuestion,
  normalizeGrammarDrill,
  normalizeScienceLabStages,
} from '../src/utils/station2Adapters.js';
import zoneDataMapper from '../src/config/zoneDataMapper.js';
import { getBossRotaryConfig, getRotaryTaskLabel } from '../src/config/bossRotarySchedule.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const OUT_RAW = path.join(ROOT_DIR, 'docs/agent_artifacts/round86_live_regression_raw.txt');

const WEEKS = [
  { num: 126, sbWords: [], expectedMathStrand: 'Logic Puzzles', expectedCycle: 2, rotaryLabel: 'Rotary 2' },
  { num: 127, sbWords: ['disagree', 'counter', 'point', 'false', 'true'], expectedMathStrand: 'Critical Thinking Math', expectedCycle: 3, rotaryLabel: 'Rotary 3' },
  { num: 133, sbWords: ['statistic', 'percent', 'study', 'data', 'majority', 'minority', 'survey', 'population'], expectedMathStrand: 'Geometry: Angles', expectedCycle: 1, rotaryLabel: 'Rotary 1', useStaticSvg: true },
  { num: 134, sbWords: ['fallacy', 'generalization', 'assumption', 'true', 'false', 'valid', 'invalid', 'logic'], expectedMathStrand: 'Geometry: Triangles', expectedCycle: 2, rotaryLabel: 'Rotary 2', useStaticSvg: true },
];

const ESL_ANOMALY_PATTERNS = [
  { name: 'majority/minority + exact percent', regex: /\b(?:a\s+)?(?:small\s+|large\s+)?(?:majority|minority)\s+of\s+(?:seventy|sixty|eighty|ninety|fifty|forty|thirty|twenty|fifteen|ten|five|\d+)\s*(?:percent|%)/gi },
  { name: 'uncountable plural misuse', regex: /\b(?:datas|informations|advices|evidences|equipments)\b/gi },
  { name: 'double comparative/superlative', regex: /\b(?:more\s+better|most\s+best|more\s+easier)\b/gi },
  { name: 'preposition redundancy', regex: /\b(?:discuss\s+about|explain\s+about|according\s+to\s+me)\b/gi },
];

const BOILERPLATE_RE = /\b(?:TODO|TBD|FIXME|lorem\s+ipsum)\b|\[placeholder\]/i;
const VI_DIACRITICS_RE = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;

let out = '';
const log = (s = '') => {
  out += s + '\n';
  console.log(s);
};

let totalChecks = 0;
let passedChecks = 0;
function check(cond, msg) {
  totalChecks++;
  if (cond) {
    passedChecks++;
    log(`  ✅ [PASS] ${msg}`);
  } else {
    log(`  ❌ [FAIL] ${msg}`);
    process.exitCode = 1;
  }
}

log('========================================================================');
log('ROUND 86 — LIVE PRODUCTION REGRESSION VERIFICATION (ZERO LITERALS)');
log(`Timestamp: ${new Date().toISOString()}`);
log('Target Weeks: W126, W127, W133, W134 (in src/data/weeks/)');
log('========================================================================\n');

for (const cfg of WEEKS) {
  const dir = path.join(ROOT_DIR, `src/data/weeks/week_${cfg.num}`);
  log(`\n========================================================================`);
  log(`🔍 CHECKING LIVE PRODUCTION WEEK ${cfg.num} (${dir})`);
  log(`========================================================================`);

  check(fs.existsSync(dir), `Directory exists: src/data/weeks/week_${cfg.num}`);
  check(fs.existsSync(path.join(dir, 'index.js')), `Loader exists: src/data/weeks/week_${cfg.num}/index.js`);

  // Load modules via file URLs
  const indexPath = pathToFileURL(path.join(dir, 'index.js')).href;
  const rhPath = pathToFileURL(path.join(dir, 'reading_hub.js')).href;
  const vhPath = pathToFileURL(path.join(dir, 'vocab.js')).href;
  const spPath = pathToFileURL(path.join(dir, 'skill_practice_hub.js')).href;
  const wrPath = pathToFileURL(path.join(dir, 'writing_hub.js')).href;
  const lsPath = pathToFileURL(path.join(dir, 'listening_hub.js')).href;
  const skPath = pathToFileURL(path.join(dir, 'speaking_hub.js')).href;

  const indexModule = (await import(`${indexPath}?t=${Date.now()}`)).default;
  const rh = (await import(`${rhPath}?t=${Date.now()}`)).default;
  const vh = (await import(`${vhPath}?t=${Date.now()}`)).default;
  const sp = (await import(`${spPath}?t=${Date.now()}`)).default;
  const wr = (await import(`${wrPath}?t=${Date.now()}`)).default;
  const ls = (await import(`${lsPath}?t=${Date.now()}`)).default;
  const sk = (await import(`${skPath}?t=${Date.now()}`)).default;

  const prov = JSON.parse(fs.readFileSync(path.join(dir, 'provenance.json'), 'utf8'));

  // -------------------------------------------------------------------------
  // 5.a: Round 81 station2Adapters.js Compatibility
  // -------------------------------------------------------------------------
  log('\n--- 5.a: station2Adapters.js Compatibility ---');
  const mathQuestions = sp.singapore_math || [];
  check(mathQuestions.length === 5, `Math questions count === 5 (got ${mathQuestions.length})`);

  let fallback10Count = 0;
  let validMathNormalizedCount = 0;
  mathQuestions.forEach((rawQ, idx) => {
    const norm = normalizeBarModelQuestion(rawQ);
    const expectedAns = Number(rawQ.correctAnswer ?? rawQ.target_answer ?? rawQ.answer_value ?? rawQ.answer);
    if (norm.correctAnswer === 10 && expectedAns !== 10) {
      fallback10Count++;
    }
    if (norm.correctAnswer === expectedAns && (norm.problemText || norm.question)) {
      validMathNormalizedCount++;
    }
  });

  check(fallback10Count === 0, `BarModelQuest literal fallback-to-10 count === 0 (got ${fallback10Count})`);
  check(validMathNormalizedCount === 5, `normalizeBarModelQuestion normalized all 5 questions correctly (got ${validMathNormalizedCount}/5)`);

  // SentenceBuilder / GrammarDuel adapter
  const grammarItems = sp.grammar_drills || sp.grammar_duel || sp.sentence_builder || [];
  const grammarNormalized = grammarItems.map(normalizeGrammarDrill);
  check(grammarNormalized.length >= 5, `Grammar duel items >= 5 (got ${grammarNormalized.length})`);

  // Science / ActionLab adapter
  const labStages = normalizeScienceLabStages(sp.science_lab || sp.action_lab || sp);
  check(Array.isArray(labStages) && labStages.length >= 1, `normalizeScienceLabStages returned >= 1 stage (got ${labStages.length})`);

  // zoneDataMapper (mapDataToZones) check
  let zoneMapOk = false;
  try {
    const zd = zoneDataMapper(indexModule, cfg.num);
    if (zd && zd.storyWorld && zd.knowledgeLab && zd.battleArena && zd.creatorStudio && zd.bossBattle) {
      zoneMapOk = true;
    }
  } catch (e) {
    log(`    zoneDataMapper error: ${e.message}`);
  }
  check(zoneMapOk, `zoneDataMapper maps all 5 zones (storyWorld, knowledgeLab, battleArena, creatorStudio, bossBattle) successfully`);

  // -------------------------------------------------------------------------
  // 5.b: G-GEN-11..16 Quality Gates in Production
  // -------------------------------------------------------------------------
  log('\n--- 5.b: G-GEN-11..16 Quality Gates ---');

  // G-GEN-11: Theme & Source B fidelity
  const g11 = Boolean(prov.theme && mathQuestions.length === 5);
  check(g11, `G-GEN-11 Theme/Math Count: theme="${prov.theme}", mathItems=${mathQuestions.length}/5`);

  // G-GEN-12: Structure, integer correctAnswer & problemText completeness
  const badMath = mathQuestions.filter((q) => {
    const text = q.problemText || q.question || '';
    return !text.trim() || !Number.isInteger(q.correctAnswer) || q.correctAnswer < 0;
  });
  const g12 = badMath.length === 0 && (rh.clil_article?.check_questions?.length || 0) >= 3;
  check(g12, `G-GEN-12 Math/CLIL Schema: validMath=${mathQuestions.length - badMath.length}/5, clilQuestions=${rh.clil_article?.check_questions?.length || 0}`);

  // G-GEN-13: Readability/Scope
  const vocabList = (vh.vocab || vh.vocabulary || vh || []).map((v) => String(v.word || v).toLowerCase());
  const clilText = String(rh.clil_article?.content_en || '');
  const clilWords = clilText.trim().split(/\s+/).filter(Boolean).length;
  const g13 = vocabList.length === 20 && clilWords >= 110;
  check(g13, `G-GEN-13 Readability/Scope: vocabCount=${vocabList.length}/20, clilWords=${clilWords} (>= 110)`);

  // G-GEN-14: Clean English / Zero Vietnamese leak in English fields & zero boilerplate
  const englishFields = [
    clilText,
    ...(rh.clil_article?.check_questions || []).map((q) => `${q.question_en} ${(q.options || []).join(' ')} ${q.answer}`),
    ...mathQuestions.map((q) => `${q.title || ''} ${q.problemText || ''} ${q.hintText || ''} ${(q.steps || []).join(' ')}`),
  ];
  const viLeaks = englishFields.filter((t) => VI_DIACRITICS_RE.test(t));
  const boilerLeaks = englishFields.filter((t) => BOILERPLATE_RE.test(t));
  const g14 = viLeaks.length === 0 && boilerLeaks.length === 0;
  check(g14, `G-GEN-14 Clean English: viLeaks=${viLeaks.length}, boilerplate=${boilerLeaks.length}`);

  // G-GEN-15: Vocabulary coverage (>= 60% of 20 target words + 100% of Source B keywords)
  const lowerClil = clilText.toLowerCase();
  const matchedTarget = vocabList.filter((w) => lowerClil.includes(w));
  const targetCoveragePct = Math.round((matchedTarget.length / vocabList.length) * 100);
  const matchedSb = cfg.sbWords.filter((w) => lowerClil.includes(w));
  const sbOk = cfg.sbWords.length === 0 || matchedSb.length === cfg.sbWords.length;
  const g15 = targetCoveragePct >= 60 && sbOk;
  check(g15, `G-GEN-15 Vocab Coverage: targetCoverage=${targetCoveragePct}% (${matchedTarget.length}/20, min 60%), sbCoverage=${matchedSb.length}/${cfg.sbWords.length}`);

  // G-GEN-16: Zero ESL anomaly phrases
  let foundAnomalies = 0;
  for (const pat of ESL_ANOMALY_PATTERNS) {
    pat.regex.lastIndex = 0;
    const matches = clilText.match(pat.regex);
    if (matches) {
      log(`    Found ESL anomaly [${pat.name}]: ${matches.join(', ')}`);
      foundAnomalies += matches.length;
    }
  }
  const g16 = foundAnomalies === 0;
  check(g16, `G-GEN-16 ESL Anomalies: zero anomalies found (got ${foundAnomalies})`);

  // SVG Static Asset Verification (for W133 & W134)
  if (cfg.useStaticSvg) {
    log('\n--- SVG Static Asset Verification ---');
    let svgOk = true;
    for (const q of mathQuestions) {
      if (q.svg_url) {
        const publicFile = path.join(ROOT_DIR, 'public', q.svg_url.replace(/^\//, ''));
        const srcFile = path.join(dir, 'svg', path.basename(q.svg_url));
        const pubExists = fs.existsSync(publicFile);
        const srcExists = fs.existsSync(srcFile);
        if (!pubExists || !srcExists) {
          svgOk = false;
          log(`    Missing SVG: ${q.svg_url} (pub=${pubExists}, src=${srcExists})`);
        }
      }
    }
    check(svgOk, `Static SVG assets exist in both public/ and src/ for Week ${cfg.num}`);
  }

  // -------------------------------------------------------------------------
  // 5.c: bossRotarySchedule.js Cycle Check
  // -------------------------------------------------------------------------
  log('\n--- 5.c: bossRotarySchedule.js Cycle Check ---');
  const rotaryCfg = getBossRotaryConfig(cfg.num, { isMock: false });
  const lLabel = getRotaryTaskLabel('boss_listening', cfg.num, { isMock: false });
  const rwLabel = getRotaryTaskLabel('boss_reading', cfg.num, { isMock: false });
  const sLabel = getRotaryTaskLabel('weekly_review', cfg.num, { isMock: false });
  check(rotaryCfg.cycleNumber === cfg.expectedCycle, `bossRotarySchedule cycleNumber === ${cfg.expectedCycle} (got ${rotaryCfg.cycleNumber})`);
  check(Boolean(rotaryCfg.activeParts && rotaryCfg.activeParts.length === 4), `bossRotarySchedule activeParts populated (got ${rotaryCfg.activeParts?.length || 0}/4 parts)`);
  check(Boolean(lLabel && rwLabel && sLabel), `getRotaryTaskLabel returned non-empty strings (L="${lLabel}", RW="${rwLabel}", S="${sLabel}")`);
}

log('\n========================================================================');
log(`FINAL RESULT: ${passedChecks}/${totalChecks} checks passed`);
log(`OVERALL STATUS: ${passedChecks === totalChecks ? 'ALL CHECKS PASSED ✅' : 'SOME CHECKS FAILED ❌'}`);
log('========================================================================\n');

fs.writeFileSync(OUT_RAW, out, 'utf8');
log(`Raw log saved to ${OUT_RAW}`);
