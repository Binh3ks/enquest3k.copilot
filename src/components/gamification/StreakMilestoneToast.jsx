/**
 * StreakMilestoneToast
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-screen celebratory overlay that appears when a streak milestone fires
 * (7 / 30 / 100 / 365 days). Subscribes to STREAK_MILESTONE_REACHED event.
 *
 * Mount this once in MainLayout or App.jsx:
 *   <StreakMilestoneToast />
 */
import React, { useState, useEffect } from 'react';
import { gamificationEventBus, GAMIFICATION_EVENTS } from '../../services/gamificationEventBus';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';

const MILESTONE_THEMES = {
  streak_7d:   { bg: 'from-orange-500 to-red-500',    emoji: '🔥', title: '7-Day Streak!',     sub: 'A whole week of learning — you\'re on fire!' },
  streak_30d:  { bg: 'from-purple-600 to-indigo-600', emoji: '🏆', title: '30-Day Champion!',  sub: 'One month of daily English — incredible!' },
  streak_100d: { bg: 'from-blue-600 to-cyan-500',     emoji: '💎', title: '100-Day Legend!',   sub: 'You are in the top 1% of learners!' },
  streak_365d: { bg: 'from-amber-500 to-yellow-400',  emoji: '👑', title: '365-Day Champion!', sub: 'A full year! You are unstoppable!' },
};

export default function StreakMilestoneToast() {
  const [milestoneData, setMilestoneData] = useState(null);

  useEffect(() => {
    const unsub = gamificationEventBus.subscribe(
      GAMIFICATION_EVENTS.STREAK_MILESTONE_REACHED,
      (payload) => {
        setMilestoneData(payload);
        fireCelebrationConfetti?.();
      }
    );
    return unsub;
  }, []);

  if (!milestoneData) return null;

  const { milestone, streakDays } = milestoneData;
  const theme = MILESTONE_THEMES[milestone?.badge] || MILESTONE_THEMES.streak_7d;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-500"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={() => setMilestoneData(null)}
    >
      <div
        className={`relative bg-gradient-to-br ${theme.bg} rounded-3xl p-8 max-w-sm w-full text-white text-center shadow-2xl border border-white/20`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-3xl ring-4 ring-white/30 pointer-events-none" />

        {/* Emoji burst */}
        <div className="text-6xl mb-3 animate-bounce">{theme.emoji}</div>

        {/* Streak count */}
        <div className="text-5xl font-black mb-1 tabular-nums">
          {streakDays}
          <span className="text-2xl font-bold opacity-80 ml-1">days</span>
        </div>

        <h2 className="text-xl font-black tracking-tight mb-2">{theme.title}</h2>
        <p className="text-sm text-white/80 mb-5">{theme.sub}</p>

        {/* XP Bonus pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-2xl text-sm font-black mb-6 border border-white/30">
          ⚡ +{milestone?.xpBonus ?? 0} XP Bonus!
          {milestone?.rareCard && (
            <span className="ml-1 px-2 py-0.5 bg-amber-300 text-amber-900 rounded-full text-[10px] font-black">
              +Rare Card!
            </span>
          )}
        </div>

        {/* Keep going button */}
        <button
          onClick={() => setMilestoneData(null)}
          className="w-full py-3 bg-white text-slate-900 font-black rounded-2xl text-sm hover:bg-white/90 transition active:scale-95 shadow"
        >
          Keep the streak going! 🚀
        </button>

        {/* Dismiss hint */}
        <p className="text-[10px] text-white/40 mt-3">Tap anywhere to close</p>
      </div>
    </div>
  );
}
