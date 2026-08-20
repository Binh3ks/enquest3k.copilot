import React, { useState, useCallback } from 'react';
import { ChevronRight, Volume2, Mic, Square, CheckCircle, HelpCircle, MessageSquare } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import LexioMascot from '../../components/mascot/LexioMascot';

/**
 * InfoExchangeZone — Cambridge Speaking Part 2 (Information Exchange)
 * 
 * Replaces Debate Arena (ai_debate) as the mid-week speaking activity.
 * Trains students to ask W-H questions to fill in missing info (?) on a cue card,
 * then answer Nova's questions about a second cue card.
 * 
 * Data: INFORMATION_EXCHANGE_P2 from ask_ai.js
 *       CUE_CARD_PROMPTS from ask_ai.js
 * 
 * 2 Phases:
 *   Phase 1 (Table A): Student sees missing fields (?), taps cue-prompt, 
 *                      builds W-H question by word-ordering, records/types answer.
 *   Phase 2 (Table B): Nova asks questions, student records spoken answer.
 */

const PHASES = { INTRO: 'intro', TABLE_A: 'table_a', TABLE_B: 'table_b', COMPLETE: 'complete' };

// ---------- Word-Order Builder subcomponent ----------
function WordBuilder({ wordBank, scrambledWords, onSubmit, novaReply, isCorrect }) {
  const [chosen, setChosen] = useState([]);
  const [available, setAvailable] = useState(scrambledWords.map((w, i) => ({ w, idx: i })));
  const [showReply, setShowReply] = useState(false);

  const addWord = (item) => {
    setChosen(c => [...c, item]);
    setAvailable(a => a.filter(x => !(x.idx === item.idx && x.w === item.w)));
  };

  const removeWord = (item, ci) => {
    setChosen(c => c.filter((_, i) => i !== ci));
    setAvailable(a => [...a, item]);
  };

  const handleSubmit = () => {
    const question = chosen.map(x => x.w).join(' ');
    const clean = s => s.replace(/[?!.,]/g, '').toLowerCase().trim();
    const ok = onSubmit(question);
    if (ok) {
      speakText(novaReply);
      setShowReply(true);
    }
  };

  if (isCorrect || showReply) {
    return (
      <div className="space-y-2 animate-in fade-in">
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2">
          <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-black text-emerald-800 uppercase tracking-wide">Nova's Answer:</p>
            <p className="text-sm font-bold text-emerald-900 leading-snug mt-0.5">"{novaReply}"</p>
          </div>
          <button
            onClick={() => speakText(novaReply)}
            className="shrink-0 p-1.5 bg-emerald-200 hover:bg-emerald-300 rounded-lg transition active:scale-95"
          >
            <Volume2 size={13} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Built sentence display */}
      <div className="min-h-10 p-2 bg-white border-2 border-indigo-200 rounded-xl flex flex-wrap gap-1.5 items-center">
        {chosen.length === 0
          ? <span className="text-xs text-slate-400 italic">Tap words below to build your question...</span>
          : chosen.map((item, ci) => (
              <button
                key={ci}
                onClick={() => removeWord(item, ci)}
                className="px-2 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 text-xs font-black rounded-lg transition active:scale-95"
              >
                {item.w} ✕
              </button>
            ))
        }
      </div>

      {/* Available words */}
      <div className="flex flex-wrap gap-1.5">
        {available.map((item, i) => (
          <button
            key={i}
            onClick={() => addWord(item)}
            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-200 transition active:scale-95"
          >
            {item.w}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={chosen.length < 3}
        className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-black text-sm rounded-xl transition active:scale-[0.98]"
      >
        Ask Nova! →
      </button>
    </div>
  );
}

// ---------- Table A — Student Asks Questions ----------
function TableAPhase({ data, onComplete }) {
  const fields = data.table_a.fields;
  const [fieldIdx, setFieldIdx] = useState(() => fields.findIndex(f => f.is_missing));
  const [completedIds, setCompletedIds] = useState(new Set());
  const [currentCorrect, setCurrentCorrect] = useState(false);

  const missingFields = fields.filter(f => f.is_missing);
  const currentField = missingFields[fieldIdx - fields.filter(f => !f.is_missing).length] || missingFields[0];
  // Simpler approach: iterate through missing fields in order
  const [missingIdx, setMissingIdx] = useState(0);
  const activeMissing = missingFields[missingIdx] || null;

  const handleSubmit = useCallback((question) => {
    if (!activeMissing) return false;
    const clean = s => s.replace(/[?!.,]/g, '').toLowerCase().trim();
    const ok = activeMissing.acceptable_questions.some(q => {
      const aq = clean(q), uq = clean(question);
      return aq === uq || uq.includes(clean(aq.split(' ').slice(0, 3).join(' ')));
    });
    if (ok) {
      setCompletedIds(prev => new Set([...prev, activeMissing.id]));
      setCurrentCorrect(true);
    }
    return ok;
  }, [activeMissing]);

  const handleNextField = () => {
    setCurrentCorrect(false);
    if (missingIdx + 1 < missingFields.length) {
      setMissingIdx(i => i + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="space-y-4">
      {/* Cue card */}
      <div className="bg-white rounded-2xl border-2 border-indigo-200 shadow-sm overflow-hidden">
        <div className="bg-indigo-600 px-4 py-2.5 flex items-center gap-2">
          <span className="text-white font-black text-sm">📋 {data.table_a.title}</span>
        </div>
        <div className="divide-y divide-slate-100">
          {fields.map(f => (
            <div key={f.id} className={`px-4 py-2.5 flex items-center gap-3 ${f.is_missing ? 'bg-amber-50' : 'bg-white'}`}>
              <span className="text-xs font-black text-slate-500 w-24 shrink-0">{f.label}</span>
              {f.is_missing ? (
                <div className="flex items-center gap-2">
                  <span className={`font-black text-sm ${completedIds.has(f.id) ? 'text-emerald-600 line-through' : 'text-amber-600'}`}>
                    {completedIds.has(f.id) ? f.nova_reply?.split('.')[0] || '?' : '?'}
                  </span>
                  {completedIds.has(f.id) && <CheckCircle size={14} className="text-emerald-500" />}
                </div>
              ) : (
                <span className="text-sm font-bold text-slate-800">{f.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Active question builder */}
      {activeMissing && (
        <div className="space-y-2 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle size={16} className="text-amber-600 shrink-0" />
            <p className="text-xs font-black text-amber-800 uppercase tracking-wide">
              Your cue: <span className="text-amber-900 font-black">{activeMissing.cue_prompt}</span>
            </p>
          </div>
          <WordBuilder
            scrambledWords={activeMissing.acceptable_questions[0].split(' ')}
            wordBank={[]}
            novaReply={activeMissing.nova_reply}
            isCorrect={currentCorrect}
            onSubmit={handleSubmit}
          />
          {currentCorrect && (
            <button
              onClick={handleNextField}
              className="w-full mt-2 py-2 bg-amber-500 hover:bg-amber-400 text-white font-black text-sm rounded-xl transition active:scale-[0.98]"
            >
              {missingIdx + 1 < missingFields.length ? 'Next Question →' : '✓ All Questions Done — Go to Table B!'}
            </button>
          )}
        </div>
      )}

      <div className="text-xs text-center text-slate-400 font-bold">
        Question {Math.min(missingIdx + 1, missingFields.length)} of {missingFields.length}
      </div>
    </div>
  );
}

// ---------- Table B — Nova Asks, Student Answers ----------
function TableBPhase({ data, onComplete }) {
  const fields = data.table_b.fields;
  const [fieldIdx, setFieldIdx] = useState(0);
  const [answers, setAnswers] = useState(Array(fields.length).fill(''));
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingDone, setRecordingDone] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const currentField = fields[fieldIdx];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mr.start();
      setMediaRecorder(mr);
      setIsRecording(true);
    } catch {
      alert('Microphone not available. Type your answer instead!');
    }
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    mediaRecorder?.stream?.getTracks().forEach(t => t.stop());
    setIsRecording(false);
    setRecordingDone(true);
  };

  const handleReveal = () => setShowAnswer(true);

  const handleNext = () => {
    setRecordingDone(false);
    setShowAnswer(false);
    if (fieldIdx + 1 < fields.length) {
      setFieldIdx(i => i + 1);
      speakText(fields[fieldIdx + 1]?.nova_question);
    } else {
      onComplete();
    }
  };

  // Auto-read Nova question on change
  React.useEffect(() => {
    if (currentField?.nova_question) {
      const t = setTimeout(() => speakText(currentField.nova_question), 400);
      return () => clearTimeout(t);
    }
  }, [fieldIdx]);

  return (
    <div className="space-y-4">
      {/* Cue card for reference */}
      <div className="bg-white rounded-2xl border-2 border-purple-200 shadow-sm overflow-hidden">
        <div className="bg-purple-600 px-4 py-2.5 flex items-center gap-2">
          <span className="text-white font-black text-sm">📋 {data.table_b.title}</span>
        </div>
        <div className="divide-y divide-slate-100">
          {fields.map((f, i) => (
            <div key={f.id} className={`px-4 py-2.5 flex items-center gap-3 ${i === fieldIdx ? 'bg-purple-50 border-l-4 border-l-purple-400' : 'bg-white'}`}>
              <span className="text-xs font-black text-slate-500 w-24 shrink-0">{f.label}</span>
              <span className="text-sm font-bold text-slate-800">{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Nova's question */}
      <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl flex items-start gap-3">
        <LexioMascot size={32} mood="speaking" />
        <div className="flex-1">
          <span className="text-[10px] font-black text-purple-700 uppercase tracking-wide block mb-1">Nova Asks:</span>
          <p className="text-base font-black text-slate-900 leading-snug">"{currentField?.nova_question}"</p>
        </div>
        <button
          onClick={() => speakText(currentField?.nova_question)}
          className="shrink-0 p-2 bg-purple-200 hover:bg-purple-300 rounded-xl transition active:scale-95"
        >
          <Volume2 size={16} />
        </button>
      </div>

      {/* Record answer */}
      <div className="flex flex-col items-center gap-3 py-2">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-500 text-white flex flex-col items-center justify-center gap-1 shadow-2xl shadow-purple-500/30 transition hover:scale-105 active:scale-95"
          >
            <Mic size={28} className="animate-pulse" />
            <span className="text-[9px] font-black uppercase">RECORD</span>
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="w-20 h-20 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex flex-col items-center justify-center gap-1 shadow-2xl shadow-rose-500/40 animate-bounce"
          >
            <Square size={24} fill="currentColor" />
            <span className="text-[9px] font-black uppercase">STOP</span>
          </button>
        )}
        <p className="text-xs font-black text-slate-600">
          {isRecording ? '🔴 Recording your answer...' : 'Tap RECORD to answer Nova'}
        </p>
      </div>

      {/* After recording: reveal model answer */}
      {recordingDone && !showAnswer && (
        <button
          onClick={handleReveal}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm rounded-xl transition border border-slate-200"
        >
          💡 Check a model answer
        </button>
      )}
      {showAnswer && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2 animate-in fade-in">
          <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-black text-emerald-800 mb-1">Model answer:</p>
            <p className="text-sm font-bold text-emerald-900">"{currentField?.acceptable_answers?.[0]}"</p>
          </div>
          <button onClick={() => speakText(currentField?.acceptable_answers?.[0])} className="shrink-0 p-1.5 bg-emerald-200 hover:bg-emerald-300 rounded-lg transition">
            <Volume2 size={13} />
          </button>
        </div>
      )}

      {recordingDone && (
        <button
          onClick={handleNext}
          className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-black text-sm rounded-xl transition active:scale-[0.98]"
        >
          {fieldIdx + 1 < fields.length ? 'Next Question →' : '🏆 Complete Info Exchange!'}
        </button>
      )}

      <div className="text-xs text-center text-slate-400 font-bold">
        Question {fieldIdx + 1} of {fields.length}
      </div>
    </div>
  );
}

// ---------- Main Zone ----------
export default function InfoExchangeZone({ data, weekNumber, onComplete }) {
  const [phase, setPhase] = useState(PHASES.INTRO);
  const [shieldsEarned, setShieldsEarned] = useState(0);

  // Hydrate data from weekData
  const infoExData = data?.cue_card_info_exchange
    || data?.speakingHub?.cue_card_info_exchange
    || data?.stations?.ask_ai?.cue_card_info_exchange
    || null;

  if (!infoExData) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
        <LexioMascot size={80} mood="thinking" />
        <p className="text-sm font-black text-slate-500">Info Exchange data not found for this week.</p>
      </div>
    );
  }

  const handleTableAComplete = () => {
    setShieldsEarned(s => s + 1);
    setPhase(PHASES.TABLE_B);
  };

  const handleTableBComplete = () => {
    setShieldsEarned(s => s + 1);
    setPhase(PHASES.COMPLETE);
    if (onComplete) onComplete(100, '');
  };

  if (phase === PHASES.INTRO) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-6 text-center max-w-md mx-auto animate-in fade-in">
        <LexioMascot size={80} mood="happy" />
        <div>
          <h2 className="text-xl font-black text-slate-900 mb-1">Info Exchange</h2>
          <p className="text-xs font-black uppercase text-purple-600 tracking-widest mb-3">Cambridge Speaking · Part 2</p>
          <p className="text-sm text-slate-600 leading-relaxed">
            You and Nova each have a <strong>cue card</strong> with some missing information (<strong>?</strong>).
            Ask <em>W-H questions</em> to find the missing info — then answer Nova's questions about your card!
          </p>
        </div>
        <div className="w-full grid grid-cols-2 gap-3 text-left">
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl">
            <p className="text-[10px] font-black text-indigo-700 uppercase mb-1">📋 Table A</p>
            <p className="text-xs font-bold text-slate-700">You ask W-H questions to fill in missing (?)</p>
          </div>
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl">
            <p className="text-[10px] font-black text-purple-700 uppercase mb-1">🎙️ Table B</p>
            <p className="text-xs font-bold text-slate-700">Nova asks — you answer about your card</p>
          </div>
        </div>
        <button
          onClick={() => {
            setPhase(PHASES.TABLE_A);
          }}
          className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-base rounded-2xl shadow-lg transition active:scale-[0.98]"
        >
          Start Exchange! 🚀
        </button>
      </div>
    );
  }

  if (phase === PHASES.TABLE_A) {
    return (
      <div className="p-4 max-w-lg mx-auto space-y-4 overflow-y-auto">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 font-black text-[10px] uppercase rounded-lg">Phase 1 — You Ask</span>
        </div>
        <TableAPhase data={infoExData} onComplete={handleTableAComplete} />
      </div>
    );
  }

  if (phase === PHASES.TABLE_B) {
    return (
      <div className="p-4 max-w-lg mx-auto space-y-4 overflow-y-auto">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-purple-100 text-purple-800 font-black text-[10px] uppercase rounded-lg">Phase 2 — Nova Asks You</span>
        </div>
        <TableBPhase data={infoExData} onComplete={handleTableBComplete} />
      </div>
    );
  }

  // COMPLETE
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-8 text-center animate-in fade-in">
      <LexioMascot size={90} mood="celebrating" />
      <div>
        <p className="text-2xl font-black text-slate-900 mb-1">🏆 Info Exchange Complete!</p>
        <p className="text-sm text-slate-600">+2 Speaking Shields earned!</p>
      </div>
      <div className="flex gap-2">
        {[...Array(shieldsEarned)].map((_, i) => <span key={i} className="text-3xl">🛡️</span>)}
      </div>
    </div>
  );
}
