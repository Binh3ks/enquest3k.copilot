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
    label: '📖 Read & Discover',
    quests: [
      { id: 'gear1_webtoon',  label: '3D Webtoon',     zone: 1, gearIndex: 0, station: null,        icon: '📚', minutes: 8 },
      { id: 'gear2_karaoke',  label: 'Story Karaoke',  zone: 1, gearIndex: 1, station: null,        icon: '🎤', minutes: 7 },
      { id: 'vocab_explorer', label: 'Word Blitz',      zone: 2, gearIndex: null, station: 'word_blitz', icon: '🔤', minutes: 5 },
    ],
  },
  {
    day: 2,
    label: '🎯 Speak & Explore',
    quests: [
      { id: 'gear3_retell',    label: 'Retell to Nova',  zone: 1, gearIndex: 2, station: null,        icon: '🎙️', minutes: 8 },
      { id: 'gear4_clil',      label: 'CLIL Explorer',   zone: 1, gearIndex: 3, station: null,        icon: '🔬', minutes: 8 },
      { id: 'word_power',      label: 'Word Power',      zone: 2, gearIndex: null, station: 'word_power', icon: '💪', minutes: 5 },
    ],
  },
  {
    day: 3,
    label: '⚔️ Battle Day',
    quests: [
      { id: 'word_blitz',      label: 'Word Blitz',      zone: 2, gearIndex: null, station: 'word_blitz',     icon: '⚡', minutes: 5 },
      { id: 'sentence_smash',  label: 'Sentence Smash',  zone: 2, gearIndex: null, station: 'sentence_smash', icon: '🧱', minutes: 5 },
      { id: 'math_quest',      label: 'Math Quest',      zone: 2, gearIndex: null, station: 'math_quest',     icon: '📐', minutes: 6 },
    ],
  },
  {
    day: 4,
    label: '✍️ Create & Write',
    quests: [
      { id: 'story_writer',     label: 'Story Writer',     zone: 3, gearIndex: null, station: 'writing',   icon: '✏️', minutes: 10 },
      { id: 'broadcast_studio', label: 'Broadcast Studio', zone: 3, gearIndex: null, station: 'broadcast', icon: '📻', minutes: 7 },
      { id: 'dictation',        label: 'Dictation',        zone: 3, gearIndex: null, station: 'dictation',  icon: '📝', minutes: 5 },
    ],
  },
  {
    day: 5,
    label: '🏆 Boss Battle',
    quests: [
      { id: 'boss_listening',  label: 'Listening Boss',   zone: 4, gearIndex: null, station: 'listening_boss', icon: '🎧', minutes: 10 },
      { id: 'shadowing',       label: 'Shadowing',        zone: 4, gearIndex: null, station: 'shadowing',      icon: '🗣️', minutes: 7 },
      { id: 'weekly_review',   label: 'Weekly Review',    zone: 4, gearIndex: null, station: 'review',         icon: '⭐', minutes: 5 },
    ],
  },
];

export const DAILY_BONUS_XP = 25;
export const TOTAL_QUEST_DAYS = 5;
export const QUESTS_PER_DAY = 3;
