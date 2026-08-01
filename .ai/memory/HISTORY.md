# Session History — 161 commits, 19 active days (Jul 6–31, 2026)

> Categorized by work area. Each line = one commit.

---

## Phase 1: Shadowing Station Overhaul (Jul 6–10, 23 commits)

The Shadowing station was the most bug-prone subsystem. This phase fixed core playback, mic lifecycle, and UX issues.

### Mic & Playback Lifecycle
- 2026-07-06 | fix: don't kill recording timer when stale score arrives
- 2026-07-06 | fix: START_BATCH_EVAL reducer missing phase transition
- 2026-07-07 | fix: auto-open summary modal at ALL_DONE
- 2026-07-07 | fix: inline Play/Pause button stops toggling at ALL_DONE
- 2026-07-07 | fix: mic stays open after challenge ends — add ALL_DONE cleanup effect
- 2026-07-07 | fix: Pause flash at ALL_DONE + Retry wrong jumps to first wrong sentence
- 2026-07-07 | fix: RESET_FOR_RETRY reducer crashes — use action.sentences not state.sentences
- 2026-07-07 | fix: TDZ crash — move handleChallengeDownload after effectiveScript

### New Features
- 2026-07-07 | feat: unified Record All + download + remove 3s pre-countdown
- 2026-07-07 | feat: add Download button next to Play Back in header
- 2026-07-07 | feat: Challenge summary modal — Download all recordings as WAV

### Transcript Merging
- 2026-07-10 | fix: merge short transcript segments into one speaker turn
- 2026-07-10 | fix: W11 transcript groups by speaker turn (Anna/John)
- 2026-07-10 | fix: merge all segments within a speaker turn (no word count limit)
- 2026-07-10 | fix: wait for TTS audio duration before starting word highlight
- 2026-07-10 | fix: use real audio.duration for word highlight timing
- 2026-07-10 | fix: use actual video audio duration for transcript highlight window
- 2026-07-10 | revert: rollback highlight/karaoke changes that broke W4
- 2026-07-10 | revert: restore transcriptUtils + transcriptAligner from V18 backup

### Video Replacement
- 2026-07-08 | fix: replace mismatched YouTube videos for W04/W16/W20/W26/W29
- 2026-07-08 | feat: generate transcripts for 5 new shadowing videos
- 2026-07-08 | fix: SentenceCard crash — toFixed on undefined duration
- 2026-07-08 | fix: W26 replace 50-min compilation with Carter family camping
- 2026-07-08 | fix: W22 + W34 replace mismatched videos
- 2026-07-08 | fix: W35 environment curated 17 sentences (was 72 fragments)

### W11 Deep Dive (Jul 9–22)
- 2026-07-09 | fix: W11 EASY rewrite to match park conversation
- 2026-07-09 | fix: W11 ADV update to match park conversation
- 2026-07-09 | fix: W11 ADV + EASY restore weekend activities script
- 2026-07-09 | fix: W11 TTS = weekend content, Transcript panel = video transcript
- 2026-07-09 | fix: Transcript panel reads from cleaned/ not sentences/
- 2026-07-17 | fix: W11 ADV rebuild — pure T-009 transformation
- 2026-07-22 | refactor: eradicate ADV/EASY split, unify shadowing data structure
- 2026-07-22 | fix: correct speaker boundaries for Anna/John
- 2026-07-22 | fix: restore TTS shadowing data and route 29-sentence transcript to Video mode
- 2026-07-22 | fix: realign L2 timestamps in curo8LPPA5Y.json
- 2026-07-22 | fix: forced alignment via Deepgram Nova-2 + L3 word timestamps
- 2026-07-22 | fix: replace 29-sentence guesswork with 82 Deepgram-aligned utterances
- 2026-07-23 | freeze: lock pipeline schema + rules (Deepgram Nova-2 golden standard)

---

## Phase 2: Transcript Pipeline v1→v4 (Jul 9–30, 35+ commits)

Built a multi-version transcript processing pipeline from scratch.

### Smart Merge (v1–v2)
- 2026-07-09 | fix: smart merge in clean_transcripts — duration-based, ignores ASR periods
- 2026-07-09 | fix: curated for both caption types
- 2026-07-09 | fix: W35 — 21 sentences merged from raw segments

### Transcript Repair (v3–v4)
- 2026-07-23 | feat: global batch alignment — all 35 weeks synced with Deepgram L3
- 2026-07-23 | feat: scale up transcript repair and segmentation pipeline
- 2026-07-23 | fix: v3 transcript repair — zero dangling fragments, natural breath groups
- 2026-07-23 | fix: v4 pipeline — 15-word cap + forced clause splitting + video curation rules
- 2026-07-23 | feat: add Rule 4 video curation audit script
- 2026-07-23 | feat: add replace_videos.py for targeted week replacement
- 2026-07-23 | feat: replace 11 flagged shadowing videos — Rule 4 audit passes 35/35
- 2026-07-23 | fix: W25, W34 replace 2 missing shadowing videos
- 2026-07-24 | feat: Pipeline v4 — replace shadowing video IDs + Rule 4 audit
- 2026-07-25 | fix: revert to working public youtube videoIds for all weeks
- 2026-07-25 | fix: apply pipeline v4 strictly to W12 and W25

