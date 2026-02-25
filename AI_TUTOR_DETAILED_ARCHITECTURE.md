# AI TUTOR - DETAILED ARCHITECTURE (Jan 30, 2026)

## 🎯 MISSION STATEMENT
Ms. Nova (AI Tutor) is a **conversational English coach** embedded as a floating widget in the Engquest app. She guides learners (7-11 years old) through **5 learning modes** while maintaining **smart scaffolding**, **vocabulary tracking**, and **grammar guardrails**.

---

## 📊 COMPONENT HIERARCHY

```
AITutorWidget.jsx (Global)
├── FloatingButton.jsx
│   └── Click to toggle widget visibility
└── TutorWindow.jsx (Fixed 50vw x 100vh right panel)
    ├── Header (Gradient + 5 Tabs)
    └── Content Area
        ├── StoryMissionTab.jsx
        ├── FreeTalkTab.jsx
        ├── PronunciationTab.jsx
        ├── QuizTab.jsx
        └── DebateTab.jsx (Unlocks Week 20+)
```

---

## 🧠 CORE ARCHITECTURE: NOVA ENGINE

### **NovaEngine Class** (`src/services/ai_tutor/novaEngine.js`)
**Single source of truth for AI interactions**

```javascript
const nova = new NovaEngine(weekData, { name: 'Alex', age: 8 });
const response = await nova.sendToNova({
  mode: 'story|freetalk|pronunciation|quiz|debate',
  userMessage: "I like school",
  chatHistory: [{role, content}, ...],
  context: { turnCount, missionId, weekId, ... },
  weekId: 2  // Optional: override from params
});
```

**Response Flow:**
```
User Input 
  ↓
NovaEngine.sendToNova()
  ├─ Step 1: buildTutorContext() [Syllabus + week data]
  ├─ Step 2: aiRouter.sendToAI() [Multi-provider fallback]
  ├─ Step 3: applyGuardrails() [Grammar + talk ratio]
  ├─ Step 4: responseParser.parseResponse()
  └─ Step 5: Return structured JSON
```

### **Built Context** (from buildTutorContext)
Each mode generates a **system prompt** that includes:
- **Week syllabus & objectives**
- **Chat history** (context window)
- **Student profile** (name, age, level)
- **Conversation context** (turn count, topic, mode)
- **Vocabulary scaffold** (words to guide toward)
- **Grammar rules** (A0-A1 level, simple sentences)
- **Response format** (JSON with ai_response + ack + recast + question)

---

## 🤖 AI PROVIDER LAYER

### **aiRouter.js** - Multi-Provider Fallback
**4-layer fallback chain (UPDATED Jan 30):**

| Layer | Provider | Speed | Cost | Quality |
|-------|----------|-------|------|---------|
| 1️⃣ | **Cerebras** (Llama 3.3 70B) | ⚡ Ultra-fast | Free | ✓✓ |
| 2️⃣ | **Gemini** (Flash 1.5) | 1-2s | Free tier | ✓✓ |
| 3️⃣ | **Groq** (Llama 3.3 70B) | ⚡ 0.5s | Free | ✓ |
| 4️⃣ | **Together AI** (Llama 3.3 70B) | 0.5-1s | 60 req/min | ✓ |

```javascript
// Smart priority system (V5):
// 1. Check if Cerebras enabled → Use it (fastest + reliable)
// 2. Fallback to Gemini on Cerebras error
// 3. Fallback to Groq if Gemini fails (with 2s min delay)
// 4. Fallback to Together AI as last resort
// - All providers use Llama 3.3 70B model
// - Rate limiting on Groq (25 req/min, exponential backoff)
// - Contextual fallback for network failures
```

---

## 🎓 5 LEARNING MODES

### **1️⃣ STORY MISSION TAB**
**Guided narrative learning with Oliver's School story**

```javascript
// Data structure:
{
  week_id: 2,
  story_character: { name: 'Oliver', age: 8, personality: 'friendly' },
  story_missions: [
    {
      id: 1,
      title: "Oliver's First Day",
      context: "Oliver is starting at a new school",
      steps: [
        { step: 1, canonical_question: "What is your name?" },
        { step: 2, canonical_question: "How old are you?" },
        { step: 3, canonical_question: "Do you like school?" },
      ],
      mission_context: "Guide Oliver through introductions..."
    }
  ]
}
```

