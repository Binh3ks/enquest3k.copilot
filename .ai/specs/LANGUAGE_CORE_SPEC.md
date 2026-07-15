# LANGUAGE_CORE_SPEC.md — Canonical Specification for Language Core Stations

> **Version:** 1.0
> **Date:** 2026-07-14
> **Status:** Draft v1 — awaiting PO approval
> **Source of truth:** CURRENT IMPLEMENTATION (W35 + W36, runtime modules in `src/modules/`)
> **Confirmed by:**
> - Blueprint V5 (`production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md`)
> - `week-builder/SKILL.md` (canonical 11-step workflow)
> - All 7 production validators (preflight, bug_prevention, code_quality_gate, sgmath_types, barmodels, thumbnails, content_lint, dict_lint)
> - All Language Core runtime modules + 6 Shadowing hooks + 8 Shadowing UI components
> - Production rules (`production_kit/never_rules/PRODUCTION_NEVER_RULES.md`)
> - Reverse-engineering audit (`.ai/research/IMPLEMENTATION_AUDIT.md`)
> - Blueprint diff (`.ai/research/BLUEPRINT_VS_IMPLEMENTATION.md`)

> **Success criteria:** A completely new runtime that reads this document should be able to:
> - understand every Language Core station
> - reproduce W35
> - reproduce W36
> - understand why W36 introduced new features
> - adapt automatically when Blueprint evolves
> without additional prompting.

> **Scope:** Only these 7 stations:
> 1. **Vocabulary** (vocab.js + VocabManager.jsx)
> 2. **Word Match** (word_match.js + WordMatch.jsx)
> 3. **Grammar** (grammar.js + GrammarEngine.jsx)
> 4. **Dictation** (dictation.js + DictationEngine.jsx)
> 5. **Shadowing** (shadowing.js + shadowing_ipa.js + Shadowing.jsx + 6 hooks + 8 UI components)
> 6. **Word Power** (word_power.js + WordPower.jsx)
> 7. **Writing & Speak** (writing.js + WriteAndSpeak.jsx + StoryWriting.jsx + TellYourStory.jsx)

---

## §0. Conventions Used in This Document

For every station we document the same structure:

- **Purpose** — what the station teaches
- **Learning Objectives** — measurable student outcomes
- **User Workflow** — student interaction sequence
- **Teacher Workflow** — content-author + validator sequence
- **UI** — what's on screen
- **Tabs** — sub-navigation if any
- **Schema** — every data field, every property, every hidden convention
- **Validation Rules** — every check that must pass
- **Media Requirements** — image / audio / video classification
- **Cross-Station Dependencies** — what other stations read this station's data
- **Generation Workflow** — how the file is created during week production
- **Known Implementation Differences** — gaps where current code drifts from Blueprint
- **Blueprint Differences** — explicit Blueprint↔Implementation log
- **Current Production Behaviour** — exactly what W35 + W36 do
- **Common Mistakes** — what to avoid
- **Future Extension Points** — how to evolve when Blueprint adds features
- **Approval Checklist** — what PO must confirm before ship

Every "Blueprint vs Implementation" disagreement documents all four:
**Blueprint / Implementation / Reason / Recommendation**

---

## §1. VOCABULARY (`vocab.js` + `VocabManager.jsx`)

### 1.1 Purpose
Acquire 13–18 vocabulary words per week through:
1. **Flashcard exposure** — image, word, pronunciation, definition, example, collocation
2. **Active recall drill** — copy, collocation fill, sentence construction
3. **Mastery tracking** — each card has 5 sub-drills that must all pass to mark the card "completed"

### 1.2 Learning Objectives
- Recognize the word in audio + text + image forms
- Produce the word from memory (3 copy drills)
- Apply the word in a natural collocation
- Use the word in a grammatically correct sentence

### 1.3 User Workflow (per card)
1. **View front** — image, word, pronunciation, audio play button
2. **Tap card** to flip → **back shows**:
   - definition (en + vi)
   - example sentence
   - "Also Say" collocation pills (each with its own audio play button)
3. **Drill 1** — Copy the word 3 times (real-time keystroke check; `value.trim().toLowerCase() === word.word.toLowerCase()`)
4. **Drill 2** — Type one of the accepted collocations (validated by `analyzeAnswer` in `'grammar'` mode against the `collocation` array)
5. **Drill 3** — Make a sentence. Four-step validation chain:
   - Must contain the word (case-insensitive) → otherwise wrong
   - Must start with capital letter → warning if not
   - Must end with `.` / `?` / `!` → warning if not
   - Must be ≥5 words → warning if shorter
6. All 5 sub-drills pass → card auto-completes, grayscale applied
7. When all cards complete → auto-switches to `VocabDigest` summary view

### 1.4 Teacher Workflow
1. Read Syllabus for the week's vocab list (typically 13–18 words)
2. Read `read.js` chunks to find multi-word collocations to embed
3. Edit `vocab.js` with `word`, `pronunciation` (IPA), `definition_vi`, `definition_en`, `example`, `collocation`, `image_url`, `audio_word`
4. Run validators → CHECK 32 (image on disk), CHECK 35 (Easy = ADV count), CHECK 44 (audio field names), CHECK 45 (collocation quality)

### 1.5 UI
- **Cards view** (default) — vertical list of flashcards, each flip-card with 3D CSS transform (`perspective: 1000px`, `rotateY(180deg)`)
- **Digest view** (`<VocabDigest />`) — summary table shown when all cards completed or via tab toggle
- **Reset button** — clears all progress
- **"Visited" badge** — shown for cards with `savedCardData` but not yet completed

### 1.6 Tabs
None.

### 1.7 Schema

#### Data file (`src/data/weeks/week_NN/vocab.js`)
```js
export default {
  vocab: [
    {
      id: 1,                                            // integer, sequential 1..18
      word: 'submarine',                                 // string
      pronunciation: '/ˈsʌbməriːn/',                     // IPA string (US or UK)
      definition_vi: 'tau ngam',                         // Vietnamese meaning (mandatory)
      definition_en: 'a special ship...',                // English definition (mandatory for W36+)
      example: 'The submarine dove deep into the ocean.',// string (priority field)
      example_vi: 'Tau ngam lan sau vao dai duong.',     // optional Vietnamese
      collocation: 'submarine trip / underwater',        // string OR array of strings
      image_url: '/images/week36/vocab_submarine.jpg',   // /images path (R2 in production)
      audio_word: '/audio/week36/vocab_submarine.mp3',   // on-demand
      audio_example: '...mp3',                           // optional
      audio_collocation: '...mp3',                       // optional; OR audio_collocation_0/1/2/...
      audio_definition: '...mp3'                         // optional
    },
    // ... 18 items for W28+ (13 for W16–W27, ≥10 for W1–W15)
  ]
}
```

**Field rules:**
- `collocation` can be a `string` ("a / b / c") or `string[]` — runtime parses both
- `audio_collocation_0/1/2/...` (numbered variants) is the W35+ convention; CHECK 44 enforces
- `audio_def` and `audio_coll` are LEGACY and rejected (CHECK 44)
- `audio_url` is LEGACY (used only by WordMatch runtime fallback `item.audio_word || item.audio_url`)
- `cefr_level` (e.g. `'A2'`) is NOT in W36 schema but exists in some W35 files — optional

#### Runtime consumption pattern
- VocabManager reads `data.vocab[]`
- Also exposed via `weekData.global_vocab` (index.js sets `global_vocab: vocab.vocab`)
- `weekData.stations.new_words` = vocab (used by WordMatch for pair generation)

### 1.8 Validation Rules
| Rule | Validator | Source |
|---|---|---|
| `id` field present, integer | CHECK 19.5 (implicit) | runtime |
| `definition_vi` present | CHECK 19.5 (implicit) | runtime |
| `image_url` file exists on disk | **CHECK 32** | `code_quality_gate.sh` |
| ADV count = Easy count (W16+) | **CHECK 35** | `code_quality_gate.sh` |
| Audio field names correct (no `audio_def`, `audio_coll`, `audio_url`) | **CHECK 44** | `code_quality_gate.sh` |
| Collocation quality (no body part + bare 'hurt', no `grandmother + write`) | **CHECK 45** | `code_quality_gate.sh` |
| content_vi has no `**` markers | CHECK 20i | `code_quality_gate.sh` |
| ≥50% of vocab words appear in `read.js` content_en | **CHECK 36** | `code_quality_gate.sh` |
| `vocab.js` count matches `image_prompts.txt` vocab count | **CHECK 34** | `code_quality_gate.sh` |

### 1.9 Media Requirements

| Asset | Source | Storage | Trigger |
|---|---|---|---|
| `image_url` | **PROMPT ONLY** | orchestrator → R2 | first deploy (one-shot) |
| `audio_word` | **ON-DEMAND** | R2 via Deepgram Worker | first user play |
| `audio_example` | **ON-DEMAND** | R2 | first user play |
| `audio_collocation` | **ON-DEMAND** | R2 | first user play |
| `audio_definition` | **ON-DEMAND** | R2 | first user play |

**Image prompt template** is **NOT** in `vocab.js` — image prompts live in `Production_FINAL/IMAGE PROMPTS/week_NN_image_prompts.txt` (legacy location) or `production_kit/prompts/week_NN/` (recommended). The agent writes the prompt; `tools/image_pipeline/orchestrator.mjs` reads the prompt file and runs the image gen.

### 1.10 Cross-Station Dependencies
- `vocab.js` → `weekData.global_vocab` (index.js)
- `vocab.js` → `new_words` station key (index.js)
- `vocab.js` → `word_match` (WordMatch.jsx reads `data.stations.new_words.vocab`)
- `vocab.js` → `word_power.js` (8 multi-word phrases selected from vocab)
- `vocab.js` → `ask_ai.js` (target_vocab subset for prompts)
- `vocab.js` → `shadowing_ipa.js` (IPA per word)
- `vocab.js` → `week_NN_real.js` (AI Tutor target_vocab subset)
- `vocab.js` → `dictionary.json` (HoverWord popups; runtime not in scope here)

### 1.11 Generation Workflow
1. Pull 13–18 words from Syllabus
2. For each: hand-type IPA (or use CMU dict fallback at runtime)
3. For each: write Vietnamese + English definitions (use Gemini for translation if needed)
4. For each: pick natural collocations (NOT forced combinations)
5. For each: write a chunk-rich example sentence
6. For each: write a simple image prompt (style: `watercolor children book illustration` recommended)
7. Save `vocab.js`; run validators; run image pipeline orchestrator

### 1.12 Known Implementation Differences
| Field | W35 ADV shape | W36 ADV shape | Canonical? |
|---|---|---|---|
| `meaning_vi` | yes | no (renamed `definition_vi`) | **W36 wins** |
| `definition_en` | no (rare) | yes | **W36 wins** |
| `part_of_speech` | yes (noun/verb/adj) | no | Optional — both accepted |
| `example_vi` | yes | no (uses single `example`) | Optional — W36 simpler |
| `cefr_level` | yes (sometimes) | no | Optional — not enforced |
| `audio_collocation` | string path | numbered (`audio_collocation_0/1/2`) | W36 numbered variant is forward-compatible |

**Recommended canonical schema (W37+):**
```js
{ id, word, pronunciation, definition_vi, definition_en, example, collocation, image_url, audio_word, audio_example, audio_collocation_0, audio_collocation_1, audio_definition }
```

### 1.13 Blueprint Differences

| Aspect | Blueprint V5 | Implementation | Recommendation |
|---|---|---|---|
| Field list | `word, pronunciation, definition_vi, definition_en, example, collocation, image_url` | Same + `audio_word, audio_example, audio_collocation*, audio_definition` | **Implementation wins** (audio is part of the spec now) |
| Count | "varies" | W16–W27=13, W28+=18 | **Implementation wins** (CHECK 35 enforces) |
| `part_of_speech` | Not specified | Some weeks have it | Make canonical; runtime doesn't use |
| IPA display | Not specified | US in W36; US/UK conversion via `ipaUtils.usToUkIpa()` | **Implementation wins** |

### 1.14 Current Production Behaviour (W36 ADV)
- 18 words
- All have `definition_vi` + `definition_en` + `collocation` + `image_url` + `audio_word`
- Examples do not have `audio_example` (only `audio_word`)
- Some have `audio_collocation_0/1/2`

### 1.15 Common Mistakes
1. **Bold markers in `meaning_vi`** — Vietnamese must NOT have `**` (CHECK 20i)
2. **`audio_def` instead of `audio_definition`** — silent TTS failure
3. **Body part + bare 'hurt'** — "head hurt" rejected (CHECK 45)
4. **Forced `kind chef`/`friendly artist`** — disallowed unnatural collocations
5. **Easy count ≠ ADV count** — CHECK 35 fails
6. **Image file missing from disk** — CHECK 32 fails
7. **Vocab not in `read.js`** — CHECK 36 fails (50% threshold)

