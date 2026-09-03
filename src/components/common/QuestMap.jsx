import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Lock, Clock, Gift, Sparkles, Trophy } from 'lucide-react';
import useDailyQuestStore from '../../stores/useDailyQuestStore';
import { useUserStore } from '../../stores/useUserStore';
import { QUEST_SCHEDULE, DAILY_BONUS_XP, TOTAL_QUEST_DAYS } from '../../config/questSchedule';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import LexioMascot from '../mascot/LexioMascot';
import ClassLeaderboardModal from './ClassLeaderboardModal';
import ParentPINGate from './ParentPINGate';

/**
 * QuestMap — Vertical quest path replacing Zone tabs for W33+.
 * 
 * Features:
 * - 5 quest groups arranged vertically as a "path"
 * - Progressive unlock (Hybrid Lock C): complete Quest N → Quest N+1 unlocks
 * - Teacher/Parent override: long-press 3s on locked quest → unlock all
 * - Lexio mascot with contextual mood
 * - Progress bar per quest + weekly progress
 */

const QUEST_ROLES = [
  { 
    emoji: '🔍', 
    role: 'The Explorer',
    roleVi: 'Nhà Thám Hiểm',
    color: 'indigo',
    gradient: 'from-indigo-500 to-blue-600',
    lightBg: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    activeBorder: 'border-indigo-500',
    ringColor: 'ring-indigo-400/30',
    textColor: 'text-indigo-700',
    iconBg: 'bg-indigo-100',
  },
  { 
    emoji: '🎙️', 
    role: 'The Storyteller',
    roleVi: 'Người Kể Chuyện',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    lightBg: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    activeBorder: 'border-emerald-500',
    ringColor: 'ring-emerald-400/30',
    textColor: 'text-emerald-700',
    iconBg: 'bg-emerald-100',
  },
  { 
    emoji: '⚔️', 
    role: 'Word Hero',
    roleVi: 'Nhà Vô Địch Từ Vựng',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    lightBg: 'bg-amber-50',
    borderColor: 'border-amber-200',
    activeBorder: 'border-amber-500',
    ringColor: 'ring-amber-400/30',
    textColor: 'text-amber-700',
    iconBg: 'bg-amber-100',
  },
  { 
    emoji: '✏️', 
    role: 'The Creator',
    roleVi: 'Nghệ Sĩ Sáng Tạo',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    lightBg: 'bg-purple-50',
    borderColor: 'border-purple-200',
    activeBorder: 'border-purple-500',
    ringColor: 'ring-purple-400/30',
    textColor: 'text-purple-700',
    iconBg: 'bg-purple-100',
  },
  { 
    emoji: '🏆', 
    role: 'Final Challenge',
    roleVi: 'Thử Thách Cuối',
    color: 'rose',
    gradient: 'from-rose-500 to-pink-600',
    lightBg: 'bg-rose-50',
    borderColor: 'border-rose-200',
    activeBorder: 'border-rose-500',
    ringColor: 'ring-rose-400/30',
    textColor: 'text-rose-700',
    iconBg: 'bg-rose-100',
  },
];

