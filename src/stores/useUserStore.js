import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { register as apiRegister, updateProfile as apiUpdateProfile, progressAPI, setTokenGetter, login as apiLogin } from '../services/api.js';
// import { supabaseAuth } from '../services/supabase';
import { calculateWeekStars, getNewlyEarnedBadges } from '../utils/scoringSystem.js';
import { COLLECTIONS } from '../data/collectionConfig.js';
import { saveProgressWithBackup } from '../utils/progressBackup.js';
import { recordAuthoritativeStreak } from '../utils/progressReport.js';
import {
  DAILY_BONUS_XP,
  PERFECT_WEEK_XP,
  SHIELD_UNIT_XP,
  TASK_BASE_XP_MAP,
  DEFAULT_TASK_XP,
  generateXPTransactionId,
  generateShieldScoreId
} from '../config/gamificationConfig.js';
import { gamificationEventBus, GAMIFICATION_EVENTS } from '../services/gamificationEventBus.js';

export const LEGACY_TO_NOVA_COSMETIC_MAP = {
  crown: 'crown',
  glasses: 'glasses',
  cool_glasses: 'glasses',
};

export const NOVA_TO_LEGACY_COSMETIC_MAP = {
  crown: 'crown',
  glasses: 'glasses',
};

/**
 * Non-destructive bidirectional cosmetic inventory synchronization (SPEC-P3-002)
 * Ensures legacy avatar items and modern Nova mascot gear cross-grant cleanly without duplicates or data loss.
 */
export function syncCosmeticInventories(avatarItems = [], purchasedNovaItems = ['headphones']) {
  const currentAvatar = Array.isArray(avatarItems) ? [...avatarItems] : [];
  const currentNova = Array.isArray(purchasedNovaItems) ? [...purchasedNovaItems] : ['headphones'];

  const updatedAvatarSet = new Set(currentAvatar);
  const updatedNovaSet = new Set(currentNova);

  // 1. Cross-grant: Legacy -> Nova
  for (const item of currentAvatar) {
    if (LEGACY_TO_NOVA_COSMETIC_MAP[item]) {
      updatedNovaSet.add(LEGACY_TO_NOVA_COSMETIC_MAP[item]);
    }
  }

  // 2. Mirror: Nova -> Legacy
  for (const item of currentNova) {
    if (NOVA_TO_LEGACY_COSMETIC_MAP[item]) {
      updatedAvatarSet.add(NOVA_TO_LEGACY_COSMETIC_MAP[item]);
    }
  }

  return {
    avatarItems: Array.from(updatedAvatarSet),
    purchasedNovaItems: Array.from(updatedNovaSet),
  };
}

