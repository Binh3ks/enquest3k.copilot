# Shadowing Transcript Audit — Weeks 1–35

**Date**: 2026-07-14  
**Scope**: All W1–W35 shadowing.js files (ADV + Easy modes = 70 files)  
**Mode**: Research-only — no production files modified

---

## 1. Current Implementation Overview

### Architecture

The Shadowing station has two playback paths: **TTS** (default) and **Video** (YouTube transcript mode).

```
┌──────────────────────────────────────────────────────────────┐
│                      Shadowing.jsx                           │
│  ┌───────────────┐        ┌────────────────────────────────┐ │
│  │ TTS Play Mode │        │      Video Play Mode           │ │
│  │ (default)     │        │  YouTube embed + transcript     │ │
│  └───────┬───────┘        └──────────┬─────────────────────┘ │
│          │                           │                       │
│  useTTSWordHighlight         useWordHighlight                 │
│  (VoiceService._audio)      (ytPlayer.getCurrentTime)        │
│          │                           │                       │
│  effectiveScript ──────── transcriptAligner ──────────────┐  │
│  (shadowing.js script[])     (map script→timestamps)     │  │
│  + corrections (user edits)                               │  │
│                                                          │  │
│  ┌───────────────┐    ┌──────────────────┐    ┌─────────┴┐ │
│  │  LeftPanel    │    │    RightPanel    │    │ IPAUtils │ │
│  │  (video+IPA)  │    │  (sentence list) │    │ (CMU dict│ │
│  └───────────────┘    └──────────────────┘    └──────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Data Flow

1. `shadowing.js` → `script[]` array: `{id, text, vi}` — **the canonical sentence list**
2. `shadowing_ipa.js` → pre-computed IPA per sentence id: `{[id]: [{word, ipa, stress}]}`
3. `video_transcripts_by_id/cleaned/{videoId}.json` → ASR-cleaned timestamps per segment
4. `transcriptAligner.js` → maps raw transcript timestamps to script sentence boundaries
5. At runtime: `effectiveScript = corrections[s.id] || script.text` — user corrections override

### Schema

```javascript
export default {
  videoId: "string",              // YouTube video ID
  content_en: "string",           // Full story text (used for progress/UI, not display)
  script: [
    { id: 1, text: "string", vi: "string|null" }
    // ...
  ]
}
```

- `videoId` — required for YouTube transcript mode
- `content_en` — full concatenated text (should match script joined)
- `script[]` — individual sentences (id sequential starting from 1)
- `vi` — Vietnamese translation (null = not translated, uses AI fallback)

---

## 2. Transcript Statistics (W1–W35)

### Summary Table

| Metric | ADV (n=35) | EASY (n=35) | Total |
|--------|------------|-------------|-------|
| Files scanned | 35 | 35 | 70 |
| All have script[] | ✅ 35 | ✅ 35 | 70 |
| All have IPA file | ✅ 35 | ✅ 35 | 70 |
| Unique videoIds | 31 | 31 | 31 |
| Cleaned transcript exists | 31/31 | 31/31 | 31/31 |
| Sequential ids | 33 | 35 | 68 |
| vi=null entries | 18 | 14 | 32 |
| Bold in content_en | 19 | 16 | 35 |
| Bold in script text | 1 | 4 | 5 |
| Empty/0-word text | 6 | 0 | 6 |
| content_en truncated | 2 | 2 | 4 |
| IPA incomplete | 2 | 1 | 3 |

### Per-Week Statistics

```
WK | M  | videoId      | n  | min | max | avg  | nullVi | IPA    | seq
---|----|--------------|----|----|-----|------|--------|--------|----
 1 | ADV| 8wZi38lF28E  | 10 |  4 |  13 |  8.9 |     0  | 10/10  |  Y
 1 | EASY| 8wZi38lF28E | 11 |  1 |  15 |  5.9 |     0  | 11/11  |  Y
 2 | ADV| FHaObkHEkHQ  | 16 |  4 |   8 |  5.6 |    16  | 16/16  |  Y
 2 | EASY| FHaObkHEkHQ |  9 |  4 |  12 |  9.1 |     0  |  9/9   |  Y
 3 | ADV| zT5IiE9m9oY  | 15 |  1 |   7 |  2.7 |     0  | 14/15  |  Y
 3 | EASY| zT5IiE9m9oY | 11 |  5 |  10 |  6.3 |     0  | 11/11  |  Y
 4 | ADV| BXWNhq-lPD8  | 10 |  4 |  13 |  8.2 |     0  | 10/10  |  Y
 4 | EASY| BXWNhq-lPD8 | 10 |  4 |   9 |  7.5 |     0  | 10/10  |  Y
 5 | ADV| O07X1XLK4tM  | 14 |  5 |  13 |  7.3 |     0  | 14/14  |  Y
 5 | EASY| O07X1XLK4tM | 11 |  4 |  10 |  6.4 |     0  | 11/11  |  Y
 6 | ADV| O07X1XLK4tM  | 14 |  3 |  11 |  5.7 |     0  | 14/14  |  Y
 6 | EASY| O07X1XLK4tM | 14 |  3 |   7 |  5.2 |     0  | 14/14  |  Y
 7 | ADV| vb4ZF3pYtuw  | 14 |  3 |  10 |  7.0 |     0  | 14/14  |  Y
 7 | EASY| vb4ZF3pYtuw | 14 |  3 |   8 |  6.4 |     6  | 14/14  |  Y
 8 | ADV| d7hYjIV4AF0  | 15 |  4 |  10 |  7.3 |     0  | 15/15  |  Y
 8 | EASY| d7hYjIV4AF0 | 14 |  4 |   9 |  6.3 |     0  | 14/14  |  Y
 9 | ADV| jWY6N9QXmEY  | 17 |  4 |   8 |  5.5 |     0  | 17/17  |  Y
 9 | EASY| jWY6N9QXmEY | 16 |  4 |   8 |  5.6 |     0  | 16/16  |  Y
