/**
 * useChroniclesStore.js — The Lexio Chronicles World State
 *
 * Manages:
 *  - Daily Room unlock status (triggered by zone completion)
 *  - Power Points (PP) accumulation from mini-game Stars
 *  - Boss Chamber access thresholds
 *  - Lexio Coins economy
 *  - Collectible tracking per room
 *  - Week/Chapter progression
 *
 * Integration: Listens to useDailyQuestStore.isDayComplete() to auto-unlock rooms.
 * Economy: Stars → PP → Boss Access | PP → Coins → Mascot Shop
 *
 * Storage key: engquest_chronicles_${userId}
 */

import { create } from 'zustand';
import { getActiveUserId } from './useArcadeStore';

// ─── CHAPTER CONFIGURATION ───────────────────────────────────────────────────

export const CHAPTER_CONFIG = [
  { id: 1, weeks: [17, 24], title: 'The Grand Library',    theme: 'library',    crystal: 'Crystal of Recall',   wingColor: '#8B5CF6' },
  { id: 2, weeks: [25, 32], title: 'The Aqua Vault',       theme: 'ocean',      crystal: 'Crystal of Listening', wingColor: '#0EA5E9' },
  { id: 3, weeks: [33, 40], title: 'The Storm Tower',      theme: 'storm',      crystal: 'Crystal of Speaking',  wingColor: '#F59E0B' },
  { id: 4, weeks: [41, 48], title: 'The Ancient Greenhouse',theme: 'forest',    crystal: 'Crystal of Reading',   wingColor: '#10B981' },
  { id: 5, weeks: [49, 56], title: 'The Forge of Words',   theme: 'forge',      crystal: 'Crystal of Grammar',   wingColor: '#EF4444' },
  { id: 6, weeks: [57, 72], title: 'The Observatory',      theme: 'space',      crystal: 'Crystal of Writing',   wingColor: '#6366F1' },
  { id: 7, weeks: [73, 156],'title': 'The Throne of Mastery',theme: 'throne',  crystal: 'Crystal of Fluency',   wingColor: '#F59E0B' },
];

/** Returns the Chapter config for a given week number */
export function getChapterForWeek(weekNumber) {
  const w = parseInt(weekNumber) || 33;
  return CHAPTER_CONFIG.find((c) => w >= c.weeks[0] && w <= c.weeks[1]) || CHAPTER_CONFIG[2];
}

/**
 * Returns boss type 1-5 for a given week number.
 * Cycles sequentially through 5 boss archetypes:
 * 1 = Ancient Sorcerer, 2 = Stone Golem, 3 = Sound Dragon, 4 = Cloze Sphinx, 5 = Memory Guardian
 */
export function getBossType(weekNumber) {
  const w = parseInt(weekNumber) || 33;
  return ((w - 17) % 5) + 1;
}

// ─── ROOM DOOR DEFINITIONS ────────────────────────────────────────────────────

// ─── CHAMBER / ROOM METADATA (100% ENGLISH IMMERSION) ────────────────────────

export const CHAMBER_METADATA = [
  { chamberName: 'Chamber of Tales',  chamberEn: 'Story World',    icon: '📜', zoneRef: 'Day 1' },
  { chamberName: 'Alchemy Lab',       chamberEn: 'Knowledge Lab',  icon: '⚗️', zoneRef: 'Day 2' },
  { chamberName: 'Thunder Arena',     chamberEn: 'Battle Arena',   icon: '⚡', zoneRef: 'Day 3' },
  { chamberName: 'Rune Sanctum',      chamberEn: 'Creator Studio', icon: '⚒️', zoneRef: 'Day 4' },
  { chamberName: 'Apex Spire',        chamberEn: 'Boss Castle',    icon: '🏰', zoneRef: 'Day 5' },
  { chamberName: 'Arcane Skyway',     chamberEn: 'Arcane Skyway',  icon: '🌪️', zoneRef: 'Day 6' },
  { chamberName: 'Master Sanctum',    chamberEn: 'Master Sanctum', icon: '👑', zoneRef: 'Day 7' },
];

/**
 * 3 challenge doors per room.
 * 21 unique games across 7 floors (7 Vocab / 7 Grammar / 7 Integration).
 */
