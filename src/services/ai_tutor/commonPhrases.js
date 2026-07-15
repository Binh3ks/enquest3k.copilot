/**
 * Common AI Tutor Phrases for Static Caching
 * 
 * PURPOSE: Cache frequently-used phrases to R2 with descriptive filenames
 * instead of hash-based names. This:
 * 1. Saves Deepgram API costs (reuse cached audio)
 * 2. Provides faster playback (no generation delay)
 * 3. Maintains consistent voice quality
 * 
 * ARCHITECTURE: Matches station on-demand TTS pattern
 * - Static phrases → audio/ai_tutor/common/{filename}.mp3
 * - Dynamic content → audio/ai_tutor/dynamic/{hash}.mp3
 */

export const COMMON_PHRASES = {
  // ==================== GREETINGS ====================
  'greeting_hello': "Hello! I'm Miss Nova, your English teacher.",
  'greeting_howru': "How are you today?",
  'greeting_nicemeet': "Nice to meet you!",
  'greeting_whatsname': "What's your name?",
  'greeting_howold': "How old are you?",
  'greeting_welcome': "Welcome back!",
  'greeting_letsstart': "Let's start!",
  
  // ==================== PRAISE & ENCOURAGEMENT ====================
  'praise_great': "Great job!",
  'praise_perfect': "Perfect!",
  'praise_excellent': "Excellent!",
  'praise_welldone': "Well done!",
  'praise_goodwork': "Good work!",
  'praise_amazing': "Amazing!",
  'praise_fantastic': "Fantastic!",
  'praise_wonderful': "Wonderful!",
  'praise_awesome': "Awesome!",
  'praise_brilliant': "Brilliant!",
  'praise_superb': "Superb!",
  'praise_terrific': "Terrific!",
  
  // ==================== ENCOURAGEMENT ====================
  'encourage_tryagain': "Try again!",
  'encourage_almost': "Almost there!",
  'encourage_keepgoing': "Keep going!",
  'encourage_dontgiveup': "Don't give up!",
  'encourage_youcandoit': "You can do it!",
  'encourage_onemoretime': "One more time!",
  'encourage_closenow': "You're getting close now!",
  
  // ==================== ERROR CORRECTION ====================
  'error_notquite': "Not quite. Let me help you.",
  'error_listcare': "Listen carefully.",
  'error_repeat': "Repeat after me.",
  'error_slowly': "Let's try slowly.",
  'error_thinkabout': "Think about it.",
  'error_payattention': "Pay attention to the pronunciation.",
  
  // ==================== STORY MISSION ====================
  'story_letsstart': "Let's start the story!",
  'story_whatnext': "What happens next?",
  'story_chooseanswer': "Choose your answer.",
  'story_ready': "Are you ready?",
  'story_continue': "Let's continue!",
  'story_interesting': "That's an interesting choice!",
  'story_thinkcarefully': "Think carefully before you answer.",
  
  // ==================== FREETALK ====================
  'freetalk_tellmore': "Tell me more!",
  'freetalk_interesting': "That's interesting!",
  'freetalk_isee': "I see!",
  'freetalk_really': "Really?",
  'freetalk_understand': "I understand.",
  'freetalk_whatelse': "What else?",
  'freetalk_explain': "Can you explain?",
  'freetalk_example': "Can you give me an example?",
  
  // ==================== QUESTIONS ====================
  'question_why': "Why?",
  'question_how': "How?",
  'question_what': "What do you mean?",
  'question_when': "When?",
  'question_where': "Where?",
  'question_who': "Who?",
  
  // ==================== GAME INSTRUCTIONS ====================
  'game_yourtur': "Your turn!",
  'game_myturn': "My turn!",
  'game_letsplay': "Let's play!",
  'game_ready': "Ready?",
  'game_go': "Go!",
  
  // ==================== TRANSITIONS ====================
  'trans_nexttopic': "Let's move to the next topic.",
  'trans_changetopic': "Let's change the topic.",
  'trans_backto': "Let's go back to...",
  'trans_moving': "Moving on...",
  
  // ==================== GOODBYE ====================
  'goodbye_seeyou': "See you next time!",
  'goodbye_bye': "Goodbye!",
  'goodbye_havefun': "Have a great day!",
  'goodbye_keeppracticing': "Keep practicing!",
};

// Reverse map: phrase text → filename
export const PHRASE_TO_FILENAME = {};
for (const [filename, text] of Object.entries(COMMON_PHRASES)) {
  // Normalize text for matching (lowercase, trim, remove punctuation, normalize whitespace)
  const normalized = text.toLowerCase().trim()
    .replace(/[.,!?;:'"]/g, '')  // Remove punctuation
    .replace(/\s+/g, ' ');        // Normalize whitespace
  PHRASE_TO_FILENAME[normalized] = filename;
}

/**
 * Check if text is a common phrase
 * IMPORTANT: Only exact matches! No substring matching.
 * Reason: AI responses like "Your name is Binh! Wonderful! How old are you?"
 * should NOT match "How old are you?" - they're different content.
 * 
 * @param {string} text - Text to check
 * @returns {string|null} - Filename if common phrase, null otherwise
 */
export function getCommonPhraseFilename(text) {
  if (!text) return null;
  
  // Normalize input text (lowercase, trim, remove punctuation)
  const normalized = text.toLowerCase().trim()
    .replace(/[.,!?;:'"]/g, '')  // Remove punctuation
    .replace(/\s+/g, ' ');        // Normalize whitespace
  
  // ONLY exact match - no substring!
  if (PHRASE_TO_FILENAME[normalized]) {
    return PHRASE_TO_FILENAME[normalized];
  }
  
  // No longer doing substring matching
  // Full AI responses should use dynamic cache instead
  return null;
}

/**
 * Get R2 audio URL for common phrase
 * @param {string} filename - Phrase filename (e.g., 'praise_great')
 * @returns {string} - R2 CDN URL
 */
export function getCommonPhraseURL(filename) {
  const cdnUrl = 'https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev';
  return `${cdnUrl}/audio/ai_tutor/common/${filename}.mp3`;
}

/**
 * Get audio path for Worker caching
 * @param {string} filename - Phrase filename
 * @returns {string} - R2 object key for Worker
 */
export function getCommonPhrasePath(filename) {
  return `audio/ai_tutor/common/${filename}.mp3`;
}

/**
 * Get all common phrases for bulk generation
 * @returns {Object<string, string>} Object with filename keys and text values
 */
export function getAllCommonPhrases() {
  return COMMON_PHRASES;
}
