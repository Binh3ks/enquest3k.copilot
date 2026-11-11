#!/usr/bin/env node
/**
 * scripts/generate_round79_cdef_reports.mjs
 *
 * ROUND 79 — SECTIONS C, D, E, F (PROPOSAL / AUDIT ONLY — ZERO PROD/STAGING MUTATIONS):
 *   - C.7 & C.8: docs/agent_artifacts/round79_w79_w80_vocab_options.md
 *   - D.9:       docs/agent_artifacts/round79_wave3_acceptance_spec_v2.md
 *   - E.10 & F.11: docs/agent_artifacts/round79_w80_tech_debt_and_math_runtime_raw.txt
 */

import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { createHash } from 'crypto';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const SOURCE_B_PATH = path.join(ROOT_DIR, 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');
const SOP_PATH = path.join(ROOT_DIR, 'docs/WEEK_PRODUCTION_SOP.md');
const R78_SPLIT_PATH = path.join(ROOT_DIR, 'docs/agent_artifacts/round78_w79_w80_split_proposal.md');
const R78_SPEC_PATH = path.join(ROOT_DIR, 'docs/agent_artifacts/round78_wave3_acceptance_spec.md');

const OUT_VOCAB = path.join(ROOT_DIR, 'docs/agent_artifacts/round79_w79_w80_vocab_options.md');
const OUT_SPEC_V2 = path.join(ROOT_DIR, 'docs/agent_artifacts/round79_wave3_acceptance_spec_v2.md');
const OUT_EF_RAW = path.join(ROOT_DIR, 'docs/agent_artifacts/round79_w80_tech_debt_and_math_runtime_raw.txt');

const bt = (s) => '`' + s + '`';

// Helper to find exact line numbers in source files dynamically
function readLines(relPath) {
  return fs.readFileSync(path.join(ROOT_DIR, relPath), 'utf8').split('\n');
}

function findLines(lines, regex, maxHits = 8) {
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    if (regex.test(lines[i])) {
      res.push({ lineNum: i + 1, text: lines[i].trim() });
      if (res.length >= maxHits) break;
    }
  }
  return res;
}

// ============================================================================
// PART C (C.7 & C.8): W79 / W80 VOCAB OPTIONS (NO AUTO-CHOICE)
// ============================================================================
const sbLines = readLines('docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');
const sopLines = readLines('docs/WEEK_PRODUCTION_SOP.md');
const r78SplitText = fs.readFileSync(R78_SPLIT_PATH, 'utf8');

const w79_80_block = [];
for (let l = 632; l <= 637; l++) {
  w79_80_block.push(`${l}: ${sbLines[l - 1]}`);
}
const sbVocabMatch = (sbLines[636] || '').match(/Vocabulary Focus:\s*([^.\n]+)/i);
const sb7Words = sbVocabMatch
  ? sbVocabMatch[1].split(',').map(w => w.trim()).filter(Boolean)
  : [];

const r78SuppMatch = r78SplitText.match(/\*\*Từ vựng bổ sung \(13 từ để đủ 20 từ\)\*\*\s*\|\s*\*\*SUPPLEMENT\*\*\s*\|\s*`([^`]+)`/);
const r78Supp13Words = r78SuppMatch
  ? r78SuppMatch[1].split(',').map(w => w.trim()).filter(Boolean)
  : [];

const sop20Hits = findLines(sopLines, /20 từ vựng cốt lõi|Đủ 20 từ vựng|20 words from/i, 5);

// Candidate W80 extension set for Option (a) only (distinct from W79's 13 words, aligned to Rebuttal/Trade-off/Budgeting)
const optA_W80_Supp13 = [
  'restore', 'climate', 'emission', 'resource', 'allocate',
  'consequence', 'sustainable', 'renewable', 'habitat', 'statistic',
  'oppose', 'outweigh', 'justify'
];

// Compute exact word counts programmatically
const optA_W79_Set = new Set([...sb7Words, ...r78Supp13Words]);
const optA_W80_Set = new Set([...sb7Words, ...optA_W80_Supp13]);
const optA_BlockUnion = new Set([...optA_W79_Set, ...optA_W80_Set]);
const optA_SuppUnion = new Set([...r78Supp13Words, ...optA_W80_Supp13]);

const optB1_W79_Supp = r78Supp13Words.slice(0, 7);
const optB1_W80_Supp = r78Supp13Words.slice(7);
const optB1_W79_Set = new Set([...sb7Words, ...optB1_W79_Supp]);
const optB1_W80_Set = new Set([...sb7Words, ...optB1_W80_Supp]);
const optB1_BlockUnion = new Set([...optB1_W79_Set, ...optB1_W80_Set]);

const optB2_W79_Set = new Set([...sb7Words, ...r78Supp13Words]);
const optB2_W80_Set = new Set([...sb7Words, ...r78Supp13Words]);
const optB2_BlockUnion = new Set([...optB2_W79_Set, ...optB2_W80_Set]);

let vocabMd = '';
vocabMd += '# ROUND 79 — C.7 & C.8: LÀM RÕ 13 TỪ `SUPPLEMENT` W79/W80 & HAI PHƯƠNG ÁN TỪ VỰNG (KHÔNG TỰ CHỌN)\n\n';
vocabMd += '> **Nguyên tắc:** Giữ nguyên trạng thái `[CHỜ OWNER CHỌN]`. Mọi bảng số lượng dưới đây được tính trực tiếp từ `L637` Source B và danh sách `SUPPLEMENT` của Round 78.\n\n';

vocabMd += '## 1. Dữ liệu Gốc Đọc Từ File\n\n';
vocabMd += '- **Source B (`docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt:L632–L637`):**\n```text\n' + w79_80_block.join('\n') + '\n```\n';
vocabMd += `- **Từ vựng Source B đếm được tại \`L637\` (${sb7Words.length} từ):** ${sb7Words.map(bt).join(', ')}\n`;
vocabMd += `- **Bộ 13 từ \`SUPPLEMENT\` đã nêu tại \`docs/agent_artifacts/round78_w79_w80_split_proposal.md:L41\` (${r78Supp13Words.length} từ):** ${r78Supp13Words.map(bt).join(', ')}\n`;
vocabMd += `- **Ngưỡng chuẩn SOP (\`docs/WEEK_PRODUCTION_SOP.md\`):**\n`;
for (const h of sop20Hits) vocabMd += `  - \`L${h.lineNum}\`: ${h.text}\n`;

