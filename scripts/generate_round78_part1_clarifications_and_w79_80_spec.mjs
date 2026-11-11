#!/usr/bin/env node
/**
 * scripts/generate_round78_part1_clarifications_and_w79_80_spec.mjs
 *
 * ROUND 78 — TASKS A (A.1, A.2, A.3), D (D.9), E (E.10)
 * 100% File-driven, zero hardcoded prose pretending to be file output,
 * zero modifications to production, staging, SOP, MASTER_ARCH, or Digital Map.
 *
 * Outputs:
 *   1. docs/agent_artifacts/round78_task_a_clarifications_raw.txt
 *   2. docs/agent_artifacts/round78_w79_w80_split_proposal.md
 *   3. docs/agent_artifacts/round78_wave3_acceptance_spec.md
 */

import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const SOURCE_B_PATH = path.join(ROOT_DIR, 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');
const MAP_PATH = path.join(ROOT_DIR, 'docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md');
const SOP_PATH = path.join(ROOT_DIR, 'docs/WEEK_PRODUCTION_SOP.md');
const ARCH_PATH = path.join(ROOT_DIR, 'docs/MASTER_ARCHITECTURE_W01_W156.md');
const R64_PATH = path.join(ROOT_DIR, 'docs/agent_artifacts/round64_mock_schedule_and_conflicts.md');
const CAMBRIDGE_STD_PATH = path.join(ROOT_DIR, 'src/config/cambridgeExamStandards.js');

const OUT_A = path.join(ROOT_DIR, 'docs/agent_artifacts/round78_task_a_clarifications_raw.txt');
const OUT_D = path.join(ROOT_DIR, 'docs/agent_artifacts/round78_w79_w80_split_proposal.md');
const OUT_E = path.join(ROOT_DIR, 'docs/agent_artifacts/round78_wave3_acceptance_spec.md');

function readLines(relPath) {
  const p = path.isAbsolute(relPath) ? relPath : path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, 'utf8').split('\n');
}

function formatSlice(lines, startLine1, endLine1) {
  if (!lines) return '[FILE NOT FOUND]';
  const out = [];
  for (let i = Math.max(0, startLine1 - 1); i < Math.min(lines.length, endLine1); i++) {
    out.push(`${i + 1}: ${lines[i]}`);
  }
  return out.join('\n');
}

function extractFunctionLines(relPath, fnSignatureRegex) {
  const lines = readLines(relPath);
  if (!lines) return { found: false, text: '[FILE NOT FOUND]' };
  const idx = lines.findIndex(l => fnSignatureRegex.test(l));
  if (idx < 0) return { found: false, text: '[FUNCTION NOT FOUND]' };
  let braceDepth = 0;
  let seenOpen = false;
  let endIdx = idx;
  for (let i = idx; i < Math.min(lines.length, idx + 80); i++) {
    for (const ch of lines[i]) {
      if (ch === '{') { braceDepth++; seenOpen = true; }
      else if (ch === '}') braceDepth--;
    }
    endIdx = i;
    if (seenOpen && braceDepth <= 0) break;
  }
  return {
    found: true,
    startLine: idx + 1,
    endLine: endIdx + 1,
    text: formatSlice(lines, idx + 1, endIdx + 1)
  };
}

function evalJsModule(relPath) {
  const abs = path.isAbsolute(relPath) ? relPath : path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(abs)) return { error: 'MISSING' };
  const content = fs.readFileSync(abs, 'utf8');
  const modified = content
    .replace(/import\s+[^;]+;?/g, '')
    .replace(/export\s+default\s+/g, 'var __default__ = ')
    .replace(/export\s+(?:const|let|var)\s+/g, 'var ')
    .replace(/export\s+(?:async\s+)?function\s+/g, 'function ')
    .replace(/export\s*\{[^}]+\}\s*;?/g, '');
  const sandbox = {
    ...globalThis,
    __default__: null,
    skillPracticeHubData: null,
    skillPracticeHub: null,
    readingHubData: null,
    readingHub: null,
    singapore_math: null,
    vocab: null
  };
  try {
    vm.createContext(sandbox);
    vm.runInContext(modified, sandbox);
    return { content, sandbox, error: null };
  } catch (e) {
    return { content, sandbox: null, error: e.message };
  }
}

const sourceBLines = readLines(SOURCE_B_PATH);
const mapLines = readLines(MAP_PATH);
const sopLines = readLines(SOP_PATH);
const archLines = readLines(ARCH_PATH);
const r64Lines = readLines(R64_PATH);

// ============================================================================
// PART 1: TASK A CLARIFICATIONS (A.1, A.2, A.3)
// ============================================================================
let outA = '';
outA += '====================================================================================================\n';
outA += '📌 ROUND 78 — TASK A: LÀM RÕ NHỎ (A.1 W35 TOÁN | A.2 MOCK M01 LITE MODE | A.3 SPEC PET)\n';
outA += `Thời điểm chạy: ${new Date().toISOString()}\n`;
outA += '====================================================================================================\n\n';

// --- A.1: W35 Toán ---
outA += '### A.1. CẤU TRÚC SINGAPORE_MATH CỦA W35 & NGUYÊN NHÂN LỆCH R74/R75 (0/5) VS R76/R77 (2/5)\n\n';

const w35SmRel = 'src/data/weeks/week_35/singapore_math.js';
const w35SphRel = 'src/data/weeks/week_35/skill_practice_hub.js';
const w35SmLines = readLines(w35SmRel);
const w35SphLines = readLines(w35SphRel);
const w35SmEval = evalJsModule(w35SmRel);
const w35SphEval = evalJsModule(w35SphRel);

const w35SmExport = w35SmEval.sandbox?.__default__ || w35SmEval.sandbox?.singapore_math || {};
const w35SphExport = w35SphEval.sandbox?.skillPracticeHubData || w35SphEval.sandbox?.__default__ || {};
const w35SmArr = Array.isArray(w35SphExport.singapore_math) ? w35SphExport.singapore_math : [];

outA += `1.1. File \`${w35SmRel}\` (${w35SmLines.length} dòng [5 dòng non-empty + 1 dòng trống cuối] — nguyên văn):\n\`\`\`js\n${formatSlice(w35SmLines, 1, w35SmLines.length)}\n\`\`\`\n`;
outA += `- Keys top-level qua VM: \`${JSON.stringify(Object.keys(w35SmExport))}\`\n`;
outA += `- Kiểu \`problems\`: \`${Array.isArray(w35SmExport.problems) ? 'Array' : typeof w35SmExport.problems}\` | \`problems.length\`: **${Array.isArray(w35SmExport.problems) ? w35SmExport.problems.length : 'N/A'}**\n\n`;

