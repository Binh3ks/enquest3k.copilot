# PHẢN BIỆN: AI TUTOR / STORY MISSION - Tình Trạng Hiện Tại vs Vision

## 📋 TÓM TẮT VẤN ĐỀ

**Hiện trạng**: Code hiện tại HOÀN TOÀN SAI HƯỚNG so với vision trong Artifact.

**Root Cause**: Tôi đã cố gắng "patch" code cũ thay vì rebuild theo chiến lược đúng.

---

## 🎯 VISION TRONG ARTIFACT (Điều Bạn Muốn)

### 1. **Ms. Nova - Academic Mentor**
- ✅ Có personality: Witty, Patient, Smart
- ✅ Giọng điệu tự nhiên: "gonna", "gotcha", emojis
- ✅ CLIL approach: Dạy English qua Math/Science/Social Studies
- ✅ Connection before Correction
- ✅ Recast technique - sửa lỗi một cách tự nhiên

### 2. **Story Mission Structure**
```json
{
  "id": "W1_NW_STUDENT_TEACHER_01",
  "title": "First day at school",
  "level": "easy",
  "targetVocabulary": [
    {"word": "student", "mustUse": true},
    {"word": "teacher", "mustUse": true}
  ],
  "successCriteria": {
    "minTurns": 6,
    "mustUseWords": ["student", "teacher", "school", "name"]
  },
  "steps": [
    {
      "stepId": 1,
      "aiPrompt": "Hi! I am your teacher. What is your name?",
      "expected": {"type": "short_answer", "hints": ["My name is ..."]},
      "repair": {"ifEmpty": "Say: My name is ____."}
    }
  ]
}
```

### 3. **Pedagogical Rules**
- **Flow over Accuracy**: Duy trì hội thoại > Sửa lỗi ngay lập tức
- **Scaffolding**: Gợi ý thay vì đưa đáp án
- **Sandwich Feedback**: Khen → Sửa → Khích lệ
- **Academic Recast**: Sửa lỗi trong reply tự nhiên

---

## ❌ HIỆN TRẠNG CODE (Điều Tôi Đã Làm SAI)

### 1. **Không có Personality System**
```javascript
// WRONG: Generic greeting
"Hello! Welcome to your first day at school!"

// RIGHT (theo Artifact):
"Hey there! 👋 I'm Ms. Nova, your learning buddy! 
What should I call you? (I promise I won't forget your name!)"
```

### 2. **Hardcoded Prompts → AI-Generated**
- ❌ Ban đầu: 10 turns hardcoded
- ❌ Tôi fix: AI tự generate nhưng KHÔNG có structure
- ✅ Cần: AI generate TRONG FRAMEWORK của steps với expected/hints/repair

### 3. **Không có Success Criteria Tracking**
```javascript
// MISSING:
- mustUseWords tracking
- Turn completion tracking
- Vocabulary mastery scoring
- Gentle scaffolding when student stuck
```

### 4. **Feedback System SAI**
```javascript
// WRONG: Show feedback trước AI response
if (response.feedback.correction) {
  addMessage({ role: 'system', text: `💡 Tip: ${feedbackMsg}` });
}

// RIGHT: Recast trong chính câu trả lời
// Student: "I have 9 age"
// Nova: "Oh, you're 9 years old! That's awesome! 
// Are you the youngest or oldest in your class?"
```

### 5. **Không có Opening Question**
- ❌ Turn 1 chỉ có greeting, không có question
- ❌ Không có hints cho Turn 1
- ✅ Cần: Greeting + Question + Hints ngay từ đầu

---

## 🔍 PHÂN TÍCH SÂU

### Vấn đề 1: **Architecture Mismatch**

**Current**: 
```
StoryMissionTab → runStoryMission() → AI raw generation
```

**Should be**:
```
StoryMissionTab → StoryMissionEngine → 
  ↓
  1. Load mission JSON (với steps/vocabulary/criteria)
  2. Build turn-aware prompt với personality
  3. Call AI với constraints
  4. Parse response theo expected format
  5. Track progress vs successCriteria
  6. Apply scaffolding if needed
```

