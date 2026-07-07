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