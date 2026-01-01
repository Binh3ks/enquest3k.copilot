import { buildNovaPrompt } from './novaPromptBuilder';
import { parseResponse } from './tutorSchemas';
import { replacePlaceholders, generateTTS } from '../tts';

/**
 * Story Mission Engine
 * Manages state and conversation flow for Story Missions
 * Core logic for Ms. Nova's Story Mission interactions
 */
export class StoryMissionEngine {
  constructor(mission, weekData = null) {
    this.mission = mission;
    this.weekData = weekData;
    
    // State management
    this.state = {
      currentStep: 0,                    // Current step index (0-based)
      turnsCompleted: 0,                 // Total turns
      vocabularyUsed: new Set(),         // Words student has used
      scaffoldLevel: 1,                  // 1=hints, 2=sentence starters, 3=full sentence
      studentContext: {                  // Remember student info
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
      conversationHistory: []            // Full chat history
    };
  }

  /**
   * Start the mission - generate opening
   * @returns {Promise<Object>} Opening response with story_beat, task, scaffold, and audio
   */
  async start() {
    console.log('[StoryMissionEngine] Starting mission:', this.mission.title);
    
    const step = this.mission.steps[0];
    
    // Replace placeholders in text
    const personalizedText = replacePlaceholders(step.aiPrompt, this.state.studentContext);
    
    // Generate runtime TTS audio with speed based on phase
    const speed = this._getTTSSpeed();
    let audioBlob = null;
    try {
      audioBlob = await generateTTS(personalizedText, { voice: 'shimmer', speed });
      console.log(`[StoryMissionEngine] TTS generated at ${speed}x speed with shimmer voice`);
    } catch (error) {
      console.warn('[StoryMissionEngine] TTS generation failed:', error);
      // Continue without audio (text-only mode)
    }
    
    const opening = {
      story_beat: personalizedText,
      task: "What is your name?",
      scaffold: { hints: step.hints },
      audioBlob  // New: Runtime-generated audio
    };
    
    // Save to history
    this.state.conversationHistory.push({
      role: 'assistant',
      content: `${opening.story_beat} ${opening.task}`
    });
    
    console.log('[StoryMissionEngine] Opening generated with', audioBlob ? 'audio' : 'text-only');
    return opening;
  }

  /**
   * Generate next turn based on user input
   * @param {string} userInput - User's response
   * @returns {Promise<Object>} AI response with story_beat, task, scaffold, feedback
   */
  async generateTurn(userInput) {
    console.log('[StoryMissionEngine] Turn', this.state.turnsCompleted + 1, '- User said:', userInput);
    
    // 1. Extract context from user input
    this._extractContext(userInput);
    
    // 2. Track vocabulary usage
    this._trackVocabulary(userInput);
    
    // 3. Increment state
    this.state.turnsCompleted++;
    
    // 4. Check if reached max turns (scaffolding limit)
    const maxTurns = this.mission.scaffolding?.maxTurns || this.mission.steps.length;
    if (this.state.turnsCompleted >= maxTurns) {
      console.log('[StoryMissionEngine] Reached max turns:', maxTurns);
      return {
        story_beat: "Great job! You completed the mission! 🎉",
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
      this.mission.steps.length - 1
    );
    
    const step = this.mission.steps[this.state.currentStep];
    
    // 6. Check if need scaffolding
    const needsScaffold = this._shouldScaffold(userInput);
    if (needsScaffold) {
      this.state.scaffoldLevel = Math.min(this.state.scaffoldLevel + 1, 3);
    }
    
    // 7. Replace placeholders in aiPrompt
    let storyBeat = replacePlaceholders(step.aiPrompt, this.state.studentContext);
    
    // 7.5 Add gentle error correction (recast technique)
    const correction = this._generateRecast(userInput, step);
    if (correction) {
      // Prepend gentle correction before main response
      storyBeat = `${correction} ${storyBeat}`;
    }
    
    // 8. Generate runtime TTS audio with speed based on phase
    const speed = this._getTTSSpeed();
    let audioBlob = null;
    try {
      audioBlob = await generateTTS(storyBeat, { voice: 'shimmer', speed });
      console.log(`[StoryMissionEngine] TTS generated at ${speed}x speed with shimmer voice`);
    } catch (error) {
      console.warn('[StoryMissionEngine] TTS generation failed:', error);
    }
    
    // 9. Build response
    const response = {
      story_beat: storyBeat,
      task: this._generateNextQuestion(step),
      scaffold: { hints: step.hints },
      feedback: null,
      audioBlob,  // New: Runtime-generated audio
      isComplete: this.isComplete()
    };
    
    // 10. Save to history
    this.state.conversationHistory.push(
      { role: 'user', content: userInput },
      { role: 'assistant', content: `${response.story_beat} ${response.task}` }
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
      lower = lower.replace(regex, correct);
    }
    
    // Extract name (first user input)
    if (!ctx.name && this.state.turnsCompleted === 0) {
      const nameMatch = lower.match(/(?:my name is|i am|i'm|call me)\s+([a-z]+)/i);
      if (nameMatch) {
        ctx.name = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
      } else {
        // Maybe just the name alone
        const words = input.trim().split(/\s+/);
        if (words.length === 1 && words[0].length > 2) {
          ctx.name = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        }
      }
    }
    
    // Extract age
    const ageMatch = lower.match(/\b(\d+)\b/);
    if (ageMatch && !ctx.age) {
      ctx.age = ageMatch[1];
    }
    
    // Extract teacher name
    if (lower.includes('teacher')) {
      const teacherMatch = lower.match(/(?:teacher is|teacher's name is)\s+([a-z\s.]+)/i);
      if (teacherMatch) {
        ctx.teacherName = teacherMatch[1].trim();
      } else {
        // Maybe they just said the name
        const afterTeacher = lower.split('teacher')[1];
        if (afterTeacher) {
          const nameWords = afterTeacher.trim().split(/\s+/).slice(0, 2);
          if (nameWords.length > 0) {
            ctx.teacherName = nameWords.map(w => 
              w.charAt(0).toUpperCase() + w.slice(1)
            ).join(' ');
          }
        }
      }
    }
    
    // Extract subject
    const subjects = ['math', 'science', 'english', 'reading', 'art', 'music', 'pe', 'history', 'geography'];
    subjects.forEach(subj => {
      if (lower.includes(subj) && !ctx.subject) {
        ctx.subject = subj.charAt(0).toUpperCase() + subj.slice(1);
      }
    });
    
    // Friends yes/no
    if (lower.includes('yes') || lower.includes('have friends') || lower.includes('have some friends')) {
      ctx.hasFriends = true;
    } else if (lower.includes('no') || lower.includes('don\'t have') || lower.includes('no friends')) {
      ctx.hasFriends = false;
    }
    
    // Extract favorite place/thing at school
    if (lower.includes('like') || lower.includes('favorite')) {
      // Extract what they like
      const patterns = [
        /(?:like|favorite)(?:\s+(?:the|is|it's|my))?\s+([a-z]+(?:\s+[a-z]+)?)/i,
        /i\s+like\s+(?:the\s+)?([a-z]+)/i,
        /my\s+favorite\s+is\s+(?:the\s+)?([a-z]+)/i
      ];
      
      for (const pattern of patterns) {
        const match = lower.match(pattern);
        if (match && !ctx.favoritePlace) {
          ctx.favoritePlace = 'the ' + match[1].trim();
          break;
        }
      }
    }
    
    // Extract friend name
    if (lower.includes('friend')) {
      const friendMatch = lower.match(/(?:friend(?:'s)?(?:\s+name)?\s+is|friend\s+named)\s+([a-z]+)/i);
      if (friendMatch && !ctx.friendName) {
        ctx.friendName = friendMatch[1].charAt(0).toUpperCase() + friendMatch[1].slice(1);
      }
    }
    
    // Extract activity
    const activities = ['play', 'talk', 'study', 'read', 'draw', 'sing', 'run', 'eat', 'help'];
    activities.forEach(act => {
      if (lower.includes(act) && !ctx.activity) {
        ctx.activity = act;
      }
    });
    
    // Extract classroom object
    const objects = ['desk', 'chair', 'board', 'table', 'window', 'door', 'book', 'pen'];
    objects.forEach(obj => {
      if (lower.includes(obj) && !ctx.object) {
        ctx.object = obj;
      }
    });
    
    console.log('[StoryMissionEngine] Context extracted:', ctx);
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
    const bonusUsed = this.mission.successCriteria.optionalBonus.filter(w =>
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
    const phase = this.mission.scaffolding?.phase || 1;
    
    if (phase === 1) {
      return 0.8; // Slow for Vietnamese ESL A0++ beginners
    } else if (phase === 1.2) {
      return 0.9; // Medium for A1 learners
    } else {
      return 1.0; // Normal for A1+ and above
    }
  }

  /**
   * Generate gentle error correction (recast technique)
   * @param {string} userInput - Student's response
   * @param {object} step - Current mission step
   * @returns {string|null} Correction message or null
   */
  _generateRecast(userInput, step) {
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
    return {
      ...this.state,
      vocabularyUsed: Array.from(this.state.vocabularyUsed),
      missionTitle: this.mission.title,
      currentStepId: this.mission.steps[this.state.currentStep]?.stepId
    };
  }
}
