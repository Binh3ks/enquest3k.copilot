# KẾ HOẠCH REBUILD STORY MISSION - CHI TIẾT CỤ THỂ

## 🎯 OVERVIEW

**Thời gian**: 3 giờ  
**Files mới**: 6 files  
**Files sửa**: 2 files  
**Lines of code**: ~800 lines  

---

## 📂 STEP 1: TẠO MISSION SCHEMA (30 phút)

### File 1: `src/data/missions/missionSchema.js`

**Mục đích**: Define cấu trúc chuẩn cho tất cả missions

**Code**:
```javascript
/**
 * Mission Schema - Standard structure for all Story Missions
 */

export const MissionStep = {
  stepId: 0,           // Số thứ tự step
  aiPrompt: "",        // Câu AI sẽ nói (có thể có {{placeholders}})
  expected: {          // Loại câu trả lời mong đợi
    type: "short_answer" | "yes_no" | "choice" | "number",
    validation: null   // Optional regex/function để validate
  },
  hints: [],          // Mảng từ gợi ý
  repair: ""          // Câu scaffold nếu student bí
};

export const Mission = {
  id: "",             // VD: "W1_FIRST_DAY"
  weekId: 1,
  title: "",          // VD: "First Day at School"
  description: "",    // VD: "Learn to introduce yourself"
  level: "easy",      // easy | normal | challenge
  
  targetVocabulary: [
    {
      word: "",       // VD: "student"
      mustUse: true,  // Bắt buộc phải dùng?
      phonetic: "",   // VD: "/ˈstuːdənt/"
      definition: ""  // VD: "A person who studies"
    }
  ],
  
  successCriteria: {
    minTurns: 6,                    // Tối thiểu bao nhiêu turns
    mustUseWords: [],               // Danh sách từ BẮT BUỘC
    optionalBonus: [],              // Từ bonus (không bắt buộc)
    vocabularyThreshold: 0.5        // Phải dùng 50% target vocab
  },
  
  steps: [],          // Mảng các MissionStep
  
  novaPersonality: {  // Personality riêng cho mission này
    traits: ["witty", "patient", "encouraging"],
    dadJokes: [],     // VD: ["Why did the student eat homework? Teacher said it's a piece of cake!"]
    emoji: "📚"
  }
};

/**
 * Factory function to create a mission
 */
export function createMission(config) {
  // Validation
  if (!config.id || !config.title || !config.steps || config.steps.length === 0) {
    throw new Error("Invalid mission config");
  }
  
  // Default values
  return {
    ...config,
    level: config.level || "easy",
    successCriteria: {
      minTurns: config.successCriteria?.minTurns || 6,
      mustUseWords: config.successCriteria?.mustUseWords || [],
      optionalBonus: config.successCriteria?.optionalBonus || [],
      vocabularyThreshold: config.successCriteria?.vocabularyThreshold || 0.5
    },
    novaPersonality: {
      traits: ["witty", "patient", "encouraging"],
      dadJokes: config.novaPersonality?.dadJokes || [],
      emoji: config.novaPersonality?.emoji || "📚",
      ...config.novaPersonality
    }
  };
}

/**
 * Validate a mission structure
 */
export function validateMission(mission) {
  const errors = [];
  
  if (!mission.id) errors.push("Missing mission.id");
  if (!mission.title) errors.push("Missing mission.title");
  if (!mission.steps || mission.steps.length === 0) errors.push("Mission must have steps");
  
  mission.steps.forEach((step, i) => {
    if (!step.aiPrompt) errors.push(`Step ${i}: Missing aiPrompt`);
    if (!step.hints || step.hints.length === 0) errors.push(`Step ${i}: Missing hints`);
  });
  
  if (mission.successCriteria.mustUseWords.length === 0) {
    errors.push("Mission must have at least 1 required word");
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
```

**Test**:
```javascript
// Test validation
const testMission = createMission({
  id: "TEST_1",
  title: "Test Mission",
  steps: [
    { stepId: 1, aiPrompt: "Hi!", hints: ["Hello"], repair: "Say hello" }
  ],
  successCriteria: { mustUseWords: ["test"] }
});

console.log(validateMission(testMission));
// Output: { valid: true, errors: [] }
```

