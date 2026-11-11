#!/usr/bin/env node
/**
 * scripts/generate_round78_source_a_patch_v2.mjs
 *
 * ROUND 78 — TASK B (B.4, B.5, B.6): SOURCE A PATCH v2 (PROPOSAL ONLY)
 * - NEVER modifies docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md or any production/governance file.
 * - Generates:
 *     1. docs/agent_artifacts/round78_proposed_digital_map_v2.md
 *     2. docs/agent_artifacts/round78_source_a_patch_v2_raw.txt
 */

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
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
const SOP_PATH = path.join(ROOT_DIR, 'docs/WEEK_PRODUCTION_SOP.md');
const R64_PATH = path.join(ROOT_DIR, 'docs/agent_artifacts/round64_mock_schedule_and_conflicts.md');

const OUT_V2_MAP = path.join(ROOT_DIR, 'docs/agent_artifacts/round78_proposed_digital_map_v2.md');
const OUT_RAW = path.join(ROOT_DIR, 'docs/agent_artifacts/round78_source_a_patch_v2_raw.txt');

const bt = (s) => '`' + s + '`';
const escPipe = (s) => (s || '').replace(/\|/g, '\\|').trim();

const sbData = parseSourceBPartII(SOURCE_B_PATH);
const dmData = parseDigitalMapRows(MAP_PATH);
const sopLines = fs.readFileSync(SOP_PATH, 'utf8').split('\n');
const r64Lines = fs.readFileSync(R64_PATH, 'utf8').split('\n');

// Build exact 34-mock interleaved map keyed by trigger content week
const mockTriggerMap = new Map();
let mIdx = 0;

// Early mocks from SOP L127-128 & Lite Mode W01-W16 from round64:L8
const liteRangeMatch = (r64Lines[7] || '').match(/W(\d+)[^W]+W(\d+)/i);
const liteEnd = liteRangeMatch ? parseInt(liteRangeMatch[2], 10) : 16;

for (const lineIdx of [126, 127]) {
  const m = sopLines[lineIdx].match(/\*\*([^*]+)\*\*:\s*(.+)/);
  if (m) {
    const label = m[1].trim();
    const ws = [...m[2].matchAll(/W(\d+)/g)].map(x => parseInt(x[1], 10));
    for (const w of ws) {
      mIdx++;
      const pad = String(mIdx).padStart(2, '0');
      const deferred = w <= liteEnd;
      mockTriggerMap.set(w, {
        id: `M${pad}`,
        afterWeek: w,
        badge: deferred
          ? `★ FULL MOCK ${pad} (${label}) [DEFERRED — Lite Mode]`
          : `★ FULL MOCK ${pad} (${label})`,
        cycleDesc: deferred ? `W01–W${w} (Lite Mode)` : (w === 24 ? 'W17–W24' : 'W25–W32'),
        detail: deferred
          ? `${bt('isFullMock: true')}; Hoãn build do Lite Mode (${bt('round64:L8')})`
          : `${bt('isFullMock: true')}; Chuẩn ${label} (${bt('SOP:L' + (lineIdx + 1))})`,
        deferred,
        pendingOwner: false
      });
    }
  }
}

for (let n = 1; n <= 31; n++) {
  mIdx++;
  const pad = String(mIdx).padStart(2, '0');
  const w = 32 + 4 * n;
  let badge = '';
  let detail = '';
  let pendingOwner = false;
  if (w <= 72) {
    badge = w === 72 ? `★ FULL MOCK ${pad} (A2 Flyers — Official Gate)` : `★ FULL MOCK ${pad} (A2 Flyers)`;
    detail = `${bt('isFullMock: true')}; Cambridge A2 Flyers 16 Parts (sau W${w - 3}–W${w})`;
  } else if (w <= 112) {
    badge = w === 112 ? `★ FULL MOCK ${pad} (B1 PET — Official Gate)` : `★ FULL MOCK ${pad} (B1 PET)`;
    detail = `${bt('isFullMock: true')}; Cambridge B1 PET (sau W${w - 3}–W${w}; chờ chuẩn hóa ${bt('cambridgeExamStandards.js')})`;
  } else {
    pendingOwner = true;
    badge = `★ FULL MOCK ${pad} ([CHỜ OWNER]: PET vs B1+ Academic)`;
    detail = `${bt('isFullMock: true')}; [CHỜ OWNER] chốt PET (Decision 6) vs B1+ Academic (SOP/ARCH/MAP) (sau W${w - 3}–W${w})`;
  }
  mockTriggerMap.set(w, {
    id: `M${pad}`,
    afterWeek: w,
    badge,
    cycleDesc: `W${w - 3}–W${w}`,
    detail,
    deferred: false,
    pendingOwner
  });
}

