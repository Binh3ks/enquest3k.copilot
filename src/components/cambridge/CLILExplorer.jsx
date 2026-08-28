import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Volume2, CheckCircle2, AlertCircle, BookOpen, RotateCcw, HelpCircle, ArrowRight, Sparkles, Award } from 'lucide-react';
import { renderParsedText } from '../common/HoverWord';
import VoiceService from '../../services/voiceService';
import { speakText } from '../../utils/AudioHelper';
import { useUserStore } from '../../stores/useUserStore';
import useDailyQuestStore from '../../stores/useDailyQuestStore';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';

export default function CLILExplorer({
  clilData,
  weekNumber = 33,
  highlightMode = 'vocab',
  setHighlightMode,
  targetGrammarRegex = [],
  onCompleteCLIL
}) {
  const navigate = useNavigate();
  const [internalMode, setInternalMode] = useState(highlightMode || 'grammar');
  const activeHighlightMode = setHighlightMode ? highlightMode : internalMode;
  const handleModeSwitch = (mode) => {
    setInternalMode(mode);
    if (setHighlightMode) setHighlightMode(mode);
  };

  const [currentPhase, setCurrentPhase] = useState(1); // 1: Part 1, 2: Part 2, 3: Sentence Builder & Passport
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const grammarPatterns = useMemo(() => {
    if (Array.isArray(clilData?.grammar_patterns) && clilData.grammar_patterns.length > 0) return clilData.grammar_patterns;
    if (Array.isArray(targetGrammarRegex) && targetGrammarRegex.length > 0) return targetGrammarRegex;
    return [
      { pattern: '\\b(help|bury|grow|hide|start|fly|drink|travel|carry|call|stays|have|was|were)\\b', label: 'Action Verbs' },
      { pattern: '\\b(was|were)\\s+\\w+ing\\b', label: 'Past Continuous' }
    ];
  }, [clilData, targetGrammarRegex]);

  // VOCAB FOCUS: hub vocab_focus is a curated list of multi-word chunks/collocations.
  // renderParsedText tokenizes word-by-word, so we extract ALL individual content words
  // from each chunk and use those as the highlight targets (avoids multi-word regex failure).
  const vocabPills = useMemo(() => {
    const raw = clilData?.vocab_focus || clilData?.target_vocab || [];
    if (Array.isArray(raw) && raw.length > 0) return raw;
    return [];
  }, [clilData]);

  // Build per-word highlight patterns from multi-word chunks.
  // Stop-words (the, a, an, of, in, on, so, that, from, when, and, but, is) are excluded.
  const STOP_WORDS = new Set(['the','a','an','of','in','on','so','that','from','when','and','but','is','are','was','were','it','to','do']);
  const vocabHighlightPatterns = useMemo(() => {
    const words = new Set();
    vocabPills.forEach(chunk => {
      chunk.toLowerCase().split(/\s+/).forEach(w => {
        const clean = w.replace(/[^a-z]/g, '');
        if (clean.length > 2 && !STOP_WORDS.has(clean)) words.add(clean);
      });
    });
    return words.size > 0
      ? [{ pattern: '\\b(' + [...words].join('|') + ')\\b', label: 'Vocab Focus' }]
      : [];
  }, [vocabPills]);

  // Default Paragraph Split
  const fullText = clilData?.content_en || clilData?.content || "";

  const paragraphs = useMemo(() => {
    if (!fullText) return ["", ""];
    const parts = fullText.split(/\n\n+/);
    if (parts.length >= 2) return [parts[0], parts.slice(1).join('\n\n')];

    const sentences = fullText
      .replace(/([.!?])\s+/g, '$1|SPLIT|')
      .split('|SPLIT|')
      .map(s => s.trim())
      .filter(Boolean);
    const mid = Math.ceil(sentences.length / 2);
    return [
      sentences.slice(0, mid).join(' '),
      sentences.slice(mid).join(' ')
    ];
  }, [fullText]);

  // Select the grammar pattern appropriate to the CURRENT PHASE (paragraph_scope).
  // paragraph_scope: 1 = P1 only, 2 = P2 only, 0 = both
  const activeScopedPattern = useMemo(() => {
    for (const gp of grammarPatterns) {
      const scope = gp.paragraph_scope ?? 0;
      if (scope === 0 || scope === currentPhase) return gp;
    }
    return grammarPatterns[0] || { pattern: '', label: 'Target Grammar Focus', paragraph_scope: 0 };
  }, [grammarPatterns, currentPhase]);

  const grammarLegend = useMemo(() => {
    const src = currentPhase === 2 ? (paragraphs[1] || paragraphs[0]) : paragraphs[0];
    const out = [];
    if (!activeScopedPattern?.pattern) return out;
    try {
      const re = new RegExp(activeScopedPattern.pattern, 'gi');
      let m;
      while ((m = re.exec(src)) !== null && out.length < 8) {
        out.push(m[0]);
        if (m.index === re.lastIndex) re.lastIndex++;
      }
    } catch (_) {}
    return out;
  }, [paragraphs, activeScopedPattern, currentPhase]);

  const activeGrammarInfo = activeScopedPattern;

  // Questions derived from clilData
  const allQuestions = useMemo(() => {
    const rawQs = clilData?.comprehension_questions || clilData?.check_questions || [];
    return rawQs.map((q, idx) => ({
      id: q.id || `q_${idx + 1}`,
      question: q.question || q.question_en || q.prompt || `Question ${idx + 1}`,
      options: q.options || [],
      shuffledOptions: [...(q.options || [])].sort(() => 0.5 - Math.random()),
      correct: q.answer || (q.options && q.options[0]) || ""
    }));
  }, [clilData]);

  const questionsP1 = useMemo(() => allQuestions.slice(0, 2), [allQuestions]);
  const questionsP2 = useMemo(() => allQuestions.slice(2, 4), [allQuestions]);

  // Sentence Builder Quest — tap scrambled chunks in correct order
  const [sbIdx, setSbIdx] = useState(0);
  const [sbBuilt, setSbBuilt] = useState([]);
  const [sbResult, setSbResult] = useState(null);

  const sentenceDrills = useMemo(() => {
    if (clilData?.sentence_drills && Array.isArray(clilData.sentence_drills)) {
      return clilData.sentence_drills;
    }
    return [
      {
        id: 1,
        label: 'Science Fact',
        scrambled: ['stops things', 'Friction is a force that', 'from sliding easily'],
        correct: ['Friction is a force that', 'stops things', 'from sliding easily']
      }
    ];
  }, [clilData]);

  const sbDrill = sentenceDrills[sbIdx] || sentenceDrills[0];

  const sbRemaining = useMemo(() => {
    if (!sbDrill || !sbDrill.scrambled) return [];
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
  }, [sbDrill, sbBuilt]);

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

  const handleToggleAudio = async (textToPlay, forceAudioUrl = null) => {
    if (isPlayingAudio) {
      VoiceService.stop();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    try {
      // VoiceService.speak(text, station, audioUrl<string>, weekNumber, ...)
      // 3rd param MUST be a string, not an object.
      const audioUrl = forceAudioUrl || clilData?.audio_url || `/audio/week${weekNumber}/clil_friction.mp3`;
      await VoiceService.speak(textToPlay || fullText, 'explore', audioUrl, weekNumber);
    } catch (err) {
      console.warn('[CLIL Audio] playback error:', err);
      // Final fallback: browser TTS
      speakText(textToPlay || fullText);
    } finally {
      setIsPlayingAudio(false);
    }
  };

  const handleSelectAnswer = (qId, option, correct) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: option }));
    if (option === correct) {
      fireCelebrationConfetti('CLIL_Answer_Correct');
      const userStore = useUserStore?.getState ? useUserStore.getState() : null;
      if (userStore?.addXP) userStore.addXP(10);
    }
  };

  return (
    <div className="w-full space-y-3.5 font-sans text-slate-900">
      {/* Stepper Header (Zero-L1) */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-emerald-900 bg-emerald-100 px-3 py-1 rounded-xl">
            {currentPhase === 1 && `🔬 Part 1: ${clilData?.part_1_title || clilData?.title_en || clilData?.title || 'Science Principles'}`}
            {currentPhase === 2 && `🧪 Part 2: ${clilData?.part_2_title || clilData?.title_en || clilData?.title || 'Real-World Applications'}`}
            {currentPhase === 3 && '🎓 Part 3: Sentence Builder Challenge'}
          </span>
          <span className="text-xs font-bold text-slate-500">
            Step {currentPhase} of 3
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
            type="button"
            onClick={() => handleModeSwitch('vocab')}
            className={`px-3 py-1 rounded-lg text-xs font-black transition ${
              activeHighlightMode === 'vocab' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600'
            }`}
          >
            🔤 Vocab Focus
          </button>
          <button
            type="button"
            onClick={() => handleModeSwitch('grammar')}
            className={`px-3 py-1 rounded-lg text-xs font-black transition ${
              activeHighlightMode === 'grammar' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600'
            }`}
          >
            🔬 Grammar X-Ray
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleToggleAudio(fullText, clilData?.audio_url || `/audio/week${weekNumber}/clil_friction.mp3`)}
            className="px-3 py-1.5 bg-teal-700 hover:bg-teal-600 text-white font-black text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
            title="Listen to full article audio"
          >
            <Volume2 size={14} /> 🔊 Listen to whole text
          </button>
          <button
            type="button"
            onClick={() => handleToggleAudio(currentPhase === 1 ? paragraphs[0] : paragraphs[1])}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
          >
            <Volume2 size={14} /> {isPlayingAudio ? 'Pause' : '🎧 Listen to this part'}
          </button>
        </div>
      </div>

      {/* Mode Active Banner & Word Pills */}
      {activeHighlightMode === 'vocab' && (
        <div className="p-4 bg-emerald-50/90 border border-emerald-300 rounded-2xl space-y-2.5 shadow-xs animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase text-emerald-900 tracking-wider flex items-center gap-1.5">
              <Sparkles size={14} className="text-emerald-700" /> Key Vocabulary Focus ({vocabPills.length} words)
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
              Interactive Word Bank
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {vocabPills.map((w, idx) => (
              <button
                key={idx}
                type="button"
                className="px-3 py-1 bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-950 font-black text-xs rounded-xl shadow-xs transition active:scale-95 flex items-center gap-1"
                onClick={() => VoiceService.speakWord(w)}
              >
                <span>{w}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CLIL Glossary Section */}
      {Array.isArray(clilData?.glossary) && clilData.glossary.length > 0 && (
        <div className="p-4 bg-teal-50/90 border border-teal-200 rounded-2xl space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase text-teal-900 tracking-wider flex items-center gap-1.5">
              <BookOpen size={14} className="text-teal-700" /> Science & Nature Glossary
            </span>
            <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full border border-teal-300">
              Key Terms
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {clilData.glossary.map((item, idx) => (
              <button
                key={idx}
                type="button"
                data-testid="clil-glossary-chip"
                onClick={() => speakText(item.term || item.word)}
                title={`Tap to hear: ${item.term || item.word}`}
                className="px-3 py-1 bg-white border border-teal-300 text-teal-950 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 hover:bg-teal-50 active:scale-95 transition cursor-pointer"
              >
                <Volume2 size={11} className="text-teal-600 shrink-0" />
                <span className="font-black text-teal-800">{item.term || item.word}:</span>
                <span className="text-slate-700 font-medium">{item.meaning || item.def}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeHighlightMode === 'grammar' && (
        <div className="p-4 bg-amber-50/90 border border-amber-300 rounded-2xl space-y-2 shadow-xs animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase text-amber-900 tracking-wider flex items-center gap-1.5">
              <BookOpen size={14} className="text-amber-700" /> Grammar X-Ray: {activeGrammarInfo?.label || 'Target Grammar Focus'}
            </span>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
              Grammar Focus
            </span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-black text-amber-950">
            {grammarLegend.length === 0 && (
              <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg border border-amber-300">
                ℹ️ This section focuses on vocabulary and reading comprehension.
              </span>
            )}
            {grammarLegend.map((g, i) => (
              <span key={i} className="px-2.5 py-1 bg-amber-200/90 rounded-lg border border-amber-300">{g}</span>
            ))}
          </div>
          {grammarLegend.length > 0 && (
            <p className="text-[10px] text-amber-800 font-bold">
              👇 These phrases are highlighted inline inside the paragraph below.
            </p>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHASE 1: PARAGRAPH 1 + 2 CHECK QUESTIONS                                  */}
      {/* ========================================================================= */}
      {currentPhase === 1 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-700 border-b border-slate-100 pb-2">
              <span>📖 PARAGRAPH 1: {(clilData?.part_1_title || clilData?.title || 'CLIL ARTICLE').toUpperCase()}</span>
            </div>
            <p className="text-base sm:text-lg text-slate-900 font-bold leading-relaxed">
              {renderParsedText(paragraphs[0], 'emerald', null, false, activeHighlightMode, activeHighlightMode === 'grammar' ? [activeScopedPattern].filter(Boolean) : vocabHighlightPatterns)}
            </p>

            {/* Paragraph 1 Check Questions */}
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-3 pt-3">
              <h4 className="text-xs font-black uppercase text-emerald-900 flex items-center gap-1.5">
                <HelpCircle size={15} className="text-emerald-600" /> CHECK QUESTIONS (2 Questions)
              </h4>
              <div className="space-y-3">
                {questionsP1.map((q) => {
                  const selected = selectedAnswers[q.id];
                  const isCorrect = selected === q.correct;

                  return (
                    <div key={q.id} className="p-4 bg-white rounded-2xl border border-emerald-200 space-y-2.5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-xs sm:text-sm font-black text-slate-900">{q.question}</p>
                        {selected && (
                          <span className={`text-[11px] font-black px-2 py-0.5 rounded-lg flex items-center gap-1 animate-in zoom-in-95 ${
                            isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {isCorrect ? '✓ Correct! +10 XP' : '❌ Try another option'}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {q.shuffledOptions.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSelectAnswer(q.id, opt, q.correct)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition border text-left flex items-center gap-2 ${
                              selected === opt
                                ? isCorrect
                                  ? 'bg-emerald-600 text-white border-emerald-500 font-black shadow-md scale-[1.02]'
                                  : 'bg-rose-600 text-white border-rose-500'
                                : 'bg-slate-50 hover:bg-emerald-100 text-slate-800 border-slate-200'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-full bg-white/30 text-[10px] font-black flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + i)}
                            </span>
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
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 transition active:scale-95 hover:scale-105"
            >
              Next: Part 2 ▶
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
              <span>📖 PARAGRAPH 2: {(clilData?.part_2_title || clilData?.title || 'CLIL ARTICLE').toUpperCase()}</span>
            </div>
            <p className="text-base sm:text-lg text-slate-900 font-bold leading-relaxed">
              {renderParsedText(paragraphs[1] || paragraphs[0], 'teal', null, false, activeHighlightMode, activeHighlightMode === 'grammar' ? [activeScopedPattern].filter(Boolean) : vocabHighlightPatterns)}
            </p>

            {/* Paragraph 2 Check Questions */}
            <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200 space-y-3 pt-3">
              <h4 className="text-xs font-black uppercase text-teal-900 flex items-center gap-1.5">
                <HelpCircle size={15} className="text-teal-600" /> CHECK QUESTIONS (2 Questions)
              </h4>
              <div className="space-y-3">
                {questionsP2.map((q) => {
                  const selected = selectedAnswers[q.id];
                  const isCorrect = selected === q.correct;

                  return (
                    <div key={q.id} className="p-4 bg-white rounded-2xl border border-teal-200 space-y-2.5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-xs sm:text-sm font-black text-slate-900">{q.question}</p>
                        {selected && (
                          <span className={`text-[11px] font-black px-2 py-0.5 rounded-lg flex items-center gap-1 animate-in zoom-in-95 ${
                            isCorrect ? 'bg-teal-100 text-teal-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {isCorrect ? '✓ Correct! +10 XP' : '❌ Try another option'}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {q.shuffledOptions.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSelectAnswer(q.id, opt, q.correct)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition border text-left flex items-center gap-2 ${
                              selected === opt
                                ? isCorrect
                                  ? 'bg-teal-600 text-white border-teal-500 font-black shadow-md scale-[1.02]'
                                  : 'bg-rose-600 text-white border-rose-500'
                                : 'bg-slate-50 hover:bg-teal-100 text-slate-800 border-slate-200'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-full bg-white/30 text-[10px] font-black flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + i)}
                            </span>
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
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
            >
              ◀ Back to Part 1
            </button>
            <button
              type="button"
              onClick={() => setCurrentPhase(3)}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 transition active:scale-95 hover:scale-105"
            >
              Sentence Builder Challenge ▶
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
                    Tap the scrambled chunks in the correct grammar order
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
                <span className="text-xs text-slate-400 italic">Tap chunks below in the correct grammar order…</span>
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
                <CheckCircle2 size={15} /> Check Order
              </button>
              <button
                type="button"
                onClick={handleSbReset}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-xl flex items-center gap-1.5 transition"
              >
                <RotateCcw size={14} /> Reset
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
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
            >
              ◀ Back to Part 2
            </button>
            <button
              type="button"
              onClick={() => {
                useDailyQuestStore.getState().completeQuest(weekNumber, 'gear4_clil');
                fireCelebrationConfetti('Quest_Completed');
                if (onCompleteCLIL) {
                  onCompleteCLIL();
                } else {
                  navigate(`/week/${weekNumber}/hub/1`);
                }
              }}
              className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-white rounded-2xl font-black text-sm shadow-xl flex items-center gap-2 transition hover:scale-105 animate-bounce"
            >
              🎉 Claim CLIL Passport & Return to Map ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
