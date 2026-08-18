import React, { useState, useEffect } from 'react';
import { Volume2, Zap, CheckCircle2, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';

export default function SoundSniper({ words = [], onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedWord, setSelectedWord] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [options, setOptions] = useState([]);
  const [isDone, setIsDone] = useState(false);

  const currentItem = words[currentIndex] || null;

  // Generate 4 options for current item
  useEffect(() => {
    if (!currentItem || words.length === 0) return;

    const targetWord = typeof currentItem === 'string' ? currentItem : (currentItem.word || currentItem.en || currentItem.text || '');
    
    // Pick 3 distractors
    const allWords = words.map(w => typeof w === 'string' ? w : (w.word || w.en || w.text || '')).filter(w => w && w !== targetWord);
    const shuffledDistractors = [...allWords].sort(() => 0.5 - Math.random()).slice(0, 3);
    
    const combined = [targetWord, ...shuffledDistractors].sort(() => 0.5 - Math.random());
    setOptions(combined);
    setSelectedWord(null);
    setIsAnswered(false);

    // Auto speak target word
    setTimeout(() => {
      speakText(targetWord);
    }, 250);
  }, [currentIndex, words]);

  const handlePlaySound = () => {
    if (!currentItem) return;
    const targetWord = typeof currentItem === 'string' ? currentItem : (currentItem.word || currentItem.en || currentItem.text || '');
    speakText(targetWord);
  };

  const handleSelect = (word) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedWord(word);

    const targetWord = typeof currentItem === 'string' ? currentItem : (currentItem.word || currentItem.en || currentItem.text || '');
    const isCorrect = word.toLowerCase() === targetWord.toLowerCase();

    if (isCorrect) {
      setScore(prev => prev + 10 + streak * 2);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentIndex + 1 < Math.min(words.length, 8)) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsDone(true);
        if (onComplete) onComplete(score + (isCorrect ? 10 : 0));
      }
    }, 1200);
  };

  if (isDone) {
    return (
      <div className="p-8 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-400/40 rounded-3xl text-center space-y-4">
        <Trophy size={48} className="mx-auto text-amber-500 animate-bounce" />
        <h3 className="text-xl font-black text-slate-900">Sound Sniper Victory!</h3>
        <p className="text-sm font-bold text-slate-600">You earned <span className="text-amber-600 text-lg font-black">+{score} XP</span> with rapid ear decoding!</p>
        <button
          type="button"
          onClick={() => {
            setCurrentIndex(0);
            setScore(0);
            setStreak(0);
            setIsDone(false);
          }}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-black text-xs shadow-md flex items-center gap-2 mx-auto"
        >
          <RotateCcw size={14} /> Play Again
        </button>
      </div>
    );
  }

  if (!currentItem) return <div className="p-4 text-center text-xs text-slate-400">Loading audio words...</div>;

  const targetWord = typeof currentItem === 'string' ? currentItem : (currentItem.word || currentItem.en || currentItem.text || '');

  return (
    <div className="w-full bg-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <Zap size={18} />
          </div>
          <div>
            <h4 className="text-sm font-black text-amber-300">⚡ SOUND SNIPER (FAST EAR DECODING)</h4>
            <span className="text-[10px] text-slate-400">Round {currentIndex + 1} / {Math.min(words.length, 8)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {streak > 1 && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-orange-500 text-white animate-pulse">
              🔥 {streak}x Streak!
            </span>
          )}
          <span className="text-sm font-black text-amber-400 font-mono">
            Score: {score} XP
          </span>
        </div>
      </div>

      {/* Speaker Button */}
      <div className="text-center py-4 space-y-3">
        <button
          type="button"
          onClick={handlePlaySound}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 mx-auto flex items-center justify-center shadow-xl shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 group"
        >
          <Volume2 size={44} className="group-hover:scale-110 transition-transform" />
        </button>
        <div className="text-xs font-bold text-slate-300">Tap the speaker to hear the word again</div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt, idx) => {
          const isTarget = opt.toLowerCase() === targetWord.toLowerCase();
          const isSelected = selectedWord === opt;

          let btnStyle = 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700';
          if (isAnswered) {
            if (isTarget) {
              btnStyle = 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-400';
            } else if (isSelected && !isTarget) {
              btnStyle = 'bg-rose-600 text-white border-rose-400';
            } else {
              btnStyle = 'bg-slate-800/40 text-slate-500 border-slate-800';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelect(opt)}
              className={`p-4 rounded-2xl font-black text-sm sm:text-base transition-all border text-center flex items-center justify-center gap-2 ${btnStyle}`}
            >
              {isAnswered && isTarget && <CheckCircle2 size={18} className="text-white shrink-0" />}
              {isAnswered && isSelected && !isTarget && <XCircle size={18} className="text-white shrink-0" />}
              <span className="truncate">{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
