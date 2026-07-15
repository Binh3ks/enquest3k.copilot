# Logic Lab Specification — W36+

> **Version:** 1.0  
> **Created:** 2026-07-14  
> **Golden standard:** `src/data/weeks/week_36/` (ADV) + `src/data/weeks_easy/week_36/` (Easy)  
> **Blueprint ref:** §3.3, §6.4, §7.3

---

## 0. Overview

Logic Lab is the third station group in each week (after Read & Explore and Vocab). It contains three sub-tabs that students access via tab switching:

| Tab | File (ADV) | File (Easy) | Purpose |
|---|---|---|---|
| 🔬 Logic & Science | `logic_science.js` | `logic_science.js` | Reasoning and STEM knowledge |
| 📐 Singapore Math | `singapore_math.js` | `singapore_math.js` | Visual math problems with bar models |
| 🌍 Social Quiz | `social_quiz.js` | `social_quiz.js` | Geography and history knowledge |

**Total questions per week:** Flexible allocation, guided by Blueprint §3.3. Singapore Math is always exactly **5 questions**. Logic & Science and Social Quiz share the remaining slots flexibly:

| Week profile | Logic & Science | Singapore Math | Social Quiz | Total |
|---|---|---|---|---|
| STEM-heavy (e.g. animals, ocean) | 7–8 | 5 | 3–4 | 15–17 |
| Social-heavy (e.g. history, exploration) | 5 | 5 | 7–8 | 17–18 |
| Balanced (e.g. continents, weather) | 5 | 5 | 5 | 15 |

**Note:** W36 ADV has 18 questions (8+5+5). W36 Easy has 14 (5+5+4). The Blueprint guideline is "15 questions max (~25 min)" but the W36 golden standard exceeds this slightly. Production agents should target **15–18 questions total**.

---

## 1. Tab 1 — Logic & Science

### 1.1 Purpose

Develop critical thinking and scientific reasoning through weekly-topic-themed questions. Students apply logic (directions, sequences, spatial reasoning) and science knowledge (submarines, ecosystems, geography) to solve problems connected to the week's reading and exploration content.

### 1.2 Learning Objectives

- Apply logical reasoning to multi-step scenarios
- Recall and explain science concepts introduced in Read & Explore
- Connect STEM knowledge to real-world applications
- Develop spatial and directional reasoning
- Practice elimination and evidence-based reasoning

### 1.3 Student Experience

1. Student taps "🔬 Logic & Science" tab
2. Reads a scenario-based question with 4 multiple-choice options
3. Selects an answer
4. Sees the result (correct/incorrect) with a detailed explanation
5. Repeats for 5–8 questions per week

### 1.4 Content Structure

Each question is a self-contained scenario. Questions alternate between two types:

| Type | What it tests | Example (W36) |
|---|---|---|
| `logic` | Spatial reasoning, sequences, process of elimination | "An explorer walks north, turns right, walks east, turns right again, walks south. Where is he facing?" |
| `science` | STEM knowledge, real-world application | "How does a submarine go down deep into the ocean?" |

**Recommended type distribution per week:**
- 50–60% logic questions (directions, sequences, counting, spatial)
- 40–50% science questions (STEM concepts, real-world application)

### 1.5 Expected Schema

```js
export default {
  title: "Week Theme Logic and Science",   // string
  theme: "weekly_theme_slug",               // string — matches week theme
  questions: [
    {
      id: 1,                                 // integer, sequential
      type: "logic" | "science",             // enum — only two types
      question_en: "Scenario question...",   // string — full English question with context
      options: [                             // string[] — exactly 4 options
        "Correct answer with detail",
        "Plausible distractor 1",
        "Plausible distractor 2",
        "Clearly wrong distractor"
      ],
      correct: "Correct answer with detail", // string — exact match to one option
      explanation_en: "Detailed explanation..." // string — educational explanation
    }
    // ... more questions
  ]
};
```