### 1.16 Future Extension Points
- **New field** — add to schema; runtime gracefully ignores unknown fields (VocabManager reads by name)
- **New drill type** — add a 4th drill in `VocabCard` (only need to wire `setCopyStatus` / `setFeedback` to trigger `isCompleted`)
- **New mode** (e.g., spelling bee) — add to `view` state in `VocabManager`
- **Audio-only vocab** (no image) — runtime handles `image_url=null` (VocabDigest fallback)

### 1.17 Approval Checklist (PO)
- [ ] Canonical schema agreed (`definition_vi`/`definition_en` mandatory, `audio_collocation_0/1/2` numbered)
- [ ] Word count rule agreed: 18 for W28+ (W16–W27 = 13, W1–W15 = ≥10)
- [ ] Image prompt pipeline location agreed (R2 + Production_FINAL or new path)
- [ ] Audio on-demand architecture confirmed
- [ ] CHECK 35 (Easy=ADV), CHECK 32 (image on disk), CHECK 45 (collocation quality) all enforced

---

## §2. WORD MATCH (`word_match.js` + `WordMatch.jsx`)

### 2.1 Purpose
A concentration (memory matching) game with 3 modes — pair each vocab word with its meaning/image/audio. Reinforces vocab-card learning through play.

### 2.2 Learning Objectives
- Recall word ↔ meaning pairs
- Visual recognition (image mode)
- Auditory recognition (audio mode)
- Win the game in ≤ minimum moves

### 2.3 User Workflow
1. **Choose mode** — Meaning / Image / Audio (3 modes per week)
2. **Resume last mode** (saved automatically per `lastMode`)
3. **Tap cards** to flip — each card plays audio via `speakText`
4. **Match pairs** by flipping two cards with same `id`
5. **Correct match** — cards stay face-up, score +10, 500ms delay
6. **Incorrect** — cards flip back after 1000ms
7. **Complete all pairs** — victory modal with move count
8. **Station complete** when all 3 modes are fully matched

### 2.4 Teacher Workflow
1. Author vocab list (see §1)
2. Author `word_match.js` with `pairs[]` (used by W36 schema) OR just rely on `vocab.js` (W35 schema)
3. **CRITICAL: runtime reads `data.stations.new_words.vocab` directly, NOT `data.stations.word_match.pairs`**
4. Run validators — only CHECK 5 (pairs must be objects, not numbers)

### 2.5 UI
- 4 columns (mobile) / 5 columns (desktop), `aspect-[3/4]`
- Card flip animation
- Move counter
- Score display
- Mode toggle pills at top
- Victory modal with move count

### 2.6 Tabs
3 mode tabs: Meaning / Image / Audio

### 2.7 Schema

**IMPORTANT**: Two schema coexist.

#### Schema A (W36 canonical) — `src/data/weeks/week_NN/word_match.js`
```js
export default {
  title: "...",                  // optional
  theme: "...",                  // optional
  instruction_en: "...",         // optional
  instruction_vi: "...",         // optional
  pairs: [                       // optional — runtime uses vocab.js if not present
    { left_id: 1, left_text: "go", right_match: "went", right_id: 1 },
    // ...
  ]
}
```

#### Schema B (legacy) — runtime actually reads `data.stations.new_words.vocab[]` (W36)
- This is the source of truth at runtime
- `word_match.js` is mostly cosmetic / legacy display

#### Runtime consumption
```js
// WordMatch.jsx:39
const vocabList = data?.stations?.new_words?.vocab || [];
// Generates cards from first 10 vocab items
const selectedVocab = vocabList.slice(0, 10);
```

**`data.stations.new_words` is set by `index.js` as `vocab`** (the vocab.js default export):
```js
stations: { new_words: vocab, ... }
```

**`data.stations.word_match` is set by `index.js` as `word_match`** — but WordMatch.jsx does NOT read this. It reads `data.stations.new_words.vocab`.

### 2.8 Card Generation Logic
```js
// Per vocab item, generates 2 cards:
gameCards.push({ id: item.id, type: 'word', content: item.word, speakContent: item.word, audioUrl: item.audio_word || item.audio_url, uniqueId: `word-${item.id}` });

// Paired card per mode:
if (mode === 'meaning') pairedCard = { content: item.definition_vi };
if (mode === 'image')   pairedCard = { content: getImageUrl(item.image_url) };
if (mode === 'audio')   pairedCard = { content: item.word, /* music icon */ };
```

Cards are Fisher-Yates shuffled.

### 2.9 Validation Rules
| Rule | Validator | Source |
|---|---|---|
| `pairs[]` is array of objects (not bare numbers) | **CHECK 5** | `code_quality_gate.sh` |
| Station ID `game_word_match` registered | (runtime only) | WordMatch.jsx |

### 2.10 Media Requirements
- All media comes from `vocab.js` — WordMatch.jsx does not read from `word_match.js` for media
- Image mode: `getImageUrl(vocab.image_url)` — same image pipeline as Vocab
- Audio mode: `vocab.audio_word` — same on-demand TTS
- Meaning mode: text only

### 2.11 Cross-Station Dependencies
- `word_match.js` (W36) is decorative — runtime reads `vocab.js` via `data.stations.new_words`
- `vocab.js` is the actual data source

### 2.12 Generation Workflow
1. Author vocab list (§1) — this is the source of truth
2. Optionally author `word_match.js` with `pairs[]` for any non-vocab-based matching (W36 ADV pairs irregular verbs)
3. Run CHECK 5

### 2.13 Known Implementation Differences
| Aspect | Blueprint | Implementation | Status |
|---|---|---|---|
| Data source | `word_match.pairs[]` | `new_words.vocab[]` (W36) | **Implementation wins** — vocab-driven is more DRY |
| Pair format | `{ word, definition }` | `{ left_id, left_text, right_match, right_id }` (W36) | Both valid; runtime reads vocab |
| Audio field | not specified | `audio_word || audio_url` (fallback) | Aligned |

### 2.14 Blueprint Differences
| Aspect | Blueprint V5 | Implementation | Recommendation |
|---|---|---|---|
| Pair format | Not specified | W36 uses `left_id/left_text/right_match/right_id` | Document W36 canonical |
| Min items | Not specified | 10 items max (vocab.slice(0, 10)) | Aligned |

### 2.15 Current Production Behaviour (W36 ADV)
- `word_match.js` contains 6 pairs (irregular verbs: go/went, see/saw, etc.)
- Runtime does NOT use these pairs — uses `vocab.js` (18 words, irregular verbs are inside)
- 3 modes, 10 words per mode, 20 cards

### 2.16 Common Mistakes
1. **Authoring `word_match.pairs[]` thinking runtime uses it** — it doesn't (W36+)
2. **Different vocab count in `word_match.pairs[]` vs `vocab.js`** — could lead to confusion
3. **CHECK 5** — pairs must be objects `{ word, definition }` not `[1, 2, 3]`

### 2.17 Future Extension Points
- **Different data source** — if future Blueprint requires vocab-independent matching, runtime needs to be updated to read `data.stations.word_match.pairs[]` instead
- **New mode** (e.g., spelling) — add to `gameMode` state + add branch to `generateCards`
- **Larger vocab pool** — increase `vocabList.slice(0, 10)` to 12 or 18

### 2.18 Approval Checklist (PO)
- [ ] Decided whether `word_match.js` is authoritative or `vocab.js` is (current: vocab.js is runtime, word_match.js is decorative)
- [ ] Decided pair format canonical (`{ left_id, left_text, right_match, right_id }` recommended)
- [ ] Decided number of pairs per mode (current: 10)
- [ ] Confirmed station completion criteria (all 3 modes done)

---

## §3. GRAMMAR (`grammar.js` + `GrammarEngine.jsx`)

### 3.1 Purpose
Drill grammar focus for the week via 20 exercises (exact count — hard rule). Exercise types: `fill_blank` (most common), `unscramble`, `multiple_choice`, `sentence_correct`, `rewrite_modal`, `sentence_match`.

### 3.2 Learning Objectives
- Apply the week's grammar focus (MUST / SHOULD / CAN for W35, Irregular Verbs for W36)
- Recognize grammar patterns in context
- Reorder scrambled words
- Choose the correct option
- Correct sentences by changing modal verbs

### 3.3 User Workflow
1. (Optional) Read grammar explanation (collapsible accordion) — `data.grammar_explanation`
2. For each question:
   - See the question + answer input (text) OR multiple-choice options OR scrambled words
   - Type answer OR click option OR click words in order
   - Click "Check" (or press Enter)
   - `analyzeAnswer` runs in mode `'strict'` (unscramble/customCheck) or `'grammar'` (fill)
   - If correct → button changes to "Next", progress saves
   - If incorrect → feedback shows, hint button available
3. After last question: "You did it!" screen with "Review Again" button

### 3.4 Teacher Workflow
1. Read Syllabus for grammar focus
2. Author 20 exercises (CHECK 20b + CHECK 27 enforce exactly 20)
3. Use `answer:` (NOT `correct:` — BUG-B7)
4. For unscramble: provide `words: []` array (BUG-B9 — NOT inline `[w1/w2/w3]`)
5. For multiple_choice: provide `options: [..,..,..,..]` and `answer: "must"` (exact match)
6. Optional `grammar_explanation` block
7. Run validators

### 3.5 UI
- Title + theme at top
- Collapsible grammar explanation accordion (`showLesson`)
- Question counter (`currentIndex + 1 / 20`)
- Question text
- Input field (fill/unscramble) or option chips (mc)
- "Check" → "Next" button
- "Hint" toggle
- "Previous" button (after first)
- Completion screen at end

### 3.6 Tabs
None.

### 3.7 Schema

#### Data file
```js
export default {
  title: "Modal Verbs — MUST, SHOULD, CAN",       // optional
  theme: "environmental_issues",                    // optional
  rule: {                                            // optional but recommended
    en: "MUST = bắt buộc...",
    vi: "MUST = bắt buộc phải làm..."
  },
  grammar_explanation: {                            // optional — shown in accordion
    title_en: "...",
    title_vi: "...",
    rules: [
      { icon: "✓", rule_en: "...", rule_vi: "...", example_en: "...", example_vi: "..." }
    ]
  },
  exercises: [
    { id: 1, type: "fill_blank", question_en: "We ___ protect our planet.", answer: "must", hint_en: "Bắt buộc phải làm - MUST" },
    { id: 2, type: "unscramble", question_en: "Unscramble:", words: ["We","must","protect","our","planet"], answer: "We must protect our planet" },
    { id: 3, type: "multiple_choice", question_en: "Choose:", options: ["must","should","can"], answer: "must" },
    { id: 4, type: "sentence_correct", question_en: "Correct: We can reduce pollution. (advice)", answer: "We should reduce pollution", hint: "Đổi CAN thành SHOULD" },
    { id: 5, type: "rewrite_modal", question_en: "Rewrite: It is necessary to protect.", answer: "We must protect" },
    { id: 6, type: "sentence_match", question_en: "Match:", pairs: [{ left: "MUST", right: "bắt buộc" }] }
    // ... exactly 20 entries
  ]
}
```

#### Exercise type support
| Type | Runtime | Validator | Notes |
|---|---|---|---|
| `fill_blank` | ✅ | CHECK 19.5 | ADV: `question_en`, Easy: `sentence` (W33 audit) |
| `unscramble` | ✅ | CHECK 19.5 | `words: []` array required (NOT inline) |
| `multiple_choice` (`mc`) | ✅ | CHECK 19.5 | `options: []` array + `answer: "..."` (exact match) |
| `sentence_correct` | ⚠️ Limited | — | Validated as fill_blank |
| `rewrite_modal` | ⚠️ Limited | — | Validated as fill_blank |
| `sentence_match` | ⚠️ Limited | — | Rendered as plain text; no matching UI |
| `fill` (legacy) | ✅ | — | Alias for `fill_blank` |

#### Field-name asymmetry
- **ADV**: `question_en` (or legacy `question`)
- **Easy**: `sentence` (or `question_en`) — W33 audit unified
- Runtime: `currentQ.question || currentQ.question_en || currentQ.sentence` (BUD-W33 fix)

### 3.8 Validation Rules
| Rule | Validator | Source |
|---|---|---|
| Exactly 20 exercises per mode | **CHECK 20b, CHECK 27** | `code_quality_gate.sh` |
| Use `answer:` not `correct:` | **CHECK B7** | `bug_prevention_check.sh` |
| No empty `answer: ""` | **CHECK B8** | `bug_prevention_check.sh` |
| Unscramble has `words: []` | **CHECK B9** (implicit) | runtime |
| Unscramble has `question:` field | (implicit) | runtime |
| No slash-separated answer strings | **CHECK 32** | `bug_prevention_check.sh` (NEVER_RULES BUG-32) |
| No curly quotes | **CHECK B10** | `bug_prevention_check.sh` |
| comprehension question count: 3 (W1–W16) / 4 (W17+) | (in read.js) | n/a here |
| `read.js` tense matches grammar_focus (-ed for past) | **CHECK 38** | `code_quality_gate.sh` |

