# GIẢI TRÌNH & BỔ SUNG BẰNG CHỨNG 5 ĐIỂM REVIEW MINI-GAME CHRONICLES
**Thời gian thực hiện:** 2026-09-10  
**Đối tượng:** 21 Mini-Game Super Leo Chronicles (Phản biện 5 điểm yêu cầu làm rõ)  
**Tiêu chuẩn bằng chứng:** 100% dựa trên output lệnh, log kiểm thử, và screenshot từ browser Puppeteer thật.

---

## 1. MỤC 1 — GIẢI TRÌNH CON SỐ "30/30": BẢN CHẤT CÁCH ĐẾM CŨ VS MỚI

### 1.1. Vì sao vòng trước số liệu là W33=8, W34=4, W35=3?
- Script ở vòng trước (trích từ `transcript_full.jsonl` step 5836 và `clarification_4points.md`):
  ```js
  // Script cũ chỉ đọc DUY NHẤT 1 file: reading_hub.js bằng regex chuỗi
  const rhPath = path.join(WEEKS_DIR, dir, 'reading_hub.js');
  const raw = readFileSync(rhPath, 'utf-8');
  const allDefsRaw = (raw.match(/(?:definition|meaning)\s*:\s*["'`]([^"'`]{5,})/g) || []);
  const realDefs = allDefValues.filter(v => !v.startsWith('Related to ')).length;
  ```
- **Kết quả script cũ**: Chỉ đếm những dòng text có chữ `definition:` hoặc `meaning:` bên trong nội dung riêng của `reading_hub.js`. Do cách tổ chức file của từng tuần khác nhau, regex này chỉ bắt được:
  - W33: 8 định nghĩa trong `reading_hub.js`.
  - W34: 4 định nghĩa trong `reading_hub.js`.
  - W35: 3 định nghĩa trong `reading_hub.js`.

### 1.2. Vì sao script `test_bug002_verification.mjs` lại ra con số 30 cho cả 3 tuần?
- Script `test_bug002_verification.mjs` mô phỏng logic nạp từ vựng mới của `contentService.js` (đọc toàn bộ các nguồn dữ liệu từ vựng của tuần):
  1. `weekData.stations.new_words` (mảng từ vựng chính): **20 items**.
  2. `writing_hub.rw_part_1.definitions` (mảng câu định nghĩa Reading & Writing Part 1): **10 items**.
  3. Tổng số items nạp vào: **20 + 10 = 30 items**.
- **Bản chất của con số 30**:
  - Đúng như chủ dự án nhận định, **30 là kích thước cố định của cấu trúc dữ liệu (`20 + 10 = 30`)**, không phải số lượng tự nhiên ngẫu nhiên trùng hợp.
  - **Ở Week 33**: 20 từ trong `new_words` là từ vựng thật của tuần 33 (corridor, rubber, friction, bandage...) + 10 định nghĩa thật trong `writing_hub` $\rightarrow$ 30 items này đều có definition tiếng Anh thật, 0 filler `"Related to"`.
  - **Ở Week 34 & Week 35**: Cả 2 tuần này đều là **dữ liệu template mock** (20 từ về `lion`, `mouse`, `paw`, `hunter`, `net`... giống hệt nhau) + 10 items template trong `writing_hub` $\rightarrow$ Vì dùng chung bộ khung template 20+10, script đếm ra 30 items.
  - **Minh bạch**: Con số 30/30 ở W34/W35 chứng minh cơ chế nạp không bị văng lỗi và không tự sinh filler `"Related to"`, nhưng dữ liệu bên dưới của W34/W35 là mock template, chỉ có W33 là dữ liệu nội dung thật hoàn chỉnh.

---

## 2. MỤC 2 — I7 WORD CLASS DUEL: BẰNG CHỨNG 4 ROUND & NGUỒN CÂU NGỮ CẢNH

### 2.1. Bằng chứng Puppeteer chụp thực tế cả 4 Round (Trích xuất Verbatim)

Đã chạy kịch bản tự động tương tác qua cả 4 round (`scripts/capture_all_4_rounds_word_class_duel.mjs`):

| Round | Target Word | Role Cần Tìm | DOM Verbatim Trích Xuất từ Browser | Screenshot Bằng Chứng |
|---|---|---|---|---|
| **Round 1** | **GRIP** | VERB | `ROUND 1 OF 4 • TARGET WORD: "GRIP" \| Which sentence uses 'grip' as a VERB (hành động)? \| CARD A: Rubber gives a strong grip... \| CARD B: Your rubber shoes grip firmly...` | [`word_class_duel_round_1_grip.png`](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/word_class_duel_round_1_grip.png) |
| **Round 2** | **SLIDE** | NOUN | `ROUND 2 OF 4 • TARGET WORD: "SLIDE" \| Which sentence uses 'slide' as a NOUN (danh từ)? \| CARD A: Smooth soles slide easily... \| CARD D: Water turns safe corridors into a dangerous slide.` | [`word_class_duel_round_2_slide.png`](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/word_class_duel_round_2_slide.png) |
| **Round 3** | **CARE** | VERB | `ROUND 3 OF 4 • TARGET WORD: "CARE" \| Which sentence uses 'care' as a VERB (hành động)? \| CARD A: School safety and care are our responsibility. \| CARD D: Teachers care deeply about student safety.` | [`word_class_duel_round_3_care.png`](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/word_class_duel_round_3_care.png) |
| **Round 4** | **HELP** | NOUN | `ROUND 4 OF 4 • TARGET WORD: "HELP" \| Which sentence uses 'help' as a NOUN (danh từ)? \| CARD A: Jake called the nurse for immediate help. \| CARD B: Good students help each other...` | [`word_class_duel_round_4_help.png`](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/word_class_duel_round_4_help.png) |

*Dữ liệu đầy đủ lưu tại: `docs/agent_artifacts/screenshots/word_class_duel_4rounds_evidence.json`.*

### 2.2. Nguồn gốc ngữ cảnh của 4 từ trong W33 (Minh bạch 100%)
- **Round 1 (`grip`) — NGUYÊN BẢN 100%**:
  - Trích nguyên văn từ bài đọc khoa học W33 `clil_article.content_en`:
    - *"...your shoes **grip** firmly..."* (VERB)
    - *"Tom, rubber gives a strong **grip**..."* (NOUN)
    - *"...smooth plastic soles with no **grip**!"* (NOUN)
    - *"...the friendly **grip** between your shoe soles and the floor..."* (NOUN)
- **Round 2 (`slide`) — BÁN NGUYÊN BẢN (MIXED)**:
  - Thẻ đáp án đúng danh từ (*"Water turns safe corridors into a dangerous slide."*) được phóng tác trực tiếp từ câu gốc CLIL: *"turning safe floors into a slippery slide!"*.
  - 3 thẻ động từ gây nhiễu (*"Smooth soles slide easily across wet tiles"*, *"Children might slide..."*, *"Friction stops you before you slide..."*) là câu **được biên soạn bổ sung** để tạo đủ 4 lựa chọn cho game.
- **Round 3 (`care`) — BIÊN SOẠN BỔ SUNG (AUTHORED)**:
  - Trong W33, từ vựng gốc là tính từ `careful`. Cả 4 câu chứa danh từ/động từ `care` (*"Teachers care deeply..."*, *"Take great care..."*, *"School safety and care..."*, *"The nurse provided gentle medical care"*) là câu **được biên soạn riêng theo chủ đề W33**, không có trong bài đọc gốc.
- **Round 4 (`help`) — BIÊN SOẠN BỔ SUNG (AUTHORED)**:
  - Trong W33, cốt truyện chỉ có động từ *"Jake stopped immediately to help his friend..."*. 4 câu trong game (*"Jake called the nurse for immediate help"*, *"Good students help each other..."*, *"Warning signs help..."*, *"Cold packs help..."*) là câu **được biên soạn riêng theo chủ đề W33**, không trích nguyên văn toàn bộ.

**Kết luận Mục 2**: Đúng như phân tích trước đó, W33 chỉ có duy nhất từ `grip` là có sẵn cả 2 vai trò Noun/Verb trong văn bản gốc. Để tạo thành 4 rounds chơi hoàn chỉnh, game I7 **bắt buộc phải có tệp nội dung chú giải riêng (`word_class_duel.js`) do biên tập viên chuẩn bị cho từng tuần**, không thể tự động trích xuất 100% từ bài đọc nếu bài đọc không cố tình dùng từ đa loại từ.

---

## 3. MỤC 3 — CONNECTOR RELAY: NGUỒN CÂU LÀ QUYẾT ĐỊNH THIẾT KẾ NỘI DUNG

- Câu trong DOM: *"Jake walked carefully down the corridor ? the floor was wet after science class."*
- **Xác nhận bằng văn bản**: Đây là **QUYẾT ĐỊNH THIẾT KẾ NỘI DUNG CÓ CHỦ ĐÍCH** (Intentional Content Design Decision), không phải trôi dạt do paraphrase mất kiểm soát:
  - **Mục tiêu sư phạm của G6 (Connector Relay)**: Đánh giá khả năng hiểu và sử dụng liên từ chỉ nguyên nhân (`because`), nhượng bộ (`although`), mục đích/kết quả (`so`), điều kiện (`unless`), và liên kết chuỗi hành động (`and`).
  - **Thực trạng câu gốc trong `story_scenes` W33**: Các câu chuyện là câu tự sự độc lập (*"Jake was walking carefully down the school corridor after science class"* / *"Suddenly, he lost his balance on the wet floor and slipped"*), không chứa các liên từ phụ thuộc phức tạp này.
  - Do đó, 5 câu trong `ConnectorRelayGame.jsx` được thiết kế có chủ đích: giữ nguyên nhân vật (Jake, Tom, Nurse), bối cảnh (hành lang, sàn ướt, giày cao su, ma sát), nhưng tái cấu trúc thành các câu phức chứa liên từ để phục vụ đúng chuẩn ngữ pháp Cambridge Movers/Flyers.

---

## 4. MỤC 4 — G7 QUESTION QUEST: XÁC NHẬN 3 YÊU CẦU A, B, C

### (a) Sửa lỗi possessive kép ("Maria's's"):
- ✅ **Đã thực hiện**: Trong `scripts/test_wh_generator_fixed.mjs` (dòng 43-53):
  ```js
  const lowerPossessive = new RegExp(`\\b${noun.toLowerCase()}'s\\b`, 'g');
  result = result.replace(lowerPossessive, `${noun}'s`);
  result = result.replace(/'s's/gi, "'s"); // Chặn hoàn toàn 's's
  ```
- **Kiểm chứng thực tế**: Test câu `"Everyone cheered loudly, and Maria's mom drove her home safely."` $\rightarrow$ Sinh ra câu hỏi: `What did Maria's mom remind everyone about?` (chứa `Maria's`, không bị lặp thành `Maria's's`).

### (b) Mở rộng verb-detection list bằng suffix fallback:
- ✅ **Đã thực hiện**: Trong `scripts/test_wh_generator_fixed.mjs` (dòng 8-15):
  ```js
  const NON_VERB_ED = /\b(red|bed|shed|fed|led|sled|speed|need|reed|weed|seed)\b/i;
  function isPastVerb(token) {
    const clean = token.replace(/[^a-z]/gi, '').toLowerCase();
    if (KNOWN_PAST_VERBS.test(clean)) return true;
    if (clean.length >= 4 && (clean.endsWith('ed') || clean.endsWith('d')) && !NON_VERB_ED.test(clean)) {
      return true;
    }
    return false;
  }
  ```
- **Kiểm chứng thực tế**: Test câu `"The lion roared suddenly..."` $\rightarrow$ Động từ `roared` (không có trong whitelist 40 từ) được nhận diện chính xác qua đuôi `ed`.

### (c) Bước review riêng duyệt câu hỏi trước khi đưa vào game:
- ✅ **Đã thực hiện**: Câu hỏi cho G7 **KHÔNG chạy auto-gen ở runtime**.
- 5 câu hỏi của W33 được sinh sẵn ở build-time và lưu thành tệp tĩnh tại `src/data/weeks/week_33/wh_questions.js`.
- **Đã cập nhật header comment**: Đã sửa rõ ràng thành `Pre-generated WH Questions — pending pedagogy review before release` để phản ánh đúng hiện trạng là bản tiền sinh cần bước duyệt sư phạm trước khi release cho học sinh thật.

---

## 5. ĐIỀU KIỆN TIÊN QUYẾT TRƯỚC KHI BẬT CHO HỌC SINH THẬT (RELEASE GATING)
1. **Duyệt sư phạm nội dung AUTHORED**: Thực hiện kiểm duyệt nội dung độc lập cho các câu biên soạn bổ sung trong `Word Class Duel` (Round 2–4) và `Connector Relay` (5 câu) trước khi bật feature flag.
2. **Khai thác từ dual-class sạch cho các tuần tiếp theo**: Duy trì việc biên tập thủ công các tệp `word_class_duel.js` cho từng tuần, ưu tiên các từ có sẵn ngữ cảnh Noun/Verb trong bài đọc gốc (như `grip` ở W33).

### 5.1. Thừa nhận và khắc phục lỗi Linter
- Khi chạy `npx eslint` lần đầu trên 6 component game mới, linter đã báo **11 lỗi** (lỗi unescaped entities, lỗi gọi impure `Math.random` trong `useMemo`, và lỗi `setState` đồng bộ trong effect).
- **Các điểm đã refactor lại ngay lập tức**:
  1. `WordClassDuelGame.jsx` & `QuestionQuestGame.jsx`: Thay thế `sort(() => Math.random() - 0.5)` trong `useMemo` bằng thuật toán xoay mảng xác định theo `roundIdx` (`shift = (roundIdx * 2) % len`).
  2. `WordForgeScrambleGame.jsx`: Loại bỏ `useEffect` gọi `setState` khi chuyển vòng, chuyển sang hàm callback `advanceToNextRound()` kích hoạt bởi timeout.
  3. Toàn bộ 6 component: Thay thế dấu ngoặc kép trần trong JSX bằng `&ldquo;...&rdquo;`.

### 5.2. Kết quả kiểm tra Linter & Build thật (Verbatim)
- **Lệnh ESLint**:
  ```bash
  npx eslint src/modules/chronicles/games/{SynonymStormGame,WordForgeScrambleGame,ConnectorRelayGame,QuestionQuestGame,StorySequencerGame,WordClassDuelGame}.jsx
  ```
  **Output: Exit code 0 (0 errors, 0 warnings).**

- **Lệnh Build**:
  ```bash
  npm run build
  ```
  **Output: Exit code 0 (`built in 16.97s`).**

### 5.3. Hạ cấp các nhãn đánh giá (Ghi nhận chính xác mức độ bằng chứng)
- **Khai báo biến & Cú pháp React**: ✅ **PASSED (Xác nhận bởi ESLint 0 errors)**.
- **Đóng gói Bundle**: ✅ **PASSED (Xác nhận bởi Vite build exit code 0)**.
- **Chống gian lận (Cheat-proofing)**: ⚠️ **`[CODE-INSPECTED — Kiểm tra bằng phân tích tĩnh luồng state điểm/XP, chưa có unit test tự động riêng]`**.
- **Tính toàn vẹn tiến độ (Progress Data Integrity)**: ⚠️ **`[CODE-INSPECTED — Logic gọi onComplete tại thời điểm game over, ghi vào store qua DailyRoomScreen]`**.
