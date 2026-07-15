# BLUEPRINT_VS_IMPLEMENTATION.md — Blueprint V5 vs Current Implementation

> **Date:** 2026-07-14
> **Blueprint Source:** `production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md`
> **Implementation Source:** W35 + W36 source code, runtime modules, validators

---

## 0. Summary of Differences

| # | Area | Blueprint (V5) | Implementation | Recommendation |
|---|------|----------------|----------------|----------------|
| 1 | Dual-tab Read | Single tab W≤35, dual W35+ | Dual-tab shipped in W36 (W35 single) | Runtime source of truth: W36 |
| 2 | Triple-tab Logic Lab | Single tab ≤34, triple W35+ | Triple-tab shipped W35+ | Runtime source of truth: W36 |
| 3 | Debate station | W40+ planned | Not implemented yet | Future work — keep in Blueprint |
| 4 | Shadowing | Read-after-me only | Full karaoke + IPA + YouTube ASR + corrections API | Implementation extends massively |
| 5 | TTS architecture | Implied pre-baked audio | On-demand Deepgram Worker + R2 | Implementation wins — document |
| 6 | W36 AI Tutor | Full V28 (spark + missions + nova) | W36 spark only (NO missions, NO nova) | Document W36 "spark-only" mode |
| 7 | Singapore Math CPA | W17-W34 differentiated | W35+ pictorial both modes | Implementation wins |
| 8 | Word Power count | Not explicitly week-split | W16-27:6, W28+:8 hardcoded | Implementation wins |
| 9 | content_en verbatim | Implied "same sentences" | CHECK 42 character-for-character enforcement | Implementation extends |
| 10 | chunk-first bolds | ≥10/≥13 chunks, 0 single-word | Same + 20e-h unnatural pattern checks | Implementation extends |
| 11 | write.js theme | Weekly theme aligned | W35 writing is off-theme (personal_growth ≠ environmental) | Bug — needs fix |
| 12 | index.js export | CommonJS for week_NN_real.js | Mixed: ES + CommonJS + named exports | Standardize exports |

---

## 1. Detailed Blueprint vs Implementation Differences

### 1.1 Read & Explore Station

| Feature | Blueprint V5 | W36 Implementation | Delta |
|---------|-------------|-------------------|-------|
| Tab structure | Dual-tab from W35+ | W35 single, W36 dual | Implementation delayed by 1 week |
| Tab fields | `read_stem{} + read_social{}` | W36 has both + legacy `content_en`/`sentences[]` at top level | Implementation adds backward-compat fields |
| Questions per tab | "10 bold words per story" (no question count) | 4 questions per tab (8 total for W36) | Implementation exceeds Blueprint |
| Word count scaffolding | Block-based (A-J, 80-230 words) | No enforcement in validators | Blueprint more prescriptive |
| Social Stories word count | "ADV 250-350 words, Easy 150-200 words" | W36 ADV read_social ≈ 180 words (shorter than spec) | Implementation under-shoots |
| `key_vocabulary` array | Not in Blueprint spec for read.js | W36 read_stem has `key_vocabulary[]` | Implementation extends |
| `subtitle_en` | Not in spec | W36 has `subtitle_en` | Implementation extends |
| `audio_url` per tab | Not specified | W36 has separate audio per tab | Implementation extends |

### 1.2 Logic Lab (Triple Tab)

| Feature | Blueprint V5 | W36 Implementation | Delta |
|---------|-------------|-------------------|-------|
| Total questions/week | "15 max (~25 min)" | W36 ADV: 18 (8+5+5), Easy: 14 (5+5+4) | Implementation exceeds limit |
| Logic & Science types | `logic_reasoning, science_reasoning, science_application, science_classification` | W36 uses `logic` or `science` (only 2 types) | Implementation simplified |
| Logic & Science `explanation` field | Yes | W36 uses `explanation_en` | Different field name |
| Social Quiz variety | Geography 50%, History 30%, Culture/Economics 20% | W36 has 3 geography + 2 history (60%/40%) | Implementation close |
| Social Quiz `vocab[]` | Present in Blueprint | W36 has `vocab[]` | Aligned |
| Social Quiz `map_visual` | Optional in Blueprint | W36 has none (no map images) | Aligned — optional |
| Singapore Math `type` | Blueprint lists 5 types | W36 uses same 5 types | Aligned |
| Singapore Math `topic` field | Present in Blueprint spec | W36 missing `topic` | Gap — recommend adding |

