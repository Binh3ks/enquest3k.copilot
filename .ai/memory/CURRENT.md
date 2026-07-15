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

Updated: 2026-07-13T07:42:02.581Z
Branch: `main`

### Recent commits
```
32dc5575 fix(W36): cache-buster ?v=3 on W36_real import to bypass stale browser cache
54a07caa fix(W36): bold whitespace rendering + shadowing video to W36 theme
f3073d2b fix(W36): add W36 to AI Tutor StoryMissionTab chain + fix default export
0f88a75c fix(W36): daily_watch videos with VERIFIED 200-OK YouTube IDs
cb3c6bf9 fix(W36): add interactive bold chunks (HoverWord) + comprehension Q&A UI
```

### Uncommitted
```
M .ai/memory/CURRENT.md
 M .claude/hooks/post-edit-validate.cjs
?? .agents/
?? .ai/research/
?? ".claude/settings.local copy.json"
?? .claude/skills/ccc
?? .clineignore
?? .clinerules
?? .cocoindex_code/
?? .devin/skills/
?? .mcp.json
?? cline_mcp_settings.json
?? public/images/week32/explore_cover_w32.jpg
?? public/images/week32/math_cover_w32.jpg
?? public/images/week32/read_cover_w32.jpg
?? public/images/week32/vocab_asleep.jpg
?? public/images/week32/vocab_birdhouse.jpg
?? public/images/week32/vocab_broom.jpg
?? public/images/week32/vocab_cafe.jpg
?? public/images/week32/vocab_choose.jpg
?? public/images/week32/vocab_early.jpg
?? public/images/week32/vocab_grandmother.jpg
?? public/images/week32/vocab_grass.jpg
?? public/images/week32/vocab_hammer.jpg
?? public/images/week32/vocab_iron.jpg
?? public/images/week32/vocab_letter.jpg
?? public/images/week32/vocab_nail.jpg
?? public/images/week32/vocab_polish.jpg
?? public/images/week32/vocab_saturday.jpg
?? public/images/week32/vocab_shelf.jpg
?? public/images/week32/vocab_sweep.jpg
?? public/images/week32/vocab_tidy.jpg
?? public/images/week32/vocab_wash.jpg
?? public/images/week32/wordpower_build_a_birdhouse.jpg
?? public/images/week32/wordpower_cut_the_grass.jpg
?? public/images/week32/wordpower_do_homework.jpg
?? public/images/week32/wordpower_get_dressed.jpg
?? public/images/week32/wordpower_keep_things_tidy.jpg
?? public/images/week32/wordpower_make_the_bed.jpg
?? public/images/week32/wordpower_put_things_away.jpg
?? public/images/week32/wordpower_set_table.jpg
?? public/images/week32/wordpower_tidy_your_room.jpg
?? public/images/week32/wordpower_wake_up_early.jpg
?? public/images/week32/wordpower_wash_dishes.jpg
?? public/images/week32/wordpower_write_a_letter.jpg
?? public/images/week33/explore_cover_w33.jpg
?? skills-lock.json
?? src/data/weeks/week_7_easy/
?? src/data/weeks_easy/week_7_easy/
```
