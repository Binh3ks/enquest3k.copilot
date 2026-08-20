import React from 'react';
import { Trophy, Flame, Zap, X, Sparkles, Users, Target, ShieldCheck, Award } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';

/**
 * ClassCoopModal — Class Co-op Goal & Personal Milestones
 * Replaces competitive individual ranking to align with core project principle:
 * "No public individual ranking for young learners — use Class Co-op Goal & personal progress instead."
 */
export default function ClassLeaderboardModal({ isOpen, onClose }) {
  const currentUser = useUserStore((s) => s.currentUser);
  const userXP = useUserStore((s) => s.userXP || 1250);

  if (!isOpen) return null;

  const currentUserName = currentUser?.display_name || currentUser?.username || 'Learner';

  // Co-op Class Goal progress calculation
  const classGoalTotal = 1000;
  const currentClassXP = Math.min(userXP % 1000 + 450, classGoalTotal); // Co-op contribution
  const coopPercent = Math.round((currentClassXP / classGoalTotal) * 100);

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white rounded-3xl border-2 border-amber-400/40 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg">
              <Users size={24} />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                CLASS CO-OP GOAL <span className="text-xs px-2 py-0.5 bg-amber-400/20 text-amber-300 rounded-full font-bold">Week 33</span>
              </h2>
              <p className="text-xs text-indigo-200">Learn together · Achieve together</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Class Co-op Meter */}
          <div className="p-5 bg-white/10 rounded-3xl border border-white/15 space-y-3 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-amber-300 tracking-wider flex items-center gap-1.5">
                <Target size={16} /> CLASS WEEKLY GOAL: {currentClassXP} / {classGoalTotal} XP
              </span>
              <span className="text-xs font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                {coopPercent}% Completed
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-4 bg-slate-950/60 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400 rounded-full transition-all duration-1000 shadow-sm"
                style={{ width: `${Math.max(5, coopPercent)}%` }}
              />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed italic">
              🤝 Every quest you complete adds XP to your class goal! When the class reaches 1,000 XP, everyone unlocks the <strong>Golden Class Badge 🏆</strong>!
            </p>
          </div>

          {/* Personal Achievement Summary (Self-focused, positive) */}
          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-slate-300 tracking-wider block flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-purple-400" /> YOUR PERSONAL MILESTONES
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-1">
                <div className="flex items-center gap-2 text-amber-400">
                  <Zap size={18} />
                  <span className="text-xs font-bold text-slate-300">Total XP Balance</span>
                </div>
                <span className="text-2xl font-black text-white block">{userXP} XP</span>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-1">
                <div className="flex items-center gap-2 text-orange-400">
                  <Flame size={18} />
                  <span className="text-xs font-bold text-slate-300">Learning Streak</span>
                </div>
                <span className="text-2xl font-black text-white block">5 Days 🔥</span>
              </div>
            </div>

            {/* Badges Earned */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-slate-300 block flex items-center gap-1">
                <Award size={14} className="text-amber-400" /> Recent Badges Unlocked:
              </span>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-xl text-xs font-black">
                  🏆 Safety Hero
                </span>
                <span className="px-3 py-1 bg-purple-400/20 text-purple-300 border border-purple-400/30 rounded-xl text-xs font-black">
                  🎙️ Retell Master
                </span>
                <span className="px-3 py-1 bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 rounded-xl text-xs font-black">
                  📚 Webtoon Explorer
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white/5 border-t border-white/10 text-center">
          <span className="text-xs text-slate-300 font-bold flex items-center justify-center gap-1">
            <Sparkles size={14} className="text-amber-400" /> Keep learning to help your class reach 1,000 XP!
          </span>
        </div>
      </div>
    </div>
  );
}