**Features:**
- **Objective-driven** with step-based progression
- **Turn-limited** (20 turns per mission)
- **Hints extraction** from canonical questions
- **Student name capture** (1st interaction)
- **Progress persistence** (via useStationProgress)
- **Vocab mastery tracking** (auto-detect student vocabulary)

**Key Components:**
- `TurnManager.js` - Track steps, validate answers
- `responseGuard.js` - Block banned phrases, enforce structure
- `learnerProfiler.js` - Detect struggling patterns, adaptive scaffolding

---

### **2️⃣ FREE TALK TAB**
**Casual conversation with embedded vocabulary guidance (3 modes)**

```javascript
// 3 Activity Modes:
{
  idle: 'Waiting, show menu',
  playing_game: '20Q / Word Chain / Sentence Builder (max 20 turns)',
  playing_roleplay: 'Immersive scenarios (pizza chef, doctor, etc.)',
  asking_any: 'Ask any question (no turn limit)',
  translation_help: 'Translate English ↔ Vietnamese'
}
```

**Game System:**
```javascript
// Game config from gameAdaptation.js:
GAME_OPTIONS = {
  word_chain: {
    name_en: 'Word Chain',
    emoji: '🔗',
    starter_words: ['HAPPY', 'SCHOOL', ...],
    rules: 'My word ends with X. Your word must CONTAIN X.',
    turn_limit: 20
  },
  twenty_questions: {
    name_en: '20 Questions',
    emoji: '❓',
    objects: ['cat', 'book', 'house', ...],
    turn_limit: 20,
    preSelectedObject: (code-selected, not AI-hallucinated)
  },
  sentence_builder: {
    name_en: 'Sentence Builder',
    emoji: '✍️',
    patterns: ['I like [NOUN]', 'I am [ADJECTIVE]', ...],
    turn_limit: 20
  }
}
```

**Roleplay System:**
```javascript
// Dynamic roleplays from week data:
{
  pizza_chef: {
    character: 'Pizza Chef',
    scenario: 'You work at a pizza restaurant. Customer orders...',
    vocabulary_focus: ['pizza', 'cheese', 'topping', 'delivery'],
    turn_limit: 20
  },
  doctor: { ... },
  teacher: { ... }
}
```

**Key Components:**
- `gamePromptBuilder.js` - Inject weekly vocabulary into games
- `roleplayPromptBuilder.js` - Build immersive roleplay scenarios
- `freeTalkModes.js` - State machine for idle → playing transitions

---

### **3️⃣ PRONUNCIATION / SPEAK TAB**
**Phonetic practice with real-time feedback**

```javascript
// Features:
- Listen to Ms. Nova pronounce words/phrases
- Record student pronunciation
- Auto-compare with reference audio (phoneme-level)
- Provide feedback (rhythm, stress, intonation)
```

---

### **4️⃣ QUIZ TAB**
**Vocabulary & comprehension quizzes**

```javascript
// Quiz structure:
{
  quiz_game: {
    questions: [
      {
        type: 'multiple_choice',
        question: 'What color is the sky?',
        options: ['blue', 'red', 'green'],
        correct: 'blue',
        vocab_word: 'sky'
      },
      {
        type: 'matching',
        question: 'Match words to pictures'
      }
    ],
    turn_limit: 15
  }
}
```

---

### **5️⃣ DEBATE TAB** 🔒
**Unlocks Week 20+**
- Opinion-based discussions
- Argument scaffolding
- Counter-argument practice

---

## 📝 RESPONSE STRUCTURE

### **JSON Response Format (Standard)**
```json
{
  "ai_response": "Hello! My name is Ms. Nova! What is YOUR name?",
  "ack": "Nice to meet you!",
  "recast": "Your name is Alex",
  "question": "How old are you?",
  "hints": ["5", "Six", "Seven years old"],
  "metadata": {
    "mode": "story",
    "turn": 2,
    "week": 1,
    "vocabulary_used": ["name", "meet"]
  }
}
```

### **Response Guard Layers**

| Layer | Function | Examples |
|-------|----------|----------|
| **Pre-Generation** | Schema validation | Enforce `{ai_response, ack, recast, question}` |
| **Post-Generation** | Content repair | Remove banned phrases, fix grammar, enforce 30-word limit |
| **Grammar Guard** | A0-A1 compliance | Fix: "Are you a student, today?" → "Are you a student?" |
| **Talk Ratio Guard** | Enforce conversation balance | AI: 40%, Student: 60% |