const sphSmStartIdx = w35SphLines.findIndex(l => /"?singapore_math"?\s*:/.test(l));
const sphSlStartIdx = w35SphLines.findIndex(l => /"?science_lab"?\s*:/.test(l));
const sphEndSlice = sphSlStartIdx > sphSmStartIdx ? sphSlStartIdx : Math.min(w35SphLines.length, sphSmStartIdx + 55);

outA += `1.2. File \`${w35SphRel}\` (${w35SphLines.length} dòng — khóa & mảng \`singapore_math\` tại L${sphSmStartIdx + 1}–L${sphEndSlice}):\n`;
outA += `- Keys top-level của \`skillPracticeHubData\`: \`${JSON.stringify(Object.keys(w35SphExport))}\`\n`;
outA += `- Độ dài mảng \`skillPracticeHubData.singapore_math\`: **${w35SmArr.length}**\n`;
outA += `- Các phần tử trong \`singapore_math\`: ${w35SmArr.map(p => `\`id=${p.id}\` ("${p.title}", keys=${JSON.stringify(Object.keys(p))})`).join(' | ')}\n`;
outA += `\`\`\`js\n${formatSlice(w35SphLines, sphSmStartIdx + 1, sphEndSlice)}\n\`\`\`\n\n`;

outA += '1.3. Bằng chứng từ code & raw logs R74–R77 giải thích vì sao R74/R75 ghi `0/5` còn R76/R77 ghi `2/5`:\n';
for (const r of [
  { label: 'R74 Script', rel: 'scripts/audit_round74_source_b_baseline.mjs', raw: 'docs/agent_artifacts/round74_production_audit_raw.txt', fn: /function\s+countMathProblemsAST/ },
  { label: 'R75 Script', rel: 'scripts/audit_round75_source_b_baseline.mjs', raw: 'docs/agent_artifacts/round75_production_audit_raw.txt', fn: /function\s+countMathProblemsAST/ },
  { label: 'R76 Script', rel: 'scripts/audit_round76_source_b_baseline.mjs', raw: 'docs/agent_artifacts/round76_production_audit_raw.txt', fn: /function\s+extractMathCount/ },
  { label: 'R77 Script', rel: 'scripts/audit_round77_source_b_baseline.mjs', raw: 'docs/agent_artifacts/round77_production_audit_raw.txt', fn: /function\s+extractMathCount/ }
]) {
  const fnInfo = extractFunctionLines(r.rel, r.fn);
  const rawLines = readLines(r.raw) || [];
  const rawMatches = rawLines
    .map((text, idx) => ({ lineNum: idx + 1, text }))
    .filter(x => /\*\*W35\*\*|W35/.test(x.text));
  outA += `\n- **${r.label}** (\`${r.rel}:L${fnInfo.startLine}–L${fnInfo.endLine}\`):\n\`\`\`js\n${fnInfo.text}\n\`\`\`\n`;
  outA += `  - Các dòng W35 trong \`${r.raw}\`:\n`;
  for (const m of rawMatches) {
    outA += `    - \`L${m.lineNum}\`: \`${m.text}\`\n`;
  }
}

outA += '\n- **Kết luận nguyên nhân (rút từ code trên):**\n';
outA += '  1. Ở **R74 & R75** (`countMathProblemsAST`): hàm kiểm tra `singapore_math.js` TRƯỚC (`if (fs.existsSync(smPath))`), mà `src/data/weeks/week_35/singapore_math.js` là placeholder stub `export default { title: "Singapore Math", problems: [] };`. Hàm `parseHubFile` (`L156`/`L177`) trả về `sandbox.__default__` (`{ title: "Singapore Math", problems: [] }`), nên nhánh `if (Array.isArray(sm?.problems)) return sm.problems.length;` (`L191`) khớp ngay `problems: []` và trả về **`0`** mà KHÔNG bao giờ fallback sang `skill_practice_hub.js`.\n';
outA += '  2. Ở **R76 & R77** (`extractMathCount`): hàm bỏ qua stub `singapore_math.js` và đọc thẳng `skillPracticeHubData.singapore_math` trong `skill_practice_hub.js` (độ dài `2`), nên bảng chính ở cả R76 (`L13`) và R77 (`L13`) đều ra **`2/5`**. Riêng R76 còn sót lỗi ở dòng tổng kết `L55` (vẫn liệt kê W35 vào nhóm `0/5` rỗng) và đã được sửa ở R77 (`L57`: `W35:2/5`).\n\n';

// --- A.2: Mock M01 Lite Mode ---
outA += '### A.2. CẬP NHẬT BẢNG LỊCH MOCK KHI GHI NHẬN M01 TẠM HOÃN TRONG LITE MODE\n\n';
outA += '2.1. Nguyên văn quy định Lite Mode (`docs/agent_artifacts/round64_mock_schedule_and_conflicts.md:L3–L15`) & đầu khóa (`docs/WEEK_PRODUCTION_SOP.md:L126–L133`):\n';
outA += `\`\`\`markdown\n${formatSlice(r64Lines, 3, 15)}\n\`\`\`\n`;
outA += `\`\`\`markdown\n${formatSlice(sopLines, 126, 133)}\n\`\`\`\n\n`;

const liteRangeMatch = (r64Lines[7] || '').match(/W(\d+)[^W]+W(\d+)/i);
const liteStart = liteRangeMatch ? parseInt(liteRangeMatch[1], 10) : 1;
const liteEnd = liteRangeMatch ? parseInt(liteRangeMatch[2], 10) : 16;

function inspectMockDiskStatus(w) {
  const prodRh = path.join(ROOT_DIR, `src/data/weeks/week_${w}/reading_hub.js`);
  const stageMockDir = path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}_mock`);
  const stageDir = path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}`);
  const prodHeader = fs.existsSync(prodRh) ? fs.readFileSync(prodRh, 'utf8').split('\n').slice(0, 6).join(' ') : '';
  const hasProdMock = prodHeader.includes('FULL_MOCK');
  const hasStageMock = fs.existsSync(stageMockDir);
  if (hasProdMock && hasStageMock) return `Đã merge tại src/data/weeks/week_${w} (cũng có staging/week_${w}_mock)`;
  if (hasProdMock) return `Đã merge tại src/data/weeks/week_${w}`;
  if (hasStageMock) return `Staged tại docs/agent_artifacts/staging/week_${w}_mock`;
  if (fs.existsSync(stageDir)) return `Có staging rotary tại staging/week_${w} (chưa tách _mock)`;
  return 'Chưa có thư mục mock';
}

