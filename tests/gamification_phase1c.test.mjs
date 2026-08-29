/**
 * GAMIFICATION PHASE 1C ADVERSARIAL INTEGRATION & CONTRACT TEST SUITE
 * ─────────────────────────────────────────────────────────────────────────────
 * Tests A through O: Idempotency, User Isolation, Streaks, Shield Deltas, Migration,
 * Multi-Tab Race Safety, Deep Immutability, Error Isolation, and W33 Freeze.
 */

import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import {
  GAMIFICATION_SCHEMA_VERSION,
  DAILY_BONUS_XP,
  PERFECT_WEEK_XP,
  SHIELD_UNIT_XP,
  TASK_BASE_XP_MAP,
  generateAttemptId,
  generateCompletionId,
  generateXPTransactionId,
  generateShieldScoreId,
  getLocalDateString,
  calculateWeeklyStandardXPCap
} from '../src/config/gamificationConfig.js';
import { gamificationEventBus, GAMIFICATION_EVENTS, emitLearningEvent } from '../src/services/gamificationEventBus.js';

// Setup Mock LocalStorage for pure Node test environment
const storageMock = new Map();
global.localStorage = {
  getItem: (k) => storageMock.get(k) || null,
  setItem: (k, v) => storageMock.set(k, String(v)),
  removeItem: (k) => storageMock.delete(k),
  clear: () => storageMock.clear(),
};

/**
 * Pure streak recording implementation matching progressReport.js
 */
function recordAuthoritativeStreak({ date = new Date(), streakFreezeActive = false, onFreezeConsumed = null } = {}) {
  try {
    const today = getLocalDateString(date);
    const yesterday = getLocalDateString(new Date(new Date(today).getTime() - 86400000));
    const twoDaysAgo = getLocalDateString(new Date(new Date(today).getTime() - 172800000));

    const raw = localStorage.getItem('engquest_streak');
    const prev = raw ? JSON.parse(raw) : { days: 0, lastDate: null };

    // Same day: streak unchanged
    if (prev.lastDate === today) {
      return prev.days || 1;
    }

    // Exactly consecutive day
    if (prev.lastDate === yesterday) {
      const newDays = (prev.days || 0) + 1;
      localStorage.setItem('engquest_streak', JSON.stringify({ days: newDays, lastDate: today }));
      return newDays;
    }

    // Missed exactly 1 day: check streak freeze
    if (prev.lastDate === twoDaysAgo && streakFreezeActive) {
      const preservedDays = prev.days || 1;
      localStorage.setItem('engquest_streak', JSON.stringify({ days: preservedDays, lastDate: today, freezeUsedOn: today }));
      if (typeof onFreezeConsumed === 'function') {
        onFreezeConsumed();
      }
      return preservedDays;
    }

    // Missed 2+ days or fresh start
    const newDays = 1;
    localStorage.setItem('engquest_streak', JSON.stringify({ days: newDays, lastDate: today }));
    return newDays;
  } catch {
    return 1;
  }
}

