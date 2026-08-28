# EngQuest3K — Agent Memory

## 🧠 Model Routing & Task Delegation Protocol — 2026-08-17
**Quan trọng — Giới hạn thực tế:** Agent KHÔNG thể tự động switch model trong IDE. Cơ chế routing là **tư vấn + thông báo**: agent phân loại task, báo tier, và yêu cầu user đổi model nếu cần.

### Quy tắc bắt buộc cho Agent:
**Mỗi khi nhận request mới, agent PHẢI:**
1. Chạy phân loại nội bộ (không cần gọi CLI)
2. Nếu task là **Tier 3 hoặc Tier 4** → **THÔNG BÁO ngay đầu response**: `> 🧠 Tier 3 — Khuyến nghị: Chuyển sang **Claude Sonnet Thinking** hoặc **Gemini Pro** trước khi tiếp tục.`
3. Nếu task là **Tier 1 hoặc Tier 2** → tiến hành ngay, không cần thông báo

### Bảng Tier & Model Mapping:
| Tier | Loại Task | Model Khuyến Nghị | Agent Thông Báo? |
|------|-----------|-------------------|------------------|
| **1** | Shell, git, audit, build, log check | Flash (default) | ❌ Không |
| **2** | React component, UI/CSS, data hooks, API fix | Flash hoặc Standard | ❌ Không |
| **3** | Pin calibration, Bar Model SVG, audio script Cambridge, debug crash root-cause | **Claude Sonnet Thinking** | ✅ **BẮT BUỘC** |
| **4** | Sinh cả tuần học, multi-file pipeline, subagent swarm | **Gemini Pro + Subagent** | ✅ **BẮT BUỘC** |

### CLI Analyzer (tham khảo thêm):
Chạy `node scripts/model_router.mjs "<User Prompt>"` để kiểm tra tier classification.

### Ví dụ thông báo Tier 3 (bắt buộc hiển thị):
```
> 🧠 **Tier 3 — Deep Reasoning detected**
> Task này yêu cầu suy luận không gian / phân tích ảnh / debug phức tạp.
> Khuyến nghị: Chuyển sang **Claude Sonnet (Thinking)** trong Model Settings trước khi tiếp tục.
```

## 📦 Token Compression & Ignore Protocol — 2026-08-17
1. **Ignore Protection**: Luôn tuân thủ `.antigravityignore` & `.agentignore` — TỰ ĐỘNG CHẶN đọc file rác, file build `dist/`, media binary và `dictionary.json` 40,000 dòng.
2. **AST Repo Map Skeleton**: Sử dụng `.agents/repo_map.md` (sinh bởi `node scripts/build_repo_map.mjs`) để tra cứu Function Signatures trên 500+ file mà KHÔNG nạp thân code thừa vào Context Window (tiết kiệm 85% token).
3. **Prompt Caching Alignment**: Giữ Prefix System Rules & Tools nhất quán giữa các turn để kích hoạt Context Caching 90% cost reduction trên Gemini/Anthropic.

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
## 🏰 MASTER 15-TASK / 4-HUB ARCHITECTURE INVARIANT (W33+) — 2026-08-22
**QUY TẮC BẤT BIẾN DUY NHẤT VỀ CẤU TRÚC TUẦN HỌC (W33+):**
1. **Kiến trúc Duy nhất & Mới nhất**:
   - Từ Tuần 33 trở đi, hệ thống **CHỈ HOẠT ĐỘNG TRÊN 15 TASKS / GEARS** phân bổ qua **5 Ngày học (4 Hubs / 4 Zones)** theo `src/config/questSchedule.js`.
   - **4 Hub Dữ liệu Duy nhất per Week**:
     - `reading_hub.js` (Zone 1 & 4: Scene Explorer, Voice Shadow, Story Retell, Fact Finder, Reading Shield)
     - `listening_hub.js` (Zone 2 & 4: Action Lab, Speed Match, Grammar Duel, Math Quest, Listening Shield)
     - `writing_hub.js` (Zone 3 & 4: Story Writer P7, Reading & Writing Shield)
     - `speaking_hub.js` (Zone 3 & 4: Video Challenge, Info Exchange P2, Speaking & Passport)