export const DOOR_ROTATION = [
  // Floor 1 (Day 1: Story World)
  [
    { id: 'arcane_bubble', type: 'vocab',       duration: 60, label: 'Arcane Bubble Pop',     gameName: 'Arcane Bubble Pop',     icon: '🔮' },
    { id: 'spell_train',   type: 'grammar',     duration: 90, label: 'Spell Sentence Train',   gameName: 'Spell Sentence Train',   icon: '🚂' },
    { id: 'lexical_det',   type: 'integration', duration: 90, label: 'Lexical Detective',     gameName: 'Lexical Detective',     icon: '🕵️‍♂️' },
  ],
  // Floor 2 (Day 2: Knowledge Lab)
  [
    { id: 'crystal_match', type: 'vocab',       duration: 75, label: 'Crystal Memory Match',  gameName: 'Crystal Memory Match',  icon: '💎' },
    { id: 'rune_forge',    type: 'grammar',     duration: 75, label: 'Rune Forge',            gameName: 'Rune Forge',            icon: '⚒️' },
    { id: 'ancient_scroll',type: 'integration', duration: 120, label: 'Ancient Scroll Cloze', gameName: 'Ancient Scroll Cloze', icon: '📜' },
  ],
  // Floor 3 (Day 3: Battle Arena)
  [
    { id: 'phonics_bubble',type: 'vocab',       duration: 60, label: 'Phonics Sound Blaster', gameName: 'Phonics Sound Blaster', icon: '🔊' },
    { id: 'chunk_catapult',type: 'grammar',     duration: 75, label: 'Chunk Catapult Match',  gameName: 'Chunk Catapult Match',  icon: '🧩' },
    { id: 'meteor_smasher',type: 'integration', duration: 90, label: 'Meteor Smasher',       gameName: 'Meteor Smasher',       icon: '🛸' },
  ],
  // Floor 4 (Day 4: Creator Studio)
  [
    { id: 'highway_runner',type: 'vocab',       duration: 150, label: 'Highway Word Runner',   gameName: 'Highway Word Runner',   icon: '🏎️' },
    { id: 'spell_train_express',type:'grammar', duration: 140, label: 'Syntax Express 4-Car',  gameName: 'Syntax Express 4-Car',  icon: '🚆' },
    { id: 'lexical_riddle',type: 'integration', duration: 90, label: 'Mystery Riddle Detective',gameName:'Mystery Riddle Detective',icon:'🔍' },
  ],
  // Floor 5 (Day 5: Boss Castle — comprehensive)
  [
    { id: 'grand_matrix',  type: 'vocab',       duration: 180, label: 'Grand Master Matrix',   gameName: 'Grand Master Matrix',   icon: '👑' },
    { id: 'titan_forge',   type: 'grammar',     duration: 100, label: 'Titan Grammar Forge',   gameName: 'Titan Grammar Forge',   icon: '⚡' },
    { id: 'cambridge_cloze',type:'integration', duration: 120, label: 'Cambridge Cloze Gauntlet',gameName:'Cambridge Cloze Gauntlet',icon:'🏆' },
  ],
  // Floor 6 — Staging Sandbox (Pool Extension: not part of standard 5-day weekly student flow)
  [
    { id: 'synonym_storm',    type: 'vocab',       duration: 75, label: 'Synonym Storm',          gameName: 'Synonym Storm',          icon: '🌪️' },
    { id: 'connector_relay',  type: 'grammar',     duration: 160, label: 'Connector Relay',        gameName: 'Connector Relay',        icon: '🌉' },
    { id: 'story_sequencer',  type: 'integration', duration: 60, label: 'Story Sequencer',        gameName: 'Story Sequencer',        icon: '📖' },
  ],
  // Floor 7 — Staging Sandbox (Pool Extension: not part of standard 5-day weekly student flow)
  [
    { id: 'word_forge_scramble', type: 'vocab',    duration: 75, label: 'Word Forge Scramble',    gameName: 'Word Forge Scramble',    icon: '⚒️' },
    { id: 'question_quest',      type: 'grammar',  duration: 240, label: 'Question Quest',        gameName: 'Question Quest',        icon: '❓' },
    { id: 'rune_balance_scale',  type: 'integration', duration: 75, label: 'Word Class Duel',     gameName: 'Word Class Duel',        icon: '⚖️' },
  ],
];

// ─── STAR / PP ECONOMY ─────────────────────────────────────────────────────────

export const PP_PER_STAR = 10;

export const BOSS_ACCESS_THRESHOLDS = {
  bronze: 150,  // 33% of 450 max
  silver: 270,  // 60%
  gold:   360,  // 80%
};

