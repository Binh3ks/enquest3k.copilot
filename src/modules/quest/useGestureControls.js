import { useRef, useEffect, useCallback } from 'react';

/**
 * useGestureControls — High-performance touch gesture hook for mobile runner & arcade games.
 *
 * Supported gestures:
 * - Tap Left (left 33% / 45%)
 * - Tap Right (right 33% / 45%)
 * - Tap Center
 * - Double-Tap (jump / primary action)
 * - Swipe Down (slide)
 * - Swipe Up (jump boost)
 * - Swipe Left / Right
 *
 * Prevents mobile browser pull-to-refresh & pinch zoom during active gameplay.
 */
export default function useGestureControls({
  onTapLeft,
  onTapRight,
  onTapCenter,
  onDoubleTap,
  onSwipeDown,
  onSwipeUp,
  onSwipeLeft,
  onSwipeRight,
  tapZoneMode = 'tri-split', // 'tri-split' (33/34/33) or 'bi-split' (50/50)
  enabled = true,
}) {
  const containerRef = useRef(null);

  // Gesture state tracking
  const touchState = useRef({
    startX: 0,
    startY: 0,
    startTime: 0,
    lastTapTime: 0,
    lastTapX: 0,
    lastTapY: 0,
    tapTimeout: null,
    isSwipe: false,
  });

  // Keep latest callbacks in ref to avoid re-binding listeners
  const callbacksRef = useRef({
    onTapLeft,
    onTapRight,
    onTapCenter,
    onDoubleTap,
    onSwipeDown,
    onSwipeUp,
    onSwipeLeft,
    onSwipeRight,
  });

  useEffect(() => {
    callbacksRef.current = {
      onTapLeft,
      onTapRight,
      onTapCenter,
      onDoubleTap,
      onSwipeDown,
      onSwipeUp,
      onSwipeLeft,
      onSwipeRight,
    };
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !enabled) return;

    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      const state = touchState.current;

      state.startX = touch.clientX;
      state.startY = touch.clientY;
      state.startTime = Date.now();
      state.isSwipe = false;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length !== 1) return;
      // Prevent browser bounce / pull-to-refresh inside game canvas
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e) => {
      if (e.changedTouches.length !== 1) return;
      const touch = e.changedTouches[0];
      const state = touchState.current;
      const callbacks = callbacksRef.current;

      const deltaX = touch.clientX - state.startX;
      const deltaY = touch.clientY - state.startY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      const elapsed = Date.now() - state.startTime;

      // Swipes: distance > 40px in < 350ms
      const SWIPE_THRESHOLD = 40;
      if (elapsed < 350 && (absX > SWIPE_THRESHOLD || absY > SWIPE_THRESHOLD)) {
        state.isSwipe = true;
        if (state.tapTimeout) {
          clearTimeout(state.tapTimeout);
          state.tapTimeout = null;
        }

        if (absY > absX) {
          // Vertical swipe
          if (deltaY > SWIPE_THRESHOLD && callbacks.onSwipeDown) {
            callbacks.onSwipeDown();
          } else if (deltaY < -SWIPE_THRESHOLD && callbacks.onSwipeUp) {
            callbacks.onSwipeUp();
          }
        } else {
          // Horizontal swipe
          if (deltaX > SWIPE_THRESHOLD && callbacks.onSwipeRight) {
            callbacks.onSwipeRight();
          } else if (deltaX < -SWIPE_THRESHOLD && callbacks.onSwipeLeft) {
            callbacks.onSwipeLeft();
          }
        }
        return;
      }

      // Tap detection (minimal movement)
      if (absX < 25 && absY < 25) {
        const now = Date.now();
        const timeSinceLastTap = now - state.lastTapTime;
        const distFromLastTap = Math.hypot(touch.clientX - state.lastTapX, touch.clientY - state.lastTapY);

        // Double-Tap check: 2 taps within 320ms and within 45px radius
        if (timeSinceLastTap > 50 && timeSinceLastTap < 320 && distFromLastTap < 45) {
          if (state.tapTimeout) {
            clearTimeout(state.tapTimeout);
            state.tapTimeout = null;
          }
          state.lastTapTime = 0;
          if (callbacks.onDoubleTap) {
            callbacks.onDoubleTap();
          }
          return;
        }

        // Record tap coordinates & time
        state.lastTapTime = now;
        state.lastTapX = touch.clientX;
        state.lastTapY = touch.clientY;

        // Determine tap zone relative to element width
        const rect = el.getBoundingClientRect();
        const relativeX = touch.clientX - rect.left;
        const normX = Math.max(0, Math.min(1, relativeX / (rect.width || 1)));

        // Handle single tap (if doubleTap isn't registered or immediate response requested)
        const triggerSingleTap = () => {
          if (tapZoneMode === 'bi-split') {
            if (normX < 0.5) {
              callbacks.onTapLeft && callbacks.onTapLeft();
            } else {
              callbacks.onTapRight && callbacks.onTapRight();
            }
          } else {
            // Tri-split (33% Left / 34% Center / 33% Right)
            if (normX < 0.33) {
              callbacks.onTapLeft && callbacks.onTapLeft();
            } else if (normX > 0.67) {
              callbacks.onTapRight && callbacks.onTapRight();
            } else {
              if (callbacks.onTapCenter) {
                callbacks.onTapCenter();
              } else if (callbacks.onDoubleTap) {
                callbacks.onDoubleTap(); // Center tap acts as jump if no center handler
              }
            }
          }
        };

        // If onDoubleTap is registered, delay single tap slightly to allow double tap
        // Otherwise trigger immediately for 0ms input lag
        if (callbacks.onDoubleTap) {
          state.tapTimeout = setTimeout(() => {
            triggerSingleTap();
            state.tapTimeout = null;
          }, 180);
        } else {
          triggerSingleTap();
        }
      }
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
      if (touchState.current.tapTimeout) {
        clearTimeout(touchState.current.tapTimeout);
      }
    };
  }, [enabled, tapZoneMode]);

  return { gestureRef: containerRef };
}
