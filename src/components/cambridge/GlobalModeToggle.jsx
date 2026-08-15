import React from 'react';
import { PlayCircle, GraduationCap } from 'lucide-react';

export function GlobalModeToggle({ activeMode, mode, onModeChange, onChange }) {
  const currentMode = activeMode || mode || 'learn';
  const handleToggle = onModeChange || onChange || (() => {});

  return (
    <div
      className={`flex items-center gap-2 p-1.5 rounded-2xl border transition-all shadow-sm ${
        currentMode === 'learn'
          ? 'bg-blue-50/90 border-blue-200 ring-2 ring-blue-100'
          : 'bg-amber-50/90 border-amber-300 ring-2 ring-amber-200'
      }`}
    >
      <button
        onClick={() => handleToggle('learn')}
        className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
          currentMode === 'learn'
            ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300 scale-102'
            : 'bg-white/70 text-blue-900 border border-blue-200 hover:bg-blue-100'
        }`}
      >
        <PlayCircle size={14} /> 📖 Learn Mode
      </button>
      <button
        onClick={() => handleToggle('check')}
        className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
          currentMode === 'check'
            ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300 scale-102'
            : 'bg-white/70 text-amber-950 border border-amber-200 hover:bg-amber-100'
        }`}
      >
        <GraduationCap size={14} /> 🎯 Check Mode
      </button>
    </div>
  );
}

export default GlobalModeToggle;