function deriveCleanCefrType(w, origCefr) {
  let base = (origCefr || '').trim();
  if (/★\s*FULL\s*MOCK|★\s*GRADUATION/i.test(base)) {
    if (w <= 16) base = 'Pre-A1 → A1 · Rotary';
    else if (w <= 32) base = 'A1 Movers · Rotary Practice';
    else if (w <= 72) base = 'A2 Flyers · Rotary Practice';
    else if (w <= 88) base = 'B1 PET · Rotary Practice';
    else if (w <= 119) base = 'B1+ PET · Rotary Practice';
    else if (w === 120) base = 'B1+ PET · Graduation Showcase';
    else base = 'B1+ Academic · Rotary Practice';
  }
  if (w >= 79 && w <= 80) return 'B1 PET · Review Cycle';
  if (w >= 95 && w <= 96) return 'B1+ PET · Review Cycle';
  if (w >= 129 && w <= 132) return 'B1+ Academic · Review Cycle';
  if (w === 54 || w === 120 || w === 156) {
    const prefix = base.split('·')[0].trim() || (w === 54 ? 'A2 Flyers' : w === 120 ? 'B1+ PET' : 'B1+ Academic');
    return `${prefix} · Graduation Showcase (Non-Mock)`;
  }
  return base;
}

function deriveCleanScaff(w, origScaff) {
  const s = (origScaff || '').trim();
  if (/Exam|Official|Festival|GRADUATION/i.test(s)) {
    if (w <= 16) return 'Tier 1 (Full)';
    if (w <= 72) return 'Tier 2 (Chunks)';
    if (w <= 96) return 'Tier 3 (Guided CER)';
    if (w <= 120) return 'Tier 3 (Autonomous)';
    if (w <= 132) return 'Tier 3 (Opinion)';
    if (w <= 137) return 'Tier 3 (Research)';
    return 'Tier 3 (Autonomous)';
  }
  return s;
}

function buildProposedContentTitle(w, sb) {
  if (sb.blockOrigin === 'multi_week_cycle') {
    if (w >= 79 && w <= 80) {
      const partLabel = w === 79 ? 'Part 1: Claims' : 'Part 2: Rebuttal';
      return `${sb.titleEn}: ${sb.topicEla} (${partLabel} — tách W79/W80: SUPPLEMENT)`;
    }
    if (w >= 95 && w <= 96) {
      return `${sb.titleEn}: ${sb.topicEla}`;
    }
    if (w >= 129 && w <= 132) {
      return `${sb.titleEn} (W129–132)`;
    }
  }
  return sb.titleEn;
}

function buildProposedClilCol(w, sb, dm) {
  const parts = [];
  if (sb.topicEla) {
    parts.push(`Topic: ${sb.topicEla} (${bt('Source B L' + sb.headerLineNum)})`);
  }
  if (sb.mathTopic) {
    parts.push(`Math: ${sb.mathTopic} (${bt('Source B L' + (sb.mathLineNum || sb.headerLineNum))})`);
  }
  if (w >= 129 && w <= 132 && sb.outcomeEla) {
    parts.push(`Focus: ${sb.outcomeEla} (${bt('Source B L1007–1008')})`);
  } else if (sb.outcomeEla && !sb.topicEla) {
    parts.push(`Outcome: ${sb.outcomeEla} (${bt('Source B L' + sb.headerLineNum)})`);
  }

  // Flag silent parts clearly as SUPPLEMENT
  if (w >= 79 && w <= 80) {
    parts.push(`[SUPPLEMENT: Toán & phân vai từng tuần W79/W80 không có trong Source B L632–637 | Nguồn: Đề xuất Round 78 | Owner chờ duyệt]`);
  } else if (w >= 129 && w <= 132) {
    parts.push(`[SUPPLEMENT: Đề bài viết/nói từng tuần không có trong Source B L1007–1008 | Nguồn: Đề xuất ôn tập B1+ | Owner chờ duyệt]`);
  } else if (!sb.hasMath && dm.clilRaw && !/Toán:|Math:/i.test(sb.rawHeaderLine || '')) {
    if (!sb.topicEla) {
      parts.push(`[SUPPLEMENT: Chi tiết CLIL/Toán do Source B im lặng | Nguồn: ${escPipe(dm.clilRaw)} | Owner chờ duyệt]`);
    } else {
      parts.push(`[SUPPLEMENT: Toán/Lab mở rộng khi Source B không ghi Math | Owner chờ duyệt]`);
    }
  } else if (sb.outcomeEla && sb.topicEla && sb.blockOrigin === 'single_week') {
    // Keep concise Outcome from Source B
    parts.push(`ELA: ${sb.outcomeEla}`);
  }
  return escPipe(parts.join('; '));
}

