import React, { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, Layers, Grid, Volume2 } from 'lucide-react';
import VoiceService from '../../services/voiceService';
import { learnerProgressService } from '../../services/learnerProgressService';
import { srsService } from '../../services/srsService';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import CompletionModal from '../common/CompletionModal';
import { useUserStore } from '../../stores/useUserStore';

function shuffleArray(array) {
  if (!Array.isArray(array)) return [];
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function VisualMatchingAH({ customData, onComplete, weekNumber = 33 }) {
  const [answers, setAnswers] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const fullPassageScript = customData?.passage_audio_script || "Listen carefully and match the letters to the items.";

  const itemsList = customData?.items || [];

  const pictureCards = useMemo(() => {
    const rawCards = customData?.cards || [];
    return shuffleArray(rawCards);
  }, [customData, shuffleSeed]);

  const handleSelectItem = (item) => {
    if (isSubmitted) return;
    setSelectedItem(item);
    if (item.audio_text) {
      VoiceService.speak(item.audio_text, 'questions', item.audio_url, 33);
    }
  };

  const handleMatchCard = (card) => {
    if (isSubmitted || !selectedItem) return;
    setAnswers({ ...answers, [selectedItem.id]: card.letter });
    setSelectedItem(null);
  };

  const handleClearMatch = (itemId, e) => {
    e.stopPropagation();
    if (isSubmitted) return;
    const newAns = { ...answers };
    delete newAns[itemId];
    setAnswers(newAns);
  };

  const handleCheck = () => {
    let correct = 0;
    itemsList.forEach((item) => {
      const isItemCorrect = answers[item.id] === item.target_letter;
      if (isItemCorrect) correct++;
      // Record SRS attempt for each item matched
      srsService.recordReview(item.name, isItemCorrect);
    });

    const finalScore = Math.round((correct / itemsList.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);

    if (finalScore >= 80) {
      fireCelebrationConfetti('Hub2_Item_Hunt');
      setShowCompletionModal(true);
      const userStore = useUserStore?.getState ? useUserStore.getState() : null;
      if (userStore?.addXP) userStore.addXP(50);
    }

    learnerProgressService.logAttempt({
      learnerId: 'learner_default_01',
      contentId: 'w33_listening_p3_item_hunt',
      mode: 'check',
      result: finalScore >= 60 ? 'correct' : 'incorrect',
      score: finalScore,
      timeSpentSeconds: 45
    });

    if (onComplete) onComplete(finalScore);
  };

  const handleReset = () => {
    setAnswers({});
    setSelectedItem(null);
    setIsSubmitted(false);
    setScore(null);
    setShuffleSeed(prev => prev + 1);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-1 p-2.5 sm:p-4 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-md font-sans space-y-2.5">
      {/* Compact Header & Audio Control Bar */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              window.location.href = `/week/${weekNumber || 33}/hub/1`;
            }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-xl text-xs font-black flex items-center gap-1 transition active:scale-95 shadow shrink-0"
          >
            ← Map
          </button>
          <button
            type="button"
            onClick={() => VoiceService.speak(
              customData?.passage_audio_script || fullPassageScript,
              'questions',
              '/audio/week33/listening_p3_full.mp3',
              33
            )}
            className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition shadow-sm active:scale-95 shrink-0"
          >
            <Volume2 size={14} /> 🔊 Play Audio
          </button>
        </div>

        <h3 className="text-xs sm:text-sm font-black text-slate-800">
          Match 5 Items to Location Cards
        </h3>
      </div>

      {/* Main Split Grid: Left 5 Object Items vs Right 8 Picture Cards A-H */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        {/* Left Column: 5 Object Items */}
        <div className="lg:col-span-5 space-y-2">
          {itemsList.map((item) => {
            const assignedLetter = answers[item.id];
            const isSelected = selectedItem?.id === item.id;
            const isCorrect = isSubmitted && assignedLetter === item.target_letter;

            return (
              <div
                key={item.id}
                onClick={() => handleSelectItem(item)}
                className={`p-2.5 sm:p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSubmitted
                    ? isCorrect
                      ? 'bg-emerald-50 border-emerald-400'
                      : 'bg-rose-50 border-rose-400'
                    : isSelected
                    ? 'bg-amber-100/90 border-amber-500 ring-2 ring-amber-200 scale-101 shadow-sm'
                    : assignedLetter
                    ? 'bg-white border-amber-300 shadow-2xs'
                    : 'bg-white border-slate-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                      {item.id}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                      {item.name}
                    </span>
                  </div>

                  {isSubmitted && (
                    <div className="ml-1">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <div className="flex items-center gap-0.5">
                          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                          <span className="text-[11px] font-black text-rose-700">({item.target_letter})</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Status Pill Container */}
                <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between">
                  <div className={`px-2 py-0.5 rounded-lg text-[11px] font-black border flex items-center gap-1 ${
                    assignedLetter ? 'bg-amber-500 text-white border-amber-600 shadow-2xs' : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    <span className="text-[9px] uppercase opacity-75 font-bold">Matched:</span>
                    <span>{assignedLetter ? `Card ${assignedLetter}` : 'Choose card 👉'}</span>
                  </div>

                  {assignedLetter && !isSubmitted && (
                    <button
                      onClick={(e) => handleClearMatch(item.id, e)}
                      className="px-2 py-0.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-[10px] font-bold rounded border border-rose-200"
                    >
                      Clear ✕
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: 8 Shuffled Picture Cards A-H (2 Columns Grid Layout) */}
        <div className="lg:col-span-7 space-y-2 bg-amber-50/50 p-2.5 sm:p-3 rounded-2xl border border-amber-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2">
            {pictureCards.map((card) => {
              const matchedItem = itemsList.find(i => answers[i.id] === card.letter);

              return (
                <button
                  key={card.letter}
                  disabled={isSubmitted}
                  onClick={() => handleMatchCard(card)}
                  className={`p-2 rounded-xl border text-left transition-all flex flex-col justify-between shadow-2xs relative group overflow-hidden ${
                    matchedItem
                      ? 'bg-white border-amber-500 ring-2 ring-amber-300'
                      : selectedItem
                      ? 'bg-white border-amber-300 hover:border-amber-500 hover:scale-102'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="w-5 h-5 rounded-md bg-amber-600 text-white font-black text-[11px] flex items-center justify-center shrink-0">
                      {card.letter}
                    </span>
                    {matchedItem && (
                      <span className="px-1.5 py-0.2 bg-amber-500 text-white font-black text-[9px] rounded truncate max-w-[100px] shadow-2xs">
                        🎯 {matchedItem.name}
                      </span>
                    )}
                  </div>

                  <div className="w-full h-24 sm:h-28 bg-slate-100 rounded-lg overflow-hidden mb-1 border border-slate-200 relative">
                    <img 
                      src={card.image_url} 
                      alt={card.name} 
                      onError={(e) => {
                        if (e.target.src.endsWith('.jpg')) {
                          e.target.src = e.target.src.replace('.jpg', '.png');
                        }
                      }}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-800 block text-center leading-snug break-words min-h-[28px] flex items-center justify-center">
                    {card.location_name || card.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Check & Score */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
        {!isSubmitted ? (
          <button
            onClick={handleCheck}
            disabled={Object.keys(answers).length === 0}
            className="w-full sm:w-auto px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-black text-sm rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-40"
          >
            <Sparkles size={18} /> Check Visual Matches
          </button>
        ) : (
          <div className="w-full flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-600 animate-bounce" />
              <span className="text-lg font-black text-slate-900">
                Visual Match Score: {score}%
              </span>
            </div>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Try Again
            </button>
          </div>
        )}
      </div>

      <CompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        score={score || 100}
        stars={score >= 80 ? 3 : score >= 60 ? 2 : 1}
        xpEarned={50}
        srsWordsAdded={5}
        activityTitle="Item Hunt Mission (Hub 2)"
      />
    </div>
  );
}

export default VisualMatchingAH;
