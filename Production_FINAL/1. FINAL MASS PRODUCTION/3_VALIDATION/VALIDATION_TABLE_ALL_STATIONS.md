# BẢNG KIỂM TRA TOÀN DIỆN - ALL STATIONS + AI TUTOR
## (Validation Checklist for EngQuest Week Production)

**Mục đích**: Làm bảng chuẩn cho tất cả các tuần, **luôn phải validate trước và sau khi tạo**.

**Golden Standard Reference**: 
- Advanced Mode: Week 6 (primary) / Week 5 (secondary)
- Easy Mode: Week 5 (primary) / Week 6 (secondary)
- AI Tutor: Week 7 (`week_07_real.js`)

---

## 1. READ & EXPLORE TAB (read.js)

### 📌 SENTENCE COUNT
| Mode | Count Range (Blueprint) | Actual (Golden Week 5) | Rule |
|------|------------------------|----------------------|------|
| **Advanced** | 8-12 sentences | 14 sentences | Follow grammar +1 level ahead |
| **Easy** | 6-8 sentences | 12 sentences | Follow Syllabus base grammar |

**⚠️ CRITICAL**: Sentence count is a GUIDELINE for initial creation, NOT a fixed rule. Golden Standard exceeds these ranges.

### 📌 10 BOLD WORDS (MANDATORY)
- Count: **Fixed 10 words/week** (both modes)
- Placement: Embedded in content_en field
- Format: `**word**` (markdown bold)
- UI Requirement: Click bold word → popup (image + meaning + audio)

### 📌 VOCABULARY LEVEL

| Mode | Tier Level | Composition | Context |
|------|-----------|-------------|---------|
| **Advanced** | Tier 2 & 3 | 100% academic vocabulary (CLIL)<br>Specialized terminology | Global & Abstract<br>(world, history, science, society) |
| **Easy** | Tier 1 & Basic Tier 2 | 50% core vocab from Syllabus<br>50% daily life words | Personal & Immediate<br>(self, family, classroom) |

### 📌 GRAMMAR COMPLEXITY

| Mode | Grammar Structures | Examples |
|------|-------------------|----------|
| **Advanced** | • Complex sentences (Because, Although, If)<br>• Relative clauses (who, which, that)<br>• Passive voice<br>• Grammar +1 level ahead of Syllabus | "The house, which stands on the hill, has many rooms."<br>"It was built by a famous architect." |
| **Easy** | • Simple sentences<br>• Compound sentences (and, but, so)<br>• Present simple<br>• Syllabus base grammar level | "My name is Tim. I live in a house. My house has many rooms." |

### 📌 AUDIO FILES
- **Count**: 1 audio file per week (fixed)
- **Path Pattern**: 
  - Advanced: `/audio/week{N}/read_explore_main.mp3`
  - Easy: `/audio/week{N}_easy/read_explore_main.mp3`
- **Quality Requirement**: Emotion-rich narration (storytelling style, NOT robotic TTS)

### 📌 COMPREHENSION QUESTIONS
- **Count**: 3 questions per week (fixed)
- **Structure**: Multiple choice (4 options per question)
- **Fields**: `question`, `options` array, `correct_answer`, `hint`

### 📌 WRITING PROMPT
- **Count**: 1 open-ended question per week
- **Min Words**:
  - Advanced: 30 words
  - Easy: 20 words
- **Field Name**: `question` (at root level of read.js)

### 📌 SCAFFOLDING BY PHASE

| Element | Phase 1 (Weeks 1-54) | Phase 2 (Weeks 55-120) | Phase 3 (Weeks 121-156) |
|---------|---------------------|----------------------|------------------------|
| **Visuals** | Cartoon images | Real photos, diagrams | Text-heavy, limited images |
| **Translation** | Bilingual word-by-word/sentence | Sentence level | Keywords only |
| **Topic Context** | Concrete & visual (animals, food, toys) | Mixed abstract (seasons, emotions) | Abstract concepts (democracy, empathy) |

### 📌 BLUEPRINT RULES (Read & Explore)
1. **10 Bold Words**: Absolutely mandatory in content_en
2. **Image**: Cover image for the reading passage (`image_url` field)
3. **Audio**: Full narration audio with emotion and storytelling style
4. **Context Difference**:
   - Easy: First-person narrative, personal experience ("My name is...", "I live...")
   - Advanced: Third-person narrative, global context ("There is a house on the hill...")
5. **Content Structure**: Single paragraph in `content_en` field (NOT array of sentences)

---

## 2. NEW WORDS (vocab.js)

### 📌 WORD COUNT
- **Fixed Count**: 10 words/week (both Advanced and Easy modes)
- **NO VARIATION** across phases or modes

### 📌 VOCABULARY LEVEL

| Mode | Tier Level | Selection Criteria |
|------|-----------|-------------------|
| **Advanced** | Tier 2 & 3 | Academic/CLIL vocabulary<br>Specialized terminology<br>Abstract concepts |
| **Easy** | Tier 1 & Basic Tier 2 | Daily life words<br>Concrete nouns/verbs<br>50% from Syllabus core vocab |

### 📌 AUDIO FILES
- **Count Formula**: 10 words × 4 audios per word = **40 audio files/week**
- **4 Audio Types per Word**:
  1. `audio_word`: Pronunciation of the word only
  2. `audio_definition`: Definition read aloud
  3. `audio_example`: Example sentence read aloud
  4. `audio_collocation`: Collocation/phrase read aloud

### 📌 IMAGE REQUIREMENT
- **Count**: 10 images (1 per word)
- **Quality**: 
  - Phase 1: Cartoon-style images (specific, visual)
  - Phase 2: Real photos or diagrams
  - Phase 3: Text-heavy infographics or abstract representations

### 📌 MORPHING BY PHASE

| Phase | Word Types | Definition Style | Image Style |
|-------|-----------|-----------------|-------------|
| **Phase 1<br>(Weeks 1-54)** | Concrete nouns/verbs<br>(ball, run, house) | Simple definitions<br>("A ball is round.") | Cartoon images<br>Specific objects |
| **Phase 2<br>(Weeks 55-120)** | Abstract nouns<br>(friendship, courage) | Simple explanations<br>("Courage means being brave.") | Real photos<br>Symbolic images |
| **Phase 3<br>(Weeks 121-156)** | Academic terminology<br>(photosynthesis, democracy) | Scholarly definitions<br>(textbook-style) | Diagrams<br>Scientific illustrations |

### 📌 FIELD STRUCTURE (Week 6 Standard)
```javascript
{
  id: 1,
  word: "upstairs",
  pronunciation: "/ˌʌpˈsterz/",
  type: "adverb",
  meaning: "ở tầng trên",
  definition: "on or to the upper floor of a building",
  image_url: "/images/week6/vocab_upstairs.jpg",
  audio_word: "/audio/week6/vocab_1_word.mp3",
  audio_definition: "/audio/week6/vocab_1_def.mp3",
  audio_example: "/audio/week6/vocab_1_example.mp3",
  audio_collocation: "/audio/week6/vocab_1_collocation.mp3",
  example: "My bedroom is upstairs.",
  collocation: "go upstairs"
}
```

### 📌 BLUEPRINT RULES (New Words)
1. **Human Voice Audio**: All 4 audios must use human voice (NOT robotic TTS)
2. **Visual Image**: Every word must have a specific, relevant image
3. **Example Sentence**: Must use the word in natural context
4. **Collocation**: Must provide a common collocation or phrase using the word

---

## 3. WORD POWER (word_power.js)

### 📌 WORD COUNT PROGRESSION

| Phase | Count per Week | Content Type |
|-------|---------------|-------------|
| **Phase 1<br>(Weeks 1-54)** | 3 words/week | Collocations<br>("ride a bike", "brush teeth") |
| **Phase 2<br>(Weeks 55-120)** | 5 words/week | Synonyms/Antonyms<br>("Big = Huge", "Happy ≠ Sad") |
| **Phase 3<br>(Weeks 121-156)** | 7 words/week | Idioms/Phrasal Verbs<br>("figure out", "give up") |

**Week 12 (Phase 1)**: Must have exactly **3 words**

### ⚠️ W16+ EXCEPTION: EXACTLY 6 COLLOCATIONS

From Week 16 onward, the STEM/Social sub-tab architecture expands vocabulary to 13+ words. Word Power selects **exactly 6** collocations from the vocab list (not the full set, not 3/5/7).

| Condition | Count | Rule |
|-----------|-------|------|
| W1-15 (Phase 1) | 3 | Standard Phase 1 count |
| **W16+ (Phase 1)** | **6** | **Override — STEM expansion** |
| W55+ (Phase 2) | 5 | Standard Phase 2 count |
| W121+ (Phase 3) | 7 | Standard Phase 3 count |

### 🔴 CRITICAL (W16+): word field MUST BE MULTI-WORD COLLOCATION

Each `word` field in word_power.js entries MUST contain a space (i.e., a phrase, not a single word).

**❌ FORBIDDEN (single word)**:
```js
{ word: "kindergarten", ... }   // ← FAIL: single word
{ word: "grow", ... }           // ← FAIL: single word
```

**✅ CORRECT (collocation phrase)**:
```js
{ word: "go to kindergarten", ... }   // ← PASS
{ word: "grow up", ... }              // ← PASS
```

