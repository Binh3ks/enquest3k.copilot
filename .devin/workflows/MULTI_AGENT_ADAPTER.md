# Multi-Agent Adapter — EngQuest3K AgentOS v2

> **Cổng giao tiếp bộ nhớ** giữa Claude Code (chính) và OpenHands (background).
> OpenHands PHẢI đọc file này khi bắt đầu bất kỳ task nào, trước khi tham chiếu memory layer.

---

## 0. Canonical Memory Root (absolute paths)

**Memory root** (hardcoded, do not change without project move):

```
/Users/binhnguyen/projects/Engquest3k/.ai/memory/
/Users/binhnguyen/projects/Engquest3k/.ai/tasks/
/Users/binhnguyen/projects/Engquest3k/.ai/decisions/
/Users/binhnguyen/projects/Engquest3k/.ai/knowledge/
/Users/binhnguyen/projects/Engquest3k/.ai/architecture/
/Users/binhnguyen/projects/Engquest3k/.ai/prompts/
/Users/binhnguyen/projects/Engquest3k/.ai/context/
/Users/binhnguyen/projects/Engquest3k/.ai/templates/
/Users/binhnguyen/projects/Engquest3k/.ai/scripts/
/Users/binhnguyen/projects/Engquest3k/.ai/bootstrap/
/Users/binhnguyen/projects/Engquest3k/.ai/runtime/
```

All `/start` and `/finish` AgentOS commands are pinned to these absolute paths.
Regardless of cwd, OpenHands should resolve memory via these paths — never use
`~/.claude/projects/...` (the deprecated harness memory layer).

---

## 1. Hiện trạng hệ thống (System State)

**Stack**: React 19.2 + Vite 7 + Zustand 5 + Supabase + Cloudflare R2 (TTS/audio) + SPA, no Node server.

**Runtime contracts**:
- Frontend → Supabase (auth, progress, realtime)
- Frontend → Cloudflare R2 (TTS audio cache, 156 weeks × 16 stations)
- Frontend → Gemini / Deepgram / Cerebras / Groq / Together (LLM fallback chain via `apiProviderManager.js`)

**Canonical file paths** (absolute — full paths, not relative):
- Memory: `/Users/binhnguyen/projects/Engquest3k/.ai/memory/CURRENT.md` (single source of truth)
- Tasks: `/Users/binhnguyen/projects/Engquest3k/.ai/tasks/ACTIVE.md` → DONE.md
- Decisions: `/Users/binhnguyen/projects/Engquest3k/.ai/decisions/ADR_LOG.md` (architecture), `.../DECISIONS_LOG.md` (per-fix log)
- Knowledge: `/Users/binhnguyen/projects/Engquest3k/.ai/knowledge/BUG_DATABASE.md` (production incidents)
- Sessions: `/Users/binhnguyen/projects/Engquest3k/.ai/memory/SESSION.md` (full log), `.../HISTORY.md` (one-liner per session)

**Secrets**: `/Users/binhnguyen/projects/Engquest3k/.claude/settings.local.json` ONLY (NOT `settings.json`)

---

## 2. Luật Lazy Loading (token economy)

OpenHands, khi bạn cần đọc code, hãy tuân thủ luồng sau:

```
1. Grep (ripgrep 14.1.1) → find file paths + line numbers
2. Read(file, offset, limit) → load ONLY the section you need
3. NEVER Read() whole files > 500 lines
4. NEVER Read() directory globs (src/modules/*.jsx)
```

**Tool map**:

| Need | Tool | Example |
|------|------|---------|
| Find symbol across 14 modules | `Grep pattern=X path=src/` | `Grep pattern="useShadowingChallenge" path="src/hooks/"` |
| Find file by name | `Glob` | `Glob pattern="src/data/weeks_easy/week_*/read.js"` |
| Load file section | `Read(offset, limit)` | `Read(transcriptUtils.js, offset=1, limit=40)` |
| External docs (Supabase, Playwright, AI providers) | `WebFetch` | `WebFetch url="https://supabase.com/docs/reference/javascript/auth-signinwithpassword"` |
| Cross-source research | `WebSearch` | `WebSearch query="Cerebras inference API 2026 chat completions"` |

**Anti-patterns (avoid these — they waste tokens)**:
- ❌ `Read(file)` on a >500-line JSON
- ❌ `Read(src/modules/*.jsx)` — directory glob
- ❌ Multiple separate `Grep` calls with overlapping patterns — consolidate into 1 with regex alternation
- ❌ Reading whole docs page via WebFetch — use `prompt` parameter to extract specific info

**Combined workflow example — debugging W14 shadowing bug** (600 tokens vs 3000):

