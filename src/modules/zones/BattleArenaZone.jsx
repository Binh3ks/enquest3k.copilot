import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import FlashArena from '../hubs/station2/LearnMode/FlashArena';
import { SentenceBuilderBattle } from '../hubs/station2/LearnMode/SentenceBuilderBattle';
import SoundSniper from '../../components/zones/SoundSniper';
import { BarModelQuest } from '../hubs/station2/LearnMode/BarModelQuest';
import ScienceDragDropLab from '../hubs/station2/LearnMode/ScienceDragDropLab';
import { useUserStore } from '../../stores/useUserStore';
import useDailyQuestStore from '../../stores/useDailyQuestStore';
import { emitLearningEvent, GAMIFICATION_EVENTS } from '../../services/gamificationEventBus';

export default function BattleArenaZone({ data, weekNumber, forcedStation = null, hideStationTabs = false }) {
  const [searchParams] = useSearchParams();
  const routeParams = useParams();
  const activeWeek = weekNumber || (routeParams?.weekId ? parseInt(routeParams.weekId) : null) || data?.weekNumber || data?.week || data?.rawWeekData?.weekNumber || null;

  const arenaData = data?.battleArena || {};
  const logicLabData = data?.stations?.logic_lab || {};

  const STATION_TO_GAME = {
    word_blitz: 'word_blitz',
    sentence_smash: 'sentence_smash',
    math_quest: 'math_quest',
    bar_model: 'math_quest',
    science_lab: 'science_lab',
  };
  const [activeGame, setActiveGame] = useState(forcedStation ? (STATION_TO_GAME[forcedStation] || 'word_blitz') : 'word_blitz');
  const [totalXP, setTotalXP] = useState(0);

  // Sync from forcedStation
  useEffect(() => {
    if (forcedStation && STATION_TO_GAME[forcedStation]) {
      setActiveGame(STATION_TO_GAME[forcedStation]);
    }
  }, [forcedStation]);

  // Sync activeGame from URL ?station=... (only if not forced)
  useEffect(() => {
    if (forcedStation) return;
    const station = searchParams.get('station');
    if (station === 'science_lab') setActiveGame('science_lab');
    else if (station === 'word_blitz') setActiveGame('word_blitz');
    else if (station === 'sentence_smash') setActiveGame('sentence_smash');
    else if (station === 'math_quest' || station === 'bar_model') setActiveGame('math_quest');
  }, [searchParams, forcedStation]);

  // Class Co-op Meter: use global userXP as proxy for session XP earned
  const globalXP = useUserStore((state) => state.userXP || 0);
  const addGlobalXP = useUserStore((state) => state.addXP);
  // Co-op goal: 1000 XP total class XP (simplified: globalXP % 1000)
  const coopContribution = Math.min(globalXP % 1000, 1000);
  const coopPercent = Math.round((coopContribution / 1000) * 100);

  const flashArenaData = arenaData.flashArena || arenaData.vocabSets || arenaData.vocab || data?.stations?.new_words || null;
  const grammarDrills = arenaData.grammarDrills || data?.skill_practice_hub?.grammar_drills || data?.stations?.grammar || null;
  const vocabList = arenaData.vocabList || data?.stations?.new_words?.vocab_list || [];
  const barModelData = arenaData.barModel || data?.skill_practice_hub?.singapore_math || data?.listening_hub?.singapore_math || data?.stations?.listening_hub?.singapore_math || logicLabData.singapore_math || null;
  const scienceLabData = arenaData.scienceLab || data?.skill_practice_hub?.science_lab || data?.listening_hub?.science_lab || data?.stations?.listening_hub?.science_lab || logicLabData.logic_science || null;

  const handleGameComplete = (earnedXP = 30) => {
    setTotalXP(prev => prev + earnedXP);
    
    // Track quest completion for Today's Quest
    const GAME_QUEST_MAP = {
      word_blitz: 'word_blitz',
      sentence_smash: 'sentence_smash',
      sound_sniper: 'word_blitz',
      math_quest: 'math_quest',
      bar_model: 'math_quest',
      science_lab: 'science_lab',
    };
    const questId = GAME_QUEST_MAP[activeGame];
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
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-5 animate-in fade-in duration-300 font-sans">
      {/* Slim Session XP bar — only in full zone mode */}
      {!hideStationTabs && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-amber-50 border border-amber-300 rounded-2xl text-xs shadow-sm">
          <span className="font-black text-amber-950 flex items-center gap-1.5"><Swords size={14} className="text-amber-600" /> ⚔️ BATTLE ARENA</span>
          <div className="flex items-center gap-2">
            <span className="text-amber-700 font-bold">Session XP:</span>
            <div className="px-3 py-1 bg-amber-500 text-slate-950 rounded-xl font-black flex items-center gap-1 shadow-sm">
              <Trophy size={12} /> +{totalXP} XP
            </div>
          </div>
        </div>
      )}


      {/* Vibrant Multi-Color Subtabs Selector — hidden in task mode */}
      {!hideStationTabs && (
        <div className="w-full p-2 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner">
          <div className="flex items-center justify-between px-2 pb-1.5 text-[10px] font-black text-slate-500 uppercase tracking-wider">
            <span>⚔️ ZONE 3: 3 BATTLE ARENA GAMES</span>
            <span>Week {activeWeek}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 w-full">
            {[
              { id: 'word_blitz', label: '⚡ SPEED MATCH', activeBg: 'bg-amber-500 text-slate-950 ring-amber-300', inactiveBg: 'bg-amber-50 text-amber-900 border-amber-200' },
              { id: 'sentence_smash', label: '🧱 GRAMMAR DUEL', activeBg: 'bg-purple-600 text-white ring-purple-300', inactiveBg: 'bg-purple-50 text-purple-900 border-purple-200' },
              { id: 'math_quest', label: '📐 MATH QUEST', activeBg: 'bg-orange-500 text-white ring-orange-300', inactiveBg: 'bg-orange-50 text-orange-900 border-orange-200' },
            ].map((g) => {
              const isSelected = activeGame === g.id;

              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setActiveGame(g.id)}
                  className={`w-full py-2.5 px-2.5 rounded-xl text-xs font-black transition flex flex-col items-center justify-center gap-0.5 text-center truncate ${
                    isSelected
                      ? `${g.activeBg} shadow-md ring-2 scale-[1.02]`
                      : `${g.inactiveBg} border hover:bg-slate-200`
                  }`}
                >
                  <span>{g.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Sub-Component */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-6 border border-slate-200 shadow-md min-h-[360px]">
        {activeGame === 'word_blitz' && (
          <FlashArena
            customSets={flashArenaData}
            weekNumber={activeWeek}
            onComplete={(pts) => handleGameComplete(pts > 0 ? 40 : 0)}
          />
        )}

        {activeGame === 'sentence_smash' && (
          <SentenceBuilderBattle
            customDrills={grammarDrills}
            grammarDrills={grammarDrills}
            weekNumber={activeWeek}
            onComplete={(pts) => handleGameComplete(pts > 0 ? 35 : 0)}
          />
        )}

        {activeGame === 'sound_sniper' && (
          <SoundSniper
            words={vocabList}
            onComplete={(pts) => handleGameComplete(pts > 0 ? 30 : 0)}
          />
        )}

        {activeGame === 'math_quest' && (
          <BarModelQuest
            barModelData={barModelData}
            weekNumber={activeWeek}
            onComplete={(pts) => handleGameComplete(pts > 0 ? 40 : 0)}
          />
        )}

        {activeGame === 'science_lab' && (
          <ScienceDragDropLab
            scienceData={scienceLabData}
            weekNumber={activeWeek}
            onComplete={(pts) => handleGameComplete(pts > 0 ? 45 : 0)}
          />
        )}
      </div>
    </div>
  );
}