**Validation bash check (W16+):**
```bash
# Count must equal 6
grep -c 'word:' src/data/weeks/week_N/word_power.js
# Must output: 6

# Single-word violation check — output MUST be EMPTY
grep -E '^\s+word: "[^ "]+",' src/data/weeks/week_N/word_power.js | grep -v 'audio_'
# Empty = PASS | Any output = FAIL → replace with collocation phrase
```

> **Root cause (W19)**: Agent populated `word` fields with vocabulary words from vocab.js (e.g. "kindergarten") instead of collocations (e.g. "go to kindergarten"). CHECK 20 in `tools/code_quality_gate.sh` now catches this automatically.

### 📌 AUDIO FILES
- **Count Formula**: 
  - Phase 1: 3 words × 5 audios = **15 files**
  - Phase 2: 5 words × 5 audios = **25 files**
  - Phase 3: 7 words × 5 audios = **35 files**
- **5 Audio Types per Word**:
  1. `audio_word`: Word pronunciation
  2. `audio_definition`: Definition
  3. `audio_example`: Example sentence
  4. `audio_collocation`: Collocation phrase
  5. `audio_synonym` (or `audio_antonym` in some phases)

### 📌 SENTENCE REQUIREMENT
**❌ FORBIDDEN**: Bare phrases without context
- Wrong: "ride a bike"
- **✅ CORRECT**: "I ride a bike to school every day."

**All examples MUST be full sentences** (minimum 5 words)

### 📌 DUAL-MODE DIFFERENCE
| Mode | Word Power Focus |
|------|-----------------|
| **Advanced** | Academic collocations<br>("conduct research", "analyze data") |
| **Easy** | Daily life collocations<br>("brush teeth", "make breakfast") |

### 📌 BLUEPRINT RULES (Word Power)
1. **Full Sentence Examples**: Never use bare phrases
2. **Morphing by Phase**: 
   - Phase 1: Simple collocations (verb + noun)
   - Phase 2: Synonyms/antonyms with word webs
   - Phase 3: Idioms with cultural context
3. **Context Alignment**: Easy Mode uses personal context, Advanced uses academic/global context

---

## 4. GRAMMAR (grammar.js)

### 📌 EXERCISE COUNT
- **Fixed Count**: 20 exercises/week (both Advanced and Easy modes)
- **NO VARIATION** across phases

### 📌 SENTENCE LENGTH REQUIREMENT
**Blueprint Rule**: "Sentences cannot be too short, must have context similar to reading passage"

**❌ FORBIDDEN**: 
- "I am happy." (too short, no context)
- "This is a ball." (too simple)

**✅ CORRECT**:
- "I am happy because today is my birthday." (context)
- "This is a ball that I use to play soccer with my friends." (context + relative clause)

### 📌 GRAMMAR COMPLEXITY

| Mode | Grammar Level | Exercise Types |
|------|--------------|---------------|
| **Advanced** | Grammar +1 level ahead of Syllabus<br>Complex sentences, relative clauses, passive voice | • Fill in the blank (complex)<br>• Sentence reordering<br>• Error correction |
| **Easy** | Syllabus base grammar level<br>Simple/compound sentences | • Multiple choice (simple)<br>• Word ordering<br>• Fill in the blank (basic) |

### 📌 UI MODE
- **Strict Mode**: Multiple choice or word ordering (enforced correct answer before proceeding)
- **No Free Input**: Grammar exercises do NOT allow free text input (prevents off-topic answers)

### 📌 AUDIO FILES
- **Count**: 20 exercises × 1 audio per question = **20 audio files/week**
- **Content**: Audio reads the question or sentence aloud

### 📌 BLUEPRINT RULES (Grammar)
1. **Context-Rich Sentences**: Must have meaningful context (not isolated grammar drills)
2. **Fixed Count**: Always 20 exercises, regardless of phase or mode
3. **Alignment with Reading**: Grammar exercises should practice structures from the week's reading passage
4. **Strict UI**: Multiple choice or ordering only (no free input)

---

## 5. LOGIC LAB (logic.js)

### 📌 QUESTION COUNT PROGRESSION

| Phase | Count per Week | Content Focus |
|-------|---------------|--------------|
| **Phase 1<br>(Weeks 1-54)** | 5 questions/week | Vocab & Patterns<br>(circle = hình tròn, color patterns) |
| **Phase 2<br>(Weeks 55-120)** | 7 questions/week | Word Problems<br>("If Johnny has 5 apples...") |
| **Phase 3<br>(Weeks 121-156)** | 10 questions/week | Data Analysis & Critical Logic<br>(charts, logical fallacies) |

**Week 12 (Phase 1)**: Must have exactly **5 questions**

### 📌 AUDIO FILES
- **Count Formula**:
  - Phase 1: 5 questions × 1 audio = **5 files**
  - Phase 2: 7 questions × 1 audio = **7 files**
  - Phase 3: 10 questions × 1 audio = **10 files**

### 📌 CONTEXT REQUIREMENT
**Blueprint Rule**: "ALWAYS have context (story context), follow native textbook style"

**❌ FORBIDDEN** (especially in Easy Mode Phase 1):
- Complex math tricks or brain teasers
- Long-winded word problems in Easy Mode
- Questions without story context

**✅ CORRECT**:
- Easy Mode Phase 1: "Tim has 3 apples. He eats 1 apple. How many apples does Tim have now?"
  - Short, simple, vocab-focused
- Advanced Mode Phase 1: "Sarah collected 12 seashells at the beach. She gave 5 to her brother. How many seashells does Sarah have left?"
  - Slightly longer, more complex vocabulary

### 📌 DUAL-MODE DIFFERENCE

| Mode | Content Type | Vocabulary Level |
|------|-------------|-----------------|
| **Advanced** | Math word problems<br>Science concepts<br>Social studies scenarios | Academic vocabulary<br>Complex sentence structures |
| **Easy** | Simple counting/patterns<br>Vocab familiarization<br>Basic logic | Daily life vocabulary<br>Simple sentences<br>**Goal: vocab practice, NOT math challenge** |

### 📌 SCAFFOLDING BY PHASE

| Phase | Question Type | Example |
|-------|--------------|---------|
| **Phase 1** | Vocab & Patterns<br>Simple counting | "What shape has 4 equal sides?"<br>"Tim has 2 cats and 3 dogs. How many pets does Tim have?" |
| **Phase 2** | Word Problems | "If a train travels 60 km in 1 hour, how far will it travel in 3 hours?" |
| **Phase 3** | Data Analysis<br>Critical Thinking | "Look at the chart. Which month had the highest rainfall?"<br>"Identify the logical fallacy in this argument." |

### 📌 BLUEPRINT RULES (Logic Lab)

**🔥 CRITICAL UPDATE (Mar 12, 2026): INDEPENDENT FROM WEEK THEME**
- **Content Focus**: International math/logic curriculum in English
- **Theme Connection**: NONE required (unlike other stations)
- **Grammar Connection**: MUST use week's grammar pattern (ONLY connection)
- **Goal**: Help students understand English in mathematics

**Content Mix by Phase:**
- **Phase 1 (Weeks 1-24)**: 5 questions = 4 math + 1 science
- **Phase 2 (Weeks 25-36)**: 7 questions = 5 math + 2 science  
- **Phase 3 (Weeks 37+)**: 10 questions = 6 math + 2 science + 2 social studies

**Example (Week 5 "My House" - Grammar: "There is/are"):**
- ✅ "There are 5 red circles and 3 blue circles. How many are there?" (Math, NOT about houses - OK!)
- ✅ "There is water in the cup. I freeze it. What is there now?" (Science, NOT about houses - OK!)
- ❌ "My house has 3 rooms. Your house has 5 rooms. Which is bigger?" (Wrong grammar - should use "There is/are")

**Original Blueprint Rules:**
1. **Context Mandatory**: Every question must have a story/scenario context
2. **Easy Mode Phase 1 CẤM**: NO complex tricks, NO long word problems (focus on vocab familiarization)
3. **Native Textbook Style**: Follow structure of native English math/logic textbooks for kids
4. **Progressive Difficulty**: Phase 1 → 2 → 3 increases complexity gradually
5. **Math + Logic + Science + Social**: Mix content types for cognitive development

---

## 6. ASK AI (ask_ai.js)

### 📌 PROMPT COUNT
- **Minimum Count**: 5 prompts/week (both modes)
- Recommended: 5-7 prompts for variety

### 📌 AUDIO FILES
- **Count**: 5 prompts × 1 audio = **5 audio files/week** (minimum)
- **Content**: Audio reads the context aloud (NOT the hidden question)

### 📌 CONTEXT REQUIREMENT
**Blueprint Rule**: "ALWAYS have context (not bare questions), user must infer question from context but NEVER reveal the question"

**❌ FORBIDDEN**:
- "Why do volcanoes erupt?" (bare question)
- "Do you understand the reading?" (meta question)

**✅ CORRECT**:
- Context: "Volcanoes are mountains that shoot out hot lava and ash. They are formed when molten rock comes up from deep inside the Earth."
- Hidden Question: User must ask "Why do volcanoes erupt?" or similar inquiry

### 📌 SCAFFOLDING BY PHASE

