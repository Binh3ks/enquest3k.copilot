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

// ─── ROOM DOOR DEFINITIONS ────────────────────────────────────────────────────

// ─── CHAMBER / ROOM METADATA ─────────────────────────────────────────────────

export const CHAMBER_METADATA = [
  { chamberName: 'Mật Thất Cổ Tự',    chamberEn: 'Chamber of Tales',  icon: '📜', zoneRef: 'Day 1' },
  { chamberName: 'Phòng Luyện Kim',   chamberEn: 'Alchemy Lab',       icon: '⚗️', zoneRef: 'Day 2' },
  { chamberName: 'Đấu Trường Sấm',   chamberEn: 'Thunder Arena',     icon: '⚡', zoneRef: 'Day 3' },
  { chamberName: 'Thánh Điện Lò Rèn', chamberEn: 'Rune Sanctum',      icon: '⚒️', zoneRef: 'Day 4' },
  { chamberName: 'Đỉnh Tháp Bão Tố',  chamberEn: 'Apex Spire',        icon: '🏰', zoneRef: 'Day 5' },
];

/**
 * 3 challenge doors per room.
 * Each room maps to 1 zone/day.
 * Door mini-game types rotate by dayIndex (0-4).
 */
export const DOOR_ROTATION = [
  // dayIndex 0 (Day 1: Story World)
  [
    { id: 'arcane_bubble', type: 'vocab',       duration: 60, label: 'Arcane Bubble Pop', gameNameVi: 'Bong Bóng Từ Vựng', icon: '🔮' },
    { id: 'spell_train',   type: 'grammar',     duration: 90, label: 'Spell Sentence Train', gameNameVi: 'Đoàn Tàu Ngữ Pháp', icon: '🚂' },
    { id: 'lexical_det',   type: 'integration', duration: 90, label: 'Lexical Detective', gameNameVi: 'Thám Tử Từ Vựng', icon: '🕵️‍♂️' },
  ],
  // dayIndex 1 (Day 2: Knowledge Lab)
  [
    { id: 'crystal_match', type: 'vocab',       duration: 75, label: 'Crystal Memory Match', gameNameVi: 'Lật Thẻ Tinh Thể', icon: '💎' },
    { id: 'rune_forge',    type: 'grammar',     duration: 75, label: 'Rune Forge', gameNameVi: 'Lò Rèn Cổ Tự', icon: '⚒️' },
    { id: 'ancient_scroll',type: 'integration', duration: 120, label: 'Ancient Scroll Fill', gameNameVi: 'Cuộn Giấy Cổ', icon: '📜' },
  ],
  // dayIndex 2 (Day 3: Battle Arena)
  [
    { id: 'crystal_match', type: 'vocab',       duration: 75, label: 'Crystal Memory Match', gameNameVi: 'Lật Thẻ Tinh Thể', icon: '💎' },
    { id: 'spell_train',   type: 'grammar',     duration: 90, label: 'Spell Sentence Train', gameNameVi: 'Đoàn Tàu Ngữ Pháp', icon: '🚂' },
    { id: 'lexical_det',   type: 'integration', duration: 90, label: 'Lexical Detective', gameNameVi: 'Thám Tử Từ Vựng', icon: '🕵️‍♂️' },
  ],
  // dayIndex 3 (Day 4: Creator Studio)
  [
    { id: 'arcane_bubble', type: 'vocab',       duration: 60, label: 'Arcane Bubble Pop', gameNameVi: 'Bong Bóng Từ Vựng', icon: '🔮' },
    { id: 'rune_forge',    type: 'grammar',     duration: 75, label: 'Rune Forge', gameNameVi: 'Lò Rèn Cổ Tự', icon: '⚒️' },
    { id: 'ancient_scroll',type: 'integration', duration: 120, label: 'Ancient Scroll Fill', gameNameVi: 'Cuộn Giấy Cổ', icon: '📜' },
  ],
  // dayIndex 4 (Day 5: Boss Castle — comprehensive)
  [
    { id: 'crystal_match', type: 'vocab',       duration: 75, label: 'Crystal Memory Match', gameNameVi: 'Lật Thẻ Tinh Thể', icon: '💎' },
    { id: 'spell_train',   type: 'grammar',     duration: 90, label: 'Spell Sentence Train', gameNameVi: 'Đoàn Tàu Ngữ Pháp', icon: '🚂' },
    { id: 'ancient_scroll',type: 'integration', duration: 120, label: 'Ancient Scroll Fill', gameNameVi: 'Cuộn Giấy Cổ', icon: '📜' },
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
  const accuracy  = correct / total;
  const timeBonus = Math.max(0, 1 - (timeTaken / maxTime));
  const score     = accuracy * 0.7 + timeBonus * 0.3;
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
      unlockedRooms:        state.unlockedRooms,
      roomStars:            state.roomStars,
      weeklyPP:             state.weeklyPP,
      bossDefeated:         state.bossDefeated,
      bossAccessTier:       state.bossAccessTier,
      lexioCoins:           state.lexioCoins,
      collectiblesFound:    state.collectiblesFound,
      bossFragments:        state.bossFragments,
      chapterBossCompleted: state.chapterBossCompleted,
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
    const chapterFragKey = `c${getChapterForWeek(weekId).id}`;
    const currentFrags   = state.bossFragments[chapterFragKey] || 0;

    const nextBossDefeated   = { ...state.bossDefeated,   [weekKey]: true };
    const nextBossAccessTier = { ...state.bossAccessTier, [weekKey]: tier };
    const nextFragments      = {
      ...state.bossFragments,
      [chapterFragKey]: earnedFragment ? currentFrags + 1 : currentFrags,
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

  isBossDefeated: (weekId) => Boolean(get().bossDefeated[`w${weekId}`]),

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