---

## 📂 STEP 2: TẠO WEEK 1 MISSION DATA (30 phút)

### File 2: `src/data/missions/week1_first_day.js`

**Mục đích**: Mission cụ thể cho Week 1

**Code**:
```javascript
import { createMission } from './missionSchema';

/**
 * Week 1: First Day at School
 * Focus: Introduce yourself, talk about school basics
 * Grammar: Present Simple only
 */
export const week1FirstDay = createMission({
  id: "W1_FIRST_DAY",
  weekId: 1,
  title: "First Day at School",
  description: "Learn to introduce yourself and talk about your first day at school",
  level: "easy",
  
  targetVocabulary: [
    { word: "name", mustUse: true, phonetic: "/neɪm/", definition: "What you are called" },
    { word: "student", mustUse: true, phonetic: "/ˈstuːdənt/", definition: "A person who learns" },
    { word: "teacher", mustUse: true, phonetic: "/ˈtiːtʃər/", definition: "A person who teaches" },
    { word: "school", mustUse: true, phonetic: "/skuːl/", definition: "A place to learn" },
    { word: "age", mustUse: false, phonetic: "/eɪdʒ/", definition: "How old you are" },
    { word: "class", mustUse: false, phonetic: "/klæs/", definition: "A group of students" },
    { word: "friend", mustUse: false, phonetic: "/frend/", definition: "Someone you like" }
  ],
  
  successCriteria: {
    minTurns: 6,
    mustUseWords: ["name", "student", "teacher", "school"],
    optionalBonus: ["age", "class", "friend"],
    vocabularyThreshold: 0.5
  },
  
  steps: [
    {
      stepId: 1,
      aiPrompt: "Hey there! 👋 Welcome to your first day! I'm Ms. Nova, and I'm going to be your learning buddy. You know what? First days are like opening a new book - exciting and a tiny bit scary! But don't worry, we'll make it fun. So... what should I call you?",
      expected: { type: "short_answer" },
      hints: ["My", "name", "is"],
      repair: "Try saying: My name is _____"
    },
    {
      stepId: 2,
      aiPrompt: "{{name}}! What a cool name! You know, I once had a student named {{name}} who became amazing at English. I bet you'll be just as awesome! 🌟 Now, here's a fun question - how many candles were on your last birthday cake?",
      expected: { type: "number" },
      hints: ["I", "am", "years", "old"],
      repair: "Say: I am ___ years old"
    },
    {
      stepId: 3,
      aiPrompt: "{{age}} years old? That's THE perfect age for learning! Did you know that at {{age}}, your brain is like a super sponge? 🧽 It absorbs languages super fast! Speaking of learning, who's your teacher at school? What's their name?",
      expected: { type: "short_answer" },
      hints: ["My", "teacher", "is", "Mr", "Ms"],
      repair: "Try: My teacher is Mr./Ms. _____"
    },
    {
      stepId: 4,
      aiPrompt: "Ooh, {{teacherName}}! They sound important! You know what they say: 'A good teacher is like a candle – they light the way for others.' 🕯️ (Cheesy, I know! But true!) So, {{name}}, what's your favorite thing to learn about? Is it math, science, reading, or something else?",
      expected: { type: "short_answer" },
      hints: ["My", "favorite", "subject", "is"],
      repair: "Say: My favorite subject is _____"
    },
    {
      stepId: 5,
      aiPrompt: "{{subject}}! Now that's what I'm talking about! {{subject}} is super cool! 🎯 You know what? People who love {{subject}} usually become really interesting adults. They're like detectives, always curious! Now, here's something I'm curious about - do you have friends in your class?",
      expected: { type: "yes_no" },
      hints: ["Yes", "I", "have", "friends"],
      repair: "Answer: Yes, I have friends OR No, I don't have friends yet"
    },
    {
      stepId: 6,
      aiPrompt: "That's wonderful! {{friendsResponse}}! You know, making friends is one of the BEST parts of school! Friends make everything more fun - even homework! 😄 Tell me, {{name}}, what do you like most about your school? The playground? The library? The cafeteria food? (Just kidding about that last one! 🍕)",
      expected: { type: "short_answer" },
      hints: ["I", "like", "the"],
      repair: "Try: I like the _____ at my school"
    }
  ],
  
  novaPersonality: {
    traits: ["witty", "encouraging", "uses_emojis"],
    dadJokes: [
      "Why did the student eat their homework? Because the teacher said it was a piece of cake! 🍰",
      "What's a teacher's favorite nation? Expla-nation! 😄",
      "Why don't students trust stairs? They're always up to something! 🪜"
    ],
    emoji: "🎒"
  }
});

// Export for easy access
export default week1FirstDay;
```