10 | ADV| t1tSx5cI9eg  | 12 |  4 |   9 |  6.0 |     0  | 12/12  |  Y
10 | EASY| t1tSx5cI9eg | 15 |  2 |   7 |  4.5 |     0  | 15/15  |  Y
11 | ADV| curo8LPPA5Y  | 68 |  1 |  11 |  4.9 |     0  | 23/68  |  N ⚠️
11 | EASY| curo8LPPA5Y | 65 |  1 |  10 |  4.5 |     0  | 20/65  |  N ⚠️
12 | ADV| 4c6FyuetSVo  | 14 |  5 |  10 |  7.1 |     0  | 14/14  |  Y
12 | EASY| 4c6FyuetSVo | 10 |  4 |   7 |  5.5 |     0  | 10/10  |  Y
13 | ADV| ico9ztlb46k  | 18 |  2 |   8 |  4.7 |    18  | 18/18  |  Y
13 | EASY| ico9ztlb46k | 27 |  2 |   4 |  3.4 |     0  | 27/27  |  Y
14 | ADV| 8wZi38lF28E  | 13 |  4 |  15 |  8.8 |     0  | 13/13  |  Y
14 | EASY| 8wZi38lF28E | 20 |  4 |   8 |  5.1 |     0  | 20/20  |  Y
15 | ADV| N1o4oOXLOZc  | 19 |  3 |  11 |  6.4 |     0  | 19/19  |  Y
15 | EASY| N1o4oOXLOZc | 23 |  3 |  10 |  5.7 |     0  | 23/23  |  Y
16 | ADV| tgUSHk6JaTY  | 31 |  0 |   8 |  5.0 |     1  | 31/31  |  Y
16 | EASY| tgUSHk6JaTY | 28 |  0 |   7 |  4.0 |     4  | 28/28  |  Y
17 | ADV| P9abGg_gF1s  | 27 |  3 |  11 |  6.2 |     0  | 27/27  |  Y
17 | EASY| P9abGg_gF1s | 23 |  4 |   8 |  5.0 |     3  | 23/23  |  Y
18 | ADV| MNQMpFVrMOs  | 27 |  0 |  13 |  5.8 |     1  | 27/27  |  Y
18 | EASY| MNQMpFVrMOs | 18 |  2 |  10 |  4.9 |     0  | 18/18  |  Y
19 | ADV| wy398w9QcB4  | 31 |  3 |   9 |  5.4 |     0  | 31/31  |  Y
19 | EASY| wy398w9QcB4 | 30 |  1 |   9 |  4.3 |     0  | 30/30  |  Y
20 | ADV| qwjfQNQsRRI  | 21 |  2 |  12 |  7.2 |     0  | 21/21  |  Y
20 | EASY| qwjfQNQsRRI | 19 |  3 |   8 |  5.5 |     2  | 19/19  |  Y
21 | ADV| tGWiowdjnHk  | 14 |  6 |  20 | 12.1 |     0  | 14/14  |  Y
21 | EASY| tGWiowdjnHk | 16 |  6 |  12 |  7.8 |     0  | 16/16  |  Y
22 | ADV| qwjfQNQsRRI  | 15 |  0 |  15 |  8.2 |     1  | 15/15  |  Y
22 | EASY| qwjfQNQsRRI | 17 |  4 |  16 |  8.5 |     5  | 17/17  |  Y
23 | ADV| pcWBtzTnpb8  |  8 | 11 |  17 | 13.5 |     8  |  8/8   |  Y
23 | EASY| pcWBtzTnpb8  |  8 |  6 |  13 | 10.8 |     8  |  8/8   |  Y
24 | ADV| LlC-Trk54Zg  |  8 | 10 |  13 | 11.5 |     8  |  8/8   |  Y
24 | EASY| LlC-Trk54Zg  |  8 |  6 |  13 | 10.1 |     8  |  8/8   |  Y
25 | ADV| curo8LPPA5Y  |  8 |  8 |  13 |  9.9 |     8  |  8/8   |  Y
25 | EASY| curo8LPPA5Y  |  8 |  6 |  11 |  7.8 |     8  |  8/8   |  Y
26 | ADV| OdNv-J31Kk8  |  8 |  7 |  12 |  9.6 |     8  |  8/8   |  Y
26 | EASY| OdNv-J31Kk8  |  8 |  4 |   8 |  5.9 |     8  |  8/8   |  Y
27 | ADV| D3h-1mBjYdY  | 18 |  0 |  22 |  5.4 |    18  | 18/18  |  Y
27 | EASY| D3h-1mBjYdY  | 18 |  0 |  14 |  4.9 |    18  | 18/18  |  Y
28 | ADV| tftSHIh8enw  | 12 |  5 |  14 |  8.7 |    12  | 12/12  |  Y
28 | EASY| tftSHIh8enw  |  8 |  6 |  17 | 12.1 |     8  |  8/8   |  Y
29 | ADV| aSdnkKnL6Ys  | 10 |  0 |  17 | 10.1 |    10  | 10/10  |  Y
29 | EASY| aSdnkKnL6Ys  |  8 |  0 |  16 |  9.0 |     8  |  8/8   |  Y
30 | ADV| aqMpREQdnCY  | 12 |  0 |  13 |  6.3 |    12  | 12/12  |  Y
30 | EASY| aqMpREQdnCY  | 10 |  1 |  17 |  8.1 |    10  | 10/10  |  Y
31 | ADV| LNajQTnZviQ  | 10 |  0 |  19 | 10.9 |    10  | 10/10  |  Y
31 | EASY| LNajQTnZviQ  | 10 |  0 |  21 |  9.8 |    10  | 10/10  |  Y
32 | ADV| qD1pnquN_DM  | 16 | 10 |  24 | 14.1 |    16  | 16/16  |  Y
32 | EASY| qD1pnquN_DM  | 12 |  7 |  15 | 10.9 |    12  | 12/12  |  Y
33 | ADV| gWOqA3pUaTk  | 14 |  5 |  15 | 10.2 |     0  | 14/14  |  Y
33 | EASY| gWOqA3pUaTk  | 20 |  1 |  13 |  8.1 |     0  | 20/20  |  Y
34 | ADV| XPZXpuoIndo  | 14 |  5 |  19 | 12.4 |     0  | 14/14  |  Y
34 | EASY| XPZXpuoIndo  | 16 |  5 |  19 | 11.5 |     0  | 16/16  |  Y
35 | ADV| X2YgM1Zw4_E  | 30 |  4 |  10 |  6.0 |    17  | 30/30  |  Y
35 | EASY| X2YgM1Zw4_E  | 20 |  4 |   9 |  5.8 |     5  | 20/20  |  Y
```

### Word Count Distribution

| Weeks | Sentence word count | Avg words/sentence | Notes |
|-------|-------------------|-------------------|-------|
| W1–W10 | 8–16 entries per mode | 5.7–9.1 | Human-written scripts, good pacing |
| W11 | 65–68 entries (!!) | 4.5–4.9 | Full unsplit YouTube transcript |
| W12–W15 | 10–27 entries | 3.4–8.8 | Variable quality |
| W16–W22 | 15–31 entries | 4.3–8.5 | Full YouTube transcript dump |
| W23–W26 | 8 entries only | 5.9–10.8 | Proper curated sentences |
| W27–W32 | 8–18 entries | 4.9–14.1 | Increasing sentence length |
| W33–W35 | 14–30 entries | 6.0–12.4 | Too many sentences (30 in W35 ADV) |

---

## 3. Quality Audit — Problem Inventory

### Problem 1: FULL UNDIVIDED TRANSCRIPT DUMP (Critical)

**Affected**: W11 ADV (68 entries), W11 EASY (65 entries)

W11 contains the full unsplit YouTube transcript — including multiple dialogue cycles and duplicate IDs (ids 1-23 appear twice). The IPA file only covers 23 of 68 entries (45 entries with no IPA). This week is **functionally broken** in shadowing mode.

- **Root cause**: YouTube transcript was pasted directly into `script[]` without splitting or deduplication.
- **Impact**: Karaoke highlighting, IPA display, and challenge mode all fail for 2/3 of entries.
- **Severity**: CRITICAL — W11 is the worst week in the entire W1-35 range.

### Problem 2: content_en HAS BOLD MARKERS `**` (Regulatory)

**Affected**: 35 of 70 files (50%) — W10-W22 ADV, W10-W22 EASY, W26-W32 ADV+EASY, W35 ADV

`PRODUCTION_NEVER_RULES.md` Rule 181 states: "NEVER leave `**bold**` in read.js content_en". While this rule specifically names `read.js`, the Shadowing station's `content_en` field is used for TTS text display and progress tracking. The bold markers:

- Appear in `content_en` as a concatenated text blob (e.g. W10: `"Today I visit my uncle's farm **in the countryside**..."`)
- Do NOT appear in `script[]` text entries for most weeks (except 5 files)
- The runtime `transcriptUtils.js` and `ipaUtils.js` do not parse bold markers from `content_en`
- **The bold in `content_en` is inert at runtime** — it's not rendered, but it violates the content standard

**Exception**: 5 files have bold in actual `script[]` entries (W28, W29, W30 Easy) — these WILL trigger the dictionary popup component since `Shadowing.jsx` renders `text` directly via `<span>` in RightPanel.

- **Root cause**: Bold markers copied from `read.js` content_en without stripping for shadowing
- **Severity**: MEDIUM — bold in `content_en` is inert; bold in `script[].text` causes false dictionary popups

### Problem 3: WRONG VI TRANSLATIONS (Critical — W35 ADV)

**Affected**: W35 ADV (13 of 30 entries have wrong vi)

W35 ADV `vi` translations are from "The Ant and the Grasshopper" story instead of "Environmental Issues":

```javascript
{ id: 1, text: "Our planet is very beautiful.", vi: "Rất lâu trước đây, có một con kiến chăm chỉ..." }
// ↑ vi describes an ant, not a planet
```

- **Root cause**: W35 ADV was built from the wrong source file — vi column copied from a different week
- **Impact**: Vietnamese translations shown to students are completely wrong
- **Severity**: CRITICAL — students see unrelated translations

### Problem 4: IDENTICAL VI BETWEEN ADV AND EASY (W23–W32)

**Affected**: 10 weeks (W23 through W32) — all identical vi between ADV and Easy modes

While ADV and Easy modes share the same videoId (same YouTube video), they have **different English text** (ADV = advanced sentences, EASY = simplified sentences). Having identical vi translations means:
- Easy mode vi is correctly simple
- OR ADV mode vi is incorrectly simple

Since the English text differs between modes, the vi translations **cannot** be correct for both simultaneously.

- **Root cause**: vi was written once and copied between ADV/EASY without mode-appropriate translation
- **Severity**: HIGH — at least one mode has wrong translations in every affected week

### Problem 5: NULL VI TRANSLATIONS (High coverage gap)

**Affected**: 32 of 70 files have at least one `vi: null` entry

**By era**:
- W1–W22: 0–16 null_vi per file (mostly 0)
- W23–W32: 8–18 null_vi per file (nearly ALL entries are null)
- W33–W35: 0–17 null_vi per file

The runtime handles this via AI translation fallback (LLM call on demand), but:
- Students in non-English context may see raw English with no translation
- AI fallback requires network connectivity
- Translation quality varies per session

- **Root cause**: W23+ production did not pre-write vi translations; relied on runtime AI fallback
- **Severity**: MEDIUM — functional but degraded UX for offline/slow connections

### Problem 6: EMPTY / ZERO-WORD ENTRIES (Data Corruption)

**Affected**: 6 files — W16 ADV, W18 ADV, W22 ADV, W27 ADV, W29 ADV, W30 ADV

Specific cases:
```
W16 ADV id=21: text="\" (1 character, escape artifact)
W18 ADV id=23: text="\" (1 character, escape artifact)
W22 ADV id=7:  text="\" (1 character, escape artifact)
```

These are quote-escape artifacts where `text: "\"` or similar was generated instead of a proper sentence. At runtime, `getCleanedTranscriptSentences` filters out zero-word entries, but these are in the `script[]` array, not the transcript — they WILL appear in the UI as blank cards.

