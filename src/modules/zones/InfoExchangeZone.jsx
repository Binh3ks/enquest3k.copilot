import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Mic, Square, CheckCircle2, HelpCircle, ArrowRight, Sparkles, Award } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import LexioMascot from '../../components/mascot/LexioMascot';

/**
 * InfoExchangeZone — Authentic Cambridge A2 Flyers Speaking Part 2 (Information Exchange)
 * 
 * Strict Cambridge Speaking Standard:
 * - Phase 1 (Table A): Candidate receives a QUESTION CARD with ONLY WH-Cues (e.g. "where / get injured?").
 *                      Candidate must FORMULATE the question verbally using the SPEAK mic.
 *                      No pre-printed full questions are given. Optional grammar structure hint only.
 * - Phase 2 (Table B): Candidate receives an INFORMATION SHEET with full factual details.
 *                      Examiner Nova asks questions, candidate answers verbally using the ANSWER mic.
 */

export default function InfoExchangeZone({ data, weekNumber, onComplete }) {
  const [phase, setPhase] = useState('table_a'); // 'table_a' | 'table_b' | 'complete'
  
  // Phase 1 (Table A) State
  const [cueIdxA, setCueIdxA] = useState(0);
  const [completedIdsA, setCompletedIdsA] = useState(new Set());
  const [isRecordingA, setIsRecordingA] = useState(false);
  const [showHintA, setShowHintA] = useState(false);
  const [novaRepliedA, setNovaRepliedA] = useState(false);
  
  // Phase 2 (Table B) State
  const [fieldIdxB, setFieldIdxB] = useState(0);
  const [isRecordingB, setIsRecordingB] = useState(false);
  const [recordedB, setRecordedB] = useState(false);
  const [showModelB, setShowModelB] = useState(false);
  const [shields, setShields] = useState(0);

  const mediaRecorderRef = useRef(null);

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

  // Cleanup media recorder
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream?.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  // Auto-speak Nova's question in Phase 2
  useEffect(() => {
    if (phase === 'table_b' && currentFieldB?.nova_question) {
      const timer = setTimeout(() => {
        speakText(currentFieldB.nova_question);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, fieldIdxB, currentFieldB]);

  // Recording handlers for Phase 1 (Asking questions)
  const startRecordingA = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      mr.start();
      setIsRecordingA(true);
    } catch {
      handleCandidateAsked();
    }
  };

  const stopRecordingA = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream?.getTracks().forEach(t => t.stop());
    }
    setIsRecordingA(false);
    handleCandidateAsked();
  };

  const handleCandidateAsked = () => {
    if (!currentCueA) return;
    setNovaRepliedA(true);
    setCompletedIdsA(prev => new Set([...prev, currentCueA.id]));
    speakText(currentCueA.nova_reply);
  };

  const handleNextCueA = () => {
    setNovaRepliedA(false);
    setShowHintA(false);
    if (cueIdxA + 1 < cuesA.length) {
      setCueIdxA(i => i + 1);
    } else {
      setShields(1);
      setPhase('table_b');
    }
  };

  // Recording handlers for Phase 2 (Answering Nova)
  const startRecordingB = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      mr.start();
      setIsRecordingB(true);
    } catch {
      setRecordedB(true);
    }
  };

  const stopRecordingB = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream?.getTracks().forEach(t => t.stop());
    }
    setIsRecordingB(false);
    setRecordedB(true);
  };

  const handleNextQuestionB = () => {
    setRecordedB(false);
    setShowModelB(false);
    if (fieldIdxB + 1 < fieldsB.length) {
      setFieldIdxB(i => i + 1);
    } else {
      setShields(2);
      setPhase('complete');
      if (onComplete) onComplete(100, '');
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
            🏆 Cambridge Speaking Part 2 Completed
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
              <p className="text-xs font-black uppercase text-emerald-700">Shields Earned</p>
              <p className="text-xl font-black text-emerald-900">+2 Speaking Shields</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => { if (onComplete) onComplete(100, ''); }}
          className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-black text-base rounded-2xl shadow-xl shadow-purple-500/30 transition active:scale-95"
        >
          ✓ Finish Quest (+50 XP)
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6 space-y-5">
      {/* Top Banner & Phase Navigation */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <LexioMascot size={42} mood="happy" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-md">
                Cambridge A2 Flyers · Speaking Part 2
              </span>
              <span className="text-xs font-bold text-slate-400">
                {phase === 'table_a' ? `Cue ${cueIdxA + 1} / ${cuesA.length}` : `Question ${fieldIdxB + 1} / ${fieldsB.length}`}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900">
              {phase === 'table_a' ? 'Phase 1: Ask Questions from Cues' : 'Phase 2: Answer Examiner’s Questions'}
            </h1>
          </div>
        </div>

        {/* Phase Pill Indicators */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
            phase === 'table_a' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-emerald-100 text-emerald-800'
          }`}>
            <span>📋 Table A (You Ask)</span>
            {phase === 'table_b' && <CheckCircle2 size={13} />}
          </div>
          <ArrowRight size={14} className="text-slate-300" />
          <div className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
            phase === 'table_b' ? 'bg-purple-600 text-white shadow-sm' : 'bg-slate-100 text-slate-400'
          }`}>
            <span>🎙️ Table B (You Answer)</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Responsive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ── LEFT COLUMN: Cambridge Candidate Booklet (5 Cols) ── */}
        <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-indigo-200 shadow-md overflow-hidden">
          <div className={`px-5 py-4 flex flex-col gap-0.5 text-white ${
            phase === 'table_a' ? 'bg-gradient-to-r from-indigo-600 to-indigo-700' : 'bg-gradient-to-r from-purple-600 to-purple-700'
          }`}>
            <span className="font-black text-base flex items-center gap-2">
              <span>📄</span>
              <span>{phase === 'table_a' ? tableA.title : tableB.title}</span>
            </span>
            <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider">
              {phase === 'table_a' ? "Candidate's Question Card" : "Candidate's Information Sheet"}
            </span>
          </div>

          <div className="divide-y divide-slate-100 p-2">
            {phase === 'table_a' ? (
              cuesA.map((cue, idx) => {
                const isTarget = currentCueA?.id === cue.id;
                const isDone = completedIdsA.has(cue.id);

                return (
                  <div
                    key={cue.id}
                    className={`px-4 py-3.5 rounded-xl transition flex items-center justify-between gap-3 ${
                      isTarget ? 'bg-amber-50 border-2 border-amber-300 shadow-sm' : isDone ? 'bg-emerald-50/70' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-slate-400">0{idx + 1}.</span>
                      <span className="text-xs sm:text-sm font-black text-slate-800 lowercase tracking-wide">
                        {cue.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-right">
                      {isDone ? (
                        <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                          <span className="max-w-[140px] truncate">{cue.nova_reply?.split('.')[0]}</span>
                          <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                        </div>
                      ) : (
                        <span className={`px-2.5 py-0.5 rounded-md text-xs font-black ${
                          isTarget ? 'bg-amber-400 text-slate-950 animate-pulse' : 'bg-slate-200 text-slate-500'
                        }`}>
                          ?
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              fieldsB.map((f, idx) => {
                const isActive = fieldIdxB === idx;
                const isPassed = fieldIdxB > idx;

                return (
                  <div
                    key={f.id}
                    className={`px-4 py-3.5 rounded-xl transition flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3 ${
                      isActive ? 'bg-purple-50 border-2 border-purple-300 shadow-sm' : isPassed ? 'bg-emerald-50/70' : 'bg-white'
                    }`}
                  >
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500 shrink-0">
                      {f.label}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs sm:text-sm">
                      <span>{f.value}</span>
                      {isPassed && <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN: Voice Question Formulation & Examiner Arena (7 Cols) ── */}
        <div className="lg:col-span-7 space-y-4">
          {phase === 'table_a' ? (
            /* PHASE 1: CANDIDATE FORMS & SPEAKS QUESTION */
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-amber-200 shadow-md space-y-5">
              {/* Cue Display (Cambridge Format) */}
              <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl space-y-2">
                <span className="text-[11px] font-black uppercase text-amber-800 tracking-wider flex items-center gap-1.5">
                  <HelpCircle size={14} className="text-amber-600" />
                  CUE PROMPT ({cueIdxA + 1}/{cuesA.length}):
                </span>
                <p className="text-xl sm:text-2xl font-black text-amber-950 font-mono">
                  {currentCueA?.cue_prompt}
                </p>
                <p className="text-xs font-bold text-amber-800">
                  Formulate and ask a complete question using this cue!
                </p>
              </div>

              {/* Collapsible Grammar Structure Hint (Does NOT show full question by default) */}
              <div className="space-y-2">
                {!showHintA ? (
                  <button
                    type="button"
                    onClick={() => setShowHintA(true)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black transition flex items-center gap-1.5 border border-slate-200"
                  >
                    💡 Need a grammar hint?
                  </button>
                ) : (
                  <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wide">
                        📌 Question Structure Scaffold:
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowHintA(false)}
                        className="text-[10px] text-indigo-500 font-bold underline"
                      >
                        Hide
                      </button>
                    </div>
                    <p className="text-xs font-bold text-indigo-950">
                      {currentCueA?.cue_word?.toUpperCase()} + did + [subject] + [base verb] ... ?
                    </p>
                  </div>
                )}
              </div>

              {/* Central Voice Recording Button */}
              {!novaRepliedA ? (
                <div className="flex flex-col items-center justify-center gap-3 py-3">
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
                    {isRecordingA ? '🔴 Recording... Speak your question clearly!' : 'Tap SPEAK and ask Nova your question'}
                  </p>
                </div>
              ) : (
                /* Nova Examiner Spoken Reply */
                <div className="space-y-4 animate-in fade-in">
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
                          onClick={() => speakText(currentCueA?.nova_reply || '')}
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

                  <button
                    type="button"
                    onClick={handleNextCueA}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-white font-black text-sm rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    {cueIdxA + 1 < cuesA.length ? 'Next Cue →' : '✓ Table A Complete! Go to Table B →'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* PHASE 2: EXAMINER ASKS CANDIDATE */
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-purple-200 shadow-md space-y-5">
              {/* Examiner Question Bubble */}
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl flex items-start gap-3">
                <div className="p-2 bg-purple-200 rounded-xl shrink-0">
                  <LexioMascot size={32} mood="speaking" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-200 px-2 py-0.5 rounded">
                      EXAMINER NOVA ASKS ({fieldIdxB + 1}/{fieldsB.length}):
                    </span>
                    <button
                      type="button"
                      onClick={() => speakText(currentFieldB?.nova_question || '')}
                      className="p-1 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg transition active:scale-95"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                  <p className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    "{currentFieldB?.nova_question}"
                  </p>
                </div>
              </div>

              {/* Big Answer Mic Button */}
              <div className="flex flex-col items-center justify-center gap-3 py-2">
                {!isRecordingB ? (
                  <button
                    type="button"
                    onClick={startRecordingB}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-500 text-white flex flex-col items-center justify-center gap-1 shadow-2xl shadow-purple-500/30 transition hover:scale-105 active:scale-95"
                  >
                    <Mic size={36} className="animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-wider">ANSWER</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopRecordingB}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex flex-col items-center justify-center gap-1 shadow-2xl shadow-rose-500/40 animate-bounce"
                  >
                    <Square size={32} fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-wider">STOP</span>
                  </button>
                )}
                <p className="text-xs font-black text-slate-600">
                  {isRecordingB ? '🔴 Recording... Answer based on your card!' : 'Tap ANSWER to speak your response'}
                </p>
              </div>

              {/* Post-Recording Model Check & Next */}
              {recordedB && (
                <div className="space-y-3 animate-in fade-in">
                  {!showModelB ? (
                    <button
                      type="button"
                      onClick={() => setShowModelB(true)}
                      className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-xl transition border border-slate-200"
                    >
                      💡 Check Model Answer
                    </button>
                  ) : (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2 animate-in fade-in">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-[11px] font-black uppercase text-emerald-800">Model Answer:</p>
                        <p className="text-sm font-bold text-emerald-950">"{currentFieldB?.acceptable_answers?.[0]}"</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => speakText(currentFieldB?.acceptable_answers?.[0] || '')}
                        className="p-1.5 bg-emerald-200 hover:bg-emerald-300 rounded-lg transition"
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleNextQuestionB}
                    className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-black text-sm rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    {fieldIdxB + 1 < fieldsB.length ? 'Next Question →' : '🏆 Complete Cambridge Speaking Part 2!'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