**Test Data**:
```javascript
console.log("Mission:", week1FirstDay.title);
console.log("Steps:", week1FirstDay.steps.length);
console.log("Required words:", week1FirstDay.successCriteria.mustUseWords);
// Output:
// Mission: First Day at School
// Steps: 6
// Required words: ["name", "student", "teacher", "school"]
```

---

## 📂 STEP 3: TẠO STORY MISSION ENGINE (60 phút)

### File 3: `src/services/aiTutor/storyMissionEngine.js`

**Mục đích**: Core engine xử lý logic của Story Mission

**Code**:
```javascript
import { buildNovaPrompt } from './novaPromptBuilder';
import { routeAI } from './providerRouter';
import { parseResponse } from './tutorSchemas';

/**
 * Story Mission Engine
 * Manages state and conversation flow for Story Missions
 */
export class StoryMissionEngine {
  constructor(mission, weekData) {
    this.mission = mission;
    this.weekData = weekData;
    
    // State management
    this.state = {
      currentStep: 0,                    // Current step index (0-based)
      turnsCompleted: 0,                 // Total turns
      vocabularyUsed: new Set(),         // Words student has used
      scaffoldLevel: 1,                  // 1=hints, 2=sentence starters, 3=full sentence
      studentContext: {                  // Remember student info
        name: null,
        age: null,
        teacherName: null,
        subject: null,
        hasFriends: null
      },
      conversationHistory: []            // Full chat history
    };
  }

  /**
   * Start the mission - generate opening
   */
  async start() {
    const step = this.mission.steps[0];
    
    // Build prompt for opening
    const prompt = buildNovaPrompt({
      mission: this.mission,
      step,
      state: this.state,
      userInput: "",
      isOpening: true
    });
    
    // Call AI
    const rawResponse = await routeAI(prompt, 'story_mission');
    const response = parseResponse(rawResponse.text, 'story_mission');
    
    // Save to history
    this.state.conversationHistory.push({
      role: 'assistant',
      content: `${response.story_beat} ${response.task}`
    });
    
    return {
      story_beat: response.story_beat || step.aiPrompt,
      task: response.task || "What is your name?",
      scaffold: response.scaffold || { hints: step.hints }
    };
  }

  /**
   * Generate next turn based on user input
   */
  async generateTurn(userInput) {
    // 1. Extract context from user input
    this._extractContext(userInput);
    
    // 2. Track vocabulary usage
    this._trackVocabulary(userInput);
    
    // 3. Increment state
    this.state.turnsCompleted++;
    this.state.currentStep = Math.min(
      this.state.currentStep + 1,
      this.mission.steps.length - 1
    );
    
    // 4. Get current step
    const step = this.mission.steps[this.state.currentStep];
    
    // 5. Check if need scaffolding
    const needsScaffold = this._shouldScaffold(userInput);
    if (needsScaffold) {
      this.state.scaffoldLevel = Math.min(this.state.scaffoldLevel + 1, 3);
    }
    
    // 6. Build prompt
    const prompt = buildNovaPrompt({
      mission: this.mission,
      step,
      state: this.state,
      userInput,
      isOpening: false
    });
    
    // 7. Call AI
    console.log('[StoryMissionEngine] Calling AI with prompt...');
    const rawResponse = await routeAI(prompt, 'story_mission');
    const response = parseResponse(rawResponse.text, 'story_mission');
    
    // 8. Save to history
    this.state.conversationHistory.push(
      { role: 'user', content: userInput },
      { role: 'assistant', content: `${response.story_beat} ${response.task}` }
    );
    
    // 9. Return structured response
    return {
      story_beat: response.story_beat,
      task: response.task,
      scaffold: response.scaffold || { hints: step.hints },
      feedback: response.feedback || null,
      isComplete: this.isComplete()
    };
  }

  /**
   * Extract context from user input (name, age, etc.)
   */
  _extractContext(input) {
    const lower = input.toLowerCase();
    
    // Extract name (first user input)
    if (!this.state.studentContext.name && this.state.turnsCompleted === 0) {
      const nameMatch = lower.match(/(?:my name is|i am|i'm|call me)\s+([a-z]+)/i);
      if (nameMatch) {
        this.state.studentContext.name = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
      } else {
        // Maybe just the name alone
        const words = input.trim().split(/\s+/);
        if (words.length === 1 && words[0].length > 2) {
          this.state.studentContext.name = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        }
      }
    }
    
    // Extract age
    const ageMatch = lower.match(/\b(\d+)\b/);
    if (ageMatch && !this.state.studentContext.age) {
      this.state.studentContext.age = ageMatch[1];
    }
    
    // Extract teacher name
    if (lower.includes('teacher')) {
      const teacherMatch = lower.match(/(?:teacher is|teacher's name is)\s+([a-z\s.]+)/i);
      if (teacherMatch) {
        this.state.studentContext.teacherName = teacherMatch[1].trim();
      }
    }
    
    // Extract subject
    const subjects = ['math', 'science', 'english', 'reading', 'art', 'music', 'pe', 'history'];
    subjects.forEach(subj => {
      if (lower.includes(subj) && !this.state.studentContext.subject) {
        this.state.studentContext.subject = subj.charAt(0).toUpperCase() + subj.slice(1);
      }
    });
    
    // Friends yes/no
    if (lower.includes('yes') || lower.includes('have friends')) {
      this.state.studentContext.hasFriends = true;
    } else if (lower.includes('no') || lower.includes('don\'t have')) {
      this.state.studentContext.hasFriends = false;
    }
  }

  /**
   * Track vocabulary usage
   */
  _trackVocabulary(input) {
    const lower = input.toLowerCase();
    
    this.mission.targetVocabulary.forEach(vocabItem => {
      if (lower.includes(vocabItem.word.toLowerCase())) {
        this.state.vocabularyUsed.add(vocabItem.word);
      }
    });
  }

  /**
   * Check if student needs scaffolding
   */
  _shouldScaffold(input) {
    const words = input.trim().split(/\s+/);
    
    // Too short answer
    if (words.length < 2) return true;
    
    // Generic answers
    const generic = ['yes', 'no', 'ok', 'maybe', 'i don\'t know'];
    if (generic.includes(input.toLowerCase().trim())) return true;
    
    return false;
  }

  /**
   * Check if mission is complete
   */
  isComplete() {
    // Check min turns
    if (this.state.turnsCompleted < this.mission.successCriteria.minTurns) {
      return false;
    }
    
    // Check required words
    const requiredWords = this.mission.successCriteria.mustUseWords;
    const allUsed = requiredWords.every(word => 
      this.state.vocabularyUsed.has(word)
    );
    
    return allUsed;
  }

  /**
   * Get completion summary
   */
  getSummary() {
    const requiredUsed = this.mission.successCriteria.mustUseWords.filter(w =>
      this.state.vocabularyUsed.has(w)
    );
    const bonusUsed = this.mission.successCriteria.optionalBonus.filter(w =>
      this.state.vocabularyUsed.has(w)
    );
    
    return {
      turnsCompleted: this.state.turnsCompleted,
      vocabularyUsed: Array.from(this.state.vocabularyUsed),
      requiredWordsUsed: requiredUsed,
      bonusWordsUsed: bonusUsed,
      completionRate: (requiredUsed.length / this.mission.successCriteria.mustUseWords.length) * 100,
      scaffoldLevelReached: this.state.scaffoldLevel
    };
  }

  /**
   * Reset mission state
   */
  reset() {
    this.state = {
      currentStep: 0,
      turnsCompleted: 0,
      vocabularyUsed: new Set(),
      scaffoldLevel: 1,
      studentContext: {
        name: null,
        age: null,
        teacherName: null,
        subject: null,
        hasFriends: null
      },
      conversationHistory: []
    };
  }
}
```

