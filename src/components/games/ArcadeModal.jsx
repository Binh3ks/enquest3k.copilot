import React, { useState } from 'react';
import { X, Play, Lock, BatteryCharging, Battery, Trophy, Sparkles, ArrowLeft, RotateCcw } from 'lucide-react';
import useArcadeStore, { ARCADE_GAME_CATALOG, getUnlockedGameCount, getFocusCycleSeconds } from '../../stores/useArcadeStore';
import BubblePopGame from './BubblePopGame';
import MeteorSmasherGame from './MeteorSmasherGame';
import PhysicsDriftGame from './PhysicsDriftGame';
import CatapultChunkGame from './CatapultChunkGame';

export default function ArcadeModal({ weekNumber = 33, isOpen = false, onClose }) {
  const {
    studySeconds,
    playEnergySeconds,
    activeGameId,
    setActiveGame,
    highScores
  } = useArcadeStore();

  const [selectedGame, setSelectedGame] = useState(null);

  const unlockedCount = getUnlockedGameCount(weekNumber);
  const focusCycleReq = getFocusCycleSeconds(weekNumber);
  const isBatteryCharged = playEnergySeconds > 0;

  const formatEnergy = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 border-4 border-cyan-500/40 rounded-3xl p-5 sm:p-7 max-w-4xl w-full text-white shadow-2xl relative overflow-hidden flex flex-col justify-between max-h-[92vh]">
        
        {/* Arcade Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 text-slate-950 flex items-center justify-center text-xl font-black shadow-lg shadow-cyan-500/30">
              🕹️
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                ENGQUEST ARCADE ROOM
                <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/40">
                  {unlockedCount}/12 UNLOCKED
                </span>
              </h3>
              <p className="text-xs text-indigo-300">
                1-Minute Micro-Break Games · Data-Driven from Week {weekNumber}
              </p>
            </div>
          </div>

          {/* Arcade Battery Status */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-black ${
              isBatteryCharged
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-emerald-500/20'
                : 'bg-rose-500/20 border-rose-400 text-rose-300'
            }`}>
              {isBatteryCharged ? <BatteryCharging size={16} className="text-emerald-400 animate-pulse" /> : <Battery size={16} />}
              <span>
                {isBatteryCharged
                  ? `PLAY BATTERY: ${formatEnergy(playEnergySeconds)} (Max 3m)`
                  : `BATTERY EMPTY (${Math.round((studySeconds / focusCycleReq) * 100)}% charged)`}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="py-4 flex-1 overflow-y-auto min-h-[380px]">
          
          {/* Game Selection Mode */}
          {!selectedGame && (
            <div className="space-y-4">
              {!isBatteryCharged && (
                <div className="p-3 bg-amber-500/10 border border-amber-400/30 rounded-2xl text-xs text-amber-300 font-bold flex items-center gap-2">
                  <span>⚡</span>
                  <span>
                    Study for 15 minutes in Quests to recharge your 3-minute Arcade Battery! Current progress: {Math.floor(studySeconds / 60)}m / {Math.floor(focusCycleReq / 60)}m.
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ARCADE_GAME_CATALOG.map((game, idx) => {
                  const isUnlocked = idx < unlockedCount;
                  const highScore = highScores[game.id] || 0;

                  return (
                    <div
                      key={game.id}
                      onClick={() => {
                        if (isUnlocked && isBatteryCharged) setSelectedGame(game.id);
                      }}
                      className={`p-3.5 rounded-2xl border-2 transition-all relative overflow-hidden flex flex-col justify-between space-y-3 ${
                        isUnlocked && isBatteryCharged
                          ? 'bg-slate-900/90 border-cyan-400/50 hover:border-cyan-300 hover:scale-[1.03] cursor-pointer shadow-lg shadow-cyan-500/10 group'
                          : isUnlocked
                          ? 'bg-slate-900/60 border-slate-700 opacity-60 cursor-not-allowed'
                          : 'bg-slate-950/40 border-slate-800 opacity-40 grayscale cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-xl shadow-md`}>
                          {game.icon}
                        </div>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                          isUnlocked
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'bg-slate-800 text-slate-500'
                        }`}>
                          {isUnlocked ? `GAME #${game.num}` : `W${game.minWeek}+`}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-xs font-black text-white group-hover:text-cyan-300 transition truncate">
                          {game.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">
                          {game.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
                        {isUnlocked ? (
                          <>
                            <span className="text-amber-400 font-bold flex items-center gap-1">
                              <Trophy size={11} /> {highScore} PTS
                            </span>
                            <span className="text-cyan-400 font-bold group-hover:translate-x-0.5 transition">
                              Play 1m ▶
                            </span>
                          </>
                        ) : (
                          <span className="text-slate-500 font-bold flex items-center gap-1">
                            <Lock size={11} /> Unlocks at Week {game.minWeek}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active Game Playing Mode */}
          {selectedGame && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setSelectedGame(null)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition"
              >
                <ArrowLeft size={14} /> Back to Game Catalog
              </button>

              <div className="w-full">
                {selectedGame === 'bubble_pop' && (
                  <BubblePopGame onComplete={() => {}} />
                )}
                {selectedGame === 'meteor_smasher' && (
                  <MeteorSmasherGame onComplete={() => {}} />
                )}
                {selectedGame === 'physics_drift' && (
                  <PhysicsDriftGame onComplete={() => {}} />
                )}
                {selectedGame === 'chunk_catapult' && (
                  <CatapultChunkGame onComplete={() => {}} />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Arcade Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
          <span>🎮 10-Week Milestone Unlocks · 1 Minute per game session</span>
          <span className="text-cyan-400 font-bold">15m Study ➔ 3m Arcade Battery Recharge</span>
        </div>
      </div>
    </div>
  );
}
