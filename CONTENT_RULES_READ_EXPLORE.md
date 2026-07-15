# EngQuest Content Quality Rules — read.js & explore.js
## For Mass Production: All 156 Weeks

> **Purpose**: This document is the definitive QC gate for all `read.js` and `explore.js` content across both Easy Mode and Advanced Mode. It formalises rules from Blueprint V4.0 and adds explicit constraints that were missing in the Blueprint. Every AI-generated or human-written passage **must pass all checks** in Section 4 before being committed.

---

## Section 1: Rules FROM Blueprint V4.0 (Existing)

These rules are defined in Blueprint V4.0 and must always be followed:

| Rule ID | Rule | Applies To |
|---------|------|-----------|
| B-01 | **10 Bold Words**: Exactly 10 vocabulary words must be bolded (`**word**`) in `content_en`. The same 10 words must come from that week's `vocab.js`. | Both modes, all phases |
| B-02 | **Sentence count — Easy**: Target 6–8 sentences per passage. | Easy, all phases |
| B-03 | **Sentence count — Advanced**: Target 8–12 sentences per passage. | Advanced, all phases |
| B-04 | **Grammar alignment**: Grammar structures used in the passage must match the week's Syllabus Grammar Focus (or one level earlier — never more than one level ahead). | Both modes |
| B-05 | **Dual-Mode context**: Easy = Personal & Immediate (self, family, classmates, local environment). Advanced = Global & Abstract (world history, science, society). | Both modes |
| B-06 | **Audio emotion**: The passage should be written with expressive tone (storytelling voice), not neutral reading. Mark emotional beats with punctuation (!, ..., em-dash). | Both modes |
| B-07 | **Phase 1 STEM starts W16**: Science/logic content may appear in explore from Week 16 onwards. Weeks 1–15 are language-only. | Both modes |

---

## Section 2: NEW Rules Added (Not in Blueprint V4.0)

The following rules are **not** in Blueprint V4.0 but are required based on audit findings from Weeks 12–30.

### 2.1 Language Purity Rule

| Rule ID | Rule |
|---------|------|
| **N-01** | `content_en` must contain **zero non-English characters**. Vietnamese diacritics (ă, ê, đ, ơ, etc.) or raw Vietnamese phrases (e.g., "Bo Truyen Tranh") are forbidden in `content_en`. Vietnamese belongs exclusively in `content_vi`. |
| **N-02** | `content_vi` must not contain undiacriticised Vietnamese (e.g., "o Nhat Ban" instead of "Ở Nhật Bản"). Use proper Unicode Vietnamese or fully romanise — no mixing. |

### 2.2 Vocabulary Coverage Rule

| Rule ID | Rule |
|---------|------|
| **N-03** | `content_en` must contain a minimum of **8 out of 10** target vocabulary words from `vocab.js` (exact word **or** a natural inflected form: *play → playing, played*). |
| **N-04** | No non-target academic or science term may appear in `content_en` **unless** it is itself a target word in `vocab.js`. Example: `carbohydrates` (not in vocab) = ❌; `evaporation` (in vocab W17) = ✅. This prevents content from teaching the wrong vocabulary set. |

### 2.3 Word Count (Precise) Rule

Blueprint says "6-8 sentences" but word count is the operative metric. Sentences vary too widely.

| Rule ID | Mode | Phase | read.js (words) | explore.js (words) |
|---------|------|-------|----------------|--------------------|
| **N-05a** | Easy | Phase 1 (W1–54) | 80–130 | 80–140 |
| **N-05b** | Easy | Phase 2 (W55–120) | 110–160 | 120–180 |
| **N-05c** | Easy | Phase 3 (W121–156) | 140–200 | 150–220 |
| **N-05d** | Advanced | Phase 1 (W1–54) | 130–200 | 130–210 |
| **N-05e** | Advanced | Phase 2 (W55–120) | 180–260 | 180–280 |
| **N-05f** | Advanced | Phase 3 (W121–156) | 220–320 | 220–340 |

> Count words in `content_en` only. Markdown bold markers (`**`) do not count as words.

### 2.4 CEFR / Vocabulary Level Rule

