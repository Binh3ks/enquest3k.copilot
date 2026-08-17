# EngQuest3K — Agent Memory

## 🔴 MANDATORY Multi-Agent Review Protocol — 2026-08-17
**Áp dụng cho MỌI thực thi code sau này. KHÔNG được bỏ qua.**

### Quy trình bắt buộc sau mỗi lần implement/sửa code:
Sau khi implement xong, Agent thực thi PHẢI tự spawn **Reviewer Agent** (adversarial mode) để kiểm tra lại theo checklist sau:

#### Checklist Reviewer Agent phải kiểm tra:
1. **Variable Declaration**: Mọi biến được dùng trong function có được khai báo trước đó không? (Tránh ReferenceError / TDZ — Lesson-006)
2. **Cheat-proofing (Speaking/Assessment)**: Không có fallback text injection, không dùng audio duration làm proxy điểm chất lượng, không bypass check mode bằng length > N
3. **Progress Data Integrity**: `logAttempt` chỉ được gọi khi `isAttempted: true` — không ghi data rác vào analytics
4. **Mode Separation**: `isStealthMode/check` phải có code path riêng nghiêm ngặt, không chia sẻ lenient fallback của Learn Mode
5. **Build Verification**: `npm run build` PHẢI exit code 0 trước khi push
6. **Audit Gate**: `npm run audit:week <N>` (nếu thay đổi week data) PHẢI pass 0 errors

#### Template báo cáo Reviewer Agent:
```
## 📋 Multi-Agent Review Report — Commit <hash>
### 🔴 CRITICAL BUGS (crashes / wrong scores)
### 🟡 HIGH RISKS (cheating loopholes / data pollution)
### ✅ PASSED (correct implementation)
```

#### Quy tắc vòng lặp:
- Nếu Reviewer phát hiện CRITICAL BUG → **sửa ngay, push fix commit riêng** với message `fix(...): ... [multi-agent-review]`
- Nếu chỉ có HIGH RISK → **báo cáo user quyết định** có sửa ngay không
- Nếu PASSED hết → push production commit bình thường

#### Precedents từ W33 Golden Master (Commit 44c1cf13 → 60923a4e → ...):
- BUG-1: `targetText` declared in map object nhưng không extract thành `const` → dùng `undefined` → sai 100%
- BUG-2: `logAttempt` gọi kể cả `isAttempted: false` → data rác analytics
- R-1: `textToEval.trim().length > 3` bypass trong Check Mode → học sinh gõ `asdf` pass → đã sửa thành `isStrictPass || isLenientPass`

## Output Discipline (token-saving) — 2026-07-03
Khi xuất báo cáo hoặc sửa code trong session OpenHands/Devin:
- Ưu tiên code cô đọng; bỏ phân tích lý thuyết thừa.
- Báo cáo tiến độ: 3 mục — (a) đã xong, (b) đang dở, (c) cần user quyết.
- Báo cáo bug: nhảy thẳng Root Cause + Code Fix; bỏ file-table/kiến trúc trừ khi user yêu cầu.
- Code fix: block ≤30 dòng; comment tối thiểu.
- KHÔNG viết "xem tiếp phần sau", "trình bày báo cáo đầy đủ" kiểu rerun.
- Khi sắp hết output budget: dừng giải thích, chuyển ngay sang code patch ngắn nhất.

Source: `.devin/workflows/start.md` §3.

