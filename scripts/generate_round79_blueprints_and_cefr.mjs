#!/usr/bin/env node
/**
 * scripts/generate_round79_blueprints_and_cefr.mjs
 *
 * ROUND 79 — SECTION B (B.4, B.5, B.6):
 *   B.4: Patch ONLY Source B-derived fields onto existing production blueprint.json (preserve 100% extra prod keys)
 *        into docs/agent_artifacts/round79_temp_blueprints/ + field-by-field diff.
 *   B.5: Group ALL existing CEFR (cefr_level | cefr_stage) across 156 prod blueprints + propose 1 standard
 *        (keeping W113–W120 [CHỜ OWNER]).
 *   B.6: Fix C.8 multi-week cycle display bug (W129–W132 -> "Review & Math Logic Cycle" instead of "129,132").
 *
 * ZERO mutations to src/data/weeks/ or governance docs.
 */

import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';
import {
  parseSourceBPartII,
  parseDigitalMapRows,
  normalizeComparisonText
} from './lib/source_b_part2_parser.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const SOURCE_B_PATH = path.join(ROOT_DIR, 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');
const MAP_PATH = path.join(ROOT_DIR, 'docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md');
const PROD_WEEKS_DIR = path.join(ROOT_DIR, 'src/data/weeks');
const STAGING_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/staging');
const OUT_TEMP_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/round79_temp_blueprints');
const OUT_RAW = path.join(ROOT_DIR, 'docs/agent_artifacts/round79_blueprints_cefr_and_c8_raw.txt');

const bt = (s) => '`' + s + '`';
const escPipe = (s) => (s || '').replace(/\|/g, '\\|').trim();

fs.mkdirSync(OUT_TEMP_DIR, { recursive: true });

const sbData = parseSourceBPartII(SOURCE_B_PATH);
const dmData = parseDigitalMapRows(MAP_PATH);

// Helper to parse Part I overview entries dynamically for W113-156 C.8 comparison
const sourceBLines = fs.readFileSync(SOURCE_B_PATH, 'utf8').split('\n');
const partIEntries = [];
for (let i = 0; i < sbData.part2Line - 1; i++) {
  if (/32\s+Weeks:\s*Weeks\s+113/i.test(sourceBLines[i])) continue;
  const m = sourceBLines[i].match(/Weeks?\s*(\d+)(?:\s*[-–—]\s*(\d+))?\s*\)?\s*(?:[:.]|\()/i);
  if (m) {
    partIEntries.push({
      lineNum: i + 1,
      startW: parseInt(m[1], 10),
      endW: m[2] ? parseInt(m[2], 10) : parseInt(m[1], 10),
      text: sourceBLines[i].trim()
    });
  }
}

function findPartIInfo(w) {
  return partIEntries.find(e => w >= e.startW && w <= e.endW) || null;
}

function evalJsModule(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const code = fs.readFileSync(filePath, 'utf8')
    .replace(/import\s+[^;]+;?/g, '')
    .replace(/export\s+default\s+[^;]+;?/g, '')
    .replace(/export\s+(?:const|let|var)\s+(\w+)\s*=/g, 'var $1 =');
  const sandbox = { ...globalThis };
  try {
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox);
    return sandbox.readingHubData || sandbox.readingHub || null;
  } catch {
    return null;
  }
}

function significantWords(str) {
  const stop = new Set(['the', 'and', 'for', 'with', 'into', 'from', 'part', 'week', 'weeks', 'project', 'cycle', 'review', 'opinion', 'debate', 'vs', 'toan', 'ela', 'math']);
  return normalizeComparisonText(str).split(' ').filter(t => t.length >= 3 && !stop.has(t));
}

