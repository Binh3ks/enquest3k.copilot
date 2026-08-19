import React, { useState } from 'react';
import { Globe, Volume2, CheckCircle2, AlertCircle, BookOpen, RotateCcw } from 'lucide-react';
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
  const [activeFlippedCard, setActiveFlippedCard] = useState(null);

  // Default Paragraph Split
  const fullText = clilData.content_en || "Why do we fall on wet floors? The answer is a science concept called Friction. Friction is a force that stops things from sliding. While Jake was walking down the corridor, his rubber shoes created high friction with the dry floor. This kept him safe. But water changes everything! Water acts like a lubricant. While Tom was running fast, his shoes hit the wet puddle. The water reduced the friction to zero!";
  

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
  const [sbBuilt, setSbBuilt] = useState([]); // chosen chunks in order
  const [sbResult, setSbResult] = useState(null); // { correct: bool, msg }

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

  // Scramble chips (stable order using useMemo)
  const sbScrambled = React.useMemo(() => {
    return [...sbDrill.scrambled].sort(() => 0.5 - Math.random());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sbIdx]);

  const sbRemaining = sbScrambled.filter(c => !sbBuilt.includes(c));

  const handleSbSelect = (chunk) => {
    setSbResult(null);
    setSbBuilt(prev => [...prev, chunk]);
  };

  const handleSbRemove = (idx) => {
    setSbResult(null);
    setSbBuilt(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSbCheck = () => {
    const isCorrect = JSON.stringify(sbBuilt) === JSON.stringify(sbDrill.correct);
    if (isCorrect) {
      setSbResult({ correct: true, msg: '🎉 Perfect sentence! Correct grammar order! +20 XP' });
      fireCelebrationConfetti('SentenceBuilder_Win');
      const userStore = useUserStore?.getState ? useUserStore.getState() : null;
      if (userStore?.addXP) userStore.addXP(20);
    } else {
      setSbResult({ correct: false, msg: '💡 Not quite! Check the grammar order: Subject → Verb Phrase → Adverbial. Try again!' });
    }
  };

  const handleSbReset = () => {
    setSbBuilt([]);
    setSbResult(null);
  };

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
      {/* Slim Game Instruction Bar */}
      <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between flex-wrap gap-2 text-xs">
        <span className="font-black text-emerald-950 flex items-center gap-1.5">
          🌍 CLIL KNOWLEDGE EXPLORER — Read 2 article paragraphs & complete check questions after each part!
        </span>
        <button
          type="button"
          onClick={handleToggleAudio}
          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-sm flex items-center gap-1 transition shrink-0"
        >
          <Volume2 size={14} /> {isPlayingAudio ? 'Pause' : '🎧 Listen'}
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
      {/* PARAGRAPH 1 CARD & PARAGRAPH 1 CHECK QUESTIONS (2 QUESTIONS)              */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md space-y-4">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-700 border-b border-slate-100 pb-2">
          <span>📖 PARAGRAPH 1: FRICTION ON DRY SURFACES</span>
        </div>
        <p className="text-base sm:text-lg text-slate-900 font-bold leading-relaxed">
          {renderParsedText(paragraphs[0], 'emerald', null, false, highlightMode, targetGrammarRegex)}
        </p>

        {/* Paragraph 1 Check Questions (2 Questions) */}
        <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-3 pt-3">
          <h4 className="text-xs font-black uppercase text-emerald-900 flex items-center gap-1.5">
            <HelpCircle size={15} className="text-emerald-600" /> Paragraph 1 Check Questions (2 Items)
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
      {/* PARAGRAPH 2 CARD & PARAGRAPH 2 CHECK QUESTIONS (2 QUESTIONS)              */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md space-y-4">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-teal-700 border-b border-slate-100 pb-2">
          <span>📖 PARAGRAPH 2: WATER LUBRICATION & ZERO FRICTION</span>
        </div>
        <p className="text-base sm:text-lg text-slate-900 font-bold leading-relaxed">
          {renderParsedText(paragraphs[1] || paragraphs[0], 'teal', null, false, highlightMode, targetGrammarRegex)}
        </p>

        {/* Paragraph 2 Check Questions (2 Questions) */}
        <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200 space-y-3 pt-3">
          <h4 className="text-xs font-black uppercase text-teal-900 flex items-center gap-1.5">
            <HelpCircle size={15} className="text-teal-600" /> Paragraph 2 Check Questions (2 Items)
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
      {/* SENTENCE BUILDER QUEST — Tap Chunks in Correct Grammar Order             */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">🧩</span>
            <div>
              <h4 className="text-sm font-black text-slate-900">Sentence Builder Quest</h4>
              <p className="text-[10px] text-slate-500">Tap chunks in the correct grammar order to build a complete sentence</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {sentenceDrills.map((d, i) => (
              <button key={i} type="button" onClick={() => { setSbIdx(i); setSbBuilt([]); setSbResult(null); }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition ${
                  sbIdx === i ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}>
                #{i+1}
              </button>
            ))}
          </div>
        </div>

        {/* Drill Label */}
        <div className="px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
          <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">Goal: </span>
          <span className="text-xs font-bold text-emerald-900">{sbDrill.label}</span>
        </div>

        {/* Built sentence display */}
        <div className="min-h-[52px] p-3 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 flex flex-wrap gap-2 items-start">
          {sbBuilt.length === 0 ? (
            <span className="text-xs text-slate-400 italic">Your sentence will appear here as you tap chunks below...</span>
          ) : (
            sbBuilt.map((chunk, i) => (
              <button key={i} type="button" onClick={() => handleSbRemove(i)}
                className="px-2.5 py-1 bg-purple-100 hover:bg-rose-100 text-purple-900 hover:text-rose-700 border border-purple-300 hover:border-rose-300 rounded-lg text-xs font-bold transition active:scale-95" title="Click to remove">
                {chunk} ×
              </button>
            ))
          )}
        </div>

        {/* Remaining scrambled chips */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Tap chunks to build the sentence:</span>
          <div className="flex flex-wrap gap-2">
            {sbRemaining.map((chunk, i) => (
              <button key={i} type="button" onClick={() => handleSbSelect(chunk)}
                className="px-3 py-1.5 bg-white hover:bg-emerald-50 text-slate-800 border border-slate-300 hover:border-emerald-400 rounded-xl text-xs font-bold transition active:scale-95 shadow-sm">
                {chunk}
              </button>
            ))}
            {sbRemaining.length === 0 && sbBuilt.length > 0 && !sbResult && (
              <span className="text-xs text-emerald-600 font-bold italic">✓ All chunks placed! Check your sentence below.</span>
            )}
          </div>
        </div>

        {/* Grammar reminder */}
        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-black">Subject</span>
          <span>→</span>
          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-black">Verb Phrase</span>
          <span>→</span>
          <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-black">Adverbial / Result</span>
        </div>

        {/* Action row */}
        <div className="flex items-center gap-2 flex-wrap">
          <button type="button" onClick={handleSbCheck}
            disabled={sbBuilt.length === 0 || sbRemaining.length > 0}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 transition active:scale-95">
            <CheckCircle2 size={14} /> Check Sentence
          </button>
          <button type="button" onClick={handleSbReset}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-xl flex items-center gap-1.5 transition">
            <RotateCcw size={13} /> Reset
          </button>

          {sbResult && (
            <div className={`flex-1 min-w-0 p-2.5 rounded-xl border text-xs font-black flex items-center gap-2 animate-in fade-in ${
              sbResult.correct ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-rose-50 border-rose-300 text-rose-800'
            }`}>
              {sbResult.correct ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              {sbResult.msg}
              {sbResult.correct && sbIdx < sentenceDrills.length - 1 && (
                <button type="button" onClick={() => { setSbIdx(sbIdx+1); setSbBuilt([]); setSbResult(null); }}
                  className="ml-auto px-2.5 py-0.5 bg-emerald-600 text-white rounded-lg text-[10px] font-black">
                  Next ▶
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