### 1.3 Grammar Station

| Feature | Blueprint V5 | W36 Implementation | Delta |
|---------|-------------|-------------------|-------|
| Exercise count | "20 exercises" | Exactly 20 enforced by CHECK 20b | Aligned |
| ADV field name | `question_en` | W36 ADV uses `question_en` | Aligned |
| Easy field name | Not specified | Easy uses `question_en` in W36 | Aligned (W33 audit fixed this) |
| `answer:` vs `correct:` | Use `answer:` | Enforced by CHECK B7 | Aligned |
| Exercise types | `fill_blank, unscramble, multiple_choice, sentence_correct, rewrite_modal, sentence_match` | W36 ADV has all 6 types | Aligned |

### 1.4 Vocab Station

| Feature | Blueprint V5 | W36 Implementation | Delta |
|---------|-------------|-------------------|-------|
| Word count W28+ | Not explicitly stated | W36 has 18 words (enforced by CHECK 35) | Implementation more precise |
| Schema fields | `word, pronunciation, definition_vi, definition_en, example, collocation, image_url` | W36 has all + `audio_word` | Implementation extends |
| `cefr_level` | Not in spec | W36 missing (W35 ADV had it) | Inconsistency between weeks |
| `part_of_speech` | Not in spec | W35 ADV had it, W36 missing | Inconsistency |

### 1.5 Word Power Station

| Feature | Blueprint V5 | W36 Implementation | Delta |
|---------|-------------|-------------------|-------|
| Item count | "6 or 8" per week range | Enforced: 6 (W16-27), 8 (W28+) | Aligned |
| All items must be multi-word | Not explicit | CHECK 20 rejects single words | Implementation stricter |
| `cefr_level` | Not in spec | W36 has `cefr_level` | Implementation extends |
| 5 audio types | Not specified | W36 has 5 audio slots per word | Implementation extends |

### 1.6 Shadowing Station

| Feature | Blueprint V5 | W36 Implementation | Delta |
|---------|-------------|-------------------|-------|
| Content source | "Sentences from read.js" | Verbatim read.js content_en (CHECK 42) | Aligned |
| Sentence count W28+ | "≥8 sentences" | B22: ADV 10-12, Easy 8-10 | Implementation more precise |
| `videoId` field | Not in Blueprint | W36 has `videoId: 'Rlmms56uisw'` | Implementation extends |
| `shadowing_ipa.js` | Not in Blueprint | W36 has IPA file | Implementation extends massively |
| `vi` field per sentence | Not specified | W36 has Vietnamese translations | Implementation extends |
| IPA generation | Not specified | Manual + CMU dict auto fallback | Implementation extends |
| Karaoke highlighting | Not specified | FAST_RATE=0.4s/word in useWordHighlight.js | Implementation extends |
| YouTube transcript alignment | Not specified | transcriptAligner.js with wordOverlap algorithm | Implementation extends |
| Corrections API | Not specified | /api/corrections/<videoId> endpoint exists | Implementation extends |

### 1.7 Writing Station

| Feature | Blueprint V5 | W36 Implementation | Delta |
|---------|-------------|-------------------|-------|
| ADV min_words | "45 words" | CHECK 19.5 enforces ≥45 words | Aligned |
| Easy min_words | "30 words" | Easy has 30 words | Aligned |
| ADV sentence frames | "8 frames" | CHECK 19 enforces ≥6 sentences | Aligned |
| `model_sentence` length | "≥200 chars" | CHECK 19 enforces ≥200 chars | Aligned |
| `story_prompts.picture_mode` | Not in Blueprint | W35 W36 have picture_mode | Implementation extends |
| `image_prompt` field | Not in Blueprint | W35 has detailed image_prompt string | Implementation extends |
| `rubric_tier` field | Not in Blueprint | W35 has `rubric_tier: 1` | Implementation extends (undocumented) |