2. **CẤM TUYỆT ĐỐI Các Station Cũ (Legacy Prohibited)**:
   - Nghiêm cấm tạo mới hoặc phụ thuộc vào các file rác cũ như `explore.js`, `logic_lab.js`, `daily_watch.js`, `dictation.js` như một nguồn nội dung độc lập.
   - Mọi câu hỏi, bài đọc, từ vựng và bài tập **BẮT BUỘC chỉ nằm trong 4 Hubs và 15 Quests**.
3. **Bảng 15 Quests / Gears Tiêu Chuẩn**:
   - **Day 1 (Story World — Zone 1)**: `gear1_webtoon` (Scene Explorer), `gear2_karaoke` (Voice Shadow), `gear3_retell` (Story Retell)
   - **Day 2 (Knowledge Lab — Zones 1, 2, 3)**: `gear4_clil` (Fact Finder), `science_lab` (Action Lab), `science_report` (Discovery Report)
   - **Day 3 (Battle Arena — Zone 2)**: `word_blitz` (Speed Match), `sentence_smash` (Grammar Duel), `math_quest` (Math Quest)
   - **Day 4 (Creator Studio — Zone 3)**: `story_writer` (Story Writer), `broadcast_studio` (Video Challenge), `info_exchange` (Info Exchange)
   - **Day 5 (Boss Castle — Zone 4)**: `boss_listening` (Listening Shield), `boss_reading` (Reading & Writing Shield), `weekly_review` (Speaking & Passport)
4. **Quy trình Audit & Kiểm duyệt**:
   - Mọi công cụ audit (`cefr_curriculum_guard.mjs`, `audit_all_w33_tasks.mjs`) BẮT BUỘC chỉ quét và xác thực 4 Hubs và 15 Quests này.

## 🎓 Master Curriculum CEFR Staging & Vocabulary Standard (W01–W156) — 2026-08-22
**BẮT BUỘC áp dụng cho toàn bộ các tuần biên soạn và kiểm thử:**
1. **Stage 1 (Weeks 01 – 72) — Cambridge Young Learners (Pre-A1 Starters $\rightarrow$ A1 Movers $\rightarrow$ A2 Flyers / KET)**:
   - **Độ tuổi mục tiêu**: Tiểu học (7–10 tuổi).
   - **Khung Từ Vựng**: 100% từ vựng phải nằm trong bộ từ chuẩn Cambridge Starters, Movers, Flyers, KET (`starters_pre_a1.json`, `movers_a1.json`, `flyers_a2.json`, `ket_a2.json`).
   - **CẤM TUYỆT ĐỐI Thuật ngữ Học thuật B2/C1**: Nghiêm cấm dùng các từ quá tải như `lubricant`, `kinetic momentum`, `thermal radiation`, `anachronism`, `mechanism`, `sterile`, `prohibit`, `forbid`, `predominantly`, `consequently`, `furthermore`, `moreover`, `whereby`.
   - **Độ phức tạp câu**: Tối đa 1–2 mệnh đề per câu (độ dài $\le 22$ từ). Câu văn phải trực quan, tự nhiên, đậm chất storytelling thiếu nhi.
   - **Discovery Report Scaffold**: Bắt buộc cung cấp câu mồi đơn giản (*Starters*) và các thẻ từ gợi ý (*1-Tap Word Pills*) để học sinh chạm chọn ghép câu dễ dàng, không gây nản lòng (*Zero-Friction Scaffolding*).
2. **Stage 2 (Weeks 73 – 156) — Cambridge Lower Secondary & PET/FCE (B1 Preliminary $\rightarrow$ B1+ $\rightarrow$ B2 First)**:
   - **Độ tuổi mục tiêu**: THCS & Nâng cao (11–15 tuổi).
   - **Khung Từ Vựng**: Bổ sung kho từ B1/B2 (`pet_b1.json`, `fce_b2.json`, Academic Word List cơ bản).
   - **Khung Ngữ Pháp**: Mở rộng Passive Voice, Conditionals loại 2/3, Mệnh đề quan hệ nâng cao, Báo cáo khoa học phân tích chuyên sâu.