### Vấn đề 2: **Prompt Engineering Wrong**

**Current Prompt**:
```
"You are Ms. Sarah continuing First Day at School.
Your turn:
1. CHECK grammar errors
2. ACKNOWLEDGE
3. ASK follow-up"
```

**Missing**:
- ❌ Ms. Nova personality (witty/patient)
- ❌ Dad jokes về subject matter
- ❌ Recast technique instructions
- ❌ Phase-aware language (A1 for Phase 1)
- ❌ CLIL context (teaching English through content)

**Should be**:
```
"You are Ms. Nova, the cool teacher everyone loves.
Personality: Witty (use dad jokes), Patient (never say 'wrong'), Smart (connect to real life).
Mission: Get student to use: student, teacher, school, name.
Current turn: 2/6.
Student just said: 'I have 9 age'.

Recast technique:
1. Repeat correctly: 'Oh, you're 9 years old!'
2. Connect: 'That's my favorite age! Old enough to be curious...'
3. Ask: 'Are you excited about meeting your teacher?'

CRITICAL: Use A1 vocabulary. End with 1 question. Include hints."
```

### Vấn đề 3: **No Mission State Management**

Missing:
```javascript
{
  missionId: "W1_FIRST_DAY",
  currentStep: 2,
  steps: [...],
  vocabularyUsed: ["name", "student"],
  vocabularyRequired: ["student", "teacher", "school", "name"],
  turnsCompleted: 2,
  minTurns: 6,
  scaffoldingLevel: 1, // 1=hints, 2=sentence starters, 3=full sentence
  isComplete: false
}
```

---

## 💡 ĐỀ XUẤT GIẢI PHÁP

### Option 1: **PATCH Current Code** (❌ KHÔNG NÊN)

**Pros:**
- Nhanh hơn

**Cons:**
- Architecture sai từ gốc
- Phải patch thêm 10 lần nữa
- Không scale cho 156 weeks
- Không theo đúng vision Artifact

### Option 2: **REBUILD FROM SCRATCH** (✅ NÊN LÀM)

**Pros:**
- Đúng architecture từ đầu
- Follow Artifact 100%
- Scale tốt cho 156 weeks
- Maintainable

**Cons:**
- Mất 2-3 giờ
- Phải test lại từ đầu

**Tôi recommend Option 2.**

---

## 📐 KẾ HOẠCH TRIỂN KHAI (REBUILD)

### Phase 1: **Core Engine** (1h)

1. **Create Mission Schema**
```javascript
// src/data/missions/missionSchema.js
export const createMission = (config) => ({
  id: config.id,
  title: config.title,
  level: config.level, // easy | normal | challenge
  targetVocabulary: config.vocab,
  successCriteria: config.criteria,
  steps: config.steps
});
```

2. **Create StoryMissionEngine**
```javascript
// src/services/aiTutor/storyMissionEngine.js
class StoryMissionEngine {
  constructor(mission, weekData) {
    this.mission = mission;
    this.state = {
      currentStep: 0,
      vocabUsed: [],
      turnsCompleted: 0,
      scaffoldLevel: 1
    };
  }

  async generateTurn(userInput) {
    // 1. Track vocabulary
    // 2. Build persona-aware prompt
    // 3. Call AI with constraints
    // 4. Parse response
    // 5. Update state
    // 6. Check completion
  }
}
```

3. **Update tutorPrompts.js**
```javascript
function buildNovaPrompt(mission, state, userInput) {
  return `You are Ms. Nova, a witty and patient ESL tutor.

Personality:
- Use dad jokes about ${mission.title}
- Natural language (gonna, wanna, cool, gotcha)
- Emojis occasionally
- Connect to real life

Current Mission: ${mission.title}
Step ${state.currentStep + 1}/${mission.steps.length}
Target Vocabulary: ${mission.targetVocabulary.map(v => v.word).join(', ')}

Student said: "${userInput}"

