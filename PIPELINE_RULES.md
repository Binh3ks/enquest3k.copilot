# PIPELINE_RULES.md — Frozen Audio-Transcript Pipeline

> **FROZEN**: 2026-07-22 | **Authority**: User (binh4k)
> **Enforced by**: `force_align_transcript.py` (locked script)

---

## Rule 1: SINGLE SOURCE OF TRUTH

**All transcripts MUST come directly from raw audio via Deepgram.**

- The only acceptable source for transcript text and timestamps is the Deepgram Nova-2 API response.
- YouTube auto-captions are NOT a valid transcript source.
- Manual text construction is NOT allowed.
- If audio changes, the transcript MUST be re-generated from scratch.

---

## Rule 2: NO LLM HALLUCINATIONS

**AI models (Claude, GPT, Gemini, etc.) are STRICTLY FORBIDDEN from:**

- Generating, rewriting, summarizing, or paraphrasing transcript text
- Guessing or interpolating timestamps (L2 or L3)
- Constructing sentences that don't exist in the audio
- Modifying the `text` field of any segment after Deepgram produces it
- Adding, removing, or merging utterances

The `text` field in every segment is a **1:1 mathematical copy** of Deepgram's `transcript` field. This is non-negotiable.

---

## Rule 3: 1:1 MAPPING

**The frontend MUST rely exclusively on the `words[]` array for karaoke highlighting.**

Each segment in the JSON contains:
- `words[]` — L3 word-level timestamps from Deepgram (physical `start`/`end` times)
- `start` — L2 sentence start = first word's `start`
- `duration` — L2 sentence duration = last word's `end` − first word's `start`

The karaoke highlighter in `useWordHighlight.js` must use `sentence.words[]` when available. The synthetic fallback (evenly-distributed 0.4s/word) is ONLY for segments without L3 data (which should never exist in a properly aligned file).

---

## Rule 4: VIDEO CURATION (MANDATORY)

**Every video selected for the shadowing station MUST pass ALL four criteria:**

### 4a. Exact Grammar Match
The video's primary tense and structure MUST exactly match the lesson's target grammar.
- Lesson = Present Simple → video MUST use Present Simple
- Lesson = Past Simple → video MUST use Past Simple
- **AUTOMATIC FAIL** if video tense doesn't match lesson grammar

### 4b. Topic Alignment
The video context MUST match the curriculum theme.
- Example: "The Sequence" lesson → video MUST contain sequence words (First, Next, Then)
- Example: "Prepositions" lesson → video MUST demonstrate prepositions (in, on, under)

### 4c. Natural Speech Requirement
Videos MUST contain natural phrasing, dialogues, or narratives.
**AUTOMATIC FAIL for:**
- Chanting or repetitive flashcard-style audio
- Songs or music videos
- List-reading (vocabulary lists without context)
- Scripted recitation without natural flow

### 4d. Age Appropriateness
Content, speed, and vocabulary MUST be suitable for kids aged 6-12 (A1+ level).
- Speed: natural conversational pace (not accelerated)
- Vocabulary: simple, everyday words
- Content: school, family, pets, food, weather — age-appropriate topics

---

## Rule 5: SEGMENTATION (MANDATORY)

**All transcript segments MUST comply with these rules:**

### 5a. Hard Length Cap
No segment can exceed **15 words**. This is a hard limit for ESL shadowing.

### 5b. Forced Clause Splitting
If a sentence is long, force-split at:
- **Conjunctions**: and, but, so, because, then, which, who, where, when, if
- **Commas**: already present in the text
- **Fallback**: hard split at 15 words if no clean boundary exists

### 5c. Semantic Integrity
Every forced split MUST result in a syntactically digestible chunk:
- Complete clause (S + V + O)
- Complete dependent clause
- Natural interjection ("Yes." "OK." "I know.")

**NEVER leave dangling:**
- Auxiliary verbs: "is", "are", "was", "have", "can"
- Prepositions: "in", "on", "at", "to", "for", "with"
- Conjunctions: "and", "but", "so", "because"
---

## Rule 6: LEXICAL CHUNK CREATION RULES (MANDATORY)

**All highlighted chunks in reading, vocabulary, and grammar stations MUST be syntactically & semantically complete ESL phrasal units:**

### 6a. Allowed Chunk Types
- **Phrasal Verbs & Verb-Preposition Combinations**: `went on an adventure`, `dove down into`, `crashed inside`, `wrote down`, `came back`, `got lost`
- **Verb + Noun Phrase (Collocations)**: `made an important discovery`, `took our breath away`, `gave all our findings`, `spoke many languages`, `saw magnificent coral reefs`
- **Noun Phrases & Terminology**: `underwater cave`, `gold compass`, `coral reef`, `Silk Road`, `government official`
- **Fixed Prepositional & Temporal Expressions**: `a wall of`, `hundreds of years ago`, `on the Silk Road`