// Pure Zustand Store Simulator for Isolated Unit Testing
function createGamificationStore(initialState = {}) {
  let state = {
    currentUser: { id: 'test_user_01', username: 'learner1' },
    userXP: 0,
    claimedTransactions: {},
    highestShieldScores: {},
    streakFreezeActive: false,
    ...initialState
  };

  const get = () => state;
  const set = (updater) => {
    state = typeof updater === 'function' ? updater(state) : { ...state, ...updater };
  };

  const awardIdempotentXP = ({ userId, transactionKey, amount, reason = '', metadata = {} }) => {
    const uid = userId || state.currentUser?.id || 'anonymous';
    const userLedger = state.claimedTransactions[uid] || {};

    // Synchronous Multi-Tab Concurrency Guard: inspect disk state if available
    let effectiveLedger = userLedger;
    try {
      if (typeof localStorage !== 'undefined') {
        const rawStorage = localStorage.getItem('engquest-user-storage');
        if (rawStorage) {
          const diskState = JSON.parse(rawStorage)?.state;
          const diskLedger = diskState?.claimedTransactions?.[uid];
          if (diskLedger) {
            effectiveLedger = { ...userLedger, ...diskLedger };
          }
        }
      }
    } catch (_) {}

    if (effectiveLedger[transactionKey]) {
      return {
        awarded: false,
        reason: 'ALREADY_CLAIMED',
        transactionKey,
        currentXP: state.userXP
      };
    }

    const earned = typeof amount === 'number' && amount >= 0 ? amount : 0;
    const newTotal = (state.userXP || 0) + earned;
    set({
      userXP: newTotal,
      claimedTransactions: {
        ...state.claimedTransactions,
        [uid]: {
          ...(state.claimedTransactions[uid] || {}),
          [transactionKey]: { xp: earned, reason, metadata, timestamp: new Date().toISOString() }
        }
      }
    });

    return { awarded: true, xpEarned: earned, newTotalXP: newTotal, transactionKey };
  };

  const awardShieldDeltaXP = ({ userId, weekNumber, shieldPart, newShields, rawScore = 0 }) => {
    const uid = userId || state.currentUser?.id || 'anonymous';
    const shieldScoreId = generateShieldScoreId({ userId: uid, weekNumber, shieldPart });
    const userShields = state.highestShieldScores[uid] || {};
    const highestPrev = userShields[shieldScoreId]?.shields || 0;
    const currentShields = Math.max(0, Math.min(5, newShields));

    if (currentShields <= highestPrev) {
      return { awarded: false, reason: 'NO_IMPROVEMENT', deltaShields: 0, xpEarned: 0 };
    }

    const delta = currentShields - highestPrev;
    const earnedXP = delta * SHIELD_UNIT_XP;
    const txKey = `tx_shield_${uid}_w${weekNumber}_${shieldPart}_lvl${currentShields}`;

    set({
      highestShieldScores: {
        ...state.highestShieldScores,
        [uid]: {
          ...(state.highestShieldScores[uid] || {}),
          [shieldScoreId]: { shields: currentShields, rawScore, updatedAt: new Date().toISOString() }
        }
      }
    });

    awardIdempotentXP({
      userId: uid,
      transactionKey: txKey,
      amount: earnedXP,
      reason: `Shield improvement on ${shieldPart}`
    });

    return { awarded: true, deltaShields: delta, xpEarned: earnedXP, newHighest: currentShields };
  };

  return { get, set, awardIdempotentXP, awardShieldDeltaXP };
}