Your Response Rules:
1. If grammar error: Recast naturally (don't say "wrong")
2. Acknowledge specifically
3. Ask 1 follow-up question
4. Include hints for next answer

Return JSON:
{
  "story_beat": "Recast + acknowledgment + encouragement",
  "task": "Your question",
  "scaffold": {
    "hints": ["word", "list"]
  }
}`;
}
```

### Phase 2: **Mission Data** (30m)

4. **Create Week 1 Mission JSON**
```javascript
// src/data/missions/week1_first_day.js
export const week1FirstDay = createMission({
  id: "W1_FIRST_DAY",
  title: "First Day at School",
  level: "easy",
  vocab: [
    { word: "student", mustUse: true },
    { word: "teacher", mustUse: true },
    { word: "school", mustUse: true },
    { word: "name", mustUse: true }
  ],
  criteria: {
    minTurns: 6,
    mustUseWords: ["student", "teacher", "school", "name"]
  },
  steps: [
    {
      stepId: 1,
      aiPrompt: "Hey there! 👋 I'm Ms. Nova. What should I call you?",
      expected: { type: "short_answer" },
      hints: ["My", "name", "is"],
      repair: "Say: My name is ____"
    },
    {
      stepId: 2,
      aiPrompt: "Nice to meet you, {{name}}! How old are you?",
      expected: { type: "number" },
      hints: ["I", "am", "years", "old"],
      repair: "Try: I am ___ years old"
    }
    // ... 4 more steps
  ]
});
```

### Phase 3: **UI Integration** (30m)

5. **Update StoryMissionTab.jsx**
```javascript
// Initialize engine with mission
const [engine] = useState(() => 
  new StoryMissionEngine(week1FirstDay, weekData)
);

// Start mission
const handleStartMission = async () => {
  const opening = await engine.start();
  addMessage({ role: 'ai', text: opening.story_beat });
  addMessage({ role: 'ai', text: opening.task });
  setCurrentHints(opening.scaffold.hints);
};

// Handle user input
const handleSubmit = async () => {
  const response = await engine.generateTurn(userText);
  
  // Show AI response (with recast built-in)
  addMessage({ role: 'ai', text: response.story_beat });
  addMessage({ role: 'ai', text: response.task });
  setCurrentHints(response.scaffold.hints);
  
  // Check completion
  if (engine.isComplete()) {
    showCompletion();
  }
};
```

### Phase 4: **Testing** (30m)

6. **Test Flow**
- ✅ Turn 1: Greeting + Question + Hints
- ✅ Recast technique working
- ✅ Vocabulary tracking
- ✅ Scaffolding increases if stuck
- ✅ Completion after minTurns + mustUseWords

---

## 📊 SO SÁNH: PATCH vs REBUILD

| Aspect | Patch Current | Rebuild |
|--------|--------------|---------|
| Time | 1h | 2-3h |
| Architecture | ❌ Still wrong | ✅ Correct |
| Follow Artifact | ❌ Partial | ✅ 100% |
| Maintainability | ❌ Low | ✅ High |
| Scalability | ❌ Hard | ✅ Easy |
| Code Quality | ❌ Messy | ✅ Clean |
| **RECOMMENDATION** | ❌ | ✅ |

---

## 🎯 KẾT LUẬN

**Quyết định**: ✅ **REBUILD FROM SCRATCH**

**Lý do**:
1. Current code không follow vision Artifact
2. Architecture sai không thể fix bằng patch
3. Mission-based system cần proper state management
4. Personality system (Ms. Nova) cần riêng engine
5. Recast technique cần built into prompt engineering

**Timeline**: 
- Core Engine: 1h
- Mission Data: 30m
- UI Integration: 30m
- Testing: 30m
- **Total: 2.5-3h**

**Next Steps**:
1. Backup current code → `StoryMissionTab_OLD.jsx`
2. Create new architecture theo plan trên
3. Test with Week 1 mission
4. Scale to 156 weeks

**Bạn có đồng ý với phân tích này không? Nếu ok, tôi sẽ bắt đầu rebuild ngay!** 🚀
