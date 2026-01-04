import { buildNovaPrompt } from './novaPromptBuilder';
import { parseResponse } from './tutorSchemas';
import { replacePlaceholders, generateTTS } from '../geminiTTS';
import { callAI } from '../aiProviders';
import { enforceGrammarScope } from './grammarGuard';
import { getHints } from './hintEngine';
import { getMemory, saveToMemory } from './memory';

/**
 * Story Mission Engine
 * Manages state and conversation flow for Story Missions
 * Core logic for Ms. Nova's Story Mission interactions
 */
export class StoryMissionEngine {
  constructor(mission, weekData = null) {
    this.mission = mission;
    this.weekData = weekData;
    
    // Load long-term memory
    const rememberedContext = getMemory();
    
    // State management
    this.state = {
      currentStep: 0,                    // Current step index (0-based)
      turnsCompleted: 0,                 // Total turns
      vocabularyUsed: new Set(),         // Words student has used
      scaffoldLevel: 1,                  // 1=hints, 2=sentence starters, 3=full sentence
      studentContext: {                  // Remember student info
        name: rememberedContext.name || null,
        age: rememberedContext.age || null,
        teacherName: rememberedContext.teacherName || null,
        subject: rememberedContext.subject || null,
        hasFriends: rememberedContext.hasFriends ?? null,
        favoritePlace: rememberedContext.favoritePlace || null,
        friendName: rememberedContext.friendName || null,
        activity: rememberedContext.activity || null,
        object: rememberedContext.object || null
      },
      conversationHistory: [],           // Full chat history
      performanceMetrics: {              // Track learning curve
        successStreak: 0,                // Consecutive good answers
        struggleCount: 0,                // Consecutive short/frustrated answers
        avgResponseLength: 0,            // Average words per response
        responseCount: 0                 // Total responses tracked
      }
    };
  }

  /**
   * Start the mission - generate opening
   * @returns {Promise<Object>} Opening response with story_beat, task, scaffold, and audio
   */
  async start() {
    console.log('[StoryMissionEngine] Starting mission:', this.mission.title);

    // Support both 'beats' and 'steps' naming conventions
    const beats = this.mission.beats || this.mission.steps;
    if (!beats || beats.length === 0) {
      throw new Error(`Mission '${this.mission.title}' has no beats/steps defined.`);
    }

    const step = beats[0];

    // Add scene context to opening if available
    const sceneContext = this.mission.context?.scene || '';

    // Generate runtime TTS audio with Gemini → Puter → Browser fallback
    const speed = this._getTTSSpeed();

    // For TTS, only read the spoken part (not the scene description)
    const spokenText = replacePlaceholders(step.aiPrompt, this.state.studentContext);
    const ttsResult = await generateTTS(spokenText, { speed });

    console.log(`[StoryMissionEngine] TTS generated at ${speed}x speed via ${ttsResult.provider}`);

    const opening = {
      story_beat: sceneContext ? sceneContext : '', // Scene description (no TTS)
      task: spokenText, // Actual spoken question
      scaffold: { hints: step.hints || [] },
      audioBlob: ttsResult.audioBlob,
      ttsProvider: ttsResult.provider
    };

    // Save to history
    this.state.conversationHistory.push({
      role: 'assistant',
      content: spokenText
    });

    console.log('[StoryMissionEngine] Opening generated with', ttsResult.audioBlob ? 'audio' : 'text-only');
    return opening;
  }

