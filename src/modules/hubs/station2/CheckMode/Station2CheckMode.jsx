import React, { useState } from 'react';
import { learnerProgressService } from '../../../../services/learnerProgressService';
import { useUserStore } from '../../../../stores/useUserStore';
import HoverWord, { renderParsedText } from '../../../../components/common/HoverWord';
import { speakText } from '../../../../utils/AudioHelper';
import { CheckCircle2, ArrowRight, RefreshCw, FileText, XCircle, Volume2 } from 'lucide-react';


const FALLBACK_CHECK_QUESTIONS = [
  {
    id: 'chk_w33_p4_01',
    content_id: 'chk_w33_p4_01',
    type: 'listening_p4_picture',
    question: '1. Where did Tom slip and hurt his knee?',
    prompt: 'Where did Tom slip and hurt his knee?',
    audio_script: "Girl: Did Tom slip inside the science lab?\nBoy: No, he was walking past the science lab, but he actually slipped on wet tiles in the school corridor!\nGirl: Oh, so it was in the corridor, not in the lab or playground!",
    options: [
      { label: 'A', text: 'In the school corridor', image_url: '/images/week33/webtoon_scene_3.png', isCorrect: true },
      { label: 'B', text: 'Inside the science lab', image_url: '/images/week33/lab_desk.jpg', isCorrect: false },
      { label: 'C', text: 'On the outdoor playground', image_url: '/images/week33/card_h_playground_bench.jpg', isCorrect: false }
    ],
    answerIndex: 0
  },
  {
    id: 'chk_w33_p4_02',
    content_id: 'chk_w33_p4_02',
    type: 'listening_p4_picture',
    question: '2. What did Jake do immediately when Tom fell?',
    prompt: 'What did Jake do immediately when Tom fell?',
    audio_script: "Man: Did Jake run to find his teacher in class?\nWoman: No, Jake stopped right away and walked quickly to call the school nurse for help!\nMan: Ah, he called the school nurse immediately!",
    options: [
      { label: 'A', text: 'Walked quickly to call the school nurse', image_url: '/images/week33/webtoon_scene_4.png', isCorrect: true },
      { label: 'B', text: 'Ran to find his teacher in class', image_url: '/images/week33/webtoon_scene_2.png', isCorrect: false },
      { label: 'C', text: 'Kept walking down the hallway', image_url: '/images/week33/webtoon_scene_1.png', isCorrect: false }
    ],
    answerIndex: 0
  },
  {
    id: 'chk_w33_p4_03',
    content_id: 'chk_w33_p4_03',
    type: 'listening_p4_picture',
    question: '3. What did the school nurse apply to Tom’s knee?',
    prompt: 'What did the school nurse apply to Tom’s knee?',
    audio_script: "Woman: Did the nurse give Tom a glass of orange juice?\nMan: Tom was thirsty, but the nurse first applied a clean bandage and a cold pack to his knee.\nWoman: So she applied a clean bandage and a cold pack!",
    options: [
      { label: 'A', text: 'Applied a clean bandage and cold pack', image_url: '/images/week33/card_clean_bandage.jpg', isCorrect: true },
      { label: 'B', text: 'Gave him a glass of orange juice', image_url: '/images/week33/card_orange_juice.jpg', isCorrect: false },
      { label: 'C', text: 'Gave him a new science notebook', image_url: '/images/week33/card_science_notebook.jpg', isCorrect: false }
    ],
    answerIndex: 0
  },
  {
    id: 'chk_w33_p4_04',
    content_id: 'chk_w33_p4_04',
    type: 'listening_p4_picture',
    question: '4. How did everyone feel after Tom was safely helped?',
    prompt: 'How did everyone feel after Tom was safely helped?',
    audio_script: "Girl: Was Tom's knee severely injured?\nBoy: No, the nurse treated his knee gently, and everyone felt relieved and safe!\nGirl: That was a big relief for everyone!",
    options: [
      { label: 'A', text: 'Felt relieved and safe', image_url: '/images/week33/webtoon_scene_5.png', isCorrect: true },
      { label: 'B', text: 'Felt angry and upset', image_url: '/images/week33/webtoon_scene_2.png', isCorrect: false },
      { label: 'C', text: 'Felt scared and fell down', image_url: '/images/week33/webtoon_scene_3.png', isCorrect: false }
    ],
    answerIndex: 0
  },
  {
    id: 'chk_w33_p4_05',
    content_id: 'chk_w33_p4_05',
    type: 'listening_p4_picture',
    question: '5. What did the headmaster do during Monday assembly?',
    prompt: 'What did the headmaster do during Monday assembly?',
    audio_script: "Man: Did the headmaster give Jake a difficult test?\nWoman: Yes, the headmaster praised Jake publicly during Monday assembly for taking responsible action!",
    options: [
      { label: 'A', text: 'Praised Jake publicly during assembly', image_url: '/images/week33/w33_listening_p1_scene.jpg', isCorrect: true },
      { label: 'B', text: 'Gave Jake a difficult homework test', image_url: '/images/week33/card_g_headmaster_office.jpg', isCorrect: false },
      { label: 'C', text: 'Closed the school corridor forever', image_url: '/images/week33/webtoon_scene_1.png', isCorrect: false }
    ],
    answerIndex: 0
  }
];

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
  };

  if (isCompleted && resultsSummary) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white text-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-300 shadow-xl font-sans animate-in fade-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <FileText size={32} />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Grammar Check Mode Completed</h3>
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
          <RefreshCw size={18} /> Retake 10-Question Check Mode Exam
        </button>
      </div>
    );
  }

  const currentSelection = selectedAnswers[currentQ.content_id];
  const audioTextToPlay = currentQ.audio_script || currentQ.prompt || currentQ.question || currentQ.text || 'Where was the boy when he slipped on the wet floor?';

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
              onClick={() => speakText(audioTextToPlay)}
              className="p-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 transition shadow-md shrink-0 active:scale-95"
            >
              <Volume2 size={18} /> Play Listening Audio
            </button>
            <div className="flex-1">
              <div className="text-[10px] font-black text-amber-200 uppercase tracking-widest">
                Listening Question Audio:
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white italic whitespace-pre-line leading-relaxed">
                {isStealthMode ? '"🎧 Audio Prompt Only — Listen carefully to select A, B, or C"' : audioTextToPlay}
              </div>
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
          const isCorrect = opt.isCorrect || (currentQ.answerIndex !== undefined && optIdx === currentQ.answerIndex);
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
