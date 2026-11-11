# ROUND 82 — PRIORITY 1: ÁP DỤNG C.7 OPTION (a) CHO TỪ VỰNG W79 & W80

> **TRẠNG THÁI:** **STAGED / PROPOSAL-ONLY PENDING W79 & W80 CONTENT REGENERATION & CLAUDE ESL QUALITY REVIEW — KHÔNG MERGE `src/data/weeks/`, KHÔNG SỬA LIVE DIGITAL MAP, KHÔNG TÁI SINH WAVE 3.**
> Generated dynamically from repo files at `2026-11-11T10:19:14.307Z` by `scripts/generate_round82_c7_and_status_sweep.mjs`.

## 1. Căn Cứ Source B Nguyên Văn (`docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt:L632–L637`)

```text
632: 	•	Weeks 79-80: Review & Micro-Debate 2 (Tuần 79-80: Ôn tập & Tranh luận nhỏ 2)
633: 	•	Topic: "Space Exploration vs. Earth Fix". (Chủ đề: Khám phá Vũ trụ hay Sửa chữa Trái đất?)
634: 	•	Activity: Micro-Debate. (Hoạt động: Tranh luận nhỏ.)
635: 	•	Skill Focus: Rebuttal Intro ("Yes, but..."). (Kỹ năng: Giới thiệu Phản biện.)
636: 	•	Grammar Review: Passive Voice, Conditionals, Comparatives.
637: 	•	Vocabulary Focus: space, earth, money, spend, fix, problem, important.
```
- **Từ vựng Source B dùng chung W79 & W80 (7 từ):** `space, earth, money, spend, fix, problem, important`
- **Ngữ pháp / Kỹ năng / Hoạt động bắt buộc cho cả W79 & W80:** `Micro-Debate` | `Rebuttal Intro ("Yes, but...")` | `Passive Voice, Conditionals, Comparatives`.
- **Kiểm tra Toán trong khối L632–L637:** `hasMathInBlock = false` (Source B không định nghĩa Topic/Outcome/Vocab Toán cho W79–80 -> Toán W79 & W80 thuộc diện **`SUPPLEMENT`**).

## 2. Xác Nhận Bộ 13 Từ `SUPPLEMENT` Của W79 (GIỮ NGUYÊN KHÔNG ĐỔI TỪ ROUND 78 / 79)

- **Nguồn kiểm chứng:** Trích xuất động từ `docs/agent_artifacts/round78_w79_w80_split_proposal.md:L41` và đối chiếu khớp **100%** với `docs/agent_artifacts/round79_w79_w80_vocab_options.md:L38` (`identical = true`).
- **W79 7 Source B + 13 `SUPPLEMENT` (Claims / Space vs. Earth Framing — 20 từ):**
  - **7 Source B (Shared):** `space, earth, money, spend, fix, problem, important`
  - **13 W79 `SUPPLEMENT` (Unchanged):** `explore, planet, budget, environment, pollution, poverty, research, satellite, invest, solution, priority, debate, evidence`
- **Kiểm tra trùng nội bộ:** `|SB7| = 7`, `|W79_13| = 13`, `SB7 ∩ W79_13 = ∅ (0)`, `|W79_20| = 20`.
- **Ghi chú đối chiếu Source B đa tuần (để minh bạch ESL):**
  - `explore`: SB_Vocab=[L610] | SB_Math=[none] | Other_Prod=[W36] (giữ nguyên do W79_13 đã được khóa không đổi theo Option (a) & Priority 1.2)
  - `planet`: SB_Vocab=[L565] | SB_Math=[none] | Other_Prod=[none] (giữ nguyên do W79_13 đã được khóa không đổi theo Option (a) & Priority 1.2)
  - `budget`: SB_Vocab=[none] | SB_Math=[L803] | Other_Prod=[none] (giữ nguyên do W79_13 đã được khóa không đổi theo Option (a) & Priority 1.2)
  - `environment`: SB_Vocab=[L547] | SB_Math=[none] | Other_Prod=[none] (giữ nguyên do W79_13 đã được khóa không đổi theo Option (a) & Priority 1.2)
  - `pollution`: SB_Vocab=[L547] | SB_Math=[none] | Other_Prod=[none] (giữ nguyên do W79_13 đã được khóa không đổi theo Option (a) & Priority 1.2)
  - `research`: SB_Vocab=[L839] | SB_Math=[none] | Other_Prod=[none] (giữ nguyên do W79_13 đã được khóa không đổi theo Option (a) & Priority 1.2)
  - `solution`: SB_Vocab=[L446] | SB_Math=[none] | Other_Prod=[none] (giữ nguyên do W79_13 đã được khóa không đổi theo Option (a) & Priority 1.2)
  - `evidence`: SB_Vocab=[L983, L1045] | SB_Math=[none] | Other_Prod=[W125, W81] (giữ nguyên do W79_13 đã được khóa không đổi theo Option (a) & Priority 1.2)