| Rule ID | Rule |
|---------|------|
| **N-06** | **Easy Mode, Phase 1 (W1–54)**: Non-target vocabulary (words NOT in vocab.js) must be A1–A2 level (Oxford 3000 Band 1–2, Dolch list, common everyday words). No B1+ standalone terms. |
| **N-07** | **Easy Mode, Phase 2 (W55–120)**: Non-target vocabulary may extend to A2–B1. Abstract nouns and academic collocations permitted if simple. |
| **N-08** | **Advanced Mode, Phase 1 (W1–54)**: Non-target vocabulary may be A2–B1 (Tier 2 academic vocabulary). B2 standalone terms require contextual support (definition in the sentence). |
| **N-09** | **Advanced Mode, Phase 2+ (W55–156)**: Full CLIL vocabulary (B1–B2) permitted. Phase 3 may use B2–C1 for Advanced mode. |
| **N-10** | **CLIL Science/Academic content** in explore (e.g., forensic science, urban planning, neuroscience) is only permitted in **Advanced Mode from W37+** and **Easy Mode from W55+**, in alignment with syllabus CLIL onset. Before those weeks, explore topics must stay within the week's real-world theme without academic labelling. |

### 2.5 No Meta-Grammar Rule

| Rule ID | Rule |
|---------|------|
| **N-11** | Dialogue or narration in `content_en` must **never explicitly label grammar rules**. Characters must not say: *"These are all Regular Verbs with -ed!"* or *"I used Was and Were!"*. Grammar is embedded naturally — students absorb it from context, not from characters announcing it. |

### 2.6 Explore – Grammar Connection Rule

| Rule ID | Rule |
|---------|------|
| **N-12** | The explore passage must **naturally embed** the week's target grammar structures. If the week's grammar is Past Simple, the explore narration should be in past tense. It does not need to force the grammar — but the passage should not actively avoid it. Use the topic as a vehicle for the grammar, not the other way around. |

### 2.7 Check Questions Rule

| Rule ID | Rule |
|---------|------|
| **N-13** | Each `check_questions` item must have an answer that is **explicitly found in `content_en`** — never inference-only or outside the text. Inference and opinion belong in the `question` (open-ended) field at the bottom. |
| **N-14** | All 3 check questions must reference different paragraphs of `content_en` — no two questions about the same sentence/idea. |

---

## Section 3: Phase × Mode Scaffolding Reference — All 156 Weeks

### 3.1 Scaffolding Architecture

```
Phase 1: Weeks  1–15   → Language Foundation ONLY. No STEM. Grammar: Be, Pronouns, Simple Present.
Phase 1+: Weeks 16–54  → Language + STEM Integration. Grammar: Present Continuous through Past Simple review.
Phase 2: Weeks  55–120 → Applied STEM + Complex Grammar. CLIL topics. Grammar: Complex sentences, Relative clauses, Passive.
Phase 3: Weeks 121–156 → Academic + Competition Ready. Essays, debate, B2 vocabulary.
```

### 3.2 Read.js Content Scaffolding by Block

| Block | Weeks | Topic Domain | Grammar Target | read.js Type | Easy Mode Shape | Advanced Mode Shape |
|-------|-------|-------------|----------------|-------------|-----------------|---------------------|
| A | 1–18 | Here & Now (self, family, school, body, weather) | Present Simple; Be; Have; Present Continuous | Personal narrative / dialogue | 80–110 words. "I am..." / "We are..." / "It is..." sentences. Subject + simple predicate. | 130–170 words. Full scene, minor characters, conflict/emotion. One complex sentence per paragraph. |
| B | 19–36 | Growing World (town, past, detectives, sports, art, emotions) | Was/Were, Past Simple regular, Past Simple irregular intro | Anecdote (yesterday, last week) | 90–120 words. "Yesterday I..." / "Last week we...". Short paragraphs (2–3 lines). | 150–200 words. Chronological mini-story. 2–3 past-tense paragraphs. One "although/because" sentence. |
| C | 37–54 | Wider World (community, science, geography, nature) | Past Simple irregular, Comparatives, Superlatives | Informational narrative | 100–130 words. Concrete comparisons (bigger, fastest, most). | 160–210 words. Comparative analysis. Some abstract nouns. "The more…, the more…" pattern allowed. |
| D | 55–72 | CLIL Science (life cycles, ecosystems, matter) | Present Perfect intro, "have been / have done" | Informational + narrative hybrid | 110–150 words. Simple compound sentences (and/but/so). Content = personal discovery. | 180–240 words. Scientific explanation tone. Passive voice intro ("is called", "was discovered"). |
| E | 73–96 | CLIL Social Studies (history, culture, rights, technology) |2nd Conditional, Relative clauses (who/which/that) | Narrative with embedded facts | 120–160 words. One relative clause per passage. | 200–260 words. 2nd conditional + relative clauses natural in context. B1 vocabulary. |
| F | 97–120 | Global Issues (environment, media, health, innovation) | Passive voice, Reported speech | Explanatory essay style | 140–180 words. Simple passive ("was built", "were found"). | 220–280 words. Full passive + reported speech. Topic sentences + evidence. |
| G | 121–156 | Academic & Competition (argumentation, data, ethics, systems) | Mixed tenses; Concession (Although/Despite); Emphasis | Opinion / analysis | 160–200 words. Has a clear position. Connectors: however, therefore, as a result. | 250–320 words. Essay-like with intro/body/conclusion feel. B2 vocabulary. Academic stance. |

