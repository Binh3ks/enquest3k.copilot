import React, { useState } from 'react';
import { TestTube, Sparkles, CheckCircle2, Send, Trophy } from 'lucide-react';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';

export default function ScienceReportCreator({ reportTopic, weekNumber = 33, onComplete }) {
  const [reportText, setReportText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const starterPills = [
    "Water acts as a liquid lubricant between rubber shoes and tiles.",
    "As a result, friction drops to near zero, causing a slip.",
    "Therefore, walking carefully keeps everyone safe."
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reportText.trim()) return;
    setIsSubmitted(true);
    fireCelebrationConfetti('ScienceReport_Complete');
    if (onComplete) onComplete(50);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-3xl border border-slate-200 shadow-md space-y-5 text-slate-900 font-sans">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-md">
          🔬
        </div>
        <div>
          <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">
            Science Report • CLIL Friction Analysis
          </span>
          <h3 className="text-base font-black text-slate-900">Corridor Friction Science Lab Report</h3>
        </div>
      </div>

      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
        <span className="text-xs font-black uppercase text-emerald-900 flex items-center gap-1">
          <Sparkles size={14} className="text-emerald-600" /> Tap Science Starter Pill to Insert:
        </span>
        <div className="flex flex-wrap gap-2">
          {starterPills.map((pill, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setReportText(prev => prev ? `${prev} ${pill}` : pill)}
              className="px-3.5 py-2 bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-950 rounded-xl text-xs font-bold transition text-left shadow-sm active:scale-95"
            >
              + {pill}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows={5}
          value={reportText}
          onChange={(e) => setReportText(e.target.value)}
          placeholder="Write your science report about corridor friction and school safety here..."
          className="w-full p-4 rounded-2xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm font-bold text-slate-900"
        />

        <button
          type="submit"
          disabled={!reportText.trim()}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl font-black text-xs shadow-md flex items-center gap-2 transition"
        >
          <Send size={16} /> Submit Science Report (+50 XP)
        </button>
      </form>

      {isSubmitted && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-950 font-black text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          🎉 Science Report Published Successfully! You earned +50 XP.
        </div>
      )}
    </div>
  );
}
