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
 * GEAR NAMING MAP (Universal Action & Skill-Based Standard):
 *   gear1_webtoon   : 📚 Scene Explorer       (Đọc hiểu tương tác cảnh truyện 3D)
 *   gear2_karaoke   : 🎧 Voice Shadow          (Nhại giọng câu chuyện & rèn phát âm)
 *   gear3_retell    : 🎙️ Story Retell          (Tóm tắt & kể lại cùng Nova)
 *   gear4_clil      : 🌐 Fact Finder           (Đọc mở rộng tri thức văn hóa/địa lý/khoa học)
 *   science_lab     : 🧪 Action Lab            (Tương tác thực hành / giải quyết vấn đề)
 *   science_report  : 📝 Discovery Report      (Báo cáo đúc kết phát hiện & bài học)
 *   word_blitz      : ⚡ Speed Match           (Đấu trường phản xạ từ vựng tốc độ cao)
 *   sentence_smash  : 🧱 Grammar Duel          (Đấu trường sắp xếp cú pháp câu)
 *   math_quest      : 📐 Math Quest            (Tư duy toán học, định lượng & sơ đồ)
 *   story_writer    : ✏️ Story Writer          (Sáng tác truyện 3 cảnh chuẩn Cambridge P7)
 *   broadcast_studio: 📻 Hot Mic               (Thu âm podcast / dẫn chuyện phát thanh)
 *   ai_debate       : 🎭 Debate Arena          (Tranh biện phản biện đa chiều cùng AI)
 *   boss_listening  : 🎧 Listening Shield      (Đánh giá năng lực Nghe 5 Khiên)
 *   boss_reading    : 📖 Reading & Writing Shield (Đánh giá năng lực Đọc - Viết 5 Khiên)
 *   weekly_review   : 🏆 Speaking & Passport   (Đánh giá năng lực Nói & Chứng nhận 15 Khiên)
 */

export const QUEST_SCHEDULE = [
  {
    day: 1,
    label: '📖 Story World',
    quests: [
      { id: 'gear1_webtoon',  label: 'Scene Explorer',   zone: 1, gearIndex: 0, station: null,              icon: '📚', minutes: 8, xp: 0, isMilestone: true },
      { id: 'gear2_karaoke',  label: 'Voice Shadow',     zone: 1, gearIndex: 1, station: null,              icon: '🎧', minutes: 7, xp: 0, isMilestone: true },
      { id: 'gear3_retell',   label: 'Story Retell',     zone: 1, gearIndex: 2, station: null,              icon: '🎙️', minutes: 8, xp: 50, isMilestone: false },
    ],
  },
  {
    day: 2,
    label: '🔬 Knowledge Lab',
    quests: [
      { id: 'gear4_clil',     label: 'Fact Finder',      zone: 1, gearIndex: 3, station: null,              icon: '🌐', minutes: 8, xp: 0, isMilestone: true },
      { id: 'science_lab',    label: 'Action Lab',       zone: 2, gearIndex: null, station: 'science_lab',  icon: '🧪', minutes: 6, xp: 50, isMilestone: false },
      { id: 'science_report', label: 'Discovery Report', zone: 3, gearIndex: null, station: 'science_report', icon: '📝', minutes: 7, xp: 50, isMilestone: false },
    ],
  },
  {
    day: 3,
    label: '⚔️ Battle Arena',
    quests: [
      { id: 'word_blitz',     label: 'Speed Match',      zone: 2, gearIndex: null, station: 'word_blitz',     icon: '⚡', minutes: 5, xp: 45, isMilestone: false },
      { id: 'sentence_smash', label: 'Grammar Duel',     zone: 2, gearIndex: null, station: 'sentence_smash', icon: '🧱', minutes: 5, xp: 50, isMilestone: false },
      { id: 'math_quest',     label: 'Math Quest',       zone: 2, gearIndex: null, station: 'math_quest',     icon: '📐', minutes: 6, xp: 40, isMilestone: false },
    ],
  },
  {
    day: 4,
    label: '✍️ Creator Studio',
    quests: [
      { id: 'story_writer',     label: 'Story Writer',    zone: 3, gearIndex: null, station: 'writing',     icon: '✏️', minutes: 10, xp: 50, isMilestone: false },
      { id: 'broadcast_studio', label: 'Video Challenge', zone: 3, gearIndex: null, station: 'broadcast',   icon: '📹', minutes: 7, xp: 0, isMilestone: true },
      { id: 'info_exchange',    label: 'Info Exchange',   zone: 3, gearIndex: null, station: null,          icon: '🔄', minutes: 7, xp: 20, isMilestone: false },
    ],
  },
  {
    day: 5,
    label: '🏰 Boss Castle',
    quests: [
      { id: 'boss_listening', label: 'Listening Shield',          zone: 4, gearIndex: null, station: 'listening_boss', icon: '🎧', minutes: 10, xp: 0, isMilestone: true },
      { id: 'boss_reading',   label: 'Reading & Writing Shield',  zone: 4, gearIndex: null, station: 'rw_boss',        icon: '📖', minutes: 10, xp: 0, isMilestone: true },
      { id: 'weekly_review',  label: 'Speaking & Passport',       zone: 4, gearIndex: null, station: 'review',         icon: '🏆', minutes: 15, xp: 0, isMilestone: true },
    ],
  },
];

export const DAILY_BONUS_XP = 25;
export const TOTAL_QUEST_DAYS = 5;
export const QUESTS_PER_DAY = 3;
