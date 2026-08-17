import React, { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, Layers, Grid, Volume2 } from 'lucide-react';
import VoiceService from '../../services/voiceService';
import { learnerProgressService } from '../../services/learnerProgressService';
import { srsService } from '../../services/srsService';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import CompletionModal from '../common/CompletionModal';

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
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const fullPassageScript = "Teacher: Hello Jake! I am writing our school safety report about yesterday. Can you tell me where all the items were found?\nJake: Of course, Mrs. Wilson! I remember everything clearly.\nTeacher: First, where was the clean bandage kept? Was it inside the headmaster's office?\nJake: No, not there! The school nurse keeps the clean bandage inside the white medical cabinet in the nurse room.\nTeacher: Excellent. And what about the cold pack for Tom's knee? Did someone leave it on the science lab desk?\nJake: No, the nurse placed the cold pack on the first aid table near the corridor entrance so it was ready to use.\nTeacher: Right. And where was Tom's science notebook? I know he was looking for it everywhere.\nJake: He thought he lost it on the playground bench, but actually his notebook was sitting right on the lab desk in the science room.\nTeacher: Ah, that is a relief! Now, what about the glass of orange juice that someone brought for Tom?\nJake: Nobody took it outside! The fresh orange juice was placed on the cafeteria counter in the school canteen.\nTeacher: And what about Tom's alarm clock? Was that left in the corridor locker?\nJake: Haha, no! Tom told me his alarm clock was on his bedroom table at home. He woke up late that morning!";

  // Default Listening Part 3 Visual Matching Data
  const itemsList = customData?.items || [
    { 
      id: 1, 
      name: 'Clean Bandage', 
      target_letter: 'A', 
      audio_url: '/audio/week33/listening_p3_item1.mp3',
      audio_text: "Teacher: Where was the clean bandage kept? Was it inside the headmaster's office?\nJake: No, not there! The school nurse keeps the clean bandage inside the white medical cabinet in the nurse room." 
    },
    { 
      id: 2, 
      name: 'Cold Pack', 
      target_letter: 'B', 
      audio_url: '/audio/week33/listening_p3_item2.mp3',
      audio_text: "Teacher: What about the cold pack for Tom's knee? Did someone leave it on the science lab desk?\nJake: No, the nurse placed the cold pack on the first aid table near the corridor entrance so it was ready to use." 
    },
    { 
      id: 3, 
      name: 'Science Notebook', 
      target_letter: 'C', 
      audio_url: '/audio/week33/listening_p3_item3.mp3',
      audio_text: "Teacher: And where was Tom's science notebook? I know he was looking for it everywhere.\nJake: He thought he lost it on the playground bench, but actually his notebook was sitting right on the lab desk in the science room." 
    },
    { 
      id: 4, 
      name: 'Orange Juice', 
      target_letter: 'D', 
      audio_url: '/audio/week33/listening_p3_item4.mp3',
      audio_text: "Teacher: What about the glass of orange juice that someone brought for Tom?\nJake: Nobody took it outside! The fresh orange juice was placed on the cafeteria counter in the school canteen." 
    },
    { 
      id: 5, 
      name: 'Alarm Clock', 
      target_letter: 'E', 
      audio_url: '/audio/week33/listening_p3_item5.mp3',
      audio_text: "Teacher: And what about Tom's alarm clock? Was that left in the corridor locker?\nJake: Haha, no! Tom told me his alarm clock was on his bedroom table at home. He woke up late that morning!" 
    }
  ];

  // Fisher-Yates Shuffle 8 Picture Cards (A to H — School Locations)
  const pictureCards = useMemo(() => {
    const rawCards = customData?.cards || [
      { letter: 'A', name: 'Medical Cabinet (Nurse Room)', location_name: 'Medical Cabinet', image_url: '/images/week33/nurse_cabinet.jpg' },
      { letter: 'B', name: 'First Aid Table', location_name: 'First Aid Table', image_url: '/images/week33/card_b_first_aid_table.jpg' },
      { letter: 'C', name: 'Science Lab Desk', location_name: 'Science Lab Desk', image_url: '/images/week33/lab_desk.jpg' },
      { letter: 'D', name: 'Cafeteria Counter', location_name: 'Cafeteria Counter', image_url: '/images/week33/cafeteria.jpg' },
      { letter: 'E', name: 'Bedroom Table (Home)', location_name: 'Bedroom Table', image_url: '/images/week33/bedroom_table.jpg' },
      { letter: 'F', name: 'Corridor Safety Locker', location_name: 'Corridor Locker', image_url: '/images/week33/corridor.jpg' },
      { letter: 'G', name: 'Headmaster Office Desk', location_name: 'Headmaster Office', image_url: '/images/week33/card_g_headmaster_office.jpg' },
      { letter: 'H', name: 'Playground Bench', location_name: 'Playground Bench', image_url: '/images/week33/card_h_playground_bench.jpg' }
    ];
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
    <div className="w-full max-w-5xl mx-auto my-4 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <span className="px-3 py-1 bg-amber-100 text-amber-900 text-[11px] font-black rounded-full uppercase tracking-wider">
            🔍 ITEM HUNT MISSION
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Match 5 Items to the Correct Picture Cards (A to H)
          </h2>
        </div>
        <span className="px-3.5 py-1.5 bg-slate-100 text-slate-700 text-xs font-black rounded-xl border border-slate-200">
          5 Items · 8 Shuffled Picture Cards
        </span>
      </div>

      {/* Master Audio Player Bar */}
      <div className="bg-gradient-to-r from-amber-500 to-indigo-600 p-4 rounded-2xl text-white shadow-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => VoiceService.speak(
              customData?.passage_audio_script || fullPassageScript,
              'questions',
              '/audio/week33/listening_p3_full.mp3',
              33
            )}
            className="p-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 transition shadow-md shrink-0 active:scale-95"
          >
            <Volume2 size={18} /> Play Full Listening Passage Audio 🎧
          </button>
          <div>
            <div className="text-[10px] font-black text-amber-200 uppercase tracking-widest">Listening Passage Audio Script:</div>
            <p className="text-xs font-bold text-white italic">"Listen to Jake talking to his teacher about where different items were placed..."</p>
          </div>
        </div>
      </div>

      {/* Main Split Grid: Left 5 Object Items vs Right 8 Picture Cards A-H */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 5 Object Items */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers size={15} className="text-amber-600" /> 5 Object Items (Select an item to match):
          </div>

          <div className="space-y-3">
            {itemsList.map((item) => {
              const assignedLetter = answers[item.id];
              const isSelected = selectedItem?.id === item.id;
              const isCorrect = isSubmitted && assignedLetter === item.target_letter;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50 border-emerald-400'
                        : 'bg-rose-50 border-rose-400'
                      : isSelected
                      ? 'bg-amber-100/90 border-amber-500 ring-4 ring-amber-200 scale-102 shadow-md'
                      : assignedLetter
                      ? 'bg-white border-amber-300 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-amber-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                        {item.id}
                      </span>
                      <div>
                        <span className="text-sm font-black text-slate-900 block leading-tight">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 block mt-0.5">
                          {item.audio_text}
                        </span>
                      </div>
                    </div>

                    {isSubmitted && (
                      <div className="ml-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : (
                          <div className="flex items-center gap-1">
                            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                            <span className="text-xs font-black text-rose-700">({item.target_letter})</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Vertical Status Pill Container */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <div className={`px-3 py-1 rounded-xl text-xs font-black border flex items-center gap-1.5 ${
                      assignedLetter ? 'bg-amber-500 text-white border-amber-600 shadow-sm' : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      <span className="text-[10px] uppercase opacity-75 font-bold">Matched:</span>
                      <span>{assignedLetter ? `Card ${assignedLetter}` : 'Select Picture 👇'}</span>
                    </div>

                    {assignedLetter && !isSubmitted && (
                      <button
                        onClick={(e) => handleClearMatch(item.id, e)}
                        className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-lg border border-rose-200"
                      >
                        Clear ✕
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 8 Shuffled Picture Cards A-H (2 Columns Grid Layout) */}
        <div className="lg:col-span-7 space-y-3 bg-amber-50/60 p-4 sm:p-5 rounded-3xl border-2 border-amber-200">
          <div className="flex items-center justify-between pb-2 border-b border-amber-200">
            <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <Grid size={15} /> 8 School Location Cards A-H (2 Columns Layout):
            </span>
            <span className="text-[10px] font-bold text-amber-700">
              {selectedItem ? `Matching: ${selectedItem.name}` : 'Click item on left first'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pictureCards.map((card) => {
              const matchedItem = itemsList.find(i => answers[i.id] === card.letter);

              return (
                <button
                  key={card.letter}
                  disabled={isSubmitted}
                  onClick={() => handleMatchCard(card)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between shadow-sm relative group overflow-hidden ${
                    matchedItem
                      ? 'bg-white border-amber-500 ring-2 ring-amber-300'
                      : selectedItem
                      ? 'bg-white border-amber-300 hover:border-amber-500 hover:scale-105'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span className="w-7 h-7 rounded-lg bg-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                      {card.letter}
                    </span>
                    {matchedItem && (
                      <span className="px-2 py-0.5 bg-amber-500 text-white font-black text-[10px] rounded-md truncate max-w-[120px] shadow-sm">
                        🎯 {matchedItem.name}
                      </span>
                    )}
                  </div>

                  <div className="w-full h-36 sm:h-40 bg-slate-100 rounded-xl overflow-hidden mb-2 border border-slate-200 relative shadow-inner">
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
                  <span className="text-xs font-black text-slate-800 block text-center leading-tight py-1">
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
