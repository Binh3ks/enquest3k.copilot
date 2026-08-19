import React, { useState } from 'react';
import { Globe, Volume2, Sparkles, CheckCircle2, AlertCircle, BookOpen, Send, Lightbulb, Check, Languages, Trophy, ArrowRight, HelpCircle, XCircle } from 'lucide-react';
import { renderParsedText } from '../common/HoverWord';
import VoiceService from '../../services/voiceService';
import { useUserStore } from '../../stores/useUserStore';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';

export default function CLILExplorer({
  clilData,
  weekNumber = 33,
  highlightMode = 'vocab',
  setHighlightMode,
  targetGrammarRegex = []
}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [criticalResponse, setCriticalResponse] = useState('');
  const [criticalSubmitted, setCriticalSubmitted] = useState(false);
  const [activeFlippedCard, setActiveFlippedCard] = useState(null);

  // Default Paragraph Split
  const fullText = clilData.content_en || "Why do we fall on wet floors? The answer is a science concept called Friction. Friction is a force that stops things from sliding. While Jake was walking down the corridor, his rubber shoes created high friction with the dry floor. This kept him safe. But water changes everything! Water acts like a lubricant. While Tom was running fast, his shoes hit the wet puddle. The water reduced the friction to zero!";
  
  const paragraphs = React.useMemo(() => {
    const parts = fullText.split(/\n\n+/);
    if (parts.length >= 2) return [parts[0], parts.slice(1).join('\n\n')];

    // Fallback mid-point split into 2 paragraphs
    const sentences = fullText.split(/(?<=[.!?])\s+/);
    const mid = Math.ceil(sentences.length / 2);
    return [
      sentences.slice(0, mid).join(' '),
      sentences.slice(mid).join(' ')
    ];
  }, [fullText]);

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

  const questionsP2 = [
    {
      id: "q3",
      question: "What happens when water is on the floor?",
      options: ["Water acts like a lubricant and reduces friction", "Friction becomes 100 times higher", "Shoes stick to the floor"],
      correct: "Water acts like a lubricant and reduces friction"
    }
  ];

  const translationCards = [
    { id: 1, en: "Friction is a force that stops things from sliding.", vi: "Ma sát là lực ngăn cản các vật trượt đi." },
    { id: 2, en: "Water acts like a lubricant on smooth tiles.", vi: "Nước hoạt động như chất bôi trơn trên gạch nhẵn." },
    { id: 3, en: "The water reduced the friction to zero!", vi: "Nước đã làm giảm lực ma sát xuống bằng không!" }
  ];

  const handleToggleAudio = async () => {
    if (isPlayingAudio) {
      VoiceService.stop();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    try {
      await VoiceService.speak(fullText, 'explore');
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
      {/* Compact Slim Soft Header Banner */}
      <div className="p-4 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-2xl text-white shadow-md border border-emerald-500/30 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
            🌍
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
              Gear 4 • CLIL Knowledge Explorer
            </span>
            <h3 className="text-base font-black text-amber-300">
              {clilData.title_en || "The Science of Friction & Corridor Safety"}
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggleAudio}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 transition active:scale-95 shrink-0"
        >
          <Volume2 size={16} /> {isPlayingAudio ? 'Pause' : '🎧 Listen Article'}
        </button>
      </div>

      {/* Control Bar */}
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
        <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
          💡 Click any word for instant dictionary & audio
        </span>
      </div>

      {/* ========================================================================= */}
      {/* PARAGRAPH 1 CARD & PARAGRAPH 1 CHECK QUESTIONS                            */}
      {/* ========================================================================= */}
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
            <HelpCircle size={15} className="text-emerald-600" /> Paragraph 1 Check Questions
          </h4>
          <div className="space-y-3">
            {questionsP1.map((q) => {
              const selected = selectedAnswers[q.id];
              const isCorrect = selected === q.correct;

              return (
                <div key={q.id} className="p-3 bg-white rounded-xl border border-emerald-200 space-y-2">
                  <p className="text-xs font-black text-slate-900">{q.question}</p>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectAnswer(q.id, opt)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border text-left ${
                          selected === opt
                            ? isCorrect
                              ? 'bg-emerald-600 text-white border-emerald-500 font-black'
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

      {/* ========================================================================= */}
      {/* PARAGRAPH 2 CARD & PARAGRAPH 2 CHECK QUESTIONS                            */}
      {/* ========================================================================= */}
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
            <HelpCircle size={15} className="text-teal-600" /> Paragraph 2 Check Questions
          </h4>
          <div className="space-y-3">
            {questionsP2.map((q) => {
              const selected = selectedAnswers[q.id];
              const isCorrect = selected === q.correct;

              return (
                <div key={q.id} className="p-3 bg-white rounded-xl border border-teal-200 space-y-2">
                  <p className="text-xs font-black text-slate-900">{q.question}</p>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectAnswer(q.id, opt)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border text-left ${
                          selected === opt
                            ? isCorrect
                              ? 'bg-teal-600 text-white border-teal-500 font-black'
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

      {/* ========================================================================= */}
      {/* FUN INTERACTIVE TRANSLATION FLIP CARDS                                    */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Languages size={18} className="text-emerald-600" />
          <h4 className="text-sm font-black text-slate-900">✨ FUN TRANSLATION CARD FLIP</h4>
          <span className="text-xs text-slate-500">Tap any sentence to reveal Vietnamese meaning</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {translationCards.map((card) => {
            const isFlipped = activeFlippedCard === card.id;

            return (
              <div
                key={card.id}
                onClick={() => setActiveFlippedCard(isFlipped ? null : card.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer min-h-[110px] flex flex-col justify-between shadow-sm hover:shadow-md ${
                  isFlipped
                    ? 'bg-emerald-600 text-white border-emerald-500 scale-[1.02]'
                    : 'bg-slate-50 text-slate-900 border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div className="text-xs font-black leading-snug">
                  {isFlipped ? card.vi : card.en}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-right opacity-80 pt-2">
                  {isFlipped ? '✅ Meaning' : '💡 Tap to Flip'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
