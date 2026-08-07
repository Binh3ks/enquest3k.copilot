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
- **Vietnamese Diacritics**: All `definition_vi` entries in `vocab.js` and `word_match` MUST have full Vietnamese diacritic accents (e.g., `đã trao`, not `da trao`).
- **Explore & Reading Chunking**: All `**bolded phrases**` in Reading and Explore stations for BOTH Easy Mode and Advanced Mode MUST be registered in `chunk_focus` and the dictionary with IPA, definition, and example sentence.
- **Audio & TTS Fallback**: `audio_word` paths MUST handle missing MP3 files gracefully with browser TTS fallback so card flip audio never hangs or crashes.

## Google Cloud TTS & Shadowing Standard — 2026-08-07
- **Google Cloud TTS Direct Engine**: System-wide TTS is routed to Google Cloud TTS Direct with `en-US-Journey-F` (Narration/Shadowing), `en-US-Neural2-F` (Vocab/Dictation), and `en-US-Neural2-D` (Questions/Mindmap). Always map invalid `Neural2-B` voice names to `Neural2-D`.
- **Shadowing Corrections Isolation**: Shadowing corrections keys MUST be scoped by week and mode (`shadowing_corrections_v4_w${week}_${mode}_${videoId}`) to eliminate collisions between Easy and Advanced modes using the same YouTube video ID.
- **TTS Mode Script Integrity**: In TTS mode, Shadowing MUST strictly use `data.ttsScript || script` from lesson data and ignore video transcript overrides or legacy KV server corrections.
- **Stale CDN Chunk Recovery**: `loadWeekData` automatically reloads the page on dynamic import 404 errors caused by CDN chunk hash updates.