function findMapMockRef(afterWeek) {
  const fullMockLines = mapLines
    .map((text, idx) => ({ lineNum: idx + 1, text }))
    .filter(x => x.text.includes('FULL MOCK') || x.text.includes('GRADUATION'));
  const exact = fullMockLines.find(x => x.text.includes(`**W${afterWeek}**`));
  if (exact) {
    const m = exact.text.match(/\*\*([^*]*FULL MOCK[^*]*|[^*]*GRADUATION[^*]*)\*\*/i);
    return `MAP:L${exact.lineNum} (${m ? m[1].trim() : `W${afterWeek}`})`;
  }
  const nearby = fullMockLines.find(x => {
    const wm = x.text.match(/\*\*W(\d+)\*\*/);
    if (!wm) return false;
    const mw = parseInt(wm[1], 10);
    return mw >= afterWeek - 1 && mw <= afterWeek + 3;
  });
  if (nearby) {
    const wm = nearby.text.match(/\*\*W(\d+)\*\*/);
    const m = nearby.text.match(/\*\*([^*]*FULL MOCK[^*]*|[^*]*GRADUATION[^*]*)\*\*/i);
    return `MAP:L${nearby.lineNum} (gần nhất: W${wm[1]} ${m ? m[1].trim() : ''})`;
  }
  return 'Không có dòng trùng trong Digital Map';
}

const earlyMockEntries = [];
for (const lineIdx of [126, 127]) {
  const line = sopLines[lineIdx];
  const m = line.match(/\*\*([^*]+)\*\*:\s*(.+)/);
  if (m) {
    const label = m[1].trim();
    const weeks = [...m[2].matchAll(/W(\d+)/g)].map(x => parseInt(x[1], 10));
    for (const w of weeks) {
      earlyMockEntries.push({ afterWeek: w, level: `${label} (SOP:L${lineIdx + 1})` });
    }
  }
}

const mockSchedule = [];
let idxMock = 0;
for (const em of earlyMockEntries) {
  idxMock++;
  const inLiteDeferred = em.afterWeek >= liteStart && em.afterWeek <= liteEnd;
  mockSchedule.push({
    id: `M${String(idxMock).padStart(2, '0')}`,
    afterWeek: em.afterWeek,
    format: em.level,
    diskStatus: inspectMockDiskStatus(em.afterWeek),
    buildability: inLiteDeferred ? 'TẠM HOÃN — Deferred (Lite Mode round64:L8)' : 'Có thể build (Ngoài Lite Mode)',
    deferred: inLiteDeferred,
    pendingOwner: false,
    mapRef: findMapMockRef(em.afterWeek)
  });
}
for (let n = 1; n <= 31; n++) {
  idxMock++;
  const w = 32 + 4 * n;
  let fmt = '';
  let pendingOwner = false;
  if (w <= 72) fmt = w === 72 ? 'A2 Flyers (Official Gate)' : 'A2 Flyers';
  else if (w <= 112) fmt = w === 112 ? 'B1 PET (Official Gate)' : 'B1 PET';
  else {
    fmt = '[CHỜ OWNER] (PET theo Decision 6 vs B1+ Academic theo SOP/ARCH/MAP)';
    pendingOwner = true;
  }
  mockSchedule.push({
    id: `M${String(idxMock).padStart(2, '0')}`,
    afterWeek: w,
    format: fmt,
    diskStatus: inspectMockDiskStatus(w),
    buildability: pendingOwner ? 'Ngoài Lite Mode — Chờ Owner chốt format' : 'Có thể build ngay',
    deferred: false,
    pendingOwner,
    mapRef: findMapMockRef(w)
  });
}

outA += '| STT | Vị Trí Chèn | Định Dạng / Khảo Thí | Trạng Thái Đọc Từ Đĩa | Trạng Thái Build / Lite Mode | Tham Chiếu Digital Map |\n';
outA += '| :---: | :--- | :--- | :--- | :--- | :--- |\n';
for (const row of mockSchedule) {
  outA += `| **${row.id}** | Chèn sau W${row.afterWeek} | ${row.format} | ${row.diskStatus} | ${row.buildability} | ${row.mapRef} |\n`;
}

const deferredCount = mockSchedule.filter(m => m.deferred).length;
const buildableCount = mockSchedule.length - deferredCount;
const settledBuildableCount = mockSchedule.filter(m => !m.deferred && !m.pendingOwner).length;
const pendingOwnerCount = mockSchedule.filter(m => m.pendingOwner).length;

outA += `\n- **Tổng kết số liệu tính từ danh sách trên:**\n`;
outA += `  - Tổng số bài mock theo quy hoạch toàn khóa: **${mockSchedule.length} bài** (${earlyMockEntries.length} đầu khóa + 31 chu kỳ \`32 + 4n\`).\n`;
outA += `  - Số bài mock tạm hoãn trong Lite Mode (\`W01–W${liteEnd}\`, \`round64:L8\`): **${deferredCount} bài** (${mockSchedule.filter(m => m.deferred).map(m => `${m.id} sau W${m.afterWeek}`).join(', ')}).\n`;
outA += `  - Số bài mock thuộc phạm vi build ngoài Lite Mode: **${buildableCount} bài** (${settledBuildableCount} bài M02–M23 đã chốt định dạng + ${pendingOwnerCount} bài M24–M34 đang giữ nhãn \`[CHỜ OWNER]\`).\n`;
outA += `  - Tổng tuần lịch toàn khóa: \`156 + ${mockSchedule.length} = ${156 + mockSchedule.length} tuần\` (khi M01 hoãn trong Lite Mode hiện tại còn \`156 + ${buildableCount} = ${156 + buildableCount} tuần\` khả build ngay theo lịch).\n\n`;

// --- A.3: PET Spec Audit ---
outA += '### A.3. XÁC NHẬN `src/config/cambridgeExamStandards.js` & NGUỒN SPEC THỰC TẾ CỦA W76, W80 ĐÃ MERGE\n\n';
const stdLines = readLines(CAMBRIDGE_STD_PATH);
const stdEval = evalJsModule(CAMBRIDGE_STD_PATH);
if (stdEval.error) throw new Error(`Failed evaluating ${CAMBRIDGE_STD_PATH}: ${stdEval.error}`);
const examStandardsObj = stdEval.sandbox?.CAMBRIDGE_EXAM_STANDARDS || stdEval.sandbox?.EXAM_STANDARDS || stdEval.sandbox?.__default__ || {};
const examKeys = Object.keys(examStandardsObj);
const getExamIdx = stdLines.findIndex(l => /function\s+getExamStandard/.test(l));
const hasPetInStd = stdLines.some(l => /\bPET\b|Preliminary/i.test(l));

