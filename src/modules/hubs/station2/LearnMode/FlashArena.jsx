import React, { useState, useEffect, useMemo } from 'react';
import { fireCelebrationConfetti } from '../../../../utils/confettiHelper';
import { useUserStore } from '../../../../stores/useUserStore';
import { Zap, Trophy, Timer, Swords, CheckCircle2, RotateCcw, Flame, Sparkles } from 'lucide-react';
import CompletionModal from '../../../../components/common/CompletionModal';

const DEFAULT_WORD_POOL = [
  { id: "w01", en: "corridor", vi: "hành lang" },
  { id: "w02", en: "bandage", vi: "băng cá nhân" },
  { id: "w03", en: "nurse", vi: "y tế / y tá" },
  { id: "w04", en: "cold pack", vi: "túi chườm lạnh" },
  { id: "w05", en: "relieved", vi: "nhẹ nhõm" },
  { id: "w06", en: "praised", vi: "khen ngợi" },
  { id: "w07", en: "carefully", vi: "cẩn thận" },
  { id: "w08", en: "immediately", vi: "ngay lập tức" },
  { id: "w09", en: "puddle", vi: "vũng nước ướt" },
  { id: "w10", en: "friction", vi: "lực ma sát" },
  { id: "w11", en: "slipped", vi: "trượt chân" },
  { id: "w12", en: "fell down", vi: "ngã xuống" },
  { id: "w13", en: "called nurse", vi: "gọi y tế" },
  { id: "w14", en: "applied bandage", vi: "băng bó vết thương" },
  { id: "w15", en: "walking carefully", vi: "đi bộ cẩn thận" },
  { id: "w16", en: "slipped on wet floor", vi: "trượt chân trên sàn ướt" },
  { id: "w17", en: "clean bandage", vi: "băng cá nhân sạch" },
  { id: "w18", en: "hurt his knee", vi: "bị thương đầu gối" },
  { id: "w19", en: "felt relieved", vi: "cảm thấy nhẹ nhõm" },
  { id: "w20", en: "first aid kit", vi: "hộp sơ cứu" }
];

