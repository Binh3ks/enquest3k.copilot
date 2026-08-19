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
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-amber-500/40 shadow-xl flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-1">
          <span className="px-3 py-1 bg-amber-500/30 text-amber-200 border border-amber-400/40 rounded-full text-[10px] font-black uppercase tracking-wider">
            Zone 2 • Battle Arena
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-amber-300">
            ⚔️ BATTLE ARENA — SPEED & ACCURACY CHALLENGE
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Rapid 2-3 minute matches • Speed vocabulary recall, grammar syntax & STEM reasoning!
          </p>
        </div>
        <div className="px-4 py-2 bg-amber-500/20 text-amber-300 border border-amber-400/40 rounded-2xl font-black text-sm flex items-center gap-2">
          <Trophy size={18} className="text-amber-400" />
          <span>+{totalXP} ARENA XP</span>
        </div>
      </div>

      {/* Arcade Games Subtabs Selector */}
      <div className="w-full p-2 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full">
          <button
            type="button"
            onClick={() => setActiveGame('word_blitz')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeGame === 'word_blitz'
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300 scale-[1.02]'
                : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            ⚡ WORD BLITZ
          </button>
          <button
            type="button"
            onClick={() => setActiveGame('sentence_smash')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeGame === 'sentence_smash'
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300 scale-[1.02]'
                : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            🧱 SENTENCE SMASH
          </button>
          <button
            type="button"
            onClick={() => setActiveGame('sound_sniper')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeGame === 'sound_sniper'
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300 scale-[1.02]'
                : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            🎧 SOUND SNIPER
          </button>
          <button
            type="button"
            onClick={() => setActiveGame('math_quest')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeGame === 'math_quest'
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300 scale-[1.02]'
                : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            📐 MATH QUEST
          </button>
          <button
            type="button"
            onClick={() => setActiveGame('science_lab')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeGame === 'science_lab'
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300 scale-[1.02]'
                : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            🧪 SCIENCE LAB
          </button>
        </div>
      </div>

      {/* Active Sub-Component */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md min-h-[420px]">
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
