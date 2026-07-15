# Bug Database — EngQuest3K Lesson Learned Repository

> Each entry: Title, Date, Severity, Root Cause, Fix, Lesson Learned. Reusable across sessions — see `feedback_*.md` for related technical deep-dives.

---

## BUG-2026-07-03-001 — Shadowing Challenge: YouTube voice bleeds into next sentence during record

- **Date**: 2026-07-03
- **Severity**: 🔴 High (core feature broken in challenge mode)
- **Affected**: `src/hooks/useShadowingChallenge.js` + `src/modules/shadowing/Shadowing.jsx`
- **Symptom**: Student in Shadowing Challenge mode hears YouTube TTS continue playing into the next sentence after recording their voice. In Play (non-record) mode the issue did NOT occur.
- **Root Cause**: Two compounding bugs:
  1. **Lesson script duration is a curated estimate**, NOT actual transcript timing. Was off by -1.5s to -5.2s vs real transcript (e.g., W3 #6: lesson script 2.88s vs real 8.12s).
  2. **EndTimer paused video too early** because it trusted the lesson script's wrong duration. When student started recording, the previous sentence's YouTube audio was still playing → bleed into the next cue.
- **Fix** (commit chain — multiple files, ~13 edits):
  - Added helper `getActualSegmentDuration(videoId, sent.start)` that looks up real duration from `video_transcripts_cleaned.json`
  - Hard-cap `waitMs = min(actualDuration, next.start - sent.start - 0.2)` — never pause later than 200ms before the next cue starts
  - Pass `videoId` from `Shadowing.jsx` down through the hook prop chain
  - Tightened challenge sentence duration to non-overlap window (filtered transcript cycle 1 only)
- **Verification**: Multiple iterations in `.ai/decisions/DECISIONS_LOG.md` ADL row (YouTube pause early, 70ms latency offset, gap-aware pause offset, ref-based cancel)
- **Lesson Learned**:
  1. **Never trust curated estimates for real-time sync** — always lookup from authoritative source (transcript JSON)
  2. **Challenge/record paths are NOT tested by Play mode** — must have separate test cases
  3. **Audio timing bugs are silent** — only surface under specific user action sequences; add recording-mode smoke tests
  4. **The fix chain had 6+ incremental commits** (ca554beb, 6dee6a54, 05101d80, 5d80b3b6, b195831a, 346ed8de) — each tested a layer of the timing stack. The lesson: when fixing timing, fix one layer per commit so you can bisect.
- **Related memory**: `feedback_shadowing_playback_bugs.md` (15 rules), `feedback_shadowing_transcript_sync.md` (6 rules)
- **Test gap**: No automated E2E for "challenge + record + timing drift" — recommended add to `tests/e2e/shadowing_challenge.spec.js`

---

## BUG-2026-07-02-002 — Monolithic JSON antipattern: 72 videos packed into 1 line

- **Date**: 2026-07-01 (discovered)
- **Severity**: 🟡 Medium (data integrity risk, not user-facing)
- **Affected**: `src/data/video_transcripts_cleaned.json` (20,892 lines → collapsed to 1 line), `src/data/video_transcripts_sentences.json` (24,905 lines → collapsed to 1 line)
- **Symptom**:
  - `Read` tool fails on these files (output exceeds Read tool budget)
  - `sed -i` edits corrupt JSON (no newlines to anchor on)
  - Single `Write` mistake can silently nuke all 72 transcripts
  - `git diff` shows fake "everything changed" diffs
- **Root Cause**: Python preprocessing pipeline (`scripts/preprocess_transcripts.py`) collapsed all newlines to minimize file size, but broke tooling
- **Fix (PARTIAL — see STATUS 2026-07-05)**: Per-video files exist at `src/data/video_transcripts_by_id/{cleaned,sentences,raw}/<videoId>.json` (216 files = 72 videos × 3 types). However:
  - ⚠️ Directory NOT git-tracked (`git ls-files src/data/video_transcripts_by_id/` returns empty)
  - ⚠️ `transcriptUtils.js` still imports monolithic JSONs (line 7-8) AS WELL AS per-video globs (line 27-29) — dual-load pattern, not replacement
  - ⚠️ Monolithic files still serve as single source of truth at runtime; per-video is "fallback" (per file comment, but actual behavior is "AND")
  - ✅ Per-video data is consistent with monolithic (sampled 0QrcDQSxfCY.json — matches `video_transcripts.json` content for W3)
  - **Next steps to complete**: (1) Decide single source of truth (recommend per-video), (2) remove `import MONO_*` lines, (3) `git add src/data/video_transcripts_by_id/`, (4) commit, (5) optionally delete monolithic files.
- **Lesson Learned**:
  1. **Compactness optimizations can break developer ergonomics** — measure cost of editing, not just byte size
  2. **JSON tools assume readable formatting** — collapse at gzip layer, not source layer
  3. **Never pack multiple logical units into 1 line** — even if the tool can technically handle it, future you cannot
- **Plan file**: `.claude/plans/engquest3k-pending-fixes.md`

---

## BUG-2026-06-13-003 — VideoChallenge hints: bold markers functional, not decorative

- **Date**: 2026-06-13
- **Severity**: 🔴 High (entire Writing station was non-functional in some weeks)
- **Affected**: `src/data/weeks/week_XX/writing.js`
- **Symptom**: VideoChallenge mode showed no answer chips; students could not complete the activity
- **Root Cause**: Refactor removed `**bold**` markers as "decoration" — they were actually functional answer chips parsed by the challenge renderer
- **Lesson Learned**:
  1. **Read the renderer code BEFORE treating syntax as decoration** — `**bold**` was wired to `parseHints()` which extracts them as draggable chips
  2. **Top-level `picture_mode` (StoryWriting) is a different schema** from VideoChallenge — they share file but have dual structure
  3. **Document all functional markers** in `CLAUDE.md` so future refactors don't strip them

---

## BUG-2026-06-07-004 — Easy mode suffix: progress silently disappears

- **Date**: 2026-06-07
- **Severity**: 🔴 High (production incident — Easy mode students lost all progress)
- **Affected**: All Easy mode stations
- **Symptom**: Students completed Easy stations but progress bar reset to 0% on next visit
- **Root Cause**: Server returned station keys like `week_03_reading_easy`, but `STATION_ID_TO_TAB` lookup expected `week_03_reading` (without `_easy`). The `_easy` suffix wasn't stripped before lookup.
- **Fix**: Strip `_easy` suffix in `handleReportProgress` before `STATION_ID_TO_TAB` lookup
- **Lesson Learned**:
  1. **Test BOTH modes** — Advanced mode passed, Easy mode silently broken
  2. **Naming conventions MUST be consistent** end-to-end (server ↔ client ↔ store)
  3. **Silent failures are the worst bugs** — add explicit assertion at lookup boundary

---

## BUG-2026-06-07-005 — Zustand persist: progress lost on deploy

- **Date**: 2026-06-07
- **Severity**: 🔴 High (production incident)
- **Affected**: All users after deploy
- **Symptom**: LocalStorage progress wiped after version bump
- **Root Cause**: Zustand `persist` config missing `version` + `migrate`. Default behavior on schema change is to drop all data.
- **Fix**: Add `version`, `partialize`, `merge`, `migrate` to every `persist()` call
- **Lesson Learned**:
  1. **`persist` is DESTRUCTIVE BY DEFAULT** — must explicitly opt-in to migrations
  2. **Treat `persist` config like a database schema migration** — version + rollback plan
  3. **Test on a deployed build BEFORE pushing schema changes**

---

## BUG-2026-05-26-006 — Story Mission hallucination (W21+)

- **Date**: 2026-05-26 (fixed Feb 2)
- **Severity**: 🔴 High (AI Tutor generated fake story events)
- **Affected**: Story Mission arc, all weeks W21+
- **Symptom**: AI Tutor invented characters not in `backstory` and contradicted `story_arc`
- **Root Cause**: Prompt template didn't constrain LLM to `backstory` field; LLM hallucinated freely
- **Lesson Learned**:
  1. **LLM prompts MUST cite the source-of-truth field explicitly** ("Use ONLY characters from backstory")
  2. **Add validation post-LLM** that detects name/place mismatches vs `story_arc`
  3. **See `STORY_MISSION_HALLUCINATION_FIX_FEB2.md` for full fix log**

---

---

## BUG-2026-07-07-001 — TDZ crash: Shadowing.jsx handleChallengeDownload forward-refs effectiveScript

- **Date**: 2026-07-07
- **Severity**: 🔴 High (white-screen crash on page load)
- **Affected**: `src/modules/shadowing/Shadowing.jsx:300`
- **Symptom**: `Uncaught ReferenceError: Cannot access 'pe' before initialization` → white screen
- **Root Cause**: `handleChallengeDownload` (line 238) used `effectiveScript` in deps array, but `effectiveScript` was declared at line 310. `useCallback` captures the variable reference at render time; `const effectiveScript` is TDZ until line 310.
- **Why lint/build didn't catch**: TDZ is a runtime error. ESLint `no-undef` only checks declaration vs usage, not execution order. esbuild only checks syntax. Neither can detect forward references in closures.
- **Fix**: Moved `handleChallengeDownload` to AFTER `effectiveScript` declaration (commit `c152792a`).
- **Lesson Learned**:
  1. When adding `useCallback` mid-component, ALL deps vars must be declared ABOVE the callback.
  2. Use ref pattern or move callback below declaration to avoid TDZ.
  3. PostToolUse hook (lint + build) is NOT sufficient for runtime errors — always browser-test on dev server.
- **Related**: lessons.md Lesson-006, Lesson-007.

---

**Last updated**: 2026-07-07
**Format**: Each bug entry is reusable as a knowledge artifact — link from session memory when fix lands.
**TTL**: Permanent (these are real production incidents, not derivable from code)