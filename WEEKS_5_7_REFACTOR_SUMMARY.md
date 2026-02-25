# Weeks 5-7 Refactor Summary Report

## Overview
**Status:** Ready for implementation  
**Scope:** 9 roleplay scenarios across 3 weeks  
**Improvements:** Grammar guards, scaffolding fade, structured ai_behavior, vocab validation

---

## Week 5: House & Furniture 🏠

### Theme
Vocabulary: bed, sofa, lamp, table, chair, mirror, rug, colors  
Grammar Focus: `want`, `like`, `is/are`, `have/has`, `where/what questions`

### Scenarios
1. **Room Designer 🎨** - Student designs room for Ms. Nova
2. **House Tour 🏠** - Student shows house to visitor Ms. Nova  
3. **Furniture Shop 🛋️** - Student buys furniture from shopkeeper Ms. Nova

### Grammar Guard (All 3 scenarios)
```javascript
grammar_guard: {
  allowed_structures: [
    "I want + noun (I want a bed)",
    "I like + noun (I like blue)",
    "to be + adjective/noun (It is big, She is a shopkeeper)",
    "have/has + noun (I have a sofa)",
    "Where/What questions (Where is it? What is this?)"
  ],
  forbidden_structures: [
    "gerunds (I like having)",
    "present continuous for future (I am buying tomorrow)",
    "past tense (I wanted, I had)",
    "complex sentences (because, when, although)"
  ],
  max_sentence_length: 12
}
```

### Scaffolding Pattern
- **Turns 1-3:** Heavy - "What do you want? A bed or a sofa? Say: I want a bed or I want a sofa."
- **Turns 4-7:** Medium - "What color do you like? Blue or white?"
- **Turns 8-10:** Light - "What else? (options: bed, sofa, lamp, table)"

---

## Week 6: Prepositions & Location 🗺️

### Theme
Vocabulary: box, desk, floor, wall, window, door, on, in, under, next to  
Grammar Focus: Prepositions `on/in/under/next to` + `is/are`

### Scenarios
1. **Treasure Map Adventure 🗺️** - Find 5 treasures using prepositions (progress:1/5 to 5/5)
2. **Location Detective 🔍** - Help Detective Nova find 5 lost items (progress tracking)
3. **Treasure Location Quiz 🎯** - Answer 5 questions about hiding spots (quiz format)

### Grammar Guard (All 3 scenarios)
```javascript
grammar_guard: {
  allowed_structures: [
    "It is + preposition + place (It is ON the desk)",
    "The [item] is + preposition + place (The treasure is UNDER the box)",
    "There is + noun + preposition (There is a box ON the desk)"
  ],
  forbidden_structures: [
    "gerunds",
    "present continuous",
    "past tense (It was on the desk)",
    "complex sentences"
  ],
  max_sentence_length: 10
}
```

### Scaffolding Pattern
- **Turns 1-3:** Heavy - "Is it ON the desk or UNDER the box? Say: It is ON the desk or It is UNDER the box."
- **Turns 4-7:** Medium - "Where is treasure #3? ON the floor or IN the box?"
- **Turns 8-10:** Light - "Where is the last treasure? (on, in, under, next to) (desk, box, floor)"

### Special Feature: Progress Tracking
All Week 6 scenarios track progress: Treasure 1/5, 2/5, 3/5, 4/5, 5/5  
End celebration when 5/5 reached.

---

## Week 7: School Supplies & "There is" 🎒

### Theme
Vocabulary: pen, ruler, eraser, book, notebook, pencil case, backpack, desk, chair  
Grammar Focus: `There is a...`, `Do you have...?`

### Scenarios
1. **Backpack Checklist 🎒** - Check 5 supplies for school (progress: 1/5 to 5/5)
2. **Classroom Item Quiz 📝** - Identify classroom items (quiz format)
3. **Supply Treasure Hunt 🔍** - Find 5 hidden school supplies (progress tracking)

### Grammar Guard (All 3 scenarios)
```javascript
grammar_guard: {
  allowed_structures: [
    "There is + noun (There is a pen)",
    "There is + noun + prepositional phrase (There is a pen in my backpack)",
    "Do you have + noun? (Do you have a ruler?)",
    "This is + noun (This is a book)"
  ],
  forbidden_structures: [
    "There are (A0+ level: singular only)",
    "gerunds",
    "past tense (There was)",
    "complex sentences"
  ],
  max_sentence_length: 10
}
```

### Scaffolding Pattern
- **Turns 1-3:** Heavy - "Do you have a pen or a ruler? Say: There is a pen or There is a ruler."
- **Turns 4-7:** Medium - "Check 3/5: Do you have a book or an eraser?"
- **Turns 8-10:** Light - "What else is in your backpack? (pen, book, ruler, eraser)"

### Special Feature: Progress Tracking
Similar to Week 6 - all scenarios track completion (Check 1/5 to 5/5)

---

## Implementation Strategy

### Phase 1: Week 5 (House & Furniture)
- Focus on `want`, `like`, `where` questions
- Room design = progress-based (similar to happiness jar)
- House tour = feature-by-feature walkthrough
- Shop = transaction-based dialogue

### Phase 2: Week 6 (Prepositions)
- All 3 scenarios use progress tracking (1/5 to 5/5)
- Focus on spatial prepositions (on, in, under, next to)
- Similar structure across all 3 = can use shared template
- End celebration when all treasures/items found

### Phase 3: Week 7 (School Supplies)
- All 3 scenarios use "There is" pattern
- Progress tracking (1/5 to 5/5)  
- Checklist/quiz/hunt formats
- Similar structure = can use shared template

---

## Shared Template Usage

### For Progress-Tracking Scenarios (Week 6 & 7)
Can reuse `TEMPLATE_STORY_PROGRESS` from scenarioTemplates.js:
- Track progress: 1/5 → 5/5
- Show progress in each response
- Celebrate milestones
- End celebration when goal reached

### For Sequential Scenarios (Week 5)
Can adapt `TEMPLATE_INTERVIEW` from scenarioTemplates.js:
- Sequential questions (different topics)
- Track what's been asked
- Avoid repetition

---

## Refactor Checklist

**Per Scenario (9 total):**
- [ ] Add `vocab_validation` field
- [ ] Add `grammar_guard` with examples
- [ ] Add `scaffolding` object (turns_1_3, turns_4_7, turns_8_10)
- [ ] Convert `guide_rules` → `ai_behavior` structure
- [ ] Update backup_questions with scaffolding levels
- [ ] Add progress tracking to ai_behavior (if applicable)
- [ ] Add end_celebration (if applicable)

**Validation:**
- [ ] Check for syntax errors (get_errors)
- [ ]Verify no duplicate scenarios
- [ ] Confirm scaffolding instructions are clear
- [ ] Test vocab validator on each week

---

## Estimated Lines of Code
- **Week 5:** ~1200 lines (3 scenarios × ~400 lines each)
- **Week 6:** ~1500 lines (3 scenarios × ~500 lines each, more complex)
- **Week 7:** ~1400 lines (3 scenarios × ~470 lines each)

**Total:** ~4100 lines of structured roleplay configuration

---

Created: 2026-02-11  
Status: Ready for implementation  
Priority: High (completing Priority 6 rollout)
