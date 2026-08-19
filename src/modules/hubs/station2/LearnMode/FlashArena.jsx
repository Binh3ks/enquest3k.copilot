import React, { useState, useEffect, useMemo } from 'react';
import { fireCelebrationConfetti } from '../../../../utils/confettiHelper';
import { useUserStore } from '../../../../stores/useUserStore';
import { Zap, Trophy, Timer, CheckCircle2, RotateCcw, Flame, Sparkles, Play, Pause } from 'lucide-react';

const ROUND_1_NOUNS_VERBS = [
  { id: "r1_01", en: "corridor", vi: "hành lang" },
  { id: "r1_02", en: "bandage", vi: "băng cá nhân" },
  { id: "r1_03", en: "nurse", vi: "y tế / y tá" },
  { id: "r1_04", en: "cold pack", vi: "túi chườm lạnh" },
  { id: "r1_05", en: "slipped", vi: "trượt chân" },
  { id: "r1_06", en: "fell down", vi: "ngã xuống" },
  { id: "r1_07", en: "called", vi: "gọi trợ giúp" },
  { id: "r1_08", en: "relieved", vi: "nhẹ nhõm" }
];

const ROUND_2_CHUNKS = [
  { id: "r2_01", en: "slipped on wet floor", vi: "trượt chân trên sàn ướt" },
  { id: "r2_02", en: "walking carefully", vi: "đi bộ cẩn thận" },
  { id: "r2_03", en: "called the school nurse", vi: "gọi y tế trường" },
  { id: "r2_04", en: "applied a clean bandage", vi: "băng bó sạch sẽ" },
  { id: "r2_05", en: "hurt his knee", vi: "bị thương đầu gối" },
  { id: "r2_06", en: "felt relieved", vi: "cảm thấy nhẹ nhõm" },
  { id: "r2_07", en: "corridor safety rules", vi: "quy tắc an toàn hành lang" },
  { id: "r2_08", en: "wet floor warning sign", vi: "biển báo sàn ướt" }
];

const ROUND_3_DEFINITIONS = [
  { id: "r3_01", en: "corridor", vi: "A long passage in a school building" },
  { id: "r3_02", en: "bandage", vi: "A strip of clean cloth used to bind cuts" },
  { id: "r3_03", en: "nurse", vi: "A trained worker who cares for sick students" },
  { id: "r3_04", en: "slipped", vi: "Slid accidentally on a smooth wet surface" },
  { id: "r3_05", en: "friction", vi: "A force that stops objects from sliding" },
  { id: "r3_06", en: "puddle", vi: "A small pool of liquid on the floor" },
  { id: "r3_07", en: "careful", vi: "Making sure to avoid potential danger" },
  { id: "r3_08", en: "praised", vi: "Expressed warm approval of good actions" }
];

