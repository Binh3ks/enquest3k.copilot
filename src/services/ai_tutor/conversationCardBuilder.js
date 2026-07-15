/**
 * CONVERSATION CARDS BUILDER
 * Fixed dialogue practice with blanks/choices - replaces unreliable roleplay
 * 
 * Features:
 * - Pre-written scripts (no AI hallucination)
 * - Fill-in-blanks / Multiple choice
 * - Pattern matching validation (no complex AI)
 * - Clear progress (3/6 exchanges complete)
 */

/**
 * Build conversation card prompt for AI to present next exchange
 * @param {string} cardId - Conversation card ID (e.g., 'meet_classmate')
 * @param {Object} weekData - Week data containing conversation_cards
 * @param {number} currentExchange - Current exchange index (0-based)
 * @returns {Object} Prompt config or null
 */
export function buildConversationCardPrompt(cardId, weekData, currentExchange = 0) {
  const cards = weekData?.conversation_cards || [];
  const card = cards.find(c => c.id === cardId);
  
  if (!card) {
    console.error(`❌ Conversation card not found: ${cardId}`);
    return null;
  }
  
  const totalExchanges = card.exchanges.length;
  const exchange = card.exchanges[currentExchange];
  
  if (!exchange) {
    // Conversation complete!
    return {
      cardId,
      title: card.title,
      isComplete: true,
      completionMessage: card.completion_message,
      totalExchanges,
      aiPrompt: generateCompletionPrompt(card)
    };
  }
  
  console.log(`💬 Building conversation card: ${card.title} (Exchange ${currentExchange + 1}/${totalExchanges})`);
  
  return {
    cardId,
    title: card.title,
    emoji: card.emoji || '💬',
    currentExchange,
    totalExchanges,
    exchange,
    aiPrompt: generateExchangePrompt(card, exchange, currentExchange, totalExchanges)
  };
}

/**
 * Generate AI prompt for presenting an exchange
 * @private
 */
function generateExchangePrompt(card, exchange, currentIndex, total) {
  const progressIndicator = `(${currentIndex + 1}/${total})`;
  
  // Build expected response guidance
  let responseGuidance = '';
  if (exchange.options) {
    responseGuidance = `
STUDENT WILL CHOOSE ONE OF:
${exchange.options.map((opt, i) => `${i + 1}. "${opt}"`).join('\n')}

YOUR JOB: Present the dialogue line, then WAIT for student's choice.`;
  } else if (exchange.fill_blank) {
    responseGuidance = `
STUDENT WILL FILL IN THE BLANK:
Template: "${exchange.fill_blank}"
Expected words: ${exchange.accept_words?.join(', ') || 'any'}

YOUR JOB: Present the dialogue line and blank, then WAIT for student to fill.`;
  } else if (exchange.student_template) {
    responseGuidance = `
STUDENT WILL COMPLETE:
Template: "${exchange.student_template}"
Acceptable patterns: ${exchange.accept?.join(' OR ') || 'flexible'}

YOUR JOB: Present the dialogue line, show template hint, then WAIT.`;
  }
  
  return `
🎭 CONVERSATION CARD: ${card.title} ${card.emoji || '💬'}
📊 Progress: Exchange ${currentIndex + 1}/${total}

⚠️⚠️⚠️ CRITICAL: You are presenting a FIXED DIALOGUE SCRIPT ⚠️⚠️⚠️

CURRENT EXCHANGE:
AI Says: "${exchange.ai}"

${responseGuidance}

🎯 YOUR EXACT RESPONSE FORMAT:

{
  "ai_response": "${exchange.ai} ${progressIndicator}",
  "suggested_hints": ${JSON.stringify(getHintsForExchange(exchange))},
  "pedagogy_note": "Conversation practice: ${exchange.options ? 'Choose response' : exchange.fill_blank ? 'Fill blank' : 'Complete sentence'}"
}

⛔ DO NOT:
- Add extra dialogue beyond the script
- Ask follow-up questions
- Start a new topic
- Modify the exchange text

✅ ONLY:
- Say the exact AI line from script
- Show progress indicator
- Provide helpful hints for student response
- Wait for student's turn
`;
}

/**
 * Generate completion prompt
 * @private
 */
