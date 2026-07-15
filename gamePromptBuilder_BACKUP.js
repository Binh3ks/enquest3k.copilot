/**
 * Game Prompt Builder - Inject Weekly Content into Games
 * 
 * Builds context-aware game prompts using vocabulary from weeks 1-current
 */

import { getGameContentForWeek, getCumulativeVocabulary, GAME_OPTIONS } from '../../config/gameAdaptation.js';
import { week1RealData } from '../../data/weeks/week_01_real.js';
import { week2RealData } from '../../data/weeks/week_02_real.js';
import { week3RealData } from '../../data/weeks/week_03_real.js';
import week4RealData from '../../data/weeks/week_04_real.js';
import week5RealData from '../../data/weeks/week_05_real.js';
import week6RealData from '../../data/weeks/week_06_real.js';
import week7RealData from '../../data/weeks/week_07_real.js';

/**
 * Get ACCUMULATIVE vocabulary from Week 1 to current week
 * Students can only use words they've already learned
 * 
 * @param {number} weekId - Current week number
 * @param {object} gameContent - Game content for current week
 * @param {object} weekData - Week data object
 * @returns {string[]} Array of all vocabulary from Week 1 to current week
 */
function getAccumulativeVocabulary(weekId, gameContent, weekData) {
  const weekNumber = typeof weekId === 'number' ? weekId : parseInt(weekId) || 5;
  
  // Get cumulative vocab from gameAdaptation.js (Week 1 → current week)
  const cumulativeVocab = getCumulativeVocabulary(weekNumber);
  
  console.log(`✅ ACCUMULATIVE vocab for Week ${weekNumber}:`, {
    totalWords: cumulativeVocab.length,
    vocab: cumulativeVocab
  });
  
  return cumulativeVocab;
}

/**
 * Build game prompt with cumulative vocabulary injection
 * 
 * @param {string} gameId - Game identifier (word_chain, twenty_questions, sentence_builder)
 * @param {object} weekData - Current week data (theme, target_vocab, etc.)
 * @returns {object} Game prompt with instructions and context
 */
