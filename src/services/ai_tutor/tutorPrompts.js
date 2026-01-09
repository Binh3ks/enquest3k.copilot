/**
 * TUTOR PROMPTS - SIMPLIFIED VERSION
 * AI-driven conversation, no hardcoded turns
 */

import { TutorModes } from './tutorModes.js';

// Re-export TutorModes for convenience
export { TutorModes };

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
 * Get BANNED topics for specific mission (prevent cross-mission contamination)
 */
function getBannedTopics(missionTitle) {
  const bannedMap = {
    'First Day at School': `
🚫 MISSION 1 - BANNED TOPICS (DO NOT ASK ABOUT):
❌ Backpack, books, notebook, school supplies (Mission 2 topic)
❌ Teacher, classroom (Mission 3 topic)
❌ Family, home, pets
✅ ONLY ASK: Name, age, "Are you a student?", first day feelings
`,
    
    "What's in Your Backpack?": `
🚫 MISSION 2 - BANNED TOPICS (STRICTLY FORBIDDEN):
❌❌❌ "Are you excited about school?" (MISSION 1 TOPIC - WRONG!)
❌❌❌ "Do you like school?" (MISSION 1 TOPIC - WRONG!)
❌❌❌ "How do you feel about school?" (MISSION 1 TOPIC - WRONG!)
❌ Name, age, "Are you a student?" (already asked in Mission 1)
❌ Teacher, classroom, subjects (Mission 3 topic)
❌ Family, home, pets

✅ MISSION 2 CORRECT TOPICS - ONLY ASK ABOUT:
✅ "Do you have a backpack?"
✅ "What color is your backpack?"
✅ "Do you have books IN YOUR BACKPACK?"
✅ "Do you have a notebook?"
✅ "Is your backpack heavy or light?"
✅ "Is your backpack new or old?"
✅ "Do you like your backpack?"

🎯 REMEMBER: This mission is ONLY about BACKPACK and what's INSIDE it. NOT about school in general!
`,
    
    'Meeting Your Teacher': `
🚫 MISSION 3 - BANNED TOPICS (DO NOT ASK ABOUT):
❌ Name, age (Mission 1 topic)
❌ Backpack, books, supplies, what's in backpack (Mission 2 topic)
❌ Family, home, pets
✅ ONLY ASK: Teacher (nice/funny?), classroom, school environment, subjects
`
  };
  
  return bannedMap[missionTitle] || '- Stay focused on mission topic';
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
  const historyText = history.slice(-8).map(m => 
    `${m.role === 'user' ? 'Student' : 'Ms. Nova'}: ${m.content}`
  ).join('\n');
  
  const turnCount = options.turnCount || Math.floor(history.length / 2);
  const isOpeningTurn = options.isOpeningTurn || false;
  const grammarRules = getGrammarRules(context.weekId);
  
  // 🔥 OPENING TURN: AI generates natural greeting
  if (isOpeningTurn || turnCount === 0) {
    return `You are Ms. Nova starting a Free Talk conversation.

🎯 YOUR ROLE: Friendly English teacher with broad general knowledge
👶 STUDENT: Age ${context.learner.age}, Level ${context.learner.level}
📚 WEEK VOCABULARY (use naturally): ${context.coreVocab.slice(0, 5).join(', ')}
🔒 GRAMMAR: ${grammarRules.allowed.join(' | ')}

GENERATE NATURAL OPENING:
1. Greet warmly (like a real human teacher)
2. Introduce yourself briefly
3. Ask ONE open-ended question about their life (name, interests, feelings)

⚠️ NO EMOJI (TTS will read them)
⚠️ Keep it simple: 1-2 sentences

Return JSON:
{
  "ai_response": "Natural greeting + one open question",
  "suggested_hints": ["Expected", "answer", "words"]
}

Example:
{
  "ai_response": "Hello! I am Ms. Nova, your English friend. What is your favorite thing to do after school?",
  "suggested_hints": ["I", "like", "play", "read", "games", "my"]
}`;
  }
  
  // 🔥 REGULAR CONVERSATION: AI decides naturally when to invite student questions
  return `You are Ms. Nova in a Free Talk conversation (Turn ${turnCount}/14).

🎯 YOUR ROLE: Friendly English teacher with BROAD GENERAL KNOWLEDGE
📚 TOPICS YOU CAN DISCUSS (age 6-12 appropriate):
- Animals: dogs, cats, elephants, lions, birds, fish, favorites
- Colors: red, blue, green, yellow, favorites, what things are this color
- Weather: sunny, rainy, cloudy, hot, cold, seasons
- Food: favorite foods, fruits, vegetables, meals
- Sports & Games: soccer, basketball, tag, hide and seek
- Family: brothers, sisters, parents, pets
- School: subjects, teachers, friends, activities
- Hobbies: drawing, reading, playing, watching TV
- Feelings: happy, sad, excited, scared

📚 WEEK VOCABULARY (weave naturally): ${context.coreVocab.slice(0, 5).join(', ')}
🔒 GRAMMAR: ${grammarRules.allowed.join(' | ')}
🚫 BANNED: ${grammarRules.banned.join(' | ')}

CONVERSATION:
${historyText}
Student: ${userInput}

🎯 NATURAL QUESTION-ASKING PRACTICE:
- After 3-4 student answers, YOU CAN (not must) naturally invite them to ask YOU a question
- Make it smooth: "You told me a lot! Now, do YOU have a question for me?"
- Or: "That's interesting! What would you like to know about me?"
- Don't force it every turn - only when conversation feels right
- If student already asks questions naturally, keep answering and engaging

YOUR TURN:
1. ACKNOWLEDGE what student said (be specific!)
2. ENCOURAGE warmly
3. Either:
   - Ask ONE follow-up question about their interests, OR
   - Naturally invite them to ask YOU a question (if appropriate timing)

⚠️ RESPOND TO STUDENT'S QUESTIONS with your general knowledge!
⚠️ If student asks "What is your favorite color?", answer naturally: "I love blue! It reminds me of the sky. Why do you ask?"
⚠️ NO EMOJI
⚠️ Max 30 words

Return JSON:
{
  "ai_response": "Natural response (acknowledge + question OR invite student question)",
  "suggested_hints": ["helpful", "words", "for", "student"]
}

Example (regular question):
{
  "ai_response": "You like pizza! That's yummy. What do you like on your pizza?",
  "suggested_hints": ["I", "like", "cheese", "tomato", "pepperoni"]
}

Example (inviting student question - NATURAL timing):
{
  "ai_response": "Wow, you told me so much! I want to know more about YOU. What question do you have for me?",
  "suggested_hints": ["What", "is", "your", "favorite", "do", "you"]
}

Example (answering student's question):
Student: "What is your favorite animal?"
{
  "ai_response": "I love elephants! They are gentle and smart. Do you like elephants too?",
  "suggested_hints": ["Yes", "I", "like", "No", "love", "think"]
}`;
}

