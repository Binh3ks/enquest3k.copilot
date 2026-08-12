# EngQuest3K — Master Production Pipeline & Quality Standards

This document establishes the inviolable architectural, UX, and pedagogical rules for EngQuest3K curriculum mass production. All station views and data layers MUST adhere strictly to these 4 Inviolable Pipeline Rules:

---

### RULE 1: Minimal UI Headers (Zero Subtitle Clutter & Zero Tag Noise)
- **Main Hub Titles**: Header titles across all 4 Cambridge Suite Hubs MUST be strictly minimal:
  - `<h1>Hub 1: World Discovery</h1>`
  - `<h1>Hub 2: Arena Battles</h1>`
  - `<h1>Hub 3: Writing Studio</h1>`
  - `<h1>Hub 4: Nova Talk Show</h1>`
- **Zero Subtitles**: ABSOLUTELY NO `<p>`, `<span>`, or subtitle tags below hub main titles.
- **Zero Noise Tags**: ABSOLUTELY NO badges or buttons rendering text like `"practice_only"`, `"Isolated exam mode"`, or `"(GG TTS)"`. Button text for audio MUST be clean (e.g. `"Play Full Story"`).

---

### RULE 2: Strict English UI (Zero Vietnamese Leaks)
- **Student-Facing UI**: ZERO raw Vietnamese text on student UI elements.
- **Picture Story Panels**: Card titles MUST display English ONLY (`title_en`). ABSOLUTELY NO Vietnamese translation sub-labels (`title_vi`) under panel images.
- **Singapore Bar Models**: All SVG bar model labels MUST be 100% English (`Total: ? items`, `Difference: ?`).
- **Allowed Exception**: Vietnamese is ONLY permitted in the right-hand answer column of Flash Arena matching cards (`definition_vi`).

---

### RULE 3: Flash Arena Data Completeness & 10-Item Tab Render
- **30 Core Items**: Flash Arena data MUST contain 30 distinct items categorized into 3 INDEPENDENT arrays (10 items each):
  1. `set1_nouns_adj`: EXACTLY 10 Nouns and Adjectives. NO VERBS ALLOWED IN THIS TAB.
  2. `set2_verbs`: EXACTLY 10 Verbs.
  3. `set3_chunks`: EXACTLY 10 Lexical Chunks / Collocations.
- **10-Item Render**: UI MUST render all 10 items for the selected card set without `.slice(0,5)` truncation.
- **Tab 3 Label**: Tab 3 label on UI MUST be `"Chunks & Collocations"`.

---

### RULE 4: Cambridge Grammar Check Mode Standard (Clean Gap-Fill)
- **Clean Gap-Fill Format**: Multiple-choice questions MUST be Gap-fill or sentence choices.
- **Zero Dev Tags**: ABSOLUTELY NO raw dev tags displayed on UI (e.g. NO `(past_continuous_when_while)`).
- **Distinct Options**: Options A, B, C MUST be completely distinct grammatical fill-in choices (e.g. Question: `"While Tom ___ up, he broke his alarm clock."` -> A: was waking, B: is waking, C: waked).