### 3.9 Media Requirements
**NO MEDIA**. All text. Audio playback is initiated by the user via per-word/sentence audio but no asset is required.

### 3.10 Cross-Station Dependencies
- `grammar.js` exercises use vocab from `vocab.js`
- `grammar_focus` field in `week_NN_real.js` should match `grammar.js` rule
- `read.js` should demonstrate the grammar focus (CHECK 38)

### 3.11 Generation Workflow
1. Pick grammar focus from Syllabus
2. Generate 20 exercises — mix of types
3. For unscramble: use the same sentence as `read.js` for consistency
4. For multiple_choice: 3-4 options (one correct, plausible distractors)
5. For sentence_correct: provide a base sentence + a target change
6. Use `analyzeAnswer` modes correctly: `'grammar'` for fill, `'strict'` for unscramble
7. No `correct:` field (CHECK B7)
8. No curly quotes (CHECK B10)

### 3.12 Known Implementation Differences
| Aspect | Blueprint | Implementation | Status |
|---|---|---|---|
| Exercise count | "20" | 20 enforced by CHECK 20b + CHECK 27 | Aligned |
| Exercise types | 6 types | 6 types supported (3 fully, 3 limited) | Aligned |
| Field name | `question_en` | `question_en` or `question` (legacy) or `sentence` (Easy W33+) | **Implementation wins** (multi-alias) |
| Answer field | `answer:` | `answer:` enforced | Aligned |
| Mode parameter | n/a | `analyzeAnswer(mode='grammar' or 'strict')` | Implementation extension |

### 3.13 Blueprint Differences
| Aspect | Blueprint V5 | Implementation | Recommendation |
|---|---|---|---|
| Grammar focus by week | Grammar progression (Present → Past → Comparative) | Implementation reads from `grammar_focus` string | Aligned |
| Exercise count exact | "20 exercises" | 20 exact enforced | Aligned |
| Free vs guided | Schema is guided | Schema is guided | Aligned |

### 3.14 Current Production Behaviour (W36 ADV)
- 20 exercises for Irregular Verbs
- Mix of `fill_blank`, `unscramble`, `multiple_choice`, `sentence_correct`, `rewrite_modal`, `sentence_match`
- `rule` field present
- `grammar_explanation` block present in some weeks

### 3.15 Common Mistakes
1. **`correct:` instead of `answer:`** — BUG-B7: GrammarEngine silently marks all wrong
2. **19 or 21 exercises** — CHECK 20b fails
3. **Empty `answer: ""`** — CHECK B8 fails
4. **Unscramble without `words: []`** — runtime parse crash
5. **Curly quotes `'`** — CHECK B10 fails
6. **Slash-separated answer `"A / B"`** — BUG-32: only first token matches
7. **No synonyms in `answer[]`** — BUG-33: valid synonym gets marked wrong

### 3.16 Future Extension Points
- **New exercise type** — add to runtime branch in `GrammarEngine.jsx` (`renderQuestion` switch)
- **Grammar pattern recognition** — add hint type to show pattern + example
- **Audio narration per question** — add `audio_url` field
- **Multi-language hints** — add `hint_zh` etc.

### 3.17 Approval Checklist (PO)
- [ ] Exactly 20 exercises confirmed (no exceptions)
- [ ] Field name canonical: `question_en` for ADV, `sentence` for Easy (with `question_en` as fallback)
- [ ] `answer:` not `correct:` enforced
- [ ] All exercise types documented
- [ ] Unscramble `words: []` array required
- [ ] `read.js` tense matches grammar_focus (CHECK 38)

---

## §4. DICTATION (`dictation.js` + `DictationEngine.jsx`)

### 4.1 Purpose
Listen-and-write practice. Student hears a sentence (TTS or pre-recorded) and types it back. Three difficulty levels (unscramble, fill-blanks, full type).

### 4.2 Learning Objectives
- Hear and transcribe English sentences accurately
- Apply chunk recognition (sentences come from `read.js`)
- Progress from scaffolded (unscramble) to independent (type full) writing

### 4.3 User Workflow
1. **Select level** (1 / 2 / 3) at top — persisted
2. For each sentence:
   - Tap speaker button to hear TTS
   - For L1: click shuffled word chips in order
   - For L2: type full sentence with `______` blanks shown
   - For L3: type full sentence (no hint)
3. Click "Check" or press Enter
4. `analyzeAnswer` runs in `'strict'` mode
5. On `isCorrect` OR `status === 'perfect'` OR `(status === 'warning' && error === 'style_error')` → mark complete
6. On wrong: feedback shown, retry
7. All sentences complete → auto-save 100%

### 4.4 Teacher Workflow
1. Read `read.js` content_en — select 10–12 chunk-rich sentences (ADV W28+) or 8–10 (Easy W28+)
2. Copy `read.js` content_en **verbatim** into `dictation.js` `content_en` field (CHECK 42 enforces)
3. For each sentence, write Vietnamese `meaning` translation
4. Run validators

### 4.5 UI
- Level tabs at top (1 / 2 / 3)
- Cloze (L2) or word chips (L1) or no hint (L3)
- Audio play button per sentence
- "Check" button
- "Next" button (after correct)
- Progress bar

### 4.6 Tabs
3 levels: Unscramble / Fill Blanks / Type

### 4.7 Schema

```js
export default {
  content_en: "...",                    // VERBATIM copy of read.js content_en (CHECK 42)
  sentences: [
    { id: 1, text: "Last summer, my family and I went on a submarine adventure.", meaning: "Mùa hè năm ngoái..." },
    { id: 2, text: "We dove down 300 metres into the deep ocean.", meaning: "Chúng tôi lặn xuống..." },
    // 10–12 sentences (W28+ ADV); 8–10 (W28+ Easy)
  ]
}
```

**`text` vs `text_en`**: Runtime accepts both — see DictationEngine.jsx `text_en || text` fallback.

**W35 ADV schema** uses `text` only.
**W36 ADV schema** uses `text` only.
W36 dictation.js has `meaning: "Vietnamese meaning here"` placeholder for all 10 sentences — KNOWN DEFECT (no validator).

### 4.8 Cloze Generation Algorithm (Level 2)
- Iterates words split by `/\s+/`
- For each word at index `i`:
  - If `i % 3 === 2` OR `word.length > 5` → replace with `______`
- Original sentence is shown with blanks

### 4.9 Validation Rules
| Rule | Validator | Source |
|---|---|---|
| `sentences` array (not plain array) | **CHECK 17** | `code_quality_gate.sh` |
| `content_en` exactly matches read.js | **CHECK 42** | `code_quality_gate.sh` (Python) |
| Sentence count = read.js sentence count | **CHECK 20d** | `code_quality_gate.sh` |
| 10–12 sentences (W28+ ADV) | **CHECK B22** | `bug_prevention_check.sh` |
| 8–10 sentences (W28+ Easy) | **CHECK B22** | `bug_prevention_check.sh` |
| All sentences substring of read.js content_en | **CHECK 42** | `code_quality_gate.sh` (Python) |

### 4.10 Media Requirements
| Asset | Source | Trigger |
|---|---|---|
| Per-sentence audio | **ON-DEMAND** (Deepgram Worker + R2) | first user play |
| `text`/`meaning` | TTS via `speakText` | runtime |
| TTS prefetch | `useTTSPrefetch('dictation', currentWeek)` | mount |

### 4.11 Cross-Station Dependencies
- `dictation.js` ← `read.js` content_en (verbatim)
- `dictation.js` sentences must be subset of read.js content_en
- `dictation.js` sentences are chunk-rich (W28+ rule)

### 4.12 Generation Workflow
1. Read `read.js` content_en
2. Identify 10–12 sentences with the most multi-word chunks
3. Copy `content_en` **verbatim** (with `**bold**` markers preserved)
4. Translate each sentence to Vietnamese
5. Save; run validators

### 4.13 Known Implementation Differences
| Aspect | Blueprint | Implementation | Status |
|---|---|---|---|
| `meaning` field | Not specified | W36 has placeholder; W35 has real Vietnamese | **Implementation has gap** — need real Vietnamese |
| Sentences subset vs full | Subset (W28+) | Both supported | Aligned |
| `**bold**` in `text` | Not specified | Allowed (CHECK 42 strips before matching) | Aligned |

### 4.14 Blueprint Differences
| Aspect | Blueprint V5 | Implementation | Recommendation |
|---|---|---|---|
| Sentence count | "10–12 ADV / 8–10 Easy" | Enforced by CHECK B22 | Aligned |
| Source | "from read.js" | Verbatim content_en (CHECK 42) | Implementation stricter |
| Cloze generation | Not specified | `i % 3 === 2 || word.length > 5` | Implementation-defined |

### 4.15 Current Production Behaviour (W36 ADV)
- 10 sentences (W28+ ADV range)
- `content_en` is verbatim copy of `read_stem.content_en` from `read.js` (with `**bold**`)
- `meaning` is literal placeholder "Vietnamese meaning here" (W36 DEFECT)
- 3 levels supported

### 4.16 Common Mistakes
1. **Modifying `content_en` from read.js** — CHECK 42 fails
2. **Sentence not in read.js** — CHECK 42 fails
3. **Vietnamese placeholder left in** — no validator yet (P1 to add)
4. **Less than 10 sentences (W28+ ADV)** — CHECK B22 fails
5. **Sentences with `**bold**` markers stripped** — runtime supports both

### 4.17 Future Extension Points
- **Per-sentence difficulty** (auto-detect from chunk density)
- **Pre-fill partial answer** based on user's wrong attempts
- **Audio-first mode** (auto-play all sentences)
- **Vietnamese meaning validator** — detect placeholder

### 4.18 Approval Checklist (PO)
- [ ] `content_en` verbatim enforcement (CHECK 42)
- [ ] Sentence count 10–12 ADV / 8–10 Easy
- [ ] `meaning` field is real Vietnamese (W36 fix needed)
- [ ] TTS on-demand architecture confirmed

---

## §5. SHADOWING (`shadowing.js` + `shadowing_ipa.js` + 14 runtime files)

**The most complex station.** 4,000+ lines of runtime code, 14 files, 6 hooks, 8 UI components. This section is the canonical reference.

### 5.1 Purpose
Read-after-me speaking practice. Student listens to a model (TTS or YouTube native video), then records themselves mimicking the model. Includes:
- **Transcript Mode** — practice along with native speaker on YouTube
- **TTS Mode** — practice along with synthetic voice
- **Karaoke highlighting** — current word fills as it's spoken
- **IPA reference** — phonetics with stress coloring
- **Vietnamese translation** — bilingual display
- **Inline Challenge** — countdown → record → score → retry
- **Per-sentence Practice** — full-screen modal with detailed feedback
- **Corrections** — community-edited transcripts persisted to server

### 5.2 Learning Objectives
- Mimic native English pronunciation and rhythm
- Read at natural pace with chunk recognition
- Self-evaluate via AI scoring (Deepgram STT)
- Persist and replay own recordings

### 5.3 User Workflow
1. **Open Shadowing** — defaults to TTS mode
2. **Open video** — toggle to Transcript Mode (requires `videoId` in shadowing.js)
3. **Click sentence in RightPanel** — seeks to that sentence in video
4. **Click Play** — sentence plays (TTS or video audio)
5. **Watch karaoke** — current word highlights as spoken
6. **Open Settings** — toggle US/UK IPA, Stress, Vietnamese translation
7. **Click Practice** — full-screen modal for single-sentence practice
8. **Click Save** — setup challenge: per-sentence OR whole-script
9. **Run Challenge** — countdown → record → score (≥70 pass) → next
10. **Summary** — see average score, retry wrong, download recordings

### 5.4 Teacher Workflow
1. Read `read.js` — select 8–12 chunk-rich sentences
2. Hand-write IPA for each word (W36: 12 sentences, IPA needed for 6+)
3. Translate each sentence to Vietnamese
4. Optionally: add `videoId` for native shadowing (YouTube search via `update_videos.js`)
5. Save `shadowing.js` + `shadowing_ipa.js`
6. Run validators

### 5.5 UI (Top-to-Bottom)

