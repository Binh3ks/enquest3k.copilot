import React, { useState } from 'react';
import GearIndicator from '../../components/zones/GearIndicator';
import { FlashArena } from '../hubs/station2/LearnMode/FlashArena';
import { SentenceBuilderBattle } from '../hubs/station2/LearnMode/SentenceBuilderBattle';
import { BarModelQuest } from '../hubs/station2/LearnMode/BarModelQuest';
import ScienceDragDropLab from '../hubs/station2/LearnMode/ScienceDragDropLab';
import SoundSniper from '../../components/zones/SoundSniper';
import { Swords, Zap, Brain, Trophy, ChevronRight, PlayCircle, Layers, Volume2, Shield } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';

export default function BattleArenaZone({ data, weekNumber = 33, onCompleteGear }) {
  const arenaData = data?.battleArena || {};
  const [currentGear, setCurrentGear] = useState(2);
  const [completedGears, setCompletedGears] = useState([1, 2]);
  const [activeGame, setActiveGame] = useState('flash_arena'); // 'flash_arena' | 'sound_sniper' | 'sentence_builder' | 'bar_model' | 'science_lab'
  const [earnedXP, setEarnedXP] = useState(0);

  const flashArenaData = arenaData.flashArena || null;
  const grammarDrills = arenaData.grammarDrills || [];
  const barModelData = arenaData.barModel || [];
  const scienceLabData = arenaData.scienceLab || null;
  const vocabList = arenaData.vocab || [];

  const handleGameComplete = (points = 20) => {
    setEarnedXP(prev => prev + points);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* 4-Gear Indicator */}
      <GearIndicator
        currentGear={currentGear}
        onSelectGear={setCurrentGear}
        completedGears={completedGears}
      />

      {/* Arena Header */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-amber-500/40 shadow-xl flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-500/30 text-amber-200 border border-amber-400/40 rounded-full text-[10px] font-black uppercase tracking-wider">
              Zone 2 • Speed & Logic Arena
            </span>
            <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
              +{earnedXP} Arena XP
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-300">
            ⚔️ Interactive Battle Arena & Speed Labs
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Build rapid lexical reflexes, grammar syntax blocks, Singapore bar models and virtual science experiments!
          </p>
        </div>
      </div>

      {/* Game Selector Subtabs */}
      <div className="w-full p-2 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 w-full">
          <button
            type="button"
            onClick={() => setActiveGame('flash_arena')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeGame === 'flash_arena'
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300'
                : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            ⚡ Speed Match
          </button>
          <button
            type="button"
            onClick={() => setActiveGame('sound_sniper')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeGame === 'sound_sniper'
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300'
                : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            🎧 Sound Sniper
          </button>
          <button
            type="button"
            onClick={() => setActiveGame('sentence_builder')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeGame === 'sentence_builder'
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300'
                : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            🧠 Sentence Builder
          </button>
          <button
            type="button"
            onClick={() => setActiveGame('bar_model')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeGame === 'bar_model'
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300'
                : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            📐 Bar Model Quest
          </button>
          <button
            type="button"
            onClick={() => setActiveGame('science_lab')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeGame === 'science_lab'
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300'
                : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            🧪 Science Lab
          </button>
        </div>
      </div>

      {/* Active Battle Arena Sub-Component */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md min-h-[420px]">
        {activeGame === 'flash_arena' && flashArenaData && (
          <FlashArena
            arenaData={flashArenaData}
            weekNumber={weekNumber}
            onComplete={() => handleGameComplete(30)}
          />
        )}

        {activeGame === 'sound_sniper' && (
          <SoundSniper
            words={vocabList}
            onComplete={(pts) => handleGameComplete(pts || 20)}
          />
        )}

        {activeGame === 'sentence_builder' && (
          <SentenceBuilderBattle
            grammarDrills={grammarDrills}
            weekNumber={weekNumber}
            onComplete={() => handleGameComplete(30)}
          />
        )}

        {activeGame === 'bar_model' && barModelData && (
          <BarModelQuest
            barModelData={barModelData}
            weekNumber={weekNumber}
            onComplete={() => handleGameComplete(40)}
          />
        )}

        {activeGame === 'science_lab' && scienceLabData && (
          <ScienceDragDropLab
            scienceData={scienceLabData}
            weekNumber={weekNumber}
            onComplete={() => handleGameComplete(35)}
          />
        )}
      </div>
    </div>
  );
}