- **Root cause**: Build tool or regex artifact created empty text entries during content generation
- **Severity**: MEDIUM — creates blank sentence cards in the UI

### Problem 7: content_en TRUNCATION (Data Quality)

**Affected**: 4 files — W17 ADV, W19 ADV, W19 EASY

`content_en` ends with `\\` — the full story text is cut off mid-sentence:

```javascript
content_en: "Today the weather is changing! ... My teacher says: \\",  // ← truncated
```

The `script[]` entries are complete (contain the full sentences), so the sentences work fine. But `content_en` is incomplete — used by progress tracking and as a UI reference.

- **Root cause**: content_en was generated with a backslash-escape that broke the string literal
- **Severity**: LOW — `content_en` is informational; `script[]` is authoritative

### Problem 8: SENTENCE COUNT OUT OF BOUNDS (W28+)

**Affected**: 8 files — W32 ADV(16), W32 EASY(12), W33 ADV(14), W33 EASY(20), W34 ADV(14), W34 EASY(16), W35 ADV(30), W35 EASY(20)

Production standard: W28+ should have 8-12 ADV / 8-10 EASY shadowing sentences.

W35 ADV has **30 sentences** — 2.5× the maximum. This is a full story dump instead of curated sentences.

- **Root cause**: W32–W35 production was copy-pasted from read.js instead of selecting chunk-rich sentences per the production workflow
- **Severity**: MEDIUM — too many sentences dilutes practice quality; challenge mode becomes extremely long

