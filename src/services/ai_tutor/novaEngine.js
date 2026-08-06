/**
 * Nova Engine - Core Pedagogical AI Brain
 * 
 * Single source of truth for AI interaction logic.
 * Centralizes prompt building, context management, and guardrail application.
 * 
 * @module novaEngine
 * @version 1.0.0
 * @created 2026-01-06
 * 
 * ARCHITECTURE:
 * User Input → NovaEngine.sendToNova() 
 *   → buildTutorContext() (syllabus extraction)
 *   → aiRouter.sendToAI() (multi-provider with fallback)
 *   → applyGuardrails() (grammar/talk ratio validation)
 *   → Structured Response
 */

import { sendToAI } from './aiRouter.js';
import { buildPrompt, TutorModes } from './tutorPrompts.js?v=7';
import { getDueToday, getBankStats } from '../../utils/wordMemoryBank.js';
import errorHandler from './utils/errorHandler.js';
import responseParser from './utils/responseParser.js';
import { forceRoleplayQuestion } from './utils/responseParser.js';
import { validateAIResponse } from './grammarGuard.js';
import { enforceTalkRatio } from './talkRatioGuard.js';

/**
 * 🔧 Helper: Extract relevant part of student answer
 * Instead of using full "my name is Bing", extract just "Bing"
 * 
 * @param {string} studentAnswer - Full student response
 * @param {string} template - Question template with {student_answer}
 * @returns {string} Extracted relevant part
 */