### 1.8 AI Tutor

| Feature | Blueprint V5 | W36 Implementation | Delta |
|---------|-------------|-------------------|-------|
| Schema version | V28 format | W35 full V28, W36 spark-only V28 | W36 simplified |
| `story_missions[]` | Required in V28 | W35 has 3 missions, W36 **has none** | Major gap — W36 missing |
| `nova_instructions` | Required in V28 | W35 has full, W36 **has none** | Major gap |
| `v28_format_notes` | Required in V28 | W35 has, W36 **missing** | Gap |
| `spark_talk` | Required | Both W35 and W36 have | Aligned |
| `freetalk_knowledge` | Required | W35 has, W36 uses `knowledge_base` | Field name inconsistency |
| `chunk_focus[]` | "3-5 key collocations" | W35 has 13, W36 has 12 (exceeds spec) | Implementation exceeds |
| CHECK 16 | Checks for V28 fields | Would **FAIL on W36** | CHECK 16 needs W36 exception |
| Export format | ES default | CommonJS `module.exports = ...` | Implementation inconsistent with rest |
| Spark Talk frames | Not explicitly specified | W36 has 8 frames (hardcoded minimum) | Implementation defines count |

### 1.9 Dictation Station

| Feature | Blueprint V5 | W36 Implementation | Delta |
|---------|-------------|-------------------|-------|
| Content source | "From read.js" | Verbatim content_en copy (CHECK 42) | Aligned |
| Sentence count W28+ | "10-12 ADV / 8-10 Easy" | B22 enforces | Aligned |
| `meaning` field | Not in spec | W36 has placeholder "Vietnamese meaning here" | Bug — not translated |
| `content_en` at top level | Not in spec | W36 has this (CHECK 42 validates it) | Implementation extends |

### 1.10 Daily Watch

| Feature | Blueprint V5 | W36 Implementation | Delta |
|---------|-------------|-------------------|-------|
| Video count | "5 videos" | W36 has 5 videos + bonus_games | Aligned |
| Channel whitelist | Criteria listed in Blueprint | Hardcoded 60-channel list in update_videos.js | Implementation more specific |
| `sim_duration` field | Not in Blueprint | W36 has `sim_duration: N` (seconds) | Implementation extends |
| `bonus_games` field | Not in Blueprint | W36 has `bonus_games: [{title, url, description}]` | Implementation extends |
| Easy mode videos | Not specified | W36 Easy copies ADV videos | Implementation choice |

### 1.11 Ask AI

| Feature | Blueprint V5 | W36 Implementation | Delta |
|---------|-------------|-------------------|-------|
| Word bank size W28+ | "4 options" | Enforced by CHECK 19.5 | Aligned |
| `question_frame` starts with ___ | "MUST start with ___" | CHECK 19.5c enforces | Aligned |
| `correctWord` UPPERCASE | Not specified | CHECK B24 enforces | Implementation stricter |
| `nova_says_vi` | Not in spec | W36 has this | Implementation extends |

### 1.12 Mindmap

| Feature | Blueprint V5 | W36 Implementation | Delta |
|---------|-------------|-------------------|-------|
| Schema format | Blueprint doesn't detail | W36 uses `centerStems[]` + `branchLabels{}` | Implementation-defined |
| Stem count | Not specified | 6 stems (2 affirmative, 2 negative, 2 question) | Implementation-defined |
| Branch count | Not specified | 6 branches per stem | Implementation-defined |
| `type` field on stems | Not in Blueprint | W36 has `type: affirmative/negative/question` | Implementation extends |
| Audio per branch | Not specified | Each branch has audio | Implementation extends |

### 1.13 Games