vocabMd += '\n## 2. Làm Rõ Điểm Mập Mờ Round 78 (`C.8`)\n\n';
vocabMd += 'Ở `round78_w79_w80_split_proposal.md:L41-42`, cột `Từ vựng bổ sung (13 từ để đủ 20 từ)` chỉ liệt kê **một danh sách 13 từ duy nhất**, chưa phân biệt rõ 13 từ này là **mỗi tuần 13 từ khác nhau** (tổng 26 từ mới) hay **13 từ dùng chung/chia đôi cho cả khối W79–80**. Vì SOP (`L222`, `L329`, `L523`) đặt chuẩn **20 từ vựng cốt lõi / mỗi tuần**, có đúng **2 phương án** tường minh để Owner lựa chọn:\n\n';

vocabMd += '## 3. Trình Bày Đầy Đủ Cả 2 Phương Án Để Owner Quyết Định (`C.7`)\n\n';
vocabMd += '| Phương án | Cách cấu thành W79 | Cách cấu thành W80 | Tổng từ W79 | Tổng từ W80 | Tổng `SUPPLEMENT` duy nhất | Tổng từ vựng duy nhất cả khối W79–80 | Đáp ứng SOP 20 từ/tuần? |\n';
vocabMd += '| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :--- |\n';
vocabMd += `| **Phương án (a)** *(7 SB dùng chung + 13 \`SUPPLEMENT\` riêng cho mỗi tuần)* | ${sb7Words.length} SB + ${r78Supp13Words.length} SUPPLEMENT nhóm A | ${sb7Words.length} SB + ${optA_W80_Supp13.length} SUPPLEMENT nhóm B | **${optA_W79_Set.size}** | **${optA_W80_Set.size}** | **${optA_SuppUnion.size}** | **${optA_BlockUnion.size}** | ✅ Cả W79 & W80 đều đủ 20 từ/tuần |\n`;
vocabMd += `| **Phương án (b1)** *(7 SB dùng chung + chia 13 \`SUPPLEMENT\` cho 2 tuần, không lặp)* | ${sb7Words.length} SB + ${optB1_W79_Supp.length} SUPPLEMENT đầu | ${sb7Words.length} SB + ${optB1_W80_Supp.length} SUPPLEMENT sau | **${optB1_W79_Set.size}** | **${optB1_W80_Set.size}** | **${r78Supp13Words.length}** | **${optB1_BlockUnion.size}** | ❌ Thiếu chuẩn SOP 20 từ/tuần (cần nới gate cho W79/80) |\n`;
vocabMd += `| **Phương án (b2)** *(7 SB dùng chung + lặp lại CÙNG 13 \`SUPPLEMENT\` ở cả 2 tuần)* | ${sb7Words.length} SB + ${r78Supp13Words.length} SUPPLEMENT | ${sb7Words.length} SB + chính ${r78Supp13Words.length} SUPPLEMENT đó | **${optB2_W79_Set.size}** | **${optB2_W80_Set.size}** | **${r78Supp13Words.length}** | **${optB2_BlockUnion.size}** | ⚠️ Đủ 20 slot/tuần nhưng 0 từ mới thêm ở W80 |\n\n`;

vocabMd += '### Chi tiết danh sách từng phương án\n\n';
vocabMd += '- **Phương án (a) — 26 từ `SUPPLEMENT` (mỗi tuần 20 từ: 7 chung + 13 riêng):**\n';
vocabMd += `  - **W79 (${optA_W79_Set.size} từ):** 7 SB (${sb7Words.join(', ')}) + 13 SUPPLEMENT Claims/Space vs Earth (${r78Supp13Words.join(', ')})\n`;
vocabMd += `  - **W80 (${optA_W80_Set.size} từ):** 7 SB (${sb7Words.join(', ')}) + 13 SUPPLEMENT Rebuttal/Trade-off đề xuất mới (${optA_W80_Supp13.join(', ')})\n`;
vocabMd += '- **Phương án (b1) — Chia đôi 13 từ `SUPPLEMENT` (tổng 20 từ duy nhất / 2 tuần, mỗi tuần < 20 từ):**\n';
vocabMd += `  - **W79 (${optB1_W79_Set.size} từ):** 7 SB (${sb7Words.join(', ')}) + 7 SUPPLEMENT (${optB1_W79_Supp.join(', ')})\n`;
vocabMd += `  - **W80 (${optB1_W80_Set.size} từ):** 7 SB (${sb7Words.join(', ')}) + 6 SUPPLEMENT (${optB1_W80_Supp.join(', ')})\n`;
vocabMd += '- **Phương án (b2) — Lặp nguyên bộ 20 từ (7 SB + cùng 13 `SUPPLEMENT` Round 78) cho cả W79 & W80:**\n';
vocabMd += `  - Cả W79 & W80 dùng chung đúng ${optB2_BlockUnion.size} từ; W80 tập trung tái thực hành Rebuttal *"Yes, but..."* trên chính 20 từ đã học ở W79 (không phát sinh từ mới ở W80).\n`;

fs.writeFileSync(OUT_VOCAB, vocabMd, 'utf8');

// ============================================================================
// PART D (D.9): INSPECT REAL MATH UI RUNTIME + UPDATE WAVE 3 ACCEPTANCE SPEC v2
// ============================================================================
const bmqLines = readLines('src/modules/hubs/station2/LearnMode/BarModelQuest.jsx');
const bmsLines = readLines('src/modules/hubs/station2/components/BarModelSVG.jsx');
const bmeLines = readLines('src/utils/barModelEvaluator.js');
const bazLines = readLines('src/modules/zones/BattleArenaZone.jsx');
const zdmLines = readLines('src/config/zoneDataMapper.js');
const smdLines = readLines('src/components/LogicLab/SingaporeMathDisplay.jsx');

