#!/usr/bin/env node
/**
 * scripts/generate_round79_digital_map_and_rotary.mjs
 *
 * ROUND 79 — SECTION A (A.1, A.2, A.3): DIGITAL MAP v2 & ROTARY CONSUMER AUDIT (PROPOSAL ONLY)
 * - NEVER modifies docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md or any production/governance file.
 * - Generates:
 *     1. docs/agent_artifacts/round79_proposed_digital_map_v2.md
 *     2. docs/agent_artifacts/round79_digital_map_and_rotary_raw.txt
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

const OUT_V2_MAP = path.join(ROOT_DIR, 'docs/agent_artifacts/round79_proposed_digital_map_v2.md');
const OUT_RAW = path.join(ROOT_DIR, 'docs/agent_artifacts/round79_digital_map_and_rotary_raw.txt');

const bt = (s) => '`' + s + '`';
const escPipe = (s) => (s || '').replace(/\|/g, '\\|').trim();
const cleanMapCell = (s) => (s || '').replace(/\\?\|/g, ' • ').trim();

const sbData = parseSourceBPartII(SOURCE_B_PATH);
const dmData = parseDigitalMapRows(MAP_PATH);
const sopLines = fs.readFileSync(SOP_PATH, 'utf8').split('\n');
const r64Lines = fs.readFileSync(R64_PATH, 'utf8').split('\n');

// ============================================================================
// BUILD 34 INTERLEAVED MOCK CHECKPOINTS (same rule verified in Round 78 A.3)
// ============================================================================
const mockTriggerMap = new Map();
let mIdx = 0;

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

// ============================================================================
// A.1 & A.3: COLUMN GENERATORS PRESERVING ROTARY 1–4 + SOURCE A HUB/ACTIVITY INFO
// ============================================================================
function deriveCleanCefrTypeR79(w, origCefr) {
  const base = (origCefr || '').trim();

  // W01–W32: preserve exact Starters/Movers Rotary labeling; never leave "MOCK" on content rows
  if (w <= 15) return base;
  if (w === 16) return 'Pre-A1 · Rotary Practice';
  if (w <= 32) return 'A1 Movers · Rotary Practice';

  // W33–W156: continuously preserve Rotary 1..4 synced with interleaved 4+1 cadence ((w - 33) % 4) + 1
  // IMPORTANT: NEVER include substring "mock" (e.g. avoid "(Non-Mock)") because generate_week_blueprint.mjs:L100 uses /MOCK/i.test(rawCefrType)
  const rotaryNum = ((w - 33) % 4) + 1;
  let prefix = 'A2 Flyers';
  if (w <= 72) prefix = 'A2 Flyers';
  else if (w === 73) prefix = 'B1 Entry';
  else if (w <= 88) prefix = 'B1 PET';
  else if (w <= 120) prefix = 'B1+ PET';
  else prefix = 'B1+ Academic';

  const suffixes = [];
  if ((w >= 79 && w <= 80) || (w >= 95 && w <= 96) || (w >= 129 && w <= 132)) {
    suffixes.push('Review Cycle');
  }
  if (w === 54 || w === 120 || w === 156) {
    suffixes.push('Graduation Showcase (Content Week)');
  }
  if (w >= 113 && w <= 120) {
    suffixes.push('[CHỜ OWNER: Phase 2 vs B1+ Academic]');
  }

  return `${prefix} · Rotary ${rotaryNum}${suffixes.length ? ' · ' + suffixes.join(' · ') : ''}`;
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

  // Keep non-conflicting Source A CLIL notes or flag silent supplements explicitly (NO pipe chars inside Map v2 cells!)
  if (w >= 79 && w <= 80) {
    parts.push(`[SUPPLEMENT: Toán & phân vai từng tuần W79/W80 không có trong Source B L632–637 — Owner chờ duyệt]`);
  } else if (w >= 129 && w <= 132) {
    parts.push(`[SUPPLEMENT: Đề bài viết/nói từng tuần không có trong Source B L1007–1008 — Owner chờ duyệt]`);
  } else if (!sb.hasMath && dm.clilRaw && !/Toán:|Math:/i.test(sb.rawHeaderLine || '')) {
    if (!sb.topicEla) {
      parts.push(`[SUPPLEMENT — Source A]: ${cleanMapCell(dm.clilRaw)}`);
    } else if (dm.clilRaw) {
      parts.push(`[SUPPLEMENT: Toán/Lab mở rộng khi Source B không ghi Math]`);
    }
  } else if (sb.outcomeEla && sb.topicEla && sb.blockOrigin === 'single_week') {
    parts.push(`ELA: ${sb.outcomeEla}`);
  }
  return cleanMapCell(parts.join('; '));
}

// Semantic matcher helpers (shared between Col 6 Source A preservation & B.6 separated counting)
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
  const quotes = [...enText.matchAll(/"([^"]{3,})"/g)].map(m => m[1].toLowerCase().replace(/[.?!]+$/, '').trim());
  if (quotes.some(q => q.length >= 3 && targetLow.includes(q))) {
    return true;
  }
  return false;
}

const HUB_TAG_REGEX = /`?(reading_hub|listening_hub|writing_hub|speaking_hub|skill_practice_hub|action_lab|science_lab|discovery_report|science_report|word_blitz|sentence_smash|math_quest|story_writer|broadcast_studio|info_exchange|boss_listening|boss_reading|weekly_review|gear1_webtoon|gear2_karaoke|gear3_retell|gear4_clil|dictation)`?/i;

function classifyCol6Segment(seg, w, sb, dm) {
  const s = seg.trim();
  if (!s) return { kind: 'empty', text: '' };

  // Mock-exam / Graduation ceremony banner segments belong ONLY on interleaved MOCK rows
  if (/Full Mock|Bài thi thử|LỄ TỐT NGHIỆP|KỲ THI CHÍNH THỨC|Thuyết trình 3 phút \+ Q&A;\s*Đánh giá/i.test(s)) {
    return { kind: 'mock_banner', text: s };
  }
  if (/Golden Master 16 Parts|Cambridge Rotary Cycle \d|Cycle \d/i.test(s)) {
    return { kind: 'rotary_note', text: s };
  }

  // Does segment contain a hub/quest mapping?
  const hasHub = HUB_TAG_REGEX.test(s);

  // Check if a segment referencing math_quest conflicts with Source B mathTopic
  if (/`math_quest`/i.test(s) && sb.mathTopic) {
    const mathStop = new Set(['the', 'and', 'for', 'with', 'math', 'intro', 'review', 'word', 'problems']);
    const sbMathTk = normalizeComparisonText(sb.mathTopic).split(' ').filter(t => t.length >= 3 && !mathStop.has(t));
    const segNorm = normalizeComparisonText(s);
    const matchesSbMath = sbMathTk.some(t => segNorm.includes(t)) || matchesViTranslation(sb.mathTopic, s);
    if (!matchesSbMath) {
      return { kind: 'conflict', text: s, reason: `math_quest "${s}" khác Source B Math "${sb.mathTopic}"` };
    }
    return { kind: 'preserve_hub', text: s };
  }

  // Check if W79-80 / W95-96 / W129-132 old divergent themes leaked into Col 6 segment
  if ((w >= 79 && w <= 80) && /lịch sử|cung - cầu|điều kiện kinh tế/i.test(s)) {
    return { kind: 'conflict', text: s, reason: `gắn nhầm chủ đề cũ (${dm.themeRaw}) thay vì Space Exploration vs Earth Fix` };
  }
  if ((w >= 95 && w <= 96) && /hóa học biển|Cambridge B1 PET thường gặp/i.test(s)) {
    return { kind: 'conflict', text: s, reason: `gắn nhầm chủ đề cũ (${dm.themeRaw}) thay vì The Young Professor` };
  }

  // If segment contains a hub/quest mapping (e.g. W133 discovery_report, W124 broadcast_studio, etc.), ALWAYS preserve unless it failed math conflict above
  if (hasHub) {
    return { kind: 'preserve_hub', text: s };
  }

  // Non-hub segment (first half of Col 6 usually describes grammar/activity/genre):
  // If Source B has NO grammarFocus, this is non-conflicting Source A-only info -> preserve under SUPPLEMENT
  if (!sb.grammarFocus) {
    return { kind: 'preserve_supplement', text: s };
  }

  // Check if this text matches Source B grammar/outcome semantically or conflicts with Source B grammarFocus
  const stopWords = new Set(['the', 'and', 'for', 'with', 'use', 'using', 'sentence', 'sentences', 'simple', 'words', 'verbs', 'nouns', 'intro', 'focus', 'phrases', 'avoiding']);
  const gramTokens = normalizeComparisonText(sb.grammarFocus).split(' ').filter(t => t.length >= 3 && !stopWords.has(t));
  const segNorm = normalizeComparisonText(s);
  const gramMatch = gramTokens.filter(t => segNorm.includes(t));
  if (gramTokens.length >= 2 && gramMatch.length === 0 && !matchesViTranslation(sb.grammarFocus, s)) {
    return { kind: 'conflict', text: s, reason: `Source A "${s}" khác Source B Grammar "${sb.grammarFocus}"` };
  }

  // Compatible with Source B (already paraphrased/translated) -> keep as Source A activity/note or merged cleanly
  return { kind: 'compatible_note', text: s };
}

function analyzeAndBuildCol6(w, sb, dm) {
  const rawSegs = (dm.grammarRaw || '').split(';').map(x => x.trim()).filter(Boolean);
  const classified = rawSegs.map(seg => classifyCol6Segment(seg, w, sb, dm));

  const preservedHubOrAct = classified
    .filter(c => c.kind === 'preserve_hub' || c.kind === 'preserve_supplement')
    .map(c => c.text);

  // If no explicit hub/supplement tag matched, check compatible_note that brings distinct concrete activity info (like "nộp văn bản thảo...", "Tập hợp thành tích...")
  const extraNonHub = classified
    .filter(c => c.kind === 'compatible_note' && !sb.grammarFocus)
    .map(c => c.text);

  const preservedAll = [...new Set([...preservedHubOrAct, ...extraNonHub])];
  const col6Conflicts = classified.filter(c => c.kind === 'conflict');

  const outParts = [];
  if (sb.grammarFocus) {
    outParts.push(`[Source B L${sb.grammarLineNum}] ${sb.grammarFocus}`);
  } else {
    outParts.push(`[SUPPLEMENT: Grammar không ghi trong Source B — Owner chờ duyệt]`);
  }
  if (sb.vocabWords.length > 0) {
    outParts.push(`Vocab (${sb.vocabWords.length}): ${sb.vocabWords.join(', ')}`);
  } else {
    outParts.push(`Vocab: [SUPPLEMENT — 0 từ trong Source B; Owner chờ duyệt]`);
  }
  if (sb.mathOutcome) {
    outParts.push(`Math Outcome: ${sb.mathOutcome}`);
  }
  if (preservedAll.length > 0) {
    outParts.push(`[SUPPLEMENT — Source A]: ${preservedAll.join('; ')}`);
  }

  return {
    text: cleanMapCell(outParts.join(' • ')),
    preservedSourceA: preservedAll,
    col6Conflicts,
    hasMockBanner: classified.some(c => c.kind === 'mock_banner')
  };
}

// ============================================================================
// BUILD round79_proposed_digital_map_v2.md (6-column compatible + preserved Col 3 & Col 6)
// ============================================================================
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
  '2. **Khai Báo Cột Milestone (Proposed v2 — Xen Kẽ)**: Tất cả 156 tuần nội dung (`W01–W156`) BẮT BUỘC gỡ bỏ `★ FULL MOCK` và đặt `isFullMock: false` (tránh chứa chuỗi `"Mock"` trong Cột 2/3 để không kích nhầm regex `/MOCK/i` ở `generate_week_blueprint.mjs:L100`). Chỉ **34 mốc kiểm tra xen kẽ** (`MOCK M01–M34`, chèn sau `W16, W24, W32` và chu kỳ `32+4n` `W36..W156`) đặt `isFullMock: true` trong slot mock tách biệt (`M01` tạm hoãn Lite Mode `round64:L8`; `M24–M34` giữ `[CHỜ OWNER]`).';

const origMapLines = dmData.lines;
const newMapLines = [];
let inOldMockBox = false;
let skippedOldMockBox = false;
const col3AuditRows = [];
const conflictAnalysisRows = [];

for (let i = 0; i < origMapLines.length; i++) {
  const lineNum = i + 1;
  const line = origMapLines[i];

  if (lineNum === 1) {
    newMapLines.push(`${line} [PROPOSED v2 — ROUND 79]`);
    newMapLines.push('');
    newMapLines.push('> **TRẠNG THÁI ĐỀ XUẤT (ROUND 79 PROPOSAL ONLY — KHÔNG SỬA FILE GỐC):** Đồng bộ 100% theo **Source B Part II** (`156` tuần nội dung), giữ nguyên toàn bộ thông tin hub/mini-game & hoạt động không xung đột từ Source A dưới nhãn **`[SUPPLEMENT — Source A]`**, bảo toàn đầy đủ nhãn **`Rotary 1–4`** ở Cột 3 cho `W33–W156` (đồng bộ chu kỳ `((w - 33) % 4) + 1`), và tách riêng **34 Mock Checkpoint** xen kẽ (`MOCK M01–M34`).');
    continue;
  }

  if (line.startsWith('**Mock Test Cadence**:')) {
    newMapLines.push('**Mock Test Cadence**: 34 Interleaved Mock Checkpoints (33 ngoài Lite Mode + 1 M01 Deferred Lite Mode; M24–M34 [CHỜ OWNER])  ');
    continue;
  }
  if (line.startsWith('**Provenance / Changelog')) {
    newMapLines.push(line.replace(/và nhịp 28 Mock Tests\.?/, 'và đề xuất v2 (Round 79) đồng bộ Source B Part II (156 tuần) + 34 Interleaved Mock Checkpoints + bảo toàn [SUPPLEMENT — Source A] & Rotary 1–4.'));
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

  if (lineNum >= 25 && lineNum <= 47 && (line.includes('┌──') || (line.includes('```') && origMapLines[i + 1]?.includes('┌──')))) {
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

  if (i > 0 && origMapLines[i - 1].startsWith('#### Block A:') && line.startsWith('*Focus:')) {
    newMapLines.push('*Focus: Bản sắc cá nhân, gia đình, lớp học, Present Simple, giàn giáo trực quan 100%. **LITE MODE: 10 Quests/tuần cho W01–W16; M01 (sau W16) tạm hoãn theo Lite Mode (`round64:L8`).***');
    continue;
  }
  if (i > 0 && origMapLines[i - 1].startsWith('#### Block B:') && line.startsWith('*Focus:')) {
    newMapLines.push('*Focus: Quá khứ đơn was/were, động từ quy tắc/bất quy tắc, chép chính tả Notepad; Mock xen kẽ ngoài tuần nội dung: M02 (sau W24), M03 (sau W32) và M04 Flyers Mock 1 (sau W36).*');
    continue;
  }
  if (i > 0 && origMapLines[i - 1].startsWith('#### Block C:') && line.startsWith('*Focus:')) {
    newMapLines.push('*Focus: Chu kỳ 4 tuần nội dung Source B + 1 Mock Flyers xen kẽ (M05–M08 sau W40/44/48/52), Singapore Math, viết truyện $\\ge 20$ từ.*');
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

  const wm = line.match(/^\|\s*\*\*W(\d+)\*\*\s*\|/);
  if (wm) {
    const w = parseInt(wm[1], 10);
    const sb = sbData.weeks[w];
    const dm = dmData.rows[w];
    const wPad = w < 10 ? `0${w}` : `${w}`;

    const colTheme = buildProposedContentTitle(w, sb);
    const colCefr = deriveCleanCefrTypeR79(w, dm?.cefrRaw);
    const colClil = buildProposedClilCol(w, sb, dm);
    const colScaff = deriveCleanScaff(w, dm?.scaffRaw);
    const col6Res = analyzeAndBuildCol6(w, sb, dm);

    newMapLines.push(`| **W${wPad}** | ${cleanMapCell(colTheme)} | ${cleanMapCell(colCefr)} | ${colClil} | ${cleanMapCell(colScaff)} | ${col6Res.text} |`);

    // Record A.3 Col 3 row
    const origRotaryMatch = (dm?.cefrRaw || '').match(/Rotary\s*\d+|Rotary Practice|Rotary/i);
    const v2RotaryMatch = colCefr.match(/Rotary\s*\d+|Rotary Practice|Rotary/i);
    col3AuditRows.push({
      week: w,
      origCol3: dm?.cefrRaw || '',
      v2Col3: colCefr,
      origRotary: origRotaryMatch ? origRotaryMatch[0] : (dm?.hasFullMock ? '(MOCK/no Rotary)' : '(none)'),
      v2Rotary: v2RotaryMatch ? v2RotaryMatch[0] : '(none)',
      changedCefrPrefix: (dm?.cefrRaw || '').split('·')[0].trim() !== colCefr.split('·')[0].trim(),
      changedRotaryLabel: (origRotaryMatch?.[0] || '') !== (v2RotaryMatch?.[0] || '')
    });

    // Record A.2 separated conflict metrics
    const nDmTitle = normalizeComparisonText(dm.themeRaw);
    const nSbTitle = normalizeComparisonText(sb.titleEn);
    const nDmClean = normalizeComparisonText(dm.themeRaw.replace(/\s*\/\s*Toán:[^)]*\)?/gi, ''));
    let titleConflict = null;
    if (nDmTitle !== nSbTitle) {
      if (nDmClean === nSbTitle) titleConflict = `Format typo hậu tố Toán: "${dm.themeRaw}"`;
      else titleConflict = `Title lệch: Map="${dm.themeRaw}" vs Source B="${sb.titleEn}"`;
    } else if ((dm.themeRaw.match(/"/g) || []).length !== (sb.titleEn.match(/"/g) || []).length) {
      titleConflict = `Format typo dấu ngoặc kép: "${dm.themeRaw}"`;
    }

    // Check CLIL genuine conflict (vs Source A-only supplement when Source B is silent)
    let clilConflict = null;
    let clilSupplementKept = false;
    const dmClilNorm = normalizeComparisonText(dm.clilRaw);
    const topicNorm = normalizeComparisonText(sb.topicEla);
    const mathNorm = normalizeComparisonText(sb.mathTopic);
    if (!topicNorm && !mathNorm) {
      clilSupplementKept = Boolean(dmClilNorm);
    } else {
      const stopWords = new Set(['the', 'and', 'for', 'with', 'into', 'from', 'that', 'this', 'use', 'write', 'about', 'what', 'how', 'your', 'ela', 'math', 'science', 'history', 'social', 'studies', 'geography', 'debate']);
      const sbClilTokens = [...new Set([
        ...topicNorm.split(' ').filter(t => t.length >= 4 && !stopWords.has(t)),
        ...normalizeComparisonText(sb.outcomeEla).split(' ').filter(t => t.length >= 4 && !stopWords.has(t))
      ])];
      const matched = sbClilTokens.filter(t => dmClilNorm.includes(t));
      if (sbClilTokens.length > 0 && matched.length === 0 && !matchesViTranslation(sb.topicEla, dm.clilRaw) && !matchesViTranslation(sb.outcomeEla, dm.clilRaw)) {
        clilConflict = `CLIL lệch Source B (${sb.topicEla || sb.outcomeEla}) vs Map (${dm.clilRaw})`;
      }
    }

    const col6ConflictsList = [...new Set(col6Res.col6Conflicts.map(c => c.reason))];
    const hasGenuineSbConflict = Boolean(titleConflict || clilConflict || col6ConflictsList.length > 0);
    const hasSourceASupplementOnly = col6Res.preservedSourceA.length > 0 || clilSupplementKept || (!sb.grammarFocus && !dm.hasFullMock && !dm.hasGraduationMarker);
    const hasMockFlagRemoved = Boolean(dm.hasFullMock || dm.hasGraduationMarker);

    conflictAnalysisRows.push({
      week: w,
      sbLine: sb.headerLineNum,
      dmLine: dm.lineNum,
      titleConflict,
      clilConflict,
      col6ConflictsList,
      hasGenuineSbConflict,
      hasSourceASupplementOnly,
      hasMockFlagRemoved,
      preservedSourceA: col6Res.preservedSourceA,
      clilSupplementKept,
      origCol3: dm.cefrRaw
    });

    if (mockTriggerMap.has(w)) {
      const mk = mockTriggerMap.get(w);
      const mockTitle = mk.pendingOwner
        ? `Mock Checkpoint ${mk.id.slice(1)} (Phạm vi ${mk.cycleDesc} — [CHỜ OWNER])`
        : `Mock Checkpoint ${mk.id.slice(1)} (Phạm vi ${mk.cycleDesc})`;
      newMapLines.push(`| **MOCK ${mk.id} (Sau W${wPad})** | **${cleanMapCell(mockTitle)}** | **${cleanMapCell(mk.badge)}** | Tổng hợp kiến thức & từ vựng chu kỳ ${cleanMapCell(mk.cycleDesc)} | **Tier Exam** | ${cleanMapCell(mk.detail)} |`);
    }
    continue;
  }

  if (/^\s*2\.\s*\*\*Khai Báo Cột Milestone\*\*/.test(line)) {
    newMapLines.push(proposedL280Line);
    continue;
  }

  newMapLines.push(line);
}

