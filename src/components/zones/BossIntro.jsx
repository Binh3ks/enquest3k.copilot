import React from 'react';
import { Shield, Trophy, PlayCircle, Sparkles } from 'lucide-react';

export default function BossIntro({ rotaryConfig, onStartBattle, userShields = 0, currentTasks = [], selectedIndex = 0, onSelectTask }) {
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

        <div className="bg-purple-900/60 px-3 py-1.5 rounded-xl border border-purple-400/30 flex items-center gap-1.5">
          <Shield className="text-amber-400" size={16} />
          <div className="text-xs font-black text-white">{userShields} Shields</div>
        </div>
      </div>

      {/* Task Selection Grid — allows student to choose any of the 3 tasks */}
      {currentTasks.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-300 block">
            Choose Mission to Challenge:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {currentTasks.map((t, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onSelectTask && onSelectTask(idx)}
                  className={`p-2.5 rounded-xl border text-left transition active:scale-95 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border-amber-400 shadow-lg ring-2 ring-amber-300/40'
                      : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase text-amber-300">Task {idx + 1}</div>
                  <div className="text-xs font-black text-white truncate">{t.name}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Action CTA */}
      <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
        <span className="text-[11px] text-slate-400 font-medium">
          Cambridge A2 Flyers Challenge (~{rotaryConfig.approxDurationMin}m)
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
