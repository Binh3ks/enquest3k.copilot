import React, { useState } from 'react';
import { learnerProgressService } from '../../../../services/learnerProgressService';
import { useUserStore } from '../../../../stores/useUserStore';
import HoverWord, { renderParsedText } from '../../../../components/common/HoverWord';
import { speakText } from '../../../../utils/AudioHelper';
import { CheckCircle2, ArrowRight, RefreshCw, FileText, XCircle, Volume2, Sparkles, Trophy } from 'lucide-react';
import CompletionModal from '../../../../components/common/CompletionModal';
import { fireCelebrationConfetti } from '../../../../utils/confettiHelper';


const FALLBACK_CHECK_QUESTIONS = [];

export function Station2CheckMode({ weekData, onFinishCheckMode, weekNumber = 33, customQuestions, isStealthMode = false }) {
  const currentUser = useUserStore((state) => state.currentUser);
  const learnerId = currentUser?.id || currentUser?.username || 'guest_01';

  const rawQuestions = (customQuestions || weekData?.listening_p4_questions || weekData?.stations?.listening_hub?.check_mode_drills || weekData?.check_mode_drills || FALLBACK_CHECK_QUESTIONS).map((q, qIdx) => ({
    ...q,
    content_id: q.content_id || q.id || `chk_q_${qIdx}`,
    type: q.type || (q.options?.some(o => o.image_url || o.image) ? 'listening_p4_picture' : 'grammar')
  }));
  
  // Parameterized Variant Transformation (Option B Pilot):
  // Shuffle options in Check Mode so rote position memory is 100% broken
  const [questions] = useState(() => {
    if (!isStealthMode) return rawQuestions;
    return rawQuestions.map((q, qIdx) => {
      const opts = [...q.options];
      // Rotate array based on question index
      const shift = (qIdx + 1) % opts.length;
      const rotated = [...opts.slice(shift), ...opts.slice(0, shift)];
      const reindexed = rotated.map((opt, idx) => ({
        ...opt,
        label: String.fromCharCode(65 + idx) // Re-assign A, B, C labels
      }));
      return { ...q, options: reindexed };
    });
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuestions, setSubmittedQuestions] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [resultsSummary, setResultsSummary] = useState(null);
  const [startTime] = useState(Date.now());

  const currentQ = questions[currentIndex] || questions[0];
  const isSubmitted = !!submittedQuestions[currentQ.content_id];

  const handleSelectOption = (opt) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.content_id]: opt
    }));
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswers[currentQ.content_id]) return;
    setSubmittedQuestions((prev) => ({
      ...prev,
      [currentQ.content_id]: true
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmitExam = async () => {
    const totalTimeSpent = Math.round((Date.now() - startTime) / 1000);
    let totalScore = 0;

    for (const q of questions) {
      const selectedOpt = selectedAnswers[q.content_id];
      const isCorrect = selectedOpt && selectedOpt.isCorrect;
      const score = isCorrect ? 100 : 0;
      totalScore += score;

      await learnerProgressService.logAttempt({
        learnerId,
        contentId: q.content_id,
        mode: 'check',
        result: isCorrect ? 'correct' : 'incorrect',
        score: score,
        timeSpentSeconds: Math.round(totalTimeSpent / questions.length)
      });
    }

    const finalAvgScore = Math.round(totalScore / questions.length);

    setResultsSummary({
      totalQuestions: questions.length,
      finalAvgScore,
      totalTimeSpent
    });
    setIsCompleted(true);

    if (finalAvgScore >= 80) {
      fireCelebrationConfetti('Picture_Quiz_Complete');
    }
    const userStore = useUserStore?.getState ? useUserStore.getState() : null;
    if (userStore?.addXP) userStore.addXP(50);
    if (userStore?.updateLocalProgress) {
      userStore.updateLocalProgress(weekNumber, 'listening_p4', { score: finalAvgScore, isCompleted: true });
    }
  };

  if (isCompleted && resultsSummary) {
    const starsEarned = resultsSummary.finalAvgScore >= 80 ? 3 : resultsSummary.finalAvgScore >= 60 ? 2 : 1;
    return (
      <div className="w-full max-w-2xl mx-auto bg-white text-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-300 shadow-xl font-sans animate-in fade-in">
        <CompletionModal
          isOpen={true}
          onClose={() => setIsCompleted(false)}
          score={resultsSummary.finalAvgScore}
          stars={starsEarned}
          xpEarned={50}
          srsWordsAdded={5}
          activityTitle="Picture Quiz Mission (Listening Part 4)"
        />
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Trophy size={32} />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Picture Quiz Completed</h3>
          <div className="text-sm font-bold text-emerald-600 mt-1">Awarded +50 XP to your Treasury! 🎉</div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
            <div className="text-[10px] text-indigo-700 font-black uppercase">Average Score</div>
            <div className="text-2xl font-black text-indigo-950">{resultsSummary.finalAvgScore} / 100</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-[10px] text-slate-500 font-black uppercase">Questions</div>
            <div className="text-2xl font-black text-slate-900">{resultsSummary.totalQuestions}</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-[10px] text-slate-500 font-black uppercase">Time Spent</div>
            <div className="text-2xl font-black text-slate-900">{resultsSummary.totalTimeSpent}s</div>
          </div>
        </div>

        <button
          onClick={() => {
            setIsCompleted(false);
            setCurrentIndex(0);
            setSelectedAnswers({});
            setSubmittedQuestions({});
          }}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl text-base transition flex items-center justify-center gap-2 shadow-md"
        >
          <RefreshCw size={18} /> Retake Picture Quiz Challenge
        </button>
      </div>
    );
  }

  const currentSelection = selectedAnswers[currentQ.content_id];
  const audioTextToPlay = currentQ.audio_script || currentQ.prompt || currentQ.question || currentQ.text || 'Listen to the question carefully.';

  return (
    <div className="w-full max-w-3xl mx-auto bg-white text-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-300 shadow-xl font-sans">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
            {currentQ.dialogue_context
              ? '💬 CHAT CHALLENGE: CHOOSE THE BEST RESPONSE'
              : '✨ NOVA\'S LISTENING CHALLENGE'}
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Question {currentIndex + 1} of {questions.length}
          </h2>
        </div>
      </div>

      {currentQ.type === 'listening_p4_picture' ? (
        <div className="bg-gradient-to-r from-amber-500 to-indigo-600 p-5 rounded-2xl text-white shadow-lg mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[11px] font-black rounded-full uppercase tracking-wider">
              🖼️ PICTURE QUIZ CHALLENGE
            </span>
            <span className="text-xs font-bold text-amber-100 flex items-center gap-1">
              🎧 Listen to Audio Prompt First
            </span>
          </div>

          <div className="flex items-center gap-4 bg-black/20 p-3.5 rounded-xl border border-white/20">
            <button
              onClick={() => speakText(
                audioTextToPlay,
                currentQ.audio_url || currentQ.audio || `/audio/week${weekNumber}/listening_p4_q${currentIndex + 1}.mp3`,
                1.0,
                null,
                'questions',
                weekNumber
              )}
              className="p-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 transition shadow-md shrink-0 active:scale-95"
            >
              <Volume2 size={18} /> Play Listening Audio
            </button>
            <div className="flex-1">
              <div className="text-[10px] font-black text-amber-200 uppercase tracking-widest">
                Listening Prompt Instructions:
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white italic leading-relaxed">
                "🎧 Listen carefully to the conversation between the characters to select the correct picture (A, B, or C)."
              </div>
              {currentQ.hint && (
                <div className="text-[11px] font-bold text-amber-200 mt-1 flex items-center gap-1">
                  💡 Hint: {currentQ.hint}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : currentQ.dialogue_context ? (
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 bg-amber-50/90 p-4 rounded-2xl border border-amber-200 shadow-sm relative">
            <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
              Speaker A
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black text-amber-700 uppercase tracking-wider mb-1">
                Statement / Question:
              </div>
              <div className="text-sm font-bold text-amber-950 leading-relaxed italic">
                "{currentQ.dialogue_context}"
              </div>
            </div>
          </div>

          <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100">
            <p className="text-xs font-black text-indigo-700 mb-1 uppercase tracking-wide">
              Question:
            </p>
            <div className="text-base font-black text-slate-900 leading-relaxed">
              {currentQ.text || currentQ.prompt || currentQ.question || currentQ.raw_content?.text_en || ''}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100 mb-6">
          <p className="text-xs font-black text-indigo-700 mb-1 uppercase tracking-wide">
            CHOOSE THE CORRECT WORD TO FILL IN THE BLANK:
          </p>
          <div className="text-base font-black text-slate-900 leading-relaxed">
            {currentQ.text || currentQ.prompt || currentQ.question || currentQ.raw_content?.text_en || ''}
          </div>
        </div>
      )}

      {/* Option Choices (Supports Text MC or Cambridge Listening Part 4 3-Picture Choice Cards A/B/C) */}
      <div className={currentQ.options.some(o => o.image_url || o.image) ? "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8" : "space-y-3 mb-8"}>
        {currentQ.options.map((opt, optIdx) => {
          const isSelected = currentSelection && currentSelection.label === opt.label;
          const isCorrect = opt.isCorrect !== undefined
            ? Boolean(opt.isCorrect)
            : (currentQ.correct_answer ? opt.label === currentQ.correct_answer : optIdx === currentQ.answerIndex);
          const optImage = opt.image_url || opt.image || (optIdx === 0 ? '/images/week33/webtoon_scene_1.png' : optIdx === 1 ? '/images/week33/webtoon_scene_2.png' : '/images/week33/webtoon_scene_4.png');

          let buttonStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
          let badgeStyle = 'bg-slate-200 text-slate-700';

          if (isSubmitted) {
            if (isCorrect) {
              buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-400 shadow-sm';
              badgeStyle = 'bg-emerald-600 text-white';
            } else if (isSelected && !isCorrect) {
              buttonStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-400 shadow-sm';
              badgeStyle = 'bg-rose-600 text-white';
            } else {
              buttonStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
              badgeStyle = 'bg-slate-200 text-slate-400';
            }
          } else if (isSelected) {
            buttonStyle = 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold ring-2 ring-indigo-500 shadow-sm';
            badgeStyle = 'bg-indigo-600 text-white';
          }

          if (currentQ.type === 'listening_p4_picture' || currentQ.options.some(o => o.image_url || o.image)) {
            return (
              <button
                key={opt.label || optIdx}
                disabled={isSubmitted}
                onClick={() => handleSelectOption(opt)}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-between text-center gap-3 relative overflow-hidden shadow-sm hover:scale-[1.02] active:scale-95 ${buttonStyle}`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`w-8 h-8 rounded-xl text-sm font-black flex items-center justify-center ${badgeStyle}`}>
                    {opt.label || String.fromCharCode(65 + optIdx)}
                  </span>
                  {isSubmitted && isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                  {isSubmitted && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-rose-500" />}
                </div>

                <div className="w-full h-32 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                  <img src={optImage} alt={opt.text} className="w-full h-full object-cover" />
                </div>

                {!isStealthMode && (
                  <div className="text-xs font-bold text-slate-800 line-clamp-2">{renderParsedText(opt.text, 'indigo', null, true)}</div>
                )}
              </button>
            );
          }

          return (
            <button
              key={opt.label || optIdx}
              disabled={isSubmitted}
              onClick={() => handleSelectOption(opt)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between gap-3.5 shadow-sm active:scale-[0.99] ${buttonStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-xl text-sm font-black flex items-center justify-center shrink-0 ${badgeStyle}`}>
                  {opt.label || String.fromCharCode(65 + optIdx)}
                </span>
                <div className="text-sm font-semibold">{renderParsedText(opt.text, 'indigo', null, true)}</div>
              </div>

              {isSubmitted && isCorrect && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 font-extrabold text-xs rounded-full shrink-0">
                  <CheckCircle2 size={16} /> Correct
                </span>
              )}
              {isSubmitted && isSelected && !isCorrect && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-700 font-extrabold text-xs rounded-full shrink-0">
                  <XCircle size={16} /> Incorrect
                </span>
              )}
            </button>
          );

        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-lg text-xs transition disabled:opacity-40"
        >
          ← Previous
        </button>

        {!isSubmitted ? (
          <button
            onClick={handleCheckAnswer}
            disabled={!currentSelection}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-lg text-xs transition flex items-center gap-2 shadow-md disabled:opacity-50"
          >
            <CheckCircle2 size={16} /> Check Answer
          </button>
        ) : currentIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmitExam}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-lg text-xs transition flex items-center gap-2 shadow-md"
          >
            <CheckCircle2 size={16} /> Finish Exam & View Results
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-lg text-xs transition flex items-center gap-2 shadow-md"
          >
            Next Question <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
