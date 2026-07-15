# Subsystems — EngQuest3K inventory

A subsystem is a unit of behavior that crosses folders: an app capability, a content pipeline, or a cross-cutting service. Each entry describes the subsystem, where it lives, what it depends on, and its current status. If something cannot be determined from the repository structure alone, it is marked `TODO`.

## How to read this file

- Each subsystem has the same shape: **Name, Purpose, Main folders, Dependencies, Related subsystems, Status, Unknowns.**
- "Main folders" lists the directories that *belong* to the subsystem. Other subsystems may *use* them.
- "Related" lists subsystems that share data, files, or a workflow contract.
- "Status" reflects the state of the subsystem in the repo (active, scaffolded, archived). Do not read this as a health metric.
- "Unknowns" lists what cannot be determined from folder inspection alone.

---

## 1. AI Tutor

- **Purpose:** The conversational AI station. Story Missions (Card Mode / Soft Bridge Mode), Free Talk, Pronunciation, Debate. Operates with a per-week empathy contract, `chunk_focus[]`, and `opening_narrative`.
- **Main folders:** `src/services/ai_tutor/`, `src/modules/ai_tutor/`, `src/ai/`, `src/data/weeks/week_NN_real.js` (per-week data), `src/data/missions/`, `src/data/storyMissions.js`
- **Dependencies:** LLM provider chain (Cerebras → Groq → Together → Gemini), Supabase (auth, progress), TTS subsystem, R2 (audio cache for corrections)
- **Related:** TTS subsystem, R2 storage, LLM provider subsystem, Dictionary, Progress tracking
- **Status:** Active. Highest-risk subsystem in the project. Multiple bug-fix rounds documented in `feedback_shadowing_playback_bugs.md` and similar.
- **Unknowns:** Exact LLM cascade trigger conditions, the corrections cache shape and storage location, exact `phase_questions` schema, the soft-bridge decision threshold.

## 2. Reading station (`read`)

- **Purpose:** The reading comprehension station. Renders the week's `read.js` passage with chunk-bolded multi-word collocations, dictionary popups on click, and the comprehension questions.
- **Main folders:** `src/modules/read/`, `src/data/weeks/week_NN/read.js`, `src/data/weeks_easy/week_NN/read.js`
- **Dependencies:** Dictionary subsystem, Chunk rendering (in `read` module), Audio subsystem (TTS for chunk pronunciation)
- **Related:** Explore (sibling station), Vocab, Dictation, Shadowing (share source text)
- **Status:** Active. Chunk-first enforcement (CHECK 20c) lives here.
- **Unknowns:** Exact render pipeline for the dictionary popup, the question scaffolding validator.

## 3. Explore station (`explore`)

- **Purpose:** A free exploration activity, sibling of Reading. No formal comprehension questions; lower scaffold.
- **Main folders:** `src/modules/explore/`, `src/data/weeks/week_NN/explore.js`, `src/data/weeks_easy/week_NN/explore.js`
- **Dependencies:** Dictionary subsystem, Reading pipeline (shared rendering)
- **Related:** Reading (shares the `renderStyledText` chunk pipeline)
- **Status:** Active. 0 questions per CLAUDE.md (activity is open-ended).
- **Unknowns:** What makes explore "complete" without a question scaffold.

## 4. Vocab station (`vocab`)

- **Purpose:** The vocabulary station. Lists the week's words and collocations with dictionary anchors.
- **Main folders:** `src/modules/vocab/`, `src/data/weeks/week_NN/vocab.js`, `src/data/weeks_easy/week_NN/vocab.js`
- **Dependencies:** Dictionary subsystem
- **Related:** Reading, Word Power, Word Match
- **Status:** Active.
- **Unknowns:** Exact collocation rendering, the `extended_collocations.json` use.

## 5. Grammar station (`grammar`)

- **Purpose:** The grammar exercise station. Multiple choice / unscramble / fill-in. Engine expects `answer:`, not `correct:`.
- **Main folders:** `src/modules/grammar/`, `src/data/weeks/week_NN/grammar.js`, `src/data/weeks_easy/week_NN/grammar.js`
- **Dependencies:** Grammar engine (in module)
- **Related:** Reading (topic alignment), Writing (reinforcement)
- **Status:** Active. B7/B8/B9 in `bug_prevention_check.sh` cover known failure modes.
- **Unknowns:** Exercise type coverage, the `unscramble` parser.