## AI Tutor & Vocab Quality Standard — 2026-08-07
- **No Premature Praise**: AI question templates MUST NOT contain hardcoded reactions like "That sounds wonderful!". Questions must strictly end with `[Question]? Say: [Option A], or [Option B]`.
- **Vietnamese Diacritics**: All `definition_vi` entries in `vocab.js`, `word_match`, and `dictionary` MUST have full Vietnamese diacritic accents (e.g., `đã trao`, `lớp mỹ thuật`).
- **Explore & Reading Chunking Standard (Linear Thinking ESL)**:
  1. **Category 1: Verb Phrase Complete (Verb + Prep + Noun Phrase)**: DO NOT orphan prepositions (e.g., NEVER chunk `walked to`, `looked at`, `sat down with` without target objects). MUST chunk complete action units: `walked to the park`, `looked at the comic strip`, `sat down with his pencils and paper`.
  2. **Category 2: Prepositional Phrase (Time/Place)**: Keep prepositional setting context intact: `In Panel One`, `In Panel Two`, `At the very end`, `In the morning`.
  3. **Category 3: Target Grammar Focus (Past Simple + Complement/Adverb)**: `was sunny and warm`, `were tired but happy`, `walked slowly`, `played happily`.
  4. **Category 4: Collocations & Compound Nouns**: `Sunday afternoon`, `Saturday morning`, `comic strip`, `speech bubble`, `street musician`.
  5. **Formatting Rules**: Capitalize day names/proper nouns (`Saturday morning`). Terminal punctuation (`.`, `,`, `!`, `?`) MUST strictly stay OUTSIDE bold tags `**...**`.
  6. **Automated Audit**: Run `npm run audit:chunks` (`node scripts/audit_chunks.js`) before committing to guarantee 0 chunking errors.
- **Audio & TTS Fallback**: `audio_word` paths MUST handle missing MP3 files gracefully with browser TTS fallback so card flip audio never hangs or crashes.

## Google Cloud TTS & Shadowing Standard — 2026-08-07
- **Google Cloud TTS Direct Engine**: System-wide TTS is routed to Google Cloud TTS Direct with `en-US-Journey-F` (Narration/Shadowing), `en-US-Neural2-F` (Vocab/Dictation), and `en-US-Neural2-D` (Questions/Mindmap). Always map invalid `Neural2-B` voice names to `Neural2-D`.
- **Cache Key Alignment**: In station views (`ReadingExplore.jsx`, `Explore.jsx`), `speakText` calls for narratives MUST pass `audio_url = null` so client-side `TTSCache` keys match `prefetchEntireWeek` 100% (`tts_${station}_${hash}_f`).
- **Phonetic Proper Noun Normalization**: Vietnamese proper nouns (e.g., `Hội An`, `Hà Nội`, `Bánh Mì`) MUST be normalized in `cleanTextForTTS` using single compound phonetic strings (`Hoyahn`, `Hahnoy`, `Bahnmee`) to prevent English TTS engines from spelling out individual letters.
- **Shadowing Corrections Isolation**: Shadowing corrections keys MUST be scoped by week and mode (`shadowing_corrections_v4_w${week}_${mode}_${videoId}`) to eliminate collisions between Easy and Advanced modes using the same YouTube video ID.
- **TTS Mode Script Integrity**: In TTS mode, Shadowing MUST strictly use `data.ttsScript || script` from lesson data and ignore video transcript overrides or legacy KV server corrections.
- **Stale CDN Chunk Recovery**: `loadWeekData` automatically reloads the page on dynamic import 404 errors caused by CDN chunk hash updates.