3. **Automated Pre-Commit Gatekeeper**:
   - Chạy `npm run audit:cefr <weekNum>` (`node scripts/cefr_curriculum_guard.mjs <weekNum>`) trước khi commit để đảm bảo **0 lỗi vi phạm CEFR** và **0 lỗi từ vựng vượt cấp**.

## 🏆 Cambridge A2 Flyers 4-Skills Master Blueprint Standard — 2026-08-17
**Áp dụng bắt buộc cho toàn bộ các tuần từ W33 đến W72 theo `CAMBRIDGE_FLYERS_AUDIO_BLUEPRINT.md`:**
1. **Listening (5 Parts) — Official Two-Play Loop Standard**:
   - **Cơ chế 2 Lần Nghe Chuẩn Cambridge**: Toàn bộ các bài Listening Part 1–5 (Boss Battle Quest 5 và Mock Tests) bắt buộc chạy theo chu trình chính thức:
     ```
     PLAY 1 (Audio Asset X)
       ↓ (Play 1 ends)
     EXAMINER RUBRIC: "Now listen to Part X again." (audio/cambridge/flyers_replay_pX.mp3)
       ↓ (3s pause)
     PLAY 2 (EXACT SAME Audio Asset X)
       ↓ (Play 2 ends)
     EXAMINER CLOSING: "That is the end of Part X." (audio/cambridge/flyers_end_pX.mp3)
       ↓
     COMPLETE (Không tự ý phát lần 3, không dùng bản ghi âm biến thể)
     ```
   - **Phân bổ đa giọng đối đáp**: Examiner Nữ (`en-US-Neural2-F`, pitch -1.5, rate 0.86), Thí sinh Nam Jake (`en-US-Neural2-D`, pitch +1.0), Học sinh Nữ Mia (`en-US-Neural2-C`, pitch +4.0).
2. **Speaking (4 Parts)**: Đầy đủ Examiner audio guidance cho cả 4 Parts. Part 3 tuân thủ Invariant 5 tranh liên hoàn (`Picture 1` giám khảo dẫn đề $\rightarrow$ `Pictures 2-5` thí sinh ghi âm). Chấm điểm theo 5 Shields Cambridge.
3. **Reading (Parts 1-6)**: Tuân thủ độ dài chuẩn A2 Flyers (P1 10 defs/15 words, P2 5 dialogue turns, P3 ~120w story gap-fill + title, P4 10 grammar MCQs, P5 ~250w story + 7 completions 1-4 words, P6 5 open cloze gaps).
4. **Writing (Part 7)**: Viết truyện theo 3 tranh liên hoàn $\ge 20$ từ, chấm điểm theo Rubric 5 Shields (Content 2, Grammar/Flow 2, Vocab/Spelling 1).

## 🎯 CAMBRIDGE MECHANIC FIDELITY DOCTRINE (W33+)

**Single Source of Truth**: `schemas/cambridge-flyers-fidelity-doctrine.schema.json`
(draft-07, doctrineVersion 1.0.0, verified 2026-08-26)

Quy tắc bắt buộc:
1. Mọi `blueprint.json` hoặc normalized export của `*_hub.js`
   PHẢI validate thành công với schema trước khi Gate15/16 pass.
2. Gate17 (`gate17_fidelity_doctrine.mjs`) chạy validation bằng ajv
   + thực thi các `x-invariants` runtime (JSON Schema không biểu diễn được).
3. Gate16 TỪ CHỐI gắn nhãn "Flyers-compliant" cho bất kỳ tuần nào
   còn entry `status: "open"` trong `knownDeviationsRegistry` áp dụng.
4. Schema là frozen — muốn sửa phải bump `doctrineVersion` MAJOR
   và re-verify vs officialSourceUrl trước khi merge.



