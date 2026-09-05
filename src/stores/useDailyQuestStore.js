import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { QUEST_SCHEDULE, TOTAL_QUEST_DAYS } from '../config/questSchedule';
import { DAILY_BONUS_XP } from '../config/gamificationConfig';
import { emitLearningEvent, GAMIFICATION_EVENTS } from '../services/gamificationEventBus';

import { useUserStore } from './useUserStore';

// Comprehensive 15-Quest Synonym Groups (Day 1 - Day 5)
// Ensures 100% equivalence across canonical quest IDs, UI names, router slugs, and legacy station keys
export const QUEST_SYNONYM_GROUPS = [
  // Day 1 (Story World)
  ['gear1_webtoon', 'webtoon', 'scene_explorer', 'gear1'],
  ['gear2_karaoke', 'karaoke', 'voice_shadow', 'gear2', 'shadowing'],
  ['gear3_retell', 'retell', 'story_retell', 'gear3'],

  // Day 2 (Knowledge Lab)
  ['gear4_clil', 'clil', 'fact_finder', 'gear4', 'explore'],
  ['science_lab', 'action_lab', 'science_drag_drop', 'lab'],
  ['science_report', 'discovery_report', 'report'],

  // Day 3 (Battle Arena)
  ['word_blitz', 'speed_match', 'vocab_arena', 'vocab', 'word_match'],
  ['sentence_smash', 'grammar_duel', 'sentence_builder', 'grammar'],
  ['math_quest', 'bar_model', 'logic_lab', 'math'],

  // Day 4 (Creator Studio)
  ['story_writer', 'story_writing', 'writing', 'tell_your_story'],
  ['broadcast_studio', 'broadcast', 'video_challenge', 'podcast_creator', 'video'],
  ['info_exchange', 'speaking_part2', 'info_cards', 'ai_debate'],

  // Day 5 (Boss Castle)
  ['boss_listening', 'listening_boss', 'listening_shield'],
  ['boss_reading', 'rw_boss', 'reading_shield'],
  ['weekly_review', 'review', 'speaking_passport', 'personal_questions', 'personal_qs'],
];

// Bidirectional alias lookup dictionary
const ALIAS_LOOKUP = {};
for (const group of QUEST_SYNONYM_GROUPS) {
  for (const id of group) {
    ALIAS_LOOKUP[id] = group;
  }
}

/**
 * Returns all synonymous identifiers for a given quest ID.
 */
export function getAllQuestAliases(questId) {
  return ALIAS_LOOKUP[questId] || [questId];
}

// Backward compatibility map
export const QUEST_ALIAS_MAP = {};
for (const group of QUEST_SYNONYM_GROUPS) {
  const canonical = group[0];
  for (const id of group) {
    QUEST_ALIAS_MAP[id] = (id === canonical && group[1]) ? group[1] : canonical;
  }
}

/**
 * Today's Quest Store — Daily pacing system
 *
 * Tracks which quests are completed per week, calculates current day,
 * manages daily XP bonus claims, and provides navigation helpers.
 *
 * Day numbering: Day 1 = first time user opens the week (flexible for homeschool).
 * Progressive lock (Hybrid Lock C): Day N unlocks when all 3 quests of Day N-1 are done.
 * Teacher/Owner bypass: handled at call-site via teacherOverride / role check.
 */