### 3.3 Explore.js Content Scaffolding by Block

| Block | Weeks | explore.js Format | Easy Mode Content Rule | Advanced Mode Content Rule |
|-------|-------|------------------|------------------------|---------------------------|
| A | 1–18 | Short non-fiction with personal context. Max 3 paragraphs. | Topic = the student's own world (body, toys, family, weather routines). Zero science jargon — only target vocab. 80–120 words. | Topic = generalised concept (robots globally, weather science). Target vocab + 1–2 adjacent Tier 2 words. 120–170 words. |
| B | 19–36 | Mixed narrative/informational. 3–4 paragraphs. | Topic = community, history, how things work — in simple story framing ("One day, a detective…"). No abstract labels. 90–130 words. | Topic = real-world facts with modest academic framing. Forensic/urban/sports science permitted with simple explanation. 140–200 words. |
| C | 37–54 | Informational text. 4 paragraphs. | Topic = nature, simple science. 100–140 words. Comparison structures (bigger, more, less). | Topic = CLIL science, culture, geography. Comparative analysis. 160–210 words. B1 science terms permitted if in vocab.js. |
| D | 55–72 | CLIL article, 4–5 paragraphs. | Topic = CLIL science/social at personal human level. 120–160 words. Passive voice intro. | Topic = abstract CLIL. Cause-effect. Statistics allowed with simple framing. 180–250 words. |
| E | 73–96 | Feature-style text with subheadings optional. | 140–180 words. One "because/so" per paragraph. | 200–280 words. Subheadings allowed. Relative clauses natural. |
| F | 97–120 | Explanatory article with evidence. | 150–180 words. | 220–280 words. Evidence + counter-argument. |
| G | 121–156 | Academic editorial or analysis. | 160–200 words. Simple position. | 260–340 words. Argument + synthesis. Academic vocab B2. |

---

## Section 4: QC Checklist — Use Before Every Commit

Run this checklist for **each file** (read.js, explore.js) across **both modes** before merging.

### Pre-commit QC: read.js

```
[ ] B-04  Grammar in content_en matches week's syllabus grammar focus (check 1. NEW-FINAL_Khung CT_SYLLABUS.txt)
[ ] B-01  Exactly 10 words bolded with **word**
[ ] N-03  At least 8 of 10 target words from vocab.js appear in content_en
[ ] N-05  Word count is within target range for this mode/phase (see Section 3.2)
[ ] N-01  content_en has zero Vietnamese characters or unaccented Vietnamese phrases
[ ] N-06  All non-target vocabulary ≤ A2 level (Easy Phase 1), or within allowed level for mode/phase
[ ] N-11  No character explicitly names a grammar rule ("These are regular verbs!", "I used past simple!")
[ ] N-13  All comprehension_questions have answers explicitly in content_en
[ ] N-14  Questions spread across different paragraphs
[ ] B-05  Easy = personal story. Advanced = global/abstract context.
```

### Pre-commit QC: explore.js

```
[ ] B-04  content_en embeds the week's target grammar structures naturally
[ ] B-01  Exactly 10 words bolded with **word** in content_en
[ ] N-03  At least 8 of 10 target words from vocab.js appear in content_en
[ ] N-04  No non-target academic label used unless it is itself in vocab.js
[ ] N-05  Word count within target range for this mode/phase (see Section 3.3)
[ ] N-01  content_en has zero Vietnamese / non-English characters
[ ] N-10  CLIL academic content: only Advanced from W37+, only Easy from W55+
[ ] N-11  No meta-grammar commentary in narration or character dialogue
[ ] N-12  Passage naturally uses the week's grammar focus in its sentences
[ ] N-13  check_questions[1-3] answers are explicitly in content_en
[ ] N-14  3 questions cover 3 different parts of the passage
[ ] B-06  Writing tone is expressive/storytelling — not flat reading-aloud style
```

---

## Section 5: Banned Vocabulary Quick-Reference

