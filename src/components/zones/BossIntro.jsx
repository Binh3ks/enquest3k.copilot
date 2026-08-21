import React from 'react';
import { Shield, Trophy, PlayCircle } from 'lucide-react';

export default function BossIntro({ rotaryConfig, onStartBattle, userShields = 0, currentTask }) {
  if (!rotaryConfig) return null;

  return (
    <div className="w-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 border-2 border-purple-500/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
      {/* Header Banner */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-purple-500/30 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-400 p-0.5 shadow-md flex items-center justify-center text-2xl shrink-0">
            {rotaryConfig.bossAvatar || '👑'}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-purple-500/30 text-purple-200 border border-purple-400/40">
                Cycle {rotaryConfig.cycleNumber}/5 • Week {rotaryConfig.weekNumber}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-500/30 text-amber-300 border border-amber-400/40 flex items-center gap-1">
                <Trophy size={10} /> {rotaryConfig.shieldCount} Shields
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-purple-200 mt-0.5">
              {rotaryConfig.bossTitle}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.location.href = `/week/${rotaryConfig.weekNumber || 33}/hub/1`}
            className="px-3 py-1.5 bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-400/40 rounded-xl text-xs font-black flex items-center gap-1 transition active:scale-95 shadow shrink-0"
          >
            ← Map
          </button>
          <div className="bg-purple-900/60 px-3 py-1.5 rounded-xl border border-purple-400/30 flex items-center gap-1.5">
            <Shield className="text-amber-400" size={16} />
            <div className="text-xs font-black text-white">{userShields} Shields</div>
          </div>
        </div>
      </div>

      {/* Current Task Description */}
      {currentTask && (
        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/80 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-black uppercase text-amber-300 block">Mission Objective</span>
            <div className="text-xs sm:text-sm font-black text-white">{currentTask.name}</div>
          </div>
          <span className="px-2.5 py-1 bg-purple-600/40 border border-purple-400/40 text-purple-200 rounded-lg text-xs font-bold shrink-0">
            Cambridge A2 Flyers
          </span>
        </div>
      )}

      {/* Action CTA */}
      <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
        <span className="text-[11px] text-slate-400 font-medium">
          ~{rotaryConfig.approxDurationMin}m • Instant official Cambridge score
        </span>
        <button
          type="button"
          onClick={onStartBattle}
          className="px-6 py-2.5 sm:py-3 bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white rounded-xl font-black text-xs sm:text-sm shadow-lg shadow-purple-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
        >
          <PlayCircle size={16} />
          ENTER BOSS BATTLE NOW
        </button>
      </div>
    </div>
  );
}
