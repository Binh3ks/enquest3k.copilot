/**
 * scripts/generate_round80_decisions_and_proposals.mjs
 *
 * ROUND 80 PRIORITY 2 — APPLY OWNER 2026-11-11 RULINGS + READ-ONLY ROTARY PROPOSAL + C.8 RE-VERIFY
 * Zero mutations to:
 *   - src/config/bossRotarySchedule.js (read-only proposal only)
 *   - docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md
 *   - src/data/weeks/week_33..37/, blueprint.json, docs/agent_artifacts/staging/
 *
 * Outputs:
 *   1. docs/agent_artifacts/round80_proposed_digital_map_v2.md
 *   2. docs/agent_artifacts/round80_mock_format_and_rotary_proposal.md
 *   3. docs/agent_artifacts/round80_decisions_raw.txt
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import getBossRotaryConfig, { getRotaryTaskLabel } from '../src/config/bossRotarySchedule.js';
import { parseSourceBPartII } from './lib/source_b_part2_parser.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');

// ---------------------------------------------------------------------------
// 1. Item 4: Transform R79 Map v2 -> R80 Map v2 (Apply PET to M24-M34 ONLY)
// ---------------------------------------------------------------------------
const r79MapPath = path.join(ROOT_DIR, 'docs/agent_artifacts/round79_proposed_digital_map_v2.md');
const r79MapText = fs.readFileSync(r79MapPath, 'utf8');
const r79Lines = r79MapText.split('\n');

const changedMapLines = [];
const r80Lines = r79Lines.map((line, idx) => {
  const lineNo = idx + 1;
  let updated = line;

  // Header & status lines
  if (line.includes('[PROPOSED v2 — ROUND 79]')) {
    updated = updated.replace('[PROPOSED v2 — ROUND 79]', '[PROPOSED v2 — ROUND 80]');
  } else if (line.includes('ROUND 79 PROPOSAL ONLY')) {
    updated =
      '> **TRẠNG THÁI ĐỀ XUẤT (ROUND 80 PROPOSAL ONLY — KHÔNG SỬA FILE GỐC):** Kế thừa nguyên vẹn Map v2 Round 79 đồng bộ **Source B Part II** (`156` tuần nội dung, bảo toàn `[SUPPLEMENT — Source A]` và `Rotary 1–4`), và **áp dụng Quyết định Owner 2026-11-11**: định dạng **PET** áp dụng cho toàn bộ **21 Mock sau W72 (`M14–M34`, gồm `M24–M34`, không có ngoại lệ `B1+ Academic`)**. Riêng nhãn CEFR tuần nội dung **`W113–W120` (`B.5`) vẫn giữ nguyên `[CHỜ OWNER]`** theo đúng chỉ đạo.';
  } else if (line.startsWith('**Mock Test Cadence**:')) {
    updated =
      '**Mock Test Cadence**: 34 Interleaved Mock Checkpoints (33 ngoài Lite Mode + 1 M01 Deferred Lite Mode; `M14–M34` = B1 PET [Confirmed Decision 6 — Owner 2026-11-11])  ';
  } else if (line.includes('2. **Mốc Thi Thử Xen Kẽ')) {
    updated =
      '2. **Mốc Thi Thử Xen Kẽ (Interleaved Mock Checkpoints — 34 mốc quy hoạch)**: Chèn xen kẽ giữa các tuần nội dung (`M01` sau W16 [Deferred Lite Mode]; `M02–M03` sau W24/W32; `M04–M13` Flyers sau `W36..W72`; `M14–M34` B1 PET sau `W76..W156` theo Decision 6 — Owner Ruling 2026-11-11), không gộp lên tuần nội dung Source B.';
  } else if (line.includes('│ B1 PET (10)          │ M14–M23')) {
    updated =
      '│ B1 PET (10+11 = 21)  │ M14–M23 (Sau W76..W112)         │ PET (32+4n, n=11..20; chờ spec code)  │';
  } else if (line.includes('│ Sau W116–W156 (11)')) {
    updated =
      '│ B1 PET (Confirmed)   │ M24–M34 (Sau W116, 120, ...,156)│ PET (Decision 6 Confirmed 2026-11-11)  │';
  } else if (line.includes('M24–M25 sau W116/120 [CHỜ OWNER]')) {
    updated = updated.replace(
      'M24–M25 sau W116/120 [CHỜ OWNER]',
      'M24–M25 sau W116/120 = B1 PET [Decision 6 Confirmed 2026-11-11]'
    );
  } else if (line.includes('Mock chèn xen kẽ M26–M31') && line.includes('giữ `[CHỜ OWNER]`')) {
    updated = updated.replace(
      'giữ `[CHỜ OWNER]`',
      'dùng **B1 PET** (Decision 6 Confirmed 2026-11-11)'
    );
  } else if (line.includes('Mock chèn xen kẽ M32 (sau W148)') && line.includes('giữ `[CHỜ OWNER]`')) {
    updated = updated.replace(
      'giữ `[CHỜ OWNER]`',
      'dùng **B1 PET** (Decision 6 Confirmed 2026-11-11)'
    );
  } else if (/^\|\s*\*\*MOCK M(2[4-9]|3[0-4])/.test(line)) {
    const mMatch = line.match(/MOCK M(\d{2})/);
    const mNum = mMatch ? mMatch[1] : '';
    const mInt = parseInt(mNum, 10);
    const gateNote = mInt === 34 ? 'B1 PET — Final Mock' : 'B1 PET';
    updated = updated
      .replace(/\s*—\s*\[CHỜ OWNER\]\)\*\*/g, `)**`)
      .replace(
        /\*\*★ FULL MOCK (\d+) \(\[CHỜ OWNER\]: PET vs B1\+ Academic\)\*\*/g,
        `**★ FULL MOCK $1 (${gateNote})**`
      )
      .replace(
        /\[CHỜ OWNER\] chốt PET \(Decision 6\) vs B1\+ Academic \(SOP\/ARCH\/MAP\)/g,
        'Cambridge B1 PET (Confirmed Decision 6 — Owner Ruling 2026-11-11; chờ chuẩn hóa `cambridgeExamStandards.js`)'
      );
  } else if (line.includes('`M24–M34` giữ `[CHỜ OWNER]`')) {
    updated = updated.replace(
      '`M24–M34` giữ `[CHỜ OWNER]`',
      '`M14–M34`: **B1 PET** [Confirmed Decision 6 — Owner Ruling 2026-11-11]'
    );
  }

  if (updated !== line) {
    changedMapLines.push({ lineNo, before: line, after: updated });
  }
  return updated;
});

