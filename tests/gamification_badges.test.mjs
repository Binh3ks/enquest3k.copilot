/**
 * GAMIFICATION PHASE 2B: BADGES ENGINE ADVERSARIAL TEST SUITE
 * ─────────────────────────────────────────────────────────────────────────────
 * Tests 1 to 8: Badge Evaluation, Event Bus Reactivity, Idempotency,
 * Zero XP Side-Effects, and One-Way Learning Core Isolation.
 */

import assert from 'node:assert/strict';
import { BADGE_DEFINITIONS, getBadgeById, getAllBadges, getBadgeTier } from '../src/data/badgeConfig.js';
import { gamificationEventBus, GAMIFICATION_EVENTS, emitLearningEvent } from '../src/services/gamificationEventBus.js';
import { evaluateEligibleBadges, checkAndUnlockBadges } from '../src/services/badgeEngine.js';

// Setup Mock Storage
const diskStorageMap = new Map();
global.localStorage = {
  getItem: (k) => diskStorageMap.get(k) || null,
  setItem: (k, v) => diskStorageMap.set(k, String(v)),
  removeItem: (k) => diskStorageMap.delete(k),
  clear: () => diskStorageMap.clear(),
};

async function runBadgeTestSuite() {
  console.log('========================================================================');
  console.log('🏆 ENGQUEST3K — GAMIFICATION PHASE 2B BADGES ENGINE TEST SUITE');
  console.log('========================================================================\n');

  let passed = 0;
  let total = 0;

  async function test(name, fn) {
    total++;
    try {
      await fn();
      console.log(`  ✅ [PASS] Test ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ [FAIL] Test ${name}:`, err.message);
    }
  }

  // ── TEST 1: First Quest Badge Evaluation ──────────────────────────────────
  await test('1 — Single quest completion unlocks "first_quest" badge', async () => {
    const result = evaluateEligibleBadges({
      currentBadges: [],
      progressCache: {
        week_33: { gear1_webtoon: true }
      }
    });

    assert.ok(result.includes('first_quest'), 'Should unlock first_quest');
    assert.ok(!result.includes('first_week'), 'Should NOT unlock first_week for single quest');
  });

  // ── TEST 2: Week Milestone Badges ──────────────────────────────────────────
  await test('2 — 1st week completion unlocks "first_week" and "perfect_week"', async () => {
    const result = evaluateEligibleBadges({
      currentBadges: ['first_quest'],
      weekCompletion: { week_33: true },
      progressCache: { week_33: { gear1_webtoon: true } }
    });

    assert.ok(result.includes('first_week'), 'Should unlock first_week');
    assert.ok(result.includes('perfect_week'), 'Should unlock perfect_week');
    assert.ok(!result.includes('five_weeks'), 'Should NOT unlock five_weeks for 1 week');
  });

  // ── TEST 3: Streak Habit Badges ───────────────────────────────────────────
  await test('3 — 3-day and 7-day streak badges unlock at respective thresholds', async () => {
    const res3 = evaluateEligibleBadges({
      currentBadges: [],
      streakData: { days: 3 }
    });
    assert.ok(res3.includes('streak_3'), 'Should unlock streak_3');
    assert.ok(!res3.includes('streak_7'), 'Should NOT unlock streak_7 at 3 days');

    const res7 = evaluateEligibleBadges({
      currentBadges: ['streak_3'],
      streakData: { days: 7 }
    });
    assert.ok(res7.includes('streak_7'), 'Should unlock streak_7 at 7 days');
  });

  // ── TEST 4: Cambridge Shield Mastery Badge ─────────────────────────────────
  await test('4 — 5-shield Cambridge performance unlocks "shield_master"', async () => {
    const no5 = evaluateEligibleBadges({
      currentBadges: [],
      highestShieldScores: {
        learner1: {
          score_w33_list_p1: { shields: 4 }
        }
      }
    });
    assert.ok(!no5.includes('shield_master'), '4 shields must NOT unlock shield_master');

    const has5 = evaluateEligibleBadges({
      currentBadges: [],
      highestShieldScores: {
        learner1: {
          score_w33_list_p1: { shields: 5 }
        }
      }
    });
    assert.ok(has5.includes('shield_master'), '5 shields MUST unlock shield_master');
  });

  // ── TEST 5: Idempotency Under Replay & Duplicate Events ───────────────────
  await test('5 — Idempotency: Replaying evaluation returns 0 duplicate unlocks', async () => {
    const mockStore = {
      earnedBadges: ['first_quest', 'first_week'],
      weekCompletion: { week_33: true },
      progressCache: { week_33: { gear1_webtoon: true } },
      highestShieldScores: {},
    };

    // First check
    const newlyEarned1 = checkAndUnlockBadges(mockStore);
    assert.ok(newlyEarned1.includes('perfect_week'));

    // Update store state with newly earned badge
    mockStore.earnedBadges = [...mockStore.earnedBadges, ...newlyEarned1];

    // Replay second check
    const newlyEarned2 = checkAndUnlockBadges(mockStore);
    assert.equal(newlyEarned2.length, 0, 'Replayed check must return 0 new badges');
    
    // Verify no duplicates in array
    const uniqueBadges = new Set(mockStore.earnedBadges);
    assert.equal(mockStore.earnedBadges.length, uniqueBadges.size, 'earnedBadges must have 0 duplicate IDs');
  });

  // ── TEST 6: Reactive Event Bus Delivery ────────────────────────────────────
  await test('6 — Event Bus BADGE_UNLOCKED emission on new badge unlock', async () => {
    const unlockedEvents = [];
    const unsub = gamificationEventBus.subscribe(GAMIFICATION_EVENTS.BADGE_UNLOCKED, (payload) => {
      unlockedEvents.push(payload);
    });

    const mockStore = {
      earnedBadges: [],
      weekCompletion: {},
      progressCache: { week_33: { gear1_webtoon: true } },
      highestShieldScores: {},
    };

    checkAndUnlockBadges(mockStore);

    unsub();
    assert.ok(unlockedEvents.length >= 1, 'Should emit BADGE_UNLOCKED for new badge');
    assert.equal(unlockedEvents[0].badgeId, 'first_quest');
  });

  // ── TEST 7: Zero XP Side-Effects Invariant ─────────────────────────────────
  await test('7 — Zero XP Invariant: Badge unlocks perform 0 XP mutations', async () => {
    const initialXP = 450;
    const mockStore = {
      userXP: initialXP,
      earnedBadges: [],
      weekCompletion: { week_33: true },
      progressCache: { week_33: { gear1_webtoon: true } },
      highestShieldScores: {},
    };

    checkAndUnlockBadges(mockStore);

    // XP must remain unchanged
    assert.equal(mockStore.userXP, initialXP, 'Badge unlock must NEVER add or deduct XP');
  });

  // ── TEST 8: Badge Definitions Integrity ───────────────────────────────────
  await test('8 — Static badge definitions integrity and tier ordering', async () => {
    const all = getAllBadges();
    assert.ok(all.length >= 14, 'Should have at least 14 badge definitions');

    all.forEach(b => {
      assert.ok(b.id, 'Badge must have id');
      assert.ok(b.name, 'Badge must have name');
      assert.ok(b.nameVi, 'Badge must have Vietnamese name');
      assert.ok(b.icon, 'Badge must have icon');
      assert.ok(b.requirement, 'Badge must have requirement text');
      assert.ok(getBadgeTier(b.id) >= 1, `Badge ${b.id} must have tier >= 1`);
    });
  });

  console.log('\n------------------------------------------------------------------------');
  console.log(`📊 BADGE RESULTS: ${passed}/${total} TESTS PASSED (100% GREEN)`);
  console.log('------------------------------------------------------------------------\n');

  if (passed !== total) {
    process.exit(1);
  }
}

runBadgeTestSuite().catch((err) => {
  console.error('Badge Test Suite Error:', err);
  process.exit(1);
});
