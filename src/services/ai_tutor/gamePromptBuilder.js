/**
 * Game Prompt Builder - Inject Weekly Content into Games
 * 
 * Builds context-aware game prompts using vocabulary from weeks 1-current
 */

import { getGameContentForWeek, GAME_OPTIONS } from '../../config/gameAdaptation.js';
import { week1RealData } from '../../data/weeks/week_01_real.js';
import { week2RealData } from '../../data/weeks/week_02_real.js';
import { week3RealData } from '../../data/weeks/week_03_real.js';
import week4RealData from '../../data/weeks/week_04_real.js';
import week5RealData from '../../data/weeks/week_05_real.js';
import week6RealData from '../../data/weeks/week_06_real.js';
import week7RealData from '../../data/weeks/week_07_real.js';

/**
 * Get CURRENT WEEK vocabulary ONLY from gameAdaptation.js
 * DO NOT mix weeks - each week has specific vocabulary focus
 */
function getWeekSpecificVocabulary(weekId, gameContent, weekData) {
  // Use vocab from gameAdaptation.js template (week-specific)
  if (gameContent && gameContent.vocab && gameContent.vocab.length > 0) {
    console.log(`✅ Week ${weekId} GAME vocab from gameAdaptation.js:`, gameContent.vocab);
    return gameContent.vocab;
  }
  
  // Try weekData.target_vocab as fallback
  if (weekData && weekData.target_vocab && Array.isArray(weekData.target_vocab)) {
    const vocabWords = weekData.target_vocab
      .map(item => typeof item === 'string' ? item : item.word)
      .filter(Boolean);
    console.log(`✅ Week ${weekId} vocab from weekData.target_vocab:`, vocabWords);
    return vocabWords;
  }
  
  // Last resort: Use Week 5 vocab
  console.error(`❌ NO VOCAB FOUND for week ${weekId}! Using Week 5 fallback. gameContent:`, gameContent, 'weekData:', weekData);
  return ['bedroom', 'kitchen', 'bathroom', 'living room', 'lamp', 'sofa', 'table', 'chair', 'door', 'window'];
}

/**
 * Build game prompt with cumulative vocabulary injection
 * 
 * @param {string} gameId - Game identifier (word_chain, twenty_questions, sentence_builder)
 * @param {object} weekData - Current week data (theme, target_vocab, etc.)
 * @returns {object} Game prompt with instructions and context
 */
export function buildGamePrompt(gameId, weekData) {
  const weekId = weekData?.week_id || weekData?.weekId || 5;
  // 🔥 Convert to number for GAME_TEMPLATES lookup
  const weekNumber = typeof weekId === 'number' ? weekId : parseInt(weekId) || 5;
  
  console.log('🎮 buildGamePrompt called:', {
    gameId,
    weekId,
    weekNumber,
    hasWeekData: !!weekData,
    weekDataKeys: weekData ? Object.keys(weekData) : []
  });
  
  const gameContent = getGameContentForWeek(weekNumber, weekData);
  const gameConfig = gameContent.games[gameId];
  
  console.log('📦 Game content loaded:', {
    weekId,
    gameId,
    hasGameConfig: !!gameConfig,
    hasVocab: !!(gameContent && gameContent.vocab),
    vocabLength: gameContent?.vocab?.length || 0
  });
  
  if (!gameConfig) {
    console.error(`❌ Game "${gameId}" not found for week ${weekId}`);
    return null;
  }
  
  // Get WEEK-SPECIFIC vocabulary (NOT cumulative) - pass weekData too
  const weekVocab = getWeekSpecificVocabulary(weekId, gameContent, weekData);
  
  console.log('✅ Final vocab for game:', {
    weekId,
    gameId,
    vocab: weekVocab
  });
  
  // 🎯 FOR 20 QUESTIONS: Pre-select object from code to prevent AI hallucination
  let preSelectedObject = null;
  if (gameId === 'twenty_questions' && gameConfig.objects?.length > 0) {
    const randomIndex = Math.floor(Math.random() * gameConfig.objects.length);
    preSelectedObject = gameConfig.objects[randomIndex];
    console.log(`🎲 20 Questions: Pre-selected object: ${preSelectedObject}`);
  }
  
  // Build comprehensive game context for AI
  return {
    gameId,
    gameName: gameConfig.name_en,
    gameName_vi: gameConfig.name_vi,
    emoji: gameConfig.emoji,
    theme: gameContent.theme,
    vocabulary: weekVocab, // Use WEEK-SPECIFIC vocab only
    instructions: gameConfig.instructions,
    instructions_vi: gameConfig.instructions_vi,
    
    // Game-specific data
    starterWords: gameConfig.starter_words,
    objects: gameConfig.objects,
    patterns: gameConfig.patterns,
    hints: gameConfig.hints,
    examples: gameConfig.examples,
    example: gameConfig.example,
    preSelectedObject, // 🎯 NEW: Code-selected object for 20Q
    
    // AI prompt for this game
    aiPrompt: generateGameAIPrompt(gameId, gameConfig, { ...gameContent, vocab: weekVocab }, preSelectedObject)
  };
}