const r80MapPath = path.join(ROOT_DIR, 'docs/agent_artifacts/round80_proposed_digital_map_v2.md');
fs.writeFileSync(r80MapPath, r80Lines.join('\n'), 'utf8');

// Assertions on R80 Map v2:
// (a) ZERO [CHỜ OWNER] on MOCK M01..M34 or M24..M34 lines
const mockPendingRemaining = r80Lines
  .map((l, i) => ({ lineNo: i + 1, l }))
  .filter(({ lineNo, l }) => lineNo !== 3 && /MOCK M|M24–M34|M24–M25|M26–M31/.test(l) && /CHỜ OWNER|PET vs B1\+/i.test(l));
if (mockPendingRemaining.length > 0) {
  throw new Error(`Found remaining pending mock markers: ${JSON.stringify(mockPendingRemaining)}`);
}

// (b) W113-W120 content-week CEFR [CHỜ OWNER] MUST be 100% preserved (8 rows)
const w113To120RowsR79 = r79Lines.filter((l) => /^\|\s*\*\*W1(1[3-9]|20)\*\*/.test(l));
const w113To120RowsR80 = r80Lines.filter((l) => /^\|\s*\*\*W1(1[3-9]|20)\*\*/.test(l));
if (w113To120RowsR79.length !== 8 || JSON.stringify(w113To120RowsR79) !== JSON.stringify(w113To120RowsR80)) {
  throw new Error('W113-W120 content rows were unexpectedly altered!');
}

// Check all 34 MOCK rows in R80 Map v2 + mockFormat in R79 temp blueprints
const mockRowsR80 = r80Lines
  .map((l, i) => ({ lineNo: i + 1, l }))
  .filter(({ l }) => /^\|\s*\*\*MOCK M\d+/.test(l));

const bpMockFormatCheck = [];
for (let w = 76; w <= 156; w += 4) {
  const bpPath = path.join(ROOT_DIR, `docs/agent_artifacts/round79_temp_blueprints/week_${w}_blueprint.json`);
  const bp = JSON.parse(fs.readFileSync(bpPath, 'utf8'));
  bpMockFormatCheck.push({ week: w, mockFormat: bp.mockFormat ?? null, cefr_level: bp.cefr_level });
}

