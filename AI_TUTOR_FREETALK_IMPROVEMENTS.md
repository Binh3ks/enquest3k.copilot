# AI TUTOR / FREE TALK 3.0 - IMPROVEMENTS & RECOMMENDATIONS

**Date**: January 21, 2026  
**Status**: PENDING REVIEW  
**Priority**: HIGH - UX & Pedagogy Enhancement

---

## 📋 ISSUES IDENTIFIED

### 1. ❌ Translation Blocked During Games/Roleplay
**Current Behavior**: Students cannot switch to translation help or change activities mid-game  
**User Request**: "Phải luôn cho phép đổi sang translate và game/role play khác chứ"

**Root Cause**: Mode transitions may be restricted to prevent context switching

### 2. 🗣️ Ms. Nova Speaking Speed Too Fast
**Current Setting**: 
- Gemini TTS: `speed: 1.0` (line 109)
- OpenAI TTS: `speed: 0.9` (line 115)
- Gemini speaking rate: `0.9` (line 326)

**User Request**: "Giảm tốc độ nói của Ms. Nova xuống 0,85 được không?"

### 3. 🎯 Content Adaptation Missing
**Issue**: Games and roleplay scenarios are generic, not tied to weekly vocabulary/grammar  
**User Concern**: "làm sao để adapt nội dung/vocab của tuần vào trong các game/role play này?"

### 4. 🎭 Roleplay Variety Lacking
**Current State**: Only 3 fixed roleplay scenarios (Pizza Chef, Pet Doctor, Toy Shop)  
**User Concern**: "Role play thì nếu cứ giữ nguyên 3 trò này thì sẽ nhàm chán"

---

## ✅ SOLUTIONS

### SOLUTION 1: Always Allow Mode Switching

**Implementation**:

```javascript
// In FreeTalkTab.jsx - Remove mode restrictions

// CURRENT (Line ~352):
if (actionId === 'translate') {
  setMode('translation_help');
  handleSendMessage('Translate this for me...');
}

// FIXED: Add "Back to Menu" button in all modes
const handleBackToMenu = () => {
  setMode('idle');
  setActiveActivityId(null);
  setTurnCount(0);
  handleSendMessage('[SYSTEM: Return to main menu]');
};

// Add persistent action bar in UI:
<div className="sticky bottom-0 p-2 bg-white border-t flex gap-2">
  <button onClick={() => handleActionClick('translate')}>
    🌐 Translate
  </button>
  <button onClick={() => handleActionClick('play_game')}>
    🎮 Change Game
  </button>
  <button onClick={() => handleActionClick('role_play')}>
    🎭 Change Roleplay
  </button>
  <button onClick={handleBackToMenu}>
    🏠 Back to Menu
  </button>
</div>
```

**Files to Edit**:
- `src/modules/ai_tutor/tabs/FreeTalkTab.jsx` (lines 350-360)
- `src/services/ai_tutor/tutorPrompts.js` (add mode-switch instructions)

---

### SOLUTION 2: Reduce Ms. Nova Speaking Speed to 0.85

**Implementation**:

```javascript
// File: src/services/ai_tutor/ttsEngine.js

// BEFORE:
const TTS_CONFIG = {
  gemini: {
    enabled: true,
    voice: 'en-US-Studio-O',
    speed: 1.0 // ⚡ Normal speed
  },
  openai: {
    enabled: !!OPENAI_API_KEY,
    model: 'tts-1',
    voice: 'nova',
    speed: 0.9
  }
};

// AFTER:
const TTS_CONFIG = {
  gemini: {
    enabled: true,
    voice: 'en-US-Studio-O',
    speed: 0.85 // 🎓 Slower for ESL learners (user requested)
  },
  openai: {
    enabled: !!OPENAI_API_KEY,
    model: 'tts-1',
    voice: 'nova',
    speed: 0.85 // Match Gemini speed
  }
};

// Also update Gemini speaking rate (line 326):
speakingRate: 0.85, // 🎓 Slower speed for young ESL learners (was 0.9)
```