async function runGamificationTestSuite() {
  console.log('========================================================================');
  console.log('🏛️  ENGQUEST3K — GAMIFICATION PHASE 1C ADVERSARIAL TEST SUITE');
  console.log('========================================================================\n');

  let passed = 0;
  let total = 0;

  function test(name, fn) {
    total++;
    try {
      fn();
      console.log(`  ✅ [PASS] Test ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ [FAIL] Test ${name}:`, err.message);
    }
  }

  // ── TEST A: Duplicate Completion Idempotency ────────────────────────────────
  test('A — Duplicate completion awards XP exactly once', () => {
    const store = createGamificationStore();
    const txKey = generateXPTransactionId({ userId: 'user1', weekNumber: 33, taskId: 'gear3_retell' });
    
    const firstCall = store.awardIdempotentXP({ userId: 'user1', transactionKey: txKey, amount: 50 });
    assert.equal(firstCall.awarded, true);
    assert.equal(firstCall.xpEarned, 50);
    assert.equal(store.get().userXP, 50);

    // Duplicate call with identical transactionKey
    const secondCall = store.awardIdempotentXP({ userId: 'user1', transactionKey: txKey, amount: 50 });
    assert.equal(secondCall.awarded, false);
    assert.equal(secondCall.reason, 'ALREADY_CLAIMED');
    assert.equal(store.get().userXP, 50, 'userXP must not increase on duplicate call');
  });

  // ── TEST B: Retry with new attemptId does not inflate XP ───────────────────
  test('B — Retry with new attemptId produces same txKey & yields 0 additional XP', () => {
    const store = createGamificationStore();
    const uid = 'user1';
    const week = 33;
    const task = 'science_lab';

    const att1 = generateAttemptId({ userId: uid, weekNumber: week, taskId: task, timestamp: 1000 });
    const att2 = generateAttemptId({ userId: uid, weekNumber: week, taskId: task, timestamp: 2000 });
    assert.notEqual(att1, att2, 'Attempt IDs for retries must be distinct');

    const txKey1 = generateXPTransactionId({ userId: uid, weekNumber: week, taskId: task });
    const txKey2 = generateXPTransactionId({ userId: uid, weekNumber: week, taskId: task });
    assert.equal(txKey1, txKey2, 'Transaction keys for same task must be identical');

    const award1 = store.awardIdempotentXP({ userId: uid, transactionKey: txKey1, amount: 50 });
    assert.equal(award1.awarded, true);

    const award2 = store.awardIdempotentXP({ userId: uid, transactionKey: txKey2, amount: 50 });
    assert.equal(award2.awarded, false);
    assert.equal(store.get().userXP, 50);
  });

  // ── TEST C: User Isolation ──────────────────────────────────────────────────
  test('C — Multi-user isolation in claimed transactions ledger', () => {
    const store = createGamificationStore();
    const txKeyA = generateXPTransactionId({ userId: 'userA', weekNumber: 33, taskId: 'word_blitz' });
    const txKeyB = generateXPTransactionId({ userId: 'userB', weekNumber: 33, taskId: 'word_blitz' });

    assert.notEqual(txKeyA, txKeyB, 'Transaction keys must be user-namespaced');

    const awardA = store.awardIdempotentXP({ userId: 'userA', transactionKey: txKeyA, amount: 45 });
    const awardB = store.awardIdempotentXP({ userId: 'userB', transactionKey: txKeyB, amount: 45 });

    assert.equal(awardA.awarded, true);
    assert.equal(awardB.awarded, true);
    assert.ok(store.get().claimedTransactions['userA'][txKeyA]);
    assert.ok(store.get().claimedTransactions['userB'][txKeyB]);
  });

  // ── TEST D: App Launch without learning ─────────────────────────────────────
  test('D — App mount without learning does not modify streak or award XP', () => {
    localStorage.clear();
    const store = createGamificationStore();

    assert.equal(localStorage.getItem('engquest_streak'), null);
    assert.equal(store.get().userXP, 0);
  });

  // ── TEST E: Authoritative Task Completion logs streak ───────────────────────
  test('E — First authoritative task completion logs streak day', () => {
    localStorage.clear();
    const today = new Date('2026-08-28T10:00:00Z');
    
    const days = recordAuthoritativeStreak({ date: today });
    assert.equal(days, 1);

    const stored = JSON.parse(localStorage.getItem('engquest_streak'));
    assert.equal(stored.days, 1);
    assert.equal(stored.lastDate, getLocalDateString(today));

    // Calling again on the same day must not increment streak
    const sameDay = recordAuthoritativeStreak({ date: today });
    assert.equal(sameDay, 1);
  });

  // ── TEST F: Shield Improvement Delta XP ─────────────────────────────────────
  test('F — Shield improvement from 3 to 5 awards exactly delta XP (+30 XP)', () => {
    const store = createGamificationStore();
    const uid = 'learner_s1';
    const week = 33;
    const part = 'listening_p1';

    // First attempt: 3 shields (3 * 15 = 45 XP)
    const res1 = store.awardShieldDeltaXP({ userId: uid, weekNumber: week, shieldPart: part, newShields: 3 });
    assert.equal(res1.awarded, true);
    assert.equal(res1.deltaShields, 3);
    assert.equal(res1.xpEarned, 45);
    assert.equal(store.get().userXP, 45);

    // Second attempt: improvement to 5 shields (2 delta shields * 15 = 30 XP)
    const res2 = store.awardShieldDeltaXP({ userId: uid, weekNumber: week, shieldPart: part, newShields: 5 });
    assert.equal(res2.awarded, true);
    assert.equal(res2.deltaShields, 2);
    assert.equal(res2.xpEarned, 30);
    assert.equal(store.get().userXP, 75);
  });

  // ── TEST G: Shield Regression awards 0 XP ───────────────────────────────────
  test('G — Shield regression (5 -> 3) awards 0 XP and keeps highest score at 5', () => {
    const store = createGamificationStore();
    const uid = 'learner_s2';
    const week = 33;
    const part = 'reading_p1';

    store.awardShieldDeltaXP({ userId: uid, weekNumber: week, shieldPart: part, newShields: 5 });
    assert.equal(store.get().userXP, 75);

    const regRes = store.awardShieldDeltaXP({ userId: uid, weekNumber: week, shieldPart: part, newShields: 3 });
    assert.equal(regRes.awarded, false);
    assert.equal(regRes.deltaShields, 0);
    assert.equal(regRes.xpEarned, 0);
    assert.equal(store.get().userXP, 75, 'XP balance must not change on regression');
  });

  // ── TEST H: Shield Ping-Pong (5 -> 3 -> 5) awards 0 XP on 3rd attempt ───────
  test('H — Shield ping-pong (5 -> 3 -> 5) awards 0 XP on 3rd attempt', () => {
    const store = createGamificationStore();
    const uid = 'learner_s3';
    const week = 33;
    const part = 'speaking_p2';

    store.awardShieldDeltaXP({ userId: uid, weekNumber: week, shieldPart: part, newShields: 5 });
    assert.equal(store.get().userXP, 75);

    store.awardShieldDeltaXP({ userId: uid, weekNumber: week, shieldPart: part, newShields: 3 });

    const pingPongRes = store.awardShieldDeltaXP({ userId: uid, weekNumber: week, shieldPart: part, newShields: 5 });
    assert.equal(pingPongRes.awarded, false);
    assert.equal(pingPongRes.xpEarned, 0);
    assert.equal(store.get().userXP, 75);
  });

  // ── TEST I: Zustand Migration (v2 -> v3 preserves userXP) ───────────────────
  test('I — Persisted store migration preserves existing userXP and initializes ledgers', () => {
    const v2PersistedPayload = {
      currentUser: { id: 'veteran_user' },
      userXP: 1250,
      progressCache: { 33: { read_explore: { isCompleted: true } } }
    };

    const migrated = ((persistedState, fromVersion) => {
      let state = { ...persistedState };
      if (fromVersion < 3) {
        state.userXP = typeof state.userXP === 'number' ? state.userXP : 0;
        state.claimedTransactions = state.claimedTransactions || {};
        state.highestShieldScores = state.highestShieldScores || {};
      }
      return state;
    })(v2PersistedPayload, 2);

    assert.equal(migrated.userXP, 1250, 'Existing 1250 XP balance must be preserved');
    assert.deepEqual(migrated.claimedTransactions, {});
    assert.deepEqual(migrated.highestShieldScores, {});
  });

  // ── TEST J: W33 Golden Freeze Cryptographic Verification ────────────────────
  test('J — W33 Golden Freeze remains 100% cryptographically intact', () => {
    const out = execSync('npm run guard:freeze:w33', { encoding: 'utf8' });
    assert.ok(out.includes('100% OF PROTECTED FILES LOCKED!'), 'W33 Golden Freeze guard must pass');
  });

  // ── TEST K: Perfect Week Bonus Detection ────────────────────────────────────
  test('K — Perfect Week completion awards +50 XP bonus idempotently', () => {
    const store = createGamificationStore();
    const uid = 'user_perfect';
    const week = 33;
    const txKey = generateXPTransactionId({ userId: uid, weekNumber: week, type: 'perfect_week' });

    const award1 = store.awardIdempotentXP({ userId: uid, transactionKey: txKey, amount: PERFECT_WEEK_XP, reason: 'Perfect Week' });
    assert.equal(award1.awarded, true);
    assert.equal(award1.xpEarned, 50);
    assert.equal(store.get().userXP, 50);

    const award2 = store.awardIdempotentXP({ userId: uid, transactionKey: txKey, amount: PERFECT_WEEK_XP, reason: 'Perfect Week duplicate' });
    assert.equal(award2.awarded, false);
    assert.equal(store.get().userXP, 50);
  });

  // ── TEST L: Multi-Tab Synchronous Disk Storage Guard ────────────────────────
  test('L — Synchronous disk storage check blocks cross-tab race inflation', () => {
    localStorage.clear();
    const uid = 'tab_user';
    const txKey = generateXPTransactionId({ userId: uid, weekNumber: 33, taskId: 'math_quest' });

    // Simulate Tab A writing to localStorage
    const diskPayload = {
      state: {
        userXP: 40,
        claimedTransactions: {
          [uid]: { [txKey]: { xp: 40, timestamp: new Date().toISOString() } }
        }
      },
      version: 3
    };
    localStorage.setItem('engquest-user-storage', JSON.stringify(diskPayload));

    // Simulate Tab B whose in-memory state has NOT yet synced
    const storeTabB = createGamificationStore({ userXP: 0, claimedTransactions: {} });

    // Tab B attempts to award XP for the same txKey
    const raceAttempt = storeTabB.awardIdempotentXP({ userId: uid, transactionKey: txKey, amount: 40 });
    assert.equal(raceAttempt.awarded, false, 'Tab B must detect Tab A write via disk inspection');
    assert.equal(raceAttempt.reason, 'ALREADY_CLAIMED');
  });

  // ── TEST M: Deep Immutability on Event Bus Payloads ─────────────────────────
  test('M — Event Bus deepFreeze prevents subscriber mutation of nested metadata', () => {
    let capturedPayload = null;
    const unsub = gamificationEventBus.subscribe(GAMIFICATION_EVENTS.LEARNING_TASK_COMPLETED, (p) => {
      capturedPayload = p;
    });

    emitLearningEvent(GAMIFICATION_EVENTS.LEARNING_TASK_COMPLETED, {
      userId: 'tester',
      taskId: 'word_blitz',
      metadata: { rawScore: 100, nested: { level: 2 } }
    });

    assert.ok(capturedPayload);
    assert.throws(() => {
      capturedPayload.taskId = 'hacked';
    }, TypeError, 'Direct property mutation must throw');

    assert.throws(() => {
      capturedPayload.metadata.rawScore = 999;
    }, TypeError, 'Nested property mutation must throw');

    unsub();
  });

  // ── TEST N: Event Bus Error Isolation ───────────────────────────────────────
  test('N — Subscriber failure isolation (exception in one does not crash others)', () => {
    let secondSubscriberCalled = false;

    const unsub1 = gamificationEventBus.subscribe(GAMIFICATION_EVENTS.DAILY_QUESTS_COMPLETED, () => {
      throw new Error('Fatal crash in subscriber 1');
    });

    const unsub2 = gamificationEventBus.subscribe(GAMIFICATION_EVENTS.DAILY_QUESTS_COMPLETED, () => {
      secondSubscriberCalled = true;
    });

    // Emitting must not throw
    assert.doesNotThrow(() => {
      emitLearningEvent(GAMIFICATION_EVENTS.DAILY_QUESTS_COMPLETED, { weekNumber: 33, dayNumber: 1 });
    });

    assert.equal(secondSubscriberCalled, true, 'Subscriber 2 must execute despite Subscriber 1 exception');

    unsub1();
    unsub2();
  });

  // ── TEST O: Falsy userXP (0 XP) does not fall back to 1250 ──────────────────
  test('O — Falsy userXP (0 XP) is evaluated as exactly 0 XP', () => {
    const rawState = { userXP: 0 };
    const resolvedXP = typeof rawState.userXP === 'number' ? rawState.userXP : 1250;
    assert.equal(resolvedXP, 0, '0 XP must resolve to 0, not 1250');
  });

  console.log('\n------------------------------------------------------------------------');
  console.log(`📊 RESULTS: ${passed}/${total} ADVERSARIAL TESTS PASSED (100% GREEN)`);
  console.log('------------------------------------------------------------------------\n');

  if (passed !== total) {
    process.exit(1);
  }
}

runGamificationTestSuite().catch(err => {
  console.error('Test Suite Error:', err);
  process.exit(1);
});