### Sentence Splitting (Jul 29–31)
- 2026-07-29 | fix: restore ALL TTS content from original commit 08c6b78e
- 2026-07-29 | fix: embedded newlines in shadowing.js text fields
- 2026-07-29 | fix: create sentence transcripts for W7/W10/W12/W16/W27/W34
- 2026-07-29 | fix: restore deleted transcript files for W28/W31/W32/W33
- 2026-07-30 | fix: restore TTS content + add content_en to W34
- 2026-07-30 | fix: W06 + W34 correct video alignment + create sentence transcripts
- 2026-07-30 | fix: video↔syllabus alignment for 10 weeks
- 2026-07-30 | fix: sync_timestamps.cjs — bestaudio m4a + wide Levenshtein + fallback
- 2026-07-30 | fix: create sentence files for W04/W08/W18/W22/W27/W32
- 2026-07-30 | fix: W07 Deepgram timestamp alignment complete
- 2026-07-30 | fix: Deepgram sync for W04/W08/W18/W22/W27/W32 — all 35/35 complete
- 2026-07-30 | fix: fix_sentence_formatting.cjs — 94/99 files processed, 0 issues
- 2026-07-30 | feat: LLM-powered sentence splitting for all 94 sentence files
- 2026-07-30 | fix: restore correct timestamps + fix split_with_llm.cjs
- 2026-07-30 | fix: restore clean text + preserve Deepgram timestamps
- 2026-07-31 | fix: LLM-powered sentence splitting — 99/99 files clean
- 2026-07-31 | fix: literal \n in JSON files causing build failure

---

## Phase 3: Shadowing Video Selection Pipeline (Jul 27–28, 15 commits)

Built syllabus-aware video search with LLM evaluation.

### Video Search Engine
- 2026-07-27 | fix: repair transcript fetcher + update W01 with working video
- 2026-07-27 | fix: strict channel whitelist + flexible transcript formatting
- 2026-07-27 | fix: aggressive dialogue turn splitting + short segment combining
- 2026-07-27 | feat: caption quality filter + smart unpunctuated text heuristics
- 2026-07-27 | feat: syllabus-aware video selection with vocabulary relevance scoring
- 2026-07-27 | fix: use cached transcripts when API blocked + syllabus-aware search
- 2026-07-27 | fix: strict transcript-only vocab matching + sentence-boundary combine
- 2026-07-27 | fix: syllabus-aware search with strict vocab matching for W01
- 2026-07-27 | fix: strict duration limit + anti-dangling regex + blacklist
- 2026-07-28 | fix: use videoDuration=short for W01-10, strip character names from query
- 2026-07-28 | fix: semantic query builder + remove broken videoDuration + 429 retry
- 2026-07-28 | fix: refactor query builder to use semantic TOPIC_MAPPING with formula
- 2026-07-28 | fix: expanded whitelist + simplified YouTube-compatible queries

### LLM Evaluation
- 2026-07-28 | feat: LLM-driven evaluation pipeline — replaces hardcoded string matching
- 2026-07-28 | fix: LLM-driven pipeline working — Gemini 2.5-flash + robust JSON parsing
- 2026-07-28 | fix: improved LLM evaluation + regex fallback parser

### Batch Screening
- 2026-07-28 | feat: W05 approved + Phase 1-3 batch screening tool
- 2026-07-28 | feat: W15 approved with 27 chunks
- 2026-07-28 | fix: INCOMPLETE_ENDINGS + pronoun anti-dangling + scoring weights
- 2026-07-28 | fix: trust punctuation for sentence completeness
- 2026-07-29 | fix: INCOMPLETE_ENDINGS + pronoun anti-dangling + scoring weights
- 2026-07-29 | chore: batch pipeline complete — 20 weeks passed Phase 1-3
- 2026-07-29 | chore: sync weeks_easy with ADV changes
- 2026-07-29 | fix: W24 + W10 Phase 2 Rule 2 violations corrected
- 2026-07-29 | feat: reprocess W02-W06 with strict syllabus alignment
- 2026-07-29 | fix: transcriptEvaluator + W13 + week_03/06/13 easy shadowing
- 2026-07-29 | feat: batch pipeline complete — **36 weeks APPROVED** ✅

---

## Phase 4: Image Pipeline (Jul 9–11, 8 commits)

Built image generation pipeline for week covers and vocab images.