### **Banned Phrases** (Always removed)
```javascript
BANNED_PHRASES = [
  /what do you think\??/gi,
  /any thoughts\??/gi,
  /that's interesting\.?/gi,
  /how do you feel/gi,
  // ... enforce focused, scaffolded conversation
]
```

---

## 🗣️ TEXT-TO-SPEECH (TTS)

### **voiceService.js** - 4-Layer TTS Stack

| Layer | Service | Quality | Speed | Cost | Status |
|-------|---------|---------|-------|------|--------|
| 1️⃣ | **Piper TTS** (local, localhost:8000) | Excellent (Lessac-high) | 0.5s | Free | ✅ Active |
| 2️⃣ | **Gemini TTS** | Good | 1-2s | Free quota | Fallback |
| 3️⃣ | **Web Speech API** | Basic | Instant | Browser | Fallback |
| 4️⃣ | **Silent** | N/A | N/A | N/A | Last resort |

```javascript
VoiceService.speak(text)
  ├─ Try Piper TTS (localhost:8000)
  │  ├─ Clean text: Remove emojis, normalize "Ms. Nova" → "Miss Nova"
  │  ├─ POST http://localhost:8000/speak?text=...
  │  └─ Play audio from server response
  │
  ├─ Fallback to Gemini TTS on Piper error
  │  ├─ Cloud-based fallback
  │  └─ Slower but reliable
  │
  └─ Web Speech API (last resort)
     └─ Browser SpeechSynthesis API
```

**Features:**
- Auto-play on AI response
- Text cleaning (emoji removal, abbreviation normalization)
- Audio caching for repeated phrases
- Concurrent call prevention
- Network error handling

---

## 💾 STATE MANAGEMENT (TUTOR STORE)

### **Zustand Store** (`src/services/ai_tutor/tutorStore.js`)

```javascript
const {
  // Widget
  isWidgetOpen,
  setWidgetOpen,
  
  // Tab navigation
  activeTab,  // 'story' | 'freetalk' | 'pronunciation' | 'quiz' | 'debate'
  setActiveTab,
  
  // Per-tab messages
  messages: {
    story: [],
    freetalk: [],
    pronunciation: [],
    quiz: [],
    debate: []
  },
  addMessage(tabId, message),
  clearMessages(tabId),
  
  // Audio playback
  autoPlayEnabled,
  setAutoPlay(enabled),
  
  // Learner profiling
  recordTurn(tabId, context),
  getLearnerStyle(),  // 'visual' | 'auditory' | 'kinesthetic'
  getStrugglingTurns(),  // Turns where student didn't understand
  
  // Vocabulary mastery
  vocabMastery: { word: { attempts: 3, correct: 2 } },
  initVocabMastery(words),
  trackVocabUsage(word, isCorrect),
  getVocabFocusPrompt(),  // Auto-generate prompt to guide toward weak vocab
  
  // Cache management
  clearCacheOnOpen(),  // Always start fresh on widget open
  clearCache()         // Manual cache clear
} = useTutorStore();
```

### **Storage Persistence**
```javascript
// Auto-migrates on version mismatch
STORAGE_VERSION = '2.2.0'
localStorage.key = 'engquest-tutor-storage'

// Cleared on:
// 1. Widget open (fresh session)
// 2. Tab switch (fresh conversation)
// 3. Version mismatch (auto-clear)
```

---

## 🎯 LEARNER PROFILING

### **learnerProfiler.js**
**Tracks student behavior across all modes**

```javascript
{
  learnerStyle: {      // Visual, Auditory, Kinesthetic
    turns: [{ mode, interactionType, timestamp }],
    preferred: 'auditory'
  },
  
  strugglingTurns: [
    { turn: 3, mode: 'story', misunderstood: true, question: "..." },
    { turn: 5, mode: 'freetalk', offTopic: true, topic: "..." }
  ],
  
  scaffoldingLevel: 2,  // 1 (minimal) → 5 (max support)
  adaptivePrompt: "..." // Auto-generated based on struggles
}
```

**Dynamic Scaffolding:**
- High struggles → Increase vocabulary hints + pre-filled answers
- Consistent success → Reduce hints, increase complexity
- Off-topic responses → Guide back with gentle prompts

