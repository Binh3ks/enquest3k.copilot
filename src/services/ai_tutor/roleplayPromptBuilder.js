/**
 * Dynamic Roleplay Prompt Builder (Data-Driven Architecture v2.0)
 * 
 * Generates AI prompts based on roleplay scenarios defined in week data.
 * Scenarios contain: AI role, user role, context, vocab focus, opening line, guide rules, backup questions.
 * 
 * CRITICAL: This builder generates prompts, but question enforcement is done
 * at code level in responseParser.js via forceRoleplayQuestion().
 * 
 * @module roleplayPromptBuilder
 * @version 2.0 (Data-Driven)
 * @created 2026-01-22
 */

/**
 * Build roleplay prompt from scenario data
 * @param {string} scenarioId - Scenario ID (e.g., 'rp_designer', 'rp_tour', 'rp_shop')
 * @param {Object} weekData - Week data containing roleplay_scenarios array
 * @param {number} currentTurn - Current turn number for scaffolding fade (default: 1)
 * @returns {Object} Prompt config {character, emoji, setting, vocabulary, aiPrompt} or null
 */
export function buildRoleplayPrompt(scenarioId, weekData, currentTurn = 1) {
  // Find scenario in week data
  const scenarios = weekData?.roleplay_scenarios || [];
  const scenario = scenarios.find(s => s.id === scenarioId);
  
  if (!scenario) {
    console.error(`❌ Scenario not found: ${scenarioId}`);
    return null;
  }
  
  console.log(`✅ Building roleplay prompt for: ${scenario.title} (Turn ${currentTurn}/10)`);
  console.log(`📚 Vocab allowed: ${scenario.vocab_focus.join(', ')}`);
  
  console.log(`✅ Building roleplay prompt for: ${scenario.title} (Turn ${currentTurn}/10)`);
  
  // Generate AI prompt using scenario data WITH current turn for scaffolding
  const aiPrompt = generateDynamicRoleplayPrompt(scenario, currentTurn);
  
  return {
    id: scenario.id,
    character: scenario.ai_role,
    emoji: scenario.emoji,
    setting: scenario.context,
    vocabulary: scenario.vocab_focus,
    opening_line: scenario.opening_line,
    backup_questions: scenario.backup_questions, // CRITICAL for code enforcement
    aiPrompt: aiPrompt
  };
}

/**
 * Generate AI prompt from scenario configuration
 * @private
 * @param {Object} scenario - Scenario data object
 * @param {number} currentTurn - Current turn number (optional, for scaffolding)
 * @returns {string} Formatted AI prompt
 */