export const COINS_PER_ROOM_CLEAR   = 15;
export const COINS_PER_BOSS_DEFEAT  = { bronze: 30, silver: 60, gold: 100 };
export const MAX_STARS_PER_ROOM     = 9;  // 3 doors × 3 stars
export const MAX_PP_PER_WEEK        = 450; // 5 rooms × 9 stars × 10 PP

/**
 * Compute star count from accuracy + speed.
 * @param {number} correct - items answered correctly
 * @param {number} total   - total items
 * @param {number} timeTaken  - seconds elapsed
 * @param {number} maxTime    - max allowed seconds
 * @returns {0|1|2|3}
 */
export function calculateStars(correct, total, timeTaken, maxTime) {
  if (total === 0) return 0;
  const accuracy = correct / total;
  const hasTime = timeTaken != null && maxTime != null && maxTime > 0;
  const timeBonus = hasTime ? Math.max(0, 1 - (timeTaken / maxTime)) : 1;
  const score = hasTime ? (accuracy * 0.7 + timeBonus * 0.3) : accuracy;
  if (score >= 0.85) return 3;
  if (score >= 0.65) return 2;
  if (score >= 0.40) return 1;
  return 0;
}

// ─── STORAGE HELPERS ──────────────────────────────────────────────────────────

function getStorageKey(uid = getActiveUserId()) {
  return `engquest_chronicles_${uid}`;
}

function loadState(uid = getActiveUserId()) {
  const defaults = {
    // { 'w33_d1': true, 'w33_d2': false, ... }  — room unlock flags
    unlockedRooms: {},
    // { 'w33_d1': { door1: 2, door2: 3, door3: 1 }, ... }  — stars per door
    roomStars: {},
    // { 'w33': 80 }  — accumulated PP per week
    weeklyPP: {},
    // { 'w33': true }  — boss defeated flags
    bossDefeated: {},
    // { 'w33': 'silver' }  — highest access tier achieved
    bossAccessTier: {},
    // total Lexio Coins across all time
    lexioCoins: 0,
    // { 'w33_d1_collectible': true }  — found collectibles
    collectiblesFound: {},
    // { 'w33': 1 }  — boss fragments per chapter
    bossFragments: {},
    // Which chapter boss has been completed
    chapterBossCompleted: {},
    // Which chapter final boss has been defeated: { chapter3: true, c3: true }
    chapterFinalBossDefeated: {},
    // Fastest completion times per mini-game in seconds: { [gameId]: 24.5 }
    personalBests: {},
  };

  if (typeof localStorage === 'undefined') return defaults;
  try {
    const raw = localStorage.getItem(getStorageKey(uid));
    if (raw) return { ...defaults, ...JSON.parse(raw) };
  } catch (_) {}
  return defaults;
}

function saveState(uid, state) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(uid), JSON.stringify({
      unlockedRooms:            state.unlockedRooms,
      roomStars:                state.roomStars,
      weeklyPP:                 state.weeklyPP,
      bossDefeated:             state.bossDefeated,
      bossAccessTier:           state.bossAccessTier,
      lexioCoins:               state.lexioCoins,
      collectiblesFound:        state.collectiblesFound,
      bossFragments:            state.bossFragments,
      chapterBossCompleted:     state.chapterBossCompleted,
      chapterFinalBossDefeated: state.chapterFinalBossDefeated || {},
      personalBests:            state.personalBests || {},
    }));
  } catch (_) {}
}

// ─── STORE ────────────────────────────────────────────────────────────────────

const _initial = loadState();

