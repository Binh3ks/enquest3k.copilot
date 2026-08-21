import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, CheckCircle2, Lock, Settings } from 'lucide-react';
import useDailyQuestStore from '../../stores/useDailyQuestStore';
import { useUserStore } from '../../stores/useUserStore';
import { QUEST_SCHEDULE, DAILY_BONUS_XP, TOTAL_QUEST_DAYS } from '../../config/questSchedule';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import LexioMascot from '../mascot/LexioMascot';
import ParentPINGate from '../common/ParentPINGate';
import { STATION_NAMES } from '../../config/stationLabels';
import questMapBg from '../../assets/quest-map-forest.jpg';
import './QuestMap3D.css';

// Preload task zone chunks in background while student is exploring the Map
const preloadTaskZones = () => {
  try {
    import('../../modules/zones/StoryWorldZone');
    import('../../modules/zones/BattleArenaZone');
    import('../../modules/zones/CreatorStudioZone');
    import('../../modules/zones/BossBattleZone');
    import('../../modules/zones/InfoExchangeZone');
  } catch (_) {}
};
if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preloadTaskZones);
  } else {
    setTimeout(preloadTaskZones, 100);
  }
}

const PATH_MIDPOINTS = [
  { x: 28, y: 60, angle: -30 },
  { x: 47, y: 52, angle: -15 },
  { x: 62, y: 46, angle: -30 },
  { x: 75, y: 30, angle: -40 },
];

const PATH_MIDPOINTS_MOBILE = [
  { x: 25, y: 73, angle: -90 },
  { x: 25, y: 56, angle: -90 },
  { x: 25, y: 39, angle: -90 },
  { x: 25, y: 22, angle: -90 },
];

const STATIONS = [
  {
    id: 'explorer',
    index: 1,
    emoji: '📖',
    name: STATION_NAMES[1],
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.65)',
    bgGradient: 'radial-gradient(circle at 35% 35%, #dbeafe 0%, #3b82f6 70%, #1d4ed8 100%)',
    position:       { x: 18, y: 74 },
    positionMobile: { x: 25, y: 82 },
    taskPositions:       [{ x: 8, y: 62 }, { x: 20, y: 56 }, { x: 30, y: 64 }],
    taskPositionsMobile: [{ x: 55, y: 79 }, { x: 70, y: 82 }, { x: 85, y: 85 }],
  },
  {
    id: 'science_lab',
    index: 2,
    emoji: '🔬',
    name: STATION_NAMES[2],
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.65)',
    bgGradient: 'radial-gradient(circle at 35% 35%, #d1fae5 0%, #10b981 70%, #047857 100%)',
    position:       { x: 38, y: 52 },
    positionMobile: { x: 25, y: 65 },
    taskPositions:       [{ x: 28, y: 40 }, { x: 38, y: 34 }, { x: 48, y: 42 }],
    taskPositionsMobile: [{ x: 55, y: 62 }, { x: 70, y: 65 }, { x: 85, y: 68 }],
  },
  {
    id: 'wordhero',
    index: 3,
    emoji: '⚔️',
    name: STATION_NAMES[3],
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.65)',
    bgGradient: 'radial-gradient(circle at 35% 35%, #fef3c7 0%, #f59e0b 70%, #b45309 100%)',
    position:       { x: 55, y: 58 },
    positionMobile: { x: 25, y: 48 },
    taskPositions:       [{ x: 45, y: 48 }, { x: 55, y: 42 }, { x: 65, y: 48 }],
    taskPositionsMobile: [{ x: 55, y: 45 }, { x: 70, y: 48 }, { x: 85, y: 51 }],
  },
  {
    id: 'creator',
    index: 4,
    emoji: '✍️',
    name: STATION_NAMES[4],
    color: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.65)',
    bgGradient: 'radial-gradient(circle at 35% 35%, #ede9fe 0%, #8b5cf6 70%, #6d28d9 100%)',
    position:       { x: 68, y: 42 },
    positionMobile: { x: 25, y: 31 },
    taskPositions:       [{ x: 60, y: 30 }, { x: 70, y: 24 }, { x: 80, y: 30 }],
    taskPositionsMobile: [{ x: 55, y: 28 }, { x: 70, y: 31 }, { x: 85, y: 34 }],
  },
  {
    id: 'boss',
    index: 5,
    emoji: '🏰',
    name: STATION_NAMES[5],
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.65)',
    bgGradient: 'radial-gradient(circle at 35% 35%, #fee2e2 0%, #ef4444 70%, #b91c1c 100%)',
    position:       { x: 82, y: 26 },
    positionMobile: { x: 25, y: 15 },
    taskPositions:       [{ x: 72, y: 12 }, { x: 84, y: 8 }, { x: 93, y: 18 }],
    taskPositionsMobile: [{ x: 55, y: 12 }, { x: 70, y: 15 }, { x: 85, y: 18 }],
  },
];


