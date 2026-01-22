/**
 * FREE TALK 3.0 - Games, Roleplay, Translation, Knowledge, Chat
 * Separated module for cleaner code organization
 */

import { TutorModes } from './tutorModes.js';
import { buildGamePrompt } from './gamePromptBuilder.js';
import { buildRoleplayPrompt } from './roleplayPromptBuilder.js';

export function buildFreeTalkPrompt(mode, context, userMessage, options = {}) {
  const history = options.history || [];
  const lastAIMessage = history.length > 0
    ? (history[history.length - 1]?.content || "")
    : "";
  
  // Detect if we're in an ongoing game/roleplay session
  const lowerAI = lastAIMessage.toLowerCase();
  const isInGame = lowerAI.includes("your turn") || lowerAI.includes("guess") || 
                   lowerAI.includes("i spy") || lowerAI.includes("word chain") || 
                   lowerAI.includes("emoji mixer") || lowerAI.includes("round") ||
                   lowerAI.includes("starts with") || lowerAI.includes("last letter");
  const isInRoleplay = lowerAI.includes("pizza chef") || lowerAI.includes("pet doctor") || 
                       lowerAI.includes("toy shop") || lowerAI.includes("customer") ||
                       lowerAI.includes("what pizza") || lowerAI.includes("my cat") ||
                       lowerAI.includes("turn") && (lowerAI.includes("chef") || lowerAI.includes("doctor") || lowerAI.includes("shop"));

  console.log('🎯 buildFreeTalkPrompt called:', { mode, userMessage: userMessage?.slice(0, 30), isInGame, isInRoleplay });

  // =================================================================
  // FREE TALK 3.0 & CHAT ENGINE (MERGED LOGIC)
  // =================================================================
  if (mode === TutorModes.FREE_TALK || mode === TutorModes.CHAT || mode === 'chat' || mode === 'freetalk') {

    const topic = context.topic || "General";
    // Chuẩn hóa input để bắt lệnh chính xác
    const lowerUser = userMessage ? userMessage.toLowerCase().trim() : "";
    const lowerAI = lastAIMessage ? lastAIMessage.toLowerCase().trim() : "";

    // --- A. KNOWLEDGE MODE (ENCYCLOPEDIA) ---
    // Trigger: Explicit "Ask me anything" OR "Why/How/What is" questions
    const isKnowledgeRequest =
        lowerUser.includes("ask me anything") ||
        lowerUser.startsWith("start_knowledge") ||
        (lowerUser.includes("why") && lowerUser.includes("?")) ||
        (lowerUser.includes("how") && lowerUser.includes("?")) ||
        (lowerUser.includes("what is") && !lowerUser.includes("your name") && !lowerUser.includes("game"));

    if (isKnowledgeRequest) {
      return `
      SYSTEM_MODE: ENCYCLOPEDIA_FOR_KIDS
      ROLE: Ms. Nova (Knowledgeable, Friendly teacher for kids A0-A1).
      USER QUESTION: "${userMessage}"

      INSTRUCTIONS:
      1. ANSWER the question Factually but SIMPLY (Level A0-A1).
      2. ⛔ DO NOT deflect. DO NOT ask "what do you like?".
      3. ⛔ DO NOT start a game unless asked.
      4. IF too hard (Physics/Politics): "That is a big question! 🌍 Ask your parents!"
      5. IF simple: Explain clearly using simple words + emojis.
      6. Keep response under 30 words.

      RESPOND IN THIS JSON FORMAT:
      {
        "ai_response": "Your factual answer here with emoji",
        "suggested_hints": ["related", "words", "to", "topic"]
      }
      `;
    }

    // --- B. GAME MODE (STRUCTURED PLAY) ---
    // Check if user is starting a NEW game (reset counter)
    const startingNewGame = lowerUser.startsWith("start_game:") || lowerUser.startsWith("start_roleplay:");
    
    // Detect if we're continuing an ongoing game (but not starting new one)
    if (isInGame && !startingNewGame) {
      // User wants to continue the game or needs help
      const needsHint = lowerUser.includes("gợi ý") || lowerUser.includes("hint") || 
                        lowerUser.includes("i don't know") || lowerUser.includes("khó quá") ||
                        lowerUser.includes("không biết");
      const wantsContinue = lowerUser.includes("tiếp tục") || lowerUser.includes("next") || 
                            lowerUser.includes("continue") || lowerUser.includes("tiep tuc");
      
      return `
      SYSTEM_MODE: GAME_MASTER_ONGOING
      ROLE: Ms. Nova as Game Host continuing the game.
      LAST AI: "${lastAIMessage}"
      USER RESPONSE: "${userMessage}"
      
      CRITICAL RULES:
      1. IF user asks for hint/"gợi ý"/"I don't know"/"không biết" -> Give helpful hint (color, shape, first letter, example)
      2. IF user says "tiếp tục"/"tiếp tục đi"/"next" -> Start NEXT round of same game immediately
      3. IF user says SINGLE WORD (not Vietnamese phrase):
         - For Word Chain: Check if word starts with correct letter
         - If correct: "Great! [Word] starts with [Letter]! 🎉 Round [X+1]/20: I say [NewWord]! Your turn..."
         - If wrong: "Oops! That starts with [WrongLetter], not [CorrectLetter]! Try again 😊"
      4. ⛔ NEVER leave game mode unless user says "stop" or "goodbye"
      5. ⛔ NEVER offer translation during game
      6. Play rounds based on game type:
         - Word Chain: 20 rounds total, show "Round [X]/20"
         - 20 Questions: 20 rounds total, show "Round [X]/20"
         - Sentence Builder: 20 rounds total, show "Round [X]/20"
      7. After final round, say: "Game Over! Great job! 🎉 Want to play again?"
      8. Keep game fun, fast-paced and encouraging!
      
      RESPOND IN THIS JSON FORMAT:
      {
        "ai_response": "Game response with round number (e.g., Round 3/10)",
        "suggested_hints": ["possible", "answer", "words"]
      }
      `;
    }

    // Trigger: "START_GAME: [Name]" (From UI Buttons)
    if (lowerUser.startsWith("start_game:")) {
      const gameNameRaw = userMessage.split(":")[1]?.trim() || "Game";
      
      // 🎮 NEW: Use gamePromptBuilder to inject weekly content
      const weekData = context.weekData || { weekId: 5, theme: 'House & Rooms', target_vocab: [] };
      
      // Map game names to IDs
      const gameIdMap = {
        'word chain': 'word_chain',
        'nối từ': 'word_chain',
        '20 questions': 'twenty_questions',
        'đoán vật': 'twenty_questions',
        'sentence builder': 'sentence_builder',
        'xây câu': 'sentence_builder'
      };
      
      const gameId = gameIdMap[gameNameRaw.toLowerCase()] || 'word_chain';
      const gamePrompt = buildGamePrompt(gameId, weekData);
      
      if (!gamePrompt) {
        console.error('❌ Failed to build game prompt for:', gameId);
        return buildFallbackGamePrompt(gameNameRaw);
      }
      
      return `
      SYSTEM_MODE: GAME_MASTER
      GAME: ${gamePrompt.gameName} ${gamePrompt.emoji}
      WEEK ${weekData.weekId} THEME: ${gamePrompt.theme}
      VOCABULARY: ${gamePrompt.vocabulary.join(', ')}
      
      ${gamePrompt.aiPrompt}
      
      🎯 CRITICAL FIRST MESSAGE (KEEP SHORT!):
      1. Greet: "Let's play ${gamePrompt.gameName}! ${gamePrompt.emoji}"
      2. Rule (1 sentence): "I say a word, you say a word starting with my word's last letter!"
      3. Example: "Example: CAT → TABLE"
      4. Start: "Round 1/20: I say [WORD]! Your turn!"
      
      GAME MECHANICS:
      - Play exactly 20 rounds per game
      - Show "Round [X]/20" in EVERY response
      - After Round 20/20: "Game Over! Great job! 🎉 Want to play again?"
      - Keep responses SHORT (1-2 sentences max)
      - IF user says "I don't know"/"khó quá"/"gợi ý": Give 1-2 word choices
      - IF correct: "Great! Round [X]/20: [next challenge]"
      - IF wrong: "Oops! [Why wrong]. Try again!"
      
      ⛔⛔⛔ CRITICAL: VOCABULARY RESTRICTION ⛔⛔⛔
      YOU ARE **ABSOLUTELY FORBIDDEN** FROM USING ANY WORDS NOT IN THIS LIST:
      ${gamePrompt.vocabulary.join(', ')}
      
      ❌ EXAMPLES OF FORBIDDEN WORDS: rainbow, wish, elephant, car, sun, moon, star
      ✅ ONLY USE: ${gamePrompt.vocabulary.join(', ')}
      
      BEFORE YOU SAY ANY WORD IN THE GAME:
      1. Check: Is this word in the vocabulary list?
      2. If NO → DO NOT USE IT! Pick a different word from the list
      3. If YES → Good! You can use it
      
      FOR WORD CHAIN: If you need letter X and no vocab word starts with X:
      - Use BEDROOM, KITCHEN, BATHROOM, LIVING ROOM, LAMP, SOFA, TABLE (these cover many letters)
      - Or accept student's correct word and change to vocabulary word next turn
      
      ACTION: Start Round 1/10 NOW with:
      1. Rule explanation
      2. Example
      3. First challenge with hints
      
      RESPOND IN THIS JSON FORMAT:
      {
        "ai_response": "Full first message with rules + example + Round 1/10 challenge",
        "suggested_hints": ["word1", "word2", "word3"]
      }
      `;
    }

    // --- C. ROLEPLAY MODE (IMMERSION) ---
    // --- C. ROLEPLAY MODE (IMMERSION) ---
    // 🔥 FIX: Prioritize context.currentScenario to maintain roleplay across turns
    const activeScenario = context.currentScenario || null;
    
    // If we have an active scenario (from state), use it regardless of userMessage
    if (activeScenario && !startingNewGame) {
      console.log('🎭 CONTINUING ROLEPLAY:', activeScenario.id, 'userMessage:', userMessage.slice(0, 30));
      
      return `
      SYSTEM_MODE: ROLEPLAY_ACTOR
      SCENARIO: "${activeScenario.title}"
      YOUR ROLE: ${activeScenario.ai_role}
      USER ROLE: ${activeScenario.user_role}
      CONTEXT: ${activeScenario.context}
      
      🔥 CURRENT STATUS: The conversation is ONGOING.
      USER SAID: "${userMessage}"
      
      INSTRUCTIONS:
      1. Stay in character 100%. Do NOT act like a teacher.
      2. ${activeScenario.guide_rules}
      3. 🚨 MANDATORY: END EVERY RESPONSE WITH A CLEAR QUESTION.
         ❌ Bad: "That is nice."
         ✅ Good: "That is nice! Do you want to add a rug?"
      4. Keep sentences simple (A0 Level). Max 15 words per sentence.
      5. Use vocabulary: ${activeScenario.vocab_focus?.join(', ') || 'simple words'}
      
      🛡️ BACKUP ENFORCEMENT:
      backup_questions: ${JSON.stringify(activeScenario.backup_questions || [])}
      
      RESPOND IN THIS JSON FORMAT:
      {
        "ai_response": "Your character response (MUST end with question + options)",
        "suggested_hints": ["helpful", "response", "words"]
      }
      `;
    }
    
    // Fallback: Detect if we're continuing an ongoing roleplay (but not starting new one)
    if (isInRoleplay && !startingNewGame) {
      return `
      SYSTEM_MODE: ROLEPLAY_ACTOR_ONGOING
      ROLE: Ms. Nova continuing roleplay.
      LAST AI: "${lastAIMessage}"
      USER RESPONSE: "${userMessage}"
      
      ⛔⛔⛔ CRITICAL ESL RULES - NEVER VIOLATE ⛔⛔⛔
      
      ⭐⭐⭐ CRITICAL ESL TEACHING RULES:
      
      1. EVERY RESPONSE MUST END WITH A QUESTION (encourage student to speak)
      2. Questions must have 2-3 CLEAR OPTIONS in the question itself
      3. Use COMPLETE sentences with correct grammar (you are teaching!)
      4. React warmly to what student said, then ask next question
      5. Stay in character throughout
      
      MANDATORY RESPONSE STRUCTURE:
      [Warm acknowledgment] + [Optional detail] + [Complete question with 2-3 options]
      
      CORRECT Examples:
      Student: "blue"
      ✅ YOU: "Blue! Beautiful color! What do you want in blue? Do you want a blue bed, a blue chair, or a blue lamp?"
      
      Student: "it's old"
      ✅ YOU: "It's old! I understand. You can paint it! What color do you want to paint it? Red, blue, or green?"
      
      Student: "no"
      ✅ YOU: "No problem! What do you want to do? Do you want to buy new furniture or paint the old furniture?"
      
      ❌ FORBIDDEN (conversation dies):
      - "Blue is nice! 🌊" ← NO QUESTION
      - "What color do you like? 🎨" ← NO OPTIONS in the question
      - "You like blue! 🌊" ← NO QUESTION AT ALL
      
      Keep simple English (A0-A1 level)
      Model correct grammar for ESL students
      ⛔ NEVER leave character
      ⛔ NEVER offer translation during roleplay
      
      RESPOND IN THIS JSON FORMAT:
      {
        "ai_response": "Your character response (MUST end with complete question + 2-3 clear options)",
        "suggested_hints": ["helpful", "response", "words"]
      }
      `;
    }

    // Trigger: "START_ROLEPLAY: [Role]"
    if (lowerUser.startsWith("start_roleplay:")) {
      const roleNameRaw = userMessage.split(":")[1]?.trim() || "Roleplay";
      
      // 🎭 NEW: Use roleplayPromptBuilder to inject weekly content
      const weekData = context.weekData || { weekId: 5, theme: 'House & Rooms', target_vocab: [] };
      
      // Map roleplay names to IDs - now using data-driven v2.0 IDs
      const roleIdMap = {
        // New v2.0 IDs (from roleplay_scenarios)
        'room designer': 'rp_designer',
        'thiết kế phòng': 'rp_designer',
        'house tour': 'rp_tour',
        'dẫn khách': 'rp_tour',
        'furniture shop': 'rp_shop',
        'cửa hàng đồ': 'rp_shop',
        'cửa hàng đồ chơi': 'rp_shop',
        // Legacy IDs (for backward compatibility)
        'interior_designer': 'rp_designer',
        'house_tour_guide': 'rp_tour',
        'furniture_shop': 'rp_shop'
      };
      
      const roleId = roleIdMap[roleNameRaw.toLowerCase()] || 'rp_designer';
      const roleplayPrompt = buildRoleplayPrompt(roleId, weekData);
      
      if (!roleplayPrompt) {
        console.error('❌ Failed to build roleplay prompt for:', roleId);
        return buildFallbackRoleplayPrompt(roleNameRaw);
      }
      
      return `
      SYSTEM_MODE: ROLEPLAY_ACTOR
      CHARACTER: ${roleplayPrompt.character} ${roleplayPrompt.emoji}
      SETTING: ${roleplayPrompt.setting}
      WEEK ${weekData.weekId} THEME: ${weekData.theme || roleplayPrompt.setting}
      VOCABULARY TO USE: ${roleplayPrompt.vocabulary.join(', ')}
      
      ${roleplayPrompt.aiPrompt}
      
      ⚠️ CRITICAL: Follow ALL rules above. EVERY response MUST end with question + options!
      
      🛡️ BACKUP ENFORCEMENT (if AI ignores rules):
      backup_questions: ${JSON.stringify(roleplayPrompt.backup_questions || [])}
      
      RESPOND IN THIS JSON FORMAT:
      {
        "ai_response": "Your character response (MUST end with question + options)",
        "suggested_hints": ["helpful", "response", "words", "from", "vocab"]
      }
      `;
    }

    // --- D. TRANSLATION / HELPER MODE (NO CHIT-CHAT) ---
    // Trigger: "translate", "là gì", "how to say", OR continuation after friendly prompt
    const isTranslationRequest =
      lowerUser.includes("translate") ||
      lowerUser.includes("nghĩa là gì") ||
      lowerUser.includes("là gì") ||
      lowerUser.includes("how to say") ||
      lowerUser.includes("tiếng anh") ||
      lowerAI.includes("what word") ||
      lowerAI.includes("what do you want to learn") ||
      (lowerAI.includes("do you want to know the meaning") && (lowerUser === "yes" || lowerUser === "có" || lowerUser === "ok"));

    if (isTranslationRequest) {
      // 🔥 If user said "yes" after being asked if they want translation
      if (lowerAI.includes("do you want to know the meaning") && (lowerUser === "yes" || lowerUser === "có" || lowerUser === "ok")) {
        // Extract the word from last AI message (e.g., "Do you want to know the meaning of 'deer'?")
        const wordMatch = lastAIMessage.match(/'([^']+)'/);
        const word = wordMatch ? wordMatch[1] : userMessage;
        
        return `
        SYSTEM_MODE: BILINGUAL_DICTIONARY_IMMEDIATE
        ROLE: Ms. Nova translating the word user asked about.
        WORD TO TRANSLATE: "${word}"
        
        CRITICAL:
        1. Translate "${word}" to Vietnamese immediately!
           Example: "Deer = hươu hoặc nai! 🦌 D-E-E-R. What other animals do you know?"
        2. ⛔ NEVER say "Deer is animal" - MUST give Vietnamese translation
        3. ⛔ Format: [English] = [Vietnamese]! [emoji] [Spell]. [Follow-up question]
        
        RESPOND IN THIS JSON FORMAT:
        {
          "ai_response": "${word.charAt(0).toUpperCase() + word.slice(1)} = [Vietnamese]! [emoji] Spell it. What other [category] do you know?",
          "suggested_hints": ["similar", "words"]
        }
        `;
      }
      
      // 🔥 CRITICAL: If user said "Translate this", ask what word
      if (lowerUser.includes("translate") && lowerUser.length < 25 && !lowerUser.includes("deer") && !lowerUser.includes("cat")) {
        return `
        SYSTEM_MODE: TRANSLATOR_WAITING_INPUT
        ROLE: Ms. Nova ready to translate.
        
        RESPOND IN THIS JSON FORMAT:
        {
          "ai_response": "What word do you want to learn? 😊",
          "suggested_hints": ["cat", "dog", "fish", "bird", "tree"]
        }
        `;
      }
      
      // 🔥 FIX: If user provided a word, TRANSLATE IT IMMEDIATELY
      return `
      SYSTEM_MODE: BILINGUAL_DICTIONARY
      ROLE: Ms. Nova as bilingual translator for Vietnamese kids (A0-A1).
      USER INPUT: "${userMessage}"

      RULES:
      1. IF user said English word (e.g. "deer", "cat") -> Translate to Vietnamese!
         Example: "Deer = hươu hoặc nai! 🦌 D-E-E-R. What other animals do you know?"
         Example: "Cat = con mèo! 🐱 C-A-T. What other pets do you know?"
      2. IF user said Vietnamese (e.g. "con mèo", "hươu") -> Translate to English!
         Example: "Con mèo = CAT! 🐱 C-A-T. What other pets do you know?"
         Example: "Hươu = DEER! 🦌 D-E-E-R. What other wild animals do you know?"
      3. ⛔ ALWAYS include Vietnamese translation for English words
      4. ⛔ NEVER just define in English only
      5. ⛔ NEVER say "You like deer!" or start new topic
      6. Keep response under 35 words.

      RESPOND IN THIS JSON FORMAT:
      {
        "ai_response": "[English] = [Vietnamese]! [emoji] Spell it. What other [category] do you know?",
        "suggested_hints": ["similar", "category", "words"]
      }
      `;
    }

    // --- E. DEFAULT CHAT (FALLBACK) ---
    // Đây là nơi xử lý chat thông thường, nhưng ĐÃ LOẠI BỎ logic hỏi nhảm
    return `
    SYSTEM_MODE: CHAT_COMPANION
    ROLE: Ms. Nova - friendly English teacher for kids (A0-A1).
    TOPIC: ${topic}
    USER MESSAGE: "${userMessage}"

    INSTRUCTIONS:
    1. IF this is the first message (user says "[SYSTEM: Start conversation]"), respond:
       "Hello! I am Ms. Nova 🌟. Click a button below to Play, Roleplay or Chat! 👇"
    2. IF user says a single English word (e.g. "tiger", "bear", "fox"), offer to translate:
       "Wow! A tiger! 🐯 Do you want to know the meaning of 'tiger' in Vietnamese?"
    3. IF user asks factual question (e.g., "how big", "how many", "what is"):
       - Give REAL knowledge with numbers/facts (e.g., "A whale is 20-30 meters long! Very big! 🐳")
       - ⛔ NEVER say vague answers like "Very big" or "Many"
       - Use simple facts kids can understand
    4. Otherwise, respond naturally to what user said
    5. ⛔ NEVER ask "What makes you happy?" or "How are you feeling?"
    6. Keep responses SHORT (under 35 words).
    7. Use emojis to be friendly.

    RESPOND IN THIS JSON FORMAT:
    {
      "ai_response": "Your SHORT response here with emoji",
      "suggested_hints": ["word1", "word2", "word3"]
    }
    `;
  }

  // =================================================================
  // 3. SAFE FALLBACK (NẾU KHÔNG KHỚP MODE NÀO)
  // =================================================================
  console.log('⚠️ generateTutorPrompt: No mode matched, using fallback. Mode was:', mode);
  return `
  ROLE: English Teacher.
  TASK: Respond simply to "${userMessage}".
  ⛔ DO NOT ask about feelings or happiness.
  `;
}

// Fallback functions for when builders fail
function buildFallbackGamePrompt(gameName) {
  return `
  SYSTEM_MODE: GAME_MASTER
  GAME: ${gameName}
  
  You are Ms. Nova playing ${gameName} with a student. Make it fun and encouraging!
  Play rounds based on game type (Word Chain/Sentence Builder: 20, 20 Questions: 40).
  
  RESPOND IN THIS JSON FORMAT:
  {
    "ai_response": "Game challenge with emoji",
    "suggested_hints": ["helpful", "words"]
  }
  `;
}

function buildFallbackRoleplayPrompt(roleName) {
  return `
  SYSTEM_MODE: ROLEPLAY_ACTOR
  ROLE: ${roleName}
  
  You are Ms. Nova playing the role of ${roleName}. Stay in character!
  Play 10 turns, show "Turn [X]/10" in responses.
  
  RESPOND IN THIS JSON FORMAT:
  {
    "ai_response": "Your character line with emoji",
    "suggested_hints": ["helpful", "words"]
  }
  `;
}
