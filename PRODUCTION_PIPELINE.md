# EngQuest3K — Master Production Pipeline & Quality Standards

This document establishes the mandatory architectural and pedagogical rules for EngQuest3K week production. All weeks created or refactored MUST comply 100% with these 5 Inviolable Pipeline Rules.

---

### RULE 1: Minimalist UI Headers (Zero Subtitle Clutter)
- **Main Hub Titles**: Header titles in all 4 Cambridge Suite Hubs MUST be strictly minimal:
  - Hub 1: `"Hub 1: World Discovery"`
  - Hub 2: `"Hub 2: Arena Battles"`
  - Hub 3: `"Hub 3: Writing Studio"`
  - Hub 4: `"Hub 4: Nova Talk Show"`
- **No Subtitle Descriptions**: ABSOLUTELY NO `<p>` or `<span>` descriptive subtitle text below hub main titles (e.g. DELETE `"Explore 6 3D Pixar..."`, `"Interactive Sentence Builder..."`, etc.).

---

### RULE 2: Strict English UI (Zero Vietnamese Leaks)
- **Student-Facing Language**: ZERO raw Vietnamese text on student UI components.
- **Picture Story Panels**: Panel card headers MUST display English titles ONLY (`title_en`). ABSOLUTELY NO Vietnamese translation sub-labels (`title_vi`) under panel images.
- **Singapore Bar Models**: All math SVG labels MUST be 100% English (`Total: ? items`, `Difference: ?`).
- **Allowed Exception**: Vietnamese is ONLY permitted in the right-hand answer column of Flash Arena matching cards (`definition_vi`).

---

### RULE 3: Flash Arena 30-Item Classification & Completeness
- **30 Core Items**: Flash Arena data MUST contain 30 distinct items split into 3 INDEPENDENT 10-item arrays:
  1. `set1_nouns_adj`: EXACTLY 10 Nouns and Adjectives (e.g. `mistake`, `accident`, `puddle`, `backpack`, `vase`, `careful`, `clumsy`, `sorry`, `cautious`, `careless`). NO VERBS ALLOWED IN THIS TAB.
  2. `set2_verbs`: EXACTLY 10 Verbs (e.g. `broke`, `fell`, `lost`, `found`, `slipped`, `spilled`, `dropped`, `apologized`, `repaired`, `searched`).
  3. `set3_chunks`: EXACTLY 10 Lexical Chunks / Collocations (e.g. `broke an alarm clock`, `slipped on a puddle`, `spilled the juice`, `apologized to mom`, etc.).
- **Tab Render**: UI MUST render all 10 items for the selected card set without artificial slicing.

---

### RULE 4: Interactive Practice Only Badge
- **Badge Interactivity**: Every `practice_only` tag rendered in Hub 3 and Hub 4 MUST have:
  ```jsx
  onClick={() => alert('AI Grading is for practice only. Official Cambridge certificates require human examiners.')}
  className="... cursor-pointer"
  ```
- **User Feedback**: Clicking or tapping the badge MUST display the official Cambridge examiner disclaimer popup/alert.

---

### RULE 5: Speaking Logic & Cambridge Intonation Standard
- **Phase 2 Continuous Shadowing**: Narrative text MUST be a coherent, logical continuous story (never piecemeal concatenated sentences).
- **Nova Live Talk Show**: Dialogue state machine MUST be hard-capped at EXACTLY 5 turns (`talkshowTurns.length = 5`).
