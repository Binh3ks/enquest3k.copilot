# 📜 Architecture Decisions Log (ADL)
| Date | Decision | Rationale | Impact |
| :--- | :--- | :--- | :--- |
| 2026-07-03 | Chuyen doi sang AgentOS v2 framework | Tranh lap context, tich hop sau vao he sinh thai `.claude/` san co | Hop nhat quy quy trinh giua Claude Code va OpenHands |
| 2026-07-03 | Challenge YouTube pause som vi lesson duration sai | Lesson script duration la curated estimate, sai -1.5s den -5.2s so voi transcript (vd W3 #6: lesson 2.88s vs thuc 8.12s). EndTimer pause video som -> voice chay them vao cau ke. Fix: lookup getActualSegmentDuration(videoId, sent.start) tu video_transcripts_cleaned.json; hard-cap waitMs bang next.start - sent.start - 0.2 de khong bao gio pause tre hon cau sau bat dau 200ms. File: src/hooks/useShadowingChallenge.js (them helper getActualSegmentDuration, thay block endTimer trong PLAY_TTS effect). | Mode Play (khong record) dung useShadowingVideoSync polling 100ms - khong bi. Chi challenge record path bi. |
