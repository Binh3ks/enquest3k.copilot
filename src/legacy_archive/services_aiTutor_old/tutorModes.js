/**
 * AI TUTOR MODES
 * These are NOT chatbot modes - they are teaching modes
 */

export const TutorModes = {
  CHAT: 'chat',
  PRONUNCIATION: 'pronunciation',
  STORY_MISSION: 'story_mission',
  QUIZ: 'quiz',
  DEBATE: 'debate'
};

export const TutorDifficulty = {
  EASY: 'easy',
  NORMAL: 'normal',
  CHALLENGE: 'challenge'
};

export const LearnerStyle = {
  SHY: 'shy',
  NORMAL: 'normal',
  CONFIDENT: 'confident'
};

export const ScaffoldLevel = {
  HINT_WORDS: 1,
  SENTENCE_STARTER: 2,
  MODEL_SENTENCE: 3,
  COPY_ONLY: 4
};

/**
 * Constraints by difficulty (WOW pedagogy)
 */
export const DifficultyConstraints = {
  easy: {
    aiMaxSentences: 1,
    aiMaxWords: 10,
    userMinWords: 3,
    userTargetWords: 7,
    pronMaxWordLen: 6
  },
  normal: {
    aiMaxSentences: 2,
    aiMaxWords: 20,
    userMinWords: 6,
    userTargetWords: 12,
    pronMaxWordLen: 10
  },
  challenge: {
    aiMaxSentences: 2,
    aiMaxWords: 25,
    userMinWords: 10,
    userTargetWords: 18,
    pronMaxWordLen: 15
  }
};
