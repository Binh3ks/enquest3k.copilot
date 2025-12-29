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

/*const grammarRules = getGrammarRules(context.weekId);
  
  const historyText = storyHistory.slice(-6).map(s => s.text).join(' ');
  
  return `Story Mission: ${mission.title || 'Creative Writing'}
Topic: ${context.topic}
Required vocabulary: ${mission.requiredVocab?.join(', ') || context.coreVocab.slice(0, 5).join(', ')}

GRAMMAR SCOPE - Week ${context.weekId}:
✅ Allowed: ${grammarRules.allowed.join(' | ')}
❌ Banned: ${grammarRules.banned.join(' | ')}

Story so far: ${historyText || '(starting)'}

Student wrote: "${userInput}"

Continue story with ONE sentence (3-8 words) using ONLY allowed grammar.
Then provide task and hints using ONLY present simple.

CRITICAL: Hints must ONLY use allowed grammar patterns!

Format as JSON:
{
  "story_beat": "...",
  "task": "...",
  "required_vocab": ["...", "..."],
  "scaffold": {
    "hints": ["word1", "word2", "word3"],
    "sentence_starter": "..."
  }
}

Example hints (Week 1): ["My", "book", "is", "in"]
NEVER use: ["I", "saw", "went", "was"]**
 * Story Mission prompt
 */
function buildStoryMissionPrompt(context, userInput, options) {
  const mission = options.mission || {};
  const storyHistory = options.storyHistory || [];
  
  const historyText = storyHistory.map(s => s.text).join(' ');
  
  return `Story Mission: ${mission.title || 'Creative Writing'}
Topic: ${context.topic}
Required vocabulary: ${mission.requiredVocab?.join(', ') || context.coreVocab.slice(0, 5).join(', ')}

Story so far: ${historyText}

Student wrote: "${userInput}"

Continue story with ONE sentence (3-5 words) about "${context.topic}".
Then provide:
- TASK: What student must do next
- REQUIRED_VOCAB: Words they MUST use
- SCAFFOLD: { hints: [words], sentence_starter: "..." }

Format as JSON:
{
  "story_beat": "...",
  "task": "...",
  "required_vocab": ["...", "..."],
  "scaffold": { "hints": ["..."], "sentence_starter": "..." }
}`;
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