| Phase | Scaffolding Type | User Task | AI Support |
|-------|-----------------|-----------|-----------|
| **Phase 1<br>(Weeks 1-54)** | **Shadow Asking**<br>Mimic questions | Listen to model question<br>Repeat with correct pronunciation | Focus on pronunciation<br>Provide model sentence |
| **Phase 2<br>(Weeks 55-120)** | **Guided Asking**<br>Assemble from keywords | Given keywords: "Why / volcanoes / erupt?"<br>Form complete question | Provide keyword hints<br>Accept varied phrasing |
| **Phase 3<br>(Weeks 121-156)** | **Free Inquiry**<br>Debate & challenge | Read context<br>Ask any related question<br>Challenge AI's answer | Engage in debate<br>Encourage critical thinking |

### 📌 INPUT MODE
- **Voice-First**: Microphone is default input method
- **Text Fallback**: Keyboard input available if needed

### 📌 FIELD STRUCTURE (Week 6 Standard)
```javascript
{
  id: 1,
  context: "The bedrooms are usually upstairs in a house...",
  hidden_question: "Where are the bedrooms in a house?",
  audio_url: "/audio/week6/ask_ai_1.mp3"
}
```

### 📌 BLUEPRINT RULES (Ask AI)
1. **Context Over Questions**: Provide rich context, never bare questions
2. **Hidden Question**: Question is for teacher reference only, never shown to student
3. **Voice-First Input**: Encourage speaking over typing
4. **Scaffolding Progression**: Shadow → Guided → Free (across 3 phases)
5. **Inference Skill**: Student must infer what to ask from context

---

## 7. DICTATION (dictation.js)

### 📌 SENTENCE COUNT
⚠️ **CRITICAL EXTRACTION RULE**:

```
DICTATION SENTENCE COUNT = READ.JS SENTENCE COUNT (100% EXTRACTION)
```

| Mode | Source | Extraction Method | Count Rule |
|------|--------|------------------|-----------|
| **Advanced** | Advanced read.js | Split by sentence markers (. ! ?) | Extract ALL sentences<br>**NO reduction** |
| **Easy** | Easy read.js | Split by sentence markers (. ! ?) | Extract ALL sentences<br>**NO reduction** |

**Golden Standard Proof**:
- Week 5 Advanced: read.js = 14 sentences → dictation.js = 14 sentences ✅
- Week 5 Easy: read.js = 12 sentences → dictation.js = 12 sentences ✅

**❌ HALLUCINATED RULE (DOES NOT EXIST)**:
- "Easy mode should have 8-10 sentences" ← **FALSE**
- "Reduce dictation to fixed 10 sentences" ← **FALSE**

**✅ CORRECT RULE**:
- If Easy read.js has 6 sentences → dictation must have 6 sentences
- If Easy read.js has 12 sentences → dictation must have 12 sentences
- If Advanced read.js has 14 sentences → dictation must have 14 sentences

### 📌 SENTENCE MINIMUM LENGTH
- **Minimum**: 5 words per sentence
- **Exception**: Shorter sentences allowed if they appear in read.js exactly as written

### 📌 AUDIO FILES
- **Count Formula**: 
  - Dynamic: read.js sentence count × 1 audio per sentence
  - Example: If read.js has 14 sentences → **14 audio files**

### 📌 PHASE CHANGES

| Phase | Dictation Type | UI Interaction |
|-------|---------------|---------------|
| **Phase 1-2<br>(Weeks 1-120)** | Classic Dictation | • Arrange words (drag & drop)<br>• Type exactly what you hear |
| **Phase 3<br>(Weeks 121-156)** | Note-Taking | • Listen to 30s-1min passage<br>• Extract keywords<br>• Form summary (not exact transcription) |

**Week 12 (Phase 1)**: Use **Classic Dictation** (arrange words or type exactly)

### 📌 FIELD STRUCTURE (Week 6 Standard)
```javascript
{
  id: 1,
  text: "There is a big house on the hill.",
  meaning: "Có một ngôi nhà lớn trên đồi.",
  audio_url: "/audio/week6/dictation_1.mp3"
}
```

### 📌 DUAL-MODE DIFFERENCE
| Mode | Source Complexity | Sentence Structures |
|------|------------------|-------------------|
| **Advanced** | Advanced read.js<br>Complex sentences, academic vocab | Relative clauses, passive voice<br>Longer sentences (10-15 words) |
| **Easy** | Easy read.js<br>Simple sentences, daily vocab | Simple/compound sentences<br>Shorter sentences (5-10 words) |

### 📌 BLUEPRINT RULES (Dictation)
1. **Source**: "Sử dụng chính bài đọc của tuần trong Tab Read & Explore"
2. **Extraction Method**: Split content_en by sentence markers (. ! ?)
3. **100% Extraction**: Extract ALL sentences, no reduction, no skipping
4. **Exact Text**: Use exact wording from read.js (no paraphrasing)
5. **Min 5 Words**: Each sentence must have at least 5 words (unless read.js has shorter)
6. **Phase Morphing**: Classic dictation (Phase 1-2) → Note-taking (Phase 3)

---

## 8. SHADOWING (shadowing.js)

### 📌 SENTENCE COUNT
⚠️ **CRITICAL EXTRACTION RULE** (SAME AS DICTATION):

```
SHADOWING SENTENCE COUNT = READ.JS SENTENCE COUNT (100% EXTRACTION)
```

| Mode | Source | Extraction Method | Count Rule |
|------|--------|------------------|-----------|
| **Advanced** | Advanced read.js | Split by sentence markers (. ! ?) | Extract ALL sentences<br>**NO reduction** |
| **Easy** | Easy read.js | Split by sentence markers (. ! ?) | Extract ALL sentences<br>**NO reduction** |

**Golden Standard Proof**:
- Week 6 Advanced: read.js sentences → shadowing.js script array (1:1 match)
- Week 6 Easy: read.js sentences → shadowing.js script array (1:1 match)

### 📌 AUDIO FILES
- **Count Formula**: 
  - Dynamic: read.js sentence count × 1 audio per sentence + 1 full audio
  - Example: If read.js has 14 sentences → **14 sentence audios + 1 full = 15 audio files**
- **File Types**:
  1. **Individual Sentence Audios**: Each sentence in script array has its own audio
  2. **Full Passage Audio**: `audio_full` field contains complete reading (all sentences together)

### 📌 3-STEP UI FLOW
1. **Listen**: Play audio with karaoke-style text highlighting
2. **Record**: Student repeats the sentence while recording
3. **Feedback**: AI scores pronunciation and provides feedback

### 📌 DUAL-MODE DIFFERENTIATION

| Mode | Speed Button | AI Feedback Focus |
|------|-------------|------------------|
| **Easy** | **"Slow Mode" Button**<br>(0.8x speed) | **Word Pronunciation**<br>Focus on individual word clarity<br>"Great! You said 'bedroom' clearly!" |
| **Advanced** | **Standard Speed**<br>(1.0x speed) | **Intonation + Linking**<br>Focus on sentence melody and connected speech<br>"Nice intonation! Try linking 'in_the' more smoothly." |

### 📌 FIELD STRUCTURE (Week 6 Standard)
```javascript
{
  script: [
    { id: 1, text: "There is a big house on the hill.", audio: "/audio/week6/shadowing_1.mp3" },
    { id: 2, text: "It is a mystery house.", audio: "/audio/week6/shadowing_2.mp3" },
    // ... all sentences from read.js
  ],
  audio_full: "/audio/week6/shadowing_full.mp3"
}
```

### 📌 PHASE CHANGES
**NO PHASE CHANGES**: Shadowing structure remains the same across all 3 phases
- Always use 3-step flow (Listen → Record → Feedback)
- Always extract ALL sentences from read.js
- Mode differences (Slow Mode, AI focus) remain constant

### 📌 BLUEPRINT RULES (Shadowing)
1. **Source**: Same as Dictation - use Read & Explore passage
2. **100% Extraction**: Extract ALL sentences from read.js, no reduction
3. **Karaoke Text**: Display text with synchronized audio highlighting
4. **AI Scoring**: Pronunciation score powered by speech recognition API
5. **Dual-Mode UI**: 
   - Easy: "Slow Mode" button visible
   - Advanced: "Slow Mode" button hidden
6. **Audio Quality**: Clear, professional voice (human-like, not robotic)

---

## 9. WRITING CHALLENGE (writing.js)

### 📌 FIELD STRUCTURE
```javascript
{
  prompt: "Write about your favorite room in your house.",
  model_sentence_easy: "My favorite room is my bedroom. It is small but cozy. I like to read books on my bed.",
  model_sentence_advanced: "My favorite room is the living room because it's where my family gathers every evening.",
  word_bank: ["bedroom", "kitchen", "furniture", "comfortable", "spacious", "organize", "decorate"],
  min_words: 40,
  evaluation_criteria: [
    "Use at least 5 words from the word bank",
    "Describe your room clearly",
    "Use correct grammar (articles A/An)"
  ]
}
```

### 📌 MODEL SENTENCE REQUIREMENT

| Phase | Easy Mode | Advanced Mode |
|-------|-----------|---------------|
| **Phase 1<br>(Weeks 1-54)** | **MANDATORY** | **MANDATORY** |
| **Phase 2<br>(Weeks 55-120)** | Optional | Optional |
| **Phase 3<br>(Weeks 121-156)** | Not provided | Not provided |

