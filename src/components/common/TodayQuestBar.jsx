import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Gift, CheckCircle2, Circle, Clock, Sparkles, Trophy } from 'lucide-react';
import useDailyQuestStore from '../../stores/useDailyQuestStore';
import { useUserStore } from '../../stores/useUserStore';
import { DAILY_BONUS_XP, TOTAL_QUEST_DAYS } from '../../config/questSchedule';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';

/**
 * TodayQuestBar — Persistent bar showing today's 3 quests + daily progress.
 * Sits between the header and zone tabs in MainLayout.
 * Soft guidance only — no zone locking.
 */
export default function TodayQuestBar({ weekId }) {
  const {
    getCurrentDay,
    getTodayQuests,
    isQuestCompleted,
    isDayComplete,
    isBonusClaimed,
    claimDailyBonus,
    getWeekQuestCount,
    isBarCollapsed,
    toggleBar,
  } = useDailyQuestStore();

  const addXP = useUserStore((s) => s.addXP);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentDay = getCurrentDay(weekId);
  const todayData = getTodayQuests(weekId);
  const dayComplete = isDayComplete(weekId, currentDay);
  const bonusClaimed = isBonusClaimed(weekId, currentDay);
  const weekQuestCount = getWeekQuestCount(weekId);
  const totalQuests = TOTAL_QUEST_DAYS * 3; // 15

  // Handle bonus claim
  const handleClaimBonus = () => {
    const claimed = claimDailyBonus(weekId, currentDay);
    if (claimed) {
      addXP(DAILY_BONUS_XP);
      fireCelebrationConfetti?.('DailyQuestBonus');
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  // Zone-to-hub mapping for navigation links
  const getQuestLink = (quest) => {
    return `/week/${weekId}/hub/${quest.zone}`;
  };

  // Collapsed: compact 1-line summary
  if (isBarCollapsed) {
    return (
      <button
        type="button"
        onClick={toggleBar}
        className="w-full flex items-center justify-between px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl mb-3 hover:from-indigo-100 hover:to-purple-100 transition-all group"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-indigo-700">📋 TODAY'S QUEST</span>
          <span className="text-[10px] font-bold text-indigo-500">
            Day {currentDay}/{TOTAL_QUEST_DAYS}
          </span>
          {dayComplete && (
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              ✅ Done!
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Mini day dots */}
          <div className="flex items-center gap-1">
            {Array.from({ length: TOTAL_QUEST_DAYS }, (_, i) => {
              const day = i + 1;
              const done = useDailyQuestStore.getState().isDayComplete(weekId, day);
              const isCurrent = day === currentDay;
              return (
                <div
                  key={day}
                  className={`w-2 h-2 rounded-full transition-all ${
                    done ? 'bg-emerald-500' : isCurrent ? 'bg-indigo-500 ring-2 ring-indigo-300' : 'bg-slate-200'
                  }`}
                />
              );
            })}
          </div>
          <ChevronDown size={14} className="text-indigo-400 group-hover:text-indigo-600 transition" />
        </div>
      </button>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-2 border-indigo-200 rounded-2xl mb-4 shadow-sm overflow-hidden animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-black text-white tracking-tight">
            📋 TODAY'S QUEST
          </span>
          <span className="px-2.5 py-0.5 bg-white/20 rounded-full text-[10px] font-black text-white/90">
            Day {currentDay} of {TOTAL_QUEST_DAYS} — {todayData.label}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Day progress dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: TOTAL_QUEST_DAYS }, (_, i) => {
              const day = i + 1;
              const done = useDailyQuestStore.getState().isDayComplete(weekId, day);
              const isCurrent = day === currentDay;
              return (
                <div
                  key={day}
                  className={`w-3 h-3 rounded-full border-2 transition-all ${
                    done
                      ? 'bg-emerald-400 border-emerald-300 shadow-sm'
                      : isCurrent
                      ? 'bg-white border-white shadow-md scale-110'
                      : 'bg-white/20 border-white/30'
                  }`}
                  title={`Day ${day}${done ? ' ✅' : isCurrent ? ' (Today)' : ''}`}
                />
              );
            })}
          </div>
          <button
            type="button"
            onClick={toggleBar}
            className="p-1 hover:bg-white/20 rounded-lg transition"
            title="Collapse"
          >
            <ChevronUp size={16} className="text-white/80" />
          </button>
        </div>
      </div>

      {/* Quest Cards */}
      <div className="px-4 py-3">
        <div className="grid grid-cols-3 gap-3">
          {todayData.quests.map((quest, idx) => {
            const completed = isQuestCompleted(weekId, quest.id);
            return (
              <Link
                key={quest.id}
                to={getQuestLink(quest)}
                className={`group relative flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all hover:scale-[1.02] active:scale-95 ${
                  completed
                    ? 'bg-emerald-50 border-emerald-300 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 shadow-sm'
                }`}
              >
                {/* Status badge */}
                <div className="absolute -top-1.5 -right-1.5">
                  {completed ? (
                    <CheckCircle2 size={20} className="text-emerald-500 fill-emerald-100" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center">
                      <span className="text-[8px] font-black text-slate-400">{idx + 1}</span>
                    </div>
                  )}
                </div>

                {/* Icon */}
                <span className="text-2xl">{quest.icon}</span>

                {/* Label */}
                <span className={`text-[11px] font-black text-center leading-tight ${
                  completed ? 'text-emerald-700' : 'text-slate-700'
                }`}>
                  {quest.label}
                </span>

                {/* Time estimate */}
                <span className="flex items-center gap-0.5 text-[9px] font-bold text-slate-400">
                  <Clock size={9} /> ~{quest.minutes} min
                </span>
              </Link>
            );
          })}
        </div>

        {/* Bottom bar: time remaining + bonus */}
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
            <Clock size={11} />
            <span>
              ~{todayData.quests.filter(q => !isQuestCompleted(weekId, q.id))
                .reduce((sum, q) => sum + q.minutes, 0)} min remaining
            </span>
            <span className="mx-1">·</span>
            <span className="text-indigo-500">{weekQuestCount}/{totalQuests} quests this week</span>
          </div>

          {/* Daily bonus / celebration */}
          {dayComplete && !bonusClaimed && (
            <button
              type="button"
              onClick={handleClaimBonus}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-xl font-black text-xs shadow-md transition-all hover:scale-105 active:scale-95 animate-pulse"
            >
              <Gift size={14} /> Claim +{DAILY_BONUS_XP} XP Bonus!
            </button>
          )}
          {dayComplete && bonusClaimed && !showCelebration && (
            <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600">
              <Trophy size={12} /> Day {currentDay} Complete! +{DAILY_BONUS_XP} XP earned
            </span>
          )}
          {showCelebration && (
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-600 animate-bounce">
              <Sparkles size={14} className="text-amber-500" /> 🎉 Done for today! Great work!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