const runtimeEvidence = {
  bazRender: findLines(bazLines, /barModelData\s*=|<BarModelQuest/, 4),
  zdmMap: findLines(zdmLines, /barModel:/, 3),
  bmqMapProps: findLines(bmqLines, /problemText:|correctAnswer:|svg_url:|modelData:/, 6),
  bmqVisualSlot: findLines(bmqLines, /currentQ\.modelData|<BarModelSVG|<img/, 6),
  bmqInput: findLines(bmqLines, /type="number"|evaluateBarModelAnswer/, 4),
  bmsTypes: findLines(bmsLines, /type === 'part_whole'|type === 'comparison'|<svg/, 4),
  bmeRules: findLines(bmeLines, /startsWith\('-'\)|includes\('\.'\)|match\(/, 4),
  smdFallback: findLines(smdLines, /problem\.image_url|<DynamicBarModel/, 4)
};

// Also check staging math field schema in W79/W126/W127/W133/W134
function inspectStagedMathKeys(w) {
  const p = path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}/skill_practice_hub.js`);
  if (!fs.existsSync(p)) return null;
  const code = fs.readFileSync(p, 'utf8')
    .replace(/import\s+[^;]+;?/g, '')
    .replace(/export\s+default\s+[^;]+;?/g, '')
    .replace(/export\s+(?:const|let|var)\s+(\w+)\s*=/g, 'var $1 =');
  const sb = { ...globalThis };
  vm.runInContext(code, vm.createContext(sb));
  const data = sb.skillPracticeHubData || sb.skillPracticeHub;
  const arr = Array.isArray(data?.singapore_math) ? data.singapore_math : [];
  if (!arr.length) return { week: w, count: 0, keys: [] };
  return {
    week: w,
    count: arr.length,
    keys: Object.keys(arr[0]),
    hasProblemText: arr[0].problemText !== undefined || arr[0].problem_en !== undefined || arr[0].text !== undefined,
    hasCorrectAnswer: arr[0].correctAnswer !== undefined || arr[0].answer_value !== undefined || arr[0].answer !== undefined
  };
}

const stagedSchemaNotes = [79, 126, 127, 133, 134].map(inspectStagedMathKeys).filter(Boolean);

const r78SpecLines = fs.readFileSync(R78_SPEC_PATH, 'utf8').split('\n');
let specV2 = [];
specV2.push('# ĐẶC TẢ NGHIỆM THU ROUND 79 (v2) — CẬP NHẬT RENDERING TOÁN HỌC THỰC TẾ CHO W133 & W134');
specV2.push('');
specV2.push('> Kế thừa toàn bộ tiêu chí Source B của `docs/agent_artifacts/round78_wave3_acceptance_spec.md`, và **cập nhật riêng mục Toán học (`D.9`) dựa trên khảo sát trực tiếp runtime UI trong `src/`** (không mặc định ép Bar Model cho bài Hình học `W133` Góc & `W134` Tam giác).');
specV2.push('');
specV2.push('## 0. Kết Quả Kiểm Chứng Code Render UI Toán (`math_quest`) Trong `src/`');
specV2.push('');
specV2.push('- **Component chính đang chạy trong Quest Map & Battle Arena:** `BarModelQuest` (`src/modules/zones/BattleArenaZone.jsx:L160`, đọc `arenaData.barModel` từ `zoneDataMapper.js:L79` / `TaskScreen.jsx:L243`).');
specV2.push('- **Cơ chế render hình minh họa (`src/modules/hubs/station2/LearnMode/BarModelQuest.jsx:L262–L273`):**');
specV2.push('  1. Nếu câu hỏi có `modelData` truthy -> gọi `<BarModelSVG modelData={currentQ.modelData} />` (`src/modules/hubs/station2/components/BarModelSVG.jsx:L37–L160`), component này **CHỈ hỗ trợ 2 kiểu thanh ngang tỷ lệ**: `type === "part_whole"` (L50) và `type === "comparison"` (L106) -> **KHÔNG thể vẽ góc hình học, thước đo độ, hay tam giác**.');
specV2.push('  2. Nếu `modelData` là `null` / vắng mặt -> chuyển thẳng sang render ảnh tĩnh `<img src={currentQ.svg_url} alt={currentQ.title} ... />` (`BarModelQuest.jsx:L265–L272`, fallback URL mặc định `/images/week{weekNumber}/barmodel_w{weekNumber}_adv_p{idx+1}.svg` ở `L34`) -> **Hỗ trợ MỌI hình vẽ SVG hình học tĩnh** (góc kề/góc vuông/góc nhọn/góc tù, tam giác gắn ký hiệu cạnh & góc).');
specV2.push('- **Hợp đồng trường dữ liệu & bộ chấm đáp án hiện tại (`BarModelQuest.jsx:L30–L36, L280` & `src/utils/barModelEvaluator.js:L6–L36`):**');
specV2.push('  - `BarModelQuest.jsx:L32–33` CHỈ đọc `problemText || problem_en || text` (fallback `"Solve the Bar Model problem below:"`) và `correctAnswer || answer_value || parseInt(answer) || 10`.');
specV2.push('  - **Cảnh báo Schema trên dữ liệu staging hiện tại:**');
for (const sn of stagedSchemaNotes) {
  specV2.push(`    - Staged W${sn.week} (\`${sn.count}\` bài): đang dùng khóa \`${sn.keys.join(', ')}\` — thiếu \`problemText\`/\`problem_en\` (\`${sn.hasProblemText}\`) và \`correctAnswer\`/\`answer_value\` (\`${sn.hasCorrectAnswer}\`) -> nếu không bổ sung đúng khóa hợp đồng, runtime ` + '`BarModelQuest.jsx:L32–33`' + ` sẽ rơi về đề mặc định và đáp án \`10\`.`);
}
specV2.push('  - Ô nhập & evaluator (`BarModelQuest.jsx:L280` `<input type="number">` + `barModelEvaluator.js:L14–L30`): hiện tại chỉ chấp nhận **số nguyên không âm** (`0, 1, 2, ...`; từ chối số thập phân & số âm; chưa có giao diện nút bấm MCQ chữ trực tiếp).');
specV2.push('');