**Field rules:**
- `correct` is a **string** (not an array). It must exactly match one of the `options[]` entries.
- `explanation_en` is present in ADV mode. Easy mode also uses `explanation_en`.
- No `answer[]` array — Logic & Science uses `correct:` (string), not `answer:` (array).
- No `hint_en` / `hint_vi` — Logic & Science provides no hints. Students must think through the problem.

### 1.6 Difficulty Progression

| Week range | ADV characteristics | Easy characteristics |
|---|---|---|
| W16–W27 | Direct logic, single-step science | Same topics, simpler vocabulary |
| W28–W35 | Multi-step logic, applied science | Simplified scenarios, more scaffolding in question text |
| **W36+** | 2–3 step reasoning, STEM vocabulary, real-world context | 1–2 step reasoning, simpler vocabulary, same core concept |

**Within a single week:**
- Questions should progress from easier to harder
- Start with direct recall or simple deduction
- End with multi-step reasoning or applied science

### 1.7 Weekly Adaptation Rules

1. **Theme alignment:** Every question must connect to the week's topic (e.g. W36 = Adventure Stories → questions about submarines, compasses, Marco Polo, Silk Road)
2. **Vocabulary bridge:** At least 2 questions should use vocabulary from the week's `vocab.js` or `read.js` `key_vocabulary[]`
3. **Grammar reinforcement (optional):** If the week's grammar focus lends itself to logic puzzles (e.g. irregular verbs → sequencing), include at least 1 question that reinforces it
4. **Cognitive variety:** Mix directions/spatial (logic) with science facts (science) — never all one type in a row
5. **Distractor quality:** Every distractor must be plausible — a student who misread or misremembered could select it

### 1.8 Cross-Station Dependencies

| Depends on | How |
|---|---|
| Read & Explore | At least 2 questions should reference concepts, facts, or characters from the read_stem or read_social stories |
| Vocab | At least 2 questions should use words from the week's vocabulary |
| Grammar | Optional: logic puzzles can reinforce grammar pattern (e.g. sequencing for past tense) |

### 1.9 Validation Rules

1. Questions must be MCQ with exactly **4 options**
2. `correct` must exactly match one of `options[]`
3. No empty `question_en` or `explanation_en`
4. No HTML tags in question text
5. All questions must be age-appropriate and culturally respectful
6. ASCII apostrophes only — no curly quotes
7. `type` must be `"logic"` or `"science"` — no other types
8. Total questions: 5–8 per week (ADV), 3–5 per week (Easy)

### 1.10 Definition of Done

- [ ] All questions use `type: "logic"` or `type: "science"` only
- [ ] `correct` exactly matches one of the 4 `options[]`
- [ ] `explanation_en` is present for every question
- [ ] At least 2 questions reference the week's reading or vocabulary
- [ ] Questions alternate between logic and science types
- [ ] No curly quotes or HTML tags
- [ ] Easy mode uses simpler vocabulary but same core concepts as ADV
- [ ] `npm run build` passes

### 1.11 Product Owner Checklist

- [ ] Questions are age-appropriate for K-12 learners
- [ ] STEM content is scientifically accurate
- [ ] Logic puzzles are solvable with the information given
- [ ] Distractors are plausible (not obviously wrong)
- [ ] Explanations are educational and clear
- [ ] Questions connect to the week's theme
- [ ] Easy mode is genuinely easier (not just shorter)
- [ ] No factual errors in science questions

### 1.12 Media Requirements

| Media | Generated? | Notes |
|---|---|---|
| Images | None required | Logic & Science questions are text-only |
| Audio | Optional | Some questions may have narration audio via `voiceConfig.logic_lab` |
| Diagrams | None | No bar models or visual aids — pure text MCQ |

---

## 2. Tab 2 — Singapore Math

### 2.1 Purpose

Deliver visual math problems using the Singapore Math CPA (Concrete–Pictorial–Abstract) approach. Students solve word problems that are illustrated with bar model diagrams, reinforcing the weekly theme through mathematical thinking.

### 2.2 Learning Objectives

