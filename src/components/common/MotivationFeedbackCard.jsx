import React from 'react';
import { Star, Award, Flame, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';

/**
 * Learner-Visible Motivation Feedback Card Component (NO HTML5 CANVAS)
 * Non-distracting presentation component displaying XP, Stars, Badge, and Fail-Forward guidance.
 * 
 * @param {Object} props
 * @param {Object} props.motivationData Motivation payload from evaluateMotivationEvent()
 * @param {Function} props.onRetry Optional retry callback for fail-forward guidance
 */
export default function MotivationFeedbackCard({
  motivationData = null,
  onRetry = null
}) {
  if (!motivationData) return null;

  const { xpEarned = 0, starsEarned = 0, newStreak = 0, badgeUnlocked = null, feedbackMessage = '' } = motivationData;

  return (
    <div className="p-5 sm:p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl space-y-4 font-sans animate-in fade-in">
      {/* Top Header: Stars & XP Badge */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
        {/* Star Rating Display */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((starIdx) => (
            <Star
              key={starIdx}
              size={22}
              className={starIdx <= starsEarned ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}
            />
          ))}
          <span className="text-xs font-bold text-slate-400 ml-2 font-mono">
            {starsEarned}/3 Stars
          </span>
        </div>

        {/* XP Badge & Streak Counter */}
        <div className="flex items-center gap-2">
          {newStreak > 0 && (
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-black flex items-center gap-1">
              <Flame size={14} className="text-amber-400" /> {newStreak} Streak
            </span>
          )}
          <span className="px-3.5 py-1.5 bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 rounded-xl text-xs font-black flex items-center gap-1">
            <Sparkles size={14} className="text-indigo-400" /> +{xpEarned} XP
          </span>
        </div>
      </div>

      {/* Unlocked Mastery Badge Display */}
      {badgeUnlocked && (
        <div className="p-3.5 bg-indigo-950/80 border border-indigo-700/60 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-xl shrink-0">
            {badgeUnlocked.icon || '🏆'}
          </div>
          <div>
            <h5 className="text-xs font-black text-indigo-300 uppercase tracking-wider font-mono">
              Badge Unlocked: {badgeUnlocked.title}
            </h5>
            <p className="text-xs text-slate-300 font-medium">
              {badgeUnlocked.description}
            </p>
          </div>
        </div>
      )}

      {/* Narrative Feedback Message */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed">
          {feedbackMessage}
        </p>

        {/* Fail-Forward Encouragement Button */}
        {starsEarned < 3 && onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw size={14} /> Retry for 3 Stars
          </button>
        )}
      </div>
    </div>
  );
}