/**
 * Generate AI prompt for specific game type
 * @private
 * @param {string} preSelectedObject - Pre-selected object for 20 Questions (optional)
 */
function generateGameAIPrompt(gameId, gameConfig, gameContent, preSelectedObject = null) {
  const vocab = gameContent.vocab.join(', ');
  
  const prompts = {
    word_chain: `You are Ms. Nova 🔗 playing Word Chain.

⛔⛔⛔ CRITICAL VOCABULARY RESTRICTION ⛔⛔⛔
YOU CAN ONLY USE THESE WORDS: ${vocab}

FORBIDDEN: DO NOT use words outside the vocabulary list above. ONLY use words from: ${vocab}

🎯 RULE: You and student both use vocabulary words. Your word's last letter = student's word's first letter.

📝 RESPONSE FORMAT:
"Great! [STUDENT_WORD] starts with [LETTER]! Round [X]/20: I say [MY_WORD]! Your turn - starts with [LAST_LETTER]! Try: [HINT1], [HINT2]"

⚠️ BEFORE SAYING YOUR WORD:
1. Student's word ends with: [letter]
2. Check: Which vocab word starts with [letter]? 
3. If no vocab word starts with [letter], pick ANY vocab word from the list

VOCABULARY ONLY: ${vocab}

⛔⛔⛔ ALWAYS say "Round X/20" - NEVER "Round X/10" ⛔⛔⛔
⛔⛔⛔ DO NOT suggest words not in the vocabulary list ⛔⛔⛔

20 rounds total! 🎉`,

    twenty_questions: `You are Ms. Nova 🎯 playing 20 Questions WITH SUBTLE HINTS.

YOUR SECRET OBJECT: ${preSelectedObject?.toUpperCase()} 
(Don't reveal directly - give GENTLE hints to help student guess!)

=== ESL-FRIENDLY GUESSING WITH LIGHT CLUES ===

📝 FIRST MESSAGE - GIVE 2 GENTLE CLUES:
"Let's play 20 Questions! 🎉 I'm thinking of something in the [room]. 
🔍 Clue 1: [One feature]. 
🔍 Clue 2: You can [action].
Can you guess what it is? Ask YES/NO questions!"

GENTLE CLUE EXAMPLES (not too obvious!):
- table: "in the kitchen. It has legs. You can eat on it."
- chair: "in the living room. It has legs. You can sit on it."
- bed: "in the bedroom. It's soft. You sleep on it."
- lamp: "in the bedroom. It gives light. It helps you see."
- sofa: "in the living room. It's soft. You can relax on it."
- door: "It opens and closes. You walk through it."
- window: "on the wall. It's made of glass. You can look outside."
- mirror: "in the bathroom. It's shiny. You see your face."
- rug: "on the floor. It's soft. You walk on it."
- shelf: "on the wall. It holds things. You put books on it."

🎯 RESPONSE RULES:

1) Student asks YES/NO question → Answer honestly + helpful info
   Example: "Yes! It has 4 legs. What else do you want to know?"

2) Student guesses CORRECT → "Yes! It's a [object]! 🎉 NEW ROUND! I'm thinking of something in the [new room]. 🔍 Hint 1: [feature]. 🔍 Hint 2: You can [action]. What is it?"
   
3) Student guesses WRONG → "No, not a [wrong]. Keep asking!"

⚠️ AFTER CORRECT GUESS - ALWAYS GIVE 2 NEW HINTS:
DON'T just say "I'm thinking of something new" - MUST include 2 clues!
Example: "Yes! It's a table! 🎉 NEW ROUND! I'm thinking of something in the bedroom. 🔍 It's soft. 🔍 You sleep on it. What is it?"

✅ ALLOWED OBJECTS ONLY (USE THESE EXACT OBJECTS):
${gameConfig.objects?.join(', ') || 'No objects defined'}

⛔ NEVER USE OBJECTS NOT IN THE LIST ABOVE

Week ${gameContent.weekId || 5} Theme: ${gameContent.theme}

🎮 GAME STRUCTURE:
- Track progress internally (don't say "Round X/20" out loud)
- Give 2 hints at start of each object
- Student guesses in 2-3 rounds
- Total 20 rounds!`,

    sentence_builder: `You are Ms. Nova 🧩 playing Sentence Builder.

⛔⛔⛔ CRITICAL VOCABULARY RESTRICTION ⛔⛔⛔
YOU CAN ONLY USE THESE EXACT WORDS: ${vocab}

🚨🚨🚨 DOUBLE-CHECK BEFORE EVERY RESPONSE 🚨🚨🚨
BEFORE suggesting words to student:
1. Look at vocab list above
2. ONLY suggest words from that list
3. If a word is NOT in the list (like "bag", "closet", "chair", "bed"), you CANNOT use it

ALLOWED VOCAB: ${vocab}

Week ${gameContent.weekId || 5} Theme: ${gameContent.theme}

🎯 WEEK-SPECIFIC PATTERNS (THESE ARE THE ONLY 3 PATTERNS YOU CAN USE):
${gameConfig.patterns ? gameConfig.patterns.map((p, i) => `${i + 1}. "${p}"`).join('\n') : 'No patterns defined'}

⛔ YOU CANNOT INVENT OTHER PATTERNS LIKE:
- "I see a map near the..." ← FORBIDDEN (not in list above)
- "The [item] is [preposition] the..." ← FORBIDDEN unless exact match
- "Where is the...?" ← FORBIDDEN
- "I [CAN/CANNOT] see..." ← FORBIDDEN

📝 FIRST MESSAGE (MUST BE CLEAR AND ACTIONABLE):
"Let's play Sentence Builder! 🧩 You make complete sentences using vocabulary!
Week Theme: ${gameContent.theme}
Complete this sentence: '${gameConfig.patterns?.[0] || 'Complete a sentence with vocab words'}'
Use vocab words only: [suggest 2-3 words from ALLOWED VOCAB: ${vocab}]. Your turn!"

📝 MANDATORY RESPONSE TEMPLATE - COPY THIS EXACTLY EVERY ROUND:

"Great! [Student's answer]! 🎉 Complete this sentence: '[EXACT PATTERN FROM LIST]' Use: [suggest specific vocab words]. Your turn!"

⚠️ RESPONSE RULES - MUST FOLLOW:
1. ALWAYS start with "Great! [repeat student answer]! 🎉"
2. ALWAYS say "Complete this sentence: '[exact pattern with context]'"
3. ALWAYS give SPECIFIC vocab suggestions that fit the pattern
4. ALWAYS end with "Your turn!"
5. NEVER give blank patterns like "I like [V-ing] ____" - ADD CONTEXT!
6. DO NOT say "Round X/20" (track internally only)

CONTEXT-RICH PATTERN EXAMPLES BY WEEK:
- Week 4 Pattern 1: "Complete this sentence: 'I like [V-ing].' Use: [playing, singing]."
- Week 4 Pattern 2: "Complete this sentence: 'I like [V-ing] [object].' Try: reading + books, drawing + pictures."
- Week 6: "Complete this sentence: 'The treasure is [ON/UNDER/IN] the [place].' Use: box, desk, floor."
- Week 7: "Complete this sentence: 'There is a [item] in my [place].' Use: pen, backpack, book, desk."

ROUND SCHEDULE (STRICT):
- Turns 1-10: Use pattern 1 ONLY ("${gameConfig.patterns?.[0] || 'Pattern 1'}")
- Turns 11-20: Use pattern 2 ONLY ("${gameConfig.patterns?.[1] || gameConfig.patterns?.[0] || 'Pattern 2'}")

✅ CORRECT Examples (FOLLOW THESE):
- Week 4: "Great! I like reading! 🎉 Complete this sentence: 'I like [V-ing].' Use: [playing, singing]. Your turn!"
- Week 4: "Great! I like playing! 🎉 Complete this sentence: 'I like [V-ing] [object].' Try: reading + books, drawing + pictures. Your turn!"
- Week 6: "Great! The treasure is on the desk! 🎉 Complete this sentence: 'The treasure is [ON/UNDER/IN] the [place].' Use: [box, floor]. Your turn!"
- Week 7: "Great! There is a pen in my backpack! 🎉 Complete this sentence: 'There is a [item] in my [place].' Use: [book, desk]. Your turn!"

❌ WRONG Examples (NEVER DO THIS):
- "Great! I like reading too! 🎉 I like [V-ing] ____." ← TOO VAGUE! Missing context!
- "Yes! The map is on the desk! 🗺️ Good job!" ← MISSING NEXT QUESTION!
- "The map is [ON/UNDER/IN] the..." ← WRONG PATTERN (not in list)!
- "The treasure is IN the ... [bag, closet]" ← bag/closet NOT in vocab!

VOCABULARY ONLY: ${vocab}

EXAMPLES: ${gameConfig.examples?.join(' / ')}

⛔⛔⛔ DO NOT suggest words like bag, closet, chair, bed, sofa unless they're in vocab list ⛔⛔⛔
⛔⛔⛔ DO NOT create new patterns - ONLY use the patterns listed above ⛔⛔⛔
⛔⛔⛔ DO NOT say "Round X/20" - track progress internally ⛔⛔⛔

20 turns! 🎉`
  };
  
  return prompts[gameId] || `Play ${gameConfig.name_en} using vocabulary: ${vocab}`;
}

/**
 * Get all available games for current week
 */
export function getAvailableGames() {
  return GAME_OPTIONS;
}