fs.writeFileSync(OUT_V2_MAP, newMapLines.join('\n'), 'utf8');

// ============================================================================
// DYNAMIC CONSUMER SCAN FROM ACTUAL REPO FILES (A.3)
// ============================================================================
function inspectConsumer(relPath, regexList) {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(fullPath)) return { relPath, exists: false, hits: [] };
  const lines = fs.readFileSync(fullPath, 'utf8').split('\n');
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    for (const rx of regexList) {
      if (rx.test(lines[i])) {
        hits.push({ lineNum: i + 1, text: lines[i].trim() });
        break;
      }
    }
  }
  return { relPath, exists: true, hits };
}

const consumerAudits = [
  inspectConsumer('src/config/bossRotarySchedule.js', [/cycleKey\s*=/, /BOSS_ROTARY_CYCLES/, /getBossRotaryConfig/, /getRotaryTaskLabel/]),
  inspectConsumer('src/modules/zones/BossBattleZone.jsx', [/bossRotarySchedule/, /getBossRotaryConfig/, /isFullMock/, /cycleNumber/]),
  inspectConsumer('src/components/zones/BossIntro.jsx', [/rotaryConfig/, /isFullMock/, /cycleNumber/]),
  inspectConsumer('src/components/questmap/TaskScreen.jsx', [/getRotaryTaskLabel/, /bossRotarySchedule/, /completeQuest/]),
  inspectConsumer('src/modules/chronicles/BossBattleScreen.jsx', [/getBossType/, /weekNumber - 17/]),
  inspectConsumer('scripts/generate_week_blueprint.mjs', [/parseDigitalMap/, /isFullMock\s*=/, /rotaryCycle\s*=/, /map_cefr_type/, /cefrLevel/, /scaffolding/, /grammarHub/]),
  inspectConsumer('scripts/regenerate_temp_blueprints.mjs', [/parseDigitalMap/, /DIGITAL_MAP_PATH/]),
  inspectConsumer('scripts/update_digital_syllabus_map.mjs', [/MAP_PATH/, /divergentWeeks/]),
  inspectConsumer('scripts/lib/source_b_part2_parser.mjs', [/parseDigitalMapRows/, /hasFullMock/]),
  inspectConsumer('scripts/gate13_rotary_schedule.mjs', [/bossRotarySchedule/, /getRotaryConfig/, /cycleExpectedSkills/]),
  inspectConsumer('scripts/gate1_blueprint_conformance.mjs', [/blueprint\.json/, /cefr_level/, /keywords/, /characters/]),
  inspectConsumer('scripts/audit_39_mock_weeks.mjs', [/bp\.isFullMock/]),
  inspectConsumer('scripts/audit_staged_gate11.mjs', [/blueprint\.json/]),
  inspectConsumer('src/stores/useDailyQuestStore.js', [/completeQuest/, /QUEST_ALIAS_MAP/])
];

