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
    return [];
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
  const questionsP2 = useMemo(() => allQuestions.slice(2), [allQuestions]);

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
    const partAudioUrl = currentPhase === 1
      ? `/audio/week${weekNumber || 33}/clil_friction_p1.mp3`
      : `/audio/week${weekNumber || 33}/clil_friction_p2.mp3`;
    try {
      await VoiceService.speak(partText, 'explore', partAudioUrl, weekNumber);
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
    }
  };

  const renderModeControlBar = () => (
    <div className="p-2 sm:p-3 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between flex-wrap gap-1.5 sm:gap-2">
      <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-100 p-1 rounded-lg sm:rounded-xl">
        <span className="text-[10px] sm:text-xs font-black text-slate-500 uppercase px-1 hidden xs:inline">Mode:</span>
        <button
          type="button"
          onClick={() => handleModeSwitch('vocab')}
          className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${
            activeHighlightMode === 'vocab' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🔤 Vocab Focus
        </button>
        <button
          type="button"
          onClick={() => handleModeSwitch('grammar')}
          className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${
            activeHighlightMode === 'grammar' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🔬 Grammar X-Ray
        </button>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        <button
          type="button"
          onClick={handleToggleWholeAudio}
          className={`px-3 py-1 sm:py-1.5 font-black text-xs sm:text-sm rounded-lg sm:rounded-xl shadow-xs flex items-center gap-1 transition active:scale-95 cursor-pointer ${
            playingAudioType === 'whole'
              ? 'bg-rose-600 text-white animate-pulse'
              : 'bg-teal-700 hover:bg-teal-600 text-white'
          }`}
          title={playingAudioType === 'whole' ? 'Click to stop whole text audio' : 'Listen to full article audio'}
        >
          <Volume2 size={13} /> <span>{playingAudioType === 'whole' ? '⏹ Stop All' : '🔊 Play All'}</span>
        </button>
        <button
          type="button"
          onClick={handleTogglePartAudio}
          className={`px-3 py-1 sm:py-1.5 font-black text-xs sm:text-sm rounded-lg sm:rounded-xl shadow-xs flex items-center gap-1 transition active:scale-95 cursor-pointer ${
            playingAudioType === 'part'
              ? 'bg-rose-600 text-white animate-pulse'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
          title={playingAudioType === 'part' ? 'Click to stop this part audio' : 'Listen to current part audio'}
        >
          <Volume2 size={13} /> <span>{playingAudioType === 'part' ? `⏹ Stop Part ${currentPhase}` : `🎧 Play Part ${currentPhase}`}</span>
        </button>
      </div>
    </div>
  );

  const renderGrammarBanner = () => {
    if (activeHighlightMode !== 'grammar') return null;
    return (
      <div className="p-2.5 sm:p-3.5 bg-amber-50/90 border border-amber-300 rounded-xl sm:rounded-2xl space-y-1.5 shadow-xs animate-in fade-in">
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-black uppercase text-amber-900 tracking-wider flex items-center gap-1">
            <BookOpen size={13} className="text-amber-700" /> Grammar X-Ray: {activeGrammarInfo?.label || 'Target Grammar Focus'}
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
            Grammar Focus
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 text-[11px] sm:text-xs font-black text-amber-950">
          {grammarLegend.length === 0 && (
            <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg border border-amber-300">
              ℹ️ Focuses on vocabulary and comprehension.
            </span>
          )}
          {grammarLegend.map((g, i) => (
            <span key={i} className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-amber-200/90 rounded-lg border border-amber-300">{g}</span>
          ))}
        </div>
        {grammarLegend.length > 0 && (
          <p className="text-[10.5px] sm:text-xs text-amber-800 font-bold">
            👇 Highlighted inline inside the paragraph below.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full space-y-2.5 sm:space-y-4 font-sans text-slate-900">
      {/* Stepper Header (Zero-L1) */}
      <div className="flex items-center justify-between px-1 flex-wrap gap-1.5 sm:gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <span className="text-xs sm:text-sm md:text-base font-black text-emerald-900 bg-emerald-100 px-3 py-1 sm:px-4 sm:py-1.5 rounded-xl border border-emerald-200 shadow-xs">
            {currentPhase === 1 && `🔬 Part 1: ${clilData?.part_1_title || clilData?.title_en || clilData?.title || 'Science Principles'}`}
            {currentPhase === 2 && `🧪 Part 2: ${clilData?.part_2_title || clilData?.title_en || clilData?.title || 'Real-World Applications'}`}
            {currentPhase === 3 && '🎓 Part 3: Sentence Builder'}
          </span>
          <span className="text-[11px] sm:text-xs font-bold text-slate-500">
            {currentPhase}/3
          </span>
        </div>

        {/* Right Header: Progress Bar & Compact Stamp Icon */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-20 sm:w-36 h-2 sm:h-3 bg-slate-200 rounded-full overflow-hidden">
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
            className="flex items-center gap-1 px-2.5 py-1 sm:px-3.5 sm:py-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 text-white rounded-lg sm:rounded-xl font-black text-[10.5px] sm:text-xs shadow-xs border border-emerald-400/40 cursor-pointer active:scale-95 transition"
          >
            <Award size={14} className="text-amber-300 animate-pulse" />
            <span className="tracking-wide">Science LV.1</span>
          </button>
        </div>
      </div>

      {/* Mode Active Banner & Word Pills */}
      {activeHighlightMode === 'vocab' && (
        <div className="p-2.5 sm:p-4 bg-emerald-50/90 border border-emerald-300 rounded-xl sm:rounded-2xl space-y-2 shadow-xs animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-black uppercase text-emerald-900 tracking-wider flex items-center gap-1">
              <Sparkles size={13} className="text-emerald-700" /> Key Chunks ({vocabPills.length})
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
              Word Bank
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {vocabPills.map((w, idx) => (
              <div
                key={idx}
                className="px-2.5 py-1 bg-white hover:bg-emerald-50/80 border border-emerald-300 text-emerald-950 font-black text-[11px] sm:text-xs rounded-lg sm:rounded-xl shadow-2xs transition flex items-center gap-1"
              >
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); speakText(w); }}
                  title={`Tap to hear: ${w}`}
                  className="p-0.5 hover:bg-emerald-100 rounded text-emerald-700 transition cursor-pointer shrink-0"
                >
                  <Volume2 size={11} />
                </button>
                <span className="cursor-pointer">{renderParsedText(w, 'emerald', null, false, 'vocab', [w])}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CLIL Glossary Section */}
      {Array.isArray(clilData?.glossary) && clilData.glossary.length > 0 && (
        <div className="p-2.5 sm:p-4 bg-teal-50/90 border border-teal-200 rounded-xl sm:rounded-2xl space-y-2 shadow-xs">
          <div className="flex items-center justify-between flex-wrap gap-1">
            <span className="text-[11px] sm:text-xs font-black uppercase text-teal-900 tracking-wider flex items-center gap-1">
              <BookOpen size={13} className="text-teal-700" /> Glossary
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full border border-teal-300">
              Click term for dictionary
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {clilData.glossary.map((item, idx) => {
              const termStr = item.term || item.word || '';
              return (
                <div
                  key={idx}
                  data-testid="clil-glossary-chip"
                  className="px-2.5 py-1 bg-white border border-teal-300 text-teal-950 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold shadow-2xs flex items-center gap-1 hover:bg-teal-50/80 transition"
                >
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); speakText(termStr); }}
                    title={`Tap to hear: ${termStr}`}
                    className="p-0.5 hover:bg-teal-100 rounded text-teal-700 transition cursor-pointer shrink-0"
                  >
                    <Volume2 size={11} />
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

      {/* ========================================================================= */}
      {/* PHASE 1: PARAGRAPH 1 + 2 CHECK QUESTIONS                                  */}
      {/* ========================================================================= */}
      {currentPhase === 1 && (
        <div className="space-y-2.5 sm:space-y-4 animate-in fade-in">
          {/* Mode Control Bar */}
          {renderModeControlBar()}

          {/* Grammar X-Ray Legend Banner */}
          {renderGrammarBanner()}

          <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 lg:p-6 border border-slate-200 shadow-md space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-wider text-emerald-700 border-b border-slate-100 pb-1.5">
              <span>📖 PARAGRAPH 1: {(clilData?.part_1_title || clilData?.title || 'CLIL ARTICLE').toUpperCase()}</span>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-slate-900 font-bold leading-relaxed sm:leading-loose">
              {renderParsedText(paragraphs[0], 'emerald', null, false, activeHighlightMode, activeHighlightMode === 'grammar' ? [activeScopedPattern].filter(Boolean) : vocabPills)}
            </p>

            {/* Paragraph 1 Check Questions (2-Column Options Grid) */}
            <div className="p-2.5 sm:p-4 bg-emerald-50/70 rounded-xl sm:rounded-2xl border border-emerald-200 space-y-2.5 pt-2 sm:pt-3">
              <h4 className="text-[11px] sm:text-xs font-black uppercase text-emerald-900 flex items-center gap-1">
                <HelpCircle size={14} className="text-emerald-600" /> CHECK QUESTIONS ({questionsP1.length} Questions)
              </h4>
              <div className="space-y-2 sm:space-y-2.5">
                {questionsP1.map((q) => {
                  const selected = selectedAnswers[q.id];
                  const isCorrect = selected === q.correct;

                  return (
                    <div key={q.id} className="p-2.5 sm:p-3.5 bg-white rounded-xl sm:rounded-2xl border border-emerald-200 space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <p className="text-xs sm:text-sm lg:text-base font-black text-slate-900">{q.question}</p>
                        {selected && (
                          <span className={`text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-lg flex items-center gap-1 animate-in zoom-in-95 ${
                            isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {isCorrect ? '✓ Correct! +10 XP' : '❌ Try another option'}
                          </span>
                        )}
                      </div>
                      {/* 2-Column Options Grid */}
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                        {q.shuffledOptions.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSelectAnswer(q.id, opt, q.correct)}
                            className={`p-2 sm:px-3 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition border text-left flex items-center gap-1.5 cursor-pointer ${
                              selected === opt
                                ? isCorrect
                                  ? 'bg-emerald-600 text-white border-emerald-500 font-black shadow-xs scale-[1.01]'
                                  : 'bg-rose-600 text-white border-rose-500'
                                : 'bg-slate-50 hover:bg-emerald-100 text-slate-800 border-slate-200'
                            }`}
                          >
                            <span className="w-4 h-4 rounded-full bg-black/10 text-[9.5px] font-black flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="line-clamp-2 leading-tight">{opt}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => setCurrentPhase(2)}
              className="px-5 py-2.5 sm:px-7 sm:py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition active:scale-95 hover:scale-105 cursor-pointer"
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
        <div className="space-y-2.5 sm:space-y-4 animate-in fade-in">
          {/* Mode Control Bar */}
          {renderModeControlBar()}

          {/* Grammar X-Ray Legend Banner */}
          {renderGrammarBanner()}

          <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 lg:p-6 border border-slate-200 shadow-md space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-wider text-teal-700 border-b border-slate-100 pb-1.5">
              <span>📖 PARAGRAPH 2: {(clilData?.part_2_title || clilData?.title || 'CLIL ARTICLE').toUpperCase()}</span>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-slate-900 font-bold leading-relaxed sm:leading-loose">
              {renderParsedText(paragraphs[1] || paragraphs[0], 'teal', null, false, activeHighlightMode, activeHighlightMode === 'grammar' ? [activeScopedPattern].filter(Boolean) : vocabPills)}
            </p>

            {/* Paragraph 2 Check Questions (2-Column Options Grid) */}
            <div className="p-2.5 sm:p-4 bg-teal-50/70 rounded-xl sm:rounded-2xl border border-teal-200 space-y-2.5 pt-2 sm:pt-3">
              <h4 className="text-[11px] sm:text-xs font-black uppercase text-teal-900 flex items-center gap-1">
                <HelpCircle size={14} className="text-teal-600" /> CHECK QUESTIONS ({questionsP2.length} Questions)
              </h4>
              <div className="space-y-2 sm:space-y-2.5">
                {questionsP2.map((q) => {
                  const selected = selectedAnswers[q.id];
                  const isCorrect = selected === q.correct;

                  return (
                    <div key={q.id} className="p-2.5 sm:p-3.5 bg-white rounded-xl sm:rounded-2xl border border-teal-200 space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <p className="text-xs sm:text-sm lg:text-base font-black text-slate-900">{q.question}</p>
                        {selected && (
                          <span className={`text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-lg flex items-center gap-1 animate-in zoom-in-95 ${
                            isCorrect ? 'bg-teal-100 text-teal-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {isCorrect ? '✓ Correct! +10 XP' : '❌ Try another option'}
                          </span>
                        )}
                      </div>
                      {/* 2-Column Options Grid */}
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                        {q.shuffledOptions.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSelectAnswer(q.id, opt, q.correct)}
                            className={`p-2 sm:px-3 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition border text-left flex items-center gap-1.5 cursor-pointer ${
                              selected === opt
                                ? isCorrect
                                  ? 'bg-teal-600 text-white border-teal-500 font-black shadow-xs scale-[1.01]'
                                  : 'bg-rose-600 text-white border-rose-500'
                                : 'bg-slate-50 hover:bg-teal-100 text-slate-800 border-slate-200'
                            }`}
                          >
                            <span className="w-4 h-4 rounded-full bg-black/10 text-[9.5px] font-black flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="line-clamp-2 leading-tight">{opt}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setCurrentPhase(1)}
              className="px-4 py-2 sm:px-6 sm:py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer"
            >
              ◀ Back to Part 1
            </button>
            <button
              type="button"
              onClick={() => setCurrentPhase(3)}
              className="px-5 py-2.5 sm:px-7 sm:py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition active:scale-95 hover:scale-105 cursor-pointer"
            >
              Sentence Builder ▶
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHASE 3: SENTENCE BUILDER QUEST + PASSPORT STAMP & COMPLETION             */}
      {/* ========================================================================= */}
      {currentPhase === 3 && (
        <div className="space-y-2.5 sm:space-y-4 animate-in fade-in">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-6 border border-slate-200 shadow-md space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 flex-wrap gap-1">
              <div className="flex items-center gap-1.5">
                <span className="text-lg">🧩</span>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900">Sentence Builder Quest</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                    Tap the scrambled chunks in the correct grammar order
                  </p>
                </div>
              </div>
            </div>

            {/* Drill selector */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {sentenceDrills.map((d, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setSbIdx(i); setSbBuilt([]); setSbResult(null); }}
                  className={`px-3 py-1.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${
                    sbIdx === i ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  #{i+1} {d.label}
                </button>
              ))}
            </div>

            {/* Built sentence display */}
            <div className="min-h-[50px] p-2.5 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border-2 border-dashed border-slate-300 flex flex-wrap gap-1.5 sm:gap-2 items-start">
              {sbBuilt.length === 0 ? (
                <span className="text-xs sm:text-sm text-slate-400 italic">Tap chunks below in the correct grammar order…</span>
              ) : (
                sbBuilt.map((chunk, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSbRemove(i)}
                    className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-purple-100 hover:bg-rose-100 text-purple-900 hover:text-rose-700 border border-purple-300 hover:border-rose-300 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition active:scale-95 cursor-pointer"
                  >
                    {chunk} ×
                  </button>
                ))
              )}
            </div>

            {/* Remaining chips */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {sbRemaining.map((chunk, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSbSelect(chunk)}
                    className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-white hover:bg-emerald-50 text-slate-800 border border-slate-300 hover:border-emerald-400 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition active:scale-95 shadow-2xs cursor-pointer"
                  >
                    {chunk}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-wrap pt-0.5">
              <button
                type="button"
                onClick={handleSbCheck}
                disabled={sbBuilt.length === 0}
                className="px-4.5 py-2 sm:px-6 sm:py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-black text-xs sm:text-sm rounded-xl shadow-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
              >
                <CheckCircle2 size={15} /> Check Order
              </button>
              <button
                type="button"
                onClick={handleSbReset}
                className="px-3.5 py-2 sm:px-5 sm:py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs sm:text-sm rounded-xl flex items-center gap-1 transition cursor-pointer"
              >
                <RotateCcw size={14} /> Reset
              </button>
              {sbResult && (
                <div className={`flex-1 min-w-0 p-2 sm:p-2.5 rounded-xl border text-[11px] sm:text-xs font-black flex items-center gap-1.5 animate-in fade-in ${
                  sbResult.correct ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-rose-50 border-rose-300 text-rose-800'
                }`}>
                  {sbResult.correct ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                  <span className="truncate">{sbResult.msg}</span>
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