export default function QuestMap({ weekId }) {
  const navigate = useNavigate();
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [teacherOverride, setTeacherOverride] = useState(false);
  const [showPINGate, setShowPINGate] = useState(false);

  const {
    isQuestCompleted,
    isDayComplete,
    isBonusClaimed,
    claimDailyBonus,
    getWeekQuestCount,
    getCurrentDay,
  } = useDailyQuestStore();

  const addXP = useUserStore((s) => s.addXP);
  const loadWeekProgress = useUserStore((s) => s.loadWeekProgress);

  React.useEffect(() => {
    if (weekId) {
      loadWeekProgress(weekId);
    }
  }, [weekId, loadWeekProgress]);

  const currentDay = getCurrentDay(weekId);
  const weekQuestCount = getWeekQuestCount(weekId);
  const totalQuests = TOTAL_QUEST_DAYS * 3;

  // Calculate completion per quest group (day)
  const getGroupCompletion = (dayIndex) => {
    const dayConfig = QUEST_SCHEDULE[dayIndex];
    if (!dayConfig) return { completed: 0, total: 3, percent: 0 };
    const completed = dayConfig.quests.filter(q => isQuestCompleted(weekId, q.id)).length;
    return { completed, total: dayConfig.quests.length, percent: Math.round((completed / dayConfig.quests.length) * 100) };
  };

  // Hybrid Lock C: Quest N+1 is unlocked if Quest N is 100% complete, or teacher override
  const isQuestUnlocked = (dayIndex) => {
    if (teacherOverride) return true;
    if (dayIndex === 0) return true; // Quest 1 always open
    // Previous quest group must be fully completed
    const prevCompletion = getGroupCompletion(dayIndex - 1);
    return prevCompletion.percent === 100;
  };

  // "Suggested Next" — first incomplete, unlocked quest
  const suggestedDay = QUEST_SCHEDULE.findIndex((_, i) => {
    const completion = getGroupCompletion(i);
    return completion.percent < 100 && isQuestUnlocked(i);
  });

  // PIN gate handler for locked quests
  const handleLockedQuestClick = () => {
    setShowPINGate(true);
  };

  const handlePINSuccess = () => {
    setTeacherOverride(true);
    fireCelebrationConfetti?.('TeacherOverride');
  };

  // Zone-to-hub mapping for navigation
  const getQuestLink = (quest) => {
    let link = `/week/${weekId}/hub/${quest.zone}`;
    if (quest.gearIndex !== null && quest.gearIndex !== undefined) {
      link += `?gear=${quest.gearIndex + 1}`;
    } else if (quest.station) {
      link += `?station=${quest.station}`;
    }
    return link;
  };

  // Handle bonus claim
  const handleClaimBonus = (day) => {
    const claimed = claimDailyBonus(weekId, day);
    if (claimed) {
      fireCelebrationConfetti?.('QuestMapBonus');
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  // Lexio mood based on progress
  const lexioMood = weekQuestCount >= totalQuests 
    ? 'celebrate' 
    : weekQuestCount > 0 
    ? 'happy' 
    : 'waving';

  return (
    <div className="quest-map-container mb-6">
      {/* Header with weekly progress */}
      <div className="flex items-center justify-between px-4 py-3 mb-4">
        <div className="flex items-center gap-3">
          <LexioMascot size={48} mood={lexioMood} />
          <div>
            <h2 style={{ fontFamily: "'Nunito', system-ui, sans-serif" }} className="text-lg font-black text-slate-800 tracking-tight leading-tight">
              Your Quest Map
            </h2>
            <p className="text-xs font-bold text-slate-400 mt-0.5">
              Week {weekId} · {weekQuestCount}/{totalQuests} quests done
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Weekly progress bar */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${(weekQuestCount / totalQuests) * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-black text-slate-500">
              {Math.round((weekQuestCount / totalQuests) * 100)}%
            </span>
          </div>
          <button
            onClick={() => setIsLeaderboardOpen(true)}
            className="px-2.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-black text-[11px] shadow flex items-center gap-1 transition active:scale-95"
          >
            <Trophy size={13} /> Co-op
          </button>
        </div>
      </div>

      {/* Quest Path — Vertical */}
      <div className="relative px-4">
        {/* Vertical connecting line */}
        <div className="absolute left-[38px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 via-emerald-200 via-amber-200 via-purple-200 to-rose-200 z-0" />

        {QUEST_SCHEDULE.map((dayConfig, dayIndex) => {
          const style = QUEST_ROLES[dayIndex];
          const completion = getGroupCompletion(dayIndex);
          const unlocked = isQuestUnlocked(dayIndex);
          const isSuggested = dayIndex === suggestedDay;
          const isComplete = completion.percent === 100;
          const dayBonus = isDayComplete(weekId, dayConfig.day);
          const bonusClaimed = isBonusClaimed(weekId, dayConfig.day);

          return (
            <div
              key={dayConfig.day}
              className={`relative flex items-start gap-4 mb-6 transition-all duration-300 ${!unlocked ? 'opacity-60' : ''}`}
              onClick={!unlocked ? handleLockedQuestClick : undefined}
              style={{ cursor: !unlocked ? 'pointer' : undefined }}
            >
              {/* Node Circle */}
              <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-3 shadow-md transition-all ${
                isComplete
                  ? `bg-gradient-to-br ${style.gradient} border-white text-white`
                  : unlocked
                  ? `bg-white ${style.activeBorder} ${isSuggested ? `ring-4 ${style.ringColor} animate-pulse` : ''}`
                  : 'bg-slate-100 border-slate-200'
              }`}>
                {isComplete ? (
                  <CheckCircle2 size={24} className="text-white" />
                ) : unlocked ? (
                  <span className="text-xl">{style.emoji}</span>
                ) : (
                  <Lock size={18} className="text-slate-400" />
                )}
              </div>

              {/* Quest Card */}
              <div className={`flex-1 rounded-2xl border-2 overflow-hidden transition-all ${
                isComplete
                  ? `${style.lightBg} ${style.activeBorder} shadow-sm`
                  : unlocked
                  ? `bg-white ${isSuggested ? style.activeBorder : style.borderColor} shadow-sm hover:shadow-md`
                  : 'bg-slate-50 border-slate-200'
              }`}>
                {/* Quest Header */}
                <div className={`flex items-center justify-between px-4 py-2.5 ${
                  isComplete ? `bg-gradient-to-r ${style.gradient} text-white` : `${style.lightBg}`
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black">
                      {style.emoji} {style.role}
                    </span>
                    {isSuggested && !isComplete && (
                      <span className="px-2 py-0.5 bg-white/90 rounded-full text-[9px] font-black text-indigo-600 animate-pulse">
                        ✨ NEXT
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black ${isComplete ? 'text-white/90' : style.textColor}`}>
                      {isComplete ? '✅ Done' : `${completion.completed}/${completion.total}`}
                    </span>
                  </div>
                </div>

                {/* Quest Items */}
                {unlocked && (
                  <div className="px-3 py-2 space-y-1.5">
                    {dayConfig.quests.map((quest) => {
                      const completed = isQuestCompleted(weekId, quest.id);
                      return (
                        <Link
                          key={quest.id}
                          to={getQuestLink(quest)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all group ${
                            completed
                              ? 'bg-emerald-50 hover:bg-emerald-100'
                              : 'bg-white hover:bg-slate-50 border border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <span className="text-lg shrink-0">{quest.icon}</span>
                          <div className="flex-1 min-w-0">
                            <span className={`text-xs font-black block ${completed ? 'text-emerald-700' : 'text-slate-700'}`}>
                              {quest.label}
                            </span>
                            <span className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
                              <Clock size={8} /> ~{quest.minutes} min
                            </span>
                          </div>
                          {completed ? (
                            <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                          ) : (
                            <span className="text-[10px] font-black text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                              START →
                            </span>
                          )}
                        </Link>
                      );
                    })}

                    {/* Daily bonus */}
                    {dayBonus && !bonusClaimed && (
                      <button
                        onClick={() => handleClaimBonus(dayConfig.day)}
                        className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-xl font-black text-xs shadow-md transition-all hover:scale-[1.02] active:scale-95 animate-pulse mt-1"
                      >
                        <Gift size={14} /> Claim +{DAILY_BONUS_XP} XP Bonus!
                      </button>
                    )}
                    {dayBonus && bonusClaimed && (
                      <div className="text-center py-1">
                        <span className="text-[10px] font-black text-emerald-600">
                          ✅ Quest Complete! +{DAILY_BONUS_XP} XP earned
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Locked message */}
                {!unlocked && (
                  <div className="px-4 py-3 text-center">
                    <p className="text-[11px] font-bold text-slate-400">
                      🔒 Complete {QUEST_ROLES[dayIndex - 1]?.role} to unlock
                    </p>
                    <p className="text-[9px] font-medium text-slate-300 mt-0.5">
                      Nhờ ba/mẹ nhập PIN để mở khóa
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly summary footer */}
      {weekQuestCount >= totalQuests && (
        <div className="mx-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl text-center">
          <LexioMascot size={64} mood="celebrate" className="mx-auto mb-2" />
          <p className="text-sm font-black text-amber-800">🎉 All Quests Complete!</p>
          <p className="text-xs font-bold text-amber-600 mt-1">Amazing work this week!</p>
        </div>
      )}

      <ClassLeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />

      <ParentPINGate
        isOpen={showPINGate}
        onClose={() => setShowPINGate(false)}
        onSuccess={handlePINSuccess}
        title="Mở khóa Quest"
        subtitle="Nhờ ba/mẹ nhập mã PIN để mở khóa tất cả Quest"
      />
    </div>
  );
}