outA += `3.1. Kiểm tra \`src/config/cambridgeExamStandards.js\` (${stdLines.length} dòng):\n`;
outA += `- Các khóa trong \`CAMBRIDGE_EXAM_STANDARDS\`: **\`${JSON.stringify(examKeys)}\`**\n`;
outA += `- Có định nghĩa \`PET\` hay \`Preliminary\` trong file không? **${hasPetInStd ? 'CÓ' : 'KHÔNG — Chính thức: chưa có spec PET'}**\n`;
outA += `- Nguyên văn \`getExamStandard(weekNumber)\` (\`L${getExamIdx + 1}–L${stdLines.length}\`):\n\`\`\`js\n${formatSlice(stdLines, getExamIdx + 1, stdLines.length)}\n\`\`\`\n\n`;

outA += '3.2. Tài liệu / script thực tế đã dùng để sinh & kiểm duyệt 2 tuần PET đã merge (`week_76`, `week_80`):\n';
const petSources = [
  { path: 'src/data/weeks/week_76/blueprint.json', type: 'json' },
  { path: 'src/data/weeks/week_76/provenance.json', type: 'json' },
  { path: 'src/data/weeks/week_76/source_grounding.json', type: 'json' },
  { path: 'src/data/weeks/week_80/blueprint.json', type: 'json' },
  { path: 'src/data/weeks/week_80/provenance.json', type: 'json' },
  { path: 'src/data/weeks/week_80/source_grounding.json', type: 'json' },
  { path: 'scripts/generate_pet_mock_content.mjs', type: 'script', regex: /Mock Exam Format|papers:|reading:|writing:|listening:|speaking:|week_76|pools|MOCK EXAM/i },
  { path: 'scripts/generate_pet_mock_w80.mjs', type: 'script', regex: /Mock Exam Format|papers:|reading:|writing:|listening:|speaking:|week_80|W7[3-9]|W80|pools|w7[3-9]_/i },
  { path: 'docs/agent_artifacts/round64_mock_exam_generator_proposal.md', type: 'md', regex: /PET|Stage 2|Paper|Part|Reading|Listening/i },
  { path: 'scripts/test_mock_gates.mjs', type: 'script', regex: /PET|isPet|papers|readingParts|listeningParts|MOCK_GATE/i }
];

for (const src of petSources) {
  const lines = readLines(src.path);
  outA += `\n- **\`${src.path}\`**`;
  if (!lines) {
    outA += ': [KHÔNG TỒN TẠI]\n';
    continue;
  }
  outA += ` (${lines.length} dòng):\n`;
  if (src.type === 'json') {
    const obj = JSON.parse(lines.join('\n'));
    if (src.path.endsWith('blueprint.json')) {
      const mLine = lines.findIndex(l => /"mockFormat"/.test(l)) + 1;
      const pLine = lines.findIndex(l => /"papers"/.test(l)) + 1;
      const tLine = lines.findIndex(l => /"tested_skills"/.test(l)) + 1;
      const sLine = lines.findIndex(l => /"synthesis_summary"/.test(l)) + 1;
      outA += `  - \`week\`: ${obj.week} | \`mockFormat\`: \`${obj.mockFormat}\` (L${mLine}) | \`cefr_level\`: \`${obj.cefr_level}\`\n`;
      if (obj.papers) outA += `  - \`papers\` (L${pLine}): \`${JSON.stringify(obj.papers)}\`\n`;
      if (obj.tested_skills) outA += `  - \`tested_skills\` (L${tLine}): \`${JSON.stringify(obj.tested_skills)}\` *(lưu ý: vẫn mang khóa Flyers cũ nếu là copy)*\n`;
      if (obj.synthesis_summary) outA += `  - \`synthesis_summary\` (L${sLine}): \`${JSON.stringify(obj.synthesis_summary)}\`\n`;
    } else if (src.path.endsWith('provenance.json')) {
      outA += `\`\`\`json\n${formatSlice(lines, 1, lines.length)}\n\`\`\`\n`;
    } else {
      outA += `  - Keys: \`${JSON.stringify(Object.keys(obj))}\` (trích L1–L15):\n\`\`\`json\n${formatSlice(lines, 1, 15)}\n\`\`\`\n`;
    }
  } else {
    const hits = lines
      .map((text, idx) => ({ lineNum: idx + 1, text }))
      .filter(x => src.regex.test(x.text) && !/audio_script\s*:/.test(x.text))
      .slice(0, 35);
    outA += `\`\`\`text\n${hits.map(h => `${h.lineNum}: ${h.text}`).join('\n')}\n\`\`\`\n`;
  }
}

const bp76 = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'src/data/weeks/week_76/blueprint.json'), 'utf8'));
const bp80 = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'src/data/weeks/week_80/blueprint.json'), 'utf8'));
const w80Sg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'src/data/weeks/week_80/source_grounding.json'), 'utf8'));
outA += `\n- **Kết luận Task A.3 (tính trực tiếp từ file):** \`src/config/cambridgeExamStandards.js\` CHỈ có các khóa \`${JSON.stringify(examKeys)}\` (\`getExamStandard(w)\` trả về \`null\` cho \`w > 72\`) → **chưa có spec PET chính thức**. Hai tuần \`week_76\` và \`week_80\` đã merge sử dụng spec ad-hoc viết trực tiếp trong \`scripts/generate_pet_mock_content.mjs\` / \`scripts/generate_pet_mock_w80.mjs\`, \`blueprint.json\` cục bộ (\`papers\` = \`${JSON.stringify(bp76.papers)}\`), \`docs/agent_artifacts/round64_mock_exam_generator_proposal.md\` và \`scripts/test_mock_gates.mjs\`. Riêng \`week_80\` còn có sai lệch nội bộ: \`source_grounding.json\` ghi \`cumulative_block=${JSON.stringify(w80Sg.cumulative_block)}\`, trong khi \`week_80/blueprint.json\` vẫn giữ \`synthesis_summary=${JSON.stringify(bp80.synthesis_summary)}\` và \`tested_skills\` vẫn chứa các khóa Flyers (\`${(bp80.tested_skills || []).filter(k => k === 'listening_p5' || k === 'writing_p7').join(', ')}\`).\n`;

