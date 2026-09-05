import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Volume2, Mic, Square, CheckCircle2, XCircle, HelpCircle, ArrowRight, Sparkles, Award, RotateCcw, Eye, EyeOff, Keyboard, PlayCircle } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import VoiceService from '../../services/voiceService';
import LexioMascot from '../../components/mascot/LexioMascot';
import GrammarHintButton from '../../components/common/GrammarHintButton';
import MicFallbackInput from '../../components/common/MicFallbackInput';
import { evaluateSpeechSyntax } from '../../utils/speechSyntaxEvaluator';
import useDailyQuestStore from '../../stores/useDailyQuestStore';
import { useStationProgress } from '../../hooks/useStationProgress';
import { emitLearningEvent, GAMIFICATION_EVENTS } from '../../services/gamificationEventBus';


/**
 * InfoExchangeZone — Authentic Cambridge A2 Flyers Speaking Part 2
 * Fully responsive: Mobile stacked layout (375px), Tablet (1024px), Laptop (1440px).
 */
export default function InfoExchangeZone({ data, weekNumber, onComplete, onBackToMap }) {
  const routeParams = useParams();
  const activeWeek = weekNumber || (routeParams?.weekId ? parseInt(routeParams.weekId) : null) || data?.weekNumber || data?.week || data?.rawWeekData?.weekNumber || null;

  const wasAlreadyCompleted = useDailyQuestStore((s) => s.isQuestCompleted(activeWeek, 'info_exchange'));
  const { savedData, saveProgress } = useStationProgress(activeWeek, 'info_exchange');

  const [phase, setPhase] = useState('table_b'); // 'table_b' (Card 1: Answer Examiner) -> 'table_a' (Card 2: Ask Examiner) -> 'complete'
  
  // Phase 1 (Table A) State
  const [cueIdxA, setCueIdxA] = useState(0);
  const [completedIdsA, setCompletedIdsA] = useState(new Set());
  const [isRecordingA, setIsRecordingA] = useState(false);
  const [showHintA, setShowHintA] = useState(false);
  const [transcriptA, setTranscriptA] = useState('');
  const [evalResultA, setEvalResultA] = useState(null);
  const [retryCountA, setRetryCountA] = useState(0);
  const [showTextInputA, setShowTextInputA] = useState(false);
  const [manualTextA, setManualTextA] = useState('');
  
  // Phase 2 (Table B) State
  const [fieldIdxB, setFieldIdxB] = useState(0);
  const [isRecordingB, setIsRecordingB] = useState(false);
  const [transcriptB, setTranscriptB] = useState('');
  const [evalResultB, setEvalResultB] = useState(null);
  const [retryCountB, setRetryCountB] = useState(0);
  const [showQuestionTextB, setShowQuestionTextB] = useState(false);
  const [showTextInputB, setShowTextInputB] = useState(false);
  const [manualTextB, setManualTextB] = useState('');
  const [shields, setShields] = useState(0);

  const recognitionRef = useRef(null);

  // Data hydration
  const infoExData = data?.cue_card_info_exchange
    || data?.rawWeekData?.cue_card_info_exchange
    || data?.rawWeekData?.speakingHub?.cue_card_info_exchange
    || data?.speakingHub?.cue_card_info_exchange
    || data?.bossBattle?.speaking?.p2_cueCard
    || data?.stations?.ask_ai?.cue_card_info_exchange
    || null;

  const tableA = infoExData?.table_a;
  const tableB = infoExData?.table_b;
  const cuesA = tableA?.fields || [];
  const currentCueA = cuesA[cueIdxA] || null;
  const fieldsB = tableB?.fields || [];
  const currentFieldB = fieldsB[fieldIdxB] || null;

  const playQuestionAudioB = () => {
    if (currentFieldB?.audio_url) {
      speakText(currentFieldB.nova_question || '', currentFieldB.audio_url);
    } else {
      speakText(currentFieldB?.nova_question || '');
    }
  };

  // Auto-speak Nova's question in Phase 2
  useEffect(() => {
    if (phase === 'table_b' && currentFieldB) {
      setShowQuestionTextB(false);
      const timer = setTimeout(() => {
        playQuestionAudioB();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, fieldIdxB, currentFieldB]);

  // Stop speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  // ─────────────────────────────────────────────────────────────
  // SPEECH RECOGNITION (PHASE 1 - ASKING)
  // ─────────────────────────────────────────────────────────────
  const startRecordingA = () => {
    setTranscriptA('');
    setEvalResultA(null);

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      setShowTextInputA(true);
      return;
    }

    try {
      const rec = new SpeechRec();
      rec.lang = 'en-US';
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => setIsRecordingA(true);
      rec.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscriptA(text);
        const evalRes = evaluateSpeechSyntax(text, currentCueA?.acceptable_questions || [], { mode: 'question', cueWord: currentCueA?.cue_word || '' });
        setEvalResultA(evalRes);
        if (evalRes.isCorrect) {
          setCompletedIdsA(prev => new Set([...prev, currentCueA.id]));
          setTimeout(() => speakText(currentCueA.nova_reply, currentCueA.reply_audio_url), 600);
        } else {
          setRetryCountA(prev => prev + 1);
        }
      };
      rec.onerror = (e) => {
        console.warn('Speech recognition error in Phase 1:', e);
        setIsRecordingA(false);
        setRetryCountA(prev => prev + 1);
        setEvalResultA({ isCorrect: false, score: 0, feedback: "Could not hear audio. Please try again or type!" });
      };
      rec.onend = () => setIsRecordingA(false);

      recognitionRef.current = rec;
      rec.start();
    } catch (err) {
      console.warn('SpeechRec start failed:', err);
      setIsRecordingA(false);
      setShowTextInputA(true);
    }
  };

  const stopRecordingA = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    setIsRecordingA(false);
  };

  const handleManualSubmitA = () => {
    if (!manualTextA.trim()) return;
    setTranscriptA(manualTextA);
    const evalRes = evaluateSpeechSyntax(manualTextA, currentCueA?.acceptable_questions || [], { mode: 'question', cueWord: currentCueA?.cue_word || '' });
    setEvalResultA(evalRes);
    if (evalRes.isCorrect) {
      setCompletedIdsA(prev => new Set([...prev, currentCueA.id]));
      setTimeout(() => speakText(currentCueA.nova_reply, currentCueA.reply_audio_url), 600);
    } else {
      setRetryCountA(prev => prev + 1);
    }
    setShowTextInputA(false);
  };

  const handleRetryA = () => {
    setEvalResultA(null);
    setTranscriptA('');
    setManualTextA('');
  };

  const handleForceAcceptA = () => {
    setCompletedIdsA(prev => new Set([...prev, currentCueA.id]));
    speakText(currentCueA.nova_reply, currentCueA.reply_audio_url);
    setEvalResultA({ isCorrect: true, score: 75, feedback: "Learned with Model Guide!" });
  };

  const handleNextCueA = () => {
    setEvalResultA(null);
    setTranscriptA('');
    setManualTextA('');
    setRetryCountA(0);
    setShowHintA(false);
    setShowTextInputA(false);
    if (cueIdxA + 1 < cuesA.length) {
      setCueIdxA(i => i + 1);
    } else {
      setShields(2);
      setPhase('complete');
      if (activeWeek) {
        useDailyQuestStore.getState().completeQuest(activeWeek, 'info_exchange', { score: 100 });
        saveProgress({ phase: 'complete', shields: 2 }, true, 100);
      }
    }
  };

  // ─────────────────────────────────────────────────────────────
  // SPEECH RECOGNITION (PHASE 2 - ANSWERING)
  // ─────────────────────────────────────────────────────────────
  const startRecordingB = () => {
    setTranscriptB('');
    setEvalResultB(null);

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      setShowTextInputB(true);
      return;
    }

    try {
      const rec = new SpeechRec();
      rec.lang = 'en-US';
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => setIsRecordingB(true);
      rec.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscriptB(text);
        const evalRes = evaluateSpeechSyntax(text, currentFieldB?.acceptable_answers || [], { mode: 'sentence' });
        setEvalResultB(evalRes);
        if (!evalRes.isCorrect) {
          setRetryCountB(prev => prev + 1);
        }
      };
      rec.onerror = (e) => {
        console.warn('Speech recognition error in Phase 2:', e);
        setIsRecordingB(false);
        setRetryCountB(prev => prev + 1);
        setEvalResultB({ isCorrect: false, score: 0, feedback: "Could not hear audio. Please try again or type!" });
      };
      rec.onend = () => setIsRecordingB(false);

      recognitionRef.current = rec;
      rec.start();
    } catch (err) {
      console.warn('SpeechRec start failed:', err);
      setIsRecordingB(false);
      setShowTextInputB(true);
    }
  };

  const stopRecordingB = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    setIsRecordingB(false);
  };

  const handleManualSubmitB = () => {
    if (!manualTextB.trim()) return;
    setTranscriptB(manualTextB);
    const evalRes = evaluateSpeechSyntax(manualTextB, currentFieldB?.acceptable_answers || [], { mode: 'sentence' });

    setEvalResultB(evalRes);
    if (!evalRes.isCorrect) {
      setRetryCountB(prev => prev + 1);
    }
    setShowTextInputB(false);
  };

  const handleRetryB = () => {
    setEvalResultB(null);
    setTranscriptB('');
    setManualTextB('');
  };

  const handleNextQuestionB = () => {
    setEvalResultB(null);
    setTranscriptB('');
    setManualTextB('');
    setRetryCountB(0);
    setShowQuestionTextB(false);
    setShowTextInputB(false);
    if (fieldIdxB + 1 < fieldsB.length) {
      setFieldIdxB(i => i + 1);
    } else {
      setShields(1);
      setPhase('table_a');
      if (activeWeek) {
        useDailyQuestStore.getState().completeQuest(activeWeek, 'info_exchange', { score: 50 });
        saveProgress({ phase: 'table_a', shields: 1, completedCard1: true }, false, 50);
      }
    }
  };

  if (!infoExData || !tableA || !tableB) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh] gap-4 p-8 text-center">
        <LexioMascot size={80} mood="thinking" />
        <p className="text-base font-black text-slate-600">Info Exchange data not found for this week.</p>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // COMPLETE PHASE SCREEN
  // ─────────────────────────────────────────────────────────────
  if (phase === 'complete') {
    return (
      <div className="max-w-3xl mx-auto p-6 sm:p-10 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="inline-block p-4 bg-purple-50 rounded-full border-4 border-purple-200 shadow-xl">
          <LexioMascot size={110} mood="celebrating" />
        </div>
        <div className="space-y-2">
          <span className="px-4 py-1.5 bg-amber-100 text-amber-900 font-black text-xs uppercase tracking-widest rounded-full">
            🏆 Cambridge Speaking Part 2 Practice Completed
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Brilliant Speaking Performance!
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            You successfully formulated WH-questions from cues on Table A, and answered Examiner Nova's questions accurately on Table B!
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 py-3">
          <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-center gap-3">
            <span className="text-3xl">🛡️</span>
            <div className="text-left">
              <p className="text-xs font-black uppercase text-emerald-700">Practice Shields Earned</p>
              <p className="text-xl font-black text-emerald-900">+2 Speaking Shields</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (activeWeek) {
              useDailyQuestStore.getState().completeQuest(activeWeek, 'info_exchange', { score: 100 });
              saveProgress({ phase: 'complete', shields: 2 }, true, 100);
            }
            if (onBackToMap) onBackToMap();
            else if (onComplete) onComplete(100, '');
          }}
          className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-black text-base rounded-2xl shadow-xl shadow-purple-500/30 transition active:scale-95 flex items-center gap-2 mx-auto"
        >
          <CheckCircle2 size={20} />
          <span>✓ Finish Quest & Return to Map (+50 XP)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5">
      {/* Top Banner & Phase Navigation */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <LexioMascot size={36} mood="happy" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 font-black text-[10px] uppercase tracking-wider rounded-md">
                Speaking Practice
              </span>
              {wasAlreadyCompleted && (
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-black text-[10px] rounded-md flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-emerald-700" /> Done
                </span>
              )}
              <span className="text-xs font-bold text-slate-500">
                {phase === 'table_b' ? `Question ${fieldIdxB + 1} / ${fieldsB.length}` : `Cue ${cueIdxA + 1} / ${cuesA.length}`}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
              {phase === 'table_b' ? "Phase 1: Answer Examiner's Questions" : "Phase 2: Ask Questions from Cues"}
            </h1>
          </div>
        </div>

        {/* Phase Pill Indicators */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => setPhase('table_b')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
              phase === 'table_b' ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-300' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
            }`}
          >
            <span>🎙️ Card 1 (You Answer)</span>
            {(fieldIdxB >= fieldsB.length || phase === 'table_a') && <CheckCircle2 size={13} className="text-emerald-300" />}
          </button>
          <ArrowRight size={14} className="text-slate-300" />
          <button
            type="button"
            onClick={() => setPhase('table_a')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
              phase === 'table_a' ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
            }`}
          >
            <span>📋 Card 2 (You Ask)</span>
          </button>
        </div>
      </div>

      {/* Model Dialogue Control Bar (Interactive Demo) */}
      <div className="p-3.5 bg-purple-50/90 border border-purple-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black uppercase text-purple-900 flex items-center gap-1.5">
            <Volume2 size={14} className="text-purple-700" /> Model Dialogue:
          </span>
          <span className="text-xs text-purple-700 font-medium">Listen to examiner & candidate conversation example</span>
        </div>
        <button
          type="button"
          data-testid="ie-model-dialogue-btn"
          onClick={() => {
            const url = infoExData?.audio_url || `/audio/week${activeWeek || 33}/exam_intro_S2.mp3`;
            VoiceService.speak("Where did the accident happen? It happened in the school corridor.", 'story', url).catch(() => {
              speakText("Where did the accident happen? It happened in the school corridor.", url);
            });
          }}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black transition flex items-center gap-2 shadow-sm active:scale-95 cursor-pointer"
          title="Play full examiner and candidate model dialogue"
        >
          <PlayCircle size={14} /> ▶ Play Model Dialogue
        </button>
      </div>

      {/* Main Responsive Layout: Stack vertically on Mobile (<1024px), Side-by-side on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ── LEFT COLUMN: Cambridge Candidate Booklet (7 Cols - Authentic 2-Column Table) ── */}
        <div className="w-full lg:col-span-7 bg-white rounded-3xl border-2 border-indigo-200 shadow-md overflow-hidden">
          <div className={`px-4 sm:px-5 py-3.5 sm:py-4 flex flex-col gap-0.5 text-white ${
            phase === 'table_b' ? 'bg-gradient-to-r from-purple-600 to-purple-700' : 'bg-gradient-to-r from-indigo-600 to-indigo-700'
          }`}>
            <span className="font-black text-sm sm:text-base flex items-center gap-2">
              <span>📄</span>
              <span>{phase === 'table_b' ? `Card 1: ${tableB.title}` : `Card 2: ${tableA.title}`}</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-indigo-100 uppercase tracking-wider">
              {phase === 'table_b' ? (tableB.subtitle || "Candidate's Information Sheet — Answer Examiner's Questions") : (tableA.subtitle || "Candidate's Question Card — Ask Examiner Nova")}
            </span>
          </div>

          {/* Cambridge 2-Column Table Header */}
          <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-500">
            <span className="hidden sm:inline-block sm:w-1/2">WH- Cues / Prompts</span>
            <span className="hidden sm:inline-block sm:w-1/2 text-left">{phase === 'table_b' ? 'Information / Facts' : 'Questions / Answers'}</span>
            <span className="sm:hidden w-full text-center">{phase === 'table_b' ? 'Card 1: Prompts & Facts' : 'Card 2: Cues & Questions'}</span>
          </div>

          <div className="divide-y divide-slate-100 p-2">
            {phase === 'table_b' ? (
              fieldsB.map((f, idx) => {
                const isActive = fieldIdxB === idx;
                const isPassed = fieldIdxB > idx;
                const cueText = f.cue_prompt || f.topic || f.label || `prompt ${idx + 1}`;

                return (
                  <div
                    key={f.id || idx}
                    onClick={() => {
                      setFieldIdxB(idx);
                      setEvalResultB(null);
                      setTranscriptB('');
                      setManualTextB('');
                      setShowQuestionTextB(false);
                    }}
                    className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-100 via-indigo-50 to-purple-50 border-2 border-purple-600 shadow-lg ring-4 ring-purple-400/40 scale-[1.01]'
                        : isPassed
                        ? 'bg-emerald-50/70 border border-emerald-200 hover:bg-emerald-100/50'
                        : 'bg-white hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    {/* Line 1 (Mobile) / Left Cell (Desktop): WH- Cue with Speaker & Active Tag */}
                    <div className="flex-1 flex items-center gap-1.5 min-w-0 flex-wrap sm:flex-nowrap">
                      <span className={`text-[11px] font-mono font-bold shrink-0 ${isActive ? 'text-purple-700' : 'text-slate-400'}`}>0{idx + 1}.</span>
                      <span className={`text-xs sm:text-sm font-black font-mono lowercase whitespace-normal break-words ${isActive ? 'text-purple-950 font-black' : 'text-purple-900'}`}>
                        {cueText}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(f.nova_question || f.label, f.audio_url);
                        }}
                        className={`p-1 rounded transition shrink-0 cursor-pointer ${isActive ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-sm' : 'hover:bg-purple-200 text-purple-600'}`}
                        title="Replay Examiner Nova's question"
                      >
                        <Volume2 size={13} />
                      </button>
                      {isActive && (
                        <span className="inline-flex items-center px-2 py-0.5 bg-purple-600 text-white rounded-full text-[9px] font-black uppercase tracking-wider shrink-0 animate-pulse">
                          👉 Current
                        </span>
                      )}
                    </div>

                    {/* Line 2 (Mobile with top border) / Right Cell (Desktop): Fact / Answer */}
                    <div className="flex-1 flex items-center justify-between sm:justify-start gap-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-purple-100/80 sm:border-transparent text-left">
                      <span className={`text-xs sm:text-sm leading-snug whitespace-normal break-words ${isActive ? 'font-black text-purple-950 underline decoration-purple-400 decoration-2' : 'font-bold text-slate-800'}`}>
                        {f.value}
                      </span>
                      {isPassed && <CheckCircle2 size={16} className="text-emerald-600 shrink-0 ml-auto" />}
                    </div>
                  </div>
                );
              })
            ) : (
              cuesA.map((cue, idx) => {
                const isTarget = currentCueA?.id === cue.id;
                const isDone = completedIdsA.has(cue.id);

                return (
                  <div
                    key={cue.id}
                    onClick={() => {
                      setCueIdxA(idx);
                      setEvalResultA(null);
                      setTranscriptA('');
                      setManualTextA('');
                    }}
                    className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 ${
                      isTarget
                        ? 'bg-gradient-to-r from-amber-100 via-orange-50 to-amber-50 border-2 border-amber-500 shadow-lg ring-4 ring-amber-400/40 scale-[1.01]'
                        : isDone
                        ? 'bg-emerald-50/70 border border-emerald-200 hover:bg-emerald-100/50'
                        : 'bg-white hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    {/* Line 1 (Mobile) / Left Cell (Desktop): WH- Cue */}
                    <div className="flex-1 flex items-center gap-1.5 min-w-0 flex-wrap sm:flex-nowrap">
                      <span className={`text-[11px] font-mono font-bold shrink-0 ${isTarget ? 'text-amber-700' : 'text-slate-400'}`}>0{idx + 1}.</span>
                      <span className={`text-xs sm:text-sm font-black font-mono lowercase whitespace-normal break-words ${isTarget ? 'text-amber-950 font-black' : 'text-slate-800'}`}>
                        {cue.label}
                      </span>
                      {isTarget && (
                        <span className="inline-flex items-center px-2 py-0.5 bg-amber-500 text-slate-950 rounded-full text-[9px] font-black uppercase tracking-wider shrink-0 animate-pulse">
                          👉 Ask This
                        </span>
                      )}
                    </div>

                    {/* Line 2 (Mobile) / Right Cell (Desktop): Question Status / Nova Answer */}
                    <div className="flex-1 flex items-center justify-between sm:justify-start gap-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-amber-100/80 sm:border-transparent text-left">
                      {isDone ? (
                        <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs sm:text-sm">
                          <span className="whitespace-normal break-words">{cue.nova_reply?.split('.')[0]}</span>
                          <CheckCircle2 size={16} className="text-emerald-600 shrink-0 ml-auto" />
                        </div>
                      ) : (
                        <span className={`px-2.5 py-0.5 rounded-md text-xs font-black ${
                          isTarget ? 'bg-amber-400 text-slate-950 animate-pulse ring-2 ring-amber-300' : 'bg-slate-100 text-slate-400'
                        }`}>
                          ?
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN: Voice Question Formulation & Examiner Arena (5 Cols - Compact) ── */}
        <div className="w-full lg:col-span-5 space-y-4">
          {phase === 'table_a' ? (
            /* PHASE 1: CANDIDATE FORMS & SPEAKS QUESTION */
            <div className="bg-white rounded-3xl p-4 sm:p-7 border border-amber-200 shadow-md space-y-4 sm:space-y-5">
              {/* Cue Display (Cambridge Format) */}
              <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <span className="text-[11px] font-black uppercase text-amber-800 tracking-wider flex items-center gap-1.5">
                    <HelpCircle size={14} className="text-amber-600" />
                    CURRENT CUE (0{cueIdxA + 1}/{cuesA.length}):
                  </span>
                  <span className="px-2 py-0.5 bg-amber-200/80 text-amber-950 font-black text-[10px] rounded uppercase">
                    {currentCueA?.cue_word?.toUpperCase()} QUESTION
                  </span>
                </div>

                <p className="text-xl sm:text-2xl font-black text-amber-950 font-mono">
                  {currentCueA?.cue_prompt}
                </p>

                <p className="text-xs font-bold text-amber-800">
                  Formulate and ask a complete question using this cue!
                </p>

                {/* Mobile & Desktop Inline Model Question Peek & Starter Hint */}
                <div className="pt-2 border-t border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  {showHintA ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="text-xs sm:text-sm font-black text-amber-950 animate-in fade-in leading-snug space-y-1">
                        {(currentCueA?.acceptable_questions?.slice(0, 2) || []).map((q, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span className="text-[10px] uppercase font-black px-1.5 py-0.5 bg-amber-200 text-amber-900 rounded">
                              Model {idx + 1}:
                            </span>
                            <span>"{q}"</span>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const spoken = (currentCueA?.acceptable_questions?.slice(0, 2) || []).join('. Or: ');
                          speakText(spoken, currentCueA?.model_audio_url || currentCueA?.audio_url);
                        }}
                        className="p-1.5 bg-amber-300 hover:bg-amber-400 text-amber-950 rounded-lg transition shrink-0 flex items-center gap-1 text-xs font-bold"
                        title="Listen to model question(s)"
                      >
                        <Volume2 size={14} /> Listen
                      </button>
                    </div>
                  ) : (
                    <div className="text-[11px] sm:text-xs text-amber-800 font-bold flex items-center gap-1.5">
                      <span>💡 Hint starter:</span>
                      <span className="font-mono font-black text-amber-950 px-2 py-0.5 bg-amber-200 rounded">
                        {currentCueA?.cue_word?.toUpperCase()} did ... ?
                      </span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowHintA(p => !p)}
                    className="text-[11px] font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 underline self-end sm:self-auto cursor-pointer shrink-0"
                  >
                    {showHintA ? <EyeOff size={12} /> : <Eye size={12} />}
                    {showHintA ? 'Hide model question' : 'Peek model question'}
                  </button>
                </div>
              </div>

              {/* Reusable Grammar Structure Hint */}
              <GrammarHintButton
                hintText={`${currentCueA?.cue_word?.toUpperCase()} + did + [subject] + [base verb] ... ?`}
                label="Need a grammar hint?"
              />

              {/* Central Voice Recording / Keyboard Input */}
              {!evalResultA ? (
                <div className="flex flex-col items-center justify-center gap-3 py-3">
                  {!showTextInputA ? (
                    <>
                      {!isRecordingA ? (
                        <button
                          type="button"
                          onClick={startRecordingA}
                          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-400 text-white flex flex-col items-center justify-center gap-1 shadow-2xl shadow-orange-500/30 transition hover:scale-105 active:scale-95"
                        >
                          <Mic size={36} className="animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-wider">SPEAK</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={stopRecordingA}
                          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex flex-col items-center justify-center gap-1 shadow-2xl shadow-rose-500/40 animate-bounce"
                        >
                          <Square size={32} fill="currentColor" />
                          <span className="text-[10px] font-black uppercase tracking-wider">STOP</span>
                        </button>
                      )}
                      <p className="text-xs font-black text-slate-600">
                        {isRecordingA ? '🔴 Listening... Speak your question clearly!' : 'Tap SPEAK and ask Nova your question'}
                      </p>
                      <MicFallbackInput
                        onSubmit={(typedText) => {
                          setManualTextA(typedText);
                          setTranscriptA(typedText);
                          const evalRes = evaluateSpeechSyntax(typedText, currentCueA?.acceptable_questions || [], { mode: 'question', cueWord: currentCueA?.cue_word || '' });
                          setEvalResultA(evalRes);
                          if (evalRes.isCorrect) {
                            setCompletedIdsA(prev => new Set([...prev, currentCueA.id]));
                            setTimeout(() => speakText(currentCueA.nova_reply, currentCueA.reply_audio_url), 600);
                          } else {
                            setRetryCountA(prev => prev + 1);
                          }
                        }}
                        placeholder="e.g. Where did Tom get injured?"
                      />
                    </>
                  ) : null}
                </div>
              ) : (

                /* AI Feedback & Evaluation Card */
                <div className="space-y-4 animate-in fade-in">
                  {/* Student's Spoken Question & Evaluation */}
                  <div className={`p-4 rounded-2xl border-2 ${
                    evalResultA.isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300'
                  }`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                        evalResultA.isCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                      }`}>
                        {evalResultA.isCorrect ? '✓ Question Recognized' : '⚠️ Need Adjustment'}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        Accuracy: {evalResultA.score}%
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-800">
                      You asked: <span className="italic">"{transcriptA || '(unclear audio)'}"</span>
                    </p>
                    <p className={`text-xs font-bold mt-1 ${evalResultA.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {evalResultA.feedback}
                    </p>
                  </div>



                  {/* Nova's Live Reply (If Correct or Accepted) */}
                  {evalResultA.isCorrect ? (
                    <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-start gap-3 text-left">
                      <div className="p-2 bg-emerald-200 rounded-xl shrink-0">
                        <LexioMascot size={32} mood="speaking" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded">
                            EXAMINER NOVA REPLIES:
                          </span>
                          <button
                            type="button"
                            onClick={() => speakText(currentCueA?.nova_reply || '', currentCueA?.reply_audio_url)}
                            className="p-1 bg-emerald-200 hover:bg-emerald-300 text-emerald-900 rounded-lg transition active:scale-95"
                          >
                            <Volume2 size={16} />
                          </button>
                        </div>
                        <p className="text-base font-black text-emerald-950 leading-relaxed">
                          "{currentCueA?.nova_reply}"
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <button
                        type="button"
                        onClick={handleRetryA}
                        className="w-full sm:flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-black text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow"
                      >
                        <RotateCcw size={14} /> Try Asking Again ({retryCountA}/2)
                      </button>
                      {retryCountA >= 2 && (
                        <button
                          type="button"
                          onClick={handleForceAcceptA}
                          className="w-full sm:w-auto py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition border border-slate-200"
                        >
                          Listen to Nova Anyway →
                        </button>
                      )}
                    </div>
                  )}

                  {evalResultA.isCorrect && (
                    <button
                      type="button"
                      onClick={handleNextCueA}
                      className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-white font-black text-sm rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
                    >
                      {cueIdxA + 1 < cuesA.length ? 'Next Cue →' : '🏆 Complete Cambridge Speaking Part 2!'}
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* PHASE 2: EXAMINER ASKS CANDIDATE (AUDIO-ONLY LISTENING) */
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-purple-200 shadow-md space-y-5">
              {/* Examiner Audio Bubble (Question text is HIDDEN by default) */}
              <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-purple-200 rounded-lg">
                      <LexioMascot size={28} mood="speaking" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-200 px-2 py-0.5 rounded">
                        EXAMINER NOVA ASKS ({fieldIdxB + 1}/{fieldsB.length}):
                      </span>
                      <p className="text-xs font-bold text-slate-500 mt-0.5">
                        🎧 Listen carefully to Nova's question:
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={playQuestionAudioB}
                    className="p-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition active:scale-95 shadow-md flex items-center gap-1.5 text-xs font-bold"
                  >
                    <Volume2 size={16} /> Replay Audio
                  </button>
                </div>

                {/* Question Text (Hidden by default, revealable on toggle) */}
                <div className="pt-1.5 border-t border-purple-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  {showQuestionTextB ? (
                    <p className="text-xs sm:text-sm font-black text-purple-950 animate-in fade-in leading-snug">
                      "{currentFieldB?.nova_question}"
                    </p>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black uppercase bg-purple-200 text-purple-950 px-1.5 py-0.5 rounded">
                        Prompt:
                      </span>
                      <span className="text-xs sm:text-sm font-black text-purple-900">
                        {currentFieldB?.label || currentFieldB?.short_label || currentFieldB?.cue_prompt}
                      </span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowQuestionTextB(p => !p)}
                    className="text-[11px] font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 underline self-end sm:self-auto cursor-pointer shrink-0"
                  >
                    {showQuestionTextB ? <EyeOff size={12} /> : <Eye size={12} />}
                    {showQuestionTextB ? 'Hide question text' : 'Peek question text'}
                  </button>
                </div>

                {/* Mobile-Friendly Current Fact Display so student sees answer fact without scrolling */}
                {currentFieldB?.value && (
                  <div className="pt-2 border-t border-purple-200/60 flex items-center justify-between flex-wrap gap-1.5">
                    <span className="text-[11px] font-bold text-purple-800">
                      📋 Fact on your card:
                    </span>
                    <span className="px-2.5 py-0.5 bg-purple-200/90 text-purple-950 font-black text-xs sm:text-sm rounded-lg border border-purple-300">
                      {currentFieldB.value}
                    </span>
                  </div>
                )}
              </div>

              {/* Big Answer Mic Button / Keyboard fallback */}
              {!evalResultB ? (
                <div className="flex flex-col items-center justify-center gap-3 py-2">
                  {!showTextInputB ? (
                    <>
                      {!isRecordingB ? (
                        <button
                          type="button"
                          onClick={startRecordingB}
                          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-500 text-white flex flex-col items-center justify-center gap-1 shadow-2xl shadow-purple-500/30 transition hover:scale-105 active:scale-95"
                        >
                          <Mic size={36} className="animate-pulse" />
                          <span className="text-[11px] font-black uppercase tracking-wider">Answer</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={stopRecordingB}
                          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex flex-col items-center justify-center gap-1 shadow-2xl shadow-rose-500/40 animate-bounce"
                        >
                          <Square size={32} fill="currentColor" />
                        </button>
                      )}
                      <p className="text-xs font-black text-slate-600">
                        {isRecordingB ? '🔴 Listening... Speak your answer based on Table B!' : 'Tap ANSWER and speak your response'}
                      </p>
                      <MicFallbackInput
                        onSubmit={(typedText) => {
                          setManualTextB(typedText);
                          setTranscriptB(typedText);
                          const evalRes = evaluateSpeechSyntax(typedText, currentFieldB?.acceptable_answers || [], { mode: 'answer' });
                          setEvalResultB(evalRes);
                          if (!evalRes.isCorrect) {
                            setRetryCountB(prev => prev + 1);
                          }
                        }}
                        placeholder="e.g. He called the school nurse immediately."
                        color="purple"
                      />
                    </>
                  ) : null}
                </div>
              ) : (

                /* AI Feedback & Model Answer Evaluation */
                <div className="space-y-4 animate-in fade-in">
                  <div className={`p-4 rounded-2xl border-2 ${
                    evalResultB.isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
                  }`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                        evalResultB.isCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                      }`}>
                        {evalResultB.isCorrect ? '✓ Good Answer' : '⚠️ Review Answer'}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        Accuracy: {evalResultB.score}%
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-800">
                      You said: <span className="italic">"{transcriptB || '(unclear audio)'}"</span>
                    </p>
                    {!evalResultB.isCorrect && currentFieldB?.hint && (
                      <p className="mt-2 text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                        💡 Hint: {currentFieldB.hint}
                      </p>
                    )}
                  </div>

                  {/* Model Answer for Learning */}
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <span className="text-[10px] font-black uppercase text-emerald-800 block mb-0.5">
                        ✓ Model Answer:
                      </span>
                      <p className="text-sm font-black text-emerald-950">
                        "{currentFieldB?.acceptable_answers?.[0]}"
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => speakText(currentFieldB?.acceptable_answers?.[0] || '', currentFieldB?.answer_audio_url)}
                      className="p-2 bg-emerald-200 hover:bg-emerald-300 text-emerald-900 rounded-lg transition shrink-0"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    {!evalResultB.isCorrect && (
                      <button
                        type="button"
                        onClick={handleRetryB}
                        className="w-full sm:flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-white font-black text-xs rounded-xl transition flex items-center justify-center gap-1 shadow"
                      >
                        <RotateCcw size={14} /> Retry ({retryCountB}/2)
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleNextQuestionB}
                      className="w-full sm:flex-1 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-black text-sm rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
                    >
                      {fieldIdxB + 1 < fieldsB.length ? 'Next Question →' : '✓ Card 1 Complete! Go to Card 2 (You Ask) →'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
