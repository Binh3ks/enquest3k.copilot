import React, { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, BookOpen, ChevronDown } from 'lucide-react';
import HoverWord, { renderParsedText } from '../common/HoverWord';
import CompletionModal from '../common/CompletionModal';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
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

export function InlineTextClozeDropdown({ customData, data: propData, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [activeGapPopover, setActiveGapPopover] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  const activeData = customData || propData || {};

  // Construct gaps data from blanks, gaps or answers
  const gapsData = useMemo(() => {
    if (activeData?.blanks && Array.isArray(activeData.blanks)) {
      return activeData.blanks.map((b) => ({
        id: b.id,
        target: b.correct || b.target,
        options: b.options || [b.correct || b.target]
      }));
    }

    if (activeData?.gaps && Array.isArray(activeData.gaps)) {
      return activeData.gaps.map((g) => ({
        ...g,
        target: g.correct || g.target,
        options: g.options || [g.target]
      }));
    }

    if (activeData?.answers && typeof activeData.answers === 'object') {
      const bankWords = (activeData.word_bank || []).map(w => typeof w === 'string' ? w : w.word);
      return Object.entries(activeData.answers).map(([gapId, target]) => {
        const distractors = bankWords.filter(w => w !== target).slice(0, 2);
        const options = [target, ...distractors];
        return {
          id: parseInt(gapId, 10),
          target,
          options
        };
      });
    }

    return [];
  }, [activeData, shuffleSeed]);

  const exampleBlank = useMemo(() => {
    if (activeData?.example) {
      const blankId = activeData.example.blank !== undefined 
        ? activeData.example.blank 
        : (activeData.example.id !== undefined ? activeData.example.id : 0);
      return {
        id: blankId,
        target: activeData.example.correct || activeData.example.target || "forests",
        options: activeData.example.options || ["forests", "forest", "a forest"],
        isExample: true
      };
    }
    return null;
  }, [activeData]);

  // Fisher-Yates Shuffle Story Title choices
  const titleOptions = useMemo(() => {
    const rawTitles = activeData?.title_options || [
      { id: 1, title: activeData?.title || "Story Cloze Activity", target: true }
    ];
    return shuffleArray(rawTitles);
  }, [activeData, shuffleSeed]);

  const storySegments = useMemo(() => {
    const rawTemplate = activeData?.text_template || activeData?.story_template || activeData?.story || "";
    if (rawTemplate) {
      const parts = [];
      const regex = /\[(\d+)\](?:_{1,})?/g;
      let lastIndex = 0;
      let match;
      while ((match = regex.exec(rawTemplate)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ type: 'text', content: rawTemplate.slice(lastIndex, match.index) });
        }
        parts.push({ type: 'gap', gapId: parseInt(match[1], 10) });
        lastIndex = regex.lastIndex;
      }
      if (lastIndex < rawTemplate.length) {
        parts.push({ type: 'text', content: rawTemplate.slice(lastIndex) });
      }
      if (parts.length > 0) return parts;
    }
    return [];
  }, [activeData]);

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

    if (finalScore >= 75) {
      fireCelebrationConfetti('Cloze_Dropdown_Complete');
    }
    const userStore = useUserStore?.getState ? useUserStore.getState() : null;
    if (userStore?.addXP) userStore.addXP(50);

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

  const starsEarned = (score || 0) >= 80 ? 3 : (score || 0) >= 60 ? 2 : 1;

  return (
    <div className="w-full max-w-4xl mx-auto my-4 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans space-y-6">
      <CompletionModal
        isOpen={isSubmitted && (score || 0) >= 50}
        onClose={() => {}}
        score={score || 0}
        stars={starsEarned}
        xpEarned={50}
        srsWordsAdded={5}
        activityTitle="Fill the Blanks Challenge (R&W Part 4)"
      />
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-[11px] font-black rounded-full uppercase tracking-wider">
            Cambridge A2 Flyers — Reading & Writing Part 4
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Inline Text Cloze Dropdown
          </h2>
          <p className="text-xs text-emerald-700 font-bold mt-0.5">
            Read the text. Choose the right words and write them on the lines.
          </p>
        </div>
        <span className="px-3.5 py-1.5 bg-slate-100 text-slate-700 text-xs font-black rounded-xl border border-slate-200">
          10 Inline Gaps · 3 Multiple Choice Popover
        </span>
      </div>

      {/* Worked Example Card */}
      <div
        data-testid="example-row"
        className="p-3.5 bg-amber-50/90 rounded-2xl border-2 border-amber-300 shadow-2xs flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-white font-black text-[10px] uppercase tracking-wider shadow-2xs">
            ★ EXAMPLE
          </span>
          <span className="text-xs font-black text-amber-950">
            Example Gap [{exampleBlank?.id || 1}]: &ldquo;{exampleBlank?.target || "forests"}&rdquo;
          </span>
          <span className="text-[11px] text-amber-800 italic font-medium">
            (Options: {(exampleBlank?.options || ["forests", "forest", "a forest"]).join(' / ')})
          </span>
        </div>
        <span className="px-2 py-0.5 bg-amber-200 text-amber-950 font-black text-[10px] rounded-lg uppercase">
          Pre-selected
        </span>
      </div>

      {/* 📖 Continuous Story Text with 10 Popover Dropdown Gaps */}
      <div className="p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200 shadow-inner leading-loose text-slate-900 font-serif text-base sm:text-lg relative">
        {storySegments.map((seg, idx) => {
          if (seg.type === 'text') {
            return <span key={idx}>{renderParsedText(seg.content, 'indigo')}</span>;
          }

          if (exampleBlank && seg.gapId === exampleBlank.id) {
            return (
              <span key={idx} className="inline-flex items-center px-2.5 py-0.5 mx-1 rounded-lg bg-amber-200 text-amber-950 font-sans font-black text-xs sm:text-sm border border-amber-300">
                ({exampleBlank.id}) {exampleBlank.target}
              </span>
            );
          }

          const gap = gapsData.find(g => g.id === seg.gapId);
          if (!gap) return null;
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
