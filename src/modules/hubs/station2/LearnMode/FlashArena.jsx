import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { fireCelebrationConfetti } from '../../../../utils/confettiHelper';
import { useUserStore } from '../../../../stores/useUserStore';
import { Zap, Trophy, Timer, CheckCircle2, RotateCcw, Flame, Sparkles, Play, Pause, ArrowRight, Swords, Shield, Heart } from 'lucide-react';

const DEFAULT_MICRO_ROUNDS = [
  {
    id: 1,
    name: '⚔️ Core Verbs Clash',
    theme: 'Action Verbs',
    pairs: [
      { id: 'm1_1', en: 'slipped', vi: 'trượt chân' },
      { id: 'm1_2', en: 'fell down', vi: 'ngã xuống' },
      { id: 'm1_3', en: 'called', vi: 'gọi trợ giúp' },
      { id: 'm1_4', en: 'praised', vi: 'khen ngợi' },
    ]
  },
  {
    id: 2,
    name: '🛡️ Safety Nouns Strike',
    theme: 'Safety & People',
    pairs: [
      { id: 'm2_1', en: 'corridor', vi: 'hành lang' },
      { id: 'm2_2', en: 'bandage', vi: 'băng cá nhân' },
      { id: 'm2_3', en: 'nurse', vi: 'y tế / y tá' },
      { id: 'm2_4', en: 'cold pack', vi: 'túi chườm lạnh' },
    ]
  },
  {
    id: 3,
    name: '🧊 Relief & Science Sprint',
    theme: 'Concepts & Feelings',
    pairs: [
      { id: 'm3_1', en: 'relieved', vi: 'nhẹ nhõm' },
      { id: 'm3_2', en: 'friction', vi: 'lực ma sát' },
      { id: 'm3_3', en: 'puddle', vi: 'vũng nước trơn' },
      { id: 'm3_4', en: 'careful', vi: 'cẩn thận' },
    ]
  },
  {
    id: 4,
    name: '🏃 Action Chunks Rush',
    theme: 'Incident Phrases',
    pairs: [
      { id: 'm4_1', en: 'slipped on wet floor', vi: 'trượt chân trên sàn ướt' },
      { id: 'm4_2', en: 'walking carefully', vi: 'đi bộ cẩn thận' },
      { id: 'm4_3', en: 'lost his balance', vi: 'mất thăng bằng' },
    ]
  },
  {
    id: 5,
    name: '🩹 First Aid Rescue',
    theme: 'Emergency Chunks',
    pairs: [
      { id: 'm5_1', en: 'called the school nurse', vi: 'gọi y tá trường' },
      { id: 'm5_2', en: 'applied a clean bandage', vi: 'băng bó sạch sẽ' },
      { id: 'm5_3', en: 'hurt his knee', vi: 'bị thương đầu gối' },
    ]
  },
  {
    id: 6,
    name: '🏆 Master Rules Duel',
    theme: 'Rules & Collocations',
    pairs: [
      { id: 'm6_1', en: 'corridor safety rules', vi: 'quy tắc an toàn hành lang' },
      { id: 'm6_2', en: 'wet floor warning sign', vi: 'biển báo sàn ướt' },
      { id: 'm6_3', en: 'felt relieved', vi: 'cảm thấy nhẹ nhõm' },
    ]
  }
];