- 2026-07-09 | feat: orchestrator for W30-35 cover generation
- 2026-07-09 | fix: key loading + retry logic + model switch
- 2026-07-09 | feat: add HF FLUX.1-schnell backend (97% success rate)
- 2026-07-10 | fix: vocab/word_power parser bug + multi-backend + SD3
- 2026-07-10 | feat: W30-W31 covers uploaded to R2 + source URLs updated
- 2026-07-10 | feat: W32 fully covered + W33 partial (HF SD3)
- 2026-07-10 | fix: regenerate 7 bad W32 images using vetted reference prompts
- 2026-07-11 | feat: add audit.mjs to identify regen candidates

---

## Phase 5: W36 New Golden Standard (Jul 10–13, 10 commits)

Created W36 as the new production standard for W36+ (dual-tab, social quiz, evolved schemas).

- 2026-07-10 | feat: W36 Adventure Stories (Irregular Verbs) + Social Studies + Social Quiz
- 2026-07-10 | docs: update golden standard from W16 to W36
- 2026-07-11 | fix: TabbedReadExplore render comprehension_questions as {question_en}
- 2026-07-11 | fix: rewrite all W35-content files for Adventure Stories theme
- 2026-07-13 | fix: all W35-content files rewritten + validators pass
- 2026-07-13 | fix: rewrite week_36_real.js with Adventure Stories missions + chunks
- 2026-07-13 | fix: render **bold** markdown chunks in TabbedReadExplore content_en
- 2026-07-13 | fix: add interactive bold chunks (HoverWord) + comprehension Q&A UI
- 2026-07-13 | fix: daily_watch videos with VERIFIED 200-OK YouTube IDs
- 2026-07-13 | fix: add W36 to AI Tutor StoryMissionTab chain + fix default export
- 2026-07-13 | fix: bold whitespace rendering + shadowing video to W36 theme
- 2026-07-13 | fix: cache-buster ?v=3 on W36_real import

---

## Phase 6: Intelligence / Skills System (Jul 10, 3 commits)

- 2026-07-10 | feat: phase 1 — content-aware hook + 3 subagents + repo-map enrichment
- 2026-07-10 | feat: phase 2 — 3 skills (week-builder, shadowing-debug, content-check) + CocoIndex benchmark
- 2026-07-10 | feat: phase 3 — week-pipeline orchestrator skill + prompt cache plan
- 2026-07-10 | feat: CocoIndex Code installed — benchmark results recorded
- 2026-07-10 | refactor: consolidate architecture 9→4 files

---

## Phase 7: Self-Improvement & AgentOS (Jul 6–7, 12 commits)

- 2026-07-06 | feat: Phase 3 Multi-Agent Adapter — standardized handover formats
- 2026-07-06 | fix: pin all memory paths to absolute project root
- 2026-07-07 | feat: self-improvement loop — PostToolUse hook + lessons.md
- 2026-07-07 | fix: wire PostToolUse into settings.json + fallback rm for untracked files
- 2026-07-07 | feat: add TDZ forward-reference detector (Lesson-006)
- 2026-07-07 | docs: add model selection guide for cost optimization
- 2026-07-14 | docs: freeze runtime architecture and implementation roadmap
- 2026-07-15 | chore: untrack images + Shadowing + add gitignore (BFG prep)
- 2026-07-15 | chore: gitignore cleanup + untrack non-code files
- 2026-07-15 | chore: untrack legacy planning docs (keep code only)

---

## Phase 8: Memory System Fix (Jul 31)

- 2026-07-31 | fix: restore `.md` format for `.claude/commands/*.md` (was `.cjs`)
- 2026-07-31 | feat: create `scripts/update_memory.js` — manual memory update
- 2026-07-31 | fix: configure post-commit hook for auto memory update
- 2026-07-31 | fix: backfill all missed memory (161 commits, Jul 6–31)

---

## Pre-July (Jul 3–5)

2026-07-05 | system cleanup: secrets → settings.local.json, canonical memory = .ai/memory/
2026-07-05 | transcriptUtils.js refactor: removed MONO_* imports + fallback chains
2026-07-05 | Multi-Agent Adapter created
2026-07-03 | session boot only (no work)
2026-07-31 | main | fix(memory): backfill 161 commits (Jul 6-31) + restore .md commands + auto-update hook
2026-07-31 | main | fix(shadowing): W36 transcript — 12 sentences with Deepgram timestamps
2026-07-31 | main | fix(shadowing): W06 replace video — English Singsing prepositions dialogue
2026-07-31 | main | fix(shadowing): remove intro text from W01, W17 sentence files
2026-07-31 | main | fix(shadowing): remove intro text from all sentence files
2026-07-31 | main | fix(shadowing): replace W19, W22, W32 with syllabus-matched videos
2026-07-31 | main | fix(shadowing): replace W04, W09, W12, W14, W21, W31 with syllabus-matched videos
2026-07-31 | main | fix(shadowing): W34 rebuild transcript — 6 → 40 sentences