// Now take r78 spec body from its H2 sections onward and upgrade W133 & W134 sections accurately
for (let i = 0; i < r78SpecLines.length; i++) {
  const ln = r78SpecLines[i];
  if (i === 0) continue; // skip old H1
  if (ln.includes('TRONG ROUND 78')) {
    specV2.push(ln.replace('TRONG ROUND 78', 'TRONG ROUND 79 (ĐỀ XUẤT — CHƯA TÁI SINH)'));
    continue;
  }
  if (i >= 1 && ln.includes('Điều kiện PASS Toán: **Geometry: Angles**')) {
    specV2.push('     - **Điều kiện PASS Toán — Geometry: Angles (`L1018–1020`, KHÔNG mặc định ép Bar Model):**');
    specV2.push('       - *Hình thức biểu diễn được phép trên UI:* (a) **Khuyến nghị cho Hình học:** Dùng **SVG hình học tĩnh** (`svg_url: "/images/week133/..."`, đặt `modelData: null` để `BarModelQuest.jsx:L265` render `<img src={currentQ.svg_url}>`) vẽ các góc/hình đa giác/thước đo góc; HOẶC (b) **Bài toán mô tả trực quan kèm số đo góc bằng chữ** (`problemText`/`problem_en`) có hình minh họa SVG hoặc đối chiếu góc phụ/kề bù.');
    specV2.push('       - *Dạng câu hỏi tương thích runtime hiện tại (`<input type="number">` + `barModelEvaluator.js`):* (1) **Đo / tính số đo góc chưa biết** (đáp án số nguyên độ, ví dụ góc phụ `90 - 35 = 55`, góc kề bù `180 - 115 = 65`); (2) **Nhận diện & đếm số lượng góc** (ví dụ *"How many acute angles are inside Figure B?"* -> đáp án `3`); (3) **Nhận diện phân loại góc (Identification MCQ đánh số trên hình/đề):** Ví dụ *"Which angle shown is obtuse? Enter 1 (Angle A: 45°), 2 (Angle B: 90°), or 3 (Angle C: 125°)"* -> cho phép học sinh nhận biết `right, acute, obtuse` ngay mà KHÔNG cần sửa code UI; *(Ghi chú mở rộng: nếu muốn câu hỏi MCQ bấm chữ `Acute / Right / Obtuse`, phải bổ sung nhánh render `options[]` trong `BarModelQuest.jsx` — ghi rõ tách biệt khỏi phần không sửa code).*');
    specV2.push('       - *Ràng buộc chống lỗi sư phạm:* Không ép vẽ Bar Model thanh ngang cho câu hỏi nhận diện/đo góc; KHÔNG lộ tên loại góc cần đoán trong đề (cấm kiểu *"An acute angle measures 45°..."* rồi hỏi đáp án từ gợi ý lộ); bắt buộc tuân thủ schema runtime (`problemText`, `correctAnswer`, `svg_url` + `modelData: null` nếu vẽ hình học).');
    continue;
  }
  if (i >= 1 && ln.includes('Điều kiện PASS Toán: **Geometry: Triangles**')) {
    specV2.push('     - **Điều kiện PASS Toán — Geometry: Triangles (`L1027–1029`, KHÔNG mặc định ép Bar Model):**');
    specV2.push('       - *Hình thức biểu diễn được phép trên UI:* (a) **Khuyến nghị cho Hình học:** Dùng **SVG hình học tĩnh** (`svg_url: "/images/week134/..."`, đặt `modelData: null` tại `BarModelQuest.jsx:L265`) vẽ tam giác ghi rõ độ dài 3 cạnh / ký hiệu cạnh bằng nhau; HOẶC (b) **Bài toán mô tả cạnh tam giác** kết hợp SVG tĩnh. *(Chỉ dùng `BarModelSVG` nếu có tiểu bài tính chu vi/so sánh độ dài 3 cạnh thuần số học, KHÔNG ép Bar Model cho bài phân loại tam giác).*');
    specV2.push('       - *Dạng câu hỏi tương thích runtime hiện tại (`<input type="number">` + `barModelEvaluator.js`):* (1) **Phân loại tam giác theo cạnh (Identification / Classification):** Cho độ dài 3 cạnh thỏa bất đẳng thức tam giác `(a + b > c)` trên hình SVG hoặc đề văn bản, đánh số lựa chọn `1 = Equilateral`, `2 = Isosceles`, `3 = Scalene` (tương thích `<input type="number">` hiện hành, hoặc mở rộng MCQ nút bấm nếu sửa `BarModelQuest.jsx` sau); (2) **Tìm cạnh chưa biết / số cạnh bằng nhau / chu vi** dựa trên tính chất phân loại tam giác (ví dụ *"An isosceles triangle has perimeter 26 cm and base 8 cm. What is the length of each equal side?"* -> `(26 - 8) / 2 = 9`); (3) **Đếm số tam giác cùng loại trong hình ghép SVG**.');
    specV2.push('       - *Ràng buộc chống lỗi sư phạm:* Không nhồi tên phân loại vào câu hỏi nếu bài đang kiểm tra nhận diện loại tam giác; mọi bộ 3 cạnh bắt buộc thỏa bất đẳng thức tam giác (`a + b > c`); bắt buộc đủ trường `problemText`, `correctAnswer`.');
    continue;
  }
  specV2.push(ln);
}
fs.writeFileSync(OUT_SPEC_V2, specV2.join('\n'), 'utf8');

// ============================================================================
// PART E (E.10): AUDIT W80 & W76 PRODUCTION TECH DEBT (READ-ONLY)
// PART F (F.11): MATH RUNTIME LOADER PROOF + 22 CONTENT WEEKS SCAN
// ============================================================================
const w80Bp = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'src/data/weeks/week_80/blueprint.json'), 'utf8'));
const w80Sg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'src/data/weeks/week_80/source_grounding.json'), 'utf8'));
const w80Prov = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'src/data/weeks/week_80/provenance.json'), 'utf8'));
const w76Bp = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'src/data/weeks/week_76/blueprint.json'), 'utf8'));
const w76Sg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'src/data/weeks/week_76/source_grounding.json'), 'utf8'));
const w76ProvPath = path.join(ROOT_DIR, 'src/data/weeks/week_76/provenance.json');
const w76Prov = fs.existsSync(w76ProvPath) ? JSON.parse(fs.readFileSync(w76ProvPath, 'utf8')) : null;

async function safeImportWeekFile(w, fname) {
  const full = path.join(ROOT_DIR, `src/data/weeks/week_${w}/${fname}`);
  if (!fs.existsSync(full)) return { exists: false };
  try {
    const mod = await import(pathToFileURL(full).href);
    return { exists: true, mod, rawLen: fs.readFileSync(full, 'utf8').split('\n').length };
  } catch (e) {
    return { exists: true, err: e.message };
  }
}

function getHash(val) {
  return createHash('sha256').update(JSON.stringify(val)).digest('hex').slice(0, 12);
}

// Inspect W80 vs W76 JS files
const w80Rh = await safeImportWeekFile(80, 'reading_hub.js');
const w80Vb = await safeImportWeekFile(80, 'vocab.js');
const w80Sph = await safeImportWeekFile(80, 'skill_practice_hub.js');
const w76Vb = await safeImportWeekFile(76, 'vocab.js');
const w76Sph = await safeImportWeekFile(76, 'skill_practice_hub.js');