- Solve multi-step word problems using bar model visualisations
- Identify the correct problem type from the question structure
- Perform addition, subtraction, and multiplication within context
- Connect mathematical thinking to the weekly theme
- Build visual reasoning through part-whole, comparison, and grouping models

### 2.3 Student Experience

1. Student taps "📐 Singapore Math" tab
2. Reads a word problem themed to the week
3. Views a bar model diagram illustrating the problem structure
4. Enters a numeric answer
5. Sees a hint (English + Vietnamese) if needed
6. Repeats for exactly 5 problems per week

### 2.4 Content Structure

**Always exactly 5 problems per week** (both ADV and Easy).

### 2.5 Expected Schema

```js
export default {
  title: "Week Theme Math Problems",   // string
  theme: "weekly_theme_slug",           // string — matches week theme
  problems: [
    {
      id: 1,                             // integer, sequential
      type: "part_whole",                // enum — see valid types below
      question_en: "Word problem...",    // string — full question with numbers
      bar_model: "/images/weekNN/barmodel_wNN_adv_p1_v1.jpg",  // string path
      answer: ["35"],                    // string[] — numeric answer(s), ALWAYS string array
      hint_en: "Subtract 40 from 100.",  // string — English hint
      hint_vi: "Tru 40 khoi 100."       // string — Vietnamese hint
    }
    // ... exactly 5 problems
  ]
};
```

### 2.6 Valid Problem Types

| Type | When to use | Bar model visual |
|---|---|---|
| `part_whole` | Total is known or unknown; parts are added/subtracted. "How many in total?" / "How many left?" | Whole bar = Total (?), split into Part A + Part B |
| `comparison` | Comparing two quantities. "How many more?" / "How many fewer?" | Two bars with difference arrow |
| `missing_part` | Total known, one part unknown. "How deep is it now?" / "How many are left?" | Whole bar + known part + unknown (?)
| `groups` | Equal groups. "How many in total?" (multiplication) | N equal-segment bars |
| `before_after` | Starting amount changes. "How many at first?" / "What happened?" | Start bar + change + result |

**INVALID types (will cause silent rendering failure):**
`addition`, `subtraction`, `multiplication`, `division`, `ADD`, `SUB`, `MUL`, `DIV`, `plus`, `minus`, `times`, `divided`, `sum`, `difference`, `product`, `quotient`

**Type selection guide:**
- "in total" / "altogether" with unknown total → `part_whole`
- "left" / "remaining" / "came up" with known total → `missing_part`
- "how many more" / "how many fewer" → `comparison`
- "each boat carries N" → `groups`
- "at first" / "had some, then..." / "started with" → `before_after`

### 2.7 Field Rules

1. `answer[]` must be a **string array** `["35"]`, not an object array `[{label:"35"}]`
2. `bar_model` must be a **string path** `"/images/..."`, not an object
3. `hint_en` and `hint_vi` are required — no `hints: [...]` array format
4. `question_en` is required
5. `type` must be one of the 5 valid types listed above
6. ADV numbers: ≥2-digit numbers (W22+). Easy numbers: ≤15

### 2.8 Bar Model Generation

Bar model images are generated by the automated pipeline:

```bash
python3 tools/generate_logiclab_barmodels.py NN            # generate all
python3 tools/generate_logiclab_barmodels.py NN --skip-existing  # skip existing
```

**File naming convention:**
```
/images/week{NN}/barmodel_w{NN}_{adv|easy}_p{N}_v{V}.jpg
```

Where:
- `NN` = zero-padded week number (e.g. `36`)
- `adv` or `easy` = mode
- `N` = problem number (1–5)
- `V` = version number (starts at `v1`, increment on re-generation)

**Image specs:**
- Dimensions: 1600×900 px
- Format: JPEG
- Font: Arial (system)
- Library: PIL/Pillow
- Minimum file size: 1KB (validated by `validate_barmodels.js`)

**Supported diagram types in the generator:**