// ---------------------------------------------------------------------------
// 2. Item 5: Rotary Cycle Fix Proposal (READ-ONLY inspection of src/)
// ---------------------------------------------------------------------------
const rotaryPath = path.join(ROOT_DIR, 'src/config/bossRotarySchedule.js');
const rotaryText = fs.readFileSync(rotaryPath, 'utf8');
const rotaryLines = rotaryText.split('\n');

const runtimeSweep = [];
const misfiredWeeks = [];
for (let w = 33; w <= 156; w++) {
  const cur = getBossRotaryConfig(w);
  const proposedCycle = ((w - 33) % 4) + 1;
  const listeningLabel = getRotaryTaskLabel('boss_listening', w);
  const misfired = cur.cycleNumber === 5;
  if (misfired) misfiredWeeks.push(w);
  runtimeSweep.push({
    week: w,
    currentCycle: cur.cycleNumber,
    currentMode: cur.mode || 'ROTARY',
    currentPartCount: cur.partCount,
    currentListeningLabel: listeningLabel,
    proposedContentCycle: proposedCycle,
    misfired,
  });
}

// Inspect exact lines in all callers on disk
function extractConsumerLines(relPath, regex) {
  const abs = path.join(ROOT_DIR, relPath);
  const raw = fs.readFileSync(abs, 'utf8');
  const lines = (raw.endsWith('\n') ? raw.slice(0, -1) : raw).split('\n');
  const hits = [];
  lines.forEach((txt, i) => {
    if (regex.test(txt)) hits.push(`L${i + 1}: ${txt.trimEnd()}`);
  });
  return { file: relPath, totalLines: lines.length, hits };
}