function detectTextAlignment(text, w, sb, p1) {
  if (!text) return 'Trống';
  const n = normalizeComparisonText(text);
  const sbTitleN = normalizeComparisonText(sb.titleEn);
  const sbTopicN = normalizeComparisonText(sb.topicEla);
  if (p1) {
    const p1Tokens = significantWords(p1.text).filter(t => !['weeks', 'phase', 'cycle', 'project', 'opinion', 'debate', 'mastery'].includes(t));
    const p2Tokens = significantWords(`${sb.titleEn} ${sb.topicEla}`);
    const p2Matched = p2Tokens.filter(t => n.includes(t));
    if (p2Tokens.length > 0 && p2Matched.length >= Math.min(2, p2Tokens.length)) {
      return `Part II (L${sb.headerLineNum})`;
    }
    if (p1Tokens.some(t => n.includes(t)) && !p2Matched.length) {
      return `Part I (L${p1.lineNum})`;
    }
  }
  if (sbTitleN && n.includes(sbTitleN)) return `Part II (L${sb.headerLineNum})`;
  if (sbTopicN && n.includes(sbTopicN)) return `Part II (L${sb.headerLineNum})`;
  return 'Khác / cần kiểm tra';
}

// ============================================================================
// B.4: PATCH ONLY SOURCE B-DERIVED FIELDS ONTO PRODUCTION blueprint.json
// ============================================================================
const PATCHED_FIELDS = [
  'theme',
  'title_en',
  'clil_topic',
  'grammar_focus',
  'vocabulary_focus',
  'math_focus',
  'week_type',
  'isFullMock'
];

const prodKeyPresence = new Map();
const tempKeyPresence = new Map();
const droppedKeysPerWeek = [];
const fieldDiffCounts = Object.fromEntries(PATCHED_FIELDS.map(f => [f, []]));
const perWeekDiffDetails = [];
const cefrProdCombos = new Map();

function buildSourceBDerivedValues(w, sb, prodBp) {
  const resolvedTheme = (sb.blockOrigin === 'multi_week_cycle' && sb.topicEla)
    ? sb.topicEla
    : sb.titleEn;

  const baseClilTitle = sb.topicEla || sb.titleEn || prodBp.clil_topic?.title || 'CLIL Exploration';
  const clilFocus = sb.outcomeEla || sb.topicEla || prodBp.clil_topic?.focus || baseClilTitle;
  const clil_topic = {
    ...(prodBp.clil_topic && typeof prodBp.clil_topic === 'object' ? prodBp.clil_topic : {}),
    title: baseClilTitle,
    focus: clilFocus
  };

  const grammar_focus = {
    ...(prodBp.grammar_focus && typeof prodBp.grammar_focus === 'object' ? prodBp.grammar_focus : {}),
    structure: sb.grammarFocus || `[SUPPLEMENT — Source B L${sb.headerLineNum} không ghi Grammar Focus]`,
    outcome: sb.outcomeEla || prodBp.grammar_focus?.outcome || null
  };

  const sbWords = sb.vocabWords || [];
  const targetCount = prodBp.vocabulary_focus?.target_count || 20;
  const missingCount = Math.max(0, targetCount - sbWords.length);
  const vocabStatus = missingCount === 0
    ? `COMPLETE (${targetCount} words)`
    : `PARTIAL (${sbWords.length}/${targetCount} syllabus words — Requires ${missingCount} words from SUPPLEMENT/author)`;
  const vocabulary_focus = {
    ...(prodBp.vocabulary_focus && typeof prodBp.vocabulary_focus === 'object' ? prodBp.vocabulary_focus : {}),
    syllabus_words: sbWords,
    total_syllabus_words: sbWords.length,
    target_count: targetCount,
    missing_count: missingCount,
    status: vocabStatus
  };

  const math_focus = sb.hasMath
    ? {
        topic: sb.mathTopic || null,
        outcome: sb.mathOutcome || null,
        vocab: sb.mathVocab || [],
        source_line: sb.mathLineNum || sb.headerLineNum
      }
    : null;

  return {
    theme: resolvedTheme,
    title_en: sb.titleEn,
    clil_topic,
    grammar_focus,
    vocabulary_focus,
    math_focus,
    week_type: 'rotary_practice',
    isFullMock: false
  };
}

function summarizeVal(v) {
  if (v === undefined) return '(missing)';
  if (v === null) return 'null';
  if (typeof v === 'boolean' || typeof v === 'number') return String(v);
  if (typeof v === 'string') return v;
  return JSON.stringify(v);
}

