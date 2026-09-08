# Learning Proposal: Curriculum Standards & Pipeline Invariants

This proposal synthesizes the key fixes and architectural standards established during Week 37 pipeline development into permanent guidelines in `AGENTS.md`.

## 1. STEM Story 3-Step Problem-Solving Cycle (`read_stem`)
- **Structure**:
  1. **Problem**: Real physical, mathematical, or biomechanical issue (e.g., losing kinetic momentum during baton exchange).
  2. **Science/Math Application**: Core principle applied ($v = d/t$, smooth acceleration) to derive a solution.
  3. **Test & Result**: Practical execution achieving measurable athletic success.
- **Formatting**: Use plain text formulas like `(velocity = distance / time)` rather than unescaped raw LaTeX `\text{...}` to prevent UI rendering errors.
- **Grammar**: Strictly maintain singular agreement for indefinite pronouns (e.g., `Everyone was tired but happy`).

## 2. Social Studies 3-Part History & Geography Framework (`read_social`)
- **Structure**:
  1. **History**: Factual history (e.g., Ancient Olympic Truce *Ekecheiria* in Greece) without anachronisms.
  2. **Geography & Culture**: Global perspective (e.g., 200+ nations in the Modern Olympic Village).
  3. **Social Value**: International peace, sportsmanship, and respect across cultures.
- **No Preachy Civics**: Replace generic moral lecturing with engaging historical/geographical knowledge.
- **Contextual Keyword Weaving**: Transition fixed weekly keywords naturally (e.g., *`For example, on a sunny Saturday morning during the Opening Ceremony...`*).

## 3. Explore Station Global World Horizon (`explore.js`)
- **Global Context**: Focus on world geography, unique cultures, and global sports phenomena (e.g., Kenya's high-altitude marathon champions at 2,400m in Iten).
- **No Local Repetition**: Prohibit repeating generic local school hygiene or 30-minute daily exercise advice.
- **Grammar & Perspective**: Maintain singular verb agreement for gerunds (*`Absorbing... helps`*) and consistent 3rd-person perspective.

## 4. Shadowing Station & Video Selection Invariants
- **Dual-Mode Separation**: `shadowing.js` `script` array MUST contain 10-12 TTS reading summary sentences. Video transcripts MUST remain isolated in `video_transcripts_by_id/sentences/<videoId>.json`.
- **Conversational Video**: Selection MUST feature character dialogue with short 2–6 second sentences aligned with Syllabus metadata, and MUST NOT reuse video IDs from W01–W36.

## 5. Cascading Station & AI Tutor Synchronization Matrix
- **Automated Sync**: Updating `read.js` or `explore.js` requires synchronizing all downstream files (`writing.js`, `mindmap.js`, `daily_watch.js`, `vocab.js`, `word_power.js`, `logic_science.js`, `dictation.js`, `week_XX_real.js`, `week_XX_easy_real.js`) in the same build.
- **Index Schema**: `index.js` MUST export the full `weekData` object with `stations: { ... }` wrapper to prevent `undefined` title crashes or infinite loading spinners.
- **AI Tutor TTS Alignment**: Story mission prefetch MUST match `voice: 'en-US-Journey-F'` and `station: 'story'` to guarantee 0ms instant playback.

---

### Proposed Edits to `AGENTS.md`
We will update the **Master Curriculum & Blueprint Station Pipeline Matrix** section in `AGENTS.md` with these refined standards.