export function FlashArena({ customSets, weekNumber = 33, onComplete }) {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'paused' | 'roundclear' | 'gameover'
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [selectedEn, setSelectedEn] = useState(null);
  const [selectedVi, setSelectedVi] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const rounds = useMemo(() => {
    if (customSets && customSets.set1_nouns_adj && customSets.set2_verbs) {
      // If dynamic customSets exist, construct 6 clean 3-4 item micro-rounds
      const s1 = customSets.set1_nouns_adj || [];
      const s2 = customSets.set2_verbs || [];
      const s3 = customSets.set3_chunks || [];
      const s4 = customSets.set4_definitions || [];

      return [
        { id: 1, name: '⚔️ Verbs Attack', theme: 'Action Verbs', pairs: s2.slice(0, 4).length >= 3 ? s2.slice(0, 4) : DEFAULT_MICRO_ROUNDS[0].pairs },
        { id: 2, name: '🛡️ Core Nouns Strike', theme: 'Key Vocabulary', pairs: s1.slice(0, 4).length >= 3 ? s1.slice(0, 4) : DEFAULT_MICRO_ROUNDS[1].pairs },
        { id: 3, name: '🧊 Mixed Vocabulary Sprint', theme: 'Power Words', pairs: [...s1.slice(4, 6), ...s2.slice(4, 6)].length >= 3 ? [...s1.slice(4, 6), ...s2.slice(4, 6)] : DEFAULT_MICRO_ROUNDS[2].pairs },
        { id: 4, name: '🏃 Chunks Blitz I', theme: 'Collocations', pairs: s3.slice(0, 3).length >= 3 ? s3.slice(0, 3) : DEFAULT_MICRO_ROUNDS[3].pairs },
        { id: 5, name: '🩹 Chunks Blitz II', theme: 'Action Phrases', pairs: s3.slice(3, 6).length >= 3 ? s3.slice(3, 6) : DEFAULT_MICRO_ROUNDS[4].pairs },
        { id: 6, name: '🏆 Master Definitions Duel', theme: 'Final Challenge', pairs: s4.slice(0, 3).length >= 3 ? s4.slice(0, 3) : DEFAULT_MICRO_ROUNDS[5].pairs },
      ];
    }
    return DEFAULT_MICRO_ROUNDS;
  }, [customSets]);

  const currentRound = rounds[currentRoundIdx] || rounds[0];
  const activePairs = currentRound.pairs || [];

  const [shuffledEn, setShuffledEn] = useState([]);
  const [shuffledVi, setShuffledVi] = useState([]);

  const loadRound = (roundIdx) => {
    setCurrentRoundIdx(roundIdx);
    setMatchedIds([]);
    setSelectedEn(null);
    setSelectedVi(null);

    const r = rounds[roundIdx] || rounds[0];
    const pairs = r.pairs;
    setShuffledEn([...pairs].sort(() => 0.5 - Math.random()));
    setShuffledVi([...pairs].sort(() => 0.5 - Math.random()));
  };

  const handleStartGame = () => {
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(60);
    setGameState('playing');
    loadRound(0);
  };

  const handleTogglePause = () => {
    setGameState(prev => (prev === 'playing' ? 'paused' : 'playing'));
  };

  const finishGame = () => {
    setGameState('gameover');
    const xpEarned = score > 0 ? 50 : 0;

    if (score > 0) {
      fireCelebrationConfetti('WordBlitz_Victory');
      const userStore = useUserStore?.getState ? useUserStore.getState() : null;
      if (userStore?.addXP) userStore.addXP(xpEarned);
    }

    if (onComplete) onComplete(score);
  };

  // Timer Engine
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, score]);

  // Match Evaluation Logic
  useEffect(() => {
    if (selectedEn && selectedVi && gameState === 'playing') {
      if (selectedEn.id === selectedVi.id || selectedEn.en.toLowerCase() === selectedVi.en?.toLowerCase()) {
        const nextStreak = streak + 1;
        setStreak(nextStreak);
        setMaxStreak(prev => Math.max(prev, nextStreak));

        const bonusPoints = 20 + nextStreak * 5;
        setScore(prev => prev + bonusPoints);
        setTimeLeft(prev => Math.min(75, prev + 3));

        const newMatched = [...matchedIds, selectedEn.id];
        setMatchedIds(newMatched);

        if (newMatched.length === activePairs.length) {
          if (currentRoundIdx < rounds.length - 1) {
            setGameState('roundclear');
            setTimeout(() => {
              loadRound(currentRoundIdx + 1);
              setGameState('playing');
            }, 600);
          } else {
            finishGame();
          }
        }
      } else {
        setStreak(0);
      }

      setTimeout(() => {
        setSelectedEn(null);
        setSelectedVi(null);
      }, 250);
    }
  }, [selectedEn, selectedVi, gameState]);

  return (
    <div className="w-full max-w-4xl mx-auto p-5 sm:p-7 bg-slate-950 text-white rounded-3xl border-2 border-amber-500/40 shadow-2xl space-y-6">
      {/* Top Arcade Status Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/30 text-amber-300 border border-amber-400/40">
                Round {currentRoundIdx + 1}/{rounds.length} • {currentRound.theme}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">{currentRound.name}</h3>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="flex items-center gap-3">
          {gameState === 'playing' && (
            <button
              type="button"
              onClick={handleTogglePause}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 transition"
              title="Pause Timer"
            >
              <Pause size={16} />
            </button>
          )}

          {streak > 1 && (
            <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-rose-600 rounded-full text-white font-black text-xs animate-bounce flex items-center gap-1 shadow-lg">
              <Flame size={14} /> {streak}x COMBO!
            </div>
          )}

          <div className="px-4 py-2 bg-slate-900 rounded-2xl border border-slate-800 flex items-center gap-2">
            <Timer className={timeLeft <= 10 && gameState === 'playing' ? 'text-rose-500 animate-ping' : 'text-amber-400'} size={18} />
            <span className={`text-base font-black font-mono ${timeLeft <= 10 ? 'text-rose-400' : 'text-amber-300'}`}>
              {timeLeft}s
            </span>
          </div>

          <div className="px-4 py-2 bg-amber-500/20 text-amber-300 rounded-2xl border border-amber-400/40 font-black text-sm font-mono">
            {score} PTS
          </div>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      {gameState === 'playing' && (
        <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 transition-all duration-300 rounded-full"
            style={{ width: `${((currentRoundIdx + (matchedIds.length / activePairs.length)) / rounds.length) * 100}%` }}
          />
        </div>
      )}

      {/* Start Screen (Idle) */}
      {gameState === 'idle' && (
        <div className="p-8 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-slate-900 border-2 border-amber-400 rounded-3xl text-center space-y-5 shadow-inner">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center font-black text-3xl mx-auto shadow-lg">
            ⚡
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-amber-300">WORD BLITZ SPEED RUN</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Clear 6 lightning-fast rounds (Verbs ➔ Nouns ➔ Collocations ➔ Rules). Only 3-4 pairs per round!
            </p>
          </div>
          <button
            type="button"
            onClick={handleStartGame}
            className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 text-slate-950 rounded-2xl font-black text-base shadow-xl inline-flex items-center gap-2 transition hover:scale-105"
          >
            <Play size={22} fill="currentColor" /> ▶️ START WORD BLITZ
          </button>
        </div>
      )}

      {/* Round Clear Flash */}
      {gameState === 'roundclear' && (
        <div className="p-10 bg-gradient-to-br from-emerald-500/30 to-slate-900 border-2 border-emerald-400 rounded-3xl text-center space-y-3 animate-in zoom-in-95">
          <Sparkles size={48} className="mx-auto text-emerald-400 animate-spin" />
          <h3 className="text-2xl font-black text-emerald-300">⚡ ROUND CLEAR!</h3>
          <p className="text-sm font-bold text-slate-200">Get ready for the next round...</p>
        </div>
      )}

      {/* Paused Screen */}
      {gameState === 'paused' && (
        <div className="p-8 bg-slate-900 border-2 border-slate-800 rounded-3xl text-center space-y-4 shadow-inner">
          <Pause size={48} className="mx-auto text-amber-400 animate-pulse" />
          <h3 className="text-xl font-black text-amber-300">PAUSED</h3>
          <p className="text-xs text-slate-400">Tap resume when you're ready!</p>
          <button
            type="button"
            onClick={handleTogglePause}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs shadow-md inline-flex items-center gap-2"
          >
            <Play size={16} fill="currentColor" /> Resume Game
          </button>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameover' && (
        <div className="p-8 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-slate-900 border-2 border-amber-400 rounded-3xl text-center space-y-5 animate-in zoom-in-95">
          <Trophy size={56} className="mx-auto text-amber-400 animate-bounce" />
          <h3 className="text-2xl font-black text-amber-300">
            {score > 0 ? '🎉 WORD BLITZ CLEARED!' : "TIME'S UP — TRY AGAIN!"}
          </h3>
          <div className="flex items-center justify-center gap-6 text-sm font-bold text-slate-200 flex-wrap">
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400">Score</div>
              <div className="text-xl font-black text-amber-400">{score} PTS</div>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400">Max Combo</div>
              <div className="text-xl font-black text-orange-400">{maxStreak}x 🔥</div>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400">XP Earned</div>
              <div className="text-xl font-black text-emerald-400">+50 XP</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleStartGame}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl font-black text-xs inline-flex items-center gap-2 transition"
            >
              <RotateCcw size={16} /> Play Again
            </button>
            <button
              type="button"
              onClick={() => navigate(`/week/${weekNumber}/hub/1`)}
              className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-white rounded-2xl font-black text-sm shadow-xl inline-flex items-center gap-2 transition hover:scale-105"
            >
              🎉 Complete & Back to Map ▶
            </button>
          </div>
        </div>
      )}

      {/* Active Match Screen: 3-4 Big Punchy Pairs */}
      {gameState === 'playing' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* English Column */}
          <div className="space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-amber-400 px-1 flex items-center justify-between">
              <span>ENGLISH TARGET</span>
              <span className="text-[10px] text-slate-400">Select English</span>
            </div>
            {shuffledEn.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedEn?.id === item.id;
              if (isMatched) {
                return (
                  <div
                    key={item.id}
                    className="w-full p-4 rounded-2xl bg-emerald-950/40 border-2 border-emerald-500/40 text-emerald-400 font-black text-sm sm:text-base flex items-center justify-between opacity-40"
                  >
                    <span>✓ {item.en}</span>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedEn(item)}
                  className={`w-full p-4 rounded-2xl font-black text-sm sm:text-base transition-all border-2 text-left flex items-center justify-between shadow-md active:scale-95 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-300 ring-4 ring-amber-400/50 scale-[1.02] shadow-2xl'
                      : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700 hover:border-amber-400'
                  }`}
                >
                  <span className="truncate">{item.en}</span>
                  {isSelected && <Sparkles size={18} className="text-slate-950 animate-spin shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Meaning / Definition Column */}
          <div className="space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-cyan-400 px-1 flex items-center justify-between">
              <span>MEANING / DEFINITION</span>
              <span className="text-[10px] text-slate-400">Match Meaning</span>
            </div>
            {shuffledVi.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedVi?.id === item.id;
              if (isMatched) {
                return (
                  <div
                    key={item.id}
                    className="w-full p-4 rounded-2xl bg-emerald-950/40 border-2 border-emerald-500/40 text-emerald-400 font-black text-sm sm:text-base flex items-center justify-between opacity-40"
                  >
                    <span>✓ {item.vi}</span>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedVi(item)}
                  className={`w-full p-4 rounded-2xl font-black text-sm sm:text-base transition-all border-2 text-left flex items-center justify-between shadow-md active:scale-95 ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 border-cyan-300 ring-4 ring-cyan-400/50 scale-[1.02] shadow-2xl'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-100 border-slate-700 hover:border-cyan-400'
                  }`}
                >
                  <span className="truncate">{item.vi}</span>
                  {isSelected && <CheckCircle2 size={18} className="text-slate-950 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default FlashArena;

