import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import StoryWriting from '../write_speak/StoryWriting';
import RetellRecorder from '../../components/zones/RetellRecorder';
import ScienceReportCreator from '../../components/cambridge/ScienceReportCreator';
import AIDebateMode from '../../components/cambridge/AIDebateMode';
import CreatorBrainRefresh from '../../components/zones/CreatorBrainRefresh';
import Shadowing from '../shadowing/Shadowing';
import ShadowingErrorBoundary from '../shadowing/ShadowingErrorBoundary';
import { PenTool, Mic, TestTube, MessageSquare, Trophy, Sparkles, AlertCircle, Zap } from 'lucide-react';
import { useStationProgress } from '../../hooks/useStationProgress';
import useDailyQuestStore from '../../stores/useDailyQuestStore';
import { emitLearningEvent, GAMIFICATION_EVENTS } from '../../services/gamificationEventBus';

export default function CreatorStudioZone({ data, weekNumber, forcedStation = null, hideStationTabs = false }) {
  const [searchParams] = useSearchParams();
  const routeParams = useParams();
  const activeWeek = weekNumber || (routeParams?.weekId ? parseInt(routeParams.weekId) : null) || data?.weekNumber || data?.week || data?.rawWeekData?.weekNumber || null;

  const studioData = data?.creatorStudio || {};
  // Fallback: pull writing data from writing_hub (canonical W33+) or stations.writing
  const writingData = data?.writing_hub || data?.stations?.writing || {};
  const storyPrompts = studioData.storyPrompts || {
    // W33+: writing_hub.picture_story maps to picture_mode
    picture_mode: writingData.picture_story || writingData.picture_mode,
    topic_mode:   writingData.topic_mode,
  };

  const STATION_TO_TAB = {
    writing: 'story_writer',
    broadcast: 'podcast_creator',
    dictation: 'science_report',
    science_report: 'science_report',
    ai_debate: 'ai_debate',
  };
  const [activeTab, setActiveTab] = useState(forcedStation ? (STATION_TO_TAB[forcedStation] || 'story_writer') : 'story_writer');
  const [studioXP, setStudioXP] = useState(0);

  // Sync from forcedStation
  useEffect(() => {
    if (forcedStation && STATION_TO_TAB[forcedStation]) setActiveTab(STATION_TO_TAB[forcedStation]);
  }, [forcedStation]);

  // Sync tab from URL ?station=... (only if not forced)
  useEffect(() => {
    if (forcedStation) return;
    const station = searchParams.get('station');
    if (station === 'broadcast') setActiveTab('podcast_creator');
    else if (station === 'writing') setActiveTab('story_writer');
    else if (station === 'dictation' || station === 'science_report') setActiveTab('science_report');
    else if (station === 'refresh') setActiveTab('brain_refresh');
    else if (station === 'shadowing') setActiveTab('shadowing_studio');
  }, [searchParams, forcedStation]);

  // Quest completion: mark current tab's quest when switching away
  const handleTabSwitch = (newTab) => {
    setActiveTab(newTab);
  };

  // Hydrate story submission from persistent station progress (story_writing)
  const { savedData: storySavedData } = useStationProgress(activeWeek, 'story_writing');

  const [storySubmission, setStorySubmission] = useState(null);

  // Sync saved story progress to Broadcast Studio on mount / progress update
  useEffect(() => {
    // 5 canonical scene frames as fallback so prompter ALWAYS has 5 full scenes
    const canonicalSteps = writingData?.picture_story?.steps || [];
    const defaultScenes = [
      { id: 1, func: 'setting',  title: 'Scene 1: Setting 🔵', defaultText: canonicalSteps[0]?.frame_L1 || canonicalSteps[0]?.caption || "In the beginning, Jake was walking carefully down the school corridor while a boy ran very fast past him." },
      { id: 2, func: 'action',   title: 'Scene 2: Action 🟢',  defaultText: canonicalSteps[1]?.frame_L1 || canonicalSteps[1]?.caption || "Suddenly, the boy slipped on the wet floor and lost his balance. He fell down heavily and hurt his knee badly." },
      { id: 3, func: 'problem',  title: 'Scene 3: Problem 🟠', defaultText: canonicalSteps[2]?.frame_L1 || canonicalSteps[2]?.caption || "Then, Jake called the school nurse. She arrived quickly with a clean bandage and treated him carefully." },
      { id: 4, func: 'climax',   title: 'Scene 4: Response 🟣', defaultText: canonicalSteps[3]?.frame_L1 || canonicalSteps[3]?.caption || "After that, Headmaster Brown arrived and spoke to all the students about corridor safety rules." },
      { id: 5, func: 'solution', title: 'Scene 5: Ending ⭐',  defaultText: canonicalSteps[4]?.frame_L1 || canonicalSteps[4]?.caption || "In the end, the Headmaster gave Jake a special safety award at the school assembly. Everyone felt proud of him." }
    ];

    const panelTexts = (storySavedData?.panelTexts && Array.isArray(storySavedData.panelTexts)) ? storySavedData.panelTexts : [];

    // Map through ALL 5 SCENES: Use user's written panel if present, otherwise use canonical default text
    const podcastScenes = defaultScenes.map((s, i) => {
      const userPanel = (panelTexts[i] || '').trim();
      const isRealUserText = userPanel && !userPanel.startsWith('(') && userPanel.length > 5;
      return {
        id: s.id,
        narrative_function: s.func,
        title: s.title,
        en: isRealUserText ? userPanel : s.defaultText
      };
    });

    setStorySubmission({
      mode: 'structured',
      finalText: storySavedData?.text || podcastScenes.map(s => s.en).join(' '),
      podcastScenes
    });
  }, [storySavedData, writingData]);

  const handleStoryComplete = useCallback((xpEarned = 50, finalText = '', extraData = null) => {
    if (xpEarned > 0) setStudioXP(prev => prev + xpEarned);
    if (activeWeek && xpEarned > 0) {
      useDailyQuestStore.getState().completeQuest(activeWeek, 'story_writer');
      emitLearningEvent(GAMIFICATION_EVENTS.LEARNING_TASK_COMPLETED, {
        weekNumber: activeWeek,
        taskId: 'story_writer',
        timestamp: new Date().toISOString()
      });
    }

    if (extraData?.panelTexts && extraData.panelTexts.length >= 3) {
      // New 5-panel format from StoryWriting
      const sceneLabels = [
        { id: 1, func: 'setting',  title: 'Scene 1: Setting \uD83D\uDD35' },
        { id: 2, func: 'action',   title: 'Scene 2: Action \uD83D\uDFE2' },
        { id: 3, func: 'problem',  title: 'Scene 3: Problem \uD83D\uDFE0' },
        { id: 4, func: 'climax',   title: 'Scene 4: Response \uD83D\uDFE3' },
        { id: 5, func: 'solution', title: 'Scene 5: Ending \u2B50' },
      ];
      setStorySubmission(prev => {
        if (prev?.finalText === finalText && prev?.mode === 'structured') return prev;
        const podcastScenes = sceneLabels.map((s, i) => ({
          id: s.id, narrative_function: s.func, title: s.title,
          en: (extraData.panelTexts[i] || '').trim(),
        })).filter(s => s.en.length > 0);
        return { mode: 'structured', finalText, podcastScenes };
      });
    } else if (extraData?.structured && extraData?.fields) {
      const { setting = '', action = '', problem = '', solution = '' } = extraData.fields;
      setStorySubmission(prev => {
        if (prev?.finalText === finalText && prev?.mode === 'structured') return prev;
        const podcastScenes = [
          { id: 1, narrative_function: 'setting',  title: 'Scene 1: Setting',  en: setting.trim()  || '(Write in Story Writer)' },
          { id: 2, narrative_function: 'action',   title: 'Scene 2: Action',   en: action.trim()   || '(Write in Story Writer)' },
          { id: 3, narrative_function: 'problem',  title: 'Scene 3: Problem',  en: problem.trim()  || '(Write in Story Writer)' },
          { id: 4, narrative_function: 'solution', title: 'Scene 4: Ending',   en: solution.trim() || '(Write in Story Writer)' },
        ];
        return { mode: 'structured', finalText, podcastScenes };
      });
    } else if (finalText) {
      setStorySubmission(prev => {
        if (prev?.finalText === finalText && prev?.mode === 'freeform') return prev;
        const sentences = finalText
          .replace(/([.!?])\s+/g, '$1|SPLIT|')
          .split('|SPLIT|')
          .map(s => s.trim())
          .filter(s => s.length > 10);
        const fifth = Math.ceil(sentences.length / 5);
        const podcastScenes = [
          { id: 1, narrative_function: null, title: 'Scene 1', en: sentences.slice(0, fifth).join(' ') || finalText },
          { id: 2, narrative_function: null, title: 'Scene 2', en: sentences.slice(fifth, fifth * 2).join(' ') || '' },
          { id: 3, narrative_function: null, title: 'Scene 3', en: sentences.slice(fifth * 2, fifth * 3).join(' ') || '' },
          { id: 4, narrative_function: null, title: 'Scene 4', en: sentences.slice(fifth * 3, fifth * 4).join(' ') || '' },
          { id: 5, narrative_function: null, title: 'Scene 5', en: sentences.slice(fifth * 4).join(' ') || '' },
        ].filter(s => s.en.trim().length > 0);
        return { mode: 'freeform', finalText, podcastScenes };
      });
    }
  }, [activeWeek]);

  const handleTaskComplete = (xpEarned = 50, questType = null) => {
    setStudioXP(prev => prev + xpEarned);
    const targetQuest = questType || (activeTab === 'podcast_creator' ? 'broadcast_studio' : activeTab === 'science_report' ? 'science_report' : activeTab === 'ai_debate' ? 'ai_debate' : null);
    if (targetQuest && activeWeek) {
      useDailyQuestStore.getState().completeQuest(activeWeek, targetQuest);
      emitLearningEvent(GAMIFICATION_EVENTS.LEARNING_TASK_COMPLETED, {
        weekNumber: activeWeek,
        taskId: targetQuest,
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 animate-in fade-in duration-300 font-sans">
      {/* Slim Game Instruction Bar — only in full zone mode */}
      {!hideStationTabs && (
        <div className="p-3 bg-purple-50 border border-purple-300 rounded-2xl flex items-center justify-between flex-wrap gap-2 text-xs">
          <span className="font-black text-purple-950 flex items-center gap-1.5">
            🎨 CREATOR STUDIO — Write your story, record your video, debate, or file your science report!
          </span>
          <div className="px-3 py-1 bg-purple-600 text-white rounded-xl font-black text-xs shadow-sm flex items-center gap-1">
            <Trophy size={14} className="text-amber-300" />
            <span>+{studioXP} XP</span>
          </div>
        </div>
      )}

      {/* Vibrant Multi-Color Subtabs Selector — hidden in task mode */}
      {!hideStationTabs && (
        <div className="w-full p-2 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full">
            <button
              type="button"
              onClick={() => handleTabSwitch('story_writer')}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
                activeTab === 'story_writer'
                  ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300 scale-[1.02]'
                  : 'bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100'
              }`}
            >
              ✏️ STORY WRITER
            </button>
            <button
              type="button"
              onClick={() => handleTabSwitch('brain_refresh')}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
                activeTab === 'brain_refresh'
                  ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300 scale-[1.02]'
                  : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              🎧 BRAIN REFRESH
            </button>
            <button
              type="button"
              onClick={() => handleTabSwitch('podcast_creator')}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
                activeTab === 'podcast_creator'
                  ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300 scale-[1.02]'
                  : 'bg-indigo-50 text-indigo-900 border border-indigo-200 hover:bg-indigo-100'
              }`}
            >
              📹 VIDEO CHALLENGE
            </button>
            <button
              type="button"
              onClick={() => handleTabSwitch('science_report')}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
                activeTab === 'science_report'
                  ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300 scale-[1.02]'
                  : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              🧪 SCIENCE REPORT
            </button>
            <button
              type="button"
              onClick={() => handleTabSwitch('ai_debate')}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
                activeTab === 'ai_debate'
                  ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-300 scale-[1.02]'
                  : 'bg-rose-50 text-rose-900 border border-rose-200 hover:bg-rose-100'
              }`}
            >
              🎭 DEBATE ARENA
            </button>
          </div>
        </div>
      )}

      {/* Active Sub-Component */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-6 border border-slate-200 shadow-md min-h-[360px]">
        {activeTab === 'story_writer' && (
          <StoryWriting
            content={data?.writing_hub || data?.rawWeekData?.writing_hub || studioData?.writingHub || null}
            storyPrompts={storyPrompts}
            weekNumber={activeWeek}
            onComplete={(xp, finalText, extraData) => handleStoryComplete(xp, finalText, extraData)}
            onReportProgress={(percent, finalText, extraData) => handleStoryComplete(0, finalText, extraData)}
            onGoToSpeak={() => handleTabSwitch('brain_refresh')}
          />
        )}

        {activeTab === 'brain_refresh' && (
          <CreatorBrainRefresh onContinue={() => handleTabSwitch('podcast_creator')} />
        )}

        {activeTab === 'podcast_creator' && (
          <div className="space-y-4">
            <RetellRecorder
              scenes={storySubmission?.podcastScenes || studioData.podcastScenes || []}
              weekNumber={activeWeek}
              mode={storySubmission?.mode || 'standalone'}
              onComplete={() => handleTaskComplete(50, 'broadcast_studio')}
            />
          </div>
        )}

        {activeTab === 'science_report' && (
          <ScienceReportCreator
            reportTopic={studioData.scienceTopic || data?.reading_hub?.read_explore?.clil_article?.title || (activeWeek === 34 ? "Animal Cooperation in Nature" : undefined)}
            customConfig={data?.listening_hub?.science_report_config || data?.writing_hub?.science_report_config || (activeWeek === 34 ? {
              topic: "Animal Cooperation in Nature",
              notebookTitle: "Animal Cooperation Lab Notebook",
              step1Title: "Observe Animal Roles",
              step1Pills: {
                "🦁 Large Predators": ["protect the territory", "maintain balance in the forest", "keep other animals alert"],
                "🐭 Small Animals": ["clean the forest floor", "plant new seeds", "help free larger friends"]
              },
              step2Title: "Measure Mutual Benefits",
              step2Pills: {
                "🤝 Teamwork Actions": ["animals work together in harmony", "different skills help everyone survive", "cooperation makes the forest safer"],
                "🌲 Forest Health": ["plants and trees grow well", "animals stay safe from danger", "food and water are shared"]
              },
              step3Title: "Record Ecosystem Conclusion",
              step3Pills: {
                "🏆 Key Conclusion": ["true friendship and teamwork help all creatures", "size does not matter when helping friends", "cooperation keeps nature strong"],
                "🌟 Takeaway": ["small acts of kindness make a big difference", "everyone has an important role in nature", "working together brings peace"]
              }
            } : undefined)}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete(50, 'science_report')}
          />
        )}

        {activeTab === 'shadowing_studio' && (
          <ShadowingErrorBoundary>
            <Shadowing
              data={data?.stations?.shadowing || data?.rawWeekData?.stations?.shadowing || data?.shadowing || {}}
              weekNumber={activeWeek}
              mode="advanced"
            />
          </ShadowingErrorBoundary>
        )}

        {activeTab === 'ai_debate' && (
          <AIDebateMode
            debateTopics={studioData.debateTopics}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete(60, 'ai_debate')}
          />
        )}
      </div>
    </div>
  );
}

