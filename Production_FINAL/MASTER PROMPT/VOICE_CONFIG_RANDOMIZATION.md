# VOICE CONFIG RANDOMIZATION STRATEGY

**Purpose**: Prevent voice fatigue by randomizing voice assignments across weeks while maintaining educational quality

**Updated**: March 13, 2026 - Week 15 voice config upgraded

---

## 🎯 VOICE INVENTORY (Deepgram Aura-2)

### Available Voices:

| Neural2 Code | Deepgram Aura | Gender | Characteristics | Best For |
|--------------|---------------|--------|-----------------|----------|
| en-US-Neural2-F | aura-asteria-en | Female | Natural, expressive, warm | Vocabulary, Mindmap ✅ |
| en-US-Neural2-C | aura-luna-en | Female | Soft, gentle, calming | Dictation, Shadowing ✅ |
| en-US-Neural2-H | aura-stella-en | Female | Bright, clear, professional | Questions, Grammar |
| en-US-Neural2-J | aura-zeus-en | Male | **Energetic, clear, higher pitch** | Narration, Questions ✅ |
| en-US-Neural2-D | aura-orion-en | Male | Deep, authoritative, calm | Stories (older kids) |
| en-US-Neural2-A | aura-arcas-en | Male | Neutral, balanced | General purpose |
| en-US-Neural2-I | aura-angus-en | Male | Mature, confident | Science content |

**⭐ UPGRADED CHOICE**: 
- **BEFORE Week 15**: Neural2-D (aura-orion-en) - "Too low, makes kids sleepy"
- **AFTER Week 15**: Neural2-J (aura-zeus-en) - "Energetic, clear, engaging" ✅

---

## 🔄 RANDOMIZATION RULES

### Week-Based Voice Rotation (Every 3-4 Weeks)

```javascript
// Week-based voice config generator
const VOICE_POOLS = {
  narration: {
    pool: ['en-US-Neural2-J', 'en-US-Neural2-D', 'en-US-Neural2-A'],
    rotation: 3  // Switch every 3 weeks
  },
  vocabulary: {
    pool: ['en-US-Neural2-F', 'en-US-Neural2-C', 'en-US-Neural2-H'],
    rotation: 4  // Switch every 4 weeks
  },
  dictation: {
    pool: ['en-US-Neural2-C', 'en-US-Neural2-F'],
    rotation: 2  // Alternate every 2 weeks
  },
  questions: {
    pool: ['en-US-Neural2-J', 'en-US-Neural2-I'],
    rotation: 3  // Switch every 3 weeks
  }
};

function getVoiceForWeek(weekNumber, station) {
  const config = VOICE_POOLS[station];
  const index = Math.floor(weekNumber / config.rotation) % config.pool.length;
  return config.pool[index];
}

// Examples:
getVoiceForWeek(15, 'narration')   // Neural2-J (week 15 ÷ 3 = 5, 5 % 3 = 2 → index 2)
getVoiceForWeek(16, 'narration')   // Neural2-J (week 16 ÷ 3 = 5, 5 % 3 = 2 → index 2)
getVoiceForWeek(17, 'narration')   // Neural2-J (week 17 ÷ 3 = 5, 5 % 3 = 2 → index 2)
getVoiceForWeek(18, 'narration')   // Neural2-D (week 18 ÷ 3 = 6, 6 % 3 = 0 → index 0)
```

---

## 📋 RECOMMENDED VOICE CONFIGS PER WEEK (Weeks 15-20)

### Week 15 (Updated - March 13):
```javascript
voiceConfig: {
  narration: 'en-US-Neural2-J',   // ⭐ UPGRADED: Energetic male
  vocabulary: 'en-US-Neural2-F',  // Natural female
  dictation: 'en-US-Neural2-C',   // Soft female
  shadowing: 'en-US-Neural2-F',   // Clear female
  questions: 'en-US-Neural2-J',   // Energetic male
  mindmap: 'en-US-Neural2-F'      // Natural female
}
```