function extractRelevantAnswer(studentAnswer, template = '') {
  if (!studentAnswer) return '';
  
  const lowerAnswer = studentAnswer.toLowerCase().trim();
  const lowerTemplate = template.toLowerCase();
  
  // Pattern 1: Name extraction ("my name is X" or "I am X")
  if (lowerTemplate.includes('your name is') || lowerTemplate.includes('name,') || lowerTemplate.includes('meet you')) {
    const namePatterns = [
      /(?:my name is|i am|i'm|name is)\s+([a-z]+)/i,
      /^([a-z]+)$/i // Just the name alone
    ];
    for (const pattern of namePatterns) {
      const match = studentAnswer.match(pattern);
      if (match && match[1]) {
        // Capitalize first letter
        return match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
      }
    }
  }
  
  // Pattern 2: Age extraction ("I am 8 years old" → "8 years old")
  if (lowerTemplate.includes('you are') && (lowerAnswer.includes('years old') || /\b\d+\b/.test(lowerAnswer))) {
    const agePatterns = [
      /i(?:'m| am)\s+(\d+\s+years?\s+old)/i,
      /i(?:'m| am)\s+(\d+)/i
    ];
    for (const pattern of agePatterns) {
      const match = studentAnswer.match(pattern);
      if (match && match[1]) {
        // If just number, add "years old"
        const extracted = match[1];
        return /years/.test(extracted) ? extracted : `${extracted} years old`;
      }
    }
  }
  
  // Pattern 3: School name extraction ("I go to X" or "My school is X")
  if (lowerTemplate.includes('school') && (lowerAnswer.includes('school is') || lowerAnswer.includes('go to'))) {
    const schoolPatterns = [
      /(?:my school is|i go to)\s+(.+)/i
    ];
    for (const pattern of schoolPatterns) {
      const match = studentAnswer.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  }
  
  // Pattern 4: Feeling/state extraction ("I am happy" → "happy")
  if (lowerTemplate.includes('feel') || lowerTemplate.includes('how do you')) {
    const feelingPatterns = [
      /i(?:'m| am)\s+(happy|excited|good|great|nervous|scared|fine|okay)/i
    ];
    for (const pattern of feelingPatterns) {
      const match = studentAnswer.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
  }
  
  // Pattern 5: Yes/No questions → keep full answer
  if (lowerAnswer.startsWith('yes') || lowerAnswer.startsWith('no')) {
    return studentAnswer;
  }

  // Pattern 6: Template ends with "is {student_answer}" → extract predicate after "is"
  // e.g. "My mother is kind" → "kind"; "She is very tall" → "very tall"
  if (/\bis\s*\{student_answer\}/i.test(template)) {
    const predMatch = studentAnswer.match(
      /(?:(?:my|his|her|our|your|it's|it|he|she|they)\s+(?:\w+\s+)?is|(?:is|am|are))\s+(.+)/i
    );
    if (predMatch) {
      return predMatch[1].trim().replace(/[.!?]+$/, '');
    }
    // Student said just the adjective ("kind", "tall", "funny")
    const words = studentAnswer.trim().replace(/[.!?]+$/, '').split(/\s+/);
    if (words.length <= 3) return words.join(' ');
  }

  // Default: Use full answer if can't extract (better than breaking)
  return studentAnswer;
}

/**
 * Nova Engine Class - Core AI Brain
 */
export class NovaEngine {
  /**
   * Initialize Nova Engine with week data and user profile
   * @param {Object} weekData - Current week curriculum data
   * @param {Object} userProfile - Student information
   * @param {string} userProfile.name - Student name
   * @param {number} userProfile.age - Student age
   */
  constructor(weekData, userProfile) {
    this.weekData = weekData;
    this.userProfile = userProfile;
    
    // Validate inputs
    if (!weekData) {
      throw new Error('NovaEngine: weekData is required');
    }
    if (!userProfile || !userProfile.name) {
      throw new Error('NovaEngine: userProfile with name is required');
    }
    
    console.log(`🧠 NovaEngine initialized for Week ${weekData.weekId}, Student: ${userProfile.name}`);
  }

  /**
   * Main entry point: Send message to Nova
   * 
   * @param {Object} params - Request parameters
   * @param {string} params.mode - Learning mode ('story' | 'freetalk' | 'pronunciation' | 'quiz' | 'debate')
   * @param {string} params.userMessage - Student's input message
   * @param {Array} params.chatHistory - Previous conversation [{role, content}]
   * @param {Object} params.context - Additional context (missionId, turnCount, etc.)
   * @param {boolean} params.skipGrammarGuard - Skip grammar validation (default: false)
   * @returns {Promise<AIResponse>} Structured AI response with guardrails applied
   * 
   * @example
   * const nova = new NovaEngine(weekData, { name: 'Alex', age: 8 });
   * const response = await nova.sendToNova({
   *   mode: 'story',
   *   userMessage: 'I like school',
   *   chatHistory: [],
   *   context: { missionId: 1, turnCount: 3 }
   * });
   */
  async sendToNova({ 
    mode, 
    userMessage, 
    chatHistory = [], 
    context = {},
    weekId,  // 🔥 V27: Accept weekId from caller
    skipGrammarGuard = false
  }) {
    const startTime = Date.now();
    
    // 🔥 Use weekId from params if provided, otherwise from weekData
    const effectiveWeekId = weekId || this.weekData?.weekId || 1;
    
    // Validate mode
    const validModes = ['story', 'freetalk', 'translation_help', 'pronunciation', 'quiz', 'quiz_game', 'debate'];
    if (!validModes.includes(mode)) {
      throw new Error(`NovaEngine: Invalid mode "${mode}". Must be one of: ${validModes.join(', ')}`);
    }
    
    console.log(`🎯 NovaEngine.sendToNova() called:`, {
      mode,
      userMessage: userMessage.slice(0, 50) + '...',
      turnCount: context.turnCount || Math.floor(chatHistory.length / 2),
      weekId: effectiveWeekId,
      has20QValidation: !!context.twentyQuestionsValidation,
      twentyQType: context.twentyQuestionsValidation?.type
    });

    try {
      // Step 1: Build context-aware prompt (🔥 Pass chatHistory + currentScenario + currentMission!)
      const systemPrompt = this.buildTutorContext(mode, {
        ...context,
        chatHistory,  // 🔥 CRITICAL: Pass history so AI remembers context
        userMessage,
        weekId: effectiveWeekId,  // 🔥 Pass weekId to context builder
        currentScenario: context.currentScenario,  // 🔥 CRITICAL: Pass roleplay scenario!
        currentMission: context.currentMission,  // 🔥 CRITICAL: Pass story mission with character data!
        wordChainValidation: context.wordChainValidation,  // 🎮 WORD CHAIN: Pass validation
        initialGameHints: context.initialGameHints,  // 🎮 WORD CHAIN: Pass initial hints
        twentyQuestionsValidation: context.twentyQuestionsValidation  // 🎯 20 QUESTIONS: Pass validation
      });

      // 🎯 CODE-VALIDATED GAMES: Check if code wants to bypass AI completely
      console.log('🎯 novaEngine: Checking skipAI', {
        systemPromptType: typeof systemPrompt,
        isObject: typeof systemPrompt === 'object',
        hasSkipAI: typeof systemPrompt === 'object' ? systemPrompt?.skipAI : false
      });

      if (typeof systemPrompt === 'object' && systemPrompt.skipAI) {
        console.log('🎯 Game Validation: Bypassing AI, using code-generated response:', systemPrompt.directResponse?.ai_response?.slice(0, 100));
        // 🔥 CRITICAL: Return full object including skipAI flag for context-aware TTS caching
        return {
          ...systemPrompt.directResponse,
          skipAI: true  // Preserve flag for downstream detection
        };
      }
      
      // Step 2: Call AI Router with error handling and retry logic
      const rawResponse = await errorHandler.handleAIError(
        () => sendToAI({
          systemPrompt,
          chatHistory,
          userMessage,
          weekId: effectiveWeekId,  // 🔥 Use effective weekId
          mode,
          skipGrammarGuard,
          turnCount: context.turnCount || Math.floor(chatHistory.length / 2)
        }),
        mode,
        { maxRetries: 2 }
      );
      
      // Step 3: Parse and validate response
      // 🎮 SPECIAL HANDLING for quiz_game mode (different JSON structure)
      let validatedResponse;
      if (mode === 'quiz_game') {
        // Parse JSON directly without using responseParser (different schema)
        try {
          console.log('🎮 Raw AI response type:', typeof rawResponse);
          console.log('🎮 Raw AI response keys:', typeof rawResponse === 'object' ? Object.keys(rawResponse) : 'N/A');
          
          let gameJson;
          
          // AI response wraps JSON in ai_response field
          if (typeof rawResponse === 'object' && rawResponse.ai_response) {
            console.log('🔧 Extracting JSON from ai_response field');
            let aiResponseText = rawResponse.ai_response;
            
            console.log('🔍 ai_response type:', typeof aiResponseText);
            console.log('🔍 ai_response preview:', typeof aiResponseText === 'string' ? aiResponseText.substring(0, 100) : aiResponseText);
            
            // Parse the JSON string inside ai_response
            if (typeof aiResponseText === 'string') {
              // Remove markdown code blocks
              aiResponseText = aiResponseText.replace(/```json\s*|```/g, '').trim();
              
              // Extract JSON object (everything from first { to last })
              const firstBrace = aiResponseText.indexOf('{');
              const lastBrace = aiResponseText.lastIndexOf('}');
              
              console.log('🔍 JSON positions: first { at', firstBrace, ', last } at', lastBrace);
              
              if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
                const extractedJson = aiResponseText.substring(firstBrace, lastBrace + 1);
                console.log('🔧 Extracted JSON preview:', extractedJson.substring(0, 100));
                gameJson = JSON.parse(extractedJson);
              } else {
                console.warn('⚠️ Could not find JSON braces, trying direct parse');
                gameJson = JSON.parse(aiResponseText);
              }
            } else {
              gameJson = aiResponseText; // Already object
            }
          } else if (typeof rawResponse === 'string') {
            // Remove markdown code blocks if present
            let cleanedResponse = rawResponse.replace(/```json\s*|```/g, '').trim();
            
            // Extract JSON object (everything from first { to last })
            const firstBrace = cleanedResponse.indexOf('{');
            const lastBrace = cleanedResponse.lastIndexOf('}');
            
            if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
              cleanedResponse = cleanedResponse.substring(firstBrace, lastBrace + 1);
              console.log('🔧 Extracted JSON from position', firstBrace, 'to', lastBrace);
            }
            
            gameJson = JSON.parse(cleanedResponse);
          } else if (typeof rawResponse === 'object') {
            gameJson = rawResponse;
          }
          
          // Basic validation for quiz_game schema
          if (!gameJson.game_type || !Array.isArray(gameJson.rounds)) {
            console.error('❌ Invalid game structure:', { has_game_type: !!gameJson.game_type, has_rounds: !!gameJson.rounds, rounds_is_array: Array.isArray(gameJson.rounds) });
            throw new Error('Invalid quiz_game response: missing game_type or rounds');
          }
          
          validatedResponse = gameJson;
          console.log('🎮 Quiz game parsed:', gameJson.game_type, '- Rounds:', gameJson.rounds.length);
        } catch (err) {
          console.error('❌ Failed to parse quiz_game JSON:', err);
          console.error('❌ Raw response type:', typeof rawResponse);
          throw err;
        }
      } else {
        // Normal flow for other modes
        // 🔥 FIX: Handle Groq 'raw' format response
        const responseToProcess = (typeof rawResponse === 'object' && rawResponse.format === 'raw') 
          ? rawResponse.raw 
          : rawResponse;
        
        const parsedResponse = responseParser.parseAIResponse(responseToProcess);
        validatedResponse = responseParser.validateResponse(parsedResponse, mode);
      }
      
      // Step 4: Apply post-processing guardrails (skip for quiz_game)
      const processedResponse = mode === 'quiz_game' 
        ? validatedResponse 
        : this.applyGuardrails(validatedResponse, mode, context);
      
      console.log('🛡️ NovaEngine guardrails applied for mode:', mode);
      
      const elapsed = Date.now() - startTime;
      console.log(`✅ NovaEngine response ready in ${elapsed}ms`);
      
      return processedResponse;
      
    } catch (error) {
      console.error('❌ NovaEngine.sendToNova() error:', error);
      errorHandler.logError(error, { mode, weekId: this.weekData.weekId, context });
      
      // Return fallback response on critical error
      return errorHandler.getFallbackResponse(mode, error);
    }
  }

  /**
   * Build context-aware system prompt based on mode
   * @private
   */
  buildTutorContext(mode, contextParams) {
    // 🔥 CRITICAL: Keep mode as-is for PRIORITY checks in tutorPrompts.js!
    // tutorPrompts PRIORITY 0 checks for mode === 'story'
    // Do NOT transform to 'story_mission' or check will fail!
    
    // 🔥 DEBUG: Log context params to verify chatHistory is passed
    console.log('🔍 buildTutorContext - contextParams:', {
      mode,
      hasUserMessage: !!contextParams?.userMessage,
      hasChatHistory: !!contextParams?.chatHistory,
      chatHistoryLength: contextParams?.chatHistory?.length || 0
    });
    
    // Build context object expected by tutorPrompts.js
    const context = {
      weekId: contextParams.weekId || this.weekData.weekId || 1,  // 🔥 V27: Use weekId from params if provided
      unitTitle: this.weekData.weekTitle_en || this.weekData.weekTitle || 'Learning English',
      topic: this.weekData.theme || 'General conversation',
      coreVocab: this.extractVocabulary(),
      learner: {
        name: this.userProfile.name,
        age: this.userProfile.age || 8,
        level: this.userProfile.level || 'A0'
      },
      constraints: {
        aiMaxSentences: 2,
        aiMaxWords: 25,
        userMinWords: 5,
        userTargetWords: 15
      },
      turnManager: contextParams.turnManager || null,  // 🔥 CRITICAL: Pass TurnManager reference
      currentScenario: contextParams.currentScenario || null,  // 🔥 CRITICAL: Pass roleplay scenario!
      currentMission: contextParams.currentMission || null,  // 🔥 CRITICAL: Pass story mission with character!
      gameType: contextParams.gameType || null,  // 🔥 CRITICAL: Pass game type for quiz_game mode!
      activeGame: contextParams.activeGame || null,  // 🎮 CRITICAL: Pass active game state (id, secretObject, etc.)
      wordChainValidation: contextParams.wordChainValidation || null,  // 🎮 WORD CHAIN: Pass validation result
      initialGameHints: contextParams.initialGameHints || null,  // 🎮 WORD CHAIN: Pass initial hints
      twentyQuestionsValidation: contextParams.twentyQuestionsValidation || null,  // 🎯 20 QUESTIONS: Pass validation
      weekData: this.weekData  // 🎮 Pass full weekData for game content
    };
    
    // Additional options for specific modes
    const options = {
      weekData: this.weekData,  // 🔥 V27: Pass full weekData for V27 format detection
      context: context  // 🎮 Pass context to options for freeTalkModes.js access
    };
    
    if (mode === 'story') {
      // Extract mission from weekData
      // 🔥 CRITICAL FIX: Use missionIndex (array position), NOT missionId (1-based ID)
      const missionIndex = contextParams.missionIndex ?? (contextParams.missionId ? contextParams.missionId - 1 : 0);
      const missions = this.weekData?.story_missions || this.weekData?.storyMissions || [];
      const currentMission = contextParams.currentMission || contextParams.missionData || missions[missionIndex];
      
      if (!currentMission) {
        console.error('❌ NovaEngine: Mission not found for index:', missionIndex);
      }
      
      // 🔥 CRITICAL: Pass FULL mission data (title, context, target_vocab, conversation_topics)
      const missionId = currentMission?.mission_id || (missionIndex !== undefined ? missionIndex + 1 : 1);
      
      options.mission = {
        mission_id: missionId,  // 🔥 FIX: Add mission_id
        title: currentMission?.title || 'Story Practice',
        description: currentMission?.mission_context || currentMission?.description || 'Practice vocabulary through story',
        targetVocabulary: (currentMission?.target_vocab || this.extractVocabulary()).map(word => 
          typeof word === 'string' ? { word } : word
        ),
        conversation_topics: currentMission?.conversation_topics || [],
        minimum_turns: currentMission?.minimum_turns || 10
      };
      
      // 🔥 FIX: Pass missionId to options (for tutorPrompts)
      options.missionId = missionId;
      options.missionIndex = missionIndex;
      
      // 🔥 CRITICAL: Pass chat history to tutorPrompts so AI remembers context
      options.history = contextParams.chatHistory || [];

      // 🔥 PRE-COMPUTE next question from story_arc (Conversation Card approach)
      // This way tutorPrompts.js doesn't need to do any math — just inject the text.
      if (currentMission?.story_arc) {
        const chatHistory = contextParams.chatHistory || [];
        const studentMessages = chatHistory.filter(m => m.role === 'user');
        const studentMsgCount = studentMessages.length;
        const lastStudentMsg = studentMessages[studentMessages.length - 1]?.content || '';

        // ⚡ 0ms INSTANT OPENING: Return opening_narrative immediately without LLM network call
        if (studentMsgCount === 0 || contextParams.isOpeningTurn || !lastStudentMsg) {
          const openingText = currentMission.opening_narrative || currentMission.nova_greeting;
          if (openingText) {
            console.log('⚡ 0ms INSTANT OPENING NARRATIVE:', openingText);
            return {
              skipAI: true,
              directResponse: {
                ai_response: openingText,
                suggested_hints: currentMission.default_hints || ['yes'],
                hints: currentMission.default_hints || ['yes'],
                mission_status: 'started',
                ack: '',
                recast: '',
                question: openingText
              }
            };
          }
        }

        // studentMsgCount=1 (first reply to opening greeting) → targetIndex = 0 (phase_questions[0])
        // studentMsgCount=2 (reply to question 1) → targetIndex = 1 (phase_questions[1]), etc.
        const targetIndex = Math.max(0, studentMsgCount - 1);

        let cumulative = 0;
        let nextQuestion = null;
        let nextHints = [];
        let tmpl = '';  // declared in outer scope so it's accessible after the loop
        for (const phase of currentMission.story_arc) {
          const phaseQs = phase.phase_questions || [];
          if (targetIndex < cumulative + phaseQs.length) {
            const q = phaseQs[targetIndex - cumulative];
            tmpl = typeof q === 'object' ? q.template : (q || '');
            // Resolve {student_answer} placeholder and strip "(After xxx)" prefix
            // 🔧 FIX: Extract relevant part of answer instead of using full text
            const extractedAnswer = extractRelevantAnswer(lastStudentMsg, tmpl);
            nextQuestion = tmpl
              .replace(/^\(After [^)]+\)\s*/i, '')
              .replace(/\{student_answer\}/g, extractedAnswer);
            nextHints = (typeof q === 'object' ? q.hints : null) || [];
            break;
          }
          cumulative += phaseQs.length;
        }
        context.nextQuestion = nextQuestion;
        context.nextQuestionHints = nextHints;
        console.log(`🎯 Pre-computed nextQuestion (student turn ${studentMsgCount}):`, nextQuestion?.slice(0, 90));

        // 🃏 OFF-TOPIC DETECTION: Student asked question back?
        // → Don't use Card Mode; let LLM handle naturally with soft bridge prompt.
        // NOTE: Short 1-3 word student answers ("the captain", "camping") are 100% ON-TOPIC for kids!
        const isStudentQuestion = (msg) => /[^.!?]\?$/.test(msg.trim());
        const studentAskedBack = isStudentQuestion(lastStudentMsg);
        const isOffTopic = studentAskedBack;
        if (isOffTopic) {
          context.storySoftPrompt = true;
          context.storyTargetQuestion = nextQuestion;
          console.log(`🌉 Soft Prompt: studentAskedBack=${studentAskedBack}`);
        }

        // 🃏 CARD MODE: Skip AI entirely — deliver pre-computed question + JS-generated ACK
        // Used for ALL story_arc missions (both Conversation Cards and Story Missions with story_character).
        // LLMs are unreliable at following "YOUR NEXT LINE" → loop on same question.
        // ACK + pronoun switch is done here in JS for 100% consistency.
        const recastStudent = (text) => {
          if (!text) return '';
          let t = text.trim().replace(/[!?.]+$/, '').trim();
          // DO NOT prefix "Yes! " when student simply answers "yes" or "ok"
          if (/^(yes|yeah|sure|ok|okay|yep|ready|let's go|i want|please)\b/i.test(t)) {
            return '';
          }
          t = t.replace(/^yes,?\s+i can\b/gi, 'You can');  // "Yes, I can X" → "You can X"
          t = t.replace(/\bwe drove\b/gi, 'You drove');
          t = t.replace(/\bwe went\b/gi, 'You went');
          t = t.replace(/\bwe saw\b/gi, 'You saw');
          t = t.replace(/\bwe found\b/gi, 'You found');
          t = t.replace(/\bwe took\b/gi, 'You took');
          t = t.replace(/\bwe came\b/gi, 'You came');
          t = t.replace(/\bwe gave\b/gi, 'You gave');
          t = t.replace(/\bwe made\b/gi, 'You made');
          t = t.replace(/\bwe rode\b/gi, 'You rode');
          t = t.replace(/\bwe\b/gi, 'You');
          t = t.replace(/\bour\b/gi, 'your');
          t = t.replace(/\bI can\b/gi, 'You can');
          t = t.replace(/\bI am\b/gi, 'You are');
          t = t.replace(/\bI'm\b/gi, "You're");
          t = t.replace(/\bmy\b/gi, 'your');
          t = t.replace(/\bI\b/g, 'You');
          return t.charAt(0).toUpperCase() + t.slice(1);
        };
        // Story arc questions already contain ACK + recast (via {student_answer}) built-in.
        // Adding a second JS ACK causes "Wonderful! Wonderful! Your mother is My mother is kind!".
        // Rule: if the template had {student_answer} → story arc owns the ACK, use nextQuestion as-is.
        //       if no {student_answer}  → story arc has no echo, add JS recast for naturalness.
        const templateHadRecast = tmpl.includes('{student_answer}');
        const recast = (!templateHadRecast && lastStudentMsg) ? recastStudent(lastStudentMsg) : null;
        const finalResponse = recast ? `${recast}! ${nextQuestion}` : nextQuestion;

        if (nextQuestion && studentMsgCount >= 1 && !isOffTopic) {
          console.log(`🃏 Card Mode: Skipping AI, recast="${recast}", nextQ="${nextQuestion?.slice(0, 60)}"`);
          return {
            skipAI: true,
            directResponse: {
              ai_response: finalResponse,
              suggested_hints: nextHints,
              hints: nextHints,
              mission_status: 'in_progress',
              ack: '',   // ACK is already inside nextQuestion (story arc format)
              recast: recast || '',  // JS recast only added when story_arc has no {student_answer}
              question: nextQuestion // Next question: "Where are you from? Say..."
            }
          };
        }
      }

      // 🔥 Pass turnCount into context so tutorPrompts can access it
      context.turnCount = contextParams.turnCount || Math.floor((contextParams.chatHistory?.length || 0) / 2);

      console.log('📜 Story mode - Mission:', options.mission.title);
      console.log('🎯 Mission context:', options.mission.description?.slice(0, 100));
      console.log('💬 Chat history:', options.history.length, 'messages');      console.log('🧠 TurnManager:', contextParams.turnManager ? 'PASSED ✅' : 'MISSING ❌');    }
    
    if (mode === 'freetalk' || mode === 'translation_help') {
      // 🔥 CRITICAL: Pass chat history to tutorPrompts
      options.history = contextParams.chatHistory || [];
      options.turnCount = contextParams.turnCount || Math.floor((contextParams.chatHistory?.length || 0) / 2);
      options.isOpeningTurn = contextParams.isOpeningTurn || false;
      options.weekData = this.weekData;  // 🔥 FIX: Pass weekData for game vocab system
      // 💬 SPARK TALK: forward spark context so buildChatPrompt can use the override
      options.storyBridge = contextParams.storyBridge || null;
      options.sparkSeed = contextParams.sparkSeed || null;
      options.scaffoldFrames = contextParams.scaffoldFrames || [];
      options.vocabFocus = contextParams.vocabFocus || [];

      // 🧠 SRS CONTEXT: Pass due words and stats so Nova adapts to what student knows
      try {
        const dueWords = getDueToday(8);
        const stats = getBankStats();
        options.srsContext = {
          dueWords: dueWords.map(w => w.word).filter(Boolean).slice(0, 8),
          masteredCount: stats.mastered || 0,
          totalWords: stats.total || 0,
          weekNumber: this.weekData.weekId || contextParams.weekId || 1,
        };
      } catch (_) {
        options.srsContext = null;
      }

      console.log('💬 Freetalk/translation mode - passing context:', {
        mode,
        historyLength: options.history.length,
        turnCount: options.turnCount,
        isOpeningTurn: options.isOpeningTurn,
        weekId: this.weekData.weekId,
        srsWords: options.srsContext?.dueWords?.length || 0
      });
    }
    
    // Build prompt using tutorPrompts.js
    // 🔥 CRITICAL: Pass original mode ('story', 'freetalk') NOT transformed (e.g., 'story_mission')
    // tutorPrompts PRIORITY checks require exact mode names!
    return buildPrompt(mode, context, contextParams.userMessage || '', options);
  }
  
  /**
   * Extract vocabulary from weekData (support multiple formats)
   * @private
   */
  extractVocabulary() {
    if (this.weekData.vocab?.words) {
      return this.weekData.vocab.words.map(v => v.word);
    }
    if (this.weekData.global_vocab) {
      return this.weekData.global_vocab.map(v => v.word);
    }
    if (this.weekData.vocabulary) {
      return this.weekData.vocabulary.map(v => v.word || v);
    }
    // Fallback
    return ['student', 'teacher', 'school', 'book', 'learn'];
  }

  /**
   * Apply post-processing guardrails to AI response
   * @private
   */
  applyGuardrails(response, mode, context) {
    // Grammar validation already done in aiRouter.js
    // This is for additional processing if needed
    
    // 🔥 NEW: Support both old format (ai_response) and new format (ack/recast/question)
    const isNewFormat = response.ack !== undefined || response.question !== undefined;
    
    let processedResponse = {
      // Support both formats
      ai_response: response.ai_response || response.response || response,
      ack: response.ack || '',
      recast: response.recast || '',
      question: response.question || '',
      hints: response.hints || response.suggested_hints || [],
      pedagogy_note: response.pedagogy_note || '',
      suggested_hints: response.suggested_hints || response.hints || [],
      mission_status: response.mission_status || null,
      grammar_focus: response.grammar_focus || null,
      raw: response,
      format: isNewFormat ? 'new' : 'legacy'
    };
    
    // 🛡️ STEP 3: Apply roleplay question enforcement
    // Trigger when: mode is 'playing_roleplay' OR currentScenario exists in context
    if ((mode === 'playing_roleplay' || mode === 'freetalk' || mode === 'roleplay') && context.currentScenario) {
      console.log('🛡️ Applying roleplay guardrail in novaEngine for mode:', mode);
      
      // Use the currentScenario from context (already validated)
      const activeScenario = context.currentScenario;
      
      // Call forceRoleplayQuestion with 'playing_roleplay' mode
      processedResponse = forceRoleplayQuestion(
        processedResponse, 
        'playing_roleplay',  // Always use 'playing_roleplay' to trigger guardrail
        activeScenario, 
        context.lastUserMessage || ''
      );
    }

    // Sanitize response content for security (handle both formats)
    if (isNewFormat) {
      // New format: sanitize each field
      if (processedResponse.ack) {
        processedResponse.ack = responseParser.sanitizeResponse(processedResponse.ack);
      }
      if (processedResponse.recast) {
        processedResponse.recast = responseParser.sanitizeResponse(processedResponse.recast);
      }
      if (processedResponse.question) {
        processedResponse.question = responseParser.sanitizeResponse(processedResponse.question);
      }
    } else {
      // Old format: sanitize ai_response
      if (typeof processedResponse.ai_response === 'string') {
        processedResponse.ai_response = responseParser.sanitizeResponse(processedResponse.ai_response);
      }
    }

    // Validate required fields (handle both formats)
    const responseText = isNewFormat 
      ? (processedResponse.question || '')
      : (processedResponse.ai_response || '');
      
    if (!responseText || responseText.length < 10) {
      console.warn('⚠️ NovaEngine: Response too short, using safe fallback');
      if (isNewFormat) {
        processedResponse.question = 'Tell me more!';
      } else {
        processedResponse.ai_response = 'Tell me more!';
      }
    }

    // Ensure hints are provided for question-based modes
    if (mode === 'story' || mode === 'freetalk') {
      const hasQuestion = isNewFormat 
        ? (processedResponse.question && processedResponse.question.includes('?'))
        : (processedResponse.ai_response && processedResponse.ai_response.includes('?'));
        
      const hasHints = processedResponse.suggested_hints && processedResponse.suggested_hints.length > 0;
      
      if (hasQuestion && !hasHints) {
        console.warn('⚠️ NovaEngine: Question asked but no hints provided, extracting from question');
        const questionText = isNewFormat ? processedResponse.question : processedResponse.ai_response;
        processedResponse.suggested_hints = responseParser.extractHintsFromQuestion(
          questionText,
          this.getFallbackHints(mode)
        );
        // Also update hints field for new format
        if (isNewFormat) {
          processedResponse.hints = processedResponse.suggested_hints;
        }
      }
    }

    return processedResponse;
  }

  /**
   * Get fallback hints when AI doesn't provide them
   * @private
   */
  getFallbackHints(mode) {
    const basicHints = ['I', 'like', 'my', 'is', 'am', 'have'];
    
    // Add mode-specific hints if available
    if (mode === 'story' && this.weekData.vocab?.words) {
      const vocabWords = this.weekData.vocab.words.slice(0, 3).map(v => v.word);
      return [...basicHints, ...vocabWords].slice(0, 6);
    }
    
    return basicHints;
  }

  /**
   * Update week data (e.g., when user switches weeks)
   */
  updateWeekData(newWeekData) {
    if (!newWeekData) {
      throw new Error('NovaEngine: Cannot update with null weekData');
    }
    this.weekData = newWeekData;
    console.log(`🔄 NovaEngine: Updated to Week ${newWeekData.weekId}`);
  }

  /**
   * Update user profile (e.g., after progress assessment)
   */
  updateUserProfile(newProfile) {
    if (!newProfile || !newProfile.name) {
      throw new Error('NovaEngine: Cannot update with invalid profile');
    }
    this.userProfile = { ...this.userProfile, ...newProfile };
    console.log(`🔄 NovaEngine: Updated profile for ${newProfile.name}`);
  }

  /**
   * Get current engine state (for debugging)
   */
  getState() {
    return {
      weekId: this.weekData.weekId,
      userName: this.userProfile.name,
      userAge: this.userProfile.age,
      grammarScope: this.weekData.grammar?.scope || 'Not specified',
      vocabCount: this.weekData.vocab?.words?.length || 0
    };
  }
}

/**
 * Factory function to create NovaEngine instance
 * @param {Object} weekData - Week curriculum data
 * @param {Object} userProfile - Student information
 * @returns {NovaEngine}
 */
export function createNovaEngine(weekData, userProfile) {
  return new NovaEngine(weekData, userProfile);
}

/**
 * Export default instance creator
 */
export default NovaEngine;
