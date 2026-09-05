import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { QUEST_SCHEDULE, TOTAL_QUEST_DAYS } from '../config/questSchedule';
import { DAILY_BONUS_XP } from '../config/gamificationConfig';
import { emitLearningEvent, GAMIFICATION_EVENTS } from '../services/gamificationEventBus';

import { useUserStore } from './useUserStore';

// Canonical Quest ID and alias normalization map
const QUEST_ALIAS_MAP = {
  // Zone 2
  action_lab: 'science_lab',
  science_lab: 'action_lab',
  discovery_report: 'science_report',
  science_report: 'discovery_report',
  clil: 'gear4_clil',
  fact_finder: 'gear4_clil',
  gear4_clil: 'clil',

  // Zone 3
  speed_match: 'word_blitz',
  word_blitz: 'speed_match',
  grammar_duel: 'sentence_smash',
  sentence_smash: 'grammar_duel',
  bar_model: 'math_quest',
  math_quest: 'bar_model',

  // Zone 4
  story_writing: 'story_writer',
  writing: 'story_writer',
  story_writer: 'story_writing',
  broadcast: 'broadcast_studio',
  video_challenge: 'broadcast_studio',
  broadcast_studio: 'video_challenge',
  podcast_creator: 'broadcast_studio',

  // Zone 5
  listening_boss: 'boss_listening',
  boss_listening: 'listening_boss',
  rw_boss: 'boss_reading',
  boss_reading: 'rw_boss',
  review: 'weekly_review',
  weekly_review: 'review',
};

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
       */
      isQuestCompleted: (weekId, questId) => {
        const weekKey = `w${weekId}`;
        const weekData = get().completedQuests[weekKey] || {};
        const alias = QUEST_ALIAS_MAP[questId];
        return Boolean(weekData[questId] || (alias && weekData[alias]));
      },

      /**
       * Mark a quest as completed.
       * Enforces Dual-Store Invariant: syncs to useUserStore + cloud database
       */
      completeQuest: (weekId, questId, options = {}) => {
        const weekKey = `w${weekId}`;
        const numericWeekId = parseInt(weekId) || weekId;
        const alias = QUEST_ALIAS_MAP[questId];

        set((state) => {
          const currentWeekQuests = state.completedQuests[weekKey] || {};
          const updatedWeekQuests = {
            ...currentWeekQuests,
            [questId]: true,
          };
          if (alias) {
            updatedWeekQuests[alias] = true;
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
            if (alias) {
              userStore.updateLocalProgress(numericWeekId, alias, payload);
            }
          }
          if (userStore?.syncProgressToServer) {
            userStore.syncProgressToServer({
              weekId: numericWeekId,
              stationId: questId,
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
        const alias = QUEST_ALIAS_MAP[questId];
        for (let i = 0; i < QUEST_SCHEDULE.length; i++) {
          if (QUEST_SCHEDULE[i].quests.some((q) => q.id === questId || (alias && q.id === alias))) return i;
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