### 6b. Strictly Forbidden (BANNED CHUNKS)
- **NEVER pair a Verb with an isolated Adjective/Determiner/Pronoun**:
  - ❌ `saw magnificent` (MUST BE: `saw magnificent coral reefs` or `magnificent coral reefs`)
  - ❌ `saw old` (MUST BE: `saw old objects` or `old objects`)
  - ❌ `sank many` (MUST BE: `sank hundreds of years ago`)
  - ❌ `took our` (MUST BE: `took our breath away`)
  - ❌ `said it`, `knew we`, `made an`, `held many`, `began to`
---

## Rule 7: LOGIC & SCIENCE STATION STANDARDS (MANDATORY)

**All questions in `logic_science.js` MUST adhere to these strict curriculum rules:**
1. **100% Story-Bound (Context-Bound)**: Questions MUST be based directly on the week's 2 reading passages (`read_stem` and `read_social`).
2. **Context Clue Box**: Every question MUST include a `clue_statement` or `passage_en` that displays on screen as a reference context for the student to read and reason from.
3. **Interactive MCQ (4 Options)**: 100% of questions must use Multiple Choice (4 options) with instant explanation feedback (`explanation_en`). Open-ended essay textareas are strictly forbidden for Logic & Science.
4. **Age-Appropriate (A1+ Level)**: Puzzles must focus on basic science reasoning (e.g. darkness in deep ocean, compass magnetism) and simple logical deduction/arithmetic (e.g. depth calculations, time differences).

---

## Rule 8: ASK AI STATION STANDARDS (MANDATORY)

**All prompts in `ask_ai.js` MUST follow this inquiry scaffolding structure:**
1. **Nova Inquiry Cue (`nova_says`)**: Nova MUST present a scenario cue inviting the student to ask a question (e.g. *"I know where Marco Polo travelled on his famous journey. Ask me!"*). Plain statements of answers are forbidden.
2. **Scaffolded Question Frame (`question_frame`)**: Contains a blank `___` at the start (e.g. `"___ Marco Polo go on his journey?"`).
3. **Starter Bank (`question_word_bank`)**: A list of 4 Wh-starters (e.g. `["Where did", "How long did", "When did", "Why did"]`).
4. **Target Starter (`correctWord`)**: MUST be grammatically aligned with `question_frame` to form a 100% natural, correct Wh-question (e.g. `"Where did"` + `"___ Marco Polo go on his journey?"` = *"Where did Marco Polo go on his journey?"*).
5. **Mic Speaking**: After selecting the correct starter pill, the student speaks the full question aloud to Nova via Microphone.

---

## Rule 9: VITE BUILD & CACHE INVALIDATION STANDARDS (MANDATORY)

**To prevent stale dynamic import 404s and browser HTTP cache sticking across redeployments:**
1. **Strict Chunk Regex**: `chunkFileNames` in `vite.config.js` MUST use strict regex matching (`/\/week_(\d+)\/index\.js$/i`) so backup folders (e.g. `week_16_BACKUP/`) do not cause chunk name collisions.
---

## Rule 10: SINGAPORE MATH BAR MODEL STANDARDS (MANDATORY)

**All problems in `singapore_math.js` MUST include visual Bar Model representations:**
1. **Mandatory Bar Model Image (`bar_model`)**: Every problem MUST have a corresponding SVG diagram in `public/images/weekXX/barmodel_wXX_adv_pY_v1.svg` (or `.png`).
2. **Standard Model Types**:
   - **Part-Whole Model (`type: "part_whole"`)**: Top total bracket bar + partitioned lower bars showing parts and unknown `?`.
   - **Comparison Model (`type: "comparison"`)**: Two stacked horizontal bars comparing quantities with a red dashed difference bracket `?`.
   - **Equal Groups Model (`type: "groups"`)**: Multiple equal-sized block bars representing multiplication/division groups.
3. **Graceful Fallback**: If an image is missing, `SingaporeMathDisplay.jsx` MUST reset `imgFailed` on problem switches and render step-by-step mathematical reasoning.

---

## Frozen Script Parameters

`tools/force_align_transcript.py` uses these Deepgram parameters **exactly**:

| Parameter | Value | Purpose |
|-----------|-------|---------|
| `model` | `nova-2` | Deepgram Nova-2 model |
| `timestamps` | `true` | L3 word-level timestamps |
| `diarize` | `true` | Speaker diarization |
| `smart_format` | `true` | Punctuation + formatting |
| `utterances` | `true` | Utterance-level segmentation |
| `language` | `en` | English |

**Do NOT add, remove, or change any parameter without explicit user authorization.**

---

## Golden Schema (curo8LPPA5Y.json)

### Top-level structure

```json
{
  "videoId": "curo8LPPA5Y",
  "fetchedAt": "2026-07-22T...",
  "segments": [ ... ],
  "speakerMap": { "0": "Anna", "1": "John", "2": "Narrator" },
  "alignment": {
    "engine": "deepgram-nova-2",
    "alignedAt": "2026-07-22T...",
    "dgWordCount": 610,
    "dgUtteranceCount": 82,
    "matchedSegments": 82,
    "totalDuration": 327.46
  }
}
```

### Segment structure (per utterance)