These terms caused violations in the audit (Weeks 12–30). Do not use in **Easy Mode before W55** unless explicitly in that week's `vocab.js`:

| Term | Level | Why Banned in Easy Phase 1 |
|------|-------|---------------------------|
| forensic science | B1 | Label for investigative science; not in target vocab |
| urban planners | B2 | Abstract professional role |
| neuroscience | B2 | Phase 2+ academic term |
| oxytocin | B2 | Phase 2+ science term |
| dopamine | B2 | Phase 2+ science term |
| fight-or-flight | B1 | Psychology jargon |
| psychologists | B1 | Professional title |
| carbohydrates | B1 | Science nutrition label |
| protein (as concept) | B1 | Science nutrition label (not in W30 vocab.js) |
| ancestors | B1 | Abstract historical term |
| gravity (as physics) | B1 | OK in Advanced W16+; avoid Easy unless in vocab.js |
| comparative doubles ("the harder…") | B2 | Phase 2+ grammatical structure |
| gracefully | B1 | Not in A1 target vocab |
| portraits | B1 | Fine art term |
| precipitation | B2-in-context | **EXCEPTION**: Allowed in Easy W17 because it IS in W17 vocab.js |
| atmosphere | B1-in-context | **EXCEPTION**: Allowed in Easy W17 because it IS in W17 vocab.js |
| evaporation | B1-in-context | **EXCEPTION**: Allowed in Easy W17 because it IS in W17 vocab.js |

> The evaporation/atmosphere exception illustrates the general rule: **if it's in vocab.js it's allowed; if it's NOT in vocab.js it must pass the CEFR level test for that mode/phase.**

---

## Section 6: AI Prompt Template for Generating read.js / explore.js

When using an AI (Claude, GPT, etc.) to generate content, include the following constraints in the prompt:

```
WEEK: [N]
MODE: [Easy / Advanced]
TOPIC: [exact topic from syllabus, e.g. "The Talent Show (Abilities)"]
GRAMMAR TARGET: [e.g. "Can / Can't — abilities"]
TARGET VOCAB (from vocab.js): [list all 10 words, comma-separated]

CONTENT TYPE: [read.js — personal story narrative | explore.js — thematic non-fiction]

RULES YOU MUST FOLLOW:
1. Word count: [target from Section 3 table for this phase/mode]
2. Bold EXACTLY these 10 words in the text (use **word**): [list]
3. Use at least 8 of the 10 target words above in content_en
4. Easy mode: context must be personal (I/my family/my class). Advanced: global/abstract.
5. Grammar in sentences must match [Grammar Target] above — embed it naturally, never announce it
6. Zero Vietnamese words or characters in content_en — ONLY English
7. Phase [1/2/3]: no academic/science jargon beyond what is in the TARGET VOCAB list
8. Comprehension questions must have answers explicitly in the text (not inference)
9. Tone: expressive storytelling, not textbook-flat
10. No character should name or explain grammar rules explicitly

OUTPUT FORMAT: Valid JavaScript export default { ... } matching the existing schema
```

---

## Section 7: Known Issues Fixed (Audit Trail)

| Week | File | Mode | Issue | Fixed In Commit |
|------|------|------|-------|----------------|
| W12 | read.js | Advanced | B1 vocab not in target list (gracefully, portraits, obstacles) | 070dd73 |
| W16 | explore.js | Advanced | Physics jargon (gravity, force, comparative doubles) not in vocab | 070dd73 |
| W20 | explore.js | Advanced | "urban planners" B2 concept, not in vocab | 070dd73 |
| W22 | explore.js | Advanced | "Edmond Locard 1910", "DNA 1986", forensic lab, court — B1-B2 | 070dd73 |
| W24 | explore.js | Advanced | fight-or-flight, dopamine, psychologists — B1-B2 | 070dd73 |
| W26 | explore.js | Advanced | neuroscience, oxytocin, 323% stat — B2 | 070dd73 |
| W26 | read.js | Advanced | Meta-grammar dialogue (Mia lists -ed verbs explicitly) | 070dd73 |
| W22 | explore.js | Easy | "forensic science" label in content_en | (this session) |
| W23 | explore.js | Easy | 224 words (target: 80-140); texture/symmetry sections bloated | (this session) |
| W26 | explore.js | Easy | "Bo Truyen Tranh Doraemon" — raw Vietnamese in content_en | (this session) |
| W30 | explore.js | Easy | Missing 10/13 target vocab; carbohydrates/protein not in vocab.js | (this session) |

---

*Last updated: April 2026 | Based on Blueprint V4.0 + audit of Weeks 12–30*