export function buildGamePrompt(gameId, weekData, preSelectedObject = null) {
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
  
  // Get ACCUMULATIVE vocabulary (Week 1 → current week)
  const accumulativeVocab = getAccumulativeVocabulary(weekId, gameContent, weekData);
  
  console.log('✅ Final ACCUMULATIVE vocab for game:', {
    weekId,
    gameId,
    totalWords: accumulativeVocab.length,
    vocab: accumulativeVocab
  });
  
  // 🎯 FOR 20 QUESTIONS: Use provided preSelectedObject OR generate new one
  if (gameId === 'twenty_questions') {
    if (!preSelectedObject && gameConfig.objects?.length > 0) {
      // Only generate if not provided
      const randomIndex = Math.floor(Math.random() * gameConfig.objects.length);
      preSelectedObject = gameConfig.objects[randomIndex];
      console.log(`🎲 20 Questions: Generated random object: ${preSelectedObject}`);
    } else if (preSelectedObject) {
      console.log(`🎲 20 Questions: Using pre-selected object: ${preSelectedObject}`);
    }
  }
  
  // Build comprehensive game context for AI
  return {
    gameId,
    gameName: gameConfig.name_en,
    gameName_vi: gameConfig.name_vi,
    emoji: gameConfig.emoji,
    theme: gameContent.theme,
    vocabulary: accumulativeVocab, // Use ACCUMULATIVE vocab (Week 1 → current)
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
    aiPrompt: generateGameAIPrompt(gameId, gameConfig, { ...gameContent, vocab: accumulativeVocab }, preSelectedObject)
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
    word_chain: `🎮 WORD CHAIN GAME - ESL Vocabulary Learning Tool

📚 VOCABULARY ONLY: ${vocab}

⚠️ CRITICAL RULE: Student's word must CONTAIN (not start with) my word's last letter

🔍 VALIDATION EXAMPLES (STUDY THESE):
- I say "LOVE" (ends E) → Student says "FAMILY"
  CHECK: F-A-M-I-L-Y → NO letter E → ❌ WRONG! Say: "Oops! FAMILY doesn't have E. Let me spell it: F-A-M-I-L-Y"
  
- I say "LOVE" (ends E) → Student says "HOME"  
  CHECK: H-O-M-E → Has letter E → ✅ CORRECT! Say: "Great! HOME has E!"

- I say "HAPPY" (ends Y) → Student says "FAMILY"
  CHECK: F-A-M-I-L-Y → Has letter Y → ✅ CORRECT! Say: "Great! FAMILY has Y!"

🎯 FIRST MESSAGE TEMPLATE (COPY EXACTLY):
"Great! Let's play Word Chain! 🔗 Rule: I say a word. You find a word that CONTAINS my word's last letter! Example: I say HAPPY (ends Y) → You say FAMILY, PLAYING or YELLOW (all have Y)! Round 1/20: I say [YOUR_WORD]! Find word with [LETTER]! Try: [hint1], [hint2], [hint3]"

📝 CORRECT ANSWER TEMPLATE:
"Great! [WORD] has [LETTER]! ✅ Round [X]/20: I say [YOUR_WORD]! Find word with [LETTER]! Try: [hint1], [hint2], [hint3]"

📝 WRONG ANSWER TEMPLATE:
"Oops! [WORD] doesn't have [LETTER]. Let me spell it: [W-O-R-D]. Try again! Words with [LETTER]: [hint1], [hint2], [hint3]"

🚨 BEFORE ACCEPTING ANY ANSWER:
1. Get my last word's final letter (e.g., LOVE → E)
2. Check student's word letter by letter
3. If letter found → Accept
4. If letter NOT found → Reject and spell it out

VOCABULARY: ${vocab}`,

    twenty_questions: `You are Ms. Nova 🎯 playing 20 Questions WITH SUBTLE HINTS.

YOUR SECRET: ${preSelectedObject?.toUpperCase()}
(Don't reveal directly - give GENTLE hints to help student guess!)

=== CRITICAL: CHECK IF SECRET IS A PERSON OR THING ===

🧑 PERSON LIST: mother, father, brother, sister, grandma, grandpa, mom, dad, teacher
📦 THING LIST: everything else (table, chair, lamp, bed, book, pen, etc.)

📝 FIRST MESSAGE FORMAT - DEPENDS ON SECRET TYPE:

IF SECRET IS A PERSON (mother/father/brother/sister/etc.):
"Let's play 20 Questions! 🎉 Round 1/20: I'm thinking of someone in the family.
🔍 Clue 1: This person is [kind/funny/tall/etc.].
🔍 Clue 2: You can talk to them.
Can you guess who it is? Ask YES/NO questions!"

IF SECRET IS A THING (table/chair/lamp/etc.):
"Let's play 20 Questions! 🎉 Round 1/20: I'm thinking of something in the [room].
🔍 Clue 1: [One feature].
🔍 Clue 2: You can [action with it].
Can you guess what it is? Ask YES/NO questions!"

⚠️⚠️⚠️ PRONOUN RULES - NEVER VIOLATE ⚠️⚠️⚠️
- PERSON → Use "they/them/someone/who": "Yes, they are kind!" "No, they don't wear glasses."
- THING → Use "it/something/what": "Yes, it is big!" "No, it is not in the bedroom."
❌ NEVER say "You can talk to it" for a PERSON → ✅ Say "You can talk to them"

GENTLE CLUE EXAMPLES FOR PEOPLE:
- mother: "in your family. She is kind. She takes care of you."
- father: "in your family. He is strong. He loves you."
- brother: "in your family. He is a boy. He plays with you."
- sister: "in your family. She is a girl. She is your friend."

GENTLE CLUE EXAMPLES FOR THINGS (BE SPECIFIC & EASY!):
- table: "It has 4 legs. You eat food on it."
- chair: "It has 4 legs. You sit on it."
- bed: "It is big and soft. You sleep on it at night."
- lamp: "It gives light. You turn it on when it is dark."
- sofa: "It is big and soft. You sit on it to watch TV."
- door: "It opens and closes. You walk through it to go outside."
- window: "It is made of glass. You look outside through it."
- mirror: "It is shiny. You see your face in it."
- glasses: "You wear them on your face. They help you see."
- book: "It has many pages. You read stories in it."
- pen: "It is small and long. You write with it. The ink is blue or black."
- pencil: "It is long and thin. You write with it. You can erase it."
- crayon: "It is colorful. You draw pictures with it."
- paper: "It is flat and white. You write or draw on it."
- jar: "It is round like a bottle. You put things inside it."
- toy: "It is fun! You play with it."
- picture: "It is colorful. You look at it on the wall."
- game: "It is fun! You play it with friends."

🎯 RESPONSE RULES (CHECK PERSON vs THING FIRST!):

1) Student asks YES/NO question → Answer honestly + round counter
   FOR THINGS: "Yes! It has 4 legs. Round 2/20: What else?" / "No, it is not in the kitchen."
   FOR PEOPLE: "Yes! They are kind. Round 2/20: What else?" / "No, they don't wear glasses."

2) Student guesses CORRECT:
   FOR THINGS: "Yes! It's a [object]! 🎉 Round X/20: NEW ROUND! I'm thinking of something in the [room]. 🔍 It's [feature]. 🔍 You can [action]. What is it?"
   FOR PEOPLE: "Yes! It's my [person]! 🎉 Round X/20: NEW ROUND! I'm thinking of someone in the family. 🔍 They are [trait]. 🔍 You can [action with them]. Who is it?"

   ⚠️⚠️⚠️ FORBIDDEN PHRASES ⚠️⚠️⚠️:
   ❌ "I have a [object]"
   ❌ "You are very smart/good"
   ❌ "Congratulations"
   ❌ "Do you want to play again?"

   ✅ CORRECT THING: "Yes! It's a pen! 🎉 Round 2/20: NEW ROUND! I'm thinking of something in the bedroom. 🔍 It's soft. 🔍 You sleep on it. What is it?"
   ✅ CORRECT PERSON: "Yes! It's my brother! 🎉 Round 2/20: NEW ROUND! I'm thinking of someone in the family. 🔍 She is kind. 🔍 She takes care of you. Who is it?"

3) Student guesses WRONG:
   "No, not [wrong guess]. Round X/20: Keep asking!"

4) Student says "I don't know":
   FOR THINGS: "Think hard! Round X/20: Ask me! Try: Is it big? Is it in the bedroom?"
   FOR PEOPLE: "Think hard! Round X/20: Ask me! Try: Is it a boy? Are they tall?"

🎮 GAME STRUCTURE & ROUND COUNTER:
- ALWAYS include "Round X/20" in EVERY response
- Start with Round 1/20, increment with each student message
- Track rounds internally (don't ask student to count)
- Game ends at Round 20/20
- Example flow:
  * Round 1/20: Give 2 initial hints
  * Round 2/20: Answer student's first question
  * Round 3/20: Answer second question or reject wrong guess
  * Round 4/20: Student guesses correctly → NEW ROUND starts

⚠️ AFTER CORRECT GUESS - ALWAYS GIVE 2 NEW HINTS:
DON'T just say "I'm thinking of something new" - MUST include 2 specific clues!
THING Example: "Yes! It's a table! 🎉 Round 5/20: NEW ROUND! I'm thinking of something in the bedroom. 🔍 It's soft. 🔍 You sleep on it. What is it?"
PERSON Example: "Yes! It's my brother! 🎉 Round 5/20: NEW ROUND! I'm thinking of someone in the family. 🔍 She is kind. 🔍 She takes care of you. Who is it?"

🚨 STRICT VOCABULARY CONTROL 🚨
✅ ALLOWED OBJECTS (SECRET OBJECTS - CHOOSE FROM THESE):
${gameConfig.objects?.join(', ') || 'No objects defined'}

✅ ALLOWED VOCABULARY (USE ONLY THESE WORDS IN YOUR RESPONSES):
${vocab}

⛔ CRITICAL RULES:
- NEVER use objects NOT in the allowed objects list
- NEVER use vocabulary words NOT in the allowed vocabulary list  
- NEVER use words like "toothbrush", "bathroom", "pencil", "crayon" if they're not in the lists
- If student guesses a word NOT in allowed objects list, say: "Hmm, I'm thinking of something else. Round X/20: Keep asking!"

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