## 🤝 Session Handoff & Start Protocol (`/handoff` & `/start`) — 2026-08-17
- **Kết thúc phiên (`/handoff`)**: Agent thực thi `node scripts/handoff.mjs "<Tóm tắt công việc>"` để tự động ghi nhận git status, commit hash, các việc đã xong, các việc chưa xong và các điểm cần user quyết định vào `.agents/handoffs/latest_handoff.md` và `.agents/handoffs/handoff_<timestamp>.md`.
- **Mở đầu phiên mới (`/start`)**: Agent đọc ngay file `.agents/handoffs/latest_handoff.md`, kiểm tra `AGENTS.md`, thực thi `node scripts/start_session.mjs` và báo cáo 3 mục: (1) Công việc phiên cũ bàn giao, (2) Trạng thái Git & Build hiện tại, (3) Sẵn sàng nhận chỉ thị mới.

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

## 🔒 FROZEN AUDIO PIPELINE: PRE-GENERATED MP3 & 3-TIER FALLBACK STANDARD (W33+) — 2026-08-18
**BẮT BUỘC áp dụng cho Tuần 33 và TOÀN BỘ các tuần sản xuất mới (W34–W72). KHÔNG ĐƯỢC PHÉP BỎ QUA:**
1. **Zero-Live-TTS on First Play**:
   - Khi tạo nội dung tuần mới, **BẮT BUỘC chạy script pre-generate 100% file static MP3** và lưu vào `public/audio/weekXX/` (đồng thời upload lên Cloudflare R2 / CDN).
   - Danh sách file bắt buộc sinh sẵn per week:
     - 5 file Dictation (`dictation_1.mp3` → `dictation_5.mp3`, giọng `en-US-Neural2-F`)
     - 5 file Listening Part 1 (`listening_p1_target1.mp3` → `target5.mp3`, giọng `en-US-Journey-F`)
     - 1 file Listening Part 2 dài (`listening_p2_full.mp3`, giọng `en-US-Neural2-D`)
     - 5 file Listening Part 3 (`listening_p3_item1.mp3` → `item5.mp3`, giọng `en-US-Neural2-D`)
     - 5 file Listening Part 5 (`listening_p5_inst1.mp3` → `inst5.mp3`, giọng `en-US-Journey-F`)
     - 1 file STEM Story (`read_stem.mp3`, giọng `en-US-Journey-F`)
     - 1 file Social Story (`read_social.mp3`, giọng `en-US-Journey-F`)
     - 1 file CLIL Knowledge Explorer (`explore.mp3` / `clil_friction.mp3`, giọng `en-US-Journey-F`)
2. **Chuỗi Fallback 3 Tầng Bảo Vệ Bất Biến**:
   - **Tier 1 (0ms)**: IndexedDB Client Cache (`TTSCache`).
   - **Tier 2 (CDN / Pre-generated Static MP3)**: Tải trực tiếp file tĩnh từ Cloudflare R2 / local asset (`/audio/weekXX/...`).
   - **Tier 3 (Dự phòng cấp bách khi CDN sập)**: Google Cloud TTS Direct (`en-US-Journey-F` / `en-US-Neural2-F` / `en-US-Neural2-D`).
   - **Tier 4 (Phòng tuyến cuối cùng)**: Native Browser SpeechSynthesis.
   - ❌ **CẤM TUYỆT ĐỐI**: Không để Client gọi trực tiếp Google Cloud TTS API khi người dùng bấm Play ở điều kiện bình thường. Tiết kiệm 100% chi phí API và triệt tiêu độ trễ!