**Week 12 (Phase 1)**: 
- **Easy Mode**: MUST provide `model_sentence_easy`
- **Advanced Mode**: MUST provide `model_sentence_advanced`

### 📌 WORD BANK REQUIREMENT

| Mode | Word Bank Status | Count |
|------|-----------------|-------|
| **Advanced** | **MANDATORY** | 5-7 vocabulary words |
| **Easy** | Optional (helpful but not required) | 3-5 vocabulary words |

**Requirement**: Students must use words from word_bank in their writing

### 📌 SUBMISSION MODES

| Mode | Phase Priority | Description |
|------|---------------|-------------|
| **Mode 1: Speech-to-Text** | Phase 2 | Speak → AI transcribes → AI checks grammar |
| **Mode 2: Photo Submission/OCR** | Phase 1 | **Priority for Phase 1**<br>Write on paper → Take photo → AI reads handwriting |
| **Mode 3: Drag & Drop Outlining** | Phase 3 | For essays<br>Drag sentence frames to form outline |

**Week 12 (Phase 1)**: Prioritize **Photo Submission/OCR** mode

### 📌 MIN WORD COUNT

| Phase | Min Word Count | Enforcement |
|-------|---------------|-------------|
| **Phase 1<br>(Weeks 1-54)** | 40 words | Strict Mode: Cannot submit if < 40 words |
| **Phase 2<br>(Weeks 55-120)** | 100 words | Strict Mode: Cannot submit if < 100 words |
| **Phase 3<br>(Weeks 121-156)** | 150 words | Strict Mode: Cannot submit if < 150 words |

### 📌 AUTO-CORRECTION FEATURE
- **While Typing**: Underline spelling/grammar errors in real-time
- **Submit**: AI provides detailed feedback on grammar, vocabulary usage, coherence

### 📌 DUAL-MODE DIFFERENCE

| Mode | Prompt Type | Scaffolding |
|------|------------|-------------|
| **Advanced** | Global topics<br>("Write about climate change") | • Word bank (5-7 academic words)<br>• Evaluation criteria<br>• NO model sentence (Phase 2+) |
| **Easy** | Personal topics<br>("Write about your favorite room") | • Model sentence (Phase 1)<br>• Word bank (3-5 daily words)<br>• Sentence frames (Phase 1) |

### 📌 BLUEPRINT RULES (Writing Challenge)
1. **Model Sentence**: Mandatory for Easy + Advanced in Phase 1 (weeks 1-54)
2. **Word Bank**: Mandatory for Advanced Mode (all phases)
3. **Min Words**: Strict enforcement (40 / 100 / 150 by phase)
4. **Submission Priority**: 
   - Phase 1: Photo (handwriting practice)
   - Phase 2: Speech-to-text (oral fluency)
   - Phase 3: Outlining (essay structure)
5. **Auto-Correction**: Real-time underlining of errors while typing
6. **AI Feedback**: Comprehensive feedback on grammar, vocab, coherence upon submission

---

### ✍️ VIDEO CHALLENGE — WRITE TAB (April 2026 Overhaul)

**Component**: `src/modules/video/VideoChallenge.jsx`  
**Golden standard writing.js**: `src/data/weeks/week_30/writing.js`

#### New sentence_frames schema (MANDATORY W1-W42, replaces old word_bank scaffolding in Phase 1)

```javascript
// ALL writing.js files MUST have this field
// Phase 1 (W1-W42): sentence_frames with ___-blanks
// Phase 2 (W43-W112): use idea_blocks instead of sentence_frames (spec TBD)
// Phase 3 (W113+): no frames — free writing only

export default {
  title: "My Weekend Adventure",
  prompt_en: "Write about your last weekend! Where did you go? Who was there? What did you do? How did you feel?",
  prompt_vi: "Viết về cuối tuần vừa rồi! Bạn đã đi đâu? Ai đã ở đó? Bạn đã làm gì? Bạn cảm thấy thế nào?",
  instruction_en: "Use sentence frames below to help you write!",
  instruction_vi: "Dùng các câu gợi ý bên dưới để viết!",
  min_words: 50,
  model_sentence: "Last Saturday, I went to the park with my family. We ate lunch under a big tree. I played football with my dad. It was a wonderful day!",
  keywords: ["went", "played", "had", "felt", "because"],
  topic_talk_prompt: "Tell me about what you did last weekend.",
  sentence_frames: [
    { "template": "Last ___, I ___ed to ___." },
    { "template": "I went with ___ and ___." },
    { "template": "First, we ___ed ___." },
    { "template": "Then, we ___ed ___ and ___." },
    { "template": "The best part was ___." },
    { "template": "I felt ___ because ___." },
    { "template": "Next time, I want to ___." },
    { "template": "It was a ___ day because ___." }
  ]
}
```

#### Progressive Frame Count Schedule (deployed W1-W30, commit `dbefc27`)

| Weeks | Frames | Notes |
|-------|--------|-------|
| W01–05 | 4 | Intro level |
| W06–10 | 5 | Object/place descriptions |
| W11–20 | 6 | Routines, present continuous |
| W21–25 | 7 | Past tense, emotions |
| W26–30 | 8 | Storytelling, sequences |
| W31–35 | 8–9 | Complex narrative, opinion |
| W36–42 | 9–10 | Multi-part descriptions |
| W43+ | — | Phase 2: idea blocks (spec TBD) |

#### Validation Rules

| Rule | Check |
|------|-------|
| `sentence_frames` exists | Must be array |
| Blank syntax | Only `___` (3 underscores) — NO `____` (4), `[blank]`, `(  )` |
| Frame coverage | # frames ≥ # question marks in `prompt_en` |
| `topic_talk_prompt` | Mandatory W8+ |
| W31+ min count | ≥8 frames |

#### UX Flow (VideoChallenge.jsx — April 2026)
1. Student sees prompt + Vietnamese translation
2. Nudge: *"Use the frames below, then add your own sentences too!"*
3. Frames rendered as inline `<input>` fields split on `___`
4. **"Add to script" DISABLED** until ALL blanks filled
5. On click: clean assembled text (no `___`) inserted into textarea
6. Student continues writing beyond the frames
7. Nova checks: max 3 checks/week; limit message: *"Nova's checked your writing 3 times this week — great effort! 🌟"*

#### Nova AI Feedback (aiProxy.js — Fixed April 2026)
- `skipGrammarGuard: true` prevents pre-filter rejecting student writing
- System prompt specifies `{"ai_response": "..."}` JSON format
- Defensive parse: if no `ai_response` field → returns `'Good! Tell me more.'`
- Result: natural English ≤40 words, friendly, encouraging

---

## 10. EXPLORE TAB (explore.js)
**All requirements are THE SAME as Station 1 (Read & Explore)**

### 📌 SENTENCE COUNT
| Mode | Count Range | Rule |
|------|------------|------|
| **Advanced** | 8-12 sentences (guideline) | Follow grammar +1 level ahead |
| **Easy** | 6-8 sentences (guideline) | Follow Syllabus base grammar |

### 📌 10 BOLD WORDS
- **Mandatory**: 10 bold words embedded in content
- **UI**: Click bold word → popup (image + meaning + audio)

### 📌 AUDIO FILES
- **Count**: 1 audio file per week (fixed)
- **Quality**: Emotion-rich storytelling narration

### 📌 DIFFERENCE FROM READ & EXPLORE
- **Topic**: Usually related but distinct from main reading
- **Example**: 
  - Read & Explore: "The Mystery House" (main story)
  - Explore: "Houses Around the World" (extended topic)

### 📌 BLUEPRINT RULES (Explore)
Same as Read & Explore:
1. 10 bold words mandatory
2. Single paragraph in content_en
3. Emotion-rich audio narration
4. Dual-mode context differentiation (personal vs global)
5. Grammar complexity matches mode level

---

## 11. MINDMAP SPEAKING (mindmap.js)

### 📌 STRUCTURE
- **Center Stems**: 6 sentence stems with blanks
- **Branches**: Each stem has 6 possible completions (6 × 6 = 36 branches)

### 📌 AUDIO FILES
- **Count Formula**: 6 stems + 36 branches = **42 audio files/week** (FIXED)
- **File Types**:
  - Stem audio: Reads the incomplete sentence ("The treasure is ___.")
  - Branch audio: Reads the completion phrase ("in the box")

### 📌 FIELD STRUCTURE (Week 6 Standard)
```javascript
{
  centerStems: [
    { text: "The treasure is ___.", audio: "/audio/week6/mindmap_stem_1.mp3" },
    // ... 6 stems total
  ],
  branchLabels: {
    "The treasure is ___.": [
      { text: "in the box", audio: "/audio/week6/mindmap_branch_1.mp3" },
      { text: "on the desk", audio: "/audio/week6/mindmap_branch_2.mp3" },
      // ... 6 branches per stem
    ],
    // ... all 6 stems with their 6 branches each
  }
}
```

### 📌 CONTENT ALIGNMENT
- **Vocabulary**: Use vocab from current week
- **Grammar**: Practice week's grammar structure in mindmap sentences
- **Example** (Week 6 - Prepositions):
  - Stem: "The treasure is ___."
  - Branches: "in the box", "on the desk", "under the chair" (all using prepositions)

