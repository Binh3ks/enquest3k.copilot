/**
 * scripts/apply_mock_schedule_flags.mjs
 * 
 * ENGQUEST3K — APPLY 39-WEEK MOCK SCHEDULE FLAGS TO BLUEPRINTS
 * 
 * Round 65 Task 1:
 *   - 16 Retired Weeks (Old Mock -> Rotary): isFullMock: false, week_type: "rotary_practice"
 *   - 29 New Mock Weeks: isFullMock: true, week_type: "full_mock", mockFormat: "flyers" / "pet"
 *   - 10 Retained Mock Weeks: add mockFormat: "flyers" / "pet"
 *   - Generates docs/agent_artifacts/round65_blueprint_flag_diffs.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const RETIRED_MOCKS = [37, 42, 47, 57, 62, 67, 77, 82, 87, 97, 102, 107, 127, 137, 142, 147];
const NEW_MOCKS_FLYERS = [4, 8, 12, 20, 28, 36, 40, 44, 48, 56, 60, 64, 68];
const NEW_MOCKS_PET = [76, 80, 84, 88, 96, 100, 104, 108, 116, 120, 124, 128, 136, 140, 144, 148];
const RETAINED_MOCKS = [16, 24, 32, 52, 72, 92, 112, 132, 152, 156];

console.log('========================================================================');
console.log('🔧 APPLYING 39-WEEK MOCK SCHEDULE FLAGS TO BLUEPRINT FILES');
console.log('========================================================================');

const changes = [];

// 1. Process 16 Retired Weeks
for (const w of RETIRED_MOCKS) {
  const p = path.join(ROOT_DIR, `src/data/weeks/week_${w}/blueprint.json`);
  if (!fs.existsSync(p)) throw new Error(`Missing blueprint: ${p}`);
  const raw = fs.readFileSync(p, 'utf8');
  const bp = JSON.parse(raw);

  const before = {
    week: w,
    isFullMock: bp.isFullMock,
    week_type: bp.week_type,
    mockFormat: bp.mockFormat || null
  };

  bp.isFullMock = false;
  bp.week_type = 'rotary_practice';
  delete bp.mockFormat;

  fs.writeFileSync(p, JSON.stringify(bp, null, 2) + '\n', 'utf8');

  changes.push({
    category: 'RETIRED (Old Mock -> Rotary Practice)',
    week: w,
    stage: w <= 72 ? 1 : 2,
    theme: bp.theme,
    before,
    after: { isFullMock: bp.isFullMock, week_type: bp.week_type, mockFormat: null }
  });
  console.log(`  ✓ W${String(w).padStart(3)}: isFullMock: true -> false, week_type -> rotary_practice`);
}

// 2. Process 29 New Mock Weeks
for (const w of [...NEW_MOCKS_FLYERS, ...NEW_MOCKS_PET]) {
  const p = path.join(ROOT_DIR, `src/data/weeks/week_${w}/blueprint.json`);
  if (!fs.existsSync(p)) throw new Error(`Missing blueprint: ${p}`);
  const raw = fs.readFileSync(p, 'utf8');
  const bp = JSON.parse(raw);

  const format = w <= 72 ? 'flyers' : 'pet';
  const before = {
    week: w,
    isFullMock: bp.isFullMock,
    week_type: bp.week_type,
    mockFormat: bp.mockFormat || null
  };

  bp.isFullMock = true;
  bp.week_type = 'full_mock';
  bp.mockFormat = format;

  fs.writeFileSync(p, JSON.stringify(bp, null, 2) + '\n', 'utf8');

  changes.push({
    category: `NEW MOCK (Rotary -> Full Mock [${format.toUpperCase()}])`,
    week: w,
    stage: w <= 72 ? 1 : 2,
    theme: bp.theme,
    before,
    after: { isFullMock: bp.isFullMock, week_type: bp.week_type, mockFormat: bp.mockFormat }
  });
  console.log(`  ✓ W${String(w).padStart(3)}: isFullMock: false -> true, week_type -> full_mock, mockFormat: "${format}"`);
}

// 3. Process 10 Retained Mock Weeks (add mockFormat)
for (const w of RETAINED_MOCKS) {
  const p = path.join(ROOT_DIR, `src/data/weeks/week_${w}/blueprint.json`);
  if (!fs.existsSync(p)) throw new Error(`Missing blueprint: ${p}`);
  const raw = fs.readFileSync(p, 'utf8');
  const bp = JSON.parse(raw);

  const format = w <= 72 ? 'flyers' : 'pet';
  const before = {
    week: w,
    isFullMock: bp.isFullMock,
    week_type: bp.week_type,
    mockFormat: bp.mockFormat || null
  };

  bp.isFullMock = true;
  bp.week_type = 'full_mock';
  bp.mockFormat = format;

  fs.writeFileSync(p, JSON.stringify(bp, null, 2) + '\n', 'utf8');

  changes.push({
    category: `RETAINED MOCK (Added mockFormat [${format.toUpperCase()}])`,
    week: w,
    stage: w <= 72 ? 1 : 2,
    theme: bp.theme,
    before,
    after: { isFullMock: bp.isFullMock, week_type: bp.week_type, mockFormat: bp.mockFormat }
  });
  console.log(`  ✓ W${String(w).padStart(3)}: Added mockFormat: "${format}" (Retained Full Mock)`);
}

// Sort by week number
changes.sort((a, b) => a.week - b.week);

// 4. Generate Markdown Report
let md = '# BÁO CÁO THAY ĐỔI CỜ BLUEPRINT.JSON (ROUND 65 — LỊCH MOCK 39 TUẦN)\n\n';
md += '> **Tổng số tuần áp dụng cập nhật:** 55 tuần (16 retired + 29 newly promoted + 10 retained)\n';
md += '> **Tổng số tuần không đổi (Rotary chuẩn):** 101 tuần\n';
md += '> **Tổng cộng toàn khóa:** 156 tuần (39 tuần Mock + 117 tuần Rotary Practice)\n\n';

md += '## I. BẢNG CHI TIẾT THAY ĐỔI CỜ TRƯỚC / SAU (BEFORE vs AFTER)\n\n';
md += '| Tuần | Phân loại | Stage & Định dạng | Chủ đề trong Blueprint | Trước thay đổi | Sau thay đổi |\n';
md += '| :---: | :--- | :---: | :--- | :--- | :--- |\n';

for (const c of changes) {
  const bStr = `isFullMock: \`${c.before.isFullMock}\`<br>week_type: \`"${c.before.week_type}"\`<br>mockFormat: \`${c.before.mockFormat || 'null'}\``;
  const aStr = `isFullMock: \`${c.after.isFullMock}\`<br>week_type: \`"${c.after.week_type}"\`<br>mockFormat: \`${c.after.mockFormat ? '"' + c.after.mockFormat + '"' : 'null'}\``;
  md += `| **W${c.week}** | ${c.category} | Stage ${c.stage} | ${c.theme || 'N/A'} | ${bStr} | ${aStr} |\n`;
}

md += '\n## II. TỔNG KẾT THEO NHÓM ĐIỀU CHỈNH\n\n';
md += '1. **Nhóm 16 Tuần Hủy Mock (Retired to Rotary Practice):**\n';
md += '   - `W37, W42, W47, W57, W62, W67, W77, W82, W87, W97, W102, W107, W127, W137, W142, W147`\n';
md += '   - Cờ đã đổi: `isFullMock: false`, `week_type: "rotary_practice"`, xóa `mockFormat`.\n';
md += '   - Tái gia nhập hàng đợi sản xuất Rotary Practice chuẩn (15 Quests) cho các Wave tiếp theo.\n\n';

md += '2. **Nhóm 29 Tuần Nâng Cấp Mock Mới (Newly Promoted to Full Mock):**\n';
md += '   - Stage 1 Flyers (13 tuần): `W4, W8, W12, W20, W28, W36, W40, W44, W48, W56, W60, W64, W68` (`mockFormat: "flyers"`)\n';
md += '   - Stage 2 PET (16 tuần): `W76, W80, W84, W88, W96, W100, W104, W108, W116, W120, W124, W128, W136, W140, W144, W148` (`mockFormat: "pet"`)\n';
md += '   - Cờ đã đổi: `isFullMock: true`, `week_type: "full_mock"`.\n\n';

md += '3. **Nhóm 10 Tuần Giữ Nguyên Mock (Retained Mocks):**\n';
md += '   - `W16, W24, W32, W52, W72, W92, W112, W132, W152, W156`\n';
md += '   - Giữ nguyên `isFullMock: true`, `week_type: "full_mock"`; bổ sung `mockFormat: "flyers"` (tuần <= 72) hoặc `mockFormat: "pet"` (tuần >= 73).\n\n';

md += '4. **Trường hợp W150 (Giữ nguyên không đổi):**\n';
md += '   - `isFullMock: false`, `week_type: "rotary_practice"`. Theme "Mock Debate & Strategy" là hoạt động tranh biện trên lớp, không phải kỳ thi Cambridge Mock.\n';

const outPath = path.join(ROOT_DIR, 'docs/agent_artifacts/round65_blueprint_flag_diffs.md');
fs.writeFileSync(outPath, md, 'utf8');

console.log('========================================================================');
console.log(`🎉 SUCCESS: Updated ${changes.length} blueprints.`);
console.log(`📝 Generated: docs/agent_artifacts/round65_blueprint_flag_diffs.md`);
console.log('========================================================================\n');