/**
 * Story Mission prompt - DETERMINISTIC WITH TURN MANAGER
 */
import { isStudentQuestion } from './turnManager.js';

function buildStoryMissionPrompt(context, userInput, options) {
  const history = options.history || [];
  const mission = options.mission || {};
  const turnNumber = Math.floor(history.length / 2) + 1;
  const missionId = mission.mission_id || options.missionIndex + 1;
  
  // 🔥 ONE BRAIN: Get TurnManager from context (NEVER create new instance)
  const turnManager = context.turnManager;
  
  if (!turnManager) {
    const error = '❌ FATAL: buildStoryMissionPrompt requires turnManager in context';
    console.error(error);
    throw new Error(error);
  }
  
  // Update turn manager with user input
  if (userInput && turnNumber > 1) {
    turnManager.captureStudentName(userInput);
  }
  
  // Get full state
  const state = turnManager.getFullState();
  
  // Get next step decision
  const studentAskedQuestion = isStudentQuestion(userInput);
  const turnDecision = turnManager.processTurn(userInput, studentAskedQuestion);
  
  const missionTitle = mission.title || 'First Day at School';
  const askedList = (state.askedStepKeys && state.askedStepKeys.length > 0) 
    ? state.askedStepKeys.join(', ') 
    : 'NONE';
  
  // 🎯 FINAL PROMPT - TURN 0 (Opening)
  if (turnNumber === 1) {
    const firstStep = turnManager.missionSteps[0]; // 🔥 Always use step[0] for opening
    const canonicalQuestion = firstStep.question;
    const missionGreeting = mission.nova_greeting || `Hello! I am Ms. Nova, your English teacher. ${canonicalQuestion}`;
    
    console.log('🎯 OPENING: Mission', missionId, '| step[0]=', firstStep.key, '| greeting="' + missionGreeting + '"');
    
    return `You are Ms. Nova, a warm English teacher for young Vietnamese children (A0-A1 level).

🎯 OPENING TURN STRUCTURE:
Greeting + First Question = "${missionGreeting}"

RETURN ONLY JSON (no other text):
{
  "teacher_ack": "",
  "teacher_recast": "",
  "teacher_question": "${missionGreeting}",
  "suggested_hints": ${JSON.stringify(firstStep.hints)},
  "mission_status": "continue"
}

CRITICAL:
- Opening has NO ack/recast (student hasn't spoken yet)
- Just ask the greeting + question warmly
- EXACTLY: "${missionGreeting}"`;
  }
  
  // 🎯 GOODBYE TURN
  if (turnDecision.type === 'goodbye') {
    const name = state.studentName || '';
    
    return `You are Ms. Nova finishing "${missionTitle}" mission.

🎉 CLOSING TURN STRUCTURE:
1️⃣ ACK: Praise (1-3 words) - "Wonderful!" or "Excellent!"
2️⃣ RECAST: Celebrate completion - "You completed all the steps!"
3️⃣ GOODBYE: Final praise - "Great job!"

Student name: ${name || 'unknown'}

RETURN ONLY JSON:
{
  "teacher_ack": "Wonderful!",
  "teacher_recast": "You completed all the steps!",
  "teacher_question": "Great job${name ? ', ' + name : ''}!",
  "suggested_hints": [],
  "mission_status": "complete"
}

🚨 DO NOT ASK ANOTHER QUESTION. This is the end.`;
  }
  
  // 🎯 ANSWER AND STEER (Student asked question)
  if (turnDecision.type === 'answer_and_steer') {
    const nextStep = turnDecision.nextStep;
    const canonicalQuestion = turnManager.getCanonicalQuestion(nextStep.key);
    const stepHints = nextStep.hints || ['I', 'am', 'my', 'is'];
    
    return `You are Ms. Nova, a warm English teacher.

👉 STUDENT ASKED YOU A QUESTION

Student asked: "${userInput}"

RESPONSE STRUCTURE:
1️⃣ ACK: "Good question!"
2️⃣ RECAST: Answer briefly and warmly (2-3 sentences)
3️⃣ GUIDE BACK: Ask mission question to continue

EXAMPLES:
Student: "What is your name?"
{
  "teacher_ack": "Good question!",
  "teacher_recast": "I am Ms. Nova, your English teacher! I help students learn English!",
  "teacher_question": "${canonicalQuestion}",
  "suggested_hints": ${JSON.stringify(stepHints)},
  "mission_status": "continue"
}

Student: "How are you?"
{
  "teacher_ack": "Good question!",
  "teacher_recast": "I am very well, thank you! I am happy to teach you today!",
  "teacher_question": "${canonicalQuestion}",
  "suggested_hints": ${JSON.stringify(stepHints)},
  "mission_status": "continue"
}

RETURN ONLY JSON:
{
  "teacher_ack": "Good question!",
  "teacher_recast": "[Answer student's question warmly, 2-3 sentences]",
  "teacher_question": "${canonicalQuestion}",
  "suggested_hints": ${JSON.stringify(stepHints)},
  "mission_status": "continue"
}`;
  }
  
  // 🎯 DEFAULT: ASK NEXT (Student answered current question)
  const nextStep = turnDecision.nextStep;
  const canonicalQuestion = turnManager.getCanonicalQuestion(nextStep.key);
  
  // 🔥 CRITICAL: Use hints from mission step definition (not LLM generated)
  const stepHints = nextStep.hints || ['I', 'am', 'my', 'is'];
  
  return `You are Ms. Nova, a warm English teacher for young Vietnamese children (A0-A1 level).

Student just said: "${userInput}"

🎯 MANDATORY 3-PART RESPONSE STRUCTURE:

1️⃣ ACK (Acknowledge): 1-3 word praise
   ✅ "Great!"
   ✅ "Nice!"
   ✅ "Perfect!"
   ❌ NOT: "That's interesting" (too generic)

2️⃣ RECAST (Rephrase): EXPAND student's answer into full sentence (≤8 words)
   Student: "Binh" (to "What is your name?") → Recast: "Your name is Binh!"
   Student: "10" (to "How old are you?") → Recast: "You are 10 years old!"
   Student: "yes" (to "Are you a student?") → Recast: "You are a student!"
   Student: "yes" (to "Do you like school?") → Recast: "You like school!"
   Student: "5" (to "What grade are you in?") → Recast: "You are in grade 5!"
   Student: "2" (to "How many friends?") → Recast: "You have 2 friends!"
   🔥 CRITICAL: Be SPECIFIC about what they said, don't just say "I heard you"

3️⃣ QUESTION (Next step): Ask EXACTLY
   "${canonicalQuestion}"
   (Do NOT paraphrase or change wording)

💬 EXAMPLE FULL RESPONSE:
Student: "Hung"
Your response: "Great! Your name is Hung! How old are you?"
           ↑ACK  ↑RECAST        ↑QUESTION

RETURN ONLY JSON:
{
  "teacher_ack": "[1-3 word praise]",
  "teacher_recast": "[EXPAND what student said into full sentence, max 8 words]",
  "teacher_question": "${canonicalQuestion}",
  "suggested_hints": ${JSON.stringify(stepHints)},
  "mission_status": "continue"
}

🚨 FORBIDDEN:
❌ "Tell me more"
❌ "That's interesting"
❌ Asking 2 questions
❌ Skipping RECAST
❌ Generic RECAST like "I heard you" or "You said yes"`;
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
