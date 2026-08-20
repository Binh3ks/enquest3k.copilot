/**
 * STATION & TASK LABELS — SINGLE SOURCE OF TRUTH (SSOT)
 *
 * All UI components (QuestMap3D, TaskScreen, Sidebar, Zones, Banners, Headers)
 * MUST import labels and metadata from this file to ensure 100% consistency.
 */

export const STATION_NAMES = {
  1: 'Story World',
  2: 'Knowledge Lab',
  3: 'Battle Arena',
  4: 'Creator Studio',
  5: 'Boss Castle',
};

export const STATION_ICONS = {
  1: '📖',
  2: '🔬',
  3: '⚔️',
  4: '✍️',
  5: '🏰',
};

export const STATION_THEMES = {
  1: { label: 'Story World', icon: '📖', color: 'indigo', bannerBg: 'from-indigo-900 to-purple-900' },
  2: { label: 'Knowledge Lab', icon: '🔬', color: 'emerald', bannerBg: 'from-teal-900 to-emerald-900' },
  3: { label: 'Battle Arena', icon: '⚔️', color: 'amber', bannerBg: 'from-amber-900 to-orange-900' },
  4: { label: 'Creator Studio', icon: '✍️', color: 'purple', bannerBg: 'from-purple-900 to-pink-900' },
  5: { label: 'Boss Castle', icon: '🏰', color: 'rose', bannerBg: 'from-rose-900 to-red-950' },
};

export const TASK_METADATA = {
  gear1_webtoon:    { label: 'Scene Explorer', icon: '📚', day: 1, stationName: 'Story World', minutes: 8 },
  gear2_karaoke:    { label: 'Voice Shadow', icon: '🎧', day: 1, stationName: 'Story World', minutes: 7 },
  gear3_retell:     { label: 'Story Retell', icon: '🎙️', day: 1, stationName: 'Story World', minutes: 8 },
  gear4_clil:       { label: 'Fact Finder', icon: '🌐', day: 2, stationName: 'Knowledge Lab', minutes: 8 },
  science_lab:      { label: 'Action Lab', icon: '🧪', day: 2, stationName: 'Knowledge Lab', minutes: 6 },
  science_report:   { label: 'Discovery Report', icon: '📝', day: 2, stationName: 'Knowledge Lab', minutes: 7 },
  word_blitz:       { label: 'Speed Match', icon: '⚡', day: 3, stationName: 'Battle Arena', minutes: 5 },
  sentence_smash:   { label: 'Grammar Duel', icon: '🧱', day: 3, stationName: 'Battle Arena', minutes: 5 },
  math_quest:       { label: 'Math Quest', icon: '📐', day: 3, stationName: 'Battle Arena', minutes: 6 },
  story_writer:     { label: 'Story Writer', icon: '✏️', day: 4, stationName: 'Creator Studio', minutes: 10 },
  broadcast_studio: { label: 'Hot Mic', icon: '📻', day: 4, stationName: 'Creator Studio', minutes: 7 },
  ai_debate:        { label: 'Debate Arena', icon: '🎭', day: 4, stationName: 'Creator Studio', minutes: 7 },
  boss_listening:   { label: 'Listening Shield', icon: '🎧', day: 5, stationName: 'Boss Castle', minutes: 10 },
  boss_reading:     { label: 'Reading & Writing Shield', icon: '📖', day: 5, stationName: 'Boss Castle', minutes: 10 },
  weekly_review:    { label: 'Speaking & Passport', icon: '🏆', day: 5, stationName: 'Boss Castle', minutes: 15 },
};
