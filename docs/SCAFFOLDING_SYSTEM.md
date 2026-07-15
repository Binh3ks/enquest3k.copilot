# Video Challenge Scaffolding Fading System

## Overview
Progressive scaffolding reduction across 31+ weeks to build student autonomy while maintaining appropriate challenge level aligned with ZPD (Vygotsky) and Gradual Release of Responsibility framework.

---

## 📊 Scaffolding Stages by Week

### **Stage 1: HIGH Support (W1-8)**
**Target:** Absolute beginners, first exposure to Past Simple writing

**Easy Mode Structure:**
- ✅ **Numbered word bank**: `[1] walked [2] park [3] happy [4] dog`
- ✅ Numbers match blank order in templates
- ✅ Blanks: 50-60% given (many small blanks, 1 word each)
- ✅ Word bank: Single words only (verbs, nouns, adjectives separated)
- ✅ Distractors: 15% (gentle introduction to wrong forms)

**Advanced Mode Structure:**
- ✅ **Numbered phrase bank**: `[1] walked to the park [2] played soccer together`
- ✅ Numbers match blank order
- ✅ Blanks: 40-50% given (fewer but larger blanks)
- ✅ Phrase bank: Complete clauses (2-4 words)
- ✅ Distractors: 15%

**Rationale:** Direct 1:1 mapping (blank #1 → word #1) reduces cognitive load, allows focus on sentence construction and past tense forms.

**Example W3 Easy:**
```javascript
sentence_frames: [
  {"template": "Last ___, I ___ to the ___."},  // Blanks 1,2,3
  {"template": "I ___ my ___ there."}            // Blanks 4,5
],
words: [
  {word: "[1] Saturday", vi: "thứ Bảy"},
  {word: "[2] walked", vi: "đã đi bộ"},
  {word: "[3] park", vi: "công viên"},
  {word: "[4] met", vi: "đã gặp"},
  {word: "[5] friend", vi: "bạn"}
]
```

---

### **Stage 2: MEDIUM Support (W9-18)**
**Target:** Developing confidence, ready for mild cognitive challenge

**Easy Mode Structure:**
- ✅ **Grouped by category** (NO numbers):
  - 🟢 **Verbs:** walked, played, watched, cooked
  - 🔵 **Nouns:** park, ball, movie, kitchen
  - 🔴 **Adjectives:** happy, tired, sunny, fun
- ✅ Blanks: 40-50% given
- ✅ Word bank: Still single words but categorized
- ✅ Distractors: 20% mixed into each category

**Advanced Mode Structure:**
- ✅ **Grouped by phrase type**:
  - 🟢 **Actions:** walked to the park, played soccer together
  - 🔵 **Descriptions:** the weather was sunny and warm
  - 🔴 **Feelings:** I felt very happy and excited
- ✅ Blanks: 30-40% given
- ✅ Phrase bank: Full clauses, grouped logically
- ✅ Distractors: 20%

**Rationale:** Students must identify word type/meaning, not just follow numbers. Supports syntactic awareness development.

**Example W12 Easy:**
```javascript
words: [
  // === VERBS ===
  {word: "walked", vi: "đã đi bộ"},
  {word: "played", vi: "đã chơi"},
  {word: "walk", vi: "đi bộ (sai dạng)", distractor: true},
  // === NOUNS ===
  {word: "park", vi: "công viên"},
  {word: "ball", vi: "bóng"}
]
```

---

### **Stage 3: MEDIUM-LOW Support (W19-25)**
**Target:** Confident writers, transitioning to independence

**Easy Mode Structure:**
- ✅ **Partial grouping**: Core words grouped, others shuffled
- ✅ Blanks: 35-45% given
- ✅ Word bank: Mix of grouped + scattered
- ✅ Distractors: 20% fully integrated

**Advanced Mode Structure:**
- ✅ **Loose clustering**: Related phrases near each other but not explicitly labeled
- ✅ Blanks: 25-35% given
- ✅ Phrase bank: Logical flow maintained but no headers
- ✅ Distractors: 20%

**Rationale:** Weaning off explicit structure while maintaining semantic coherence. Encourages retrieval and meaning-making.

---

### **Stage 4: LOW Support (W26-31+)** ← **CURRENT**
**Target:** Independent writers, full integration of skills

**Easy Mode Structure:**
- ✅ **Fully shuffled word bank** (no numbers, no grouping)
- ✅ Blanks: 40-50% given (maintained for linguistic accuracy)
- ✅ Word bank: Single words completely randomized
- ✅ Distractors: 20% scattered throughout
- ✅ **Cumulative Review**: 5 words from previous week marked with `(ôn W##)`

**Advanced Mode Structure:**
- ✅ **Fully shuffled phrase bank**
- ✅ Blanks: 30-40% given
- ✅ Phrase bank: Complete clauses/phrases randomized
- ✅ Distractors: 20%
- ✅ **Cumulative Review**: 5 phrases from previous week

**Rationale:** Students at W26+ have 25 weeks experience. Full shuffle requires active meaning construction, retrieval practice, and metacognitive engagement. Cumulative review supports spaced repetition.

**Example W26 Easy (current):**
```javascript
scaffolding_stage: "low",
cumulative_review_words: [
  {word: "walked", vi: "đã đi bộ (ôn W25)", from_week: 25},
  {word: "played", vi: "đã chơi (ôn W25)", from_week: 25}
],
words: [
  {word: "Saturday", vi: "thứ Bảy"},
  {word: "name", vi: "tên"},
  {word: "woke", vi: "đã thức dậy"},
  {word: "wake", vi: "thức dậy (sai dạng)", distractor: true},
  {word: "sunny", vi: "nắng"}
  // ... fully shuffled, no order
]
```

---

### **Stage 5: MINIMAL Support (W32-36+)** [FUTURE]
**Target:** Near-fluent writers

**Structure:**
- ✅ No word bank by default (hidden)
- ✅ "Emergency bank" available on request
- ✅ Only 3-5 challenging words provided
- ✅ Blanks: 30-40% (but strategic — only complex structures)
- ✅ Cumulative review from 2 weeks prior

---

## 🔄 Cumulative Review (Spiral System)

**Starting W27:**
Each week includes **5 core words/phrases** from the previous week marked with `(ôn W##)` to support:
- **Spaced Repetition**: Research shows optimal retention at 1-week intervals
- **Retrieval Practice**: Active recall strengthens memory traces
- **Lexical Cohesion**: Builds thematic vocabulary networks

**Selection Criteria:**
1. High-frequency verbs (walked, played, went, had)
2. Theme-specific nouns (park, seed, race, picnic)
3. Descriptive adjectives tied to emotions (happy, tired, excited)

**UI Display:**
```javascript
cumulative_review_words: [
  {word: "walked", vi: "đã đi bộ (ôn W26)", from_week: 26},
  {word: "played", vi: "đã chơi (ôn W26)", from_week: 26}
]
```
Appears in vocab bank with light blue background (differentiated but not highlighted).

---

## 🧠 Adaptive Fading (Future Enhancement)

**Concept:** Automatically adjust scaffolding based on student performance

**Tracking Metrics:**
- Vocab bank click frequency per week
- Writing score (grammar accuracy + word count)
- Time to completion
- Revision count

**Logic:**
```javascript
if (student.no_bank_used >= 3 && student.avg_score >= 85) {
  // Promote to next scaffolding stage early
  scaffolding_stage = "lower"
} else if (student.bank_clicks > 10 && student.score < 70) {
  // Maintain or increase support
  scaffolding_stage = "higher"
}
```

**Storage:** LocalStorage or backend API tracking per student per week.

---

## 📐 Implementation Checklist

### For W1-25 (Retroactive Application):
- [ ] W1-8: Add numbered banks `[1] [2] [3]...`
- [ ] W9-18: Add category grouping (VERBS | NOUNS | ADJ)
- [ ] W19-25: Implement partial grouping
- [ ] W1-31: Add `scaffolding_stage` metadata field
- [ ] W2-31: Add `cumulative_review_words` arrays

### For W26-31 (Current — ✅ COMPLETE):
- [✅] Fully shuffled banks (no numbers, no grouping)
- [✅] `scaffolding_stage: "low"` field added
- [✅] Cumulative review from previous week (5 words/phrases)
- [✅] Distractors 20% scattered
- [✅] show_by_default: false enforced

### UI Enhancements:
- [✅] Metacognitive prompt: "Try to remember words from last week before clicking"
- [ ] Cumulative words highlighted with light blue badge `(ôn W##)`
- [ ] Adaptive fading logic (track clicks → auto-adjust)
- [ ] Progress indicator: "You used the bank 0 times this week! 🎉"

---

## 📚 Pedagogical Research Support

1. **Vygotsky (ZPD)**: Scaffolding within student's zone maintains optimal challenge
2. **Swain (Output Hypothesis)**: Writing forces syntactic processing → acquisition
3. **Sweller (Cognitive Load)**: Numbered banks reduce extraneous load for beginners
4. **Bjork (Desirable Difficulty)**: Shuffled banks at W26+ create productive struggle
5. **Krashen (i+1)**: Cumulative review provides comprehensible input at next level

---

## 🎯 Success Metrics

- **W1-8**: 80%+ students complete writing with <5 bank clicks
- **W9-18**: 70%+ students identify word category correctly
- **W19-25**: 60%+ students complete with <3 bank clicks
- **W26+**: 50%+ students complete WITHOUT clicking bank
- **Spiral Review**: 75%+ students use cumulative words correctly in new contexts

---

**Last Updated:** May 8, 2026  
**Current Status:** W26-31 fully implemented | W1-25 awaiting retroactive application  
**Commit:** 0f67efb0 (initial implementation) → [NEXT COMMIT] (cumulative + docs)
