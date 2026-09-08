# 📋 SOP: PIPELINE TẠO TUẦN MỚI (W35+) — EngQuest3K

> Version: 1.0 | Author: Antigravity | Submitted for Reviewer Approval: 2026-08-26

---

## ⚠️ NGUYÊN TẮC BẤT BIẾN (KHÔNG ĐƯỢC BỎ QUA)

| #  | Nguyên tắc |
|----|------------|
| P1 | **ZERO-CLONING**: Không `cp`, `rsync` hay `git checkout -- <weekN> <weekN+1>` |
| P2 | **ZERO-PIL-DRAW**: Tuyệt đối cấm PIL/OpenCV/Canvas vẽ nội dung lên ảnh. Mọi ảnh từ Together AI. |
| P3 | **GATE-FIRST**: Mỗi giai đoạn kết thúc bằng một Gate. Nếu Gate fail → STOP, không push. |
| P4 | **SYLLABUS-LOCKED**: Mọi nội dung phát sinh từ bản Syllabus đã được phê duyệt riêng, không từ file tuần cũ. |
| P5 | **A2-WORDLIST**: Mọi từ vựng phải kiểm tra với `cefr_curriculum_guard.mjs` trước khi ghi vào hub. |

---

## 🗺️ TỔNG QUAN PIPELINE (6 GIAI ĐOẠN)

```
PHASE 0: SYLLABUS LOCK
     ↓ Gate 0: Theme/Vocab approved by human
PHASE 1: SCAFFOLD (Khởi tạo cấu trúc rỗng)
     ↓ Gate 3: All 4 hubs schema-valid, all fields empty/placeholder
PHASE 2: ASSET GENERATION (AI Images + Audio)
     ↓ Gate A: Every image URL resolves to an AI-generated file on disk
PHASE 3: DATA AUTHORING (Nội dung hubs)
     ↓ Gate 15: Content audit passes (chunks, vocab, CEFR)
PHASE 4: FIDELITY CHECK (Cambridge Doctrine)
     ↓ Gate 16 + Gate 17: Doctrine schema + 14 invariants all PASS
PHASE 5: BUILD + DEPLOY
     ↓ Gate B: npm run build exit 0 + Cloudflare deploy OK
PHASE 6: VISUAL QA (Browser calibration)
     ↓ Gate C: Human confirms pins, hotspots, audio on live URL
```

---

## PHASE 0 — SYLLABUS LOCK

### Mục tiêu
Định nghĩa rõ ràng chủ đề, từ vựng, cấu trúc ngữ pháp MỤC TIÊU của tuần mới. Không có bước này thì không bắt đầu.

### Đầu vào bắt buộc
Bản Syllabus hàng tuần (do User/PM cung cấp, không tự suy diễn):
- `theme_en`: Chủ đề chính (VD: "The Lion and the Mouse — Forest Teamwork")
- `target_grammar`: Cấu trúc ngữ pháp trọng tâm (VD: Past Simple + adverbs)
- `target_vocab_20`: Danh sách đúng 20 từ A2 Flyers
- `cefr_level`: A1 Starters / A1 Movers / A2 Flyers / KET (theo tuần)
- `week_number`: WNN
- `day_topics`: Chủ đề chi tiết cho 5 ngày học

### Hành động
1. Nhận Syllabus từ User. **Không tự ý tạo Syllabus.**
2. Chạy CEFR Pre-check thủ công: Kiểm tra 20 từ đối chiếu từ điển Cambridge Wordlist tương ứng với `cefr_level`. Phát hiện bất kỳ từ nào ngoài Wordlist → báo cáo ngay, yêu cầu thay thế.
3. Ghi kết quả vào `docs/weekNN_syllabus.md` — file này là **Single Source of Truth** cho toàn bộ Phase sau.

### Gate 0 (Human Approval)
- [ ] `docs/weekNN_syllabus.md` tồn tại và được User/Reviewer ký duyệt (reply "APPROVED").
- **Nếu fail** → Dừng lại, không chạy Phase 1.

---

## PHASE 1 — SCAFFOLD (Khởi tạo cấu trúc rỗng)

