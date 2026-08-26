import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Trophy, Flame, Sparkles } from 'lucide-react';
import { QUEST_SCHEDULE } from '../../config/questSchedule';
import useDailyQuestStore from '../../stores/useDailyQuestStore';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import LexioMascot from '../mascot/LexioMascot';
import useArcadeStore from '../../stores/useArcadeStore';
import { useUserStore } from '../../stores/useUserStore';
import ArcadeModal from '../games/ArcadeModal';
import { CLILSealStamp, GrandStampModal } from '../cambridge/ExplorerPassport';
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

function adaptInfoExchangeCards(infoCards) {
  if (!infoCards) return null;
  // Already in full table_a/table_b format
  if (infoCards.table_a && infoCards.table_b && Array.isArray(infoCards.table_a?.fields) && infoCards.table_a.fields[0]?.cue_prompt) {
    return infoCards;
  }

  const candidateCard = infoCards.candidate_card || infoCards.table_a || {};
  const examinerCard = infoCards.examiner_card || infoCards.table_b || {};
  const cardATitle = candidateCard.title || "Candidate Card";
  const cardBTitle = examinerCard.title || "Examiner Card";

  const toFieldsA = (card) => {
    const items = card.items || card.fields || [];
    return items.map((item, i) => {
      const label = item.label || item.field_label || `Feature ${i + 1}`;
      const isUnknown = item.known === false;
      const fullAnswerVal = (infoCards.full_answers && infoCards.full_answers[label])
        ? (Array.isArray(infoCards.full_answers[label]) ? infoCards.full_answers[label][0] : infoCards.full_answers[label])
        : null;
      const val = isUnknown ? null : (item.value || fullAnswerVal || null);
      const cueWord = label.toLowerCase().includes('location') || label.toLowerCase().includes('where')
        ? 'where'
        : label.toLowerCase().includes('time') || label.toLowerCase().includes('when')
        ? 'when'
        : 'what';

      return {
        id: `field_a${i + 1}`,
        label: `${label}: ${isUnknown ? '???' : (val || '')}`,
        field_label: label,
        value: val,
        known: !isUnknown,
        is_missing: isUnknown,
        cue_word: cueWord,
        cue_prompt: `${cueWord.toUpperCase()} — ${label.toLowerCase()}`,
        nova_reply: `The ${label.toLowerCase()} is ${fullAnswerVal || val || ''}.`,
        acceptable_questions: [
          `What is the ${label.toLowerCase()} of ${cardATitle}?`,
          `Where is the ${label.toLowerCase()}?`,
          `When is the ${label.toLowerCase()}?`,
          `Can you tell me the ${label.toLowerCase()}?`,
          `What is the ${label.toLowerCase()}?`
        ]
      };
    });
  };

  const toFieldsB = (card) => {
    const items = card.items || card.fields || [];
    return items.map((item, i) => {
      const label = item.label || item.field_label || `Detail ${i + 1}`;
      const isUnknown = item.known === false;
      const fullAnswerVal = (infoCards.full_answers && infoCards.full_answers[label])
        ? (Array.isArray(infoCards.full_answers[label]) ? (infoCards.full_answers[label][1] || infoCards.full_answers[label][0]) : infoCards.full_answers[label])
        : null;
      const val = isUnknown ? null : (item.value || fullAnswerVal || null);
      const examinerQ = (infoCards.examiner_questions && infoCards.examiner_questions[i]) ? infoCards.examiner_questions[i].text : `What is the ${label.toLowerCase()} of ${cardBTitle}?`;
      return {
        id: `field_b${i + 1}`,
        label: `${label}: ${isUnknown ? '???' : (val || '')}`,
        field_label: label,
        value: val,
        known: !isUnknown,
        is_missing: isUnknown,
        audio_url: (infoCards.examiner_questions && infoCards.examiner_questions[i] && infoCards.examiner_questions[i].audio_url) || null,
        nova_question: examinerQ,
        answer: val || fullAnswerVal,
        acceptable_answers: [
          val || fullAnswerVal || '',
          `The ${label.toLowerCase()} is ${val || fullAnswerVal || ''}.`
        ]
      };
    });
  };

  return {
    topic: infoCards.topic || `${cardATitle} & ${cardBTitle}`,
    prompt_questions: infoCards.prompt_questions || [
      `Where does the character live?`,
      `What is the special skill?`,
      `When is the resting time?`
    ],
    table_a: {
      title: `${cardATitle} (Candidate Question Card)`,
      fields: toFieldsA(candidateCard)
    },
    table_b: {
      title: `${cardBTitle} (Examiner Answer Card)`,
      fields: toFieldsB(examinerCard)
    }
  };
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
      reading_hub: {},
      listening_hub: {},
      writing_hub: {},
      speaking_hub: {},
      stations: {},
      rawWeekData: {}
    };
  }

  // Resolve speaking hub and skill practice hub
  const speakingHub = weekData.speaking_hub || weekData.speakingHub || weekData.stations?.speaking_hub || {};
  const skillPracticeHub = weekData.skill_practice_hub || weekData.skillPracticeHub || weekData.stations?.skill_practice_hub || {};
  // Build cue_card_info_exchange: check multiple sources, adapt if needed
  const rawInfoExchange = weekData.speaking_hub?.info_exchange_cards
    || weekData.speakingHub?.info_exchange_cards
    || speakingHub.info_exchange_cards
    || weekData.cue_card_info_exchange
    || weekData.speaking_hub?.cue_card_info_exchange
    || weekData.speakingHub?.cue_card_info_exchange;

  const cue_card_info_exchange = adaptInfoExchangeCards(rawInfoExchange);

  return {
    ...weekData,
    weekNumber: weekData.weekNumber || weekId || 33,
    storyWorld: weekData.storyWorld || { storyScenes: [], vocab: [], grammarDrills: [] },
    battleArena: weekData.battleArena || {
      vocab: [],
      grammarDrills: skillPracticeHub.grammar_drills || [],
      flashArena: skillPracticeHub.flash_arena || null,
      barModel: skillPracticeHub.singapore_math || [],
      scienceLab: skillPracticeHub.science_lab || null
    },
    creatorStudio: weekData.creatorStudio || { pictureStory: null, storyPrompts: {}, podcastScenes: [], debateTopics: [] },
    bossBattle: weekData.bossBattle || { listening: {}, readingWriting: {}, speaking: {} },
    reading_hub: weekData.reading_hub || weekData.stations?.reading_hub || {},
    listening_hub: weekData.listening_hub || weekData.stations?.listening_hub || {},
    writing_hub: weekData.writing_hub || weekData.stations?.writing_hub || {},
    speaking_hub: speakingHub,
    skill_practice_hub: skillPracticeHub,
    skillPracticeHub,
    stations: weekData.stations || {},
    rawWeekData: weekData.rawWeekData || weekData,
    // Inject adapted info_exchange data at root so InfoExchangeZone finds it
    cue_card_info_exchange: cue_card_info_exchange || weekData.cue_card_info_exchange || null
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
          <button type="button" className="ts-back-btn" onClick={handleBackToMap}>← Back to Map</button>
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

  const [showPassportModal, setShowPassportModal] = useState(false);
  const qaNonce = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('qa_nonce') : null;

  return (
    <div className="ts-container relative">
      {/* QA Nonce Banner */}
      {qaNonce && (
        <div
          data-testid="qa-nonce-badge"
          className="fixed top-3 right-3 z-[9999] px-3 py-1 bg-amber-400 text-slate-950 font-mono font-black text-xs rounded-full shadow-xl border-2 border-slate-950 flex items-center gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
          <span>NONCE: {qaNonce}</span>
        </div>
      )}

      {/* Top bar */}
      <div className="ts-header">
        <button
          type="button"
          className="ts-back-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleBackToMap();
          }}
          aria-label="Back to Map"
        >
          <ArrowLeft size={16} />
          <span>Map</span>
        </button>
        <div className="ts-task-info">
          <span className="ts-task-icon">{taskInfo.icon}</span>
          <span className="ts-task-name">{taskInfo.label}</span>
        </div>
        
        {/* Dynamic Header Action: CLIL Stamp (CLIL only) + XP Reward */}
        <div className="ts-header-actions">
          {(taskId === 'gear4_clil' || taskId === 'explore') && (
            <CLILSealStamp
              stampId="science"
              level={1}
              size="sm"
              onClick={() => setShowPassportModal(true)}
              className="hover:scale-110"
            />
          )}

          {taskInfo.isMilestone || taskInfo.xp === 0 ? (
            <div className="ts-xp-badge ts-milestone-badge bg-indigo-50 border border-indigo-200 text-indigo-800 font-bold">
              <Sparkles size={12} className="text-indigo-600" />
              <span>Milestone</span>
            </div>
          ) : (
            <div className="ts-xp-badge">
              <Trophy size={12} className="text-amber-500" />
              <span>+{taskInfo.xp} XP</span>
            </div>
          )}
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

      {/* CLIL Grand Stamp Modal */}
      <GrandStampModal
        isOpen={showPassportModal}
        stampId="science"
        level={1}
        weekNumber={weekId}
        onClose={() => setShowPassportModal(false)}
      />
    </div>
  );
}
