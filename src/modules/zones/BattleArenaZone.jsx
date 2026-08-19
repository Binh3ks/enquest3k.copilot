import React, { useState } from 'react';
import FlashArena from '../hubs/station2/LearnMode/FlashArena';
import { SentenceBuilderBattle } from '../hubs/station2/LearnMode/SentenceBuilderBattle';
import SoundSniper from '../../components/zones/SoundSniper';
import BarModelQuest from '../hubs/station2/LearnMode/BarModelQuest';
import ScienceDragDropLab from '../hubs/station2/LearnMode/ScienceDragDropLab';
import { Swords, Trophy, Zap, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

export default function BattleArenaZone({ data, weekNumber = 33 }) {
  const arenaData = data?.battleArena || {};
  const [activeGame, setActiveGame] = useState('word_blitz'); // 'word_blitz' | 'sentence_smash' | 'sound_sniper' | 'math_quest' | 'science_lab'
  const [totalXP, setTotalXP] = useState(0);

  const flashArenaData = arenaData.vocabSets || null;
  const grammarDrills = arenaData.grammarDrills || null;
  const vocabList = arenaData.vocabList || [];
  const barModelData = arenaData.barModel || null;
  const scienceLabData = arenaData.scienceLab || null;

  const handleGameComplete = (earnedXP = 30) => {
    setTotalXP(prev => prev + earnedXP);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-5 animate-in fade-in duration-300 font-sans">
      {/* Slim Game Instruction Bar */}
      <div className="p-3 bg-amber-50 border border-amber-300 rounded-2xl flex items-center justify-between flex-wrap gap-2 text-xs">
        <span className="font-black text-amber-950 flex items-center gap-1.5">
          ⚔️ BATTLE ARENA — Rapid 2-3 min matches: speed vocabulary, grammar syntax & STEM reasoning!
        </span>
        <div className="px-3 py-1 bg-amber-500 text-slate-950 rounded-xl font-black text-xs shadow-sm flex items-center gap-1">
          <Trophy size={14} className="text-slate-950" />
          <span>+{totalXP} XP</span>
        </div>
      </div>

      {/* Vibrant Multi-Color Subtabs Selector */}
      <div className="w-full p-2 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full">
          <button
            type="button"
            onClick={() => setActiveGame('word_blitz')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeGame === 'word_blitz'
                ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-300 scale-[1.02]'
                : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            ⚡ WORD BLITZ
          </button>
          <button
            type="button"
            onClick={() => setActiveGame('sentence_smash')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeGame === 'sentence_smash'
                ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300 scale-[1.02]'
                : 'bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100'
            }`}
          >
            🧱 SENTENCE SMASH
          </button>
          <button
            type="button"
            onClick={() => setActiveGame('sound_sniper')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeGame === 'sound_sniper'
                ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300 scale-[1.02]'
                : 'bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100'
            }`}
          >
            🎧 SOUND SNIPER
          </button>
          <button
            type="button"
            onClick={() => setActiveGame('math_quest')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeGame === 'math_quest'
                ? 'bg-orange-500 text-white shadow-md ring-2 ring-orange-300 scale-[1.02]'
                : 'bg-orange-50 text-orange-900 border border-orange-200 hover:bg-orange-100'
            }`}
          >
            📐 MATH QUEST
          </button>
          <button
            type="button"
            onClick={() => setActiveGame('science_lab')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeGame === 'science_lab'
                ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300 scale-[1.02]'
                : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            🧪 SCIENCE LAB
          </button>
        </div>
      </div>

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
