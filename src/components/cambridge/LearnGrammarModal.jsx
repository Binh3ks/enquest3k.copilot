import React, { useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, AlertTriangle, Volume2, Sparkles, X, Lightbulb, RefreshCw, Check } from 'lucide-react';
import VoiceService from '../../services/voiceService';

export default function LearnGrammarModal({ isOpen, onClose, grammarLesson }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanations, setShowExplanations] = useState({});
  const [activeLang, setActiveLang] = useState('en'); // 'en' | 'vi'

  if (!isOpen || !grammarLesson) return null;

  const handleSelectOption = (exerciseId, option) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [exerciseId]: option
    }));
  };

  const handleSpeak = (text) => {
    try {
      VoiceService.speak(text, 'reading');
    } catch (_) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-blue-200 flex flex-col overflow-hidden font-sans">
        {/* Header (Grammar in Use Style) */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
              <BookOpen className="text-amber-300" size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 bg-amber-400 text-blue-950 rounded-md">
                  Grammar Master Class
                </span>
                <span className="text-xs text-blue-200 font-bold">English Grammar in Use Standard</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white leading-tight mt-0.5">
                {activeLang === 'en' ? grammarLesson.title_en : grammarLesson.title_vi}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Lang Toggle */}
            <div className="flex bg-blue-900/60 p-0.5 rounded-xl border border-white/10 text-xs font-black">
              <button
                onClick={() => setActiveLang('en')}
                className={`px-2.5 py-1 rounded-lg transition ${activeLang === 'en' ? 'bg-white text-blue-900 shadow-sm' : 'text-blue-200 hover:text-white'}`}
              >
                EN
              </button>
              <button
                onClick={() => setActiveLang('vi')}
                className={`px-2.5 py-1 rounded-lg transition ${activeLang === 'vi' ? 'bg-white text-blue-900 shadow-sm' : 'text-blue-200 hover:text-white'}`}
              >
                VI
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-sm leading-relaxed">
          {/* 1. Rule & Formula Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 rounded-2xl p-5 border border-blue-200 shadow-sm">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <Lightbulb className="text-amber-500" size={18} />
                <h3 className="text-sm font-black text-blue-950 uppercase tracking-wide">
                  1. The Rule (Quy tắc ngữ pháp)
                </h3>
              </div>
              <button
                onClick={() => handleSpeak(grammarLesson.rule_en)}
                className="p-1.5 bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg transition"
                title="Listen to rule"
              >
                <Volume2 size={15} />
              </button>
            </div>

            <p className="text-slate-700 font-medium leading-relaxed mb-3">
              {activeLang === 'en' ? grammarLesson.rule_en : grammarLesson.rule_vi}
            </p>

            {grammarLesson.formula && (
              <div className="bg-white rounded-xl p-3.5 border-2 border-dashed border-blue-300 font-mono text-xs sm:text-sm font-black text-blue-900 shadow-inner flex items-center justify-center text-center">
                📐 {grammarLesson.formula}
              </div>
            )}
          </div>

          {/* 2. Clear Contextual Examples */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="text-indigo-600" size={18} />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                2. Real Context Examples (Ví dụ trong bài)
              </h3>
            </div>

            <div className="grid gap-3">
              {grammarLesson.examples?.map((ex, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    ex.correct
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-rose-50/50 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      {ex.correct ? (
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div
                          className="font-bold text-slate-900"
                          dangerouslySetInnerHTML={{
                            __html: ex.en.replace(/\*\*(.*?)\*\*/g, '<span class="px-1 py-0.5 bg-amber-200 text-amber-950 font-black rounded">$1</span>')
                          }}
                        />
                        {ex.vi && (
                          <p className="text-xs text-slate-500 italic mt-0.5">{ex.vi}</p>
                        )}
                        {ex.explanation_en && (
                          <p className="text-xs text-rose-700 font-semibold mt-1 bg-rose-100/70 p-1.5 rounded-lg">
                            ⚠️ {activeLang === 'en' ? ex.explanation_en : (ex.explanation_vi || ex.explanation_en)}
                          </p>
                        )}
                      </div>
                    </div>

                    {ex.correct && (
                      <button
                        onClick={() => handleSpeak(ex.en.replace(/\*\*/g, ''))}
                        className="p-1.5 bg-white text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg shadow-sm border border-emerald-200 transition shrink-0"
                        title="Listen to example"
                      >
                        <Volume2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Quick Interactive Practice */}
          {grammarLesson.practice_exercises && grammarLesson.practice_exercises.length > 0 && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="text-blue-600" size={18} />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                    3. Quick Check Practice (Luyện tập nhanh)
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-slate-500">
                  {Object.keys(selectedAnswers).length}/{grammarLesson.practice_exercises.length} Completed
                </span>
              </div>

              <div className="space-y-4">
                {grammarLesson.practice_exercises.map((q, qIdx) => {
                  const userAns = selectedAnswers[q.id];
                  const isSubmitted = Boolean(userAns);
                  const isCorrect = userAns === q.answer;

                  return (
                    <div key={q.id || qIdx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <p className="font-bold text-slate-800 text-sm mb-2.5">
                        <span className="text-blue-600 font-black mr-1.5">{qIdx + 1}.</span>
                        {q.prompt}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {q.options?.map((opt, oIdx) => {
                          const isSelected = userAns === opt;
                          let btnStyle = "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100";
                          if (isSubmitted) {
                            if (opt === q.answer) {
                              btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-sm font-black";
                            } else if (isSelected && !isCorrect) {
                              btnStyle = "bg-rose-500 text-white border-rose-600 font-black";
                            } else {
                              btnStyle = "bg-slate-100 text-slate-400 border-slate-200 opacity-60";
                            }
                          } else if (isSelected) {
                            btnStyle = "bg-blue-600 text-white border-blue-700 shadow-sm font-black";
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleSelectOption(q.id, opt)}
                              disabled={isSubmitted}
                              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all text-center flex items-center justify-center gap-1.5 ${btnStyle}`}
                            >
                              {opt}
                              {isSubmitted && opt === q.answer && <Check size={14} />}
                            </button>
                          );
                        })}
                      </div>

                      {isSubmitted && (
                        <div className={`mt-2.5 p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                          {isCorrect ? (
                            <>
                              <CheckCircle2 size={14} className="text-emerald-600" /> Correct! Great mastery of the structure.
                            </>
                          ) : (
                            <>
                              <AlertTriangle size={14} className="text-rose-600" /> Correct answer: <span className="font-mono underline font-black">{q.answer}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Key Grammar Vocabulary Cards */}
          {grammarLesson.key_grammar_vocab && grammarLesson.key_grammar_vocab.length > 0 && (
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                4. Key Grammar Terminology (Thuật ngữ ngữ pháp)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {grammarLesson.key_grammar_vocab.map((term, tIdx) => (
                  <div key={tIdx} className="p-2.5 bg-slate-100 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <span className="text-xs font-black text-blue-900">{term.en}</span>
                    <span className="text-[11px] text-slate-500">{term.vi}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            💡 Master the rules to score higher in Cambridge Reading & Writing!
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md transition active:scale-95"
          >
            Got It! Return to Drill
          </button>
        </div>
      </div>
    </div>
  );
}