| Feature | Blueprint V5 | W36 Implementation | Delta |
|---------|-------------|-------------------|-------|
| Export format | Not specified | W36 uses **named export** (`export const week_36GamesAdvanced`) | Inconsistent with other files |
| Game types | "GameHubs" mentioned | W36 has `categories`, `word_smash`, `sentence_scramble` | Implementation-defined |
| `image_url` | Not specified | W36 has `image_url: null` | Optional |

### 1.14 Word Match

| Feature | Blueprint V5 | W36 Implementation | Delta |
|---------|-------------|-------------------|-------|
| Pair format | Not specified | W36 uses objects `{word, definition}` | Implementation-defined |
| CHECK 5 | Validates pairs are objects, not numbers | Enforced | Bug fix applied |

### 1.15 index.js

| Feature | Blueprint V5 | W36 Implementation | Delta |
|---------|-------------|-------------------|-------|
| Station count | Not specified | 14 station keys required (CHECK 13) | Implementation-defined |
| `voiceConfig` keys | Not specified | CHECK 12 requires 6 keys (narration, vocabulary, dictation, shadowing, questions, mindmap) | Implementation-defined |
| `logic_lab` station key | Not specified | W36 has it | Implementation extends |
| `social_quiz` station key | Not specified | W36 has it | Implementation extends |
| Dual-tab read structure | Not specified | W36: `read_explore: {read_stem, read_social}` | Implementation extends |

---

## 2. Blueprint Features NOT in Implementation

| # | Blueprint Feature | W36 Status | Impact | Recommendation |
|---|-------------------|-----------|--------|----------------|
| A | W40 Debate station | Not implemented | Forward-looking — not needed now | Keep in Blueprint for W40 |
| B | W40-54 grammar progression (Comparative) | Not needed until W40 | None | Keep |
| C | W67 OREO debate | Not needed until W67 | None | Keep |
| D | W121 Formal debate | Not needed until W121 | None | Keep |
| E | Social Quiz variety checklist (50/30/20%) | W36 approximates | Minor gap | Recommend adding to validators |
| F | Word count scaffolding blocks (A-J) | Not enforced | Minor | Recommend adding to content_lint |
| G | `topic` field in Singapore Math | Missing | Minor | Add to schema |
| H | EPIC/DOCX generation from week data | Separate pipeline exists | None | Keep separate |
| I | `map_visual` field in Social Quiz | Missing but optional | None | Keep optional |

---

## 3. Implementation Features NOT in Blueprint

| # | Feature | File | Impact | Blueprint Update Needed |
|---|---------|------|--------|------------------------|
| 1 | IPA per word + `shadowing_ipa.js` | `ipaUtils.js` | Major extension | Add to Blueprint §V |
| 2 | Karaoke word highlighting (FAST_RATE=0.4) | `useWordHighlight.js` | Major extension | Add to Blueprint §V |
| 3 | YouTube transcript alignment | `transcriptAligner.js` | Major extension | Add to Blueprint §V |
| 4 | Corrections API (per-sentence edits) | `POST /api/corrections/` | Major extension | Add to Blueprint §V |
| 5 | On-demand TTS (Deepgram Worker + R2) | `voiceService.js`, worker | Major extension | Add to Blueprint §VII |
| 6 | CMU dict IPA fallback (3.9MB) | `ipaUtils.js` | Minor extension | Note in Blueprint |
| 7 | `sim_duration` on Daily Watch videos | `daily_watch.js` | Minor | Add to Blueprint §IV |
| 8 | `bonus_games` on Daily Watch | `daily_watch.js` | Minor | Add to Blueprint §IV |
| 9 | CHECK 20e-h unnatural chunk patterns | `code_quality_gate.sh` | Quality improvement | Add to Blueprint §VII.b |
| 10 | CHECK 42 dictation/shadowing verbatim check | `code_quality_gate.sh` | Quality improvement | Add to Blueprint §V |
| 11 | `cefr_level` in Word Power | `word_power.js` | Minor | Add to Blueprint §VI |
| 12 | 5 audio types per Word Power item | `word_power.js` | Minor | Add to Blueprint §VI |
| 13 | `rubric_tier` in writing.js | `writing.js` | Minor | Add to Blueprint §VI |
| 14 | `story_prompts.picture_mode.image_prompt` | `writing.js` | Minor | Add to Blueprint §VI |
| 15 | `type` field on mindmap stems | `mindmap.js` | Minor | Add to Blueprint §VII |
| 16 | `key_vocabulary[]` on read tabs | `read.js` | Minor | Add to Blueprint §III |
| 17 | `subtitle_en` on read tabs | `read.js` | Minor | Add to Blueprint §III |

