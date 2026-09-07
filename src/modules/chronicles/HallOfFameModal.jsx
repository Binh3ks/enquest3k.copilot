/**
 * HallOfFameModal.jsx — The Lexio Chronicles Speedrunner Hall of Fame
 *
 * 100% English Immersion.
 * Displays player's Personal Best times and compares against Academy Speedrunners.
 */

import React, { useState } from 'react';
import { Trophy, Zap, Timer, Medal, Crown, Star, X, Sparkles } from 'lucide-react';
import useChroniclesStore from '../../stores/useChroniclesStore';

const ACADEMY_SPEEDRUNNERS = [
  { rank: 1, name: 'Alex M.', avatar: '⚡', time: '18.4s', title: 'Grand Master', tier: 'diamond' },
  { rank: 2, name: 'Emma W.', avatar: '🌟', time: '21.2s', title: 'Grand Master', tier: 'diamond' },
  { rank: 3, name: 'Liam K.', avatar: '🔥', time: '23.6s', title: 'Syntax Ace', tier: 'gold' },
  { rank: 4, name: 'Sophia T.', avatar: '🦊', time: '25.8s', title: 'Speed Demon', tier: 'gold' },
  { rank: 5, name: 'Lucas H.', avatar: '🛡️', time: '28.5s', title: 'Grammar Knight', tier: 'silver' },
  { rank: 6, name: 'Mia R.', avatar: '💎', time: '31.0s', title: 'Challenger', tier: 'silver' },
];

const GAME_NAMES = {
  spell_train: 'Spell Sentence Train',
  arcane_bubble: 'Arcane Bubble Pop',
  lexical_det: 'Lexical Detective',
  crystal_match: 'Crystal Memory Match',
  rune_forge: 'Rune Forge',
  ancient_scroll: 'Ancient Scroll Cloze',
};

export default function HallOfFameModal({ isOpen, onClose, currentGameId = 'spell_train', playerTime = null }) {
  const [selectedGame, setSelectedGame] = useState(currentGameId);
  const personalBests = useChroniclesStore((s) => s.personalBests || {});

  if (!isOpen) return null;

  const currentPB = personalBests[selectedGame] || playerTime || null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border-2 border-amber-500/50 rounded-2xl p-5 shadow-2xl relative flex flex-col max-h-[90vh] text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20">
            🏆
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-400 tracking-wider uppercase">
              <Sparkles size={13} /> <span>Speedrunner Records</span>
            </div>
            <h3 className="text-lg font-black text-white">HALL OF FAME</h3>
          </div>
        </div>

        {/* Game Selector Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-thin">
          {Object.entries(GAME_NAMES).map(([id, name]) => (
            <button
              key={id}
              onClick={() => setSelectedGame(id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedGame === id
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Player's Personal Best Card */}
        <div className="p-3.5 bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/5 border border-amber-500/30 rounded-xl mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">⚡</span>
            <div>
              <div className="text-[10px] uppercase font-black tracking-wider text-amber-400">
                Your Personal Best
              </div>
              <div className="text-sm font-bold text-slate-200">
                {GAME_NAMES[selectedGame] || 'Mini-Game'}
              </div>
            </div>
          </div>
          <div className="text-right">
            {currentPB ? (
              <div className="text-xl font-black text-amber-300 font-mono flex items-center gap-1">
                <Timer size={16} /> <span>{currentPB}s</span>
              </div>
            ) : (
              <span className="text-xs text-slate-400 font-semibold italic">No record yet</span>
            )}
            <span className="text-[10px] text-emerald-400 font-bold">Top 5% Tier</span>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex justify-between px-2">
            <span>Rank & Player</span>
            <span>Fastest Clear</span>
          </div>

          {ACADEMY_SPEEDRUNNERS.map((runner) => (
            <div
              key={runner.rank}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                runner.rank === 1
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                  : runner.rank === 2
                  ? 'bg-slate-700/40 border-slate-600/50 text-slate-200'
                  : runner.rank === 3
                  ? 'bg-amber-900/20 border-amber-700/30 text-amber-300/90'
                  : 'bg-slate-800/40 border-white/5 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-5 text-center font-black text-xs">
                  {runner.rank === 1 ? '🥇' : runner.rank === 2 ? '🥈' : runner.rank === 3 ? '🥉' : `#${runner.rank}`}
                </span>
                <span className="text-base">{runner.avatar}</span>
                <div>
                  <div className="text-xs font-bold leading-tight">{runner.name}</div>
                  <div className="text-[10px] text-slate-400 font-medium">{runner.title}</div>
                </div>
              </div>
              <div className="font-mono font-black text-xs sm:text-sm text-right">
                {runner.time}
              </div>
            </div>
          ))}

          {/* Player rank relative placeholder */}
          <div className="flex items-center justify-between p-2.5 rounded-xl border-2 border-emerald-500/60 bg-emerald-500/10 text-emerald-200 mt-3">
            <div className="flex items-center gap-2.5">
              <span className="w-5 text-center font-black text-xs text-emerald-400">#4</span>
              <span className="text-base">🦊</span>
              <div>
                <div className="text-xs font-black leading-tight text-white">YOU (Champion)</div>
                <div className="text-[10px] text-emerald-300 font-medium">Active Explorer</div>
              </div>
            </div>
            <div className="font-mono font-black text-xs sm:text-sm text-emerald-300">
              {currentPB ? `${currentPB}s` : 'Playing...'}
            </div>
          </div>
        </div>

        {/* Bottom dismiss */}
        <button
          onClick={onClose}
          className="mt-4 w-full py-2.5 bg-amber-500 hover:bg-amber-400 active:scale-98 text-slate-950 font-black rounded-xl text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          Close Hall of Fame
        </button>
      </div>
    </div>
  );
}
