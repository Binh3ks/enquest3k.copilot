import React, { useState } from 'react';
import { FlashArena } from '../hubs/station2/LearnMode/FlashArena';
import { SentenceBuilderBattle } from '../hubs/station2/LearnMode/SentenceBuilderBattle';
import { BarModelQuest } from '../hubs/station2/LearnMode/BarModelQuest';
import ScienceDragDropLab from '../hubs/station2/LearnMode/ScienceDragDropLab';
import SoundSniper from '../../components/zones/SoundSniper';
import { Swords, Zap, Brain, Trophy, ChevronRight, PlayCircle, Layers, Volume2, Shield } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';

export default function BattleArenaZone({ data, weekNumber = 33 }) {
  const arenaData = data?.battleArena || {};
  const [activeGame, setActiveGame] = useState('word_blitz'); // 'word_blitz' | 'sentence_smash' | 'sound_sniper' | 'math_quest' | 'science_lab'
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
      {/* Arena Header */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-amber-500/40 shadow-xl flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-500/30 text-amber-200 border border-amber-400/40 rounded-full text-[10px] font-black uppercase tracking-wider">
              Zone 2 • Battle Arena
            </span>
            <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
              +{earnedXP} Arena XP
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-300">
            ⚔️ BATTLE ARENA — "Ai nhanh hơn, ai chính xác hơn?"
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Mỗi trận đấu 2–3 phút • Thử thách Phản xạ Từ vựng, Cú pháp Ngữ pháp & Tư duy Math/Science CLIL!
          </p>
        </div>
      </div>

      {/* Game Selector Subtabs */}
      <div className="w-full p-2 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 w-full">
          <button
            type="button"
            onClick={() => setActiveGame('word_blitz')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeGame === 'word_blitz'
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300'
                : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            ⚡ WORD BLITZ (45s)
          </button>
          <button
            type="button"
            onClick={() => setActiveGame('sentence_smash')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeGame === 'sentence_smash'
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300'
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
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300'
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
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300'
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
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300'
                : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            🧪 SCIENCE LAB
          </button>
        </div>
      </div>

      {/* Active Battle Arena Sub-Component */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md min-h-[420px]">
        {activeGame === 'word_blitz' && flashArenaData && (
          <FlashArena
            customSets={flashArenaData}
            weekNumber={weekNumber}
            onComplete={() => handleGameComplete(30)}
          />
        )}

        {activeGame === 'sentence_smash' && (
          <SentenceBuilderBattle
            grammarDrills={grammarDrills}
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

        {activeGame === 'math_quest' && barModelData && (
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
