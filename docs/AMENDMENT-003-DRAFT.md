# AMENDMENT-003 (DRAFT) — W34 AUDIO DISCREPANCY RESOLUTION & 4-PACKAGE REFACTORING PLAN
> **Trạng thái**: ĐÃ ĐƯỢC OWNER DUYỆT (2026-10-27) — BẮT ĐẦU THỰC THI CÓ KIỂM SOÁT (GÓI 003A)  
> **Nguyên tắc cốt lõi**: Trình tự bất biến 003A → 003B → 003C → 003D. Bảo toàn 100% Tuần 33 (W33 Golden Standard — 0 Regression).

---

## 1. TỔNG QUAN 4 GÓI THỰC THI (EXECUTIVE SUMMARY) & NGUYÊN TẮC TUẦN TỰ BẮT BUỘC

> ⛔ **NGUYÊN TẮC TRÌNH TỰ BẤT BIẾN (STRICT SEQUENTIAL EXECUTION)**:
> - 4 gói **003A $\rightarrow$ 003B $\rightarrow$ 003C $\rightarrow$ 003D PHẢI CHẠY ĐÚNG TRÌNH TỰ TUẦN TỰ**, tuyệt đối KHÔNG thực hiện song song, KHÔNG đảo thứ tự.
> - **Lý do kỹ thuật**: Bước verify production của Gói 003B (kiểm tra sạch bóng vết rò rỉ `/audio/week33/`) chỉ có ý nghĩa nếu Gói 003A (xóa hardcode `|| 33`, sửa components dùng chung và dựng Lint Gate CI) đã được deploy và verify đạt chuẩn trên production trước đó. Tương tự, việc dọn dẹp legacy ở Gói 003C chỉ được tiến hành khi các audio mới của 003B đã hoạt động ổn định trên production. Gói 003D là bước đóng băng cuối cùng.
> - **QUY TẮC CHUYỂN TIẾP**: **"Gói N+1 chỉ được bắt đầu sau khi Gói N đã merge + deploy + verify PASS (không chỉ merge xong là đủ)."**

Nhằm giải quyết triệt để sự cố lệch pha âm thanh W34, rò rỉ âm thanh W33, dọn dẹp toàn bộ tàn dư kiến trúc Dictation cũ và đồng bộ hóa hệ thống gates tự động cho toàn bộ 156 tuần, Amendment-003 được chia thành 4 gói kỹ thuật độc lập theo trình tự:

1. **Gói 003A (Shared Components Fidelity & W33 Freeze Guard & CI Lint Gate)**:
   - Sửa 8 component dùng chung để loại bỏ hoàn toàn hardcode `week33`, cấm fallback tĩnh `|| 33` hoặc `activeWeek || 33`.
   - Bổ sung Script Lint tĩnh CI cấm vĩnh viễn pattern `/audio/week\d+` và `|| 33` cho toàn bộ 156 tuần.
   - Bắt buộc kiểm tra Gate 15 W33 + W33 Freeze Guard sau mỗi thay đổi component.
2. **Gói 003B (W34 Content Synchronization & Audio Re-recording & Intermediate Prod Verify)**:
   - Thiết kế lại Info Exchange theo chủ thể thống nhất (Leo the Lion).
   - Thu âm/sinh lại toàn bộ âm thanh bị lệch: Listening P1 (Sammy), P2 (Cambridge-style, bỏ nhãn Student), P3 (theo data đồ vật), P4 (cắt ví dụ, q4/q5), P5 (NET/brown/FOREST/dark green), exam_intro_L3.
   - Bổ sung 5 Webtoon scenes, 3 Discovery hotspots, và các model audio cho Info Exchange.
   - **CỔNG CHẶN BẮT BUỘC**: Chạy verify PRODUCTION riêng ngay sau khi deploy 003B (Gate 18 ASR + Network log thật), PASS 100% mới được mở khóa Gói 003C.
