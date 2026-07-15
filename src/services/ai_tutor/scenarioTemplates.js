/**
 * Roleplay Scenario Templates
 * 
 * Reusable base templates for common roleplay scenario types
 * Supports week-specific overrides and scaffolding configurations
 * 
 * @module scenarioTemplates
 * @version 1.0
 * @created 2026-02-11
 */

/**
 * Base Template for A0+ Level Roleplays
 */
export const TEMPLATE_A0_BASE = {
  grammar_guard: {
    allowed_structures: [
      "to be + adjective (I am happy)",
      "to be + noun (She is my mother)",
      "have/has + noun (I have a brother)",
      "simple present verbs (I like, I play)"
    ],
    forbidden_structures: [
      "present continuous (I am playing)",
      "past tense (I was happy)",
      "present perfect (I have lived)",
      "modals except 'can' (should, would, must)",
      "complex sentences (when, because, although)"
    ],
    max_sentence_length: 10
  },
  
  turn_limit: 10, // Reduced from 20 for focused practice
  
  ai_behavior: {
    response_pattern: {
      steps: [
        { name: "acknowledge", instruction: "React warmly to student's answer" },
        { name: "expand", instruction: "Add ONE detail about what they said" },
        { name: "ask_new", instruction: "Ask about different topic using OR choice" }
      ],
      template: "[Acknowledge] + [Expand] + [Ask New]"
    },
    
    conversation_strategy: {
      type: "topic_rotation",
      max_topic_repeats: 1
    },
    
    question_format: {
      required: "Always use OR choices to scaffold",
      pattern: "Question? Option A or Option B?"
    },
    
    forbidden_behaviors: [
      "Making assumptions about student's life",
      "Repeating same question twice",
      "Using grammar outside allowed structures",
      "Open questions without scaffolding"
    ],
    
    error_correction: {
      strategy: "recast",
      description: "Subtle correction by repeating correctly"
    }
  }
};

/**
 * Template with Scaffolding Fade (for 10-turn scenarios)
 */
export const TEMPLATE_WITH_SCAFFOLDING_FADE = {
  ...TEMPLATE_A0_BASE,
  
  scaffolding: {
    turns_1_3: {
      level: "heavy",
      strategy: "forced_choice_with_frame",
      instruction: "Provide full sentence frame",
      example: "Do you like A or B? Say: I like A or I like B.",
      question_format: "Question + 'Say: [full sentence A] or [full sentence B]'"
    },
    turns_4_7: {
      level: "medium",
      strategy: "forced_choice_no_frame",
      instruction: "Provide choices but no sentence frame",
      example: "Do you like A or B?",
      question_format: "Question + OR choices only"
    },
    turns_8_10: {
      level: "light",
      strategy: "open_with_hint",
      instruction: "More open question with vocabulary hint",
      example: "What else do you like? (playing, reading, drawing)",
      question_format: "Open question + (vocab hints)"
    }
  }
};

/**
 * Interview/TV Show Template
 */
export const TEMPLATE_INTERVIEW = {
  ...TEMPLATE_WITH_SCAFFOLDING_FADE,
  
  ai_behavior: {
    ...TEMPLATE_WITH_SCAFFOLDING_FADE.ai_behavior,
    
    conversation_strategy: {
      type: "sequential_questions",
      approach: "Ask pre-planned questions in order",
      track_asked: true, // Track which questions already asked
      avoid_repetition: true
    },
    
    response_pattern: {
      steps: [
        { name: "acknowledge", examples: ["Wonderful!", "Great!", "Interesting!"], instruction: "React with enthusiasm" },
        { name: "celebrate", instruction: "Celebrate their answer like TV host", example: "The audience loves that! 👏" },
        { name: "ask_next", instruction: "Move to next interview question" }
      ],
      template: "[Acknowledge] + [Celebrate] + [Ask Next]"
    }
  }
};

/**
 * Emotion/Feeling Template
 */
export const TEMPLATE_EMOTION = {
  ...TEMPLATE_WITH_SCAFFOLDING_FADE,
  
  ai_behavior: {
    ...TEMPLATE_WITH_SCAFFOLDING_FADE.ai_behavior,
    
    conversation_strategy: {
      type: "situation_based",
      approach: "Describe situation, ask about feelings",
      track_situations: true,
      avoid_repetition: true
    },
    
    response_pattern: {
      steps: [
        { name: "acknowledge_feeling", examples: ["That's a great feeling!", "I understand!", "Good to know!"], instruction: "Validate their emotion" },
        { name: "describe_new_situation", instruction: "Describe next situation", example: "When you win a game..." },
        { name: "ask_feeling", instruction: "Ask how they feel with OR choices", example: "Are you happy or excited?" }
      ],
      template: "[Acknowledge] + [New Situation] + [Ask Feeling]"
    }
  }
};

/**
 * Story/Progress-Based Template (e.g., filling jar, building tower)
 */
export const TEMPLATE_STORY_PROGRESS = {
  ...TEMPLATE_WITH_SCAFFOLDING_FADE,
  
  ai_behavior: {
    ...TEMPLATE_WITH_SCAFFOLDING_FADE.ai_behavior,
    
    conversation_strategy: {
      type: "progress_tracking",
      approach: "Track progress toward goal (e.g., jar 5/5 full)",
      show_progress: true,
      celebrate_milestones: true
    },
    
    response_pattern: {
      steps: [
        { name: "action", instruction: "Describe action taken", example: "*Put [item] in jar* ✨" },
        { name: "show_progress", instruction: "Show current progress", example: "The jar is 3/5 full! 🏺" },
        { name: "ask_next", instruction: "Ask for next item with OR choices" }
      ],
      template: "[Action] + [Show Progress] + [Ask Next]"
    },
    
    end_celebration: {
      trigger: "progress === goal",
      message_template: "WOW! We did it! [Goal achieved message] 🎉"
    }
  }
};

/**
 * Apply template to scenario with overrides
 * @param {Object} template - Base template
 * @param {Object} overrides - Scenario-specific overrides
 * @returns {Object} Merged scenario configuration
 */
export function applyTemplate(template, overrides) {
  return {
    ...template,
    ...overrides,
    
    // Deep merge ai_behavior
    ai_behavior: {
      ...template.ai_behavior,
      ...overrides.ai_behavior,
      
      response_pattern: {
        ...template.ai_behavior?.response_pattern,
        ...overrides.ai_behavior?.response_pattern
      },
      
      conversation_strategy: {
        ...template.ai_behavior?.conversation_strategy,
        ...overrides.ai_behavior?.conversation_strategy
      }
    },
    
    // Deep merge grammar_guard
    grammar_guard: {
      ...template.grammar_guard,
      ...overrides.grammar_guard
    },
    
    // Merge scaffolding if exists
    scaffolding: overrides.scaffolding || template.scaffolding
  };
}

/**
 * Get template by name
 * @param {string} templateName - Template identifier
 * @returns {Object} Template object or null
 */
export function getTemplate(templateName) {
  const templates = {
    'a0_base': TEMPLATE_A0_BASE,
    'scaffolding_fade': TEMPLATE_WITH_SCAFFOLDING_FADE,
    'interview': TEMPLATE_INTERVIEW,
    'emotion': TEMPLATE_EMOTION,
    'story_progress': TEMPLATE_STORY_PROGRESS
  };
  
  return templates[templateName] || null;
}