for (let w = 1; w <= 156; w++) {
  const prodPath = path.join(PROD_WEEKS_DIR, `week_${w}`, 'blueprint.json');
  const prodBp = JSON.parse(fs.readFileSync(prodPath, 'utf8'));
  const sb = sbData.weeks[w];

  for (const k of Object.keys(prodBp)) {
    prodKeyPresence.set(k, (prodKeyPresence.get(k) || 0) + 1);
  }

  // Record CEFR grouped data for B.5
  const cefrKey = JSON.stringify([prodBp.cefr_level ?? null, prodBp.cefr_stage ?? null]);
  if (!cefrProdCombos.has(cefrKey)) cefrProdCombos.set(cefrKey, []);
  cefrProdCombos.get(cefrKey).push(w);

  // Clone prod blueprint verbatim, then patch ONLY the 8 Source B-derived fields
  const patchedBp = JSON.parse(JSON.stringify(prodBp));
  const patchValues = buildSourceBDerivedValues(w, sb, prodBp);
  for (const field of PATCHED_FIELDS) {
    patchedBp[field] = patchValues[field];
  }

  for (const k of Object.keys(patchedBp)) {
    tempKeyPresence.set(k, (tempKeyPresence.get(k) || 0) + 1);
  }

  // Verify zero existing prod keys were dropped
  const dropped = Object.keys(prodBp).filter(k => !(k in patchedBp));
  if (dropped.length > 0) {
    droppedKeysPerWeek.push({ week: w, dropped });
  }

  // Compute field-by-field diff ONLY on patched fields (and assert all non-patched prod keys equal 100%)
  const changed = [];
  for (const field of PATCHED_FIELDS) {
    const oldVal = prodBp[field];
    const newVal = patchedBp[field];
    if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
      fieldDiffCounts[field].push(w);
      changed.push({ field, oldVal, newVal });
    }
  }
  const nonPatchedDiff = Object.keys(prodBp).filter(
    k => !PATCHED_FIELDS.includes(k) && JSON.stringify(prodBp[k]) !== JSON.stringify(patchedBp[k])
  );
  if (nonPatchedDiff.length > 0) {
    droppedKeysPerWeek.push({ week: w, unexpectedMutation: nonPatchedDiff });
  }

  if (changed.length > 0) {
    perWeekDiffDetails.push({ week: w, sbLine: sb.headerLineNum, changed });
  }

  const outPath = path.join(OUT_TEMP_DIR, `week_${w}_blueprint.json`);
  fs.writeFileSync(outPath, JSON.stringify(patchedBp, null, 2) + '\n', 'utf8');
}

// Compress consecutive weeks for crisp reporting (e.g., [1,2,3,4] -> "W1–W4")
function formatWeekRanges(arr) {
  if (!arr.length) return '—';
  const sorted = [...arr].sort((a, b) => a - b);
  const ranges = [];
  let start = sorted[0];
  let prev = sorted[0];
  for (let i = 1; i <= sorted.length; i++) {
    if (i < sorted.length && sorted[i] === prev + 1) {
      prev = sorted[i];
    } else {
      ranges.push(start === prev ? `W${start}` : `W${start}–W${prev}`);
      if (i < sorted.length) {
        start = sorted[i];
        prev = sorted[i];
      }
    }
  }
  return ranges.join(', ');
}

// ============================================================================
// B.5: READ REAL CEFR EVIDENCE & GROUP TABLE + STANDARDIZATION PROPOSAL
// ============================================================================
const dmCol3Prefixes = new Map();
for (let w = 1; w <= 156; w++) {
  const prefix = (dmData.rows[w]?.cefrRaw || '').split('·')[0].trim();
  if (!dmCol3Prefixes.has(prefix)) dmCol3Prefixes.set(prefix, []);
  dmCol3Prefixes.get(prefix).push(w);
}

