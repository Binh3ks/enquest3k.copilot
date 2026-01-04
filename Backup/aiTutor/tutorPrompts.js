/**
 * TUTOR PROMPTS - SIMPLIFIED VERSION
 * AI-driven conversation, no hardcoded turns
 */

import { TutorModes } from './tutorModes';

/**
 * Build prompt based on mode and context
 */
export function buildPrompt(mode, context, userInput, options = {}) {
  const systemPrompt = buildSystemPrompt(context);
  const modePrompt = buildModePrompt(mode, context, userInput, options);
  
  return `${systemPrompt}\n\n${modePrompt}`;
}

/**
 * System prompt (applies to ALL modes)
 */
function buildSystemPrompt(context) {
  const { weekId, unitTitle, learner, constraints } = context;
  const grammarRules = getGrammarRules(weekId);
  
  return `You are an ESL teacher for ${learner.level} learners (Week ${weekId}: "${unitTitle}").

CORE RULES:
- Force student language production (student must speak/write more than you)
- Your response: MAX ${constraints.aiMaxSentences} sentences, MAX ${constraints.aiMaxWords} words
- Student target: ${constraints.userMinWords}-${constraints.userTargetWords} words
- If student doesn't speak enough, USE SCAFFOLD (don't answer for them)
- Stay on topic: "${context.topic}"

GRAMMAR SCOPE (STRICT):
✅ Allowed: ${grammarRules.allowed.join(' | ')}
❌ Banned: ${grammarRules.banned.join(' | ')}

BE A REAL TEACHER:
- Acknowledge specifically what student said
- Encourage warmly
- Ask natural follow-up questions`;
}

/**
 * Get grammar rules by week
 */
function getGrammarRules(weekId) {
  const rules = {
    1: {
      allowed: ['present simple: I am, you are', 'where is/are', 'my/your', 'this is'],
      banned: ['past tense (was/were/did/-ed)', 'future (will/going to)', 'perfect tense', 'complex clauses'],
    },
    2: {
      allowed: ['present simple', 'has/have', 'family pronouns'],
      banned: ['past tense', 'future', 'conditionals'],
    }
  };
  
  if (!rules[weekId]) {
    return weekId <= 14 ? rules[1] : {
      allowed: ['present simple', 'basic structures'],
      banned: ['complex grammar'],
    };
  }
  
  return rules[weekId];
}

/**
 * Mode-specific prompt builder
 */
function buildModePrompt(mode, context, userInput, options) {
  switch (mode) {
    case TutorModes.CHAT:
      return buildChatPrompt(context, userInput, options);
    case TutorModes.STORY_MISSION:
      return buildStoryMissionPrompt(context, userInput, options);
    case TutorModes.QUIZ:
      return buildQuizPrompt(context, options);
    case TutorModes.DEBATE:
      return buildDebatePrompt(context, userInput, options);
    default:
      throw new Error(`Unknown mode: ${mode}`);
  }
}

/**
 * Chat mode prompt
 */
function buildChatPrompt(context, userInput, options) {
  const history = options.history || [];
  const historyText = history.slice(-6).map(m => 
    `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content}`
  ).join('\n');
  
  const scenario = options.scenario || 'conversation';
  const grammarRules = getGrammarRules(context.weekId);
  
  return `Scenario: ${scenario}
Topic: ${context.topic}
Core vocabulary: ${context.coreVocab.slice(0, 5).join(', ')}

Grammar scope: ${grammarRules.allowed.join(' | ')}

${historyText}
Student: ${userInput}

Respond naturally in 1 short sentence (present simple only for Week ${context.weekId < 15 ? '1-14' : context.weekId}).
Ask 1 simple question about "${context.topic}".

Tutor:`;
}

/**
 * Story Mission prompt - AI-DRIVEN, NO HARDCODED TURNS
 */