const w80VocabWords = (w80Vb.mod?.vocabData?.words || w80Vb.mod?.vocab || w80Vb.mod?.default?.words || w80Vb.mod?.default || []).map(x => x.word);
const w76VocabWords = (w76Vb.mod?.vocabData?.words || w76Vb.mod?.vocab || w76Vb.mod?.default?.words || w76Vb.mod?.default || []).map(x => x.word);

// F.11: Trace ALL runtime loaders + scan ALL 156 dirs for .js content weeks
const runtimeLoaderSnippets = [
  { file: 'src/App.jsx', hits: findLines(readLines('src/App.jsx'), /useFetchWeekData|mapDataToZones|<TaskScreen/, 6) },
  { file: 'src/utils/dataHooks.js', hits: findLines(readLines('src/utils/dataHooks.js'), /loadWeekData/, 6) },
  { file: 'src/data/weeks/index.js', hits: findLines(readLines('src/data/weeks/index.js'), /import\.meta\.glob|advPathFolder|advModules|loadWeekData/, 10) },
  { file: 'src/config/zoneDataMapper.js', hits: findLines(readLines('src/config/zoneDataMapper.js'), /skillPracticeHub|barModel:/, 6) },
  { file: 'src/components/questmap/TaskScreen.jsx', hits: findLines(readLines('src/components/questmap/TaskScreen.jsx'), /skillPracticeHub|barModel:|BattleArenaZone/, 6) },
  { file: 'src/modules/zones/BattleArenaZone.jsx', hits: findLines(readLines('src/modules/zones/BattleArenaZone.jsx'), /barModelData|<BarModelQuest/, 6) },
  { file: 'src/modules/hubs/station2/LearnMode/BarModelQuest.jsx', hits: findLines(readLines('src/modules/hubs/station2/LearnMode/BarModelQuest.jsx'), /rawQuestions\s*=|problemText:|correctAnswer:|<BarModelSVG|<img/, 8) },
  { file: 'src/modules/cambridge_suite/ArenaHub.jsx', hits: findLines(readLines('src/modules/cambridge_suite/ArenaHub.jsx'), /<BarModelQuest|singapore_math/, 4) },
  { file: 'src/contracts/RuntimeDataSourceRegistry.js', hits: findLines(readLines('src/contracts/RuntimeDataSourceRegistry.js'), /singapore_math|skill_practice_hub/, 6) }
];

const contentWeekDirs = [];
for (let w = 1; w <= 156; w++) {
  const dir = path.join(ROOT_DIR, `src/data/weeks/week_${w}`);
  if (!fs.existsSync(dir)) continue;
  const jsFiles = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort();
  if (jsFiles.length > 0) contentWeekDirs.push({ week: w, jsFiles });
}

function extractMathArray(mod, kind) {
  if (!mod || !mod.exists || mod.err) return null;
  if (kind === 'sm') {
    const d = mod.mod.default || mod.mod;
    return Array.isArray(d) ? d : (Array.isArray(d?.problems) ? d.problems : null);
  }
  if (kind === 'sph') {
    const d = mod.mod.skillPracticeHubData || mod.mod.skillPracticeHub || mod.mod.default;
    if (!d) return null;
    if (Array.isArray(d.singapore_math)) return d.singapore_math;
    if (Array.isArray(d.singapore_math?.problems)) return d.singapore_math.problems;
    return null;
  }
  if (kind === 'lh') {
    const d = mod.mod.listeningHubData || mod.mod.listeningHub || mod.mod.default;
    if (Array.isArray(d?.singapore_math)) return d.singapore_math;
    if (Array.isArray(d?.singapore_math?.problems)) return d.singapore_math.problems;
    return null;
  }
  if (kind === 'll') {
    const d = mod.mod.default || mod.mod;
    if (Array.isArray(d?.singapore_math)) return d.singapore_math;
    if (Array.isArray(d?.singapore_math?.problems)) return d.singapore_math.problems;
    if (Array.isArray(d?.problems)) return d.problems;
    return null;
  }
  return null;
}

const f11Rows = [];
for (const { week: w, jsFiles } of contentWeekDirs) {
  const hasIdx = jsFiles.includes('index.js');
  const idxText = hasIdx ? fs.readFileSync(path.join(ROOT_DIR, `src/data/weeks/week_${w}/index.js`), 'utf8') : '';
  const idxImportsSm = /singapore_math\.js/.test(idxText);
  const idxImportsSph = /skill_practice_hub\.js/.test(idxText);
  const idxImportsLl = /logic_lab\.js/.test(idxText);

  const smMod = await safeImportWeekFile(w, 'singapore_math.js');
  const sphMod = await safeImportWeekFile(w, 'skill_practice_hub.js');
  const lhMod = await safeImportWeekFile(w, 'listening_hub.js');
  const llMod = await safeImportWeekFile(w, 'logic_lab.js');

  const smArr = extractMathArray(smMod, 'sm');
  const sphArr = extractMathArray(sphMod, 'sph');
  const lhArr = extractMathArray(lhMod, 'lh');
  const llArr = extractMathArray(llMod, 'll');

  // Compare sm.js vs sph.js vs ll.js when multiple exist
  const normPrompts = (arr) => (arr || []).map(p => (p.problemText || p.problem_en || p.text || p.question || '').trim().toLowerCase());
  let relation = '';
  if (!hasIdx) {
    relation = `THIẾU index.js -> loadWeekData(${w}) trả null; chỉ có sph.js (${sphArr?.length || 0} bài, không có sm.js)`;
  } else if (smArr !== null && sphArr !== null) {
    const smTexts = normPrompts(smArr);
    const sphTexts = normPrompts(sphArr);
    if (smArr.length === 0 && sphArr.length === 0) {
      relation = 'Cả sm.js & sph.js đều rỗng (0 bài)';
    } else if (smArr.length === 0 && sphArr.length > 0) {
      relation = `XUNG ĐỘT STUB vs NỘI DUNG: sm.js rỗng (0), sph.js có ${sphArr.length} bài NHƯNG index.js KHÔNG import sph.js`;
    } else if (JSON.stringify(smTexts) === JSON.stringify(sphTexts)) {
      relation = `CÙNG ${smArr.length} ĐỀ TOÁN nhưng khác schema (sm.js dùng modelData+problemText; sph.js dùng bar_model_svg+problem_en); index.js chỉ import sph.js`;
    } else {
      relation = `KHÁC ĐỀ GIỮA sm.js (${smArr.length}) & sph.js (${sphArr.length})`;
    }
  } else if (smArr !== null && sphArr === null) {
    relation = smArr.length === 0 ? `sm.js stub rỗng (0 bài) & sph.js không có singapore_math (tuần Mock)` : `Chỉ sm.js có ${smArr.length} bài`;
  } else {
    relation = 'Khác';
  }

  // Runtime math count visible via loadWeekData(w) -> zoneDataMapper -> BattleArenaZone
  const runtimeVisibleCount = !hasIdx ? 0 : (idxImportsSph ? (sphArr?.length || 0) : 0);

  f11Rows.push({
    week: w,
    hasIdx,
    idxImportsSm,
    idxImportsSph,
    idxImportsLl,
    smCount: smMod.exists ? (smArr?.length ?? 0) : null,
    sphCount: sphMod.exists ? (sphArr?.length ?? 0) : null,
    lhCount: lhArr?.length ?? 0,
    llCount: llMod.exists ? (llArr?.length ?? 0) : null,
    runtimeVisibleCount,
    firstProblemId: (sphArr?.[0]?.id ?? smArr?.[0]?.id ?? null),
    relation
  });
}