export const useChroniclesStore = create((set, get) => ({
  ..._initial,

  activeUserId: getActiveUserId(),

  // ─── Room Unlock ─────────────────────────────────────────────────────────

  /**
   * Called by useDailyQuestStore / zone-complete handler when all 3 quests
   * in a zone are done.
   * @param {number|string} weekId   - e.g. 33
   * @param {number}        dayIndex - 0-based (0=Day1 … 4=Day5)
   */
  unlockRoom: (weekId, dayIndex) => {
    const key = `w${weekId}_d${dayIndex}`;
    const state = get();
    if (state.unlockedRooms[key]) return; // already unlocked, no-op
    const next = { ...state.unlockedRooms, [key]: true };
    set({ unlockedRooms: next });
    saveState(state.activeUserId, { ...state, unlockedRooms: next });
  },

  isRoomUnlocked: (weekId, dayIndex) => {
    return Boolean(get().unlockedRooms[`w${weekId}_d${dayIndex}`]);
  },

  // ─── Stars & Power Points ─────────────────────────────────────────────────

  /**
   * Record stars for a completed door challenge.
   * Updates roomStars, weeklyPP, and triggers coin logic.
   * @param {number|string} weekId
   * @param {number}        dayIndex  - 0-4
   * @param {number}        doorIndex - 0, 1, or 2
   * @param {0|1|2|3}       stars
   */
  recordDoorStars: (weekId, dayIndex, doorIndex, stars) => {
    const state = get();
    const roomKey = `w${weekId}_d${dayIndex}`;
    const doorKey = `door${doorIndex}`;

    // Only upgrade stars, never downgrade
    const prevRoom  = state.roomStars[roomKey] || {};
    const prevStars = prevRoom[doorKey] || 0;
    if (stars <= prevStars) return;

    const starDelta  = stars - prevStars;
    const ppDelta    = starDelta * PP_PER_STAR;
    const weekPPKey  = `w${weekId}`;
    const currentPP  = state.weeklyPP[weekPPKey] || 0;
    const newPP      = Math.min(currentPP + ppDelta, MAX_PP_PER_WEEK);

    const nextRoomStars = {
      ...state.roomStars,
      [roomKey]: { ...prevRoom, [doorKey]: stars },
    };
    const nextWeeklyPP = { ...state.weeklyPP, [weekPPKey]: newPP };

    set({ roomStars: nextRoomStars, weeklyPP: nextWeeklyPP });
    saveState(state.activeUserId, { ...state, roomStars: nextRoomStars, weeklyPP: nextWeeklyPP });
  },

  getWeeklyPP: (weekId) => get().weeklyPP[`w${weekId}`] || 0,

  getRoomStars: (weekId, dayIndex) => {
    const room = get().roomStars[`w${weekId}_d${dayIndex}`] || {};
    return (room.door0 || 0) + (room.door1 || 0) + (room.door2 || 0);
  },

  getDoorStars: (weekId, dayIndex) => {
    const room = get().roomStars[`w${weekId}_d${dayIndex}`] || {};
    return [room.door0 || 0, room.door1 || 0, room.door2 || 0];
  },

  getTotalWeekStars: (weekId) => {
    let total = 0;
    for (let d = 0; d < 5; d++) {
      total += get().getRoomStars(weekId, d);
    }
    return total;
  },

  /**
   * Record personal best completion time for a mini-game.
   * Returns true if a new record was set.
   */
  recordPersonalBest: (gameId, timeTaken) => {
    if (!gameId || typeof timeTaken !== 'number' || timeTaken <= 0) return false;
    const state = get();
    const currentPB = state.personalBests[gameId] || 9999;
    const roundedTime = parseFloat(timeTaken.toFixed(1));
    if (roundedTime < currentPB) {
      const nextPB = { ...state.personalBests, [gameId]: roundedTime };
      set({ personalBests: nextPB });
      saveState(state.activeUserId, { ...state, personalBests: nextPB });
      return true; // New record!
    }
    return false;
  },

  getPersonalBest: (gameId) => {
    return get().personalBests[gameId] || null;
  },

  // ─── Room Clear ───────────────────────────────────────────────────────────

  /**
   * Called after all 3 doors in a room are passed (each ≥ 1 star).
   * Awards coins. Returns coins earned.
   */
  completeRoom: (weekId, dayIndex) => {
    const state = get();
    const coinsEarned = COINS_PER_ROOM_CLEAR;
    // Bonus for 3-star performance
    const roomStars = state.getRoomStars(weekId, dayIndex);
    const bonus = roomStars >= 8 ? 10 : roomStars >= 6 ? 5 : 0;
    const total = coinsEarned + bonus;
    const nextCoins = (state.lexioCoins || 0) + total;
    set({ lexioCoins: nextCoins });
    saveState(state.activeUserId, { ...state, lexioCoins: nextCoins });
    return total;
  },

  // ─── Collectibles ─────────────────────────────────────────────────────────

  collectItem: (weekId, dayIndex) => {
    const state = get();
    const itemKey = `w${weekId}_d${dayIndex}_collectible`;
    if (state.collectiblesFound[itemKey]) return false;
    const next = { ...state.collectiblesFound, [itemKey]: true };
    set({ collectiblesFound: next });
    saveState(state.activeUserId, { ...state, collectiblesFound: next });
    return true;
  },

  hasCollectible: (weekId, dayIndex) =>
    Boolean(get().collectiblesFound[`w${weekId}_d${dayIndex}_collectible`]),

  isCollectibleFound: (weekId, dayIndex) =>
    Boolean(get().collectiblesFound[`w${weekId}_d${dayIndex}_collectible`]),

  markCollectibleFound: (weekId, dayIndex) =>
    get().collectItem(weekId, dayIndex),

  claimSecretReward: (weekId, secretId) => {
    const state = get();
    const key = `w${weekId}_secret_${secretId}`;
    if (state.collectiblesFound && state.collectiblesFound[key]) {
      return { alreadyClaimed: true, coins: 0 };
    }
    const rewardCoins = 5;
    const nextCoins = (state.lexioCoins || 0) + rewardCoins;
    const nextCollectibles = { ...(state.collectiblesFound || {}), [key]: true };
    set({ lexioCoins: nextCoins, collectiblesFound: nextCollectibles });
    saveState(state.activeUserId, { ...state, lexioCoins: nextCoins, collectiblesFound: nextCollectibles });
    return { alreadyClaimed: false, coins: rewardCoins };
  },

  isSecretClaimed: (weekId, secretId) => {
    const key = `w${weekId}_secret_${secretId}`;
    return Boolean(get().collectiblesFound?.[key]);
  },

  // ─── Boss Access ──────────────────────────────────────────────────────────

  /**
   * Returns boss access tier based on current PP.
   * @returns {'none'|'bronze'|'silver'|'gold'}
   */
  getBossAccessTier: (weekId) => {
    const pp = get().getWeeklyPP(weekId);
    if (pp >= BOSS_ACCESS_THRESHOLDS.gold)   return 'gold';
    if (pp >= BOSS_ACCESS_THRESHOLDS.silver) return 'silver';
    if (pp >= BOSS_ACCESS_THRESHOLDS.bronze) return 'bronze';
    return 'none';
  },

  isBossUnlocked: (weekId) => get().getBossAccessTier(weekId) !== 'none',

  // ─── Boss Defeat ──────────────────────────────────────────────────────────

  defeatBoss: (weekId, tier) => {
    const state = get();
    const weekKey = `w${weekId}`;
    const coinsEarned = COINS_PER_BOSS_DEFEAT[tier] || 30;
    const nextCoins = (state.lexioCoins || 0) + coinsEarned;
    // Fragment: award 1 fragment for silver+
    const earnedFragment = tier === 'silver' || tier === 'gold';
    const chapterId      = getChapterForWeek(weekId).id;
    const longFragKey    = `chapter${chapterId}`;
    const shortFragKey   = `c${chapterId}`;
    const currentFrags   = state.bossFragments[longFragKey] ?? state.bossFragments[shortFragKey] ?? 0;
    const nextFragVal    = earnedFragment ? currentFrags + 1 : currentFrags;

    const nextBossDefeated   = { ...state.bossDefeated,   [weekKey]: true };
    const nextBossAccessTier = { ...state.bossAccessTier, [weekKey]: tier };
    const nextFragments      = {
      ...state.bossFragments,
      [longFragKey]: nextFragVal,
      [shortFragKey]: nextFragVal,
    };

    set({
      bossDefeated:   nextBossDefeated,
      bossAccessTier: nextBossAccessTier,
      lexioCoins:     nextCoins,
      bossFragments:  nextFragments,
    });
    saveState(state.activeUserId, {
      ...state,
      bossDefeated: nextBossDefeated,
      bossAccessTier: nextBossAccessTier,
      lexioCoins: nextCoins,
      bossFragments: nextFragments,
    });

    return coinsEarned;
  },

  /** Alias / wrapper for defeatBoss matching component calls */
  recordBossDefeat: (weekId, tier, _coins) => {
    return get().defeatBoss(weekId, tier);
  },

  isBossDefeated: (weekId) => Boolean(get().bossDefeated[`w${weekId}`]),

  // ─── Chapter Final Boss ──────────────────────────────────────────────────

  recordChapterBossDefeat: (chapterId) => {
    const state = get();
    const id = typeof chapterId === 'object' && chapterId !== null ? chapterId.id : chapterId;
    const longKey  = `chapter${id}`;
    const shortKey = `c${id}`;
    const nextDefeated = {
      ...(state.chapterFinalBossDefeated || {}),
      [longKey]: true,
      [shortKey]: true,
    };
    const nextCompleted = {
      ...(state.chapterBossCompleted || {}),
      [longKey]: true,
      [shortKey]: true,
    };
    set({
      chapterFinalBossDefeated: nextDefeated,
      chapterBossCompleted: nextCompleted,
    });
    saveState(state.activeUserId, {
      ...state,
      chapterFinalBossDefeated: nextDefeated,
      chapterBossCompleted: nextCompleted,
    });
  },

  isChapterBossDefeated: (chapterId) => {
    const state = get();
    const id = typeof chapterId === 'object' && chapterId !== null ? chapterId.id : chapterId;
    return Boolean(
      state.chapterFinalBossDefeated?.[`chapter${id}`] ||
      state.chapterFinalBossDefeated?.[`c${id}`] ||
      state.chapterBossCompleted?.[`chapter${id}`] ||
      state.chapterBossCompleted?.[`c${id}`]
    );
  },

  // ─── Coins ────────────────────────────────────────────────────────────────

  spendCoins: (amount) => {
    const state = get();
    if ((state.lexioCoins || 0) < amount) return false;
    const nextCoins = state.lexioCoins - amount;
    set({ lexioCoins: nextCoins });
    saveState(state.activeUserId, { ...state, lexioCoins: nextCoins });
    return true;
  },

  /** Award bonus Lexio Coins (collectible, achievement bonus etc.) */
  addBonusCoins: (amount) => {
    const state = get();
    const nextCoins = (state.lexioCoins || 0) + Math.max(0, amount);
    set({ lexioCoins: nextCoins });
    saveState(state.activeUserId, { ...state, lexioCoins: nextCoins });
  },

  /**
   * Purchase a mascot cosmetic item using Lexio Coins.
   * Deducts from lexioCoins; delegates to useUserStore.purchaseNovaItem for ownership.
   * Returns true on success, false if insufficient coins.
   */
  purchaseMascotItem: (itemId, price, category = null) => {
    const ok = get().spendCoins(price);
    if (!ok) return false;
    // Bridge to userStore inventory (Supabase-backed) — ESM dynamic import
    // to avoid circular dependency at module load time.
    import('./useUserStore').then(({ useUserStore, syncCosmeticInventories }) => {
      const state = useUserStore.getState();
      const current = Array.isArray(state.purchasedNovaItems)
        ? state.purchasedNovaItems
        : ['headphones'];
      if (!current.includes(itemId)) {
        if (typeof state.purchaseNovaItem === 'function') {
          state.purchaseNovaItem(itemId);
        } else {
          const rawUpdated = [...current, itemId];
          const synced = typeof syncCosmeticInventories === 'function'
            ? syncCosmeticInventories(state.avatarItems || [], rawUpdated)
            : { purchasedNovaItems: rawUpdated, avatarItems: state.avatarItems || [] };
          const updatedEquipped = category
            ? { ...(state.equippedNovaGear || {}), [category]: itemId }
            : (state.equippedNovaGear || {});
          useUserStore.setState({
            purchasedNovaItems: synced.purchasedNovaItems,
            avatarItems: synced.avatarItems,
            equippedNovaGear: updatedEquipped,
          });
        }
      }
    });
    return true;
  },

  // ─── User Switch ─────────────────────────────────────────────────────────

  syncUserChroniclesState: (uid) => {
    const targetUid = uid || getActiveUserId();
    const loaded = loadState(targetUid);
    set({ ...loaded, activeUserId: targetUid });
  },

  // ─── Owner/Teacher Reset ─────────────────────────────────────────────────

  resetWeek: (weekId) => {
    const state = get();
    const weekKey = `w${weekId}`;
    const nextUnlocked = { ...state.unlockedRooms };
    const nextStars    = { ...state.roomStars };
    const nextPP       = { ...state.weeklyPP };
    const nextCollect  = { ...state.collectiblesFound };

    for (let d = 0; d < 5; d++) {
      delete nextUnlocked[`${weekKey}_d${d}`];
      delete nextStars[`${weekKey}_d${d}`];
      delete nextCollect[`${weekKey}_d${d}_collectible`];
    }
    delete nextPP[weekKey];

    const updated = {
      ...state,
      unlockedRooms:     nextUnlocked,
      roomStars:         nextStars,
      weeklyPP:          nextPP,
      collectiblesFound: nextCollect,
    };
    set(updated);
    saveState(state.activeUserId, updated);
  },
}));

export default useChroniclesStore;