```
┌─ ShadowingHeader ──────────────────────────────────┐
│ Title │ VI/EN │ Progress │ Speed │ Record All │ Play All │
├─ ChallengeBar (inline, only when active) ────────┤
│ [PLAY_TTS / COUNTDOWN / RECORDING / SCORING / SCORED] │
├─ Dual-panel layout (58% / 42%) ─────────────────────┤
│  ┌─ LeftPanel ───────────┐  ┌─ RightPanel ──────┐  │
│  │ Toggle pills (US/UK/  │  │ Sentence list     │  │
│  │ IPA/Stress/Translate) │  │ - Numbered cards  │  │
│  │ Sentence card with    │  │ - Active highlight│  │
│  │   karaoke highlight    │  │ - Per-sentence    │  │
│  │ IPA + Stress colors    │  │   play/practice/  │  │
│  │ Vietnamese translation │  │   edit buttons    │  │
│  │ Playback controls      │  │ - Transcript       │  │
│  │ Speed selector         │  │   source toggle   │  │
│  │ Inline YouTube video   │  │                   │  │
│  │ Full text panel        │  │                   │  │
│  │ Settings modal         │  │                   │  │
│  └────────────────────────┘  └───────────────────┘  │
├─ Modals (overlaid) ────────────────────────────────┤
│ <FullPracticeModal />  <SavePracticeModal />      │
│ <FloatingVideoWindow />                            │
└────────────────────────────────────────────────────┘
```

### 5.6 Tabs
- US / UK (accent) — affects IPA display
- IPA on/off
- Stress on/off
- Translate (Vietnamese) on/off
- Transcript source toggle: TTS ↔ Video

### 5.7 Schema (CRITICAL — every field documented)

#### `src/data/weeks/week_NN/shadowing.js`
```js
export default {
  videoId: 'Rlmms56uisw',                            // OPTIONAL: YouTube 11-char ID for native shadowing
                                                      //   - If present, transcript mode available
                                                      //   - If absent, TTS-only shadowing

  content_en: "Last summer, my family and I went on a submarine adventure. We dove down 300 metres...",  // VERBATIM copy of read.js content_en (CHECK 42)

  ttsScript: [                                        // OPTIONAL: alternative to `script` for TTS
    { id: 1, text: "Last summer, my family and I went on a submarine adventure." },
    // ...
  ],

  script: [                                           // MAIN sentence list
    { id: 1, text: 'Last summer, my family and I went on a submarine adventure.', vi: 'Mùa hè năm ngoái, gia đình tôi đi phiêu lưu bằng tàu ngầm.' },
    { id: 2, text: 'We dove down 300 metres into the deep ocean.', vi: 'Chúng tôi lặn xuống 300 mét dưới đáy đại dương.' },
    // 10–12 sentences (W28+ ADV) / 8–10 (W28+ Easy)
    //   - id: integer or string (must match shadowing_ipa.js keys)
    //   - text: English text (MUST be substring of content_en)
    //   - vi: Vietnamese translation (optional — AI fallback if null)
  ],

  corrections: { /* populated at runtime by handleSaveCorrection */ }
}
```

#### `src/data/weeks/week_NN/shadowing_ipa.js`
```js
export default {
  1: [                                                // keyed by sentence id (integer or string)
    { word: 'Last',   ipa: '/læst/',  stress: 1 },     // word: token from script[0].text
    { word: 'summer,',ipa: '/ˈsʌmər/',stress: 1 },     //   - includes punctuation attached
    { word: 'my',     ipa: '/maɪ/',   stress: 1 },     //   - MUST split on /[A-Za-z']+/g
    { word: 'family', ipa: '/ˈfæməli/', stress: 1 },    // ipa: IPA notation (US or UK)
    { word: 'went',   ipa: '/wɛnt/',  stress: 1 },     // stress: 0 (unstressed) | 1 (primary) | 2 (secondary)
    { word: 'on',     ipa: '/ɑn/',    stress: 1 },
    { word: 'submarine', ipa: '/ˈsʌbməriːn/', stress: 2 },
    { word: 'adventure.', ipa: '/ədˈvɛntʃər/', stress: 2 },
  ],
  2: [...], 3: [...], // per-sentence IPA arrays
}
```

**`ipaData` is auto-generated at runtime** if missing:
- For lesson script: uses `ipaData[sentenceId]` from `shadowing_ipa.js`
- For transcript mode: uses `generateIpaForText(text)` from `ipaUtils.js` (CMU dict fallback)
- US→UK conversion via `convertIpaWordsToUk()` if `settings.accent === 'UK'`

**`stress` colors** (consistent across all UI):
- `0` → gray (`text-slate-500`, `border-slate-400`)
- `1` → red (`text-rose-600`, `border-rose-500`, `bg-rose-50`)
- `2` → blue (`text-blue-600`, `border-blue-400`, `bg-blue-50`)

### 5.8 Runtime Architecture

```
Shadowing.jsx (parent, 1052 lines)
│
├─ Hooks (6):
│  ├─ useShadowingPlayer(ytPlayerRef)              ← TTS playback + sequence state machine
│  ├─ useShadowingRecorder(weekId)                 ← mic capture + Deepgram scoring
│  ├─ useShadowingYouTubeBridge(ytPlayerRef, player) ← YouTube IFrame lifecycle
│  ├─ useShadowingChallenge({...})                  ← 7-phase state machine (challenge)
│  ├─ useShadowingVideoSync({...})                 ← segment tracker + wait-mode pauses
│  └─ useShadowingPlayPause({...})                  ← master inline play/pause (4-case)
│
├─ UI Components (8):
│  ├─ ShadowingHeader           ← top bar (title, lang, speed, Record All, Play All)
│  ├─ ChallengeBar              ← inline overlay (5 of 7 phases)
│  ├─ LeftPanel                 ← main focus area (karaoke + IPA + translation)
│  ├─ RightPanel                ← sentence list (navigation + edit)
│  ├─ FullPracticeModal         ← full-screen single-sentence practice
│  ├─ SavePracticeModal         ← setup + summary (2 screens)
│  ├─ FloatingVideoWindow       ← draggable/resizable popup
│  └─ YouTubeEmbed              ← YT IFrame wrapper (re-uses across inline + popup)
│
├─ Utils (used by hooks):
│  ├─ ipaUtils.js                ← IPA rendering, US→UK, CMU fallback
│  ├─ transcriptAligner.js       ← match script to ASR segments
│  ├─ transcriptUtils.js         ← load transcripts via Vite glob
│  ├─ useWordHighlight.js        ← karaoke word highlight (video)
│  └─ useTTSWordHighlight.js     ← karaoke word highlight (TTS)
│
├─ Data (loaded via Vite import.meta.glob):
│  ├─ ../../data/weeks/week_*/shadowing_ipa.js
│  └─ ../../data/video_transcripts_by_id/{cleaned,sentences,raw}/*.json
│
└─ External:
   ├─ VoiceService (window._currentAudio, _shouldPauseNext)
   ├─ speakText (utils/AudioHelper) → Deepgram Worker
   ├─ useStationProgress (hook)
   ├─ useTTSPrefetch (hook)
   └─ shadowingStorage (utils) — IndexedDB for recordings
```

### 5.9 YouTube Pipeline (3-stage)

**Stage 1 — Fetch** (`tools/fetch_video_transcripts.js`)
- Uses `youtube-transcript` npm package
- Output: `src/data/video_transcripts_by_id/raw/<videoId>.json`

**Stage 2 — Clean** (`tools/clean_transcripts.mjs`)
- ASR cleanup via `cleanRawTranscript()` regex set
- Patches: `D hey` → `Hey`, `Im` → `I'm`, `dont` → `don't`, `cant` → `can't`, etc.
- Capitalizes first letter, normalizes whitespace, adds period if missing
- Merges with `curated_transcripts.json` overrides (39KB manual)
- Output: `src/data/video_transcripts_by_id/cleaned/<videoId>.json`

**Stage 3 — Split** (`tools/split_transcripts.py`)
- Splits monolithic into per-video files
- Output: `src/data/video_transcripts_by_id/sentences/<videoId>.json`

**Sentence alignment** (`transcriptAligner.js`):
- For each script sentence, consume raw ASR segments until word count matches
- `wordOverlap()` (Jaccard) confirms alignment
- Returns aligned segments with `start`, `duration`, `text` (cleaned), `vi` (script), `_isTranscript: true`

### 5.10 Karaoke Highlighting

**Source**: YouTube IFrame API `getCurrentTime()` returns **VIDEO TIME** (not real-time).

**Window model** (per sentence):
- `start = sentence.start || 0`
- `wordCount = (text.match(/[A-Za-z']+/g) || []).length`
- `FAST_RATE = 0.4` (s/word, fixed for all sentences → 2.5 words/sec)
- `dur = FAST_RATE * wordCount` ← **shorter than ASR duration** to LEAD the audio
- Per word: `wordDur = dur / wordCount`, `word[i] = {word, start: start + i*wordDur, end: start + (i+1)*wordDur}`

**Two highlight sources** (mutually exclusive):
1. **TTS mode** (`useTTSWordHighlight.js`) — matches against `VoiceService._currentAudio.currentTime`
2. **Transcript mode** (`useWordHighlight.js`) — matches against `ytPlayer.getCurrentTime()` + sentence start

**Loop**: `requestAnimationFrame` at 60fps (not `setInterval`)

**Active word selection**:
- Primary: find sentence with `start <= t + 0.1 && end > t - 0.1`. Among matches, prefer max `start` (newest in-progress).
- Fallback (no in-progress): sentence with max `start <= t + 0.1`.

### 5.11 Challenge Mode (Inline)

**7-phase state machine** (declared in `useShadowingChallenge.js` `PHASES`):
- `SETUP` → `PLAY_TTS` → `RECORDING` → `SCORING` → `SCORED` → (next) → `ALL_DONE`
- `COUNTDOWN_321` declared but **no longer entered** (pre-countdown removed May 2026)
- `BATCH_EVALUATING` for whole-script mode (eval all at end)

**Inline rendering** (5 of 7 phases via `<ChallengeBar />`):
- `PLAY_TTS` — "Listening to the sample..." blue card
- `RECORDING` — circular depleting timer + 10 animated waveform bars
- `SCORING` — "Analyzing your speech..." (suppressed in whole-script mode)
- `SCORED` — ScoreRing (≥80 green, ≥50 amber, <50 red) + feedback + transcript + Redo/Next
- `SETUP` / `ALL_DONE` / `BATCH_EVALUATING` → `<SavePracticeModal />`

**Two practice modes**:
- `per-sentence` — AI scores each one, retry allowed
- `whole-script` — auto-advance, AI scores at end (BATCH_EVALUATING)

**Adaptive extension** (handles slow speakers):
- `redoCount >= 2` → +5s to current sentence
- If previous sentence needed full time → +5s to next
- Capped at 15s total

**Timeouts**:
- Scoring: 10s hard fallback
- Batch eval: 30s

### 5.12 Corrections API

User can edit transcript text inline. Edits are persisted:
- **Client**: `localStorage['shadowing_corrections_v2_<videoId>']`
- **Server**: `POST {VITE_TTS_WORKER_URL}/api/corrections/<videoId>`
- **Fetch on mount**: `GET {VITE_TTS_WORKER_URL}/api/corrections/<videoId>`
- LocalStorage takes precedence over server

### 5.13 Settings (persisted to localStorage)

```js
{
  accent: 'US' | 'UK',           // IPA display accent
  repeatCount: 1,                // sentence repeat count
  waitMode: 'off' | '30%' | '60%' | '120%',  // pause between segments in transcript mode
  subSync: 0,                    // subtitle sync offset (seconds)
}
```

### 5.14 AI Translate Fallback

If `showTranslate=true` AND active sentence has `vi=null`:
- Call `generateText(prompt)` to LLM
- Cache in `translatedTexts[activeId]`
- Render with `...` loading state
- Used by Easy mode weeks that don't pre-write Vietnamese

### 5.15 Validation Rules
| Rule | Validator | Source |
|---|---|---|
| `script` array exists | **CHECK 19.5** | `code_quality_gate.sh` |
| `script` has ≥8 text entries (W28+) | **CHECK 19.5** | `code_quality_gate.sh` |
| Sentences substring of read.js | **CHECK 42** | `code_quality_gate.sh` (Python) |
| `content_en` matches read.js | **CHECK 42** | `code_quality_gate.sh` (Python) |
| 10–12 sentences (W28+ ADV) | **CHECK B22** | `bug_prevention_check.sh` |
| 8–10 sentences (W28+ Easy) | **CHECK B22** | `bug_prevention_check.sh` |
| `videoId` 11-char format | (runtime check) | `validate_video_thumbnails.js` |
| YouTube thumbnail 200 OK | **CHECK 24c** | `validate_video_thumbnails.js` |
| IPA data ≥50% of sentences | (recommended validator to add) | n/a |
| Transcripts present for video | (runtime) | transcriptUtils.js |

### 5.16 Media Requirements