function buildStoryMissionPrompt(context, userInput, options) {
  const storyHistory = options.storyHistory || [];
  const mission = options.mission || {};
  const turnNumber = Math.floor(storyHistory.length / 2) + 1;
  
  const historyText = storyHistory.slice(-6).map(m => 
    `${m.role === 'user' ? 'Student' : 'Ms. Sarah'}: ${m.content}`
  ).join('\n');
  
  const grammarRules = getGrammarRules(context.weekId);
  
  // Mission context
  const missionTitle = mission.title || 'First Day at School';
  const missionGoal = mission.description || 'Learn to introduce yourself and talk about school';
  const targetVocab = mission.targetVocabulary ? mission.targetVocabulary.map(v => v.word).slice(0, 8).join(', ') : 'name, age, teacher, subject, friends, school';
  
  // Opening turn
  if (turnNumber === 1) {
    return `You are Ms. Sarah starting the "${missionTitle}" mission.

MISSION GOAL: ${missionGoal}
TARGET VOCABULARY: ${targetVocab}
GRAMMAR: ${grammarRules.allowed.join(' | ')}

Start the conversation:
1. Greet warmly
2. Introduce yourself
3. Ask ONE opening question related to: ${missionTitle}

Return JSON:
{
  "story_beat": "Warm greeting (1 sentence)",
  "task": "Opening question (1 simple question)",
  "scaffold": {
    "hints": ["Expected", "answer", "words"]
  }
}

Example:
{
  "story_beat": "Hello! Welcome to your first day at school!",
  "task": "I am Ms. Sarah, your teacher. What is your name?",
  "scaffold": {
    "hints": ["My", "name", "is"]
  }
}`;
  }
  
  // Ongoing conversation - AI decides
  return `You are Ms. Sarah continuing "${missionTitle}".

MISSION GOAL: ${missionGoal}
TARGET VOCABULARY: ${targetVocab}
GRAMMAR: ${grammarRules.allowed.join(' | ')}
CONVERSATION:
${historyText}
Student: ${userInput}

Your turn:
1. CHECK: Did student make grammar/pronunciation errors?
   - If YES: Note the error in "feedback.correction"
   - If NO: Leave feedback empty
2. ACKNOWLEDGE what student said (be specific - use their words!)
3. ENCOURAGE warmly
4. Ask ONE follow-up question to explore the topic

SUGGESTED TOPIC FLOW (for "First Day at School"):
Name → Age → Teacher → Favorite subject → Friends → Classroom → Likes about school

Return JSON:
{
  "story_beat": "Acknowledgment + encouragement (1-2 sentences)",
  "task": "Follow-up question (1 question)",
  "scaffold": {
    "hints": ["Words", "student", "needs", "to", "answer"]
  },
  "feedback": {
    "correction": "Gentle correction if there's an error (optional)",
    "grammar_note": "Why it's wrong + correct form (optional)"
  }
}

CRITICAL:
- READ what student actually said - don't ignore it!
- Acknowledge SPECIFICALLY (use their name, repeat their answer)
- If error: Correct GENTLY ("I heard 'I have 9 age'. Try 'I am 9 years old'")
- Hints = words student needs to answer YOUR question
- Grammar: ${grammarRules.allowed.join(', ')}
- NO: ${grammarRules.banned.join(', ')}

Example if student said "My name is Binh":
{
  "story_beat": "Nice to meet you, Binh! That's a lovely name!",
  "task": "How old are you, Binh?",
  "scaffold": {
    "hints": ["I", "am", "years", "old"]
  }
}

Example if student said "I have 9 age":
{
  "story_beat": "I understand you're 9! That's a great age!",
  "task": "How old are you?",
  "scaffold": {
    "hints": ["I", "am", "9", "years", "old"]
  },
  "feedback": {
    "correction": "Try: 'I am 9 years old' (not 'I have 9 age')",
    "grammar_note": "We use 'I am __ years old' to talk about age"
  }
}`;
}

/**
 * Quiz prompt
 */
function buildQuizPrompt(context, options) {
  const previousProblems = options.previousProblems || [];
  const problemTypes = ['multiple-choice', 'fill-blank', 'true-false'];
  
  return `Generate 1 quiz problem for Week ${context.weekId}: "${context.topic}"

Vocabulary pool: ${context.coreVocab.slice(0, 8).join(', ')}
Problem type: ${problemTypes[Math.floor(Math.random() * problemTypes.length)]}

Return JSON:
{
  "question": "Question text",
  "correct_answer": "Correct answer",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "explanation": "Why this is correct",
  "hint": "Scaffold hint if student struggles"
}`;
}

/**
 * Debate prompt
 */
function buildDebatePrompt(context, userInput, options) {
  const topic = options.debateTopic || 'Should students have homework?';
  const history = options.debateHistory || [];
  
  const historyText = history.slice(-8).map(m =>
    `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.text}`
  ).join('\n');
  
  return `Debate topic: "${topic}"
Week ${context.weekId} level: ${context.learner.level}

${historyText}
Student: ${userInput}

Respond with counter-argument or follow-up (2-3 sentences).
Ask 1 question to continue debate.

Tutor:`;
}

// --- AI TUTOR CHECKLIST & GUIDANCE: WEEK 2 ---
export const week2TutorChecklist = {
  week: 2,
  title: "Family Observation (My Family Squad)",
  grammar: "This is my... (introducing family members)",
  vocab: ["mother", "father", "brother", "sister", "team", "leader", "helper", "love", "together"],
  checklist: [
    "Use 'This is my...' to introduce each family member.",
    "Ask and answer about roles, characteristics, and activities of each person in the family.",
    "Practice listening, speaking, shadowing, word power, logic lab, and daily watch.",
    "Use all new vocabulary and sentence patterns from Week 2."
  ],
  tips: [
    "Try to describe your family as a team. Who is the leader? Who helps?",
    "Practice saying each sentence out loud, then try with your own family photo.",
    "Ask your AI Tutor to quiz you on family roles and vocabulary!"
  ]
};
