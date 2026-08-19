import React from 'react';
import { Award, Compass, Microscope, Globe, BookOpen } from 'lucide-react';

export const CLIL_STAMPS = [
  { id: 'science', title: 'Science Lab Badge', subject: 'Science', icon: Microscope, color: 'bg-emerald-500 text-white' },
  { id: 'math', title: 'Math Genius Badge', subject: 'Math', icon: Compass, color: 'bg-indigo-500 text-white' },
  { id: 'history', title: 'History Time Explorer', subject: 'History', icon: BookOpen, color: 'bg-amber-500 text-slate-950' },
  { id: 'geography', title: 'Global World Explorer', subject: 'Geography', icon: Globe, color: 'bg-purple-500 text-white' }
];

export default function ExplorerPassport({ earnedStamps = ['science', 'geography'], onClose }) {
  return (
    <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border-2 border-amber-300 shadow-xl space-y-4 font-sans text-slate-900">
      <div className="flex items-center justify-between border-b border-amber-200 pb-3">
        <div className="flex items-center gap-2">
          <Award className="text-amber-600" size={24} />
          <div>
            <h3 className="text-base font-black text-amber-950 uppercase tracking-wider">
              🛂 CLIL Explorer Passport
            </h3>
            <p className="text-xs text-amber-800 font-medium">Earn stamps by exploring Science, Math, History & Geography!</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="px-3 py-1 bg-amber-200 hover:bg-amber-300 text-amber-950 font-black text-xs rounded-xl">
            Close ✕
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CLIL_STAMPS.map((stamp) => {
          const Icon = stamp.icon;
          const isEarned = earnedStamps.includes(stamp.id);

          return (
            <div
              key={stamp.id}
              className={`p-3.5 rounded-2xl border-2 transition flex flex-col items-center text-center space-y-2 ${
                isEarned
                  ? 'bg-white border-amber-400 shadow-md ring-2 ring-amber-300'
                  : 'bg-slate-100/70 border-slate-200 opacity-60 grayscale'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow ${stamp.color}`}>
                <Icon size={22} />
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block">{stamp.title}</span>
                <span className="text-[10px] text-amber-800 font-bold uppercase">{stamp.subject}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${isEarned ? 'bg-amber-100 text-amber-900' : 'bg-slate-200 text-slate-600'}`}>
                {isEarned ? 'PASSED STAMP ✓' : 'LOCKED 🔒'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