---

## 📂 STEP 4: TẠO NOVA PROMPT BUILDER (45 phút)

### File 4: `src/services/aiTutor/novaPromptBuilder.js`

**Mục đích**: Build prompts với Ms. Nova personality

**Code**:
```javascript
/**
 * Nova Prompt Builder
 * Builds personality-rich prompts for Ms. Nova
 */

/**
 * Build Ms. Nova prompt for Story Mission
 */
export function buildNovaPrompt({ mission, step, state, userInput, isOpening }) {
  const systemPrompt = buildNovaSystem(mission);
  const contextPrompt = buildContextPrompt(state);
  const turnPrompt = isOpening 
    ? buildOpeningPrompt(mission, step)
    : buildTurnPrompt(mission, step, state, userInput);
  
  return `${systemPrompt}\n\n${contextPrompt}\n\n${turnPrompt}`;
}

/**
 * Build system prompt with Nova personality
 */
function buildNovaSystem(mission) {
  const personality = mission.novaPersonality;
  
  return `You are Ms. Nova ${personality.emoji}, a witty, patient, and SUPER encouraging ESL tutor for children.

YOUR PERSONALITY:
- Witty: Use dad jokes, puns, and playful humor
- Patient: NEVER say "wrong" or "incorrect" - always recast gently
- Smart: Connect English learning to real-world knowledge
- Natural: Use "gonna", "wanna", "cool", "gotcha", emojis occasionally
- Warm: Like a favorite aunt/uncle - fun but caring

