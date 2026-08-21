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
  { id: 'bubble_pop', num: 1, title: 'Bubble Pop Dash', icon: '🫧', minWeek: 1, color: 'from-cyan-500 to-blue-600', desc: 'Pop floating vocab bubbles before they fly away!' },
  { id: 'meteor_smasher', num: 2, title: 'Vocab Meteor Smasher', icon: '🛸', minWeek: 11, color: 'from-purple-600 to-indigo-600', desc: 'Blast incoming asteroids with Lexio laser cannon!' },
  { id: 'physics_drift', num: 3, title: 'Physics Drift Race', icon: '🚗', minWeek: 21, color: 'from-emerald-500 to-teal-600', desc: 'Adjust friction & brake in time to beat the track!' },
  { id: 'chunk_catapult', num: 4, title: 'Chunk Catapult', icon: '🧩', minWeek: 31, color: 'from-amber-500 to-orange-600', desc: 'Launch word chunks in the correct grammar order!' },
  { id: 'sound_sniper', num: 5, title: 'Sound Sniper', icon: '🏹', minWeek: 41, color: 'from-rose-500 to-pink-600', desc: 'Target tricky homophones and phonetic minimal pairs.' },
  { id: 'castle_defense', num: 6, title: 'Castle Tower Defense', icon: '🏰', minWeek: 51, color: 'from-blue-600 to-slate-800', desc: 'Defend the fortress using antonyms and synonyms.' },
  { id: 'lightning_connect', num: 7, title: 'Lightning Connect', icon: '⚡', minWeek: 61, color: 'from-yellow-400 to-amber-500', desc: 'Chain electric lightning through semantic word webs.' },
  { id: 'potion_lab', num: 8, title: 'Potion Chemistry Lab', icon: '🧪', minWeek: 71, color: 'from-teal-400 to-emerald-600', desc: 'Mix nouns, verbs and adverbs to brew magic potions.' },
  { id: 'temple_runner', num: 9, title: 'Temple Runner Chunks', icon: '🏃', minWeek: 81, color: 'from-orange-600 to-red-700', desc: 'Dash past ancient obstacles choosing sentence linkers.' },
  { id: 'galaxy_orbit', num: 10, title: 'Galaxy Word Orbit', icon: '🌌', minWeek: 91, color: 'from-indigo-700 to-purple-900', desc: 'Align cosmic planets by syllable stress and meter.' },
  { id: 'dragon_duel', num: 11, title: 'Dragon Spell Duel', icon: '🐉', minWeek: 101, color: 'from-red-600 to-amber-700', desc: 'Cast speed spelling spells to defeat the shadow dragon.' },
  { id: 'grand_arena', num: 12, title: 'Grand Master Arena', icon: '👑', minWeek: 111, color: 'from-amber-400 via-purple-600 to-indigo-800', desc: 'The ultimate 4-skills boss speed challenge.' }
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