function generateCompletionPrompt(card) {
  return `
🎉 CONVERSATION COMPLETE: ${card.title}

The student has finished all exchanges in this conversation card!

YOUR EXACT RESPONSE:

{
  "ai_response": "${card.completion_message}",
  "suggested_hints": ["great", "job", "well", "done"],
  "pedagogy_note": "Conversation card completed successfully!"
}
`;
}

/**
 * Get helpful hints for current exchange
 * @private
 */
function getHintsForExchange(exchange) {
  if (exchange.options) {
    // Extract key words from options
    return exchange.options.flatMap(opt => 
      opt.toLowerCase().split(' ').filter(w => w.length > 2)
    ).slice(0, 6);
  }
  
  if (exchange.accept_words) {
    return exchange.accept_words;
  }
  
  if (exchange.accept) {
    return exchange.accept.flatMap(pattern => 
      pattern.toLowerCase().split(' ').filter(w => w.length > 2)
    ).slice(0, 6);
  }
  
  return ['yes', 'no', 'I', 'am', 'is', 'are'];
}

/**
 * Simple rephrasing for acknowledgements.
 * "I am" -> "You are", "My" -> "Your"
 * @param {string} text
 * @returns {string}
 */
function rephraseAck(text) {
  let rephrased = text.replace(/I am/gi, 'You are');
  rephrased = rephrased.replace(/My/gi, 'Your');
  return rephrased;
}

/**
 * Validate student response against exchange requirements
 * @param {Object} exchange - Current exchange
 * @param {string} studentResponse - Student's actual response
 * @returns {Object} { isValid: boolean, feedback: string, normalizedResponse: string }
 */
export function validateExchangeResponse(exchange, studentResponse) {
  const normalized = studentResponse.trim().toLowerCase().replace(/[!?.,;:]/g, '');
  
  // 1. OPTIONS MODE - Must match one of the choices
  if (exchange.options) {
    const matchedOption = exchange.options.find(opt => {
      const normOpt = opt.toLowerCase().replace(/[!?.,;:]/g, '').trim();
      return normalized === normOpt || normalized.includes(normOpt);
    });
    
    if (matchedOption) {
      return {
        isValid: true,
        feedback: `Perfect! ${rephraseAck(matchedOption)}.`,
        normalizedResponse: matchedOption
      };
    }
    
    return {
      isValid: false,
      feedback: `Try one of these: ${exchange.options.join(' or ')}`,
      normalizedResponse: null
    };
  }
  
  // 2. FILL BLANK MODE - Must contain accepted word
  if (exchange.fill_blank && exchange.accept_words) {
    const containsAcceptedWord = exchange.accept_words.some(word => 
      normalized.includes(word.toLowerCase())
    );
    
    if (containsAcceptedWord) {
      const matchedWord = exchange.accept_words.find(w => normalized.includes(w.toLowerCase()));
      const fullSentence = exchange.fill_blank.replace('___', matchedWord);
      return {
        isValid: true,
        feedback: `Great! ${rephraseAck(fullSentence)}.`,
        normalizedResponse: studentResponse
      };
    }
    
    return {
      isValid: false,
      feedback: `Use one of these words: ${exchange.accept_words.join(', ')}`,
      normalizedResponse: null
    };
  }
  
  // 3. TEMPLATE MODE - Must match pattern
  if (exchange.accept) {
    const matchesPattern = exchange.accept.some(pattern => {
      const patternWords = pattern.toLowerCase().split(' ').filter(w => w.length > 0);
      return patternWords.every(word => normalized.includes(word));
    });
    
    if (matchesPattern) {
      return {
        isValid: true,
        feedback: `Excellent! ${rephraseAck(studentResponse)}.`,
        normalizedResponse: studentResponse
      };
    }
    
    return {
      isValid: false,
      feedback: `Try: ${exchange.student_template || exchange.accept[0]}`,
      normalizedResponse: null
    };
  }
  
  // 4. OPEN MODE - Accept any response
  return {
    isValid: true,
    feedback: `Good! ✓`,
    normalizedResponse: studentResponse
  };
}

/**
 * Get all available conversation cards for current week
 * @param {Object} weekData - Week data
 * @returns {Array} List of available cards with metadata
 */
export function getAvailableConversationCards(weekData) {
  const cards = weekData?.conversation_cards || [];
  
  return cards.map(card => ({
    id: card.id,
    title: card.title,
    emoji: card.emoji || '💬',
    exchanges: card.exchanges.length,
    difficulty: card.difficulty || 'medium',
    theme: card.theme || weekData.theme
  }));
}