## 3. Đề Xuất Bộ 13 Từ `SUPPLEMENT` Mới Cho W80 (Micro-Debate 2 — Rebuttal `"Yes, but..."`, Trade-offs & Passive/Conditionals/Comparatives)

- **Đối chiếu & nâng cấp so với bản nháp sơ bộ ở `round79_w79_w80_vocab_options.md:L39`:**
  - Giữ lại **10/13 từ đạt chuẩn B1 PET & không đụng tuần học khác:** `restore, emission, resource, allocate, consequence, sustainable, renewable, oppose, outweigh, justify`.
  - Loại bỏ **3 từ bị va chạm chương trình từ bản nháp R79 (tính động từ Source B & repo):**
    - `climate`: phát hiện va chạm thực tế tại **live week_39/vocab.js | staged week_39**.
    - `habitat`: phát hiện va chạm thực tế tại **Source B Vocabulary Focus @ L340 | live week_38/vocab.js, live week_39/vocab.js | staged week_38, staged week_39, staged week_40_mock**.
    - `statistic`: phát hiện va chạm thực tế tại **Source B Vocabulary Focus @ L1017 | staged week_133**.
  - Thay bằng **3 từ B1 PET sắc nét cho Rebuttal / Trade-offs (0 va chạm Source B & 0 va chạm Prod hợp lệ):** `shortage, alternative, compromise`.

| # | Từ W80 `SUPPLEMENT` | Từ loại | Vai trò Micro-Debate 2 (`Rebuttal "Yes, but..."`) | Neo Ngữ Pháp Source B (`L636`) | Trùng Source B (Vocab + Math) W1–156? | Trùng Prod/Staging (ngoài W79/W80 lỗi)? |
| :---: | :--- | :---: | :--- | :--- | :---: | :---: |
| 1 | `restore` | v | Earth Fix action contrasting space expansion | Passive Voice ("forests can be restored") | 0 | 0 |
| 2 | `shortage` | n | Concrete Earth-side resource scarcity rebuttal point | Comparatives ("clean water shortages are more urgent") | 0 | 0 |
| 3 | `emission` | n | Climate/Earth damage cause in rebuttal scenarios | Conditionals ("if emissions continue to rise...") | 0 | 0 |
| 4 | `resource` | n | Scarcity framing across Earth vs Space funding | Passive Voice ("limited resources must be shared") | 0 | 0 valid *(chỉ thấy ở old-Prod:W80, old-Stage:week_80_mock chờ tái sinh)* |
| 5 | `allocate` | v | Budget trade-off decision verb | Passive Voice ("funds are allocated wisely") | 0 | 0 valid *(chỉ thấy ở old-Prod:W79 chờ tái sinh)* |
| 6 | `consequence` | n | Condition-outcome reasoning in Micro-Debate | Conditionals ("if we ignore Earth, serious consequences follow") | 0 | 0 |
| 7 | `sustainable` | adj | Long-term Earth solution qualifier | Comparatives ("a more sustainable plan for cities") | 0 | 0 |
| 8 | `renewable` | adj | Clean Earth-fix energy alternative | Comparatives ("cleaner renewable power than rocket fuel") | 0 | 0 valid *(chỉ thấy ở old-Prod:W79 chờ tái sinh)* |
| 9 | `alternative` | n/adj | Introduces counter-proposal in Micro-Debate 2 | Rebuttal "Yes, but..." ("a safer alternative on Earth") | 0 | 0 |
| 10 | `compromise` | n/v | Micro-Debate 2 synthesis between both sides | Conditionals & Debate Resolution ("reach a fair compromise") | 0 | 0 |
| 11 | `oppose` | v | Explicit stance/rebuttal verb | Rebuttal "Yes, but..." ("many citizens oppose cutting Earth aid") | 0 | Stage:week_127 *(chỉ trong staging bị block)* |
| 12 | `outweigh` | v | Weighing competing claims in comparative arguments | Comparatives / Rebuttal ("Earth needs outweigh distant bases") | 0 | 0 |
| 13 | `justify` | v | Challenging opponent evidence during rebuttal | Passive Voice / Rebuttal ("how can rocket costs be justified?") | 0 | 0 |

## 4. Chứng Minh Toán Học Tập Hợp Từ Vựng (100% Computed Bằng Script)

