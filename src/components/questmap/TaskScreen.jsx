import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Trophy, Flame } from 'lucide-react';
import { QUEST_SCHEDULE } from '../../config/questSchedule';
import useDailyQuestStore from '../../stores/useDailyQuestStore';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import LexioMascot from '../mascot/LexioMascot';
import useArcadeStore from '../../stores/useArcadeStore';
import { useUserStore } from '../../stores/useUserStore';
import ArcadeModal from '../games/ArcadeModal';
import './TaskScreen.css';

/**
 * TaskScreen — Full-screen wrapper for individual tasks.
 * NO sidebar, NO gear tabs. Just the task content + back button + progress.
 * 
 * URL: /week/:weekId/task/:taskId
 * Renders the appropriate task component based on taskId.
 */

// Static direct imports — zero async suspense delay
import StoryWorldZone from '../../modules/zones/StoryWorldZone';
import BattleArenaZone from '../../modules/zones/BattleArenaZone';
import CreatorStudioZone from '../../modules/zones/CreatorStudioZone';
import BossBattleZone from '../../modules/zones/BossBattleZone';
import InfoExchangeZone from '../../modules/zones/InfoExchangeZone';

// Map taskId to zone + gear/station params
const TASK_ROUTING = {
  gear1_webtoon:    { zone: 'story',   gear: 1 },
  gear2_karaoke:    { zone: 'story',   gear: 2 },
  gear3_retell:     { zone: 'story',   gear: 3 },
  gear4_clil:       { zone: 'story',   gear: 4 },
  science_lab:      { zone: 'arena',   station: 'science_lab' },
  science_report:   { zone: 'create',  station: 'science_report' }, // maps to ScienceReportCreator in CreatorStudioZone
  word_blitz:       { zone: 'arena',   station: 'word_blitz' },
  sentence_smash:   { zone: 'arena',   station: 'sentence_smash' },
  math_quest:       { zone: 'arena',   station: 'math_quest' },
  story_writer:       { zone: 'create',       station: 'writing' },
  broadcast_studio:  { zone: 'create',       station: 'broadcast' },
  ai_debate:         { zone: 'create',       station: 'ai_debate' },  // Legacy — kept for backward compat
  info_exchange:     { zone: 'info_exchange' },  // Cambridge Speaking Part 2 (replaces Debate Arena)
  boss_listening:   { zone: 'boss',    station: 'listening_boss' },
  boss_reading:     { zone: 'boss',    station: 'rw_boss' },
  weekly_review:    { zone: 'boss',    station: 'review' },
};

class TaskErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('[TaskScreen Error]', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px] space-y-4">
          <LexioMascot size={64} mood="thinking" />
          <h3 className="font-black text-slate-800 text-lg">Task Encountered an Issue</h3>
          <p className="text-xs text-slate-500 max-w-sm">
            {this.state.error?.message || 'Unable to load this task content. Please return to the map.'}
          </p>
          <button
            type="button"
            onClick={this.props.onBackToMap}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-md transition"
          >
            ← Back to Map
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function getSafeTaskData(weekData, weekId) {
  if (!weekData || typeof weekData !== 'object') {
    return {
      weekNumber: weekId || 33,
      theme: 'Weekly Theme',
      storyWorld: { storyScenes: [], vocab: [], grammarDrills: [] },
      battleArena: { vocab: [], grammarDrills: [], flashArena: null, barModel: [], scienceLab: null },
      creatorStudio: { pictureStory: null, storyPrompts: {}, podcastScenes: [], debateTopics: [] },
      bossBattle: { listening: {}, readingWriting: {}, speaking: {} },
      stations: {},
      rawWeekData: {}
    };
  }
  return {
    ...weekData,
    weekNumber: weekData.weekNumber || weekId || 33,
    storyWorld: weekData.storyWorld || { storyScenes: [], vocab: [], grammarDrills: [] },
    battleArena: weekData.battleArena || { vocab: [], grammarDrills: [], flashArena: null, barModel: [], scienceLab: null },
    creatorStudio: weekData.creatorStudio || { pictureStory: null, storyPrompts: {}, podcastScenes: [], debateTopics: [] },
    bossBattle: weekData.bossBattle || { listening: {}, readingWriting: {}, speaking: {} },
    stations: weekData.stations || {},
    rawWeekData: weekData.rawWeekData || weekData
  };
}