| Asset | Source | Storage |
|---|---|---|
| `videoId` | **EXTERNAL SEARCH** (YouTube Data API) | YouTube embed (not hosted) |
| `content_en` text | Verbatim from read.js | data/shadowing.js |
| `script[].text` | Subset from read.js | data/shadowing.js |
| `script[].vi` | Manual translation | data/shadowing.js |
| `shadowing_ipa.js` per-word | **PROMPT ONLY** (text) + **AUTO GENERATED** (CMU fallback) | data/shadowing_ipa.js |
| YouTube thumbnail | YouTube CDN | runtime-fetched |
| YouTube transcript (raw) | youtube-transcript npm | video_transcripts_by_id/raw/ |
| YouTube transcript (cleaned) | clean_transcripts.mjs | video_transcripts_by_id/cleaned/ |
| YouTube transcript (sentences) | split_transcripts.py | video_transcripts_by_id/sentences/ |
| Per-sentence audio | **ON-DEMAND** (Deepgram Worker) | R2 engquest-audio |
| User recordings | MediaRecorder → blob URL | IndexedDB (shadowingStorage) |
| Corrections | User edits | localStorage + TTS Worker KV |
| User scores | Deepgram STT response | localStorage['shadowing_scores_<weekId>'] |

### 5.17 Cross-Station Dependencies
- `shadowing.js` content_en = `read.js` content_en (verbatim)
- `shadowing.js` sentences[] = subset of read.js content_en
- `shadowing.js` sentences[] prefer chunk-rich sentences (Blueprint §VII.b)
- `shadowing.js` IPA helps AI Tutor `chunk_focus[]` population (informal)
- `daily_watch.js` videoId can be reused (or different video)
- Corrections are per-video (shared across weeks using same video)

### 5.18 Generation Workflow

**Weekly authoring** (10–12 sentences for W28+ ADV):
1. Read `read.js` content_en
2. Select chunk-rich sentences (10–12 ADV / 8–10 Easy)
3. Copy each sentence verbatim into `script[].text`
4. Translate each to Vietnamese → `script[].vi`
5. Hand-write IPA for each word → `shadowing_ipa.js`
6. Or rely on CMU auto-fallback at runtime
7. Update `video_queries.json` for native shadowing video
8. Run `update_videos.js` to fill `videoId`
9. Run validators

**First-time video pipeline** (when new videoId is introduced):
10. `fetch_video_transcripts.js --only <week>`
11. `clean_transcripts.mjs` (merges with curated_transcripts.json)
12. `split_transcripts.py`
13. Manual: edit `curated_transcripts.json` for bad auto-splits
14. Re-run `clean_transcripts.mjs`

### 5.19 Known Implementation Differences

| Field | W35 | W36 | Canonical? |
|---|---|---|---|
| `videoId` | none | `Rlmms56uisw` (Little Fox "Airplane Trip") | Optional, both OK |
| `script[].vi` translations | Some sentences have ants/grasshopper fable vi (TEMPLATE BUG) | Real Vietnamese | **W36 wins** (real vi) |
| `shadowing_ipa.js` | 30 sentences (full) | 6 of 12 (incomplete) | **W35 wins** (full) |
| `IPA` convention | Function words stress=0 | Function words stress=1 (non-conformant) | **W35 wins** |
| `corrections` key version | legacy `shadowing_corrections_<videoId>` | `shadowing_corrections_v2_<videoId>` (Jul 1, 2026) | W36 v2 is canonical |
| `content_en` source | `read.js` content_en | `read.js` read_stem.content_en | W36 dual-tab is correct |

**🚨 CRITICAL FINDING — W35 shadowing.js has a TEMPLATE BUG**: Sentences 1–13 have Vietnamese translations copied from a previous week about ants and grasshoppers (clearly template leftover). Sentences 14+ have placeholder "(cụm từ: ...)" pointing to next sentence. This is a content defect; the vi should be real Vietnamese about Environmental Issues.

**🚨 CRITICAL FINDING — W36 shadowing_ipa.js is INCOMPLETE**: Only 6 of 12 sentences have IPA entries. Runtime falls back to CMU dict. Recommended: write IPA for all sentences.

### 5.20 Blueprint Differences

| Aspect | Blueprint V5 | Implementation | Recommendation |
|---|---|---|---|
| `shadowing_ipa.js` | Not specified | Implemented (manual + CMU fallback) | **Implementation wins** — add to Blueprint §V |
| Karaoke FAST_RATE | Not specified | 0.4 s/word | **Implementation wins** — add to Blueprint |
| YouTube transcript pipeline | Brief ("fetch and align") | 3-stage with curated overrides | **Implementation wins** — add to Blueprint |
| Corrections API | Not specified | Implemented | **Implementation wins** |
| Inline challenge mode | Not specified | Full 7-phase state machine | **Implementation wins** |
| Practice settings (wait mode) | Not specified | Implemented | **Implementation wins** |
| IPA US→UK conversion | Not specified | Implemented | **Implementation wins** |
| ASR cleanup regex set | Not specified | Implemented | **Implementation wins** |

### 5.21 Current Production Behaviour (W36 ADV)
- 12 sentences
- 6 sentences with manual IPA (W35-style: 30 sentences all had manual IPA)
- Real Vietnamese translations
- videoId `Rlmms56uisw` for native shadowing
- Inline challenge mode + per-sentence practice + full practice modal
- Floating video window (draggable, resizable, minimizable)
- Corrections API (Jul 1, 2026 v2 key)

### 5.22 Common Mistakes
1. **Not copying `read.js` content_en verbatim** — CHECK 42 fails
2. **Sentences not substring of read.js** — CHECK 42 fails
3. **Different `videoId` per week without updating curated_transcripts** — orphan transcripts
4. **Template-bug vi (ants/grasshoppers)** — W35 issue; should be real Vietnamese
5. **Incomplete IPA (W36)** — 6 of 12; runtime falls back but quality suffers
6. **`videoId` invalid** — YouTube embed fails silently
7. **Forgetting `ttsScript`** — optional, but useful when TTS uses different text than shadowing

### 5.23 Future Extension Points
- **Multi-language IPA** (add `lang` field per word)
- **Speech rate detection** (auto-flag users who speak too fast)
- **Peer comparison** (compare user score to class average)
- **Live coaching** (highlight mispronounced words in real-time)
- **Phoneme-level scoring** (currently word-level)

### 5.24 Approval Checklist (PO)
- [ ] `script[]` 10–12 ADV / 8–10 Easy (CHECK B22)
- [ ] `content_en` verbatim from `read.js` (CHECK 42)
- [ ] Sentences substring of read.js (CHECK 42)
- [ ] IPA for ≥50% of sentences (new validator to add)
- [ ] `vi` field is real Vietnamese (W35 fix)
- [ ] `videoId` is valid 11-char (CHECK 24c thumbnail)
- [ ] Transcripts present for videoId (runtime check)
- [ ] `shadowing_ipa.js` key type matches `script[].id` type (int vs string)

### 5.25 ALL Magic Numbers & Hidden Constants (Consolidated)

| Constant | Value | Where | Purpose |
|---|---|---|---|
| `FAST_RATE` | 0.4 s/word | `useWordHighlight.js` getSpeechWindow | Karaoke pacing (2.5 wps) |
| Karaoke tolerance | ±0.1 s | `useWordHighlight.js` | Highlight window |
| TTS estimate | 80 ms/char + 2000 floor | `useShadowingChallenge.js` | PLAY_TTS max time |
| TTS max safety | 200 ms/char + 2000 + 2000 | `useShadowingChallenge.js` | PLAY_TTS hard limit |
| Scoring timeout | 10 s | `useShadowingChallenge.js` | Deepgram wait |
| Batch eval timeout | 30 s | `useShadowingChallenge.js` | Whole-script wait |
| Adaptive cap | 15 s | `useShadowingChallenge.js` | Redo/slow speaker |
| Pass threshold | 70 | `useShadowingChallenge.js` | Retry-wrong cutoff |
| Play/Pause debounce | 500 ms | `useShadowingPlayPause.js` | Click spam guard |
| Video poll | 300 ms | `useShadowingPlayer.js` | YouTube playback detect |
| Video playing debounce | 600 ms | `useShadowingPlayer.js` | After last advance |
| Segment poll | 100 ms | `useShadowingVideoSync.js` | Active sentence tracker |
| Gap threshold | 1.0 s | `useShadowingVideoSync.js` | Wait-mode trigger |
| Wait-mode max | min(waitMs, gap·1000, 1500) | `useShadowingVideoSync.js` | Cap pause length |
| YT poll | 500 ms | `useShadowingYouTubeBridge.js` | Ultimate fallback |
| SPEED_OPTIONS | [1.25, 1.0, 0.85, 0.75, 0.65] | `useShadowingPlayer.js` | TTS speed |
| Default speed | 0.85 | `useShadowingPlayer.js` | Persisted |
| INTER_SENTENCE_GAP_MS | 800 / speed | `useShadowingPlayer.js` | Sequence gap |
| COUNTDOWN_OPTIONS | [3, 5, 10, 15] | `useShadowingChallenge.js` | Record window |
| TTS_END_DELAY_MS | 500 | `useShadowingChallenge.js` | After onEnd |
| WPS filter | 0.3 wps | `transcriptUtils.js` | Drop too-slow ASR |
| SUPPORTED_RATES | [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] | `useShadowingYouTubeBridge.js` | YouTube playback rates |
| Color: green | #22c55e | all score UIs | score ≥ 80 |
| Color: amber | #f59e0b | all score UIs | 50 ≤ score < 80 |
| Color: red | #ef4444 | all score UIs | score < 50 |
| Card padding | px-4 py-3, rounded-xl | `SentenceCard.jsx` | UI standard |
| Floating window | 576×324, min 320×240 | `FloatingVideoWindow.jsx` | Popup size |
| Floating z-index | 10000 | `FloatingVideoWindow.jsx` | Above modals |
| Modal z-index | 9999 | `SavePracticeModal.jsx`, `FullPracticeModal.jsx` | Below floating |
| `ttsScript` priority | `ttsScript ?? script` | `Shadowing.jsx:248` | Both supported |
| `transcriptIpa` cache key | `sentenceId` (int or string) | `Shadowing.jsx:838` | Per-sentence cache |

### 5.26 COMPLETE File Inventory

| Layer | File | Lines | Purpose |
|---|---|---|---|
| Data | `src/data/weeks/week_NN/shadowing.js` | ~36 | Sentence + videoId schema |
| Data | `src/data/weeks/week_NN/shadowing_ipa.js` | ~240 | IPA per word per sentence |
| Data | `src/data/video_transcripts_by_id/{cleaned,sentences,raw}/*.json` | 79×3 files | ASR transcripts |
| Data | `src/data/curated_transcripts.json` | 39KB | Manual transcript overrides |
| Data | `src/data/cmudict.json` | 3.9MB | CMU pronunciation dict (IPA fallback) |
| Parent | `src/modules/shadowing/Shadowing.jsx` | 1052 | Main station |
| Hook | `src/hooks/useShadowingPlayer.js` | ~500 | TTS playback state machine |
| Hook | `src/hooks/useShadowingRecorder.js` | ~600 | Mic + Deepgram scoring |
| Hook | `src/hooks/useShadowingYouTubeBridge.js` | ~200 | YT IFrame lifecycle |
| Hook | `src/hooks/useShadowingChallenge.js` | ~1000 | 7-phase state machine |
| Hook | `src/hooks/useShadowingVideoSync.js` | ~150 | Segment tracker |
| Hook | `src/hooks/useShadowingPlayPause.js` | ~250 | Master inline button |
| UI | `src/modules/shadowing/ShadowingHeader.jsx` | 129 | Top bar |
| UI | `src/modules/shadowing/LeftPanel.jsx` | 492 | Main focus area |
| UI | `src/modules/shadowing/RightPanel.jsx` | 89 | Sentence list |
| UI | `src/modules/shadowing/ChallengeBar.jsx` | 331 | Inline overlay |
| UI | `src/modules/shadowing/FullPracticeModal.jsx` | 285 | Full-screen single practice |
| UI | `src/modules/shadowing/SavePracticeModal.jsx` | 329 | Setup + Summary modals |
| UI | `src/modules/shadowing/FloatingVideoWindow.jsx` | 199 | Draggable popup |
| UI | `src/modules/shadowing/YouTubeEmbed.jsx` | 176 | YT IFrame wrapper |
| UI | `src/modules/shadowing/SentenceCard.jsx` | ~200 | Single sentence card |
| UI | `src/modules/shadowing/PracticeSettingsModal.jsx` | ~80 | Settings |
| UI | `src/modules/shadowing/ShadowingErrorBoundary.jsx` | ~50 | Error recovery |
| UI | `src/modules/shadowing/ipaUtils.js` | 216 | IPA rendering, US→UK, CMU |
| UI | `src/modules/shadowing/transcriptAligner.js` | 133 | ASR alignment |
| UI | `src/modules/shadowing/transcriptUtils.js` | 87 | Vite glob transcript loading |
| UI | `src/modules/shadowing/useWordHighlight.js` | 181 | Karaoke (video) |
| UI | `src/modules/shadowing/useTTSWordHighlight.js` | ~150 | Karaoke (TTS) |
| Service | `src/services/voiceService.js` | ~ | TTS Worker integration |
| Util | `src/utils/AudioHelper.js` | ~ | speakText wrapper |
| Util | `src/utils/shadowingStorage.js` | ~ | IndexedDB recordings |
| Util | `src/utils/smartCheck.js` | ~ | analyzeAnswer |
| Hook | `src/hooks/useStationProgress.js` | ~ | Per-station progress |
| Hook | `src/hooks/useTTSPrefetch.js` | ~ | TTS prefetch |
| **Total** | | **~6,000+** | |

