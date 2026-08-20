/**
 * QUEST SCHEDULE — Maps 15 weekly tasks → 5 daily sessions (3 quests each)
 *
 * Each quest has:
 *   id        — unique key for progress tracking (FROZEN, never rename)
 *   label     — child-friendly game name shown in UI
 *   zone      — hub number (1-4) for navigation
 *   gearIndex — gear tab index inside zone (0-3), null if station-based
 *   station   — station key used as forcedStation prop
 *   icon      — emoji for visual recognition
 *   minutes   — estimated time (used for "~X min remaining")
 *
 * GEAR NAMING MAP (W33 Blueprint → Current → New):
 *   gear1_webtoon   : Story Time (3D Webtoon)         → Scene Scroll
 *   gear2_karaoke   : Audio Narration / Shadowing     → Echo Drill
 *   gear3_retell    : Personal Q&A / Nova Talk Show   → Nova's Story Pit
 *   gear4_clil      : CLIL Knowledge Explorer         → Lab Briefing
 *   science_lab     : Science Drag-Drop Lab            → Force Lab
 *   science_report  : Science Report Creator           → Field Report
 *   word_blitz      : Speed Match / Flash Arena        → Flash Strike
 *   sentence_smash  : Sentence Builder Battle          → Grammar Duel
 *   math_quest      : Bar Model Quest (Singapore)      → Bar Showdown
 *   story_writer    : Story Writing Studio R&W P7      → Author's Den
 *   broadcast_studio: Broadcast Studio / Podcast       → Hot Mic
 *   ai_debate       : AI Debate Mode (Speaking P4)     → Debate Arena
 *   boss_listening  : Cambridge Listening Mock P1-5    → Ear Shield
 *   boss_reading    : Cambridge R&W Mock P1-6          → Flyers Gauntlet
 *   weekly_review   : Full Mock + Passport             → Cambridge Passport
 */

export const QUEST_SCHEDULE = [
  {
    day: 1,
    label: '📖 Story World',
    quests: [
      { id: 'gear1_webtoon',  label: 'Scene Scroll',     zone: 1, gearIndex: 0, station: null,              icon: '📚', minutes: 8 },
      { id: 'gear2_karaoke',  label: 'Echo Drill',       zone: 1, gearIndex: 1, station: null,              icon: '🎧', minutes: 7 },
      { id: 'gear3_retell',   label: "Nova's Story Pit", zone: 1, gearIndex: 2, station: null,              icon: '🎙️', minutes: 8 },
    ],
  },
  {
    day: 2,
    label: '🔬 Science Lab',
    quests: [
      { id: 'gear4_clil',     label: 'Lab Briefing',     zone: 1, gearIndex: 3, station: null,              icon: '🔬', minutes: 8 },
      { id: 'science_lab',    label: 'Force Lab',        zone: 2, gearIndex: null, station: 'science_lab',  icon: '🧪', minutes: 6 },
      { id: 'science_report', label: 'Field Report',     zone: 3, gearIndex: null, station: 'science_report', icon: '📝', minutes: 7 },
    ],
  },
  {
    day: 3,
    label: '⚔️ Battle Arena',
    quests: [
      { id: 'word_blitz',     label: 'Flash Strike',     zone: 2, gearIndex: null, station: 'word_blitz',     icon: '⚡', minutes: 5 },
      { id: 'sentence_smash', label: 'Grammar Duel',     zone: 2, gearIndex: null, station: 'sentence_smash', icon: '🧱', minutes: 5 },
      { id: 'math_quest',     label: 'Bar Showdown',     zone: 2, gearIndex: null, station: 'math_quest',     icon: '📐', minutes: 6 },
    ],
  },
  {
    day: 4,
    label: '✍️ Creator Studio',
    quests: [
      { id: 'story_writer',     label: "Author's Den",   zone: 3, gearIndex: null, station: 'writing',     icon: '✏️', minutes: 10 },
      { id: 'broadcast_studio', label: 'Hot Mic',        zone: 3, gearIndex: null, station: 'broadcast',   icon: '📻', minutes: 7 },
      { id: 'ai_debate',        label: 'Debate Arena',   zone: 3, gearIndex: null, station: 'ai_debate',   icon: '🎭', minutes: 7 },
    ],
  },
  {
    day: 5,
    label: '🏰 Boss Castle',
    quests: [
      { id: 'boss_listening', label: 'Ear Shield',          zone: 4, gearIndex: null, station: 'listening_boss', icon: '🎧', minutes: 10 },
      { id: 'boss_reading',   label: 'Flyers Gauntlet',     zone: 4, gearIndex: null, station: 'rw_boss',        icon: '📖', minutes: 10 },
      { id: 'weekly_review',  label: 'Cambridge Passport',  zone: 4, gearIndex: null, station: 'review',         icon: '🏆', minutes: 15 },
    ],
  },
];

export const DAILY_BONUS_XP = 25;
export const TOTAL_QUEST_DAYS = 5;
export const QUESTS_PER_DAY = 3;