YOUR TEACHING STYLE (CLIL approach):
- Connection BEFORE correction (build rapport first)
- Recast technique: Repeat their sentence correctly in your reply
- Scaffold: Give hints, not answers
- Keep responses SHORT (max 40 words usually)
- ALWAYS end with 1 question to continue conversation

GRAMMAR RULES FOR THIS MISSION:
- Use ONLY Present Simple (I am, you are, he/she is, we/they are)
- NO past tense (was/were/did)
- NO future (will/going to)
- NO complex structures

TARGET VOCABULARY (encourage usage):
${mission.targetVocabulary.map(v => `- ${v.word}: ${v.definition}`).join('\n')}

CRITICAL: Your goal is to get the student to SPEAK/WRITE as much as possible.
You speak less, they speak more.`;
}

/**
 * Build context about current state
 */
function buildContextPrompt(state) {
  const ctx = state.studentContext;
  const vocabUsed = Array.from(state.vocabularyUsed);
  
  let contextInfo = `CURRENT STATE:
- Turn: ${state.turnsCompleted + 1}
- Student's name: ${ctx.name || 'Unknown yet'}
- Words they've used: ${vocabUsed.length > 0 ? vocabUsed.join(', ') : 'None yet'}`;
  
  if (ctx.age) contextInfo += `\n- Age: ${ctx.age}`;
  if (ctx.teacherName) contextInfo += `\n- Teacher: ${ctx.teacherName}`;
  if (ctx.subject) contextInfo += `\n- Favorite subject: ${ctx.subject}`;
  
  return contextInfo;
}

/**
 * Build opening prompt (Turn 1)
 */
