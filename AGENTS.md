# EngQuest3K — Agent Memory

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
   - **Grammar Integrity**: Đảm bảo ngữ pháp chuẩn 100% (ví dụ: `Everyone was tired but happy`, KHÔNG dùng `were`).
   - **Social Studies (`read_social`)**: Tập trung vào Lịch sử, Địa lý, Tinh thần thể thao (Sportsmanship), Fair Play, Đạo đức, Cổ vũ đồng đội, Lịch sử Olympic cổ đại.
2. **Singapore Math Bar Models**:
   - Không được dùng lại hình ảnh bar model cũ của tuần trước. Mọi tuần mới bắt buộc tạo 5 hình ảnh SVG bar model độc bản tại `/public/images/weekXX/barmodel_wXX_adv_p1.svg` đến `p5.svg`.
3. **Shadowing Video & Conversational Dialogue Selection**:
   - Video Shadowing phải dựa trên metadata của Syllabus (đúng chủ đề, từ vựng, ngữ pháp thì quá khứ).
   - Bắt buộc là **conversational video (có đối thoại thực tế giữa các nhân vật)**, câu ngắn 2-6 giây thích hợp cho học sinh nhại giọng. KHÔNG dùng bài hát ngữ pháp hay diễn diễn thuyết 1 mình.
   - KHÔNG tái sử dụng videoId đã dùng ở các tuần W01-W36. Bắt buộc có file transcript JSON Deepgram tại `src/data/video_transcripts_by_id/sentences/<videoId>.json`.
   - **Chế độ TTS**: Sử dụng 10-12 câu tóm tắt nội dung bài đọc của tuần (`content_en`), độc lập hoàn toàn với Video Mode.
4. **Mindmap Speaking**: 6 `centerStems` $\times$ 6 `branchLabels` cho mỗi stem = **36 branches** tổng cộng per mode.
5. **Explore Station (`explore.js`)**: Chứa `content_en`, `content_vi` (145-220w), `check_questions` (3 câu đọc hiểu + 1 câu `critical_thinking`), và đối tượng `question` (`text_en`, `text_vi`, `min_words`, `hint_en`, `hint_vi`).
6. **Write & Speak (`writing.js`)**: Chứa `hints.words` (từ gợi ý + từ bẫy `distractor: true`), và `story_prompts.picture_mode` (`type: 'picture'`, `image_url`, `word_bank`, `sentence_frames`, `writing_prompts: {en, vi}`) để kích hoạt đầy đủ các sub-tab viết theo tranh.
7. **AI Tutor V28 Format (`week_XX_real.js` & `week_XX_easy_real.js`)**: Bắt buộc tạo ở cả 2 vị trí (`src/data/weeks/week_XX_real.js` và `src/data/weeks/week_XX/week_XX_real.js`), xuất đủ `story_missions` (Mission 1 retell STEM, Mission 2 retell Social Studies, Mission 3 liên hệ bản thân), `spark_talk` ĐÚNG 2 THẺ BÀI (`spark_talk` array length = 2), `target_vocab` (20 từ) & `sentences` (câu shadowing).
8. **Daily Watch (`daily_watch.js`)**: Bắt buộc 5 video giáo dục độc bản (không dùng video âm nhạc giải trí như Despacito, không trùng lặp video ID của các tuần W01-W36).