### Week 16 (Suggested):
```javascript
voiceConfig: {
  narration: 'en-US-Neural2-J',   // Keep energetic male (rotation cycle)
  vocabulary: 'en-US-Neural2-C',  // 🔄 SWITCH: Soft female (variety)
  dictation: 'en-US-Neural2-F',   // 🔄 SWITCH: Natural female (alternate)
  shadowing: 'en-US-Neural2-C',   // Match dictation voice
  questions: 'en-US-Neural2-I',   // 🔄 SWITCH: Mature male (variety)
  mindmap: 'en-US-Neural2-C'      // Match vocabulary voice
}
```

### Week 17 (Suggested):
```javascript
voiceConfig: {
  narration: 'en-US-Neural2-J',   // Keep energetic male
  vocabulary: 'en-US-Neural2-F',  // 🔄 Return to natural female
  dictation: 'en-US-Neural2-C',   // 🔄 Return to soft female
  shadowing: 'en-US-Neural2-F',   // Match vocabulary
  questions: 'en-US-Neural2-J',   // 🔄 Return to energetic male
  mindmap: 'en-US-Neural2-F'      // Match vocabulary
}
```

### Week 18 (Rotation Switch):
```javascript
voiceConfig: {
  narration: 'en-US-Neural2-D',   // 🔄 SWITCH: Deep male (rotation)
  vocabulary: 'en-US-Neural2-H',  // 🔄 SWITCH: Bright female (rotation)
  dictation: 'en-US-Neural2-F',   // Natural female
  shadowing: 'en-US-Neural2-H',   // Match vocabulary
  questions: 'en-US-Neural2-A',   // 🔄 SWITCH: Neutral male (variety)
  mindmap: 'en-US-Neural2-H'      // Match vocabulary
}
```

### Week 19 (Suggested):
```javascript
voiceConfig: {
  narration: 'en-US-Neural2-D',   // Keep deep male (rotation cycle)
  vocabulary: 'en-US-Neural2-F',  // 🔄 Return to natural female
  dictation: 'en-US-Neural2-C',   // 🔄 Return to soft female
  shadowing: 'en-US-Neural2-F',   // Match vocabulary
  questions: 'en-US-Neural2-J',   // 🔄 Return to energetic male
  mindmap: 'en-US-Neural2-F'      // Match vocabulary
}
```

### Week 20 (Suggested):
```javascript
voiceConfig: {
  narration: 'en-US-Neural2-D',   // Keep deep male (rotation cycle)
  vocabulary: 'en-US-Neural2-C',  // 🔄 Soft female for variety
  dictation: 'en-US-Neural2-F',   // 🔄 Natural female (alternate)
  shadowing: 'en-US-Neural2-C',   // Match vocabulary
  questions: 'en-US-Neural2-I',   // 🔄 Mature male (variety)
  mindmap: 'en-US-Neural2-C'      // Match vocabulary
}
```

---

## 🎭 ROTATION PATTERN SUMMARY

### Narration (Read & Explore):
- **Weeks 15-17**: Neural2-J (aura-zeus-en) - Energetic male ⭐
- **Weeks 18-20**: Neural2-D (aura-orion-en) - Deep male
- **Weeks 21-23**: Neural2-A (aura-arcas-en) - Neutral male
- **Cycle repeats**: Back to Neural2-J at Week 24

### Vocabulary (Words & Definitions):
- **Weeks 15, 17, 19**: Neural2-F (aura-asteria-en) - Natural female
- **Weeks 16, 20**: Neural2-C (aura-luna-en) - Soft female
- **Week 18**: Neural2-H (aura-stella-en) - Bright female
- **Pattern**: F → C → F → H → F → C (prevents monotony)

### Questions (Ask AI, Logic):
- **Weeks 15, 17, 19**: Neural2-J (aura-zeus-en) - Energetic male
- **Weeks 16, 20**: Neural2-I (aura-angus-en) - Mature male
- **Week 18**: Neural2-A (aura-arcas-en) - Neutral male
- **Pattern**: J → I → J → A → J → I (energy variety)