| Problem type | Generator support | Visual |
|---|---|---|
| `part_whole` | ✅ | Classic part-whole bar with purple/labelled sections |
| `comparison` | ✅ | Two bars with difference arrow |
| `missing_part` | ✅ | Whole bar + known part + unknown box |
| `groups` | ✅ | N equal-segment bar |
| `before_after` | ✅ | Start bar + change label + result box |

**When to generate automatically:**
- **Always** during `BƯỚC 3` of the week-builder workflow
- The generator reads `singapore_math.js`, extracts `type` and `bar_model` path, renders the diagram, saves to `public/images/weekNN/`
- Use `--skip-existing` flag to avoid overwriting previously generated images

**When NOT to generate:**
- For weeks W1–W16 (`language` CPA stage — no bar models rendered)
- If `bar_model` field is empty string `""` (type `no_diagram`)

### 2.9 Difficulty Progression

| Week range | CPA Stage | ADV numbers | Easy numbers | Problem types |
|---|---|---|---|---|
| W1–W16 | `language` | 1-digit | 1-digit | `part_whole` only (add/sub) |
| W17–W34 ADV | `pictorial` | ≥2-digit | ≤15 | + `missing_part`, `comparison` |
| W17–W34 Easy | `concrete` | ≥2-digit | ≤15 | + `missing_part`, `groups` |
| **W36+** | `pictorial` | ≥2-digit | ≤15 | All 5 types allowed: `part_whole`, `comparison`, `missing_part`, `groups`, `before_after` |

### 2.10 Weekly Adaptation Rules

1. **Theme alignment:** Every word problem must use the week's theme context (e.g. W36 → gold coins, submarines, Marco Polo, Silk Road artifacts)
2. **Type diversity:** W36+ should use at least 3 different types across the 5 problems. Avoid all 5 being `part_whole`.
3. **Number appropriateness:** ADV ≥2-digit numbers. Easy ≤15.
4. **Answer format:** Always numeric (no fractions in W36+, no decimals unless theme requires)
5. **Hint quality:** Hints should guide the approach ("Subtract 40 and 25 from 100"), not give the answer ("The answer is 35")

### 2.11 Cross-Station Dependencies

| Depends on | How |
|---|---|
| Read & Explore | Problem contexts should reference the week's story (submarine depths, Marco Polo artifacts, etc.) |
| Vocab | Can use vocabulary terms in problem context |
| Grammar | No direct dependency |

### 2.12 Validation Rules

**Automated validators (must pass before commit):**

| Validator | Command | What it checks |
|---|---|---|
| Type validator | `node production_kit/tools/validate_sgmath_types.mjs N` | Valid `type` names, `answer[]` format, `bar_model` path format, `hint_en`/`hint_vi` present, exactly 5 items |
| Bar model validator | `node tools/validate_barmodels.js N` | Bar model file naming convention, file exists, file ≥1KB, type-semantic sanity check |

**Manual validation:**
1. Exactly 5 problems per mode
2. `type` is one of: `part_whole`, `comparison`, `missing_part`, `groups`, `before_after`
3. `answer[]` is a string array
4. `bar_model` is a string path following `barmodel_w{NN}_{mode}_p{N}_v{V}.jpg`
5. All bar model images exist and are ≥1KB
6. Hints guide the approach, not the answer
7. ADV numbers ≥2-digit. Easy numbers ≤15

### 2.13 Definition of Done

- [ ] Exactly 5 problems per mode (ADV + Easy)
- [ ] All types are valid (`part_whole`, `comparison`, `missing_part`, `groups`, `before_after`)
- [ ] At least 3 different types across the 5 problems
- [ ] `answer[]` is string array (not object array)
- [ ] `bar_model` is string path (not object)
- [ ] `hint_en` and `hint_vi` present on every problem
- [ ] `validate_sgmath_types.mjs N` passes
- [ ] `validate_barmodels.js N` passes
- [ ] Bar model images generated and exist at specified paths
- [ ] ADV numbers ≥2-digit. Easy numbers ≤15
- [ ] `npm run build` passes

### 2.14 Product Owner Checklist