---

## §6. WORD POWER (`word_power.js` + `WordPower.jsx`)

### 6.1 Purpose
Phrasal verb / collocation power cards. Each card focuses on a multi-word chunk (not a single word) with drill practice.

### 6.2 Learning Objectives
- Produce multi-word phrases (chunks) from memory
- Apply phrases in context
- Recognize phrases in audio + text

### 6.3 User Workflow (per card)
1. **View front** — word (multi-word phrase), pronunciation, image, audio play button
2. **Tap card** to flip → back shows definition (en+vi), example, collocation chips
3. **Drill 1** — Copy the phrase 3 times
4. **Drill 2** — Type the definition (`analyzeAnswer` in `'academic'` mode)
5. **Drill 3** — Write a sentence using the phrase
6. All 5 sub-drills pass → card auto-completes
7. When all complete → progress 100%

### 6.4 Teacher Workflow
1. Pick 8 (W28+) or 6 (W16–W27) multi-word phrases from this week's vocab or related chunks
2. Author `word_power.js` with `words[]` array
3. Each word: 5 audio fields (word, definition, example, collocation, model)
4. Run validators

### 6.5 UI
- Vertical list of flip-cards (h-96, fixed height)
- Word length adaptive font: >15 chars = text-xl, >10 = text-2xl, >6 = text-3xl, else text-4xl
- Same card flip pattern as VocabManager

### 6.6 Tabs
None.

### 6.7 Schema

```js
export default {
  title: "Word Power: Environmental Issues",        // optional
  audio_url: null,                                    // optional (for station-level audio)
  words: [
    {
      id: 1,
      word: "protect our planet",                     // MULTI-WORD PHRASE (must contain space) — CHECK 20
      pronunciation: "/prəˈtekt aʊər ˈplænɪt/",
      cefr_level: "A1",                               // optional (W35+, not in W36)
      definition_en: "to keep our Earth safe and healthy",
      definition_vi: "bảo vệ hành tinh của chúng ta",
      example: "We must protect our planet from pollution.",  // OR example_en
      collocation: "protect our planet / protect nature / protect the environment",
      model_sentence: "Every person can help protect our planet by making small changes.",
      image_url: '/images/week35/wp_protect_planet.jpg',
      audio_word: '/audio/week35/wordpower_w1_word.mp3',
      audio_definition: '/audio/week35/wordpower_w1_def.mp3',
      audio_example: '/audio/week35/wordpower_w1_example.mp3',
      audio_collocation: '/audio/week35/wordpower_w1_collocation.mp3',
      audio_model: '/audio/week35/wordpower_w1_model.mp3'
    },
    // 8 items (W28+) or 6 items (W16–W27)
  ]
}
```

**Field rules:**
- `word` MUST be a multi-word phrase (CHECK 20 rejects single-word)
- `collocation` can be string OR array
- `example` / `example_en` (runtime reads first available)
- 5 audio fields per item: `audio_word`, `audio_definition`, `audio_example` (or `audio_ex`), `audio_collocation`, `audio_model`

### 6.8 Validation Rules
| Rule | Validator | Source |
|---|---|---|
| 6 items (W16–W27) or 8 items (W28+) | **CHECK 20** | `code_quality_gate.sh` |
| All `word` fields are multi-word | **CHECK 20** | `code_quality_gate.sh` |
| 5 audio fields per item | (runtime) | WordPower.jsx |
| Card completion criteria | (runtime) | WordPower.jsx |

### 6.9 Media Requirements

| Asset | Source | Storage |
|---|---|---|
| `image_url` | **PROMPT ONLY** (orchestrator) | R2 |
| `audio_word` (5 types) | **ON-DEMAND** | R2 |
| TTS prefetch | `useTTSPrefetch` on mount with 800ms delay | R2 |

### 6.10 Cross-Station Dependencies
- `word_power.js` → `word_power` station key (index.js)
- Phrases should be multi-word collocations (chunk-first)
- Phrases should be subset of read.js bold chunks

### 6.11 Generation Workflow
1. Pick 8 multi-word phrases from this week's vocab
2. Author `word_power.js`
3. Run validators
4. Run image pipeline orchestrator

### 6.12 Known Implementation Differences
| Aspect | W35 | W36 | Canonical? |
|---|---|---|---|
| `cefr_level` | yes | yes (consistent) | Optional |
| `example` field | yes | yes (consistent) | Required |
| `model_sentence` | yes | yes (consistent) | Required |
| Item count | 8 | 8 (consistent) | Aligned |
| Audio field count | 5 per item | 5 per item (consistent) | Aligned |

**W35/W36 word_power.js schemas are CONSISTENT.** No drift.

### 6.13 Blueprint Differences

| Aspect | Blueprint V5 | Implementation | Recommendation |
|---|---|---|---|
| Item count | "varies" | 6 (W16-27) / 8 (W28+) | **Implementation wins** (CHECK 20) |
| `cefr_level` | Not specified | yes | Optional |
| 5 audio types | Not specified | yes | **Implementation wins** — add to Blueprint |

### 6.14 Current Production Behaviour (W36 ADV)
- 8 items, all multi-word phrases from W36 vocab
- All have 5 audio fields
- Real Vietnamese translations
- Real example sentences (chunk-rich)

### 6.15 Common Mistakes
1. **Single-word entries** — CHECK 20 fails (e.g., `word: "kick"` instead of `word: "kick the ball"`)
2. **5 or 7 items** — CHECK 20 fails
3. **Missing audio fields** — runtime degrades silently