### Mục tiêu
Tạo đúng 4 file hub + index + real ở đúng path, **chỉ với skeleton JSON rỗng / placeholder strings**. Không có nội dung thật.

### Hành động (theo thứ tự nghiêm ngặt)

**Bước 1.1** — Tạo thư mục mới tuyệt đối (không từ tuần cũ):
```
mkdir src/data/weeks/weekNN/
mkdir public/images/weekNN/
mkdir public/audio/weekNN/
```

**Bước 1.2** — Tạo 4 file hub với **schema rỗng** đúng Cambridge Fidelity Doctrine:
- `listening_hub.js` — Điền `listening_p1` đến `listening_p5` với placeholder `null` / `[]` / `""` theo đúng schema.
- `reading_hub.js` — Điền `rw_part1` đến `rw_part6` skeleton.
- `writing_hub.js` — Điền `rw_part7` skeleton.
- `speaking_hub.js` — Điền `speaking_p1` đến `speaking_p4` skeleton.

**Bước 1.3** — Tạo `index.js` skeleton:
- Xuất đủ 15 `stations` wrapper theo đúng schema chuẩn.
- Mọi station điền `title`, `description` lấy từ `docs/weekNN_syllabus.md`. Không copy từ tuần cũ.

**Bước 1.4** — Tạo `weekNN_real.js` và `weekNN_easy_real.js` skeleton với `story_missions`, `spark_talk`, `target_vocab` rỗng.

### Gate 3 (Automated)
```bash
node scripts/gate03_schema_skeleton.mjs NN
```
Kiểm tra: Mọi hub file tồn tại, có đúng top-level keys, không có reference nào đến `weekN-1`, không có field nào `undefined`.
- **Nếu fail** → Fix skeleton trước khi qua Phase 2.

---

## PHASE 2 — ASSET GENERATION (AI Images + Audio)

### Mục tiêu
100% hình ảnh được sinh bởi Together AI. 100% audio được sinh bởi Google Cloud TTS. **Cấm tuyệt đối PIL/Canvas/icon SVG.**

### 2A — Sinh ảnh bằng Together AI

| Asset | Model/API | Prompt Source | Lưu tại |
|-------|-----------|---------------|---------|
| Listening P1 Scene | Together AI FLUX | `weekNN_syllabus.md` theme | `public/images/weekNN/wNN_listening_p1_scene.jpg` |
| Listening P3 Cards A–H | Together AI FLUX | Audio script P3 item names | `public/images/weekNN/card_a.jpg` → `card_h.jpg` |
| Listening P4 Options A/B/C × 5Q | Together AI FLUX | Audio script P4 questions | `public/images/weekNN/l4_q1_a.jpg` etc |
| Speaking P1 Scene A (Find Diff) | Together AI FLUX | Syllabus scene description | `public/images/weekNN/wNN_diff_scene_a.jpg` |
| Speaking P1 Scene B (Find Diff) | Together AI FLUX | Prompt explicit 4 differences | `public/images/weekNN/wNN_diff_scene_b.jpg` |
| Speaking P3 Story Pics 1–4 | Together AI FLUX | Story arc from syllabus | `public/images/weekNN/story_p1.jpg` etc |
| Cover / Webtoon frames | Together AI FLUX | Day 1-2 story arc | `public/images/weekNN/webtoon_*.jpg` |

**Cơ chế chống PIL/Code-draw:**
- Tất cả hình ảnh sinh qua Together AI API call thực sự (có raw HTTP log).
- **Verification step bắt buộc**: Chạy `node scripts/verify_ai_assets.mjs NN` để kiểm tra mỗi file ảnh là JPEG/PNG có entropy > threshold (ảnh AI thật).
- **Cấm hoàn toàn**: Bất kỳ đoạn code nào gọi `PIL.ImageDraw`, `canvas.fillRect`, `svg.append('circle')` với mục đích tạo ra nội dung hình ảnh bài học.

