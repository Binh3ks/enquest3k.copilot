import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * useArcadeStore
 * Gamified Arcade Store with dynamic time locks & active learning heartbeat.
 *
 * Rules:
 *  1. Initial battery: 3 minutes play energy.
 *  2. Age-appropriate focus cycle threshold:
 *     - G1 (W01-W10): 10 mins (600s)
 *     - G2 (W11-W20): 12 mins (720s)
 *     - G3 (W21-W32): 15 mins (900s)
 *     - G4+ (W33+): 18 mins (1080s)
 *  3. Cumulative study milestone rewards per day:
 *     - 30 mins study (1800s) -> +5 mins (300s) game energy
 *     - 45 mins study (2700s) -> +5 mins (300s) game energy
 *     - 60 mins study (3600s) -> +5 mins (300s) game energy
 */

export const ARCADE_GAMES = [
  { id: 'bubble_pop',      num: 1,  title: 'Bubble Pop Dash',       icon: '🫧', minWeek: 1,   colorA: '#0284c7', colorB: '#0369a1', desc: 'Pop bubbles floating with 2D physics.' },
  { id: 'meteor_smasher',  num: 2,  title: 'Meteor Smasher',        icon: '🛸', minWeek: 11,  colorA: '#7c3aed', colorB: '#581c87', desc: 'Turret laser defense matching definitions.' },
  { id: 'physics_drift',   num: 3,  title: 'Highway Road Runner',   icon: '🏎️', minWeek: 21,  colorA: '#059669', colorB: '#065f46', desc: 'Collect target word stars on the vertical highway.' },
  { id: 'chunk_catapult',  num: 4,  title: 'Chunk Catapult Match',  icon: '🧩', minWeek: 31,  colorA: '#d97706', colorB: '#92400e', desc: 'Grammar, bilingual chunk & definition match.' },
  { id: 'neon_rider',      num: 5,  title: 'Neon Gravity Rider',    icon: '⚡', minWeek: 41,  colorA: '#ec4899', colorB: '#be185d', desc: 'Invert gravity jumping across syllable platforms.' },
  { id: 'castle_defense',  num: 6,  title: 'Castle Tower Defense',  icon: '🏰', minWeek: 51,  colorA: '#1d4ed8', colorB: '#1e293b', desc: 'Place towers to stop antonym/synonym word armies.' },
  { id: 'lightning_connect', num: 7, title: 'Lightning Connect',    icon: '⚡', minWeek: 61,  colorA: '#ca8a04', colorB: '#b45309', desc: 'Chain lightning through semantic word networks.' },
  { id: 'potion_lab',      num: 8,  title: 'Potion Chemistry Lab',  icon: '🧪', minWeek: 71,  colorA: '#0d9488', colorB: '#059669', desc: 'Mix prefix/root/suffix to brew perfect word potions.' },
  { id: 'temple_runner',   num: 9,  title: 'Temple Runner Chunks',  icon: '🏃', minWeek: 81,  colorA: '#c2410c', colorB: '#b91c1c', desc: 'Sprint through gates choosing the right linkers.' },
  { id: 'galaxy_orbit',    num: 10, title: 'Galaxy Word Orbit',     icon: '🌌', minWeek: 91,  colorA: '#4338ca', colorB: '#7e22ce', desc: 'Hold planets matching syllable stress patterns.' },
  { id: 'dragon_duel',     num: 11, title: 'Dragon Spell Duel',     icon: '🐉', minWeek: 101, colorA: '#b91c1c', colorB: '#92400e', desc: 'Type-battle the shadow dragon with perfect spelling.' },
  { id: 'grand_arena',     num: 12, title: 'Grand Master Arena',    icon: '👑', minWeek: 111, colorA: '#b45309', colorB: '#7e22ce', desc: 'The ultimate 4-skills boss battle championship.' }
];

export const ARCADE_GAME_CATALOG = ARCADE_GAMES;

export function getFocusCycleSeconds(weekNumber) {
  const w = parseInt(weekNumber) || 33;
  if (w <= 10) return 600;  // 10 mins for Grade 1
  if (w <= 20) return 720;  // 12 mins for Grade 2
  if (w <= 32) return 900;  // 15 mins for Grade 3
  return 1080;              // 18 mins for Grade 4-5
}

export function getUnlockedGameCount(weekNumber) {
  const w = parseInt(weekNumber) || 33;
  return ARCADE_GAMES.filter(g => w >= g.minWeek).length;
}