### 📌 DUAL-MODE DIFFERENCE
| Mode | Sentence Complexity | Vocabulary Level |
|------|-------------------|-----------------|
| **Advanced** | Complex sentence stems<br>"If I were to find the treasure, I would ___." | Academic vocabulary<br>Abstract concepts |
| **Easy** | Simple sentence stems<br>"The treasure is ___." | Daily life vocabulary<br>Concrete items |

### 📌 BLUEPRINT RULES (Mindmap Speaking)
1. **Fixed Structure**: Always 6 stems, each with 6 branches
2. **Audio Mandatory**: Every stem and branch must have audio
3. **Grammar Practice**: Mindmap structure should practice week's target grammar
4. **Vocabulary Integration**: Use words from current week's vocab.js
5. **Interactive UI**: Tap stem → branches appear → tap branch → hear full sentence

---

## 12. VIDEO CHALLENGE (video.js)

### 📌 STRUCTURE
```javascript
{
  title: "Show Your Room",
  instructions: "Record a video showing your favorite room.",
  script_suggestion: "Use your Writing Challenge script or create a new one.",
  teleprompter_enabled: true,
  min_duration: 30, // seconds
  max_duration: 120, // seconds
  evaluation_criteria: [
    "Speak clearly and loudly",
    "Show your room on camera",
    "Use at least 5 vocabulary words"
  ]
}
```

### 📌 TELEPROMPTER FEATURE
- **Status**: Available for all students
- **Source**: Can copy script from Writing Challenge or write new script
- **Display**: Scrolling text on screen while recording video

### 📌 MIN/MAX DURATION
- **Phase 1**: 30-60 seconds
- **Phase 2**: 60-90 seconds
- **Phase 3**: 90-120 seconds

### 📌 SUBMISSION
- **Format**: Video file (MP4 recommended)
- **AI Evaluation**: 
  - Speech clarity
  - Vocabulary usage
  - Grammar correctness
  - Content relevance

### 📌 DUAL-MODE DIFFERENCE
| Mode | Prompt Type | Evaluation Focus |
|------|------------|-----------------|
| **Advanced** | Presentation/Explanation<br>("Explain how photosynthesis works") | Content depth<br>Academic vocabulary<br>Complex grammar |
| **Easy** | Show & Tell<br>("Show your room and talk about it") | Clarity<br>Basic vocabulary<br>Simple sentences |

### 📌 BLUEPRINT RULES (Video Challenge)
1. **Teleprompter**: Always available (enabled: true)
2. **Script Source**: Can copy from Writing Challenge
3. **Duration Limits**: Enforce min/max by phase
4. **Evaluation Criteria**: Clear, specific, aligned with week's objectives
5. **AI Feedback**: Comprehensive feedback on speaking, vocab, grammar, content

---

## 13. DAILY WATCH (daily_watch.js)

### 📌 VIDEO COUNT
- **Fixed Count**: **5 videos per week** (MANDATORY)
- **Topics**: Each video MUST cover a different topic related to week's theme
- **NO EXCEPTIONS**: Always 5 videos, not 3, not 4, EXACTLY 5

### 📌 VIDEO SOURCE
- **Curated YouTube Videos**: From whitelist channels only
- **Whitelist Categories** (60+ channels total):
  - Grammar (12 channels): English Singsing, Grammar Songs, etc.
  - Math (12 channels): Numberblocks, Math Antics, etc.
  - Science (12 channels): SciShow Kids, Crash Course Kids, etc.
  - Social Studies (12 channels): NatGeo Kids, History for Kids, etc.
  - Story/Reading (12 channels): Storyline Online, Oxford Owl, etc.

### 📌 MORPHING BY PHASE

| Phase | Video Type | Example Channels |
|-------|-----------|-----------------|
| **Phase 1<br>(Weeks 1-54)** | Educational Cartoons<br>Animations | • English Singsing<br>• Numberblocks<br>• Alphablocks<br>• Super Simple Songs |
| **Phase 2<br>(Weeks 55-120)** | Documentaries<br>Real Footage | • SciShow Kids<br>• NatGeo Kids<br>• Crash Course Kids<br>• BrainPOP |
| **Phase 3<br>(Weeks 121-156)** | Debate Snippets<br>News<br>TED Talks | • TED-Ed<br>• CNN10<br>• BBC Learning English<br>• Debate.org clips |

### 📌 STRUCTURE
```javascript
{
  video_url: "https://www.youtube.com/watch?v=VIDEO_ID",
  video_title: "Learning About Houses",
  channel_name: "English Singsing",
  duration: 180, // seconds
  comprehension_questions: [
    {
      question: "What rooms did you see in the video?",
      type: "open_ended"
    },
    {
      question: "How many bedrooms were in the house?",
      type: "multiple_choice",
      options: ["1", "2", "3", "4"],
      correct_answer: "2"
    }
  ]
}
```

### 📌 COMPREHENSION QUESTIONS
- **Count**: 2-3 questions per video
- **Types**: Mix of open-ended and multiple choice
- **Purpose**: Check understanding, reinforce vocabulary

### 📌 DUAL-MODE DIFFERENCE
| Mode | Video Selection | Question Complexity |
|------|---------------|-------------------|
| **Advanced** | Documentaries, debates, complex topics | Deep comprehension<br>"Why does the author claim...?"<br>Critical thinking |
| **Easy** | Educational cartoons, simple explanations | Surface comprehension<br>"What did you see?"<br>Basic recall |

### 📌 BLUEPRINT RULES (Daily Watch)
1. **FIXED COUNT**: ALWAYS 5 videos per week (not 3, not 4, EXACTLY 5)
2. **Different Topics**: Each video must cover a different aspect of the week's theme
3. **Whitelist Only**: Use ONLY approved educational channels (60+ channels)
4. **Phase Morphing**: Cartoons (P1) → Documentaries (P2) → Debates (P3)
5. **Comprehension Questions**: Always include 2-3 questions after video
6. **Duration**: 
   - Phase 1: 2-5 minutes
   - Phase 2: 5-10 minutes
   - Phase 3: 10-15 minutes
7. **Topic Alignment**: Video topic should relate to week's theme
8. **Real URLs**: MUST be actual YouTube video URLs, NOT placeholders or "#"

---

## 14. WORD MATCH (word_match.js)

### 📌 STRUCTURE
```javascript
{
  words: [
    { id: 1, word: "bedroom", image: "/images/week12/vocab_bedroom.jpg" },
    { id: 2, word: "kitchen", image: "/images/week12/vocab_kitchen.jpg" },
    // ... 10 words total
  ]
}
```

### 📌 WORD COUNT
- **Fixed Count**: 10 words/week (matches vocab.js)
- **Source**: Use the same 10 words from vocab.js

### 📌 IMAGE REQUIREMENT
- **Count**: 10 images (1 per word)
- **Source**: Use the same images from vocab.js (same image_url)

### 📌 GAME MECHANICS
- **Match**: Drag word to matching image
- **Feedback**: Correct match → green checkmark, Incorrect → red X and shake animation
- **Score**: Track correct matches and time taken

### 📌 DUAL-MODE DIFFERENCE
| Mode | Word Difficulty | Image Clarity |
|------|----------------|--------------|
| **Advanced** | Academic vocabulary<br>Abstract words | Symbolic images<br>Diagrams |
| **Easy** | Daily life vocabulary<br>Concrete words | Clear, specific images<br>Cartoon style (Phase 1) |

### 📌 BLUEPRINT RULES (Word Match)
1. **Source**: Always use vocab.js words and images (100% alignment)
2. **Fixed Count**: Always 10 words (no variation)
3. **Game UI**: Drag & drop matching mechanic
4. **Feedback**: Immediate visual feedback (green/red, sound effects)
5. **No Audio**: Word Match game does NOT require audio files (visual only)

---

## 15. GAMES (games.js)

### 📌 STRUCTURE
```javascript
{
  game_type: "word_scramble", // or "crossword", "hangman", etc.
  vocabulary: ["bedroom", "kitchen", "bathroom", "living_room", "house"],
  instructions: "Unscramble the letters to form the correct word."
}
```

### 📌 VOCABULARY SOURCE
- **Source**: Use words from current week's vocab.js
- **Count**: 5-10 words (subset of vocab.js)

### 📌 GAME TYPES (Varies by Week)
- **Word Scramble**: Unscramble letters to form words
- **Crossword**: Fill in crossword using week's vocabulary
- **Hangman**: Guess the word letter by letter
- **Memory Match**: Flip cards to match word pairs
- **Spelling Bee**: Type the word correctly after hearing it

### 📌 DUAL-MODE DIFFERENCE
| Mode | Game Difficulty | Vocabulary |
|------|----------------|-----------|
| **Advanced** | Harder puzzles<br>More words<br>Time limits | Academic vocabulary |
| **Easy** | Simpler puzzles<br>Fewer words<br>No time pressure | Daily life vocabulary |

### 📌 BLUEPRINT RULES (Games)
1. **Vocabulary Alignment**: Always use words from current week's vocab.js
2. **Variety**: Rotate game types across weeks (not same game every week)
3. **Fun & Engaging**: Games should be enjoyable, not frustrating
4. **Optional**: Games are optional/bonus activities, not mandatory
5. **No New Audio**: Games reuse existing audio from vocab.js (no new audio files needed)

