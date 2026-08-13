import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

/**
 * Reusable Choice Grid Primitive (NO HTML5 CANVAS)
 * Accessible HTML choice card grid for Reading Part 3 (A/B/C options) and R&W Part 2 (A-H 8-option grids).
 * 
 * @param {Object} props
 * @param {Array<{ label?: string, text: string, isCorrect?: boolean }>} props.options
 * @param {Object|null} props.selectedOption
 * @param {boolean} props.isSubmitted
 * @param {number} props.answerIndex
 * @param {Function} props.onSelectOption
 * @param {string} props.themeColor
 * @param {number} props.columns Grid column count (1 or 2)
 */
export default function ChoiceGrid({
  options = [],
  selectedOption = null,
  isSubmitted = false,
  answerIndex = undefined,
  onSelectOption = () => {},
  themeColor = 'indigo',
  columns = 1
}) {
  const gridLayoutClass = columns === 2 ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : 'space-y-3';

  return (
    <div className={`w-full ${gridLayoutClass}`}>
      {options.map((opt, optIdx) => {
        const label = opt.label || String.fromCharCode(65 + optIdx); // A, B, C, D, E, F, G, H
        const isSelected = selectedOption && selectedOption.label === label;
        const isCorrect = opt.isCorrect || (answerIndex !== undefined && optIdx === answerIndex);

        let buttonStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
        let badgeStyle = 'bg-slate-200 text-slate-700';

        if (isSubmitted) {
          if (isCorrect) {
            buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-400 shadow-sm';
            badgeStyle = 'bg-emerald-600 text-white';
          } else if (isSelected && !isCorrect) {
            buttonStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-400 shadow-sm';
            badgeStyle = 'bg-rose-600 text-white';
          } else {
            buttonStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
            badgeStyle = 'bg-slate-200 text-slate-400';
          }
        } else if (isSelected) {
          buttonStyle = 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold ring-2 ring-indigo-500 shadow-sm';
          badgeStyle = 'bg-indigo-600 text-white';
        }

        return (
          <button
            key={label || optIdx}
            disabled={isSubmitted}
            onClick={() => onSelectOption({ ...opt, label })}
            className={`w-full p-4 sm:p-5 rounded-2xl text-left border transition-all flex items-center justify-between gap-4 ${buttonStyle}`}
          >
            <div className="flex items-center gap-4 flex-1">
              <span className={`w-8 h-8 rounded-full font-black flex items-center justify-center text-sm shrink-0 ${badgeStyle}`}>
                {label}
              </span>
              <span className="text-base font-bold leading-relaxed">{opt.text}</span>
            </div>

            {isSubmitted && isCorrect && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 font-extrabold text-xs rounded-full shrink-0">
                <CheckCircle2 size={16} /> Correct
              </span>
            )}
            {isSubmitted && isSelected && !isCorrect && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-700 font-extrabold text-xs rounded-full shrink-0">
                <XCircle size={16} /> Incorrect
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