function buildOpeningPrompt(mission, step) {
  const dadJoke = mission.novaPersonality.dadJokes[0] || "";
  
  return `OPENING TURN:
This is the FIRST interaction. Greet warmly and ask the first question.

Mission: ${mission.title}
Step goal: ${step.aiPrompt}

Your opening should:
1. Greet warmly (use emoji ${mission.novaPersonality.emoji})
2. Introduce yourself as Ms. Nova
3. Maybe a tiny dad joke if appropriate: "${dadJoke}"
4. Ask ONE question: What is their name?

Return JSON:
{
  "story_beat": "Warm greeting + introduction (1-2 sentences)",
  "task": "What is your name?",
  "scaffold": {
    "hints": ${JSON.stringify(step.hints)}
  }
}

Example:
{
  "story_beat": "Hey there! 👋 I'm Ms. Nova, your learning buddy!",
  "task": "What should I call you?",
  "scaffold": {
    "hints": ["My", "name", "is"]
  }
}`;
}

/**
 * Build turn prompt (Turn 2+)
 */
function buildTurnPrompt(mission, step, state, userInput) {
  const ctx = state.studentContext;
  
  // Replace placeholders in step.aiPrompt
  let targetPrompt = step.aiPrompt;
  targetPrompt = targetPrompt.replace(/\{\{name\}\}/g, ctx.name || 'friend');
  targetPrompt = targetPrompt.replace(/\{\{age\}\}/g, ctx.age || '');
  targetPrompt = targetPrompt.replace(/\{\{teacherName\}\}/g, ctx.teacherName || 'your teacher');
  targetPrompt = targetPrompt.replace(/\{\{subject\}\}/g, ctx.subject || 'that subject');
  
  return `CONVERSATION TURN ${state.turnsCompleted + 1}:
  
Student just said: "${userInput}"

Step goal: ${targetPrompt}

YOUR RESPONSE STRUCTURE (The Nova Way):
1. RECAST (if they made error): Repeat their sentence correctly
   Example: Student says "I have 9 age" → You say "Oh, you're 9 years old!"
   
2. ACKNOWLEDGE specifically: Use their actual words/name
   Example: "{{name}}, that's a cool name!" or "{{age}}? Perfect age!"
   
3. ENCOURAGE warmly: Build confidence
   Example: "You're doing great!" or "I love how you said that!"
   
4. ASK next question: Move conversation forward
   Use the step goal above as inspiration, but make it natural

5. PROVIDE HINTS: Help them answer YOUR question

Return JSON:
{
  "story_beat": "Recast + Acknowledge + Encourage (2-3 sentences max)",
  "task": "Your question (1 question only)",
  "scaffold": {
    "hints": ${JSON.stringify(step.hints)}
  }
}

CRITICAL RULES:
- If student answer is short ("yes", "ok"), ask "Tell me more!" or "Why?"
- If student made grammar error, FIX IT naturally in your story_beat (recast)
- Use their name (${ctx.name}) frequently - personal connection!
- Keep total response under 40 words
- ALWAYS include scaffold hints for YOUR question`;
}

/**
 * Helper: Check if response needs scaffolding
 */
export function shouldIncreaseScaffold(userInput) {
  const words = userInput.trim().split(/\s+/);
  
  // Too short
  if (words.length < 2) return true;
  
  // Generic
  const generic = ['yes', 'no', 'ok', 'idk', 'maybe'];
  if (generic.includes(userInput.toLowerCase().trim())) return true;
  
  return false;
}
```

---

## 📂 STEP 5: UPDATE UI COMPONENT (30 phút)

### File 5: `src/modules/ai_tutor/tabs/StoryMissionTab_NEW.jsx`

**Mục đích**: UI component mới sử dụng StoryMissionEngine

**Key Changes**:
```javascript
import { StoryMissionEngine } from '../../../services/aiTutor/storyMissionEngine';
import week1FirstDay from '../../../data/missions/week1_first_day';

// Initialize engine
const [engine] = useState(() => new StoryMissionEngine(week1FirstDay, weekData));

// Start mission
const handleStartMission = async () => {
  try {
    const opening = await engine.start();
    
    addMessage({ role: 'ai', text: opening.story_beat });
    addMessage({ role: 'ai', text: opening.task });
    setCurrentHints(opening.scaffold.hints);
    
    speakText(`${opening.story_beat} ${opening.task}`);
  } catch (error) {
    console.error('Failed to start mission:', error);
  }
};

