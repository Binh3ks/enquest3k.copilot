import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { setAuthToken, login as apiLogin, register as apiRegister, updateProfile as apiUpdateProfile } from '../services/api';

// This store manages user authentication, profile, and app-wide settings.
const useUserStore = create(
  persist(
    (set, get) => ({
      // STATE
      currentUser: null,
      token: null,
      learningMode: 'advanced',

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
          set({ currentUser: user, token: token });
          setAuthToken(token); // Set token for all future API requests
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
        set({ currentUser: null, token: null });
        setAuthToken(null); // Clear the token from API headers
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
      }
    }),
    {
      name: 'engquest-user-storage', // localStorage key
      storage: createJSONStorage(() => localStorage), // Use localStorage
      // Ensure token is set in API client on rehydration
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          setAuthToken(state.token);
        }
      },
      // Persist only non-sensitive, UI-related state.
      // The user object might be okay, but the token is handled on app start.
      partialize: (state) => ({
        currentUser: state.currentUser,
        token: state.token,
        learningMode: state.learningMode,
      }),
    }
  )
);

// Initial set if token already exists (for fast access before hydration completes)
const initialToken = useUserStore.getState().token;
if (initialToken) {
  setAuthToken(initialToken);
}

// Listen for changes in the token state and update the API header accordingly.
// This ensures that when the user logs in or out, the API client is always up-to-date.
useUserStore.subscribe(
  (state) => state.token,
  (token) => {
    setAuthToken(token);
  }
);

export { useUserStore };