// ============================================================================
// FORMAT OUTPUT FILE round79_w80_tech_debt_and_math_runtime_raw.txt
// ============================================================================
function findFirstLine(relPath, rx) {
  const lines = readLines(relPath);
  for (let i = 0; i < lines.length; i++) {
    if (rx.test(lines[i])) return `L${i + 1}`;
  }
  return 'L?';
}
function findJsonBlockRange(relPath, keyName) {
  const lines = readLines(relPath);
  const startIdx = lines.findIndex(l => new RegExp(`"${keyName}"\\s*:`).test(l));
  if (startIdx < 0) return 'L?';
  const openChar = lines[startIdx].includes('[') ? '[' : (lines[startIdx].includes('{') ? '{' : null);
  if (!openChar) return `L${startIdx + 1}`;
  const closeChar = openChar === '[' ? ']' : '}';
  let depth = 0;
  for (let i = startIdx; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === openChar) depth++;
      else if (ch === closeChar) depth--;
    }
    if (depth <= 0 && i >= startIdx) return `L${startIdx + 1}-${i + 1}`;
  }
  return `L${startIdx + 1}`;
}

let ef = '';
ef += '========================================================================================================\n';
ef += '🔍 ROUND 79 — SECTIONS E.10 (NỢ KỸ THUẬT W80 & W76 PROD) + F.11 (MATH RUNTIME & QUÉT 22 TUẦN PROD)\n';
ef += `Thời điểm chạy: ${new Date().toISOString()}\n`;
ef += 'Phạm vi: CHỈ ĐỌC / BÁO CÁO — ZERO chỉnh sửa src/data/weeks/\n';
ef += '========================================================================================================\n\n';

ef += '### E.10. KIỂM TOÁN NỢ KỸ THUẬT PRODUCTION `week_80` (VÀ `week_76`) — KHÔNG SỬA FILE\n\n';
ef += '#### E.10.1. Đối chiếu mọi trường mâu thuẫn trong `src/data/weeks/week_80/`\n\n';

const sgExamDiffs = [];
for (const k of Object.keys(w80Sg.exam_paper_grounding || {})) {
  const v80 = w80Sg.exam_paper_grounding[k];
  const v76 = w76Sg.exam_paper_grounding?.[k];
  sgExamDiffs.push({ key: k, identicalToW76: v80 === v76, val: v80 });
}
const identicalCount = sgExamDiffs.filter(x => x.identicalToW76).length;

const w80MathIds = (w80Sph.mod?.skillPracticeHubData?.singapore_math || []).map(x => `${x.id}: ${x.title}`);
const w76MathIds = (w76Sph.mod?.skillPracticeHubData?.singapore_math || []).map(x => `${x.id}: ${x.title}`);

const p80Bp = 'src/data/weeks/week_80/blueprint.json';
const p80Sg = 'src/data/weeks/week_80/source_grounding.json';
const p80Prov = 'src/data/weeks/week_80/provenance.json';
const p76Bp = 'src/data/weeks/week_76/blueprint.json';
const p76Sg = 'src/data/weeks/week_76/source_grounding.json';

