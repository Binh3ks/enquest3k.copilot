import React, { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, Layers, Grid } from 'lucide-react';

function shuffleArray(array) {
  if (!Array.isArray(array)) return [];
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function VisualMatchingAH({ customData, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  // Default Listening Part 3 Visual Matching Data
  const itemsList = customData?.items || [
    { id: 1, name: 'Clean Bandage', target_letter: 'A' },
    { id: 2, name: 'Cold Pack', target_letter: 'B' },
    { id: 3, name: 'Science Notebook', target_letter: 'C' },
    { id: 4, name: 'Orange Juice', target_letter: 'E' },
    { id: 5, name: 'Alarm Clock', target_letter: 'D' }
  ];

  // Fisher-Yates Shuffle 8 Picture Cards (A to H)
  const pictureCards = useMemo(() => {
    const rawCards = customData?.cards || [
      { letter: 'A', name: 'School Nurse Cabinet', image_url: '/images/week33/webtoon_scene_4.png' },
      { letter: 'B', name: 'First Aid Ice Box', image_url: '/images/week33/webtoon_scene_4.png' },
      { letter: 'C', name: 'School Corridor Floor', image_url: '/images/week33/webtoon_scene_1.png' },
      { letter: 'D', name: 'Bedroom Table', image_url: '/images/week33/webtoon_scene_5.png' },
      { letter: 'E', name: 'Science Laboratory', image_url: '/images/week33/webtoon_scene_2.png' },
      { letter: 'F', name: 'School Cafeteria', image_url: '/images/week33/webtoon_scene_3.png' },
      { letter: 'G', name: 'Library Desk', image_url: '/images/week33/webtoon_scene_1.png' },
      { letter: 'H', name: 'Playground Bench', image_url: '/images/week33/webtoon_scene_5.png' }
    ];
    return shuffleArray(rawCards);
  }, [customData, shuffleSeed]);

  const handleSelectItem = (item) => {
    if (isSubmitted) return;
    setSelectedItem(item);
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
      if (answers[item.id] === item.target_letter) correct++;
    });
    const finalScore = Math.round((correct / itemsList.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
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
    <div className="w-full max-w-5xl mx-auto my-4 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-[11px] font-black rounded-full uppercase tracking-wider">
            CAMBRIDGE LISTENING PART 3 — VISUAL MATCHING A-H
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Match 5 Items to the Correct Picture Cards (A to H)
          </h2>
        </div>
        <span className="px-3.5 py-1.5 bg-slate-100 text-slate-700 text-xs font-black rounded-xl border border-slate-200">
          5 Items · 8 Shuffled Picture Cards
        </span>
      </div>

      {/* Main Split Grid: Left 5 Object Items vs Right 8 Picture Cards A-H */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 5 Object Items */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers size={15} className="text-amber-600" /> 5 Object Items (Click an item):
          </div>

          <div className="space-y-2.5">
            {itemsList.map((item) => {
              const assignedLetter = answers[item.id];
              const isSelected = selectedItem?.id === item.id;
              const isCorrect = isSubmitted && assignedLetter === item.target_letter;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50 border-emerald-400'
                        : 'bg-rose-50 border-rose-400'
                      : isSelected
                      ? 'bg-amber-100/90 border-amber-500 ring-4 ring-amber-200 scale-102 shadow-md'
                      : assignedLetter
                      ? 'bg-white border-amber-300'
                      : 'bg-white border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                      {item.id}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-slate-900">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-xl text-xs font-black border ${
                      assignedLetter ? 'bg-amber-500 text-white border-amber-600' : 'bg-slate-100 text-slate-400 border-slate-200'
                    }`}>
                      {assignedLetter ? `Card ${assignedLetter}` : 'Select Picture'}
                    </div>

                    {assignedLetter && !isSubmitted && (
                      <button
                        onClick={(e) => handleClearMatch(item.id, e)}
                        className="text-slate-400 hover:text-rose-600 text-xs font-bold"
                      >
                        ✕
                      </button>
                    )}

                    {isSubmitted && (
                      isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <div className="flex items-center gap-1">
                          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                          <span className="text-xs font-black text-rose-700">({item.target_letter})</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 8 Shuffled Picture Cards (A to H) */}
        <div className="lg:col-span-7 space-y-3 bg-amber-50/60 p-4 sm:p-5 rounded-3xl border-2 border-amber-200">
          <div className="flex items-center justify-between pb-2 border-b border-amber-200">
            <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <Grid size={15} /> 8 Picture Cards A-H (Click card to match):
            </span>
            <span className="text-[10px] font-bold text-amber-700">
              {selectedItem ? `Matching: ${selectedItem.name}` : 'Click item on left first'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {pictureCards.map((card) => {
              const matchedItem = itemsList.find(i => answers[i.id] === card.letter);

              return (
                <button
                  key={card.letter}
                  disabled={isSubmitted}
                  onClick={() => handleMatchCard(card)}
                  className={`p-2.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between shadow-sm relative group overflow-hidden ${
                    matchedItem
                      ? 'bg-white border-amber-500 ring-2 ring-amber-300'
                      : selectedItem
                      ? 'bg-white border-amber-300 hover:border-amber-500 hover:scale-105'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                      {card.letter}
                    </span>
                    {matchedItem && (
                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-950 font-black text-[9px] rounded-md truncate max-w-[70px]">
                        Item #{matchedItem.id}
                      </span>
                    )}
                  </div>

                  <div className="w-full h-20 bg-slate-100 rounded-xl overflow-hidden mb-1.5 border border-slate-200">
                    <img src={card.image_url} alt={card.name} className="w-full h-full object-cover" />
                  </div>

                  <span className="text-[10px] font-bold text-slate-800 line-clamp-1">
                    {card.name}
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
    </div>
  );
}

export default VisualMatchingAH;
