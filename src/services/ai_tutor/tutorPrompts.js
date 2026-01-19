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

  console.log('🎯 generateTutorPrompt called:', { mode, userMessage: userMessage?.slice(0, 30) });

  // =================================================================
  // 1. STORY MISSION MODE (GIỮ NGUYÊN)
  // =================================================================
  if (mode === TutorModes.STORY_MISSION || mode === 'story_mission' || mode === 'story') {
    if (context.missionData && isV27Format(context.missionData)) {
      return buildV27StoryPrompt(context, userMessage);
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
      1. IF user says "I don't know" / "khó quá": GIVE A HINT (Color, Shape, Sound).
      2. IF user guesses wrong: Encourage "Close! Try again."
      3. IF user guesses right: CELEBRATE "Yes! 🎉" -> Start next round.
      4. ⛔ NEVER ask personal questions while playing.

      ACTION: Start the game NOW! Give first challenge.

      RESPOND IN THIS JSON FORMAT:
      {
        "ai_response": "Game challenge or response here with emoji",
        "suggested_hints": ["possible", "answer", "words"]
      }
      `;
    }

    // --- C. ROLEPLAY MODE (IMMERSION) ---
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
      - ⛔ NEVER ask about real life.
      - Use simple English (A0-A1).
      - Start the roleplay NOW!

      RESPOND IN THIS JSON FORMAT:
      {
        "ai_response": "Your character line here with emoji",
        "suggested_hints": ["helpful", "response", "words"]
      }
      `;
    }

    // --- D. TRANSLATION / HELPER MODE (NO CHIT-CHAT) ---
    // Trigger: "translate", "là gì", "how to say"
    const isTranslationRequest =
      lowerUser.includes("translate") ||
      lowerUser.includes("nghĩa là gì") ||
      lowerUser.includes("là gì") ||
      lowerUser.includes("how to say") ||
      lowerUser.includes("tiếng anh") ||
      lowerAI.includes("which word");

    if (isTranslationRequest) {
      return `
      SYSTEM_MODE: BILINGUAL_DICTIONARY
      ROLE: Ms. Nova as translator for kids (A0-A1).
      USER INPUT: "${userMessage}"

      RULES:
      1. IF input is English (e.g. "Deer") -> Explain in VIETNAMESE ("Deer nghĩa là Con Hươu 🦌").
      2. IF input is Vietnamese (e.g. "Cá") -> Explain in ENGLISH ("Cá is Fish 🐟").
      3. ⛔ NO "What is your favorite?". JUST TRANSLATE.
      4. After translating, ask: "Can you say [Word]?"
      5. Keep response under 25 words.

      RESPOND IN THIS JSON FORMAT:
      {
        "ai_response": "Translation with emoji and spell-out. Can you say [word]?",
        "suggested_hints": ["the", "translated", "word", "parts"]
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
    1. Respond naturally to user message
    2. If user says a noun (e.g. "Shark"), Say: "Wow! A Shark! 🦈 Big and strong."
    3. ⛔ STOP ASKING "What makes you happy?".
    4. ⛔ STOP ASKING "How are you feeling?".
    5. Keep responses SHORT (under 20 words).
    6. Use emojis to be friendly.

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