  /**
   * Generate next turn based on user input using AI (Ms. Nova personality)
   * @param {string} userInput - User's response
   * @returns {Promise<Object>} AI response with story_beat, task, scaffold, feedback
   */
  async generateTurn(userInput) {
    console.log('[StoryMissionEngine] Turn', this.state.turnsCompleted + 1, '- User said:', userInput);
    
    const beats = this.mission.beats || this.mission.steps;
    
    // 1. Extract context from user input
    this._extractContext(userInput);

    // 2. Track vocabulary usage
    this._trackVocabulary(userInput);

    // 3. Detect sentiment and adjust scaffolding
    const sentiment = this._detectSentiment(userInput, this.state.conversationHistory);
    if (sentiment === 'frustrated' && this.state.scaffoldLevel < 3) {
      this.state.scaffoldLevel++;
      console.log('[StoryMissionEngine] Student seems frustrated, increasing scaffold to level', this.state.scaffoldLevel);
    } else if (sentiment === 'confident' && this.state.scaffoldLevel > 1) {
      this.state.scaffoldLevel = Math.max(1, this.state.scaffoldLevel - 1);
      console.log('[StoryMissionEngine] Student is confident, reducing scaffold to level', this.state.scaffoldLevel);
    }

    // 4. Track performance and adapt learning curve
    this._trackPerformance(userInput, sentiment);
    const adaptation = this._adaptLearningCurve();
    if (adaptation) {
      console.log('[StoryMissionEngine] Learning Curve Adaptation:', adaptation.action, '-', adaptation.reason);
    }

    // 5. Increment state
    this.state.turnsCompleted++;
    
    // 4. Check if reached max turns
    const maxTurns = this.mission.successCriteria?.minTurns || 10;
    if (this.state.turnsCompleted >= maxTurns) {
      console.log('[StoryMissionEngine] Reached max turns:', maxTurns);
      return {
        story_beat: "Great job! You completed the mission!",
        task: null,
        scaffold: null,
        feedback: null,
        audioBlob: null,
        isComplete: true
      };
    }
    
    // 5. Get current step (prevent out of bounds)
    this.state.currentStep = Math.min(
      this.state.turnsCompleted,
      (beats ? beats.length : 1) - 1
    );
    
    const step = beats[this.state.currentStep];
    
    // 6. Check if need scaffolding
    const needsScaffold = this._shouldScaffold(userInput);
    if (needsScaffold) {
      this.state.scaffoldLevel = Math.min(this.state.scaffoldLevel + 1, 3);
    }
    
    // 7. BUILD MS. NOVA PROMPT (NEW - AI Integration)
    const novaPrompt = buildNovaPrompt({
      mission: this.mission,
      step,
      state: this.state,
      userInput,
      isOpening: false,
      sentiment  // Pass detected sentiment for personality variation
    });
    
    console.log('[StoryMissionEngine] Calling AI with Nova prompt...');
    
    // 8. CALL AI (Gemini) with Grammar Guard Auto-Retry
    let aiResponse = {
      story_beat: '',
      task: '',
      scaffold: { hints: [] }
    };

    const weekId = this.weekData?.weekId || this.mission.context?.weekId || 1;
    let retryPrompt = novaPrompt;
    let grammarRetries = 0;
    const MAX_GRAMMAR_RETRIES = 2;

    try {
      // GRAMMAR GUARD AUTO-RETRY LOOP
      while (grammarRetries <= MAX_GRAMMAR_RETRIES) {
        try {
          const aiResult = await callAI(retryPrompt, 'story');
          console.log(`[StoryMissionEngine] Raw AI text (attempt ${grammarRetries + 1}):`, aiResult.text);

          const parsed = parseResponse(aiResult.text, 'STORY_MISSION');
          console.log('[StoryMissionEngine] Parsed response type:', typeof parsed, parsed);

          // Ensure parsed is an object
          if (typeof parsed !== 'object' || !parsed) {
            throw new Error('parseResponse returned non-object: ' + typeof parsed);
          }

          // 8.5. GRAMMAR GUARD - Validate grammar scope before using response
          aiResponse = enforceGrammarScope(parsed, weekId);
          console.log('[StoryMissionEngine] ✓ Grammar guard passed after', grammarRetries + 1, 'attempt(s)');

          // Log AI response for debugging
          const storyBeatWords = (aiResponse.story_beat || '').split(/\s+/).filter(Boolean).length;
          const taskWords = (aiResponse.task || '').split(/\s+/).filter(Boolean).length;
          console.log(`[StoryMissionEngine] AI response: Feedback ${storyBeatWords}w + Question ${taskWords}w`);

          break; // Success! Exit retry loop

        } catch (grammarError) {
          grammarRetries++;

          if (grammarRetries > MAX_GRAMMAR_RETRIES) {
            console.error('[StoryMissionEngine] Grammar guard failed after', MAX_GRAMMAR_RETRIES, 'retries');
            throw grammarError; // Give up, use fallback
          }

          console.warn(`[StoryMissionEngine] Grammar violation on attempt ${grammarRetries}/${MAX_GRAMMAR_RETRIES + 1}:`, grammarError.message);

          // Add stronger reminder for retry
          retryPrompt = novaPrompt + `\n\n🚨 CRITICAL ERROR - Your previous response was BLOCKED for grammar violations!
The error was: ${grammarError.message}

YOU MUST FIX THIS NOW:
✓ ONLY use Present Simple: am/is/are, have/has
✗ ABSOLUTELY NO past tense: NO "was", "were", "did", "told", "went", "liked", "played", "walked"
✗ NO -ed verbs at all!
✗ NO future tense: NO "will", "going to"

Regenerate your response NOW with ONLY present simple grammar:`;
        }
      }

    } catch (error) {
      console.error('[StoryMissionEngine] AI call failed after all retries, using fallback:', error);
      // Fallback to template-based response
      aiResponse = {
        story_beat: replacePlaceholders(step.aiPrompt, this.state.studentContext),
        task: this._generateNextQuestion(step),
        scaffold: { hints: step.hints || [] }
      };
    }
    
    // 9. Generate context-aware hints using hintEngine
    try {
      const contextualHints = getHints(this.mission, step, this.state.studentContext);
      if (contextualHints && contextualHints.length > 0) {
        aiResponse.scaffold = {
          ...aiResponse.scaffold,
          hints: contextualHints
        };
        console.log('[StoryMissionEngine] Using context-aware hints:', contextualHints);
      }
    } catch (hintError) {
      console.warn('[StoryMissionEngine] Hint generation failed, using AI hints:', hintError);
    }
    
    // 10. Generate TTS audio for AI's response
    const speed = this._getTTSSpeed();
    const fullText = `${aiResponse.story_beat} ${aiResponse.task || ''}`;
    const ttsResult = await generateTTS(fullText, { speed });
    
    console.log(`[StoryMissionEngine] TTS generated at ${speed}x via ${ttsResult.provider}`);
    
    // 11. Build response
    const response = {
      story_beat: aiResponse.story_beat,
      task: aiResponse.task || this._generateNextQuestion(step),
      scaffold: aiResponse.scaffold || { hints: step.hints },
      feedback: null,
      audioBlob: ttsResult.audioBlob,
      ttsProvider: ttsResult.provider,
      isComplete: this.isComplete()
    };
    
    // 12. Save to history
    this.state.conversationHistory.push(
      { role: 'user', content: userInput },
      { role: 'assistant', content: fullText }
    );
    
    console.log('[StoryMissionEngine] Response generated. Step:', this.state.currentStep, 'Turns:', this.state.turnsCompleted);
    
    return response;
  }