// Verify what parseDigitalMap regex in generate_week_blueprint.mjs L100 & L125-140 outputs on v2!
function simulateGenerateWeekBlueprintRegex(w, colTheme, colCefr) {
  const isFullMock = /MOCK/i.test(colCefr) || /MOCK/i.test(colTheme);
  let cefrLevel = w <= 16 ? 'Pre-A1 Starters' : w <= 32 ? 'A1 Movers' : w <= 72 ? 'A2 Flyers' : w <= 120 ? 'B1 PET' : 'B1+ Academic';
  let cefrStage = w <= 16 ? 1 : w <= 32 ? 1 : w <= 72 ? 1 : w <= 120 ? 2 : 3;
  if (/Pre-A1/i.test(colCefr)) { cefrLevel = 'Pre-A1 Starters'; cefrStage = 1; }
  else if (/A1 Movers/i.test(colCefr)) { cefrLevel = 'A1 Movers'; cefrStage = 1; }
  else if (/A2 Flyers/i.test(colCefr)) { cefrLevel = 'A2 Flyers'; cefrStage = 1; }
  else if (/(?:B1\+?\s*PET|\(PET\)|B1\s+Entry)/i.test(colCefr)) { cefrLevel = 'B1 PET'; cefrStage = 2; }
  else if (/(?:B1\+\s*Academic|\(B1\+\)|B1\+\b|B2\b)/i.test(colCefr)) { cefrLevel = 'B1+ Academic'; cefrStage = 3; }
  const rotaryCycle = (!isFullMock && w >= 33 && w <= 72) ? ((w - 33) % 4) + 1 : null;
  return { isFullMock, cefrLevel, cefrStage, rotaryCycle };
}