3. **Gói 003C (Legacy Cleanup across W33 & W34)**:
   - Xóa bỏ hoàn toàn tính năng Dictation khỏi code, data, audio, R2, và tài liệu ở cả Tuần 33 và Tuần 34.
   - Xóa nút Dictation Notepad và prefetch trong `StoryWorldZone.jsx`, xóa alias `CreatorStudioZone`, dọn dẹp generator script, cập nhật AGENTS.md (Invariant 10).
4. **Gói 003D (Manifest Modernization & Final Golden Freeze)**:
   - Khôi phục `docs/W34_PEDAGOGICAL_CONTENT_REVIEW.md` từ commit gốc sạch.
   - Bổ sung `audioManifest` chi tiết được **SINH TỰ ĐỘNG BẰNG SCRIPT** (SHA-256 + source text) và Gate 15 Production vào `validationSuite` của manifest cả 2 tuần.
   - Đóng băng W34 đạt cấp độ `GOLDEN_FROZEN v1.1.0`.

---

## 2. CHI TIẾT 4 GÓI THỰC THI (PACKAGES SPECIFICATION)

### 📦 GÓI 003A: SHARED COMPONENTS FIDELITY, CI LINT GATE & W33 FREEZE GUARD

#### A. Mục tiêu
Loại bỏ 100% hardcode đường dẫn âm thanh và fallback lỏng lẻo `|| 33` trong các component dùng chung cho toàn bộ 156 tuần, đồng thời thiết lập chốt chặn tự động vĩnh viễn trên CI/Gate suite.

#### B. Danh sách file thay đổi
1. `src/components/cambridge/InformationExchangeP2.jsx`:
   - Destructure rõ ràng prop `weekNumber`. Bắt buộc truyền `weekNumber` hợp lệ, cấm fallback `customData?.week || 33`.
2. `src/modules/zones/InfoExchangeZone.jsx`:
   - Sửa dòng 602 & 618: Bỏ hardcode `/audio/week33/`, dùng biến `weekNumber` được truyền vào.
3. `src/components/cambridge/CLILExplorer.jsx`:
   - Sửa dòng 180, 201–202: Bỏ hardcode `clil_friction_*`, đọc dynamic audio URL từ `clilData.audio_url` hoặc `fact.audio_url`.
4. `src/components/cambridge/ScienceReportCreator.jsx`:
   - Bỏ mảng hotspots hardcode của W34/W33 trong component, nhận cấu hình `hotspots` từ dữ liệu tuần (`reading_hub.js`).
5. `src/components/common/ExamIntroAudioButton.jsx`:
   - Dòng 11: Bỏ mặc định `weekNumber = 33`. Nếu thiếu `weekNumber`, ghi log cảnh báo và không phát fallback W33.
6. `src/components/cambridge/VisualMatchingAH.jsx`:
   - Dòng 105: Bỏ fallback `/audio/week${weekNumber || 33}/listening_p3_full.mp3`.
7. `src/components/cambridge/MultipleChoice3Pic.jsx`:
   - Đảm bảo nhận prop `weekNumber` chuẩn từ `BossBattleZone.jsx`.
8. `src/modules/zones/StoryWorldZone.jsx`:
   - Dòng 443: Bỏ fallback `activeWeek || 33` tại nút "Full Audio".
9. **`scripts/lint_no_hardcoded_week_audio.mjs` (LINT GATE CI MỚI CHO TOÀN BỘ 156 TUẦN)**:
   - Quét toàn bộ thư mục `src/**/*.jsx` và `src/**/*.js`.
   - Cấm triệt để:
     - Chuỗi literal `/audio/week\d+/` (cấm viết cứng số tuần).
     - Biểu thức fallback `weekNumber || 33`, `activeWeek || 33`, hoặc `|| <number>` cho biến số tuần.
   - Tích hợp vào `npm run lint` và bộ kiểm duyệt trước commit / PR.

