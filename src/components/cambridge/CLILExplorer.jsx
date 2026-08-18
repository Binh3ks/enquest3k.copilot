import React, { useState } from 'react';
import { Globe, Volume2, Sparkles, CheckCircle2, AlertCircle, HelpCircle, BookOpen, Send, Lightbulb, Check, ChevronDown, ChevronUp, Mic } from 'lucide-react';
import { renderParsedText } from '../common/HoverWord';
import VoiceService from '../../services/voiceService';

export default function CLILExplorer({
  clilData,
  weekNumber = 33,
  highlightMode = 'clean',
  setHighlightMode,
  targetGrammarRegex = []
}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showVietnamese, setShowVietnamese] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [criticalResponse, setCriticalResponse] = useState('');
  const [criticalSubmitted, setCriticalSubmitted] = useState(false);
  const [showCriticalHint, setShowCriticalHint] = useState(false);

  if (!clilData) {
    return (
      <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 font-bold">
        <Globe size={32} className="mx-auto mb-2 text-slate-400" />
        CLIL Knowledge Explorer content is loading...
      </div>
    );
  }

  const handleToggleAudio = async () => {
    if (isPlayingAudio) {
      if (typeof VoiceService.stopAudio === 'function') VoiceService.stopAudio();
      else if (typeof VoiceService.stop === 'function') VoiceService.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      try {
        await VoiceService.speak(
          clilData.content_en,
          'read',
          clilData.audio_url || `/audio/week${weekNumber}/explore.mp3`,
          weekNumber,
          'advanced'
        );
      } catch (_) {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(clilData.content_en);
          utterance.lang = 'en-US';
          window.speechSynthesis.speak(utterance);
        }
      } finally {
        setIsPlayingAudio(false);
      }
    }
  };

  const handleSelectAnswer = (questionId, option) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Header Banner */}
      <div className="p-5 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl text-white shadow-lg border border-blue-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-400 text-blue-950 font-black text-[10px] uppercase rounded-md tracking-wider flex items-center gap-1">
              <Globe size={11} /> CLIL Knowledge Explorer
            </span>
            <span className="text-blue-200 text-xs font-bold">Science & Social Studies Standard</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {clilData.title_en}
          </h2>
          {clilData.title_vi && (
            <p className="text-xs text-blue-200 font-medium italic">{clilData.title_vi}</p>
          )}
        </div>

        <div className="flex items-center gap-2 self-start md:self-center shrink-0">
          <button
            onClick={handleToggleAudio}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs flex items-center gap-2 shadow-md transition active:scale-95 ${
              isPlayingAudio
                ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950'
            }`}
          >
            <Volume2 size={16} />
            {isPlayingAudio ? 'Pause Narration' : '🎧 Listen to Article'}
          </button>
        </div>
      </div>

      {/* Main Reading Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-5">
        {/* Grammar X-Ray & Controls Bar */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <span className="text-[10px] font-black text-slate-400 uppercase px-2">Reading Mode:</span>
            <button
              onClick={() => setHighlightMode && setHighlightMode('clean')}
              className={`px-3 py-1 rounded-lg text-xs font-black transition ${
                highlightMode === 'clean'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              📖 Clean
            </button>
            <button
              onClick={() => setHighlightMode && setHighlightMode('vocab')}
              className={`px-3 py-1 rounded-lg text-xs font-black transition ${
                highlightMode === 'vocab'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-blue-600'
              }`}
            >
              🔤 Vocab Focus
            </button>
            <button
              onClick={() => setHighlightMode && setHighlightMode('grammar')}
              className={`px-3 py-1 rounded-lg text-xs font-black transition ${
                highlightMode === 'grammar'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-amber-600'
              }`}
            >
              🔬 Grammar X-Ray
            </button>
          </div>

          <button
            onClick={() => setShowVietnamese(!showVietnamese)}
            className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold border border-slate-200 transition flex items-center gap-1"
          >
            {showVietnamese ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showVietnamese ? 'Hide Vietnamese' : 'Bản dịch Tiếng Việt'}
          </button>
        </div>

        {/* English Article Body */}
        <div className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed sm:leading-loose">
          {renderParsedText(
            clilData.content_en,
            'blue',
            null,
            false,
            highlightMode,
            targetGrammarRegex
          )}
        </div>

        {/* Vietnamese Translation Accordion */}
        {showVietnamese && clilData.content_vi && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm text-slate-600 leading-relaxed italic animate-in fade-in duration-150">
            <span className="font-bold text-slate-700 not-italic block mb-1">🇻🇳 Bản dịch tiếng Việt:</span>
            {clilData.content_vi}
          </div>
        )}
      </div>

      {/* Bloom's Comprehension Questions */}
      {clilData.check_questions && clilData.check_questions.length > 0 && (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="text-blue-600" size={20} />
            <h3 className="text-base font-black text-slate-900">
              Comprehension Check (Kiểm tra đọc hiểu Bloom's)
            </h3>
          </div>

          <div className="space-y-4">
            {clilData.check_questions.map((q, idx) => {
              const userAns = selectedAnswers[q.id || idx + 1];
              const isSubmitted = Boolean(userAns);
              const isCorrect = userAns === q.answer;

              return (
                <div key={q.id || idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="font-bold text-slate-800 text-sm mb-3">
                    <span className="text-blue-600 font-black mr-1.5">{idx + 1}.</span>
                    {q.question_en}
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
                          onClick={() => handleSelectAnswer(q.id || idx + 1, opt)}
                          disabled={isSubmitted}
                          className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all text-center flex items-center justify-center gap-1.5 ${btnStyle}`}
                        >
                          {opt}
                          {isSubmitted && opt === q.answer && <Check size={14} />}
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className={`mt-2.5 p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {isCorrect ? (
                        <>
                          <CheckCircle2 size={14} className="text-emerald-600" /> Correct understanding!
                        </>
                      ) : (
                        <>
                          <AlertCircle size={14} className="text-rose-600" /> Correct answer: <span className="font-mono underline font-black">{q.answer}</span>
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

      {/* Critical Thinking Challenge */}
      {clilData.critical_thinking && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50/60 rounded-3xl p-6 border border-amber-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="text-amber-600" size={20} />
              <h3 className="text-base font-black text-amber-950">
                💡 Critical Thinking Challenge (Tư duy phản biện)
              </h3>
            </div>
            <button
              onClick={() => setShowCriticalHint(!showCriticalHint)}
              className="px-3 py-1 bg-amber-200/70 hover:bg-amber-300 text-amber-900 rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              <Lightbulb size={13} /> {showCriticalHint ? 'Hide Hint' : 'Need a Hint?'}
            </button>
          </div>

          <p className="text-sm font-bold text-slate-800 leading-relaxed">
            {clilData.critical_thinking.question_en}
          </p>

          {showCriticalHint && clilData.critical_thinking.hint_en && (
            <div className="p-3 bg-white/90 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium italic">
              💡 Hint: {clilData.critical_thinking.hint_en}
            </div>
          )}

          <div className="space-y-2 pt-1">
            <textarea
              rows={3}
              value={criticalResponse}
              onChange={(e) => setCriticalResponse(e.target.value)}
              placeholder="Type your thoughtful response here in English (e.g., 'Safety rules help us because...')..."
              className="w-full p-3.5 bg-white rounded-2xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-medium text-slate-800 placeholder:text-slate-400"
            />

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                {criticalResponse.trim().split(/\s+/).filter(Boolean).length} words
              </span>
              <button
                onClick={() => setCriticalSubmitted(true)}
                disabled={!criticalResponse.trim()}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 text-white text-xs font-black rounded-xl shadow-md transition flex items-center gap-1.5 active:scale-95"
              >
                <Send size={14} /> Submit Response
              </button>
            </div>

            {criticalSubmitted && (
              <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 size={16} className="text-emerald-600" />
                Awesome perspective! Reflecting on real-world rules builds global citizenship.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