## 6. Logic / Science station (`logic`)

- **Purpose:** Logic + science puzzles, including Singapore Math bar-model problems at later weeks.
- **Main folders:** `src/modules/logic/`, `src/data/weeks/week_NN/logic_science.js`, `src/data/weeks/week_NN/singapore_math.js`, `src/data/weeks_easy/week_NN/singapore_math.js`
- **Dependencies:** Bar-model renderer (`generate_logiclab_barmodels.py` lives in `tools/`), Singapore Math type validator
- **Related:** None directly; feeds into general critical thinking
- **Status:** Active. CPA progression (language → concrete → pictorial) is fixed by week number.
- **Unknowns:** How the bar model is rendered in the browser (component path).

## 7. Dictation station (`dictation`)

- **Purpose:** Listen-and-type station. Sentences are selected from `read.js` to be chunk-rich.
- **Main folders:** `src/modules/dictation/`, `src/data/weeks/week_NN/dictation.js`, `src/data/weeks_easy/week_NN/dictation.js`
- **Dependencies:** Audio subsystem, Reading (sentence source alignment)
- **Related:** Shadowing (sibling), Reading (must stay aligned)
- **Status:** Active. Sync between `read.js` and `dictation.js` is enforced.
- **Unknowns:** The "select chunk-rich sentences" heuristic.

## 8. Shadowing station (`shadowing`)

- **Purpose:** Pronunciation / speaking station. User listens, records, compares. Karaoke highlight on transcript. Two modes: inline Play and Play All.
- **Main folders:** `src/modules/shadowing/`, `src/data/weeks/week_NN/shadowing.js`, `src/data/weeks/week_NN/shadowing_ipa.js`, `src/data/weeks_easy/week_NN/shadowing.js`
- **Dependencies:** Audio subsystem, TTS, YouTube transcript alignment (`src/data/curated_transcripts.json`, `video_transcripts_*.json`)
- **Related:** Dictation, Reading, Daily Watch, AI Tutor Pronunciation Tab
- **Status:** Active. Multiple recent commits (Jun 26 – Jul 1, 2026) on this subsystem. Known bugs documented in `feedback_shadowing_transcript_sync.md` and `feedback_shadowing_playback_bugs.md`.
- **Unknowns:** Inline `.map()` interval ref strategy, the corrections cache R2 vs localStorage decision, the 4-state sequence machine.

## 9. Writing station (`write_speak`)

- **Purpose:** Picture-prompt writing (W16+). Picture-mode writing exercises with sentence frames. Min words, scaffolding stages, vocabulary bank.
- **Main folders:** `src/modules/write_speak/`, `src/data/weeks/week_NN/writing.js`, `src/data/weeks_easy/week_NN/writing.js`
- **Dependencies:** Reading (vocabulary), Image pipeline (story images)
- **Related:** Story writing, AI Tutor (Viva Voce)
- **Status:** Active. ADV 8 frames / Easy 6-7 frames / min_words 45 / 30.
- **Unknowns:** Picture-mode vs Video-Challenge TOP structure; exact `scaffolding_stage` enum.

## 10. Daily Watch (`watch`)

- **Purpose:** Video-based learning station. Daily-watch videos with curated transcripts, YouTube integration.
- **Main folders:** `src/modules/watch/`, `src/data/weeks/week_NN/daily_watch.js`
- **Dependencies:** YouTube transcript package, R2 (audio), Video queries JSON
- **Related:** Shadowing, Video
- **Status:** Active. YouTube video IDs sourced via Data API (`tools/update_videos.js`).
- **Unknowns:** Thumbnail accessibility validator specifics.

## 11. Games (GameHub)

- **Purpose:** Multiple game-style learning activities consolidated under one page.
- **Main folders:** `src/modules/games/`, `src/data/weeks/week_NN/games.js`, `src/pages/GameHub/`
- **Dependencies:** Various per-game
- **Related:** Word Match, Word Power, Match
- **Status:** Active. Multiple game types per `production_kit/Game IKEA/IKEA effect và game hóa.txt` (Vietnamese design doc).
- **Unknowns:** Game list and per-game dependency graph.

## 12. Word Match (`match`)