---

## 4. Critical Bugs/Issues Found During Audit

| # | Issue | Where Found | Severity | Recommendation |
|---|-------|------------|---------|----------------|
| 1 | W35 writing.js theme is "personal_growth" but W35 topic is Environmental Issues | W35 ADV `writing.js` | HIGH | Re-author W35 writing.js for environmental theme |
| 2 | W36 dictation.js has placeholder Vietnamese `meaning: "Vietnamese meaning here"` for all 10 sentences | W36 ADV `dictation.js` | MEDIUM | Translate all 10 sentences |
| 3 | W36 shadowing_ipa.js only has IPA for 6 of 12 sentences (7-12 missing) | W36 ADV `shadowing_ipa.js` | LOW | Runtime falls back to CMU dict; complete manually for best UX |
| 4 | W36 AI Tutor has no `story_missions[]` — CHECK 16 would fail | W36 `week_36_real.js` | LOW | Acceptable for spark-only mode; document exception |
| 5 | W36 AI Tutor exports via CommonJS, not ES module | W36 `week_36_real.js` | LOW | Runtime handles both; migration recommended |
| 6 | W36 `week_36_real.js` location at root `src/data/weeks/` — NEVER-RULES says subfolder | W36 root path | MEDIUM | Apply NEVER-RULES B6 for W37+ |
| 7 | CHECK 12 requires 6 voiceConfig keys but W36 has 7 (includes `logic_lab`) | `code_quality_gate.sh` CHECK 12 | LOW | CHECK passes since 6/6 exist; recommend adding `logic_lab` |
| 8 | CHECK 39/40/41 are duplicated in code_quality_gate.sh (appear twice) | `code_quality_gate.sh` | LOW | Deduplicate |
| 9 | `social_quiz.js` schema has `question_vn` but Blueprints doesn't document this field | W36 `social_quiz.js` | LOW | Add to spec |
| 10 | W36 `explore.js` has `writing_prompt_en/vi` and `question{}` fields not in Blueprint | W36 `explore.js` | LOW | Extend Blueprint §III |

---

## 5. Blueprint vs Implementation: When Implementation Should Win

| Scenario | Rule |
|----------|------|
| Implementation field exists but Blueprint doesn't mention it | **Implementation wins** — Blueprint is lagging |
| Blueprint specifies something but implementation has a newer approach | **Implementation wins** if validators enforce it (e.g., on-demand TTS) |
| Blueprint and implementation conflict on schema | **Check validators** — validators are the runtime truth |
| Blueprint specifies a future feature (W40+) not yet implemented | **Blueprint wins** — keep the spec for when the feature ships |

---

## 6. Risks

| Risk | Impact | Mitigation |
|------|--------|-----------|
| W36 AI Tutor missing missions/nova means CHECK 16 would fail for new weeks that copy W36 | HIGH | Use W35 template for weeks needing full V28 |
| Placeholder Vietnamese in W36 dictation.js means students see wrong translation | MEDIUM | Translate before deployment |
| `week_NN_real.js` CommonJS export will fail with tree-shaking | LOW | Runtime already handles it; migrate to ES |
| CHECK 39/40/41 duplication inflates error count | LOW | Deduplicate |
| word_count scaffolding blocks (A-J) not enforced | LOW | Recommend adding to content_lint |
| W35 writing.js theme mismatch (off-topic content) | HIGH | Re-author W35 writing.js |

---

*Last updated: 2026-07-14*
*Author: Audit Agent*