## Master Curriculum & Blueprint Station Pipeline Matrix — 2026-08-08
Mọi tuần mới tạo bắt buộc tuân thủ 100% các tiêu chí thực nghiệm sau ở cả 2 mode (ADVANCED & EASY):
1. **STEM Story 3-Step Problem-Solving Framework & Content Separation**:
   - **STEM Story (`read_stem`) MUST follow the 3-step STEM Problem-Solving Cycle**:
     1. **Problem (Tình huống/Rắc rối thực tế)**: Nhân vật gặp rắc rối thực tế về vật lý/kỹ thuật/toán học (ví dụ: bị mất động năng kinetic momentum khi giao gậy tiếp sức, sụt giảm vận tốc).
     2. **Science & Math Application (Ứng dụng Khoa học/Toán)**: Dùng nguyên lý Khoa học/Toán/Kỹ thuật ($v = d/t$, gia tốc mượt mà, chuyển hóa năng lượng) để phân tích giải pháp.
     3. **Test & Result (Thử nghiệm & Kết quả)**: Thử nghiệm giải pháp kỹ thuật trên thực tế và đạt kết quả vượt trội.
   - **Tệt đối KHÔNG nhồi nhét thuật ngữ rác**: Không đưa từ búa lớn giáo khoa một cách gượng ép không phục vụ cốt truyện. Văn phong phải mượt mà, đúng chuẩn storytelling thiếu nhi.
   - **Easy Mode STEM**: Bắt buộc là phiên bản đơn giản hóa ngắn gọn (A1 level, ~145-150 từ) cho học sinh nhỏ tuổi/slower, dùng từ ngữ trực quan, không để mã LaTeX thô.
   - **Math Formula UI Standard**: Viết công thức dạng văn bản thuần mượt mà `(velocity = distance / time)` thay vì chèn mã LaTeX thô `\text{...}` để tránh vỡ giao diện trên UI.
   - **Grammar Integrity**: Đảm bảo ngữ pháp chuẩn 100% (ví dụ: `Everyone was tired but happy`, KHÔNG dùng `were`).
   - **Social Studies (`read_social`) MUST follow the 3-part History & Geography Framework**:
     1. **History (Lịch sử thực thụ)**: Trình bày dữ kiện lịch sử có thật (ví dụ: Thỏa thuận ngừng bắn Olympic Truce *Ekecheiria* tại Hy Lạp cổ đại), không tạo ra anachronism (nhập nhằng nhân vật hư cấu hiện đại vào thời cổ đại).
     2. **Geography & Culture (Địa lý & Văn hóa)**: Đề cập đến bối cảnh địa lý thế giới, sự đa dạng văn hóa, kết nối các quốc gia (ví dụ: hơn 200 quốc gia tham gia Olympic hiện đại, Làng Olympic).
     3. **Social Value (Giá trị Xã hội)**: Thể thao là công cụ kết nối cộng đồng quốc tế, tôn trọng sự đa dạng (Diversity & Respect).
   - **Contextual Keyword Weaving**: Từ khóa thời gian cố định của tuần (như `Saturday morning`) khi ghép vào bài Lịch sử/Địa lý toàn cầu phải có từ nối bối cảnh tự nhiên (ví dụ: `For example, on a sunny Saturday morning during the Opening Ceremony...`) để không gây đứt gãy mạch văn.
   - **Tệt đối KHÔNG thuyết giáo đạo đức đơn điệu (No Preachy Civics)**: Không viết bài kiểu "dạy đời làm người tốt", mà phải truyền tải tri thức Lịch sử - Địa lý sinh động.
   - **ESL Chunking Standard**: Cụm từ bôi đậm `**...**` tối đa 2-4 từ, chuẩn cú pháp ESL. Dấu câu (`.`, `,`, `!`) tuyệt đối nằm NGOÀI thẻ bold.
2. **Singapore Math Bar Models**:
   - Không được dùng lại hình ảnh bar model cũ của tuần trước. Mọi tuần mới bắt buộc tạo 5 hình ảnh SVG bar model độc bản tại `/public/images/weekXX/barmodel_wXX_adv_p1.svg` đến `p5.svg`.
3. **Shadowing Video & Conversational Dialogue Selection**:
   - Video Shadowing phải dựa trên metadata của Syllabus (đúng chủ đề, từ vựng, ngữ pháp thì quá khứ).
   - Bắt buộc là **conversational video (có đối thoại thực tế giữa các nhân vật)**, câu ngắn 2-6 giây thích hợp cho học sinh nhại giọng. KHÔNG dùng bài hát ngữ pháp hay diễn diễn thuyết 1 mình.
   - KHÔNG tái sử dụng videoId đã dùng ở các tuần W01-W36. Bắt buộc có file transcript JSON Deepgram tại `src/data/video_transcripts_by_id/sentences/<videoId>.json`.
   - **Chế độ TTS**: Sử dụng 10-12 câu tóm tắt nội dung bài đọc của tuần (`content_en`), độc lập hoàn toàn với Video Mode.