3. **Phonetic Proper Noun Normalization**: Vietnamese proper nouns (`Hội An`, `Hà Nội`, `Bánh Mì`) MUST be normalized in `cleanTextForTTS` using single compound phonetic strings (`Hoyahn`, `Hahnoy`, `Bahnmee`).

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
- **Lesson-019 (Arcade Room Master Blueprint & Frozen Game Pipeline — 2026-08-21)**:
  1. **3-Minute Duration & Nudge Standard**: Toàn bộ game Arcade chuẩn hóa thời lượng **180 giây (3 phút)**. Tự động nhắc nhở nghỉ ngơi (`ArcadeBreakPromptModal`) theo chu kỳ lứa tuổi (G1: 10m, G2: 12m, G3: 15m, G4-G5: 18m). Thưởng pin tích lũy +5m ở mốc 30m, 45m, 60m.
  2. **Speedrun Time Attack & Reflex Speed**: Mọi game bắt buộc đo `⚡ Reaction Reflex` ($<1.5\text{s} \rightarrow +5\text{ pts}$) và `⏱️ Speedrun Time Attack` (hoàn thành đủ mục tiêu sớm $\rightarrow$ kết thúc sớm + thưởng $+2$ điểm/giây còn lại).
  3. **Lexio Fox Mascot Ecosystem**: Tích hợp nút Cáo ở góc dưới-trái (`ArcadeFoxHelper`) + Cáo bay chỉ điểm (`Flying Fox Target Tracker`) khi học sinh dừng suy nghĩ $\ge 7\text{s}$.
  4. **Persistent Game Over Screen**: Màn hình kết thúc bắt buộc giữ nguyên (`gameState === 'done'`) cho học sinh xem thành tích, điểm số, kỷ lục mới; không bao giờ được tự động đóng. Cung cấp 2 nút `Play Again` và `Back to Arcade`.
  5. **Audio Cancellation Guard**: Mỗi khi đổi round bắt buộc gọi `VoiceService.stop()` + `window.speechSynthesis.cancel()` đồng thời. Chi tiết đầy đủ tại `docs/ENGQUEST_ARCADE_MASTER_BLUEPRINT.md`.

## 🎯 Hotspot Coordinate Doctrine & Worked Example Invariants — 2026-08-25
1. **Hotspot Coordinate Doctrine (Fix Dứt Điểm Lệch Crop)**:
   - **Data Layer (`speaking_hub.find_differences.differences[].x/y`)**: Tọa độ luôn luôn được lưu dưới dạng **% theo IMAGE-SPACE (0–100% của kích thước gốc ảnh)**. Tuyệt đối KHÔNG bake container-% hay crop offset vào data file.
   - **Runtime Rendering Layer (`FindDifferencesInteractive.jsx`)**: Thành phần UI bắt buộc sử dụng runtime coordinate mapper để tính toán vị trí hiển thị trên container theo `object-cover`:
     $$s = \max(cw/iw, ch/ih); \quad rw = iw \cdot s; \quad rh = ih \cdot s;$$
     $$ox = (rw - cw) / 2; \quad oy = (rh - ch) / 2;$$
     $$X_{\text{container}}\% = \frac{\frac{x}{100} \cdot rw - ox}{cw} \cdot 100; \quad Y_{\text{container}}\% = \frac{\frac{y}{100} \cdot rh - oy}{ch} \cdot 100$$
     Mapper áp dụng đồng bộ cho **CẢ nút hotspot tương tác lẫn vòng tròn SVG visual rings** trên cả Picture A và Picture B.
   - **Calibration Tooling**: Script `calibrate_find_differences.mjs` tiếp tục xuất image-space coordinates; không convert bake container.
   - **Production Gate**: Gate 15 assertion kiểm tra click-test 4/4 và xác thực khoảng cách tâm vòng render so với centroid pixel-diff $< 6\%$ trên cả 2 tranh.

2. **Worked-Example Row Component Invariant**:
   - Mọi component Cambridge có chỉ dẫn *"There is one example"* bắt buộc render hàng example độc lập với `data-testid="example-row"`, nền shaded/highlighted, badge `★ EXAMPLE`, đáp án điền sẵn và locked (`disabled={true}`).
   - Áp dụng cho: `SVGLineMatcher`, `NotepadNoteCompleter`, `VisualMatchingAH`, `MultipleChoice3Pic`, `SVGColorAndWrite`, `WordBankMatchingGrid`, `DialogueAHCompleter`, `InlineTextClozeDropdown`, `TextExtractionCompleter`, `OpenClozeCompleter`.

3. **Discovery Report 2-Axis Scaffolding & Ladder L1–L6**:
   - **Trục nội dung**: Cấp sẵn đầy đủ 3 fact units từ Data Card (zero friction cho trí nhớ).
   - **Trục ngôn ngữ**: Bắt buộc có micro-decision ngôn ngữ (chọn chips dạng QUÁ KHỨ có chủ ngữ + chọn connector `because` / `so` / `but` ở Step 2 & 3).
   - **Distractor Feedback**: Khi chọn chip nhiễu, hiển thị ngay thông báo `🔬 The Data Card does not show this fact. A science report only uses observed data!` kèm hiệu ứng rung.
   - **Ladder Levels**: L1-L2 (Grade 1), L3 (Grades 2-3), L4-L5 (Grades 4-5), L6 (Mock Exam).

