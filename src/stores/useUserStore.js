import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { register as apiRegister, updateProfile as apiUpdateProfile, progressAPI, setTokenGetter, login as apiLogin } from '../services/api';
// import { supabaseAuth } from '../services/supabase';
import { calculateWeekStars, getNewlyEarnedBadges } from '../utils/scoringSystem';
import { COLLECTIONS } from '../data/collectionConfig';
import { saveProgressWithBackup } from '../utils/progressBackup';

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
            name: email || 'owner',
            displayName: email || 'owner',
            role: 'student',
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
            name: payload.username || payload.name || 'owner',
            displayName: payload.displayName || payload.username || 'owner',
            role: 'student',
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
          name: 'owner', 
          displayName: 'owner',
          role: 'student', 
          avatarUrl: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Owner',
        };
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

        // 🔥 FIX: Filter to only count stations for the current learning mode.
        // Advanced stores keys like 'vocab_mastery'; easy stores 'vocab_mastery_easy'.
        // Without filtering, switching modes causes both variants to accumulate and
        // doubles maxStars, making the star display jump randomly.
        const modeProgress = Object.fromEntries(
          Object.entries(weekProgress).filter(([key]) =>
            currentMode === 'easy' ? key.endsWith('_easy') : !key.endsWith('_easy')
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

        // If already cached, skip API call
        if (get().progressCache[weekId]) {
          get().recalculateWeekCompletion(weekId); // Recalculate on load
          return;
        }

        try {
          const data = await progressAPI.fetchWeekProgress(weekId);
          set((state) => ({
            progressCache: {
              ...state.progressCache,
              [weekId]: data
            }
          }));
          get().recalculateWeekCompletion(weekId); // Recalculate after fetch
        } catch (error) {
          console.error('Failed to load week progress:', error);
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
          set((state) => ({
            avatarItems: [...state.avatarItems, ...newItems]
          }));
          console.log('🎁 New avatar items earned:', newItems);
        }
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
      version: 2,
      // Only persist user-meaningful fields (never functions or transient state).
      // If a future state field is added, explicitly opt it in here so a stale
      // localStorage payload cannot accidentally clobber it.
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
      }),
      // Zustand's default merge is shallow — that wipes nested progressCache[weekId]
      // when the persisted payload is missing a week. Deep-merge so old payloads
      // combine with new defaults instead of replacing them.
      merge: (persistedState, currentState) => {
        if (!persistedState) return currentState;
        const merged = { ...currentState, ...persistedState };
        // Deep-merge nested maps so missing keys are preserved from defaults
        merged.progressCache = { ...(currentState.progressCache || {}), ...(persistedState.progressCache || {}) };
        merged.weekCompletion = { ...(currentState.weekCompletion || {}), ...(persistedState.weekCompletion || {}) };
        merged.weekStars = { ...(currentState.weekStars || {}), ...(persistedState.weekStars || {}) };
        merged.earnedBadges = Array.isArray(persistedState.earnedBadges) ? persistedState.earnedBadges : (currentState.earnedBadges || []);
        merged.avatarItems = Array.isArray(persistedState.avatarItems) ? persistedState.avatarItems : (currentState.avatarItems || []);
        merged.equippedItems = { ...(currentState.equippedItems || { hat: null, glasses: null, accessory: null }), ...(persistedState.equippedItems || {}) };
        return merged;
      },
      // Migration handler — when persisted version differs from current, run
      // the chain of migrations.
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
        return state;
      },
    }
  )
);

export { useUserStore };

// Wire up lazy token getter to break circular import between api.js and useUserStore
setTokenGetter(() => useUserStore.getState().token);
