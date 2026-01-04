/**
 * Nova Engine V3 - The Pedagogical AI Brain
 * 
 * Responsibilities:
 * - Build pedagogical context from syllabus
 * - Send chat requests to backend AI proxy
 * - Enforce guardrails (grammar, talk ratio, pedagogy)
 * - Return structured response: { ai_response, pedagogy_note, mission_status, suggested_hints, grammar_focus }
 */

import { getAiTutorResponse } from '../api.js';
import { getCurrentWeekData } from '../../data/weekData.js';

// ============================================
// CORE ENGINE
// ============================================

/**
 * Main entry point for all AI Tutor interactions
 * @param {Object} params - Request parameters
 * @param {string} params.mode - 'story' | 'freetalk' | 'pronunciation' | 'quiz' | 'debate'
 * @param {string} params.weekId - Current week (e.g., 'week-1')
 * @param {Array} params.chatHistory - Array of {role, content} messages
 * @param {Object} params.userProfile - {name, age, learnerStyle, vocabMastery}
 * @param {string} params.userMessage - Latest user input
 * @returns {Promise<NovaResponse>}
 */
export async function sendToNova({ mode, weekId, chatHistory, userProfile, userMessage }) {
  try {
    // STEP 1: Build Tutor Context (Syllabus-Driven)
    const tutorContext = buildTutorContext(weekId, mode);
    
    // STEP 2: Build structured prompt
    const prompt = buildNovaPrompt({
      mode,
      tutorContext,
      userProfile,
      chatHistory,
      userMessage
    });

    // STEP 3: Send to backend AI proxy
    const response = await getAiTutorResponse({
      messages: [
        { role: 'system', content: prompt.system },
        ...chatHistory,
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    // STEP 4: Parse and validate response
    const aiOutput = response.data.message || response.data.reply || '';
    
    // STEP 5: Apply Guardrails
    const guardResult = applyGuardrails(aiOutput, tutorContext, userMessage);
    
    if (guardResult.violation) {
      // Deterministic fallback
      return createFallbackResponse(guardResult.violation, tutorContext);
    }

    // STEP 6: Generate Intent-Aware Hints
    const hints = generateHints(aiOutput, tutorContext, mode);

    // STEP 7: Return structured response
    return {
      ai_response: aiOutput,
      pedagogy_note: guardResult.note || '',
      mission_status: calculateMissionStatus(chatHistory, tutorContext),
      suggested_hints: hints,
      grammar_focus: tutorContext.allowedGrammar
    };

  } catch (error) {
    console.error('Nova Engine Error:', error);
    return createErrorResponse(error);
  }
}

// ============================================
// TUTOR CONTEXT BUILDER
// ============================================

/**
 * Build syllabus-driven context for AI
 * @param {string} weekId - Current week
 * @param {string} mode - Interaction mode
 * @returns {TutorContext}
 */
function buildTutorContext(weekId, mode) {
  const weekData = getCurrentWeekData(weekId);
  
  if (!weekData) {
    throw new Error(`Week data not found for ${weekId}`);
  }

  return {
    weekId,
    mode,
    topic: weekData.topic || 'General English',
    targetVocabulary: weekData.vocabulary || [],
    allowedGrammar: weekData.grammar?.allowed || ['Simple Present', 'be verb'],
    bannedGrammar: weekData.grammar?.banned || ['Past Simple', 'Future', 'Present Perfect'],
    bannedWords: weekData.grammar?.bannedWords || ['went', 'saw', 'will', 'going to', 'have been'],
    ageGroup: '6-12',
    proficiencyLevel: 'A0++',
    maxAiTalkRatio: 0.8
  };
}

// ============================================
// PROMPT BUILDER
// ============================================

function buildNovaPrompt({ mode, tutorContext, userProfile, chatHistory, userMessage }) {
  const persona = getNovaPersona();
  const modeInstructions = getModeInstructions(mode, tutorContext);
  
  const systemPrompt = `${persona}

**CURRENT CONTEXT:**
- Week: ${tutorContext.weekId}
- Topic: ${tutorContext.topic}
- Mode: ${mode}
- Student: ${userProfile?.name || 'Student'} (age ${userProfile?.age || '8'})
- Learner Style: ${userProfile?.learnerStyle || 'normal'}

**SYLLABUS CONSTRAINTS:**
ALLOWED GRAMMAR: ${tutorContext.allowedGrammar.join(', ')}
BANNED GRAMMAR: ${tutorContext.bannedGrammar.join(', ')}
BANNED WORDS: ${tutorContext.bannedWords.join(', ')}

TARGET VOCABULARY (must encourage usage):
${tutorContext.targetVocabulary.map(v => `- ${v.word}: ${v.meaning}`).join('\n')}

**MODE-SPECIFIC INSTRUCTIONS:**
${modeInstructions}

**MANDATORY RULES:**
1. Respond in 2-3 sentences maximum
2. ALWAYS end with ONE clear question
3. Never use banned grammar or words
4. Use the Recast Technique (model correct form without saying "wrong")
5. Keep AI:Student talk ratio <= 0.8
6. Be encouraging, witty, patient

**RESPONSE FORMAT:**
[Encouragement] [Recast if needed] [One clear question]`;

  return {
    system: systemPrompt,
    user: userMessage
  };
}

function getNovaPersona() {
  return `You are Ms. Nova, an AI ESL Coach for Vietnamese children (ages 6-12, A0++ level).
You are warm, patient, witty, and super encouraging. Your mission is to make students PRODUCE language.
You speak less than the student. You never say "wrong" or "incorrect" - you model the correct form naturally.`;
}

function getModeInstructions(mode, context) {
  const instructions = {
    story: `You are guiding a story-based mission. The student must use target vocabulary to complete the mission. 
Acknowledge their input, then advance the story with ONE question that requires using a target word.`,
    
    freetalk: `Have a casual conversation, but subtly encourage using target vocabulary from this week's topic: "${context.topic}".
Ask about their interests, dreams, or daily life. Keep it fun and natural.`,
    
    pronunciation: `You are coaching pronunciation. Provide the target word, model it, and ask the student to repeat.
Give encouraging feedback on their attempt.`,
    
    quiz: `Ask ONE question about this week's vocabulary or grammar. 
Accept the answer, provide gentle correction if needed, then move to the next question.`,
    
    debate: `Present a simple opinion about the week's topic. Ask the student if they agree or disagree, and why.
Keep it age-appropriate and encourage them to express their thoughts.`
  };

  return instructions[mode] || instructions.freetalk;
}

// ============================================
// GUARDRAILS
// ============================================

/**
 * Apply pedagogical guardrails to AI response
 * @param {string} aiOutput - Raw AI response
 * @param {TutorContext} context - Syllabus context
 * @param {string} userMessage - User's input
 * @returns {GuardResult}
 */
function applyGuardrails(aiOutput, context, userMessage) {
  // TENSE GUARD: Check for banned words
  const foundBannedWord = context.bannedWords.find(word => 
    new RegExp(`\\b${word}\\b`, 'i').test(aiOutput)
  );
  
  if (foundBannedWord) {
    return {
      violation: 'banned_grammar',
      note: `Detected banned word: "${foundBannedWord}"`
    };
  }

  // TALK RATIO GUARD
  const aiWordCount = aiOutput.split(/\s+/).length;
  const userWordCount = userMessage.split(/\s+/).length;
  const ratio = userWordCount > 0 ? aiWordCount / userWordCount : 1;

  if (ratio > context.maxAiTalkRatio && userWordCount > 5) {
    return {
      violation: 'talk_ratio_exceeded',
      note: `AI talked too much (${aiWordCount} words vs student's ${userWordCount})`
    };
  }

  // QUESTION GUARD: Must end with a question
  if (!aiOutput.includes('?')) {
    return {
      violation: 'missing_question',
      note: 'Response must end with a question'
    };
  }

  return { violation: null, note: 'All checks passed' };
}

// ============================================
// FALLBACK & ERROR HANDLERS
// ============================================

function createFallbackResponse(violation, context) {
  const fallbacks = {
    banned_grammar: "That's interesting! Tell me more using simple words.",
    talk_ratio_exceeded: "Great! What else can you tell me?",
    missing_question: "I see! What do you think about that?"
  };

  return {
    ai_response: fallbacks[violation] || "Tell me more!",
    pedagogy_note: `Fallback triggered: ${violation}`,
    mission_status: 'in_progress',
    suggested_hints: ['Try using simple words', 'What do you think?'],
    grammar_focus: context.allowedGrammar
  };
}

function createErrorResponse(error) {
  return {
    ai_response: "Oops! Let's try that again. What were you saying?",
    pedagogy_note: `Error: ${error.message}`,
    mission_status: 'error',
    suggested_hints: ['Try a different way to say it'],
    grammar_focus: []
  };
}

// ============================================
// HINT ENGINE V2 (Intent-Aware)
// ============================================

function generateHints(aiResponse, context, mode) {
  const hints = [];

  // Extract the question from AI response
  const questionMatch = aiResponse.match(/([^.!?]*\?)/);
  const question = questionMatch ? questionMatch[0] : '';

  if (mode === 'story' || mode === 'freetalk') {
    // Suggest sentence starters based on question type
    if (question.toLowerCase().includes('what')) {
      hints.push('I think...', 'It is...');
    } else if (question.toLowerCase().includes('where')) {
      hints.push('It is in...', 'At the...');
    } else if (question.toLowerCase().includes('do you') || question.toLowerCase().includes('are you')) {
      hints.push('Yes, I...', 'No, I...');
    }

    // Add target vocabulary hints
    const unusedVocab = context.targetVocabulary.slice(0, 3);
    unusedVocab.forEach(v => {
      hints.push(`Use: ${v.word}`);
    });
  }

  return hints.slice(0, 4); // Max 4 hints
}

// ============================================
// MISSION STATUS CALCULATOR
// ============================================

function calculateMissionStatus(chatHistory, context) {
  // Simple logic: check if target vocabulary has been used
  const allMessages = chatHistory.map(m => m.content).join(' ');
  const usedVocabCount = context.targetVocabulary.filter(v => 
    new RegExp(`\\b${v.word}\\b`, 'i').test(allMessages)
  ).length;

  const progress = context.targetVocabulary.length > 0 
    ? (usedVocabCount / context.targetVocabulary.length) * 100 
    : 0;

  if (progress >= 80) return 'completed';
  if (progress >= 40) return 'in_progress';
  return 'started';
}

// ============================================
// EXPORTS
// ============================================

export default sendToNova;