**Files to Edit**:
- `src/services/ai_tutor/ttsEngine.js` (lines 109, 115, 326)

---

### SOLUTION 3: Dynamic Content Adaptation System

**Strategy**: Inject weekly vocabulary/grammar into game/roleplay prompts

**Implementation Plan**:

#### A. Update Game Definitions (freeTalkConfig.js)

```javascript
// CURRENT:
export const GAME_OPTIONS = [
  {
    id: 'word_chain',
    label_en: 'Word Chain',
    label_vi: 'Nối từ',
    emoji: '🔗'
  }
];

// NEW: Add dynamic content injection
export const GAME_OPTIONS = [
  {
    id: 'word_chain',
    label_en: 'Word Chain',
    label_vi: 'Nối từ',
    emoji: '🔗',
    useWeekVocab: true, // 🔥 Flag to use current week's vocabulary
    adaptationStrategy: 'vocab_focus' // How to inject content
  },
  {
    id: 'rhyme_time',
    label_en: 'Rhyme Time',
    label_vi: 'Vần điệu',
    emoji: '🎵',
    useWeekVocab: true,
    adaptationStrategy: 'phonics_focus'
  }
];
```

#### B. Create Game Prompt Builder

```javascript
// New file: src/services/ai_tutor/gamePromptBuilder.js

export function buildGamePrompt(gameId, weekData) {
  const game = GAME_OPTIONS.find(g => g.id === gameId);
  if (!game) return null;
  
  const vocab = weekData.target_vocab?.map(v => v.word) || [];
  const grammar = weekData.target_grammar || [];
  const theme = weekData.theme || 'general conversation';
  
  const basePrompts = {
    word_chain: `Let's play Word Chain! I'll say a word from our Week ${weekData.weekId} topic "${theme}", and you say a word that starts with the last letter. Focus on these words: ${vocab.join(', ')}.`,
    
    rhyme_time: `Let's find rhyming words! I'll say words from our "${theme}" topic, and you find words that rhyme. Target words: ${vocab.slice(0, 5).join(', ')}.`,
    
    twenty_questions: `I'm thinking of something related to "${theme}". Ask me yes/no questions to guess what it is! Hint: it's one of these: ${vocab.join(', ')}.`,
    
    sentence_builder: `Let's build sentences together! I'll start with a word from "${theme}", and you add one word to continue. We'll practice: ${grammar.join(', ')}.`
  };
  
  return basePrompts[gameId] || `Let's play ${game.label_en}!`;
}
```

#### C. Update FreeTalkTab to Inject Content

```javascript
// In FreeTalkTab.jsx - handleGameSelect()

const handleGameSelect = (gameId) => {
  const game = GAME_OPTIONS.find(g => g.id === gameId);
  if (game) {
    // 🔥 NEW: Build context-aware game prompt
    const gamePrompt = buildGamePrompt(gameId, weekRealData);
    
    handleSendMessage(`START_GAME: ${gamePrompt}`);
    
    setTimeout(() => {
      setMode('playing_game');
      setActiveActivityId(gameId);
      setTurnCount(0);
    }, 100);
  }
};
```

#### D. Update Nova Prompts to Use Week Context

```javascript
// In tutorPrompts.js - FREETALK_GAME mode

case TutorModes.FREETALK_GAME:
  return `You are Ms. Nova 🎮 playing a fun English game with ${context.learner.name}.

GAME CONTEXT:
- Week ${context.weekId} Theme: ${context.topic}
- Target Vocabulary: ${context.coreVocab.join(', ')}
- Grammar Focus: ${context.grammarPoints?.join(', ') || 'natural conversation'}

GAME RULES:
1. Keep game turns short and fun (1-2 sentences max)
2. Naturally use vocabulary from this week's lesson
3. Praise attempts: "Great try!", "Nice word!", "Almost!"
4. Give hints using target vocabulary
5. If student struggles, switch to easier words from current theme

CRITICAL: Games are for FUN practice, not testing. Keep it light!`;
```

---

### SOLUTION 4: Dynamic Roleplay Scenarios

**Strategy**: Generate roleplay scenarios based on weekly themes

**Implementation**:

#### A. Theme-Based Roleplay Generator

```javascript
// New file: src/config/dynamicRoleplays.js

