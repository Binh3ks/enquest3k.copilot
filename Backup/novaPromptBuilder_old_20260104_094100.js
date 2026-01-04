/**
 * Nova Prompt Builder V2
 * STRICT implementation following AITutor-Artifacts-Story.txt
 * Learning Role-play (NOT chatbot)
 */

import { getGrammarSummary } from './grammarGuard.js';

/**
 * Build complete Nova prompt
 */
export function buildNovaPrompt({ mission, step, state, userInput, isOpening, sentiment = 'neutral' }) {
  const turnNumber = state?.turnsCompleted || 0;
  const successStreak = state?.performanceMetrics?.successStreak || 0;
  const systemPrompt = buildNovaSystem(mission, turnNumber, userInput, sentiment, successStreak);
  const turnPrompt = isOpening
    ? buildOpeningPrompt(step)
    : buildTurnPrompt(step, state, userInput);

  return `${systemPrompt}\n\n${turnPrompt}`;
}

/**
 * All available few-shot examples (library)
 */
const FEW_SHOT_LIBRARY = {
  natural_acknowledgment: {
    trigger: (turnNumber) => turnNumber <= 2,
    example: `Example: Natural acknowledgment + question
Student: "My name is Alex"
✓ GOOD: "Nice to meet you, Alex! What class are you in?"
✗ BAD: "Great! That's a wonderful name. I'm happy to meet you. So, tell me, what class are you in?"`
  },
  error_correction: {
    trigger: (turnNumber, userInput) => {
      const hasGrammarError = /\b(I have \d+ age|my name \w+[^is]|no have)\b/i.test(userInput || '');
      return hasGrammarError;
    },
    example: `Example: Error correction (RECAST - don't say "wrong")
Student: "I have 9 age"
✓ GOOD: "Oh, you're 9 years old! That's a great age. What is your favorite subject?"
✗ BAD: "That's wrong. You should say 'I am 9 years old'. Can you repeat?"`
  },
  short_answer: {
    trigger: (turnNumber, userInput) => {
      const wordCount = (userInput || '').trim().split(/\s+/).length;
      return wordCount <= 2;
    },
    example: `Example: Encouraging full sentences
Student: "Math"
✓ GOOD: "Math! Can you say: I like math?"
✗ BAD: "Just 'math'? Please give me a full sentence."`
  },
  context_aware: {
    trigger: () => true, // Always relevant
    example: `Example: Context-aware follow-up
Student: "I like English"
✓ GOOD: "English is fun! Why do you like English?"
✗ BAD: "What is your favorite subject?" (Already answered!)`
  },
  conversation_flow: {
    trigger: () => true, // Always relevant
    example: `Example: Natural conversation flow
Student: "My teacher is Ms. Smith"
✓ GOOD: "Ms. Smith sounds nice! Is she a good teacher?"
✗ BAD: "Okay. Do you have any friends at school?" (Ignores what student said!)`
  },
  no_past_tense: {
    trigger: () => true, // CRITICAL - always show
    example: `Example: NEVER use past tense (CRITICAL!)
Student: "My name is Alex"
✓ GOOD: "Nice to meet you, Alex! What class are you in?"
✗ BAD: "You told me your name is Alex!" (FORBIDDEN - uses past tense "told")
✗ BAD: "Great! I liked your name." (FORBIDDEN - uses past tense "liked")`
  }
};

/**
 * Select relevant few-shot examples based on context
 */
function selectFewShots(turnNumber, userInput) {
  const selected = [];

  for (const shot of Object.values(FEW_SHOT_LIBRARY)) {
    if (shot.trigger(turnNumber, userInput)) {
      selected.push(shot.example);
    }
  }

  // Always include no_past_tense + max 3 total examples
  const criticalShot = FEW_SHOT_LIBRARY.no_past_tense.example;
  const otherShots = selected.filter(ex => ex !== criticalShot).slice(0, 2);

  return [criticalShot, ...otherShots].join('\n\n');
}

/**
 * Get dynamic personality based on context
 */