- **Purpose:** Word-matching mini-game.
- **Main folders:** `src/modules/match/`, `src/data/weeks/week_NN/word_match.js`
- **Dependencies:** Dictionary
- **Related:** Vocab, Word Power
- **Status:** Active (assumed — module folder exists).
- **Unknowns:** Game mechanic specifics.

## 13. Word Power (`power`)

- **Purpose:** Word power drill mini-game.
- **Main folders:** `src/modules/power/`, `src/data/weeks/week_NN/word_power.js`
- **Dependencies:** Dictionary
- **Related:** Vocab, Word Match
- **Status:** Active.
- **Unknowns:** Drill mechanic specifics.

## 14. Mindmap

- **Purpose:** Per-week mindmap with stems + branches. Targeted structure: 2 affirmative + 2 negative + 2 question stems, with `type` field.
- **Main folders:** `src/data/weeks/week_NN/mindmap.js`, `src/data/weeks_easy/week_NN/mindmap.js`, `src/data/missions/`
- **Dependencies:** TTS (audio for branches), R2
- **Related:** AI Tutor (uses missions), Reading (chunk alignment)
- **Status:** Active. Restructure pending per CLAUDE.md (May 23, 2026).
- **Unknowns:** Final stem-type enum, branch-to-collocation matching rule.

## 15. Self Regulation

- **Purpose:** Student self-regulation / reflection content.
- **Main folders:** `src/modules/self_regulation/`
- **Dependencies:** None obvious
- **Related:** None obvious
- **Status:** Scaffolded.
- **Unknowns:** What this station actually contains; no per-week data file observed in the sample.

## 16. Video

- **Purpose:** Video browsing / playback content.
- **Main folders:** `src/modules/video/`
- **Dependencies:** YouTube, transcripts
- **Related:** Daily Watch
- **Status:** Scaffolded.
- **Unknowns:** Relationship to Daily Watch.

## 17. Ask AI (legacy)

- **Purpose:** Historical "Ask AI" station. Most logic has migrated to AI Tutor (`week_NN_real.js`). Some references may still exist.
- **Main folders:** `src/modules/ask_ai/`, `src/data/weeks/week_NN/ask_ai.js`
- **Dependencies:** LLM providers
- **Related:** AI Tutor
- **Status:** **Legacy / being phased out.** New work goes to AI Tutor.
- **Unknowns:** What still depends on it.

## 18. Review

- **Purpose:** Cross-week review activity.
- **Main folders:** `src/modules/review/`
- **Dependencies:** Reading, Vocab
- **Related:** None obvious
- **Status:** Scaffolded.
- **Unknowns:** What weeks it pulls from.

## 19. Production module (in-app)

- **Purpose:** In-app "production" sub-app — likely the content-authoring surface that mirrors the toolkit.
- **Main folders:** `src/modules/production/`
- **Dependencies:** None obvious from structure
- **Related:** production_kit (the file-system toolkit)
- **Status:** Scaffolded.
- **Unknowns:** What it actually does.

---

## Cross-cutting services

## 20. LLM provider subsystem

- **Purpose:** The cascade of LLM providers. Cerebras → Groq → Together → Gemini, first-healthy wins.
- **Main folders:** `src/services/aiProviders.js`, `src/services/aiProxy.js`, `src/services/geminiService.js`, `src/services/geminiCache.js`, `src/ai/responseGenerator.js`
- **Dependencies:** External LLM APIs
- **Related:** AI Tutor
- **Status:** Active.
- **Unknowns:** Trigger conditions for cascade fallback, exact error budget per provider.

## 21. TTS subsystem

- **Purpose:** Text-to-speech. Browser Speech Synthesis API for runtime dict lookups; Deepgram (and other engines via `tools/generate_audio_*.py`) for batch generation. Text-hash cache prevents stale audio.
- **Main folders:** `src/services/tts.js`, `ttsCache.js`, `ttsPreload.js`, `ttsWeekPrefetch.js`, `geminiTTS.js`, `voiceService.js`, `src/stores/useTTSStore.js`, `tools/generate_audio_deepgram.py`, `tools/generate_audio.py`, `tools/generate_audio_google_key.py`, `tools/generate_kokoro*.py`, `tools/generate_piper_local.py`
- **Dependencies:** R2 (storage), Cloudflare wrangler (upload), browser Web Speech API
- **Related:** All stations that play audio (Shadowing, Dictation, Reading, AI Tutor, Mindmap)
- **Status:** Active.
- **Unknowns:** Which engine is canonical in production; the hash cache eviction policy.

