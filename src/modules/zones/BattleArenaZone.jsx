import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FlashArena from '../hubs/station2/LearnMode/FlashArena';
import { SentenceBuilderBattle } from '../hubs/station2/LearnMode/SentenceBuilderBattle';
import SoundSniper from '../../components/zones/SoundSniper';
import BarModelQuest from '../hubs/station2/LearnMode/BarModelQuest';
import ScienceDragDropLab from '../hubs/station2/LearnMode/ScienceDragDropLab';
import { Swords, Trophy, Zap, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';
import useDailyQuestStore from '../../stores/useDailyQuestStore';

export default function BattleArenaZone({ data, weekNumber = 33, forcedStation = null, hideStationTabs = false }) {
  const [searchParams] = useSearchParams();
  const arenaData = data?.battleArena || {};
  const STATION_TO_GAME = { word_blitz: 'word_blitz', word_power: 'word_blitz', sentence_smash: 'sentence_smash', math_quest: 'bar_model' };
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
    if (station === 'word_blitz') setActiveGame('word_blitz');
    else if (station === 'sentence_smash') setActiveGame('sentence_smash');
    else if (station === 'math_quest') setActiveGame('bar_model');
    else if (station === 'word_power') setActiveGame('word_blitz');
  }, [searchParams, forcedStation]);

  // Mark quest complete when game is selected/opened
  useEffect(() => {
    const GAME_QUEST_MAP = { word_blitz: 'word_blitz', sentence_smash: 'sentence_smash', sound_sniper: 'word_blitz', bar_model: 'math_quest', science_lab: 'sentence_smash' };
    const questId = GAME_QUEST_MAP[activeGame];
    if (questId) useDailyQuestStore.getState().completeQuest(weekNumber, questId);
  }, [activeGame, weekNumber]);

  // Class Co-op Meter: use global userXP as proxy for session XP earned
  const globalXP = useUserStore((state) => state.userXP || 0);
  const addGlobalXP = useUserStore((state) => state.addXP);
  // Co-op goal: 1000 XP total class XP (simplified: globalXP % 1000)
  const coopContribution = Math.min(globalXP % 1000, 1000);
  const coopPercent = Math.round((coopContribution / 1000) * 100);

  const flashArenaData = arenaData.vocabSets || null;
  const grammarDrills = arenaData.grammarDrills || null;
  const vocabList = arenaData.vocabList || [];
  const barModelData = arenaData.barModel || null;
  const scienceLabData = arenaData.scienceLab || null;

  const handleGameComplete = (earnedXP = 30) => {
    setTotalXP(prev => prev + earnedXP);
    if (addGlobalXP) addGlobalXP(earnedXP);
    // Track quest completion for Today's Quest
    const GAME_QUEST_MAP = { word_blitz: 'word_blitz', sentence_smash: 'sentence_smash', sound_sniper: 'word_blitz', bar_model: 'math_quest', science_lab: 'sentence_smash' };
    const questId = GAME_QUEST_MAP[activeGame];
    if (questId) useDailyQuestStore.getState().completeQuest(weekNumber, questId);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-5 animate-in fade-in duration-300 font-sans">
      {/* Slim Session XP bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-amber-50 border border-amber-300 rounded-2xl text-xs">
        <span className="font-black text-amber-950 flex items-center gap-1.5"><Swords size={13} /> ⚔️ BATTLE ARENA</span>
        <div className="flex items-center gap-2">
          <span className="text-amber-700 font-bold">Session:</span>
          <div className="px-3 py-0.5 bg-amber-500 text-slate-950 rounded-xl font-black flex items-center gap-1">
            <Trophy size={12} /> +{totalXP} XP
          </div>
        </div>
      </div>

      {/* Class Co-op Strip — compact 1-row */}
      <div className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-2xl border border-purple-500/40 text-xs font-sans">
        <span className="font-black text-amber-300 whitespace-nowrap shrink-0">🤝 CO-OP: {coopContribution}/1000 XP</span>
        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-700" style={{ width: `${Math.max(2, coopPercent)}%` }} />
        </div>
        <span className="font-bold text-purple-200 shrink-0">{coopPercent}%</span>
      </div>

      {/* Vibrant Multi-Color Subtabs Selector — hidden in task mode */}
      {!hideStationTabs && (() => {
        // Enforce 3 featured games per week rotation to prevent cognitive overload
        const isEvenWeek = weekNumber % 2 === 0;
        const featuredGames = isEvenWeek
          ? ['word_blitz', 'sound_sniper', 'science_lab']
          : ['word_blitz', 'sentence_smash', 'math_quest'];

        return (
          <div className="w-full p-2 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner">
            <div className="flex items-center justify-between px-2 pb-1.5 text-[10px] font-black text-slate-500 uppercase tracking-wider">
              <span>⚔️ Weekly 3 Featured Battle Games</span>
              <span>Week {weekNumber} Rotation</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full">
              {[
                { id: 'word_blitz', label: '⚡ WORD BLITZ', activeBg: 'bg-amber-500 text-slate-950 ring-amber-300', inactiveBg: 'bg-amber-50 text-amber-900 border-amber-200' },
                { id: 'sentence_smash', label: '🧱 SENTENCE SMASH', activeBg: 'bg-purple-600 text-white ring-purple-300', inactiveBg: 'bg-purple-50 text-purple-900 border-purple-200' },
                { id: 'sound_sniper', label: '🎧 SOUND SNIPER', activeBg: 'bg-blue-600 text-white ring-blue-300', inactiveBg: 'bg-blue-50 text-blue-900 border-blue-200' },
                { id: 'math_quest', label: '📐 MATH QUEST', activeBg: 'bg-orange-500 text-white ring-orange-300', inactiveBg: 'bg-orange-50 text-orange-900 border-orange-200' },
                { id: 'science_lab', label: '🧪 SCIENCE LAB', activeBg: 'bg-emerald-600 text-white ring-emerald-300', inactiveBg: 'bg-emerald-50 text-emerald-900 border-emerald-200' },
              ].map((g) => {
                const isFeatured = featuredGames.includes(g.id);
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
                    {!isFeatured && (
                      <span className="text-[8px] font-extrabold px-1.5 py-0.2 bg-slate-200 text-slate-600 rounded-full">
                        ⏳ Next Week
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* Active Sub-Component */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-md min-h-[420px]">
        {activeGame === 'word_blitz' && (
          <FlashArena
            customSets={flashArenaData}
            weekNumber={weekNumber}
            onComplete={(pts) => handleGameComplete(pts > 0 ? 40 : 0)}
          />
        )}

        {activeGame === 'sentence_smash' && (
          <SentenceBuilderBattle
            grammarDrills={grammarDrills}
            weekNumber={weekNumber}
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
            weekNumber={weekNumber}
            onComplete={(pts) => handleGameComplete(pts > 0 ? 40 : 0)}
          />
        )}

        {activeGame === 'science_lab' && (
          <ScienceDragDropLab
            scienceData={scienceLabData}
            weekNumber={weekNumber}
            onComplete={(pts) => handleGameComplete(pts > 0 ? 45 : 0)}
          />
        )}
      </div>
    </div>
  );
}
