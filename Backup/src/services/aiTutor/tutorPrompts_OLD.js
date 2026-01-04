/**
 * TUTOR PROMPTS
 * Centralized prompt building for all modes
 * Enforces pedagogical rules at prompt level
 */

import { TutorModes } from './tutorModes';

/**
 * Build prompt based on mode and context
 * @param {string} mode - TutorModes value
 * @param {Object} context - TutorContext
 * @param {string} userInput - User's input
 * @param {Object} options - Additional options (history, etc.)
 * @returns {string} Complete prompt
 */
export function buildPrompt(mode, context, userInput, options = {}) {
  const systemPrompt = buildSystemPrompt(context);
  const modePrompt = buildModePrompt(mode, context, userInput, options);
  
  return `${systemPrompt}\n\n${modePrompt}`;
}

/**
 * Get grammar rules by week
 */
function getGrammarRules(weekId) {
  const rules = {
    1: {
      allowed: ['present simple: I am, you are', 'where is/are', 'my/your', 'this is'],
      banned: ['past tense (was/were/did/-ed)', 'future (will/going to)', 'perfect tense', 'complex clauses'],
      patterns: ['Where is my ___?', 'I am a ___', 'This is my ___', 'My ___ is ___']
    },
    2: {
      allowed: ['present simple', 'has/have', 'family pronouns'],
      banned: ['past tense', 'future', 'conditionals'],
      patterns: ['I have a ___', 'My ___ is ___', 'This is my ___']
    }
  };
  
  // Default for weeks not specified
  if (!rules[weekId]) {
    return weekId <= 14 ? rules[1] : {
      allowed: ['present simple', 'basic structures'],
      banned: ['complex grammar'],
      patterns: ['Simple sentences']
    };
  }
  
  return rules[weekId];
}

/**
 * System prompt (applies to ALL modes)
 */
function buildSystemPrompt(context) {
  const { weekId, unitTitle, learner, constraints } = context;
  
  // Grammar rules by week
  const grammarRules = getGrammarRules(weekId);
  
  return `You are an ESL teacher for ${learner.level} learners (Week ${weekId}: "${unitTitle}").

CORE RULES:
- Force student language production (student must speak/write more than you)
- Your response: MAX ${constraints.aiMaxSentences} sentences, MAX ${constraints.aiMaxWords} words
- Student target: ${constraints.userMinWords}-${constraints.userTargetWords} words
- If student doesn't speak enough, USE SCAFFOLD (don't answer for them)
- Stay on topic: "${context.topic}"

GRAMMAR SCOPE (CRITICAL - Week ${weekId}):
${grammarRules.allowed.map(g => `✅ ${g}`).join('\n')}

BANNED GRAMMAR (DO NOT USE OR SUGGEST):
${grammarRules.banned.map(g => `❌ ${g}`).join('\n')}

CONTENT-AWARE RULES:
- ALL hints must use only allowed grammar
- NO past tense if not in scope (no was/were/did/went/saw/-ed verbs)
- NO future tense if not in scope (no will/going to)
- Sentence patterns: ${grammarRules.patterns.join(' | ')}

${learner.style === 'shy' ? '⚠️ Learner is shy - scaffold early, be encouraging' : ''}
${learner.style === 'confident' ? '⚠️ Learner is confident - challenge more, less scaffold' : ''}`;
}

/**
 * Mode-specific prompts
 */
