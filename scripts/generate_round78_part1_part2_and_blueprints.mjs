#!/usr/bin/env node
/**
 * scripts/generate_round78_part1_part2_and_blueprints.mjs
 *
 * ROUND 78 — TASK C (C.7 & C.8): PART I vs PART II & 156 BLUEPRINT DRY-RUN DIFF (READ-ONLY ON PROD/STAGING)
 * - NEVER modifies src/data/weeks/, docs/agent_artifacts/staging/, or any governance/SOP/Map file.
 * - Generates:
 *     1. docs/agent_artifacts/round78_temp_blueprints/week_{1..156}_blueprint.json
 *     2. docs/agent_artifacts/round78_blueprint_and_part_audit_raw.txt
 */

import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';
import {
  parseSourceBPartII,
  parseSourceBPartIMap,
  parseDigitalMapRows,
  normalizeComparisonText
} from './lib/source_b_part2_parser.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const SOURCE_B_PATH = path.join(ROOT_DIR, 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');
const MAP_PATH = path.join(ROOT_DIR, 'docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md');
const GEN_BP_PATH = path.join(ROOT_DIR, 'scripts/generate_week_blueprint.mjs');
const PROD_WEEKS_DIR = path.join(ROOT_DIR, 'src/data/weeks');
const STAGING_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/staging');

const OUT_TEMP_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/round78_temp_blueprints');
const OUT_REPORT = path.join(ROOT_DIR, 'docs/agent_artifacts/round78_blueprint_and_part_audit_raw.txt');

const bt = (s) => '`' + s + '`';
const escPipe = (s) => (s || '').replace(/\|/g, '\\|').trim();
const hasViDiacritics = (s) => /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốồỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(s || '');

function evalJsModule(filePath) {
  if (!fs.existsSync(filePath)) return null;
  let raw = fs.readFileSync(filePath, 'utf8');
  raw = raw.replace(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '');
  raw = raw.replace(/\bexport\s+default\s+/g, 'module.exports.default = ');
  raw = raw.replace(/\bexport\s+(?:async\s+)?function\s+([A-Za-z0-9_]+)/g, 'function $1');
  raw = raw.replace(/\bexport\s+(const|let|var)\s+([A-Za-z0-9_]+)\s*=/g, 'const $2 = module.exports.$2 =');
  raw = raw.replace(/\bexport\s*\{[^}]*\};?/g, '');
  const sandbox = { module: { exports: {} }, exports: {} };
  vm.runInNewContext(raw, sandbox);
  return sandbox.module.exports.default ?? sandbox.module.exports;
}

const sbData = parseSourceBPartII(SOURCE_B_PATH);
const partIMap = parseSourceBPartIMap(SOURCE_B_PATH);
const dmData = parseDigitalMapRows(MAP_PATH);
const genBpRaw = fs.readFileSync(GEN_BP_PATH, 'utf8');
const genBpLines = genBpRaw.split('\n');

// ============================================================================
// 1. DYNAMIC INSPECTION OF scripts/generate_week_blueprint.mjs BUGS
// ============================================================================
function findLineSpan(lines, startPattern, maxLines = 25) {
  const idx = lines.findIndex(l => startPattern.test(l));
  if (idx === -1) return null;
  return {
    startLine: idx + 1,
    endLine: Math.min(lines.length, idx + maxLines),
    snippet: lines.slice(idx, Math.min(lines.length, idx + maxLines)).map((l, k) => `${idx + 1 + k}: ${l}`).join('\n')
  };
}