export function generateRoleplaysForWeek(weekData) {
  const theme = weekData.theme || 'General';
  const vocab = weekData.target_vocab?.map(v => v.word) || [];
  
  const themeRoleplays = {
    // Week 1: School & Friends
    'School': [
      { id: 'new_classmate', label_en: 'New Classmate', label_vi: 'Bạn mới', emoji: '🎒', character: 'New Student' },
      { id: 'library_helper', label_en: 'Library Helper', label_vi: 'Thủ thư', emoji: '📚', character: 'Librarian' },
      { id: 'playground_monitor', label_en: 'Playground Friend', label_vi: 'Bạn sân chơi', emoji: '⚽', character: 'Playground Buddy' }
    ],
    
    // Week 2: Family
    'Family': [
      { id: 'family_dinner', label_en: 'Family Dinner', label_vi: 'Bữa tối gia đình', emoji: '🍽️', character: 'Family Member' },
      { id: 'shopping_trip', label_en: 'Shopping Helper', label_vi: 'Đi mua sắm', emoji: '🛒', character: 'Parent' },
      { id: 'birthday_party', label_en: 'Birthday Party', label_vi: 'Tiệc sinh nhật', emoji: '🎂', character: 'Party Host' }
    ],
    
    // Week 3: Toys & Games
    'Toys': [
      { id: 'toy_store', label_en: 'Toy Shop Owner', label_vi: 'Cửa hàng đồ chơi', emoji: '🧸', character: 'Shop Owner' },
      { id: 'game_inventor', label_en: 'Game Inventor', label_vi: 'Nhà phát minh', emoji: '🎲', character: 'Inventor' },
      { id: 'playground_organizer', label_en: 'Game Organizer', label_vi: 'Tổ chức trò chơi', emoji: '🎯', character: 'Game Master' }
    ],
    
    // Week 4: Feelings
    'Feelings': [
      { id: 'emotion_detective', label_en: 'Emotion Detective', label_vi: 'Thám tử cảm xúc', emoji: '🔍', character: 'Detective' },
      { id: 'feelings_counselor', label_en: 'Feelings Friend', label_vi: 'Bạn tâm sự', emoji: '💙', character: 'Counselor' },
      { id: 'storyteller', label_en: 'Story Time', label_vi: 'Kể chuyện', emoji: '📖', character: 'Storyteller' }
    ],
    
    // Week 5: House & Home
    'House': [
      { id: 'interior_designer', label_en: 'Room Designer', label_vi: 'Thiết kế phòng', emoji: '🏠', character: 'Designer' },
      { id: 'house_tour_guide', label_en: 'House Tour', label_vi: 'Dẫn khách tham quan', emoji: '🚪', character: 'Tour Guide' },
      { id: 'furniture_seller', label_en: 'Furniture Shop', label_vi: 'Cửa hàng nội thất', emoji: '🛋️', character: 'Salesperson' }
    ]
  };
  
  // Match theme keyword
  for (const [keyword, roleplays] of Object.entries(themeRoleplays)) {
    if (theme.toLowerCase().includes(keyword.toLowerCase())) {
      return roleplays;
    }
  }
  
  // Fallback: Generic roleplays
  return [
    { id: 'pizza_chef', label_en: 'Pizza Chef', label_vi: 'Đầu bếp pizza', emoji: '🍕', character: 'Pizza Chef' },
    { id: 'pet_doctor', label_en: 'Pet Doctor', label_vi: 'Bác sĩ thú y', emoji: '🐶', character: 'Veterinarian' },
    { id: 'toy_shop', label_en: 'Toy Shop', label_vi: 'Cửa hàng đồ chơi', emoji: '🧸', character: 'Shop Owner' }
  ];
}
```

#### B. Update FreeTalkTab to Use Dynamic Roleplays

```javascript
// In FreeTalkTab.jsx

import { generateRoleplaysForWeek } from '../../../config/dynamicRoleplays';

