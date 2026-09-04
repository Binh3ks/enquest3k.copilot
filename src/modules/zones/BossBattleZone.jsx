import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import getBossRotaryConfig from '../../config/bossRotarySchedule';
import { getPart, getAllParts, PAPER } from '../../config/cambridgePartRegistry';
import { evaluateMockAssessment } from '../../services/assessment/MockAssessmentEngine';
import BossIntro from '../../components/zones/BossIntro';
import SVGLineMatcher from '../../components/cambridge/SVGLineMatcher';
import NotepadNoteCompleter from '../../components/common/NotepadNoteCompleter';
import VisualMatchingAH from '../../components/cambridge/VisualMatchingAH';
import SVGColorAndWrite from '../../components/cambridge/SVGColorAndWrite';
import WordBankMatchingGrid from '../../components/cambridge/WordBankMatchingGrid';
import DialogueAHCompleter from '../../components/cambridge/DialogueAHCompleter';
import InlineTextClozeDropdown from '../../components/cambridge/InlineTextClozeDropdown';
import TextExtractionCompleter from '../../components/cambridge/TextExtractionCompleter';
import MultipleChoice3Pic from '../../components/cambridge/MultipleChoice3Pic';
import OpenClozeCompleter from '../../components/cambridge/OpenClozeCompleter';
import RWPart3ClozeWithTitle from '../../components/cambridge/RWPart3ClozeWithTitle';
import StoryWriting from '../../components/cambridge/StoryWriting';
import PictureStoryContinuation from '../../components/cambridge/PictureStoryContinuation';
import FindDifferencesInteractive from '../../components/cambridge/FindDifferencesInteractive';
import InformationExchangeP2 from '../../components/cambridge/InformationExchangeP2';
import PersonalQuestionsCompleter from '../../components/cambridge/PersonalQuestionsCompleter';
import { Shield, Trophy, CheckCircle2, RotateCcw, Award, PlayCircle, Star, Sparkles, ArrowLeft } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';
import useDailyQuestStore from '../../stores/useDailyQuestStore';
import { emitLearningEvent, GAMIFICATION_EVENTS } from '../../services/gamificationEventBus';

// ── Domain note ────────────────────────────────────────────────────────────────
// Cambridge Part ≠ Shield.
// completedPartIds[] tracks which Cambridge Part tasks the learner finished.
// Paper Shield scores (listeningShields, rwShields, speakingShields)
//   are computed by MockAssessmentEngine from performance data — NOT from part count.
// Maximum Shield score = 15 (5L + 5RW + 5S).
// ──────────────────────────────────────────────────────────────────────────────

