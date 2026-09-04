import React, { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, BookOpen, Search, HelpCircle, Type } from 'lucide-react';
import HoverWord, { renderParsedText } from '../common/HoverWord';
import CompletionModal from '../common/CompletionModal';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { useUserStore } from '../../stores/useUserStore';

export function TextExtractionCompleter({ customData, data: propData, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [activeParagraph, setActiveParagraph] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const activeData = customData || propData || {};

  // Normalize Story Passage
  const storyPassage = useMemo(() => {
    if (activeData?.story && activeData.story.paragraphs) {
      return activeData.story;
    }
    if (activeData?.story_text) {
      const paragraphs = activeData.story_text
        .split('\n\n')
        .filter(Boolean)
        .map((p, idx) => ({ id: idx + 1, text: p.trim() }));

      return {
        title: activeData.title || "Reading Story Comprehension",
        paragraphs: paragraphs.length > 0 ? paragraphs : [{ id: 1, text: activeData.story_text }]
      };
    }
    return {
      title: activeData?.title || "Story Passage",
      paragraphs: [{ id: 1, text: "" }]
    };
  }, [activeData]);

function levenshteinDistance(s1, s2) {
  if (!s1 || !s2) return Math.max((s1 || '').length, (s2 || '').length);
  const track = Array(s2.length + 1).fill(null).map(() =>
    Array(s1.length + 1).fill(null));
  for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
  for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;
  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }
  return track[s2.length][s1.length];
}

  // Normalize Summary Sentences
  const summarySentences = useMemo(() => {
    if (activeData?.summary_sentences && Array.isArray(activeData.summary_sentences)) {
      return activeData.summary_sentences;
    }
    if (activeData?.questions && Array.isArray(activeData.questions)) {
      return activeData.questions.map((q, idx) => {
        const rawPrompt = q.prompt || '';
        const hasGap = rawPrompt.includes('___');
        const parts = hasGap ? rawPrompt.split('___') : [rawPrompt, ''];
        return {
          id: q.id || `q${idx + 1}`,
          prompt: rawPrompt,
          text_before: parts[0] || rawPrompt,
          text_after: parts[1] || '',
          hasGap,
          target: q.answer || q.target || '',
          paragraph_ref: 1
        };
      });
    }
    return [];
  }, [activeData]);

  // Helper to normalize string: trim spaces, lowercase, strip punctuation & leading articles (a, an, the)
  const normalizeText = (str) => {
    if (!str) return '';
    return str
      .trim()
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Strip punctuation
      .replace(/^(the|a|an)\s+/, '') // Strip optional leading articles
      .replace(/\s+/g, ' '); // Collapse multiple spaces
  };

  const handleInputChange = (sentId, text) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [sentId]: text });
  };

  const handleCheck = () => {
    let correct = 0;
    summarySentences.forEach((sent) => {
      const userNorm = normalizeText(answers[sent.id] || '');
      const targetNorm = normalizeText(sent.target);
      const altNorm = sent.alt_target ? normalizeText(sent.alt_target) : '';

      // Match normalized exact target, Levenshtein distance <= 2, or inclusion
      const isLevenshteinMatch = userNorm && targetNorm && levenshteinDistance(userNorm, targetNorm) <= 2;
      const isExactOrAlt = userNorm && (userNorm === targetNorm || (altNorm && userNorm === altNorm));
      const isInclusion = userNorm && userNorm.length >= 3 && (targetNorm.includes(userNorm) || userNorm.includes(targetNorm));

      if (isExactOrAlt || isLevenshteinMatch || isInclusion) {
        correct++;
      }
    });
    const finalScore = Math.round((correct / summarySentences.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);

    if (finalScore >= 70) {
      fireCelebrationConfetti('StoryDetective_Complete');
    }

    if (onComplete) onComplete(finalScore);
  };


  const handleReset = () => {
    setAnswers({});
    setActiveParagraph(null);
    setIsSubmitted(false);
    setScore(null);
  };

  const starsEarned = (score || 0) >= 80 ? 3 : (score || 0) >= 60 ? 2 : 1;

  return (
    <div className="w-full max-w-5xl mx-auto my-4 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans space-y-6">
      <CompletionModal
        isOpen={isSubmitted && (score || 0) >= 50}
        onClose={() => {}}
        score={score || 0}
        stars={starsEarned}
        xpEarned={50}
        srsWordsAdded={7}
        activityTitle="Story Detective Mission (R&W Part 5)"
      />
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <span className="px-3 py-1 bg-amber-100 text-amber-900 text-[11px] font-black rounded-full uppercase tracking-wider">
            Flyers Practice
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Story Text Extraction
          </h2>
          <p className="text-xs text-amber-700 font-bold mt-0.5">
            Look at the picture and read the story. Write some words to complete the sentences. You can use 1, 2, 3 or 4 words.
          </p>
        </div>
        <span className="px-3.5 py-1.5 bg-slate-100 text-slate-700 text-xs font-black rounded-xl border border-slate-200">
          7 Summary Sentences · 1-4 Words Input
        </span>
      </div>

      {/* Split Screen Grid: Left Story Passage vs Right Summary Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Full Reading Story Passage */}
        <div className="lg:col-span-6 space-y-4">
          <div className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen size={15} className="text-amber-600" /> Story Passage: {storyPassage.title}
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {storyPassage.paragraphs.map((p) => {
              const isHighlighted = activeParagraph === p.id;

              return (
                <div
                  key={p.id}
                  className={`p-3 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all leading-relaxed font-serif text-xs sm:text-base text-slate-900 ${
                    isHighlighted
                      ? 'bg-amber-100/90 border-amber-500 shadow-md ring-2 ring-amber-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="text-[10px] font-mono font-black text-amber-800 block mb-1">
                    Paragraph {p.id}
                  </span>
                  <div className="leading-relaxed font-sans text-sm sm:text-base text-slate-900">
                    {renderParsedText(p.text, 'amber')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 7 Summary Sentences Form (1-4 Words Input) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Type size={15} className="text-amber-600" /> Complete 7 Sentences (1-4 Words):
            </span>
            <span className="text-[10px] font-bold text-amber-700">Max 4 words per blank</span>
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {/* Worked Example Row */}
            <div
              data-testid="example-row"
              className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border-2 border-amber-300 bg-amber-50/90 shadow-2xs space-y-1.5"
            >
              <div className="flex items-start gap-1.5">
                <span className="px-1.5 py-0.5 rounded-md bg-amber-500 text-white font-black text-[9.5px] uppercase tracking-wider shrink-0 mt-0.5 shadow-2xs">
                  ★ EXAMPLE
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                  {activeData?.example?.text_before || "Jake was walking in the "}
                  <span className="font-black text-amber-900 underline underline-offset-4">
                    {activeData?.example?.target || "corridor"}
                  </span>
                  {activeData?.example?.text_after || " after his class."}
                </p>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <input
                  type="text"
                  disabled={true}
                  value={activeData?.example?.target || "corridor"}
                  className="flex-1 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-100/70 font-black text-xs sm:text-sm text-amber-950 cursor-not-allowed"
                />
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
              </div>
            </div>

            {summarySentences.map((sent, idx) => {
              const userVal = answers[sent.id] || '';
              const wordCount = userVal.trim() ? userVal.trim().split(/\s+/).length : 0;
              const isOverLimit = wordCount > 4;
              const userAnsLower = userVal.trim().toLowerCase();
              const targetAnsLower = sent.target.toLowerCase();
              const isCorrect = isSubmitted && (userAnsLower === targetAnsLower || (userAnsLower && targetAnsLower.includes(userAnsLower)) || (userAnsLower && userAnsLower.includes(targetAnsLower)));

              return (
                <div
                  key={sent.id}
                  onFocus={() => setActiveParagraph(sent.paragraph_ref)}
                  onBlur={() => setActiveParagraph(null)}
                  className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border-2 transition-all space-y-1.5 ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50/80 border-emerald-300'
                        : 'bg-rose-50/80 border-rose-300'
                      : 'bg-white border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-md bg-amber-200 text-amber-950 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                      {sent.hasGap !== false ? (
                        <>
                          {sent.text_before}
                          <span className="font-black text-amber-800 underline underline-offset-4">____</span>
                          {sent.text_after}
                        </>
                      ) : (
                        <span>{sent.prompt}</span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        maxLength={40}
                        disabled={isSubmitted}
                        value={userVal}
                        onChange={(e) => handleInputChange(sent.id, e.target.value)}
                        placeholder="Type 1-4 words from story..."
                        className={`w-full px-3 py-2 rounded-xl border font-bold text-xs sm:text-sm text-slate-900 focus:outline-none transition ${
                          isOverLimit
                            ? 'border-rose-500 bg-rose-50 focus:ring-2 focus:ring-rose-200'
                            : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                        }`}
                      />
                      <span
                        className={`absolute right-2.5 top-2.5 text-[9px] font-mono font-bold ${
                          isOverLimit ? 'text-rose-600 font-black' : 'text-slate-400'
                        }`}
                      >
                        {wordCount}/4w
                      </span>
                    </div>

                    {isSubmitted && (
                      isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <div className="flex items-center gap-1 shrink-0">
                          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                          <span className="text-[11px] font-bold text-rose-700">({sent.target})</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
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
            className="w-full sm:w-auto px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-black text-sm rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles size={18} /> Check Story Extraction Answers
          </button>
        ) : (
          <div className="w-full flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-600 animate-bounce" />
              <span className="text-lg font-black text-slate-900">
                Extraction Score: {score}%
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

export default TextExtractionCompleter;
