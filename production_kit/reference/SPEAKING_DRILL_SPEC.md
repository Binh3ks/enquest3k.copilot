# Speaking Drill — AI-Powered Speaking Practice (W36+)

## 1. Problem Statement

Spark Talk (W1-W35, deterministic) has fundamental limitations:
- Fixed frame sequence → student can memorize answers
- No real conversation → no adaptation to student's actual level
- Hallucination risk if we switch to free-form AI (proven failures in W31)
- Same content for all students → no personalization

**Speaking Drill** (W36+): retains Spark Talk's topic safety but adds AI adaptation — the AI chooses from curated prompts AND responds naturally to student content.

---

## 2. Design: Constrained AI (Safe Middle Ground)

**Core principle**: AI has a **curated prompt pool** and can ONLY select from it. No free generation.

### Architecture

```
Student message
    ↓
[Topic Guard] ──── Is message on-topic? ──── NO → Redirect message
    ↓ YES
[Prompt Selector] ──── Which prompt is most relevant to student's answer?
    ↓
[AI Response Engine] ──── Generate natural response using selected prompt
    ↓
[Recast + Feedback] ──── Built from selected prompt (deterministic)
    ↓
[Next Prompt Selection] ──── AI picks next best prompt from pool
```

### Safety Layers

| Layer | Mechanism | Prevents |
|-------|-----------|----------|
| Topic Guard | Keyword matching from `topic_vocab[]` | Off-topic drift |
| Prompt Pool | AI picks from 8-12 curated prompts, not free generation | Hallucination |
| Template Recast | Recast uses `student_msg.replace()` from pool | Grammar hallucination |
| Prompt Fallback | If no match → repeat current prompt with rephrase | Dead end |
| Hard Exit | After 12 turns → farewell regardless of state | Infinite loop |

---

## 3. Data Structure

```javascript
speaking_drill: {
  id: "drill_w36_conversation",
  emoji: "🎤",
  title: "Let's Talk!",
  title_vi: "Chúng Ta Nói Chuyện Nào!",

  // Topic definition
  topic: "Daily Routines and Future Plans",
  topic_vi: "Thói Quen Hàng Ngày và Kế Hoạch Tương Lai",
  topic_vocab: [
    "morning", "evening", "routine", "plan", "tomorrow", "usually", "always",
    "breakfast", "school", "homework", "sleep", "early", "late"
  ],
  topic_collocation: [
    "wake up", "get dressed", "have breakfast", "go to school",
    "do homework", "go to bed", "brush teeth", "take a shower"
  ],

  // Curated prompt pool (the ONLY source for AI questions)
  prompts: [
    {
      id: "p1",
      // When student says X → AI picks this prompt
      triggers: ["morning", "wake up", "early", "breakfast", "eat"],
      question: "That's interesting about your morning! Do you usually have breakfast at home or at school?",
      hint_en: "I usually have breakfast at home with my family.",
      level: "A2", // A2 or B1
      follow_ups: [
        "What do you usually eat for breakfast?",
        "Who do you eat breakfast with?",
        "What time do you usually wake up on school days?"
      ]
    },
    {
      id: "p2",
      triggers: ["school", "class", "teacher", "learn", "study"],
      question: "Tell me about your school! What is your favourite subject and why?",
      hint_en: "My favourite subject is Maths because I love numbers.",
      level: "A2",
      follow_ups: [
        "What do you do at break time?",
        "Who is your favourite teacher and why?",
        "What did you learn today?"
      ]
    },
    {
      id: "p3",
      triggers: ["homework", "study", "test", "exam", "prepare"],
      question: "Do you usually do your homework alone or with help?",
      hint_en: "I usually do my homework alone, but sometimes my mum helps me.",
      level: "A2",
      follow_ups: [
        "When do you usually do your homework?",
        "What is the hardest homework you have had this week?",
        "Do you like homework? Why or why not?"
      ]
    },
    {
      id: "p4",
      triggers: ["evening", "sleep", "bed", "night", "late", "tired"],
      question: "What do you usually do in the evening before you go to sleep?",
      hint_en: "Before I go to sleep, I usually read a book or watch TV.",
      level: "A2",
      follow_ups: [
        "What time do you usually go to bed?",
        "Do you sleep early or late on school days?",
        "What is your bedtime routine?"
      ]
    },
    {
      id: "p5",
      triggers: ["weekend", "saturday", "sunday", "free", "play", "game"],
      question: "What do you usually do on the weekend?",
      hint_en: "On the weekend, I usually play football with my friends.",
      level: "A2",
      follow_ups: [
        "Do you prefer Saturday or Sunday? Why?",
        "What is your favourite weekend activity?",
        "Do you ever help your family on the weekend?"
      ]
    },
    {
      id: "p6",
      triggers: ["plan", "tomorrow", "next week", "future", "want", "will"],
      question: "Do you have any plans for tomorrow?",
      hint_en: "Tomorrow I am going to visit my grandmother.",
      level: "B1",
      follow_ups: [
        "Are you excited about your plan?",
        "What about your plan for the weekend?",
        "If you could plan anything, what would you do?"
      ]
    },
    {
      id: "p7",
      triggers: ["hobby", "sport", "music", "read", "draw", "swim"],
      question: "What do you like to do in your free time?",
      hint_en: "In my free time, I like to play football and read books.",
      level: "A2",
      follow_ups: [
        "How often do you do your hobby?",
        "Who do you do your hobby with?",
        "Have you ever tried a new hobby this year?"
      ]
    },
    {
      id: "p8",
      triggers: ["friend", "family", " mum", "dad", "brother", "sister", "together"],
      question: "Who do you usually spend the most time with — your family or your friends?",
      hint_en: "I usually spend the most time with my family, especially my sister.",
      level: "A2",
      follow_ups: [
        "What do you usually do together?",
        "Who is your best friend? How did you meet?",
        "Do you prefer spending time with family or friends?"
      ]
    }
  ],

  // Opening
  opening: "Hello! I am your speaking partner today. We are going to talk about your daily life. Tell me — what did you do this morning?",

  // Exit
  farewell: "Wow, you talked so much today! Your English is getting better and better. I am so proud of you! See you next time! 🎤",
  minimum_turns: 6,
  maximum_turns: 12
}
```