function generateDynamicRoleplayPrompt(scenario, currentTurn = 1) {
  // Build grammar constraints section if grammar_guard exists
  let grammarSection = '';
  if (scenario.grammar_guard) {
    const guard = scenario.grammar_guard;
    grammarSection = `

🚫 GRAMMAR CONSTRAINTS (STRICTLY ENFORCE):

ALLOWED STRUCTURES (Use ONLY these):
${guard.allowed_structures.map((s, i) => `${i + 1}. ${s}`).join('\n')}

FORBIDDEN STRUCTURES (⚠️ NEVER use these):
${guard.forbidden_structures.map((s, i) => `❌ ${s}`).join('\n')}

MAX SENTENCE LENGTH: ${guard.max_sentence_length} words

GOOD EXAMPLES:
${guard.examples?.correct?.map(ex => `✅ "${ex}"`).join('\n') || ''}

BAD EXAMPLES (⚠️ Avoid):
${guard.examples?.incorrect?.map(ex => `❌ "${ex}"`).join('\n') || ''}

🚨 CRITICAL: Every response MUST use ONLY allowed grammar structures. If student uses advanced grammar, DO NOT mirror it - recast using simple grammar.`;
  }
  
  // Build scaffolding section if scaffolding exists
  let scaffoldingSection = '';
  if (scenario.scaffolding) {
    const scaff = scenario.scaffolding;
    // Determine current scaffolding level based on turn
    let currentLevel = null;
    if (currentTurn >= 1 && currentTurn <= 3 && scaff.turns_1_3) {
      currentLevel = scaff.turns_1_3;
    } else if (currentTurn >= 4 && currentTurn <= 7 && scaff.turns_4_7) {
      currentLevel = scaff.turns_4_7;
    } else if (currentTurn >= 8 && currentTurn <= 10 && scaff.turns_8_10) {
      currentLevel = scaff.turns_8_10;
    }
    
    scaffoldingSection = `

🎚️ SCAFFOLDING SYSTEM (Adaptive Support):

CURRENT TURN: ${currentTurn}/10`;
    
    if (currentLevel) {
      scaffoldingSection += `
CURRENT LEVEL: ${currentLevel.level.toUpperCase()} Support
STRATEGY: ${currentLevel.strategy}
INSTRUCTION: ${currentLevel.instruction}
EXAMPLE: "${currentLevel.example}"
QUESTIONING PATTERN: ${currentLevel.questioning_pattern || currentLevel.pattern || 'See example above'}`;
    }
    
    scaffoldingSection += `

SCAFFOLDING PROGRESSION:
📍 Turns 1-3 (Heavy Support): ${scaff.turns_1_3?.instruction || 'Full sentence frames + OR choices'}
📍 Turns 4-7 (Medium Support): ${scaff.turns_4_7?.instruction || 'OR choices, no frames'}
📍 Turns 8-10 (Light Support): ${scaff.turns_8_10?.instruction || 'Open questions with vocab hints'}

🎯 CRITICAL: Adjust your question format based on CURRENT TURN (${currentTurn}). Fade scaffolding as conversation progresses.`;
  }
  
  // Build behavior guide section (structured OR legacy text)
  let behaviorSection = '';
  if (scenario.ai_behavior) {
    // NEW: Structured ai_behavior object
    const behavior = scenario.ai_behavior;
    
    // Response Pattern
    if (behavior.response_pattern) {
      behaviorSection += '\n\n📋 RESPONSE PATTERN:\n';
      if (behavior.response_pattern.template) {
        behaviorSection += `Template: ${behavior.response_pattern.template}\n\n`;
      }
      behavior.response_pattern.steps.forEach((step, i) => {
        behaviorSection += `${i + 1}. ${step.name.toUpperCase()}: ${step.instruction}\n`;
        if (step.examples) {
          behaviorSection += `   Examples: ${step.examples.join(', ')}\n`;
        }
        if (step.example) {
          behaviorSection += `   Example: "${step.example}"\n`;
        }
      });
    }
    
    // Conversation Strategy
    if (behavior.conversation_strategy) {
      const strategy = behavior.conversation_strategy;
      behaviorSection += `\n📊 CONVERSATION STRATEGY:\n`;
      behaviorSection += `Type: ${strategy.type}\n`;
      if (strategy.topics) {
        behaviorSection += `Topics: ${strategy.topics.join(', ')}\n`;
      }
      if (strategy.situations) {
        behaviorSection += `Situations: ${strategy.situations.join(', ')}\n`;
      }
      if (strategy.approach) {
        behaviorSection += `Approach: ${strategy.approach}\n`;
      }
      if (strategy.goal) {
        behaviorSection += `Goal: ${strategy.goal}\n`;
      }
      if (strategy.max_topic_repeats) {
        behaviorSection += `Max Repeats: ${strategy.max_topic_repeats}\n`;
      }
    }
    
    // Question Format
    if (behavior.question_format) {
      const qf = behavior.question_format;
      behaviorSection += `\n❓ QUESTION FORMAT:\n`;
      if (qf.turns_1_3) {
        behaviorSection += `Turns 1-3: ${qf.turns_1_3}\n`;
      }
      if (qf.turns_4_7) {
        behaviorSection += `Turns 4-7: ${qf.turns_4_7}\n`;
      }
      if (qf.turns_8_10) {
        behaviorSection += `Turns 8-10: ${qf.turns_8_10}\n`;
      }
      if (qf.required) {
        behaviorSection += `Required: ${qf.required}\n`;
      }
      if (qf.examples) {
        behaviorSection += `Examples:\n${qf.examples.map(ex => `  • "${ex}"`).join('\n')}\n`;
      }
      if (qf.forbidden) {
        behaviorSection += `Forbidden:\n${qf.forbidden.map(f => `  ❌ ${f}`).join('\n')}\n`;
      }
    }
    
    // Forbidden Behaviors
    if (behavior.forbidden_behaviors && behavior.forbidden_behaviors.length > 0) {
      behaviorSection += `\n🚫 FORBIDDEN BEHAVIORS:\n`;
      behavior.forbidden_behaviors.forEach(fb => {
        behaviorSection += `❌ ${fb}\n`;
      });
    }
    
    // Error Correction
    if (behavior.error_correction) {
      const ec = behavior.error_correction;
      behaviorSection += `\n🔧 ERROR CORRECTION:\n`;
      behaviorSection += `Strategy: ${ec.strategy}\n`;
      if (ec.description) {
        behaviorSection += `Description: ${ec.description}\n`;
      }
      if (ec.example) {
        behaviorSection += `Example: ${ec.example}\n`;
      }
    }
    
    // End Celebration (for progress-based scenarios like jar filling)
    if (behavior.end_celebration) {
      const ec = behavior.end_celebration;
      behaviorSection += `\n🎉 END CELEBRATION:\n`;
      behaviorSection += `Trigger: ${ec.trigger}\n`;
      if (ec.message_template) {
        behaviorSection += `Message: "${ec.message_template}"\n`;
      }
    }
  } else if (scenario.guide_rules) {
    // LEGACY: Plain text guide_rules (fallback for older scenarios)
    behaviorSection = `\n\nBEHAVIOR GUIDE:\n${scenario.guide_rules}`;
  }
  
  return `
You are ${scenario.ai_role} talking to a young ESL student (A0-A1 level).

SCENARIO: ${scenario.title}
YOUR ROLE: ${scenario.ai_role}
STUDENT ROLE: ${scenario.user_role}
CONTEXT: ${scenario.context}

⛔⛔⛔ CRITICAL VOCABULARY RESTRICTION ⛔⛔⛔
YOU CAN ONLY USE THESE EXACT WORDS: ${scenario.vocab_focus.join(', ')}

🚨 DOUBLE-CHECK BEFORE EVERY RESPONSE 🚨
Before suggesting ANY word or asking ANY question:
1. Look at the vocab list above
2. ONLY use words from that exact list
3. If a word is NOT in the list, you CANNOT mention it
4. If student uses words outside the list, IGNORE them and redirect back to allowed vocab

Example (Fashion Show scenario):
✅ CORRECT: "Is she tall or short?" (tall, short = in vocab list)
✅ CORRECT: "Does she have curly or straight hair?" (curly, straight, hair = in vocab list)
❌ WRONG: "What color is her dress?" (color, dress = NOT in vocab list)
❌ WRONG: "Does she wear a blue or red shirt?" (blue, red, shirt = NOT in vocab list)

🎯 PEDAGOGICAL RULES (STRICT ENFORCEMENT):

1. **USE COMPLETE SENTENCES:** Model correct grammar for ESL learners.
   ❌ "Nice!" → ✅ "That is nice!"
   ❌ "Tall?" → ✅ "Is she tall?"

2. **ALWAYS END WITH A QUESTION:** Encourage student to keep speaking.
   ❌ "She is pretty." → ✅ "She is pretty! Does she have long hair?"
   ❌ "Good!" → ✅ "Good! What about her glasses?"

3. **PROVIDE OR-CHOICES:** Help students by offering exactly 2 options from vocab list.
   ❌ "Describe her hair." → ✅ "Is her hair long or short?"
   ❌ "What about her height?" → ✅ "Is she tall or short?"
   
4. **REACT WARMLY:** Acknowledge what student said before asking next question.
   Pattern: [Acknowledge] + [Build on it] + [Question with OR-choices from vocab]
   ✅ Example: "She has long hair! Beautiful! Is it curly or straight?"
   
5. **KEEP IT SIMPLE:** Use A0-A1 grammar. Max 20 words per response. ONLY use vocabulary from the list above.
${grammarSection}
${scaffoldingSection}
${behaviorSection}

OPENING TASK:
If this is the first message, say: "${scenario.opening_line}"
Otherwise, respond to student and continue the roleplay.

RESPOND IN JSON FORMAT:
{
  "ai_response": "Your response here (MUST end with question + options)",
  "suggested_hints": ["word1", "word2", "word3"]
}
`;
}

/**
 * Get roleplays for a specific week
 * @param {number} weekNumber - Week number
 * @param {Object} weekData - Week data object
 * @returns {Array} Array of roleplay scenario summaries
 */
export function getRoleplaysForWeek(weekNumber, weekData) {
  console.log(`🔄 getRoleplaysForWeek called. Week: ${weekNumber}`);
  
  // Return scenarios from week data if available
  if (weekData?.roleplay_scenarios) {
    return weekData.roleplay_scenarios.map(s => ({
      id: s.id,
      label: s.title,
      emoji: s.emoji,
      character: s.ai_role,
      setting: s.context,
      vocab_focus: s.vocab_focus,
      opening_line: s.opening_line
    }));
  }
  
  // Fallback for older weeks without scenarios
  console.warn(`⚠️ No roleplay_scenarios found for week ${weekNumber}`);
  return [];
}
