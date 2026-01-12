import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { login as apiLogin, register as apiRegister, updateProfile as apiUpdateProfile, progressAPI } from '../services/api';

// This store manages user authentication, profile, and app-wide settings.
const useUserStore = create(
  persist(
    (set, get) => ({
      // STATE
      currentUser: null,
      token: null,
      learningMode: 'advanced',
      
      // UNIVERSAL PROGRESS SYSTEM STATE
      progressCache: {}, // Structure: { weekId: { stationId: { data, isCompleted, score } } }
      weekCompletion: {}, // Structure: { weekId: percentage }

      // ACTIONS
      
      /**
       * Updates the user profile.
       */
      updateProfile: async (profileData) => {
        try {
          const response = await apiUpdateProfile({
            username: profileData.name, // Mapping UI 'name' to API 'username'
            avatar_url: profileData.avatarUrl, // Mapping UI 'avatarUrl' to API 'avatar_url'
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
      login: async (username, password) => {
        try {
          const response = await apiLogin(username, password);
          const { user, token } = response.data;
          // The interceptor in api.js will handle the token automatically
          set({ currentUser: user, token: token });
          return { success: true };
        } catch (error) {
          console.error('Login failed:', error.response?.data?.message || error.message);
          return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
      },

      /**
       * Registers a new user via the backend API.
       * Note: The backend will handle login after registration.
       */
      register: async (payload) => {
        try {
          // We only need to send the registration data.
          // The backend should not automatically log in the user upon registration.
          // The user should be prompted to log in after successful registration.
          const response = await apiRegister(payload);
          return { success: true, message: response.data.message };
        } catch (error) {
          console.error('Registration failed:', error.response?.data?.message || error.message);
          return { success: false, error: error.response?.data?.message || 'Registration failed' };
        }
      },
      
      /**
       * Logs the current user out.
       */
      logout: () => {
        // Clear all user-related state. The interceptor will automatically stop sending tokens.
        set({ currentUser: null, token: null, progressCache: {}, weekCompletion: {} });
      },
      
      // This is now a placeholder, as the backend does not support guest login.
      // A proper implementation would require backend changes.
      guestLogin: () => {
        const guestUser = { 
          name: 'Guest', 
          role: 'guest', 
          avatarUrl: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Guest',
        };
        set({ currentUser: guestUser, token: null });
      },

      /**
       * Toggles the learning mode.
       */
      toggleLearningMode: () => {
        const newMode = get().learningMode === 'advanced' ? 'easy' : 'advanced';
        set({ learningMode: newMode });
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
       * @param {number} weekId - The week ID to calculate.
       */
      recalculateWeekCompletion: (weekId) => {
        const weekProgress = get().progressCache[weekId];
        if (!weekProgress) {
          set(state => ({ weekCompletion: { ...state.weekCompletion, [weekId]: 0 } }));
          return;
        }
        
        const stations = Object.values(weekProgress);
        const totalStations = stations.length;
        if (totalStations === 0) {
          set(state => ({ weekCompletion: { ...state.weekCompletion, [weekId]: 0 } }));
          return;
        }

        const totalScore = stations.reduce((acc, station) => acc + (station.score || 0), 0);
        const averageCompletion = Math.round(totalScore / totalStations);
        
        set(state => ({
          weekCompletion: {
            ...state.weekCompletion,
            [weekId]: averageCompletion
          }
        }));
      },

      /**
       * Load progress for a specific week from server
       * Uses cache to avoid redundant API calls
       * @param {number} weekId - The week ID to load
       */
      loadWeekProgress: async (weekId) => {
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
          await progressAPI.saveProgress({ weekId, stationId, data, isCompleted, score });
        } catch (error) {
          console.error('Failed to sync progress to server:', error);
          // TODO: Implement retry logic or error recovery
        }
      },

      /**
       * Clear progress cache (useful for logout or refresh)
       */
      clearProgressCache: () => {
        set({ progressCache: {}, weekCompletion: {} });
      }
    }),
    {
      name: 'engquest-user-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useUserStore };