function useIsPortrait() {
  const [isPortrait, setIsPortrait] = useState(
    () => typeof window !== 'undefined' && window.innerHeight > window.innerWidth
  );
  useEffect(() => {
    const handler = () => setIsPortrait(window.innerHeight > window.innerWidth);
    window.addEventListener('resize', handler);
    window.addEventListener('orientationchange', handler);
    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('orientationchange', handler);
    };
  }, []);
  return isPortrait;
}

export default function QuestMap3D({ weekId, onToggleSidebar }) {
  const navigate = useNavigate();
  const isPortrait = useIsPortrait();
  const [expandedStation, setExpandedStation] = useState(null);
  const [showPIN, setShowPIN] = useState(false);
  const [teacherOverride, setTeacherOverride] = useState(false);
  const [showNarrative, setShowNarrative] = useState(false);
  const [mascotMood, setMascotMood] = useState('waving');
  const prevSuggestedIdxRef = useRef(-1);

  const { isQuestCompleted, getWeekQuestCount } = useDailyQuestStore();
  const weekQuestCount = getWeekQuestCount(weekId);
  const totalQuests = TOTAL_QUEST_DAYS * 3;
  const progressPercent = Math.round((weekQuestCount / totalQuests) * 100);

  // Owner / super_admin: all stations always unlocked — no sequential gate
  const { currentUser } = useUserStore();
  const BYPASS_ROLES = ['super_admin', 'admin', 'teacher', 'team_leader', 'center_director'];
  const isOwnerBypass = BYPASS_ROLES.includes(currentUser?.role);

  // Sync teacherOverride once on mount when owner is detected
  useEffect(() => {
    if (isOwnerBypass) setTeacherOverride(true);
  }, [isOwnerBypass]);

  const pos = useCallback((station) =>
    isPortrait ? station.positionMobile : station.position, [isPortrait]);
  const taskPos = useCallback((station, qi) =>
    isPortrait ? station.taskPositionsMobile[qi] : station.taskPositions[qi], [isPortrait]);
  const midpoints = isPortrait ? PATH_MIDPOINTS_MOBILE : PATH_MIDPOINTS;

  const getStationCompletion = useCallback((dayIndex) => {
    const dayConfig = QUEST_SCHEDULE[dayIndex];
    if (!dayConfig) return { done: 0, total: 3, allDone: false };
    const done = dayConfig.quests.filter(q => isQuestCompleted(weekId, q.id)).length;
    return { done, total: dayConfig.quests.length, allDone: done === dayConfig.quests.length };
  }, [isQuestCompleted, weekId]);

  const isStationUnlocked = useCallback((dayIndex) => {
    if (teacherOverride) return true;
    if (dayIndex === 0) return true;
    return getStationCompletion(dayIndex - 1).allDone;
  }, [teacherOverride, getStationCompletion]);

  const suggestedIdx = STATIONS.findIndex((_, i) => {
    const c = getStationCompletion(i);
    return !c.allDone && isStationUnlocked(i);
  });
  const currentSuggestedIdx = suggestedIdx >= 0 ? suggestedIdx : 0;
  const suggestedStation = STATIONS[currentSuggestedIdx];

  // Find the first uncompleted task in the suggested station for the CTA button
  const currentDayQuests = QUEST_SCHEDULE[currentSuggestedIdx]?.quests || [];
  const firstUncompletedTask = currentDayQuests.find(q => !isQuestCompleted(weekId, q.id)) || currentDayQuests[0];

  const handleStationClick = (stationIdx) => {
    if (!isStationUnlocked(stationIdx)) {
      setShowPIN(true);
      return;
    }
    setExpandedStation(expandedStation === stationIdx ? null : stationIdx);
  };

  const getTaskLink = (quest) => `/week/${weekId}/task/${quest.id}`;

  const lexioMsg =
    weekQuestCount === 0 ? "Start your adventure! 🌟" :
    weekQuestCount >= totalQuests ? "Outstanding! All quests completed! 🎉" :
    `${totalQuests - weekQuestCount} quests remaining! 💪`;

  // Show narrative toast on first visit
  useEffect(() => {
    const key = `lexio_trip_${weekId}_intro_shown`;
    if (!localStorage.getItem(key)) {
      setTimeout(() => {
        setShowNarrative(true);
        localStorage.setItem(key, '1');
        setTimeout(() => setShowNarrative(false), 6000);
      }, 1200);
    }
  }, [weekId]);

  // Mascot celebrate when station changes
  useEffect(() => {
    if (currentSuggestedIdx !== prevSuggestedIdxRef.current && prevSuggestedIdxRef.current !== -1) {
      setMascotMood('celebrate');
      setTimeout(() => setMascotMood(weekQuestCount >= totalQuests ? 'celebrate' : 'happy'), 2000);
    } else {
      setMascotMood(weekQuestCount >= totalQuests ? 'celebrate' : weekQuestCount > 0 ? 'happy' : 'waving');
    }
    prevSuggestedIdxRef.current = currentSuggestedIdx;
  }, [currentSuggestedIdx, weekQuestCount, totalQuests]);

  const showLexioCTA = weekQuestCount < totalQuests && firstUncompletedTask;

  return (
    <div className="qm3d-container">
      {/* Background */}
      <div className="qm3d-bg" style={{ backgroundImage: `url(${questMapBg})` }} />
      <div className="qm3d-overlay" />

      {/* Header */}
      <div className="qm3d-header">
        <div className="qm3d-header-left">
          <button className="qm3d-hamburger" onClick={onToggleSidebar} aria-label="Menu">
            <Menu size={22} />
          </button>
          <div className="qm3d-logo">
            <span className="qm3d-logo-fox">🦊</span>
            <span className="qm3d-logo-text">LEXIO</span>
          </div>
        </div>
        <div className="qm3d-week-badge">
          <span className="qm3d-week-label">🗺️ TRIP {weekId}</span>
          <div className="qm3d-dual-progress hidden sm:flex">
            <div className="qm3d-prog-row">
              <span className="qm3d-prog-icon">🦊</span>
              <div className="qm3d-progress-bar">
                <div className="qm3d-progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>
          <span className="qm3d-progress-text font-black text-xs text-amber-600">{weekQuestCount}/{totalQuests}</span>
        </div>
        <button className="qm3d-settings" onClick={onToggleSidebar} aria-label="Settings">
          <Settings size={18} />
        </button>
      </div>

      {/* Narrative welcome toast */}
      {showNarrative && (
        <div className="qm3d-narrative-toast">
          <span className="qm3d-narrative-fox">🦊</span>
          <p className="qm3d-narrative-text">
            Welcome to <strong>Trip {weekId}</strong>! Your language adventure begins here.
            5 stations, 15 quests — starting from <strong>Story World</strong>! 🗺️✨
          </p>
        </div>
      )}

      {/* SVG Path connecting stations */}
      <svg className="qm3d-path-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d={`M ${pos(STATIONS[0]).x} ${pos(STATIONS[0]).y}
              C ${pos(STATIONS[0]).x + (isPortrait ? 0 : 10)} ${pos(STATIONS[0]).y - (isPortrait ? 8 : 15)},
                ${pos(STATIONS[1]).x - (isPortrait ? 0 : 10)} ${pos(STATIONS[1]).y + (isPortrait ? 8 : 10)},
                ${pos(STATIONS[1]).x} ${pos(STATIONS[1]).y}
              C ${pos(STATIONS[1]).x + (isPortrait ? 0 : 10)} ${pos(STATIONS[1]).y + (isPortrait ? -8 : 5)},
                ${pos(STATIONS[2]).x - (isPortrait ? 0 : 10)} ${pos(STATIONS[2]).y - (isPortrait ? -8 : 5)},
                ${pos(STATIONS[2]).x} ${pos(STATIONS[2]).y}
              C ${pos(STATIONS[2]).x + (isPortrait ? 0 : 8)} ${pos(STATIONS[2]).y - (isPortrait ? 8 : 10)},
                ${pos(STATIONS[3]).x - (isPortrait ? 0 : 8)} ${pos(STATIONS[3]).y + (isPortrait ? 8 : 10)},
                ${pos(STATIONS[3]).x} ${pos(STATIONS[3]).y}
              C ${pos(STATIONS[3]).x + (isPortrait ? 0 : 8)} ${pos(STATIONS[3]).y - (isPortrait ? 8 : 8)},
                ${pos(STATIONS[4]).x - (isPortrait ? 0 : 8)} ${pos(STATIONS[4]).y + (isPortrait ? 8 : 8)},
                ${pos(STATIONS[4]).x} ${pos(STATIONS[4]).y}`}
          className="qm3d-path-line"
        />
        <path
          d={`M ${pos(STATIONS[0]).x} ${pos(STATIONS[0]).y}
              C ${pos(STATIONS[0]).x + (isPortrait ? 0 : 10)} ${pos(STATIONS[0]).y - (isPortrait ? 8 : 15)},
                ${pos(STATIONS[1]).x - (isPortrait ? 0 : 10)} ${pos(STATIONS[1]).y + (isPortrait ? 8 : 10)},
                ${pos(STATIONS[1]).x} ${pos(STATIONS[1]).y}
              C ${pos(STATIONS[1]).x + (isPortrait ? 0 : 10)} ${pos(STATIONS[1]).y + (isPortrait ? -8 : 5)},
                ${pos(STATIONS[2]).x - (isPortrait ? 0 : 10)} ${pos(STATIONS[2]).y - (isPortrait ? -8 : 5)},
                ${pos(STATIONS[2]).x} ${pos(STATIONS[2]).y}
              C ${pos(STATIONS[2]).x + (isPortrait ? 0 : 8)} ${pos(STATIONS[2]).y - (isPortrait ? 8 : 10)},
                ${pos(STATIONS[3]).x - (isPortrait ? 0 : 8)} ${pos(STATIONS[3]).y + (isPortrait ? 8 : 10)},
                ${pos(STATIONS[3]).x} ${pos(STATIONS[3]).y}
              C ${pos(STATIONS[3]).x + (isPortrait ? 0 : 8)} ${pos(STATIONS[3]).y - (isPortrait ? 8 : 8)},
                ${pos(STATIONS[4]).x - (isPortrait ? 0 : 8)} ${pos(STATIONS[4]).y + (isPortrait ? 8 : 8)},
                ${pos(STATIONS[4]).x} ${pos(STATIONS[4]).y}`}
          className="qm3d-path-line-glow"
        />
        {midpoints.map((mp, i) => {
          const stationUnlocked = isStationUnlocked(i + 1);
          return (
            <text
              key={i}
              x={mp.x}
              y={mp.y}
              className={`qm3d-path-arrow ${stationUnlocked ? 'unlocked' : 'locked'}`}
              transform={`rotate(${mp.angle}, ${mp.x}, ${mp.y})`}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              ›
            </text>
          );
        })}
      </svg>

      {/* Station Nodes */}
      {STATIONS.map((station, idx) => {
        const completion = getStationCompletion(idx);
        const unlocked = isStationUnlocked(idx);
        const isExpanded = expandedStation === idx;
        const isSuggested = idx === currentSuggestedIdx;
        const dayConfig = QUEST_SCHEDULE[idx];
        const stPos = pos(station);

        return (
          <div key={station.id}>
            {/* Station bubble */}
            <button
              className={`qm3d-station ${completion.allDone ? 'done' : ''} ${unlocked ? 'unlocked' : 'locked'} ${isSuggested ? 'suggested' : ''} ${isExpanded ? 'expanded' : ''}`}
              style={{
                left: `${stPos.x}%`,
                top: `${stPos.y}%`,
                '--station-color': station.color,
                '--station-glow': station.glowColor,
                '--station-bg': station.bgGradient,
              }}
              onClick={() => handleStationClick(idx)}
              aria-label={station.name}
            >
              {unlocked ? (
                <>
                  <span className="qm3d-station-emoji" style={{ fontSize: isSuggested ? '30px' : '24px' }}>
                    {station.emoji}
                  </span>
                  {completion.allDone && (
                    <span className="qm3d-station-mini-done">✓</span>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <span className="qm3d-station-index">{station.index}</span>
                  <Lock size={11} className="qm3d-station-lock opacity-70" />
                </div>
              )}
            </button>

            {/* Station label */}
            <div
              className={`qm3d-station-label ${unlocked ? 'unlocked' : 'locked-muted'}`}
              style={{
                left: `${stPos.x}%`,
                top: `${stPos.y + (isPortrait ? 5.5 : 7.5)}%`,
                '--station-color': station.color,
                '--station-glow': station.glowColor,
              }}
            >
              {unlocked ? (
                <>
                  <span className="qm3d-station-name-text">{station.emoji} {station.name}</span>
                  {completion.done > 0 && !completion.allDone && (
                    <span className="qm3d-station-count">{completion.done}/{completion.total}</span>
                  )}
                  {isSuggested && !completion.allDone && (
                    <div className="qm3d-start-here">
                      {idx === 0 && completion.done === 0 ? '▶ START HERE' : '▶ CONTINUE'}
                    </div>
                  )}
                </>
              ) : (
                <span className="qm3d-station-locked-name">
                  🔒 {station.name}
                </span>
              )}
            </div>

            {/* Expanded task dots — Desktop Only (Mobile uses Bottom Task Drawer) */}
            {!isPortrait && isExpanded && unlocked && dayConfig && (
              <>
                {dayConfig.quests.map((quest, qi) => {
                  const isDone = isQuestCompleted(weekId, quest.id);
                  const tPos = taskPos(station, qi);
                  return (
                    <div
                      key={quest.id}
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(getTaskLink(quest));
                      }}
                      onKeyDown={(e) => { if (e.key === 'Enter') navigate(getTaskLink(quest)); }}
                      className={`qm3d-task-dot ${isDone ? 'done' : ''}`}
                      style={{
                        left: `${tPos.x}%`,
                        top: `${tPos.y}%`,
                        '--dot-color': station.color,
                        animationDelay: `${qi * 0.08}s`,
                      }}
                    >
                      {isDone ? (
                        <CheckCircle2 size={15} className="text-emerald-600" />
                      ) : (
                        <span className="qm3d-task-icon">{quest.icon}</span>
                      )}
                      <span className="qm3d-task-label">{quest.label}</span>
                      <span className="qm3d-task-time">~{quest.minutes}m</span>
                    </div>
                  );
                })}
                {/* Connector lines */}
                <svg className="qm3d-task-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {dayConfig.quests.map((_, qi) => {
                    const tPos = taskPos(station, qi);
                    return (
                      <line
                        key={qi}
                        x1={stPos.x} y1={stPos.y}
                        x2={tPos.x}  y2={tPos.y}
                        className="qm3d-task-connector"
                        style={{ animationDelay: `${qi * 0.08}s` }}
                      />
                    );
                  })}
                </svg>
              </>
            )}
          </div>
        );
      })}

      {/* Mobile Bottom Task Drawer */}
      {isPortrait && expandedStation !== null && STATIONS[expandedStation] && (
        <div className="qm3d-mobile-drawer-backdrop" onClick={() => setExpandedStation(null)}>
          <div className="qm3d-mobile-drawer" onClick={e => e.stopPropagation()}>
            <div className="qm3d-drawer-header">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{STATIONS[expandedStation].emoji}</span>
                <div>
                  <h3 className="font-black text-slate-800 text-sm">{STATIONS[expandedStation].name}</h3>
                  <p className="text-[11px] font-bold text-slate-400">
                    Station {STATIONS[expandedStation].index} · {getStationCompletion(expandedStation).done}/{getStationCompletion(expandedStation).total} Hoàn thành
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setExpandedStation(null)} 
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-black text-sm"
              >
                ✕
              </button>
            </div>

            <div className="qm3d-drawer-tasks space-y-2 mt-3">
              {(QUEST_SCHEDULE[expandedStation]?.quests || []).map((quest) => {
                const isDone = isQuestCompleted(weekId, quest.id);
                return (
                  <button
                    key={quest.id}
                    onClick={() => {
                      setExpandedStation(null);
                      navigate(getTaskLink(quest));
                    }}
                    className={`w-full p-3 rounded-2xl border-2 flex items-center justify-between text-left transition-all ${
                      isDone 
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900' 
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl w-8 text-center">{isDone ? '✅' : quest.icon}</span>
                      <div>
                        <p className="font-black text-xs leading-tight">{quest.label}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">⏱️ ~{quest.minutes} phút · +{quest.xp || 50} XP</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-xl text-[11px] font-black ${
                      isDone ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white shadow-xs'
                    }`}>
                      {isDone ? 'Làm lại' : 'Bắt đầu ▶'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Floating Duolingo-style Mascot HUD (Top Right, Animated, Interactive) */}
      <div
        className="qm3d-floating-mascot-hud"
        onClick={() => {
          fireCelebrationConfetti('mascot_tap');
          setMascotMood(prev => prev === 'celebrate' ? 'waving' : 'celebrate');
        }}
        title="Lexio the Fox Companion — Tap for fun!"
      >
        <div className="qm3d-mascot-glow-ring">
          <LexioMascot
            size={isPortrait ? 56 : 72}
            mood={mascotMood}
          />
        </div>
        <div className="qm3d-mascot-pill">
          <span className="text-[10px] font-black text-amber-900 flex items-center gap-1">
            <span>🦊</span> Lexio
          </span>
        </div>
      </div>

      {/* Victory Castle */}
      <div className="qm3d-victory-castle">
        <span className="qm3d-castle-icon">🏰</span>
        <span className="qm3d-castle-label">Victory (W156)</span>
      </div>

      {/* Bottom bar with Lexio CTA */}
      <div className="qm3d-bottom-bar">
        <div className="qm3d-bottom-lexio">
          <LexioMascot size={38} mood={weekQuestCount >= totalQuests ? 'celebrate' : 'happy'} />
          <div className="qm3d-bottom-content">
            <span className="qm3d-bottom-speech">{lexioMsg}</span>
            {showLexioCTA && (
              <button
                className="qm3d-cta-btn"
                onClick={() => navigate(getTaskLink(firstUncompletedTask))}
              >
                {weekQuestCount === 0 ? '▶ Start' : '▶ Continue'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* All done celebration */}
      {weekQuestCount >= totalQuests && (
        <div className="qm3d-all-done">
          <LexioMascot size={80} mood="celebrate" />
          <h2>🎉 Outstanding! Week Completed!</h2>
          <p>All {totalQuests} quests finished!</p>
        </div>
      )}

      {/* PIN Gate */}
      <ParentPINGate
        isOpen={showPIN}
        onClose={() => setShowPIN(false)}
        onSuccess={() => { setTeacherOverride(true); fireCelebrationConfetti?.('TeacherOverride'); }}
        title="Unlock Station"
        subtitle="Ask parent to enter PIN to unlock"
      />
    </div>
  );
}

