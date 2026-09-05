import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Globe, Trophy, Sparkles, Microscope, FileText, FlaskConical } from 'lucide-react';
import CLILExplorer from '../../components/cambridge/CLILExplorer';
import ScienceDragDropLab from '../hubs/station2/LearnMode/ScienceDragDropLab';
import ScienceReportCreator from '../../components/cambridge/ScienceReportCreator';
import { useUserStore } from '../../stores/useUserStore';
import useDailyQuestStore from '../../stores/useDailyQuestStore';
import { emitLearningEvent, GAMIFICATION_EVENTS } from '../../services/gamificationEventBus';

/**
 * KnowledgeLabZone — Zone 2 (Day 2) of EngQuest3K.
 * 
 * 100% Dedicated to Interdisciplinary CLIL & Hands-On Inquiry:
 *   1. Fact Finder     (gear4_clil)     — CLILExplorer
 *   2. Action Lab      (science_lab)    — ScienceDragDropLab (Action Lab simulation)
 *   3. Discovery Report (science_report) — ScienceReportCreator (Discovery Detective)
 */
export default function KnowledgeLabZone({
  data,
  weekNumber,
  forcedStation = null,
  hideStationTabs = false,
  onBackToMap,
  onComplete
}) {
  const [searchParams] = useSearchParams();
  const routeParams = useParams();
  const activeWeek = weekNumber
    || (routeParams?.weekId ? parseInt(routeParams.weekId) : null)
    || data?.weekNumber
    || data?.week
    || data?.rawWeekData?.weekNumber
    || 33;

  const STATION_MAP = {
    gear4_clil: 'clil',
    clil: 'clil',
    fact_finder: 'clil',
    science_lab: 'action_lab',
    action_lab: 'action_lab',
    science_report: 'discovery_report',
    discovery_report: 'discovery_report'
  };

  const initialStation = forcedStation
    ? (STATION_MAP[forcedStation] || 'clil')
    : 'clil';

  const [activeTab, setActiveTab] = useState(initialStation);
  const [labXP, setLabXP] = useState(0);

  // Sync when forcedStation changes
  useEffect(() => {
    if (forcedStation && STATION_MAP[forcedStation]) {
      setActiveTab(STATION_MAP[forcedStation]);
    }
  }, [forcedStation]);

  // Sync from URL search params if not forced
  useEffect(() => {
    if (forcedStation) return;
    const station = searchParams.get('station');
    if (station && STATION_MAP[station]) {
      setActiveTab(STATION_MAP[station]);
    }
  }, [searchParams, forcedStation]);

  // Data resolution
  const readingHub = data?.reading_hub || data?.readingHub || data?.stations?.reading_hub || {};
  const clilData = readingHub.clil_article
    || readingHub.read_explore?.clil_article
    || data?.clilArticle
    || data?.clil_article
    || data?.storyWorld?.clilArticle
    || data?.knowledgeLab?.clilArticle
    || null;

  const skillPracticeHub = data?.skill_practice_hub || data?.skillPracticeHub || data?.stations?.skill_practice_hub || {};
  const actionLabData = skillPracticeHub.science_lab
    || data?.battleArena?.scienceLab
    || data?.listening_hub?.science_lab
    || data?.knowledgeLab?.actionLab
    || null;

  const reportTopic = clilData?.title_en
    || data?.knowledgeLab?.discoveryReport?.title_en
    || 'Corridor Friction & Safety Discovery Report';

  const handleQuestComplete = (questId, earnedXP = 50) => {
    setLabXP(prev => prev + earnedXP);
    if (questId && activeWeek) {
      useDailyQuestStore.getState().completeQuest(activeWeek, questId);
      emitLearningEvent(GAMIFICATION_EVENTS.LEARNING_TASK_COMPLETED, {
        weekNumber: activeWeek,
        taskId: questId,
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-4 animate-in fade-in duration-300 font-sans">
      {/* Slim Header Banner — only visible in full zone mode */}
      {!hideStationTabs && (
        <div className="p-3 bg-teal-50 border border-teal-300 rounded-2xl flex items-center justify-between flex-wrap gap-2 text-xs">
          <span className="font-black text-teal-950 flex items-center gap-1.5">
            <Microscope size={16} className="text-teal-700" />
            🔬 ZONE 2: KNOWLEDGE LAB — Explore CLIL facts, solve action labs & file your discovery report!
          </span>
          <div className="px-3 py-1 bg-teal-700 text-white rounded-xl font-black text-xs shadow-sm flex items-center gap-1">
            <Trophy size={14} className="text-amber-300" />
            <span>+{labXP} XP</span>
          </div>
        </div>
      )}

      {/* 3-Quest Subtabs Selector — hidden when loaded as an individual task */}
      {!hideStationTabs && (
        <div className="w-full p-2 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner">
          <div className="grid grid-cols-3 gap-2 w-full">
            <button
              type="button"
              onClick={() => setActiveTab('clil')}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
                activeTab === 'clil'
                  ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300 scale-[1.02]'
                  : 'bg-indigo-50 text-indigo-900 border border-indigo-200 hover:bg-indigo-100'
              }`}
            >
              <Globe size={15} /> 🌐 FACT FINDER
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('action_lab')}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
                activeTab === 'action_lab'
                  ? 'bg-teal-600 text-white shadow-md ring-2 ring-teal-300 scale-[1.02]'
                  : 'bg-teal-50 text-teal-900 border border-teal-200 hover:bg-teal-100'
              }`}
            >
              <FlaskConical size={15} /> 🧪 ACTION LAB
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('discovery_report')}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
                activeTab === 'discovery_report'
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-300 scale-[1.02]'
                  : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              <FileText size={15} /> 📝 DISCOVERY REPORT
            </button>
          </div>
        </div>
      )}

      {/* Active Sub-Component Area */}
      <div className={hideStationTabs ? "w-full" : "bg-white rounded-2xl sm:rounded-3xl p-2 sm:p-5 border border-slate-200 shadow-md min-h-[420px]"}>
        {activeTab === 'clil' && (
          <CLILExplorer
            clilData={clilData}
            weekNumber={activeWeek}
            onCompleteCLIL={() => handleQuestComplete('gear4_clil', 50)}
          />
        )}

        {activeTab === 'action_lab' && (
          <ScienceDragDropLab
            scienceData={actionLabData}
            weekNumber={activeWeek}
            onComplete={(pts) => {
              handleQuestComplete('science_lab', pts > 0 ? 50 : 0);
              if (onComplete) onComplete(pts);
            }}
            onBackToMap={onBackToMap}
          />
        )}

        {activeTab === 'discovery_report' && (
          <ScienceReportCreator
            reportTopic={reportTopic}
            weekNumber={activeWeek}
            onComplete={(pts) => {
              handleQuestComplete('science_report', pts > 0 ? 50 : 0);
              if (onComplete) onComplete(pts);
            }}
            onBackToMap={onBackToMap}
          />
        )}
      </div>
    </div>
  );
}