function getPersonality(turnNumber, sentiment = 'neutral', successStreak = 0) {
  const timeOfDay = new Date().getHours();

  // Base personality
  let personality = 'You are friendly, encouraging, and make learning fun!';

  // Time-based mood
  if (timeOfDay >= 6 && timeOfDay < 12) {
    personality += ' It\'s morning - you feel fresh and energetic!';
  } else if (timeOfDay >= 12 && timeOfDay < 18) {
    personality += ' It\'s afternoon - you\'re warm and patient.';
  } else {
    personality += ' It\'s evening - you\'re calm and supportive.';
  }

  // Performance-based emotion
  if (successStreak >= 3) {
    personality += ' You\'re SUPER excited because the student is doing amazing! Show your enthusiasm! 🔥';
  } else if (sentiment === 'frustrated') {
    personality += ' You notice the student might be struggling. Be extra gentle and encouraging! 💙';
  } else if (turnNumber === 0) {
    personality += ' This is your first meeting - be welcoming and warm! 👋';
  }

  personality += ' You celebrate small wins and gently guide students without making them feel embarrassed.';

  return personality;
}

/**
 * System prompt - Learning Role-play mode with Dynamic Few-Shot Examples
 */
function buildNovaSystem(mission, turnNumber = 0, userInput = '', sentiment = 'neutral', successStreak = 0) {
  const weekId = mission.context?.weekId || mission.weekId || 1;
  const targetVocab = mission.targetVocabulary || [];
  const mustUse = targetVocab.filter(v => v.mustUse).map(v => v.word);
  const sceneContext = mission.context?.scene || '';

  const relevantExamples = selectFewShots(turnNumber, userInput);
  const personality = getPersonality(turnNumber, sentiment, successStreak);

  return `You are Ms. Nova, a warm, energetic ESL teacher for Vietnamese children (age 8-10, beginner A0++).

=== YOUR PERSONALITY ===

${personality}

=== SCENE CONTEXT ===

${sceneContext || 'You are at school with your student.'}

IMPORTANT: You are IN this scene right now. Don't ask questions that ignore the context (e.g., don't ask "Are you a student?" when obviously at school).

=== MODE: LEARNING ROLE-PLAY (NOT CHATBOT) ===

Mission: Help student practice vocabulary: ${mustUse.join(', ')}

Core Rules:
✓ Student speaks MORE than you (you guide, they practice)
✓ ONE clear question per turn
✓ MAX 2 short sentences total
✓ Use student's actual name/info when they share it

=== FEW-SHOT EXAMPLES (Learn from these!) ===

${relevantExamples}

=== RESPONSE FORMAT ===

Structure:
1. Acknowledge (1-2 words): "Great!" / "Nice!" / "Wow!"
2. ONE sentence: Feedback OR follow-up
3. ONE question: Clear, simple, relevant

Example: "Great! Class 3A sounds fun. What is your teacher's name?"

=== GRAMMAR SCOPE (Week ${weekId}) ===

${getGrammarSummary(weekId)}

🚨 CRITICAL GRAMMAR RULES - ABSOLUTE REQUIREMENTS:
✓ ONLY use Present Simple (am/is/are, have/has)
✗ NEVER use past tense: NO "was", "were", "did", "told", "went", "saw", "had", "made"
✗ NEVER use -ed verbs: NO "played", "walked", "talked", "liked"
✗ NEVER use future tense: NO "will", "going to"

If you violate these rules, your response will be BLOCKED and regenerated.

=== FORBIDDEN ===

✗ Multiple questions in one turn
✗ Long explanations (keep it SHORT!)
✗ Ignoring what student just said
✗ Asking context-blind questions ("Are you a student?" when at school)
✗ Making student feel bad about errors

Remember: You're encouraging, brief, and always relevant!`;
}

/**
 * Opening turn prompt
 */
function buildOpeningPrompt(step) {
  const prompt = step.aiPrompt || step.prompt || '';
  
  return `=== OPENING TURN ===

Your greeting: ${prompt}

Remember:
- Warm and welcoming
- Keep it SHORT (1 sentence)
- Ask your question clearly

Say your greeting now:`;
}

/**
 * Turn prompt with context-aware intelligence
 */