---

## 🔧 IMPLEMENTATION FOR MASS PRODUCTION

### Option 1: Manual Assignment (Current Method)
```javascript
// For each week, manually set voiceConfig based on rotation schedule
// Pros: Full control, can adjust per week's theme
// Cons: Time-consuming for 152 weeks
```

### Option 2: Automated Generator Script (Recommended)
```javascript
// MASS/tools/generate_voice_config.js
function generateVoiceConfig(weekNumber) {
  return {
    narration: VOICE_POOLS.narration.pool[Math.floor(weekNumber / 3) % 3],
    vocabulary: VOICE_POOLS.vocabulary.pool[Math.floor(weekNumber / 4) % 3],
    dictation: VOICE_POOLS.dictation.pool[Math.floor(weekNumber / 2) % 2],
    shadowing: VOICE_POOLS.vocabulary.pool[Math.floor(weekNumber / 4) % 3], // Match vocab
    questions: VOICE_POOLS.questions.pool[Math.floor(weekNumber / 3) % 2],
    mindmap: VOICE_POOLS.vocabulary.pool[Math.floor(weekNumber / 4) % 3] // Match vocab
  };
}

// Usage in create_week.cjs:
const voiceConfig = generateVoiceConfig(weekNumber);
```

### Option 3: Theme-Based Assignment (Most Flexible)
```javascript
// Adjust voices based on week theme
function getThemeVoice(weekNumber, weekTheme) {
  if (weekTheme.includes('exciting') || weekTheme.includes('adventure')) {
    return { narration: 'en-US-Neural2-J' }; // Energetic
  } else if (weekTheme.includes('calm') || weekTheme.includes('bedtime')) {
    return { narration: 'en-US-Neural2-D' }; // Deep, calm
  }
  // Default to rotation
  return generateVoiceConfig(weekNumber);
}
```

---

## ✅ BENEFITS OF RANDOMIZATION

1. **Prevents Voice Fatigue**: Kids don't get bored hearing same voice for 152 weeks
2. **Improved Attention**: New voice = renewed attention ("Oh! New teacher today!")
3. **Better Learning**: Different voices process differently in brain (more neural pathways)
4. **Gender Balance**: Mix of male/female voices (equity representation)
5. **Natural Variety**: Mimics real classroom with multiple teachers

---

## 📊 TRACKING VOICE USAGE

```javascript
// Analytics to track which voices perform best
{
  "week_15": {
    "narration": "en-US-Neural2-J",
    "engagement_rate": 0.87,  // 87% completion rate
    "feedback": "Much better than old voice",
    "cache_hit_rate": 0.92
  },
  "week_14": {
    "narration": "en-US-Neural2-D",
    "engagement_rate": 0.78,  // 78% completion
    "feedback": "Voice too low, kids fell asleep",
    "cache_hit_rate": 0.89
  }
}
```

---

## 🎤 VOICE SELECTION GUIDELINES

### DO:
✅ Use energetic voices (Neural2-J, Neural2-I) for action-heavy content (sports, adventures)
✅ Use soft voices (Neural2-C) for calm activities (reading, meditation)
✅ Rotate every 3-4 weeks to maintain freshness
✅ Keep vocabulary and mindmap voices matched (consistency within station)
✅ Use same voice for shadowing as dictation (easier to mimic familiar voice)

### DON'T:
❌ Use Neural2-D (deep voice) for young kids (too authoritative, boring)
❌ Switch voices mid-week (confusing for learners)
❌ Use too many different voices in one week (cognitive overload)
❌ Assign inappropriate gender voice to gendered content (unless intentional)

---

**Status**: Week 15 voice config UPDATED with energetic male (Neural2-J)
**Next**: Implement rotation for Weeks 16-20
**Related**: [AI_TUTOR_TTS_CONTEXT_GUIDE.md](AI_TUTOR_TTS_CONTEXT_GUIDE.md)
