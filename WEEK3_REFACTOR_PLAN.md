# Week 3 Roleplay Refactor - Implementation Plan

## Overview
Week 3 Theme: **Appearance** (tall, short, long hair, glasses)
Focus Grammar: `to be + adjective`, `have/has + noun`
Scenarios: 3 (Mirror Friend, Family Album, Fashion Show)

## Scenario 1: Mirror Friend 🪞

### Grammar Guard
```javascript
grammar_guard: {
  allowed_structures: [
    "to be + adjective (I am tall, She is short)",
    "have/has + noun (I have long hair, He has glasses)",
    "to be + noun (I am a student)"
  ],
  forbidden_structures: [
    "present continuous (I am having)",
    "gerunds (I like having)",
    "past tense (I was, I had)",
    "present perfect (I have been)",
    "complex sentences (because, when, although)"
  ],
  max_sentence_length: 10
}
```

### Scaffolding Fade
- **Turns 1-3 (Heavy):** "Are you tall or short? Say: I am tall or I am short."
- **Turns 4-7 (Medium):** "Are you tall or short?"
- **Turns 8-10 (Light):** "What else can you tell me about yourself? (tall, short, hair, eyes, glasses)"

### AI Behavior
```javascript
ai_behavior: {
  response_pattern: {
    steps: [
      { name: "react", examples: ["Wonderful!", "I see!", "Interesting!"] },
      { name: "mirror", example: "You are tall! I am tall too!" },
      { name: "ask_next", instruction: "Ask about different appearance feature" }
    ],
    template: "[React] + [Mirror/Expand] + [Ask Next]"
  },
  conversation_strategy: {
    type: "sequential_features",
    features: ["height (tall/short)", "hair (long/short/curly/straight)", "eyes (color)", "glasses (yes/no)", "smile"],
    track_asked: true,
    avoid_repetition: true
  }
}
```

## Scenario 2: Family Album 📸

### Grammar Guard
Same as Mirror Friend + family vocab

### Scaffolding Fade
- **Turns 1-3 (Heavy):** "Is she your mother or your sister? Say: She is my mother or She is my sister."
- **Turns 4-7 (Medium):** "Is she tall or short?"
- **Turns 8-10 (Light):** "Tell me more about your family! (mother, father, brother, sister)"

### AI Behavior
```javascript
ai_behavior: {
  response_pattern: {
    steps: [
      { name: "acknowledge", examples: ["Oh!", "I see!", "Nice!"] },
      { name: "celebrate_relationship", example: "She is your mother! Wonderful!" },
      { name: "ask_appearance", instruction: "Ask about that person's appearance" }
    ]
  },
  conversation_strategy: {
    type: "person_by_person",
    people: ["mother", "father", "brother", "sister", "family members"],
    features_per_person: ["tall/short", "hair", "eyes", "glasses"],
    track_asked_people: true
  }
}
```

## Scenario 3: Fashion Show 👗

### Grammar Guard
Same as Mirror Friend

### Scaffolding Fade
- **Turns 1-3 (Heavy):** "Model 1 is tall. Is her hair long or short? Say: Her hair is long or Her hair is short."
- **Turns 4-7 (Medium):** "Model 2! Is she tall or short?"
- **Turns 8-10 (Light):** "Model 5! Describe her! (tall, short, hair, glasses)"

### AI Behavior
```javascript
ai_behavior: {
  response_pattern: {
    steps: [
      { name: "celebrate", examples: ["Yes!", "Perfect!", "Great!"] },
      { name: "expand", example: "Her hair is long! Beautiful!" },
      { name: "ask_next_feature_or_model", instruction: "Ask about another feature or present next model" }
    ]
  },
  conversation_strategy: {
    type: "progress_tracking",
    goal: "Describe 5 models",
    show_progress: true, // "Model 1/5", "Model 2/5"
    vary_appearances: true, // Mix tall/short, long/short hair, glasses/no glasses
    max_features_per_model: 3
  }
}
```

## Common Elements (All 3 Scenarios)

### Vocab Validation
```javascript
vocab_validation: {
  source: "cumulative_vocab_w1_w3",
  allow_target_vocab: true,
  strict_mode: false
}
```

### Turn Limit
Already reduced to 10 globally in FreeTalkTab.jsx

### Error Correction (All 3)
```javascript
error_correction: {
  strategy: "recast_with_warmth",
  description: "React positively, recast correctly, move forward",
  example: "Student: 'She tall' → AI: 'Great! She IS tall! Does she have long hair?'"
}
```

## Implementation Order
1. ✅ Create implementation plan (this document)
2. ⏳ Refactor Scenario 1: Mirror Friend
3. ⏳ Refactor Scenario 2: Family Album
4. ⏳ Refactor Scenario 3: Fashion Show
5. ⏳ Validate with get_errors
6. ⏳ Move to Week 5

## Key Differences from Week 4
- **No gerunds** (Week 4 had "I like + V-ing")
- Focus on **`to be`** and **`have/has`** (Week 4 had "I like", "I feel")
- Focus on **description** not **preferences/emotions**
- Fashion show has **progress tracking** (Model 1/5, Model 2/5...) like happiness jar

---
Created: 2026-02-11
Status: Ready for implementation
