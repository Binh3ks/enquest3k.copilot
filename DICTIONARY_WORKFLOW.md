# Dictionary & Keyword System — Mass Production Workflow

**Last Updated:** April 10, 2026  
**Status:** ✅ Production Ready  
**Build Approach:** Static Import (bundled by Vite, ~609KB gzipped)  
**Dictionary Size:** 1998 entries (includes beginner stopwords)

---

## Overview

The app now features **universal keyword dictionary** with hover tooltips + pronunciation practice for 2000+ keywords in Read & Explore stations.

**Key Features:**
- 🔊 **Hover tooltip**: Mini preview on desktop (word + IPA + "Click to learn")
- 📖 **Click popup**: Full definition (Vietnamese meaning + English definition + external links)
- 🎤 **Pronunciation check**: Browser SpeechRecognition API (free, no quota)
- 💰 **Cost**: $0 (browser API for STT, on-demand TTS cached to R2)

---

## System Architecture

### 1. Keyword Extraction
**Script:** `tools/extract_keywords.mjs`

Scans `read.js` + `explore.js` from all weeks (ADV + Easy) and extracts:
- **Bold keywords** (`**word**`) — teacher-curated target vocab
- **Other important words** — excluding stopwords (to be/have, articles, ultra-common prepositions)

**Output:** `tools/keywords_extracted.json`
```json
{
  "total": 1963,
  "bold_count": 480,
  "keywords": ["adventure", "airport", "journey", ...],
  "bold_keywords": ["adventure", "airport", ...]
}
```

**Stopwords Policy (Level-Aware):**

**For Pre-A1 Beginners (Weeks 1-14):**
- ✅ **INCLUDE ALL WORDS** (even common function words)
- Min word length: 1 character
- Rationale: For complete beginners, words like "is", "am", "my", "a", "I" ARE new vocabulary that needs dictionary support

**For Intermediate+ (Weeks 15+):**
- ❌ **EXCLUDE stopwords** (common function words assumed already known)
- Min word length: 3 characters
- Stopwords excluded:
  - to be: am, is, are, was, were, be, been, being
  - to have: have, has, had
  - articles: a, an, the
  - pronouns: I, you, he, she, it, we, they, their, my, your, his, her, its, our, them
  - ultra-common: in, on, at, to, of, for, and, or, but, will, can, could, would, should, this, that, do, does, did, not

**Enhanced Definitions for Stopwords:**
For beginner-level stopwords that lack vocab.js entries, our dictionary build includes enhanced Vietnamese definitions with subject/usage information:
- **am** → "thì, là (dùng với 'I')"
- **is** → "thì, là (dùng với he/she/it)"
- **are** → "thì, là (dùng với you/we/they)"
- **have** → "có (dùng với I/you/we/they)"
- **has** → "có (dùng với he/she/it)"
- **my** → "của tôi"
- **a** → "một (trước phụ âm)"
- **i** → "tôi (chủ ngữ)"

This helps Vietnamese learners understand English conjugation patterns from the start.

**Run:** `node tools/extract_keywords.mjs`

---

### 2. Dictionary Build
**Script:** `tools/build_dictionary.mjs`

Merges vocab.js data (meaning + definition_en + pronunciation) into dictionary for ONLY keywords in whitelist.

**Process:**
1. Load `keywords_extracted.json` whitelist
2. Scan all `vocab.js` files (weeks 1-40, ADV + Easy)
3. For each vocab entry:
   - Skip if word NOT in keywords whitelist
   - Add to dictionary if in whitelist
   - ADV takes priority over Easy when duplicate
4. Add minimal entries (word only, empty meaning/definition) for keywords NOT found in vocab.js
5. Write to `src/data/dictionary.json` (bundled by Vite during build)

**Output:** `src/data/dictionary.json` (1998 entries)
- ~430 entries with full data (from vocab.js + enhanced stopwords)
- ~1570 minimal entries (can backfill later)

**Enhanced Stopword Definitions:**
For common stopwords appearing in beginner weeks (W1-14), the build script includes fallback definitions with subject/usage clarification (e.g., "am = thì, là (dùng với 'I')") to help Vietnamese learners understand English conjugation.