4. **Mindmap Speaking**: 6 `centerStems` $\times$ 6 `branchLabels` cho mỗi stem = **36 branches** tổng cộng per mode.
5. **Explore Station (`explore.js`) Global World Horizon Standard**:
   - **Mục tiêu cốt lõi (Global Horizon)**: Phải mở rộng tầm nhìn ra thế giới (*Global Perspective*), đưa học sinh đi khám phá địa lý, văn hóa và cộng đồng độc đáo trên toàn cầu (ví dụ: các nhà vô địch marathon tại thung lũng Rift Valley - Kenya, bộ tộc Tarahumara ở Mexico, hành trình ngọn đuốc Olympic).
   - **Cấm lặp lại nội dung trường học nội địa (No Repetitive Local School Advice)**: Không quay lại lối mòn khuyên nhủ cá nhân 30 phút thể dục/ngày hay lớp học quen thuộc. Phải tạo giá trị tri thức gia tăng về thế giới.
   - **Cấu trúc dữ liệu**: Chứa `content_en`, `content_vi` (145-220w), `check_questions` (3 câu đọc hiểu + 1 câu `critical_thinking`), và đối tượng `question` (`text_en`, `text_vi`, `min_words`, `hint_en`, `hint_vi`).
   - **Ngữ pháp & Văn phong**: Đảm bảo đúng Subject-Verb Agreement (Gerund + singular verb: `Absorbing... helps`), góc nhìn nhất quán (3rd person perspective), chunking 2-4 từ mượt mà.
6. **Write & Speak (`writing.js`)**: Chứa `hints.words` (từ gợi ý + từ bẫy `distractor: true`), và `story_prompts.picture_mode` (`type: 'picture'`, `image_url`, `word_bank`, `sentence_frames`, `writing_prompts: {en, vi}`) để kích hoạt đầy đủ các sub-tab viết theo tranh.
7. **AI Tutor V28 Format (`week_XX_real.js` & `week_XX_easy_real.js`)**: Bắt buộc tạo ở cả 2 vị trí (`src/data/weeks/week_XX_real.js` và `src/data/weeks/week_XX/week_XX_real.js`), xuất đủ `story_missions` (Mission 1 retell STEM, Mission 2 retell Social Studies, Mission 3 liên hệ bản thân), `spark_talk` ĐÚNG 2 THẺ BÀI (`spark_talk` array length = 2), `target_vocab` (20 từ) & `sentences` (câu shadowing).
8. **Daily Watch (`daily_watch.js`)**: Bắt buộc 5 video giáo dục độc bản (không dùng video âm nhạc giải trí như Despacito, không trùng lặp video ID của các tuần W01-W36).
9. **Cascading Station & AI Tutor Content Synchronization Matrix**:
   - Khi bài đọc chính (`read_stem`, `read_social`, `explore.js`) thay đổi hoặc được viết lại, BẮT BUỘC toàn bộ các trạm phụ thuộc (`writing.js`, `mindmap.js`, `daily_watch.js`, `week_XX_real.js`, `week_XX_easy_real.js`, `vocab.js`, `word_power.js`, `logic_science.js`, `dictation.js`) phải được đồng bộ lại 100% trong cùng 1 lần build pipeline để đảm bảo nhất quán nội dung tuyệt đối.
10. **Week Index Schema Invariant & AI Tutor TTS Cache Alignment**:
    - **`index.js` Schema**: File `index.js` của mỗi tuần BẮT BUỘC xuất đối tượng `weekData` bọc đầy đủ wrapper `stations: { read_explore, new_words, word_match, grammar, word_power, ask_ai, logic_lab, dictation, shadowing, writing, explore, mindmap_speaking, daily_watch, game_hub }` để tránh lỗi `undefined` tiêu đề hoặc treo Spinner ở các trạm.
    - **AI Tutor TTS Alignment**: Cấu hình prefetch âm thanh mở đầu AI Tutor Story Mission trong `voiceService.js` BẮT BUỘC dùng đúng `voice: 'en-US-Journey-F'` và `station: 'story'` trùng khớp hoàn toàn với `StoryMissionTab.jsx` để đảm bảo tốc độ phát âm thanh tức thì (0ms latency).