function buildProposedGrammarCol(w, sb, dm) {
  const parts = [];
  if (sb.grammarFocus) {
    parts.push(`[Source B L${sb.grammarLineNum}] ${sb.grammarFocus}`);
  } else {
    parts.push(`[SUPPLEMENT: Grammar không ghi trong Source B | Nguồn: Khung ôn tập/Digital Map | Owner chờ duyệt]`);
  }
  if (sb.vocabWords.length > 0) {
    parts.push(`Vocab (${sb.vocabWords.length}): ${sb.vocabWords.slice(0, 6).join(', ')}${sb.vocabWords.length > 6 ? ', ...' : ''}`);
  } else {
    parts.push(`Vocab: [SUPPLEMENT — 0 từ trong Source B; Owner chờ duyệt]`);
  }
  if (sb.mathOutcome) {
    parts.push(`Math Outcome: ${sb.mathOutcome}`);
  }
  return escPipe(parts.join(' | '));
}

// Construct replacement proposal texts for L26–45 (esp L28) and L280
const proposedBoxLines = [
  '```text',
  '┌─────────────────────────────────────────────────────────────────────────────────────────────────┐',
  '│         BẢNG PHÂN BỔ 34 MỐC MOCK CHECKPOINT XEN KẼ (156 TUẦN NỘI DUNG + 34 MOCK = 190 TUẦN)     │',
  '│  [PROPOSED v2 — Source B Part II 156w + Mock xen kẽ giữa tuần nội dung, không gộp vào tuần học] │',
  '├──────────────────────┬─────────────────────────────────┬────────────────────────────────────────┤',
  '│ Giai Đoạn            │ Mốc Chèn Sau Tuần Nội Dung      │ Trạng Thái / Quy Chuẩn Kiểm Tra        │',
  '├──────────────────────┼─────────────────────────────────┼────────────────────────────────────────┤',
  '│ Pre-A1 Starters (1)  │ M01 (Sau W16)                   │ [DEFERRED — Lite Mode round64:L8]      │',
  '│ A1 Movers (2)        │ M02 (Sau W24), M03 (Sau W32)    │ Sẵn sàng build (Ngoài Lite Mode)       │',
  '│ A2 Flyers (10)       │ M04–M13 (Sau W36, 40, ..., 72)  │ Chu kỳ 32+4n (n=1..10); M13 Official   │',
  '│ B1 PET (10)          │ M14–M23 (Sau W76, 80, ..., 112) │ Chu kỳ 32+4n (n=11..20); Chưa spec PET │',
  '│ Sau W116–W156 (11)   │ M24–M34 (Sau W116, 120, ...,156)│ [CHỜ OWNER]: PET vs B1+ Academic       │',
  '├──────────────────────┴─────────────────────────────────┴────────────────────────────────────────┤',
  '│ TỔNG: 34 Mock quy hoạch (33 khả build ngoài Lite Mode + 1 M01 deferred) | 156w + 34m = 190 tuần │',
  '└─────────────────────────────────────────────────────────────────────────────────────────────────┘',
  '```'
];

const proposedL280Line =
  '2. **Khai Báo Cột Milestone (Proposed v2 — Xen Kẽ)**: Tất cả 156 tuần nội dung (`W01–W156`) BẮT BUỘC gỡ bỏ `★ FULL MOCK` và đặt `isFullMock: false`. Chỉ **34 mốc kiểm tra xen kẽ** (`MOCK M01–M34`, chèn sau `W16, W24, W32` và chu kỳ `32+4n` `W36..W156`) đặt `isFullMock: true` trong slot mock tách biệt (`M01` tạm hoãn Lite Mode `round64:L8`; `M24–M34` giữ `[CHỜ OWNER]`).';

// Assemble round78_proposed_digital_map_v2.md cleanly from original Digital Map lines
const origMapLines = dmData.lines;
const newMapLines = [];
let inOldMockBox = false;
let skippedOldMockBox = false;

