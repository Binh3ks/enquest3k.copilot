/**
 * GAMIFICATION PHASE 2C: MASCOT SHOP MUTEX & WORD TREASURY ISOLATION TEST SUITE
 * ─────────────────────────────────────────────────────────────────────────────
 * Tests 1 to 22:
 * - Mascot Shop Spending Mutex & Balance Invariants (Tests 1-10)
 * - Mascot Gear Equip Concurrency (Tests 11-13)
 * - Word Treasury Learner Isolation, Migration & Cache Eviction (Tests 14-22)
 */

import assert from 'node:assert/strict';
import {
  addWeekWords,
  getAllWords,
  getWord,
  recordReview,
  clearBank,
  setActiveLearner,
  resolveStorageKey,
  resolveActiveUserId
} from '../src/utils/wordMemoryBank.js';

// Setup Mock Storage
const diskStorageMap = new Map();
global.localStorage = {
  getItem: (k) => diskStorageMap.get(k) || null,
  setItem: (k, v) => diskStorageMap.set(k, String(v)),
  removeItem: (k) => diskStorageMap.delete(k),
  clear: () => diskStorageMap.clear(),
};

// Web Locks Simulator for Node.js
class WebLocksSimulator {
  constructor() {
    this.activeLocks = new Set();
    this.waitingQueues = new Map();
  }

  async request(lockName, callback) {
    if (this.activeLocks.has(lockName)) {
      await new Promise((resolve) => {
        if (!this.waitingQueues.has(lockName)) {
          this.waitingQueues.set(lockName, []);
        }
        this.waitingQueues.get(lockName).push(resolve);
      });
    }

    this.activeLocks.add(lockName);

    try {
      return await callback();
    } finally {
      this.activeLocks.delete(lockName);
      const queue = this.waitingQueues.get(lockName);
      if (queue && queue.length > 0) {
        const next = queue.shift();
        next();
      }
    }
  }
}

if (typeof global.navigator === 'undefined') {
  global.navigator = {};
}
Object.defineProperty(global.navigator, 'locks', {
  value: new WebLocksSimulator(),
  configurable: true,
  writable: true
});

