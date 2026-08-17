import React, { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, MessageSquare, ListFilter } from 'lucide-react';
import HoverWord, { renderParsedText } from '../common/HoverWord';

function shuffleArray(array) {
  if (!Array.isArray(array)) return [];
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function DialogueAHCompleter({ customData, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [selectedGap, setSelectedGap] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  // Fisher-Yates Shuffle A-H Options and dynamically assign keys A to H
  const { ahOptions, targetKeyMap } = useMemo(() => {
    const rawOptions = customData?.options || [
      { id: "opt_1", text: "Yes, I was walking carefully down the corridor when Tom slipped on the wet floor.", for_gap: 1 },
      { id: "opt_2", text: "Yes, he lost his balance on the wet tiles and hurt his knee quite badly.", for_gap: 2 },
      { id: "opt_3", text: "I stopped immediately and ran to call the school nurse for help.", for_gap: 3 },
      { id: "opt_4", text: "She placed a cold pack on his knee and wrapped it gently with a clean bandage.", for_gap: 4 },
      { id: "opt_5", text: "Yes, he was very pleased that I followed all school safety rules.", for_gap: 5 },
      { id: "opt_6", text: "I usually eat lunch with my classmates in the school cafeteria.", for_gap: null },
      { id: "opt_7", text: "The yellow warning sign is placed next to the classroom entrance.", for_gap: null },
      { id: "opt_8", text: "We have our science experiment every Tuesday morning at nine.", for_gap: null }
    ];

    const shuffled = shuffleArray(rawOptions);
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const keyMap = {};
    const formatted = shuffled.map((opt, idx) => {
      const key = letters[idx];
      if (opt.for_gap) keyMap[opt.for_gap] = key;
      return { key, text: opt.text, id: opt.id };
    });

    return { ahOptions: formatted, targetKeyMap: keyMap };
  }, [customData, shuffleSeed]);

  // Dynamically map target keys for the 5 dialogue gaps
  const dialogueExchanges = useMemo(() => {
    const rawDialogue = customData?.dialogue || [
      { gap_id: 1, speaker_a: "Harry", speaker_b: "Jake", text_a: "Hi Jake! Did you see what happened in the corridor after science class today?" },
      { gap_id: 2, speaker_a: "Harry", speaker_b: "Jake", text_a: "Oh no! Did Tom hurt himself badly when he fell down?" },
      { gap_id: 3, speaker_a: "Harry", speaker_b: "Jake", text_a: "What did you do right away to help him?" },
      { gap_id: 4, speaker_a: "Harry", speaker_b: "Jake", text_a: "How did the school nurse treat Tom's injured knee?" },
      { gap_id: 5, speaker_a: "Harry", speaker_b: "Jake", text_a: "The headmaster praised you during assembly, didn't he?" }
    ];

    return rawDialogue.map((ex) => ({
      ...ex,
      target: targetKeyMap[ex.gap_id] || "A"
    }));
  }, [customData, targetKeyMap]);


  // Map option keys to the gap they are currently assigned to
  const optionToGapMap = {};
  Object.entries(answers).forEach(([gapId, optKey]) => {
    if (optKey) optionToGapMap[optKey] = gapId;
  });

  const handleSelectOption = (optKey) => {
    if (isSubmitted) return;
    if (selectedGap) {
      setAnswers({ ...answers, [selectedGap]: optKey });
      // Auto-advance to next unfilled gap
      const nextGap = [1, 2, 3, 4, 5].find(g => g > selectedGap && !answers[g]);
      if (nextGap) setSelectedGap(nextGap);
    }
  };

  const handleClearGapSlot = (gapId, e) => {
    e.stopPropagation();
    if (isSubmitted) return;
    const newAns = { ...answers };
    delete newAns[gapId];
    setAnswers(newAns);
  };

  const handleCheck = () => {
    let correct = 0;
    dialogueExchanges.forEach((ex) => {
      if (answers[ex.gap_id] === ex.target) {
        correct++;
      }
    });
    const finalScore = Math.round((correct / dialogueExchanges.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    if (onComplete) onComplete(finalScore);
  };

  const handleReset = () => {
    setAnswers({});
    setSelectedGap(1);
    setIsSubmitted(false);
    setScore(null);
    setShuffleSeed((prev) => prev + 1);
  };


  return (
    <div className="w-full max-w-5xl mx-auto my-4 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <span className="px-3 py-1 bg-purple-100 text-purple-900 text-[11px] font-black rounded-full uppercase tracking-wider">
            💬 CHAT BOX CHALLENGE
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Continuous Dialogue A-H Completer
          </h2>
        </div>
        <span className="px-3.5 py-1.5 bg-slate-100 text-slate-700 text-xs font-black rounded-xl border border-slate-200">
          5 Dialogue Gaps · 8 Options Drawer (A-H)
        </span>
      </div>

      {/* Main Split Grid: Left Dialogue Gaps (5) vs Right A-H Options Drawer (8) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 5-Exchange Continuous Dialogue */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare size={15} className="text-purple-600" /> {customData?.title || "Dialogue Passage (Cambridge Part 2):"}
          </div>

          <div className="space-y-3.5">
            {dialogueExchanges.map((ex) => {
              const assignedOptKey = answers[ex.gap_id];
              const assignedOpt = ahOptions.find(o => o.key === assignedOptKey);
              const isSelectedGap = selectedGap === ex.gap_id;
              const isCorrect = isSubmitted && assignedOptKey === ex.target;

              return (
                <div key={ex.gap_id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
                  {/* Speaker A Question */}
                  <div className="flex items-start gap-2.5">
                    <span className="px-2.5 py-0.5 bg-indigo-600 text-white font-black text-[10px] rounded-md uppercase shrink-0 mt-0.5">
                      {ex.speaker_a || "Speaker A"}
                    </span>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                      "{renderParsedText(ex.text_a, 'indigo')}"
                    </div>
                  </div>

                  {/* Speaker B Answer Slot */}
                  <div
                    onClick={() => !isSubmitted && setSelectedGap(ex.gap_id)}
                    className={`p-3 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                      isSubmitted
                        ? isCorrect
                          ? 'bg-emerald-50 border-emerald-300'
                          : 'bg-rose-50 border-rose-300'
                        : isSelectedGap
                        ? 'bg-purple-100/80 border-purple-500 ring-2 ring-purple-200'
                        : assignedOptKey
                        ? 'bg-white border-purple-300'
                        : 'bg-white border-dashed border-slate-300 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="px-2 py-0.5 bg-purple-200 text-purple-950 font-black text-[10px] rounded-md shrink-0">
                        {ex.speaker_b || "Speaker B"} [{ex.gap_id}]
                      </span>
                      {assignedOpt ? (
                        <div className="text-xs font-bold text-slate-900 truncate">
                          <b className="text-purple-700 mr-1.5">({assignedOpt.key})</b> {renderParsedText(assignedOpt.text, 'purple')}
                        </div>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400 italic">
                          Click to select Gap [{ex.gap_id}], then choose A-H on the right...
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      {assignedOpt && !isSubmitted && (
                        <button
                          onClick={(e) => handleClearGapSlot(ex.gap_id, e)}
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
                            <span className="text-xs font-black text-rose-700">({ex.target})</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 8 Options Drawer Panel (A-H) */}
        <div className="lg:col-span-5 space-y-3 bg-purple-50/70 p-4 sm:p-5 rounded-2xl border-2 border-purple-200 h-fit">
          <div className="flex items-center justify-between pb-2 border-b border-purple-200">
            <span className="text-xs font-black text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
              <ListFilter size={15} /> A-H Answers Drawer:
            </span>
            <span className="text-[10px] font-bold text-purple-700">
              {selectedGap ? `Filling Gap [${selectedGap}]` : 'Select a gap'}
            </span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {ahOptions.map((opt) => {
              const assignedGapId = optionToGapMap[opt.key];
              const isUsed = Boolean(assignedGapId);

              return (
                <button
                  key={opt.key}
                  disabled={isSubmitted || isUsed}
                  onClick={() => handleSelectOption(opt.key)}
                  className={`w-full p-3 rounded-xl text-left text-xs font-bold transition-all flex items-start gap-2.5 border shadow-sm ${
                    isUsed
                      ? 'opacity-40 line-through bg-slate-200 text-slate-500 border-slate-300 cursor-not-allowed'
                      : 'bg-white text-slate-900 border-purple-200 hover:border-purple-500 hover:bg-purple-100/50'
                  }`}
                >
                  <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    {opt.key}
                  </span>
                  <div className="flex-1">
                    <div className="leading-snug">{renderParsedText(opt.text, 'indigo', null, true)}</div>
                    {isUsed && (
                      <span className="text-[10px] font-mono text-purple-800 font-extrabold block mt-0.5">
                        [Used in Gap {assignedGapId}]
                      </span>
                    )}
                  </div>
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
            className="w-full sm:w-auto px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-black text-sm rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles size={18} /> Check Dialogue Answers
          </button>
        ) : (
          <div className="w-full flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600 animate-bounce" />
              <span className="text-lg font-black text-slate-900">
                Dialogue Score: {score}%
              </span>
            </div>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DialogueAHCompleter;