**Scene B (Find Differences) — Quy tắc đặc biệt:**
- Scene B **PHẢI** được sinh từ Together AI với prompt explicit chỉ thị 4 điểm khác biệt.
- Scene B **KHÔNG ĐƯỢC** xử lý pixel từ Scene A bằng PIL.
- 4 differences phải dùng từ vựng **nằm trong A2 Flyers Wordlist** (ví dụ: sun, cloud, flower, butterfly, mouse — CẤM: ribbon, mechanism, lubricant...).
- Sau khi có Scene B, chạy visual inspection bằng mắt người để xác nhận 4 vùng khác biệt thực sự hiển thị rõ ràng.

### 2B — Sinh Audio bằng Google Cloud TTS

```
dictation_1.mp3 → dictation_5.mp3       (voice: en-US-Neural2-F)
listening_p1_full.mp3                    (voice: en-US-Journey-F)
listening_p2_full.mp3                    (voice: en-US-Neural2-D)
listening_p3_item1.mp3 → item5.mp3       (voice: en-US-Neural2-D)
listening_p4_full.mp3                    (voice: en-US-Neural2-D)
listening_p5_full.mp3                    (voice: en-US-Journey-F)
read_stem.mp3                            (voice: en-US-Journey-F)
read_social.mp3                          (voice: en-US-Journey-F)
clil_weekNN.mp3                          (voice: en-US-Journey-F)
```

Mỗi script audio **phải khớp tuyệt đối** với text trong `listening_hub.js` tương ứng.

### Gate A (Automated)
```bash
node scripts/gateA_asset_integrity.mjs NN
```
Kiểm tra: Tất cả file ảnh cần thiết tồn tại và có kích thước > 20KB. Tất cả file MP3 tồn tại.
- **Nếu fail** → Sinh lại asset thiếu, không qua Phase 3.

---

## PHASE 3 — DATA AUTHORING (Nội dung hubs)

### Mục tiêu
Điền nội dung thật vào 4 hub file, tuân thủ tuyệt đối A2 Wordlist và Cambridge Pedagogy.

### Thứ tự authoring (bắt buộc theo dependencies)

**Bước 3.1 — Viết Audio Scripts trước** (root of all content):
- `listening_p1` script: 6 nhân vật, 1 example exchange, 5 item exchanges. Mỗi câu phải có từ vựng từ `target_vocab_20`.
- `listening_p2` script: Monologue điền 5 field.
- `listening_p3` script: 5 item description + 8 card labels. Phải khớp 1:1 với tên trên ảnh card_a → card_h.
- `listening_p4` script: 5 câu hỏi × 3 option, 1 example. Label A/B/C khớp với tên file ảnh.
- `listening_p5` script: 1 example (color) + 3 color items + 2 write items. Từ vựng màu sắc và vật thể phải trong A2 Wordlist.

**Bước 3.2 — Viết Reading Hub** (phụ thuộc vào audio scripts):
- `rw_part1`: 15 word bank, 10 definitions. KHÔNG lặp target word.
- `rw_part2`: 5 dialogue turns + 8 answer options + 1 example.
- `rw_part3`: ~120w story + 5 gap-fill blanks + 3 title options.
- `rw_part4`: 10 grammar MCQ blanks × 3 options.
- `rw_part5`: ~250w story + 7 extraction questions.
- `rw_part6`: 5 open cloze gaps.

**Bước 3.3 — Viết Writing Hub**: `rw_part7` — 3 story pictures prompts, rubric 5 shields.

**Bước 3.4 — Viết Speaking Hub**:
- `speaking_p1` (Find Differences): 4 differences, mỗi từ `name` phải trong A2 Wordlist. Tọa độ `x, y` đặt **placeholder `null`** (điền sau Phase 4).
- `speaking_p2` (Information Exchange): Candidate/Examiner unknowns ≥ 2 each.
- `speaking_p3` (Picture Story): Intro phrase chuẩn, 4 story images.
- `speaking_p4` (Personal Questions): 5 questions.

**Bước 3.5 — CEFR Vocabulary Guard** (BẮT BUỘC sau mỗi hub):
```bash
node scripts/cefr_curriculum_guard.mjs NN
```
Nếu phát hiện từ nào ngoài A2 Wordlist → **dừng, báo user, yêu cầu thay thế**. Không tự ý thay.

### Gate 15 (Automated)
```bash
npm run audit:week NN
```
Kiểm tra: chunk integrity, từ vựng CEFR, audio path validity, data coherence giữa hubs.
- **Nếu fail** → Fix content lỗi. Không qua Phase 4.