// Handle user input
const handleSubmit = async () => {
  if (!input.trim()) return;
  
  const userText = input.trim();
  addMessage({ role: 'user', text: userText });
  setInput('');
  setLoading(true);
  
  try {
    const response = await engine.generateTurn(userText);
    
    // Show AI response (with recast built-in)
    if (response.story_beat) {
      addMessage({ role: 'ai', text: response.story_beat });
    }
    if (response.task) {
      addMessage({ role: 'ai', text: response.task });
    }
    
    // Update hints
    setCurrentHints(response.scaffold?.hints || []);
    
    // Speak
    speakText(`${response.story_beat} ${response.task}`);
    
    // Check completion
    if (response.isComplete) {
      const summary = engine.getSummary();
      showCompletionScreen(summary);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoading(false);
  }
};
```

---

## 🧪 STEP 6: TESTING PLAN (15 phút)

### Test Cases:

**Test 1: Happy Path**
```
1. Start mission
2. Student: "My name is Binh"
3. AI: "Nice to meet you, Binh! ... How old are you?"
4. Student: "I am 9 years old"
5. AI: "9 years old! Perfect! ... Who is your teacher?"
6. Continue until completion
```

**Test 2: Error Handling**
```
Student: "I have 9 age" (WRONG)
Expected: AI recasts to "Oh, you're 9 years old!" 
```

**Test 3: Short Answers**
```
Student: "yes"
Expected: AI asks "Tell me more! Why?"
Scaffold level increases
```

**Test 4: Vocabulary Tracking**
```
Check: vocabularyUsed Set tracks correctly
Check: Completion triggers when mustUseWords all used
```

---

## 📅 TIMELINE CHI TIẾT

### **Hour 1** (9:00-10:00)
- ✅ Create missionSchema.js (20 min)
- ✅ Create week1_first_day.js (30 min)
- ✅ Test data structure (10 min)

### **Hour 2** (10:00-11:00)
- ✅ Create storyMissionEngine.js (60 min)
  - Constructor & state (15 min)
  - start() method (15 min)
  - generateTurn() method (20 min)
  - Helper methods (10 min)

### **Hour 3** (11:00-12:00)
- ✅ Create novaPromptBuilder.js (45 min)
  - System prompt (15 min)
  - Opening prompt (15 min)
  - Turn prompt (15 min)
- ✅ Update StoryMissionTab.jsx (30 min)
- ✅ Test basic flow (15 min)

---

## ✅ CHECKLIST HOÀN THÀNH

```
□ Step 1: missionSchema.js created & tested
□ Step 2: week1_first_day.js created with 6 steps
□ Step 3: storyMissionEngine.js working
  □ start() returns opening with hints
  □ generateTurn() processes user input
  □ Context extraction working
  □ Vocabulary tracking working
  □ Completion detection working
□ Step 4: novaPromptBuilder.js personality working
  □ System prompt has Nova personality
  □ Recast technique in prompts
  □ Context awareness working
□ Step 5: UI updated to use engine
  □ handleStartMission calls engine.start()
  □ handleSubmit calls engine.generateTurn()
  □ Hints display from response
  □ Completion screen shows summary
□ Step 6: Testing completed
  □ Happy path works
  □ Error recast works
  □ Scaffolding increases
  □ Vocabulary tracked
```

---

## 🚀 NEXT STEPS SAU KHI XONG

1. **Backup old code**
```bash
mv src/modules/ai_tutor/tabs/StoryMissionTab.jsx StoryMissionTab_OLD.jsx
mv src/modules/ai_tutor/tabs/StoryMissionTab_NEW.jsx StoryMissionTab.jsx
```

2. **Test trong browser**
3. **Fix bugs nếu có**
4. **Tạo script generate missions cho Week 2-20**

---

**Bạn sẵn sàng bắt đầu chưa? Tôi sẽ tạo từng file theo đúng thứ tự này!** 🚀