for (let i = 0; i < origMapLines.length; i++) {
  const lineNum = i + 1;
  const line = origMapLines[i];

  // Replace top header line
  if (lineNum === 1) {
    newMapLines.push(`${line} [PROPOSED v2 — ROUND 78]`);
    newMapLines.push('');
    newMapLines.push('> **TRẠNG THÁI ĐỀ XUẤT (PROPOSAL ONLY — KHÔNG SỬA FILE GỐC):** Đồng bộ 100% theo **Source B Part II** (`156` tuần nội dung, sửa W79–80, W95–96, W126, W129–132), tách **34 Mock Checkpoint** xen kẽ (33 ngoài Lite Mode + `M01` Deferred Lite Mode), và gắn nhãn rõ mọi phần **`SUPPLEMENT`** khi Source B im lặng.');
    continue;
  }

  // Update Mock Cadence header metadata & Section 2 title/description (no leftover "28 Mock")
  if (line.startsWith('**Mock Test Cadence**:')) {
    newMapLines.push('**Mock Test Cadence**: 34 Interleaved Mock Checkpoints (33 ngoài Lite Mode + 1 M01 Deferred Lite Mode; M24–M34 [CHỜ OWNER])  ');
    continue;
  }
  if (line.startsWith('**Provenance / Changelog')) {
    newMapLines.push(line.replace(/và nhịp 28 Mock Tests\.?/, 'và đề xuất v2 (Round 78) đồng bộ Source B Part II (156 tuần) + 34 Interleaved Mock Checkpoints.'));
    continue;
  }
  if (line.startsWith('2. **Tuần Thi Thử Trọn Vẹn')) {
    newMapLines.push('2. **Mốc Thi Thử Xen Kẽ (Interleaved Mock Checkpoints — 34 mốc quy hoạch)**: Chèn xen kẽ giữa các tuần nội dung (`M01` sau W16 [Deferred Lite Mode]; `M02–M03` sau W24/W32; `M04–M34` theo chu kỳ `32+4n` sau W36..W156; riêng `M24–M34` giữ `[CHỜ OWNER]`), không gộp lên tuần nội dung Source B.');
    continue;
  }
  if (line.startsWith('## 2. Bảng Phân Bổ 28 Tuần Full Mock Test')) {
    newMapLines.push('## 2. Bảng Phân Bổ 34 Mốc Mock Checkpoint Xen Kẽ');
    continue;
  }

  // Replace L26–45 old 28-mock ASCII box (containing L28)
  if (lineNum >= 25 && lineNum <= 47 && (line.includes('┌──') || line.includes('```') && origMapLines[i + 1]?.includes('┌──'))) {
    if (!skippedOldMockBox) {
      inOldMockBox = true;
      continue;
    }
  }
  if (inOldMockBox) {
    if (line.includes('```') && origMapLines[i - 1]?.includes('└──')) {
      inOldMockBox = false;
      skippedOldMockBox = true;
      newMapLines.push(...proposedBoxLines);
      continue;
    }
    continue;
  }

  // Update Block A–H *Focus lines & Block G/H headers (remove stale 4+1 / 28-Mock / old Cycle phrasing)
  if (i > 0 && origMapLines[i - 1].startsWith('#### Block A:') && line.startsWith('*Focus:')) {
    newMapLines.push('*Focus: Bản sắc cá nhân, gia đình, lớp học, Present Simple, giàn giáo trực quan 100%. **LITE MODE: 10 Quests/tuần cho W01–W16; M01 (sau W16) tạm hoãn theo Lite Mode (`round64:L8`).***');
    continue;
  }
  if (i > 0 && origMapLines[i - 1].startsWith('#### Block B:') && line.startsWith('*Focus:')) {
    newMapLines.push('*Focus: Quá khứ đơn was/were, động từ quy tắc/bất quy tắc, chép chính tả Notepad; Mock xen kẽ ngoài tuần nội dung: M02 (sau W24), M03 (sau W32) và M04 Flyers Mock 1 (sau W36).*');
    continue;
  }
  if (i > 0 && origMapLines[i - 1].startsWith('#### Block C:') && line.startsWith('*Focus:')) {
    newMapLines.push('*Focus: Chu kỳ 4 tuần nội dung Source B + 1 Mock Flyers xen kẽ (M05–M08 sau W40/44/48/52; W53–W54 nối tiếp vào Block D), Singapore Math, viết truyện $\\ge 20$ từ.*');
    continue;
  }
  if (i > 0 && origMapLines[i - 1].startsWith('#### Block D:') && line.startsWith('*Focus:')) {
    newMapLines.push('*Focus: Mock Flyers xen kẽ sau mỗi 4 tuần nội dung (M09–M13 sau W56/60/64/68/72), hoàn thiện kỹ năng phòng thi, chốt hạ mục tiêu 15/15 Khiên Flyers tại M13 (sau W72).*');
    continue;
  }
  if (i > 0 && origMapLines[i - 1].startsWith('#### Block E:') && line.startsWith('*Focus:')) {
    newMapLines.push('*Focus: Mock PET xen kẽ sau mỗi 4 tuần nội dung (M14–M19 sau W76/80/84/88/92/96), mô hình CER (Claim-Evidence-Reasoning), Từ vựng học thuật AWL Tier 2, chuẩn B1 Preliminary (chưa có spec PET trong `cambridgeExamStandards.js`).*');
    continue;
  }
  if (i > 0 && origMapLines[i - 1].startsWith('#### Block F:') && line.startsWith('*Focus:')) {
    newMapLines.push('*Focus: Mock xen kẽ sau mỗi 4 tuần nội dung (M20–M23 PET sau W100/104/108/112; M24–M25 sau W116/120 [CHỜ OWNER]), viết bài báo cáo khoa học độc lập, Capstone Presentation W113–W120.*');
    continue;
  }
  if (line.startsWith('#### Block G:')) {
    newMapLines.push('#### Block G: B1+ Academic — Cycle 1 Homework (`W121–W132`, gồm `W129–132 Review & Math Logic Cycle`) & Cycle 2 Video Games (`W133–W144`)');
    continue;
  }
  if (i > 0 && origMapLines[i - 1].startsWith('#### Block G:') && line.startsWith('*Focus:')) {
    newMapLines.push('*Focus (Source B Part II): Project Cycle 1 (`W121–128` Homework Debate + `W129–132` Review & Math Logic Cycle) và Project Cycle 2 (`W133–144` Video Games Debate); Mock chèn xen kẽ M26–M31 (sau W124/128/132/136/140/144) giữ `[CHỜ OWNER]`.*');
    continue;
  }
  if (line.startsWith('#### Block H:')) {
    newMapLines.push('#### Block H: Capstone & Graduation (`W145–W156` — Project Cycle 3: Smartphones Debate & Final Showcase)');
    continue;
  }
  if (i > 0 && origMapLines[i - 1].startsWith('#### Block H:') && line.startsWith('*Focus:')) {
    newMapLines.push('*Focus (Source B Part II): Project Cycle 3 (`W145–156`: Smartphones Debate — báo cáo nghiên cứu & thuyết trình quan điểm); Mock chèn xen kẽ M32 (sau W148), M33 (sau W152) và M34 Final Mock (sau W156) giữ `[CHỜ OWNER]`.*');
    continue;
  }

  // Transform week row W01..W156 & insert Mock Checkpoint right after trigger weeks
  const wm = line.match(/^\|\s*\*\*W(\d+)\*\*\s*\|/);
  if (wm) {
    const w = parseInt(wm[1], 10);
    const sb = sbData.weeks[w];
    const dm = dmData.rows[w];
    const wPad = w < 10 ? `0${w}` : `${w}`;
    const colTheme = buildProposedContentTitle(w, sb);
    const colCefr = deriveCleanCefrType(w, dm?.cefrRaw);
    const colClil = buildProposedClilCol(w, sb, dm);
    const colScaff = deriveCleanScaff(w, dm?.scaffRaw);
    const colGram = buildProposedGrammarCol(w, sb, dm);
    newMapLines.push(`| **W${wPad}** | ${escPipe(colTheme)} | ${escPipe(colCefr)} | ${colClil} | ${escPipe(colScaff)} | ${colGram} |`);

    if (mockTriggerMap.has(w)) {
      const mk = mockTriggerMap.get(w);
      const mockTitle = mk.pendingOwner
        ? `Mock Checkpoint ${mk.id.slice(1)} (Phạm vi ${mk.cycleDesc} — [CHỜ OWNER])`
        : `Mock Checkpoint ${mk.id.slice(1)} (Phạm vi ${mk.cycleDesc})`;
      newMapLines.push(`| **MOCK ${mk.id} (Sau W${wPad})** | **${mockTitle}** | **${mk.badge}** | Tổng hợp kiến thức & từ vựng chu kỳ ${mk.cycleDesc} | **Tier Exam** | ${mk.detail} |`);
    }
    continue;
  }

  // Replace L280 rule
  if (/^\s*2\.\s*\*\*Khai Báo Cột Milestone\*\*/.test(line)) {
    newMapLines.push(proposedL280Line);
    continue;
  }

  newMapLines.push(line);
}