---

## PHASE 4 — FIDELITY CHECK (Cambridge Doctrine)

### Mục tiêu
Xác nhận tuyệt đối rằng data 100% tuân thủ Cambridge Fidelity Doctrine schema và 14 invariants.

### Hành động

**Bước 4.1 — Gate 16** (Schema validation):
```bash
node scripts/gate16_schema.mjs NN
```

**Bước 4.2 — Gate 17** (14 Invariants runtime check):
```bash
node scripts/gate17_fidelity_doctrine.mjs NN
```
Tất cả 14 invariants phải PASS:
- INV-HUB, INV-L1 (1ex+5scored+1null/6targets), INV-L4 (1ex+5scored/3options), INV-L5 (1ex+3color+2write)
- INV-R1 đến INV-R6
- INV-S1 (4 diffs, centroids ±1%), INV-S2, INV-S3 (4 images)
- INV-CLIL

**Bước 4.3 — Calibration File Generation** (S1 hotspots):
- Xem ảnh Scene A và Scene B thực sự để đo tọa độ 4 điểm khác biệt.
- Ghi vào `docs/weekNN_hotspot_calibration.json` với 4 centroids.
- Điền tọa độ vào `speaking_hub.js` differences, chạy lại Gate 17 để confirm INV-S1 PASS.

**Bước 4.4 — Audio-Content Sync Check** (Manual):
- Tên nhân vật trong `listening_p3.items[].name` khớp với label trên ảnh card AND khớp với audio script.
- Màu / đồ vật trong `listening_p5.instructions` khớp với SVG line-art objects.

- **Nếu Gate 16 hoặc Gate 17 fail** → Fix data, không commit, không qua Phase 5.

---

## PHASE 5 — BUILD + DEPLOY

**Bước 5.1 — Multi-Agent Review** (theo AGENTS.md mandate):
- Mọi biến được khai báo trước khi dùng.
- `logAttempt` chỉ gọi khi `isAttempted: true`.
- Check mode không chia sẻ lenient fallback của Learn Mode.

**Bước 5.2 — Production Build**:
```bash
npm run build
```
Exit code phải là 0.

**Bước 5.3 — Git Commit chuẩn**:
```bash
git add src/data/weeks/weekNN/ public/images/weekNN/ public/audio/weekNN/ docs/weekNN_*.json docs/weekNN_*.md
git commit -m "feat(wNN): [theme] complete Week NN content pipeline [gate17-pass]"
git push origin main
```

### Gate B (Automated)
- npm run build exit 0
- Cloudflare deploy status: Success
- **Nếu fail** → Fix build errors trước khi tiếp tục.

---

## PHASE 6 — VISUAL QA (Browser + Pin Calibration)

**Bước 6.1 — Kiểm tra từng Part** theo danh sách URL chuẩn:
```
/week/NN/task/boss_listening?part=L1  → SVGLineMatcher: Pins đúng người, Example line hiển thị
/week/NN/task/boss_listening?part=L2  → NotepadNoteCompleter: 5 fields điền được
/week/NN/task/boss_listening?part=L3  → VisualMatchingAH: 8 cards load ảnh thật
/week/NN/task/boss_listening?part=L4  → MultipleChoice3Pic: 3 ảnh thật/câu, 5+1 câu
/week/NN/task/boss_listening?part=L5  → SVGColorAndWrite: SVG line-art, palette hoạt động
/week/NN/task/boss_reading?part=R1    → WordBankMatchingGrid: 15 words, 10 defs
... (tiếp tục R2-R7, S1-S4)
```

**Bước 6.2 — Calibrate Pins (L1)** theo pipeline `listening-p1-pins` Skill:
- Dùng Calibrator Tool trên browser (nút 🎯 Calibrate Pins).
- Click từng target vào đúng vùng ngực/vai nhân vật.
- Copy JSON → Paste vào `listening_hub.js` targets.
- Chạy lại Gate 17 để confirm INV-L1 vẫn PASS.