// This store manages user authentication, profile, and app-wide settings.
const useUserStore = create(
  persist(
    (set, get) => ({
      // STATE
      currentUser: null,
      token: null,
      learningMode: 'easy',
      
      // UNIVERSAL PROGRESS SYSTEM STATE
      progressCache: {}, // Structure: { weekId: { stationId: { data, isCompleted, score } } }
      weekCompletion: {}, // Structure: { weekId: percentage }
      weekStars: {}, // Structure: { weekId: { totalStars, maxStars, percentage } }
      earnedBadges: [], // Array of badge IDs
      avatarItems: [], // Array of earned avatar item IDs
      equippedItems: { hat: null, glasses: null, accessory: null }, // Currently equipped items

      // TEACHER PANEL STATE
      isTeacherPanelOpen: false,
      setTeacherPanelOpen: (open) => set({ isTeacherPanelOpen: Boolean(open) }),

      // META-GAME MASCOT STORE & XP ECONOMY STATE
      userXP: 0, // Default starting balance for new learners (dev tests use seedXP)
      purchasedNovaItems: ['headphones'], // Pre-unlocked starter item
      equippedNovaGear: { hat: null, glasses: null, accessory: 'headphones' },
      streakFreezeActive: false,
      
      // IDEMPOTENT TRANSACTION LEDGERS (Namespaced by userId)
      // Structure: { [userId]: { [transactionKey]: { xp, reason, metadata, timestamp } } }
      claimedTransactions: {},
      // Structure: { [userId]: { [shieldScoreId]: { shields, rawScore, updatedAt } } }
      highestShieldScores: {},

      // MASCOT STORE & IDEMPOTENT XP ACTIONS
      
      /**
       * Primary Idempotent XP Award Method
       * Protects against duplicate rewards on retries, page reloads, and replayed events.
       * Uses Web Locks API (navigator.locks) for cross-tab multi-process atomicity where available.
       * @param {Object} params
       * @param {string} [params.userId] - Learner ID (defaults to active currentUser)
       * @param {string} params.transactionKey - Unique deterministic transaction ID
       * @param {number} params.amount - XP amount to award
       * @param {string} [params.reason] - Human-readable reason
       * @param {Object} [params.metadata] - Extra context
       * @returns {Promise<Object>|Object} Result object { awarded: boolean, xpEarned: number, newTotalXP: number }
       */
      awardIdempotentXP: async ({ userId, transactionKey, amount, reason = '', metadata = {} }) => {
        const state = get();
        const uid = userId || state.currentUser?.id || state.currentUser?.username || 'anonymous';

        if (!transactionKey) {
          console.warn('[Gamification] awardIdempotentXP called without transactionKey!');
          return { awarded: false, reason: 'MISSING_TRANSACTION_KEY', currentXP: state.userXP || 0 };
        }

        const executeCriticalSection = () => {
          const currentState = get();
          let effectiveLedger = currentState.claimedTransactions[uid] || {};
          let currentBalance = currentState.userXP || 0;

          // Synchronous Multi-Tab Concurrency Guard: inspect disk state if available
          try {
            if (typeof localStorage !== 'undefined') {
              const rawStorage = localStorage.getItem('engquest-user-storage');
              if (rawStorage) {
                const diskState = JSON.parse(rawStorage)?.state;
                const diskLedger = diskState?.claimedTransactions?.[uid];
                if (diskLedger) {
                  effectiveLedger = { ...effectiveLedger, ...diskLedger };
                }
                if (typeof diskState?.userXP === 'number') {
                  currentBalance = Math.max(currentBalance, diskState.userXP);
                }
              }
            }
          } catch (_) {
            // Fallback to in-memory ledger
          }

          // Idempotency check: if already claimed, return early with 0 new XP
          if (effectiveLedger[transactionKey]) {
            return {
              awarded: false,
              reason: 'ALREADY_CLAIMED',
              transactionKey,
              previousRecord: effectiveLedger[transactionKey],
              currentXP: currentBalance
            };
          }

          const earnedAmount = typeof amount === 'number' && amount >= 0 ? amount : 0;
          const newTotalXP = currentBalance + earnedAmount;
          const txRecord = {
            xp: earnedAmount,
            reason,
            metadata,
            timestamp: new Date().toISOString()
          };

          set((s) => ({
            userXP: newTotalXP,
            claimedTransactions: {
              ...s.claimedTransactions,
              [uid]: {
                ...(s.claimedTransactions[uid] || {}),
                [transactionKey]: txRecord
              }
            }
          }));

          return {
            awarded: true,
            xpEarned: earnedAmount,
            newTotalXP,
            transactionKey
          };
        };

        // Origin-wide multi-tab critical section lock via Web Locks API
        if (typeof navigator !== 'undefined' && navigator.locks?.request) {
          const lockName = `engquest_xp_lock_${uid}`;
          return await navigator.locks.request(lockName, async () => {
            return executeCriticalSection();
          });
        }

        // Fallback for non-Web-Locks environments (Node.js tests, legacy browsers)
        return executeCriticalSection();
      },

      /**
       * Award Delta XP for Cambridge Shield Improvements
       * Anti-inflation guard: awards delta only if newShields > highestPreviousShields.
       */
      awardShieldDeltaXP: async ({ userId, weekNumber, shieldPart, newShields, rawScore = 0 }) => {
        const state = get();
        const uid = userId || state.currentUser?.id || state.currentUser?.username || 'anonymous';
        const shieldScoreId = generateShieldScoreId({ userId: uid, weekNumber, shieldPart });

        const executeShieldSection = async () => {
          const currentState = get();
          const userShields = currentState.highestShieldScores[uid] || {};
          const previousRecord = userShields[shieldScoreId];
          const highestPrevShields = previousRecord ? (previousRecord.shields || 0) : 0;

          const currentShieldScore = typeof newShields === 'number' ? Math.max(0, Math.min(5, newShields)) : 0;

          if (currentShieldScore <= highestPrevShields) {
            return {
              awarded: false,
              reason: 'NO_IMPROVEMENT',
              shieldPart,
              previousHighest: highestPrevShields,
              currentShieldScore,
              xpEarned: 0
            };
          }

          const delta = currentShieldScore - highestPrevShields;
          const earnedXP = delta * SHIELD_UNIT_XP;
          const txKey = `tx_shield_${uid}_w${weekNumber}_${shieldPart}_lvl${currentShieldScore}`;

          set((s) => ({
            highestShieldScores: {
              ...s.highestShieldScores,
              [uid]: {
                ...(s.highestShieldScores[uid] || {}),
                [shieldScoreId]: {
                  shields: currentShieldScore,
                  rawScore: rawScore || 0,
                  updatedAt: new Date().toISOString()
                }
              }
            }
          }));

          const awardRes = await get().awardIdempotentXP({
            userId: uid,
            transactionKey: txKey,
            amount: earnedXP,
            reason: `Shield improvement on ${shieldPart}: ${highestPrevShields} -> ${currentShieldScore} (+${delta} shields)`
          });

          return {
            awarded: true,
            shieldPart,
            previousHighest: highestPrevShields,
            newHighest: currentShieldScore,
            deltaShields: delta,
            xpEarned: awardRes?.xpEarned || earnedXP
          };
        };

        if (typeof navigator !== 'undefined' && navigator.locks?.request) {
          const lockName = `engquest_shield_lock_${uid}`;
          return await navigator.locks.request(lockName, async () => {
            return await executeShieldSection();
          });
        }

        return await executeShieldSection();
      },

      // Legacy addXP wrapper for dev/testing backwards compatibility
      addXP: (amount) => {
        const state = get();
        const uid = state.currentUser?.id || state.currentUser?.username || 'anonymous';
        const txKey = `manual_add_${uid}_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        return get().awardIdempotentXP({ userId: uid, transactionKey: txKey, amount, reason: 'Manual/Legacy addXP' });
      },

      // Developer Seed Tool (Used in Teacher Panel for testing)
      seedDevXP: (amount = 1250) => set((state) => ({ userXP: (state.userXP || 0) + amount })),
      
      buyNovaItem: async (item) => {
        const state = get();
        const uid = state.currentUser?.id || state.currentUser?.username || 'anonymous';

        if (!item || !item.id || typeof item.price !== 'number' || item.price < 0) {
          return { success: false, message: 'Invalid item definition!' };
        }

        const executePurchase = () => {
          const currentState = get();
          let currentXP = currentState.userXP || 0;
          let purchased = Array.isArray(currentState.purchasedNovaItems) ? [...currentState.purchasedNovaItems] : [];

          // Synchronous disk balance & inventory sync
          try {
            if (typeof localStorage !== 'undefined') {
              const raw = localStorage.getItem('engquest-user-storage');
              if (raw) {
                const diskState = JSON.parse(raw)?.state;
                if (typeof diskState?.userXP === 'number') {
                  currentXP = diskState.userXP;
                }
                if (Array.isArray(diskState?.purchasedNovaItems)) {
                  purchased = Array.from(new Set([...purchased, ...diskState.purchasedNovaItems]));
                }
              }
            }
          } catch (_) {}

          if (currentXP < item.price) {
            return { success: false, message: 'Not enough XP!', currentXP };
          }
          if (purchased.includes(item.id)) {
            return { success: false, message: 'Already owned!', currentXP };
          }

          const rawUpdatedPurchased = [...purchased, item.id];
          const newXP = currentXP - item.price;
          const updatedEquipped = item.category ? { ...(currentState.equippedNovaGear || {}), [item.category]: item.id } : (currentState.equippedNovaGear || {});
          const synced = syncCosmeticInventories(currentState.avatarItems || [], rawUpdatedPurchased);

          set({
            userXP: newXP,
            purchasedNovaItems: synced.purchasedNovaItems,
            avatarItems: synced.avatarItems,
            equippedNovaGear: updatedEquipped,
            streakFreezeActive: item.id === 'streak_freeze' ? true : currentState.streakFreezeActive
          });

          return { success: true, newTotalXP: newXP, purchasedItem: item.id };
        };

        if (typeof navigator !== 'undefined' && navigator.locks?.request) {
          const lockName = `engquest_xp_lock_${uid}`;
          return await navigator.locks.request(lockName, async () => {
            return executePurchase();
          });
        }

        return executePurchase();
      },

      equipNovaItem: (category, itemId) => {
        const state = get();
        let currentEquipped = state.equippedNovaGear || {};
        
        try {
          if (typeof localStorage !== 'undefined') {
            const raw = localStorage.getItem('engquest-user-storage');
            if (raw) {
              const diskEquipped = JSON.parse(raw)?.state?.equippedNovaGear;
              if (diskEquipped && typeof diskEquipped === 'object') {
                currentEquipped = { ...currentEquipped, ...diskEquipped };
              }
            }
          }
        } catch (_) {}

        const isEquipped = currentEquipped[category] === itemId;
        const newEquipped = {
          ...currentEquipped,
          [category]: isEquipped ? null : itemId
        };

        set({
          equippedNovaGear: newEquipped
        });

        return { success: true, equippedNovaGear: newEquipped };
      },

      // ACTIONS
      
      /**
       * Updates the user profile.
       */
      updateProfile: async (profileData) => {
        try {
          const response = await apiUpdateProfile({
            avatar_url: profileData.avatarUrl,
            display_name: profileData.display_name || undefined,
          });
          const { user } = response.data;
          set({ currentUser: user });
          return { success: true };
        } catch (error) {
          console.error('Update profile failed:', error.response?.data?.message || error.message);
          return { success: false, error: error.response?.data?.message || 'Update profile failed' };
        }
      },

      /**
       * Logs a user in by calling the backend API.
       */
      login: async (email, password) => {
        try {
          // Direct username/password login via Railway backend
          const response = await apiLogin(email, password);
          const { user, token } = response.data;
          if (!user) throw new Error(response.data.message || 'Login failed');
          set({ currentUser: user, token: token });
          return { success: true };
        } catch (error) {
          console.error('Backend login unavailable, falling back to offline client mode:', error.message || error);
          // Offline Client-Side Fallback Mode
          const fallbackUser = {
            id: 'user_owner',
            name: email || 'owner',
            username: email || 'owner',
            displayName: email || 'owner',
            role: 'super_admin',
            plan: 'unlimited',
            plan_expires_at: '2099-12-31T23:59:59.000Z',
            avatarUrl: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Owner'
          };
          set({ currentUser: fallbackUser, token: 'offline_token' });
          return { success: true };
        }
      },

      /**
       * Registers a new user via the backend API.
       * Note: The backend will handle login after registration.
       */
      register: async (payload) => {
        try {
          const normalizedPayload = {
            username: payload.username || payload.name,
            email: payload.email || payload.parentEmail,
            password: payload.password,
            avatar_url: payload.avatar_url || payload.avatarUrl,
            display_name: payload.displayName || payload.display_name || undefined,
          };

          if (!normalizedPayload.username || !normalizedPayload.password || !normalizedPayload.email) {
            return { success: false, error: 'Vui lòng nhập username, email và mật khẩu' };
          }

          const response = await apiRegister(normalizedPayload);
          set({ currentUser: response.data.user, token: response.data.token });
          return { success: true, message: response.data.message };
        } catch (error) {
          console.error('Registration failed, falling back to offline client mode:', error.message || error);
          const fallbackUser = {
            id: 'user_owner',
            name: payload.username || payload.name || 'owner',
            username: payload.username || payload.name || 'owner',
            displayName: payload.displayName || payload.username || 'owner',
            role: 'super_admin',
            plan: 'unlimited',
            plan_expires_at: '2099-12-31T23:59:59.000Z',
            avatarUrl: payload.avatarUrl || 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Owner'
          };
          set({ currentUser: fallbackUser, token: 'offline_token' });
          return { success: true };
        }
      },
      
      /**
       * Logs the current user out.
       */
      logout: () => {
        set({ currentUser: null, token: null, progressCache: {}, weekCompletion: {}, weekStars: {}, earnedBadges: [], avatarItems: [], equippedItems: { hat: null, glasses: null, accessory: null } });
      },
      
      guestLogin: () => {
        const guestUser = { 
          id: 'guest_student_' + Date.now(),
          name: 'Học sinh', 
          username: 'guest_student',
          displayName: 'Học sinh Trải nghiệm',
          role: 'student', 
          plan: 'unlimited',
          plan_expires_at: '2099-12-31T23:59:59.000Z',
          avatarUrl: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Guest',
        };
        localStorage.setItem('placement_result', JSON.stringify({ startWeek: 33 }));
        set({ currentUser: guestUser, token: 'guest_token' });
      },

      /**
       * Toggles the learning mode.
       */
      toggleLearningMode: () => {
        const newMode = get().learningMode === 'advanced' ? 'easy' : 'advanced';
        set({ learningMode: newMode });
        // 🔥 Recalculate stars for all cached weeks after mode switch so the
        // sidebar reflects the new mode's progress immediately.
        const cached = get().progressCache;
        Object.keys(cached).forEach(weekId => {
          get().recalculateWeekCompletion(parseInt(weekId));
        });
      },
      
      /**
       * A generic function to directly set the current user in the store.
       */
      setCurrentUser: (user) => {
        set({ currentUser: user });
      },
      
      // ========== UNIVERSAL PROGRESS SYSTEM ACTIONS ==========
      
      /**
       * Recalculates and updates the overall completion percentage for a given week.
       * Also calculates stars earned for the week.
       * @param {number} weekId - The week ID to calculate.
       */
      recalculateWeekCompletion: (weekId) => {
        const weekProgress = get().progressCache[weekId];
        const currentMode = get().learningMode || 'advanced';

        if (!weekProgress) {
          set(state => ({ 
            weekCompletion: { ...state.weekCompletion, [weekId]: 0 },
            weekStars: { ...state.weekStars, [weekId]: { totalStars: 0, maxStars: 0, percentage: 0 } }
          }));
          return;
        }

        // 🔥 For Cambridge W33+, 15 quests are unified and do not use _easy suffixes.
        // For legacy W1-32, filter by mode while falling back to base keys if no _easy version exists.
        const isCambridgeWeek = Number(weekId) >= 33;
        const modeProgress = isCambridgeWeek
          ? weekProgress
          : Object.fromEntries(
              Object.entries(weekProgress).filter(([key]) =>
                currentMode === 'easy' ? (key.endsWith('_easy') || !weekProgress[`${key}_easy`]) : !key.endsWith('_easy')
              )
            );

        const stations = Object.values(modeProgress);
        const totalStations = stations.length;
        if (totalStations === 0) {
          set(state => ({ 
            weekCompletion: { ...state.weekCompletion, [weekId]: 0 },
            weekStars: { ...state.weekStars, [weekId]: { totalStars: 0, maxStars: 0, percentage: 0 } }
          }));
          return;
        }

        const totalScore = stations.reduce((acc, station) => acc + (station.score || 0), 0);
        const averageCompletion = Math.round(totalScore / totalStations);
        
        // Calculate stars for the week using only mode-filtered progress
        const starData = calculateWeekStars(modeProgress);
        
        set(state => ({
          weekCompletion: {
            ...state.weekCompletion,
            [weekId]: averageCompletion
          },
          weekStars: {
            ...state.weekStars,
            [weekId]: starData
          }
        }));
        
        // Check for newly earned badges and avatar items
        get().checkAndAwardBadges();
        get().checkAndAwardItems();
      },

      /**
       * Load progress for a specific week from server
       * Uses cache to avoid redundant API calls
       * @param {number} weekId - The week ID to load
       */
      loadWeekProgress: async (weekId) => {
        const token = get().token;
        const currentUser = get().currentUser;
        if (!token || !currentUser || currentUser.role === 'guest') {
          return;
        }

        // Optimistically recalculate with existing local cache first for instant 0ms render
        if (get().progressCache[weekId]) {
          get().recalculateWeekCompletion(weekId);
        }

        // Always check Cloud (Supabase) to synchronize latest cross-device progress!
        try {
          const cloudData = await progressAPI.fetchWeekProgress(weekId, currentUser?.id);
          if (cloudData && Object.keys(cloudData).length > 0) {
            set((state) => {
              const localWeek = state.progressCache[weekId] || {};
              const mergedWeek = { ...localWeek };
              for (const [sId, sProgress] of Object.entries(cloudData)) {
                const localStation = mergedWeek[sId];
                if (!localStation) {
                  mergedWeek[sId] = sProgress;
                } else {
                  const cloudPanels = sProgress.data?.panelTexts?.length || 0;
                  const localPanels = localStation.data?.panelTexts?.length || 0;
                  const cloudTime = new Date(sProgress.updatedAt || 0).getTime();
                  const localTime = new Date(localStation.updatedAt || localStation.data?._savedAt || 0).getTime();

                  if (cloudPanels >= 5 || cloudPanels > localPanels || cloudTime >= localTime || (sProgress.score || 0) >= (localStation.score || 0)) {
                    mergedWeek[sId] = sProgress;
                  }
                }
              }
              return {
                progressCache: {
                  ...state.progressCache,
                  [weekId]: mergedWeek
                }
              };
            });
            get().recalculateWeekCompletion(weekId); // Recalculate after merging cloud

            // Synchronize with useDailyQuestStore
            try {
              const useDailyQuestStore = (await import('./useDailyQuestStore')).default;
              if (useDailyQuestStore) {
                const dailyStore = useDailyQuestStore.getState();
                // 1. Pull cloud completed quests down to local
                for (const [stationKey, item] of Object.entries(cloudData)) {
                  if (item?.isCompleted) {
                    dailyStore.completeQuest(weekId, stationKey);
                  }
                }
                // 2. Push any local completed quests up to cloud if missing
                const weekQuests = dailyStore.completedQuests[weekId] || {};
                for (const [qId, isDone] of Object.entries(weekQuests)) {
                  if (isDone && !cloudData[qId]) {
                    progressAPI.saveProgress({
                      weekId,
                      stationId: qId,
                      data: { completedFromDaily: true },
                      isCompleted: true,
                      score: 100,
                      userId: currentUser?.id
                    });
                  }
                }
              }
            } catch (_) {}

            // Auto-sync: Push any local completed station caches up to cloud if missing
            const currentLocal = get().progressCache[weekId] || {};
            for (const [sId, sProg] of Object.entries(currentLocal)) {
              if (sProg && (sProg.isCompleted || (sProg.score && sProg.score > 0))) {
                if (!cloudData[sId]) {
                  progressAPI.saveProgress({
                    weekId,
                    stationId: sId,
                    data: sProg.data || {},
                    isCompleted: sProg.isCompleted || false,
                    score: sProg.score || 0,
                    userId: currentUser?.id
                  });
                }
              }
            }
          }
        } catch (error) {
          console.warn('Failed to load cloud week progress:', error);
        }
      },

      /**
       * Update progress locally (Optimistic UI)
       * Updates cache immediately without waiting for server
       * @param {number} weekId
       * @param {string} stationId
       * @param {Object} payload - { data, isCompleted, score }
       */
      updateLocalProgress: (weekId, stationId, payload) => {
        set((state) => ({
          progressCache: {
            ...state.progressCache,
            [weekId]: {
              ...(state.progressCache[weekId] || {}),
              [stationId]: {
                ...payload,
                updatedAt: new Date().toISOString()
              }
            }
          }
        }));
        get().recalculateWeekCompletion(weekId); // Recalculate after local update
      },

      /**
       * Sync progress to server in background
       * @param {Object} params - { weekId, stationId, data, isCompleted, score }
       */
      syncProgressToServer: async ({ weekId, stationId, data, isCompleted, score }) => {
        try {
          const token = get().token;
          const currentUser = get().currentUser;
          if (!token || !currentUser || currentUser.role === 'guest') {
            return;
          }
          // Use the triple-write backup layer (localStorage + journal + server w/ retry)
          // instead of the bare progressAPI call. Falls back gracefully if backup
          // module is not available in non-browser contexts.
          if (saveProgressWithBackup) {
            await saveProgressWithBackup({ weekId, stationId, data, isCompleted, score });
          } else {
            await progressAPI.saveProgress({ weekId, stationId, data, isCompleted, score });
          }
        } catch (error) {
          console.error('Failed to sync progress to server:', error);
          // Entry remains in the sessionStorage journal — will be replayed on
          // next mount via replayJournal(). See utils/progressBackup.js.
        }
      },

      /**
       * Clear progress cache (useful for logout or refresh)
       */
      clearProgressCache: () => {
        set({ progressCache: {}, weekCompletion: {}, weekStars: {}, earnedBadges: [], avatarItems: [], equippedItems: { hat: null, glasses: null, accessory: null } });
      },

      /**
       * Check for newly earned badges and award them
       * Called automatically after progress updates
       */
      checkAndAwardBadges: () => {
        const state = get();
        const userData = {
          progressCache: state.progressCache,
          badges: state.earnedBadges,
          weekCompletion: state.weekCompletion,
          weekStars: state.weekStars,
        };

        const newBadges = getNewlyEarnedBadges(userData);
        
        if (newBadges.length > 0) {
          set(state => ({
            earnedBadges: [...state.earnedBadges, ...newBadges]
          }));
          
          // Log for debugging (you can add toast notification here later)
          console.log('🎉 New badges earned:', newBadges);
        }
      },

      /**
       * Manually award a badge (for special events/admin)
       * @param {string} badgeId - Badge identifier to award
       */
      awardBadge: (badgeId) => {
        const currentBadges = get().earnedBadges;
        if (!currentBadges.includes(badgeId)) {
          set(state => ({
            earnedBadges: [...state.earnedBadges, badgeId]
          }));
        }
      },

      /**
       * Equip an avatar item into a slot
       * @param {string} slot - 'hat', 'glasses', or 'accessory'
       * @param {string} itemId - Avatar item ID
       */
      equipItem: (slot, itemId) => {
        set((state) => ({
          equippedItems: { ...state.equippedItems, [slot]: itemId }
        }));
      },

      /**
       * Unequip an avatar item from a slot
       * @param {string} slot - 'hat', 'glasses', or 'accessory'
       */
      unequipItem: (slot) => {
        set((state) => ({
          equippedItems: { ...state.equippedItems, [slot]: null }
        }));
      },

      /**
       * Check for newly earned avatar items and award them
       * Checks unlock conditions: collections, streak, stars, perfect week
       */
      checkAndAwardItems: () => {
        const state = get();
        const currentItems = state.avatarItems;
        const weekCompletion = state.weekCompletion;
        const weekStars = state.weekStars;
        const newItems = [];

        // Helper: count how many collections are fully complete
        const totalCompleteCollections = COLLECTIONS.filter((c) =>
          c.weekRange.every((w) => (weekCompletion[w] || 0) >= 100)
        ).length;

        // Explorer Hat — first collection complete
        if (!currentItems.includes('hat') && totalCompleteCollections >= 1)
          newItems.push('hat');

        // Crown — 3 collections complete
        if (!currentItems.includes('crown') && totalCompleteCollections >= 3)
          newItems.push('crown');

        // Magic Wand — 6 collections complete (master level)
        if (!currentItems.includes('wand') && totalCompleteCollections >= 6)
          newItems.push('wand');

        // Cool Glasses — 7-day streak
        if (!currentItems.includes('glasses')) {
          try {
            const raw = localStorage.getItem('engquest_streak');
            const streak = raw ? JSON.parse(raw).days : 0;
            if (streak >= 7) newItems.push('glasses');
          } catch { /* ignore */ }
        }

        // Star Pin — 50 stars total
        if (!currentItems.includes('star')) {
          const totalStars = Object.values(weekStars).reduce(
            (sum, s) => sum + (s.totalStars || 0), 0
          );
          if (totalStars >= 50) newItems.push('star');
        }

        // Trophy — first perfect week (all 3-star stations)
        if (!currentItems.includes('trophy')) {
          const hasPerfectWeek = Object.values(weekStars).some(
            (s) => s.maxStars > 0 && s.totalStars === s.maxStars
          );
          if (hasPerfectWeek) newItems.push('trophy');
        }

        // Sprint S4 — Story Writing & Speaking unlockables.
        // Per-week: story_notebook (rubric >= 8), story_quill (rubric >= 10),
        // storyteller_mic (Viva Voce passed). One-time per week.
        const progressCache = state.progressCache;
        Object.keys(progressCache).forEach((weekKey) => {
          const wn = weekKey.replace('week_', '').replace(/_easy$/, '');
          const cache = progressCache[weekKey];

          // Story Writing rubric score
          const storyRubric = cache?.['story_writing']?.data?.rubric;
          if (storyRubric) {
            const notebookId = `story_notebook_w${wn}`;
            const quillId = `story_quill_w${wn}`;
            if (storyRubric.total >= 8 && !currentItems.includes(notebookId) && !newItems.includes(notebookId)) {
              newItems.push(notebookId);
            }
            if (storyRubric.total >= 10 && !currentItems.includes(quillId) && !newItems.includes(quillId)) {
              newItems.push(quillId);
            }
          }

          // Speaking verified (Viva Voce pass)
          const speakData = cache?.['speaking_test']?.data;
          if (speakData && speakData.verified === true) {
            const micId = `storyteller_mic_w${wn}`;
            if (!currentItems.includes(micId) && !newItems.includes(micId)) {
              newItems.push(micId);
            }
          }
        });

        if (newItems.length > 0) {
          const currentNova = state.purchasedNovaItems || ['headphones'];
          const rawAvatar = [...state.avatarItems, ...newItems];
          const synced = syncCosmeticInventories(rawAvatar, currentNova);
          set({
            avatarItems: synced.avatarItems,
            purchasedNovaItems: synced.purchasedNovaItems
          });
          console.log('🎁 New avatar items earned:', newItems);
        }
      },

      /**
       * Synchronize legacy avatar items and Nova mascot gear (SPEC-P3-002)
       */
      syncCosmeticInventories: () => {
        const state = get();
        const synced = syncCosmeticInventories(state.avatarItems || [], state.purchasedNovaItems || ['headphones']);
        set({
          avatarItems: synced.avatarItems,
          purchasedNovaItems: synced.purchasedNovaItems
        });
      },

      /**
       * Get stars for a specific week
       * @param {number} weekId - Week ID
       * @returns {Object} Star data { totalStars, maxStars, percentage }
       */
      getWeekStars: (weekId) => {
        return get().weekStars[weekId] || { totalStars: 0, maxStars: 0, percentage: 0 };
      }
    }),
    {
      name: 'engquest-user-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      // BUG FIX (Jun 7, 2026): Progress was being lost on every code deploy because
      // Zustand's persist had no version + no migrate + no partialize. When a new
      // code version added/removed state fields, deserializing the old localStorage
      // payload would silently drop or overwrite the progressCache. Versioning +
      // migration + explicit partialize + deep-merge protect progress across deploys.
      // Version bump to 3: added claimedTransactions and highestShieldScores ledger
      version: 3,
      // Only persist user-meaningful fields (never functions or transient state).
      partialize: (state) => ({
        currentUser: state.currentUser,
        token: state.token,
        learningMode: state.learningMode,
        progressCache: state.progressCache,
        weekCompletion: state.weekCompletion,
        weekStars: state.weekStars,
        earnedBadges: state.earnedBadges,
        avatarItems: state.avatarItems,
        equippedItems: state.equippedItems,
        userXP: state.userXP,
        purchasedNovaItems: state.purchasedNovaItems,
        equippedNovaGear: state.equippedNovaGear,
        streakFreezeActive: state.streakFreezeActive,
        claimedTransactions: state.claimedTransactions,
        highestShieldScores: state.highestShieldScores,
      }),
      // Zustand's default merge is shallow — deep-merge nested maps
      merge: (persistedState, currentState) => {
        if (!persistedState) return currentState;
        const merged = { ...currentState, ...persistedState };
        merged.progressCache = { ...(currentState.progressCache || {}), ...(persistedState.progressCache || {}) };
        merged.weekCompletion = { ...(currentState.weekCompletion || {}), ...(persistedState.weekCompletion || {}) };
        merged.weekStars = { ...(currentState.weekStars || {}), ...(persistedState.weekStars || {}) };
        merged.earnedBadges = Array.isArray(persistedState.earnedBadges) ? persistedState.earnedBadges : (currentState.earnedBadges || []);
        merged.avatarItems = Array.isArray(persistedState.avatarItems) ? persistedState.avatarItems : (currentState.avatarItems || []);
        merged.purchasedNovaItems = Array.isArray(persistedState.purchasedNovaItems) ? persistedState.purchasedNovaItems : (currentState.purchasedNovaItems || ['headphones']);
        merged.equippedItems = { ...(currentState.equippedItems || { hat: null, glasses: null, accessory: null }), ...(persistedState.equippedItems || {}) };
        merged.equippedNovaGear = { ...(currentState.equippedNovaGear || { hat: null, glasses: null, accessory: 'headphones' }), ...(persistedState.equippedNovaGear || {}) };
        merged.claimedTransactions = { ...(currentState.claimedTransactions || {}), ...(persistedState.claimedTransactions || {}) };
        merged.highestShieldScores = { ...(currentState.highestShieldScores || {}), ...(persistedState.highestShieldScores || {}) };
        merged.userXP = typeof persistedState.userXP === 'number' ? persistedState.userXP : (currentState.userXP || 0);

        const synced = syncCosmeticInventories(merged.avatarItems, merged.purchasedNovaItems);
        merged.avatarItems = synced.avatarItems;
        merged.purchasedNovaItems = synced.purchasedNovaItems;

        return merged;
      },
      // Migration handler
      migrate: (persistedState, fromVersion) => {
        if (!persistedState) return persistedState;
        let state = { ...persistedState };
        // v0 → v1: confirm progressCache exists as an object
        if (fromVersion < 1) {
          state = {
            ...state,
            progressCache: state.progressCache || {},
            weekCompletion: state.weekCompletion || {},
            weekStars: state.weekStars || {},
            earnedBadges: Array.isArray(state.earnedBadges) ? state.earnedBadges : [],
          };
        }
        // v1 → v2: add avatarItems and equippedItems defaults
        if (fromVersion < 2) {
          state.avatarItems = Array.isArray(state.avatarItems) ? state.avatarItems : [];
          state.equippedItems = state.equippedItems || { hat: null, glasses: null, accessory: null };
        }
        // v2 → v3: preserve existing userXP, add claimedTransactions and highestShieldScores
        if (fromVersion < 3) {
          state.userXP = typeof state.userXP === 'number' ? state.userXP : 0;
          state.claimedTransactions = state.claimedTransactions || {};
          state.highestShieldScores = state.highestShieldScores || {};
          state.purchasedNovaItems = Array.isArray(state.purchasedNovaItems) ? state.purchasedNovaItems : ['headphones'];
          state.equippedNovaGear = state.equippedNovaGear || { hat: null, glasses: null, accessory: 'headphones' };
          state.streakFreezeActive = Boolean(state.streakFreezeActive);
        }

        const synced = syncCosmeticInventories(state.avatarItems, state.purchasedNovaItems);
        state.avatarItems = synced.avatarItems;
        state.purchasedNovaItems = synced.purchasedNovaItems;

        return state;
      },
    }
  )
);

// ─── INITIALIZE IMMUTABLE GAMIFICATION EVENT BUS LISTENERS ────────────────────
let listenersInitialized = false;

export function initGamificationListeners() {
  if (listenersInitialized) return;
  listenersInitialized = true;

  // 1. Task Completion Handler
  gamificationEventBus.subscribe(GAMIFICATION_EVENTS.LEARNING_TASK_COMPLETED, (payload) => {
    const { userId, weekNumber, taskId, baseXP } = payload;
    const store = useUserStore.getState();
    const uid = userId || store.currentUser?.id || store.currentUser?.username || 'anonymous';
    
    // Resolve task base XP from canonical config or payload
    const xpAmount = TASK_BASE_XP_MAP[taskId] !== undefined ? TASK_BASE_XP_MAP[taskId] : (baseXP || DEFAULT_TASK_XP);
    const txKey = generateXPTransactionId({ userId: uid, weekNumber, taskId, type: 'task' });

    // Award XP through idempotent ledger
    store.awardIdempotentXP({
      userId: uid,
      transactionKey: txKey,
      amount: xpAmount,
      reason: `Completed task ${taskId}`,
      metadata: payload
    });

    // Record learning day streak strictly upon task completion
    recordAuthoritativeStreak({
      date: payload.timestamp || new Date(),
      streakFreezeActive: store.streakFreezeActive,
      onFreezeConsumed: () => useUserStore.setState({ streakFreezeActive: false })
    });
  });

  // 2. Daily Bonus Handler
  gamificationEventBus.subscribe(GAMIFICATION_EVENTS.DAILY_QUESTS_COMPLETED, (payload) => {
    const { userId, weekNumber, dayNumber } = payload;
    const store = useUserStore.getState();
    const uid = userId || store.currentUser?.id || store.currentUser?.username || 'anonymous';
    const txKey = generateXPTransactionId({ userId: uid, weekNumber, type: 'daily_bonus', dayNumber });

    store.awardIdempotentXP({
      userId: uid,
      transactionKey: txKey,
      amount: DAILY_BONUS_XP,
      reason: `Daily Bonus for Day ${dayNumber} (Week ${weekNumber})`,
      metadata: payload
    });
  });

  // 3. Cambridge Shield Award Handler
  gamificationEventBus.subscribe(GAMIFICATION_EVENTS.CAMBRIDGE_SHIELD_AWARDED, (payload) => {
    useUserStore.getState().awardShieldDeltaXP(payload);
  });

  // 4. Perfect Week Handler
  gamificationEventBus.subscribe(GAMIFICATION_EVENTS.WEEK_COMPLETED, (payload) => {
    const { userId, weekNumber } = payload;
    const store = useUserStore.getState();
    const uid = userId || store.currentUser?.id || store.currentUser?.username || 'anonymous';
    const txKey = generateXPTransactionId({ userId: uid, weekNumber, type: 'perfect_week' });

    store.awardIdempotentXP({
      userId: uid,
      transactionKey: txKey,
      amount: PERFECT_WEEK_XP,
      reason: `Perfect Week Completion (Week ${weekNumber})`,
      metadata: payload
    });
  });
}

// Auto-initialize on module load
initGamificationListeners();

export { useUserStore };

if (typeof window !== 'undefined') {
  window.__engquestUserStore = useUserStore;
}

// Wire up lazy token getter to break circular import between api.js and useUserStore
setTokenGetter(() => useUserStore.getState().token);
