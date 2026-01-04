/**
 * Grammar Guard - Blocks banned grammar structures
 * Prevents AI from generating content that violates week-specific grammar scope
 * Critical for Vietnamese ESL A0++ learners who need strict scaffolding
 */

/**
 * Grammar rules by week
 * Based on Master Prompt V23 and Syllabus
 */
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
      /\b(was|were|did|had|went|saw|found)\b/gi, // IRREGULAR VERB BLOCKLIST (VBD/VBN)
      /\b(did|didn't|don't)\s+\w+\b/gi,  // did you go, didn't see
      /\b(will|won't)\b/gi,
      /\b(have|has)\s+\w+(ed|en)\b/gi,  // present perfect heuristic
      /\b(have|has)\s+(gone|seen|done|been|had|found)\b/gi // irregular perfect
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
      /\bhave\s+\w+ed\b/gi,  // present perfect
      /\bhad\s+\w+ed\b/gi    // past perfect
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
      /\bhave\s+been\s+\w+ing\b/gi,  // present perfect continuous
      /\bhad\s+been\s+\w+ing\b/gi    // past perfect continuous
    ]
  }
};

/**
 * Get grammar rules for a specific week
 * @param {number} weekId - Current week (1-121)
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
 * @param {string} text - Text to check (hints, story_beat, task)
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
      violations.push({
        type: 'banned_word',
        word: word,
        message: `Banned word: "${word}" (${rules.name} only allows: ${rules.allowed.slice(0, 3).join(', ')}...)`
      });
    }
  }
  
  // Check banned patterns
  for (const pattern of rules.bannedPatterns) {
    const matches = text.match(pattern);
    if (matches && matches.length > 0) {
      violations.push({
        type: 'banned_pattern',
        matches: matches,
        message: `Banned grammar pattern: ${matches.join(', ')} (${rules.name})`
      });
    }
  }
  
  return {
    valid: violations.length === 0,
    violations: violations.map(v => v.message)
  };
}

/**
 * Validate array of hints
 * @param {string[]} hints - Array of hint strings
 * @param {number} weekId - Current week
 * @returns {{ valid: boolean, violations: string[] }}
 */
export function validateHints(hints, weekId) {
  if (!Array.isArray(hints)) {
    return { valid: true, violations: [] };
  }
  
  const allViolations = [];
  
  for (const hint of hints) {
    const result = validateGrammarScope(hint, weekId);
    if (!result.valid) {
      allViolations.push(`Hint "${hint}": ${result.violations.join('; ')}`);
    }
  }
  
  return {
    valid: allViolations.length === 0,
    violations: allViolations
  };
}

/**
 * Block and throw error if grammar violations found
 * Use this as pre-flight check before returning AI response to student
 * @param {Object} aiResponse - Parsed AI response { story_beat, task, scaffold }
 * @param {number} weekId - Current week
 * @throws {Error} If grammar violations detected
 * @returns {Object} Same aiResponse if valid
 */
export function enforceGrammarScope(aiResponse, weekId) {
  if (!aiResponse) {
    throw new Error('AI response is null or undefined');
  }
  
  const checks = [
    {
      field: 'story_beat',
      result: validateGrammarScope(aiResponse.story_beat || '', weekId)
    },
    {
      field: 'task',
      result: validateGrammarScope(aiResponse.task || '', weekId)
    },
    {
      field: 'hints',
      result: validateHints(aiResponse.scaffold?.hints || [], weekId)
    }
  ];
  
  const allViolations = checks
    .filter(check => !check.result.valid)
    .map(check => `[${check.field}] ${check.result.violations.join('; ')}`)
    .flat();
  
  if (allViolations.length > 0) {
    console.error('[GrammarGuard] BLOCKED AI Response:', {
      weekId,
      violations: allViolations,
      response: aiResponse
    });
    
    throw new Error(
      `Grammar scope violation detected. Week ${weekId} rules violated. ` +
      `Errors: ${allViolations.join(' | ')}. ` +
      `Please regenerate response with correct grammar scope.`
    );
  }
  
  console.log(`[GrammarGuard] ✓ Validated Week ${weekId} grammar scope`);
  return aiResponse;
}

/**
 * Get allowed grammar summary for current week
 * @param {number} weekId - Current week
 * @returns {string} Human-readable grammar rules
 */
export function getGrammarSummary(weekId) {
  const rules = getGrammarRules(weekId);
  return `${rules.name}\nAllowed: ${rules.allowed.join(', ')}\nBanned: ${rules.banned.join(', ')}`;
}
