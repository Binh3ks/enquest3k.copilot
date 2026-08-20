import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Volume2, CheckCircle2, AlertCircle, BookOpen, RotateCcw, HelpCircle, ArrowRight, Sparkles, Award } from 'lucide-react';
import { renderParsedText } from '../common/HoverWord';
import VoiceService from '../../services/voiceService';
import { useUserStore } from '../../stores/useUserStore';
import useDailyQuestStore from '../../stores/useDailyQuestStore';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';

export default function CLILExplorer({
  clilData,
  weekNumber = 33,
  highlightMode = 'vocab',
  setHighlightMode,
  targetGrammarRegex = []
}) {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState(1); // 1: Part 1, 2: Part 2, 3: Sentence Builder & Passport
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Default Paragraph Split
  const fullText = clilData?.content_en || "Why do we fall on wet floors? The answer is a science concept called Friction. Friction is a force that stops things from sliding. While Jake was walking down the corridor, his rubber shoes created high friction with the dry floor. This kept him safe. But water changes everything! Water acts like a lubricant. While Tom was running fast, his shoes hit the wet puddle. The water reduced the friction to zero!";
  

  const paragraphs = React.useMemo(() => {
    const parts = fullText.split(/\n\n+/);
    if (parts.length >= 2) return [parts[0], parts.slice(1).join('\n\n')];

    const sentences = fullText.split(/(?<=[.!?])\s+/);
    const mid = Math.ceil(sentences.length / 2);
    return [
      sentences.slice(0, mid).join(' '),
      sentences.slice(mid).join(' ')
    ];
  }, [fullText]);

  // 2 Questions for Paragraph 1
  const questionsP1 = [
    {
      id: "q1",
      question: "What is Friction?",
      options: ["A force that stops objects from sliding", "A type of water puddle", "A running shoe brand"],
      correct: "A force that stops objects from sliding"
    },
    {
      id: "q2",
      question: "Why was Jake safe on the dry floor?",
      options: ["His rubber shoes created high friction", "The floor was wet", "He was running fast"],
      correct: "His rubber shoes created high friction"
    }
  ];

  // 2 Questions for Paragraph 2
  const questionsP2 = [
    {
      id: "q3",
      question: "What happens when water is on the floor?",
      options: ["Water acts like a lubricant and reduces friction", "Friction becomes 100 times higher", "Shoes stick to the floor"],
      correct: "Water acts like a lubricant and reduces friction"
    },
    {
      id: "q4",
      question: "What should students do when they see a yellow caution sign?",
      options: ["Slow down and walk carefully", "Run as fast as possible", "Jump over the wet puddle"],
      correct: "Slow down and walk carefully"
    }
  ];

  // ━━ Sentence Builder Quest — tap scrambled chunks in correct order ━━
  const [sbIdx, setSbIdx] = useState(0);
  const [sbBuilt, setSbBuilt] = useState([]);
  const [sbResult, setSbResult] = useState(null);

  const sentenceDrills = [
    {
      id: 1,
      label: 'Describe the cause',
      scrambled: ['Water acts', 'as a lubricant', 'on the wet floor,', 'reducing friction'],
      correct: ['Water acts', 'as a lubricant', 'on the wet floor,', 'reducing friction'],
    },
    {
      id: 2,
      label: 'Explain the effect',
      scrambled: ['As a result,', 'Tom\'s shoes', 'lost their grip', 'and he slipped'],
      correct: ['As a result,', 'Tom\'s shoes', 'lost their grip', 'and he slipped'],
    },
    {
      id: 3,
      label: 'Give safety advice',
      scrambled: ['Therefore,', 'students should walk', 'carefully in rubber shoes', 'down the corridor'],
      correct: ['Therefore,', 'students should walk', 'carefully in rubber shoes', 'down the corridor'],
    },
  ];

  const sbDrill = sentenceDrills[sbIdx];

  const sbRemaining = React.useMemo(() => {
    const builtCounts = {};
    sbBuilt.forEach(c => { builtCounts[c] = (builtCounts[c] || 0) + 1; });
    const result = [];
    sbDrill.scrambled.forEach(c => {
      if (!builtCounts[c] || builtCounts[c] === 0) {
        result.push(c);
      } else {
        builtCounts[c]--;
      }
    });
    return result;
  }, [sbBuilt, sbDrill]);

  const handleSbSelect = (chunk) => {
    setSbBuilt(prev => [...prev, chunk]);
    setSbResult(null);
  };

  const handleSbRemove = (idx) => {
    setSbBuilt(prev => prev.filter((_, i) => i !== idx));
    setSbResult(null);
  };

  const handleSbReset = () => {
    setSbBuilt([]);
    setSbResult(null);
  };

  const handleSbCheck = () => {
    const isCorrect = sbBuilt.every((c, i) => c === sbDrill.correct[i]) && sbBuilt.length === sbDrill.correct.length;
    if (isCorrect) {
      setSbResult({ correct: true, msg: '🌟 Excellent! Grammar order is 100% correct!' });
      fireCelebrationConfetti('SentenceBuilder_Success');
      const userStore = useUserStore?.getState ? useUserStore.getState() : null;
      if (userStore?.addXP) userStore.addXP(25);
    } else {
      setSbResult({ correct: false, msg: '❌ Not quite right yet. Try resetting and tapping in the correct order!' });
    }
  };

  const handleToggleAudio = async (textToPlay) => {
    if (isPlayingAudio) {
      VoiceService.stop();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    try {
      await VoiceService.speak(textToPlay || fullText, 'explore');
    } catch (_) {
    } finally {
      setIsPlayingAudio(false);
    }
  };

  const handleSelectAnswer = (qId, option) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: option }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 font-sans text-slate-900">
      {/* Stepper Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-emerald-900 bg-emerald-100 px-3 py-1 rounded-xl">
            {currentPhase === 1 && '🔬 Phần 1: Ma sát bề mặt khô'}
            {currentPhase === 2 && '🧪 Phần 2: Nước & Độ trơn trượt'}
            {currentPhase === 3 && '🎓 Phần 3: Thử thách Ghép câu'}
          </span>
          <span className="text-xs font-bold text-slate-500">
            Chặng {currentPhase} / 3
          </span>
        </div>
        <div className="w-36 h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 rounded-full"
            style={{ width: `${(currentPhase / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Mode Control Bar */}
      <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <span className="text-[10px] font-black text-slate-400 uppercase px-2">Mode:</span>
          <button
            onClick={() => setHighlightMode && setHighlightMode('vocab')}
            className={`px-3 py-1 rounded-lg text-xs font-black transition ${
              highlightMode === 'vocab' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600'
            }`}
          >
            🔤 Vocab Focus
          </button>
          <button
            onClick={() => setHighlightMode && setHighlightMode('grammar')}
            className={`px-3 py-1 rounded-lg text-xs font-black transition ${
              highlightMode === 'grammar' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600'
            }`}
          >
            🔬 Grammar X-Ray
          </button>
        </div>
        <button
          type="button"
          onClick={() => handleToggleAudio(currentPhase === 1 ? paragraphs[0] : paragraphs[1])}
          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition"
        >
          <Volume2 size={15} /> {isPlayingAudio ? 'Tạm dừng' : '🎧 Nghe đoạn này'}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* PHASE 1: PARAGRAPH 1 + 2 CHECK QUESTIONS                                  */}
      {/* ========================================================================= */}
      {currentPhase === 1 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-700 border-b border-slate-100 pb-2">
              <span>📖 PARAGRAPH 1: FRICTION ON DRY SURFACES</span>
            </div>
            <p className="text-base sm:text-lg text-slate-900 font-bold leading-relaxed">
              {renderParsedText(paragraphs[0], 'emerald', null, false, highlightMode, targetGrammarRegex)}
            </p>

            {/* Paragraph 1 Check Questions */}
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-3 pt-3">
              <h4 className="text-xs font-black uppercase text-emerald-900 flex items-center gap-1.5">
                <HelpCircle size={15} className="text-emerald-600" /> Câu hỏi kiểm tra hiểu bài (2 câu)
              </h4>
              <div className="space-y-3">
                {questionsP1.map((q) => {
                  const selected = selectedAnswers[q.id];
                  const isCorrect = selected === q.correct;

                  return (
                    <div key={q.id} className="p-3.5 bg-white rounded-2xl border border-emerald-200 space-y-2">
                      <p className="text-xs sm:text-sm font-black text-slate-900">{q.question}</p>
                      <div className="flex flex-wrap gap-2">
                        {q.options.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSelectAnswer(q.id, opt)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition border text-left ${
                              selected === opt
                                ? isCorrect
                                  ? 'bg-emerald-600 text-white border-emerald-500 font-black shadow-md'
                                  : 'bg-rose-600 text-white border-rose-500'
                                : 'bg-slate-50 hover:bg-emerald-100 text-slate-800 border-slate-200'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setCurrentPhase(2)}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 transition active:scale-95"
            >
              Tiếp tục: Sang Phần 2 ▶
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHASE 2: PARAGRAPH 2 + 2 CHECK QUESTIONS                                  */}
      {/* ========================================================================= */}
      {currentPhase === 2 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-teal-700 border-b border-slate-100 pb-2">
              <span>📖 PARAGRAPH 2: WATER LUBRICATION & ZERO FRICTION</span>
            </div>
            <p className="text-base sm:text-lg text-slate-900 font-bold leading-relaxed">
              {renderParsedText(paragraphs[1] || paragraphs[0], 'teal', null, false, highlightMode, targetGrammarRegex)}
            </p>

            {/* Paragraph 2 Check Questions */}
            <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200 space-y-3 pt-3">
              <h4 className="text-xs font-black uppercase text-teal-900 flex items-center gap-1.5">
                <HelpCircle size={15} className="text-teal-600" /> Câu hỏi kiểm tra hiểu bài (2 câu)
              </h4>
              <div className="space-y-3">
                {questionsP2.map((q) => {
                  const selected = selectedAnswers[q.id];
                  const isCorrect = selected === q.correct;

                  return (
                    <div key={q.id} className="p-3.5 bg-white rounded-2xl border border-teal-200 space-y-2">
                      <p className="text-xs sm:text-sm font-black text-slate-900">{q.question}</p>
                      <div className="flex flex-wrap gap-2">
                        {q.options.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSelectAnswer(q.id, opt)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition border text-left ${
                              selected === opt
                                ? isCorrect
                                  ? 'bg-teal-600 text-white border-teal-500 font-black shadow-md'
                                  : 'bg-rose-600 text-white border-rose-500'
                                : 'bg-slate-50 hover:bg-teal-100 text-slate-800 border-slate-200'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentPhase(1)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-black transition"
            >
              ◀ Quay lại Phần 1
            </button>
            <button
              type="button"
              onClick={() => setCurrentPhase(3)}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 transition active:scale-95"
            >
              Thử thách Ghép câu Khoa học ▶
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHASE 3: SENTENCE BUILDER QUEST + PASSPORT STAMP & COMPLETION             */}
      {/* ========================================================================= */}
      {currentPhase === 3 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">🧩</span>
                <div>
                  <h4 className="text-sm font-black text-slate-900">Sentence Builder Quest</h4>
                  <p className="text-[10px] text-slate-500">
                    Ghép các cụm từ theo đúng cấu trúc ngữ pháp khoa học
                  </p>
                </div>
              </div>
            </div>

            {/* Drill selector */}
            <div className="flex items-center gap-2 flex-wrap">
              {sentenceDrills.map((d, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setSbIdx(i); setSbBuilt([]); setSbResult(null); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                    sbIdx === i ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  #{i+1} {d.label}
                </button>
              ))}
            </div>

            {/* Built sentence display */}
            <div className="min-h-[60px] p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 flex flex-wrap gap-2 items-start">
              {sbBuilt.length === 0 ? (
                <span className="text-xs text-slate-400 italic">Chạm vào các cụm từ bên dưới theo đúng thứ tự…</span>
              ) : (
                sbBuilt.map((chunk, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSbRemove(i)}
                    className="px-3 py-1.5 bg-purple-100 hover:bg-rose-100 text-purple-900 hover:text-rose-700 border border-purple-300 hover:border-rose-300 rounded-xl text-xs font-bold transition active:scale-95"
                  >
                    {chunk} ×
                  </button>
                ))
              )}
            </div>

            {/* Remaining chips */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap gap-2">
                {sbRemaining.map((chunk, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSbSelect(chunk)}
                    className="px-3.5 py-2 bg-white hover:bg-emerald-50 text-slate-800 border border-slate-300 hover:border-emerald-400 rounded-xl text-xs font-bold transition active:scale-95 shadow-sm"
                  >
                    {chunk}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleSbCheck}
                disabled={sbBuilt.length === 0}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 transition active:scale-95"
              >
                <CheckCircle2 size={15} /> Kiểm tra câu
              </button>
              <button
                type="button"
                onClick={handleSbReset}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-xl flex items-center gap-1.5 transition"
              >
                <RotateCcw size={14} /> Xóa
              </button>
              {sbResult && (
                <div className={`flex-1 min-w-0 p-2.5 rounded-xl border text-xs font-black flex items-center gap-2 animate-in fade-in ${
                  sbResult.correct ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-rose-50 border-rose-300 text-rose-800'
                }`}>
                  {sbResult.correct ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                  {sbResult.msg}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentPhase(2)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-black transition"
            >
              ◀ Quay lại Phần 2
            </button>
            <button
              type="button"
              onClick={() => {
                useDailyQuestStore.getState().completeQuest(weekNumber, 'gear4_clil');
                fireCelebrationConfetti('Quest_Completed');
                navigate(`/week/${weekNumber}/hub/1`);
              }}
              className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-white rounded-2xl font-black text-sm shadow-xl flex items-center gap-2 transition hover:scale-105 animate-bounce"
            >
              🎉 Hoàn thành CLIL & Về bản đồ ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
