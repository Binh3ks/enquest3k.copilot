import React from 'react';
import { Shield, Trophy, Zap, PlayCircle, Star, Sparkles } from 'lucide-react';

export default function BossIntro({ rotaryConfig, onStartBattle, userShields = 0 }) {
  if (!rotaryConfig) return null;

  return (
    <div className="w-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 border-2 border-purple-500/50 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Header Banner */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-purple-500/30 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 p-0.5 shadow-lg flex items-center justify-center text-3xl">
            {rotaryConfig.bossAvatar || '👑'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-purple-500/30 text-purple-200 border border-purple-400/40">
                Cycle {rotaryConfig.cycleNumber}/5 • Week {rotaryConfig.weekNumber}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-500/30 text-amber-300 border border-amber-400/40 flex items-center gap-1">
                <Trophy size={11} /> {rotaryConfig.shieldCount} Shields at Stake
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-purple-200 mt-0.5">
              {rotaryConfig.bossTitle}
            </h2>
          </div>
        </div>

        <div className="bg-purple-900/60 px-4 py-2 rounded-2xl border border-purple-400/30 flex items-center gap-2">
          <Shield className="text-amber-400" size={20} />
          <div>
            <div className="text-[10px] uppercase font-bold text-purple-300">Your Shields</div>
            <div className="text-sm font-black text-white">{userShields} / 15 Total</div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h3 className="text-base font-black text-purple-200 flex items-center gap-1.5">
          <Sparkles className="text-amber-400" size={16} />
          {rotaryConfig.cycleName}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {rotaryConfig.bossDescription}
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] uppercase font-black text-slate-400">Time Limit</div>
          <div className="text-sm font-black text-amber-300">~{rotaryConfig.approxDurationMin} Minutes</div>
        </div>
        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] uppercase font-black text-slate-400">Exam Standard</div>
          <div className="text-sm font-black text-cyan-300">Cambridge A2 Flyers</div>
        </div>
        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] uppercase font-black text-slate-400">Feedback Mode</div>
          <div className="text-sm font-black text-emerald-300">Instant Official Score</div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
        <span className="text-xs text-slate-400 font-medium">
          ⚠️ Complete all tasks in this zone to earn official Cambridge Shields!
        </span>
        <button
          type="button"
          onClick={onStartBattle}
          className="px-6 py-3.5 bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-purple-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <PlayCircle size={18} />
          ENTER BOSS BATTLE NOW
        </button>
      </div>
    </div>
  );
}
