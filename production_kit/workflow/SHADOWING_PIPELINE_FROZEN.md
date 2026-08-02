# Shadowing Pipeline — FROZEN (Aug 1, 2026)

> **NEVER change this pipeline without explicit user approval.**
> Any modification must be documented here with date + reason.

---

## Architecture Overview

```
Phase 1: Find Video        Phase 2: Transcript         Phase 3: Validate
─────────────────          ──────────────────          ──────────────────
YouTube Data API           youtube-transcript-api      audit_transcript_match.cjs
LLM evaluation             Manual sentence splitting   node -c (syntax)
Video selection            Deepgram alignment          npm run build
                           fix_sentence_formatting     fix_sentence_formatting
```

**Data flow:**
```
YouTube video
  → youtube_transcript_api (raw captions)
  → Manual sentence splitting by meaning
  → sentences/<videoId>.json
  → Deepgram alignment (optional)
  → shadowing.js (TTS mode)
  → App renders Transcript panel
```

---

## Phase 1: Video Selection

**Tool:** `scripts/batch_search.cjs` + `scripts/search_w34.cjs`
**API:** YouTube Data API v3
**Output:** videoId stored in `shadowing.js`

### Rules:
1. Video must be age-appropriate for Vietnamese K-12 students
2. Video must contain clear spoken English (not music-heavy)
3. Duration: 2-5 minutes preferred
4. Channel must be educational/kids content
5. Video auto-captions must be available (English)
6. Syllabus alignment: video topic must match week's grammar/vocab focus

### Output format in `shadowing.js`:
```js
export default {
  videoId: "XXXXXXXXXX",  // YouTube video ID
  content_en: "...",       // TTS content (from syllabus, NOT video transcript)
  script: [...]            // TTS script with vi translations
};
```

---

## Phase 2: Transcript Creation

### Step 1: Fetch raw captions
**Tool:** `youtube_transcript_api` (Python)
**Command:**
```python
from youtube_transcript_api import YouTubeTranscriptApi
items = YouTubeTranscriptApi().fetch(video_id)
```

### Step 2: Manual sentence splitting by meaning (MANDATORY)
**NO LLM splitting.** Split manually based on:

**Split rules (FROZEN — do not change):**
1. **ALWAYS split at sentence-ending punctuation**: . ? ! → next segment = new sentence. **NEVER merge a question with its answer.**
2. **Split at dialogue turns**: Each speaker's new thought = new sentence. After a question (?), the answer is ALWAYS a new sentence from a different speaker.
3. **Split at clause boundaries**: "while", "but", "and then", "so", "because" often start new sentences
4. **Split at scene changes**: "In no time, ..." = new scene = new sentence
5. **Split at subject changes**: Different subjects = different sentences
6. **NEVER force-merge fragments** just because they're adjacent
7. **Preserve exact words** from auto-caption — do NOT fabricate, add, or remove
8. **Title/scene-setting** ("The ant and the grasshopper") = separate segment, NOT merged with dialogue
9. **"while under the tree"** is a sentence STARTER, not a continuation of previous sentence
10. **Single-sentence rule**: Each segment = one complete thought. "I like fish." = 1 sentence. "What food do you like?" = 1 sentence. NEVER: "What food do you like? I like fish." as ONE segment.

**Pattern:** If fragment A ends with . ? ! and fragment B starts, B is ALWAYS a new sentence regardless of word count.

### Step 3: Format sentence file
**Output:** `src/data/video_transcripts_by_id/sentences/<videoId>.json`

**Schema (FROZEN):**
```json
{
  "text": "Full concatenated text of all sentences...",
  "segments": [
    {
      "id": 1,
      "text": "Chirp chirp! I love summer!",
      "start": 18.0,
      "duration": 5.12
    }
  ],
  "videoId": "XXXXXXXXXX",
  "source": "youtube-transcript-api",
  "formattedAt": "2026-08-01T00:00:00.000Z"
}
```

**Rules:**
- `text` field = concatenated sentences with spaces (for full-text search)
- `segments[].text` = clean sentence with proper capitalization + punctuation
- `segments[].start` = start time in seconds (from video)
- `segments[].duration` = duration in seconds
- Each segment = one complete thought / sentence
- NO segments with only 1-2 words unless they're complete sentences ("Oh, I'm so hungry.")

### Step 4: Deepgram alignment (optional, for precision)
**Tool:** `scripts/sync_timestamps.cjs`
**API:** Deepgram Nova-2
**Command:** `DEEPGRAM_API_KEY=xxx node scripts/sync_timestamps.cjs <weekNum>`
**Purpose:** Re-align timestamps using actual audio, not just YouTube caption timings

### Step 5: Safe formatting cleanup (optional)
**Tool:** `scripts/fix_sentence_formatting.cjs`
**Command:** `node scripts/fix_sentence_formatting.cjs <weekNum>`
**Purpose:** Fix dangling prepositions, merge short fragments
**CAUTION:** This tool is conservative — it may over-merge. Use only when needed.

---

## Phase 3: Validation

### Automated checks:
```bash
# Syntax check (MANDATORY)
node -c src/data/video_transcripts_by_id/sentences/<videoId>.json

# Build check (MANDATORY)
npm run build

# Transcript match audit (MANDATORY)
node scripts/audit_transcript_match.cjs
```

### Manual checks (before commit):
1. **Sentence count:** Should be 15-40 sentences for a 2-5 min video
2. **First sentence:** Must NOT be a title merged with dialogue
3. **Dialogue turns:** Each speaker's new line = separate sentence
4. **Clause starters:** "while", "because", "but", "and" at start of sentence = correct
5. **No orphan fragments:** Every sentence must be a complete thought
6. **TTS content preserved:** `shadowing.js` script[] with vi translations must NOT be touched

---

## Runtime loading (FROZEN)

**File:** `src/modules/shadowing/transcriptUtils.js`

**Priority order:**
1. `sentences/<videoId>.json` (Deepgram-aligned, preferred)
2. `cleaned/<videoId>.json` (older cleaned transcripts)
3. `raw/<videoId>.json` (raw auto-captions)

**Key functions:**
- `getTranscript(videoId)` — returns transcript object with `segments[]`
- `getActiveSegment(videoId, currentTime)` — returns current segment for highlighting
- `getCleanedTranscriptSentences(videoId)` — returns filtered segments for UI

---

## W34 Reference (Golden Standard)

**Video:** Pinkfong "The Ant and the Grasshopper" (`XbMrw3cwVUc`)
**Transcript:** 31 sentences, manually split

**First 4 sentences (correct splitting):**
1. "Chirp chirp! I love summer!" (18.0s)
2. "Chirp cheer! I love singing!" (23.12s)
3. "Saying grasshopper resting on a tree on a hot summer day." (24.88s)
4. "While under the tree, ant was sweating and slaving away." (31.92s)

**Key lesson:** "while under the tree" is a sentence STARTER, not a continuation of the previous sentence.

---

## DO NOT

1. ❌ Use LLM to split sentences (it over-merges)
2. ❌ Blindly merge adjacent YouTube auto-caption fragments
3. ❌ Change `shadowing.js` script[] content (TTS mode)
4. ❌ Merge title text with dialogue
5. ❌ Split sentences mid-thought (check grammar meaning)
6. ❌ Use `fix_sentence_formatting.cjs` without manual review first

---

**Frozen:** 2026-08-01T18:30:00+07:00
**Reason:** W34 transcript debugging revealed need for strict sentence splitting rules
**Author:** Claude (with user corrections)
