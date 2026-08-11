import React, { useState, useEffect } from 'react';
import { learnerProgressService } from '../../../../services/learnerProgressService';
import { Zap, Trophy, Timer, Swords, CheckCircle2, RefreshCw, Coffee } from 'lucide-react';

const VOCAB_SETS = {
  set_w33: [
    { id: 'v1', en: 'explore', vi: 'khám phá' },
    { id: 'v2', en: 'expedition', vi: 'cuộc thám hiểm' },
    { id: 'v3', en: 'crystal', vi: 'pha lê' },
    { id: 'v4', en: 'torch', vi: 'đèn pin / đuốc' },
    { id: 'v5', en: 'steep', vi: 'dốc' }
  ],
  set_w34: [
    { id: 'v6', en: 'rescue', vi: 'cứu hộ' },
    { id: 'v7', en: 'rope', vi: 'dây thừng' },
    { id: 'v8', en: 'map', vi: 'bản đồ' },
    { id: 'v9', en: 'treasure', vi: 'kho báu' },
    { id: 'v10', en: 'scout', vi: 'hướng đạo sinh' }
  ]
};

export function FlashArena({ onAttemptResult }) {
  const [playMode, setPlayMode] = useState('casual'); // 'casual' (Untimed) | 'speed' (30s Timer)
  const [activeSetKey, setActiveSetKey] = useState('set_w33');
  const [selectedEn, setSelectedEn] = useState(null);
  const [selectedVi, setSelectedVi] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentPairs = VOCAB_SETS[activeSetKey] || VOCAB_SETS.set_w33;

  // Timer Countdown Engine (Only active in Speed mode)
  useEffect(() => {
    if (playMode !== 'speed' || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // AI Bot simulate matching score every 6 seconds in speed mode
    const botTimer = setInterval(() => {
      if (!isGameOver) {
        setBotScore((prev) => prev + 10);
      }
    }, 6000);

    return () => {
      clearInterval(timer);
      clearInterval(botTimer);
    };
  }, [playMode, isGameOver]);

  // Match Verification with Race Condition Protection
  useEffect(() => {
    if (selectedEn && selectedVi) {
      // Race condition protection test check
      const currentTimerVal = playMode === 'speed' ? timeLeft : 999;
      const evalRes = evaluateFlashPairMatch(
        selectedEn,
        selectedVi,
        score,
        matchedIds,
        currentPairs.length,
        currentTimerVal
      );

      if (evalRes.raceConditionBlocked) {
        console.warn('Race condition prevented: Match attempt blocked because timer reached 0s.');
        setSelectedEn(null);
        setSelectedVi(null);
        return;
      }

      if (evalRes.isMatch) {
        setMatchedIds(evalRes.newMatchedIds);
        setScore(evalRes.newScore);

        if (onAttemptResult) {
          onAttemptResult(true, 'vocab_flash');
        }

        if (evalRes.isGameOver) {
          setIsGameOver(true);
          learnerProgressService.logAttempt({
            learnerId: 'learner_default_01',
            contentId: `flash_arena_${activeSetKey}`,
            mode: 'learn',
            result: 'correct',
            score: evalRes.newScore,
            timeSpentSeconds: playMode === 'speed' ? 30 - timeLeft : 20
          });
        }
      }

      setSelectedEn(null);
      setSelectedVi(null);
    }
  }, [selectedEn, selectedVi]);

  const handleRestart = () => {
    setMatchedIds([]);
    setScore(0);
    setBotScore(0);
    setTimeLeft(30);
    setIsGameOver(false);
    setSelectedEn(null);
    setSelectedVi(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl text-white">
      {/* Header Banner & Play Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800">
        <div>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
            <Zap size={14} /> Flash Arena — Chế Độ Đấu Thẻ Từ Vựng
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-amber-400 mt-2">
            Luyện Từ Vựng W33–W34
          </h2>
        </div>

        {/* Mode Selector: Casual vs Speed */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => {
              setPlayMode('casual');
              handleRestart();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
              playMode === 'casual'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Coffee size={14} /> Casual Mode (Thong thả)
          </button>
          <button
            onClick={() => {
              setPlayMode('speed');
              handleRestart();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
              playMode === 'speed'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Timer size={14} /> Speed Battle (30s)
          </button>
        </div>
      </div>

      {/* Set Selector */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs text-slate-400 font-bold">Bộ từ vựng:</span>
        <button
          onClick={() => {
            setActiveSetKey('set_w33');
            handleRestart();
          }}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
            activeSetKey === 'set_w33' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
          }`}
        >
          W33 (Hang Động)
        </button>
        <button
          onClick={() => {
            setActiveSetKey('set_w34');
            handleRestart();
          }}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
            activeSetKey === 'set_w34' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
          }`}
        >
          W34 (Cứu Hộ)
        </button>
      </div>

      {/* Scoreboard */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-indigo-950/60 p-4 rounded-2xl border border-indigo-500/40 flex items-center justify-between">
          <div>
            <div className="text-xs text-indigo-300 font-bold uppercase">Điểm Của Bạn</div>
            <div className="text-2xl font-black text-white">{score} điểm</div>
          </div>
          <Trophy className="w-8 h-8 text-amber-400" />
        </div>

        <div className="bg-purple-950/60 p-4 rounded-2xl border border-purple-500/40 flex items-center justify-between">
          <div>
            <div className="text-xs text-purple-300 font-bold uppercase">
              {playMode === 'speed' ? 'Đối Thủ (AI Nova)' : 'Chế Độ Luyện Tập'}
            </div>
            <div className="text-2xl font-black text-white">
              {playMode === 'speed' ? `${botScore} điểm` : 'Không Giới Hạn'}
            </div>
          </div>
          {playMode === 'speed' ? (
            <div className="flex items-center gap-1 text-amber-400 font-mono font-bold">
              <Timer size={16} /> {timeLeft}s
            </div>
          ) : (
            <Coffee className="w-8 h-8 text-emerald-400" />
          )}
        </div>
      </div>

      {/* Game Board Grid */}
      {isGameOver ? (
        <div className="text-center py-10 bg-slate-950 rounded-2xl border border-slate-800 p-6">
          <h3 className="text-2xl font-black text-amber-400 mb-2">
            🎉 HOÀN THÀNH BỘ TỪ VỰNG!
          </h3>
          <p className="text-sm text-slate-300 mb-6">
            Tổng điểm của bạn: <span className="font-extrabold text-emerald-400">{score}</span> điểm
          </p>
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-sm transition inline-flex items-center gap-2"
          >
            <RefreshCw size={16} /> Chơi lại lần nữa
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* English Column */}
          <div className="space-y-3">
            <h4 className="text-xs text-slate-400 font-bold uppercase text-center">Tiếng Anh (English)</h4>
            {currentPairs.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedEn === item.id;

              return (
                <button
                  key={item.id}
                  disabled={isMatched}
                  onClick={() => setSelectedEn(item.id)}
                  className={`w-full p-4 rounded-xl font-bold text-base transition border shadow-md text-left flex items-center justify-between ${
                    isMatched
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400 opacity-50 cursor-not-allowed'
                      : isSelected
                      ? 'bg-indigo-600 border-indigo-400 text-white scale-102 ring-2 ring-indigo-400'
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <span>{item.en}</span>
                  {isMatched && <CheckCircle2 size={18} />}
                </button>
              );
            })}
          </div>

          {/* Vietnamese Column */}
          <div className="space-y-3">
            <h4 className="text-xs text-slate-400 font-bold uppercase text-center">Tiếng Việt (Vietnamese)</h4>
            {currentPairs.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedVi === item.id;

              return (
                <button
                  key={item.id}
                  disabled={isMatched}
                  onClick={() => setSelectedVi(item.id)}
                  className={`w-full p-4 rounded-xl font-bold text-base transition border shadow-md text-left flex items-center justify-between ${
                    isMatched
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400 opacity-50 cursor-not-allowed'
                      : isSelected
                      ? 'bg-indigo-600 border-indigo-400 text-white scale-102 ring-2 ring-indigo-400'
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <span>{item.vi}</span>
                  {isMatched && <CheckCircle2 size={18} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