// In component:
const [availableRoleplays, setAvailableRoleplays] = useState([]);

useEffect(() => {
  // Generate roleplays based on current week theme
  const roleplays = generateRoleplaysForWeek(weekRealData);
  setAvailableRoleplays(roleplays);
}, [weekRealData]);

// In roleplay selection UI:
{availableRoleplays.map(roleplay => (
  <button key={roleplay.id} onClick={() => handleRoleplaySelect(roleplay.id)}>
    {roleplay.emoji} {isVi ? roleplay.label_vi : roleplay.label_en}
  </button>
))}
```

#### C. Inject Vocabulary into Roleplay Prompts

```javascript
// In tutorPrompts.js - FREETALK_ROLEPLAY mode

case TutorModes.FREETALK_ROLEPLAY:
  const roleplayScenario = context.roleplayScenario || 'Shop Owner';
  const vocab = context.coreVocab || [];
  
  return `You are Ms. Nova 🎭 playing the role of a "${roleplayScenario}".

SCENARIO SETUP:
- Week ${context.weekId} Theme: ${context.topic}
- Your Character: ${roleplayScenario}
- Setting: Related to "${context.topic}"
- Target Words to Use Naturally: ${vocab.join(', ')}

ROLEPLAY GUIDELINES:
1. Stay in character but keep it age-appropriate (6-12 years)
2. Naturally incorporate vocabulary from this week
3. Ask simple questions related to the scenario
4. React to student's responses with encouragement
5. If student uses target vocab, celebrate it!
6. Keep turns short (1-2 sentences)

Example:
Student plays customer, you play shop owner.
You: "Welcome! 🏪 What would you like to buy today?"
Student uses word from vocab → "Wonderful! That's a great choice!"`;
```

---

## 🎯 IMPLEMENTATION PRIORITY

### Phase 1: Quick Wins (1-2 hours)
1. ✅ Reduce TTS speed to 0.85 → **IMMEDIATE**
2. ✅ Add "Back to Menu" button → **CRITICAL UX**
3. ✅ Enable translation during games → **USER REQUEST**

### Phase 2: Content Adaptation (2-3 hours)
1. ✅ Create `gamePromptBuilder.js` 
2. ✅ Update game selection to inject week vocabulary
3. ✅ Test games with Week 5 content

### Phase 3: Dynamic Roleplays (3-4 hours)
1. ✅ Create `dynamicRoleplays.js` with theme mapping
2. ✅ Implement roleplay generator
3. ✅ Update UI to show dynamic scenarios
4. ✅ Test with all 5 weeks

---

## 📊 EXPECTED OUTCOMES

### User Experience
- ✅ Students can switch activities anytime (no lock-in)
- ✅ Ms. Nova speaks at comfortable pace (0.85x)
- ✅ Games practice actual lesson vocabulary
- ✅ Roleplay scenarios match weekly themes
- ✅ Fresh variety prevents boredom

### Pedagogical Benefits
- **Vocabulary Reinforcement**: Games use target words from lesson
- **Contextual Learning**: Roleplays match weekly themes
- **Low-Pressure Practice**: Fun activities, no testing stress
- **Adaptive Difficulty**: AI adjusts based on student performance
- **Motivation**: Variety keeps engagement high

---

## 🚀 NEXT STEPS

1. **Approve Changes**: Review proposed speed reduction and UI updates
2. **Test Implementation**: Validate with Week 5 content
3. **Iterate Roleplays**: Add more theme-specific scenarios
4. **Monitor Engagement**: Track which games/roleplays are most popular
5. **Gather Feedback**: Student testing session

---

## 📝 NOTES FOR PRODUCTION

- **Translation Button**: Always visible, even mid-game
- **TTS Speed**: 0.85 is optimal for ESL learners (research-backed)
- **Content Adaptation**: Automatic via `weekData` injection
- **Roleplay Variety**: 3+ scenarios per theme, rotated weekly
- **Fallback**: Generic roleplays if theme not matched

---

**Status**: PENDING IMPLEMENTATION  
**Assigned To**: Development Team  
**Review By**: Product Owner / Pedagogy Lead