  /**
   * Replace placeholders like {{name}} with actual values
   * @private
   */
  _replacePlaceholders(text) {
    const ctx = this.state.studentContext;
    
    return text
      .replace(/\{\{name\}\}/g, ctx.name || 'friend')
      .replace(/\{\{age\}\}/g, ctx.age || '')
      .replace(/\{\{teacherName\}\}/g, ctx.teacherName || 'your teacher')
      .replace(/\{\{subject\}\}/g, ctx.subject || 'that subject')
      .replace(/\{\{friendsResponse\}\}/g, ctx.hasFriends ? 'Having friends is awesome!' : 'That\'s okay, you\'ll make friends soon!');
  }

  /**
   * Generate next question based on current step
   * @private
   */
  _generateNextQuestion(step) {
    // Extract question from aiPrompt if it contains one
    const questionMatch = step.aiPrompt.match(/\?[^?]*$/);
    if (questionMatch) {
      return questionMatch[0].trim();
    }
    
    // Fallback based on step
    const questions = [
      "What is your name?",
      "How old are you?",
      "Who is your teacher?",
      "What's your favorite subject?",
      "Do you have friends in your class?",
      "What do you like about your school?"
    ];
    
    return questions[this.state.currentStep] || "Tell me more!";
  }

  /**
   * Extract context from user input (name, age, etc.)
   * Enhanced to track conversation progress
   * @private
   */
  _extractContext(input) {
    let lower = input.toLowerCase();
    const ctx = this.state.studentContext;
    
    // Apply fuzzy matching BEFORE extraction
    const fuzzyMap = {
      'play crown': 'playground',
      'play ground': 'playground',
      'reading corn': 'reading corner',
      'class room': 'classroom',
      'no on': 'noon',
      'can': 'khan',
      'my near': 'my name',
      'tea chair': 'teacher'
    };
    
    for (const [wrong, correct] of Object.entries(fuzzyMap)) {
      const regex = new RegExp(wrong.replace(/\s+/g, '\\s+'), 'gi');
      if (regex.test(lower)) {
        lower = lower.replace(regex, correct);
        console.log(`[StoryMissionEngine] Fuzzy match: "${wrong}" → "${correct}"`);
      }
    }
    
    // Extract name (Turn 1)
    if (!ctx.name) {
      const namePatterns = [
        /(?:my name is|i am|i'm|call me)\s+([a-z]+)/i,
        /^([A-Z][a-z]+)$/  // Single capitalized word
      ];
      
      for (const pattern of namePatterns) {
        const match = input.match(pattern);
        if (match) {
          ctx.name = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
          console.log('[StoryMissionEngine] Extracted name:', ctx.name);
          break;
        }
      }
    }
    
    // Extract age (Turn 2)
    if (!ctx.age) {
      const agePattern = /(\d+)\s*(?:years?\s*old)?/i;
      const match = input.match(agePattern);
      if (match) {
        ctx.age = match[1];
        console.log('[StoryMissionEngine] Extracted age:', ctx.age);
      }
    }
    
    // Extract teacher name (Turn 3)
    if (!ctx.teacherName) {
      const teacherPattern = /(?:teacher is|teacher's name is|teacher name)\s+(mr\.?\s+|ms\.?\s+|mrs\.?\s+)?([a-z]+)/i;
      const match = input.match(teacherPattern);
      if (match) {
        const title = match[1] ? match[1].trim() : 'Mr.';
        const name = match[2].charAt(0).toUpperCase() + match[2].slice(1).toLowerCase();
        ctx.teacherName = `${title} ${name}`;
        console.log('[StoryMissionEngine] Extracted teacher:', ctx.teacherName);
      }
    }
    
    // Extract subject (Turn 4)
    if (!ctx.subject) {
      const subjects = ['Math', 'English', 'Vietnamese', 'Science', 'Art', 'Music', 'PE', 'History', 'Geography'];
      for (const subject of subjects) {
        if (lower.includes(subject.toLowerCase())) {
          ctx.subject = subject;
          console.log('[StoryMissionEngine] Extracted subject:', ctx.subject);
          break;
        }
      }
    }
    
    // Extract friends (Turn 5)
    if (ctx.hasFriends === null) {
      if (/yes|have|many|some|friends/i.test(input)) {
        ctx.hasFriends = true;
      } else if (/no|not|don't|none/i.test(input)) {
        ctx.hasFriends = false;
      }
    }
    
    // Store updated context
    this.state.studentContext = ctx;
    
    // Persist to long-term memory
    saveToMemory(ctx);
  }

  /**
   * Track vocabulary usage
   * @private
   */
  _trackVocabulary(input) {
    const lower = input.toLowerCase();
    
    this.mission.targetVocabulary.forEach(vocabItem => {
      if (lower.includes(vocabItem.word.toLowerCase())) {
        this.state.vocabularyUsed.add(vocabItem.word);
      }
    });
    
    console.log('[StoryMissionEngine] Vocabulary used:', Array.from(this.state.vocabularyUsed));
  }

  /**
   * Check if student needs scaffolding
   * @private
   */
  _shouldScaffold(input) {
    const words = input.trim().split(/\s+/);
    
    // Too short answer
    if (words.length < 2) return true;
    
    // Generic answers
    const generic = ['yes', 'no', 'ok', 'maybe', 'i don\'t know', 'idk'];
    if (generic.includes(input.toLowerCase().trim())) return true;
    
    return false;
  }

  /**
   * Check if mission is complete
   * @returns {boolean} True if mission completed successfully
   */
  isComplete() {
    // Check min turns
    if (this.state.turnsCompleted < this.mission.successCriteria.minTurns) {
      return false;
    }
    
    // Check required words
    const requiredWords = this.mission.successCriteria.mustUseWords;
    const allUsed = requiredWords.every(word => 
      this.state.vocabularyUsed.has(word)
    );
    
    const complete = allUsed;
    console.log('[StoryMissionEngine] Completion check:', {
      turnsCompleted: this.state.turnsCompleted,
      minTurns: this.mission.successCriteria.minTurns,
      requiredWords,
      wordsUsed: Array.from(this.state.vocabularyUsed),
      allUsed,
      complete
    });
    
    return complete;
  }

  /**
   * Get completion summary
   * @returns {Object} Summary statistics
   */
  getSummary() {
    const requiredUsed = this.mission.successCriteria.mustUseWords.filter(w =>
      this.state.vocabularyUsed.has(w)
    );
    
    // Get optional/bonus words from targetVocabulary where mustUse=false
    const optionalWords = this.mission.targetVocabulary
      .filter(v => !v.mustUse)
      .map(v => v.word);
    
    const bonusUsed = optionalWords.filter(w =>
      this.state.vocabularyUsed.has(w)
    );
    
    return {
      turnsCompleted: this.state.turnsCompleted,
      vocabularyUsed: Array.from(this.state.vocabularyUsed),
      requiredWordsUsed: requiredUsed,
      bonusWordsUsed: bonusUsed,
      completionRate: (requiredUsed.length / this.mission.successCriteria.mustUseWords.length) * 100,
      scaffoldLevelReached: this.state.scaffoldLevel,
      studentContext: this.state.studentContext
    };
  }

  /**
   * Reset mission state (for retrying)
   */
  reset() {
    this.state = {
      currentStep: 0,
      turnsCompleted: 0,
      vocabularyUsed: new Set(),
      scaffoldLevel: 1,
      studentContext: {
        name: null,
        age: null,
        teacherName: null,
        subject: null,
        hasFriends: null,
        favoritePlace: null,
        friendName: null,
        activity: null,
        object: null
      },
      conversationHistory: []
    };
  }

  /**
   * Get TTS speech speed based on mission phase
   * Phase 1 (Weeks 1-14): 0.8x - slow for A0++ beginners
   * Phase 1.2 (Weeks 15-28): 0.9x - slightly faster
   * Phase 2+ (Weeks 29+): 1.0x - normal speed
   * @returns {number} Speed multiplier (0.8 to 1.0)
   */
  _getTTSSpeed() {
    // Use weekData for accurate week-based speed, fallback to mission context
    const weekId = this.weekData?.weekId || this.mission.context?.weekId || 1;

    // Phase 1: Week 1-4 (A0++ Absolute Beginner) → 0.95x - clear but energetic
    if (weekId >= 1 && weekId <= 4) {
      return 0.95;
    }
    // Phase 1.2: Week 5-14 (A1 Early) → 1.0x normal
    else if (weekId >= 5 && weekId <= 14) {
      return 1.0;
    }
    // Phase 2+: Week 15+ (A1+) → 1.1x slightly faster
    else {
      return 1.1;
    }
  }

  /**
   * Generate gentle error correction (recast technique)
   * @param {string} userInput - Student's response
   * @returns {string|null} Correction message or null
   */
  _generateRecast(userInput) {
    let lower = userInput.toLowerCase();
    const corrections = [];
    
    // FUZZY MATCHING: Common Vietnamese ESL pronunciation errors
    const fuzzyMap = {
      'play crown': 'playground',
      'play ground': 'playground',
      'class room': 'classroom',
      'black board': 'blackboard',
      'reading corn': 'reading corner',
      'reading corner': 'reading corner',
      'my near': 'my name',
      'my nay': 'my name',
      'tea chair': 'teacher',
      'mis chin': 'mr chin',
      'miss chin': 'mr chin',
      'my tee chair': 'my teacher',
      'is cool': 'school',
      'at is cool': 'at school',
      'no on': 'noon', // Vietnamese name
      'can': 'khan'  // Vietnamese name
    };
    
    // Apply fuzzy corrections to input
    for (const [wrong, correct] of Object.entries(fuzzyMap)) {
      const regex = new RegExp(wrong.replace(/\s+/g, '\\s+'), 'gi');
      lower = lower.replace(regex, correct);
    }
    
    // Check for common Vietnamese ESL A0++ errors
    
    // 1. Missing articles (a/an/the)
    if (/i like (playground|classroom|teacher|school|corner)/.test(lower)) {
      const noun = lower.match(/i like (\w+)/)[1];
      corrections.push(`I like THE ${noun} too!`);
    }
    
    // 2. Missing "is" in sentences
    if (/my name (\w+)/.test(lower) && !lower.includes('is')) {
      const name = lower.match(/my name (\w+)/)[1];
      const fixedName = name.charAt(0).toUpperCase() + name.slice(1);
      corrections.push(`Your name IS ${fixedName}!`);
    }
    
    // 3. Verb agreement errors
    if (/my teacher school/.test(lower)) {
      const match = lower.match(/my teacher (?:school )?(?:at )?(?:mr |ms |miss )?([a-z]+)/i);
      if (match) {
        corrections.push(`Your teacher IS ${match[1]}!`);
      }
    }
    
    // 4. Wrong word order
    if (/turn on my desk/.test(lower)) {
      corrections.push(`You have a DESK in your classroom!`);
    }
    
    // Return gentle recast (model correct form)
    if (corrections.length > 0) {
      return corrections[0];
    }
    
    return null;
  }

  /**
   * Get current state (for debugging)
   * @returns {Object} Current engine state
   */
  getState() {
    const beats = this.mission.beats || this.mission.steps;
    return {
      ...this.state,
      vocabularyUsed: Array.from(this.state.vocabularyUsed),
      missionTitle: this.mission.title,
      currentStepId: beats ? (beats[this.state.currentStep]?.beatId || beats[this.state.currentStep]?.stepId) : null
    };
  }

  /**
   * Detect student sentiment from input and conversation history
   * @param {string} input - Current user input
   * @param {Array} history - Conversation history
   * @returns {string} 'frustrated' | 'confident' | 'neutral'
   * @private
   */
  _detectSentiment(input, history) {
    const lower = input.toLowerCase().trim();
    const words = lower.split(/\s+/).filter(Boolean);

    // Frustration indicators
    const frustrationWords = ['i dont know', 'idk', 'hard', 'difficult', 'help', 'cant', 'cannot', 'confused', 'dont understand'];
    const hasFrustrationWord = frustrationWords.some(fw => lower.includes(fw));
    const veryShort = words.length < 2; // Single word answers
    const questionMarks = (input.match(/\?/g) || []).length >= 2; // Multiple question marks (???)

    // Check for repeated short answers in recent history
    const recentUserInputs = history
      .slice(-6) // Last 3 turns (user + assistant pairs)
      .filter(h => h.role === 'user')
      .map(h => h.content.toLowerCase().trim());

    const repeatedShortAnswers = recentUserInputs.filter(inp =>
      inp.split(/\s+/).length < 3
    ).length >= 2;

    // Confidence indicators
    const fullSentence = words.length >= 5; // Complete sentences
    const hasTargetVocab = Array.from(this.state.vocabularyUsed).some(v =>
      lower.includes(v.toLowerCase())
    );
    const noHesitation = !lower.includes('um') && !lower.includes('uh') && !lower.includes('hmm');

    // Determine sentiment
    if (hasFrustrationWord || (veryShort && repeatedShortAnswers) || questionMarks) {
      console.log('[StoryMissionEngine] Sentiment: FRUSTRATED (triggers:', { hasFrustrationWord, veryShort, repeatedShortAnswers, questionMarks }, ')');
      return 'frustrated';
    } else if (fullSentence && hasTargetVocab && noHesitation) {
      console.log('[StoryMissionEngine] Sentiment: CONFIDENT (full sentence, using target vocab)');
      return 'confident';
    }

    return 'neutral';
  }

  /**
   * Track performance metrics for learning curve adaptation
   * @param {string} input - User input
   * @param {string} sentiment - Current sentiment
   * @private
   */
  _trackPerformance(input, sentiment) {
    const metrics = this.state.performanceMetrics;
    const wordCount = input.trim().split(/\s+/).filter(Boolean).length;

    // Update average response length
    metrics.responseCount++;
    metrics.avgResponseLength =
      (metrics.avgResponseLength * (metrics.responseCount - 1) + wordCount) / metrics.responseCount;

    // Update streaks
    if (sentiment === 'confident' || wordCount >= 5) {
      metrics.successStreak++;
      metrics.struggleCount = 0;
    } else if (sentiment === 'frustrated' || wordCount < 3) {
      metrics.struggleCount++;
      metrics.successStreak = 0;
    }

    console.log('[StoryMissionEngine] Performance:', {
      avgLength: metrics.avgResponseLength.toFixed(1),
      successStreak: metrics.successStreak,
      struggleCount: metrics.struggleCount
    });
  }

  /**
   * Adapt learning curve based on performance
   * Returns adaptation action or null
   * @private
   */
  _adaptLearningCurve() {
    const metrics = this.state.performanceMetrics;
    const beats = this.mission.beats || this.mission.steps;

    // ADAPTIVE RULE 1: Skip ahead if student is excelling
    if (metrics.successStreak >= 3 && this.state.currentStep < beats.length - 2) {
      this.state.currentStep = Math.min(this.state.currentStep + 1, beats.length - 1);
      metrics.successStreak = 0; // Reset to prevent skipping again immediately
      return {
        action: 'SKIP_STEP',
        reason: 'Student is performing well (3 good answers in a row)'
      };
    }

    // ADAPTIVE RULE 2: Simplify if student is struggling
    if (metrics.struggleCount >= 3 && this.state.currentStep > 0) {
      this.state.currentStep = Math.max(this.state.currentStep - 1, 0);
      metrics.struggleCount = 0; // Reset
      return {
        action: 'BACK_UP',
        reason: 'Student is struggling (3 short/frustrated answers in a row)'
      };
    }

    // ADAPTIVE RULE 3: Increase difficulty if avg response > 8 words
    if (metrics.avgResponseLength > 8 && metrics.responseCount >= 5 && this.state.scaffoldLevel > 1) {
      this.state.scaffoldLevel = Math.max(1, this.state.scaffoldLevel - 1);
      return {
        action: 'REDUCE_SCAFFOLD',
        reason: `Student gives detailed answers (avg ${metrics.avgResponseLength.toFixed(1)} words)`
      };
    }

    return null;
  }
}