**Deployment:**
Dictionary is imported as ES module in `ReadingExplore.jsx` → bundled by Vite → no runtime fetch needed.  
**Why not `public/`?** vite.config.js has `publicDir: false` (media served from R2 CDN).

**Run:**
```bash
# Full rebuild (all weeks)
node tools/build_dictionary.mjs

# Single week update (after creating new week)
node tools/build_dictionary.mjs --week 31

# Dry run (show report without writing files)
node tools/build_dictionary.mjs --dry-run

# Via npm scripts
npm run dict:build
npm run dict:build:week 31
npm run dict:dry-run
```

---

### 3. UI Components

#### HoverWord.jsx
**Location:** `src/components/common/HoverWord.jsx`

Wraps keywords in Read & Explore with hover + click interactions.

**Props:**
- `word`: The word text
- `themeColor`: Theme color (indigo, blue, etc.)
- `onSpeak`: TTS callback
- `entry`: Dictionary entry object `{ word, meaning, pronounce, definition_en }`
- `isBold`: Boolean — bold styling for `**word**` vs subtle for non-bold keywords

**Behavior:**
- **Hover (desktop):** Tooltip shows `🔊 word /IPA/ | 👆 Click to learn`
- **Click:** Popup opens with:
  - Word + 🔊 replay button + IPA
  - Vietnamese meaning (if available)
  - English definition (truncated 10 words for passive absorption)
  - 🎤 "Say it!" button → record → pronunciation score
  - Cambridge + Laban external links
- **Mobile:** Tap = click (no hover event)

**Pronunciation Scoring (Browser SpeechRecognition):**
```javascript
Exact match       → "Perfect! 🎉" (green)
Levenshtein ≤ 2   → "Almost! Try again 💪" (amber)
Otherwise         → "Try harder! 🔊" (rose)
```

---

#### ReadingExplore.jsx
**Location:** `src/modules/read/ReadingExplore.jsx`

Renders story text with `renderStyledText()` function that:
1. Splits by bold markers `**word**`
2. For each segment:
   - **Bold**: Wrap with `<HoverWord isBold={true}>` (font-black, border-2, text-2xl)
   - **Non-bold**: Parse char-by-char to find words
     - If word in dictionary AND has meaning → wrap with `<HoverWord isBold={false}>` (font-semibold, border-dotted, text-xl)
     - Otherwise → plain text

**Singular Fallback Logic:**
When word not found in dictionary, tries singular form:
- `vehicles` → `vehicle`
- `stories` → `story` (ies → y)
- `boxes` → `box` (es → '')
- `cats` → `cat` (s → '')

This handles plural forms automatically.

---

## Mass Production Integration

### After Creating New Week Content

**Step 1:** Generate week content via `mass_produce_week.py` or manual creation
- Result: `src/data/weeks/week_XX/read.js`, `explore.js`, `vocab.js`, etc.

**Step 2:** Extract keywords
```bash
node tools/extract_keywords.mjs
```
This updates `tools/keywords_extracted.json` with new bold + important words from the new week.

**Step 3:** Update dictionary
```bash
node tools/build_dictionary.mjs --week 31
```
This:
- Reads new `vocab.js` for week 31
- Adds words to dictionary that are in keywords whitelist
- Skips words not in whitelist (e.g., ultra-common stopwords)
- Writes to `src/data/dictionary.json` (bundled by Vite, no fetch needed)

**Step 4:** Test in browser
1. Navigate to new week Read & Explore
2. Hover bold words → tooltip appears
3. Click → popup with meaning + pronunciation practice
4. Hover non-bold keywords (with dictionary entries) → tooltip appears (subtle styling)

---

## Data Files Structure

```
src/data/dictionary.json        # PRIMARY — imported by ReadingExplore.jsx (bundled by Vite)
tools/keywords_extracted.json   # WHITELIST — controls what goes in dictionary
tools/extract_keywords.mjs      # SCRIPT 1 — extract from read+explore
tools/build_dictionary.mjs      # SCRIPT 2 — merge vocab into dict
```

**Dictionary Entry Format:**
```json
{
  "word": "adventure",
  "meaning": "cuộc phiêu lưu",
  "pronounce": "/ədˈventʃər/",
  "definition_en": "an exciting and unusual experience or activity that someone has"
}
```

