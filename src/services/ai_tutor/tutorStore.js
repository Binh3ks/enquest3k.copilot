/**
 * Tutor Store - Global State Management for AI Tutor Widget
 * 
 * Manages:
 * - Widget visibility and position
 * - Active tab selection
 * - Chat messages per tab
 * - Audio playback state
 * - User preferences
 * 
 * Persistent across page navigation
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useTutorStore = create(
  persist(
    (set, get) => ({
      // ============================================
      // WIDGET STATE
      // ============================================
      
      isWidgetOpen: false,
      widgetPosition: { bottom: 20, right: 20 }, // Floating button position
      
      /**
       * Toggle widget open/closed
       */
      toggleWidget: () => set((state) => ({ 
        isWidgetOpen: !state.isWidgetOpen 
      })),
      
      /**
       * Set widget open state
       */
      setWidgetOpen: (isOpen) => set({ isWidgetOpen: isOpen }),
      
      /**
       * Update widget position
       */
      setWidgetPosition: (position) => set({ widgetPosition: position }),
      
      // ============================================
      // TAB STATE
      // ============================================
      
      activeTab: 'story', // 'story' | 'freetalk' | 'pronunciation' | 'quiz' | 'debate'
      
      /**
       * Set active tab
       */
      setActiveTab: (tabId) => set({ activeTab: tabId }),
      
      // ============================================
      // MESSAGES STATE (Per Tab)
      // ============================================
      
      messages: {
        story: [],
        freetalk: [],
        pronunciation: [],
        quiz: [],
        debate: []
      },
      
      /**
       * Add message to current tab
       */
      addMessage: (tabId, message) => set((state) => ({
        messages: {
          ...state.messages,
          [tabId]: [...state.messages[tabId], {
            ...message,
            id: Date.now(),
            timestamp: Date.now()
          }]
        }
      })),
      
      /**
       * Clear messages for a specific tab
       */
      clearMessages: (tabId) => set((state) => ({
        messages: {
          ...state.messages,
          [tabId]: []
        }
      })),
      
      /**
       * Clear all messages
       */
      clearAllMessages: () => set({
        messages: {
          story: [],
          freetalk: [],
          pronunciation: [],
          quiz: [],
          debate: []
        }
      }),
      
      /**
       * Get messages for current active tab
       */
      getActiveMessages: () => {
        const { activeTab, messages } = get();
        return messages[activeTab] || [];
      },
      
      // ============================================
      // AUDIO STATE
      // ============================================
      
      currentAudioUrl: null,
      isAudioPlaying: false,
      autoPlayEnabled: true,
      
      /**
       * Set current audio URL
       */
      setCurrentAudioUrl: (url) => set({ currentAudioUrl: url }),
      
      /**
       * Set audio playing state
       */
      setAudioPlaying: (isPlaying) => set({ isAudioPlaying: isPlaying }),
      
      /**
       * Toggle auto-play
       */
      toggleAutoPlay: () => set((state) => ({ 
        autoPlayEnabled: !state.autoPlayEnabled 
      })),
      
      /**
       * Set auto-play enabled
       */
      setAutoPlayEnabled: (enabled) => set({ autoPlayEnabled: enabled }),
      
      // ============================================
      // UI PREFERENCES
      // ============================================
      
      widgetSize: 'medium', // 'small' | 'medium' | 'large'
      theme: 'light', // 'light' | 'dark'
      showHints: true,
      showPedagogyNotes: false, // Dev mode
      
      /**
       * Set widget size
       */
      setWidgetSize: (size) => set({ widgetSize: size }),
      
      /**
       * Set theme
       */
      setTheme: (theme) => set({ theme }),
      
      /**
       * Toggle hints visibility
       */
      toggleHints: () => set((state) => ({ 
        showHints: !state.showHints 
      })),
      
      /**
       * Toggle pedagogy notes (dev mode)
       */
      togglePedagogyNotes: () => set((state) => ({ 
        showPedagogyNotes: !state.showPedagogyNotes 
      })),
      
      // ============================================
      // LOADING & ERROR STATE
      // ============================================
      
      isLoading: false,
      error: null,
      
      /**
       * Set loading state
       */
      setLoading: (isLoading) => set({ isLoading }),
      
      /**
       * Set error
       */
      setError: (error) => set({ error }),
      
      /**
       * Clear error
       */
      clearError: () => set({ error: null }),
      
      // ============================================
      // SESSION STATE
      // ============================================
      
      sessionStartTime: null,
      totalInteractions: 0,
      
      /**
       * Start new session
       */
      startSession: () => set({ 
        sessionStartTime: Date.now(),
        totalInteractions: 0
      }),
      
      /**
       * Increment interaction count
       */
      incrementInteractions: () => set((state) => ({ 
        totalInteractions: state.totalInteractions + 1 
      })),
      
      /**
       * Get session duration in seconds
       */
      getSessionDuration: () => {
        const { sessionStartTime } = get();
        if (!sessionStartTime) return 0;
        return Math.floor((Date.now() - sessionStartTime) / 1000);
      },
      
      // ============================================
      // MISSION STATE (Story Tab)
      // ============================================
      
      missionProgress: {
        story: {
          status: 'not_started', // 'not_started' | 'in_progress' | 'completed'
          vocabUsed: [],
          turnCount: 0
        }
      },
      
      /**
       * Update mission progress
       */
      updateMissionProgress: (data) => set((state) => ({
        missionProgress: {
          ...state.missionProgress,
          story: {
            ...state.missionProgress.story,
            ...data
          }
        }
      })),
      
      /**
       * Reset mission
       */
      resetMission: () => set({
        missionProgress: {
          story: {
            status: 'not_started',
            vocabUsed: [],
            turnCount: 0
          }
        }
      }),
      
      // ============================================
      // UTILITY FUNCTIONS
      // ============================================
      
      /**
       * Reset entire store to defaults
       */
      reset: () => set({
        isWidgetOpen: false,
        activeTab: 'story',
        messages: {
          story: [],
          freetalk: [],
          pronunciation: [],
          quiz: [],
          debate: []
        },
        currentAudioUrl: null,
        isAudioPlaying: false,
        isLoading: false,
        error: null,
        sessionStartTime: null,
        totalInteractions: 0,
        missionProgress: {
          story: {
            status: 'not_started',
            vocabUsed: [],
            turnCount: 0
          }
        }
      }),
      
      /**
       * Export current state for debugging
       */
      exportState: () => {
        const state = get();
        return {
          activeTab: state.activeTab,
          messageCount: Object.values(state.messages).reduce((sum, msgs) => sum + msgs.length, 0),
          totalInteractions: state.totalInteractions,
          sessionDuration: state.getSessionDuration(),
          preferences: {
            autoPlayEnabled: state.autoPlayEnabled,
            widgetSize: state.widgetSize,
            theme: state.theme,
            showHints: state.showHints
          }
        };
      }
    }),
    {
      name: 'engquest-tutor-storage', // LocalStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist these fields
        activeTab: state.activeTab,
        messages: state.messages,
        autoPlayEnabled: state.autoPlayEnabled,
        widgetSize: state.widgetSize,
        theme: state.theme,
        showHints: state.showHints,
        widgetPosition: state.widgetPosition
      })
    }
  )
);

export default useTutorStore;
