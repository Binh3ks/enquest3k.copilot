# Self-Improvement Lessons — EngQuest3K AgentOS

> Append-only. Mỗi lesson = 1 quy tắc rút ra từ bug/incident đã được fix.
> Đọc file này TRƯỚC mỗi task để check xem có lesson nào đang bị vi phạm không.

---

## Lesson-001 — 2026-07-07: Auto-rollback rule exists but isn't enforced

**Rule**: Sau khi Edit/Write file `.js/.jsx/.ts/.tsx`, PHẢI auto-run `npm run lint -- <file>`. Nếu fail → auto `git checkout -- <file>`.

**Why**: Hooks trong `.claude/hooks/hooks.json` là STUB (chỉ `echo`). CLAUDE.md:306-311 chỉ là text rule, phụ thuộc "ký ức" agent.

**How to apply**: Hook `post-edit-validate.cjs` đã tạo — PostToolUse auto lint → build → rollback on fail.

---

## Lesson-002 — 2026-07-07: Memory convention phải thống nhất giữa AgentOS + Claude Code

**Rule**: Lessons phải có canonical path + symlink để tránh drift.

**Why**: AgentOS canonical = `.ai/knowledge/`, Claude Code = `.claude/memory/`.

**How to apply**: `.claude/memory/lessons.md` là file thật. `.ai/knowledge/LESSONS.md` là symlink.

---

## Lesson-003 — 2026-07-06: Shadowing Challenge YouTube bleed (BUG-2026-07-03-001)

**Rule**: Fix timing bugs → fix một layer per commit. Không trust curated estimates cho real-time sync.

**Why**: Fix chain 6+ commits, lesson script duration sai -1.5s đến -5.2s so real transcript.

**How to apply**: Test cả Play mode và Challenge mode riêng. Lookup transcript JSON, không dùng curated estimates.

**Related**: `feedback_shadowing_playback_bugs.md`, `BUG_DATABASE.md` BUG-2026-07-03-001.

---

## Cách sử dụng

```bash
# Trước task — đọc lessons
Read .claude/memory/lessons.md

# Thêm lesson mới — append
Edit .claude/memory/lessons.md

# Symlink auto-discover
cat .ai/knowledge/LESSONS.md  # → same file
```

**Maintenance**: Append-only. Đánh dấu `[DEPRECATED]` nếu lesson sai.

---

## Lesson-004 — 2026-07-07: ALL_DONE missing mic cleanup (BUG-2026-07-07-001)

**Rule**: Khi reducer có phase-guard trong MEDIA_STOPPED (`if phase !== RECORDING → return`), PHẢI có effect cleanup ở mọi phase-terminal (ALL_DONE, SCORED-end) để đảm bảo `stopRecording()` được gọi.

**Why**: `handleNext()` + `handleSeeResults()` dispatch `FINISH` mà KHÔNG gọi `stopRecording()`. MEDIA_STOPPED reducer ignore action vì phase ≠ RECORDING nữa. Mic stream không bao giờ được release.

**How to apply**: Luôn thêm `useEffect(() => { if (phase === ALL_DONE) stopRecording(); }, [phase])` khi có MediaRecorder trong state machine.

**Related**: commit `dd5d6f1a`, `useShadowingChallenge.js:651-660`.

---

## Lesson-005 — 2026-07-07: Pause button flash + Retry wrong jumps to wrong sentence

**Rule 1 (Pause flash at ALL_DONE)**: Khi derive `isPlaying` từ `challengeActive`, PHẢI guard `&& !challengeDone`. Vì `challengeActive = phase !== SETUP` vẫn true ở ALL_DONE → `isPlaying=true` → Pause icon flashes mặc dù mic đã released.

**Rule 2 (Retry wrong flow)**: Modal "All done!" PHẢI close trước khi dispatch `RESET_FOR_RETRY`. Reducer `SKIP_SENTENCE` phải navigate theo `retryQueue` (không phải `currentIndex+1`) và transition về ALL_DONE khi queue exhausted để modal reopen.

**Why**: Ảnh client hiển thị Pause nhấp nháy + Retry wrong chỉ active câu cuối. Modal không đóng → user không thấy UI luyện tập.

**How to apply**: 
- Modal handlers phải wrap: `setSavePracticeOpen(false); dispatch(retry);`
- Reducer cần track `retryQueue`, `inRetryMode` để SKIP_SENTENCE biết next target

**Related**: commit `0e2c3a5a`, `useShadowingChallenge.js:180-244,665-672`, `Shadowing.jsx:799,668-677`.