## 22. R2 storage

- **Purpose:** Cloudflare R2 object storage for audio, images, and AI Tutor cache.
- **Main folders:** (no source) — configuration in `tools/r2-cors-config.json`, `tools/r2-cors-worker.js`; upload scripts `tools/upload_*_r2.sh`
- **Dependencies:** Cloudflare R2, wrangler
- **Related:** TTS, Daily Watch, AI Tutor (corrections cache), Image pipeline
- **Status:** Active.
- **Unknowns:** Bucket structure, retention policy, CDN fronting.

## 23. Dictionary subsystem

- **Purpose:** The single source of truth for word + chunk lookups. ~870 KB JSON at last count.
- **Main folders:** `public/dictionary.json` (the served file), `src/data/dictionary.json` (source), `src/data/cmudict.json` (pronunciation source)
- **Dependencies:** Dictionary build script (`tools/build_dictionary.mjs`), collocation datasets in `production_kit/data/`
- **Related:** Reading, Vocab, all stations with chunk rendering
- **Status:** Active.
- **Unknowns:** Build cadence, the role of `extended_collocations.json` vs `oxford_collocations.json` vs `a1b1_functional_chunks.json`.

## 24. Authentication and user state

- **Purpose:** User auth, session, role. Supabase-backed.
- **Main folders:** `src/services/supabase.js`, `src/services/SubscriptionManager.js`, `src/stores/useUserStore.js`
- **Dependencies:** Supabase
- **Related:** Progress tracking, Subscription
- **Status:** Active.
- **Unknowns:** Role hierarchy (student / parent / teacher / super-admin), local-only fallbacks.

## 25. Progress and state persistence

- **Purpose:** Zustand stores, persistence, migration. Persisted stores must declare `version` + `partialize` + `merge` + `migrate`.
- **Main folders:** `src/stores/`, `src/hooks/`
- **Dependencies:** Zustand `persist` middleware, browser storage
- **Related:** All stations (consume progress), AI Tutor (per-mission state)
- **Status:** Active. Several past incidents (lost progress on deploy) led to the current 4-field contract.
- **Unknowns:** Which stores currently persist, what their version numbers are.

## 26. Subscription management

- **Purpose:** Paid plan state and gating.
- **Main folders:** `src/services/SubscriptionManager.js`, `src/config/dynamicRoleplays.js`
- **Dependencies:** Supabase
- **Related:** Auth, parent dashboard
- **Status:** Active.
- **Unknowns:** Plan tiers, gating rules.

## 27. Pages and routing

- **Purpose:** Page-level compositions. `CollectionBoard`, `GameHub`, `ParentDashboard`, `WordTreasury`.
- **Main folders:** `src/pages/`, `src/App.jsx`, `src/main.jsx`
- **Dependencies:** react-router-dom v7, all modules
- **Related:** Everything
- **Status:** Active.
- **Unknowns:** Full route map, which pages are admin-only.

## 28. Image pipeline

- **Purpose:** Generation and upload of story images and cover images.
- **Main folders:** `tools/generate_images*.js`, `tools/generate_story_images.cjs`, `tools/generate_covers_dalle3.py`, `tools/upload_images_to_r2.sh`
- **Dependencies:** OpenAI / DALL-E / nano banana, R2
- **Related:** Writing station, Reading (cover images)
- **Status:** Active.
- **Unknowns:** Which model is canonical, the prompt-template versioning.

---

## Tooling and pipelines

## 29. Production pipeline (lesson-plan builder)

- **Purpose:** Single-entry build for a week's lesson plan.
- **Main folders:** `production_kit/pipeline/build_week_lesson_plan.py`
- **Dependencies:** Syllabus V5, Blueprint V5
- **Related:** Production workflow
- **Status:** Active.
- **Unknowns:** Exact input/output contract.

## 30. Validation system

- **Purpose:** Multi-layer validation: preflight, bug-prevention (B-checks), code-quality (C-checks), content-lint, dict-lint, sgmath-types, bar-models, video-thumbnails.
- **Main folders:** `production_kit/tools/preflight_check.sh`, `bug_prevention_check.sh`, `code_quality_gate.sh`, `validate_sgmath_types.mjs`, `tools/validate_barmodels.js`, `tools/validate_video_thumbnails.js`, `tools/content_lint.mjs`, `tools/dict_lint.mjs`
- **Dependencies:** None external
- **Related:** Every week produced
- **Status:** **Active. Mandatory before any week ships.**
- **Unknowns:** Exact B-check / C-check list (48 C-checks per CLAUDE.md).

