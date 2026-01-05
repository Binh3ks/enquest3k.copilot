/**
 * Grammar Guard V5 - Pedagogical Engine Guardrails
 * 
 * Validates AI responses against week-specific grammar scope
 * Prevents curriculum violations for Vietnamese ESL A0++ learners
 * 
 * Architecture: Ported from legacy with V5 enhancements
 */

// ============================================
// GRAMMAR RULES BY WEEK
// ============================================

const GRAMMAR_RULES = {
  1: {
    name: 'Week 1-4: Present Simple Only',
    allowed: [
      'I am / You are / He is / She is / It is / We are / They are',
      'I have / You have / He has / She has',
      'Where is / Where are',
      'What is / What are',
      'My / Your / His / Her',
      'This is / That is'
    ],
    banned: [
      'Past tense (was/were/did/had)',
      'Future tense (will/going to)',
      'Past participle (-ed verbs)',
      'Modal verbs except "can"',
      'Perfect tenses',
      'Continuous tenses (-ing)'
    ],
    bannedWords: [
      'was', 'were', 'did', 'went', 'saw', 'had', 'made', 'got',
      'came', 'took', 'found', 'said', 'told', 'knew',
      'will', 'would', 'should', 'could', 'might', 'must',
      'have been', 'has been', 'had been',
      'going to', 'gonna', 'wanna'
    ],
    bannedPatterns: [
      /\b\w+ed\b/gi,  // -ed verbs (past tense)
      /\b(was|were|did|had|went|saw|found)\b/gi, // Irregular past tense
      /\b(did|didn't|don't)\s+\w+\b/gi,  // Auxiliary 'did'
      /\b(will|won't)\b/gi,
      /\b(have|has)\s+\w+(ed|en)\b/gi,  // Present perfect
      /\b(have|has)\s+(gone|seen|done|been|had|found)\b/gi // Irregular perfect
    ]
  },
  5: {
    name: 'Week 5-14: Present Simple + Can',
    allowed: [
      'Present Simple (all from Week 1)',
      'Can / Cannot / Can\'t',
      'Simple questions with Do/Does'
    ],
    banned: [
      'Past tense',
      'Future tense',
      'Perfect tenses',
      'Other modal verbs (should/would/could)'
    ],
    bannedWords: [
      'was', 'were', 'did', 'went', 'saw', 'had', 
      'will', 'would', 'should', 'could', 'might',
      'have been', 'has been'
    ],
    bannedPatterns: [
      /\b\w+ed\b/gi,
      /\b(was|were)\b/gi,
      /\b(will|won't)\b/gi
    ]
  },
  15: {
    name: 'Week 15-28: Present + Past Simple',
    allowed: [
      'Present Simple',
      'Past Simple (was/were, -ed verbs)',
      'Can',
      'Simple conjunctions (and/but/because)'
    ],
    banned: [
      'Future tense',
      'Perfect tenses',
      'Continuous tenses',
      'Modal verbs except can'
    ],
    bannedWords: [
      'will', 'would', 'should', 'could', 'might',
      'have been', 'has been', 'had been',
      'going to'
    ],
    bannedPatterns: [
      /\b(will|won't)\b/gi,
      /\bhave\s+\w+ed\b/gi,  // Present perfect
      /\bhad\s+\w+ed\b/gi    // Past perfect
    ]
  },
  29: {
    name: 'Week 29+: All Basic Grammar',
    allowed: [
      'Present Simple',
      'Past Simple',
      'Future Simple (will)',
      'Can/Should/Would',
      'Present Continuous (-ing)',
      'Basic conditionals (if)'
    ],
    banned: [
      'Perfect tenses',
      'Complex conditionals',
      'Passive voice (advanced)'
    ],
    bannedWords: [
      'have been', 'has been', 'had been',
      'would have', 'could have', 'should have'
    ],
    bannedPatterns: [
      /\bhave\s+been\s+\w+ing\b/gi,  // Present perfect continuous
      /\bhad\s+been\s+\w+ing\b/gi    // Past perfect continuous
    ]
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get grammar rules for a specific week
 * @param {number} weekId - Current week (1-156)
 * @returns {Object} Grammar rules object
 */
function getGrammarRules(weekId) {
  if (weekId <= 4) return GRAMMAR_RULES[1];
  if (weekId <= 14) return GRAMMAR_RULES[5];
  if (weekId <= 28) return GRAMMAR_RULES[15];
  return GRAMMAR_RULES[29];
}

/**
 * Check if text violates grammar scope
 * @param {string} text - Text to validate
 * @param {number} weekId - Current week
 * @returns {{ valid: boolean, violations: string[] }}
 */
export function validateGrammarScope(text, weekId) {
  if (!text || typeof text !== 'string') {
    return { valid: true, violations: [] };
  }
  
  const rules = getGrammarRules(weekId);
  const violations = [];
  const lowerText = text.toLowerCase();
  
  // Check banned words
  for (const word of rules.bannedWords) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    if (regex.test(lowerText)) {
      violations.push(`Banned word: "${word}" (${rules.name})`);
    }
  }
  
  // Check banned patterns
  for (const pattern of rules.bannedPatterns) {
    const matches = text.match(pattern);
    if (matches && matches.length > 0) {
      violations.push(`Banned pattern: ${matches.slice(0, 3).join(', ')} (${rules.name})`);
    }
  }
  
  return {
    valid: violations.length === 0,
    violations
  };
}

/**
 * Validate AI response against grammar scope
 * Used in V5 aiRouter after AI returns response
 * 
 * @param {Object} aiResponse - Parsed AI response
 * @param {string} aiResponse.ai_response - Main AI text
 * @param {Array<string>} aiResponse.suggested_hints - Hint chips
 * @param {number} weekId - Current week
 * @returns {{ valid: boolean, violations: string[], shouldRegenerate: boolean }}
 */
export function validateAIResponse(aiResponse, weekId) {
  if (!aiResponse || typeof aiResponse !== 'object') {
    return { valid: false, violations: ['Invalid AI response structure'], shouldRegenerate: true };
  }

  const checks = [];
  
  // Check main AI response text
  if (aiResponse.ai_response) {
    const result = validateGrammarScope(aiResponse.ai_response, weekId);
    if (!result.valid) {
      checks.push({ field: 'ai_response', violations: result.violations });
    }
  }

  // Check suggested hints
  if (Array.isArray(aiResponse.suggested_hints)) {
    for (const hint of aiResponse.suggested_hints) {
      const result = validateGrammarScope(hint, weekId);
      if (!result.valid) {
        checks.push({ field: 'hint', violations: result.violations });
      }
    }
  }

  const allViolations = checks.flatMap(check => 
    check.violations.map(v => `[${check.field}] ${v}`)
  );

  return {
    valid: allViolations.length === 0,
    violations: allViolations,
    shouldRegenerate: allViolations.length > 0
  };
}

/**
 * Get grammar summary for current week
 * Used in prompts to remind AI of grammar scope
 * 
 * @param {number} weekId - Current week
 * @returns {string} Grammar rules summary
 */
export function getGrammarSummary(weekId) {
  const rules = getGrammarRules(weekId);
  return `${rules.name}\nAllowed: ${rules.allowed.join(', ')}\nBanned: ${rules.banned.join(', ')}`;
}

/**
 * Generate regeneration instruction for AI
 * Used when grammar violations detected
 * 
 * @param {Array<string>} violations - List of violation messages
 * @param {number} weekId - Current week
 * @returns {string} Instruction for AI to fix grammar
 */
export function getRegenerationInstruction(violations, weekId) {
  const rules = getGrammarRules(weekId);
  return `
⚠️ GRAMMAR VIOLATION DETECTED. Please regenerate your response.

Violations found:
${violations.map(v => `- ${v}`).join('\n')}

Reminder - ${rules.name}:
✅ ONLY use: ${rules.allowed.slice(0, 3).join(', ')}
❌ NEVER use: ${rules.banned.slice(0, 3).join(', ')}

Regenerate your response using ONLY the allowed grammar.
`.trim();
}
