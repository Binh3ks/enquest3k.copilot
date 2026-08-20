import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { QUEST_SCHEDULE } from '../../config/questSchedule';
import useDailyQuestStore from '../../stores/useDailyQuestStore';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import LexioMascot from '../mascot/LexioMascot';
import './TaskScreen.css';

/**
 * TaskScreen — Full-screen wrapper for individual tasks.
 * NO sidebar, NO gear tabs. Just the task content + back button + progress.
 * 
 * URL: /week/:weekId/task/:taskId
 * Renders the appropriate task component based on taskId.
 */

// Lazy-load task components
const StoryWorldZone = React.lazy(() => import('../../modules/zones/StoryWorldZone'));
const BattleArenaZone = React.lazy(() => import('../../modules/zones/BattleArenaZone'));
const CreatorStudioZone = React.lazy(() => import('../../modules/zones/CreatorStudioZone'));
const BossBattleZone = React.lazy(() => import('../../modules/zones/BossBattleZone'));

// Map taskId to zone + gear/station params
const TASK_ROUTING = {
  gear1_webtoon:    { zone: 'story',   gear: 1 },
  gear2_karaoke:    { zone: 'story',   gear: 2 },
  gear3_retell:     { zone: 'story',   gear: 3 },
  gear4_clil:       { zone: 'story',   gear: 4 },
  vocab_explorer:   { zone: 'arena',   station: 'vocab_explorer' },
  word_power:       { zone: 'arena',   station: 'word_power' },
  word_blitz:       { zone: 'arena',   station: 'word_blitz' },
  sentence_smash:   { zone: 'arena',   station: 'sentence_smash' },
  math_quest:       { zone: 'arena',   station: 'math_quest' },
  story_writer:     { zone: 'create',  station: 'writing' },
  science_report:   { zone: 'create',  station: 'dictation' },
  broadcast_studio: { zone: 'create',  station: 'broadcast' },
  dictation:        { zone: 'create',  station: 'dictation' },
  boss_listening:   { zone: 'boss',    station: 'listening_boss' },
  shadowing:        { zone: 'boss',    station: 'shadowing' },
  weekly_review:    { zone: 'boss',    station: 'review' },
};

export default function TaskScreen({ weekData, weekId: propWeekId }) {
  const params = useParams();
  const navigate = useNavigate();
  const weekId = propWeekId || parseInt(params.weekId);
  const taskId = params.taskId;
  const [showComplete, setShowComplete] = useState(false);

  // Find task info from QUEST_SCHEDULE
  const taskInfo = useMemo(() => {
    for (const day of QUEST_SCHEDULE) {
      const quest = day.quests.find(q => q.id === taskId);
      if (quest) return { ...quest, dayLabel: day.label };
    }
    return null;
  }, [taskId]);

  const routing = TASK_ROUTING[taskId];

  // TaskScreen does not auto-complete on mount; completion is triggered when user finishes the activity

  const handleBackToMap = () => {
    navigate(`/week/${weekId}/hub/1`);
  };

  if (!routing || !taskInfo) {
    return (
      <div className="ts-container">
        <div className="ts-error">
          <LexioMascot size={80} mood="thinking" />
          <h2>Task not found</h2>
          <button className="ts-back-btn" onClick={handleBackToMap}>← Back to Map</button>
        </div>
      </div>
    );
  }

  return (
    <div className="ts-container">
      {/* Top bar */}
      <div className="ts-header">
        <button className="ts-back-btn" onClick={handleBackToMap}>
          <ArrowLeft size={18} />
          <span>Map</span>
        </button>
        <div className="ts-task-info">
          <span className="ts-task-icon">{taskInfo.icon}</span>
          <span className="ts-task-name">{taskInfo.label}</span>
        </div>
        <div className="ts-task-time">
          <Clock size={12} />
          <span>~{taskInfo.minutes}m</span>
        </div>
      </div>

      {/* Task content — renders the appropriate zone component */}
      <div className="ts-content">
        <Suspense fallback={
          <div className="ts-loading">
            <LexioMascot size={64} mood="thinking" />
            <p>Loading...</p>
          </div>
        }>
          {routing.zone === 'story' && (
            <StoryWorldZone
              data={weekData ? (typeof weekData === 'object' ? weekData : {}) : {}}
              weekNumber={weekId}
              forcedGear={routing.gear}
              hideGearTabs={true}
            />
          )}
          {routing.zone === 'arena' && (
            <BattleArenaZone
              data={weekData || {}}
              weekNumber={weekId}
              forcedStation={routing.station}
              hideStationTabs={true}
            />
          )}
          {routing.zone === 'create' && (
            <CreatorStudioZone
              data={weekData || {}}
              weekNumber={weekId}
              forcedStation={routing.station}
              hideStationTabs={true}
            />
          )}
          {routing.zone === 'boss' && (
            <BossBattleZone
              data={weekData || {}}
              weekNumber={weekId}
              forcedStation={routing.station}
              hideStationTabs={true}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
}