## 31. Audit pipeline (chunk / collocation)

- **Purpose:** 4-layer audit pipeline for chunk and collocation quality.
- **Main folders:** `production_kit/tools/layer3_sources.py`, `layer4_audit_explore.py`, `layer4_batch_audit.py`, `layer4_gemini_judge.py`, `layer4_llm_judge.py`, `validate_chunks.py`, `audit_false_chunks.py`, `fix_false_chunks.py`, `learn_whitelist.py`, `production_kit/data/`
- **Dependencies:** Gemini / other LLM (for layer 4), collocation datasets
- **Related:** Reading, Vocab
- **Status:** Active.
- **Unknowns:** Layer 1 and 2 locations (the named scripts start at layer 3).

## 32. Production workflow

- **Purpose:** The 11-step week production process. The on-disk reference for what to do, in order.
- **Main folders:** `.claude/skills/week-builder/SKILL.md` (canonical W36+), `production_kit/workflow/` (deprecated — historical reference only)
- **Dependencies:** None
- **Related:** Validation, Production pipeline
- **Status:** Active.
- **Resolved:** `AGENT_SELF_CHECK_WORKFLOW.md` and `STANDARD_WEEK_CREATION_WORKFLOW.md` are NOT in sync. Canonical is `.claude/skills/week-builder/SKILL.md` (W36, July 2026).

## 33. Never-rules repository

- **Purpose:** The single source of truth for "never" rules, each with `Why:` and `Source:`.
- **Main folders:** `production_kit/never_rules/PRODUCTION_NEVER_RULES.md`
- **Dependencies:** None
- **Related:** `ARCHITECTURE.md` §5 in this folder (architecture summary); `CLAUDE.md` (operational summary)
- **Status:** Active. 50+ rules per CLAUDE.md.
- **Unknowns:** Exact rule count and last update date.

## 34. Reference docs

- **Purpose:** The spec documents. Syllabus V5, Blueprint V5, STEM integration, sub-tab roadmap, speaking drill spec, sub-tab launch guides.
- **Main folders:** `production_kit/reference/`
- **Dependencies:** None
- **Related:** Production workflow, Validation, Curriculum
- **Status:** Active.
- **Unknowns:** Whether the W35 / W40 sub-tab launch guides reflect what shipped.

---

## Agent infrastructure

## 35. AgentOS

- **Purpose:** The cross-agent operating system. Memory, tasks, knowledge, decisions, architecture, prompts, templates, scripts, bootstrap.
- **Main folders:** `.ai/`
- **Dependencies:** None
- **Related:** `.claude/`, `.devin/`
- **Status:** Active (this implementation).
- **Unknowns:** How `.ai/` integrates with the older `~/.claude/projects/.../memory/` layer.

## 36. Claude Code integration

- **Purpose:** Local Claude Code config — permissions, hooks, settings.
- **Main folders:** `.claude/settings.json`, `.claude/settings.local.json`, `.claude/hooks/hooks.json`, `.claude/hooks/sessions/`
- **Dependencies:** None
- **Related:** AgentOS
- **Status:** Active.
- **Unknowns:** What the `hooks/sessions/` directory contains.

## 37. Devin integration

- **Purpose:** Devin (alternative agent) workflow entry point.
- **Main folders:** `.devin/workflows/start.md`
- **Dependencies:** None
- **Related:** AgentOS
- **Status:** Scaffolded (single empty `start.md`).
- **Unknowns:** What other workflows are expected to live here.

---

## Status legend

- **Active** — under current development, part of the production path.
- **Scaffolded** — folder exists, purpose inferred, not yet a complete subsystem.
- **Legacy** — historically used, being phased out, new work goes elsewhere.
- **Archived** — read-only, preserved for history.

## See also

- [INDEX.md](INDEX.md) — folder entry point
- [REPOSITORY_MAP.md](REPOSITORY_MAP.md) — top-level inventory
- [ARCHITECTURE.md](ARCHITECTURE.md) — project overview, layers, patterns, rules, and style (all consolidated)
