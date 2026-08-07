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
- **Explore & Reading Chunking Standard**:
  1. All `**bolded phrases**` in Reading and Explore stations for BOTH Easy Mode and Advanced Mode MUST be registered in `chunk_focus` and `dictionary` with IPA, definition, and example sentence.
  2. Bold markers `**...**` MUST only target meaningful collocations (e.g., `art class`), verb phrases (e.g., `picked up a brush`), or key academic terms. NEVER bold single pronouns (`I`, `she`), auxiliary verbs (`was`, `had`), connectors (`Then I`), or incomplete phrases (`using blue`, `cut small`).
  3. Terminal punctuation (`.`, `,`, `!`, `?`) MUST strictly stay OUTSIDE bold tags `**...**`.
  4. Run `npm run audit:chunks` (`node scripts/audit_chunks.js`) before committing new week content to ensure 0 chunking errors across all 36 weeks.
- **Audio & TTS Fallback**: `audio_word` paths MUST handle missing MP3 files gracefully with browser TTS fallback so card flip audio never hangs or crashes.

## Google Cloud TTS & Shadowing Standard — 2026-08-07
- **Google Cloud TTS Direct Engine**: System-wide TTS is routed to Google Cloud TTS Direct with `en-US-Journey-F` (Narration/Shadowing), `en-US-Neural2-F` (Vocab/Dictation), and `en-US-Neural2-D` (Questions/Mindmap). Always map invalid `Neural2-B` voice names to `Neural2-D`.
- **Cache Key Alignment**: In station views (`ReadingExplore.jsx`, `Explore.jsx`), `speakText` calls for narratives MUST pass `audio_url = null` so client-side `TTSCache` keys match `prefetchEntireWeek` 100% (`tts_${station}_${hash}_f`).
- **Phonetic Proper Noun Normalization**: Vietnamese proper nouns (e.g., `Hội An`, `Hà Nội`, `Bánh Mì`) MUST be normalized in `cleanTextForTTS` using single compound phonetic strings (`Hoyahn`, `Hahnoy`, `Bahnmee`) to prevent English TTS engines from spelling out individual letters.
- **Shadowing Corrections Isolation**: Shadowing corrections keys MUST be scoped by week and mode (`shadowing_corrections_v4_w${week}_${mode}_${videoId}`) to eliminate collisions between Easy and Advanced modes using the same YouTube video ID.
- **TTS Mode Script Integrity**: In TTS mode, Shadowing MUST strictly use `data.ttsScript || script` from lesson data and ignore video transcript overrides or legacy KV server corrections.
- **Stale CDN Chunk Recovery**: `loadWeekData` automatically reloads the page on dynamic import 404 errors caused by CDN chunk hash updates.