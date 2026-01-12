/**
 * Universal Progress System - God Hook
 * 
 * This hook manages progress for ALL stations in EngQuest3k.
 * It provides automatic loading, optimistic UI updates, and debounced syncing.
 * 
 * Features:
 * - Auto-loads progress when component mounts
 * - Optimistic UI updates (instant feedback)
 * - Debounced server sync (prevents spam)
 * - State restoration from JSONB data
 * - Simple API: { savedData, isCompleted, saveProgress, markComplete }
 * 
 * @example
 * // In any station component:
 * const { savedData, isCompleted, saveProgress, markComplete } = 
 *   useStationProgress(weekId, 'daily_watch');
 * 
 * // Save partial data (e.g., video timestamp)
 * saveProgress({ timestamp: 45.5, watchedPercent: 75 });
 * 
 * // Mark as complete
 * markComplete(100);
 */

import { useEffect, useCallback, useRef } from 'react';
import { useUserStore } from '../stores/useUserStore';

// Debounce utility (inline to avoid lodash dependency)
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Main hook for station progress management
 * @param {number} weekId - The week ID (1-156)
 * @param {string} stationId - Station identifier (see MASTER ARTIFACT for list)
 * @param {string} learningMode - 'easy' or 'advanced' (optional, auto-detected from store)
 * @returns {Object} { savedData, isCompleted, savedScore, saveProgress, markComplete }
 */
export const useStationProgress = (weekId, stationId, learningMode = null) => {
  const {
    progressCache,
    loadWeekProgress,
    updateLocalProgress,
    syncProgressToServer,
    recalculateWeekCompletion,
    learningMode: storeLearningMode
  } = useUserStore();

  // Use provided mode or get from store
  const mode = learningMode || storeLearningMode || 'advanced';
  
  // 🔥 Create a simple mode-aware key for backend storage
  // For 'advanced' mode, use original key for backward compatibility
  const storageKey = mode === 'advanced' ? stationId : `${stationId}_${mode}`;

  // 1. Auto-load progress when component mounts
  useEffect(() => {
    if (weekId) {
      loadWeekProgress(weekId);
    }
  }, [weekId, loadWeekProgress]);

  // 2. Get current progress from cache using storage key
  const stationState = progressCache[weekId]?.[storageKey] || {};
  const savedData = stationState.data || {};
  const isCompleted = stationState.isCompleted || false;
  const savedScore = stationState.score || 0;

  // 3. Create debounced sync function (1.5 second delay)
  const debouncedSyncRef = useRef(null);
  const debouncedRecalcRef = useRef(null);
  
  if (!debouncedSyncRef.current) {
    debouncedSyncRef.current = debounce((wId, sId, data, completed, score) => {
      syncProgressToServer({ 
        weekId: wId, 
        stationId: sId,
        data, 
        isCompleted: completed, 
        score 
      });
    }, 1500);
  }

  if (!debouncedRecalcRef.current) {
    debouncedRecalcRef.current = debounce((wId) => {
      recalculateWeekCompletion(wId);
    }, 2000);
  }

  // 4. Main save function
  const saveProgress = useCallback((partialData, completed = isCompleted, score = savedScore) => {
    if (!weekId || !storageKey) {
      console.warn('useStationProgress: weekId or stationId is missing');
      return;
    }

    // Simple data structure - just merge with existing
    const newData = { 
      ...savedData, 
      ...partialData,
      _savedAt: new Date().toISOString()
    };

    // A. Update UI immediately (optimistic update)
    updateLocalProgress(weekId, storageKey, {
      data: newData,
      isCompleted: completed,
      score
    });
    
    // B. Recalculate the overall week completion
    debouncedRecalcRef.current(weekId);

    // C. Queue server sync (debounced) - use storageKey as stationId
    debouncedSyncRef.current(weekId, storageKey, newData, completed, score);
  }, [weekId, storageKey, savedData, isCompleted, savedScore, updateLocalProgress]);

  // 5. Quick complete function
  const markComplete = useCallback((finalScore = 100) => {
    saveProgress({}, true, finalScore);
  }, [saveProgress]);

  // 6. Return API
  return {
    savedData,
    isCompleted,
    savedScore,
    saveProgress,
    markComplete,
    mode
  };
};

/**
 * Hook variant for stations that only need completion tracking (no complex state)
 * Simpler API for basic stations
 */
export const useSimpleProgress = (weekId, stationId) => {
  const { isCompleted, savedScore, markComplete } = useStationProgress(weekId, stationId);
  
  return {
    isCompleted,
    savedScore,
    markComplete
  };
};

/**
 * Hook to get progress for entire week (for dashboards/maps)
 * @param {number} weekId
 * @returns {Object} { progressMap, isLoading, loadProgress }
 */
export const useWeekProgress = (weekId) => {
  const { progressCache, loadWeekProgress } = useUserStore();
  
  useEffect(() => {
    if (weekId) {
      loadWeekProgress(weekId);
    }
  }, [weekId, loadWeekProgress]);

  const progressMap = progressCache[weekId] || {};
  const isLoading = !progressCache[weekId];

  return {
    progressMap,      // Object: { stationId: { data, isCompleted, score } }
    isLoading,        // Boolean: True if still loading
    loadProgress: () => loadWeekProgress(weekId)  // Function: Manual refresh
  };
};

export default useStationProgress;