11. **Golden Cover Image Pipeline Standard (Frozen W36 & W37 Specs)**:
    - **Tiêu chuẩn Vàng Đóng Băng**: Toàn bộ hình ảnh covers ở các trạm `read_stem`, `read_social`, và `explore.js` cho tất cả các tuần mới về sau BẮT BUỘC lấy mẫu từ bộ hình chuẩn cao cấp của Tuần 36 và Tuần 37.
    - **Công thức Prompt Bắt Buộc**:
      `"Cute 3D render of [BỐI CẢNH/NHÂN VẬT/HÀNH ĐỘNG CHI TIẾT TẠO THÀNH BỨC TRANH CỐT TRUYỆN ĐẦY ĐỦ], Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."`
    - **Nguyên tắc Thẩm mỹ & Chi tiết**:
      1. Bắt buộc thể hiện **bối cảnh câu chuyện phong phú, giàu chi tiết trực quan** (ví dụ: Archimedes trong bồn tắm gỗ tràn nước ở Syracuse; đoàn lạc đà Marco Polo trên Con đường Tơ lụa; các vận động viên chạy trên con đường đất đỏ ở thung lũng Rift Valley - Kenya; Lễ đình chiến Olympic cổ đại với vòng nguyệt quế olive).
      2. **Tuyệt đối KHÔNG chứa chữ/ký tự**: Mọi văn bản tiêu đề đều được render tự động bằng UI component của hệ thống.
      3. **Full-Bleed Aspect Ratio**: Tỷ lệ mở rộng chiều dọc hiển thị trọn vẹn chi tiết trên thẻ header các trạm.
12. **New Week Production Pipeline & Anti-Bug Quality Standard**:
    - **Chống Lỗi Khái Niệm Trừu Tượng (Concrete Object Action Prompts - COAP)**:
      - KHÔNG BAO GIỜ truyền động từ/khái niệm trừu tượng thô vào prompt vẽ hình (như `make a difference`, `act now`, `emissions`).
      - BẮT BUỘC dịch khái niệm thành **đối tượng và hành động vật lý cụ thể**:
        - `emissions` -> *"Ống khói nhà máy gạch và ống bô xe ô tô xả khói xám công nghiệp ra không khí"*.
        - `act now` -> *"Chú bé tắt công tắc điện và bỏ chai nhựa vào thùng tái chế"*.
        - `make a difference` -> *"Chú bé trồng cây non xanh bằng bình tưới nước"*.
        - `nurse` -> *"Cô y tá trường học mang hộp y tế chữ thập đỏ"*.
    - **Định Nghĩa Tiếng Anh Bắt Buộc (`definition_en`)**:
      - Mặt sau thẻ từ vựng (`vocab.js` & `word_power.js`) BẮT BUỘC chứa `definition_en` bằng Tiếng Anh 100% chuẩn ESL (in đậm phía trên) và `definition_vi` bằng Tiếng Việt (in nghiêng phía dưới).
      - KHÔNG ĐƯỢC chép đè Tiếng Việt vào `definition_en`.
    - **Kiểm Duyệt Tự Động 2 Bước Trước Khi Commit (Mandatory Pre-Commit Gatekeeper)**:
      1. Run `npm run audit:chunks` (`node scripts/audit_chunks.js`) -> Bảo đảm 0 lỗi chunking.
      2. Run `npm run audit:week <weekNum>` (`node scripts/audit_new_week.mjs <weekNum>`) -> Bảo đảm 0 lỗi schema, 0 lỗi thiếu `definition_en`, 0 lỗi chữ Tiếng Việt trong `definition_en`.
      3. Run `node scripts/validate_week.mjs <weekNum>` -> One-shot master validation gatekeeper.

