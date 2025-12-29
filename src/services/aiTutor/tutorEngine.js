/**
 * TUTOR ENGINE
 * Single entry point for all AI Tutor interactions
 * Enforces: Context → Prompt → Provider → Schema → Response
 */

import { buildTutorContext, validateContext } from './tutorContext';
import { TutorModes } from './tutorModes';
import { parseResponse, ChatResponseSchema, StoryMissionSchema, QuizResponseSchema } from './tutorSchemas';
import { routeAI } from './providerRouter';
import { buildPrompt } from './tutorPrompts';

/**
 * Main entry point - runTutor()
 * All UI calls MUST go through this
 * 
 * @param {Object} params
 * @param {string} params.mode - TutorModes value
 * @param {Object} params.weekData - Week content data
 * @param {string} params.userInput - User's input (if any)
 * @param {Object} params.options - Additional options
 * @returns {Promise<Object>} Parsed AI response
 */
export async function runTutor({ mode, weekData, userInput = '', options = {} }) {
  // 1. BUILD CONTEXT (mandatory)
  const context = buildTutorContext(weekData, mode, options);
  
  // 2. VALIDATE CONTEXT (throw if invalid)
  validateContext(context);
  
  // 3. BUILD PROMPT based on mode
  const prompt = buildPrompt(mode, context, userInput, options);
  
  // 4. ROUTE TO AI PROVIDER
  const rawResponse = await routeAI(prompt, mode);
  
  // 5. PARSE WITH MODE (not schema object)
  const parsed = parseResponse(rawResponse.text, mode);
  
  // 6. RETURN STRUCTURED RESPONSE
  return {
    ...parsed,
    meta: {
      provider: rawResponse.provider,
      duration: rawResponse.duration,
      context,
      mode
    }
  };
}

/**
 * Convenience function for chat mode
 */
export async function runChat(weekData, userMessage, options = {}) {
  return runTutor({
    mode: TutorModes.CHAT,
    weekData,
    userInput: userMessage,
    options
  });
}

/**
 * Convenience function for story mission
 */
export async function runStoryMission(weekData, userSentence, options = {}) {
  return runTutor({
    mode: TutorModes.STORY_MISSION,
    weekData,
    userInput: userSentence,
    options
  });
}

/**
 * Convenience function for quiz
 */
export async function runQuiz(weekData, options = {}) {
  return runTutor({
    mode: TutorModes.QUIZ,
    weekData,
    userInput: '',
    options
  });
}
