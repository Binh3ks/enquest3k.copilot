# ✅ Completed Tasks — 161 commits (Jul 6–31, 2026)

---

## Memory System Fix (Jul 31)
- [x] 2026-07-31: Create `scripts/update_memory.js` — auto-update memory script
- [x] 2026-07-31: Restore `.md` format for `.claude/commands/*.md` (was `.cjs`)
- [x] 2026-07-31: Configure post-commit hook for auto memory update
- [x] 2026-07-31: Backfill all missed memory (161 commits)

## Sentence Splitting Pipeline (Jul 29–31)
- [x] 2026-07-31: LLM-powered sentence splitting — 99/99 files clean
- [x] 2026-07-31: Fix literal \n in JSON files causing build failure
- [x] 2026-07-30: LLM-powered sentence splitting for all 94 sentence files
- [x] 2026-07-30: Deepgram sync for W04/W08/W18/W22/W27/W32 — all 35/35 complete
- [x] 2026-07-30: fix_sentence_formatting.cjs — 94/99 files processed, 0 issues
- [x] 2026-07-30: sync_timestamps.cjs — bestaudio m4a + wide Levenshtein + fallback
- [x] 2026-07-30: Video↔syllabus alignment for 10 weeks
- [x] 2026-07-30: Restore TTS content + add content_en for W34

## Batch Pipeline Complete — 36 Weeks Approved (Jul 28–29)
- [x] 2026-07-29: Batch pipeline complete — 36 weeks APPROVED ✅
- [x] 2026-07-29: Reprocess W02-W06 with strict syllabus alignment
- [x] 2026-07-29: W24 + W10 Phase 2 Rule 2 violations corrected
- [x] 2026-07-29: Sync weeks_easy with ADV changes
- [x] 2026-07-29: Restore ALL TTS content from original commit 08c6b78e
- [x] 2026-07-29: Create sentence transcripts for W7/W10/W12/W16/W27/W34
- [x] 2026-07-29: Restore deleted transcript files for W28/W31/W32/W33
- [x] 2026-07-29: Fix embedded newlines in shadowing.js text fields

## Video Selection Pipeline + LLM Eval (Jul 27–28)
- [x] 2026-07-28: LLM-driven evaluation pipeline — replaces hardcoded string matching
- [x] 2026-07-28: Gemini 2.5-flash + robust JSON parsing
- [x] 2026-07-28: Semantic query builder with TOPIC_MAPPING + formula
- [x] 2026-07-28: W05 approved + Phase 1-3 batch screening tool
- [x] 2026-07-28: W15 approved with 27 chunks
- [x] 2026-07-28: INCOMPLETE_ENDINGS + pronoun anti-dangling + scoring weights
- [x] 2026-07-27: Syllabus-aware video selection with vocabulary relevance scoring
- [x] 2026-07-27: Caption quality filter + smart unpunctuated text heuristics
- [x] 2026-07-27: Strict channel whitelist + flexible transcript formatting

## Shadowing Video Curation + Transcript v3→v4 (Jul 23–25)
- [x] 2026-07-25: Revert to working public youtube videoIds for all weeks
- [x] 2026-07-24: Pipeline v4 — replace shadowing video IDs + Rule 4 audit
- [x] 2026-07-23: Replace 11 flagged shadowing videos — Rule 4 audit passes 35/35
- [x] 2026-07-23: v4 pipeline — 15-word cap + forced clause splitting + video curation rules
- [x] 2026-07-23: v3 transcript repair — zero dangling fragments, natural breath groups
- [x] 2026-07-23: Global batch alignment — all 35 weeks synced with Deepgram L3

## W11 Deep Dive + Shadowing Overhaul (Jul 6–22)
- [x] 2026-07-22: Forced alignment via Deepgram Nova-2 + 82 utterances
- [x] 2026-07-22: Eradicate ADV/EASY split, unify shadowing data structure
- [x] 2026-07-17: W11 ADV rebuild — pure T-009 transformation
- [x] 2026-07-10: Merge all segments within a speaker turn (no word count limit)
- [x] 2026-07-10: Use real audio.duration for word highlight timing
- [x] 2026-07-09: W11 TTS = weekend content, Transcript panel = video transcript
- [x] 2026-07-09: Smart merge in clean_transcripts — duration-based

## Shadowing Station Core Fixes (Jul 6–8)
- [x] 2026-07-08: Replace 5 mismatched videos (W04/W16/W20/W26/W29)
- [x] 2026-07-08: SentenceCard crash — toFixed on undefined duration
- [x] 2026-07-07: Unified Record All + download + remove 3s pre-countdown
- [x] 2026-07-07: Challenge summary modal — Download all recordings as WAV
- [x] 2026-07-07: TDZ crash fix — move handleChallengeDownload after effectiveScript
- [x] 2026-07-07: Pause flash at ALL_DONE + Retry wrong flow fix
- [x] 2026-07-07: Mic cleanup at ALL_DONE phase
- [x] 2026-07-06: Don't kill recording timer when stale score arrives

## Image Pipeline (Jul 9–11)
- [x] 2026-07-11: audit.mjs to identify regen candidates
- [x] 2026-07-10: W30-W31 covers uploaded to R2 + W32 fully covered
- [x] 2026-07-10: HF FLUX.1-schnell backend (97% success rate) + SD3
- [x] 2026-07-09: Orchestrator for W30-35 cover generation

## W36 New Golden Standard (Jul 10–13)
- [x] 2026-07-13: W36 complete — adventure stories, social quiz, bold chunks, AI Tutor
- [x] 2026-07-13: TabbedReadExplore renders bold markdown + comprehension Q&A UI
- [x] 2026-07-13: daily_watch videos with VERIFIED YouTube IDs
- [x] 2026-07-13: Cache-buster ?v=3 on W36_real import
- [x] 2026-07-10: Golden standard updated from W16 to W36

## Intelligence / Skills System (Jul 10)
- [x] 2026-07-10: 3 skills created (week-builder, shadowing-debug, content-check)
- [x] 2026-07-10: week-pipeline orchestrator skill
- [x] 2026-07-10: Content-aware hook + 3 subagents + repo-map enrichment
- [x] 2026-07-10: CocoIndex Code installed — benchmark results recorded

## AgentOS + Self-Improvement (Jul 6–7)
- [x] 2026-07-07: PostToolUse hook — auto lint + build + rollback
- [x] 2026-07-07: TDZ heuristic detector (Lesson-006)
- [x] 2026-07-07: Model selection guide for cost optimization
- [x] 2026-07-06: Phase 3 Multi-Agent Adapter — standardized handover formats

## Pre-July (Jul 3–5)
- [x] 2026-07-05: System cleanup — secrets, canonical memory, AgentOS sync
- [x] 2026-07-05: transcriptUtils.js refactor — removed MONO_* imports
- [x] 2026-07-05: AgentOS v2 structure created
- [x] 2026-07-31: Post-research remediation — 15 items complete (2026-07-13)
