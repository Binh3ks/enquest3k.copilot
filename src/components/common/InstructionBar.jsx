import React from 'react';
import { Info, Languages } from 'lucide-react';

const InstructionBar = ({ textEn, textVi, themeColor = 'indigo', isVi, onToggle }) => {
  return (
    <div className={`instruction-bar mb-6 p-4 rounded-xl border-l-4 bg-white shadow-sm flex items-start justify-between border-${themeColor}-500`}>
      <div className="flex space-x-3">
        <div className={`mt-1 p-1 rounded-full bg-${themeColor}-100 text-${themeColor}-600`}>
          <Info className="w-5 h-5" />
        </div>
        <div>
          <h4 className={`text-xs font-bold uppercase tracking-wider text-${themeColor}-600 mb-1`}>
            INSTRUCTION ({isVi ? 'Tiếng Việt' : 'English'})
          </h4>
          <p className="text-slate-700 text-sm font-medium leading-relaxed">
            {isVi ? textVi : textEn}
          </p>
        </div>
      </div>

      <button
        onClick={onToggle}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors border border-slate-200 whitespace-nowrap"
      >
        <Languages className="w-4 h-4" />
        <span>{isVi ? 'EN' : 'VI'}</span>
      </button>
    </div>
  );
};
export default InstructionBar;
