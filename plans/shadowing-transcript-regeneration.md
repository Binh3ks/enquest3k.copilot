# Shadowing Transcript Regeneration Plan

**Date:** 2026-07-01  
**Status:** Planning  
**Goal:** Regenerate video transcripts for shadowing module

---

## 📁 Transcript Data Files

| File | Purpose | Schema |
|------|---------|--------|
| `src/data/video_transcripts.json` | Raw fetched transcripts | `{ videoId: { text, segments: [{text, start, duration}] } }` |
| `src/data/video_transcripts_cleaned.json` | ASR fixes + sentence segmentation | Same schema, cleaned |
| `src/data/video_transcripts_sentences.json` | Sentence-segmented with IDs | `{ videoId: { segments: [{id, text, start, duration}] } }` |
| `src/data/curated_transcripts.json` | Manual curated sentences | Used by `clean_transcripts.mjs` for alignment |

---

## 🔄 Transcript Pipeline (3 Tiers)

### Tier 1: Fetch
**Script:** `tools/fetch_video_transcripts.js`  
**Output:** `src/data/video_transcripts.json`

```bash
# Fetch all videos
node tools/fetch_video_transcripts.js

# Fetch only specific week
node tools/fetch_video_transcripts.js --only 19

# Force re-fetch even if cached
node tools/fetch_video_transcripts.js --force
```

**How it works:**
- Reads `videoId` from `shadowing.js` files in `weeks/` and `weeks_easy/`
- Uses `youtube-transcript` npm package to fetch captions
- Prefers manual captions (en, en-GB, en-US) over auto-generated
- 500ms rate limit between requests

### Tier 2: Clean
**Script:** `tools/clean_transcripts.mjs`  
**Output:** `src/data/video_transcripts_cleaned.json`

```bash
# Clean all transcripts
node tools/clean_transcripts.mjs

# Dry run (no file written)
node tools/clean_transcripts.mjs --dry-run

# Debug specific video
node tools/clean_transcripts.mjs --video VIDEO_ID
```

**Features:**
- ASR error fixes: "D hey" → "Hey", "dont" → "don't"
- Sentence boundary detection for manual captions
- Gap-based splitting for auto-generated captions (>0.5s gap = new sentence)
- Repetition detection for ESL drills ("father father")
- Title prefix stripping

### Tier 3: Sentence Segmentation
**Script:** `tools/split_sentences.mjs`  
**Output:** `src/data/video_transcripts_sentences.json`

```bash
# Generate sentence-segmented output
node tools/split_sentences.mjs

# Debug specific video
node tools/split_sentences.mjs --debug VIDEO_ID
```

---

## 📋 Workflow to Regenerate Transcripts

### Option 1: Full Regeneration (All Videos)

```bash
# Step 1: Fetch fresh transcripts from YouTube
node tools/fetch_video_transcripts.js --force

# Step 2: Clean and segment
node tools/clean_transcripts.mjs

# Step 3: Generate sentence output
node tools/split_sentences.mjs
```

### Option 2: Single Video Debug

```bash
# Fetch specific video
node tools/fetch_video_transcripts.js --only 19 --force

# Clean with debug output
node tools/clean_transcripts.mjs --video VIDEO_ID

# Check sentence output
node tools/split_sentences.mjs --debug VIDEO_ID
```

### Option 3: Quick Clean (No Re-fetch)

```bash
# Only run cleaning + segmentation (if raw transcripts exist)
node tools/clean_transcripts.mjs
node tools/split_sentences.mjs
```

---

## 🎯 Video Sources

Videos are defined in `shadowing.js` files per week:

```javascript
// src/data/weeks/week_19/shadowing.js
export default {
  videoId: "FHaObkHEkHQ",  // ← YouTube video ID
  // ...
};
```

**Playlists (from `Shadowing redesign/Video source.txt`):**
- ESL Conversations: `PLZi4sJ5aoFxjxwUwhng5n2iVD_jvokO--`
- Kids Stories: `PLZi4sJ5aoFxhZnTAC5T8HTIHi67hema5b`
- Classroom English: `PLZi4sJ5aoFxiCsWQ3tsl_R_Lfc8SkdbuZ`

---

## 🔧 Dependencies

```bash
# Install required npm package
npm install youtube-transcript

# Or use the existing package.json
npm install
```

---

## 📊 Current Transcript Stats

From `src/data/video_transcripts_sentences.json`:
- **Total videos:** ~30+ unique videos
- **Total sentences:** ~2400+ segments

---

## ✅ Verification Checklist

After regeneration, verify:

- [ ] All videos have transcript segments
- [ ] Sentence IDs are sequential (1, 2, 3...)
- [ ] `start` times are monotonically increasing
- [ ] `duration` values are positive
- [ ] Text has proper capitalization
- [ ] ASR errors are fixed
- [ ] No empty segments

---

## 🐛 Troubleshooting

### "No transcript found" error
- Video may not have captions enabled
- Try different caption language (en, en-GB, en-US)
- Check if video is region-restricted

### Sentences too long/short
- Adjust `MIN_WORDS`, `MAX_WORDS` in `clean_transcripts.mjs`
- Add custom sentence boundaries in `SENTENCE_BOUNDARIES`

### Timing issues
- Check `gap > 0.5` threshold in `mergeSegments()`
- Verify YouTube is returning accurate timestamps