fs.writeFileSync(OUT_V2_MAP, newMapLines.join('\n'), 'utf8');
console.log(`✓ Saved ${path.relative(ROOT_DIR, OUT_V2_MAP)} (${newMapLines.length} lines)`);

// Execute real `diff -u`
let diffOutput = '';
try {
  diffOutput = execFileSync('diff', ['-u', 'docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md', 'docs/agent_artifacts/round78_proposed_digital_map_v2.md'], {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024
  });
} catch (err) {
  // diff -u returns exit status 1 when differences exist
  diffOutput = err.stdout || '';
}

// ============================================================================
// TASK B.6: EXHAUSTIVE CONFLICT TABLE ACROSS ALL 156 DIGITAL MAP ROWS VS SOURCE B
// ============================================================================
const conflicts = [];
const stats = {
  totalRows: 156,
  totalConflictingRows: 0,
  titleMismatch: [],
  titleFormatTypo: [],
  mockOnContentRow: [],
  clilDivergentOrUnmarkedSupplement: [],
  grammarDivergentOrUnmarkedSupplement: []
};

function checkTitleRelation(dmTitle, sbTitle, w) {
  const nDm = normalizeComparisonText(dmTitle);
  const nSb = normalizeComparisonText(sbTitle);
  if (!nSb) return 'MISSING_SB';
  if (nDm === nSb) {
    // Check unmatched quotes typo in Digital Map like `Project 1 Showcase: "Welcome to My World`
    const dmQuotes = (dmTitle.match(/"/g) || []).length;
    const sbQuotes = (sbTitle.match(/"/g) || []).length;
    if (dmQuotes !== sbQuotes) return 'FORMAT_TYPO_QUOTE';
    return 'EXACT';
  }
  // Check W55-82 / W97-112 bilingual trailing slash in MAP vs English title in Source B
  const nDmClean = normalizeComparisonText(dmTitle.replace(/\s*\/\s*Toán:[^)]*\)?/gi, ''));
  if (nDmClean === nSb) return 'BILINGUAL_SUFFIX_TYPO';
  return 'DIVERGENT_TITLE';
}

const EN_VI_CONCEPTS = {
  physical: ['ngoại hình', 'cơ thể'],
  traits: ['đặc điểm', 'ngoại hình'],
  describing: ['miêu tả', 'đặc điểm'],
  past: ['quá khứ'],
  regular: ['có quy tắc', '-ed'],
  adding: ['thêm'],
  visual: ['hình ảnh'],
  information: ['thông tin'],
  imperatives: ['câu mệnh lệnh', 'mệnh lệnh'],
  keywords: ['từ khóa'],
  prompts: ['gợi ý'],
  delivery: ['thuyết trình', 'phi ngôn ngữ'],
  skills: ['kỹ năng'],
  presentation: ['báo cáo dự án', 'thuyết trình'],
  looking: ['nhìn lại'],
  reflection: ['phản ánh'],
  ceremony: ['lễ trao', 'lễ tốt nghiệp'],
  certificate: ['chứng chỉ'],
  distribution: ['trao chứng chỉ']
};

function matchesViTranslation(enText, targetRaw) {
  if (!enText || !targetRaw) return false;
  const targetLow = targetRaw.toLowerCase();
  const normTokens = normalizeComparisonText(enText).split(' ').filter(t => t.length >= 4);
  for (const tk of normTokens) {
    const viList = EN_VI_CONCEPTS[tk];
    if (viList && viList.some(vi => targetLow.includes(vi))) {
      return true;
    }
  }
  // Check quoted structural phrases (e.g. "I am...") preserved in Map
  const quotes = [...enText.matchAll(/"([^"]{3,})"/g)].map(m => m[1].toLowerCase().replace(/[.?!]+$/, '').trim());
  if (quotes.some(q => q.length >= 3 && targetLow.includes(q))) {
    return true;
  }
  return false;
}

function checkClilConflict(w, dmClil, sb) {
  const dmNorm = normalizeComparisonText(dmClil);
  const topicNorm = normalizeComparisonText(sb.topicEla);
  const mathNorm = normalizeComparisonText(sb.mathTopic);
  if (!dmNorm) return 'EMPTY_MAP_CLIL';
  if (!topicNorm && !mathNorm) {
    return 'UNMARKED_SUPPLEMENT (Source B im lặng Topic/Math nhưng Source A không gắn nhãn SUPPLEMENT)';
  }
  // Compare key significant tokens of Source B Topic/Math against Digital Map Col 4 (English or VI translation)
  const stopWords = new Set(['the', 'and', 'for', 'with', 'into', 'from', 'that', 'this', 'use', 'write', 'about', 'what', 'how', 'your', 'ela', 'math', 'science', 'history', 'social', 'studies', 'geography', 'debate']);
  const topicTokens = topicNorm.split(' ').filter(t => t.length >= 4 && !stopWords.has(t));
  const outcomeTokens = normalizeComparisonText(sb.outcomeEla).split(' ').filter(t => t.length >= 4 && !stopWords.has(t));
  const allSbTokens = [...new Set([...topicTokens, ...outcomeTokens])];
  const matched = allSbTokens.filter(t => dmNorm.includes(t));
  if (allSbTokens.length > 0 && matched.length === 0) {
    if (matchesViTranslation(sb.topicEla, dmClil) || matchesViTranslation(sb.outcomeEla, dmClil)) {
      return null;
    }
    return `CLIL_CONFLICT (Source A không chứa từ khóa Topic/Outcome Source B: "${sb.topicEla || sb.outcomeEla}")`;
  }
  return null;
}

function checkGrammarConflict(w, dmGram, sb) {
  const dmNorm = normalizeComparisonText(dmGram);
  if (!sb.grammarFocus) {
    return 'UNMARKED_SUPPLEMENT_OR_EXTRA_HUB (Source B không có Grammar Focus; Source A ghi thêm hoạt động hub/khảo thí mà chưa gắn nhãn SUPPLEMENT)';
  }
  const stopWords = new Set(['the', 'and', 'for', 'with', 'use', 'using', 'sentence', 'sentences', 'simple', 'words', 'verbs', 'nouns', 'intro', 'focus', 'phrases', 'avoiding']);
  const gramTokens = normalizeComparisonText(sb.grammarFocus).split(' ').filter(t => t.length >= 3 && !stopWords.has(t));
  const matched = gramTokens.filter(t => dmNorm.includes(t));
  if (gramTokens.length >= 2 && matched.length === 0) {
    if (matchesViTranslation(sb.grammarFocus, dmGram)) {
      return null;
    }
    return `GRAMMAR_DIVERGENT (Source B: "${sb.grammarFocus}" vs Source A: "${dmGram}")`;
  }
  return null;
}

for (let w = 1; w <= 156; w++) {
  const sb = sbData.weeks[w];
  const dm = dmData.rows[w];
  if (!dm) continue;

  const diffs = [];
  const titleRel = checkTitleRelation(dm.themeRaw, sb.titleEn, w);
  if (titleRel === 'DIVERGENT_TITLE') {
    stats.titleMismatch.push(w);
    diffs.push(`Lệch Tiêu đề: Source B="${sb.titleEn}" vs Source A="${dm.themeRaw}"`);
  } else if (titleRel === 'FORMAT_TYPO_QUOTE' || titleRel === 'BILINGUAL_SUFFIX_TYPO') {
    stats.titleFormatTypo.push(w);
    diffs.push(`Lỗi định dạng tiêu đề (${titleRel}): Source A="${dm.themeRaw}"`);
  }

  if (dm.hasFullMock || dm.hasGraduationMarker) {
    stats.mockOnContentRow.push(w);
    diffs.push(`Gắn nhầm mốc Mock (${dm.cefrRaw}) trực tiếp lên tuần nội dung W${w} (mâu thuẫn quy tắc xen kẽ)`);
  }

  const clilDiff = checkClilConflict(w, dm.clilRaw, sb);
  if (clilDiff) {
    stats.clilDivergentOrUnmarkedSupplement.push(w);
    diffs.push(clilDiff);
  }

  const gramDiff = checkGrammarConflict(w, dm.grammarRaw, sb);
  if (gramDiff) {
    stats.grammarDivergentOrUnmarkedSupplement.push(w);
    diffs.push(gramDiff);
  }

  if (diffs.length > 0) {
    stats.totalConflictingRows++;
    conflicts.push({
      week: w,
      sbLine: sb.headerLineNum,
      sbTitle: sb.titleEn + (sb.topicEla ? ` / Topic: ${sb.topicEla}` : ''),
      dmLine: dm.lineNum,
      dmSummary: `${dm.themeRaw} | ${dm.cefrRaw}`,
      diffs
    });
  }
}

// ============================================================================
// WRITE round78_source_a_patch_v2_raw.txt (B.4, B.5, B.6)
// ============================================================================
let outRaw = '';
outRaw += '====================================================================================================\n';
outRaw += '📝 ROUND 78 — TASK B (B.4, B.5, B.6): SOURCE A PATCH v2 (PROPOSAL ONLY — KHÔNG SỬA FILE GỐC)\n';
outRaw += `Thời điểm chạy: ${new Date().toISOString()}\n`;
outRaw += '====================================================================================================\n\n';

outRaw += '### B.4. FULL `diff -u` GIỮA DIGITAL MAP HIỆN TẠI VÀ ĐỀ XUẤT V2 (`round78_proposed_digital_map_v2.md`)\n\n';
outRaw += '```diff\n';
outRaw += diffOutput.trimEnd() + '\n';
outRaw += '```\n\n';

outRaw += '### B.5. VĂN BẢN ĐỀ XUẤT THAY THẾ L28 (BẢNG PHÂN BỔ MOCK) & L280 (QUY TẮC isFullMock)\n\n';
outRaw += '#### 5.1. Nguyên văn L26–L45 hiện tại (chứa L28) vs Văn bản đề xuất v2:\n';
outRaw += '- **HIỆN TẠI (`docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md:L26–L45`):**\n```text\n';
for (let k = 25; k < 45; k++) {
  outRaw += `${k + 1}: ${origMapLines[k]}\n`;
}
outRaw += '```\n';
outRaw += '- **ĐỀ XUẤT THAY THẾ (`round78_proposed_digital_map_v2.md`):**\n';
outRaw += proposedBoxLines.join('\n') + '\n\n';

outRaw += '#### 5.2. Nguyên văn L280 hiện tại vs Văn bản đề xuất v2:\n';
const l280Idx = origMapLines.findIndex(l => /^\s*2\.\s*\*\*Khai Báo Cột Milestone\*\*/.test(l));
outRaw += `- **HIỆN TẠI (\`L${l280Idx + 1}\`):**\n\`\`\`markdown\n${origMapLines[l280Idx]}\n\`\`\`\n`;
outRaw += `- **ĐỀ XUẤT THAY THẾ:**\n\`\`\`markdown\n${proposedL280Line}\n\`\`\`\n\n`;

outRaw += '### B.6. BẢNG TOÀN BỘ CÁC DÒNG DIGITAL MAP MÂU THUẪN VỚI SOURCE B (ĐỌC TỪ 2 FILE THẬT)\n\n';
outRaw += '- Ghi chú phương pháp so khớp: Các dòng chỉ dịch song ngữ Anh–Việt đúng nghĩa (`W03, W21, W113, W115, W116, W118, W119, W120`, và cụm `"I am..."` ở `W01`) được công nhận tương đương ngữ nghĩa (không báo nhầm `CLIL_CONFLICT`/`GRAMMAR_DIVERGENT`); các ô Digital Map ghi thêm hoạt động hub/khảo thí khi Source B im lặng mà thiếu nhãn `SUPPLEMENT` được phân loại rõ là `UNMARKED_SUPPLEMENT_OR_EXTRA_HUB`.\n';
outRaw += `- Tổng số hàng tuần nội dung quét trong Digital Map: **${stats.totalRows} hàng** (W01–W156)\n`;
outRaw += `- Tổng số hàng có ít nhất 1 xung đột / sai chuẩn với Source B hoặc quy tắc Mock xen kẽ / SUPPLEMENT: **${stats.totalConflictingRows} / ${stats.totalRows} hàng**\n`;
outRaw += `  1. **Lệch tiêu đề thực chất (Title Divergence):** ${stats.titleMismatch.length} tuần (${stats.titleMismatch.map(w => `W${w}`).join(', ')})\n`;
outRaw += `  2. **Lỗi định dạng chuỗi tiêu đề (mất dấu \`"\` / dư hậu tố \`/ Toán:\` cụt ngoặc):** ${stats.titleFormatTypo.length} tuần (${stats.titleFormatTypo.map(w => `W${w}`).join(', ')})\n`;
outRaw += `  3. **Gắn nhầm \`★ FULL MOCK\` / \`★ GRADUATION\` lên tuần nội dung:** ${stats.mockOnContentRow.length} tuần (${stats.mockOnContentRow.map(w => `W${w}`).join(', ')})\n`;
outRaw += `  4. **Cột 4 CLIL/Topic lệch Source B hoặc tự điền không nhãn \`SUPPLEMENT\`:** ${stats.clilDivergentOrUnmarkedSupplement.length} tuần\n`;
outRaw += `  5. **Cột 6 Grammar/Hub lệch Source B hoặc tự điền không nhãn \`SUPPLEMENT\` / ghi thêm hoạt động hub:** ${stats.grammarDivergentOrUnmarkedSupplement.length} tuần\n\n`;

outRaw += '| Tuần | Source B (Dòng & Nội dung) | Source A Hiện Tại (Dòng & Theme/Loại) | Khác Biệt Đọc Từ File |\n';
outRaw += '| :---: | :--- | :--- | :--- |\n';
for (const c of conflicts) {
  outRaw += `| **W${c.week}** | L${c.sbLine}: ${escPipe(c.sbTitle)} | L${c.dmLine}: ${escPipe(c.dmSummary)} | ${escPipe(c.diffs.join(' ; '))} |\n`;
}

fs.writeFileSync(OUT_RAW, outRaw, 'utf8');
console.log(`✓ Saved ${path.relative(ROOT_DIR, OUT_RAW)} (${outRaw.split('\n').length} lines)`);