## Consolidated Self-Improvement Lessons & Incident Prevention (Lessons 001-015)
- **Lesson-001 (Auto-lint/Rollback)**: Sau khi Edit/Write code `.js/.jsx`, phải run lint/build. Nếu vỡ build -> rollback ngay.
- **Lesson-004 (MediaRecorder Release)**: Khi reducer chuyển phase sang `ALL_DONE` hay `SCORED`, phải có effect cleanup `useEffect(() => { if (phase === ALL_DONE) stopRecording(); }, [phase])` để release micro.
- **Lesson-006 (TDZ Prevention)**: Mọi biến trong deps array `[a, b, c]` của `useCallback`/`useMemo` BẮT BUỘC phải được khai báo bằng `const` ở DÒNG TRÊN. Không forward-reference biến ở dòng bên dưới gây crash runtime.
- **Lesson-009 (No Truncation)**: Tuyệt đối KHÔNG cắt xén code hoặc dùng `...` làm gãy file JSON/JS khi sinh nội dung hàng loạt.
- **Lesson-011 (Unified Shadowing)**: Không tách file Shadowing ADV/EASY riêng làm trôi timestamp; dùng 1 file duy nhất bọc dữ liệu chuẩn.
- **Lesson-014 (No Literal `\n` in JSON)**: File JSON tuyệt đối không chứa `\n` thô trong string literals gây crash Vite build parser.
- **Lesson-016 (Single-line Comment Syntax Protection)**: Sau khi refactor hoặc replace code, tuyệt đối không append câu lệnh `const`/`let`/`var` vào cuối dòng comment `//`. Các câu lệnh khai báo phải nằm ở DÒNG MỚI ĐỘC LẬP để tránh bị comment bỏ qua gây `ReferenceError`.
- **Lesson-017 (Master Pipeline Matrix Verification Gatekeeper)**: Khi sinh hoặc rebuild dữ liệu tuần mới:
  1. `read_social` & `explore.js` BẮT BUỘC đạt độ dài **145-220 từ**. `explore.js` phải xuất `check_questions`, `comprehension_questions`, và `questions`.
  2. `logic_lab.js` BẮT BUỘC chứa 3 tab với **15 câu hỏi độc lập** (5 Logic Science, 5 Singapore Bar Models SVG, 5 Social Quiz), KHÔNG lấy lại câu hỏi từ `read.js`.
  3. `mindmap.js` BẮT BUỘC chứa 6 `centerStems` × 6 `branchLabels` = **36 nhánh độc bản** theo chủ đề tuần (KHÔNG dùng nhánh mặc định vỡ nốt/ngã chảy máu).
  4. `ask_ai.js` BẮT BUỘC chứa **5 câu hỏi luyện nói** + hint + word_bank.
  5. `daily_watch.js` BẮT BUỘC dùng **5 Video YouTube giáo dục thoại** đã verify **HTTP 200 OK** thumbnail.
- **Lesson-018 (Writing Target Words, Speaking 5-Picture & Bundle Optimization Standards — 2026-08-15)**:
  1. **Writing Part 7 Target Word Calibration**: `cambridgeCriteria.js` target word count MUST be set to **20 words** for Tier 1 & Tier 2 (Weeks 16-42) to strictly match `writing.js` `min_words: 20` schema and Cambridge A2 Flyers Part 7 standards.
  2. **Speaking Part 3 5-Picture Invariant**: Speaking Part 3 (`picture_story_continuation`) MUST render **5 sequential pictures** (`Picture 1` intro by examiner, `Pictures 2-5` recorded by candidate via mic). Never truncate to 4 pictures.
  3. **Vite Manual Chunks Code-Splitting**: Always configure `manualChunks` in `vite.config.js` to isolate monolithic data (`dictionary.json`), heavy libraries (`lucide-react`, `katex`, `canvas-confetti`), and hubs/games to prevent bundle size bloat.
  4. **Stealth Mode Chunk Styling**: In assessment components (`isStealthMode={true}`), chunk styling MUST rely on `const isTarget = tier === 1` so collocations render as plain text without leaking answer highlights.