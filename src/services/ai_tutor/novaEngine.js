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
import { buildPrompt, TutorModes } from './tutorPrompts.js?v=5';
import errorHandler from './utils/errorHandler.js';
import responseParser from './utils/responseParser.js';
import { validateAIResponse } from './grammarGuard.js';
import { enforceTalkRatio } from './talkRatioGuard.js';

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
   * Main entry point: Send message to Ms. Nova
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
    const validModes = ['story', 'freetalk', 'pronunciation', 'quiz', 'debate'];
    if (!validModes.includes(mode)) {
      throw new Error(`NovaEngine: Invalid mode "${mode}". Must be one of: ${validModes.join(', ')}`);
    }
    
    console.log(`🎯 NovaEngine.sendToNova() called:`, {
      mode,
      userMessage: userMessage.slice(0, 50) + '...',
      turnCount: context.turnCount || Math.floor(chatHistory.length / 2),
      weekId: effectiveWeekId
    });

    try {
      // Step 1: Build context-aware prompt (🔥 Pass chatHistory!)
      const systemPrompt = this.buildTutorContext(mode, {
        ...context,
        chatHistory,  // 🔥 CRITICAL: Pass history so AI remembers context
        userMessage,
        weekId: effectiveWeekId  // 🔥 Pass weekId to context builder
      });
      
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
      const parsedResponse = responseParser.parseAIResponse(rawResponse);
      const validatedResponse = responseParser.validateResponse(parsedResponse, mode);
      
      // Step 4: Apply post-processing guardrails
      const processedResponse = this.applyGuardrails(validatedResponse, mode, context);
      
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
    // Map mode names: novaEngine uses 'story', tutorPrompts expects 'story_mission'
    const modeMap = {
      'story': TutorModes.STORY_MISSION,
      'freetalk': TutorModes.CHAT,
      'pronunciation': TutorModes.PRONUNCIATION,
      'quiz': TutorModes.QUIZ,
      'debate': TutorModes.DEBATE
    };
    
    const tutorMode = modeMap[mode] || TutorModes.CHAT;
    
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
      turnManager: contextParams.turnManager || null  // 🔥 CRITICAL: Pass TurnManager reference
    };
    
    // Additional options for specific modes
    const options = {
      weekData: this.weekData  // 🔥 V27: Pass full weekData for V27 format detection
    };
    
    if (mode === 'story') {
      // Extract mission from weekData
      // 🔥 CRITICAL FIX: Use missionIndex (array position), NOT missionId (1-based ID)
      const missionIndex = contextParams.missionIndex ?? contextParams.missionId - 1 ?? 0;
      const missions = this.weekData.story_missions || this.weekData.storyMissions || [];
      const currentMission = missions[missionIndex];
      
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
      
      console.log('📜 Story mode - Mission:', options.mission.title);
      console.log('🎯 Mission context:', options.mission.description?.slice(0, 100));
      console.log('💬 Chat history:', options.history.length, 'messages');      console.log('🧠 TurnManager:', contextParams.turnManager ? 'PASSED ✅' : 'MISSING ❌');    }
    
    if (mode === 'freetalk') {
      // 🔥 CRITICAL: Pass chat history to tutorPrompts
      options.history = contextParams.chatHistory || [];
      options.turnCount = contextParams.turnCount || Math.floor((contextParams.chatHistory?.length || 0) / 2);
      options.isOpeningTurn = contextParams.isOpeningTurn || false;
      
      console.log('💬 Freetalk mode - passing context:', {
        historyLength: options.history.length,
        turnCount: options.turnCount,
        isOpeningTurn: options.isOpeningTurn
      });
    }
    
    // Build prompt using tutorPrompts.js
    // Note: userInput will be added when actually sending to AI
    return buildPrompt(tutorMode, context, contextParams.userMessage || '', options);
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
    
    const processedResponse = {
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