const rotaryConsumers = [
  extractConsumerLines('src/config/bossRotarySchedule.js', /BOSS_ROTARY_CYCLES|cycleKey|offset|getBossRotaryConfig|getRotaryTaskLabel|mode:|partCount/),
  extractConsumerLines('src/modules/zones/BossBattleZone.jsx', /bossRotarySchedule|getBossRotaryConfig|isFullMock|cycleNumber|Cambridge A2 Flyers|activeParts|evaluateMockAssessment/),
  extractConsumerLines('src/components/zones/BossIntro.jsx', /isFullMock|cycleNumber|Flyers Practice|16 Cambridge Parts|max 15 Shields|Cycle \{/),
  extractConsumerLines('src/components/questmap/TaskScreen.jsx', /getRotaryTaskLabel|bossRotarySchedule/),
  extractConsumerLines('scripts/gate13_rotary_schedule.mjs', /bossRotarySchedule|getRotaryConfig|cycleExpectedSkills|cycleNumber|testedSkills/),
];

// ---------------------------------------------------------------------------
// 3. Item 6: Re-verify B.6's C.8 display fix (W129-132 -> Review & Math Logic Cycle [W129-132])
// ---------------------------------------------------------------------------
const sbParsed = parseSourceBPartII(path.join(ROOT_DIR, 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt'));
const c8LiveCheck = [129, 130, 131, 132].map((w) => {
  const sb = sbParsed.weeks[w];
  const spanStr = Array.isArray(sb.rangeSpan) && sb.rangeSpan.length === 2 ? `${sb.rangeSpan[0]}–${sb.rangeSpan[1]}` : String(sb.rangeSpan || w);
  return {
    week: w,
    blockOrigin: sb.blockOrigin,
    titleEn: sb.titleEn,
    rangeSpan: sb.rangeSpan,
    formattedDisplay: `${sb.titleEn} [W${spanStr}]`,
  };
});

// Scan all active R79 & R80 docs/artifacts + temp blueprints for any accidental literal "129,132"
const c8ScanTargets = [
  'docs/agent_artifacts/round79_proposed_digital_map_v2.md',
  'docs/agent_artifacts/round80_proposed_digital_map_v2.md',
  'docs/agent_artifacts/round79_wave3_acceptance_spec_v2.md',
  'docs/agent_artifacts/round79_blueprints_cefr_and_c8_raw.txt',
  'docs/agent_artifacts/round79_digital_map_and_rotary_raw.txt',
  'docs/agent_artifacts/round80_loader_fix_raw.txt',
];
for (let w = 129; w <= 132; w++) {
  c8ScanTargets.push(`docs/agent_artifacts/round79_temp_blueprints/week_${w}_blueprint.json`);
}

const c8ScanResults = c8ScanTargets.map((rel) => {
  const txt = fs.readFileSync(path.join(ROOT_DIR, rel), 'utf8');
  const rawLines = txt.split('\n');
  const badHits = [];
  const goodHits = [];
  rawLines.forEach((l, i) => {
    if (l.includes('129,132')) {
      // Distinguish diagnostic note explaining the old bug vs actual display bug
      const isBugExplanationNote = /C\.8|cũ|bị ép chuỗi|thay vì|instead of|rangeSpan/i.test(l);
      badHits.push({ lineNo: i + 1, isBugExplanationNote, text: l });
    }
    if (/Review & Math Logic Cycle|W129–132|\[W129–132\]/.test(l)) {
      goodHits.push({ lineNo: i + 1, text: l.slice(0, 140) });
    }
  });
  return {
    file: rel,
    unexpected129Comma132: badHits.filter((h) => !h.isBugExplanationNote),
    bugExplanationNotes: badHits.filter((h) => h.isBugExplanationNote),
    goodDisplayCount: goodHits.length,
  };
});

const unexpectedC8Failures = c8ScanResults.filter((r) => r.unexpected129Comma132.length > 0);
if (unexpectedC8Failures.length > 0) {
  throw new Error(`Unexpected 129,132 occurrences found: ${JSON.stringify(unexpectedC8Failures)}`);
}

// ---------------------------------------------------------------------------
// 4. Write docs/agent_artifacts/round80_mock_format_and_rotary_proposal.md
// ---------------------------------------------------------------------------
const propMd = [];
propMd.push('# ROUND 80 — PRIORITY 2: QUYẾT ĐỊNH OWNER (PET) + ĐỀ XUẤT SỬA ROTARY (% 5 -> % 4) + TÁI KIỂM TRA C.8');
propMd.push('');
propMd.push('> **TRẠNG THÁI:** PRIORITY 2 PROPOSAL ONLY — KHÔNG SỬA `src/config/bossRotarySchedule.js`, KHÔNG SỬA `docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md`, KHÔNG ĐỔI `W113–W120` CONTENT CEFR (`[CHỜ OWNER]`), KHÔNG MERGE STAGED WEEKS.');
propMd.push(`> Generated dynamically from repo files at ${new Date().toISOString()}`);
propMd.push('');
propMd.push('## 1. Hạng Mục 4 — Áp Dụng Quyết Định Owner 2026-11-11: PET Cho Toàn Bộ Mock Sau W72 (`M14–M34`)');
propMd.push('');
propMd.push('- **Quyết định hiệu lực:** Theo phán quyết ngày `2026-11-11`, **định dạng B1 Preliminary (PET)** áp dụng cho **tất cả Mock sau W72** (`M14–M34`, gồm 11 Mock `M24–M34` sau W116–W156), giữ nguyên Decision 6 xuyên suốt, không có ngoại lệ B1+ Academic.');
propMd.push(`- **File cập nhật đề xuất:** [\`round80_proposed_digital_map_v2.md\`](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/round80_proposed_digital_map_v2.md) (sinh tự động từ \`round79_proposed_digital_map_v2.md\`, thay đúng **${changedMapLines.length} dòng** liên quan Mock \`M24–M34\`).`);
propMd.push('- **Kiểm tra bảo toàn ranh giới `W113–W120` (`B.5`):**');
propMd.push(`  - Toàn bộ **${w113To120RowsR80.length}/8 dòng tuần nội dung \`W113–W120\`** giữ nguyên 100% nhãn \`[CHỜ OWNER: Phase 2 vs B1+ Academic]\` (không bị thay đổi).`);
propMd.push(`  - Số hàng \`MOCK\` còn nhãn \`[CHỜ OWNER]\` trong \`round80_proposed_digital_map_v2.md\`: **${mockPendingRemaining.length}/34**.`);
propMd.push(`  - Kiểm tra \`docs/agent_artifacts/round79_temp_blueprints/week_{76..156}_blueprint.json\`: **${bpMockFormatCheck.filter((x) => x.mockFormat === 'pet').length}/${bpMockFormatCheck.length}** tuần mốc 4 tuần đều đã mang \`"mockFormat": "pet"\`.`);
propMd.push('');
propMd.push('### Bảng Đối Chiếu 21 Mock Sau W72 (`M14–M34`) Trong Map v2 Round 80:');
propMd.push('| Dòng Map v2 R80 | Mock ID & Vị Trí | Nội Dung Hàng Trong `round80_proposed_digital_map_v2.md` |');
propMd.push('| :---: | :--- | :--- |');
for (const mr of mockRowsR80.filter((r) => /MOCK M(1[4-9]|2\d|3[0-4])/.test(r.l))) {
  const cols = mr.l.split('|').map((c) => c.trim()).filter(Boolean);
  propMd.push(`| L${mr.lineNo} | ${cols[0]} | ${cols[2]} — ${cols[5] || ''} |`);
}
propMd.push('');
propMd.push('---');
propMd.push('');
propMd.push('## 2. Hạng Mục 5 — Đề Xuất Read-Only Sửa `bossRotarySchedule.js` (`% 5` -> `% 4`, Tách Mock Xen Kẽ)');
propMd.push('');
propMd.push('- **Tệp nguồn (GIỮ NGUYÊN KHÔNG SỬA TRONG ROUND 80):** [`src/config/bossRotarySchedule.js`](file:///Users/binhnguyen/projects/Engquest3k/src/config/bossRotarySchedule.js)');
propMd.push('');
propMd.push('### 2.1. Hiện Trạng Runtime Thực Tế (Đo Trực Tiếp Bằng Dynamic Import)');
propMd.push('- Tại `src/config/bossRotarySchedule.js:L127`: `const offset = ((w - 33) % 5 + 5) % 5; const cycleKey = offset + 1;`');
propMd.push(`- Trên dải **124 tuần nội dung \`W33–W156\`**, công thức \`% 5\` hiện tại ép **${misfiredWeeks.length} tuần nội dung** thành \`cycleNumber: 5\` (Full Mock): \`W${misfiredWeeks.join(', W')}\`.`);
propMd.push("- **Phát hiện lỗi kép tại `src/config/bossRotarySchedule.js:L129`:** `BOSS_ROTARY_CYCLES` (`L24–100`) chỉ định nghĩa các key `1, 2, 3, 4, 0` (KHÔNG có key `5`). Khi `cycleKey === 5` (ví dụ `W37, W42`), biểu thức `BOSS_ROTARY_CYCLES[5] || BOSS_ROTARY_CYCLES[1]` rơi về `Cycle 1` (`partCount: 4`, `mode: 'ROTARY'`), nhưng object trả về lại gắn `cycleNumber: 5`, đồng thời `getRotaryTaskLabel()` trả `'Full Mock — ...'` và `BossBattleZone.jsx:L106` + `BossIntro.jsx:L5` kiểm tra `cycleNumber === 5 || cycleNumber === 0` để bật chế độ **16 Parts Full Mock**!");
propMd.push('- **Xung đột với Quyết định Owner Round 75 (Mock xen kẽ):** Theo Round 75, các tuần nội dung Source B đánh số liên tục `W1–W156` KHÔNG bị chiếm làm Full Mock; các bài thi Full Mock được chèn xen kẽ sau `W16 (M01 deferred), W24 (M02), W32 (M03), 32+4n (M04..M34 sau W36, W40, ..., W156)`. Vì vậy tuần nội dung `W33..W156` PHẢI chạy chu kỳ xoay vòng 4 tuần `1 -> 2 -> 3 -> 4 -> 1 -> 2 -> ...` (`W37` là `Cycle 1`, không phải Mock).');
propMd.push('');
propMd.push('### 2.2. Bảng So Sánh `W33–W44` (Hiện Tại `% 5` vs Đề Xuất `% 4`)');
propMd.push('| Week (Source B) | `cycleNumber` hiện tại (`% 5`) | `partCount` hiện tại | `getRotaryTaskLabel("boss_listening", w)` hiện tại | Đề xuất (`% 4`) | Ghi chú Mock Xen Kẽ |');
propMd.push('| :---: | :---: | :---: | :--- | :---: | :--- |');
for (const row of runtimeSweep.filter((r) => r.week <= 44)) {
  const afterNote = [36, 40, 44].includes(row.week) ? `Sau W${row.week} có Mock M0${(row.week - 32) / 4 + 3}` : 'Tuần nội dung thuần';
  propMd.push(
    `| **W${row.week}** | ${row.currentCycle}${row.misfired ? ' (**MISFIRE FULL_MOCK**)' : ''} | ${row.currentPartCount} | ${row.currentListeningLabel} | **Cycle ${row.proposedContentCycle}** | ${afterNote} |`
  );
}
propMd.push('');
propMd.push('### 2.3. Tác Động Lên Toàn Bộ Consumer Trong `src/` & `scripts/`');
for (const c of rotaryConsumers) {
  propMd.push(`- **[\`${c.file}\`](file:///Users/binhnguyen/projects/Engquest3k/${c.file})** (${c.totalLines} dòng):`);
  c.hits.forEach((h) => propMd.push(`  - \`${h}\``));
}
propMd.push('- **Nhận xét tác động chi tiết khi triển khai (khi Owner duyệt ở Round sau):**');
propMd.push('  1. **`BossBattleZone.jsx` (`L43, L106, L113, L281, L325, L359`) & `BossIntro.jsx` (`L5, L19, L24, L57`):** Hai UI này cần phân biệt chế độ Mock dựa trên metadata tường minh (ví dụ `{ isMock: true }` hoặc `blueprint.isFullMock` / route `/mock/:mockId`) thay vì suy diễn `weekNumber` chia hết kiểu `(w - 33) % 5`. Ngoài ra, `BossIntro.jsx:L19` đang render `Cycle {rotaryConfig.cycleNumber}/5` (hiển thị `"Cycle 0/5"` trên Full Mock và mẫu số `/5` thay vì `/4` ở Cycles 1–4), `BossIntro.jsx:L57` hardcode `"Flyers Practice"`, và `BossBattleZone.jsx:L325, L359` hardcode `"Cambridge A2 Flyers"` — cần đồng bộ denominator 4 cycles + nhận exam format (`flyers` vs `pet`).');
propMd.push('  2. **`TaskScreen.jsx` (`L36, L277`):** Hiện gọi `getRotaryTaskLabel(taskId, weekId)` với 2 tham số (`taskId, weekId`, không truyền `options`) — nếu chữ ký `getBossRotaryConfig(weekNumber, options = {})` mặc định `isMock = false` cho tuần nội dung, `TaskScreen.jsx` tự động hiển thị đúng nhãn Rotary 1–4 trên `W37, W42, ...` mà không vỡ API.');
propMd.push('  3. **`scripts/gate13_rotary_schedule.mjs` (`L20–35`):** Hiện tại chỉ kiểm định Cycles `1–4` (`expectedSkills` rỗng khi `cycleNumber === 5`, nên chạy cho `W37` hiện pass rỗng sai lệch). Khi chuyển sang `% 4`, `W37` kiểm tra đúng 4 kỹ năng của Cycle 1.');
propMd.push('  4. **Lưu ý tuần chuyển tiếp `W36/W37` hiện hữu trên đĩa:** `src/data/weeks/week_36` và `week_37` là các stub từ kiến trúc cũ (giữ nguyên chưa sửa trong Round 80). Khi áp dụng bản vá `% 4`, cần đồng bộ cấu trúc dữ liệu `W36/W37` hoặc đánh dấu route Mock tách riêng cho `M04` (sau `W36`).');
propMd.push('');

// Programmatically build unified diff against real src/config/bossRotarySchedule.js and verify via git apply --check
const rotaryRel = 'src/config/bossRotarySchedule.js';
const rotaryAbs = path.join(ROOT_DIR, rotaryRel);
const rotaryOrig = fs.readFileSync(rotaryAbs, 'utf8');
const targetA = [
  'export function getBossRotaryConfig(weekNumber) {',
  '  const w = parseInt(weekNumber, 10);',
  '  if (isNaN(w) || w <= 0) {',
  "    throw new Error(`[bossRotarySchedule] 'weekNumber' is required and must be a valid positive integer. Received: ${weekNumber}`);",
  '  }',
  '  const offset = ((w - 33) % 5 + 5) % 5;',
  '  const cycleKey = offset + 1;',
  '  const cycle = BOSS_ROTARY_CYCLES[cycleKey] || BOSS_ROTARY_CYCLES[1];',
  '  return {',
  '    weekNumber: w,',
  '    cycleNumber: cycleKey,',
].join('\n');
const replaceA = [
  'export function getBossRotaryConfig(weekNumber, options = {}) {',
  '  const w = parseInt(weekNumber, 10);',
  '  if (isNaN(w) || w <= 0) {',
  "    throw new Error(`[bossRotarySchedule] 'weekNumber' is required and must be a valid positive integer. Received: ${weekNumber}`);",
  '  }',
  '  // Round 75 Decision 2: Mocks are interleaved between content weeks (not occupying Source B week numbers).',
  '  // Content weeks W33+ rotate strictly on a 4-week cycle (1..4); Cycle 0 (FULL_MOCK) is opt-in via options.isMock.',
  '  const isMock = Boolean(options?.isMock);',
  '  const offset = ((w - 33) % 4 + 4) % 4;',
  '  const cycleKey = isMock ? 0 : (offset + 1);',
  '  const cycle = BOSS_ROTARY_CYCLES[cycleKey] || BOSS_ROTARY_CYCLES[1];',
  '  return {',
  '    weekNumber: w,',
  '    isMock,',
  '    cycleNumber: cycleKey,',
].join('\n');
const targetB = [
  'export function getRotaryTaskLabel(taskId, weekNumber) {',
  '  if (!weekNumber) {',
  "    throw new Error(`[bossRotarySchedule] 'weekNumber' is required for getRotaryTaskLabel('${taskId}'). Received: ${weekNumber}`);",
  '  }',
  '  const config = getBossRotaryConfig(weekNumber);',
].join('\n');
const replaceB = [
  'export function getRotaryTaskLabel(taskId, weekNumber, options = {}) {',
  '  if (!weekNumber) {',
  "    throw new Error(`[bossRotarySchedule] 'weekNumber' is required for getRotaryTaskLabel('${taskId}'). Received: ${weekNumber}`);",
  '  }',
  '  const config = getBossRotaryConfig(weekNumber, options);',
].join('\n');
if (!rotaryOrig.includes(targetA) || !rotaryOrig.includes(targetB)) {
  throw new Error('Expected source blocks not found in src/config/bossRotarySchedule.js');
}
const rotaryProposed = rotaryOrig.replace(targetA, replaceA).replace(targetB, replaceB);
const tmpRotary = path.join(os.tmpdir(), `bossRotarySchedule.proposed.${process.pid}.js`);
fs.writeFileSync(tmpRotary, rotaryProposed, 'utf8');
let rotaryPatchText = '';
try {
  const diffRes = spawnSync('git', ['diff', '--no-index', '--', rotaryAbs, tmpRotary], {
    cwd: ROOT_DIR,
    encoding: 'utf8',
  });
  if (diffRes.status !== 1 || !diffRes.stdout) {
    throw new Error(`Unexpected git diff --no-index status=${diffRes.status}: ${diffRes.stderr}`);
  }
  rotaryPatchText = diffRes.stdout
    .split('\n')
    .filter((l) => !l.startsWith('index '))
    .map((l) => {
      if (l.startsWith('diff --git ')) return `diff --git a/${rotaryRel} b/${rotaryRel}`;
      if (l.startsWith('--- ')) return `--- a/${rotaryRel}`;
      if (l.startsWith('+++ ')) return `+++ b/${rotaryRel}`;
      return l;
    })
    .join('\n');
  const applyRes = spawnSync('git', ['apply', '--check', '-'], {
    cwd: ROOT_DIR,
    input: rotaryPatchText,
    encoding: 'utf8',
  });
  if (applyRes.status !== 0) {
    throw new Error(`Generated Rotary unified diff failed git apply --check: ${applyRes.stderr}`);
  }
} finally {
  if (fs.existsSync(tmpRotary)) fs.unlinkSync(tmpRotary);
}

propMd.push('### 2.4. Đề Xuất Bản Vá Read-Only Cho `src/config/bossRotarySchedule.js` (Chưa Áp Dụng — Đã Kiểm Chứng `git apply --check`)');
propMd.push('```diff');
propMd.push(rotaryPatchText.trimEnd());
propMd.push('```');
propMd.push('');
propMd.push('---');
propMd.push('');
propMd.push('## 3. Hạng Mục 6 — Tái Kiểm Tra Sửa Lỗi Hiển Thị B.6 / C.8 (`W129–132`)');
propMd.push('');
propMd.push('- **Kiểm tra trực tiếp `parseSourceBPartII()` cho `W129–W132`:**');
for (const row of c8LiveCheck) {
  propMd.push(
    `  - \`W${row.week}\`: \`blockOrigin=${row.blockOrigin}\`, \`rangeSpan=${JSON.stringify(row.rangeSpan)}\`, \`titleEn=${JSON.stringify(row.titleEn)}\` -> hiển thị chuẩn: **\`${row.formattedDisplay}\`**`
  );
}
propMd.push('- **Quét tự động toàn bộ file/artifact R79 & R80 tìm chuỗi lỗi `"129,132"`:**');
propMd.push('| File | Chuỗi lỗi hiển thị `"129,132"` | Dòng chú thích giải thích bug lịch sử | Số dòng hiển thị chuẩn `Review & Math Logic Cycle` / `W129–132` |');
propMd.push('| :--- | :---: | :---: | :---: |');
for (const r of c8ScanResults) {
  propMd.push(
    `| \`${r.file}\` | **${r.unexpected129Comma132.length}** | ${r.bugExplanationNotes.length} | **${r.goodDisplayCount}** |`
  );
}
propMd.push('');

const propMdPath = path.join(ROOT_DIR, 'docs/agent_artifacts/round80_mock_format_and_rotary_proposal.md');
fs.writeFileSync(propMdPath, propMd.join('\n'), 'utf8');

// ---------------------------------------------------------------------------
// 5. Write raw audit evidence: docs/agent_artifacts/round80_decisions_raw.txt
// ---------------------------------------------------------------------------
const rawOut = [];
rawOut.push('========================================================================');
rawOut.push('ROUND 80 PRIORITY 2 — RAW VERIFICATION OUTPUT');
rawOut.push(`Timestamp: ${new Date().toISOString()}`);
rawOut.push(`round80_proposed_digital_map_v2.md sha256: ${sha256(fs.readFileSync(r80MapPath))}`);
rawOut.push(`round80_mock_format_and_rotary_proposal.md sha256: ${sha256(fs.readFileSync(propMdPath))}`);
rawOut.push('========================================================================\n');

rawOut.push('### [1] ITEM 4 — DIFF R79 Map v2 -> R80 Map v2 (PET Applied to M24-M34; W113-W120 Untouched)');
rawOut.push(`Changed lines count: ${changedMapLines.length}`);
rawOut.push(`Pending [CHỜ OWNER] remaining on MOCK M* lines: ${mockPendingRemaining.length}`);
rawOut.push(`Preserved W113-W120 content rows count: ${w113To120RowsR80.length}/8 (exact byte equality with R79: ${JSON.stringify(w113To120RowsR79) === JSON.stringify(w113To120RowsR80)})`);
rawOut.push('');
for (const d of changedMapLines) {
  rawOut.push(`--- L${d.lineNo}`);
  rawOut.push(`- ${d.before}`);
  rawOut.push(`+ ${d.after}`);
}

rawOut.push('\n### [2] ITEM 4 — R79 TEMP BLUEPRINTS mockFormat CHECK (W76..W156, step 4)');
for (const b of bpMockFormatCheck) {
  rawOut.push(`W${b.week}: mockFormat=${JSON.stringify(b.mockFormat)} | cefr_level=${JSON.stringify(b.cefr_level)}`);
}

rawOut.push('\n### [3] ITEM 4 — VERBATIM PRESERVED W113-W120 CONTENT ROWS IN R80 MAP v2');
w113To120RowsR80.forEach((l) => rawOut.push(l));

rawOut.push('\n### [4] ITEM 5 — LIVE bossRotarySchedule.js SWEEP (W33-W156)');
rawOut.push(`Total weeks swept: ${runtimeSweep.length} (W33..W156)`);
rawOut.push(`Weeks falsely triggering cycleNumber=5 under current %5: ${misfiredWeeks.length} -> [${misfiredWeeks.join(', ')}]`);
for (const row of runtimeSweep.slice(0, 20)) {
  rawOut.push(
    `W${row.week}: current(cycle=${row.currentCycle}, mode=${row.currentMode}, parts=${row.currentPartCount}, label="${row.currentListeningLabel}") -> proposed(cycle=${row.proposedContentCycle})`
  );
}
rawOut.push('... (remaining W53..W156 %5 misfire weeks: ' + misfiredWeeks.filter((w) => w >= 53).join(', ') + ')');

rawOut.push('\n### [5] ITEM 6 — C.8 W129-132 RE-VERIFICATION RAW');
for (const r of c8LiveCheck) {
  rawOut.push(JSON.stringify(r));
}
for (const s of c8ScanResults) {
  rawOut.push(
    `SCAN ${s.file}: unexpected_129_132=${s.unexpected129Comma132.length}, explanatory_notes=${s.bugExplanationNotes.length}, good_display_hits=${s.goodDisplayCount}`
  );
}

const rawPath = path.join(ROOT_DIR, 'docs/agent_artifacts/round80_decisions_raw.txt');
fs.writeFileSync(rawPath, rawOut.join('\n') + '\n', 'utf8');

console.log(`✓ Generated: ${path.relative(ROOT_DIR, r80MapPath)} (${changedMapLines.length} lines updated)`);
console.log(`✓ Generated: ${path.relative(ROOT_DIR, propMdPath)}`);
console.log(`✓ Generated: ${path.relative(ROOT_DIR, rawPath)}`);
console.log(`✓ Verified:  W113-W120 preserved=8/8, M24-M34 pending=0, C.8 unexpected '129,132'=0, %5 misfire weeks=${misfiredWeeks.length}`);