export default function BossBattleZone({ data, weekNumber, forcedStation = null, hideStationTabs = false, onBackToMap = null }) {
  const navigate = useNavigate();
  const routeParams = useParams();
  const location = useLocation();
  const activeWeek = weekNumber || (routeParams?.weekId ? parseInt(routeParams.weekId) : null) || data?.weekNumber || data?.week || data?.rawWeekData?.weekNumber || null;

  const userShields = useUserStore((state) => state.userShields || 0);
  const rotaryConfig = getBossRotaryConfig(activeWeek || 1);

  // ── Boss data wiring (hub data → Cambridge Part data paths) ──────────────
  const bossData = React.useMemo(() => {
    const hasCustomListening = data?.bossBattle?.listening?.p1 || data?.bossBattle?.listening?.p2;
    const hasCustomRW = data?.bossBattle?.readingWriting?.p1 || data?.bossBattle?.readingWriting?.p2;
    if (hasCustomListening || hasCustomRW) return data.bossBattle;

    return {
      listening: {
        p1: data?.listening_hub?.listening_p1 || data?.listeningHubData?.listening_p1 || data?.bossBattle?.listening?.p1,
        p2: data?.listening_hub?.listening_p2 || data?.listening_hub?.listening_p2_notes || data?.listeningHubData?.listening_p2 || data?.bossBattle?.listening?.p2,
        p3: data?.listening_hub?.listening_p3 || data?.listeningHubData?.listening_p3 || data?.bossBattle?.listening?.p3,
        p4: data?.listening_hub?.listening_p4 || data?.listeningHubData?.listening_p4 || data?.listening_hub?.listening_p4_questions || data?.bossBattle?.listening?.p4,
        p5: data?.listening_hub?.listening_p5 || data?.listeningHubData?.listening_p5 || data?.bossBattle?.listening?.p5
      },
      readingWriting: {
        p1: data?.reading_hub?.rw_part_1 || data?.writing_hub?.rw_part_1 || data?.readingHubData?.rw_part_1 || data?.writingHubData?.rw_part_1 || data?.bossBattle?.readingWriting?.p1,
        p2: data?.reading_hub?.rw_part_2 || data?.writing_hub?.rw_part_2 || data?.readingHubData?.rw_part_2 || data?.writingHubData?.rw_part_2 || data?.bossBattle?.readingWriting?.p2,
        p3: data?.reading_hub?.rw_part_3 || data?.writing_hub?.rw_part_3 || data?.readingHubData?.rw_part_3 || data?.writingHubData?.rw_part_3 || data?.bossBattle?.readingWriting?.p3,
        p4: data?.reading_hub?.rw_part_4 || data?.writing_hub?.rw_part_4 || data?.reading_hub?.rw_part4 || data?.writing_hub?.rw_part4 || data?.readingHubData?.rw_part_4 || data?.writingHubData?.rw_part_4 || data?.bossBattle?.readingWriting?.p4,
        p5: data?.reading_hub?.rw_part_5 || data?.writing_hub?.rw_part_5 || data?.reading_hub?.rw_part5 || data?.writing_hub?.rw_part5 || data?.readingHubData?.rw_part_5 || data?.writingHubData?.rw_part_5 || data?.bossBattle?.readingWriting?.p5,
        p6: data?.reading_hub?.rw_part_6 || data?.writing_hub?.rw_part_6 || data?.reading_hub?.rw_part6 || data?.writing_hub?.rw_part6 || data?.readingHubData?.rw_part_6 || data?.writingHubData?.rw_part_6 || data?.bossBattle?.readingWriting?.p6,
        p7: data?.writing_hub?.picture_story || data?.writingHubData?.picture_story || data?.bossBattle?.readingWriting?.p7
      },
      speaking: {
        p1_findDiff:     data?.speaking_hub?.find_differences || data?.speakingHubData?.find_differences || data?.bossBattle?.speaking?.p1_findDiff,
        p2_cueCard:      data?.speaking_hub?.info_exchange_cards || data?.speakingHubData?.info_exchange_cards || data?.bossBattle?.speaking?.p2_cueCard,
        p3_pictureStory: data?.speaking_hub?.picture_story || data?.speakingHubData?.picture_story || data?.bossBattle?.speaking?.p3_pictureStory,
        p4_personalQs:   data?.speaking_hub?.personal_questions || data?.speakingHubData?.personal_questions || data?.bossBattle?.speaking?.p4_personalQs
      }
    };
  }, [data]);

  // ── URL query param parsing ──────────────────────────────────────────────
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const rawPartParam = searchParams.get('part') || searchParams.get('part_id') || searchParams.get('task') || searchParams.get('taskId');
  const qaNonce = searchParams.get('qa_nonce');

  const requestedTaskId = React.useMemo(() => {
    if (!rawPartParam) return null;
    const p = rawPartParam.toLowerCase().trim();
    if (p === '1' || p === 'l1' || p === 'list_p1' || p === 'listening_p1') return 'list_p1';
    if (p === '2' || p === 'l2' || p === 'list_p2' || p === 'listening_p2') return 'list_p2';
    if (p === '3' || p === 'l3' || p === 'list_p3' || p === 'listening_p3') return 'list_p3';
    if (p === '4' || p === 'l4' || p === 'list_p4' || p === 'listening_p4') return 'list_p4';
    if (p === '5' || p === 'l5' || p === 'list_p5' || p === 'listening_p5') return 'list_p5';
    if (p === 'r1' || p === 'rw_p1' || p === 'reading_p1') return 'rw_p1';
    if (p === 'r2' || p === 'rw_p2' || p === 'reading_p2') return 'rw_p2';
    if (p === 'r3' || p === 'rw_p3' || p === 'reading_p3') return 'rw_p3';
    if (p === 'r4' || p === 'rw_p4' || p === 'reading_p4') return 'rw_p4';
    if (p === 'r5' || p === 'rw_p5' || p === 'reading_p5') return 'rw_p5';
    if (p === 'r6' || p === 'rw_p6' || p === 'reading_p6') return 'rw_p6';
    if (p === 'r7' || p === 'rw_p7' || p === 'reading_p7') return 'rw_p7';
    if (p === 's1' || p === 'spk_p1' || p === 'speaking_p1') return 'spk_p1';
    if (p === 's2' || p === 'spk_p2' || p === 'speaking_p2') return 'spk_p2';
    if (p === 's3' || p === 'spk_p3' || p === 'speaking_p3') return 'spk_p3';
    if (p === 's4' || p === 'spk_p4' || p === 'speaking_p4') return 'spk_p4';
    return rawPartParam;
  }, [rawPartParam]);

  // ── Full Mock detection ──────────────────────────────────────────────────
  const isFullMock = rotaryConfig.cycleNumber === 5 || rotaryConfig.cycleNumber === 0;

  // ── Current task list derived from schedule + registry ──────────────────
  // Source of truth: rotaryConfig.activeParts (from bossRotarySchedule.js)
  // enriched with registry metadata. No hardcoded per-cycle arrays here.
  const currentTasks = React.useMemo(() => {
    // Full Mock uses all 16 Parts from the registry — neither R7 nor S4 are omitted
    const scheduledParts = isFullMock ? getAllParts().map(p => ({ partId: p.partId, questId: null })) : (rotaryConfig.activeParts || []);

    let tasks = scheduledParts.map(({ partId, questId }) => {
      const registryEntry = getPart(partId);
      if (!registryEntry) {
        console.warn(`BossBattleZone: partId '${partId}' not found in Cambridge Part Registry.`);
        return null;
      }
      return {
        // Cambridge Part identity from registry (single source of truth)
        partId,
        paper:        registryEntry.paper,
        partNumber:   registryEntry.partNumber,
        displayName:  registryEntry.displayName,
        shortLabel:   registryEntry.shortLabel,
        componentKey: registryEntry.componentKey,
        // Quest completion metadata from schedule (explicit, not index-derived)
        questId,
      };
    }).filter(Boolean);

    // URL deep-link: if a specific Part is requested and not in current schedule, append it
    if (requestedTaskId && !tasks.some(t => t.partId === requestedTaskId)) {
      const registryEntry = getPart(requestedTaskId);
      if (registryEntry) {
        tasks.push({ ...registryEntry, questId: null });
      } else {
        tasks.push({ partId: requestedTaskId, displayName: requestedTaskId, questId: null });
      }
    }

    return tasks;
  }, [rotaryConfig, isFullMock, requestedTaskId]);

  // Tasks specifically belonging to this forced station (or all tasks if not forced)
  const stationTasks = React.useMemo(() => {
    if (!forcedStation) return currentTasks;
    const station = forcedStation.toLowerCase().trim();
    if (['rw_boss', 'reading_boss', 'boss_reading'].includes(station)) {
      return currentTasks.filter(t => t.questId === 'boss_reading' || t.paper === PAPER.READING_WRITING);
    }
    if (['review', 'weekly_review', 'speaking_boss', 'personal_qs'].includes(station)) {
      return currentTasks.filter(t => t.questId === 'weekly_review' || t.paper === PAPER.SPEAKING);
    }
    if (['listening_boss', 'boss_listening'].includes(station)) {
      return currentTasks.filter(t => t.questId === 'boss_listening' || t.paper === PAPER.LISTENING);
    }
    return currentTasks;
  }, [forcedStation, currentTasks]);

  // Initial task index derived from explicit questId and paper contract (ZERO positional assumptions)
  const initialIndex = React.useMemo(() => {
    if (requestedTaskId) {
      const foundIdx = currentTasks.findIndex(t => t.partId === requestedTaskId);
      if (foundIdx !== -1) return foundIdx;
    }
    if (!forcedStation) return 0;

    const station = forcedStation.toLowerCase().trim();
    if (['rw_boss', 'reading_boss', 'boss_reading'].includes(station)) {
      const idx = currentTasks.findIndex(t => t.questId === 'boss_reading' || t.paper === PAPER.READING_WRITING);
      return idx !== -1 ? idx : 0;
    }
    if (['review', 'weekly_review', 'speaking_boss', 'personal_qs'].includes(station)) {
      const idx = currentTasks.findIndex(t => t.questId === 'weekly_review' || t.paper === PAPER.SPEAKING);
      return idx !== -1 ? idx : 0;
    }
    if (['listening_boss', 'boss_listening'].includes(station)) {
      const idx = currentTasks.findIndex(t => t.questId === 'boss_listening' || t.paper === PAPER.LISTENING);
      return idx !== -1 ? idx : 0;
    }
    return 0;
  }, [forcedStation, requestedTaskId, currentTasks]);

  const [hasStarted, setHasStarted] = useState(true);
  const [activeTaskIndex, setActiveTaskIndex] = useState(initialIndex);

  // completedPartIds: which Cambridge Parts the learner has finished this session.
  // Semantics: Cambridge Part completion tracking — NOT Paper Shield scores.
  const [completedPartIds, setCompletedPartIds] = useState([]);

  const [examFinished, setExamFinished] = useState(false);
  // Mock Paper Shield scores (set on Full Mock completion via MockAssessmentEngine)
  const [mockPaperScores, setMockPaperScores] = useState(null);

  const lastForcedStationRef = React.useRef(forcedStation);

  // Sync active task index when forcedStation or requestedTaskId changes (contract-driven)
  React.useEffect(() => {
    if (requestedTaskId) {
      const foundIdx = currentTasks.findIndex(t => t.partId === requestedTaskId);
      if (foundIdx !== -1) {
        setActiveTaskIndex(foundIdx);
        setHasStarted(true);
        return;
      }
    }
    if (lastForcedStationRef.current !== forcedStation) {
      lastForcedStationRef.current = forcedStation;
      if (!forcedStation) return;

      const station = forcedStation.toLowerCase().trim();
      if (['rw_boss', 'reading_boss', 'boss_reading'].includes(station)) {
        const idx = currentTasks.findIndex(t => t.questId === 'boss_reading' || t.paper === PAPER.READING_WRITING);
        if (idx !== -1) setActiveTaskIndex(idx);
      } else if (['review', 'weekly_review', 'speaking_boss', 'personal_qs'].includes(station)) {
        const idx = currentTasks.findIndex(t => t.questId === 'weekly_review' || t.paper === PAPER.SPEAKING);
        if (idx !== -1) setActiveTaskIndex(idx);
      } else if (['listening_boss', 'boss_listening'].includes(station)) {
        const idx = currentTasks.findIndex(t => t.questId === 'boss_listening' || t.paper === PAPER.LISTENING);
        if (idx !== -1) setActiveTaskIndex(idx);
      }
    }
  }, [forcedStation, requestedTaskId, currentTasks]);

  // QA Hook for Victory Screen verification
  React.useEffect(() => {
    window.__triggerBossVictory = (customCompletedParts) => {
      setHasStarted(true);
      setExamFinished(true);
      if (customCompletedParts && Array.isArray(customCompletedParts)) {
        setCompletedPartIds(customCompletedParts);
      } else {
        setCompletedPartIds(['list_p1', 'list_p2', 'list_p3']);
      }
    };
    return () => { delete window.__triggerBossVictory; };
  }, []);

  const currentTask = currentTasks[activeTaskIndex] || currentTasks[0];

  // ── Task completion handler ──────────────────────────────────────────────
  // Quest completion is driven by task.questId (explicit metadata), NOT array index.
  // This eliminates the brittle index 0→boss_listening pattern.
  const handleTaskComplete = (partId) => {
    // Track completed Cambridge Part ID
    if (!completedPartIds.includes(partId)) {
      setCompletedPartIds(prev => [...prev, partId]);
    }

    // Complete the Day-5 quest associated with this Part (explicit — not index-based)
    const task = currentTasks.find(t => t.partId === partId);
    if (task?.questId && activeWeek) {
      useDailyQuestStore.getState().completeQuest(activeWeek, task.questId);
      emitLearningEvent(GAMIFICATION_EVENTS.LEARNING_TASK_COMPLETED, {
        weekNumber: activeWeek,
        taskId: task.questId,
        timestamp: new Date().toISOString()
      });
      // Emit Shield Award event for the specific Cambridge part
      emitLearningEvent(GAMIFICATION_EVENTS.CAMBRIDGE_SHIELD_AWARDED, {
        weekNumber: activeWeek,
        shieldPart: partId,
        newShields: 5, // Default full completion shield for rotary cycle part
        timestamp: new Date().toISOString()
      });
    }

    // Advance to next Part or finish
    if (activeTaskIndex + 1 < currentTasks.length) {
      setActiveTaskIndex(prev => prev + 1);
    } else {
      // All Parts in this cycle/mock completed
      setExamFinished(true);

      // On Full Mock completion: compute Paper Shield scores via MockAssessmentEngine
      if (isFullMock && activeWeek) {
        try {
          const mockResult = evaluateMockAssessment({
            activeWeek,
            completedPartIds: [...completedPartIds, partId],
            scoreData: {}
          });
          setMockPaperScores(mockResult);
        } catch (err) {
          console.warn('MockAssessmentEngine error (non-fatal):', err.message);
        }
      }

      // Complete all Day-5 quests on final Part (idempotent)
      if (activeWeek) {
        ['boss_listening', 'boss_reading', 'weekly_review'].forEach(qId => {
          useDailyQuestStore.getState().completeQuest(activeWeek, qId);
          emitLearningEvent(GAMIFICATION_EVENTS.LEARNING_TASK_COMPLETED, {
            weekNumber: activeWeek,
            taskId: qId,
            timestamp: new Date().toISOString()
          });
        });
      }
    }
  };

  const handleReturnToMap = React.useCallback(() => {
    if (typeof onBackToMap === 'function') {
      onBackToMap();
    } else {
      navigate(`/week/${activeWeek || 33}/hub/1`);
    }
  }, [onBackToMap, navigate, activeWeek]);

  const getUnifiedTitle = React.useCallback(() => {
    if (forcedStation === 'listening_boss' || currentTask?.paper === PAPER.LISTENING) {
      return stationTasks.length > 1 ? 'Listening Part 1 & 2' : 'Listening Part 1';
    }
    if (forcedStation === 'rw_boss' || currentTask?.paper === PAPER.READING_WRITING) {
      return 'Reading & Writing Part 1';
    }
    if (forcedStation === 'review' || currentTask?.paper === PAPER.SPEAKING) {
      return 'Speaking Part 1';
    }
    return currentTask?.displayName || 'Boss Castle';
  }, [forcedStation, currentTask?.paper, currentTask?.displayName, stationTasks.length]);

  const getHeaderTheme = React.useCallback(() => {
    if (currentTask?.paper === PAPER.LISTENING) {
      return 'bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-indigo-200 text-indigo-950';
    }
    if (currentTask?.paper === PAPER.READING_WRITING) {
      return 'bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-emerald-200 text-emerald-950';
    }
    return 'bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border-amber-200 text-amber-950';
  }, [currentTask?.paper]);

  // ── BossIntro screen ─────────────────────────────────────────────────────
  if (!hasStarted) {
    return (
      <div className="w-full max-w-5xl mx-auto font-sans">
        <BossIntro
          rotaryConfig={rotaryConfig}
          onStartBattle={() => setHasStarted(true)}
          userShields={userShields}
          currentTask={currentTask}
        />
      </div>
    );
  }

  // ── Exam Finished / Victory Screen ──────────────────────────────────────
  if (examFinished) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8 sm:p-10 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 border-2 border-amber-400 text-white rounded-3xl text-center space-y-6 shadow-2xl animate-in zoom-in-95">
        <Trophy size={64} className="mx-auto text-amber-400 animate-bounce" />
        <div className="space-y-2">
          <span className="px-3 py-1 bg-amber-500/30 text-amber-300 rounded-full text-xs font-black uppercase tracking-wider">
            Cambridge A2 Flyers Practice Result
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-purple-200">
            🏆 BOSS BATTLE VICTORY!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            You completed all {currentTasks.length} Cambridge Part{currentTasks.length !== 1 ? 's' : ''} for {isFullMock ? 'the Full Practice Exam' : `Cycle ${rotaryConfig.cycleNumber}`}!
          </p>
        </div>

        {/* Completed Cambridge Parts */}
        <div className="flex items-center justify-center gap-3 py-4 flex-wrap">
          {completedPartIds.map((partId, idx) => {
            const part = getPart(partId);
            return (
              <div key={idx} className="p-3 bg-purple-900/60 border border-purple-400/50 rounded-2xl flex items-center gap-2 shadow-lg">
                <CheckCircle2 className="text-amber-400" size={20} />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-black text-purple-300">Cambridge Part Complete</div>
                  <div className="text-xs font-black text-white">{part?.displayName || part?.shortLabel || partId}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Mock: Paper Shield scores (5+5+5 = max 15) */}
        {isFullMock && mockPaperScores && (
          <div className="bg-slate-900/80 rounded-2xl p-4 border border-amber-400/30 text-left space-y-3">
            <div className="text-xs font-black text-amber-300 uppercase text-center mb-2">
              Cambridge Paper Shield Summary (Max 15 Shields)
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-indigo-950/60 rounded-xl border border-indigo-500/30">
                <div className="text-[10px] font-black text-indigo-300 uppercase">Listening</div>
                <div className="text-lg font-black text-amber-400">
                  {mockPaperScores.shields?.listeningShields ?? 5}/5
                </div>
              </div>
              <div className="p-2 bg-emerald-950/60 rounded-xl border border-emerald-500/30">
                <div className="text-[10px] font-black text-emerald-300 uppercase">Reading & Writing</div>
                <div className="text-lg font-black text-amber-400">
                  {mockPaperScores.shields?.rwShields ?? 5}/5
                </div>
              </div>
              <div className="p-2 bg-purple-950/60 rounded-xl border border-purple-500/30">
                <div className="text-[10px] font-black text-purple-300 uppercase">Speaking</div>
                <div className="text-lg font-black text-amber-400">
                  {mockPaperScores.shields?.speakingShields ?? 5}/5
                </div>
              </div>
            </div>
            <div className="text-center pt-1 border-t border-slate-700 flex items-center justify-center gap-2">
              <span className="text-xs text-slate-300 font-bold">Total Shields Earned:</span>
              <span className="text-sm font-black text-amber-400">
                {mockPaperScores.diagnosticPractice?.totalShieldsEarned}/15
              </span>
            </div>
            <div className="text-center text-xs text-purple-300 font-bold">
              {mockPaperScores.diagnosticPractice?.ratingText}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setExamFinished(false);
            setHasStarted(false);
            setActiveTaskIndex(0);
            setCompletedPartIds([]);
            setMockPaperScores(null);
          }}
          className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 text-slate-950 rounded-2xl font-black text-xs shadow-xl inline-flex items-center gap-2"
        >
          <RotateCcw size={16} /> Return to Boss Hub
        </button>
      </div>
    );
  }

  const activeTaskId = requestedTaskId || currentTask?.partId;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-3 animate-in fade-in duration-200 font-sans">
      {/* Unified Boss Assessment Header with Themed Box and Map Return Button */}
      <div
        data-testid="boss-assessment-header"
        className={`rounded-2xl p-2 sm:p-2.5 border-2 shadow-xs flex flex-wrap items-center justify-between gap-2 ${getHeaderTheme()}`}
      >
        {/* Left Side: Map button at TOP-LEFT + Single Non-repeating Title */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Top-Left: Map button with back arrow */}
          <button
            type="button"
            data-testid="boss-back-to-map"
            onClick={handleReturnToMap}
            className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-300 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-2xs transition active:scale-95 shrink-0"
            title="Back to Map"
            aria-label="Back to Map"
          >
            <ArrowLeft size={14} className="text-slate-600" />
            <span>Map</span>
          </button>

          {/* Unified title (no duplicate paper tag) */}
          <div
            data-testid="boss-active-part"
            data-part-id={currentTask.partId}
            data-paper={currentTask.paper}
            data-component={currentTask.componentKey}
            className="text-xs sm:text-sm font-black text-slate-900"
          >
            {getUnifiedTitle()}
          </div>
        </div>

        {/* Right Side: Part Tabs (for multi-part stations: L1/L2) */}
        {stationTasks.length > 1 && (
          <div data-testid="boss-part-tabs" className="flex items-center gap-1 bg-white/80 p-0.5 rounded-xl border border-slate-200 shadow-2xs">
            {stationTasks.map((task) => {
              const isActive = activeTaskId === task.partId;
              const isDone = completedPartIds.includes(task.partId);
              return (
                <button
                  key={task.partId}
                  type="button"
                  data-testid={`boss-part-tab-${task.partId}`}
                  data-part-id={task.partId}
                  onClick={() => {
                    const targetIdx = currentTasks.findIndex(t => t.partId === task.partId);
                    if (targetIdx !== -1) setActiveTaskIndex(targetIdx);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-black transition flex items-center gap-1 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-xs ring-1 ring-amber-300 scale-102'
                      : isDone
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                      : 'bg-slate-100/80 text-slate-700 hover:bg-white border border-slate-200'
                  }`}
                >
                  {isDone && <CheckCircle2 size={11} />}
                  <span>{task.shortLabel || task.partId.toUpperCase()}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Task Content Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-slate-200 shadow-md min-h-[360px]">
        {/* LISTENING P1 */}
        {activeTaskId === 'list_p1' && (
          <SVGLineMatcher
            customData={bossData.listening?.p1}
            listeningData={bossData.listening?.p1}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('list_p1')}
          />
        )}

        {/* LISTENING P2 */}
        {activeTaskId === 'list_p2' && (
          <NotepadNoteCompleter
            customData={bossData.listening?.p2}
            data={bossData.listening?.p2}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('list_p2')}
          />
        )}

        {/* LISTENING P3 */}
        {activeTaskId === 'list_p3' && (
          <VisualMatchingAH
            customData={bossData.listening?.p3}
            matchingData={bossData.listening?.p3}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('list_p3')}
          />
        )}

        {/* LISTENING P4 */}
        {activeTaskId === 'list_p4' && (
          <MultipleChoice3Pic
            customData={bossData.listening?.p4}
            data={bossData.listening?.p4}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('list_p4')}
          />
        )}

        {/* LISTENING P5 */}
        {activeTaskId === 'list_p5' && (
          <SVGColorAndWrite
            customData={bossData.listening?.p5}
            data={bossData.listening?.p5}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('list_p5')}
          />
        )}

        {/* R&W P1 */}
        {activeTaskId === 'rw_p1' && (
          <WordBankMatchingGrid
            customData={bossData.readingWriting?.p1}
            data={bossData.readingWriting?.p1}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('rw_p1')}
          />
        )}

        {/* R&W P2 */}
        {activeTaskId === 'rw_p2' && (
          <DialogueAHCompleter
            customData={bossData.readingWriting?.p2}
            data={bossData.readingWriting?.p2}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('rw_p2')}
          />
        )}

        {/* R&W P3 */}
        {activeTaskId === 'rw_p3' && (
          <RWPart3ClozeWithTitle
            customData={bossData.readingWriting?.p3}
            data={bossData.readingWriting?.p3}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('rw_p3')}
          />
        )}

        {/* R&W P4 */}
        {activeTaskId === 'rw_p4' && (
          <InlineTextClozeDropdown
            customData={bossData.readingWriting?.p4}
            data={bossData.readingWriting?.p4}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('rw_p4')}
          />
        )}

        {/* R&W P5 */}
        {activeTaskId === 'rw_p5' && (
          <TextExtractionCompleter
            customData={bossData.readingWriting?.p5}
            data={bossData.readingWriting?.p5}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('rw_p5')}
          />
        )}

        {/* R&W P6 */}
        {activeTaskId === 'rw_p6' && (
          <OpenClozeCompleter
            customData={bossData.readingWriting?.p6}
            data={bossData.readingWriting?.p6}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('rw_p6')}
          />
        )}

        {/* R&W P7 — Story Writing (Cambridge A2 Flyers Part 7) */}
        {activeTaskId === 'rw_p7' && (
          <StoryWriting
            customData={bossData.readingWriting?.p7}
            data={bossData.readingWriting?.p7}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('rw_p7')}
          />
        )}

        {/* SPEAKING P1 */}
        {activeTaskId === 'spk_p1' && (
          <FindDifferencesInteractive
            customData={bossData.speaking?.p1_findDiff}
            data={bossData.speaking?.p1_findDiff}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('spk_p1')}
          />
        )}

        {/* SPEAKING P2 */}
        {activeTaskId === 'spk_p2' && (
          <InformationExchangeP2
            customData={bossData.speaking?.p2_cueCard}
            data={bossData.speaking?.p2_cueCard}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('spk_p2')}
          />
        )}

        {/* SPEAKING P3 */}
        {activeTaskId === 'spk_p3' && (
          <PictureStoryContinuation
            customData={bossData.speaking?.p3_pictureStory}
            data={bossData.speaking?.p3_pictureStory}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('spk_p3')}
          />
        )}

        {/* SPEAKING P4 — Personal Questions (now included in Full Mock) */}
        {(activeTaskId === 'spk_p4' || activeTaskId === 'personal_questions' || forcedStation === 'personal_qs') && (
          <PersonalQuestionsCompleter
            customData={bossData.speaking?.p4_personalQs}
            data={bossData.speaking?.p4_personalQs}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('spk_p4')}
          />
        )}
      </div>
    </div>
  );
}