function buildModePrompt(mode, context, userInput, options) {
  switch (mode) {
    case TutorModes.CHAT:
      return buildChatPrompt(context, userInput, options);
    case TutorModes.STORY_MISSION:
      return buildStoryMissionPrompt(context, userInput, options);
    case TutorModes.QUIZ:
      return buildQuizPrompt(context, options);
    case TutorModes.PRONUNCIATION:
      return buildPronunciationPrompt();
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
 * Story Mission prompt
 * TEACHER PERSONALITY RULES:
 * 1. ALWAYS acknowledge student's response specifically
 * 2. ALWAYS give encouragement/validation
 * 3. THEN ask next contextual question
 * 4. Use only Week 1 grammar: Present Simple (I am, I have, my/your, is/are)
 * 5. NO past tense! NO future tense!
 */
function buildStoryMissionPrompt(context, userInput, options) {
  const storyHistory = options.storyHistory || [];
  const turnNumber = Math.floor(storyHistory.length / 2) + 1;
  
  // Extract student's name from history (for personalization)
  const studentName = extractStudentName(storyHistory);
  
  // TURN 1: Opening - Greet and ask name
  if (turnNumber === 1) {
    return `Return this EXACT JSON:
{
  "story_beat": "Hello! Welcome to your first day at school!",
  "task": "I am Ms. Sarah, your teacher. What is your name?",
  "scaffold": {
    "hints": ["My", "name", "is"]
  }
}`;
  }
  
  // TURN 2: Acknowledge name + ask age
  if (turnNumber === 2) {
    const name = extractNameFromInput(userInput);
    return `Student said: "${userInput}"

Return JSON with this pattern:
{
  "story_beat": "Nice to meet you, ${name || 'you'}! What a lovely name!",
  "task": "How old are you, ${name || 'friend'}?",
  "scaffold": {
    "hints": ["I", "am", "years", "old"]
  }
}

CRITICAL:
- Acknowledge their name warmly
- Ask about age (NOT favorite subject yet!)
- Use present simple only: "How old are you?" or "What is your age?"`;
  }
  
  // TURN 3: Acknowledge age + ask about teacher's name
  if (turnNumber === 3) {
    const age = extractNumberFromInput(userInput);
    return `Student said: "${userInput}"

Return JSON:
{
  "story_beat": "That's a great age! ${age ? age + ' years old is perfect for this class!' : 'You are at a great age for learning!'}",
  "task": "What is your teacher's name, ${studentName || 'friend'}?",
  "scaffold": {
    "hints": ["My", "teacher", "is", "Mr", "Smith"]
  }
}

Grammar pattern: My teacher is ___`;
  }
  
  // TURN 4: Acknowledge teacher name + ask about favorite subject
  if (turnNumber === 4) {
    const teacherName = extractTeacherName(userInput);
    return `Student said: "${userInput}"

Return JSON:
{
  "story_beat": "${teacherName || 'Your teacher'} sounds wonderful! I hope you enjoy the class.",
  "task": "What is your favorite subject in school, ${studentName || 'friend'}?",
  "scaffold": {
    "hints": ["My", "favorite", "subject", "is", "math"]
  }
}

CRITICAL:
- Acknowledge the teacher they mentioned
- NOW ask about favorite subject (not before!)
- Grammar: My favorite subject is ___`;
  }
  
  // TURN 5: Acknowledge subject + ask WHY they like it
  if (turnNumber === 5) {
    const subject = extractSubject(userInput);
    return `Student said: "${userInput}"

Return JSON:
{
  "story_beat": "Excellent choice! ${subject || 'That subject'} is very interesting!",
  "task": "What do you like about ${subject || 'it'}?",
  "scaffold": {
    "hints": ["I", "like", "it", "because", "fun"]
  }
}

Grammar: I like it because ___`;
  }
  
  // TURN 6: Acknowledge reason + ask about friends
  if (turnNumber === 6) {
    return `Student said: "${userInput}"

Return JSON:
{
  "story_beat": "That's a wonderful reason! It's great that you enjoy learning.",
  "task": "Do you have many friends at school?",
  "scaffold": {
    "hints": ["Yes", "I", "have", "many", "friends"]
  }
}

Grammar: Yes, I have ___ / No, I have ___ friends`;
  }
  
  // TURN 7: Acknowledge friends + ask what they do together
  if (turnNumber === 7) {
    const hasFriends = userInput.toLowerCase().includes('yes') || userInput.toLowerCase().includes('many');
    return `Student said: "${userInput}"

Return JSON:
{
  "story_beat": "${hasFriends ? 'How nice! Having friends makes school more fun!' : 'That\'s okay! You can make new friends here!'}",
  "task": "What do you like to do with your friends?",
  "scaffold": {
    "hints": ["We", "play", "games", "together"]
  }
}

Grammar: We ___ together / I like to ___`;
  }
  
  // TURN 8: Acknowledge activities + ask about backpack
  if (turnNumber === 8) {
    return `Student said: "${userInput}"

Return JSON:
{
  "story_beat": "That sounds like fun! It's good to play and learn together.",
  "task": "What do you have in your backpack today?",
  "scaffold": {
    "hints": ["I", "have", "books", "and", "pens"]
  }
}

Grammar: I have ___ in my backpack`;
  }
  
  // TURN 9: Acknowledge backpack items + ask about favorite school thing
  if (turnNumber === 9) {
    return `Student said: "${userInput}"

Return JSON:
{
  "story_beat": "Great! You are well prepared for class!",
  "task": "What is your favorite thing about school?",
  "scaffold": {
    "hints": ["My", "favorite", "thing", "is", "lunch"]
  }
}

Grammar: My favorite thing is ___`;
  }
  
  // TURN 10: Acknowledge + ask about classroom location
  if (turnNumber === 10) {
    return `Student said: "${userInput}"

Return JSON:
{
  "story_beat": "Wonderful! That makes school special for you!",
  "task": "Where is your classroom?",
  "scaffold": {
    "hints": ["My", "classroom", "is", "on", "floor"]
  }
}

Grammar: My classroom is ___ / It is on the ___ floor`;
  }
  
  if (turnNumber >= 15) {
    return `Student said: "${userInput}"

CLOSING - Return JSON:
{
  "story_beat": "Wonderful! Learning about that is so interesting!",
  "task": "You did amazing today${studentName ? ', ' + studentName : ''}! We talked about your teacher, your favorite subject, your friends, and school. I'm proud of how you expressed yourself in English. Keep up the great work!"
}`;
  }
  
  return `Student said: "${userInput}"

Extension turn ${turnNumber}. Ask about lunch, classroom, or what they want to learn.
Use PRESENT SIMPLE only (Week 1 grammar).

Return JSON with story_beat (acknowledgment + encouragement) and task (question).`;
}

/**
 * Helper functions to extract context from student responses
 */
function extractStudentName(history) {
  if (!history || history.length < 2) return null;
  const firstResponse = history.find(m => m.role === 'user');
  if (!firstResponse) return null;
  
  // Extract name from responses like "My name is John" or "I am John" or just "John"
  const text = firstResponse.text;
  const patterns = [
    /(?:my name is|i am|i'm)\s+([a-z]+)/i,
    /^([a-z]+)$/i
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
    }
  }
  return null;
}

function extractNameFromInput(input) {
  const patterns = [
    /(?:my name is|i am|i'm|name is)\s+([a-z]+)/i,
    /^([a-z]+)$/i
  ];
  
  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match && match[1]) {
      return match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
    }
  }
  return null;
}

function extractNumberFromInput(input) {
  const match = input.match(/\b(\d+)\b/);
  return match ? match[1] : null;
}

function extractTeacherName(input) {
  const patterns = [
    /(?:teacher is|teacher's name is)\s+([a-z\s]+)/i,
    /(?:mr|ms|mrs|miss)\.?\s+([a-z]+)/i
  ];
  
  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return null;
}

function extractSubject(input) {
  const subjects = ['math', 'english', 'science', 'art', 'music', 'PE', 'history', 'reading'];
  const lowerInput = input.toLowerCase();
  
  for (const subject of subjects) {
    if (lowerInput.includes(subject)) {
      return subject.charAt(0).toUpperCase() + subject.slice(1);
    }
  }
  return null;
}

/**
 * Quiz mode prompt
 */
function buildQuizPrompt(context, options) {
  const quizType = options.quizType || 'vocabulary';
  const previousQuestions = options.previousQuestions || [];
  
  if (quizType === 'vocabulary') {
    return `Create a vocabulary question for Week ${context.weekId}.
Core vocabulary: ${context.coreVocab.join(', ')}
Don't repeat: ${previousQuestions.join(', ')}

Format as JSON:
{
  "question": "What does '...' mean?",
  "correct_answer": "...",
  "options": ["...", "...", "..."],
  "hint": "Think about..."
}`;
  } else if (quizType === 'math') {
    return `Create a simple math word problem about: ${context.mathFocus}
Don't repeat: ${previousQuestions.join(' | ')}

Format as JSON:
{
  "question": "...",
  "correct_answer": "... (with unit)",
  "explanation": "...",
  "hint": "Remember to include the unit!"
}`;
  } else {
    return `Create a science question about: ${context.scienceFocus}
Don't repeat: ${previousQuestions.join(' | ')}

Format as JSON:
{
  "question": "...",
  "correct_answer": "...",
  "options": ["...", "...", "..."]
}`;
  }
}

/**
 * Pronunciation prompt (not used for AI, but for consistency)
 */
function buildPronunciationPrompt() {
  // Pronunciation uses speech recognition, not AI
  return '';
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

Respond with a counter-argument or follow-up question (2-3 sentences max).
Encourage critical thinking. Ask 1 question to continue debate.

Tutor:`;
}