## 🎨 MANDATORY TOGETHER AI IMAGE GENERATION ENGINE (W33+) — 2026-08-26
**QUY TẮC BẤT BIẾN DUY NHẤT VỀ SINH HÌNH ẢNH:**
1. **100% Ảnh Trong Toàn Bộ Ứng Dụng BẮT BUỘC Dùng Together AI**:
   - Toàn bộ hình ảnh (Covers, Webtoons, Flashcards / Exam Cards A–H, Scene Tìm Khác Biệt Scene A/B, Picture Story 4 Tranh, Listening P1 Scene, v.v.) **BẮT BUỘC sinh trực tiếp qua Together AI API** với model `black-forest-labs/FLUX.1-schnell`.
   - Endpoint: `https://api.together.xyz/v1/images/generations` | Payload: `model: "black-forest-labs/FLUX.1-schnell"`, `width: 1024, height: 1024, steps: 4`.
   - ❌ **CẤM TUYỆT ĐỐI**:
     - Nghiêm cấm dùng PIL `ImageDraw` vẽ hình học / gradient giả lập ảnh bài tập (như trường hợp `mossy_rocks.jpg`).
     - Nghiêm cấm copy alias hoặc tái sử dụng ảnh lệch chủ đề giữa các tuần (ví dụ: dùng ảnh trường học W33 cho bài rừng rậm W34).
2. **Phong cách Thẩm mỹ Thống nhất (Pixar 3D Aesthetic)**:
   - Mọi prompt BẮT BUỘC theo cấu trúc chuẩn: `"Cute 3D illustration of [MÔ TẢ CHI TIẾT ĐỐI TƯỢNG VÀ BỐI CẢNH], Pixar animation style, vibrant colors, soft lighting, clean composition, no text."`

## 📍 FROZEN HOTSPOT & PIN CALIBRATION PIPELINE (S1 & L1 STANDARDS) — 2026-08-26
**Kế thừa chuẩn hóa từ W33 Golden Master (15 Shields):**
1. **Speaking Part 1 — Find Differences (S1 Hotspots)**:
   - **Phân Bổ 4 Điểm Khác Biệt Rõ Ràng (Min Pairwise Distance >= 25%)**:
     - Scene A và Scene B phải có đúng **4 điểm khác biệt** phân bố đều trên 4 góc / 4 phần tư ảnh (tương tự W33: d1(20,22), d2(78,22), d3(30,64), d4(80,70) với khoảng cách tối thiểu 43.2%).
     - Tuyệt đối không đặt 2 điểm khác biệt sát nhau (< 20%) để chống chồng lấn hitbox (48x48px) trên màn hình di động/tablet.
   - **Hiệu Chỉnh Pixel Diff Tự Động**:
     - Chạy `node scripts/calibrate_find_differences.mjs <weekNum>` để phát hiện cụm pixel diff thật qua Canvas k-means clustering và ghi vào `docs/week<weekNum>_hotspot_calibration.json`.
     - Tọa độ trong `speaking_hub.js` (`x, y`) BẮT BUỘC khớp centroids đã hiệu chỉnh (±1%).
2. **Listening Part 1 — Draw the Lines (L1 Pins)**:
   - Tuân thủ nghiêm ngặt skill `.agents/skills/listening-p1-pins/SKILL.md`:
   - **Cấu trúc 7 Tên & 6 Mục Tiêu**:
     - `names`: Đúng 7 phần tử (1 Example `isExample: true`, 5 Scored names có `target_id`, 1 Distractor có `target_id: null`).
     - `targets`: Đúng 6 phần tử (1 Example target `isExample: true`, 5 Scored targets).
   - **Tọa độ Ghim Chuẩn**: Tọa độ % theo image-space (0–100%) trỏ chính xác vào vùng ngực/vai nhân vật trên ảnh `w<weekNum>_listening_p1_scene.jpg`.