export function FlashArena({ customSets, onComplete }) {
  const [selectedEn, setSelectedEn] = useState(null);
  const [selectedVi, setSelectedVi] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Flatten all customSets into one unified 20-word pool
  const unifiedPool = useMemo(() => {
    if (!customSets) return DEFAULT_WORD_POOL;
    let list = [];
    if (Array.isArray(customSets)) return customSets;

    Object.values(customSets).forEach(set => {
      if (Array.isArray(set)) {
        list = [...list, ...set];
      }
    });

    if (list.length === 0) return DEFAULT_WORD_POOL;

    // Deduplicate by en
    const unique = [];
    const seen = new Set();
    list.forEach(item => {
      if (item && item.en && !seen.has(item.en.toLowerCase())) {
        seen.add(item.en.toLowerCase());
        unique.push(item);
      }
    });

    return unique.length > 0 ? unique : DEFAULT_WORD_POOL;
  }, [customSets]);

  // Current active 6 pairs displayed on screen
  const [activePairs, setActivePairs] = useState([]);
  const [shuffledEn, setShuffledEn] = useState([]);
  const [shuffledVi, setShuffledVi] = useState([]);

  // Start / Restart Blitz Game
  const handleStartGame = () => {
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(30);
    setMatchedIds([]);
    setSelectedEn(null);
    setSelectedVi(null);
    setIsGameOver(false);
    setIsGameActive(true);

    // Pick 8 random pairs from unifiedPool
    const shuffled = [...unifiedPool].sort(() => 0.5 - Math.random()).slice(0, 8);
    setActivePairs(shuffled);
    setShuffledEn([...shuffled].sort(() => 0.5 - Math.random()));
    setShuffledVi([...shuffled].sort(() => 0.5 - Math.random()));
  };

  // Auto start on mount
  useEffect(() => {
    handleStartGame();
  }, [unifiedPool]);

  // 30-Second Countdown Timer Engine
  useEffect(() => {
    if (!isGameActive || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          setIsGameActive(false);
          fireCelebrationConfetti('WordBlitz_Victory');
          const userStore = useUserStore?.getState ? useUserStore.getState() : null;
          if (userStore?.addXP) userStore.addXP(40);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameActive, isGameOver]);

  // Match Evaluation Logic
  useEffect(() => {
    if (selectedEn && selectedVi) {
      if (selectedEn.id === selectedVi.id || selectedEn.en.toLowerCase() === selectedVi.en?.toLowerCase()) {
        // MATCH CORRECT!
        const nextStreak = streak + 1;
        setStreak(nextStreak);
        setMaxStreak(prev => Math.max(prev, nextStreak));

        const bonusPoints = 10 + nextStreak * 5;
        setScore(prev => prev + bonusPoints);
        setTimeLeft(prev => Math.min(30, prev + 1)); // Bonus +1s per correct match!

        const newMatched = [...matchedIds, selectedEn.id];
        setMatchedIds(newMatched);

        // If all 8 matched, load 8 fresh pairs!
        if (newMatched.length === activePairs.length) {
          setTimeout(() => {
            const next8 = [...unifiedPool].sort(() => 0.5 - Math.random()).slice(0, 8);
            setActivePairs(next8);
            setShuffledEn([...next8].sort(() => 0.5 - Math.random()));
            setShuffledVi([...next8].sort(() => 0.5 - Math.random()));
            setMatchedIds([]);
          }, 300);
        }
      } else {
        // INCORRECT MATCH
        setStreak(0);
      }

      setTimeout(() => {
        setSelectedEn(null);
        setSelectedVi(null);
      }, 250);
    }
  }, [selectedEn, selectedVi]);

  return (
    <div className="w-full max-w-4xl mx-auto p-5 sm:p-7 bg-slate-950 text-white rounded-3xl border-2 border-amber-500/40 shadow-2xl space-y-6">
      {/* Top Arcade Status Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg">
            ⚡
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/30 text-amber-300 border border-amber-400/40">
              30-Second Arcade Speed Match
            </span>
            <h3 className="text-lg font-black text-white">⚡ WORD BLITZ (30s)</h3>
          </div>
        </div>

        {/* Score, Streak & Timer Dashboard */}
        <div className="flex items-center gap-3">
          {streak > 1 && (
            <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-rose-600 rounded-full text-white font-black text-xs animate-bounce flex items-center gap-1 shadow-lg">
              <Flame size={14} /> {streak}x COMBO!
            </div>
          )}

          <div className="px-4 py-2 bg-slate-900 rounded-2xl border border-slate-800 flex items-center gap-2">
            <Timer className={timeLeft <= 5 ? 'text-rose-500 animate-ping' : 'text-amber-400'} size={18} />
            <span className={`text-base font-black font-mono ${timeLeft <= 5 ? 'text-rose-400' : 'text-amber-300'}`}>
              {timeLeft}s
            </span>
          </div>

          <div className="px-4 py-2 bg-amber-500/20 text-amber-300 rounded-2xl border border-amber-400/40 font-black text-sm font-mono">
            {score} PTS
          </div>
        </div>
      </div>

      {/* Game End Overlay */}
      {isGameOver && (
        <div className="p-8 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-slate-900 border-2 border-amber-400 rounded-3xl text-center space-y-4 animate-in zoom-in-95">
          <Trophy size={56} className="mx-auto text-amber-400 animate-bounce" />
          <h3 className="text-2xl font-black text-amber-300">BLITZ TIME EXPIRED!</h3>
          <div className="flex items-center justify-center gap-6 text-sm font-bold text-slate-200">
            <div>Score: <span className="text-xl font-black text-amber-400">{score} PTS</span></div>
            <div>Max Combo: <span className="text-xl font-black text-orange-400">{maxStreak}x 🔥</span></div>
            <div>XP Earned: <span className="text-xl font-black text-emerald-400">+40 XP</span></div>
          </div>
          <button
            type="button"
            onClick={handleStartGame}
            className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 text-slate-950 rounded-2xl font-black text-sm shadow-xl inline-flex items-center gap-2 transition hover:scale-105"
          >
            <RotateCcw size={18} /> Play Blitz Again (30s)
          </button>
        </div>
      )}

      {/* Arcade Matching Columns */}
      {!isGameOver && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left Column: English Words */}
          <div className="space-y-2.5">
            <div className="text-xs font-black uppercase tracking-wider text-amber-400 px-1 flex items-center justify-between">
              <span>ENGLISH WORD</span>
              <span className="text-[10px] text-slate-400">Tap word first</span>
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
                  className={`w-full p-4 rounded-2xl font-black text-sm transition-all border text-left flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-300 ring-4 ring-amber-400/30 scale-[1.02] shadow-xl'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-100 border-slate-800 shadow-md'
                  }`}
                >
                  <span className="truncate">{item.en}</span>
                  {isSelected && <Sparkles size={16} className="text-slate-950 animate-spin" />}
                </button>
              );
            })}
          </div>

          {/* Right Column: Vietnamese Meanings */}
          <div className="space-y-2.5">
            <div className="text-xs font-black uppercase tracking-wider text-cyan-400 px-1 flex items-center justify-between">
              <span>VIETNAMESE MEANING</span>
              <span className="text-[10px] text-slate-400">Tap matching meaning</span>
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
                  className={`w-full p-4 rounded-2xl font-black text-sm transition-all border text-left flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 border-cyan-300 ring-4 ring-cyan-400/30 scale-[1.02] shadow-xl'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-100 border-slate-800 shadow-md'
                  }`}
                >
                  <span className="truncate">{item.vi}</span>
                  {isSelected && <CheckCircle2 size={16} className="text-slate-950" />}
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