- [ ] Word problems are age-appropriate and thematically relevant
- [ ] Numbers are realistic for the context (no absurd values)
- [ ] Bar models visually match the problem structure (type sanity check)
- [ ] Hints are helpful without giving away the answer
- [ ] Easy mode is genuinely simpler than ADV
- [ ] All 5 types used across the week are pedagogically sound
- [ ] Vietnamese translations are natural and correct

### 2.15 Media Requirements

| Media | Generated? | Notes |
|---|---|---|
| Bar model images | **Yes — automatic** | `generate_logiclab_barmodels.py NN` renders all 5 images |
| Audio | Optional | Via `voiceConfig.logic_lab` |
| Diagrams | **Yes — automatic** | Bar model images ARE the diagrams |

---

## 3. Tab 3 — Social Quiz

### 3.1 Purpose

Reinforce the Social Studies Story from Read & Explore through a quiz format. Students test their knowledge of geography, history, and culture concepts introduced in the `read_social` tab. This tab connects directly to the Social Studies Story, not just the general weekly theme.

### 3.2 Learning Objectives

- Recall factual knowledge from the Social Studies Story
- Understand geographic concepts (continents, trade routes, compass directions)
- Learn historical context (time periods, key figures, cultural exchanges)
- Connect Social Studies concepts to the weekly theme
- Build geography and history vocabulary

### 3.3 Student Experience

1. Student taps "🌍 Social Quiz" tab
2. Reads a geography or history question with 4 multiple-choice options
3. Selects an answer
4. Sees the result (correct/incorrect) with an explanation
5. Optionally sees vocabulary words used in the question
6. Repeats for 3–7 questions per week

### 3.4 Content Structure

**Question count:** 3–7 per week, determined by week profile:

| Week profile | Social Quiz questions | Rationale |
|---|---|---|
| STEM-heavy | 3–4 | Light geography/history reinforcement |
| Balanced | 5 | Equal weight with Logic & Science |
| Social-heavy | 7 | Deep geography/history exploration |

**Type distribution (Blue§7.3):**

| Type | Target count (per 7-question week) | Example |
|---|---|---|
| `geography_mcq` | 1–2 | "The Silk Road connected which two continents?" |
| `geography_reasoning` | 1–2 | "Why is the Silk Road important in history?" |
| `history_mcq` | 1–2 | "How long was Marco Polo's journey?" |
| `history_reasoning` | 0–1 | "Why did some people not believe Marco Polo?" |
| `cultural_geography` | 0–1 | "Why is rice important in Asia?" |
| `geography_application` | 0–1 | "What crop does the Mekong Delta produce?" |

**Balance rule:** ~50% Geography, ~30% History, ~20% Culture/Economics.

### 3.5 Expected Schema

```js
export default {
  questions: [
    {
      type: "geography_mcq",                    // enum — see valid types
      question_en: "Which two continents...?",  // string — English question
      question_vn: "Hai chau luc nao...?",      // string — Vietnamese translation
      options: [                                // string[] — exactly 4 options
        "Asia and Europe",
        "Africa and Asia",
        "Europe and America",
        "Australia and Asia"
      ],
      correct: "Asia and Europe",               // string — exact match to one option
      explanation: "The Silk Road connected...",// string — educational explanation
      vocab: ["Silk Road", "merchant", "trade"] // string[] — related vocabulary (3-5 words)
    }
    // ... more questions
  ]
};
```

### 3.6 Field Rules

1. `correct` is a **string** (not an array). Must exactly match one `options[]` entry.
2. `explanation` (NOT `explanation_en`) — this is different from logic_science.js which uses `explanation_en`.
3. `question_vn` (Vietnamese translation) is required on every question.
4. `vocab` array lists 3–5 vocabulary words related to the question. These should connect to `vocab.js` entries or `read_social.key_vocabulary[]`.
5. No `hint_en` / `hint_vi` — Social Quiz provides no hints.
6. Social Quiz uses `correct:` (not `answer:`) — same as logic_science.js, different from singapore_math.js.

