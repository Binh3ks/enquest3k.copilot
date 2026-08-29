/**
 * IMMUTABLE LEARNING EVENT BUS (Phase 1C Standard)
 * ─────────────────────────────────────────────────────────────────────────────
 * Provides a unidirectional, decoupled communication channel between
 * authoritative Learning/Assessment Core and downstream Game/Motivation Layer.
 *
 * Rules:
 * 1. Subscribers receive read-only event payloads.
 * 2. Exceptions in subscribers are caught and logged; they NEVER bubble up
 *    to disrupt Learning/Assessment execution.
 * 3. Learning Core does not depend on Game Layer state.
 */

export const GAMIFICATION_EVENTS = Object.freeze({
  LEARNING_TASK_COMPLETED:   'LEARNING_TASK_COMPLETED',
  DAILY_QUESTS_COMPLETED:    'DAILY_QUESTS_COMPLETED',
  CAMBRIDGE_SHIELD_AWARDED:  'CAMBRIDGE_SHIELD_AWARDED',
  STREAK_DAY_LOGGED:         'STREAK_DAY_LOGGED',
  WEEK_COMPLETED:            'WEEK_COMPLETED',
  BADGE_UNLOCKED:            'BADGE_UNLOCKED',
});

function deepFreeze(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  Object.keys(obj).forEach((prop) => {
    if (typeof obj[prop] === 'object' && obj[prop] !== null && !Object.isFrozen(obj[prop])) {
      deepFreeze(obj[prop]);
    }
  });
  return Object.freeze(obj);
}

class GamificationEventBus {
  constructor() {
    this.listeners = new Map();
  }

  /**
   * Subscribe a listener function to a specific learning event.
   * @param {string} eventType - One of GAMIFICATION_EVENTS
   * @param {Function} callback - (payload) => void
   * @returns {Function} Unsubscribe function
   */
  subscribe(eventType, callback) {
    if (!GAMIFICATION_EVENTS[eventType]) {
      console.warn(`[EventBus] Unknown event type subscribed: "${eventType}"`);
    }
    if (typeof callback !== 'function') {
      throw new Error(`[EventBus] Subscriber callback must be a function.`);
    }

    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    const handlers = this.listeners.get(eventType);
    handlers.add(callback);

    // Return cleanup function
    return () => {
      handlers.delete(callback);
      if (handlers.size === 0) {
        this.listeners.delete(eventType);
      }
    };
  }

  /**
   * Emit an authoritative learning event to all registered subscribers.
   * @param {string} eventType - One of GAMIFICATION_EVENTS
   * @param {Object} payload - Authoritative event data
   */
  emit(eventType, payload = {}) {
    if (!GAMIFICATION_EVENTS[eventType]) {
      console.warn(`[EventBus] Emitting un-registered event type: "${eventType}"`);
    }

    const handlers = this.listeners.get(eventType);
    if (!handlers || handlers.size === 0) {
      return;
    }

    // Deep freeze payload to strictly enforce downstream immutability
    const immutablePayload = deepFreeze({ ...payload, _emittedAt: Date.now() });

    handlers.forEach((callback) => {
      try {
        callback(immutablePayload);
      } catch (err) {
        console.error(`[EventBus] Error in subscriber for event "${eventType}":`, err);
      }
    });
  }

  /**
   * Clear all active subscribers (useful for testing and reset).
   */
  clearAll() {
    this.listeners.clear();
  }
}

// Singleton instance
export const gamificationEventBus = new GamificationEventBus();

/**
 * Convenience helper to emit learning events
 */
export function emitLearningEvent(eventType, payload) {
  gamificationEventBus.emit(eventType, payload);
}