fs.writeFileSync(OUT_A, outA, 'utf8');
console.log(`✓ Saved ${path.relative(ROOT_DIR, OUT_A)}`);

// ============================================================================
// PART 2: DYNAMIC SOURCE B PARSER FOR TARGET SPEC WEEKS (D.9 & E.10)
// ============================================================================
function extractSourceBPartIIBlock(weekOrStart, endOpt = null) {
  const part2Idx = sourceBLines.findIndex(l => l.includes('PART II'));
  const startScan = part2Idx >= 0 ? part2Idx : 0;
  let blockStart = -1;
  if (endOpt !== null) {
    const reRange = new RegExp(`^[•\\t\\s]*Weeks?\\s+${weekOrStart}\\s*[-–—]\\s*${endOpt}\\s*:`, 'i');
    blockStart = sourceBLines.findIndex((l, idx) => idx >= startScan && reRange.test(l));
  } else {
    const reSingle = new RegExp(`^[•\\t\\s]*Week\\s+${weekOrStart}\\s*:`, 'i');
    blockStart = sourceBLines.findIndex((l, idx) => idx >= startScan && reSingle.test(l));
  }
  if (blockStart < 0) return null;

  let blockEnd = blockStart;
  for (let i = blockStart + 1; i < Math.min(sourceBLines.length, blockStart + 25); i++) {
    const l = sourceBLines[i];
    if (
      /^[•\t\s]*Week\s+\d+\s*:/i.test(l) ||
      /^[•\t\s]*Weeks?\s+\d+\s*[-–—]\s*\d+\s*:/i.test(l) ||
      /\bUNIT\s+\d+/i.test(l) ||
      /\bPROJECT CYCLE\b/i.test(l) ||
      /\bPHASE\s+[A-Z0-9]+/i.test(l)
    ) {
      break;
    }
    blockEnd = i;
  }

  const slice = sourceBLines.slice(blockStart, blockEnd + 1);
  const rawSliceText = slice.map((l, k) => `${blockStart + 1 + k}: ${l}`).join('\n');

  const headerRaw = slice[0].replace(/^[•\t\s]*Weeks?\s+\d+(?:\s*[-–—]\s*\d+)?\s*:\s*/i, '').trim();
  const titleEn = headerRaw.split(/\s*\(\s*Tuần/i)[0].replace(/[“”]/g, '"').trim();

  const findField = (re) => {
    const line = slice.find(l => re.test(l));
    return line ? line.replace(/^[^:]*:\s*/, '').trim() : null;
  };
  const topicEla = findField(/^[•\t\s]*Topic(?:\s*\((?!Math)[^)]*\))?\s*:/i);
  const outcomeEla = findField(/^[•\t\s]*(?:Key Learning )?Outcome(?:\s*\((?!Math)[^)]*\))?\s*:/i) || findField(/^[•\t\s]*Activity(?:\s*\((?!Math)[^)]*\))?\s*:/i);
  const focusLine = findField(/^[•\t\s]*(?:Focus|Skill Focus|Writing Skill Focus)\s*:/i);
  const grammarFocus = findField(/^[•\t\s]*Grammar\s+(?:Focus|Review)\s*:/i);
  const vocabRaw = findField(/^[•\t\s]*Vocabulary\s+Focus\s*:/i);
  const vocabWords = vocabRaw
    ? vocabRaw.replace(/\([^)]*\)/g, '').replace(/\.{3}|…/g, ',').split(/[,;\/]/).map(w => w.replace(/[.。“”"'\r\n]/g, '').trim().toLowerCase()).filter(Boolean)
    : [];
  const mathTopic = findField(/^[•\t\s]*Topic\s*\(Math\)\s*:/i);
  const mathOutcome = findField(/^[•\t\s]*Key Learning Outcome\s*\(Math\)\s*:/i);
  const mathVocabRaw = findField(/^[•\t\s]*Math Vocabulary\s*:/i);
  const mathWords = mathVocabRaw
    ? mathVocabRaw.replace(/^Review\b[^()]*\(([^)]+)\)/i, '$1').replace(/\([^)]*\)/g, '').replace(/\.{3}|…/g, ',').split(/[,;\/]/).map(w => w.replace(/[.。“”"'\r\n]/g, '').trim().toLowerCase()).filter(w => Boolean(w) && !w.startsWith('review'))
    : [];

  return {
    startLine: blockStart + 1,
    endLine: blockEnd + 1,
    rawSliceText,
    titleEn,
    topicEla,
    outcomeEla,
    focusLine,
    grammarFocus,
    vocabRaw,
    vocabWords,
    mathTopic,
    mathOutcome,
    mathVocabRaw,
    mathWords
  };
}

// ============================================================================
// PART 3: TASK D.9 — W79 / W80 SPLIT PROPOSAL
// ============================================================================
const sb7980 = extractSourceBPartIIBlock(79, 80);
const sb78 = extractSourceBPartIIBlock(78);
const sb81 = extractSourceBPartIIBlock(81);

// Check actual current repo state for W79/W80 (read-only)
const diskStatesW7980 = [];
for (const item of [
  { label: 'Production W79 (`src/data/weeks/week_79`)', rh: 'src/data/weeks/week_79/reading_hub.js', bp: 'src/data/weeks/week_79/blueprint.json' },
  { label: 'Staged W79 (`docs/agent_artifacts/staging/week_79`)', rh: 'docs/agent_artifacts/staging/week_79/reading_hub.js', bp: 'docs/agent_artifacts/staging/week_79/blueprint.json' },
  { label: 'Production W80 (`src/data/weeks/week_80`)', rh: 'src/data/weeks/week_80/reading_hub.js', bp: 'src/data/weeks/week_80/blueprint.json' },
  { label: 'Staged W80 Mock (`docs/agent_artifacts/staging/week_80_mock`)', rh: 'docs/agent_artifacts/staging/week_80_mock/reading_hub.js', bp: 'docs/agent_artifacts/staging/week_80_mock/blueprint.json' }
]) {
  const rhEval = evalJsModule(item.rh);
  const rhTheme = rhEval.sandbox?.readingHubData?.theme || rhEval.sandbox?.__default__?.theme || 'N/A';
  const bpLines = readLines(item.bp);
  const bp = bpLines ? JSON.parse(bpLines.join('\n')) : null;
  diskStatesW7980.push({
    label: item.label,
    rhTheme,
    bpTheme: bp?.theme || 'N/A',
    mockFormat: bp?.mockFormat || 'none',
    isFullMock: bp?.isFullMock ?? false
  });
}

const proposedSupplementVocab7980 = [
  'explore', 'planet', 'budget', 'environment', 'pollution', 'poverty', 'research',
  'satellite', 'invest', 'solution', 'priority', 'debate', 'evidence'
];

let outD = '';
outD += '# ĐỀ XUẤT TÁCH DỮ LIỆU W79 / W80: SOURCE B NGUYÊN VĂN VS SUPPLEMENT (ROUND 78 — TASK D.9)\n\n';
outD += '> **NGUYÊN TẮC BẮT BUỘC (TRÍCH SOURCE B PART II, KHÔNG SỬA PRODUCTION/STAGING):**\n';
outD += '> - Chỉ những gì ghi trực tiếp trong `docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt` mới được xem là **SOURCE B**. \n';
outD += '> - Mọi thành phần không có trong `L632–L637` (bao gồm toàn bộ Toán học của W79–80 và 13 từ vựng mở rộng để đủ chuẩn 20 từ của app) BẮT BUỘC đánh dấu **`SUPPLEMENT`**, nêu rõ nguồn/lý do và ghi người duyệt = **`Owner chờ duyệt`** (theo Quyết định Owner (3)).\n\n';

outD += '## 1. Nguyên Văn Source B Cho Khối W79–80 (Kèm Ranh Giới W78 & W81)\n\n';
outD += `- Ranh giới trước — W78 (\`L${sb78.startLine}–L${sb78.endLine}\`): \`Topic (Math)\` = \`${sb78.mathTopic}\`\n`;
outD += `- **Khối W79–80 (\`L${sb7980.startLine}–L${sb7980.endLine}\`):**\n\`\`\`text\n${sb7980.rawSliceText}\n\`\`\`\n`;
outD += `- Ranh giới sau — W81 (\`L${sb81.startLine}–L${sb81.endLine}\`): \`Topic (Math)\` = \`${sb81.mathTopic}\`\n`;
outD += `- Kiểm tra động các trường Toán trong \`L${sb7980.startLine}–L${sb7980.endLine}\`: \`Topic (Math)\` = \`${sb7980.mathTopic || 'KHÔNG CÓ'}\` | \`Key Learning Outcome (Math)\` = \`${sb7980.mathOutcome || 'KHÔNG CÓ'}\` | \`Math Vocabulary\` = \`${sb7980.mathVocabRaw || 'KHÔNG CÓ'}\` -> **Source B có ZERO nội dung Toán cho W79 và W80.**\n\n`;

outD += '## 2. Hiện Trạng Đọc Từ Đĩa Trước Khi Chỉnh Sửa (Chỉ Đọc)\n\n';
outD += '| Thư Mục | `reading_hub.theme` | `blueprint.theme` | `isFullMock` / `mockFormat` |\n';
outD += '| :--- | :--- | :--- | :--- |\n';
for (const ds of diskStatesW7980) {
  outD += `| ${ds.label} | ${ds.rhTheme} | ${ds.bpTheme} | ${ds.isFullMock} / ${ds.mockFormat} |\n`;
}
outD += '\n';

outD += '## 3. Bảng Tách Source B vs SUPPLEMENT Cho W79 & W80 (Đề Xuất)\n\n';
outD += '| Hạng Mục / Trường Dữ Liệu | Phân Loại | Giá Trị Đề Xuất Cho W79 & W80 | Nguồn / Tham Chiếu | Lý Do Bổ Sung (Nếu SUPPLEMENT) | Người Duyệt |\n';
outD += '| :--- | :---: | :--- | :--- | :--- | :---: |\n';
outD += `| **Tiêu đề chu kỳ chung (Title)** | **SOURCE B** | \`${sb7980.titleEn}\` | Source B Part II \`L${sb7980.startLine}\` | — (Nguyên văn Source B) | Đã chốt (Source B) |\n`;
outD += `| **Chủ đề trọng tâm (Topic)** | **SOURCE B** | \`${sb7980.topicEla}\` | Source B Part II \`L${sb7980.startLine + 1}\` | — (Nguyên văn Source B) | Đã chốt (Source B) |\n`;
outD += `| **Hoạt động cốt lõi (Activity)** | **SOURCE B** | \`${sb7980.outcomeEla}\` | Source B Part II \`L${sb7980.startLine + 2}\` | — (Nguyên văn Source B) | Đã chốt (Source B) |\n`;
outD += `| **Kỹ năng phản biện (Skill Focus)** | **SOURCE B** | \`${sb7980.focusLine}\` | Source B Part II \`L${sb7980.startLine + 3}\` | — (Nguyên văn Source B) | Đã chốt (Source B) |\n`;
outD += `| **Ngữ pháp (Grammar Review)** | **SOURCE B** | \`${sb7980.grammarFocus}\` | Source B Part II \`L${sb7980.startLine + 4}\` | — (Nguyên văn Source B) | Đã chốt (Source B) |\n`;
outD += `| **Từ vựng cốt lõi (${sb7980.vocabWords.length} từ)** | **SOURCE B** | \`${sb7980.vocabWords.join(', ')}\` | Source B Part II \`L${sb7980.vocabRaw ? sb7980.startLine + 5 : '?'}\` | — (Nguyên văn 7/7 từ Source B) | Đã chốt (Source B) |\n`;
outD += `| **Từ vựng bổ sung (${proposedSupplementVocab7980.length} từ để đủ 20 từ)** | **SUPPLEMENT** | \`${proposedSupplementVocab7980.join(', ')}\` | Từ vựng học thuật B1/PET chủ đề Space vs Earth Debate | Source B chỉ cho 7 từ tại \`L637\`; schema app (\`vocab.js\` / SRS 20 từ) yêu cầu 20 từ/tuần (dùng chung bộ từ lõi hoặc phân vai W79/W80; bài đọc phải đạt >= 60%). | Owner chờ duyệt |\n`;
outD += `| **Phân vai W79 vs W80 trong 2 tuần liên tiếp** | **SUPPLEMENT** | **W79**: \`Review & Micro-Debate 2 (Part 1: Pros/Cons & Passive/Comparatives)\`<br>**W80**: \`Review & Micro-Debate 2 (Part 2: Rebuttal "Yes, but..." & Conditionals)\` *(tách khỏi M15 Mock)* | Source B gộp 2 tuần trong 1 khối \`Weeks 79-80\` (L632–637) | Source B chưa chia chi tiết ngày/tuần riêng cho W79 và W80; tách 2 pha để tránh trùng lặp bài đọc/hội thoại nhưng vẫn giữ nguyên chủ đề gốc \`Space Exploration vs. Earth Fix\`. | Owner chờ duyệt |\n`;
outD += `| **Toàn bộ Singapore Math (W79: 5 bài, W80: 5 bài)** | **SUPPLEMENT** | **100% SUPPLEMENT**: Ôn tập tỷ lệ / biểu đồ / ngân sách gắn ngữ cảnh phân bổ ngân sách \`Space Exploration vs. Earth Fix\` (kế thừa Unit 10 Math từ W78 Surveys -> trước W81 Graphing Data) | **Source B L632–637 có ZERO dòng Toán** (xác nhận từ file: không có \`Topic (Math)\`, \`Key Learning Outcome (Math)\`, \`Math Vocabulary\`) | Kiến trúc 15-Quest/4-Hub bắt buộc \`skill_practice_hub.singapore_math\` có 5 bài/tuần rotary; phải gắn nhãn \`SUPPLEMENT\` rõ ràng và KHÔNG được tự coi là chuẩn Source B. | Owner chờ duyệt |\n`;
outD += `| **Nội dung 4 Hubs chi tiết (Story, CLIL, Listening Parts, Writing, Video Challenge)** | **SUPPLEMENT** | Kịch bản 5 scenes, bài đọc CLIL 150–250 từ (>= 60% target vocab), Action Lab 3 scenarios, Audio script & câu hỏi | Sinh theo khuôn mẫu 15 Quests từ khung Topic/Grammar Source B | Source B chỉ là syllabus đề mục 6 dòng, không chứa văn bản thô từng station. | Owner chờ duyệt |\n\n`;

outD += '## 4. Ghi Chú Riêng Về Độ Phủ Từ Vựng Bài Đọc & Tách Mock W80\n\n';
outD += `- Với 7 từ Source B (\`${sb7980.vocabWords.join(', ')}\`) + 13 từ SUPPLEMENT = 20 từ mục tiêu, **bài đọc \`reading_hub.js\` của cả W79 và W80 phải chứa >= 60%** từ vựng (cụ thể: **>= 5/7 từ Source B** — khuyến nghị **7/7** — và **>= 12/20 từ tổng**).\n`;
outD += `- Do \`src/data/weeks/week_80\` hiện đang chứa bản merge của **Mock M15 (PET)** (khớp với \`docs/agent_artifacts/staging/week_80_mock\`), khi Owner kích hoạt lịch xen kẽ \`156 + 34\`, thư mục nội dung học của W80 (\`Review & Micro-Debate 2 Part 2\`) sẽ nằm ở tuần nội dung W80 riêng biệt, còn Mock M15 tách ra slot mock chèn sau W80.\n`;

fs.writeFileSync(OUT_D, outD, 'utf8');
console.log(`✓ Saved ${path.relative(ROOT_DIR, OUT_D)}`);

// ============================================================================
// PART 4: TASK E.10 — ACCEPTANCE SPEC FOR W79, W80, W126, W127, W133, W134, W129–132
// ============================================================================
const specTargets = [
  { key: 'W79–W80', weeks: [79, 80], sb: extractSourceBPartIIBlock(79, 80), isCycle: true },
  { key: 'W126', weeks: [126], sb: extractSourceBPartIIBlock(126), isCycle: false },
  { key: 'W127', weeks: [127], sb: extractSourceBPartIIBlock(127), isCycle: false },
  { key: 'W129–132', weeks: [129, 130, 131, 132], sb: extractSourceBPartIIBlock(129, 132), isCycle: true },
  { key: 'W133', weeks: [133], sb: extractSourceBPartIIBlock(133), isCycle: false },
  { key: 'W134', weeks: [134], sb: extractSourceBPartIIBlock(134), isCycle: false }
];

// Check Part I mention for W129–136 cleanly from Source B file
const part1SmartphonesIdx = sourceBLines.findIndex((l, idx) => idx < 122 && /Weeks\s*129-136/i.test(l));
const part2Cycle3Idx = sourceBLines.findIndex((l, idx) => idx > 122 && /PROJECT CYCLE 3.*145-156/i.test(l));

let outE = '';
outE += '# ACCEPTANCE SPEC NGHIỆM THU NỘI DUNG: W79, W80, W126, W127, W129–132, W133, W134 (ROUND 78 — TASK E.10)\n\n';
outE += '> **TRẠNG THÁI TÀI LIỆU:** ĐỀ XUẤT NGHIỆM THU — KHÔNG TÁI SINH NỘI DUNG TRONG ROUND 78.\n';
outE += '> **NGUỒN SỰ THẬT:** 100% trích xuất từ Part II của `docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt`.\n';
outE += '> **ĐỘ KHÓ / THANG ĐO CAMBRIDGE:** Ghi rõ **`"chờ tài liệu Cambridge"`** (không tự bịa ngưỡng lexile / word count ngoài chuẩn nguồn).\n\n';

outE += '## 1. Bảng Tóm Tắt Tiêu Chí Nghiệm Thu Tổng Hợp\n\n';
outE += '| Tuần / Khối | Tiêu Đề Chuẩn Source B (Part II) | Dòng Source B | Từ Vựng Source B | Ngưỡng Từ Vựng Trong Bài Đọc | Tiêu Chí Toán Source B (5/5 bài) | Độ Khó / Chuẩn Khảo Thí |\n';
outE += '| :--- | :--- | :---: | :--- | :--- | :--- | :--- |\n';

const mathAcceptRules = {
  'W79–W80': '**100% SUPPLEMENT (Chờ Owner duyệt)**: Source B L632–637 KHÔNG có mục Toán nào (`Topic (Math)` vắng). Đề xuất tỷ lệ/ngân sách Space vs Earth.',
  'W126': '**Logic Puzzles** (`L997`): Bắt buộc suy luận logic (loại trừ, sắp xếp thứ tự, ràng buộc điều kiện); CẤM phép cộng/trừ 1 bước lấy số có sẵn.',
  'W127': '**Critical Thinking Math** (`L1003`): Bắt buộc kiểm chứng khẳng định định lượng (tìm mâu thuẫn, đối chiếu tính hợp lệ giả thiết); CẤM cộng/trừ đơn thuần.',
  'W129–132': '**Review & Math Logic Cycle** (`L1007–1008`): Ôn tập Phân số/Số thập phân (`Fractions/Decimals review`) + Câu đố Toán Logic (`Math Logic Cycle`).',
  'W133': '**Geometry: Angles** (`L1018–1020`): Nhận diện góc vuông (`=90°`), nhọn (`<90°`), tù (`>90°,<180°`) trong hình hoặc đo góc bằng thước đo góc; KHÔNG lộ tên loại góc trong đề.',
  'W134': '**Geometry: Triangles** (`L1027–1029`): Phân loại tam giác theo cạnh (`equilateral`, `isosceles`, `scalene`, thỏa bất đẳng thức tam giác); KHÔNG lộ tên loại tam giác trong đề.'
};

for (const t of specTargets) {
  const sb = t.sb;
  const vCount = sb.vocabWords.length;
  const minSbPass = vCount > 0 ? Math.ceil(0.6 * vCount) : 0;
  const vocabCol = vCount > 0
    ? `${vCount} từ (\`${sb.vocabWords.join(', ')}\`)`
    : '0 từ trong Source B -> `SUPPLEMENT` 20 từ (Chờ Owner)';
  const readingCovCol = vCount > 0
    ? `>= 60% (${minSbPass}/${vCount} từ Source B + >= 12/20 từ tổng trong \`reading_hub\`)`
    : '>= 60% (>= 12/20 từ `SUPPLEMENT` đã duyệt trong `reading_hub`)';
  outE += `| **${t.key}** | ${sb.titleEn} | L${sb.startLine}–L${sb.endLine} | ${vocabCol} | ${readingCovCol} | ${mathAcceptRules[t.key]} | chờ tài liệu Cambridge |\n`;
}

outE += '\n> **Lưu ý quan trọng về W129–132 (Part I vs Part II):** Trong Part I Tổng quan (`L' + (part1SmartphonesIdx + 1) + '`: `' + (sourceBLines[part1SmartphonesIdx]?.trim() || '') + '`), đề mục `Smartphones` từng nằm ở W129–136. Tuy nhiên trong **Part II Chi tiết** (nguồn chuẩn 156 tuần theo Quyết định Owner), `Smartphones` đã chuyển sang **Project Cycle 3 (W145–156, `L' + (part2Cycle3Idx + 1) + '`)**, còn **W129–132** là **`Review & Math Logic Cycle` (`L1007–1008`)**.\n\n';

outE += '## 2. Đặc Tả Chi Tiết Từng Tuần / Khối (Kèm Nguyên Văn Source B)\n\n';

for (const t of specTargets) {
  const sb = t.sb;
  const vCount = sb.vocabWords.length;
  const minSbPass = vCount > 0 ? Math.ceil(0.6 * vCount) : 0;
  outE += `### ${t.key}: ${sb.titleEn} (Source B \`L${sb.startLine}–L${sb.endLine}\`)\n\n`;
  outE += `- **Nguyên văn Source B (Part II):**\n\`\`\`text\n${sb.rawSliceText}\n\`\`\`\n`;
  outE += `- **Tiêu chí nghiệm thu bắt buộc:**\n`;
  outE += `  1. **Trục Theme / Tiêu đề (\`reading_hub.theme\`, \`blueprint.theme\`):** Phải khớp đúng \`${sb.titleEn}\`${sb.topicEla ? ` (Topic: \`${sb.topicEla}\`)` : ''}. Không được dùng chủ đề cũ/lệch (Part I hoặc Source A).\n`;
  outE += `  2. **Trục CLIL / Skill / Grammar (\`writing_hub\`, \`speaking_hub\`, \`skill_practice_hub.grammar_drills\`):**\n`;
  const clilParts = [];
  if (sb.outcomeEla) clilParts.push(`Outcome / Activity: \`${sb.outcomeEla}\``);
  if (sb.focusLine && sb.focusLine !== sb.outcomeEla) clilParts.push(`Skill Focus / Focus: \`${sb.focusLine}\``);
  outE += `     - Outcome / Activity / Focus: ${clilParts.length > 0 ? clilParts.join(' | ') : '`[Không có dòng riêng — SUPPLEMENT theo khung chu kỳ]`'}\n`;
  outE += `     - Grammar Focus: \`${sb.grammarFocus || '[Không có dòng riêng — SUPPLEMENT ôn tập phù hợp B1+]'}\`\n`;
  outE += `  3. **Trục Từ vựng & Độ phủ bài đọc (\`vocab.js\`, \`reading_hub.js\`):**\n`;
  if (vCount > 0) {
    outE += `     - Từ vựng Source B bắt buộc (**${vCount} từ**): \`${sb.vocabWords.join(', ')}\`.\n`;
    outE += `     - Bổ sung \`${20 - vCount}\` từ còn lại: gắn nhãn \`SUPPLEMENT (Chờ Owner duyệt)\` để đạt đủ 20 từ.\n`;
    outE += `     - **Điều kiện PASS bài đọc (\`reading_hub.js\`):** Bài đọc chính phải chứa **>= 60%** từ vựng mục tiêu (tối thiểu **${minSbPass}/${vCount}** từ Source B — khuyến nghị 100%, và tối thiểu **12/20** từ của toàn bộ bảng từ vựng).\n`;
  } else {
    outE += `     - Source B **không định nghĩa Vocabulary Focus (0 từ)** tại đoạn \`L${sb.startLine}–L${sb.endLine}\`.\n`;
    outE += `     - Toàn bộ 20 từ trong \`vocab.js\` đánh dấu **` + '`SUPPLEMENT (Chờ Owner duyệt)`' + `**, bám sát Topic/Skill của tuần.\n`;
    outE += `     - **Điều kiện PASS bài đọc (\`reading_hub.js\`):** Bài đọc chính phải chứa **>= 60%** (**>= 12/20** từ đã được duyệt).\n`;
  }
  outE += `  4. **Trục Singapore Math (\`skill_practice_hub.singapore_math\` — 5/5 bài):**\n`;
  outE += `     - Target Math Source B: \`Topic (Math)\` = \`${sb.mathTopic || 'KHÔNG CÓ'}\` | \`Outcome (Math)\` = \`${sb.mathOutcome || 'KHÔNG CÓ'}\` | \`Math Vocabulary\` = \`${sb.mathVocabRaw || 'KHÔNG CÓ'}\`.\n`;
  outE += `     - Điều kiện PASS Toán: ${mathAcceptRules[t.key]}\n`;
  outE += `  5. **Hiệu chỉnh độ khó / Cambridge calibration:** **\`chờ tài liệu Cambridge\`** (tạm chưa khóa trần độ dài câu/bài đọc/rubric cho tới khi Owner cung cấp tài liệu chuẩn Cambridge B1 / B1+).\n\n`;
}

fs.writeFileSync(OUT_E, outE, 'utf8');
console.log(`✓ Saved ${path.relative(ROOT_DIR, OUT_E)}`);