---

## 📚 VOCABULARY MASTERY TRACKING

### **vocabMasteryTracker.js**
**Auto-detect student vocabulary usage**

```javascript
// Track per word:
vocabMastery = {
  'school': {
    attempts: 5,       // Times student used it
    correct: 3,        // Times in correct context
    mastery_level: 0.6 // 60%
  },
  'happy': {
    attempts: 2,
    correct: 2,
    mastery_level: 1.0 // 100% - mastered!
  }
}

// Auto-generate vocab focus prompt:
const prompt = generateVocabFocusPrompt(vocabMastery);
// "Guide student to use: 'school', 'friend', 'teacher' more often"
```

---

## 🔄 UNIVERSAL PROGRESS SYSTEM

### **useStationProgress Hook**
**Persists progress across page reloads**

```javascript
const { savedData, saveProgress, markComplete } = useStationProgress(
  weekId,  // 1-7
  stationType  // 'ai_story' | 'ai_freetalk' | 'ai_quiz'
);

// savedData: { 
//   turnCount, 
//   studentName, 
//   conversationTopic,
//   totalTurns,
//   missionIndex
// }

saveProgress({ turnCount: 3, studentName: 'Alex' });
markComplete(); // Save completion flag
```

---

## 🛡️ GUARDRAILS & VALIDATION

### **responseGuard.js**
**2-layer content protection**

| Layer | Logic | Examples |
|-------|-------|----------|
| Schema | Validate JSON structure | Must have `ai_response`, `ack`, `recast`, `question` |
| Content | Block problematic patterns | Remove banned phrases, enforce word limit (30 words) |
| Grammar | A0-A1 compliance | Fix tense, articles, word order for 7-11 yo |
| Repetition | Avoid repeating questions | Track asked follow-ups per mission |

### **grammarGuard.js**
**Validates A0-A1 level grammar**

```javascript
validateAIResponse(text) {
  // Check: Complex tenses → Simplify
  // Check: Passive voice → Convert to active
  // Check: Long sentences (>15 words) → Split
  // Check: Phrasal verbs → Teach explicitly
}
```

### **talkRatioGuard.js**
**Enforce natural conversation balance**

```javascript
enforceTalkRatio(turnCount, mode) {
  // AI: ~40% of talking time
  // Student: ~60% of talking time
  // If AI is over-talking → Reduce response length
  // If student is quiet (5+ turns) → Prompt with simpler Q
}
```

---

## 🚀 INITIALIZATION FLOW

### **StoryMissionTab Startup**
```javascript
// 1. Parse week from URL: /week/2/read_explore → weekId = 2
const weekNumber = parseInt(location.pathname.match(/\/week\/(\d+)/)?.[1] || '1');

// 2. Load week data: import week2RealData from '...week_02_real'
const weekRealData = weekRealData[weekNumber];

// 3. Initialize NovaEngine
const novaEngineRef = useRef(null);
useEffect(() => {
  const weekData = await getCurrentWeekData('week-2');
  novaEngineRef.current = new NovaEngine(weekData, { name: user.name, age: 8 });
}, [weekId, user]);

// 4. Initialize vocab mastery
useEffect(() => {
  const weekVocab = weekRealData.global_vocab.map(v => v.word);
  initVocabMastery(weekVocab);
}, [initialized]);

// 5. Show mission menu (NO auto-start)
// User selects mission → Load first turn
```

### **FreeTalkTab Startup**
```javascript
// 1-4. Same as above

// 5. Generate AI greeting (fresh, not hardcoded)
const greeting = await novaEngineRef.current.sendToNova({
  mode: 'freetalk',
  userMessage: '[SYSTEM: Start conversation]',
  chatHistory: [],
  weekId: 2
});
addMessage('freetalk', { role: 'assistant', content: greeting.ai_response });

// 6. Show FREE TALK MENU (Play / Roleplay / Chat / Ask / Translate)
```

---

## 📊 DEBUG LOGGING

