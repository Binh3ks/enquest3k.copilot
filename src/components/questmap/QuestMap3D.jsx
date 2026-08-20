import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, CheckCircle2, Lock, Trophy, Settings, ChevronLeft } from 'lucide-react';
import useDailyQuestStore from '../../stores/useDailyQuestStore';
import { useUserStore } from '../../stores/useUserStore';
import { QUEST_SCHEDULE, DAILY_BONUS_XP, TOTAL_QUEST_DAYS } from '../../config/questSchedule';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import LexioMascot from '../mascot/LexioMascot';
import ParentPINGate from '../common/ParentPINGate';
import questMapBg from '../../assets/quest-map-forest.jpg';
import './QuestMap3D.css';

/**
 * QuestMap3D — Immersive 3D adventure map replacing flat Quest Map.
 * Full-screen, no sidebar. Hamburger menu opens sidebar overlay.
 * 
 * 5 quest stations on a winding path through an enchanted landscape.
 * Tap station → expand to show 3 task dots in-place.
 * Tap task → navigate to /week/:weekId/task/:taskId (full-screen task).
 * Boss Battle = weekly destination. Victory Castle = W156 on horizon.
 */

const STATIONS = [
  {
    id: 'explorer',
    emoji: '🔍',
    name: 'The Explorer',
    color: '#6366f1',
    glowColor: 'rgba(99,102,241,0.5)',
    position: { x: 18, y: 72 },
    taskPositions: [
      { x: 12, y: 64 },
      { x: 22, y: 58 },
      { x: 30, y: 66 },
    ],
  },
  {
    id: 'storyteller',
    emoji: '🎙️',
    name: 'The Storyteller',
    color: '#10b981',
    glowColor: 'rgba(16,185,129,0.5)',
    position: { x: 38, y: 48 },
    taskPositions: [
      { x: 32, y: 42 },
      { x: 42, y: 36 },
      { x: 48, y: 44 },
    ],
  },
  {
    id: 'wordhero',
    emoji: '⚔️',
    name: 'Word Hero',
    color: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.5)',
    position: { x: 55, y: 55 },
    taskPositions: [
      { x: 50, y: 50 },
      { x: 58, y: 46 },
      { x: 62, y: 54 },
    ],
  },
  {
    id: 'creator',
    emoji: '✏️',
    name: 'The Creator',
    color: '#8b5cf6',
    glowColor: 'rgba(139,92,246,0.5)',
    position: { x: 68, y: 38 },
    taskPositions: [
      { x: 63, y: 32 },
      { x: 72, y: 28 },
      { x: 76, y: 36 },
    ],
  },
  {
    id: 'boss',
    emoji: '🏆',
    name: 'Boss Battle',
    color: '#ef4444',
    glowColor: 'rgba(239,68,68,0.5)',
    position: { x: 82, y: 22 },
    taskPositions: [
      { x: 78, y: 16 },
      { x: 85, y: 12 },
      { x: 88, y: 20 },
    ],
  },
];

