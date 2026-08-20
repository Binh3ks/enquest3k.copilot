/**
 * QUEST SCHEDULE — Maps 16 weekly activities → 5 daily sessions (3 quests each)
 *
 * Each quest has:
 *   id        — unique key for progress tracking
 *   label     — child-friendly name shown in UI
 *   zone      — hub number (1-4) for navigation
 *   gearIndex — gear tab index inside zone (0-3), null if station-based
 *   station   — legacy station key (for non-gear activities)
 *   icon      — emoji for visual recognition
 *   minutes   — estimated time (used for "~X min remaining")
 */

export const QUEST_SCHEDULE = [
  {
    day: 1,
    label: '📖 The Explorer',
    quests: [
      { id: 'gear1_webtoon',  label: '3D Webtoon',      zone: 1, gearIndex: 0, station: null, icon: '📚', minutes: 8 },
      { id: 'gear2_karaoke',  label: 'Story Karaoke',   zone: 1, gearIndex: 1, station: null, icon: '🎤', minutes: 7 },
      { id: 'gear3_retell',   label: 'Retell to Nova',  zone: 1, gearIndex: 2, station: null, icon: '🎙️', minutes: 8 },
    ],
  },
  {
    day: 2,
    label: '🔬 Science Lab',
    quests: [
      { id: 'gear4_clil',      label: 'CLIL Explorer',   zone: 1, gearIndex: 3, station: null,           icon: '🔬', minutes: 8 },
      { id: 'science_lab',     label: 'Science Lab',     zone: 2, gearIndex: null, station: 'science_lab',   icon: '🧪', minutes: 6 },
      { id: 'science_report',  label: 'Science Report',  zone: 3, gearIndex: null, station: 'science_report',icon: '📝', minutes: 7 },
    ],
  },
  {
    day: 3,
    label: '⚔️ Battle Arena',
    quests: [
      { id: 'word_blitz',      label: 'Word Blitz',      zone: 2, gearIndex: null, station: 'word_blitz',     icon: '⚡', minutes: 5 },
      { id: 'sentence_smash',  label: 'Sentence Smash',  zone: 2, gearIndex: null, station: 'sentence_smash', icon: '🧱', minutes: 5 },
      { id: 'math_quest',      label: 'Math Quest',      zone: 2, gearIndex: null, station: 'math_quest',     icon: '📐', minutes: 6 },
    ],
  },
  {
    day: 4,
    label: '✍️ Creative Studio',
    quests: [
      { id: 'story_writer',     label: 'Story Writer',     zone: 3, gearIndex: null, station: 'writing',     icon: '✏️', minutes: 10 },
      { id: 'broadcast_studio', label: 'Broadcast Studio', zone: 3, gearIndex: null, station: 'broadcast',   icon: '📻', minutes: 7 },
      { id: 'ai_debate',        label: 'AI Debate',        zone: 3, gearIndex: null, station: 'ai_debate',   icon: '🎭', minutes: 7 },
    ],
  },
  {
    day: 5,
    label: '🏰 Boss Castle',
    quests: [
      { id: 'boss_listening',   label: 'Listening Boss',   zone: 4, gearIndex: null, station: 'listening_boss', icon: '🎧', minutes: 10 },
      { id: 'boss_reading',     label: 'Reading & Writing',zone: 4, gearIndex: null, station: 'rw_boss',        icon: '📖', minutes: 10 },
      { id: 'weekly_review',    label: 'Weekly Review',    zone: 4, gearIndex: null, station: 'review',         icon: '🏆', minutes: 15 },
    ],
  },
];

export const DAILY_BONUS_XP = 25;
export const TOTAL_QUEST_DAYS = 5;
export const QUESTS_PER_DAY = 3;