#### C. Verification Gates & Tiêu chuẩn nghiệm thu
- `node scripts/lint_no_hardcoded_week_audio.mjs` exit code 0 (0 vi phạm trên toàn bộ `src/`).
- `npm run build` exit code 0.
- `node scripts/guard_golden_w33_freeze.mjs` PASS 100% (W33 SHA-256 không đổi).
- `node scripts/gate15_production_dom_assertions.mjs 33 --local` PASS 15/15 Quests W33.

#### D. Rollback Plan
- Nếu W33 Freeze Guard thất bại: `git checkout HEAD -- src/components/ src/modules/`

---

### 📦 GÓI 003B: W34 CONTENT SYNCHRONIZATION & AUDIO RE-RECORDING & INTERMEDIATE PROD VERIFY

#### A. Mục tiêu
Đồng bộ hóa 100% giữa kịch bản chữ trong Data Hubs và âm thanh vật lý thực tế tại `public/audio/week34/`.

#### B. Danh mục âm thanh sinh / thu mới
1. **Scene Explorer (Quest 1)**:
   - Sinh 5 file: `scene_1.mp3` $\dots$ `scene_5.mp3` tương ứng 5 cảnh truyện Webtoon trong `reading_hub.js`.
2. **Discovery Report (Quest 6)**:
   - Sinh 3 file: `discovery_hotspot_1.mp3`, `discovery_hotspot_2.mp3`, `discovery_hotspot_3.mp3` cho 3 điểm khám phá hệ sinh thái rừng.
3. **Listening Part 1 (Quest 13)**:
   - CẬP NHẬT AUDIO `listening_p1_full.mp3`: Thu lại lời thoại có nhân vật **Sammy the Squirrel** (đáp án nối dây chính thức) và **Rob the Rabbit** (distractor). Giữ nguyên data trong `listening_hub.js`.
4. **Listening Part 2 (Quest 13)**:
   - Viết lại kịch bản hội thoại Cambridge-style chuẩn mực giữa Teacher và Student.
   - Sửa script generator `scripts/generate_week_audio_universal.mjs:83` để regex `speakerPattern` loại bỏ nhãn "Student:" / "Teacher:", không đọc to thành tiếng.
5. **Listening Part 3 (Quest 13)**:
   - Giữ nguyên danh mục đồ vật chuẩn trong `listening_hub.js` (`Wooden Trap`, `Thick Rope`, `Forest Map`, `Water Bottle`, `Compass` và thẻ A–H).
   - Thu âm lại 6 files: `listening_p3_full.mp3` và `listening_p3_item1.mp3` $\dots$ `listening_p3_item5.mp3` theo đúng danh mục đồ vật (thay thế kịch bản động vật đi trốn bão bị lệch).
6. **Listening Part 4 (Quest 13)**:
   - Cắt bỏ đoạn ví dụ dính ở đầu `listening_p4_q1.mp3`.
   - Sinh lại `listening_p4_q4.mp3` (Who helped the lion escape? / Little mouse chewed ropes).
   - Sinh lại `listening_p4_q5.mp3` (How did the lion feel? / Grateful and relieved).
7. **Listening Part 5 (Quest 13)**:
   - Thu âm lại `listening_p5_full.mp3` khớp 100% kịch bản chuẩn trong `listening_hub.js`: Viết chữ `NET`, tô chuột màu `brown`, viết chữ `FOREST` lên biển gỗ, tô mũ màu `dark green`.
8. **Exam Intro L3 (Quest 13)**:
   - Sinh lại `exam_intro_L3.mp3` với đúng lời dẫn Part 3 ("Where did Leo put these things? Listen and write a letter in each box.").
9. **Info Exchange Redesign & XP Economy Normalization (Quest 12)**:
   - Triển khai theo Phương án 2 khuyến nghị (xem Mục 3 dưới đây) gồm 6 lượt hỏi-đáp hoàn chỉnh.
   - Sửa `speaking_hub.js` để `eq1..eq3` trỏ đúng vào `ie_examiner_q1..q3.mp3`.
   - Sinh bổ sung các file model câu hỏi của thí sinh: `info_exchange_a1_model.mp3` $\dots$ `info_exchange_a4_model.mp3`.
   - **Chuẩn hóa XP (Phương án A đã được Owner chọn)**: Sửa dòng khai báo `info_exchange` trong `src/config/questSchedule.js:65`: đổi `xp: 20` $\rightarrow$ `xp: 50`.
   - Xác nhận: Màn hình kết thúc `InfoExchangeZone.jsx:191, 331` ("+50 XP") giờ đây khớp 100% với data model `questSchedule.js`.