```
1. Grep pattern="week_14|shadowing" path="src/data/" output_mode="files_with_matches"  → 3 files
2. Read(W14/shadowing.js, offset=1, limit=50) + Read(useShadowingChallenge.js, offset=240, limit=30)  [parallel]
3. WebSearch query="Playwright 1.59 locator chain timeout"  → 1 result
4. Apply fix, Read(W14/shadowing.js, offset=80, limit=10) to verify
```

---

## 3. Trạng thái Task Refactor Dữ Liệu (Transcript Refactor)

**Status**: ✅ **HOÀN THÀNH** (2026-07-05)

**What changed**:
1. `src/modules/shadowing/transcriptUtils.js` — Removed `import MONO_CLEANED/MONO_SENTENCES`, removed fallback chains in `getTranscript()` and `getCleanedTranscriptSentences()`. Runtime now reads **per-video files only**.
2. `.gitignore` — Replaced entry `src/data/video_transcripts_by_id/` (was excluding per-video files) with 3 entries excluding monolithic JSONs: `video_transcripts.json`, `video_transcripts_cleaned.json`, `video_transcripts_sentences.json`.
3. `git rm --cached` applied to the 3 monolithic files — they're now local-only.
4. Per-video files (`src/data/video_transcripts_by_id/{cleaned,sentences,raw}/<videoId>.json`, 216 files = 72 videos × 3 types) are now trackable.

**Why monolithic files still exist on disk**:
- Source of truth for `tools/split_transcripts.py` (regenerates per-video files)
- Kept local-only as a safety net; if per-video files get corrupted, regenerate via:
  ```bash
  python3 tools/split_transcripts.py
  ```

**What OpenHands should NOT do**:
- ❌ Re-add `import MONO_*` lines to `transcriptUtils.js`
- ❌ Add fallback chains back to runtime functions
- ❌ Delete `tools/split_transcripts.py` (still needed for regeneration)
- ❌ Delete monolithic JSONs from local disk (needed for regeneration)

**What OpenHands CAN do**:
- ✅ Modify per-video files directly (small, line-by-line Edit works)
- ✅ Add new transcript types under `video_transcripts_by_id/<newType>/<videoId>.json`
- ✅ Run `python3 tools/split_transcripts.py` to regenerate from monolithic if needed
- ✅ Improve `tools/split_transcripts.py` (e.g., add error handling, CLI args)

---

## 4. Active Tasks (as of 2026-07-05)

From `/Users/binhnguyen/projects/Engquest3k/.ai/tasks/ACTIVE.md`:

```
# Active Tasks
- [ ] Trien khai Phase 3: Cau hinh Multi-Agent Adapter cho OpenHands (Dang thuc hien)
```

**Interpretation**: OpenHands đã được onboard qua file này (bạn đang đọc nó). Khi bạn (OpenHands) bắt đầu thực hiện task, hãy:

1. Update `/Users/binhnguyen/projects/Engquest3k/.ai/tasks/ACTIVE.md`: đổi `- [ ]` → `- [x]` + thêm commit hash + ngày
2. Append to `/Users/binhnguyen/projects/Engquest3k/.ai/decisions/DECISIONS_LOG.md` với context + fix + impact
3. Update `/Users/binhnguyen/projects/Engquest3k/.ai/memory/CURRENT.md` status block + append one-liner to `/Users/binhnguyen/projects/Engquest3k/.ai/memory/HISTORY.md`

---

## 5. Communication Protocol

**When you finish a task**, run (from repo root):
```bash
node .claude/commands/agent-finish.cjs
```

This is the SAME `/finish` command Claude Code uses — it's agent-agnostic. It will:
1. Move completed tasks from ACTIVE.md → DONE.md
2. Reset ACTIVE.md to idle (keep pending items)
3. Update CURRENT.md status block
4. Append one-liner to HISTORY.md

**When you start a task**, run:
```bash
node .claude/commands/agent-start.cjs
```

This loads CURRENT.md + ACTIVE.md + CLAUDE.md — same as Claude Code's `/start`.

**MANDATORY pre-task step — read lessons**:
```bash
cat /Users/binhnguyen/projects/Engquest3k/.claude/memory/lessons.md
# Or via symlink:
cat /Users/binhnguyen/projects/Engquest3k/.ai/knowledge/LESSONS.md
```

OpenHands PHẢI đọc lessons.md trước khi bắt đầu bất kỳ task nào. Nếu lesson nào bị vi phạm → STOP và append vào BUG_DATABASE.md với prefix `[LESSON-VIOLATED]`.

---

## 6. Standardized Handover Formats (Bắt buộc cho mọi Agent)

Khi Claude Code chuyển context cho OpenHands (hoặc agent mới), nó BẮT BUỘC dùng các format dưới đây. OpenHands đọc context qua các format này — không phải tự do diễn giải.

### 6.1. Handover Block (Header of every task)

