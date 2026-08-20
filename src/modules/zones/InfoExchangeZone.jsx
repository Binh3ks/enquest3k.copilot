import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Volume2, Mic, Square, CheckCircle2, HelpCircle, ArrowRight, Sparkles, MessageSquareQuote, Award } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import LexioMascot from '../../components/mascot/LexioMascot';

/**
 * InfoExchangeZone — Cambridge A2 Flyers Speaking Part 2 (Information Exchange)
 * 
 * Direct immersive 2-Phase Speaking Arena:
 * - Phase 1 (Table A): Candidate ASKS W-H questions to fill in missing fields (?).
 *                      Features Big Voice Mic, word-scaffolding, and Nova spoken replies.
 * - Phase 2 (Table B): Nova ASKS questions about the candidate's card.
 *                      Candidate records spoken answers with voice feedback.
 */

export default function InfoExchangeZone({ data, weekNumber, onComplete }) {
  const [phase, setPhase] = useState('table_a'); // 'table_a' | 'table_b' | 'complete'
  
  // Phase 1 (Table A) State
  const [missingIdx, setMissingIdx] = useState(0);
  const [completedIds, setCompletedIds] = useState(new Set());
  const [isRecordingA, setIsRecordingA] = useState(false);
  const [askedCurrent, setAskedCurrent] = useState(false);
  const [chosenWords, setChosenWords] = useState([]);
  
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
  const missingFields = tableA?.fields?.filter(f => f.is_missing) || [];
  const currentMissingField = missingFields[missingIdx] || null;
  const currentFieldB = tableB?.fields?.[fieldIdxB] || null;

  // Cleanup media recorder on unmount
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

  // Voice recording handlers for Phase 1
  const startRecordingA = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      mr.start();
      setIsRecordingA(true);
    } catch {
      // Fallback if mic permission is denied
      handleQuestionSubmitted(currentMissingField?.acceptable_questions?.[0] || '');
    }
  };

  const stopRecordingA = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream?.getTracks().forEach(t => t.stop());
    }
    setIsRecordingA(false);
    handleQuestionSubmitted(currentMissingField?.acceptable_questions?.[0] || '');
  };

  const handleQuestionSubmitted = (questionText) => {
    if (!currentMissingField) return;
    setAskedCurrent(true);
    setCompletedIds(prev => new Set([...prev, currentMissingField.id]));
    speakText(currentMissingField.nova_reply);
  };

  const handleNextQuestionA = () => {
    setAskedCurrent(false);
    setChosenWords([]);
    if (missingIdx + 1 < missingFields.length) {
      setMissingIdx(i => i + 1);
    } else {
      setShields(1);
      setPhase('table_b');
    }
  };

  // Voice recording handlers for Phase 2
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
    if (fieldIdxB + 1 < (tableB?.fields?.length || 0)) {
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
            🏆 Cambridge Speaking Part 2 Mastered
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Outstanding Info Exchange!
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
            You successfully asked W-H questions to find missing information on Table A and answered Nova's questions on Table B!
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
      {/* Top Banner & Phase Switcher */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <LexioMascot size={42} mood="happy" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-md">
                Cambridge Speaking · Part 2
              </span>
              <span className="text-xs font-bold text-slate-400">
                {phase === 'table_a' ? `Question ${missingIdx + 1} / ${missingFields.length}` : `Question ${fieldIdxB + 1} / ${tableB.fields.length}`}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900">
              {phase === 'table_a' ? 'Phase 1: You Ask Questions (Table A)' : 'Phase 2: Nova Asks You (Table B)'}
            </h1>
          </div>
        </div>

        {/* Phase Pill Indicators */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
            phase === 'table_a' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-emerald-100 text-emerald-800'
          }`}>
            <span>📋 Table A</span>
            {phase === 'table_b' && <CheckCircle2 size={13} />}
          </div>
          <ArrowRight size={14} className="text-slate-300" />
          <div className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
            phase === 'table_b' ? 'bg-purple-600 text-white shadow-sm' : 'bg-slate-100 text-slate-400'
          }`}>
            <span>🎙️ Table B</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Responsive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ── LEFT COLUMN: Cambridge Cue Card (5 Cols) ── */}
        <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-indigo-200 shadow-md overflow-hidden">
          <div className={`px-5 py-3.5 flex items-center justify-between text-white font-black text-sm ${
            phase === 'table_a' ? 'bg-gradient-to-r from-indigo-600 to-indigo-700' : 'bg-gradient-to-r from-purple-600 to-purple-700'
          }`}>
            <span className="flex items-center gap-2">
              <span>📋</span>
              <span>{phase === 'table_a' ? tableA.title : tableB.title}</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
              {phase === 'table_a' ? 'Your Card' : 'Nova’s Card'}
            </span>
          </div>

          <div className="divide-y divide-slate-100 p-2">
            {phase === 'table_a' ? (
              tableA.fields.map((f) => {
                const isTarget = currentMissingField?.id === f.id;
                const isDone = completedIds.has(f.id);

                return (
                  <div
                    key={f.id}
                    className={`px-4 py-3.5 rounded-xl transition flex items-center justify-between gap-3 ${
                      isTarget ? 'bg-amber-50 border-2 border-amber-300 shadow-sm' : isDone ? 'bg-emerald-50/70' : 'bg-white'
                    }`}
                  >
                    <span className="text-xs font-black uppercase tracking-wide text-slate-500 w-32 shrink-0">
                      {f.label}
                    </span>

                    {f.is_missing ? (
                      <div className="flex items-center gap-2 text-right">
                        {isDone ? (
                          <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs sm:text-sm">
                            <span>{f.nova_reply?.split('.')[0] || 'Found'}</span>
                            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                          </div>
                        ) : (
                          <span className={`px-3 py-1 rounded-lg text-sm font-black animate-pulse ${
                            isTarget ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-600'
                          }`}>
                            ?
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm font-black text-slate-900">{f.value}</span>
                    )}
                  </div>
                );
              })
            ) : (
              tableB.fields.map((f, idx) => {
                const isActive = fieldIdxB === idx;
                const isPassed = fieldIdxB > idx;

                return (
                  <div
                    key={f.id}
                    className={`px-4 py-3.5 rounded-xl transition flex items-center justify-between gap-3 ${
                      isActive ? 'bg-purple-50 border-2 border-purple-300 shadow-sm' : isPassed ? 'bg-emerald-50/70' : 'bg-white'
                    }`}
                  >
                    <span className="text-xs font-black uppercase tracking-wide text-slate-500 w-32 shrink-0">
                      {f.label}
                    </span>
                    <div className="flex items-center gap-2 text-right">
                      <span className="text-sm font-black text-slate-900">{f.value}</span>
                      {isPassed && <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN: Interactive Voice & Speaking Arena (7 Cols) ── */}
        <div className="lg:col-span-7 space-y-4">
          {phase === 'table_a' ? (
            /* PHASE 1 INTERACTION */
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-amber-200 shadow-md space-y-5">
              {/* Cue Prompt Header */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase text-amber-800 tracking-wider flex items-center gap-1.5">
                    <HelpCircle size={14} className="text-amber-600" />
                    CUE PROMPT ({missingIdx + 1}/{missingFields.length}):
                  </span>
                  <button
                    type="button"
                    onClick={() => speakText(currentMissingField?.cue_prompt || '')}
                    className="p-1 text-amber-800 hover:bg-amber-200 rounded-lg transition"
                    title="Listen to cue prompt"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
                <p className="text-base sm:text-lg font-black text-amber-950">
                  {currentMissingField?.cue_prompt}
                </p>
              </div>

              {/* Target Question Scaffold / Model */}
              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block">
                  💬 SAY THIS QUESTION TO NOVA:
                </span>
                <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between gap-3">
                  <p className="text-sm sm:text-base font-black text-indigo-950">
                    "{currentMissingField?.acceptable_questions?.[0]}"
                  </p>
                  <button
                    type="button"
                    onClick={() => speakText(currentMissingField?.acceptable_questions?.[0] || '')}
                    className="p-2 bg-indigo-200 hover:bg-indigo-300 text-indigo-900 rounded-lg transition active:scale-95 shrink-0"
                    title="Listen to model question"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
              </div>

              {/* Central Voice Recording Button */}
              {!askedCurrent ? (
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
                    {isRecordingA ? '🔴 Recording... Ask your question now!' : 'Tap SPEAK to ask Nova'}
                  </p>
                </div>
              ) : (
                /* Nova's Live Audio Reply */
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-start gap-3 text-left">
                    <div className="p-2 bg-emerald-200 rounded-xl shrink-0">
                      <LexioMascot size={32} mood="speaking" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded">
                          NOVA REPLIES:
                        </span>
                        <button
                          type="button"
                          onClick={() => speakText(currentMissingField?.nova_reply || '')}
                          className="p-1 bg-emerald-200 hover:bg-emerald-300 text-emerald-900 rounded-lg transition active:scale-95"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                      <p className="text-base font-black text-emerald-950 leading-relaxed">
                        "{currentMissingField?.nova_reply}"
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextQuestionA}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-white font-black text-sm rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    {missingIdx + 1 < missingFields.length ? 'Next Question →' : '✓ Table A Complete! Go to Table B →'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* PHASE 2 INTERACTION */
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-purple-200 shadow-md space-y-5">
              {/* Nova Question Bubble */}
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl flex items-start gap-3">
                <div className="p-2 bg-purple-200 rounded-xl shrink-0">
                  <LexioMascot size={32} mood="speaking" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-200 px-2 py-0.5 rounded">
                      NOVA ASKS YOU ({fieldIdxB + 1}/{tableB.fields.length}):
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

              {/* Big Mic Button to Answer */}
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
                  {isRecordingB ? '🔴 Recording... Answer Nova now!' : 'Tap ANSWER to speak your response'}
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
                      💡 Show Model Answer
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
                    {fieldIdxB + 1 < tableB.fields.length ? 'Next Question →' : '🏆 Complete Speaking Part 2!'}
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
