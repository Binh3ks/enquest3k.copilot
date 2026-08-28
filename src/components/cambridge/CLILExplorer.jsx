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
  // Audio playback state: null | 'whole' | 'part'
  const [playingAudioType, setPlayingAudioType] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const grammarPatterns = useMemo(() => {
    if (Array.isArray(clilData?.grammar_patterns) && clilData.grammar_patterns.length > 0) return clilData.grammar_patterns;
    if (Array.isArray(targetGrammarRegex) && targetGrammarRegex.length > 0) return targetGrammarRegex;
    return [
      { pattern: '\\b(stops things from sliding|walks on dry tiles|grip the floor firmly|stays balanced|creates a thin slippery layer|reduces friction|slide easily)\\b', label: 'Present Simple Verb Phrases', paragraph_scope: 1 },
      { pattern: '\\b(was walking carefully|was drying the floor|was running quickly|slipped on the wet tiles|provide strong grip|holds surfaces better|remind students to walk slowly|keeps everyone safe)\\b', label: 'Past Continuous & Action Verb Phrases', paragraph_scope: 2 }
    ];
  }, [clilData, targetGrammarRegex]);

  // VOCAB FOCUS: Curated list of multi-word chunks and collocations
  const vocabPills = useMemo(() => {
    const raw = clilData?.vocab_focus || clilData?.target_vocab || [];
    if (Array.isArray(raw) && raw.length > 0) return raw;
    return [];
  }, [clilData]);

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
    return grammarPatterns[0] || { pattern: '', label: 'Target Verb Phrases', paragraph_scope: 0 };
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

  // Audio Playback Controls
  const handleToggleWholeAudio = async () => {
    if (playingAudioType === 'whole') {
      VoiceService.stop();
      setPlayingAudioType(null);
      return;
    }

    VoiceService.stop();
    setPlayingAudioType('whole');
    try {
      const audioUrl = clilData?.audio_url || `/audio/week${weekNumber}/clil_friction.mp3`;
      await VoiceService.speak(fullText, 'explore', audioUrl, weekNumber);
    } catch (err) {
      console.warn('[CLIL Audio Whole] playback error:', err);
      speakText(fullText);
    } finally {
      setPlayingAudioType(null);
    }
  };

  const handleTogglePartAudio = async () => {
    if (playingAudioType === 'part') {
      VoiceService.stop();
      setPlayingAudioType(null);
      return;
    }

    VoiceService.stop();
    setPlayingAudioType('part');
    const partText = currentPhase === 1 ? paragraphs[0] : (paragraphs[1] || paragraphs[0]);
    try {
      // Pass null audioUrl so it synthesizes/plays ONLY this specific part via TTS
      await VoiceService.speak(partText, 'explore', null, weekNumber);
    } catch (err) {
      console.warn('[CLIL Audio Part] playback error:', err);
      speakText(partText);
    } finally {
      setPlayingAudioType(null);
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
    <div className="w-full space-y-4 font-sans text-slate-900">
      {/* Stepper Header (Zero-L1) */}
      <div className="flex items-center justify-between px-1 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <span className="text-sm sm:text-base font-black text-emerald-900 bg-emerald-100 px-4 py-1.5 rounded-xl border border-emerald-200 shadow-xs">
            {currentPhase === 1 && `🔬 Part 1: ${clilData?.part_1_title || clilData?.title_en || clilData?.title || 'Science Principles'}`}
            {currentPhase === 2 && `🧪 Part 2: ${clilData?.part_2_title || clilData?.title_en || clilData?.title || 'Real-World Applications'}`}
            {currentPhase === 3 && '🎓 Part 3: Sentence Builder Challenge'}
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-500">
            Step {currentPhase} of 3
          </span>
        </div>

        {/* Right Header: Progress Bar & Compact Stamp Icon */}
        <div className="flex items-center gap-3">
          <div className="w-28 sm:w-40 h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 rounded-full"
              style={{ width: `${(currentPhase / 3) * 100}%` }}
            />
          </div>

          {/* Compact Top-Right Stamp Badge */}
          <button
            type="button"
            onClick={onCompleteCLIL}
            title="Click to view CLIL Science Passport Details"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl font-black text-xs shadow-sm border border-emerald-400/40 cursor-pointer active:scale-95 transition"
          >
            <Award size={16} className="text-amber-300 animate-pulse" />
            <span className="text-xs font-black tracking-wide">Science LV.1</span>
          </button>
        </div>
      </div>

      {/* Mode Control Bar */}
      <div className="p-3.5 sm:p-4 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
          <span className="text-xs font-black text-slate-500 uppercase px-2">Mode:</span>
          <button
            type="button"
            onClick={() => handleModeSwitch('vocab')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition ${
              activeHighlightMode === 'vocab' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🔤 Vocab Focus
          </button>
          <button
            type="button"
            onClick={() => handleModeSwitch('grammar')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition ${
              activeHighlightMode === 'grammar' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🔬 Grammar X-Ray
          </button>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleToggleWholeAudio}
            className={`px-4 py-2 font-black text-xs sm:text-sm rounded-xl shadow-sm flex items-center gap-1.5 transition active:scale-95 cursor-pointer ${
              playingAudioType === 'whole'
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-teal-700 hover:bg-teal-600 text-white'
            }`}
            title={playingAudioType === 'whole' ? 'Click to stop whole text audio' : 'Listen to full article audio'}
          >
            <Volume2 size={16} /> {playingAudioType === 'whole' ? '⏹ Stop whole text' : '🔊 Listen to whole text'}
          </button>
          <button
            type="button"
            onClick={handleTogglePartAudio}
            className={`px-4 py-2 font-black text-xs sm:text-sm rounded-xl shadow-sm flex items-center gap-1.5 transition active:scale-95 cursor-pointer ${
              playingAudioType === 'part'
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
            title={playingAudioType === 'part' ? 'Click to stop this part audio' : 'Listen to current part audio'}
          >
            <Volume2 size={16} /> {playingAudioType === 'part' ? '⏹ Stop this part' : '🎧 Listen to this part'}
          </button>
        </div>
      </div>

      {/* Mode Active Banner & Word Pills */}
      {activeHighlightMode === 'vocab' && (
        <div className="p-4 sm:p-5 bg-emerald-50/90 border border-emerald-300 rounded-2xl sm:rounded-3xl space-y-3 shadow-xs animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-black uppercase text-emerald-900 tracking-wider flex items-center gap-1.5">
              <Sparkles size={16} className="text-emerald-700" /> Key Collocations & Chunks ({vocabPills.length})
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              Interactive Word Bank
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {vocabPills.map((w, idx) => (
              <div
                key={idx}
                className="px-3.5 py-1.5 bg-white hover:bg-emerald-50/80 border border-emerald-300 text-emerald-950 font-black text-xs sm:text-sm rounded-xl shadow-xs transition flex items-center gap-1.5"
              >
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); speakText(w); }}
                  title={`Tap to hear: ${w}`}
                  className="p-1 hover:bg-emerald-100 rounded-lg text-emerald-700 transition cursor-pointer shrink-0"
                >
                  <Volume2 size={13} />
                </button>
                <span className="cursor-pointer">{renderParsedText(w, 'emerald', null, false, 'vocab', [w])}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CLIL Glossary Section */}
      {Array.isArray(clilData?.glossary) && clilData.glossary.length > 0 && (
        <div className="p-4 sm:p-5 bg-teal-50/90 border border-teal-200 rounded-2xl sm:rounded-3xl space-y-3 shadow-xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs sm:text-sm font-black uppercase text-teal-900 tracking-wider flex items-center gap-1.5">
              <BookOpen size={16} className="text-teal-700" /> Science & Nature Glossary
            </span>
            <span className="text-xs font-bold text-teal-800 bg-teal-100 px-3 py-1 rounded-full border border-teal-300">
              Key Terms (Click any term or word for full dictionary)
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {clilData.glossary.map((item, idx) => {
              const termStr = item.term || item.word || '';
              return (
                <div
                  key={idx}
                  data-testid="clil-glossary-chip"
                  className="px-3.5 py-2 bg-white border border-teal-300 text-teal-950 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold shadow-xs flex items-center gap-2 hover:bg-teal-50/80 transition"
                >
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); speakText(termStr); }}
                    title={`Tap to hear: ${termStr}`}
                    className="p-1 hover:bg-teal-100 rounded-lg text-teal-700 transition cursor-pointer shrink-0"
                  >
                    <Volume2 size={14} />
                  </button>
                  <span className="font-black text-teal-900 shrink-0 cursor-pointer">
                    {renderParsedText(termStr, 'teal', null, false, 'vocab', [termStr])}:
                  </span>
                  <span className="text-slate-700 font-medium cursor-pointer">
                    {renderParsedText(item.meaning || item.def, 'teal', null, false, 'clean')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeHighlightMode === 'grammar' && (
        <div className="p-4 sm:p-5 bg-amber-50/90 border border-amber-300 rounded-2xl sm:rounded-3xl space-y-3 shadow-xs animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-black uppercase text-amber-900 tracking-wider flex items-center gap-1.5">
              <BookOpen size={16} className="text-amber-700" /> Grammar X-Ray: {activeGrammarInfo?.label || 'Target Grammar Focus'}
            </span>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Grammar Focus
            </span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm font-black text-amber-950">
            {grammarLegend.length === 0 && (
              <span className="px-3 py-1.5 bg-amber-100 text-amber-900 rounded-xl border border-amber-300">
                ℹ️ This section focuses on vocabulary and reading comprehension.
              </span>
            )}
            {grammarLegend.map((g, i) => (
              <span key={i} className="px-3 py-1.5 bg-amber-200/90 rounded-xl border border-amber-300">{g}</span>
            ))}
          </div>
          {grammarLegend.length > 0 && (
            <p className="text-xs text-amber-800 font-bold">
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
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-md space-y-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-700 border-b border-slate-100 pb-3">
              <span>📖 PARAGRAPH 1: {(clilData?.part_1_title || clilData?.title || 'CLIL ARTICLE').toUpperCase()}</span>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-900 font-bold leading-relaxed sm:leading-loose">
              {renderParsedText(paragraphs[0], 'emerald', null, false, activeHighlightMode, activeHighlightMode === 'grammar' ? [activeScopedPattern].filter(Boolean) : vocabPills)}
            </p>

            {/* Paragraph 1 Check Questions */}
            <div className="p-5 sm:p-6 bg-emerald-50/70 rounded-2xl sm:rounded-3xl border border-emerald-200 space-y-4 pt-4">
              <h4 className="text-xs sm:text-sm font-black uppercase text-emerald-900 flex items-center gap-1.5">
                <HelpCircle size={16} className="text-emerald-600" /> CHECK QUESTIONS (2 Questions)
              </h4>
              <div className="space-y-3.5">
                {questionsP1.map((q) => {
                  const selected = selectedAnswers[q.id];
                  const isCorrect = selected === q.correct;

                  return (
                    <div key={q.id} className="p-4 sm:p-5 bg-white rounded-2xl border border-emerald-200 space-y-3 shadow-sm">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="text-sm sm:text-base lg:text-lg font-black text-slate-900">{q.question}</p>
                        {selected && (
                          <span className={`text-xs font-black px-2.5 py-1 rounded-xl flex items-center gap-1 animate-in zoom-in-95 ${
                            isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {isCorrect ? '✓ Correct! +10 XP' : '❌ Try another option'}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {q.shuffledOptions.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSelectAnswer(q.id, opt, q.correct)}
                            className={`px-4 sm:px-5 py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition border text-left flex items-center gap-2.5 ${
                              selected === opt
                                ? isCorrect
                                  ? 'bg-emerald-600 text-white border-emerald-500 font-black shadow-md scale-[1.02]'
                                  : 'bg-rose-600 text-white border-rose-500'
                                : 'bg-slate-50 hover:bg-emerald-100 text-slate-800 border-slate-200'
                            }`}
                          >
                            <span className="w-6 h-6 rounded-full bg-white/30 text-xs font-black flex items-center justify-center shrink-0">
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
              className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-sm sm:text-base shadow-lg flex items-center gap-2 transition active:scale-95 hover:scale-105 cursor-pointer"
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
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-md space-y-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-teal-700 border-b border-slate-100 pb-3">
              <span>📖 PARAGRAPH 2: {(clilData?.part_2_title || clilData?.title || 'CLIL ARTICLE').toUpperCase()}</span>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-900 font-bold leading-relaxed sm:leading-loose">
              {renderParsedText(paragraphs[1] || paragraphs[0], 'teal', null, false, activeHighlightMode, activeHighlightMode === 'grammar' ? [activeScopedPattern].filter(Boolean) : vocabPills)}
            </p>

            {/* Paragraph 2 Check Questions */}
            <div className="p-5 sm:p-6 bg-teal-50/70 rounded-2xl sm:rounded-3xl border border-teal-200 space-y-4 pt-4">
              <h4 className="text-xs sm:text-sm font-black uppercase text-teal-900 flex items-center gap-1.5">
                <HelpCircle size={16} className="text-teal-600" /> CHECK QUESTIONS (2 Questions)
              </h4>
              <div className="space-y-3.5">
                {questionsP2.map((q) => {
                  const selected = selectedAnswers[q.id];
                  const isCorrect = selected === q.correct;

                  return (
                    <div key={q.id} className="p-4 sm:p-5 bg-white rounded-2xl border border-teal-200 space-y-3 shadow-sm">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="text-sm sm:text-base lg:text-lg font-black text-slate-900">{q.question}</p>
                        {selected && (
                          <span className={`text-xs font-black px-2.5 py-1 rounded-xl flex items-center gap-1 animate-in zoom-in-95 ${
                            isCorrect ? 'bg-teal-100 text-teal-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {isCorrect ? '✓ Correct! +10 XP' : '❌ Try another option'}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {q.shuffledOptions.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSelectAnswer(q.id, opt, q.correct)}
                            className={`px-4 sm:px-5 py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition border text-left flex items-center gap-2.5 ${
                              selected === opt
                                ? isCorrect
                                  ? 'bg-teal-600 text-white border-teal-500 font-black shadow-md scale-[1.02]'
                                  : 'bg-rose-600 text-white border-rose-500'
                                : 'bg-slate-50 hover:bg-teal-100 text-slate-800 border-slate-200'
                            }`}
                          >
                            <span className="w-6 h-6 rounded-full bg-white/30 text-xs font-black flex items-center justify-center shrink-0">
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
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer"
            >
              ◀ Back to Part 1
            </button>
            <button
              type="button"
              onClick={() => setCurrentPhase(3)}
              className="px-7 py-3.5 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl font-black text-sm sm:text-base shadow-lg flex items-center gap-2 transition active:scale-95 hover:scale-105 cursor-pointer"
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
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧩</span>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">Sentence Builder Quest</h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
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
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${
                    sbIdx === i ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  #{i+1} {d.label}
                </button>
              ))}
            </div>

            {/* Built sentence display */}
            <div className="min-h-[70px] p-4 sm:p-5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 flex flex-wrap gap-2.5 items-start">
              {sbBuilt.length === 0 ? (
                <span className="text-sm text-slate-400 italic">Tap chunks below in the correct grammar order…</span>
              ) : (
                sbBuilt.map((chunk, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSbRemove(i)}
                    className="px-4 py-2 bg-purple-100 hover:bg-rose-100 text-purple-900 hover:text-rose-700 border border-purple-300 hover:border-rose-300 rounded-xl text-xs sm:text-sm font-bold transition active:scale-95 cursor-pointer"
                  >
                    {chunk} ×
                  </button>
                ))
              )}
            </div>

            {/* Remaining chips */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2.5">
                {sbRemaining.map((chunk, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSbSelect(chunk)}
                    className="px-4 py-2.5 bg-white hover:bg-emerald-50 text-slate-800 border border-slate-300 hover:border-emerald-400 rounded-xl text-xs sm:text-sm font-bold transition active:scale-95 shadow-sm cursor-pointer"
                  >
                    {chunk}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-wrap pt-1">
              <button
                type="button"
                onClick={handleSbCheck}
                disabled={sbBuilt.length === 0}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-black text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
              >
                <CheckCircle2 size={16} /> Check Order
              </button>
              <button
                type="button"
                onClick={handleSbReset}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs sm:text-sm rounded-xl flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw size={15} /> Reset
              </button>
              {sbResult && (
                <div className={`flex-1 min-w-0 p-3 rounded-xl border text-xs sm:text-sm font-black flex items-center gap-2 animate-in fade-in ${
                  sbResult.correct ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-rose-50 border-rose-300 text-rose-800'
                }`}>
                  {sbResult.correct ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  {sbResult.msg}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentPhase(2)}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer"
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
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-white rounded-2xl font-black text-sm sm:text-base shadow-xl flex items-center gap-2 transition hover:scale-105 animate-bounce cursor-pointer"
            >
              🎉 Claim CLIL Passport & Return to Map ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

