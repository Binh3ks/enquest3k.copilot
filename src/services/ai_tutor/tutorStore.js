/**
 * Tutor Store - Global State Management for AI Tutor Widget
 * 
 * Manages:
 * - Widget visibility and position
 * - Active tab selection
 * - Chat messages per tab
 * - Audio playback state
 * - User preferences
 * - Learner profile & behavior tracking (NEW)
 * 
 * Persistent across page navigation
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createTurnBehavior, updateLearnerProfile } from './learnerProfiler.js';
import { 
  initializeVocabMastery, 
  detectVocabUsage, 
  detectAISuggestions,
  updateVocabMastery,
  calculateOverallProgress,
  generateVocabFocusPrompt
} from './vocabMasteryTracker.js';

// 🔥 STORAGE VERSION - Increment to auto-clear old data
const STORAGE_VERSION = '2.2.0'; // Upgraded prompt: Natural conversation + emoji-free responses

// 🔥 Auto-migration: Clear old storage if version mismatch
const clearOldStorage = () => {
  try {
    const stored = localStorage.getItem('engquest-tutor-storage');
    if (stored) {
      const data = JSON.parse(stored);
      const storedVersion = data.state?.storageVersion;
      
      if (!storedVersion || storedVersion !== STORAGE_VERSION) {
        console.log('🗑️ Clearing old storage (version mismatch):', storedVersion, '→', STORAGE_VERSION);
        localStorage.removeItem('engquest-tutor-storage');
        return true;
      }
    }
  } catch (error) {
    console.error('❌ Storage migration error:', error);
    localStorage.removeItem('engquest-tutor-storage');
    return true;
  }
  return false;
};

// Run migration before creating store
clearOldStorage();

const useTutorStore = create(
  persist(
    (set, get) => ({
      // ============================================
      // VERSION TRACKING
      // ============================================
      
      storageVersion: STORAGE_VERSION, // Track storage version for auto-migration
      
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
      
      // Force clear old settings to ensure UI updates apply
      localStorage.removeItem('tutor-store');
      
      widgetSize: 'large', // 'normal' | 'large' - Default to large for better UX
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
      // LEARNER PROFILE (Step 3: Learner Style Detection)
      // ============================================
      
      learnerProfile: {
        style: 'normal', // 'shy' | 'normal' | 'confident'
        confidence: 0,
        behaviorHistory: [],
        analysis: {},
        lastUpdated: null
      },
      
      scaffoldClickCount: 0, // Track hint button clicks
      strugglingTurns: 0, // Consecutive short answers
      
      // ============================================
      // VOCAB MASTERY TRACKING (Step 4)
      // ============================================
      
      vocabMastery: {}, // { word: { score, uses, lastUsed, suggested, avoidances } }
      currentWeekVocab: [], // Target vocab for current week
      lastAISuggestions: [], // Track what AI suggested in last turn
      
      /**
       * Initialize vocab mastery for a week
       * @param {Array<string>} targetVocab - Week's target vocabulary
       */
      initVocabMastery: (targetVocab) => set({
        vocabMastery: initializeVocabMastery(targetVocab),
        currentWeekVocab: targetVocab
      }),
      
      /**
       * Track vocab usage after user input
       * @param {string} userInput - Student's message
       * @param {Object} aiResponse - AI's previous response (for suggestion tracking)
       */
      trackVocabUsage: (userInput, aiResponse = null) => set((state) => {
        // Detect which vocab words student used
        const usedWords = detectVocabUsage(userInput, state.currentWeekVocab);
        
        // Check if student avoided previously suggested words
        const suggestedWords = state.lastAISuggestions;
        
        // Update mastery scores
        const updatedMastery = updateVocabMastery(
          state.vocabMastery,
          usedWords,
          suggestedWords
        );
        
        // Detect new suggestions from AI response
        const newSuggestions = aiResponse 
          ? detectAISuggestions(aiResponse, state.currentWeekVocab)
          : [];
        
        return {
          vocabMastery: updatedMastery,
          lastAISuggestions: newSuggestions
        };
      }),
      
      /**
       * Get overall vocab mastery progress (0-100)
       */
      getVocabProgress: () => {
        const state = get();
        return calculateOverallProgress(state.vocabMastery);
      },
      
      /**
       * Get adaptive vocab focus prompt for AI
       */
      getVocabFocusPrompt: () => {
        const state = get();
        return generateVocabFocusPrompt(state.vocabMastery);
      },
      
      /**
       * Reset vocab mastery for new week
       */
      resetVocabMastery: () => set({
        vocabMastery: {},
        currentWeekVocab: [],
        lastAISuggestions: []
      }),
      
      /**
       * Record a user turn for behavior tracking
       * @param {string} userInput - Student's input text
       * @param {boolean} usedScaffold - Whether student clicked hints
       */
      recordTurn: (userInput, usedScaffold = false) => set((state) => {
        const turnNumber = state.totalInteractions + 1;
        const newTurn = createTurnBehavior(turnNumber, userInput, usedScaffold);
        
        // Update learner profile with new turn
        const updatedProfile = updateLearnerProfile(state.learnerProfile, newTurn);
        
        // Track struggling (consecutive short answers)
        const wordCount = newTurn.wordCount;
        const isStruggling = wordCount <= 3 && !usedScaffold;
        const strugglingTurns = isStruggling ? state.strugglingTurns + 1 : 0;
        
        // Track scaffold clicks
        const scaffoldClickCount = usedScaffold 
          ? state.scaffoldClickCount + 1 
          : state.scaffoldClickCount;
        
        return {
          learnerProfile: updatedProfile,
          strugglingTurns,
          scaffoldClickCount,
          totalInteractions: turnNumber
        };
      }),
      
      /**
       * Manually set learner style (for testing/override)
       */
      setLearnerStyle: (style) => set((state) => ({
        learnerProfile: {
          ...state.learnerProfile,
          style,
          lastUpdated: Date.now()
        }
      })),
      
      /**
       * Reset learner profile
       */
      resetLearnerProfile: () => set({
        learnerProfile: {
          style: 'normal',
          confidence: 0,
          behaviorHistory: [],
          analysis: {},
          lastUpdated: null
        },
        scaffoldClickCount: 0,
        strugglingTurns: 0
      }),
      
      /**
       * Get current learner style
       */
      getLearnerStyle: () => {
        const { learnerProfile } = get();
        return learnerProfile.style || 'normal';
      },
      
      /**
       * Get struggling turn count
       */
      getStrugglingTurns: () => {
        const { strugglingTurns } = get();
        return strugglingTurns;
      },
      
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
        storageVersion: state.storageVersion, // 🔥 NEW: Version tracking
        activeTab: state.activeTab,
        messages: state.messages,
        autoPlayEnabled: state.autoPlayEnabled,
        widgetSize: state.widgetSize,
        theme: state.theme,
        showHints: state.showHints,
        widgetPosition: state.widgetPosition,
        learnerProfile: state.learnerProfile, // NEW: Persist learner profile
        scaffoldClickCount: state.scaffoldClickCount,
        strugglingTurns: state.strugglingTurns,
        vocabMastery: state.vocabMastery, // NEW: Persist vocab mastery
        currentWeekVocab: state.currentWeekVocab,
        lastAISuggestions: state.lastAISuggestions
      })
    }
  )
);

export default useTutorStore;
