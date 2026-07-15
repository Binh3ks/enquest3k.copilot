# Story Mission Scaffolding Configuration

## Overview

Scaffolding controls the conversation length and expansion topics for Story Missions. Each phase has different turn limits to match student proficiency development.

---

## Turn Structure by Phase

### Phase 1: Weeks 1-14 (Foundation - A0++ to A1)
```javascript
scaffolding: {
  phase: 1,
  coreTurns: 7,      // Core mission content (steps 1-7)
  expansionTurns: 3, // Additional exploration (steps 8-10)
  maxTurns: 10       // Total maximum turns
}
```

**TTS Speed:** 0.8x (slower for beginners)

**Core Turns (1-7):**
- Step 1: Opening question
- Steps 2-6: Main mission content
- Step 7: First expansion question

**Expansion Turns (8-10):**
- Step 8: Related topic exploration
- Step 9: Personal connection
- Step 10: Closing/goodbye

**Rationale:** Vietnamese ESL A0++ learners (6-12 years) have limited attention span. 10 turns = ~5-8 minutes of conversation, appropriate for beginners.

---

### Phase 1.2: Weeks 15-28 (Expansion - A1)
```javascript
scaffolding: {
  phase: 1.2,
  coreTurns: 10,
  expansionTurns: 5,
  maxTurns: 15
}
```

**TTS Speed:** 0.9x (medium speed)

**Turn Distribution:**
- Core: 10 turns (main content + deeper questions)
- Expansion: 5 turns (related topics, comparisons, preferences)
- Total: 15 turns (~10-12 minutes)

**New Features:**
- Compare/contrast questions ("Which do you like more?")
- Reason questions ("Why do you like...?")
- Sequence questions ("What do you do first? Then?")

---

### Phase 2: Weeks 29-42 (Advanced - A1+ to A2)
```javascript
scaffolding: {
  phase: 2,
  coreTurns: 15,
  expansionTurns: 5,
  maxTurns: 20
}
```TS Speed:** 1.0x (normal speed)

**T

**Turn Distribution:**
- Core: 15 turns (extended narrative, connected discourse)
- Expansion: 5 turns (critical thinking, opinion)
- Total: 20 turns (~15-18 minutes)

**New Features:**
- "What if..." hypothetical questions
- Debate prompts ("Do you agree or disagree?")
- Multi-turn storytelling (3-4 connected responses)

---

### Phase 3: Weeks 43+ (Mastery - A2+)
```javascript
scaffolding: {
  phase: 3,
  coreTurns: 20,
  expansionTurns: 10,
  maxTurns: 30
}
```

**Turn Distribution:**
- Core: 20 turns (complex topics, multiple perspectives)
- Expansion: 10 turns (open-ended exploration)
- Total: 30 turns (~20-25 minutes)

**New Features:**
- Project planning missions (multi-step tasks)
- Role-play scenarios
- Problem-solving tasks

---

## Mission Data Structure

### Example: Week 1 Mission with Scaffolding

```javascript
export const week1FirstDay = createMission({
  id: "W1_FIRST_DAY",
  weekId: 1,
  title: "First Day at School",
  
  steps: [
    { stepId: 1, aiPrompt: "...", task: "..." },  // Core turn 1
    { stepId: 2, aiPrompt: "...", task: "..." },  // Core turn 2
    { stepId: 3, aiPrompt: "...", task: "..." },  // Core turn 3
    { stepId: 4, aiPrompt: "...", task: "..." },  // Core turn 4
    { stepId: 5, aiPrompt: "...", task: "..." },  // Core turn 5
    { stepId: 6, aiPrompt: "...", task: "..." },  // Core turn 6
    { stepId: 7, aiPrompt: "...", task: "..." },  // Core turn 7
    // Expansion turns start here
    { stepId: 8, aiPrompt: "...", task: "..." },  // Expansion 1
    { stepId: 9, aiPrompt: "...", task: "..." },  // Expansion 2
    { stepId: 10, aiPrompt: "...", task: "..." }, // Expansion 3 (goodbye)
  ],
  
  scaffolding: {
    phase: 1,
    coreTurns: 7,
    expansionTurns: 3,
    maxTurns: 10
  }
});
```

---

## Engine Logic

### storyMissionEngine.js Implementation

```javascript
async generateTurn(userInput) {
  this.state.turnsCompleted++;
  
  // Check max turns limit
  const maxTurns = this.mission.scaffolding?.maxTurns || this.mission.steps.length;
  
  if (this.state.turnsCompleted >= maxTurns) {
    return {
      story_beat: "Great job! You completed the mission! 🎉",
      isComplete: true
    };
  }
  
  // Get current step (prevent out of bounds)
  this.state.currentStep = Math.min(
    this.state.turnsCompleted,
    this.mission.steps.length - 1
  );
  
  const step = this.mission.steps[this.state.currentStep];
  // ... continue with response generation
}
```