export default function QuestMap3D({ weekId, onToggleSidebar }) {
  const navigate = useNavigate();
  const [expandedStation, setExpandedStation] = useState(null);
  const [showPIN, setShowPIN] = useState(false);
  const [teacherOverride, setTeacherOverride] = useState(false);

  const { isQuestCompleted, getWeekQuestCount, getCurrentDay } = useDailyQuestStore();
  const weekQuestCount = getWeekQuestCount(weekId);
  const totalQuests = TOTAL_QUEST_DAYS * 3;
  const progressPercent = Math.round((weekQuestCount / totalQuests) * 100);

  // Quest completion per station
  const getStationCompletion = (dayIndex) => {
    const dayConfig = QUEST_SCHEDULE[dayIndex];
    if (!dayConfig) return { done: 0, total: 3, allDone: false };
    const done = dayConfig.quests.filter(q => isQuestCompleted(weekId, q.id)).length;
    return { done, total: dayConfig.quests.length, allDone: done === dayConfig.quests.length };
  };

  // Hybrid Lock C
  const isStationUnlocked = (dayIndex) => {
    if (teacherOverride) return true;
    if (dayIndex === 0) return true;
    return getStationCompletion(dayIndex - 1).allDone;
  };

  // Find suggested station (first incomplete + unlocked)
  const suggestedIdx = STATIONS.findIndex((_, i) => {
    const c = getStationCompletion(i);
    return !c.allDone && isStationUnlocked(i);
  });

  // Lexio position — at suggested station
  const lexioStation = STATIONS[suggestedIdx >= 0 ? suggestedIdx : 0];

  const handleStationClick = (stationIdx) => {
    if (!isStationUnlocked(stationIdx)) {
      setShowPIN(true);
      return;
    }
    setExpandedStation(expandedStation === stationIdx ? null : stationIdx);
  };

  const getTaskLink = (quest) => `/week/${weekId}/task/${quest.id}`;

  return (
    <div className="qm3d-container">
      {/* Background */}
      <div className="qm3d-bg" style={{ backgroundImage: `url(${questMapBg})` }} />
      <div className="qm3d-overlay" />

      {/* Header */}
      <div className="qm3d-header">
        <button className="qm3d-hamburger" onClick={onToggleSidebar}>
          <Menu size={22} />
        </button>
        <div className="qm3d-week-badge">
          <span className="qm3d-week-label">WEEK {weekId}</span>
          <div className="qm3d-progress-bar">
            <div className="qm3d-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <span className="qm3d-progress-text">{weekQuestCount}/{totalQuests}</span>
        </div>
        <button className="qm3d-settings" onClick={onToggleSidebar}>
          <Settings size={18} />
        </button>
      </div>

      {/* SVG Path connecting stations */}
      <svg className="qm3d-path-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d={`M ${STATIONS[0].position.x} ${STATIONS[0].position.y} 
              C ${STATIONS[0].position.x + 10} ${STATIONS[0].position.y - 15},
                ${STATIONS[1].position.x - 10} ${STATIONS[1].position.y + 10},
                ${STATIONS[1].position.x} ${STATIONS[1].position.y}
              C ${STATIONS[1].position.x + 10} ${STATIONS[1].position.y + 5},
                ${STATIONS[2].position.x - 10} ${STATIONS[2].position.y - 5},
                ${STATIONS[2].position.x} ${STATIONS[2].position.y}
              C ${STATIONS[2].position.x + 8} ${STATIONS[2].position.y - 10},
                ${STATIONS[3].position.x - 8} ${STATIONS[3].position.y + 10},
                ${STATIONS[3].position.x} ${STATIONS[3].position.y}
              C ${STATIONS[3].position.x + 8} ${STATIONS[3].position.y - 8},
                ${STATIONS[4].position.x - 8} ${STATIONS[4].position.y + 8},
                ${STATIONS[4].position.x} ${STATIONS[4].position.y}`}
          className="qm3d-path-line"
        />
        <path
          d={`M ${STATIONS[0].position.x} ${STATIONS[0].position.y} 
              C ${STATIONS[0].position.x + 10} ${STATIONS[0].position.y - 15},
                ${STATIONS[1].position.x - 10} ${STATIONS[1].position.y + 10},
                ${STATIONS[1].position.x} ${STATIONS[1].position.y}
              C ${STATIONS[1].position.x + 10} ${STATIONS[1].position.y + 5},
                ${STATIONS[2].position.x - 10} ${STATIONS[2].position.y - 5},
                ${STATIONS[2].position.x} ${STATIONS[2].position.y}
              C ${STATIONS[2].position.x + 8} ${STATIONS[2].position.y - 10},
                ${STATIONS[3].position.x - 8} ${STATIONS[3].position.y + 10},
                ${STATIONS[3].position.x} ${STATIONS[3].position.y}
              C ${STATIONS[3].position.x + 8} ${STATIONS[3].position.y - 8},
                ${STATIONS[4].position.x - 8} ${STATIONS[4].position.y + 8},
                ${STATIONS[4].position.x} ${STATIONS[4].position.y}`}
          className="qm3d-path-line-glow"
        />
      </svg>

      {/* Station Nodes */}
      {STATIONS.map((station, idx) => {
        const completion = getStationCompletion(idx);
        const unlocked = isStationUnlocked(idx);
        const isExpanded = expandedStation === idx;
        const isSuggested = idx === suggestedIdx;
        const dayConfig = QUEST_SCHEDULE[idx];

        return (
          <div key={station.id}>
            {/* Station bubble */}
            <button
              className={`qm3d-station ${completion.allDone ? 'done' : ''} ${unlocked ? 'unlocked' : 'locked'} ${isSuggested ? 'suggested' : ''} ${isExpanded ? 'expanded' : ''}`}
              style={{
                left: `${station.position.x}%`,
                top: `${station.position.y}%`,
                '--station-color': station.color,
                '--station-glow': station.glowColor,
              }}
              onClick={() => handleStationClick(idx)}
            >
              {completion.allDone ? (
                <CheckCircle2 size={22} className="qm3d-station-check" />
              ) : unlocked ? (
                <span className="qm3d-station-emoji">{station.emoji}</span>
              ) : (
                <Lock size={16} className="qm3d-station-lock" />
              )}
            </button>

            {/* Station label */}
            <div
              className={`qm3d-station-label ${unlocked ? '' : 'locked'}`}
              style={{
                left: `${station.position.x}%`,
                top: `${station.position.y + 7}%`,
              }}
            >
              {station.name}
              {completion.done > 0 && !completion.allDone && (
                <span className="qm3d-station-count"> {completion.done}/{completion.total}</span>
              )}
            </div>

            {/* Expanded task dots */}
            {isExpanded && unlocked && dayConfig && (
              <>
                {dayConfig.quests.map((quest, qi) => {
                  const taskDone = isQuestCompleted(weekId, quest.id);
                  const taskPos = station.taskPositions[qi];
                  return (
                    <Link
                      key={quest.id}
                      to={getTaskLink(quest)}
                      className={`qm3d-task-dot ${taskDone ? 'done' : ''}`}
                      style={{
                        left: `${taskPos.x}%`,
                        top: `${taskPos.y}%`,
                        '--dot-color': station.color,
                        animationDelay: `${qi * 0.1}s`,
                      }}
                    >
                      {taskDone ? (
                        <CheckCircle2 size={14} />
                      ) : (
                        <span className="qm3d-task-icon">{quest.icon}</span>
                      )}
                      <span className="qm3d-task-label">{quest.label}</span>
                      <span className="qm3d-task-time">~{quest.minutes}m</span>
                    </Link>
                  );
                })}
                {/* Connecting lines from station to tasks */}
                <svg className="qm3d-task-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {dayConfig.quests.map((_, qi) => {
                    const taskPos = station.taskPositions[qi];
                    return (
                      <line
                        key={qi}
                        x1={station.position.x}
                        y1={station.position.y}
                        x2={taskPos.x}
                        y2={taskPos.y}
                        className="qm3d-task-connector"
                        style={{ animationDelay: `${qi * 0.1}s` }}
                      />
                    );
                  })}
                </svg>
              </>
            )}
          </div>
        );
      })}

      {/* Lexio mascot at current position */}
      <div
        className="qm3d-lexio"
        style={{
          left: `${lexioStation.position.x - 3}%`,
          top: `${lexioStation.position.y - 10}%`,
        }}
      >
        <LexioMascot
          size={56}
          mood={weekQuestCount >= totalQuests ? 'celebrate' : weekQuestCount > 0 ? 'happy' : 'waving'}
        />
      </div>

      {/* Victory Castle hint on far horizon */}
      <div className="qm3d-victory-castle">
        <span className="qm3d-castle-icon">🏰</span>
        <span className="qm3d-castle-label">Victory</span>
      </div>

      {/* Bottom bar */}
      <div className="qm3d-bottom-bar">
        <div className="qm3d-bottom-lexio">
          <LexioMascot size={36} mood="happy" />
          <span className="qm3d-bottom-speech">
            {weekQuestCount === 0
              ? "Let's start your adventure! 🌟"
              : weekQuestCount >= totalQuests
              ? "You did it! Amazing! 🎉"
              : `${totalQuests - weekQuestCount} quests to go! 💪`}
          </span>
        </div>
      </div>

      {/* All done celebration */}
      {weekQuestCount >= totalQuests && (
        <div className="qm3d-all-done">
          <LexioMascot size={80} mood="celebrate" />
          <h2>🎉 Week Complete!</h2>
          <p>All {totalQuests} quests done!</p>
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