```text
SB7                 = {space, earth, money, spend, fix, problem, important}  (size = 7)
W79_SUPPLEMENT_13   = {explore, planet, budget, environment, pollution, poverty, research, satellite, invest, solution, priority, debate, evidence}  (size = 13)
W80_SUPPLEMENT_13   = {restore, shortage, emission, resource, allocate, consequence, sustainable, renewable, alternative, compromise, oppose, outweigh, justify}  (size = 13)
|W79_20|            = 20  (SB7 ∩ W79_13 = {} -> size 0)
|W80_20|            = 20  (SB7 ∩ W80_13 = {} -> size 0)
W79_13 ∩ W80_13     = {}  (overlap count = 0)
W79_20 ∩ W80_20     = {space, earth, money, spend, fix, problem, important}  (exact count = 7 === SB7)
|W79_20 ∪ W80_20|   = 33 unique words across W79–W80 (7 shared + 13 W79 + 13 W80)
```

## 5. Đối Chiếu Thực Tế Dữ Liệu Đang Có Trên Đĩa Cho W79 & W80 (Computed Read-Only)

| Tuần | Vị trí hiện tại | `blueprint.theme` / `isFullMock` | `reading_hub.theme` | `vocab.js` (Số từ / Khớp 7 SB) | `singapore_math` (AST) | Trạng thái & Kế hoạch tái sinh dưới C.7 Option (a) |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **W79 (Prod)** | `src/data/weeks/week_79/` | `The Industrial Revolution` / `false` | `Social Studies/ELA: Space Exploration vs Earth Restoration / Math: Micro-Debate` | `20` / **`0/7` SB** | `2/5` (skill_practice_hub.js) | Bản cũ pre-R71 thiếu 7/7 từ Source B & chỉ có 2/5 toán; `blueprint.json` lệch sang Industrial Revolution. Cần tái sinh toàn bộ với bộ 20 từ W79 Option (a). |
| **W79 (Staged)** | `docs/agent_artifacts/staging/week_79/` | `Space Exploration vs. Earth Fix` / `false` | `The Industrial Revolution` | `20` / **`0/7` SB** | `5/5` (skill_practice_hub.js) | `provenance.review_status = "RETIRED per Owner decision R72"`. Blueprint đã có 7 từ SB nhưng nội dung `.js` vẫn là bản Industrial Revolution đã nghỉ hưu. Cần tái sinh sạch theo C.7 Option (a). |
| **W80 (Prod)** | `src/data/weeks/week_80/` | `Supply, Demand & Market Prices` / `isFullMock: true` | `Supply, Demand & Market Prices / Math: Market Equilibrium Graphs` | `20` / **`0/7` SB** | `2/5` (skill_practice_hub.js) | Đang chứa nhầm **Mock M15** (cùng nợ kỹ thuật W76 Magellan / W77 landmarks vocab). Phải tách Mock M15 ra slot xen kẽ (khi có spec PET) và viết mới W80 `Review & Micro-Debate 2 (Part 2: Rebuttal "Yes, but...")` với 20 từ W80 Option (a). |
| **W80 (Staged)** | `staging/week_80` vs `staging/week_80_mock` | `week_80` KHÔNG TỒN TẠI / `week_80_mock` tồn tại | N/A | 0 content | N/A | Chưa từng tạo nội dung W80 cho Source B `L632–637`. |

## 6. Ghi Chú Áp Dụng Đề Xuất Trong Round 82 (Proposal Artifacts Only)
- Đã cập nhật proposal-only vào `docs/agent_artifacts/round82_proposed_digital_map_v2.md` (dòng W79 & W80) và `docs/agent_artifacts/round82_temp_blueprints/week_79_blueprint.json` + `week_80_blueprint.json` (`keywords`, `target_vocab_20`, `vocabulary_focus`).
- **Lưu ý nợ cấu trúc & trường kế thừa cũ trong `round82_temp_blueprints/week_{79,80}_blueprint.json`:** Ta bảo toàn schema nền để tránh drop key trước khi tái sinh, đồng thời gắn cờ `c7_regeneration_cleanup_required` (trên cả W79 & W80 cho `digital_map_reference`, `tested_skills`, `rotary_cycle`) và `c7_mock_cleanup_required` trên W80 (`mockFormat`, `cumulativeBlock`, `synthesis_summary`, `papers`, `digital_map_reference`, `tested_skills`, `rotary_cycle`) để round tái sinh thay mới sạch sẽ.
- **Cổng kế tiếp:** Nội dung đầy đủ của W79 & W80 (Story, CLIL article >= 12/20 từ, Listening, Writing, Speaking, 5 bài Toán `SUPPLEMENT`) chỉ được sinh ở round content-generation riêng sau này và phải qua G-GEN-11..16 + **Claude ESL Quality Review** trước khi thay thế `src/data/weeks/week_79/` & `week_80/`.
