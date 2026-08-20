import React, { useState } from 'react';
import { HelpCircle, EyeOff, Lightbulb } from 'lucide-react';

/**
 * GrammarHintButton — Reusable Grammar Scaffold Component
 * 
 * Enforces ESL active learning:
 * - Hidden by default (prevents premature answer copying).
 * - Reveals grammatical structure scaffold on demand.
 */
export default function GrammarHintButton({
  hintText,
  label = "Need a grammar hint?",
  title = "Grammar Structure Scaffold:",
  color = "indigo",
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!hintText) return null;

  if (!isOpen) {
    return (
      <div className={`space-y-1 ${className}`}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black transition flex items-center gap-1.5 border border-slate-200 shadow-sm active:scale-95"
        >
          <Lightbulb size={13} className="text-amber-500" />
          <span>{label}</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1 animate-in fade-in ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wide flex items-center gap-1">
          <HelpCircle size={12} />
          {title}
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-[10px] text-indigo-500 font-bold hover:underline flex items-center gap-0.5"
        >
          <EyeOff size={11} /> Hide
        </button>
      </div>
      <p className="text-xs font-bold text-indigo-950 leading-relaxed">
        {hintText}
      </p>
    </div>
  );
}