### 3.7 Relationship with Social Studies Story

Social Quiz questions should be **derived from** the `read_social` content. The relationship is:

| Rule | Detail |
|---|---|
| **Must connect** | At least 3 of the Social Quiz questions must reference facts, people, or places from `read_social.content_en` |
| **Can extend** | Questions can go beyond the story (e.g. broader Silk Road history) but must use vocabulary from the Social Studies Story |
| **Can generalize** | Some questions can test general geography knowledge if it relates to the story's geographic context |
| **Cannot contradict** | No question may contradict facts stated in `read_social` |

**Examples from W36:**
- `read_social` mentions "Marco Polo... left Venice when he was only 17... took almost 24 years"
- Social Quiz question: "How long did Marco Polo journey from Italy to China take?" → directly from story
- Social Quiz question: "Why is the Silk Road considered one of the most important routes?" → extends beyond story, uses story vocabulary

### 3.8 Weekly Adaptation Rules

1. **Geography/History balance:** Aim for ~50% Geography, ~30% History, ~20% Culture/Economics
2. **Type variety:** Use at least 2 different `type` values across the questions
3. **Story connection:** At least 3 questions must be directly answerable from `read_social`
4. **Vocab bridge:** Each question's `vocab[]` should include words from `read_social.key_vocabulary[]` or `vocab.js`
5. **Vietnamese translation:** Every `question_vn` should be natural Vietnamese, not a word-for-word translation
6. **Easy vs ADV:** Easy questions ask for direct recall ("What did Marco Polo travel on?"). ADV questions ask for reasoning ("Why is the Silk Road important?")

### 3.9 Difficulty Progression

| Week range | ADV characteristics | Easy characteristics |
|---|---|---|
| W36+ ADV | Reasoning questions ("Why?", "How?"), complex options, longer explanations | N/A |
| W36+ Easy | Recall questions ("What?", "When?"), simpler options, shorter explanations | 3–4 questions only |

**Within a single week:**
- Start with simpler recall questions (geography_mcq)
- Progress to reasoning questions (geography_reasoning, history_reasoning)
- End with the most complex or open-ended question

### 3.10 Cross-Station Dependencies

| Depends on | How |
|---|---|
| Read & Explore (`read_social`) | **Primary dependency.** At least 3 questions must reference `read_social` facts. |
| Vocab | `vocab[]` words should appear in `vocab.js` or `read_social.key_vocabulary[]` |
| Logic & Science | No direct dependency, but topic overlap is expected (same weekly theme) |

### 3.11 Validation Rules

1. Questions must be MCQ with exactly **4 options**
2. `correct` must exactly match one of the `options[]`
3. `question_vn` present on every question
4. `explanation` present on every question (NOT `explanation_en`)
5. `vocab` array present with 3–5 entries
6. `type` must be one of the valid types (§3.5)
7. At least 3 questions must be directly connected to `read_social`
8. ASCII apostrophes only — no curly quotes
9. ADV: 5–7 questions. Easy: 3–4 questions.

### 3.12 Definition of Done

- [ ] All questions use valid `type` values
- [ ] `correct` exactly matches one of the 4 `options[]`
- [ ] `question_vn` present on every question
- [ ] `explanation` present on every question
- [ ] `vocab[]` present with 3–5 words on every question
- [ ] At least 3 questions reference `read_social` facts
- [ ] No contradiction with `read_social` content
- [ ] Geography/History balance approximately 50/30/20
- [ ] Easy mode uses simpler vocabulary and direct-recall questions
- [ ] `npm run build` passes

### 3.13 Product Owner Checklist

- [ ] Questions are factually accurate (Silk Road dates, Marco Polo facts, etc.)
- [ ] Vietnamese translations are natural and correct
- [ ] Questions connect meaningfully to the Social Studies Story
- [ ] Vocabulary words are relevant and appear in the story or vocab station
- [ ] Easy mode is genuinely easier than ADV
- [ ] Explanations are educational and clear
- [ ] No culturally insensitive content
- [ ] Geographic and historical facts are verified