---

## 4. AI Response Logic (Safe, Constrained)

### 4.1 Topic Guard

```javascript
function isOnTopic(message, drillData) {
  const msgWords = message.toLowerCase().split(/\s+/);
  const topicVocab = new Set(drillData.topic_vocab.map(w => w.toLowerCase()));
  const collocations = drillData.topic_collocation;
  const msg = message.toLowerCase();

  // Check direct word match
  const hasTopicWord = msgWords.some(w => topicVocab.has(w));
  // Check collocation match
  const hasCollocation = collocations.some(c => msg.includes(c.toLowerCase()));
  // Check for greeting/non-topical
  const isGreeting = /^(hi|hello|hey|good morning|good afternoon)/i.test(msg.trim());

  return hasTopicWord || hasCollocation || isGreeting;
}
```

### 4.2 Prompt Selector (Curated Pool)

```javascript
function selectBestPrompt(studentMessage, usedPromptIds, drillData) {
  const msg = studentMessage.toLowerCase();
  const { prompts } = drillData;

  // Score each prompt by trigger match
  const scored = prompts.map(p => {
    if (usedPromptIds.has(p.id)) return { prompt: p, score: -1 }; // skip used
    const matchCount = p.triggers.filter(t => msg.includes(t.toLowerCase())).length;
    return { prompt: p, score: matchCount };
  });

  // Sort by score (highest first), then by follow_up depth (lowest first = prefer unused)
  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.prompt || prompts[0]; // fallback to first prompt
}
```

### 4.3 Response Builder

```javascript
function buildDrillResponse(studentMessage, selectedPrompt, drillData) {
  const msg = studentMessage.trim();

  // Topic guard: if off-topic, redirect
  if (!isOnTopic(msg, drillData)) {
    return {
      content: `Let's keep talking about ${drillData.topic}! ${selectedPrompt.question} 😊`,
      promptUsed: selectedPrompt.id
    };
  }

  // Build recast from student's answer (deterministic)
  const recast = buildRecast(msg);

  // Select follow-up from current prompt (deterministic)
  const followUp = selectedPrompt.follow_ups[0]; // rotate through follow_ups

  // Build response
  const response = [
    recast,                          // Recast: "You usually wake up early!"
    selectedPrompt.question,          // Next prompt
  ].filter(Boolean).join(' ');

  return { content: response, promptUsed: selectedPrompt.id };
}
```

### 4.4 Recast (Deterministic)

Same `buildRecast` function as Spark Talk — no AI involvement.

### 4.5 Next Prompt Selection (Curated, not generated)

After each student message, AI picks the **next best prompt** from the pool based on trigger matching. This is AI-powered selection, NOT AI generation.

---

## 5. Component Design

### File Structure

```
src/modules/ai_tutor/tabs/
  SpeakingDrillTab.jsx        # Main component (replaces FreeTalkTab for W36+)