#### C. Verification Gates Địa Phương (Local Gates)
- `python3 scripts/rigorous_w34_audio_asr_audit.py` đạt 100% KHỚP (WER $\le 10\%$, 0 thiếu token trọng yếu: NET, brown, FOREST, Sammy, dark green).
- `node scripts/gate3_media_integrity.mjs 34` PASS (0 missing, 0 orphan).
- **XP Consistency Check**: Xác nhận giá trị `xp` của `info_exchange` trong `questSchedule.js` là 50, không còn xung đột hiển thị với UI.

#### D. BƯỚC VERIFY PRODUCTION RIÊNG BIỆT NGAY SAU KHI DEPLOY GÓI 003B (BẮT BUỘC TRƯỚC KHI LÀM 003C)
> 🚨 **CỔNG CHẶN SỐNG TRÊN PRODUCTION**: Không được gộp chung việc nghiệm thu audio vào cuối đợt. Ngay sau khi Gói 003B được merge và deploy lên `https://app.bkbacademy.vn`, Antigravity BẮT BUỘC thực hiện kiểm toán trực tiếp trên Production:

1. **Chạy Playwright Network Intercept trên Production cho 4 Quests bị sửa audio**:
   - `gear1_webtoon`: Bấm nghe 5 scenes $\rightarrow$ Network log phải bắt được `/audio/week34/scene_1..5.mp3` với `status: 200`, `content-type: audio/mpeg`.
   - `science_report`: Bấm 3 hotspots $\rightarrow$ Bắt được `/audio/week34/discovery_hotspot_1..3.mp3` với `status: 200`.
   - `info_exchange`: Bấm nghe câu hỏi giám khảo và model $\rightarrow$ Bắt đúng `/audio/week34/ie_examiner_q*` và `/audio/week34/info_exchange_a*_model.mp3` (KHÔNG CÒN VẾT `/audio/week33/`).
   - `boss_listening`: Bấm nghe P1–P5 $\rightarrow$ Bắt đúng file tĩnh W34.
2. **Kiểm Tra Network Firewall (Zero TTS)**:
   - Khẳng định: **0 request gọi tới `texttospeech.googleapis.com`**.
3. **Chạy Lại Gate 18 Production ASR**:
   - Tải file từ URL production và chạy Whisper Small ASR xác nhận khớp 100% transcript và answer tokens.
4. **Quyết Định Chuyển Tiếp**:
   - **CHỈ KHI VÒNG VERIFY NÀY PASS 100%** thì mới được phép bắt đầu thực thi Gói 003C (Cleanup). Nếu phát hiện bất kỳ lỗi 404 hoặc gọi TTS nào $\rightarrow$ Dừng lại, rollback hoặc sửa ngay trong phạm vi 003B.

---

### 📦 GÓI 003C: LEGACY CLEANUP ACROSS W33 & W34

#### A. Mục tiêu
Xóa bỏ hoàn toàn tính năng Dictation và các tàn dư kiến trúc cũ ở cả W33 và W34 theo Quyết định 1 của Owner.

#### B. Danh sách công việc chi tiết
1. **Dọn dẹp UI / Component**:
   - `src/modules/zones/StoryWorldZone.jsx`: Xóa nút bấm "✍️ Dictation Notepad" (dòng 1083–1092) và khối chuyển mode `voiceShadowMode === 'dictation'` (dòng 1116–1152).
   - Xóa khối prefetch 8 file dictation (dòng 274–282).
   - `src/modules/zones/CreatorStudioZone.jsx`: Loại bỏ các alias cũ trỏ về dictation.
   - `src/modules/dictation/DictationEngine.jsx`: Đánh dấu deprecated hoặc loại bỏ component mồ côi.
