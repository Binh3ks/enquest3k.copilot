/**
 * TUTOR ENGINE
 * Single entry point for all AI Tutor interactions
 * Enforces: Context → Prompt → Provider → Schema → Response
 */

import { buildTutorContext, validateContext } from './tutorContext';
import { TutorModes } from './tutorModes';
import { parseResponse } from './tutorSchemas';
import { routeAI } from './providerRouter';
import { buildPrompt } from './tutorPrompts';
import { getWeekRules, buildSyllabusContext } from './syllabusLoader';
import { enforceGrammarScope } from './grammarGuard';

/**
 * Main entry point - runTutor()
 * All UI calls MUST go through this
 */
export async function runTutor({ mode, weekData, userInput = '', options = {} }) {
  const weekId = weekData?.weekId || options.weekId || 1;
  
  // 1. DYNAMIC SYLLABUS INTEGRATION
  const syllabusRules = getWeekRules(weekId);
  const syllabusContext = buildSyllabusContext(weekId);
  
  // 2. BUILD CONTEXT (mandatory)
  // Merge static weekData with dynamic syllabus rules
  const enrichedWeekData = {
    ...weekData,
    ...syllabusRules,
    syllabusContext
  };
  
  const context = buildTutorContext(enrichedWeekData, mode, options);
  
  // 3. VALIDATE CONTEXT
  validateContext(context);
  
  // 4. BUILD PROMPT based on mode
  const prompt = buildPrompt(mode, context, userInput, options);
  
  // 5. ROUTE TO AI PROVIDER
  const rawResponse = await routeAI(prompt, mode);
  
  console.log(`[TutorEngine] AI Response from ${rawResponse.provider} (${rawResponse.duration}ms)`);
  
  // 6. PARSE RESPONSE
  let parsed = parseResponse(rawResponse.text, mode);
  
  // 7. PEDAGOGICAL GUARDRAILS (Tense, Vocab, Patterns)
  try {
    parsed = enforceGrammarScope(parsed, weekId);
  } catch (guardError) {
    console.warn('[TutorEngine] Guard blocked response. Attempting deterministic fallback...', guardError.message);
    
    // DETERMINISTIC FALLBACK (Safe template based on week syllabus)
    const patterns = enrichedWeekData.sentencePatterns || [];
    const fallbackTask = patterns.length > 0 ? patterns[0].replace('___', '...') : 'What is your name?';
    
    parsed = {
      story_beat: "Great job! You are doing so well today!",
      task: fallbackTask,
      scaffold: {
        hints: enrichedWeekData.vocabulary?.mustUse || ['student', 'teacher']
      },
      fallback: true
    };
  }
  
  // 8. RETURN STRUCTURED RESPONSE
  return {
    ...parsed,
    meta: {
      provider: rawResponse.provider,
      duration: rawResponse.duration,
      context,
      mode,
      weekId
    }
  };
}

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