**Minimal Entry (when vocab.js doesn't have the word):**
```json
{
  "word": "vehicles",
  "meaning": "",
  "pronounce": "",
  "definition_en": ""
}
```
↑ Displays "Chưa có trong từ điển" in popup, but still shows external links.

---

## Styling Rules

### Bold Keywords (`**word**`)
- `font-black` — extra heavy weight
- `text-2xl` — large size (24px)
- `text-indigo-600` — primary color
- `border-b-2 border-indigo-200` — thick underline
- `bg-indigo-50 hover:bg-indigo-100` — visible background
- `px-1 rounded` — padding + rounded corners

### Non-Bold Keywords (in dictionary)
- `font-semibold` — medium weight
- `text-xl` — regular size (20px)
- `text-indigo-500` — slightly muted
- `border-b border-dotted border-indigo-300` — subtle dotted underline
- `hover:bg-indigo-50/50` — faint hover bg
- **No padding** — blend into text flow

### Plain Text (not in dictionary)
- `text-xl` — regular size
- No styling, no hover, no click

---

## Cost Analysis

| Component | Service | Cost | Notes |
|-----------|---------|------|-------|
| **TTS (listen)** | Deepgram on-demand | Existing pipeline | Cache to R2, amortized |
| **STT (pronunciation check)** | Browser SpeechRecognition | **$0** | Chrome built-in, Google backend |
| **Storage** | 1949 JSON entries × 0.1KB | Negligible | ~195KB total |
| **R2 storage** | TTS audio cache | Existing | No new cost |

**Deepgram Free Tier:** 45,000 minutes/month STT (not used — we use browser API)

**Total incremental cost:** **$0/month**

---

## Troubleshooting

### "Chưa có trong từ điển" for vocab words
**Cause:** Word is plural/derivative, but vocab.js only has singular.

**Solution:** Singular fallback already implemented in `getDictEntry()` helper. If still not working:
1. Check vocab.js has the singular form
2. Verify singular form has `definition_vi` and `definition_en`
3. Re-run `node tools/build_dictionary.mjs`

### Non-bold keywords not hovering
**Cause:** Dictionary not loaded, or word has empty meaning.

**Fix:** Check browser console for dictionary fetch errors. Words with `meaning: ""` are treated as "not in dictionary" and won't hover.

### Pronunciation check not working
**Cause:** Browser doesn't support SpeechRecognition (Safari/Firefox).

**Fix:** Use Chrome/Edge. Show alert to user: "Speech recognition not supported in this browser."

### Say it! button doesn't pulse
**Fixed:** Button now has `animate-pulse` class when `isRecording === true`.

---

## Future Enhancements

1. **Backfill minimal entries:** Use external API (Oxford Learner's Dictionary, Free Dictionary API) to auto-fill meaning + definition_en for 1570 minimal entries.

2. **Lemmatization:** Use NLP library (compromise.js) to better handle plurals, past tense (went → go), etc.

3. **Image thumbnails:** Add `image_url` field to dictionary entries, fetch from Unsplash API based on word.

4. **Usage examples:** Add `example` field from vocab.js to dictionary popup.

5. **Pronunciation audio:** Pre-generate TTS for all dictionary words, store in R2, instant playback without on-demand call.

---

## Quick Reference

**Add new week:**
```bash
# 1. Create week content (manual or via script)
python mass_produce_week.py --week 31

# 2. Extract keywords
node tools/extract_keywords.mjs

# 3. Update dictionary
node tools/build_dictionary.mjs --week 31

# 4. Commit & deploy
git add .
git commit -m "feat: week 31 content + dictionary"
git push
```

**Check dictionary coverage:**
```bash
# Count entries with full data
grep '"meaning": "[^"]' public/dictionary.json | wc -l

# Count minimal entries (empty meaning)
grep '"meaning": ""' public/dictionary.json | wc -l
```

**Test pronunciation in browser console:**
```javascript
const recog = new webkitSpeechRecognition();
recog.lang = 'en-US';
recog.onresult = (e) => console.log(e.results[0][0].transcript);
recog.start();
// → Say "adventure" into mic
// → Console shows: "adventure"
```