### Problem 9: NON-SEQUENTIAL IDS (W11 only)

**Affected**: W11 ADV, W11 EASY

IDs restart from 1 mid-file (ids 1-23 appear twice — two different dialogue cycles). This is a subcase of Problem 1.

- **Root cause**: Unsplit multi-cycle transcript
- **Severity**: CRITICAL (covered by Problem 1)

### Problem 10: IPA COVERAGE GAPS

**Affected**: W3 ADV (1 missing), W11 ADV (45 missing), W11 EASY (45 missing)

W11 has IPA for only 23 of 68 entries (34% coverage). The other 45 entries show "Chưa có trong từ điển" when clicked.

- **Root cause**: IPA file was generated for the correct 23-sentence script, but the shadowing.js was expanded with 45 extra unsplit transcript entries afterward
- **Severity**: CRITICAL for W11 (covered by Problem 1); LOW for W3 (1 missing entry)

---

## 4. Problem Categorization

### Category A: VI Translation Errors
- **W35 ADV**: Wrong vi (ant story instead of environmental issues)
- **W23-W32**: Identical vi between ADV/EASY modes
- **Count**: 11 weeks affected
- **Severity**: HIGH (students see incorrect learning content)

### Category B: Full Transcript Dump (Unsplit ASR)
- **W11 ADV/EASY**: 68/65 entries (unsplit YouTube transcript)
- **Count**: 1 week (2 files)
- **Severity**: CRITICAL (week is functionally broken)