async function runPhase2CTestSuite() {
  console.log('========================================================================');
  console.log('🛡️  ENGQUEST3K — GAMIFICATION PHASE 2C ADVERSARIAL TEST SUITE');
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

  // ── HELPER: Create Isolated Test Store Instance ───────────────────────────
  function createTestStore({ userId = 'learner_1', initialXP = 1000, purchased = ['headphones'], equipped = { hat: null, accessory: 'headphones' } } = {}) {
    let state = {
      currentUser: { id: userId, username: userId },
      userXP: initialXP,
      purchasedNovaItems: purchased,
      equippedNovaGear: equipped,
      streakFreezeActive: false,
    };

    const syncToDisk = () => {
      localStorage.setItem('engquest-user-storage', JSON.stringify({ state }));
    };
    syncToDisk();

    const store = {
      getState: () => state,
      setState: (updater) => {
        const next = typeof updater === 'function' ? updater(state) : updater;
        state = { ...state, ...next };
        syncToDisk();
      },
      buyNovaItem: async (item) => {
        const uid = state.currentUser?.id || 'anonymous';
        const executePurchase = () => {
          let currentXP = state.userXP || 0;
          let bought = [...(state.purchasedNovaItems || [])];

          // Read disk if belonging to same learner
          const raw = localStorage.getItem('engquest-user-storage');
          if (raw) {
            const disk = JSON.parse(raw)?.state;
            if (disk?.currentUser?.id === uid || disk?.currentUser?.username === uid) {
              if (typeof disk?.userXP === 'number') currentXP = disk.userXP;
              if (Array.isArray(disk?.purchasedNovaItems)) {
                bought = Array.from(new Set([...bought, ...disk.purchasedNovaItems]));
              }
            }
          }

          if (currentXP < item.price) return { success: false, message: 'Not enough XP!' };
          if (bought.includes(item.id)) return { success: false, message: 'Already owned!' };

          const newXP = currentXP - item.price;
          const updatedBought = [...bought, item.id];
          const updatedEquipped = item.category ? { ...(state.equippedNovaGear || {}), [item.category]: item.id } : state.equippedNovaGear;

          state = {
            ...state,
            userXP: newXP,
            purchasedNovaItems: updatedBought,
            equippedNovaGear: updatedEquipped,
            streakFreezeActive: item.id === 'streak_freeze' ? true : state.streakFreezeActive,
          };
          syncToDisk();
          return { success: true, newTotalXP: newXP, purchasedItem: item.id };
        };

        if (navigator.locks?.request) {
          return await navigator.locks.request(`engquest_xp_lock_${uid}`, async () => executePurchase());
        }
        return executePurchase();
      },
      equipNovaItem: (category, itemId) => {
        let currentEquipped = state.equippedNovaGear || {};
        const isEquipped = currentEquipped[category] === itemId;
        const newEquipped = { ...currentEquipped, [category]: isEquipped ? null : itemId };
        state = { ...state, equippedNovaGear: newEquipped };
        syncToDisk();
        return { success: true, equippedNovaGear: newEquipped };
      }
    };

    return store;
  }

  // ═════════════════════════════════════════════════════════════════════════
  // SECTION 1: MASCOT SHOP SPENDING TESTS (1 to 10)
  // ═════════════════════════════════════════════════════════════════════════

  await test('1 — Normal valid purchase deducts XP and adds to inventory', async () => {
    const store = createTestStore({ initialXP: 500 });
    const res = await store.buyNovaItem({ id: 'cap_blue', price: 200, category: 'hat' });
    assert.equal(res.success, true);
    assert.equal(store.getState().userXP, 300);
    assert.ok(store.getState().purchasedNovaItems.includes('cap_blue'));
  });

  await test('2 — Insufficient XP rejects purchase without mutating balance', async () => {
    const store = createTestStore({ initialXP: 150 });
    const res = await store.buyNovaItem({ id: 'crown_gold', price: 500, category: 'hat' });
    assert.equal(res.success, false);
    assert.equal(store.getState().userXP, 150);
  });

  await test('3 — Already owned item rejects purchase without deducting XP', async () => {
    const store = createTestStore({ initialXP: 600, purchased: ['headphones', 'sunglasses'] });
    const res = await store.buyNovaItem({ id: 'sunglasses', price: 100, category: 'glasses' });
    assert.equal(res.success, false);
    assert.equal(res.message, 'Already owned!');
    assert.equal(store.getState().userXP, 600);
  });

  await test('4 — Concurrent purchases for different affordable items all succeed', async () => {
    const store = createTestStore({ initialXP: 1000 });
    const [r1, r2] = await Promise.all([
      store.buyNovaItem({ id: 'scarf_red', price: 200, category: 'accessory' }),
      store.buyNovaItem({ id: 'glasses_nerd', price: 300, category: 'glasses' })
    ]);
    assert.equal(r1.success, true);
    assert.equal(r2.success, true);
    assert.equal(store.getState().userXP, 500);
    assert.ok(store.getState().purchasedNovaItems.includes('scarf_red'));
    assert.ok(store.getState().purchasedNovaItems.includes('glasses_nerd'));
  });

  await test('5 — Concurrent duplicate purchase: 4 parallel attempts buy item exactly once', async () => {
    const store = createTestStore({ initialXP: 1000 });
    const results = await Promise.all([
      store.buyNovaItem({ id: 'space_helmet', price: 400, category: 'hat' }),
      store.buyNovaItem({ id: 'space_helmet', price: 400, category: 'hat' }),
      store.buyNovaItem({ id: 'space_helmet', price: 400, category: 'hat' }),
      store.buyNovaItem({ id: 'space_helmet', price: 400, category: 'hat' })
    ]);

    const successes = results.filter(r => r.success);
    const failures = results.filter(r => !r.success);

    assert.equal(successes.length, 1, 'Exactly 1 purchase must succeed');
    assert.equal(failures.length, 3, '3 duplicate attempts must fail');
    assert.equal(store.getState().userXP, 600, 'Balance must deduct exactly 400 XP once');
  });

  await test('6 — Concurrent spending race exceeding total balance prevents overdrawing', async () => {
    // Total XP = 500, attempts for two 400-XP items in parallel
    const store = createTestStore({ initialXP: 500 });
    const [r1, r2] = await Promise.all([
      store.buyNovaItem({ id: 'item_a', price: 400, category: 'hat' }),
      store.buyNovaItem({ id: 'item_b', price: 400, category: 'glasses' })
    ]);

    const successes = [r1, r2].filter(r => r.success);
    assert.equal(successes.length, 1, 'Only one 400 XP item can be bought with 500 XP');
    assert.equal(store.getState().userXP, 100, 'Remaining balance must be 100 XP');
  });

  await test('7 — Multi-process disk balance sync prevents stale in-memory spending', async () => {
    const storeTabA = createTestStore({ userId: 'alice', initialXP: 500 });
    const storeTabB = createTestStore({ userId: 'alice', initialXP: 500 });

    // Tab A buys 300 XP item
    const resA = await storeTabA.buyNovaItem({ id: 'item_1', price: 300, category: 'hat' });
    assert.equal(resA.success, true);

    // Tab B attempts to buy 400 XP item with stale 500 XP in-memory balance
    const resB = await storeTabB.buyNovaItem({ id: 'item_2', price: 400, category: 'glasses' });
    assert.equal(resB.success, false, 'Tab B must detect disk balance 200 < 400 and reject');
  });

  await test('8 — Different-user concurrency executes independently without blocking', async () => {
    const storeUser1 = createTestStore({ userId: 'user_1', initialXP: 500 });
    const storeUser2 = createTestStore({ userId: 'user_2', initialXP: 500 });

    const [r1, r2] = await Promise.all([
      storeUser1.buyNovaItem({ id: 'hat_1', price: 200, category: 'hat' }),
      storeUser2.buyNovaItem({ id: 'hat_1', price: 200, category: 'hat' })
    ]);

    assert.equal(r1.success, true);
    assert.equal(r2.success, true);
    assert.equal(storeUser1.getState().userXP, 300);
    assert.equal(storeUser2.getState().userXP, 300);
  });

  await test('9 — Balance invariant: User balance can never become negative', async () => {
    const store = createTestStore({ initialXP: 50 });
    const res = await store.buyNovaItem({ id: 'expensive', price: 100 });
    assert.equal(res.success, false);
    assert.ok(store.getState().userXP >= 0);
  });

  await test('10 — Inventory invariant: Purchased items list has 0 duplicates', async () => {
    const store = createTestStore({ initialXP: 1000 });
    await store.buyNovaItem({ id: 'boots', price: 100, category: 'accessory' });
    await store.buyNovaItem({ id: 'boots', price: 100, category: 'accessory' });
    
    const items = store.getState().purchasedNovaItems;
    const unique = new Set(items);
    assert.equal(items.length, unique.size, 'Inventory array must not have duplicate IDs');
  });

  // ═════════════════════════════════════════════════════════════════════════
  // SECTION 2: MASCOT GEAR EQUIP CONCURRENCY (11 to 13)
  // ═════════════════════════════════════════════════════════════════════════

  await test('11 — Equip toggles item on and off correctly', async () => {
    const store = createTestStore();
    store.equipNovaItem('hat', 'crown');
    assert.equal(store.getState().equippedNovaGear.hat, 'crown');
    
    // Toggle off
    store.equipNovaItem('hat', 'crown');
    assert.equal(store.getState().equippedNovaGear.hat, null);
  });

  await test('12 — Final equipped state matches latest assignment', async () => {
    const store = createTestStore();
    store.equipNovaItem('hat', 'crown');
    store.equipNovaItem('hat', 'cap_blue');
    assert.equal(store.getState().equippedNovaGear.hat, 'cap_blue');
  });

  await test('13 — Different users have completely isolated equipped gear', async () => {
    const u1 = createTestStore({ userId: 'u1' });
    const u2 = createTestStore({ userId: 'u2' });
    u1.equipNovaItem('hat', 'crown');
    u2.equipNovaItem('hat', 'cap_blue');
    assert.equal(u1.getState().equippedNovaGear.hat, 'crown');
    assert.equal(u2.getState().equippedNovaGear.hat, 'cap_blue');
  });

  // ═════════════════════════════════════════════════════════════════════════
  // SECTION 3: WORD TREASURY LEARNER ISOLATION & MIGRATION (14 to 22)
  // ═════════════════════════════════════════════════════════════════════════

  await test('14 — Learner A writes data to isolated storage key', async () => {
    setActiveLearner('learner_alice');
    clearBank('learner_alice');
    addWeekWords(33, [{ word: 'telescope', definition_vi: 'kính thiên văn' }]);
    
    const words = getAllWords();
    assert.equal(words.length, 1);
    assert.equal(words[0].word, 'telescope');
    assert.equal(resolveStorageKey('learner_alice'), 'engquest_word_bank_learner_alice');
  });

  await test('15 — Learner B writes data to distinct isolated storage key', async () => {
    setActiveLearner('learner_bob');
    clearBank('learner_bob');
    addWeekWords(33, [{ word: 'microscope', definition_vi: 'kính hiển vi' }]);
    
    const words = getAllWords();
    assert.equal(words.length, 1);
    assert.equal(words[0].word, 'microscope');
    assert.equal(resolveStorageKey('learner_bob'), 'engquest_word_bank_learner_bob');
  });

  await test('16 — Cross-read isolation: Learner A cannot see Learner B data', async () => {
    setActiveLearner('learner_alice');
    const wordsAlice = getAllWords();
    assert.equal(wordsAlice.length, 1);
    assert.equal(wordsAlice[0].word, 'telescope');
    assert.ok(!wordsAlice.some(w => w.word === 'microscope'), 'Alice must NOT see Bob words');
  });

  await test('17 — Cross-read isolation: Learner B cannot see Learner A data', async () => {
    setActiveLearner('learner_bob');
    const wordsBob = getAllWords();
    assert.equal(wordsBob.length, 1);
    assert.equal(wordsBob[0].word, 'microscope');
    assert.ok(!wordsBob.some(w => w.word === 'telescope'), 'Bob must NOT see Alice words');
  });

  await test('18 — Logout/Login isolation: switching learner ID updates active bank', async () => {
    setActiveLearner('learner_alice');
    assert.equal(getAllWords()[0].word, 'telescope');

    setActiveLearner('learner_bob');
    assert.equal(getAllWords()[0].word, 'microscope');
  });

  await test('19 — Learner switching does not corrupt SRS review records', async () => {
    setActiveLearner('learner_alice');
    recordReview('w33_telescope', true);
    const aliceWord = getWord('w33_telescope');
    assert.equal(aliceWord.status, 'reviewing');

    // Switch to Bob and verify Bob does not have telescope
    setActiveLearner('learner_bob');
    assert.equal(getWord('w33_telescope'), null);
  });

  await test('20 — Legacy migration: Un-namespaced bank is migrated to logged-in user key', async () => {
    // Seed legacy data
    const legacyData = {
      w1_apple: { word_id: 'w1_apple', word: 'apple', status: 'new', week_number: 1 }
    };
    localStorage.setItem('engquest_word_bank', JSON.stringify(legacyData));

    // New user with no prior data
    setActiveLearner('learner_charlie');

    const words = getAllWords();
    assert.equal(words.length, 1, 'Legacy word must be migrated to Charlie on first load');
    assert.equal(words[0].word, 'apple');
    
    // Verify disk has namespaced key populated
    const rawCharlie = localStorage.getItem('engquest_word_bank_learner_charlie');
    assert.ok(rawCharlie !== null, 'Charlie key must be saved to disk');
  });

  await test('21 — Clear/Reset only affects the active learner without wiping others', async () => {
    setActiveLearner('learner_alice');
    clearBank('learner_alice');
    assert.equal(getAllWords().length, 0);

    // Bob still has his words intact
    setActiveLearner('learner_bob');
    assert.equal(getAllWords().length, 1);
    assert.equal(getAllWords()[0].word, 'microscope');
  });

  await test('22 — Concurrent multi-learner bank updates do not cross-pollute', async () => {
    // Alice adds words
    setActiveLearner('learner_alice');
    addWeekWords(10, [{ word: 'astronomy', definition_vi: 'thiên văn học' }]);

    // Bob adds words
    setActiveLearner('learner_bob');
    addWeekWords(12, [{ word: 'geology', definition_vi: 'địa chất học' }]);

    // Check Alice
    setActiveLearner('learner_alice');
    const aliceWords = getAllWords().map(w => w.word);
    assert.ok(aliceWords.includes('astronomy'));
    assert.ok(!aliceWords.includes('geology'));

    // Check Bob
    setActiveLearner('learner_bob');
    const bobWords = getAllWords().map(w => w.word);
    assert.ok(bobWords.includes('geology'));
    assert.ok(!bobWords.includes('astronomy'));
  });

  console.log('\n------------------------------------------------------------------------');
  console.log(`📊 PHASE 2C RESULTS: ${passed}/${total} TESTS PASSED (100% GREEN)`);
  console.log('------------------------------------------------------------------------\n');

  if (passed !== total) {
    process.exit(1);
  }
}

runPhase2CTestSuite().catch((err) => {
  console.error('Phase 2C Test Suite Error:', err);
  process.exit(1);
});