export const useArcadeStore = create(
  persist(
    (set, get) => ({
      studySeconds: 0,
      playEnergySeconds: 180, // 3 minutes initially
      lastActiveTimestamp: Date.now(),
      dailyDate: new Date().toDateString(),
      rewardedMilestones: [], // e.g. [1800, 2700, 3600]
      isArcadeOpen: false,
      showBreakPrompt: false,
      breakPromptDismissedCycle: false,
      activeGameId: 'bubble_pop',
      highScores: {},

      setArcadeOpen: (isOpen) => set({ isArcadeOpen: isOpen }),
      setShowBreakPrompt: (show) => set({ showBreakPrompt: show }),
      setActiveGame: (gameId) => set({ activeGameId: gameId }),

      // Active learning heartbeat (called on real user inputs: clicks, audio, typing)
      recordActiveInteraction: (weekNumber = 33) => {
        const now = Date.now();
        const prev = get().lastActiveTimestamp;
        const delta = Math.min(10, Math.max(1, Math.round((now - prev) / 1000)));

        // Day check — reset daily study counters if new day
        const todayStr = new Date().toDateString();
        let currentStudy = get().studySeconds;
        let milestones = get().rewardedMilestones || [];

        if (get().dailyDate !== todayStr) {
          currentStudy = 0;
          milestones = [];
        }

        // If inactive for > 45s, do not add bulk time (prevents AFK idling)
        if (now - prev > 45000) {
          set({ lastActiveTimestamp: now, dailyDate: todayStr });
          return;
        }

        currentStudy += delta;
        let bonusEnergy = 0;
        let nextMilestones = [...milestones];

        // 30 min milestone (1800s) -> +5m (300s)
        if (currentStudy >= 1800 && !nextMilestones.includes(1800)) {
          bonusEnergy += 300;
          nextMilestones.push(1800);
        }
        // 45 min milestone (2700s) -> +5m (300s)
        if (currentStudy >= 2700 && !nextMilestones.includes(2700)) {
          bonusEnergy += 300;
          nextMilestones.push(2700);
        }
        // 60 min milestone (3600s) -> +5m (300s)
        if (currentStudy >= 3600 && !nextMilestones.includes(3600)) {
          bonusEnergy += 300;
          nextMilestones.push(3600);
        }

        // Check age-appropriate focus cycle threshold (e.g. 18m)
        const focusReq = getFocusCycleSeconds(weekNumber);
        let triggerPrompt = false;
        if (currentStudy >= focusReq && !get().breakPromptDismissedCycle && !get().isArcadeOpen) {
          triggerPrompt = true;
        }

        set({
          studySeconds: currentStudy,
          playEnergySeconds: get().playEnergySeconds + bonusEnergy,
          rewardedMilestones: nextMilestones,
          showBreakPrompt: triggerPrompt ? true : get().showBreakPrompt,
          lastActiveTimestamp: now,
          dailyDate: todayStr,
        });
      },

      // Dismiss break prompt for current cycle
      dismissBreakPrompt: () => {
        set({ showBreakPrompt: false, breakPromptDismissedCycle: true });
      },

      // Consume play energy while playing games (1s tick)
      consumePlayEnergy: (seconds = 1) => {
        const current = get().playEnergySeconds;
        const next = Math.max(0, current - seconds);
        set({ playEnergySeconds: next });
        return next > 0;
      },

      highScores: {}, // { gameId: number }
      bestReactionTimes: {}, // { gameId: seconds (e.g. 0.8) }
      bestSpeedrunTimes: {}, // { gameId: seconds (e.g. 54.2) }

      // Record high score
      recordHighScore: (gameId, score) => {
        const scores = { ...get().highScores };
        if (!scores[gameId] || score > scores[gameId]) {
          scores[gameId] = score;
          set({ highScores: scores });
        }
      },

      // Record best single reflex reaction time (lower is better)
      recordBestReaction: (gameId, seconds) => {
        if (!seconds || seconds <= 0) return;
        const current = get().bestReactionTimes[gameId];
        if (!current || seconds < current) {
          set({
            bestReactionTimes: {
              ...get().bestReactionTimes,
              [gameId]: Number(seconds.toFixed(2))
            }
          });
        }
      },

      // Record best full-clear speedrun time (lower is better)
      recordSpeedrunTime: (gameId, seconds) => {
        if (!seconds || seconds <= 0) return;
        const current = get().bestSpeedrunTimes[gameId];
        if (!current || seconds < current) {
          set({
            bestSpeedrunTimes: {
              ...get().bestSpeedrunTimes,
              [gameId]: Number(seconds.toFixed(1))
            }
          });
        }
      }
    }),
    {
      name: 'engquest_arcade_store_v1',
      partialize: (state) => ({
        studySeconds: state.studySeconds,
        playEnergySeconds: state.playEnergySeconds,
        dailyDate: state.dailyDate,
        rewardedMilestones: state.rewardedMilestones,
        lastActiveTimestamp: state.lastActiveTimestamp,
        highScores: state.highScores,
        bestReactionTimes: state.bestReactionTimes,
        bestSpeedrunTimes: state.bestSpeedrunTimes,
      }),
    }
  )
);

export default useArcadeStore;