### Category C: Bold Marker Contamination
- **35 files** have `**bold**` in `content_en`
- **5 files** have `**bold**` in `script[].text` (causes false dictionary popups)
- **Count**: 35 weeks affected
- **Severity**: MEDIUM (regulatory violation + minor UX issue)

### Category D: Data Corruption (Empty/Escaped Entries)
- **W16, W18, W22**: Zero-word `text: "\"` entries
- **Count**: 3 weeks affected
- **Severity**: MEDIUM (blank sentence cards in UI)

### Category E: content_en Truncation
- **W17, W19**: content_en ends with `\\` mid-sentence
- **Count**: 2 weeks affected
- **Severity**: LOW (script[] is authoritative)

### Category F: Sentence Count Violation (W28+)
- **W32-W35**: Too many sentences (12-30 instead of 8-12)
- **Count**: 4 weeks (8 files)
- **Severity**: MEDIUM (practice dilution, over-long challenge mode)

### Category G: Null Vietnamese (No Translation Pre-written)
- **W23-W32**: All or nearly all entries vi=null
- **Count**: 10+ weeks
- **Severity**: MEDIUM (relies on AI fallback at runtime)

---

## 5. Root Cause Analysis

| Root Cause | Affected Weeks | Pattern |
|-----------|---------------|---------|
| **YouTube transcript pasted without splitting** | W11, W16-W22 | ASR dump copied directly into `script[]` — each small phrase = 1 entry |
| **content_en copied from read.js with bold markers** | W10-W22, W26-W35 | `content_en` includes `**` from read.js but script[] text strips them |
| **Wrong vi source file used** | W35 ADV | Ant story vi copied to environmental issues week |
| **ADV/EASY vi copied without mode translation** | W23-W32 | Single vi set applied to both modes despite different English text |
| **Build artifact / regex escape** | W16, W18, W22 | `text: "\"` instead of actual sentence text |
| **content_en string literal break** | W17, W19 | `\\` at end of content_en (escape character breaking string) |
| **read.js full copy instead of sentence selection** | W32-W35 | All read.js sentences copied into shadowing instead of curated subset |
| **vi not written for W23+ production era** | W23-W32 | Production relied on runtime AI fallback instead of pre-writing translations |