export function FlashArena({ customSets, onComplete }) {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'paused' | 'gameover'
  const [currentRound, setCurrentRound] = useState(1);
  const [selectedEn, setSelectedEn] = useState(null);
  const [selectedVi, setSelectedVi] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);

  const activePairs = useMemo(() => {
    if (customSets && typeof customSets === 'object') {
      if (currentRound === 1 && customSets.set1_nouns_adj && customSets.set2_verbs) {
        return [...customSets.set1_nouns_adj.slice(0, 4), ...customSets.set2_verbs.slice(0, 4)];
      }
      if (currentRound === 2 && customSets.set3_chunks) {
        return customSets.set3_chunks.slice(0, 8);
      }
      if (currentRound === 3 && customSets.set4_definitions) {
        return customSets.set4_definitions.slice(0, 8);
      }
    }

    if (currentRound === 1) return ROUND_1_NOUNS_VERBS;
    if (currentRound === 2) return ROUND_2_CHUNKS;
    return ROUND_3_DEFINITIONS;
  }, [currentRound, customSets]);

  const [shuffledEn, setShuffledEn] = useState([]);
  const [shuffledVi, setShuffledVi] = useState([]);

  const loadRound = (roundNum) => {
    setCurrentRound(roundNum);
    setMatchedIds([]);
    setSelectedEn(null);
    setSelectedVi(null);

    const pairs = roundNum === 1 ? (customSets?.set1_nouns_adj ? [...customSets.set1_nouns_adj.slice(0, 4), ...(customSets.set2_verbs || []).slice(0, 4)] : ROUND_1_NOUNS_VERBS)
      : roundNum === 2 ? (customSets?.set3_chunks ? customSets.set3_chunks.slice(0, 8) : ROUND_2_CHUNKS)
      : (customSets?.set4_definitions ? customSets.set4_definitions.slice(0, 8) : ROUND_3_DEFINITIONS);

    setShuffledEn([...pairs].sort(() => 0.5 - Math.random()));
    setShuffledVi([...pairs].sort(() => 0.5 - Math.random()));
  };

  const handleStartGame = () => {
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(45);
    setGameState('playing');
    loadRound(1);
  };

  const handleTogglePause = () => {
    setGameState(prev => (prev === 'playing' ? 'paused' : 'playing'));
  };

  const finishGame = () => {
    setGameState('gameover');
    const xpEarned = score > 0 ? 45 : 0; // Anti-cheat: 0 XP if AFK!

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

        const bonusPoints = 15 + nextStreak * 5;
        setScore(prev => prev + bonusPoints);
        setTimeLeft(prev => Math.min(50, prev + 2));

        const newMatched = [...matchedIds, selectedEn.id];
        setMatchedIds(newMatched);

        if (newMatched.length === activePairs.length) {
          if (currentRound < 3) {
            setTimeout(() => {
              loadRound(currentRound + 1);
            }, 350);
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

  const xpEarned = score > 0 ? 45 : 0;

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
                Round {currentRound}/3 • Arcade Speed Match
              </span>
            </div>
            <h3 className="text-lg font-black text-white">⚡ WORD BLITZ (45s)</h3>
          </div>
        </div>

        {/* Dashboard */}
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

          {gameState === 'paused' && (
            <button
              type="button"
              onClick={handleTogglePause}
              className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl font-black text-xs flex items-center gap-1 shadow-md"
            >
              <Play size={14} /> Resume
            </button>
          )}

          {streak > 1 && (
            <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-rose-600 rounded-full text-white font-black text-xs animate-bounce flex items-center gap-1 shadow-lg">
              <Flame size={14} /> {streak}x COMBO!
            </div>
          )}

          <div className="px-4 py-2 bg-slate-900 rounded-2xl border border-slate-800 flex items-center gap-2">
            <Timer className={timeLeft <= 8 && gameState === 'playing' ? 'text-rose-500 animate-ping' : 'text-amber-400'} size={18} />
            <span className={`text-base font-black font-mono ${timeLeft <= 8 ? 'text-rose-400' : 'text-amber-300'}`}>
              {timeLeft}s
            </span>
          </div>

          <div className="px-4 py-2 bg-amber-500/20 text-amber-300 rounded-2xl border border-amber-400/40 font-black text-sm font-mono">
            {score} PTS
          </div>
        </div>
      </div>

      {/* Start Screen (Idle) */}
      {gameState === 'idle' && (
        <div className="p-8 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-slate-900 border-2 border-amber-400 rounded-3xl text-center space-y-5 shadow-inner">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center font-black text-3xl mx-auto shadow-lg">
            ⚡
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-amber-300">READY FOR WORD BLITZ?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Match 24 vocabulary words across 3 fast rounds (Nouns → Chunks → Definitions) in 45 seconds!
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

      {/* Paused Screen */}
      {gameState === 'paused' && (
        <div className="p-8 bg-slate-900 border-2 border-slate-800 rounded-3xl text-center space-y-4 shadow-inner">
          <Pause size={48} className="mx-auto text-amber-400 animate-pulse" />
          <h3 className="text-xl font-black text-amber-300">BLITZ PAUSED</h3>
          <p className="text-xs text-slate-400">Timer is paused. Tap resume when ready!</p>
          <button
            type="button"
            onClick={handleTogglePause}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs shadow-md inline-flex items-center gap-2"
          >
            <Play size={16} fill="currentColor" /> Resume Word Blitz
          </button>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameover' && (
        <div className="p-8 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-slate-900 border-2 border-amber-400 rounded-3xl text-center space-y-4 animate-in zoom-in-95">
          <Trophy size={56} className="mx-auto text-amber-400 animate-bounce" />
          <h3 className="text-2xl font-black text-amber-300">
            {score > 0 ? 'BLITZ COMPLETE!' : 'TIME EXPIRED — TRY AGAIN!'}
          </h3>
          <div className="flex items-center justify-center gap-6 text-sm font-bold text-slate-200">
            <div>Score: <span className="text-xl font-black text-amber-400">{score} PTS</span></div>
            <div>Max Combo: <span className="text-xl font-black text-orange-400">{maxStreak}x 🔥</span></div>
            <div>XP Earned: <span className={`text-xl font-black ${xpEarned > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>+{xpEarned} XP</span></div>
          </div>
          <button
            type="button"
            onClick={handleStartGame}
            className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 text-slate-950 rounded-2xl font-black text-sm shadow-xl inline-flex items-center gap-2 transition hover:scale-105"
          >
            <RotateCcw size={18} /> Play Word Blitz Again
          </button>
        </div>
      )}

      {/* Active Match Screen */}
      {gameState === 'playing' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2.5">
            <div className="text-xs font-black uppercase tracking-wider text-amber-400 px-1 flex items-center justify-between">
              <span>ENGLISH ITEM</span>
              <span className="text-[10px] text-slate-400">Round {currentRound}</span>
            </div>
            {shuffledEn.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedEn?.id === item.id;
              if (isMatched) return null;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedEn(item)}
                  className={`w-full p-3.5 rounded-2xl font-black text-xs sm:text-sm transition-all border text-left flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-300 ring-4 ring-amber-400/30 scale-[1.02] shadow-xl'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-100 border-slate-800 shadow-md'
                  }`}
                >
                  <span className="truncate">{item.en}</span>
                  {isSelected && <Sparkles size={16} className="text-slate-950 animate-spin shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="space-y-2.5">
            <div className="text-xs font-black uppercase tracking-wider text-cyan-400 px-1 flex items-center justify-between">
              <span>MEANING / DEFINITION</span>
              <span className="text-[10px] text-slate-400">Tap match</span>
            </div>
            {shuffledVi.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedVi?.id === item.id;
              if (isMatched) return null;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedVi(item)}
                  className={`w-full p-3.5 rounded-2xl font-black text-xs sm:text-sm transition-all border text-left flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 border-cyan-300 ring-4 ring-cyan-400/30 scale-[1.02] shadow-xl'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-100 border-slate-800 shadow-md'
                  }`}
                >
                  <span className="truncate">{item.vi}</span>
                  {isSelected && <CheckCircle2 size={16} className="text-slate-950 shrink-0" />}
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
