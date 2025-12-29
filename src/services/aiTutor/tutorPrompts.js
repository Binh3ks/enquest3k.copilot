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
 * System prompt (applies to ALL modes)
 */
function buildSystemPrompt(context) {
  const { weekId, unitTitle, learner, constraints } = context;
  
  return `You are an ESL teacher for ${learner.level} learners (Week ${weekId}: "${unitTitle}").

CORE RULES:
- Force student language production (student must speak/write more than you)
- Your response: MAX ${constraints.aiMaxSentences} sentences, MAX ${constraints.aiMaxWords} words
- Student target: ${constraints.userMinWords}-${constraints.userTargetWords} words
- If student doesn't speak enough, USE SCAFFOLD (don't answer for them)
- Stay on topic: "${context.topic}"
- Focus grammar: "${context.grammarFocus}"

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
      return buildPronunciationPrompt(context, options);
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
  
  return `Scenario: ${scenario}
Topic: ${context.topic}
Core vocabulary: ${context.coreVocab.slice(0, 5).join(', ')}

${historyText}
Student: ${userInput}

Respond naturally in 1 short sentence. Stay on topic "${context.topic}". Ask 1 simple question about "${context.topic}".

Tutor:`;
}

/**
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
function buildPronunciationPrompt(context, options) {
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