---

## 16. AI TUTOR (week_XX_real.js)

### 📌 STRUCTURE OVERVIEW
AI Tutor is defined in `week_XX_real.js` files, containing:
- **Metadata**: week_id, phase, block, unit, title
- **Target Vocabulary**: 10 words with definitions, examples, syllables
- **Grammar Focus**: Implicit grammar rules for the week
- **Nova Instructions**: Persona, tone, conversation style, questioning skills
- **V28 Format Contract**: Response format (ack + recast + question)

### 📌 NOVA PERSONA
- **Character**: "Friendly English teacher, warm and human-like"
- **Tone**: "Warm, encouraging, natural - like a patient friend"
- **Style**: Natural flowing conversation, NOT robotic Q&A

### 📌 STORY MISSION (3 Missions per Week)

#### MISSION 1: Vocabulary Introduction
- **Goal**: Introduce 3-4 target words through natural conversation
- **Opening Line**: Personalized, engaging (e.g., "Hi! I'm Ms. Nova! I travel the world looking at cool houses. Today I'm visiting YOUR house! What do I call you?")
- **Duration**: 10-15 turns minimum
- **Content**: 
  - Ask student about personal experience related to topic
  - Naturally introduce vocabulary in context
  - Recast errors without explicit correction

#### MISSION 2: Vocabulary Practice
- **Goal**: Practice 3-4 more target words through interactive scenarios
- **Opening Line**: Scenario-based (e.g., "Hi again! I have my magic flashlight! Let's explore a dark room together. Ready? Shine the light!")
- **Duration**: 10-15 turns minimum
- **Content**:
  - Roleplay or imaginative scenario
  - Practice using vocabulary in sentences
  - Recast errors naturally

#### MISSION 3: Consolidation & Challenge
- **Goal**: Use all 10 target words, challenge student with open-ended questions
- **Opening Line**: Challenge-based (e.g., "Ooh, I have a Mystery Box! I can feel something inside but I can NOT look! Can you guess what it is?")
- **Duration**: 10-15 turns minimum
- **Content**:
  - Open-ended questions requiring extended responses
  - Encourage creative use of vocabulary
  - Recast + expand student's answers

### 📌 RECAST STRATEGY
**Blueprint Rule**: "ALWAYS recast student errors by modeling correct form naturally in your response"

**Example**:
- Student: "Bedroom is big."
- Nova Recast: "Yes! The bedroom IS big! Is there a bed in the bedroom?"

**Recast Rules**:
- Mirror student's subject
- Fix grammar naturally without explanation
- Keep recast under 8 words
- Embed recast in conversational flow

### 📌 V28 RESPONSE FORMAT
**Structure**: `ack + recast + question`

**Components**:
1. **Ack (Acknowledgment)**: "Nice!", "Great!", "Wonderful!", "Perfect!"
2. **Recast**: Mirror + fix grammar (max 8 words)
3. **Question**: ONE clear question to continue conversation

**Example**:
- Student: "I have bedroom."
- Nova: "Nice! I have A bedroom. What color is your bedroom?"
  - Ack: "Nice!"
  - Recast: "I have A bedroom."
  - Question: "What color is your bedroom?"

### 📌 QUESTIONING SKILLS
**Allowed Question Patterns**:
- "What is...?"
- "Where is...?"
- "Is...?" / "Do you...?" / "Can you...?"
- "What color...?" / "How many...?"

**FORBIDDEN Question Patterns**:
- "Why...?" (too complex for Phase 1)
- "What does... mean?" (meta question)
- "Do you understand?" (not conversational)

### 📌 CONVERSATION RULES (MUST AVOID)
**Never Use**:
- ❌ Emojis or special characters (TTS will read them aloud)
- ❌ Vietnamese translation (English-only environment)
- ❌ Explicit grammar rules ("Remember to use 'A' before consonants")
- ❌ Corrections without recast ("That's wrong. Say 'A bedroom'")
- ❌ Multiple questions in one turn ("What color is your room? How many beds are there?")
- ❌ Past tense or future tense in Phase 1 (present simple only)

**Always Do**:
- ✅ Keep responses under 30 words
- ✅ ONE clear question per turn
- ✅ Build on previous answers (active listening)
- ✅ Natural, conversational tone
- ✅ Recast errors naturally
- ✅ Maintain conversation for min 10-15 turns per mission

### 📌 DUAL-MODE DIFFERENCE

| Mode | Vocabulary Level | Grammar Scope | Conversation Depth |
|------|-----------------|--------------|-------------------|
| **Advanced** | Tier 2 & 3 academic vocabulary<br>Abstract concepts | Complex sentences<br>Relative clauses<br>Passive voice | Deep, analytical conversations<br>"Why do you think...?"<br>Critical thinking |
| **Easy** | Tier 1 & Basic Tier 2<br>Daily life vocabulary | Simple/compound sentences<br>Present simple | Surface, personal conversations<br>"What do you have...?"<br>Basic descriptions |

### 📌 GRAMMAR FOCUS (IMPLICIT)
**Phase 1 Week 12 Example**:
- Grammar Pattern: "Can + verb" (ability)
- Examples: "I can clap my hands.", "My friend can wave."
- **NO EXPLICIT TEACHING**: Nova never says "Today we're learning 'can + verb'."
- **IMPLICIT PRACTICE**: Nova asks "What can you do?" → Student responds → Nova recasts if needed

### 📌 AUDIO FILES
**AI Tutor does NOT require audio files** (uses TTS for real-time conversation)

### 📌 BLUEPRINT RULES (AI Tutor)
1. **Persona Consistency**: Always "Ms. Nova", friendly English teacher
2. **V28 Format**: Always use `ack + recast + question` structure
3. **Recast Strategy**: ALWAYS recast errors naturally (never explicit correction)
4. **30-Word Limit**: Keep responses under 30 words for TTS clarity
5. **10-15 Turns**: Maintain conversation for minimum 10-15 turns per mission
6. **Grammar Scope**: ONLY use grammar structures within week's scope (no past/future in Week 12)
7. **Vocabulary Integration**: Must use/introduce all 10 target words across 3 missions
8. **No Emojis**: Text-to-speech environment (emojis will be read aloud)
9. **English-Only**: No Vietnamese translation or code-switching
10. **One Question Per Turn**: Never ask multiple questions in one response

---

## 📊 QUICK REFERENCE TABLE - AUDIO FILE COUNTS

| Station | Count Type | Formula | Week 12 Example |
|---------|-----------|---------|----------------|
| **Read & Explore** | Fixed | 1 audio/week | 1 |
| **Explore** | Fixed | 1 audio/week | 1 |
| **New Words** | Fixed | 10 words × 4 audios | 40 |
| **Word Power** | Phase-based | P1: 3×5=15, P2: 5×5=25, P3: 7×5=35 | 15 (P1) |
| **Grammar** | Fixed | 20 exercises × 1 audio | 20 |
| **Logic Lab** | Phase-based | P1: 5, P2: 7, P3: 10 | 5 (P1) |
| **Ask AI** | Fixed | 5 prompts × 1 audio | 5 |
| **Dictation** | **DYNAMIC** | read.js sentence count × 1 | **Varies** (e.g., 14 if read.js = 14) |
| **Shadowing** | **DYNAMIC** | read.js sentence count × 1 + 1 full | **Varies** (e.g., 15 if read.js = 14) |
| **Mindmap Speaking** | Fixed | 6 stems + 36 branches | 42 |
| **Writing** | Fixed | 0 (no audio) | 0 |
| **Video** | Fixed | 0 (no audio) | 0 |
| **Daily Watch** | Fixed | 0 (use YouTube videos) | 0 |
| **Word Match** | Fixed | 0 (no audio, visual only) | 0 |
| **Games** | Fixed | 0 (reuse vocab audios) | 0 |
| **AI Tutor** | Fixed | 0 (uses real-time TTS) | 0 |

**TOTAL FIXED AUDIOS** (excluding dictation/shadowing): **129 files** for Phase 1 Week 12
- Read: 1, Explore: 1, Vocab: 40, Word Power: 15, Grammar: 20, Logic: 5, Ask AI: 5, Mindmap: 42

**TOTAL DYNAMIC AUDIOS** (dictation + shadowing): **Varies by read.js sentence count**
- Example: If read.js = 14 sentences → Dictation: 14 + Shadowing: 15 = **29 additional files**

**GRAND TOTAL for Week 12** (if read.js = 14 sentences): **129 + 29 = 158 audio files** (Advanced mode)

---

## 🎯 CRITICAL VALIDATION CHECKLIST

### ✅ BEFORE GENERATION (Pre-Flight Check)
**Review these BEFORE creating any week content**:

1. **Read.js Preparation**:
   - [ ] Confirm target sentence count (8-12 Advanced, 6-8 Easy as guideline)
   - [ ] Identify 10 bold words from vocab.js
   - [ ] Write content with appropriate grammar level (Advanced: +1, Easy: Syllabus base)
   - [ ] Use appropriate context (Advanced: global/abstract, Easy: personal/immediate)