src/data/weeks/week_NN/
  week_NN_real.js            # Contains speaking_drill: { ... } section
```

### UI Layout

```
┌─────────────────────────────────────┐
│ 🎤 Let's Talk!           Turn 4/10  │
│─────────────────────────────────────│
│  Student: I usually wake up at 6.   │
│  AI: You wake up early! That's     │
│  interesting! Tell me about your    │
│  morning routine. 😊                │
│─────────────────────────────────────│
│ 💡 Hint:                           │
│ [I usually have breakfast...]       │
│─────────────────────────────────────│
│ [Input: Type your answer...]        │
└─────────────────────────────────────┘
```

**Differences from Spark Talk:**
- No frame template chips (no `___` blanks)
- Free-form student input (not fill-in-the-blank)
- Hint shows example sentence, not word options
- AI asks a new question each turn (from curated pool)
- Turn counter visible: "Turn 4 of 10"

### State Machine

```
idle → selecting_drill → in_drill → farewell → idle

selecting_drill: Show list of drills for the week
in_drill: Active speaking practice
farewell: After 6-12 turns, show completion
```

---

## 6. Integration

### Week Real Data Integration

In `FreeTalkTab.jsx` (or rename to `AITutorTab.jsx`):

```javascript
// Detect which mode based on week number
const isSpeakingDrillWeek = weekNumber >= 36;

// Show Speaking Drill instead of Spark Talk for W36+
if (isSpeakingDrillWeek) {
  return <SpeakingDrillTab weekRealData={weekRealData} />;
}
```

### Routing

```javascript
// In AITutor.jsx, conditionally render:
// W1-W35: FreeTalkTab (Spark Talk)
// W36+:   SpeakingDrillTab
```

---

## 7. Comparison: Spark Talk vs Speaking Drill vs Free Talk

| Feature | Spark Talk (W1-35) | Speaking Drill (W36+) | Free Talk (old) |
|---------|-------------------|----------------------|-----------------|
| Content source | Deterministic frames | Curated AI pool | AI generated |
| Hallucination risk | None | Very low | High |
| Student answers | Fill-in-blank | Free form | Free form |
| Topic safety | Fixed topic | Topic guard + vocab | No guard |
| Personalization | None | Triggers adapt | Full AI |
| Turn count | 8 (fixed) | 6-12 (range) | Unlimited |
| Data creation | 16 frames/spark | 8 prompts + triggers | None |

---

## 8. Implementation Plan

### Phase 1: SpeakingDrillTab Component (1-2 sessions)
1. Create `SpeakingDrillTab.jsx` — copy FreeTalkTab structure, strip spark/frame logic
2. Implement topic guard, prompt selector, response builder
3. Add UI: turn counter, hint display, drill card selection
4. Connect to week real data (`speaking_drill` section)

### Phase 2: Data Migration (per week)
5. Write `speaking_drill` section for W36 (first week)
6. Create tooling to auto-generate `topic_vocab` and `triggers` from `read.js` vocabulary
7. Write prompts manually (8 per week, 30 min/week estimate)

### Phase 3: Integration (1 session)
8. Add week detection in AITutor.jsx
9. Test W36 E2E with Playwright
10. Deploy

### Phase 4: Iterate (ongoing)
11. Track which prompts trigger most — improve trigger lists
12. Add more prompts to pool based on student responses
13. Level detection (A2 vs B1 prompts)

---

## 9. Prompt Quality Checklist

Every prompt in `speaking_drill.prompts[]` must pass:

- [ ] `triggers[]` include at least 5 relevant words/phrases
- [ ] `question` is a genuine open question (not yes/no)
- [ ] `hint_en` uses vocabulary from read.js week's word list
- [ ] `follow_ups[]` are different questions (no repetition)
- [ ] `level` matches A2 or B1 (not A1 vocabulary in B1 prompts)
- [ ] No grammar vocabulary not yet taught in this week
- [ ] Tested with isOnTopic guard (off-topic messages should NOT trigger this prompt)
