import React, { useState, useMemo } from 'react';
import { TestTube, Sparkles, CheckCircle2, Send, Trophy, Stamp } from 'lucide-react';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';

export default function ScienceReportCreator({ reportTopic, weekNumber = 33, onComplete }) {
  const [reportText, setReportText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCause, setSelectedCause] = useState('Water on floor');
  const [selectedMechanism, setSelectedMechanism] = useState('Reduces friction');
  const [selectedResult, setSelectedResult] = useState('Causes slipping hazard');

  // ─── Criteria Checker: real-time detection (mục 11.4) ──────────────────────
  const criteriaCheck = useMemo(() => {
    const lower = reportText.toLowerCase();
    // Field 1: Cause described (uses Describe starter or cause vocab)
    const causeDescribed = /\b(water|liquid|wet|floor|puddle|acts\s+as|cause[sd]?|because)\b/i.test(lower);
    // Field 2: Result explained (connector presence)
    const resultExplained = /\b(as\s+a\s+result|therefore|so|thus|friction|slipp|reduces?)\b/i.test(lower);
    // Field 3: Safety advice given
    const safetyGiven = /\b(walk|carefully|slowly|safe|safety|corridor|bandage|nurse|cold\s+pack|rubber\s+shoe|slip)\b/i.test(lower);
    // Field 4: At least 2 target vocab pills used
    const vocabUsed = [
      'liquid lubricant', 'rubber shoes', 'reduce friction', 'wet puddle',
      'corridor safety', 'bandage', 'cold pack'
    ].filter(v => lower.includes(v.toLowerCase())).length;
    const vocabMet = vocabUsed >= 1; // At least 1 explicit pill term

    // Lab Notebook stamps (which sentence types detected)
    const hasDescribe = causeDescribed;
    const hasExplain = resultExplained;
    const hasAdvise = safetyGiven;

    const canSubmit = causeDescribed && resultExplained && safetyGiven;
    return { causeDescribed, resultExplained, safetyGiven, vocabMet, vocabUsed, hasDescribe, hasExplain, hasAdvise, canSubmit };
  }, [reportText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reportText.trim() || !criteriaCheck.canSubmit) return;
    setIsSubmitted(true);
    fireCelebrationConfetti('ScienceReport_Complete');
    if (onComplete) onComplete(50);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-3xl border border-emerald-200 shadow-md space-y-5 text-slate-900 font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-md">
          🔬
        </div>
        <div>
          <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">
            Science Report • CLIL Friction Analysis
          </span>
          <h3 className="text-base font-black text-slate-900">Corridor Friction Science Lab Notebook</h3>
        </div>
      </div>

      {/* Section 11.1: 3-Step Visual Logic Notebook Cards */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
        <span className="text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
          🧪 3-STEP SCIENCE LOGIC BOARD:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 space-y-1">
            <span className="font-black text-emerald-900 uppercase text-[10px] block">🔬 1. Describe Cause</span>
            <p className="font-bold text-slate-800">{selectedCause}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-300 space-y-1">
            <span className="font-black text-blue-900 uppercase text-[10px] block">➡️ 2. Explain Mechanism</span>
            <p className="font-bold text-slate-800">{selectedMechanism}</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 space-y-1">
            <span className="font-black text-amber-900 uppercase text-[10px] block">✅ 3. Give Advice</span>
            <p className="font-bold text-slate-800">{selectedResult}</p>
          </div>
        </div>
      </div>

      {/* Half Sentence Starters & Categorized Functional Color Pills */}
      <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-3">
        <div className="space-y-1">
          <span className="text-xs font-black uppercase text-emerald-900 flex items-center gap-1">
            <Sparkles size={14} className="text-emerald-600" /> Tap Sentence Starters:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              "Water acts as...",
              "As a result, friction...",
              "Therefore, walking carefully..."
            ].map((starter, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setReportText(prev => prev ? `${prev} ${starter}` : starter)}
                className="px-3.5 py-1.5 bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-950 rounded-xl text-xs font-bold transition text-left shadow-sm active:scale-95"
              >
                + {starter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-emerald-200/60">
          {/* 🟢 Science Words */}
          <div className="p-2 bg-emerald-100/70 rounded-xl border border-emerald-300 space-y-1">
            <span className="text-[10px] font-black uppercase text-emerald-900 tracking-wider">
              🟢 Science Words:
            </span>
            <div className="flex flex-wrap gap-1">
              {["liquid lubricant", "rubber shoes", "reduce friction"].map((vocab, vIdx) => (
                <button
                  key={vIdx}
                  type="button"
                  onClick={() => setReportText(prev => prev ? `${prev} ${vocab}` : vocab)}
                  className="px-2 py-0.5 bg-white hover:bg-emerald-200 text-emerald-950 border border-emerald-300 rounded-md text-[11px] font-bold transition active:scale-95"
                >
                  + {vocab}
                </button>
              ))}
            </div>
          </div>

          {/* 🔵 Connectors */}
          <div className="p-2 bg-blue-100/70 rounded-xl border border-blue-300 space-y-1">
            <span className="text-[10px] font-black uppercase text-blue-900 tracking-wider">
              🔵 Connectors:
            </span>
            <div className="flex flex-wrap gap-1">
              {["as a result", "because", "therefore"].map((vocab, vIdx) => (
                <button
                  key={vIdx}
                  type="button"
                  onClick={() => setReportText(prev => prev ? `${prev} ${vocab}` : vocab)}
                  className="px-2 py-0.5 bg-white hover:bg-blue-200 text-blue-950 border border-blue-300 rounded-md text-[11px] font-bold transition active:scale-95"
                >
                  + {vocab}
                </button>
              ))}
            </div>
          </div>

          {/* 🟠 Safety Words */}
          <div className="p-2 bg-amber-100/70 rounded-xl border border-amber-300 space-y-1">
            <span className="text-[10px] font-black uppercase text-amber-900 tracking-wider">
              🟠 Safety Words:
            </span>
            <div className="flex flex-wrap gap-1">
              {["wet puddle", "corridor safety", "bandage & cold pack"].map((vocab, vIdx) => (
                <button
                  key={vIdx}
                  type="button"
                  onClick={() => setReportText(prev => prev ? `${prev} ${vocab}` : vocab)}
                  className="px-2 py-0.5 bg-white hover:bg-amber-200 text-amber-950 border border-amber-300 rounded-md text-[11px] font-bold transition active:scale-95"
                >
                  + {vocab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Criteria Checker Panel (real-time, mục 11.4) */}
      <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-2">
        <span className="text-[10px] font-black uppercase text-slate-600 tracking-wider flex items-center gap-1.5">
          🗒️ Lab Notebook Criteria:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: 'Cause described', met: criteriaCheck.causeDescribed, required: true },
            { label: 'Result explained', met: criteriaCheck.resultExplained, required: true },
            { label: 'Safety advice', met: criteriaCheck.safetyGiven, required: true },
            { label: 'Vocab used', met: criteriaCheck.vocabMet, required: false }
          ].map(({ label, met, required }) => (
            <div key={label} className={`px-2.5 py-1.5 rounded-xl border text-[10px] font-black text-center transition ${
              met
                ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                : required
                  ? 'bg-slate-100 border-slate-200 text-slate-500'
                  : 'bg-amber-50 border-amber-200 text-amber-700'
            }`}>
              {met ? '✓' : '○'} {label}{!required ? ' ⭐' : ''}
            </div>
          ))}
        </div>
        {/* Lab Notebook stamps real-time */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {criteriaCheck.hasDescribe && <span className="px-2 py-0.5 bg-emerald-100 border border-emerald-300 rounded-md text-[10px] font-black text-emerald-900 animate-in fade-in">🔬 Describe ✓</span>}
          {criteriaCheck.hasExplain && <span className="px-2 py-0.5 bg-blue-100 border border-blue-300 rounded-md text-[10px] font-black text-blue-900 animate-in fade-in">➡️ Explain ✓</span>}
          {criteriaCheck.hasAdvise && <span className="px-2 py-0.5 bg-amber-100 border border-amber-300 rounded-md text-[10px] font-black text-amber-900 animate-in fade-in">✅ Advise ✓</span>}
        </div>
        {!criteriaCheck.canSubmit && reportText.trim().length > 5 && (
          <p className="text-[10px] text-slate-500 font-medium">
            {!criteriaCheck.causeDescribed ? 'Add a Cause sentence (e.g. "Water acts as...")' :
             !criteriaCheck.resultExplained ? 'Add a Result sentence (e.g. "As a result, friction...")' :
             'Add a Safety advice sentence (e.g. "Therefore, walking carefully...")'}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows={5}
          value={reportText}
          onChange={(e) => setReportText(e.target.value)}
          placeholder="Write your science lab report here using the 3-step logic board and target vocabulary..."
          className="w-full p-4 rounded-2xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm font-medium text-slate-900"
        />

        <button
          type="submit"
          disabled={!reportText.trim() || !criteriaCheck.canSubmit}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl font-black text-xs shadow-md flex items-center gap-2 transition"
        >
          <Send size={16} /> Submit Lab Report (+50 XP)
          {!criteriaCheck.canSubmit && reportText.trim().length > 0 && (
            <span className="ml-1 text-emerald-200 font-normal">— complete all 3 criteria first</span>
          )}
        </button>
      </form>

      {isSubmitted && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-950 font-black text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          🎉 Science Report Published Successfully! Lab Notebook Badge Sealed (+50 XP).
        </div>
      )}
    </div>
  );
}