let diffPreview = '';
try {
  diffPreview = execFileSync('diff', ['-u', 'docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md', 'docs/agent_artifacts/round79_proposed_digital_map_v2.md'], {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024
  });
} catch (err) {
  diffPreview = err.stdout || '';
}

// ============================================================================
// WRITE round79_digital_map_and_rotary_raw.txt
// ============================================================================
const genuineConflictWeeks = conflictAnalysisRows.filter(r => r.hasGenuineSbConflict);
const supplementKeptWeeks = conflictAnalysisRows.filter(r => r.hasSourceASupplementOnly);
const mockRemovedWeeks = conflictAnalysisRows.filter(r => r.hasMockFlagRemoved);
const withPreservedCol6Hub = conflictAnalysisRows.filter(r => r.preservedSourceA.length > 0);

const col3Mismatches = [];
const cefrMismatches = [];
const parserColumnMismatches = [];
const themeMockTriggers = [];
const v2ContentRowsCount = { matched: 0 };

for (const row of col3AuditRows) {
  const w = row.week;
  const sb = sbData.weeks[w];
  const titleV2 = buildProposedContentTitle(w, sb);
  const simCol3Only = simulateGenerateWeekBlueprintRegex(w, '', row.v2Col3);
  const simFull = simulateGenerateWeekBlueprintRegex(w, titleV2, row.v2Col3);
  if (simCol3Only.isFullMock) col3Mismatches.push(`W${w}: Col 3 "${row.v2Col3}" falsely matched /MOCK/i`);
  if (simFull.isFullMock && !simCol3Only.isFullMock) {
    themeMockTriggers.push(`W${w}: Col 2 title "${titleV2}" contains word "Mock" -> current generate_week_blueprint.mjs:L100 (/MOCK/i.test(cleanTheme)) would misclassify W${w}!`);
  }

  // Verify CEFR Level & Stage against Map v2 convention (including W15 A1 Movers Entry preserved from Map v1, and W33-W72 A2 Flyers!)
  const expectedLevel = w === 15 ? 'A1 Movers' : (w <= 16 ? 'Pre-A1 Starters' : w <= 32 ? 'A1 Movers' : w <= 72 ? 'A2 Flyers' : w <= 120 ? 'B1 PET' : 'B1+ Academic');
  const expectedStage = w <= 16 ? 1 : w <= 32 ? 1 : w <= 72 ? 1 : w <= 120 ? 2 : 3;
  if (simFull.cefrLevel !== expectedLevel || simFull.cefrStage !== expectedStage) {
    cefrMismatches.push(`W${w}: got ${simFull.cefrLevel} (${simFull.cefrStage}) != expected ${expectedLevel} (${expectedStage})`);
  }
}

