# 🧠 Current System State & Context

- **Context Status:** Session closed — all changes pushed to origin/main.
- **Branch:** `main` (synced with origin/main, working tree clean)
- **Last meaningful commit:** `9a29e9ad` feat(agentos): self-improvement loop — PostToolUse hook + lessons.md
- **Last production commit:** `ca554beb` fix(shadowing): restore Where is in W3 Rora dialogue + bump corrections v2
- **Active Tasks:** None (self-improvement hooks live; awaiting next task)

## Model Configuration (updated 2026-07-07)
Settings in `.claude/settings.local.json`:
- `ANTHROPIC_MODEL`: `claude-opus-4-7` (default session)
- `DEFAULT_OPUS_MODEL`: `claude-opus-4-8` (hard tasks: multi-file bugs, architecture)
- `DEFAULT_SONNET_MODEL`: `claude-sonnet-4-6` (routine: read/edit/grep)
- `SMALL_FAST_MODEL` + `DEFAULT_HAIKU_MODEL`: `claude-haiku-4-6` (lightweight tasks)
Use `/model opus-4-8`, `/model sonnet-4-6`, `/model haiku-4-6` to switch mid-session.

## Pending (from plan files, no owner)
- W35 writing.js fixes
- W32 dictation sync
- W21 dictation
- W7 image path
- **Monolithic JSON refactor** — ✅ DONE 2026-07-05: transcriptUtils.js bỏ MONO_* imports + fallback chains; .gitignore đảo (track per-video, ignore monolithic); git rm --cached monolithic files; runtime 100% per-video.
- Bold consistency audit W1-W35 (153 Pattern A + 449 Pattern C — auto-bold deferred, need SPAN TRACKING not regex)

## Next action for next session

### For OpenHands (Phase 3 Multi-Agent Adapter — first task):
Read `.devin/workflows/MULTI_AGENT_ADAPTER.md` first (memory adapter). Then either:
1. **Take over a pending item** from below
2. **Run the build verification suite** (bash production_kit/tools/preflight_check.sh) to confirm clean state post-refactor
3. **Self-assign a small bug fix** from `.ai/knowledge/BUG_DATABASE.md` to verify the agent loop

### For Claude Code (next session):
1. Pick one of the 5 pending items below (W35 writing, W32/W21 dictation sync, W7 image, bold audit)
2. OR continue Phase 3 (assign OpenHands a concrete task)
3. OR start W36 production

## Notes
- System cleanup DONE 2026-07-05: secrets → settings.local.json, Bash(*) auto-approve removed, canonical memory = .ai/memory/, /start + /finish synced to AgentOS, ADR_LOG + BUG_DATABASE seeded
- Monolithic JSON refactor DONE 2026-07-05 (commit 94449097): transcriptUtils.js 100% per-video, .gitignore flipped, 216 per-video files now git-tracked
- Lazy Loading + Ripgrep/Fetch workflow added to CLAUDE.md
- Multi-Agent Adapter created at .devin/workflows/MULTI_AGENT_ADAPTER.md (OpenHands read-first file)
- agent-finish.cjs now reads live git state (branch + recent commits) into CURRENT.md Auto Status
- commit 94449097 has been pushed to origin/main ✓

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

## Auto Status (REPLACED on git commit/push — manual sections above are preserved)

Updated: 2026-07-07T13:33:37.244Z
Branch: `main`

Recent:
553e343d docs: add model selection guide for cost optimization
2cf3e9a6 feat(hooks): add TDZ forward-reference detector (Lesson-006)
32ebfe95 docs(lessons): record TDZ gap + hook coverage limitation