export default function TaskScreen({ weekData, weekId: propWeekId }) {
  const params = useParams();
  const navigate = useNavigate();
  const weekId = propWeekId || parseInt(params.weekId);
  const taskId = params.taskId;
  const currentUser = useUserStore(state => state.currentUser);
  const isOwner = currentUser?.role === 'owner' || ['admin', 'super_admin', 'teacher', 'team_leader', 'center_director'].includes(currentUser?.role);

  const safeData = useMemo(() => getSafeTaskData(weekData, weekId), [weekData, weekId]);

  // Find task info from QUEST_SCHEDULE
  const taskInfo = useMemo(() => {
    for (const day of QUEST_SCHEDULE) {
      const quest = day.quests.find(q => q.id === taskId);
      if (quest) return { ...quest, dayLabel: day.label };
    }
    return null;
  }, [taskId]);

  const routing = TASK_ROUTING[taskId];

  const handleBackToMap = () => {
    navigate(`/week/${weekId}/hub/1`);
  };

  if (!routing || !taskInfo) {
    return (
      <div className="ts-container">
        <div className="ts-error">
          <LexioMascot size={80} mood="thinking" />
          <h2>Task not found: {taskId}</h2>
          <button className="ts-back-btn" onClick={handleBackToMap}>← Back to Map</button>
        </div>
      </div>
    );
  }

  const {
    isArcadeOpen,
    setArcadeOpen,
    playEnergySeconds,
    recordActiveInteraction
  } = useArcadeStore();

  // Active interaction tracker (every 10s while tab is focused)
  useEffect(() => {
    const handleUserActivity = () => {
      recordActiveInteraction(weekId);
    };

    window.addEventListener('click', handleUserActivity, { passive: true });
    window.addEventListener('keydown', handleUserActivity, { passive: true });
    return () => {
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, [weekId, recordActiveInteraction]);

  return (
    <div className="ts-container">
      {/* Top bar */}
      <div className="ts-header">
        <button className="ts-back-btn" onClick={handleBackToMap}>
          <ArrowLeft size={16} />
          <span className="hidden xs:inline">Map</span>
        </button>
        <div className="ts-task-info">
          <span className="ts-task-icon">{taskInfo.icon}</span>
          <span className="ts-task-name">{taskInfo.label}</span>
        </div>
        
        {/* Arcade Button + Unified XP Reward & Time Badge */}
        <div className="ts-header-actions">
          <button
            type="button"
            onClick={() => setArcadeOpen(true)}
            className={`ts-arcade-btn ${
              playEnergySeconds > 0
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/30 ring-2 ring-cyan-400/40'
                : 'bg-slate-100 text-slate-700'
            }`}
            title="Open Arcade Room"
          >
            <span>🕹️</span>
            <span className="hidden md:inline">Arcade</span>
            {playEnergySeconds > 0 ? (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
            ) : (
              <span className="text-[10px] text-slate-400">🔒</span>
            )}
          </button>

          <div className="ts-xp-badge">
            <Trophy size={12} className="text-amber-500" />
            <span>+{taskInfo.xp || 50}</span>
          </div>
          <div className="ts-task-time">
            <Clock size={11} />
            <span>~{taskInfo.minutes}m</span>
          </div>
        </div>
      </div>

      {/* Task content — wrapped in TaskErrorBoundary */}
      <div className="ts-content">
        <TaskErrorBoundary onBackToMap={handleBackToMap}>
          {routing.zone === 'story' && (
            <StoryWorldZone
              data={safeData}
              weekNumber={weekId}
              forcedGear={routing.gear}
              hideGearTabs={true}
            />
          )}
          {routing.zone === 'arena' && (
            <BattleArenaZone
              data={safeData}
              weekNumber={weekId}
              forcedStation={routing.station}
              hideStationTabs={true}
            />
          )}
          {routing.zone === 'create' && (
            <CreatorStudioZone
              data={safeData}
              weekNumber={weekId}
              forcedStation={routing.station}
              hideStationTabs={true}
            />
          )}
          {routing.zone === 'boss' && (
            <BossBattleZone
              data={safeData}
              weekNumber={weekId}
              forcedStation={routing.station}
              hideStationTabs={true}
            />
          )}
          {routing.zone === 'info_exchange' && (
            <InfoExchangeZone
              data={safeData}
              weekNumber={weekId}
            />
          )}
        </TaskErrorBoundary>
      </div>

      {/* Arcade Room Modal */}
      <ArcadeModal
        isOpen={isArcadeOpen}
        weekNumber={weekId}
        ownerBypass={isOwner}
        onClose={() => setArcadeOpen(false)}
      />
    </div>
  );
}