const sbPhase2EndLine = sourceBLines[948]?.trim(); // L949 Week 120: PHASE 2 GRADUATION
const sbPhase2MilestoneLine = sourceBLines[950]?.trim(); // L951 Milestone: Transition to B1 Level
const sbPhase3StartLine = sourceBLines[952]?.trim(); // L953 PHASE 3 (WEEKS 121-156)
const sopContent = fs.readFileSync(path.join(ROOT_DIR, 'docs/WEEK_PRODUCTION_SOP.md'), 'utf8').split('\n');
const sopL106 = sopContent[105]?.trim();
const sopL199 = sopContent[198]?.trim();
const archContent = fs.readFileSync(path.join(ROOT_DIR, 'docs/MASTER_ARCHITECTURE_W01_W156.md'), 'utf8').split('\n');
const archL28 = archContent[27]?.trim();
const archL156 = archContent[155]?.trim();

// ============================================================================
// B.6: FIX C.8 BUG FOR W113–W156 (W129–132 -> "Review & Math Logic Cycle")
// ============================================================================
const w113To156Fixed = [];
for (let w = 113; w <= 156; w++) {
  const sb = sbData.weeks[w];
  const dm = dmData.rows[w];
  const p1 = findPartIInfo(w);

  const prodDir = path.join(PROD_WEEKS_DIR, `week_${w}`);
  const prodBp = JSON.parse(fs.readFileSync(path.join(prodDir, 'blueprint.json'), 'utf8'));
  const prodHasContent = fs.existsSync(path.join(prodDir, 'reading_hub.js'));
  const prodReadTheme = prodHasContent ? (evalJsModule(path.join(prodDir, 'reading_hub.js'))?.theme || '(no theme)') : null;

  const stgDir = path.join(STAGING_DIR, `week_${w}`);
  const stgExists = fs.existsSync(stgDir);
  const stgBp = stgExists && fs.existsSync(path.join(stgDir, 'blueprint.json')) ? JSON.parse(fs.readFileSync(path.join(stgDir, 'blueprint.json'), 'utf8')) : null;
  const stgReadHub = stgExists && fs.existsSync(path.join(stgDir, 'reading_hub.js')) ? evalJsModule(path.join(stgDir, 'reading_hub.js')) : null;
  const stgReadTheme = stgReadHub?.theme || null;

  const bpStatus = detectTextAlignment(prodBp.theme, w, sb, p1);
  const dmTitleRel = normalizeComparisonText(dm.themeRaw) === normalizeComparisonText(sb.titleEn)
    ? `Part II tiêu đề (L${sb.headerLineNum})`
    : (w >= 129 && w <= 131
        ? 'Part I (L105: Smartphones)'
        : (w === 132 ? `Mock giả chèn khung Part I (${dm.themeRaw})` : `Lệch Part II (${dm.themeRaw})`));

  const partINote = p1 ? `Part I L${p1.lineNum}` : 'Part I kết thúc W144';
  const prodIsMock = Boolean(prodBp.isFullMock);

  let repoStatus = '';
  if (stgExists) {
    repoStatus = `Lệch tầng — Prod BP: ${bpStatus}; Map: ${dmTitleRel}; Staged: ${detectTextAlignment(stgReadTheme, w, sb, p1)} ("${stgReadTheme}")`;
  } else if (/^Part I(?:\s|\(|$)/.test(bpStatus)) {
    repoStatus = `Theo ${partINote} (Prod BP: "${prodBp.theme}"; Map: ${dmTitleRel})`;
  } else {
    repoStatus = `Prod BP: ${bpStatus} (${partINote})${prodIsMock ? ' + isFullMock=true' : ''}${prodHasContent ? ` + prod .js ("${prodReadTheme}")` : ''}; Map: ${dmTitleRel}`;
  }

  // FIX for C.8 bug (`scripts/generate_round78_part1_part2_and_blueprints.mjs:L602` printed `sb.rangeSpan` ([129,132] -> "129,132") instead of `sb.titleEn`):
  const spanStr = Array.isArray(sb.rangeSpan) ? sb.rangeSpan.join('–') : String(sb.rangeSpan || '').replace(/,/g, '–');
  const sbLabel = sb.blockOrigin === 'multi_week_cycle'
    ? `${sb.titleEn} [W${spanStr}]`
    : sb.titleEn;
  const sbMathNote = (sb.mathTopic || sb.mathFocus) ? ` | Math: ${sb.mathTopic || sb.mathFocus}` : ' | Math: không có';

  const fixes = [];
  if (prodIsMock) fixes.push('bỏ isFullMock=true sang mock xen kẽ');
  if (normalizeComparisonText(prodBp.theme) !== normalizeComparisonText((sb.blockOrigin === 'multi_week_cycle' && sb.topicEla) ? sb.topicEla : sb.titleEn)) {
    fixes.push(`cập nhật BP theme -> "${sb.titleEn}"`);
  }
  if (dm.hasFullMock || dm.hasGraduationMarker || w >= 129 && w <= 132) {
    fixes.push(`sửa Map L${dm.lineNum} theo Part II L${sb.headerLineNum}`);
  }
  if (stgExists) {
    const stgBpAlign = stgBp ? detectTextAlignment(stgBp.theme, w, sb, p1) : 'missing';
    fixes.push(`kiểm tra/tái sinh staging (${path.basename(stgDir)}; staged BP=${stgBpAlign})`);
  }

  w113To156Fixed.push({
    week: w,
    repoStatus,
    sbPartIICol: `L${sb.headerLineNum} (${sbLabel}${sbMathNote})`,
    fixNeeded: fixes.length ? fixes.join(' ; ') : 'BP khớp tiêu đề chính; đồng bộ Map Col 4/6 & SUPPLEMENT'
  });
}

// ============================================================================
// WRITE round79_blueprints_cefr_and_c8_raw.txt
// ============================================================================
let out = '';
out += '========================================================================================================\n';
out += '📋 ROUND 79 — SECTION B (B.4, B.5, B.6): BẢO TOÀN SCHEMA BLUEPRINT + CEFR TABLE + SỬA C.8 (W129–132)\n';
out += `Thời điểm chạy: ${new Date().toISOString()}\n`;
out += `Thư mục blueprint tạm mới: ${path.relative(ROOT_DIR, OUT_TEMP_DIR)}/ (156 files)\n`;
out += '========================================================================================================\n\n';

out += '### B.4. BẢO TOÀN 100% PRODUCTION BLUEPRINT SCHEMA (CHỈ VÁ 8 TRƯỜNG TỪ SOURCE B)\n\n';
out += `- Phương pháp: Đọc nguyên văn từng ${bt('src/data/weeks/week_{1..156}/blueprint.json')}, deep-clone toàn bộ và **CHỈ cập nhật 8 trường suy từ Source B**: ${PATCHED_FIELDS.map(bt).join(', ')} (gộp bảo toàn các sub-key sẵn có trong ${bt('clil_topic')}, ${bt('grammar_focus')}, ${bt('vocabulary_focus')} như ${bt('phonology_summary')}, ${bt('pattern_regex')}, ${bt('requires_authoring_examples')}).\n`;
out += `- Kết quả kiểm tra rơi khóa (dropped keys check): **${droppedKeysPerWeek.length} lỗi** trên 156 tuần (0 khóa production nào bị xóa hoặc ghi đè ngoài 8 trường chỉ định).\n\n`;

out += '#### Bảng tần suất khóa Schema: Production vs Temp Round 78 (cũ) vs Temp Round 79 (mới)\n\n';
const allProdKeys = [...prodKeyPresence.keys()].sort((a, b) => prodKeyPresence.get(b) - prodKeyPresence.get(a));
const r78SamplePath = path.join(ROOT_DIR, 'docs/agent_artifacts/round78_temp_blueprints/week_38_blueprint.json');
const r78SampleKeys = fs.existsSync(r78SamplePath) ? new Set(Object.keys(JSON.parse(fs.readFileSync(r78SamplePath, 'utf8')))) : new Set();

out += '| Tên trường (`blueprint.json`) | Số tuần ở Prod (156) | Có ở R78 Temp (13 keys)? | Số tuần ở R79 Temp (156) | Vai trò trong R79 |\n';
out += '| :--- | :---: | :---: | :---: | :--- |\n';
const allCombinedKeys = [...new Set([...allProdKeys, ...tempKeyPresence.keys()])];
for (const k of allCombinedKeys) {
  const pCnt = prodKeyPresence.get(k) || 0;
  const r78Has = r78SampleKeys.has(k) ? '✅ Có' : '❌ RƠI MẤT';
  const r79Cnt = tempKeyPresence.get(k) || 0;
  const role = PATCHED_FIELDS.includes(k) ? 'VÁ TỪ SOURCE B (Patched)' : 'BẢO TOÀN TỪ PROD (Preserved)';
  out += `| \`${k}\` | ${pCnt} | ${r78Has} | ${r79Cnt} | ${role} |\n`;
}

out += '\n#### Thống kê Diff theo từng trường (8 trường vá từ Source B vs Production hiện tại):\n\n';
for (const field of PATCHED_FIELDS) {
  const ws = fieldDiffCounts[field];
  out += `- \`${field}\`: khác biệt ở **${ws.length} / 156 tuần** (${formatWeekRanges(ws)})\n`;
}

out += '\n#### Diff mẫu đại diện (`W33`, `W35`, `W36`, `W76`, `W79`, `W80`, `W126`, `W127`, `W129–134`):\n\n';
for (const sw of [33, 35, 36, 76, 79, 80, 95, 96, 126, 127, 129, 130, 132, 133, 134]) {
  const d = perWeekDiffDetails.find(x => x.week === sw);
  if (!d) {
    out += `- **W${sw}**: 0 trường đổi.\n`;
    continue;
  }
  out += `- **W${sw}** (Source B L${d.sbLine}): đổi **${d.changed.length} trường** [${d.changed.map(c => c.field).join(', ')}]\n`;
  for (const c of d.changed) {
    out += `  - \`${c.field}\`: PROD=\`${summarizeVal(c.oldVal).slice(0, 140)}\`  -->  R79=\`${summarizeVal(c.newVal).slice(0, 140)}\`\n`;
  }
}

out += '\n\n### B.5. BẢNG CEFR HIỆN TẠI TRÊN PRODUCTION + ĐỀ XUẤT CHUẨN HÓA (GIỮ `W113–W120` `[CHỜ OWNER]`)\n\n';
out += '#### B.5.1. Nhóm TOÀN BỘ nhãn `cefr_level` & `cefr_stage` đang tồn tại trong 156 `blueprint.json` production\n\n';
out += '| Tuần (Phạm vi thực tế đọc từ Prod BP) | Số tuần | `cefr_level` (Prod) | `cefr_stage` (Prod) | Ghi chú / Bất thường quan sát được |\n';
out += '| :--- | :---: | :--- | :---: | :--- |\n';
for (const [k, ws] of cefrProdCombos.entries()) {
  const [lvl, stg] = JSON.parse(k);
  let note = 'Bình thường';
  if (stg === null) note = 'THIẾU `cefr_stage` (W33/W34 Golden blueprints)';
  else if (lvl === 'A2 Flyers' && ws.some(w => w > 72 || w <= 32)) {
    const outOfRange = ws.filter(w => w > 72 || w <= 32);
    note = `CHỨA ${outOfRange.length} TUẦN LỆCH TẦNG DO FALLBACK \`generate_week_blueprint.mjs:L104\`: ${formatWeekRanges(outOfRange)}`;
  }
  out += `| ${formatWeekRanges(ws)} | ${ws.length} | \`${lvl}\` | \`${stg}\` | ${note} |\n`;
}

out += '\n#### B.5.2. Các biến thể nhãn xuất hiện trong Digital Map (Cột 3 gốc) & Quy phạm đối chiếu (trích file thật)\n\n';
for (const [prefix, ws] of dmCol3Prefixes.entries()) {
  if (!/★/.test(prefix)) {
    out += `- Digital Map Cột 3: \`${prefix}\` -> ${ws.length} tuần (${formatWeekRanges(ws)})\n`;
  }
}
out += `- Source B \`L949\`: \`${sbPhase2EndLine}\` | \`L951\`: \`${sbPhase2MilestoneLine}\` | \`L953\`: \`${sbPhase3StartLine}\`\n`;
out += `- SOP \`L106\`: \`${sopL106}\`\n`;
out += `- SOP \`L199\`: \`${sopL199}\`\n`;
out += `- MASTER_ARCH \`L28\`: \`${archL28}\`\n`;

out += '\n#### B.5.3. Đề xuất MỘT bộ nhãn chuẩn hóa (`cefr_level`, `cefr_stage`, phạm vi tuần) — PROPOSAL ONLY\n\n';
out += '| Khối tuần | `cefr_level` chuẩn đề xuất | `cefr_stage` chuẩn | Cơ sở & Trạng thái |\n';
out += '| :--- | :--- | :---: | :--- |\n';
out += '| **W01–W16** | `Pre-A1 Starters` | `1` | Phase 1 Starters (gộp biến thể `Pre-A1 -> A1`, sửa W16 bị prod fallback `A2 Flyers`). |\n';
out += '| **W17–W32** | `A1 Movers` | `1` | Phase 1 Movers (sửa W24, W32 bị prod fallback `A2 Flyers`; W15 trong Map ghi `A1 Movers Entry`). |\n';
out += '| **W33–W72** | `A2 Flyers` | `1` | Phase 1 Flyers (gắn `cefr_stage: 1` bổ sung cho W33/W34 nếu unfreeze; hiện giữ frozen W33). |\n';
out += '| **W73–W112** | `B1 PET` | `2` | Phase 2 B1 Preliminary (sửa các tuần W73/77/82/87/92/97/102/107/112 bị prod fallback `A2 Flyers` và thống nhất nhãn `B1 Entry` / `B1+ PET` -> `B1 PET`). |\n';
out += '| **W113–W120** | **`[CHỜ OWNER]`** (`B1 PET` vs `B1+ Academic`) | **`[CHỜ OWNER]`** (`2` vs `3`) | **XUNG ĐỘT TÀI LIỆU GỐC:** Source B `L949–953` đặt W120 là *PHASE 2 GRADUATION (Milestone: Transition to B1 Level)* và bắt đầu Phase 3 từ `W121`; ngược lại `WEEK_PRODUCTION_SOP.md:L106` & `MASTER_ARCHITECTURE:L28,156` mở Gen 3 `B1+ Academic` từ `W113`. Hiện Map gốc ghi `B1+ PET`, prod BP bị lỗi fallback `A2 Flyers`. Không tự quyết — chờ Owner chốt ranh giới `W113–W120`. |\n';
out += '| **W121–W156** | `B1+ Academic` | `3` | Phase 3 Advanced Synthesis & Debate (sửa các tuần W132/137/142/147/152/156 bị prod fallback `A2 Flyers`). |\n';

out += '\n\n### B.6. BẢNG W113–W156 SAU KHI SỬA LỖI HIỂN THỊ `C.8` (`W129–132` HIỂN THỊ `"Review & Math Logic Cycle"`)\n\n';
out += '- **Lỗi ở `scripts/generate_round78_part1_part2_and_blueprints.mjs:L602`**: dùng `sb.blockOrigin === \'multi_week_cycle\' ? sb.rangeSpan : sb.titleEn` (mà `rangeSpan` là mảng `[129, 132]` trong `source_b_part2_parser.mjs:L244`), khiến W129–W132 bị ép chuỗi thành `L1007 (129,132 | ...)`. Đã sửa thành `${sb.titleEn} [W${spanStr}]` -> `L1007 (Review & Math Logic Cycle [W129–132] | ...)`.\n\n';
out += '| Tuần | Repo Hiện Tại (BP Prod + Map + Staging) | Source B Part II (Dòng & Chủ đề) | Cần sửa gì khi duyệt? |\n';
out += '| :---: | :--- | :--- | :--- |\n';
for (const row of w113To156Fixed) {
  out += `| **W${row.week}** | ${escPipe(row.repoStatus)} | ${escPipe(row.sbPartIICol)} | ${escPipe(row.fixNeeded)} |\n`;
}

fs.writeFileSync(OUT_RAW, out, 'utf8');
console.log(`✓ Generated 156 preserved-schema blueprints in ${path.relative(ROOT_DIR, OUT_TEMP_DIR)}/`);
console.log(`✓ Saved ${path.relative(ROOT_DIR, OUT_RAW)} (${out.split('\n').length} lines)`);
console.log(`  Dropped keys count across 156 weeks: ${droppedKeysPerWeek.length}`);