### 6.16 Future Extension Points
- **New drill type** (e.g., "use in conversation")
- **Pronunciation scoring** (apply Shadowing's Deepgram scoring to chunks)
- **Per-chunk IPA display**

### 6.17 Approval Checklist (PO)
- [ ] 8 items (W28+) or 6 items (W16–W27) — CHECK 20
- [ ] All words are multi-word phrases — CHECK 20
- [ ] 5 audio fields per item
- [ ] `collocation` field is natural

---

## §7. WRITING & SPEAK (`writing.js` + WriteAndSpeak.jsx + StoryWriting.jsx + TellYourStory.jsx)

### 7.1 Purpose
Three writing/speaking sub-tabs (W16+):
- **Video Challenge** — write about a video prompt
- **Story Writing** — picture-based or topic-based storytelling
- **Tell Your Story** — speak (record + AI score) the story you wrote

For W1–W15: only "Video Challenge" tab.

### 7.2 Learning Objectives
- Compose multi-sentence text using week's grammar + vocab
- Speak the story (record + AI eval)
- Pass pronunciation + content checks

### 7.3 User Workflow

**Story Writing tab (W16+):**
1. See `picture_mode` or `topic_mode` prompt
2. Fill in 8 sentence frames (W28+ ADV) or 6–7 (Easy)
3. Vocabulary bank visible on click (show_by_default=false)
4. "Tell Your Story" button → switches to Speak tab
5. Record up to 30s → Deepgram scores
6. AI asks verification question about the story
7. Record answer (15s) → AI verifies
8. Pass = `pronunciationScore >= 60` AND `verified === true`

**Topic Mode (W36+):**
1. Choose topic from list
2. Record up to 60s about topic
3. AI scores content (0-3) + grammar (0-3)
4. Pass = `topicContentScore >= 2`

**Video Challenge (W1-W15):**
1. See video + prompt
2. Write response
3. Submit for AI eval

### 7.4 Teacher Workflow
1. Read Syllabus for writing task
2. Author `writing.js` with:
   - `model_sentence` (≥200 chars, ≥45 words, ≥6 sentences)
   - 8 sentence frames (ADV) or 6–7 (Easy)
   - `hints.vocabulary_bank` with distractors
   - `story_prompts.picture_mode` (W16-W35) OR `story_prompts.topic_mode` (W36+)
3. For picture_mode: include `image_prompt` (string)
4. Run validators

### 7.5 UI
- **3 tabs** (W16+): Video / Story / Speak
- **1 tab** (W1–W15): Video
- Sentence frame inputs with vocabulary bank
- Picture display (picture_mode) or topic selector (topic_mode)
- Record button for Speak tab

### 7.6 Tabs
| Tab | Component | Era |
|---|---|---|
| Video Challenge | `VideoChallenge` | W1–W15+ |
| Story Writing | `StoryWriting` | W16+ |
| Tell Your Story | `TellYourStory` | W16+ |

### 7.7 Schema

```js
export default {
  title: "Marco Polo's Journey — Adventure Story Writing",  // string
  theme: "adventure_stories",                              // string
  min_words: 65,                                            // ADV: 45, Easy: 30
  min_sentences: 8,                                         // ADV: 8, Easy: 6-7
  model_sentence: "Marco Polo left Venice when he was only 17 years old. He rode across high mountains...",  // ≥200 chars
  topic_talk_prompt: "Tell me about a trip or adventure...", // string
  prompt_en: "Write about an adventure. Use 5+ irregular verbs.",  // string
  prompt_vi: "Viet ve mot cuoc phieu luu.",                 // string
  sentence_frames: [
    { template: "Last summer, my family ___ (go) to the ocean.", answers: ["went"] },
    // 8 frames (ADV); 6-7 (Easy)
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "Can tro giup? Bam ben canh moi o",
      show_by_default: false,
      scaffolding_stage: "medium",        // "low" | "medium" | "high"
      words: [
        { word: "went", vi: "da di", distractor: false },
        // 1-3 distractor: true words
      ]
    }
  },
  story_prompts: {
    picture_mode: {                        // W16-W35
      type: 'picture',
      image_url: '/images/week36/story_writing_pic.jpg',
      image_prompt: "A young explorer... watercolor children book illustration style, no text on image.",
      word_bank: ["went on an adventure", "saw beautiful coral reefs", ...],
      sentence_frames: [                  // 8 frames
        { template: "Last summer, we ___ (go) on a submarine trip.", answers: ["went"] }
      ],
      writing_prompts: {
        en: "Look at the picture and write Marco Polo's adventure story.",
        vi: "Nhin hinh va viet cau chuyen phieu luu cua Marco Polo."
      },
      rubric_tier: 1                      // undocumented 1/2/3
    },
    topic_mode: {                          // W36+
      topics: [
        { id: "t1", title_en: "My favorite trip", vi: "...", en: "...",
          word_bank: ["went","saw","took"] }
      ]
    }
  }
}
```

### 7.8 Validation Rules
| Rule | Validator | Source |
|---|---|---|
| `model_sentence` ≥200 chars | **CHECK 19** | `code_quality_gate.sh` |
| `model_sentence` ≥45 words | **CHECK 19** | `code_quality_gate.sh` |
| `model_sentence` ≥6 sentences | **CHECK 19** | `code_quality_gate.sh` |
| `prompt_en` and `prompt_vi` present | **CHECK 19** | `code_quality_gate.sh` |
| 8 frames (ADV) | runtime | WriteAndSpeak.jsx |
| `image_prompt` present (picture_mode) | runtime | runtime |

### 7.9 Media Requirements

| Asset | Source | Storage |
|---|---|---|
| `image_url` (picture_mode) | **PROMPT ONLY** (orchestrator) — agent writes `image_prompt` only | R2 |
| Topic mode | NO MEDIA | n/a |
| Tell Your Story audio | MediaRecorder (in-browser) | IndexedDB |

**Agent rule**: NEVER create images directly. Agent ONLY writes the `image_prompt` string. Image pipeline orchestrator handles generation.

### 7.10 Cross-Station Dependencies
- `writing.js` ← `read.js` themes + `vocab.js` (vocabulary bank)
- `writing.js` `hints.vocabulary_bank.words[]` should include this week's vocab
- `writing.js` `model_sentence` should demonstrate this week's grammar

### 7.11 Generation Workflow
1. Read Syllabus for writing task
2. Write `model_sentence` (≥200 chars, ≥45 words, ≥6 sentences, this week's grammar)
3. Write 8 sentence frames
4. Build vocabulary bank (week vocab + 1-3 distractors)
5. Choose story_prompts mode (picture for W16-W35, topic for W36+)
6. For picture mode: write `image_prompt` (style: watercolor, no text on image)
7. Run validators

### 7.12 Known Implementation Differences
| Aspect | W35 | W36 | Canonical? |
|---|---|---|---|
| `theme` | "personal_growth" (BUG: W35 is environmental) | "adventure_stories" | Aligned (theme should match Syllabus) |
| `min_words` | 65 | 65 (consistent) | Aligned |
| `story_prompts` | `picture_mode` | `picture_mode` (W36 also keeps this) | Aligned (W36 should add `topic_mode`) |
| `rubric_tier` | 1 | 1 (consistent) | Undocumented tier |
| `image_prompt` | Verbose + style hint | Verbose + style hint | Aligned |

**🚨 CRITICAL FINDING — W35 writing.js THEME MISMATCH**: W35 ADV writing.js has `title: "Max's Big Change — Doing Things Carefully"` and `theme: "personal_growth"`, but W35's actual topic is "Environmental Issues" (per read.js, vocab.js, shadowing.js, week_35_real.js). This is a content defect — probably cloned from W34.

### 7.13 Blueprint Differences

| Aspect | Blueprint V5 | Implementation | Recommendation |
|---|---|---|---|
| Tab count | 3 (W16+) | 3 (W36) | Aligned |
| `min_words` ADV | 45 | 45 (W36) / 65 (W35) | Aligned |
| Sentence frames ADV | 8 | 8 | Aligned |
| `model_sentence` length | ≥200 chars | ≥200 chars | Aligned |
| `story_prompts.picture_mode` | W16-W35 | Same | Aligned |
| `story_prompts.topic_mode` | W36+ (planned) | Implemented | Aligned |
| Image prompt authoring | "agent writes prompt" | Same | Aligned |

### 7.14 Current Production Behaviour (W36 ADV)
- 8 sentence frames (Irregular Verbs)
- `min_words: 65`, `min_sentences: 8`
- `model_sentence` (≥200 chars, this week's grammar)
- `story_prompts.picture_mode` (no `topic_mode` yet)
- `vocabulary_bank` with 16 words (15 valid + 1-2 distractors)
- 2 tab navigation: Video / Story / Speak

### 7.15 Common Mistakes
1. **`model_sentence` <200 chars** — CHECK 19 fails
2. **Wrong theme** (W35 issue) — content defect
3. **No `image_prompt`** in picture_mode — orchestrator can't generate
4. **Agent creates images directly** — FORBIDDEN (agent writes prompts only)
5. **Distractors missing** — vocab bank quality degrades
6. **Frame count wrong** — 7 or 9 frames (should be 8 ADV / 6-7 Easy)

### 7.16 Future Extension Points
- **W40+ Debate station** (Blueprint V5 §II) — full 4-turn flow with persona
- **More story_prompts modes** (e.g., "video_mode" for W1-W15)
- **Rubric-based scoring** (use `rubric_tier`)

### 7.17 Approval Checklist (PO)
- [ ] `model_sentence` ≥200 chars, ≥45 words, ≥6 sentences
- [ ] 8 sentence frames (ADV) or 6-7 (Easy)
- [ ] `image_prompt` present (picture_mode)
- [ ] Agent writes prompts only — never creates images
- [ ] `theme` matches week's Syllabus topic (W35 fix needed)
- [ ] `vocabulary_bank` includes this week's vocab + 1-3 distractors

---

## §8. Cross-Station Dependency Map (All 7 Stations)

```
                          ┌── vocab.js (18 words, ipa, collocation, example, image)
                          │   ↓
                          │  ├─ new_words (index.js) ─── WordMatch (uses vocab.audio_word || audio_url)
                          │   │   ↓
                          │   │  WordMatch runtime reads `data.stations.new_words.vocab`
                          │   │
                          │   ├─ word_power.js (8 multi-word phrases)
                          │   │
                          │   ├─ ask_ai.js (target_vocab subset)
                          │   │
                          │   └─ shadowing_ipa.js (per-word IPA)
                          │
                          └── global_vocab (index.js) → AI Tutor target_vocab

read.js (content_en with **bold**) ──┬──► dictation.js (verbatim content_en + 10-12 sentences)
                                     │
                                     ├──► shadowing.js (verbatim content_en + 8-12 sentences)
                                     │   └──► shadowing_ipa.js (per-sentence IPA)
                                     │
                                     ├──► explore.js (similar topic, NOT identical)
                                     │
                                     └──► week_NN_real.js (chunk_focus from bold chunks)

grammar.js (20 exercises) ───────────────► week_NN_real.js (grammar_focus)

writing.js (model_sentence + sentence_frames + image_prompt) ──► WriteAndSpeak (3 tabs)
                                                                  └─ TellYourStory (record + AI score)

word_match.js (W36: 6 pairs) ──────────────► Decorative; runtime uses vocab.js

week_NN_real.js ───────────────────────────► AI Tutor (Story Missions + Spark Talk + Free Talk)
```

**Critical rule**: `read.js` is the **single source of truth** for content_en. `dictation.js` and `shadowing.js` MUST contain verbatim copies. If `read.js` changes, those two MUST be updated.

---

## §9. Common Patterns (Reusable Across Stations)

### 9.1 Progress System
- All stations use `useStationProgress(weekId, stationId)` hook
- Returns `{ savedData, saveProgress, markComplete, mode }`
- Auto-save debounce: 1500ms
- Mark complete when 100% reached

### 9.2 TTS Pattern
- `speakText(text, audioUrl, rate, onEnd, context, weekId, mode)` is universal
- All stations have `useTTSPrefetch` to warm cache
- Audio on-demand via Deepgram Worker + R2

### 9.3 Bilingual Toggle
- All stations accept `isVi` prop and `onToggleLang` callback
- Vietnamese label first in setup/summary, English first in inline controls

### 9.4 Answer Validation
- `analyzeAnswer(input, target, mode)` from `smartCheck`
- Modes: `'grammar'`, `'strict'`, `'academic'`
- Returns `{isCorrect, status, message_en, message_vi}`

### 9.5 Image Pattern
- `getImageUrl(path)` wraps data image paths for R2
- `<img src={getImageUrl(item.image_url)} />` everywhere
- All components import from `utils/imageUrl`

### 9.6 Flip Card Pattern
- 3D CSS transform: `perspective: 1000px`, `rotateY(180deg)`
- Used in VocabCard, PowerCard

### 9.7 Card Flipping (Memory Game)
- Fisher-Yates shuffle
- Max 2 cards flipped at once
- Lock animation during flip
- Match by `card1.id === card2.id`

---

## §10. Authoring Cheat Sheet (Quick Reference)

### For a new week W_NN:

1. **vocab.js** (18 words) — `word, pronunciation, definition_vi, definition_en, example, collocation, image_url, audio_word, audio_example, audio_collocation_0/1/2, audio_definition`
2. **word_match.js** (optional, 6 pairs) — `{ left_id, left_text, right_match, right_id }`
3. **grammar.js** (20 exercises) — `id, type, question_en, answer, hint, options?, words?`
4. **dictation.js** (10 sentences ADV / 8 Easy) — `content_en` (verbatim from read.js), `sentences[].text` (substring), `sentences[].meaning` (real Vietnamese)
5. **shadowing.js** (10 sentences) — `videoId?`, `content_en` (verbatim), `script[].text/vi`
6. **shadowing_ipa.js** (≥50% coverage) — `{ sentenceId: [{word, ipa, stress}] }`
7. **word_power.js** (8 multi-word phrases) — `word, pronunciation, definition_vi, definition_en, example, collocation, model_sentence, image_url, audio_word/definition/example/collocation/model`
8. **writing.js** (8 sentence frames) — `model_sentence` (≥200 chars), `sentence_frames[].template+answers`, `hints.vocabulary_bank`, `story_prompts.picture_mode.image_prompt`
9. **index.js** — `weekData.stations.{ new_words: vocab, word_match, grammar, dictation, shadowing, writing, ... }`
10. **Easy mode** — mirror all files, lower difficulty, independent content (not just translation)

### Validators to run:
```bash
bash production_kit/tools/preflight_check.sh
bash production_kit/tools/bug_prevention_check.sh N
bash production_kit/tools/code_quality_gate.sh N
node production_kit/tools/validate_sgmath_types.mjs N
node tools/validate_barmodels.js N
node tools/validate_video_thumbnails.js N
npm run content:lint -- --week N --errors-only
npm run dict:lint -- --errors-only
```

### Pipeline scripts to run:
```bash
node tools/image_pipeline/orchestrator.mjs --week N    # images
node tools/update_videos.js N --reset                   # Daily Watch
python3 tools/generate_logiclab_barmodels.py N --skip-existing  # bar models
node tools/fetch_video_transcripts.js --only N          # shadowing transcripts
node tools/clean_transcripts.mjs
python3 tools/split_transcripts.py
```

---

## §11. Summary — What Runtime Needs to Survive Blueprint Evolution

For the runtime to evolve with new Blueprint versions automatically, it needs:

1. **Schema-driven validators** — instead of hardcoded CHECK 20/27/etc, use a manifest that maps station + field → rule
2. **Field aliasing** — accept `definition_vi` OR `meaning_vi`, `question_en` OR `question` OR `sentence`, etc.
3. **Auto-discovery of new tabs** — `index.js` station registry should iterate, not hardcode
4. **Auto-derivation of `global_vocab`** — already done
5. **Hook composition for Shadowing** — TDZ-safe composition via callbacks
6. **Per-station progress schema** — already `useStationProgress` abstracted
7. **Media classification per asset** — already in place (NO MEDIA / PROMPT ONLY / AUTO GENERATED / EXTERNAL SEARCH / ON-DEMAND)

For W37+ (no Blueprint yet), the runtime should be:
- Generic: derive station count from `weekData.stations` object keys
- Tolerant: ignore unknown fields, accept legacy aliases
- Validated: enforce what production rules already require
- Documented: this spec is the source of truth

---

*End of LANGUAGE_CORE_SPEC.md*

---

## §12. Educational Design Rules (Chief Learning Architect)

> **Source of truth:** Blueprint V5 §Grammar Progression, §Word Count Scaffolding, §70/30 Vietnamese
> **Purpose:** Allows a new Agent to determine "how hard a week should be" and "what is appropriate for this week"
> **Status:** Extracted from production — NOT invented

### 12.1 CEFR Progression Table

| Week Range | CEFR Level | Phase | Read Word Count (ADV) | Read Word Count (Easy) |
|---|---|---|---|---|
| W1-W11 | A1 | 1 | 85-135 | 80-130 |
| W12-W15 | A1 (with Present Continuous) | 1 | 85-135 | 80-130 |
| W16-W21 | A1→A2 (Present Continuous + Past Simple) | 2 | 145-215 | 110-160 |
| W22-W27 | A2 (Past Simple) | 2 | 145-215 | 110-160 |
| W28-W39 | A2→B1 (Past Simple + Past Continuous) | 3 | 145-220 | 145-220 |
| W40-W48 | B1 (Comparative -er, more than) | 3 | 145-220 | 145-220 |
| W49-W54 | B1 (Superlative -est, most) | 3 | 145-220 | 145-220 |
| W55-W156 | B1+ (Past Continuous, Present Perfect) | 3 | 145-220 | 145-220 |

**Hard cap (W54):** ADV 230 / Easy 200. Do NOT exceed.

### 12.2 Grammar Progression Table

| Week Range | Allowed Grammar Structures |
|---|---|
| W1-W11 | Present Simple ONLY |
| W12-W21 | + Present Continuous |
| W22-W39 | + Past Simple (regular + irregular) |
| W40-W48 | + Comparative (-er, more than) |
| W49-W54 | + Superlative (-est, most) |
| W55+ | + Past Continuous, Present Perfect |

**Rule:** Content MUST NOT use grammar structures not yet taught by that week.

### 12.3 Vocabulary Introduction Rate

| Week Range | Vocab Count per Week | Banned Vocab (Easy only) |
|---|---|---|
| W1-W15 | 10 words | B1+ terms (forensic, neuroscience, etc.) |
| W16-W27 | 13 words | None |
| W28+ | 18 words | None |

**Rule:** Maximum new vocabulary per week is the table value. Agent MUST NOT exceed.

### 12.4 Sentence Length Limits (recommended, not yet enforced)

| Week Range | Maximum Sentence Length (words) |
|---|---|
| W1-W15 | 12 words (A1) |
| W16-W27 | 15 words (A1→A2) |
| W28+ | 20 words (A2→B1) |

**Status:** Recommended only. No validator yet.

### 12.5 Speaking Progression

| Week Range | Shadowing Min Sentences | Writing Min Words (ADV) | Writing Min Words (Easy) |
|---|---|---|---|
| W1-W15 | 4-6 (W1-15 era) | 30 | 20 |
| W16-W27 | 6-8 | 35 | 25 |
| W28+ | 8-12 | 45 | 30 |

**Status:** Extracted from W36 golden standard.

### 12.6 Learning Rhythm

- **Time per week:** ≤60 minutes total (Blueprint limit)
- **Logic Lab:** 15 questions max (≈25 min)
- **Reading passage:** target 4-7 minutes for students
- **Writing task:** target 5-10 minutes for students
- **Shadowing practice:** target 3-5 minutes per sentence

### 12.7 Universal vs Vietnamese Balance

| Mode | Vietnamese Content Ratio |
|---|---|
| Easy Mode (Universal week) | 0% Vietnamese content |
| Easy Mode (Vietnamese week) | 30-40% (2-3 sentences) |
| Advanced Mode (Universal week) | 0% Vietnamese content |
| Advanced Mode (Vietnamese week) | 60-70% (5-6 sentences) |

**Vietnamese weeks (W16-W54):** W22, W27, W30, W33, W35, W37, W42, W45, W48, W50, W52

**Rule:** `content_vi` MUST be plain text (NO `**bold**` markers — see CHECK 20i).

### 12.8 STEM/Social Balance (W35+)

| Week Type | Logic & Science | Singapore Math | Social Quiz | Total |
|---|---|---|---|---|
| STEM-heavy | 7-8 | 5 | 3-4 | 15-17 |
| Social-heavy | 3-5 | 5 | 7-8 | 15-18 |
| Balanced | 5 | 5 | 5 | 15 |

**Rule:** Singapore Math ALWAYS has exactly 5 questions. Logic & Science + Social Quiz share remaining slots.

### 12.9 Station Difficulty Balance

A week's stations should NOT be all hard or all easy. Recommended balance:
- 1-2 stations: drill/practice (lower cognitive load)
- 3-4 stations: comprehension/application (medium load)
- 1-2 stations: production (speaking/writing — high load)

### 12.10 Review Frequency

- **Vocabulary review:** Every 4 weeks, prior week vocab appears in `read.js` content
- **Grammar review:** Cumulative — each new grammar structure builds on prior
- **Shadowing IPA:** Reuse from `shadowing_ipa.js` (no re-generation)
- **Cross-station propagation:** grammar_focus + chunk_focus propagate to all stations

### 12.11 Cognitive Load Rules

- **Comprehension questions:** W1-W16 = 3 questions, W17+ = 4 questions (per `read.js`)
- **Grammar exercises:** exactly 20 (hard rule)
- **Word Power items:** W1-W15 ≥6, W16-W27 = 6, W28+ = 8
- **Dictation sentences:** W1-W15 = 4-6, W16-W27 = 8-10, W28+ = 10-12

### 12.12 Educational Rules per CEFR Level

| Level | Grammar Density (per passage) | Vocab Density (per passage) | Sentence Complexity |
|---|---|---|---|
| A1 (W1-W15) | ≤1 new structure | ≤3 new words | Simple subject-verb-object |
| A2 (W16-W27) | ≤2 new structures | ≤5 new words | Compound sentences allowed |
| B1 (W28+) | ≤3 new structures | ≤8 new words | Complex sentences, subordination |

---

## §13. Knowledge Graph — Cross-Station Regeneration Rules

> **Purpose:** When an Agent edits one station, this graph tells what else MUST regenerate.

### 13.1 Forward Dependencies (Station A changes → what else changes?)

| When this station changes... | These stations MUST be re-checked or regenerated |
|---|---|
| **read.js** | dictation.js (content_en), shadowing.js (content_en), explore.js (similar topic), week_NN_real.js (chunk_focus), grammar.js (readingscaffold) |
| **vocab.js** | word_power.js (8 phrases), ask_ai.js (target_vocab), week_NN_real.js (target_vocab), shadowing_ipa.js (per-word IPA), word_match.js (vocab-driven runtime) |
| **grammar.js** | week_NN_real.js (grammar_focus, grammar_examples), read.js (must use only taught grammar — CHECK 38) |
| **shadowing.js** | shadowing_ipa.js (per-sentence IPA), video_queries.json (native video selection) |
| **writing.js** | model_sentence (must use only taught grammar), vocabulary_bank (from vocab.js) |
| **mindmap.js** | must use only taught grammar (CHECK 21), 36 audio entries |
| **daily_watch.js** | grammar relevance (Decision #3), video_queries.json |
| **social_quiz.js** | geography/history alignment with week's theme |
| **singapore_math.js** | 5 problems with valid types (CHECK 18), ADV ≥2-digit numbers |
| **logic_science.js** | ≥3 questions aligned with week's theme |

### 13.2 Backward Dependencies (Station A requires what?)

| Station | Requires (must exist first) |
|---|---|
| **dictation.js** | read.js content_en (verbatim) |
| **shadowing.js** | read.js content_en (verbatim) |
| **shadowing_ipa.js** | shadowing.js script[].text |
| **word_power.js** | vocab.js (8 phrases selected from vocab) |
| **word_match.js** | vocab.js (runtime reads vocab directly, not word_match.pairs) |
| **ask_ai.js** | vocab.js (target_vocab subset) |
| **week_NN_real.js** | read.js (chunk_focus), grammar.js (grammar_focus), vocab.js (target_vocab) |
| **video_queries.json** | week's grammar + vocab (for grammar relevance) |

### 13.3 Regeneration Decision Tree

```
Agent edits read.js
  ↓
Does content_en change?
  ├── YES → must regenerate:
  │   ├── dictation.js (verbatim content_en)
  │   ├── shadowing.js (verbatim content_en)
  │   ├── shadowing_ipa.js (per-word IPA if sentence text changes)
  │   └── week_NN_real.js (chunk_focus if bold chunks change)
  └── NO → no regeneration needed

Agent edits vocab.js
  ↓
Does any word's image_url change?
  ├── YES → must re-upload image
  └── NO → no regeneration

Agent edits grammar.js
  ↓
Does grammar_focus or grammar_examples change?
  ├── YES → must regenerate:
  │   ├── week_NN_real.js (grammar_focus, grammar_examples)
  │   └── CHECK 38 (verify read.js uses only taught grammar)
  └── NO → no regeneration

Agent edits shadowing.js
  ↓
Does videoId change?
  ├── YES → must regenerate:
  │   ├── video_queries.json
  │   ├── YouTube transcript pipeline (3-stage)
  │   └── shadowing_ipa.js if sentences change
  └── NO → only IPA may need re-check
```

### 13.4 Cross-Station Consistency Checks

These checks are currently in `code_quality_gate.sh`:
- CHECK 20d: dictation sentence count = read.js sentence count
- CHECK 35: Easy vocab count = ADV vocab count
- CHECK 36: read.js contains ≥50% of vocab words
- CHECK 38: read.js -ed verb forms (past tense) consistency
- CHECK 42: dictation/shadowing content_en matches read.js

---

## §14. Station Contract Templates

> **Purpose:** Uniform definition of what every station MUST contain
> **Pattern:** Already present in §1.17 (Vocab approval checklist). This section extends to ALL 7 stations.

### 14.1 Station Contract Schema (for every station)

For each station, the contract MUST document:
- **Required outputs** — fields that MUST exist (hard validators)
- **Optional outputs** — fields that MAY exist (forward-compatible)
- **Human-generated assets** — what a human must create
- **AI-generated assets** — what the Agent can generate
- **Validation ownership** — which Runtime validates this station
- **Media ownership** — which Runtime generates media for this station
- **Cross-station dependencies** — what other stations read this station's data
- **Acceptance criteria** — definition of done

### 14.2 Vocab Station Contract (EXAMPLE — already documented in §1.17)

See §1.17 for full Vocab contract.

### 14.3 Word Match Station Contract

- **Required outputs:** `pairs[]` array with object items (not bare numbers)
- **Optional outputs:** `title`, `theme`, `instruction_en`, `instruction_vi`
- **Human-generated assets:** None (vocab-driven)
- **AI-generated assets:** Game card generation
- **Validation ownership:** VALIDATION (CHECK 5)
- **Media ownership:** Runtime reads `vocab.js` images/audio directly
- **Cross-station dependencies:** Reads `data.stations.new_words.vocab` (which IS vocab.js)
- **Acceptance criteria:** Pairs are objects, 3 modes (meaning/image/audio) work

### 14.4 Grammar Station Contract

- **Required outputs:** `exercises[]` array of exactly 20 items
- **Optional outputs:** `rule`, `grammar_explanation` block
- **Human-generated assets:** None (all AI-generated)
- **AI-generated assets:** All exercises + rule + explanation
- **Validation ownership:** VALIDATION (CHECK 20b, CHECK B7, CHECK B8, CHECK B9, CHECK 32, CHECK B10)
- **Media ownership:** NO MEDIA
- **Cross-station dependencies:** grammar_focus propagates to read.js, week_NN_real.js
- **Acceptance criteria:** Exactly 20, answer: not correct:, unscramble has words[] array

### 14.5 Dictation Station Contract

- **Required outputs:** `content_en` (verbatim from read.js), `sentences[]` (10-12 ADV / 8-10 Easy)
- **Optional outputs:** `audio_url` per sentence
- **Human-generated assets:** Vietnamese `meaning` per sentence (REQUIRED, not "Vietnamese meaning here" placeholder)
- **AI-generated assets:** Audio (on-demand via Deepgram)
- **Validation ownership:** VALIDATION (CHECK 17, CHECK 20d, CHECK 42, CHECK B22)
- **Media ownership:** MEDIA (on-demand TTS via Deepgram Worker + R2)
- **Cross-station dependencies:** content_en verbatim from read.js
- **Acceptance criteria:** content_en matches read.js exactly, sentences substring of read.js, all meaning real Vietnamese

### 14.6 Shadowing Station Contract

- **Required outputs:** `content_en` (verbatim from read.js), `script[]` (10-12 ADV / 8-10 Easy)
- **Optional outputs:** `videoId`, `ttsScript`
- **Human-generated assets:** IPA per word (in shadowing_ipa.js), Vietnamese `vi` per sentence
- **AI-generated assets:** YouTube transcript (3-stage pipeline), corrections API, AI translate fallback
- **Validation ownership:** VALIDATION (CHECK 19.5, CHECK 42, CHECK B22)
- **Media ownership:** MEDIA (YouTube API, transcript pipeline, IPA, audio)
- **Cross-station dependencies:** content_en from read.js, IPA from CMU dict (fallback)
- **Acceptance criteria:** content_en matches read.js, sentences substring, ≥50% IPA coverage, valid videoId

### 14.7 Word Power Station Contract

- **Required outputs:** `words[]` array of 8 (W28+) or 6 (W16-W27) multi-word phrases
- **Optional outputs:** `title`, `audio_url`
- **Human-generated assets:** None (all AI-generated)
- **AI-generated assets:** All 8 phrases + 5 audio slots per phrase
- **Validation ownership:** VALIDATION (CHECK 20)
- **Media ownership:** MEDIA (5 audio slots per phrase via on-demand TTS)
- **Cross-station dependencies:** Phrases selected from vocab.js
- **Acceptance criteria:** All words are multi-word phrases, exactly 8/6 items, 5 audio slots

### 14.8 Writing Station Contract

- **Required outputs:** `model_sentence` (≥200 chars, ≥45 words, ≥6 sentences), `sentence_frames[]` (8 ADV / 6-7 Easy), `hints.vocabulary_bank`
- **Optional outputs:** `story_prompts.picture_mode`, `story_prompts.topic_mode`
- **Human-generated assets:** Topic selection (PO), image (if picture_mode)
- **AI-generated assets:** model_sentence, sentence_frames, vocabulary_bank, image_prompt
- **Validation ownership:** VALIDATION (CHECK 19)
- **Media ownership:** MEDIA (image generation from image_prompt)
- **Cross-station dependencies:** vocabulary_bank from vocab.js, model_sentence from read.js
- **Acceptance criteria:** model_sentence length, frame count, vocabulary_bank has distractors, image_prompt is well-formed string

### 14.9 IPA Ownership Clarification

- **Schema ownership:** LANGUAGE Runtime (shadowing_ipa.js format)
- **Manual authoring:** LANGUAGE Runtime (authoring concern)
- **Auto-generation from CMU dict:** MEDIA Runtime (ipaUtils.js + CMU dict)
- **Rendering (stress colors, US→UK):** LANGUAGE Runtime (UI concern)
- **Quality requirement:** ≥50% coverage per week (recommended validator, not yet enforced)

---

*End of LANGUAGE_CORE_SPEC.md (v1.1)*