2. **Station Count Verification**:
   - [ ] vocab.js: Exactly 10 words
   - [ ] word_power.js: 3 words (Phase 1)
   - [ ] grammar.js: Exactly 20 exercises
   - [ ] logic.js: 5 questions (Phase 1)
   - [ ] ask_ai.js: Minimum 5 prompts

3. **Phase-Specific Requirements**:
   - [ ] Week 12 (Phase 1): Model sentence mandatory for writing.js (both modes)
   - [ ] Week 12 (Phase 1): Logic Lab questions simple, vocab-focused (NO complex tricks in Easy)
   - [ ] Week 12 (Phase 1): Word Power = collocations (not synonyms or idioms)

4. **Mode Differentiation**:
   - [ ] Easy Mode: Personal context, simple grammar, daily vocab
   - [ ] Advanced Mode: Global context, complex grammar, academic vocab
   - [ ] Easy Mode: word_bank optional in writing.js
   - [ ] Advanced Mode: word_bank mandatory in writing.js (5-7 words)

### ✅ AFTER GENERATION (Post-Flight Check)

**Run these validation commands IMMEDIATELY after generation**:

```bash
# 1. Count dictation sentences (MUST EQUAL read.js sentences)
grep -c '"text":' src/data/weeks/week_12/dictation.js
grep -c '"text":' src/data/weeks_easy/week_12/dictation.js

# 2. Count shadowing sentences (MUST EQUAL read.js sentences)
grep -c '"text":' src/data/weeks/week_12/shadowing.js | head -1
grep -c '"text":' src/data/weeks_easy/week_12/shadowing.js | head -1

# 3. Count vocab.js words (MUST BE 10)
grep -c 'word:' src/data/weeks/week_12/vocab.js
grep -c 'word:' src/data/weeks_easy/week_12/vocab.js

# 4. Count word_power.js entries (Phase 1 = 3)
grep -c 'word:' src/data/weeks/week_12/word_power.js
grep -c 'word:' src/data/weeks_easy/week_12/word_power.js

# 5. Count grammar.js exercises (MUST BE 20)
grep -c 'id:' src/data/weeks/week_12/grammar.js
grep -c 'id:' src/data/weeks_easy/week_12/grammar.js

# 6. Count logic.js questions (Phase 1 = 5)
grep -c 'id:' src/data/weeks/week_12/logic.js
grep -c 'id:' src/data/weeks_easy/week_12/logic.js

# 7. Count ask_ai.js prompts (MIN 5)
grep -c 'id:' src/data/weeks/week_12/ask_ai.js
grep -c 'id:' src/data/weeks_easy/week_12/ask_ai.js

# 8. Verify field names (Week 6 standard)
grep -l 'meaning:' src/data/weeks/week_12/dictation.js  # Must exist
grep -l 'audio_url:' src/data/weeks/week_12/dictation.js  # Must exist
grep -l 'script:' src/data/weeks/week_12/shadowing.js  # Must exist
grep -l 'audio_full:' src/data/weeks/week_12/shadowing.js  # Must exist
grep -l 'prompts:' src/data/weeks/week_12/ask_ai.js  # Must exist

# 9. Count bold words in read.js (MUST BE 10)
grep -o '\*\*[^*]*\*\*' src/data/weeks/week_12/read.js | wc -l
grep -o '\*\*[^*]*\*\*' src/data/weeks_easy/week_12/read.js | wc -l

# 10. Verify mindmap structure (6 stems, 36 branches)
grep -c 'audio:.*mindmap_stem' src/data/weeks/week_12/mindmap.js  # Must be 6
grep -c 'audio:.*mindmap_branch' src/data/weeks/week_12/mindmap.js  # Must be 36
```

**Expected Results for Week 12 (Phase 1)**:
- ✅ Dictation sentences = read.js sentences (DYNAMIC, e.g., 14 for Advanced, 12 for Easy)
- ✅ Shadowing sentences = read.js sentences (same as dictation)
- ✅ Vocab words = 10 (both modes)
- ✅ Word Power = 3 (Phase 1)
- ✅ Grammar exercises = 20 (both modes)
- ✅ Logic questions = 5 (Phase 1)
- ✅ Ask AI prompts = 5+ (both modes)
- ✅ Bold words in read.js = 10 (both modes)
- ✅ Mindmap stems = 6, branches = 36

### 🚫 COMMON HALLUCINATIONS TO AVOID

**❌ FALSE RULES (DO NOT EXIST IN BLUEPRINT)**:
1. "Easy mode should have 8-10 sentences in dictation" → **FALSE**: Dictation = ALL read.js sentences
2. "Reduce dictation to fixed 10 sentences" → **FALSE**: Extract ALL sentences, no reduction
3. "Shadowing should have fewer sentences than read.js" → **FALSE**: Extract ALL sentences
4. "Word Power should have 5 words in Phase 1" → **FALSE**: Phase 1 = 3 words, Phase 2 = 5 words
5. "Logic Lab should have 10 questions in Phase 1" → **FALSE**: Phase 1 = 5, Phase 2 = 7, Phase 3 = 10
6. "Model sentence optional in Phase 1" → **FALSE**: Mandatory for both modes in Phase 1

**✅ TRUE RULES (VERIFIED FROM BLUEPRINT + GOLDEN STANDARD)**:
1. **Dictation sentence count = read.js sentence count** (100% extraction)
2. **Shadowing sentence count = read.js sentence count** (100% extraction)
3. **Vocab count = 10** (fixed, no variation)
4. **Word Power count = 3 (P1), 5 (P2), 7 (P3)** (progression by phase)
5. **Grammar count = 20** (fixed, no variation)
6. **Logic count = 5 (P1), 7 (P2), 10 (P3)** (progression by phase)
7. **Model sentence mandatory in Phase 1** (both Easy and Advanced modes)
8. **Easy Mode Logic Lab Phase 1: NO complex tricks** (vocab focus only)

---

## 📋 GOLDEN STANDARD REFERENCE FILES

**Use these files as templates when generating new weeks**:

### Advanced Mode Golden Standard
- **Primary**: `src/data/weeks/week_06/` (all 14 station files)
  - Field structure: Week 6 standard (`meaning`, `audio_url`, `script`, `prompts`)
  - Content quality: High-quality, well-structured
  - Audio paths: Use `/audio/week6/` pattern
- **Secondary**: `src/data/weeks/week_05/` (fallback reference)
  - Content validation: 14 sentences in read.js, 14 in dictation/shadowing
  - AI Tutor reference: `week_07_real.js` for Nova instructions

### Easy Mode Golden Standard
- **Primary**: `src/data/weeks_easy/week_05/` (all 14 station files)
  - Content style: Personal context, first-person narrative
  - Sentence count: 12 sentences in read.js = 12 in dictation/shadowing
  - Paths: Use `/audio/week5_easy/` pattern
- **Secondary**: `src/data/weeks_easy/week_06/` (fallback reference)

### AI Tutor Golden Standard
- **Primary**: `src/data/weeks/week_07_real.js`
  - Nova instructions: Persona, tone, conversation style
  - V28 format: ack + recast + question
  - V5.0 format: nova_instructions, v28_format_notes fields
  - Questioning skills: Allowed/forbidden patterns
  - Recast strategy: Examples and rules

---

## 🔄 WORKFLOW INTEGRATION

**Step 1: Review This Table**
- Before generating any week, review relevant sections for that station
- Note phase-specific requirements (Week 12 = Phase 1)
- Check mode-specific differences (Easy vs Advanced)

**Step 2: Create Content**
- Follow Blueprint rules for each station
- Use Golden Standard files as structural templates
- Apply mode differentiation (personal vs global context, simple vs complex grammar)

**Step 3: Validate Against Checklist**
- Run validation commands from "Post-Flight Check"
- Compare results against expected counts
- Fix any discrepancies immediately

**Step 4: Update This Table**
- If new requirements discovered, add to table
- If discrepancies found between Blueprint and implementation, document in table
- Keep table up-to-date as "single source of truth"

---

## 🎓 APPENDIX: BLUEPRINT PHILOSOPHY

### Dual-Mode Strategy (Song Sinh)
**Core Principle**: Provide **TWO SIMULTANEOUS TRACKS** for every week:
- **Easy Mode**: Syllabus base level (chuẩn kiến thức lớp học)
- **Advanced Mode**: Syllabus + stretch (mở rộng & thử thách)

**Why?**
- Easy Mode: Build confidence, reinforce classroom learning
- Advanced Mode: Challenge high-achievers, introduce academic vocabulary
- Both modes use SAME app structure (14 stations) → Easy to switch between modes

### Scaffolding Strategy (Giàn Giáo)
**Core Principle**: **GRADUAL RELEASE OF SUPPORT** across 3 phases (156 weeks total)

**Phase 1 (Weeks 1-54)**: Maximum Support
- Cartoon images, model sentences, sentence frames
- Shadow Asking (mimic questions)
- Photo submission (handwriting practice)
- Bilingual translation

**Phase 2 (Weeks 55-120)**: Moderate Support
- Real photos, sentence starters
- Guided Asking (assemble from keywords)
- Speech-to-text (oral fluency)
- Sentence-level translation

**Phase 3 (Weeks 121-156)**: Minimum Support
- Text-heavy, criteria hints only
- Free Inquiry (debate)
- Free writing (essay outlining)
- Keywords-only translation