---

## 6. Severity Ranking

| Rank | Problem | Weeks | Severity | Fix Complexity |
|------|---------|-------|----------|---------------|
| 1 | W11 full transcript dump | 1 | CRITICAL | HIGH — complete rewrite needed |
| 2 | W35 ADV wrong vi | 1 | CRITICAL | LOW — replace vi entries |
| 3 | W23-W32 ADV/EASY vi mismatch | 10 | HIGH | MEDIUM — rewrite vi per mode |
| 4 | W32-W35 sentence count violation | 4 | MEDIUM | MEDIUM — select subset |
| 5 | Bold in script[].text | 3 | MEDIUM | LOW — strip `**` |
| 6 | Zero-word escape entries | 3 | MEDIUM | LOW — replace with actual text |
| 7 | Null vi translations (W23+) | 10 | MEDIUM | HIGH — write translations |
| 8 | Bold in content_en | 35 | LOW | LOW — regex strip |
| 9 | content_en truncation | 2 | LOW | LOW — restore full text |
| 10 | IPA coverage gaps | 1 | LOW | MEDIUM — regenerate IPA |

---

## 7. Recommended Repair Order

### Phase 1: CRITICAL Fixes (1-2 files, immediate)
1. **W11 ADV/EASY** — Rebuild from clean source. Select 10-15 curated sentences from the dialogue. Regenerate IPA. Remove duplicate ids.
2. **W35 ADV** — Replace vi translations with correct environmental issue translations.

