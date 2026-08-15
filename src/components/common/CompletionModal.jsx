import React from 'react';
import { Star, Trophy, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import NovaMascot from '../NovaMascot';

export default function CompletionModal({
  isOpen,
  onClose,
  score = 100,
  stars = 3,
  xpEarned = 50,
  srsWordsAdded = 5,
  activityTitle = 'Item Hunt Mission'
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in font-sans">
      <div className="bg-white border-2 border-amber-300 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 relative overflow-hidden transform transition-all scale-100">
        
        {/* Glow backdrop decorative pattern */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-200/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-indigo-200/50 rounded-full blur-2xl pointer-events-none" />

        {/* Mascot & Star Ranks */}
        <div className="relative flex flex-col items-center">
          <div className="w-20 h-20 mb-2">
            <NovaMascot emotion={score >= 80 ? 'happy' : 'encouraging'} className="w-full h-full" />
          </div>

          <div className="flex items-center justify-center gap-2 my-2">
            {[1, 2, 3].map((starIdx) => (
              <div
                key={starIdx}
                className={`transform transition-all duration-500 ${
                  starIdx <= stars ? 'scale-110 text-amber-400 drop-shadow-md' : 'text-slate-200 opacity-60'
                }`}
              >
                <Star size={36} fill={starIdx <= stars ? '#f59e0b' : 'none'} strokeWidth={2.5} />
              </div>
            ))}
          </div>

          <span className="px-3.5 py-1 bg-amber-100 text-amber-900 text-xs font-black rounded-full uppercase tracking-wider">
            {stars === 3 ? '🎉 PERFECT SCORE!' : stars === 2 ? '🌟 GREAT JOB!' : '💪 KEEP PRACTICING!'}
          </span>
        </div>

        {/* Title & Score Breakdown */}
        <div>
          <h3 className="text-xl font-black text-slate-900">{activityTitle}</h3>
          <p className="text-xs font-bold text-slate-500 mt-1">Check Mode Performance Completed</p>
        </div>

        {/* Score & XP Rewards Pill Grid */}
        <div className="grid grid-cols-2 gap-3 bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200">
          <div className="p-2 bg-white rounded-xl border border-amber-100 shadow-sm flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase">Final Score</span>
            <span className="text-lg font-black text-emerald-600">{score}%</span>
          </div>

          <div className="p-2 bg-white rounded-xl border border-amber-100 shadow-sm flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase">XP Awarded</span>
            <span className="text-lg font-black text-indigo-600">+{xpEarned} XP</span>
          </div>
        </div>

        {/* Embedded SRS Notification Badge */}
        <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-2xl flex items-center gap-3 text-left">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
            📖
          </div>
          <div>
            <span className="text-xs font-black text-indigo-950 block leading-tight">
              Word Treasury SRS Sync
            </span>
            <span className="text-[11px] font-medium text-indigo-700 block mt-0.5">
              +{srsWordsAdded} vocabulary words logged to Leitner Box 1 for spaced review!
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white font-black text-sm rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Continue Learning Journey</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