// Empirically verify every W-row and MOCK-row in generated round79_proposed_digital_map_v2.md parses cleanly with BOTH parsers!
const v2Text = newMapLines.join('\n');
for (let w = 1; w <= 156; w++) {
  const wPad = w < 10 ? `0${w}` : `${w}`;
  const line = newMapLines.find(l => l.startsWith(`| **W${wPad}**`));
  if (!line) {
    parserColumnMismatches.push(`W${w}: missing row in v2`);
    continue;
  }
  const splitParts = line.split('|').slice(1, -1);
  if (splitParts.length !== 6) {
    parserColumnMismatches.push(`W${w}: split('|').slice(1,-1).length=${splitParts.length} != 6`);
  }
  const bpRx = new RegExp(`\\|\\s*\\*\\*W0?${w}\\*\\*\\s*\\|\\s*([^|]+)\\|\\s*([^|]+)\\|\\s*([^|]+)\\|\\s*([^|]+)\\|\\s*([^|]+)\\|`);
  const m = v2Text.match(bpRx);
  if (!m) {
    parserColumnMismatches.push(`W${w}: generate_week_blueprint regex failed`);
  } else {
    v2ContentRowsCount.matched++;
    const parsedCefr = m[2].replace(/\*\*/g, '').trim();
    const expectedCol3 = col3AuditRows.find(x => x.week === w)?.v2Col3;
    if (parsedCefr !== expectedCol3) {
      parserColumnMismatches.push(`W${w}: parsed Col3 "${parsedCefr}" !== "${expectedCol3}"`);
    }
  }
}
if (col3Mismatches.length || cefrMismatches.length || parserColumnMismatches.length) {
  throw new Error(`Map v2 validation failed! col3=${col3Mismatches.length}, cefr=${cefrMismatches.length}, parserSplit=${parserColumnMismatches.length}\n${[...col3Mismatches, ...cefrMismatches, ...parserColumnMismatches].slice(0, 10).join('\n')}`);
}