### **Key Console Outputs**
```javascript
// Startup
🧠 NovaEngine initialized for Week 2, Student: Alex
🔍 StoryMissionTab Mounted - Week from URL: { currentWeek: 'week-2', pathname: ... }

// Interaction
🎯 NovaEngine.sendToNova() called: { mode: 'story', turnCount: 2, weekId: 2 }
📦 Game content loaded: { weekId: 2, gameId: 'word_chain', hasVocab: true }
🚫 Response guard: Banned phrase detected: /what do you think/

// Cache
🗑️ Clearing AI Tutor cache for fresh session
🔄 Clearing FreeTalk messages for fresh conversation

// Voice
🎙️ Trying Piper TTS (localhost:8000)...
✅ Piper TTS success
⚠️ Piper TTS failed, falling back to Web Speech
```

---

## 🔧 CONFIGURATION FILES

### **gameAdaptation.js**
```javascript
GAME_TEMPLATES = {
  1: { vocab: ['school', 'teacher', ...], games: { word_chain: {...}, 20q: {...} } },
  2: { vocab: ['friend', 'classroom', ...], games: {...} },
  // ... per-week config
}
```

### **tutorModes.js**
```javascript
TUTOR_MODES = {
  story: { name: 'Story Mission', icon: 'BookOpen', ... },
  freetalk: { name: 'Free Talk', icon: 'MessageCircle', ... },
  // ...
}
```

### **freeTalkConfig.js**
```javascript
FREE_TALK_ACTIONS = [
  { id: 'play_game', label: 'Play Game 🎮', emoji: '🎮' },
  { id: 'roleplay', label: 'Roleplay 🎭', emoji: '🎭' },
  { id: 'chat', label: 'Chat 💬', emoji: '💬' },
  { id: 'ask_any', label: 'Ask Question 🙋', emoji: '🙋' },
  { id: 'translation', label: 'Translate 🌐', emoji: '🌐' }
]
```

---

## 🎨 UI COMPONENTS

### **ChatBubble.jsx**
```jsx
// Render single message with auto-play TTS
<ChatBubble 
  message={{ role: 'assistant', content: "Hello!" }}
  autoPlay={true}
/>
```

### **InputBar.jsx**
```jsx
// Text input + send button
<InputBar 
  onSend={(text) => handleUserMessage(text)}
  placeholder="Type your answer..."
/>
```

### **HintChips.jsx**
```jsx
// Display hint options as clickable chips
<HintChips 
  hints={['teacher', 'classroom', 'school']}
  onSelectHint={(hint) => sendMessage(hint)}
/>
```

---

## ✅ KEY FEATURES SUMMARY

| Feature | Status | Details |
|---------|--------|---------|
| **Story Missions** | ✅ | Objective-driven, turn-limited, vocab-focused |
| **Free Talk** | ✅ | Games + roleplay + casual chat |
| **Games** | ✅ | Word Chain, 20Q, Sentence Builder |
| **Roleplay** | ✅ | Dynamic scenarios from week data |
| **Pronunciation** | ✅ | Real-time phonetic feedback |
| **Quiz** | ✅ | Vocabulary comprehension |
| **Debate** | ✅ | Unlocks Week 20+ |
| **Multi-AI Fallback** | ✅ | **Cerebras** → Gemini → Groq → Together AI |
| **TTS** | ✅ | Google Cloud TTS → OpenAI TTS → Web Speech |
| **Vocab Mastery** | ✅ | Auto-detect usage, track mastery |
| **Learner Profiling** | ✅ | Detect style, struggles, adapt |
| **Grammar Guard** | ✅ | A0-A1 compliance, banned phrases |
| **Talk Ratio** | ✅ | AI 40%, Student 60% |
| **Progress Persistence** | ✅ | useStationProgress hook |
| **Cache Management** | ✅ | Auto-clear on open/tab-switch |
| **Rate Limiting** | ✅ | Groq rate limiter (25 req/min, exponential backoff) |
| **Contextual Fallback** | ✅ | Mission-aware responses on network failure |

---

## 🔍 NEXT STEPS FOR DEVELOPMENT

1. **Mobile Responsiveness** - TutorWindow at 50vw breaks on small screens
2. **Offline Mode** - Use local model fallback when all APIs unavailable
3. **Analytics** - Log interactions for learning analytics dashboard
4. **Image Generation** - Integrate image prompts for visual learning
5. **Advanced Profiling** - Spaced repetition for vocab review
6. **Gamification** - Points, badges, leaderboards

---

**Last Updated:** Jan 30, 2026 | **Version:** Nova Engine v1.0