```json
{
  "id": 6,
  "text": "Do you come here often?",
  "speaker": "John",
  "start": 27.27,
  "duration": 1.37,
  "words": [
    { "word": "do",      "start": 27.27, "end": 27.43, "confidence": 0.997 },
    { "word": "you",     "start": 27.43, "end": 27.59, "confidence": 1.000 },
    { "word": "come",    "start": 27.59, "end": 27.82, "confidence": 1.000 },
    { "word": "here",    "start": 27.82, "end": 28.14, "confidence": 1.000 },
    { "word": "often",   "start": 28.14, "end": 28.64, "confidence": 0.998 }
  ],
  "confidence": 0.999
}
```

### Field definitions

| Field | Type | Source | Description |
|-------|------|--------|-------------|
| `id` | int | Sequential | Segment number (1-indexed) |
| `text` | string | Deepgram `utterances[].transcript` | **EXACT** Deepgram text — NEVER modified |
| `speaker` | string | `speakerMap[utterance.speaker]` | Speaker name from diarization |
| `start` | float | First word `words[].start` | L2 start time (seconds) |
| `duration` | float | Last word `end` − first word `start` | L2 duration (seconds) |
| `words[]` | array | Deepgram `words[]` filtered by time range | L3 word-level timestamps |
| `words[].word` | string | Deepgram `words[].word` | Individual word text |
| `words[].start` | float | Deepgram `words[].start` | Word start time (seconds) |
| `words[].end` | float | Deepgram `words[].end` | Word end time (seconds) |
| `words[].confidence` | float | Deepgram `words[].confidence` | Deepgram confidence (0-1) |
| `confidence` | float | Deepgram `utterances[].confidence` | Utterance-level confidence |

---

## How to Run for a New Week

```bash
# 1. Ensure DEEPGRAM_API_KEY is in .env
grep DEEPGRAM_API_KEY .env

# 2. Run the frozen pipeline
python3 tools/force_align_transcript.py <videoId>

# 3. Verify output
python3 -c "
import json
d = json.load(open('src/data/video_transcripts_by_id/sentences/<videoId>.json'))
segs = d['segments']
print(f'{len(segs)} segments, {sum(len(s[\"words\"]) for s in segs)} words')
print(f'Duration: {segs[-1][\"start\"] + segs[-1][\"duration\"]:.2f}s')
assert all(s['words'] for s in segs), 'Missing L3 data!'
print('All segments have L3 words ✓')
"

# 4. Build
npm run build
```

---

## What Changed vs Previous Approach

| Aspect | Old (Broken) | New (Frozen) |
|--------|-------------|--------------|
| Text source | YouTube auto-captions + LLM rewrite | Deepgram Nova-2 on raw audio |
| Timestamps | Manual guesswork / LLM interpolation | Deepgram word-level acoustic analysis |
| Segments | Manually constructed 29 sentences | Deepgram utterances (1:1) |
| L3 words[] | Synthetic 0.4s/word | Physical start/end from audio |
| Hallucinations | Sentences 16-29 were fabricated | Zero — text is 1:1 from Deepgram |
| Duration covered | ~60s (subset) | Full video (327s) |

---

## Violations

Any future modification to `force_align_transcript.py` or the transcript JSON that:
- Rewrites transcript text
- Adds/removes timestamps
- Injects sentences not in the audio
- Changes Deepgram API parameters

...is a **pipeline violation** and MUST be reverted.

---

## Rule 11: AI TUTOR CONTENT & PEDAGOGY STANDARDS (MANDATORY)

**All AI Tutor content across all weeks MUST strictly follow these pedagogical & structural rules:**

### 11a. Story Mission 1 & 2: Reading Passage Retell & Memory Recall
- **Core Objective**: Help students **recall, summarize, and retell the key events from the 2 Reading Station passages (`read_stem` and `read_social`)** using the week's target grammar focus.
- **NO Repeated Intros**: Turn 2 MUST NEVER re-recite the opening narrative. After student's opening reply (e.g. "yes"), Nova/Character MUST immediately jump to Question 1 of the story arc.
- **NO Childish / Silly Questions**: Banned trivial A0 questions like *"Is it blue, red or yellow?"*, *"Is it a boat, car or plane?"*, or looping *"What is my job?"*. Scaffolding must use meaningful full-sentence options (`Say: We dove 300 metres into the ocean, or We dove into a deep cave`).
- **Target Grammar Enforcement**: Scaffolding templates and hints MUST enforce the week's exact target grammar (e.g. Irregular Past Tense: `went`, `dove`, `saw`, `found`, `took`, `came`, `gave`, `rode`, `met`, `wrote`).
- **End with Personal Connection**: The final turn of Story Mission 1 & 2 should naturally bridge the story to the student (e.g. *"Would you like to explore an underwater cave?"*).

### 11b. Free Talk & Creative Missions: Student Personal Application
- **Core Objective**: Shift focus **100% to the student's own life, personal experiences, and imagination**.
- **Week-Specific Topics**: `spark_talk` in `week_XX_real.js` MUST provide topics inspired by the week's theme (e.g. "My Greatest Adventure", "If I Met an Explorer"), NOT generic fallback topics.

