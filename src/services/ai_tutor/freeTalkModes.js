/**
 * FREE TALK 3.0 - Conversation Cards, Translation, Ask Anything, Chat
 * Clean implementation - Games and Roleplay have been removed
 */

import { TutorModes } from './tutorModes.js';
import { buildConversationCardPrompt, validateExchangeResponse } from './conversationCardBuilder.js';

export function buildFreeTalkPrompt(mode, context, userMessage, options = {}) {
  const history = options.history || [];
  const lastAIMessage = history.length > 0
    ? (history[history.length - 1]?.content || "")
    : "";

  console.log('🎯 buildFreeTalkPrompt called:', { mode, userMessage: userMessage?.slice(0, 30) });

  // =================================================================
  // TRANSLATION HELP MODE — Sticky: translate any word user types
  // =================================================================
  if (mode === 'translation_help') {
    // ---------------------------------------------------------------
    // CLIENT-SIDE DICTIONARY — bypass AI entirely for known words
    // Vietnamese strings here are safe UTF-8; Cerebras corrupts them.
    // ---------------------------------------------------------------
    const EN_TO_VN = {
      'tiger':      { vn: 'con hổ',    emoji: '🐯', hints: ['lion', 'cheetah', 'leopard'], follow: 'What other big cats do you know?' },
      'lion':       { vn: 'sư tử',     emoji: '🦁', hints: ['tiger', 'bear', 'cheetah'],   follow: 'What other big cats do you know?' },
      'dolphin':    { vn: 'cá heo',    emoji: '🐬', hints: ['whale', 'fish', 'crab'],      follow: 'What other sea animals do you know?' },
      'whale':      { vn: 'cá voi',    emoji: '🐋', hints: ['dolphin', 'shark', 'fish'],   follow: 'What other sea animals do you know?' },
      'shark':      { vn: 'cá mập',    emoji: '🦈', hints: ['whale', 'dolphin', 'fish'],   follow: 'What other sea animals do you know?' },
      'bear':       { vn: 'con gấu',   emoji: '🐻', hints: ['wolf', 'fox', 'deer'],        follow: 'What other forest animals do you know?' },
      'dog':        { vn: 'con chó',   emoji: '🐶', hints: ['cat', 'fish', 'rabbit'],      follow: 'What other pets do you know?' },
      'cat':        { vn: 'con mèo',   emoji: '🐱', hints: ['dog', 'fish', 'rabbit'],      follow: 'What other pets do you know?' },
      'fish':       { vn: 'con cá',    emoji: '🐟', hints: ['dog', 'cat', 'bird'],         follow: 'What other animals do you know?' },
      'rabbit':     { vn: 'con thỏ',   emoji: '🐰', hints: ['cat', 'dog', 'bird'],         follow: 'What other cute animals do you know?' },
      'monkey':     { vn: 'con khỉ',   emoji: '🐒', hints: ['elephant', 'lion', 'bear'],  follow: 'What other jungle animals do you know?' },
      'elephant':   { vn: 'con voi',   emoji: '🐘', hints: ['hippo', 'rhino', 'giraffe'], follow: 'What other big animals do you know?' },
      'snake':      { vn: 'con rắn',   emoji: '🐍', hints: ['frog', 'crocodile', 'lizard'], follow: 'What other reptiles do you know?' },
      'horse':      { vn: 'con ngựa',  emoji: '🐴', hints: ['cow', 'pig', 'sheep'],       follow: 'What other farm animals do you know?' },
      'pig':        { vn: 'con lợn',   emoji: '🐷', hints: ['cow', 'horse', 'sheep'],     follow: 'What other farm animals do you know?' },
      'cow':        { vn: 'con bò',    emoji: '🐮', hints: ['pig', 'horse', 'sheep'],     follow: 'What other farm animals do you know?' },
      'deer':       { vn: 'con nai',   emoji: '🦌', hints: ['horse', 'bear', 'wolf'],     follow: 'What other forest animals do you know?' },
      'duck':       { vn: 'con vịt',   emoji: '🦆', hints: ['bird', 'chicken', 'goose'], follow: 'What other birds do you know?' },
      'frog':       { vn: 'con ếch',   emoji: '🐸', hints: ['fish', 'snake', 'turtle'],  follow: 'What other water animals do you know?' },
      'bird':       { vn: 'con chim',  emoji: '🐦', hints: ['duck', 'owl', 'eagle'],     follow: 'What other birds do you know?' },
      'crab':       { vn: 'con cua',   emoji: '🦀', hints: ['fish', 'shrimp', 'lobster'],follow: 'What other sea animals do you know?' },
      'shrimp':     { vn: 'con tôm',   emoji: '🍤', hints: ['crab', 'fish', 'lobster'],  follow: 'What other sea animals do you know?' },
      'crocodile':  { vn: 'cá sấu',    emoji: '🐊', hints: ['snake', 'frog', 'turtle'], follow: 'What other reptiles do you know?' },
      'chicken':    { vn: 'con gà',    emoji: '🐔', hints: ['duck', 'bird', 'egg'],      follow: 'What other farm animals do you know?' },
      'sheep':      { vn: 'con cừu',   emoji: '🐑', hints: ['cow', 'pig', 'horse'],     follow: 'What other farm animals do you know?' },
      'butterfly':  { vn: 'con bướm',  emoji: '🦋', hints: ['bee', 'flower', 'bird'],   follow: 'What other insects do you know?' },
      'bee':        { vn: 'con ong',   emoji: '🐝', hints: ['butterfly', 'flower', 'honey'], follow: 'What other insects do you know?' },
      'apple':      { vn: 'quả táo',   emoji: '🍎', hints: ['banana', 'orange', 'mango'], follow: 'What other fruits do you know?' },
      'banana':     { vn: 'quả chuối', emoji: '🍌', hints: ['apple', 'orange', 'mango'], follow: 'What other fruits do you know?' },
      'orange':     { vn: 'quả cam',   emoji: '🍊', hints: ['apple', 'banana', 'mango'], follow: 'What other fruits do you know?' },
      'mango':      { vn: 'quả xoài',  emoji: '🥭', hints: ['apple', 'orange', 'banana'],follow: 'What other fruits do you know?' },
      'water':      { vn: 'nước',      emoji: '💧', hints: ['juice', 'milk', 'tea'],     follow: 'What other drinks do you know?' },
      'milk':       { vn: 'sữa',       emoji: '🥛', hints: ['water', 'juice', 'tea'],    follow: 'What other drinks do you know?' },
      'school':     { vn: 'trường học', emoji: '🏫', hints: ['house', 'market', 'park'], follow: 'What other places do you know?' },
      'house':      { vn: 'ngôi nhà',   emoji: '🏠', hints: ['school', 'market', 'park'], follow: 'What other places do you know?' },
      'book':       { vn: 'cuốn sách', emoji: '📚', hints: ['pen', 'paper', 'bag'],      follow: 'What other school things do you know?' },
      'happy':      { vn: 'vui / hạnh phúc', emoji: '😊', hints: ['sad', 'angry', 'excited'], follow: 'What other feelings do you know?' },
      'sad':        { vn: 'buồn',      emoji: '😢', hints: ['happy', 'angry', 'tired'],  follow: 'What other feelings do you know?' },
      'big':        { vn: 'to / lớn',  emoji: '🔺', hints: ['small', 'tall', 'long'],   follow: 'What other size words do you know?' },
      'small':      { vn: 'nhỏ / bé',  emoji: '🔹', hints: ['big', 'tall', 'short'],    follow: 'What other size words do you know?' },
      'red':        { vn: 'màu đỏ',    emoji: '🔴', hints: ['blue', 'green', 'yellow'], follow: 'What other colors do you know?' },
      'blue':       { vn: 'màu xanh dương', emoji: '🔵', hints: ['red', 'green', 'yellow'], follow: 'What other colors do you know?' },
      'green':      { vn: 'màu xanh lá', emoji: '🟢', hints: ['red', 'blue', 'yellow'], follow: 'What other colors do you know?' },
      'yellow':     { vn: 'màu vàng',  emoji: '🟡', hints: ['red', 'blue', 'green'],    follow: 'What other colors do you know?' },
      'mother':     { vn: 'mẹ / má',   emoji: '👩', hints: ['father', 'sister', 'brother'], follow: 'What other family words do you know?' },
      'father':     { vn: 'bố / ba',   emoji: '👨', hints: ['mother', 'sister', 'brother'], follow: 'What other family words do you know?' },
      'sister':     { vn: 'chị / em gái', emoji: '👧', hints: ['brother', 'mother', 'father'], follow: 'What other family words do you know?' },
      'brother':    { vn: 'anh / em trai', emoji: '👦', hints: ['sister', 'mother', 'father'], follow: 'What other family words do you know?' },
      'friend':     { vn: 'bạn bè',    emoji: '👫', hints: ['teacher', 'family', 'school'], follow: 'What other people do you know?' },
      'teacher':    { vn: 'giáo viên', emoji: '👩‍🏫', hints: ['student', 'school', 'book'], follow: 'What other school words do you know?' },
      'sun':        { vn: 'mặt trời',  emoji: '☀️', hints: ['moon', 'star', 'sky'],     follow: 'What other sky things do you know?' },
      'moon':       { vn: 'mặt trăng', emoji: '🌙', hints: ['sun', 'star', 'sky'],      follow: 'What other sky things do you know?' },
      'star':       { vn: 'ngôi sao',  emoji: '⭐', hints: ['moon', 'sun', 'sky'],      follow: 'What other sky things do you know?' },
    };

    // VN → EN lookup (exact match on common Vietnamese words)
    const VN_TO_EN = {
      'cá heo':     { en: 'dolphin',    emoji: '🐬', hints: ['whale', 'fish', 'crab'],      follow: 'What other sea animals do you know?' },
      'cá voi':     { en: 'whale',      emoji: '🐋', hints: ['dolphin', 'shark', 'fish'],   follow: 'What other sea animals do you know?' },
      'cá mập':     { en: 'shark',      emoji: '🦈', hints: ['whale', 'dolphin', 'fish'],   follow: 'What other sea animals do you know?' },
      'cá sấu':     { en: 'crocodile',  emoji: '🐊', hints: ['snake', 'frog', 'turtle'],    follow: 'What other reptiles do you know?' },
      'cá':         { en: 'fish',       emoji: '🐟', hints: ['crab', 'shrimp', 'dolphin'],  follow: 'What other sea animals do you know?' },
      'con ếch':    { en: 'frog',       emoji: '🐸', hints: ['fish', 'snake', 'turtle'],    follow: 'What other water animals do you know?' },
      'con rắn':    { en: 'snake',      emoji: '🐍', hints: ['frog', 'crocodile', 'turtle'],follow: 'What other reptiles do you know?' },
      'con khỉ':    { en: 'monkey',     emoji: '🐒', hints: ['elephant', 'lion', 'bear'],   follow: 'What other jungle animals do you know?' },
      'con voi':    { en: 'elephant',   emoji: '🐘', hints: ['hippo', 'rhino', 'giraffe'],  follow: 'What other big animals do you know?' },
      'con gấu':    { en: 'bear',       emoji: '🐻', hints: ['wolf', 'fox', 'deer'],        follow: 'What other forest animals do you know?' },
      'con hổ':     { en: 'tiger',      emoji: '🐯', hints: ['lion', 'cheetah', 'leopard'], follow: 'What other big cats do you know?' },
      'sư tử':      { en: 'lion',       emoji: '🦁', hints: ['tiger', 'bear', 'cheetah'],   follow: 'What other big cats do you know?' },
      'con chó':    { en: 'dog',        emoji: '🐶', hints: ['cat', 'fish', 'rabbit'],      follow: 'What other pets do you know?' },
      'con mèo':    { en: 'cat',        emoji: '🐱', hints: ['dog', 'fish', 'rabbit'],      follow: 'What other pets do you know?' },
      'mèo':        { en: 'cat',        emoji: '🐱', hints: ['dog', 'fish', 'rabbit'],      follow: 'What other pets do you know?' },
      'chó':        { en: 'dog',        emoji: '🐶', hints: ['cat', 'fish', 'rabbit'],      follow: 'What other pets do you know?' },
      'con thỏ':    { en: 'rabbit',     emoji: '🐰', hints: ['cat', 'dog', 'bird'],         follow: 'What other cute animals do you know?' },
      'con ngựa':   { en: 'horse',      emoji: '🐴', hints: ['cow', 'pig', 'sheep'],        follow: 'What other farm animals do you know?' },
      'con lợn':    { en: 'pig',        emoji: '🐷', hints: ['cow', 'horse', 'sheep'],      follow: 'What other farm animals do you know?' },
      'con bò':     { en: 'cow',        emoji: '🐮', hints: ['pig', 'horse', 'sheep'],      follow: 'What other farm animals do you know?' },
      'con nai':    { en: 'deer',       emoji: '🦌', hints: ['horse', 'bear', 'wolf'],      follow: 'What other forest animals do you know?' },
      'con vịt':    { en: 'duck',       emoji: '🦆', hints: ['bird', 'chicken', 'goose'],   follow: 'What other birds do you know?' },
      'con chim':   { en: 'bird',       emoji: '🐦', hints: ['duck', 'owl', 'eagle'],       follow: 'What other birds do you know?' },
      'con tôm':    { en: 'shrimp',     emoji: '🍤', hints: ['crab', 'fish', 'lobster'],    follow: 'What other sea animals do you know?' },
      'con cua':    { en: 'crab',       emoji: '🦀', hints: ['fish', 'shrimp', 'lobster'],  follow: 'What other sea animals do you know?' },
      'con gà':     { en: 'chicken',    emoji: '🐔', hints: ['duck', 'bird', 'egg'],        follow: 'What other farm animals do you know?' },
      'con cừu':    { en: 'sheep',      emoji: '🐑', hints: ['cow', 'pig', 'horse'],        follow: 'What other farm animals do you know?' },
      'con bướm':   { en: 'butterfly',  emoji: '🦋', hints: ['bee', 'flower', 'bird'],      follow: 'What other insects do you know?' },
      'con ong':    { en: 'bee',        emoji: '🐝', hints: ['butterfly', 'flower', 'honey'],follow: 'What other insects do you know?' },
    };

    // ---------------------------------------------------------------
    // STT CORRECTION LAYER — fix common speech-to-text mishearings
    // Phone mic often mishears English vocab words, especially for
    // Vietnamese kids whose pronunciation differs from native English.
    // This map catches known mistakes BEFORE sending to AI.
    // ---------------------------------------------------------------
    const STT_CORRECTIONS = {
      // tiger mishearings (most common: Tyga, Tiga)
      'tyga': 'tiger', 'tiga': 'tiger', 'tyger': 'tiger', 'tigger': 'tiger',
      'tiger\'s': 'tiger', 'tigers': 'tiger',
      // lion mishearings
      'leon': 'lion', 'lyin': 'lion', 'lyons': 'lion', 'liyon': 'lion',
      // elephant mishearings
      'elefant': 'elephant', 'eliphant': 'elephant', 'elephont': 'elephant', 'elephunt': 'elephant',
      // dolphin mishearings
      'dolfin': 'dolphin', 'dolpin': 'dolphin', 'delphin': 'dolphin', 'dolfeen': 'dolphin',
      // monkey mishearings
      'monky': 'monkey', 'munkee': 'monkey', 'munkey': 'monkey',
      // rabbit mishearings
      'rabit': 'rabbit', 'rabbid': 'rabbit', 'rabbet': 'rabbit',
      // bear mishearings
      'bare': 'bear', 'berr': 'bear', 'baer': 'bear',
      // snake mishearings
      'snak': 'snake', 'snack': 'snake', 'sneik': 'snake',
      // horse mishearings
      'hourse': 'horse', 'hors': 'horse', 'hoarse': 'horse',
      // sheep mishearings
      'sheap': 'sheep', 'shep': 'sheep', 'shipp': 'sheep',
      // chicken mishearings
      'chiken': 'chicken', 'chickin': 'chicken', 'chicking': 'chicken',
      // duck mishearings
      'duc': 'duck', 'duk': 'duck', 'dok': 'duck',
      // frog mishearings
      'forg': 'frog', 'frawg': 'frog', 'forg': 'frog',
      // crocodile mishearings
      'croc': 'crocodile', 'crokodile': 'crocodile', 'crocadile': 'crocodile',
      // whale mishearings
      'wale': 'whale', 'whail': 'whale', 'wael': 'whale',
      // shark mishearings
      'shork': 'shark', 'sharc': 'shark', 'shak': 'shark',
      // butterfly mishearings
      'butterflie': 'butterfly', 'butterflai': 'butterfly',
      // other common ones
      'kat': 'cat', 'katt': 'cat', 'catt': 'cat',
      'dawg': 'dog', 'dogg': 'dog',
      'berd': 'bird', 'burd': 'bird',
      'fishe': 'fish', 'fich': 'fish',
      'mango\'s': 'mango', 'mangos': 'mango',
      'appel': 'apple', 'aple': 'apple',
      'bannana': 'banana', 'bananna': 'banana',
      'teecher': 'teacher', 'techer': 'teacher',
      'skool': 'school', 'scool': 'school',
    };

    // Simple Levenshtein distance for fuzzy matching (catches 1-2 char typos)
    const levenshtein = (a, b) => {
      const m = a.length, n = b.length;
      const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0));
      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
        }
      }
      return dp[m][n];
    };

    // Find closest EN_TO_VN key within edit distance threshold (single-word only)
    const findClosestEnglishWord = (input) => {
      if (input.includes(' ')) return null; // only single words
      const maxDist = input.length <= 5 ? 1 : 2; // strict for short words
      let best = null, bestDist = Infinity;
      for (const key of Object.keys(EN_TO_VN)) {
        const d = levenshtein(input, key);
        if (d < bestDist && d <= maxDist) { best = key; bestDist = d; }
      }
      return best;
    };

    const lowerUser = userMessage ? userMessage.toLowerCase().trim() : '';

    // Strip Vietnamese filler/emphasis particles from end
    const vnParticles = /\s+(mà|đó|thôi|nhé|nha|á|đi|vậy|hả|chứ|ạ|ơi|ư|nè|hã|lại|luôn|cơ|nhỉ|thế)$/i;
    // Strip English articles from the front (a, an, the)
    const cleanedInput = (userMessage || '')
      .trim()
      .replace(vnParticles, '')
      .trim()
      .replace(/^(a|an|the)\s+/i, '')
      .trim();
    const lowerClean = cleanedInput.toLowerCase();

    // Exclude "please translate" commands
    const translateCommands = ['dịch', 'dịch đi', 'dịch mà', 'dịch giúp', 'translate', 'dịch cho tôi'];
    const isTranslateCommand = translateCommands.some(cmd => lowerUser === cmd || lowerUser === cmd + '!');
    const isJustAWord = !isTranslateCommand && cleanedInput && cleanedInput.split(/\s+/).length <= 4;

    if (isJustAWord) {
      // --- EN → VN exact dictionary hit ---
      const enEntry = EN_TO_VN[lowerClean];
      if (enEntry) {
        const spelling = lowerClean.toUpperCase().split('').join('-');
        return {
          skipAI: true,
          directResponse: {
            ai_response: `= ${enEntry.vn}! ${enEntry.emoji} ${spelling}. ${enEntry.follow}`,
            suggested_hints: enEntry.hints,
            hints: enEntry.hints,
            format: 'freetalk'
          }
        };
      }

      // --- VN → EN exact dictionary hit ---
      const vnEntry = VN_TO_EN[lowerClean];
      if (vnEntry) {
        const spelling = vnEntry.en.toUpperCase().split('').join('-');
        return {
          skipAI: true,
          directResponse: {
            ai_response: `= ${vnEntry.en}! ${vnEntry.emoji} ${spelling}. ${vnEntry.follow}`,
            suggested_hints: vnEntry.hints,
            hints: vnEntry.hints,
            format: 'freetalk'
          }
        };
      }

      // --- STT correction: phonetic map + fuzzy Levenshtein ---
      // Catches mic mishearings like "Tyga" → "tiger", "elefant" → "elephant"
      const sttCorrected = STT_CORRECTIONS[lowerClean] || findClosestEnglishWord(lowerClean);
      if (sttCorrected && EN_TO_VN[sttCorrected]) {
        const entry = EN_TO_VN[sttCorrected];
        const spelling = sttCorrected.toUpperCase().split('').join('-');
        return {
          skipAI: true,
          directResponse: {
            ai_response: `(${sttCorrected}) = ${entry.vn}! ${entry.emoji} ${spelling}. ${entry.follow}`,
            suggested_hints: entry.hints,
            hints: entry.hints,
            format: 'freetalk'
          }
        };
      }

      // --- Proper noun detection (capitalized, no match found) ---
      const isSingleCapWord = /^[A-Z][a-zA-Z]+$/.test(cleanedInput);
      if (isSingleCapWord) {
        return {
          skipAI: true,
          directResponse: {
            ai_response: `Hmm, "${cleanedInput}" looks like a name — names don't translate! 😄 Try a real word like "cat", "happy", or "school"!`,
            suggested_hints: ['cat', 'happy', 'school', 'water', 'teacher'],
            hints: ['cat', 'happy', 'school', 'water', 'teacher'],
            format: 'freetalk'
          }
        };
      }

      // --- Fall through to AI for unknown words ---
      return `
      SYSTEM_MODE: STICKY_TRANSLATION
      ROLE: Ms. Nova — bilingual dictionary for Vietnamese kids.
      USER TYPED: "${cleanedInput}"

      YOUR JOB: Translate "${cleanedInput}" (English↔Vietnamese) and return JSON.
      ⛔ ONLY output ASCII characters in "ai_response". No Vietnamese, no accented letters, no emoji.
      ⛔ SPELLING: Spell the EXACT letters of USER TYPED. input "elephant" → E-L-E-P-H-A-N-T. Never invent letters.
      ⛔ If the word has no real meaning (nonsense, slang, unknown), respond: "I don't know that word! Try 'cat', 'water', or 'happy'"

      OUTPUT FORMAT examples (ASCII only, NO EMOJI, NO Vietnamese):
      "elephant" → { "ai_response": "= con voi! E-L-E-P-H-A-N-T. What other big animals do you know?", "suggested_hints": ["hippo", "giraffe", "rhino"] }
      "school"   → { "ai_response": "= truong hoc! S-C-H-O-O-L. What other places do you know?", "suggested_hints": ["house", "park", "market"] }
      RETURN JSON:
      `;
    }

    // User typed something vague → ask for a word
    return `
    SYSTEM_MODE: TRANSLATOR_WAITING_INPUT
    ROLE: Ms. Nova ready to translate.
    RESPOND IN THIS JSON FORMAT:
    { "ai_response": "What word would you like to translate? 😊", "suggested_hints": ["cat", "dog", "fish", "bird", "tree"] }
    `;
  }

  // =================================================================
  // FREE TALK 3.0 & CHAT ENGINE (MERGED LOGIC)
  // =================================================================
  if (mode === TutorModes.FREE_TALK || mode === TutorModes.CHAT || mode === 'chat' || mode === 'freetalk') {

    const topic = context.topic || "General";
    // Chuẩn hóa input để bắt lệnh chính xác
    const lowerUser = userMessage ? userMessage.toLowerCase().trim() : "";
    const lowerAI = lastAIMessage ? lastAIMessage.toLowerCase().trim() : "";
    
    // ⚠️ CRITICAL: ALWAYS RESPOND IN ENGLISH (even if student speaks Vietnamese)
    const englishOnlyRule = `
⚠️⚠️⚠️ CRITICAL LANGUAGE RULE ⚠️⚠️⚠️
YOU MUST ALWAYS RESPOND IN ENGLISH, even if the student speaks Vietnamese.
If student says Vietnamese: "Tôi thích chơi bóng đá"
You respond in ENGLISH: "Oh! You like playing soccer! That's great! Do you play every day?"

NEVER respond in Vietnamese. ALWAYS use English.
    `;

    // --- A. KNOWLEDGE MODE (ENCYCLOPEDIA) ---
    // Trigger: Explicit "Ask me anything" OR "Why/How/What is" questions
    const isKnowledgeRequest =
        lowerUser.includes("ask me anything") ||
        lowerUser.startsWith("start_knowledge") ||
        (lowerUser.includes("why") && lowerUser.includes("?")) ||
        (lowerUser.includes("how") && lowerUser.includes("?")) ||
        (lowerUser.includes("what is") && !lowerUser.includes("your name"));

    if (isKnowledgeRequest) {
      return `
      SYSTEM_MODE: ENCYCLOPEDIA_FOR_KIDS
      ROLE: Ms. Nova (Knowledgeable, Friendly teacher for kids A0-A1).
      USER QUESTION: "${userMessage}"

      ${englishOnlyRule}

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

    // --- B. CONVERSATION CARDS (Structured Dialogue Practice) ---
    // Trigger: "START_CONVERSATION: [Card ID]" (From UI Buttons)
    if (lowerUser.startsWith("start_conversation:")) {
      const cardId = userMessage.split(":")[1]?.trim() || "meet_classmate";
      const weekData = options.weekData || context.weekData || { week_id: 3, conversation_cards: [] };
      
      console.log('💬 START_CONVERSATION detected:', {
        cardId,
        weekId: weekData.week_id || weekData.weekId,
        hasConversationCards: !!weekData.conversation_cards
      });
      
      // Build initial prompt (exchange 0)
      const cardPrompt = buildConversationCardPrompt(cardId, weekData, 0);
      
      if (!cardPrompt) {
        console.error('❌ Failed to build conversation card prompt for:', cardId);
        return `
        SYSTEM_MODE: ERROR
        I couldn't find the conversation card "${cardId}". Please try another one!
        
        Available conversation cards:
        - meet_classmate 👋
        - describe_friend 🧑‍🤝‍🧑
        - family_appearance 👨‍👩‍👧‍👦
        `;
      }

      return `
      SYSTEM_MODE: CONVERSATION_CARD
      CARD: ${cardPrompt.title} ${cardPrompt.emoji}
      EXCHANGE: ${cardPrompt.currentExchange + 1}/${cardPrompt.totalExchanges}
      
      ⛔⛔⛔ CRITICAL RULES ⛔⛔⛔
      1. You are AI character in a SCRIPTED conversation
      2. Say EXACTLY what the script tells you: "${cardPrompt.exchange.ai}"
      3. DO NOT deviate, improvise, or add extra content
      4. After student responds, wait for next exchange trigger
      5. This is NOT free conversation - it's a structured practice dialogue
      
      YOUR EXACT MESSAGE:
      "${cardPrompt.exchange.ai}"
      
      (The system will validate the student's response and send you the next exchange)
      
      RESPOND IN THIS JSON FORMAT:
      {
        "ai_response": "${cardPrompt.exchange.ai}",
        "suggested_hints": []
      }
      `;
    }

    // --- C. TRANSLATION / HELPER MODE ---
    // Trigger: EXPLICIT translation requests ONLY (not from button clicks)
    // 🔥 FIX: Removed loose "translate" check to prevent button text triggering translation
    const isTranslationRequest =
      lowerUser.includes("nghĩa là gì") ||
      lowerUser.includes("là gì") ||
      lowerUser.includes("how to say") ||
      lowerUser.includes("tiếng anh") ||
      (lowerUser.includes("translate") && lowerUser.length > 20) || // Only if user typed full sentence
      lowerAI.includes("what word") ||
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
        
        YOUR JOB: Translate "${word}" to Vietnamese and return JSON.

        ACCURACY REFERENCE:
        tiger = con hổ (NOT sư tử!), lion = sư tử, bear = con gấu,
        dog = con chó, cat = con mèo, fish = con cá, bird = con chim,
        rabbit = con thỏ, monkey = con khỉ, elephant = con voi,
        snake = con rắn, horse = con ngựa, pig = con lợn, cow = con bò
        
        OUTPUT EXAMPLE (for the word "cat"):
        {
          "ai_response": "Cat = con mèo! 🐱 C-A-T. What other pets do you know?",
          "suggested_hints": ["dog", "fish", "rabbit"]
        }

        NOW return JSON for the word "${word}" using the actual Vietnamese translation (NOT a template or placeholder):
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

      YOUR JOB:
      - If user said English word → give Vietnamese translation
      - If user said Vietnamese → give English translation

      ACCURACY REFERENCE:
      tiger = con hổ (NOT sư tử!), lion = sư tử, elephant = con voi,
      bear = con gấu, dog = con chó, cat = con mèo, fish = con cá,
      rabbit = con thỏ, monkey = con khỉ, snake = con rắn, horse = con ngựa,
      bird = con chim, pig = con lợn, cow = con bò, deer = con nai

      OUTPUT EXAMPLES:
      For "tiger": { "ai_response": "Tiger = con hổ! 🐯 T-I-G-E-R. What other wild animals do you know?", "suggested_hints": ["lion", "bear", "elephant"] }
      For "cat": { "ai_response": "Cat = con mèo! 🐱 C-A-T. What other pets do you know?", "suggested_hints": ["dog", "fish", "rabbit"] }
      For "con chó": { "ai_response": "Con chó = DOG! 🐶 D-O-G. What other pets do you know?", "suggested_hints": ["cat", "fish", "bird"] }

      Rules: Keep under 35 words. ⛔ NEVER use [placeholder] text. Return ACTUAL translation.

      RETURN JSON:
      `;
    }

    // --- D. DEFAULT CHAT (FALLBACK) ---
    // Đây là nơi xử lý chat thông thường, nhưng ĐÃ LOẠI BỎ logic hỏi nhảm
    return `
    SYSTEM_MODE: CHAT_COMPANION
    ROLE: Ms. Nova - friendly English teacher for kids (A0-A1).
    TOPIC: ${topic}
    USER MESSAGE: "${userMessage}"
    
    ${englishOnlyRule}

    INSTRUCTIONS:
    1. IF this is the first message (user says "[SYSTEM: Start conversation]"), respond:
       "Hello! I am Ms. Nova ⭐. Let's chat naturally! 👇"
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
  // 2. SAFE FALLBACK (IF NO MODE MATCHED)
  // =================================================================
  console.log('⚠️ buildFreeTalkPrompt: No mode matched, using fallback. Mode was:', mode);
  return `
  ROLE: English Teacher.
  TASK: Respond simply to "${userMessage}".
  ⛔ DO NOT ask about feelings or happiness.
  `;
}