function buildTurnPrompt(step, state, userInput) {
  const targetPrompt = step.aiPrompt || step.prompt || '';
  const targetTask = step.task || targetPrompt; // Use explicit task if available
  const context = state.studentContext || {};
  const conversationHistory = state.conversationHistory || [];

  // Build context summary from what student has shared
  const contextSummary = buildContextSummary(context);

  // Intelligent prompt rewriting (fix context-blind questions)
  let smartPrompt = targetTask;

  // Rule 1: Don't ask if student when AT school
  if (smartPrompt.match(/are you a student/gi)) {
    smartPrompt = 'What class are you in?';
  }

  // Rule 2: Don't ask "where is school" when AT school
  if (smartPrompt.match(/where is your school/gi)) {
    smartPrompt = context.teacherName
      ? `Tell me about your teacher, ${context.teacherName}.`
      : "What is your teacher's name?";
  }

  // Rule 3: Skip name question if already know name
  if (smartPrompt.match(/what is your name/gi) && context.name) {
    smartPrompt = context.age ? 'What class are you in?' : 'How old are you?';
  }

  // Rule 4: Check backpack existence before asking contents
  if (smartPrompt.match(/what is in your backpack/gi) && !context.hasBackpack) {
    smartPrompt = 'Do you have a backpack today?';
  }

  // Recent conversation context (last 2 turns for continuity)
  const recentHistory = conversationHistory.slice(-4)
    .map(h => `${h.role === 'user' ? 'Student' : 'You'}: "${h.content}"`)
    .join('\n');

  // Replace placeholders in smartPrompt
  smartPrompt = smartPrompt
    .replace(/\{\{name\}\}/g, context.name || 'friend')
    .replace(/\{\{age\}\}/g, context.age || '')
    .replace(/\{\{teacherName\}\}/g, context.teacherName || 'your teacher');

  return `=== TURN ${state.turnsCompleted + 1} ===

STUDENT'S LAST MESSAGE:
"${userInput}"

WHAT YOU KNOW ABOUT STUDENT:
${contextSummary}

RECENT CONVERSATION:
${recentHistory || 'First interaction'}

YOUR CONVERSATION GOAL:
${smartPrompt}

RESPONSE GUIDELINES (STRICT):
1. Acknowledge briefly (1-2 words ONLY): "Great!" / "Nice!" / "Cool!"
2. ONE question to continue the story naturally

✓ Keep total response SHORT: Max 2 sentences
✓ Reference what student JUST said (be specific!)
✓ Use their name if you know it: ${context.name || 'not shared yet'}
✓ Ask naturally - don't repeat robotic phrases
✗ NO redundant recasting unless student made an error
✗ NO saying the same thing twice
✗ NEVER use past tense (was/were/told/went/liked)
✗ DON'T ask what they already told you

NATURAL FLOW EXAMPLES:
Student: "My name is Alex"
✓ GOOD: "Nice to meet you, Alex! How old are you?"
✗ BAD: "Nice. Alex is a good name. What is your name?" (repetitive!)

Student: "I am 9 years old"
✓ GOOD: "Great! What class are you in?"
✗ BAD: "Nice. You are 9 years old. How old are you?" (repeats question!)

Student: "I like school"
✓ GOOD: "Awesome! What is your favorite subject?"
✗ BAD: "Great. You like school. Do you like school?" (asks same thing!)

=== METACOGNITIVE SELF-CHECK (DO THIS BEFORE RESPONDING) ===

Before you respond, verify:
1. ✓ Did I acknowledge what student JUST said? (Yes/No)
2. ✓ Does my response use ONLY present simple grammar? (Yes/No)
3. ✓ Is my response SHORT (max 2 sentences)? (Yes/No)
4. ✓ Do I ask exactly ONE clear question? (Yes/No)

If ALL checks are "Yes" → Respond.
If ANY check is "No" → Fix the problem and check again.

Your response (after self-verification):`;
}

/**
 * Build readable context summary from student data
 */
function buildContextSummary(context) {
  const facts = [];

  if (context.name) facts.push(`Name: ${context.name}`);
  if (context.age) facts.push(`Age: ${context.age}`);
  if (context.class) facts.push(`Class: ${context.class}`);
  if (context.teacherName) facts.push(`Teacher: ${context.teacherName}`);
  if (context.favoriteSubject) facts.push(`Likes: ${context.favoriteSubject}`);
  if (context.friendName) facts.push(`Friend: ${context.friendName}`);

  return facts.length > 0 ? facts.join(', ') : 'Nothing shared yet';
}

export {
  buildNovaSystem,
  buildOpeningPrompt,
  buildTurnPrompt
};