2. **Dọn dẹp Data & Audio**:
   - Xóa các file vật lý `dictation_1.mp3` $\dots$ `dictation_8.mp3` trong cả `public/audio/week33/` và `public/audio/week34/`.
   - Xóa `listening_p5_inst1.mp3` $\dots$ `listening_p5_inst5.mp3` trong `public/audio/week34/`.
   - Loại bỏ `dictation.js` trong W33 và W34 sau khi kiểm tra không còn file nào import.
3. **Cập nhật Tooling & Generator**:
   - `scripts/generate_week_audio_universal.mjs`: Xóa khối sinh audio dictation (dòng 174–180).
4. **Cập nhật Tài liệu & Quy tắc**:
   - Cập nhật `AGENTS.md`: Xóa Invariant 10 ("Everyday Conversation & Cambridge Exam Dictation Invariant"), đồng bộ hóa Mục 1.2 (cấm dictation).

#### C. Verification Gates & Tiêu chuẩn nghiệm thu
- `node scripts/guard_golden_w33_freeze.mjs` PASS (sau khi cập nhật manifest W33 loại bỏ dictation).
- `node scripts/gate15_production_dom_assertions.mjs 33 --local` PASS 15/15 Quests W33 (không còn vết dictation trong DOM).
- `node scripts/gate15_production_dom_assertions.mjs 34 --local` PASS 15/15 Quests W34.

---

### 📦 GÓI 003D: MANIFEST MODERNIZATION & FINAL GOLDEN FREEZE

#### A. Mục tiêu
Khôi phục tài liệu duyệt sư phạm W34 sạch, hiện đại hóa cấu trúc manifest cho cả W33 và W34, sinh tự động `audioManifest` bằng mã nguồn, và đóng băng chất lượng.

#### B. Danh sách công việc chi tiết
1. **Khôi phục Tài Liệu Duyệt Sư Phạm W34**:
   - Khôi phục `docs/W34_PEDAGOGICAL_CONTENT_REVIEW.md` từ commit gốc sạch `e8e102cd` (55,871 bytes, SHA-256 `814ef60a...`), loại bỏ toàn bộ ghi chú handoff/hội thoại.
   - Cập nhật nội dung tài liệu để phản ánh đúng các sửa đổi từ Gói 003B và xóa mục Dictation.