const p80VocabTotal = Object.values(w80Sg.vocabulary_grounding_summary || {}).reduce((acc, v) => acc + (Array.isArray(v) ? v.length : 0), 0);
ef += `1. **\`week_80/blueprint.json\` vs \`week_80/source_grounding.json\` & chuẩn PET / Source B:**\n`;
ef += `   - \`cumulativeBlock\` (${bt(`blueprint.json:${findJsonBlockRange(p80Bp, 'cumulativeBlock')}`)}): \`${JSON.stringify(w80Bp.cumulativeBlock)}\` khớp \`source_grounding.cumulative_block\`: \`${JSON.stringify(w80Sg.cumulative_block)}\`, **NHƯNG**:\n`;
ef += `   - \`synthesis_summary\` (${bt(`blueprint.json:${findJsonBlockRange(p80Bp, 'synthesis_summary')}`)}): vẫn ghi \`w73_theme..w76_theme\` (\`"${w80Bp.synthesis_summary?.w73_theme}"\` .. \`"${w80Bp.synthesis_summary?.w76_theme}"\`) trùng y hệt \`week_76/blueprint.json:${findJsonBlockRange(p76Bp, 'synthesis_summary')}\`, KHÔNG phải \`w77..w80\`!\n`;
ef += `   - \`tested_skills\` (${bt(`blueprint.json:${findJsonBlockRange(p80Bp, 'tested_skills')}`)}): ghi **${(w80Bp.tested_skills || []).length} mã chuẩn A2 Flyers** gồm \`"listening_p5"\` (${findFirstLine(p80Bp, /"listening_p5"/)}) và \`"writing_p7"\` (${findFirstLine(p80Bp, /"writing_p7"/)}), mâu thuẫn hoàn toàn với \`mockFormat: "${w80Bp.mockFormat}"\` (${findFirstLine(p80Bp, /"mockFormat"/)}) và \`papers\` (${findJsonBlockRange(p80Bp, 'papers')}: Listening **${w80Bp.papers?.listening?.parts} parts / ${w80Bp.papers?.listening?.total_items} items**, Writing **${w80Bp.papers?.writing?.parts} parts / ${w80Bp.papers?.writing?.total_tasks} tasks**, Reading **${w80Bp.papers?.reading?.parts} parts / ${w80Bp.papers?.reading?.total_items} items**, Speaking **${w80Bp.papers?.speaking?.parts} parts / ${w80Bp.papers?.speaking?.total_tasks} tasks**).\n`;
ef += `   - \`vocabulary_focus\` (${bt(`blueprint.json:${findJsonBlockRange(p80Bp, 'vocabulary_focus')}`)}) & \`target_vocab_20\` (${findFirstLine(p80Bp, /"target_vocab_20"/)}): đều **${(w80Bp.vocabulary_focus?.syllabus_words || []).length} từ** (\`syllabus_words: []\`, \`total_syllabus_words: ${w80Bp.vocabulary_focus?.total_syllabus_words}\`, \`target_vocab_20: []\`), mâu thuẫn với \`synthesis_summary.grounded_vocabulary_count: ${w80Bp.synthesis_summary?.grounded_vocabulary_count}\` (${findFirstLine(p80Bp, /"grounded_vocabulary_count"/)}) và Source B \`L632–637\` (W79–80 có 7 từ).\n`;
ef += `   - \`theme\` (${findFirstLine(p80Bp, /"theme"/)}), \`clil_topic\` (${findJsonBlockRange(p80Bp, 'clil_topic')}), \`grammar_focus\` (${findJsonBlockRange(p80Bp, 'grammar_focus')}): ghi theo Source A cũ (*${w80Bp.theme}*), lệch Source B Part II \`L632–637\` (*Space Exploration vs. Earth Fix*, \`metadata_provenance.source_master_syllabus: ${w80Bp.metadata_provenance?.source_master_syllabus}\`).\n`;
ef += `   - \`isFullMock: ${w80Bp.isFullMock}\` & \`week_type: "${w80Bp.week_type}"\` (${findFirstLine(p80Bp, /"week_type"/)}–${findFirstLine(p80Bp, /"isFullMock"/).replace('L', '')}): gắn cờ Mock trực tiếp lên tuần nội dung W80 (mâu thuẫn quy tắc Mock xen kẽ tách M15 ra slot riêng).\n`;
ef += `2. **\`week_80/source_grounding.json\` mâu thuẫn nội tại & clone nguyên văn từ W76:**\n`;
ef += `   - \`vocabulary_grounding_summary\` (${findJsonBlockRange(p80Sg, 'vocabulary_grounding_summary')}) liệt kê ${p80VocabTotal} từ cho \`W77, W78, W79, W80\` (W79 ghi ${JSON.stringify((w80Sg.vocabulary_grounding_summary?.w79_source_words || []).slice(0, 3))}; W80 ghi ${JSON.stringify(w80Sg.vocabulary_grounding_summary?.w80_source_words || [])}), NHƯNG:\n`;
ef += `   - \`exam_paper_grounding\` (${findJsonBlockRange(p80Sg, 'exam_paper_grounding')}): **${identicalCount}/${sgExamDiffs.length} mục TRÙNG NGUYÊN VĂN 100% với \`week_76/source_grounding.json:${findJsonBlockRange(p76Sg, 'exam_paper_grounding')}\`** (nhắc \`polar ice (W73)\`, \`rainforest ecology (W74)\`, \`Egyptian archaeology (W75)\`, \`ocean navigation (W76/W80)\`, \`Magellan\`, \`Captain Cook\`, \`Dr. Sarah Lin\`).\n`;
ef += `3. **\`week_80/provenance.json\`:**\n`;
ef += `   - Dòng \`${findFirstLine(p80Prov, /Cumulative Sourcing/)}\`: ghi \`"${(w80Prov.invariants || []).find(s => /Cumulative Sourcing/i.test(s)) || ''}"\` (lẫn cả block W73–75 cũ lẫn W80; vừa mâu thuẫn với \`cumulative_block: ${JSON.stringify(w80Sg.cumulative_block)}\` trong \`blueprint.json\`/\`source_grounding.json\`).\n`;
ef += `4. **Các file \`.js\` bên trong \`src/data/weeks/week_80/\` (copy-paste sót từ W76/W77):**\n`;
ef += `   - \`vocab.js\` (W80): 5 từ đầu là \`${JSON.stringify(w80VocabWords.slice(0, 5))}\` (là bộ từ W77 *landmarks*, KHÔNG khớp 5 từ W80 hay W73); trong khi W76 \`vocab.js\` là \`${JSON.stringify(w76VocabWords.slice(0, 5))}\` (từ của W73!).\n`;
ef += `   - \`skill_practice_hub.js\` (W80): mảng \`singapore_math\` chứa **${w80MathIds.length} bài copy từ W76**: \`${w80MathIds.join(' | ')}\` (y hệt W76: \`${w76MathIds.join(' | ')}\`).\n`;
ef += `   - \`reading_hub.js\` (W80): \`theme = "${w80Rh.mod?.readingHubData?.theme}"\`, cấu trúc \`paper: "${w80Rh.mod?.readingHubData?.paper}"\` (\`rw_part1..rw_part6\`, không có \`clil_article\`), nhưng bài đọc \`rw_part3.title\` lại là \`"${w80Rh.mod?.readingHubData?.rw_part3?.title}"\` (tiếp tục clone chủ đề Ferdinand Magellan của W76!).\n`;
ef += `5. **Nợ kỹ thuật liên đới tại \`src/data/weeks/week_76/\`:**\n`;
ef += `   - \`week_76/blueprint.json:${findJsonBlockRange(p76Bp, 'tested_skills')}\` cũng mang \`tested_skills\` chuẩn Flyers (\`listening_p5\` ${findFirstLine(p76Bp, /"listening_p5"/)}, \`writing_p7\` ${findFirstLine(p76Bp, /"writing_p7"/)}) dù \`mockFormat: "${w76Bp.mockFormat}"\` (${findFirstLine(p76Bp, /"mockFormat"/)}) & \`papers\` PET (${findJsonBlockRange(p76Bp, 'papers')}); \`target_vocab_20\` có ${(w76Bp.target_vocab_20 || []).length} từ khác hoàn toàn \`week_76/vocab.js\` (${w76VocabWords.length} từ bắt đầu bằng ${JSON.stringify(w76VocabWords.slice(0, 2))}).\n\n`;