**Why?**
- Phase 1 (A0-A1): Build foundation, confidence (ages 6-8)
- Phase 2 (A2-B1): Develop fluency, independence (ages 9-10)
- Phase 3 (B1-B2): Critical thinking, academic English (ages 11-12)

---

**END OF VALIDATION TABLE**

---

## 🚀 USAGE INSTRUCTIONS

1. **Before Creating Week 12 Easy Mode**: Review stations 1-16 requirements in this table
2. **During Generation**: Follow Golden Standard file structures (Week 5/6)
3. **After Generation**: Run validation commands from "Post-Flight Check"
4. **Fix Errors**: If validation fails, refer back to "TRUE RULES" section + Blueprint quotes
5. **Update Master Prompt**: After user approval, integrate this table into Quick Ref or Master Prompt

**This table becomes permanent quality gate for all future weeks** → No more hallucinations, no more errors!

---

## ⚠️ WEEK 13 VALIDATION ADDITIONS (Mar 10, 2026)

### 📌 index.js VALIDATION (NEW — Applies to ALL weeks)

**File Count per Mode: 15 files** (14 stations + 1 index.js)

```bash
# Verify index.js exists for BOTH modes
ls src/data/weeks/week_N/index.js
ls src/data/weeks_easy/week_N/index.js
# If missing → week WILL NOT LOAD in app!
```

### 📌 voiceConfig VALIDATION (NEW)

```bash
# Extract voice names from index.js
node -e "
import('./src/data/weeks/week_N/index.js').then(m => {
  const vc = m.default.voiceConfig || {};
  const voices = Object.values(vc);
  const unique = new Set(voices);
  console.log('Voices:', voices);
  console.log('Unique count:', unique.size, unique.size >= 5 ? '✅' : '❌ NEED 5 DISTINCT!');
});
"
```

**Required: 5 DISTINCT voices** — no two roles should share the same voice.
```javascript
// CORRECT example:
voiceConfig: {
  narration:  'en-US-Neural2-D',   // Male 1
  vocabulary: 'en-US-Neural2-F',   // Female 1
  dictation:  'en-US-Neural2-C',   // Female 2
  questions:  'en-US-Neural2-J',   // Male 2
  mindmap:    'en-GB-Neural2-B',   // British male
}
```

### 📌 THEME CONTENT VERIFICATION (NEW)

After cloning golden standard and editing content, verify ALL files contain the week's theme:

```bash
# Replace THEME_KEYWORD with actual theme words (e.g., "routine|daily|morning|breakfast")
for f in src/data/weeks/week_N/*.js; do
  count=$(grep -icE "routine|daily|morning" "$f")
  echo "$f: $count matches"
done
# Files with 0 matches → content was NOT updated from clone!
# Exceptions: mindmap.js, games.js may have 0 if theme is in branch labels
```

### 📌 DAILY WATCH videoId VERIFICATION (NEW)

```bash
# Extract ALL videoIds from both modes
grep -oP 'videoId:\s*["'\'']\K[^"'\'']+' src/data/weeks/week_N/daily_watch.js
grep -oP 'videoId:\s*["'\'']\K[^"'\'']+' src/data/weeks_easy/week_N/daily_watch.js

# Each videoId MUST be manually verified:
# https://www.youtube.com/watch?v=<videoId>
# Must be from APPROVED channels:
# English Singsing, Little Fox, Vooks, Steve and Maggie,
# Maple Leaf Learning, Jack Hartmann, Super Simple Songs, Fun Kids English
```

### 📌 AUDIO QUALITY CHECKS (NEW)

| Check | Command | Expected |
|-------|---------|----------|
| Deepgram model name | Test API call with `aura-orion-en` | 200 OK (NOT 400) |
| Audio file count (Adv) | `ls public/audio/weekN/*.mp3 \| wc -l` | 150+ |
| Audio file count (Easy) | `ls public/audio/weekN_easy/*.mp3 \| wc -l` | 140+ |
| R2 permission | Upload test file with `--remote` | 200 OK (NOT 403) |
| CDN access | `curl -I https://pub-…/audio/weekN/dictation_1.mp3` | 200 OK |

**Correct Deepgram model names:** `aura-orion-en`, `aura-asteria-en`, `aura-luna-en`, `aura-zeus-en`, `aura-helios-en`
**❌ WRONG (causes 400):** `aura-2-orion-en`, `aura-2-asteria-en`, etc.

### 📌 SPELL-CHECK WORD_POWER (NEW)

```bash
# Print all word_power phrases for manual review
grep -E 'word:|phrase:' src/data/weeks/week_N/word_power.js
grep -E 'word:|phrase:' src/data/weeks_easy/week_N/word_power.js

# Common errors to catch:
# - Missing "to": "go bed" → "go to bed", "go school" → "go to school"
# - Missing articles: "play piano" → "play the piano"
# - Wrong tense: "I goes" → "I go"
```

### 📌 GRAMMAR INSTRUCTION CHECK (NEW)

```bash
# Verify grammar.js has instruction/explanation section
grep -c 'instruction\|grammar_explanation\|explanation' src/data/weeks/week_N/grammar.js
grep -c 'instruction\|grammar_explanation\|explanation' src/data/weeks_easy/week_N/grammar.js
# Must be ≥ 1 for each file
```

---

## 🛡️ WEEK 20 QUALITY GATE ADDITIONS (March 27, 2026)

> **Source:** Week 20 production bugs → added to `tools/code_quality_gate.sh` as checks 31-34.  
> Always run `bash tools/code_quality_gate.sh N` BEFORE committing. All 46 checks must pass.

### 📌 CHECK 31: AI Tutor conversation_cards (≥ 3 required)

**Bug (W20):** `week_20_real.js` was cloned from W16 but `conversation_cards` array was empty.

```bash
# Verify conversation_cards present with ≥ 3 cards
node -e "
import('./src/data/weeks/week_N_real.js').then(m => {
  const cards = m.default.conversation_cards || [];
  console.log('Cards:', cards.length, cards.length >= 3 ? '✅' : '❌ FAIL: need ≥ 3');
});"
```

**Rule:** `conversation_cards` must have ≥ 3 entries, each with `title`, `theme`, and `exchanges`.

### 📌 CHECK 32: vocab.js image_url files must exist on disk

**Bug (W20):** `history.jpg` was listed in vocab.js `image_url` but the image was never generated/uploaded.  
**Fix:** Reused `detective.jpg` as fallback.

```bash
# Check all vocab image_url paths exist on disk (W16+: 13 images expected)
node -e "
import fs from 'fs';
import('./src/data/weeks/week_N/vocab.js').then(m => {
  const vocab = m.default.vocab || [];
  let ok = 0, fail = 0;
  for (const w of vocab) {
    const path = 'public' + w.image_url;
    if (fs.existsSync(path)) { ok++; }
    else { console.error('❌ MISSING:', path); fail++; }
  }
  console.log(\`Images: \${ok} ok, \${fail} missing\`);
});"
```

**Rule:** Every `image_url` in vocab.js MUST have a corresponding file in `public/images/weekN/`.

### 📌 CHECK 33: No duplicate video IDs from previous week

**Bug (W20):** daily_watch.js copied video IDs from week 19 without replacing them.

```bash
# Extract videoIds from current week and previous week, compare
WEEK_N=$(grep -oP 'videoId.*?"\K[^"]+' src/data/weeks/week_N/daily_watch.js)
WEEK_PREV=$(grep -oP 'videoId.*?"\K[^"]+' src/data/weeks/week_$((N-1))/daily_watch.js)
DUPES=$(comm -12 <(echo "$WEEK_N" | sort) <(echo "$WEEK_PREV" | sort))
[ -z "$DUPES" ] && echo "✅ No video dupes" || echo "❌ DUPLICATE video IDs: $DUPES"
```

### 📌 CHECK 34: vocab.js word count must match image prompts count

**Bug (W20):** vocab.js had 10 words but image prompts file listed 13 vocab → mismatch caused missing images.

```bash
# Count vocab words vs image prompts
VOCAB_COUNT=$(node -e "import('./src/data/weeks/week_N/vocab.js').then(m => console.log(m.default.vocab?.length || 0))")
PROMPT_VOCAB=$(grep -c 'vocab_' public/images/weekN/week_N_image_prompts.txt 2>/dev/null || echo 0)
echo "vocab.js: $VOCAB_COUNT | prompts: $PROMPT_VOCAB"
[ "$VOCAB_COUNT" -eq "$PROMPT_VOCAB" ] && echo "✅ MATCH" || echo "❌ MISMATCH — add vocab BEFORE generating image prompts"
```

**Rule:** Always finalize vocab.js (13 words for W16+) BEFORE creating image prompts, otherwise prompt file will have wrong count.

### 📌 W20 LESSONS: PROCESS RULES

| Rule | Lesson | Check |
|------|--------|-------|
| `git status` before push | W20 missed 3 UI files in commit → `git status --short` and verify count | Manual |
| Image order 1→26 | auto_rename.py maps by file creation position → generate images strictly in order | Manual |
| vocab BEFORE prompts | Adding vocab after prompts → prompts miss new words → images missing | CHECK 34 |
| 13 vocab for W16+ | W20 initially had 10 → broken word_match, missing images | CHECK 32 |