const useDailyQuestStore = create(
  persist(
    (set, get) => ({
      // ─── State ───────────────────────────────────────────────
      // { 'w33': { 'gear1_webtoon': true, 'gear2_karaoke': true, ... } }
      completedQuests: {},

      // { 'w33': '2026-08-18' }  — ISO date of first open per week
      weekStartDates: {},

      // { 'w33_d1': true, 'w33_d2': true }
      dailyBonusClaimed: {},

      // UI state
      isBarCollapsed: false,

      // ─── Actions ─────────────────────────────────────────────

      /**
       * Initialize/get current day for a week.
       * Day 1 = first time this function is called for the week.
       */
      getCurrentDay: (weekId) => {
        const state = get();
        const weekKey = `w${weekId}`;
        const now = new Date();
        const todayStr = now.toISOString().slice(0, 10);

        // If no start date recorded → this is Day 1
        if (!state.weekStartDates[weekKey]) {
          set({
            weekStartDates: {
              ...state.weekStartDates,
              [weekKey]: todayStr,
            },
          });
          return 1;
        }

        // Calculate days elapsed since start
        const startDate = new Date(state.weekStartDates[weekKey]);
        const diffMs = now.getTime() - startDate.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        // Clamp to 1–5
        return Math.min(Math.max(diffDays + 1, 1), TOTAL_QUEST_DAYS);
      },

      /**
       * Get quest schedule for a specific day (1-5).
       */
      getDayQuests: (day) => {
        const dayConfig = QUEST_SCHEDULE.find((d) => d.day === day);
        return dayConfig || QUEST_SCHEDULE[0];
      },

      /**
       * Get quests for "today" given current week.
       */
      getTodayQuests: (weekId) => {
        const day = get().getCurrentDay(weekId);
        return get().getDayQuests(day);
      },

      /**
       * Check if a specific quest is completed for this week.
       * Uses getAllQuestAliases + fallback to useUserStore progressCache.
       */
      isQuestCompleted: (weekId, questId) => {
        const weekKey = `w${weekId}`;
        const numericWeekId = parseInt(weekId) || weekId;
        const weekData = get().completedQuests[weekKey] || {};
        const aliases = getAllQuestAliases(questId);
        
        // 1. Direct check in useDailyQuestStore completedQuests
        if (aliases.some((id) => Boolean(weekData[id]))) {
          return true;
        }

        // 2. Dual-Store Fallback: check useUserStore progressCache
        try {
          const userProgress = useUserStore?.getState?.()?.progressCache?.[numericWeekId];
          if (userProgress) {
            return aliases.some((id) => Boolean(userProgress[id]?.isCompleted));
          }
        } catch {
          // ignore
        }

        return false;
      },

      /**
       * Mark a quest as completed.
       * Enforces Dual-Store Invariant: syncs to useUserStore + cloud database
       * and marks all synonyms in completedQuests.
       */
      completeQuest: (weekId, questId, options = {}) => {
        const weekKey = `w${weekId}`;
        const numericWeekId = parseInt(weekId) || weekId;
        const aliases = getAllQuestAliases(questId);

        set((state) => {
          const currentWeekQuests = state.completedQuests[weekKey] || {};
          const updatedWeekQuests = {
            ...currentWeekQuests,
            [questId]: true,
          };
          for (const aliasId of aliases) {
            updatedWeekQuests[aliasId] = true;
          }
          return {
            completedQuests: {
              ...state.completedQuests,
              [weekKey]: updatedWeekQuests,
            },
          };
        });

        // Authoritative Learning Task Completion Event
        emitLearningEvent(GAMIFICATION_EVENTS.LEARNING_TASK_COMPLETED, {
          weekNumber: numericWeekId,
          taskId: questId,
          timestamp: new Date().toISOString()
        });

        // Perfect Week Detection: check if all 15 quests are completed
        const updatedCount = get().getWeekQuestCount(numericWeekId);
        if (updatedCount === 15) {
          emitLearningEvent(GAMIFICATION_EVENTS.WEEK_COMPLETED, {
            weekNumber: numericWeekId,
            timestamp: new Date().toISOString()
          });
        }

        // ── Dual-Store Bridge: sync to useUserStore & cloud DB ─────────────
        try {
          const userStore = useUserStore?.getState?.();
          if (userStore?.updateLocalProgress) {
            const score = options.score ?? 100;
            const payload = {
              isCompleted: true,
              score,
              data: options.data || { completedAt: new Date().toISOString() }
            };
            userStore.updateLocalProgress(numericWeekId, questId, payload);
            for (const aliasId of aliases) {
              userStore.updateLocalProgress(numericWeekId, aliasId, payload);
            }
          }
          if (userStore?.syncProgressToServer) {
            userStore.syncProgressToServer({
              weekId: numericWeekId,
              stationId: aliases[0] || questId,
              isCompleted: true,
              score: options.score ?? 100,
              data: options.data || { completedAt: new Date().toISOString() }
            });
          }
        } catch (err) {
          console.warn('[useDailyQuestStore] Auto-sync to useUserStore failed (non-fatal):', err);
        }
      },

      /**
       * Check if all 3 quests for a specific day are done.
       */
      isDayComplete: (weekId, day) => {
        const state = get();
        const weekKey = `w${weekId}`;
        const dayConfig = QUEST_SCHEDULE.find((d) => d.day === day);
        if (!dayConfig) return false;
        return dayConfig.quests.every(
          (q) => state.isQuestCompleted(weekId, q.id)
        );
      },

      /**
       * Check if a day is unlocked for navigation (0-based dayIndex).
       * Day 0 (Day 1) is always accessible.
       * Day N is unlocked when ALL 3 quests of Day N-1 are completed.
       * Pass teacherOverride=true to bypass (owner / staff / parent PIN).
       */
      isDayUnlocked: (weekId, dayIndex, teacherOverride = false) => {
        if (teacherOverride) return true;
        if (dayIndex <= 0) return true;
        // Check that all quests in the PREVIOUS day are complete
        const prevDayConfig = QUEST_SCHEDULE[dayIndex - 1];
        if (!prevDayConfig) return true;
        return prevDayConfig.quests.every((q) => get().isQuestCompleted(weekId, q.id));
      },

      /**
       * Given a questId, return its dayIndex (0-based) in QUEST_SCHEDULE.
       * Returns -1 if not found.
       */
      getQuestDayIndex: (questId) => {
        const aliases = getAllQuestAliases(questId);
        for (let i = 0; i < QUEST_SCHEDULE.length; i++) {
          if (QUEST_SCHEDULE[i].quests.some((q) => aliases.includes(q.id))) return i;
        }
        return -1;
      },

      /**
       * Count completed quests for the entire week (0-15).
       */
      getWeekQuestCount: (weekId) => {
        const allValidQuestIds = QUEST_SCHEDULE.flatMap((d) => d.quests.map((q) => q.id));
        return allValidQuestIds.filter((id) => get().isQuestCompleted(weekId, id)).length;
      },

      /**
       * Claim daily bonus XP. Returns true if claimed, false if already claimed.
       */
      claimDailyBonus: (weekId, day) => {
        const bonusKey = `w${weekId}_d${day}`;
        if (get().dailyBonusClaimed[bonusKey]) return false;
        set((state) => ({
          dailyBonusClaimed: {
            ...state.dailyBonusClaimed,
            [bonusKey]: true,
          },
        }));

        // Emit authoritative event to Event Bus
        emitLearningEvent(GAMIFICATION_EVENTS.DAILY_QUESTS_COMPLETED, {
          weekNumber: weekId,
          dayNumber: day,
          timestamp: new Date().toISOString()
        });

        return true;
      },

      /**
       * Check if daily bonus was already claimed.
       */
      isBonusClaimed: (weekId, day) => {
        const bonusKey = `w${weekId}_d${day}`;
        return Boolean(get().dailyBonusClaimed[bonusKey]);
      },

      /**
       * Toggle bar collapsed state.
       */
      toggleBar: () => set((state) => ({ isBarCollapsed: !state.isBarCollapsed })),

      /**
       * Reset quest progress for a week (admin/testing).
       */
      resetWeek: (weekId) => {
        const weekKey = `w${weekId}`;
        set((state) => {
          const newCompleted = { ...state.completedQuests };
          delete newCompleted[weekKey];
          const newBonuses = { ...state.dailyBonusClaimed };
          for (let d = 1; d <= TOTAL_QUEST_DAYS; d++) {
            delete newBonuses[`w${weekId}_d${d}`];
          }
          return { completedQuests: newCompleted, dailyBonusClaimed: newBonuses };
        });
      },
    }),
    {
      name: 'engquest-daily-quest',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        completedQuests: state.completedQuests,
        weekStartDates: state.weekStartDates,
        dailyBonusClaimed: state.dailyBonusClaimed,
        isBarCollapsed: state.isBarCollapsed,
      }),
    }
  )
);

export default useDailyQuestStore;