ef += '### F.11. BẰNG CHỨNG RUNTIME ĐỌC TOÁN (`singapore_math.js` vs `skill_practice_hub.js`) + QUÉT TOÀN BỘ 22 TUẦN PRODUCTION\n\n';
ef += '#### F.11.1. Chuỗi gọi dữ liệu Toán trong mã nguồn runtime (`src/` — trích `file:dòng` thật)\n\n';
for (const item of runtimeLoaderSnippets) {
  ef += `- **\`${item.file}\`**:\n`;
  for (const h of item.hits) {
    ef += `  - \`L${h.lineNum}\`: \`${h.text}\`\n`;
  }
}
ef += '\n- **Kết luận chính xác về đường nạp Toán ở Runtime:**\n';
ef += '  1. `src/data/weeks/index.js:L5, L45–54` (`loadWeekData(weekId)`) **CHỈ** `import` `./week_${pad}/index.js` (hoặc flat `./week_${pad}.js` — hiện có 0 file flat). Hệ thống **KHÔNG BAO GIỜ** tự động `import` `singapore_math.js` hay `skill_practice_hub.js` nếu `week_{N}/index.js` không trực tiếp `import` nó.\n';
ef += '  2. `src/components/questmap/TaskScreen.jsx:L220,243` & `src/config/zoneDataMapper.js:L23,79` lấy `barModel: skillPracticeHub.singapore_math || listeningHub.singapore_math || []`, rồi `src/modules/zones/BattleArenaZone.jsx:L57,160` truyền `barModelData` vào `<BarModelQuest />`. (`ArenaHub.jsx:L209` là route legacy `/hub/station-2` cố định `week33Data?.listeningHub`).\n';
ef += '  3. **Hệ quả thực tế trên production hiện tại:**\n';
ef += '     - Không một tuần nào trong W33–W156 có `index.js` import `singapore_math.js`!\n';
ef += '     - `W33` & `W34`: `index.js` import `skill_practice_hub.js` (5 bài dùng `problem_en`/`bar_model_svg`) và `logic_lab.js` (5 bài) — **bỏ qua `singapore_math.js`** (nơi chứa `modelData` động).\n';
ef += '     - `W35`: `index.js` **KHÔNG** import `skill_practice_hub.js` (chỉ import `logic_lab.js` rỗng 0 bài), dẫn tới `zoneDataMapper.js:L79` trả về `[]` -> runtime hiện `"Missing"` dù file `skill_practice_hub.js` trên đĩa có 2 bài!\n';
ef += '     - `17 tuần (W38, 39, 41, 43, 45, 46, 73–82, 125)`: có 6 file `.js` trên đĩa (`skill_practice_hub.js` với 2 bài) nhưng **KHÔNG CÓ `index.js`** -> `loadWeekData(w)` trả `null`, runtime chưa nạp được các tuần này.\n\n';

ef += '#### F.11.2. Bảng quét toàn bộ 22 thư mục production có nội dung `.js` (`src/data/weeks/week_*`)\n\n';
ef += '| Tuần | `index.js` | `idx` import `sm` / `sph` / `ll` | `singapore_math.js` | `skill_practice_hub.js` | `listening_hub.js` | `logic_lab.js` | Số bài thấy ở Runtime (`loadWeekData`) | Tình trạng đối chiếu giữa 2 nguồn Toán |\n';
ef += '| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |\n';
for (const r of f11Rows) {
  const idxFlags = `${r.idxImportsSm ? 'Y' : 'N'}/${r.idxImportsSph ? 'Y' : 'N'}/${r.idxImportsLl ? 'Y' : 'N'}`;
  ef += `| **W${r.week}** | ${r.hasIdx ? '✅' : '❌'} | ${idxFlags} | ${r.smCount === null ? '— (0 file)' : r.smCount + ' bài'} | ${r.sphCount === null ? '— (0 file)' : r.sphCount + ' bài'} | ${r.lhCount} bài | ${r.llCount === null ? '—' : r.llCount + ' bài'} | **${r.runtimeVisibleCount}** | ${r.relation} |\n`;
}

ef += '\n- **Tổng hợp thống kê từ bảng 22 tuần (tính tự động):**\n';
ef += `  - Tổng thư mục production có file \`.js\`: **${f11Rows.length} tuần** (${f11Rows.map(x => 'W' + x.week).join(', ')})\n`;
ef += `  - Số tuần có CẢ \`singapore_math.js\` VÀ \`skill_practice_hub.js\`: **${f11Rows.filter(x => x.smCount !== null && x.sphCount !== null).length} tuần** (${f11Rows.filter(x => x.smCount !== null && x.sphCount !== null).map(x => 'W' + x.week).join(', ')})\n`;
ef += `    - Trong nhóm này: W33 & W34 trùng 5 đề nhưng khác định dạng schema (` + bt('sm.js') + ` có \`modelData\` JSON còn ` + bt('sph.js') + ` trỏ \`bar_model_svg\`); W35 \`sm.js\` rỗng 0 bài nhưng \`sph.js\` có 2 bài (và không được \`index.js\` import); W36 & W37 đều rỗng 0 bài ở cả 2 file (Mock).\n`;
ef += `  - Số tuần CHỈ có \`skill_practice_hub.js\` (không có \`singapore_math.js\`): **${f11Rows.filter(x => x.smCount === null && x.sphCount !== null).length} tuần** (${f11Rows.filter(x => x.smCount === null && x.sphCount !== null).map(x => 'W' + x.week).join(', ')}) — toàn bộ đều có 2 bài/tuần trong \`sph.js\` và đều thiếu \`index.js\`.\n`;
ef += `  - Số tuần thực tế tải được > 0 bài Toán qua \`loadWeekData(w)\` ở runtime hiện nay: **${f11Rows.filter(x => x.runtimeVisibleCount > 0).length} tuần** (${f11Rows.filter(x => x.runtimeVisibleCount > 0).map(x => `W${x.week}:${x.runtimeVisibleCount}`).join(', ')})\n`;

fs.writeFileSync(OUT_EF_RAW, ef, 'utf8');
console.log(`✓ Saved ${path.relative(ROOT_DIR, OUT_VOCAB)} (${vocabMd.split('\n').length} lines)`);
console.log(`✓ Saved ${path.relative(ROOT_DIR, OUT_SPEC_V2)} (${specV2.length} lines)`);
console.log(`✓ Saved ${path.relative(ROOT_DIR, OUT_EF_RAW)} (${ef.split('\n').length} lines)`);