**Bước 6.3 — Verify S1 Hotspots**:
- Mở `/week/NN/task/weekly_review?part=S1`.
- Xác nhận 4 vòng tròn highlight đúng 4 vị trí khác biệt trên ảnh.
- Nếu lệch → Chỉnh tọa độ `differences[].x/y` và `docs/weekNN_hotspot_calibration.json`, push fix commit.

**Bước 6.4 — Audio Playback Test**: Bấm Play Audio trên từng Part (L1-L5). Xác nhận script khớp với nội dung bài.

### Gate C (Human Approval)
- [ ] Tất cả 15 Parts hiển thị đúng trên browser.
- [ ] Pins L1 đúng nhân vật.
- [ ] S1 hotspots đúng vị trí.
- [ ] Audio khớp nội dung.
- **Chỉ sau khi Gate C PASS** mới coi tuần đó là Production Ready.

---

## 📝 CHECKLIST TỔNG HỢP (Quick Reference)

```
[ ] Gate 0: Syllabus approved by human
[ ] Gate 3: 4 hub skeletons schema-valid, no cloned content
[ ] Gate A: All AI images exist + all audio exists, no PIL-generated assets
[ ] Gate 15: npm run audit:week NN passes (0 errors)
[ ] Gate 16: Schema validation PASS
[ ] Gate 17: All 14 invariants PASS
[ ] Gate B: npm run build exit 0 + Cloudflare deploy OK
[ ] Gate C: Human visual QA confirmed on production URL
```

---

## ❌ ANTI-PATTERNS (CẤM TUYỆT ĐỐI)

| Anti-pattern | Hệ quả |
|---|---|
| `cp -r src/data/weeks/weekN weekN+1` | Zero-Cloning violation → Instant rejection |
| PIL `ImageDraw.Draw` để tạo ảnh học liệu | Asset fraud → Immediate revert |
| Scene B Find-Differences sinh bằng PIL (pixel-shift từ Scene A) | Logic violation → butterfly còn ở cả 2 tranh |
| Tự ý thêm từ vựng không kiểm tra A2 | CEFR violation → Gate 15 fail |
| Push code trước khi Gate 17 PASS | Contamination of main branch |
| Tự tạo Syllabus không có human approval | Wrong content direction từ Phase 0 |
| Calibrate pins bằng cách đoán số | INV-L1 fail + wrong UX → Gate 17 fail |

---

## 🔖 FILES CREATED PER WEEK (Manifest)

```
src/data/weeks/weekNN/
├── index.js                   (15 stations wrapper)
├── listening_hub.js           (P1–P5 data)
├── reading_hub.js             (P1–P6 data)
├── writing_hub.js             (P7 data)
├── speaking_hub.js            (P1–P4 data)
├── weekNN_real.js             (AI Tutor advanced)
└── weekNN_easy_real.js        (AI Tutor easy)

public/images/weekNN/
├── wNN_listening_p1_scene.jpg       (Together AI)
├── card_a.jpg → card_h.jpg          (Together AI x8)
├── l4_q1_a.jpg → l4_q5_c.jpg       (Together AI x15)
├── wNN_diff_scene_a.jpg             (Together AI)
├── wNN_diff_scene_b.jpg             (Together AI — NOT PIL)
├── story_p1.jpg → story_p4.jpg     (Together AI x4)
└── webtoon_*.jpg                    (Together AI)

public/audio/weekNN/
├── dictation_1.mp3 → _5.mp3        (GCP TTS Neural2-F)
├── listening_p1_full.mp3            (GCP TTS Journey-F)
├── listening_p2_full.mp3            (GCP TTS Neural2-D)
├── listening_p3_item1.mp3 → _5.mp3 (GCP TTS Neural2-D)
├── listening_p4_full.mp3            (GCP TTS Neural2-D)
├── listening_p5_full.mp3            (GCP TTS Journey-F)
├── read_stem.mp3                    (GCP TTS Journey-F)
├── read_social.mp3                  (GCP TTS Journey-F)
└── clil_weekNN.mp3                  (GCP TTS Journey-F)

docs/
├── weekNN_syllabus.md               (Phase 0 — Human approved)
└── weekNN_hotspot_calibration.json  (Phase 4 — 4 S1 centroids)
```