### Phase 2: HIGH Fixes (10 weeks, batch)
3. **W23-W32 vi** — Rewrite vi for ADV mode (EASY vi is likely correct since it's simpler). 10 files, ~80-120 entries total.

### Phase 3: MEDIUM Fixes (content cleanup, batch)
4. **W32-W35 sentence count** — Select 8-12 ADV / 8-10 EASY sentences per production standard.
5. **Zero-word entries** (W16, W18, W22) — Replace with actual dialogue text or remove entries.
6. **Bold in script[].text** (W28-W30 EASY) — Strip `**` from 5 files.

### Phase 4: LOW Fixes (cosmetic, batch)
7. **Bold in content_en** (35 files) — Strip `**` from content_en string.
8. **content_en truncation** (W17, W19) — Restore full text.
9. **IPA gaps** (W3) — Generate IPA for 1 missing entry.

### Phase 5: NULL VI (Deferred)
10. **W23-W32 null vi** — Decide: write vi manually or accept AI fallback. This is 100+ entries and may be low priority if AI fallback is reliable.

---

## 8. Recommended Repair Workflow

### Single-Week Repair

```
1. Read shadowing.js for week N
2. Check: sentence count within bounds? (W1-27: any; W28+: 8-12 ADV / 8-10 EASY)
3. Check: all text entries non-empty?
4. Check: content_en matches script[] text concatenated?
5. Check: vi translations are correct for this mode (ADV vs EASY)
6. Check: no bold markers in content_en or script[].text
7. Check: IPA file has entries for all script ids
8. If any fix needed: edit shadowing.js, regenerate IPA if text changed
9. Run: bash production_kit/tools/bug_prevention_check.sh N
10. Run: bash production_kit/tools/code_quality_gate.sh N
11. Run: npm run build → PASS
12. Commit
```

### Multi-Week Batch Repair

```
1. Generate per-week audit from /tmp/shadowing_audit.json
2. Prioritize: CRITICAL → HIGH → MEDIUM → LOW
3. Group by fix type (vi rewrite, sentence selection, bold strip)
4. Process one type across all affected weeks before switching
5. Run quality gate on each week after fix
6. Full regression: npm run build (all weeks)
```

### Future Production Guard

```
1. Pre-commit hook checks:
   - No **bold** in shadowing.js content_en
   - No **bold** in shadowing.js script[].text
   - Script[] entry count within bounds (8-12 ADV / 8-10 EASY for W28+)
   - No zero-word text entries
   - All vi entries non-null (or flagged as intentionally null)
2. CI check: content_en matches script[] concatenated (normalized)
3. IPA completeness check: all script ids have IPA entries
```

---

## 9. Runtime Behavior Summary

### How shadowing.js text flows through the app

1. **TTS Mode** (default): `script[]` → `ttsScript` → `VoiceService.generate()` → audio → `useTTSWordHighlight` → karaoke display
2. **Video Mode**: `script[]` → `transcriptAligner.alignTranscriptToScript()` → timestamps from YouTube → `useWordHighlight` → karaoke display
3. **Challenge Mode**: Uses `effectiveScript` (same as above) with trimmed durations
4. **IPA**: `shadowing_ipa.js` → `loadIpaData()` → per-sentence IPA display. Falls back to `generateIpaForText()` (CMU dict) if no pre-computed IPA
5. **Corrections**: User edits stored in `localStorage` + server KV → override `script[].text` at runtime

### What breaks with bad data

| Issue | TTS Mode Impact | Video Mode Impact | Challenge Impact |
|-------|----------------|-------------------|-----------------|
| Empty text | VoiceService speaks nothing | Karaoke shows blank card | Recording prompt is empty |
| Bold in text | TTS reads "star star" or skips | Dictionary popup on click | False bold in IPA display |
| Wrong vi | AI fallback not triggered | AI fallback not triggered | Not shown |
| Wrong IPA | IPA shows wrong pronunciation | IPA shows wrong pronunciation | IPA shows wrong pronunciation |
| Too many sentences | Over-long practice session | Over-long practice session | Challenge mode is exhausting |
| W11 dup ids | First cycle plays; second overwrites | First cycle plays; second conflicts | IPA mismatch for 45 entries |

---

## 10. Risks

### If repaired without care:
- Changing `script[].text` will break `shadowing_ipa.js` alignment (IPA keyed by id)
- Changing sentence order/ids breaks challenge mode state tracking in `localStorage`
- Changing `content_en` breaks CHECK 42 (dictation/shadowing content_en must match read.js)

### If NOT repaired:
- W11 is functionally broken (students see 68 entries with broken karaoke)
- W35 ADV shows ant story translations for environmental issues content
- 50% of weeks have bold markers that could trigger false dictionary popups
- 10 weeks have no pre-written Vietnamese translations

### Repair risk mitigation:
- Always backup shadowing.js and shadowing_ipa.js before editing
- Run `bug_prevention_check.sh` and `code_quality_gate.sh` after each fix
- Test in browser for affected weeks (especially W11, W35, W23-W32)
- IPA must be regenerated if text changes (hash-based staleness check exists in `generate_audio_deepgram.py`)

---

## 11. APPROVED_FOR_REPAIR

**YES** — This audit recommends repair. The W11 transcript dump and W35 wrong vi are critical quality issues that directly affect student learning. The recommended repair order is:

1. W11 (CRITICAL) → W35 ADV vi (CRITICAL) → W23-W32 vi (HIGH) → W32-W35 sentence count (MEDIUM) → bold/escape cleanup (LOW)

**Total estimated fix scope**: ~70 files, ~350 individual entries
**Estimated repair effort**: 2-3 sessions (Phase 1-3: 1 session; Phase 4-5: 1 session; validation: 1 session)

---

*Generated by shadowing audit 2026-07-14. All stats from scan of 70 files across W1–W35 ADV/EASY.*