Mỗi task message OpenHands nhận được phải bắt đầu bằng block này:

```yaml
---
AGENT_HANDOFF:
  from: claude-code        # agent gửi
  to: openhands            # agent nhận
  task_id: "phase-3-multi-agent-adapter"  # kebab-case unique
  handoff_at: 2026-07-06T10:30:00Z        # ISO-8601 UTC
  handoff_chain: [claude-code]             # danh sách agents đã xử lý task này
  context_files:                          # absolute paths BẮT BUỘC đọc
    - /Users/binhnguyen/projects/Engquest3k/.ai/memory/CURRENT.md
    - /Users/binhnguyen/projects/Engquest3k/.ai/tasks/ACTIVE.md
    - /Users/binhnguyen/projects/Engquest3k/.ai/decisions/ADR_LOG.md
  summary: "<one-sentence task summary>"
  acceptance_criteria:                   # bullet list, each verifiable
    - "<criterion 1>"
    - "<criterion 2>"
  estimated_complexity: low|medium|high
  blockers: []                            # list of known blockers, or empty
---
```

### 6.2. File Path Format

- **Absolute paths only**: `/Users/binhnguyen/projects/Engquest3k/...`
- **No relative paths**: KHÔNG dùng `./`, `../`, hoặc bắt đầu bằng tên file/folder
- **No `~` shorthand**: KHÔNG dùng `~/` — viết đầy đủ `/Users/...`
- **No environment vars**: KHÔNG dùng `$HOME`, `${PWD}` — Claude Code có thể chạy trên nhiều shell

### 6.3. Decision Log Format

Khi OpenHands ra quyết định kiến trúc, append vào `/Users/binhnguyen/projects/Engquest3k/.ai/decisions/DECISIONS_LOG.md`:

```markdown
### [YYYY-MM-DD] <Short Title>
- **Agent**: openhands
- **Task**: <task_id from handoff>
- **Context**: <1-2 sentences on what prompted the decision>
- **Decision**: <the choice made>
- **Impact**: <what changes as a result>
- **Files**: <list of absolute paths modified>
```

### 6.4. Status Update Format

Khi OpenHands hoàn thành task, update `/Users/binhnguyen/projects/Engquest3k/.ai/tasks/ACTIVE.md`:

```markdown
- [x] <task title> ✓ DONE YYYY-MM-DD by <agent-name>
  commit: <short-sha>
  summary: "<one-line summary>"
```

Và append one-liner vào `/Users/binhnguyen/projects/Engquest3k/.ai/memory/HISTORY.md`:

```markdown
YYYY-MM-DD | EngQuest3K | <task_id> done by <agent-name> | <one-line summary>
```

### 6.5. Error Report Format

Khi OpenHands gặp blocker không thể tự giải, append vào `/Users/binhnguyen/projects/Engquest3k/.ai/knowledge/BUG_DATABASE.md` (hoặc file mới nếu chưa có):

```markdown
## BUG-YYYY-MM-DD-NNN — <short title>
- **Date**: YYYY-MM-DD
- **Severity**: 🔴 High | 🟡 Medium | 🟢 Low
- **Affected**: <file paths>
- **Symptom**: <what user sees>
- **Root Cause**: <what was wrong>
- **Fix**: <how resolved>
- **Lesson Learned**: <bullet points>
```

### 6.6. Conflict Resolution

Nếu OpenHands phát hiện xung đột với Claude Code:
1. **Dừng lại** — không tự ý thay đổi
2. Ghi vào `/Users/binhnguyen/projects/Engquest3k/.ai/knowledge/BUG_DATABASE.md` với prefix `[CONFLICT]`
3. Đợi Claude Code resolve trong session tiếp theo

### 6.7. Reserved File Paths

OpenHands KHÔNG ĐƯỢC ghi trực tiếp vào:
- `/Users/binhnguyen/projects/Engquest3k/.claude/settings.json` — security
- `/Users/binhnguyen/projects/Engquest3k/.claude/settings.local.json` — secrets
- `/Users/binhnguyen/projects/Engquest3k/CLAUDE.md` — chỉ Claude Code update

OpenHands CÓ THỂ đọc tất cả files nhưng write phải tuân thủ format trên.

### 6.8. Version Compatibility

Adapter format version: **v1** (2026-07-06). Nếu format thay đổi, bump version trong header. OpenHands nên check version và fail loud nếu mismatch:

```yaml
AGENT_HANDOFF:
  adapter_version: v1
```

---

**Last updated**: 2026-07-06 (Phase 3 — Standardized Handover Formats added)
**Maintained by**: Claude Code (writes here when architecture changes); OpenHands (reads + follows)
**Owner of truth**: `/Users/binhnguyen/projects/Engquest3k/.ai/memory/CURRENT.md` — always check there first for live state.
**Adapter version**: v1