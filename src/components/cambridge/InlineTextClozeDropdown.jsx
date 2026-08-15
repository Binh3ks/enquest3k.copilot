import React, { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, BookOpen, ChevronDown } from 'lucide-react';

function shuffleArray(array) {
  if (!Array.isArray(array)) return [];
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function InlineTextClozeDropdown({ customData, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [activeGapPopover, setActiveGapPopover] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  // Fisher-Yates Shuffle 3 options per inline gap popover
  const gapsData = useMemo(() => {
    const rawGaps = customData?.gaps || [
      { id: 1, target: "slipped", options: ["slipped", "slipping", "slips"] },
      { id: 2, target: "fell", options: ["fell", "fallen", "falling"] },
      { id: 3, target: "carefully", options: ["carefully", "careful", "care"] },
      { id: 4, target: "called", options: ["called", "calling", "calls"] },
      { id: 5, target: "bandage", options: ["bandage", "bandaged", "bandaging"] },
      { id: 6, target: "nurse", options: ["nurse", "doctor", "teacher"] },
      { id: 7, target: "corridor", options: ["corridor", "playground", "library"] },
      { id: 8, target: "praised", options: ["praised", "praise", "praising"] },
      { id: 9, target: "without", options: ["without", "with", "within"] },
      { id: 10, target: "relieved", options: ["relieved", "relief", "relieving"] }
    ];

    return rawGaps.map((g) => ({
      ...g,
      options: shuffleArray(g.options)
    }));
  }, [customData, shuffleSeed]);

  // Fisher-Yates Shuffle Story Title choices
  const titleOptions = useMemo(() => {
    const rawTitles = customData?.title_options || [
      { id: 1, title: "A Dangerous Run Near the Science Room", target: false },
      { id: 2, title: "Jake's Responsible Action in the School Corridor", target: true },
      { id: 3, title: "How Teachers Clean Science Experiments", target: false }
    ];
    return shuffleArray(rawTitles);
  }, [customData, shuffleSeed]);


  const storySegments = [
    { type: 'text', content: "Jake was walking " },
    { type: 'gap', gapId: 3 },
    { type: 'text', content: " down the main school " },
    { type: 'gap', gapId: 7 },
    { type: 'text', content: " after his science class. Suddenly, a boy running fast " },
    { type: 'gap', gapId: 1 },
    { type: 'text', content: " on the wet tiles and " },
    { type: 'gap', gapId: 2 },
    { type: 'text', content: " heavily to the ground. " },
    { type: 'gap', gapId: 9 },
    { type: 'text', content: " hesitation, Jake stopped immediately and " },
    { type: 'gap', gapId: 4 },
    { type: 'text', content: " the school " },
    { type: 'gap', gapId: 6 },
    { type: 'text', content: ". The medical worker arrived quickly with a clean " },
    { type: 'gap', gapId: 5 },
    { type: 'text', content: " and treated his knee gently. The headmaster later " },
    { type: 'gap', gapId: 8 },
    { type: 'text', content: " Jake for following all safety rules, and everyone felt " },
    { type: 'gap', gapId: 10 },
    { type: 'text', content: " that the injured boy was safe." }
  ];

  const handleOptionSelect = (gapId, option) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [gapId]: option });
    setActiveGapPopover(null);
  };

  const handleCheck = () => {
    let correctGaps = 0;
    gapsData.forEach((gap) => {
      if (answers[gap.id] === gap.target) correctGaps++;
    });
    const titleCorrect = selectedTitle === titleOptions.find(t => t.target)?.id;
    const totalCorrect = correctGaps + (titleCorrect ? 1 : 0);
    const finalScore = Math.round((totalCorrect / (gapsData.length + 1)) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    if (onComplete) onComplete(finalScore);
  };

  const handleReset = () => {
    setAnswers({});
    setSelectedTitle(null);
    setActiveGapPopover(null);
    setIsSubmitted(false);
    setScore(null);
    setShuffleSeed((prev) => prev + 1);
  };


  return (
    <div className="w-full max-w-4xl mx-auto my-4 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-[11px] font-black rounded-full uppercase tracking-wider">
            📝 FILL THE BLANKS CHALLENGE
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Inline Text Cloze Dropdown (10 Gaps + Story Title)
          </h2>
        </div>
        <span className="px-3.5 py-1.5 bg-slate-100 text-slate-700 text-xs font-black rounded-xl border border-slate-200">
          10 Inline Gaps · 3 Multiple Choice Popover
        </span>
      </div>

      {/* 📖 Continuous Story Text with 10 Popover Dropdown Gaps */}
      <div className="p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200 shadow-inner leading-loose text-slate-900 font-serif text-base sm:text-lg relative">
        {storySegments.map((seg, idx) => {
          if (seg.type === 'text') {
            return <span key={idx}>{seg.content}</span>;
          }

          const gap = gapsData.find(g => g.id === seg.gapId);
          const chosen = answers[seg.gapId];
          const isCorrect = isSubmitted && chosen === gap.target;
          const isPopoverOpen = activeGapPopover === seg.gapId;

          return (
            <span key={idx} className="relative inline-block mx-1">
              <button
                disabled={isSubmitted}
                onClick={() => setActiveGapPopover(isPopoverOpen ? null : seg.gapId)}
                className={`px-3 py-1 rounded-xl font-sans font-black text-xs sm:text-sm border-2 transition-all inline-flex items-center gap-1 shadow-sm ${
                  isSubmitted
                    ? isCorrect
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                      : 'bg-rose-100 border-rose-500 text-rose-950'
                    : chosen
                    ? 'bg-emerald-600 text-white border-emerald-700'
                    : 'bg-white border-emerald-500 text-emerald-800 hover:bg-emerald-50 animate-pulse'
                }`}
              >
                <span>{chosen ? `[${seg.gapId}] ${chosen}` : `____[${seg.gapId}]____`}</span>
                {!isSubmitted && <ChevronDown size={14} />}
              </button>

              {/* Inline Popover Menu (3 Multiple Choice Options) */}
              {isPopoverOpen && !isSubmitted && (
                <div className="absolute left-0 top-full mt-1 z-30 w-44 p-2 bg-white rounded-2xl border-2 border-emerald-400 shadow-2xl space-y-1 font-sans animate-in fade-in zoom-in-95">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 py-0.5">
                    Select Option for [{seg.gapId}]:
                  </div>
                  {gap.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOptionSelect(seg.gapId, opt)}
                      className={`w-full px-3 py-1.5 rounded-xl text-xs font-bold text-left transition ${
                        chosen === opt
                          ? 'bg-emerald-600 text-white font-black'
                          : 'text-slate-800 hover:bg-emerald-50 hover:text-emerald-900'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </span>
          );
        })}
      </div>

      {/* 🏷️ Nova's Story Title Selection */}
      <div className="p-5 bg-emerald-50/70 rounded-2xl border-2 border-emerald-200 space-y-3 font-sans">
        <span className="text-xs font-black text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
          <BookOpen size={16} /> Choose the best title for the story:
        </span>
        <div className="space-y-2">
          {titleOptions.map((opt) => {
            const isSelected = selectedTitle === opt.id;
            const isTarget = opt.target;
            const isCorrect = isSubmitted && isSelected && isTarget;

            return (
              <button
                key={opt.id}
                disabled={isSubmitted}
                onClick={() => setSelectedTitle(opt.id)}
                className={`w-full p-3 rounded-xl text-left text-xs font-black transition flex items-center justify-between border shadow-sm ${
                  isSubmitted
                    ? isTarget
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : isSelected
                      ? 'bg-rose-100 text-rose-950 border-rose-400'
                      : 'bg-white text-slate-500 border-slate-200'
                    : isSelected
                    ? 'bg-emerald-600 text-white border-emerald-700 ring-4 ring-emerald-200'
                    : 'bg-white text-slate-800 border-slate-300 hover:border-emerald-400 hover:bg-emerald-50'
                }`}
              >
                <span>{opt.id}. {opt.title}</span>
                {isSubmitted && (
                  isTarget ? <CheckCircle2 size={16} className="text-white" /> : isSelected && <AlertCircle size={16} className="text-rose-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Check & Score */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between font-sans">
        {!isSubmitted ? (
          <button
            onClick={handleCheck}
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles size={18} /> Check Inline Cloze Answers
          </button>
        ) : (
          <div className="w-full flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-600 animate-bounce" />
              <span className="text-lg font-black text-slate-900">
                Inline Cloze Score: {score}%
              </span>
            </div>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InlineTextClozeDropdown;
