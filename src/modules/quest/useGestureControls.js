import { useRef, useEffect } from 'react';

/**
 * useGestureControls — High-performance touch gesture & continuous movement hook for mobile games.
 *
 * Supported controls:
 * - Hold Left (left 45%): Continuous running left from the instant of touchstart until touchend.
 * - Hold Right (right 45%): Continuous running right from the instant of touchstart until touchend.
 * - Touch dragging: Moving finger across screen smoothly switches running direction.
 * - Swipe Up / Tap Center / Double-Tap: Immediate Jump / Primary Action.
 * - Swipe Down: Slide / Crouch.
 * - Non-passive touchmove prevention: Completely eliminates mobile scroll & pull-to-refresh.
 */
export default function useGestureControls({
  onMoveLeftStart,
  onMoveLeftEnd,
  onMoveRightStart,
  onMoveRightEnd,
  onTapLeft,
  onTapRight,
  onTapCenter,
  onDoubleTap,
  onSwipeDown,
  onSwipeUp,
  onSwipeLeft,
  onSwipeRight,
  tapZoneMode = 'tri-split',
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
    activeSide: null, // 'left' | 'right' | 'center'
    isSwipe: false,
    intervalId: null,
  });

  const callbacksRef = useRef({
    onMoveLeftStart,
    onMoveLeftEnd,
    onMoveRightStart,
    onMoveRightEnd,
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
      onMoveLeftStart,
      onMoveLeftEnd,
      onMoveRightStart,
      onMoveRightEnd,
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

    const stopContinuousMovement = () => {
      const state = touchState.current;
      const c = callbacksRef.current;
      if (state.intervalId) {
        clearInterval(state.intervalId);
        state.intervalId = null;
      }
      if (state.activeSide === 'left') {
        if (c.onMoveLeftEnd) c.onMoveLeftEnd();
      } else if (state.activeSide === 'right') {
        if (c.onMoveRightEnd) c.onMoveRightEnd();
      }
      state.activeSide = null;
    };

    const startMovement = (side) => {
      const state = touchState.current;
      const c = callbacksRef.current;
      if (state.activeSide === side) return;

      stopContinuousMovement();
      state.activeSide = side;

      if (side === 'left') {
        if (c.onMoveLeftStart) {
          c.onMoveLeftStart();
        } else if (c.onTapLeft) {
          c.onTapLeft();
          // Fallback interval for games that only provide onTapLeft
          state.intervalId = setInterval(() => {
            if (callbacksRef.current.onTapLeft) callbacksRef.current.onTapLeft();
          }, 100);
        }
      } else if (side === 'right') {
        if (c.onMoveRightStart) {
          c.onMoveRightStart();
        } else if (c.onTapRight) {
          c.onTapRight();
          state.intervalId = setInterval(() => {
            if (callbacksRef.current.onTapRight) callbacksRef.current.onTapRight();
          }, 100);
        }
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const state = touchState.current;

      state.startX = touch.clientX;
      state.startY = touch.clientY;
      state.startTime = Date.now();
      state.isSwipe = false;

      const rect = el.getBoundingClientRect();
      const relativeX = touch.clientX - rect.left;
      const normX = Math.max(0, Math.min(1, relativeX / (rect.width || 1)));

      // If tapping left or right 42%, initiate continuous movement IMMEDIATELY (0ms delay)
      if (normX < 0.42) {
        startMovement('left');
      } else if (normX > 0.58) {
        startMovement('right');
      } else {
        state.activeSide = 'center';
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 0) return;
      // Completely prevent browser scrolling or pull-to-refresh
      if (e.cancelable) {
        e.preventDefault();
      }

      const touch = e.touches[0];
      const state = touchState.current;
      const deltaX = touch.clientX - state.startX;
      const deltaY = touch.clientY - state.startY;

      // Check if user is swiping vertically (e.g. swipe up to jump while running)
      if (deltaY < -40 && !state.isSwipe) {
        state.isSwipe = true;
        const c = callbacksRef.current;
        if (c.onSwipeUp) c.onSwipeUp();
        else if (c.onDoubleTap) c.onDoubleTap();
        return;
      }

      if (deltaY > 40 && !state.isSwipe) {
        state.isSwipe = true;
        const c = callbacksRef.current;
        if (c.onSwipeDown) c.onSwipeDown();
        return;
      }

      // If finger slides across the boundary, update active moving direction
      const rect = el.getBoundingClientRect();
      const relativeX = touch.clientX - rect.left;
      const normX = Math.max(0, Math.min(1, relativeX / (rect.width || 1)));

      if (normX < 0.42) {
        startMovement('left');
      } else if (normX > 0.58) {
        startMovement('right');
      } else if (state.activeSide !== 'center') {
        stopContinuousMovement();
        state.activeSide = 'center';
      }
    };

    const handleTouchEnd = (e) => {
      const state = touchState.current;
      const c = callbacksRef.current;
      stopContinuousMovement();

      if (e.changedTouches.length === 0) return;
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - state.startX;
      const deltaY = touch.clientY - state.startY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      const elapsed = Date.now() - state.startTime;

      // Swipes (quick gesture < 350ms with > 35px travel)
      if (elapsed < 350 && (absX > 35 || absY > 35)) {
        if (absY > absX) {
          if (deltaY > 35 && c.onSwipeDown) c.onSwipeDown();
          else if (deltaY < -35 && (c.onSwipeUp || c.onDoubleTap)) {
            if (c.onSwipeUp) c.onSwipeUp();
            else if (c.onDoubleTap) c.onDoubleTap();
          }
        } else {
          if (deltaX > 35 && c.onSwipeRight) c.onSwipeRight();
          else if (deltaX < -35 && c.onSwipeLeft) c.onSwipeLeft();
        }
        return;
      }

      // Quick Tap Detection (stationary touch < 25px movement)
      if (absX < 25 && absY < 25) {
        const now = Date.now();
        const timeSinceLastTap = now - state.lastTapTime;
        const distFromLast = Math.hypot(touch.clientX - state.lastTapX, touch.clientY - state.lastTapY);

        // Double-Tap Jump (two taps within 350ms)
        if (timeSinceLastTap > 40 && timeSinceLastTap < 350 && distFromLast < 60) {
          state.lastTapTime = 0;
          if (c.onDoubleTap) c.onDoubleTap();
          else if (c.onSwipeUp) c.onSwipeUp();
          return;
        }

        state.lastTapTime = now;
        state.lastTapX = touch.clientX;
        state.lastTapY = touch.clientY;

        const rect = el.getBoundingClientRect();
        const relativeX = touch.clientX - rect.left;
        const normX = Math.max(0, Math.min(1, relativeX / (rect.width || 1)));

        // Center tap triggers interact or jump
        if (normX >= 0.42 && normX <= 0.58) {
          if (c.onTapCenter) c.onTapCenter();
          else if (c.onDoubleTap) c.onDoubleTap();
        }
      }
    };

    const handleTouchCancel = () => {
      stopContinuousMovement();
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: false });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    el.addEventListener('touchcancel', handleTouchCancel, { passive: true });

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('touchcancel', handleTouchCancel);
      stopContinuousMovement();
    };
  }, [enabled, tapZoneMode]);

  return { gestureRef: containerRef };
}
