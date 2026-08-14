import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, BookOpen, Layers, Type } from 'lucide-react';

export function TextExtractionCompleter({ customData, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [activeParagraph, setActiveParagraph] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  // Default Story Passage & 7 Summary Sentences (Cambridge Reading & Writing Part 5 Standard: 1-4 Words Input)
  const storyPassage = customData?.story || {
    title: "Jake's Quick Action in the School Corridor",
    paragraphs: [
      {
        id: 1,
        text: "On a bright Friday morning, Jake was walking carefully down the main school corridor after finishing his science class. Suddenly, he noticed another student running very fast past the science room. The floor was slippery because a cleaner had just washed the tiles."
      },
      {
        id: 2,
        text: "The running classmate lost his balance and fell down heavily near the stairs. Without hesitation, Jake stopped immediately and ran to call the school nurse. The nurse arrived within two minutes carrying a clean bandage and a cold pack to treat the boy's swollen knee."
      },
      {
        id: 3,
        text: "The headmaster praised Jake during assembly for following all school safety rules and helping his classmate responsibly. All the students felt relieved and promised to walk carefully down the corridor in the future."
      }
    ]
  };

  const summarySentences = customData?.summary_sentences || [
    { id: 1, text_before: "Jake was walking down the school corridor after his ", text_after: ".", target: "science class", paragraph_ref: 1 },
    { id: 2, text_before: "A classmate running fast lost his balance and slipped on the ", text_after: ".", target: "wet tiles", paragraph_ref: 1 },
    { id: 3, text_before: "Without hesitation, Jake stopped and quickly called the ", text_after: ".", target: "school nurse", paragraph_ref: 2 },
    { id: 4, text_before: "The nurse gently placed a clean ", text_after: " on the boy's knee.", target: "bandage", paragraph_ref: 2 },
    { id: 5, text_before: "A cold pack was used to reduce the swelling and ", text_after: ".", target: "knee pain", paragraph_ref: 2 },
    { id: 6, text_before: "The headmaster publicly praised Jake for remembering all ", text_after: ".", target: "safety rules", paragraph_ref: 3 },
    { id: 7, text_before: "All the students felt relieved and promised to walk ", text_after: " down the corridor.", target: "carefully", paragraph_ref: 3 }
  ];

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

      // Match normalized exact target or acceptable alternate target (with/without leading 'the', 'a', 'an')
      if (userNorm && (userNorm === targetNorm || (altNorm && userNorm === altNorm) || targetNorm.includes(userNorm) || userNorm.includes(targetNorm))) {
        correct++;
      }
    });
    const finalScore = Math.round((correct / summarySentences.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    if (onComplete) onComplete(finalScore);
  };


  const handleReset = () => {
    setAnswers({});
    setActiveParagraph(null);
    setIsSubmitted(false);
    setScore(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-4 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <span className="px-3 py-1 bg-amber-100 text-amber-900 text-[11px] font-black rounded-full uppercase tracking-wider">
            🕵️ STORY DETECTIVE MISSION
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Story Text Extraction (1 to 4 Words Limit)
          </h2>
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
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all leading-relaxed font-serif text-sm sm:text-base text-slate-900 ${
                    isHighlighted
                      ? 'bg-amber-100/90 border-amber-500 shadow-md ring-2 ring-amber-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="text-[10px] font-mono font-black text-amber-800 block mb-1">
                    Paragraph {p.id}
                  </span>
                  {p.text}
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
                  className={`p-3.5 rounded-2xl border-2 transition-all space-y-2 ${
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
                      {sent.text_before}
                      <span className="font-black text-amber-800 underline underline-offset-4">____</span>
                      {sent.text_after}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="relative flex-1">
                      <input
                        type="text"
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