### 3.14 Media Requirements

| Media | Generated? | Notes |
|---|---|---|
| Images | None required | Text-only MCQ |
| Map visuals | Optional | Blueprint mentions `map_visual` field — not used in W36 golden standard |
| Audio | Optional | Via `voiceConfig.logic_lab` |

---

## 4. index.js Integration

### 4.1 Import Pattern

**ADV mode** (`src/data/weeks/week_NN/index.js`):

```js
import logic_lab from './logic_science.js';  // aliased to 'logic_lab'
import social_quiz from './social_quiz.js';
import singapore_math from './singapore_math.js';

// In weekData.stations:
logic_lab: { logic_lab, singapore_math, social_quiz },
```

**Easy mode** (`src/data/weeks_easy/week_NN/index.js`):

```js
import logic_science from './logic_science.js';  // NOT aliased
import social_quiz from './social_quiz.js';
import singapore_math from './singapore_math.js';

// In weekData.stations:
logic_lab: { logic_science, singapore_math, social_quiz },
```

**Key difference:** ADV imports `logic_science.js` as `logic_lab` alias. Easy imports directly as `logic_science`. The `stations.logic_lab` key is the same in both modes.

### 4.2 Voice Config

```js
voiceConfig: {
  logic_lab: 'en-US-Neural2-B'  // shared voice for all 3 Logic Lab tabs
}
```

---

## 5. Production Workflow

### 5.1 Content Creation Order

Per the week-builder workflow (BƯỚC 3):

1. **Create `singapore_math.js` first** — it has the most rigid schema (exactly 5 problems, valid types, bar model paths)
2. **Generate bar model images** — `python3 tools/generate_logiclab_barmodels.py NN --skip-existing`
3. **Create `logic_science.js`** — 5–8 questions alternating logic/science types
4. **Create `social_quiz.js`** — 3–7 questions weighted by week profile
5. **Update `index.js`** — add imports for all 3 files

### 5.2 Validation Pipeline

```bash
# Type validation (MANDATORY)
node production_kit/tools/validate_sgmath_types.mjs N

# Bar model validation (MANDATORY)
node tools/validate_barmodels.js N

# Full quality gate includes Logic Lab checks
bash production_kit/tools/code_quality_gate.sh N
```

### 5.3 Common Errors

| Error | Cause | Prevention |
|---|---|---|
| `type: "addition"` | Wrong type name | Use `part_whole` for addition problems |
| `answer: ["35"]` in social_quiz | Wrong field name | Use `correct: "35"` (string, not array) |
| `explanation_en` in social_quiz | Wrong field name | Use `explanation` (no `_en` suffix) |
| `hint_en` missing in singapore_math | Omitted hint | Always include `hint_en` and `hint_vi` |
| Wrong bar model path | Wrong naming pattern | Follow `barmodel_w{NN}_{mode}_p{N}_v{V}.jpg` |
| Empty bar model image | Generator not run | Run `generate_logiclab_barmodels.py` after writing singapore_math.js |
| All 5 problems same type | No type diversity | Use at least 3 different types per week |

---

## 6. Glossary

| Term | Definition |
|---|---|
| **CPA** | Concrete–Pictorial–Abstract — Singapore Math pedagogical approach |
| **Bar model** | Visual diagram representing math problem structure |
| **MCQ** | Multiple-choice question with 4 options |
| **part_whole** | Bar model type where a total is split into parts |
| **comparison** | Bar model type comparing two quantities |
| **missing_part** | Bar model type where total is known, one part unknown |
| **groups** | Bar model type showing equal groups (multiplication) |
| **before_after** | Bar model type showing change over time |
| **Geography MCQ** | Geography question with factual answer |
| **Geography Reasoning** | Geography question requiring explanation |
| **History MCQ** | History question with factual answer |
| **History Reasoning** | History question requiring explanation |

---

*This specification is based on the W36 golden standard and Blueprint §3.3/§6.4/§7.3. For implementation details, see `src/data/weeks/week_36/` files.*
