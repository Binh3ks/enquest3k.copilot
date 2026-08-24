import React, { useState, useEffect } from 'react';
import { Volume2, Zap, CheckCircle2, XCircle, Trophy, RotateCcw, Timer, Flame, Play, Pause } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';

const DEFAULT_SNIPER_WORDS = [
  { id: "w1", en: "lion",      vi: "con sư tử" },
  { id: "w2", en: "mouse",    vi: "con chuột nhỏ" },
  { id: "w3", en: "hunter",   vi: "thợ săn" },
  { id: "w4", en: "net",      vi: "lưới bẫy" },
  { id: "w5", en: "forest",   vi: "khu rừng" },
  { id: "w6", en: "brave",    vi: "dũng cảm" },
  { id: "w7", en: "freed",    vi: "được giải thoát" },
  { id: "w8", en: "promise",  vi: "lời hứa" }
];

export default function SoundSniper({ words = [], onComplete }) {
  const activeWords = (words && Array.isArray(words) && words.length > 0) ? words : DEFAULT_SNIPER_WORDS;
  
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'paused' | 'gameover'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedWord, setSelectedWord] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [options, setOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(45);

  const currentItem = activeWords[currentIndex] || activeWords[0];

  // 45s Timer Countdown
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

  const handleStartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(45);
    setGameState('playing');
  };

  const handleTogglePause = () => {
    setGameState(prev => (prev === 'playing' ? 'paused' : 'playing'));
  };

  const finishGame = () => {
    setGameState('gameover');
    const xpEarned = score > 0 ? 30 : 0;
    if (score > 0) {
      fireCelebrationConfetti('SoundSniper_Victory');
    }
    if (onComplete) onComplete(score);
  };

  // Generate 4 options for current item
  useEffect(() => {
    if (!currentItem || gameState !== 'playing') return;

    const targetWord = typeof currentItem === 'string' ? currentItem : (currentItem.word || currentItem.en || currentItem.text || '');
    
    // Pick 3 distractors
    const allWords = activeWords.map(w => typeof w === 'string' ? w : (w.word || w.en || w.text || '')).filter(w => w && w !== targetWord);
    const shuffledDistractors = [...allWords].sort(() => 0.5 - Math.random()).slice(0, 3);
    
    const combined = [targetWord, ...shuffledDistractors].sort(() => 0.5 - Math.random());
    setOptions(combined);
    setSelectedWord(null);
    setIsAnswered(false);

    // Auto speak target word
    setTimeout(() => {
      speakText(targetWord);
    }, 250);
  }, [currentIndex, activeWords, gameState]);

  const handlePlaySound = () => {
    if (!currentItem) return;
    const targetWord = typeof currentItem === 'string' ? currentItem : (currentItem.word || currentItem.en || currentItem.text || '');
    speakText(targetWord);
  };

  const handleSelect = (word) => {
    if (isAnswered || gameState !== 'playing') return;
    setIsAnswered(true);
    setSelectedWord(word);

    const targetWord = typeof currentItem === 'string' ? currentItem : (currentItem.word || currentItem.en || currentItem.text || '');
    const isCorrect = word.toLowerCase() === targetWord.toLowerCase();

    if (isCorrect) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      const bonusScore = 15 + nextStreak * 5;
      setScore(prev => prev + bonusScore);
      setTimeLeft(prev => Math.min(45, prev + 2));
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentIndex + 1 < Math.min(activeWords.length, 10)) {
        setCurrentIndex(prev => prev + 1);
      } else {
        finishGame();
      }
    }, 1000);
  };

  const targetWord = currentItem ? (typeof currentItem === 'string' ? currentItem : (currentItem.word || currentItem.en || currentItem.text || '')) : '';

  return (
    <div className="w-full max-w-4xl mx-auto p-5 sm:p-7 bg-white rounded-3xl border-2 border-amber-300 shadow-xl space-y-6 text-slate-900 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-900 font-black text-lg">
            🎧
          </div>
          <div>
            <h4 className="text-base font-black text-slate-900">SOUND SNIPER — FAST EAR DECODING</h4>
            <span className="text-xs text-slate-500">Question {currentIndex + 1} of {Math.min(activeWords.length, 10)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {gameState === 'playing' && (
            <button
              type="button"
              onClick={handleTogglePause}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition"
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
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-orange-500 text-white animate-pulse flex items-center gap-1">
              <Flame size={12} /> {streak}x Streak!
            </span>
          )}

          <div className="px-3.5 py-1.5 bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-2">
            <Timer className={timeLeft <= 8 && gameState === 'playing' ? 'text-rose-500 animate-ping' : 'text-amber-600'} size={16} />
            <span className={`text-sm font-black font-mono ${timeLeft <= 8 ? 'text-rose-600' : 'text-slate-900'}`}>
              {timeLeft}s
            </span>
          </div>

          <span className="text-sm font-black text-amber-700 font-mono">
            {score} PTS
          </span>
        </div>
      </div>

      {/* Start Screen (Idle) */}
      {gameState === 'idle' && (
        <div className="p-8 bg-amber-50/80 border-2 border-amber-300 rounded-3xl text-center space-y-5 shadow-inner">
          <div className="w-16 h-16 rounded-3xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-3xl mx-auto shadow-lg">
            🎧
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">READY FOR SOUND SNIPER?</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Listen to the audio clip and tap the matching word in 45 seconds. Tap Start when ready!
            </p>
          </div>
          <button
            type="button"
            onClick={handleStartGame}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 rounded-2xl font-black text-base shadow-xl inline-flex items-center gap-2 transition hover:scale-105"
          >
            <Play size={22} fill="currentColor" /> ▶️ START SOUND SNIPER
          </button>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameover' && (
        <div className="p-8 bg-amber-50/80 border-2 border-amber-300 rounded-3xl text-center space-y-4 shadow-inner animate-in zoom-in-95">
          <Trophy size={56} className="mx-auto text-amber-500 animate-bounce" />
          <h3 className="text-2xl font-black text-slate-900">
            {score > 0 ? 'SOUND SNIPER COMPLETE!' : 'TIME EXPIRED — TRY AGAIN!'}
          </h3>
          <div className="flex items-center justify-center gap-6 text-sm font-bold text-slate-700">
            <div>Score: <span className="text-xl font-black text-amber-600">{score} PTS</span></div>
            <div>XP Earned: <span className={`text-xl font-black ${score > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>+{score > 0 ? 30 : 0} XP</span></div>
          </div>
          <button
            type="button"
            onClick={handleStartGame}
            className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 text-slate-950 rounded-2xl font-black text-sm shadow-xl inline-flex items-center gap-2 transition hover:scale-105"
          >
            <RotateCcw size={18} /> Play Sound Sniper Again
          </button>
        </div>
      )}

      {/* Active Audio Question Screen */}
      {gameState === 'playing' && (
        <div className="space-y-6">
          <div className="text-center py-2 space-y-3">
            <button
              type="button"
              onClick={handlePlaySound}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 mx-auto flex items-center justify-center shadow-xl shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 group"
            >
              <Volume2 size={44} className="group-hover:scale-110 transition-transform" />
            </button>
            <div className="text-xs font-bold text-slate-600">Tap speaker to re-listen</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {options.map((opt, idx) => {
              const isTarget = opt.toLowerCase() === targetWord.toLowerCase();
              const isSelected = selectedWord === opt;

              let btnStyle = 'bg-slate-50 hover:bg-amber-50 text-slate-900 border-slate-200';
              if (isAnswered) {
                if (isTarget) {
                  btnStyle = 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-400';
                } else if (isSelected && !isTarget) {
                  btnStyle = 'bg-rose-600 text-white border-rose-400';
                } else {
                  btnStyle = 'bg-slate-100 text-slate-400 border-slate-200';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelect(opt)}
                  className={`p-4 rounded-2xl font-black text-sm sm:text-base transition-all border text-center flex items-center justify-center gap-2 shadow-sm ${btnStyle}`}
                >
                  {isAnswered && isTarget && <CheckCircle2 size={18} className="text-white shrink-0" />}
                  {isAnswered && isSelected && !isTarget && <XCircle size={18} className="text-white shrink-0" />}
                  <span className="truncate">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
