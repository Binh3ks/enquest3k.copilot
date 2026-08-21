import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Focus cycle requirements by week stage (Dynamic Focus Cycle):
 * - Stage 1 (Starters, W01-W16): 8 mins (480s)
 * - Stage 2 (Movers, W17-W32): 12 mins (720s)
 * - Stage 3 (Flyers, W33-W52): 15 mins (900s)
 * - Stage 4 (KET/PET, W53+): 20 mins (1200s)
 */
export const getFocusCycleSeconds = (weekNumber = 33) => {
  const w = parseInt(weekNumber, 10) || 33;
  if (w <= 16) return 480;
  if (w <= 32) return 720;
  if (w <= 52) return 900;
  return 1200;
};

export const getUnlockedGameCount = (weekNumber = 33) => {
  const w = parseInt(weekNumber, 10) || 33;
  return Math.min(12, Math.max(1, Math.floor((w - 1) / 10) + 1));
};

export const ARCADE_GAME_CATALOG = [
  { id: 'bubble_pop',      num: 1,  title: 'Bubble Pop Dash',       icon: '🫧', minWeek: 1,   colorA: '#06b6d4', colorB: '#3b82f6', desc: 'Pop flying vocab bubbles before they escape!' },
  { id: 'meteor_smasher',  num: 2,  title: 'Vocab Meteor Smasher',  icon: '🛸', minWeek: 11,  colorA: '#7c3aed', colorB: '#4f46e5', desc: 'Swipe-laser incoming meteors with the right word!' },
  { id: 'physics_drift',   num: 3,  title: 'Physics Drift Race',    icon: '🚗', minWeek: 21,  colorA: '#059669', colorB: '#0d9488', desc: 'Navigate obstacles using CLIL science knowledge!' },
  { id: 'chunk_catapult',  num: 4,  title: 'Chunk Catapult',        icon: '🧩', minWeek: 31,  colorA: '#d97706', colorB: '#ea580c', desc: 'Drag grammar chunks into exact sentence order!' },
  { id: 'sound_sniper',    num: 5,  title: 'Sound Sniper',          icon: '🏹', minWeek: 41,  colorA: '#e11d48', colorB: '#db2777', desc: 'Aim & fire at minimal pair pronunciation targets.' },
  { id: 'castle_defense',  num: 6,  title: 'Castle Tower Defense',  icon: '🏰', minWeek: 51,  colorA: '#1d4ed8', colorB: '#1e293b', desc: 'Place towers to stop antonym/synonym word armies.' },
  { id: 'lightning_connect', num: 7, title: 'Lightning Connect',    icon: '⚡', minWeek: 61,  colorA: '#ca8a04', colorB: '#b45309', desc: 'Chain lightning through semantic word networks.' },
  { id: 'potion_lab',      num: 8,  title: 'Potion Chemistry Lab',  icon: '🧪', minWeek: 71,  colorA: '#0d9488', colorB: '#059669', desc: 'Mix prefix/root/suffix to brew perfect word potions.' },
  { id: 'temple_runner',   num: 9,  title: 'Temple Runner Chunks',  icon: '🏃', minWeek: 81,  colorA: '#c2410c', colorB: '#b91c1c', desc: 'Sprint through gates choosing the right linkers.' },
  { id: 'galaxy_orbit',    num: 10, title: 'Galaxy Word Orbit',     icon: '🌌', minWeek: 91,  colorA: '#4338ca', colorB: '#7e22ce', desc: 'Hold planets matching syllable stress patterns.' },
  { id: 'dragon_duel',     num: 11, title: 'Dragon Spell Duel',     icon: '🐉', minWeek: 101, colorA: '#b91c1c', colorB: '#92400e', desc: 'Type-battle the shadow dragon with perfect spelling.' },
  { id: 'grand_arena',     num: 12, title: 'Grand Master Arena',    icon: '👑', minWeek: 111, colorA: '#b45309', colorB: '#7e22ce', desc: 'The ultimate 4-skills boss battle championship.' }
];


export const useArcadeStore = create(
  persist(
    (set, get) => ({
      studySeconds: 0,
      playEnergySeconds: 180, // 3 minutes initially or recharged
      lastActiveTimestamp: Date.now(),
      isArcadeOpen: false,
      activeGameId: 'bubble_pop',
      highScores: {},

      setArcadeOpen: (isOpen) => set({ isArcadeOpen: isOpen }),
      setActiveGame: (gameId) => set({ activeGameId: gameId }),

      // Active learning heartbeat (called on real user inputs: clicks, audio, typing)
      recordActiveInteraction: (weekNumber = 33) => {
        const now = Date.now();
        const prev = get().lastActiveTimestamp;
        const delta = Math.min(10, Math.max(1, Math.round((now - prev) / 1000)));

        // If inactive for > 45s, do not add bulk time (prevents AFK idling)
        if (now - prev > 45000) {
          set({ lastActiveTimestamp: now });
          return;
        }

        const currentStudy = get().studySeconds + delta;
        const focusReq = getFocusCycleSeconds(weekNumber);

        // If study requirement met (e.g. 15 mins), recharge 3 minutes play energy
        if (currentStudy >= focusReq && get().playEnergySeconds < 180) {
          set({
            studySeconds: 0,
            playEnergySeconds: 180,
            lastActiveTimestamp: now
          });
        } else {
          set({
            studySeconds: currentStudy,
            lastActiveTimestamp: now
          });
        }
      },

      // Consume play energy while playing games (1s tick)
      consumePlayEnergy: (seconds = 1) => {
        const current = get().playEnergySeconds;
        const next = Math.max(0, current - seconds);
        set({ playEnergySeconds: next });
        return next > 0;
      },

      // Record high score
      recordHighScore: (gameId, score) => {
        const scores = { ...get().highScores };
        if (!scores[gameId] || score > scores[gameId]) {
          scores[gameId] = score;
          set({ highScores: scores });
        }
      }
    }),
    {
      name: 'engquest_arcade_store_v1'
    }
  )
);

export default useArcadeStore;
