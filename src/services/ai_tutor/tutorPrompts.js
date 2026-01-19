import { TutorModes } from './tutorModes.js';
import { isV27Format, buildV27StoryPrompt } from './prompts/storyInstructionsV27.js';

/**
 * TUTOR PROMPTS - FREE TALK 3.0 (FINAL PRECISION FIX)
 * Handles: Knowledge, Game, Roleplay, Translation
 * Fixes: NovaEngine sending 'chat' instead of 'freetalk'
 *
 * @param {string} mode - TutorModes value (chat, story_mission, etc.)
 * @param {Object} context - Context object with weekId, topic, learner, etc.
 * @param {string} userMessage - User's input message
 * @param {Object} options - Additional options (history, mission, etc.)
 */
export const generateTutorPrompt = (mode, context, userMessage, options = {}) => {

  // Extract lastAIMessage from options.history if available
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

  console.log('🎯 generateTutorPrompt called:', { mode, userMessage: userMessage?.slice(0, 30), isInGame, isInRoleplay });

  // =================================================================
  // 1. STORY MISSION MODE (GIỮ NGUYÊN)
  // =================================================================
  if (mode === TutorModes.STORY_MISSION || mode === 'story_mission' || mode === 'story') {
    // 🔥 Check if missionData is a single mission object with turns (V27 format)
    const isSingleMissionV27 = context.missionData?.turns && Array.isArray(context.missionData.turns);
    // 🔥 Or check if it's week data with story_missions array
    const isWeekDataV27 = context.missionData && isV27Format(context.missionData);
    
    if (isSingleMissionV27 || isWeekDataV27) {
      // 🔥 Pass proper params to buildV27StoryPrompt
      return buildV27StoryPrompt({
        weekData: context.realSyllabusData, // Full week data
        mission: context.missionData,       // Single mission object
        turnNumber: context.turnCount || 1,
        userInput: userMessage,
        missionIndex: context.missionIndex || 0,
        studentName: context.studentName || ''
      });
    }
    const { topic, missionTitle, roleCard, progress, vocab } = context;
    const currentTurn = progress?.currentTurn || 1;
    const missionLength = progress?.totalTurns || 10;

    return `
    ROLE: You are Ms. Nova, a friendly English teacher for kids (A0-A1 Level).
    CONTEXT: Story Mission "${missionTitle}" (Topic: ${topic}).
    YOUR ROLE: ${roleCard?.role || "Teacher"}. GOAL: ${roleCard?.goal || "Teach vocabulary"}.
    STATUS: Turn ${currentTurn}/${missionLength}.
    TARGET VOCAB: ${vocab?.map(v => v.word).join(', ') || "None"}
    INSTRUCTIONS: Keep sentences SHORT (under 12 words). Use emojis 🌟.
    USER SAYS: "${userMessage}"
    `;
  }

  // =================================================================
  // 2. FREE TALK 3.0 & CHAT ENGINE (MERGED LOGIC)
  // CHÍNH XÁC: Bắt tất cả các biến thể của Chat Mode
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
         - If correct: "Great! [Word] starts with [Letter]! 🎉 Round [X+1]/10: I say [NewWord]! Your turn..."
         - If wrong: "Oops! That starts with [WrongLetter], not [CorrectLetter]! Try again 😊"
      4. ⛔ NEVER leave game mode unless user says "stop" or "goodbye"
      5. ⛔ NEVER offer translation during game
      6. Play exactly 10 rounds per game. Always show: "Round [X]/10"
      7. After Round 10/10, say: "Game Over! Great job! 🎉 Want to play again?"
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
      const gameName = userMessage.split(":")[1]?.trim() || "Game";
      return `
      SYSTEM_MODE: GAME_MASTER
      GAME: ${gameName}
      ROLE: Ms. Nova as Game Host for kids (A0-A1).

      GAME RULES:
      - "I Spy": Describe something (color, shape). Kid guesses what it is.
      - "Word Chain": Say a word. Kid says word starting with last letter.
      - "Emoji Mixer": Show 2 emojis. Kid guesses the combined word.

      LOGIC:
      1. IF user says "I don't know" / "khó quá" / "gợi ý": GIVE A HINT (Color, Shape, Sound, First letter).
      2. IF user guesses wrong: Encourage "Close! Try again."
      3. IF user guesses right: CELEBRATE "Yes! 🎉" -> Start next round.
      4. Play exactly 10 rounds per game. Show "Round [X]/10" in each response.
      5. After Round 10/10, celebrate: "Game Over! You played great! 🎉 Want to play again?"
      6. ⛔ NEVER ask personal questions while playing.

      ACTION: Start the game NOW! Give first challenge (Round 1/10).

      RESPOND IN THIS JSON FORMAT:
      {
        "ai_response": "Game challenge or response here with emoji",
        "suggested_hints": ["possible", "answer", "words"]
      }
      `;
    }

    // --- C. ROLEPLAY MODE (IMMERSION) ---
    // Detect if we're continuing an ongoing roleplay (but not starting new one)
    if (isInRoleplay && !startingNewGame) {
      return `
      SYSTEM_MODE: ROLEPLAY_ACTOR_ONGOING
      ROLE: Ms. Nova continuing roleplay.
      LAST AI: "${lastAIMessage}"
      USER RESPONSE: "${userMessage}"
      
      CRITICAL RULES:
      1. Stay in character 100% - NEVER break roleplay
      2. React naturally to user's response in character
      3. IF user says "tiếp tục"/"tiếp tục đi"/"next" -> Continue scene with new situation in character
      4. IF user asks question -> Answer in character
      5. IF user gives you something/answers -> React in character and continue story
      6. Play exactly 10 exchanges per roleplay. Show "Turn [X]/10"
      7. After Turn 10/10, say goodbye in character: "Thank you! Goodbye! See you next time! 👋"
      8. Keep simple English (A0-A1)
      9. ⛔ NEVER leave roleplay mode unless user says "stop" or "goodbye"
      10. ⛔ NEVER offer translation during roleplay
      11. ⛔ NEVER ask about real life
      
      RESPOND IN THIS JSON FORMAT:
      {
        "ai_response": "Your character response with turn count (e.g., Turn 3/15)",
        "suggested_hints": ["helpful", "response", "words"]
      }
      `;
    }

    // Trigger: "START_ROLEPLAY: [Role]"
    if (lowerUser.startsWith("start_roleplay:")) {
      const roleName = userMessage.split(":")[1]?.trim() || "Roleplay";
      return `
      SYSTEM_MODE: ROLEPLAY_ACTOR
      SCENARIO: ${roleName}
      ROLE: Ms. Nova plays a character. Kid is the other role.

      SCENARIOS:
      - "Pizza Chef": You are hungry customer 🍕. Kid is chef. "I want pizza with cheese!"
      - "Pet Doctor": You have sick cat 😿. Kid is doctor. "My cat is sad. Help!"
      - "Toy Shop": You want robot 🤖. Kid is seller. "How much is this robot?"

      CRITICAL:
      - Stay in character 100%.
      - Play exactly 10 exchanges per roleplay. Show "Turn [X]/10" in responses.
      - After Turn 10/10, say goodbye in character.
      - ⛔ NEVER ask about real life.
      - Use simple English (A0-A1).
      - Start the roleplay NOW! (Turn 1/10)

      RESPOND IN THIS JSON FORMAT:
      {
        "ai_response": "Your character line here with emoji",
        "suggested_hints": ["helpful", "response", "words"]
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
    ROLE: Ms. Nova - friendly English teacher for Vietnamese kids (A0-A1).
    TOPIC: ${topic}
    USER MESSAGE: "${userMessage}"

    CRITICAL RULES:
    1. IF this is the first message (user says "[SYSTEM: Start conversation]"), respond:
       "Hello! I am Ms. Nova 🌟. Click a button below to Play, Roleplay or Chat! 👇"
    
    2. IF user asks in Vietnamese (e.g., "cá heo nặng bao nhiêu?") -> Answer in ENGLISH!
       Example: "A dolphin is 150-600 kg! 🐬" (NOT "Cá heo nặng 150-600 kg")
       Reason: We are learning English (ESL), so always respond in English even if question is Vietnamese.
    
    3. IF user says a single English word (e.g. "tiger", "bear", "fox"), offer to translate:
       "Wow! A tiger! 🐯 Do you want to know the meaning of 'tiger' in Vietnamese?"
    
    4. IF user asks factual question (e.g., "how big", "how heavy", "how many", "what is"):
       - Give REAL knowledge with numbers/facts (e.g., "A whale is 20-30 meters long! Very big! 🐳")
       - ⛔ NEVER say vague answers like "Very big" or "Many" without numbers
       - Use simple facts kids can understand
    
    5. IF user says 2-word phrase like "shark heavy" -> Understand as "How heavy is a shark?" and answer
    
    6. ⛔ NEVER ask "What makes you happy?" or "How are you feeling?"
    7. ⛔ ALWAYS answer in English, even if question is Vietnamese
    8. Keep responses SHORT (under 35 words).
    9. Use emojis to be friendly.
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
};

// =================================================================
// EXPORT buildPrompt (alias for novaEngine.js compatibility)
// NovaEngine imports: import { buildPrompt, TutorModes } from './tutorPrompts.js'
// =================================================================
export const buildPrompt = generateTutorPrompt;

// Re-export TutorModes for convenience
export { TutorModes } from './tutorModes.js';