const bugParseKhungCt = findLineSpan(genBpLines, /^function parseKhungCT\(/, 45);
const bugRangeParse = findLineSpan(genBpLines, /rangeRegex/, 32);
const bugSilentFallback = findLineSpan(genBpLines, /if\s*\(txtData\)/, 28);
const bugSourceNull = findLineSpan(genBpLines, /source_master_syllabus:/, 6);
const bugIsFullMock = findLineSpan(genBpLines, /const isFullMock\s*=/, 12);
const bugQuoteRegex = findLineSpan(genBpLines, /const gramMatch =|grammar.*match\(/, 18);

// ============================================================================
// 2. CLEAN SOURCE B PART II TEMP BLUEPRINT GENERATOR (W01..W156 -> TEMP DIR)
// ============================================================================
fs.mkdirSync(OUT_TEMP_DIR, { recursive: true });
for (const f of fs.readdirSync(OUT_TEMP_DIR)) {
  if (f.endsWith('.json')) fs.unlinkSync(path.join(OUT_TEMP_DIR, f));
}

function normalizeCefrTarget(w) {
  // Authoritative phase/block CEFR tiers aligned with Digital Map & Source B Part II
  if (w <= 8) return 'Pre-A1 Starters';
  if (w <= 16) return 'Pre-A1 -> A1';
  if (w <= 32) return 'A1 Movers';
  if (w <= 72) return 'A2 Flyers';
  if (w <= 88) return 'B1 PET';
  if (w <= 120) return 'B1+ PET';
  return 'B1+ Academic';
}

function deriveProposedWeekType(w, sb) {
  if (w === 54 || w === 120 || w === 156) return 'graduation_showcase';
  if (sb.blockOrigin === 'multi_week_cycle') return 'review_cycle';
  if (/Review & Project|Review & Consolidation|Review Station|Review & Checkpoint/i.test(sb.titleEn)) {
    return 'review_consolidation';
  }
  return 'rotary_practice';
}

function buildProposedBlueprint(w) {
  const sb = sbData.weeks[w];
  const dm = dmData.rows[w];
  const cleanTitle = sb.blockOrigin === 'multi_week_cycle'
    ? (w >= 79 && w <= 80 ? `${sb.titleEn}: ${sb.topicEla}` : w >= 95 && w <= 96 ? `${sb.titleEn}: ${sb.topicEla}` : `${sb.titleEn}`)
    : sb.titleEn;

  const clilTitle = sb.topicEla || (w >= 129 && w <= 132 ? sb.outcomeEla : null);
  const weekType = deriveProposedWeekType(w, sb);

  return {
    week: w,
    schema_version: 'round78_part2_dry_run_v1',
    theme: cleanTitle,
    title_en: cleanTitle,
    cefr_level: normalizeCefrTarget(w),
    week_type: weekType,
    isFullMock: false, // Rule: all 156 content weeks are non-mock; 34 mocks live in interleaved M01..M34 slots
    mock_schedule_note: 'Content week only (isFullMock: false). Mock checkpoints M01..M34 live in separate interleaved slots.',
    clil_topic: {
      title: clilTitle || `[SUPPLEMENT NEEDED — Source B L${sb.headerLineNum} silent]`,
      focus: sb.outcomeEla || clilTitle || `[SUPPLEMENT NEEDED]`,
      source: clilTitle ? `Source B L${sb.topicLineNum || sb.headerLineNum}` : 'SUPPLEMENT (Source B silent)'
    },
    math_focus: {
      topic: sb.mathTopic || null,
      outcome: sb.mathOutcome || null,
      vocab: sb.mathWords,
      source: sb.hasMath ? `Source B L${sb.mathLineNum || sb.headerLineNum}` : 'SUPPLEMENT (Source B has 0 Math)'
    },
    grammar_focus: {
      structure: sb.grammarFocus || null,
      outcome: sb.outcomeEla || null,
      source: sb.grammarFocus ? `Source B L${sb.grammarLineNum}` : 'SUPPLEMENT (Source B silent)'
    },
    vocabulary_focus: {
      syllabus_words: sb.vocabWords,
      total_syllabus_words: sb.vocabWords.length,
      supplement_needed: Math.max(0, 20 - sb.vocabWords.length),
      source: sb.vocabWords.length > 0 ? `Source B L${sb.vocabLineNum}` : 'SUPPLEMENT (0 words in Source B)'
    },
    metadata_provenance: {
      generator_script: 'scripts/generate_round78_part1_part2_and_blueprints.mjs',
      primary_pedagogical_authority: 'Source B Part II (docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt)',
      source_master_syllabus: true,
      source_b_part: 'Part II',
      source_b_header_line: sb.headerLineNum,
      source_b_block_origin: sb.blockOrigin,
      source_b_range_span: sb.rangeSpan || null,
      digital_map_line: dm ? dm.lineNum : null
    }
  };
}

const tempBlueprints = {};
for (let w = 1; w <= 156; w++) {
  const bp = buildProposedBlueprint(w);
  tempBlueprints[w] = bp;
  fs.writeFileSync(path.join(OUT_TEMP_DIR, `week_${w}_blueprint.json`), JSON.stringify(bp, null, 2) + '\n', 'utf8');
}

// ============================================================================
// 3. C.7 DIFF: TEMP PART II BLUEPRINTS vs EXISTING PROD (+ SEPARATE STAGING SECTION)
//    Filter cosmetic formatting noise; separate "isFullMock sẽ bỏ" into its own group!
// ============================================================================
function asStr(v) {
  if (v === null || v === undefined) return '';
  if (typeof v === 'string') return v;
  if (Array.isArray(v)) return v.map(x => asStr(x)).join(', ');
  if (typeof v === 'object') return v.structure || v.title || v.pattern || JSON.stringify(v);
  return String(v);
}

function stripFormatNoise(s) {
  return asStr(s)
    .replace(/['"`“”‘’]/g, '')
    .replace(/[\u2192\u2013\u2014]/g, '-')
    .replace(/\s*\/\s*Toán:[^)]*\)?/gi, '')
    .replace(/&/g, 'and')
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function normCefr(raw, w) {
  const s = normalizeComparisonText(raw).replace(/->/g, 'to');
  if (!s) return '';
  if (s.includes('pre-a1') && (s.includes('to a1') || s.includes('a1'))) return 'pre-a1 to a1';
  if (s.includes('pre-a1')) return 'pre-a1 starters';
  if (s.includes('movers')) return 'a1 movers';
  if (s.includes('flyers')) return 'a2 flyers';
  if (s.includes('b1+') && s.includes('pet')) return 'b1+ pet';
  if (s.includes('b1+')) return 'b1+ academic';
  if (s.includes('preliminary') || s.includes('pet')) return 'b1 pet';
  return s;
}

function significantWords(s) {
  const stop = new Set(['the', 'and', 'for', 'with', 'into', 'from', 'that', 'this', 'use', 'using', 'write', 'about', 'what', 'how', 'your', 'math', 'ela', 'science', 'history', 'social', 'studies', 'geography', 'topic', 'review', 'part', 'practice', 'simple', 'words']);
  return [...new Set(stripFormatNoise(s).split(' ').filter(t => t.length >= 3 && !stop.has(t)))];
}

function diffPair(w, oldBp, newBp, layerLabel = 'PROD') {
  const contentDiffs = [];
  let mockRemovedItem = null;
  const sb = sbData.weeks[w];
  const oldIsFullMock = Boolean(oldBp.isFullMock);
  const oldWeekType = oldBp.week_type || null;

  // Separated group: isFullMock sẽ bỏ (+ tied week_type: full_mock -> content type)
  if (oldIsFullMock) {
    const dmRow = dmData.rows[w];
    const dmMarkedMock = Boolean(dmRow?.hasFullMock || dmRow?.hasGraduationMarker);
    const ruleSrc = w % 4 === 0
      ? (dmMarkedMock
          ? 'quy tắc Round 64 (39 tuần % 4 === 0 trong prod blueprint.json) + cờ Digital Map ★ FULL MOCK'
          : 'quy tắc Round 64 (39 tuần % 4 === 0 trong prod blueprint.json hiện tại; lưu ý generate_week_blueprint.mjs hiện hành L100 đọc cờ ★ FULL MOCK từ Digital Map)')
      : 'cờ Digital Map ★ FULL MOCK / _mock staging';
    mockRemovedItem = {
      week: w,
      layer: layerLabel,
      oldTheme: oldBp.theme,
      oldIsFullMock: true,
      newIsFullMock: false,
      oldWeekType,
      newWeekType: newBp.week_type,
      reason: `${ruleSrc} gắn trực tiếp lên tuần nội dung W${w}; nay tách mock ra slot xen kẽ M01..M34 (${newBp.metadata_provenance.source_b_block_origin}, Source B L${sb.headerLineNum})`
    };
  }

  // Determine root cause helper
  const prov = oldBp.metadata_provenance || {};
  const dmRef = oldBp.digital_map_reference || {};
  const inferCausePrefix = () => {
    if (w === 33) return '[W33 FROZEN EXCEPTION per Owner Decision 1] ';
    if (prov.source_master_syllabus === false) return 'Parser cũ miss Source B -> fallback toàn phần sang Source A (Digital Map): ';
    if (dmRef.alignment_status === 'DIVERGENT_THEME_FALLBACK_TO_SOURCE_B') return 'Digital Map reference lệch với Source B Part II: ';
    if (sb.blockOrigin === 'multi_week_cycle') return `Parser cũ không tách block nhiều tuần (${sb.rangeSpan}) hoặc dính Part I L105: `;
    return '';
  };

  // 1) theme (suppress pure formatting/quote/bilingual-suffix noise)
  const oldThemeNorm = stripFormatNoise(oldBp.theme);
  const newThemeNorm = stripFormatNoise(newBp.theme);
  if (oldThemeNorm !== newThemeNorm) {
    const newTokens = significantWords(newBp.theme);
    const oldTokens = significantWords(oldBp.theme);
    const overlap = newTokens.filter(t => oldTokens.includes(t));
    // W79-80 / W129-132 / W33 / W34 / W95-96 genuine diffs
    if (!(overlap.length === newTokens.length && oldTokens.length === newTokens.length)) {
      contentDiffs.push({
        field: 'theme',
        oldVal: oldBp.theme || '(missing)',
        newVal: newBp.theme,
        cause: `${inferCausePrefix()}Theme cũ "${oldBp.theme}" != Source B Part II "${newBp.theme}" (L${sb.headerLineNum})`
      });
    }
  }

  // 2) title (title_en vs theme fallback if W33 schema lacks title_en)
  const rawOldTitle = oldBp.title_en || null;
  if (rawOldTitle !== null) {
    const oldTitleNorm = stripFormatNoise(rawOldTitle);
    const newTitleNorm = stripFormatNoise(newBp.title_en);
    // Ignore simple `Theme: Subtitle` elaboration ONLY if all tokens match? Wait: in W80 Supply/Demand or W129 Smartphones, tokens differ completely.
    if (oldTitleNorm !== newTitleNorm) {
      contentDiffs.push({
        field: 'title',
        oldVal: rawOldTitle,
        newVal: newBp.title_en,
        cause: `${inferCausePrefix()}title_en cũ "${rawOldTitle}" != Source B Part II "${newBp.title_en}" (L${sb.headerLineNum})`
      });
    }
  }

  // 3) clil_topic (suppress cosmetic `" & Explaining..."` boilerplate noise; catch Vietnamese leaks, wrong topics, and missed Topic: text)
  const oldClilTitle = typeof oldBp.clil_topic === 'string' ? oldBp.clil_topic : (oldBp.clil_topic?.title || '');
  const oldClilFocus = typeof oldBp.clil_topic === 'object' ? (oldBp.clil_topic?.focus || '') : '';
  const oldClilCombined = `${oldClilTitle} ${oldClilFocus}`.trim();
  const hasViLeakClil = hasViDiacritics(oldClilTitle) || hasViDiacritics(oldClilFocus);
  const sbHasClilTopic = Boolean(sb.topicEla);

  if (hasViLeakClil) {
    contentDiffs.push({
      field: 'clil_topic',
      oldVal: oldClilTitle,
      newVal: newBp.clil_topic.title,
      cause: `${inferCausePrefix()}clil_topic rò rỉ mô tả tiếng Việt từ Digital Map Cột 4 thay vì Source B Part II`
    });
  } else if (!sbHasClilTopic && w >= 129 && w <= 132) {
    if (stripFormatNoise(oldClilTitle) !== stripFormatNoise(newBp.clil_topic.title)) {
      contentDiffs.push({
        field: 'clil_topic',
        oldVal: oldClilTitle || '(empty)',
        newVal: newBp.clil_topic.title,
        cause: `Parser cũ dính Part I L105 Smartphones hoặc lấy tên giả cho khối W129–132 thay vì Part II L1007–1008`
      });
    }
  } else if (sbHasClilTopic) {
    // Check if Source B Topic keywords were completely missed (not just `& Descriptive writing` suffix)
    const sbTopicTokens = significantWords(sb.topicEla);
    const oldClilNorm = stripFormatNoise(oldClilCombined);
    const missingSbTopic = sbTopicTokens.filter(t => !oldClilNorm.includes(t));
    // Also check if oldBp has a totally wrong topic (like W80 Supply Demand or W126 Data & Statistical Claims or W95 Ocean)
    const isForeignTopic = /ocean|acidification|supply|demand|industrial|smartphones|statistical claims|mid-phase/i.test(oldClilCombined) &&
      !/ocean|supply|demand|industrial|smartphones|statistical/i.test(`${sb.titleEn} ${sb.topicEla}`);
    if (isForeignTopic) {
      contentDiffs.push({
        field: 'clil_topic',
        oldVal: oldClilTitle,
        newVal: sb.topicEla,
        cause: `${inferCausePrefix()}Chủ đề CLIL cũ lạc hẳn khỏi Source B Part II "${sb.topicEla}" (L${sb.topicLineNum || sb.headerLineNum})`
      });
    } else if (sbTopicTokens.length >= 2 && missingSbTopic.length === sbTopicTokens.length) {
      contentDiffs.push({
        field: 'clil_topic',
        oldVal: oldClilTitle,
        newVal: sb.topicEla,
        cause: `parseKhungCT/generateBlueprint cũ bỏ qua trường "Topic:" của Source B (L${sb.topicLineNum || sb.headerLineNum}), chỉ lấy title_en + đuôi mẫu chung ("& ...")`
      });
    }
  }

  // 4) grammar (suppress simple outer-quote removal; report real wrong/Vietnamese/truncated clause losing content)
  const rawGramObj = oldBp.grammar_focus?.structure ?? oldBp.grammar_pattern ?? null;
  const oldGram = rawGramObj ? asStr(rawGramObj) : null;
  const newGram = sb.grammarFocus || null;
  if (!newGram && oldGram && !/^\[?SUPPLEMENT/i.test(oldGram)) {
    contentDiffs.push({
      field: 'grammar',
      oldVal: oldGram,
      newVal: null,
      cause: `Source B im lặng Grammar Focus (L${sb.headerLineNum}), nhưng blueprint cũ tự lấy từ Digital Map Cột 6 thay vì đánh dấu null/SUPPLEMENT`
    });
  } else if (newGram && !oldGram) {
    contentDiffs.push({
      field: 'grammar',
      oldVal: '(missing)',
      newVal: newGram,
      cause: `${inferCausePrefix()}Parser cũ bỏ sót Grammar Focus ở Source B L${sb.grammarLineNum}`
    });
  } else if (newGram && oldGram) {
    const oldGramClean = stripFormatNoise(oldGram);
    const newGramClean = stripFormatNoise(newGram);
    if (oldGramClean !== newGramClean) {
      // Detect mid-sentence regex truncation vs totally different grammar
      const isPrefixTruncated = newGramClean.startsWith(oldGramClean) && (newGramClean.length - oldGramClean.length >= 4);
      const cause = isPrefixTruncated
        ? `BUG regex ngoặc kép trong parseKhungCT: cắt cụt vế sau của Grammar Focus (mất: "${newGram.slice(oldGram.length).trim()}") tại Source B L${sb.grammarLineNum}`
        : `${inferCausePrefix()}Grammar cũ "${oldGram}" != Source B L${sb.grammarLineNum} "${newGram}"`;
      contentDiffs.push({
        field: 'grammar',
        oldVal: oldGram,
        newVal: newGram,
        cause
      });
    }
  }

  // 5) vocab (exact word array diff against Source B Vocab Focus; preserve '/' in raw display)
  const oldVocabRaw = (oldBp.vocabulary_focus?.syllabus_words || []).map(x => String(x || '').trim()).filter(Boolean);
  const newVocabRaw = (newBp.vocabulary_focus?.syllabus_words || []).map(x => String(x || '').trim()).filter(Boolean);
  const vocabKey = s => s.toLowerCase().replace(/^[`"'“”‘’]+|[`"'“”‘’.,;\r\n]+$/g, '').replace(/\s+/g, ' ').trim();
  const oldVocab = oldVocabRaw.map(vocabKey).filter(Boolean);
  const newVocab = newVocabRaw.map(vocabKey).filter(Boolean);
  const missingInOld = newVocab.filter(w0 => !oldVocab.includes(w0));
  const extraInOld = oldVocab.filter(w0 => !newVocab.includes(w0));
  if (missingInOld.length > 0 || extraInOld.length > 0) {
    let extraNote = '';
    if (extraInOld.length) {
      if (w === 65) extraNote = `dư câu hướng dẫn ôn tập trong Source B L515: ${extraInOld.join(', ')}`;
      else if (extraInOld.some(tok => tok.includes('/'))) {
        extraNote = `chưa tách dấu '/' thành từ riêng: ${extraInOld.join(', ')}`;
      } else if (sb.outcomeEla && extraInOld.every(tok => normalizeComparisonText(sb.outcomeEla).includes(normalizeComparisonText(tok)))) {
        extraNote = `trích nhầm từ Key Learning Outcome (ELA) khi Vocabulary Focus vắng trong Source B: ${extraInOld.join(', ')}`;
      } else {
        extraNote = `dư/sai nguồn ngoài Vocabulary Focus: ${extraInOld.join(', ')}`;
      }
    }
    contentDiffs.push({
      field: 'vocab',
      oldVal: `[${oldVocabRaw.length}]: ${oldVocabRaw.join(', ')}`,
      newVal: `[${newVocabRaw.length}]: ${newVocabRaw.join(', ')}`,
      cause: `${inferCausePrefix()}Vocab Focus sai lệch (${missingInOld.length ? `thiếu: ${missingInOld.join(', ')}` : ''}${missingInOld.length && extraInOld.length ? '; ' : ''}${extraNote})`
    });
  }

  // 6) cefr (canonical comparison; ignore only harmless case/spacing noise)
  const oldCefrRaw = oldBp.cefr_level || oldBp.cefr || '';
  const oldCefrNorm = normCefr(oldCefrRaw, w);
  const newCefrNorm = normCefr(newBp.cefr_level, w);
  if (oldCefrNorm && oldCefrNorm !== newCefrNorm) {
    // Allow Block B (W17-32) vs W15/W16 nuances? Check exact Digital Map block:
    // Actually W16 in old prod had `A2 Flyers` despite Block A Pre-A1 -> A1! That IS a real bug in old generate_week_blueprint.mjs!
    contentDiffs.push({
      field: 'cefr',
      oldVal: oldCefrRaw,
      newVal: newBp.cefr_level,
      cause: `CEFR cũ "${oldCefrRaw}" sai giai đoạn Block/Phase (Lý do: ${oldIsFullMock ? 'resolveTemplate/cefr override nhầm tầng Mock' : 'parseDigitalMap gán nhầm nhãn CEFR mặc định'})`
    });
  }

  // 7) week_type (non-mock changes separated cleanly from mock-removal changes!)
  if (oldWeekType && !oldIsFullMock && oldWeekType !== newBp.week_type) {
    // Only flag meaningful classification shifts (graduation_showcase on W54/W120/W156 or review_cycle on multi-week cycles W79-80/W95-96/W129-132 vs rotary_practice)
    if (newBp.week_type === 'graduation_showcase' || newBp.week_type === 'review_cycle') {
      contentDiffs.push({
        field: 'week_type',
        oldVal: oldWeekType,
        newVal: newBp.week_type,
        cause: newBp.week_type === 'graduation_showcase'
          ? `Tuần W${w} là Graduation Showcase theo Source B (L${sb.headerLineNum}), trước đó gán chung 'rotary_practice'`
          : `Thuộc multi-week review cycle (${sb.rangeSpan}) của Source B (L${sb.headerLineNum}), trước đó gán 'rotary_practice'`
      });
    }
  }

  return { contentDiffs, mockRemovedItem };
}

const prodMockRemoved = [];
const prodContentDiffWeeks = [];
const prodFieldStats = { theme: 0, title: 0, clil_topic: 0, grammar: 0, vocab: 0, cefr: 0, week_type: 0 };
let prodWeeksScanned = 0;

for (let w = 1; w <= 156; w++) {
  const bpPath = path.join(PROD_WEEKS_DIR, `week_${w}`, 'blueprint.json');
  if (!fs.existsSync(bpPath)) continue;
  prodWeeksScanned++;
  const oldBp = JSON.parse(fs.readFileSync(bpPath, 'utf8'));
  const { contentDiffs, mockRemovedItem } = diffPair(w, oldBp, tempBlueprints[w], 'PROD');
  if (mockRemovedItem) prodMockRemoved.push(mockRemovedItem);
  if (contentDiffs.length > 0) {
    prodContentDiffWeeks.push({ week: w, diffs: contentDiffs, oldBp });
    for (const d of contentDiffs) prodFieldStats[d.field]++;
  }
}

// Also diff staging blueprints separately!
const stagingDiffSummary = [];
const stagingMockRemoved = [];
if (fs.existsSync(STAGING_DIR)) {
  const stgDirs = fs.readdirSync(STAGING_DIR).filter(d => /^week_\d+/.test(d)).sort((a, b) => {
    return parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10);
  });
  for (const dir of stgDirs) {
    const bpPath = path.join(STAGING_DIR, dir, 'blueprint.json');
    if (!fs.existsSync(bpPath)) continue;
    const w = parseInt(dir.match(/\d+/)[0], 10);
    const stgBp = JSON.parse(fs.readFileSync(bpPath, 'utf8'));
    const { contentDiffs, mockRemovedItem } = diffPair(w, stgBp, tempBlueprints[w], `STAGING:${dir}`);
    if (mockRemovedItem) stagingMockRemoved.push({ dir, ...mockRemovedItem });
    stagingDiffSummary.push({ dir, week: w, diffs: contentDiffs, stgBp });
  }
}

// ============================================================================
// 4. C.8 COMPLETE TABLE W113–W156 (44 WEEKS) — DYNAMIC FILE INSPECTION
// ============================================================================
function findPartIInfo(w) {
  for (const entry of partIMap) {
    if (w >= entry.start && w <= entry.end) return entry;
  }
  return null;
}

function detectTextAlignment(text, w, sbPartII, p1Entry) {
  if (!text) return null;
  const n = normalizeComparisonText(text);
  // Specific Wave 3 / W129-132 / W113-156 Part I markers in Source B L102-111:
  const sbTitleN = normalizeComparisonText(sbPartII.titleEn);
  const sbTopicN = normalizeComparisonText(sbPartII.topicEla);
  if (w >= 129 && w <= 132) {
    if (/smartphones|under 12|global approaches|persuasive techniques/i.test(n)) return 'Part I (L105: Smartphones / Opinion Project 3)';
    if (/future cities|eco-architecture|vertical farm/i.test(n)) return 'KHÔNG THEO I & II (Nội dung bịa)';
    if (n.includes('review math logic') || n.includes('review and math logic')) return 'Part II (L1007–1008: Review & Math Logic Cycle)';
    return 'Khác (không khớp Part I hay Part II)';
  }
  if (/data and statistical|statistical claims|cybernetics|ocean acidification|food engineering|smart-city|urban planning/i.test(n)) {
    return 'KHÔNG THEO I & II (Bịa / Source A cũ)';
  }
  if (p1Entry) {
    const p1TitleTokens = significantWords(p1Entry.text).filter(t => !['weeks', 'phase', 'cycle', 'project', 'opinion', 'debate', 'mastery'].includes(t));
    // Check if Part II title/topic tokens match cleanly
    const p2Tokens = significantWords(`${sbPartII.titleEn} ${sbPartII.topicEla}`);
    const p2Matched = p2Tokens.filter(t => n.includes(t));
    if (p2Tokens.length > 0 && p2Matched.length >= Math.min(2, p2Tokens.length)) {
      return `Part II (L${sbPartII.headerLineNum})`;
    }
    if (p1TitleTokens.some(t => n.includes(t)) && (!p2Matched.length)) {
      return `Part I (L${p1Entry.lineNum})`;
    }
  }
  if (sbTitleN && n.includes(sbTitleN)) return `Part II (L${sbPartII.headerLineNum})`;
  if (sbTopicN && n.includes(sbTopicN)) return `Part II (L${sbPartII.headerLineNum})`;
  return 'Cần kiểm tra chi tiết';
}

const w113To156Rows = [];
for (let w = 113; w <= 156; w++) {
  const sb = sbData.weeks[w];
  const dm = dmData.rows[w];
  const p1 = findPartIInfo(w);

  // 1) Prod Blueprint
  const prodDir = path.join(PROD_WEEKS_DIR, `week_${w}`);
  const prodBpPath = path.join(prodDir, 'blueprint.json');
  const prodBp = fs.existsSync(prodBpPath) ? JSON.parse(fs.readFileSync(prodBpPath, 'utf8')) : null;
  const prodHasContent = fs.existsSync(path.join(prodDir, 'reading_hub.js'));
  const prodReadTheme = prodHasContent ? (evalJsModule(path.join(prodDir, 'reading_hub.js'))?.theme || '(no theme)') : null;

  // 2) Staging
  const stgDir = path.join(STAGING_DIR, `week_${w}`);
  const stgExists = fs.existsSync(stgDir);
  const stgBp = stgExists && fs.existsSync(path.join(stgDir, 'blueprint.json')) ? JSON.parse(fs.readFileSync(path.join(stgDir, 'blueprint.json'), 'utf8')) : null;
  const stgReadHub = stgExists && fs.existsSync(path.join(stgDir, 'reading_hub.js')) ? evalJsModule(path.join(stgDir, 'reading_hub.js')) : null;
  const stgReadTheme = stgReadHub?.theme || null;

  // Evaluate classification across layers dynamically
  const bpStatus = prodBp ? detectTextAlignment(prodBp.theme, w, sb, p1) : 'Không có blueprint';
  const dmTitleRel = dm ? (
    normalizeComparisonText(dm.themeRaw) === normalizeComparisonText(sb.titleEn)
      ? `Part II tiêu đề (L${sb.headerLineNum})`
      : (w >= 129 && w <= 131
          ? `Part I (L105: Smartphones)`
          : (w === 132
              ? `Mock giả chèn trong khung Part I W129–136 (${dm.themeRaw})`
              : `Lệch Part II (${dm.themeRaw})`))
  ) : 'Missing';

  // Determine overall Repo status & fixes needed dynamically
  const fixes = [];
  let repoStatus = '';

  const bpHasPartII = /^Part II(?:\s|\(|$)/.test(bpStatus || '');
  const bpHasPartI = /^Part I(?:\s|\(|$)/.test(bpStatus || '');
  const stgDiff = stgExists ? stagingDiffSummary.find(x => x.week === w) : null;
  const prodDiffObj = prodContentDiffWeeks.find(x => x.week === w);
  const prodIsMock = Boolean(prodBp?.isFullMock);

  // Check if Digital Map needs fix
  const dmNeedsFix = [];
  if (dm.hasFullMock || dm.hasGraduationMarker) dmNeedsFix.push('bỏ ★ FULL MOCK/GRADUATION sang tuần xen kẽ');
  if (w >= 129 && w <= 131) dmNeedsFix.push('sửa Smartphones (Part I L105) -> Review & Math Logic Cycle (Part II L1007–1008)');
  else if (w === 132) dmNeedsFix.push('sửa B1+ Academic Assessment Mock 2 (mock giả chèn khung Part I W129–136) -> Review & Math Logic Cycle (Part II L1007–1008)');
  if (w >= 121 && w <= 128 && normalizeComparisonText(dm.grammarRaw).includes('math_quest') && sb.mathTopic && !normalizeComparisonText(dm.grammarRaw).includes(normalizeComparisonText(sb.mathTopic))) {
    dmNeedsFix.push(`đồng bộ Topic/Math/Grammar Cột 4+6 theo Part II (VD Math="${sb.mathTopic}")`);
  } else if (dm.lineNum) {
    if (!sb.grammarFocus) dmNeedsFix.push('gắn nhãn SUPPLEMENT cho Grammar/Vocab im lặng + đồng bộ Col 4/6 theo Part II');
    else dmNeedsFix.push('đồng bộ Grammar/Vocab Col 6 & CLIL Col 4 theo Part II');
  }

  // Check Prod blueprint fixes
  const bpFixes = [];
  if (prodIsMock) bpFixes.push('bỏ isFullMock=true (chuyển sang slot M24..M34 [CHỜ OWNER])');
  if (prodDiffObj) {
    const fList = prodDiffObj.diffs.map(d => d.field).join('/');
    bpFixes.push(`cập nhật [${fList}] từ Part II L${sb.headerLineNum}`);
  }
  if (prodHasContent) {
    bpFixes.push(`đã có .js content prod (theme="${prodReadTheme}"), kiểm tra đối chiếu Toán/Vocab Part II`);
  }

  // Check Staging fixes
  const stgFixes = [];
  if (stgExists) {
    const stgReadAligned = detectTextAlignment(stgReadTheme, w, sb, p1);
    const stgBpAligned = stgBp ? detectTextAlignment(stgBp.theme, w, sb, p1) : 'thiếu blueprint.json staged';
    stgFixes.push(`tái sinh/kiểm tra lại theo acceptance spec (hiện reading_hub.theme="${stgReadTheme}" [${stgReadAligned}]; staged blueprint: ${stgBpAligned})`);
  }

  // Build crisp classification string dynamically without prefix bugs
  const partINote = p1 ? `Part I L${p1.lineNum}` : 'Part I kết thúc tại W144 (W145–156 chỉ có trong Part II)';
  if (stgExists) {
    repoStatus = `Lệch tầng — Prod BP: ${bpStatus}; Map: ${dmTitleRel}; Staged Content: ${detectTextAlignment(stgReadTheme, w, sb, p1)} (theme="${stgReadTheme}")`;
  } else if (bpHasPartI) {
    repoStatus = `Theo ${partINote} (Prod BP: "${prodBp?.theme}"; Map: ${dmTitleRel})`;
  } else if (bpHasPartII && prodDiffObj) {
    repoStatus = `Theo Part II ở tiêu đề/khung chính (L${sb.headerLineNum}; khác ${partINote}), nhưng BP còn lệch [${prodDiffObj.diffs.map(d => d.field).join('/')}]${prodIsMock ? ' + isFullMock=true' : ''} & Map Cột 4/6 chưa khớp Part II`;
  } else if (bpHasPartII) {
    repoStatus = `Theo Part II ở tiêu đề/khung chính (L${sb.headerLineNum}; khác ${partINote})${prodIsMock ? ' + isFullMock=true' : ''}; Map Cột 4/6 còn lệch`;
  } else {
    repoStatus = `Prod BP: ${bpStatus}; Map: ${dmTitleRel}`;
  }

  const actionParts = [];
  if (bpFixes.length) actionParts.push(`BP: ${bpFixes.join(', ')}`);
  else actionParts.push('BP: đạt trường chính (giữ sync)');
  if (dmNeedsFix.length) actionParts.push(`Digital Map (L${dm.lineNum}): ${dmNeedsFix.join(', ')}`);
  if (stgFixes.length) actionParts.push(`Staged (${path.basename(stgDir)}): ${stgFixes.join(', ')}`);

  w113To156Rows.push({
    week: w,
    repoStatus,
    sbLineRef: `L${sb.headerLineNum} (${sb.blockOrigin === 'multi_week_cycle' ? sb.rangeSpan : sb.titleEn}${(sb.mathTopic || sb.mathFocus) ? ` | Math: ${sb.mathTopic || sb.mathFocus}` : ' | Math: không có'})`,
    fixNeeded: actionParts.join(' ; ')
  });
}

// ============================================================================
// WRITE REPORT FILE docs/agent_artifacts/round78_blueprint_and_part_audit_raw.txt
// ============================================================================
let out = '';
out += '====================================================================================================\n';
out += '📊 ROUND 78 — TASK C (C.7 & C.8): SOURCE B PART II BLUEPRINT DRY-RUN DIFF & BẢNG PART I/II W113–W156\n';
out += `Thời điểm chạy: ${new Date().toISOString()}\n`;
out += `Thư mục blueprint tạm (Dry-Run Only): ${path.relative(ROOT_DIR, OUT_TEMP_DIR)}/ (${Object.keys(tempBlueprints).length} files)\n`;
out += 'Quy tắc lọc nhiễu định dạng (Noise Suppression):\n';
out += '  - Bỏ qua khác biệt thuần dấu câu/ngoặc kép bao ngoài, viết hoa, ký tự "->" vs Unicode arrow, "&" vs "and",\n';
out += '    và hậu tố tiếng Việt lỗi "/ Toán: ..." trên tiêu đề nếu tập từ khóa cốt lõi trùng khớp 100%.\n';
out += '  - TÁCH RIÊNG hoàn toàn nhóm "isFullMock sẽ bỏ" (kèm week_type=full_mock đi kèm) khỏi diff nội dung/học thuật.\n';
out += '====================================================================================================\n\n';

out += '### C.7.1. NGUYÊN NHÂN TỪ CODE GENERATOR HIỆN TẠI (`scripts/generate_week_blueprint.mjs`)\n\n';
out += `- **Quét xuyên từ đầu file (bao gồm Part I ${bt('L1–L' + (sbData.part2Line - 1))}, không lọc ${bt('>= part2Start')} \`L${sbData.part2Line}\`)**: đồng thời loạt \`blueprint.json\` production sinh ngày 2026-11-04 (trước khi có \`rangeRegex\`) đã bỏ sót các cụm đa tuần ${bt('Weeks 79-80')}, ${bt('Weeks 95-96')}, ${bt('Weeks 129-132')} (${bt('source_master_syllabus: false')}). Ngay ở bản hiện hành, ${bt('parseKhungCT')} vẫn quét qua Part I trước khi xuống fallback đa tuần:\n`;
if (bugParseKhungCt) {
  out += `\`\`\`javascript\n// scripts/generate_week_blueprint.mjs:L${bugParseKhungCt.startLine}–${bugParseKhungCt.endLine}\n${bugParseKhungCt.snippet}\n\`\`\`\n\n`;
}
if (bugRangeParse) {
  out += `- **Cơ chế fallback đa tuần (${bt('rangeRegex')}) mới thêm sau**:\n`;
  out += `\`\`\`javascript\n// scripts/generate_week_blueprint.mjs:L${bugRangeParse.startLine}–${bugRangeParse.endLine}\n${bugRangeParse.snippet}\n\`\`\`\n\n`;
}
if (bugSilentFallback) {
  out += `- **Fallback sang Digital Map (Source A) khi ${bt('txtData === null')} + bỏ sót ${bt('Topic (ELA)')}/${bt('Topic (Math)')} trong ${bt('if (txtData)')}**: dựng ${bt('clil_topic')} từ tiêu đề tuần thay vì trường ${bt('Topic (ELA)')} và không đọc ${bt('Topic (Math)')} từ Source B:\n`;
  out += `\`\`\`javascript\n// scripts/generate_week_blueprint.mjs:L${bugSilentFallback.startLine}–${bugSilentFallback.endLine}\n${bugSilentFallback.snippet}\n\`\`\`\n\n`;
}
if (bugSourceNull) {
  out += `- **Gắn cờ ${bt('source_master_syllabus: txtData !== null')}**:\n`;
  out += `\`\`\`javascript\n// scripts/generate_week_blueprint.mjs:L${bugSourceNull.startLine}–${bugSourceNull.endLine}\n${bugSourceNull.snippet}\n\`\`\`\n\n`;
}
if (bugIsFullMock) {
  out += `- **Gắn ${bt('isFullMock: true')} trực tiếp lên tuần nội dung**: bộ \`blueprint.json\` production hiện tại có ${prodMockRemoved.length} tuần bội số 4 mang ${bt('isFullMock: true')} từ quy tắc Round 64 cũ; còn \`scripts/generate_week_blueprint.mjs\` hiện hành đọc trực tiếp cờ ${bt('★ FULL MOCK')} từ Digital Map lên tuần nội dung thay vì tách slot xen kẽ:\n`;
  out += `\`\`\`javascript\n// scripts/generate_week_blueprint.mjs:L${bugIsFullMock.startLine}–${bugIsFullMock.endLine}\n${bugIsFullMock.snippet}\n\`\`\`\n\n`;
}

out += '### C.7.2. NHÓM TÁCH RIÊNG: `isFullMock` SẼ BỎ (DO TÁCH MOCK SANG SLOT XEN KẼ M01–M34)\n\n';
out += `- Tổng số blueprint production đang mang \`isFullMock: true\` (cần gỡ bỏ về \`false\`, chuyển mock ra slot xen kẽ): **${prodMockRemoved.length} / ${prodWeeksScanned} tuần**\n`;
out += `- (Lưu ý: các tuần này đồng thời chuyển \`week_type\` từ \`full_mock\` về loại tuần nội dung tương ứng: \`rotary_practice\` / \`graduation_showcase\` / \`review_consolidation\`).\n\n`;
out += '| Tuần | Theme Hiện Tại | `isFullMock` (Cũ -> Mới) | `week_type` (Cũ -> Mới) | Nguyên Nhân Tách Riêng |\n';
out += '| :---: | :--- | :---: | :---: | :--- |\n';
for (const m of prodMockRemoved) {
  out += `| **W${m.week}** | ${escPipe(m.oldTheme)} | \`true\` -> \`false\` | \`${m.oldWeekType}\` -> \`${m.newWeekType}\` | ${escPipe(m.reason)} |\n`;
}

out += '\n### C.7.3. KHÁC BIỆT THỰC CHẤT SAU LỌC NHIỄU ĐỊNH DẠNG — PRODUCTION BLUEPRINTS (`src/data/weeks/week_1..156`)\n\n';
out += `- Tổng số tuần có ít nhất 1 khác biệt thực chất (ngoài nhóm \`isFullMock\` đã tách ở C.7.2): **${prodContentDiffWeeks.length} / ${prodWeeksScanned} tuần**\n`;
out += `- Thống kê theo trường:\n`;
for (const [f, cnt] of Object.entries(prodFieldStats)) {
  out += `  - **${f}**: ${cnt} tuần\n`;
}
out += '\n| Tuần | Trường Lệch | Giá Trị Cũ (`prod blueprint.json`) | Giá Trị Mới (Part II Dry-Run) | Nguyên Nhân Thật |\n';
out += '| :---: | :--- | :--- | :--- | :--- |\n';
for (const item of prodContentDiffWeeks) {
  for (const d of item.diffs) {
    out += `| **W${item.week}** | \`${d.field}\` | ${escPipe(String(d.oldVal ?? '(null)'))} | ${escPipe(String(d.newVal ?? '(null — SUPPLEMENT)'))} | ${escPipe(d.cause)} |\n`;
  }
}

out += '\n### C.7.4. DIFF RIÊNG CÁC STAGED BLUEPRINTS HIỆN CÓ (`docs/agent_artifacts/staging/week_*/blueprint.json`)\n\n';
out += `- Tổng số thư mục staged có \`blueprint.json\`: **${stagingDiffSummary.length}** (trong đó **${stagingMockRemoved.length}** thư mục \`_mock\` mang \`isFullMock: true\` thuộc nhóm tách Mock xen kẽ)\n\n`;
out += '| Staged Dir | Tuần | Trường Lệch (hoặc `isFullMock`) | Staged Hiện Tại | Part II Dry-Run | Nguyên Nhân |\n';
out += '| :--- | :---: | :--- | :--- | :--- | :--- |\n';
for (const stg of stagingDiffSummary) {
  const mk = stagingMockRemoved.find(x => x.dir === stg.dir);
  if (mk) {
    out += `| \`${stg.dir}\` | W${stg.week} | \`isFullMock\` (nhóm tách riêng) | \`true\` (\`${mk.oldWeekType}\`) | \`false\` (\`${mk.newWeekType}\`) | ${escPipe(mk.reason)} |\n`;
  }
  for (const d of stg.diffs) {
    out += `| \`${stg.dir}\` | W${stg.week} | \`${d.field}\` | ${escPipe(String(d.oldVal ?? '(null)'))} | ${escPipe(String(d.newVal ?? '(null)'))} | ${escPipe(d.cause)} |\n`;
  }
}

out += '\n### C.8. BẢNG ĐẦY ĐỦ W113–W156 (44 TUẦN): REPO ĐANG THEO PART I HAY PART II & CẦN SỬA GÌ\n\n';
out += `- Số tuần kiểm tra: **${w113To156Rows.length} tuần** (W113–W156)\n`;
out += '- Dòng Part I tham chiếu trong Source B (`docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt`): ';
out += partIMap.filter(x => x.end >= 113).map(x => `L${x.lineNum} (W${x.start}–${x.end})`).join('; ') + '\n\n';

out += '| Tuần | Repo Đang Theo Part I Hay Part II | Dòng Source B Part II | Cần Sửa Gì (Blueprint / Digital Map / Staged / Content) |\n';
out += '| :---: | :--- | :--- | :--- |\n';
for (const r of w113To156Rows) {
  out += `| **W${r.week}** | ${escPipe(r.repoStatus)} | ${escPipe(r.sbLineRef)} | ${escPipe(r.fixNeeded)} |\n`;
}

fs.writeFileSync(OUT_REPORT, out, 'utf8');
console.log(`✓ Generated ${Object.keys(tempBlueprints).length} temp blueprints in ${path.relative(ROOT_DIR, OUT_TEMP_DIR)}/`);
console.log(`✓ Saved ${path.relative(ROOT_DIR, OUT_REPORT)} (${out.split('\n').length} lines)`);
console.log(`  - isFullMock removed group: ${prodMockRemoved.length} weeks`);
console.log(`  - Meaningful content diff weeks: ${prodContentDiffWeeks.length} weeks`);
console.log(`  - W113-W156 audit rows: ${w113To156Rows.length}`);
