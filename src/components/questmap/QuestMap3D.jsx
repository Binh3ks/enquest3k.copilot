import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, CheckCircle2, Lock, Settings } from 'lucide-react';
import useDailyQuestStore from '../../stores/useDailyQuestStore';
import { useUserStore } from '../../stores/useUserStore';
import { QUEST_SCHEDULE, DAILY_BONUS_XP, TOTAL_QUEST_DAYS } from '../../config/questSchedule';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import LexioMascot from '../mascot/LexioMascot';
import ParentPINGate from '../common/ParentPINGate';
import questMapBg from '../../assets/quest-map-forest.jpg';
import './QuestMap3D.css';

/**
 * QuestMap3D — Immersive 3D adventure map.
 * 
 * Features:
 * - Responsive: dual positions (desktop/mobile) + useViewport hook
 * - Actionable Lexio CTA button: directly starts/continues next task
 * - Cognitive load reduction: locked stations show only index number + lock
 * - Named locked nodes: station name visible at 45% opacity
 * - Direction arrows along the winding path
 */

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
    emoji: '🔍',
    name: 'The Explorer',
    color: '#6366f1',
    glowColor: 'rgba(99,102,241,0.5)',
    position:       { x: 18, y: 72 },
    positionMobile: { x: 25, y: 82 },
    taskPositions:       [{ x: 12, y: 64 }, { x: 22, y: 58 }, { x: 30, y: 66 }],
    taskPositionsMobile: [{ x: 55, y: 79 }, { x: 70, y: 82 }, { x: 85, y: 85 }],
  },
  {
    id: 'storyteller',
    index: 2,
    emoji: '🎙️',
    name: 'The Storyteller',
    color: '#10b981',
    glowColor: 'rgba(16,185,129,0.5)',
    position:       { x: 38, y: 48 },
    positionMobile: { x: 25, y: 65 },
    taskPositions:       [{ x: 32, y: 42 }, { x: 42, y: 36 }, { x: 48, y: 44 }],
    taskPositionsMobile: [{ x: 55, y: 62 }, { x: 70, y: 65 }, { x: 85, y: 68 }],
  },
  {
    id: 'wordhero',
    index: 3,
    emoji: '⚔️',
    name: 'Battle Arena',
    color: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.5)',
    position:       { x: 55, y: 55 },
    positionMobile: { x: 25, y: 48 },
    taskPositions:       [{ x: 50, y: 50 }, { x: 58, y: 46 }, { x: 62, y: 54 }],
    taskPositionsMobile: [{ x: 55, y: 45 }, { x: 70, y: 48 }, { x: 85, y: 51 }],
  },
  {
    id: 'creator',
    index: 4,
    emoji: '✍️',
    name: 'Creative Studio',
    color: '#8b5cf6',
    glowColor: 'rgba(139,92,246,0.5)',
    position:       { x: 68, y: 38 },
    positionMobile: { x: 25, y: 31 },
    taskPositions:       [{ x: 63, y: 32 }, { x: 72, y: 28 }, { x: 76, y: 36 }],
    taskPositionsMobile: [{ x: 55, y: 28 }, { x: 70, y: 31 }, { x: 85, y: 34 }],
  },
  {
    id: 'boss',
    index: 5,
    emoji: '🏰',
    name: 'Boss Castle',
    color: '#ef4444',
    glowColor: 'rgba(239,68,68,0.5)',
    position:       { x: 82, y: 22 },
    positionMobile: { x: 25, y: 15 },
    taskPositions:       [{ x: 78, y: 16 }, { x: 85, y: 12 }, { x: 88, y: 20 }],
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
    weekQuestCount === 0 ? "Bắt đầu chuyến phiêu lưu! 🌟" :
    weekQuestCount >= totalQuests ? "Xuất sắc! Đã hoàn thành tất cả! 🎉" :
    `Còn ${totalQuests - weekQuestCount} nhiệm vụ nữa! 💪`;

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
          <div className="qm3d-dual-progress">
            <div className="qm3d-prog-row">
              <span className="qm3d-prog-icon">🦊</span>
              <div className="qm3d-progress-bar">
                <div className="qm3d-progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
              <span className="qm3d-progress-text">{weekQuestCount}/{totalQuests}</span>
            </div>
          </div>
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
            Chào mừng đến <strong>Trip {weekId}</strong>! Hành trình khám phá ngôn ngữ bắt đầu đây.
            5 trạm dừng, 15 nhiệm vụ — xuất phát từ <strong>The Explorer</strong>! 🗺️✨
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
              }}
              onClick={() => handleStationClick(idx)}
              aria-label={station.name}
            >
              {unlocked ? (
                <>
                  <span className="qm3d-station-emoji" style={{ fontSize: isSuggested ? '28px' : '22px' }}>
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
                top: `${stPos.y + (isPortrait ? 5.5 : 7)}%`,
              }}
            >
              {unlocked ? (
                <>
                  <span className="qm3d-station-name-text">{station.emoji} {station.name}</span>
                  {completion.done > 0 && !completion.allDone && (
                    <span className="qm3d-station-count">{completion.done}/{completion.total}</span>
                  )}
                  {/* START HERE on current suggested station when not finished */}
                  {isSuggested && !completion.allDone && (
                    <div className="qm3d-start-here">
                      {idx === 0 ? '▶ START HERE' : '▶ TIẾP TỤC'}
                    </div>
                  )}
                </>
              ) : (
                <span className="qm3d-station-locked-name">
                  🔒 {station.name}
                </span>
              )}
            </div>

            {/* Expanded task dots */}
            {isExpanded && unlocked && dayConfig && (
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

      {/* Lexio mascot — CSS transition follows suggested station smoothly */}
      <div
        className="qm3d-lexio"
        style={{
          left: `${pos(suggestedStation).x - (isPortrait ? 2 : 4)}%`,
          top: `${pos(suggestedStation).y - (isPortrait ? 8 : 11)}%`,
          transition: 'left 1.2s cubic-bezier(0.34,1.56,0.64,1), top 1.2s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        <LexioMascot
          size={isPortrait ? 46 : 58}
          mood={mascotMood}
        />
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
                {weekQuestCount === 0 ? '▶ Bắt đầu' : '▶ Tiếp tục'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* All done celebration */}
      {weekQuestCount >= totalQuests && (
        <div className="qm3d-all-done">
          <LexioMascot size={80} mood="celebrate" />
          <h2>🎉 Xuất sắc! Hoàn thành tuần!</h2>
          <p>Tất cả {totalQuests} nhiệm vụ đã xong!</p>
        </div>
      )}

      {/* PIN Gate */}
      <ParentPINGate
        isOpen={showPIN}
        onClose={() => setShowPIN(false)}
        onSuccess={() => { setTeacherOverride(true); fireCelebrationConfetti?.('TeacherOverride'); }}
        title="Mở khóa Quest"
        subtitle="Nhờ ba/mẹ nhập mã PIN để mở khóa"
      />
    </div>
  );
}