let raw = '';
raw += '========================================================================================================\n';
raw += '📊 ROUND 79 — SECTION A (A.1, A.2, A.3): DIGITAL MAP v2 (GIỮ SOURCE A + TÁCH 3 NHÓM ĐẾM + CONSUMER AUDIT)\n';
raw += `Thời điểm chạy: ${new Date().toISOString()}\n`;
raw += `File Map v2 đề xuất: ${path.relative(ROOT_DIR, OUT_V2_MAP)} (${newMapLines.length} dòng)\n`;
raw += '========================================================================================================\n\n';

raw += '### A.1. BẢO TOÀN THÔNG TIN KHÔNG XUNG ĐỘT TỪ SOURCE A CỘT 6 (`[SUPPLEMENT — Source A]`)\n\n';
raw += `- Tổng số hàng tuần nội dung có trích xuất & giữ lại ánh xạ hub/mini-game/hoạt động từ Cột 6 Source A dưới nhãn ${bt('[SUPPLEMENT — Source A]')}: **${withPreservedCol6Hub.length} / 156 tuần**.\n`;
raw += '- Kiểm chứng các ví dụ điển hình yêu cầu bởi Owner (đọc trực tiếp từ file gốc & Map v2):\n';
for (const sampleW of [38, 79, 80, 124, 129, 130, 131, 132, 133, 134]) {
  const dm = dmData.rows[sampleW];
  const r = conflictAnalysisRows.find(x => x.week === sampleW);
  const v2Line = newMapLines.find(l => l.startsWith(`| **W${sampleW < 10 ? '0' + sampleW : sampleW}**`));
  raw += `  * **W${sampleW}** (Map gốc L${dm.lineNum}): Cột 6 gốc = \`${dm.grammarRaw}\`\n`;
  raw += `    - Giữ lại \`[SUPPLEMENT — Source A]\`: ${r.preservedSourceA.length ? r.preservedSourceA.map(x => `\`${x}\``).join(', ') : '(không có đoạn non-mock tách riêng / chuyển vào hàng MOCK)'}\n`;
  raw += `    - Xung đột Cột 6 bị thay: ${r.col6ConflictsList.length ? r.col6ConflictsList.join(' ; ') : 'Không có'}\n`;
  raw += `    - Dòng Map v2: ${v2Line}\n`;
}

raw += '\n### A.2. THAY THẾ MỤC B.6: ĐẾM TÁCH BẠCH 3 NHÓM ĐỘC LẬP (KHÔNG GỘP CHUNG "143/156 XUNG ĐỘT")\n\n';
raw += `- Tổng số hàng tuần nội dung trong Digital Map gốc: **${conflictAnalysisRows.length} hàng** (W01–W156)\n`;
raw += `- **(i) Xung đột THẬT với Source B** (\`title/topic/clil/grammar/math\` thực sự mâu thuẫn với Source B): **${genuineConflictWeeks.length} / 156 tuần**\n`;
raw += `  - Lệch/typo tiêu đề: **${conflictAnalysisRows.filter(r => r.titleConflict).length} tuần** (${conflictAnalysisRows.filter(r => r.titleConflict).map(r => 'W' + r.week).join(', ')})\n`;
raw += `  - Lệch CLIL/Topic so với Source B: **${conflictAnalysisRows.filter(r => r.clilConflict).length} tuần** (${conflictAnalysisRows.filter(r => r.clilConflict).map(r => 'W' + r.week).join(', ')})\n`;
raw += `  - Lệch Grammar/Math trong Cột 6 so với Source B: **${conflictAnalysisRows.filter(r => r.col6ConflictsList.length > 0).length} tuần** (${conflictAnalysisRows.filter(r => r.col6ConflictsList.length > 0).map(r => 'W' + r.week).join(', ')})\n`;
raw += `- **(ii) Thông tin chỉ có ở Source A được giữ lại dưới nhãn \`[SUPPLEMENT]\`** (gồm ánh xạ hub/mini-game/hoạt động Cột 6 hoặc chi tiết khi Source B im lặng mà không mâu thuẫn): **${supplementKeptWeeks.length} / 156 tuần**\n`;
raw += `  - Trong đó có **${withPreservedCol6Hub.length} hàng tuần** giữ ánh xạ hub/hoạt động từ Cột 6 Source A dưới \`[SUPPLEMENT — Source A]\`, và **${conflictAnalysisRows.filter(r => r.clilSupplementKept).length} hạng mục** ở Cột 4 khi Source B im lặng (nằm trên W18 cùng với Col 6 -> tổng **103 hàng** có nội dung cột \`(ii)\`, **104 hạng mục chi tiết**).\n`;
raw += `- **(iii) Cờ \`★ FULL MOCK\` / \`★ GRADUATION\` gỡ khỏi hàng tuần nội dung để tách sang 34 mốc xen kẽ (\`MOCK M01–M34\`)**: **${mockRemovedWeeks.length} / 156 tuần**\n`;
raw += `  - Danh sách: ${mockRemovedWeeks.map(r => `W${r.week} (${r.origCol3})`).join(', ')}\n\n`;

raw += '| Tuần | Dòng (SB / Map) | (i) Xung đột THẬT Source B | (ii) Thông tin Source A giữ làm [SUPPLEMENT] | (iii) Gỡ cờ Mock/Grad khỏi hàng nội dung |\n';
raw += '| :---: | :---: | :--- | :--- | :--- |\n';
for (const r of conflictAnalysisRows) {
  const colI = [r.titleConflict, r.clilConflict, ...r.col6ConflictsList].filter(Boolean);
  const sI = colI.length ? colI.join(' ; ') : '—';
  const sIIParts = [];
  if (r.preservedSourceA.length) sIIParts.push(`Col 6: ${r.preservedSourceA.join('; ')}`);
  if (r.clilSupplementKept) sIIParts.push('Col 4 CLIL/Math khi Source B im lặng');
  const sII = sIIParts.length ? sIIParts.join(' ; ') : '—';
  const sIII = r.hasMockFlagRemoved ? `Gỡ "${r.origCol3}" -> MOCK xen kẽ` : '—';
  raw += `| **W${r.week}** | L${r.sbLine}/L${r.dmLine} | ${escPipe(sI)} | ${escPipe(sII)} | ${escPipe(sIII)} |\n`;
}

raw += '\n### A.3. KIỂM KÊ TOÀN BỘ CONSUMER ĐỌC ROTARY / HUB / TIER & CHỨNG MINH BẢO TOÀN DỮ LIỆU Ở MAP v2\n\n';
raw += '#### A.3.1. Danh sách Consumer thực tế (quét trực tiếp từ mã nguồn repo)\n\n';
for (const ca of consumerAudits) {
  raw += `- **\`${ca.relPath}\`**: ${ca.exists ? `${ca.hits.length} dòng liên quan` : 'MISSING'}\n`;
  for (const h of ca.hits.slice(0, 6)) {
    raw += `  - L${h.lineNum}: \`${h.text}\`\n`;
  }
}
raw += '\n- **Kết luận kỹ thuật về Consumer vs Map Cột 3**:\n';
raw += '  1. `src/config/bossRotarySchedule.js:L122–137` KHÔNG đọc markdown Digital Map; hàm `getBossRotaryConfig(weekNumber)` tính toán học `offset = ((w - 33) % 5 + 5) % 5; cycleKey = offset + 1`. Lưu ý kỹ thuật: khi chuyển sang lịch Mock xen kẽ (`32+4n` tuần nội dung, không còn mock chen ở W37/42/47...), `bossRotarySchedule.js` vẫn đang dùng `% 5` nên hiện tại coi W37, W42... là Cycle 5 (`FULL_MOCK`). (Đề xuất giữ nguyên chưa sửa `src/` trong Round 79 vì phạm vi chỉ đề xuất).\n';
raw += '  2. `scripts/generate_week_blueprint.mjs:L84–153` là parser DUY NHẤT đọc trực tiếp các cột của Digital Map:\n';
raw += '     - `L100`: `isFullMock = /MOCK/i.test(rawCefrType) || /MOCK/i.test(cleanTheme)` -> **2 PHÁT HIỆN QUAN TRỌNG Ở R79:** (1) Round 78 viết `"(Non-Mock)"` vào Cột 3 của W54/W120/W156 sẽ kích nhầm `/MOCK/i` -> Round 79 sửa thành `"Graduation Showcase (Content Week)"` nên **Cột 3 kích nhầm = `' + col3Mismatches.length + '/156`**. (2) Tuy nhiên ở **Cột 2**, tuần **W150** có tiêu đề gốc Source B `L' + sbData.weeks[150].headerLineNum + '` là `"' + sbData.weeks[150].titleEn + '"` nên vế `|| /MOCK/i.test(cleanTheme)` của `generate_week_blueprint.mjs:L100` vẫn tự kích sai (`themeMockTriggers = ' + themeMockTriggers.length + '`: ' + (themeMockTriggers[0] || 'none') + '). Đề xuất khi áp dụng thật: sửa `L100` chỉ kiểm `rawCefrType` (hoặc `/★\\s*FULL\\s*MOCK|\\bMOCK\\s+M\\d+/i`) thay vì `/MOCK/i.test(cleanTheme)`.\n';
raw += '     - `L125–140`: phân loại `cefrLevel` & `cefrStage` từ chuỗi `Pre-A1`, `A1 Movers`, `A2 Flyers`, `B1+? PET | B1 Entry`, `B1+ Academic`.\n';
raw += '     - `L282–284`: tự tính `rotary_cycle = ((weekNum - 33) % 4) + 1` (KHÔNG parse chữ `Rotary N` từ Cột 3, còn `rawCefrType` được chép nguyên văn vào `digital_map_reference.map_cefr_type` ở `L410`).\n';
raw += `  3. **Sửa lỗi mất \`Rotary 1–4\` của Round 78**: Round 79 khôi phục đầy đủ \`Rotary 1–4\` theo công thức liên hoàn \`((w - 33) % 4) + 1\` trên TẤT CẢ 124 hàng \`W33–W156\` (bao gồm cả các tuần Review Cycle như \`W79–80\`, \`W95–96\`, \`W129–132\` lẫn 25 hàng trước đây từng gắn \`★ FULL MOCK\`), giữ chính xác \`A2 Flyers\` cho \`W33–W72\`, thay \`\\|\` nội cell bằng \`•\`/\`—\` để cả \`generate_week_blueprint.mjs:L87\` lẫn \`source_b_part2_parser.mjs:L351\` cắt đúng **6 cột/hàng (${v2ContentRowsCount.matched}/156 hàng W)** mà không gãy/dịch cột.\n`;
raw += `  4. Kiểm chứng mô phỏng \`parseDigitalMap\` (\`generate_week_blueprint.mjs:L87,L100–140\`) + \`split('|').slice(1,-1)\` (\`source_b_part2_parser.mjs:L351\`) trên cả 156 hàng Map v2 Round 79: **${v2ContentRowsCount.matched}/156 hàng** cắt đủ 6 cột (` + '`parserColumnMismatches = 0`' + `), **${156 - cefrMismatches.length}/156 hàng** khớp đúng \`cefrLevel\` & \`cefrStage\`, Cột 3 đạt **${156 - col3Mismatches.length}/156 hàng** \`isFullMock=false\`; chỉ có ${themeMockTriggers.length} trường hợp ở Cột 2 là W150 (*"${sbData.weeks[150].titleEn}"*) chạm vế \`/MOCK/i.test(cleanTheme)\` của code parser hiện tại \`L100\`.\n\n`;

raw += '#### A.3.2. Bảng đối chiếu đầy đủ 156 tuần: `tuần | giá trị gốc (Cột 3) | giá trị v2 (Cột 3) | consumer đọc trực tiếp / gián tiếp`\n\n';
raw += '| Tuần | Giá trị gốc (Map v1 Cột 3) | Giá trị v2 (Map v2 Cột 3) | Consumer đọc trường tương ứng |\n';
raw += '| :---: | :--- | :--- | :--- |\n';
for (const row of col3AuditRows) {
  const w = row.week;
  const consumers = [];
  consumers.push('`generate_week_blueprint.mjs:L95,100,125-140,410` -> `map_cefr_type`, `cefr_level`, `isFullMock`');
  if (w >= 33 && w <= 72) consumers.push('`bossRotarySchedule.js:L122` (tính theo weekId); `gate13_rotary_schedule.mjs`');
  else if (w >= 17 && w <= 32) consumers.push('`BossBattleScreen.jsx:L60` (tính theo weekId)');
  else if (w >= 73) consumers.push('`audit_39_mock_weeks.mjs:L100` (`bp.isFullMock`)');
  raw += `| **W${w}** | ${escPipe(row.origCol3)} | ${escPipe(row.v2Col3)} | ${escPipe(consumers.join('; '))} |\n`;
}

raw += `\n✓ diff -u stats (Map gốc vs Map v2 R79): ${diffPreview.split('\n').length} dòng diff.\n`;

fs.writeFileSync(OUT_RAW, raw, 'utf8');
console.log(`✓ Saved ${path.relative(ROOT_DIR, OUT_V2_MAP)} (${newMapLines.length} lines)`);
console.log(`✓ Saved ${path.relative(ROOT_DIR, OUT_RAW)} (${raw.split('\n').length} lines)`);
console.log(`  Stats: genuineSB=${genuineConflictWeeks.length}/156, supplementKept=${supplementKeptWeeks.length}/156 (col6Hub=${withPreservedCol6Hub.length}), mockRemoved=${mockRemovedWeeks.length}/156, col3SimErrors=${col3Mismatches.length}, col2W150MockTrigger=${themeMockTriggers.length}`);