2. **Hiện đại hóa `W34_GOLDEN_FREEZE_MANIFEST.json` và `W33_GOLDEN_FREEZE_MANIFEST.json`**:
   - Loại bỏ **CHỈ `dictation.js`** khỏi danh mục `protectedSourceFiles` (vì `dictation.js` bị xóa hoàn toàn ở Gói 003C).
   - **GIỮ NGUYÊN `read.js`** trong `protectedSourceFiles` (do `read.js` vẫn đang phục vụ `read_stem.mp3` ở Quest 2 Voice Shadow theo `ARCHITECTURE_CURRENT.md` §3.2, và được import bởi `reading_hub.js` / `index.js`). Nếu có kế hoạch tái cấu trúc, Gói 003D sẽ cập nhật hash mới cho `read.js` chứ tuyệt đối không bỏ bảo vệ Freeze Guard.
   - Chuẩn hóa trường `zone` trong `taskInventory` thành `zone: 1..5` khớp 100% với 5 Ngày học.
   - **QUY CHUẨN SINH `audioManifest` (TUYỆT ĐỐI KHÔNG NHẬP TAY)**:
     - `audioManifest` BẮT BUỘC phải được **SINH TỰ ĐỘNG 100%** bằng script [scripts/build_w34_audio_manifest.mjs](file:///Users/binhnguyen/projects/Engquest3k/scripts/build_w34_audio_manifest.mjs).
     - Script tự động import các Data Hubs (`reading_hub.js`, `listening_hub.js`, `speaking_hub.js`, `vocab.js`), bóc tách trường text gốc, và dùng `crypto.createHash('sha256')` băm trực tiếp từ file vật lý trên đĩa.
     - **CẢNH BÁO AUDIT C17**: Mọi manifest nhập tay hoặc chỉnh sửa thủ công sẽ bị Claude lập tức REJECT vì vi phạm nguyên tắc "Bằng chứng thô tự động".
   - Thêm Gate 15 Production Live Runtime vào mảng `validationSuite`.
3. **Nâng Cấp Lifecycle State**:
   - Nâng `lifecycleState` của W34 từ `CONTENT_COMPLETE_PENDING_RUNTIME_VERIFICATION` lên `GOLDEN_FROZEN v1.1.0`.

#### C. Verification Gates
- Toàn bộ Gate Suite (Gate 3, Gate 11, Gate 12, Gate 15, Gate 16, Gate 17, Gate 18, W33 Guard, W34 Guard) PASS 100%.

---

### 📦 GÓI 003E (ĐỘC LẬP / HỆ THỐNG): RAW DIAGNOSTIC SCORE FOR PARENTS & TEACHERS

> ℹ️ **TÍNH CHẤT ĐỘC LẬP**: Gói 003E là tính năng hệ thống toàn diện, chạy SONG SONG với các gói 003B-D, KHÔNG nằm trong chuỗi tuần tự bắt buộc và KHÔNG chặn việc đóng băng W34.

#### A. Khảo sát hạ tầng hiện tại (Code Truth)
- **ĐÃ TỒN TẠI hạ tầng Dashboard trong codebase**:
  - `src/pages/ParentDashboard.jsx` (route `/dashboard` tại `App.jsx:469`).
  - `src/components/TeacherDashboard.jsx`.
- **Cơ chế lưu trữ hiện tại**: `MockAssessmentEngine.js` đánh giá kết quả mock test và trả về `sectionResults` kèm `shields`, nhưng `rwShields`, `listenShields`, `speakingShields` đều bị ép sàn `max(1, ...)`.

#### B. Phạm vi kỹ thuật Gói 003E
1. **Engine Cốt Lõi (`src/services/assessment/MockAssessmentEngine.js`)**:
   - Bổ sung vào kết quả trả về của từng Paper và tổng thể 3 trường thô (raw scores — không áp dụng sàn `max(1, ...)`):
     - `rawCorrectCount`: Số câu trả lời đúng thực tế (có thể là 0).
     - `rawTotalCount`: Tổng số câu hỏi của Paper (ví dụ 25 câu).
     - `rawScorePct`: Tỷ lệ phần trăm điểm thực tế chính xác (ví dụ $0\%$, $12\%$).
   - Lưu trữ 3 trường này vào `progressCache` và payload gửi Cloud DB Supabase thông qua `useUserStore.getState().syncProgressToServer`.
2. **Giao Diện Học Sinh & Passport**:
   - **GIỮ NGUYÊN 100% số Khiên (1–5 Shields)** hiển thị cho học sinh, Passport chứng nhận và màn hình Boss Castle để đảm bảo tâm lý khuyến khích chuẩn Cambridge YLE.
3. **Đề Xuất Hiển Thị Cho Phụ Huynh / Giáo Viên (Chờ Owner Duyệt Trước Khi Code UI)**:
   - Trên `ParentDashboard.jsx` và `TeacherDashboard.jsx`: Hiển thị song song:
     - Số Khiên Cambridge: `1/5 Khiên 🛡️`
     - Điểm thực tế chi tiết: `Điểm bài thi: 2/25 câu đúng (8%) — Cần phụ đạo thêm kỹ năng Đọc hiểu`.
   - Giúp phụ huynh và giáo viên phát hiện chính xác lỗ hổng kiến thức mà không bị che khuất bởi sàn 1 khiên.

---

## 3. THIẾT KẾ CHI TIẾT INFO EXCHANGE (SPEAKING S2)

Theo Quyết định 2 của Owner: Thẻ Thí sinh và Thẻ Giám khảo phải **CÙNG MỘT CHỦ THỂ**, thông tin bổ sung cho nhau; Giám khảo chỉ hỏi phần Thí sinh CÓ; Thí sinh hỏi phần Giám khảo CÓ.

### 🌟 PHƯƠNG ÁN 1: Chủ thể "The Fable School Play (Vở kịch ngụ ngôn của trường)"
- **Thẻ Thí sinh (Candidate Card)**: "School Play: The Lion and the Mouse — Sam's Role"
  - *Play Location*: School Hall (Known)
  - *Start Time*: 09:15 AM (Known)
  - *Teacher in Charge*: Miss Green (Known)
  - *Rehearsal Time*: ? (Unknown — Thí sinh hỏi Giám khảo)
  - *Props Needed*: ? (Unknown — Thí sinh hỏi Giám khảo)
- **Thẻ Giám khảo (Examiner Card)**: "School Play: The Lion and the Mouse — Rehearsal & Props"
  - *Play Location*: ? (Unknown — Giám khảo hỏi Thí sinh)
  - *Start Time*: ? (Unknown — Giám khảo hỏi Thí sinh)
  - *Teacher in Charge*: ? (Unknown — Giám khảo hỏi Thí sinh)
  - *Rehearsal Time*: 20 minutes (Known)
  - *Props Needed*: 4 animal masks & rope net (Known)
- **Câu hỏi của Giám khảo (Examiner Questions)**:
  1. *eq1*: "Where will the children perform the fable play?" (Đáp án: In the school hall.)
  2. *eq2*: "What time does the fable play begin?" (Đáp án: At 09:15 AM.)
  3. *eq3*: "Who is the teacher helping with the play?" (Đáp án: Miss Green.)
- **Câu hỏi của Thí sinh (Candidate Model Questions)**:
  1. *cq1*: "How long will the children practice in the hall?" (Đáp án: For 20 minutes.)
  2. *cq2*: "What props did Sam make in the art room?" (Đáp án: 4 animal masks.)
  3. *cq3*: "What did his father bring to school?" (Đáp án: A strong rope net.)
- **Audio cần sinh**:
  - Giám khảo: `ie_examiner_q1.mp3`, `ie_examiner_q2.mp3`, `ie_examiner_q3.mp3`
  - Thí sinh: `info_exchange_a1_model.mp3`, `info_exchange_a2_model.mp3`, `info_exchange_a3_model.mp3`

---

### 🏆 PHƯƠNG ÁN 2 (KHUYẾN NGHỊ): Chủ thể "Leo the Lion in Green Valley Forest"
> **Lý do khuyến nghị**: Giữ trọn vẹn nhân vật trung tâm của bài học (Leo & Milo), gắn kết sâu sắc với cốt truyện Webtoon và bài đọc CLIL của Tuần 34. Học sinh 8–10 tuổi hào hứng hơn khi nói về thế giới động vật.

- **Thẻ Thí sinh (Candidate Card)**: "Leo the Lion — Habitat & Daily Habits"
  - *Living Place*: Green Valley Forest (Known)
  - *Resting Time*: Sunny afternoons (Known)
  - *Favorite Food*: Fresh wild berries & water (Known)
  - *Special Rescuer*: ? (Unknown — Thí sinh hỏi Giám khảo)
  - *Tool to Escape*: ? (Unknown — Thí sinh hỏi Giám khảo)
- **Thẻ Giám khảo (Examiner Card)**: "Leo the Lion — The Great Rescue"
  - *Living Place*: ? (Unknown — Giám khảo hỏi Thí sinh)
  - *Resting Time*: ? (Unknown — Giám khảo hỏi Thí sinh)
  - *Favorite Food*: ? (Unknown — Giám khảo hỏi Thí sinh)
  - *Special Rescuer*: Milo the tiny mouse (Known)
  - *Tool to Escape*: Sharp teeth to chew thick ropes (Known)
- **Câu hỏi của Giám khảo (Examiner Questions)** — *Giám khảo chỉ hỏi thông tin Thí sinh CÓ*:
  1. *eq1*: "Where does Leo the lion live?"
     - *Thí sinh trả lời*: "He lives in Green Valley Forest."
  2. *eq2*: "When does the mighty lion usually rest?"
     - *Thí sinh trả lời*: "He rests on sunny afternoons under a shady tree."
  3. *eq3*: "What does Leo like to eat and drink in the forest?"
     - *Thí sinh trả lời*: "He likes fresh wild berries and cool water."
- **Câu hỏi của Thí sinh (Candidate Model Questions)** — *Thí sinh hỏi thông tin Giám khảo CÓ*:
  1. *cq1*: "Who rescued the mighty lion from the hunter's trap?"
     - *Giám khảo trả lời*: "Milo the tiny mouse rescued him."
  2. *cq2*: "What tool did the mouse use to cut the heavy net?"
     - *Giám khảo trả lời*: "He used his sharp teeth to chew through the thick ropes."
  3. *cq3*: "Are the lion and the mouse best friends now?"
     - *Giám khảo trả lời*: "Yes, they are best friends forever."
- **Danh mục Audio cần có**:
  - File câu hỏi giám khảo: `ie_examiner_q1.mp3`, `ie_examiner_q2.mp3`, `ie_examiner_q3.mp3`
  - File câu hỏi mẫu thí sinh: `info_exchange_a1_model.mp3`, `info_exchange_a2_model.mp3`, `info_exchange_a3_model.mp3` (kèm các biến thể cá nhân `_m1`, `_m2`)

---

## 4. TIÊU CHÍ NGHIỆM THU TRÊN PRODUCTION SAU KHI DEPLOY TOÀN BỘ 4 GÓI

Sau khi hoàn tất cả 4 gói và deploy lên `https://app.bkbacademy.vn`, việc nghiệm thu cuối cùng BẮT BUỘC phải thực hiện trực tiếp trên môi trường Production với các tiêu chí định lượng:

1. **Network Firewall & Content-Type Assertion**:
   - 100% request âm thanh phát sinh từ 15 Quests phải trỏ về `/audio/week{N}/*.mp3` với HTTP status `200 OK` và header `content-type: audio/mpeg`.
   - **Tối đa 0 request Google Cloud TTS**: Tuyệt đối không có bất kỳ request nào gọi tới `texttospeech.googleapis.com` trong suốt quá trình hoàn thành 15 Quests (trừ khi học sinh tự gõ chữ trong Story Writer).
2. **Gate 15 Production Live Runtime (Dedup Check)**:
   - Chạy Playwright trên Production cho cả Tuần 33 và Tuần 34.
   - Đạt 15/15 Quests PASS kèm $\ge 15$ screenshot hashes độc lập khác nhau, chứng minh học sinh thực sự tương tác với từng màn hình.
3. **Double Freeze Guard Assertion**:
   - `node scripts/guard_golden_w33_freeze.mjs` PASS 100%.
   - `node scripts/guard_golden_w34_freeze.mjs` PASS 100%.
4. **Gate 18 Answer-Token & Whisper ASR Assertion**:
   - Danh sách expected text được trích xuất tự động từ data files.
   - Toàn bộ 100% audio bài thi Cambridge đạt xác nhận chứa đầy đủ các token trọng yếu: `NET`, `brown`, `FOREST`, `Sammy`, `dark green`, `Miss Green`, `09:15 AM`.
5. **Đồng Bộ Cloudflare R2 (Nếu Sử Dụng)**:
   - Bằng chứng network từ production playtest xác nhận: Ứng dụng phát trực tiếp file tĩnh từ domain chính `app.bkbacademy.vn`. Khi file tồn tại cục bộ, R2 không được gọi. R2 chỉ đóng vai trò CDN phụ trợ (Candidate 2 trong `VoiceService.js`).
   - Nếu R2 được cấu hình đồng bộ, lệnh `curl -sI https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/week34/*.mp3` BẮT BUỘC trả về `HTTP/2 200` và `content-type: audio/mpeg` (thay vì HTTP 404 như hiện tại).