**Key Features:**
1. ✅ Respects `maxTurns` limit
2. ✅ Prevents array out-of-bounds (step index capped)
3. ✅ Auto-completes mission at turn limit
4. ✅ No question repetition

---

## Expansion Turn Design Guidelines

### Phase 1 Expansion Turns (Steps 8-10)

**Step 8: Related Action**
- Builds on previous answer
- Uses student's response in question
- Example: "Nice! Do you play there with friends?"

**Step 9: Personal Preference**
- Asks for likes/dislikes
- Encourages opinion
- Example: "Do you like your school?"

**Step 10: Goodbye**
- Positive reinforcement
- Natural closing
- Example: "Wonderful! You did great! See you next time! 👋"

### Phase 1.2 Expansion Turns (Steps 11-15)

**Step 11-12: Comparison**
- Compare two options
- "Which do you like more: X or Y?"
- Reason: "Why?"

**Step 13-14: Sequence/Process**
- "What do you do first?"
- "What happens next?"

**Step 15: Reflection**
- "What did you learn today?"
- "What was your favorite part?"

### Phase 2+ Expansion Turns (Steps 16-20)

**Step 16-17: Hypothetical**
- "What if you could change one thing?"
- "Imagine you have a magic power..."

**Step 18-19: Debate**
- "Some people think... Do you agree?"
- "Why or why not?"

**Step 20: Synthesis**
- "Tell me everything you learned today"
- "Can you make one long sentence?"

---

## Quality Assurance

### Checklist for New Missions:

- [ ] Total steps = maxTurns value
- [ ] Core turns (1-7 for Phase 1) cover main content
- [ ] Expansion turns (8-10 for Phase 1) explore related topics
- [ ] Step 10/15/20/30 is always goodbye/closing
- [ ] No duplicate questions
- [ ] Each step has unique content
- [ ] Placeholders properly reference previous answers
- [ ] Grammar constraints maintained throughout all turns

---

## Placeholder System

### Dynamic Content in Expansion Turns

Use `{{variable}}` to reference student's previous answers:

```javascript
// Core turn captures response
{ 
  stepId: 6, 
  aiPrompt: "What do you like at your school?",
  // Student answers: "I like the playground"
  // Engine stores: favoritePlace = "the playground"
}

// Expansion turn uses it
{ 
  stepId: 7, 
  aiPrompt: "Nice! {{favoritePlace}}! Do you play there with friends?",
  // Renders as: "Nice! the playground! Do you play there with friends?"
}
```

### Available Placeholders (Phase 1):

- `{{name}}` - Student's name (step 1)
- `{{age}}` - Student's age (step 2)
- `{{teacherName}}` - Teacher's name (step 3)
- `{{subject}}` - Favorite subject (step 4)
- `{{favoritePlace}}` - School location they like (step 6)
- `{{friendName}}` - Friend's name
- `{{activity}}` - Activity they do
- `{{object}}` - Classroom object mentioned

---

## Mission Completion Criteria

### Phase 1: Minimum 7 Core Turns
```javascript
successCriteria: {
  minTurns: 7,                           // Must complete core content
  mustUseWords: ["name", "student", "teacher"], // Vocab check
  grammarFocus: "present_simple",        // Grammar target
  completionMessage: "Great job! 🎉"
}
```

**Completion Triggers:**
1. Student reaches turn 10 (maxTurns)
2. Student completes all required vocabulary
3. Student clicks "Complete Mission" button (optional)

### Phase 1.2 and Beyond:
- minTurns increases with phase
- More vocabulary required
- Grammar focus expands

---

## Auto-Send Voice Input

**New Feature (Implemented):**
- No submit button
- Microphone auto-sends when voice input ends
- Natural conversation flow
- AI gives feedback automatically

```javascript
// StoryMissionTab.jsx
recognitionRef.current.onend = () => {
  setIsListening(false);
  if (input.trim()) {
    handleSubmit(); // Auto-send
  }
};
```

**Benefits:**
- No interruption from clicking buttons
- More natural speaking practice
- AI corrects errors in next turn naturally

---

## Implementation Status

### ✅ Completed:
- Phase 1 scaffolding config (7+3=10 turns)
- Week 1 missions fully expanded to 10 steps
- Engine respects maxTurns limit
- Auto-send voice input
- TTS integration (OpenAI voice "nova")

### ⏳ In Progress:
- Phase 1.2 scaffolding (10+5=15 turns)
- Phase 2 scaffolding (15+5=20 turns)
- Phase 3 scaffolding (20+10=30 turns)

### ❌ Pending:
- Week 2-14 missions (need expansion turns)
- Review missions (mix previous weeks)
- Creative missions (student choice topics)
- Debate missions (Phase 2+)
- Project missions (Phase 3+)

---

**Last Updated:** 2025-12-30  
**Status:** Active Development  
**Owner:** EngQuest Dev Team
