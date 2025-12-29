/**
 * TUTOR STORE (Zustand + Persist)
 * Single source of truth for AI Tutor state
 * Survives tab switches, does NOT reset
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTutorStore = create(
  persist(
    (set) => ({
      // UI state
      isOpen: false,
      activeTab: 'chat', // 'chat' | 'pronunciation' | 'story_mission' | 'quiz' | 'debate'
      
      // Session state
      sessionId: null,
      context: null,
      messages: [],
      
      // Mission state (Story Mission)
      currentMission: null,
      missionProgress: {
        turnsCompleted: 0,
        vocabUsed: [],
        scaffoldLevel: 1,
        userSentenceLengths: []
      },
      
      // Long-term memory (will be expanded in Phase 5)
      memory: {
        learnerProfile: {
          style: 'normal', // 'shy' | 'normal' | 'confident'
          avgSentenceLength: 0,
          preferredScaffoldLevel: 1
        },
        vocabMastery: {}, // { word: { mastery: 0-100, lastUsedWeek: number } }
        grammarProgress: {},
        learningHistory: {
          completedMissions: [],
          failedMissions: [],
          lastActiveWeek: 1
        }
      },
      
      // Actions
      setOpen: (isOpen) => set({ isOpen }),
      
      setActiveTab: (activeTab) => set({ activeTab }),
      
      setContext: (context) => {
        const sessionId = `${context.weekId}_${context.mode}_${Date.now()}`;
        set({ context, sessionId });
      },
      
      addMessage: (message) => set((state) => ({
        messages: [...state.messages, { ...message, timestamp: Date.now() }]
      })),
      
      clearMessages: () => set({ messages: [] }),
      
      startMission: (missionConfig) => set({
        currentMission: missionConfig,
        missionProgress: {
          turnsCompleted: 0,
          vocabUsed: [],
          scaffoldLevel: 1,
          userSentenceLengths: []
        },
        messages: []
      }),
      
      updateMissionProgress: (updates) => set((state) => ({
        missionProgress: { ...state.missionProgress, ...updates }
      })),
      
      completeMission: (summary) => set((state) => ({
        currentMission: null,
        memory: {
          ...state.memory,
          learningHistory: {
            ...state.memory.learningHistory,
            completedMissions: [
              ...state.memory.learningHistory.completedMissions,
              {
                missionId: state.currentMission?.id,
                weekId: state.context?.weekId,
                timestamp: Date.now(),
                summary
              }
            ]
          }
        }
      })),
      
      updateVocabMastery: (word, change) => set((state) => {
        const current = state.memory.vocabMastery[word] || { mastery: 0, lastUsedWeek: state.context?.weekId };
        const newMastery = Math.max(0, Math.min(100, current.mastery + change));
        
        return {
          memory: {
            ...state.memory,
            vocabMastery: {
              ...state.memory.vocabMastery,
              [word]: {
                mastery: newMastery,
                lastUsedWeek: state.context?.weekId
              }
            }
          }
        };
      }),
      
      updateLearnerStyle: (style) => set((state) => ({
        memory: {
          ...state.memory,
          learnerProfile: {
            ...state.memory.learnerProfile,
            style
          }
        }
      })),
      
      updateAvgSentenceLength: (length) => set((state) => {
        const current = state.memory.learnerProfile.avgSentenceLength || 0;
        const newAvg = current === 0 ? length : (current * 0.7 + length * 0.3); // Moving average
        
        return {
          memory: {
            ...state.memory,
            learnerProfile: {
              ...state.memory.learnerProfile,
              avgSentenceLength: newAvg
            }
          }
        };
      }),
      
      // Reset (for testing)
      reset: () => set({
        messages: [],
        currentMission: null,
        missionProgress: {
          turnsCompleted: 0,
          vocabUsed: [],
          scaffoldLevel: 1,
          userSentenceLengths: []
        }
      })
    }),
    {
      name: 'engquest-tutor-storage',
      partialize: (state) => ({
        // Only persist memory, not session state
        memory: state.memory
      })
    }
  )
);
