/**
 * StreakAtRiskBanner
 * ─────────────────────────────────────────────────────────────────────────────
 * Compact warning bar shown when learner has an active streak (≥2 days)
 * but hasn't studied today AND < 4 hours remain before midnight.
 *
 * Usage: Place in TodayQuestBar or MainLayout above the quest cards.
 *   <StreakAtRiskBanner weekId={weekId} onStartQuest={handleNavigate} />
 *
 * Refreshes every 5 minutes. Hides automatically once today's study is recorded.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { Flame, AlertTriangle, ChevronRight } from 'lucide-react';
import { isStreakAtRisk } from '../../utils/progressReport';

export default function StreakAtRiskBanner({ weekId, onStartQuest }) {
  const [riskState, setRiskState] = useState({ atRisk: false, hoursLeft: 0, streakDays: 0 });
  const [dismissed, setDismissed] = useState(false);

  const checkRisk = useCallback(() => {
    const state = isStreakAtRisk();
    setRiskState(state);
    // Auto-clear dismissal on new day
    if (!state.atRisk) setDismissed(false);
  }, []);

  useEffect(() => {
    checkRisk();
    const interval = setInterval(checkRisk, 5 * 60 * 1000); // re-check every 5 min
    return () => clearInterval(interval);
  }, [checkRisk]);

  if (!riskState.atRisk || dismissed) return null;

  const { hoursLeft, streakDays } = riskState;
  const isUrgent = hoursLeft < 1;

  return (
    <div
      className={`relative flex items-center gap-3 px-4 py-2.5 rounded-2xl mb-3 border-2 animate-in slide-in-from-top-2 duration-300 ${
        isUrgent
          ? 'bg-red-500 border-red-600 text-white'
          : 'bg-orange-50 border-orange-400 text-orange-900'
      }`}
      role="alert"
      aria-live="polite"
    >
      {/* Flame icon (pulses urgently when < 1h) */}
      <Flame
        className={`shrink-0 ${isUrgent ? 'text-yellow-200 animate-bounce' : 'text-orange-500'}`}
        size={20}
      />

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-black leading-tight ${isUrgent ? 'text-white' : 'text-orange-900'}`}>
          {isUrgent
            ? `⚠️ Streak ends in ${Math.round(hoursLeft * 60)} min!`
            : `🔥 Your ${streakDays}-day streak is at risk!`}
        </p>
        <p className={`text-[11px] font-medium mt-0.5 ${isUrgent ? 'text-white/80' : 'text-orange-700'}`}>
          {isUrgent
            ? 'Complete any 1 quest before midnight to save your streak!'
            : `${hoursLeft}h left today. Start any quest to keep your streak alive.`}
        </p>
      </div>

      {/* CTA */}
      {onStartQuest && (
        <button
          onClick={onStartQuest}
          className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black transition active:scale-95 ${
            isUrgent
              ? 'bg-white text-red-600 hover:bg-red-50'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          Go! <ChevronRight size={14} />
        </button>
      )}

      {/* Dismiss (non-urgent only) */}
      {!isUrgent && (
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 text-orange-400 hover:text-orange-600 text-lg leading-none ml-1"
          aria-label="Dismiss"
        >
          ×
        </button>
      )}

      {/* Urgency pulse ring */}
      {isUrgent && (
        <span className="absolute inset-0 rounded-2xl ring-4 ring-red-400 animate-ping opacity-30 pointer-events-none" />
      )}
    </div>
  );
}
