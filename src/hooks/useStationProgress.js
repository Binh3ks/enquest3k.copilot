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

import { useEffect, useCallback, useRef, useMemo } from 'react';
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
  
  // 🔥 For W33+ (Cambridge Flyers 15-task invariant), quests are unified without mode splitting
  const isCambridgeWeek = Number(weekId) >= 33;
  const storageKey = (isCambridgeWeek || mode === 'advanced') ? stationId : `${stationId}_${mode}`;

  // 1. Auto-load progress when component mounts
  useEffect(() => {
    if (weekId) {
      loadWeekProgress(weekId);
    }
  }, [weekId, loadWeekProgress]);

  // 2. Get current progress from cache using storage key with intelligent cross-mode fallback
  const stationState = useMemo(() => {
    const weekMap = progressCache[weekId] || {};
    // Check primary key first
    if (weekMap[storageKey] && (weekMap[storageKey].data || weekMap[storageKey].isCompleted || weekMap[storageKey].score)) {
      return weekMap[storageKey];
    }
    // Check base stationId
    if (weekMap[stationId] && (weekMap[stationId].data || weekMap[stationId].isCompleted || weekMap[stationId].score)) {
      return weekMap[stationId];
    }
    // Check easy variant
    const easyKey = `${stationId}_easy`;
    if (weekMap[easyKey] && (weekMap[easyKey].data || weekMap[easyKey].isCompleted || weekMap[easyKey].score)) {
      return weekMap[easyKey];
    }
    return weekMap[storageKey] || weekMap[stationId] || {};
  }, [progressCache, weekId, storageKey, stationId]);

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
  const pendingSaveRef = useRef(null); // Track latest pending save for flush-on-unmount

  const saveProgress = useCallback((partialData, completed = isCompleted, score = savedScore) => {
    if (!weekId || !storageKey) {
      console.warn('useStationProgress: weekId or stationId is missing');
      return;
    }

    // 🔥 SAFETY NET: Prevent accidental downgrade of a completed station.
    // Previously this returned early and blocked merging partial data when the
    // component attempted to save a lower completion/score than already stored.
    // That prevented useful fields (e.g., `frameInputs`, `script`) from being
    // persisted when a user re-opens a completed station and modifies inputs.
    //
    // New behavior: if the station is already completed and the new `completed`
    // flag would be false (or score would be lower), do NOT overwrite the
    // completed/score values, but still merge and persist any `partialData`.
    if (isCompleted && !completed && score <= savedScore) {
      const mergedData = {
        ...savedData,
        ...partialData,
        _savedAt: new Date().toISOString()
      };

      // Track for flush-on-unmount but preserve completed/score
      pendingSaveRef.current = { weekId, storageKey, data: mergedData, isCompleted: isCompleted, score: savedScore };

      // Optimistically update UI with merged data but keep completed true
      updateLocalProgress(weekId, storageKey, {
        data: mergedData,
        isCompleted: isCompleted,
        score: savedScore
      });

      // Recalculate week completion and sync to server (debounced)
      debouncedRecalcRef.current(weekId);
      debouncedSyncRef.current(weekId, storageKey, mergedData, isCompleted, savedScore);
      return;
    }

    // Simple data structure - just merge with existing
    const newData = { 
      ...savedData, 
      ...partialData,
      _savedAt: new Date().toISOString()
    };

    // Track for flush-on-unmount
    pendingSaveRef.current = { weekId, storageKey, data: newData, isCompleted: completed, score };

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

  // Flush pending save immediately on unmount (prevents loss when user switches tabs quickly)
  useEffect(() => {
    return () => {
      if (pendingSaveRef.current) {
        const { weekId: wId, storageKey: sId, data, isCompleted: completed, score } = pendingSaveRef.current;
        syncProgressToServer({ weekId: wId, stationId: sId, data, isCompleted: completed, score });
        pendingSaveRef.current = null;
      }
    };
  // Only run on unmount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
